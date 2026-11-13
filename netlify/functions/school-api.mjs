// IF Academy school portal API: accounts, profiles, photos, classes, teachers, admin.
// Accounts: Netlify Identity. Data: Netlify Blobs.
//   store "ielts"  – u/{uid}/profile (shared with the IELTS Centre), u/{uid}/index (IELTS attempts), directory
//   store "school" – students, classes, teachers, books (one JSON document each)
//   store "photos" – profile photos by account id
import { getStore } from '@netlify/blobs';
import { getUser, refreshSession, admin as idAdmin } from '@netlify/identity';
import { roleForCode, isStaff, lockKeysFromCode, verifyLockKeys } from '../lib/codes.mjs';
import seed from '../lib/school-seed.json';
import ckey from '../lib/content-key.json';
import { loadStudents, saveStudents, loadAttendance } from '../lib/students.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const P = () => getStore({ name: 'photos', consistency: 'strong' });
const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
const fail = (status, error, more = {}) => json({ error, ...more }, status);
const newId = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const str = (v, n = 200) => (v == null ? '' : String(v)).trim().slice(0, n);
/** Last 10 digits: +7 701 234 56 78, 8 701..., 701... all become 7012345678. */
export const phoneKey = p => { const d = String(p || '').replace(/\D/g, ''); return d.length >= 10 ? d.slice(-10) : d; };
const RANK = { student: 1, teacher: 2, admin: 3 };

async function doc(name) {
  await migrate();
  if (name === 'students') return loadStudents();
  const v = await S().get(name, { type: 'json' });
  if (v) return v;
  return structuredClone(seed[name] || []);
}
/** Apply timetable/teacher updates shipped in school-seed.json "patches" to data already saved in Blobs (once each). */
let migrated = false;
async function migrate() {
  if (migrated) return; migrated = true;
  const have = (await S().get('version', { type: 'json' })) || 1;
  if (have >= (seed.version || 1)) return;
  for (const p of (seed.patches || []).filter(p => p.v > have)) {
    for (const coll of ['classes', 'teachers']) {
      if (!p[coll]) continue;
      const saved = await S().get(coll, { type: 'json' });
      if (!saved) continue; // nothing saved yet: the seed already has the change
      for (const [id, ch] of Object.entries(p[coll])) {
        const it = saved.find(x => x.id === id); if (!it) continue;
        const { renameFrom, ...fields } = ch; Object.assign(it, fields);
      }
      await S().setJSON(coll, saved);
    }
    for (const [coll, items] of Object.entries(p.add || {})) {
      const saved = await S().get(coll, { type: 'json' }); if (!saved) continue;
      for (const it of items) if (!saved.some(x => x.id === it.id)) saved.push(it);
      await S().setJSON(coll, saved);
    }
    for (const [id, ch] of Object.entries(p.classes || {})) {
      if (!ch.renameFrom) continue;
      const st = await S().get('students', { type: 'json' }); if (!st) continue;
      st.forEach(s => { s.classes = (s.classes || []).map(c => c === ch.renameFrom ? ch.label : c); });
      await S().setJSON('students', st);
    }
  }
  await S().setJSON('version', seed.version);
}
const save = (name, v) => name === 'students' ? saveStudents(v) : S().setJSON(name, v);
async function getProfile(uid) { return (await U().get(`u/${uid}/profile`, { type: 'json' })) || null; }
async function putProfile(uid, p) {
  await U().setJSON(`u/${uid}/profile`, p);
  const dir = (await U().get('directory', { type: 'json' })) || {};
  dir[uid] = { alumni: !!p.alumni, name: p.name, email: p.email, role: p.role, studentId: p.studentId || null, teacherId: p.teacherId || null, photo: !!p.photo, phone: p.phone || '', level: p.level || '', classChoice: p.classChoice || '' };
  await U().setJSON('directory', dir);
}
async function ieltsSummary(uid) {
  const idx = (await U().get(`u/${uid}/index`, { type: 'json' })) || [];
  const scored = idx.filter(a => typeof a.band === 'number');
  const pick = skill => { const l = scored.filter(a => (a.skill || 'writing') === skill); return l.length ? { count: l.length, latest: l.at(-1).band, best: Math.max(...l.map(a => a.band)), lastAt: l.at(-1).at } : null; };
  return { writing: pick('writing'), speaking: pick('speaking'), recent: idx.slice(-8).reverse() };
}
function publicStudent(s) { return s && { id: s.id, first: s.first, last: s.last, classes: s.classes || [], status: s.status, level: s.level || '', tests: s.tests || [], uid: s.uid || null }; }

