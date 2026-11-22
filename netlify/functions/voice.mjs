// Real voices for every listening and "read aloud" button on the site (ElevenLabs text to speech).
//   GET /api/voice?t=<text>&v=kid|adult[&l=ru|kk]   → audio/mpeg
// Each sentence is generated once, then kept in Blobs (store "voice") and served from there for everyone,
// so the ElevenLabs bill only grows when new text appears. A daily character cap protects the account.
// Needs the environment variable ELEVENLABS_API_KEY. Optional: ELEVENLABS_VOICE_KIDS, ELEVENLABS_VOICE_ADULT, ELEVENLABS_MODEL.
// Without a key (or on any error) it answers 503 and the page falls back to the browser's own voice.
import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';

const V = () => getStore({ name: 'voice', consistency: 'strong' });
// Four British English voices: a woman and a man for children's pages, a different woman and man for teens and adults.
// v = kf | km (kids) · af | am (teens and adults). Dialogues use both voices of a set.
const VOICES = {
  kf: process.env.ELEVENLABS_VOICE_KIDS_FEMALE || 'pFZP5JQG7iQjIQuC4Bku',   // Lily — warm British storyteller
  km: process.env.ELEVENLABS_VOICE_KIDS_MALE || 'JBFqnCBsd6RMkjVDRZzb',     // George — warm, friendly British storyteller
  af: process.env.ELEVENLABS_VOICE_FEMALE || 'Xb7hH8MSUJpSbSDYk0k2',        // Alice — clear, confident British English
  am: process.env.ELEVENLABS_VOICE_MALE || 'onwK4e9ZLuTAKqWW03F9'           // Daniel — British English, news-presenter style
};
const LEGACY = { female: 'af', male: 'am', kid: 'kf', adult: 'am' };
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
/* IF Lingo: Russian and Kazakh. Russian is in Multilingual v2; Kazakh is not, so it uses Eleven v3 (ElevenLabs
   language list, checked 22 Nov 2026). l = ru | kk. Optional: ELEVENLABS_MODEL_RU, ELEVENLABS_MODEL_KK, and a voice
   per language and gender (ELEVENLABS_VOICE_RU_FEMALE, …_RU_MALE, …_KK_FEMALE, …_KK_MALE); otherwise the adult voices. */
const LANG_MODEL = { ru: process.env.ELEVENLABS_MODEL_RU || 'eleven_multilingual_v2', kk: process.env.ELEVENLABS_MODEL_KK || 'eleven_v3' };
const langVoice = (l, kind) => process.env[`ELEVENLABS_VOICE_${l.toUpperCase()}_${kind[1] === 'm' ? 'MALE' : 'FEMALE'}`] || VOICES['a' + kind[1]];
const MAX_LEN = 3000, DAILY_CHARS = +process.env.ELEVENLABS_DAILY_CHARS || 40000;
const SITE = /^https:\/\/([a-z0-9-]+--)?(intellectfirst\.com|www\.intellectfirst\.com|intellect-first-academy\.netlify\.app)(\/|$)/;

// iPhone / iPad (Safari and Telegram's in-app browser) ask for audio in byte ranges and refuse to play if the server ignores them.
const audio = (buf, hit, range) => {
  const size = buf.byteLength, m = /^bytes=(\d*)-(\d*)$/.exec(range || '');
  let start = 0, end = size - 1, part = false;
  if (m && (m[1] || m[2])) {
    if (m[1]) { start = +m[1]; end = m[2] ? Math.min(+m[2], size - 1) : size - 1; } else { start = Math.max(0, size - +m[2]); }
    if (start > end || start >= size) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
    part = true;
  }
  return new Response(part ? buf.slice(start, end + 1) : buf, { status: part ? 206 : 200, headers: {
  'Accept-Ranges': 'bytes', ...(part ? { 'Content-Range': `bytes ${start}-${end}/${size}` } : {}),
  'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=31536000, immutable',
  'Netlify-CDN-Cache-Control': 'public, max-age=31536000, immutable', 'Netlify-Vary': 'query=t|v|l,header=range', 'X-Voice-Cache': hit ? 'hit' : 'new' } });
};
const no = (status, error) => Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } });

export default async (req) => {
  const url = new URL(req.url);
  if (url.pathname.endsWith('/status')) {
    const last = await V().get('last-error', { type: 'json' }).catch(() => null);
    return Response.json({ ready: !!process.env.ELEVENLABS_API_KEY, model: MODEL, models: LANG_MODEL, lastError: last }, { headers: { 'Cache-Control': 'no-store' } });
  }
  const text = String(url.searchParams.get('t') || '').replace(/\s+/g, ' ').trim();
  const v = url.searchParams.get('v') || '', kind = VOICES[v] ? v : LEGACY[v] || 'am';
  if (!text || text.length > MAX_LEN) return no(400, 'text');
  const l = ['ru', 'kk'].includes(url.searchParams.get('l')) ? url.searchParams.get('l') : '';
  const model = l ? LANG_MODEL[l] : MODEL, voice = l ? langVoice(l, kind) : VOICES[kind];
  const key = createHash('sha256').update(`${model}|${voice}|${l ? l + '|' : ''}${text}`).digest('hex');
  const store = V();
  const have = await store.get('a/' + key, { type: 'arrayBuffer' }).catch(() => null);
  const range = req.headers.get('range');
  if (have) return audio(have, true, range);

  // New text: only for pages of this site, within the daily limit, and only with a key.
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return no(503, 'no-key');
  const from = req.headers.get('referer') || req.headers.get('origin') || '';
  // Telegram's in-app browser often sends no Referer at all, so an empty one is allowed (the daily limit still protects the account).
  if (from && !SITE.test(from) && !/^http:\/\/localhost/.test(from)) return no(403, 'site');
  const day = new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10);
  const used = +(await store.get('usage/' + day).catch(() => 0) || 0);
  if (used + text.length > DAILY_CHARS) return no(503, 'daily-limit');

  // Eleven v3 takes fewer voice settings than v2 (stability only); if it refuses the settings, the call is repeated without them.
  const v3 = /_v3/.test(model);
  const call = settings => fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: model, language_code: l ? (model.includes('multilingual_v2') ? undefined : l) : (model.includes('multilingual_v2') ? undefined : 'en'), ...(settings ? { voice_settings: settings } : {}) })
  }).catch(() => null);
  let r = await call(v3 ? { stability: 0.5 } : { stability: 0.55, similarity_boost: 0.75, style: kind[0] === 'k' ? 0.35 : 0.15, use_speaker_boost: true });
  if (r && !r.ok && v3 && r.status >= 400 && r.status < 500 && r.status !== 401 && r.status !== 429) r = await call(null);
  if (!r || !r.ok) {
    const why = r ? (await r.text().catch(() => '')).slice(0, 300) : 'network';
    console.log('ElevenLabs error', r && r.status, why);
    await store.setJSON('last-error', { at: new Date().toISOString(), status: r ? r.status : 0, message: why.replace(/sk_[A-Za-z0-9]+/g, 'sk_…') }).catch(() => {});
    return no(r && r.status >= 400 && r.status < 500 ? r.status : 502, 'tts:' + (r ? r.status : 'network') + ':' + why.slice(0, 120));
  }
  const buf = await r.arrayBuffer();
  await Promise.all([
    store.set('a/' + key, buf, { metadata: { text: text.slice(0, 200), kind, lang: l || 'en', model, at: new Date().toISOString() } }),
    store.set('usage/' + day, String(used + text.length))
  ]);
  return audio(buf, false, range);
};

export const config = { path: ['/api/voice', '/api/voice/*'] };
