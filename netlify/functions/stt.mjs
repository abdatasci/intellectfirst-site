// Speech to text for the speaking robot (NOVA/ATLAS) where the browser cannot recognise speech itself —
// above all the Telegram mini-app on iPhone and Android. The page records the answer and sends the audio here;
// ElevenLabs Speech to Text (scribe) returns the words. Same key as the robot voices (ELEVENLABS_API_KEY).
//   POST /api/stt   body = the recording (audio/webm, audio/mp4, audio/ogg …)   → { text }
import { getStore } from '@netlify/blobs';

const SITE = /^https:\/\/([a-z0-9-]+--)?(intellectfirst\.com|www\.intellectfirst\.com|intellect-first-academy\.netlify\.app)(\/|$)/;
const MAX_BYTES = 6 * 1024 * 1024, DAILY = +process.env.STT_DAILY_CALLS || 3000;
const no = (status, error) => Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } });

export default async (req) => {
  if (req.method !== 'POST') return no(405, 'method');
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return no(503, 'no-key');
  const from = req.headers.get('referer') || req.headers.get('origin') || '';
  if (!SITE.test(from) && !/^http:\/\/localhost/.test(from)) return no(403, 'site');
  const buf = await req.arrayBuffer().catch(() => null);
  if (!buf || buf.byteLength < 800) return no(400, 'empty');
  if (buf.byteLength > MAX_BYTES) return no(413, 'big');
  const store = getStore({ name: 'voice', consistency: 'strong' });
  const day = new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10), k = 'stt/' + day;
  const used = +(await store.get(k).catch(() => 0) || 0);
  if (used >= DAILY) return no(503, 'daily-limit');
  await store.set(k, String(used + 1)).catch(() => {});

  const type = (req.headers.get('content-type') || 'audio/webm').split(';')[0];
  const ext = /mp4|m4a|aac/.test(type) ? 'm4a' : /ogg/.test(type) ? 'ogg' : /wav/.test(type) ? 'wav' : /mpeg|mp3/.test(type) ? 'mp3' : 'webm';
  const fd = new FormData();
  fd.append('model_id', 'scribe_v1');
  fd.append('language_code', 'en');
  fd.append('tag_audio_events', 'false');
  fd.append('file', new Blob([buf], { type }), 'answer.' + ext);
  const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': apiKey }, body: fd }).catch(() => null);
  if (!r || !r.ok) {
    console.log('ElevenLabs STT error', r && r.status, r ? (await r.text().catch(() => '')).slice(0, 300) : 'network');
    return no(502, 'stt');
  }
  const d = await r.json().catch(() => ({}));
  return Response.json({ text: String(d.text || '').replace(/\s+/g, ' ').trim().slice(0, 4000) }, { headers: { 'Cache-Control': 'no-store' } });
};

export const config = { path: '/api/stt' };
