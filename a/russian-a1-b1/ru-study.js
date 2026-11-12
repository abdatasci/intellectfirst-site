/* IF Study — Quizlet-style solo vocabulary practice for IF Academy arenas.
   IFStudy.mount(el, {words:[{w,d,ru,dr}], key, ru, mode, title, tabs, onMode})
   Modes: cards, learn, write, spell, test, scramble, speed, gravity */
(function(){
if (window.IFStudy) return;
const KZL = /[a-zа-яёәғқңөұүһі]/i;

const MODES = [
  ['cards','Flashcards','Flip each card. Sort it: Know it or Still learning.'],
  ['learn','Learn','Multiple choice first, then typing, until you master every word.'],
  ['write','Write','Read the meaning. Type the word.'],
  ['spell','Spell','Listen to the word. Type what you hear.'],
  ['test','Test','A practice test with a score at the end.'],
  ['scramble','Scramble','Put the letters in the right order.'],
  ['speed','Speed Quiz','60 seconds. How many can you get right?'],
  ['gravity','Gravity','Type the word before the meaning hits the ground.'],
  ['room','Game Room','Blast, Treasure Hunt, Fishing, Race, Factory, Café and more.'],
  ['blast','Blast',''],['treasure','Treasure Hunt',''],['fishing','Fishing',''],['race','Race',''],['factory','Factory',''],['cafe','Café',''],['defense','Monster Defense',''],['boss','Boss Battle',''],['memory','Memory',''],['balloon','Balloon Pop',''],['search','Word Search','']
];
const NAME = Object.fromEntries(MODES.map(m => [m[0], m[1]]));

const CSS = `
.ifs{--s-bg:var(--card,var(--paper,#fff));--s-ink:var(--fg,var(--ink,#14213D));--s-line:var(--line,#D8E1EE);--s-muted:var(--muted,#5B6B82);--s-navy:#14213D;--s-gold:#C9A227;--s-ok:#2F8F6B;--s-bad:#B4533C;--s-soft:rgba(201,162,39,.14)}
.ifs-w{max-width:860px;margin:0 auto;color:var(--s-ink);font-size:17px}
.ifs-w *{box-sizing:border-box}
.ifs-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 14px;padding-bottom:12px;border-bottom:1px solid var(--s-line)}
.ifs-w .ifs-tab{padding:7px 13px;min-height:38px;font-size:14px}
.ifs-w .ifs-tab[aria-pressed="true"]{background:var(--s-navy);color:#fff;border-color:var(--s-gold)}
.ifs-title{font-family:Cambria,Georgia,serif;font-weight:800;font-size:22px;margin:0 0 2px;line-height:1.2}
.ifs-how{color:var(--s-muted);font-size:15px;margin:0 0 14px}
.ifs-w button{font:inherit;cursor:pointer;border-radius:999px;border:2px solid var(--s-line);background:var(--s-bg);color:var(--s-ink);padding:10px 18px;font-weight:700;min-height:44px;line-height:1.2}
.ifs-w button:disabled{opacity:.45;cursor:default}
.ifs-w button:focus-visible,.ifs-card:focus-visible,.ifs-w input:focus-visible{outline:3px solid var(--s-gold);outline-offset:2px}
.ifs-w .ifs-yes{background:var(--s-ok);border-color:var(--s-ok);color:#fff}
.ifs-w .ifs-no{background:transparent;border-color:#D9822B;color:#D9822B}
.ifs-w .ifs-gold{background:var(--s-gold);border-color:var(--s-gold);color:#14213D}
.ifs-w .ifs-navy{background:var(--s-navy);border-color:var(--s-navy);color:#fff}
.ifs-w .ifs-link{border:0;background:transparent;color:var(--s-muted);padding:8px 10px;font-weight:600}
.ifs-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:16px}
.ifs-row.big button{font-size:18px;padding:14px 26px;min-width:170px}
.ifs-stats{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;color:var(--s-muted);font-weight:700;font-size:15px;font-variant-numeric:tabular-nums;margin-bottom:10px}
.ifs-prog{display:flex;align-items:center;gap:12px;margin:4px 0 14px}
.ifs-bar{flex:1;height:10px;border-radius:99px;background:var(--s-line);overflow:hidden;display:flex}
.ifs-bar i{display:block;height:100%;background:var(--s-ok);transition:width .3s}
.ifs-bar i.f{background:var(--s-gold)}
.ifs-cnt{min-width:42px;text-align:center;border-radius:99px;padding:3px 10px;font-weight:800;font-size:15px;border:2px solid}
.ifs-cnt.l{color:#D9822B;border-color:#D9822B}.ifs-cnt.k{color:var(--s-ok);border-color:var(--s-ok)}
.ifs-note{background:var(--s-soft);border-left:4px solid var(--s-gold);border-radius:8px;padding:10px 14px;font-size:15px;margin:0 0 12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:space-between}
.ifs-card{perspective:1200px;height:clamp(240px,42vh,340px);cursor:pointer;margin:0 auto;max-width:700px;-webkit-tap-highlight-color:transparent}
.ifs-in{position:relative;width:100%;height:100%;transition:transform .45s;transform-style:preserve-3d}
.ifs-card.f .ifs-in{transform:rotateY(180deg)}
.ifs-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;overflow:auto;box-shadow:0 6px 22px rgba(20,33,61,.14)}
.ifs-front{background:var(--s-navy);color:#fff}
.ifs-back{background:#F3E7C9;color:#14213D;transform:rotateY(180deg);border:2px solid var(--s-gold)}
.ifs-face .t{font-family:Cambria,Georgia,serif;font-weight:800;font-size:clamp(32px,6vw,56px);line-height:1.1;overflow-wrap:anywhere}
.ifs-face .d{font-size:clamp(19px,2.8vw,26px);font-weight:700;line-height:1.35}
.ifs-face .ru{margin-top:12px;padding-top:10px;border-top:2px solid rgba(20,33,61,.22);font-size:clamp(18px,2.6vw,24px);font-weight:700;color:#14213D}
.ifs-front .ru{color:#E7CF7A;border-color:rgba(255,255,255,.25)}
.ifs-face .dr{margin-top:4px;font-size:clamp(14px,2vw,17px);opacity:.8;font-weight:600}
.ifs-face .tap{position:absolute;bottom:10px;left:0;right:0;font-size:12px;letter-spacing:.08em;opacity:.55;font-weight:700}
.ifs-cardbar{display:flex;justify-content:space-between;align-items:center;max-width:700px;margin:8px auto 0;color:var(--s-muted);font-weight:700;font-size:15px}
.ifs-keys{text-align:center;color:var(--s-muted);font-size:13px;margin:12px 0 0}
.ifs-tools{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin-top:8px}
.ifs-q{font-size:clamp(20px,3vw,27px);font-weight:700;text-align:center;max-width:740px;margin:10px auto 6px;line-height:1.35;text-wrap:balance}
.ifs-q.word{font-family:Cambria,Georgia,serif;font-size:clamp(30px,5vw,46px);font-weight:800}
.ifs-sub{text-align:center;color:var(--s-muted);font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-top:6px}
.ifs-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:760px;margin:16px auto 0}
.ifs-w .ifs-opts button{border-radius:14px;padding:16px;font-size:18px;text-align:left;display:flex;gap:10px;align-items:flex-start;min-height:64px}
.ifs-opts button .n{flex:none;width:26px;height:26px;border-radius:50%;border:2px solid var(--s-line);display:grid;place-items:center;font-size:13px;color:var(--s-muted)}
.ifs-w .ifs-opts button.right{background:var(--s-ok);border-color:var(--s-ok);color:#fff}
.ifs-w .ifs-opts button.wrong{background:var(--s-bad);border-color:var(--s-bad);color:#fff}
.ifs-opts button.right .n,.ifs-opts button.wrong .n{color:#fff;border-color:#fff}
.ifs-type{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px}
.ifs-w .ifs-type input{font:inherit;font-size:21px;padding:12px 16px;border-radius:12px;border:2px solid var(--s-line);background:var(--s-bg);color:var(--s-ink);width:min(460px,100%)}
.ifs-w .ifs-type input.bad{border-color:var(--s-bad)}
.ifs-hintline{text-align:center;font-family:Consolas,Menlo,monospace;letter-spacing:.25em;font-size:20px;color:var(--s-muted);margin-top:10px;min-height:26px}
.ifs-fb{max-width:740px;margin:16px auto 0;border-radius:14px;padding:14px 18px;border:2px solid}
.ifs-fb.ok{border-color:var(--s-ok);background:rgba(47,143,107,.1)}
.ifs-fb.no{border-color:var(--s-bad);background:rgba(180,83,60,.1)}
.ifs-fb .h{font-weight:800;margin-bottom:4px}
.ifs-fb.ok .h{color:var(--s-ok)}.ifs-fb.no .h{color:var(--s-bad)}
.ifs-fb .aw{font-family:Cambria,Georgia,serif;font-weight:800;font-size:26px}
.ifs-fb .ru{font-weight:700;margin-top:4px}
.ifs-fb .dr{font-size:15px;color:var(--s-muted)}
.ifs-fb .yours{font-size:15px;color:var(--s-muted);margin-top:4px}
.ifs-diff b{color:var(--s-bad);text-decoration:underline}
.ifs-big{font-family:Cambria,Georgia,serif;font-weight:800;font-size:clamp(40px,7vw,64px);text-align:center;margin:10px 0 0;line-height:1.1}
.ifs-center{text-align:center}
.ifs-lv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;max-width:560px;margin:14px auto}
.ifs-lv div{border:2px solid var(--s-line);border-radius:12px;padding:10px;text-align:center}
.ifs-lv b{display:block;font-family:Cambria,Georgia,serif;font-size:30px}
.ifs-lv small{color:var(--s-muted);font-weight:700;font-size:13px}
.ifs-lv .m{border-color:var(--s-ok)}.ifs-lv .m b{color:var(--s-ok)}
.ifs-lv .fa{border-color:var(--s-gold)}.ifs-lv .fa b{color:#A9861B}
.ifs-list{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0}
.ifs-list span{border-radius:99px;padding:5px 12px;font-size:15px;border:2px solid var(--s-line);font-weight:700}
.ifs-list span.m{border-color:var(--s-ok);color:var(--s-ok)}.ifs-list span.fa{border-color:var(--s-gold);color:#A9861B}.ifs-list span.nw{color:var(--s-muted)}
.ifs-list span.x{border-color:var(--s-bad);color:var(--s-bad)}
.ifs-test{display:flex;flex-direction:column;gap:14px;margin-top:10px}
.ifs-tq{border:1px solid var(--s-line);border-radius:14px;padding:14px 16px;background:var(--s-bg)}
.ifs-tq .num{font-size:13px;font-weight:800;color:var(--s-muted);letter-spacing:.06em;text-transform:uppercase}
.ifs-tq .p{font-size:19px;font-weight:700;margin:6px 0 10px;line-height:1.35}
.ifs-tq .p em{font-style:normal;font-family:Cambria,Georgia,serif;font-size:23px}
.ifs-tq .ch{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.ifs-w .ifs-tq .ch button{border-radius:10px;text-align:left;font-weight:600;padding:10px 12px}
.ifs-w .ifs-tq .ch button[aria-pressed="true"]{border-color:var(--s-navy);background:var(--s-soft)}
.ifs-w .ifs-tq .ch button.right{border-color:var(--s-ok);background:rgba(47,143,107,.14)}
.ifs-w .ifs-tq .ch button.wrong{border-color:var(--s-bad);background:rgba(180,83,60,.14)}
.ifs-w .ifs-tq input{font:inherit;font-size:19px;padding:10px 12px;border-radius:10px;border:2px solid var(--s-line);background:var(--s-bg);color:var(--s-ink);width:min(420px,100%)}
.ifs-tq.ok{border-color:var(--s-ok);box-shadow:inset 4px 0 0 var(--s-ok)}
.ifs-tq.no{border-color:var(--s-bad);box-shadow:inset 4px 0 0 var(--s-bad)}
.ifs-tq .fix{margin-top:8px;font-size:15px;color:var(--s-bad);font-weight:700}
.ifs-set{display:flex;flex-direction:column;gap:14px;max-width:560px;margin:0 auto}
.ifs-set label{font-weight:800;font-size:14px;color:var(--s-muted);letter-spacing:.04em;display:block;margin-bottom:6px}
.ifs-w .ifs-set button[aria-pressed="true"]{background:var(--s-navy);color:#fff;border-color:var(--s-gold)}
.ifs-slots{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:18px auto 6px;max-width:760px}
.ifs-slots .gap{width:18px}
.ifs-slots .fx{width:20px;display:grid;place-items:center;font-size:24px;font-weight:800}
.ifs-w .ifs-slots button{width:46px;height:54px;min-height:0;padding:0;border-radius:10px;font-size:24px;font-family:Cambria,Georgia,serif;font-weight:800;border-style:dashed}
.ifs-w .ifs-slots button.fill{border-style:solid;border-color:var(--s-navy)}
.ifs-w .ifs-slots button.bad{border-color:var(--s-bad);color:var(--s-bad);animation:ifsShake .3s}
.ifs-w .ifs-slots button.good{border-color:var(--s-ok);background:var(--s-ok);color:#fff}
.ifs-tiles{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:14px auto;max-width:760px}
.ifs-w .ifs-tiles button{width:50px;height:54px;min-height:0;padding:0;border-radius:10px;font-size:24px;font-family:Cambria,Georgia,serif;font-weight:800;background:var(--s-navy);color:#fff;border-color:var(--s-navy)}
.ifs-w .ifs-tiles button.used{visibility:hidden}
@keyframes ifsShake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.ifs-timer{font-family:Cambria,Georgia,serif;font-weight:800;font-size:44px;text-align:center;font-variant-numeric:tabular-nums}
.ifs-timer.low{color:var(--s-bad)}
.ifs-sky{position:relative;height:340px;border-radius:14px;overflow:hidden;background:linear-gradient(180deg,#0E1730 0%,#1B2B57 100%);margin-top:10px}
.ifs-sky .ground{position:absolute;left:0;right:0;bottom:0;height:8px;background:var(--s-bad)}
.ifs-rock{position:absolute;left:50%;transform:translateX(-50%);width:min(520px,88%);background:var(--s-gold);color:#14213D;border-radius:16px;padding:12px 16px;font-weight:800;text-align:center;font-size:18px;box-shadow:0 6px 20px rgba(0,0,0,.35)}
.ifs-rock small{display:block;font-weight:700;opacity:.75;letter-spacing:.2em;margin-top:4px}
.ifs-sky .msg{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:16px;gap:8px}
@media (max-width:640px){.ifs-opts,.ifs-tq .ch{grid-template-columns:1fr}.ifs-row.big button{min-width:0;flex:1}.ifs-w .ifs-slots button{width:38px;height:46px;font-size:20px}.ifs-w .ifs-tiles button{width:42px;height:48px;font-size:20px}}
@media (prefers-reduced-motion:reduce){.ifs-in,.ifs-bar i{transition:none}}
`;
function css(){ if (document.getElementById('ifs-style')) return; const s = document.createElement('style'); s.id = 'ifs-style'; s.textContent = CSS; document.head.appendChild(s); }

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const LS = {
  get(k, d){ try { const v = localStorage.getItem('kzstudy:' + k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem('kzstudy:' + k, JSON.stringify(v)); } catch(e){} },
  del(k){ try { localStorage.removeItem('kzstudy:' + k); } catch(e){} }
};
const norm = s => String(s || '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”"]/g, '').replace(/[.,!?;:…]/g, '').replace(/[-‐–—_]+/g, ' ').replace(/\s+/g, ' ').trim();
const strip = s => s.replace(/^(to|a|an|the) /, '');
function accepted(w){
  const out = new Set([norm(w)]);
  String(w).split(/\s*\/\s*/).forEach(p => {
    [norm(p), norm(p.replace(/\([^)]*\)/g, '')), norm(p.replace(/[()]/g, '')), norm(p.replace(/\b(sb|sth|somebody|something|someone)\b/gi, ''))]
      .forEach(x => { if (x){ out.add(x); out.add(strip(x)); } });
  });
  return out;
}
function isRight(ans, w){ const n = norm(ans); if (!n) return false; const acc = accepted(w); return acc.has(n) || acc.has(strip(n)); }
const main = w => String(w).split(/\s*\/\s*/)[0];
function hintOf(w, k){ let shown = 0; return main(w).split('').map(ch => { if (/[\s'’\-()]/.test(ch)) return ch === ' ' ? ' ' : ch; return shown++ < k ? ch : '_'; }).join(''); }

/* Speech */
const TTS = { ok:true, say(t, rate){ try { return window.KZSAY ? window.KZSAY(String(t), rate) : false; } catch(e){ return false; } } };

let C = null;
const $ = s => C.el.querySelector(s);
function report(score, total, label){ try { if (window.IFResults) window.IFResults.report({score, total, label}); } catch(e){} }
function stop(){ if (C){ clearInterval(C.iv); clearTimeout(C.to); cancelAnimationFrame(C.raf); C.iv = C.to = C.raf = null; (C.tos || []).forEach(clearTimeout); (C.ivs || []).forEach(clearInterval); C.tos = []; C.ivs = []; Object.values(C.s || {}).forEach(v => { if (v && v.timer) v.timer = null; }); } try { window.KZSTOP && window.KZSTOP(); } catch(e){} }
function mount(el, o){
  css(); stop();
  const words = (o.words || []).filter(x => x && x.w && x.d);
  C = { el, words, key:o.key || 'all', ru:!!o.ru, mode:NAME[o.mode] ? o.mode : 'cards', title:o.title || '', tabs:!!o.tabs, onMode:o.onMode, s:{}, tos:[], ivs:[] };
  el.classList.add('ifs'); render();
}
function go(m){ if (!C || !NAME[m]) return; stop(); C.mode = m; C.s = {}; if (C.onMode) try { C.onMode(m); } catch(e){} render(); }
function alive(){ return C && C.el && document.body.contains(C.el) && C.el.offsetParent !== null; }
function render(){
  if (!C) return;
  if (C.words.length < 2){ C.el.innerHTML = '<div class="ifs-w"><p class="ifs-how">Choose a lesson with at least 2 words.</p></div>'; return; }
  ({cards, learn, write, spell, test, scramble, speed, gravity, room, blast, treasure, fishing, race, factory, cafe, defense, boss, memory, balloon, search})[C.mode]();
}
function shell(how, body){
  const tabs = C.tabs ? `<div class="ifs-tabs" role="group" aria-label="Study modes">${MODES.filter(m => m[2]).map(m => `<button type="button" class="ifs-tab" data-go="${m[0]}" aria-pressed="${m[0] === C.mode}">${m[1]}</button>`).join('')}</div>` : '';
  C.el.innerHTML = `<div class="ifs-w">${tabs}<div class="ifs-title">${esc(NAME[C.mode])}${C.title ? ' · ' + esc(C.title) : ''}</div><p class="ifs-how">${how}</p>${body}</div>`;
  C.el.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
}
function ruHTML(x){ if (!C.ru || !x.ru) return ''; return `<div class="ru" lang="ru">${esc(x.ru)}</div>` + (x.dr ? `<div class="dr" lang="ru">${esc(x.dr)}</div>` : ''); }
function reveal(x, ok, yours){
  return `<div class="ifs-fb ${ok ? 'ok' : 'no'}" role="status"><div class="h">${ok ? 'Correct!' : 'Not quite. The answer is:'}</div><div class="aw">${esc(x.w)}</div><div>${esc(x.d)}</div>${ruHTML(x)}${yours ? `<div class="yours">You wrote: ${esc(yours)}</div>` : ''}</div>`;
}
function mcqOpts(x, field){ const others = shuf(C.words.filter(y => y !== x && norm(y[field]) !== norm(x[field]))).slice(0, 3); return shuf([x].concat(others)); }

/* ---------- Flashcards (Know it / Still learning) ---------- */
function cardsInit(){
  const saved = LS.get('cards:' + C.key, {known:[]});
  const known = new Set((saved.known || []).filter(w => C.words.some(x => x.w === w)));
  let deck = C.words.filter(x => !known.has(x.w)), note = '';
  if (!deck.length){ deck = C.words.slice(); known.clear(); }
  else if (known.size) note = `You already know ${known.size} of these ${C.words.length} words, so you are studying the other ${deck.length}.`;
  return { deck, i:0, known, learning:new Set(), hist:[], front:LS.get('front', 'term'), flip:false, note, round:1, done:false };
}
function cardsSave(S){ LS.set('cards:' + C.key, {known:[...S.known]}); }
function cards(){
  const S = C.s.cards || (C.s.cards = cardsInit());
  const total = C.words.length, kRound = S.deck.slice(0, S.i).filter(x => S.known.has(x.w)).length, lRound = S.learning.size;
  if (S.done){
    const left = S.deck.filter(x => S.learning.has(x.w));
    const all = S.known.size >= total;
    if (all) report(total, total, 'Flashcards');
    shell('Your progress is saved on this device.', `
      <div class="ifs-big">${all ? 'You know all ' + total + ' words!' : 'Round ' + S.round + ' done'}</div>
      <div class="ifs-lv" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="m"><b>${S.known.size}</b><small>KNOW IT</small></div><div class="fa"><b>${total - S.known.size}</b><small>STILL LEARNING</small></div></div>
      ${left.length ? `<div class="ifs-list">${left.map(x => `<span class="fa">${esc(x.w)}</span>`).join('')}</div>` : ''}
      <div class="ifs-row big">${left.length ? `<button type="button" class="ifs-gold" id="kr">Keep reviewing ${left.length} card${left.length > 1 ? 's' : ''}</button>` : ''}
      <button type="button" class="ifs-navy" data-go="learn">Practise with Learn</button><button type="button" id="ra">Restart all cards</button></div>`);
    const kr = $('#kr'); if (kr) kr.onclick = () => { S.deck = shuf(left); S.i = 0; S.learning = new Set(); S.hist = []; S.round++; S.done = false; S.flip = false; S.note = ''; cards(); };
    $('#ra').onclick = () => { S.known.clear(); cardsSave(S); C.s.cards = null; cards(); };
    return;
  }
  const x = S.deck[S.i];
  const termFace = `<div class="t">${esc(x.w)}</div>`, defFace = `<div class="d">${esc(x.d)}</div>${ruHTML(x)}`;
  const fFront = S.front === 'term' ? termFace : defFace, fBack = S.front === 'term' ? defFace : termFace;
  shell('Tap the card to flip it. Be honest: choose <b>Know it</b> only if you knew the answer before you flipped.', `
    ${S.note ? `<div class="ifs-note"><span>${esc(S.note)}</span><button type="button" class="ifs-link" id="all">Study all ${total}</button></div>` : ''}
    <div class="ifs-prog"><span class="ifs-cnt l" title="Still learning">${lRound}</span><div class="ifs-bar" aria-label="Progress"><i style="width:${(S.i / S.deck.length) * 100}%"></i></div><span class="ifs-cnt k" title="Know it">${kRound}</span></div>
    <div class="ifs-card ${S.flip ? 'f' : ''}" id="card" tabindex="0" role="button" aria-label="Flashcard. Press to flip.">
      <div class="ifs-in"><div class="ifs-face ifs-front">${fFront}<div class="tap">TAP TO FLIP</div></div><div class="ifs-face ifs-back">${fBack}</div></div></div>
    <div class="ifs-cardbar"><button type="button" class="ifs-link" id="say" ${TTS.ok ? '' : 'hidden'} aria-label="Listen">🔊 Listen</button><span>${S.i + 1} / ${S.deck.length}</span><button type="button" class="ifs-link" id="undo" ${S.hist.length ? '' : 'disabled'}>↶ Undo</button></div>
    <div class="ifs-row big"><button type="button" class="ifs-no" id="nl">✗ Still learning</button><button type="button" class="ifs-yes" id="kn">✓ Know it</button></div>
    <div class="ifs-tools"><button type="button" class="ifs-link" id="sh">⇄ Shuffle</button><button type="button" class="ifs-link" id="fr">${S.front === 'term' ? 'Show meaning first' : 'Show word first'}</button><button type="button" class="ifs-link" id="rs">Reset progress</button></div>
    <p class="ifs-keys">Space = flip · ← Still learning · → Know it · Z = undo</p>`);
  const card = $('#card'); card.onclick = () => { S.flip = !S.flip; card.classList.toggle('f', S.flip); };
  const mark = knew => { S.hist.push({w:x.w, k:S.known.has(x.w), l:S.learning.has(x.w)}); if (knew){ S.known.add(x.w); S.learning.delete(x.w); } else { S.learning.add(x.w); S.known.delete(x.w); } cardsSave(S); S.i++; S.flip = false; if (S.i >= S.deck.length) S.done = true; cards(); };
  $('#kn').onclick = () => mark(true); $('#nl').onclick = () => mark(false);
  $('#undo').onclick = () => { const h = S.hist.pop(); if (!h) return; S.i--; h.k ? S.known.add(h.w) : S.known.delete(h.w); h.l ? S.learning.add(h.w) : S.learning.delete(h.w); cardsSave(S); S.flip = false; cards(); };
  $('#sh').onclick = () => { S.deck = S.deck.slice(0, S.i).concat(shuf(S.deck.slice(S.i))); S.flip = false; cards(); };
  $('#fr').onclick = () => { S.front = S.front === 'term' ? 'def' : 'term'; LS.set('front', S.front); S.flip = false; cards(); };
  $('#rs').onclick = () => { S.known.clear(); cardsSave(S); C.s.cards = null; cards(); };
  $('#say').onclick = e => { e.stopPropagation(); TTS.say(main(x.w)); };
  const all = $('#all'); if (all) all.onclick = () => { S.deck = shuf(C.words); S.i = 0; S.note = ''; S.learning = new Set(); S.hist = []; cards(); };
  C.keys = e => { if (e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); card.click(); } else if (e.key === 'ArrowRight'){ e.preventDefault(); mark(true); } else if (e.key === 'ArrowLeft'){ e.preventDefault(); mark(false); } else if (e.key === 'z' || e.key === 'Z'){ $('#undo').click(); } };
}

/* ---------- Learn (adaptive: multiple choice → typing → mastered) ---------- */
function learnInit(){ const lv = LS.get('learn:' + C.key, {}), m = {}; C.words.forEach(x => m[x.w] = Math.min(2, lv[x.w] || 0)); const S = {lv:m, rn:0, phase:'q'}; learnRound(S); return S; }
function learnSave(S){ LS.set('learn:' + C.key, S.lv); }
function learnRound(S){
  const pend = C.words.filter(x => S.lv[x.w] < 2);
  if (!pend.length){ S.phase = 'end'; return; }
  const pick = shuf(pend).sort((a, b) => S.lv[b.w] - S.lv[a.w]).slice(0, 7);
  S.rn++; S.round = {items:shuf(pick), queue:null, right:0, wrong:0}; S.round.queue = S.round.items.slice(); learnNext(S);
}
function learnNext(S){
  if (!S.round.queue.length){ S.phase = 'sum'; return; }
  const x = S.round.queue.shift(), lvl = S.lv[x.w];
  const type = lvl === 0 ? 'mc' : 'write', dir = type === 'mc' && Math.random() < 0.3 ? 'w2d' : 'd2w';
  S.q = {x, type, dir, opts: type === 'mc' ? mcqOpts(x, dir === 'd2w' ? 'w' : 'd') : null, hint:0, prev:lvl};
  S.phase = 'q'; S.fb = null;
}
function learnCounts(S){ let n = 0, f = 0, m = 0; C.words.forEach(x => { const v = S.lv[x.w]; v >= 2 ? m++ : v === 1 ? f++ : n++; }); return {n, f, m}; }
function learn(){
  const S = C.s.learn || (C.s.learn = learnInit()), total = C.words.length, ct = learnCounts(S);
  const lvBox = `<div class="ifs-lv"><div><b>${ct.n}</b><small>NEW</small></div><div class="fa"><b>${ct.f}</b><small>FAMILIAR</small></div><div class="m"><b>${ct.m}</b><small>MASTERED</small></div></div>`;
  const prog = `<div class="ifs-prog"><div class="ifs-bar" aria-label="${ct.m} of ${total} mastered"><i style="width:${ct.m / total * 100}%"></i><i class="f" style="width:${ct.f / total * 100}%"></i></div><span style="font-weight:800;color:var(--s-muted);font-size:15px">${ct.m} / ${total}</span></div>`;
  const how = 'Each word starts with multiple choice. Answer it correctly and next time you type it. Get both right and the word is <b>mastered</b>. A mistake sends it back to the start.';
  if (S.phase === 'end'){
    report(total, total, 'Learn');
    shell(how, `<div class="ifs-big">All ${total} words mastered!</div>${lvBox}<div class="ifs-row big"><button type="button" class="ifs-gold" data-go="test">Take a test</button><button type="button" id="again">Learn again from the start</button></div>`);
    $('#again').onclick = () => { LS.del('learn:' + C.key); C.s.learn = null; learn(); };
    return;
  }
  if (S.phase === 'sum'){
    shell(how, `${prog}<div class="ifs-big" style="font-size:36px">Round ${S.rn} done</div><p class="ifs-center ifs-how">${S.round.right} right · ${S.round.wrong} mistakes</p>${lvBox}
      <div class="ifs-list">${S.round.items.map(x => { const v = S.lv[x.w]; return `<span class="${v >= 2 ? 'm' : v === 1 ? 'fa' : 'nw'}">${v >= 2 ? '✓ ' : ''}${esc(x.w)}</span>`; }).join('')}</div>
      <div class="ifs-row big"><button type="button" class="ifs-gold" id="cont">Continue</button></div><div class="ifs-tools"><button type="button" class="ifs-link" id="rs">Reset progress</button></div>`);
    $('#cont').onclick = () => { learnRound(S); learn(); }; $('#cont').focus();
    $('#rs').onclick = () => { LS.del('learn:' + C.key); C.s.learn = null; learn(); };
    C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); $('#cont').click(); } };
    return;
  }
  const q = S.q, x = q.x, stat = `<div class="ifs-stats"><span>Round ${S.rn}</span><span>Question ${S.round.items.length - S.round.queue.length} of ${S.round.items.length}${S.round.wrong ? ' (+ retries)' : ''}</span></div>`;
  const answer = (ok, given) => {
    if (ok){ S.lv[x.w] = Math.min(2, q.prev + 1); S.round.right++; } else { S.lv[x.w] = 0; S.round.wrong++; S.round.queue.push(x); }
    learnSave(S); S.phase = 'fb'; S.fb = {ok, given}; learn();
  };
  if (q.type === 'mc'){
    const field = q.dir === 'd2w' ? 'w' : 'd';
    shell(how, `${prog}${stat}<div class="ifs-sub">${q.dir === 'd2w' ? 'Choose the word' : 'Choose the meaning'}</div><div class="ifs-q ${q.dir === 'w2d' ? 'word' : ''}">${esc(q.dir === 'd2w' ? x.d : x.w)}</div>
      <div class="ifs-opts">${q.opts.map((o, i) => `<button type="button" data-i="${i}"><span class="n">${i + 1}</span><span>${esc(o[field])}</span></button>`).join('')}</div>
      <div id="fbx"></div><p class="ifs-keys">Press 1–4 to answer · Enter to continue</p>`);
    const btns = C.el.querySelectorAll('.ifs-opts button');
    if (S.phase === 'fb'){
      btns.forEach((b, i) => { b.disabled = true; if (q.opts[i] === x) b.classList.add('right'); else if (q.opts[i] === S.fb.given) b.classList.add('wrong'); });
      if (S.fb.ok){ C.to = setTimeout(() => { learnNext(S); learn(); }, 800); C.keys = e => { if (e.key === 'Enter'){ clearTimeout(C.to); learnNext(S); learn(); } }; return; }
      $('#fbx').innerHTML = reveal(x, false) + `<div class="ifs-row"><button type="button" class="ifs-gold" id="cont">Continue</button></div>`;
      $('#cont').onclick = () => { learnNext(S); learn(); }; $('#cont').focus();
      C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); $('#cont').click(); } };
      return;
    }
    btns.forEach((b, i) => b.onclick = () => answer(q.opts[i] === x, q.opts[i]));
    C.keys = e => { const n = +e.key; if (n >= 1 && n <= q.opts.length){ e.preventDefault(); btns[n - 1].click(); } };
    return;
  }
  // written
  shell(how, `${prog}${stat}<div class="ifs-sub">Type the word</div><div class="ifs-q">${esc(x.d)}</div>
    ${S.phase === 'q' ? `<div class="ifs-hintline" aria-live="polite">${q.hint ? esc(hintOf(x.w, q.hint)) : ''}</div>
    <form class="ifs-type" id="tf" autocomplete="off"><input id="ans" aria-label="Your answer" placeholder="Type the word…" autocapitalize="off" spellcheck="false"><button type="submit" class="ifs-gold">Check</button></form>
    <div class="ifs-tools"><button type="button" class="ifs-link" id="hint">Hint: show a letter</button>${C.ru && x.ru ? '<button type="button" class="ifs-link" id="rh">Russian hint</button>' : ''}<button type="button" class="ifs-link" id="dk">I don’t know</button></div><div id="rhx" class="ifs-center" lang="ru" style="font-weight:700;margin-top:6px"></div>` : '<div id="fbx"></div>'}`);
  if (S.phase === 'fb'){
    const fb = S.fb;
    $('#fbx').innerHTML = reveal(x, fb.ok, fb.ok ? '' : fb.given) + `<div class="ifs-row">${!fb.ok && fb.given ? '<button type="button" id="ovr">I was right (typo)</button>' : ''}<button type="button" class="ifs-gold" id="cont">Continue</button></div>`;
    const cont = () => { learnNext(S); learn(); };
    $('#cont').onclick = cont; $('#cont').focus();
    const ovr = $('#ovr'); if (ovr) ovr.onclick = () => { S.lv[x.w] = Math.min(2, q.prev + 1); S.round.wrong--; S.round.right++; const k = S.round.queue.lastIndexOf(x); if (k >= 0) S.round.queue.splice(k, 1); learnSave(S); cont(); };
    C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); cont(); } };
    return;
  }
  const inp = $('#ans'); inp.focus();
  $('#tf').onsubmit = e => { e.preventDefault(); if (!inp.value.trim()) return; answer(isRight(inp.value, x.w), inp.value.trim()); };
  $('#hint').onclick = () => { q.hint = Math.min(main(x.w).replace(/[^A-Za-zА-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі]/g, '').length, q.hint + 1); C.el.querySelector('.ifs-hintline').textContent = hintOf(x.w, q.hint); inp.focus(); };
  const rh = $('#rh'); if (rh) rh.onclick = () => { $('#rhx').textContent = x.ru; inp.focus(); };
  $('#dk').onclick = () => answer(false, '');
  C.keys = null;
}

