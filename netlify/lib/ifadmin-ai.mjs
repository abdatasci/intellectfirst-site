// IF Admin AI assistant: the director writes what happened ("Aru paid 45 000 by Kaspi for November",
// "B1 Teen-B today: all present except Dana, Ali excused") and Claude turns it into a list of exact changes.
// Nothing is written until the director presses Apply; every change is checked again on the server,
// and the collections it touched are saved first so the change can be undone.
import Anthropic from '@anthropic-ai/sdk';

export const AI_MODEL = process.env.IFADMIN_AI_MODEL || 'claude-sonnet-5-5';
const MARKS = { P: 'present', UA: 'absent', EA: 'excused absence', FZ: 'frozen' };
const METHODS = ['Kaspi Transfer', 'Kaspi Invoice', 'Cash', 'Card', 'Bank transfer', 'Barter'];
const STATUSES = ['Paid', 'Partially', 'Pending'];
const STUDENT_ST = ['active', 'frozen', 'left'];
const str = (v, n = 200) => (v == null ? '' : String(v)).replace(/\s+/g, ' ').trim().slice(0, n);
const money = n => Math.round(+n || 0).toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₸';
const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '') && !isNaN(Date.parse(s));
const isMonth = s => /^\d{4}-(0[1-9]|1[0-2])$/.test(s || '');
const num = v => { if (v === '' || v == null) return null; const n = Math.round(+String(v).replace(/[^\d.-]/g, '')); return isFinite(n) ? n : null; };
const today = () => new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10);   // Kostanay time

/* ---------------- lesson packages and payment alerts (same rules as the IF Admin app) ----------------
   A group's package starts at groups[g].ps (pkg lessons, default 8; IELTS and Starters 12). Late joiners count their own
   lessons from students[id].xps[g] (only P and UA count). Individual groups ('ind', 'indn') use students[id].ps / pkg (default 12).
   An alert shows one lesson before a package ends and stays until a new package is started. Recording a payment does NOT clear it. */
const INDG = ['ind', 'indn'], PKG_DEF = { ielts: 12, st: 12 };
const nextDay = d => { const x = new Date(d + 'T12:00:00Z'); x.setUTCDate(x.getUTCDate() + 1); return x.toISOString().slice(0, 10); };
const pkgOf = (D, g) => +((D.groups[g] || {}).pkg) || PKG_DEF[g] || 8;
const psOf = (D, g) => { const G = D.groups[g] || {}; return G.ps || ((G.dates || []).slice().sort()[0]) || ''; };
function cyc(dates, ps, size) { const t = today(), inC = dates.filter(d => d >= ps).sort(), done = inC.filter(d => d <= t).length; return { size, ps, done, last: inC[size - 1] || '', next: inC.find(d => d > t) || '', after: inC[size] || '' }; }
const gCycle = (D, g) => cyc(((D.groups[g] || {}).dates || []).slice(), psOf(D, g), pkgOf(D, g));
function sCycle(D, id, g) { const S = D.students[id] || {}, mk = ((D.attendance?.[g] || {})[id]) || {}, ds = Object.keys(mk).filter(d => mk[d] && mk[d] !== 'FZ').sort(); return cyc(ds, S.ps || ds[0] || '', +S.pkg || 12); }
const stuGroups = S => (S.gs && S.gs.length ? S.gs : [S.g]).filter(Boolean);
function xCycle(D, id, g) {
  if (INDG.includes(g)) return null;
  const S = D.students[id] || {}, G = D.groups[g] || {}, mk = ((D.attendance?.[g] || {})[id]) || {}, gps = psOf(D, g), own = (S.xps || {})[g] || '';
  const ps = own || Object.keys(mk).filter(d => d >= gps && mk[d]).sort()[0] || '';
  if (!ps || !(own || ps > gps)) return null;
  const t = today(), cnt = Object.keys(mk).filter(d => d >= ps && d <= t && (mk[d] === 'P' || mk[d] === 'UA')).sort();
  return { size: pkgOf(D, g), ps, done: cnt.length, lastDone: cnt[cnt.length - 1] || '', next: (G.dates || []).filter(d => d > t).sort()[0] || '' };
}
const remState = c => c.done >= c.size ? 'due' : c.done === c.size - 1 ? 'remind' : 'ok';
export function payAlerts(D) {
  const out = [], act = id => D.students[id].st === 'active' && !D.students[id].nofee;
  for (const g of Object.keys(D.groups || {}).filter(g => !INDG.includes(g) && (D.groups[g].dates || []).length)) {
    const ids = Object.keys(D.students).filter(id => act(id) && stuGroups(D.students[id]).includes(g));
    const xs = ids.map(id => [id, xCycle(D, id, g)]).filter(x => x[1]), xids = new Set(xs.map(x => x[0])), reg = ids.filter(id => !xids.has(id)), c = gCycle(D, g), st = remState(c);
    if (st !== 'ok' && reg.length) out.push({ kind: 'group', group: g, groupName: D.groups[g].n, state: st, lessons: `${Math.min(c.done, c.size)}/${c.size}`, packageStart: c.ps, students: reg.map(id => D.students[id].n) });
    for (const [id, x] of xs) { const s2 = remState(x); if (s2 !== 'ok') out.push({ kind: 'own package (late joiner)', group: g, groupName: D.groups[g].n, student: id, studentName: D.students[id].n, state: s2, lessons: `${x.done}/${x.size}`, packageStart: x.ps }); }
  }
  for (const g of INDG) for (const id of Object.keys(D.students).filter(id => act(id) && stuGroups(D.students[id]).includes(g))) {
    const c = sCycle(D, id, g), st = remState(c); if (st !== 'ok') out.push({ kind: 'individual', group: g, student: id, studentName: D.students[id].n, state: st, lessons: `${Math.min(c.done, c.size)}/${c.size}`, packageStart: c.ps });
  }
  return out;
}

