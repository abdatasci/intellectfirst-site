// Copies the static website into dist/ for Netlify, leaving out build-only files
// (node_modules, serverless function sources, package files) so they are never published.
import { cpSync, rmSync, readdirSync } from 'node:fs';
const SKIP = new Set(['node_modules', 'netlify', 'dist', 'scripts', '.git', '.gitignore', '.netlify',
  'package.json', 'package-lock.json', 'netlify.toml', 'README.md']);
rmSync('dist', { recursive: true, force: true });
for (const name of readdirSync('.')) {
  if (SKIP.has(name)) continue;
  cpSync(name, `dist/${name}`, { recursive: true });
}
console.log('Static site copied to dist/');