/* ---------- Write and Spell (shared engine) ---------- */
function typedInit(){ return {deck:shuf(C.words), i:0, first:0, missed:[], round:1, phase:'q', fb:null, hint:0, total:C.words.length, showDef:false}; }
function typed(kind){
  const S = C.s[kind] || (C.s[kind] = typedInit());
  const spell = kind === 'spell';
  const how = spell ? 'Listen and type the word you hear. Press 🔊 to hear it again, or 🐢 to hear it slowly.' : 'Read the meaning and type the Russian word. Spelling counts! Capital letters don’t.';
  if (spell && !TTS.ok){ shell(how, `<div class="ifs-note"><span>This browser can’t play audio, so Spell won’t work here. Try Write instead.</span><button type="button" class="ifs-gold" data-go="write">Open Write</button></div>`); return; }
  if (S.phase === 'end'){
    const label = spell ? 'Spell' : 'Write';
    if (!S.missed.length){
      report(S.first, S.total, label);
      shell(how, `<div class="ifs-big">${S.first} / ${S.total}</div><p class="ifs-center ifs-how">right the first time${S.round > 1 ? ` · every word correct after ${S.round} rounds` : ''}</p>
        <div class="ifs-row big"><button type="button" class="ifs-gold" id="again">Play again</button><button type="button" data-go="test">Take a test</button></div>`);
      $('#again').onclick = () => { C.s[kind] = null; typed(kind); };
      return;
    }
    shell(how, `<div class="ifs-big" style="font-size:36px">Round ${S.round}: ${S.deck.length - S.missed.length} / ${S.deck.length}</div><p class="ifs-center ifs-how">Try again with the ${S.missed.length} word${S.missed.length > 1 ? 's' : ''} you missed.</p>
      <div class="ifs-list">${S.missed.map(x => `<span class="x">${esc(x.w)}</span>`).join('')}</div>
      <div class="ifs-row big"><button type="button" class="ifs-gold" id="retry">Retry missed words</button><button type="button" id="again">Start again</button></div>`);
    $('#retry').onclick = () => { S.deck = shuf(S.missed); S.missed = []; S.i = 0; S.round++; S.phase = 'q'; typed(kind); };
    $('#again').onclick = () => { C.s[kind] = null; typed(kind); };
    C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); $('#retry').click(); } };
    return;
  }
  const x = S.deck[S.i];
  const stat = `<div class="ifs-stats"><span>${S.round > 1 ? 'Retry round ' + S.round + ' · ' : ''}Word ${S.i + 1} / ${S.deck.length}</span><span>Right first time: ${S.first} / ${S.total}</span></div>`;
  const prompt = spell
    ? `<div class="ifs-row big" style="margin-top:6px"><button type="button" class="ifs-navy" id="say">🔊 Listen</button><button type="button" id="slow">🐢 Slowly</button></div>
       <div class="ifs-q" id="defl" style="font-size:19px;color:var(--s-muted)">${S.showDef || S.phase === 'fb' ? esc(x.d) : ''}</div>`
    : `<div class="ifs-sub">Type the word</div><div class="ifs-q">${esc(x.d)}</div>`;
  const next = () => { S.i++; S.hint = 0; S.showDef = false; S.phase = S.i >= S.deck.length ? 'end' : 'q'; typed(kind); };
  if (S.phase === 'fb'){
    const fb = S.fb;
    shell(how, `${stat}${prompt}${spell && !fb.ok && fb.given ? `<div class="ifs-center ifs-diff" style="font-size:22px;margin-top:8px">Your spelling: ${diff(fb.given, main(x.w))}</div>` : ''}${reveal(x, fb.ok, fb.ok || spell ? '' : fb.given)}
      <div class="ifs-row">${!fb.ok && fb.given ? '<button type="button" id="ovr">I was right (typo)</button>' : ''}<button type="button" class="ifs-gold" id="cont">Continue</button></div>`);
    if (spell){ $('#say').onclick = () => TTS.say(main(x.w)); $('#slow').onclick = () => TTS.say(main(x.w), 0.55); }
    if (fb.ok){ C.to = setTimeout(next, 900); }
    $('#cont').onclick = () => { clearTimeout(C.to); next(); }; $('#cont').focus();
    const ovr = $('#ovr'); if (ovr) ovr.onclick = () => { S.missed.pop(); if (S.round === 1 && !S.hint) S.first++; next(); };
    C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); $('#cont').click(); } };
    return;
  }
  shell(how, `${stat}${prompt}<div class="ifs-hintline" aria-live="polite">${S.hint ? esc(hintOf(x.w, S.hint)) : ''}</div>
    <form class="ifs-type" id="tf" autocomplete="off"><input id="ans" aria-label="Your answer" placeholder="Type the word…" autocapitalize="off" autocorrect="off" spellcheck="false"><button type="submit" class="ifs-gold">Check</button></form>
    <div class="ifs-tools"><button type="button" class="ifs-link" id="hint">Hint: show a letter</button>${spell ? `<button type="button" class="ifs-link" id="sd">${S.showDef ? 'Hide' : 'Show'} the meaning</button>` : ''}${C.ru && x.ru && !spell ? '<button type="button" class="ifs-link" id="rh">Russian hint</button>' : ''}<button type="button" class="ifs-link" id="dk">I don’t know</button></div>
    <div id="rhx" class="ifs-center" lang="ru" style="font-weight:700;margin-top:6px"></div>`);
  const inp = $('#ans'); inp.focus();
  if (spell){ $('#say').onclick = () => { TTS.say(main(x.w)); inp.focus(); }; $('#slow').onclick = () => { TTS.say(main(x.w), 0.55); inp.focus(); };
    $('#sd').onclick = () => { S.showDef = !S.showDef; $('#defl').textContent = S.showDef ? x.d : ''; $('#sd').textContent = (S.showDef ? 'Hide' : 'Show') + ' the meaning'; inp.focus(); };
    if (!S.spoken || S.spoken !== x){ S.spoken = x; setTimeout(() => TTS.say(main(x.w)), 250); } }
  const check = (given) => { const ok = isRight(given, x.w); if (ok){ if (S.round === 1 && !S.hint) S.first++; } else S.missed.push(x); S.fb = {ok, given}; S.phase = 'fb'; typed(kind); };
  $('#tf').onsubmit = e => { e.preventDefault(); if (!inp.value.trim()) return; check(inp.value.trim()); };
  $('#hint').onclick = () => { S.hint = Math.min(main(x.w).length, S.hint + 1); C.el.querySelector('.ifs-hintline').textContent = hintOf(x.w, S.hint); inp.focus(); };
  const rh = $('#rh'); if (rh) rh.onclick = () => { $('#rhx').textContent = x.ru; inp.focus(); };
  $('#dk').onclick = () => check('');
  C.keys = null;
}
function diff(given, target){ const g = String(given).toLowerCase(), t = String(target).toLowerCase(); let out = ''; const n = Math.max(g.length, t.length); for (let i = 0; i < n; i++){ const c = g[i]; if (c === undefined){ out += '<b>_</b>'; continue; } out += c === t[i] ? esc(c) : `<b>${esc(c)}</b>`; } return out; }
function write(){ typed('write'); }
function spell(){ typed('spell'); }