/* ---------------- context for the model ---------------- */
function studentLine(id, s, G) {
  const gs = (s.gs && s.gs.length ? s.gs : [s.g]).filter(Boolean).map(g => `${g}=${G[g]?.n || g}`).join(', ');
  return `${id} | ${s.n} | ${gs || '-'} | ${s.st || 'active'}${s.lv ? ' | ' + s.lv : ''}${s.ph ? ' | ph ' + s.ph : ''}`;
}
function context(D) {
  const G = D.groups || {}, S = D.students || {};
  const groups = Object.entries(G).map(([id, g]) => `${id} | ${g.n} | ${g.sch || '-'} | last lessons: ${(g.dates || []).slice(-4).join(', ') || '-'}`).join('\n');
  const students = Object.entries(S).map(([id, s]) => studentLine(id, s, G)).join('\n');
  const cats = [...new Set(Object.values(D.expenses || {}).flatMap(m => Object.values(m.items || {}).map(e => e.cat)))].join('; ');
  const staff = Object.entries(D.staff || {}).map(([id, f]) => `${id} | ${f.n} | ${f.role || ''}`).join('\n');
  return { groups, students, cats, staff };
}
function system(D) {
  const c = context(D);
  return `You are the IF Admin assistant for Abdoulie Manneh, Founder & Director of IF Academy (a language school in Kostanay, Kazakhstan).
He writes in English or Russian (often short, informal, with typos) what needs to be recorded. Your job: work out exactly which records change, then call propose_changes. Today is ${today()} (Kostanay). Currency: tenge (₸); "45k" = 45000.

DATA MODEL
- attendance: per group, per student, per lesson date: P = present, UA = absent (unexcused), EA = excused absence, FZ = frozen. "" removes a mark.
- payments: per month (YYYY-MM), one row per student: paid, due (monthly fee), disc (discount), method (${METHODS.join(', ')}), date paid, status (Paid / Partially / Pending), note. A payment "for November" goes to month 2026-11 even if paid on another day. If the month is not said, use the current month.
- expenses: per month: date, category, amount, description, method/who paid. Known categories: ${c.cats}.
- students: name, phone, group, level, status (active / frozen / left), note.

RULES
- Match people by name loosely (Latin/Cyrillic spellings, first name only, nicknames). If a name matches several students, or none, do NOT guess: ask a short question instead of proposing.
- For attendance of a whole group ("all present except…"), include every ACTIVE student of that group. Frozen students get FZ only if he says so.
- For a payment, give only the fields he mentioned (paid, method, date, discount, note); the server fills the fee and status from earlier months. A second payment in the same month ADDS to what is already paid: use add_paid for that.
- Before proposing a payment, look up that month's payments. If the student already has a row: when it is fully paid, ask whether this is an extra payment or a correction; when it is part-paid, add to it (add_paid).
- Use the lookup tool when you need existing records (who has paid, past attendance, an expense list) or to answer a question.
- Questions ("who hasn't paid for November?") get a plain answer, no changes.
- ATTENDANCE GRID (Attendance tab): one row per lesson date, one column per student. Use op attendance to mark (it also adds a new lesson date), lesson_move to change a lesson's date (all marks move with it), lesson_remove to delete a lesson date and its marks, group_member to add a student to a group (keeping other groups) or remove them from it.
- PAYMENT ALERTS / REMINDERS on the IF Admin Payments page come from LESSON PACKAGES, not from payment rows. A package is 8 lessons (IELTS and Starters 12; individual students 12). The alert shows one lesson before the package ends and stays until a NEW PACKAGE IS STARTED. Recording a payment does not remove it. When he says someone has paid, or asks to remove someone/a group from the alerts or reminders, propose op "package" (start the next package) for that group or student, plus the payment row if it is not recorded yet. Use lookup kind "alerts" to see the current alerts first.
- For a whole group, use op "package" with the group id. For one student who has their own package (late joiner or individual), use op "package" with student (and group).
- If he attaches a photo or PDF (a receipt, an attendance sheet, a list), read it carefully and turn it into changes; say what you could not read.
- Keep replies short. Never invent students, groups or amounts.

GROUPS (id | name | schedule | recent lesson dates)
${c.groups}

STUDENTS (id | name | groups | status | level | phone)
${c.students}

STAFF
${c.staff}`;
}

