// Changes planned for a date ("from next week"): a group's name or timetable, a website class (name, teacher, timetable,
// room), a student moving to another group. Saved now in the IF Admin store ('pending'); applied automatically on the
// day (lesson-watch runs every 5 minutes), so this week's registers, reminders and pay stay as they are.
//   { id, from: 'YYYY-MM-DD', kind: 'group', gid, set: { n?, sch? } }
//   { id, from, kind: 'class', classId, set: { label?, teacherId?, schedule?, room? } }
//   { id, from, kind: 'student', sid, set: { g, bg?, xps? } }   → g/gs/bg changed. Lessons already attended in the current package carry
//     over (director, 25 Nov 2026: students pay for what they attended, whatever the group): the marks since the package
//     started in the old group are copied into the new group's attendance and xps[new group] = that package start.
import { getStore } from '@netlify/blobs';

const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
const W = () => getStore({ name: 'school', consistency: 'strong' });
const today = () => new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10);   // Kostanay (UTC+5)

export async function loadPending() { return (await A().get('pending', { type: 'json' })) || []; }
export async function addPending(items) {
  const P = await loadPending();
  for (const it of items || []) {
    if (!it || !/^\d{4}-\d{2}-\d{2}$/.test(it.from || '') || !['group', 'class', 'student'].includes(it.kind) || !it.set) continue;
    it.id = it.id || `${it.kind}-${it.gid || it.classId || it.sid}-${it.from}`;
    const i = P.findIndex(x => x.id === it.id); if (i >= 0) P[i] = it; else P.push(it);
  }
  await A().setJSON('pending', P); return P;
}
export async function applyPending(day = today()) {
  const P = await loadPending(), due = P.filter(x => x.from <= day && !x.done);
  if (!due.length) return [];
  const coll = async c => (await A().get('c/' + c, { type: 'json' })) || {};
  const groups = await coll('groups'), students = await coll('students'), att = await coll('attendance'), classes = (await W().get('classes', { type: 'json' })) || [];
  const touched = new Set(), log = [];
  for (const x of due) {
    if (x.kind === 'group' && groups[x.gid]) { Object.assign(groups[x.gid], x.set); touched.add('groups'); log.push(`group ${x.gid}`); }
    if (x.kind === 'class') { const c = classes.find(k => k.id === x.classId); if (c) { Object.assign(c, x.set); touched.add('classes'); log.push(`class ${x.classId}`); } }
    if (x.kind === 'student' && students[x.sid] && x.set.g) {
      const s = students[x.sid], og = s.g, ng = x.set.g, G = groups[og] || {};
      // where the current package began: full packages (size lessons) since the start are skipped; the rest carries over
      const mk = (att[og] || {})[x.sid] || {}, size = +G.pkg || ({ ielts: 12, st: 12 })[og] || 8, own = (s.xps || {})[og];
      const base = own ? Object.keys(mk).filter(d => mk[d] === 'P' || mk[d] === 'UA') : (G.dates || []);
      const ps = own || G.ps || ((G.dates || []).slice().sort()[0]) || x.from, ds = base.filter(d => d >= ps && d < x.from).sort();
      const cur = ds[Math.floor(ds.length / size) * size] || null;   // null: the last package is complete, nothing to carry
      const carry = cur && !x.set.xps ? Object.keys(mk).filter(d => d >= cur && d < x.from && mk[d]) : [];   // set.xps: the new package start is given (pays with the old group)
      if (carry.length) { att[ng] = att[ng] || {}; const to = att[ng][x.sid] = att[ng][x.sid] || {}; for (const d of carry) if (!to[d]) to[d] = mk[d]; touched.add('attendance'); }
      s.g = ng; s.gs = [ng]; if (x.set.bg) s.bg = x.set.bg;
      s.xps = { ...(s.xps || {}), [ng]: x.set.xps || (carry.length ? carry.sort()[0] : x.from) }; touched.add('students');
      log.push(`student ${x.sid} ${og} → ${ng} (${carry.length} lessons carried over)`);
    }
    x.done = new Date().toISOString();
  }
  const st = (await A().get('stamp', { type: 'json' })) || {};
  const V = { groups, students, attendance: att };
  for (const c of ['groups', 'students', 'attendance']) if (touched.has(c)) { await A().setJSON('c/' + c, V[c]); st[c] = Date.now(); }
  if (['groups', 'students', 'attendance'].some(c => touched.has(c))) await A().setJSON('stamp', st);
  if (touched.has('classes')) await W().setJSON('classes', classes);
  await A().setJSON('pending', P);
  console.log('pending applied', log.join('; '));
  return log;
}
