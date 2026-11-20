// English Files track (IF General English): who may open which coursebook unit.
// Director's rule from 20 Nov 2026: an IF Academy student opens every unit of the books of their level. "Covered" is now
// only a mark that shows where the class is; it no longer locks anything. Kept free of storage so the rule can be tested alone.
export const BOOKS = ['ef-a0', 'ef-a1', 'ef-a2', 'ef-b1', 'ef-b1p', 'ef-b2', 'ef-c1', 'ef-c2', 'cvi-ielts'];
const levelIn = t => { const m = String(t || '').toUpperCase().match(/\b(PRE[- ]?A1|A0|A1|A2|B1|B2|C1|C2)\b/); return m ? (/PRE/.test(m[1]) ? 'A0' : m[1]) : ''; };
/** The English Files book a class studies, from its coursebook title or its own name ('' if it uses another book). Same rule as /class-access.js. */
export function bookKey(title) {
  const t = String(title || '').toLowerCase();
  if (!/english files?/.test(t)) return '';
  if (/advanced ?(plus|\+)/.test(t)) return 'ef-c2';
  if (/advanced/.test(t)) return 'ef-c1';
  if (/upper/.test(t)) return 'ef-b2';
  if (/pre[- ]?int/.test(t)) return 'ef-a2';
  if (/intermediate ?(plus|\+)/.test(t)) return 'ef-b1p';
  if (/intermediate/.test(t)) return 'ef-b1';
  if (/beginner/.test(t)) return 'ef-a0';
  if (/elementary/.test(t)) return 'ef-a1';
  const l = levelIn(t); return l ? 'ef-' + l.toLowerCase() : '';
}
export const classBook = (c, books) => bookKey((books || []).find(b => b.id === c.bookId)?.title) || bookKey(c.label);
/**
 * May this person open the unit?
 *   level     'staff' | 'member' | 'free' | 'none' (netlify/lib/access.mjs)
 *   index     the unit's position in the book (0 = first)
 *   covers    one {unitId: {...}} map per class of this student that studies this book; [] if they have no such class
 * Staff and every subscriber (class students, individual students, online learners): the whole book.
 * No subscription: unit 1 (2 with a free account). `covers` is no longer used to lock units.
 */
export function canOpen({ level, index, unitId, covers }) {
  if (level === 'staff') return true;
  if (level === 'member') return true;
  return index < (level === 'free' ? 2 : 1);
}
