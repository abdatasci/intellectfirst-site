// The manager's to-do list, worked out from the school's own data — and the reminders that chase it.
//   attendance   lessons that have ended without a clock-in, or with a clock-in but no register (last 7 days)
//   reschedule   lessons cancelled in the last 14 days with no make-up lesson for that class afterwards
//   payment      tuition overdue (IF Admin), and payment receipts waiting to be confirmed
//   accounts     website access requests waiting for approval; student feedback waiting for a decision
// Sent to the manager (administrators other than the director, or anyone marked as manager) on Telegram, on the
// website (notifications + the admin page) and on the school's WhatsApp — again every 2 hours (09:00–21:00 Kostanay
// time) for as long as anything is still open, and at once whenever something new appears.
import { getStore } from '@netlify/blobs';
import { doc, getLinks, loadChanges, payStatus, money, tgSend, tgToken, addNote, local, ymd } from './bot-core.mjs';
import { lessonsOn, loadLog, withEntry, since, today } from './lessons.mjs';
import { listReceipts } from './receipts.mjs';
import { loadFeedback } from './feedback.mjs';
import { waReady, waSend } from './whatsapp.mjs';
import { openCoverRequests } from './cover.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const DIRECTOR = 't-abdoulie';
const REPEAT_MS = 2 * 3600e3;
const dshort = d => d.slice(8) + '.' + d.slice(5, 7);
const addDays = (d, n) => new Date(Date.parse(d + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10);

/** Everything open right now: [{key, kind, text, link}] */
export async function openTasks(now = new Date()) {
  const out = [], d0 = today();
  const [classes, teachers, students] = await Promise.all([doc('classes'), doc('teachers'), doc('students')]);
  const CH = await loadChanges(), cutoff = await since(), tName = id => (teachers.find(t => t.id === id) || {}).name || 'no teacher';
  const logs = {};
  const logOf = async m => logs[m] || (logs[m] = await loadLog(m));
  // attendance: last 7 days, lessons already over
  for (let i = 0; i < 7; i++) {
    const date = addDays(d0, -i), L = await logOf(date.slice(0, 7));
    for (const l of withEntry(lessonsOn(classes, date, CH), L, now, cutoff)) {
      if (l.cancelled || l.movedTo || l.state === 'cancelled' || l.state === 'moved' || Date.parse(l.endAt) > now.getTime()) continue;
      const e = l.entry || {};
      if (l.state === 'missed') out.push({ key: `att:${l.key}`, kind: 'attendance', text: `Clock-in and register missing: ${l.label}, ${dshort(date)} ${l.start} (${tName(l.teacherId)})`, link: '/me/#/admin/lessons' });
      else if ((e.checkIn) && !e.takenAt && !e.cancelled) out.push({ key: `reg:${l.key}`, kind: 'attendance', text: `Register not taken: ${l.label}, ${dshort(date)} ${l.start} (${tName(l.teacherId)})`, link: '/me/#/admin/lessons' });
    }
  }
  // reschedule: cancelled lessons with no make-up afterwards (extra lesson for the same class on or after that day)
  for (const [k, c] of Object.entries(CH.cancel || {})) {
    const [cid, date] = k.split('|'); if (!date || date < addDays(d0, -14)) continue;
    const made = (CH.extra || []).some(x => x.classId === cid && x.date >= date) || Object.values(CH.moves || {}).some(m => m && m.from === k);
    if (made || c.noMakeup) continue;
    const cl = classes.find(x => x.id === cid); if (!cl) continue;
    out.push({ key: `rs:${k}`, kind: 'reschedule', text: `Arrange a make-up lesson: ${cl.label} — the lesson on ${dshort(date)} was cancelled${c.note ? ' (' + c.note + ')' : ''}`, link: '/me/#/calendar' });
  }
  // cover requests nobody has accepted yet
  for (const r of await openCoverRequests()) out.push({ key: `cov:${r.id}`, kind: 'reschedule', text: `Find a cover teacher: ${r.label}, ${r.when} (${tName(r.from)} can't teach it)`, link: '/me/#/calendar' });
  // payments overdue
  for (const s of students) {
    if (/withdrawn|finished|frozen/i.test(s.status || '')) continue;
    const p = payStatus(s, now); if (!p || p.state !== 'overdue') continue;
    out.push({ key: `pay:${s.id}:${p.month}`, kind: 'payment', text: `Tuition overdue: ${`${s.first} ${s.last}`.trim()} — ${money(p.fee) || 'fee'} for ${p.month} (due ${dshort(p.dueDate)})`, link: '/me/#/admin/payments' });
  }
  // receipts waiting
  for (const r of (await listReceipts()).filter(r => r.status === 'pending')) out.push({ key: `rc:${r.id}`, kind: 'payment', text: `Confirm payment receipt: ${r.name || 'a student'}${r.amount ? ' — ' + money(r.amount) : ''}`, link: '/me/#/admin/receipts' });
  // access requests and feedback
  const dir = (await U().get('directory', { type: 'json' })) || {};
  for (const [uid, a] of Object.entries(dir)) if (a.request && !a.declined) out.push({ key: `acc:${uid}`, kind: 'accounts', text: `Approve or decline website access: ${a.name || 'new account'}`, link: '/me/#/admin/accounts' });
  for (const f of (await loadFeedback()).filter(f => f.status === 'pending')) out.push({ key: `fb:${f.id}`, kind: 'accounts', text: `Student feedback waiting: ${f.name || ''}`, link: '/me/#/admin/feedback' });
  const done = new Set(((await S().get('tasks/state', { type: 'json' })) || {}).dismissed || []);
  return out.filter(t => !done.has(t.key));
}
/** "Done / not needed" from the admin page: hides one task for good. */
export async function dismissTask(key) {
  const st = (await S().get('tasks/state', { type: 'json' })) || { seen: [], lastAt: 0 };
  st.dismissed = [...new Set([...(st.dismissed || []), String(key).slice(0, 200)])].slice(-500);
  await S().setJSON('tasks/state', st);
}

/** Who receives the reminders: administrators other than the director, and anyone marked as manager. */
async function managers() {
  const dir = (await U().get('directory', { type: 'json' })) || {}, out = [];
  for (const [uid, a] of Object.entries(dir)) {
    if (a.role !== 'admin' && a.role !== 'teacher') continue;
    const p = await U().get(`u/${uid}/profile`, { type: 'json' }).catch(() => null); if (!p) continue;
    if (p.manager || (p.role === 'admin' && p.teacherId !== DIRECTOR)) out.push({ uid, name: p.name || '', phone: p.phone || '' });
  }
  return out;
}

const ICON = { attendance: '📋', reschedule: '🔁', payment: '💳', accounts: '👤' };
function digest(tasks, fresh) {
  const by = {}; tasks.forEach(t => (by[t.kind] = by[t.kind] || []).push(t));
  const head = fresh ? `🔔 IF Academy — ${tasks.length} task${tasks.length === 1 ? '' : 's'} need${tasks.length === 1 ? 's' : ''} your action` : `⏰ Reminder: ${tasks.length} task${tasks.length === 1 ? ' is' : 's are'} still open`;
  const lines = Object.keys(by).map(k => by[k].slice(0, 8).map(t => `${ICON[k] || '•'} ${t.text}`).join('\n') + (by[k].length > 8 ? `\n… and ${by[k].length - 8} more` : ''));
  return `${head}\n\n${lines.join('\n\n')}\n\nOpen: intellectfirst.com/me/#/admin\nI'll keep reminding you every 2 hours until these are done.`;
}

/** Called by the 15-minute reminder job. Sends when something new appears, and repeats every 2 hours while open. */
export async function chaseManager(now = new Date()) {
  const tasks = await openTasks(now);
  const st = (await S().get('tasks/state', { type: 'json' })) || { seen: [], lastAt: 0 };
  const keys = tasks.map(t => t.key), fresh = keys.filter(k => !st.seen.includes(k));
  const h = local(now).getUTCHours(), daytime = h >= 9 && h < 21;
  const due = tasks.length && daytime && (fresh.length || now.getTime() - (st.lastAt || 0) >= REPEAT_MS);
  let sent = 0;
  if (due) {
    const text = digest(tasks, fresh.length > 0), links = await getLinks(), wa = waReady();
    for (const m of await managers()) {
      await addNote(m.uid, { kind: 'task', text }).catch(() => {});
      const l = links[m.uid]; if (l && tgToken()) { try { await tgSend(l.chatId, text); sent++; } catch (e) { console.error('task tg', e.message); } }
      if (wa && m.phone) { try { await waSend(m.phone, text); sent++; } catch (e) { console.error('task wa', e.message); } }
    }
    st.lastAt = now.getTime();
  }
  const cur = (await S().get('tasks/state', { type: 'json' })) || {}; st.dismissed = cur.dismissed || st.dismissed || [];
  st.seen = keys; st.count = tasks.length; st.checkedAt = now.toISOString();
  await S().setJSON('tasks/state', st);
  return { open: tasks.length, sent };
}
