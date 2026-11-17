// Teachers cover for each other — arranged in the Telegram bot, kept in the school's timetable.
//   🔁 Cover a lesson → choose the lesson (next 7 days) → choose a colleague, or ask every teacher
//   → the colleague gets Accept / Decline buttons; the director and the manager get the same buttons and can confirm for them.
// An accepted cover is saved in lessonchanges.cover[lessonKey] = { teacherId, from, by, at }: from then on the covering
// teacher gets the reminders, the clock-in, the register and the teaching hours for that lesson, and the website
// (Calendar, Today, Admin → Lessons) shows "X covers for Y". Every step is also posted to the admins' website notifications.
import { getStore } from '@netlify/blobs';
import { doc, loadChanges, saveChanges, upcomingLessons, getLinks, getProfile, tg, tgSend, addNote } from './bot-core.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const DN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const isStaff = p => !!p && (p.role === 'teacher' || p.role === 'admin');
const canAll = p => !!p && (p.role === 'admin' || !!p.manager);
const when = l => `${DN[new Date(l.date + 'T00:00:00Z').getUTCDay()]} ${l.date.slice(8)}.${l.date.slice(5, 7)} ${l.start}`;
const answer = (q, text, alert) => tg('answerCallbackQuery', { callback_query_id: q.id, text: text || '', show_alert: !!alert }).catch(() => {});
const edit = (q, text, kb) => q.message && tg('editMessageText', { chat_id: q.message.chat.id, message_id: q.message.message_id, text, reply_markup: kb || { inline_keyboard: [] } }).catch(() => {});

/** Everyone connected to the bot who is staff: [{uid, chatId, p}] */
async function staffChats() {
  const links = await getLinks(), out = [];
  for (const [uid, l] of Object.entries(links)) { if (!l || !l.chatId || uid.startsWith('sid:')) continue; const p = await getProfile(uid).catch(() => null); if (isStaff(p)) out.push({ uid, chatId: l.chatId, p }); }
  return out;
}
/** The director and the manager(s): website accounts with the admin role, or marked as manager. */
export async function managerUids() { return adminUids(); }
async function adminUids() {
  const dir = (await U().get('directory', { type: 'json' })) || {}, out = [];
  for (const [uid, a] of Object.entries(dir)) {
    if (a.role !== 'admin' && a.role !== 'teacher') continue;
    const p = await U().get(`u/${uid}/profile`, { type: 'json' }).catch(() => null);
    if (p && (p.role === 'admin' || p.manager)) out.push(uid);
  }
  return out;
}
/** Tell the admins: a website notification for each, and a Telegram message (with buttons, if given). */
export async function tellAdmins(text, kb, exceptUid) {
  const links = await getLinks();
  for (const uid of await adminUids()) {
    if (uid === exceptUid) continue;
    await addNote(uid, { kind: 'cover', text }).catch(() => {});
    const l = links[uid]; if (l && l.chatId) await tgSend(l.chatId, text, kb ? { reply_markup: kb } : {}).catch(() => {});
  }
}
const tname = async id => ((await doc('teachers')).find(t => t.id === id) || {}).name || 'a teacher';
async function loadReqs() { return (await S().get('cover/requests', { type: 'json' })) || {}; }
async function saveReqs(R) { const cut = Date.now() - 30 * 864e5; for (const [k, v] of Object.entries(R)) if (Date.parse(v.at) < cut) delete R[k]; await S().setJSON('cover/requests', R); }
async function findLesson(key) {
  const [cid, date] = String(key).split('|'), classes = await doc('classes'), CH = await loadChanges();
  const { lessonsOn } = await import('./lessons.mjs');
  return lessonsOn(classes, date, CH).find(l => l.key === key && !l.cancelled && !l.movedTo) || null;
}

/** Set or remove a cover (also used by the website's Calendar). Returns the lesson. */
export async function setCover(key, teacherId, by) {
  const CH = await loadChanges(); CH.cover = CH.cover || {};
  if (teacherId) CH.cover[key] = { teacherId, by: by || '', at: new Date().toISOString() }; else delete CH.cover[key];
  await saveChanges(CH);
  return findLesson(key);
}

