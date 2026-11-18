// English Files track of IF General English: lesson content and the "Covered" switch.
//   GET  /api/ef/<book>            which units this person may open (+ for staff: their classes on this book and what is covered)
//   GET  /api/ef/<book>/<unit>     the unit's lessons: 403 "locked" unless the unit is open for this person (a direct link obeys the same rule)
//   GET  /api/ef/class/<classId> staff: the class's English Files book, its units and which are covered
//   POST /api/ef/<book>/cover      { classId, unit, on }  staff: mark a unit Covered for a class (its teacher, or the administrator)
// Content lives in netlify/lib/ef/<book>.json (built by tools/build-ef.mjs); it is never shipped to the browser as a static file.
// Store "ielts": ef/cover/<classId> → { <book>: { <unit>: { at, by } } }
import { getStore } from '@netlify/blobs';
import { getUser, refreshSession } from '@netlify/identity';
import { tgAccount } from '../lib/tgauth.mjs';
import { tier } from '../lib/access.mjs';
import { doc, inClass } from '../lib/bot-core.mjs';
import { BOOKS, classBook, canOpen } from '../lib/efcourse.mjs';
import A0 from '../lib/ef/ef-a0.json';
import A1 from '../lib/ef/ef-a1.json';
import A2 from '../lib/ef/ef-a2.json';
import B1 from '../lib/ef/ef-b1.json';
import B2 from '../lib/ef/ef-b2.json';
import C1 from '../lib/ef/ef-c1.json';

const DATA = { 'ef-a0': A0, 'ef-a1': A1, 'ef-a2': A2, 'ef-b1': B1, 'ef-b2': B2, 'ef-c1': C1 };
const U = () => getStore({ name: 'ielts', consistency: 'strong' });
const json = (d, s = 200) => Response.json(d, { status: s, headers: { 'Cache-Control': 'no-store' } });
const fail = (s, error) => json({ error }, s);
const live = s => !/withdrawn|finished|frozen/i.test(s?.status || '');

async function who(req) {
  let user = null; try { user = (await tgAccount(req)) || (await refreshSession().catch(() => null), await getUser()); } catch {}
  if (!user) return { user: null, profile: null, level: 'none' };
  const profile = (await U().get(`u/${user.id}/profile`, { type: 'json' })) || null;
  return { user, profile, level: tier(profile) };
}
const coverOf = async classId => (await U().get(`ef/cover/${classId}`, { type: 'json' }).catch(() => null)) || {};

export default async (req) => {
  const url = new URL(req.url), [book, unit] = url.pathname.replace(/^\/api\/ef\/?/, '').split('/').map(decodeURIComponent);
  if (book === 'class' && req.method === 'GET') {   // for the class page in My account: this class's book, its units and what is covered
    const w = await who(req); if (w.level !== 'staff') return fail(403, 'staff');
    const [cls, bks] = await Promise.all([doc('classes'), doc('books')]), c = cls.find(x => x.id === unit);
    if (!c) return fail(404, 'class');
    if (w.profile.role !== 'admin' && c.teacherId !== w.profile.teacherId) return fail(403, 'not your class');
    const bk = classBook(c, bks); if (!BOOKS.includes(bk)) return json({ book: '' });
    return json({ book: bk, units: Object.entries(DATA[bk].units).map(([id, u]) => ({ id, title: u.title })), covered: Object.keys((await coverOf(c.id))[bk] || {}) });
  }
  if (!BOOKS.includes(book)) return fail(404, 'book');
  const B = DATA[book], ids = Object.keys(B.units), { user, profile, level } = await who(req), staff = level === 'staff';
  const [classes, books] = user ? await Promise.all([doc('classes'), doc('books')]) : [[], []];
  const onBook = classes.filter(c => !c.left && classBook(c, books) === book);

  if (unit === 'cover' && req.method === 'POST') {
    if (!staff) return fail(403, 'staff');
    const b = await req.json().catch(() => ({})), c = onBook.find(x => x.id === b.classId);
    if (!c) return fail(404, 'class');
    if (profile.role !== 'admin' && c.teacherId !== profile.teacherId) return fail(403, 'not your class');
    if (!B.units[b.unit]) return fail(404, 'unit');
    const cv = await coverOf(c.id); cv[book] = cv[book] || {};
    if (b.on) cv[book][b.unit] = { at: new Date().toISOString(), by: profile.name || user.email || '' }; else delete cv[book][b.unit];
    await U().setJSON(`ef/cover/${c.id}`, cv);
    return json({ ok: true, covered: Object.keys(cv[book]) });
  }
  if (req.method !== 'GET') return fail(405, 'method');

  // the student's own classes on this book, and what their teachers have covered
  let covers = [], myClasses = [];
  if (level === 'member' && profile?.studentId) {
    const s = (await doc('students')).find(x => x.id === profile.studentId);
    if (s && live(s)) { myClasses = onBook.filter(c => inClass(c, s)); covers = await Promise.all(myClasses.map(c => coverOf(c.id).then(v => v[book] || {}))); }
  }
  const open = id => canOpen({ level, index: ids.indexOf(id), unitId: id, covers });

  if (!unit) {
    const out = { book, level, mode: staff ? 'staff' : covers.length ? 'class' : level === 'member' ? 'member' : 'free', open: ids.filter(open) };
    if (covers.length) out.className = myClasses.map(c => c.label).join(', ');
    if (staff) {
      const mine = onBook.filter(c => profile.role === 'admin' || c.teacherId === profile.teacherId);
      out.classes = await Promise.all(mine.map(async c => ({ id: c.id, label: c.label, covered: Object.keys((await coverOf(c.id))[book] || {}) })));
    }
    return json(out);
  }
  const u = B.units[unit]; if (!u) return fail(404, 'unit');
  if (!open(unit)) return fail(403, 'locked');
  return json({ unit: { id: unit, ...u } });
};
export const config = { path: ['/api/ef/*'] };
