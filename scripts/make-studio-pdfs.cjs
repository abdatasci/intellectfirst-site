// Builds the downloadable IELTS Studio PDFs (vocabulary bank + writing language bank) from the Studio's own data.
// Run locally (needs Playwright + Chromium):  node scripts/make-studio-pdfs.js
// Output: netlify/files/pdf/*.pdf, served only to signed-in students and teachers by /api/school/download/<name>.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), http = require('http');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'netlify/files/pdf');
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const CSS = `
@page{size:A4;margin:16mm 15mm 18mm}
*{box-sizing:border-box}
body{margin:0;font:9.6pt/1.42 Carlito,"DejaVu Sans",sans-serif;color:#13203A}
h1,h2,h3{font-family:Caladea,"DejaVu Serif",Georgia,serif;font-weight:700;margin:0;color:#0B2250}
.cover{height:257mm;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:0 8mm;border-left:6px solid #B8862E;page-break-after:always}
.cover img{width:34mm;margin-bottom:12mm}
.cover .k{font-size:10pt;letter-spacing:.22em;text-transform:uppercase;color:#B8862E;font-weight:700}
.cover h1{font-size:40pt;line-height:1.05;margin:4mm 0 6mm}
.cover p{font-size:12pt;max-width:120mm;color:#56627D;margin:0 0 3mm}
.cover .foot{margin-top:24mm;font-size:9pt;color:#8A93A8}
.toc{page-break-after:always}
.toc h2{font-size:20pt;margin-bottom:6mm}
.toc ol{columns:2;column-gap:10mm;padding-left:6mm;margin:0;font-size:10.5pt}
.toc li{margin-bottom:1.6mm;break-inside:avoid}
.toc small{color:#8A93A8}
.sec{page-break-before:always}
.sec:first-of-type{page-break-before:auto}
.sh{border-bottom:2px solid #B8862E;padding-bottom:2mm;margin-bottom:4mm;display:flex;justify-content:space-between;align-items:baseline;gap:6mm}
.sh h2{font-size:18pt}
.sh span{font-size:9pt;color:#8A93A8;white-space:nowrap}
.w{break-inside:avoid;padding:2.2mm 0 2.4mm;border-bottom:.5px solid #D8E0EC;display:grid;grid-template-columns:44mm 1fr;gap:4mm}
.w .hd b{font-family:Caladea,"DejaVu Serif",serif;font-size:12pt;color:#0B2250;display:block;line-height:1.15}
.w .hd i{color:#8A93A8;font-size:8.6pt}
.w .hd .ru{display:block;color:#B8862E;font-size:9pt;margin-top:1mm;font-family:"DejaVu Sans",Carlito,sans-serif}
.w .bd p{margin:0 0 .8mm}
.w .ex{font-style:italic;color:#38445E}
.w .tag{font-size:7.6pt;letter-spacing:.08em;text-transform:uppercase;color:#8A93A8;font-weight:700;margin-right:1.5mm}
.band{display:inline-block;font-size:7.6pt;font-weight:700;color:#B8862E;border:.6px solid #B8862E;border-radius:6px;padding:0 1.6mm;margin-left:1.5mm;vertical-align:1px}
.lb{break-inside:avoid;margin-bottom:6mm}
.lb h3{font-size:13.5pt;margin-bottom:1.5mm}
.lb .note{color:#56627D;margin:0 0 2mm}
table{width:100%;border-collapse:collapse;font-size:9.4pt}
td{border-bottom:.5px solid #D8E0EC;padding:1.4mm 2mm;vertical-align:top}
td:first-child{font-weight:700;width:42%;color:#0B2250}
.exs{background:#F7EDD8;border-radius:3mm;padding:2mm 3mm;margin-top:2mm}
.exs p{margin:.6mm 0}
.exs .tag{color:#B8862E;font-size:7.6pt;letter-spacing:.08em;text-transform:uppercase;font-weight:700;margin-right:2mm}
.part{font-size:10pt;letter-spacing:.2em;text-transform:uppercase;color:#B8862E;font-weight:700;margin-bottom:2mm}
`;
function cover(logo, kicker, title, lines) {
  return `<section class="cover"><img src="${logo}" alt=""><div class="k">${esc(kicker)}</div><h1>${title}</h1>${lines.map(l => `<p>${esc(l)}</p>`).join('')}<div class="foot">Intellect First Academy · Kostanay · intellectfirst.com<br>For IF Academy students and teachers · ${today}</div></section>`;
}
function vocabHtml(V, logo) {
  const total = V.reduce((n, s) => n + s.words.length, 0);
  // plain topic names of our own (the Studio's sets 1–20 are numbered like course units)
  const NAMES = ['Childhood and growing up', 'Mind and body', 'Health and fitness', 'Lifestyles', 'University life', 'Communication', 'Transport and travel', 'History and the past', 'The natural world', 'Space and flight', 'Design and invention', 'Information technology', 'Modern life', 'Cities and urban growth', 'The environment', 'Energy', 'Business', 'Law and crime', 'The media', 'The arts'];
  const name = s => { const m = /^Unit (\d+) · /.exec(s.topic); return m ? (NAMES[+m[1] - 1] || s.topic.slice(m[0].length)) : s.topic; };
  let h = cover(logo, 'IF IELTS Studio', 'IELTS Vocabulary<br>Bank', [`${total.toLocaleString('en')} words in ${V.length} topic sets, each with a definition, Russian translation, example sentence, collocations and a Band 7.5+ upgrade.`, 'Original study material written by IF Academy for IELTS preparation.']);
  h += `<section class="toc"><h2>Contents</h2><ol>${V.map(s => `<li>${esc(name(s))} <small>· ${s.words.length} words</small></li>`).join('')}</ol></section>`;
  V.forEach((s, i) => {
    h += `<section class="sec"><div class="sh"><h2>${i + 1}. ${esc(name(s))}</h2><span>${s.words.length} words</span></div>` + s.words.map(w => `<div class="w"><div class="hd"><b>${esc(w.w)}</b><i>${esc(w.pos || '')}</i>${w.band ? `<span class="band">Band ${esc(w.band)}</span>` : ''}${w.ru ? `<span class="ru">${esc(w.ru)}</span>` : ''}</div><div class="bd"><p>${esc(w.def || '')}</p>${w.ex ? `<p class="ex">${esc(w.ex)}</p>` : ''}${w.col ? `<p><span class="tag">Collocations</span>${esc(w.col)}</p>` : ''}${w.up ? `<p><span class="tag">Upgrade</span>${esc(w.up)}</p>` : ''}</div></div>`).join('') + '</section>';
  });
  return h;
}
function langHtml(L, logo) {
  const n = (L.t1 || []).length + (L.t2 || []).length;
  let h = cover(logo, 'IF IELTS Studio', 'IELTS Writing<br>Language Bank', [`${n} sections of sentence patterns and vocabulary for Academic Writing Task 1 (charts, tables, processes and maps) and Task 2 essays, with model sentences.`, 'Original study material written by IF Academy.']);
  [['t1', 'Task 1 · Charts, tables, processes and maps'], ['t2', 'Task 2 · Essays']].forEach(([k, title], pi) => {
    h += `<section class="sec"><div class="part">Part ${pi + 1}</div><div class="sh"><h2>${esc(title)}</h2><span>${(L[k] || []).length} sections</span></div>` + (L[k] || []).map(sec => {
      const rows = (sec.rows || []).map(r => Array.isArray(r) ? `<tr><td>${esc(r[0])}</td><td>${esc(r.slice(1).join(' · '))}</td></tr>` : `<tr><td colspan="2">${esc(r)}</td></tr>`).join('');
      return `<div class="lb"><h3>${esc(sec.title)}</h3>${sec.note ? `<p class="note">${esc(sec.note)}</p>` : ''}${rows ? `<table>${rows}</table>` : ''}${(sec.ex || []).length ? `<div class="exs">${sec.ex.map(e => `<p><span class="tag">Example</span>${esc(e)}</p>`).join('')}</div>` : ''}</div>`;
    }).join('') + '</section>';
  });
  return h;
}

