import { testLink } from '../lib/testcentres.mjs';
// Telegram webhook for the IF Academy bot (background function: Telegram gets an immediate 202, the AI reply follows).
// Webhook URL and secret are set from Admin → Bot ("Connect bot"), which calls setWebhook with a secret derived from the token.
import { S, getProfile, contextFor, reply, publicReply, allow, tgSecret, tgSend, tg, getLinks, saveLinks, linkChat, matchPhone, local, money, langOf, localise } from '../lib/bot-core.mjs';
import { handleReceipt, decideReceipt, cashInfo, cashClaim, mname } from '../lib/receipts.mjs';
import { kaspiReady, kaspiTexts, kaspiInfo, createInvoice } from '../lib/kaspi.mjs';
import { loadHomework, forClasses, isUpcoming } from '../lib/homework.mjs';
import { isStaff, STAFF_KB, STAFF_HELP, staffHello, sendToday, staffCallback, ensureStaffKb, cancelReasonText, sendRegisterMenu, kbFor, helpFor, helloFor, isAdminP, sendSchoolDay, sendTodo, sendWeek, sendChanges, sendFilming } from '../lib/teachbot.mjs';
import { startCover, coverCallback } from '../lib/cover.mjs';
import { startHomework, hwCallback, hwMessage } from '../lib/teachhw.mjs';
import { startTask, ctCallback, ctMessage, ctAnswer, ctPollAnswer, studentTask, catchUp } from '../lib/classtask.mjs';
import { U } from '../lib/bot-core.mjs';

