// Students cancel a lesson themselves — on their website page or in the Telegram bot.
//   · A reason is required before the cancellation takes effect.
//   · 8 hours or more before the start: free — the lesson does not count from the package (IF Admin mark EA).
//     Less than 8 hours before: the lesson counts (IF Admin mark UA), as a late cancellation.
//   · The first MAX_PER_MONTH cancellations in a calendar month (by the lesson's month) can be free; any further cancellation
//     that month is allowed (the school is still told, with the reason) but always counts, however early.
//   · The director, the manager(s) and the class's teacher are told in the bot (and in their website notifications).
//   · Private students of the director: an early cancellation cancels the whole lesson (it is their own lesson); only the director is told.
// Stored in school "cancels": { "<lessonKey>|<sid>": { sid, uid, name, classId, label, date, start, key, reason, early, at, via } };
// the lesson's register (lessonlog) also gets cancels[sid] = { early, reason, at }, so the teacher sees it and saveRegister keeps it.
import { getStore } from '@netlify/blobs';
import { doc, loadChanges, saveChanges, upcomingLessons, getLinks, getProfile, tg, tgSend, addNote, contextFor, isPrivateClass, DIRECTOR_TID } from './bot-core.mjs';
import { loadLog, saveLog } from './lessons.mjs';
import { run } from './ifadmin-ai.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
export const FREE_HOURS = 8, MAX_PER_MONTH = 2;
const DN = { en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], kk: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сн'] };
export const whenText = (l, lang = 'en') => `${(DN[lang] || DN.en)[new Date(l.date + 'T00:00:00Z').getUTCDay()]} ${l.date.slice(8)}.${l.date.slice(5, 7)} ${l.start}`;
const err = (code, extra) => Object.assign(new Error(code), { code, ...(extra || {}) });

export async function loadCancels() { return (await S().get('cancels', { type: 'json' })) || {}; }
async function saveCancels(C) { const cut = new Date(Date.now() - 120 * 864e5).toISOString().slice(0, 10); for (const [k, v] of Object.entries(C)) if (v.date < cut) delete C[k]; await S().setJSON('cancels', C); }
/** Keys "<lessonKey>|<sid>" of lessons a student has cancelled — reminders skip them. */
export async function cancelledSet() { return new Set(Object.keys(await loadCancels())); }

/** Who is cancelling: { sid, uid, name, classes } from the bot context or the website's "me". */
export const who = ctx => ({ sid: ctx.student ? ctx.student.id : 'pv:' + ctx.uid, uid: ctx.uid, name: ctx.student ? `${ctx.student.first} ${ctx.student.last}`.trim() : (ctx.name || ctx.profile?.name || ''), classes: ctx.classes || [] });

/** The student's next lessons (14 days) with whether each is cancelled by them, and this month's count. */
export async function myLessons(w, now = new Date()) {
  const CH = await loadChanges(), C = await loadCancels();
  const list = upcomingLessons(w.classes.filter(c => !c.left && !c.paused), now, 14, CH).slice(0, 12);
  const used = m => Object.values(C).filter(x => x.sid === w.sid && x.date.slice(0, 7) === m).length;
  return {
    freeHours: FREE_HOURS, max: MAX_PER_MONTH,
    lessons: list.map(l => {
      const c = C[l.key + '|' + w.sid], hrs = (l.at - now) / 3600e3;
      return { key: l.key, label: l.label, date: l.date, start: l.start, end: l.end, room: l.room, at: l.at.toISOString(), hoursLeft: Math.round(hrs * 10) / 10, inTime: hrs >= FREE_HOURS,
        free: hrs >= FREE_HOURS && used(l.date.slice(0, 7)) < MAX_PER_MONTH,
        cancelled: c ? { early: c.early, reason: c.reason, at: c.at } : null, left: Math.max(0, MAX_PER_MONTH - used(l.date.slice(0, 7))) };
    })
  };
}

