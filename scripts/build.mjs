// Copies the static website into dist/ for Netlify, leaving out build-only files
// (node_modules, serverless function sources, package files) so they are never published.
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
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
for (const f of ['dist/a/ielts/index.html', 'dist/a/ielts/app.js', 'dist/me/index.html']) {
  let s = readFileSync(f, 'utf8');
  s = s.replace(/((?:src|href)=")((?:\/[a-z0-9\/-]+\/)?[a-z-]+\.(?:js|css))(")/g, `$1$2?v=${V}$3`)
       .replace(/fetch\('data\/([a-z]+\.json)'\)/g, `fetch('data/$1?v=${V}')`);
  writeFileSync(f, s);
}
console.log('IELTS Centre assets stamped with version', V);
