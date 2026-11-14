// Lesson check-in and registers.
// A teacher checks in on the website at the start of each lesson (from 30 minutes before the start until the end);
// the time is kept, and a check-in more than GRACE_MIN minutes after the start counts as late. Only after checking in
// can the teacher take the register: on time / late (+ minutes) / absent / excused. The register is written to IF Admin
// attendance (on time and late = P, absent = UA, excused = EA); lateness is kept here because IF Admin has no "late" mark.
//   store "school": lessonlog/<YYYY-MM> → { "<classId>|<date>|<HH:MM>": entry }
//   entry: { classId, label, date, start, end, teacherId, checkIn, lateMin, by:{uid,name}, marks:{sid:'on'|'late'|'abs'|'exc'},
//            lateBy:{sid:min}, takenAt, takenBy, cancelled, note, alerted }
import { getStore } from '@netlify/blobs';
import { ymd, local, dayLessons, NO_CHANGES, loadChanges } from './bot-core.mjs';
import { run } from './ifadmin-ai.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
export const EARLY_MIN = 30, GRACE_MIN = 2, LESSON_MIN = 90;
const err = code => { const e = new Error(code); e.code = code; return e; };
export const today = () => ymd(new Date());

/** Lessons of these classes on a local date (YYYY-MM-DD): timetable + cancellations, moves and extra lessons. */
export const lessonsOn = (classes, date, CH) => dayLessons(classes, date, CH || NO_CHANGES);
export const loadLog = async month => (await S().get('lessonlog/' + month, { type: 'json' })) || {};
const saveLog = (month, L) => S().setJSON('lessonlog/' + month, L);

/** What a lesson looks like now: upcoming / open (check-in possible) / late (started, no check-in) / missed / done. */
export function status(lesson, e, now = new Date(), cutoff = null) {
  const at = new Date(lesson.at), end = new Date(lesson.endAt);
  if (lesson.movedTo) return 'moved';
  if (e?.cancelled || lesson.cancelled) return 'cancelled';
  if (e?.checkIn) return e.lateMin > GRACE_MIN ? 'in-late' : 'in';
  if (e?.noShow) return 'missed';
  if (cutoff && at < new Date(cutoff)) return 'in';   // before check-in existed: counted as on time
  if (now < at.getTime() - EARLY_MIN * 60000) return 'upcoming';
  if (now < at) return 'open';
  if (now <= end) return 'overdue';
  return 'missed';
}
export const withEntry = (lessons, L, now, cutoff) => lessons.map(l => { const e = L[l.key] || null; const st = status(l, e, now, cutoff); return { ...l, entry: e, state: st, auto: st === 'in' && !e?.checkIn }; });

export async function checkIn(lesson, who, now = new Date()) {
  const at = new Date(lesson.at), end = new Date(lesson.endAt);
  if (now < at.getTime() - EARLY_MIN * 60000) throw err('early');
  if (now > end && who.role !== 'admin') throw err('over');
  const month = lesson.date.slice(0, 7), L = await loadLog(month);
  const e = L[lesson.key] || (L[lesson.key] = { classId: lesson.classId, label: lesson.label, date: lesson.date, start: lesson.start, end: lesson.end, teacherId: lesson.teacherId });
  if (e.checkIn) return e;
  e.checkIn = now.toISOString(); e.lateMin = Math.round((now - at) / 60000); e.by = { uid: who.uid, name: who.name };
  await saveLog(month, L); return e;
}

