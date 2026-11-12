// Telegram webhook for the IF Academy bot (background function: Telegram gets an immediate 202, the AI reply follows).
// Webhook URL and secret are set from Admin → Bot ("Connect bot"), which calls setWebhook with a secret derived from the token.
import { S, getProfile, contextFor, reply, allow, tgSecret, tgSend, tg, getLinks, saveLinks, local, money, langOf, localise } from '../lib/bot-core.mjs';

const SITE = 'https://intellectfirst.com/me/#/assistant';
const KB = { keyboard: [[{ text: '📅 Next lessons' }, { text: '💳 Payment' }], [{ text: '❓ Help' }]], resize_keyboard: true, is_persistent: true };
const L = {
  en: {
    hello: n => `Hi ${n}! 👋 Your IF Academy account is connected.\nI'll remind you about lessons (the evening before and 2 hours before) and tuition payments.\nAsk me anything about your classes, or practise English with me.`,
    unlinked: `Hi! 👋 This is the IF Academy assistant.\nTo use me, connect your website account:\n1) open ${SITE}\n2) sign in and press "Connect Telegram".`,
    expired: `This link has expired. Open ${SITE} and press "Connect Telegram" again.`,
    stopped: 'Disconnected. You will not get reminders here any more. You can reconnect from the website at any time.',
    busy: 'You have reached today\'s message limit. Please try again tomorrow.',
    error: 'Sorry, I could not answer just now. Please try again in a minute.',
    help: 'I can:\n- show your next lessons (📅)\n- show your tuition status (💳)\n- answer questions about your classes and results\n- help with English: grammar, words, corrections, speaking practice\n/stop disconnects this chat.',
    none: 'No lessons with a set time in the next 7 days.', nopay: 'No payment plan is recorded for you on the website. Please ask the administrator.',
    unlinkedRecord: 'Your account is not linked to a school record yet. Add the phone number the school has for you in your website profile.'
  },
  ru: {
    hello: n => `Здравствуйте, ${n}! 👋 Ваш аккаунт IF Academy подключён.\nЯ буду напоминать о занятиях (накануне вечером и за 2 часа) и об оплате.\nСпрашивайте о своих занятиях или практикуйте английский со мной.`,
    unlinked: `Здравствуйте! 👋 Это помощник IF Academy.\nЧтобы пользоваться ботом, подключите аккаунт сайта:\n1) откройте ${SITE}\n2) войдите и нажмите «Connect Telegram».`,
    expired: `Ссылка устарела. Откройте ${SITE} и снова нажмите «Connect Telegram».`,
    stopped: 'Чат отключён, напоминания сюда больше не придут. Подключиться снова можно на сайте.',
    busy: 'Дневной лимит сообщений исчерпан. Попробуйте завтра.',
    error: 'Не получилось ответить. Попробуйте ещё раз через минуту.',
    help: 'Я умею:\n- показывать ближайшие занятия (📅)\n- показывать статус оплаты (💳)\n- отвечать на вопросы о ваших занятиях и результатах\n- помогать с английским: грамматика, слова, исправления, разговорная практика\n/stop — отключить этот чат.',
    none: 'В ближайшие 7 дней нет занятий с указанным временем.', nopay: 'План оплаты на сайте не указан. Уточните у администратора.',
    unlinkedRecord: 'Ваш аккаунт ещё не связан с записью в школе. Укажите в профиле на сайте номер телефона, который есть у школы.'
  }
};
L.kk = { ...L.ru,
  hello: n => `Сәлем, ${n}! 👋 IF Academy аккаунтыңыз қосылды.\nСабақтар (алдыңғы күні кешке және 2 сағат бұрын) мен төлем туралы еске саламын.\nСабақтарыңыз туралы сұраңыз немесе менімен ағылшын тілін жаттықтырыңыз.`,
  stopped: 'Чат ажыратылды, енді еске салулар келмейді. Сайттан қайта қосуға болады.',
  none: 'Алдағы 7 күнде уақыты көрсетілген сабақ жоқ.' };
const DAY = { en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], kk: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'] };

function nextText(ctx, lang) {
  if (!ctx.lessons.length) return L[lang].none;
  return ctx.lessons.slice(0, 5).map(x => { const d = local(x.at); return `📅 ${DAY[lang][d.getUTCDay()]} ${x.date.slice(8)}.${x.date.slice(5, 7)} ${x.start}${x.end ? '–' + x.end : ''} — ${x.label}${x.room ? ' · ' + x.room : ''}`; }).join('\n');
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
      if (!link || link.exp < Date.now()) { await tgSend(chatId, L[lang].expired); return new Response('ok'); }
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
    if (!uid) { await tgSend(chatId, L[lang].unlinked); return new Response('ok'); }

    const links = await getLinks();
    if (links[uid] && links[uid].lang !== lang) { links[uid].lang = lang; await saveLinks(links); }
    if (/^\/stop\b/i.test(text)) {
      delete links[uid]; await saveLinks(links); await S().delete(`bot/chat/${chatId}`);
      await tgSend(chatId, L[lang].stopped, { reply_markup: { remove_keyboard: true } }); return new Response('ok');
    }
    if (/^\/start\b|^\/help\b|^❓/i.test(text)) { await tgSend(chatId, L[lang].help, { reply_markup: KB }); return new Response('ok'); }
    const ctx = await contextFor(uid);
    if (!ctx) { await tgSend(chatId, L[lang].unlinked); return new Response('ok'); }
    if (/^\/next\b|^📅/i.test(text)) { await tgSend(chatId, ctx.student || ctx.classes.length ? nextText(ctx, lang) : L[lang].unlinkedRecord); return new Response('ok'); }
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
