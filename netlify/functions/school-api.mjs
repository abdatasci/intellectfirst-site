// IF Academy school portal API: accounts, profiles, photos, classes, teachers, admin.
// Accounts: Netlify Identity. Data: Netlify Blobs.
//   store "ielts"  – u/{uid}/profile (shared with the IELTS Centre), u/{uid}/index (IELTS attempts), directory
//   store "school" – students, classes, teachers, books (one JSON document each)
//   store "photos" – profile photos by account id
import { getStore } from '@netlify/blobs';
import { tgAccount } from '../lib/tgauth.mjs';
import { readFile } from 'node:fs/promises';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { join } from 'node:path';
import { getUser, refreshSession, admin as idAdmin } from '@netlify/identity';
import { roleForCode, isStaff, lockKeysFromCode, verifyLockKeys, isPrivateCode } from '../lib/codes.mjs';
import { listReceipts, decideReceipt, receiptFile, cashInfo, cashClaim } from '../lib/receipts.mjs';
import { kaspiInfo, createInvoice } from '../lib/kaspi.mjs';
import { publicFeedback, mine as myFeedback, submit as submitFeedback, removeMine as removeFeedback, decide as decideFeedback, loadFeedback } from '../lib/feedback.mjs';
import { loadHomework, addHomework, removeHomework, forClasses, clean as cleanHw, hwText, setCheck, forStudent } from '../lib/homework.mjs';
import { getLinks, tgSend, tgToken, addNote, uidsByStudent, inClass, loadChanges, saveChanges, hidePrivate } from '../lib/bot-core.mjs';
import { waReady, waSend, waNumber } from '../lib/whatsapp.mjs';
import { tellClass } from '../lib/hwsend.mjs';
import { tier, isMember, TRACKS, paidActive, accessUntil, TRIAL_DAYS, ensureTrial } from '../lib/access.mjs';
import seed from '../lib/school-seed.json';
import ckey from '../lib/content-key.json';
import { loadStudents, saveStudents, loadAttendance } from '../lib/students.mjs';
import { migrate as runMigrations } from '../lib/migrate.mjs';
import { openTasks, dismissTask } from '../lib/tasks.mjs';
import { teaching as teachingHours, adminHours, shift as workShift, addManual as addWork, removeEntry as removeWork, teamAdmin } from '../lib/hours.mjs';
import { lessonsOn, loadLog, withEntry, checkIn, saveRegister, setCancelled, correct, since as checkSince, monthLessons, punctuality, classAttendance, today as todayStr, GRACE_MIN, EARLY_MIN } from '../lib/lessons.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const P = () => getStore({ name: 'photos', consistency: 'strong' });
const C = () => getStore({ name: 'certs', consistency: 'strong' });
const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
const fail = (status, error, more = {}) => json({ error, ...more }, status);
const newId = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const str = (v, n = 200) => (v == null ? '' : String(v)).trim().slice(0, n);
/** Last 10 digits: +7 701 234 56 78, 8 701..., 701... all become 7012345678. */
export const phoneKey = p => { const d = String(p || '').replace(/\D/g, ''); return d.length >= 10 ? d.slice(-10) : d; };
const RANK = { guest: 0.5, student: 1, teacher: 2, admin: 3 };

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
  dir[uid] = { staffPos: p.staffPos || '', duty: p.smm ? 'smm' : p.manager ? 'manager' : '', trialUntil: p.trialUntil || null, goals: p.goals || '', track: p.track || '', request: p.request || null, paidUntil: p.paidUntil || null, alumni: !!p.alumni, name: p.name, email: p.email, role: p.role, studentId: p.studentId || null, teacherId: p.teacherId || null, photo: !!p.photo, phone: p.phone || '', level: p.level || '', classChoice: p.classChoice || '' };
  await U().setJSON('directory', dir);
}
// Online access plans, set against the 2026–27 brochure: the cheapest course is ₸45,000 a month (8 lessons with a teacher),
// so self-study online access sits at about a fifth of it (6 months ≈ one month of group lessons).
const MEMBERSHIP = {
  plans: { 1: 9900, 3: 24900, 6: 44900, 12: 79900 },   // the year costs less a month than 6 months (about 4 months free against paying monthly)
  teacherPlans: { 1: 4000, 3: 8000, 6: 10000, 12: 20000 },   // Teacher plan: Teach mode, class games, all lessons for use in class
  trialDays: TRIAL_DAYS,
  offer: '',
  price: '',
  how: 'Pay by Kaspi transfer or in cash at IF Academy (Al-Farabi 19, Kostanay), then press "I have paid". Your full access is switched on as soon as the school confirms the payment.',
  free: ''
};
async function membership() { const m = { ...MEMBERSHIP, ...((await S().get('membership', { type: 'json' })) || {}) }; m.plans = { ...MEMBERSHIP.plans, ...(m.plans || {}) }; m.teacherPlans = { ...MEMBERSHIP.teacherPlans, ...(m.teacherPlans || {}) }; return m; }
async function ieltsSummary(uid) {
  const idx = (await U().get(`u/${uid}/index`, { type: 'json' })) || [];
  const scored = idx.filter(a => typeof a.band === 'number');
  const pick = skill => { const l = scored.filter(a => (a.skill || 'writing') === skill); return l.length ? { count: l.length, latest: l.at(-1).band, best: Math.max(...l.map(a => a.band)), lastAt: l.at(-1).at } : null; };
  return { writing: pick('writing'), speaking: pick('speaking'), recent: idx.slice(-8).reverse() };
}
/** What a person studies, chosen at registration and changeable any time: 'ge:B1', 'be:B1', 'ielts', 'ket', 'pet', 'yl:starters', 'yl:movers', 'yl:flyers', 'maths'. */
const STUDY = /^(ge:(A1|A2|B1|B2|C1|C2)|be:(A2|B1|B2|C1)|ielts|ket|pet|yl:(starters|movers|flyers)|maths|book:(ef-a1|ef-a2|ef-b1|ef-b2|ef-c1|ef-c2|teens-b1|teens-b2|giu))$/;
/** At most 3 courses and 2 coursebooks. */
function cleanStudy(a) { const all = [...new Set(a.map(x => String(x || '').trim()).filter(x => STUDY.test(x)))]; return [...all.filter(x => !x.startsWith('book:')).slice(0, 3), ...all.filter(x => x.startsWith('book:')).slice(0, 2)]; }
function publicStudent(s) { return s && { id: s.id, first: s.first, last: s.last, classes: s.classes || [], status: s.status, level: s.level || '', tests: s.tests || [], uid: s.uid || null }; }