/** Link an account to its school record by phone (students) or name/phone (teachers). */
async function linkByPhone(uid, profile) {
  const key = phoneKey(profile.phone), hasPhone = key && key.length >= 10;
  if (profile.role === 'student' && !profile.studentId && hasPhone) {
    const list = await doc('students');
    const hit = list.find(s => phoneKey(s.phone) === key || phoneKey(s.parentPhone) === key);
    if (hit && (!hit.uid || hit.uid === uid)) {
      hit.uid = uid; profile.studentId = hit.id;
      if (!profile.name || profile.name === profile.email?.split('@')[0]) profile.name = `${hit.first} ${hit.last}`.trim();
      await save('students', list);
    }
  }
  if (isStaff(profile.role) && !profile.teacherId) {
    const list = await doc('teachers');
    const words = n => String(n || '').toLowerCase().replace(/[^a-zа-яёәғқңөұүһі\s-]/gi, ' ').split(/\s+/).filter(Boolean);
    const me = words(profile.name), free = list.filter(t => !t.uid || t.uid === uid);
    // 1) phone  2) same full name  3) same first name + (no surname on record, or same surname)
    const hit = (hasPhone && list.find(t => phoneKey(t.phone) === key)) ||
      free.find(t => words(t.name).join(' ') === me.join(' ')) ||
      (me.length ? free.filter(t => { const w = words(t.name); return w[0] === me[0] && (w.length === 1 || me.length === 1 || w.at(-1) === me.at(-1)); }) : []).find((t, i, arr) => arr.length === 1);
    if (hit && (!hit.uid || hit.uid === uid)) { hit.uid = uid; profile.teacherId = hit.id; await save('teachers', list); }
  }
  return profile;
}
async function classesForTeacher(profile) {
  const [classes, teachers] = await Promise.all([doc('classes'), doc('teachers')]);
  if (profile.role === 'admin') return classes;
  const t = teachers.find(x => x.id === profile.teacherId);
  return classes.filter(c => t && (c.teacherId === t.id));
}
async function canSeeStudent(profile, student) {
  if (profile.role === 'admin') return true;
  if (profile.role !== 'teacher') return false;
  const mine = (await classesForTeacher(profile)).map(c => c.label);
  return (student.classes || []).some(c => mine.includes(c));
}
async function attendanceOf(id) { const a = await loadAttendance(); return a[id] || []; }
async function studentView(s) {
  const out = { record: s, profile: null, ielts: null, attendance: await attendanceOf(s.id) };
  if (s.uid) {
    const p = await getProfile(s.uid);
    if (p) out.profile = { name: p.name, email: p.email, photo: !!p.photo, about: p.about || '', goals: p.goals || '', lastActive: p.lastActive || null };
    out.ielts = await ieltsSummary(s.uid);
  }
  return out;
}


/* ---------- lesson slides: content key ----------
   Slides are published encrypted (/lessons/<deck>/<n>.bin). The key is stored only wrapped with the staff and admin
   codes (content-key.json); entering one of those codes once unlocks it into Blobs, and staff then receive it signed in. */