const TOOLS = [
  {
    name: 'lookup',
    description: 'Read existing IF Admin records. kind=payments (month), attendance (group, optional month), expenses (month), student (student id: everything about one student), alerts (the current payment alerts from lesson packages).',
    input_schema: { type: 'object', properties: { kind: { type: 'string', enum: ['payments', 'attendance', 'expenses', 'student', 'alerts'] }, month: { type: 'string', description: 'YYYY-MM' }, group: { type: 'string' }, student: { type: 'string' } }, required: ['kind'] }
  },
  {
    name: 'propose_changes',
    description: 'Propose the changes to save. The director sees them and presses Apply. Call once with every change.',
    input_schema: {
      type: 'object', required: ['summary', 'ops'],
      properties: {
        summary: { type: 'string', description: 'One short sentence for the director.' },
        ops: {
          type: 'array', items: {
            type: 'object', required: ['op'],
            properties: {
              op: { type: 'string', enum: ['attendance', 'lesson_move', 'lesson_remove', 'group_member', 'payment', 'expense', 'student', 'student_add', 'package'] },
              to: { type: 'string', description: 'lesson_move: the new date YYYY-MM-DD (date = the old one)' },
              action: { type: 'string', description: 'group_member: add | remove' },
              group: { type: 'string', description: 'attendance: group id; student_add: group id' },
              date: { type: 'string', description: 'YYYY-MM-DD (lesson date, payment date or expense date)' },
              marks: { type: 'object', description: 'attendance: {studentId: "P"|"UA"|"EA"|"FZ"|""}', additionalProperties: { type: 'string' } },
              month: { type: 'string', description: 'payment/expense: YYYY-MM' },
              student: { type: 'string', description: 'student id' },
              paid: { type: 'number', description: 'payment: total paid for the month (replaces)' },
              add_paid: { type: 'number', description: 'payment: amount to ADD to what is already paid this month' },
              due: { type: 'number' }, disc: { type: 'number' },
              method: { type: 'string' }, status: { type: 'string' }, note: { type: 'string' },
              cat: { type: 'string' }, amt: { type: 'number' }, desc: { type: 'string' }, by: { type: 'string', description: 'expense: method or who paid' },
              set: { type: 'object', description: 'student: fields to change {n, ph, st, lv, note, g}', properties: { n: { type: 'string' }, ph: { type: 'string' }, st: { type: 'string' }, lv: { type: 'string' }, note: { type: 'string' }, g: { type: 'string' } } },
              n: { type: 'string', description: 'student_add: full name' }, ph: { type: 'string' }, lv: { type: 'string' }
            }
          }
        }
      }
    }
  }
];

