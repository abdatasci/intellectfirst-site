// Kaspi invoices for tuition. Kaspi has no public payment API for a small business, so this goes through ApiPay
// (apipay.kz), a REST bridge over the school's own Kaspi Pay "Cashier" role: the invoice lands in the payer's Kaspi app,
// the money goes straight to the school's Kaspi Pay, and the result comes back by webhook (kaspi-background) and by the
// 15-minute check in reminders. A paid invoice marks the month paid in IF Admin with no receipt and nobody confirming.
//   Netlify environment: APIPAY_API_KEY (switches the feature on), APIPAY_WEBHOOK_SECRET (required for the webhook),
//   APIPAY_SANDBOX=1 (test mode: messages are labelled TEST and nothing is written to IF Admin).
//   store "school": kaspi/list (last 300 invoices; no phone numbers, only which number was used), kaspi/done/<id> (paid once)
import { getStore } from '@netlify/blobs';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { S, tgSend, tgToken, getLinks, getProfile, addNote, money, local } from './bot-core.mjs';
import { loadStudents } from './students.mjs';
import { run } from './ifadmin-ai.mjs';
import { waReady, waSend, waNumber } from './whatsapp.mjs';
import { monthFor, mname } from './receipts.mjs';

const BASE = 'https://api.apipay.kz/api/v1';
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
const DAY = 24 * 3600e3;
const OPEN = ['processing', 'pending', 'cancelling'];
const sandbox = () => process.env.APIPAY_SANDBOX === '1';
export const kaspiReady = () => !!process.env.APIPAY_API_KEY;

