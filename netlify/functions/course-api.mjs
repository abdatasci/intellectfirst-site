// IF video courses (Coursera-style): /courses/<id>/. The course outline is public (courses/<id>/course.js);
// this function holds what is not: the YouTube video of each lesson (unlisted, sent only to people allowed to
// watch that unit), progress, homework submissions and the teacher's feedback.
// Free preview: unit 1 for everyone, unit 2 with a free account, the rest for members (IF Academy students,
// individual students, paid online learners) and staff.
// Store "courses": <cid>/videos {lessonId: youtubeId}, <cid>/p/<uid> {done: {lessonId: ts}, quiz: {unit: score}},
// <cid>/sub/<uid>/<unit> {text, words, at, feedback?, by?}, <cid>/subs (index for teachers).
import { getStore } from '@netlify/blobs';
import { getUser, refreshSession } from '@netlify/identity';
import { tgAccount } from '../lib/tgauth.mjs';
import { tier } from '../lib/access.mjs';

const C = () => getStore({ name: 'courses', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const json = (d, s = 200) => Response.json(d, { status: s, headers: { 'Cache-Control': 'no-store' } });
const fail = (s, error) => json({ error }, s);
const COURSES = { ielts: { units: 8, title: 'IELTS Video Course' } };
const FREE_UNITS = 1, SIGNED_UNITS = 2;

async function who(req) {
  let user = null; try { user = (await tgAccount(req)) || (await refreshSession().catch(() => null), await getUser()); } catch {}
  if (!user) return { user: null, profile: null, level: 'none' };
  const profile = (await U().get(`u/${user.id}/profile`, { type: 'json' })) || null;
  return { user, profile, level: tier(profile) };
}
const canWatch = (level, unitNo) => unitNo <= FREE_UNITS || (level !== 'none' && unitNo <= SIGNED_UNITS) || level === 'member' || level === 'staff';
// a YouTube Shorts link (vertical video, like a Reel) is stored as "s:<id>" so the page shows a tall player
const ytId = v => { const s = String(v || '').trim(); const m = s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || s.match(/^(?:s:)?([\w-]{11})$/); return m ? ((/shorts\/|^s:/.test(s) ? 's:' : '') + m[1]) : ''; };
const unitOf = lessonId => +((String(lessonId).match(/^u(\d+)/) || [])[1] || 0);

export default async (req) => {
  const url = new URL(req.url), path = url.pathname.replace(/^\/api\/course\/?/, ''), [cid, action, arg] = path.split('/');
  if (!COURSES[cid]) return fail(404, 'course');
  const { user, profile, level } = await who(req), staff = level === 'staff';

  if (!action && req.method === 'GET') {
    const all = (await C().get(`${cid}/videos`, { type: 'json' })) || {}, videos = {};
    for (const [lid, id] of Object.entries(all)) if (staff || canWatch(level, unitOf(lid))) videos[lid] = id;
    const locked = Object.keys(all).filter(lid => !videos[lid]);
    const prog = user ? ((await C().get(`${cid}/p/${user.id}`, { type: 'json' })) || { done: {}, quiz: {} }) : null;
    const subs = {};
    if (user) for (let u = 1; u <= COURSES[cid].units; u++) { const s = await C().get(`${cid}/sub/${user.id}/u${u}`, { type: 'json' }); if (s) subs['u' + u] = { at: s.at, words: s.words, feedback: s.feedback || '', by: s.by || '' }; }
    return json({ level, name: profile?.name || '', videos, locked, progress: prog, subs, free: FREE_UNITS, signedFree: SIGNED_UNITS, staff });
  }
  if (!user) return fail(401, 'signin');

  if (action === 'progress' && req.method === 'POST') {
    const b = await req.json().catch(() => ({})), key = `${cid}/p/${user.id}`;
    const p = (await C().get(key, { type: 'json' })) || { done: {}, quiz: {} };
    if (/^u\d+-[\w-]{1,20}$/.test(b.lesson || '')) { if (b.done === false) delete p.done[b.lesson]; else p.done[b.lesson] = Date.now(); }
    if (/^u\d+$/.test(b.unit || '') && b.quiz != null) p.quiz[b.unit] = Math.max(+b.quiz || 0, p.quiz[b.unit] || 0);
    await C().setJSON(key, p); return json(p);
  }
  if (action === 'submit' && req.method === 'POST') {   // homework → the teacher
    const b = await req.json().catch(() => ({})), unit = String(b.unit || '');
    if (!/^u\d+$/.test(unit) || !canWatch(level, +unit.slice(1)) && !staff) return fail(403, 'locked');
    const text = String(b.text || '').slice(0, 8000), words = (text.match(/\S+/g) || []).length;
    if (words < 20) return fail(400, 'short');
    await C().setJSON(`${cid}/sub/${user.id}/${unit}`, { text, words, at: new Date().toISOString() });
    const idx = (await C().get(`${cid}/subs`, { type: 'json' })) || [];
    const row = { uid: user.id, name: profile?.name || user.email || 'Student', unit, at: new Date().toISOString(), words, done: false };
    const i = idx.findIndex(x => x.uid === user.id && x.unit === unit); if (i >= 0) idx[i] = row; else idx.unshift(row);
    await C().setJSON(`${cid}/subs`, idx.slice(0, 500));
    try { const { activity } = await import('../lib/activity.mjs'); await activity(`🎓 ${row.name} sent the ${COURSES[cid].title} homework for Unit ${unit.slice(1)} (${words} words). intellectfirst.com/courses/${cid}/#teacher`, user.id); } catch {}
    return json({ ok: true, words });
  }
  if (!staff) return fail(403, 'staff');
  // ---- staff: set a lesson's YouTube video; read and answer homework ----
  if (action === 'video' && req.method === 'POST') {
    const b = await req.json().catch(() => ({})), lid = String(b.lesson || '');
    if (!/^u\d+-[\w-]{1,20}$/.test(lid)) return fail(400, 'lesson');
    const all = (await C().get(`${cid}/videos`, { type: 'json' })) || {}, id = ytId(b.url);
    if (id) all[lid] = id; else delete all[lid];
    await C().setJSON(`${cid}/videos`, all); return json({ ok: true, id });
  }
  if (action === 'subs' && req.method === 'GET') return json({ subs: (await C().get(`${cid}/subs`, { type: 'json' })) || [] });
  if (action === 'sub' && req.method === 'GET') { const [uid, unit] = String(arg || '').split(':'); return json((await C().get(`${cid}/sub/${uid}/${unit}`, { type: 'json' })) || {}); }
  if (action === 'feedback' && req.method === 'POST') {
    const b = await req.json().catch(() => ({})), key = `${cid}/sub/${b.uid}/${b.unit}`, s = await C().get(key, { type: 'json' });
    if (!s) return fail(404, 'missing');
    s.feedback = String(b.feedback || '').slice(0, 4000); s.by = profile?.name || 'Teacher'; s.fbAt = new Date().toISOString();
    await C().setJSON(key, s);
    const idx = (await C().get(`${cid}/subs`, { type: 'json' })) || [], r = idx.find(x => x.uid === b.uid && x.unit === b.unit); if (r) { r.done = true; await C().setJSON(`${cid}/subs`, idx); }
    try { const { addNote } = await import('../lib/bot-core.mjs'); await addNote(b.uid, { kind: 'course', text: `📝 Your teacher answered your ${COURSES[cid].title} homework (Unit ${String(b.unit).slice(1)}). intellectfirst.com/courses/${cid}/` }); } catch {}
    return json({ ok: true });
  }
  return fail(404, 'route');
};
export const config = { path: ['/api/course/*'] };