/* ---------- Test ---------- */
function test(){
  const S = C.s.test || (C.s.test = {phase:'set', n:Math.min(20, C.words.length), types:{mc:true, tf:true, wr:true}});
  const how = 'Answer every question, then press <b>Submit</b> to see your score and corrections.';
  if (S.phase === 'set'){
    const counts = [10, 20, 30].filter(n => n < C.words.length).concat([C.words.length]);
    shell(how, `<div class="ifs-set">
      <div><label>NUMBER OF QUESTIONS</label><div class="ifs-row" style="justify-content:flex-start;margin:0">${counts.map(n => `<button type="button" data-n="${n}" aria-pressed="${S.n === n}">${n === C.words.length ? 'All ' + n : n}</button>`).join('')}</div></div>
      <div><label>QUESTION TYPES</label><div class="ifs-row" style="justify-content:flex-start;margin:0">${[['mc', 'Multiple choice'], ['tf', 'True / False'], ['wr', 'Written']].map(([k, l]) => `<button type="button" data-t="${k}" aria-pressed="${S.types[k]}">${l}</button>`).join('')}</div></div>
      <div class="ifs-row big" style="justify-content:flex-start"><button type="button" class="ifs-gold" id="start">Start the test</button></div></div>`);
    C.el.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { S.n = +b.dataset.n; test(); });
    C.el.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { const k = b.dataset.t; S.types[k] = !S.types[k]; if (!Object.values(S.types).some(Boolean)) S.types[k] = true; test(); });
    $('#start').onclick = () => {
      const kinds = Object.keys(S.types).filter(k => S.types[k]);
      S.qs = shuf(C.words).slice(0, S.n).map((x, i) => {
        const k = kinds[i % kinds.length], q = {x, k, a:null};
        if (k === 'mc') q.opts = mcqOpts(x, 'w');
        if (k === 'tf'){ q.truth = Math.random() < 0.5; q.shown = q.truth ? x.d : shuf(C.words.filter(y => y !== x && norm(y.d) !== norm(x.d)))[0].d; }
        return q;
      });
      S.qs = shuf(S.qs); S.phase = 'go'; test(); window.scrollTo && C.el.scrollIntoView({block:'start'});
    };
    C.keys = null; return;
  }
  const done = S.phase === 'done';
  let score = 0;
  if (done) S.qs.forEach(q => { q.ok = q.k === 'mc' ? q.a === q.x : q.k === 'tf' ? q.a === q.truth : isRight(q.a || '', q.x.w); if (q.ok) score++; });
  const items = S.qs.map((q, i) => {
    const head = `<div class="num">Question ${i + 1} of ${S.qs.length} · ${q.k === 'mc' ? 'Multiple choice' : q.k === 'tf' ? 'True or false' : 'Written'}</div>`;
    let body = '';
    if (q.k === 'mc') body = `<div class="p">${esc(q.x.d)}</div><div class="ch">${q.opts.map((o, j) => `<button type="button" data-q="${i}" data-o="${j}" aria-pressed="${q.a === o}" class="${done ? (o === q.x ? 'right' : q.a === o ? 'wrong' : '') : ''}" ${done ? 'disabled' : ''}>${esc(o.w)}</button>`).join('')}</div>`;
    else if (q.k === 'tf') body = `<div class="p"><em>${esc(q.x.w)}</em> means: “${esc(q.shown)}”</div><div class="ch">${[true, false].map(v => `<button type="button" data-q="${i}" data-v="${v}" aria-pressed="${q.a === v}" class="${done ? (v === q.truth ? 'right' : q.a === v ? 'wrong' : '') : ''}" ${done ? 'disabled' : ''}>${v ? 'True' : 'False'}</button>`).join('')}</div>`;
    else body = `<div class="p">${esc(q.x.d)}</div><input data-q="${i}" value="${esc(q.a || '')}" placeholder="Type the word…" aria-label="Answer to question ${i + 1}" autocapitalize="off" spellcheck="false" ${done ? 'disabled' : ''}>`;
    const fix = done && !q.ok ? `<div class="fix">Correct answer: ${esc(q.x.w)}${q.k === 'tf' && !q.truth ? ` (${esc(q.x.w)} means “${esc(q.x.d)}”)` : ''}${C.ru && q.x.ru ? ` · <span lang="ru">${esc(q.x.ru)}</span>` : ''}</div>` : '';
    return `<div class="ifs-tq ${done ? (q.ok ? 'ok' : 'no') : ''}">${head}${body}${fix}</div>`;
  }).join('');
  const answered = S.qs.filter(q => q.a !== null && q.a !== '').length;
  if (done) report(score, S.qs.length, 'Test');
  shell(how, `${done ? `<div class="ifs-big">${score} / ${S.qs.length}</div><p class="ifs-center ifs-how">${score === S.qs.length ? 'Perfect score!' : (S.qs.length - score) + ' to review below.'}</p><div class="ifs-row"><button type="button" class="ifs-gold" id="new">New test</button>${score < S.qs.length ? '<button type="button" data-go="learn">Practise with Learn</button>' : ''}</div>` : `<div class="ifs-stats"><span id="cnt">${answered} of ${S.qs.length} answered</span></div>`}
    <div class="ifs-test">${items}</div>
    ${done ? '<div class="ifs-row"><button type="button" class="ifs-gold" id="new2">New test</button></div>' : '<div class="ifs-row big"><button type="button" class="ifs-gold" id="sub">Submit test</button></div>'}`);
  if (done){ $('#new').onclick = $('#new2').onclick = () => { S.phase = 'set'; test(); }; C.keys = null; return; }
  const upd = () => { const n = S.qs.filter(q => q.a !== null && q.a !== '').length; $('#cnt').textContent = `${n} of ${S.qs.length} answered`; };
  C.el.querySelectorAll('[data-o]').forEach(b => b.onclick = () => { const q = S.qs[+b.dataset.q]; q.a = q.opts[+b.dataset.o]; b.parentNode.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); upd(); });
  C.el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { const q = S.qs[+b.dataset.q]; q.a = b.dataset.v === 'true'; b.parentNode.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); upd(); });
  C.el.querySelectorAll('input[data-q]').forEach(inp => { inp.oninput = () => { S.qs[+inp.dataset.q].a = inp.value; upd(); }; inp.onkeydown = e => { if (e.key === 'Enter'){ e.preventDefault(); const all = [...C.el.querySelectorAll('input[data-q]')], k = all.indexOf(inp); if (all[k + 1]) all[k + 1].focus(); } }; });
  $('#sub').onclick = () => { const left = S.qs.length - S.qs.filter(q => q.a !== null && q.a !== '').length;
    if (left && !S.warned){ S.warned = true; $('#sub').textContent = `${left} unanswered. Submit anyway?`; return; }
    S.warned = false; S.phase = 'done'; test(); C.el.scrollIntoView({block:'start'}); };
  C.keys = null;
}

