// Sign-in from inside the Telegram bot (Mini App). Telegram signs the launch data ("initData") with the bot token; the
// page sends it in the X-TG-Init header, and the chat's bot connection (bot/chat/<telegram id>) says whose account it is.
// So everything a person can do on the website, they can do in the bot — with the same rights, nothing more.
// People connected to the bot only by phone number get an account from their school record the first time:
//   'sid:<studentId>' → a student account linked to that IF Admin record · 'tid:<teacherId>' → a teacher account.
import { getStore } from '@netlify/blobs';
import { createHmac, createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { doc } from './bot-core.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const MAX_AGE_S = 48 * 3600;   // Telegram renews the data every time the app is opened

/** The Telegram user in valid launch data, or null. */
export function tgInitUser(init) {
  const tok = process.env.TELEGRAM_BOT_TOKEN || '';
  if (!init || !tok || init.length > 4096) return null;
  const p = new URLSearchParams(init), hash = p.get('hash');
  if (!hash || !/^[0-9a-f]{64}$/.test(hash)) return null;
  p.delete('hash');
  const check = [...p.entries()].map(([k, v]) => k + '=' + v).sort().join('\n');
  const h = createHmac('sha256', createHmac('sha256', 'WebAppData').update(tok).digest()).update(check).digest('hex');
  if (!timingSafeEqual(Buffer.from(h), Buffer.from(hash))) return null;
  if (Date.now() / 1000 - (+p.get('auth_date') || 0) > MAX_AGE_S) return null;
  try { const u = JSON.parse(p.get('user') || 'null'); return u && u.id ? u : null; } catch { return null; }
}


/** For phone-only connections: make sure the account exists (a profile linked to the school record). */
async function ensureLite(link) {
  const key = `u/${link}/profile`, have = await U().get(key, { type: 'json' });
  if (have) return have;
  const [kind, id] = link.split(':');
  let p = null;
  if (kind === 'sid') {
    const st = (await doc('students')).find(x => x.id === id);
    if (st) p = { role: 'student', studentId: st.id, name: `${st.first || ''} ${st.last || ''}`.trim(), track: 'if', phone: st.phone || '', via: 'telegram', createdAt: new Date().toISOString() };
  } else if (kind === 'tid') {
    const t = (await doc('teachers')).find(x => x.id === id);
    if (t) p = { role: 'teacher', teacherId: t.id, name: t.name || '', phone: t.phone || '', via: 'telegram', createdAt: new Date().toISOString() };
  }
  if (p) await U().setJSON(key, p);
  return p;
}

/** A school record connected by phone ('sid:'/'tid:') whose person also has a website account → that account. */
async function realAccount(link) {
  const [kind, id] = link.split(':');
  const dir = (await U().get('directory', { type: 'json' })) || {};
  if (kind === 'sid') { const e = Object.entries(dir).find(([, d]) => d.studentId === id); return e ? e[0] : null; }
  const t = (await doc('teachers')).find(x => x.id === id);
  if (t && t.uid && dir[t.uid]) return t.uid;
  const e = Object.entries(dir).find(([, d]) => d.teacherId === id && (d.role === 'teacher' || d.role === 'admin'));
  return e ? e[0] : null;
}

/** The account behind the X-TG-Init header ({ id, email, telegram }), or null (then the usual website sign-in applies).
    Why it failed is left on req.tgWhy so the page can say so. */
export async function tgAccount(req) {
  const init = req.headers.get('x-tg-init'); if (!init) return devAccount(req);
  const why = r => { try { req.tgWhy = r; } catch {} return null; };
  if (!process.env.TELEGRAM_BOT_TOKEN) return why('no-token');
  if (!/(^|&)user=/.test(init)) return why('no-user');
  const tu = tgInitUser(init); if (!tu) return why(/auth_date=(\d+)/.test(init) && Date.now() / 1000 - +init.match(/auth_date=(\d+)/)[1] > MAX_AGE_S ? 'expired' : 'bad-signature');
  let link = await S().get(`bot/chat/${tu.id}`); if (!link) return why('not-connected');
  if (/^(sid|tid):/.test(link)) link = (await realAccount(link)) || link;
  const prof = /^(sid|tid):/.test(link) ? await ensureLite(link) : await U().get(`u/${link}/profile`, { type: 'json' });
  if (!prof && /^(sid|tid):/.test(link)) return why('no-record');
  return { id: link, email: (prof && prof.email) || '', name: (prof && prof.name) || '', user_metadata: { full_name: [tu.first_name, tu.last_name].filter(Boolean).join(' ') }, app_metadata: {}, telegram: true };
}

// ---- Personal QR sign-in (children): the teacher prints a QR per child; scanning it once on a phone or tablet keeps
// that device signed in to the child's own account (a year-long cookie "if_dev"). The code is stored only as a hash,
// so the store cannot be read back into working links; making a new code for a child switches the old one off.
export const DEV_COOKIE = 'if_dev';
const qhash = c => createHash('sha256').update(String(c)).digest('hex');
export async function makeQr(uid, sid, name) {
  const code = randomBytes(18).toString('base64url');
  const idx = (await S().get('qr/index', { type: 'json' })) || {};
  if (idx[uid]) await S().delete('qr/' + idx[uid]).catch(() => {});
  const h = qhash(code); idx[uid] = h;
  await S().setJSON('qr/' + h, { uid, sid: sid || '', name: name || '', at: new Date().toISOString() });
  await S().setJSON('qr/index', idx);
  return code;
}
export async function qrLookup(code) {
  if (!/^[\w-]{16,64}$/.test(String(code || ''))) return null;
  return (await S().get('qr/' + qhash(code), { type: 'json' }).catch(() => null)) || null;
}
/** The account behind the device cookie, or null. */
export async function devAccount(req) {
  const ck = req.headers.get('cookie') || '', m = ck.match(/(?:^|;\s*)if_dev=([\w-]{16,64})/); if (!m) return null;
  const q = await qrLookup(m[1]); if (!q || !q.uid) return null;
  const prof = await U().get(`u/${q.uid}/profile`, { type: 'json' }); if (!prof) return null;
  return { id: q.uid, email: prof.email || '', name: prof.name || '', user_metadata: { full_name: prof.name || '' }, app_metadata: {}, device: true };
}

/** A QR code made in advance for a child who has no account yet (env IF_QR_ACCOUNTS, a secret: names and phones never go
    in the public repo). The first scan creates the account; after that the code works like any personal QR sign-in.
    IF_QR_ACCOUNTS = [{ c: code, n: name, b: 'YYYY-MM-DD', lv: level, st: [study keys], tr: track, ph: phone, go: '/app/' }] */
export function pendingQr(code) {
  if (!/^[\w-]{16,64}$/.test(String(code || ''))) return null;
  try { return (JSON.parse(process.env.IF_QR_ACCOUNTS || '[]') || []).find(x => x && x.c === code) || null; } catch { return null; }
}
export async function claimQr(code, putProfile) {
  const x = pendingQr(code); if (!x) return null;
  const uid = 'qr-' + qhash(code).slice(0, 20);
  if (!(await U().get(`u/${uid}/profile`, { type: 'json' }))) {
    await putProfile(uid, { role: 'student', name: String(x.n || 'Student').slice(0, 80), track: x.tr || 'if', study: Array.isArray(x.st) ? x.st.slice(0, 8) : [],
      level: String(x.lv || '').slice(0, 40), birth: /^\d{4}-\d{2}-\d{2}$/.test(x.b || '') ? x.b : '', phone: String(x.ph || '').slice(0, 20), via: 'qr', forever: true, createdAt: new Date().toISOString() });   // forever: free full access with no end date (director's family)
  }
  const idx = (await S().get('qr/index', { type: 'json' })) || {}, h = qhash(code);
  if (idx[uid] && idx[uid] !== h) return null;   // a newer code was made for this child: this one is switched off
  idx[uid] = h; await S().setJSON('qr/' + h, { uid, sid: '', name: x.n || '', at: new Date().toISOString() }); await S().setJSON('qr/index', idx);
  return { uid, go: /^\/[\w\/-]*$/.test(x.go || '') ? x.go : '/app/' };
}