const SITE = 'https://intellectfirst.com/me/#/assistant';
const PHONE_KB = lang => ({ keyboard: [[{ text: { en: '📱 Connect with my phone number', ru: '📱 Подключиться по номеру телефона', kk: '📱 Телефон нөмірі арқылы қосылу' }[lang] || '📱 Connect with my phone number', request_contact: true }]], resize_keyboard: true, one_time_keyboard: true });
const APP_URL = (process.env.URL || 'https://intellectfirst.com').replace(/\/$/, '') + '/app/?tg=1';   // IF English as a Telegram Mini App
const ME_URL = APP_URL.replace('/app/', '/me/');   // My account: results, attendance, progress, payments (teachers: classes, registers; admin: everything)
const CASH = {
  en: { ask0: 'Paid in cash at the school? Tell us here instead of sending a receipt:', btn: '💵 I paid in cash', ask: (n, m) => `💵 Cash payment for ${n} (${m}). How much did you pay?`, paid: a => `✅ I paid ${a} in cash`, other: '✍️ Another amount', type: 'Type the amount you paid in cash, e.g. 45000', thanks: (a, m) => `💵 Thank you! Cash payment of ${a} for ${m} reported. The school will confirm it once the cash is received, and you'll get a message here.`, waiting: 'Your last payment is still waiting for the school to confirm it. You will get a message here.', none: 'I could not find your student record. Please tell the school you paid in cash.' },
  ru: { ask0: 'Оплатили наличными в школе? Сообщите здесь вместо чека:', btn: '💵 Я оплатил(а) наличными', ask: (n, m) => `💵 Оплата наличными: ${n} (${m}). Сколько вы заплатили?`, paid: a => `✅ Я оплатил(а) ${a} наличными`, other: '✍️ Другая сумма', type: 'Напишите сумму, которую вы оплатили наличными, например 45000', thanks: (a, m) => `💵 Спасибо! Оплата наличными ${a} за ${m} отмечена. Школа подтвердит её после получения денег, и вы получите сообщение здесь.`, waiting: 'Ваша прошлая оплата ещё ждёт подтверждения школы. Вы получите сообщение здесь.', none: 'Не нашёл вашу запись ученика. Пожалуйста, сообщите школе, что вы оплатили наличными.' },
  kk: { ask0: 'Мектепте қолма-қол төледіңіз бе? Түбіртектің орнына осында хабарлаңыз:', btn: '💵 Қолма-қол төледім', ask: (n, m) => `💵 Қолма-қол төлем: ${n} (${m}). Қанша төледіңіз?`, paid: a => `✅ ${a} қолма-қол төледім`, other: '✍️ Басқа сома', type: 'Қолма-қол төлеген соманы жазыңыз, мысалы 45000', thanks: (a, m) => `💵 Рахмет! ${m} үшін ${a} қолма-қол төлем белгіленді. Мектеп ақшаны алған соң растайды, хабарламаны осында аласыз.`, waiting: 'Алдыңғы төлеміңіз мектептің растауын күтуде. Хабарламаны осында аласыз.', none: 'Оқушы жазбаңызды таппадым. Мектепке қолма-қол төлегеніңізді айтыңыз.' }
};
import { STUDENT_KB as KB, ensureStudentKb } from '../lib/classtask.mjs';
const L = {
  en: {
    hello: n => `Hi ${n}! 👋 Your IF Academy account is connected.\nI'll remind you about lessons (the evening before and 2 hours before), homework, tests and tuition payments. After paying, send the receipt here.\nAsk me anything about your classes, or practise English with me.`,
    unlinked: `Hi! 👋 This is the IF Academy assistant. Ask me anything about the school: courses, prices, the timetable, the placement test. 💰 Prices: /prices\n\nIF Academy students and parents: press "📱 Connect with my phone number" below to get lesson, homework and payment reminders here. Use the number the school has for you.`,
    phoneOwn: 'Please share your own number with the button below (not someone else\'s contact).',
    phoneNone: n => `I couldn't find the number ${n} in IF Academy's records. Please send the school the number you use (@abliem or WhatsApp +7 707 381 0988), or connect from the website: ${SITE}`,
    phonePick: 'This number belongs to more than one student. Who are you connecting?',
    expired: `This link has expired. Open ${SITE} and press "Connect Telegram" again.`,
    stopped: 'Disconnected. You will not get reminders here any more. You can reconnect from the website at any time.',
    busy: 'You have reached today\'s message limit. Please try again tomorrow.',
    error: 'Sorry, I could not answer just now. Please try again in a minute.',
    help: 'I can:\n- open IF English right here: courses, vocabulary, grammar, games and tests (📚)\n- open your account: results, attendance, progress and payments (👤)\n- show your next lessons (📅)\n- show your homework and tests (📝)\n- show your test results (📊)\n- show your tuition status (💳) and take your payment receipt (📎: just send the photo or PDF)\n- answer questions about your classes, results and the school\n- help with English: grammar, words, corrections, speaking practice\n/stop disconnects this chat.',
    hwNone: 'No homework or tests set for the next days. 🎉', receiptHow: '📎 Send the payment receipt here as a photo or PDF (Kaspi or bank). AI reads it and the school confirms it.',
    none: 'No lessons with a set time in the next 7 days.', nopay: 'No payment plan is recorded for you on the website. Please ask the administrator.',
    unlinkedRecord: 'Your account is not linked to a school record yet. Add the phone number the school has for you in your website profile.'
  },
  ru: {
    hello: n => `Здравствуйте, ${n}! 👋 Ваш аккаунт IF Academy подключён.\nЯ буду напоминать о занятиях (накануне вечером и за 2 часа), домашних заданиях, тестах и оплате. После оплаты отправьте чек сюда.\nСпрашивайте о своих занятиях или практикуйте английский со мной.`,
    unlinked: `Здравствуйте! 👋 Это помощник IF Academy. Спрашивайте о школе: курсы, цены, расписание, тест уровня. 💰 Цены: /prices\n\nУченикам и родителям IF Academy: нажмите «📱 Подключиться по номеру телефона» ниже, чтобы получать здесь напоминания о занятиях, домашних заданиях и оплате. Используйте номер, который есть у школы.`,
    phoneOwn: 'Пожалуйста, отправьте свой номер кнопкой ниже (а не чужой контакт).',
    phoneNone: n => `Номер ${n} не найден в базе IF Academy. Сообщите школе номер, которым пользуетесь (@abliem или WhatsApp +7 707 381 0988), или подключитесь на сайте: ${SITE}`,
    phonePick: 'Этот номер указан у нескольких учеников. Кого подключаем?',
    expired: `Ссылка устарела. Откройте ${SITE} и снова нажмите «Connect Telegram».`,
    stopped: 'Чат отключён, напоминания сюда больше не придут. Подключиться снова можно на сайте.',
    busy: 'Дневной лимит сообщений исчерпан. Попробуйте завтра.',
    error: 'Не получилось ответить. Попробуйте ещё раз через минуту.',
    help: 'Я умею:\n- открывать IF English прямо здесь: курсы, лексика, грамматика, игры и тесты (📚)\n- открывать ваш аккаунт: результаты, посещаемость, прогресс и оплаты (👤)\n- показывать ближайшие занятия (📅)\n- показывать домашние задания и тесты (📝)\n- показывать результаты тестов (📊)\n- показывать статус оплаты (💳) и принимать чек (📎: просто отправьте фото или PDF)\n- отвечать на вопросы о занятиях, результатах и школе\n- помогать с английским: грамматика, слова, исправления, разговорная практика\n/stop — отключить этот чат.',
    hwNone: 'На ближайшие дни нет домашних заданий и тестов. 🎉', receiptHow: '📎 Отправьте сюда чек об оплате фото или PDF (Kaspi или банк). ИИ прочитает его, а школа подтвердит.',
    none: 'В ближайшие 7 дней нет занятий с указанным временем.', nopay: 'План оплаты на сайте не указан. Уточните у администратора.',
    unlinkedRecord: 'Ваш аккаунт ещё не связан с записью в школе. Укажите в профиле на сайте номер телефона, который есть у школы.'
  }
};
L.kk = { ...L.ru,
  hello: n => `Сәлем, ${n}! 👋 IF Academy аккаунтыңыз қосылды.\nСабақтар (алдыңғы күні кешке және 2 сағат бұрын), үй тапсырмасы, тесттер мен төлем туралы еске саламын. Төлегеннен кейін түбіртекті осында жіберіңіз.\nСабақтарыңыз туралы сұраңыз немесе менімен ағылшын тілін жаттықтырыңыз.`,
  stopped: 'Чат ажыратылды, енді еске салулар келмейді. Сайттан қайта қосуға болады.',
  none: 'Алдағы 7 күнде уақыты көрсетілген сабақ жоқ.',
  unlinked: `Сәлем! 👋 Бұл IF Academy көмекшісі. Мектеп туралы сұраңыз: курстар, бағалар, кесте, деңгей тесті. 💰 Бағалар: /prices\n\nIF Academy оқушылары мен ата-аналары: сабақ, үй тапсырмасы және төлем туралы еске салуларды алу үшін төмендегі «📱 Телефон нөмірі арқылы қосылу» батырмасын басыңыз. Мектепте тіркелген нөмірді пайдаланыңыз.`,
  phoneOwn: 'Төмендегі батырма арқылы өз нөміріңізді жіберіңіз (басқа біреудің контактісін емес).',
  phoneNone: n => `${n} нөмірі IF Academy базасынан табылмады. Пайдаланатын нөміріңізді мектепке хабарлаңыз (@abliem немесе WhatsApp +7 707 381 0988) немесе сайт арқылы қосылыңыз: ${SITE}`,
  phonePick: 'Бұл нөмір бірнеше оқушыда көрсетілген. Кімді қосамыз?', hwNone: 'Алдағы күндерге үй тапсырмасы мен тест жоқ. 🎉', receiptHow: '📎 Төлем түбіртегін осында фото немесе PDF ретінде жіберіңіз (Kaspi немесе банк). ЖИ оқиды, мектеп растайды.' };
