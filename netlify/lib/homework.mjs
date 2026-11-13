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
  const kind = b.kind === 'test' ? 'test' : 'hw';
  const text = str(b.text, 600); if (!text) return null;
  const due = /^\d{4}-\d{2}-\d{2}$/.test(b.due || '') ? b.due : null; if (!due) return null;
  const time = /^\d{1,2}:\d{2}$/.test(b.time || '') ? b.time.padStart(5, '0') : '';
  return { id: 'h' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), classId: cls.id, classLabel: cls.label, kind, text, due, time, by: str(by, 80), at: new Date().toISOString() };
}
export async function addHomework(item) { const l = await loadHomework(); l.push(item); await saveHomework(l); return item; }
export async function removeHomework(id, canRemove) {
  const l = await loadHomework(); const h = l.find(x => x.id === id);
  if (!h || !canRemove(h)) return false;
  await saveHomework(l.filter(x => x.id !== id)); return true;
}
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
export const hwText = (kind, h, lang) => (T[lang] || T.en)[kind](h);
