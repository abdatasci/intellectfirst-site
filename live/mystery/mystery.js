/* Mystery Live (IF Academy): the classroom mystery cases, played on phones, plus a solo detective mode.
   LIVE  One device hosts (projector or phone) and tells the story. Players join with the PIN and each gets a character
         card on their own phone (the guilty one's card says what really happened and what they must say instead).
         Everyone walks around and interviews everyone else, filling in the detective notebook on their phone.
         Characters nobody is playing are "not here tonight": their statements are already in every notebook.
         Clues arrive on a timer, then everyone accuses on their phone and the solution is shown.
         With more players than characters, the extra players are detectives with no card.
   SOLO  One phone, no PIN: read every suspect's statement, open clues only if you need them (each costs points),
         and name the culprit.
   Teachers and students can both host (any signed-in person). */
(function () {
  var L = window.LIVE, esc = L.esc, view = document.getElementById('view'), CASES = window.IF_CASES || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var Q = new URLSearchParams(location.search);
  var caseOf = function (id) { return CASES.filter(function (c) { return c.id === id; })[0]; };
  var clock = function (ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };
  var crime = function (c) { return c.id === 'reunion' ? 'Who did it?' : c.id === 'cake' ? 'Who took the cake?' : 'Who is the thief?'; };
  var casePick = function (sel) {
    return '<div class="my-cases">' + CASES.map(function (c) { return '<button class="my-case' + (c.id === sel ? ' on' : '') + '" data-case="' + c.id + '"><b>' + esc(c.title) + '</b><small>' + esc(c.level) + ' · ' + c.chars.length + ' characters · ' + esc(c.grammar) + '</small></button>'; }).join('') + '</div>';
  };
  function say(text) {
    if (L.ls.get('mystery.voice') === false || !window.speechSynthesis) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(text), vs = speechSynthesis.getVoices(); u.lang = 'en-GB'; u.rate = .92; u.voice = vs.filter(function (v) { return /en-GB/i.test(v.lang); })[0] || vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || null; speechSynthesis.speak(u); } catch (e) {}
  }
  var statement = function (c, ch) { return '<p><i>Who:</i> ' + esc(ch.s.why) + '</p><p><i>' + esc(c.times[0]) + ':</i> ' + esc(ch.s.t1) + '</p><p><i>' + esc(c.times[1]) + ':</i> ' + esc(ch.s.t2) + '</p><p><i>Also:</i> ' + esc(ch.s.extra) + '</p>'; };

  /* ================= the phone ================= */
  function PlayerUI(root, pid, send) {
    var pub = null, tab = 'book', tick = null, sel = '', sent = {};
    var nbKey = function () { return 'mystery.nb.' + pub.pin; }, NB = null;
    var nb = function () { if (!NB || NB._pin !== pub.pin) { NB = L.ls.get(nbKey()) || {}; NB._pin = pub.pin; } return NB; };
    function cardHTML(c, me) {
      if (me.ci < 0) return '<div class="my-card show"><h2>Detective</h2><p class="rl">You have no character tonight</p><p>Interview everyone. Write their answers in your notebook, compare the stories and find the one that doesn’t fit.</p></div>';
      var ch = c.chars[me.ci];
      return '<div class="my-card" data-hold><h2>' + esc(ch.name) + '</h2><p class="rl">' + esc(ch.role) + '</p><p>' + esc(ch.why) + '</p><b class="t">' + esc(c.times[0]) + '</b><p>' + esc(ch.t1) + '</p><b class="t">' + esc(c.times[1]) + '</b><p>' + esc(ch.t2) + '</p><p class="' + (ch.culprit ? 'sec' : '') + '">' + esc(ch.extra) + '</p>' +
        '<div class="cover"><b>IF</b>Press and hold to read your card</div></div>';
    }
    function render() {
      clearInterval(tick);
      if (!pub) { root.innerHTML = '<div class="mf-c"><div class="pulse"></div><p class="mf-sub">Connecting to the game…</p></div>'; return; }
      var ph = pub.ph, c = caseOf(pub.case), me = pub.players.filter(function (p) { return p.id === pid; })[0], h = '', peek = false;
      var keep = {}, foc = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.nb : null; root.querySelectorAll('[data-nb]').forEach(function (i) { keep[i.dataset.nb] = i.value; });
      if (ph === 'lobby' || !me || me.ci == null || !c) {
        h = '<div class="mf-c"><p class="mf-eyebrow">Mystery Live</p><h1 class="mf-h1">' + (ph === 'lobby' ? 'You’re in' : 'Case in progress') + '</h1><p class="mf-sub">' + (ph === 'lobby' ? 'Wait for the host to start. ' + pub.players.length + ' player' + (pub.players.length === 1 ? '' : 's') + ' so far.' : 'You will get a character when the next case starts.') + '</p>' +
          (c ? '<p class="mf-sub">Tonight’s case: <b style="color:#fff">' + esc(c.title) + '</b></p>' : '') + '<div class="mf-chips">' + pub.players.map(function (p) { return '<span class="mf-chip">' + esc(p.name) + '</span>'; }).join('') + '</div></div>';
      } else if (ph === 'cards') {
        h = '<div class="mf-c"><p class="mf-eyebrow">' + esc(c.title) + ' · your character</p>' + cardHTML(c, me) + '<p class="mf-sub">Read your card carefully. In the game you ARE this person: answer questions from your card' + (me.ci >= 0 ? ', and don’t show it to anyone.' : '.') + '</p>' +
          (me.ready || sent.ready ? '<p class="mf-sub">✓ Ready. Waiting for the others…</p>' : '<button class="btn" data-ready>I’m ready</button>') + '</div>';
      } else if (ph === 'brief') {
        h = '<div class="mf-c"><p class="mf-eyebrow">' + esc(c.title) + ' · ' + esc(c.place) + '</p><p class="my-intro">' + esc(c.intro) + '</p><div class="mf-box"><h3>Questions to ask everyone</h3><ol class="my-list">' + c.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ol></div></div>'; peek = me.ci >= 0;
      } else if (ph === 'talk') {
        var N = nb(), others = c.chars.map(function (ch, i) { return i; }).filter(function (i) { return i !== me.ci; });
        var body = tab === 'clues' ? (pub.clues ? c.clues.slice(0, pub.clues).map(function (x, i) { return '<div class="my-clue"><b>Clue ' + (i + 1) + '</b>' + esc(x) + '</div>'; }).join('') : '<p class="mf-sub">No clues yet. They arrive during the investigation.</p>')
          : tab === 'ask' ? '<div class="mf-box"><h3>Questions to ask</h3><ol class="my-list">' + c.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ol><p class="mf-small">Grammar focus: ' + esc(c.grammar) + '</p></div>'
          : others.map(function (i) {
            var ch = c.chars[i], pl = pub.players.filter(function (p) { return p.ci === i; })[0], e = N[i] || {};
            return '<div class="my-sus' + (e.star ? ' star' : '') + '"><h4>' + esc(ch.name) + ' <small>' + esc(ch.role) + (pl ? ' · ' + esc(pl.name) : ' · not here tonight') + '</small><button data-star="' + i + '" aria-label="Mark as a suspect">' + (e.star ? '★' : '☆') + '</button></h4>' +
              (pl ? '<label>' + esc(c.times[0]) + '</label><input data-nb="' + i + '.a" maxlength="120" placeholder="What did they say?"><label>' + esc(c.times[1]) + '</label><input data-nb="' + i + '.b" maxlength="120" placeholder="What did they say?"><label>Notes</label><input data-nb="' + i + '.n" maxlength="160" placeholder="Anything strange?">'
                : '<p class="mf-small">Their written statement to the police:</p>' + statement(c, ch)) + '</div>';
          }).join('');
        h = '<div class="mf-c"><p class="mf-eyebrow">Investigation</p><div class="mf-timer" id="myT"></div><div class="my-tabs"><button data-tab="book" class="' + (tab === 'book' ? 'on' : '') + '">Notebook</button><button data-tab="clues" class="' + (tab === 'clues' ? 'on' : '') + '">Clues ' + (pub.clues || 0) + '/' + c.clues.length + '</button><button data-tab="ask" class="' + (tab === 'ask' ? 'on' : '') + '">Questions</button></div>' + body + '<div style="height:70px"></div></div>'; peek = me.ci >= 0;
      } else if (ph === 'accuse') {
        var done = me.acc != null || sent.acc;
        h = '<div class="mf-c"><p class="mf-eyebrow">The accusation</p>' + (done ? '<h1 class="mf-h1">✓ Sent</h1><p class="mf-sub">Wait for the others.</p>' : '<div class="mf-task"><h2>' + crime(c) + '</h2><p>Choose one name. Be ready to explain why, in English.</p><div class="mf-opts">' +
          c.chars.map(function (ch, i) { return i === me.ci ? '' : '<button data-acc="' + i + '" class="' + (sel === String(i) ? 'sel' : '') + '">' + esc(ch.name) + '</button>'; }).join('') + '</div><button class="btn" data-go ' + (sel !== '' ? '' : 'disabled style="opacity:.4"') + '>Confirm</button></div>') + '</div>';
      } else if (ph === 'reveal') {
        var cu = c.chars.filter(function (x) { return x.culprit; })[0], ci = c.chars.indexOf(cu), right = me.acc === ci, mine = me.ci === ci;
        h = '<div class="mf-c"><div class="mf-ghost">' + (mine ? '🎭' : right ? '🏆' : '🔍') + '</div><h1 class="mf-h1">It was ' + esc(cu.name) + '</h1><p class="mf-sub">' + (mine ? 'That was you! ' + pub.result.right + ' of ' + pub.result.of + ' detectives found you out.' : right ? 'You solved the case!' : 'Not this time. Read how it happened.') + '</p><p class="my-intro">' + esc(c.solution) + '</p></div>';
      }
      root.innerHTML = h + (peek ? '<button class="mf-peek" data-hold>🎴 Hold to see my card</button>' : '');
      if (ph === 'talk') { var N2 = nb(); root.querySelectorAll('[data-nb]').forEach(function (i) { var k = i.dataset.nb.split('.'), saved = (N2[k[0]] || {})[k[1]] || ''; i.value = keep[i.dataset.nb] != null ? keep[i.dataset.nb] : saved; if (foc === i.dataset.nb) i.focus(); }); }
      if (ph === 'talk') { var T = $('#myT', root), up = function () { if (T) T.textContent = clock(pub.t - Date.now()); }; up(); tick = setInterval(up, 500); }
    }
    root.addEventListener('input', function (e) { var k = e.target.dataset && e.target.dataset.nb; if (!k || !pub) return; k = k.split('.'); var N = nb(); (N[k[0]] = N[k[0]] || {})[k[1]] = e.target.value; L.ls.set(nbKey(), N); });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !pub) return;
      if (b.dataset.ready != null) { sent.ready = 1; send('ready', 1); render(); }
      else if (b.dataset.tab) { tab = b.dataset.tab; render(); }
      else if (b.dataset.star != null) { var N = nb(), e2 = N[b.dataset.star] = N[b.dataset.star] || {}; e2.star = !e2.star; L.ls.set(nbKey(), N); render(); }
      else if (b.dataset.acc != null) { sel = b.dataset.acc; render(); }
      else if (b.dataset.go != null && sel !== '') { sent.acc = 1; send('acc', +sel); L.sfx('ok'); render(); }
    });
    var over = null;
    root.addEventListener('pointerdown', function (e) {
      var t = e.target.closest('[data-hold]'); if (!t || !pub) return; e.preventDefault();
      if (t.classList.contains('my-card')) { t.classList.add('show'); return; }
      var c = caseOf(pub.case), me = pub.players.filter(function (p) { return p.id === pid; })[0]; if (!c || !me) return;
      over = document.createElement('div'); over.className = 'mf-over'; over.innerHTML = cardHTML(c, me); over.firstChild.classList.add('show'); document.body.appendChild(over);
    });
    ['pointerup', 'pointercancel'].forEach(function (ev) { window.addEventListener(ev, function () { if (over) { over.remove(); over = null; } var c = $('.my-card.show[data-hold]', root); if (c) c.classList.remove('show'); }); });
    root.addEventListener('contextmenu', function (e) { if (e.target.closest('[data-hold]')) e.preventDefault(); });
    render();
    return { pub: function (p) { if (pub && (p.ph !== pub.ph || p.pin !== pub.pin)) { sent = {}; sel = ''; } pub = p; render(); } };
  }

  function joinForm(pin, name, err) {
    view.innerHTML = '<div class="mf-c" style="max-width:420px;margin:0 auto"><p class="mf-eyebrow">IF Live</p><h1 class="mf-h1">Mystery</h1><p class="mf-sub">Enter the game PIN from the host’s screen and your first name.</p>' +
      '<input class="mf-inp" id="pin" inputmode="numeric" maxlength="6" placeholder="Game PIN" value="' + esc(pin) + '"><input class="mf-inp" id="nm" maxlength="16" placeholder="Your name" value="' + esc(name) + '" autocomplete="given-name">' +
      (err ? '<p style="color:#ff9d94">' + esc(err) + '</p>' : '') + '<button class="btn" id="go" style="width:100%;margin-top:8px">Join the game</button>' +
      '<div class="mf-row" style="margin-top:24px"><a class="btn ghost" href="?host=1">Host a game</a><a class="btn ghost" href="?solo=1">Play alone</a></div></div>';
    $('#go').onclick = function () {
      var p = $('#pin').value.replace(/\D/g, ''), n = $('#nm').value.trim().slice(0, 16);
      if (p.length !== 6 || !n) return joinForm(p, n, 'Enter the 6-digit PIN and your name.');
      var old = L.ls.get('mystery.me') || {}, me = old.pin === p ? old : { pin: p }; me.name = n; L.ls.set('mystery.me', me);
      history.replaceState(null, '', '?pin=' + p + (L.local ? '&bus=local' : '')); play(p, me);
    };
  }
  async function play(pin, me) {
    view.innerHTML = ''; var r;
    try { r = L.local ? { pid: me.pid || 'p-' + Math.random().toString(36).slice(2, 10), token: null } : await L.api('join', { pin: pin, pid: me.pid }); }
    catch (e) { L.ls.set('mystery.me', null); return joinForm(pin, me.name, e.code === 'room' ? 'No game with this PIN. Check the number.' : 'Could not join. Try again.'); }
    me.pid = r.pid; L.ls.set('mystery.me', me); var first = r.token;
    var bus = await L.connect({ pin: pin, clientId: me.pid, token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('join', { pin: pin, pid: me.pid })).token; } });
    var ui = PlayerUI(view, me.pid, function (kind, v) { bus.pub('p', kind, { pid: me.pid, v: v }); });
    var hi = function () { bus.pub('p', 'hi', { pid: me.pid, name: me.name }); };
    bus.sub('h', function (name, d) { if (name === 'pub') { ui.pub(d); if (!d.players.some(function (p) { return p.id === me.pid; })) hi(); } else if (name === 'who') hi(); });
    bus.onState(function (s) { if (s === 'connected') hi(); });
    hi(); setTimeout(hi, 1500);
    $('#pinpill').hidden = false; $('#pinpill').textContent = 'PIN ' + pin + ' · ' + me.name;
  }

  /* ================= the host ================= */
  var G = null, bus = null, htick = null;
  var P = function (id) { return G.players.filter(function (p) { return p.id === id; })[0]; };
  var saveG = function () { G.at = Date.now(); L.ls.set('mystery.host', G); };
  function pubState() {
    var c = caseOf(G.case), res = null;
    if (G.ph === 'reveal') { var ci = c.chars.findIndex(function (x) { return x.culprit; }), det = G.players.filter(function (p) { return p.ci != null && p.ci !== ci; }); res = { right: det.filter(function (p) { return p.acc === ci; }).length, of: det.length }; }
    return { pin: G.pin, ph: G.ph, case: G.case, t: G.t, clues: G.clues, result: res, players: G.players.map(function (p) { return { id: p.id, name: p.name, ci: p.ci, ready: p.ready, acc: G.ph === 'reveal' || p.acc == null ? p.acc : -9 }; }) };
  }
  function sync() { saveG(); bus.pub('h', 'pub', pubState()); hostRender(); }
  function onMsg(name, d, from) {
    if (!d) return; var pid = L.local || !from || /^host-/.test(from) ? d.pid : from, p = P(pid);
    if (name === 'hi') {
      if (!p) { if (G.players.length >= 30) return; var base = String(d.name || 'Player').replace(/\s+/g, ' ').trim().slice(0, 16) || 'Player', n2 = base, i = 2; while (G.players.some(function (x) { return x.name.toLowerCase() === n2.toLowerCase(); })) n2 = base + ' ' + i++;
        G.players.push({ id: pid, name: n2, ci: null, ready: false, acc: null }); L.sfx('coin'); }
      return sync();
    }
    if (!p || p.ci == null) return;
    if (name === 'ready' && G.ph === 'cards') { p.ready = true; sync(); }
    if (name === 'acc' && G.ph === 'accuse') { var c = caseOf(G.case), v = +d.v; if (!(v >= 0 && v < c.chars.length) || v === p.ci) return; p.acc = v; sync(); }
  }
  function deal() {                              // the guilty character is always played; characters nobody plays are "not here tonight"
    var c = caseOf(G.case), cu = c.chars.findIndex(function (x) { return x.culprit; }), rest = L.shuffle(c.chars.map(function (x, i) { return i; }).filter(function (i) { return i !== cu; }));
    var order = L.shuffle([cu].concat(rest.slice(0, Math.max(0, G.players.length - 1)))), ps = L.shuffle(G.players);
    ps.forEach(function (p, i) { p.ci = i < order.length ? order[i] : -1; p.ready = false; p.acc = null; });
    G.ph = 'cards'; G.clues = 0; say('Look at your phone. Press and hold your card to read your character.'); sync();
  }
  function brief() { var c = caseOf(G.case); G.ph = 'brief'; say(c.intro); sync(); }
  function talk() { G.ph = 'talk'; G.t0 = Date.now(); G.t = G.t0 + G.mins * 60000; G.clues = 0; say('The investigation begins. Stand up, walk around and interview everyone. You have ' + G.mins + ' minutes.'); sync(); }
  function clue() { var c = caseOf(G.case); if (G.ph !== 'talk' || G.clues >= c.clues.length) return; G.clues++; L.sfx('coin'); say('A new clue. ' + c.clues[G.clues - 1]); sync(); }
  function accuse() { if (G.ph !== 'talk') return; var c = caseOf(G.case); G.clues = c.clues.length; G.ph = 'accuse'; say('Time is up. ' + crime(c) + ' Choose on your phone.'); sync(); }
  function reveal() { var c = caseOf(G.case); G.ph = 'reveal'; L.sfx('win'); say(c.solution); sync(); }

  function hostRender() {
    clearInterval(htick); if (!G) return;
    var ph = G.ph, c = caseOf(G.case), n = G.players.length, h = '', joinUrl = location.origin + '/live/mystery/?pin=' + G.pin + (L.local ? '&bus=local' : '');
    var chips = function (f) { return '<div class="mf-chips">' + G.players.filter(function (p) { return ph === 'lobby' || p.ci != null; }).map(function (p) { return '<span class="mf-chip' + (f && f(p) ? ' ok' : '') + '">' + esc(p.name) + (ph !== 'lobby' && ph !== 'cards' && p.ci != null ? '<small>' + esc(p.ci < 0 ? 'Detective' : c.chars[p.ci].name) + '</small>' : '') + '</span>'; }).join('') + '</div>'; };
    if (ph === 'lobby') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Mystery Live · join at intellectfirst.com/live/mystery</p><div class="mf-join"><div><div class="mf-pin">' + G.pin + '</div><p class="mf-sub">Game PIN</p></div><div class="mf-qr">' + L.qr(joinUrl) + '</div></div>' + (n ? chips() : '<p class="mf-sub">Waiting for players to join…</p>') +
        '<div class="mf-box"><h3>Choose the case</h3>' + casePick(G.case) + '<p class="mf-small">' + (n > c.chars.length ? (n - c.chars.length) + ' player' + (n - c.chars.length === 1 ? '' : 's') + ' will be detectives with no character.' : n && n < c.chars.length ? (c.chars.length - n) + ' character' + (c.chars.length - n === 1 ? ' is' : 's are') + ' “not here tonight”: their statements go into every notebook.' : '') + '</p>' +
        '<h3 style="margin-top:12px">Investigation time</h3><div class="mf-tog" id="mins">' + [10, 15, 20, 30].map(function (m) { return '<button data-m="' + m + '" class="' + (G.mins === m ? 'on' : '') + '">' + m + ' min</button>'; }).join('') + '</div></div>' +
        '<div class="mf-row"><button class="btn" id="start" ' + (n >= 3 ? '' : 'disabled style="opacity:.4"') + '>' + (n >= 3 ? 'Give out the characters (' + n + ' players)' : 'Need ' + (3 - n) + ' more player' + (3 - n === 1 ? '' : 's')) + '</button></div></div>';
    } else if (ph === 'cards') {
      h = '<div class="mf-c"><p class="mf-eyebrow">' + esc(c.title) + '</p><h1 class="mf-h1">Read your character</h1><p class="mf-sub">Press and hold the card on your phone. You are this person tonight. Don’t show your card to anyone.</p>' + chips(function (p) { return p.ready; }) +
        '<p class="mf-sub">' + G.players.filter(function (p) { return p.ready; }).length + ' of ' + G.players.filter(function (p) { return p.ci != null; }).length + ' ready</p><div class="mf-row"><button class="btn" id="next">Tell the story</button></div></div>';
    } else if (ph === 'brief') {
      h = '<div class="mf-c"><p class="mf-eyebrow">' + esc(c.title) + ' · ' + esc(c.place) + '</p><p class="my-intro">' + esc(c.intro) + '</p><div class="mf-box"><h3>Questions to ask everyone</h3><ol class="my-list">' + c.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ol></div><div class="mf-row"><button class="btn ghost" id="again2">🔊 Read it again</button><button class="btn" id="next">Start the investigation</button></div></div>';
    } else if (ph === 'talk') {
      h = '<div class="mf-c"><p class="mf-eyebrow">' + esc(c.title) + ' · investigation</p><div class="mf-timer" id="hT"></div><p class="mf-sub">Walk around and interview everyone. Write the answers in your notebook.</p>' +
        (G.clues ? c.clues.slice(0, G.clues).map(function (x, i) { return '<div class="my-clue"><b>Clue ' + (i + 1) + '</b>' + esc(x) + '</div>'; }).join('') : '<p class="mf-sub">The first clue is on its way…</p>') + chips() +
        '<div class="mf-row">' + (G.clues < c.clues.length ? '<button class="btn ghost" id="clue">Next clue now (' + G.clues + '/' + c.clues.length + ')</button>' : '') + '<button class="btn ghost" id="more">+2 minutes</button><button class="btn" id="next">Time to accuse</button></div></div>';
    } else if (ph === 'accuse') {
      var d = G.players.filter(function (p) { return p.ci != null; });
      h = '<div class="mf-c"><p class="mf-eyebrow">' + esc(c.title) + '</p><h1 class="mf-h1">' + crime(c) + '</h1><p class="mf-sub">Choose on your phone, and be ready to say why.</p>' + c.clues.map(function (x, i) { return '<div class="my-clue"><b>Clue ' + (i + 1) + '</b>' + esc(x) + '</div>'; }).join('') + chips(function (p) { return p.acc != null; }) +
        '<p class="mf-sub">' + d.filter(function (p) { return p.acc != null; }).length + ' of ' + d.length + ' have chosen</p><div class="mf-row"><button class="btn" id="next">Reveal the answer</button></div></div>';
    } else if (ph === 'reveal') {
      var ci = c.chars.findIndex(function (x) { return x.culprit; }), who = G.players.filter(function (p) { return p.ci === ci; })[0], tl = {}; G.players.forEach(function (p) { if (p.acc != null) tl[p.acc] = (tl[p.acc] || 0) + 1; });
      var r = pubState().result;
      h = '<div class="mf-c"><div class="mf-moon">🔍</div><h1 class="mf-h1">It was ' + esc(c.chars[ci].name) + '</h1><p class="mf-sub">' + (who ? 'Played by ' + esc(who.name) + '. ' : '') + r.right + ' of ' + r.of + ' detectives solved the case.</p><p class="my-intro">' + esc(c.solution) + '</p>' +
        '<div class="mf-box"><h3>The accusations</h3><table class="mf-table">' + Object.keys(tl).sort(function (a, b) { return tl[b] - tl[a]; }).map(function (k) { return '<tr><td>' + esc(c.chars[k].name) + (+k === ci ? ' ✓' : '') + '</td><td>' + tl[k] + '</td></tr>'; }).join('') + '</table></div>' +
        '<div class="mf-row"><button class="btn" id="again">Play another case with the same players</button></div></div>';
    }
    view.innerHTML = h;
    var on = function (id, fn) { var b = $('#' + id); if (b) b.onclick = fn; };
    on('start', deal); on('next', function () { ({ cards: brief, brief: talk, talk: accuse, accuse: reveal })[G.ph](); });
    on('again2', function () { say(c.intro); }); on('clue', clue); on('more', function () { G.t += 120000; sync(); });
    on('again', function () { G.ph = 'lobby'; G.players.forEach(function (p) { p.ci = null; p.ready = false; p.acc = null; }); sync(); });
    var cp = $('.my-cases'); if (cp) cp.onclick = function (e) { var b = e.target.closest('[data-case]'); if (b) { G.case = b.dataset.case; sync(); } };
    var mb = $('#mins'); if (mb) mb.onclick = function (e) { var b = e.target.closest('[data-m]'); if (b) { G.mins = +b.dataset.m; saveG(); hostRender(); } };
    if (ph === 'talk') {
      var T = $('#hT'), up = function () {
        var left = G.t - Date.now(), total = G.t - G.t0, due = Math.floor((1 - left / total) * (c.clues.length + 1));   // clues are spread evenly over the investigation
        if (T) T.textContent = clock(left);
        if (due > G.clues && G.clues < c.clues.length) { clearInterval(htick); return clue(); }
        if (left <= 0) { clearInterval(htick); accuse(); }
      }; up(); htick = setInterval(up, 500);
    }
  }
  async function hostPage() {
    $('#snd').hidden = false; var vo = L.ls.get('mystery.voice') !== false; $('#snd').textContent = vo ? '🔊' : '🔇';
    $('#snd').onclick = function () { vo = !vo; L.ls.set('mystery.voice', vo); this.textContent = vo ? '🔊' : '🔇'; if (!vo && window.speechSynthesis) speechSynthesis.cancel(); };
    var old = L.ls.get('mystery.host'), resume = old && old.pin && Date.now() - old.at < 3 * 3600e3 && old.ph !== 'reveal';
    view.innerHTML = '<div class="mf-c" style="max-width:520px;margin:0 auto"><p class="mf-eyebrow">IF Live</p><h1 class="mf-h1">Host a mystery</h1><p class="mf-sub">This screen tells the story and shows the clues. Put it on the projector, or just hold your phone. Players join with a PIN and get a character card on their own phone.</p>' +
      '<button class="btn" id="new" style="width:100%">Start a new game</button>' + (resume ? '<button class="btn ghost" id="res" style="width:100%;margin-top:10px">Continue game ' + old.pin + ' (' + old.players.length + ' players)</button>' : '') +
      '<p id="herr" style="color:#ff9d94;margin-top:12px"></p><div class="mf-row" style="margin-top:18px"><a class="btn ghost" href="?">Enter a PIN</a><a class="btn ghost" href="?solo=1">Play alone</a></div></div>';
    var open = async function (state) {
      try {
        var tok = null, pin;
        if (L.local) pin = state ? state.pin : String(Math.floor(100000 + Math.random() * 900000));
        else if (state) { tok = (await L.api('token', { pin: state.pin, as: 'host' })).token; pin = state.pin; }
        else { var r = await L.api('host', { mode: 'mystery', title: 'Mystery Live' }); tok = r.token; pin = r.room.pin; }
        G = state || { pin: pin, ph: 'lobby', case: CASES[0].id, players: [], mins: 15, clues: 0, t: 0, t0: 0 };
        var first = tok;
        bus = await L.connect({ pin: pin, clientId: 'host', token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('token', { pin: pin, as: 'host' })).token; } });
        bus.sub('p', onMsg); $('#pinpill').hidden = false; $('#pinpill').textContent = 'PIN ' + pin;
        history.replaceState(null, '', '?host=1' + (L.local ? '&bus=local' : '')); bus.pub('h', 'who', {}); sync();
      } catch (e) {
        $('#herr').innerHTML = e.code === 'login' || e.status === 401 ? 'Sign in to host a game. <a href="/login/?next=' + encodeURIComponent('/live/mystery/?host=1') + '" style="color:var(--gold)">Sign in</a>' : e.code === 'quota' ? 'You have hosted a lot of games today. Try again tomorrow.' : e.code === 'not-configured' ? 'Live games are not switched on for this site yet.' : 'Could not start the game. Check your connection and try again.';
      }
    };
    $('#new').onclick = function () { open(null); }; if (resume) $('#res').onclick = function () { open(old); };
  }

  /* ================= solo detective ================= */
  function soloPage() {
    var S = null, best = L.ls.get('mystery.solo') || {};
    function menu() {
      view.innerHTML = '<div class="mf-c" style="max-width:560px;margin:0 auto"><p class="mf-eyebrow">Mystery · play alone</p><h1 class="mf-h1">Be the detective</h1><p class="mf-sub">Read what every suspect says. One of them is lying. Open clues only if you need them: each clue costs 15 points.</p>' +
        '<div class="my-cases">' + CASES.map(function (c) { return '<button class="my-case" data-case="' + c.id + '"><b>' + esc(c.title) + '</b><small>' + esc(c.level) + ' · ' + c.chars.length + ' suspects' + (best[c.id] != null ? ' · your best: ' + best[c.id] + ' points' : '') + '</small></button>'; }).join('') + '</div>' +
        '<div class="mf-row"><a class="btn ghost" href="?">Join a class game</a></div></div>';
    }
    function game() {
      var c = caseOf(S.id), h = '<div class="mf-c"><p class="mf-eyebrow">' + esc(c.title) + ' · ' + esc(c.place) + ' · ' + S.pts + ' points</p>';
      if (S.step === 'intro') h += '<p class="my-intro">' + esc(c.intro) + '</p><div class="mf-row"><button class="btn" data-step="work">Read the statements</button></div>';
      else if (S.step === 'work') {
        h += '<div class="my-tabs"><button data-tab="book" class="' + (S.tab === 'book' ? 'on' : '') + '">Statements</button><button data-tab="clues" class="' + (S.tab === 'clues' ? 'on' : '') + '">Clues ' + S.clues + '/' + c.clues.length + '</button><button data-tab="acc" class="' + (S.tab === 'acc' ? 'on' : '') + '">Accuse</button></div>';
        if (S.tab === 'book') h += c.chars.map(function (ch, i) { return '<div class="my-sus' + (S.star[i] ? ' star' : '') + '"><h4>' + esc(ch.name) + ' <small>' + esc(ch.role) + '</small><button data-star="' + i + '" aria-label="Mark as a suspect">' + (S.star[i] ? '★' : '☆') + '</button></h4>' + statement(c, ch) + '</div>'; }).join('');
        else if (S.tab === 'clues') h += c.clues.slice(0, S.clues).map(function (x, i) { return '<div class="my-clue"><b>Clue ' + (i + 1) + '</b>' + esc(x) + '</div>'; }).join('') + (S.clues < c.clues.length ? '<div class="mf-row"><button class="btn ghost" data-clue>Open a clue (−15 points)</button></div>' : '<p class="mf-sub">That is every clue.</p>');
        else h += '<div class="mf-task"><h2>' + crime(c) + '</h2><p>' + (S.wrong.length ? 'Not ' + S.wrong.map(function (i) { return c.chars[i].name; }).join(' or ') + '. Look again.' : 'A wrong answer costs 25 points.') + '</p><div class="mf-opts">' + c.chars.map(function (ch, i) { return '<button data-acc="' + i + '" ' + (S.wrong.indexOf(i) >= 0 ? 'disabled style="opacity:.35"' : '') + '>' + esc(ch.name) + '</button>'; }).join('') + '</div></div>';
      } else h += '<div class="mf-ghost">🏆</div><h1 class="mf-h1">Case solved</h1><div class="my-score">' + S.pts + ' points</div><p class="my-intro">' + esc(c.solution) + '</p><div class="mf-row"><button class="btn" data-menu>Another case</button></div>';
      view.innerHTML = h + '</div>';
    }
    view.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.case && !S) { S = { id: b.dataset.case, step: 'intro', tab: 'book', pts: 100, clues: 0, wrong: [], star: {} }; return game(); }
      if (!S) return; var c = caseOf(S.id);
      if (b.dataset.step) { S.step = b.dataset.step; game(); }
      else if (b.dataset.tab) { S.tab = b.dataset.tab; game(); }
      else if (b.dataset.star != null) { S.star[b.dataset.star] = !S.star[b.dataset.star]; game(); }
      else if (b.dataset.clue != null) { S.clues++; S.pts = Math.max(0, S.pts - 15); game(); }
      else if (b.dataset.acc != null) {
        var i = +b.dataset.acc;
        if (c.chars[i].culprit) { S.step = 'done'; L.sfx('win'); if (best[S.id] == null || S.pts > best[S.id]) { best[S.id] = S.pts; L.ls.set('mystery.solo', best); } }
        else { S.wrong.push(i); S.pts = Math.max(0, S.pts - 25); L.sfx('no'); }
        game();
      } else if (b.dataset.menu != null) { S = null; menu(); }
    });
    menu();
  }

  window.addEventListener('beforeunload', function (e) { if (G && G.ph !== 'lobby' && G.ph !== 'reveal') { e.preventDefault(); e.returnValue = ''; } });
  if (Q.get('solo')) soloPage();
  else if (Q.get('host')) hostPage();
  else { var saved = L.ls.get('mystery.me') || {}, pin = (Q.get('pin') || '').replace(/\D/g, ''); if (saved.pin === pin && pin && saved.name) play(pin, saved); else joinForm(pin, saved.name || ''); }
})();