function lookup(D, i) {
  const S = D.students || {};
  const name = id => S[id]?.n || id;
  if (i.kind === 'payments') {
    const m = isMonth(i.month) ? i.month : today().slice(0, 7);
    const rows = D.payments?.[m]?.rows || {};
    const act = Object.entries(S).filter(([, s]) => (s.st || 'active') === 'active');
    return { month: m, rows: Object.entries(rows).map(([id, r]) => ({ id, name: name(id), ...r })), active_without_row: act.filter(([id]) => !rows[id]).map(([id, s]) => ({ id, name: s.n })) };
  }
  if (i.kind === 'attendance') {
    const g = D.groups?.[i.group]; if (!g) return { error: 'no such group' };
    const a = D.attendance?.[i.group] || {}, pre = isMonth(i.month) ? i.month : '';
    const dates = (g.dates || []).filter(d => !pre || d.startsWith(pre)).slice(-12);
    return { group: g.n, dates, marks: Object.fromEntries(Object.entries(a).map(([sid, m]) => [name(sid), Object.fromEntries(dates.filter(d => m[d]).map(d => [d, m[d]]))])) };
  }
  if (i.kind === 'expenses') {
    const m = isMonth(i.month) ? i.month : today().slice(0, 7);
    return { month: m, items: Object.values(D.expenses?.[m]?.items || {}) };
  }
  if (i.kind === 'alerts') return { today: today(), alerts: payAlerts(D) };
  if (i.kind === 'student') {
    const s = S[i.student]; if (!s) return { error: 'no such student' };
    const pays = Object.entries(D.payments || {}).filter(([, p]) => p.rows?.[i.student]).map(([m, p]) => ({ month: m, ...p.rows[i.student] }));
    const att = {}; for (const [g, a] of Object.entries(D.attendance || {})) if (a[i.student]) att[g] = a[i.student];
    return { student: s, payments: pays.slice(-6), attendance: att };
  }
  return { error: 'kind' };
}

/** One chat turn. history: [{role:'user'|'assistant', content:string}]. Returns {reply, ops?, summary?}. */
export async function chat(D, history, files = []) {
  const ai = new Anthropic();
  const msgs = history.slice(-12).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: str(m.content, 4000) || '…' }));
  // photos / PDFs attached to the last message (receipts, attendance sheets, lists)
  const blocks = (files || []).slice(0, 4).map(f => f.type === 'application/pdf' ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: f.data } }
    : /^image\/(jpeg|png|webp|gif)$/.test(f.type) ? { type: 'image', source: { type: 'base64', media_type: f.type, data: f.data } } : null).filter(Boolean);
  if (blocks.length && msgs.at(-1)?.role === 'user') msgs[msgs.length - 1] = { role: 'user', content: [...blocks, { type: 'text', text: msgs.at(-1).content }] };
  for (let step = 0; step < 5; step++) {
    const r = await ai.messages.create({ model: AI_MODEL, max_tokens: 4000, system: system(D), tools: TOOLS, messages: msgs });
    const text = r.content.filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    const uses = r.content.filter(c => c.type === 'tool_use');
    const prop = uses.find(u => u.name === 'propose_changes');
    if (prop) return { reply: text || prop.input.summary || '', summary: str(prop.input.summary, 300), ops: Array.isArray(prop.input.ops) ? prop.input.ops.slice(0, 200) : [] };
    if (!uses.length) return { reply: text || 'Sorry, I did not understand. Could you say it another way?' };
    msgs.push({ role: 'assistant', content: r.content });
    msgs.push({ role: 'user', content: uses.map(u => ({ type: 'tool_result', tool_use_id: u.id, content: JSON.stringify(u.name === 'lookup' ? lookup(D, u.input || {}) : { error: 'unknown tool' }).slice(0, 30000) })) });
  }
  return { reply: 'That needed too many steps. Please split it into smaller requests.' };
}

/* ---------------- check, describe and apply ---------------- */
function lastRow(D, sid, before) {
  const months = Object.keys(D.payments || {}).filter(m => !before || m < before).sort().reverse();
  for (const m of months) { const r = D.payments[m]?.rows?.[sid]; if (r) return r; }
  return null;
}
function normMethod(m) {
  const t = str(m, 40).toLowerCase(); if (!t) return '';
  if (/invoice|сч[её]т/.test(t)) return 'Kaspi Invoice';
  if (/kaspi|каспи|перевод|transfer/.test(t)) return 'Kaspi Transfer';
  if (/cash|нал/.test(t)) return 'Cash';
  if (/card|карт/.test(t)) return 'Card';
  if (/bank|банк/.test(t)) return 'Bank transfer';
  if (/barter|бартер/.test(t)) return 'Barter';
  return METHODS.find(x => x.toLowerCase() === t) || str(m, 40);
}
/**
 * Validates ops against the data and applies them to D (a deep copy is expected).
 * Returns {lines:[{ok, text}], touched:Set, errors:n}.
 */
