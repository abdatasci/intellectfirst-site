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

/* 16 Nov 2026: the new SMM's account (registered as "learning on my own") → staff account with the SMM duty.
   Found by a fingerprint of the phone number (last 10 digits); then she gets the SMM menu in the Telegram bot. */
async function smm20261116() {
  const U = getStore({ name: 'ielts', consistency: 'strong' }), dir = (await U.get('directory', { type: 'json' })) || {};
  const fpPhone = ph => createHash('sha256').update(String(ph || '').replace(/\D/g, '').slice(-10)).digest('hex').slice(0, 16);
  const uid = Object.keys(dir).find(u => fpPhone(dir[u].phone) === '6da1e5f76a61388e');
  if (!uid) return null;   // not registered yet: try again later
  const p = (await U.get(`u/${uid}/profile`, { type: 'json' })) || null; if (!p) return null;
  p.role = p.role === 'admin' ? 'admin' : 'teacher'; p.smm = true; p.staffPos = 'smm'; p.track = ''; delete p.request; delete p.declined;
  await U.setJSON(`u/${uid}/profile`, p);
  dir[uid] = { ...dir[uid], role: p.role, duty: 'smm', staffPos: 'smm', track: '', request: null }; await U.setJSON('directory', dir);
  try { const links = (await S().get('bot/links', { type: 'json' })) || {}, l = links[uid]; if (l && l.chatId) { const { ensureStaffKb } = await import('./teachbot.mjs'); await ensureStaffKb(l.chatId, p, true); } } catch (e) { console.error('smm menu', e.message); }
  return [uid + ' → SMM staff account'];
}

/* 16 Nov 2026: Aitach's lessons from 28 Oct to 13 Nov, recorded by the director (before clock-in was used).
   [date, class ('a2' | 'cpl' | IF Admin student id of an individual student), 'late' = late cancellation | minutes].
   Timetabled lessons of hers in this range that are not listed did not take place. Pay period: 28th to 27th. */
