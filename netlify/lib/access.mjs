// Who gets what on intellectfirst.com.
//   staff   teachers and the administrator
//   member  IF Academy students, Abdoulie's individual students, IF Alumni, and outside learners who have paid
//   free    outside learners (and anyone still waiting for approval): open games, placement test, small daily AI allowance
// profile.role: 'admin' | 'teacher' | 'student' | 'guest'; profile.track: 'if' | 'private' | 'alumni' | 'outside';
// profile.paidUntil: ISO date for paid outside learners.
export const TRACKS = ['if', 'private', 'alumni', 'outside'];
export const TRACK_LABEL = { if: 'IF Academy student', private: 'Individual student', alumni: 'IF Alumni', outside: 'Outside learner' };
export function paidActive(p) { return !!(p?.paidUntil && Date.parse(p.paidUntil) > Date.now()); }
export function trialActive(p) { return !!(p?.trialUntil && Date.parse(p.trialUntil) > Date.now()); }
/** When full access ends for a free/online account (paid or trial), as an ISO date; null for students and staff. */
export function accessUntil(p) {
  if (!p || p.role !== 'guest') return null;
  const a = [p.paidUntil, p.trialUntil].filter(x => x && Date.parse(x) > Date.now()).sort();
  return a.length ? a.at(-1) : null;
}
export const TRIAL_DAYS = 7;
export function tier(p) {
  if (!p?.role) return 'none';
  if (p.role === 'teacher' || p.role === 'admin') return 'staff';
  if (p.role === 'student') return 'member';
  if (p.role === 'guest' && (paidActive(p) || trialActive(p))) return 'member';
  return 'free';
}
export const isMember = p => { const t = tier(p); return t === 'staff' || t === 'member'; };
/** Daily AI allowance for free accounts (members keep their usual limits). */
export const FREE = { testSections: 8, liveQuestions: 6 };

/**
 * Free accounts get one full-access trial (TRIAL_DAYS, or the days set in Admin), once per account and once per
 * phone number. Called wherever a free account is seen, so accounts made before the trial existed get it too.
 * Returns true when it changed the profile (the caller saves it).
 */
export async function ensureTrial(uid, p) {
  if (!p || p.role !== 'guest' || p.trialUntil || p.paidUntil) return false;
  const { getStore } = await import('@netlify/blobs');
  const S = getStore({ name: 'school', consistency: 'strong' });
  const m = (await S.get('membership', { type: 'json' })) || {};
  const days = Math.max(0, Math.min(30, m.trialDays == null ? TRIAL_DAYS : +m.trialDays || 0));
  if (!days) return false;
  const d = String(p.phone || '').replace(/\D/g, ''), key = d.length >= 10 ? d.slice(-10) : '';
  const T = (await S.get('trials', { type: 'json' })) || {};
  if (key && T[key] && T[key] !== uid) { p.trialUntil = new Date(0).toISOString(); return true; }   // this phone already had a trial
  p.trialUntil = new Date(Date.now() + days * 864e5).toISOString();
  if (key) { T[key] = uid; await S.setJSON('trials', T); }
  return true;
}
