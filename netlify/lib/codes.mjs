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
  if (await hashMatch(code, extra.private)) return 'student';
  if (await opens(await bits(code, SALT.t), keys.check_t)) return 'teacher';
  if (await opens(await bits(code, SALT.s), keys.check_s)) return 'student';
  return null;
}
export const isStaff = role => role === 'teacher' || role === 'admin';

/* ---------- single sign-on for the locked pages (if-lock.js) ----------
   The class/staff keys are derived from the website codes. When anyone uses a website code while signed in
   (activation, or the code box on a locked page), the derived keys are checked against keys.json and kept
   server-side, so later every signed-in student/teacher opens locked pages without typing a code again. */
const b64e = u => Buffer.from(u).toString('base64');
async function tryOpen(raw, b64) { return (await opens(raw, b64)) ? raw : null; }
/** {ks, kt?} (base64) for a website class/staff code, or null. */
export async function lockKeysFromCode(code) {
  if (!norm(code)) return null;
  const kt = await tryOpen(await bits(code, SALT.t), keys.check_t);
  if (kt) {
    const k = await globalThis.crypto.subtle.importKey('raw', kt, 'AES-GCM', false, ['decrypt']);
    const blob = b64d(keys.s_by_t);
    const ks = new Uint8Array(await globalThis.crypto.subtle.decrypt({ name: 'AES-GCM', iv: blob.slice(0, 12) }, k, blob.slice(12)));
    return { ks: b64e(ks), kt: b64e(kt) };
  }
  const ks = await tryOpen(await bits(code, SALT.s), keys.check_s);
  return ks ? { ks: b64e(ks) } : null;
}
/** Keep only keys that really open keys.json. */
export async function verifyLockKeys(k) {
  const out = {};
  try { if (k?.ks && await opens(b64d(k.ks), keys.check_s)) out.ks = k.ks; } catch {}
  try { if (k?.kt && await opens(b64d(k.kt), keys.check_t)) out.kt = k.kt; } catch {}
  return out;
}
/** The code Abdoulie gives his individual students (full access, marked as individual students). */
export async function isPrivateCode(code) { return !!norm(code) && hashMatch(code, extra.private); }
