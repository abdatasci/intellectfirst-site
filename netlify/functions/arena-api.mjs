// IF Arena: play 1-v-1 online (Chess, Connect Four, Word Duel) against another signed-in player.
// Real-time messages go through Ably (env ABLY_API_KEY), as in IF Live; this function only signs token requests
// and keeps a small score table. Channels:
//   arena:lobby        presence: who is online and free (name, level, status)
//   arena:u:<id>       a player's inbox: invitations, accept / decline (anyone may publish, only the owner listens)
//   arena:g:<gameId>   one game's moves; clients only accept moves from the two players in it
// Store "arena": s/<uid> {name, w, d, l, r}   (r = rating, starts at 1000)
import { getStore } from '@netlify/blobs';
import { tgAccount } from '../lib/tgauth.mjs';
import { getUser } from '@netlify/identity';
import { refreshSession } from '../lib/refresh.mjs';   // never deletes the sign-in cookies (parallel requests)
import { createHmac, randomBytes } from 'node:crypto';

const A = () => getStore({ name: 'arena', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const json = (d, s = 200) => Response.json(d, { status: s, headers: { 'Cache-Control': 'no-store' } });
const fail = (s, error) => json({ error }, s);
const str = (v, n = 40) => (v == null ? '' : String(v)).replace(/\s+/g, ' ').trim().slice(0, n);

function tokenRequest(clientId, capability) {
  const [keyName, secret] = (process.env.ABLY_API_KEY || '').split(':');
  if (!keyName || !secret) return null;
  const cap = JSON.stringify(capability), ttl = 3 * 3600 * 1000, timestamp = Date.now(), nonce = randomBytes(16).toString('hex');
  const mac = createHmac('sha256', secret).update([keyName, ttl, cap, clientId, timestamp, nonce].join('\n') + '\n').digest('base64');
  return { keyName, ttl, capability: cap, clientId, timestamp, nonce, mac };
}
async function who(req) {
  let user = null; try { user = (await tgAccount(req)) || (await refreshSession().catch(() => null), await getUser()); } catch {}
  if (!user) return null;
  const p = (await U().get(`u/${user.id}/profile`, { type: 'json' })) || {};
  const full = str(p.name || user.user_metadata?.full_name || '', 60);
  // Only a first name and the first letter of the surname are shown to other players.
  const parts = full.split(' ').filter(Boolean), name = parts.length ? parts[0] + (parts[1] ? ' ' + parts[1][0] + '.' : '') : 'Player';
  return { uid: user.id, name, level: str(p.level, 8), role: p.role || 'student' };
}
const K = 24, expected = (a, b) => 1 / (1 + Math.pow(10, (b - a) / 400));

export default async (req) => {
  const path = new URL(req.url).pathname.replace(/^\/api\/arena\/?/, '');
  const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};

  if (path === 'top') {      // leaderboard (first names only)
    const { blobs } = await A().list({ prefix: 's/' });
    const rows = (await Promise.all(blobs.slice(0, 400).map(b => A().get(b.key, { type: 'json' })))).filter(Boolean);
    return json({ top: rows.sort((a, b) => b.r - a.r).slice(0, 20).map(r => ({ name: r.name, r: Math.round(r.r), w: r.w, d: r.d, l: r.l })) });
  }
  const me = await who(req);
  if (!me) return fail(401, 'sign-in');

  if (path === 'token') {
    if (!(process.env.ABLY_API_KEY || '').includes(':')) return fail(503, 'not-configured');
    const id = 'u-' + me.uid;
    const token = tokenRequest(id, {
      'arena:lobby': ['presence', 'subscribe'],
      'arena:u:*': ['publish'],
      [`arena:u:${me.uid}`]: ['publish', 'subscribe'],
      'arena:g:*': ['publish', 'subscribe', 'presence']
    });
    const s = (await A().get('s/' + me.uid, { type: 'json' })) || { w: 0, d: 0, l: 0, r: 1000 };
    return json({ me: { id, uid: me.uid, name: me.name, level: me.level, role: me.role, r: Math.round(s.r), w: s.w, d: s.d, l: s.l }, token });
  }

  // A finished game: each player reports their own result once per game; the rating moves against the opponent's.
  if (path === 'result' && req.method === 'POST') {
    const gid = str(body.gid, 40), res = body.res, opp = str(body.opp, 60).replace(/^u-/, '');
    if (!/^[a-z0-9-]{6,40}$/.test(gid) || !['w', 'd', 'l'].includes(res) || !opp || opp === me.uid) return fail(400, 'bad');
    if (await A().get(`g/${gid}/${me.uid}`)) return json({ ok: true, dup: true });
    await A().set(`g/${gid}/${me.uid}`, res);
    const s = (await A().get('s/' + me.uid, { type: 'json' })) || { w: 0, d: 0, l: 0, r: 1000 };
    const o = (await A().get('s/' + opp, { type: 'json' })) || { r: 1000 };
    const score = res === 'w' ? 1 : res === 'd' ? 0.5 : 0;
    s.r = s.r + K * (score - expected(s.r, o.r)); s[res] = (s[res] || 0) + 1; s.name = me.name;
    await A().setJSON('s/' + me.uid, s);
    return json({ ok: true, r: Math.round(s.r), w: s.w, d: s.d, l: s.l });
  }
  return fail(404, 'not-found');
};
export const config = { path: ['/api/arena/*'] };
