/* IF Vocabulary Arenas ⇄ IF Mind Lab.
   Course pages keep studying and class tools: Flashcards, Test, Quick Quiz, My Progress and the team games
   (Alias, Charades, Taboo). The games — Learn, Write, Spell, Scramble, Game Room, Blocks, Match, Gravity, Snake,
   Tower, 2048 and the IF Arcade — live in IF Mind Lab's Word Arcade, which opens this same page with ?arcade=1:
   only the games, in the Mind Lab look. Works on every course page by reading the mode buttons, so it fits all the
   arena variants (A1–C1, Teens, KET, PET, IELTS, Movers, Flyers). Loaded after the page's own scripts. */
(function () {
  if (window.__ifMindArena) return; window.__ifMindArena = true;
  var ARCADE = /[?&]arcade=1/.test(location.search);
  var GAME = /^(learn|write|spell|spell it|scramble|game room|blocks|match|gravity|snake|tower|2048|speed quiz)$/i;
  var STUDY_FIRST = /^flashcards$/i;
  var ns = window.IFEN_NS || '';
  var label = function (b) { return (b.textContent || '').replace(/^[^A-Za-z0-9]+/, '').trim(); };
  var cur = function () { try { return typeof lesson !== 'undefined' ? lesson : ''; } catch (e) { return ''; } };
  var M = document.getElementById('modes');
  if (!M) return;

  if (ARCADE) {
    document.documentElement.setAttribute('data-theme', 'dark');
    var st = document.createElement('style');
    st.textContent = ':root[data-theme="dark"]{--bg:transparent;--fg:#e8f0ff;--card:rgba(20,30,70,.62);--line:rgba(148,178,255,.22);--muted:#9fb0d0;--chip-on:#22d3ee;--chip-on-fg:#050816;--navy:#0b1030;--gold:#fbbf24;--gold2:#fde68a;--body:"Space Grotesk",system-ui,sans-serif;--display:"Orbitron","Space Grotesk",system-ui,sans-serif}' +
      'html,body{background:transparent!important}header{display:none!important}.wrap{padding-top:10px}' +
      '#modes .lbl,#modes .sep{display:none!important}' +
      'button{backdrop-filter:blur(8px)}button.on{background:linear-gradient(135deg,#22d3ee,#6366f1 60%,#a78bfa)!important;border-color:transparent!important;color:#050816!important;box-shadow:0 0 18px rgba(34,211,238,.45)}' +
      '.stage{background:linear-gradient(160deg,rgba(25,36,86,.62),rgba(8,12,34,.7))!important;border:1px solid rgba(148,178,255,.18)!important;border-radius:20px!important;box-shadow:0 20px 60px rgba(0,0,0,.35)!important}' +
      '#lessons .lbl{color:#22d3ee}';
    document.head.appendChild(st);
  } else {
    var st2 = document.createElement('style');
    st2.textContent = '#modes .ml-link{display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-weight:800;border-radius:999px;padding:9px 16px;color:#fff;background:linear-gradient(135deg,#0e7490,#4f46e5 60%,#7c3aed);box-shadow:0 6px 18px rgba(79,70,229,.35)}' +
      '#ifp-pill{display:none!important}';   // the IF Arcade is in IF Mind Lab now
    document.head.appendChild(st2);
  }

  var busy = false;
  function apply() {
    if (busy) return; busy = true;
    try {
      var btns = [].slice.call(M.querySelectorAll('button')), on = btns.filter(function (b) { return b.classList.contains('on'); })[0];
      if (ARCADE) {
        btns.forEach(function (b) { b.style.display = GAME.test(label(b)) ? '' : 'none'; });
        [].slice.call(M.querySelectorAll('*')).forEach(function (el) { if (el.tagName !== 'BUTTON' && !el.querySelector('button')) el.style.display = 'none'; });
        if (!on || !GAME.test(label(on))) { var g = btns.filter(function (b) { return GAME.test(label(b)); })[0]; if (g) setTimeout(function () { g.click(); }, 0); }
      } else {
        btns.forEach(function (b) { if (GAME.test(label(b))) b.style.display = 'none'; });
        var a = M.querySelector('.ml-link');
        if (!a) { a = document.createElement('a'); a.className = 'ml-link'; a.target = '_top'; a.textContent = '🧠 Games in IF Mind Lab'; M.appendChild(a); }
        a.href = '/a/mind-lab/#/';
        if (on && GAME.test(label(on))) { var f = btns.filter(function (b) { return STUDY_FIRST.test(label(b)); })[0]; if (f) setTimeout(function () { f.click(); }, 0); }
      }
    } catch (e) {}
    busy = false;
  }
  new MutationObserver(function () { setTimeout(apply, 0); }).observe(M, { childList: true, subtree: true });
  apply();
  // tell IF Mind Lab which unit is open (for its header)
  if (ARCADE && window.parent !== window) setInterval(function () { try { window.parent.postMessage({ ifArena: ns, unit: cur() }, location.origin); } catch (e) {} }, 1500);
})();