/** Cancel one lesson. Throws {code: 'reason' | 'lesson' | 'started' | 'already'}. */
export async function cancelLesson(w, key, reason, via = 'site', now = new Date()) {
  reason = String(reason || '').replace(/\s+/g, ' ').trim().slice(0, 300);
  if (reason.length < 3) throw err('reason');
  const CH = await loadChanges();
  const l = upcomingLessons(w.classes.filter(c => !c.left && !c.paused), now, 15, CH).find(x => x.key === key);
  if (!l) throw err('lesson');
  if (l.at <= now) throw err('started');
  const C = await loadCancels(), k = key + '|' + w.sid;
  if (C[k]) throw err('already');
  const month = l.date.slice(0, 7), used = Object.values(C).filter(x => x.sid === w.sid && x.date.slice(0, 7) === month).length;
  const over = used >= MAX_PER_MONTH, early = !over && (l.at - now) / 3600e3 >= FREE_HOURS, at = now.toISOString();
  const cls = w.classes.find(c => c.id === l.classId) || {}, priv = isPrivateClass(cls);
  C[k] = { sid: w.sid, uid: w.uid, name: w.name, classId: l.classId, label: l.label, date: l.date, start: l.start, key, reason, early, over, at, via };
  await saveCancels(C);

  // the register: the teacher sees it, and saveRegister keeps the mark
  const L = await loadLog(month);
  const e = L[key] || (L[key] = { classId: l.classId, label: l.label, date: l.date, start: l.start, end: l.end, teacherId: l.teacherId });
  (e.cancels ||= {})[w.sid] = { early, reason, at, name: w.name };
  await saveLog(month, L);

  if (priv && early) {   // a private lesson cancelled in time: the lesson itself is off (not counted in the package)
    CH.cancel[key] = { note: `Cancelled by ${w.name}: ${reason}`, by: w.name, at };
    await saveChanges(CH);
  }
  // IF Admin attendance: EA (not counted) or UA (counted)
  let ifa = '';
  if (!priv && !w.sid.startsWith('pv:')) {
    try {
      const gid = l.group || String(l.classId).replace(/^c-/, '');
      const D = { students: (await A().get('c/students', { type: 'json' })) || {}, groups: (await A().get('c/groups', { type: 'json' })) || {}, attendance: (await A().get('c/attendance', { type: 'json' })) || {} };
      if (D.groups[gid] && D.students[w.sid]) {
        const res = run(D, [{ op: 'attendance', group: gid, date: l.date, marks: { [w.sid]: early ? 'EA' : 'UA' } }]);
        const st = (await A().get('stamp', { type: 'json' })) || {};
        for (const t of res.touched) { await A().setJSON('c/' + t, D[t]); st[t] = Date.now(); }
        if (res.touched.size) await A().setJSON('stamp', st);
        ifa = early ? 'EA' : 'UA';
      }
    } catch (x) { console.error('cancel → IF Admin', x.message); }
  }

  // tell the director, the manager(s) and the teacher
  const text = `${early ? '🗓' : '⚠️'} Lesson cancelled by ${w.name}\n${l.label} · ${whenText(l)}${l.end ? '–' + l.end : ''}\nReason: ${reason}\n` +
    (early ? `In time (${FREE_HOURS}+ hours before): not counted${priv ? ' — the lesson is taken off the timetable' : ''}.` : over ? `Over the monthly limit of ${MAX_PER_MONTH}: the lesson COUNTS from the package.` : `Late (less than ${FREE_HOURS} hours before): the lesson COUNTS from the package.`) +
    `\nCancellations this month: ${used + 1} (${MAX_PER_MONTH} can be free).`;
  const teachers = await doc('teachers'), links = await getLinks();
  const uids = new Set();
  const want = priv ? [DIRECTOR_TID] : [DIRECTOR_TID, l.teacherId];
  for (const t of teachers) if (t.uid && want.includes(t.id)) uids.add(t.uid);
  for (const u of Object.keys(links)) {   // staff connected to the bot whose account is that teacher
    if (u.startsWith('sid:')) continue;
    const p = await getProfile(u).catch(() => null);
    if (p && (p.role === 'teacher' || p.role === 'admin') && want.includes(p.teacherId)) uids.add(u);
  }
  if (!priv) { const { managerUids } = await import('./cover.mjs'); for (const u of await managerUids()) uids.add(u); }
  for (const u of uids) {
    await addNote(u, { kind: 'cancel', text }).catch(() => {});
    const ln = links[u]; if (ln && ln.chatId) await tgSend(ln.chatId, text).catch(() => {});
  }
  return { lesson: { key, label: l.label, date: l.date, start: l.start, end: l.end }, early, over, counted: !early, used: used + 1, max: MAX_PER_MONTH, ifadmin: ifa };
}