/* ---------- Scramble ---------- */
function scrambleInit(){ return {deck:shuf(C.words), i:0, score:0, right:0, cur:null}; }
function scrSetup(S){
  const x = S.deck[S.i], w = main(x.w);
  const chars = w.split('').map((ch, i) => ({ch, i, fixed:!KZL.test(ch)}));
  const letters = chars.filter(c => !c.fixed);
  let tiles = shuf(letters.map(c => c.ch));
  for (let t = 0; t < 6 && letters.length > 1 && tiles.join('') === letters.map(c => c.ch).join(''); t++) tiles = shuf(tiles);
  S.cur = {x, chars, tiles:tiles.map((ch, k) => ({ch, k, used:false})), fill:letters.map(() => null), hints:0, lock:[], state:''};
}
function scramble(){
  const S = C.s.scramble || (C.s.scramble = scrambleInit());
  const how = 'Read the meaning. Tap the letters in the right order. Tap a letter in the answer to take it back.';
  if (S.i >= S.deck.length){
    report(S.right, S.deck.length, 'Scramble');
    shell(how, `<div class="ifs-big">${S.score} points</div><p class="ifs-center ifs-how">${S.right} of ${S.deck.length} words solved</p><div class="ifs-row big"><button type="button" class="ifs-gold" id="again">Play again</button></div>`);
    $('#again').onclick = () => { C.s.scramble = null; scramble(); }; C.keys = null; return;
  }
  if (!S.cur) scrSetup(S);
  const c = S.cur, x = c.x;
  let li = 0;
  const slots = c.chars.map(ch => { if (ch.fixed) return ch.ch === ' ' ? '<span class="gap"></span>' : `<span class="fx">${esc(ch.ch)}</span>`; const k = li++; const t = c.fill[k]; return `<button type="button" data-s="${k}" class="${t !== null ? 'fill' : ''} ${c.state === 'bad' && t !== null ? 'bad' : ''} ${c.state === 'good' ? 'good' : ''}" aria-label="Answer letter ${k + 1}">${t !== null ? esc(c.tiles[t].ch) : ''}</button>`; }).join('');
  shell(how, `<div class="ifs-stats"><span>Word ${S.i + 1} / ${S.deck.length}</span><span>Score: ${S.score}</span></div>
    <div class="ifs-q">${esc(x.d)}</div>${C.ru && x.ru && c.ruShown ? `<div class="ifs-center" lang="ru" style="font-weight:700">${esc(x.ru)}</div>` : ''}
    <div class="ifs-slots">${slots}</div>
    <div class="ifs-tiles">${c.tiles.map((t, k) => `<button type="button" data-t="${k}" class="${t.used ? 'used' : ''}" ${t.used ? 'tabindex="-1" aria-hidden="true"' : ''}>${esc(t.ch)}</button>`).join('')}</div>
    ${c.state === 'skip' ? reveal(x, false) + '<div class="ifs-row"><button type="button" class="ifs-gold" id="cont">Next word</button></div>' : `<div class="ifs-tools"><button type="button" class="ifs-link" id="clr">Clear</button><button type="button" class="ifs-link" id="hint">Hint (−3)</button>${C.ru && x.ru ? '<button type="button" class="ifs-link" id="rh">Russian hint</button>' : ''}<button type="button" class="ifs-link" id="say" ${TTS.ok ? '' : 'hidden'}>🔊 Listen (−2)</button><button type="button" class="ifs-link" id="skip">Skip</button></div>`}
    <p class="ifs-keys">You can also type the letters on your keyboard · Backspace removes one</p>`);
  const nextWord = () => { S.i++; S.cur = null; scramble(); };
  if (c.state === 'skip'){ $('#cont').onclick = nextWord; $('#cont').focus(); C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); nextWord(); } }; return; }
  if (c.state === 'good'){ C.to = setTimeout(nextWord, 900); C.keys = null; return; }
  const target = c.chars.filter(ch => !ch.fixed).map(ch => ch.ch.toLowerCase());
  const checkFull = () => {
    if (c.fill.some(v => v === null)){ c.state = ''; return scramble(); }
    const got = c.fill.map(t => c.tiles[t].ch.toLowerCase());
    if (got.join('') === target.join('')){ const pts = Math.max(2, 10 - 3 * c.hints - (c.listened ? 2 : 0)); S.score += pts; S.right++; c.state = 'good'; TTS.ok && TTS.say(main(x.w)); }
    else c.state = 'bad';
    scramble();
  };
  const place = k => { const e = c.fill.indexOf(null); if (e < 0 || c.tiles[k].used) return; c.fill[e] = k; c.tiles[k].used = true; checkFull(); };
  C.el.querySelectorAll('[data-t]').forEach(b => b.onclick = () => place(+b.dataset.t));
  C.el.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { const k = +b.dataset.s, t = c.fill[k]; if (t === null || c.lock.includes(k)) return; c.tiles[t].used = false; c.fill[k] = null; c.state = ''; scramble(); });
  $('#clr').onclick = () => { c.fill.forEach((t, k) => { if (t !== null && !c.lock.includes(k)){ c.tiles[t].used = false; c.fill[k] = null; } }); c.state = ''; scramble(); };
  $('#hint').onclick = () => {
    const k = c.fill.findIndex((t, k) => t === null || c.tiles[t].ch.toLowerCase() !== target[k]); if (k < 0) return;
    if (c.fill[k] !== null){ c.tiles[c.fill[k]].used = false; c.fill[k] = null; }
    let ti = c.tiles.findIndex(t => !t.used && t.ch.toLowerCase() === target[k]);
    if (ti < 0){ const owner = c.fill.findIndex((t, j) => t !== null && j !== k && !c.lock.includes(j) && c.tiles[t].ch.toLowerCase() === target[k]); if (owner >= 0){ ti = c.fill[owner]; c.fill[owner] = null; c.tiles[ti].used = false; } }
    if (ti < 0) return;
    c.fill[k] = ti; c.tiles[ti].used = true; c.lock.push(k); c.hints++; checkFull();
  };
  const rh = $('#rh'); if (rh) rh.onclick = () => { c.ruShown = true; scramble(); };
  $('#say').onclick = () => { c.listened = true; TTS.say(main(x.w)); };
  $('#skip').onclick = () => { c.state = 'skip'; scramble(); };
  C.keys = e => { if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Backspace'){ e.preventDefault(); for (let k = c.fill.length - 1; k >= 0; k--){ if (c.fill[k] !== null && !c.lock.includes(k)){ c.tiles[c.fill[k]].used = false; c.fill[k] = null; c.state = ''; scramble(); break; } } return; }
    if (/^[a-zа-яёәғқңөұүһі]$/i.test(e.key)){ const k = c.tiles.findIndex(t => !t.used && t.ch.toLowerCase() === e.key.toLowerCase()); if (k >= 0){ e.preventDefault(); place(k); } } };
}

/* ---------- Speed Quiz (60 seconds) ---------- */
function speed(){
  const S = C.s.speed || (C.s.speed = {phase:'intro'});
  const best = LS.get('speed:' + C.key, 0);
  const how = 'Read the meaning and choose the word as fast as you can. 60 seconds. A wrong answer costs 3 seconds.';
  if (S.phase !== 'play'){
    const over = S.phase === 'over';
    if (over && S.right > best) LS.set('speed:' + C.key, S.right);
    if (over) report(S.right, S.right + S.wrong, 'Speed Quiz');
    shell(how, `<div class="ifs-big">${over ? S.right + ' right' : 'Ready?'}</div><p class="ifs-center ifs-how">${over ? `${S.wrong} wrong · ` : ''}Best on this device: ${Math.max(best, over ? S.right : 0)}</p><div class="ifs-row big"><button type="button" class="ifs-gold" id="go">${over ? 'Play again' : 'Start · 60 seconds'}</button></div>`);
    $('#go').onclick = () => { Object.assign(S, {phase:'play', right:0, wrong:0, deck:shuf(C.words), end:Date.now() + 60000}); S.q = S.deck.pop(); S.opts = mcqOpts(S.q, 'w'); speed();
      clearInterval(C.iv); C.iv = setInterval(() => { if (!alive()){ clearInterval(C.iv); return; } const left = Math.max(0, Math.ceil((S.end - Date.now()) / 1000)); const t = C.el.querySelector('.ifs-timer'); if (t){ t.textContent = left; t.classList.toggle('low', left <= 10); } if (left <= 0){ clearInterval(C.iv); S.phase = 'over'; speed(); } }, 200); };
    C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); $('#go').click(); } };
    return;
  }
  const left = Math.max(0, Math.ceil((S.end - Date.now()) / 1000));
  shell(how, `<div class="ifs-timer ${left <= 10 ? 'low' : ''}">${left}</div><div class="ifs-stats"><span>Right: ${S.right}</span><span>Wrong: ${S.wrong}</span><span>Best: ${best}</span></div>
    <div class="ifs-q">${esc(S.q.d)}</div><div class="ifs-opts">${S.opts.map((o, i) => `<button type="button" data-i="${i}"><span class="n">${i + 1}</span><span>${esc(o.w)}</span></button>`).join('')}</div><p class="ifs-keys">Press 1–4 to answer</p>`);
  const btns = C.el.querySelectorAll('.ifs-opts button');
  btns.forEach((b, i) => b.onclick = () => {
    if (S.lock) return;
    const ok = S.opts[i] === S.q;
    if (ok) S.right++; else { S.wrong++; S.end -= 3000; }
    b.classList.add(ok ? 'right' : 'wrong'); if (!ok) btns.forEach((x, j) => { if (S.opts[j] === S.q) x.classList.add('right'); });
    S.lock = true;
    C.to = setTimeout(() => { S.lock = false; if (S.phase !== 'play') return; if (!S.deck.length) S.deck = shuf(C.words.filter(y => y !== S.q)); S.q = S.deck.pop(); S.opts = mcqOpts(S.q, 'w'); speed(); }, ok ? 250 : 900);
  });
  C.keys = e => { const n = +e.key; if (n >= 1 && n <= btns.length){ e.preventDefault(); btns[n - 1].click(); } };
}

/* ---------- Gravity ---------- */
function gravity(){
  const S = C.s.gravity || (C.s.gravity = {phase:'intro'});
  const best = LS.get('gravity:' + C.key, 0);
  const how = 'A meaning falls from the sky. Type the word and press Enter before it hits the ground. It gets faster every level!';
  if (S.phase !== 'play'){
    const over = S.phase === 'over';
    if (over && S.score > best) LS.set('gravity:' + C.key, S.score);
    if (over) report(S.solved, C.words.length, 'Gravity');
    shell(how, `<div class="ifs-sky"><div class="ground"></div><div class="msg">${over ? `<div style="font-weight:800;letter-spacing:.06em;color:#E7CF7A">GAME OVER</div><div class="ifs-big" style="color:#fff;margin:0">${S.score}</div><div>${esc(S.msg || '')}</div>` : '<div class="ifs-big" style="color:#fff;font-size:40px;margin:0">Ready for lift-off?</div>'}<div>Best on this device: ${Math.max(best, over ? S.score : 0)}</div><div class="ifs-row" style="margin-top:6px"><button type="button" class="ifs-gold" id="go">${over ? 'Play again' : 'Start'}</button></div></div></div>`);
    $('#go').onclick = () => { Object.assign(S, {phase:'play', score:0, solved:0, lives:3, level:1, dur:16, deck:shuf(C.words), msg:''}); gvNext(S); gravity(); };
    C.keys = null; return;
  }
  const x = S.cur, hint = hintOf(x.w, 1);
  shell(how, `<div class="ifs-stats"><span>Score: ${S.score}</span><span>Level: ${S.level}</span><span style="color:var(--s-bad);letter-spacing:3px" aria-label="${S.lives} lives">${'♥'.repeat(S.lives)}${'♡'.repeat(3 - S.lives)}</span><span>Best: ${best}</span></div>
    <div class="ifs-sky" id="sky"><div class="ifs-rock" id="rock" style="top:0">${esc(x.d)}<small>${esc(hint.split('').join(' '))}</small></div><div class="ground"></div></div>
    <form class="ifs-type" id="tf" autocomplete="off"><input id="ans" placeholder="Type the word…" aria-label="Your answer" autocapitalize="off" spellcheck="false"><button class="ifs-gold" type="submit">Enter</button></form>
    <div class="ifs-hintline" id="gmsg" style="letter-spacing:0;font-family:inherit;font-size:16px">${esc(S.msg)}</div>`);
  const inp = $('#ans'); inp.focus();
  $('#tf').onsubmit = e => { e.preventDefault(); if (!inp.value.trim()) return;
    if (isRight(inp.value, x.w)){ S.score += 10 + Math.round((1 - S.y) * 10) + (S.level - 1) * 2; S.solved++; if (S.score >= S.level * 50){ S.level++; S.dur = Math.max(6, S.dur - 2); S.msg = `Level ${S.level}! Faster now…`; } else S.msg = 'Correct!'; gvNext(S); gravity(); }
    else { inp.value = ''; inp.classList.add('bad'); $('#gmsg').textContent = 'Not quite. Try again!'; } };
  cancelAnimationFrame(C.raf);
  const sky = $('#sky'), rock = $('#rock');
  const step = now => {
    if (!C || C.mode !== 'gravity' || S.phase !== 'play' || !alive()) return;
    if (S.paused){ S.t0 += now - S.paused; S.paused = 0; }
    S.y = Math.min(1, (now - S.t0) / (S.dur * 1000));
    rock.style.top = (S.y * (sky.clientHeight - rock.offsetHeight - 10)) + 'px';
    if (S.y >= 1){ S.lives--; S.msg = `Missed! The word was “${x.w}”.`; if (S.lives <= 0){ S.phase = 'over'; S.msg = `The last word was “${x.w}”.`; } else gvNext(S); gravity(); return; }
    C.raf = requestAnimationFrame(step);
  };
  C.raf = requestAnimationFrame(step);
  C.keys = null;
}
function gvNext(S){ if (!S.deck.length){ S.phase = 'over'; S.msg = `All ${C.words.length} words cleared!`; return; } S.cur = S.deck.pop(); S.y = 0; S.t0 = performance.now(); }
document.addEventListener('visibilitychange', () => { const S = C && C.s.gravity; if (S && S.phase === 'play' && document.hidden) S.paused = performance.now(); });

