// Study activity in the IF App: what a student did and when, kept per account for the director, the manager,
// the student's own teachers and (through a private link) the parents.
// Stored in the "ielts" store at u/<uid>/act: { days: { 'YYYY-MM-DD': { s: active seconds, h: { hour: seconds }, n: items, ev: [ … ] } } }
// A day is a day in Kostanay (UTC+5). The last 120 days are kept. History starts on the day this went live.
import { getStore } from '@netlify/blobs';
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const KEEP_DAYS = 120, DAY_EVENTS = 80, DAY_SECS = 16 * 3600;
const local = (t = Date.now()) => new Date(t + 5 * 3600e3);
export const dayOf = t => local(t).toISOString().slice(0, 10);
const clean = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);

/** Add what the IF App reports: seconds of active use since its last report, and finished items. */
export async function record(uid, body) {
  const secs = Math.max(0, Math.min(900, Math.round(+body?.secs || 0)));
  const evs = Array.isArray(body?.ev) ? body.ev.slice(0, 20) : [];
  if (!secs && !evs.length) return { ok: true };
  const doc = (await U().get(`u/${uid}/act`, { type: 'json' })) || { days: {} };
  const now = local(), date = now.toISOString().slice(0, 10), hour = now.getUTCHours();
  const D = doc.days[date] = doc.days[date] || { s: 0, h: {}, n: 0, ev: [] };
  const add = Math.min(secs, Math.max(0, DAY_SECS - D.s)); D.s += add; if (add) D.h[hour] = (D.h[hour] || 0) + add;
  for (const e of evs) {
    if (!e || typeof e !== 'object') continue;
    const item = { a: now.toISOString().slice(11, 16), k: clean(e.k, 16).toLowerCase().replace(/[^a-z]/g, '') || 'other', id: clean(e.id, 80), t: clean(e.t, 120) };
    if (e.s != null && isFinite(+e.s)) item.sc = Math.max(0, Math.min(100, Math.round(+e.s)));
    if (e.d != null && isFinite(+e.d)) item.d = Math.max(0, Math.min(4 * 3600, Math.round(+e.d)));
    D.n++; if (D.ev.length < DAY_EVENTS) D.ev.push(item);
  }
  const keep = Object.keys(doc.days).sort().slice(-KEEP_DAYS); for (const k of Object.keys(doc.days)) if (!keep.includes(k)) delete doc.days[k];
  doc.at = Date.now();
  await U().setJSON(`u/${uid}/act`, doc);
  return { ok: true };
}

const lastDays = n => { const out = [], t = Date.now(); for (let i = n - 1; i >= 0; i--) out.push(dayOf(t - i * 864e5)); return out; };
function totals(doc, n) {
  const days = lastDays(n).map(d => doc.days[d]).filter(Boolean);
  return { mins: Math.round(days.reduce((a, d) => a + d.s, 0) / 60), items: days.reduce((a, d) => a + d.n, 0), days: days.filter(d => d.s >= 60 || d.n).length };
}
/** One student's report: the last 28 days day by day, time of day, what they did, and their progress by course. */
export async function summary(uid) {
  const [doc, ifx] = await Promise.all([U().get(`u/${uid}/act`, { type: 'json' }), U().get(`u/${uid}/ifx`, { type: 'json' })]);
  const A = doc || { days: {} }, dates = Object.keys(A.days).sort();
  const days = lastDays(28).map(d => ({ date: d, mins: Math.round(((A.days[d] || {}).s || 0) / 60), items: (A.days[d] || {}).n || 0 }));
  const hours = Array(24).fill(0), kinds = {};
  for (const d of lastDays(28)) { const D = A.days[d]; if (!D) continue; for (const [h, s] of Object.entries(D.h || {})) hours[+h] += Math.round(s / 60); for (const e of D.ev || []) { const k = kinds[e.k] = kinds[e.k] || { n: 0, secs: 0 }; k.n++; k.secs += e.d || 0; } }
  const recent = []; for (const d of dates.slice().reverse()) { for (const e of (A.days[d].ev || []).slice().reverse()) { recent.push({ date: d, ...e }); if (recent.length >= 40) break; } if (recent.length >= 40) break; }
  const courses = {};   // from the saved progress: lessons finished and average score by course
  for (const [k, v] of Object.entries(ifx?.done || {})) { const c = k.split('/')[0], x = courses[c] = courses[c] || { lessons: 0, sum: 0, last: 0 }; x.lessons++; x.sum += +v.score || 0; x.last = Math.max(x.last, +v.at || 0); }
  return { since: dates[0] || null, last: dates.filter(d => A.days[d].s >= 60 || A.days[d].n).pop() || null, week: totals(A, 7), month: totals(A, 28), days, hours, kinds, recent,
    xp: +ifx?.xp || 0, streak: +ifx?.streak || 0, level: ifx?.level || '',
    courses: Object.entries(courses).map(([id, x]) => ({ id, lessons: x.lessons, avg: Math.round(x.sum / x.lessons), last: x.last ? dayOf(x.last) : null })).sort((a, b) => (b.last || '').localeCompare(a.last || '')) };
}
/** A light line per account for the list of students. */
export async function overview(uids) {
  const out = {};
  for (let i = 0; i < uids.length; i += 25) await Promise.all(uids.slice(i, i + 25).map(async uid => {
    const [doc, ifx] = await Promise.all([U().get(`u/${uid}/act`, { type: 'json' }), U().get(`u/${uid}/ifx`, { type: 'json' })]);
    const A = doc || { days: {} }, dates = Object.keys(A.days).filter(d => A.days[d].s >= 60 || A.days[d].n).sort();
    out[uid] = { last: dates.pop() || (ifx?.last || null), week: totals(A, 7), xp: +ifx?.xp || 0, streak: +ifx?.streak || 0, lessons: Object.keys(ifx?.done || {}).length };
  }));
  return out;
}