/* ---------- Telegram: "❌ Can't come" under the student's next lessons ---------- */
const TX = {
  en: {
    rules: `📜 IF Academy cancellation rules\n• Cancel at least ${FREE_HOURS} hours before the lesson: it is NOT counted.\n• Less than ${FREE_HOURS} hours before (or not coming without cancelling): the lesson IS counted from your package.\n• Up to ${MAX_PER_MONTH} free cancellations a month. From the third cancellation in a month, every cancellation is counted, even if it is early.\n• A reason is required. Your teacher, the manager and the director are told.`,
    offer: n => `❌ Can't come? Choose the lesson. Free cancellations left this month: ${n} of ${MAX_PER_MONTH}.`,
    outcome: (l) => l.free ? `✅ This cancellation will NOT be counted.` : !l.inTime ? `⚠️ Less than ${FREE_HOURS} hours before: this lesson WILL be counted.` : `⚠️ You have used your ${MAX_PER_MONTH} free cancellations this month: this lesson WILL be counted.`,
    askReason: '✍️ Write the reason in one message (required).',
    confirm: '⚠️ Please read before you confirm:', reasonLbl: 'Reason', yes: '✅ Yes, cancel the lesson',
    keep: '✖ Keep the lesson', kept: 'OK, the lesson stays booked.',
    done: (free, u) => `✅ Cancelled. ${free ? 'It is not counted.' : 'It is counted as a lesson.'} Your teacher, the manager and the director have been told. (Cancellations this month: ${u})`,
    started: 'This lesson has already started.', already: 'You have already cancelled this lesson.', short: 'Please write the reason (a few words).', gone: 'This list is old. Press 📅 Next lessons again.' },
  ru: {
    rules: `📜 Правила отмены занятий IF Academy\n• Отмена не позднее чем за ${FREE_HOURS} часов до занятия: занятие НЕ засчитывается.\n• Меньше чем за ${FREE_HOURS} часов (или неявка без отмены): занятие ЗАСЧИТЫВАЕТСЯ из абонемента.\n• До ${MAX_PER_MONTH} бесплатных отмен в месяц. С ${MAX_PER_MONTH + 1}-й отмены в месяце каждая отмена засчитывается, даже если она заранее.\n• Причина обязательна. Учитель, менеджер и директор получают уведомление.`,
    offer: n => `❌ Не можете прийти? Выберите занятие. Бесплатных отмен в этом месяце осталось: ${n} из ${MAX_PER_MONTH}.`,
    outcome: (l) => l.free ? `✅ Эта отмена НЕ будет засчитана.` : !l.inTime ? `⚠️ Меньше чем за ${FREE_HOURS} часов: занятие БУДЕТ засчитано.` : `⚠️ Вы уже использовали ${MAX_PER_MONTH} бесплатные отмены в этом месяце: занятие БУДЕТ засчитано.`,
    askReason: '✍️ Напишите причину одним сообщением (обязательно).',
    confirm: '⚠️ Пожалуйста, прочитайте перед подтверждением:', reasonLbl: 'Причина', yes: '✅ Да, отменить занятие',
    keep: '✖ Не отменять', kept: 'Хорошо, занятие остаётся.',
    done: (free, u) => `✅ Занятие отменено. ${free ? 'Оно не засчитывается.' : 'Оно засчитывается как занятие.'} Учитель, менеджер и директор получили уведомление. (Отмен в этом месяце: ${u})`,
    started: 'Это занятие уже началось.', already: 'Вы уже отменили это занятие.', short: 'Пожалуйста, напишите причину (несколько слов).', gone: 'Список устарел. Нажмите 📅 Ближайшие занятия ещё раз.' },
  kk: {
    rules: `📜 IF Academy сабақтан бас тарту ережелері\n• Сабаққа дейін кемінде ${FREE_HOURS} сағат бұрын бас тартсаңыз: сабақ ЕСЕПТЕЛМЕЙДІ.\n• ${FREE_HOURS} сағаттан аз уақыт қалғанда (немесе ескертусіз келмесеңіз): сабақ абонементтен ЕСЕПТЕЛЕДІ.\n• Айына ${MAX_PER_MONTH} тегін бас тарту. Айдағы ${MAX_PER_MONTH + 1}-ші бас тартудан бастап әрқайсысы ерте болса да есептеледі.\n• Себебі міндетті. Мұғалім, менеджер және директор хабардар етіледі.`,
    offer: n => `❌ Келе алмайсыз ба? Сабақты таңдаңыз. Осы айда қалған тегін бас тартулар: ${n} / ${MAX_PER_MONTH}.`,
    outcome: (l) => l.free ? `✅ Бұл бас тарту ЕСЕПТЕЛМЕЙДІ.` : !l.inTime ? `⚠️ ${FREE_HOURS} сағаттан аз: сабақ ЕСЕПТЕЛЕДІ.` : `⚠️ Осы айдағы ${MAX_PER_MONTH} тегін бас тарту пайдаланылды: сабақ ЕСЕПТЕЛЕДІ.`,
    askReason: '✍️ Себебін бір хабарламамен жазыңыз (міндетті).',
    confirm: '⚠️ Растамас бұрын оқыңыз:', reasonLbl: 'Себебі', yes: '✅ Иә, сабақтан бас тарту',
    keep: '✖ Бас тартпау', kept: 'Жақсы, сабақ қалады.',
    done: (free, u) => `✅ Сабақтан бас тартылды. ${free ? 'Ол есептелмейді.' : 'Ол сабақ ретінде есептеледі.'} Мұғалім, менеджер және директор хабардар етілді. (Осы айда: ${u})`,
    started: 'Бұл сабақ басталып кетті.', already: 'Сіз бұл сабақтан бас тартқансыз.', short: 'Себебін жазыңыз (бірнеше сөз).', gone: 'Тізім ескірді. 📅 батырмасын қайта басыңыз.' }
};
const tx = lang => TX[lang] || TX.en;
const KEEP = lang => ({ inline_keyboard: [[{ text: tx(lang).keep, callback_data: 'lc:x' }]] });

