/* IF Placement Test: adaptive grammar and vocabulary, reading, listening (natural VOA recordings),
   AI-marked writing and speaking. Objective sections use one fixed item bank for everyone and are scored
   with an item-response model; AI only rates the open writing and speaking answers. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var view = $('#view'), ID = window.NFIdentity, BANK = null, USER = null, PROFILE = null;
  var LEVELS = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  var NAMES = { grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading', listening: 'Listening', writing: 'Writing', speaking: 'Speaking' };
  var STEPS = ['Start', 'Grammar & vocabulary', 'Reading', 'Listening', 'Writing', 'Speaking', 'Result'];
  var N_GV = 24;
  var T = null;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(m) { var t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 3200); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function words(t) { return (String(t || '').trim().match(/[A-Za-z0-9'’-]+/g) || []).length; }
  function label(x) { if (x == null) return '–'; var f = Math.floor(Math.min(6, Math.max(0, x))); return LEVELS[f] + (x - f >= 0.5 && f < 6 ? '+' : ''); }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function step(i, frac) {
    $('#ptbar').hidden = i === 0;
    $('#steps').innerHTML = STEPS.slice(1).map(function (s, k) { return '<span class="' + (k + 1 < i ? 'done' : k + 1 === i ? 'on' : '') + '">' + s + '</span>'; }).join('');
    $('#prog').style.width = Math.round(((i - 1) + (frac || 0)) / (STEPS.length - 1) * 100) + '%';
    window.scrollTo(0, 0);
  }
  function save() { if (T) lsSet('pt:state', T); }

  /* ---------- scoring: 3-parameter logistic model, expected a posteriori ability ---------- */
  var GRID = []; for (var g = -4; g <= 4.0001; g += 0.05) GRID.push(g);
  function pCorrect(th, b) { return 0.25 + 0.75 / (1 + Math.exp(-1.3 * (th - b))); }
  function eap(resp, mu, sd) {
    mu = mu || 0; sd = sd || 2;
    var num = 0, den = 0;
    GRID.forEach(function (th) {
      var w = Math.exp(-0.5 * Math.pow((th - mu) / sd, 2));
      resp.forEach(function (r) { var p = pCorrect(th, r.b); w *= r.ok ? p : 1 - p; });
      num += w * th; den += w;
    });
    return den ? num / den : mu;
  }
  var toLevel = function (th) { return Math.max(0, Math.min(6, th + 3)); };
  var diff = function (lv) { return lv - 3; };

  /* ---------- examiner voice ---------- */
  var VOICE = null;
  function pickVoice() {
    var vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    VOICE = vs.filter(function (v) { return /en-GB/i.test(v.lang) && /Daniel|Serena|Kate|Arthur|Martha|Google UK English|Libby|Ryan|Sonia/i.test(v.name); })[0] ||
      vs.filter(function (v) { return /en-GB/i.test(v.lang); })[0] || vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || null;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text) {
    return new Promise(function (res) {
      if (!window.speechSynthesis) return res();
      try { speechSynthesis.cancel(); } catch (e) {}
      var u = new SpeechSynthesisUtterance(text); if (VOICE) u.voice = VOICE; u.lang = (VOICE && VOICE.lang) || 'en-GB'; u.rate = 0.92;
      var done = false, fin = function () { if (!done) { done = true; res(); } };
      u.onend = fin; u.onerror = fin; setTimeout(fin, 2000 + text.length * 90);
      speechSynthesis.speak(u);
    });
  }
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  /* ---------- account ---------- */
  async function loadUser() {
    try { USER = ID ? await ID.getUser() : null; } catch (e) { USER = null; }
    if (!USER) return;
    try { var r = await fetch('/api/school/me', { credentials: 'same-origin' }); if (r.ok) { var d = await r.json(); PROFILE = d.profile && d.profile.role === 'student' ? d.profile : null; } } catch (e) {}
    $('#who').innerHTML = '<a class="btn ghost sm" href="/me/">My account</a>';
  }

  /* ---------- 0. start ---------- */
  function vStart() {
    step(0);
    var saved = lsGet('pt:state');
    view.innerHTML = '<section class="hero"><div class="eyebrow">IF Academy · all ages</div><h1>English placement test</h1>' +
      '<p class="lead">Find your level and the right course. The test adapts to you: questions get harder when you answer correctly and easier when you don\'t, so everyone finishes in about 35 minutes.</p></section>' +
      '<div class="ptsections">' + [
        ['Grammar & vocabulary', '24 questions that adapt to your level', '10 min'],
        ['Reading', '2 short texts', '7 min'],
        ['Listening', '2 real recordings with natural voices', '7 min'],
        ['Writing', 'One task, marked by AI', '10 min'],
        ['Speaking', 'The examiner voice asks 3 questions; you answer into the microphone. Marked by AI.', '5 min']
      ].map(function (s, i) { return '<div class="pts"><b>' + (i + 1) + '</b><div><strong>' + s[0] + '</strong><span>' + s[1] + '</span></div><em>' + s[2] + '</em></div>'; }).join('') + '</div>' +
      (saved && saved.stage && saved.stage !== 'done' ? '<div class="banner2">You have an unfinished test from ' + new Date(saved.started).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + '. <button class="btn sm" id="resume">Continue it</button></div>' : '') +
      '<form class="panel" id="sf" style="max-width:640px;margin-top:22px" novalidate><h2>About you</h2><p class="sub">We use this to recommend a course and, if you like, to send your result to IF Academy.</p>' +
      '<label class="f" for="nm">Full name</label><input class="inp" id="nm" autocomplete="name" value="' + esc((PROFILE && PROFILE.name) || '') + '" required>' +
      '<label class="f" for="ag">Age group</label><select class="inp" id="ag"><option value="">Choose…</option><option value="child">6–12 years</option><option value="teen">13–17 years</option><option value="adult">18 or older</option></select>' +
      '<label class="f" for="ph">Phone (optional)</label><input class="inp" id="ph" type="tel" autocomplete="tel" placeholder="+7 7xx xxx xx xx" value="' + esc((PROFILE && PROFILE.phone) || '') + '">' +
      '<p class="small" style="margin-top:12px">Please use headphones or speakers for Listening and a microphone for Speaking. Chrome or Edge on a computer works best. Answer on your own, without a dictionary or translator: the result is only useful if it shows what you can do now.</p>' +
      '<div class="row" style="margin-top:14px"><button class="btn gold">Start the test</button></div></form>';
    if ($('#resume')) $('#resume').onclick = function () { T = saved; resume(); };
    $('#sf').onsubmit = function (e) {
      e.preventDefault();
      var nm = $('#nm').value.trim(), ag = $('#ag').value;
      if (!nm || !ag) { toast('Please enter your name and age group.'); return; }
      T = { started: Date.now(), name: nm, age: ag, phone: $('#ph').value.trim(), stage: 'gv', gv: [], used: [], reading: [], listening: [], writing: null, speaking: [] };
      save(); resume();
    };
  }
  function resume() {
    var s = T.stage;
    if (s === 'gv') return vGV(); if (s === 'reading') return vReading(); if (s === 'listening') return vListening();
    if (s === 'writing') return vWriting(); if (s === 'speaking') return vSpeaking(); if (s === 'scoring') return vScore();
    vStart();
  }
  function gvTheta() { return eap(T.gv.map(function (r) { return { b: diff(r.lv), ok: r.ok }; })); }
  function nextStage(s) { T.stage = s; save(); resume(); }

  /* ---------- 1. grammar & vocabulary (adaptive) ---------- */
  function vGV() {
    var n = T.gv.length;
    if (n >= N_GV) return nextStage('reading');
    step(1, n / N_GV);
    var kind = n % 2 ? 'vocab' : 'grammar', th = gvTheta();
    var target = Math.max(1, Math.min(5, Math.round(th + 3)));
    var pool = BANK[kind].filter(function (it) { return T.used.indexOf(it.id) < 0; });
    // closest level to the current estimate; ties broken at random
    var best = Math.min.apply(null, pool.map(function (it) { return Math.abs(it.lv - target); }));
    var cands = pool.filter(function (it) { return Math.abs(it.lv - target) === best; });
    var it = cands[Math.floor(Math.random() * cands.length)];
    var opts = shuffle(it.o.map(function (o, i) { return { t: o, ok: i === it.a }; }));
    view.innerHTML = '<section class="qcard"><div class="eyebrow">' + (kind === 'grammar' ? 'Grammar' : 'Vocabulary') + ' · question ' + (n + 1) + ' of ' + N_GV + '</div>' +
      '<p class="qtext">' + esc(it.q).replace('___', '<span class="gap">______</span>') + '</p>' +
      '<div class="opts">' + opts.map(function (o, i) { return '<button class="opt" data-i="' + i + '"><kbd>' + 'ABCD'[i] + '</kbd>' + esc(o.t) + '</button>'; }).join('') + '</div>' +
      '<div class="row" style="margin-top:14px"><button class="btn ghost sm" id="idk">I don\'t know</button></div></section>';
    function answer(ok) {
      document.onkeydown = null;
      T.gv.push({ id: it.id, kind: kind, lv: it.lv, ok: ok }); T.used.push(it.id); save(); vGV();
    }
    view.querySelectorAll('.opt').forEach(function (b) { b.onclick = function () { answer(opts[+b.dataset.i].ok); }; });
    $('#idk').onclick = function () { answer(false); };
    document.onkeydown = function (e) { var k = 'abcd'.indexOf(e.key.toLowerCase()); if (k >= 0 && opts[k]) answer(opts[k].ok); };
  }

  /* ---------- 2. reading ---------- */
  function pickTwo(list, est) {
    var lvls = list.map(function (x) { return x.lv; }), max = Math.max.apply(null, lvls), min = Math.min.apply(null, lvls);
    var a = Math.max(min, Math.min(max, Math.round(est))), b = a + 1 > max ? a - 1 : a + 1;
    return [a, b].sort().map(function (l) { return list.filter(function (x) { return x.lv === l; })[0]; });
  }
  function vReading() {
    if (!T.readingIds) { T.readingIds = pickTwo(BANK.reading, gvTheta() + 3).map(function (x) { return x.id; }); save(); }
    var i = T.reading.length;
    if (i >= T.readingIds.length) return nextStage('listening');
    step(2, i / T.readingIds.length);
    var p = BANK.reading.filter(function (x) { return x.id === T.readingIds[i]; })[0];
    view.innerHTML = '<section class="split"><article class="text"><div class="eyebrow">Reading · text ' + (i + 1) + ' of 2</div><h2>' + esc(p.title) + '</h2>' +
      p.text.split(/\n\n+/).map(function (para) { return '<p>' + esc(para).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</article>' +
      '<form class="qs" id="qf">' + qsHtml(p.qs, 'r') + '<button class="btn" style="margin-top:8px">Next</button></form></section>';
    wireQs(p.qs, 'r', function (res) { T.reading.push({ id: p.id, lv: p.lv, res: res }); save(); vReading(); });
  }
  function qsHtml(qs, pre) {
    return qs.map(function (q, k) {
      var o = q._o || (q._o = shuffle(q.o.map(function (t, j) { return { t: t, ok: j === q.a }; })));
      return '<fieldset class="q"><legend>' + (k + 1) + '. ' + esc(q.q) + '</legend>' + o.map(function (x, j) {
        return '<label class="ro"><input type="radio" name="' + pre + k + '" value="' + j + '"> <span>' + esc(x.t) + '</span></label>';
      }).join('') + '</fieldset>';
    }).join('');
  }
  function wireQs(qs, pre, done) {
    $('#qf').onsubmit = function (e) {
      e.preventDefault();
      var miss = qs.filter(function (q, k) { return !$('input[name="' + pre + k + '"]:checked'); }).length;
      if (miss && !confirm(miss + ' question' + (miss > 1 ? 's are' : ' is') + ' not answered. Continue anyway?')) return;
      done(qs.map(function (q, k) { var c = $('input[name="' + pre + k + '"]:checked'); return !!(c && q._o[+c.value].ok); }));
    };
  }

  /* ---------- 3. listening (VOA Learning English, public domain) ---------- */
  function vListening() {
    if (!T.listenIds) { T.listenIds = pickTwo(BANK.listening, estSoFar() + 3).map(function (x) { return x.id; }); save(); }
    var i = T.listening.length;
    if (i >= T.listenIds.length) return nextStage('writing');
    step(3, i / T.listenIds.length);
    var c = BANK.listening.filter(function (x) { return x.id === T.listenIds[i]; })[0], plays = 0;
    view.innerHTML = '<section class="qcard wide"><div class="eyebrow">Listening · recording ' + (i + 1) + ' of 2</div><h2>' + esc(c.title) + '</h2>' +
      '<p class="lead" style="font-size:16px">Read the questions first. Then press Play. You can listen <b>twice</b>.</p>' +
      '<div class="ptplay"><button class="btn gold" id="play">▶ Play</button><div class="pbarw"><i id="pb"></i></div><span id="pl" class="small">2 plays left</span></div>' +
      '<audio id="au" preload="auto" src="' + esc(c.src) + '"></audio><p class="small">Recording: ' + esc(c.credit) + ' (public domain)</p>' +
      '<form class="qs" id="qf" style="margin-top:14px">' + qsHtml(c.qs, 'l') + '<button class="btn" style="margin-top:8px">Next</button></form></section>';
    var au = $('#au');
    au.ontimeupdate = function () { if (au.duration) $('#pb').style.width = (au.currentTime / au.duration * 100) + '%'; };
    au.onended = function () { $('#play').disabled = plays >= 2; $('#play').textContent = plays >= 2 ? 'No plays left' : '▶ Play again'; };
    au.onerror = function () { $('#pl').textContent = 'The recording could not load. Check your connection and press Play again.'; $('#play').disabled = false; };
    $('#play').onclick = function () {
      if (plays >= 2 || !au.paused) return;
      plays++; $('#pl').textContent = (2 - plays) + ' play' + (2 - plays === 1 ? '' : 's') + ' left'; this.disabled = true; this.textContent = 'Playing…';
      au.currentTime = 0; au.play().catch(function () { plays--; $('#play').disabled = false; $('#play').textContent = '▶ Play'; toast('Press Play to start the recording.'); });
    };
    wireQs(c.qs, 'l', function (res) { try { au.pause(); } catch (e) {} T.listening.push({ id: c.id, lv: c.lv, res: res }); save(); vListening(); });
  }
  function respOf(list) { var r = []; list.forEach(function (p) { p.res.forEach(function (ok) { r.push({ b: diff(p.lv), ok: ok }); }); }); return r; }
  function estSoFar() { var th = gvTheta(); return T.reading.length ? eap(respOf(T.reading), th, 1) * 0.4 + th * 0.6 : th; }

  /* ---------- 4. writing ---------- */
  function vWriting() {
    step(4);
    if (!T.writingId) { var e = estSoFar() + 3; T.writingId = e < 2.5 ? 'w1' : e < 4.5 ? 'w2' : 'w3'; save(); }
    var w = BANK.writing.filter(function (x) { return x.id === T.writingId; })[0];
    var draft = lsGet('pt:draft') || '';
    view.innerHTML = '<section class="qcard wide"><div class="eyebrow">Writing · about 10 minutes</div><h2>Your task</h2><p class="qtext" style="font-size:20px">' + esc(w.prompt) + '</p>' +
      '<p class="small">Write ' + w.min + '–' + w.max + ' words. Write in your own words: copied or translated text cannot show your level.</p>' +
      '<textarea class="inp" id="wt" rows="12" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="sentences" placeholder="Start writing here…">' + esc(draft) + '</textarea>' +
      '<div class="row" style="justify-content:space-between;margin-top:10px"><span class="small" id="wc"></span><button class="btn" id="wn">Next: Speaking</button></div></section>';
    var ta = $('#wt'); ta.onpaste = function (e) { e.preventDefault(); toast('Please type your answer.'); };
    function count() { var n = words(ta.value); $('#wc').textContent = n + ' words' + (n < w.min ? ' · aim for at least ' + w.min : ''); lsSet('pt:draft', ta.value); }
    ta.oninput = count; count();
    $('#wn').onclick = function () {
      var n = words(ta.value);
      if (n < Math.min(15, w.min) && !confirm('Your answer is very short, so we may not be able to judge your writing level. Continue anyway?')) return;
      T.writing = { taskId: w.id, text: ta.value }; lsSet('pt:draft', null); nextStage('speaking');
    };
  }

  /* ---------- 5. speaking: examiner voice asks, student clicks the mic ---------- */
  function MicSession(stream) {
    var ctx = new (window.AudioContext || window.webkitAudioContext)(), src = ctx.createMediaStreamSource(stream), an = ctx.createAnalyser();
    an.fftSize = 1024; src.connect(an);
    var buf = new Float32Array(an.fftSize), floor = 0.01;
    function rms() { an.getFloatTimeDomainData(buf); var s = 0; for (var i = 0; i < buf.length; i++) s += buf[i] * buf[i]; return Math.sqrt(s / buf.length); }
    var cal = [], calT = setInterval(function () { cal.push(rms()); }, 50);
    setTimeout(function () { clearInterval(calT); if (cal.length) { cal.sort(); floor = Math.max(0.006, cal[Math.floor(cal.length * 0.7)]); } }, 650);
    this.level = function () { return Math.min(1, rms() / (floor * 8)); };
    this.start = function (onText) {
      var rec = { text: '', interim: '', conf: [], started: Date.now(), speechMs: 0, pauses: 0, longPauses: 0 };
      var silentMs = 0, spoke = false, tick = 100;
      rec.meter = setInterval(function () {
        var loud = rms() > floor * 2.2;
        if (loud) { if (spoke && silentMs >= 1000) { rec.pauses++; if (silentMs >= 3000) rec.longPauses++; } silentMs = 0; spoke = true; rec.speechMs += tick; }
        else silentMs += tick;
      }, tick);
      var r = new SR(); r.lang = 'en-GB'; r.continuous = true; r.interimResults = true; rec.r = r; rec.on = true;
      r.onresult = function (ev) {
        var interim = '';
        for (var i = ev.resultIndex; i < ev.results.length; i++) {
          var res = ev.results[i];
          if (res.isFinal) { rec.text += (rec.text ? ' ' : '') + res[0].transcript.trim(); if (res[0].confidence) rec.conf.push(res[0].confidence); }
          else interim += res[0].transcript;
        }
        rec.interim = interim; if (onText) onText(rec.text + (interim ? ' ' + interim : ''));
      };
      r.onend = function () { if (rec.on) { try { r.start(); } catch (e) {} } };
      r.onerror = function (e) { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { rec.on = false; rec.err = e.error; } };
      try { r.start(); } catch (e) {}
      return rec;
    };
    this.stop = function (rec) {
      return new Promise(function (res) {
        rec.on = false; clearInterval(rec.meter);
        try { rec.r.stop(); } catch (e) {}
        setTimeout(function () {
          res({ text: (rec.text + (rec.interim ? ' ' + rec.interim : '')).trim(), secs: (Date.now() - rec.started) / 1000, speechSecs: rec.speechMs / 1000,
            pauses: rec.pauses, longPauses: rec.longPauses, conf: rec.conf.length ? rec.conf.reduce(function (a, b) { return a + b; }, 0) / rec.conf.length : null, err: rec.err });
        }, 700);
      });
    };
    this.close = function () { try { stream.getTracks().forEach(function (t) { t.stop(); }); ctx.close(); } catch (e) {} };
  }
  function speakQs() {
    if (!T.speakQs) {
      var e = Math.round(Math.max(1, Math.min(5, estSoFar() + 3))), S = BANK.speaking;
      var lv = [Math.max(1, e - 1), e, Math.min(5, e + 1)];
      if (lv[1] === lv[2]) lv = [Math.max(1, e - 2), Math.max(1, e - 1), e];
      T.speakQs = lv.map(function (l, k) { var arr = S[String(l)]; return arr[(k + Math.floor(Math.random() * arr.length)) % arr.length]; });
      T.speakQs = T.speakQs.filter(function (q, k) { return T.speakQs.indexOf(q) === k; });
      while (T.speakQs.length < 3) { var all = [].concat(S['2'], S['3'], S['4']); var q = all[Math.floor(Math.random() * all.length)]; if (T.speakQs.indexOf(q) < 0) T.speakQs.push(q); }
      save();
    }
    return T.speakQs;
  }
  var MIC = null;
  async function vSpeaking() {
    var qs = speakQs(), i = T.speaking.length;
    if (i >= qs.length) { if (MIC) { MIC.close(); MIC = null; } return nextStage('scoring'); }
    step(5, i / qs.length);
    var q = qs[i], canMic = !!(SR && navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    view.innerHTML = '<section class="qcard wide"><div class="eyebrow">Speaking · question ' + (i + 1) + ' of ' + qs.length + '</div>' +
      '<div class="ptex"><span class="bot" aria-hidden="true">' + botSvg() + '</span><p class="qtext" id="qt">' + esc(q) + '</p></div>' +
      '<div class="row"><button class="btn ghost sm" id="rep">🔊 Hear the question again</button></div>' +
      (canMic ? '<div class="ptmicw"><button class="ptmic" id="mic" aria-label="Start answering" disabled>' + micSvg() + '</button><div><b id="ms">Listen to the question…</b><p class="small" id="mh">Then click the microphone and answer. Speak for up to 90 seconds; click again when you finish.</p></div></div>' +
        '<div class="ptlive" id="live" aria-live="polite"></div>'
        : '<div class="err">Your browser cannot listen to speech, so please type your answer as you would say it. Chrome or Edge gives a more accurate result.</div><textarea class="inp" id="tt" rows="5"></textarea>') +
      '<div class="row" style="margin-top:14px"><button class="btn" id="nx" ' + (canMic ? 'disabled' : '') + '>Next</button></div></section>';
    $('#rep').onclick = function () { say(q); };
    if (!canMic) { $('#nx').onclick = function () { T.speaking.push({ q: q, text: $('#tt').value.trim(), typed: true, secs: 0, speechSecs: 0, pauses: 0, longPauses: 0, conf: null }); save(); vSpeaking(); }; return; }
    await say((i === 0 ? 'Let\'s begin the speaking part. ' : '') + q);
    var mic = $('#mic'); if (!mic) return;
    mic.disabled = false; $('#ms').textContent = 'Click the microphone to answer';
    var rec = null, timer = null, left = 90;
    mic.onclick = async function () {
      if (!rec) {
        try { if (!MIC) MIC = new MicSession(await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })); }
        catch (e) { $('#mh').textContent = 'The microphone is blocked. Allow it in the browser address bar, then click again.'; return; }
        try { speechSynthesis.cancel(); } catch (e) {}
        rec = MIC.start(function (t) { $('#live').textContent = t; });
        mic.classList.add('on'); $('#ms').textContent = 'Recording… click to finish'; $('#nx').disabled = true;
        timer = setInterval(function () { left--; $('#mh').textContent = left + ' seconds left'; mic.style.setProperty('--lvl', MIC.level()); if (left <= 0) mic.onclick(); }, 1000);
      } else {
        clearInterval(timer); mic.disabled = true; mic.classList.remove('on'); $('#ms').textContent = 'Saving your answer…';
        var r = await MIC.stop(rec);
        if (r.err) { $('#ms').textContent = 'Speech recognition was blocked.'; $('#mh').textContent = 'Allow the microphone and reload the page, or use Chrome.'; return; }
        T.speaking.push({ q: q, text: r.text, typed: false, secs: r.secs, speechSecs: r.speechSecs, pauses: r.pauses, longPauses: r.longPauses, conf: r.conf }); save();
        $('#ms').textContent = r.text ? 'Answer saved' : 'We did not hear anything'; $('#mh').textContent = r.text ? 'Click Next for the next question.' : 'That\'s all right, click Next to continue.';
        $('#nx').disabled = false;
      }
    };
    $('#nx').onclick = function () { vSpeaking(); };
  }
  function botSvg() { return '<svg viewBox="0 0 48 48" width="48" height="48"><rect x="8" y="14" width="32" height="24" rx="8" fill="#0b1f3a"/><circle cx="18" cy="26" r="3.5" fill="#e9dcc0"/><circle cx="30" cy="26" r="3.5" fill="#e9dcc0"/><rect x="18" y="32" width="12" height="2.5" rx="1.2" fill="#b08a3e"/><line x1="24" y1="6" x2="24" y2="14" stroke="#b08a3e" stroke-width="2.5"/><circle cx="24" cy="5" r="3" fill="#b08a3e"/></svg>'; }
  function micSvg() { return '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>'; }

  /* ---------- 6. scoring and result ---------- */
  async function vScore() {
    step(6, 0.2);
    view.innerHTML = '<section class="hero"><div class="eyebrow">Almost done</div><h1>Marking your test…</h1><p class="lead"><span class="spin"></span> AI is reading your writing and listening to your speaking answers. This takes about 20 seconds.</p></section>';
    var ai = T.ai || null;
    if (!ai) {
      try {
        var r = await fetch('/api/placement/score', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ writing: T.writing, speaking: T.speaking }) });
        ai = r.ok ? await r.json() : { error: r.status };
      } catch (e) { ai = { error: 'network' }; }
      T.ai = ai; save();
    }
    T.result = compute(); T.stage = 'done'; save();
    showResult();
    saveResult();
  }
  function compute() {
    var th = gvTheta();
    var g = toLevel(eap(T.gv.filter(function (r) { return r.kind === 'grammar'; }).map(function (r) { return { b: diff(r.lv), ok: r.ok }; })));
    var v = toLevel(eap(T.gv.filter(function (r) { return r.kind === 'vocab'; }).map(function (r) { return { b: diff(r.lv), ok: r.ok }; })));
    var rd = toLevel(eap(respOf(T.reading), th, 1)), ls = toLevel(eap(respOf(T.listening), th, 1));
    var ai = T.ai || {}, w = ai.writing && ai.writing.level, sp = ai.speaking && ai.speaking.level;
    var skills = { grammar: g, vocabulary: v, reading: rd, listening: ls };
    if (typeof w === 'number') skills.writing = w;
    if (typeof sp === 'number') skills.speaking = sp;
    var W = { grammar: .2, vocabulary: .2, reading: .15, listening: .15, writing: .15, speaking: .15 }, sum = 0, tw = 0;
    Object.keys(skills).forEach(function (k) { sum += skills[k] * W[k]; tw += W[k]; });
    var overall = Math.round(sum / tw * 2) / 2;
    return { overall: overall, skills: skills, course: course(overall, T.age), minutes: Math.round((Date.now() - T.started) / 60000) };
  }
  function course(x, age) {
    var f = Math.floor(x);
    if (age === 'child') return ['Starters', 'Movers', 'Flyers', 'A2 Key (KET) preparation', 'B1 Preliminary (PET) preparation', 'B1 Preliminary (PET) preparation', 'B1 Preliminary (PET) preparation'][f];
    if (age === 'teen') return ['A2 Teen (starter group)', 'A2 Teen', 'A2 Teen or B1 Teen', 'B1 Teen (English for Teenagers B1–B2)', 'B2 Teen (English File Upper-intermediate)', 'C1 Teen (English for Teenagers B2–C1) or IELTS', 'C1 Teen or IELTS'][f];
    return ['English File Elementary (A1), from the start', 'English File Elementary (A1)', 'English File Pre-intermediate (A2)', 'English File Intermediate (B1)', 'English File Upper-intermediate (B2) or Work & Life B2–C1', 'English File Advanced (C1), Work & Life B2–C1 or IELTS', 'English File Advanced (C1) or IELTS'][f];
  }
  function bar(k, x) {
    return '<div class="sk"><span>' + NAMES[k] + '</span><div class="skb"><i style="width:' + Math.max(4, x / 6 * 100) + '%"></i>' + [1, 2, 3, 4, 5].map(function (t) { return '<em style="left:' + (t / 6 * 100) + '%"></em>'; }).join('') + '</div><b>' + label(x) + '</b></div>';
  }
  function showResult() {
    step(6, 1);
    var R = T.result, ai = T.ai || {}, f = Math.floor(R.overall);
    var desc = ['You are just starting English.', 'You can understand and use familiar everyday expressions and very basic phrases.', 'You can communicate in simple, routine tasks and describe your background in simple terms.',
      'You can deal with most everyday situations, describe experiences and give reasons for your opinions.', 'You can interact with fluency and spontaneity and write clear, detailed text on a wide range of subjects.',
      'You can use English flexibly and effectively for social, academic and professional purposes.', 'You can understand virtually everything and express yourself precisely and spontaneously.'][f];
    var fb = function (name, o) {
      if (!o) return '';
      return '<div class="box"><h3>' + name + ' · ' + label(o.level) + '</h3><p>' + esc(o.feedback) + '</p>' + (o.next ? '<p class="small" style="margin-top:6px"><b>Next step:</b> ' + esc(o.next) + '</p>' : '') +
        (o.evidence === 'limited' ? '<p class="small" style="margin-top:6px">This answer was short, so this level is less certain.</p>' : '') + '</div>';
    };
    view.innerHTML = '<section class="result"><div class="eyebrow">' + esc(T.name) + ' · ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '</div>' +
      '<div class="ptbig"><span>Your level</span><strong>' + label(R.overall) + '</strong></div><p class="lead">' + desc + '</p>' +
      '<div class="rec"><span>Recommended course</span><b>' + esc(R.course) + '</b></div></section>' +
      '<section class="cols2"><div class="box"><h3>Your skills</h3>' + Object.keys(NAMES).map(function (k) { return R.skills[k] != null ? bar(k, R.skills[k]) : ''; }).join('') +
      '<p class="small" style="margin-top:10px">Pre-A1 · A1 · A2 · B1 · B2 · C1 · C2 (Common European Framework). Grammar, vocabulary, reading and listening use the same question bank for every student; writing and speaking are rated by AI using CEFR descriptors.</p>' +
      (ai.error ? '<div class="err" style="margin-top:10px">Writing and speaking could not be marked just now, so this result is based on the other four parts. A teacher can check your answers.</div>' : '') + '</div>' +
      fb('Writing', ai.writing) + fb('Speaking', ai.speaking) + '</section>' +
      '<div class="row" style="margin:18px 0 40px"><span id="sv" class="small"></span><span class="spacer" style="flex:1"></span><button class="btn ghost" onclick="print()">Print or save as PDF</button><button class="btn ghost" id="again">Take the test again</button></div>';
    $('#again').onclick = function () { if (confirm('Start a new test? This result stays saved.')) { lsSet('pt:state', null); T = null; vStart(); } };
  }
  async function saveResult() {
    if (T.savedId) { $('#sv').textContent = 'Result sent to IF Academy.'; return; }
    try {
      var r = await fetch('/api/placement/save', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: T.result, contact: { name: T.name, phone: T.phone, age: T.age } }) });
      var d = await r.json().catch(function () { return {}; });
      if (r.ok) { T.savedId = d.id; save(); $('#sv').textContent = d.linked ? 'Saved to your IF Academy record.' : 'Result sent to IF Academy.'; }
      else $('#sv').textContent = 'Could not send the result. Show this page to your teacher.';
    } catch (e) { $('#sv').textContent = 'Could not send the result. Show this page to your teacher.'; }
  }

  async function boot() {
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span></p>';
    var r = await fetch('bank.json', { cache: 'no-cache' }); BANK = await r.json();
    await loadUser();
    var s = lsGet('pt:state');
    if (s && s.stage === 'done' && s.result) { T = s; showResult(); saveResult(); return; }
    vStart();
  }
  boot();
})();
