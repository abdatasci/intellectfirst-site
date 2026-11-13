// IF Admin on the website (admins only).
//   GET  /api/ifadmin/app            → the IF Admin app (decrypted with the lesson content key)
//   GET  /api/ifadmin/all            → every collection {students, groups, attendance, payments, expenses, settings, staff, results, access}
//   GET  /api/ifadmin/stamp          → change stamps per collection (for polling)
//   PUT  /api/ifadmin/doc/<c>/<id>   → set one document      DELETE same → delete it
//   POST /api/ifadmin/restore        → {collections:{...}} replace collections from a backup
//   POST /api/ifadmin/ai             → {messages} AI assistant: reply + proposed changes (nothing saved)
//   POST /api/ifadmin/ai/apply       → {ops} save the proposed changes (undo point kept)    POST ai/undo {id}
// Data lives in the private Blobs store "ifadmin", one document per collection (key c/<name>) holding {id: doc}.
import { getStore } from '@netlify/blobs';
import { getUser, refreshSession } from '@netlify/identity';
import enc from '../lib/ifadmin-app.json';
import { chat, run } from '../lib/ifadmin-ai.mjs';

const COLLS = ['students', 'groups', 'attendance', 'payments', 'expenses', 'settings', 'staff', 'results', 'access', 'mine'];
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
const S = () => getStore({ name: 'school', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
const fail = (status, error) => json({ error }, status);
const ID = /^[A-Za-z0-9_.:@+~-]{1,200}$/;

const getColl = async c => (await A().get('c/' + c, { type: 'json' })) || {};
async function putColl(c, map) {
  await A().setJSON('c/' + c, map);
  const st = (await A().get('stamp', { type: 'json' })) || {};
  st[c] = Date.now(); await A().setJSON('stamp', st);
}

async function appHtml() {
  const k = await S().get('contentKey', { type: 'json' });
  if (!k?.key) return null;
  const subtle = globalThis.crypto.subtle;
  const key = await subtle.importKey('raw', Buffer.from(k.key, 'base64'), 'AES-GCM', false, ['decrypt']);
  const plain = await subtle.decrypt({ name: 'AES-GCM', iv: Buffer.from(enc.iv, 'base64') }, key, Buffer.from(enc.ct, 'base64'));
  return Buffer.from(plain).toString('utf8');
}

export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/ifadmin\/?/, '').replace(/\/$/, '');
  let user; try { user = (await refreshSession().catch(() => null), await getUser()); } catch { user = null; }
  if (!user) return fail(401, 'signin');
  const profile = (await U().get(`u/${user.id}/profile`, { type: 'json' })) || null;
  if (profile?.role !== 'admin') return fail(403, 'admin');
  const method = req.method;

  if (path === 'app' && method === 'GET') {
    let html; try { html = await appHtml(); } catch (e) { console.error('ifadmin decrypt', e?.message); html = null; }
    if (!html) return fail(423, 'locked');
    return new Response(html, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
  }
  if (path === 'me' && method === 'GET') return json({ id: user.id, name: profile.name || '', email: user.email, main: profile.teacherId === 't-abdoulie' });
  if (path === 'all' && method === 'GET') {
    const out = {}; await Promise.all(COLLS.filter(c => c !== 'mine').map(async c => { out[c] = await getColl(c); }));
    return json({ collections: out, stamp: (await A().get('stamp', { type: 'json' })) || {} });
  }
  if (path === 'stamp' && method === 'GET') return json({ stamp: (await A().get('stamp', { type: 'json' })) || {} });

  const d = path.match(/^doc\/([a-z]+)\/(.+)$/);
  if (d && COLLS.includes(d[1]) && ID.test(decodeURIComponent(d[2]))) {
    const c = d[1], id = decodeURIComponent(d[2]), map = await getColl(c);
    if (method === 'PUT') {
      const body = await req.json().catch(() => null);
      if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'doc');
      if (JSON.stringify(body).length > 900000) return fail(413, 'big');
      map[id] = body; await putColl(c, map); return json({ ok: true });
    }
    if (method === 'DELETE') { delete map[id]; await putColl(c, map); return json({ ok: true }); }
  }

  /* ---------- AI assistant: write what happened, check the changes, apply ---------- */
  const loadAll = async () => { const D = {}; await Promise.all(COLLS.filter(c => c !== 'mine').map(async c => { D[c] = await getColl(c); })); return D; };
  if (path === 'ai' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const msgs = (Array.isArray(b.messages) ? b.messages : []).filter(m => m && typeof m.content === 'string').slice(-12);
    if (!msgs.length || msgs.at(-1).role !== 'user') return fail(400, 'message');
    const D = await loadAll();
    let r; try { r = await chat(D, msgs); } catch (e) { console.error('ifadmin ai', e?.status, e?.message); return fail(502, 'ai'); }
    if (r.ops && r.ops.length) { const pv = run(JSON.parse(JSON.stringify(D)), r.ops); r.lines = pv.lines; r.errors = pv.errors; }
    return json(r);
  }
  if (path === 'ai/apply' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    if (!Array.isArray(b.ops) || !b.ops.length) return fail(400, 'ops');
    const D = await loadAll(), before = JSON.parse(JSON.stringify(D));
    const res = run(D, b.ops);
    if (!res.touched.size) return json({ lines: res.lines, saved: 0 });
    const id = new Date().toISOString().replace(/[:.]/g, '-');
    const undo = {}; for (const c of res.touched) undo[c] = before[c];
    await A().setJSON('undo/' + id, { at: new Date().toISOString(), by: user.email, ops: b.ops, before: undo });
    for (const c of res.touched) await putColl(c, D[c]);
    return json({ lines: res.lines, saved: res.lines.filter(l => l.ok).length, undo: id });
  }
  if (path === 'ai/undo' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const u = /^[\w-]{10,40}$/.test(b.id || '') && await A().get('undo/' + b.id, { type: 'json' });
    if (!u) return fail(404, 'undo');
    for (const [c, m] of Object.entries(u.before || {})) if (COLLS.includes(c)) await putColl(c, m || {});
    await A().delete('undo/' + b.id);
    return json({ ok: true });
  }

  if (path === 'restore' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const cols = b?.collections || {}; const done = {};
    const prev = {}; for (const c of COLLS) prev[c] = await getColl(c);
    if (Object.values(prev).some(m => Object.keys(m).length)) await A().setJSON('backup/' + new Date().toISOString().replace(/[:.]/g, '-'), prev);
    for (const c of COLLS) {
      const m = cols[c]; if (!m || typeof m !== 'object') continue;
      const clean = {}; for (const [id, doc] of Object.entries(m)) if (ID.test(id) && doc && typeof doc === 'object') clean[id] = doc;
      await putColl(c, clean); done[c] = Object.keys(clean).length;
    }
    return json({ restored: done });
  }
  return fail(404, 'route');
};

export const config = { path: ['/api/ifadmin', '/api/ifadmin/*'] };
