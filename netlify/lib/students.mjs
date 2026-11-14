// Students for the website, taken from IF Admin (single source of truth).
// IF Admin keeps students, groups, payments, attendance and test results in the Blobs store "ifadmin" (c/<collection>).
// The website only adds what IF Admin does not have: which website account belongs to which student (uid), teacher
// comments and website-only test results (placement tests). Those live in school "studentOverlay" keyed by IF Admin id.
// Until IF Admin has data, everything falls back to the website's own school "students" document.
import { getStore } from '@netlify/blobs';
import seed from './school-seed.json';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const coll = async c => (await A().get('c/' + c, { type: 'json' })) || {};
const pad = n => String(n).padStart(2, '0');
const phoneKey = p => { const d = String(p || '').replace(/\D/g, ''); return d.length >= 10 ? d.slice(-10) : d; };
const OVERLAY_KEYS = ['uid', 'comments', 'tests', 'email', 'parentPhone'];

function splitName(n) {
  n = String(n || '').trim();
  if (/\(/.test(n)) return { first: n, last: '' };
  const w = n.split(/\s+/); return { first: w[0] || '', last: w.slice(1).join(' ') };
}
const SEC = { g: 'Grammar', v: 'Vocabulary', p: 'Pronunciation', r: 'Reading', w: 'Writing', l: 'Listening', s: 'Speaking' };

/** true when IF Admin holds the student list */
export async function ifadminActive() { return Object.keys(await coll('students')).length > 0; }

/** Website class labels for IF Admin group ids (website class "c-<gid>", else the group name). */
async function groupLabels(groups) {
  const classes = (await S().get('classes', { type: 'json' })) || seed.classes || [];
  const out = {};
  for (const [gid, g] of Object.entries(groups)) out[gid] = classes.find(c => c.id === 'c-' + gid)?.label || g.n || gid;
  return out;
}

function derive(sid, a, ctx) {
  const { labels, payments, months, dueDay, results } = ctx;
  const gs = [...new Set([...(Array.isArray(a.gs) ? a.gs : []), a.g].filter(Boolean))];
  const { first, last } = splitName(a.n);
  const status = a.st === 'left' ? 'withdrawn' : a.st === 'frozen' ? 'frozen' : 'active';
  const s = { id: sid, first, last, phone: a.ph || '', parentPhone: a.pph || '', level: a.lv || '', status, notes: a.note || '',
    classes: gs.map(g => labels[g] || g), groups: gs, noFee: !!a.nofee, source: 'ifadmin' };
  // tuition
  const pay = { fee: 0, dueDay, paid: {}, amounts: {}, methods: {}, dueDates: {} };
  let lastRow = null;
  for (const m of months) {
    const r = payments[m]?.rows?.[sid]; if (!r) continue;
    lastRow = r;
    const net = Math.max(0, (+r.due || 0) - (+r.disc || 0));
    if (net === 0) { pay.paid[m] = m + '-01'; pay.methods[m] = 'No fee this month'; continue; } // barter, scholarship, package still running
    if (r.s === 'Paid' || (net > 0 && +r.paid >= net)) { pay.paid[m] = /^\d{4}-\d{2}-\d{2}$/.test(r.d || '') ? r.d : m + '-01'; pay.methods[m] = r.m || ''; }
    if (+r.paid) pay.amounts[m] = +r.paid;
    if (/^\d{4}-\d{2}-\d{2}$/.test(r.dd || '')) pay.dueDates[m] = r.dd;
  }
  if (lastRow) pay.fee = Math.max(0, (+lastRow.due || 0) - (+lastRow.disc || 0));
  if (lastRow && Math.max(0, (+lastRow.due || 0) - (+lastRow.disc || 0)) === 0 && /scholar|barter|free/i.test(lastRow.note || '')) s.noFee = true;
  s.pay = lastRow ? pay : null;
  // IF Admin test results
  s.tests = results.filter(r => r.sid === sid).sort((x, y) => String(x.date).localeCompare(String(y.date))).map(r => ({
    id: 'ifa-' + (r.src || r.test || '') + '-' + String(r.date).slice(0, 10), ifa: true,
    test: [r.title || r.test, r.course].filter(Boolean).join(' · '), date: String(r.date || '').slice(0, 10),
    score: r.tot ?? '', max: r.max ?? '',
    note: Object.entries(r.secs || {}).map(([k, v]) => `${(r.S || []).find(x => x.k === k)?.n || SEC[k] || k} ${v}`).join(', ')
  }));
  return s;
}

/** First switch to IF Admin: carry website accounts, comments and website-only tests over to the IF Admin ids. */
async function buildOverlay(derived) {
  const old = (await S().get('students', { type: 'json' })) || [];
  const overlay = {}, moved = {};
  for (const o of old) {
    const key = phoneKey(o.phone), full = `${o.first} ${o.last}`.trim().toLowerCase();
    const d = (key.length >= 10 && derived.find(s => phoneKey(s.phone) === key)) ||
      derived.find(s => `${s.first} ${s.last}`.trim().toLowerCase() === full);
    if (!d) continue;
    const ov = overlay[d.id] || (overlay[d.id] = {});
    if (o.uid && !ov.uid) ov.uid = o.uid;
    if (o.comments?.length) ov.comments = [...(ov.comments || []), ...o.comments];
    const own = (o.tests || []).filter(t => /placement/i.test(t.test || ''));
    if (own.length) ov.tests = [...(ov.tests || []), ...own];
    if (o.email) ov.email = o.email;
    if (o.parentPhone) ov.parentPhone = o.parentPhone;
    moved[o.id] = d.id;
  }
  // point linked accounts at the IF Admin id
  const dir = (await U().get('directory', { type: 'json' })) || {};
  let dirty = false;
  for (const [uid, e] of Object.entries(dir)) {
    if (!e.studentId || !moved[e.studentId] || moved[e.studentId] === e.studentId) continue;
    const p = await U().get(`u/${uid}/profile`, { type: 'json' });
    if (p) { p.studentId = moved[e.studentId]; await U().setJSON(`u/${uid}/profile`, p); }
    e.studentId = moved[e.studentId]; dirty = true;
  }
  if (dirty) await U().setJSON('directory', dir);
  await S().setJSON('studentOverlay', overlay);
  return overlay;
}

/** Website-shaped student list. */
export async function loadStudents() {
  const [students, groups, payments, settings, results] = await Promise.all(['students', 'groups', 'payments', 'settings', 'results'].map(coll));
  if (!Object.keys(students).length) return (await S().get('students', { type: 'json' })) || structuredClone(seed.students || []);
  const ctx = {
    labels: await groupLabels(groups), payments, months: Object.keys(payments).filter(m => /^\d{4}-\d{2}$/.test(m)).sort(),
    dueDay: Math.min(28, Math.max(1, +settings.main?.dueDay || 5)), results: Object.values(results)
  };
  const list = Object.entries(students).map(([sid, a]) => derive(sid, a, ctx));
  let overlay = await S().get('studentOverlay', { type: 'json' });
  if (!overlay) overlay = await buildOverlay(list);
  for (const s of list) {
    const ov = overlay[s.id]; if (!ov) continue;
    if (ov.uid) s.uid = ov.uid;
    if (ov.comments) s.comments = ov.comments;
    if (ov.email) s.email = ov.email;
    if (ov.parentPhone && !s.parentPhone) s.parentPhone = ov.parentPhone;
    if (ov.tests?.length) s.tests = [...s.tests, ...ov.tests].sort((x, y) => String(x.date).localeCompare(String(y.date)));
  }
  return list;
}

/** Save website-side changes. With IF Admin active, only the website's own fields are kept (IF Admin stays untouched). */
export async function saveStudents(list) {
  if (!(await ifadminActive())) return S().setJSON('students', list);
  const overlay = (await S().get('studentOverlay', { type: 'json' })) || {};
  for (const s of list) {
    if (s.source !== 'ifadmin') continue;
    const ov = {};
    for (const k of OVERLAY_KEYS) if (s[k] != null && s[k] !== '') ov[k] = s[k];
    if (ov.tests) ov.tests = ov.tests.filter(t => !t.ifa);
    if (!ov.tests?.length) delete ov.tests;
    if (!ov.comments?.length) delete ov.comments;
    if (Object.keys(ov).length) overlay[s.id] = ov; else delete overlay[s.id];
  }
  await S().setJSON('studentOverlay', overlay);
}

/** Attendance per student: {sid: [{d, c, m}]} (marks P, UA, EA, FZ). */
export async function loadAttendance() {
  const att = await coll('attendance');
  if (!Object.keys(att).length) return (await S().get('attendance', { type: 'json' })) || {};
  const labels = await groupLabels(await coll('groups'));
  const out = {};
  for (const [gid, bySid] of Object.entries(att)) for (const [sid, days] of Object.entries(bySid || {})) {
    if (!days || typeof days !== 'object') continue;
    const l = out[sid] || (out[sid] = []);
    for (const [d, m] of Object.entries(days)) if (m && /^\d{4}-\d{2}-\d{2}$/.test(d)) l.push({ d, c: labels[gid] || gid, m });
  }
  for (const l of Object.values(out)) l.sort((x, y) => x.d.localeCompare(y.d));
  return out;
}
