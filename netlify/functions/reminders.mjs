// Every 15 minutes: lesson reminders (evening before, 2 hours before), homework (evening before it is due), tests
// (evening before and that morning) and tuition reminders (3 days before, due day, 3 days overdue; paused while a
// receipt waits for confirmation). Saved as website notifications for students with an account, sent on Telegram to students who
// connected the bot, and on WhatsApp to the student's (and parent's) phone number from IF Admin.
import { S, doc, getLinks, uidsByStudent, dueReminders, reminderText, tgSend, tgToken, tg, tgSecret, addNote, ymd } from '../lib/bot-core.mjs';
import { waReady, waSend, waNumber } from '../lib/whatsapp.mjs';
import { loadHomework } from '../lib/homework.mjs';
import { migrate } from '../lib/migrate.mjs';
import { lessonsOn, loadLog, today as todayStr } from '../lib/lessons.mjs';
import { getStore } from '@netlify/blobs';

/** Once: let the existing webhook also receive button presses (receipt Confirm / Not right). */
async function upgradeWebhook() {
  if (!tgToken() || (await S().get('bot/whv')) === '2') return;
  try {
    const w = await tg('getWebhookInfo', {});
    if (w.url && !(w.allowed_updates || []).includes('callback_query')) await tg('setWebhook', { url: w.url, secret_token: await tgSecret(), allowed_updates: ['message', 'callback_query'] });
    await S().set('bot/whv', '2');
  } catch (e) { console.error('webhook upgrade', e.message); }
}

/** Teachers: a nudge to check in just before the lesson; the director and managers: an alert when a lesson started
    10 minutes ago and nobody checked in. Each sent once per lesson (flags in the lesson log). */
async function lessonWatch(classes, links) {
  if (!tgToken()) return 0;
  const date = todayStr(), now = Date.now(), lessons = lessonsOn(classes, date);
  const soon = lessons.filter(l => { const t = Date.parse(l.at) - now; return t <= 20 * 60000 && t > -5 * 60000; });
  const late = lessons.filter(l => { const t = now - Date.parse(l.at); return t >= 10 * 60000 && now < Date.parse(l.endAt); });
  if (!soon.length && !late.length) return 0;
  const store = getStore({ name: 'school', consistency: 'strong' }), month = date.slice(0, 7), L = await loadLog(month);
  const U = getStore({ name: 'ielts', consistency: 'strong' }), teachers = await doc('teachers');
  const staff = [];   // [{uid, chatId, role, teacherId}]
  for (const [uid, l] of Object.entries(links)) {
    if (uid.startsWith('sid:')) continue;
    const p = await U.get(`u/${uid}/profile`, { type: 'json' }).catch(() => null);
    if (p && (p.role === 'admin' || p.role === 'teacher')) staff.push({ uid, chatId: l.chatId, role: p.role, teacherId: p.teacherId || '', manager: !!p.manager });
  }
  let n = 0, dirty = false;
  const entry = l => L[l.key] || (L[l.key] = { classId: l.classId, label: l.label, date: l.date, start: l.start, end: l.end, teacherId: l.teacherId });
  for (const l of soon) {
    const e = entry(l); if (e.checkIn || e.cancelled || e.pinged) continue;
    for (const s of staff.filter(x => x.teacherId && x.teacherId === l.teacherId)) { try { await tgSend(s.chatId, `🕑 ${l.label} starts at ${l.start}${l.room ? ' (' + l.room + ')' : ''}.\nCheck in on the website when you arrive: intellectfirst.com/me → Today. Then take the register.`); n++; } catch (x) {} }
    e.pinged = true; dirty = true;
  }
  for (const l of late) {
    const e = entry(l); if (e.checkIn || e.cancelled || e.alerted) continue;
    const t = (teachers.find(x => x.id === l.teacherId) || {}).name || 'The teacher';
    for (const s of staff.filter(x => x.role === 'admin' || x.manager)) { try { await tgSend(s.chatId, `⚠️ ${t} has not checked in for ${l.label} (started ${l.start}${l.room ? ', ' + l.room : ''}).\nSee today's lessons: intellectfirst.com/me/#/admin/lessons`); n++; } catch (x) {} }
    for (const s of staff.filter(x => x.teacherId && x.teacherId === l.teacherId)) { try { await tgSend(s.chatId, `⚠️ You have not checked in for ${l.label} (started ${l.start}). Please check in now on the website: intellectfirst.com/me → Today.`); } catch (x) {} }
    e.alerted = true; dirty = true;
  }
  if (dirty) { const fresh = await loadLog(month); for (const [k, v] of Object.entries(L)) fresh[k] = { ...v, ...(fresh[k] || {}), pinged: v.pinged || fresh[k]?.pinged, alerted: v.alerted || fresh[k]?.alerted }; await store.setJSON('lessonlog/' + month, fresh); }
  return n;
}

export default async () => {
  await migrate();
  await upgradeWebhook();
  try { const [cl, lk] = await Promise.all([doc('classes'), getLinks()]); await lessonWatch(cl, lk); } catch (e) { console.error('lesson watch', e.message); }
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
