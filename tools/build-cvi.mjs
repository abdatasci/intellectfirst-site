// Builds the "Cambridge Vocabulary for IELTS" course of the IF App (IELTS track), in the same shape as the English Files courses.
//   node tools/build-cvi.mjs
// Words: the IELTS Centre vocabulary bank (a/ielts-studio/index.html, our own definitions, Russian, examples and collocations),
// organised by the book's units. Readings, listenings and speaking prompts: tools/cvi/units-*.mjs (original IF Academy texts).
// Writes: app/courses/cvi.js                 the public outline (no lesson content)
//         netlify/lib/ef/cvi-ielts.json      the lesson content, sent by /api/ef only for units the person may open
import fs from 'node:fs';
import A from './cvi/units-1.mjs';
import B from './cvi/units-2.mjs';
const X = { ...A, ...B }, CHUNK = 14, ID = 'cvi-ielts';
const page = fs.readFileSync('a/ielts-studio/index.html', 'utf8');
const VOCAB = JSON.parse(page.match(/const VOCAB=(\[.*?\]);\n/s)[1]);
const TITLES = { 23: 'Academic Writing Task 1: data and processes', 24: 'Academic Writing Task 2: argument and cohesion' };
const units = {}, out = [];
for (const t of VOCAB.filter(t => t.unit && (t.unit <= 20 || TITLES[t.unit])).sort((a, b) => a.unit - b.unit)) {
  const uid = String(t.unit), x = X['U' + uid] || {}, title = TITLES[t.unit] || t.topic.replace(/^Unit \d+ · /, '');
  const words = t.words.map(w => [w.w, w.def, w.ru || '', '', w.ex || '', w.col || '', w.up ? 'Band 7+: ' + w.up : '']);
  const n = Math.ceil(words.length / CHUNK), size = Math.ceil(words.length / n), lessons = [];
  for (let i = 0; i < n; i++) lessons.push({ id: 'v' + (i + 1), type: 'vocab', title: 'Vocabulary in context' + (n > 1 ? ' ' + (i + 1) : ''), from: i * size, to: Math.min(words.length, (i + 1) * size) });
  if (x.r) lessons.push({ id: 'r', type: 'reading', title: (/^Model answer/.test(x.r.title) ? '' : 'Reading: ') + x.r.title });
  if (x.l) lessons.push({ id: 'l', type: 'listen', title: 'Listening: ' + x.l.title });
  if (x.talk) lessons.push({ id: 's', type: 'speaking', title: 'Speaking: ' + title });
  lessons.push({ id: 'c', type: 'check', title: 'Unit check' });
  units[uid] = { title, words, talk: x.talk || null, ...(x.r ? { r: { text: x.r.text, ex: x.r.ex } } : {}), ...(x.l ? { l: { intro: x.l.intro, script: x.l.script, ex: x.l.ex } } : {}), lessons };
  out.push({ id: uid, topic: uid, title, n: words.length, g: '', obj: [`Use ${words.length} words and phrases on the topic “${title}”`, ...(x.r ? [/^Model answer/.test(x.r.title) ? 'Study a model answer and the language it uses' : 'Practise an IELTS-style reading task'] : []), ...(x.l ? ['Practise an IELTS-style listening task'] : []), ...(x.talk ? ['Answer IELTS Speaking questions on the topic'] : [])], lessons: lessons.map(l => ({ id: l.id, type: l.type, title: l.title })) });
}
fs.writeFileSync(`netlify/lib/ef/${ID}.json`, JSON.stringify({ id: ID, level: 'B2–C1', units }));
const course = { id: ID, track: 'ielts', ef: true, self: true, series: 'Cambridge Vocabulary for IELTS', level: 'B2–C1', icon: '📘', title: 'Cambridge Vocabulary for IELTS', sub: `${out.length} units · Bands 5–7.5+`, blurb: 'Follows Cambridge Vocabulary for IELTS unit by unit: the unit words with meanings, Russian, examples and collocations, then an IELTS-style reading or model answer, a listening, speaking questions and a unit check. The readings and recordings are written by IF Academy.', units: out };
fs.writeFileSync('app/courses/cvi.js', '/* Cambridge Vocabulary for IELTS: public outline only. Built by tools/build-cvi.mjs — do not edit by hand. */\nIFX.course(' + JSON.stringify(course) + ');\n');
console.log(ID, out.length, 'units', out.reduce((a, u) => a + u.n, 0), 'words', out.reduce((a, u) => a + u.lessons.length, 0), 'lessons');