async function unwrapKey(code) {
  const { norm } = await import('../lib/codes.mjs');
  const subtle = globalThis.crypto.subtle;
  for (const k of ['staff', 'admin']) {
    const w = ckey[k]; if (!w) continue;
    try {
      const km = await subtle.importKey('raw', new TextEncoder().encode(norm(code)), 'PBKDF2', false, ['deriveKey']);
      const kek = await subtle.deriveKey({ name: 'PBKDF2', salt: Buffer.from(w.salt, 'base64'), iterations: ckey.iterations, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      const blob = Buffer.from(w.blob, 'base64');
      const raw = await subtle.decrypt({ name: 'AES-GCM', iv: blob.subarray(0, 12) }, kek, blob.subarray(12));
      return Buffer.from(raw).toString('base64');
    } catch { /* try next */ }
  }
  return null;
}
/** easy to read and type: no 0/O, 1/l */
function otp() { const A = 'abcdefghjkmnpqrstuvwxyz', D = '23456789', r = n => Array.from(globalThis.crypto.getRandomValues(new Uint32Array(n))); return r(4).map(x => A[x % A.length]).join('') + '-' + r(4).map(x => D[x % D.length]).join(''); }
async function keepLockKeys(k) {
  if (!k || !(k.ks || k.kt)) return {};
  const cur = (await S().get('lockKeys', { type: 'json' })) || {};
  if ((k.ks && k.ks !== cur.ks) || (k.kt && k.kt !== cur.kt)) await S().setJSON('lockKeys', { ...cur, ...k, at: new Date().toISOString() });
  return k;
}
async function storeKeyFrom(code) {
  const k = await unwrapKey(code);
  if (k) await S().setJSON('contentKey', { key: k, at: new Date().toISOString() });
  return k;
}
const roomName = c => 'IFAcademy-' + String(c.label || c.id).replace(/[^A-Za-z0-9]+/g, '') + '-' + Math.random().toString(36).slice(2, 8);

/* ---------- import helpers (admin) ---------- */
function splitName(full) {
  if (/[()]/.test(str(full))) return { first: str(full, 80), last: '' };
  const parts = str(full).split(/\s+/).filter(Boolean);
  return parts.length > 1 ? { first: parts.slice(0, -1).join(' '), last: parts.at(-1) } : { first: parts[0] || '', last: '' };
}
function mergeStudents(list, rows) {
  let added = 0, updated = 0;
  for (const r of rows) {
    let first = str(r.first, 80), last = str(r.last, 80);
    if (!first && !last && r.name) ({ first, last } = splitName(r.name));
    if (!first && !last) continue;
    const key = phoneKey(r.phone);
    let s = (key && key.length >= 10 && list.find(x => phoneKey(x.phone) === key)) ||
      list.find(x => `${x.first} ${x.last}`.toLowerCase() === `${first} ${last}`.toLowerCase());
    const RENAMED = Object.assign({}, ...(seed.patches || []).flatMap(p => Object.values(p.classes || {}).filter(c => c.renameFrom).map(c => ({ [c.renameFrom]: c.label }))));
    const classes = [r.classes || r.class, r.otherClasses].map(v => str(v, 300)).join(';').split(/[;,]+/).map(x => x.trim()).filter(Boolean).map(c => RENAMED[c] || c);
    if (!s) { s = { id: newId('s'), first, last, tests: [] }; list.push(s); added++; } else updated++;
    Object.assign(s, {
      first: first || s.first, last: last || s.last,
      phone: str(r.phone, 40) || s.phone || '', email: str(r.email, 120) || s.email || '',
      parent: str(r.parent, 120) || s.parent || '', parentPhone: str(r.parentPhone, 40) || s.parentPhone || '',
      birth: str(r.birth, 20) || s.birth || '', level: str(r.level, 40) || s.level || '',
      status: ({ left: 'withdrawn', paused: 'frozen', 'on hold': 'frozen', finished: 'finished' }[str(r.status, 20).toLowerCase()] || str(r.status, 20).toLowerCase() || s.status || 'active'),
      classes: classes.length ? classes : (s.classes || []), notes: str(r.notes, 1000) || s.notes || ''
    });
  }
  return { added, updated };
}
function mergeTests(list, rows) {
  let added = 0, missing = [];
  for (const r of rows) {
    const key = phoneKey(r.phone);
    let { first, last } = r.first || r.last ? { first: str(r.first), last: str(r.last) } : splitName(r.name);
    const s = (key && key.length >= 10 && list.find(x => phoneKey(x.phone) === key)) ||
      list.find(x => `${x.first} ${x.last}`.toLowerCase() === `${first} ${last}`.toLowerCase()) ||
      list.find(x => `${x.last} ${x.first}`.toLowerCase() === `${first} ${last}`.toLowerCase());
    if (!s) { missing.push(str(r.name || `${first} ${last}`, 80)); continue; }
    const t = { id: newId('t'), test: str(r.test, 120), date: str(r.date, 20), score: str(r.score, 40), max: str(r.max, 20), band: str(r.band, 10), note: str(r.note, 300) };
    if (!t.test) continue;
    s.tests = s.tests || [];
    if (!s.tests.some(x => x.test === t.test && x.date === t.date && x.score === t.score)) { s.tests.push(t); added++; }
  }
  return { added, missing: [...new Set(missing)].slice(0, 50) };
}


/* ---------- finance ledger (admin only; Blobs "school" → finance) ----------
   entry = { id, month:'YYYY-MM', date:'YYYY-MM-DD'|'', type:'income'|'expense', category, amount, note, source? }
   Marking a student paid adds a "Tuition" income entry automatically (source pay:<studentId>:<month>). */
const FIN_TYPES = new Set(['income', 'expense']);
const finDoc = async () => (await S().get('finance', { type: 'json' })) || [];
function cleanEntry(e) {
  const amount = Math.round(Math.abs(Number(String(e.amount ?? '').replace(/[^\d.,-]/g, '').replace(/,(?=\d{3}\b)/g, '').replace(',', '.'))) || 0);
  const month = /^\d{4}-\d{2}$/.test(e.month || '') ? e.month : /^\d{4}-\d{2}/.test(e.date || '') ? String(e.date).slice(0, 7) : '';
  if (!amount || !month) return null;
  return { id: e.id || newId('f'), month, date: /^\d{4}-\d{2}-\d{2}$/.test(e.date || '') ? e.date : '', type: FIN_TYPES.has(e.type) ? e.type : 'expense',
    category: str(e.category, 60) || (e.type === 'income' ? 'Other income' : 'Other'), amount, note: str(e.note, 200), ...(e.source ? { source: str(e.source, 80) } : {}), ...(e.investor ? { investor: true } : {}) };
}
async function syncTuition(before, after) {
  const was = before?.pay?.paid || {}, now = after?.pay?.paid || {};
  const add = Object.keys(now).filter(m => !was[m]), gone = Object.keys(was).filter(m => !now[m]);
  if (!add.length && !gone.length) return;
  let fin = await finDoc();
  const name = `${after.first || ''} ${after.last || ''}`.trim();
  fin = fin.filter(e => !gone.some(m => e.source === `pay:${after.id}:${m}`));
  for (const m of add) {
    const amt = Math.round(+(after.pay.amounts || {})[m] || +after.pay.fee || 0), method = (after.pay.methods || {})[m];
    if (fin.some(e => e.source === `pay:${after.id}:${m}`) || !(amt > 0)) continue;
    fin.push({ id: newId('f'), month: m, date: now[m], type: 'income', category: 'Tuition', amount: amt, note: [name, method].filter(Boolean).join(' · '), source: `pay:${after.id}:${m}` });
  }
  await S().setJSON('finance', fin);
}

/* ---------- routes ---------- */
export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/school\/?/, '').replace(/\/$/, '');
  const method = req.method;

  if (path === 'books' && method === 'GET') return json({ books: await doc('books') });

  // classes for the registration form (names and times only)
  if (path === 'classes' && method === 'GET') {
    const cl = await doc('classes');
    return json({ classes: [...cl.map(c => ({ id: c.id, label: c.label, schedule: c.schedule || '', kind: c.kind || '' })), { id: 'alumni', label: 'IF Alumni', schedule: 'Former students who finished their course', kind: 'alumni' }] });
  }
  // new self-registered accounts: skip the email-confirmation step (students rarely open that email)
  if (path === 'confirm' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    try {
      const u = await idAdmin.getUser(str(b.id, 80));
      const made = Date.parse(u.createdAt || u.created_at || 0);
      if (!u || String(u.email).toLowerCase() !== str(b.email, 200).toLowerCase() || !(Date.now() - made < 15 * 60000)) return fail(403, 'no');
      await idAdmin.updateUser(u.id, { confirm: true });
      return json({ ok: true });
    } catch (e) { console.error('confirm', e); return fail(400, 'no'); }
  }
  // keys typed on any device are checked against keys.json before they are kept
  if (path === 'lockkeys' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const got = await keepLockKeys(await verifyLockKeys(b));
    return json({ ok: !!(got.ks || got.kt) });
  }
  // any IF Academy code (student code, staff code, website class/staff code) opens the locked pages on this device
  if (path === 'lockcode' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const own = await lockKeysFromCode(b.code);
    if (own) { await keepLockKeys(own); return json({ ...own, role: own.kt ? 'teacher' : 'student' }); }
    const role = await roleForCode(b.code);
    if (!role) return fail(403, 'code');
    const k = (await S().get('lockKeys', { type: 'json' })) || {};
    if (!k.ks) return fail(503, 'not-ready');
    return json(isStaff(role) && k.kt ? { ks: k.ks, kt: k.kt, role: 'teacher' } : { ks: k.ks, role: 'student' });
  }

  try { await refreshSession(); } catch {}   // an expired 1-hour token is renewed from the refresh cookie: people stay signed in
  let user; try { user = await getUser(); } catch { user = null; }
  if (!user) return fail(401, 'signin');
  const uid = user.id;
  let profile = await getProfile(uid);

  if (path === 'me' && method === 'GET') {
    const out = { user: { id: uid, email: user.email, name: profile?.name || user.name || '' }, profile };
    if (profile?.studentId) {
      const s = (await doc('students')).find(x => x.id === profile.studentId);
      const classes = (await doc('classes')).filter(c => (s?.classes || []).includes(c.label));
      out.student = publicStudent(s); out.classes = classes; out.attendance = await attendanceOf(profile.studentId);
    }
    if (profile && isStaff(profile.role)) out.teaching = await classesForTeacher(profile);
    if (profile) out.ielts = await ieltsSummary(uid);
    out.teachers = (await doc('teachers')).map(t => ({ id: t.id, name: t.name, photoUid: t.uid || null }));
    out.books = await doc('books');
    return json(out);
  }

  if (path === 'activate' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const role = await roleForCode(b.code);
    if (!role) return fail(403, 'code');
    const finalRole = profile?.role && RANK[profile.role] > RANK[role] ? profile.role : role;
    profile = { ...(profile || {}), name: str(b.name, 80) || profile?.name || user.name || user.email.split('@')[0], email: user.email,
      phone: str(b.phone, 40) || profile?.phone || '', role: finalRole,
      level: str(b.level, 30) || profile?.level || '', classChoice: str(b.classChoice, 80) || profile?.classChoice || '',
      alumni: b.classChoice === 'IF Alumni' ? true : !!profile?.alumni, since: profile?.since || new Date().toISOString(), attempts: profile?.attempts || 0 };
    profile = await linkByPhone(uid, profile);
    await putProfile(uid, profile);
    if (isStaff(role) && !(await S().get('contentKey', { type: 'json' }))) await storeKeyFrom(b.code);
    await keepLockKeys(await lockKeysFromCode(b.code));
    return json({ profile });
  }

  // locked pages: hand the class key (students) or class + staff keys (teachers/admin) to signed-in accounts
  if (path === 'lockkeys' && method === 'GET') {
    if (!profile?.role) return fail(403, 'activate');
    const k = (await S().get('lockKeys', { type: 'json' })) || {};
    if (!k.ks) return fail(404, 'none');
    return json(isStaff(profile.role) && k.kt ? { ks: k.ks, kt: k.kt, role: 'teacher' } : { ks: k.ks, role: 'student' });
  }

  if (!profile?.role) return fail(403, 'activate');

  // the student chose their own password: forget the one-time password
  if (path === 'password-changed' && method === 'POST') {
    if (profile.mustChange) { delete profile.mustChange; await U().setJSON(`u/${uid}/profile`, profile); }
    const L = (await S().get('logins', { type: 'json' })) || {};
    for (const l of Object.values(L)) if (l.uid === uid) { delete l.pw; l.changed = new Date().toISOString(); }
    await S().setJSON('logins', L);
    return json({ ok: true });
  }

  if (path === 'profile' && method === 'PUT') {
    const b = await req.json().catch(() => ({}));
    for (const k of ['name', 'phone', 'about', 'goals', 'birth', 'parent', 'parentPhone', 'city']) if (k in b) profile[k] = str(b[k], k === 'about' || k === 'goals' ? 600 : 120);
    profile = await linkByPhone(uid, profile);
    await putProfile(uid, profile);
    return json({ profile });
  }

  if (path === 'photo' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const m = String(b.image || '').match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
    if (!m) return fail(400, 'image');
    const bytes = Buffer.from(m[2], 'base64');
    if (bytes.length > 600 * 1024) return fail(413, 'big');
    await P().set(uid, bytes, { metadata: { type: 'image/' + m[1], at: Date.now() } });
    profile.photo = Date.now(); await putProfile(uid, profile);
    return json({ photo: profile.photo });
  }
  if (path === 'photo' && method === 'DELETE') { await P().delete(uid); profile.photo = null; await putProfile(uid, profile); return json({ ok: true }); }
  const ph = path.match(/^photo\/([A-Za-z0-9-]+)$/);
  if (ph && method === 'GET') {
    if (ph[1] !== uid && !isStaff(profile.role)) return new Response('Forbidden', { status: 403 });
    const r = await P().getWithMetadata(ph[1], { type: 'arrayBuffer' });
    if (!r) return new Response('Not found', { status: 404 });
    return new Response(r.data, { headers: { 'Content-Type': r.metadata?.type || 'image/jpeg', 'Cache-Control': 'private, max-age=300' } });
  }

  /* ---- teachers ---- */
  if (path === 'teach/classes' && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const classes = await classesForTeacher(profile), students = await doc('students');
    return json({ classes: classes.map(c => ({ ...c, count: students.filter(s => (s.classes || []).includes(c.label) && s.status !== 'withdrawn' && s.status !== 'finished').length })) });
  }
  const tc = path.match(/^teach\/class\/([A-Za-z0-9-]+)$/);
  if (tc && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const c = (await classesForTeacher(profile)).find(x => x.id === tc[1]);
    if (!c) return fail(404, 'missing');
    const students = (await doc('students')).filter(s => (s.classes || []).includes(c.label));
    return json({ class: c, students: await Promise.all(students.map(studentView)) });
  }
  const ts = path.match(/^teach\/student\/([A-Za-z0-9-]+)$/);
  if (ts && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const s = (await doc('students')).find(x => x.id === ts[1]);
    if (!s || !(await canSeeStudent(profile, s))) return fail(404, 'missing');
    return json(await studentView(s));
  }
  const tn = path.match(/^teach\/student\/([A-Za-z0-9-]+)\/note$/);
  if (tn && method === 'POST') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const list = await doc('students'), s = list.find(x => x.id === tn[1]);
    if (!s || !(await canSeeStudent(profile, s))) return fail(404, 'missing');
    const b = await req.json().catch(() => ({}));
    s.comments = s.comments || [];
    s.comments.push({ id: newId('c'), by: profile.name, at: new Date().toISOString(), text: str(b.text, 1000) });
    await save('students', list);
    return json({ comments: s.comments });
  }

  /* ---- IF Classroom: lesson slides key + online rooms ---- */
  if (path === 'materials' && method === 'GET') {
    if (!isStaff(profile?.role)) return fail(403, 'staff');
    const k = await S().get('contentKey', { type: 'json' });
    return json({ key: k?.key || null, viewer: { name: profile.name, email: profile.email } });
  }
  if (path === 'materials/unlock' && method === 'POST') {
    if (!isStaff(profile?.role)) return fail(403, 'staff');
    const b = await req.json().catch(() => ({}));
    const k = await storeKeyFrom(b.code);
    return k ? json({ key: k }) : fail(403, 'code');
  }
  if (path === 'classroom' && method === 'GET') {
    if (!profile) return fail(403, 'profile');
    let mine = [];
    if (isStaff(profile.role)) mine = await classesForTeacher(profile);
    else if (profile.studentId) {
      const s = (await doc('students')).find(x => x.id === profile.studentId);
      mine = (await doc('classes')).filter(c => (s?.classes || []).includes(c.label));
    }
    if (mine.some(c => !c.meet)) {
      const all = await doc('classes');
      for (const c of all) if (mine.some(m => m.id === c.id) && !c.meet) c.meet = roomName(c);
      await save('classes', all);
      mine = all.filter(c => mine.some(m => m.id === c.id));
    }
    return json({ classes: mine.map(c => ({ id: c.id, label: c.label, schedule: c.schedule || '', room: c.room || '', bookId: c.bookId || '', teacherId: c.teacherId || '', meet: c.meet })) });
  }

  /* ---- export (admin: everything; teachers: their own classes) ---- */
  if (path === 'export' && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const classes = await classesForTeacher(profile);
    const want = url.searchParams.get('class') || '';
    const pick = want ? classes.filter(c => c.id === want) : classes;
    if (want && !pick.length) return fail(404, 'missing');
    const labels = pick.map(c => c.label), all = !want && profile.role === 'admin';
    const students = (await doc('students')).filter(s => all || (s.classes || []).some(l => labels.includes(l)));
    const ieltsOf = async id => ((await U().get(`u/${id}/index`, { type: 'json' })) || []).map(a => ({ at: a.at, skill: a.skill || 'writing', title: a.title || '', task: a.task || '', part: a.part || '', mock: !!a.mock, band: a.band, criteria: a.criteria || null, words: a.words ?? null }));
    const rows = await Promise.all(students.map(async s => {
      const p = s.uid ? await getProfile(s.uid) : null;
      return { id: s.id, first: s.first, last: s.last, classes: s.classes || [], status: s.status || '', level: s.level || '', phone: s.phone || '', parentPhone: s.parentPhone || '',
        registered: !!p, email: p?.email || s.email || '', since: p?.since || null, lastActive: p?.lastActive || null,
        tests: s.tests || [], ielts: p ? await ieltsOf(s.uid) : [] };
    }));
    // admin, whole school: also student accounts not yet matched to a record
    if (all) {
      const dir = (await U().get('directory', { type: 'json' })) || {};
      for (const [id, d] of Object.entries(dir)) {
        if (d.role !== 'student' || d.studentId) continue;
        const p = await getProfile(id);
        rows.push({ id: '', first: d.name || '', last: '', classes: [], status: 'no school record', level: '', phone: p?.phone || '', parentPhone: '',
          registered: true, email: d.email || '', since: p?.since || null, lastActive: p?.lastActive || null, tests: [], ielts: await ieltsOf(id) });
      }
    }
    return json({ generatedAt: new Date().toISOString(), by: profile.name, scope: want ? pick[0].label : (all ? 'Whole school' : 'My classes'), rows });
  }

  /* ---- admin ---- */
  if (path.startsWith('admin/')) {
    if (profile.role !== 'admin') return fail(403, 'admin');
    const b = method === 'GET' ? {} : await req.json().catch(() => ({}));
    if (path === 'admin/all' && method === 'GET') {
      const [students, classes, teachers, books] = await Promise.all([doc('students'), doc('classes'), doc('teachers'), doc('books')]);
      const dir = (await U().get('directory', { type: 'json' })) || {};
      return json({ students, classes, teachers, books, accounts: Object.entries(dir).map(([id, d]) => ({ id, ...d })) });
    }
    const coll = path.match(/^admin\/(students|classes|teachers|books)$/);
    if (coll && method === 'PUT') {
      // save one item (create or update)
      const list = await doc(coll[1]); const item = b.item || {};
      const prefix = { students: 's', classes: 'c', teachers: 't', books: 'b' }[coll[1]];
      let before = null;
      if (!item.id) { item.id = newId(prefix); list.push(item); }
      else { const i = list.findIndex(x => x.id === item.id); before = i >= 0 ? structuredClone(list[i]) : null; if (i < 0) list.push(item); else list[i] = { ...list[i], ...item }; }
      await save(coll[1], list);
      if (coll[1] === 'students' && 'pay' in item) await syncTuition(before, list.find(x => x.id === item.id));
      return json({ [coll[1]]: list });
    }
    const del = path.match(/^admin\/(students|classes|teachers|books)\/([A-Za-z0-9-]+)$/);
    if (del && method === 'DELETE') {
      const list = (await doc(del[1])).filter(x => x.id !== del[2]);
      await save(del[1], list);
      return json({ [del[1]]: list });
    }
    if (path === 'admin/import' && method === 'POST') {
      const list = await doc('students'), rows = Array.isArray(b.rows) ? b.rows.slice(0, 3000) : [];
      const res = b.kind === 'tests' ? mergeTests(list, rows) : mergeStudents(list, rows);
      await save('students', list);
      // re-link accounts that registered before their record existed
      const dir = (await U().get('directory', { type: 'json' })) || {};
      for (const [id, d] of Object.entries(dir)) {
        if (d.role === 'student' && !d.studentId) { const p = await getProfile(id); if (p?.phone) { const np = await linkByPhone(id, p); if (np.studentId) await putProfile(id, np); } }
      }
      return json({ ...res, total: list.length });
    }
    if (path === 'admin/link' && method === 'POST') {
      // manually link / unlink an account to a student or teacher record, or change role
      const p = await getProfile(str(b.uid, 60)); if (!p) return fail(404, 'missing');
      if ('role' in b && RANK[b.role]) p.role = b.role;
      if ('alumni' in b) p.alumni = !!b.alumni;
      if ('studentId' in b) {
        const list = await doc('students');
        list.forEach(s => { if (s.uid === b.uid) s.uid = null; });
        const s = list.find(x => x.id === b.studentId); if (s) s.uid = b.uid;
        p.studentId = s ? s.id : null; await save('students', list);
      }
      if ('teacherId' in b) {
        const list = await doc('teachers');
        list.forEach(t => { if (t.uid === b.uid) t.uid = null; });
        const t = list.find(x => x.id === b.teacherId); if (t) t.uid = b.uid;
        p.teacherId = t ? t.id : null; await save('teachers', list);
      }
      await putProfile(b.uid, p);
      return json({ profile: p });
    }
    if (path === 'admin/import-all' && method === 'POST') {
      // Full IF Admin export (sheets: Students, Payments, Expenses, Test Results, Attendance)
      const list = await doc('students');
      const rows = (b.students || []).slice(0, 3000);
      const st = mergeStudents(list, rows.map(r => ({ name: r.name, phone: r.phone, classes: r.all_groups || r.group, level: r.level, status: r.status, notes: r.note })));
      const nk = n => str(n).toLowerCase().replace(/\s+/g, ' ');
      const RENAMED = Object.assign({}, ...(seed.patches || []).flatMap(p => Object.values(p.classes || {}).filter(c => c.renameFrom).map(c => ({ [c.renameFrom]: c.label }))));
      const idMap = {};
      for (const r of rows) {
        const key = phoneKey(r.phone);
        const s = (key && key.length >= 10 && list.find(x => phoneKey(x.phone) === key && nk(`${x.first} ${x.last}`) === nk(r.name))) ||
          list.find(x => nk(`${x.first} ${x.last}`) === nk(r.name)) || (key && key.length >= 10 && list.find(x => phoneKey(x.phone) === key));
        if (s) { idMap[r.student_id] = s; if (r.no_fee) s.noFee = true; }
      }
      // payments → tuition plan + income entries
      let fin = await finDoc(); const have = new Set(fin.map(e => e.source).filter(Boolean));
      let income = 0, expenses = 0, plans = 0;
      const pays = (b.payments || []).slice().sort((x, y) => String(x.month).localeCompare(String(y.month)));
      const touched = new Set();
      for (const r of pays) {
        const s = idMap[r.student_id]; const month = /^\d{4}-\d{2}/.test(r.month || '') ? String(r.month).slice(0, 7) : ''; if (!month) continue;
        const paid = Math.round(+r.paid || 0), due = Math.round(+r.net_due || 0);
        if (paid > 0) {
          const src = `imp-pay:${month}:${r.student_id}`;
          if (!have.has(src)) { const e = cleanEntry({ month, date: r.payment_date || '', type: 'income', category: 'Tuition', amount: paid, note: [r.student, r.method].filter(Boolean).join(' · '), source: src }); if (e) { fin.push(e); have.add(src); income++; } }
        }
        if (!s || s.noFee || !(due > 0)) continue;
        s.pay = s.pay || { fee: 0, dueDay: 0, paid: {} }; s.pay.paid = s.pay.paid || {};
        s.pay.fee = due; touched.add(s.id);
        const dd = /^\d{4}-\d{2}-(\d{2})/.exec(r.due_date || ''); if (dd) s.pay.dueDay = Math.min(28, +dd[1]);
        if (r.method) { s.pay.methods = s.pay.methods || {}; s.pay.methods[month] = s.pay.methods[month] || r.method; }
        if (/^paid$/i.test(r.status || '') || (paid >= due && due > 0)) s.pay.paid[month] = /^\d{4}-\d{2}-\d{2}$/.test(r.payment_date || '') ? r.payment_date : `${month}-01`;
        else if (!s.pay.methods?.[month]) delete s.pay.paid[month]; // a payment recorded on the website wins over an older export
      }
      plans = touched.size;
      for (const r of (b.expenses || [])) {
        const src = `imp-exp:${r.expense_id || [r.date, r.category, r.amount, r.description].join('|')}`;
        if (have.has(src)) continue;
        const e = cleanEntry({ month: String(r.month || '').slice(0, 7), date: r.date || '', type: 'expense', category: r.category || 'Other', amount: r.amount,
          note: [r.description, r.staff, r.paid_from ? 'paid from ' + r.paid_from : ''].filter(Boolean).join(' · '), source: src, investor: /own money/i.test(String(r.ruslan || '')) });
        if (e) { fin.push(e); have.add(src); expenses++; }
      }
      await S().setJSON('finance', fin);
      // test results
      let tests = 0; const sk = ['grammar', 'vocabulary', 'pronunciation', 'reading', 'listening', 'speaking', 'writing'];
      for (const r of (b.tests || [])) {
        const s = idMap[r.student_id]; if (!s) continue;
        const t = { id: newId('t'), test: str(r.course ? `${r.test} · ${r.course}` : r.test, 120), date: str(r.date, 20), score: str(r.score, 40), max: str(r.max, 20), band: '',
          note: sk.filter(k => r[k] != null && r[k] !== '').map(k => `${k[0].toUpperCase() + k.slice(1)} ${r[k]}`).join(', ').slice(0, 300) };
        if (!t.test) continue; s.tests = s.tests || [];
        if (!s.tests.some(x => x.test === t.test && x.date === t.date && String(x.score) === t.score)) { s.tests.push(t); tests++; }
      }
      // attendance: { [studentId]: [{d, c, m}] }  m = P present, UA unexcused, EA excused, FZ frozen
      const att = (await S().get('attendance', { type: 'json' })) || {}; let marks = 0;
      for (const r of (b.attendance || [])) {
        const s = idMap[r.student_id]; if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(r.date || '')) continue;
        const c = RENAMED[r.group] || str(r.group, 80), m = str(r.mark, 4).toUpperCase(); if (!m) continue;
        const a = att[s.id] || (att[s.id] = []); const i = a.findIndex(x => x.d === r.date && x.c === c);
        if (i >= 0) a[i].m = m; else { a.push({ d: r.date, c, m }); marks++; }
      }
      for (const k of Object.keys(att)) att[k].sort((x, y) => x.d.localeCompare(y.d));
      await S().setJSON('attendance', att);
      await save('students', list);
      const dir = (await U().get('directory', { type: 'json' })) || {};
      for (const [id, d] of Object.entries(dir)) if (d.role === 'student' && !d.studentId) { const p = await getProfile(id); if (p?.phone) { const np = await linkByPhone(id, p); if (np.studentId) await putProfile(id, np); } }
      return json({ students: st, matched: Object.keys(idMap).length, plans, income, expenses, tests, marks, total: list.length });
    }
    if (path === 'admin/pay-default' && method === 'POST') {
      const day = Math.round(+b.dueDay || 0); if (!(day >= 1 && day <= 28)) return fail(400, 'day');
      const list = await doc('students'); let n = 0;
      for (const s of list) if (s.pay && +s.pay.fee > 0 && !(+s.pay.dueDay >= 1)) { s.pay.dueDay = day; n++; }
      await save('students', list); return json({ updated: n, students: list });
    }
    /* ---------- student logins made by the school (login = phone number, one-time password) ---------- */
    if (path === 'admin/logins' && method === 'GET') {
      const list = await doc('students'), L = (await S().get('logins', { type: 'json' })) || {};
      const dir = (await U().get('directory', { type: 'json' })) || {};
      return json({ rows: list.map(st => {
        const l = L[st.id], acc = st.uid && dir[st.uid];
        return { former: st.status === 'withdrawn', alumni: !!acc?.alumni, sid: st.id, name: `${st.first} ${st.last}`.trim(), phone: st.phone || '', classes: st.classes || [], uid: st.uid || null,
          email: acc?.email || null, login: l?.login || null, pw: l?.pw || null, made: l?.at || null, changed: l?.changed || null, own: !!(st.uid && !l) };
      }) });
    }
    if ((path === 'admin/logins/create' || path === 'admin/logins/reset') && method === 'POST') {
      const want = new Set((b.sids || []).slice(0, 12));
      const list = await doc('students'), L = (await S().get('logins', { type: 'json' })) || {};
      const dir = (await U().get('directory', { type: 'json' })) || {};
      const used = new Set(Object.values(L).map(l => l.login));
      const done = [], errors = [];
      for (const st of list.filter(x => want.has(x.id))) {
        try {
          const pw = otp();
          if (path === 'admin/logins/reset') {
            const uid2 = st.uid || L[st.id]?.uid; if (!uid2) throw new Error('no account');
            await idAdmin.updateUser(uid2, { password: pw });
            const pr = await getProfile(uid2); if (pr) { pr.mustChange = true; await U().setJSON(`u/${uid2}/profile`, pr); }
            L[st.id] = { ...(L[st.id] || {}), uid: uid2, login: L[st.id]?.login || dir[uid2]?.email || '', pw, at: new Date().toISOString(), changed: null };
            done.push(st.id); continue;
          }
          if (st.uid) continue;                                            // already has an account
          let base = phoneKey(st.phone); if (base.length < 10) base = 'if' + st.id.replace(/[^a-z0-9]/gi, '').toLowerCase();
          let login = base, n = 2; while (used.has(login)) login = `${base}-${n++}`;  // brothers and sisters can share a parent's phone
          const email = `${login}@students.intellectfirst.com`;
          let u;
          try { u = await idAdmin.createUser({ email, password: pw, data: { user_metadata: { full_name: `${st.first} ${st.last}`.trim() } } }); }
          catch (e) {   // made before, but the link was lost: find it and set a new password
            const all = await idAdmin.listUsers({ perPage: 1000 }); u = all.find(x => x.email === email); if (!u) throw e;
            await idAdmin.updateUser(u.id, { password: pw });
          }
          used.add(login);
          const name = `${st.first} ${st.last}`.trim();
          await putProfile(u.id, { name, email, phone: st.phone || '', role: 'student', since: new Date().toISOString(), studentId: st.id, mustChange: true, made: 'school', ...(st.status === 'withdrawn' ? { alumni: true, classChoice: 'IF Alumni' } : {}) });
          st.uid = u.id;
          L[st.id] = { uid: u.id, login, pw, at: new Date().toISOString() };
          done.push(st.id);
        } catch (e) { console.error('login', st.id, e); errors.push({ sid: st.id, error: String(e.message || e).slice(0, 120) }); }
      }
      await saveStudents(list);
      await S().setJSON('logins', L);
      return json({ done, errors });
    }
    if (path === 'admin/attendance' && method === 'GET') return json({ attendance: await loadAttendance() });
    if (path === 'admin/finance' && method === 'GET') return json({ entries: await finDoc() });
    if (path === 'admin/finance' && method === 'PUT') {
      const e = cleanEntry(b.item || {}); if (!e) return fail(400, 'entry');
      const fin = await finDoc(); const i = fin.findIndex(x => x.id === e.id);
      if (i >= 0) fin[i] = { ...fin[i], ...e }; else fin.push(e);
      await S().setJSON('finance', fin); return json({ entries: fin });
    }
    const fd = path.match(/^admin\/finance\/([A-Za-z0-9-]+)$/);
    if (fd && method === 'DELETE') { const fin = (await finDoc()).filter(x => x.id !== fd[1]); await S().setJSON('finance', fin); return json({ entries: fin }); }
    if (path === 'admin/finance/import' && method === 'POST') {
      const fin = await finDoc(); let added = 0, skipped = 0;
      const key = e => [e.month, e.type, e.category.toLowerCase(), e.amount, e.note.toLowerCase()].join('|');
      const have = new Set(fin.map(key));
      for (const r of (Array.isArray(b.rows) ? b.rows.slice(0, 20000) : [])) {
        const e = cleanEntry(r); if (!e) { skipped++; continue; }
        if (have.has(key(e))) { skipped++; continue; }
        have.add(key(e)); fin.push(e); added++;
      }
      await S().setJSON('finance', fin); return json({ added, skipped, total: fin.length });
    }
    if (path === 'admin/finance/clear' && method === 'POST') {
      // remove imported entries for given months (keeps automatic tuition entries)
      const months = new Set(Array.isArray(b.months) ? b.months : []);
      const fin = (await finDoc()).filter(e => !(months.has(e.month) && !e.source));
      await S().setJSON('finance', fin); return json({ entries: fin });
    }
    if (path === 'admin/placements' && method === 'GET') {
      return json({ placements: ((await S().get('placements', { type: 'json' })) || []).slice().reverse() });
    }
    const as = path.match(/^admin\/student\/([A-Za-z0-9-]+)$/);
    if (as && method === 'GET') {
      const s = (await doc('students')).find(x => x.id === as[1]);
      return s ? json(await studentView(s)) : fail(404, 'missing');
    }
  }

  return fail(404, 'route');
};

export const config = { path: ['/api/school', '/api/school/*'] };
