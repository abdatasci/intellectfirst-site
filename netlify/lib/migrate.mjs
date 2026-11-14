// One-time data updates shipped with the site: each runs once (marked in store "school" → migrations), the first time
// the site handles a request after the deploy. Only record ids here, never names: this repository is public.
import { getStore } from '@netlify/blobs';

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

const MIGRATIONS = [['timetable-2026-11-14', () => applyTimetable(TT_2026_11_14)]];
let running = null;
/** Run any migration that has not run yet. Safe to call on every request (cached per instance). */
export function migrate() {
  return running || (running = (async () => {
    try {
      const done = (await S().get('migrations', { type: 'json' })) || {};
      for (const [id, fn] of MIGRATIONS) {
        if (done[id]) continue;
        if (!Object.keys((await A().get('c/students', { type: 'json' })) || {}).length) continue;   // IF Admin not loaded yet
        const lines = await fn();
        done[id] = { at: new Date().toISOString(), lines: lines.slice(0, 40) };
        await S().setJSON('migrations', done);
        console.log('migration', id, lines.join(' | '));
      }
    } catch (e) { console.error('migration', e.message); running = null; }
  })());
}
