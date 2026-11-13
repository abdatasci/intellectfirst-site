// WhatsApp messages for reminders, through Green API (green-api.com): the school's own WhatsApp number,
// linked once by scanning a QR code in the Green API console. Settings (Netlify environment variables):
//   WA_INSTANCE   idInstance from the Green API console (e.g. 7105123456)
//   WA_TOKEN      apiTokenInstance
//   WA_API_URL    apiUrl shown on the same page (e.g. https://7105.api.greenapi.com); default https://api.green-api.com
const cfg = () => ({ id: process.env.WA_INSTANCE || '', token: process.env.WA_TOKEN || '', url: (process.env.WA_API_URL || 'https://api.green-api.com').replace(/\/+$/, '') });
export const waReady = () => { const c = cfg(); return !!(c.id && c.token); };

/** +7 701 234 56 78 / 8701… / 701… → 77012345678 (Kazakhstan numbers); null if it does not look like a phone. */
export function waNumber(p) {
  let d = String(p || '').replace(/\D/g, '');
  if (d.length === 10) d = '7' + d;
  if (d.length === 11 && d[0] === '8') d = '7' + d.slice(1);
  return d.length >= 11 && d.length <= 15 ? d : null;
}

async function call(method, body) {
  const c = cfg();
  const r = await fetch(`${c.url}/waInstance${c.id}/${method}/${c.token}`, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {});
  const t = await r.text(); let j = null; try { j = JSON.parse(t); } catch {}
  if (!r.ok) { const e = new Error(`WhatsApp ${method} ${r.status}: ${t.slice(0, 160)}`); e.status = r.status; throw e; }
  return j;
}
export async function waSend(phone, text) {
  const n = waNumber(phone); if (!n) throw new Error('bad phone');
  return call('sendMessage', { chatId: `${n}@c.us`, message: String(text).slice(0, 4000) });
}
export async function waState() {
  if (!waReady()) return { ready: false };
  try { const s = await call('getStateInstance'); return { ready: true, state: s?.stateInstance || 'unknown' }; }
  catch (e) { return { ready: true, state: 'error', error: e.message }; }
}