/** "🔁 Cover a lesson": first, which way round — I need a cover, or I am covering for a colleague. */
export async function startCover(chatId, uid, p) {
  return tgSend(chatId, '🔁 Cover', { reply_markup: { inline_keyboard: [
    [{ text: '🙋 I need someone to cover my lesson', callback_data: 'com:need' }],
    [{ text: '🤝 I am covering a colleague\'s lesson', callback_data: 'com:give' }],
    [{ text: '✖ Close', callback_data: 'cox' }]] } });
}
async function lessonsFor(p, mode) {
  const classes = await doc('classes'), CH = await loadChanges(), { lessonsOn, today } = await import('./lessons.mjs');
  const todays = lessonsOn(classes, today(), CH).filter(l => !l.cancelled && !l.movedTo);
  const all = [...todays, ...upcomingLessons(classes, new Date(), 7, CH).filter(l => l.date !== today())];
  return all.filter(l => mode === 'give' ? l.teacherId !== p.teacherId : (canAll(p) || l.teacherId === p.teacherId)).slice(0, 24);
}
async function listLessons(q, chatId, p, mode) {
  const teachers = await doc('teachers'), tn = id => ((teachers.find(t => t.id === id) || {}).name || '').split(' ')[0];
  const all = await lessonsFor(p, mode);
  if (!all.length) { await answer(q); await edit(q, mode === 'give' ? 'No colleague has a lesson today or in the next 7 days.' : 'You have no lessons in the next 7 days.'); return; }
  await S().setJSON(`bot/cover/${chatId}`, { keys: all.map(l => l.key), mode });
  await answer(q);
  await edit(q, mode === 'give' ? '🤝 Which lesson are you covering?' : '🙋 Which lesson needs a cover teacher?', { inline_keyboard: all.map((l, i) => [{ text: `${when(l)} · ${l.label}${mode === 'give' || (canAll(p) && l.teacherId !== p.teacherId) ? ' · ' + tn(l.teacherId) : ''}${l.coverFor ? ' (cover)' : ''}`.slice(0, 60), callback_data: (mode === 'give' ? 'cog:' : 'cov:') + i }]).concat([[{ text: '✖ Close', callback_data: 'cox' }]]) });
}

