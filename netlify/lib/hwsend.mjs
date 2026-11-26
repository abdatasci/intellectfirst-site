import { testLink } from './testcentres.mjs';
// Tell a class about new homework or a test: website note, Telegram (with the teacher's photo or file, if any)
// or WhatsApp for students not on Telegram. Used by the website (My classes) and by teachers in the Telegram bot.
import { getStore } from '@netlify/blobs';
import { hwText } from './homework.mjs';
import { doc, getLinks, tg, tgSend, tgToken, addNote, uidsByStudent, inClass, isPrivateClass, getProfile } from './bot-core.mjs';
import { waReady, waSend, waNumber } from './whatsapp.mjs';

const S = () => getStore({ name: 'school', consistency: 'strong' });

/* The teacher's attachments after the homework text: several pages (director, 26 Nov 2026). Photos go as albums of up to
   10 (one message each), files one by one. attach: { pages: [{ photo } | { document }], photo, document } (older form). */
async function sendAttach(chatId, a) {
  if (!a) return;
  const list = a.pages && a.pages.length ? a.pages : a.photo ? [{ photo: a.photo }] : a.document ? [{ document: a.document }] : [];
  const ph = list.filter(x => x.photo), docs = list.filter(x => x.document);
  for (let i = 0; i < ph.length; i += 10) {
    const g = ph.slice(i, i + 10);
    if (g.length === 1) await tg('sendPhoto', { chat_id: chatId, photo: g[0].photo }).catch(() => {});
    else await tg('sendMediaGroup', { chat_id: chatId, media: g.map(x => ({ type: 'photo', media: x.photo })) }).catch(() => {});
  }
  for (const d of docs) await tg('sendDocument', { chat_id: chatId, document: d.document }).catch(() => {});
}

/** Returns how many messages went out. attach: { photo | document: Telegram file_id } sent after the text on Telegram. */
export async function tellClass(c, item, attach, opts = {}) {   // opts.since: resend only to students who joined the bot after this time (Telegram only)
  const students = (await doc('students')).filter(s => inClass(c, s) && !/withdrawn|finished|frozen/i.test(s.status || ''));
  const links = await getLinks(), prefs = (await S().get('waPrefs', { type: 'json' })) || {}, wa = waReady(), bySid = await uidsByStudent(links);
  let n = 0; const sentTo = [];
  for (const s0 of students) {
    // students connected to Telegram by phone only are linked as 'sid:<id>'
    const s = { ...s0, uid: s0.uid || bySid[s0.id] || (links['sid:' + s0.id] ? 'sid:' + s0.id : null) };
    const kind = item.kind === 'test' ? 'testNew' : 'hwNew', l = s.uid && links[s.uid], lang = l?.lang || prefs[s.id]?.lang || 'ru';
    if (opts.since && !(l && l.at && l.at > opts.since)) continue;
    if (opts.sids && !opts.sids.includes(s.id)) continue;
    try {
      if (!opts.since && s.uid && !String(s.uid).startsWith('sid:')) await addNote(s.uid, { kind, text: hwText(kind, item, l ? lang : 'en', true), ...(item.url ? { url: testLink(item, s).replace('https://intellectfirst.com', '') } : {}) });
      if (l && tgToken()) {
        // an online test opens inside the bot (a web_app button passes the sign-in), so the student is in at once
        await tgSend(l.chatId, hwText(kind, item, lang), item.url ? { reply_markup: { inline_keyboard: [[{ text: { en: '🖥 Open the test', ru: '🖥 Открыть тест', kk: '🖥 Тестті ашу' }[lang] || '🖥 Open the test', web_app: { url: testLink(item, s, true) } }]] } } : undefined); n++;
        sentTo.push(`${s.first} ${s.last}`.trim());
        await sendAttach(l.chatId, attach);
      }
      else if (!opts.since && wa && !prefs[s.id]?.off) for (const num of [...new Set([s.phone, s.parentPhone].map(waNumber).filter(Boolean))]) { await waSend(num, 'IF Academy\n' + hwText(kind, item, lang, true)); n++; }
    } catch (e) { console.error('homework notify', s.id, e.message); }
  }
  // the director's private students (accounts in a private class, no student record): website note + Telegram
  if (isPrivateClass(c) && !c.paused && !opts.sids) for (const uid of c.uids || []) {
    const l = links[uid], lang = l?.lang || 'ru', kind = item.kind === 'test' ? 'testNew' : 'hwNew';
    if (opts.since && !(l && l.at && l.at > opts.since)) continue;
    const pr = await getProfile(uid).catch(() => null), st = { id: 'pv:' + uid, uid, first: (pr && pr.name) || '', last: '' };
    try {
      if (!opts.since) await addNote(uid, { kind, text: hwText(kind, item, l ? lang : 'en', true), ...(item.url ? { url: testLink(item, st).replace('https://intellectfirst.com', '') } : {}) });
      if (l && tgToken()) {
        await tgSend(l.chatId, hwText(kind, item, lang), item.url ? { reply_markup: { inline_keyboard: [[{ text: { en: '🖥 Open the test', ru: '🖥 Открыть тест', kk: '🖥 Тестті ашу' }[lang] || '🖥 Open the test', web_app: { url: testLink(item, st, true) } }]] } } : {});
        n++; sentTo.push(st.first || 'private student');
        await sendAttach(l.chatId, attach);
      }
    } catch (e) { console.error('homework notify private', e.message); }
  }
  if (opts.names) return { n, sentTo };
  return n;
}
