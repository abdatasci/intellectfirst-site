import { CENTRES, centreByUrl, SITE, matchTest } from './testcentres.mjs';
// Homework and test dates, set by teachers per class (website → My classes → a class).
// Store "school" → "homework": [{ id, classId, classLabel, kind: 'hw'|'test', text, due: 'YYYY-MM-DD', time: 'HH:MM'|'', by, at }]
// Students see them on their profile and in the Telegram bot; reminders: homework the evening before it is due,
// tests the evening before and on the morning of the test. Posting one notifies the class straight away.
import { getStore } from '@netlify/blobs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
const str = (v, n) => (v == null ? '' : String(v)).replace(/\s+/g, ' ').trim().slice(0, n);
const today = () => new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10);   // Kostanay

export async function loadHomework() { return (await S().get('homework', { type: 'json' })) || []; }
async function saveHomework(list) {
  const cut = new Date(Date.now() - 60 * 864e5).toISOString().slice(0, 10);   // keep two months
  await S().setJSON('homework', list.filter(h => h.due >= cut).slice(-800));
}
export function clean(b, cls, by) {
  // an online test: one of the IF test centres, opened by the students from the bot (signed in) or the website
  const centre = b.kind === 'online' || b.url ? centreByUrl(b.url) : null;
  if (b.kind === 'online' && !centre) return null;
  const kind = centre || b.kind === 'test' ? 'test' : 'hw';
  const text = centre ? str(b.text, 300) || centre[1] : str(b.text, 600); if (!text) return null;
  const due = /^\d{4}-\d{2}-\d{2}$/.test(b.due || '') ? b.due : null; if (!due) return null;
  const time = /^\d{1,2}:\d{2}$/.test(b.time || '') ? b.time.padStart(5, '0') : '';
  const tst = centre ? matchTest(centre[2], b.test || (text !== centre[1] ? text : '')) : null;   // which test inside the centre: the link opens it directly
  return { id: 'h' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), classId: cls.id, classLabel: cls.label, kind, text: tst && (!text || text === centre[1]) ? tst[1] : text, due, time, ...(centre ? { url: centre[2], centre: centre[1], ...(tst ? { test: tst[0], testTitle: tst[1] } : {}) } : {}), by: str(by, 80), at: new Date().toISOString() };
}
export async function addHomework(item) {
  const l = await loadHomework(); l.push(item); await saveHomework(l);
  const { activity } = await import('./activity.mjs'); await activity(`📝 ${item.by || 'A teacher'} set ${item.kind === 'test' ? 'a test' : 'homework'} for ${item.classLabel || item.classId} (due ${item.due.slice(8)}.${item.due.slice(5, 7)}${item.time ? ' ' + item.time : ''}): ${String(item.text || '').slice(0, 120)}`);
  return item;
}
export async function removeHomework(id, canRemove) {
  const l = await loadHomework(); const h = l.find(x => x.id === id);
  if (!h || !canRemove(h)) return false;
  await saveHomework(l.filter(x => x.id !== id)); return true;
}
/** Homework check: the student can say "I've done it" (claimed); only the teacher's mark counts — done, part or not.
    item.checks = { [studentId]: { s: 'claimed'|'done'|'part'|'not', at, by } } */
export const HW_FINAL = ['done', 'part', 'not'];
export async function setCheck(id, sid, val, who, can) {
  const l = await loadHomework(), h = l.find(x => x.id === id);
  if (!h || !sid || !can(h)) return null;
  h.checks = h.checks || {};
  const cur = h.checks[sid];
  if (val === 'claimed') { if (cur && HW_FINAL.includes(cur.s)) return h; h.checks[sid] = { s: 'claimed', at: new Date().toISOString() }; }
  else if (HW_FINAL.includes(val)) h.checks[sid] = { s: val, at: new Date().toISOString(), by: str(who, 80), ...(cur && cur.s === 'claimed' ? { claimed: cur.at } : cur && cur.claimed ? { claimed: cur.claimed } : {}) };
  else if (val === '') delete h.checks[sid];
  else return null;
  await saveHomework(l); return h;
}
/** What one student may see of an item: their own check only. */
export const forStudent = (h, sid) => { const { checks, ...rest } = h; return { ...rest, my: (checks || {})[sid] || null }; };
/** Upcoming (due today or later) and recent (last 7 days) items for these class ids. */
export function forClasses(list, classIds, { past = 7 } = {}) {
  const from = new Date(Date.now() + 5 * 3600e3 - past * 864e5).toISOString().slice(0, 10);
  return list.filter(h => classIds.includes(h.classId) && h.due >= from).sort((a, b) => (a.due + a.time).localeCompare(b.due + b.time));
}
export const isUpcoming = h => h.due >= today();

