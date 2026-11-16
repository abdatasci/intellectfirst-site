// Teachers and staff in the Telegram bot: today's lessons, "Clock in" and the register with buttons.
// Works for every teacher — with a website account, or connected only by the phone number in their teacher record
// (Admin → Teachers), which links the chat as 'tid:<teacherId>'. Everything is saved in the same lesson log the website
// uses, so clock-ins and registers appear at once on the admin pages (Admin → Lessons, hours, IF Admin attendance).
import { getStore } from '@netlify/blobs';
import { doc, loadChanges, inClass, tg, tgSend, local } from './bot-core.mjs';
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
  if (!e?.checkIn) return [[{ text: '✅ Clock in', callback_data: 'ci:' + l.key }]];
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
  const list = all.filter(l => mine(p, l));
  if (!list.length) return tgSend(chatId, canAll(p) ? 'No lessons today.' : 'You have no lessons today. 🙂', { reply_markup: STAFF_KB });
  const L = await loadLog(date.slice(0, 7)), tName = id => (teachers.find(t => t.id === id) || {}).name || '';
  await tgSend(chatId, `🕑 Lessons today (${date.slice(8)}.${date.slice(5, 7)}):`, { reply_markup: STAFF_KB });
  for (const l of list.slice(0, 20)) {
    const e = L[l.key];
    await tgSend(chatId, lessonLine(l, e, canAll(p) && l.teacherId !== p.teacherId ? tName(l.teacherId) : ''), { reply_markup: { inline_keyboard: lessonButtons(l, e) } });
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
  return false;
}
