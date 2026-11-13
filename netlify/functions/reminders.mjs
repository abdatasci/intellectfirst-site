// Every 15 minutes: lesson reminders (evening before, 2 hours before), homework (evening before it is due), tests
// (evening before and that morning) and tuition reminders (3 days before, due day, 3 days overdue; paused while a
// receipt waits for confirmation). Saved as website notifications for students with an account, sent on Telegram to students who
// connected the bot, and on WhatsApp to the student's (and parent's) phone number from IF Admin.
import { S, doc, getLinks, uidsByStudent, dueReminders, reminderText, tgSend, tgToken, tg, tgSecret, addNote, ymd } from '../lib/bot-core.mjs';
import { waReady, waSend, waNumber } from '../lib/whatsapp.mjs';
import { loadHomework } from '../lib/homework.mjs';

/** Once: let the existing webhook also receive button presses (receipt Confirm / Not right). */
async function upgradeWebhook() {
  if (!tgToken() || (await S().get('bot/whv')) === '2') return;
  try {
    const w = await tg('getWebhookInfo', {});
    if (w.url && !(w.allowed_updates || []).includes('callback_query')) await tg('setWebhook', { url: w.url, secret_token: await tgSecret(), allowed_updates: ['message', 'callback_query'] });
    await S().set('bot/whv', '2');
  } catch (e) { console.error('webhook upgrade', e.message); }
}

export default async () => {
  await upgradeWebhook();
  const now = new Date();
  const [students, classes, links, homework, receipts] = await Promise.all([doc('students'), doc('classes'), getLinks(), loadHomework(), S().get('receipts/pending', { type: 'json' }).then(x => x || {})]);
  const bySid = await uidsByStudent(links);
  const due = dueReminders({ students: students.map(s => s.uid || !bySid[s.id] ? s : { ...s, uid: bySid[s.id] }), classes, homework, receipts, now });
  if (!due.length) return new Response('nothing due');
  const sentKey = `bot/sent/${ymd(now).slice(0, 7)}`;
  const sent = (await S().get(sentKey, { type: 'json' })) || {};
  const prefs = (await S().get('waPrefs', { type: 'json' })) || {};   // {studentId: {off: true, lang}}
  const wa = waReady();
  let tgCount = 0, siteCount = 0, waCount = 0;
  for (const r of due) {
    const who = r.uid || 'sid:' + r.studentId;
    const mine = sent[who] || (sent[who] = []);
    if (mine.includes(r.key)) continue;
    mine.push(r.key);
    const l = r.uid && links[r.uid], lang = l?.lang || prefs[r.studentId]?.lang || 'ru';
    if (r.uid) { await addNote(r.uid, { kind: r.kind, text: reminderText(r, l ? lang : 'en') }); siteCount++; }
    if (l && tgToken()) {
      try { await tgSend(l.chatId, reminderText(r, lang)); tgCount++; }
      catch (e) { console.error('reminder send failed', r.uid, e.message); }
    }
    if (wa && !prefs[r.studentId]?.off) {
      const nums = [...new Set((r.phones || []).map(waNumber).filter(Boolean))];
      for (const n of nums) {
        try { await waSend(n, 'IF Academy\n' + reminderText(r, lang)); waCount++; }
        catch (e) { console.error('whatsapp send failed', r.studentId, e.message); }
      }
    }
  }
  await S().setJSON(sentKey, sent);
  return new Response(`sent ${tgCount} telegram, ${waCount} whatsapp, ${siteCount} website`);
};

export const config = { schedule: '*/15 * * * *' };
