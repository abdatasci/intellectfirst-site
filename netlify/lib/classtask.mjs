// Class tasks in the Telegram bot ("🎯 Class task"): during a lesson the teacher sends a task to everyone in the class,
// students answer on their phones, and the teacher's message updates live with who has answered and how they did.
//   ❓ Quiz     a native Telegram quiz (one question, the teacher marks the right answer with *)
//   ✨ AI quiz  the teacher types a topic and level; the assistant writes 3 quiz questions to check first
//   📊 Poll     an opinion question, no right answer (good for warmers and discussion)
//   ✍️ Written  students reply with a text (or a photo of their writing)
//   🎙 Speaking students reply with a voice message (the teacher gets each one to listen to)
// Storage (Blobs "school"): ctask/<id> the task · ctask/<id>/a/<sid>/<i> one answer · ctask/poll/<pollId> → task,
// student and question · ctask/open/<chatId> the written/speaking task a student is answering · bot/ctflow/<chatId> the
// teacher's choices while setting it up. Answers are separate records so a whole class can answer at the same moment.
import Anthropic from '@anthropic-ai/sdk';
import { getStore } from '@netlify/blobs';
import { doc, getLinks, tg, tgSend, tgSecret, uidsByStudent, inClass, local, MODEL } from './bot-core.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const FLOW = chatId => `bot/ctflow/${chatId}`;
const CANCEL = [{ text: '✖ Cancel', callback_data: 'ct:x' }];
const KIND = { quiz: '❓ Quiz', ai: '✨ AI quiz', poll: '📊 Poll', text: '✍️ Written answer', voice: '🎙 Speaking' };
const MENU = /^(🕑|📅|❓|📊|💳|📎|📝|🎯|📚|👤)|^\//;   // menu buttons and commands are never taken as answers
const answer = (q, text, alert) => tg('answerCallbackQuery', { callback_query_id: q.id, text, show_alert: !!alert }).catch(() => {});
const edit = (q, text, markup) => q.message && tg('editMessageText', { chat_id: q.message.chat.id, message_id: q.message.message_id, text, reply_markup: markup || { inline_keyboard: [] } }).catch(() => {});
const hm = d => { const l = local(d); return String(l.getUTCHours()).padStart(2, '0') + ':' + String(l.getUTCMinutes()).padStart(2, '0'); };
const cut = (s, n) => { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

async function myClasses(p) {
  const classes = await doc('classes');
  if (p.role === 'admin' || p.manager) return classes;
  return classes.filter(c => p.teacherId && c.teacherId === p.teacherId);
}
async function getFlow(chatId) { const s = await S().get(FLOW(chatId), { type: 'json' }); return s && s.exp > Date.now() ? s : null; }
const putFlow = (chatId, st) => S().setJSON(FLOW(chatId), { ...st, exp: Date.now() + 30 * 60e3 });

/** Polls need "poll_answer" updates: add them to the webhook once if it was set up with a fixed list. */
async function ensurePollUpdates() {
  try {
    if ((await S().get('bot/hook-polls')) === 'v1') return;
    const info = await tg('getWebhookInfo');
    if (info.url && Array.isArray(info.allowed_updates) && info.allowed_updates.length && !info.allowed_updates.includes('poll_answer'))
      await tg('setWebhook', { url: info.url, secret_token: await tgSecret(), allowed_updates: [...new Set([...info.allowed_updates, 'message', 'callback_query', 'poll_answer'])] });
    await S().set('bot/hook-polls', 'v1');
  } catch (e) { console.error('poll updates', e.message); }
}

/* ---------------- teacher: set up a task ---------------- */
export async function startTask(chatId, p) {
  const classes = (await myClasses(p)).filter(c => c.label).sort((a, b) => a.label.localeCompare(b.label)).slice(0, 30);
  if (!classes.length) return tgSend(chatId, 'You have no classes on the timetable yet. Ask the manager to set you as the teacher in Admin → Classes.');
  await putFlow(chatId, { step: 'class', ids: classes.map(c => c.id) });
  const rows = []; for (let i = 0; i < classes.length; i += 2) rows.push(classes.slice(i, i + 2).map((c, j) => ({ text: c.label, callback_data: 'ct:c:' + (i + j) })));
  rows.push(CANCEL);
  return tgSend(chatId, '🎯 Class task: students answer on their phones and you see the answers here, live.\nWhich class?', { reply_markup: { inline_keyboard: rows } });
}

const HOW = {
  quiz: 'Type the question, then each answer on a new line. Put * before the right answer.\n\nExample:\nWhich sentence is correct?\n*I have lived here since 2020.\nI live here since 2020.\nI am living here since 2020.',
  poll: 'Type the question, then each option on a new line (2–10 options).\n\nExample:\nWhat is the best way to learn new words?\nReading\nApps and games\nTalking to people\nWriting them down',
  text: 'Type the task. Students reply with a text (or a photo of their writing).\n\nExample: Write three sentences about your weekend using the past simple.\n\nYou can also send a photo with the task as its caption.',
  voice: 'Type the speaking task. Students reply with a voice message, and I send each one to you.\n\nExample: Describe your favourite place in Kostanay for 30 seconds.\n\nYou can also send a photo (for example, a picture to describe) with the task as its caption.',
  ai: 'Type the topic and the level, and I will write 3 quiz questions for you to check before sending.\n\nExample: present perfect vs past simple, B1'
};

function parseChoices(text, quiz) {
  const lines = String(text).split('\n').map(s => s.trim()).filter(Boolean);
  if (lines.length < 3) return { err: 'I need the question and at least 2 answers, each on its own line.' };
  const q = lines[0].replace(/^\*\s*/, ''), raw = lines.slice(1, 11);
  let a = -1; const o = raw.map((s, i) => { if (/^\*/.test(s) || /\s\*$/.test(s)) { if (a < 0) a = i; return s.replace(/^\*\s*/, '').replace(/\s*\*$/, ''); } return s.replace(/^[-•]\s*/, ''); });
  if (quiz && a < 0) return { err: 'Put * before the right answer, for example:\n*I have lived here since 2020.' };
  if (q.length > 300) return { err: 'The question is too long for a Telegram quiz (300 characters at most).' };
  if (o.some(x => x.length > 100)) return { err: 'Each answer can be 100 characters at most.' };
  return { item: { q, o, a: quiz ? a : -1 } };
}

async function aiQuiz(topic) {
  const ai = new Anthropic();
  const res = await ai.messages.create({
    model: MODEL, max_tokens: 900,
    system: 'You write short multiple-choice English quizzes for a language school. Reply with JSON only.',
    messages: [{ role: 'user', content: `Write 3 multiple-choice questions to check this in class: ${topic}\nRules: natural, correct British English; exactly one right answer; 3 or 4 options each; question at most 200 characters; each option at most 80 characters; a one-sentence explanation (at most 150 characters). JSON: {"questions":[{"q":"…","o":["…","…","…"],"a":0,"why":"…"}]} where "a" is the index of the right option.` }]
  });
  const txt = res.content.map(c => c.text || '').join('');
  const j = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
  return (j.questions || []).filter(x => x && x.q && Array.isArray(x.o) && x.o.length >= 2 && x.a >= 0 && x.a < x.o.length).slice(0, 5)
    .map(x => ({ q: cut(x.q, 290), o: x.o.slice(0, 6).map(s => cut(s, 95)), a: x.a, why: cut(x.why || '', 190) }));
}

function preview(st) {
  const lim = st.min ? `⏱ ${st.min} minutes` : '⏱ No time limit';
  let body = '';
  if (st.items) body = st.items.map((it, n) => (st.items.length > 1 ? `${n + 1}. ` : '') + it.q + '\n' + it.o.map((o, i) => (i === it.a ? '  ✅ ' : '  ▫️ ') + o).join('\n')).join('\n\n');
  else body = st.text + (st.photo ? '\n📷 + your photo' : '');
  return `🎯 ${KIND[st.kind]} · ${st.label}\n${lim}\n\n${body}`;
}
const timeKb = { inline_keyboard: [[{ text: '3 min', callback_data: 'ct:t:3' }, { text: '5 min', callback_data: 'ct:t:5' }, { text: '10 min', callback_data: 'ct:t:10' }, { text: 'No limit', callback_data: 'ct:t:0' }], CANCEL] };

/** Buttons: ct:c:<i> class · ct:k:<kind> · ct:t:<min> · ct:send · ct:x · ct:r:<id> refresh · ct:e:<id> end */
export async function ctCallback(q, p) {
  const data = String(q.data || ''), chatId = q.message?.chat?.id;
  if (data.startsWith('ct:r:') || data.startsWith('ct:e:')) {
    const id = data.slice(5), t = await S().get(`ctask/${id}`, { type: 'json' });
    if (!t) { await answer(q, 'Task not found.', true); return true; }
    if (data.startsWith('ct:e:')) { await answer(q, 'Task ended'); await endTask(t); } else { await answer(q, 'Updated'); await refresh(id); }
    return true;
  }
  if (data === 'ct:x') { await S().delete(FLOW(chatId)); await answer(q, 'Cancelled'); await edit(q, '✖ Cancelled. Nothing was sent.'); return true; }
  const st = await getFlow(chatId);
  if (!st) { await answer(q, 'Expired. Press 🎯 Class task again.', true); return true; }
  if (data.startsWith('ct:c:')) {
    const cid = st.ids[+data.slice(5)], cls = (await doc('classes')).find(c => c.id === cid);
    if (!cls) { await answer(q, 'Class not found.', true); return true; }
    await putFlow(chatId, { step: 'kind', classId: cid, label: cls.label });
    await answer(q, '');
    await edit(q, `Class: ${cls.label}\nWhat kind of task?`, { inline_keyboard: [[{ text: KIND.quiz, callback_data: 'ct:k:quiz' }, { text: KIND.ai, callback_data: 'ct:k:ai' }], [{ text: KIND.poll, callback_data: 'ct:k:poll' }, { text: KIND.text, callback_data: 'ct:k:text' }], [{ text: KIND.voice, callback_data: 'ct:k:voice' }], CANCEL] });
    return true;
  }
  if (data.startsWith('ct:k:')) {
    const kind = data.slice(5); if (!KIND[kind]) return true;
    await putFlow(chatId, { ...st, step: 'content', kind });
    await answer(q, '');
    await edit(q, `Class: ${st.label} · ${KIND[kind]}\n\n${HOW[kind]}`, { inline_keyboard: [CANCEL] });
    return true;
  }
  if (data.startsWith('ct:t:')) {
    if (st.step !== 'time') { await answer(q, 'Not ready yet.', true); return true; }
    const next = { ...st, step: 'confirm', min: +data.slice(5) || 0 };
    await putFlow(chatId, next); await answer(q, '');
    await edit(q, preview(next) + '\n\nSend this to everyone in the class now?', { inline_keyboard: [[{ text: '🚀 Send to the class', callback_data: 'ct:send' }], CANCEL] });
    return true;
  }
  if (data === 'ct:send') {
    if (st.step !== 'confirm') { await answer(q, 'Not ready yet.', true); return true; }
    await S().delete(FLOW(chatId));
    await answer(q, 'Sending…');
    await edit(q, preview(st) + '\n\n🚀 Sending…');
    await sendTask(st, p, chatId);
    return true;
  }
  return false;
}

/** Typed messages while setting up a task (the question, task text, photo or AI topic). Returns true if used. */
export async function ctMessage(chatId, p, m) {
  const st = await getFlow(chatId); if (!st) return false;
  const text = String(m.text || m.caption || '').trim();
  if (m.text && MENU.test(text) && !/^\/cancel/i.test(text)) { await S().delete(FLOW(chatId)); return false; }
  if (/^\/cancel\b|^✖/i.test(text)) { await S().delete(FLOW(chatId)); await tgSend(chatId, '✖ Cancelled. Nothing was sent.'); return true; }
  if (st.step !== 'content' && st.step !== 'time' && st.step !== 'confirm') return false;
  const kind = st.kind;
  if (kind === 'quiz' || kind === 'poll') {
    if (!text) { await tgSend(chatId, HOW[kind]); return true; }
    const r = parseChoices(text, kind === 'quiz');
    if (r.err) { await tgSend(chatId, '⚠️ ' + r.err, { reply_markup: { inline_keyboard: [CANCEL] } }); return true; }
    await putFlow(chatId, { ...st, step: 'time', items: [r.item] });
  } else if (kind === 'ai') {
    if (!text) { await tgSend(chatId, HOW.ai); return true; }
    tg('sendChatAction', { chat_id: chatId, action: 'typing' }).catch(() => {});
    let items = [];
    try { items = await aiQuiz(text.slice(0, 300)); } catch (e) { console.error('ai quiz', e.message); }
    if (!items.length) { await tgSend(chatId, 'Sorry, I could not write the quiz just now. Try again, or choose ❓ Quiz and type your own question.', { reply_markup: { inline_keyboard: [CANCEL] } }); return true; }
    await putFlow(chatId, { ...st, step: 'time', items, topic: text.slice(0, 120) });
    await tgSend(chatId, '✨ Here is the quiz. Check it, then choose the time (or type another topic to write a new one):\n\n' + items.map((it, n) => `${n + 1}. ${it.q}\n` + it.o.map((o, i) => (i === it.a ? '  ✅ ' : '  ▫️ ') + o).join('\n')).join('\n\n'), { reply_markup: timeKb });
    return true;
  } else {
    const photo = m.photo ? m.photo[m.photo.length - 1].file_id : null;
    if (!text && !photo) { await tgSend(chatId, HOW[kind]); return true; }
    await putFlow(chatId, { ...st, step: 'time', text: (text || (kind === 'voice' ? 'Describe the picture.' : 'Write about the picture.')).slice(0, 900), photo });
  }
  await tgSend(chatId, 'How long do students have?', { reply_markup: timeKb });
  return true;
}

/* ---------------- sending ---------------- */
async function roster(cls) {
  const students = (await doc('students')).filter(s => inClass(cls, s) && !/withdrawn|finished|frozen/i.test(s.status || ''));
  const links = await getLinks(), bySid = await uidsByStudent(links);
  return students.map(s => {
    const uid = s.uid || bySid[s.id] || (links['sid:' + s.id] ? 'sid:' + s.id : null), l = uid && links[uid];
    return { sid: s.id, name: `${s.first || ''} ${s.last || ''}`.trim() || s.id, chatId: l ? l.chatId : null, lang: l?.lang || 'ru' };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

async function sendTask(st, p, teacherChat) {
  const cls = (await doc('classes')).find(c => c.id === st.classId);
  if (!cls) return tgSend(teacherChat, 'Class not found.');
  if (st.items) await ensurePollUpdates();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6), now = Date.now();
  const closeAt = st.min ? now + st.min * 60e3 : 0;
  const people = await roster(cls), on = people.filter(x => x.chatId), off = people.filter(x => !x.chatId);
  const teacher = (p.name || 'your teacher').split(' ')[0];
  const t = { id, classId: cls.id, label: cls.label, kind: st.kind, items: st.items || null, text: st.text || '', photo: st.photo || null, by: p.name || '', tChat: teacherChat, tMsg: null,
    at: new Date(now).toISOString(), closeAt, open: true, students: people.map(x => ({ sid: x.sid, name: x.name, tg: !!x.chatId })), msgs: {} };
  const lim = st.min ? `⏱ ${st.min} min (until ${hm(new Date(closeAt))})` : '';
  for (const s of on) {
    const ms = [];
    try {
      if (t.items) {
        const head = { en: `🎯 Class task from ${teacher} (${cls.label}): answer the ${t.items.length > 1 ? t.items.length + ' questions' : 'question'} below.`, ru: `🎯 Задание на уроке от ${teacher} (${cls.label}): ответьте на ${t.items.length > 1 ? 'вопросы' : 'вопрос'} ниже.` }[s.lang === 'en' ? 'en' : 'ru'];
        await tgSend(s.chatId, head + (lim ? '\n' + lim : ''));
        for (let i = 0; i < t.items.length; i++) {
          const it = t.items[i];
          const msg = await tg('sendPoll', { chat_id: s.chatId, question: it.q, options: it.o.map(o => ({ text: o })), is_anonymous: false,
            type: t.kind === 'poll' ? 'regular' : 'quiz', ...(t.kind === 'poll' ? {} : { correct_option_id: it.a }), ...(it.why ? { explanation: it.why } : {}),
            ...(st.min && st.min <= 10 ? { open_period: st.min * 60 } : {}) });
          ms.push(msg.message_id);
          await S().setJSON(`ctask/poll/${msg.poll.id}`, { id, sid: s.sid, i });
        }
      } else {
        const how = t.kind === 'voice'
          ? { en: '🎙 Answer with a voice message: hold the microphone button, speak, and let go.', ru: '🎙 Ответьте голосовым сообщением: удерживайте кнопку микрофона и говорите.' }
          : { en: '✍️ Write your answer in one message (or send a photo of your writing).', ru: '✍️ Напишите ответ одним сообщением (или отправьте фото).' };
        const L = s.lang === 'en' ? 'en' : 'ru';
        const body = `🎯 ${L === 'en' ? 'Class task from' : 'Задание на уроке от'} ${teacher} (${cls.label}):\n\n${t.text}\n\n${how[L]}${lim ? '\n' + lim : ''}`;
        const msg = t.photo ? await tg('sendPhoto', { chat_id: s.chatId, photo: t.photo, caption: body.slice(0, 1000) }) : await tgSend(s.chatId, body);
        ms.push(msg.message_id);
        await S().setJSON(`ctask/open/${s.chatId}`, { id, sid: s.sid, name: s.name, kind: t.kind, exp: closeAt || now + 3 * 3600e3 });
      }
    } catch (e) { console.error('class task send', s.sid, e.message); }
    t.msgs[s.sid] = { chatId: s.chatId, ids: ms };
  }
  const live = await tgSend(teacherChat, '🎯 Starting…');
  t.tMsg = live.message_id;
  await S().setJSON(`ctask/${id}`, t);
  await S().setJSON(`ctask/last/${cls.id}`, { id, at: t.at });
  await refresh(id);
  if (!on.length) await tgSend(teacherChat, 'Nobody in this class is connected to the bot yet, so nobody received the task. Students connect from intellectfirst.com → My account → Assistant, or by sharing their phone number with the bot.');
}

/* ---------------- answers ---------------- */
async function answersOf(id) {
  const { blobs } = await S().list({ prefix: `ctask/${id}/a/` });
  const out = {};
  await Promise.all(blobs.map(async b => { const v = await S().get(b.key, { type: 'json' }); const [, , , sid, i] = b.key.split('/'); if (v) (out[sid] = out[sid] || {})[+i] = v; }));
  return out;
}

/** A student's vote in a quiz or poll (Telegram "poll_answer" update). */
export async function ctPollAnswer(pa) {
  const ref = await S().get(`ctask/poll/${pa.poll_id}`, { type: 'json' }); if (!ref) return;
  const t = await S().get(`ctask/${ref.id}`, { type: 'json' }); if (!t || !t.open) return;
  const key = `ctask/${ref.id}/a/${ref.sid}/${ref.i}`;
  if (!pa.option_ids || !pa.option_ids.length) await S().delete(key);   // vote retracted (polls only)
  else await S().setJSON(key, { o: pa.option_ids, at: new Date().toISOString() });
  await refresh(ref.id);
}

/** A written or spoken answer from a student who has an open task. Returns true if the message was taken as the answer. */
export async function ctAnswer(chatId, m, lang) {
  const pend = await S().get(`ctask/open/${chatId}`, { type: 'json' }); if (!pend) return false;
  const text = String(m.text || m.caption || '').trim();
  if (m.text && MENU.test(text)) return false;
  const voice = m.voice || m.video_note || m.audio, photo = m.photo ? m.photo[m.photo.length - 1].file_id : null;
  if (!text && !voice && !photo) return false;
  const en = lang === 'en';
  const t = await S().get(`ctask/${pend.id}`, { type: 'json' });
  if (!t || !t.open || (pend.exp && Date.now() > pend.exp)) {
    await S().delete(`ctask/open/${chatId}`);
    if (Date.now() - (pend.exp || 0) < 20 * 60e3) { await tgSend(chatId, en ? '⏱ Time is up for this task — ask your teacher.' : '⏱ Время на задание вышло — спросите учителя.'); return true; }
    return false;
  }
  const a = { at: new Date().toISOString(), text: text.slice(0, 1500) };
  if (voice) { a.voice = voice.file_id; a.vkind = m.voice ? 'voice' : m.video_note ? 'video_note' : 'audio'; a.sec = voice.duration || 0; }
  if (photo) a.photo = photo;
  await S().setJSON(`ctask/${pend.id}/a/${pend.sid}/0`, a);
  await S().delete(`ctask/open/${chatId}`);
  await tgSend(chatId, en ? '✅ Sent to your teacher. Well done!' : '✅ Ответ отправлен учителю. Молодец!');
  // the teacher gets voice messages and photos to listen to / look at
  try {
    const cap = `🎯 ${pend.name} · ${t.label}`;
    if (a.voice) await tg(a.vkind === 'video_note' ? 'sendVideoNote' : a.vkind === 'audio' ? 'sendAudio' : 'sendVoice', { chat_id: t.tChat, [a.vkind === 'video_note' ? 'video_note' : a.vkind === 'audio' ? 'audio' : 'voice']: a.voice, ...(a.vkind === 'video_note' ? {} : { caption: cap }) });
    else if (a.photo) await tg('sendPhoto', { chat_id: t.tChat, photo: a.photo, caption: (cap + (a.text ? '\n' + a.text : '')).slice(0, 1000) });
  } catch (e) { console.error('class task forward', e.message); }
  await refresh(pend.id);
  return true;
}

/* ---------------- the teacher's live message ---------------- */
function render(t, A) {
  const now = Date.now(), over = t.closeAt && now > t.closeAt, closed = !t.open || over;
  const tgs = t.students.filter(s => s.tg), offs = t.students.filter(s => !s.tg);
  const done = tgs.filter(s => A[s.sid] && Object.keys(A[s.sid]).length >= (t.items ? t.items.length : 1));
  const lines = [`🎯 ${KIND[t.kind]} · ${t.label}`, t.open ? (t.closeAt ? (over ? '⏱ Time is up' : `⏱ Until ${hm(new Date(t.closeAt))}`) : '🟢 Open') : '⏹ Ended', ''];
  if (t.items) lines.push(t.items.map((it, n) => (t.items.length > 1 ? `${n + 1}. ` : '') + cut(it.q, 160)).join('\n'), '');
  else lines.push(cut(t.text, 300), '');
  lines.push(`Answered: ${done.length} of ${tgs.length}`);
  if (t.kind === 'quiz' || t.kind === 'ai') {
    const n = t.items.length;
    const rows = tgs.map(s => { const a = A[s.sid] || {}; let r = 0, got = 0; const marks = t.items.map((it, i) => { if (!a[i]) return '·'; got++; const ok = a[i].o[0] === it.a; if (ok) r++; return ok ? '✅' : '❌'; }); return { s, r, got, marks }; });
    rows.filter(x => x.got).sort((a, b) => b.r - a.r).forEach(x => lines.push(`${x.marks.join('')} ${x.s.name} — ${x.r}/${n}`));
    const wait = rows.filter(x => !x.got).map(x => x.s.name); if (wait.length) lines.push(`⏳ ${wait.join(', ')}`);
    if (n > 1 || rows.some(x => x.got)) {
      lines.push('');
      t.items.forEach((it, i) => { const ans = rows.filter(x => (A[x.s.sid] || {})[i]), ok = ans.filter(x => A[x.s.sid][i].o[0] === it.a).length; if (ans.length) lines.push(`${n > 1 ? 'Q' + (i + 1) + ': ' : ''}${ok}/${ans.length} correct (${Math.round(ok / ans.length * 100)}%)` + (ok / ans.length < .6 ? ' — worth going over' : '')); });
    }
  } else if (t.kind === 'poll') {
    const it = t.items[0], cnt = it.o.map(() => []);
    tgs.forEach(s => { const a = (A[s.sid] || {})[0]; if (a) a.o.forEach(k => cnt[k] && cnt[k].push(s.name.split(' ')[0])); });
    const max = Math.max(1, ...cnt.map(c => c.length));
    it.o.forEach((o, k) => lines.push(`${'▓'.repeat(Math.round(cnt[k].length / max * 8)).padEnd(8, '░')} ${cnt[k].length} · ${cut(o, 40)}${cnt[k].length ? ' (' + cnt[k].join(', ') + ')' : ''}`));
    const wait = tgs.filter(s => !A[s.sid]).map(s => s.name); if (wait.length) lines.push(`⏳ ${wait.join(', ')}`);
  } else {
    lines.push('');
    tgs.forEach(s => { const a = (A[s.sid] || {})[0]; if (!a) return; lines.push(t.kind === 'voice' && a.voice ? `🎙 ${s.name} — voice ${a.sec ? a.sec + ' s' : ''} (sent to you above)` : `• ${s.name}: ${a.text ? cut(a.text, 280) : ''}${a.photo ? ' 📷' : ''}${a.voice ? ' 🎙' : ''}`); });
    const wait = tgs.filter(s => !A[s.sid]).map(s => s.name); if (wait.length) lines.push(`⏳ ${wait.join(', ')}`);
  }
  if (offs.length) lines.push('', `Not on the bot (could not take part): ${offs.map(s => s.name).join(', ')}`);
  let txt = lines.join('\n'); if (txt.length > 4000) txt = txt.slice(0, 3990) + '…';
  return { txt, kb: { inline_keyboard: closed && !t.open ? [] : [[{ text: '🔄 Refresh', callback_data: 'ct:r:' + t.id }, { text: '⏹ End task', callback_data: 'ct:e:' + t.id }]] } };
}

export async function refresh(id) {
  const t = await S().get(`ctask/${id}`, { type: 'json' }); if (!t || !t.tMsg) return;
  const { txt, kb } = render(t, await answersOf(id));
  await tg('editMessageText', { chat_id: t.tChat, message_id: t.tMsg, text: txt, reply_markup: kb }).catch(e => { if (!/not modified/.test(e.message)) console.error('class task refresh', e.message); });
}

async function endTask(t) {
  if (t.open) {
    t.open = false; t.endedAt = new Date().toISOString();
    await S().setJSON(`ctask/${t.id}`, t);
    await Promise.all(Object.values(t.msgs || {}).map(async m => {
      if (t.items) for (const mid of m.ids) await tg('stopPoll', { chat_id: m.chatId, message_id: mid }).catch(() => {});
      const pend = await S().get(`ctask/open/${m.chatId}`, { type: 'json' }); if (pend && pend.id === t.id) await S().delete(`ctask/open/${m.chatId}`);
    }));
  }
  await refresh(t.id);
}
