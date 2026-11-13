// Payment receipts sent to the Telegram bot: the student sends a photo or PDF of the Kaspi/bank receipt, AI reads the
// amount, date and payer, the director gets it in Telegram (and on the website: Admin → Receipts) with Confirm / Not right.
// Confirming marks the month paid in IF Admin, which stops the payment reminders, and thanks the student.
//   store "receipts" (blobs): <id> → the file      store "school": receipts/list, receipts/pending {studentId: {id, month}}
import { getStore } from '@netlify/blobs';
import Anthropic from '@anthropic-ai/sdk';
import { S, tg, tgSend, tgToken, getLinks, getProfile, payStatus, addNote, money, local } from './bot-core.mjs';
import { loadStudents } from './students.mjs';
import { run } from './ifadmin-ai.mjs';

const R = () => getStore({ name: 'receipts', consistency: 'strong' });
const A = () => getStore({ name: 'ifadmin', consistency: 'strong' });
const MODEL = process.env.RECEIPT_MODEL || 'claude-sonnet-5-5';
const str = (v, n = 120) => (v == null ? '' : String(v)).replace(/\s+/g, ' ').trim().slice(0, n);
const MONTHS = { en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ru: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'], kk: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'] };
const mname = (m, lang) => (MONTHS[lang] || MONTHS.en)[+m.slice(5) - 1] + ' ' + m.slice(0, 4);

export const listReceipts = async () => (await S().get('receipts/list', { type: 'json' })) || [];
const saveList = l => S().setJSON('receipts/list', l.slice(-300));
const pending = async () => (await S().get('receipts/pending', { type: 'json' })) || {};

const T = {
  en: { thanks: (r, s) => `📎 Thank you! Receipt received${r.amount ? ': ' + money(r.amount) : ''}${r.date ? ', ' + r.date : ''} for ${s}.\nThe school will confirm it soon and you'll get a message here.`,
    bad: 'Please send the receipt as a photo or a PDF file.', notreceipt: 'This does not look like a payment receipt. If it is one, the school will check it; otherwise please send the Kaspi/bank receipt.',
    ok: m => `✅ Payment for ${m} confirmed. Thank you!`, no: `We could not confirm this receipt. Please contact the administrator: @abliem / WhatsApp +7 707 381 0988.` },
  ru: { thanks: (r, s) => `📎 Спасибо! Чек получен${r.amount ? ': ' + money(r.amount) : ''}${r.date ? ', ' + r.date : ''} за ${s}.\nШкола скоро подтвердит оплату, и вы получите сообщение здесь.`,
    bad: 'Пожалуйста, отправьте чек фотографией или PDF-файлом.', notreceipt: 'Это не похоже на чек об оплате. Если это чек, школа его проверит; иначе отправьте чек Kaspi или банка.',
    ok: m => `✅ Оплата за ${m} подтверждена. Спасибо!`, no: `Не удалось подтвердить этот чек. Свяжитесь с администратором: @abliem / WhatsApp +7 707 381 0988.` },
  kk: { thanks: (r, s) => `📎 Рахмет! Түбіртек алынды${r.amount ? ': ' + money(r.amount) : ''}${r.date ? ', ' + r.date : ''} (${s}).\nМектеп жақында растайды, хабарламаны осында аласыз.`,
    bad: 'Түбіртекті фото немесе PDF файл ретінде жіберіңіз.', notreceipt: 'Бұл төлем түбіртегіне ұқсамайды. Түбіртек болса, мектеп тексереді; әйтпесе Kaspi немесе банк түбіртегін жіберіңіз.',
    ok: m => `✅ ${m} үшін төлем расталды. Рахмет!`, no: `Бұл түбіртекті растау мүмкін болмады. Әкімшіге жазыңыз: @abliem / WhatsApp +7 707 381 0988.` }
};

/** AI reads the receipt: {isReceipt, amount, date, payer, method}. Never throws. */
async function readReceipt(bytes, type) {
  try {
    const data = Buffer.from(bytes).toString('base64');
    const block = type === 'application/pdf' ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data } } : { type: 'image', source: { type: 'base64', media_type: type, data } };
    const m = await new Anthropic().messages.create({ model: MODEL, max_tokens: 300, temperature: 0, messages: [{ role: 'user', content: [block, { type: 'text', text: 'This should be a payment receipt (Kaspi, bank transfer or cash receipt) from Kazakhstan. Reply with JSON only: {"isReceipt": true|false, "amount": number in tenge or null, "date": "YYYY-MM-DD" or null, "payer": "name or null", "method": "Kaspi Transfer" | "Kaspi Invoice" | "Card" | "Bank transfer" | "Cash" | null}.' }] }] });
    const t = m.content.map(c => c.text || '').join(''); const j = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
    return { isReceipt: j.isReceipt !== false, amount: +j.amount > 0 ? Math.round(+j.amount) : null, date: /^\d{4}-\d{2}-\d{2}$/.test(j.date || '') ? j.date : null, payer: str(j.payer, 80) || null, method: str(j.method, 30) || null };
  } catch (e) { console.error('receipt read', e?.message); return { isReceipt: true, amount: null, date: null, payer: null, method: null }; }
}

/** The month this payment is for: the open month, or the next one if this month is already paid. */
function monthFor(s) {
  const p = payStatus(s); const now = local(); const cur = now.toISOString().slice(0, 7);
  if (!p) return cur;
  if (!p.paid) return p.month;
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)); return d.toISOString().slice(0, 7);
}

