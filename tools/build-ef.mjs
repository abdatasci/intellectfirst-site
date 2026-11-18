// Builds the English Files track of IF General English from the coursebook unit mappings (vocabulary arenas)
// and the authored grammar / speaking content in tools/ef/<level>.mjs.
//   node tools/build-ef.mjs
// Writes: app/courses/ef-files.js   the public outline (unit titles, objectives, lesson list: no lesson content)
//         netlify/lib/ef/<book>.json the lesson content, sent by /api/ef only for units the person may open
import fs from 'node:fs';
const BOOKS = [['A0', 'ef-a0', 'Beginner', '📒'], ['A1', 'ef-a1', 'Elementary', '📗'], ['A2', 'ef-a2', 'Pre-intermediate', '📘'], ['B1', 'ef-b1', 'Intermediate', '📙'], ['B1P', 'ef-b1p', 'Intermediate Plus', '📔'], ['B2', 'ef-b2', 'Upper-intermediate', '📕'], ['C1', 'ef-c1', 'Advanced', '📓'], ['C2', 'ef-c2', 'Advanced Plus', '📕']];
const CHUNK = 12, outline = [];
fs.mkdirSync('netlify/lib/ef', { recursive: true });
for (const [lv, id, name, icon] of BOOKS) {
  // Unit order, titles and words: from the vocabulary arena of the level, or (Beginner, which has no arena) from tools/ef/<level>-units-*.txt:
  //   "@unit | title", then "word | meaning | Russian | Russian meaning | example | pattern | pattern example"
  let DATA = {}; const own = {};
  if (fs.existsSync(`a/if-english/courses/${lv}/index.html`)) {
    const page = fs.readFileSync(`a/if-english/courses/${lv}/index.html`, 'utf8');
    const file = [...page.matchAll(/shared\/([0-9a-f]{12}\.js)/g)].map(m => m[1]).find(f => /^\s*const DATA = /.test(fs.readFileSync('a/if-english/shared/' + f, 'utf8')));
    const src = fs.readFileSync('a/if-english/shared/' + file, 'utf8'); DATA = JSON.parse(src.match(/const DATA = (\{[\s\S]*?\});?\s*\n/)[1]);
  } else {
    for (const f of fs.readdirSync('tools/ef').filter(f => f.startsWith(lv.toLowerCase() + '-units-') && f.endsWith('.txt')).sort()) { let cur = ''; for (const ln of fs.readFileSync('tools/ef/' + f, 'utf8').split('\n')) { if (!ln.trim() || ln[0] === '#') continue; const p = ln.split(' | ').map(x => x.trim() === '-' ? '' : x.trim()); if (ln[0] === '@') { cur = p[0].slice(1).trim(); DATA[cur] = { title: p[1], words: [] }; own[cur] = {}; continue; } DATA[cur].words.push(p.slice(0, 4)); own[cur][p[0]] = p.slice(4); } }
  }
  let extra = {}; try { extra = (await import(`./ef/${lv.toLowerCase()}.mjs`)).default; } catch {}
  // example sentences and patterns for the flashcards: tools/ef/<level>-words-*.txt  (@unit, then "word | example | pattern | pattern example")
  const ctx = own; for (const f of fs.readdirSync('tools/ef').filter(f => f.startsWith(lv.toLowerCase() + '-words-') && f.endsWith('.txt')).sort()) { let cur = ''; for (const ln of fs.readFileSync('tools/ef/' + f, 'utf8').split('\n')) { if (!ln.trim() || ln[0] === '#') continue; if (ln[0] === '@') { cur = ln.slice(1).trim(); ctx[cur] = ctx[cur] || {}; continue; } const p = ln.split(' | ').map(x => x.trim()); if (p.length >= 2) ctx[cur][p[0]] = p.slice(1); } }
  let read = {}; try { read = (await import(`./ef/${lv.toLowerCase()}-read.mjs`)).default; } catch {}
  let listen = {}; try { listen = (await import(`./ef/${lv.toLowerCase()}-listen.mjs`)).default; } catch {}
  const units = {}, out = [];
  for (const [uid, u] of Object.entries(DATA)) {
    if (!Array.isArray(u.words) || !u.words.length) continue;
    const x = extra[uid] || null, n = Math.ceil(u.words.length / CHUNK), size = Math.ceil(u.words.length / n), lessons = [];
    for (let i = 0; i < n; i++) lessons.push({ id: 'v' + (i + 1), type: 'vocab', title: 'Vocabulary in context' + (n > 1 ? ' ' + (i + 1) : ''), from: i * size, to: Math.min(u.words.length, (i + 1) * size) });
    if (x) lessons.push({ id: 'g', type: 'grammar', title: x.g });
    const rd = read[uid] || null; if (rd) lessons.push({ id: 'r', type: 'reading', title: 'Reading: ' + rd.title });
    const li = listen[uid] || null; if (li) lessons.push({ id: 'l', type: 'listen', title: 'Listening: ' + li.title });
    lessons.push({ id: 's', type: 'speaking', title: 'Speaking: ' + u.title }, { id: 'c', type: 'check', title: 'Unit check' });
    units[uid] = { title: u.title, words: u.words.map(w => { const c = (ctx[uid] || {})[w[0]] || []; return [w[0], w[1] || '', w[2] || '', w[3] || '', ...(c.length ? [c[0] || '', c[1] || '', c[2] || ''] : [])]; }), ...(x ? { g: { title: x.g, rule: x.rule, ru: x.ru || '', ex: x.ex } } : {}), talk: x?.talk || null, ...(rd ? { r: { text: rd.text, ex: rd.ex } } : {}), ...(li ? { l: { intro: li.intro, script: li.script, ex: li.ex } } : {}), lessons };
    out.push({ id: uid, topic: uid, title: u.title, n: u.words.length, g: x ? x.g : '', obj: [`Use ${u.words.length} words and phrases on the topic “${u.title}”`, ...(x ? [`Use this grammar correctly: ${x.g.charAt(0).toLowerCase() + x.g.slice(1)}`] : []), 'Speak for about a minute on the unit topic'], lessons: lessons.map(l => ({ id: l.id, type: l.type, title: l.title })) });
  }
  const shown = lv.replace(/P$/, '+');
  fs.writeFileSync(`netlify/lib/ef/${id}.json`, JSON.stringify({ id, level: shown, units }));
  outline.push({ id, track: 'general', ef: true, level: shown, icon, title: `English Files · ${name} (${shown})`, sub: `${out.length} units`, blurb: `Follows your ${name} coursebook unit by unit: vocabulary in context, ${out.some(u => u.g) ? 'grammar, ' : ''}${Object.keys(read).length ? 'a reading, ' : ''}${Object.keys(listen).length ? 'a listening, ' : ''}a speaking task and a unit check. Units open when your teacher has covered them in class.`, units: out });
  console.log(id, out.length, 'units', out.reduce((a, u) => a + u.n, 0), 'words', out.filter(u => u.g).length, 'with grammar');
}
fs.writeFileSync('app/courses/ef-files.js', '/* English Files track: public outline only. Built by tools/build-ef.mjs — do not edit by hand. */\n' + outline.map(c => 'IFX.course(' + JSON.stringify(c) + ');').join('\n') + '\n');
