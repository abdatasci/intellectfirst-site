/* IF Live — shared helpers: messaging (Ably, or BroadcastChannel with ?bus=local for one-device tests), questions. */
(function () {
  'use strict';
  var LIVE = window.LIVE = {};
  LIVE.COLORS = ['var(--a0)', 'var(--a1)', 'var(--a2)', 'var(--a3)'];
  LIVE.HEX = ['#c9972e', '#3f7fd0', '#2f9a68', '#c4513d'];
  LIVE.SHAPES = ['▲', '◆', '●', '■'];
  LIVE.TEAMS = ['Team Gold', 'Team Blue', 'Team Green', 'Team Red'];
  LIVE.local = /[?&]bus=local\b/.test(location.search);
  LIVE.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  LIVE.$ = function (s, r) { return (r || document).querySelector(s); };
  LIVE.ls = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  LIVE.api = async function (path, body, again) {
    var res = await fetch('/api/live/' + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), credentials: 'same-origin' } : { credentials: 'same-origin' });
    // the 1-hour sign-in token runs out during long lessons: renew it and try again (every time, not just once per page)
    if (res.status === 401 && !again && window.NFIdentity) { try { await NFIdentity.refreshSession(); } catch (e) {} return LIVE.api(path, body, true); }
    var d = await res.json().catch(function () { return {}; });
    if (!res.ok) { var e = new Error(d.error || res.status); e.code = d.error; e.free = !!d.free; e.status = res.status; throw e; }
    return d;
  };
  LIVE.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  /* ---- messaging ----
     LIVE.connect({pin, token: async () => tokenRequest, clientId}) → {pub(ch, name, data), sub(ch, fn(name, data, from)), close()}
     ch is 'h' (host → all) or 'p' (players → host). */
  LIVE.connect = async function (o) {
    if (LIVE.local) {
      var chans = {}, me = o.clientId || ('x' + Math.random().toString(36).slice(2, 8));
      var get = function (ch) { return chans[ch] || (chans[ch] = new BroadcastChannel('live-' + o.pin + '-' + ch)); };
      return {
        pub: function (ch, name, data) { get(ch).postMessage({ name: name, data: data, from: me }); },
        sub: function (ch, fn) { get(ch).addEventListener('message', function (e) { fn(e.data.name, e.data.data, e.data.from); }); },
        close: function () { Object.values(chans).forEach(function (c) { c.close(); }); },
        onState: function () {}
      };
    }
    var A = window.AblyPubSub || window.Ably, opts = {
      authCallback: function (p, cb) { o.token().then(function (t) { cb(null, t); }, function (e) { cb(e.message || String(e), null); }); },
      echoMessages: false, disconnectedRetryTimeout: 2000
    };
    var client = A.createClient ? A.createClient(opts) : new A.Realtime(opts);   // @ably/pubsub-device (needed since Ably's MAU pricing; old SDKs get error 80019/40168)
    var ch = function (c) { return client.channels.get('live:' + o.pin + ':' + c, c === 'h' ? { params: { rewind: '1' } } : undefined); };
    return {
      pub: function (c, name, data) { ch(c).publish(name, data).catch(function (e) { console.warn('publish', e); }); },
      sub: function (c, fn) { ch(c).subscribe(function (m) { fn(m.name, m.data, m.clientId); }); },
      close: function () { try { client.close(); } catch (e) {} },
      onState: function (fn) { client.connection.on(function (s) { fn(s.current); }); }
    };
  };

  /* ---- question building (host) ----
     Question = {p: prompt, o: [options], a: correct index, x: explanation, k: 'v'|'g'|'c'} */
  function pick(pool, n, not) { return LIVE.shuffle(pool.filter(function (w) { return not.indexOf(w) < 0; })).slice(0, n); }
  LIVE.build = function (cfg, banks) {
    var qs = [];
    if (cfg.source === 'chess') return LIVE.chess(cfg);
    if (cfg.source === 'custom') {
      String(cfg.custom || '').split(/\n+/).forEach(function (line) {
        var parts = line.split('|').map(function (s) { return s.trim(); }).filter(Boolean);
        if (parts.length < 3) return;
        var opts = parts.slice(1, 5), right = opts[0], o = LIVE.shuffle(opts);
        qs.push({ p: parts[0], o: o, a: o.indexOf(right), x: '', k: 'c' });
      });
      return cfg.shuffle === false ? qs : LIVE.shuffle(qs);
    }
    var bank = banks.filter(function (b) { return b.id === cfg.bank; })[0]; if (!bank) return [];
    var units = bank.units.filter(function (u) { return cfg.units.indexOf(u.id) >= 0; });
    if (bank.kind === 'g' || bank.kind === 'y') {
      units.forEach(function (u) { u.q.forEach(function (q) { var right = q[1][q[2]], o = LIVE.shuffle(q[1]); qs.push({ p: q[0], o: o, a: o.indexOf(right), x: q[3] || '', k: 'g' }); }); });
    } else {
      var words = [], seen = {};
      units.forEach(function (u) { u.w.forEach(function (w) { var k = w[0].toLowerCase(); if (!seen[k]) { seen[k] = 1; words.push(w); } }); });
      var all = []; if (words.length < 8) bank.units.forEach(function (u) { all = all.concat(u.w); });
      var pool = words.concat(all.filter(function (w) { return !seen[w[0].toLowerCase()]; }));
      words.forEach(function (w) {
        var type = cfg.qtype === 'mix' ? ['def', 'def', 'word', 'ru'][Math.floor(Math.random() * 4)] : cfg.qtype;
        if (type === 'ru' && !w[2]) type = 'def';
        var others = pick(pool, 3, [w]).filter(function (x) { return x[0].toLowerCase() !== w[0].toLowerCase() && (type !== 'word' || x[1] !== w[1]); });
        if (others.length < 2) return;
        var set = LIVE.shuffle([w].concat(others)), q;
        if (type === 'word') q = { p: w[0], o: set.map(function (x) { return x[1]; }), x: w[2] ? w[0] + ' — ' + w[2] : '' };
        else if (type === 'ru') q = { p: w[2], o: set.map(function (x) { return x[0]; }), x: w[1] };
        else q = { p: w[1], o: set.map(function (x) { return x[0]; }), x: w[2] ? w[0] + ' — ' + w[2] : '' };
        q.a = set.indexOf(w); q.k = 'v'; q.t = type; qs.push(q);
      });
    }
    qs = LIVE.shuffle(qs);
    return cfg.count && cfg.count !== 'all' ? qs.slice(0, +cfg.count) : qs;
  };
  /** Timed (self-paced) modes need many questions so they do not repeat: every chosen word in every question type
      (definition → word, word → meaning, Russian → English), and if the units give fewer than 60, the rest of the
      book as review. Duplicates removed, shuffled, at most 240. */
  LIVE.bigPool = function (cfg, banks) {
    var qs = [], seen = {};
    function add(list) { list.forEach(function (q) { var k = q.p + '|' + q.o[q.a]; if (!seen[k]) { seen[k] = 1; qs.push(q); } }); }
    if (cfg.source === 'chess') return LIVE.chess(Object.assign({}, cfg, { count: 'all' }));
    if (cfg.source === 'custom') return LIVE.build(Object.assign({}, cfg, { count: 'all' }), banks);
    var ids = cfg.source === 'gen' ? (LEVEL_BANKS[cfg.level] || LEVEL_BANKS.B1).filter(function (id) { var b = banks.filter(function (x) { return x.id === id; })[0]; return b && !(cfg.focus === 'grammar' && b.kind !== 'g') && !(cfg.focus === 'vocab' && b.kind !== 'v'); }) : [cfg.bank];
    ids.forEach(function (id) {
      var b = banks.filter(function (x) { return x.id === id; })[0]; if (!b) return;
      var units = cfg.source === 'gen' ? b.units.map(function (u) { return u.id; }) : cfg.units;
      var one = function (us, t) { return LIVE.build({ bank: id, units: us, qtype: t, count: 'all' }, banks); };
      if (b.kind === 'v') ['def', 'word', 'ru'].forEach(function (t) { add(one(units, t)); }); else add(one(units, 'def'));
      if (qs.length < 60 && cfg.source !== 'gen') { var rest = b.units.map(function (u) { return u.id; }).filter(function (u) { return units.indexOf(u) < 0; }); if (rest.length) add(one(rest, 'mix')); }
    });
    return LIVE.shuffle(qs).slice(0, 240);
  };
  LIVE.isLong = function (o) { return o.some(function (s) { return String(s).length > 34; }); };

  /* light obfuscation of answers sent to phones in race mode (keeps the answer out of plain sight) */
  LIVE.hide = function (a, salt) { return (a + 7 * (salt % 13) + 3) % 97; };
  LIVE.unhide = function (h, salt) { return ((h - 3 - 7 * (salt % 13)) % 97 + 97) % 97; };

  /* ---- General English (any level / topic, not tied to a book) ---- */
  LIVE.LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
  LIVE.FOCUS = [['mix', 'Mixed'], ['vocab', 'Vocabulary'], ['grammar', 'Grammar'], ['speaking', 'Everyday English'], ['exam', 'Exam practice']];
  LIVE.TOPICS = ['Daily life', 'Food & drink', 'Travel', 'Family & friends', 'School & study', 'Work & jobs', 'Technology', 'Health & sport', 'Shopping & money', 'Nature & environment', 'Cities & places', 'Films, music & art', 'Feelings', 'Holidays & celebrations'];
  var LEVEL_BANKS = { A1: ['v-A1', 'v-Movers', 'v-ge-a1', 'g-ge-a1'], A2: ['v-A2', 'v-Flyers', 'v-KET', 'g-A2', 'v-ge-a2', 'g-ge-a2', 'v-teens-a2', 'g-teens-a2'], B1: ['v-B1', 'v-PET', 'v-TeensB1', 'g-B1', 'v-ge-b1', 'g-ge-b1'], B2: ['v-B2', 'v-TeensB2', 'g-B2', 'v-ge-b2', 'g-ge-b2'], C1: ['v-C1', 'v-IELTS', 'g-C1', 'g-IELTS', 'v-ge-c1', 'g-ge-c1'], C2: ['v-ge-c2', 'g-ge-c2', 'v-C1', 'g-C1'] };
  function seg(id, items, on) { return '<div class="seg" id="' + id + '">' + items.map(function (s) { return '<button type="button" data-v="' + LIVE.esc(s[0]) + '" class="' + (on === s[0] ? 'on' : '') + '">' + LIVE.esc(s[1]) + '</button>'; }).join('') + '</div>'; }
  LIVE.genForm = function (c) {
    var t = LIVE.TOPICS.indexOf(c.topic) >= 0 || !c.topic ? c.topic : '';
    return '<label class="f">Level</label>' + seg('glv', LIVE.LEVELS.map(function (l) { return [l, l]; }), c.level) +
      '<label class="f">Focus</label>' + seg('gfo', LIVE.FOCUS, c.focus) +
      '<label class="f">Topic</label>' + seg('gtp', [['', 'Any topic']].concat(LIVE.TOPICS.map(function (x) { return [x, x]; })), t) +
      '<input class="inp" id="gtx" maxlength="100" style="margin-top:8px" placeholder="…or type any topic: Christmas, phrasal verbs with get, job interviews" value="' + LIVE.esc(t ? '' : c.topic || '') + '">';
  };
  LIVE.genWire = function (box, c, changed) {
    [['glv', 'level'], ['gfo', 'focus'], ['gtp', 'topic']].forEach(function (p) {
      var el = box.querySelector('#' + p[0]);
      el.querySelectorAll('button').forEach(function (b) { b.onclick = function () { el.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); c[p[1]] = b.dataset.v; if (p[0] === 'gtp') box.querySelector('#gtx').value = ''; if (changed) changed(); }; });
    });
    box.querySelector('#gtx').oninput = function () { c.topic = this.value.trim(); box.querySelectorAll('#gtp button').forEach(function (x) { x.classList.toggle('on', !c.topic && x.dataset.v === ''); }); if (changed) changed(); };
  };
  LIVE.genTitle = function (c) { var f = LIVE.FOCUS.filter(function (x) { return x[0] === c.focus; })[0]; return 'General English ' + (c.level || '') + (c.topic ? ' · ' + c.topic : '') + (f && c.focus !== 'mix' ? ' · ' + f[1] : ''); };
  /* without AI: mix the school's own word lists and grammar sets for that level */
  LIVE.general = function (c, banks) {
    var ids = LEVEL_BANKS[c.level] || LEVEL_BANKS.B1, qs = [];
    ids.forEach(function (id) {
      var b = banks.filter(function (x) { return x.id === id; })[0]; if (!b) return;
      if (c.focus === 'grammar' && b.kind !== 'g') return;
      if (c.focus === 'vocab' && b.kind !== 'v') return;
      qs = qs.concat(LIVE.build({ bank: id, units: b.units.map(function (u) { return u.id; }), qtype: 'mix', count: 'all' }, banks));
    });
    return LIVE.shuffle(qs).slice(0, +c.count || 15);
  };

  /* ---- Chess (22 Nov 2026): a question set for every IF Live mode. Puzzles show a real board on the big screen and
     on the phones (the prompt starts with ⟦FEN⟧, drawn by LIVE.qhtml); options are moves said in English.
     Puzzle answers were checked with chess.js. Format: [fen, prompt, [right, wrong, wrong, wrong], explanation]. */
  LIVE.CHESS_PUZ = [["6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1", "White to move. Which move is checkmate?", ["Rook to a8", "Rook to a7", "Rook to b1", "King to f2"], "Back-rank mate: the black king is trapped behind its own pawns."], ["6k1/8/6K1/8/8/8/8/Q7 w - - 0 1", "White to move. Which move is checkmate?", ["Queen to a8", "Queen to a7", "Queen to b2", "King to f6"], "The queen checks along the 8th rank and the white king covers f7, g7 and h7."], ["k7/8/1K6/8/8/8/8/7R w - - 0 1", "White to move. Which move is checkmate?", ["Rook to h8", "Rook to h7", "King to c6", "Rook to b1"], "The rook checks on the 8th rank; the white king covers a7 and b7."], ["6rk/6pp/8/6N1/8/8/8/K7 w - - 0 1", "White to move. Which move is checkmate?", ["Knight to f7", "Knight to h3", "Knight to e6", "King to b2"], "A smothered mate: the king is surrounded by its own pieces and the knight jumps in."], ["r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4", "White to move. Which move is checkmate?", ["Queen takes f7", "Queen takes e5", "Bishop takes f7", "Knight to f3"], "The famous Scholar’s Mate: the bishop on c4 protects the queen on f7."], ["7k/8/8/8/1b6/8/8/4Q2K w - - 0 1", "White to move. Which move wins a piece for free?", ["Queen takes b4", "Queen to e8", "Queen to e5", "King to g2"], "The queen moves diagonally to b4 and takes the bishop."], ["7k/8/8/8/5r2/8/8/2B4K w - - 0 1", "White to move. What is the best move?", ["Bishop takes f4", "Bishop to b2", "King to g2", "Bishop to a3"], "The bishop takes the rook on the diagonal: a rook is worth 5 pawns."], ["7k/8/8/8/3q4/8/8/3R3K w - - 0 1", "White to move. What is the best move?", ["Rook takes d4", "Rook to d3", "Rook to a1", "King to g2"], "The rook takes the queen in a straight line."], ["r3k3/8/8/1N6/8/8/8/7K w - - 0 1", "White to move. Which move is a fork?", ["Knight to c7", "Knight to d6", "Knight to a7", "Knight to d4"], "A fork: the knight attacks the king and the rook at the same time."], ["7k/8/8/8/4q3/8/3N4/K7 w - - 0 1", "White to move. What is the best move?", ["Knight takes e4", "Knight to b3", "Knight to f3", "King to a2"], "Always check every capture: the knight can take the queen."], ["r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", "White to move. Which move is castling?", ["Castle kingside", "King to f1", "Rook to g1", "King to e2"], "Castling: the king moves two squares towards the rook, and the rook jumps over."], ["7k/4P3/8/8/8/8/8/K7 w - - 0 1", "White to move. What is the best move?", ["Pawn to e8 and promotes to a queen", "King to a2", "King to b2", "King to b1"], "The pawn reaches the last rank and becomes a queen."], ["7k/8/8/3pP3/8/8/8/K7 w - d6 0 1", "Black just played d7–d5. Which special capture can White make?", ["Pawn takes d6", "Pawn to e6", "King to a2", "King to b2"], "En passant: the pawn on e5 takes the d5 pawn as if it had moved only one square."], ["4k3/8/8/8/8/8/8/R3K3 w Q - 0 1", "White to move. Which move gives check?", ["Rook to a8", "Rook to a7", "Rook to b1", "King to d2"], "The rook attacks the king along the 8th rank."], ["4r2k/8/8/8/8/8/3R4/4K3 w - - 0 1", "White is in check. Which move blocks the check?", ["Rook to e2", "King to f2", "King to f1", "King to d1"], "The rook moves between the black rook and the white king."], ["7k/8/8/8/8/8/8/r5K1 w - - 0 1", "White is in check from the rook. Which move is legal?", ["King to g2", "King to f1", "King to h1", "Stay and do nothing"], "The king must leave the 1st rank: f1 and h1 are still attacked by the rook."]];
  LIVE.CHESS_RULES = [
    ['Which piece moves in an L shape?', ['Knight', 'Bishop', 'Rook', 'King'], 'Two squares one way, then one square to the side.'],
    ['Which piece is the strongest?', ['Queen', 'King', 'Rook', 'Knight'], 'The queen moves like a rook and a bishop together.'],
    ['Which piece can jump over other pieces?', ['Knight', 'Queen', 'Bishop', 'Pawn'], 'Only the knight can jump.'],
    ['Which piece always stays on squares of one colour?', ['Bishop', 'Rook', 'Knight', 'King'], 'A bishop moves only diagonally, so it never changes colour.'],
    ['Which piece moves only one square in any direction?', ['King', 'Queen', 'Knight', 'Bishop'], 'The king is slow, but the game is about him.'],
    ['Which piece moves in straight lines along files and ranks?', ['Rook', 'Bishop', 'Knight', 'Pawn'], 'The rook goes up, down, left and right.'],
    ['How many squares are there on a chessboard?', ['64', '32', '48', '100'], '8 files × 8 ranks = 64 squares.'],
    ['Who moves first in chess?', ['White', 'Black', 'The older player', 'The younger player'], 'White always makes the first move.'],
    ['How does a pawn capture?', ['Diagonally forward', 'Straight forward', 'Sideways', 'Backwards'], 'A pawn moves forward but captures one square diagonally.'],
    ['On its first move, how far can a pawn go?', ['One or two squares', 'Only one square', 'Three squares', 'As far as it likes'], 'After the first move, only one square at a time.'],
    ['The king is attacked and there is no way out. This is…', ['checkmate', 'check', 'stalemate', 'castling'], 'Checkmate ends the game.'],
    ['A player has no legal move, but the king is not in check. This is…', ['stalemate', 'checkmate', 'check', 'en passant'], 'Stalemate is a draw.'],
    ['A pawn reaches the last rank. What happens?', ['It becomes another piece', 'It goes back to the start', 'It leaves the board', 'It becomes a king'], 'This is called promotion. Most players choose a queen.'],
    ['Castling is a special move of the king and…', ['a rook', 'a knight', 'the queen', 'a pawn'], 'The king moves two squares towards the rook, and the rook jumps over the king.'],
    ['About how many pawns is a rook worth?', ['5', '3', '9', '1'], 'Pawn 1, knight 3, bishop 3, rook 5, queen 9.'],
    ['About how many pawns is a queen worth?', ['9', '5', '3', '12'], 'Pawn 1, knight 3, bishop 3, rook 5, queen 9.'],
    ['About how many pawns is a knight worth?', ['3', '1', '5', '9'], 'Knights and bishops are worth about 3 pawns.'],
    ['The rows of the board (1 to 8) are called…', ['ranks', 'files', 'diagonals', 'lines'], 'Rows are ranks; columns (a to h) are files.'],
    ['The columns of the board (a to h) are called…', ['files', 'ranks', 'diagonals', 'rows'], 'Columns are files; rows are ranks.'],
    ['Your king is in check. What must you do?', ['Get out of check at once', 'Nothing', 'Give up the game', 'Move any piece you like'], 'Move the king, block the check, or capture the attacker.'],
    ['Can a king move to a square where it is in check?', ['No, never', 'Yes, always', 'Only once a game', 'Only when castling'], 'A king can never move into check.'],
    ['One piece attacks two enemy pieces at the same time. This is called…', ['a fork', 'a pin', 'a castle', 'a draw'], 'Knights are very good at forks.'],
    ['Which is a good idea in the opening?', ['Bring out knights and bishops', 'Move only the queen', 'Move the king forward', 'Move the same piece again and again'], 'Develop your pieces and castle early.'],
    ['Which squares are the centre of the board?', ['d4, d5, e4, e5', 'a1, a8, h1, h8', 'a4, b5, g4, h5', 'c1, d1, e1, f1'], 'Pieces in the centre control more squares.']
  ];
  LIVE.CHESS_WORDS = [['шах', 'check'], ['мат', 'checkmate'], ['пат', 'stalemate'], ['ничья', 'a draw'], ['ладья', 'rook'], ['слон', 'bishop'], ['ферзь', 'queen'], ['конь', 'knight'], ['пешка', 'pawn'], ['король', 'king'],
    ['рокировка', 'castling'], ['доска', 'board'], ['клетка, поле', 'square'], ['взятие на проходе', 'en passant'], ['превращение пешки', 'promotion'], ['ход', 'a move'], ['брать (фигуру)', 'to capture'], ['соперник', 'opponent'], ['сдаваться', 'to resign'], ['вилка', 'a fork']];
  LIVE.CHESS_NOTE = [['Nf3', 'Knight to f3'], ['Bxe5', 'Bishop takes e5'], ['O-O', 'Castle kingside'], ['O-O-O', 'Castle queenside'], ['Qh5+', 'Queen to h5, check'], ['Rxa8#', 'Rook takes a8, checkmate'], ['e4', 'Pawn to e4'], ['Kd2', 'King to d2'], ['exd5', 'Pawn takes d5'], ['e8=Q', 'Pawn to e8, promotes to a queen']];
  LIVE.chess = function (c) {
    var f = c.chess || 'mix', qs = [], mk = function (p, o, x, k) { var right = o[0], s = LIVE.shuffle(o); qs.push({ p: p, o: s, a: s.indexOf(right), x: x || '', k: k || 'c' }); };
    if (f === 'mix' || f === 'puzzles') LIVE.CHESS_PUZ.forEach(function (q) { mk('⟦' + q[0] + '⟧' + q[1], q[2], q[3]); });
    if (f === 'mix' || f === 'rules') LIVE.CHESS_RULES.forEach(function (q) { mk('♟️ ' + q[0], q[1], q[2]); });
    if (f === 'mix' || f === 'words') {
      var W = LIVE.CHESS_WORDS, N = LIVE.CHESS_NOTE;
      W.forEach(function (w) { var o = [w[1]].concat(LIVE.shuffle(W.filter(function (x) { return x !== w; })).slice(0, 3).map(function (x) { return x[1]; })); mk('How do you say «' + w[0] + '» in English?', o, w[0] + ' — ' + w[1], 'v'); });
      N.forEach(function (n) { var o = [n[1]].concat(LIVE.shuffle(N.filter(function (x) { return x !== n; })).slice(0, 3).map(function (x) { return x[1]; })); mk('How do you say the move “' + n[0] + '” in English?', o, n[0] + ' = ' + n[1], 'v'); });
    }
    qs = LIVE.shuffle(qs);
    return c.count && c.count !== 'all' ? qs.slice(0, +c.count) : qs;
  };
  LIVE.CHESS_FOCUS = [['mix', 'Mixed'], ['puzzles', 'Puzzles on the board'], ['rules', 'Pieces & rules'], ['words', 'Chess words & moves']];
  var CHG = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
  LIVE.board = function (fen) {
    var rows = String(fen).split(' ')[0].split('/'), h = '<span class="qboard">';
    rows.forEach(function (row, r) {
      var c = 0;
      row.split('').forEach(function (ch) {
        var cell = function (inner) { h += '<i class="' + ((r + c) % 2 ? 'dk' : '') + '">' + inner + (c === 0 ? '<s class="rk">' + (8 - r) + '</s>' : '') + (r === 7 ? '<s class="fl">' + 'abcdefgh'[c] + '</s>' : '') + '</i>'; c++; };
        if (/\d/.test(ch)) { for (var i = 0; i < +ch; i++) cell(''); return; }
        if (CHG[ch.toLowerCase()]) cell('<b class="' + (ch === ch.toUpperCase() ? 'w' : 'k') + '">' + CHG[ch.toLowerCase()] + '</b>');
      });
    });
    return h + '</span>';
  };
  /* ---- game modes ----
     self: everyone plays at their own speed during a timed round (phase 'race'); power modes add rewards after right answers.
     The host decides anything that touches another player (steal, swap, hack) so totals stay fair. */
  LIVE.MODES = {
    classic: { name: 'Classic', icon: '🎯', tag: 'Teacher-paced', blurb: 'One question at a time on the big screen. Students answer on their phones; faster right answers score more.' },
    race: { name: 'Race', icon: '🏁', tag: 'Self-paced', self: true, unit: 'points', blurb: 'Everyone answers at their own speed. The screen shows a live 3D race. With driving on, students steer their own car on the phone for a few seconds after every answer: a right answer gives turbo, a wrong answer a slow car. A wrong answer freezes the player for a moment.' },
    gold: { name: 'Treasure Hunt', icon: '🪙', tag: 'Self-paced · chests', self: true, power: true, unit: 'gold', cur: '🪙', blurb: 'Every right answer opens a treasure chest: gold, double, triple… or steal from a classmate, or swap totals! Most gold wins.' },
    hack: { name: 'Cyber Heist', icon: '💻', tag: 'Self-paced · hacking', self: true, power: true, unit: 'crypto', cur: '₿', blurb: 'Students pick a secret password. Right answers mine crypto; hack classmates by guessing their password and steal their coins. Fair play built in: hacked servers reboot with a new password and a shield, the whole network resets every 90 seconds, honeypot servers trap hackers, and hacking the same classmate again earns less until their firewall traces you back — so teaming up does not pay.' },
    fish: { name: 'Fishing Frenzy', icon: '🎣', tag: 'Self-paced · catches', self: true, power: true, unit: 'kg', cur: 'kg', blurb: 'Every right answer casts a line. Catch heavier and rarer fish; Frenzy time doubles every catch. The heaviest haul wins.' },
    tug: { name: 'Tug of War', icon: '🪢', tag: '2 teams · great for kids', self: true, power: true, unit: 'pulls', cur: '💪', blurb: 'Two teams pull a rope on the big screen. Every right answer is a pull for your team. The first team to pull the rope over its line wins!' },
    boss: { name: 'Boss Battle', icon: '👾', tag: 'Whole class together', self: true, power: true, unit: 'hits', cur: '⚔️', blurb: 'The whole class fights Mumbleclaw the Word Monster. Every right answer is a hit; streaks hit harder. Beat the monster before time runs out!' },
    balloon: { name: 'Balloon Race', icon: '🎈', tag: 'Self-paced · great for kids', self: true, power: true, unit: 'm', cur: 'm', blurb: 'Every right answer lifts your hot-air balloon higher. The screen shows everyone floating up. Highest balloon wins!' },
    kart: { name: 'Kart Quest', icon: '🏎️', tag: 'Self-paced · great for kids', self: true, power: true, unit: 'laps', cur: '🏁', blurb: 'From IF Kids Quest: every right answer drives your kart forward, and 3 in a row gives a turbo boost. The big screen shows the whole class racing to the finish flag. A wrong answer makes your kart spin out!' },
    mine: { name: 'Block Mine', icon: '⛏️', tag: 'Self-paced · like Minecraft', self: true, power: true, unit: 'gems', cur: '💎', blurb: 'From IF Block Quest: every right answer lets you mine one of three blocks — stone, coal, iron, gold or diamond… or TNT! Collect the most gems to win. A wrong answer drops some of your gems.' },
    cash: { name: 'Bank Heist', icon: '💰', tag: 'Self-paced · crew upgrades', self: true, power: true, unit: 'coins', cur: '💰', blurb: 'Break into the IF National Bank! Every right answer grabs cash for your money bag. Spend it in the crew shop on bigger bags, streak bonuses and getaway multipliers. The richest robber wins!' },
    match: { name: 'Team Match', icon: '🤝', tag: 'Teams · talk together', team: true, unit: 'points', blurb: 'Played in teams. The answers are split across teammates\' phones, so they must talk to find the right one. A wrong answer sends the team back to zero!' }
  };
  /* a question that starts with a picture (emoji) shows the picture big: Young Learners questions */
  LIVE.qhtml = function (p, esc) {
    var t = String(p || ''), bd = t.match(/^⟦([^⟧]+)⟧\s*/);
    if (bd) return LIVE.board(bd[1]) + '<span class="qbt">' + esc(t.slice(bd[0].length)) + '</span>';
    var m = t.match(/^((?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\u200d|\ufe0f)+)\s*(.*)$/u);
    return m ? '<span class="qpic">' + esc(m[1]) + '</span>' + esc(m[2]) : esc(t);
  };
  LIVE.mode = function (m) { return LIVE.MODES[m] || LIVE.MODES.classic; };
  LIVE.PASSWORDS = ['pancake', 'dragon42', 'lemonade', 'galaxy', 'tiger7', 'banana', 'rocket', 'snowball', 'pizza99', 'thunder', 'unicorn', 'cactus',
    'falcon', 'meteor', 'pixel88', 'cobra', 'jupiter', 'waffle', 'blizzard', 'panda', 'neon77', 'avocado', 'vortex', 'koala', 'laser', 'mango', 'nebula', 'penguin',
    'quantum', 'raptor', 'saturn', 'tornado', 'violet', 'wizard', 'yeti', 'zebra', 'comet', 'donut', 'ember', 'glacier', 'hydra', 'icicle', 'jaguar', 'kiwi',
    'lynx', 'matrix', 'ninja', 'orbit', 'phoenix', 'robot', 'shadow', 'turbo', 'volcano', 'whale'];
  LIVE.fmtN = function (n) { n = Math.round(+n || 0); var A = Math.abs(n), T = [[1e12, 'tn'], [1e9, 'bn'], [1e6, 'M']]; for (var i = 0; i < 3; i++) if (A >= T[i][0]) return (n / T[i][0]).toFixed(A / T[i][0] >= 100 ? 0 : A / T[i][0] >= 10 ? 1 : 2).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '') + T[i][1]; return A >= 10000 ? (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, '') + 'k' : String(n); };

  /* little sound effects (no files): ok, no, coin, bad, win, hack, splash */
  var AC = null;
  /* The narrator on the big screen: reads what happens in the game aloud, in English. One line at a time, with a
     pause between lines so it never talks non-stop. Switched on and off with the Narrator button (kept on this device). */
  LIVE.narr = { on: LIVE.ls.get('live.narr') !== false, last: 0, text: '' };
  LIVE.narrate = function (text, urgent) {
    if (!LIVE.narr.on || !window.speechSynthesis) return;
    var t = String(text || '').replace(/[^\w\s.,!?'’:;-]/g, ' ').replace(/\s+/g, ' ').trim(), now = Date.now();
    if (!t || t === LIVE.narr.text && now - LIVE.narr.last < 20000) return;
    if (!urgent && (now - LIVE.narr.last < 5000 || speechSynthesis.speaking)) return;
    try { if (urgent) speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; u.rate = 1.02; u.pitch = 1.05; speechSynthesis.speak(u); LIVE.narr.last = now; LIVE.narr.text = t; } catch (e) {}
  };
  LIVE.sfx = function (kind) {
    if (LIVE.sfx.off) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var notes = { ok: [[660, .08], [880, .12]], no: [[220, .18]], coin: [[988, .06], [1319, .14]], bad: [[330, .12], [247, .2]], win: [[523, .1], [659, .1], [784, .1], [1047, .25]], hack: [[1200, .04], [900, .04], [1200, .04], [900, .08]], splash: [[180, .06], [140, .12]] }[kind] || [[600, .1]];
      var t = AC.currentTime;
      notes.forEach(function (n) {
        var o = AC.createOscillator(), g = AC.createGain();
        o.type = kind === 'no' || kind === 'bad' ? 'sawtooth' : 'triangle'; o.frequency.value = n[0];
        g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + n[1]);
        o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + n[1] + .02); t += n[1] * .9;
      });
    } catch (e) {}
  };
  LIVE.sfx.off = !!LIVE.ls.get('live.mute');

  LIVE.qr = function (text) { var q = qrcode(0, 'M'); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); };
})();
