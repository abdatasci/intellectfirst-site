/* IF Live — player (phone) */
(function () {
  'use strict';
  var L = window.LIVE, $ = L.$, esc = L.esc, view = $('#view');
  var qsp = new URLSearchParams(location.search);
  var S = { pin: (qsp.get('pin') || '').replace(/\D/g, ''), name: '', pid: null, uid: null, bus: null, st: null, answered: {}, team: -1, race: null };

  function show(h) { view.innerHTML = h; }
  function flash(ok) { var f = $('#flash'); f.className = 'flash ' + (ok ? 'ok' : 'no'); clearTimeout(flash.t); flash.t = setTimeout(function () { f.className = 'flash'; }, 380); }
  function meChip() { var m = $('#me'), M = L.mode(S.st && S.st.mode); m.hidden = !S.name; m.innerHTML = esc(S.name) + (S.st && S.st.you && S.st.you[S.pid] ? ' · <span class="score-chip">' + (M.power ? L.fmtN(S.st.you[S.pid][0]) + ' ' + M.cur : S.st.you[S.pid][0]) + '</span>' : ''); }
  function toast(text, kind) {
    var t = document.createElement('div'); t.className = 'toast ' + (kind || ''); t.textContent = text; document.body.appendChild(t);
    setTimeout(function () { t.classList.add('out'); }, 3200); setTimeout(function () { t.remove(); }, 3800);
  }
  function myScore() { var y = S.st && S.st.you && S.st.you[S.pid]; return y ? y[0] : 0; }

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
      '<button class="btn big" type="submit">Join</button><div class="err" id="err">' + esc(err || '') + '</div>' +
      '<p style="margin-top:26px;color:rgba(255,255,255,.75)">No game PIN?</p><button type="button" class="btn ghost" id="solo" style="margin-top:8px">✨ Practise General English on my own</button></form>');
    $('#solo').onclick = vPractice;
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
    if (name === 'qs') { if (!S.race || S.race.id !== d.id) S.race = { id: d.id, qs: d.qs, salt: d.salt, order: L.shuffle(d.qs.map(function (_, i) { return i; })), i: 0, s: 0, ok: 0, n: 0, streak: 0, lock: 0 }; if (S.st && S.st.phase === 'race' && !S.busy) vPlay(); return; }
    if (name === 'ev') return onEvent(d);
    if (name !== 'st') return;
    var prev = S.st; S.st = d; d.at = Date.now();
    if (d.roster && d.roster[S.pid]) S.team = d.roster[S.pid][1];
    meChip();
    if (d.phase === 'lobby') return vWait();
    if (d.phase === 'q') { if (!prev || prev.phase !== 'q' || prev.i !== d.i) return vQuestion(); return; }
    if (d.phase === 'reveal' || d.phase === 'board') return vResult();
    if (d.phase === 'race') { if (!S.race) { S.bus.pub('p', 'need', { pid: S.pid }); return vWait('Get ready…'); } if (!prev || prev.phase !== 'race') vPlay(); else raceTop(); return; }
    if (d.phase === 'match') return vMatch(prev);
    if (d.phase === 'end') { S.busy = false; return vEnd(); }
  }
  function teamTag() { var t = S.team; return t >= 0 && S.st && S.st.teams && S.st.teams.length ? '<div class="teamtag" style="background:' + L.HEX[t] + '">' + esc(S.st.teams[t]) + '</div>' : ''; }
  function vWait(msg) {
    var inRoom = S.st && S.st.roster && S.st.roster[S.pid];
    show('<div class="wait"><div class="pulse"></div><h2>' + (inRoom ? 'You\'re in!' : 'Connecting…') + '</h2><p>' + esc(msg || (inRoom ? 'See your name on the screen? The game starts soon.' : 'Joining game ' + S.pin)) + '</p>' + teamTag() + '<p style="margin-top:22px"><button class="btn ghost sm" id="snd">' + (L.sfx.off ? '🔇 Sound off' : '🔊 Sound on') + '</button></p></div>');
    $('#snd').onclick = function () { L.sfx.off = !L.sfx.off; L.ls.set('live.mute', L.sfx.off || null); this.textContent = L.sfx.off ? '🔇 Sound off' : '🔊 Sound on'; if (!L.sfx.off) L.sfx('ok'); };
  }

  /* ---------- classic question ---------- */
  function vQuestion() {
    var d = S.st, q = d.q, mine = S.answered[d.i];
    if (mine != null) return show('<div class="wait"><div class="pulse"></div><h2>Answer sent</h2><p>Wait for the others…</p></div>');
    var long = L.isLong(q.o);
    show('<div class="pq"><div class="meta"><span>Question ' + (d.i + 1) + ' / ' + d.n + '</span><span id="tl"></span></div>' +
      '<div class="prompt">' + L.qhtml(q.p, esc) + '</div>' +
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
  function vPlay() {
    var m = S.st && S.st.mode;
    if (m === 'hack' && !S.pwSet) return vPassword();
    S.busy = false; vRace();
  }
  function vRace() {
    var R = S.race; if (!R) return;
    var power = L.mode(S.st && S.st.mode).power;
    if (R.i >= R.order.length) { R.order = L.shuffle(R.order); R.i = 0; }
    var q = R.qs[R.order[R.i]], long = L.isLong(q.o);
    show('<div class="pq"><div class="meta"><span id="rk"></span><span class="score-chip" id="rs">' + (power ? L.fmtN(myScore()) + ' ' + L.mode(S.st.mode).cur : R.s) + '</span></div>' + (S.st.mode === 'fish' && S.st.fz ? '<div class="fzline">🌊 FRENZY — catches ×2</div>' : '') +
      '<div class="prompt">' + L.qhtml(q.p, esc) + '</div><div class="lock" id="lk"></div>' +
      '<div class="opts' + (long ? ' long' : '') + '">' + q.o.map(function (o, k) { return '<button class="opt o' + k + '" data-k="' + k + '"><span class="sh">' + L.SHAPES[k] + '</span>' + esc(o) + '</button>'; }).join('') + '</div></div>');
    raceTop();
    view.querySelectorAll('.opt').forEach(function (b) {
      b.onclick = function () {
        if (Date.now() < R.lock || S.st.phase !== 'race' || !b.isConnected) return;
        var k = +b.dataset.k, ok = k === L.unhide(q.h, R.salt);
        R.n++;
        if (ok) { R.ok++; R.streak++; R.s += 100 + Math.min(R.streak - 1, 5) * 20; flash(true); L.sfx('ok'); }
        else {
          R.streak = 0; R.lock = Date.now() + 1500; flash(false); L.sfx('no');
          b.classList.add('dim'); var right = view.querySelector('[data-k="' + L.unhide(q.h, R.salt) + '"]'); if (right) right.classList.add('pick');
          var lk = $('#lk'); if (lk) lk.textContent = 'Wait a moment…';
        }
        R.i++;
        if (power) { S.bus.pub('p', 'res', { pid: S.pid, ok: ok }); if (ok) { S.busy = true; return setTimeout(reward, 350); } return setTimeout(vPlay, 1500); }
        S.bus.pub('p', 'race', { pid: S.pid, s: R.s, ok: R.ok, n: R.n });
        setTimeout(vRace, ok ? 180 : 1500);
      };
    });
  }
  function raceTop() {
    var y = (S.st.you || {})[S.pid], rk = $('#rk');
    if (rk) rk.textContent = (y ? ordinal(y[1]) + ' place · ' : '') + clock(S.st.left - (Date.now() - S.st.at)) + ' left';
  }
  setInterval(function () { if (S.st && S.st.phase === 'race') raceTop(); }, 1000);

  /* ---------- power modes ---------- */
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function others() { return ((S.st && S.st.all) || []).filter(function (e) { return e[0] !== S.pid; }); }
  function cont(ms) { setTimeout(function () { if (S.st && S.st.phase === 'race') vPlay(); }, ms); }
  function reward() {
    var m = S.st.mode;
    if (m === 'gold') chests('gold'); else if (m === 'hack') chests('hack'); else if (m === 'fish') cast(); else if (m === 'cash') cashEarn();
    else if (m === 'tug' || m === 'boss' || m === 'balloon') quickHit(m);
    else vPlay();
  }
  function quickHit(m) {
    var streak = S.race ? S.race.streak : 0;
    var t = m === 'tug' ? ['💪', 'Pull!', 'Your team pulls the rope'] : m === 'boss' ? ['⚔️', streak >= 6 ? 'Triple hit!' : streak >= 3 ? 'Double hit!' : 'Hit!', 'Mumbleclaw says ouch'] : ['🎈', streak >= 3 ? 'Up, up, up! +2 m' : 'Up you go! +1 m', 'Your balloon rises'];
    show('<div class="res good"><div class="fishbig">' + t[0] + '</div><div class="big">' + t[1] + '</div><p>' + t[2] + (streak >= 3 ? ' · 🔥 ' + streak + ' in a row' : '') + '</p></div>');
    L.sfx(m === 'boss' ? 'hack' : 'coin'); if (navigator.vibrate) navigator.vibrate(30);
    setTimeout(vPlay, 650);
  }
  /* Cash Climb: coins per answer with upgrades bought in the shop */
  var CASH = {
    per: { name: 'Coins per answer', lv: [10, 25, 50, 100, 250, 500, 1000, 2500], cost: [0, 60, 250, 800, 2500, 7000, 20000, 60000] },
    streak: { name: 'Streak bonus', lv: [0, 5, 15, 40, 100, 300], cost: [0, 100, 500, 1500, 5000, 15000] },
    mult: { name: 'Multiplier', lv: [1, 1.5, 2, 3, 5], cost: [0, 300, 1500, 5000, 15000] }
  };
  function cashState() { return S.cash || (S.cash = { per: 0, streak: 0, mult: 0, bal: 0 }); }
  function cashEarn() {
    var C = cashState(), streak = S.race ? S.race.streak : 0;
    var earn = Math.round((CASH.per.lv[C.per] + CASH.streak.lv[C.streak] * Math.min(streak, 10)) * CASH.mult.lv[C.mult]);
    C.bal = Math.max(C.bal, myScore()) + earn;
    S.bus.pub('p', 'gain', { pid: S.pid, k: 'add', v: earn }); L.sfx('coin');
    cashShop('+' + L.fmtN(earn) + ' 💰');
  }
  function cashShop(msg) {
    var C = cashState(), bal = Math.max(C.bal, myScore());
    show('<div class="pw"><h2>' + (msg || '💰 Shop') + '</h2><p style="color:rgba(255,255,255,.75)">You have <b style="color:var(--gold)">' + L.fmtN(bal) + ' coins</b></p><div class="cashshop">' +
      Object.keys(CASH).map(function (k) { var U = CASH[k], lv = C[k], nx = lv + 1 < U.lv.length ? lv + 1 : null; return '<button data-k="' + k + '"' + (nx == null || U.cost[nx] > bal ? ' disabled' : '') + '><div><b>' + U.name + '</b><br><small>Now: ' + (k === 'mult' ? '×' + U.lv[lv] : k === 'streak' ? '+' + U.lv[lv] + ' per streak' : U.lv[lv] + ' per answer') + (nx != null ? ' → ' + (k === 'mult' ? '×' + U.lv[nx] : U.lv[nx]) : '') + '</small></div><span>' + (nx == null ? 'MAX' : L.fmtN(U.cost[nx]) + ' 💰') + '</span></button>'; }).join('') +
      '</div><p style="margin-top:16px"><button class="btn" id="nx">Next question →</button></p></div>');
    view.querySelectorAll('.cashshop button').forEach(function (b) {
      b.onclick = function () { var k = b.dataset.k, U = CASH[k], nx = C[k] + 1, cost = U.cost[nx]; if (cost == null || cost > Math.max(C.bal, myScore())) return; C[k] = nx; C.bal = Math.max(C.bal, myScore()) - cost; S.bus.pub('p', 'spend', { pid: S.pid, v: cost, item: U.name }); L.sfx('win'); cashShop('Upgraded! ✨'); };
    });
    $('#nx').onclick = vPlay;
  }
  function outcome(m) {
    var r = Math.random(), cnt = S.race ? S.race.ok : 0, lvl = 1 + Math.floor(cnt / 6);
    if (m === 'hack') {
      if (r < .62) { var v = pick([25, 50, 75, 100, 150, 200, 300]) * lvl; return { k: 'add', v: v, l: '+' + v + ' ₿', ic: '💾' }; }
      if (r < .72) return { k: 'mul', v: 2, l: 'Double!', ic: '⚡' };
      return { k: 'hack', l: 'HACK!', ic: '🕵️' };
    }
    if (r < .42) { var g = pick([10, 20, 25, 30, 40, 50, 75, 100]) * lvl; return { k: 'add', v: g, l: '+' + g + ' 🪙', ic: '🪙' }; }
    if (r < .52) return { k: 'mul', v: 2, l: 'Double!', ic: '✖️2' };
    if (r < .57) return { k: 'mul', v: 3, l: 'Triple!', ic: '✖️3' };
    if (r < .65) return { k: 'lose', v: .25, l: 'Lose 25%', ic: '💸' };
    if (r < .69) return { k: 'lose', v: .5, l: 'Lose 50%', ic: '🕳️' };
    if (r < .77) return { k: 'none', l: 'Nothing!', ic: '🕸️' };
    if (r < .9) { var pc = pick([.1, .25]); return { k: 'steal', v: pc, l: 'Take ' + pc * 100 + '%', ic: '🦝' }; }
    return { k: 'swap', l: 'Swap!', ic: '🔄' };
  }
  function chests(m) {
    var opts = [outcome(m), outcome(m), outcome(m)], icon = m === 'hack' ? '🗄️' : '🎁';
    show('<div class="pw"><h2>' + (m === 'hack' ? 'Pick a server' : 'Choose a chest!') + '</h2><div class="chests">' + opts.map(function (o, i) { return '<button class="chest" data-i="' + i + '"><span class="ci">' + icon + '</span><span class="cl"></span></button>'; }).join('') + '</div><p class="mini" style="color:rgba(255,255,255,.6)">' + L.fmtN(myScore()) + ' ' + L.mode(m).cur + ' now</p></div>');
    view.querySelectorAll('.chest').forEach(function (b) {
      b.onclick = function () {
        if (view.querySelector('.chest.open')) return;
        var o = opts[+b.dataset.i];
        view.querySelectorAll('.chest').forEach(function (x, i) { x.classList.add('open'); if (x !== b) x.classList.add('dim'); x.querySelector('.ci').textContent = opts[i].ic; x.querySelector('.cl').textContent = opts[i].l; });
        var bad = o.k === 'lose' || o.k === 'none'; L.sfx(bad ? 'bad' : o.k === 'hack' ? 'hack' : 'coin'); if (navigator.vibrate) navigator.vibrate(bad ? [60, 40, 60] : 40);
        setTimeout(function () { apply(m, o); }, 1100);
      };
    });
  }
  function apply(m, o) {
    var list = others();
    if ((o.k === 'steal' || o.k === 'swap' || o.k === 'hack') && !list.length) o = { k: 'add', v: 50, l: '+50' };
    if (o.k === 'add' || o.k === 'mul' || o.k === 'lose') { S.bus.pub('p', 'gain', { pid: S.pid, k: o.k, v: o.v }); return cont(250); }
    if (o.k === 'none') return cont(200);
    targets(o.k === 'steal' ? 'Take ' + o.v * 100 + '% from…' : o.k === 'swap' ? 'Swap your total with…' : 'Hack who?', list, function (e) {
      if (o.k === 'hack') return guess(e);
      S.bus.pub('p', o.k, { pid: S.pid, to: e[0], pct: o.v }); L.sfx('coin'); cont(300);
    });
  }
  function targets(title, list, done) {
    var cur = L.mode(S.st.mode).cur;
    list = list.slice().sort(function (a, b) { return b[2] - a[2]; }).slice(0, 12);
    show('<div class="pw"><h2>' + esc(title) + '</h2><div class="tlist">' + list.map(function (e, i) { return '<button class="tg" data-i="' + i + '"><b>' + esc(e[1]) + '</b><span>' + L.fmtN(e[2]) + ' ' + cur + '</span></button>'; }).join('') + '</div></div>');
    view.querySelectorAll('.tg').forEach(function (b) { b.onclick = function () { done(list[+b.dataset.i]); }; });
  }
  function guess(e) {
    var opts = e[4] || L.PASSWORDS.slice(0, 3);
    show('<div class="pw"><h2>Hack ' + esc(e[1]) + '</h2><p style="color:rgba(255,255,255,.75)">Guess their password:</p><div class="tlist">' + opts.map(function (o) { return '<button class="tg pwg" data-v="' + esc(o) + '"><b>🔑 ' + esc(o) + '</b></button>'; }).join('') + '</div></div>');
    view.querySelectorAll('.pwg').forEach(function (b) {
      b.onclick = function () {
        show('<div class="wait"><div class="pulse hackp"></div><h2>Hacking…</h2></div>'); L.sfx('hack');
        S.bus.pub('p', 'hack', { pid: S.pid, to: e[0], guess: b.dataset.v });
        var done = false;
        S.hackWait = function (ev) {
          if (done || ev.b !== e[0]) return; done = true; S.hackWait = null;
          if (ev.ok) { L.sfx('win'); show('<div class="res good"><div class="big">Hacked!</div><div class="gain">+' + L.fmtN(ev.v) + ' ₿ from ' + esc(e[1]) + '</div></div>'); }
          else { L.sfx('bad'); show('<div class="res bad"><div class="big">Access denied</div><p>Wrong password. Keep mining!</p></div>'); }
          cont(1600);
        };
        setTimeout(function () { if (!done) { done = true; S.hackWait = null; vPlay(); } }, 6000);
      };
    });
  }
  function vPassword() {
    S.busy = true;
    var opts = L.shuffle(L.PASSWORDS).slice(0, 6);
    show('<div class="pw"><h2>💻 Choose your password</h2><p style="color:rgba(255,255,255,.75)">Others will try to guess it to hack you. Keep it secret!</p><div class="tlist two">' + opts.map(function (o) { return '<button class="tg pwp" data-v="' + o + '"><b>🔒 ' + o + '</b></button>'; }).join('') + '</div></div>');
    view.querySelectorAll('.pwp').forEach(function (b) { b.onclick = function () { S.pwSet = b.dataset.v; S.bus.pub('p', 'pw', { pid: S.pid, pw: S.pwSet }); L.sfx('ok'); vPlay(); }; });
  }
  var FISH = [['👢', 'an old boot', 0, 0, 8], ['🐟', 'a sardine', 1, 3, 30], ['🐠', 'a clownfish', 2, 6, 22], ['🐡', 'a pufferfish', 4, 9, 14], ['🦑', 'a squid', 6, 15, 10], ['🐙', 'an octopus', 10, 25, 7], ['🐬', 'a dolphin', 20, 40, 4], ['🦈', 'a shark', 30, 60, 3], ['🐋', 'a whale', 60, 120, 1.2], ['🧜', 'a golden mermaid', 100, 200, .3]];
  function cast() {
    var streak = S.race ? S.race.streak : 0, fz = S.st.fz && (S.st.fz - (Date.now() - S.st.at)) > 0;
    var w = FISH.map(function (f, i) { return f[4] * (i >= 4 ? 1 + Math.min(streak, 8) * .15 : 1); }), tot = w.reduce(function (a, b) { return a + b; }, 0), r = Math.random() * tot, i = 0;
    while (r > w[i]) { r -= w[i]; i++; }
    var f = FISH[Math.min(i, FISH.length - 1)], kg = f[2] + Math.round(Math.random() * (f[3] - f[2])); if (fz) kg *= 2;
    show('<div class="wait"><div class="cast">🎣</div><h2>Casting…</h2>' + (streak > 1 ? '<p>🔥 Streak ' + streak + ': better bait!</p>' : '') + '</div>'); L.sfx('splash');
    setTimeout(function () {
      L.sfx(kg ? (kg >= 30 ? 'win' : 'coin') : 'bad');
      show('<div class="res ' + (kg ? 'good' : 'bad') + '"><div class="fishbig">' + f[0] + '</div><div class="big">' + (kg ? 'You caught ' + f[1] + '!' : 'Just ' + f[1] + '…') + '</div><div class="gain">' + (kg ? '+' + kg + ' kg' + (fz ? ' (Frenzy ×2)' : '') : '0 kg') + '</div><p style="margin-top:16px"><button class="btn" id="nx">Cast again →</button></p></div>');
      S.bus.pub('p', 'gain', { pid: S.pid, k: 'add', v: kg, fish: f[1] });
      var t = setTimeout(vPlay, 2200); $('#nx').onclick = function () { clearTimeout(t); vPlay(); };
    }, 900);
  }
  function onEvent(e) {
    if (!e || !S.pid) return;
    if (e.a === S.pid && e.k === 'hack' && S.hackWait) return S.hackWait(e);
    if (e.b === S.pid && !e.quiet && e.t) { toast(e.k === 'hack' ? '🚨 ' + e.t : e.t, 'bad'); L.sfx('bad'); if (navigator.vibrate) navigator.vibrate([80, 50, 80]); return; }
    if (e.k === 'fz') { toast(e.t, 'gold'); L.sfx('win'); }
  }

  /* ---------- Team Match ---------- */
  function vMatch(prev) {
    var d = S.st, T = d.tm && d.tm[S.team];
    if (!T) return vWait('You will join a team in a moment.');
    var lt = T.last;
    if (lt && lt.seq !== S.seenLast) { S.seenLast = lt.seq; flash(lt.ok === 1); L.sfx(lt.ok ? 'ok' : 'bad'); }
    if (prev && prev.phase === 'match' && S.mSeq === T.seq && view.querySelector('.mt')) { var pe = $('#mprog'); if (pe) pe.innerHTML = dots(T.prog, d.goal); return; }
    S.mSeq = T.seq;
    var mine = (T.a || {})[S.pid] || [], col = L.HEX[S.team];
    show('<div class="pq mt"><div class="meta"><span class="teamtag" style="margin:0;padding:4px 12px;background:' + col + '">' + esc(d.teams[S.team]) + '</span><span id="mprog">' + dots(T.prog, d.goal) + '</span></div>' +
      (lt ? '<div class="mlast ' + (lt.ok ? 'ok' : 'no') + '">' + (lt.ok ? '✓ ' + esc(lt.by) + ' got it: “' + esc(lt.w) + '”' : '✗ Back to zero! The answer was “' + esc(lt.r) + '”') + '</div>' : '<div class="mlast">Only one teammate has the right answer. Talk!</div>') +
      '<div class="prompt">' + L.qhtml(T.p || '', esc) + '</div>' +
      (mine.length ? '<div class="opts long">' + mine.map(function (o, k) { return '<button class="opt o' + (k % 4) + '" data-v="' + esc(o) + '"><span class="sh">' + L.SHAPES[k % 4] + '</span>' + esc(o) + '</button>'; }).join('') + '</div>' : '<p style="color:rgba(255,255,255,.75)">Your teammates hold the answers this time. Help them choose!</p>') + '</div>');
    view.querySelectorAll('.opt').forEach(function (b) {
      b.onclick = function () {
        if (S.mSent === T.seq) return; S.mSent = T.seq;
        S.bus.pub('p', 'pick', { pid: S.pid, seq: T.seq, v: b.dataset.v });
        view.querySelectorAll('.opt').forEach(function (x) { x.classList.add(x === b ? 'pick' : 'dim'); });
      };
    });
  }
  function dots(n, g) { var h = ''; for (var i = 0; i < g; i++) h += '<i class="dot' + (i < n ? ' on' : '') + '"></i>'; return h; }

  function clock(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function vEnd() {
    var d = S.st, y = (d.you || {})[S.pid], tb = d.tboard || [];
    var team = S.team >= 0 && tb.length ? tb.filter(function (t) { return t[2] === S.team; })[0] : null;
    show('<div class="res good"><p>Game over</p><div class="big">' + (y ? ordinal(y[1]) + ' place' : 'Thanks for playing') + '</div>' +
      (y ? '<div class="gain">' + (L.mode(d.mode).power ? L.fmtN(y[0]) + ' ' + L.mode(d.mode).unit : y[0] + ' points') + '</div>' : '') +
      (team ? '<div class="rank">' + esc(d.teams[S.team]) + ' finished ' + ordinal(tb.indexOf(team) + 1) + (tb.indexOf(team) === 0 ? ' 🏆' : '') + '</div>' : '') +
      '<p style="margin-top:26px"><a class="btn ghost" href="/live/">Join another game</a></p></div>');
  }

  /* ---------- solo practice: General English, AI-written ---------- */
  var P = Object.assign({ level: 'B1', focus: 'mix', topic: '', count: 10 }, L.ls.get('live.practice') || {}), BANKS = null;
  function vPractice() {
    document.body.classList.add('light');
    show('<div class="join" style="max-width:560px;text-align:left"><h1 style="text-align:center;color:var(--navy)">Practise English</h1><p style="text-align:center;color:var(--muted)">Choose your level and a topic. AI writes new questions for you every time.</p><div id="pf"></div>' +
      '<button class="btn navy big" id="pgo" style="margin-top:20px">Start</button><div class="err" id="perr" style="color:var(--bad)"></div><p style="text-align:center;margin-top:16px"><button class="linkbtn" id="pback">← Join a class game instead</button></p></div>');
    var box = $('#pf'); box.innerHTML = L.genForm(P); L.genWire(box, P);
    $('#pback').onclick = function () { document.body.classList.remove('light'); vJoin(); };
    $('#pgo').onclick = startPractice;
  }
  async function startPractice() {
    L.ls.set('live.practice', P);
    var err = $('#perr'), go = $('#pgo'); go.disabled = true; err.style.color = 'var(--navy)'; err.textContent = '✨ Writing your questions…';
    var qs = null, note = '';
    try { qs = (await L.api('generate', { level: P.level, focus: P.focus, topic: P.topic, count: P.count })).qs; }
    catch (e) { note = e.status === 401 ? 'Sign in to your IF Academy account to get new AI questions every time. For now, here are questions from our course materials.' : e.code === 'quota' ? (e.free ? 'Free accounts get 6 AI rounds a day; full access gives unlimited practice (see My account). These questions come from our course materials.' : 'You have practised a lot today! These questions come from our course materials.') : 'AI is busy, so these questions come from our course materials.'; }
    if (!qs || !qs.length) {
      try { if (!BANKS) BANKS = (await (await fetch('/live/banks.json')).json()).banks; qs = L.general(Object.assign({}, P, { count: P.count }), BANKS); } catch (e) { qs = []; }
    }
    if (!qs.length) { go.disabled = false; err.style.color = ''; err.textContent = 'Could not load questions. Check your internet.'; return; }
    S.solo = { qs: qs, i: 0, score: 0, ok: 0, streak: 0, best: 0, note: note };
    soloQ();
  }
  function soloQ() {
    var R = S.solo, q = R.qs[R.i], long = L.isLong(q.o);
    document.body.classList.remove('light');
    show('<div class="pq"><div class="meta"><span>' + esc(L.genTitle(P)) + ' · ' + (R.i + 1) + ' / ' + R.qs.length + '</span><span class="score-chip">' + R.score + '</span></div>' +
      (R.note && R.i === 0 ? '<p style="font-size:14px;color:var(--gold)">' + esc(R.note) + '</p>' : '') +
      '<div class="prompt">' + L.qhtml(q.p, esc) + '</div>' +
      '<div class="opts' + (long ? ' long' : '') + '">' + q.o.map(function (o, k) { return '<button class="opt o' + k + '" data-k="' + k + '"><span class="sh">' + L.SHAPES[k] + '</span>' + esc(o) + '</button>'; }).join('') + '</div><div id="fb"></div></div>');
    view.querySelectorAll('.opt').forEach(function (b) {
      b.onclick = function () {
        if (R.done === R.i) return; R.done = R.i;
        var k = +b.dataset.k, ok = k === q.a;
        if (ok) { R.ok++; R.streak++; R.best = Math.max(R.best, R.streak); R.score += 100 + Math.min(R.streak - 1, 5) * 20; } else R.streak = 0;
        flash(ok);
        view.querySelectorAll('.opt').forEach(function (x) { var kk = +x.dataset.k; x.classList.add(kk === q.a ? 'pick' : 'dim'); });
        $('#fb').innerHTML = '<div style="text-align:center;padding:6px 4px"><b style="font-size:20px;color:' + (ok ? '#7fe0ae' : '#ff9d8a') + '">' + (ok ? 'Correct!' + (R.streak > 1 ? ' 🔥 ' + R.streak : '') : 'Answer: ' + esc(q.o[q.a])) + '</b>' + (q.x ? '<p style="margin-top:6px;color:rgba(255,255,255,.8)">' + esc(q.x) + '</p>' : '') + '<button class="btn" id="nx" style="margin-top:12px;width:100%">' + (R.i + 1 < R.qs.length ? 'Next →' : 'See my score') + '</button></div>';
        $('#nx').onclick = function () { R.i++; if (R.i < R.qs.length) soloQ(); else soloEnd(); };
      };
    });
  }
  function soloEnd() {
    var R = S.solo, pct = R.ok / R.qs.length;
    show('<div class="res good"><p>' + esc(L.genTitle(P)) + '</p><div class="big">' + R.ok + ' / ' + R.qs.length + '</div><div class="gain">' + R.score + ' points' + (R.best > 2 ? ' · best streak ' + R.best : '') + '</div>' +
      '<div class="rank">' + (pct >= .9 ? 'Excellent! Try the next level up.' : pct >= .7 ? 'Great work!' : pct >= .5 ? 'Good. Play again to beat your score.' : 'Keep practising. Try an easier level or a new topic.') + '</div>' +
      '<p style="margin-top:24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn" id="again">New questions</button><button class="btn ghost" id="change">Change level or topic</button></p></div>');
    $('#again').onclick = function () { show('<div class="wait"><div class="pulse"></div><h2>Writing new questions…</h2></div>'); vPractice(); startPractice(); };
    $('#change').onclick = vPractice;
  }
  if (/[?&]practice\b/.test(location.search)) { vPractice(); return; }

  if (S.pin && L.ls.get('live.p.' + S.pin) && L.ls.get('live.name')) { show('<div class="wait"><div class="pulse"></div><h2>Rejoining…</h2></div>'); vJoin().then(function () { join(S.pin, L.ls.get('live.name')); }); }
  else vJoin();
})();
