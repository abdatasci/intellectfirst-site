// Students cancel a lesson themselves — on their website page or in the Telegram bot.
//   · A reason is required before the cancellation takes effect.
//   · 8 hours or more before the start: free — the lesson does not count from the package (IF Admin mark EA).
//     Less than 8 hours before: the lesson counts (IF Admin mark UA), as a late cancellation.
//   · At most MAX_PER_MONTH cancellations per calendar month (by the lesson's month); after that, the student must contact the school.
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
      return { key: l.key, label: l.label, date: l.date, start: l.start, end: l.end, room: l.room, at: l.at.toISOString(), hoursLeft: Math.round(hrs * 10) / 10, free: hrs >= FREE_HOURS,
        cancelled: c ? { early: c.early, reason: c.reason, at: c.at } : null, left: Math.max(0, MAX_PER_MONTH - used(l.date.slice(0, 7))) };
    })
  };
}

/** Cancel one lesson. Throws {code: 'reason' | 'lesson' | 'started' | 'already' | 'limit'}. */
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
  if (used >= MAX_PER_MONTH) throw err('limit', { max: MAX_PER_MONTH });
  const early = (l.at - now) / 3600e3 >= FREE_HOURS, at = now.toISOString();
  const cls = w.classes.find(c => c.id === l.classId) || {}, priv = isPrivateClass(cls);
  C[k] = { sid: w.sid, uid: w.uid, name: w.name, classId: l.classId, label: l.label, date: l.date, start: l.start, key, reason, early, at, via };
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
    (early ? `In time (${FREE_HOURS}+ hours before): not counted${priv ? ' — the lesson is taken off the timetable' : ''}.` : `Late (less than ${FREE_HOURS} hours before): the lesson COUNTS from the package.`) +
    `\nCancellations this month: ${used + 1} of ${MAX_PER_MONTH}.`;
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
  return { lesson: { key, label: l.label, date: l.date, start: l.start, end: l.end }, early, counted: !early, used: used + 1, max: MAX_PER_MONTH, ifadmin: ifa };
}

/* ---------- Telegram: "❌ Can't come" under the student's next lessons ---------- */
const TX = {
  en: { offer: n => `❌ Can't come? Choose the lesson to cancel (free ${FREE_HOURS}+ hours before; later it counts). Cancellations left this month: ${n}.`,
    ask: (l, free) => `${l.label} · ${l.when}\n${free ? `✅ More than ${FREE_HOURS} hours before: it will NOT be counted.` : `⚠️ Less than ${FREE_HOURS} hours before: it WILL be counted as a lesson.`}\n\n✍️ Write the reason in one message (required). The lesson is cancelled only after you send the reason.`,
    keep: '✖ Keep the lesson', kept: 'OK, the lesson stays booked.', done: (free, u, m) => `✅ Cancelled. ${free ? 'It is not counted.' : `It counts as a lesson (less than ${FREE_HOURS} hours before).`} Your teacher, the manager and the director have been told. (${u} of ${m} this month)`,
    limit: m => `You have already cancelled ${m} lessons this month. Please contact the school.`, started: 'This lesson has already started.', already: 'You have already cancelled this lesson.', short: 'Please write the reason (a few words).', gone: 'This list is old. Press 📅 Next lessons again.', none: 'No lessons to cancel in the next two weeks.' },
  ru: { offer: n => `❌ Не можете прийти? Выберите занятие для отмены (бесплатно за ${FREE_HOURS}+ часов; позже — занятие засчитывается). Осталось отмен в этом месяце: ${n}.`,
    ask: (l, free) => `${l.label} · ${l.when}\n${free ? `✅ Больше чем за ${FREE_HOURS} часов: занятие НЕ будет засчитано.` : `⚠️ Меньше чем за ${FREE_HOURS} часов: занятие БУДЕТ засчитано.`}\n\n✍️ Напишите причину одним сообщением (обязательно). Отмена вступит в силу только после того, как вы отправите причину.`,
    keep: '✖ Не отменять', kept: 'Хорошо, занятие остаётся.', done: (free, u, m) => `✅ Занятие отменено. ${free ? 'Оно не засчитывается.' : `Оно засчитывается (меньше чем за ${FREE_HOURS} часов).`} Учитель, менеджер и директор получили уведомление. (${u} из ${m} в этом месяце)`,
    limit: m => `Вы уже отменили ${m} занятия в этом месяце. Пожалуйста, свяжитесь со школой.`, started: 'Это занятие уже началось.', already: 'Вы уже отменили это занятие.', short: 'Пожалуйста, напишите причину (несколько слов).', gone: 'Список устарел. Нажмите 📅 Ближайшие занятия ещё раз.', none: 'В ближайшие две недели нет занятий для отмены.' },
  kk: { offer: n => `❌ Келе алмайсыз ба? Бас тартатын сабақты таңдаңыз (${FREE_HOURS}+ сағат бұрын — тегін; кейінірек — сабақ есептеледі). Осы айда қалған бас тартулар: ${n}.`,
    ask: (l, free) => `${l.label} · ${l.when}\n${free ? `✅ ${FREE_HOURS} сағаттан көп уақыт бар: сабақ ЕСЕПТЕЛМЕЙДІ.` : `⚠️ ${FREE_HOURS} сағаттан аз уақыт қалды: сабақ ЕСЕПТЕЛЕДІ.`}\n\n✍️ Себебін бір хабарламамен жазыңыз (міндетті). Себебін жібергеннен кейін ғана сабақ тоқтатылады.`,
    keep: '✖ Бас тартпау', kept: 'Жақсы, сабақ қалады.', done: (free, u, m) => `✅ Сабақтан бас тартылды. ${free ? 'Ол есептелмейді.' : `Ол есептеледі (${FREE_HOURS} сағаттан аз).`} Мұғалім, менеджер және директор хабардар етілді. (осы айда ${u}/${m})`,
    limit: m => `Сіз осы айда ${m} сабақтан бас тарттыңыз. Мектеппен хабарласыңыз.`, started: 'Бұл сабақ басталып кетті.', already: 'Сіз бұл сабақтан бас тартқансыз.', short: 'Себебін жазыңыз (бірнеше сөз).', gone: 'Тізім ескірді. 📅 батырмасын қайта басыңыз.', none: 'Алдағы екі аптада бас тартатын сабақ жоқ.' }
};
const tx = lang => TX[lang] || TX.en;

