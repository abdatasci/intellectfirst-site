// Teachers and staff in the Telegram bot: today's lessons, "Clock in" and the register with buttons.
// Works for every teacher — with a website account, or connected only by the phone number in their teacher record
// (Admin → Teachers), which links the chat as 'tid:<teacherId>'. Everything is saved in the same lesson log the website
// uses, so clock-ins and registers appear at once on the admin pages (Admin → Lessons, hours, IF Admin attendance).
import { getStore } from '@netlify/blobs';
import { doc, loadChanges, saveChanges, inClass, tg, tgSend, local, getLinks, addNote, uidsByStudent } from './bot-core.mjs';
import { lessonsOn, loadLog, checkIn, saveRegister, today, EARLY_MIN } from './lessons.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
export const isStaff = p => !!p && (p.role === 'teacher' || p.role === 'admin');
const canAll = p => p.role === 'admin' || !!p.manager;
const APP_URL = (process.env.URL || 'https://intellectfirst.com').replace(/\/$/, '') + '/app/?tg=1';
export const STAFF_KB = { keyboard: [[{ text: '📚 IF English' }, { text: '👤 My account' }], [{ text: '🕑 Today\'s lessons' }, { text: '🎯 Class task' }], [{ text: '📝 Send homework' }, { text: '📅 Next lessons' }], [{ text: '🔁 Cover a lesson' }, { text: '❓ Help' }]], resize_keyboard: true, is_persistent: true };
// Telegram keeps the old keyboard until the bot sends a new one: when the teacher menu changes, bump KBV and every
// teacher gets the new keyboard (at once from the reminder job, or with their next message).
export const KBV = '2026-11-16c';
// Three staff menus: teachers; the director and the manager (they teach too); the SMM (not a teacher)
export const ADMIN_KB = { keyboard: [
  [{ text: '🏫 School today' }, { text: '📋 To-do' }],
  [{ text: '🕑 My lessons' }, { text: '🔁 Cover a lesson' }],
  [{ text: '💳 Payments due' }, { text: '📆 This week' }],
  [{ text: '🎯 Class task' }, { text: '📝 Send homework' }],
  [{ text: '👤 Admin' }, { text: '📚 IF English' }, { text: '❓ Help' }]], resize_keyboard: true, is_persistent: true };
export const SMM_KB = { keyboard: [
  [{ text: '🕑 Today at school' }, { text: '📆 This week' }],
  [{ text: '🔔 Changes' }, { text: '🎬 Filming plan' }],
  [{ text: '👤 My account' }, { text: '❓ Help' }]], resize_keyboard: true, is_persistent: true };
export const isAdminP = p => !!p && (p.role === 'admin' || !!p.manager);
export const kbFor = p => p && p.smm && p.role !== 'admin' ? SMM_KB : isAdminP(p) ? ADMIN_KB : STAFF_KB;
export const ADMIN_HELP = '🏫 Director / manager menu:\n• 🏫 School today — every lesson with its status: clocked in, late, not yet, register taken, cancelled, covered.\n• 📋 To-do — registers, make-up lessons, covers, receipts, payments and access requests waiting for you.\n• 🕑 My lessons — your own lessons with Clock in, Register, Cancel.\n• 🔁 Cover a lesson — arrange or confirm covers.\n• 💳 Payments due — overdue tuition and receipts to confirm.\n• 📆 This week — the timetable for the next 7 days.\n• 🎯 Class task and 📝 Send homework — as for teachers.\n• 👤 Admin — the full admin pages inside Telegram.\nYou also get a message for every cover, cancellation and late clock-in.';
export const SMM_HELP = '🎬 SMM menu:\n• 🕑 Today at school — all lessons today: time, class, teacher, room.\n• 📆 This week — the next 7 days, to plan posts and shoots.\n• 🔔 Changes — cancellations, moved lessons and covers today and tomorrow.\n• 🎬 Filming plan — the best lessons to film today: groups with the most students, Young Learners, IELTS and new classes, with their rooms.\n• Every morning at 08:00 you get the day\'s lessons automatically, and a message whenever a lesson changes.';
export const helpFor = p => p && p.smm && p.role !== 'admin' ? SMM_HELP : isAdminP(p) ? ADMIN_HELP + '\n\n' + STAFF_HELP : STAFF_HELP;
export const helloFor = (p, n) => `Hi ${n}! 👋 You are connected to the IF Academy bot as ${p && p.smm && p.role !== 'admin' ? 'SMM' : p && p.teacherId === 't-abdoulie' ? 'director' : isAdminP(p) ? 'manager' : 'a teacher'}.\n\n` + helpFor(p);
export async function ensureStaffKb(chatId, who, force) {
  const p = typeof who === 'string' ? { name: who, role: 'teacher' } : who || {};
  if (!force && (await S().get(`bot/kbv/${chatId}`)) === KBV) return false;
  await tgSend(chatId, helloFor(p, String(p.name || '').split(' ')[0] || 'there'), { reply_markup: kbFor(p) });
  await S().set(`bot/kbv/${chatId}`, KBV);
  return true;
}
export const staffHello = n => `Hi ${n}! 👋 You are connected to the IF Academy bot as a teacher.\n\n` + STAFF_HELP;
export const STAFF_HELP = '👩‍🏫 For teachers:\n• 🕑 Today\'s lessons — clock in (from 5 minutes before the start) and take the register with buttons.\n• Before each lesson I send you a reminder with a "✅ Clock in" button, and after it a "📋 Take register" button.\n• 🔁 Cover a lesson — can\'t teach a lesson? Choose it and ask a colleague (or all teachers). When someone accepts, the timetable changes and the admin is told.\n• 📚 IF English — the whole app inside Telegram, with Teach mode for the projector.\n• 👤 My account — your classes, registers, students\' results and (for the director and manager) Admin, inside Telegram.\n• 🎯 Class task — during the lesson, send a quiz (yours, or ✨ written by AI from a topic), a poll, a writing or a speaking task to the class. Students answer on their phones; your message shows who has answered and their scores, live.\n• 📝 Send homework — choose the class, homework or test, the date, then type the task (or send a photo of the worksheet). Every student in the class gets it at once, and it appears on the website.\n• Everything you press here is saved in the school system and shows on the admin pages straight away.\n• /stop disconnects this chat.';

