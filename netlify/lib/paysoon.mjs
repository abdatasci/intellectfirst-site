// "💳 Payments due" in the staff bot, a week ahead: which groups and students must pay in the next 7 days.
// Packages are counted as the daily alerts count them (8 lessons, 12 for IELTS and Starters; late joiners by their own
// P/UA marks); the date is the first lesson of the next package, taken from the timetable (cancellations and moves
// included). Monthly payers (due day) are added from the website roster. Director and manager only.
import { getStore } from '@netlify/blobs';
import { doc, loadChanges, money, payStatus, ymd } from './bot-core.mjs';
import { lessonsOn } from './lessons.mjs';

const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
const coll = async c => (await A().get('c/' + c, { type: 'json' })) || {};
const addDays = (d, n) => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const dm = d => d.slice(8, 10) + '.' + d.slice(5, 7);
const DOW = d => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(d + 'T00:00:00Z').getUTCDay()];

export async function paymentsAhead(days = 7) {
  const today = ymd(new Date()), end = addDays(today, days);
  const [G, S, Att, P, classes, CH, roster] = await Promise.all([coll('groups'), coll('students'), coll('attendance'), coll('payments'), doc('classes'), loadChanges(), doc('students')]);
  // timetable lessons still to come (today's lesson counts if its register is not taken yet)
  const future = {};
  for (let i = 0; i <= days + 21; i++) {
    const d = addDays(today, i);
    for (const l of lessonsOn(classes, d, CH)) if (!l.cancelled && !l.movedTo) (future[l.classId] = future[l.classId] || []).push(d);
  }
  const classOf = g => classes.find(c => c.group === g) || classes.find(c => c.id === 'c-' + g);
  const row = (id, d) => ((P[d.slice(0, 7)] || {}).rows || {})[id];
  const paidFor = (id, d) => { const r = row(id, d); return !!(r && +r.paid > 0 && (+r.paid >= (+r.due || 0) - (+r.disc || 0)) && r.d && r.d >= addDays(d, -10)); };
  const owed = (id, d) => { const r = row(id, d) || Object.values(P).map(m => (m.rows || {})[id]).filter(Boolean).pop(); return r ? (+r.due || 0) - (+r.disc || 0) : 0; };
  const items = [];
  for (const [g, gr] of Object.entries(G)) {
    if (g === 'ind' || g === 'indn' || !(gr.dates || []).length) continue;
    const cls = classOf(g); if (!cls) continue;
    const size = +gr.pkg || (g === 'ielts' || g === 'st' ? 12 : 8), dates = [...gr.dates].sort(), ps = gr.ps || dates[0];
    const fut = (future[cls.id] || []).filter(d => !dates.includes(d));
    const members = Object.entries(S).filter(([, s]) => s.st === 'active' && !s.nofee && (s.gs && s.gs.length ? s.gs : [s.g]).includes(g));
    const regular = [], groupDone = dates.filter(d => d >= ps).length;
    const next = n => { const k = n % size; return n > 0 && k === 0 ? (fut[0] || today) : fut[size - k] || null; };   // full packages are paid; a finished one: the next lesson starts the new one
    const gDue = next(groupDone);
    for (const [id, s] of members) {
      const own = (s.xps || {})[g];
      if (own) {   // late joiner: own lessons (P/UA) since their own start
        const mk = (Att[g] || {})[id] || {}, n = Object.keys(mk).filter(d => d >= own && (mk[d] === 'P' || mk[d] === 'UA')).length;
        const d = own > today ? null : next(n);
        if (d && d <= end) items.push({ date: d, group: gr.n || cls.label, names: [{ n: s.n, paid: paidFor(id, d), amt: owed(id, d) }], own: `${n % size || (n ? size : 0)}/${size}` });
      } else regular.push([id, s]);
    }
    if (gDue && gDue <= end && regular.length) items.push({ date: gDue, group: gr.n || cls.label, names: regular.map(([id, s]) => ({ n: s.n, paid: paidFor(id, gDue), amt: owed(id, gDue) })), done: `${groupDone % size || (groupDone ? size : 0)}/${size}` });
  }
  // monthly payers with a due day (website roster)
  for (const s of roster) {
    if (/withdrawn|finished|frozen/i.test(s.status || '')) continue;
    const p = payStatus(s); if (!p || p.paid || !p.dueDate || p.daysToDue == null || p.daysToDue < 0 || p.daysToDue > days) continue;
    items.push({ date: p.dueDate, group: 'Monthly', names: [{ n: `${s.first} ${s.last}`.trim(), paid: false, amt: p.fee }] });
  }
  return items.sort((a, b) => a.date.localeCompare(b.date) || a.group.localeCompare(b.group));
}

export function aheadText(items, days = 7, max = 2600) {
  const t = aheadText0(items, days); return t.length > max ? t.slice(0, max).replace(/\n[^\n]*$/, '') + '\n… more on intellectfirst.com/me/#/admin/payments' : t;
}
function aheadText0(items, days) {
  if (!items.length) return `📅 Next ${days} days: no packages end and no payments fall due.`;
  const by = {}; items.forEach(x => (by[x.date] = by[x.date] || []).push(x));
  return `📅 Next ${days} days — payment due by:\n` + Object.keys(by).sort().map(d => `\n${DOW(d)} ${dm(d)}\n` + by[d].map(x =>
    `• ${x.group}${x.done ? ` (${x.done} lessons done)` : x.own ? ` · own package ${x.own}` : ''}\n` + x.names.map(n => `   ${n.paid ? '✅' : '◻️'} ${n.n}${n.amt ? ' · ' + money(n.amt) : ''}`).join('\n')).join('\n')).join('\n') +
    '\n\n✅ already paid · ◻️ still to pay';
}
