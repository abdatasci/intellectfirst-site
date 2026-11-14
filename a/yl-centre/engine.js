/* IF Young Learners Test Centre (Starters / Movers / Flyers): practice tests marked instantly, games, and IF Live.
   The level comes from <body data-level="starters|movers|flyers">. Results are saved to the student's profile
   (POST /api/tests/legacy) when signed in. */
(function () {
  var Y = window.YL, LV = Y.levels[document.body.dataset.level] || Y.levels.starters, pic = Y.pic;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var app = $('#app');
  var ls = { get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var COL = { red: '#e53935', blue: '#1e6fd9', green: '#2e9e4f', yellow: '#f2c200', orange_c: '#f28c18', purple: '#8e44ad', brown: '#8d5a2b', black: '#222', white: '#fff', pink: '#f48fb1', grey: '#9e9e9e' };
  var CNAME = function (c) { return c === 'orange_c' ? 'orange' : c; };
  document.documentElement.style.setProperty('--lv', LV.colour);

  /* ---------- sound ---------- */
  var voice = null;
  function pickVoice() { try { var v = speechSynthesis.getVoices(); voice = v.find(function (x) { return /en-GB/i.test(x.lang); }) || v.find(function (x) { return /^en/i.test(x.lang); }) || null; } catch (e) {} }
  try { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; } catch (e) {}
  function say(t, rate) {
    try { speechSynthesis.cancel(); var parts = String(t).split(' — '), i = 0;   // two speakers: a short pause between turns
      (function next() { if (i >= parts.length) return; var u = new SpeechSynthesisUtterance(parts[i]); u.lang = 'en-GB'; if (voice) u.voice = voice; u.rate = rate || .85; u.pitch = i % 2 ? 1.25 : 1; u.onend = function () { i++; setTimeout(next, 450); }; speechSynthesis.speak(u); })();
    } catch (e) {}
  }
  var AC = null;
  function beep(ok) { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var t = AC.currentTime; (ok ? [[660, .08], [990, .14]] : [[260, .2]]).forEach(function (n) { var o = AC.createOscillator(), g = AC.createGain(); o.type = ok ? 'triangle' : 'sawtooth'; o.frequency.value = n[0]; g.gain.setValueAtTime(.15, t); g.gain.exponentialRampToValueAtTime(.0001, t + n[1]); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + n[1]); t += n[1]; }); } catch (e) {} }

  /* ---------- tests: Test n uses items n*5 … n*5+4 of every task ---------- */
  function testOf(n) {
    return LV.tasks.map(function (t) { return { task: t, items: t.items.slice(n * 5, n * 5 + 5) }; });
  }
  function itemView(t, it, k) {
    var K = t.kind, h = '';
    if (K === 'listenPick' || K === 'listenNumber' || K === 'listenColour' || K === 'listenWrite') h += '<button class="play" data-say="' + esc(it[0]) + '">▶ Listen</button>';
    if (K === 'listenPick') h += '<div class="picks">' + shuffle([it[1]].concat(it[2])).map(function (w) { return '<button class="pk" data-v="' + esc(w) + '"><span class="em">' + pic(w) + '</span></button>'; }).join('') + '</div>';
    else if (K === 'listenNumber') h += '<input class="ans num" inputmode="numeric" maxlength="2" placeholder="?">';
    else if (K === 'listenColour') h += '<div class="big em">' + pic(it[1]) + '</div><div class="cols">' + ['red', 'blue', 'green', 'yellow', 'orange_c', 'purple', 'brown', 'black', 'white', 'pink', 'grey'].map(function (c) { return '<button class="col" data-v="' + c + '" style="background:' + COL[c] + '" title="' + CNAME(c) + '"></button>'; }).join('') + '</div>';
    else if (K === 'listenWrite') h += '<p class="q">' + esc(it[1]) + '</p><input class="ans" autocomplete="off" autocapitalize="off" spellcheck="false">';
    else if (K === 'yesNo') h += '<div class="big em">' + pic(it[0]) + '</div><p class="q">' + esc(it[1]) + '</p><div class="yn"><button class="w" data-v="yes">✅ Yes</button><button class="w" data-v="no">❌ No</button></div>';
    else if (K === 'picWord') h += '<div class="big em">' + pic(it[0]) + '</div><div class="words">' + shuffle([it[0]].concat(it[1])).map(function (w) { return '<button class="w" data-v="' + esc(w) + '">' + esc(w) + '</button>'; }).join('') + '</div>';
    else if (K === 'spell') h += '<div class="big em">' + pic(it) + '</div><div class="slots">' + it.split('').map(function () { return '<span></span>'; }).join('') + '</div><div class="tiles">' + shuffle(it.split('')).map(function (c, i) { return '<button class="tile" data-c="' + c + '" data-i="' + i + '">' + c + '</button>'; }).join('') + '</div><button class="linkbtn undo">↺ Start again</button>';
    else if (K === 'picType') h += '<div class="big em">' + pic(it) + '</div><p class="q">' + it.length + ' letters: ' + it[0] + ' ' + '_ '.repeat(it.length - 1) + '</p><input class="ans" autocomplete="off" autocapitalize="off" spellcheck="false">';
    else if (K === 'defPick') h += '<p class="q">' + esc(it[0]) + '</p><div class="picks">' + shuffle([it[1]].concat(it[2])).map(function (w) { return '<button class="pk" data-v="' + esc(w) + '"><span class="em">' + pic(w) + '</span><small>' + esc(w) + '</small></button>'; }).join('') + '</div>';
    else if (K === 'defType') h += '<p class="q">' + esc(it[0]) + '</p><p class="hint">' + it[1].length + ' letters, starts with <b>' + it[1][0] + '</b></p><input class="ans" autocomplete="off" autocapitalize="off" spellcheck="false" value="' + it[1][0] + '">';
    else if (K === 'dialogue') h += '<p class="q bubble">🗨️ ' + esc(it[0]) + '</p><div class="words col1">' + shuffle([it[1]].concat(it[2])).map(function (w) { return '<button class="w" data-v="' + esc(w) + '">' + esc(w) + '</button>'; }).join('') + '</div>';
    else if (K === 'gapPick') h += '<p class="q">' + esc(it[0]).replace('___', '<b class="gap">_____</b>') + '</p><div class="words">' + shuffle([it[1]].concat(it[2])).map(function (w) { return '<button class="w" data-v="' + esc(w) + '">' + esc(w) + '</button>'; }).join('') + '</div>';
    else if (K === 'typeWord') h += '<p class="q">' + esc(it[0]).replace('___', '<b class="gap">_____</b>') + '</p><input class="ans" autocomplete="off" autocapitalize="off" spellcheck="false">';
    return '<div class="item" data-k="' + k + '"><span class="no">' + (k + 1) + '</span><div class="ib">' + h + '</div></div>';
  }
  function rightOf(t, it) {
    var K = t.kind;
    if (K === 'listenPick' || K === 'defPick' || K === 'gapPick' || K === 'dialogue') return it[1];
    if (K === 'listenNumber') return String(it[1]);
    if (K === 'listenColour') return it[2];
    if (K === 'listenWrite') return String(it[2]);
    if (K === 'yesNo') return it[2] ? 'yes' : 'no';
    if (K === 'picWord') return it[0];
    if (K === 'spell' || K === 'picType') return it;
    if (K === 'defType' || K === 'typeWord') return it[1];
  }
  var norm = function (s) { return String(s || '').trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').replace(/[.!]$/, ''); };

  function runTest(n) {
    var T = testOf(n), step = 0, ans = T.map(function (x) { return x.items.map(function () { return ''; }); });
    var key = 'yl.' + LV.id + '.t' + n, saved = ls.get(key); if (saved && saved.ans) ans = saved.ans;
    function draw() {
      var x = T[step], t = x.task;
      app.innerHTML = '<div class="testbar"><button class="linkbtn" id="quit">← Tests</button><span>' + esc(LV.short) + ' · Test ' + (n + 1) + '</span><span class="prog">' + T.map(function (_, i) { return '<i class="' + (i < step ? 'done' : i === step ? 'on' : '') + '"></i>'; }).join('') + '</span></div>' +
        '<section class="task"><div class="part">' + esc(t.part) + ' · Part ' + (step + 1) + ' of ' + T.length + '</div><h2>' + esc(t.title) + '</h2><p class="how">' + esc(t.how) + '</p>' +
        x.items.map(function (it, k) { return itemView(t, it, k); }).join('') +
        '<div class="nav"><button class="btn ghost" id="prev"' + (step ? '' : ' disabled') + '>← Back</button><button class="btn" id="next">' + (step === T.length - 1 ? 'Finish ✓' : 'Next →') + '</button></div></section>';
      // restore + wire answers
      $$('.item').forEach(function (el) {
        var k = +el.dataset.k, cur = ans[step][k];
        $$('[data-say]', el).forEach(function (b) { b.onclick = function () { say(b.dataset.say); b.classList.add('played'); }; });
        $$('[data-v]', el).forEach(function (b) {
          if (b.dataset.v === cur) b.classList.add('sel');
          b.onclick = function () { $$('[data-v]', el).forEach(function (o) { o.classList.remove('sel'); }); b.classList.add('sel'); ans[step][k] = b.dataset.v; keep(); };
        });
        var inp = $('.ans', el); if (inp) { if (cur) inp.value = cur; inp.oninput = function () { ans[step][k] = inp.value; keep(); }; }
        if ($('.tiles', el)) {
          var word = '', slots = $$('.slots span', el), set = function () { slots.forEach(function (s, i) { s.textContent = word[i] || ''; }); };
          if (cur) { word = cur; set(); var used = cur.split(''); $$('.tile', el).forEach(function (b) { var j = used.indexOf(b.dataset.c); if (j >= 0) { used.splice(j, 1); b.disabled = true; } }); }
          $$('.tile', el).forEach(function (b) { b.onclick = function () { if (word.length >= slots.length) return; word += b.dataset.c; b.disabled = true; set(); ans[step][k] = word; keep(); }; });
          $('.undo', el).onclick = function () { word = ''; set(); ans[step][k] = ''; $$('.tile', el).forEach(function (b) { b.disabled = false; }); keep(); };
        }
      });
      $('#quit').onclick = function () { speechSynthesis.cancel && speechSynthesis.cancel(); home('tests'); };
      $('#prev').onclick = function () { step--; draw(); scrollTo(0, 0); };
      $('#next').onclick = function () { if (step < T.length - 1) { step++; draw(); scrollTo(0, 0); } else finish(); };
    }
    function keep() { ls.set(key, { ans: ans, at: Date.now() }); }
    function finish() {
      var parts = {}, review = [];
      T.forEach(function (x, si) {
        var p = parts[x.task.part] || (parts[x.task.part] = [0, 0]);
        x.items.forEach(function (it, k) { var r = rightOf(x.task, it), a = ans[si][k], ok = norm(a) === norm(r); p[1]++; if (ok) p[0]++; else review.push({ t: x.task.title, it: it, kind: x.task.kind, a: a, r: r }); });
      });
      var score = 0, max = 0; Object.keys(parts).forEach(function (k) { score += parts[k][0]; max += parts[k][1]; });
      var shields = function (p) { return Math.max(1, Math.min(5, Math.round(p[0] / p[1] * 5))); };
      var best = ls.get('yl.' + LV.id + '.best') || {}; if (!best[n] || score > best[n]) { best[n] = score; ls.set('yl.' + LV.id + '.best', best); }
      ls.set(key, null);
      app.innerHTML = '<section class="result"><div class="part">' + esc(LV.name) + ' · Test ' + (n + 1) + '</div><h2>' + (score / max >= .8 ? 'Brilliant! 🌟' : score / max >= .5 ? 'Well done! 👍' : 'Good try! 💪') + '</h2><div class="score">' + score + ' / ' + max + '</div>' +
        Object.keys(parts).map(function (k) { var s = shields(parts[k]); return '<div class="shieldrow"><b>' + esc(k) + '</b><span>' + '🛡️'.repeat(s) + '<span class="off">' + '🛡️'.repeat(5 - s) + '</span></span><small>' + parts[k][0] + '/' + parts[k][1] + '</small></div>'; }).join('') +
        '<p id="saveMsg" class="hint">Saving your result…</p>' +
        (review.length ? '<details class="rev"><summary>Check your mistakes (' + review.length + ')</summary>' + review.map(function (r) { return '<div class="rv"><small>' + esc(r.t) + '</small><div>' + reviewLine(r) + '</div></div>'; }).join('') + '</details>' : '') +
        '<div class="nav"><button class="btn ghost" id="again">Try again</button><button class="btn" id="back">More tests</button></div></section>';
      $('#again').onclick = function () { runTest(n); }; $('#back').onclick = function () { home('tests'); };
      beep(score / max >= .5);
      fetch('/api/tests/legacy', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ p: { id: LV.id + '-t' + (n + 1) + '-' + Date.now().toString(36), t: LV.name + ' Practice Test ' + (n + 1), c: 'Young Learners Test Centre', lv: LV.short, s: Object.keys(parts).map(function (k) { return [k, parts[k][0], parts[k][1]]; }) } }) })
        .then(function (r) { $('#saveMsg').innerHTML = r.ok ? '✓ Saved to your profile. Your teacher can see it.' : r.status === 401 || r.status === 403 ? 'Not saved: <a href="/me/#/login" target="_top">sign in</a> to keep your results.' : 'Could not save the result this time.'; })
        .catch(function () { $('#saveMsg').textContent = 'Could not save the result (no internet?).'; });
    }
    draw(); scrollTo(0, 0);
  }
  function reviewLine(r) {
    var it = r.it, K = r.kind, mine = r.a ? esc(K === 'listenColour' ? CNAME(r.a) : r.a) : '—', right = esc(K === 'listenColour' ? CNAME(r.r) : r.r);
    var q = K === 'spell' || K === 'picType' ? pic(it) : K === 'yesNo' || K === 'picWord' ? pic(it[0]) + ' ' + esc(it[1] && typeof it[1] === 'string' ? it[1] : '') : K === 'listenColour' ? pic(it[1]) + ' “' + esc(it[0]) + '”' : esc(Array.isArray(it) ? it[0] : it);
    if (K === 'listenPick') { mine = r.a ? pic(r.a) : '—'; right = pic(r.r); }
    return q + '<br><span class="bad">Your answer: ' + mine + '</span> · <span class="good">Right answer: ' + right + '</span>';
  }

  /* ---------- games ---------- */
  var WORDS = LV.words.filter(function (w) { return Y.P[w]; });
  function gameShell(title, body) { app.innerHTML = '<div class="testbar"><button class="linkbtn" id="quit">← Games</button><span>' + esc(title) + '</span><span class="gscore" id="gs"></span></div><section class="task game">' + body + '</section>'; $('#quit').onclick = function () { stopAll(); home('games'); }; }
  var gTimers = []; function stopAll() { gTimers.forEach(clearInterval); gTimers.forEach(clearTimeout); gTimers = []; try { speechSynthesis.cancel(); } catch (e) {} }
  function gMemory() {
    var ws = shuffle(WORDS).slice(0, 8), cards = shuffle(ws.map(function (w) { return { w: w, f: 'p' }; }).concat(ws.map(function (w) { return { w: w, f: 't' }; }))), open = [], found = 0, tries = 0;
    gameShell('Memory pairs', '<p class="how">Find each picture and its word.</p><div class="mem">' + cards.map(function (c, i) { return '<button class="mc" data-i="' + i + '"><span>' + (c.f === 'p' ? pic(c.w) : esc(c.w)) + '</span></button>'; }).join('') + '</div>');
    $$('.mc').forEach(function (b) {
      b.onclick = function () {
        if (b.classList.contains('up') || open.length === 2) return; b.classList.add('up'); open.push(b);
        if (open.length < 2) return; tries++;
        var a = cards[+open[0].dataset.i], c = cards[+open[1].dataset.i];
        if (a.w === c.w && a.f !== c.f) { found++; beep(true); say(a.w, 1); open.forEach(function (x) { x.classList.add('ok'); }); open = []; if (found === ws.length) $('#gs').textContent = '🎉 All pairs in ' + tries + ' tries!'; else $('#gs').textContent = found + ' / ' + ws.length; }
        else { beep(false); var o = open; open = []; gTimers.push(setTimeout(function () { o.forEach(function (x) { x.classList.remove('up'); }); }, 900)); }
      };
    });
  }
  function gBalloons() {
    var score = 0, round = 0, target = null;
    gameShell('Listen and pop', '<p class="how">Listen to the word, then pop the right balloon! <button class="linkbtn" id="again">🔊 Say it again</button></p><div class="sky" id="sky"></div>');
    $('#again').onclick = function () { if (target) say(target, .8); };
    function next() {
      if (round >= 10) { $('#sky').innerHTML = '<div class="done">🎈 ' + score + ' / 10</div>'; return; }
      round++; var opts = shuffle(WORDS).slice(0, 4); target = opts[0]; opts = shuffle(opts);
      $('#sky').innerHTML = opts.map(function (w, i) { return '<button class="bal" style="left:' + (6 + i * 24) + '%;animation-delay:' + (i * .25) + 's;--h:' + (i * 70) + 'deg" data-v="' + esc(w) + '"><span>' + pic(w) + '</span></button>'; }).join('');
      say(target, .8);
      $$('.bal').forEach(function (b) { b.onclick = function () { var ok = b.dataset.v === target; beep(ok); b.classList.add(ok ? 'pop' : 'shake'); if (ok) { score++; $('#gs').textContent = '⭐ ' + score; gTimers.push(setTimeout(next, 700)); } }; });
    }
    next();
  }
  function gSpelling() {
    var list = shuffle(WORDS.filter(function (w) { return /^[a-z]+$/.test(w) && w.length <= (LV.id === 'starters' ? 5 : 8); })).slice(0, 8), i = 0, score = 0;
    function draw() {
      if (i >= list.length) { gameShell('Spelling bee', '<div class="done">🐝 ' + score + ' / ' + list.length + '</div><div class="nav"><button class="btn" id="re">Play again</button></div>'); $('#re').onclick = gSpelling; return; }
      var w = list[i], word = '';
      gameShell('Spelling bee', '<p class="how">Word ' + (i + 1) + ' of ' + list.length + '. Tap the letters. <button class="linkbtn" id="hear">🔊 Hear it</button></p><div class="big em">' + pic(w) + '</div><div class="slots">' + w.split('').map(function () { return '<span></span>'; }).join('') + '</div><div class="tiles">' + shuffle(w.split('').concat(shuffle('abcdefghijklmnopqrstuvwxyz'.split('')).slice(0, 2))).map(function (c) { return '<button class="tile" data-c="' + c + '">' + c + '</button>'; }).join('') + '</div><button class="linkbtn undo">↺ Start again</button>');
      $('#gs').textContent = '⭐ ' + score; $('#hear').onclick = function () { say(w, .8); };
      var slots = $$('.slots span'), set = function () { slots.forEach(function (s, k) { s.textContent = word[k] || ''; }); };
      $$('.tile').forEach(function (b) {
        b.onclick = function () {
          if (word.length >= w.length) return; word += b.dataset.c; b.disabled = true; set();
          if (word.length === w.length) { var ok = word === w; beep(ok); $('.slots').classList.add(ok ? 'good' : 'bad'); if (ok) { score++; say(w, .9); } else gTimers.push(setTimeout(function () { $('.slots').classList.add('show'); slots.forEach(function (s, k) { s.textContent = w[k]; }); }, 400)); gTimers.push(setTimeout(function () { i++; draw(); }, ok ? 900 : 1800)); }
        };
      });
      $('.undo').onclick = function () { word = ''; set(); $$('.tile').forEach(function (b) { b.disabled = false; }); };
    }
    draw();
  }
  function gSpeed() {
    var score = 0, left = 60, q = null;
    gameShell('Speed match', '<p class="how">Choose the right word for the picture. You have 60 seconds!</p><div class="timer" id="tm">60</div><div id="sq"></div>');
    function next() { var opts = shuffle(WORDS).slice(0, 3); q = opts[0]; $('#sq').innerHTML = '<div class="big em">' + pic(q) + '</div><div class="words">' + shuffle(opts).map(function (w) { return '<button class="w" data-v="' + esc(w) + '">' + esc(w) + '</button>'; }).join('') + '</div>'; $$('#sq .w').forEach(function (b) { b.onclick = function () { var ok = b.dataset.v === q; beep(ok); if (ok) score++; else left = Math.max(0, left - 3); $('#gs').textContent = '⭐ ' + score; next(); }; }); }
    next();
    gTimers.push(setInterval(function () { left--; var t = $('#tm'); if (t) t.textContent = left; if (left <= 0) { stopAll(); var best = Math.max(score, ls.get('yl.' + LV.id + '.speed') || 0); ls.set('yl.' + LV.id + '.speed', best); $('#sq').innerHTML = '<div class="done">⏱ ' + score + ' words!<br><small>Your best: ' + best + '</small></div><div class="nav"><button class="btn" id="re">Play again</button></div>'; $('#re').onclick = gSpeed; } }, 1000));
  }
  var GAMES = [['memory', '🃏', 'Memory pairs', 'Find each picture and its word.', gMemory], ['balloons', '🎈', 'Listen and pop', 'Hear a word and pop the right balloon.', gBalloons], ['spelling', '🐝', 'Spelling bee', 'Build the word with letter tiles.', gSpelling], ['speed', '⏱', 'Speed match', 'How many words in 60 seconds?', gSpeed]];

  /* ---------- home ---------- */
  function home(tab) {
    stopAll(); tab = tab || 'tests'; location.hash = tab;
    var best = ls.get('yl.' + LV.id + '.best') || {}, maxq = LV.tasks.length * 5;
    var other = ['starters', 'movers', 'flyers'].filter(function (x) { return x !== LV.id; });
    app.innerHTML = '<section class="hero"><div><div class="part">IF Young Learners · ' + esc(LV.ages) + '</div><h1>' + esc(LV.name) + '</h1><p>Practice tests in the ' + esc(LV.short) + ' style: listening, reading and writing, marked straight away. Games for every word, and live games with your class.</p>' +
      '<p class="other">Other levels: ' + other.map(function (o) { return '<a href="/a/' + o + '-tests/">' + Y.levels[o].short + '</a>'; }).join(' · ') + '</p></div><div class="mascot">' + (LV.id === 'starters' ? '🧸' : LV.id === 'movers' ? '🚀' : '🦅') + '</div></section>' +
      '<nav class="tabs">' + [['tests', '📝 Tests'], ['games', '🎮 Games'], ['live', '📡 Live games']].map(function (t) { return '<button data-t="' + t[0] + '" class="' + (tab === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</nav><div id="tab"></div>';
    $$('.tabs button').forEach(function (b) { b.onclick = function () { home(b.dataset.t); }; });
    var el = $('#tab');
    if (tab === 'tests') {
      el.innerHTML = '<div class="cards">' + [0, 1, 2].map(function (n) { var inProg = ls.get('yl.' + LV.id + '.t' + n); return '<button class="card" data-n="' + n + '"><span class="tag">' + LV.tasks.length + ' parts · ' + maxq + ' questions</span><h3>Practice Test ' + (n + 1) + '</h3><p>' + LV.tasks.map(function (t) { return esc(t.title); }).slice(0, 3).join(' · ') + ' …</p><span class="go">' + (inProg ? 'Continue →' : best[n] != null ? 'Best: ' + best[n] + '/' + maxq + ' · Try again →' : 'Start →') + '</span></button>'; }).join('') + '</div>' +
        '<p class="hint">🔊 Turn the sound on for the listening parts. Your answers are kept if you stop and come back. Results are saved to your profile when you are signed in.</p>';
      $$('.card[data-n]').forEach(function (b) { b.onclick = function () { runTest(+b.dataset.n); }; });
    } else if (tab === 'games') {
      el.innerHTML = '<div class="cards">' + GAMES.map(function (g) { return '<button class="card game" data-g="' + g[0] + '"><span class="gi">' + g[1] + '</span><h3>' + esc(g[2]) + '</h3><p>' + esc(g[3]) + '</p><span class="go">Play →</span></button>'; }).join('') + '</div><p class="hint">' + WORDS.length + ' ' + esc(LV.short) + ' words with pictures and sound. More games: <a href="/a/young-learners/">IF Young Learners Centre</a>.</p>';
      $$('.card[data-g]').forEach(function (b) { b.onclick = function () { GAMES.filter(function (g) { return g[0] === b.dataset.g; })[0][4](); }; });
    } else {
      el.innerHTML = '<div class="cards"><div class="card live"><span class="gi">👩‍🏫</span><h3>Teachers: start a live game</h3><p>Open IF Live on the classroom screen with the <b>' + esc(LV.short) + '</b> picture questions ready. Pick a mode for little ones: <b>Tug of War</b>, <b>Boss Battle</b>, <b>Balloon Race</b> and more.</p><a class="btn" href="/live/host/?bank=y-' + LV.id + '">Open IF Live →</a></div>' +
        '<div class="card live"><span class="gi">📱</span><h3>Students: join a game</h3><p>Your teacher shows a PIN or a QR code. Type the PIN here.</p><form id="pinf" class="pinf"><input class="ans" id="pin" inputmode="numeric" maxlength="6" placeholder="PIN"><button class="btn">Join</button></form></div></div>';
      $('#pinf').onsubmit = function (e) { e.preventDefault(); var p = $('#pin').value.replace(/\D/g, ''); if (p.length === 6) location.href = '/live/?pin=' + p; };
    }
  }
  var h0 = (location.hash || '').slice(1); home(['tests', 'games', 'live'].indexOf(h0) >= 0 ? h0 : 'tests');
})();
