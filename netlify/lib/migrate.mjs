// One-time data updates shipped with the site: each runs once (marked in store "school" → migrations), the first time
// the site handles a request after the deploy. Only record ids here, never names: this repository is public.
import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';

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

const MIGRATIONS = [['timetable-2026-11-14', () => applyTimetable(TT_2026_11_14)], ['timetable-2026-11-14-pending', () => applyPending(PENDING_2026_11_14), true], ['private-2026-11-15', () => grantPrivate(PRIVATE_2026_11_15)]];
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