const DAY = { en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], kk: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'] };

function nextText(ctx, lang) {
  if (!ctx.lessons.length) return L[lang].none;
  return ctx.lessons.slice(0, 5).map(x => { const d = local(x.at); return `📅 ${DAY[lang][d.getUTCDay()]} ${x.date.slice(8)}.${x.date.slice(5, 7)} ${x.start}${x.end ? '–' + x.end : ''} — ${x.label}${x.room ? ' · ' + x.room : ''}`; }).join('\n');
}
const HWS = { en: { done: '✅ checked: done', part: '🟡 checked: partly done', not: '❌ checked: not done', claimed: '⏳ waiting for the teacher to check' }, ru: { done: '✅ проверено: выполнено', part: '🟡 проверено: частично', not: '❌ проверено: не выполнено', claimed: '⏳ ждёт проверки учителя' } };
function hwListText(items, lang, sid, checked) {
  const st = h => { const c = sid && h.checks && h.checks[sid]; return c ? ' — ' + ((HWS[lang] || HWS.en)[c.s] || '') : ''; };
  const all = items.concat((checked || []).filter(h => !items.includes(h)));
  if (!all.length) return L[lang].hwNone;
  return all.slice(0, 10).map(h => `${h.kind === 'test' ? '🧪' : '📝'} ${h.due.slice(8)}.${h.due.slice(5, 7)}${h.time ? ' ' + h.time : ''} · ${h.classLabel}: ${h.text}${st(h)}`).join('\n');
}
/** "📊 My results": school tests from IF Admin (English File, Cambridge, placement…) and IELTS Centre results. */
const RES = {
  en: { title: '📊 Your results', school: 'School tests', ielts: 'IELTS Centre', none: 'No test results yet. They appear here after your teacher records a test, or when you do a test in the IELTS Centre.', more: 'All results: intellectfirst.com/me (Results) and intellectfirst.com/a/ielts (Progress)', band: 'band', practice: 'practice', mock: 'mock' },
  ru: { title: '📊 Ваши результаты', school: 'Тесты в школе', ielts: 'IELTS Centre', none: 'Результатов пока нет. Они появятся здесь, когда учитель внесёт тест или когда вы пройдёте тест в IELTS Centre.', more: 'Все результаты: intellectfirst.com/me (Results) и intellectfirst.com/a/ielts (Progress)', band: 'балл', practice: 'практика', mock: 'пробный тест' },
  kk: { title: '📊 Нәтижелеріңіз', school: 'Мектептегі тесттер', ielts: 'IELTS Centre', none: 'Әзірге нәтиже жоқ. Мұғалім тестті енгізгенде немесе IELTS Centre-де тест тапсырғанда осында шығады.', more: 'Барлық нәтиже: intellectfirst.com/me (Results) және intellectfirst.com/a/ielts (Progress)', band: 'балл', practice: 'жаттығу', mock: 'сынақ тест' }
};
async function resultsText(ctx, uid, lang) {
  const t = RES[lang] || RES.en, out = [t.title];
  const d = iso => iso ? String(iso).slice(8, 10) + '.' + String(iso).slice(5, 7) : '';
  const school = ((ctx.student && ctx.student.tests) || []).slice(-8).reverse();
  if (school.length) out.push('', '🏫 ' + t.school + ':', ...school.map(x => `• ${d(x.date)} ${x.test}: ${x.score !== '' && x.score != null ? x.score + (x.max ? '/' + x.max : '') : x.band || '–'}${x.note ? '\n   ' + x.note : ''}`));
  let ie = [];
  if (uid && !String(uid).startsWith('sid:')) ie = ((await U().get(`u/${uid}/index`, { type: 'json' }).catch(() => null)) || []).slice(-8).reverse();
  if (ie.length) {
    const SK = { writing: '✍️', speaking: '🗣', reading: '📖', listening: '🎧' };
    out.push('', '🎓 ' + t.ielts + ':', ...ie.map(a => `• ${d(a.at)} ${SK[a.skill || 'writing'] || '•'} ${a.title || ''}${a.total ? ` — ${a.score}/${a.total}` : ''}${typeof a.band === 'number' ? ` — ${t.band} ${a.band % 1 ? a.band.toFixed(1) : a.band + '.0'}` : ''}`));
  }
  if (!school.length && !ie.length) return t.none;
  out.push('', t.more);
  return out.join('\n');
}