const TO_IFA = { on: 'P', late: 'P', abs: 'UA', exc: 'EA' };
/** Save the register; marks {sid: on|late|abs|exc}, lateBy {sid: minutes}. Teachers must have checked in first. */
export async function saveRegister(lesson, marks, lateBy, who) {
  const month = lesson.date.slice(0, 7), L = await loadLog(month);
  const e = L[lesson.key] || (L[lesson.key] = { classId: lesson.classId, label: lesson.label, date: lesson.date, start: lesson.start, end: lesson.end, teacherId: lesson.teacherId });
  if (!e.checkIn && who.role !== 'admin') throw err('checkin');
  if (who.role !== 'admin' && lesson.date !== today()) throw err('closed');   // teachers: the day of the lesson only
  const clean = {}, late = {};
  for (const [sid, m] of Object.entries(marks || {})) if (TO_IFA[m]) { clean[sid] = m; if (m === 'late') late[sid] = Math.max(1, Math.min(180, Math.round(+(lateBy || {})[sid] || 0))) || null; }
  e.marks = clean; e.lateBy = late; e.takenAt = new Date().toISOString(); e.takenBy = { uid: who.uid, name: who.name };
  await saveLog(month, L);
  // IF Admin attendance (website class "c-<groupId>" ↔ IF Admin group)
  let saved = null;
  try {
    const gid = lesson.group || String(lesson.classId).replace(/^c-/, '');
    const D = { students: (await A().get('c/students', { type: 'json' })) || {}, groups: (await A().get('c/groups', { type: 'json' })) || {}, attendance: (await A().get('c/attendance', { type: 'json' })) || {} };
    if (D.groups[gid]) {
      const ifa = {}; for (const [sid, m] of Object.entries(clean)) if (D.students[sid]) ifa[sid] = TO_IFA[m];
      const res = run(D, [{ op: 'attendance', group: gid, date: lesson.date, marks: ifa }]);
      const st = (await A().get('stamp', { type: 'json' })) || {};
      for (const k of res.touched) { await A().setJSON('c/' + k, D[k]); st[k] = Date.now(); }
      if (res.touched.size) await A().setJSON('stamp', st);
      saved = res.lines.map(l => l.text).join('; ');
    }
  } catch (x) { console.error('register → IF Admin', x.message); }
  return { entry: e, ifadmin: saved };
}
export async function setCancelled(lesson, cancelled, note) {
  const month = lesson.date.slice(0, 7), L = await loadLog(month);
  const e = L[lesson.key] || (L[lesson.key] = { classId: lesson.classId, label: lesson.label, date: lesson.date, start: lesson.start, end: lesson.end, teacherId: lesson.teacherId });
  e.cancelled = !!cancelled; e.note = String(note || '').slice(0, 200);
  await saveLog(month, L); return e;
}