const MARK = { on: '✅', late: '⏰', abs: '❌', exc: '🟡' };
const NEXT = { on: 'late', late: 'abs', abs: 'exc', exc: 'on' };
const MARK_WORD = { on: 'present', late: 'late', abs: 'absent', exc: 'excused' };

async function findLesson(key) {
  const [cid, date, start] = String(key).split('|'); if (!cid || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return null;
  const classes = await doc('classes');
  const l = lessonsOn(classes, date, await loadChanges()).find(x => x.key === key && !x.cancelled && !x.movedTo);
  return l ? { lesson: l, cls: classes.find(c => c.id === cid), start } : null;
}
async function roster(cls) {
  return (await doc('students')).filter(s => inClass(cls, s) && !/withdrawn|finished/i.test(s.status || ''))
    .map(s => ({ sid: s.id, name: `${s.first} ${s.last}`.trim() })).sort((a, b) => a.name.localeCompare(b.name));
}
const mine = (p, l) => canAll(p) || (p.teacherId && p.teacherId === l.teacherId);

/** Buttons for one lesson, by its state. */
export function lessonButtons(l, e) {
  if (e?.cancelled) return [];
  if (!e?.checkIn) return [[{ text: '✅ Clock in', callback_data: 'ci:' + l.key }, { text: '❌ Cancel lesson', callback_data: 'lx:' + l.key }]];
  return [[{ text: e.takenAt ? '📋 Change register' : '📋 Take register', callback_data: 'ro:' + l.key }]];
}
function lessonLine(l, e, tName) {
  const st = e?.cancelled ? '— cancelled' : e?.takenAt ? '· clocked in, register taken ✓' : e?.checkIn ? `· clocked in ${hm(e.checkIn)}${e.lateMin > 0 ? ` (${e.lateMin} min late)` : ''}` : '· not clocked in yet';
  return `${l.start}–${l.end} ${l.label}${l.room ? ' (' + l.room + ')' : ''}${tName ? ' — ' + tName : ''} ${st}`;
}
const hm = iso => local(new Date(iso)).toISOString().slice(11, 16);

/** "🕑 Today's lessons": one message per lesson, each with its own buttons. */
export async function sendToday(chatId, uid, p, onlyMine) {
  const date = today(), classes = await doc('classes'), teachers = await doc('teachers');
  const all = lessonsOn(classes, date, await loadChanges()).filter(l => !l.cancelled && !l.movedTo);
  const list = all.filter(l => onlyMine ? l.teacherId === p.teacherId : (mine(p, l) || p.smm));
  if (!list.length) return tgSend(chatId, canAll(p) ? 'No lessons today.' : 'You have no lessons today. 🙂', { reply_markup: kbFor(p) });
  const L = await loadLog(date.slice(0, 7)), tName = id => (teachers.find(t => t.id === id) || {}).name || '';
  await tgSend(chatId, `🕑 Lessons today (${date.slice(8)}.${date.slice(5, 7)}):`, { reply_markup: kbFor(p) });
  for (const l of list.slice(0, 20)) {
    const e = L[l.key];
    await tgSend(chatId, lessonLine(l, e, (canAll(p) || p.smm) && l.teacherId !== p.teacherId ? tName(l.teacherId) : ''), { reply_markup: { inline_keyboard: mine(p, l) ? lessonButtons(l, e) : [] } });
  }
}

function regMarkup(st) {
  const rows = st.list.map((s, i) => [{ text: `${MARK[st.marks[s.sid]]} ${s.name}`, callback_data: 'rt:' + i }]);
  rows.push([{ text: '✅ All present', callback_data: 'ra' }, { text: '💾 Save register', callback_data: 'rs' }]);
  return { inline_keyboard: rows };
}
const regText = st => `📋 Register — ${st.label}, ${st.start}\nTap a name to change: ✅ present → ⏰ late → ❌ absent → 🟡 excused. Then press 💾 Save register.`;

const answer = (q, text, alert) => tg('answerCallbackQuery', { callback_query_id: q.id, text, show_alert: !!alert }).catch(() => {});
const edit = (q, text, markup) => q.message && tg('editMessageText', { chat_id: q.message.chat.id, message_id: q.message.message_id, text, reply_markup: markup || { inline_keyboard: [] } }).catch(() => {});

/** Inline buttons from teachers: ci: (clock in), ro: (open register), rt:<i> (toggle), ra (all present), rs (save). */
export async function staffCallback(q, uid, p) {
  const data = String(q.data || ''), chatId = q.message?.chat?.id;
  if (!isStaff(p)) { await answer(q, 'Only teachers and staff can do this.'); return true; }
  const who = { uid, name: p.name || '', role: p.role };
  if (data.startsWith('ci:')) {
    const f = await findLesson(data.slice(3));
    if (!f) { await answer(q, 'This lesson is not on today\'s timetable any more.', true); return true; }
    if (!mine(p, f.lesson)) { await answer(q, 'This is another teacher\'s lesson.', true); return true; }
    try {
      // a manager pressing it for someone else's lesson clocks in for them (like Admin → Lessons on the website)
      const e = await checkIn(f.lesson, canAll(p) ? { ...who, role: 'admin' } : who);
      await answer(q, e.lateMin > 0 ? `Clocked in — ${e.lateMin} min late` : 'Clocked in ✓');
      await edit(q, lessonLine(f.lesson, e, '') + '\nSaved — it shows on the admin page.', { inline_keyboard: lessonButtons(f.lesson, e) });
    } catch (x) {
      const m = x.code || x.message;
      await answer(q, m === 'early' ? `Too early: you can clock in from ${EARLY_MIN} minutes before ${f.lesson.start}.` : m === 'over' ? 'This lesson is over. Ask the manager to correct it in Admin → Lessons.' : 'Could not clock in. Try again.', true);
    }
    return true;
  }
  if (data.startsWith('ro:')) {
    const f = await findLesson(data.slice(3));
    if (!f) { await answer(q, 'This lesson is not on the timetable any more.', true); return true; }
    if (!mine(p, f.lesson)) { await answer(q, 'This is another teacher\'s lesson.', true); return true; }
    const e = (await loadLog(f.lesson.date.slice(0, 7)))[f.lesson.key] || {};
    if (!e.checkIn && !canAll(p)) { await answer(q, 'Clock in first.', true); return true; }
    const list = await roster(f.cls);
    if (!list.length) { await answer(q, 'No students in this class yet. Ask the manager to add them in IF Admin.', true); return true; }
    const marks = {}; list.forEach(s => { marks[s.sid] = (e.marks || {})[s.sid] || 'on'; });
    const st = { key: f.lesson.key, label: f.lesson.label, start: f.lesson.start, list: list.slice(0, 40), marks, lateBy: e.lateBy || {} };
    await S().setJSON(`bot/reg/${chatId}`, st);
    await answer(q, '');
    await tgSend(chatId, regText(st), { reply_markup: regMarkup(st) });
    return true;
  }
  if (/^rt:\d+$/.test(data) || data === 'ra' || data === 'rs') {
    const st = await S().get(`bot/reg/${chatId}`, { type: 'json' });
    if (!st) { await answer(q, 'Expired. Open the register again from 🕑 Today\'s lessons.', true); return true; }
    if (data === 'ra') st.list.forEach(s => { st.marks[s.sid] = 'on'; });
    else if (data.startsWith('rt:')) { const s = st.list[+data.slice(3)]; if (s) st.marks[s.sid] = NEXT[st.marks[s.sid]] || 'on'; }
    if (data !== 'rs') { await S().setJSON(`bot/reg/${chatId}`, st); await answer(q, ''); await tg('editMessageReplyMarkup', { chat_id: chatId, message_id: q.message.message_id, reply_markup: regMarkup(st) }).catch(() => {}); return true; }
    const f = await findLesson(st.key);
    if (!f) { await answer(q, 'This lesson is not on the timetable any more.', true); return true; }
    try {
      const lateBy = {}; for (const [sid, m] of Object.entries(st.marks)) if (m === 'late') lateBy[sid] = st.lateBy[sid] || 5;
      const r = await saveRegister(f.lesson, st.marks, lateBy, canAll(p) ? { ...who, role: 'admin' } : who);
      await S().delete(`bot/reg/${chatId}`);
      const n = {}; Object.values(st.marks).forEach(m => { n[m] = (n[m] || 0) + 1; });
      const sum = Object.keys(MARK).filter(k => n[k]).map(k => `${n[k]} ${MARK_WORD[k]}`).join(', ');
      await answer(q, 'Register saved ✓');
      await edit(q, `📋 Register saved — ${st.label}, ${st.start}\n${sum}${r.ifadmin ? '\nIF Admin attendance updated.' : ''}\n\n` + st.list.map(s => `${MARK[st.marks[s.sid]]} ${s.name}`).join('\n'));
    } catch (x) {
      const m = x.code || x.message;
      await answer(q, m === 'checkin' ? 'Clock in first.' : m === 'closed' ? 'The register can only be taken on the day of the lesson. Ask the manager.' : 'Could not save. Try again.', true);
    }
    return true;
  }
  /* ❌ Cancel a lesson from the bot: lx:<key> → reason → saved in the timetable (the website, reminders and the admins follow) */
  if (data.startsWith('lx:')) {
    const f = await findLesson(data.slice(3));
    if (!f) { await answer(q, 'This lesson is not on the timetable any more.', true); return true; }
    if (!mine(p, f.lesson)) { await answer(q, 'This is another teacher\'s lesson.', true); return true; }
    await S().setJSON(`bot/lx/${chatId}`, { key: f.lesson.key });
    await answer(q, '');
    // the school's rule: a student may cancel free of charge up to 8 hours before the start; later = late cancellation (UA)
    const L0 = f.lesson, hrs = (Date.parse(L0.at) - Date.now()) / 3600e3, onTime = hrs >= LATE_HOURS, solo = isSolo(f.cls);
    const hl = hrs > 0 ? (hrs >= 24 ? Math.floor(hrs / 24) + ' d ' + Math.round(hrs % 24) + ' h' : Math.floor(hrs) + ' h ' + Math.round((hrs % 1) * 60) + ' min') : 'already started';
    const rows = [];
    rows.push([{ text: (onTime ? '✓ ' : '') + (solo ? '🙋 The student cancelled — on time' : '🙋 The class cancelled — on time'), callback_data: 'lr:son' }]);
    rows.push([{ text: (!onTime ? '✓ ' : '') + '⏰ Late cancellation (under 8 h) — charged', callback_data: 'lr:slate' }]);
    rows.push([{ text: '👩‍🏫 Cancelled by the teacher / school', callback_data: 'lr:teacher' }]);
    rows.push([{ text: '✍️ Another reason…', callback_data: 'lr:other' }]);
    rows.push([{ text: '↩ Keep the lesson', callback_data: 'lr:no' }]);
    await tgSend(chatId, `❌ Cancel ${L0.label}\n${L0.date.slice(8)}.${L0.date.slice(5, 7)} · ${L0.start}${L0.end ? '–' + L0.end : ''} · starts in ${hl}\n\nWho cancelled?\n• On time = 8+ hours before the start: no charge, a make-up lesson is arranged.\n• Late = less than 8 hours: the lesson is charged (UA), no make-up.\n${onTime ? 'It is more than 8 hours before the start, so a student cancellation now is on time.' : 'It is less than 8 hours before the start: a student cancellation now is late — unless they told you earlier.'}`, { reply_markup: { inline_keyboard: rows } });
    return true;
  }
  if (data.startsWith('lr:') || data.startsWith('lt:') || data === 'lu') {
    const st = await S().get(`bot/lx/${chatId}`, { type: 'json' });
    if (data === 'lr:no') { await S().delete(`bot/lx/${chatId}`).catch(() => {}); await answer(q, 'Kept'); await edit(q, '👍 The lesson stays on the timetable.'); return true; }
    if (!st) { await answer(q, 'Expired. Open 🕑 Today\'s lessons again.', true); return true; }
    const CH = await loadChanges(), [cid, date, start] = st.key.split('|');
    if (data === 'lu') {   // undo
      delete CH.cancel[st.key]; await saveChanges(CH); await S().delete(`bot/lx/${chatId}`).catch(() => {});
      await answer(q, 'Back on'); await edit(q, '↩ The lesson is back on the timetable.');
      const { tellAdmins } = await import('./cover.mjs'); await tellAdmins(`↩ ${p.name || 'A teacher'} put a lesson back on: ${st.label || st.key}.`, null, uid);
      return true;
    }
    const f = await findLesson(st.key);
    if (!f) { await answer(q, 'This lesson is not on the timetable any more.', true); return true; }
    if (!mine(p, f.lesson)) { await answer(q, 'This is another teacher\'s lesson.', true); return true; }
    if (data === 'lr:other') {   // ask for the reason in words; the next message is the reason
      st.awaiting = true; await S().setJSON(`bot/lx/${chatId}`, st);
      await answer(q, ''); await edit(q, `✍️ Write the reason for cancelling ${f.lesson.label} (${f.lesson.start}) in one message. It goes to the admin — and to the students if you choose.`);
      return true;
    }
    const why = data.startsWith('lt:') ? 'other' : data.slice(3);
    const ok = await doCancel(chatId, uid, p, st, f, why, why === 'other' ? st.note || '' : null, why === 'other' ? data === 'lt:yes' : true);
    await answer(q, 'Cancelled'); await edit(q, ok.text, ok.kb);
    return true;
  }
  return false;
}
/** The typed reason for a cancellation (after "✍️ Write the reason…"). Returns true if the message was used. */
export async function cancelReasonText(chatId, text) {
  const st = await S().get(`bot/lx/${chatId}`, { type: 'json' });
  if (!st || !st.awaiting || !text || /^\//.test(text)) return false;
  st.awaiting = false; st.note = String(text).replace(/\s+/g, ' ').trim().slice(0, 200); await S().setJSON(`bot/lx/${chatId}`, st);
  await tgSend(chatId, `Reason: “${st.note}”\nShould the students be told?`, { reply_markup: { inline_keyboard: [[{ text: '📣 Yes, tell the students', callback_data: 'lt:yes' }], [{ text: '🤫 No (staff only)', callback_data: 'lt:no' }], [{ text: '↩ Keep the lesson', callback_data: 'lr:no' }]] } });
  return true;
}
const LATE_HOURS = 8;
const isSolo = c => !!c && ((Array.isArray(c.studentIds) && c.studentIds.length === 1) || /\(individual\)/i.test(c.label || ''));
/** Cancel with a reason:
    son    student/class cancelled on time → off the timetable, IF Admin "EA" (excused), make-up on the manager's list
    slate  late cancellation (< 8 h)       → IF Admin "UA" (charged), no make-up, not a missed lesson for the teacher
    teacher cancelled by the teacher/school → off the timetable, students told, make-up on the manager's list
    other  a written reason                 → off the timetable, students told if the teacher chose so */
async function doCancel(chatId, uid, p, st, f, why, typed, tell) {
  const CH = await loadChanges(), [, date, start] = st.key.split('|'), l = f.lesson;
  const day = `${date.slice(8)}.${date.slice(5, 7)} ${start}`;
  const NOTE = { son: 'Cancelled by the student on time — no charge, make-up to arrange', slate: 'Late cancellation by the student (less than 8 hours) — charged (UA)', teacher: 'Cancelled by the teacher / school — make-up to arrange' };
  const note = typed != null ? typed : NOTE[why] || '';
  if (l.kind === 'extra') CH.extra = CH.extra.filter(x => x.id !== l.extraId);
  else { const orig = l.from || l.key; delete CH.moves[orig]; CH.cancel[orig] = { note, by: p.name || '', at: new Date().toISOString(), reason: why, ...(why === 'slate' ? { noMakeup: true, lateCancel: true } : {}) }; }
  await saveChanges(CH);
  // attendance in IF Admin for the class's students: EA (excused) or UA (late cancellation, charged)
  let reg = '';
  if (why === 'son' || why === 'slate') {
    try {
      const marks = {}; (await doc('students')).filter(s => inClass(f.cls, s) && !/withdrawn|finished|frozen/i.test(s.status || '')).forEach(s => { marks[s.id] = why === 'son' ? 'exc' : 'abs'; });
      const r = await saveRegister(l, marks, {}, { uid, name: p.name || '', role: 'admin', quiet: true });
      const month = l.date.slice(0, 7), Lg = await loadLog(month), e = Lg[l.key]; if (e) { e.cancelled = true; e.cancelReason = why; e.note = note; const { saveLog } = await import('./lessons.mjs'); await saveLog(month, Lg); }
      reg = r.ifadmin ? `\nIF Admin: ${why === 'son' ? 'EA (excused)' : 'UA (late cancellation)'} saved.` : '';
    } catch (x) { console.error('cancel register', x.message); }
  }
  const STU = {
    son: { en: `✅ Your lesson ${l.label}, ${day} is cancelled as you asked — on time, so there is no charge. We will offer you a new time.`, ru: `✅ Урок ${l.label}, ${day} отменён по вашей просьбе — вовремя, без оплаты. Мы предложим новое время.` },
    slate: { en: `⚠️ Your lesson ${l.label}, ${day} was cancelled less than 8 hours before the start. Under the school's rules it counts as a lesson (late cancellation).`, ru: `⚠️ Урок ${l.label}, ${day} отменён менее чем за 8 часов до начала. По правилам школы он считается проведённым (поздняя отмена).` },
    teacher: { en: `❌ Lesson cancelled: ${l.label}, ${day}. Sorry — the school will offer you a make-up lesson at no extra cost.`, ru: `❌ Урок отменён: ${l.label}, ${day}. Извините — школа предложит вам бесплатный урок взамен.` }
  };
  let told = 0;
  if (tell) told = await tellStudents(f.cls, STU[why] || { en: `❌ Lesson cancelled: ${l.label}, ${day}.${note ? ' ' + note + '.' : ''}`, ru: `❌ Урок отменён: ${l.label}, ${day}.` });
  st.label = `${l.label}, ${day}`; await S().setJSON(`bot/lx/${chatId}`, st);
  const HEAD = { son: '🙋 Cancelled by the student — on time', slate: '⏰ Late cancellation — charged (UA)', teacher: '👩‍🏫 Cancelled by the teacher / school', other: '❌ Cancelled' };
  const NEXT = { son: 'Make-up lesson: on the manager\'s to-do list.', slate: 'No make-up. It is not a missed lesson for you.', teacher: 'Make-up lesson: on the manager\'s to-do list.', other: '' };
  const msg = `${HEAD[why] || HEAD.other}\n${l.label} · ${day}${typed ? '\nReason: ' + typed : ''}\n\n${tell ? `Students told: ${told}.` : 'Students were not told.'}${reg}${NEXT[why] ? '\n' + NEXT[why] : ''}\nThe website and the admin pages show it now.`;
  if (date === today()) { const { tellSmm } = await import('./daydigest.mjs'); await tellSmm(`❌ Cancelled today: ${l.label} ${start} — ${note || 'no reason given'} (by ${p.name || 'a teacher'})`).catch(() => {}); }
  const { tellAdmins } = await import('./cover.mjs');
  await tellAdmins(`${HEAD[why] || HEAD.other} (by ${p.name || 'a teacher'})\n${l.label} · ${day}${note ? '\n' + note : ''}${!tell ? '\nStudents were not told.' : ''}`, null, uid);
  return { text: msg, kb: { inline_keyboard: [[{ text: '↩ Undo', callback_data: 'lu' }]] } };
}
/** Tell the students of a class on Telegram (in their language) and on the website. Returns how many were reached. */
async function tellStudents(cls, text) {
  const students = (await doc('students')).filter(s => inClass(cls, s) && !/withdrawn|finished|frozen/i.test(s.status || ''));
  const links = await getLinks(), bySid = await uidsByStudent(links); let n = 0;
  for (const s of students) { const uid = s.uid || bySid[s.id], l = uid && links[uid]; if (uid) await addNote(uid, { kind: 'lessonChange', text: text.en }).catch(() => {}); if (l && l.chatId) { await tgSend(l.chatId, l.lang === 'en' ? text.en : text.ru).catch(() => {}); n++; } }
  return n;
}

/* ---------- director / manager / SMM views ---------- */
const DOT = l => l.cancelled ? '❌' : l.movedTo ? '↪' : '';
/** 🏫 School today: one board with every lesson and its status. */
export async function sendSchoolDay(chatId, p) {
  const date = today(), classes = await doc('classes'), teachers = await doc('teachers'), students = await doc('students');
  const tn = id => ((teachers.find(t => t.id === id) || {}).name || '').split(' ')[0] || '—';
  const { withEntry, since } = await import('./lessons.mjs');
  const list = withEntry(lessonsOn(classes, date, await loadChanges()), await loadLog(date.slice(0, 7)), new Date(), await since());
  const size = cid => students.filter(s => inClass(classes.find(c => c.id === cid), s) && s.status === 'active').length;
  const ST = l => { const e = l.entry || {}; if (l.cancelled || l.state === 'cancelled') return '❌ cancelled'; if (l.movedTo) return '↪ moved'; if (e.takenAt) return '📋 register taken'; if (e.checkIn) return e.lateMin > 0 ? `⏰ in, ${e.lateMin} min late` : '✅ clocked in'; if (l.state === 'missed') return '⚠️ no clock-in'; if (l.state === 'overdue') return '⚠️ started, not clocked in'; return '⏳ upcoming'; };
  const live = list.filter(l => !l.cancelled && !l.movedTo), n = k => list.filter(l => ST(l).startsWith(k)).length;
  const head = `🏫 School today · ${date.slice(8)}.${date.slice(5, 7)}\n${live.length} lessons · ✅ ${n('✅') + n('📋') + n('⏰')} in · ⚠️ ${n('⚠️')} missing · ⏳ ${n('⏳')} to come${n('❌') ? ' · ❌ ' + n('❌') + ' cancelled' : ''}`;
  const lines = list.map(l => `${l.start}${l.end ? '–' + l.end : ''}  ${l.label} · ${tn(l.teacherId)}${l.coverFor ? ' (cover for ' + tn(l.coverFor) + ')' : ''}${l.room ? ' · ' + l.room : ''} · ${size(l.classId)} st.\n      ${ST(l)}`);
  return tgSend(chatId, `${head}\n\n${lines.join('\n') || 'No lessons today.'}\n\nDetails: intellectfirst.com/me/#/admin/lessons`, { reply_markup: kbFor(p) });
}
/** 📋 To-do: the manager's open tasks, grouped. */
export async function sendTodo(chatId, p, only) {
  const { openTasks } = await import('./tasks.mjs');
  let t = await openTasks(); if (only) t = t.filter(x => x.kind === only);
  if (!t.length) return tgSend(chatId, only === 'payment' ? '💳 No overdue payments and no receipts waiting. 👍' : '📋 Nothing waiting — all done. 👍', { reply_markup: kbFor(p) });
  const ICON = { attendance: '📋 Registers', reschedule: '🔁 Make-up lessons & covers', payment: '💳 Payments', accounts: '👤 Accounts & feedback' }, by = {};
  t.forEach(x => (by[x.kind] = by[x.kind] || []).push(x));
  const body = Object.keys(by).map(k => `${ICON[k] || k} (${by[k].length})\n` + by[k].slice(0, 10).map(x => '• ' + x.text.replace(/^[^:]+: /, '')).join('\n') + (by[k].length > 10 ? `\n… and ${by[k].length - 10} more` : '')).join('\n\n');
  return tgSend(chatId, `${only === 'payment' ? '💳 Payments due' : '📋 To-do'} · ${t.length}\n\n${body}\n\nOpen: intellectfirst.com/me/#/admin`, { reply_markup: kbFor(p) });
}
/** 📆 This week: the next 7 days, compact. */
export async function sendWeek(chatId, p) {
  const classes = await doc('classes'), teachers = await doc('teachers'), CH = await loadChanges();
  const tn = id => ((teachers.find(t => t.id === id) || {}).name || '').split(' ')[0] || '—', DN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const d0 = today(), out = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(Date.parse(d0 + 'T00:00:00Z') + i * 864e5).toISOString().slice(0, 10), ls = lessonsOn(classes, date, CH);
    out.push(`📅 ${DN[new Date(date + 'T00:00:00Z').getUTCDay()]} ${date.slice(8)}.${date.slice(5, 7)}${ls.length ? '' : ' — no lessons'}` + ls.map(l => `\n${DOT(l) || '•'} ${l.start} ${l.label} · ${tn(l.teacherId)}${l.coverFor ? ' (cover)' : ''}${l.room ? ' · ' + l.room : ''}`).join(''));
  }
  const text = '📆 The next 7 days\n\n' + out.join('\n\n');
  for (let k = 0; k < text.length; k += 3800) await tgSend(chatId, text.slice(k, k + 3800), k ? {} : { reply_markup: kbFor(p) });
}
/** 🔔 Changes: cancellations, moves and covers today and tomorrow. */
export async function sendChanges(chatId, p) {
  const classes = await doc('classes'), teachers = await doc('teachers'), CH = await loadChanges();
  const tn = id => ((teachers.find(t => t.id === id) || {}).name || '').split(' ')[0] || '—', out = [];
  for (let i = 0; i < 2; i++) {
    const date = new Date(Date.parse(today() + 'T00:00:00Z') + i * 864e5).toISOString().slice(0, 10);
    for (const l of lessonsOn(classes, date, CH)) {
      const w = (i ? 'Tomorrow ' : 'Today ') + l.start + ' ' + l.label;
      if (l.cancelled) out.push(`❌ ${w} — cancelled${l.note ? ' (' + l.note + ')' : ''}`);
      else if (l.movedTo) out.push(`↪ ${w} — moved to ${l.movedTo.date.slice(8)}.${l.movedTo.date.slice(5, 7)} ${l.movedTo.start}`);
      else if (l.kind === 'moved') out.push(`↪ ${w} — moved here from ${l.movedFrom.date.slice(8)}.${l.movedFrom.date.slice(5, 7)}`);
      else if (l.kind === 'extra') out.push(`➕ ${w} — extra lesson (${tn(l.teacherId)})`);
      else if (l.coverFor) out.push(`🔁 ${w} — ${tn(l.teacherId)} covers for ${tn(l.coverFor)}`);
    }
  }
  return tgSend(chatId, out.length ? '🔔 Changes today and tomorrow\n\n' + out.join('\n') : '🔔 No changes today or tomorrow — everything runs as timetabled.', { reply_markup: kbFor(p) });
}
/** 🎬 Filming plan for the SMM: today's lessons ranked by what makes good content. */
export async function sendFilming(chatId, p) {
  const classes = await doc('classes'), teachers = await doc('teachers'), students = await doc('students'), date = today();
  const tn = id => ((teachers.find(t => t.id === id) || {}).name || '').split(' ')[0] || '—';
  const size = c => students.filter(s => inClass(c, s) && s.status === 'active').length;
  const now = Date.now(), ls = lessonsOn(classes, date, await loadChanges()).filter(l => !l.cancelled && !l.movedTo && Date.parse(l.endAt) > now);
  if (!ls.length) return tgSend(chatId, '🎬 No more lessons today.', { reply_markup: kbFor(p) });
  const tag = (l, c) => /starters|movers|flyers|kids|young|yl/i.test(l.label) ? '🧸 Young Learners — games and songs' : /ielts/i.test(l.label) ? '🎓 IELTS — speaking practice, success stories' : /business|adult/i.test(l.label) ? '💼 Adults — real-life English' : /teen|ket|pet|fce/i.test(l.label) ? '🎒 Teens — team games, IF Live' : /individual/i.test(l.label) ? '👤 Individual — ask first, short clip only' : '📚 Group lesson';
  const scored = ls.map(l => { const c = classes.find(x => x.id === l.classId), n = size(c); return { l, n, s: n + (/individual/i.test(l.label) ? -5 : 0) + (/starters|movers|flyers|kids|yl/i.test(l.label) ? 3 : 0) }; }).sort((a, b) => b.s - a.s);
  const lines = scored.map((x, i) => `${i < 3 ? ['🥇', '🥈', '🥉'][i] : '•'} ${x.l.start}${x.l.end ? '–' + x.l.end : ''} ${x.l.label} · ${tn(x.l.teacherId)}${x.l.room ? ' · ' + x.l.room : ''} · ${x.n} students\n      ${tag(x.l)}`);
  return tgSend(chatId, `🎬 Filming plan · today\n\n${lines.join('\n')}\n\nTip: film in the first 15 minutes (warm-up, games) or the last 10 (results). Ask the teacher before you come in, and only film students who have photo consent.`, { reply_markup: kbFor(p) });
}