/* ================= GAME ROOM (fun solo games) ================= */
const FUN = [
  ['blast','Blast','🚀','Shoot the asteroid that matches the meaning.'],
  ['treasure','Treasure Hunt','💰','Answer, open a chest, beat 3 bots to the most gold.'],
  ['fishing','Fishing','🎣','Answer to cast. Catch the heaviest fish in 2½ minutes.'],
  ['race','Race','🏎️','Every right answer moves your car. Beat 3 bots to the line.'],
  ['factory','Factory','🏭','Answer to earn cash, build machines, get rich.'],
  ['cafe','Café','☕','Answer to restock. Serve customers before they leave.'],
  ['defense','Monster Defense','🛡️','Answer to fire at monsters before they reach your castle.'],
  ['boss','Boss Battle','🐉','Answer to hit the dragon before it hits you.'],
  ['memory','Memory','🃏','Turn the cards. Find each word and its meaning.'],
  ['balloon','Balloon Pop','🎈','Guess the word letter by letter. Don’t pop every balloon!'],
  ['search','Word Search','🔎','Find the hidden words in the letter grid.']
];
const FUNCSS = `
.ifs-room{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.ifs-w .ifs-room button{border-radius:16px;text-align:left;padding:16px;display:grid;gap:4px;min-height:128px;align-content:start;background:var(--s-bg)}
.ifs-w .ifs-room button:hover{border-color:var(--s-gold)}
.ifs-room .ic{font-size:34px;line-height:1}
.ifs-room b{font-family:Cambria,Georgia,serif;font-size:20px}
.ifs-room span{font-weight:500;font-size:14px;color:var(--s-muted)}
.ifs-room small{font-size:12px;font-weight:800;color:#A9861B;letter-spacing:.04em}
.ifs-g .ifs-opts{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}
.ifs-w .ifs-g .ifs-opts button{font-size:16px;padding:10px 12px;min-height:52px}
.ifs-g .ifs-q{font-size:clamp(17px,2.4vw,22px);margin:4px auto}
.ifs-g .ifs-q.word{font-size:clamp(24px,4vw,34px)}
.ifs-mini{text-align:center;font-size:15px;margin-top:8px;min-height:22px;color:var(--s-ink)}
.ifs-2c{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:16px;align-items:start}
@media (max-width:760px){.ifs-2c{grid-template-columns:1fr}}
.ifs-box{border:1px solid var(--s-line);border-radius:16px;padding:14px;background:var(--s-bg);min-width:0}
.ifs-dark{background:linear-gradient(180deg,#0E1730,#1B2B57);color:#fff;border:0;border-radius:16px;position:relative;overflow:hidden}
.ifs-hud{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;font-weight:800;font-variant-numeric:tabular-nums;margin-bottom:10px;font-size:15px}
.ifs-hud span{background:var(--s-soft);border-radius:99px;padding:5px 12px}
.ifs-hud .t-low{color:var(--s-bad)}
.ifs-banner{text-align:center;font-weight:800;color:#A9861B;min-height:24px;margin:6px 0}
.ifs-lb{display:grid;gap:6px}
.ifs-lb div{display:grid;grid-template-columns:28px 1fr auto;gap:8px;align-items:center;padding:7px 10px;border-radius:10px;background:var(--s-soft);font-weight:700}
.ifs-lb div.me{background:var(--s-navy);color:#fff}
.ifs-lb i{font-style:normal;font-variant-numeric:tabular-nums}
/* blast */
.ifs-space{height:380px;background:radial-gradient(1px 1px at 20% 30%,#fff8,transparent),radial-gradient(1px 1px at 70% 60%,#fff8,transparent),radial-gradient(2px 2px at 40% 80%,#fff6,transparent),radial-gradient(1px 1px at 85% 15%,#fff9,transparent),linear-gradient(180deg,#070C1C,#18264D)}
.ifs-target{position:absolute;left:10px;right:10px;top:10px;z-index:3;background:rgba(201,162,39,.95);color:#14213D;border-radius:12px;padding:8px 12px;font-weight:800;text-align:center;font-size:16px}
.ifs-w .ifs-ast{position:absolute;transform:translateX(-50%);border-radius:46% 54% 50% 50%/55% 45% 55% 45%;background:radial-gradient(circle at 35% 30%,#8A93A6,#4A5266);color:#fff;border:2px solid #C9A227;padding:12px 8px;font-weight:800;font-size:15px;width:calc(25% - 8px);text-align:center;z-index:2;overflow-wrap:break-word;hyphens:auto;line-height:1.15}
.ifs-w .ifs-ast.boom{background:#C9A227;color:#14213D;transform:translateX(-50%) scale(1.3);opacity:0;transition:all .35s}
.ifs-w .ifs-ast.bad{background:#B4533C;opacity:.35;pointer-events:none}
.ifs-ship{position:absolute;bottom:6px;left:50%;transform:translateX(-50%);font-size:34px;z-index:1}
/* chests */
.ifs-chests{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}
.ifs-w .ifs-chests button{border-radius:14px;min-height:110px;font-size:40px;display:grid;place-items:center;background:var(--s-soft);border-color:var(--s-gold)}
.ifs-w .ifs-chests button.open{font-size:15px;font-weight:800;background:var(--s-bg)}
.ifs-w .ifs-chests button.pick{border-color:var(--s-navy);box-shadow:0 0 0 3px var(--s-gold)}
.ifs-w .ifs-chests button.good{color:var(--s-ok)}.ifs-w .ifs-chests button.badc{color:var(--s-bad)}
/* fishing */
.ifs-lake{height:220px;background:linear-gradient(180deg,#BFE3F5 0 22%,#3A8DC2 22%,#1B4F7A 100%);display:grid;place-items:center;text-align:center}
.ifs-lake .fish{font-size:64px;line-height:1}
.ifs-lake .cap{font-weight:800;font-size:18px;text-shadow:0 1px 3px #0008}
.ifs-catch{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-size:22px}
/* race */
.ifs-track{display:grid;gap:8px;padding:12px;background:#2C3240;border-radius:14px}
.ifs-lane{position:relative;height:44px;border-radius:8px;background:repeating-linear-gradient(90deg,#3B4253 0 30px,#363C4C 30px 60px);border-right:6px solid;border-image:repeating-linear-gradient(0deg,#fff 0 6px,#111 6px 12px) 6}
.ifs-car{position:absolute;top:50%;transform:translate(-50%,-50%) scaleX(-1);font-size:30px;transition:left .45s}
.ifs-lane .nm{position:absolute;left:8px;top:2px;font-size:11px;font-weight:800;color:#C9D6EA;letter-spacing:.04em}
.ifs-lane.me{outline:2px solid #C9A227}
/* factory */
.ifs-shop{display:grid;gap:8px}
.ifs-w .ifs-shop button{border-radius:12px;display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;text-align:left;padding:10px 12px}
.ifs-shop .e{font-size:26px}
.ifs-shop small{display:block;color:var(--s-muted);font-weight:600}
.ifs-big2{font-family:Cambria,Georgia,serif;font-weight:800;font-size:36px;text-align:center;font-variant-numeric:tabular-nums}
.ifs-machines{font-size:22px;text-align:center;min-height:30px;letter-spacing:2px;overflow-wrap:anywhere}
/* cafe */
.ifs-seats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.ifs-seat{border:2px dashed var(--s-line);border-radius:12px;min-height:150px;padding:8px;display:grid;gap:4px;align-content:start;text-align:center}
.ifs-seat .face{font-size:34px}
.ifs-seat .ord{font-size:22px;letter-spacing:2px}
.ifs-pat{height:6px;border-radius:9px;background:var(--s-line);overflow:hidden}.ifs-pat i{display:block;height:100%;background:var(--s-ok)}
.ifs-w .ifs-seat button{padding:6px 10px;min-height:36px;font-size:14px}
.ifs-stock{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0}
.ifs-w .ifs-stock button,.ifs-stock span{border-radius:12px;padding:6px 12px;font-size:18px;font-weight:800;border:2px solid var(--s-line);background:var(--s-bg)}
/* defense */
.ifs-field{height:230px}
.ifs-castle{position:absolute;left:6px;bottom:30px;font-size:48px}
.ifs-mon{position:absolute;bottom:34px;transform:translateX(-50%);font-size:34px;text-align:center;line-height:1}
.ifs-mon small{display:block;font-size:11px;color:#F08A8A;letter-spacing:1px}
.ifs-mon.hit{animation:ifsShake .25s}
.ifs-ground{position:absolute;left:0;right:0;bottom:0;height:30px;background:#3E5B33}
.ifs-arrow{position:absolute;bottom:60px;left:60px;font-size:22px;transition:left .25s linear;z-index:2}
/* boss */
.ifs-boss{font-size:96px;text-align:center;line-height:1.1}
.ifs-boss.hit{animation:ifsShake .3s}
.ifs-hp{height:16px;border-radius:9px;background:#3B1E24;overflow:hidden;border:2px solid #F08A8A}
.ifs-hp i{display:block;height:100%;background:linear-gradient(90deg,#B4533C,#F08A8A);transition:width .3s}
.ifs-atk{height:6px;border-radius:9px;background:rgba(255,255,255,.2);overflow:hidden;margin-top:8px}
.ifs-atk i{display:block;height:100%;background:#C9A227}
/* memory */
.ifs-mem{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.ifs-w .ifs-mem button{border-radius:12px;min-height:96px;padding:8px;font-size:14px;font-weight:700;background:var(--s-navy);color:var(--s-navy);border-color:var(--s-navy);overflow-wrap:anywhere;line-height:1.25}
.ifs-w .ifs-mem button.up{background:#F3E7C9;color:#14213D;border-color:var(--s-gold)}
.ifs-w .ifs-mem button.w.up{font-family:Cambria,Georgia,serif;font-size:17px}
.ifs-w .ifs-mem button.ok{background:rgba(47,143,107,.16);color:var(--s-ink);border-color:var(--s-ok)}
@media (max-width:560px){.ifs-w .ifs-mem button{min-height:84px;font-size:11.5px;padding:5px}.ifs-w .ifs-mem button.w.up{font-size:14px}.ifs-w .ifs-ast{font-size:12.5px;padding:10px 4px}.ifs-target{font-size:14px}}
/* balloon */
.ifs-balloons{font-size:38px;text-align:center;letter-spacing:2px;min-height:50px}
.ifs-basket{font-size:40px;text-align:center;margin-top:-6px}
.ifs-slotw{font-family:Cambria,Georgia,serif;font-weight:800;font-size:clamp(26px,5vw,40px);text-align:center;letter-spacing:.18em;margin:10px 0;overflow-wrap:anywhere}
.ifs-keysb{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:620px;margin:10px auto 0}
.ifs-w .ifs-keysb button{width:42px;height:46px;min-height:0;padding:0;border-radius:10px;font-weight:800}
.ifs-w .ifs-keysb button.hitk{background:var(--s-ok);color:#fff;border-color:var(--s-ok)}
.ifs-w .ifs-keysb button.miss{background:var(--s-bad);color:#fff;border-color:var(--s-bad)}
/* search */
.ifs-grid{display:grid;width:100%;gap:3px;user-select:none;-webkit-user-select:none;touch-action:manipulation;max-width:480px;margin:0 auto}
.ifs-w .ifs-grid button{aspect-ratio:1;min-height:0;padding:0;border-radius:6px;font-weight:800;font-size:clamp(13px,2.6vw,18px);border-width:1px}
.ifs-w .ifs-grid button.sel{background:var(--s-gold);color:#14213D;border-color:var(--s-gold)}
.ifs-w .ifs-grid button.fd{background:rgba(47,143,107,.22);border-color:var(--s-ok)}
.ifs-clues{display:grid;gap:6px;font-size:15px}
.ifs-clues div{padding:6px 10px;border-radius:8px;background:var(--s-soft)}
.ifs-clues div.fd{background:rgba(47,143,107,.16);text-decoration:none}
.ifs-clues b{font-family:Cambria,Georgia,serif}
`;
function funCss(){ if (document.getElementById('ifs-fun')) return; const s = document.createElement('style'); s.id = 'ifs-fun'; s.textContent = FUNCSS; document.head.appendChild(s); }
function later(fn, ms){ const t = setTimeout(() => { if (alive()) fn(); }, ms); C.tos.push(t); return t; }
function every(fn, ms){ const t = setInterval(() => { if (!alive()){ clearInterval(t); return; } fn(); }, ms); C.ivs.push(t); return t; }
function bestOf(k, v, low){ const key = 'best:' + k + ':' + C.key, b = LS.get(key, null); if (v == null) return b; if (b == null || (low ? v < b : v > b)){ LS.set(key, v); return v; } return b; }
const fmtT = s => Math.floor(s / 60) + ':' + String(Math.max(0, Math.floor(s % 60))).padStart(2, '0');
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function wpick(list){ const tot = list.reduce((s, x) => s + x.w, 0); let r = Math.random() * tot; for (const x of list){ if ((r -= x.w) < 0) return x; } return list[list.length - 1]; }
const BOTS = () => [{n:'Berkut', e:'🦅'}, {n:'Barys', e:'🐆'}, {n:'Tulki', e:'🦊'}];
function nextWord(S){ if (!S.bag || !S.bag.length) S.bag = shuf(C.words); return S.bag.pop(); }
/* Multiple-choice question into a host element. cb(ok, word) after feedback. */
function askMC(host, S, cb, dirFixed){
  const x = nextWord(S), dir = dirFixed || (Math.random() < 0.25 ? 'w2d' : 'd2w'), f = dir === 'd2w' ? 'w' : 'd', ops = mcqOpts(x, f);
  host.innerHTML = `<div class="ifs-g"><div class="ifs-sub">${dir === 'd2w' ? 'Choose the word' : 'Choose the meaning'}</div><div class="ifs-q ${dir === 'w2d' ? 'word' : ''}">${esc(dir === 'd2w' ? x.d : x.w)}</div>
    <div class="ifs-opts">${ops.map((o, i) => `<button type="button" data-i="${i}"><span class="n">${i + 1}</span><span>${esc(o[f])}</span></button>`).join('')}</div><div class="ifs-mini" aria-live="polite"></div></div>`;
  const btns = host.querySelectorAll('.ifs-opts button'); let done = false;
  const pick = i => { if (done) return; done = true; const ok = ops[i] === x;
    btns.forEach((b, j) => { b.disabled = true; if (ops[j] === x) b.classList.add('right'); else if (j === i) b.classList.add('wrong'); });
    if (!ok) host.querySelector('.ifs-mini').innerHTML = `<b>${esc(x.w)}</b> = ${esc(x.d)}${C.ru && x.ru ? ` · <span lang="ru">${esc(x.ru)}</span>` : ''}`;
    later(() => cb(ok, x), ok ? 450 : 1700); };
  btns.forEach((b, i) => b.onclick = () => pick(i));
  C.keys = e => { const n = +e.key; if (n >= 1 && n <= btns.length){ e.preventDefault(); pick(n - 1); } };
}
function introScreen(k, how, bestTxt, startLabel, extra){
  const f = FUN.find(x => x[0] === k);
  shell(how, `<div class="ifs-center"><div style="font-size:64px">${f ? f[2] : '🎮'}</div><div class="ifs-big" style="font-size:40px">${esc(NAME[k])}</div>
    <p class="ifs-how">${bestTxt || ''}</p>${extra || ''}<div class="ifs-row big"><button type="button" class="ifs-gold" id="go">${startLabel || 'Start'}</button><button type="button" data-go="room">All games</button></div></div>`);
  C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); $('#go').click(); } };
}
function overScreen(k, how, title, lines, again){
  shell(how, `<div class="ifs-center"><div class="ifs-big">${title}</div>${lines}<div class="ifs-row big"><button type="button" class="ifs-gold" id="again">Play again</button><button type="button" data-go="room">All games</button></div></div>`);
  $('#again').onclick = again; C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); again(); } };
}

/* ---------- Game Room picker ---------- */
function room(){
  funCss();
  shell('Pick a game. Every game uses the words from this lesson. Your best scores are saved on this device.',
    `<div class="ifs-room">${FUN.map(([k, n, ic, d]) => { const b = bestOf(k); return `<button type="button" data-go="${k}"><span class="ic">${ic}</span><b>${n}</b><span>${d}</span>${b != null ? `<small>BEST: ${esc(String(b))}${k === 'memory' || k === 'search' ? ' s' : ''}</small>` : ''}</button>`; }).join('')}</div>`);
  C.keys = null;
}

/* ---------- Blast ---------- */
function blast(){
  funCss(); const k = 'blast', how = 'The meaning is at the top. Tap the asteroid with the right word before it reaches your ship. A wrong asteroid costs a life.';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){ introScreen(k, how, `Best: ${bestOf(k) ?? '—'}`); $('#go').onclick = () => { Object.assign(S, {phase:'play', score:0, lives:3, level:1, hits:0}); blast(); }; return; }
  if (S.phase === 'over'){ const b = bestOf(k, S.score); report(S.hits, S.hits + 3, 'Blast'); overScreen(k, how, S.score + ' points', `<p class="ifs-how">${S.hits} asteroids hit · level ${S.level} · best ${b}</p>`, () => { S.phase = 'intro'; blast(); }); return; }
  shell(how, `<div class="ifs-hud"><span id="bsc">Score ${S.score}</span><span id="blv">Level ${S.level}</span><span id="bli" style="color:var(--s-bad)">${'♥'.repeat(S.lives)}${'♡'.repeat(3 - S.lives)}</span></div>
    <div class="ifs-dark ifs-space" id="sp"><div class="ifs-target" id="tg"></div><div class="ifs-ship">🚀</div></div><div class="ifs-mini" id="bm"></div>`);
  const sp = $('#sp');
  const round = () => {
    if (S.phase !== 'play') return;
    sp.querySelectorAll('.ifs-ast').forEach(a => a.remove());
    const x = nextWord(S), ops = mcqOpts(x, 'w'); $('#tg').textContent = x.d;
    const H = sp.clientHeight, W = sp.clientWidth, n = ops.length;
    const rocks = ops.map((o, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'ifs-ast'; b.textContent = o.w;
      const xpos = ((i + 0.5) / n) * 100 + (Math.random() * 3 - 1.5); b.style.left = xpos + '%'; sp.appendChild(b); return {b, o, y: 70 - (i % 2) * 75 - Math.random() * 20}; });
    const speed = (H - 40) / Math.max(5.5, 12 - S.level * 0.9); let last = performance.now(), over = false;
    const end = (ok) => { if (over) return; over = true; cancelAnimationFrame(C.raf);
      if (!ok){ S.lives--; $('#bm').innerHTML = `<b>${esc(x.w)}</b> = ${esc(x.d)}${C.ru && x.ru ? ` · <span lang="ru">${esc(x.ru)}</span>` : ''}`; }
      else { S.hits++; S.score += 10 + S.level * 2; if (S.hits % 5 === 0) S.level++; $('#bm').textContent = ''; }
      $('#bsc').textContent = 'Score ' + S.score; $('#blv').textContent = 'Level ' + S.level; $('#bli').textContent = '♥'.repeat(Math.max(0, S.lives)) + '♡'.repeat(3 - Math.max(0, S.lives));
      if (S.lives <= 0){ S.phase = 'over'; later(blast, 1200); return; }
      later(round, ok ? 450 : 1500); };
    rocks.forEach(r => r.b.onclick = () => { if (over) return; if (r.o === x){ r.b.classList.add('boom'); end(true); } else { r.b.classList.add('bad'); rocks.find(q => q.o === x).b.style.borderColor = '#5FD39A'; end(false); } });
    const step = now => { if (!alive() || over) return; const dt = (now - last) / 1000; last = now;
      for (const r of rocks){ r.y += speed * dt; r.b.style.top = r.y + 'px'; }
      if (rocks.some(r => r.o === x && r.y > H - 70)){ rocks.find(q => q.o === x).b.style.borderColor = '#5FD39A'; return end(false); }
      C.raf = requestAnimationFrame(step); };
    C.raf = requestAnimationFrame(step);
    C.keys = e => { const m = +e.key; if (m >= 1 && m <= rocks.length){ e.preventDefault(); rocks[m - 1].b.click(); } };
  };
  round();
}

