// ApiPay (Kaspi invoices) webhook. A background function: ApiPay gets its 2xx at once (it allows 5 seconds), the work follows.
// URL to enter in the ApiPay cabinet: https://intellectfirst.com/.netlify/functions/kaspi-background
// Anything missed here is picked up by the 15-minute check in reminders (syncOpen).
import { handleWebhook } from '../lib/kaspi.mjs';

export default async (req) => {
  if (req.method !== 'POST') return new Response('ok');
  try { const raw = await req.text(); console.log('kaspi webhook:', await handleWebhook(raw, req.headers.get('x-webhook-signature'))); }
  catch (e) { console.error('kaspi webhook', e?.message); }
  return new Response('ok');
};
