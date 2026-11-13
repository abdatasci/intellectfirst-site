// Who gets what on intellectfirst.com.
//   staff   teachers and the administrator
//   member  IF Academy students, Abdoulie's individual students, IF Alumni, and outside learners who have paid
//   free    outside learners (and anyone still waiting for approval): open games, placement test, small daily AI allowance
// profile.role: 'admin' | 'teacher' | 'student' | 'guest'; profile.track: 'if' | 'private' | 'alumni' | 'outside';
// profile.paidUntil: ISO date for paid outside learners.
export const TRACKS = ['if', 'private', 'alumni', 'outside'];
export const TRACK_LABEL = { if: 'IF Academy student', private: 'Individual student', alumni: 'IF Alumni', outside: 'Outside learner' };
export function paidActive(p) { return !!(p?.paidUntil && Date.parse(p.paidUntil) > Date.now()); }
export function tier(p) {
  if (!p?.role) return 'none';
  if (p.role === 'teacher' || p.role === 'admin') return 'staff';
  if (p.role === 'student') return 'member';
  if (p.role === 'guest' && paidActive(p)) return 'member';
  return 'free';
}
export const isMember = p => { const t = tier(p); return t === 'staff' || t === 'member'; };
/** Daily AI allowance for free accounts (members keep their usual limits). */
export const FREE = { testSections: 8, liveQuestions: 6 };