export function run(D, ops) {
  const S = D.students || (D.students = {}), G = D.groups || (D.groups = {});
  const out = [], touched = new Set(); let errors = 0;
  const bad = t => { out.push({ ok: false, text: t }); errors++; };
  const nm = id => S[id]?.n || id;
  for (const o of (Array.isArray(ops) ? ops : []).slice(0, 200)) {
    try {
      if (o.op === 'attendance') {
        const g = G[o.group]; if (!g) { bad(`Attendance: unknown group “${str(o.group, 40)}”`); continue; }
        if (!isDate(o.date)) { bad(`Attendance ${g.n}: date missing`); continue; }
        const A = (D.attendance ||= {})[o.group] ||= {};
        const parts = [];
        for (const [sid, mk0] of Object.entries(o.marks || {})) {
          const mk = String(mk0 || '').toUpperCase();
          if (!S[sid]) { bad(`Attendance ${g.n}: unknown student ${str(sid, 30)}`); continue; }
          if (mk && !MARKS[mk]) { bad(`Attendance ${g.n} · ${nm(sid)}: unknown mark “${mk}”`); continue; }
          const was = A[sid]?.[o.date] || '';
          if (mk) (A[sid] ||= {})[o.date] = mk; else if (A[sid]) delete A[sid][o.date];
          if (was !== mk) parts.push(`${nm(sid)} ${was ? (MARKS[was] || was) + ' → ' : ''}${mk ? MARKS[mk] : 'cleared'}`);
        }
        if (!(g.dates || []).includes(o.date)) { g.dates = [...(g.dates || []), o.date].sort(); touched.add('groups'); parts.unshift('new lesson date added'); }
        touched.add('attendance');
        out.push({ ok: true, text: `Attendance · ${g.n} · ${o.date}: ${parts.join('; ') || 'no change'}` });
      } else if (o.op === 'payment') {
        const sid = o.student; if (!S[sid]) { bad(`Payment: unknown student ${str(sid, 30)}`); continue; }
        const m = isMonth(o.month) ? o.month : (isDate(o.date) ? o.date.slice(0, 7) : today().slice(0, 7));
        const doc = (D.payments ||= {})[m] ||= { rows: {} }; doc.rows ||= {};
        const prev = doc.rows[sid] ? { ...doc.rows[sid] } : null;
        const base = lastRow(D, sid, m);
        const r = prev ? { ...prev } : { d: '', disc: 0, due: base?.due || 0, m: '', note: '', paid: 0, s: '' };
        const due = num(o.due), disc = num(o.disc), paid = num(o.paid), add = num(o.add_paid);
        if (due != null) r.due = Math.max(0, due);
        if (disc != null) r.disc = Math.max(0, disc);
        if (paid != null) r.paid = Math.max(0, paid);
        if (add != null) r.paid = Math.max(0, (+r.paid || 0) + add);
        if (o.method) r.m = normMethod(o.method);
        if (isDate(o.date)) r.d = o.date; else if (add != null || (paid != null && !r.d)) r.d = today();
        if (o.note != null) r.note = str(o.note, 300);
        const st = STATUSES.find(x => x.toLowerCase() === String(o.status || '').toLowerCase());
        r.s = st || (r.paid > 0 && r.paid >= (r.due || 0) - (r.disc || 0) ? 'Paid' : r.paid > 0 ? 'Partially' : 'Pending');
        doc.rows[sid] = r; touched.add('payments');
        const ch = [];
        if (!prev) ch.push('new row');
        if (!prev || prev.paid !== r.paid) ch.push(`paid ${prev ? money(prev.paid) + ' → ' : ''}${money(r.paid)}`);
        if (!prev || prev.due !== r.due) ch.push(`fee ${money(r.due)}${!prev && due == null ? (base ? ' (from earlier months)' : ' (no earlier fee found: set it)') : ''}`);
        if (r.disc && (!prev || prev.disc !== r.disc)) ch.push(`discount ${money(r.disc)}`);
        if (r.m && (!prev || prev.m !== r.m)) ch.push(r.m);
        if (r.d && (!prev || prev.d !== r.d)) ch.push(`date ${r.d}`);
        if (!prev || prev.s !== r.s) ch.push(`status ${r.s}`);
        if (o.note) ch.push(`note “${r.note}”`);
        out.push({ ok: !!r.due || r.paid > 0, text: `Payment · ${m} · ${nm(sid)}: ${ch.join(', ')}` });
      } else if (o.op === 'expense') {
        const amt = num(o.amt); if (!(amt > 0)) { bad('Expense: amount missing'); continue; }
        const d = isDate(o.date) ? o.date : today();
        const m = isMonth(o.month) ? o.month : d.slice(0, 7);
        const doc = (D.expenses ||= {})[m] ||= { items: {} }; doc.items ||= {};
        const pre = 'e' + m.replace('-', ''); let k = 0; while (doc.items[pre + String(k).padStart(2, '0')]) k++;
        const id = pre + String(k).padStart(2, '0');
        doc.items[id] = { amt, cat: str(o.cat, 80) || 'Other expense', d, desc: str(o.desc, 200), fix: false, m: str(o.by || o.method, 60) };
        touched.add('expenses');
        out.push({ ok: true, text: `Expense · ${m} · ${d}: ${money(amt)} · ${doc.items[id].cat}${doc.items[id].desc ? ' · ' + doc.items[id].desc : ''}${doc.items[id].m ? ' · ' + doc.items[id].m : ''}` });
      } else if (o.op === 'student') {
        const s = S[o.student]; if (!s) { bad(`Student: unknown ${str(o.student, 30)}`); continue; }
        const set = o.set || {}, ch = [];
        if (set.n && str(set.n, 80) !== s.n) { ch.push(`name ${s.n} → ${str(set.n, 80)}`); s.n = str(set.n, 80); }
        if (set.ph != null && str(set.ph, 30) !== (s.ph || '')) { ch.push(`phone → ${str(set.ph, 30)}`); s.ph = str(set.ph, 30); }
        if (set.lv != null && str(set.lv, 20) !== (s.lv || '')) { ch.push(`level → ${str(set.lv, 20)}`); s.lv = str(set.lv, 20); }
        if (set.st) { const st = STUDENT_ST.find(x => x === String(set.st).toLowerCase()) || ({ withdrawn: 'left', paused: 'frozen', finished: 'left' })[String(set.st).toLowerCase()]; if (!st) { bad(`Student ${s.n}: unknown status “${str(set.st, 20)}”`); continue; } if (st !== s.st) { ch.push(`status ${s.st || 'active'} → ${st}`); s.st = st; } }
        if (set.g) { if (!G[set.g]) { bad(`Student ${s.n}: unknown group “${str(set.g, 30)}”`); continue; } if (set.g !== s.g) { ch.push(`group ${G[s.g]?.n || s.g || '-'} → ${G[set.g].n}`); s.g = set.g; s.gs = [set.g]; s.bg = G[set.g].n; } }
        if (set.note != null) { ch.push(`note “${str(set.note, 300)}”`); s.note = str(set.note, 500); }
        touched.add('students');
        out.push({ ok: true, text: `Student · ${s.n}: ${ch.join(', ') || 'no change'}` });
      } else if (o.op === 'lesson_move' || o.op === 'lesson_remove') {
        const g = G[o.group]; if (!g) { bad(`Lesson date: unknown group “${str(o.group, 40)}”`); continue; }
        if (!isDate(o.date) || !(g.dates || []).includes(o.date)) { bad(`${g.n}: there is no lesson on ${str(o.date, 12) || '(no date)'}`); continue; }
        const A = (D.attendance ||= {})[o.group] ||= {};
        if (o.op === 'lesson_move') {
          if (!isDate(o.to)) { bad(`${g.n}: new date missing`); continue; }
          if (g.dates.includes(o.to)) { bad(`${g.n}: there is already a lesson on ${o.to}`); continue; }
          g.dates = g.dates.map(d => d === o.date ? o.to : d).sort();
          for (const m of Object.values(A)) if (m[o.date] !== undefined) { m[o.to] = m[o.date]; delete m[o.date]; }
          out.push({ ok: true, text: `Lesson moved · ${g.n}: ${o.date} → ${o.to} (marks moved too)` });
        } else {
          const n = Object.values(A).filter(m => m[o.date]).length;
          g.dates = g.dates.filter(d => d !== o.date);
          for (const m of Object.values(A)) delete m[o.date];
          out.push({ ok: true, text: `Lesson deleted · ${g.n}: ${o.date}${n ? ` (${n} mark${n > 1 ? 's' : ''} removed)` : ''}` });
        }
        touched.add('groups'); touched.add('attendance');
      } else if (o.op === 'group_member') {
        const st = S[o.student], g = G[o.group];
        if (!st) { bad(`Group: unknown student ${str(o.student, 30)}`); continue; }
        if (!g) { bad(`Group: unknown group “${str(o.group, 30)}”`); continue; }
        const gs = stuGroups(st);
        if (o.action === 'remove') {
          if (!gs.includes(o.group)) { bad(`${st.n} is not in ${g.n}`); continue; }
          st.gs = gs.filter(x => x !== o.group); st.g = st.gs[0] || ''; st.bg = G[st.g]?.n || '';
          out.push({ ok: true, text: `Group · ${st.n}: removed from ${g.n}${st.gs.length ? '' : ' (no group now)'}` });
        } else {
          if (gs.includes(o.group)) { bad(`${st.n} is already in ${g.n}`); continue; }
          st.gs = [...gs, o.group]; if (!st.g) { st.g = o.group; st.bg = g.n; }
          out.push({ ok: true, text: `Group · ${st.n}: added to ${g.n}${gs.length ? ' (also stays in ' + gs.map(x => G[x]?.n || x).join(', ') + ')' : ''}` });
        }
        touched.add('students');
      } else if (o.op === 'package') {
        // start the next lesson package (what IF Admin's "Start new package" button does)
        const sid = o.student && S[o.student] ? o.student : null;
        const g = o.group && G[o.group] ? o.group : sid ? stuGroups(S[sid]).find(x => INDG.includes(x) || xCycle(D, sid, x)) || stuGroups(S[sid])[0] : null;
        if (!g) { bad(`New package: unknown group or student`); continue; }
        D.attendance ||= {};
        if (sid && INDG.includes(g)) {
          const c = sCycle(D, sid, g); S[sid].ps = c.after || nextDay(c.last || today()); touched.add('students');
          out.push({ ok: true, text: `New package · ${S[sid].n} (individual): starts ${S[sid].ps}` });
        } else if (sid && xCycle(D, sid, g)) {
          const x = xCycle(D, sid, g); S[sid].xps = { ...(S[sid].xps || {}), [g]: nextDay(x.lastDone || today()) }; touched.add('students');
          out.push({ ok: true, text: `New package · ${S[sid].n} (${G[g].n}, own package): starts after ${x.lastDone || today()}, alert removed` });
        } else {
          const c = gCycle(D, g);
          for (const id of Object.keys(S).filter(id => S[id].st === 'active' && !S[id].nofee && stuGroups(S[id]).includes(g))) {
            const x = xCycle(D, id, g); if (x && !(S[id].xps || {})[g]) { S[id].xps = { ...(S[id].xps || {}), [g]: x.ps }; touched.add('students'); }
          }
          G[g].ps = c.after || nextDay(c.last || today()); touched.add('groups');
          out.push({ ok: true, text: `New package · ${G[g].n}: starts ${G[g].ps} (${c.done}/${c.size} lessons done), alert removed${sid ? ' (for the whole group)' : ''}` });
        }
      } else if (o.op === 'student_add') {
        const n = str(o.n, 80); if (!n) { bad('New student: name missing'); continue; }
        if (o.group && !G[o.group]) { bad(`New student ${n}: unknown group “${str(o.group, 30)}”`); continue; }
        let k = 1; for (const id of Object.keys(S)) { const x = +(id.match(/^s(\d+)$/) || [])[1]; if (x >= k) k = x + 1; }
        const id = 's' + String(k).padStart(2, '0');
        S[id] = { bg: G[o.group]?.n || '', g: o.group || '', gs: o.group ? [o.group] : [], n, note: '', ph: str(o.ph, 30), st: 'active', ...(o.lv ? { lv: str(o.lv, 20) } : {}) };
        touched.add('students');
        out.push({ ok: true, text: `New student · ${n}${o.group ? ' · ' + G[o.group].n : ''}${o.ph ? ' · ' + str(o.ph, 30) : ''}${o.lv ? ' · ' + str(o.lv, 20) : ''}` });
      } else bad(`Unknown change “${str(o.op, 20)}”`);
    } catch (e) { bad('Could not read one change'); }
  }
  return { lines: out, touched, errors };
}