const T = {
  en: { hwNew: h => `📝 New homework for ${h.classLabel} (due ${h.due}):\n${h.text}`, testNew: h => `🧪 Test for ${h.classLabel} on ${h.due}${h.time ? ' at ' + h.time : ''}:\n${h.text}`,
    hwEve: h => `📝 Homework reminder: due tomorrow for ${h.classLabel}:\n${h.text}`, testEve: h => `🧪 Reminder: test tomorrow${h.time ? ' at ' + h.time : ''} in ${h.classLabel}:\n${h.text}\nGood luck!`, testDay: h => `🧪 Test today${h.time ? ' at ' + h.time : ''} in ${h.classLabel}: ${h.text}. You've got this!` },
  ru: { hwNew: h => `📝 Новое домашнее задание для ${h.classLabel} (срок ${h.due}):\n${h.text}`, testNew: h => `🧪 Тест в группе ${h.classLabel} ${h.due}${h.time ? ' в ' + h.time : ''}:\n${h.text}`,
    hwEve: h => `📝 Напоминание: завтра сдаём домашнее задание (${h.classLabel}):\n${h.text}`, testEve: h => `🧪 Напоминание: завтра${h.time ? ' в ' + h.time : ''} тест (${h.classLabel}):\n${h.text}\nУдачи!`, testDay: h => `🧪 Сегодня${h.time ? ' в ' + h.time : ''} тест (${h.classLabel}): ${h.text}. У вас всё получится!` },
  kk: { hwNew: h => `📝 ${h.classLabel} үшін жаңа үй тапсырмасы (мерзімі ${h.due}):\n${h.text}`, testNew: h => `🧪 ${h.classLabel} тобында ${h.due}${h.time ? ' ' + h.time : ''} тест:\n${h.text}`,
    hwEve: h => `📝 Еске салу: ертең үй тапсырмасын тапсыру керек (${h.classLabel}):\n${h.text}`, testEve: h => `🧪 Еске салу: ертең${h.time ? ' ' + h.time : ''} тест (${h.classLabel}):\n${h.text}\nСәттілік!`, testDay: h => `🧪 Бүгін${h.time ? ' ' + h.time : ''} тест (${h.classLabel}): ${h.text}. Сіз бәрін жасай аласыз!` }
};
const ONLINE = {
  en: h => `🖥 Online test for ${h.classLabel}: ${h.text}${h.centre && h.text !== h.centre ? ' (' + h.centre + ')' : ''}\nOpen it with the button below — you are signed in automatically. Speaking is with NOVA or ATLAS, and everything is marked straight away.`,
  ru: h => `🖥 Онлайн-тест для группы ${h.classLabel}: ${h.text}${h.centre && h.text !== h.centre ? ' (' + h.centre + ')' : ''}\nОткройте его кнопкой ниже — вход автоматический. Speaking — с NOVA или ATLAS, оценка сразу.`,
  kk: h => `🖥 ${h.classLabel} тобына онлайн-тест: ${h.text}${h.centre && h.text !== h.centre ? ' (' + h.centre + ')' : ''}\nТөмендегі батырмамен ашыңыз — кіру автоматты. Speaking — NOVA не ATLAS-пен, баға бірден.`
};
export const hwText = (kind, h, lang, withLink) => h.url && kind === 'testNew'
  ? (ONLINE[lang] || ONLINE.en)(h) + (withLink ? `\n${SITE}${h.url}${h.test ? '?t=' + h.test + (h.classLabel ? '&cls=' + encodeURIComponent(h.classLabel) : '') : ''}` : '')
  : (T[lang] || T.en)[kind](h);
