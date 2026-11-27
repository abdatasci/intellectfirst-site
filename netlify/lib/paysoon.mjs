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
  const pend = ((await A().get('pending', { type: 'json' })) || []).filter(x => x.kind === 'class' && !x.done && x.set);
  const future = {};
  for (let i = 0; i <= days + 21; i++) {
    const d = addDays(today, i);
    const cl = pend.length ? classes.map(c => { const ch = pend.filter(x => x.classId === c.id && x.from <= d); return ch.length ? Object.assign({}, c, ...ch.map(x => x.set)) : c; }) : classes;   // timetable changes already planned
    for (const l of lessonsOn(cl, d, CH)) if (!l.cancelled && !l.movedTo) (future[l.classId] = future[l.classId] || []).push(d);
  }
  const classOf = g => classes.find(c => c.id === 'c-' + g) || classes.find(c => c.group === g && !/\(individual/i.test(c.label || ''));
  const row = (id, d) => ((P[d.slice(0, 7)] || {}).rows || {})[id];
  const paidFor = (id, d) => { const r = row(id, d); return !!(r && +r.paid > 0 && (+r.paid >= (+r.due || 0) - (+r.disc || 0)) && r.d && r.d >= addDays(d, -10)); };
  const owed = (id, d) => { const r = row(id, d) || Object.values(P).map(m => (m.rows || {})[id]).filter(Boolean).pop(); return r ? (+r.due || 0) - (+r.disc || 0) : 0; };
  const items = [];
  for (const [g, gr] of Object.entries(G)) {
    if (g === 'ind' || g === 'indn' || !(gr.dates || []).length) continue;
    const cls = classOf(g); if (!cls) continue;
    const size = +gr.pkg || (g === 'ielts' || g === 'st' ? 12 : 8), dates = [...gr.dates].sort(), ps = gr.ps || dates[0];
    const att = Att[g] || {}, held = d => d < today || (d === today && Object.values(att).some(m => m && m[d]));   // a lesson counts once it has happened (today: once the register is in)
    const fut = (future[cls.id] || []).filter(d => !(dates.includes(d) && held(d)));
    const members = Object.entries(S).filter(([, s]) => s.st === 'active' && !s.nofee && (s.gs && s.gs.length ? s.gs : [s.g]).includes(g));
    const regular = [], groupDone = dates.filter(d => d >= ps && held(d)).length;
    const next = n => { const k = n % size; return n > 0 && k === 0 ? (fut[0] || today) : fut[size - k] || null; };   // full packages are paid; a finished one: the next lesson starts the new one
    const gDue = next(groupDone);
    for (const [id, s] of members) {
      const own = (s.xps || {})[g];
      if (own) {   // late joiner: own lessons (P/UA) since their own start
        const mk = (Att[g] || {})[id] || {}, n = Object.keys(mk).filter(d => d >= own && held(d) && (mk[d] === 'P' || mk[d] === 'UA')).length;
        const d = own > today ? null : next(n);
        if (d && d <= end) items.push({ date: d, group: gr.n || cls.label, names: [{ id, n: s.n, paid: paidFor(id, d), amt: owed(id, d) }], own: `${n % size || (n ? size : 0)}/${size}` });
      } else regular.push([id, s]);
    }
    if (gDue && gDue <= end && regular.length) items.push({ date: gDue, group: gr.n || cls.label, names: regular.map(([id, s]) => ({ id, n: s.n, paid: paidFor(id, gDue), amt: owed(id, gDue) })), done: `${groupDone % size || (groupDone ? size : 0)}/${size}` });
  }
  // monthly payers with a due day (website roster)
  for (const s of roster) {
    if (/withdrawn|finished|frozen/i.test(s.status || '')) continue;
    const p = payStatus(s); if (!p || p.paid || !p.dueDate || p.daysToDue == null || p.daysToDue < 0 || p.daysToDue > days) continue;
    items.push({ date: p.dueDate, group: 'Monthly', names: [{ n: `${s.first} ${s.last}`.trim(), paid: false, amt: p.fee }] });
  }
  return items.sort((a, b) => a.date.localeCompare(b.date) || a.group.localeCompare(b.group));
}

