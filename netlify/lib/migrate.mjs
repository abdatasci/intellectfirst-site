// One-time data updates shipped with the site: each runs once (marked in store "school" → migrations), the first time
// the site handles a request after the deploy. Only record ids here, never names: this repository is public.
import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';
import seed from './school-seed.json';
import { loadChanges, saveChanges } from './bot-core.mjs';
import { lessonsOn, correct } from './lessons.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });

/* Timetable from the director, 14 Nov 2026.
   groups: [IF Admin group id, timetable, website teacher id]
   individual: [student id, IF Admin group, timetable, teacher id] → the student's own website class inside the group */
const TT_2026_11_14 = {
  groups: [
    ['a2', 'Mon, Wed 15:30-17:00', 't-aitach'],
    ['cpl', 'Tue, Thu 16:00-17:00', 't-aitach'],
    ['st2', 'Tue, Fri 15:00-16:00', 't-alina']
  ],
  individual: [
    ['s57', 'ind', 'Mon, Wed, Fri 17:00-18:00', 't-aitach'],
    ['smvxr827s', 'ind', 'Tue, Thu 17:00-18:00', 't-aitach'],
    ['smw3icgjc', 'ind', 'Tue, Thu 18:00-19:00', 't-olya'],
    ['s58', 'ind', 'Sat, Sun 13:00-14:30', 't-olya'],
    ['s62', 'ind', 'Mon 16:00-17:00, Wed 15:00-17:00', 't-alina'],
    ['s73', 'ind', 'Mon, Wed 17:00-18:00', 't-alina'],
    ['s56', 'ind', 'Wed, Fri 18:00-19:00', 't-alina']
  ]
};

/** Apply a timetable: IF Admin group timetables + website classes (teacher, timetable), and one website class per
    individual student. Returns lines describing what changed. Also used by the IF Admin assistant. */
export async function applyTimetable(tt) {
  const W = S(), lines = [];
  const groups = (await A().get('c/groups', { type: 'json' })) || {}, students = (await A().get('c/students', { type: 'json' })) || {};
  const classes = (await W.get('classes', { type: 'json' })) || [];
  let gDirty = false;
  const upsert = (id, set) => { let c = classes.find(x => x.id === id); if (!c) { c = { id, label: set.label || id, room: '' }; classes.push(c); } Object.assign(c, set); return c; };
  for (const [gid, sch, tid] of tt.groups || []) {
    if (!groups[gid]) { lines.push(`skip group ${gid}: not in IF Admin`); continue; }
    if (groups[gid].sch !== sch) { groups[gid].sch = sch; gDirty = true; }
    upsert('c-' + gid, { label: groups[gid].n || gid, teacherId: tid, schedule: sch });
    lines.push(`group ${gid}: ${sch} · ${tid}`);
  }
  for (const [sid, gid0, sch, tid, room] of tt.individual || []) {
    const st = students[sid]; if (!st) { lines.push(`skip student ${sid}: not in IF Admin`); continue; }
    const gs = [...new Set([...(Array.isArray(st.gs) ? st.gs : []), st.g].filter(Boolean))];
    const gid = gs.includes(gid0) ? gid0 : gs[0] || gid0;
    upsert('c-' + gid + '-' + sid, { label: `${st.n} (individual)`, group: gid, studentIds: [sid], teacherId: tid, schedule: sch, ...(room ? { room } : {}) });
    lines.push(`student ${sid}: ${sch} · ${tid}`);
  }
  await W.setJSON('classes', classes);
  if (gDirty) {
    await A().setJSON('c/groups', groups);
    const st = (await A().get('stamp', { type: 'json' })) || {}; st.groups = Date.now(); await A().setJSON('stamp', st);
  }
  return lines;
}

/* Students not yet in IF Admin when the timetable came: matched later by a fingerprint of the first name (sha-256, first
   16 hex characters of the lower-case name) so no name is stored here. Applied as soon as the student's record exists. */
const PENDING_2026_11_14 = [['c18e7785082767a5', 'ind', 'Mon, Wed, Fri 10:00-11:00', 't-olya']];
const fp = n => createHash('sha256').update(String(n || '').trim().split(/\s+/)[0].toLowerCase()).digest('hex').slice(0, 16);
async function applyPending(list) {
  const students = (await A().get('c/students', { type: 'json' })) || {}, found = [];
  for (const [h, gid, sch, tid] of list) {
    const sid = Object.keys(students).find(k => students[k].st !== 'left' && fp(students[k].n) === h);
    if (sid) found.push([sid, gid, sch, tid]);
  }
  if (found.length < list.length) return null;   // not every student is in IF Admin yet: try again later
  return applyTimetable({ individual: found });
}

