// Changes planned for a date ("from next week"): a group's name or timetable, a website class (name, teacher, timetable,
// room), a student moving to another group. Saved now in the IF Admin store ('pending'); applied automatically on the
// day (lesson-watch runs every 5 minutes), so this week's registers, reminders and pay stay as they are.
//   { id, from: 'YYYY-MM-DD', kind: 'group', gid, set: { n?, sch? } }
//   { id, from, kind: 'class', classId, set: { label?, teacherId?, schedule?, room? } }
//   { id, from, kind: 'student', sid, set: { g, bg? } }   → g/gs/bg changed; xps[g] = from (counts lessons in the new group from that day)
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
  const groups = await coll('groups'), students = await coll('students'), classes = (await W().get('classes', { type: 'json' })) || [];
  const touched = new Set(), log = [];
  for (const x of due) {
    if (x.kind === 'group' && groups[x.gid]) { Object.assign(groups[x.gid], x.set); touched.add('groups'); log.push(`group ${x.gid}`); }
    if (x.kind === 'class') { const c = classes.find(k => k.id === x.classId); if (c) { Object.assign(c, x.set); touched.add('classes'); log.push(`class ${x.classId}`); } }
    if (x.kind === 'student' && students[x.sid] && x.set.g) {
      const s = students[x.sid]; s.g = x.set.g; s.gs = [x.set.g]; if (x.set.bg) s.bg = x.set.bg;
      s.xps = { ...(s.xps || {}), [x.set.g]: x.from }; touched.add('students'); log.push(`student ${x.sid} → ${x.set.g}`);
    }
    x.done = new Date().toISOString();
  }
  const st = (await A().get('stamp', { type: 'json' })) || {};
  for (const c of ['groups', 'students']) if (touched.has(c)) { await A().setJSON('c/' + c, c === 'groups' ? groups : students); st[c] = Date.now(); }
  if (touched.has('groups') || touched.has('students')) await A().setJSON('stamp', st);
  if (touched.has('classes')) await W().setJSON('classes', classes);
  await A().setJSON('pending', P);
  console.log('pending applied', log.join('; '));
  return log;
}
