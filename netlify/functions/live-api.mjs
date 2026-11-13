// IF Live: classroom games students join by QR / PIN (like Kahoot, Blooket, Quizlet Live).
// Real-time messages go through Ably (env ABLY_API_KEY = "keyName:keySecret"); this function only
// creates rooms and signs short-lived Ably token requests, so the key never reaches a browser.
// Channels per room:  live:<PIN>:h  host → everyone (state, questions, scores)
//                     live:<PIN>:p  players → host (join, answers)
// Players may only publish on :p and listen on :h, so they cannot fake the host.
// Store "live": r/<PIN> room, res/<date>-<PIN> finished game summaries.
import { getStore } from '@netlify/blobs';
import { getUser } from '@netlify/identity';
import { isStaff } from '../lib/codes.mjs';
import { createHmac, randomBytes, randomInt } from 'node:crypto';

const L = () => getStore({ name: 'live', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const json = (d, s = 200) => Response.json(d, { status: s, headers: { 'Cache-Control': 'no-store' } });
const fail = (s, error) => json({ error }, s);
const str = (v, n = 80) => (v == null ? '' : String(v)).replace(/\s+/g, ' ').trim().slice(0, n);
const ROOM_HOURS = 4;

function tokenRequest(clientId, capability) {
  const key = process.env.ABLY_API_KEY || '';
  const [keyName, secret] = key.split(':');
  if (!keyName || !secret) return null;
  const cap = JSON.stringify(capability), ttl = 3 * 3600 * 1000, timestamp = Date.now(), nonce = randomBytes(16).toString('hex');
  const text = [keyName, ttl, cap, clientId, timestamp, nonce].join('\n') + '\n';
  const mac = createHmac('sha256', secret).update(text).digest('base64');
  return { keyName, ttl, capability: cap, clientId, timestamp, nonce, mac };
}
async function who() {
  let user = null; try { user = await getUser(); } catch {}
  if (!user) return { user: null, profile: null };
  const profile = (await U().get(`u/${user.id}/profile`, { type: 'json' })) || null;
  return { user, profile };
}
const alive = r => r && r.status !== 'ended' && Date.now() - r.created < ROOM_HOURS * 3600e3;
const hostCap = pin => ({ [`live:${pin}:h`]: ['publish', 'subscribe', 'presence'], [`live:${pin}:p`]: ['subscribe', 'presence'] });

export default async (req) => {
  const path = new URL(req.url).pathname.replace(/^\/api\/live\/?/, '');
  const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
  const ready = !!(process.env.ABLY_API_KEY || '').includes(':');

  if (path === 'status') return json({ ready });

  // Student (or anyone with the PIN) joins. No account needed; signed-in students are linked.
  if (path === 'join') {
    const pin = str(body.pin, 8).replace(/\D/g, '');
    const room = pin && await L().get('r/' + pin, { type: 'json' });
    if (!alive(room)) return fail(404, 'room');
    if (!ready) return fail(503, 'not-configured');
    const pid = /^p-[a-z0-9]{6,16}$/.test(body.pid || '') ? body.pid : 'p-' + randomBytes(5).toString('hex');
    const { user, profile } = await who();
    const tr = tokenRequest(pid, { [`live:${pin}:h`]: ['subscribe'], [`live:${pin}:p`]: ['presence', 'publish'] });
    return json({ pid, title: room.title, token: tr, account: user ? { uid: user.id, name: profile?.name || '' } : null });
  }

  const { user, profile } = await who();
  if (!user) return fail(401, 'login');

  // AI writes fresh questions (teachers for live games, signed-in students for solo practice).
  if (path === 'generate') {
    if (!isStaff(profile?.role)) {
      const day = new Date().toISOString().slice(0, 10), k = `quota/${user.id}/${day}`;
      const used = (await L().get(k, { type: 'json' })) || 0;
      if (used >= 25) return fail(429, 'quota');
      await L().setJSON(k, used + 1);
    }
    try { return json({ qs: await generate(body) }); }
    catch (e) { console.error('generate', e); return fail(502, 'ai'); }
  }
  if (!isStaff(profile?.role)) return fail(403, 'staff');
  const me = { uid: user.id, name: profile.name || user.email };

  if (path === 'host') {                       // new room
    if (!ready) return fail(503, 'not-configured');
    let pin = '';
    for (let i = 0; i < 20 && !pin; i++) { const p = String(randomInt(100000, 999999)); if (!alive(await L().get('r/' + p, { type: 'json' }))) pin = p; }
    if (!pin) return fail(500, 'busy');
    const room = { pin, title: str(body.title, 120) || 'Live game', mode: str(body.mode, 20), host: me.uid, hostName: me.name, created: Date.now(), status: 'lobby' };
    await L().setJSON('r/' + pin, room);
    return json({ room, token: tokenRequest('host-' + me.uid, hostCap(pin)) });
  }
  if (path === 'token') {                      // host reconnects, or another teacher watches / takes over
    const pin = str(body.pin, 8).replace(/\D/g, '');
    const room = pin && await L().get('r/' + pin, { type: 'json' });
    if (!alive(room)) return fail(404, 'room');
    if (!ready) return fail(503, 'not-configured');
    if (body.as === 'host') {
      if (room.host !== me.uid) { room.host = me.uid; room.hostName = me.name; await L().setJSON('r/' + pin, room); }
      return json({ room, token: tokenRequest('host-' + me.uid, hostCap(pin)) });
    }
    return json({ room, token: tokenRequest('watch-' + me.uid + '-' + randomBytes(3).toString('hex'), { [`live:${pin}:h`]: ['subscribe'], [`live:${pin}:p`]: ['subscribe'] }) });
  }
  if (path === 'rooms') {                      // games running now + recent results
    const { blobs } = await L().list({ prefix: 'r/' });
    const rooms = [];
    for (const b of blobs) {
      const r = await L().get(b.key, { type: 'json' });
      if (alive(r)) rooms.push(r); else if (r && Date.now() - r.created > 2 * 86400e3) await L().delete(b.key);
    }
    const res = (await L().list({ prefix: 'res/' })).blobs.map(b => b.key).sort().slice(-30).reverse();
    const recent = [];
    for (const k of res.slice(0, 15)) { const r = await L().get(k, { type: 'json' }); if (r) recent.push({ key: k.slice(4), title: r.title, mode: r.mode, at: r.at, hostName: r.hostName, players: (r.players || []).length, top: (r.players || []).slice(0, 3).map(p => p.name) }); }
    return json({ ready, rooms: rooms.sort((a, b) => b.created - a.created), recent });
  }
  if (path === 'state') {                      // host keeps the room's phase up to date (for the rooms list)
    const pin = str(body.pin, 8).replace(/\D/g, '');
    const room = pin && await L().get('r/' + pin, { type: 'json' });
    if (!room) return fail(404, 'room');
    room.status = ['lobby', 'playing', 'ended'].includes(body.status) ? body.status : room.status;
    if (body.players != null) room.players = +body.players || 0;
    await L().setJSON('r/' + pin, room);
    return json({ ok: true });
  }
  if (path === 'end') {                        // save the final scores
    const pin = str(body.pin, 8).replace(/\D/g, '');
    const room = pin && await L().get('r/' + pin, { type: 'json' });
    if (!room) return fail(404, 'room');
    room.status = 'ended'; await L().setJSON('r/' + pin, room);
    const players = (Array.isArray(body.players) ? body.players : []).slice(0, 200).map(p => ({
      name: str(p.name, 40), uid: str(p.uid, 60) || null, team: str(p.team, 30) || null,
      score: +p.score || 0, correct: +p.correct || 0, answered: +p.answered || 0
    }));
    const teams = (Array.isArray(body.teams) ? body.teams : []).slice(0, 6).map(t => ({ name: str(t.name, 30), score: +t.score || 0, size: +t.size || 0 }));
    const at = new Date().toISOString();
    await L().setJSON(`res/${at.slice(0, 19).replace(/[:T]/g, '-')}-${pin}`, {
      pin, title: room.title, mode: str(body.mode, 20), source: str(body.source, 160), questions: +body.questions || 0,
      host: me.uid, hostName: me.name, at, players, teams
    });
    return json({ ok: true });
  }
  if (path.startsWith('result/')) {
    const r = await L().get('res/' + path.slice(7), { type: 'json' });
    return r ? json(r) : fail(404, 'missing');
  }
  return fail(404, 'unknown');
};

/* ---------- AI question writer ---------- */
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const FOCUS = {
  vocab: 'vocabulary: word meaning, synonyms and opposites, collocations, word forms, phrasal verbs, words in context',
  grammar: 'grammar: gap-fill sentences, choosing the correct form, spotting the error, word order',
  mix: 'a mix of vocabulary and grammar, plus everyday functional English (best reply in a short dialogue, polite phrases)',
  speaking: 'everyday functional English: the best reply in a two-line dialogue, polite requests, opinions, agreeing and disagreeing, idioms used in conversation',
  exam: 'Cambridge / IELTS exam style: Use of English gap-fills, key word transformations as multiple choice, collocations, linking words'
};
const SYS = `You write multiple-choice questions for English learners at IF Academy, a language school in Kazakhstan (students speak Russian and Kazakh).
Write natural, correct British English at exactly the requested CEFR level. Every question has exactly one clearly correct answer; the wrong options are plausible for a learner at that level but definitely wrong. Never repeat a question. Keep everything classroom-friendly.
Reply with JSON only.`;
function cleanQ(q) {
  if (!q || typeof q !== 'object') return null;
  const p = str(q.p, 220), x = str(q.x, 200);
  let o = (Array.isArray(q.o) ? q.o : []).map(v => str(v, 90)).filter(Boolean);
  const a = +q.a;
  if (!p || o.length < 3 || o.length > 4 || !(a >= 0 && a < o.length)) return null;
  if (new Set(o.map(v => v.toLowerCase())).size !== o.length) return null;
  const right = o[a];
  for (let i = o.length - 1; i > 0; i--) { const j = randomInt(0, i + 1); [o[i], o[j]] = [o[j], o[i]]; }
  return { p, o, a: o.indexOf(right), x, k: 'ai' };
}
async function generate(b) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const ai = new Anthropic();
  const level = LEVELS.includes(b.level) ? b.level : 'B1';
  const focus = FOCUS[b.focus] ? b.focus : 'mix';
  const topic = str(b.topic, 120) || 'general everyday topics';
  const words = (Array.isArray(b.words) ? b.words : []).slice(0, 60).map(w => str(w, 40)).filter(Boolean);
  const count = Math.min(30, Math.max(5, +b.count || 10));
  const nb = Math.ceil(count / 8), batches = Array.from({ length: nb }, (_, i) => Math.floor(count / nb) + (i < count % nb ? 1 : 0)); // small parallel batches: fast enough for the function time limit
  const ask = (n, part) => ai.messages.create({
    model: process.env.LIVE_MODEL || 'claude-haiku-5-5', max_tokens: 220 * n + 300, temperature: 0.9, system: SYS,
    messages: [{ role: 'user', content:
`Write ${n} questions.
Level: ${level} (CEFR).
Focus: ${FOCUS[focus]}.
Topic: ${topic}.
${words.length ? `Build the questions around these words from the class's coursebook unit (use each at most once, natural sentences): ${words.filter((_, i) => i % batches.length === part - 1).join(', ')}.\n` : ''}${batches.length > 1 ? `This is set ${part} of ${batches.length}; other sets are written at the same time, so ${['start with everyday, easier', 'choose less obvious', 'use different sub-topics and', 'make these the most varied and challenging'][Math.min(part - 1, 3)]} questions.\n` : ''}Vary the question types. Use ___ for a gap. Keep prompts under 150 characters and options short (1–6 words). 4 options for vocabulary, 3 or 4 for grammar.
"x" is a one-sentence explanation a student sees after answering (under 110 characters); for a key word you may add the Russian translation in brackets.
JSON shape: {"questions":[{"p":"prompt","o":["option","option","option","option"],"a":0,"x":"why"}]}  where "a" is the index of the correct option.` }]
  }).then(m => {
    const t = m.content.map(c => c.text || '').join('');
    const s = t.indexOf('{'), e = t.lastIndexOf('}');
    const j = JSON.parse(t.slice(s, e + 1));
    return (j.questions || []).map(cleanQ).filter(Boolean);
  });
  const parts = await Promise.allSettled(batches.map((n, i) => ask(n, i + 1)));
  const seen = new Set(), out = [];
  for (const p of parts) if (p.status === 'fulfilled') for (const q of p.value) { const k = q.p.toLowerCase(); if (!seen.has(k)) { seen.add(k); out.push(q); } }
  if (!out.length) throw new Error(parts.map(p => p.reason?.message).join('; ') || 'empty');
  return out.slice(0, count);
}

export const config ={ path: ['/api/live', '/api/live/*'] };
