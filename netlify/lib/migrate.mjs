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
/* 17 Nov 2026: Alina's lessons from 29 Oct to 17 Nov, as listed by the director: [date, start, minutes].
   Lessons already clocked in (website or bot) are left as they are and never counted twice; a listed lesson that is on
   her timetable is recorded as taught; one that is not on it is added as a recorded lesson; her timetabled lessons in
   this range that are not listed did not take place. Only dates and times here, never names: this repository is public. */
const ALINA_REC = {
  teacher: 't-alina', from: '2026-10-29', to: '2026-11-17',
  lessons: [['2026-11-02', '17:00', 60], ['2026-11-03', '15:00', 60], ['2026-11-04', '17:00', 60], ['2026-11-04', '18:00', 60], ['2026-11-06', '15:00', 60], ['2026-11-06', '18:00', 60],
    ['2026-11-07', '13:00', 90], ['2026-11-08', '12:00', 90], ['2026-11-09', '16:00', 60], ['2026-11-09', '17:00', 60], ['2026-11-10', '15:00', 60], ['2026-11-10', '18:00', 60],
    ['2026-11-11', '15:00', 90], ['2026-11-11', '17:00', 60], ['2026-11-11', '18:00', 60], ['2026-11-13', '15:00', 60], ['2026-11-13', '18:00', 60],
    ['2026-11-16', '10:00', 60], ['2026-11-16', '16:00', 60], ['2026-11-16', '17:00', 60], ['2026-11-17', '15:00', 60], ['2026-11-17', '16:00', 60]],
  extra: [{ id: 'trial-20261104-alina', date: '2026-11-04', start: '14:00', end: '15:00', label: 'Trial lesson (new student)', min: 60, factor: 0.5, note: 'Trial lesson: half pay' }]
};
async function recordByTime(R) {
  const W = S(), classes = (await W.get('classes', { type: 'json' })) || [];
  if (!classes.some(c => c.teacherId === R.teacher)) return null;   // her classes are not there yet: try again later
  const CH = await loadChanges(), logs = {}, lines = [], who = { uid: 'director', name: 'Abdoulie Manneh' }, now = new Date().toISOString();
  const log = async mo => logs[mo] || (logs[mo] = (await W.get('lessonlog/' + mo, { type: 'json' })) || {});
  const hm = t => { const [h, m] = String(t).split(':').map(Number); return h * 60 + m; }, pad = t => String(t).padStart(5, '0');
  const X = (await W.get('payextra', { type: 'json' })) || [];
  for (let t = Date.parse(R.from + 'T00:00:00Z'); t <= Date.parse(R.to + 'T00:00:00Z'); t += 864e5) {
    const date = new Date(t).toISOString().slice(0, 10), L = await log(date.slice(0, 7));
    const hers = lessonsOn(classes, date, CH).filter(l => l.teacherId === R.teacher && !l.movedTo), recs = R.lessons.filter(x => x[0] === date);
    const done = l => !!(L[l.key] && L[l.key].checkIn && !L[l.key].cancelled), pair = new Map(), usedL = new Set();
    const take = (r, l) => { pair.set(r, l); usedL.add(l); };
    for (const r of recs) { const l = hers.find(x => !usedL.has(x) && !x.cancelled && pad(x.start) === pad(r[1])); if (l) take(r, l); }   // same start time
    for (const r of recs) {   // a different start time: first a lesson she clocked in for that day, then a timetabled one within an hour
      if (pair.has(r)) continue;
      const near = f => hers.filter(x => !usedL.has(x) && f(x)).sort((a, b) => Math.abs(hm(a.start) - hm(r[1])) - Math.abs(hm(b.start) - hm(r[1])))[0];
      const l = near(done) || near(x => !x.cancelled && Math.abs(hm(x.start) - hm(r[1])) <= 60); if (l) take(r, l);
    }
    for (const r of recs) {
      const l = pair.get(r), min = r[2];
      if (!l) {   // not on her timetable: a recorded lesson, paid by its length
        const id = 'rec-' + R.teacher + '-' + date + '-' + pad(r[1]);
        if (!X.some(y => y.id === id)) { X.push({ id, teacherId: R.teacher, date, start: pad(r[1]), end: new Date(Date.parse('2000-01-01T' + pad(r[1]) + ':00Z') + min * 60000).toISOString().slice(11, 16), label: 'Lesson (recorded by the director)', min, note: 'Recorded by the director' }); lines.push(`${date} ${r[1]}: recorded lesson (${min} min)`); }
        continue;
      }
      const tt = Math.round((Date.parse(l.endAt) - Date.parse(l.at)) / 60000);
      const e = L[l.key] || (L[l.key] = { classId: l.classId, label: l.label, date: l.date, start: l.start, end: l.end, teacherId: R.teacher });
      if (min !== tt) e.min = min; else delete e.min;
      if (done(l)) { lines.push(`${l.key}: already clocked in, kept`); continue; }
      e.cancelled = false; delete e.cancelReason; e.checkIn = new Date(l.at).toISOString(); e.lateMin = 0; e.by = { uid: who.uid, name: who.name + ' (recorded)' };
      e.note = 'Taught (recorded by the director)'; e.correctedAt = now; e.correctedBy = who.name; lines.push(`${l.key}: taught (${min} min)`);
    }
    for (const l of hers) {   // her timetabled lessons that are not in the list
      if (usedL.has(l)) continue;
      if (done(l)) { lines.push(`${l.key}: clocked in but not in the list, kept`); continue; }
      if (l.cancelled || Date.parse(l.endAt) > Date.now()) continue;
      const e = L[l.key] || (L[l.key] = { classId: l.classId, label: l.label, date: l.date, start: l.start, end: l.end, teacherId: R.teacher });
      delete e.checkIn; e.cancelled = true; e.cancelReason = 'notheld'; e.note = 'No lesson (recorded by the director)'; e.correctedAt = now; e.correctedBy = who.name; lines.push(`${l.key}: not held`);
    }
  }
  for (const [mo, L] of Object.entries(logs)) await W.setJSON('lessonlog/' + mo, L);
  for (const x of R.extra || []) if (!X.some(y => y.id === x.id)) { X.push({ ...x, teacherId: R.teacher }); lines.push(`${x.date}: ${x.label}`); }
  await W.setJSON('payextra', X);
  return lines.length ? lines : ['no change'];
}
/* 17 Nov 2026: Olya's lessons from 29 Oct to 17 Nov, as listed by the director: [date, student, start or '', minutes (0 = the timetable length), kind].
   The student is a fingerprint set of the first name (any spelling the records use), never the name. kind: 'taught',
   'late' (late cancellation by the student) or 'cancel' (cancelled on time: not a lesson). Lessons already clocked in are
   left as they are; her timetabled lessons in this range that are not listed did not take place. Trials are half pay. */
