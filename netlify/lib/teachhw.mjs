// Teachers send homework or a test date to a class from the Telegram bot ("📝 Send homework"):
// choose the class → homework or test → the date (the class's next lessons, or type one) → type the task
// (a photo or file of the worksheet can be sent instead, with the task as its caption) → preview → Send.
// It is saved in the same homework list as the website (My classes), so students see it on the website, in the
// bot's "📝 Homework & tests" and get the usual reminders; the class is told straight away.
import { getStore } from '@netlify/blobs';
import { doc, tg, tgSend, loadChanges, upcomingLessons, local } from './bot-core.mjs';
import { addHomework, clean as cleanHw, loadHomework, forClasses } from './homework.mjs';
import { tellClass } from './hwsend.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const KEY = chatId => `bot/hwflow/${chatId}`;
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dm = iso => iso.slice(8) + '.' + iso.slice(5, 7);
const answer = (q, text, alert) => tg('answerCallbackQuery', { callback_query_id: q.id, text, show_alert: !!alert }).catch(() => {});
const edit = (q, text, markup) => q.message && tg('editMessageText', { chat_id: q.message.chat.id, message_id: q.message.message_id, text, reply_markup: markup || { inline_keyboard: [] } }).catch(() => {});
const CANCEL = [{ text: '✖ Cancel', callback_data: 'hw:x' }];

async function myClasses(p) {
  const classes = await doc('classes');
  if (p.role === 'admin' || p.manager) return classes;
  return classes.filter(c => p.teacherId && c.teacherId === p.teacherId);
}
async function getState(chatId) { const s = await S().get(KEY(chatId), { type: 'json' }); return s && s.exp > Date.now() ? s : null; }
const putState = (chatId, st) => S().setJSON(KEY(chatId), { ...st, exp: Date.now() + 30 * 60e3 });

/** "📝 Send homework": step 1, pick the class. */
export async function startHomework(chatId, p) {
  const classes = (await myClasses(p)).filter(c => c.label).sort((a, b) => a.label.localeCompare(b.label)).slice(0, 30);
  if (!classes.length) return tgSend(chatId, 'You have no classes on the timetable yet. Ask the manager to set you as the teacher in Admin → Classes.');
  await putState(chatId, { step: 'class', ids: classes.map(c => c.id) });
  const rows = []; for (let i = 0; i < classes.length; i += 2) rows.push(classes.slice(i, i + 2).map((c, j) => ({ text: c.label, callback_data: 'hw:c:' + (i + j) })));
  rows.push(CANCEL);
  return tgSend(chatId, '📝 Send homework or a test date to a class.\nWhich class?', { reply_markup: { inline_keyboard: rows } });
}

function preview(st) {
  const what = st.kind === 'test' ? `🧪 Test on ${DAY[new Date(st.due + 'T12:00:00Z').getUTCDay()]} ${dm(st.due)}${st.time ? ' at ' + st.time : ''}` : `📝 Homework due ${DAY[new Date(st.due + 'T12:00:00Z').getUTCDay()]} ${dm(st.due)}`;
  return `${what}\nClass: ${st.label}\n\n${st.text}${st.photo ? '\n\n📷 + your photo' : st.document ? '\n\n📎 + your file' : ''}\n\nSend this to every student in the class?`;
}

