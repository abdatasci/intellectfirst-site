/* IF Mind Lab — seven short English brain-training games (original IF Academy designs), B1–C2.
   SIGNAL LOCK (focus) · HYPERREAD (reading speed) · ECHO (listening) · GLYPH FORGE (spelling & writing)
   PRECISION (vocabulary) · FAULT LINE (grammar) · VOICE GATE (speaking).
   Scores, best scores, a skill rating per area and the daily session are kept on this device. */
(function () {
  'use strict';
  var D = window.ML_DATA, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var view = $('#view');
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var LEVELS = ['B1', 'B2', 'C1', 'C2'];
  // General English (by level), Business English and IELTS (their own words, texts and sentences; the level sets the speed)
  var TRACKS = { general: 'General', business: 'Business', ielts: 'IELTS' };
  var T = window.ML_TRACKS || {};
  function data(kind, lv) { return (S.tr !== 'general' && T[S.tr] && T[S.tr][kind]) || D[kind][lv]; }
  var tag = function () { return (S.tr === 'general' ? '' : TRACKS[S.tr] + ' · ') + S.lv; };
  var bkey = function (lv, id) { return (S.tr === 'general' ? '' : S.tr + ':') + lv + ':' + id; };
  var day = function () { return new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10); };

  /* ---------- saved state ---------- */
  var KEY = 'ifml.v1', S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
  S.lv = LEVELS.indexOf(S.lv) >= 0 ? S.lv : 'B2'; S.tr = TRACKS[S.tr] ? S.tr : 'general';
  (function () { var q = (location.search.match(/[?&]track=([a-z]+)/) || [])[1]; if (q && TRACKS[q]) S.tr = q; })();   // opened from IF English IELTS / Business
  S.best = S.best || {}; S.rate = S.rate || {}; S.days = S.days || {}; S.plays = S.plays || 0;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  /* ---------- the games ---------- */
  var SK = { focus: 'Focus', speed: 'Reading speed', listen: 'Listening', write: 'Writing', vocab: 'Vocabulary', grammar: 'Grammar', speak: 'Speaking' };
  var GAMES = [
    { id: 'signal', t: 'SIGNAL LOCK', sk: 'focus', c1: '#22d3ee', c2: '#6366f1', p: 'Words stream down three lanes. Lock on to the ones that fit the rule — ignore the rest. Speed rises as you go.', run: signal },
    { id: 'hyper', t: 'HYPERREAD', sk: 'speed', c1: '#a78bfa', c2: '#22d3ee', p: 'Short texts flash a few words at a time, faster each round. Catch the meaning, then answer.', run: hyper },
    { id: 'echo', t: 'ECHO', sk: 'listen', c1: '#38bdf8', c2: '#f472b6', p: 'Nova and Atlas say a sentence once. Rebuild it from the word tiles — two of them are traps.', run: echo },
    { id: 'glyph', t: 'GLYPH FORGE', sk: 'write', c1: '#f472b6', c2: '#a78bfa', p: 'Hear a word, read its meaning, forge the spelling. Long and tricky words score more.', run: glyph },
    { id: 'precise', t: 'PRECISION', sk: 'vocab', c1: '#fbbf24', c2: '#f472b6', p: 'Replace the vague words with the sharpest choice. Fast, precise answers build a combo.', run: precise },
    { id: 'fault', t: 'FAULT LINE', sk: 'grammar', c1: '#fb7185', c2: '#fbbf24', p: 'One word breaks the sentence — or none does. Find the fault before the clock runs out.', run: fault },
    { id: 'voice', t: 'VOICE GATE', sk: 'speak', c1: '#34d399', c2: '#22d3ee', p: 'Read the sentence aloud. The gate opens when every word comes through clearly.', run: voice }
  ];
  var byId = function (id) { return GAMES.filter(function (g) { return g.id === id; })[0]; };

  /* neon emblems, one per game (original line art) */
  function emblem(id, c1, c2) {
    var g = '<defs><linearGradient id="e' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>', s = 'stroke="url(#e' + id + ')" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
    var art = {
      signal: '<circle cx="32" cy="32" r="22" ' + s + '/><circle cx="32" cy="32" r="12" ' + s + ' opacity=".7"/><path d="M32 4v12M32 48v12M4 32h12M48 32h12" ' + s + '/><circle cx="32" cy="32" r="3.5" fill="' + c1 + '"/>',
      hyper: '<path d="M8 20h24M8 32h36M8 44h20" ' + s + '/><path d="M40 14l14 18-14 18" ' + s + '/><path d="M30 14l14 18-14 18" ' + s + ' opacity=".5"/>',
      echo: '<path d="M14 26v12M22 18v28M30 24v16M38 12v40M46 22v20M54 28v8" ' + s + '/>',
      glyph: '<path d="M12 50L32 10l20 40" ' + s + '/><path d="M20 36h24" ' + s + '/><path d="M8 56h48" ' + s + ' opacity=".6"/>',
      precise: '<path d="M32 6l6 20 20 6-20 6-6 20-6-20-20-6 20-6z" ' + s + '/><circle cx="32" cy="32" r="4" fill="' + c1 + '"/>',
      fault: '<path d="M6 32h14l6-14 8 28 6-18 4 8h14" ' + s + '/><path d="M10 52h44" ' + s + ' opacity=".5"/>',
      voice: '<rect x="24" y="8" width="16" height="30" rx="8" ' + s + '/><path d="M14 30a18 18 0 0036 0M32 48v8M22 56h20" ' + s + '/>'
    }[id];
    return '<svg class="em" viewBox="0 0 64 64" aria-hidden="true">' + g + '<g style="filter:drop-shadow(0 0 6px ' + c1 + ')">' + art + '</g></svg>';
  }

  /* ---------- sound (tiny synth, no files) ---------- */
  var AC = null;
  function tone(f, d, type, vol) { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var o = AC.createOscillator(), g = AC.createGain(), n = AC.currentTime; o.type = type || 'sine'; o.frequency.setValueAtTime(f, n); g.gain.setValueAtTime(vol || .06, n); g.gain.exponentialRampToValueAtTime(.0001, n + (d || .15)); o.connect(g); g.connect(AC.destination); o.start(n); o.stop(n + (d || .15)); } catch (e) {} }
  var sfx = { ok: function (k) { tone(660 + (k || 0) * 40, .12, 'triangle'); setTimeout(function () { tone(990 + (k || 0) * 40, .14, 'triangle'); }, 60); }, bad: function () { tone(170, .22, 'sawtooth', .04); }, tick: function () { tone(1200, .04, 'square', .02); }, end: function () { [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { tone(f, .2, 'triangle'); }, i * 110); }); } };

  /* ---------- voice (the real ElevenLabs voice through /voice.js; browser voice as fallback) ---------- */
  function speak(text, g, onEnd) {
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = .95; u.ifVoice = g === 'm' ? 'male' : 'female';
      if (onEnd) u.onend = onEnd;
      speechSynthesis.speak(u);
    } catch (e) { if (onEnd) onEnd(); }
  }
  function hush() { try { speechSynthesis.cancel(); } catch (e) {} }

  function toast(m) { var t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 2400); }
  function floatTxt(el, txt, color, x, y) { var f = document.createElement('div'); f.className = 'float'; f.textContent = txt; f.style.color = color; var r = el.getBoundingClientRect(); f.style.left = (x == null ? r.width / 2 : x) + 'px'; f.style.top = (y == null ? r.height / 2 : y) + 'px'; el.appendChild(f); setTimeout(function () { f.remove(); }, 900); }
  function flash(el, ok) { el.classList.remove('flash-ok', 'flash-bad'); void el.offsetWidth; el.classList.add(ok ? 'flash-ok' : 'flash-bad'); }

  /* ---------- level picker ---------- */
  function drawLevels() {
    $('#lvls').innerHTML = LEVELS.map(function (l) { return '<button data-l="' + l + '" class="' + (l === S.lv ? 'on' : '') + '" aria-pressed="' + (l === S.lv) + '">' + l + '</button>'; }).join('');
    $$('#lvls button').forEach(function (b) { b.onclick = function () { S.lv = b.dataset.l; save(); drawLevels(); if (!RUN) route(); else toast('The new level starts with your next game.'); }; });
    $('#trks').innerHTML = Object.keys(TRACKS).map(function (k) { return '<button data-t="' + k + '" class="' + (k === S.tr ? 'on' : '') + '" aria-pressed="' + (k === S.tr) + '">' + TRACKS[k] + '</button>'; }).join('');
    $$('#trks button').forEach(function (b) { b.onclick = function () { S.tr = b.dataset.t; save(); drawLevels(); if (!RUN) route(); else toast('The new content starts with your next game.'); }; });
  }

  /* ---------- home ---------- */
  function todays() {   // three games for today's session, chosen by date so everyone's day has a plan
    var d = day(), seed = 0; for (var i = 0; i < d.length; i++) seed = (seed * 31 + d.charCodeAt(i)) % 9973;
    var order = GAMES.map(function (g, i) { return { g: g, k: (seed * (i + 7)) % 101 }; }).sort(function (a, b) { return a.k - b.k; });
    return order.slice(0, 3).map(function (x) { return x.g; });
  }
  function streak() { var n = 0, d = function (k) { return new Date(Date.now() + 5 * 3600e3 - k * 864e5).toISOString().slice(0, 10); }, k = S.days[d(0)] ? 0 : 1; while (S.days[d(k)]) { n++; k++; } return n; }
  function radar() {
    var keys = Object.keys(SK), n = keys.length, cx = 150, cy = 140, R = 100, pt = function (i, r) { var a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
    var grid = [0.25, 0.5, 0.75, 1].map(function (f) { return '<polygon points="' + keys.map(function (_, i) { return pt(i, R * f).join(','); }).join(' ') + '" fill="none" stroke="rgba(148,178,255,' + (f === 1 ? .35 : .14) + ')"/>'; }).join('');
    var axes = keys.map(function (_, i) { var p = pt(i, R); return '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="rgba(148,178,255,.12)"/>'; }).join('');
    var val = function (k) { return Math.max(.06, Math.min(1, (S.rate[k] || 0) / 1000)); };
    var poly = keys.map(function (k, i) { return pt(i, R * val(k)).join(','); }).join(' ');
    var labels = keys.map(function (k, i) { var p = pt(i, R + 22); return '<text x="' + p[0] + '" y="' + (p[1] + 3) + '" text-anchor="middle">' + SK[k].toUpperCase() + '</text><text x="' + p[0] + '" y="' + (p[1] + 15) + '" text-anchor="middle" style="fill:#fff;font-size:10px">' + Math.round(S.rate[k] || 0) + '</text>'; }).join('');
    return '<svg class="radar" viewBox="-40 -6 380 296" role="img" aria-label="Your skill ratings"><defs><linearGradient id="rgr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee" stop-opacity=".55"/><stop offset="1" stop-color="#a78bfa" stop-opacity=".45"/></linearGradient></defs>' + grid + axes +
      '<polygon points="' + poly + '" fill="url(#rgr)" stroke="#67e8f9" stroke-width="2" style="filter:drop-shadow(0 0 8px rgba(34,211,238,.6))"/>' + keys.map(function (k, i) { var p = pt(i, R * val(k)); return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" fill="#fff"/>'; }).join('') + labels + '</svg>';
  }
  var GREET = ['Welcome to the Mind Lab. Three short games a day keep your English sharp. Pick your level, and let\'s begin.', 'Good to see you again. Today\'s session is ready: three games, about six minutes.', 'Focus, speed, precision. Let\'s train your English brain.'];
  function vHome() {
    hush(); RUN = null;
    var td = todays(), done = S.days[day()] || {}, st = streak(), total = Object.keys(SK).reduce(function (a, k) { return a + (S.rate[k] || 0); }, 0);
    view.innerHTML =
      '<section class="hero"><div class="glass intro"><p class="eyebrow">IF Academy · ' + (S.tr === 'general' ? 'General English' : S.tr === 'business' ? 'Business English' : 'IELTS') + ' · ' + S.lv + '</p><h1>Train your English brain.</h1>' +
        '<p class="lead">Seven fast games that sharpen how you focus, read, listen, write, choose words, check grammar and speak — in English, at your level. One round takes about two minutes.</p>' +
        '<div class="chiprow"><a class="btn" href="#/play/' + td.filter(function (g) { return !done[g.id]; }).concat(td)[0].id + '">▶ ' + (Object.keys(done).length ? 'Continue today\'s session' : 'Start today\'s session') + '</a>' +
        '<span class="stat">🔥 <b>' + st + '</b> day' + (st === 1 ? '' : 's') + '</span><span class="stat">⚡ Mind score <b>' + Math.round(total) + '</b></span></div></div>' +
      '<div class="glass host">' + (window.IFBots ? IFBots.html('f', 'Nova', true) : '') + '<p class="bubble" id="bub">Tap to hear Nova.</p><button class="btn ghost" id="hi">🔊 Brief me</button></div></section>' +
      '<section class="row2"><div class="glass panel"><h2>Today\'s session</h2><div class="today">' + td.map(function (g) { return '<a href="#/play/' + g.id + '" class="' + (done[g.id] ? 'done' : '') + '">' + emblem(g.id, g.c1, g.c2) + '<span class="k">' + g.t + '<small>' + SK[g.sk] + (S.best[bkey(S.lv, g.id)] ? ' · best ' + S.best[bkey(S.lv, g.id)] : '') + '</small></span></a>'; }).join('') + '</div></div>' +
      '<div class="glass panel"><h2>Your skill map</h2>' + radar() + '</div></section>' +
      '<div class="sec"><h2>All games</h2><p>' + tag() + ' · change it at the top</p></div>' +
      '<section class="games">' + GAMES.map(function (g) { var b = S.best[bkey(S.lv, g.id)]; return '<a class="gcard" style="--c1:' + g.c1 + ';--c2:' + g.c2 + '" href="#/play/' + g.id + '">' + emblem(g.id, g.c1, g.c2) + '<span class="sk">' + SK[g.sk] + '</span><h3>' + g.t + '</h3><p>' + esc(g.p) + '</p><span class="best">' + (b ? 'Best at ' + tag() + ': <b>' + b + '</b>' : 'Not played at ' + tag() + ' yet') + '</span></a>'; }).join('') + '</section>' +
      '<p class="note">All the words, texts and sentences are written by IF Academy for B1–C2 learners. Listening uses IF Academy\'s natural British voices. Speaking works best in Chrome, Edge or Safari with a microphone.</p>';
    $('#hi').onclick = function () { var m = GREET[S.plays % GREET.length]; $('#bub').textContent = m; speak(m, 'f'); };
  }

  /* ---------- game runner ---------- */
  var RUN = null;
  function vPlay(id) {
    var g = byId(id); if (!g) return go('#/');
    hush(); RUN = { g: g, lv: S.lv, score: 0, combo: 1, maxCombo: 1, right: 0, wrong: 0, log: [], timers: [], alive: true };
    view.innerHTML = '<div class="glass hud"><button class="quit" id="qt" aria-label="Quit">✕</button><div class="gt">' + emblem(g.id, g.c1, g.c2) + '<div><b>' + g.t + '</b><small>' + SK[g.sk] + ' · ' + tag() + '</small></div></div>' +
      '<div class="num combo"><b id="cb">×1</b><small>COMBO</small></div><div class="num"><b id="sc">0</b><small>SCORE</small></div>' +
      '<svg class="ring" viewBox="0 0 60 60" id="rg"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + g.c1 + '"/><stop offset="1" stop-color="' + g.c2 + '"/></linearGradient></defs><circle class="bgc" cx="30" cy="30" r="25"/><circle class="fg" id="rf" cx="30" cy="30" r="25" stroke-dasharray="157.1" stroke-dashoffset="0" transform="rotate(-90 30 30)"/><text x="30" y="35" text-anchor="middle" id="rt">–</text></svg></div>' +
      '<div class="glass arena" id="ar"></div>';
    $('#qt').onclick = function () { stop(); go('#/'); };
    var ar = $('#ar'), n = 3;
    ar.innerHTML = '<p class="eyebrow">' + SK[g.sk] + ' · ' + tag() + '</p><h2 style="font-size:clamp(22px,4vw,34px)">' + g.t + '</h2><p class="sub" style="max-width:560px">' + esc(g.p) + '</p><div class="countdown" id="cd">3</div>';
    var cd = setInterval(function () { if (!RUN || RUN.g !== g) return clearInterval(cd); n--; sfx.tick(); if (n > 0) { $('#cd').textContent = n; $('#cd').style.animation = 'none'; void $('#cd').offsetWidth; $('#cd').style.animation = ''; } else { clearInterval(cd); g.run(ar, api()); } }, 750);
    RUN.timers.push(cd);
  }
  function api() {
    var R = RUN;
    return {
      lv: R.lv,
      add: function (pts, el, x, y) { if (!R.alive) return; var p = Math.round(pts * R.combo); R.score += p; R.right++; R.combo = Math.min(5, R.combo + .25); R.maxCombo = Math.max(R.maxCombo, R.combo); hud(); sfx.ok(Math.floor(R.combo)); if (el) floatTxt(el, '+' + p, '#34d399', x, y); },
      miss: function (pen, el, x, y) { if (!R.alive) return; R.score = Math.max(0, R.score - (pen || 0)); R.wrong++; R.combo = 1; hud(); sfx.bad(); if (el && pen) floatTxt(el, '−' + pen, '#fb7185', x, y); },
      log: function (ok, txt) { R.log.push({ ok: ok, t: txt }); },
      clock: function (sec, onEnd) { var t0 = Date.now(), iv = setInterval(function () { if (!R.alive) return clearInterval(iv); var left = Math.max(0, sec - (Date.now() - t0) / 1000); ring(left / sec, Math.ceil(left)); if (left <= 0) { clearInterval(iv); onEnd ? onEnd() : finish(); } }, 100); R.timers.push(iv); },
      steps: function (i, n) { ring(1 - i / n, (i + 1 > n ? n : i + 1) + '/' + n); },
      later: function (f, ms) { var t = setTimeout(function () { if (R.alive) f(); }, ms); R.timers.push(t); return t; },
      end: function () { finish(); },
      alive: function () { return R.alive && RUN === R; }
    };
  }
  function hud() { $('#sc').textContent = RUN.score; $('#cb').textContent = '×' + (Math.round(RUN.combo * 4) / 4).toString().replace(/\.0+$/, ''); }
  function ring(f, txt) { var rf = $('#rf'), rt = $('#rt'); if (rf) rf.style.strokeDashoffset = (157.1 * (1 - f)).toFixed(1); if (rt) { rt.textContent = txt; rt.style.fontSize = String(txt).length > 3 ? '12px' : '15px'; } }
  function stop() { if (!RUN) return; RUN.alive = false; RUN.timers.forEach(function (t) { clearInterval(t); clearTimeout(t); }); if (RUN.raf) cancelAnimationFrame(RUN.raf); if (RUN.rec) try { RUN.rec.abort(); } catch (e) {} hush(); }
  function finish() {
    if (!RUN || !RUN.alive) return;
    var R = RUN, g = R.g; stop();
    var tries = R.right + R.wrong, acc = tries ? Math.round(R.right / tries * 100) : 0, k = bkey(R.lv, g.id), rec = R.score > (S.best[k] || 0);
    if (rec) S.best[k] = R.score;
    // skill rating 0–1000: harder levels count for more; a moving average so one bad round doesn't wipe progress
    var perf = Math.min(1, (acc / 100) * .7 + Math.min(1, R.score / ({ signal: 900, hyper: 700, echo: 600, glyph: 700, precise: 900, fault: 800, voice: 450 }[g.id])) * .3);
    var target = perf * (550 + LEVELS.indexOf(R.lv) * 150), old = S.rate[g.sk] || 0;
    S.rate[g.sk] = old ? old * .65 + target * .35 : target;
    S.days[day()] = S.days[day()] || {}; S.days[day()][g.id] = 1; S.plays++;
    save(); sfx.end();
    var td = todays(), done = S.days[day()], nxt = td.filter(function (x) { return !done[x.id]; })[0];
    view.innerHTML = '<div class="glass result"><p class="eyebrow">' + g.t + ' · ' + tag() + '</p>' + (rec ? '<span class="rec">★ NEW PERSONAL BEST</span>' : '') +
      '<div class="big">' + R.score + '</div><p class="sub">' + (acc >= 85 ? 'Outstanding precision.' : acc >= 65 ? 'Strong round — keep the combo alive next time.' : 'Good training. Slow down a little and aim for accuracy.') + '</p>' +
      '<div class="grid3"><div><b>' + acc + '%</b><small>Accuracy</small></div><div><b>×' + (Math.round(R.maxCombo * 4) / 4) + '</b><small>Top combo</small></div><div><b>' + Math.round(S.rate[g.sk]) + '</b><small>' + SK[g.sk] + '</small></div></div>' +
      '<div class="chiprow" style="justify-content:center"><a class="btn" href="#/play/' + g.id + '?r=' + Date.now() + '">↻ Play again</a>' + (nxt ? '<a class="btn gold" href="#/play/' + nxt.id + '">Next: ' + nxt.t + ' →</a>' : '<a class="btn gold" href="#/">Session complete ✓</a>') + '<a class="btn ghost" href="#/">Mind Lab</a></div>' +
      (R.log.length ? '<ul class="review">' + R.log.filter(function (x) { return !x.ok; }).slice(0, 6).map(function (x) { return '<li>' + x.t + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    RUN = null;
  }

  /* ===== 1. SIGNAL LOCK — focus ===== */
  function signal(ar, A) {
    var set = shuffle(data('focus', A.lv))[0], yes = shuffle(set.y), no = shuffle(set.n), drops = [], lane = 0, spawnEvery = 1150, last = 0, t0 = performance.now();
    ar.innerHTML = '<div class="rule">Tap only<b>' + esc(set.r) + '</b></div><div class="lanes" id="ln"></div><div class="floor"></div>';
    var ln = $('#ln'), H = function () { return ln.clientHeight; }, W = function () { return ln.clientWidth; };
    var pool = function () { var w = Math.random() < .5 ? yes : no; if (!w.length) w = yes.length ? yes : no; if (!w.length) { yes = shuffle(set.y); no = shuffle(set.n); w = yes; } return { w: w.shift(), ok: w === yes || set.y.indexOf(w[0]) >= 0 }; };
    function spawn() {
      var it = pool(); it.ok = set.y.indexOf(it.w) >= 0; lane = (lane + 1 + Math.floor(Math.random() * 2)) % 3;
      var el = document.createElement('button'); el.className = 'drop'; el.textContent = it.w; el.style.left = ((lane + .5) / 3 * 100) + '%';
      var d = { el: el, y: -50, v: 0.05 + (performance.now() - t0) / 45000 * .05 + LEVELS.indexOf(A.lv) * .006, ok: it.ok, w: it.w, gone: false };
      el.onpointerdown = function (ev) { ev.preventDefault(); if (d.gone) return; d.gone = true; var r = el.getBoundingClientRect(), ar2 = ar.getBoundingClientRect();
        if (d.ok) { el.classList.add('hit'); A.add(10, ar, r.left - ar2.left + r.width / 2, r.top - ar2.top); A.log(true, d.w); }
        else { el.classList.add('miss'); A.miss(5, ar, r.left - ar2.left + r.width / 2, r.top - ar2.top); flash(ar, false); A.log(false, '<b>' + esc(d.w) + '</b> does not fit “' + esc(set.r) + '”'); }
        setTimeout(function () { el.remove(); }, 350); };
      ln.appendChild(el); drops.push(d);
    }
    var prev = performance.now();
    function loop(now) {
      if (!A.alive()) return; var dt = Math.min(50, now - prev); prev = now;
      if (now - last > spawnEvery) { spawn(); last = now; spawnEvery = Math.max(560, spawnEvery - 12); }
      var h = H();
      drops.forEach(function (d) { if (d.gone) return; d.y += d.v * dt; d.el.style.transform = 'translate(-50%,' + d.y.toFixed(1) + 'px)';
        if (d.y > h - 10) { d.gone = true; d.el.classList.add(d.ok ? 'miss' : 'hit'); setTimeout(function () { d.el.remove(); }, 350); if (d.ok) { A.miss(0); A.log(false, 'Missed <b>' + esc(d.w) + '</b> — it fits “' + esc(set.r) + '”'); } } });
      drops = drops.filter(function (d) { return !d.gone || d.el.isConnected; });
      RUN.raf = requestAnimationFrame(loop);
    }
    RUN.raf = requestAnimationFrame(loop);
    A.clock(45);
  }

  /* ===== 2. HYPERREAD — reading speed ===== */
  function hyper(ar, A) {
    var texts = shuffle(data('read', A.lv)).slice(0, 4), i = 0, wpm = 220 + LEVELS.indexOf(A.lv) * 30;
    function next() {
      if (i >= texts.length) return A.end();
      A.steps(i, texts.length);
      var tx = texts[i], words = tx.t.split(/\s+/), chunks = []; for (var k = 0; k < words.length; k += 3) chunks.push(words.slice(k, k + 3).join(' '));
      ar.innerHTML = '<p class="wpm">TEXT ' + (i + 1) + ' / ' + texts.length + ' · ' + wpm + ' WORDS A MINUTE</p><div class="reticle"><span class="w" id="w">Ready…</span></div><p class="sub">Keep your eyes on the centre.</p>';
      var c = 0, per = 60000 / wpm * 3;
      A.later(function show() { var w = $('#w'); if (!w) return; if (c >= chunks.length) return ask(); w.textContent = chunks[c++]; A.later(show, per + (/[.,;:]$/.test(chunks[c - 1]) ? 120 : 0)); }, 900);
      function ask() {
        var o = tx.o.map(function (x, k) { return { x: x, k: k }; }), sh = shuffle(o), t1 = Date.now();
        ar.innerHTML = '<p class="wpm">' + wpm + ' WPM</p><p class="prompt">' + esc(tx.q) + '</p><div class="opts">' + sh.map(function (x) { return '<button class="opt" data-k="' + x.k + '">' + esc(x.x) + '</button>'; }).join('') + '</div>';
        $$('.opt', ar).forEach(function (b) { b.onclick = function () {
          var ok = +b.dataset.k === tx.a; $$('.opt', ar).forEach(function (x) { x.disabled = true; if (+x.dataset.k === tx.a) x.classList.add('ok'); }); if (!ok) b.classList.add('bad');
          if (ok) { A.add(100 + Math.round(wpm / 5) + Math.max(0, 40 - Math.round((Date.now() - t1) / 250)), ar); wpm += 45; } else { A.miss(0); wpm = Math.max(160, wpm - 30); A.log(false, '<b>' + esc(tx.q) + '</b> → ' + esc(tx.o[tx.a])); }
          flash(ar, ok); i++; A.later(next, 1100);
        }; });
      }
    }
    next();
  }

  /* ===== 3. ECHO — listening ===== */
  function echo(ar, A) {
    var items = shuffle(data('echo', A.lv)).slice(0, 5), i = 0;
    function next() {
      if (i >= items.length) return A.end();
      A.steps(i, items.length);
      var it = items[i], g = i % 2 ? 'm' : 'f', words = it.s.replace(/[.?!]$/, '').split(' '), punct = (it.s.match(/[.?!]$/) || ['.'])[0], replays = 0, pick = [];
      var tiles = shuffle(words.map(function (w, k) { return { w: w, k: k } }).concat(it.x.map(function (w) { return { w: w, k: -1 }; })));
      ar.innerHTML = '<div class="echohost">' + (window.IFBots ? IFBots.html(g, g === 'm' ? 'Atlas' : 'Nova', true) : '') + '</div><p class="sub">Listen, then build the sentence. <button class="btn ghost" id="rp" style="padding:6px 12px;font-size:13px;margin-left:6px">🔊 Replay (−20)</button></p><div class="built" id="bt"></div><div class="bank" id="bk"></div><p style="margin-top:18px"><button class="btn" id="ck" disabled>Check</button></p>';
      function draw() {
        $('#bt').innerHTML = pick.map(function (t, p) { return '<button class="tile" data-p="' + p + '">' + esc(t.w) + '</button>'; }).join('') || '<span class="sub" style="margin:0">Tap the tiles in order</span>';
        $('#bk').innerHTML = tiles.map(function (t, k) { return '<button class="tile' + (pick.indexOf(t) >= 0 ? ' used' : '') + '" data-k="' + k + '">' + esc(t.w) + '</button>'; }).join('');
        $$('#bk .tile').forEach(function (b) { b.onclick = function () { var t = tiles[+b.dataset.k]; if (pick.indexOf(t) < 0) { pick.push(t); sfx.tick(); draw(); } }; });
        $$('#bt .tile').forEach(function (b) { b.onclick = function () { pick.splice(+b.dataset.p, 1); draw(); }; });
        $('#ck').disabled = pick.length < words.length - 1;
      }
      draw();
      A.later(function () { speak(it.s, g); }, 500);
      $('#rp').onclick = function () { replays++; speak(it.s, g); };
      $('#ck').onclick = function () {
        var got = pick.map(function (t) { return t.w; }), right = 0; words.forEach(function (w, k) { if (got[k] === w) right++; });
        var exact = got.join(' ') === words.join(' ');
        $$('#bt .tile').forEach(function (b, p) { b.classList.add(got[p] === words[p] ? 'ok' : 'bad'); });
        if (exact) A.add(Math.max(40, 120 - replays * 20), ar); else { A.miss(0); if (right / words.length > .6) { RUN.score += Math.round(right / words.length * 40); hud(); } A.log(false, '<b>' + esc(it.s) + '</b>'); }
        flash(ar, exact);
        $('#ck').disabled = true; $('#rp').disabled = true;
        var bt = $('#bt'); bt.insertAdjacentHTML('afterend', '<p class="fix">' + (exact ? '<b>Perfect echo.</b>' : 'It was: <b>' + esc(it.s) + '</b>') + '</p>');
        i++; A.later(next, exact ? 1200 : 2600);
      };
    }
    next();
  }

  /* ===== 4. GLYPH FORGE — spelling and writing ===== */
  function glyph(ar, A) {
    var list = shuffle(data('spell', A.lv)), i = 0;
    function next() {
      if (!A.alive()) return;
      var it = list[i++ % list.length], w = it[0], hint = 0;
      ar.innerHTML = '<p class="eyebrow">Meaning</p><p class="prompt">' + esc(it[1]) + '</p><div class="slots" id="sl">' + w.split('').map(function () { return '<i></i>'; }).join('') + '</div>' +
        '<input class="ginput" id="gi" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Type the word" maxlength="' + (w.length + 4) + '">' +
        '<p style="margin-top:14px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="btn ghost" id="sy">🔊 Hear it</button><button class="btn ghost" id="hn">💡 Letter (−10)</button><button class="btn" id="go">Forge ↵</button></p>';
      var gi = $('#gi'), sl = $$('#sl i');
      var paint = function () { var v = gi.value.toLowerCase(); sl.forEach(function (s, k) { s.textContent = k < hint ? w[k] : (v[k] || ''); s.classList.toggle('f', k < hint || !!v[k]); }); };
      gi.oninput = paint; setTimeout(function () { gi.focus(); }, 30);
      speak(w, Math.random() < .5 ? 'f' : 'm');
      $('#sy').onclick = function () { speak(w, 'f'); gi.focus(); };
      $('#hn').onclick = function () { if (hint < w.length - 1) { hint++; RUN.score = Math.max(0, RUN.score - 10); hud(); if (gi.value.length < hint) gi.value = w.slice(0, hint); paint(); } gi.focus(); };
      var check = function () {
        var v = gi.value.trim().toLowerCase(); if (!v) return; var ok = v === w.toLowerCase();
        $('#sl').classList.add(ok ? 'ok' : 'bad'); sl.forEach(function (s, k) { s.textContent = w[k]; });
        if (ok) A.add(Math.max(10, w.length * 9 - hint * 5), ar); else { A.miss(0); A.log(false, 'You wrote <b>' + esc(v) + '</b> → <b>' + esc(w) + '</b>'); }
        flash(ar, ok); gi.disabled = true; A.later(next, ok ? 650 : 1700);
      };
      $('#go').onclick = check; gi.onkeydown = function (e) { if (e.key === 'Enter') check(); };
    }
    A.clock(75); next();
  }

  /* ===== 5. PRECISION — vocabulary ===== */
  function precise(ar, A) {
    var list = shuffle(data('precise', A.lv)), i = 0;
    function next() {
      if (!A.alive()) return;
      var it = list[i++ % list.length], t1 = Date.now(), o = shuffle(it.o.map(function (x, k) { return { x: x, k: k }; }));
      ar.innerHTML = '<p class="eyebrow">Replace the highlighted words</p><p class="prompt">' + esc(it.s).replace(/\[(.+?)\]/, '<span class="hl">$1</span>') + '</p><div class="opts">' + o.map(function (x) { return '<button class="opt" data-k="' + x.k + '">' + esc(x.x) + '</button>'; }).join('') + '</div>';
      $$('.opt', ar).forEach(function (b) { b.onclick = function () {
        var ok = +b.dataset.k === it.a; $$('.opt', ar).forEach(function (x) { x.disabled = true; if (+x.dataset.k === it.a) x.classList.add('ok'); }); if (!ok) b.classList.add('bad');
        if (ok) A.add(40 + Math.max(0, 30 - Math.round((Date.now() - t1) / 150)), ar); else { A.miss(10, ar); A.log(false, esc(it.s.replace(/\[(.+?)\]/, '“$1”')) + ' → <b>' + esc(it.o[it.a]) + '</b>'); }
        flash(ar, ok); A.later(next, ok ? 550 : 1300);
      }; });
    }
    A.clock(60); next();
  }

  /* ===== 6. FAULT LINE — grammar ===== */
  function fault(ar, A) {
    var list = shuffle(data('fault', A.lv)), i = 0;
    function next() {
      if (!A.alive()) return;
      var it = list[i++ % list.length], ws = it.s.split(' '), t1 = Date.now();
      ar.innerHTML = '<p class="eyebrow">Tap the wrong word</p><div class="sent">' + ws.map(function (w, k) { return '<button data-k="' + k + '">' + esc(w) + '</button>'; }).join('') + '</div><p style="margin-top:20px"><button class="btn ghost" data-k="-1">✓ No error</button></p><p class="fix" id="fx"></p>';
      $$('[data-k]', ar).forEach(function (b) { b.onclick = function () {
        var k = +b.dataset.k, ok = k === it.b;
        $$('[data-k]', ar).forEach(function (x) { x.disabled = true; }); b.classList.add(ok ? 'ok' : 'bad'); if (!ok && it.b >= 0) $$('.sent button', ar)[it.b].classList.add('ok');
        $('#fx').innerHTML = it.b < 0 ? (ok ? '<b>Correct — this sentence has no error.</b>' : 'This sentence was correct.') : 'Correction: <b>' + esc(it.f) + '</b>';
        if (ok) A.add(50 + Math.max(0, 30 - Math.round((Date.now() - t1) / 200)), ar); else { A.miss(10, ar); A.log(false, esc(it.s) + (it.b >= 0 ? ' → <b>' + esc(it.f) + '</b>' : ' → <b>no error</b>')); }
        flash(ar, ok); A.later(next, ok ? 1100 : 2200);
      }; });
    }
    A.clock(60); next();
  }

  /* ===== 7. VOICE GATE — speaking ===== */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var norm = function (s) { return String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean); };
  function voice(ar, A) {
    var items = shuffle(data('speak', A.lv)).slice(0, 4), i = 0;
    var micSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>';
    function next() {
      if (i >= items.length) return A.end();
      A.steps(i, items.length);
      var s = items[i], want = norm(s), tries = 0;
      ar.innerHTML = '<p class="eyebrow">Read it aloud</p><p class="prompt">' + esc(s) + '</p><button class="mic" id="mc" aria-label="Speak">' + micSvg + '</button><p class="heard" id="hd">' + (SR ? 'Press the button, then read the sentence clearly.' : 'Your browser cannot listen. Read the sentence aloud, then rate yourself.') + '</p>' +
        '<p style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:10px"><button class="btn ghost" id="md">🔊 Hear the model</button>' + (SR ? '<button class="btn ghost" id="sk">Skip</button>' : '<button class="btn" id="ys">I said it clearly</button><button class="btn ghost" id="sk">Needs practice</button>') + '</p>';
      $('#md').onclick = function () { speak(s, i % 2 ? 'm' : 'f'); };
      $('#sk').onclick = function () { A.miss(0); A.log(false, 'Practise: <b>' + esc(s) + '</b>'); i++; next(); };
      if (!SR) { $('#ys').onclick = function () { A.add(60, ar); i++; A.later(next, 500); }; $('#mc').onclick = function () { $('#hd').textContent = 'Read it aloud, then choose below.'; }; return; }
      $('#mc').onclick = function () {
        var mc = this, r = new SR(); RUN.rec = r; r.lang = 'en-GB'; r.interimResults = false; r.maxAlternatives = 3; mc.classList.add('live'); mc.disabled = true; var t1 = Date.now();
        $('#hd').textContent = 'Listening…';
        r.onresult = function (ev) {
          var best = null, bs = -1;
          for (var k = 0; k < ev.results[0].length; k++) { var said = norm(ev.results[0][k].transcript), hit = want.filter(function (w) { return said.indexOf(w) >= 0; }).length / want.length; if (hit > bs) { bs = hit; best = said; } }
          var pct = Math.round(bs * 100); tries++;
          $('#hd').innerHTML = want.map(function (w) { return '<span class="' + (best.indexOf(w) >= 0 ? 'w-ok' : 'w-no') + '">' + esc(w) + '</span>'; }).join(' ') + ' · <b>' + pct + '%</b>';
          if (pct >= 80) { A.add(Math.round(pct * .9) + Math.max(0, 30 - Math.round((Date.now() - t1) / 400)), ar); flash(ar, true); i++; A.later(next, 1500); }
          else if (tries >= 3) { A.miss(0); A.log(false, 'Practise: <b>' + esc(s) + '</b>'); flash(ar, false); i++; A.later(next, 1800); }
          else { sfx.bad(); RUN.combo = 1; hud(); $('#hd').innerHTML += '<br>Almost — try again (' + (3 - tries) + ' left).'; }
        };
        r.onerror = function (ev) { $('#hd').textContent = ev.error === 'not-allowed' ? 'The microphone is blocked. Allow it in the address bar, or press Skip.' : 'I could not hear you. Try again.'; };
        r.onend = function () { mc.classList.remove('live'); mc.disabled = false; };
        try { r.start(); } catch (e) { mc.classList.remove('live'); mc.disabled = false; }
      };
    }
    next();
  }

  /* ---------- the night city behind everything (original procedural art) ---------- */
  (function city() {
    var cv = $('#city'), cx = cv.getContext('2d'), W, H, dpr, layers = [], stars = [], craft = [], t = 0, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function build() {
      dpr = Math.min(2, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = []; for (var i = 0; i < 140; i++) stars.push({ x: rnd(0, W), y: rnd(0, H * .55), r: rnd(.3, 1.3), p: rnd(0, 6) });
      layers = [{ c1: '#0d1438', c2: '#0a0f2c', h: [.25, .55], w: [40, 90], win: .18, sp: .04, rim: '#6366f1' }, { c1: '#111a48', c2: '#0b1234', h: [.18, .42], w: [50, 110], win: .32, sp: .09, rim: '#22d3ee' }, { c1: '#151f55', c2: '#0a102e', h: [.1, .3], w: [70, 150], win: .5, sp: .16, rim: '#a78bfa' }].map(function (L) {
        var b = [], x = -80; while (x < W * 1.6 + 200) { var w = rnd(L.w[0], L.w[1]), h = H * rnd(L.h[0], L.h[1]); b.push({ x: x, w: w, h: h, top: Math.floor(rnd(0, 4)), ant: Math.random() < .35, seed: Math.random() * 1000 }); x += w + rnd(6, 30); }
        L.b = b; L.span = x; return L;
      });
      craft = []; for (var c = 0; c < 5; c++) craft.push({ x: rnd(0, W), y: rnd(H * .12, H * .5), v: rnd(.3, .9) * (Math.random() < .5 ? -1 : 1), col: Math.random() < .5 ? '#22d3ee' : '#f472b6' });
    }
    function tower(L, b, ox, base) {
      var x = b.x - ox, top = base - b.h;
      if (x > W + 50 || x + b.w < -50) return;
      var g = cx.createLinearGradient(x, top, x + b.w, base); g.addColorStop(0, L.c1); g.addColorStop(1, L.c2); cx.fillStyle = g;
      cx.beginPath();
      if (b.top === 0) { cx.moveTo(x, base); cx.lineTo(x, top + 18); cx.lineTo(x + b.w / 2, top); cx.lineTo(x + b.w, top + 18); cx.lineTo(x + b.w, base); }
      else if (b.top === 1) { cx.moveTo(x, base); cx.lineTo(x + b.w * .12, top); cx.lineTo(x + b.w * .88, top); cx.lineTo(x + b.w, base); }
      else if (b.top === 2) { cx.moveTo(x, base); cx.lineTo(x, top + b.w * .5); cx.arc(x + b.w / 2, top + b.w * .5, b.w / 2, Math.PI, 0); cx.lineTo(x + b.w, base); }
      else { cx.moveTo(x, base); cx.lineTo(x, top); cx.lineTo(x + b.w * .6, top); cx.lineTo(x + b.w * .6, top - 14); cx.lineTo(x + b.w, top - 14); cx.lineTo(x + b.w, base); }
      cx.closePath(); cx.fill();
      // neon edge
      cx.strokeStyle = L.rim; cx.globalAlpha = .35; cx.lineWidth = 1; cx.stroke(); cx.globalAlpha = 1;
      // windows
      var cols = Math.max(2, Math.floor(b.w / 9)), rows = Math.floor(b.h / 11);
      for (var r = 2; r < rows; r++) for (var c = 1; c < cols; c++) {
        var n = Math.sin(b.seed + r * 12.9898 + c * 78.233) * 43758.5453; n -= Math.floor(n);
        if (n < L.win) { var flick = n < .02 ? (Math.sin(t * .05 + b.seed) > 0 ? 1 : .3) : 1; cx.fillStyle = n < L.win * .3 ? 'rgba(251,191,36,' + (.75 * flick) + ')' : n < L.win * .7 ? 'rgba(125,211,252,' + (.6 * flick) + ')' : 'rgba(196,181,253,' + (.5 * flick) + ')'; cx.fillRect(x + c * (b.w / cols) - 1.5, base - b.h + r * 11, 3, 4); }
      }
      if (b.ant) { cx.strokeStyle = 'rgba(148,178,255,.5)'; cx.beginPath(); cx.moveTo(x + b.w / 2, top - (b.top === 3 ? 14 : 0)); cx.lineTo(x + b.w / 2, top - 34); cx.stroke(); cx.fillStyle = Math.sin(t * .08 + b.seed) > 0 ? '#fb7185' : 'rgba(251,113,133,.25)'; cx.beginPath(); cx.arc(x + b.w / 2, top - 35, 2.2, 0, 7); cx.fill(); }
    }
    function draw() {
      t++;
      var sky = cx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#03040d'); sky.addColorStop(.45, '#0a0f33'); sky.addColorStop(.75, '#1b1550'); sky.addColorStop(1, '#2a0f45'); cx.fillStyle = sky; cx.fillRect(0, 0, W, H);
      stars.forEach(function (s) { cx.globalAlpha = .35 + Math.sin(t * .03 + s.p) * .3; cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 7); cx.fill(); }); cx.globalAlpha = 1;
      // the orbital ring over the city
      var rx = W * .62, ry = H * .3, R = Math.min(W, H) * .42;
      cx.save(); cx.translate(rx, ry); cx.rotate(-.22); cx.scale(1, .26);
      var rg = cx.createLinearGradient(-R, 0, R, 0); rg.addColorStop(0, 'rgba(34,211,238,0)'); rg.addColorStop(.5, 'rgba(34,211,238,.55)'); rg.addColorStop(1, 'rgba(167,139,250,0)');
      cx.strokeStyle = rg; cx.lineWidth = 10; cx.beginPath(); cx.arc(0, 0, R, 0, 7); cx.stroke(); cx.lineWidth = 2; cx.strokeStyle = 'rgba(255,255,255,.25)'; cx.beginPath(); cx.arc(0, 0, R * .93, 0, 7); cx.stroke();
      var a = t * .004; cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(Math.cos(a) * R, Math.sin(a) * R, 5, 0, 7); cx.fill(); cx.restore();
      // the moon-like planet
      var pg = cx.createRadialGradient(W * .18, H * .2, 4, W * .18, H * .2, 70); pg.addColorStop(0, 'rgba(244,114,182,.55)'); pg.addColorStop(.4, 'rgba(167,139,250,.25)'); pg.addColorStop(1, 'rgba(167,139,250,0)'); cx.fillStyle = pg; cx.beginPath(); cx.arc(W * .18, H * .2, 70, 0, 7); cx.fill();
      // horizon glow
      var base = H * .78, hg = cx.createLinearGradient(0, base - 160, 0, base); hg.addColorStop(0, 'rgba(244,114,182,0)'); hg.addColorStop(1, 'rgba(244,114,182,.22)'); cx.fillStyle = hg; cx.fillRect(0, base - 160, W, 160);
      layers.forEach(function (L) { var ox = (t * L.sp) % (L.span - W); L.b.forEach(function (b) { tower(L, b, ox, base); }); });
      // sky traffic: light trails
      craft.forEach(function (c) { c.x += c.v; if (c.x < -60) c.x = W + 60; if (c.x > W + 60) c.x = -60; var tg = cx.createLinearGradient(c.x - c.v * 60, c.y, c.x, c.y); tg.addColorStop(0, 'rgba(0,0,0,0)'); tg.addColorStop(1, c.col); cx.strokeStyle = tg; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(c.x - c.v * 60, c.y); cx.lineTo(c.x, c.y); cx.stroke(); cx.fillStyle = '#fff'; cx.fillRect(c.x - 1, c.y - 1, 2, 2); });
      // the neon grid floor in perspective
      cx.fillStyle = '#05061a'; cx.fillRect(0, base, W, H - base);
      cx.strokeStyle = 'rgba(34,211,238,.28)'; cx.lineWidth = 1;
      for (var i = 0; i < 14; i++) { var f = (i + (t * .02) % 1) / 14, y = base + Math.pow(f, 2.2) * (H - base); cx.globalAlpha = .15 + f * .6; cx.beginPath(); cx.moveTo(0, y); cx.lineTo(W, y); cx.stroke(); }
      cx.globalAlpha = .35; for (var v = -12; v <= 12; v++) { cx.beginPath(); cx.moveTo(W / 2 + v * 30, base); cx.lineTo(W / 2 + v * 220, H); cx.stroke(); } cx.globalAlpha = 1;
      var fg = cx.createLinearGradient(0, base, 0, base + 3); fg.addColorStop(0, 'rgba(244,114,182,.9)'); fg.addColorStop(1, 'rgba(244,114,182,0)'); cx.fillStyle = fg; cx.fillRect(0, base - 1, W, 4);
      // keep the content readable: a soft vignette
      var vg = cx.createRadialGradient(W / 2, H * .45, Math.min(W, H) * .2, W / 2, H * .45, Math.max(W, H) * .8); vg.addColorStop(0, 'rgba(5,8,22,0)'); vg.addColorStop(1, 'rgba(5,8,22,.55)'); cx.fillStyle = vg; cx.fillRect(0, 0, W, H);
    }
    var last = 0;
    function loop(now) { if (!document.hidden && now - last > 33) { last = now; draw(); } if (!still) requestAnimationFrame(loop); }
    build(); draw(); if (!still) requestAnimationFrame(loop);
    var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { build(); draw(); }, 150); });
  })();

  /* ---------- routing ---------- */
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  function route() {
    var h = location.hash.replace(/^#\/?/, '').split('?')[0], p = h.split('/');
    stop(); RUN = null; window.scrollTo(0, 0);
    if (p[0] === 'play' && p[1]) return vPlay(p[1]);
    vHome();
  }
  addEventListener('hashchange', route);
  drawLevels(); route();
})();