(async () => {
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html' : f.endsWith('.js') ? 'text/javascript' : 'application/octet-stream' }); r.end(d); } }); }).listen(0);
  const port = srv.address().port, b = await chromium.launch(), p = await b.newPage();
  await p.route(/fonts\.g/, r => r.abort());
  await p.goto(`http://localhost:${port}/a/ielts-studio/index.html`); await p.waitForTimeout(800);
  const { VOCAB, LANG, LOGO } = await p.evaluate(() => ({ VOCAB, LANG, LOGO }));
  fs.mkdirSync(OUT, { recursive: true });
  for (const [file, body, title] of [['ielts-vocabulary-bank.pdf', vocabHtml(VOCAB, LOGO), 'IELTS Vocabulary Bank'], ['ielts-writing-language-bank.pdf', langHtml(LANG, LOGO), 'IELTS Writing Language Bank']]) {
    const q = await b.newPage();
    await q.setContent(`<!doctype html><html><head><meta charset="utf-8"><title>${title} · IF Academy</title><style>${CSS}</style></head><body>${body}</body></html>`, { waitUntil: 'load' });
    await q.pdf({ path: path.join(OUT, file), format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font:8px Carlito,sans-serif;color:#8A93A8;padding:0 15mm;display:flex;justify-content:space-between"><span>${title} · Intellect First Academy</span><span class="pageNumber"></span></div>`, margin: { top: '16mm', bottom: '18mm', left: '15mm', right: '15mm' } });
    console.log(file, (fs.statSync(path.join(OUT, file)).size / 1024).toFixed(0) + ' KB');
    await q.close();
  }
  await b.close(); srv.close();
})();
