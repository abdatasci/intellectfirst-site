// Every 15 minutes: lesson reminders (evening before, 2 hours before), homework (evening before it is due and 5 hours before the lesson), tests
// (evening before and that morning) and tuition reminders (3 days before, due day, 3 days overdue; paused while a
// receipt waits for confirmation). Saved as website notifications for students with an account, sent on Telegram to students who
// connected the bot, and on WhatsApp to the student's (and parent's) phone number from IF Admin.
import { S, doc, getLinks, getProfile, uidsByStudent, loadChanges, dueReminders, reminderText, tgSend, tgToken, tg, tgSecret, addNote, ymd, hidePrivate, isPrivateClass, DIRECTOR_TID, money } from '../lib/bot-core.mjs';
import { waReady, waSend, waNumber } from '../lib/whatsapp.mjs';
import { loadHomework } from '../lib/homework.mjs';
import { migrate } from '../lib/migrate.mjs';
import { lessonsOn, loadLog, today as todayStr } from '../lib/lessons.mjs';
import { getStore } from '@netlify/blobs';
import { chaseManager } from '../lib/tasks.mjs';
import { kaspiReady, kaspiTexts, syncOpen } from '../lib/kaspi.mjs';
import { sendDayDigest } from '../lib/daydigest.mjs';
import { lessonButtons, isStaff, ensureStaffKb, KBV } from '../lib/teachbot.mjs';

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
  // teachers still showing the students' keyboard (connected before the teacher menu existed): send them the teacher menu once
  try {
    if (tgToken() && (await S().get('bot/kbv-all')) !== KBV) {
      const links = await getLinks();
      for (const [uid, l] of Object.entries(links)) { if (!l || !l.chatId || uid.startsWith('sid:')) continue; const p = await getProfile(uid).catch(() => null); if (isStaff(p)) await ensureStaffKb(l.chatId, p).catch(e => console.error('staff kb', e.message)); }
      await S().set('bot/kbv-all', KBV);
    }
  } catch (e) { console.error('staff kb', e.message); }

  await migrate();
  await upgradeWebhook();
  // lesson clock-in nudges, late alerts and register reminders: every 5 minutes in lesson-watch.mjs
  try { const n = await sendDayDigest(); if (n) console.log('day digest sent', n); } catch (e) { console.error('day digest', e.message); }
  try { const r = await chaseManager(); if (r.sent) console.log('manager tasks', r.open, 'open,', r.sent, 'messages'); } catch (e) { console.error('manager tasks', e.message); }
  try { const n = await syncOpen(); if (n) console.log('kaspi invoices checked', n); } catch (e) { console.error('kaspi sync', e.message); }
  const now = new Date();
  const [students, classes, links, homework, receipts] = await Promise.all([doc('students'), doc('classes'), getLinks(), loadHomework(), S().get('receipts/pending', { type: 'json' }).then(x => x || {})]);
  const bySid = await uidsByStudent(links);
  // the director's private students: one entry per account in a private class (lessons + monthly payment from class.pay)
  const dirX = (await getStore({ name: 'ielts', consistency: 'strong' }).get('directory', { type: 'json' }).catch(() => null)) || {};
  const priv = [];
  for (const c of classes.filter(isPrivateClass)) for (const u of (c.uids || [])) {
    const d = dirX[u] || {};
    priv.push({ id: 'pv:' + u, first: d.name || 'Student', last: '', uid: u, phone: d.phone || '', status: c.paused || c.left ? 'withdrawn' : 'active', classes: [c.label], pay: c.pay && +c.pay.dueDay ? c.pay : null, private: true });
  }
  const changes = await loadChanges();
  const skip = await (await import('../lib/cancel.mjs')).cancelledSet().catch(() => null);
  // packages: a reminder 7 and 3 days before the next payment date (lib/paysoon.mjs)
  try {
    const { packageReminders } = await import('../lib/paysoon.mjs');
    const n = await packageReminders({ links, bySid, roster: students, note: addNote,
      send: (chat, txt, kb) => tgToken() ? tgSend(chat, txt, kb ? { reply_markup: kb } : {}) : null,
      button: kaspiReady() ? lang => ({ inline_keyboard: [[{ text: kaspiTexts(lang).btn, callback_data: 'kp:start' }]] }) : null });
    if (n) console.log('package payment reminders', n);
  } catch (e) { console.error('package reminders', e.message); }
  const due = dueReminders({ changes, students: [...students.map(s => s.uid || !bySid[s.id] ? s : { ...s, uid: bySid[s.id] }), ...priv], classes, homework, receipts, now, skip });
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
      try { await tgSend(l.chatId, reminderText(r, lang), /^pay/.test(r.kind) && kaspiReady() ? { reply_markup: { inline_keyboard: [[{ text: kaspiTexts(lang).btn, callback_data: 'kp:start' }]] } } : {}); tgCount++; }
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
  // the director's private students pay per package (class.pay = {pkg, done, asOf}): lessons since asOf are counted from the
  // timetable; at one lesson left and when the package is finished the student is reminded (once) and the director gets a copy
  try {
    const CH = await loadChanges(), nowL = new Date(), d0 = todayStr(), dUid = ((await doc('teachers')).find(t => t.id === DIRECTOR_TID) || {}).uid, dl = dUid && links[dUid];
    const hourL = (nowL.getUTCHours() + 5) % 24;
    for (const c of classes.filter(c => isPrivateClass(c) && !c.left && !c.paused && c.pay && +c.pay.pkg > 0 && /^\d{4}-\d{2}-\d{2}$/.test(c.pay.asOf || ''))) {
      let done = +c.pay.done || 0;
      for (let t = Date.parse(c.pay.asOf + 'T12:00:00Z') + 86400000; t <= Date.parse(d0 + 'T12:00:00Z'); t += 86400000) {
        const day = new Date(t).toISOString().slice(0, 10);
        for (const l of lessonsOn([c], day, CH)) {
          if (l.cancelled || l.movedTo) continue;
          if (day < d0 || (l.end && Date.parse(day + 'T' + l.end + ':00+05:00') <= nowL.getTime())) done++;
        }
      }
      const pkg = +c.pay.pkg, state = done >= pkg ? 'finished' : done === pkg - 1 ? 'oneLeft' : null;
      if (!state || hourL < 10 || hourL >= 21) continue;
      const key = `pvpkg:${state}:${c.id}:${c.pay.asOf}`;
      for (const u of (c.uids || [])) {
        const mine = sent[u] || (sent[u] = []); if (mine.includes(key)) continue; mine.push(key);
        const l = links[u], lang = l?.lang || 'ru', name = ((dirX[u] || {}).name || '').split(' ')[0];
        const fee = c.pay.fee ? ' (' + money(c.pay.fee) + ')' : '';
        const txt = lang === 'en'
          ? (state === 'oneLeft' ? `💳 Hi ${name}! One lesson is left in your package (${pkg - 1} of ${pkg} done). Please pay for the next package${fee} before your last lesson. Thank you!` : `💳 Hi ${name}! Your package of ${pkg} lessons is finished. Please pay for the next package${fee} to continue. Thank you!`)
          : (state === 'oneLeft' ? `💳 Здравствуйте, ${name}! В вашем абонементе осталось одно занятие (${pkg - 1} из ${pkg}). Пожалуйста, оплатите следующий абонемент${fee} до последнего занятия. Спасибо!` : `💳 Здравствуйте, ${name}! Ваш абонемент из ${pkg} занятий закончился. Пожалуйста, оплатите следующий абонемент${fee}, чтобы продолжить. Спасибо!`);
        if (l && tgToken()) await tgSend(l.chatId, txt).catch(e => console.error('pv pay', e.message));
        await addNote(u, { kind: 'payDue', text: txt }).catch(() => {});
        if (dl && tgToken()) await tgSend(dl.chatId, `💳 Your private student ${(dirX[u] || {}).name || ''}: ${state === 'oneLeft' ? `1 lesson left (${pkg - 1}/${pkg})` : `package finished (${done}/${pkg})`}. ${l ? 'They have been reminded on Telegram.' : 'Not on the bot yet — please remind them.'}`).catch(() => {});
      }
    }
  } catch (e) { console.error('private packages', e.message); }
  // a copy of each private payment reminder goes to the director (only him)
  try {
    const dUid = ((await doc('teachers')).find(t => t.id === DIRECTOR_TID) || {}).uid, dl = dUid && links[dUid];
    const done = sent['director:pv'] || (sent['director:pv'] = []);
    for (const r of due.filter(x => x.pay && String(x.studentId).startsWith('pv:'))) {
      if (!dl || !tgToken() || done.includes(r.key + '|' + r.studentId)) continue;
      done.push(r.key + '|' + r.studentId);
      const who = (priv.find(x => x.id === r.studentId) || {}).first || 'Private student';
      const what = { payBefore: 'payment due in 3 days', payDue: 'payment due today', payLate: 'payment 3 days overdue' }[r.kind] || 'payment';
      await tgSend(dl.chatId, `💳 Your private student ${who}: ${what}${r.pay.fee ? ' — ' + money(r.pay.fee) : ''} for ${r.pay.month}. They have been reminded.`).catch(() => {});
    }
  } catch (e) { console.error('private copy', e.message); }
  await S().setJSON(sentKey, sent);
  return new Response(`sent ${tgCount} telegram, ${waCount} whatsapp, ${siteCount} website`);
};

export const config = { schedule: '*/15 * * * *' };
