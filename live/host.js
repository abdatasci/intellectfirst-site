/* IF Live — teacher host screen (setup, lobby with QR, questions, live leaderboard), and watch mode for other staff. */
(function () {
  'use strict';
  var L = window.LIVE, $ = L.$, esc = L.esc, view = $('#view');
  var qsp = new URLSearchParams(location.search);
  var BANKS = null, ROOMS = null, H = null, BUS = null, ST = null, WATCH = null, timers = {};
  var CFG = Object.assign({ source: 'gen', level: 'B1', focus: 'mix', topic: '', ai: true, bank: 'v-A2', units: [], qtype: 'def', count: '15', mode: 'classic', time: 20, race: 5, teams: 0, custom: '', title: '' }, L.ls.get('live.cfg') || {});

  function stage(on) { document.body.classList.toggle('light', !on); $('#fs').hidden = !on; $('#back').hidden = !!on; }
  $('#fs').onclick = function () { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen().catch(function () {}); };
  function joinUrl(pin) { return location.origin + '/live/?pin=' + pin + (L.local ? '&bus=local' : ''); }

  /* ================= setup ================= */
  async function vSetup() {
    stage(false); $('#pinpill').hidden = true;
    view.innerHTML = '<div class="hwrap"><div class="panel"><span class="mini">Loading…</span></div></div>';
    try {
      if (!BANKS) BANKS = (await (await fetch('/live/banks.json')).json()).banks;
      ROOMS = L.local ? { ready: true, rooms: [], recent: [] } : await L.api('rooms');
    } catch (e) {
      view.innerHTML = '<div class="hwrap"><div class="panel"><h2>IF Live</h2><p class="sub">' + (e.status === 401 ? 'Please sign in with your teacher account first.' : e.status === 403 ? 'Hosting live games is for teachers and staff. Ask the director to give your account the Teacher role.' : 'Could not load. Check the connection and try again.') + '</p><a class="btn navy" href="/me/#/login">Sign in</a></div></div>';
      return;
    }
    var saved = L.ls.get('live.host');
    var resume = saved && Date.now() - saved.created < 4 * 3600e3 && saved.phase !== 'end' ? saved : null;
    var h = '<div class="hwrap">';
    if (!ROOMS.ready) h += '<div class="note"><b>Live games need one setting before the first game.</b> Create a free account at ably.com, copy the API key from your app\'s <i>API Keys</i> tab (it looks like <code>xVLyHw.A-pwh7w:…</code>) and add it in Netlify → Project configuration → Environment variables as <code>ABLY_API_KEY</code>. Then redeploy the site.</div>';
    if (resume) h += '<div class="note">Your game <b>' + esc(resume.title) + '</b> (PIN ' + resume.pin + ') is still open. <button class="linkbtn" id="resume">Resume it</button> · <button class="linkbtn" id="drop">Close it</button></div>';
    h += '<div class="grid2"><div class="panel"><h2>Start a live game</h2><p class="sub">Students join on their phones with the QR code or the PIN. You run the game from this screen; project it in class.</p>' +
      '<label class="f">Questions from</label><div class="seg" id="src">' + [['gen', 'General English ✨'], ['v', 'Book vocabulary'], ['g', 'Grammar'], ['custom', 'My own questions']].map(function (s) { return '<button data-v="' + s[0] + '" class="' + (CFG.source === s[0] ? 'on' : '') + '">' + s[1] + '</button>'; }).join('') + '</div>' +
      '<div id="srcbox"></div>' +
      '<label class="f">Game type</label><div class="seg" id="mode">' + [['classic', 'Classic · teacher-paced'], ['race', 'Race · self-paced']].map(function (s) { return '<button data-v="' + s[0] + '" class="' + (CFG.mode === s[0] ? 'on' : '') + '">' + s[1] + '</button>'; }).join('') + '</div>' +
      '<p class="mini" id="modehelp" style="margin-top:6px"></p>' +
      '<div id="timebox"></div>' +
      '<label class="f">Teams</label><div class="seg" id="teams">' + [[0, 'Everyone for themselves'], [2, '2 teams'], [3, '3 teams'], [4, '4 teams']].map(function (s) { return '<button data-v="' + s[0] + '" class="' + (+CFG.teams === s[0] ? 'on' : '') + '">' + s[1] + '</button>'; }).join('') + '</div>' +
      '<label class="f">Game title</label><input class="inp" id="title" maxlength="80" placeholder="Shown on the screen">' +
      '<div style="margin-top:18px;display:flex;gap:12px;align-items:center;flex-wrap:wrap"><button class="btn navy big" id="go"' + (ROOMS.ready ? '' : ' disabled') + '>Open the game room</button><span class="mini" id="qcount"></span></div><div class="err" id="err" style="color:var(--bad)"></div></div>';
    h += '<div><div class="panel"><h2>Live now</h2><p class="sub">Games running at the school. Any teacher can watch the live scoreboard.</p><div class="list">' +
      (ROOMS.rooms.length ? ROOMS.rooms.map(function (r) { return '<div class="row"><div style="flex:1"><b>' + esc(r.title) + '</b><div class="mini">' + esc(r.hostName || '') + ' · PIN ' + r.pin + ' · ' + (r.status === 'playing' ? 'playing' : 'waiting for players') + (r.players ? ' · ' + r.players + ' players' : '') + '</div></div><a class="btn sm navy" href="?watch=' + r.pin + '">Watch</a></div>'; }).join('') : '<p class="mini">No games running right now.</p>') + '</div></div>' +
      '<div class="panel"><h2>Recent results</h2><div class="list" id="recent">' + (ROOMS.recent.length ? ROOMS.recent.map(function (r) { return '<div class="row"><div style="flex:1"><b>' + esc(r.title) + '</b><div class="mini">' + new Date(r.at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' · ' + esc(r.hostName || '') + ' · ' + r.players + ' players' + (r.top.length ? ' · 🏆 ' + esc(r.top[0]) : '') + '</div></div><button class="linkbtn" data-res="' + esc(r.key) + '">Scores</button></div>'; }).join('') : '<p class="mini">Finished games appear here with every student\'s score.</p>') + '</div><div id="resbox"></div></div></div></div></div>';
    view.innerHTML = h;
    if (resume) { $('#resume').onclick = function () { resumeGame(resume); }; $('#drop').onclick = function () { L.ls.set('live.host', null); if (!L.local) L.api('state', { pin: resume.pin, status: 'ended' }).catch(function () {}); vSetup(); }; }
    segs(); srcBox(); timeBox();
    view.querySelectorAll('[data-res]').forEach(function (b) { b.onclick = function () { showResult(b.dataset.res); }; });
    $('#go').onclick = start;
  }
  function segs() {
    ['src', 'mode', 'teams'].forEach(function (id) {
      $('#' + id).querySelectorAll('button').forEach(function (b) {
        b.onclick = function () {
          $('#' + id).querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
          var v = b.dataset.v;
          if (id === 'src') { CFG.source = v; if (v !== 'custom' && v !== 'gen' && (bankOf(CFG.bank) || {}).kind !== v) { CFG.bank = BANKS.filter(function (x) { return x.kind === v; })[0].id; CFG.units = []; } srcBox(); }
          if (id === 'mode') { CFG.mode = v; timeBox(); }
          if (id === 'teams') CFG.teams = +v;
          count();
        };
      });
    });
  }
  function bankOf(id) { return BANKS.filter(function (b) { return b.id === id; })[0]; }
  function srcBox() {
    var box = $('#srcbox');
    if (CFG.source === 'gen') {
      box.innerHTML = L.genForm(CFG) + '<label class="f">Number of questions</label><div class="seg" id="cnt">' + ['10', '15', '20', '30'].map(function (s) { return '<button data-v="' + s + '" class="' + (CFG.count === s ? 'on' : '') + '">' + s + '</button>'; }).join('') + '</div>';
      L.genWire(box, CFG, count);
      var c0 = $('#cnt'); c0.querySelectorAll('button').forEach(function (bt) { bt.onclick = function () { c0.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === bt); }); CFG.count = bt.dataset.v; count(); }; });
      return count();
    }
    if (CFG.source === 'custom') {
      box.innerHTML = '<label class="f">Your questions · one per line</label><textarea class="inp" id="custom" placeholder="Question | correct answer | wrong answer | wrong answer | wrong answer\nShe ___ to school every day. | goes | go | going\nThe opposite of &quot;cheap&quot; | expensive | easy | early">' + esc(CFG.custom) + '</textarea><p class="mini" style="margin-top:6px">Write the correct answer first; the order is mixed for the students. 2–4 answers per question.</p>';
      $('#custom').oninput = function () { CFG.custom = this.value; count(); };
      return count();
    }
    var list = BANKS.filter(function (b) { return b.kind === CFG.source; });
    if (!bankOf(CFG.bank) || bankOf(CFG.bank).kind !== CFG.source) CFG.bank = list[0].id;
    var b = bankOf(CFG.bank);
    if (!CFG.units.length || !CFG.units.every(function (u) { return b.units.some(function (x) { return x.id === u; }); })) CFG.units = [b.units[0].id];
    box.innerHTML = '<label class="f">' + (CFG.source === 'g' ? 'Grammar set' : 'Book') + '</label><select class="inp" id="bank">' + list.map(function (x) { return '<option value="' + x.id + '"' + (x.id === CFG.bank ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('') + '</select>' +
      '<label class="f">Units <button class="linkbtn" id="allu" style="text-transform:none;letter-spacing:0;margin-left:8px">select all</button></label><div class="units">' + b.units.map(function (u) { return '<label><input type="checkbox" value="' + esc(u.id) + '"' + (CFG.units.indexOf(u.id) >= 0 ? ' checked' : '') + '> <b>' + esc(u.id === 'all' ? '' : u.id) + '</b> ' + esc(u.t) + '<small>' + (u.w || u.q).length + '</small></label>'; }).join('') + '</div>' +
      (CFG.source === 'v' ? '<label class="f">Question type</label><div class="seg" id="qtype">' + [['def', 'Definition → word'], ['word', 'Word → meaning'], ['ru', 'Russian → English'], ['mix', 'Mixed']].map(function (s) { return '<button data-v="' + s[0] + '" class="' + (CFG.qtype === s[0] ? 'on' : '') + '">' + s[1] + '</button>'; }).join('') + '</div>' : '') +
      '<label class="units" style="display:flex;gap:10px;align-items:flex-start;margin-top:14px;max-height:none;cursor:pointer"><input type="checkbox" id="aitog"' + (CFG.ai ? ' checked' : '') + ' style="margin-top:4px"> <span><b>✨ AI writes fresh questions from these units</b><br><span class="mini">New sentences and question types every game (gap-fills, synonyms, collocations, dialogues) with a short explanation after each answer. Untick to use the plain word list.</span></span></label>' +
      '<label class="f">Number of questions</label><div class="seg" id="cnt">' + ['10', '15', '20', '30', 'all'].map(function (s) { return '<button data-v="' + s + '" class="' + (CFG.count === s ? 'on' : '') + '">' + (s === 'all' ? 'All' : s) + '</button>'; }).join('') + '</div>';
    $('#aitog').onchange = function () { CFG.ai = this.checked; count(); };
    $('#bank').onchange = function () { CFG.bank = this.value; CFG.units = []; srcBox(); };
    $('#allu').onclick = function (e) { e.preventDefault(); var all = CFG.units.length === b.units.length; CFG.units = all ? [b.units[0].id] : b.units.map(function (u) { return u.id; }); srcBox(); };
    box.querySelectorAll('.units input').forEach(function (c) { c.onchange = function () { CFG.units = Array.prototype.filter.call(box.querySelectorAll('.units input'), function (x) { return x.checked; }).map(function (x) { return x.value; }); count(); }; });
    [['qtype', 'qtype'], ['cnt', 'count']].forEach(function (p) { var el = $('#' + p[0]); if (!el) return; el.querySelectorAll('button').forEach(function (bt) { bt.onclick = function () { el.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === bt); }); CFG[p[1]] = bt.dataset.v; count(); }; }); });
    count();
  }
  function timeBox() {
    var race = CFG.mode === 'race';
    $('#modehelp').textContent = race ? 'Everyone answers at their own speed on the phone. The screen shows a live race of scores. Wrong answers pause the player for a moment.' : 'One question at a time on the big screen, students answer on their phones. Faster correct answers get more points.';
    $('#timebox').innerHTML = race ? '<label class="f">Race length</label><div class="seg" id="tm">' + [3, 5, 8, 10].map(function (m) { return '<button data-v="' + m + '" class="' + (+CFG.race === m ? 'on' : '') + '">' + m + ' min</button>'; }).join('') + '</div>'
      : '<label class="f">Time per question</label><div class="seg" id="tm">' + [10, 20, 30, 60].map(function (s) { return '<button data-v="' + s + '" class="' + (+CFG.time === s ? 'on' : '') + '">' + s + ' s</button>'; }).join('') + '</div>';
    $('#tm').querySelectorAll('button').forEach(function (b) { b.onclick = function () { $('#tm').querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); CFG[race ? 'race' : 'time'] = +b.dataset.v; }; });
  }
  function count() {
    var el = $('#qcount');
    if (useAI()) { if (el) el.textContent = '✨ AI will write ' + (CFG.count === 'all' ? 30 : CFG.count) + ' new questions (takes a few seconds)'; }
    else { var n = L.build(CFG, BANKS).length; if (el) el.textContent = n ? n + ' questions ready' + (CFG.mode === 'race' ? ' (race mode repeats them)' : '') : 'No questions yet'; }
    var t = $('#title'); if (t && !t.dataset.touched) t.placeholder = defaultTitle();
    if (t) t.oninput = function () { t.dataset.touched = 1; };
  }
  function defaultTitle() {
    if (CFG.source === 'custom') return 'Class quiz';
    if (CFG.source === 'gen') return L.genTitle(CFG);
    var b = bankOf(CFG.bank); if (!b) return 'Live game';
    var u = b.units.filter(function (x) { return CFG.units.indexOf(x.id) >= 0; });
    return b.name.replace(/^Grammar · /, 'Grammar ') + (u.length === 1 && u[0].id !== 'all' ? ' · ' + u[0].id + ' ' + u[0].t : u.length > 1 ? ' · ' + u.length + ' units' : '');
  }
  async function showResult(key) {
    var box = $('#resbox'); box.innerHTML = '<p class="mini">Loading…</p>';
    try {
      var r = await L.api('result/' + key);
      box.innerHTML = '<h3 style="margin:14px 0 6px;color:var(--navy)">' + esc(r.title) + '</h3>' + (r.teams && r.teams.length ? '<p class="mini">' + r.teams.map(function (t) { return esc(t.name) + ' ' + t.score; }).join(' · ') + '</p>' : '') +
        '<table class="tbl" style="color:var(--ink)"><thead><tr><th>#</th><th>Name</th><th>Score</th><th>Correct</th></tr></thead><tbody>' + r.players.map(function (p, i) { return '<tr><td>' + (i + 1) + '</td><td>' + esc(p.name) + (p.team ? ' <span class="mini">' + esc(p.team) + '</span>' : '') + '</td><td>' + p.score + '</td><td>' + p.correct + '/' + p.answered + '</td></tr>'; }).join('') + '</tbody></table>';
    } catch (e) { box.innerHTML = '<p class="mini">Could not load these scores.</p>'; }
  }

  function useAI() { return CFG.source === 'gen' || (CFG.ai && (CFG.source === 'v' || CFG.source === 'g')); }
  function aiRequest() {
    var n = CFG.count === 'all' ? 30 : +CFG.count;
    if (CFG.source === 'gen') return { level: CFG.level, focus: CFG.focus, topic: CFG.topic, count: n };
    var b = bankOf(CFG.bank), units = b.units.filter(function (u) { return CFG.units.indexOf(u.id) >= 0; });
    var lv = (b.id.match(/A1|A2|B1|B2|C1/) || [])[0] || { 'v-Movers': 'A1', 'v-Flyers': 'A2', 'v-KET': 'A2', 'v-PET': 'B1', 'v-TeensB1': 'B1', 'v-TeensB2': 'B2', 'v-IELTS': 'C1', 'g-IELTS': 'C1' }[b.id] || 'B1';
    if (b.kind === 'g') return { level: lv, focus: 'grammar', topic: units.map(function (u) { return u.id === 'all' ? lv + ' grammar' : u.t; }).join('; ') + (b.id === 'g-IELTS' ? ' (IELTS academic writing context)' : ''), count: n };
    var words = []; units.forEach(function (u) { u.w.forEach(function (w) { words.push(w[0]); }); });
    return { level: lv, focus: 'vocab', topic: units.map(function (u) { return u.t; }).slice(0, 4).join('; '), words: L.shuffle(words).slice(0, 60), count: n };
  }

  /* ================= running a game ================= */
  async function start() {
    var err = $('#err'); err.textContent = '';
    if (CFG.source !== 'custom' && CFG.source !== 'gen' && !CFG.units.length) { err.textContent = 'Choose at least one unit.'; return; }
    var title = ($('#title').value.trim() || defaultTitle());
    L.ls.set('live.cfg', Object.assign({}, CFG, { title: '' }));
    $('#go').disabled = true;
    var qs = null;
    if (useAI()) {
      err.style.color = 'var(--navy)'; err.textContent = '✨ AI is writing your questions…';
      try { qs = (await L.api('generate', aiRequest())).qs; } catch (e) { qs = null; }
      err.style.color = '';
      if (!qs || !qs.length) err.textContent = 'AI is busy right now, so this game uses the ready-made questions instead.';
      else err.textContent = '';
    }
    if (!qs || !qs.length) qs = CFG.source === 'gen' ? L.general(CFG, BANKS) : L.build(CFG, BANKS);
    if (!qs.length) { $('#go').disabled = false; err.textContent = CFG.source === 'custom' ? 'Write at least one question: question | right answer | wrong answer.' : 'No questions found for this choice.'; return; }
    try {
      var r = L.local ? { room: { pin: String(100000 + Math.floor(Math.random() * 899999)), created: Date.now() }, token: null } : await L.api('host', { title: title, mode: CFG.mode });
      H = { pin: r.room.pin, created: r.room.created, title: title, mode: CFG.mode, time: +CFG.time, race: +CFG.race, teamsN: +CFG.teams, source: CFG.source === 'custom' ? 'My questions' : defaultTitle(),
        qs: qs, i: -1, phase: 'lobby', players: {}, order: [], ans: {}, qStart: 0, raceEnd: 0, raceId: 0, salt: Math.floor(Math.random() * 1000) };
      await connect(r.token);
      save(); lobby();
    } catch (e) { $('#go').disabled = false; err.textContent = e.code === 'not-configured' ? 'Live games are not switched on yet (see the note above).' : 'Could not open the game room. Try again.'; }
  }
  async function resumeGame(saved) {
    H = saved;
    try { var r = L.local ? { token: null } : await L.api('token', { pin: H.pin, as: 'host' }); await connect(r.token); }
    catch (e) { L.ls.set('live.host', null); return vSetup(); }
    if (H.phase === 'q') { H.i--; return next(); }
    render(); push(true);
    if (H.phase === 'race') raceLoop();
  }
  async function connect(first) {
    var pin = H.pin;
    BUS = await L.connect({ pin: pin, clientId: 'host', token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('token', { pin: pin, as: 'host' })).token; } });
    BUS.sub('p', onPlayer);
    clearInterval(timers.beat); timers.beat = setInterval(function () { push(true); }, 5000);
  }
  function save() { L.ls.set('live.host', H); }
  function list() { return H.order.map(function (pid) { return Object.assign({ pid: pid }, H.players[pid]); }); }
  function ranked() { return list().sort(function (a, b) { return b.score - a.score || b.correct - a.correct; }); }
  function teamSizes() { var s = []; for (var t = 0; t < H.teamsN; t++) s.push(0); list().forEach(function (p) { if (p.team >= 0) s[p.team]++; }); return s; }
  function teamBoard() {
    if (!H.teamsN) return [];
    var tot = [], n = [];
    for (var t = 0; t < H.teamsN; t++) { tot.push(0); n.push(0); }
    list().forEach(function (p) { if (p.team >= 0 && p.team < H.teamsN) { tot[p.team] += p.score; n[p.team]++; } });
    return tot.map(function (s, t) { return [L.TEAMS[t], n[t] ? Math.round(s / n[t]) : 0, t, n[t]]; }).sort(function (a, b) { return b[1] - a[1]; });
  }

  function onPlayer(name, d, from) {
    if (!H || !d) return;
    var pid = L.local ? d.pid : from; if (!pid || (!L.local && d.pid && d.pid !== from)) return;
    var p = H.players[pid];
    if (name === 'join') {
      if (!p) {
        if (H.order.length >= 120) return;
        var sizes = teamSizes(), team = H.teamsN ? sizes.indexOf(Math.min.apply(null, sizes)) : -1;
        H.players[pid] = { name: String(d.name || 'Player').slice(0, 24), uid: d.uid || null, team: team, score: 0, correct: 0, answered: 0, streak: 0, gain: 0, ok: null, kicked: false };
        H.order.push(pid); save();
        if (!L.local) L.api('state', { pin: H.pin, players: H.order.length }).catch(function () {});
      } else if (p.kicked) return;
      else p.name = String(d.name || p.name).slice(0, 24);
      if (H.phase === 'race') sendQs();
      render(); push(); return;
    }
    if (!p || p.kicked) return;
    if (name === 'ans' && H.phase === 'q' && d.q === H.i && !H.ans[pid]) {
      H.ans[pid] = { c: +d.c, ms: Date.now() - H.qStart };
      var n = Object.keys(H.ans).length; save();
      if (n >= activeCount()) reveal(); else { render(); push(); }
      return;
    }
    if (name === 'race' && H.phase === 'race') {
      if (+d.s > p.score) p.score = Math.min(+d.s, 100000);
      p.correct = Math.max(p.correct, +d.ok || 0); p.answered = Math.max(p.answered, +d.n || 0); scheduleRender(); return;
    }
    if (name === 'need' && H.phase === 'race') sendQs();
  }
  function activeCount() { return list().filter(function (p) { return !p.kicked; }).length; }
  var rt = null; function scheduleRender() { if (rt) return; rt = setTimeout(function () { rt = null; save(); render(); push(); }, 700); }

  /* the state every phone and watcher receives */
  function snapshot(full) {
    var rk = ranked().filter(function (p) { return !p.kicked; }), you = {}, roster = {};
    rk.forEach(function (p, i) { you[p.pid] = [p.score, i + 1, p.gain, p.ok, p.streak]; roster[p.pid] = [p.name, p.team]; });
    var s = { phase: H.phase, mode: H.mode, title: H.title, pin: H.pin, i: H.i, n: H.qs.length, teams: L.TEAMS.slice(0, H.teamsN), roster: roster, you: you,
      board: rk.slice(0, full ? 40 : 10).map(function (p) { return [p.name, p.score, p.team, p.correct, p.answered]; }), tboard: teamBoard(), count: rk.length };
    var q = H.qs[H.i];
    if (H.phase === 'q') { s.q = { p: q.p, o: q.o }; s.left = Math.max(0, H.time * 1000 - (Date.now() - H.qStart)); s.dur = H.time * 1000; s.answered = Object.keys(H.ans).length; }
    if (H.phase === 'reveal' || H.phase === 'board') {
      var counts = q.o.map(function () { return 0; }); Object.values(H.ans).forEach(function (a) { if (counts[a.c] != null) counts[a.c]++; });
      s.q = { p: q.p, o: q.o }; s.reveal = { a: q.a, counts: counts, x: q.x || '' }; s.answered = Object.keys(H.ans).length;
    }
    if (H.phase === 'race') { s.left = Math.max(0, H.raceEnd - Date.now()); s.dur = H.race * 60000; }
    return s;
  }
  var pt = null;
  function push(now) {
    if (!BUS || !H) return;
    var go = function () { pt = null; ST = snapshot(); BUS.pub('h', 'st', ST); };
    if (now) return go();
    if (!pt) pt = setTimeout(go, 120);
  }
  function sendQs() { BUS.pub('h', 'qs', { id: H.raceId, salt: H.salt, qs: H.qs.map(function (q) { return { p: q.p, o: q.o, h: L.hide(q.a, H.salt) }; }) }); }

  function lobby() { H.phase = 'lobby'; save(); render(); push(true); }
  function begin() {
    if (!activeCount()) return;
    if (!L.local) L.api('state', { pin: H.pin, status: 'playing', players: H.order.length }).catch(function () {});
    if (H.mode === 'race') { H.phase = 'race'; H.raceId = Date.now(); H.raceEnd = Date.now() + H.race * 60000; save(); sendQs(); render(); push(true); raceLoop(); }
    else next();
  }
  function next() {
    H.i++;
    if (H.i >= H.qs.length) return finish();
    H.phase = 'q'; H.ans = {}; H.qStart = Date.now();
    list().forEach(function (p) { H.players[p.pid].gain = 0; H.players[p.pid].ok = null; });
    save(); render(); push(true);
    clearInterval(timers.q); timers.q = setInterval(function () {
      if (H.phase !== 'q') return clearInterval(timers.q);
      var left = H.time * 1000 - (Date.now() - H.qStart);
      var el = $('#timer'); if (el) { el.style.setProperty('--p', Math.max(0, left / (H.time * 10)) + '%'); el.querySelector('span').textContent = Math.max(0, Math.ceil(left / 1000)); }
      if (left <= 0) reveal();
    }, 200);
  }
  function reveal() {
    if (H.phase !== 'q') return;
    clearInterval(timers.q);
    var q = H.qs[H.i], lim = H.time * 1000;
    list().forEach(function (p) {
      var P = H.players[p.pid], a = H.ans[p.pid];
      if (!a) { P.ok = -1; P.gain = 0; P.streak = 0; return; }
      P.answered++;
      if (a.c === q.a) { P.streak++; P.correct++; P.gain = Math.round(1000 * (1 - Math.min(a.ms, lim) / lim / 2)) + Math.min(P.streak - 1, 5) * 50; P.score += P.gain; P.ok = 1; }
      else { P.ok = 0; P.gain = 0; P.streak = 0; }
    });
    H.phase = 'reveal'; save(); render(); push(true);
  }
  function board() { H.phase = 'board'; save(); render(); push(true); }
  function raceLoop() {
    clearInterval(timers.race);
    timers.race = setInterval(function () {
      if (H.phase !== 'race') return clearInterval(timers.race);
      var left = H.raceEnd - Date.now(), el = $('#rtime'); if (el) el.textContent = fmt(left);
      if (left <= 0) finish();
    }, 500);
    clearInterval(timers.racepush); timers.racepush = setInterval(function () { if (H.phase === 'race') push(); else clearInterval(timers.racepush); }, 2000);
  }
  function fmt(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  async function finish() {
    clearInterval(timers.q); clearInterval(timers.race);
    H.phase = 'end'; save(); render(); push(true);
    if (L.local || H.saved) return;
    try {
      await L.api('end', { pin: H.pin, mode: H.mode, source: H.source, questions: H.mode === 'race' ? 0 : H.qs.length,
        players: ranked().filter(function (p) { return !p.kicked; }).map(function (p) { return { name: p.name, uid: p.uid, team: p.team >= 0 ? L.TEAMS[p.team] : null, score: p.score, correct: p.correct, answered: p.answered }; }),
        teams: teamBoard().map(function (t) { return { name: t[0], score: t[1], size: t[3] }; }) });
      H.saved = true; save();
      var m = $('#savedmsg'); if (m) m.textContent = 'Scores saved to Recent results.';
    } catch (e) { var m2 = $('#savedmsg'); if (m2) m2.textContent = 'Could not save the scores (they are still on this screen).'; }
  }
  function closeGame() { clearInterval(timers.beat); if (BUS) BUS.close(); BUS = null; H = null; L.ls.set('live.host', null); history.replaceState(null, '', location.pathname + (L.local ? '?bus=local' : '')); vSetup(); }

  /* ================= stage rendering (host and watchers) ================= */
  function render() {
    if (WATCH) return renderStage(ST, false);
    if (!H) return;
    renderStage(snapshot(true), true);
  }
  function teamColor(t) { return t >= 0 ? L.HEX[t] : 'rgba(255,255,255,.4)'; }
  function renderStage(s, host) {
    if (!s) return;
    stage(true);
    var pp = $('#pinpill'); pp.hidden = s.phase === 'lobby' || s.phase === 'end'; pp.innerHTML = 'PIN <b>' + s.pin + '</b> · ' + s.count + ' players';
    var h = '<div class="stage">';
    if (s.phase === 'lobby') {
      var url = joinUrl(s.pin);
      h += '<div class="lobby"><div class="joincard"><div class="url">Go to <b>' + esc(location.host) + '/live</b></div><div class="pin">' + s.pin + '</div><div class="qr">' + (window.qrcode ? L.qr(url) : '') + '</div><div class="url">or scan with your phone camera</div></div>' +
        '<div><h1>' + esc(s.title) + '</h1><div class="count">' + s.count + ' player' + (s.count === 1 ? '' : 's') + ' joined</div>';
      var rost = Object.entries(s.roster);
      if (s.teams.length) {
        h += '<div class="teams">' + s.teams.map(function (tn, t) { var mem = rost.filter(function (e) { return e[1][1] === t; }); return '<div class="team" style="box-shadow:inset 0 4px 0 ' + L.HEX[t] + '"><h3><span>' + esc(tn) + '</span><span>' + mem.length + '</span></h3><div class="chips">' + mem.map(function (e) { return chip(e, host); }).join('') + '</div></div>'; }).join('') + '</div>';
      } else h += '<div class="chips">' + rost.map(function (e) { return chip(e, host); }).join('') + '</div>';
      if (host) h += '<div class="ctrl" style="margin-top:24px"><button class="btn big" id="begin"' + (s.count ? '' : ' disabled') + '>Start game</button><button class="btn ghost sm" id="cancel">Close room</button><span style="opacity:.7;font-size:14px">' + (s.teams.length ? 'Tap a name to move them to another team. ' : 'Tap a name to remove it. ') + (H.mode === 'race' ? 'Race · ' + H.race + ' min' : H.qs.length + ' questions · ' + H.time + ' s each') + '</span></div>';
      h += '</div></div>';
    } else if (s.phase === 'q' || s.phase === 'reveal') {
      var rv = s.reveal, tot = Math.max(1, s.answered || 0);
      h += '<div class="qhead"><span class="num">Question ' + (s.i + 1) + ' of ' + s.n + '</span><span class="spacer"></span>' +
        (s.phase === 'q' ? '<span class="pill">' + s.answered + ' / ' + s.count + ' answered</span><div class="timer" id="timer" style="--p:' + (s.left / s.dur * 100) + '%"><span>' + Math.ceil(s.left / 1000) + '</span></div>' : '<span class="pill">' + s.answered + ' answered</span>') + '</div>' +
        '<div class="qtext">' + esc(s.q.p) + '</div>' +
        '<div class="answers">' + s.q.o.map(function (o, k) {
          var cls = rv ? (k === rv.a ? ' right' : ' dim') : '';
          return '<div class="opt o' + k + cls + '"><span class="sh">' + L.SHAPES[k] + '</span>' + esc(o) + (rv ? '<span class="cnt">' + (k === rv.a ? '✓ ' : '') + rv.counts[k] + '</span><span class="bar" style="width:' + (rv.counts[k] / tot * 100) + '%"></span>' : '') + '</div>';
        }).join('') + '</div>' +
        '<div class="expl">' + (rv && rv.x ? esc(rv.x) : '') + '</div>';
      if (host) h += '<div class="ctrl" style="justify-content:flex-end">' + (s.phase === 'q' ? '<button class="btn ghost sm" id="skip">Show answer now</button>' : '<button class="btn big" id="toboard">Scores →</button>') + '</div>';
    } else if (s.phase === 'board' || s.phase === 'race') {
      var race = s.phase === 'race', top = s.board.slice(0, race ? 12 : 6), max = Math.max(1, s.board.length ? s.board[0][1] : 1);
      h += '<div class="board"><h2>' + (race ? esc(s.title) : 'Scoreboard') + '</h2>' + (race ? '<div style="text-align:center;margin-bottom:6px"><span class="pill" style="font-size:22px">⏱ <span id="rtime">' + fmt(s.left) + '</span></span></div>' : '');
      if (s.tboard.length) { var tm = Math.max(1, s.tboard[0][1]); h += s.tboard.map(function (t, i) { return '<div class="brow t" style="--c:' + L.HEX[t[2]] + '"><span class="fill" style="width:' + (t[1] / tm * 100) + '%;background:' + L.HEX[t[2]] + '40"></span><span class="r">' + (i + 1) + '</span><span class="n">' + esc(t[0]) + ' <small style="opacity:.6">· ' + t[3] + ' players · average</small></span><span class="s">' + t[1] + '</span></div>'; }).join('') + '<div style="height:8px"></div>'; }
      h += top.map(function (p, i) { return '<div class="brow"><span class="fill" style="width:' + (p[1] / max * 100) + '%"></span><span class="r">' + (i + 1) + '</span><span class="n">' + esc(p[0]) + (p[2] >= 0 && s.teams.length ? ' <small style="color:' + teamColor(p[2]) + '">●</small>' : '') + '</span><span class="s">' + p[1] + '</span></div>'; }).join('') + '</div>';
      if (host) h += '<div class="ctrl" style="justify-content:flex-end">' + (race ? '<button class="btn ghost sm" id="endnow">End race now</button>' : '<button class="btn big" id="nextq">' + (s.i + 1 >= s.n ? 'Final results →' : 'Next question →') + '</button><button class="btn ghost sm" id="endnow">End game</button>') + '</div>';
    } else if (s.phase === 'end') {
      var b = s.board, order = [1, 0, 2], hts = [150, 200, 115];
      h += '<div class="board"><h2>' + (s.tboard.length ? esc(s.tboard[0][0]) + ' wins!' : 'Winners') + '</h2><div class="podium">' + order.map(function (k) { var p = b[k]; return p ? '<div class="p"><b>' + esc(p[0]) + '</b><small>' + p[1] + ' points</small><div class="blk" style="height:' + hts[k] + 'px">' + (k + 1) + '</div></div>' : ''; }).join('') + '</div>';
      if (s.tboard.length) h += s.tboard.map(function (t, i) { return '<div class="brow t" style="--c:' + L.HEX[t[2]] + '"><span class="r">' + (i + 1) + '</span><span class="n">' + esc(t[0]) + '</span><span class="s">' + t[1] + ' avg</span></div>'; }).join('');
      h += '<table class="tbl" style="margin-top:14px"><thead><tr><th>#</th><th>Player</th><th>Points</th><th>Correct</th></tr></thead><tbody>' + b.map(function (p, i) { return '<tr><td>' + (i + 1) + '</td><td>' + esc(p[0]) + (p[2] >= 0 && s.teams.length ? ' <small style="color:' + teamColor(p[2]) + '">' + esc(s.teams[p[2]]) + '</small>' : '') + '</td><td>' + p[1] + '</td><td>' + p[3] + ' / ' + p[4] + '</td></tr>'; }).join('') + '</tbody></table></div>';
      if (host) h += '<div class="ctrl" style="justify-content:center"><span id="savedmsg" style="opacity:.75">' + (L.local ? '' : H.saved ? 'Scores saved to Recent results.' : 'Saving scores…') + '</span><button class="btn big" id="again">New game</button></div>';
      else h += '<div class="ctrl" style="justify-content:center"><a class="btn" href="/live/host/">Back to IF Live</a></div>';
    }
    h += '</div>';
    view.innerHTML = h;
    if (!host) return;
    var on = function (id, fn) { var el = $('#' + id); if (el) el.onclick = fn; };
    on('begin', begin); on('cancel', function () { if (!L.local) L.api('state', { pin: H.pin, status: 'ended' }).catch(function () {}); H.phase = 'end'; push(true); closeGame(); });
    on('skip', reveal); on('toboard', board); on('nextq', next); on('endnow', finish); on('again', closeGame);
    view.querySelectorAll('[data-pid]').forEach(function (b) {
      b.onclick = function () {
        var P = H.players[b.dataset.pid]; if (!P) return;
        if (H.teamsN) P.team = (P.team + 1) % H.teamsN;
        else { P.kicked = true; }
        save(); render(); push();
      };
    });
  }
  function chip(e, host) { return host ? '<button class="chip" data-pid="' + esc(e[0]) + '" title="' + (H.teamsN ? 'Move to the next team' : 'Remove') + '">' + esc(e[1][0]) + '</button>' : '<span class="chip">' + esc(e[1][0]) + '</span>'; }

  /* ================= watch mode ================= */
  async function vWatch(pin) {
    WATCH = pin;
    var wb = $('#wbar'); wb.hidden = false; wb.textContent = 'Watching game ' + pin + ' live';
    view.innerHTML = '<div class="stage"><p>Connecting…</p></div>'; stage(true);
    try {
      var r = L.local ? { token: null, room: { title: '' } } : await L.api('token', { pin: pin, as: 'watch' });
      var first = r.token;
      BUS = await L.connect({ pin: pin, token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('token', { pin: pin, as: 'watch' })).token; } });
      BUS.sub('h', function (name, d) { if (name === 'st') { ST = d; render(); } });
      setInterval(function () { if (ST && (ST.phase === 'race' || ST.phase === 'q')) { var el = $('#rtime'); if (el) { ST.left = Math.max(0, ST.left - 1000); el.textContent = fmt(ST.left); } } }, 1000);
    } catch (e) { view.innerHTML = '<div class="stage"><p>' + (e.code === 'room' ? 'This game has finished.' : e.status === 401 ? 'Please sign in with your teacher account.' : 'Could not open this game.') + '</p><p><a class="btn" href="/live/host/">Back</a></p></div>'; }
  }

  if (qsp.get('watch')) vWatch(qsp.get('watch').replace(/\D/g, ''));
  else vSetup();
})();
