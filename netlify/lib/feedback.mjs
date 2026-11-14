// Student feedback for the website: students write it in their account, the director approves it, the homepage shows it.
//   store "school": feedback → [{ id, uid, studentId, name, course, rating, text, lang, consent, status, at, editedAt, decidedAt }]
//   status: pending (waiting for the director) · shown (on the homepage) · hidden
import { getStore } from '@netlify/blobs';

const S = () => getStore({ name: 'school', consistency: 'strong' });
export const loadFeedback = async () => (await S().get('feedback', { type: 'json' })) || [];
const save = list => S().setJSON('feedback', list);
const str = (v, n) => (v == null ? '' : String(v)).replace(/\s+/g, ' ').trim().slice(0, n);

/** How a name shows on the website: first name and the first letter of the surname ("Aruzhan K."). */
export const shortName = n => { const w = str(n, 80).split(' ').filter(Boolean); return w.length ? w[0] + (w[1] ? ' ' + w[1][0].toUpperCase() + '.' : '') : ''; };

/** What visitors see: approved feedback only, newest first, no account details. */
export async function publicFeedback() {
  return (await loadFeedback()).filter(f => f.status === 'shown').sort((a, b) => (b.decidedAt || b.at).localeCompare(a.decidedAt || a.at))
    .map(f => ({ id: f.id, name: f.name, course: f.course, rating: f.rating, text: f.text, lang: f.lang, at: (f.at || '').slice(0, 10) }));
}
export async function mine(uid) { return (await loadFeedback()).find(f => f.uid === uid) || null; }

/** A student writes or edits their feedback (one per account). Every edit waits for approval again. */
export async function submit(uid, profile, studentName, b) {
  const text = str(b.text, 800), rating = Math.max(1, Math.min(5, Math.round(+b.rating || 0)));
  if (text.length < 20) { const e = new Error('short'); e.code = 'short'; throw e; }
  if (!b.consent) { const e = new Error('consent'); e.code = 'consent'; throw e; }
  const list = await loadFeedback(); let f = list.find(x => x.uid === uid); const now = new Date().toISOString();
  if (!f) { f = { id: 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), uid, at: now }; list.push(f); } else f.editedAt = now;
  Object.assign(f, { studentId: profile.studentId || null, name: shortName(studentName || profile.name), course: str(b.course, 80), rating, text, lang: ['en', 'ru', 'kk'].includes(b.lang) ? b.lang : 'en', consent: true, status: 'pending' });
  delete f.decidedAt;
  await save(list); return f;
}
export async function removeMine(uid) { const list = await loadFeedback(); await save(list.filter(f => f.uid !== uid)); }

/** The director: status shown | hidden | pending, or delete; may correct the name or course shown. */
export async function decide(id, b, by) {
  const list = await loadFeedback(); const i = list.findIndex(f => f.id === id); if (i < 0) return null;
  if (b.delete) { list.splice(i, 1); await save(list); return { deleted: true }; }
  const f = list[i];
  if (['shown', 'hidden', 'pending'].includes(b.status)) { f.status = b.status; f.decidedAt = new Date().toISOString(); f.decidedBy = by || ''; }
  if ('name' in b) f.name = str(b.name, 60) || f.name;
  if ('course' in b) f.course = str(b.course, 80);
  await save(list); return f;
}
