/* IF Live — player (phone) */
(function () {
  'use strict';
  var L = window.LIVE, $ = L.$, esc = L.esc, view = $('#view');
  var qsp = new URLSearchParams(location.search);
  var S = { pin: (qsp.get('pin') || '').replace(/\D/g, ''), name: '', pid: null, uid: null, bus: null, st: null, answered: {}, team: -1, race: null };

  function show(h) { view.innerHTML = h; }
  function flash(ok) { var f = $('#flash'); f.className = 'flash ' + (ok ? 'ok' : 'no'); clearTimeout(flash.t); flash.t = setTimeout(function () { f.className = 'flash'; }, 380); }
  function meChip() { var m = $('#me'); m.hidden = !S.name; m.innerHTML = esc(S.name) + (S.st && S.st.you && S.st.you[S.pid] ? ' · <span class="score-chip">' + S.st.you[S.pid][0] + '</span>' : ''); }

  /* ---------- join ---------- */
  async function prefill() {
    try { var r = await fetch('/api/school/me', { credentials: 'same-origin' }); if (r.ok) { var d = await r.json(); var n = d.profile && d.profile.name; if (n) return String(n).split(/\s+/).slice(0, 2).join(' '); } } catch (e) {}
    return (L.ls.get('live.name') || '');
  }
  async function vJoin(err) {
    var name = S.name || await prefill();
    show('<form class="join" id="f" novalidate><h1>Join the game</h1><p>Enter the PIN on your teacher\'s screen.</p>' +
      '<input class="field pin" id="pin" inputmode="numeric" autocomplete="off" maxlength="6" placeholder="PIN" value="' + esc(S.pin) + '" aria-label="Game PIN">' +
      '<input class="field" id="nm" maxlength="24" autocomplete="given-name" placeholder="Your name" value="' + esc(name) + '" aria-label="Your name">' +
      '<button class="btn big" type="submit">Join</button><div class="err" id="err">' + esc(err || '') + '</div></form>');
    $(S.pin ? '#nm' : '#pin').focus();
    $('#f').onsubmit = function (e) { e.preventDefault(); join($('#pin').value.replace(/\D/g, ''), $('#nm').value.trim()); };
  }
  async function join(pin, name) {
    var err = $('#err');
    if (pin.length !== 6) { err.textContent = 'The PIN has 6 digits.'; return; }
    if (name.length < 2) { err.textContent = 'Please type your name.'; return; }
    err.textContent = 'Joining…';
    var saved = L.ls.get('live.p.' + pin);
    try {
      var r = L.local ? { pid: saved || 'p-' + Math.random().toString(36).slice(2, 10), token: null, account: null } : await L.api('join', { pin: pin, pid: saved });
      S.pin = pin; S.name = name; S.pid = r.pid; S.uid = r.account && r.account.uid;
      L.ls.set('live.p.' + pin, r.pid); L.ls.set('live.name', name);
      var first = r.token;
      S.bus = await L.connect({ pin: pin, clientId: r.pid, token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('join', { pin: pin, pid: S.pid })).token; } });
      S.bus.sub('h', onHost);
      hello();
      history.replaceState(null, '', '?pin=' + pin + (L.local ? '&bus=local' : ''));
      meChip(); vWait();
    } catch (e) {
      err.textContent = e.code === 'room' ? 'No game with this PIN is open. Check the number.' : e.code === 'not-configured' ? 'Live games are not switched on yet. Tell your teacher.' : 'Could not join. Check your internet and try again.';
    }
  }
  function hello() { S.bus.pub('p', 'join', { pid: S.pid, name: S.name, uid: S.uid || null }); }
  setInterval(function () { if (S.bus && (!S.st || !S.st.roster || !S.st.roster[S.pid])) hello(); }, 4000);

  /* ---------- host messages ---------- */
  function onHost(name, d) {
    if (name === 'qs') { if (!S.race || S.race.id !== d.id) S.race = { id: d.id, qs: d.qs, salt: d.salt, order: L.shuffle(d.qs.map(function (_, i) { return i; })), i: 0, s: 0, ok: 0, n: 0, streak: 0, lock: 0 }; if (S.st && S.st.phase === 'race') vRace(); return; }
    if (name !== 'st') return;
    var prev = S.st; S.st = d; d.at = Date.now();
    if (d.roster && d.roster[S.pid]) S.team = d.roster[S.pid][1];
    meChip();
    if (d.phase === 'lobby') return vWait();
    if (d.phase === 'q') { if (!prev || prev.phase !== 'q' || prev.i !== d.i) return vQuestion(); return; }
    if (d.phase === 'reveal' || d.phase === 'board') return vResult();
    if (d.phase === 'race') { if (!S.race) { S.bus.pub('p', 'need', { pid: S.pid }); return vWait('Get ready…'); } if (!prev || prev.phase !== 'race') vRace(); else raceTop(); return; }
    if (d.phase === 'end') return vEnd();
  }
  function teamTag() { var t = S.team; return t >= 0 && S.st && S.st.teams && S.st.teams.length ? '<div class="teamtag" style="background:' + L.HEX[t] + '">' + esc(S.st.teams[t]) + '</div>' : ''; }
  function vWait(msg) {
    var inRoom = S.st && S.st.roster && S.st.roster[S.pid];
    show('<div class="wait"><div class="pulse"></div><h2>' + (inRoom ? 'You\'re in!' : 'Connecting…') + '</h2><p>' + esc(msg || (inRoom ? 'See your name on the screen? The game starts soon.' : 'Joining game ' + S.pin)) + '</p>' + teamTag() + '</div>');
  }

  /* ---------- classic question ---------- */
  function vQuestion() {
    var d = S.st, q = d.q, mine = S.answered[d.i];
    if (mine != null) return show('<div class="wait"><div class="pulse"></div><h2>Answer sent</h2><p>Wait for the others…</p></div>');
    var long = L.isLong(q.o);
    show('<div class="pq"><div class="meta"><span>Question ' + (d.i + 1) + ' / ' + d.n + '</span><span id="tl"></span></div>' +
      '<div class="prompt">' + esc(q.p) + '</div>' +
      '<div class="opts' + (long ? ' long' : '') + '">' + q.o.map(function (o, k) { return '<button class="opt o' + k + '" data-k="' + k + '"><span class="sh">' + L.SHAPES[k] + '</span>' + esc(o) + '</button>'; }).join('') + '</div></div>');
    view.querySelectorAll('.opt').forEach(function (b) {
      b.onclick = function () {
        var k = +b.dataset.k; if (S.answered[d.i] != null) return;
        S.answered[d.i] = k; S.bus.pub('p', 'ans', { pid: S.pid, q: d.i, c: k });
        if (navigator.vibrate) navigator.vibrate(30);
        view.querySelectorAll('.opt').forEach(function (x) { x.classList.add(x === b ? 'pick' : 'dim'); });
        setTimeout(vQuestion, 250);
      };
    });
    tick();
  }
  function tick() {
    var el = $('#tl'); if (!el || !S.st || S.st.phase !== 'q') return;
    var left = Math.max(0, Math.ceil((S.st.left - (Date.now() - S.st.at)) / 1000)); el.textContent = left + ' s';
    setTimeout(tick, 250);
  }
  function vResult() {
    var d = S.st, y = (d.you || {})[S.pid];
    if (!y) return vWait('You will play from the next question.');
    var ok = y[3], cls = ok === 1 ? 'good' : 'bad';
    var title = ok === 1 ? 'Correct!' : ok === 0 ? 'Not this time' : 'Time\'s up';
    var right = d.reveal && d.q ? d.q.o[d.reveal.a] : '';
    show('<div class="res ' + cls + '"><div class="big">' + title + '</div>' +
      (ok === 1 ? '<div class="gain">+' + y[2] + ' points</div>' : right ? '<p>Answer: <b>' + esc(right) + '</b></p>' : '') +
      (y[4] > 1 ? '<div class="streak">🔥 Streak ' + y[4] + '</div>' : '') +
      '<div class="rank">' + y[0] + ' points · ' + ordinal(y[1]) + ' place</div>' + teamTag() + '</div>');
    if (ok != null && d.phase === 'reveal' && !vResult.seen[d.i]) { vResult.seen[d.i] = 1; flash(ok === 1); }
  }
  vResult.seen = {};
  function ordinal(n) { var s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }

  /* ---------- race (self-paced) ---------- */
  function vRace() {
    var R = S.race; if (!R) return;
    if (R.i >= R.order.length) { R.order = L.shuffle(R.order); R.i = 0; }
    var q = R.qs[R.order[R.i]], long = L.isLong(q.o);
    show('<div class="pq"><div class="meta"><span id="rk"></span><span class="score-chip" id="rs">' + R.s + '</span></div>' +
      '<div class="prompt">' + esc(q.p) + '</div><div class="lock" id="lk"></div>' +
      '<div class="opts' + (long ? ' long' : '') + '">' + q.o.map(function (o, k) { return '<button class="opt o' + k + '" data-k="' + k + '"><span class="sh">' + L.SHAPES[k] + '</span>' + esc(o) + '</button>'; }).join('') + '</div></div>');
    raceTop();
    view.querySelectorAll('.opt').forEach(function (b) {
      b.onclick = function () {
        if (Date.now() < R.lock || S.st.phase !== 'race') return;
        var k = +b.dataset.k, ok = k === L.unhide(q.h, R.salt);
        R.n++;
        if (ok) { R.ok++; R.streak++; R.s += 100 + Math.min(R.streak - 1, 5) * 20; flash(true); }
        else {
          R.streak = 0; R.lock = Date.now() + 1500; flash(false);
          b.classList.add('dim'); var right = view.querySelector('[data-k="' + L.unhide(q.h, R.salt) + '"]'); if (right) right.classList.add('pick');
          $('#lk').textContent = 'Wait a moment…';
        }
        S.bus.pub('p', 'race', { pid: S.pid, s: R.s, ok: R.ok, n: R.n });
        R.i++;
        setTimeout(vRace, ok ? 180 : 1500);
      };
    });
  }
  function raceTop() {
    var y = (S.st.you || {})[S.pid], rk = $('#rk');
    if (rk) rk.textContent = (y ? ordinal(y[1]) + ' place · ' : '') + clock(S.st.left - (Date.now() - S.st.at)) + ' left';
  }
  setInterval(function () { if (S.st && S.st.phase === 'race') raceTop(); }, 1000);

  function clock(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function vEnd() {
    var d = S.st, y = (d.you || {})[S.pid], tb = d.tboard || [];
    var team = S.team >= 0 && tb.length ? tb.filter(function (t) { return t[2] === S.team; })[0] : null;
    show('<div class="res good"><p>Game over</p><div class="big">' + (y ? ordinal(y[1]) + ' place' : 'Thanks for playing') + '</div>' +
      (y ? '<div class="gain">' + y[0] + ' points</div>' : '') +
      (team ? '<div class="rank">' + esc(d.teams[S.team]) + ' finished ' + ordinal(tb.indexOf(team) + 1) + (tb.indexOf(team) === 0 ? ' 🏆' : '') + '</div>' : '') +
      '<p style="margin-top:26px"><a class="btn ghost" href="/live/">Join another game</a></p></div>');
  }

  if (S.pin && L.ls.get('live.p.' + S.pin) && L.ls.get('live.name')) { show('<div class="wait"><div class="pulse"></div><h2>Rejoining…</h2></div>'); vJoin().then(function () { join(S.pin, L.ls.get('live.name')); }); }
  else vJoin();
})();