/* Free full access for named individual students (the director's private students). Only fingerprints of the full
   name are kept here (sha-256 of the lower-case name, Latin and Cyrillic spellings, either order), never the name.
   Waits until the student has a website account, then makes it a student account (track "private"). */
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const fpFull = n => createHash('sha256').update(String(n || '').toLowerCase().replace(/[^a-zа-яёәіңғүұқөһ\s-]/gi, ' ').replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 16);
const PRIVATE_2026_11_15 = ['466004361b64c14b', 'db9483a7e998d9de', 'ff6438ddc0028d2e', 'a6f2dae16d7ba6cd', '83b09e3cb229b656', 'e00fe6600ad2002f', '35440d93b3f5e70f'];
async function grantPrivate(hashes) {
  const dir = (await U().get('directory', { type: 'json' })) || {}, set = new Set(hashes), out = [];
  for (const [uid, d] of Object.entries(dir)) {
    if (!set.has(fpFull(d.name))) continue;
    const p = await U().get(`u/${uid}/profile`, { type: 'json' }); if (!p || p.role === 'teacher' || p.role === 'admin') continue;
    if (p.role !== 'student') { p.role = 'student'; p.track = 'private'; delete p.request; await U().setJSON(`u/${uid}/profile`, p); }
    dir[uid] = { ...d, role: 'student', track: p.track, request: null };
    out.push(`account ${uid} → student (individual)`);
  }
  if (!out.length) return null;   // not registered yet: try again later
  await U().setJSON('directory', dir);
  return out;
}

/* 15 Nov 2026: C1 Teens moves to Saturdays and Sundays 13:00–14:30; today's PET lesson (Sun 15 Nov, 13:00) is cancelled. */
async function schedule20261115() {
  const lines = await applyTimetable({ groups: [['b2t', 'Sat, Sun 13:00-14:30', 't-abdoulie']] });
  const W = S(), classes = (await W.get('classes', { type: 'json' })) || [];
  const c = classes.find(x => x.id === 'c-b2t');
  if (c && c.schedule !== 'Sat, Sun 13:00-14:30') { c.schedule = 'Sat, Sun 13:00-14:30'; await W.setJSON('classes', classes); lines.push('class c-b2t: Sat, Sun 13:00-14:30'); }
  const ch = (await W.get('lessonchanges', { type: 'json' })) || {};
  ch.cancel = ch.cancel || {};
  ch.cancel['c-pet|2026-11-15|13:00'] = { note: 'PET group cancelled today', by: 'Abdoulie Manneh', at: new Date().toISOString() };
  await W.setJSON('lessonchanges', ch);
  lines.push('cancelled c-pet 2026-11-15 13:00');
  return lines;
}

/* 15 Nov 2026: the director taught C1 Teen on time but pressed clock-in late: record it as on time (register kept). */
async function onTime20261115() {
  const W = S(), L = (await W.get('lessonlog/2026-11', { type: 'json' })) || {}, k = 'c-b2t|2026-11-15|13:00', e = L[k];
  if (!e || !e.checkIn) return null;   // not clocked in yet: try again later
  e.checkIn = '2026-11-15T08:00:00.000Z'; e.lateMin = 0;
  e.note = 'On time: clock-in pressed later (corrected by the director)'; e.correctedAt = new Date().toISOString(); e.correctedBy = 'Abdoulie Manneh';
  await W.setJSON('lessonlog/2026-11', L);
  return ['C1 Teen 15 Nov 13:00 → checked in on time'];
}

/* Teacher phone numbers kept out of the public code: Netlify environment variable IF_TEACHER_PHONES = "t-id=+7…,t-id2=+7…".
   Copied into the teacher records (Admin → Teachers) so teachers can connect to the Telegram bot with their number. */