/** When check-in started (set the first time it is used): every lesson that started earlier counts as on time. */
export async function since() {
  let d = await S().get('lessons/since');
  if (d && String(d).length > 10) return String(d);
  d = new Date().toISOString(); await S().set('lessons/since', d); return d;
}
/** The director corrects a lesson: set = on | late (lateMin) | missed | cancelled | clear. */
export async function correct(lesson, b, who) {
  const month = lesson.date.slice(0, 7), L = await loadLog(month);
  const e = L[lesson.key] || (L[lesson.key] = { classId: lesson.classId, label: lesson.label, date: lesson.date, start: lesson.start, end: lesson.end, teacherId: lesson.teacherId });
  const at = new Date(lesson.at), by = { uid: who.uid, name: (who.name || 'Admin') + ' (corrected)' };
  delete e.noShow; e.cancelled = false;
  if (b.set === 'on') { e.checkIn = at.toISOString(); e.lateMin = 0; e.by = by; }
  else if (b.set === 'late') { const m = Math.max(GRACE_MIN + 1, Math.min(240, Math.round(+b.lateMin || 0))) || GRACE_MIN + 1; e.checkIn = new Date(at.getTime() + m * 60000).toISOString(); e.lateMin = m; e.by = by; }
  else if (b.set === 'missed') { delete e.checkIn; delete e.lateMin; delete e.by; e.noShow = true; }
  else if (b.set === 'cancelled') { e.cancelled = true; }
  else if (b.set === 'clear') { delete e.checkIn; delete e.lateMin; delete e.by; }
  if (b.note != null) e.note = String(b.note || '').slice(0, 200);
  e.correctedAt = new Date().toISOString(); e.correctedBy = who.name || '';
  await saveLog(month, L); return e;
}
/** All timetabled lessons from the first of `month` (or the start of check-in) up to now, with their log entries. */
export async function monthLessons(classes, month, now = new Date()) {
  const L = await loadLog(month), [y, m] = month.split('-').map(Number), out = [], cutoff = await since(), CH = await loadChanges();
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate(), todayStr = today();
  for (let d = 1; d <= last; d++) {
    const date = `${month}-${String(d).padStart(2, '0')}`; if (date > todayStr) break;
    out.push(...withEntry(lessonsOn(classes, date, CH), L, now, cutoff));
  }
  return out;
}
/** Punctuality per teacher: lessons so far, on time, late (+average minutes), missed, cancelled. */
export function punctuality(lessons, teachers) {
  const by = {};
  for (const l of lessons) {
    if (l.state === 'upcoming' || l.state === 'open' || l.state === 'overdue' || l.state === 'moved') continue;
    const t = by[l.teacherId] || (by[l.teacherId] = { teacherId: l.teacherId, name: (teachers.find(x => x.id === l.teacherId) || {}).name || 'No teacher assigned', lessons: 0, onTime: 0, late: 0, lateMin: 0, missed: 0, cancelled: 0, registers: 0 });
    if (l.state === 'cancelled') { t.cancelled++; continue; }
    t.lessons++;
    if (l.state === 'in') t.onTime++; else if (l.state === 'in-late') { t.late++; t.lateMin += l.entry.lateMin; } else if (l.state === 'missed') t.missed++;
    if (l.entry?.takenAt) t.registers++;
  }
  return Object.values(by).map(t => ({ ...t, avgLate: t.late ? Math.round(t.lateMin / t.late) : 0 })).sort((a, b) => a.name.localeCompare(b.name));
}

/** A class's attendance from IF Admin, with the website's lateness on top: {dates, rows:[{sid, name, marks:{date: P|L|UA|EA|FZ}, stats}]}. */
export async function classAttendance(cls, students, months = 3) {
  const gid = cls.group || String(cls.id).replace(/^c-/, '');
  const att = ((await A().get('c/attendance', { type: 'json' })) || {})[gid] || {};
  const cut = new Date(local().getTime() - months * 31 * 864e5).toISOString().slice(0, 10);
  const late = {}, now = local(), logs = [];
  for (let i = 0; i < months + 1; i++) { const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1)); logs.push(d.toISOString().slice(0, 7)); }
  const lessonLog = [];
  for (const mo of logs) for (const e of Object.values(await loadLog(mo))) if (e.classId === cls.id) {
    lessonLog.push({ date: e.date, start: e.start, checkIn: e.checkIn || null, lateMin: e.lateMin ?? null, by: e.by?.name || '', register: !!e.takenAt, cancelled: !!e.cancelled });
    for (const [sid, m] of Object.entries(e.marks || {})) if (m === 'late') (late[sid] || (late[sid] = {}))[e.date] = e.lateBy?.[sid] || true;
  }
  const dateSet = new Set();
  const rows = students.map(s => {
    const marks = {}, src = att[s.id] || {};
    for (const [d, m] of Object.entries(src)) if (d >= cut && m) { marks[d] = m === 'P' && late[s.id]?.[d] ? 'L' : m; dateSet.add(d); }
    const v = Object.values(marks), n = v.filter(m => m !== 'FZ').length, pres = v.filter(m => m === 'P' || m === 'L').length;
    return { sid: s.id, name: `${s.first} ${s.last}`.trim(), status: s.status, marks, lateMins: late[s.id] || {},
      stats: { lessons: n, present: pres, late: v.filter(m => m === 'L').length, absent: v.filter(m => m === 'UA').length, excused: v.filter(m => m === 'EA').length, rate: n ? Math.round(pres / n * 100) : null } };
  });
  return { dates: [...dateSet].sort(), rows, lessons: lessonLog.sort((a, b) => (b.date + b.start).localeCompare(a.date + a.start)) };
}