const T = {
  en: { btn: '💳 Pay with Kaspi', offer: 'Pay in the Kaspi app: we send the invoice to your Kaspi and the payment is confirmed automatically, no receipt needed.',
    which: (a, m) => `💳 Kaspi invoice of ${a} for ${m}. Which Kaspi number should get it?`, own: 'Student', parent: 'Parent',
    sent: (a, m, ph) => `💳 Kaspi invoice of ${a} for ${m} sent to ${ph}.\nOpen the Kaspi app and pay it within 24 hours. You'll get a confirmation here as soon as it is paid.`,
    already: ph => `The Kaspi invoice is already waiting in the Kaspi app (${ph}). Please pay it there.`,
    paid: (a, m) => `✅ Kaspi payment of ${a} for ${m} received. Thank you!`,
    expired: 'The Kaspi invoice was not paid within 24 hours and has expired. Press "Pay with Kaspi" to get a new one.',
    noKaspi: 'This number has no Kaspi account, so the invoice could not be sent. Try the other number, or pay by transfer and send the receipt here.',
    failed: 'The Kaspi invoice could not be sent right now. Please try again a little later, or pay by transfer and send the receipt here.',
    nothing: 'Nothing to pay right now: this month is already paid. Thank you!',
    none: 'I could not find your school record or the tuition amount. Please contact the administrator: @abliem / WhatsApp +7 707 381 0988.',
    noPhone: 'The school has no Kaspi phone number for you yet. Please send it to the administrator: @abliem / WhatsApp +7 707 381 0988.',
    limit: 'Too many invoices today. Please pay the last one in the Kaspi app or contact the administrator.', off: 'Kaspi invoices are not switched on yet. Please pay by transfer and send the receipt here.' },
  ru: { btn: '💳 Оплатить через Kaspi', offer: 'Оплата в приложении Kaspi: мы выставим счёт на ваш Kaspi, и оплата подтвердится автоматически, чек не нужен.',
    which: (a, m) => `💳 Счёт Kaspi на ${a} за ${m}. На какой номер Kaspi его выставить?`, own: 'Ученик', parent: 'Родитель',
    sent: (a, m, ph) => `💳 Счёт Kaspi на ${a} за ${m} выставлен на номер ${ph}.\nОткройте приложение Kaspi и оплатите его в течение 24 часов. Подтверждение придёт сюда сразу после оплаты.`,
    already: ph => `Счёт Kaspi уже ждёт в приложении Kaspi (${ph}). Пожалуйста, оплатите его там.`,
    paid: (a, m) => `✅ Оплата через Kaspi на ${a} за ${m} получена. Спасибо!`,
    expired: 'Счёт Kaspi не был оплачен в течение 24 часов и истёк. Нажмите «Оплатить через Kaspi», чтобы получить новый.',
    noKaspi: 'У этого номера нет Kaspi, поэтому счёт не удалось выставить. Попробуйте другой номер или оплатите переводом и отправьте чек сюда.',
    failed: 'Сейчас не удалось выставить счёт Kaspi. Попробуйте чуть позже или оплатите переводом и отправьте чек сюда.',
    nothing: 'Сейчас платить не нужно: этот месяц уже оплачен. Спасибо!',
    none: 'Не удалось найти вашу запись в школе или сумму оплаты. Свяжитесь с администратором: @abliem / WhatsApp +7 707 381 0988.',
    noPhone: 'У школы пока нет вашего номера Kaspi. Отправьте его администратору: @abliem / WhatsApp +7 707 381 0988.',
    limit: 'Сегодня выставлено слишком много счетов. Оплатите последний в приложении Kaspi или свяжитесь с администратором.', off: 'Счета Kaspi пока не подключены. Оплатите переводом и отправьте чек сюда.' },
  kk: { btn: '💳 Kaspi арқылы төлеу', offer: 'Kaspi қосымшасында төлеу: шотты сіздің Kaspi-ге жібереміз, төлем автоматты түрде расталады, түбіртек қажет емес.',
    which: (a, m) => `💳 ${m} үшін ${a} сомасына Kaspi шоты. Қай Kaspi нөміріне жіберейік?`, own: 'Оқушы', parent: 'Ата-ана',
    sent: (a, m, ph) => `💳 ${m} үшін ${a} сомасына Kaspi шоты ${ph} нөміріне жіберілді.\nKaspi қосымшасын ашып, 24 сағат ішінде төлеңіз. Төлегеннен кейін растау осында келеді.`,
    already: ph => `Kaspi шоты Kaspi қосымшасында күтіп тұр (${ph}). Сол жерде төлеңіз.`,
    paid: (a, m) => `✅ ${m} үшін ${a} Kaspi төлемі қабылданды. Рахмет!`,
    expired: 'Kaspi шоты 24 сағат ішінде төленбеді, мерзімі өтті. Жаңасын алу үшін «Kaspi арқылы төлеу» түймесін басыңыз.',
    noKaspi: 'Бұл нөмірде Kaspi жоқ, сондықтан шот жіберілмеді. Басқа нөмірді таңдаңыз немесе аударыммен төлеп, түбіртекті осында жіберіңіз.',
    failed: 'Қазір Kaspi шотын жіберу мүмкін болмады. Сәлден кейін қайталаңыз немесе аударыммен төлеп, түбіртекті осында жіберіңіз.',
    nothing: 'Қазір төлеудің қажеті жоқ: бұл ай төленген. Рахмет!',
    none: 'Мектептегі жазбаңыз немесе төлем сомасы табылмады. Әкімшіге жазыңыз: @abliem / WhatsApp +7 707 381 0988.',
    noPhone: 'Мектепте сіздің Kaspi нөміріңіз әлі жоқ. Оны әкімшіге жіберіңіз: @abliem / WhatsApp +7 707 381 0988.',
    limit: 'Бүгін тым көп шот жіберілді. Соңғысын Kaspi қосымшасында төлеңіз немесе әкімшіге жазыңыз.', off: 'Kaspi шоттары әлі қосылмаған. Аударыммен төлеп, түбіртекті осында жіберіңіз.' }
};
export const kaspiTexts = lang => T[lang] || T.en;

const last10 = p => { const d = String(p || '').replace(/\D/g, ''); return d.length >= 10 ? d.slice(-10) : ''; };
/** Kaspi wants 8XXXXXXXXXX; only Kazakhstan mobile numbers (7XX…) can hold a Kaspi account. */
const kaspiPhone = p => { const d = last10(p); return /^7\d{9}$/.test(d) ? '8' + d : ''; };
const mask = p => { const d = last10(p); return d ? `+7 ••• ••• ${d.slice(6, 8)} ${d.slice(8)}` : ''; };
/** The numbers on the school record an invoice may go to: 's' the student's, 'p' the parent's. Nothing typed by the user. */
function phonesOf(s) {
  const out = []; const a = kaspiPhone(s.phone), b = kaspiPhone(s.parentPhone);
  if (a) out.push({ k: 's', phone: a, mask: mask(a) });
  if (b && b !== a) out.push({ k: 'p', phone: b, mask: mask(b) });
  return out;
}

