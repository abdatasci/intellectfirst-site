/* IF Academy IELTS Centre: Reading and Listening — practice (one passage or part, untimed, check as you go)
   and full mock tests (timed, scored out of 40 with an IELTS band). Listening audio comes from /api/voice
   (British voices, generated once and cached), falling back to the browser's own voice if needed.
   app.js calls IFRL.route(parts) for #/reading, #/listening, #/rprac/<id>, #/rmock, #/lprac/<id>, #/lmock, #/speakmock. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var view = $('#view');
  var R = null, L = null, SPK = null, stop = [];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function setNav(k) { $$('.nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.nav === k); }); }
  function go(h) { location.hash = h; }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function bandStr(b) { return b % 1 ? b.toFixed(1) : b + '.0'; }
  function cleanup() { stop.forEach(function (f) { try { f(); } catch (e) {} }); stop = []; window.onbeforeunload = null; }
  window.addEventListener('hashchange', cleanup);

  async function loadR() { if (!R) R = await (await fetch('data/reading.json')).json(); return R; }
  async function loadL() { if (!L) L = await (await fetch('data/listening.json')).json(); return L; }
  function passage(id) { return R.passages.filter(function (p) { return p.id === id; })[0]; }
  function part(id) { return L.parts.filter(function (p) { return p.id === id; })[0]; }

  /* ---------- scores (kept on this device) ---------- */
  var KEY = 'ielts.rl.v1';
  function saveResult(k, score, total, band) {
    var all = lsGet(KEY) || {}, prev = all[k];
    all[k] = { score: score, total: total, band: band, at: new Date().toISOString(), best: Math.max(score, prev ? prev.best || prev.score : 0) };
    lsSet(KEY, all);
  }
  function result(k) { return (lsGet(KEY) || {})[k]; }
  // Approximate conversion tables used by the IELTS partners for Academic Reading and Listening (raw score out of 40).
  var BANDS = {
    reading: [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]],
    listening: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]]
  };
  function toBand(skill, raw) { var t = BANDS[skill]; for (var i = 0; i < t.length; i++) if (raw >= t[i][0]) return t[i][1]; return 0; }

  /* ---------- questions ---------- */
  function norm(s) { return String(s == null ? '' : s).toLowerCase().replace(/[£$€]/g, '').replace(/[.,;:!?'"’]+$/g, '').replace(/\s+/g, ' ').trim(); }
  function itemsOf(groups) { var o = []; groups.forEach(function (g) { g.items.forEach(function (it) { if (Array.isArray(it)) o.push({ g: g, n: it[0], it: it }); }); }); return o; }
  function correctAns(g, it) { return g.type === 'gap' ? it[2][0] : g.type === 'mcq' ? it[3] : it[2]; }
  function isRight(g, it, v) {
    if (v == null || v === '') return false;
    if (g.type === 'gap') { var x = norm(v), y = x.replace(/\s/g, ''); return it[2].some(function (a) { return norm(a) === x || norm(a).replace(/\s/g, '') === y; }); }
    if (g.type === 'mcq') return v === it[3];
    return v === it[2];
  }
  function groupHTML(g, ans, reveal) {
    var h = '<div class="rl-group"><p class="rl-head"><b>Questions ' + g.from + '–' + g.to + '</b></p><p class="rl-instr">' + esc(g.instr) + '</p>';
    if (g.title) h += '<p class="rl-title">' + esc(g.title) + '</p>';
    if (g.type === 'match') h += '<div class="rl-opts">' + g.options.map(function (o) { return '<div><b>' + esc(o[0]) + '</b> ' + esc(o[1]) + '</div>'; }).join('') + '</div>';
    g.items.forEach(function (it) {
      if (!Array.isArray(it)) { h += '<p class="rl-sub">' + esc(it.h) + '</p>'; return; }
      var n = it[0], v = ans[n] || '', mark = '';
      if (reveal) { var ok = isRight(g, it, v); mark = '<span class="rl-mark ' + (ok ? 'ok' : 'no') + '">' + (ok ? '✓' : '✗ ' + esc(correctAns(g, it))) + '</span>'; }
      var dis = reveal ? ' disabled' : '';
      if (g.type === 'gap') {
        var parts = String(it[1]).split('___');
        h += '<div class="rl-q" id="q' + n + '"><span class="rl-n">' + n + '</span><span class="rl-gap">' + esc(parts[0]) + '<input class="rl-in" data-q="' + n + '" value="' + esc(v) + '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Answer ' + n + '"' + dis + '>' + esc(parts[1] || '') + '</span>' + mark + '</div>';
      } else if (g.type === 'mcq') {
        h += '<div class="rl-q rl-mcq" id="q' + n + '"><span class="rl-n">' + n + '</span><div><p>' + esc(it[1]) + '</p>' + it[2].map(function (o, i) {
          var L = String.fromCharCode(65 + i);
          return '<label class="rl-opt"><input type="radio" name="q' + n + '" data-q="' + n + '" value="' + L + '"' + (v === L ? ' checked' : '') + dis + '> <b>' + L + '</b> ' + esc(o) + '</label>';
        }).join('') + mark + '</div></div>';
      } else {
        var opts = g.type === 'choice' ? g.choices.map(function (c) { return [c, c]; }) : g.options.map(function (o) { return [o[0], o[0]]; });
        h += '<div class="rl-q" id="q' + n + '"><span class="rl-n">' + n + '</span><span class="rl-stem">' + esc(it[1]) + '</span><select class="rl-sel" data-q="' + n + '" aria-label="Answer ' + n + '"' + dis + '><option value=""></option>' +
          opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (v === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>' + mark + '</div>';
      }
    });
    return h + '</div>';
  }
  function bindAnswers(root, ans, onChange) {
    $$('[data-q]', root).forEach(function (el) {
      var f = function () { if (el.type === 'radio' && !el.checked) return; ans[el.dataset.q] = el.value; if (onChange) onChange(); };
      el.addEventListener(el.tagName === 'INPUT' && el.type !== 'radio' ? 'input' : 'change', f);
    });
  }
  function score(groups, ans) { var s = 0, t = 0; itemsOf(groups).forEach(function (x) { t++; if (isRight(x.g, x.it, ans[x.n])) s++; }); return { score: s, total: t }; }
  function answered(groups, ans) { return itemsOf(groups).filter(function (x) { return ans[x.n] != null && ans[x.n] !== ''; }).length; }
  function fmt(sec) { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2); }
  function timer(el, seconds, onEnd) {
    var end = Date.now() + seconds * 1000, t = setInterval(function () {
      var left = (end - Date.now()) / 1000; el.textContent = fmt(left); el.classList.toggle('low', left < 300);
      if (left <= 0) { clearInterval(t); onEnd(); }
    }, 500);
    el.textContent = fmt(seconds); stop.push(function () { clearInterval(t); }); return function () { clearInterval(t); };
  }
  function passageHTML(p) { return '<h2 class="rl-ptitle">' + esc(p.title) + '</h2>' + p.paras.map(function (x) { return '<p class="rl-para"><b>' + esc(x[0]) + '</b> ' + esc(x[1]) + '</p>'; }).join(''); }
  function resultBox(s, band, extra) {
    return '<div class="rl-result"><div><span>Score</span><b>' + s.score + ' / ' + s.total + '</b></div>' + (band != null ? '<div><span>IELTS band (approx.)</span><b>' + bandStr(band) + '</b></div>' : '') + (extra || '') + '</div>';
  }

  /* ---------- skill pages ---------- */
  function bestLine(k) { var r = result(k); return r ? '<div class="best"><span>Last</span><strong>' + r.score + '/' + r.total + '</strong></div>' : ''; }
  async function vReading() {
    setNav('reading'); await loadR();
    var t = R.tests[0], r = result('rmock:' + t.id);
    view.innerHTML = '<section class="hero"><div class="eyebrow">Reading · Academic</div><h1>Reading</h1><p class="lead">Three passages, 40 questions, 60 minutes. Practise one passage at a time with instant marking, or sit a full timed mock test for a band score.</p></section>' +
      '<section class="section"><div class="sec-head"><div><h2>Mock test</h2><p>Exam conditions: 60 minutes, all three passages, scored out of 40.</p></div></div>' +
      '<div class="task-list"><a class="task" href="#/rmock"><div><span class="id">60 minutes · 40 questions</span><b>' + esc(t.name) + '</b><span class="k">' + t.passages.map(function (id) { return esc(passage(id).title); }).join(' · ') + '</span></div>' + (r ? '<div class="best"><span>Band</span><strong>' + bandStr(r.band) + '</strong></div>' : '') + '</a></div></section>' +
      '<section class="section"><div class="sec-head"><div><h2>Practice</h2><p>One passage, no time pressure. Check your answers when you are ready.</p></div></div><div class="task-list">' +
      R.passages.map(function (p) {
        var types = p.groups.map(function (g) { return g.type === 'choice' ? (g.choices[0] === 'YES' ? 'Yes/No/Not given' : 'True/False/Not given') : g.type === 'match' ? (/heading/i.test(g.instr) ? 'Matching headings' : 'Matching') : g.type === 'mcq' ? 'Multiple choice' : 'Completion'; });
        return '<a class="task" href="#/rprac/' + p.id + '"><div><span class="id">Passage ' + p.part + ' · ' + itemsOf(p.groups).length + ' questions · about ' + p.minutes + ' min</span><b>' + esc(p.title) + '</b><span class="k">' + types.join(' · ') + '</span></div>' + bestLine('rprac:' + p.id) + '</a>';
      }).join('') + '</div></section>';
  }
  async function vListening() {
    setNav('listening'); await loadL();
    var t = L.tests[0], r = result('lmock:' + t.id);
    view.innerHTML = '<section class="hero"><div class="eyebrow">Listening · 4 parts</div><h1>Listening</h1><p class="lead">Four recordings, 40 questions, about 30 minutes, with British voices. Practise one part at a time (replay as often as you like, then read the transcript), or sit a full mock test where you hear everything once.</p>' +
      '<p class="hint">Use headphones. The first time a recording plays it may take a few seconds to load.</p></section>' +
      '<section class="section"><div class="sec-head"><div><h2>Mock test</h2><p>Exam conditions: each recording is played once, then you have 2 minutes to check.</p></div></div>' +
      '<div class="task-list"><a class="task" href="#/lmock"><div><span class="id">About 30 minutes · 40 questions</span><b>' + esc(t.name) + '</b><span class="k">' + t.parts.map(function (id) { return esc(part(id).title); }).join(' · ') + '</span></div>' + (r ? '<div class="best"><span>Band</span><strong>' + bandStr(r.band) + '</strong></div>' : '') + '</a></div></section>' +
      '<section class="section"><div class="sec-head"><div><h2>Practice</h2><p>One part at a time. Pause and replay, then check your answers and read the transcript.</p></div></div><div class="task-list">' +
      L.parts.map(function (p) { return '<a class="task" href="#/lprac/' + p.id + '"><div><span class="id">Part ' + p.part + ' · questions ' + p.groups[0].from + '–' + p.groups[p.groups.length - 1].to + '</span><b>' + esc(p.title) + '</b><span class="k">' + esc(p.desc) + '</span></div>' + bestLine('lprac:' + p.id) + '</a>'; }).join('') +
      '</div></section>';
  }

  /* ---------- reading practice ---------- */
  async function vReadPractice(id) {
    setNav('reading'); await loadR();
    var p = passage(id); if (!p) return go('#/reading');
    var ans = {}, revealed = false;
    function draw() {
      view.innerHTML = '<div class="rl-top"><a class="btn ghost sm" href="#/reading">← Reading</a><b>Passage ' + p.part + ' · ' + esc(p.title) + '</b><span class="spacer"></span><span class="rl-count" id="cnt"></span>' +
        (revealed ? '<button class="btn ghost sm" id="again">Try again</button>' : '<button class="btn sm" id="chk">Check answers</button>') + '</div>' +
        (revealed ? resultBox(score(p.groups, ans), null) : '') +
        '<div class="rl-split"><article class="rl-text">' + passageHTML(p) + '</article><div class="rl-qs" id="qs">' + p.groups.map(function (g) { return groupHTML(g, ans, revealed); }).join('') + '</div></div>';
      var cnt = function () { $('#cnt').textContent = answered(p.groups, ans) + ' / ' + itemsOf(p.groups).length + ' answered'; };
      bindAnswers($('#qs'), ans, cnt); cnt();
      if ($('#chk')) $('#chk').onclick = function () { revealed = true; var s = score(p.groups, ans); saveResult('rprac:' + p.id, s.score, s.total, null); draw(); window.scrollTo(0, 0); };
      if ($('#again')) $('#again').onclick = function () { ans = {}; revealed = false; draw(); window.scrollTo(0, 0); };
    }
    draw();
  }

  /* ---------- reading mock ---------- */
  async function vReadMock() {
    setNav('reading'); await loadR();
    var t = R.tests[0], ps = t.passages.map(passage), all = [].concat.apply([], ps.map(function (p) { return p.groups; }));
    view.innerHTML = '<div class="panel" style="max-width:620px"><h2>' + esc(t.name) + '</h2><p class="sub">Academic Reading · 60 minutes · 40 questions</p>' +
      '<ul class="rl-rules"><li>There are three passages. Move between them with the tabs; your answers are kept.</li><li>The clock counts down from 60 minutes. When it reaches zero, your answers are submitted.</li><li>Spelling counts in completion questions.</li><li>You get your score out of 40 and an approximate IELTS band, then you can review every answer.</li></ul>' +
      '<button class="btn gold" id="go">Start the test</button></div>';
    $('#go').onclick = function () { run(); };
    function run() {
      var ans = {}, cur = 0, done = false;
      window.onbeforeunload = function () { return 'Your test is in progress.'; };
      view.innerHTML = '<div class="rl-top rl-sticky"><b>' + esc(t.name) + '</b><div class="rl-tabs" id="tabs">' + ps.map(function (p, i) { return '<button data-i="' + i + '">Passage ' + (i + 1) + '</button>'; }).join('') + '</div><span class="spacer"></span><span class="rl-count" id="cnt"></span><span class="rl-clock" id="clk"></span><button class="btn sm" id="sub">Submit</button></div><div id="body"></div>';
      var endT = timer($('#clk'), t.minutes * 60, function () { finish(true); });
      function cnt() { $('#cnt').textContent = answered(all, ans) + ' / 40'; }
      function show(i) {
        cur = i; $$('#tabs button').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.i === i)); });
        var p = ps[i];
        $('#body').innerHTML = '<div class="rl-split"><article class="rl-text">' + passageHTML(p) + '</article><div class="rl-qs" id="qs">' + p.groups.map(function (g) { return groupHTML(g, ans, false); }).join('') +
          (i < ps.length - 1 ? '<button class="btn ghost" id="next">Next passage →</button>' : '') + '</div></div>';
        bindAnswers($('#qs'), ans, cnt); cnt(); window.scrollTo(0, 0);
        if ($('#next')) $('#next').onclick = function () { show(i + 1); };
      }
      $$('#tabs button').forEach(function (b) { b.onclick = function () { show(+b.dataset.i); }; });
      $('#sub').onclick = function () { var left = 40 - answered(all, ans); if (confirm(left ? 'You have ' + left + ' unanswered question' + (left > 1 ? 's' : '') + '. Submit anyway?' : 'Submit your answers?')) finish(false); };
      function finish(timeUp) {
        if (done) return; done = true; endT(); window.onbeforeunload = null;
        var s = score(all, ans), b = toBand('reading', s.score); saveResult('rmock:' + t.id, s.score, s.total, b);
        var per = ps.map(function (p, i) { var x = score(p.groups, ans); return '<div><span>Passage ' + (i + 1) + '</span><b>' + x.score + ' / ' + x.total + '</b></div>'; }).join('');
        view.innerHTML = '<section class="hero" style="padding-bottom:6px"><div class="eyebrow">' + (timeUp ? 'Time is up' : 'Test complete') + '</div><h1>' + esc(t.name) + '</h1></section>' + resultBox(s, b, per) +
          '<p class="hint">The band is an estimate from the usual Academic Reading conversion table. Below, every answer is marked: ✓ correct, ✗ with the right answer.</p>' +
          '<div class="row" style="margin:14px 0"><a class="btn ghost sm" href="#/reading">← Reading</a><a class="btn sm" href="#/rmock" onclick="location.reload()">Take it again</a></div>' +
          ps.map(function (p, i) { return '<details class="rl-review"' + (i === 0 ? ' open' : '') + '><summary>Passage ' + (i + 1) + ' · ' + esc(p.title) + '</summary><div class="rl-split"><article class="rl-text">' + passageHTML(p) + '</article><div class="rl-qs">' + p.groups.map(function (g) { return groupHTML(g, ans, true); }).join('') + '</div></div></details>'; }).join('');
        window.scrollTo(0, 0);
      }
      show(0);
    }
  }

  /* ---------- listening audio ---------- */
  var VOICE_LANG = { af: 'female', am: 'male', km: 'male', kf: 'female' };
  function Player(script, opts) {
    // opts: { onLine(i, line), onEnd(), canSkipPause }
    // One audio element plays everything (phones only allow sound from an element the user has started);
    // separate hidden elements just fetch the next lines ahead of time.
    var i = -1, audio = new Audio(), cache = {}, paused = false, waitT = null, waitEnd = 0, dead = false, synth = window.speechSynthesis;
    audio.preload = 'auto';
    function url(l) { return '/api/voice?t=' + encodeURIComponent(l.t) + '&v=' + l.sp; }
    function pre(k) { var l = script[k]; if (l && l.t && !cache[k]) { var a = new Audio(); a.preload = 'auto'; a.src = url(l); cache[k] = a; } }
    function next() {
      if (dead) return; i++; if (i >= script.length) { opts.onEnd && opts.onEnd(); return; }
      var l = script[i]; opts.onLine && opts.onLine(i, l);
      if (l.pause) { waitEnd = Date.now() + l.pause * 1000; waitT = setTimeout(next, l.pause * 1000); pre(i + 1); return; }
      pre(i + 1); pre(i + 2); if (cache[i - 1]) { cache[i - 1].src = ''; delete cache[i - 1]; }
      var fell = false, me = i;
      audio.onended = function () { if (me === i) next(); };
      audio.onerror = function () { if (me === i && !fell) { fell = true; speak(l); } };
      audio.src = url(l);
      var pr = audio.play(); if (pr && pr.catch) pr.catch(function (e) { if (e && e.name === 'NotAllowedError') { paused = true; opts.onBlocked && opts.onBlocked(); } else if (e && e.name === 'AbortError') { /* replaced */ } else if (!fell) { fell = true; speak(l); } });
    }
    function speak(l) {
      if (dead) return;
      if (!synth) { next(); return; }
      var u = new SpeechSynthesisUtterance(l.t); u.lang = 'en-GB'; u.rate = 0.95;
      var vs = synth.getVoices().filter(function (v) { return /en-GB/i.test(v.lang); });
      if (vs.length) u.voice = vs[VOICE_LANG[l.sp] === 'male' ? Math.min(1, vs.length - 1) : 0];
      u.onend = function () { next(); }; synth.speak(u);
    }
    return {
      start: function () { next(); },
      pause: function () { paused = true; if (audio) audio.pause(); if (synth) synth.pause(); if (waitT) { clearTimeout(waitT); waitT = null; waitEnd = waitEnd - Date.now(); } },
      resume: function () { paused = false; var l = script[i]; if (l && l.pause) { waitT = setTimeout(next, Math.max(0, waitEnd)); waitEnd = Date.now() + Math.max(0, waitEnd); } else if (audio) audio.play(); if (synth) synth.resume(); },
      skip: function () { var l = script[i]; if (l && l.pause && waitT) { clearTimeout(waitT); waitT = null; next(); } },
      isPaused: function () { return paused; },
      inPause: function () { var l = script[i]; return !!(l && l.pause); },
      pauseLeft: function () { return Math.max(0, (waitEnd - Date.now()) / 1000); },
      kill: function () { dead = true; audio.onended = audio.onerror = null; audio.pause(); audio.removeAttribute('src'); if (waitT) clearTimeout(waitT); if (synth) synth.cancel(); Object.keys(cache).forEach(function (k) { cache[k].src = ''; }); }
    };
  }
  function transcriptHTML(p) {
    return '<details class="rl-review"><summary>Transcript</summary><div class="rl-trans">' + p.script.filter(function (l) { return l.t && l.sp !== 'km'; }).map(function (l) {
      return '<p><b>' + esc((p.speakers || {})[l.sp] || '') + '</b> ' + esc(l.t) + '</p>'; }).join('') + '</div></details>';
  }

  /* ---------- listening practice ---------- */
  async function vListenPractice(id) {
    setNav('listening'); await loadL();
    var p = part(id); if (!p) return go('#/listening');
    var ans = {}, revealed = false, pl = null;
    function draw() {
      view.innerHTML = '<div class="rl-top rl-sticky"><a class="btn ghost sm" href="#/listening">← Listening</a><b>Part ' + p.part + ' · ' + esc(p.title) + '</b><span class="spacer"></span>' +
        '<div class="rl-audio"><button class="btn sm" id="play">▶ Play</button><button class="btn ghost sm" id="skip" hidden>Skip pause ›</button><span class="rl-now" id="now"></span></div>' +
        '<span class="rl-count" id="cnt"></span>' + (revealed ? '<button class="btn ghost sm" id="again">Try again</button>' : '<button class="btn sm gold" id="chk">Check answers</button>') + '</div>' +
        (revealed ? resultBox(score(p.groups, ans), null) : '<p class="hint" style="margin:10px 0 0">' + esc(p.desc) + ' Press Play; you can pause, replay and skip the reading pauses.</p>') +
        '<div class="rl-qs rl-wide" id="qs">' + p.groups.map(function (g) { return groupHTML(g, ans, revealed); }).join('') + '</div>' + (revealed ? transcriptHTML(p) : '');
      var cnt = function () { $('#cnt').textContent = answered(p.groups, ans) + ' / ' + itemsOf(p.groups).length; };
      bindAnswers($('#qs'), ans, cnt); cnt();
      var btn = $('#play'), sk = $('#skip'), now = $('#now'), tick = null;
      function stopPlayer() { if (pl) pl.kill(); pl = null; clearInterval(tick); btn.textContent = '▶ Play'; sk.hidden = true; now.textContent = ''; }
      stop.push(stopPlayer);
      btn.onclick = function () {
        if (!pl) {
          pl = Player(p.script, { onLine: function (i, l) { sk.hidden = !l.pause; now.textContent = l.pause ? 'Reading time…' : ('● ' + ((p.speakers || {})[l.sp] || 'Narrator')); },
            onEnd: function () { stopPlayer(); btn.textContent = '↺ Play again'; }, onBlocked: function () { btn.textContent = '▶ Play'; } });
          pl.start(); btn.textContent = '❚❚ Pause';
          tick = setInterval(function () { if (pl && pl.inPause()) now.textContent = 'Reading time · ' + Math.ceil(pl.pauseLeft()) + 's'; }, 500);
        } else if (pl.isPaused()) { pl.resume(); btn.textContent = '❚❚ Pause'; } else { pl.pause(); btn.textContent = '▶ Resume'; }
      };
      sk.onclick = function () { if (pl) pl.skip(); };
      if ($('#chk')) $('#chk').onclick = function () { stopPlayer(); revealed = true; var s = score(p.groups, ans); saveResult('lprac:' + p.id, s.score, s.total, null); draw(); window.scrollTo(0, 0); };
      if ($('#again')) $('#again').onclick = function () { ans = {}; revealed = false; draw(); };
    }
    draw();
  }

  /* ---------- listening mock ---------- */
  async function vListenMock() {
    setNav('listening'); await loadL();
    var t = L.tests[0], ps = t.parts.map(part), all = [].concat.apply([], ps.map(function (p) { return p.groups; }));
    view.innerHTML = '<div class="panel" style="max-width:620px"><h2>' + esc(t.name) + '</h2><p class="sub">Four parts · 40 questions · about 30 minutes</p>' +
      '<ul class="rl-rules"><li>Each recording is played <b>once</b>. You cannot pause or replay it.</li><li>Before each part you have time to read the questions. The question tabs move on with the recording, but you can look at any part.</li><li>After Part 4 you have 2 minutes to check your answers, then they are submitted.</li><li>Use headphones and a quiet room. Spelling counts.</li></ul>' +
      '<button class="btn gold" id="go">Start the test</button></div>';
    $('#go').onclick = function () { run(); };
    function run() {
      var ans = {}, done = false, pi = 0, script = [];
      ps.forEach(function (p, k) { p.script.forEach(function (l) { script.push(Object.assign({ part: k }, l)); }); });
      window.onbeforeunload = function () { return 'Your test is in progress.'; };
      view.innerHTML = '<div class="rl-top rl-sticky"><b>' + esc(t.name) + '</b><div class="rl-tabs" id="tabs">' + ps.map(function (p, i) { return '<button data-i="' + i + '">Part ' + (i + 1) + '</button>'; }).join('') + '</div><span class="spacer"></span><span class="rl-now" id="now">Starting…</span><span class="rl-count" id="cnt"></span><span class="rl-clock" id="clk" hidden></span><button class="btn sm" id="sub" hidden>Submit</button></div><div id="body"></div>';
      function cnt() { $('#cnt').textContent = answered(all, ans) + ' / 40'; }
      function show(i) {
        $$('#tabs button').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.i === i)); });
        $('#body').innerHTML = '<p class="hint" style="margin:10px 0 0">Part ' + (i + 1) + ': ' + esc(ps[i].desc) + '</p><div class="rl-qs rl-wide" id="qs">' + ps[i].groups.map(function (g) { return groupHTML(g, ans, false); }).join('') + '</div>';
        bindAnswers($('#qs'), ans, cnt); cnt();
      }
      $$('#tabs button').forEach(function (b) { b.onclick = function () { show(+b.dataset.i); }; });
      var now = $('#now'), pl = Player(script, {
        onLine: function (i, l) { if (l.part !== pi) { pi = l.part; show(pi); window.scrollTo(0, 0); } now.textContent = l.pause ? 'Reading time' : '● Part ' + (l.part + 1) + ' playing'; },
        onEnd: function () { now.textContent = 'Check your answers'; $('#clk').hidden = false; $('#sub').hidden = false; timer($('#clk'), 120, function () { finish(); }); },
        onBlocked: function () { now.innerHTML = '<button class="btn sm" id="unb">▶ Press to start the audio</button>'; $('#unb').onclick = function () { pl.resume(); }; }
      });
      stop.push(function () { pl.kill(); });
      $('#sub').onclick = function () { finish(); };
      function finish() {
        if (done) return; done = true; pl.kill(); window.onbeforeunload = null; stop.forEach(function (f) { try { f(); } catch (e) {} });
        var s = score(all, ans), b = toBand('listening', s.score); saveResult('lmock:' + t.id, s.score, s.total, b);
        var per = ps.map(function (p, i) { var x = score(p.groups, ans); return '<div><span>Part ' + (i + 1) + '</span><b>' + x.score + ' / ' + x.total + '</b></div>'; }).join('');
        view.innerHTML = '<section class="hero" style="padding-bottom:6px"><div class="eyebrow">Test complete</div><h1>' + esc(t.name) + '</h1></section>' + resultBox(s, b, per) +
          '<p class="hint">The band is an estimate from the usual Listening conversion table. Review each part below and read the transcript.</p>' +
          '<div class="row" style="margin:14px 0"><a class="btn ghost sm" href="#/listening">← Listening</a><a class="btn sm" href="#/lmock" onclick="location.reload()">Take it again</a></div>' +
          ps.map(function (p, i) { return '<details class="rl-review"' + (i === 0 ? ' open' : '') + '><summary>Part ' + (i + 1) + ' · ' + esc(p.title) + '</summary><div class="rl-qs rl-wide">' + p.groups.map(function (g) { return groupHTML(g, ans, true); }).join('') + '</div>' + transcriptHTML(p) + '</details>'; }).join('');
        window.scrollTo(0, 0);
      }
      show(0); pl.start();
    }
  }

  /* ---------- speaking mock: a full test on a random topic ---------- */
  async function speakMock() {
    if (!SPK) SPK = await (await fetch('data/speaking.json')).json();
    var t = SPK.topics[Math.floor(Math.random() * SPK.topics.length)];
    location.replace('#/speak/' + t.id + '/full');
  }

  /* ---------- home: the four skills ---------- */
  function skillsHTML() {
    var card = function (tag, title, badge, desc, practice, mock) {
      return '<div class="card skill"><span class="tag">' + tag + '</span><h3>' + title + (badge ? ' <span class="badge ' + badge[0] + '">' + badge[1] + '</span>' : '') + '</h3><p>' + desc + '</p>' +
        '<div class="row skill-go"><a class="btn sm" href="' + practice[1] + '">' + practice[0] + '</a><a class="btn ghost sm" href="' + mock[1] + '">' + mock[0] + '</a></div></div>';
    };
    return '<section class="section"><div class="sec-head"><div><h2>The four skills</h2><p>Each skill has practice and a full mock test in the real IELTS format.</p></div></div><div class="grid skills">' +
      card('Listening · 4 parts', 'Listening', null, 'British voices, 40 questions. Practise one part with replay and transcript, or sit a full test where you hear each recording once.', ['Practice', '#/listening'], ['Mock test', '#/lmock']) +
      card('Reading · 3 passages', 'Reading', null, 'Academic passages with every question type: True/False/Not Given, headings, matching, multiple choice and completion.', ['Practice', '#/reading'], ['Mock test · 60 min', '#/rmock']) +
      card('Writing · Task 1 & 2', 'Writing', ['ai', 'AI marked'], '16 Task 1 charts and 24 Task 2 essays with a live band estimate, and a full timed paper with an examiner-style report.', ['Practice', '#/writing'], ['Mock test · 60 min', '#/mock']) +
      card('Speaking · Parts 1–3', 'Speaking', ['ai', 'AI marked'], 'An examiner voice asks the questions and you answer out loud. Practise one part, or take a full test on a random topic.', ['Practice', '#/speaking'], ['Mock test · 12 min', '#/speakmock']) +
      '</div></section>';
  }

  function route(parts) {
    cleanup();
    switch (parts[0]) {
      case 'reading': vReading(); return true;
      case 'rprac': vReadPractice(parts[1]); return true;
      case 'rmock': vReadMock(); return true;
      case 'listening': vListening(); return true;
      case 'lprac': vListenPractice(parts[1]); return true;
      case 'lmock': vListenMock(); return true;
      case 'speakmock': speakMock(); return true;
    }
    return false;
  }
  window.IFRL = { route: route, skillsHTML: skillsHTML };
})();
