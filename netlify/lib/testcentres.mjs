// The IF Academy test centres a teacher can send to a class as an online test (bot "📝 Send homework" and My classes).
export const SITE = 'https://intellectfirst.com';
export const CENTRES = [
  ['ef-a1', 'English File Elementary (A1)', '/a/ef-a1-tests/'],
  ['ef-a2', 'English File Pre-intermediate (A2)', '/a/ef-a2-tests/'],
  ['ef-b1', 'English File Intermediate (B1)', '/a/ef-b1-tests/'],
  ['ef-b2', 'English File Upper-intermediate (B2)', '/a/ef-b2-tests/'],
  ['ef-c1', 'English File Advanced (C1)', '/a/ef-c1-tests/'],
  ['teens-b1', 'English for Teenagers B1–B2', '/a/teens-b1-tests/'],
  ['teens-b2', 'English for Teenagers B2–C1', '/a/teens-b2-tests/'],
  ['pet', 'PET (B1 Preliminary)', '/a/pet-tests/'],
  ['yl', 'Young Learners (Starters–Flyers)', '/a/yl-tests/'],
  ['ielts', 'IELTS Centre', '/a/ielts/'],
  ['place', 'IF Placement Test', '/a/placement-test/']
];
export const centreByUrl = url => CENTRES.find(c => c[2] === url) || null;

/* Which test inside a centre (tests/catalog.json, made from each centre's "Test" list). A link with ?t=<id>&cls=&name=
   opens that test with the student's class and name already chosen (tests/deeplink.js). */
import CATALOG from '../../tests/catalog.json';
export const testsOf = url => { const c = centreByUrl(url); return c ? (CATALOG[c[0]] || []) : []; };
const toks = s => String(s || '').toLowerCase().replace(/[–—-]/g, ' ').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w && w !== 'the' && w !== 'files').map(w => w === 'file' ? 'file' : w).sort().join(' ');
/** The test meant by a teacher's id or words ("File Test 3", "file 3 test", "f3", "Unit 2.1", "Progress 1–5 A"); null if unclear. */
export function matchTest(url, idOrText) {
  const list = testsOf(url), q = String(idOrText || '').trim(); if (!q || !list.length) return null;
  const byId = list.find(([id]) => id === q); if (byId) return byId;
  const tq = toks(q);
  const same = list.filter(([, title]) => toks(title) === tq); if (same.length === 1) return same[0];
  const inside = list.filter(([, title]) => { const tt = toks(title).split(' '), qq = tq.split(' '); return tt.every(w => qq.includes(w)); });
  if (inside.length) return inside.sort((a, b) => b[1].length - a[1].length)[0];
  const nums = (q.match(/\d+(\.\d+)?/g) || []).join(' '), kind = /quick/i.test(q) ? 'quick' : /progress/i.test(q) ? 'progress' : /unit/i.test(q) ? 'unit' : /entry/i.test(q) ? 'entry' : /end/i.test(q) ? 'end' : /file|test/i.test(q) ? 'file' : '';
  const cand = list.filter(([, title]) => (title.match(/\d+(\.\d+)?/g) || []).join(' ') === nums && (!kind || title.toLowerCase().includes(kind)));
  return cand.length === 1 ? cand[0] : null;
}
/** The link one student opens: the right test, their class and their name, inside Telegram when tg is set. */
export function testLink(item, student, tg) {
  const p = new URLSearchParams();
  const tid = item.test || (item.text && item.text !== item.centre ? (matchTest(item.url, item.text) || [])[0] : '');   // older items: worked out from the teacher's words
  if (tid) p.set('t', tid);
  if (item.classLabel) p.set('cls', item.classLabel);
  const nm = student ? `${student.first || ''} ${student.last || ''}`.trim() : ''; if (nm && !String(student.id || '').startsWith('pv:')) p.set('name', nm);
  if (tg) p.set('tg', '1');
  const qs = p.toString();
  return SITE + item.url + (qs ? '?' + qs : '');
}
