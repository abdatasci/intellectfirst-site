// Telegram webhook for the IF Academy bot (background function: Telegram gets an immediate 202, the AI reply follows).
// Webhook URL and secret are set from Admin → Bot ("Connect bot"), which calls setWebhook with a secret derived from the token.
import { S, getProfile, contextFor, reply, publicReply, allow, tgSecret, tgSend, tg, getLinks, saveLinks, linkChat, matchPhone, local, money, langOf, localise } from '../lib/bot-core.mjs';
import { handleReceipt, decideReceipt } from '../lib/receipts.mjs';
import { loadHomework, forClasses, isUpcoming } from '../lib/homework.mjs';

const SITE = 'https://intellectfirst.com/me/#/assistant';
const PHONE_KB = lang => ({ keyboard: [[{ text: { en: '📱 Connect with my phone number', ru: '📱 Подключиться по номеру телефона', kk: '📱 Телефон нөмірі арқылы қосылу' }[lang] || '📱 Connect with my phone number', request_contact: true }]], resize_keyboard: true, one_time_keyboard: true });
const KB = { keyboard: [[{ text: '📅 Next lessons' }, { text: '📝 Homework & tests' }], [{ text: '💳 Payment' }, { text: '📎 Send receipt' }], [{ text: '❓ Help' }]], resize_keyboard: true, is_persistent: true };
const L = {
  en: {
    hello: n => `Hi ${n}! 👋 Your IF Academy account is connected.\nI'll remind you about lessons (the evening before and 2 hours before), homework, tests and tuition payments. After paying, send the receipt here.\nAsk me anything about your classes, or practise English with me.`,
    unlinked: `Hi! 👋 This is the IF Academy assistant. Ask me anything about the school: courses, prices, the timetable, the placement test.\n\nIF Academy students and parents: press "📱 Connect with my phone number" below to get lesson, homework and payment reminders here. Use the number the school has for you.`,
    phoneOwn: 'Please share your own number with the button below (not someone else\'s contact).',
    phoneNone: n => `I couldn't find the number ${n} in IF Academy's records. Please send the school the number you use (@abliem or WhatsApp +7 707 381 0988), or connect from the website: ${SITE}`,
    phonePick: 'This number belongs to more than one student. Who are you connecting?',
    expired: `This link has expired. Open ${SITE} and press "Connect Telegram" again.`,
    stopped: 'Disconnected. You will not get reminders here any more. You can reconnect from the website at any time.',
    busy: 'You have reached today\'s message limit. Please try again tomorrow.',
    error: 'Sorry, I could not answer just now. Please try again in a minute.',
    help: 'I can:\n- show your next lessons (📅)\n- show your homework and tests (📝)\n- show your tuition status (💳) and take your payment receipt (📎: just send the photo or PDF)\n- answer questions about your classes, results and the school\n- help with English: grammar, words, corrections, speaking practice\n/stop disconnects this chat.',
    hwNone: 'No homework or tests set for the next days. 🎉', receiptHow: '📎 Send the payment receipt here as a photo or PDF (Kaspi or bank). AI reads it and the school confirms it.',
    none: 'No lessons with a set time in the next 7 days.', nopay: 'No payment plan is recorded for you on the website. Please ask the administrator.',
    unlinkedRecord: 'Your account is not linked to a school record yet. Add the phone number the school has for you in your website profile.'
  },
  ru: {
    hello: n => `Здравствуйте, ${n}! 👋 Ваш аккаунт IF Academy подключён.\nЯ буду напоминать о занятиях (накануне вечером и за 2 часа), домашних заданиях, тестах и оплате. После оплаты отправьте чек сюда.\nСпрашивайте о своих занятиях или практикуйте английский со мной.`,
    unlinked: `Здравствуйте! 👋 Это помощник IF Academy. Спрашивайте о школе: курсы, цены, расписание, тест уровня.\n\nУченикам и родителям IF Academy: нажмите «📱 Подключиться по номеру телефона» ниже, чтобы получать здесь напоминания о занятиях, домашних заданиях и оплате. Используйте номер, который есть у школы.`,
    phoneOwn: 'Пожалуйста, отправьте свой номер кнопкой ниже (а не чужой контакт).',
    phoneNone: n => `Номер ${n} не найден в базе IF Academy. Сообщите школе номер, которым пользуетесь (@abliem или WhatsApp +7 707 381 0988), или подключитесь на сайте: ${SITE}`,
    phonePick: 'Этот номер указан у нескольких учеников. Кого подключаем?',
    expired: `Ссылка устарела. Откройте ${SITE} и снова нажмите «Connect Telegram».`,
    stopped: 'Чат отключён, напоминания сюда больше не придут. Подключиться снова можно на сайте.',
    busy: 'Дневной лимит сообщений исчерпан. Попробуйте завтра.',
    error: 'Не получилось ответить. Попробуйте ещё раз через минуту.',
    help: 'Я умею:\n- показывать ближайшие занятия (📅)\n- показывать домашние задания и тесты (📝)\n- показывать статус оплаты (💳) и принимать чек (📎: просто отправьте фото или PDF)\n- отвечать на вопросы о занятиях, результатах и школе\n- помогать с английским: грамматика, слова, исправления, разговорная практика\n/stop — отключить этот чат.',
    hwNone: 'На ближайшие дни нет домашних заданий и тестов. 🎉', receiptHow: '📎 Отправьте сюда чек об оплате фото или PDF (Kaspi или банк). ИИ прочитает его, а школа подтвердит.',
    none: 'В ближайшие 7 дней нет занятий с указанным временем.', nopay: 'План оплаты на сайте не указан. Уточните у администратора.',
    unlinkedRecord: 'Ваш аккаунт ещё не связан с записью в школе. Укажите в профиле на сайте номер телефона, который есть у школы.'
  }
};
L.kk = { ...L.ru,
  hello: n => `Сәлем, ${n}! 👋 IF Academy аккаунтыңыз қосылды.\nСабақтар (алдыңғы күні кешке және 2 сағат бұрын), үй тапсырмасы, тесттер мен төлем туралы еске саламын. Төлегеннен кейін түбіртекті осында жіберіңіз.\nСабақтарыңыз туралы сұраңыз немесе менімен ағылшын тілін жаттықтырыңыз.`,
  stopped: 'Чат ажыратылды, енді еске салулар келмейді. Сайттан қайта қосуға болады.',
  none: 'Алдағы 7 күнде уақыты көрсетілген сабақ жоқ.',
  unlinked: `Сәлем! 👋 Бұл IF Academy көмекшісі. Мектеп туралы сұраңыз: курстар, бағалар, кесте, деңгей тесті.\n\nIF Academy оқушылары мен ата-аналары: сабақ, үй тапсырмасы және төлем туралы еске салуларды алу үшін төмендегі «📱 Телефон нөмірі арқылы қосылу» батырмасын басыңыз. Мектепте тіркелген нөмірді пайдаланыңыз.`,
  phoneOwn: 'Төмендегі батырма арқылы өз нөміріңізді жіберіңіз (басқа біреудің контактісін емес).',
  phoneNone: n => `${n} нөмірі IF Academy базасынан табылмады. Пайдаланатын нөміріңізді мектепке хабарлаңыз (@abliem немесе WhatsApp +7 707 381 0988) немесе сайт арқылы қосылыңыз: ${SITE}`,
  phonePick: 'Бұл нөмір бірнеше оқушыда көрсетілген. Кімді қосамыз?', hwNone: 'Алдағы күндерге үй тапсырмасы мен тест жоқ. 🎉', receiptHow: '📎 Төлем түбіртегін осында фото немесе PDF ретінде жіберіңіз (Kaspi немесе банк). ЖИ оқиды, мектеп растайды.' };
