// IF Kart online races. No live connection is needed: every finished online race is saved as a short recording
// (where the kart was every half second), and the next players race against those recordings.
//   GET  /api/kart/race?level=<id>   up to 5 recordings by other players at that level + this week's fastest
//   POST /api/kart/run               { level, driver, time, rec }  saves the caller's run, returns the week's fastest
// Open to subscribers and staff. Other players see a first name only.
import { getStore } from '@netlify/blobs';
import { getUser, refreshSession } from '@netlify/identity';
import { tgAccount } from '../lib/tgauth.mjs';
import { tier } from '../lib/access.mjs';

export const config = { path: ['/api/kart/*'] };
const LEVELS = ['starters', 'movers', 'flyers', 'ket', 'pet'], DRIVERS = ['cat', 'bunny', 'bear', 'fox', 'panda', 'frog'];
const KEEP = 40, WEEK = 7 * 864e5, MIN_TIME = 45, MAX_TIME = 600, MAX_REC = 2400;
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const json = (d, s = 200) => Response.json(d, { status: s, headers: { 'Cache-Control': 'no-store' } });
const fail = (s, error) => json({ error }, s);
const first = p => String(p?.name || '').trim().split(/\s+/)[0].replace(/[^\p{L}\p{M}'’-]/gu, '').slice(0, 16) || 'Player';

async function who(req) {
  let user = null; try { user = (await tgAccount(req)) || (await refreshSession().catch(() => null), await getUser()); } catch {}
  if (!user) return { user: null, profile: null, level: 'none' };
  const profile = (await U().get(`u/${user.id}/profile`, { type: 'json' })) || null;
  return { user, profile, level: tier(profile) };
}
const runsOf = async lv => (await U().get(`kart/runs/${lv}`, { type: 'json' }).catch(() => null)) || [];
const board = (runs, uid) => runs.filter(r => Date.now() - r.at < WEEK).sort((a, b) => a.time - b.time).slice(0, 10).map(r => ({ name: r.name, driver: r.driver, time: r.time, you: r.uid === uid }));
/** A recording is a flat list of whole numbers: distance, sideways position × 10, distance, … one pair per half second. */
function cleanRec(rec, time) {
  if (!Array.isArray(rec) || rec.length < 40 || rec.length > MAX_REC || rec.length % 2) return null;
  if (Math.abs(rec.length / 2 * .5 - time) > 6) return null;                       // the recording must be as long as the race
  if (!(rec[0] >= -40 && rec[0] <= 5)) return null;                                 // every race starts on the grid
  let last = rec[0];
  for (let i = 0; i < rec.length; i += 2) {
    const d = rec[i], x = rec[i + 1];
    if (!Number.isInteger(d) || !Number.isInteger(x) || Math.abs(x) > 250) return null;
    if (d < last - 2 || d - last > 40) return null;                               // never backwards, never faster than a kart can go
    last = d;
  }
  return rec;
}

export default async (req) => {
  const url = new URL(req.url), what = url.pathname.replace(/^\/api\/kart\/?/, '');
  const { user, profile, level } = await who(req);
  if (!user) return fail(401, 'sign-in');
  if (level !== 'staff' && level !== 'member') return fail(403, 'subscribers');

  if (what === 'race' && req.method === 'GET') {
    const lv = url.searchParams.get('level'); if (!LEVELS.includes(lv)) return fail(400, 'level');
    const runs = await runsOf(lv), others = runs.filter(r => r.uid !== user.id);
    // the closest rivals first: recordings nearest to the caller's own best time, otherwise the newest
    const mine = runs.find(r => r.uid === user.id);
    others.sort((a, b) => mine ? Math.abs(a.time - mine.time) - Math.abs(b.time - mine.time) : b.at - a.at);
    return json({ me: first(profile), ghosts: others.slice(0, 5).map(r => ({ name: r.name, driver: r.driver, time: r.time, rec: r.rec })), board: board(runs, user.id) });
  }

  if (what === 'run' && req.method === 'POST') {
    const b = await req.json().catch(() => ({})), lv = b.level, time = +b.time;
    if (!LEVELS.includes(lv) || !DRIVERS.includes(b.driver)) return fail(400, 'level');
    if (!(time >= MIN_TIME && time <= MAX_TIME)) return fail(400, 'time');
    const rec = cleanRec(b.rec, time); if (!rec) return fail(400, 'rec');
    const store = U(), runs = await runsOf(lv), old = runs.find(r => r.uid === user.id);
    const fresh = old && Date.now() - old.at < WEEK;
    let best = true;
    if (fresh && old.time <= time) best = false;                                  // one recording per player: this week's fastest
    else {
      const next = runs.filter(r => r.uid !== user.id);
      next.push({ uid: user.id, name: first(profile), driver: b.driver, time: Math.round(time * 10) / 10, at: Date.now(), rec });
      next.sort((a, b2) => b2.at - a.at);
      await store.setJSON(`kart/runs/${lv}`, next.slice(0, KEEP));
      runs.length = 0; runs.push(...next.slice(0, KEEP));
    }
    return json({ ok: true, best, board: board(runs, user.id) });
  }
  return fail(404, 'not found');
};