/** After "📅 Next lessons": the cancel buttons (students only). */
export async function botOffer(chatId, ctx, lang) {
  if (!ctx || ctx.role !== 'student' || !ctx.classes?.length) return;
  const d = await myLessons(who(ctx)), open = d.lessons.filter(l => !l.cancelled).slice(0, 6);
  if (!open.length) return;
  await S().setJSON(`bot/lcx/${chatId}`, { keys: open.map(l => l.key), exp: Date.now() + 6 * 3600e3 });
  await tgSend(chatId, tx(lang).offer(open[0].left), { reply_markup: { inline_keyboard: open.map((l, i) => [{ text: `❌ ${l.label} · ${whenText(l, lang)}`.slice(0, 60), callback_data: 'lc:' + i }]) } });
}
async function lessonFor(uid, key) { const ctx = await contextFor(uid), d = ctx && await myLessons(who(ctx)); return { ctx, l: d && d.lessons.find(x => x.key === key) }; }
const lessonLine = (l, lang) => `📅 ${l.label} · ${whenText(l, lang)}${l.end ? '–' + l.end : ''}`;

/** Buttons: lc:<i> choose a lesson · lc:y yes, cancel · lc:x keep it. */
export async function botCallback(q, uid, lang) {
  const chatId = q.message?.chat?.id, data = String(q.data || ''), T = tx(lang);
  const ans = (text, alert) => tg('answerCallbackQuery', { callback_query_id: q.id, text: text || '', show_alert: !!alert }).catch(() => {});
  const clearKb = () => q.message && tg('editMessageReplyMarkup', { chat_id: chatId, message_id: q.message.message_id, reply_markup: { inline_keyboard: [] } }).catch(() => {});
  if (data === 'lc:x') { await S().delete(`bot/lcr/${chatId}`).catch(() => {}); await ans(T.kept); await clearKb(); await tgSend(chatId, T.kept); return; }
  if (data === 'lc:y') {
    const st = await S().get(`bot/lcr/${chatId}`, { type: 'json' }).catch(() => null);
    if (!st || !st.reason || st.exp < Date.now()) { await ans(T.gone, true); return; }
    await S().delete(`bot/lcr/${chatId}`).catch(() => {}); await ans(); await clearKb();
    try { const ctx = await contextFor(uid), r = await cancelLesson(who(ctx), st.key, st.reason, 'bot'); await tgSend(chatId, T.done(r.early, r.used)); }
    catch (e) { await tgSend(chatId, e.code === 'started' ? T.started : e.code === 'already' ? T.already : e.code === 'reason' ? T.short : T.gone); }
    return;
  }
  const st = (await S().get(`bot/lcx/${chatId}`, { type: 'json' })) || {}, key = (st.keys || [])[+data.slice(3)];
  if (!key || st.exp < Date.now()) { await ans(T.gone, true); return; }
  const { l } = await lessonFor(uid, key);
  if (!l) { await ans(T.gone, true); return; }
  if (l.cancelled) { await ans(T.already, true); return; }
  await S().setJSON(`bot/lcr/${chatId}`, { key, exp: Date.now() + 30 * 60e3 });
  await ans();
  await tgSend(chatId, `${lessonLine(l, lang)}\n${T.outcome(l)}\n\n${T.rules}\n\n${T.askReason}`, { reply_markup: KEEP(lang) });
}
/** The reason typed after choosing a lesson → the warning window with "Yes, cancel" / "Keep". Returns true when used. */
export async function botReason(chatId, uid, text, lang) {
  const st = await S().get(`bot/lcr/${chatId}`, { type: 'json' }).catch(() => null);
  if (!st || st.reason || st.exp < Date.now() || !text || /^\//.test(text) || /^[\u{1F300}-\u{1FAFF}☀-➿]/u.test(text)) return false;
  const T = tx(lang);
  if (text.trim().length < 3) { await tgSend(chatId, T.short); return true; }
  const { l } = await lessonFor(uid, st.key);
  if (!l || l.cancelled) { await S().delete(`bot/lcr/${chatId}`).catch(() => {}); await tgSend(chatId, l ? T.already : T.gone); return true; }
  const reason = text.replace(/\s+/g, ' ').trim().slice(0, 300);
  await S().setJSON(`bot/lcr/${chatId}`, { key: st.key, reason, exp: Date.now() + 30 * 60e3 });
  await tgSend(chatId, `${T.confirm}\n\n${lessonLine(l, lang)}\n${T.reasonLbl}: ${reason}\n${T.outcome(l)}\n\n${T.rules}`, { reply_markup: { inline_keyboard: [[{ text: T.yes, callback_data: 'lc:y' }], [{ text: T.keep, callback_data: 'lc:x' }]] } });
  return true;
}
