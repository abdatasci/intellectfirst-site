// Every 15 minutes: lesson reminders (evening before, 2 hours before) and tuition reminders (3 days before, due day,
// 3 days overdue). Sent to Telegram for students who connected the bot, and always saved as website notifications.
import { S, doc, getLinks, dueReminders, reminderText, tgSend, tgToken, addNote, ymd } from '../lib/bot-core.mjs';

export default async () => {
  const now = new Date();
  const [students, classes, links] = await Promise.all([doc('students'), doc('classes'), getLinks()]);
  const due = dueReminders({ students, classes, now });
  if (!due.length) return new Response('nothing due');
  const sentKey = `bot/sent/${ymd(now).slice(0, 7)}`;
  const sent = (await S().get(sentKey, { type: 'json' })) || {};
  let tgCount = 0, siteCount = 0;
  for (const r of due) {
    const mine = sent[r.uid] || (sent[r.uid] = []);
    if (mine.includes(r.key)) continue;
    mine.push(r.key);
    const l = links[r.uid], lang = l?.lang || 'ru';
    await addNote(r.uid, { kind: r.kind, text: reminderText(r, l ? lang : 'en') });
    siteCount++;
    if (l && tgToken()) {
      try { await tgSend(l.chatId, reminderText(r, lang)); tgCount++; }
      catch (e) { console.error('reminder send failed', r.uid, e.message); if (e.code === 403) { /* user blocked the bot */ } }
    }
  }
  await S().setJSON(sentKey, sent);
  return new Response(`sent ${tgCount} telegram, ${siteCount} website`);
};

export const config = { schedule: '*/15 * * * *' };
