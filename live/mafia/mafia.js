/* Mafia Live (IF Academy): Mafia for the English class, played on phones.
   One device hosts (a projector, a laptop or a phone) and is the narrator; every player joins with the PIN.
   - Each phone holds its own secret role card (press and hold to look).
   - At night every phone gets a silent job at the same moment (the Mafia choose, the Doctor protects, the Sheriff
     investigates, everyone else whispers a suspicion), so nobody can tell who is doing what and no eyes need closing.
   - By day the phones show speaking phrases and a timer; votes are cast on the phones.
   - Players who are out become ghosts and choose the day's best speaker, whose vote counts double.
   Secrets: each phone makes its own key and gives it only to the host (players cannot listen on the players' channel),
   and the host encrypts everything private with it, so no phone can read another phone's card.
   The host device never shows secret information until the game ends, so the host can also play ("Play on this device").
   Role set: Mafia, Doctor, Sheriff, Cupid, Grandma, Vigilante, Magician, Informant, Bus Driver, Civilian. */
(function () {
  var L = window.LIVE, esc = L.esc, view = document.getElementById('view');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var Q = new URLSearchParams(location.search);
  var ROLES = {
    mafia: { n: 'Mafia', e: '🎩', team: 'mafia', txt: 'Every night, choose one player to remove. You can see what the other Mafia choose: agree on one name.', goal: 'Win when the Mafia are as many as the town.' },
    doctor: { n: 'Doctor', e: '🩺', team: 'town', txt: 'Every night, protect one player. You can protect yourself once, and never the same person two nights in a row.', goal: 'Help the town find all the Mafia.' },
    sheriff: { n: 'Sheriff', e: '⭐', team: 'town', txt: 'Every night, investigate one player. In the morning your phone tells you: Mafia or not Mafia.', goal: 'Find the Mafia, but be careful: if they learn who you are, you are next.' },
    cupid: { n: 'Cupid', e: '💘', team: 'town', txt: 'On the first night, choose two players to fall in love. If one of them leaves the game, the other leaves too.', goal: 'Help the town find all the Mafia.' },
    grandma: { n: 'Grandma', e: '👵', team: 'town', txt: 'You are tougher than you look. If the Mafia choose you at night, you stay and one of the Mafia leaves.', goal: 'Help the town find all the Mafia.' },
    vigilante: { n: 'Vigilante', e: '🎯', team: 'town', txt: 'Once in the game, you can remove one player at night. Choose carefully: the town will hear about a mistake.', goal: 'Help the town find all the Mafia.' },
    magician: { n: 'Magician', e: '🪄', team: 'town', txt: 'Once in the game, you can bring back a player who left the game the night before.', goal: 'Help the town find all the Mafia.' },
    informant: { n: 'Informant', e: '🕵️', team: 'mafia', txt: 'You secretly work for the Mafia and you know who they are. You do not choose victims. The Sheriff sees you as "not Mafia".', goal: 'Protect the Mafia. You win when they win.' },
    busdriver: { n: 'Bus Driver', e: '🚌', team: 'town', txt: 'Every night, choose two players to swap seats. Anything that happens to one of them tonight happens to the other.', goal: 'Help the town find all the Mafia.' },
    civilian: { n: 'Civilian', e: '🙂', team: 'town', txt: 'You have no special power, but you have the most important weapon: your voice. Listen, ask questions and vote.', goal: 'Help the town find all the Mafia.' }
  };
  var EXTRA = [['doctor', 4], ['sheriff', 4], ['grandma', 7], ['cupid', 8], ['informant', 9], ['vigilante', 10], ['magician', 11], ['busdriver', 12]];   // role, players needed for it to be on by default
  var PHRASES = {
    Accusing: ['I think it was you, because…', 'You were very quiet yesterday. Why?', 'Why did you vote for her so quickly?', 'Your story doesn’t make sense.', 'I’m sure you’re hiding something.'],
    Defending: ['It can’t be me. I’m a civilian!', 'Why would I do that?', 'That’s not true. Let me explain.', 'If I were Mafia, I wouldn’t…', 'Look at him, not me!'],
    Guessing: ['She must be the Mafia, because…', 'He might be the Doctor.', 'It can’t have been Ali. He was the first to…', 'They could be working together.', 'I’m not sure, but maybe…'],
    Voting: ['I vote for… because…', 'I agree with Dana.', 'I’m changing my vote.', 'Let’s give him one more chance.', 'I’m not voting for anyone yet.']
  };
  var MIN = 4, MAX = 24;
  var roleA = function (r) { return r === 'mafia' ? 'Mafia' : r === 'civilian' ? 'a Civilian' : 'the ' + ROLES[r].n; };
  var mafiaCount = function (n) { return n <= 6 ? 1 : n <= 10 ? 2 : n <= 14 ? 3 : 4; };
  var pickOne = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var clock = function (ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };

  /* ---- private messages: AES-GCM with the phone's own key ---- */
  var b64 = function (u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); };
  var unb = function (s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
  var newKey = function () { return b64(crypto.getRandomValues(new Uint8Array(16))); };
  var imp = function (k) { return crypto.subtle.importKey('raw', unb(k), 'AES-GCM', false, ['encrypt', 'decrypt']); };
  async function seal(ck, obj) { var iv = crypto.getRandomValues(new Uint8Array(12)); var c = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, ck, new TextEncoder().encode(JSON.stringify(obj))); return { iv: b64(iv), c: b64(new Uint8Array(c)) }; }
  async function unseal(ck, m) { return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb(m.iv) }, ck, unb(m.c)))); }

  /* ================= the phone ================= */
  function PlayerUI(root, send) {
    var pub = null, prv = null, sel = [], editing = false, lastTask = '', tick = null;
    function cardHTML(show) {
      var r = ROLES[prv.role]; if (!r) return '';
      return '<div class="mf-card' + (show ? ' show' : '') + '" data-hold><div class="b"><b>IF</b><span>Press and hold</span></div><div class="f"><div class="em">' + r.e + '</div><h2>' + r.n + '</h2><span class="tm' + (r.team === 'mafia' ? ' m' : '') + '">' + (r.team === 'mafia' ? 'Mafia team' : 'Town team') + '</span><p>' + esc(r.txt) + '</p>' +
        (prv.mates && prv.mates.length ? '<p class="mt">The Mafia: ' + esc(prv.mates.join(', ')) + '</p>' : '') + '</div></div>';
    }
    function notes() { return (prv.notes || []).map(function (n) { return '<div class="mf-note">' + esc(n) + '</div>'; }).join(''); }
    function taskHTML() {
      var t = prv.task; if (!t || !t.opts || prv.ph !== pub.ph || prv.n !== pub.n) return '<p class="mf-sub">…</p>';
      if (prv.done && !editing) return '<div class="mf-task"><h2>✓ Sent</h2><p>' + (pub.ph === 'night' ? 'Put your phone face down and wait for the morning.' : 'Wait for the others.') + '</p><button class="btn ghost sm" data-edit>Change my choice</button></div>';
      return '<div class="mf-task"><h2>' + esc(t.title) + '</h2>' + (t.hint ? '<p>' + esc(t.hint) + '</p>' : '') +
        (t.live && t.live.length ? t.live.map(function (x) { return '<div class="mf-live">' + esc(x) + '</div>'; }).join('') : '') +
        '<div class="mf-opts">' + t.opts.map(function (o) { return '<button data-o="' + esc(o.id) + '" class="' + (sel.indexOf(o.id) >= 0 ? 'sel' : '') + '">' + esc(o.name) + '</button>'; }).join('') +
        (t.skip ? '<button class="wide' + (sel[0] === 'skip' ? ' sel' : '') + '" data-o="skip">' + esc(t.skip) + '</button>' : '') + '</div>' +
        (t.say ? '<p style="color:var(--gold)">Say it aloud first: “' + esc(t.say) + '”</p>' : '') +
        '<button class="btn" data-go ' + (sel.length === (sel[0] === 'skip' ? 1 : t.n) ? '' : 'disabled style="opacity:.4"') + '>Confirm</button></div>';
    }
    function render() {
      clearInterval(tick);
      if (!pub) { root.innerHTML = '<div class="mf-c"><div class="pulse"></div><p class="mf-sub">Connecting to the game…</p></div>'; return; }
      var ph = pub.ph, me = prv || {}, h = '', peek = false;
      if (!root.dataset.embedded) document.body.classList.toggle('mf-night', ph === 'night');
      var key = ph + ':' + pub.n + ':' + (me.task ? me.task.k : ''); if (key !== lastTask) { lastTask = key; sel = []; editing = false; }
      if (ph === 'lobby' || !prv || !prv.role) {
        h = '<div class="mf-c"><p class="mf-eyebrow">Mafia Live</p><h1 class="mf-h1">' + (ph === 'lobby' ? 'You’re in' : 'Game in progress') + '</h1><p class="mf-sub">' + (ph === 'lobby' ? 'Wait for the host to start. ' + pub.players.length + ' player' + (pub.players.length === 1 ? '' : 's') + ' so far.' : 'You will get a card when the next game starts. Watch and listen for now.') + '</p>' +
          '<div class="mf-chips">' + pub.players.map(function (p) { return '<span class="mf-chip">' + esc(p.name) + '</span>'; }).join('') + '</div></div>';
      } else if (ph === 'roles') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Your secret card</p>' + cardHTML(false) + '<p class="mf-sub">Press and hold the card to look. Don’t let anyone see your screen.</p>' +
          (prv.done ? '<p class="mf-sub">✓ Ready. Waiting for the others…</p>' : '<button class="btn" data-ready>I know my role</button>') + '</div>';
      } else if (ph === 'end') {
        var won = pub.win === ROLES[prv.role].team;
        h = '<div class="mf-c"><div class="mf-ghost">' + (won ? '🏆' : '💀') + '</div><h1 class="mf-h1">' + (pub.win === 'mafia' ? 'The Mafia win' : 'The town wins') + '</h1><p class="mf-sub">You were ' + roleA(prv.role) + ' ' + ROLES[prv.role].e + '. ' + (won ? 'Your team won!' : 'Better luck next time.') + '</p>' +
          '<table class="mf-table">' + pub.players.map(function (p) { return '<tr><td>' + esc(p.name) + '</td><td>' + (p.role ? ROLES[p.role].e + ' ' + ROLES[p.role].n : '') + '</td></tr>'; }).join('') + '</table></div>';
      } else if (!prv.alive) {
        h = '<div class="mf-c"><div class="mf-ghost">👻</div><h1 class="mf-h1">You are a ghost</h1><p class="mf-sub">You left the town as ' + roleA(prv.role) + '. Ghosts can’t speak, but they listen.</p>' +
          (ph === 'vote' && prv.task ? taskHTML() : '<p class="mf-sub">' + (ph === 'day' ? 'Listen carefully: in the vote you will choose today’s best speaker.' : ph === 'night' ? 'The town is asleep…' : '') + '</p>') + '</div>';
      } else if (ph === 'night') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Night ' + pub.n + '</p>' + taskHTML() + '</div>'; peek = true;
      } else if (ph === 'day') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + pub.n + ' · discussion</p><div class="mf-timer" id="mfT"></div>' + notes() +
          '<div class="mf-box"><h3>Say it in English</h3><div class="mf-ph">' + Object.keys(PHRASES).map(function (k) { return '<b>' + k + '</b>' + LIVE.shuffle(PHRASES[k]).slice(0, 2).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join(''); }).join('') + '</div></div></div>'; peek = true;
      } else if (ph === 'vote') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + pub.n + ' · the vote</p>' + taskHTML() + '</div>'; peek = true;
      } else if (ph === 'result') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + pub.n + '</p>' + (pub.story || []).map(function (s) { return '<p class="mf-story">' + esc(s) + '</p>'; }).join('') + notes() + '<p class="mf-sub">Night is coming…</p></div>'; peek = true;
      }
      root.innerHTML = h + (peek ? '<button class="mf-peek" data-hold>🎴 Hold to see my card</button>' : '');
      if (ph === 'day') { var T = $('#mfT', root), up = function () { if (T) T.textContent = clock(pub.t - Date.now()); }; up(); tick = setInterval(up, 500); }
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !prv) return;
      if (b.dataset.ready != null) { send('ready', 1); prv.done = true; render(); return; }
      if (b.dataset.edit != null) { editing = true; sel = []; render(); return; }
      if (b.dataset.o != null) {
        var id = b.dataset.o, n = prv.task.n;
        if (id === 'skip') sel = ['skip']; else { if (sel[0] === 'skip') sel = []; var i = sel.indexOf(id); if (i >= 0) sel.splice(i, 1); else { sel.push(id); if (sel.length > n) sel.shift(); } }
        if (prv.task.k === 'kill' && sel.length === 1) send('act', { k: 'kill', v: sel.slice(), soft: 1 });   // partners see the choice at once
        render(); return;
      }
      if (b.dataset.go != null && !b.disabled) { send('act', { k: prv.task.k, v: sel.slice() }); prv.done = true; editing = false; L.sfx('ok'); render(); }
    });
    // press and hold to see the card
    var over = null;
    var hold = function (e) { var t = e.target.closest('[data-hold]'); if (!t || !prv || !prv.role) return; e.preventDefault(); if (t.classList.contains('mf-card')) { t.classList.add('show'); return; } over = document.createElement('div'); over.className = 'mf-over'; over.innerHTML = cardHTML(true); document.body.appendChild(over); };
    var drop = function () { if (over) { over.remove(); over = null; } var c = $('.mf-card.show', root); if (c) c.classList.remove('show'); };
    root.addEventListener('pointerdown', hold); ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) { window.addEventListener(ev, drop); });
    root.addEventListener('contextmenu', function (e) { if (e.target.closest('[data-hold]')) e.preventDefault(); });
    render();
    return { pub: function (p) { pub = p; render(); }, prv: function (v) { if (prv && v.s < prv.s) return; prv = v; render(); } };
  }

  async function playerPage() {
    var saved = L.ls.get('mafia.me') || {}, pin = (Q.get('pin') || '').replace(/\D/g, '');
    if (!(saved.pin === pin && pin && saved.name)) return joinForm(pin, saved.name || '');
    play(pin, saved);
  }
  function joinForm(pin, name, err) {
    view.innerHTML = '<div class="mf-c" style="max-width:420px;margin:0 auto"><p class="mf-eyebrow">IF Live</p><h1 class="mf-h1">Mafia</h1><p class="mf-sub">Enter the game PIN from the host’s screen and your first name.</p>' +
      '<input class="mf-inp" id="pin" inputmode="numeric" maxlength="6" placeholder="Game PIN" value="' + esc(pin) + '"><input class="mf-inp" id="nm" maxlength="16" placeholder="Your name" value="' + esc(name) + '" autocomplete="given-name">' +
      (err ? '<p style="color:#ff9d94">' + esc(err) + '</p>' : '') + '<button class="btn" id="go" style="width:100%;margin-top:8px">Join the game</button>' +
      '<p class="mf-sub" style="margin-top:22px">Want to start a game?</p><a class="btn ghost" href="?host=1">Host a game</a></div>';
    $('#go').onclick = function () {
      var p = $('#pin').value.replace(/\D/g, ''), n = $('#nm').value.trim().slice(0, 16);
      if (p.length !== 6 || !n) return joinForm(p, n, 'Enter the 6-digit PIN and your name.');
      var old = L.ls.get('mafia.me') || {}, me = old.pin === p ? old : { pin: p, key: newKey() }; me.name = n; L.ls.set('mafia.me', me);
      history.replaceState(null, '', '?pin=' + p + (L.local ? '&bus=local' : '')); play(p, me);
    };
  }
  async function play(pin, me) {
    view.innerHTML = '';
    var r;
    try { r = L.local ? { pid: me.pid || 'p-' + Math.random().toString(36).slice(2, 10), token: null } : await L.api('join', { pin: pin, pid: me.pid }); }
    catch (e) { L.ls.set('mafia.me', null); return joinForm(pin, me.name, e.code === 'room' ? 'No game with this PIN. Check the number.' : 'Could not join. Try again.'); }
    me.pid = r.pid; if (!me.key) me.key = newKey(); L.ls.set('mafia.me', me);
    var ck = await imp(me.key), first = r.token;
    var bus = await L.connect({ pin: pin, clientId: me.pid, token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('join', { pin: pin, pid: me.pid })).token; } });
    var ui = PlayerUI(view, function (kind, v) { bus.pub('p', kind, { pid: me.pid, v: v }); });
    var hi = function () { bus.pub('p', 'hi', { pid: me.pid, name: me.name, key: me.key }); };
    bus.sub('h', async function (name, d) {
      if (name === 'pub') { ui.pub(d); if (!d.players.some(function (p) { return p.id === me.pid; })) hi(); }
      else if (name === 'prv' && d.to === me.pid) { try { ui.prv(await unseal(ck, d)); } catch (e) {} }
      else if (name === 'who') hi();
    });
    bus.onState(function (s) { if (s === 'connected') hi(); });
    hi(); setTimeout(hi, 1500);
    $('#pinpill').hidden = false; $('#pinpill').textContent = 'PIN ' + pin + ' · ' + me.name;
  }

  /* ================= the host (narrator) ================= */
  var G = null, bus = null, localUI = null, auto = null, htick = null, voiceOn = L.ls.get('mafia.voice') !== false;
  var P = function (id) { return G.players.filter(function (p) { return p.id === id; })[0]; };
  var alive = function () { return G.players.filter(function (p) { return p.alive; }); };
  var nm = function (id) { var p = P(id); return p ? p.name : '?'; };
  var saveG = function () { G.at = Date.now(); L.ls.set('mafia.host', G); };
  function say(text) {
    if (!voiceOn || !window.speechSynthesis) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(text), vs = speechSynthesis.getVoices(); u.lang = 'en-GB'; u.rate = .92; u.pitch = .9;
      u.voice = vs.filter(function (v) { return /en-GB/i.test(v.lang); })[0] || vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || null; speechSynthesis.speak(u); } catch (e) {}
  }
  function deck(n) {
    var m = mafiaCount(n), d = [], room = n - m, i;
    for (i = 0; i < m; i++) d.push('mafia');
    EXTRA.forEach(function (x) { var on = G.opt.roles[x[0]] != null ? G.opt.roles[x[0]] : n >= x[1]; if (on && room > 1) { d.push(x[0]); room--; } });
    while (d.length < n) d.push('civilian');
    return d;
  }
  var deckText = function (n) { var c = {}; deck(n).forEach(function (r) { c[r] = (c[r] || 0) + 1; }); return Object.keys(c).map(function (r) { return (c[r] > 1 ? c[r] + ' × ' : '') + ROLES[r].n; }).join(' · '); };

  function pubState() {
    var need = 0, done = 0;
    if (G.ph === 'roles') { need = G.players.filter(function (p) { return p.role; }).length; done = G.players.filter(function (p) { return p.ready; }).length; }
    if (G.ph === 'night') { need = alive().length; done = alive().filter(function (p) { return G.acts[p.id] && !G.acts[p.id].soft; }).length; }
    if (G.ph === 'vote') { need = alive().length; done = alive().filter(function (p) { return G.votes[p.id]; }).length; }
    return { ph: G.ph, n: G.n, t: G.t, story: G.story, rumour: G.rumour, win: G.win, need: need, done: done,
      players: G.players.map(function (p) { return { id: p.id, name: p.name, alive: p.alive, role: (G.ph === 'end' || (!p.alive && p.role)) ? p.role : undefined }; }) };
  }
  function nightTask(p) {
    var others = alive().filter(function (x) { return x.id !== p.id; }), all = alive(), o = function (a) { return a.map(function (x) { return { id: x.id, name: x.name }; }); };
    switch (p.role) {
      case 'mafia':
        var mates = alive().filter(function (x) { return x.role === 'mafia' && x.id !== p.id; });
        return { k: 'kill', title: 'Choose tonight’s victim', hint: mates.length ? 'Agree with your partners. You can see their choices below.' : 'You are working alone tonight. Choose well.', n: 1, opts: o(all.filter(function (x) { return x.role !== 'mafia'; })),
          live: mates.map(function (m) { var a = G.acts[m.id]; return m.name + (a ? ' chose ' + nm(a.v[0]) + (a.soft ? '…' : ' ✓') : ' is thinking…'); }) };
      case 'doctor': return { k: 'save', title: 'Who will you protect tonight?', hint: G.selfSaved ? 'You have already protected yourself once.' : 'You can protect yourself once in the game.', n: 1, opts: o(all.filter(function (x) { return x.id !== G.lastSave && !(x.id === p.id && G.selfSaved); })) };
      case 'sheriff': return { k: 'check', title: 'Who do you want to investigate?', hint: 'You will get the answer in the morning.', n: 1, opts: o(others) };
      case 'cupid': if (G.n === 1) return { k: 'love', title: 'Choose two players to fall in love', hint: 'If one leaves the game, the other leaves too. You can choose yourself.', n: 2, opts: o(all) }; break;
      case 'vigilante': if (!G.used.vig) return { k: 'shoot', title: 'Use your one shot tonight?', hint: 'You can do this only once in the game.', n: 1, opts: o(others), skip: 'Not tonight' }; break;
      case 'magician': var back = G.lastDead.map(P).filter(function (x) { return x && !x.alive; }); if (!G.used.mag && back.length) return { k: 'revive', title: 'Bring one player back?', hint: 'You can do this only once in the game.', n: 1, opts: o(back), skip: 'Not tonight' }; break;
      case 'busdriver': if (all.length >= 3) return { k: 'swap', title: 'Choose two players to swap seats', hint: 'What happens to one of them tonight happens to the other.', n: 2, opts: o(all) }; break;
    }
    return { k: 'hunch', title: 'Who do you suspect?', hint: 'Your answer is anonymous. The town will hear the rumours in the morning.', n: 1, opts: o(others) };
  }
  function privFor(p) {
    var v = { s: ++G.seq, ph: G.ph, n: G.n, role: p.role, alive: p.alive, notes: (G.notes[p.id] || []).slice(-3), mates: [], task: null, done: false };
    if (p.role === 'mafia' || p.role === 'informant') v.mates = G.players.filter(function (x) { return x.role === 'mafia' && x.id !== p.id; }).map(function (x) { return x.name; }).concat(p.role === 'mafia' ? ['you'] : []);
    if (G.ph === 'roles') { v.task = { k: 'ready' }; v.done = !!p.ready; }
    else if (G.ph === 'night' && p.alive) { v.task = nightTask(p); v.done = !!(G.acts[p.id] && !G.acts[p.id].soft); }
    else if (G.ph === 'vote' && p.role) {
      var a = alive().filter(function (x) { return x.id !== p.id; }).map(function (x) { return { id: x.id, name: x.name }; });
      if (p.alive) { v.task = { k: 'vote', title: 'Who should leave the town?', hint: 'The player with the most votes leaves. A tie means nobody leaves.', n: 1, opts: a, skip: 'I’m not voting for anyone', say: 'I vote for … because …' }; v.done = !!G.votes[p.id]; }
      else { v.task = { k: 'best', title: 'Who spoke the best English today?', hint: 'The ghosts’ favourite speaker gets a double vote.', n: 1, opts: a }; v.done = !!G.best[p.id]; }
    }
    return v;
  }
  async function sendPriv(p) {
    var v = privFor(p);
    if (p.local) { if (localUI) localUI.prv(v); return; }
    if (!p.k) return;
    try { p.ck = p.ck || imp(p.k); var m = await seal(await p.ck, v); m.to = p.id; bus.pub('h', 'prv', m); } catch (e) { console.warn('seal', e); }
  }
  function sync(only) {                       // tell everyone where the game is
    saveG();
    (only ? [only] : G.players).forEach(sendPriv);
    var ps = pubState(); setTimeout(function () { bus.pub('h', 'pub', ps); }, 60); if (localUI) localUI.pub(ps);   // the public state goes last: it is what a phone gets when it reconnects
    hostRender();
  }

  function onMsg(name, d, from) {
    if (!d) return; var pid = L.local || !from || /^host-/.test(from) ? d.pid : from, p = P(pid);
    if (name === 'hi') {
      if (!p) {
        if (G.players.length >= MAX) return;
        var base = String(d.name || 'Player').replace(/\s+/g, ' ').trim().slice(0, 16) || 'Player', n2 = base, i = 2; while (G.players.some(function (x) { return x.name.toLowerCase() === n2.toLowerCase(); })) n2 = base + ' ' + i++;
        p = { id: pid, name: n2, k: d.key, role: null, alive: false, ready: false, local: !!d.local }; G.players.push(p); L.sfx('coin');
      } else if (d.key && d.key !== p.k) { p.k = d.key; p.ck = null; }
      sync(G.ph === 'lobby' ? null : p); return;
    }
    if (!p) return;
    if (name === 'ready' && G.ph === 'roles') { p.ready = true; sync(p); if (G.players.every(function (x) { return !x.role || x.ready; })) later(startNight, 1500); return; }
    if (name === 'act') {
      var a = d.v || {}, v = Array.isArray(a.v) ? a.v.map(String).slice(0, 2) : [];
      if (G.ph === 'night' && p.alive) {
        var t = nightTask(p); if (a.k !== t.k) return;
        var ok = v[0] === 'skip' ? !!t.skip : v.length === t.n && v.every(function (id) { return t.opts.some(function (o) { return o.id === id; }); }) && (t.n === 1 || v[0] !== v[1]);
        if (!ok) return;
        G.acts[p.id] = { k: a.k, v: v, soft: a.soft ? 1 : 0 };
        if (p.role === 'mafia') G.players.filter(function (x) { return x.role === 'mafia' && x.alive; }).forEach(sendPriv); else sendPriv(p);
        saveG(); pubOnly();
        if (alive().every(function (x) { return G.acts[x.id] && !G.acts[x.id].soft; })) later(endNight, 2500);
      } else if (G.ph === 'vote' && p.role) {
        var id = v[0], valid = id === 'skip' ? p.alive : !!(P(id) && P(id).alive && id !== p.id); if (!valid) return;
        if (p.alive) G.votes[p.id] = id; else G.best[p.id] = id;
        sendPriv(p); saveG(); pubOnly();
        if (alive().every(function (x) { return G.votes[x.id]; })) later(endVote, 2500);
      }
    }
  }
  function pubOnly() { var ps = pubState(); bus.pub('h', 'pub', ps); if (localUI) localUI.pub(ps); hostRender(); }
  function later(fn, ms) { clearTimeout(auto); auto = setTimeout(fn, ms); }

  function startGame() {
    var ps = G.players, d = L.shuffle(deck(ps.length));
    ps.forEach(function (p, i) { p.role = d[i]; p.alive = true; p.ready = false; });
    G.ph = 'roles'; G.n = 0; G.story = []; G.rumour = ''; G.win = null; G.acts = {}; G.votes = {}; G.best = {}; G.notes = {}; G.lovers = []; G.used = {}; G.lastSave = null; G.selfSaved = false; G.lastDead = []; G.stars = {};
    say('Welcome to the town. Look at your phone. Press and hold your card to see your secret role.'); sync();
  }
  function startNight() {
    clearTimeout(auto); if (G.ph === 'night') return;
    G.ph = 'night'; G.n++; G.acts = {}; G.votes = {}; G.best = {}; G.story = []; G.rumour = ''; G.t = Date.now() + 90000;
    say('Night ' + G.n + '. The town goes to sleep. Everyone, look at your phone and make your choice quietly.'); sync();
  }
  function kill(id, out) {                     // remove a player; a lover follows
    var p = P(id); if (!p || !p.alive) return; p.alive = false; out.push(id);
    if (G.lovers.indexOf(id) >= 0) { var o = P(G.lovers[0] === id ? G.lovers[1] : G.lovers[0]); if (o && o.alive) { o.alive = false; out.push(o.id); G.story.push(o.name + ' could not live without ' + p.name + ', and has left the town with a broken heart. ' + o.name + ' was ' + roleA(o.role) + '.'); } }
  }
  function note(id, text) { (G.notes[id] = G.notes[id] || []).push(text); }
  function endNight() {
    clearTimeout(auto); if (G.ph !== 'night') return;
    var awake = alive(), by = function (k) { return awake.filter(function (p) { return G.acts[p.id] && G.acts[p.id].k === k && G.acts[p.id].v[0] !== 'skip'; }); };
    var sw = by('swap')[0], A = sw ? G.acts[sw.id].v : null, rd = function (x) { return A ? (x === A[0] ? A[1] : x === A[1] ? A[0] : x) : x; };
    var out = [], S = G.story = [], doc = by('save')[0], saved = doc ? rd(G.acts[doc.id].v[0]) : null;
    if (doc) { G.lastSave = G.acts[doc.id].v[0]; if (G.lastSave === doc.id) G.selfSaved = true; } else G.lastSave = null;
    var cu = by('love')[0]; if (cu) { G.lovers = G.acts[cu.id].v.slice(); G.lovers.forEach(function (id, i) { note(id, '💘 You are in love with ' + nm(G.lovers[1 - i]) + '. If ' + nm(G.lovers[1 - i]) + ' leaves the game, you leave too.'); }); }
    // the Mafia's choice: most votes, a tie is broken by chance
    var tally = {}, top = 0, kt = null; by('kill').forEach(function (m) { var t = G.acts[m.id].v[0]; tally[t] = (tally[t] || 0) + 1; top = Math.max(top, tally[t]); });
    var tied = Object.keys(tally).filter(function (t) { return tally[t] === top; }); if (tied.length) kt = rd(pickOne(tied));
    S.push('The sun rises over the town.');
    if (kt && P(kt)) {
      var v = P(kt);
      if (v.role === 'grandma') { var mf = pickOne(alive().filter(function (x) { return x.role === 'mafia'; })); kill(mf.id, out); S.push('The Mafia knocked on the wrong door. Grandma was ready for them, and ' + mf.name + ' has left the town. ' + mf.name + ' was Mafia.'); }
      else if (kt === saved) S.push('The Mafia came in the night, but the Doctor was there first. Nobody was hurt.');
      else { kill(kt, out); S.splice(1, 0, v.name + ' is not at breakfast. ' + v.name + ' has left the town, and was ' + roleA(v.role) + '.'); }
    } else S.push('It was a quiet night.');
    var vg = by('shoot')[0];
    if (vg) { G.used.vig = true; var st = rd(G.acts[vg.id].v[0]), sp = P(st);
      if (sp && sp.alive) { if (st === saved) S.push('A shot rang out in the dark, but the Doctor saved the target.'); else { kill(st, out); S.push('A shot rang out in the dark. ' + sp.name + ' has left the town, and was ' + roleA(sp.role) + '.' + (ROLES[sp.role].team === 'town' ? ' The Vigilante made a terrible mistake.' : '')); } } }
    var sh = by('check')[0]; if (sh) { var c = P(rd(G.acts[sh.id].v[0])); note(sh.id, '⭐ Night ' + G.n + ': you investigated ' + nm(G.acts[sh.id].v[0]) + '. Result: ' + (c && c.role === 'mafia' ? 'MAFIA.' : 'not Mafia.')); }
    var mg = by('revive')[0]; if (mg) { var b = P(G.acts[mg.id].v[0]); if (b && !b.alive) { b.alive = true; G.used.mag = true; S.push('A puff of smoke… ' + b.name + ' is back in the game!'); } }
    var hz = {}, ht = 0; by('hunch').forEach(function (p) { var t = G.acts[p.id].v[0]; hz[t] = (hz[t] || 0) + 1; ht = Math.max(ht, hz[t]); });
    var hn = Object.keys(hz).filter(function (t) { return hz[t] === ht && P(t) && P(t).alive; });
    G.rumour = hn.length ? 'Town rumours: ' + (ht === 1 ? 'someone' : ht + ' people') + ' dreamt that ' + hn.map(nm).join(' and ') + ' ' + (hn.length > 1 ? 'are' : 'is') + ' hiding something.' : '';
    G.lastDead = out.slice(); G.acts = {};
    if (!win()) { G.ph = 'day'; G.t = Date.now() + G.opt.mins * 60000; S.push('You have ' + G.opt.mins + ' minutes to talk. Who is the Mafia?'); }
    say(S.join(' ') + (G.rumour && G.ph === 'day' ? ' ' + G.rumour : '')); sync();
  }
  function startVote() { clearTimeout(auto); if (G.ph !== 'day') return; G.ph = 'vote'; G.votes = {}; G.best = {}; say('Time is up. Vote on your phone. Say your reason aloud before you confirm.'); sync(); }
  function endVote() {
    clearTimeout(auto); if (G.ph !== 'vote') return;
    var S = G.story = [], bt = {}, bm = 0; Object.keys(G.best).forEach(function (g) { var t = G.best[g]; bt[t] = (bt[t] || 0) + 1; bm = Math.max(bm, bt[t]); });
    var gold = Object.keys(bt).filter(function (t) { return bt[t] === bm; }); gold = gold.length === 1 ? gold[0] : null;
    if (gold) { G.stars[gold] = (G.stars[gold] || 0) + 1; S.push('The ghosts chose ' + nm(gold) + ' as today’s best speaker. ' + nm(gold) + '’s vote counts double.'); }
    var tl = {}, mx = 0; alive().forEach(function (p) { var t = G.votes[p.id]; if (!t || t === 'skip') return; tl[t] = (tl[t] || 0) + (p.id === gold ? 2 : 1); mx = Math.max(mx, tl[t]); });
    var topv = Object.keys(tl).filter(function (t) { return tl[t] === mx; }), out = [];
    G.tally = Object.keys(tl).map(function (t) { return [nm(t), tl[t]]; }).sort(function (a, b) { return b[1] - a[1]; });
    if (topv.length === 1) { var v = P(topv[0]); S.push('The town has decided. ' + v.name + ' leaves the town with ' + mx + ' vote' + (mx === 1 ? '' : 's') + '. ' + v.name + ' was ' + roleA(v.role) + '.'); kill(v.id, out); }
    else S.push(topv.length ? 'The vote is tied. Nobody leaves the town today.' : 'Nobody voted. Nobody leaves the town today.');
    if (!win()) G.ph = 'result';
    say(S.join(' ')); sync();
  }
  function win() {
    var a = alive(), m = a.filter(function (p) { return p.role === 'mafia'; }).length, side = a.filter(function (p) { return ROLES[p.role].team === 'mafia'; }).length, town = a.length - side;
    var w = m === 0 ? 'town' : side >= town ? 'mafia' : null;
    if (w) { G.win = w; G.ph = 'end'; G.story.push(w === 'town' ? 'The last of the Mafia is gone. The town is safe!' : 'The Mafia now control the town. The Mafia win!'); L.sfx('win'); }
    return w;
  }

  function hostRender() {
    clearInterval(htick); if (!G) return;
    var ph = G.ph, ps = pubState(), h = '', n = G.players.length, joinUrl = location.origin + '/live/mafia/?pin=' + G.pin + (L.local ? '&bus=local' : '');
    document.body.classList.toggle('mf-night', ph === 'night');
    var chips = function (f) { return '<div class="mf-chips">' + G.players.filter(function (p) { return ph === 'lobby' || p.role; }).map(function (p) { return '<span class="mf-chip' + (ph !== 'lobby' && !p.alive ? ' out' : '') + (f && f(p) ? ' ok' : '') + '">' + esc(p.name) + (ph !== 'lobby' && !p.alive && p.role ? '<small>' + ROLES[p.role].n + '</small>' : '') + '</span>'; }).join('') + '</div>'; };
    var story = function () { return (G.story || []).map(function (s) { return '<p class="mf-story">' + esc(s) + '</p>'; }).join(''); };
    var mineBtn = G.players.some(function (p) { return p.local; }) ? '<button class="btn ghost" id="mineBtn">🎴 My phone view</button>' : '';
    if (ph === 'lobby') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Mafia Live · join at intellectfirst.com/live/mafia</p><div class="mf-join"><div><div class="mf-pin">' + G.pin + '</div><p class="mf-sub">Game PIN</p></div><div class="mf-qr">' + L.qr(joinUrl) + '</div></div>' +
        (n ? chips() : '<p class="mf-sub">Waiting for players to join…</p>') +
        '<div class="mf-box"><h3>The cards for ' + Math.max(n, MIN) + ' players</h3><p class="mf-sub" style="margin:0 0 10px;text-align:left">' + esc(deckText(Math.max(n, MIN))) + '</p><div class="mf-tog" id="roles">' +
        EXTRA.map(function (x) { var on = G.opt.roles[x[0]] != null ? G.opt.roles[x[0]] : Math.max(n, MIN) >= x[1]; return '<button data-r="' + x[0] + '" class="' + (on ? 'on' : '') + '">' + ROLES[x[0]].e + ' ' + ROLES[x[0]].n + '</button>'; }).join('') + '</div>' +
        '<h3 style="margin-top:14px">Discussion time</h3><div class="mf-tog" id="mins">' + [2, 3, 4, 5].map(function (m) { return '<button data-m="' + m + '" class="' + (G.opt.mins === m ? 'on' : '') + '">' + m + ' min</button>'; }).join('') + '</div></div>' +
        '<div class="mf-row">' + (G.players.some(function (p) { return p.local; }) ? '' : '<button class="btn ghost" id="playToo">🎴 Play on this device too</button>') + mineBtn + '<button class="btn" id="start" ' + (n >= MIN ? '' : 'disabled style="opacity:.4"') + '>' + (n >= MIN ? 'Deal the cards (' + n + ' players)' : 'Need ' + (MIN - n) + ' more player' + (MIN - n === 1 ? '' : 's')) + '</button></div>' +
        '<p class="mf-small">The host’s screen never shows secret roles, so the host can play too. Best with 6 or more players.</p></div>';
    } else if (ph === 'roles') {
      h = '<div class="mf-c"><p class="mf-eyebrow">The cards are dealt</p><h1 class="mf-h1">Look at your phone</h1><p class="mf-sub">Press and hold your card to see your secret role. Don’t show anyone.</p>' + chips(function (p) { return p.ready; }) +
        '<p class="mf-sub">' + ps.done + ' of ' + ps.need + ' ready</p><div class="mf-row">' + mineBtn + '<button class="btn" id="next">Begin Night 1</button></div></div>';
    } else if (ph === 'night') {
      h = '<div class="mf-c"><div class="mf-moon">🌙</div><h1 class="mf-h1">Night ' + G.n + '</h1><p class="mf-sub">The town is asleep. Everyone has a job on their phone. Choose quietly, then put your phone face down.</p><p class="mf-sub">' + ps.done + ' of ' + ps.need + ' done</p>' +
        '<div class="mf-row">' + mineBtn + '<button class="btn ghost" id="next">Wake the town</button></div></div>';
    } else if (ph === 'day') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + G.n + '</p>' + story() + (G.rumour ? '<p class="mf-rum">' + esc(G.rumour) + '</p>' : '') + '<div class="mf-timer" id="hT"></div>' + chips() +
        '<div class="mf-row">' + mineBtn + '<button class="btn ghost" id="more">+1 minute</button><button class="btn" id="next">Start the vote</button></div></div>';
    } else if (ph === 'vote') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + G.n + '</p><h1 class="mf-h1">Vote on your phone</h1><p class="mf-sub">Say your reason aloud: “I vote for … because …”. Ghosts choose today’s best speaker.</p>' + chips(function (p) { return p.alive && G.votes[p.id]; }) +
        '<p class="mf-sub">' + ps.done + ' of ' + ps.need + ' votes</p><div class="mf-row">' + mineBtn + '<button class="btn ghost" id="next">Close the vote</button></div></div>';
    } else if (ph === 'result') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + G.n + ' · the vote</p>' + story() + (G.tally && G.tally.length ? '<p class="mf-sub">' + G.tally.map(function (t) { return esc(t[0]) + ' ' + t[1]; }).join(' · ') + '</p>' : '') + chips() + '<div class="mf-row">' + mineBtn + '<button class="btn" id="next">Night ' + (G.n + 1) + '</button></div></div>';
    } else if (ph === 'end') {
      var stars = Object.keys(G.stars || {}).sort(function (a, b) { return G.stars[b] - G.stars[a]; });
      h = '<div class="mf-c"><div class="mf-moon">' + (G.win === 'town' ? '🏡' : '🎩') + '</div><h1 class="mf-h1">' + (G.win === 'town' ? 'The town wins' : 'The Mafia win') + '</h1>' + story() +
        '<div class="mf-box"><h3>Who was who</h3><table class="mf-table">' + G.players.filter(function (p) { return p.role; }).map(function (p) { return '<tr><td>' + esc(p.name) + (p.alive ? '' : ' 👻') + '</td><td>' + ROLES[p.role].e + ' ' + ROLES[p.role].n + '</td></tr>'; }).join('') + '</table>' +
        (stars.length ? '<h3 style="margin-top:12px">Best speakers</h3><p class="mf-sub" style="text-align:left;margin:0">' + stars.map(function (id) { return esc(nm(id)) + ' ★' + G.stars[id]; }).join(' · ') + '</p>' : '') + '</div>' +
        '<div class="mf-row">' + mineBtn + '<button class="btn" id="again">Play again with the same players</button></div></div>';
    }
    view.innerHTML = h;
    var on = function (id, fn) { var b = $('#' + id); if (b) b.onclick = fn; };
    on('start', startGame); on('again', function () { G.ph = 'lobby'; G.players.forEach(function (p) { p.role = null; p.alive = false; p.ready = false; }); G.story = []; sync(); });
    on('next', function () { ({ roles: startNight, night: endNight, day: startVote, vote: endVote, result: startNight })[G.ph](); });
    on('more', function () { G.t += 60000; sync(); });
    on('playToo', function () { var name = (prompt('Your first name') || '').trim(); if (name) joinLocal(name); });
    on('mineBtn', function () { $('#mine').hidden = false; });
    var rb = $('#roles'); if (rb) rb.onclick = function (e) { var b = e.target.closest('[data-r]'); if (!b) return; var r = b.dataset.r, cur = G.opt.roles[r] != null ? G.opt.roles[r] : Math.max(n, MIN) >= EXTRA.filter(function (x) { return x[0] === r; })[0][1]; G.opt.roles[r] = !cur; saveG(); hostRender(); };
    var mb = $('#mins'); if (mb) mb.onclick = function (e) { var b = e.target.closest('[data-m]'); if (!b) return; G.opt.mins = +b.dataset.m; saveG(); hostRender(); };
    if (ph === 'day') { var T = $('#hT'), up = function () { var left = G.t - Date.now(); if (T) T.textContent = clock(left); if (left <= 0) { clearInterval(htick); startVote(); } }; up(); htick = setInterval(up, 500); }
  }
  function joinLocal(name) {                   // the host plays on the same device
    var box = $('#mine'); box.innerHTML = '<button class="btn ghost sm x" id="mineX">✕ Back to the narrator screen</button><div id="mineV" data-embedded="1" style="max-width:520px;margin:44px auto 0"></div>';
    $('#mineX').onclick = function () { box.hidden = true; };
    var me = G.players.filter(function (p) { return p.local; })[0], id = me ? me.id : 'p-host' + Math.random().toString(36).slice(2, 8);
    localUI = PlayerUI($('#mineV'), function (kind, v) { onMsg(kind, { pid: id, v: v }, null); });
    if (me) sync(me); else onMsg('hi', { pid: id, name: name, local: 1 }, null);
  }

  async function hostPage() {
    $('#snd').hidden = false; $('#snd').textContent = voiceOn ? '🔊' : '🔇';
    $('#snd').onclick = function () { voiceOn = !voiceOn; L.ls.set('mafia.voice', voiceOn); this.textContent = voiceOn ? '🔊' : '🔇'; if (!voiceOn && window.speechSynthesis) speechSynthesis.cancel(); };
    var old = L.ls.get('mafia.host'), resume = old && old.pin && Date.now() - old.at < 3 * 3600e3 && old.ph !== 'end';
    view.innerHTML = '<div class="mf-c" style="max-width:520px;margin:0 auto"><p class="mf-eyebrow">IF Live</p><h1 class="mf-h1">Host Mafia</h1><p class="mf-sub">This screen is the narrator. Put it on the projector, or just hold your phone. Players join with a PIN and get their secret card on their own phone.</p>' +
      '<button class="btn" id="new" style="width:100%">Start a new game</button>' + (resume ? '<button class="btn ghost" id="res" style="width:100%;margin-top:10px">Continue game ' + old.pin + ' (' + old.players.length + ' players)</button>' : '') +
      '<p id="herr" style="color:#ff9d94;margin-top:12px"></p><p class="mf-sub" style="margin-top:20px">Joining a game?</p><a class="btn ghost" href="?">Enter a PIN</a></div>';
    var open = async function (state) {
      try {
        var tok = null, pin;
        if (L.local) pin = state ? state.pin : String(Math.floor(100000 + Math.random() * 900000));
        else if (state) { tok = (await L.api('token', { pin: state.pin, as: 'host' })).token; pin = state.pin; }
        else { var r = await L.api('host', { mode: 'mafia', title: 'Mafia Live' }); tok = r.token; pin = r.room.pin; }
        G = state || { pin: pin, ph: 'lobby', n: 0, players: [], opt: { roles: {}, mins: 3 }, seq: 0, acts: {}, votes: {}, best: {}, notes: {}, story: [], stars: {}, lovers: [], used: {}, lastDead: [] };
        G.players.forEach(function (p) { p.ck = null; });
        var first = tok;
        bus = await L.connect({ pin: pin, clientId: 'host', token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('token', { pin: pin, as: 'host' })).token; } });
        bus.sub('p', onMsg);
        $('#pinpill').hidden = false; $('#pinpill').textContent = 'PIN ' + pin;
        history.replaceState(null, '', '?host=1' + (L.local ? '&bus=local' : ''));
        var me = G.players.filter(function (p) { return p.local; })[0]; if (me) joinLocal(me.name);
        bus.pub('h', 'who', {}); sync();
      } catch (e) {
        $('#herr').innerHTML = e.code === 'login' || e.status === 401 ? 'Sign in to host a game. <a href="/login/?next=' + encodeURIComponent('/live/mafia/?host=1') + '" style="color:var(--gold)">Sign in</a>' : e.code === 'quota' ? 'You have hosted a lot of games today. Try again tomorrow.' : e.code === 'not-configured' ? 'Live games are not switched on for this site yet.' : 'Could not start the game. Check your connection and try again.';
      }
    };
    $('#new').onclick = function () { open(null); }; if (resume) $('#res').onclick = function () { open(old); };
  }

  window.addEventListener('beforeunload', function (e) { if (G && G.ph !== 'lobby' && G.ph !== 'end') { e.preventDefault(); e.returnValue = ''; } });
  if (Q.get('host')) hostPage(); else playerPage();
})();
