// Working hours for staff.
//  - Teaching hours come from the lesson log: only lessons that actually took place count
//    (the teacher checked in, or the lesson is from before check-in started). Cancelled, moved and missed lessons do not.
//  - Administrative hours come from shifts: the manager (and the director) press "Start work" / "Finish work"
//    on the website, and can add time worked away from the desk (e.g. WhatsApp or Instagram enquiries from home).
//  Store "school": shifts/{YYYY-MM} = { [uid]: { name, list: [{ id, in, out, note, manual, auto }] } }
import { getStore } from '@netlify/blobs';
import { monthLessons, lessonsOn, today } from './lessons.mjs';
import { loadChanges } from './bot-core.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const TZ = 5 * 3600e3;                                    // Kostanay, UTC+5
const MAX_SHIFT_H = 12;                                   // a shift left open longer than this is closed automatically
const localDay = iso => new Date(new Date(iso).getTime() + TZ).toISOString().slice(0, 10);
const mondayOf = date => { const d = new Date(date + 'T00:00:00Z'), w = (d.getUTCDay() + 6) % 7; return new Date(d.getTime() - w * 864e5).toISOString().slice(0, 10); };
const r1 = h => Math.round(h * 10) / 10;
const loadShifts = async month => (await S().get('shifts/' + month, { type: 'json' })) || {};
const saveShifts = (month, v) => S().setJSON('shifts/' + month, v);
const shiftH = (s, now = new Date()) => Math.max(0, ((s.out ? new Date(s.out) : now) - new Date(s.in)) / 3.6e6);
const lessonH = l => Math.max(0, (new Date(l.endAt) - new Date(l.at)) / 3.6e6);
const DONE = new Set(['in', 'in-late']);

/** Teaching hours for one teacher in a month: done so far, this week, today, and what is still planned this month. */
export async function teaching(classes, month, now = new Date()) {
  const d = today(), mon = mondayOf(d), done = (await monthLessons(classes, month, now)).filter(l => DONE.has(l.state));
  const sum = arr => r1(arr.reduce((s, l) => s + lessonH(l), 0));
  // still to come this month (from now to the end of the month), so the teacher sees the full picture
  const [y, m] = month.split('-').map(Number), last = new Date(Date.UTC(y, m, 0)).getUTCDate(), CH = await loadChanges();
  let planned = 0, plannedN = 0;
  if (month >= d.slice(0, 7)) for (let i = 1; i <= last; i++) {
    const date = `${month}-${String(i).padStart(2, '0')}`; if (date < d) continue;
    for (const l of lessonsOn(classes, date, CH)) if (!l.cancelled && !l.movedTo && new Date(l.at) > now) { planned += lessonH(l); plannedN++; }
  }
  return {
    hours: sum(done), lessons: done.length,
    week: sum(done.filter(l => l.date >= mon)), today: sum(done.filter(l => l.date === d)),
    planned: r1(planned), plannedLessons: plannedN,
    list: done.map(l => ({ date: l.date, start: l.start, end: l.end, label: l.label, h: r1(lessonH(l)), late: l.state === 'in-late' }))
  };
}

/** Close shifts that were left open for too long (forgot to press "Finish work"). */
function autoClose(rec, now) {
  let changed = false;
  for (const s of rec.list) if (!s.out && shiftH(s, now) > MAX_SHIFT_H) { s.out = new Date(new Date(s.in).getTime() + 8 * 3.6e6).toISOString(); s.auto = true; changed = true; }
  return changed;
}
const summary = (rec, now) => {
  const d = today(), mon = mondayOf(d), list = rec.list || [];
  const sum = arr => r1(arr.reduce((s, x) => s + shiftH(x, now), 0));
  return {
    hours: sum(list), week: sum(list.filter(s => localDay(s.in) >= mon)), today: sum(list.filter(s => localDay(s.in) === d)),
    open: list.find(s => !s.out) || null, days: new Set(list.map(s => localDay(s.in))).size,
    list: list.slice().sort((a, b) => b.in.localeCompare(a.in)).map(s => ({ ...s, day: localDay(s.in), h: r1(shiftH(s, now)) }))
  };
};

/** Administrative hours for one person in a month. */
export async function adminHours(uid, month, now = new Date()) {
  const all = await loadShifts(month), rec = all[uid] || { list: [] };
  if (autoClose(rec, now)) await saveShifts(month, all);
  return summary(rec, now);
}

/** Start or finish a shift. */
export async function shift(uid, name, action, note, now = new Date()) {
  const month = today().slice(0, 7), all = await loadShifts(month), rec = all[uid] || (all[uid] = { name, list: [] });
  rec.name = name || rec.name; autoClose(rec, now);
  // an open shift may have started last month
  if (action === 'out' && !rec.list.some(s => !s.out)) {
    const prevM = new Date(Date.UTC(+month.slice(0, 4), +month.slice(5) - 2, 1)).toISOString().slice(0, 7), prev = await loadShifts(prevM), pr = prev[uid];
    const o = pr && pr.list.find(s => !s.out);
    if (o) { o.out = now.toISOString(); if (note) o.note = String(note).slice(0, 200); await saveShifts(prevM, prev); return adminHours(uid, month, now); }
    const e = new Error('none'); e.code = 'none'; throw e;
  }
  if (action === 'in') {
    if (rec.list.some(s => !s.out)) { const e = new Error('open'); e.code = 'open'; throw e; }
    rec.list.push({ id: 'w' + now.getTime().toString(36), in: now.toISOString(), note: String(note || '').slice(0, 200) });
  } else {
    const o = rec.list.find(s => !s.out); o.out = now.toISOString(); if (note) o.note = String(note).slice(0, 200);
  }
  await saveShifts(month, all);
  return summary(rec, now);
}

/** Add time worked away from the desk, or remove one of your own entries. */
export async function addManual(uid, name, b, now = new Date()) {
  const okD = /^\d{4}-\d{2}-\d{2}$/.test(b.date || ''), okT = t => /^\d{1,2}:\d{2}$/.test(t || '');
  if (!okD || !okT(b.from) || !okT(b.to)) { const e = new Error('bad'); e.code = 'bad'; throw e; }
  const iso = t => new Date(new Date(`${b.date}T${t.padStart(5, '0')}:00Z`).getTime() - TZ).toISOString();
  const a = iso(b.from), z = iso(b.to);
  if (z <= a || new Date(z) > new Date(now.getTime() + 60e3)) { const e = new Error('bad'); e.code = 'bad'; throw e; }
  const month = b.date.slice(0, 7), all = await loadShifts(month), rec = all[uid] || (all[uid] = { name, list: [] });
  rec.list.push({ id: 'm' + now.getTime().toString(36), in: a, out: z, manual: true, note: String(b.note || '').slice(0, 200), addedAt: now.toISOString() });
  await saveShifts(month, all);
  return adminHours(uid, month, now);
}
export async function removeEntry(uid, month, id, now = new Date()) {
  const all = await loadShifts(month), rec = all[uid];
  if (rec) { rec.list = rec.list.filter(s => s.id !== id); await saveShifts(month, all); }
  return adminHours(uid, month, now);
}

/** Everyone's administrative hours this month (for the admin team table). */
export async function teamAdmin(month, now = new Date()) {
  const all = await loadShifts(month);
  return Object.entries(all).map(([uid, rec]) => ({ uid, name: rec.name || '', ...summary(rec, now), list: undefined }));
}
