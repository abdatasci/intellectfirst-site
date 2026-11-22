// IF Live word banks for the three English Files books that have no vocabulary arena: Beginner, Intermediate Plus and
// Advanced Plus. Built from IF Academy's own word lists in tools/ef/<level>-units-*.txt (unit order and titles follow the
// coursebook; every word, meaning and translation is original). Run: node scripts/make-ef-extra-banks.mjs
import fs from 'node:fs';
const BOOKS = [['a0', 'v-A0', 'English File · A0 Beginner', 'v-A1', 'before'], ['b1p', 'v-B1p', 'English File · B1+ Intermediate Plus', 'v-B1', 'after'], ['c2', 'v-C2', 'English File · C2 Advanced Plus', 'v-C1', 'after']];
const file = 'live/banks.json', B = JSON.parse(fs.readFileSync(file, 'utf8'));
for (const [lv, id, name, near, side] of BOOKS) {
  const units = []; let cur = null;
  for (const f of fs.readdirSync('tools/ef').filter(f => f.startsWith(lv + '-units-') && f.endsWith('.txt')).sort())
    for (const ln of fs.readFileSync('tools/ef/' + f, 'utf8').split('\n')) {
      if (!ln.trim() || ln.startsWith('#')) continue;
      const p = ln.split('|').map(s => s.trim());
      if (ln.startsWith('@')) { cur = { id: p[0].slice(1), t: p[1] || '', w: [] }; units.push(cur); continue; }
      if (cur && p[0] && p[1]) cur.w.push([p[0], p[1].replace(/^./, c => c.toUpperCase()).replace(/\.$/, ''), p[2] && p[2] !== '-' ? p[2] : '']);
    }
  B.banks = B.banks.filter(b => b.id !== id);
  const i = B.banks.findIndex(b => b.id === near);
  B.banks.splice(i < 0 ? B.banks.length : side === 'before' ? i : i + 1, 0, { id, name, kind: 'v', units });
  console.log(id, units.length, 'units,', units.reduce((n, u) => n + u.w.length, 0), 'words');
}
fs.writeFileSync(file, JSON.stringify(B));