/** Inline buttons: hw:c:<i> class · hw:k:hw|test · hw:d:<date>|other · hw:send · hw:x (cancel). */
export async function hwCallback(q, p) {
  const data = String(q.data || ''), chatId = q.message?.chat?.id;
  const st = await getState(chatId);
  if (data === 'hw:x') { await S().delete(KEY(chatId)); await answer(q, 'Cancelled'); await edit(q, '✖ Cancelled. Nothing was sent.'); return true; }
  if (!st) { await answer(q, 'Expired. Press 📝 Send homework again.', true); return true; }
  if (data.startsWith('hw:c:')) {
    const cid = st.ids[+data.slice(5)], cls = (await doc('classes')).find(c => c.id === cid);
    if (!cls) { await answer(q, 'Class not found.', true); return true; }
    await putState(chatId, { step: 'kind', classId: cid, label: cls.label });
    await answer(q, '');
    await edit(q, `Class: ${cls.label}\nHomework or a test?`, { inline_keyboard: [[{ text: '📝 Homework', callback_data: 'hw:k:hw' }, { text: '🧪 Test', callback_data: 'hw:k:test' }], CANCEL] });
    return true;
  }
  if (data.startsWith('hw:k:')) {
    const kind = data.slice(5) === 'test' ? 'test' : 'hw';
    const cls = (await doc('classes')).find(c => c.id === st.classId);
    const next = cls ? upcomingLessons([cls], new Date(), 21, await loadChanges()).slice(0, 4) : [];
    const times = {}; next.forEach(l => { times[l.date] = l.start || ''; });
    await putState(chatId, { ...st, step: 'due', kind, times });
    const rows = next.map(l => [{ text: `${DAY[local(l.at).getUTCDay()]} ${dm(l.date)} ${l.start || ''}${l === next[0] ? ' · next lesson' : ''}`, callback_data: 'hw:d:' + l.date }]);
    rows.push([{ text: '🗓 Another date', callback_data: 'hw:d:other' }], CANCEL);
    await answer(q, '');
    await edit(q, `Class: ${st.label}\n${kind === 'test' ? '🧪 When is the test?' : '📝 When is it due?'}`, { inline_keyboard: rows });
    return true;
  }
  if (data.startsWith('hw:d:')) {
    const d = data.slice(5);
    await answer(q, '');
    if (d === 'other') { await putState(chatId, { ...st, step: 'date' }); await edit(q, `Class: ${st.label}\nType the date, for example 25.11 (or 25.11 14:00 for a test).`, { inline_keyboard: [CANCEL] }); return true; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return true;
    await putState(chatId, { ...st, step: 'text', due: d, time: st.kind === 'test' ? (st.times || {})[d] || '' : '' });
    await edit(q, `Class: ${st.label} · ${st.kind === 'test' ? 'test on' : 'due'} ${dm(d)}\nNow type the ${st.kind === 'test' ? 'test details (units, what to revise)' : 'homework'} in one message.\nYou can also send a photo or file of the worksheet, with the task written as its caption.`, { inline_keyboard: [CANCEL] });
    return true;
  }
  if (data === 'hw:send') {
    if (st.step !== 'confirm') { await answer(q, 'Not ready yet.', true); return true; }
    const cls = (await doc('classes')).find(c => c.id === st.classId);
    if (!cls) { await answer(q, 'Class not found.', true); return true; }
    const item = cleanHw({ kind: st.kind, text: st.text, due: st.due, time: st.time }, cls, p.name);
    if (!item) { await answer(q, 'Something is missing. Start again.', true); return true; }
    await answer(q, 'Sending…');
    await addHomework(item);
    const n = await tellClass(cls, item, { photo: st.photo, document: st.document });
    await S().delete(KEY(chatId));
    await edit(q, preview(st).replace(/\n\nSend this to every student in the class\?$/, '') + `\n\n✅ Sent — ${n} message${n === 1 ? '' : 's'} to students and parents. It is also on the website (My classes, students' profiles) and in their reminders.`);
    return true;
  }
  return false;
}

/** Typed messages while a teacher is in the flow (a date, or the homework text/photo). Returns true if used. */
export async function hwMessage(chatId, p, m) {
  const st = await getState(chatId); if (!st) return false;
  const text = String(m.text || m.caption || '').trim();
  if (m.text && /^(🕑|📅|❓|📊|💳|📎|🎯|📚|👤|📝 Send homework)/.test(text)) { await S().delete(KEY(chatId)); return false; }   // a menu button: leave the flow
  if (/^\/cancel\b|^✖/i.test(text)) { await S().delete(KEY(chatId)); await tgSend(chatId, '✖ Cancelled. Nothing was sent.'); return true; }
  if (st.step === 'date') {
    const x = text.match(/^(\d{1,2})[./-](\d{1,2})(?:[./-](\d{2,4}))?(?:\s+(\d{1,2})[:.](\d{2}))?$/);
    if (!x) { await tgSend(chatId, 'Please type the date like 25.11 (or 25.11 14:00), or press ✖ Cancel.'); return true; }
    const now = local(); let y = x[3] ? +(x[3].length === 2 ? '20' + x[3] : x[3]) : now.getUTCFullYear();
    let due = `${y}-${String(+x[2]).padStart(2, '0')}-${String(+x[1]).padStart(2, '0')}`;
    if (!x[3] && due < now.toISOString().slice(0, 10)) due = `${y + 1}${due.slice(4)}`;
    if (isNaN(Date.parse(due + 'T00:00:00Z'))) { await tgSend(chatId, 'That date does not exist. Try again, e.g. 25.11.'); return true; }
    await putState(chatId, { ...st, step: 'text', due, time: st.kind === 'test' && x[4] ? `${String(+x[4]).padStart(2, '0')}:${x[5]}` : '' });
    await tgSend(chatId, `Date: ${dm(due)}. Now type the ${st.kind === 'test' ? 'test details' : 'homework'} in one message (or send a photo/file with the task as its caption).`, { reply_markup: { inline_keyboard: [CANCEL] } });
    return true;
  }
  if (st.step === 'text' || st.step === 'confirm') {
    const photo = m.photo ? m.photo[m.photo.length - 1].file_id : null, document = m.document ? m.document.file_id : null;
    if (!text && !photo && !document) return false;
    const next = { ...st, step: 'confirm', text: (text || (st.kind === 'test' ? 'Test — see the attached file.' : 'See the attached worksheet.')).slice(0, 600), photo, document };
    await putState(chatId, next);
    await tgSend(chatId, preview(next), { reply_markup: { inline_keyboard: [[{ text: '✅ Send to the class', callback_data: 'hw:send' }], CANCEL] } });
    return true;
  }
  return false;   // still choosing with buttons: let other handlers answer
}

/** What a teacher has set recently (for the help screen). */
export async function recentFor(p) {
  const ids = (await myClasses(p)).map(c => c.id);
  return forClasses(await loadHomework(), ids, { past: 0 }).slice(0, 10);
}
