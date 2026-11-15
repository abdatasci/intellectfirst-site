// Young Learners picture banks for IF Live (kind "y"), built from a/yl-centre/data.js. Run: node scripts/make-yl-banks.cjs
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'a/yl-centre/data.js'), 'utf8'), ctx);
const Y = ctx.window.YL, P = Y.P;
const pick = (arr, n, not) => arr.filter(x => !not.includes(x)).sort(() => Math.random() - .5).slice(0, n);
const banks = [], BOOK = JSON.parse(fs.readFileSync(path.join(ROOT, 'live/banks.json'), 'utf8'));
for (const L of Object.values(Y.levels)) {
  const words = L.words.filter(w => P[w] && /^[a-z ]+$/i.test(w) && !/_c$/.test(w));
  const units = [];
  units.push({ id: 'pic', t: '🖼️ What is it? (picture → word)', q: words.map(w => [P[w] + '  What is it?', [w, ...pick(words, 3, [w])], 0, '']) });
  units.push({ id: 'find', t: '🔎 Find the picture (word → picture)', q: words.map(w => ['Find: ' + w, [P[w], ...pick(words, 3, [w]).map(x => P[x])], 0, '']) });
  for (const t of L.tasks) {
    const its = t.items;
    if (t.kind === 'yesNo') units.push({ id: t.id, t: '✅ Yes or no?', q: its.map(it => [P[it[0]] + '  ' + it[1], ['Yes', 'No'], it[2] ? 0 : 1, '']) });
    if (t.kind === 'picWord') units.push({ id: t.id, t: '🔤 Choose the word', q: its.map(it => [P[it[0]] + '  Which word?', [it[0], ...it[1]], 0, '']) });
    if (t.kind === 'defPick' || t.kind === 'gapPick' || t.kind === 'dialogue') units.push({ id: t.id, t: (t.kind === 'defPick' ? '📖 ' : t.kind === 'gapPick' ? '✏️ ' : '💬 ') + t.title, q: its.map(it => [it[0], [it[1], ...it[2]], 0, '']) });
    if (t.kind === 'defType') { const all = its.map(x => x[1]); units.push({ id: t.id, t: '📖 What is it? (definitions)', q: its.map(it => [it[0], [it[1], ...pick(all, 2, [it[1]])], 0, '']) }); }
    if (t.kind === 'typeWord') { units.push({ id: t.id, t: '⏮️ Past forms', q: its.map(it => { const base = (it[0].match(/\((\w+)\)/) || [])[1] || ''; return [it[0].replace(/\(\w+\) /, ''), [it[1], base, base + 'ed'].filter((x, i, a) => x && a.indexOf(x) === i), 0, base ? base + ' → ' + it[1] : '']; }) }); }
  }
  // the book's units (the vocabulary course for this level), so the teacher can pick a unit: picture or definition → word
  const V = BOOK.banks.find(b => b.id === { movers: 'v-Movers', flyers: 'v-Flyers' }[L.id]);
  if (V) {
    const allW = [].concat(...V.units.map(u => u.w.map(w => w[0])));
    for (const u of V.units) {
      const own = u.w.map(w => w[0]);
      const q = u.w.map(w => {
        const others = pick(own, 2, [w[0]]).concat(pick(allW, 3, own)).slice(0, 2);
        return P[w[0]] ? [P[w[0]] + '  What is it?', [w[0], ...others], 0, w[1]] : ['📖 ' + w[1], [w[0], ...others], 0, w[2] ? w[0] + ' — ' + w[2] : ''];
      });
      units.push({ id: 'U' + u.id, t: 'Unit ' + u.id + ' · ' + u.t, q });
    }
  }
  banks.push({ id: 'y-' + L.id, name: 'Young Learners · ' + L.name, kind: 'y', units });
}
const file = path.join(ROOT, 'live/banks.json'), B = JSON.parse(fs.readFileSync(file, 'utf8'));
B.banks = B.banks.filter(b => b.kind !== 'y').concat(banks);
fs.writeFileSync(file, JSON.stringify(B));
for (const b of banks) console.log(b.id, b.units.map(u => u.id + ':' + u.q.length).join(' '));
