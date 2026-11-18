// Teacher pay, worked out automatically from the lesson log (clock-ins, registers, covers and cancellations).
// The rates are NOT in this public repository: they live in store "school" → payrates (edited in Admin → Hours & pay),
// first filled from the Netlify environment variable IF_PAY_RATES (JSON, same shape).
//   payrates = { default: { amount, per },                       // e.g. 3000 per 60 min → 90 min = 4500
//                teachers: { <teacherId>: { amount, per, solo: 'share', share: 0.5 } },
//                skip: [teacherId],                               // own pay arrangement (not calculated)
//                fixed: { manager: { amount, deduct, note }, smm: { amount } },
//                director: { teacherId, base, comp, ge: { big, small }, ielts: { big, small } } }   // the director's salary (only he sees it):
//                a group's rate is paid in full when all its lessons were conducted; every lesson missed takes off the rate ÷ 8 (90-minute lessons)
// Rules (shown to the teachers on their hours page):
//  • A lesson is paid when it took place: the teacher clocked in (or it is from before clock-in started). Covers are paid
//    to the teacher who covered. Missed lessons (no clock-in) and lessons cancelled on time or by the teacher are not paid.
//  • Late cancellation by the student (less than 8 h): half the lesson, ONLY if the teacher was at school waiting — clocked
//    in for the lesson, or confirmed "at school" when the cancellation came 30 minutes or less before the start.
//    Otherwise it is recorded (the student is charged) but the teacher is not paid for it.
//  • Nobody came (teacher clocked in, every student marked absent / late cancellation): half the lesson.
//  • Individual students with a "share" rule: the teacher gets that share of the lesson price (tuition ÷ 12 lessons)
//    for every lesson taught in the pay period — 12 lessons = half the tuition, however they fall across months.
import { getStore } from '@netlify/blobs';
import { lessonsOn, loadLog, saveLog, withEntry, since, today } from './lessons.mjs';
import { doc, loadChanges, hidePrivate, parseSchedule, ymd } from './bot-core.mjs';
import { PACKAGES } from './prices.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
export const WAIT_MIN = 30;

export async function loadRates() {
  const v = await S().get('payrates', { type: 'json' });
  if (v) return v;
  try { const e = JSON.parse(process.env.IF_PAY_RATES || 'null'); if (e) return e; } catch (x) { console.error('IF_PAY_RATES', x.message); }
  return { default: { amount: 0, per: 60 }, teachers: {}, skip: [], fixed: {} };
}
export async function saveRates(r) {
  const num = v => Math.max(0, Math.round(+v || 0)), rule = x => {
    const o = { amount: num(x && x.amount), per: [45, 60, 90].includes(+(x && x.per)) ? +x.per : 60 };
    if (x && x.solo === 'share') { o.solo = 'share'; o.share = Math.min(1, Math.max(0, +x.share || 0.5)); }
    return o;
  };
  const out = { default: rule(r.default), teachers: {}, skip: (r.skip || []).filter(x => /^t-[\w-]+$/.test(x)).slice(0, 20), fixed: {} };
  for (const [id, x] of Object.entries(r.teachers || {})) if (/^t-[\w-]+$/.test(id) && x && (x.amount || x.solo)) out.teachers[id] = rule(x);
  out.periodStart = Math.min(28, Math.max(1, +r.periodStart || 28));
  out.solo = {}; for (const [sid, v] of Object.entries(r.solo || {})) if (/^[\w-]{1,40}$/.test(sid) && +v > 0) out.solo[sid] = Math.round(+v);
  for (const k of ['manager', 'smm']) if (r.fixed && r.fixed[k]) out.fixed[k] = { amount: num(r.fixed[k].amount), deduct: num(r.fixed[k].deduct), note: String(r.fixed[k].note || '').slice(0, 80) };
  if (!r.director) { const prev = await S().get('payrates', { type: 'json' }).catch(() => null); if (prev && prev.director) r.director = prev.director; }   // the rates page does not show it: keep it
  if (r.director && /^t-[\w-]+$/.test(r.director.teacherId || '')) { const g = x => x ? { big: num(x.big), small: num(x.small) } : undefined; out.director = { teacherId: r.director.teacherId, base: num(r.director.base), comp: num(r.director.comp), ge: g(r.director.ge), ielts: g(r.director.ielts) }; }
  out.updated = new Date().toISOString();
  await S().setJSON('payrates', out);
  return out;
}