async function teacherPhones() {
  const pairs = String(process.env.IF_TEACHER_PHONES || '').split(',').map(x => x.split('=').map(y => y.trim())).filter(x => x[0] && x[1]);
  if (!pairs.length) return null;
  const W = S(), T = (await W.get('teachers', { type: 'json' })) || structuredClone(seed.teachers || []);
  const lines = [];
  for (const [id, phone] of pairs) { const t = T.find(x => x.id === id); if (t && t.phone !== phone) { t.phone = phone; lines.push(id + ': phone added'); } }
  if (lines.length) await W.setJSON('teachers', T);
  return lines.length ? lines : ['no change'];
}

/* 16 Nov 2026: Alina covered Olya's individual lesson 10:00-11:00 and clocked in on time (recorded by the director).
   The student is found by a fingerprint of the first name (any spelling the records use). */
const COVER_16 = new Set(['c18e7785082767a5', 'd1a96b5b937e26ca', '305aade803000fae', 'ed480e95b54016b8']);
async function cover20261116() {
  const date = '2026-11-16', W = S(), classes = (await W.get('classes', { type: 'json' })) || [];
  let cand = classes.filter(c => COVER_16.has(fp(c.label)));
  if (!cand.length) { const st = (await A().get('c/students', { type: 'json' })) || {}; const sids = Object.keys(st).filter(k => COVER_16.has(fp(st[k].n))); cand = classes.filter(c => (c.studentIds || []).some(x => sids.includes(x))); }
  const c = cand.find(x => x.teacherId === 't-olya') || cand[0];
  if (!c) return null;   // class not found yet: try again later
  let l = lessonsOn([c], date, await loadChanges()).find(x => x.start === '10:00' && !x.cancelled && !x.movedTo);
  if (!l) { const CH = await loadChanges(); CH.extra.push({ id: 'cov16', classId: c.id, date, start: '10:00', end: '11:00', note: 'Cover lesson', by: 'Abdoulie Manneh' }); await saveChanges(CH); l = lessonsOn([c], date, await loadChanges()).find(x => x.start === '10:00'); }
  if (!l) return null;
  const CH = await loadChanges(); CH.cover[l.key] = { teacherId: 't-alina', by: 'Abdoulie Manneh', at: new Date().toISOString() }; await saveChanges(CH);
  l = lessonsOn([c], date, CH).find(x => x.key === l.key);
  const e = await correct(l, { set: 'on', note: 'Alina covered for Olya — clocked in on time (recorded by the director)' }, { uid: 'director', name: 'Abdoulie Manneh' });
  e.by = { uid: 'tid:t-alina', name: 'Alina Afanasyeva' }; e.teacherId = 't-alina';
  const month = date.slice(0, 7), L = (await W.get('lessonlog/' + month, { type: 'json' })) || {}; L[l.key] = e; await W.setJSON('lessonlog/' + month, L);
  return [`${c.id} 16 Nov 10:00 → covered by t-alina for t-olya, clocked in on time`];
}

const MIGRATIONS = [['timetable-2026-11-14', () => applyTimetable(TT_2026_11_14)], ['timetable-2026-11-14-pending', () => applyPending(PENDING_2026_11_14), true], ['private-2026-11-15', () => grantPrivate(PRIVATE_2026_11_15)], ['schedule-2026-11-15', schedule20261115], ['ontime-2026-11-15', onTime20261115], ['teacher-phones-2026-11-15', teacherPhones], ['cover-2026-11-16', cover20261116]];
let running = null;
/** Run any migration that has not run yet. Safe to call on every request (cached per instance). */
let checkedAt = 0;
export function migrate() {
  if (running && Date.now() - checkedAt > 5 * 60000) running = null;   // look again every few minutes for waiting updates
  checkedAt = checkedAt || Date.now();
  return running || (running = (async () => {
    checkedAt = Date.now();
    try {
      const done = (await S().get('migrations', { type: 'json' })) || {};
      for (const [id, fn] of MIGRATIONS) {
        if (done[id]) continue;
        if (!Object.keys((await A().get('c/students', { type: 'json' })) || {}).length) continue;   // IF Admin not loaded yet
        const lines = await fn();
        if (!lines) continue;   // waiting for data (e.g. a student not added yet)
        done[id] = { at: new Date().toISOString(), lines: lines.slice(0, 40) };
        await S().setJSON('migrations', done);
        console.log('migration', id, lines.join(' | '));
      }
    } catch (e) { console.error('migration', e.message); running = null; }
  })());
}