const OLYA_FP = {"z": ["0e068ab927c1e2f5", "b8818afbe9588a9c", "278c24710cc41be0"], "am": ["f487dfce9b263194", "4cbca9afaf757285"], "al": ["c18e7785082767a5", "d1a96b5b937e26ca", "305aade803000fae"], "l": ["2c7e9f6370f03f6a", "b42051cc352c6984", "364f5f054561aee5", "1adfaf57cbf9d804", "d84fe7e07bedb227"], "k": ["e1d691baa981809f", "84beee45720853fe", "cbc1971c55732f0f", "e9fcd40e52869db5"]};
const OLYA_REC = {
  teacher: 't-olya', from: '2026-10-29', to: '2026-11-17',
  lessons: [['2026-11-04', 'am', '', 0, 'taught'], ['2026-11-05', 'z', '18:00', 0, 'taught'], ['2026-11-10', 'z', '', 0, 'taught'], ['2026-11-10', 'k', '', 0, 'cancel'],
    ['2026-11-11', 'al', '', 0, 'taught'], ['2026-11-12', 'z', '', 0, 'taught'], ['2026-11-13', 'al', '', 0, 'taught'], ['2026-11-14', 'l', '', 0, 'taught'],
    ['2026-11-15', 'l', '', 0, 'late'], ['2026-11-17', 'z', '', 0, 'taught']],
  extra: [{ id: 'trial-20261103-olya', date: '2026-11-03', start: '18:00', end: '19:00', label: 'Trial lesson (new student)', min: 60, factor: 0.5, note: 'Trial lesson: half pay' },
    { id: 'trial-20261106-olya', date: '2026-11-06', start: '15:00', end: '16:00', label: 'Trial lesson (new student)', min: 60, factor: 0.5, note: 'Trial lesson: half pay' }]
};
async function recordByStudent(R, FP) {
  const W = S(), classes = (await W.get('classes', { type: 'json' })) || [], st = (await A().get('c/students', { type: 'json' })) || {};
  if (!classes.some(c => c.teacherId === R.teacher)) return null;   // her classes are not there yet: try again later
  const CH = await loadChanges(), logs = {}, lines = [], who = { uid: 'director', name: 'Abdoulie Manneh' }, now = new Date().toISOString();
  const log = async mo => logs[mo] || (logs[mo] = (await W.get('lessonlog/' + mo, { type: 'json' })) || {});
  const pad = t => String(t).padStart(5, '0'), X = (await W.get('payextra', { type: 'json' })) || [];
  const isOf = (c, k) => { const set = new Set(FP[k] || []); return set.has(fp(c.label)) || (c.studentIds || []).some(id => st[id] && set.has(fp(st[id].n))); };
  const entry = (L, l) => L[l.key] || (L[l.key] = { classId: l.classId, label: l.label, date: l.date, start: l.start, end: l.end, teacherId: R.teacher });
  for (let t = Date.parse(R.from + 'T00:00:00Z'); t <= Date.parse(R.to + 'T00:00:00Z'); t += 864e5) {
    const date = new Date(t).toISOString().slice(0, 10), L = await log(date.slice(0, 7));
    const hers = lessonsOn(classes, date, CH).filter(l => l.teacherId === R.teacher && !l.movedTo), recs = R.lessons.filter(x => x[0] === date), used = new Set();
    const done = l => !!(L[l.key] && L[l.key].checkIn && !L[l.key].cancelled);
    for (const r of recs) {
      const [, k, start, min, kind] = r, free = hers.filter(l => !used.has(l) && !(l.cancelled && kind === 'taught'));
      // the student's own lesson that day (at the stated time if one was given); failing that, when only one of her lessons is left that day, that one
      const own = free.filter(l => isOf(classes.find(c => c.id === l.classId) || {}, k));
      const l = own.find(x => start && pad(x.start) === pad(start)) || own[0] || (kind === 'taught' && start && free.find(x => pad(x.start) === pad(start))) || (kind === 'taught' && free.length === 1 ? free[0] : null);
      if (!l) {
        if (kind !== 'taught') { lines.push(`${date} ${k}: ${kind}, no timetabled lesson found`); continue; }
        const id = 'rec-' + R.teacher + '-' + date + '-' + k + (start ? '-' + pad(start) : '');
        if (!X.some(y => y.id === id)) { X.push({ id, teacherId: R.teacher, date, start: start ? pad(start) : '', end: '', label: 'Lesson (recorded by the director)', min: min || 60, note: 'Recorded by the director' }); lines.push(`${date} ${k}: recorded lesson (${min || 60} min)`); }
        continue;
      }
      used.add(l);
      const e = entry(L, l), tt = Math.round((Date.parse(l.endAt) - Date.parse(l.at)) / 60000);
      if (kind === 'taught') {
        if (min && min !== tt) e.min = min;   // 0 = the timetable length
        if (done(l)) { lines.push(`${l.key}: already clocked in, kept`); continue; }
        e.cancelled = false; delete e.cancelReason; e.checkIn = new Date(l.at).toISOString(); e.lateMin = 0; e.by = { uid: who.uid, name: who.name + ' (recorded)' };
        e.note = 'Taught (recorded by the director)'; e.correctedAt = now; e.correctedBy = who.name; lines.push(`${l.key}: taught (${min || tt} min)`);
      } else if (done(l)) { lines.push(`${l.key}: clocked in, kept (listed as ${kind})`); }
      else if (kind === 'late') {
        if (!CH.cancel[l.key]) CH.cancel[l.key] = { note: 'Late cancellation by the student (less than 8 hours) — charged (UA)', by: who.name, at: now, reason: 'slate', noMakeup: true, lateCancel: true };
        delete e.checkIn; e.cancelled = true; e.cancelReason = 'slate'; e.note = 'Late cancellation (recorded by the director)'; e.correctedAt = now; e.correctedBy = who.name; lines.push(`${l.key}: late cancellation`);
      } else {
        if (!CH.cancel[l.key]) CH.cancel[l.key] = { note: 'Cancelled (recorded by the director)', by: who.name, at: now };
        delete e.checkIn; e.cancelled = true; e.cancelReason = 'cancelled'; e.note = 'Cancelled on time (recorded by the director)'; e.correctedAt = now; e.correctedBy = who.name; lines.push(`${l.key}: cancelled on time`);
      }
    }
    for (const l of hers) {   // her timetabled lessons that are not in the list
      if (used.has(l)) continue;
      if (done(l)) { lines.push(`${l.key}: clocked in but not in the list, kept`); continue; }
      if (l.cancelled || Date.parse(l.endAt) > Date.now()) continue;
      const e = entry(L, l); delete e.checkIn; e.cancelled = true; e.cancelReason = 'notheld'; e.note = 'No lesson (recorded by the director)'; e.correctedAt = now; e.correctedBy = who.name; lines.push(`${l.key}: not held`);
    }
  }
  await saveChanges(CH);
  for (const [mo, L] of Object.entries(logs)) await W.setJSON('lessonlog/' + mo, L);
  for (const x of R.extra || []) if (!X.some(y => y.id === x.id)) { X.push({ ...x, teacherId: R.teacher }); lines.push(`${x.date}: ${x.label}`); }
  await W.setJSON('payextra', X);
  return lines.length ? lines : ['no change'];
}
const MIGRATIONS = [['timetable-2026-11-14', () => applyTimetable(TT_2026_11_14)], ['timetable-2026-11-14-pending', () => applyPending(PENDING_2026_11_14), true], ['private-2026-11-15', () => grantPrivate(PRIVATE_2026_11_15)], ['schedule-2026-11-15', schedule20261115], ['ontime-2026-11-15', onTime20261115], ['teacher-phones-2026-11-15', teacherPhones], ['cover-2026-11-16', cover20261116], ['smm-2026-11-16', smm20261116], ['aitach-record-2026-11-16', () => recordLessons(AITACH_REC)], ['alina-record-2026-11-17', () => recordByTime(ALINA_REC)], ['olya-record-2026-11-17', () => recordByStudent(OLYA_REC, OLYA_FP)]];
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