/* ---------- Treasure Hunt ---------- */
function treasure(){
  funCss(); const k = 'treasure', how = 'Answer correctly to open one of three chests. Chests can give gold, double it, let you steal from a bot… or lose some. Most gold after 15 questions wins.';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){ introScreen(k, how, `Best: ${bestOf(k) ?? '—'} gold`); $('#go').onclick = () => { Object.assign(S, {phase:'play', gold:0, n:0, max:15, bots:BOTS().map(b => Object.assign(b, {g:0}))}); treasure(); }; return; }
  const board = () => { const all = [{n:'You', e:'⭐', g:S.gold, me:1}].concat(S.bots).sort((a, b) => b.g - a.g); return `<div class="ifs-lb">${all.map((p, i) => `<div class="${p.me ? 'me' : ''}"><i>${i + 1}</i><span>${p.e} ${esc(p.n)}</span><i>${p.g}</i></div>`).join('')}</div>`; };
  if (S.phase === 'over'){ const all = [{g:S.gold, me:1}].concat(S.bots).sort((a, b) => b.g - a.g), place = all.findIndex(p => p.me) + 1, b = bestOf(k, S.gold);
    report(S.gold, Math.max(S.gold, ...S.bots.map(x => x.g)), 'Treasure Hunt');
    overScreen(k, how, place === 1 ? '🏆 You win!' : `You came ${['', '1st', '2nd', '3rd', '4th'][place]}`, `<p class="ifs-how">${S.gold} gold · best ${b}</p><div style="max-width:420px;margin:0 auto">${board()}</div>`, () => { S.phase = 'intro'; treasure(); }); return; }
  shell(how, `<div class="ifs-2c"><div class="ifs-box" id="qa"></div><div><div class="ifs-hud"><span>Question ${Math.min(S.n + 1, S.max)} / ${S.max}</span><span>💰 ${S.gold}</span></div><div class="ifs-banner" id="tb">${esc(S.msg || '')}</div><div id="lb">${board()}</div></div></div>`);
  const botsMove = () => S.bots.forEach(b => { const r = Math.random(); if (r < 0.62) b.g += rnd(1, 6) * 10; else if (r < 0.72) b.g = Math.round(b.g * 1.5); else if (r < 0.8) b.g = Math.round(b.g * 0.75); });
  const next = () => { S.n++; botsMove(); if (S.n >= S.max){ S.phase = 'over'; } treasure(); };
  askMC($('#qa'), S, ok => {
    if (!ok){ S.msg = 'No chest this time.'; return next(); }
    const outcomes = () => wpick([
      {w:40, f:() => { const v = rnd(1, 10) * 10; return {t:`+${v}`, c:'good', do:() => S.gold += v}; }},
      {w:9, f:() => ({t:'+25%', c:'good', do:() => S.gold = Math.round(S.gold * 1.25) + 5})},
      {w:6, f:() => ({t:'×2', c:'good', do:() => S.gold = Math.max(20, S.gold * 2)})},
      {w:2, f:() => ({t:'×3', c:'good', do:() => S.gold = Math.max(30, S.gold * 3)})},
      {w:8, f:() => ({t:'−25%', c:'badc', do:() => S.gold = Math.round(S.gold * 0.75)})},
      {w:4, f:() => ({t:'−50%', c:'badc', do:() => S.gold = Math.round(S.gold * 0.5)})},
      {w:9, f:() => ({t:'Steal 25%', c:'good', steal:1})},
      {w:3, f:() => ({t:'Swap', c:'', swap:1})},
      {w:6, f:() => ({t:'Nothing', c:'', do:() => 0})}
    ]).f();
    const res = [outcomes(), outcomes(), outcomes()];
    const qa = $('#qa');
    qa.innerHTML = `<div class="ifs-sub">Correct! Choose a chest</div><div class="ifs-chests">${res.map((r, i) => `<button type="button" data-c="${i}" aria-label="Chest ${i + 1}">🎁</button>`).join('')}</div><div class="ifs-mini" id="cm"></div>`;
    C.keys = e => { const m = +e.key; if (m >= 1 && m <= 3){ e.preventDefault(); qa.querySelectorAll('[data-c]')[m - 1].click(); } };
    qa.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
      const i = +b.dataset.c, r = res[i]; C.keys = null;
      qa.querySelectorAll('[data-c]').forEach((x, j) => { x.disabled = true; x.classList.add('open', res[j].c || 'n'); x.textContent = res[j].t; if (j === i) x.classList.add('pick'); });
      if (r.steal || r.swap){
        $('#cm').innerHTML = `<div style="font-weight:800;margin-bottom:6px">${r.steal ? 'Steal 25% from…' : 'Swap your gold with…'}</div><div class="ifs-row" style="margin:0">${S.bots.map((bt, j) => `<button type="button" data-b="${j}">${bt.e} ${esc(bt.n)} · ${bt.g}</button>`).join('')}</div>`;
        $('#cm').querySelectorAll('[data-b]').forEach(bb => bb.onclick = () => { const bt = S.bots[+bb.dataset.b];
          if (r.steal){ const v = Math.round(bt.g * 0.25); bt.g -= v; S.gold += v; S.msg = `You stole ${v} gold from ${bt.n}!`; }
          else { const t = bt.g; bt.g = S.gold; S.gold = t; S.msg = `You swapped with ${bt.n}!`; }
          next(); });
        return;
      }
      const before = S.gold; r.do(); const d = S.gold - before; S.msg = d > 0 ? `+${d} gold!` : d < 0 ? `${d} gold…` : 'Nothing inside.';
      later(next, 1100);
    });
  });
}

/* ---------- Fishing ---------- */
const FISH = [
  {n:'Old boot', e:'👢', a:0, b:0, w:8, r:0}, {n:'Minnow', e:'🐟', a:1, b:3, w:26, r:0}, {n:'Perch', e:'🐠', a:2, b:6, w:22, r:0},
  {n:'Crab', e:'🦀', a:3, b:8, w:12, r:1}, {n:'Pufferfish', e:'🐡', a:4, b:12, w:12, r:1}, {n:'Octopus', e:'🐙', a:10, b:25, w:7, r:2},
  {n:'Sturgeon', e:'🐟', a:20, b:60, w:5, r:2}, {n:'Shark', e:'🦈', a:50, b:140, w:3, r:3}, {n:'Whale', e:'🐳', a:150, b:400, w:1, r:4}, {n:'Golden fish', e:'✨', a:300, b:600, w:0.5, r:4}
];
function fishing(){
  funCss(); const k = 'fishing', how = 'Answer correctly to cast your line. A streak upgrades your lure, so rarer fish bite. Every 6 catches starts a Frenzy: double weight!';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){ introScreen(k, how, `Best: ${bestOf(k) ?? '—'} lb`); $('#go').onclick = () => { Object.assign(S, {phase:'play', lbs:0, t:150, streak:0, caught:0, frenzy:0, log:[], last:null, bots:BOTS().slice(0, 2).map(b => Object.assign(b, {g:0}))}); fishing(); }; return; }
  if (S.phase === 'over'){ const b = bestOf(k, S.lbs), all = [{g:S.lbs, me:1}].concat(S.bots).sort((x, y) => y.g - x.g), pl = all.findIndex(p => p.me) + 1; report(S.caught, S.caught + S.missed || S.caught, 'Fishing');
    overScreen(k, how, `${S.lbs} lb`, `<p class="ifs-how">${S.caught} catches · ${pl === 1 ? '🏆 1st place' : 'place ' + pl + ' of 3'} · best ${b} lb</p><div class="ifs-catch" style="justify-content:center">${S.log.map(f => f.e).join('')}</div>`, () => { S.phase = 'intro'; fishing(); }); return; }
  const lure = Math.min(4, 1 + Math.floor(S.streak / 3));
  const board = () => { const all = [{n:'You', e:'⭐', g:S.lbs, me:1}].concat(S.bots).sort((a, b) => b.g - a.g); return `<div class="ifs-lb">${all.map((p, i) => `<div class="${p.me ? 'me' : ''}"><i>${i + 1}</i><span>${p.e} ${esc(p.n)}</span><i>${p.g} lb</i></div>`).join('')}</div>`; };
  shell(how, `<div class="ifs-hud"><span id="ft">⏱ ${fmtT(S.t)}</span><span>🎣 ${S.lbs} lb</span><span>Lure ${'★'.repeat(lure)}${'☆'.repeat(4 - lure)}</span>${S.frenzy ? `<span style="color:#A9861B">FRENZY ×2 · ${S.frenzy}</span>` : ''}</div>
    <div class="ifs-2c"><div class="ifs-box" id="qa"></div><div><div class="ifs-dark ifs-lake">${S.last ? `<div><div class="fish">${S.last.e}</div><div class="cap">${esc(S.last.n)}${S.last.lb ? ' · ' + S.last.lb + ' lb' : ''}</div></div>` : '<div class="cap">Answer to cast your line…</div>'}</div><div class="ifs-banner">${esc(S.msg || '')}</div>${board()}</div></div>`);
  if (!S.timer){ S.timer = every(() => { S.t--; const t = $('#ft'); if (t){ t.textContent = '⏱ ' + fmtT(S.t); t.classList.toggle('t-low', S.t <= 15); }
    if (S.t % 8 === 0) S.bots.forEach(b => { const f = wpick(FISH.map(x => Object.assign({}, x, {w:x.r > 2 ? x.w * 0.5 : x.w}))); b.g += rnd(f.a, f.b); });
    if (S.t <= 0){ clearInterval(S.timer); S.timer = null; S.phase = 'over'; fishing(); } }, 1000); }
  askMC($('#qa'), S, ok => {
    if (S.phase !== 'play') return;
    if (!ok){ S.streak = 0; S.missed = (S.missed || 0) + 1; S.msg = 'The fish got away!'; S.last = {e:'💨', n:'Nothing', lb:0}; return fishing(); }
    S.streak++; const f = wpick(FISH.map(x => Object.assign({}, x, {w:x.w * (x.r ? Math.pow(lure, x.r * 0.6) : 1)})));
    let lb = rnd(f.a, f.b); if (S.frenzy){ lb *= 2; S.frenzy--; }
    S.lbs += lb; S.caught++; S.log.push(f); S.last = {e:f.e, n:f.n, lb};
    S.msg = f.r >= 3 ? `WOW! A ${f.n}!` : f.lb === 0 ? '' : '';
    if (S.caught % 6 === 0){ S.frenzy = 3; S.msg = '🎉 FRENZY! Your next 3 catches weigh double!'; }
    fishing();
  });
}

/* ---------- Race ---------- */
function race(){
  funCss(); const k = 'race', how = 'Each right answer moves your car one step. Three right in a row gives you NITRO (two steps). A wrong answer stalls your engine. First to the line wins!';
  const S = C.s[k] || (C.s[k] = {phase:'intro', lvl:1});
  const LEN = Math.min(20, Math.max(10, C.words.length));
  if (S.phase === 'intro'){
    introScreen(k, how, `Best: ${bestOf(k) != null ? bestOf(k) + ' s' : '—'}`, 'Start the race', `<div class="ifs-row" style="margin-top:0">${['Easy', 'Normal', 'Hard'].map((n, i) => `<button type="button" data-l="${i}" aria-pressed="${S.lvl === i}" style="${S.lvl === i ? 'background:var(--s-navy);color:#fff' : ''}">${n} bots</button>`).join('')}</div>`);
    C.el.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { S.lvl = +b.dataset.l; race(); });
    $('#go').onclick = () => { const sp = [[7.5, 9.5], [5, 6.8], [3.6, 4.8]][S.lvl];
      Object.assign(S, {phase:'play', me:0, streak:0, t0:Date.now(), fin:[], bots:[{n:'Sokol', e:'🚙'}, {n:'Mishka', e:'🚕'}, {n:'Lisa', e:'🚓'}].map(b => Object.assign(b, {p:0, s:sp[0] + Math.random() * (sp[1] - sp[0])}))}); race(); };
    return;
  }
  if (S.phase === 'over'){ const place = S.fin.indexOf('You') + 1 || 4, secs = Math.round((S.tEnd - S.t0) / 1000); const b = place === 1 ? bestOf(k, secs, true) : bestOf(k);
    report(place === 1 ? 1 : 0, 1, 'Race'); overScreen(k, how, place === 1 ? '🏆 You win!' : `You finished ${['', '1st', '2nd', '3rd', '4th'][place]}`, `<p class="ifs-how">${secs} s${b != null ? ' · best winning time ' + b + ' s' : ''}</p>`, () => { S.phase = 'intro'; race(); }); return; }
  const lanes = () => [{n:'You', e:'🏎️', p:S.me, me:1}].concat(S.bots).map(r => `<div class="ifs-lane ${r.me ? 'me' : ''}"><span class="nm">${esc(r.n)}</span><span class="ifs-car" style="left:${4 + (Math.min(LEN, r.p) / LEN) * 90}%">${r.e}</span></div>`).join('');
  shell(how, `<div class="ifs-track" id="trk">${lanes()}</div><div class="ifs-banner" id="rb">${esc(S.msg || '')}</div><div class="ifs-box" id="qa"></div>`);
  const finish = who => { if (!S.fin.includes(who)) S.fin.push(who); };
  if (!S.timer){ S.timer = every(() => { S.bots.forEach(b => { if (b.p < LEN){ b.p += 0.25 / b.s; if (b.p >= LEN) finish(b.n); } });
    const trk = $('#trk'); if (trk) trk.innerHTML = lanes();
    if (S.fin.length >= 3 && !S.fin.includes('You')){ clearInterval(S.timer); S.timer = null; S.tEnd = Date.now(); S.phase = 'over'; race(); } }, 250); }
  askMC($('#qa'), S, ok => {
    if (S.phase !== 'play') return;
    if (ok){ S.streak++; const st = S.streak >= 3 ? 2 : 1; S.me += st; S.msg = st > 1 ? '🔥 NITRO! +2' : ''; }
    else { S.streak = 0; S.msg = 'Engine stalled!'; }
    if (S.me >= LEN){ finish('You'); clearInterval(S.timer); S.timer = null; S.tEnd = Date.now(); S.phase = 'over'; }
    race();
  });
}

