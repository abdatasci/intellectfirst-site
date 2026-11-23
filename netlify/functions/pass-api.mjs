// Guest passes: the director gives an outsider a QR code that opens a personal page of games and lessons for a
// few days, with no account. Store "pass": p/<CODE> = { code, name, level, show, days, created, by, started, until, ended }.
//   POST /api/pass/new   (staff)  { name, level, show: [...], days }  → { code }
//   GET  /api/pass/list  (staff)  → { passes: [...] }
//   POST /api/pass/end   (staff)  { code }
//   POST /api/pass/start (anyone)  { name, age, level } → { code }   the public "try 3 days" page (/try/)
//   GET  /api/pass/<CODE>         (anyone with the code) → { first, level, show, until, left } — the clock starts on the first open
// The full name stays in the store; the public answer carries the first name only.
import { getStore } from '@netlify/blobs';
import { tgAccount } from '../lib/tgauth.mjs';
import { getUser } from '@netlify/identity';
import { refreshSession } from '../lib/refresh.mjs';   // never deletes the sign-in cookies (parallel requests)
import { isStaff } from '../lib/codes.mjs';
import { randomInt } from 'node:crypto';

const P = () => getStore({ name: 'pass', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const json = (d, s = 200) => Response.json(d, { status: s, headers: { 'Cache-Control': 'no-store' } });
const fail = (s, error) => json({ error }, s);
const str = (v, n = 60) => (v == null ? '' : String(v)).replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
export const LEVELS = ['Starters', 'Movers', 'Flyers', 'A1', 'A2', 'B1', 'B2', 'C1'];
export const SHOW = ['roblox', 'race', 'minecraft', 'mindlab', 'chess', 'lessons'];
const SELF_PER_DAY = 40;   // the public "try 3 days" form: at most this many new passes a day
const ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // no 0/O, 1/I
const newCode = () => Array.from({ length: 8 }, () => ABC[randomInt(ABC.length)]).join('');

async function staff(req) {
  let user = null; try { user = (await tgAccount(req)) || (await refreshSession().catch(() => null), await getUser()); } catch {}
  if (!user) return null;
  const profile = (await U().get(`u/${user.id}/profile`, { type: 'json' })) || null;
  return profile && isStaff(profile.role) ? { user, profile } : false;
}
const state = p => p.ended ? 'ended' : !p.started ? 'not opened yet' : Date.parse(p.until) < Date.now() ? 'finished' : 'active';

export default async (req) => {
  const path = new URL(req.url).pathname.replace(/^\/api\/pass\/?/, '');
  const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};

  if (path === 'new' || path === 'list' || path === 'end') {
    const me = await staff(req);
    if (me === null) return fail(401, 'login');
    if (!me) return fail(403, 'staff');
    if (path === 'new' && req.method === 'POST') {
      const name = str(body.name), level = LEVELS.includes(body.level) ? body.level : '';
      const show = (Array.isArray(body.show) ? body.show : []).filter(k => SHOW.includes(k));
      const days = Math.max(1, Math.min(30, Math.round(+body.days || 3)));
      if (!name || !level || !show.length) return fail(400, 'fields');
      let code = newCode(); while (await P().get(`p/${code}`)) code = newCode();
      const p = { code, name, level, show, days, created: new Date().toISOString(), by: me.profile.name || '' };
      await P().setJSON(`p/${code}`, p);
      return json({ code, pass: { ...p, state: state(p) } });
    }
    if (path === 'list') {
      const { blobs } = await P().list({ prefix: 'p/' });
      const all = (await Promise.all(blobs.map(b => P().get(b.key, { type: 'json' })))).filter(Boolean);
      all.sort((a, b) => (a.created < b.created ? 1 : -1));
      return json({ passes: all.slice(0, 200).map(p => ({ ...p, state: state(p) })) });
    }
    if (path === 'end' && req.method === 'POST') {
      const code = str(body.code, 12).toUpperCase(), p = await P().get(`p/${code}`, { type: 'json' });
      if (!p) return fail(404, 'pass');
      p.ended = new Date().toISOString(); await P().setJSON(`p/${code}`, p);
      return json({ ok: true });
    }
    return fail(405, 'method');
  }

  /* The public "try for 3 days" form (one QR for everybody, /try/). The visitor gives an age and a level; the page
     gets a personal 3-day pass with games chosen for them. The exact age is not kept, only the age group. */
  if (path === 'start') {
    if (req.method !== 'POST') return fail(405, 'method');
    const age = Math.round(+body.age), given = ['A1', 'A2', 'B1', 'B2', 'C1'].includes(body.level) ? body.level : '';
    if (!(age >= 4 && age <= 99)) return fail(400, 'age');
    const day = new Date().toISOString().slice(0, 10), used = +(await P().get(`d/${day}`)) || 0;
    if (used >= SELF_PER_DAY) return fail(429, 'full');
    const rank = { '': 0, A1: 0, A2: 1, B1: 2, B2: 3, C1: 4 }[given];
    let level, show, group;
    if (age <= 12) {   // children: the Cambridge young-learner levels, by age, one step up for a higher level
      const base = age <= 7 ? 0 : age <= 9 ? 1 : 2;
      level = ['Starters', 'Movers', 'Flyers'][Math.min(2, base + (rank >= 2 ? 1 : 0))];
      show = ['roblox', 'race', 'minecraft', 'mindlab', 'lessons']; group = age <= 7 ? '4-7' : age <= 9 ? '8-9' : '10-12';
    } else if (age <= 17) { level = given || 'A2'; show = ['race', 'minecraft', 'roblox', 'chess', 'mindlab', 'lessons']; group = '13-17'; }
    else { level = given || 'A2'; show = ['lessons', 'mindlab', 'chess', 'race']; group = '18+'; }
    let code = newCode(); while (await P().get(`p/${code}`)) code = newCode();
    const now = new Date();
    const p = { code, name: str(body.name, 30) || 'Guest', level, show, days: 3, created: now.toISOString(), by: 'self', self: true, ageGroup: group,
      started: now.toISOString(), until: new Date(now.getTime() + 3 * 864e5).toISOString() };
    await P().setJSON(`p/${code}`, p); await P().set(`d/${day}`, String(used + 1));
    return json({ code });
  }
  if (req.method !== 'GET') return fail(405, 'method');
  const code = path.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12);
  if (code.length !== 8) return fail(404, 'pass');
  const p = await P().get(`p/${code}`, { type: 'json' });
  if (!p) return fail(404, 'pass');
  if (!p.started && !p.ended) {   // the days are counted from the first time the code is opened
    p.started = new Date().toISOString(); p.until = new Date(Date.now() + p.days * 864e5).toISOString();
    await P().setJSON(`p/${code}`, p);
  }
  const left = p.ended || !p.until ? 0 : Math.max(0, Date.parse(p.until) - Date.now());
  return json({ first: p.name.split(' ')[0], level: p.level, show: left ? p.show : [], until: p.until || null, left, days: p.days });
};
export const config = { path: ['/api/pass', '/api/pass/*'] };
