/* IF Kart — live races. Everybody with the PIN drives at the same moment, each on their own phone.
   Uses the IF Live rooms (/api/live, Ably): one person hosts (any signed-in account), the others join with the PIN.
   Players may only talk to the host, so the host's phone passes everyone's position on to the others:
     players → host  'hi' { pid, name, driver } · 'pos' { pid, d, x } three times a second · 'fin' { pid, t } · 'bye' { pid }
     host → all      'st' { phase, level, roster } · 'go' { level, roster } · 'pos' { k: [[pid, d, x], …] } · 'end' { res }
   The host drives too. game.js draws the karts; this file only keeps the room. */
(function () {
  'use strict';
  var G = window.IFKART, LIVE = window.LIVE, K = window.KLIVE = {};
  var $ = function (s) { return document.querySelector(s); }, esc = G.esc;
  var MAXP = 10, EMO = { cat: '🐱', bunny: '🐰', bear: '🐻', fox: '🦊', panda: '🐼', frog: '🐸' };
  var S;
  function reset() { if (S) { for (var k in S.timers) clearInterval(S.timers[k]); try { if (S.bus) S.bus.close(); } catch (e) {} } S = { role: '', pin: '', pid: '', name: '', bus: null, phase: 'idle', level: '', roster: [], seen: {}, pos: {}, fin: {}, firstFin: 0, final: null, lastPos: 0, sentAt: 0, timers: {}, msg: '' }; }
  reset();
  var first = function (n) { return String(n || '').trim().split(/\s+/)[0].slice(0, 14); };
  var myName = function () { var el = $('#lvname'); var n = first(el ? el.value : G.save('name')); if (n) G.save('name', n); return n; };
  var say = function (t) { S.msg = t || ''; var el = $('#lvmsg'); if (el) el.textContent = S.msg; };
  var why = function (e) { return e && e.code === 'room' ? 'No race with this PIN is open. Check the number.' : e && e.code === 'not-configured' ? 'Live games are not switched on yet. Tell your teacher.' : e && (e.status === 401 || e.code === 'login') ? 'To host a race, sign in to the IF App first. To join one, you only need the PIN.' : e && e.code === 'quota' ? 'You have hosted many races today. Try again tomorrow, or join a friend\'s race.' : 'That did not work. Check your internet and try again.'; };

  /* ---------- the menu box: start screen, or the lobby once we are in a room ---------- */
  K.menu = function () {
    var box = $('#livebox'); if (!box) return;
    if (S.phase === 'idle' || S.phase === 'busy') {
      box.innerHTML = '<div class="lbl">Your name</div><input class="lv-in" id="lvname" maxlength="14" autocomplete="off" placeholder="First name" value="' + esc(G.save('name') || '') + '">' +
        '<div class="lv-row"><button class="go" id="lvhost">👑 Host a race</button></div>' +
        '<div class="lbl">or join a race</div><div class="lv-row"><input class="lv-in" id="lvpin" inputmode="numeric" maxlength="6" placeholder="PIN" value="' + esc(G.pin0 || '') + '" style="max-width:150px"><button class="go ghost" id="lvjoin">Join</button></div>' +
        '<p id="lvmsg" style="margin:8px 0 0;color:#c2187a;font-weight:700">' + esc(S.msg) + '</p>';
      $('#lvhost').onclick = host; $('#lvjoin').onclick = function () { join($('#lvpin').value); };
      return;
    }
    var hostMe = S.role === 'host', lv = G.levels.filter(function (l) { return l.id === S.level; })[0] || G.level();
    if (hostMe && S.phase === 'lobby') { if (S.level !== G.level().id) { S.level = G.level().id; pubSt(); } sync(); }
    box.innerHTML = '<div class="lbl">Live race · PIN</div><div class="lv-pin">' + esc(S.pin) + '</div>' +
      '<p class="how" style="margin:2px 0 0">' + (hostMe ? 'Friends open IF Kart, choose Live race and type this PIN. You choose the level above.' : 'Level: <b>' + esc(lv.name) + '</b>, chosen by the host.') + '</p>' +
      '<div class="lbl">On the grid (' + S.roster.length + ')</div><div class="lv-who">' + S.roster.map(function (p) { return '<span>' + (EMO[p.driver] || '🏎️') + ' ' + esc(p.name) + (p.pid === 'host' ? ' 👑' : '') + (p.pid === S.pid ? ' (you)' : '') + '</span>'; }).join('') + '</div>' +
      (!hostMe && S.hostPhase === 'race' ? '<p class="how">A race is on. You will join the next one.</p>' : hostMe ? '<div class="lv-row"><button class="go" id="lvstart">▶ Start the race</button></div>' : '<p class="how">Waiting for the host to start…</p>') +
      '<div class="lv-row"><button class="go ghost" id="lvleave">Leave</button></div><p id="lvmsg" style="margin:8px 0 0;color:#c2187a;font-weight:700">' + esc(S.msg) + '</p>';
    if ($('#lvstart')) $('#lvstart').onclick = start;
    $('#lvleave').onclick = function () { K.leave(); G.menu(); };
  };
  var menuOpen = function () { return $('#menu').style.display !== 'none'; };
  var redraw = function () { if (menuOpen()) K.menu(); };
  /* keep my own driver in the roster up to date (the host's choice is local, a player's goes with 'hi') */
  function sync() { var me = S.roster.filter(function (p) { return p.pid === S.pid; })[0]; if (me && S.role === 'host' && me.driver !== G.driver().id) { me.driver = G.driver().id; pubSt(); } }

  /* ---------- host ---------- */
  async function host() {
    var name = myName(); if (S.phase === 'busy') return; S.phase = 'busy'; say('Opening a room…');
    try {
      var d = await LIVE.api('host', { mode: 'kart', title: 'IF Kart live race' }), tok = d.token;
      reset(); S.role = 'host'; S.pid = 'host'; S.pin = d.room.pin; S.name = name || first(d.room.hostName) || 'Host'; S.level = G.level().id; S.phase = 'lobby';
      S.roster = [{ pid: 'host', name: S.name, driver: G.driver().id }];
      S.bus = await LIVE.connect({ pin: S.pin, clientId: 'host', token: async function () { if (tok) { var t = tok; tok = null; return t; } return (await LIVE.api('token', { pin: S.pin, as: 'host' })).token; } });
      S.bus.sub('p', fromPlayer); pubSt();
      S.timers.beat = setInterval(function () {
        if (S.phase === 'lobby') { var now = Date.now(), n = S.roster.length; S.roster = S.roster.filter(function (p) { return p.pid === 'host' || now - (S.seen[p.pid] || 0) < 13000; }); pubSt(); if (S.roster.length !== n) redraw(); }
        else if (S.phase === 'race') checkEnd();
      }, 3000);
      K.menu();
    } catch (e) { reset(); say(why(e)); K.menu(); }
  }
  function pubSt() { if (S.role === 'host' && S.bus) S.bus.pub('h', 'st', { phase: S.phase, level: S.level, roster: S.roster }); }
  function fromPlayer(name, m) {
    if (!m || !/^p-[a-z0-9]{6,16}$/.test(m.pid || '')) return;
    var at = -1; S.roster.forEach(function (p, i) { if (p.pid === m.pid) at = i; });
    if (name === 'hi') {
      S.seen[m.pid] = Date.now();
      if (S.phase !== 'lobby') { if (at < 0) pubSt(); return; }
      var p = { pid: m.pid, name: first(m.name) || 'Player', driver: EMO[m.driver] ? m.driver : 'cat' };
      if (at < 0) { if (S.roster.length >= MAXP) return; S.roster.push(p); } else if (S.roster[at].name === p.name && S.roster[at].driver === p.driver) return; else S.roster[at] = p;
      pubSt(); redraw();
    } else if (at < 0) { return; }
    else if (name === 'pos') { if (typeof m.d === 'number' && typeof m.x === 'number') { S.pos[m.pid] = [Math.round(m.d), Math.round(m.x)]; G.net(m.pid, m.d, m.x / 10); } }
    else if (name === 'fin') { if (S.phase === 'race' && m.t > 20 && m.t < 900 && !S.fin[m.pid]) { S.fin[m.pid] = Math.round(m.t * 10) / 10; checkEnd(); } }
    else if (name === 'bye') { if (S.phase === 'lobby') { S.roster.splice(at, 1); pubSt(); redraw(); } else S.gone = S.gone || {}, S.gone[m.pid] = 1; }
  }
  function start() {
    if (S.role !== 'host' || S.phase !== 'lobby') return;
    sync(); S.level = G.level().id; S.phase = 'race'; S.pos = {}; S.fin = {}; S.gone = {}; S.firstFin = 0; S.final = null;
    S.bus.pub('h', 'go', { level: S.level, roster: S.roster }); begin(S.level, S.roster);
    clearInterval(S.timers.relay);
    S.timers.relay = setInterval(function () { if (S.phase !== 'race') return; var k = []; S.roster.forEach(function (p) { var v = S.pos[p.pid]; if (v) k.push([p.pid, v[0], v[1]]); }); if (k.length) S.bus.pub('h', 'pos', { k: k }); }, 320);
  }
  function checkEnd() {
    if (S.role !== 'host' || S.phase !== 'race') return;
    var left = S.roster.filter(function (p) { return !S.fin[p.pid] && !(S.gone && S.gone[p.pid]); }), any = Object.keys(S.fin).length;
    if (any && !S.firstFin) S.firstFin = Date.now();
    if (!any || (left.length && Date.now() - S.firstFin < 30000)) return;   // wait half a minute for the slower drivers
    var res = S.roster.map(function (p) { return { pid: p.pid, name: p.name, driver: p.driver, t: S.fin[p.pid] || 0, d: (S.pos[p.pid] || [0])[0] }; })
      .sort(function (a, b) { return a.t && b.t ? a.t - b.t : a.t ? -1 : b.t ? 1 : b.d - a.d; });
    S.phase = 'end'; S.final = res; clearInterval(S.timers.relay); S.bus.pub('h', 'end', { res: res }); showFinal();
  }

  /* ---------- player ---------- */
  async function join(pinText) {
    var pin = String(pinText || '').replace(/\D/g, ''), name = myName();
    if (pin.length < 6) return say('Type the 6 numbers of the PIN.');
    if (S.phase === 'busy') return; S.phase = 'busy'; say('Joining…');
    try {
      var d = await LIVE.api('join', { pin: pin, pid: G.save('pid') || undefined }), tok = d.token;
      if (d.mode !== 'kart') throw { code: 'room' };
      name = name || first(d.account && d.account.name); if (!name) { S.phase = 'idle'; return say('Type your first name, then join.'); }
      reset(); S.role = 'player'; S.pin = pin; S.pid = d.pid; S.name = name; S.phase = 'lobby'; G.save('pid', d.pid); G.save('name', name);
      S.bus = await LIVE.connect({ pin: pin, clientId: d.pid, token: async function () { if (tok) { var t = tok; tok = null; return t; } return (await LIVE.api('join', { pin: pin, pid: S.pid })).token; } });
      S.bus.sub('h', fromHost);
      var hello = function () { if (S.bus) S.bus.pub('p', 'hi', { pid: S.pid, name: S.name, driver: G.driver().id }); };
      hello(); S.timers.beat = setInterval(function () { if (S.phase === 'lobby' || S.phase === 'end') hello(); if (S.phase === 'race' && S.lastPos && Date.now() - S.lastPos > 8000) { S.lastPos = Date.now(); G.toast('Waiting for the host…'); } }, 4000);
      S.hello = hello; K.menu();
    } catch (e) { reset(); say(why(e)); K.menu(); }
  }
  function fromHost(name, m) {
    if (!m) return;
    if (name === 'st') {
      var was = S.phase; S.roster = m.roster || []; S.level = m.level; S.hostPhase = m.phase;
      if (m.phase === 'lobby' && (was === 'end' || was === 'race')) { S.phase = 'lobby'; S.final = null; G.menu(); return; }   // the host opened the next race
      redraw();
    } else if (name === 'go') {
      if (!(m.roster || []).some(function (p) { return p.pid === S.pid; })) return;   // joined too late for this race
      S.roster = m.roster; S.level = m.level; S.hostPhase = 'race'; S.phase = 'race'; S.final = null; S.lastPos = Date.now(); begin(m.level, m.roster);
    } else if (name === 'pos') {
      S.lastPos = Date.now(); if (S.phase === 'race' || S.phase === 'end') (m.k || []).forEach(function (v) { if (v[0] !== S.pid) G.net(v[0], v[1], v[2] / 10); });
    } else if (name === 'end') { if (S.phase === 'race' || S.phase === 'end') { S.phase = 'end'; S.final = m.res || []; showFinal(); } }
  }

  /* ---------- the race itself (both roles) ---------- */
  function begin(level, roster) {
    var slot = 0, field = []; roster.forEach(function (p, i) { if (p.pid === S.pid) slot = i; else field.push({ pid: p.pid, name: p.name, driver: p.driver, slot: i }); });
    G.live({ level: level, me: S.name, slot: slot, field: field });
  }
  K.tick = function (R) {
    var now = Date.now(); if (S.phase !== 'race' || R.phase !== 'race' || now - S.sentAt < 320) return; S.sentAt = now;
    var d = Math.round(R.me.dist), x = Math.round(R.me.x * 10);
    if (S.role === 'host') S.pos.host = [d, x]; else if (S.bus) S.bus.pub('p', 'pos', { pid: S.pid, d: d, x: x });
  };
  K.finished = function (t) {
    if (S.phase !== 'race') return;
    if (S.role === 'host') { S.fin.host = t; checkEnd(); } else if (S.bus) S.bus.pub('p', 'fin', { pid: S.pid, t: t });
  };
  /* game.js has drawn its results card: swap the local table for the room's result */
  K.onResults = function () {
    var t = $('#resc table'); if (t) t.remove(); ['#again', '#next'].forEach(function (s) { var b = $(s); if (b) b.remove(); });
    var row = $('#resc .row'); if (row && S.role === 'host' && !$('#lvnew')) { row.insertAdjacentHTML('afterbegin', '<button class="go" id="lvnew">▶ New race</button>'); $('#lvnew').onclick = function () { if (S.phase === 'race') checkEndNow(); S.phase = 'lobby'; S.final = null; S.pos = {}; S.fin = {}; clearInterval(S.timers.relay); pubSt(); G.menu(); }; }
    var h = $('#resc h1'); if (h) h.textContent = '🏁 Finished!';
    var m = $('#tomenu'); if (m) { m.textContent = 'Leave'; m.onclick = function () { K.leave(); G.menu(); }; }
    showFinal();
  };
  function checkEndNow() { S.firstFin = 1; checkEnd(); }
  function showFinal() {
    var el = $('#board'); if (!el || $('#res').style.display === 'none') return;
    if (!S.final) { el.innerHTML = '<p class="sub" style="text-align:center;margin:10px 0">⏳ Waiting for the other drivers to finish…</p>'; return; }
    var at = -1; S.final.forEach(function (r, i) { if (r.pid === S.pid) at = i; }); var h = $('#resc h1'), pl = at + 1, th = pl === 1 ? 'st' : pl === 2 ? 'nd' : pl === 3 ? 'rd' : 'th';
    if (h && pl) h.textContent = !S.final[at].t ? 'Race over' : pl === 1 ? '🏆 You won!' : pl <= 3 ? ['', '', '🥈', '🥉'][pl] + ' ' + pl + th + ' place!' : 'Finished ' + pl + th;
    el.innerHTML = '<div class="lbl" style="text-align:center">Live race · final result</div><table>' + S.final.map(function (r, i) { return '<tr class="' + (r.pid === S.pid ? 'me' : '') + '"><td>' + (i + 1) + '</td><td>' + (EMO[r.driver] || '') + ' ' + esc(r.name) + (r.pid === S.pid ? ' (you)' : '') + '</td><td style="text-align:right">' + (r.t ? G.fmt(r.t) : 'did not finish') + '</td></tr>'; }).join('') + '</table>' +
      (S.role === 'host' ? '' : '<p class="sub" style="text-align:center">The host can start the next race.</p>');
  }
  K.leave = function () { try { if (S.bus && S.role === 'player') S.bus.pub('p', 'bye', { pid: S.pid }); } catch (e) {} var keep = ''; reset(); S.msg = keep; };
  K.state = function () { return S; };
  if (G.mode() === 'live') G.menu();
})();