const DAY = { en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], kk: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'] };

function nextText(ctx, lang) {
  if (!ctx.lessons.length) return L[lang].none;
  return ctx.lessons.slice(0, 5).map(x => { const d = local(x.at); return `📅 ${DAY[lang][d.getUTCDay()]} ${x.date.slice(8)}.${x.date.slice(5, 7)} ${x.start}${x.end ? '–' + x.end : ''} — ${x.label}${x.room ? ' · ' + x.room : ''}`; }).join('\n');
}
function hwListText(items, lang) {
  if (!items.length) return L[lang].hwNone;
  return items.slice(0, 8).map(h => `${h.kind === 'test' ? '🧪' : '📝'} ${h.due.slice(8)}.${h.due.slice(5, 7)}${h.time ? ' ' + h.time : ''} · ${h.classLabel}: ${h.text}`).join('\n');
}
function payText(ctx, lang) {
  if (!ctx.pay) return L[lang].nopay;
  const p = localise(ctx.pay, lang);
  const amt = money(p.fee);
  if (lang === 'en') return p.paid ? `✅ ${p.month}: paid on ${p.paidOn}. Thank you!` : `💳 ${p.month}: ${amt ? amt + ', ' : ''}${p.dueDate ? 'due ' + p.dueDate : 'not paid yet'}${p.state === 'overdue' ? ' (overdue)' : ''}.\nTo pay or ask a question: Telegram @abliem or WhatsApp +7 707 381 0988.`;
  return p.paid ? `✅ ${p.month}: оплачено ${p.paidOn}. Спасибо!` : `💳 ${p.month}: ${amt ? amt + ', ' : ''}${p.dueDate ? 'срок ' + p.dueDate : 'ещё не оплачено'}${p.state === 'overdue' ? ' (просрочено)' : ''}.\nОплата и вопросы: Telegram @abliem или WhatsApp +7 707 381 0988.`;
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('ok');
  const secret = await tgSecret();
  if (!secret || req.headers.get('x-telegram-bot-api-secret-token') !== secret) return new Response('forbidden', { status: 403 });
  const up = await req.json().catch(() => null);
  // the director presses Confirm / Not right under a receipt
  if (up?.callback_query) {
    const q = up.callback_query, mm = String(q.data || '').match(/^rc:(ok|no):([a-z0-9]+)$/);
    const pk = String(q.data || '').match(/^ph:(\d+)$/);
    if (pk) {   // a parent's number matched several children: they picked one
      try {
        const chatId = q.message?.chat?.id, pend = await S().get(`bot/phonepick/${chatId}`, { type: 'json' });
        const c = pend && pend.exp > Date.now() && pend.cands[+pk[1]];
        const lang = pend?.lang || 'ru';
        if (!c) { await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Expired. Share your number again.' }); return new Response('ok'); }
        await linkChat(c.key, chatId, q.from?.username, lang); await S().delete(`bot/phonepick/${chatId}`);
        await tg('answerCallbackQuery', { callback_query_id: q.id, text: '✓' });
        await tgSend(chatId, L[lang].hello(c.name.split(' ')[0]), { reply_markup: KB });
      } catch (e) { console.error('phone pick', e.message); }
      return new Response('ok');
    }
    try {
      const uid = await S().get(`bot/chat/${q.from?.id}`), p = uid && await getProfile(uid);
      if (!mm || p?.role !== 'admin') { await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Only the administrator can do this.' }); return new Response('ok'); }
      const r = await decideReceipt(mm[2], mm[1] === 'ok', p.name);
      await tg('answerCallbackQuery', { callback_query_id: q.id, text: !r ? 'Not found' : r.status === 'confirmed' ? 'Confirmed ✓' : r.status === 'rejected' ? 'Marked not right' : 'Already done' });
      if (r && q.message) await tg('editMessageReplyMarkup', { chat_id: q.message.chat.id, message_id: q.message.message_id, reply_markup: { inline_keyboard: [[{ text: r.status === 'confirmed' ? '✅ Confirmed' + (r.saved ? ' · saved in IF Admin' : '') : '❌ Not right', callback_data: 'rc:done' }]] } }).catch(() => {});
    } catch (e) { console.error('receipt decision', e.message); }
    return new Response('ok');
  }
  const m = up?.message;
  if (!m?.chat || m.chat.type !== 'private') return new Response('ok');
  const chatId = m.chat.id, text = String(m.text || '').trim();
  let lang = langOf(m.from?.language_code);
  try {
    // dedupe: Telegram may retry an update
    const seenKey = `bot/upd/${up.update_id}`;
    if (await S().get(seenKey)) return new Response('ok');
    await S().set(seenKey, '1');

    const start = text.match(/^\/start(?:\s+([a-z0-9]{6,32}))?$/i);
    let uid = await S().get(`bot/chat/${chatId}`);
    if (start && start[1]) {
      const link = await S().get(`bot/link/${start[1]}`, { type: 'json' });
      if (!link || link.exp < Date.now()) { await tgSend(chatId, L[lang].expired, { reply_markup: PHONE_KB(lang) }); return new Response('ok'); }
      await S().delete(`bot/link/${start[1]}`);
      const links = await getLinks();
      for (const [u, l] of Object.entries(links)) if (l.chatId === chatId && u !== link.uid) delete links[u];
      if (links[link.uid] && links[link.uid].chatId !== chatId) await S().delete(`bot/chat/${links[link.uid].chatId}`);
      links[link.uid] = { chatId, username: m.from?.username || '', lang, at: new Date().toISOString() };
      await saveLinks(links); await S().set(`bot/chat/${chatId}`, link.uid);
      const p = await getProfile(link.uid);
      await tgSend(chatId, L[lang].hello((p?.name || m.from?.first_name || '').split(' ')[0]), { reply_markup: KB });
      return new Response('ok');
    }
    if (m.contact) {   // connect by phone number (Telegram's "share my number" button)
      if (m.contact.user_id && m.contact.user_id !== m.from?.id) { await tgSend(chatId, L[lang].phoneOwn, { reply_markup: PHONE_KB(lang) }); return new Response('ok'); }
      const cands = await matchPhone(m.contact.phone_number);
      if (!cands.length) { await tgSend(chatId, L[lang].phoneNone('+' + String(m.contact.phone_number).replace(/^\+/, '')), { reply_markup: { remove_keyboard: true } }); return new Response('ok'); }
      if (cands.length === 1) { await linkChat(cands[0].key, chatId, m.from?.username, lang); await tgSend(chatId, L[lang].hello(cands[0].name.split(' ')[0]), { reply_markup: KB }); return new Response('ok'); }
      await S().setJSON(`bot/phonepick/${chatId}`, { cands: cands.slice(0, 8), lang, exp: Date.now() + 30 * 60e3 });
      await tgSend(chatId, L[lang].phonePick, { reply_markup: { inline_keyboard: cands.slice(0, 8).map((c, i) => [{ text: c.name + (c.classes ? ' · ' + c.classes : ''), callback_data: 'ph:' + i }]) } });
      return new Response('ok');
    }
    if (!uid) {   // not connected: answer questions about the school, and explain how to connect
      if (!text || /^\/start\b/i.test(text)) { await tgSend(chatId, L[lang].unlinked, { reply_markup: PHONE_KB(lang) }); return new Response('ok'); }
      if (!(await allow('chat:' + chatId, false))) { await tgSend(chatId, L[lang].busy); return new Response('ok'); }
      tg('sendChatAction', { chat_id: chatId, action: 'typing' }).catch(() => {});
      const hk = `bot/hist/${chatId}`, hist = (await S().get(hk, { type: 'json' })) || [];
      hist.push({ role: 'user', content: text.slice(0, 2000) });
      const answer = await publicReply(hist); hist.push({ role: 'assistant', content: answer });
      await S().setJSON(hk, hist.slice(-12));
      await tgSend(chatId, answer || L[lang].error, { reply_markup: PHONE_KB(lang) });
      return new Response('ok');
    }

    const links = await getLinks();
    if (links[uid] && links[uid].lang !== lang) { links[uid].lang = lang; await saveLinks(links); }
    if (/^\/stop\b/i.test(text)) {
      delete links[uid]; await saveLinks(links); await S().delete(`bot/chat/${chatId}`);
      await tgSend(chatId, L[lang].stopped, { reply_markup: { remove_keyboard: true } }); return new Response('ok');
    }
    if (m.photo || m.document) { tg('sendChatAction', { chat_id: chatId, action: 'typing' }).catch(() => {}); await handleReceipt({ chatId, uid, msg: m, lang }); return new Response('ok'); }
    if (/^\/receipt\b|^📎/i.test(text)) { await tgSend(chatId, L[lang].receiptHow, { reply_markup: KB }); return new Response('ok'); }
    if (/^\/start\b|^\/help\b|^❓/i.test(text)) { await tgSend(chatId, L[lang].help, { reply_markup: KB }); return new Response('ok'); }
    const ctx = await contextFor(uid);
    if (!ctx) { await tgSend(chatId, L[lang].unlinked, { reply_markup: PHONE_KB(lang) }); return new Response('ok'); }
    if (/^\/next\b|^📅/i.test(text)) { await tgSend(chatId, ctx.student || ctx.classes.length ? nextText(ctx, lang) : L[lang].unlinkedRecord); return new Response('ok'); }
    if (/^\/hw\b|^\/homework\b|^📝/i.test(text)) { await tgSend(chatId, ctx.classes.length ? hwListText(forClasses(await loadHomework(), ctx.classes.map(c => c.id), { past: 0 }).filter(isUpcoming), lang) : L[lang].unlinkedRecord); return new Response('ok'); }
    if (/^\/pay\b|^💳/i.test(text)) { await tgSend(chatId, ctx.student ? payText(ctx, lang) : L[lang].unlinkedRecord); return new Response('ok'); }
    if (!text) { await tgSend(chatId, L[lang].help); return new Response('ok'); }

    if (!(await allow(uid, ctx.role !== 'student'))) { await tgSend(chatId, L[lang].busy); return new Response('ok'); }
    tg('sendChatAction', { chat_id: chatId, action: 'typing' }).catch(() => {});
    const hk = `bot/hist/${chatId}`;
    const hist = (await S().get(hk, { type: 'json' })) || [];
    hist.push({ role: 'user', content: text.slice(0, 2000) });
    const answer = await reply(ctx, hist);
    hist.push({ role: 'assistant', content: answer });
    await S().setJSON(hk, hist.slice(-12));
    await tgSend(chatId, answer || L[lang].error);
  } catch (e) {
    console.error('telegram update failed', e?.message);
    try { await tgSend(chatId, L[lang].error); } catch {}
  }
  return new Response('ok');
};