const list = async () => (await S().get('kaspi/list', { type: 'json' })) || [];
const saveList = l => S().setJSON('kaspi/list', l.slice(-300));
/** Change one invoice record against a fresh copy of the list, so a webhook and a button press don't overwrite each other. */
async function patch(id, change) { const l = await list(), r = l.find(x => x.id === id); if (!r) return null; Object.assign(r, change); await saveList(l); return r; }

async function call(path, { method = 'GET', body } = {}) {
  try {
    const r = await fetch(BASE + path, { method, headers: { 'X-API-Key': process.env.APIPAY_API_KEY, Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(8000) });
    return { status: r.status, ok: r.ok, body: await r.json().catch(() => ({})) };
  } catch (e) { console.error('apipay', path, e?.message); return { status: 0, ok: false, body: {} }; }
}

/** What is still owed for the month: the IF Admin payment row if there is one, otherwise the monthly fee. */
async function amountDue(s, month) {
  const row = ((await A().get('c/payments', { type: 'json' })) || {})[month]?.rows?.[s.id];
  if (row && +row.due > 0) return Math.max(0, Math.round((+row.due || 0) - (+row.disc || 0) - (+row.paid || 0)));
  return Math.round(+s.pay?.fee || 0);
}
async function studentOf(uid) {
  const profile = await getProfile(uid);
  return profile?.studentId ? (await loadStudents()).find(x => x.id === profile.studentId) || null : null;
}
const openFor = (l, sid) => l.filter(r => r.studentId === sid && OPEN.includes(r.status) && Date.now() - Date.parse(r.at) < DAY).at(-1) || null;

/** For the tuition card and the bot: is Kaspi on, which numbers can be invoiced, how much, and any invoice still waiting. */
export async function kaspiInfo(uid) {
  if (!kaspiReady()) return { ready: false };
  let s = await studentOf(uid); if (!s) return { ready: false };
  let open = openFor(await list(), s.id);
  if (open) { await sync(open.id); open = openFor(await list(), s.id); s = await studentOf(uid) || s; }   // the page shows the truth even if a webhook was missed
  const month = monthFor(s), phones = phonesOf(s);
  return { ready: true, name: `${s.first} ${s.last}`.trim(), month, amount: await amountDue(s, month), phones: phones.map(p => ({ k: p.k, mask: p.mask })),
    open: open ? { status: open.status, amount: open.amount, month: open.month, phone: phones.find(p => p.k === open.k)?.mask || '', at: open.at } : null, ...(sandbox() ? { test: true } : {}) };
}

/** Send the invoice. which: 's' | 'p' (default: the only number, or the student's). Returns {ok, ...} or {error}. */
export async function createInvoice({ uid, which, chatId, lang }) {
  if (!kaspiReady()) return { error: 'off' };
  const s = await studentOf(uid); if (!s) return { error: 'none' };
  const phones = phonesOf(s); if (!phones.length) return { error: 'noPhone' };
  const to = phones.find(p => p.k === which) || phones[0];
  const month = monthFor(s), amount = await amountDue(s, month);
  if (!(amount >= 100)) return { error: +s.pay?.fee > 0 ? 'nothing' : 'none' };
  const l = await list(), open = openFor(l, s.id);
  if (open && open.k === to.k && open.month === month) return { ok: true, already: true, amount: open.amount, month, phone: to.mask };
  if (l.filter(r => r.studentId === s.id && Date.now() - Date.parse(r.at) < DAY).length >= 4) return { error: 'limit' };
  if (open) await cancel(open);   // the invoice moves to the other number: one open invoice for a student at a time
  const id = 'k' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const rec = { id, invoiceId: null, uid, studentId: s.id, name: `${s.first} ${s.last}`.trim(), month, amount, k: to.k, chatId: chatId || null, lang: lang || '', at: new Date().toISOString(), status: 'processing', ...(sandbox() ? { test: true } : {}) };
  const fresh = await list(); fresh.push(rec); await saveList(fresh);
  const r = await call('/invoices', { method: 'POST', body: { phone_number: to.phone, amount, description: `IF Academy: ${mname(month, 'ru')}`.slice(0, 60), external_order_id: id, external_order_id_idempotency: id } });
  if (!r.ok || !r.body?.id) {
    const code = String(r.body?.error_code || r.body?.error || (r.status ? 'http_' + r.status : 'network')).slice(0, 60);
    console.error('kaspi invoice failed', code);
    await patch(id, { status: 'error', errorCode: code });
    return { error: 'failed', code };
  }
  await patch(id, { invoiceId: r.body.id, status: OPEN.includes(r.body.status) ? r.body.status : 'processing' });
  return { ok: true, amount, month, phone: to.mask };
}
async function cancel(rec) {
  if (rec.invoiceId) await call(`/invoices/${rec.invoiceId}/cancel`, { method: 'POST' });
  await patch(rec.id, { status: 'cancelled', closedAt: new Date().toISOString() });
}

/** Ask ApiPay where one invoice stands and act on it. */
async function sync(id) {
  const rec = (await list()).find(x => x.id === id);
  if (!rec || !rec.invoiceId || !OPEN.includes(rec.status)) return rec || null;
  const r = await call(`/invoices/${rec.invoiceId}`);
  if (!r.ok) { if (Date.now() - Date.parse(rec.at) > 2 * DAY) await patch(id, { status: 'expired' }); return rec; }
  const inv = r.body?.data || r.body?.invoice || r.body;
  return apply(rec, inv);
}
/** Every invoice still open (reminders runs this every 15 minutes: the safety net behind the webhook). */
export async function syncOpen() {
  if (!kaspiReady()) return 0;
  const open = (await list()).filter(r => OPEN.includes(r.status)); let n = 0;
  for (const r of open.slice(-30)) { try { await sync(r.id); n++; } catch (e) { console.error('kaspi sync', e.message); } }
  return n;
}

/** Move a record to the status ApiPay reports. Paying happens once, whoever reports it first (webhook or check). */
async function apply(rec, inv) {
  const status = String(inv?.status || '');
  if (!status || status === rec.status || !OPEN.includes(rec.status)) return rec;
  if (inv.is_sandbox === true && !sandbox()) return rec;   // a test invoice must never mark a real month paid
  if (OPEN.includes(status)) return patch(rec.id, { status });
  if (status === 'paid' || status === 'partially_refunded') return paid(rec);
  const code = String(inv.error_code || '').slice(0, 60);
  const out = await patch(rec.id, { status: ['cancelled', 'expired'].includes(status) ? status : 'error', ...(code ? { errorCode: code } : {}), closedAt: new Date().toISOString() });
  const t = kaspiTexts(await langOf(rec));
  if (status === 'expired') await tell(rec, t.expired);
  else if (status === 'error') await tell(rec, code === 'client_not_found' ? t.noKaspi : t.failed);
  return out;
}

async function paid(rec) {
  const first = await S().set(`kaspi/done/${rec.id}`, new Date().toISOString(), { onlyIfNew: true });
  if (first && first.modified === false) return rec;
  let saved = '';
  if (!rec.test && !sandbox()) try {
    const D = { students: (await A().get('c/students', { type: 'json' })) || {}, groups: (await A().get('c/groups', { type: 'json' })) || {}, payments: (await A().get('c/payments', { type: 'json' })) || {} };
    const prev = D.payments[rec.month]?.rows?.[rec.studentId];
    const res = run(D, [{ op: 'payment', student: rec.studentId, month: rec.month, ...(prev && +prev.paid > 0 ? { add_paid: rec.amount } : { paid: rec.amount }), method: 'Kaspi Invoice', date: local().toISOString().slice(0, 10), note: 'Kaspi invoice, paid in the Kaspi app (automatic)' }]);
    if (res.touched.has('payments')) {
      await A().setJSON('c/payments', D.payments);
      const st = (await A().get('stamp', { type: 'json' })) || {}; st.payments = Date.now(); await A().setJSON('stamp', st);
    }
    saved = res.lines.map(x => x.text).join('; ');
  } catch (e) { console.error('kaspi books', e.message); saved = ''; await tellAdmins(`⚠️ Kaspi invoice paid by ${rec.name} (${money(rec.amount)}, ${mname(rec.month, 'en')}) but it could not be saved in IF Admin. Please record it by hand.`); }
  const out = await patch(rec.id, { status: 'paid', paidAt: new Date().toISOString(), saved });
  const lang = await langOf(rec), tag = rec.test || sandbox() ? '🧪 TEST · ' : '';
  await tell(rec, tag + kaspiTexts(lang).paid(money(rec.amount), mname(rec.month, lang)));
  try { if (rec.uid && !String(rec.uid).startsWith('sid:')) await addNote(rec.uid, { kind: 'payOk', text: tag + T.en.paid(money(rec.amount), mname(rec.month, 'en')) }); } catch (e) { console.error('kaspi note', e.message); }
  await tellAdmins(`${tag}💳 Kaspi invoice paid: ${rec.name}, ${mname(rec.month, 'en')}, ${money(rec.amount)}${saved ? '\nSaved in IF Admin: ' + saved : tag ? '\nTest mode: nothing was written to IF Admin.' : ''}`);
  return out;
}

async function langOf(rec) { if (rec.lang) return rec.lang; const l = (await getLinks())[rec.uid]; return l?.lang || 'ru'; }
/** To the payer: the chat the invoice was asked from, or their linked Telegram, or WhatsApp on the record's numbers. */
async function tell(rec, text) {
  try {
    const l = (await getLinks())[rec.uid], chat = rec.chatId || l?.chatId;
    if (chat && tgToken()) { await tgSend(chat, text); return; }
    if (waReady()) { const s = (await loadStudents()).find(x => x.id === rec.studentId); for (const n of [...new Set([s?.phone, s?.parentPhone].map(waNumber).filter(Boolean))]) await waSend(n, 'IF Academy\n' + text); }
  } catch (e) { console.error('kaspi tell', e.message); }
}
async function tellAdmins(text) {
  if (!tgToken()) return;
  for (const [u, l] of Object.entries(await getLinks())) {
    try { const p = await getProfile(u); if (p?.role === 'admin' && l?.chatId) await tgSend(l.chatId, text); } catch (e) { console.error('kaspi admin notify', e.message); }
  }
}

/** ApiPay webhook: the raw body and the X-Webhook-Signature header. Unsigned or wrongly signed calls change nothing. */
export async function handleWebhook(raw, signature) {
  const secret = process.env.APIPAY_WEBHOOK_SECRET;
  if (!kaspiReady() || !secret) return 'off';
  const want = Buffer.from('sha256=' + createHmac('sha256', secret).update(raw).digest('hex')), got = Buffer.from(String(signature || ''));
  if (want.length !== got.length || !timingSafeEqual(want, got)) return 'bad signature';
  let ev; try { ev = JSON.parse(raw); } catch { return 'bad json'; }
  if (!['invoice.status_changed', 'invoice.refunded'].includes(ev?.event)) return 'ignored';
  if (ev.is_sandbox === true && !sandbox()) return 'sandbox ignored';
  const inv = ev.invoice || {}, l = await list();
  const rec = l.find(r => (inv.id != null && String(r.invoiceId) === String(inv.id)) || (inv.external_order_id && r.id === inv.external_order_id));
  if (!rec) return 'unknown invoice';
  if (ev.event === 'invoice.refunded') { await tellAdmins(`↩️ Kaspi refund for ${rec.name}, ${mname(rec.month, 'en')} (invoice of ${money(rec.amount)}). Please correct the payment in IF Admin.`); return 'refund'; }
  if (!rec.invoiceId && inv.id != null) await patch(rec.id, { invoiceId: inv.id });
  // the status is read back from ApiPay with the school's own key, so the webhook only says "look now"
  const fresh = (await list()).find(x => x.id === rec.id), r = await call(`/invoices/${fresh.invoiceId}`);
  await apply(fresh, r.ok ? (r.body?.data || r.body?.invoice || r.body) : { ...inv, is_sandbox: ev.is_sandbox });
  return 'ok';
}