/* The bot's "Menu" (command list). Students get the general list; teachers get their own list in their chat.
   Updated automatically when the list changes (CMDV), so nobody has to press "Connect bot" again. */
const CMDV = '2026-11-22t';
const CMDS = {
  en: [['app', 'Open IF English'], ['account', 'My account: results, attendance, payments'], ['task', 'Class task (in the lesson)'], ['next', 'Next lessons'], ['cancel', "Can't come: cancel a lesson"], ['homework', 'Homework & tests'], ['results', 'My test results'], ['pay', 'Tuition status'], ['prices', 'Prices and packages'], ['help', 'What I can do'], ['stop', 'Disconnect this chat']],
  ru: [['app', 'Открыть IF English'], ['account', 'Мой аккаунт: результаты, посещаемость, оплаты'], ['task', 'Задание на уроке'], ['next', 'Ближайшие занятия'], ['cancel', 'Не смогу прийти: отменить занятие'], ['homework', 'Домашние задания и тесты'], ['results', 'Мои результаты'], ['pay', 'Статус оплаты'], ['prices', 'Цены и пакеты'], ['help', 'Что я умею'], ['stop', 'Отключить чат']]
};
const STAFF_CMDS = [['app', 'Open IF English (Teach mode too)'], ['account', 'My account: classes, registers, admin'], ['today', "Today's lessons: clock in, register"], ['register', 'Take or correct a register'], ['cover', 'Ask a colleague to cover a lesson'], ['task', 'Class task: quiz, poll, writing or speaking'], ['sendhw', 'Send homework or a test to a class'], ['sendtest', 'Send a test (online now, or a date)'], ['next', 'Next lessons'], ['help', 'Help for teachers'], ['stop', 'Disconnect this chat']];
const asCmds = l => l.map(([command, description]) => ({ command, description }));
async function syncCommands(chatId, staff) {
  try {
    if ((await S().get('bot/cmdsv')) !== CMDV) {
      await tg('setMyCommands', { commands: asCmds(CMDS.en) });
      await tg('setMyCommands', { commands: asCmds(CMDS.ru), language_code: 'ru' });
      await tg('setChatMenuButton', { menu_button: { type: 'web_app', text: 'IF Academy', web_app: { url: ME_URL } } }).catch(e => console.error('menu button', e.message));
      await S().set('bot/cmdsv', CMDV);
    }
    if (staff && chatId && (await S().get(`bot/cmds/${chatId}`)) !== CMDV) {
      await tg('setMyCommands', { commands: asCmds(STAFF_CMDS), scope: { type: 'chat', chat_id: chatId } });
      await S().set(`bot/cmds/${chatId}`, CMDV);
    }
  } catch (e) { console.error('bot commands', e.message); }
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
  // a student answered a class-task quiz or poll
  if (up?.poll_answer) { try { await ctPollAnswer(up.poll_answer); } catch (e) { console.error('class task vote', e.message); } return new Response('ok'); }
  // the director presses Confirm / Not right under a receipt
  if (up?.callback_query) {
    const q = up.callback_query, mm = String(q.data || '').match(/^rc:(ok|no):([a-z0-9]+)$/);
    if (/^kp:/.test(String(q.data || ''))) {   // "Pay with Kaspi": the invoice goes to the student's or the parent's Kaspi number on the school record
      try {
        const chatId = q.message?.chat?.id, links = await getLinks(), ent = Object.entries(links).find(([, l]) => l.chatId === chatId), uid = ent?.[0], lang = ent?.[1]?.lang || 'ru', K = kaspiTexts(lang);
        await tg('answerCallbackQuery', { callback_query_id: q.id }).catch(() => {});
        const info = uid ? await kaspiInfo(uid) : null;
        if (!info?.ready) { await tgSend(chatId, kaspiReady() ? K.none : K.off); return new Response('ok'); }
        const which = q.data === 'kp:s' ? 's' : q.data === 'kp:p' ? 'p' : '';
        if (!which && info.open) { await tgSend(chatId, K.already(info.open.phone)); return new Response('ok'); }
        if (!(info.amount >= 100)) { await tgSend(chatId, K.nothing); return new Response('ok'); }
        if (!which && info.phones.length > 1) {
          await tgSend(chatId, K.which(money(info.amount), mname(info.month, lang)), { reply_markup: { inline_keyboard: info.phones.map(p => [{ text: `${p.k === 'p' ? K.parent : K.own}: ${p.mask}`, callback_data: 'kp:' + p.k }]) } });
          return new Response('ok');
        }
        const r = await createInvoice({ uid, which, chatId, lang });
        await tgSend(chatId, r.ok ? (r.already ? K.already(r.phone) : K.sent(money(r.amount), mname(r.month, lang), r.phone)) : K[r.error] || K.failed);
      } catch (e) { console.error('kaspi button', e.message); }
      return new Response('ok');
    }
    if (/^cash:/.test(String(q.data || ''))) {   // a student says they paid in cash
      try {
        const chatId = q.message?.chat?.id, links = await getLinks(), ent = Object.entries(links).find(([, l]) => l.chatId === chatId), uid = ent?.[0], lang = ent?.[1]?.lang || 'ru', C = CASH[lang] || CASH.en;
        await tg('answerCallbackQuery', { callback_query_id: q.id }).catch(() => {});
        const info = uid ? await cashInfo(uid) : null;
        if (!info) { await tgSend(chatId, C.none); return new Response('ok'); }
        if (q.data === 'cash:start') {
          if (info.waiting) { await tgSend(chatId, C.waiting); return new Response('ok'); }
          const rows = []; if (info.fee) rows.push([{ text: C.paid(money(info.fee)), callback_data: 'cash:ok' }]);
          rows.push([{ text: C.other, callback_data: 'cash:amt' }]);
          await tgSend(chatId, C.ask(info.name, info.month), { reply_markup: { inline_keyboard: rows } });
        } else if (q.data === 'cash:ok') {
          const r = await cashClaim({ uid, amount: info.fee, chatId, lang });
          await tgSend(chatId, r ? C.thanks(money(r.amount), r.monthName) : C.none);
        } else if (q.data === 'cash:amt') {
          await S().setJSON(`bot/cashflow/${chatId}`, { exp: Date.now() + 15 * 60e3 });
          await tgSend(chatId, C.type);
        }
      } catch (e) { console.error('cash', e.message); }
      return new Response('ok');
    }
    const pk = String(q.data || '').match(/^ph:(\d+)$/);
    if (pk) {   // a parent's number matched several children: they picked one
      try {
        const chatId = q.message?.chat?.id, pend = await S().get(`bot/phonepick/${chatId}`, { type: 'json' });
        const c = pend && pend.exp > Date.now() && pend.cands[+pk[1]];
        const lang = pend?.lang || 'ru';
        if (!c) { await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Expired. Share your number again.' }); return new Response('ok'); }
        await linkChat(c.key, chatId, q.from?.username, lang); await S().delete(`bot/phonepick/${chatId}`);
        await tg('answerCallbackQuery', { callback_query_id: q.id, text: '✓' });
        const pp = await getProfile(c.key), sp = isStaff(pp), f = c.name.split(' ')[0]; await tgSend(chatId, sp ? helloFor(pp, f) : L[lang].hello(f), { reply_markup: sp ? kbFor(pp) : KB }); await catchUp().catch(e => console.error('ct catchup', e.message));
      } catch (e) { console.error('phone pick', e.message); }
      return new Response('ok');
    }
    if (/^ct:/.test(String(q.data || ''))) {
      try { const uid = await S().get(`bot/chat/${q.message?.chat?.id || q.from?.id}`), p = uid && await getProfile(uid); if (!isStaff(p)) await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Only teachers can do this.' }); else await ctCallback(q, p); }
      catch (e) { console.error('class task button', e.message); await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Something went wrong. Try again.' }).catch(() => {}); }
      return new Response('ok');
    }
    if (/^hw:/.test(String(q.data || ''))) {
      try { const uid = await S().get(`bot/chat/${q.message?.chat?.id || q.from?.id}`), p = uid && await getProfile(uid); if (!isStaff(p)) await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Only teachers can do this.' }); else await hwCallback(q, p); }
      catch (e) { console.error('homework button', e.message); await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Something went wrong. Try again.' }).catch(() => {}); }
      return new Response('ok');
    }
    if (/^(cov:|cow:|coa:|cod:|cou$|cox$|com:|cog:)/.test(String(q.data || ''))) {
      try { const uid = await S().get(`bot/chat/${q.message?.chat?.id || q.from?.id}`), p = uid && await getProfile(uid); await coverCallback(q, uid, p || null); }
      catch (e) { console.error('cover button', e.message); await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Something went wrong. Try again.' }).catch(() => {}); }
      return new Response('ok');
    }
    if (/^lc:/.test(String(q.data || ''))) {   // a student cancels a lesson (lib/cancel.mjs)
      try { const uid = await S().get(`bot/chat/${q.message?.chat?.id || q.from?.id}`), lk = uid && (await getLinks())[uid]; const { botCallback } = await import('../lib/cancel.mjs'); await botCallback(q, uid, (lk && lk.lang) || langOf(q.from?.language_code)); }
      catch (e) { console.error('cancel button', e.message); await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Something went wrong. Try again.' }).catch(() => {}); }
      return new Response('ok');
    }
    if (/^(ci:|ro:|rt:\d|ra$|rs$|lx:|lr:|lt:|lu$|lw$)/.test(String(q.data || ''))) {
      try { const uid = await S().get(`bot/chat/${q.message?.chat?.id || q.from?.id}`), p = uid && await getProfile(uid); await staffCallback(q, uid, p || null); }
      catch (e) { console.error('staff button', e.message); await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Something went wrong. Try again.' }).catch(() => {}); }
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
      const f = (p?.name || m.from?.first_name || '').split(' ')[0]; await tgSend(chatId, isStaff(p) ? helloFor(p, f) : L[lang].hello(f), { reply_markup: isStaff(p) ? kbFor(p) : KB }); await catchUp().catch(e => console.error('ct catchup', e.message));
      return new Response('ok');
    }
    if (m.contact) {   // connect by phone number (Telegram's "share my number" button)
      if (m.contact.user_id && m.contact.user_id !== m.from?.id) { await tgSend(chatId, L[lang].phoneOwn, { reply_markup: PHONE_KB(lang) }); return new Response('ok'); }
      const cands = await matchPhone(m.contact.phone_number);
      if (!cands.length) { await tgSend(chatId, L[lang].phoneNone('+' + String(m.contact.phone_number).replace(/^\+/, '')), { reply_markup: { remove_keyboard: true } }); return new Response('ok'); }
      if (cands.length === 1) { await linkChat(cands[0].key, chatId, m.from?.username, lang); const pp = await getProfile(cands[0].key), sp = isStaff(pp), f = cands[0].name.split(' ')[0]; await tgSend(chatId, sp ? helloFor(pp, f) : L[lang].hello(f), { reply_markup: sp ? kbFor(pp) : KB }); await catchUp().catch(e => console.error('ct catchup', e.message)); return new Response('ok'); }
      await S().setJSON(`bot/phonepick/${chatId}`, { cands: cands.slice(0, 8), lang, exp: Date.now() + 30 * 60e3 });
      await tgSend(chatId, L[lang].phonePick, { reply_markup: { inline_keyboard: cands.slice(0, 8).map((c, i) => [{ text: c.name + (c.classes ? ' · ' + c.classes : ''), callback_data: 'ph:' + i }]) } });
      return new Response('ok');
    }
    // prices (2026–27 brochure + individual lesson packages): for everyone, connected or not
    if (/^\/prices?\b|^💰|^\/цены?\b/i.test(text || '')) {
      const { priceText, priceButtons } = await import('../lib/prices.mjs');
      await tgSend(chatId, priceText(lang), { reply_markup: priceButtons(lang) }); return new Response('ok');
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
    const me = await getProfile(uid).catch(() => null);
    await syncCommands(chatId, isStaff(me));
    if (isStaff(me) && await ensureStaffKb(chatId, me) && /^\/start\b|^\/help\b|^❓|^💳|^📎|^📝 Homework/i.test(text)) return new Response('ok');
    if (!isStaff(me) && links[uid] && await ensureStudentKb(chatId, lang) && /^\/start\b|^\/help\b|^❓/i.test(text)) return new Response('ok');
    if (isStaff(me) && /^📝 Send homework|^\/sendhw\b|^\/sethw\b/i.test(text)) { await startHomework(chatId, me); return new Response('ok'); }
    // Apps opened from the reply keyboard get no sign-in data from Telegram, so these buttons answer with buttons
    // under the message (which do), and the bot's Menu button (next to the text box) opens My account directly.
    if (/^📚|^👤/.test(text)) {
      const en = lang === 'en', acc = /^👤/.test(text);
      await tgSend(chatId, acc ? (en ? '👤 Your IF Academy account — results, attendance, progress and payments. You are signed in automatically.' : '👤 Ваш аккаунт IF Academy — результаты, посещаемость, прогресс и оплаты. Вход выполняется автоматически.')
        : (en ? '📚 IF English: courses, vocabulary, grammar, games and tests. You are signed in automatically.' : '📚 IF English: курсы, лексика, грамматика, игры и тесты. Вход выполняется автоматически.'),
        { reply_markup: { inline_keyboard: acc ? [[{ text: en ? '👤 Open My account' : '👤 Открыть мой аккаунт', web_app: { url: ME_URL } }], [{ text: '📚 IF English', web_app: { url: APP_URL } }]]
          : [[{ text: en ? '📚 Open IF English' : '📚 Открыть IF English', web_app: { url: APP_URL } }], [{ text: '👤 My account', web_app: { url: ME_URL } }]] } });
      return new Response('ok');
    }
    if (/^\/account\b|^\/me\b/i.test(text)) { await tgSend(chatId, lang === 'en' ? '👤 Your IF Academy account, right here in Telegram.' : '👤 Ваш аккаунт IF Academy прямо в Telegram.', { reply_markup: { inline_keyboard: [[{ text: '👤 Open My account', web_app: { url: ME_URL } }]] } }); return new Response('ok'); }
    if (/^\/app\b|^\/english\b/i.test(text)) { await tgSend(chatId, lang === 'en' ? '📚 IF English: courses, vocabulary, grammar, games and tests — right here in Telegram. Your progress is saved to your account.' : '📚 IF English: курсы, лексика, грамматика, игры и тесты — прямо в Telegram. Прогресс сохраняется в вашем аккаунте.', { reply_markup: { inline_keyboard: [[{ text: '📚 Open IF English', web_app: { url: APP_URL } }], [{ text: '👤 My account', web_app: { url: ME_URL } }]] } }); return new Response('ok'); }
    if (isStaff(me) && /^🎯 Class task|^\/task\b|^\/classtask\b/i.test(text)) { await startTask(chatId, me); return new Response('ok'); }
    if (isStaff(me) && await hwMessage(chatId, me, m)) return new Response('ok');
    if (isStaff(me) && await ctMessage(chatId, me, m)) return new Response('ok');
    if (!isStaff(me) && await ctAnswer(chatId, m, lang)) return new Response('ok');
    if (m.photo || m.document) { tg('sendChatAction', { chat_id: chatId, action: 'typing' }).catch(() => {}); await handleReceipt({ chatId, uid, msg: m, lang }); return new Response('ok'); }
    if (isStaff(me) && await cancelReasonText(chatId, text)) return new Response('ok');
    if (isStaff(me) && /^🔁|^\/cover\b/i.test(text)) { await startCover(chatId, uid, me); return new Response('ok'); }
    if (isStaff(me) && (isAdminP(me) || me.smm)) {   // director, manager, SMM menus
      if (/^🏫|^\/school\b/i.test(text) && isAdminP(me)) { await sendSchoolDay(chatId, me); return new Response('ok'); }
      if (/^📋 To-do|^\/todo\b/i.test(text) && isAdminP(me)) { await sendTodo(chatId, me); return new Response('ok'); }
      if (/^💳 Payments due|^\/due\b/i.test(text) && isAdminP(me)) { await sendTodo(chatId, me, 'payment'); return new Response('ok'); }
      if (/^🕑 My lessons|^\/mine\b/i.test(text) && isAdminP(me)) { await sendToday(chatId, uid, me, true); return new Response('ok'); }
      if (/^📆|^\/week\b/i.test(text)) { await sendWeek(chatId, me); return new Response('ok'); }
      if (/^🔔|^\/changes\b/i.test(text)) { await sendChanges(chatId, me); return new Response('ok'); }
      if (/^🎬|^\/film\b/i.test(text)) { await sendFilming(chatId, me); return new Response('ok'); }
      if (/^🕑|^\/today\b/i.test(text) && me.smm && me.role !== 'admin') { await sendSchoolDay(chatId, me); return new Response('ok'); }
    }
    if (isStaff(me) && !(me.smm && me.role !== 'admin') && /^📋 Register|^\/register\b/i.test(text)) { await sendRegisterMenu(chatId, me); return new Response('ok'); }
    if (isStaff(me) && /^\/today\b|^🕑|^\/clock/i.test(text)) { await sendToday(chatId, uid, me); return new Response('ok'); }
    if (isStaff(me) && /^\/start\b|^\/help\b|^❓/i.test(text)) { await tgSend(chatId, helpFor(me), { reply_markup: kbFor(me) }); return new Response('ok'); }
    if (/^\/receipt\b|^📎/i.test(text)) {
      await tgSend(chatId, L[lang].receiptHow, { reply_markup: KB });
      if (kaspiReady()) await tgSend(chatId, kaspiTexts(lang).offer, { reply_markup: { inline_keyboard: [[{ text: kaspiTexts(lang).btn, callback_data: 'kp:start' }]] } });
      await tgSend(chatId, CASH[lang].ask0, { reply_markup: { inline_keyboard: [[{ text: CASH[lang].btn, callback_data: 'cash:start' }]] } });
      return new Response('ok');
    }
    // paid in cash: the amount typed after "Another amount"
    const cf = await S().get(`bot/cashflow/${chatId}`, { type: 'json' }).catch(() => null);
    if (cf && cf.exp > Date.now() && /^[\d\s.,]+(₸|тг|tg|kzt)?$/i.test(text)) {
      await S().delete(`bot/cashflow/${chatId}`);
      const n = +text.replace(/[^\d]/g, '');
      const r = n > 0 ? await cashClaim({ uid, amount: n, chatId, lang }) : null;
      await tgSend(chatId, r ? CASH[lang].thanks(money(r.amount), r.monthName) : CASH[lang].none);
      return new Response('ok');
    }
    if (/^\/start\b|^\/help\b|^❓/i.test(text)) { await tgSend(chatId, L[lang].help, { reply_markup: KB }); return new Response('ok'); }
    const ctx = await contextFor(uid);
    if (!ctx) { await tgSend(chatId, L[lang].unlinked, { reply_markup: PHONE_KB(lang) }); return new Response('ok'); }
    if (!isStaff(ctx.profile) && await (await import('../lib/cancel.mjs')).botReason(chatId, uid, text, lang)) return new Response('ok');   // the reason for a cancellation
    if (!isStaff(ctx.profile) && /^🎯|^\/task\b/i.test(text)) { await studentTask(chatId, ctx, lang); return new Response('ok'); }
    if (/^\/next\b|^📅|^\/cancel\b/i.test(text)) { await tgSend(chatId, ctx.student || ctx.classes.length ? nextText(ctx, lang) : L[lang].unlinkedRecord, { reply_markup: isStaff(ctx.profile) ? kbFor(ctx.profile) : KB }); if (!isStaff(ctx.profile)) await (await import('../lib/cancel.mjs')).botOffer(chatId, ctx, lang).catch(e => console.error('cancel offer', e.message)); return new Response('ok'); }
    if (/^\/hw\b|^\/homework\b|^📝/i.test(text)) {
      const items = ctx.classes.length ? forClasses(await loadHomework(), ctx.classes.map(c => c.id), { past: 0 }).filter(isUpcoming) : [];
      const sid0 = ctx.student && ctx.student.id, checked = sid0 ? forClasses(await loadHomework(), ctx.classes.map(c => c.id), { past: 7 }).filter(h => !isUpcoming(h) && h.checks && h.checks[sid0]) : [];
      await tgSend(chatId, ctx.classes.length ? hwListText(items, lang, sid0, checked) : L[lang].unlinkedRecord, { reply_markup: isStaff(ctx.profile) ? kbFor(ctx.profile) : KB });
      const online = items.filter(h => h.url).slice(0, 6);   // online tests: open straight from here, signed in
      if (online.length) await tgSend(chatId, { en: '🖥 Online tests', ru: '🖥 Онлайн-тесты', kk: '🖥 Онлайн-тесттер' }[lang] || '🖥 Online tests', { reply_markup: { inline_keyboard: online.map(h => [{ text: '🖥 ' + String(h.text).slice(0, 40), web_app: { url: testLink(h, ctx.student, true) } }]) } });
      return new Response('ok');
    }
    if (/^\/results\b|^📊/i.test(text)) { await tgSend(chatId, await resultsText(ctx, uid, lang), { reply_markup: KB }); return new Response('ok'); }
    if (/^\/pay\b|^💳/i.test(text)) {
      await tgSend(chatId, ctx.student ? payText(ctx, lang) : L[lang].unlinkedRecord, { reply_markup: isStaff(ctx.profile) ? kbFor(ctx.profile) : KB });
      if (ctx.student && kaspiReady()) await tgSend(chatId, kaspiTexts(lang).offer, { reply_markup: { inline_keyboard: [[{ text: kaspiTexts(lang).btn, callback_data: 'kp:start' }]] } });
      return new Response('ok');
    }
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
