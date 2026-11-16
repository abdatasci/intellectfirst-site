// Every morning (from 08:00 Kostanay time) the manager and the SMM get the full list of the day's lessons —
// time, class, teacher, room, with covers and cancellations — on Telegram, on the school's WhatsApp, and in their website
// notifications. People are chosen in Admin → Accounts → Duty (Manager / SMM); an administrator other than the
// director counts as manager too.
import { getStore } from '@netlify/blobs';
import { doc, loadChanges, getLinks, tgSend, tgToken, addNote, local, ymd } from './bot-core.mjs';
import { lessonsOn } from './lessons.mjs';
import { waReady, waSend } from './whatsapp.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const DIRECTOR = 't-abdoulie';
const DN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Managers and SMMs: [{uid, name, phone, duty}] */
export async function dayWatchers() {
  const dir = (await U().get('directory', { type: 'json' })) || {}, out = [];
  for (const [uid, a] of Object.entries(dir)) {
    if (a.role !== 'admin' && a.role !== 'teacher') continue;
    const p = await U().get(`u/${uid}/profile`, { type: 'json' }).catch(() => null); if (!p) continue;
    const duty = p.smm ? 'smm' : (p.manager || (p.role === 'admin' && p.teacherId !== DIRECTOR)) ? 'manager' : '';
    if (duty) out.push({ uid, name: p.name || '', phone: p.phone || '', duty });
  }
  return out;
}

export async function dayText(date) {
  const [classes, teachers] = await Promise.all([doc('classes'), doc('teachers')]);
  const tn = id => ((teachers.find(t => t.id === id) || {}).name || '').split(' ')[0] || '—';
  const list = lessonsOn(classes, date, await loadChanges());
  const d = new Date(date + 'T00:00:00Z'), head = `📅 Lessons today — ${DN[d.getUTCDay()]} ${date.slice(8)}.${date.slice(5, 7)}`;
  if (!list.length) return `${head}\n\nNo lessons today.`;
  const live = list.filter(l => !l.cancelled && !l.movedTo);
  const lines = list.map(l => {
    const time = `${l.start}${l.end ? '–' + l.end : ''}`;
    if (l.cancelled) return `❌ ${time} ${l.label} — cancelled${l.note ? ' (' + l.note + ')' : ''}`;
    if (l.movedTo) return `↪ ${time} ${l.label} — moved to ${l.movedTo.date.slice(8)}.${l.movedTo.date.slice(5, 7)} ${l.movedTo.start}`;
    return `• ${time} ${l.label} — ${tn(l.teacherId)}${l.coverFor ? ' (covering for ' + tn(l.coverFor) + ')' : ''}${l.room ? ' · ' + l.room : ''}${l.kind === 'extra' ? ' · extra lesson' : ''}`;
  });
  return `${head}\n${live.length} lesson${live.length === 1 ? '' : 's'}\n\n${lines.join('\n')}\n\nFull day: intellectfirst.com/me/#/calendar`;
}

/** Called by the 15-minute job: sends once a day, from 08:00. */
export async function sendDayDigest(now = new Date()) {
  const h = local(now).getUTCHours(), date = ymd(now), key = `digest/day/${date}`;
  if (h < 8 || h >= 21 || await S().get(key)) return 0;
  await S().set(key, now.toISOString());
  const text = await dayText(date), links = await getLinks(), wa = waReady();
  let n = 0;
  for (const w of await dayWatchers()) {
    await addNote(w.uid, { kind: 'day', text }).catch(() => {});
    const l = links[w.uid];
    if (l && l.chatId && tgToken()) { try { await tgSend(l.chatId, text); n++; } catch (e) { console.error('day digest tg', e.message); } }
    else if (wa && w.phone) { try { await waSend(w.phone, 'IF Academy\n' + text); n++; } catch (e) { console.error('day digest wa', e.message); } }
  }
  return n;
}

/** Same-day changes (cancelled, moved, covered) go to the SMM too — managers already hear about them. */
export async function tellSmm(text) {
  const links = await getLinks();
  for (const w of (await dayWatchers()).filter(x => x.duty === 'smm')) {
    await addNote(w.uid, { kind: 'day', text }).catch(() => {});
    const l = links[w.uid]; if (l && l.chatId) await tgSend(l.chatId, text).catch(() => {});
  }
}