/* ---------- Factory ---------- */
const MACH = [{n:'Gear', e:'⚙️', c:30, r:1}, {n:'Robot', e:'🤖', c:160, r:6}, {n:'Rocket line', e:'🚀', c:800, r:32}, {n:'Science lab', e:'🧪', c:4000, r:150}];
function factory(){
  funCss(); const k = 'factory', how = 'Right answers earn cash. Spend it on machines that make money every second. A wrong answer causes a 5-second power cut. Earn as much as you can in 3 minutes!';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){ introScreen(k, how, `Best: $${bestOf(k) ?? '—'}`); $('#go').onclick = () => { Object.assign(S, {phase:'play', cash:0, earned:0, t:180, streak:0, own:[0, 0, 0, 0], cut:0, msg:''}); factory(); }; return; }
  if (S.phase === 'over'){ const b = bestOf(k, Math.round(S.earned)); report(S.right || 0, (S.right || 0) + (S.wrong || 0), 'Factory');
    overScreen(k, how, `$${Math.round(S.earned).toLocaleString('en')}`, `<p class="ifs-how">earned in 3 minutes · ${S.own.reduce((a, b) => a + b, 0)} machines · best $${b.toLocaleString('en')}</p>`, () => { S.phase = 'intro'; factory(); }); return; }
  const rate = () => S.own.reduce((s, n, i) => s + n * MACH[i].r, 0);
  const cost = i => Math.round(MACH[i].c * Math.pow(1.18, S.own[i]));
  shell(how, `<div class="ifs-2c"><div class="ifs-box" id="qa"></div><div><div class="ifs-hud"><span id="ft">⏱ ${fmtT(S.t)}</span><span id="fr">$${rate()}/s</span></div>
    <div class="ifs-big2" id="fc">$${Math.floor(S.cash).toLocaleString('en')}</div><div class="ifs-banner" id="fb">${esc(S.msg)}</div>
    <div class="ifs-machines" id="fm">${S.own.map((n, i) => MACH[i].e.repeat(Math.min(n, 12))).join('') || '🏚️'}</div>
    <div class="ifs-shop" id="shop">${MACH.map((m, i) => `<button type="button" data-m="${i}"><span class="e">${m.e}</span><span>${m.n} <small>+$${m.r}/s · you have ${S.own[i]}</small></span><b>$${cost(i).toLocaleString('en')}</b></button>`).join('')}</div></div></div>`);
  const upd = () => { const c = $('#fc'); if (!c) return; c.textContent = '$' + Math.floor(S.cash).toLocaleString('en'); C.el.querySelectorAll('[data-m]').forEach(b => b.disabled = S.cash < cost(+b.dataset.m)); };
  C.el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { const i = +b.dataset.m, c = cost(i); if (S.cash < c) return; S.cash -= c; S.own[i]++; S.msg = `New ${MACH[i].n}!`; factory(); });
  upd();
  if (!S.timer){ let tick = 0; S.timer = every(() => { tick++; if (S.cut > 0){ S.cut -= 0.2; } else { const g = rate() * 0.2; S.cash += g; S.earned += g; }
    if (tick % 5 === 0){ S.t--; const t = $('#ft'); if (t){ t.textContent = '⏱ ' + fmtT(S.t); t.classList.toggle('t-low', S.t <= 15); } const fr = $('#fr'); if (fr) fr.textContent = S.cut > 0 ? '⚡ power cut' : '$' + rate() + '/s'; }
    upd(); if (S.t <= 0){ clearInterval(S.timer); S.timer = null; S.phase = 'over'; factory(); } }, 200); }
  askMC($('#qa'), S, ok => {
    if (S.phase !== 'play') return;
    if (ok){ S.right = (S.right || 0) + 1; S.streak++; const g = Math.round((12 + rate() * 4) * (1 + Math.min(S.streak, 10) * 0.1)); S.cash += g; S.earned += g; S.msg = `+$${g}${S.streak >= 3 ? ' · streak ×' + S.streak : ''}`; }
    else { S.wrong = (S.wrong || 0) + 1; S.streak = 0; S.cut = 5; S.msg = '⚡ Power cut! 5 seconds without production.'; }
    factory();
  });
}

/* ---------- Café ---------- */
const MENU = [{e:'☕', n:'coffee', p:4}, {e:'🥐', n:'croissant', p:5}, {e:'🍰', n:'cake', p:7}, {e:'🥪', n:'sandwich', p:8}];
const FACES = ['🧑', '👩', '👨', '👧', '👦', '👵', '👴', '🧔', '👩‍🦱', '🧑‍🎓'];
function cafe(){
  funCss(); const k = 'cafe', how = 'Customers order food. Answer correctly to restock (+3 of the item you choose). Tap Serve when you have everything. Customers who wait too long leave and you lose a star.';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){ introScreen(k, how, `Best: $${bestOf(k) ?? '—'}`); $('#go').onclick = () => { Object.assign(S, {phase:'play', cash:0, stars:5, t:180, stock:[3, 3, 2, 2], seats:[null, null, null], served:0, msg:'', restock:false, spawn:2}); cafe(); }; return; }
  if (S.phase === 'over'){ const b = bestOf(k, S.cash); report(S.served, S.served + (5 - S.stars), 'Café'); overScreen(k, how, `$${S.cash}`, `<p class="ifs-how">${S.served} customers served · ${'★'.repeat(S.stars)}${'☆'.repeat(5 - S.stars)} · best $${b}</p>`, () => { S.phase = 'intro'; cafe(); }); return; }
  const seatHTML = (c, i) => c ? `<div class="ifs-seat"><div class="face">${c.f}</div><div class="ord">${c.o.map(j => MENU[j].e).join('')}</div><div class="ifs-pat"><i style="width:${Math.max(0, c.p / c.max * 100)}%;${c.p / c.max < 0.3 ? 'background:var(--s-bad)' : ''}"></i></div><button type="button" data-sv="${i}" ${canServe(c) ? 'class="ifs-yes"' : ''}>Serve</button></div>` : `<div class="ifs-seat" style="place-content:center;color:var(--s-muted)">Empty table</div>`;
  const canServe = c => { const need = [0, 0, 0, 0]; c.o.forEach(j => need[j]++); return need.every((n, j) => S.stock[j] >= n); };
  shell(how, `<div class="ifs-hud"><span id="ct">⏱ ${fmtT(S.t)}</span><span>💵 $${S.cash}</span><span style="color:#A9861B">${'★'.repeat(S.stars)}${'☆'.repeat(5 - S.stars)}</span></div>
    <div class="ifs-2c"><div><div class="ifs-seats" id="seats">${S.seats.map(seatHTML).join('')}</div><div class="ifs-stock" id="stk">${MENU.map((m, i) => `<span>${m.e} ${S.stock[i]}</span>`).join('')}</div><div class="ifs-banner">${esc(S.msg)}</div></div><div class="ifs-box" id="qa"></div></div>`);
  const bindServe = () => C.el.querySelectorAll('[data-sv]').forEach(b => b.onclick = () => { const c = S.seats[+b.dataset.sv]; if (!c) return;
    if (!canServe(c)){ S.msg = 'Not enough stock. Answer questions to restock!'; const bn = C.el.querySelector('.ifs-banner'); if (bn) bn.textContent = S.msg; return; }
    c.o.forEach(j => S.stock[j]--); const pay = c.o.reduce((s, j) => s + MENU[j].p, 0), tip = Math.round(pay * 0.5 * c.p / c.max); S.cash += pay + tip; S.served++; S.seats[+b.dataset.sv] = null; S.msg = `+$${pay}${tip ? ' + $' + tip + ' tip' : ''}`; cafe(); });
  bindServe();
  if (!S.timer){ S.timer = every(() => { S.t--; S.spawn--;
    S.seats.forEach((c, i) => { if (c){ c.p--; if (c.p <= 0){ S.seats[i] = null; S.stars--; S.msg = 'A customer left angry! −1 star'; } } });
    if (S.spawn <= 0){ const free = S.seats.findIndex(x => !x); if (free >= 0){ const n = rnd(1, Math.min(3, 1 + Math.floor((180 - S.t) / 50))); const max = 34 - Math.min(10, Math.floor((180 - S.t) / 18));
      S.seats[free] = {f:FACES[rnd(0, FACES.length - 1)], o:Array.from({length:n}, () => rnd(0, 3)), p:max, max}; } S.spawn = rnd(5, 9); }
    if (S.t <= 0 || S.stars <= 0){ clearInterval(S.timer); S.timer = null; S.phase = 'over'; return cafe(); }
    const t = $('#ct'); if (t){ t.textContent = '⏱ ' + fmtT(S.t); }
    const se = $('#seats'); if (se){ se.innerHTML = S.seats.map(seatHTML).join(''); bindServe(); }
    const hs = C.el.querySelector('.ifs-hud'); if (hs) hs.children[2].textContent = '★'.repeat(Math.max(0, S.stars)) + '☆'.repeat(5 - Math.max(0, S.stars));
    const bn = C.el.querySelector('.ifs-banner'); if (bn) bn.textContent = S.msg; }, 1000); }
  if (S.restock){
    $('#qa').innerHTML = `<div class="ifs-sub">Correct! Restock one item (+3)</div><div class="ifs-stock">${MENU.map((m, i) => `<button type="button" data-rs="${i}">${m.e} +3</button>`).join('')}</div>`;
    C.el.querySelectorAll('[data-rs]').forEach(b => b.onclick = () => { S.stock[+b.dataset.rs] += 3; S.restock = false; S.msg = ''; cafe(); });
    C.keys = e => { const m = +e.key; if (m >= 1 && m <= 4){ e.preventDefault(); C.el.querySelectorAll('[data-rs]')[m - 1].click(); } };
    return;
  }
  askMC($('#qa'), S, ok => { if (S.phase !== 'play') return; if (ok){ S.restock = true; } else S.msg = 'Wrong answer: no delivery this time.'; cafe(); });
}

/* ---------- Monster Defense ---------- */
function defense(){
  funCss(); const k = 'defense', how = 'Monsters walk towards your castle. Each right answer fires an arrow at the closest one. Three in a row = double damage. Survive 8 waves!';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){ introScreen(k, how, `Best: ${bestOf(k) ?? '—'} points`); $('#go').onclick = () => { Object.assign(S, {phase:'play', hp:10, wave:1, mons:[], toSpawn:4, spawnT:1, kills:0, score:0, streak:0, msg:'Wave 1!'}); defense(); }; return; }
  if (S.phase === 'over' || S.phase === 'win'){ const b = bestOf(k, S.score); report(S.kills, S.kills + (10 - S.hp), 'Monster Defense');
    overScreen(k, how, S.phase === 'win' ? '🏆 Castle saved!' : '💥 The castle fell', `<p class="ifs-how">${S.kills} monsters · wave ${S.wave} · ${S.score} points · best ${b}</p>`, () => { S.phase = 'intro'; defense(); }); return; }
  const MON = ['👾', '👹', '👻', '🐺', '🦇', '🧟'];
  shell(how, `<div class="ifs-hud"><span>Wave ${S.wave} / 8</span><span id="dh">🏰 ${'♥'.repeat(S.hp)}</span><span id="ds">${S.score} pts</span></div>
    <div class="ifs-dark ifs-field" id="fld"><div class="ifs-castle">🏰</div><div class="ifs-ground"></div></div><div class="ifs-banner" id="db">${esc(S.msg)}</div><div class="ifs-box" id="qa"></div>`);
    const draw = () => { const f = $('#fld'); if (!f) return; f.querySelectorAll('.ifs-mon').forEach(m => m.remove()); S.mons.forEach(m => { const d = document.createElement('div'); d.className = 'ifs-mon'; d.style.left = m.x + '%'; d.innerHTML = `${m.e}<small>${'♥'.repeat(Math.max(0, m.hp))}</small>`; m.el = d; f.appendChild(d); }); };
  draw();
  if (!S.timer){ S.timer = every(() => {
    S.spawnT -= 0.1;
    if (S.toSpawn > 0 && S.spawnT <= 0){ S.toSpawn--; S.spawnT = Math.max(2.5, 6 - S.wave * 0.4); const hp = Math.min(3, 1 + Math.floor(Math.random() * (1 + S.wave / 3))); S.mons.push({x:100, hp, e:MON[rnd(0, MON.length - 1)], v:(2.6 + S.wave * 0.25) * (0.85 + Math.random() * 0.3)}); }
    S.mons.forEach(m => m.x -= m.v * 0.1);
    const hit = S.mons.filter(m => m.x <= 10); if (hit.length){ S.hp -= hit.length; S.mons = S.mons.filter(m => m.x > 10); const dh = $('#dh'); if (dh) dh.textContent = '🏰 ' + '♥'.repeat(Math.max(0, S.hp)); }
    if (S.hp <= 0){ clearInterval(S.timer); S.timer = null; S.phase = 'over'; return defense(); }
    if (S.toSpawn === 0 && !S.mons.length){ if (S.wave >= 8){ clearInterval(S.timer); S.timer = null; S.phase = 'win'; S.score += S.hp * 20; return defense(); }
      S.wave++; S.toSpawn = 3 + S.wave; S.spawnT = 2; S.msg = `Wave ${S.wave}!`; const hd = C.el.querySelector('.ifs-hud span'); if (hd) hd.textContent = `Wave ${S.wave} / 8`; const db = $('#db'); if (db) db.textContent = S.msg; }
    if (S.mons.some(m => !m.el || !m.el.isConnected)) draw(); else S.mons.forEach(m => m.el.style.left = m.x + '%');
  }, 100); }
  askMC($('#qa'), S, ok => {
    if (S.phase !== 'play') return;
    if (ok){ S.streak++; const dmg = S.streak >= 3 ? 2 : 1; const tgt = S.mons.slice().sort((a, b) => a.x - b.x)[0];
      const fl = $('#fld'); if (tgt && fl){ const ar = document.createElement('div'); ar.className = 'ifs-arrow'; ar.textContent = '➶'; fl.appendChild(ar); requestAnimationFrame(() => ar.style.left = tgt.x + '%'); setTimeout(() => ar.remove(), 300);
        tgt.hp -= dmg; if (tgt.el){ tgt.el.classList.add('hit'); } if (tgt.hp <= 0){ S.mons = S.mons.filter(m => m !== tgt); S.kills++; S.score += 10 * S.wave; } S.msg = dmg > 1 ? '🔥 Double damage!' : ''; }
      else S.msg = 'No monsters yet. Get ready!'; }
    else { S.streak = 0; S.msg = 'Missed!'; }
    defense();
  });
}

