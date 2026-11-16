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
export const KBV = '2026-11-16b';
export async function ensureStaffKb(chatId, name, force) {
  if (!force && (await S().get(`bot/kbv/${chatId}`)) === KBV) return false;
  await tgSend(chatId, staffHello(String(name || '').split(' ')[0] || 'there'), { reply_markup: STAFF_KB });
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
export async function sendToday(chatId, uid, p) {
  const date = today(), classes = await doc('classes'), teachers = await doc('teachers');
  const all = lessonsOn(classes, date, await loadChanges()).filter(l => !l.cancelled && !l.movedTo);
  const list = all.filter(l => mine(p, l) || p.smm);   // the SMM sees every lesson (no buttons)
  if (!list.length) return tgSend(chatId, canAll(p) ? 'No lessons today.' : 'You have no lessons today. 🙂', { reply_markup: STAFF_KB });
  const L = await loadLog(date.slice(0, 7)), tName = id => (teachers.find(t => t.id === id) || {}).name || '';
  await tgSend(chatId, `🕑 Lessons today (${date.slice(8)}.${date.slice(5, 7)}):`, { reply_markup: STAFF_KB });
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
    await tgSend(chatId, `❌ Cancel ${f.lesson.label}, ${f.lesson.date.slice(8)}.${f.lesson.date.slice(5, 7)} ${f.lesson.start}?\nWhy?`, { reply_markup: { inline_keyboard: [
      [{ text: '👥 Only staff attend — not a paid lesson', callback_data: 'lr:staff' }],
      [{ text: '🤒 The teacher can\'t teach (tell students)', callback_data: 'lr:teacher' }],
      [{ text: '📝 Other reason (tell students)', callback_data: 'lr:other' }],
      [{ text: '↩ Keep the lesson', callback_data: 'lr:no' }]] } });
    return true;
  }
  if (data.startsWith('lr:') || data === 'lu') {
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
    const l = f.lesson, why = data.slice(3), note = why === 'staff' ? 'Staff only — not a paid lesson' : why === 'teacher' ? 'The teacher can\'t teach' : '';
    if (l.kind === 'extra') CH.extra = CH.extra.filter(x => x.id !== l.extraId);
    else { const orig = l.from || l.key; delete CH.moves[orig]; CH.cancel[orig] = { note, by: p.name || '', at: new Date().toISOString(), staffOnly: why === 'staff' || undefined, noMakeup: why === 'staff' || undefined }; }
    await saveChanges(CH);
    const day = `${date.slice(8)}.${date.slice(5, 7)} ${start}`;
    let told = 0;
    if (why !== 'staff') told = await tellStudents(f.cls, { en: `❌ Lesson cancelled: ${l.label}, ${day}.${note ? ' ' + note + '.' : ''}`, ru: `❌ Урок отменён: ${l.label}, ${day}.` });
    st.label = `${l.label}, ${day}`; await S().setJSON(`bot/lx/${chatId}`, st);
    await answer(q, 'Cancelled');
    await edit(q, `❌ Cancelled: ${l.label}, ${day}${note ? ' — ' + note : ''}.\n${why === 'staff' ? 'Students were not told (staff only). It is not counted as a missed lesson and needs no make-up.' : `Students told: ${told}.`}\nThe website and the admin pages show it now.`, { inline_keyboard: [[{ text: '↩ Undo', callback_data: 'lu' }]] });
    if (date === today()) { const { tellSmm } = await import('./daydigest.mjs'); await tellSmm(`❌ Cancelled today: ${l.label} ${start}${note ? ' — ' + note : ''} (by ${p.name || 'a teacher'})`).catch(() => {}); }
    const { tellAdmins } = await import('./cover.mjs');
    await tellAdmins(`❌ ${p.name || 'A teacher'} cancelled ${l.label}, ${day}${note ? ' — ' + note : ''}.${why === 'staff' ? ' (Staff only: students were not told.)' : ''}`, null, uid);
    return true;
  }
  return false;
}
/** Tell the students of a class on Telegram (in their language) and on the website. Returns how many were reached. */
async function tellStudents(cls, text) {
  const students = (await doc('students')).filter(s => inClass(cls, s) && !/withdrawn|finished|frozen/i.test(s.status || ''));
  const links = await getLinks(), bySid = await uidsByStudent(links); let n = 0;
  for (const s of students) { const uid = s.uid || bySid[s.id], l = uid && links[uid]; if (uid) await addNote(uid, { kind: 'lessonChange', text: text.en }).catch(() => {}); if (l && l.chatId) { await tgSend(l.chatId, l.lang === 'en' ? text.en : text.ru).catch(() => {}); n++; } }
  return n;
}