/** Pay period for a month: from the period-start day of the previous month to the day before it in this month
    (periodStart 28: October = 28 Sep – 27 Oct); periodStart 1 = the calendar month. Used for months before November 2026. */
// From November 2026 the pay period is the calendar month. Staff were paid on 28 October, so November 2026 counts the
// lessons from 29 October to 30 November.
export const CALENDAR_FROM = '2026-11', FIRST_FROM = '2026-10-29';
export function period(month, rates) {
  const d = Math.min(28, Math.max(1, +(rates && rates.periodStart) || 28)), [y, m] = month.split('-').map(Number);
  if (month >= CALENDAR_FROM) return { from: month === CALENDAR_FROM ? FIRST_FROM : `${month}-01`, to: new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10) };
  if (d === 1) return { from: `${month}-01`, to: new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10) };
  return { from: new Date(Date.UTC(y, m - 2, d)).toISOString().slice(0, 10), to: new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10) };
}
const isSolo = c => !!c && ((Array.isArray(c.studentIds) && c.studentIds.length === 1) || (Array.isArray(c.uids) && c.uids.length === 1));
const mins = l => Math.max(0, Math.round((Date.parse(l.endAt) - Date.parse(l.at)) / 60000));
const per = (r, m) => Math.round((r.amount || 0) * m / (r.per || 60));
const fmt = n => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ');
export const ruleText = r => !r ? 'No rate set yet' : `${fmt(r.amount)} ₸ per ${r.per || 60} min` + ((r.per || 60) === 60 ? ` (90 min = ${fmt(r.amount * 1.5)} ₸)` : ` (60 min = ${fmt(r.amount * 60 / r.per)} ₸)`) + (r.solo === 'share' ? ` · individual students: ${Math.round((r.share || 0.5) * 100)}% of the student's fee per lesson` : '');

/** Per-lesson fee of an individual student in a month, from IF Admin payments. */
const PACKAGE = 12;   // an individual student's tuition is for a package of 12 lessons
/** Price of one lesson of an individual student: the full tuition (the highest monthly amount in the last 6 months, so
    a part-payment does not lower it) ÷ 12 lessons. The teacher gets their share of it for every lesson taught in the
    pay period: 12 lessons = half the tuition, however the lessons fall across months. */
function soloFee(sid, month, D) {
  const months = Object.keys(D.payments || {}).filter(m => m <= month).sort().reverse().slice(0, 6);
  let best = null;
  for (const m of months) {
    const r = D.payments[m]?.rows?.[sid]; if (!r) continue;
    const net = Math.max(0, (+r.due || 0) - (+r.disc || 0));
    if (net && (!best || net > best.fee)) best = { fee: net, from: m };
  }
  if (!best) return null;
  // a package from the price list (8 lessons 60 000, 12 lessons 80 000, 16 lessons 100 000) divides by its own size
  const pk = PACKAGES.find(p => p.n > 1 && p.price === best.fee), n = pk ? pk.n : PACKAGE;
  return { ...best, n, each: best.fee / n };
}

