// IF Academy school portal API: accounts, profiles, photos, classes, teachers, admin.
// Accounts: Netlify Identity. Data: Netlify Blobs.
//   store "ielts"  – u/{uid}/profile (shared with the IELTS Centre), u/{uid}/index (IELTS attempts), directory
//   store "school" – students, classes, teachers, books (one JSON document each)
//   store "photos" – profile photos by account id
import { getStore } from '@netlify/blobs';
import { getUser } from '@netlify/identity';
import { roleForCode, isStaff } from '../lib/codes.mjs';
import seed from '../lib/school-seed.json';
import ckey from '../lib/content-key.json';

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
const save = (name, v) => S().setJSON(name, v);
async function getProfile(uid) { return (await U().get(`u/${uid}/profile`, { type: 'json' })) || null; }
async function putProfile(uid, p) {
  await U().setJSON(`u/${uid}/profile`, p);
  const dir = (await U().get('directory', { type: 'json' })) || {};
  dir[uid] = { name: p.name, email: p.email, role: p.role, studentId: p.studentId || null, teacherId: p.teacherId || null, photo: !!p.photo };
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
async function studentView(s) {
  const out = { record: s, profile: null, ielts: null };
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

/* ---------- routes ---------- */
export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/school\/?/, '').replace(/\/$/, '');
  const method = req.method;

  if (path === 'books' && method === 'GET') return json({ books: await doc('books') });

  let user; try { user = await getUser(); } catch { user = null; }
  if (!user) return fail(401, 'signin');
  const uid = user.id;
  let profile = await getProfile(uid);

  if (path === 'me' && method === 'GET') {
    const out = { user: { id: uid, email: user.email, name: profile?.name || user.name || '' }, profile };
    if (profile?.studentId) {
      const s = (await doc('students')).find(x => x.id === profile.studentId);
      const classes = (await doc('classes')).filter(c => (s?.classes || []).includes(c.label));
      out.student = publicStudent(s); out.classes = classes;
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
      phone: str(b.phone, 40) || profile?.phone || '', role: finalRole, since: profile?.since || new Date().toISOString(), attempts: profile?.attempts || 0 };
    profile = await linkByPhone(uid, profile);
    await putProfile(uid, profile);
    if (isStaff(role) && !(await S().get('contentKey', { type: 'json' }))) await storeKeyFrom(b.code);
    return json({ profile });
  }

  if (!profile?.role) return fail(403, 'activate');

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
      if (!item.id) { item.id = newId(prefix); list.push(item); }
      else { const i = list.findIndex(x => x.id === item.id); if (i < 0) list.push(item); else list[i] = { ...list[i], ...item }; }
      await save(coll[1], list);
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
