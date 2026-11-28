// IF Classroom live lessons: one page with the video call and the lesson slides, the slides following the teacher.
// Slide sync goes through Ably (env ABLY_API_KEY, as for IF Live): the teacher publishes on class:<room>, students only listen.
// Video: embedded Jitsi as a Service (8x8.vc) when JAAS_APP_ID, JAAS_KID and JAAS_PRIVATE_KEY are set
// (meet.jit.si cuts embedded calls after 5 minutes, so without JaaS the call opens in its own window).
import { createHmac, createSign, randomBytes } from 'node:crypto';

const env = k => (globalThis.Netlify?.env?.get(k)) || process.env[k] || '';

export function ablyToken(clientId, capability) {
  const [keyName, secret] = env('ABLY_API_KEY').split(':');
  if (!keyName || !secret) return null;
  const cap = JSON.stringify(capability), ttl = 3 * 3600 * 1000, timestamp = Date.now(), nonce = randomBytes(16).toString('hex');
  const mac = createHmac('sha256', secret).update([keyName, ttl, cap, clientId, timestamp, nonce].join('\n') + '\n').digest('base64');
  return { keyName, ttl, capability: cap, clientId, timestamp, nonce, mac };
}

const b64u = v => Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url');
/** A JaaS meeting token (RS256), or null when JaaS is not set up. Teachers are moderators. */
export function jaasToken({ room, name, email, id, moderator }) {
  const appId = env('JAAS_APP_ID'), kid = env('JAAS_KID'); let key = env('JAAS_PRIVATE_KEY');
  if (!appId || !kid || !key) return null;
  key = key.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const head = { alg: 'RS256', typ: 'JWT', kid };
  const body = { aud: 'jitsi', iss: 'chat', sub: appId, room: '*', iat: now, nbf: now - 10, exp: now + 4 * 3600,
    context: { user: { id: String(id || ''), name: name || 'IF Academy', email: email || '', moderator: moderator ? 'true' : 'false' },
      features: { livestreaming: 'false', recording: moderator ? 'true' : 'false', transcription: 'false', 'outbound-call': 'false' } } };
  const data = b64u(head) + '.' + b64u(body);
  const sig = createSign('RSA-SHA256').update(data).sign(key).toString('base64url');
  return { domain: '8x8.vc', appId, room: `${appId}/${room}`, jwt: data + '.' + sig };
}
