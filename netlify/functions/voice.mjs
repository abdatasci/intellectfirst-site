// Real voices for every listening and "read aloud" button on the site (ElevenLabs text to speech).
//   GET /api/voice?t=<text>&v=kid|adult   → audio/mpeg
// Each sentence is generated once, then kept in Blobs (store "voice") and served from there for everyone,
// so the ElevenLabs bill only grows when new text appears. A daily character cap protects the account.
// Needs the environment variable ELEVENLABS_API_KEY. Optional: ELEVENLABS_VOICE_KIDS, ELEVENLABS_VOICE_ADULT, ELEVENLABS_MODEL.
// Without a key (or on any error) it answers 503 and the page falls back to the browser's own voice.
import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';

const V = () => getStore({ name: 'voice', consistency: 'strong' });
const VOICES = {
  kid: process.env.ELEVENLABS_VOICE_KIDS || 'Xb7hH8MSUJpSbSDYk0k2',     // Alice — clear, friendly British English
  adult: process.env.ELEVENLABS_VOICE_ADULT || 'JBFqnCBsd6RMkjVDRZzb'   // George — warm British English
};
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const MAX_LEN = 3000, DAILY_CHARS = +process.env.ELEVENLABS_DAILY_CHARS || 40000;
const SITE = /^https:\/\/([a-z0-9-]+--)?(intellectfirst\.com|www\.intellectfirst\.com|intellect-first-academy\.netlify\.app)(\/|$)/;

const audio = (buf, hit) => new Response(buf, { headers: {
  'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=31536000, immutable',
  'Netlify-CDN-Cache-Control': 'public, max-age=31536000, immutable', 'Netlify-Vary': 'query=t|v', 'X-Voice-Cache': hit ? 'hit' : 'new' } });
const no = (status, error) => Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } });

export default async (req) => {
  const url = new URL(req.url);
  if (url.pathname.endsWith('/status')) return Response.json({ ready: !!process.env.ELEVENLABS_API_KEY, model: MODEL }, { headers: { 'Cache-Control': 'no-store' } });
  const text = String(url.searchParams.get('t') || '').replace(/\s+/g, ' ').trim();
  const kind = url.searchParams.get('v') === 'kid' ? 'kid' : 'adult';
  if (!text || text.length > MAX_LEN) return no(400, 'text');
  const voice = VOICES[kind], key = createHash('sha256').update(`${MODEL}|${voice}|${text}`).digest('hex');
  const store = V();
  const have = await store.get('a/' + key, { type: 'arrayBuffer' }).catch(() => null);
  if (have) return audio(have, true);

  // New text: only for pages of this site, within the daily limit, and only with a key.
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return no(503, 'no-key');
  const from = req.headers.get('referer') || req.headers.get('origin') || '';
  if (!SITE.test(from) && !/^http:\/\/localhost/.test(from)) return no(403, 'site');
  const day = new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10);
  const used = +(await store.get('usage/' + day).catch(() => 0) || 0);
  if (used + text.length > DAILY_CHARS) return no(503, 'daily-limit');

  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: MODEL, language_code: MODEL.includes('multilingual_v2') ? undefined : 'en',
      voice_settings: { stability: 0.55, similarity_boost: 0.75, style: kind === 'kid' ? 0.35 : 0.15, use_speaker_boost: true } })
  }).catch(() => null);
  if (!r || !r.ok) {
    const why = r ? (await r.text().catch(() => '')).slice(0, 300) : 'network';
    console.log('ElevenLabs error', r && r.status, why);
    return no(503, 'tts');
  }
  const buf = await r.arrayBuffer();
  await Promise.all([
    store.set('a/' + key, buf, { metadata: { text: text.slice(0, 200), kind, at: new Date().toISOString() } }),
    store.set('usage/' + day, String(used + text.length))
  ]);
  return audio(buf, false);
};

export const config = { path: ['/api/voice', '/api/voice/*'] };