/** Link an account to its school record by phone (students) or name/phone (teachers). */
async function linkByPhone(uid, profile) {
  const key = phoneKey(profile.phone), hasPhone = key && key.length >= 10;
  if ((profile.role === 'student' || (profile.role === 'guest' && profile.track && profile.track !== 'outside')) && !profile.studentId && hasPhone) {
    const list = await doc('students');
    const hit = list.find(s => phoneKey(s.phone) === key || phoneKey(s.parentPhone) === key);
    if (hit && (!hit.uid || hit.uid === uid)) {
      hit.uid = uid; profile.studentId = hit.id;
      if (profile.role === 'guest') { profile.role = 'student'; delete profile.request; }   // found in the school records: full access straight away
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
/** A lesson was cancelled, moved or added: tell every active student of the class (website, Telegram, WhatsApp). */
const LDAY = { en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ru: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'], kk: ['жс', 'дс', 'сс', 'ср', 'бс', 'жм', 'сб'] };
const ldate = (d, lang) => { const x = new Date(d + 'T00:00:00Z'); return (LDAY[lang] || LDAY.en)[x.getUTCDay()] + ' ' + d.slice(8) + '.' + d.slice(5, 7); };
const LCH = {
  en: { cancel: (c, l, n) => `❌ Lesson cancelled: ${c.label}, ${ldate(l.date, 'en')} at ${l.start}.${n ? ' ' + n : ''}`, move: (c, l, t, n) => `🔁 Lesson moved: ${c.label} from ${ldate(l.date, 'en')} ${l.start} to ${ldate(t.date, 'en')} ${t.start}${t.end ? '–' + t.end : ''}.${n ? ' ' + n : ''}`, extra: (c, t, n) => `➕ Extra lesson: ${c.label} on ${ldate(t.date, 'en')} at ${t.start}${t.end ? '–' + t.end : ''}.${n ? ' ' + n : ''}`, back: (c, l) => `✅ The lesson is back on: ${c.label}, ${ldate(l.date, 'en')} at ${l.start}.` },
  ru: { cancel: (c, l, n) => `❌ Урок отменён: ${c.label}, ${ldate(l.date, 'ru')} в ${l.start}.${n ? ' ' + n : ''}`, move: (c, l, t, n) => `🔁 Урок перенесён: ${c.label} с ${ldate(l.date, 'ru')} ${l.start} на ${ldate(t.date, 'ru')} ${t.start}${t.end ? '–' + t.end : ''}.${n ? ' ' + n : ''}`, extra: (c, t, n) => `➕ Дополнительный урок: ${c.label}, ${ldate(t.date, 'ru')} в ${t.start}${t.end ? '–' + t.end : ''}.${n ? ' ' + n : ''}`, back: (c, l) => `✅ Урок состоится: ${c.label}, ${ldate(l.date, 'ru')} в ${l.start}.` },
  kk: { cancel: (c, l, n) => `❌ Сабақ болмайды: ${c.label}, ${ldate(l.date, 'kk')} ${l.start}.${n ? ' ' + n : ''}`, move: (c, l, t, n) => `🔁 Сабақ ауыстырылды: ${c.label}, ${ldate(l.date, 'kk')} ${l.start} → ${ldate(t.date, 'kk')} ${t.start}${t.end ? '–' + t.end : ''}.${n ? ' ' + n : ''}`, extra: (c, t, n) => `➕ Қосымша сабақ: ${c.label}, ${ldate(t.date, 'kk')} ${t.start}${t.end ? '–' + t.end : ''}.${n ? ' ' + n : ''}`, back: (c, l) => `✅ Сабақ болады: ${c.label}, ${ldate(l.date, 'kk')} ${l.start}.` }
};
async function tellLesson(c, textFor) {
  const students = (await doc('students')).filter(s => inClass(c, s) && !/withdrawn|finished|frozen/i.test(s.status || ''));
  const links = await getLinks(), prefs = (await S().get('waPrefs', { type: 'json' })) || {}, wa = waReady(), bySid = await uidsByStudent(links);
  let n = 0;
  for (const s0 of students) {
    const s = { ...s0, uid: s0.uid || bySid[s0.id] || null }, l = s.uid && links[s.uid], lang = l?.lang || prefs[s.id]?.lang || 'ru';
    try {
      if (s.uid) await addNote(s.uid, { kind: 'lessonChange', text: textFor(l ? lang : 'en') });
      if (l && tgToken()) { await tgSend(l.chatId, textFor(lang)); n++; }
      else if (wa && !prefs[s.id]?.off) for (const num of [...new Set([s.phone, s.parentPhone].map(waNumber).filter(Boolean))]) { await waSend(num, 'IF Academy\n' + textFor(lang)); n++; }
    } catch (e) { console.error('lesson change notify', s.id, e.message); }
  }
  return { students: students.length, sent: n };
}
async function classesForTeacher(profile) {
  const [classes, teachers] = await Promise.all([doc('classes'), doc('teachers')]);
  if (profile.role === 'admin' || profile.smm) return hidePrivate(classes, profile).filter(c => !c.left);
  const t = teachers.find(x => x.id === profile.teacherId);
  return classes.filter(c => t && (c.teacherId === t.id) && !c.left);
}
/** Classes where this teacher covers at least one lesson (Telegram bot cover requests, or set by the admin). */
async function coverClasses(teacherId, CH) {
  if (!teacherId) return [];
  const ids = new Set(Object.entries(CH.cover || {}).filter(([, v]) => v && v.teacherId === teacherId).map(([k]) => k.split('|')[0]));
  return ids.size ? (await doc('classes')).filter(c => ids.has(c.id) && c.teacherId !== teacherId) : [];
}
/** Individual students (in an IF Admin "individual" group, or with a private-student account) who have no class of
    their own yet get one, so they show in IF Classroom with a video room. The director's private students
    (account track "private") are his; otherwise the group's teacher. The timetable can be added in Admin → Classes. */
const SOLO_RX = /individ|индив|private|1[-:]1|one[- ]to[- ]one/i;
async function soloRooms(profile, mine) {
  const [classes, students, groups] = await Promise.all([doc('classes'), doc('students'), getStore({ name: 'ifadmin', consistency: 'strong' }).get('c/groups', { type: 'json' }).then(g => g || {})]);
  const dir = (await U().get('directory', { type: 'json' })) || {};
  const privateSid = new Set(Object.values(dir).filter(d => d.track === 'private' && d.studentId).map(d => d.studentId));
  const own = new Set(classes.flatMap(c => Array.isArray(c.studentIds) ? c.studentIds : []));
  const isSoloGroup = gid => SOLO_RX.test(gid) || gid === 'ind' || SOLO_RX.test((groups[gid] || {}).n || '') || SOLO_RX.test((classes.find(c => c.id === 'c-' + gid) || {}).label || '');
  const add = [];
  for (const s of students) {
    if (own.has(s.id) || /withdrawn|finished/i.test(s.status || '')) continue;
    const gs = s.groups || [], gid = gs.find(isSoloGroup);
    if (!gid && !privateSid.has(s.id)) continue;
    const g = gid || gs[0] || 'ind', gc = classes.find(c => c.id === 'c-' + g);
    const teacherId = privateSid.has(s.id) ? DIRECTOR_ID : (gc && gc.teacherId) || '';
    add.push({ id: 'c-' + g + '-' + s.id, label: `${`${s.first} ${s.last}`.trim()} (individual)`, group: g, studentIds: [s.id], teacherId, schedule: '', room: '' });
  }
  // private-student accounts not yet matched to an IF Admin record (no phone match): the director's
  for (const [uid, d] of Object.entries(dir)) {
    if (d.track !== 'private' || d.studentId || d.role !== 'student') continue;
    const id = 'c-pv-' + uid;
    if (!classes.some(c => c.id === id)) add.push({ id, label: `${d.name || 'Student'} (individual)`, uids: [uid], teacherId: DIRECTOR_ID, schedule: '', room: '' });
    else if (!classes.find(c => c.id === id).left) add.push(classes.find(c => c.id === id));
  }
  if (!add.length) return [];
  const fresh = add.filter(a => !classes.some(c => c.id === a.id));
  if (fresh.length) { const all = await doc('classes'); for (const a of fresh) if (!all.some(c => c.id === a.id)) all.push(a); await save('classes', all); }
  const mineIds = new Set(mine.map(c => c.id));
  return hidePrivate(add, profile).filter(a => !mineIds.has(a.id) && (profile.role === 'admin' || profile.smm || a.teacherId === profile.teacherId));
}
const DIRECTOR_ID = 't-abdoulie';
const plusCover = (list, extra) => list.concat(extra.filter(c => !list.some(x => x.id === c.id)));
async function canSeeStudent(profile, student) {
  if (profile.role === 'admin') return true;
  if (profile.role !== 'teacher') return false;
  return (await classesForTeacher(profile)).some(c => inClass(c, student));
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
/* IF English app progress (courses, XP, streak): kept with the account so it follows the student. */
async function appProgress(uid, method, req) {
  if (method === 'GET') return json({ progress: (await U().get(`u/${uid}/ifx`, { type: 'json' })) || null });
  if (method === 'PUT') {
    const raw = await req.text(); if (raw.length > 300000) return fail(413, 'big');
    let p; try { p = JSON.parse(raw); } catch { return fail(400, 'bad'); }
    const old = (await U().get(`u/${uid}/ifx`, { type: 'json' })) || { done: {} };
    const done = { ...(old.done || {}) };
    for (const [k, v] of Object.entries(p.done || {})) if (/^[\w-]+\/[\w-]+\/[\w-]+$/.test(k) && v && (!done[k] || (+v.at || 0) > (+done[k].at || 0))) done[k] = { score: Math.max(0, Math.min(100, Math.round(+v.score || 0))), at: +v.at || Date.now() };
    const out = { done, xp: Math.max(+old.xp || 0, Math.min(1e7, Math.round(+p.xp || 0))), streak: Math.min(5000, Math.round(+p.streak || 0)), last: String(p.last || '').slice(0, 10),
      goal: String(p.goal || '').slice(0, 20), level: String(p.level || '').slice(0, 4), at: Date.now() };
    await U().setJSON(`u/${uid}/ifx`, out);
    return json({ ok: true });
  }
  return null;
}

const PDF_FILES = { 'ielts-vocabulary-bank': 'IF Academy - IELTS Vocabulary Bank.pdf', 'ielts-writing-language-bank': 'IF Academy - IELTS Writing Language Bank.pdf' };
// IF's own coursebooks (made from the IF App courses by a/coursebook/?print=1)
for (const [id, t] of [['teens-a2', 'A2 English for Teens'], ['ge-a1', 'General English A1'], ['ge-a2', 'General English A2'], ['ge-b1', 'General English B1'], ['ge-b2', 'General English B2'], ['ge-c1', 'General English C1'], ['ge-c2', 'General English C2']]) PDF_FILES['coursebook-' + id] = `IF Academy - ${t} Coursebook.pdf`;
function pdfSig(id, exp) {
  const k = (globalThis.Netlify?.env?.get('IFADMIN_SYNC_KEY')) || process.env.IFADMIN_SYNC_KEY || '';
  return k.length >= 32 ? createHmac('sha256', k).update('pdf|' + id + '|' + exp).digest('hex').slice(0, 32) : '';
}
async function pdfResponse(id) {
  let bytes = null;
  for (const base of [process.cwd(), process.env.LAMBDA_TASK_ROOT || '', '/var/task']) {
    try { bytes = await readFile(join(base, 'netlify/files/pdf', id + '.pdf')); break; } catch {}
  }
  if (!bytes) return Response.json({ error: 'missing' }, { status: 404 });
  return new Response(bytes, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${PDF_FILES[id]}"`, 'Cache-Control': 'private, no-store' } });
}
export default async (req) => {
  await runMigrations();
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/school\/?/, '').replace(/\/$/, '');
  const method = req.method;

  if (path === 'books' && method === 'GET') return json({ books: await doc('books') });

  // student feedback approved by the director (homepage)
  if (path === 'feedback/public' && method === 'GET') return Response.json({ feedback: await publicFeedback() }, { headers: { 'Cache-Control': 'public, max-age=120' } });
  // classes for the registration form (names and times only)
  if (path === 'classes' && method === 'GET') {
    const cl = hidePrivate(await doc('classes'), null);
    return json({ classes: [...cl.map(c => ({ id: c.id, label: c.label, schedule: c.schedule || '', kind: c.kind || '' })), { id: 'alumni', label: 'IF Alumni', schedule: 'Former students who finished their course', kind: 'alumni' }], membership: await membership() });
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

  // signed PDF link (10 minutes): Telegram's own downloader fetches it without the site's sign-in cookie
  const sdl = path.match(/^dl\/([a-z0-9-]+)\/(\d+)\.([a-f0-9]{32})\.pdf$/);
  if (sdl && method === 'GET') {
    const [, id, exp, sig] = sdl;
    if (!PDF_FILES[id] || +exp < Date.now() / 1000) return fail(410, 'expired');
    const want = pdfSig(id, exp);
    if (!want || !timingSafeEqual(Buffer.from(want), Buffer.from(sig))) return fail(403, 'link');
    return pdfResponse(id);
  }

  let user = await tgAccount(req);   // inside the Telegram bot (Mini App): signed in through the bot connection
  if (!user) {
    try { await refreshSession(); } catch {}   // an expired 1-hour token is renewed from the refresh cookie: people stay signed in
    try { user = await getUser(); } catch { user = null; }
  }
  if (!user) return fail(401, 'signin', req.tgWhy ? { tg: req.tgWhy } : {});
  const uid = user.id;
  let profile = await getProfile(uid);
  if (await ensureTrial(uid, profile)) await putProfile(uid, profile);   // free accounts made before the trial existed

  if (path === 'me' && method === 'GET') {
    // Alumni year and leavers' month: dates are stamped the first time they apply, so every page sees the same access
    if (profile && profile.role === 'student') {
      let ch = false;
      if (profile.track === 'alumni' && !profile.alumniUntil) { profile.alumniUntil = new Date(Date.now() + 365 * 864e5).toISOString(); ch = true; }
      if (profile.studentId && profile.track !== 'alumni') {
        const st = (await doc('students')).find(x => x.id === profile.studentId);
        if (st && st.status === 'withdrawn' && !profile.leftUntil) { profile.leftUntil = new Date(Date.now() + 30 * 864e5).toISOString(); ch = true; }
        else if (st && st.status !== 'withdrawn' && profile.leftUntil) { delete profile.leftUntil; ch = true; }
      }
      if (ch) await putProfile(uid, profile);
    }
    const out = { user: { id: uid, email: user.email, name: profile?.name || user.name || '' }, profile, access: tier(profile), membership: await membership() };
    if (profile?.studentId) {
      const s = (await doc('students')).find(x => x.id === profile.studentId);
      const classes = (await doc('classes')).filter(c => inClass(c, s));
      out.student = publicStudent(s); out.classes = classes; out.attendance = await attendanceOf(profile.studentId);
      out.homework = forClasses(await loadHomework(), classes.map(c => c.id), { past: 14 }).map(h => forStudent(h, profile.studentId));
    }
    if (profile && isStaff(profile.role)) out.teaching = await classesForTeacher(profile);
    if (profile) out.ielts = await ieltsSummary(uid);
    out.teachers = (await doc('teachers')).map(t => ({ id: t.id, name: t.name, photoUid: t.uid || null }));
    out.books = await doc('books');
    return json(out);
  }

  if (path === 'activate' && method === 'POST') {
    // a code is optional: with a code (or a phone number found in the school records) the account gets full access at once;
    // without one, school/individual students wait for approval on a free account, and outside learners start free
    const b = await req.json().catch(() => ({}));
    const code = str(b.code, 60);
    const role = code ? await roleForCode(code) : null;
    if (code && !role) return fail(403, 'code');
    const priv = role && await isPrivateCode(code);
    let track = TRACKS.includes(b.track) ? b.track : (b.classChoice === 'IF Alumni' ? 'alumni' : role ? 'if' : 'outside');
    if (priv) track = 'private';
    const want = role || 'guest';
    const finalRole = profile?.role && RANK[profile.role] > RANK[want] ? profile.role : want;
    profile = { ...(profile || {}), name: str(b.name, 80) || profile?.name || user.name || user.email.split('@')[0], email: user.email,
      phone: str(b.phone, 40) || profile?.phone || '', role: finalRole,
      track: finalRole === 'guest' || finalRole === 'student' ? (role || !profile?.track || profile.role === 'guest' ? track : profile.track) : (profile?.track || ''),
      level: str(b.level, 30) || profile?.level || '', classChoice: str(b.classChoice, 80) || profile?.classChoice || '',
      goals: str(b.goals, 600) || profile?.goals || '',
      study: Array.isArray(b.study) ? cleanStudy(b.study) : (profile?.study || []),
      ...(b.child || profile?.child ? { child: str(b.child, 80) || profile?.child } : {}),
      ...(/^\d{4}-\d{2}-\d{2}$/.test(b.birth || '') ? { birth: b.birth } : {}), ...(b.city ? { city: str(b.city, 60) } : {}), ...(b.parent ? { parent: str(b.parent, 80) } : {}), ...(b.parentPhone ? { parentPhone: str(b.parentPhone, 40) } : {}),
      alumni: track === 'alumni' || b.classChoice === 'IF Alumni' ? true : !!profile?.alumni, since: profile?.since || new Date().toISOString(), attempts: profile?.attempts || 0 };
    // IF Academy staff: a request with their position; the director or manager approves it (Admin → Accounts)
    const POS = ['teacher', 'manager', 'smm', 'reception', 'other'];
    if (track === 'staff') profile.staffPos = POS.includes(b.staffPos) ? b.staffPos : 'other';
    if (finalRole === 'guest' && !['outside', 'tutor', 'parent'].includes(track)) profile.request = { track, ...(track === 'staff' ? { position: profile.staffPos } : {}), at: new Date().toISOString() };
    else if (finalRole !== 'guest') delete profile.request;
    const wasNew = !(await U().get(`u/${uid}/profile`, { type: 'json' }).catch(() => null))?.since;
    profile = await linkByPhone(uid, profile);
    await ensureTrial(uid, profile);
    await putProfile(uid, profile);
    { const { activity } = await import('../lib/activity.mjs'); const TL = { if: 'IF Academy student', private: 'individual student', alumni: 'IF Alumni', outside: 'learning on their own', tutor: 'outside teacher', parent: 'parent', staff: 'staff — ' + (profile.staffPos || '') }; await activity(`👤 ${wasNew ? 'New account' : 'Account updated'}: ${profile.name}${profile.phone ? ' · ' + profile.phone : ''} — ${TL[profile.track] || profile.role}${profile.request ? ' (waiting for your approval)' : ''}`, uid); }
    if (role && isStaff(role) && !(await S().get('contentKey', { type: 'json' }))) await storeKeyFrom(code);
    if (role) await keepLockKeys(await lockKeysFromCode(code));
    return json({ profile, access: tier(profile) });
  }

  // a free account asks for full access (after paying, or to be confirmed as a school/individual student)
  if (path === 'upgrade' && method === 'POST') {
    if (!profile?.role) return fail(403, 'activate');
    if (isMember(profile)) return json({ profile, access: tier(profile) });
    const b = await req.json().catch(() => ({}));
    const track = TRACKS.includes(b.track) ? b.track : (profile.track || 'outside');
    profile.request = { track, paid: ['outside', 'tutor', 'parent'].includes(track), months: Math.max(1, Math.min(12, +b.months || 1)), note: str(b.note, 300), at: new Date().toISOString() };
    profile.track = track;
    await putProfile(uid, profile);
    return json({ profile, access: tier(profile) });
  }

  // locked pages: hand the class key (students) or class + staff keys (teachers/admin) to signed-in accounts
  if (path === 'lockkeys' && method === 'GET') {
    if (!profile?.role) return fail(403, 'activate');
    if (!isMember(profile)) return fail(403, 'members');
    const k = (await S().get('lockKeys', { type: 'json' })) || {};
    const until = accessUntil(profile);
    // members always get full access to the apps; the page keys (for encrypted class pages) come along when the site has them
    if (!k.ks) return json({ member: true, role: isStaff(profile.role) ? 'teacher' : 'student', ...(until ? { until } : {}) });   // trial / paid online access: the page forgets the keys when it ends
    return json(isStaff(profile.role) && k.kt ? { ks: k.ks, kt: k.kt, role: 'teacher' } : { ks: k.ks, role: 'student', ...(until ? { until } : {}) });
  }

  if (!profile?.role) return fail(403, 'activate');

  /* ---------- tuition: the student's month, and "I paid in cash" (the school confirms it like a receipt) ---------- */
  if (path === 'tuition' && method === 'GET') {
    const info = await cashInfo(uid); if (!info) return json({ tuition: null });
    const st = profile.studentId ? (await doc('students')).find(x => x.id === profile.studentId) : null;
    const { payStatus } = await import('../lib/bot-core.mjs');
    return json({ tuition: { ...info, waiting: info.waiting ? { amount: info.waiting.amount, cash: !!info.waiting.cash, at: info.waiting.at } : null, status: st ? payStatus(st) : null, kaspi: await kaspiInfo(uid).catch(e => { console.error('kaspi info', e.message); return { ready: false }; }) } });
  }
  if (path === 'tuition/kaspi' && method === 'POST') {   // send the Kaspi invoice to the student's or the parent's number on the school record
    const b = await req.json().catch(() => ({}));
    const r = await createInvoice({ uid, which: b.phone === 'p' ? 'p' : b.phone === 's' ? 's' : '', lang: 'en' });
    return r.ok ? json({ ok: true, already: !!r.already, amount: r.amount, month: r.month, phone: r.phone }) : fail(r.error === 'limit' ? 429 : r.error === 'failed' ? 502 : 404, r.error || 'failed');
  }
  if (path === 'tuition/cash' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    const r = await cashClaim({ uid, amount: b.amount, received: b.received, lang: 'en' });
    return r ? json({ ok: true, amount: r.amount, month: r.month }) : fail(404, 'record');
  }

  /* ---------- student feedback: one per account, shown on the homepage after the director approves it ---------- */
  if (path === 'feedback' && method === 'GET') return json({ feedback: await myFeedback(uid) });
  if (path === 'feedback' && method === 'POST') {
    if (isStaff(profile.role)) return fail(403, 'students');
    const b = await req.json().catch(() => ({}));
    let sname = profile.name;
    if (profile.studentId) { const s = (await doc('students')).find(x => x.id === profile.studentId); if (s) sname = `${s.first} ${s.last}`.trim() || sname; }
    try {
      const f = await submitFeedback(uid, profile, sname, b);
      try {   // let the director know on Telegram
        const links = await getLinks();
        for (const [u, l] of Object.entries(links)) { const p = await U().get(`u/${u}/profile`, { type: 'json' }); if (p?.role !== 'admin') continue;
          await tgSend(l.chatId, `💬 New student feedback from ${f.name}${f.course ? ' (' + f.course + ')' : ''} — ${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}\n\n“${f.text}”\n\nApprove it in Admin → Feedback: https://intellectfirst.com/me/#/admin/feedback`); }
      } catch (e) { console.error('feedback notify', e.message); }
      return json({ feedback: f });
    } catch (e) { return fail(400, e.code || 'bad'); }
  }
  if (path === 'feedback' && method === 'DELETE') { await removeFeedback(uid); return json({ ok: true }); }

  /* ---------- IF English app progress (courses, XP, streak): kept with the account so it follows the student ---------- */
  if (path === 'app/progress') { const r = await appProgress(uid, method, req); if (r) return r; }

  // study PDFs (IELTS Studio vocabulary and writing language banks): students and teachers only
  if (path.startsWith('download/') && method === 'GET') {
    const id = path.slice(9).replace(/\.pdf$/, '');
    if (!PDF_FILES[id]) return fail(404, 'none');
    if (!isMember(profile) && !isStaff(profile.role)) return fail(403, 'members');
    // ?link=1 → a signed link for the Telegram mini-app (it downloads the file itself; the page cannot save files there)
    if (new URL(req.url).searchParams.get('link')) {
      const exp = String(Math.floor(Date.now() / 1000) + 600), sig = pdfSig(id, exp);
      if (!sig) return fail(503, 'link');
      return json({ url: `${new URL(req.url).origin}/api/school/dl/${id}/${exp}.${sig}.pdf`, name: PDF_FILES[id] });
    }
    return pdfResponse(id);
  }

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
    if (Array.isArray(b.study)) profile.study = cleanStudy(b.study);
    // teachers' professional profile
    if (isStaff(profile.role)) for (const k of ['education', 'experience', 'skillsHard', 'skillsSoft', 'hobbies']) if (k in b) profile[k] = String(b[k] == null ? '' : b[k]).slice(0, 3000);
    profile = await linkByPhone(uid, profile);
    await putProfile(uid, profile);
    return json({ profile });
  }

  /* ---------- teacher certificates (file optional: PDF or image, up to 4 MB) ---------- */
  if (path === 'cert' && method === 'POST') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const b = await req.json().catch(() => ({}));
    const title = str(b.title, 160); if (!title) return fail(400, 'title');
    const c = { id: newId('c'), title, issuer: str(b.issuer, 160), year: str(b.year, 20), at: new Date().toISOString() };
    if (b.file) {
      const m = String(b.file).match(/^data:(application\/pdf|image\/jpeg|image\/png|image\/webp);base64,([A-Za-z0-9+/=]+)$/);
      if (!m) return fail(400, 'file');
      const bytes = Buffer.from(m[2], 'base64');
      if (bytes.length > 4 * 1024 * 1024) return fail(413, 'big');
      await C().set(`${uid}/${c.id}`, bytes, { metadata: { type: m[1], name: str(b.name, 120) } });
      c.file = { type: m[1], name: str(b.name, 120) || 'certificate', size: bytes.length };
    }
    profile.certs = [...(profile.certs || []), c].slice(-40); await putProfile(uid, profile);
    return json({ cert: c, certs: profile.certs });
  }
  const cd = path.match(/^cert\/([A-Za-z0-9_-]+)$/);
  if (cd && method === 'DELETE') {
    profile.certs = (profile.certs || []).filter(c => c.id !== cd[1]); await C().delete(`${uid}/${cd[1]}`).catch(() => {});
    await putProfile(uid, profile); return json({ certs: profile.certs });
  }
  const cf = path.match(/^cert\/([A-Za-z0-9-]+)\/([A-Za-z0-9_-]+)$/);
  if (cf && method === 'GET') {
    if (cf[1] !== uid && !isStaff(profile.role)) return fail(403, 'forbidden');
    const r = await C().getWithMetadata(`${cf[1]}/${cf[2]}`, { type: 'arrayBuffer' });
    if (!r) return fail(404, 'missing');
    return new Response(r.data, { headers: { 'Content-Type': r.metadata?.type || 'application/octet-stream', 'Content-Disposition': `inline; filename="${String(r.metadata?.name || 'certificate').replace(/[^\w. -]/g, '_')}"`, 'Cache-Control': 'private, max-age=3600' } });
  }
  // a teacher's professional profile, for colleagues and the director
  const tp = path.match(/^teacher-profile\/([A-Za-z0-9-]+)$/);
  if (tp && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const p2 = await getProfile(tp[1]); if (!p2 || !isStaff(p2.role)) return fail(404, 'missing');
    return json({ profile: { name: p2.name, role: p2.role, photo: p2.photo, about: p2.about || '', education: p2.education || '', experience: p2.experience || '', skillsHard: p2.skillsHard || '', skillsSoft: p2.skillsSoft || '', hobbies: p2.hobbies || '', certs: p2.certs || [] }, uid: tp[1] });
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
    return json({ classes: classes.map(c => ({ ...c, count: students.filter(s => inClass(c, s) && s.status !== 'withdrawn' && s.status !== 'finished').length })) });
  }
  /* ---- lesson check-in and registers (teachers check in at the start of every lesson, then take the register) ---- */
  if (path === 'teach/today' && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const date = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('date') || '') ? url.searchParams.get('date') : todayStr();
    const [mine, students, teachers] = await Promise.all([classesForTeacher(profile), doc('students'), doc('teachers')]);
    const CH = await loadChanges(), own0 = profile.role === 'admin' && url.searchParams.get('all') !== '1' ? mine.filter(c => c.teacherId === profile.teacherId) : mine;
    const extraC = await coverClasses(profile.teacherId, CH), own = plusCover(own0, extraC), ownIds = new Set(own0.map(c => c.id));
    const L = await loadLog(date.slice(0, 7)), now = new Date(), cutoff = await checkSince();
    const lessons = withEntry(lessonsOn(own, date, CH), L, now, cutoff).filter(l => ownIds.has(l.classId) || l.teacherId === profile.teacherId).map(l => ({ ...l, coverForName: l.coverFor ? (teachers.find(t => t.id === l.coverFor) || {}).name || '' : '' })).map(l => ({ ...l, teacher: (teachers.find(t => t.id === l.teacherId) || {}).name || '',
      students: students.filter(s => inClass(own.find(c => c.id === l.classId), s) && !/withdrawn|finished/i.test(s.status || '')).map(s => ({ sid: s.id, name: `${s.first} ${s.last}`.trim(), frozen: s.status === 'frozen' })).sort((a, b) => a.name.localeCompare(b.name)) }));
    const month = await monthLessons(profile.role === 'admin' ? mine.filter(c => c.teacherId === profile.teacherId) : mine, date.slice(0, 7), now);
    return json({ date, now: now.toISOString(), grace: GRACE_MIN, early: EARLY_MIN, lessons, me: punctuality(month, teachers)[0] || null });
  }
  if ((path === 'teach/checkin' || path === 'teach/register') && method === 'POST') {
    if (!isStaff(profile.role) || (profile.smm && profile.role !== 'admin')) return fail(403, 'staff');
    const b = await req.json().catch(() => ({}));
    const [cid, date] = String(b.key || '').split('|');
    const CH = await loadChanges(), c = plusCover(await classesForTeacher(profile), await coverClasses(profile.teacherId, CH)).find(x => x.id === cid); if (!c || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return fail(404, 'lesson');
    const lesson = lessonsOn([c], date, CH).find(l => l.key === b.key); if (!lesson) return fail(404, 'lesson');
    const who = { uid, name: profile.name || '', role: profile.role };
    try {
      if (path === 'teach/checkin') return json({ entry: await checkIn(lesson, who) });
      return json(await saveRegister(lesson, b.marks, b.lateBy, who));
    } catch (e) { if (e.code) return fail(409, e.code); throw e; }
  }
  const ta = path.match(/^teach\/attendance\/([A-Za-z0-9-]+)$/);
  if (ta && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const c = (await classesForTeacher(profile)).find(x => x.id === ta[1]); if (!c) return fail(404, 'missing');
    const students = (await doc('students')).filter(s => inClass(c, s));
    return json(await classAttendance(c, students));
  }
  /* ---- calendar: a week of lessons; teachers (and the director) cancel, move, restore or add lessons ---- */
  if (path === 'teach/calendar' && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const from = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('from') || '') ? url.searchParams.get('from') : todayStr();
    const days = Math.max(1, Math.min(31, +url.searchParams.get('days') || 7));
    const [mine, teachers, students] = await Promise.all([classesForTeacher(profile), doc('teachers'), doc('students')]);
    const who = url.searchParams.get('teacher') || '';
    let list = profile.role === 'admin' ? (who === 'all' ? mine : mine.filter(c => c.teacherId === (who || profile.teacherId))) : mine;
    const CH = await loadChanges(), now = new Date(), cutoff = await checkSince(), out = [];
    const viewT = profile.role === 'admin' ? (who === 'all' ? '' : who || profile.teacherId) : profile.teacherId, listIds = new Set(list.map(c => c.id));
    if (viewT) list = plusCover(list, await coverClasses(viewT, CH));
    const d0 = new Date(from + 'T00:00:00Z');
    for (let i = 0; i < days; i++) {
      const date = new Date(d0.getTime() + i * 864e5).toISOString().slice(0, 10);
      out.push(...withEntry(lessonsOn(list, date, CH), await loadLog(date.slice(0, 7)), now, cutoff).filter(l => !viewT || listIds.has(l.classId) || l.teacherId === viewT));
    }
    const roster = l => students.filter(s => inClass(list.find(c => c.id === l.classId), s) && !/withdrawn|finished/i.test(s.status || '')).map(s => ({ sid: s.id, name: `${s.first} ${s.last}`.trim(), frozen: s.status === 'frozen' })).sort((a, b) => a.name.localeCompare(b.name));
    return json({ from, days, early: EARLY_MIN, grace: GRACE_MIN, now: now.toISOString(), me: profile.teacherId || '', lessons: out.map(l => ({ ...l, teacher: (teachers.find(t => t.id === l.teacherId) || {}).name || '', coverForName: l.coverFor ? (teachers.find(t => t.id === l.coverFor) || {}).name || '' : '', students: roster(l) })), classes: list.map(c => ({ id: c.id, label: c.label, schedule: c.schedule || '', room: c.room || '' })),
      teachers: profile.role === 'admin' ? teachers.filter(t => mine.some(c => c.teacherId === t.id)).map(t => ({ id: t.id, name: t.name })) : [] });
  }
  /* ---- working hours: teaching hours from lessons that took place; administrative hours from shifts ---- */
  if (path === 'hours/me' && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const month = /^\d{4}-\d{2}$/.test(url.searchParams.get('month') || '') ? url.searchParams.get('month') : todayStr().slice(0, 7);
    const mine = await classesForTeacher(profile), own = profile.role === 'admin' ? mine.filter(c => c.teacherId && c.teacherId === profile.teacherId) : mine;
    const out = { month, teaching: own.length ? await teachingHours(own, month) : null };
    if (profile.role === 'admin') out.admin = await adminHours(uid, month);
    // salary so far this month, worked out from the lesson log (covers included)
    if (profile.teacherId) { try { const { payroll } = await import('../lib/payroll.mjs'); const P = await payroll(month, profile.teacherId); out.pay = { ...(P.teachers[0] || { total: 0, items: [], hours: 0, lessons: 0, rule: '' }), rules: P.rules, from: P.from, to: P.to }; if (!P.teachers[0]) { const { loadRates, ruleText } = await import('../lib/payroll.mjs'); const R = await loadRates(); out.pay.rule = (R.skip || []).includes(profile.teacherId) ? 'Own pay arrangement — hours only' : ruleText((R.teachers || {})[profile.teacherId] || R.default); out.pay.own = (R.skip || []).includes(profile.teacherId); } } catch (e) { console.error('pay', e.message); } }
    return json(out);
  }
  /* ---- teacher pay (admin): the month's payroll, the rates, "the teacher was at school" for a late cancellation ---- */
  if (path === 'pay/month' && method === 'GET') {
    if (profile.role !== 'admin' || profile.teacherId !== 't-abdoulie') return fail(403, 'director');
    const month = /^\d{4}-\d{2}$/.test(url.searchParams.get('month') || '') ? url.searchParams.get('month') : todayStr().slice(0, 7);
    const { payroll, loadRates } = await import('../lib/payroll.mjs');
    return json({ ...(await payroll(month)), rates: await loadRates(), teachersList: (await doc('teachers')).map(t => ({ id: t.id, name: t.name })) });
  }
  if (path === 'pay/rates' && method === 'PUT') {
    if (profile.role !== 'admin' || profile.teacherId !== 't-abdoulie') return fail(403, 'director');
    const { saveRates } = await import('../lib/payroll.mjs');
    return json({ rates: await saveRates(await req.json().catch(() => ({}))) });
  }
  if (path === 'pay/atschool' && method === 'POST') {
    if (profile.role !== 'admin') return fail(403, 'admin');
    const b = await req.json().catch(() => ({}));
    const { setAtSchool } = await import('../lib/payroll.mjs');
    return (await setAtSchool(String(b.key || ''), !!b.on, profile.name || '')) ? json({ ok: true }) : fail(404, 'missing');
  }
  if ((path === 'hours/shift' || path === 'hours/add' || path === 'hours/remove') && method === 'POST') {
    if (profile.role !== 'admin') return fail(403, 'admin');
    const b = await req.json().catch(() => ({}));
    // an administrator can also add or remove time for another staff member (from that person's page)
    const who = b.for && path !== 'hours/shift' ? str(b.for, 60) : uid, whoName = who === uid ? (profile.name || '') : ((await getProfile(who))?.name || '');
    try {
      if (path === 'hours/shift') return json({ admin: await workShift(uid, profile.name || '', b.action === 'out' ? 'out' : 'in', b.note) });
      if (path === 'hours/add') return json({ admin: await addWork(who, whoName, b) });
      return json({ admin: await removeWork(who, String(b.month || '').slice(0, 7), String(b.id || '')) });
    } catch (e) { if (e.code) return fail(409, e.code); throw e; }
  }
  if (path === 'hours/team' && method === 'GET') {
    if (profile.role !== 'admin') return fail(403, 'admin');
    const month = /^\d{4}-\d{2}$/.test(url.searchParams.get('month') || '') ? url.searchParams.get('month') : todayStr().slice(0, 7);
    const [classes, teachers] = await Promise.all([doc('classes'), doc('teachers')]);
    const rows = [];
    for (const t of teachers) {
      const cl = classes.filter(c => c.teacherId === t.id); if (!cl.length) continue;
      const h = await teachingHours(cl, month); rows.push({ id: t.id, name: t.name, hours: h.hours, lessons: h.lessons, week: h.week, planned: h.planned });
    }
    if (profile.teacherId === 't-abdoulie') try { const { payroll } = await import('../lib/payroll.mjs'); const P = await payroll(month); for (const r of rows) { const x = P.teachers.find(y => y.teacherId === r.id); r.pay = x ? (x.own ? null : x.total) : 0; } } catch (e) { console.error('pay', e.message); }
    return json({ month, teaching: rows.sort((a, b) => b.hours - a.hours), admin: await teamAdmin(month) });
  }
  if (path === 'teach/lesson-change' && method === 'POST') {
    if (!isStaff(profile.role) || (profile.smm && profile.role !== 'admin')) return fail(403, 'staff');
    const b = await req.json().catch(() => ({}));
    const okD = d => /^\d{4}-\d{2}-\d{2}$/.test(d || ''), okT = t => /^\d{1,2}:\d{2}$/.test(t || ''), pad = t => t ? t.padStart(5, '0') : '';
    const note = String(b.note || '').replace(/\s+/g, ' ').trim().slice(0, 160), by = profile.name || '';
    const CH = await loadChanges();
    if (b.action === 'cover') {   // the admin chooses who teaches this one lesson ('' = the class's own teacher again)
      if (profile.role !== 'admin') return fail(403, 'admin');
      const { setCover, tellAdmins } = await import('../lib/cover.mjs');
      const teachers = await doc('teachers'), t = b.teacherId ? teachers.find(x => x.id === b.teacherId) : null; if (b.teacherId && !t) return fail(404, 'teacher');
      const l = await setCover(String(b.key || ''), t ? t.id : null, by); if (!l) return fail(404, 'lesson');
      const nm = id => (teachers.find(x => x.id === id) || {}).name || '';
      const day = `${l.date.slice(8)}.${l.date.slice(5, 7)} ${l.start}`;
      await tellAdmins(t ? `🔁 ${by} set a cover: ${t.name} teaches ${l.label}, ${day} instead of ${nm(l.coverFor)}.` : `↩ ${by} removed the cover: ${nm(l.teacherId)} teaches ${l.label}, ${day}.`, null, uid);
      if (t) { const links = await getLinks(); for (const [u, lk] of Object.entries(links)) { if (u.startsWith('sid:') || !lk.chatId) continue; const pp = u.startsWith('tid:') ? { teacherId: u.slice(4) } : await U().get(`u/${u}/profile`, { type: 'json' }).catch(() => null); if (pp && pp.teacherId === t.id) await tgSend(lk.chatId, `🔁 You are covering ${l.label}${l.room ? ' (' + l.room + ')' : ''}, ${day} (set by ${by}). I'll remind you before the lesson.`).catch(() => {}); } }
      return json({ ok: true, lesson: l });
    }
    if (b.action === 'extra') {
      const c = (await classesForTeacher(profile)).find(x => x.id === b.classId); if (!c) return fail(404, 'class');
      if (!okD(b.date) || !okT(b.start)) return fail(400, 'time');
      const x = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), classId: c.id, date: b.date, start: pad(b.start), end: okT(b.end) ? pad(b.end) : '', note, by, at: new Date().toISOString() };
      CH.extra.push(x); await saveChanges(CH);
      const told = b.notify === false ? null : await tellLesson(c, lang => LCH[lang].extra(c, x, note));
      return json({ ok: true, told });
    }
    const [cid, date] = String(b.key || '').split('|');
    const c = (await classesForTeacher(profile)).find(x => x.id === cid); if (!c || !okD(date)) return fail(404, 'lesson');
    const l = lessonsOn([c], date, CH).find(x => x.key === b.key); if (!l) return fail(404, 'lesson');
    const orig = l.kind === 'moved' ? l.from : l.key, [, od, os] = orig.split('|'), origL = { date: od, start: os };
    let told = null;
    if (l.date === todayStr() && (b.action === 'cancel' || b.action === 'move')) { const { tellSmm } = await import('../lib/daydigest.mjs'); await tellSmm(`${b.action === 'cancel' ? '❌ Cancelled today' : '↪ Moved'}: ${l.label} ${l.start}${b.action === 'move' && b.date ? ' → ' + b.date.slice(8) + '.' + b.date.slice(5, 7) + ' ' + b.start : ''}${note ? ' — ' + note : ''} (by ${by})`).catch(() => {}); }
    if (b.action === 'cancel') {
      if (l.kind === 'extra') CH.extra = CH.extra.filter(x => x.id !== l.extraId);
      else { delete CH.moves[orig]; CH.cancel[orig] = { note, by, at: new Date().toISOString() }; }
      await saveChanges(CH);
      if (b.notify !== false) told = await tellLesson(c, lang => LCH[lang].cancel(c, { date: l.date, start: l.start }, note));
    } else if (b.action === 'move') {
      if (!okD(b.date) || !okT(b.start)) return fail(400, 'time');
      const to = { date: b.date, start: pad(b.start), end: okT(b.end) ? pad(b.end) : (l.end || ''), note, by, at: new Date().toISOString() };
      if (l.kind === 'extra') { const x = CH.extra.find(y => y.id === l.extraId); Object.assign(x, { date: to.date, start: to.start, end: to.end }); }
      else if (to.date === od && to.start === os) { delete CH.moves[orig]; delete CH.cancel[orig]; }
      else { delete CH.cancel[orig]; CH.moves[orig] = to; }
      await saveChanges(CH);
      if (b.notify !== false) told = await tellLesson(c, lang => LCH[lang].move(c, { date: l.date, start: l.start }, to, note));
    } else if (b.action === 'restore') {
      delete CH.cancel[orig]; delete CH.moves[orig]; await saveChanges(CH);
      if (b.notify !== false) told = await tellLesson(c, lang => LCH[lang].back(c, origL));
    } else return fail(400, 'action');
    return json({ ok: true, told });
  }
  /* the director/manager: every lesson of a day, who checked in and when, registers taken; teachers' punctuality this month */
  if (path === 'admin/lessons' && method === 'GET') {
    if (profile.role !== 'admin') return fail(403, 'admin');
    const date = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('date') || '') ? url.searchParams.get('date') : todayStr();
    const [classes0, teachers, students] = await Promise.all([doc('classes'), doc('teachers'), doc('students')]);
    const classes = hidePrivate(classes0, profile);
    const now = new Date(), L = await loadLog(date.slice(0, 7)), cutoff = await checkSince(), CH = await loadChanges();
    const count = cid => students.filter(s => inClass(classes.find(c => c.id === cid), s) && s.status === 'active').length;
    const roster = cid => students.filter(s => inClass(classes.find(c => c.id === cid), s) && !/withdrawn|finished/i.test(s.status || '')).map(s => ({ sid: s.id, name: `${s.first} ${s.last}`.trim(), frozen: s.status === 'frozen' })).sort((a, b) => a.name.localeCompare(b.name));
    const lessons = withEntry(lessonsOn(classes, date, CH), L, now, cutoff).map(l => ({ ...l, teacher: (teachers.find(t => t.id === l.teacherId) || {}).name || '', coverForName: l.coverFor ? (teachers.find(t => t.id === l.coverFor) || {}).name || '' : '', size: count(l.classId), students: roster(l.classId) }));
    const month = await monthLessons(classes, date.slice(0, 7), now);
    return json({ date, now: now.toISOString(), grace: GRACE_MIN, since: cutoff, lessons, teachers: punctuality(month, teachers), missedList: month.filter(l => l.state === 'missed').map(l => ({ key: l.key, date: l.date, start: l.start, label: l.label, teacher: (teachers.find(t => t.id === l.teacherId) || {}).name || '' })).slice(-40).reverse() });
  }
  if (path === 'admin/lesson' && method === 'POST') {
    if (profile.role !== 'admin') return fail(403, 'admin');
    const b = await req.json().catch(() => ({}));
    const [cid, date] = String(b.key || '').split('|');
    const c = (await doc('classes')).find(x => x.id === cid); if (!c || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return fail(404, 'lesson');
    const lesson = lessonsOn([c], date, await loadChanges()).find(l => l.key === b.key); if (!lesson) return fail(404, 'lesson');
    if (b.set) return json({ entry: await correct(lesson, b, { uid, name: profile.name || '' }) });
    return json({ entry: await setCancelled(lesson, !!b.cancelled, b.note) });
  }
  /* ---- homework and test dates (teachers set them per class; the class is told at once) ---- */
  const hwc = path.match(/^teach\/homework\/([A-Za-z0-9-]+)$/);
  if (hwc && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    return json({ homework: forClasses(await loadHomework(), [hwc[1]], { past: 30 }) });
  }
  if (path === 'teach/homework' && method === 'POST') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const b = await req.json().catch(() => ({}));
    const c = (await classesForTeacher(profile)).find(x => x.id === b.classId); if (!c) return fail(404, 'class');
    const item = cleanHw(b, c, profile.name); if (!item) return fail(400, 'fields');
    await addHomework(item);
    const sent = await tellClass(c, item);
    return json({ item, sent, homework: forClasses(await loadHomework(), [c.id], { past: 30 }) });
  }
  // the teacher confirms one student's homework: done / part / not (or '' to clear)
  const hwk = path.match(/^teach\/homework\/([A-Za-z0-9-]+)\/check$/);
  if (hwk && method === 'POST') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const b = await req.json().catch(() => ({})), mine = (await classesForTeacher(profile)).map(c => c.id);
    if (!['done', 'part', 'not', ''].includes(b.s)) return fail(400, 's');
    const h = await setCheck(hwk[1], str(b.sid, 40), b.s, profile.name || 'Teacher', x => mine.includes(x.classId));
    return h ? json({ item: h }) : fail(404, 'missing');
  }
  // a student says they have done their homework; the teacher still has to confirm it
  const hwm = path.match(/^me\/homework\/([A-Za-z0-9-]+)\/done$/);
  if (hwm && method === 'POST') {
    if (!profile?.studentId) return fail(403, 'student');
    const s0 = (await doc('students')).find(x => x.id === profile.studentId), cls = (await doc('classes')).filter(c => inClass(c, s0)).map(c => c.id);
    const h = await setCheck(hwm[1], profile.studentId, 'claimed', '', x => cls.includes(x.classId) && x.kind === 'hw');
    return h ? json({ item: forStudent(h, profile.studentId) }) : fail(404, 'missing');
  }
  const hwd = path.match(/^teach\/homework\/([A-Za-z0-9-]+)$/);
  if (hwd && method === 'DELETE') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const mine = (await classesForTeacher(profile)).map(c => c.id);
    const ok = await removeHomework(hwd[1], h => mine.includes(h.classId));
    return ok ? json({ ok: true }) : fail(404, 'missing');
  }
  const tc = path.match(/^teach\/class\/([A-Za-z0-9-]+)$/);
  if (tc && method === 'GET') {
    if (!isStaff(profile.role)) return fail(403, 'staff');
    const c = (await classesForTeacher(profile)).find(x => x.id === tc[1]);
    if (!c) return fail(404, 'missing');
    const students = (await doc('students')).filter(s => inClass(c, s));
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
      mine = (await doc('classes')).filter(c => inClass(c, s));
    }
    else if (profile.track === 'private') mine = (await doc('classes')).filter(c => Array.isArray(c.uids) && c.uids.includes(user.id));
    // individual students who have no class of their own yet (no timetable given): one room each, so every
    // teacher (the director included) sees all their private students here
    if (isStaff(profile.role)) mine = mine.concat(await soloRooms(profile, mine));
    if (mine.some(c => !c.meet)) {
      const all = await doc('classes');
      for (const c of all) if (mine.some(m => m.id === c.id) && !c.meet) c.meet = roomName(c);
      await save('classes', all);
      mine = all.filter(c => mine.some(m => m.id === c.id));
    }
    // the catch-all "Individual (local / native teacher)" groups are not a class anyone teaches together: each student has a row
    mine = mine.filter(c => !(SOLO_RX.test(c.label || '') && /^individual\b/i.test(c.label || '') && !(c.studentIds || []).length && !(c.uids || []).length));
    mine.sort((a, b) => (/individual/i.test(a.label) - /individual/i.test(b.label)) || String(a.label).localeCompare(String(b.label)));
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
      const me = profile.teacherId === DIRECTOR_ID;   // the director's private students are his alone
      return json({ students, classes: hidePrivate(classes, profile), teachers, books, accounts: Object.entries(dir).filter(([, d]) => me || d.track !== 'private' || d.studentId).map(([id, d]) => ({ id, ...d })) });
    }
    if (path === 'admin/tasks' && method === 'GET') return json({ tasks: await openTasks() });
    if (path === 'admin/tasks/done' && method === 'POST') { await dismissTask(b.key); return json({ tasks: await openTasks() }); }
    /* ---- a staff member's page (teacher record + account): the director and the manager see and amend it ---- */
    const sp = path.match(/^admin\/staff\/([A-Za-z0-9-]+)$/);
    if (sp && (method === 'GET' || method === 'PUT')) {
      const id = sp[1], teachers = await doc('teachers'), dir = (await U().get('directory', { type: 'json' })) || {};
      let t = teachers.find(x => x.id === id) || null;
      let suid = t ? (t.uid || Object.keys(dir).find(u => dir[u].teacherId === t.id && isStaff(dir[u].role)) || null) : (dir[id] && isStaff(dir[id].role) ? id : null);
      if (!t && !suid) { const pp = await getProfile(id); if (pp && isStaff(pp.role)) suid = id; }
      let p2 = suid ? await getProfile(suid) : null;
      if (!t && p2?.teacherId) t = teachers.find(x => x.id === p2.teacherId) || null;
      if (!t && !p2) return fail(404, 'missing');
      if (method === 'PUT') {
        if (b.teacher && t) { for (const k of ['name', 'role', 'phone', 'email']) if (k in b.teacher) t[k] = str(b.teacher[k], 120); await save('teachers', teachers); }
        if (b.profile && p2) {
          for (const k of ['name', 'phone', 'city', 'birth', 'about']) if (k in b.profile) p2[k] = str(b.profile[k], k === 'about' ? 600 : 120);
          for (const k of ['education', 'experience', 'skillsHard', 'skillsSoft', 'hobbies']) if (k in b.profile) p2[k] = String(b.profile[k] == null ? '' : b.profile[k]).slice(0, 3000);
          await putProfile(suid, p2);
        }
      }
      const month = /^\d{4}-\d{2}$/.test(url.searchParams.get('month') || '') ? url.searchParams.get('month') : todayStr().slice(0, 7);
      const cls = t ? (await doc('classes')).filter(c => c.teacherId === t.id) : [];
      return json({ id, month, teacher: t, uid: suid,
        profile: p2 ? { name: p2.name, role: p2.role, email: p2.email || '', phone: p2.phone || '', city: p2.city || '', birth: p2.birth || '', about: p2.about || '', photo: p2.photo, education: p2.education || '', experience: p2.experience || '', skillsHard: p2.skillsHard || '', skillsSoft: p2.skillsSoft || '', hobbies: p2.hobbies || '' } : null,
        classes: cls.map(c => ({ id: c.id, label: c.label, schedule: c.schedule || '', room: c.room || '' })),
        teaching: cls.length ? await teachingHours(cls, month) : null,
        admin: suid ? await adminHours(suid, month) : null });
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
    // free accounts: approve as a school / individual student, mark paid, or decline the request
    if (path === 'admin/access' && method === 'POST') {
      const p = await getProfile(str(b.uid, 60)); if (!p) return fail(404, 'missing');
      if (b.action === 'staff') {   // approve a staff sign-up: teacher / SMM / reception → staff account; manager → administrator
        const pos = ['teacher', 'manager', 'smm', 'reception', 'other'].includes(b.position) ? b.position : (p.staffPos || 'other');
        p.role = pos === 'manager' ? 'admin' : 'teacher'; p.staffPos = pos; p.track = ''; p.manager = pos === 'manager'; p.smm = pos === 'smm';
        delete p.request; delete p.declined;
        if (b.teacherId) { const list = await doc('teachers'); list.forEach(t => { if (t.uid === b.uid) t.uid = null; }); const t = list.find(x => x.id === b.teacherId); if (t) { t.uid = b.uid; p.teacherId = t.id; } await save('teachers', list); }
        await putProfile(b.uid, p);
        await addNote(b.uid, { kind: 'access', text: `Welcome to the IF Academy team! Your staff account is ready (${{ teacher: 'teacher', manager: 'manager', smm: 'SMM', reception: 'reception', other: 'staff' }[pos]}).` }).catch(() => {});
        return json({ profile: p });
      }
      if (isStaff(p.role)) return fail(400, 'staff');
      if (b.action === 'approve') {
        delete p.declined; p.role = 'student'; p.track = TRACKS.includes(b.track) ? b.track : (p.request?.track && p.request.track !== 'outside' ? p.request.track : 'private');
        if (p.track === 'alumni') { p.alumni = true; p.alumniUntil = new Date(Date.now() + 365 * 864e5).toISOString(); }
        delete p.request; Object.assign(p, await linkByPhone(b.uid, p));
      } else if (b.action === 'paid') {
        const months = Math.max(1, Math.min(24, Math.round(+b.months || 1)));
        const from = paidActive(p) ? new Date(p.paidUntil) : new Date();
        from.setMonth(from.getMonth() + months);
        p.paidUntil = from.toISOString(); p.track = p.track || 'outside'; delete p.request;
        const amount = Math.round(+String(b.amount || '').replace(/[^\d.]/g, '') || 0) || (b.amount === '' || b.amount == null ? +((await membership())[p.track === 'tutor' ? 'teacherPlans' : 'plans'][months] || 0) : 0);
        if (amount > 0) {
          const fin = await finDoc(), today = new Date().toISOString().slice(0, 10);
          fin.push({ id: newId('f'), month: today.slice(0, 7), date: today, type: 'income', category: p.track === 'tutor' ? 'Teacher plan' : 'Online membership', amount, note: `${p.name} · ${months} month${months > 1 ? 's' : ''}`, source: `member:${b.uid}:${Date.now()}` });
          await S().setJSON('finance', fin);
        }
      } else if (b.action === 'stop') { p.paidUntil = null; p.trialUntil = new Date(0).toISOString(); p.declined = true; if (p.role === 'student') { p.role = 'guest'; p.track = p.track === 'private' || p.track === 'if' ? p.track : 'outside'; } }
      else if (b.action === 'decline') { delete p.request; p.declined = true; }
      else return fail(400, 'action');
      await putProfile(b.uid, p);
      return json({ profile: p });
    }
    if (path === 'admin/feedback' && method === 'GET') return json({ feedback: (await loadFeedback()).slice().sort((x, y) => (y.editedAt || y.at).localeCompare(x.editedAt || x.at)) });
    const fbk = path.match(/^admin\/feedback\/([a-z0-9]+)$/);
    if (fbk && method === 'POST') { const r = await decideFeedback(fbk[1], b, profile.name); return r ? json({ feedback: r }) : fail(404, 'missing'); }
    /* payment receipts sent to the Telegram bot */
    if (path === 'admin/receipts' && method === 'GET') return json({ receipts: (await listReceipts()).filter(r => !r.private || profile.teacherId === 't-abdoulie').slice(-120).reverse().map(({ chatId, msgId, ...r }) => r) });
    const rd = path.match(/^admin\/receipts\/([a-z0-9]+)$/);
    if (rd && method === 'POST') { const r = await decideReceipt(rd[1], !!b.ok, profile.name); return r ? json({ receipt: r }) : fail(404, 'missing'); }
    const rf = path.match(/^admin\/receipt-file\/([a-z0-9]+)$/);
    if (rf && method === 'GET') { const f = await receiptFile(rf[1]); if (!f) return fail(404, 'missing'); return new Response(f.data, { headers: { 'Content-Type': f.metadata?.type || 'application/octet-stream', 'Cache-Control': 'private, max-age=3600' } }); }
    if (path === 'admin/membership' && method === 'PUT') {
      const plans = {}; for (const k of [1, 3, 6, 12]) { const v = Math.round(+String(b.plans?.[k] ?? '').replace(/[^\d]/g, '')); if (v > 0) plans[k] = v; }
      const old = (await S().get('membership', { type: 'json' })) || {};
      let teacherPlans = old.teacherPlans; if (b.teacherPlans) { teacherPlans = {}; for (const k of [1, 3, 6, 12]) { const v = Math.round(+String(b.teacherPlans[k] ?? '').replace(/[^\d]/g, '')); if (v > 0) teacherPlans[k] = v; } }
      const m = { plans, ...(teacherPlans ? { teacherPlans } : {}), trialDays: Math.max(0, Math.min(30, Math.round(+b.trialDays || 0))), offer: str(b.offer, 200), price: str(b.price, 120), how: str(b.how, 800), free: str(b.free, 600), at: new Date().toISOString() };
      await S().setJSON('membership', m);
      return json({ membership: await membership() });
    }
    if (path === 'admin/link' && method === 'POST') {
      // manually link / unlink an account to a student or teacher record, or change role
      const p = await getProfile(str(b.uid, 60)); if (!p) return fail(404, 'missing');
      if ('role' in b && RANK[b.role]) p.role = b.role;
      if ('alumni' in b) p.alumni = !!b.alumni;
      if ('duty' in b) { p.manager = b.duty === 'manager'; p.smm = b.duty === 'smm'; if (p.smm && !isStaff(p.role)) p.role = 'teacher'; }
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