/** Telegram message with a photo or document from a connected student. */
export async function handleReceipt({ chatId, uid, msg, lang }) {
  const t = T[lang] || T.en;
  const ph = (msg.photo || []).at(-1), doc = msg.document;
  const fileId = ph?.file_id || (doc && /^(image\/(jpeg|png|webp)|application\/pdf)$/.test(doc.mime_type || '') ? doc.file_id : null);
  if (!fileId) { await tgSend(chatId, t.bad); return; }
  const type = ph ? 'image/jpeg' : doc.mime_type;
  const f = await tg('getFile', { file_id: fileId });
  if (+f.file_size > 10 * 1024 * 1024) { await tgSend(chatId, t.bad); return; }
  const bytes = new Uint8Array(await (await fetch(`https://api.telegram.org/file/bot${tgToken()}/${f.file_path}`)).arrayBuffer());
  const id = 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  await R().set(id, bytes, { metadata: { type } });
  const profile = await getProfile(uid);
  const s = profile?.studentId ? (await loadStudents()).find(x => x.id === profile.studentId) : null;
  const ai = await readReceipt(bytes, type);
  const month = s ? monthFor(s) : local().toISOString().slice(0, 7);
  const rec = { id, uid, studentId: s?.id || null, name: s ? `${s.first} ${s.last}`.trim() : (profile?.name || ''), month, ...ai, type, chatId, msgId: msg.message_id, at: new Date().toISOString(), status: 'pending' };
  const list = await listReceipts(); list.push(rec); await saveList(list);
  if (s) { const P = await pending(); P[s.id] = { id, month }; await S().setJSON('receipts/pending', P); }
  await tgSend(chatId, ai.isReceipt ? t.thanks(rec, mname(month, lang)) : t.notreceipt);
  await tellAdmins(rec);
}

async function tellAdmins(rec) {
  const links = await getLinks();
  for (const [u, l] of Object.entries(links)) {
    const p = await getProfile(u); if (p?.role !== 'admin') continue;
    try {
      await tg('copyMessage', { chat_id: l.chatId, from_chat_id: rec.chatId, message_id: rec.msgId });
      const net = await expected(rec);
      await tgSend(l.chatId, `🧾 Receipt from ${rec.name || 'a student (not linked to a record)'} for ${mname(rec.month, 'en')}\nAI read: ${rec.amount ? money(rec.amount) : 'amount not readable'}${rec.date ? ' · ' + rec.date : ''}${rec.payer ? ' · ' + rec.payer : ''}${rec.method ? ' · ' + rec.method : ''}${net ? '\nExpected: ' + money(net) : ''}${rec.isReceipt ? '' : '\n⚠️ AI thinks this may not be a receipt.'}`,
        { reply_markup: { inline_keyboard: [[{ text: `✅ Confirm${rec.amount ? ' ' + money(rec.amount) : ''}`, callback_data: `rc:ok:${rec.id}` }, { text: '❌ Not right', callback_data: `rc:no:${rec.id}` }]] } });
    } catch (e) { console.error('receipt admin notify', e.message); }
  }
}
async function expected(rec) {
  if (!rec.studentId) return 0;
  const s = (await loadStudents()).find(x => x.id === rec.studentId);
  return s?.pay?.fee || 0;
}

/** Confirm (ok=true) or reject a receipt. Confirming marks the month paid in IF Admin. Returns the receipt or null. */
export async function decideReceipt(id, ok, by) {
  const list = await listReceipts(); const rec = list.find(r => r.id === id);
  if (!rec || rec.status !== 'pending') return rec || null;
  rec.status = ok ? 'confirmed' : 'rejected'; rec.decidedAt = new Date().toISOString(); rec.by = by || '';
  if (ok && rec.studentId) {
    const D = { students: (await A().get('c/students', { type: 'json' })) || {}, groups: (await A().get('c/groups', { type: 'json' })) || {}, payments: (await A().get('c/payments', { type: 'json' })) || {} };
    const prev = D.payments[rec.month]?.rows?.[rec.studentId];
    const amount = rec.amount || (prev ? Math.max(0, (+prev.due || 0) - (+prev.disc || 0)) : 0) || await expected(rec);
    const res = run(D, [{ op: 'payment', student: rec.studentId, month: rec.month, ...(prev && +prev.paid > 0 ? { add_paid: amount } : { paid: amount }), method: rec.method || 'Kaspi Transfer', date: rec.date || undefined, note: 'Receipt via Telegram' }]);
    if (res.touched.has('payments')) {
      await A().setJSON('c/payments', D.payments);
      const st = (await A().get('stamp', { type: 'json' })) || {}; st.payments = Date.now(); await A().setJSON('stamp', st);
    }
    rec.saved = res.lines.map(l => l.text).join('; ');
  }
  await saveList(list);
  if (rec.studentId) { const P = await pending(); if (P[rec.studentId]?.id === id) { delete P[rec.studentId]; await S().setJSON('receipts/pending', P); } }
  const links = await getLinks(), l = links[rec.uid], lang = l?.lang || 'ru', t = T[lang] || T.en;
  const text = ok ? t.ok(mname(rec.month, lang)) : t.no;
  try { if (l) await tgSend(l.chatId, text); if (rec.uid) await addNote(rec.uid, { kind: ok ? 'payOk' : 'payNo', text: ok ? T.en.ok(mname(rec.month, 'en')) : T.en.no }); } catch (e) { console.error('receipt reply', e.message); }
  return rec;
}
export async function receiptFile(id) { return R().getWithMetadata(id, { type: 'arrayBuffer' }); }
