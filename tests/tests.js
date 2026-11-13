/* IF AI Test Centre — create AI-written tests for any course/unit/level, take them, see AI marking and class results. */
(function () {
  'use strict';
  var L = window.LIVE, $ = L.$, esc = L.esc, view = $('#view');
  var ME = null, BANKS = null;
  var COURSES = [
    ['gen', 'General English (any level)', null, null],
    ['v-A1', 'English File Elementary', 'A1'], ['v-A2', 'English File Pre-intermediate', 'A2'], ['v-B1', 'English File Intermediate', 'B1'],
    ['v-B2', 'English File Upper-intermediate', 'B2'], ['v-C1', 'English File Advanced', 'C1'],
    ['v-TeensB1', 'English for Teenagers B1–B2', 'B1'], ['v-TeensB2', 'English for Teenagers B2–C1', 'B2'],
    ['v-Movers', 'Cambridge Movers', 'A1'], ['v-Flyers', 'Cambridge Flyers', 'A2'], ['v-KET', 'Cambridge KET', 'A2'], ['v-PET', 'Cambridge PET', 'B1'],
    ['v-IELTS', 'IELTS', 'B2']
  ];
  var LENGTHS = { quick: { name: 'Quick check · 12 questions', g: 6, v: 6, r: 0, w: false, min: 10 }, unit: { name: 'Unit test · 25 questions + writing', g: 10, v: 10, r: 5, w: true, min: 40 }, progress: { name: 'Progress test · 38 questions + writing', g: 15, v: 15, r: 8, w: true, min: 60 } };
  var C = Object.assign({ course: 'gen', level: 'B1', units: [], topic: '', length: 'unit', timed: false }, L.ls.get('tests.cfg') || {});

  async function api(path, body) {
    var res = await fetch('/api/tests/' + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), credentials: 'same-origin' } : { credentials: 'same-origin' });
    if (res.status === 401 && !api.r && window.NFIdentity) { api.r = 1; try { await NFIdentity.refreshSession(); } catch (e) {} return api(path, body); }
    var d = await res.json().catch(function () { return {}; });
    if (!res.ok) { var e = new Error(d.error || res.status); e.code = d.error; e.status = res.status; throw e; }
    return d;
  }
  async function loadMe() { try { var r = await fetch('/api/school/me', { credentials: 'same-origin' }); if (r.ok) { var d = await r.json(); ME = d.profile || null; } } catch (e) {} }
  function staff() { return ME && (ME.role === 'teacher' || ME.role === 'admin'); }
  function bank(id) { return BANKS.filter(function (b) { return b.id === id; })[0]; }
  function course(id) { return COURSES.filter(function (c) { return c[0] === id; })[0]; }
  function when(iso) { return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }
  function grade(p) { return p >= 90 ? 'Excellent' : p >= 75 ? 'Very good' : p >= 60 ? 'Good' : p >= 45 ? 'Keep practising' : 'Needs revision'; }

  /* ================= home ================= */
  async function vHome() {
    view.innerHTML = '<div class="hwrap"><p class="mini">Loading…</p></div>';
    if (!BANKS) try { BANKS = (await (await fetch('/live/banks.json')).json()).banks; } catch (e) { BANKS = []; }
    var mine = null; if (ME) try { mine = await api('mine'); } catch (e) {}
    var h = '<div class="hwrap"><div class="hero"><h1>AI Test Centre</h1><p>AI writes a new test for any course, unit or level in seconds: grammar, vocabulary, reading and writing. It is marked straight away, the writing too, with explanations and advice on what to revise.</p></div>' +
      '<div class="grid2"><div>' +
      '<div class="panel"><h2>Have a test code?</h2><p class="sub">Your teacher gives you a 6-letter code or a link.</p><form class="codebox" id="cf"><input class="inp" id="code" maxlength="6" placeholder="CODE" autocomplete="off"><button class="btn navy">Open test</button></form><div class="err" id="cerr" style="color:var(--bad)"></div></div>' +
      '<div class="panel"><h2>' + (staff() ? 'Create a test for your class' : 'Make a practice test') + '</h2><p class="sub">' + (staff() ? 'You get a code, link and QR code for students. Results come back to you, and are added to each student\'s record.' : 'A new test every time, marked instantly.') + '</p>' +
      (ME ? '<div id="form"></div>' : '<p>Please <a href="/me/#/login">sign in</a> to make AI tests. If your teacher gave you a code, enter it above (no account needed).</p>') + '</div></div>' +
      '<div>' + (mine ? mineHtml(mine) : '') + '<div class="panel"><h2>Other tests</h2><div class="list"><div class="row"><div style="flex:1"><b>IF Placement Test</b><div class="mini">Find your level · AI marks writing and speaking</div></div><a class="btn sm navy" href="/a/placement-test/">Open</a></div><div class="row"><div style="flex:1"><b>IELTS Centre</b><div class="mini">AI-marked IELTS Writing and Speaking</div></div><a class="btn sm navy" href="/a/ielts/">Open</a></div></div></div></div></div></div>';
    view.innerHTML = h;
    $('#cf').onsubmit = function (e) { e.preventDefault(); var c = $('#code').value.trim().toUpperCase(); if (c.length !== 6) { $('#cerr').textContent = 'The code has 6 letters and numbers.'; return; } location.hash = '#/t/' + c; };
    if (ME) form();
  }
  function mineHtml(m) {
    var h = '';
    if (m.made && m.made.length) h += '<div class="panel"><h2>Tests you created</h2><div class="list">' + m.made.slice(0, 12).map(function (t) { return '<div class="row"><div style="flex:1"><b>' + esc(t.title) + '</b><div class="mini">' + when(t.at) + ' · code <b>' + t.code + '</b></div></div><a class="linkbtn" href="#/ready/' + t.code + '">Share</a> <a class="btn sm navy" href="#/results/' + t.code + '">Results</a></div>'; }).join('') + '</div></div>';
    if (m.taken && m.taken.length) h += '<div class="panel"><h2>Your results</h2><div class="list">' + m.taken.slice(0, 12).map(function (t) { return '<div class="row"><div style="flex:1"><b>' + esc(t.title) + '</b><div class="mini">' + when(t.at) + '</div></div><span class="tag2">' + t.pct + '%</span> <a class="linkbtn" href="#/r/' + t.code + '/' + t.rid + '">Review</a></div>'; }).join('') + '</div></div>';
    return h;
  }

  function form() {
    var box = $('#form'), c = course(C.course) || COURSES[0], b = c[0] === 'gen' ? null : bank(c[0]);
    if (b && (!C.units.length || !C.units.every(function (u) { return b.units.some(function (x) { return x.id === u; }); }))) C.units = [b.units[0].id];
    var h = '<label class="f">Course</label><select class="inp" id="crs">' + COURSES.map(function (x) { return '<option value="' + x[0] + '"' + (x[0] === c[0] ? ' selected' : '') + '>' + esc(x[1]) + '</option>'; }).join('') + '</select>';
    if (!b) h += '<label class="f">Level</label><div class="seg" id="lv">' + L.LEVELS.map(function (l) { return '<button type="button" data-v="' + l + '" class="' + (C.level === l ? 'on' : '') + '">' + l + '</button>'; }).join('') + '</div>' +
      '<label class="f">Topic or grammar point <span style="text-transform:none;letter-spacing:0">(optional)</span></label><input class="inp" id="tp" maxlength="150" placeholder="e.g. travel, present perfect, phrasal verbs with get" value="' + esc(C.topic) + '">';
    else h += '<label class="f">Units <button class="linkbtn" type="button" id="allu" style="text-transform:none;letter-spacing:0;margin-left:8px">select all</button></label><div class="units">' + b.units.map(function (u) { return '<label><input type="checkbox" value="' + esc(u.id) + '"' + (C.units.indexOf(u.id) >= 0 ? ' checked' : '') + '> <b>' + esc(u.id) + '</b> ' + esc(u.t) + '</label>'; }).join('') + '</div>';
    h += '<label class="f">Test</label><div class="seg" id="len">' + Object.keys(LENGTHS).map(function (k) { return '<button type="button" data-v="' + k + '" class="' + (C.length === k ? 'on' : '') + '">' + LENGTHS[k].name + '</button>'; }).join('') + '</div>' +
      '<label class="units" style="display:flex;gap:10px;align-items:center;margin-top:12px;max-height:none;cursor:pointer"><input type="checkbox" id="timed"' + (C.timed ? ' checked' : '') + '> <span>Time limit (<span id="mins">' + LENGTHS[C.length].min + '</span> minutes)</span></label>' +
      '<div style="margin-top:16px"><button class="btn navy big" id="mk">✨ ' + (staff() ? 'Create test' : 'Start my test') + '</button></div><ul class="prog" id="prog"></ul><div class="err" id="ferr" style="color:var(--bad)"></div>';
    box.innerHTML = h;
    $('#crs').onchange = function () { C.course = this.value; C.units = []; var cc = course(C.course); if (cc[2]) C.level = cc[2]; form(); };
    if (!b) {
      $('#lv').querySelectorAll('button').forEach(function (x) { x.onclick = function () { C.level = x.dataset.v; form(); }; });
      $('#tp').oninput = function () { C.topic = this.value.trim(); };
    } else {
      box.querySelectorAll('.units input[type=checkbox]').forEach(function (x) { x.onchange = function () { C.units = Array.prototype.filter.call(box.querySelectorAll('.units input[type=checkbox]'), function (y) { return y.checked; }).map(function (y) { return y.value; }); }; });
      $('#allu').onclick = function () { C.units = C.units.length === b.units.length ? [b.units[0].id] : b.units.map(function (u) { return u.id; }); form(); };
    }
    $('#len').querySelectorAll('button').forEach(function (x) { x.onclick = function () { C.length = x.dataset.v; form(); }; });
    $('#timed').onchange = function () { C.timed = this.checked; };
    $('#mk').onclick = make;
  }

  /* AI writes the sections in parallel (small pieces keep each request fast) */
  async function make() {
    var c = course(C.course), b = c[0] === 'gen' ? null : bank(c[0]), Lh = LENGTHS[C.length], err = $('#ferr');
    if (b && !C.units.length) { err.textContent = 'Choose at least one unit.'; return; }
    L.ls.set('tests.cfg', C);
    var units = b ? b.units.filter(function (u) { return C.units.indexOf(u.id) >= 0; }) : [];
    var words = []; units.forEach(function (u) { u.w.forEach(function (w) { words.push(w[0]); }); }); words = L.shuffle(words);
    var level = b ? c[2] : C.level, topic = b ? units.map(function (u) { return u.id + ' ' + u.t; }).slice(0, 5).join('; ') : C.topic;
    var base = { level: level, course: c[1], topic: topic };
    var jobs = [];
    function mcq(kind, n, label) { var parts = Math.ceil(n / 8); for (var i = 0; i < parts; i++) jobs.push({ label: label + (parts > 1 ? ' (' + (i + 1) + '/' + parts + ')' : ''), kind: kind, body: Object.assign({}, base, { kind: kind, n: Math.ceil(n / parts), part: parts > 1 ? i + 1 : 0, words: kind === 'vocab' ? words.filter(function (_, k) { return k % parts === i; }).slice(0, 30) : [] }) }); }
    mcq('grammar', Lh.g, 'Grammar'); mcq('vocab', Lh.v, 'Vocabulary');
    if (Lh.r) jobs.push({ label: 'Reading text and questions', kind: 'reading', body: Object.assign({}, base, { kind: 'reading', n: Lh.r }) });
    if (Lh.w) jobs.push({ label: 'Writing task', kind: 'writing', body: Object.assign({}, base, { kind: 'writing' }) });
    $('#mk').disabled = true; err.textContent = '';
    var prog = $('#prog'); prog.innerHTML = '<li style="font-weight:700;color:var(--navy)">✨ AI is writing your test…</li>' + jobs.map(function (j, i) { return '<li id="j' + i + '"><span class="st"><span class="spin"></span></span>' + esc(j.label) + '</li>'; }).join('');
    var out = await Promise.all(jobs.map(function (j, i) {
      var attempt = function (n) { return api('section', j.body).catch(function (e) { if (n < 1 && e.code !== 'quota') return attempt(n + 1); throw e; }); };
      return attempt(0).then(function (r) { $('#j' + i + ' .st').textContent = '✓'; return r.section; }, function (e) { $('#j' + i + ' .st').textContent = '✕'; return { error: e.code || 'ai' }; });
    }));
    if (out.some(function (s) { return s.error === 'quota'; })) { $('#mk').disabled = false; err.textContent = 'You have made a lot of tests today. Try again tomorrow.'; return; }
    var secs = [], byKind = {};
    out.forEach(function (s) { if (!s || s.error) return; if (s.qs && (s.kind === 'grammar' || s.kind === 'vocab')) { if (byKind[s.kind]) byKind[s.kind].qs = byKind[s.kind].qs.concat(s.qs); else { byKind[s.kind] = s; secs.push(s); } } else secs.push(s); });
    var order = { grammar: 0, vocab: 1, reading: 2, writing: 3 }; secs.sort(function (a, b) { return order[a.kind] - order[b.kind]; });
    if (!secs.length) { $('#mk').disabled = false; err.textContent = 'AI is busy right now. Please try again in a minute.'; return; }
    if (secs.length < new Set(jobs.map(function (j) { return j.kind; })).size) err.textContent = 'One part could not be written, so the test is a little shorter.';
    try {
      var title = (b ? c[1] + ' · ' + (units.length === 1 ? units[0].id + ' ' + units[0].t : units.length + ' units') : 'General English ' + level + (C.topic ? ' · ' + C.topic : '')) + ' · ' + (C.length === 'quick' ? 'Quick check' : C.length === 'unit' ? 'Unit test' : 'Progress test');
      var r = await api('create', { title: title, course: c[1], level: level, minutes: C.timed ? Lh.min : 0, sections: secs });
      location.hash = staff() ? '#/ready/' + r.code : '#/t/' + r.code;
    } catch (e) { $('#mk').disabled = false; err.textContent = 'Could not save the test. Try again.'; }
  }

  /* ================= share (teacher) ================= */
  function vReady(code) {
    var url = location.origin + '/tests/?code=' + code;
    view.innerHTML = '<div class="hwrap"><div class="panel"><h2>Your test is ready</h2><p class="sub">Students open the link or scan the code, then type their name (or sign in). Results appear on the Results page and in each linked student\'s record.</p>' +
      '<div class="ready"><div class="qr">' + L.qr(url) + '</div><div><div class="mini">Code</div><div class="bigcode">' + code + '</div><div class="mini" style="margin:6px 0 14px">' + esc(url) + '</div>' +
      '<div class="ctrl" style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn navy" id="cp">Copy link</button><a class="btn ghost" href="#/results/' + code + '">Results</a><a class="btn ghost" href="#/t/' + code + '">Preview</a><a class="btn ghost" href="#/key/' + code + '">Answer key</a></div></div></div></div></div>';
    $('#cp').onclick = function () { try { navigator.clipboard.writeText(url); $('#cp').textContent = 'Copied ✓'; } catch (e) {} };
  }

  /* ================= take a test ================= */
  var RUN = null;
  async function vTake(code) {
    view.innerHTML = '<div class="test"><p class="mini">Opening test…</p></div>';
    var t; try { t = await api('t/' + code); } catch (e) { view.innerHTML = '<div class="test"><div class="panel"><h2>Test not found</h2><p class="sub">Check the code with your teacher.</p><a class="btn navy" href="/tests/">Back</a></div></div>'; return; }
    var saved = L.ls.get('tests.ans.' + code) || {};
    RUN = { t: t, code: code, ans: saved.ans || {}, writing: saved.writing || '', started: saved.started || Date.now() };
    var n = 0;
    var h = '<div class="test"><div class="thead"><h1>' + esc(t.title) + '</h1><span class="meta">' + esc(t.level) + (t.by ? ' · set by ' + esc(t.by) : '') + '</span>' + (t.minutes ? '<span class="clock" id="clock"></span>' : '') + '</div>';
    if (!ME) h += '<div class="panel" style="margin-top:16px"><label class="f" style="margin-top:0">Your name</label><input class="inp" id="nm" maxlength="60" placeholder="First and last name" value="' + esc(saved.name || L.ls.get('tests.name') || '') + '"><p class="mini" style="margin-top:6px">Signed-in students get the result saved to their profile automatically. <a href="/me/#/login">Sign in</a></p></div>';
    t.sections.forEach(function (s, si) {
      h += '<section class="sec"><h2>' + esc(s.title) + '</h2>';
      if (s.text) h += '<div class="reading">' + (s.heading ? '<h3>' + esc(s.heading) + '</h3>' : '') + s.text.split(/\n\s*\n/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>';
      if (s.qs) s.qs.forEach(function (q, qi) {
        n++;
        h += '<div class="q"><div class="p"><b>' + n + '</b>' + esc(q.p) + '</div><div class="ch">' + q.o.map(function (o, k) { var on = RUN.ans[si] && RUN.ans[si][qi] === k; return '<label class="' + (on ? 'on' : '') + '"><input type="radio" name="q' + si + '_' + qi + '" data-s="' + si + '" data-q="' + qi + '" value="' + k + '"' + (on ? ' checked' : '') + '>' + esc(o) + '</label>'; }).join('') + '</div></div>';
      });
      if (s.task) h += '<div class="task"><b>' + esc(s.task) + '</b>' + (s.points && s.points.length ? '<ul>' + s.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '') + '<p class="mini" style="margin-top:6px">Write ' + s.min + '–' + s.max + ' words · ' + s.marks + ' marks</p></div><textarea class="inp write" id="wr" spellcheck="false" placeholder="Write your answer here…">' + esc(RUN.writing) + '</textarea><div class="wc" id="wc"></div>';
      h += '</section>';
    });
    h += '<div class="submitbar"><button class="btn navy big" id="sub">Finish and get my result</button><span class="mini" id="left"></span></div><div class="err" id="serr" style="color:var(--bad)"></div></div>';
    view.innerHTML = h;
    view.querySelectorAll('input[type=radio]').forEach(function (r) {
      r.onchange = function () { var si = r.dataset.s, qi = r.dataset.q; (RUN.ans[si] = RUN.ans[si] || {})[qi] = +r.value; r.closest('.ch').querySelectorAll('label').forEach(function (l) { l.classList.toggle('on', l.contains(r)); }); keep(); count(); };
    });
    var wr = $('#wr'); if (wr) { wr.oninput = function () { RUN.writing = wr.value; keep(); count(); }; }
    var nm = $('#nm'); if (nm) nm.oninput = keep;
    $('#sub').onclick = function () { submit(false); };
    count();
    if (t.minutes) tick();
  }
  function keep() { L.ls.set('tests.ans.' + RUN.code, { ans: RUN.ans, writing: RUN.writing, started: RUN.started, name: $('#nm') ? $('#nm').value : '' }); }
  function count() {
    var tot = 0, done = 0; RUN.t.sections.forEach(function (s, si) { if (s.qs) s.qs.forEach(function (_, qi) { tot++; if (RUN.ans[si] && RUN.ans[si][qi] != null) done++; }); });
    var w = (RUN.writing.match(/[A-Za-z0-9'’-]+/g) || []).length, wc = $('#wc'); if (wc) wc.textContent = w + ' words';
    $('#left').textContent = done + ' of ' + tot + ' answered' + (wc ? ' · writing ' + w + ' words' : '');
  }
  function tick() {
    if (!RUN || !$('#clock')) return;
    var left = RUN.t.minutes * 60000 - (Date.now() - RUN.started), s = Math.max(0, Math.ceil(left / 1000)), el = $('#clock');
    el.textContent = '⏱ ' + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); el.classList.toggle('low', s < 120);
    if (left <= 0) return submit(true);
    setTimeout(tick, 1000);
  }
  async function submit(auto) {
    if (RUN.sending) return;
    var nm = $('#nm'), name = nm ? nm.value.trim() : '';
    if (nm && name.length < 2) { $('#serr').textContent = 'Please type your name at the top.'; nm.focus(); return; }
    if (!auto) {
      var miss = 0; RUN.t.sections.forEach(function (s, si) { if (s.qs) s.qs.forEach(function (_, qi) { if (!(RUN.ans[si] && RUN.ans[si][qi] != null)) miss++; }); });
      if ((miss || ($('#wr') && RUN.writing.trim().length < 20)) && !RUN.warned) { RUN.warned = true; $('#serr').textContent = (miss ? miss + ' question' + (miss > 1 ? 's are' : ' is') + ' not answered' : 'The writing is very short') + '. Press the button again to finish anyway.'; return; }
    }
    if (nm) L.ls.set('tests.name', name);
    RUN.sending = true; $('#sub').disabled = true; $('#serr').style.color = 'var(--navy)'; $('#serr').innerHTML = '<span class="spin"></span> Marking' + ($('#wr') ? ' (AI is reading your writing)' : '') + '…';
    try {
      var r = await api('submit', { code: RUN.code, name: name, answers: RUN.ans, writing: RUN.writing });
      L.ls.set('tests.ans.' + RUN.code, null);
      report(r.result, r.review, r.test);
    } catch (e) { RUN.sending = false; $('#sub').disabled = false; $('#serr').style.color = ''; $('#serr').textContent = 'Could not send your answers. Check the internet and press the button again — your answers are kept.'; }
  }

  /* ================= result ================= */
  function report(r, review, test) {
    window.scrollTo(0, 0);
    var h = '<div class="test"><div class="thead"><h1>' + esc(r.title) + '</h1><span class="meta">' + esc(r.name) + ' · ' + when(r.at) + '</span><button class="btn ghost sm noprint" onclick="print()">Print</button></div>' +
      '<div class="score"><div><div class="big">' + r.score + ' / ' + r.max + '</div><div class="pc">' + r.pct + '%</div></div><div class="grade">' + grade(r.pct) + '</div></div>' +
      '<div class="bars">' + r.sections.map(function (s) { return '<div class="bar"><span>' + esc(s.title) + '</span><span class="t"><i style="width:' + (s.got / s.of * 100) + '%"></i></span><b>' + s.got + ' / ' + s.of + '</b></div>'; }).join('') +
      (r.writing ? '<div class="bar"><span>Writing</span><span class="t"><i style="width:' + (r.writing.score * 10) + '%"></i></span><b>' + r.writing.score + ' / 10</b></div>' : '') + '</div>' +
      (r.advice ? '<div class="advice"><b>✨ Advice:</b> ' + esc(r.advice) + '</div>' : '');
    if (r.writing) h += '<section class="sec"><h2>Your writing</h2><div class="task"><p><b>' + r.writing.score + '/10</b> · content ' + r.writing.content + '/4 · organisation ' + r.writing.organisation + '/2 · language ' + r.writing.language + '/4' + (r.writing.level ? ' · about ' + esc(r.writing.level) : '') + '</p><p style="margin-top:6px">' + esc(r.writing.comment) + '</p>' +
      (r.writing.corrections.length ? '<div class="corr">' + r.writing.corrections.map(function (c) { return '<div><s>' + esc(c.original) + '</s> → <ins>' + esc(c.better) + '</ins> <span class="mini">' + esc(c.why) + '</span></div>'; }).join('') + '</div>' : '') + '</div></section>';
    else if (r.writingPending) h += '<div class="advice">Your writing was saved. The AI marker was busy, so your teacher will mark it.</div>';
    if (review && test) {
      var n = 0;
      test.sections.forEach(function (s, si) {
        if (!s.qs) return;
        h += '<section class="sec"><h2>' + esc(s.title) + ' · answers</h2>';
        s.qs.forEach(function (q, qi) {
          n++; var rv = review[si][qi];
          h += '<div class="q ' + (rv.ok ? 'ok' : 'no') + '"><div class="p"><b>' + n + '</b>' + esc(q.p) + '</div><div class="ch">' + q.o.map(function (o, k) { return '<label class="' + (k === rv.a ? 'right' : k === rv.c ? 'wrong' : '') + '">' + (k === rv.a ? '✓ ' : k === rv.c ? '✕ ' : '') + esc(o) + '</label>'; }).join('') + '</div>' + (rv.x ? '<div class="x">' + esc(rv.x) + '</div>' : '') + '</div>';
        });
        h += '</section>';
      });
    }
    h += '<div class="submitbar noprint"><a class="btn navy" href="/tests/">Back to the Test Centre</a></div></div>';
    view.innerHTML = h;
  }
  async function vResult(code, rid) {
    view.innerHTML = '<div class="test"><p class="mini">Loading…</p></div>';
    try {
      var d = await api('result/' + code + '/' + rid);
      report(d.result, d.review, d.test);
    } catch (e) { view.innerHTML = '<div class="test"><div class="panel"><h2>Result not available</h2><a class="btn navy" href="/tests/">Back</a></div></div>'; }
  }

  /* ================= results (teacher) ================= */
  async function vResults(code) {
    view.innerHTML = '<div class="hwrap"><p class="mini">Loading…</p></div>';
    try {
      var d = await api('results/' + code), rows = d.rows;
      var avg = rows.length ? Math.round(rows.reduce(function (a, r) { return a + r.pct; }, 0) / rows.length) : 0;
      view.innerHTML = '<div class="hwrap"><div class="panel"><h2>' + esc(d.test.title) + '</h2><p class="sub">Code <b>' + code + '</b> · ' + rows.length + ' result' + (rows.length === 1 ? '' : 's') + (rows.length ? ' · class average ' + avg + '%' : '') + ' · <a href="#/ready/' + code + '">share</a> · <button class="linkbtn" id="rf">refresh</button></p>' +
        (rows.length ? '<div style="overflow-x:auto"><table class="res"><thead><tr><th>#</th><th>Student</th><th>Score</th><th>Sections</th><th>Writing</th><th>Advice</th></tr></thead><tbody>' + rows.map(function (r, i) {
          return '<tr><td>' + (i + 1) + '</td><td><b>' + esc(r.name) + '</b><div class="mini">' + when(r.at) + '</div></td><td><span class="tag2">' + r.pct + '%</span><div class="mini">' + r.score + '/' + r.max + '</div></td><td class="mini">' + r.sections.map(function (s) { return esc(s.title) + ' ' + s.got + '/' + s.of; }).join('<br>') + '</td><td>' + (r.writing != null ? r.writing + '/10' : '–') + '</td><td class="mini" style="max-width:320px">' + esc(r.advice || '') + ' <a href="#/r/' + code + '/' + r.rid + '">Open</a></td></tr>';
        }).join('') + '</tbody></table></div>' : '<p class="mini">No one has finished this test yet.</p>') + '</div></div>';
      $('#rf').onclick = function () { vResults(code); };
    } catch (e) { view.innerHTML = '<div class="hwrap"><div class="panel"><h2>Results not available</h2><p class="sub">Only the teacher who created the test (or staff) can see its results.</p></div></div>'; }
  }

  /* ================= answer key (teacher) ================= */
  async function vKey(code) {
    view.innerHTML = '<div class="test"><p class="mini">Loading…</p></div>';
    try {
      var d = await api('key/' + code); d.review = d.review.map(function (sec) { return sec && sec.map(function (r) { return Object.assign({}, r, { ok: true, c: null }); }); }); report({ title: d.title + ' · answer key', name: 'Answer key', at: new Date().toISOString(), score: '–', max: '–', pct: '–', sections: [], advice: '' }, d.review, d.test);
      $('.score').remove();
    } catch (e) { view.innerHTML = '<div class="test"><div class="panel"><h2>Answer key not available</h2></div></div>'; }
  }

  async function route() {
    var p = location.hash.replace(/^#\/?/, '').split('/');
    if (p[0] === 't' && p[1]) return vTake(p[1].toUpperCase());
    if (p[0] === 'ready' && p[1]) return vReady(p[1].toUpperCase());
    if (p[0] === 'results' && p[1]) return vResults(p[1].toUpperCase());
    if (p[0] === 'key' && p[1]) return vKey(p[1].toUpperCase());
    if (p[0] === 'r' && p[1] && p[2]) return vResult(p[1].toUpperCase(), p[2]);
    return vHome();
  }
  window.addEventListener('hashchange', route);
  var qc = new URLSearchParams(location.search).get('code');
  loadMe().then(function () {
    if (qc) { history.replaceState(null, '', '/tests/#/t/' + qc.toUpperCase()); }
    route();
  });
})();