/** After "📅 Next lessons": the cancel buttons (students only). */
export async function botOffer(chatId, ctx, lang) {
  if (!ctx || ctx.role !== 'student' || !ctx.classes?.length) return;
  const d = await myLessons(who(ctx)), open = d.lessons.filter(l => !l.cancelled && l.left > 0).slice(0, 6);
  if (!open.length) return;
  await S().setJSON(`bot/lcx/${chatId}`, { keys: open.map(l => l.key), exp: Date.now() + 6 * 3600e3 });
  await tgSend(chatId, tx(lang).offer(open[0].left), { reply_markup: { inline_keyboard: [...open.map((l, i) => [{ text: `❌ ${l.label} · ${whenText(l, lang)}`.slice(0, 60), callback_data: 'lc:' + i }])] } });
}
/** Buttons lc:<i> (choose) and lc:x (keep). */
export async function botCallback(q, uid, lang) {
  const chatId = q.message?.chat?.id, data = String(q.data || ''), T = tx(lang);
  const ans = (text, alert) => tg('answerCallbackQuery', { callback_query_id: q.id, text: text || '', show_alert: !!alert }).catch(() => {});
  if (data === 'lc:x') { await S().delete(`bot/lcr/${chatId}`).catch(() => {}); await ans(T.kept); await tgSend(chatId, T.kept); return; }
  const st = (await S().get(`bot/lcx/${chatId}`, { type: 'json' })) || {}, key = (st.keys || [])[+data.slice(3)];
  if (!key || st.exp < Date.now()) { await ans(T.gone, true); return; }
  const ctx = await contextFor(uid), d = ctx && await myLessons(who(ctx)), l = d && d.lessons.find(x => x.key === key);
  if (!l) { await ans(T.gone, true); return; }
  if (l.cancelled) { await ans(T.already, true); return; }
  if (l.left <= 0) { await ans(T.limit(d.max), true); return; }
  await S().setJSON(`bot/lcr/${chatId}`, { key, exp: Date.now() + 30 * 60e3 });
  await ans();
  await tgSend(chatId, T.ask({ label: l.label, when: whenText(l, lang) + (l.end ? '–' + l.end : '') }, l.free), { reply_markup: { inline_keyboard: [[{ text: T.keep, callback_data: 'lc:x' }]] } });
}
/** The reason typed after choosing a lesson. Returns true when the message was used. */
export async function botReason(chatId, uid, text, lang) {
  const st = await S().get(`bot/lcr/${chatId}`, { type: 'json' }).catch(() => null);
  if (!st || st.exp < Date.now() || !text || /^\//.test(text) || /^[\u{1F300}-\u{1FAFF}☀-➿]/u.test(text)) return false;
  const T = tx(lang);
  if (text.trim().length < 3) { await tgSend(chatId, T.short); return true; }
  await S().delete(`bot/lcr/${chatId}`).catch(() => {});
  try {
    const ctx = await contextFor(uid), r = await cancelLesson(who(ctx), st.key, text, 'bot');
    await tgSend(chatId, T.done(r.early, r.used, r.max));
  } catch (e) { await tgSend(chatId, e.code === 'limit' ? T.limit(MAX_PER_MONTH) : e.code === 'started' ? T.started : e.code === 'already' ? T.already : e.code === 'reason' ? T.short : T.gone); }
  return true;
}
