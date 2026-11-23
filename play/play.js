/* IF Arena: find a player who is online and challenge them to Chess, Connect Four or a Word Duel.
   Lobby and moves go through Ably (tokens from /api/arena/token). Testing without Ably: /play/?local=Name
   uses BroadcastChannel between tabs of one browser. */
(function () {
  'use strict';
  var Q = new URLSearchParams(location.search), LOCAL = Q.get('local');
  var V = document.getElementById('view'), ME = null, RT = null, LOBBY = null, INBOX = null;
  var players = {}, G = null, P = null, pending = null, tab = 'lobby', speak = false;
  try { speak = localStorage.getItem('arena.speak') === '1'; } catch (e) {}
  var GAMES = {
    chess: { t: 'Chess', i: '♟️', d: 'A full game of chess. Every move is shown in English.' },
    c4: { t: 'Connect Four', i: '🔴', d: 'Drop your discs. Four in a row wins.' },
    duel: { t: 'Word Duel', i: '⚡', d: '10 vocabulary questions at your level. Faster correct answers score more.' }
  };
  var LEVELS = [['v-A1', 'A1'], ['v-A2', 'A2'], ['v-B1', 'B1'], ['v-B2', 'B2'], ['v-C1', 'C1'], ['v-Flyers', 'Flyers (A2)'], ['v-PET', 'PET (B1)'], ['v-IELTS', 'IELTS']];
  var COLORS = ['#d4ae5a', '#7fb3f0', '#7fd6a8', '#f08f7f', '#c7a2f0', '#f2c94c', '#8fe0e0'];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function rid() { return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8); }
  function colorOf(id) { var h = 0; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0; return COLORS[Math.abs(h) % COLORS.length]; }
  function av(name, id) { return '<span class="av" style="background:' + colorOf(id) + '">' + esc((name || '?')[0].toUpperCase()) + '</span>'; }
  function flash(t) { var f = $('#flash'); f.textContent = t; f.classList.add('on'); clearTimeout(flash.t); flash.t = setTimeout(function () { f.classList.remove('on'); }, 2200); }
  function say(t) { if (!speak || !window.speechSynthesis) return; try { var u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} }

  /* ---------- transport: Ably, or BroadcastChannel for local testing ---------- */
  function ablyRT(token) {
    var A = window.AblyPubSub || window.Ably, first = token;
    var opts = { authCallback: function (p, cb) { if (first) { var t = first; first = null; return cb(null, t); } fetch('/api/arena/token', { method: 'POST', credentials: 'include' }).then(function (r) { return r.json(); }).then(function (d) { cb(d.token ? null : 'token', d.token); }, function (e) { cb(String(e), null); }); }, echoMessages: false, disconnectedRetryTimeout: 2000 };
    var client = A.createClient ? A.createClient(opts) : new A.Realtime(opts);
    return { channel: function (name) {
      var ch = client.channels.get(name);
      return {
        pub: function (n, d) { return ch.publish(n, d).catch(function (e) { console.warn('publish', e); }); },
        sub: function (fn) { ch.subscribe(function (m) { fn(m.name, m.data, m.clientId); }); },
        enter: function (d) { return ch.presence.enter(d); }, update: function (d) { return ch.presence.update(d); },
        leave: function () { try { ch.presence.leave(); } catch (e) {} }, detach: function () { try { ch.unsubscribe(); ch.presence.unsubscribe(); ch.detach(); } catch (e) {} },
        members: function () { return ch.presence.get().then(function (l) { return l.map(function (m) { return { id: m.clientId, data: m.data }; }); }); },
        onPresence: function (fn) { ch.presence.subscribe(function (m) { fn(m.action, m.clientId, m.data); }); }
      };
    } };
  }
  function localRT(me) {
    return { channel: function (name) {
      var bc = new BroadcastChannel('arena-' + name), subs = [], pres = [], here = {}, mine = null;
      bc.onmessage = function (e) {
        var m = e.data;
        if (m.k === 'msg') return subs.forEach(function (f) { f(m.n, m.d, m.from); });
        if (m.k === 'p') {
          if (m.a === 'leave') delete here[m.from]; else here[m.from] = m.d;
          pres.forEach(function (f) { f(m.a === 'here' ? 'present' : m.a, m.from, m.d); });
          if (m.a === 'enter' && mine) bc.postMessage({ k: 'p', a: 'here', from: me, d: mine });
        }
      };
      addEventListener('pagehide', function () { if (mine) bc.postMessage({ k: 'p', a: 'leave', from: me }); });
      return {
        pub: function (n, d) { bc.postMessage({ k: 'msg', n: n, d: d, from: me }); return Promise.resolve(); },
        sub: function (fn) { subs.push(fn); },
        enter: function (d) { mine = d; bc.postMessage({ k: 'p', a: 'enter', from: me, d: d }); return Promise.resolve(); },
        update: function (d) { mine = d; bc.postMessage({ k: 'p', a: 'update', from: me, d: d }); return Promise.resolve(); },
        leave: function () { if (mine) bc.postMessage({ k: 'p', a: 'leave', from: me }); mine = null; },
        detach: function () { this.leave(); subs = []; pres = []; bc.close(); },
        members: function () { var l = Object.keys(here).map(function (k) { return { id: k, data: here[k] }; }); if (mine) l.push({ id: me, data: mine }); return Promise.resolve(l); },
        onPresence: function (fn) { pres.push(fn); }
      };
    } };
  }

  /* ---------- start ---------- */
  if (window.self !== window.top) document.documentElement.classList.add('framed');   // inside IF App: keep clear of its Close and Full-screen buttons
  function boot() {
    if (LOCAL) { ME = { id: 'u-' + LOCAL.toLowerCase().replace(/\W/g, ''), uid: LOCAL, name: LOCAL, level: 'B1', r: 1000, w: 0, d: 0, l: 0 }; RT = localRT(ME.id); return start(); }
    fetch('/api/arena/token', { method: 'POST', credentials: 'include' }).then(function (r) { return r.json().then(function (d) { return { s: r.status, d: d }; }); }).then(function (x) {
      if (x.s === 401) return signIn();
      if (x.s !== 200 || !x.d.token) { V.innerHTML = '<div class="empty">Online play is not available right now. Please try again later.</div>'; return; }
      ME = x.d.me; RT = ablyRT(x.d.token); start();
    }, function () { V.innerHTML = '<div class="empty">No connection. Check the Internet and reload the page.</div>'; });
  }
  function signIn() {
    V.innerHTML = '<h1>IF Arena</h1><p class="lead">Play Chess, Connect Four, a Word Duel or any IF Live game (Treasure Hunt, Kart Quest, Tug of War…) against other IF players who are online now. Sign in so other players can see you and challenge you.</p>' +
      '<p class="row" style="margin-top:18px"><a class="btn gold" href="/login/?next=/play/">Sign in</a><a class="btn" href="/app/">Back to IF App</a></p>' + gamesHTML();
  }
  function gamesHTML() {
    var card = function (i, t, d) { return '<div class="gcard"><b>' + i + ' ' + t + '</b><span>' + d + '</span></div>'; };
    return '<p class="muted" style="margin:4px 0 0">1 vs 1</p><div class="games">' + Object.keys(GAMES).map(function (k) { var g = GAMES[k]; return card(g.i, g.t, g.d); }).join('') + '</div>' +
      '<p class="muted" style="margin:16px 0 0">IF Live games · 1 vs 1 or a party of up to 8</p><div class="games">' + PMODES.map(function (m) { return card(m[1], m[2], m[3]); }).join('') + '</div>';
  }
  function myStatus() { return { name: ME.name, lv: ME.level || '', r: ME.r, st: G || P ? 'busy' : 'free', g: G ? G.game : P ? 'party' : '' }; }
  function start() {
    var pill = $('#me'); pill.hidden = false; pill.textContent = ME.name + ' · ' + ME.r;
    LOBBY = RT.channel('arena:lobby'); INBOX = RT.channel('arena:u:' + ME.id.replace(/^u-/, ''));
    LOBBY.onPresence(function (a, id, d) { if (id === ME.id) return; if (a === 'leave' || a === 'absent') delete players[id]; else players[id] = d || {}; if (!G && !P) drawLobby(); });
    LOBBY.enter(myStatus()).then(function () { return LOBBY.members(); }).then(function (l) { l.forEach(function (m) { if (m.id !== ME.id) players[m.id] = m.data || {}; }); if (!G) drawLobby(); });
    INBOX.sub(onInbox);
    drawLobby();
  }

  /* ---------- lobby ---------- */
  function drawLobby() {
    if (G || P) return;
    var ids = Object.keys(players).sort(function (a, b) { return (players[a].st === 'busy') - (players[b].st === 'busy') || String(players[a].name).localeCompare(players[b].name); });
    var html = '<h1>IF Arena</h1><p class="lead">Players online now. Choose an opponent, choose a game, and send a challenge.</p>' +
      '<div class="tabs"><button data-tab="lobby" class="' + (tab === 'lobby' ? 'on' : '') + '">🟢 Online (' + ids.length + ')</button><button data-tab="top" class="' + (tab === 'top' ? 'on' : '') + '">🏆 Leaderboard</button><button data-tab="how" class="' + (tab === 'how' ? 'on' : '') + '">How to play</button></div>';
    if (tab === 'lobby') {
      html += '<button class="party-cta" id="party"><span>🎉</span><span><b>Party game · 2 to 8 players</b><small>Race, Treasure Hunt, Cyber Heist, Fishing Frenzy, Balloon Race, Kart Quest, Block Mine, Bank Heist, Tug of War or Boss Battle. Invite several players at once.</small></span><span>→</span></button>';
      html += ids.length ? '<div class="list">' + ids.map(function (id) {
        var p = players[id], busy = p.st === 'busy';
        return '<div class="player">' + av(p.name, id) + '<div class="who"><b>' + esc(p.name || 'Player') + '</b><small><span class="dot' + (busy ? ' busy' : '') + '"></span>' + (busy ? 'Playing ' + esc((GAMES[p.g] || {}).t || '') : 'Free') + (p.lv ? ' · ' + esc(p.lv) : '') + ' · ' + (p.r || 1000) + '</small></div>' +
          '<button class="btn sm gold" data-ch="' + esc(id) + '"' + (busy ? ' disabled' : '') + '>Challenge</button></div>';
      }).join('') + '</div>'
        : '<div class="empty">Nobody else is online right now.<br>Send this page to a friend: <b>intellectfirst.com/play</b><br>You stay here and will see them as soon as they open it.</div>';
      html += '<h2>Games</h2>' + gamesHTML();
    } else if (tab === 'top') {
      html += '<div class="panel" id="lb"><p class="muted">Loading…</p></div>';
    } else {
      html += '<div class="panel"><ol style="padding-left:20px;display:grid;gap:6px"><li>Everyone who has this page open appears in <b>Online</b>.</li><li><b>Party game:</b> invite up to 7 players to one of the IF Live races (Treasure Hunt, Cyber Heist, Kart Quest…). It starts by itself when everyone has joined, and you play on your own phone.</li><li>Tap <b>Challenge</b>, choose a game, and wait for your opponent to accept.</li><li>When someone challenges you, a card appears at the bottom: <b>Accept</b> or <b>Not now</b>.</li><li>Wins, draws and losses change your rating (everyone starts at 1000).</li><li>Be a good sport: tap 👏 for a good move, and finish the games you start.</li></ol></div>';
    }
    V.innerHTML = html;
    $$('[data-tab]').forEach(function (b) { b.onclick = function () { tab = b.dataset.tab; drawLobby(); if (tab === 'top') loadTop(); }; });
    $$('[data-ch]').forEach(function (b) { b.onclick = function () { chooseGame(b.dataset.ch); }; });
    if ($('#party')) $('#party').onclick = partySetup;
    if (tab === 'top') loadTop();
  }
  function loadTop() {
    if (LOCAL) { var el = $('#lb'); if (el) el.innerHTML = '<p class="muted">The leaderboard appears on the live site.</p>'; return; }
    fetch('/api/arena/top').then(function (r) { return r.json(); }).then(function (d) {
      var el = $('#lb'); if (!el) return;
      el.innerHTML = d.top && d.top.length ? '<table class="lb"><tr><th>#</th><th>Player</th><th>Rating</th><th>W</th><th>D</th><th>L</th></tr>' + d.top.map(function (r, i) { return '<tr><td>' + (i + 1) + '</td><td>' + esc(r.name) + '</td><td>' + r.r + '</td><td>' + r.w + '</td><td>' + r.d + '</td><td>' + r.l + '</td></tr>'; }).join('') + '</table>' : '<p class="muted">No games played yet. Be the first!</p>';
    });
  }
  function sheet(html) { var s = document.createElement('div'); s.className = 'sheet'; s.innerHTML = '<div class="box" role="dialog">' + html + '</div>'; document.body.appendChild(s); s.onclick = function (e) { if (e.target === s) s.remove(); }; return s; }
  function chooseGame(id) {
    var p = players[id]; if (!p) return;
    var pick = 'chess', s = sheet('<h3>Challenge ' + esc(p.name) + '</h3>' + Object.keys(GAMES).map(function (k) { return '<button class="opt' + (k === pick ? ' on' : '') + '" data-g="' + k + '"><span style="font-size:26px">' + GAMES[k].i + '</span><span><b>' + GAMES[k].t + '</b><small>' + GAMES[k].d + '</small></span></button>'; }).join('') +
      '<b style="display:block;margin:10px 0 6px">IF Live games</b><div class="pmodes">' + PMODES.map(function (m) { return '<button class="opt" data-g="live:' + m[0] + '"><span style="font-size:24px">' + m[1] + '</span><span><b>' + m[2] + '</b><small>' + m[3] + '</small></span></button>'; }).join('') + '</div>' +
      '<label id="lvw" hidden>Level<select id="lv">' + LEVELS.map(function (l) { return '<option value="' + l[0] + '"' + (ME.level && l[1].indexOf(ME.level) === 0 ? ' selected' : '') + '>' + l[1] + '</option>'; }).join('') + '</select></label>' +
      '<div class="row"><button class="btn gold" id="send">Send challenge</button><button class="btn" id="cx">Cancel</button></div>');
    $$('.opt', s).forEach(function (b) { b.onclick = function () { pick = b.dataset.g; $$('.opt', s).forEach(function (x) { x.classList.toggle('on', x === b); }); $('#lvw', s).hidden = pick !== 'duel' && !/^live:/.test(pick); }; });
    $('#cx', s).onclick = function () { s.remove(); };
    $('#send', s).onclick = function () { var lv = $('#lv', s).value; s.remove();
      if (/^live:/.test(pick)) { var L5 = { 'v-A1': 'A1', 'v-A2': 'A2', 'v-B1': 'B1', 'v-B2': 'B2', 'v-C1': 'C1', 'v-Flyers': 'A2', 'v-PET': 'B1', 'v-IELTS': 'C1' }; return startParty({ mode: pick.slice(5), level: L5[lv] || 'B1', mins: 5 }, [id]); }
      invite(id, pick, lv); };
  }

  /* ---------- invitations ---------- */
  function inbox(id) { return RT.channel('arena:u:' + id.replace(/^u-/, '')); }
  function invite(id, game, lv) {
    var p = players[id] || {}, gid = rid(), go = function (extra) {
      var first = Math.random() < 0.5 ? ME.id : id;
      pending = { gid: gid, to: id, name: p.name, game: game, first: first, extra: extra || null };
      inbox(id).pub('invite', { gid: gid, game: game, name: ME.name, r: ME.r, first: first, extra: extra || null });
      pending.t = setTimeout(function () { cancelInvite('No answer from ' + (p.name || 'the player') + '.'); }, 45000);
      toast('<b>Waiting for ' + esc(p.name || 'the player') + '…</b><span class="muted">' + GAMES[game].t + '</span><div class="row"><button class="btn sm" id="tcx">Cancel</button></div>');
      $('#tcx').onclick = function () { inbox(id).pub('cancel', { gid: gid }); cancelInvite(); };
    };
    if (game === 'duel') duelQuestions(lv).then(function (qs) { if (!qs.length) return flash('Could not load the questions.'); go({ lv: lv, qs: qs }); });
    else go();
  }
  function cancelInvite(msg) { if (pending) clearTimeout(pending.t); pending = null; toast(null); if (msg) flash(msg); }
  function toast(html) { var t = $('#toast'); if (!html) { t.hidden = true; t.innerHTML = ''; return; } t.innerHTML = html; t.hidden = false; }
  function onInbox(name, d, from) {
    if (!d || !from || from === ME.id) return;
    if (name === 'party') return partyInvite(d, from);
    if (name === 'pyes' || name === 'pno' || name === 'pclose') return partyMsg(name, d, from);
    if (name === 'invite') {
      if (G || P || pending) return inbox(from).pub('decline', { gid: d.gid, busy: true });
      var p = players[from] || {}, nm = d.name || p.name || 'A player';
      say(nm + ' challenges you to ' + GAMES[d.game].t);
      toast('<b>⚔️ ' + esc(nm) + ' (' + (d.r || 1000) + ') challenges you to ' + GAMES[d.game].i + ' ' + GAMES[d.game].t + '</b>' + (d.extra && d.extra.lv ? '<span class="muted">Level: ' + esc((LEVELS.filter(function (l) { return l[0] === d.extra.lv; })[0] || [0, ''])[1]) + '</span>' : '') +
        '<div class="row"><button class="btn sm gold" id="tok">Accept</button><button class="btn sm" id="tno">Not now</button></div>');
      var timer = setTimeout(function () { toast(null); }, 45000);
      $('#tok').onclick = function () { clearTimeout(timer); toast(null); inbox(from).pub('accept', { gid: d.gid }); begin({ gid: d.gid, game: d.game, opp: from, oname: nm, first: d.first, extra: d.extra }); };
      $('#tno').onclick = function () { clearTimeout(timer); toast(null); inbox(from).pub('decline', { gid: d.gid }); };
      INVITES[d.gid] = timer;
    }
    if (name === 'cancel' && INVITES[d.gid]) { clearTimeout(INVITES[d.gid]); toast(null); flash('The challenge was cancelled.'); }
    if (!pending || d.gid !== pending.gid || from !== pending.to) return;
    if (name === 'accept') { var pd = pending; cancelInvite(); begin({ gid: pd.gid, game: pd.game, opp: pd.to, oname: pd.name, first: pd.first, extra: pd.extra }); }
    if (name === 'decline') cancelInvite(d.busy ? (pending.name || 'The player') + ' is busy right now.' : (pending.name || 'The player') + ' said not now.');
  }
  var INVITES = {};


  /* ---------- party games: the self-paced IF Live modes for 2 to 8 players ----------
     The challenger's page runs the IF Live host in a hidden frame (/live/host/?arena=…), invites the chosen players with
     the PIN, and everybody (the challenger too) plays on the IF Live player screen inside this page. */
  var PMODES = [['race', '🏁', 'Race', 'Answer at your own speed. Most points wins.'], ['gold', '🪙', 'Treasure Hunt', 'Open chests: gold, double… or steal and swap!'], ['hack', '💻', 'Cyber Heist', 'Mine crypto and hack the others’ passwords.'], ['fish', '🎣', 'Fishing Frenzy', 'Catch the heaviest fish.'],
    ['balloon', '🎈', 'Balloon Race', 'Right answers lift your balloon. Highest wins.'], ['kart', '🏎️', 'Kart Quest', 'Drive your kart to the finish first.'], ['mine', '⛏️', 'Block Mine', 'Mine gems, but watch out for TNT!'], ['cash', '💰', 'Bank Heist', 'Grab cash and buy crew upgrades.'],
    ['tug', '🪢', 'Tug of War', 'Two teams pull the rope. Every right answer is a pull.'], ['boss', '👾', 'Boss Battle', 'Team up and beat the Word Monster before time runs out.']];
  function pmode(k) { return PMODES.filter(function (m) { return m[0] === k; })[0] || PMODES[0]; }
  function partySetup() {
    var free = Object.keys(players).filter(function (id) { return players[id].st !== 'busy'; });
    if (!free.length) return flash('Nobody is free to invite right now.');
    var mode = 'gold', lv = ['A1', 'A2', 'B1', 'B2', 'C1'].indexOf(ME.level) >= 0 ? ME.level : 'B1';
    var s = sheet('<h3>🎉 Party game</h3><div class="pmodes">' + PMODES.map(function (m) { return '<button class="opt' + (m[0] === mode ? ' on' : '') + '" data-m="' + m[0] + '"><span style="font-size:24px">' + m[1] + '</span><span><b>' + m[2] + '</b><small>' + m[3] + '</small></span></button>'; }).join('') + '</div>' +
      '<div class="row" style="flex-wrap:nowrap"><label style="flex:1">Level<select id="plv">' + ['A1', 'A2', 'B1', 'B2', 'C1'].map(function (l) { return '<option' + (l === lv ? ' selected' : '') + '>' + l + '</option>'; }).join('') + '</select></label><label style="flex:1">Time<select id="pmin"><option value="3">3 minutes</option><option value="5" selected>5 minutes</option><option value="8">8 minutes</option></select></label></div>' +
      '<b>Invite (up to 7)</b><div class="plist">' + free.map(function (id) { return '<label class="pick"><input type="checkbox" value="' + esc(id) + '">' + av(players[id].name, id) + '<span>' + esc(players[id].name || 'Player') + (players[id].lv ? ' <small class="muted">' + esc(players[id].lv) + '</small>' : '') + '</span></label>'; }).join('') + '</div>' +
      '<div class="row"><button class="btn gold" id="psend">Send invitations</button><button class="btn" id="pcx">Cancel</button></div>');
    $$('[data-m]', s).forEach(function (b) { b.onclick = function () { mode = b.dataset.m; $$('[data-m]', s).forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    $('#pcx', s).onclick = function () { s.remove(); };
    $('#psend', s).onclick = function () {
      var ids = $$('.plist input:checked', s).map(function (i) { return i.value; }).slice(0, 7);
      if (!ids.length) return flash('Choose at least one player.');
      var cfg = { mode: mode, level: $('#plv', s).value, mins: +$('#pmin', s).value }; s.remove(); startParty(cfg, ids);
    };
  }
  function startParty(cfg, ids) {
    P = { host: true, id: rid(), cfg: cfg, inv: {}, pin: null, st: null };
    ids.forEach(function (id) { P.inv[id] = { name: (players[id] || {}).name || 'Player', a: 'invited' }; });
    LOBBY.update(myStatus()); drawParty();
    var f = document.createElement('iframe'); f.className = 'hostframe'; f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
    f.src = '/live/host/?arena=' + encodeURIComponent(JSON.stringify(cfg)) + (LOCAL ? '&bus=local' : '');
    document.body.appendChild(f); P.hostFrame = f;
    P.wait = setTimeout(function () { if (P && !P.pin) { flash('Could not start the party game. Please try again.'); closeParty(); } }, 25000);
  }
  addEventListener('message', function (e) {
    if (!P || !P.host || !P.hostFrame || e.source !== P.hostFrame.contentWindow || !e.data || !e.data.arena) return;
    var d = e.data;
    if (d.t === 'error') { flash(d.code === 429 || d.code === 'quota' ? 'You have started a lot of party games today. Try again tomorrow.' : 'Could not start the party game.'); return closeParty(); }
    if (d.t === 'room') {
      clearTimeout(P.wait); P.pin = d.pin;
      Object.keys(P.inv).forEach(function (id) { inbox(id).pub('party', { pid: P.id, pin: P.pin, mode: P.cfg.mode, level: P.cfg.level, mins: P.cfg.mins, name: ME.name, n: Object.keys(P.inv).length + 1 }); });
      P.inviteEnd = setTimeout(function () { if (!P) return; Object.keys(P.inv).forEach(function (id) { if (P.inv[id].a === 'invited') P.inv[id].a = 'no answer'; }); partyMaybeStart(); drawPartyBar(); }, 45000);
      drawParty();
    }
    if (d.t === 'st') { var was = P.st && P.st.phase; P.st = d; drawPartyBar(); if (d.phase === 'lobby') partyMaybeStart(); if (d.phase === 'end' && was !== 'end') say('Time is up!'); }
  });
  function joined() { return P && P.st ? P.st.players.length : 0; }
  function partyMaybeStart() {
    if (!P || !P.host || !P.st || P.st.phase !== 'lobby' || P.starting) return;
    var ids = Object.keys(P.inv), yes = ids.filter(function (id) { return P.inv[id].a === 'yes'; }).length, open = ids.filter(function (id) { return P.inv[id].a === 'invited'; }).length;
    if (!open && !yes) { flash('Nobody accepted the invitation.'); return closeParty(); }
    if (!open && joined() >= yes + 1 && joined() >= 2) partyGo();
  }
  function partyGo() {
    if (!P || P.starting) return; P.starting = true; var n = 3;
    var t = setInterval(function () { if (!P) return clearInterval(t); setBar(n ? 'Starting in ' + n + '…' : 'Go!'); if (!n--) { clearInterval(t); P.hostFrame.contentWindow.postMessage({ arena: 1, t: 'begin' }, location.origin); } }, 1000);
  }
  function partyInvite(d, from) {
    if (G || P || pending) return inbox(from).pub('pno', { pid: d.pid, busy: true });
    var m = pmode(d.mode), nm = d.name || (players[from] || {}).name || 'A player';
    say(nm + ' invites you to a party game');
    toast('<b>🎉 ' + esc(nm) + ' invites you to a party game: ' + m[1] + ' ' + m[2] + '</b><span class="muted">' + esc(d.level) + ' · ' + d.mins + ' minutes · up to ' + d.n + ' players</span><div class="row"><button class="btn sm gold" id="pok">Join</button><button class="btn sm" id="pno">Not now</button></div>');
    var timer = setTimeout(function () { toast(null); }, 45000);
    $('#pok').onclick = function () { clearTimeout(timer); toast(null); inbox(from).pub('pyes', { pid: d.pid }); P = { host: false, id: d.pid, from: from, fname: nm, pin: d.pin, cfg: { mode: d.mode, level: d.level, mins: d.mins } }; LOBBY.update(myStatus()); drawParty(); };
    $('#pno').onclick = function () { clearTimeout(timer); toast(null); inbox(from).pub('pno', { pid: d.pid }); };
  }
  function partyMsg(name, d, from) {
    if (!P || d.pid !== P.id) return;
    if (P.host && P.inv[from] && (name === 'pyes' || name === 'pno')) { P.inv[from].a = name === 'pyes' ? 'yes' : d.busy ? 'busy' : 'not now'; drawPartyBar(); partyMaybeStart(); }
    if (!P.host && from === P.from && name === 'pclose') { P.over = true; setBar(P.fname + ' has closed the party game.'); if ($('#pleave')) $('#pleave').textContent = 'Back to players'; }
  }
  function drawParty() {
    var m = pmode(P.cfg.mode);
    V.innerHTML = '<div class="pbar"><div class="ptitle">' + m[1] + ' <b>' + m[2] + '</b> <span class="muted">· ' + esc(P.cfg.level) + ' · ' + P.cfg.mins + ' min</span></div><div id="pstatus" class="muted"></div><div class="pchips" id="pchips"></div>' +
      '<div class="row">' + (P.host ? '<button class="btn sm gold" id="pstart" hidden>▶ Start now</button>' : '') + '<button class="btn sm" id="pleave">Leave</button></div></div>' +
      (P.pin ? '<iframe class="playframe" title="Party game" allow="autoplay; fullscreen" src="/live/?pin=' + P.pin + '&arena=1&name=' + encodeURIComponent(ME.name) + (LOCAL ? '&bus=local' : '') + '"></iframe>' : '<div class="empty" style="margin-top:14px">Setting up the game room…</div>');
    $('#pleave').onclick = function () { closeParty(); };
    if (P.host) $('#pstart').onclick = function () { $('#pstart').hidden = true; partyGo(); };
    drawPartyBar();
  }
  function setBar(t) { var s = $('#pstatus'); if (s) s.textContent = t; }
  function drawPartyBar() {
    if (!P) return;
    var chips = $('#pchips'), st = P.st, start = $('#pstart');
    if (P.host) {
      var inGame = st ? st.players.map(function (p) { return p.name; }) : [];
      if (chips) chips.innerHTML = '<span class="pchip ok">' + esc(ME.name) + ' (you)</span>' + Object.keys(P.inv).map(function (id) { var x = P.inv[id], on = inGame.indexOf(x.name) >= 0; return '<span class="pchip ' + (on ? 'ok' : x.a === 'yes' ? 'wait' : x.a === 'invited' ? '' : 'off') + '">' + esc(x.name) + ' · ' + (on ? 'ready' : x.a === 'yes' ? 'joining…' : x.a) + '</span>'; }).join('');
      if (!P.starting && st && st.phase === 'lobby') setBar(joined() >= 2 ? joined() + ' players ready. The game starts when everyone has answered, or press Start now.' : 'Waiting for the players to accept…');
      if (start) start.hidden = !(st && st.phase === 'lobby' && joined() >= 2 && !P.starting);
    }
    if (st && st.phase === 'race') setBar('Playing · ' + Math.ceil(st.left / 1000) + ' s left');
    if (st && st.phase === 'end' && !P.over) {
      P.over = true;
      setBar('Final results: ' + st.players.slice(0, 3).map(function (p, i) { return ['🥇', '🥈', '🥉'][i] + ' ' + p.name; }).join('  '));
      if ($('#pleave')) $('#pleave').textContent = 'Back to players';
    }
    if (!P.host && !P.over) setBar('Hosted by ' + P.fname + '. The game starts when everyone has joined. Good luck!');
  }
  function closeParty(quiet) {
    if (!P) return;
    if (P.host) { Object.keys(P.inv).forEach(function (id) { inbox(id).pub('pclose', { pid: P.id }); }); clearTimeout(P.wait); clearTimeout(P.inviteEnd); if (P.hostFrame) P.hostFrame.remove(); }
    P = null; LOBBY.update(myStatus()); toast(null); drawLobby();
  }
  addEventListener('pagehide', function () { if (P && P.host) Object.keys(P.inv).forEach(function (id) { inbox(id).pub('pclose', { pid: P.id }); }); });

  /* ---------- a game ---------- */
  function begin(o) {
    G = { gid: o.gid, game: o.game, opp: o.opp, oname: o.oname || 'Opponent', mine: o.first === ME.id ? 0 : 1, over: false, seq: 0, ch: RT.channel('arena:g:' + o.gid), extra: o.extra, away: null };
    LOBBY.update(myStatus());
    var thisCh = G.ch;
    thisCh.sub(function (n, d, from) { if (!G || G.ch !== thisCh || from !== G.opp) return; onGame(n, d); });
    thisCh.onPresence(function (a, id) {
      if (!G || G.ch !== thisCh || id !== G.opp || G.over) return;
      if (a === 'leave' || a === 'absent') { G.away = setTimeout(function () { if (G && !G.over) end('w', G.oname + ' left the game.'); }, 30000); setStatus(G.oname + ' lost the connection… waiting 30 seconds.'); }
      if ((a === 'enter' || a === 'present') && G.away) { clearTimeout(G.away); G.away = null; redraw(); }
    });
    G.ch.enter({ name: ME.name });
    if (o.game === 'chess') { G.chess = new Chess(); G.sel = null; G.last = null; G.log = []; }
    if (o.game === 'c4') { G.cells = []; for (var i = 0; i < 42; i++) G.cells.push(0); G.turn = 0; G.win = null; }
    if (o.game === 'duel') { G.qs = o.extra.qs; G.i = 0; G.pts = [0, 0]; G.done = [0, 0]; G.right = [0, 0]; G.started = Date.now() + 3000; }
    redraw();
    if (o.game === 'duel') duelTick();
  }
  function opp() { return 1 - G.mine; }
  function send(n, d) { G.ch.pub(n, d || {}); }
  function onGame(n, d) {
    if (n === 'emo') return bubble(d.e, false);
    if (n === 'resign') return end('w', G.oname + ' resigned.');
    if (n === 'drawoffer') return offerIn();
    if (n === 'drawyes') return end('d', 'Draw agreed.');
    if (n === 'drawno') return flash(G.oname + ' wants to keep playing.');
    if (n === 'bye') return G.over ? flash(G.oname + ' went back to the lobby.') : end('w', G.oname + ' left the game.');
    if (n === 'again' && G.over) { if (G.wantAgain) return rematch(true); G.oppAgain = true; return setStatus(G.oname + ' wants a rematch!'); }
    if (G.game === 'chess' && n === 'mv') { var m = G.chess.move({ from: d.from, to: d.to, promotion: d.p || 'q' }); if (m) afterChess(m, false); }
    if (G.game === 'c4' && n === 'drop') { drop(d.c, opp()); }
    if (G.game === 'duel' && n === 'ans') { G.pts[opp()] = d.pts; G.done[opp()] = d.done; G.right[opp()] = d.right; drawDuelScore(); duelCheckEnd(); }
  }
  function head() {
    var mine = G.game === 'chess' ? (G.mine === 0 ? ['White', '#fff'] : ['Black', '#222']) : G.game === 'c4' ? (G.mine === 0 ? ['Red', 'var(--red)'] : ['Yellow', 'var(--yel)']) : null;
    var theirs = G.game === 'chess' ? (G.mine === 0 ? ['Black', '#222'] : ['White', '#fff']) : G.game === 'c4' ? (G.mine === 0 ? ['Yellow', 'var(--yel)'] : ['Red', 'var(--red)']) : null;
    var myTurn = !G.over && (G.game === 'chess' ? (G.chess.turn() === 'w') === (G.mine === 0) : G.game === 'c4' ? G.turn === G.mine : false);
    var side = function (name, id, c, on) { return '<span class="side' + (on ? ' turn' : '') + '">' + av(name, id) + esc(name) + (c ? ' <span class="chip" style="background:' + c[1] + ';border:1px solid #888"></span>' : '') + '</span>'; };
    return '<div class="gtop">' + side(ME.name + ' (you)', ME.id, mine, myTurn) + '<b class="muted">vs</b>' + side(G.oname, G.opp, theirs, !myTurn && !G.over && G.game !== 'duel') + '</div>';
  }
  function tools() {
    var t = '<div class="emo" aria-label="Reactions">' + ['👏', '😮', '😅', '🤝', '🔥'].map(function (e) { return '<button data-emo="' + e + '">' + e + '</button>'; }).join('') + '</div><div id="bub" style="min-height:40px"></div>';
    t += G.over ? '<div class="row"><button class="btn gold" id="again">↻ Rematch</button><button class="btn" id="lobby">Back to players</button></div>'
      : '<div class="row">' + (G.game === 'chess' ? '<button class="btn sm" id="draw">½ Offer a draw</button>' : '') + (G.game !== 'duel' ? '<button class="btn sm red" id="resign">Resign</button>' : '') + '<button class="btn sm" id="spk">' + (speak ? '🔊 Moves read aloud' : '🔇 Read moves aloud') + '</button></div>';
    return t;
  }
  function wire() {
    $$('[data-emo]').forEach(function (b) { b.onclick = function () { send('emo', { e: b.dataset.emo }); bubble(b.dataset.emo, true); }; });
    var on = function (sel, fn) { var el = $(sel); if (el) el.onclick = function () { fn(el); }; };
    on('#resign', function (el) { if (el.dataset.sure) { send('resign'); end('l', 'You resigned.'); } else { el.dataset.sure = 1; el.textContent = 'Tap again to resign'; } });
    on('#draw', function () { send('drawoffer'); flash('Draw offered.'); });
    on('#spk', function () { speak = !speak; try { localStorage.setItem('arena.speak', speak ? '1' : '0'); } catch (e) {} redraw(); });
    on('#again', function () { G.wantAgain = true; send('again'); if (G.oppAgain) rematch(false); else setStatus('Waiting for ' + G.oname + '…'); });
    on('#lobby', leaveGame);
  }
  function bubble(e, mine) { var b = $('#bub'); if (!b) return; b.innerHTML = '<span class="bubble">' + (mine ? 'You: ' : esc(G.oname) + ': ') + e + '</span>'; }
  function offerIn() { toast('<b>' + esc(G.oname) + ' offers a draw.</b><div class="row"><button class="btn sm gold" id="dy">Accept draw</button><button class="btn sm" id="dn">Keep playing</button></div>'); $('#dy').onclick = function () { toast(null); send('drawyes'); end('d', 'Draw agreed.'); }; $('#dn').onclick = function () { toast(null); send('drawno'); }; }
  function setStatus(t) { var s = $('#status'); if (s) s.textContent = t; }
  function end(res, msg) {
    if (!G || G.over) return; G.over = true; G.res = res; G.msg = msg + (res === 'w' ? ' You win! 🏆' : res === 'l' ? ' ' + G.oname + ' wins.' : '');
    if (G.away) clearTimeout(G.away);
    say(res === 'w' ? 'You win!' : res === 'l' ? G.oname + ' wins.' : 'Draw.');
    if (!LOCAL) fetch('/api/arena/result', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ gid: G.gid, res: res, opp: G.opp }) }).then(function (r) { return r.json(); }).then(function (d) { if (d && d.r) { ME.r = d.r; $('#me').textContent = ME.name + ' · ' + ME.r; LOBBY.update(myStatus()); } }).catch(function () {});
    redraw();
  }
  function rematch(theyAsked) {
    if (theyAsked) return;   // the player who presses second creates the new game for both
    var o = { gid: rid(), game: G.game, first: G.mine === 0 ? G.opp : ME.id, extra: G.extra }, oppId = G.opp, oname = G.oname, ch = G.ch;
    var go = function () { ch.pub('re', o).then(function () { closeGame(); begin({ gid: o.gid, game: o.game, opp: oppId, oname: oname, first: o.first, extra: o.extra }); }); };
    if (G.game === 'duel') duelQuestions(G.extra.lv).then(function (qs) { o.extra = { lv: G.extra.lv, qs: qs }; go(); }); else go();
  }
  function closeGame() { if (!G) return; if (G.timer) clearInterval(G.timer); try { G.ch.detach(); } catch (e) {} G = null; }
  function leaveGame() { if (G) send('bye'); closeGame(); LOBBY.update(myStatus()); toast(null); drawLobby(); }
  // a rematch started by the opponent arrives on the old game channel
  var _onGame = onGame; onGame = function (n, d) { if (n === 're' && G && G.over) { var o = { gid: d.gid, game: d.game, opp: G.opp, oname: G.oname, first: d.first, extra: d.extra }; closeGame(); return begin(o); } _onGame(n, d); };
  function redraw() { if (!G) return drawLobby(); if (G.game === 'chess') drawChess(); else if (G.game === 'c4') drawC4(); else drawDuel(); }

  /* ---------- chess ---------- */
  var GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' }, NAME = { k: 'King', q: 'Queen', r: 'Rook', b: 'Bishop', n: 'Knight', p: 'Pawn' };
  function english(m, who) {
    var s = who + ': ' + NAME[m.piece] + ' ' + (m.flags.indexOf('k') >= 0 ? 'castles on the king\'s side' : m.flags.indexOf('q') >= 0 ? 'castles on the queen\'s side' : (m.captured ? 'takes the ' + NAME[m.captured].toLowerCase() + ' on ' + m.to : 'to ' + m.to));
    if (m.promotion) s += ' and becomes a ' + NAME[m.promotion].toLowerCase();
    return s + (m.san.indexOf('#') >= 0 ? '. Checkmate!' : m.san.indexOf('+') >= 0 ? '. Check!' : '.');
  }
  function drawChess() {
    var c = G.chess, flip = G.mine === 1, files = 'abcdefgh', board = '', legal = {}, inCheck = c.in_check() ? c.turn() : null;
    if (G.sel) c.moves({ square: G.sel, verbose: true }).forEach(function (m) { legal[m.to] = m.captured ? 'cap' : 'dot'; });
    for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) {
      var rr = flip ? r : 7 - r, ff = flip ? 7 - f : f, sq = files[ff] + (rr + 1), p = c.get(sq), cls = ((rr + ff) % 2 ? 'l' : 'd');
      if (G.sel === sq) cls += ' sel'; if (G.last && (G.last.from === sq || G.last.to === sq)) cls += ' last';
      if (p && p.type === 'k' && p.color === inCheck) cls += ' chk';
      board += '<button class="sq ' + cls + '" data-sq="' + sq + '" aria-label="' + sq + (p ? ' ' + (p.color === 'w' ? 'white ' : 'black ') + NAME[p.type] : '') + '">' + (p ? '<span class="pc ' + p.color + '">' + GLYPH[p.type] + '</span>' : '') + (legal[sq] ? '<span class="hint ' + (legal[sq] === 'cap' ? 'cap' : '') + '"></span>' : '') +
        (f === 0 ? '<span class="co r">' + (rr + 1) + '</span>' : '') + (r === 7 ? '<span class="co f">' + files[ff] + '</span>' : '') + '</button>';
    }
    var myTurn = (c.turn() === 'w') === (G.mine === 0);
    V.innerHTML = head() + '<div class="layout"><div><div class="board" id="board">' + board + '</div><div id="promo"></div></div><div class="panel"><div class="status" id="status">' + esc(G.over ? G.msg : (myTurn ? 'Your move' : G.oname + ' is thinking…') + (c.in_check() && !G.over ? ' · Check!' : '')) + '</div>' +
      '<div class="moves" id="moves">' + (G.log.length ? G.log.map(function (t, i) { return '<div><span>' + (i + 1) + '.</span><span>' + esc(t) + '</span></div>'; }).join('') : '<p class="muted">White moves first. Tap a piece, then tap where it goes.</p>') + '</div><div style="margin-top:12px">' + tools() + '</div></div></div>';
    var mv = $('#moves'); if (mv) mv.scrollTop = mv.scrollHeight;
    wire();
    $$('.sq').forEach(function (b) { b.onclick = function () { chessTap(b.dataset.sq); }; });
  }
  function chessTap(sq) {
    var c = G.chess; if (G.over || (c.turn() === 'w') !== (G.mine === 0)) return;
    var p = c.get(sq), mineColor = G.mine === 0 ? 'w' : 'b';
    if (G.sel) {
      var opts = c.moves({ square: G.sel, verbose: true }).filter(function (m) { return m.to === sq; });
      if (opts.length) {
        if (opts[0].flags.indexOf('p') >= 0) return promo(G.sel, sq);
        return myMove(G.sel, sq, null);
      }
    }
    G.sel = p && p.color === mineColor ? (G.sel === sq ? null : sq) : null; drawChess();
  }
  function promo(from, to) {
    var col = G.mine === 0 ? 'w' : 'b', el = $('#promo');
    el.innerHTML = '<p class="center muted" style="margin:10px 0 6px">Your pawn becomes…</p><div class="promo">' + ['q', 'r', 'b', 'n'].map(function (t) { return '<button data-p="' + t + '" aria-label="' + NAME[t] + '"><span class="pc ' + col + '">' + GLYPH[t] + '</span></button>'; }).join('') + '</div>';
    $$('[data-p]', el).forEach(function (b) { b.onclick = function () { myMove(from, to, b.dataset.p); }; });
  }
  function myMove(from, to, pr) { var m = G.chess.move({ from: from, to: to, promotion: pr || 'q' }); if (!m) return; send('mv', { from: from, to: to, p: pr || 'q' }); afterChess(m, true); }
  function afterChess(m, mine) {
    var c = G.chess, t = english(m, mine ? 'You' : G.oname); G.sel = null; G.last = { from: m.from, to: m.to }; G.log.push(t); say(t);
    if (c.in_checkmate()) return end(mine ? 'w' : 'l', 'Checkmate.');
    if (c.in_stalemate()) return end('d', 'Stalemate: no legal moves.');
    if (c.in_threefold_repetition()) return end('d', 'The same position three times.');
    if (c.insufficient_material()) return end('d', 'Not enough pieces to checkmate.');
    if (c.in_draw()) return end('d', 'Draw (50-move rule).');
    drawChess();
  }

  /* ---------- connect four ---------- */
  function drawC4() {
    var myTurn = G.turn === G.mine && !G.over, cells = '';
    for (var r = 0; r < 6; r++) for (var c = 0; c < 7; c++) { var v = G.cells[r * 7 + c]; cells += '<button data-c="' + c + '" class="' + (v === 1 ? 'r' : v === 2 ? 'y' : '') + (G.win && G.win.indexOf(r * 7 + c) >= 0 ? ' win' : '') + '" aria-label="column ' + (c + 1) + '"></button>'; }
    V.innerHTML = head() + '<div class="layout"><div><div class="c4">' + cells + '</div></div><div class="panel"><div class="status" id="status">' + esc(G.over ? G.msg : myTurn ? 'Your turn: tap a column' : G.oname + ' is thinking…') + '</div>' + tools() + '</div></div>';
    wire();
    $$('.c4 button').forEach(function (b) { b.onclick = function () { if (G.turn !== G.mine || G.over) return; var c = +b.dataset.c; if (drop(c, G.mine)) send('drop', { c: c }); }; });
  }
  function drop(c, who) {
    if (G.turn !== who || G.over) return false;
    for (var r = 5; r >= 0; r--) if (!G.cells[r * 7 + c]) {
      G.cells[r * 7 + c] = who + 1; G.turn = 1 - who;
      var w = c4win(r, c, who + 1);
      if (w) { G.win = w; end(who === G.mine ? 'w' : 'l', 'Four in a row.'); }
      else if (G.cells.every(Boolean)) end('d', 'The board is full.');
      else drawC4();
      return true;
    }
    return false;
  }
  function c4win(r, c, v) {
    var D = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (var i = 0; i < 4; i++) {
      var line = [r * 7 + c];
      [1, -1].forEach(function (s) { var rr = r + D[i][0] * s, cc = c + D[i][1] * s; while (rr >= 0 && rr < 6 && cc >= 0 && cc < 7 && G.cells[rr * 7 + cc] === v) { line.push(rr * 7 + cc); rr += D[i][0] * s; cc += D[i][1] * s; } });
      if (line.length >= 4) return line;
    }
    return null;
  }

  /* ---------- word duel ---------- */
  var BANKS = null;
  function duelQuestions(lv) {
    return (BANKS ? Promise.resolve(BANKS) : fetch('/live/banks.json').then(function (r) { return r.json(); }).then(function (d) { BANKS = d.banks || []; return BANKS; })).then(function (banks) {
      var b = banks.filter(function (x) { return x.id === lv; })[0]; if (!b) return [];
      var words = [], seen = {}; b.units.forEach(function (u) { (u.w || []).forEach(function (w) { if (w[1] && !seen[w[0]]) { seen[w[0]] = 1; words.push(w); } }); });
      var sh = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
      return sh(words).slice(0, 10).map(function (w) { var o = sh([w].concat(sh(words.filter(function (x) { return x !== w; })).slice(0, 3))).map(function (x) { return x[0]; }); return { p: w[1], o: o, a: o.indexOf(w[0]) }; });
    }).catch(function () { return []; });
  }
  var DUEL_SECS = 12;
  function drawDuel() {
    var q = G.qs[G.i], wait = Date.now() < G.started;
    var body;
    if (G.over) body = '<div class="status" id="status">' + esc(G.msg) + '</div><p class="muted">You: ' + G.right[G.mine] + '/10 correct · ' + esc(G.oname) + ': ' + G.right[opp()] + '/10 correct</p>';
    else if (wait) body = '<div class="status" id="status">Get ready… the duel starts in a moment.</div>';
    else if (G.i >= G.qs.length) body = '<div class="status" id="status">Finished! Waiting for ' + esc(G.oname) + '…</div>';
    else body = '<p class="muted">Question ' + (G.i + 1) + ' of ' + G.qs.length + ' · Which word means…</p><div class="bar"><i id="tbar" style="width:100%"></i></div><div class="q">' + esc(q.p) + '</div><div class="os">' + q.o.map(function (o, k) { return '<button data-k="' + k + '">' + esc(o) + '</button>'; }).join('') + '</div>';
    V.innerHTML = head() + '<div class="duel"><div class="score" id="sc"></div><div class="panel" style="margin-top:12px">' + body + '</div><div style="margin-top:12px">' + tools() + '</div></div>';
    drawDuelScore(); wire();
    G.qStart = Date.now();
    $$('.os button').forEach(function (b) { b.onclick = function () { duelAnswer(+b.dataset.k, b); }; });
  }
  function drawDuelScore() { var s = $('#sc'); if (!s) return; s.innerHTML = '<div class="panel"><small class="muted">You</small><br><b>' + G.pts[G.mine] + '</b> <small class="muted">' + G.done[G.mine] + '/10</small></div><div class="panel"><small class="muted">' + esc(G.oname) + '</small><br><b>' + G.pts[opp()] + '</b> <small class="muted">' + G.done[opp()] + '/10</small></div>'; }
  function duelTick() {
    if (G.timer) clearInterval(G.timer);
    var g = G, waiting = Date.now() < G.started;
    G.timer = setInterval(function () {
      if (G !== g || G.over) return clearInterval(g.timer);
      if (waiting) { if (Date.now() >= G.started) { waiting = false; drawDuel(); } return; }
      if (G.i >= G.qs.length || G.locked) return;
      var left = DUEL_SECS - (Date.now() - G.qStart) / 1000, bar = $('#tbar');
      if (bar) bar.style.width = Math.max(0, left / DUEL_SECS * 100) + '%';
      if (left <= 0) duelAnswer(-1, null);
    }, 100);
  }
  function duelAnswer(k, btn) {
    if (G.locked || G.over || G.i >= G.qs.length) return;
    G.locked = true;
    var q = G.qs[G.i], ok = k === q.a, secs = (Date.now() - G.qStart) / 1000;
    if (ok) { G.pts[G.mine] += 100 + Math.max(0, Math.round((DUEL_SECS - secs) / DUEL_SECS * 50)); G.right[G.mine]++; }
    $$('.os button').forEach(function (b, i) { if (i === q.a) b.classList.add('ok'); else if (b === btn) b.classList.add('bad'); b.disabled = true; });
    G.i++; G.done[G.mine] = G.i;
    send('ans', { pts: G.pts[G.mine], done: G.i, right: G.right[G.mine] });
    drawDuelScore();
    setTimeout(function () { if (!G || G.over) return; G.locked = false; if (G.i >= G.qs.length) duelCheckEnd(); drawDuel(); }, ok ? 700 : 1400);
  }
  function duelCheckEnd() {
    if (G.over || G.done[0] < G.qs.length || G.done[1] < G.qs.length) return;
    var a = G.pts[G.mine], b = G.pts[opp()];
    end(a > b ? 'w' : a < b ? 'l' : 'd', 'Final score ' + a + ' – ' + b + '.');
  }

  addEventListener('pagehide', function () { if (G && !G.over) send('bye'); });
  boot();
})();