/* ---------- Boss Battle ---------- */
function boss(){
  funCss(); const k = 'boss', how = 'Every right answer hits the dragon. Three in a row is a critical hit. Every 4th question you type the word for a power attack. When the bar fills, the dragon attacks. A wrong answer lets it strike too!';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){ introScreen(k, how, `Best: ${bestOf(k) ?? '—'} points`); $('#go').onclick = () => { Object.assign(S, {phase:'play', hp:100, max:100, hearts:5, n:0, streak:0, atk:0, t0:Date.now(), msg:''}); boss(); }; return; }
  if (S.phase === 'over' || S.phase === 'win'){ const secs = Math.round((S.tEnd - S.t0) / 1000), pts = S.phase === 'win' ? S.hearts * 100 + Math.max(0, 300 - secs * 2) : Math.round((S.max - S.hp) * 2); const b = bestOf(k, pts);
    report(S.phase === 'win' ? 1 : 0, 1, 'Boss Battle'); overScreen(k, how, S.phase === 'win' ? '🏆 Dragon defeated!' : '💀 The dragon wins', `<p class="ifs-how">${pts} points · ${secs} s · best ${b}</p>`, () => { S.phase = 'intro'; boss(); }); return; }
  const enr = S.hp <= S.max / 2, period = enr ? 11 : 15;
  shell(how, `<div class="ifs-2c"><div class="ifs-dark" style="padding:16px"><div style="display:flex;justify-content:space-between;font-weight:800"><span>🐉 Grammar Dragon${enr ? ' · ENRAGED' : ''}</span><span>${Math.max(0, S.hp)} / ${S.max}</span></div>
    <div class="ifs-hp"><i style="width:${Math.max(0, S.hp) / S.max * 100}%"></i></div><div class="ifs-boss" id="bs">${enr ? '🐲' : '🐉'}</div>
    <div id="bh" style="text-align:center;font-size:22px;color:#F08A8A">${'♥'.repeat(S.hearts)}${'♡'.repeat(5 - S.hearts)}</div><div class="ifs-atk"><i id="ab" style="width:${S.atk / period * 100}%"></i></div><div style="text-align:center;font-size:12px;opacity:.7;margin-top:4px">DRAGON ATTACK</div></div>
    <div><div class="ifs-banner" id="bb">${esc(S.msg)}</div><div class="ifs-box" id="qa"></div></div></div>`);
  const hurt = why => { S.hearts--; S.msg = why; if (S.hearts <= 0){ clearInterval(S.timer); S.timer = null; S.tEnd = Date.now(); S.phase = 'over'; } };
  if (!S.timer){ S.timer = every(() => { S.atk += 0.1; const ab = $('#ab'); const per = S.hp <= S.max / 2 ? 11 : 15; if (ab) ab.style.width = Math.min(100, S.atk / per * 100) + '%';
    if (S.atk >= per){ S.atk = 0; hurt('🔥 The dragon breathes fire! −1 heart'); if (S.phase !== 'play') return boss(); const bh = $('#bh'); if (bh) bh.textContent = '♥'.repeat(S.hearts) + '♡'.repeat(5 - S.hearts); const bb = $('#bb'); if (bb) bb.textContent = S.msg; } }, 100); }
  const hit = dmg => { S.hp -= dmg; const b = $('#bs'); if (b) b.classList.add('hit'); if (S.hp <= 0){ clearInterval(S.timer); S.timer = null; S.tEnd = Date.now(); S.phase = 'win'; } };
  const after = (ok, dmg, x) => { if (S.phase !== 'play') return; S.n++;
    if (ok){ S.streak++; const d = dmg * (S.streak >= 3 ? 1.5 : 1); hit(Math.round(d)); S.msg = `⚔️ Hit! −${Math.round(d)}${S.streak >= 3 ? ' (critical)' : ''}`; }
    else { S.streak = 0; S.hp = Math.min(S.max, S.hp + 5); hurt('The dragon strikes back and heals +5!'); }
    boss(); };
  if ((S.n + 1) % 4 === 0){
    const x = nextWord(S), qa = $('#qa');
    qa.innerHTML = `<div class="ifs-g"><div class="ifs-sub">⚡ Power attack · type the word</div><div class="ifs-q">${esc(x.d)}</div><div class="ifs-hintline">${esc(hintOf(x.w, 1))}</div>
      <form class="ifs-type" id="tf" autocomplete="off"><input id="ans" aria-label="Your answer" placeholder="Type the word…" autocapitalize="off" spellcheck="false"><button type="submit" class="ifs-gold">Attack</button></form><div class="ifs-mini"></div></div>`;
    const inp = $('#ans'); inp.focus(); C.keys = null;
    $('#tf').onsubmit = e => { e.preventDefault(); if (!inp.value.trim()) return; const ok = isRight(inp.value, x.w);
      if (!ok) qa.querySelector('.ifs-mini').innerHTML = `<b>${esc(x.w)}</b>${C.ru && x.ru ? ` · <span lang="ru">${esc(x.ru)}</span>` : ''}`;
      inp.disabled = true; later(() => after(ok, 25, x), ok ? 300 : 1600); };
    return;
  }
  askMC($('#qa'), S, (ok, x) => after(ok, 10, x));
}

/* ---------- Memory ---------- */
function memory(){
  funCss(); const k = 'memory', how = 'Turn two cards at a time. Find each word and its meaning. Fewer moves and less time is better.';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){ introScreen(k, how, `Best time: ${bestOf(k) != null ? bestOf(k) + ' s' : '—'}`); $('#go').onclick = () => {
      const ws = shuf(C.words).slice(0, Math.min(8, C.words.length));
      Object.assign(S, {phase:'play', cards:shuf(ws.flatMap((x, i) => [{id:i, t:x.w, w:1}, {id:i, t:x.d, w:0}])), open:[], done:0, pairs:ws.length, moves:0, t0:Date.now(), lock:false}); memory(); }; return; }
  if (S.phase === 'over'){ const secs = Math.round((S.tEnd - S.t0) / 1000), b = bestOf(k, secs, true); report(S.pairs, S.moves, 'Memory');
    overScreen(k, how, `${secs} seconds`, `<p class="ifs-how">${S.moves} moves for ${S.pairs} pairs · best ${b} s</p>`, () => { S.phase = 'intro'; memory(); }); return; }
  shell(how, `<div class="ifs-hud"><span>Moves ${S.moves}</span><span>Pairs ${S.done} / ${S.pairs}</span><span id="mt">⏱ ${fmtT((Date.now() - S.t0) / 1000)}</span></div>
    <div class="ifs-mem">${S.cards.map((c, i) => `<button type="button" data-i="${i}" class="${c.w ? 'w' : ''} ${c.ok ? 'ok up' : S.open.includes(i) ? 'up' : ''}" aria-label="${c.ok || S.open.includes(i) ? esc(c.t) : 'Hidden card'}">${c.ok || S.open.includes(i) ? esc(c.t) : '?'}</button>`).join('')}</div>`);
  if (!S.timer) S.timer = every(() => { const t = $('#mt'); if (t) t.textContent = '⏱ ' + fmtT((Date.now() - S.t0) / 1000); }, 1000);
  C.el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { const i = +b.dataset.i, c = S.cards[i]; if (S.lock || c.ok || S.open.includes(i)) return;
    S.open.push(i); if (S.open.length === 2){ S.moves++; const [a, d] = S.open.map(j => S.cards[j]);
      if (a.id === d.id && a.w !== d.w){ a.ok = d.ok = true; S.open = []; S.done++; if (S.done === S.pairs){ clearInterval(S.timer); S.timer = null; S.tEnd = Date.now(); S.phase = 'over'; later(memory, 700); } }
      else { S.lock = true; later(() => { S.open = []; S.lock = false; memory(); }, 1100); } }
    memory(); });
  C.keys = null;
}

/* ---------- Balloon Pop (hangman) ---------- */
function balloon(){
  funCss(); const k = 'balloon', how = 'Read the meaning and guess the word one letter at a time. Each wrong letter pops a balloon. Pop all 7 and the basket falls!';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  const ROUNDS = Math.min(10, C.words.length);
  if (S.phase === 'intro'){ introScreen(k, how, `Best: ${bestOf(k) ?? '—'} points`); $('#go').onclick = () => { Object.assign(S, {phase:'play', deck:shuf(C.words).slice(0, ROUNDS), i:0, score:0, solved:0}); newB(); balloon(); }; return; }
  function newB(){ S.x = S.deck[S.i]; S.word = main(S.x.w).toLowerCase(); S.guess = new Set(); S.miss = 0; S.state = ''; S.ruShown = false; }
  if (S.phase === 'over'){ const b = bestOf(k, S.score); report(S.solved, ROUNDS, 'Balloon Pop'); overScreen(k, how, `${S.score} points`, `<p class="ifs-how">${S.solved} of ${ROUNDS} words solved · best ${b}</p>`, () => { S.phase = 'intro'; balloon(); }); return; }
  const letters = [...new Set(S.word.replace(/[^a-zа-яёәғқңөұүһі]/g, '').split(''))];
  const won = letters.every(l => S.guess.has(l)), lost = S.miss >= 7;
  const shown = S.word.split('').map(ch => /[a-zа-яёәғқңөұүһі]/.test(ch) ? (S.guess.has(ch) || lost ? ch : '_') : ch === ' ' ? ' ' : ch).join('');
  shell(how, `<div class="ifs-hud"><span>Word ${S.i + 1} / ${ROUNDS}</span><span>Score ${S.score}</span></div>
    <div class="ifs-q">${esc(S.x.d)}</div>${S.ruShown ? `<div class="ifs-center" lang="ru" style="font-weight:700">${esc(S.x.ru)}</div>` : ''}
    <div class="ifs-balloons" aria-label="${7 - S.miss} balloons left">${lost ? '💥' : '🎈'.repeat(7 - S.miss)}</div><div class="ifs-basket">${lost ? '🫣' : '🧺'}</div>
    <div class="ifs-slotw" style="${won ? 'color:var(--s-ok)' : lost ? 'color:var(--s-bad)' : ''}">${esc(shown)}</div>
    ${won || lost ? `<div class="ifs-row big"><button type="button" class="ifs-gold" id="nx">${S.i + 1 >= ROUNDS ? 'See score' : 'Next word'}</button></div>`
    : `<div class="ifs-keysb">${'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('').map(l => `<button type="button" data-l="${l}" class="${S.guess.has(l) ? (S.word.includes(l) ? 'hitk' : 'miss') : ''}" ${S.guess.has(l) ? 'disabled' : ''}>${l.toUpperCase()}</button>`).join('')}</div>
      <div class="ifs-tools">${C.ru && S.x.ru && !S.ruShown ? '<button type="button" class="ifs-link" id="rh">Russian hint (−1 🎈)</button>' : ''}${TTS.ok ? '<button type="button" class="ifs-link" id="say">🔊 Listen (−1 🎈)</button>' : ''}</div>`}`);
  if (won || lost){ if (!S.counted){ S.counted = true; if (won){ S.score += 10 + (7 - S.miss) * 5; S.solved++; } }
    const nx = () => { S.counted = false; S.i++; if (S.i >= ROUNDS){ S.phase = 'over'; } else newB(); balloon(); };
    $('#nx').onclick = nx; $('#nx').focus(); C.keys = e => { if (e.key === 'Enter'){ e.preventDefault(); nx(); } }; return; }
  const press = l => { if (S.guess.has(l)) return; S.guess.add(l); if (!S.word.includes(l)) S.miss++; balloon(); };
  C.el.querySelectorAll('[data-l]').forEach(b => b.onclick = () => press(b.dataset.l));
  const rh = $('#rh'); if (rh) rh.onclick = () => { S.ruShown = true; S.miss++; balloon(); };
  const sy = $('#say'); if (sy) sy.onclick = () => { TTS.say(main(S.x.w)); S.miss++; balloon(); };
  C.keys = e => { if (e.ctrlKey || e.metaKey || e.altKey) return; if (/^[a-zа-яёәғқңөұүһі]$/i.test(e.key)){ e.preventDefault(); press(e.key.toLowerCase()); } };
}

/* ---------- Word Search ---------- */
function search(){
  funCss(); const k = 'search', how = 'Find the words hidden in the grid. Tap the first letter, then the last letter. Words go across, down or diagonally, and some go backwards. Phrases are written without spaces.';
  const S = C.s[k] || (C.s[k] = {phase:'intro'});
  if (S.phase === 'intro'){
    introScreen(k, how, `Best time: ${bestOf(k) != null ? bestOf(k) + ' s' : '—'}`);
    $('#go').onclick = () => { const g = wsBuild(); if (!g){ shell(how, '<p class="ifs-how">This lesson’s words are too long for a word search. Try another game.</p><div class="ifs-row"><button type="button" data-go="room">All games</button></div>'); return; }
      Object.assign(S, g, {phase:'play', found:new Set(), sel:null, t0:Date.now()}); search(); };
    return;
  }
  if (S.phase === 'over'){ const secs = Math.round((S.tEnd - S.t0) / 1000), b = bestOf(k, secs, true); report(S.found.size, S.list.length, 'Word Search');
    overScreen(k, how, `${secs} seconds`, `<p class="ifs-how">All ${S.list.length} words found · best ${b} s</p>`, () => { S.phase = 'intro'; search(); }); return; }
  const N = S.N, fcells = new Set(); S.list.forEach((w, i) => { if (S.found.has(i)) w.cells.forEach(c => fcells.add(c)); });
  shell(how, `<div class="ifs-hud"><span>Found ${S.found.size} / ${S.list.length}</span><span id="wt">⏱ ${fmtT((Date.now() - S.t0) / 1000)}</span></div>
    <div class="ifs-2c"><div class="ifs-grid" style="grid-template-columns:repeat(${N},1fr)">${S.grid.map((ch, i) => `<button type="button" data-c="${i}" class="${fcells.has(i) ? 'fd' : ''} ${S.sel === i ? 'sel' : ''}" aria-label="Row ${Math.floor(i / N) + 1}, column ${i % N + 1}: ${ch}">${ch}</button>`).join('')}</div>
    <div class="ifs-clues">${S.list.map((w, i) => `<div class="${S.found.has(i) ? 'fd' : ''}">${i + 1}. ${S.found.has(i) ? `<b>${esc(w.orig)}</b> · ` : `<span style="letter-spacing:2px;color:var(--s-muted)">${'_ '.repeat(w.s.length).trim()}</span> · `}${esc(w.d)}</div>`).join('')}</div></div>
    <div class="ifs-banner">${esc(S.msg || '')}</div>`);
  if (!S.timer) S.timer = every(() => { const t = $('#wt'); if (t) t.textContent = '⏱ ' + fmtT((Date.now() - S.t0) / 1000); }, 1000);
  C.el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { const i = +b.dataset.c;
    if (S.sel === null || S.sel === i){ S.sel = S.sel === i ? null : i; S.msg = S.sel === null ? '' : 'Now tap the last letter.'; return search(); }
    const a = S.sel; S.sel = null; const r1 = Math.floor(a / N), c1 = a % N, r2 = Math.floor(i / N), c2 = i % N, dr = Math.sign(r2 - r1), dc = Math.sign(c2 - c1), len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;
    if (!(r1 === r2 || c1 === c2 || Math.abs(r2 - r1) === Math.abs(c2 - c1))){ S.msg = 'Words go in straight lines. Try again.'; return search(); }
    const cells = Array.from({length:len}, (_, t) => (r1 + dr * t) * N + (c1 + dc * t)), str = cells.map(c => S.grid[c]).join('');
    const hit = S.list.findIndex((w, j) => !S.found.has(j) && (w.s === str || w.s === str.split('').reverse().join('')));
    if (hit >= 0){ S.found.add(hit); S.list[hit].cells = cells; S.msg = `Found: ${S.list[hit].orig}!`; if (S.found.size === S.list.length){ clearInterval(S.timer); S.timer = null; S.tEnd = Date.now(); S.phase = 'over'; later(search, 900); } }
    else S.msg = 'Not a word from the list. Try again.';
    search(); });
  C.keys = null;
}
function wsBuild(){
  const cand = shuf(C.words).map(x => ({orig:main(x.w), d:x.d, s:main(x.w).toUpperCase().replace(/[^A-ZА-ЯЁӘҒҚҢӨҰҮҺІ]/g, '')})).filter(w => w.s.length >= 3 && w.s.length <= 12);
  const uniq = []; cand.forEach(w => { if (!uniq.some(u => u.s === w.s || u.s.includes(w.s) || w.s.includes(u.s))) uniq.push(w); });
  const pick = uniq.sort((a, b) => (a.orig.includes(' ') - b.orig.includes(' '))).slice(0, 8); if (pick.length < 3) return null;
  const N = Math.max(10, Math.min(13, Math.max(...pick.map(w => w.s.length)) + 1));
  for (let attempt = 0; attempt < 40; attempt++){
    const g = Array(N * N).fill(''), dirs = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0]], placed = [];
    let ok = true;
    for (const w of pick.slice().sort((a, b) => b.s.length - a.s.length)){
      let done = false;
      for (let t = 0; t < 200 && !done; t++){
        const [dr, dc] = dirs[Math.random() < 0.7 ? rnd(0, 3) : rnd(0, 5)], r = rnd(0, N - 1), c = rnd(0, N - 1);
        const er = r + dr * (w.s.length - 1), ec = c + dc * (w.s.length - 1); if (er < 0 || er >= N || ec < 0 || ec >= N) continue;
        let fit = true; for (let j = 0; j < w.s.length; j++){ const cell = g[(r + dr * j) * N + c + dc * j]; if (cell && cell !== w.s[j]){ fit = false; break; } }
        if (!fit) continue;
        for (let j = 0; j < w.s.length; j++) g[(r + dr * j) * N + c + dc * j] = w.s[j];
        placed.push(Object.assign({}, w, {cells:[]})); done = true;
      }
      if (!done){ ok = false; break; }
    }
    if (!ok) continue;
    const L = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЫЭЮЯ'; for (let i = 0; i < g.length; i++) if (!g[i]) g[i] = L[rnd(0, L.length - 1)];
    return {grid:g, N, list:placed.sort((a, b) => a.orig.localeCompare(b.orig))};
  }
  return null;
}

document.addEventListener('keydown', e => {
  if (!C || !C.keys || !alive()) return;
  const t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
  if (typing) return;
  if (t && t.tagName === 'BUTTON' && (e.key === ' ' || e.key === 'Enter') && !C.el.contains(t)) return;
  if (t && t.tagName === 'BUTTON' && C.el.contains(t) && (e.key === ' ' || e.key === 'Enter') && t.id !== 'card' && C.mode !== 'cards') return;
  C.keys(e);
});

window.IFStudy = { mount, stop, go, MODES, NAME };
window.KZStudyReady = true;
})();