/** Pay for one month: { month, teachers: [{teacherId, name, rule, total, hours, lessons, items, late}], fixed: [...] } */
export async function payroll(month, only = null, now = new Date()) {
  const [classes0, teachers, rates, CH] = await Promise.all([doc('classes'), doc('teachers'), loadRates(), loadChanges()]);
  const classes = hidePrivate(classes0, null);
  const D = { payments: (await A().get('c/payments', { type: 'json' })) || {}, students: (await A().get('c/students', { type: 'json' })) || {} };
  const { from, to } = period(month, rates), all = [], byT = {}, soloList = {}, cutoff = await since(), logs = {}, td = ymd(now);
  for (let t = Date.parse(from + 'T00:00:00Z'); t <= Date.parse(to + 'T00:00:00Z'); t += 864e5) {
    const date = new Date(t).toISOString().slice(0, 10); if (date > td) break;
    const mo = date.slice(0, 7), L = logs[mo] || (logs[mo] = await loadLog(mo));
    all.push(...withEntry(lessonsOn(classes, date, CH), L, now, cutoff));
  }
  const [y, m] = month.split('-').map(Number), last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const ttCount = {};   // timetable lessons of a class in the month (for packages with no stated number of lessons)
  const countFor = c => {
    if (ttCount[c.id] != null) return ttCount[c.id];
    let n = 0; for (let d = 1; d <= last; d++) n += lessonsOn([c], `${month}-${String(d).padStart(2, '0')}`).length;
    return (ttCount[c.id] = n);
  };
  for (const l of all) {
    const tid = l.teacherId; if (!tid || (only && tid !== only)) continue;
    if (l.state === 'upcoming' || l.state === 'open' || l.state === 'overdue' || l.state === 'moved') continue;
    const cls = classes.find(c => c.id === l.classId), r = (rates.teachers || {})[tid] || rates.default || { amount: 0, per: 60 };
    const e = l.entry || {}, c = CH.cancel[l.from || l.key] || {};
    const mm = +e.min > 0 ? Math.round(+e.min) : mins(l);   // entry.min: the length the director recorded, when it differs from the timetable
    // full pay for this lesson
    let full = per(r, mm), how = `${mm} min`;
    if (r.solo === 'share' && isSolo(cls) && (cls.studentIds || []).length) {
      const sid = cls.studentIds[0], set = (rates.solo || {})[sid];
      const f = set ? { each: set, fee: set, n: 1, set: true } : soloFee(sid, month, D);
      if (!soloList[sid]) soloList[sid] = { sid, label: cls.label, teacherId: tid, each: f ? Math.round(f.each) : 0, set: !!set };
      if (f) { full = Math.round(f.each * (r.share || 0.5)); how = `${Math.round((r.share || 0.5) * 100)}% of the lesson price ${fmt(f.each)} ₸` + (f.set ? '' : ` (tuition ${fmt(f.fee)} ₸ ÷ ${f.n} lessons)`); }
      else how += ' · no fee found in IF Admin: hourly rate used';
    }
    const T = byT[tid] || (byT[tid] = { teacherId: tid, items: [], total: 0, minutes: 0, lessons: 0, late: { n: 0, min: 0 }, unpaidLate: 0 });
    const item = { key: l.key, date: l.date, start: l.start, end: l.end, label: l.label, min: mm, full, pay: 0, kind: '', note: '', how, cover: !!l.coverFor };
    if (l.state === 'in' && !(l.entry && l.entry.checkIn)) { item.kind = 'unrecorded'; item.note = 'Before clock-in started: not counted until the director records it'; T.items.push(item); continue; }
    if (l.state === 'in' || l.state === 'in-late') {
      const marks = Object.values(e.marks || {}), nobody = e.takenAt && marks.length && marks.every(x => x === 'abs' || x === 'exc');
      if (nobody) { item.kind = 'nobody'; item.pay = Math.round(full / 2); item.note = 'Nobody came — you were at school: half the lesson'; }
      else { item.kind = 'taught'; item.pay = full; T.minutes += mm; T.lessons++; }
      if (l.state === 'in-late') { T.late.n++; T.late.min += e.lateMin || 0; item.lateMin = e.lateMin || 0; }
    } else if (l.state === 'cancelled') {
      const late = c.lateCancel || c.reason === 'slate' || e.cancelReason === 'slate';
      if (!late) continue;                      // cancelled on time / by the teacher: not a lesson, not listed
      const there = !!e.checkIn || !!c.atSchool;
      item.kind = 'latecancel';
      if (there) { item.pay = Math.round(full / 2); item.note = 'Late cancellation — you were at school waiting: half the lesson'; }
      else { item.note = 'Late cancellation — recorded, not paid (you were not at school waiting)'; T.unpaidLate++; }
    } else if (l.state === 'missed') { item.kind = 'missed'; item.note = 'No clock-in — not paid'; }
    else continue;
    T.items.push(item); T.total += item.pay;
  }
  // lessons recorded by hand that are not on any timetable (e.g. a trial lesson): store "school" → payextra
  for (const x of ((await S().get('payextra', { type: 'json' })) || [])) {
    if (x.date < from || x.date > to || (only && x.teacherId !== only)) continue;
    const r = (rates.teachers || {})[x.teacherId] || rates.default || { amount: 0, per: 60 }, full = per(r, x.min || 60), pay = Math.round(full * (x.factor ?? 1));
    const T = byT[x.teacherId] || (byT[x.teacherId] = { teacherId: x.teacherId, items: [], total: 0, minutes: 0, lessons: 0, late: { n: 0, min: 0 }, unpaidLate: 0 });
    T.items.push({ key: 'x:' + x.id, date: x.date, start: x.start || '', end: x.end || '', label: x.label, min: x.min || 60, full, pay, kind: 'extra', note: x.note || '', how: `${x.min || 60} min` + (x.factor != null && x.factor !== 1 ? ` × ${x.factor}` : '') });
    T.total += pay; T.minutes += x.min || 60; T.lessons++;
  }
  const skip = new Set(rates.skip || []);
  const list = Object.values(byT).map(T => {
    const t = teachers.find(x => x.id === T.teacherId) || {};
    const r = (rates.teachers || {})[T.teacherId] || rates.default;
    if (skip.has(T.teacherId)) T.items = T.items.map(x => ({ ...x, pay: null, full: null }));   // own pay arrangement: hours only, no per-lesson amounts
    return { ...T, name: t.name || T.teacherId, hours: Math.round(T.minutes / 6) / 10, own: skip.has(T.teacherId), rule: skip.has(T.teacherId) ? 'Own pay arrangement — hours only' : ruleText(r), total: skip.has(T.teacherId) ? 0 : T.total, items: T.items.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start)) };
  }).sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  // the director: a rate per group he teaches (the compensation is paid only from what is left after expenses and staff pay — below) (by group size), a monthly base (minimum) and a director's compensation
  const DR = rates.director;
  if (DR && DR.teacherId) for (const T of list) {
    if (T.teacherId !== DR.teacherId) continue;
    const idOf = x => x.classId || String(x.key || '').split('|')[0];
    // his groups: the classes he is the teacher of, and any other class he taught this period that was not a cover
    const cls = [...new Set([...classes.filter(c => c.teacherId === DR.teacherId).map(c => c.id), ...T.items.filter(x => x.kind !== 'extra' && !x.cover).map(idOf)])].map(id => classes.find(c => c.id === id)).filter(Boolean);
    // lessons of a group in the whole pay period (the timetable, whatever was cancelled or moved since) and those he conducted
    const plannedOf = c => { let n = 0, past = 0, len = 0; for (let t = Date.parse(from + 'T00:00:00Z'); t <= Date.parse(to + 'T00:00:00Z'); t += 864e5) for (const l of lessonsOn([c], new Date(t).toISOString().slice(0, 10))) { n++; if (Date.parse(l.endAt) <= now.getTime()) past++; len = Math.round((Date.parse(l.endAt) - Date.parse(l.at)) / 60000); } return { n, past, len }; };
    // A month is 8 lessons of a group (90-minute lessons). Lessons conducted beyond that are forwarded to the next month:
    // carry[classId] = lessons brought forward into this month, counted month by month from November 2026.
    const perOf = (c, len) => len === 90 ? 8 : Math.max(1, (parseSchedule(c.schedule) || []).length * 4 || 8);
    const carry = {}, prev = [];
    for (let k = 1; k <= 6; k++) { const d = new Date(Date.UTC(y, m - 1 - k, 1)), pm = d.toISOString().slice(0, 7); if (pm < CALENDAR_FROM) break; prev.unshift(pm); }
    for (const c of cls) {
      let cr = 0; const per = perOf(c, plannedOf(c).len);
      for (const pm of prev) {
        const P = period(pm, rates); let n = 0;
        for (let t = Date.parse(P.from + 'T00:00:00Z'); t <= Date.parse(P.to + 'T00:00:00Z'); t += 864e5) {
          const date = new Date(t).toISOString().slice(0, 10), mo = date.slice(0, 7), L = logs[mo] || (logs[mo] = await loadLog(mo));
          n += withEntry(lessonsOn([c], date, CH), L, now, cutoff).filter(l => l.teacherId === DR.teacherId && !l.movedTo && (l.state === 'in' || l.state === 'in-late') && (l.entry || {}).checkIn).length;
        }
        cr = Math.max(0, cr + n - per);
      }
      carry[c.id] = cr;
    }
    const groups = cls.map(c => {
      const gid = c.group || String(c.id).replace(/^c-/, '');
      const n = Object.values(D.students).filter(st => st && !/left|withdrawn|finished|frozen/i.test(st.st || '') && (st.g === gid || (st.gs || []).includes(gid))).length;
      const ielts = /ielts/i.test(c.label || ''), R = (ielts ? DR.ielts : DR.ge) || {};
      const amount = n >= 5 ? (R.big || 0) : n >= 2 ? (R.small || 0) : 0;
      // the group's rate is paid in full only when every lesson of the pay period was conducted; otherwise for the share conducted
      // He gets the group's full rate when all its lessons are conducted. Each lesson that was due and not conducted takes off
      // one lesson's share: the rate ÷ 8 for 90-minute lessons (8 a month), otherwise the rate ÷ (lessons a week × 4).
      const pl = plannedOf(c), planned = pl.n, taught = T.items.filter(x => idOf(x) === c.id && (x.kind === 'taught' || x.kind === 'nobody')).length;
      const per = perOf(c, pl.len), credit = carry[c.id] || 0, done = taught;
      // short of the month's lessons that were due by now (lessons brought forward count first); extra lessons go to the next month
      const missed = Math.max(0, Math.min(per, pl.past) - (credit + taught)), forward = Math.max(0, credit + taught - per);
      const earned = planned || credit ? Math.max(0, Math.round(amount - missed * amount / per)) : 0;
      return { classId: c.id, label: c.label, students: n, kind: ielts ? 'IELTS' : 'General English', size: n >= 5 ? '5–6' : n >= 2 ? (ielts ? '3–4' : '2–4') : 'individual', amount, planned, done, missed, per, credit, forward, cut: amount - earned, earned, full: !!planned && !missed };
    }).filter(g => g.size !== 'individual' && g.planned);
    const full = groups.reduce((a, g) => a + g.amount, 0), teaching = groups.reduce((a, g) => a + g.earned, 0), base = +DR.base || 0, comp = +DR.comp || 0;
    T.salary = { groups, full, teaching, base, comp, compMax: comp, total: Math.max(base, teaching) + comp, terms: { base, comp, ge: DR.ge || {}, ielts: DR.ielts || {} }, rule: `Groups (General English: 5–6 students ${fmt((DR.ge || {}).big || 0)} ₸, 2–4 students ${fmt((DR.ge || {}).small || 0)} ₸${DR.ielts ? `; IELTS: 5–6 ${fmt(DR.ielts.big || 0)} ₸, 3–4 ${fmt(DR.ielts.small || 0)} ₸` : ''}), each paid in full when all its lessons are conducted, less one lesson's share (the rate ÷ 8 for 90-minute lessons) for every lesson missed; lessons beyond the month's 8 are forwarded to the next month; at least ${fmt(base)} ₸; plus director's compensation ${fmt(comp)} ₸` };
    T.total = T.salary.total; T.rule = T.salary.rule;
  }
  let fixed = [];
  if (!only) {
    const { dayWatchers } = await import('./daydigest.mjs');
    fixed = (await dayWatchers()).map(w => { const f = (rates.fixed || {})[w.duty]; return f ? { uid: w.uid, teacherId: w.teacherId || '', name: w.name, duty: w.duty, amount: f.amount, deduct: f.deduct || 0, note: f.note || '', total: f.amount - (f.deduct || 0) } : null; }).filter(Boolean);
  }
  // director's compensation: only from what is left of the month's income after all expenses and all staff pay
  const dT = DR && list.find(T => T.salary);
  if (dT) {
    const S2 = dT.salary, pays = ((D.payments[month] || {}).rows) || {}, ex = ((((await A().get('c/expenses', { type: 'json' })) || {})[month] || {}).items) || {};
    const income = Object.values(pays).reduce((a, r) => a + (+(r && r.paid) || 0), 0);
    const expenses = Object.values(ex).filter(i => i && !/salar/i.test(i.cat || '')).reduce((a, i) => a + (+i.amt || 0), 0);   // salaries come from the payroll below, not twice
    const staff = list.filter(T => T !== dT).reduce((a, T) => a + (T.total || 0), 0) + (only ? 0 : fixed.reduce((a, f) => a + (f.total || 0), 0));
    const own = Math.max(S2.base, S2.teaching), left = income - expenses - staff - own;
    // the base is a minimum he is paid unless the school does badly: what the period's income covers after expenses and staff pay
    S2.covered = Math.max(0, Math.min(own, Math.round(income - expenses - staff))); S2.short = own - S2.covered;
    S2.money = { income, expenses, staff, own, left, fixedIncluded: !only };
    S2.comp = Math.max(0, Math.min(S2.compMax, Math.round(left)));
    S2.total = own + S2.comp; dT.total = S2.total;
    S2.rule = S2.rule.replace(/plus director's compensation [^;]*$/, `plus director's compensation up to ${fmt(S2.compMax)} ₸, paid only from what is left after all expenses and staff pay`);
    dT.rule = S2.rule;
  }
  return { month, from, to, teachers: list, fixed, rules: RULES, solo: Object.values(soloList) };
}

export const RULES = [
  'A lesson is paid when it took place: you clocked in on the website or in the bot. A lesson you covered is paid to you.',
  'No clock-in = missed, not paid. Lessons cancelled on time or by the teacher/school are not paid (a make-up is arranged).',
  `Late cancellation by the student (less than 8 hours before): you get half the lesson only if you were at school waiting for the student — you clocked in, or the cancellation came ${WAIT_MIN} minutes or less before the start and you tapped “📍 I’m at school” in the bot. Otherwise it is recorded (the student is charged) but not paid to you.`,
  'Nobody came (you clocked in and every student is marked absent): half the lesson.',
  'Individual students (where your rate says so): half of the student\'s tuition for 12 lessons, paid for the lessons you taught this pay period. Example: tuition 80 000 ₸ → 6 667 ₸ a lesson → you get 3 334 ₸ per lesson.',
  'The total updates automatically as you teach. The director checks it before paying.'
];

/** The teacher was at school waiting when a student cancelled late (bot button or the admin). */
export async function setAtSchool(key, on, by) {
  const { saveChanges } = await import('./bot-core.mjs');
  const CH = await loadChanges(), c = CH.cancel[key];
  if (!c) return false;
  if (on) c.atSchool = { by: by || '', at: new Date().toISOString() }; else delete c.atSchool;
  await saveChanges(CH);
  return true;
}

// The director records lessons from before clock-in started (they are listed as "not recorded yet"): each one is
// counted as taught at its timetable start. {keys} = chosen lessons, or {from, to, teacherId} = every unrecorded lesson in a range.
export async function recordLessons(b, by) {
  const P = await payroll(b.month), want = Array.isArray(b.keys) ? new Set(b.keys.map(String)) : null, logs = {}, now = new Date().toISOString();
  let n = 0;
  for (const T of P.teachers) {
    if (b.teacherId && T.teacherId !== b.teacherId) continue;
    for (const it of T.items) {
      if (it.kind !== 'unrecorded') continue;
      if (want ? !want.has(it.key) : ((b.from && it.date < b.from) || (b.to && it.date > b.to))) continue;
      const [classId, date, start] = it.key.split('|'), mo = date.slice(0, 7), L = logs[mo] || (logs[mo] = await loadLog(mo));
      const e = L[it.key] || (L[it.key] = { classId, label: it.label, date, start, end: it.end, teacherId: T.teacherId });
      if (!e.checkIn) { e.checkIn = new Date(`${date}T${start.padStart(5, '0')}:00+05:00`).toISOString(); e.lateMin = 0; e.by = { name: by || '' }; e.recordedBy = by || ''; e.recordedAt = now; n++; }
    }
  }
  for (const mo of Object.keys(logs)) await saveLog(mo, logs[mo]);
  return n;
}
