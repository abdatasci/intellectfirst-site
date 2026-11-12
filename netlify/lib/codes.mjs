// Access codes for IF Academy accounts.
// - Website class/staff codes: checked against /keys.json (same scheme as /if-lock.js).
// - Extra IELTS student/staff codes and the admin code: only PBKDF2 hashes in codes.json.
import keys from '../../keys.json';
import extra from './codes.json';

const SALT = { s: 'IF-Academy/student/v1', t: 'IF-Academy/teacher/v1' };
export const norm = c => String(c || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
const b64d = s => Uint8Array.from(Buffer.from(s, 'base64'));
async function bits(code, salt, it = 310000) {
  const subtle = globalThis.crypto.subtle;
  const km = await subtle.importKey('raw', new TextEncoder().encode(norm(code)), 'PBKDF2', false, ['deriveBits']);
  return new Uint8Array(await subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: it, hash: 'SHA-256' }, km, 256));
}
async function opens(raw, blobB64) {
  try {
    const subtle = globalThis.crypto.subtle;
    const k = await subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
    const blob = b64d(blobB64);
    await subtle.decrypt({ name: 'AES-GCM', iv: blob.slice(0, 12) }, k, blob.slice(12));
    return true;
  } catch { return false; }
}
async function hashMatch(code, rec) {
  if (!rec) return false;
  const got = Buffer.from(await bits(code, rec.salt, extra.iterations));
  const want = Buffer.from(rec.hash, 'base64');
  return got.length === want.length && (await import('node:crypto')).timingSafeEqual(got, want);
}
/** Returns 'admin' | 'teacher' | 'student' | null for a code. */
export async function roleForCode(code) {
  if (!norm(code)) return null;
  if (await hashMatch(code, extra.admin)) return 'admin';
  if (await hashMatch(code, extra.teacher)) return 'teacher';
  if (await hashMatch(code, extra.student)) return 'student';
  if (await opens(await bits(code, SALT.t), keys.check_t)) return 'teacher';
  if (await opens(await bits(code, SALT.s), keys.check_s)) return 'student';
  return null;
}
export const isStaff = role => role === 'teacher' || role === 'admin';