/* Students and parents: a reminder 7 days and 3 days before the payment date of their next package (Telegram + website).
   Once a day (10:00–13:00 Kostanay); monthly payers keep their own reminders. A 3-day reminder already sent by the
   monthly payment line for the same date is not repeated. */
const PTX = {
  en: (f, g, a, d, n) => `💳 Hi ${f}! Your ${g} package finishes soon. The next payment${a ? ' of ' + a : ''} is due on ${d} (in ${n} days). Please pay before the lesson. Thank you!`,
  ru: (f, g, a, d, n) => `💳 Здравствуйте, ${f}! Скоро заканчивается абонемент группы «${g}». Следующая оплата${a ? ' (' + a + ')' : ''} — до ${d} (через ${n} ${n === 3 ? 'дня' : 'дней'}). Пожалуйста, оплатите до занятия. Спасибо!`,
  kk: (f, g, a, d, n) => `💳 Сәлеметсіз бе, ${f}! «${g}» тобының абонементі жақында аяқталады. Келесі төлем${a ? ' (' + a + ')' : ''} — ${d} күнге дейін (${n} күннен кейін). Рақмет!`
};
export async function packageReminders({ links, bySid, roster, send, note, button }) {
  const now = new Date(), h = (now.getUTCHours() + 5) % 24; if (h < 10 || h >= 13) return 0;
  const today = ymd(now), store = getStore({ name: 'school', consistency: 'strong' }), key = 'bot/paysoon-sent/' + today.slice(0, 7);
  const sent = (await store.get(key, { type: 'json' })) || {};
  let n = 0;
  for (const it of await paymentsAhead(7)) {
    if (it.group === 'Monthly') continue;
    const days = Math.round((Date.parse(it.date) - Date.parse(today)) / 86400000); if (days !== 7 && days !== 3) continue;
    for (const s of it.names) {
      if (s.paid || !s.id) continue;
      const k = `${s.id}|${it.date}|${days}`; if (sent[k]) continue;
      const r = roster.find(x => x.id === s.id);
      if (days === 3 && r && ((r.pay || {}).dueDates || {})[it.date.slice(0, 7)] === it.date) { sent[k] = 'monthly'; continue; }
      const uids = [bySid[s.id], links['sid:' + s.id] ? 'sid:' + s.id : null].filter(Boolean), first = (r && r.first) || String(s.n).split(' ')[0];
      for (const u of uids) {
        const l = links[u], lang = PTX[l?.lang] ? l.lang : 'ru', txt = PTX[lang](first, it.group, s.amt ? money(s.amt) : '', `${DOW(it.date)} ${dm(it.date)}`, days);
        if (l && l.chatId) { try { await send(l.chatId, txt, button ? button(lang) : undefined); n++; } catch (e) { console.error('package reminder', s.id, e.message); } }
        if (!u.startsWith('sid:')) await note(u, { kind: 'payBefore', text: PTX[l ? lang : 'en'](first, it.group, s.amt ? money(s.amt) : '', `${DOW(it.date)} ${dm(it.date)}`, days) }).catch(() => {});
      }
      sent[k] = new Date().toISOString();
    }
  }
  await store.setJSON(key, sent);
  return n;
}

export function aheadText(items, days = 7, max = 2600) {
  const t = aheadText0(items, days); return t.length > max ? t.slice(0, max).replace(/\n[^\n]*$/, '') + '\n… more on intellectfirst.com/me/#/admin/payments' : t;
}
function aheadText0(items, days) {
  if (!items.length) return `📅 Next ${days} days: no packages end and no payments fall due.`;
  const by = {}; items.forEach(x => (by[x.date] = by[x.date] || []).push(x));
  return `📅 Next ${days} days — payment due by:\n` + Object.keys(by).sort().map(d => `\n${DOW(d)} ${dm(d)}\n` + by[d].map(x =>
    `• ${x.group}${x.done ? (x.done.split('/')[0] === x.done.split('/')[1] ? ' (package finished)' : ` (${x.done} lessons done)`) : x.own ? ` · own package ${x.own}` : ''}\n` + x.names.map(n => `   ${n.paid ? '✅' : '◻️'} ${n.n}${n.amt ? ' · ' + money(n.amt) : ''}`).join('\n')).join('\n')).join('\n') +
    '\n\n✅ already paid · ◻️ still to pay';
}