/** Buttons: cov:<i> lesson · cow:<i>|all colleague · coa:<id> accept · cod:<id> decline · cou remove the cover · cox close */
export async function coverCallback(q, uid, p) {
  const data = String(q.data || ''), chatId = q.message?.chat?.id;
  if (!isStaff(p)) { await answer(q, 'Only teachers and staff can do this.', true); return true; }
  if (data === 'cox') { await S().delete(`bot/cover/${chatId}`).catch(() => {}); await answer(q); await edit(q, 'Closed.'); return true; }
  const st = (await S().get(`bot/cover/${chatId}`, { type: 'json' })) || {};
  if (data === 'com:need' || data === 'com:give') { await listLessons(q, chatId, p, data.slice(4)); return true; }
  if (data.startsWith('cog:')) {   // "I am covering this lesson": the class's teacher (or the admin) confirms
    const key = (st.keys || [])[+data.slice(4)], l = key && await findLesson(key);
    if (!l) { await answer(q, 'This lesson is not on the timetable any more.', true); return true; }
    if (!p.teacherId) { await answer(q, 'Your account is not linked to a teacher record.', true); return true; }
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5), fromName = await tname(l.teacherId);
    const R = await loadReqs(); R[id] = { id, key: l.key, label: l.label, when: when(l), from: l.teacherId, to: p.teacherId, claim: true, by: p.name || '', byUid: uid, status: 'pending', at: new Date().toISOString(), declined: [] }; await saveReqs(R);
    await S().delete(`bot/cover/${chatId}`).catch(() => {});
    const kb = { inline_keyboard: [[{ text: '✅ Confirm', callback_data: 'coa:' + id }, { text: '✖ Not right', callback_data: 'cod:' + id }]] };
    const msg = `🤝 ${p.name || 'A teacher'} says they are covering your lesson ${l.label}, ${when(l)}. Please confirm.`;
    const chats = (await staffChats()).filter(c => c.p.teacherId === l.teacherId);
    for (const c of chats) await tgSend(c.chatId, msg, { reply_markup: kb }).catch(() => {});
    await answer(q, 'Sent for confirmation');
    await edit(q, `🤝 Noted: you are covering ${l.label}, ${when(l)} for ${fromName}. ${chats.length ? fromName.split(' ')[0] + ' and the admin' : 'The admin'} will confirm — then it is in the timetable and the lesson counts in your hours.`);
    await tellAdmins(`🤝 ${p.name || 'A teacher'} is covering ${l.label}, ${when(l)} for ${fromName}. Confirm it here:`, kb, uid);
    return true;
  }
  if (data.startsWith('cov:')) {
    const key = (st.keys || [])[+data.slice(4)], l = key && await findLesson(key);
    if (!l) { await answer(q, 'This lesson is not on the timetable any more. Press 🔁 Cover a lesson again.', true); return true; }
    const teachers = (await doc('teachers')).filter(t => t.id !== l.teacherId && t.status !== 'left');
    st.key = key; st.teachers = teachers.map(t => t.id); await S().setJSON(`bot/cover/${chatId}`, st);
    const rows = [[{ text: '📣 Ask all teachers', callback_data: 'cow:all' }]];
    for (let i = 0; i < teachers.length; i += 2) rows.push(teachers.slice(i, i + 2).map((t, j) => ({ text: t.name, callback_data: 'cow:' + (i + j) })));
    if (l.coverFor) rows.push([{ text: '↩ Remove the cover (' + (await tname(l.coverFor)).split(' ')[0] + ' teaches)', callback_data: 'cou' }]);
    rows.push([{ text: '✖ Close', callback_data: 'cox' }]);
    await answer(q); await edit(q, `🔁 ${l.label}, ${when(l)}\nWho should cover this lesson?`, { inline_keyboard: rows });
    return true;
  }
  if (data === 'cou') {
    const l = st.key && await findLesson(st.key); if (!l || !l.coverFor) { await answer(q, 'Nothing to remove.', true); return true; }
    if (!canAll(p) && p.teacherId !== l.coverFor && p.teacherId !== l.teacherId) { await answer(q, 'Only the teachers involved or the admin can change this.', true); return true; }
    const back = l.coverFor; await setCover(l.key, null);
    await answer(q, 'Cover removed'); await edit(q, `↩ ${l.label}, ${when(l)}: ${await tname(back)} teaches it again.`);
    await tellAdmins(`↩ Cover removed by ${p.name || 'a teacher'}: ${l.label}, ${when(l)} — ${await tname(back)} teaches it.`, null, uid);
    return true;
  }
  if (data.startsWith('cow:')) {
    const l = st.key && await findLesson(st.key); if (!l) { await answer(q, 'Press 🔁 Cover a lesson again.', true); return true; }
    const to = data === 'cow:all' ? 'all' : (st.teachers || [])[+data.slice(4)]; if (!to) { await answer(q, 'Press 🔁 Cover a lesson again.', true); return true; }
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5), from = l.teacherId, fromName = await tname(from);
    const R = await loadReqs(); R[id] = { id, key: l.key, label: l.label, when: when(l), from, to, by: p.name || '', byUid: uid, status: 'pending', at: new Date().toISOString(), declined: [] }; await saveReqs(R);
    await S().delete(`bot/cover/${chatId}`).catch(() => {});
    const kb = { inline_keyboard: [[{ text: '✅ Accept', callback_data: 'coa:' + id }, { text: '✖ Decline', callback_data: 'cod:' + id }]] };
    const ask = `🔁 Cover request from ${fromName}:\n${l.label}${l.room ? ' (' + l.room + ')' : ''}, ${when(l)}${l.end ? '–' + l.end : ''}.\nCan you teach this lesson?`;
    const chats = (await staffChats()).filter(c => c.p.teacherId && c.p.teacherId !== from && (to === 'all' || c.p.teacherId === to));
    for (const c of chats) await tgSend(c.chatId, ask, { reply_markup: kb }).catch(() => {});
    const toName = to === 'all' ? 'all teachers' : await tname(to);
    await answer(q, 'Request sent');
    await edit(q, `🔁 Request sent to ${toName}: ${l.label}, ${when(l)}.\n${chats.length ? "I'll tell you when someone answers." : (to === 'all' ? 'No other teacher is connected to the bot yet' : toName + ' is not connected to the bot yet') + ' — the admin has been asked to arrange it.'}`);
    await tellAdmins(`🔁 Cover request: ${fromName} needs a cover for ${l.label}, ${when(l)} — asked ${toName}${chats.length ? '' : ' (not connected to the bot)'}.\nYou can confirm it for them here.`, to === 'all' ? null : kb, uid);
    return true;
  }
  if (data.startsWith('coa:') || data.startsWith('cod:')) {
    const R = await loadReqs(), r = R[data.slice(4)];
    if (!r) { await answer(q, 'This request has expired.', true); await edit(q, 'This cover request has expired.'); return true; }
    if (r.status !== 'pending') { await answer(q, r.status === 'accepted' ? `Already covered by ${r.coverName}.` : 'This request was declined.', true); await edit(q, r.status === 'accepted' ? `✅ ${r.label}, ${r.when}: covered by ${r.coverName}.` : `✖ ${r.label}, ${r.when}: declined.`); return true; }
    const admin = canAll(p), mine = p.teacherId && (r.claim ? p.teacherId === r.from : (r.to === p.teacherId || (r.to === 'all' && p.teacherId !== r.from)));
    if (!admin && !mine) { await answer(q, 'This request is for another teacher.', true); return true; }
    const links = await getLinks(), reqChat = links[r.byUid] && links[r.byUid].chatId;
    if (data.startsWith('cod:')) {
      if (r.to === 'all' && !admin) { r.declined = [...new Set([...(r.declined || []), p.teacherId])]; R[r.id] = r; await saveReqs(R); await answer(q, 'OK'); await edit(q, `✖ You declined: ${r.label}, ${r.when}.`); await tellAdmins(`✖ ${p.name || 'A teacher'} can't cover ${r.label}, ${r.when}.`, null, uid); return true; }
      r.status = 'declined'; r.doneBy = p.name || ''; R[r.id] = r; await saveReqs(R);
      await answer(q, 'Declined'); await edit(q, `✖ Declined: ${r.label}, ${r.when}.`);
      if (reqChat && r.byUid !== uid) await tgSend(reqChat, r.claim ? `✖ ${p.name || 'The teacher'} says the cover for ${r.label}, ${r.when} is not right. Please talk to the admin.` : `✖ ${p.name || 'The teacher'} can't cover ${r.label}, ${r.when}. Press 🔁 Cover a lesson to ask someone else.`).catch(() => {});
      await tellAdmins(`✖ Cover declined by ${p.name || 'a teacher'}: ${r.label}, ${r.when}. It still needs a teacher.`, null, uid);
      return true;
    }
    // accept: the covering teacher is the one who pressed (or, for an admin confirming, the teacher asked)
    const cover = r.claim ? r.to : mine ? p.teacherId : r.to !== 'all' ? r.to : null;
    if (!cover) { await answer(q, 'Ask a teacher to accept, or choose one with 🔁 Cover a lesson.', true); return true; }
    const l = await findLesson(r.key); if (!l) { await answer(q, 'This lesson is not on the timetable any more.', true); return true; }
    await setCover(r.key, cover, p.name || '');
    r.status = 'accepted'; r.cover = cover; r.coverName = await tname(cover); r.doneBy = p.name || ''; r.doneAt = new Date().toISOString(); R[r.id] = r; await saveReqs(R);
    await answer(q, 'Thank you! ✓');
    await edit(q, `✅ ${r.coverName} covers ${r.label}, ${r.when}. It is in the timetable now — reminders, clock-in and the register go to ${r.coverName.split(' ')[0]}.`);
    if (reqChat && r.byUid !== uid) await tgSend(reqChat, `✅ ${r.coverName} will cover ${r.label}, ${r.when}.`).catch(() => {});
    if (!mine) { const cc = (await staffChats()).filter(c => c.p.teacherId === cover); for (const c of cc) await tgSend(c.chatId, `✅ You are covering ${r.label}${l.room ? ' (' + l.room + ')' : ''}, ${r.when} (confirmed by ${p.name || 'the admin'}). I'll remind you before the lesson.`).catch(() => {}); }
    { const { tellSmm } = await import('./daydigest.mjs'); await tellSmm(`🔁 Cover: ${r.coverName} teaches ${r.label}, ${r.when} instead of ${await tname(r.from)}.`).catch(() => {}); }
    await tellAdmins(`✅ Cover agreed: ${r.coverName} teaches ${r.label}, ${r.when} instead of ${await tname(r.from)}${r.doneBy && !mine ? ' (confirmed by ' + r.doneBy + ')' : ''}.`, null, uid);
    return true;
  }
  return false;
}

/** Open cover requests for the manager's to-do list. */
export async function openCoverRequests() {
  const R = await loadReqs(), today = new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10);
  return Object.values(R).filter(r => r.status === 'pending' && String(r.key).split('|')[1] >= today);
}
