// Builds the English Files track of IF General English from the coursebook unit mappings (vocabulary arenas)
// and the authored grammar / speaking content in tools/ef/<level>.mjs.
//   node tools/build-ef.mjs
// Writes: app/courses/ef-files.js   the public outline (unit titles, objectives, lesson list: no lesson content)
//         netlify/lib/ef/<book>.json the lesson content, sent by /api/ef only for units the person may open
import fs from 'node:fs';
const BOOKS = [['A1', 'ef-a1', 'Elementary', '📗'], ['A2', 'ef-a2', 'Pre-intermediate', '📘'], ['B1', 'ef-b1', 'Intermediate', '📙'], ['B2', 'ef-b2', 'Upper-intermediate', '📕'], ['C1', 'ef-c1', 'Advanced', '📓']];
const CHUNK = 12, outline = [];
fs.mkdirSync('netlify/lib/ef', { recursive: true });
for (const [lv, id, name, icon] of BOOKS) {
  const page = fs.readFileSync(`a/if-english/courses/${lv}/index.html`, 'utf8');
  const file = [...page.matchAll(/shared\/([0-9a-f]{12}\.js)/g)].map(m => m[1]).find(f => /^\s*const DATA = /.test(fs.readFileSync('a/if-english/shared/' + f, 'utf8')));
  const src = fs.readFileSync('a/if-english/shared/' + file, 'utf8'), DATA = JSON.parse(src.match(/const DATA = (\{[\s\S]*?\});?\s*\n/)[1]);
  let extra = {}; try { extra = (await import(`./ef/${lv.toLowerCase()}.mjs`)).default; } catch {}
  let listen = {}; try { listen = (await import(`./ef/${lv.toLowerCase()}-listen.mjs`)).default; } catch {}
  const units = {}, out = [];
  for (const [uid, u] of Object.entries(DATA)) {
    if (!Array.isArray(u.words) || !u.words.length) continue;
    const x = extra[uid] || null, n = Math.ceil(u.words.length / CHUNK), size = Math.ceil(u.words.length / n), lessons = [];
    for (let i = 0; i < n; i++) lessons.push({ id: 'v' + (i + 1), type: 'vocab', title: 'Vocabulary in context' + (n > 1 ? ' ' + (i + 1) : ''), from: i * size, to: Math.min(u.words.length, (i + 1) * size) });
    if (x) lessons.push({ id: 'g', type: 'grammar', title: x.g });
    const li = listen[uid] || null; if (li) lessons.push({ id: 'l', type: 'listen', title: 'Listening: ' + li.title });
    lessons.push({ id: 's', type: 'speaking', title: 'Speaking: ' + u.title }, { id: 'c', type: 'check', title: 'Unit check' });
    units[uid] = { title: u.title, words: u.words.map(w => [w[0], w[1] || '', w[2] || '', w[3] || '']), ...(x ? { g: { title: x.g, rule: x.rule, ru: x.ru || '', ex: x.ex } } : {}), talk: x?.talk || null, ...(li ? { l: { intro: li.intro, script: li.script, ex: li.ex } } : {}), lessons };
    out.push({ id: uid, topic: uid, title: u.title, n: u.words.length, g: x ? x.g : '', obj: [`Use ${u.words.length} words and phrases on the topic “${u.title}”`, ...(x ? [`Use this grammar correctly: ${x.g.charAt(0).toLowerCase() + x.g.slice(1)}`] : []), 'Speak for about a minute on the unit topic'], lessons: lessons.map(l => ({ id: l.id, type: l.type, title: l.title })) });
  }
  fs.writeFileSync(`netlify/lib/ef/${id}.json`, JSON.stringify({ id, level: lv, units }));
  outline.push({ id, track: 'general', ef: true, level: lv, icon, title: `English Files · ${name} (${lv})`, sub: `${out.length} units`, blurb: `Follows your ${name} coursebook unit by unit: vocabulary in context, ${out.some(u => u.g) ? 'grammar, ' : ''}${Object.keys(listen).length ? 'a listening, ' : ''}a speaking task and a unit check. Units open when your teacher has covered them in class.`, units: out });
  console.log(id, out.length, 'units', out.reduce((a, u) => a + u.n, 0), 'words', out.filter(u => u.g).length, 'with grammar');
}
fs.writeFileSync('app/courses/ef-files.js', '/* English Files track: public outline only. Built by tools/build-ef.mjs — do not edit by hand. */\n' + outline.map(c => 'IFX.course(' + JSON.stringify(c) + ');').join('\n') + '\n');