const AITACH_REC = {
  teacher: 't-aitach', from: '2026-10-28', to: '2026-11-13',
  lessons: [['2026-10-28', 'a2'], ['2026-10-28', 's57'], ['2026-10-29', 'cpl'], ['2026-10-29', 'smvxr827s'], ['2026-10-30', 's57'],
    ['2026-11-02', 'a2'], ['2026-11-02', 's57'], ['2026-11-03', 'cpl'], ['2026-11-05', 'cpl'], ['2026-11-05', 'smvxr827s'], ['2026-11-06', 's57'],
    ['2026-11-09', 'a2'], ['2026-11-09', 's57', 'late'], ['2026-11-10', 'cpl'], ['2026-11-11', 's57'], ['2026-11-12', 'cpl'], ['2026-11-12', 'smvxr827s'],
    ['2026-11-13', 'a2', 60, 'One student came: 60 minutes'], ['2026-11-13', 's57']],
  extra: [{ id: 'trial-20261030', date: '2026-10-30', label: 'Trial lesson (new student)', min: 60, factor: 0.5, note: 'Trial lesson: half pay' }]
};
async function recordLessons(R) {
  const W = S(), classes = (await W.get('classes', { type: 'json' })) || [];
  const cls = k => classes.find(c => c.id === 'c-' + k) || classes.find(c => (c.studentIds || []).includes(k) && c.teacherId === R.teacher);
  const mine = classes.filter(c => c.teacherId === R.teacher);
  if (R.lessons.some(([, k]) => !cls(k))) return null;   // a class is missing: try again later
  const CH = await loadChanges(), logs = {}, lines = [], who = { uid: 'director', name: 'Abdoulie Manneh' }, now = new Date().toISOString();
  const log = async mo => logs[mo] || (logs[mo] = (await W.get('lessonlog/' + mo, { type: 'json' })) || {});
  const entry = (L, l) => L[l.key] || (L[l.key] = { classId: l.classId, label: l.label, date: l.date, start: l.start, end: l.end, teacherId: R.teacher });
  for (let t = Date.parse(R.from + 'T00:00:00Z'); t <= Date.parse(R.to + 'T00:00:00Z'); t += 864e5) {
    const date = new Date(t).toISOString().slice(0, 10), L = await log(date.slice(0, 7));
    const recs = R.lessons.filter(x => x[0] === date), used = new Set();
    for (const l of lessonsOn(mine, date, CH)) {
      if (l.movedTo) continue;
      const r = recs.find(x => cls(x[1]).id === l.classId && !used.has(x));
      const e = entry(L, l); e.correctedAt = now; e.correctedBy = who.name;
      if (!r) { delete e.checkIn; e.cancelled = true; e.cancelReason = 'notheld'; e.note = 'No lesson (recorded by the director)'; lines.push(`${l.key}: not held`); continue; }
      used.add(r);
      if (r[2] === 'late') {
        CH.cancel[l.key] = { note: 'Late cancellation by the student (less than 8 hours) — charged (UA)', by: who.name, at: now, reason: 'slate', noMakeup: true, lateCancel: true };
        delete e.checkIn; e.cancelled = true; e.cancelReason = 'slate'; e.note = 'Late cancellation (recorded by the director)'; lines.push(`${l.key}: late cancellation`);
      } else { e.cancelled = false; e.checkIn = new Date(l.at).toISOString(); e.lateMin = 0; e.by = { uid: who.uid, name: who.name + ' (recorded)' }; e.note = r[3] || 'Taught (recorded by the director)'; lines.push(`${l.key}: taught`); }
    }
    // listed lessons that are not on the timetable that day: an extra lesson, taught
    for (const r of recs.filter(x => !used.has(x))) {
      const c = cls(r[1]), s0 = ((c.schedule || '').match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/) || [, '15:00', '16:00']);
      const min = typeof r[2] === 'number' ? r[2] : Math.round((Date.parse('2000-01-01T' + s0[2].padStart(5, '0') + ':00Z') - Date.parse('2000-01-01T' + s0[1].padStart(5, '0') + ':00Z')) / 60000) || 60;
      const start = s0[1].padStart(5, '0'), endT = new Date(Date.parse('2000-01-01T' + start + ':00Z') + min * 60000).toISOString().slice(11, 16);
      const id = 'rec' + date.replace(/-/g, '') + c.id.replace(/[^a-z0-9]/gi, '');
      if (!CH.extra.some(x => x.id === id)) CH.extra.push({ id, classId: c.id, date, start, end: endT, note: r[3] || 'Recorded by the director', by: who.name });
      const l = lessonsOn([c], date, CH).find(x => x.extraId === id); if (!l) continue;
      const e = entry(L, l); e.checkIn = new Date(l.at).toISOString(); e.lateMin = 0; e.by = { uid: who.uid, name: who.name + ' (recorded)' }; e.note = r[3] || 'Taught (recorded by the director)'; e.correctedAt = now;
      lines.push(`${l.key}: extra lesson, taught (${min} min)`);
    }
  }
  await saveChanges(CH);
  for (const [mo, L] of Object.entries(logs)) await W.setJSON('lessonlog/' + mo, L);
  const X = (await W.get('payextra', { type: 'json' })) || [];
  for (const x of R.extra || []) if (!X.some(y => y.id === x.id)) { X.push({ ...x, teacherId: R.teacher }); lines.push(`${x.date}: ${x.label}`); }
  await W.setJSON('payextra', X);
  return lines;
}
const MIGRATIONS = [['timetable-2026-11-14', () => applyTimetable(TT_2026_11_14)], ['timetable-2026-11-14-pending', () => applyPending(PENDING_2026_11_14), true], ['private-2026-11-15', () => grantPrivate(PRIVATE_2026_11_15)], ['schedule-2026-11-15', schedule20261115], ['ontime-2026-11-15', onTime20261115], ['teacher-phones-2026-11-15', teacherPhones], ['cover-2026-11-16', cover20261116], ['smm-2026-11-16', smm20261116], ['aitach-record-2026-11-16', () => recordLessons(AITACH_REC)]];
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
