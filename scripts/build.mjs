// Copies the static website into dist/ for Netlify, leaving out build-only files
// (node_modules, serverless function sources, package files) so they are never published.
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
const SKIP = new Set(['node_modules', 'netlify', 'dist', 'scripts', '.git', '.gitignore', '.netlify',
  'package.json', 'package-lock.json', 'netlify.toml', 'README.md']);
rmSync('dist', { recursive: true, force: true });
for (const name of readdirSync('.')) {
  if (SKIP.has(name)) continue;
  cpSync(name, `dist/${name}`, { recursive: true });
}
console.log('Static site copied to dist/');

// Cache-busting: give the IELTS Centre's scripts, styles and data a version tag that changes
// with every deploy, so phones never keep running an older copy from the offline cache.
const V = (process.env.COMMIT_REF || Date.now().toString(36)).slice(0, 10);
for (const f of ['dist/index.html', 'dist/a/ielts/index.html', 'dist/a/ielts/app.js', 'dist/me/index.html', 'dist/a/placement-test/index.html', 'dist/a/placement-test/pt.js']) {
  let s = readFileSync(f, 'utf8');
  s = s.replace(/((?:src|href)=")((?:\/[a-z0-9\/-]+\/)?[a-z0-9-]+\.(?:js|css))(")/g, `$1$2?v=${V}$3`)
       .replace(/fetch\('data\/([a-z]+\.json)'\)/g, `fetch('data/$1?v=${V}')`);
  writeFileSync(f, s);
}
console.log('Homepage, portal and IELTS Centre assets stamped with version', V);

// Every page gets the shared Back / Home buttons and the 3D-shield tilt (if-nav.js decides what to show).
let navCount = 0;
(function walk(dir) {
  for (const n of readdirSync(dir)) {
    const p = `${dir}/${n}`;
    if (n === 'lessons' || n === 'node_modules') continue;
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!n.endsWith('.html')) continue;
    let s = readFileSync(p, 'utf8');
    if (s.includes('if-nav.js') || s.includes('data-no-nav') || !/<\/body>/i.test(s)) continue;
    s = s.replace(/<\/body>(?![\s\S]*<\/body>)/i, `<script src="/if-nav.js?v=${V}" defer></script>\n</body>`);
    writeFileSync(p, s); navCount++;
  }
})('dist');
console.log('Back/Home navigation added to', navCount, 'pages');

// Public AI assistant: refresh its knowledge from the homepage on every deploy, so prices and courses never go stale.
// Only public page text is used (sections below + class timetable), never student data.
try {
  const page = readFileSync('index.html', 'utf8');
  const clean = h => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<(br|\/p|\/li|\/h\d|\/tr|\/div)[^>]*>/g, '\n').replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
  const parts = [];
  for (const id of ['courses', 'teachers', 'join', 'levels', 'pricing', 'ecosystem', 'faqs', 'about', 'trial', 'location']) {
    const m = page.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`));
    if (m) parts.push(`## ${id}\n${clean(m[0])}`);
  }
  const seed = JSON.parse(readFileSync('netlify/lib/school-seed.json', 'utf8'));
  const old = JSON.parse(readFileSync('netlify/lib/public-kb.json', 'utf8')).text;
  const tail = old.slice(old.indexOf('## contacts'), old.indexOf('## current group timetable'));
  const cls = seed.classes.map(c => `- ${c.label}: ${c.schedule || 'by arrangement'}`).join('\n');
  if (parts.length >= 5 && tail.startsWith('## contacts')) {
    writeFileSync('netlify/lib/public-kb.json', JSON.stringify({ updated: new Date().toISOString().slice(0, 10), text: parts.join('\n\n') + '\n\n' + tail + `## current group timetable (local Kostanay time; ask the school to confirm a place in a group)\n${cls}` }));
    console.log('Public assistant knowledge refreshed from the homepage');
  }
} catch (e) { console.log('Public assistant knowledge not refreshed:', e.message); }
