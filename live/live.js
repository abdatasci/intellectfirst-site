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
  LIVE.api = async function (path, body) {
    var res = await fetch('/api/live/' + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), credentials: 'same-origin' } : { credentials: 'same-origin' });
    if (res.status === 401 && !LIVE.api.retried && window.NFIdentity) { LIVE.api.retried = true; try { await NFIdentity.refreshSession(); } catch (e) {} return LIVE.api(path, body); }
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
    if (bank.kind === 'g') {
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
  LIVE.isLong = function (o) { return o.some(function (s) { return String(s).length > 34; }); };

  /* light obfuscation of answers sent to phones in race mode (keeps the answer out of plain sight) */
  LIVE.hide = function (a, salt) { return (a + 7 * (salt % 13) + 3) % 97; };
  LIVE.unhide = function (h, salt) { return ((h - 3 - 7 * (salt % 13)) % 97 + 97) % 97; };

  /* ---- General English (any level / topic, not tied to a book) ---- */
  LIVE.LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
  LIVE.FOCUS = [['mix', 'Mixed'], ['vocab', 'Vocabulary'], ['grammar', 'Grammar'], ['speaking', 'Everyday English'], ['exam', 'Exam practice']];
  LIVE.TOPICS = ['Daily life', 'Food & drink', 'Travel', 'Family & friends', 'School & study', 'Work & jobs', 'Technology', 'Health & sport', 'Shopping & money', 'Nature & environment', 'Cities & places', 'Films, music & art', 'Feelings', 'Holidays & celebrations'];
  var LEVEL_BANKS = { A1: ['v-A1', 'v-Movers'], A2: ['v-A2', 'v-Flyers', 'v-KET', 'g-A2'], B1: ['v-B1', 'v-PET', 'v-TeensB1', 'g-B1'], B2: ['v-B2', 'v-TeensB2', 'g-B2'], C1: ['v-C1', 'v-IELTS', 'g-C1', 'g-IELTS'] };
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

  LIVE.qr = function (text) { var q = qrcode(0, 'M'); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); };
})();
