/* IF Kids Quest — an English story adventure for Young Learners, built on the Phaser 3 game engine.
   World map → each land has a Story, a Word Kart race and a Word Mine. Each finished activity gives a feather;
   feathers open the next land and hatch Pip the owl. Progress is kept on this device. */
(function () {
  var W = 960, H = 540, FONT = '"Baloo 2", "Arial Rounded MT Bold", Arial, sans-serif';
  var LANDS = window.KQ_LANDS;
  var NAVY = 0x13294b, GOLD = 0xc9a24e, INK = '#2d2a3e';

  /* ---------- save ---------- */
  var SAVE = (function () { try { return JSON.parse(localStorage.getItem('kq-save') || '{}'); } catch (e) { return {}; } })();
  SAVE.done = SAVE.done || {};
  var persist = function () { try { localStorage.setItem('kq-save', JSON.stringify(SAVE)); } catch (e) {} };
  var landDone = function (id) { return SAVE.done[id] || (SAVE.done[id] = {}); };
  var feathersIn = function (id) { var d = SAVE.done[id] || {}; return ['story', 'kart', 'mine'].filter(function (k) { return d[k]; }).length; };
  var feathers = function () { return LANDS.reduce(function (s, l) { return s + feathersIn(l.id); }, 0); };
  var unlocked = function (i) { return SAVE.all || i === 0 || feathersIn(LANDS[i - 1].id) >= 2; };

  /* ---------- voice (real recorded voices plug in here later: window.KQ_AUDIO = { 'text': 'url.mp3' }) ---------- */
  var voice = null;
  var pickVoice = function () {
    if (!window.speechSynthesis) return;
    var vs = speechSynthesis.getVoices();
    voice = vs.find(function (v) { return /en-GB/i.test(v.lang) && /female|Serena|Kate|Libby|Sonia|Google UK English Female/i.test(v.name); }) ||
      vs.find(function (v) { return /en-GB/i.test(v.lang); }) || vs.find(function (v) { return /^en/i.test(v.lang); }) || null;
  };
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  var audioEl = null;
  var say = function (text, rate) {
    text = String(text).replace(/___/g, 'blank');
    var url = window.KQ_AUDIO && KQ_AUDIO[text];
    if (url) { try { if (audioEl) audioEl.pause(); audioEl = new Audio(url); audioEl.play(); return; } catch (e) {} }
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = rate || 0.88; u.pitch = 1.05; if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  };

  /* ---------- tiny sound effects (Web Audio) ---------- */
  var actx = null;
  var sfx = function (kind) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var notes = { good: [660, 880, 1175], bad: [300, 220], tap: [520], dig: [180], gem: [880, 1320], win: [523, 659, 784, 1047], go: [440, 440, 440, 880] }[kind] || [440];
      notes.forEach(function (f, i) {
        var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * (kind === 'go' ? 0.5 : 0.09);
        o.type = kind === 'dig' ? 'square' : kind === 'bad' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(kind === 'dig' ? 0.05 : 0.12, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + 0.25);
      });
    } catch (e) {}
  };

  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var hex = function (n) { return '#' + ('000000' + n.toString(16)).slice(-6); };
  var picOf = function (land, word) { var f = land.words.find(function (w) { return w[0] === word || w[0] + 's' === word; }); return f ? 'p_' + f[1] : null; };

  /* ---------- UI helpers ---------- */
  function fixAll(o) { if (o.setScrollFactor) { o.scrollFactorX = 0; o.scrollFactorY = 0; } if (o.list) o.list.forEach(fixAll); return o; }
  function txt(s, x, y, str, size, color, opt) {
    opt = opt || {};
    return s.add.text(x, y, str, Object.assign({ fontFamily: FONT, fontSize: (size || 28) + 'px', color: color || INK, fontStyle: '800', align: 'center' }, opt)).setOrigin(opt.ox == null ? 0.5 : opt.ox, opt.oy == null ? 0.5 : opt.oy);
  }
  function button(s, x, y, w, h, label, o, cb) {
    o = o || {};
    var c = s.add.container(x, y), g = s.add.graphics();
    var draw = function (down) {
      g.clear();
      g.fillStyle(o.shadow != null ? o.shadow : 0x000000, o.shadow != null ? 1 : 0.18).fillRoundedRect(-w / 2, -h / 2 + 6, w, h, o.r || 22);
      g.fillStyle(o.fill != null ? o.fill : 0xffffff, 1).fillRoundedRect(-w / 2, -h / 2 + (down ? 4 : 0), w, h, o.r || 22);
      g.lineStyle(o.line ? 4 : 0, o.line || 0, 1); if (o.line) g.strokeRoundedRect(-w / 2, -h / 2 + (down ? 4 : 0), w, h, o.r || 22);
    };
    draw(false); c.add(g);
    if (o.icon) { var im = s.add.image(o.label === false ? 0 : -w / 2 + h / 2 + 4, 0, o.icon); im.setScale(Math.min((h - 16) / im.height, (o.iconW || h - 16) / im.width)); c.add(im); }
    if (label) { var t = txt(s, o.icon ? h / 2 + 4 : 0, 0, label, o.size || 26, o.color || INK, { wordWrap: { width: w - (o.icon ? h + 10 : 24) } }); c.add(t); c.label = t; }
    var z = s.add.zone(0, 0, w, h).setInteractive({ useHandCursor: true }); c.add(z);
    z.on('pointerdown', function () { draw(true); });
    z.on('pointerout', function () { draw(false); });
    z.on('pointerup', function () { draw(false); if (!c.disabled) { sfx('tap'); cb && cb(c); } });
    c.redraw = function (fill, line) { o.fill = fill; o.line = line; draw(false); };
    c.w = w; c.h = h;
    return c;
  }
  function sky(s, land, w, h) {
    var g = s.add.graphics();
    g.fillGradientStyle(land.sky[0], land.sky[0], land.sky[1], land.sky[1], 1).fillRect(0, 0, w || W, h || H);
    if (land.night) for (var i = 0; i < 70; i++) g.fillStyle(0xffffff, Math.random() * 0.8 + 0.2).fillCircle(Math.random() * W, Math.random() * H * 0.6, Math.random() * 2 + 0.6);
    return g;
  }
  function speaker(s, x, y, getText, size) {
    size = size || 56;
    var b = button(s, x, y, size, size, '', { fill: 0x7c4dff, shadow: 0x4b2bb3, r: size / 2 }, function () { say(getText()); });
    var t = txt(s, 0, 0, '🔊', size * 0.5, '#fff'); b.add(t);
    return b;
  }

  /* ================= BOOT: turn the drawings into textures ================= */
  var Boot = new Phaser.Class({
    Extends: Phaser.Scene, initialize: function () { Phaser.Scene.call(this, 'boot'); },
    create: function () {
      var s = this, jobs = [], A = window.KQ_ART;
      txt(s, W / 2, H / 2, 'Loading…', 34, '#fff');
      var add = function (key, uri) {
        if (!uri) return;
        jobs.push(new Promise(function (res) { var im = new Image(); im.onload = function () { s.textures.addImage(key, im); res(); }; im.onerror = res; im.src = uri; }));
      };
      var heights = { mia: 300, bolt: 190, kart: 190, egg: 150, crack: 150, pip: 190, feather: 80, gem: 90, tree: 200, pine: 220, candy: 200, house: 170, mountain: 200, farm: 180 };
      A.chars.forEach(function (c) { add('c_' + c, A.char(c, heights[c] || 160)); });
      var pics = {};
      LANDS.forEach(function (l) { l.words.forEach(function (w) { pics[w[1]] = 1; }); l.mine.forEach(function (q) { if (q.pic) pics[q.pic] = 1; }); l.props.forEach(function (p) { if (A.pic(p)) pics[p] = 1; }); });
      ['sun', 'star2', 'planet', 'rocket'].forEach(function (p) { pics[p] = 1; });
      Object.keys(pics).forEach(function (p) { add('p_' + p, A.pic(p, 220)); });
      var go = function () { s.scene.start('map'); };
      Promise.all(jobs).then(function () { (document.fonts && document.fonts.load ? document.fonts.load('800 28px "Baloo 2"').catch(function () {}) : Promise.resolve()).then(go, go); });
    }
  });

  /* ================= MAP ================= */
  var NODES = [[180, 380], [330, 190], [560, 150], [770, 250], [700, 430]];
  var MapScene = new Phaser.Class({
    Extends: Phaser.Scene, initialize: function () { Phaser.Scene.call(this, 'map'); },
    create: function () {
      var s = this, g = s.add.graphics();
      g.fillGradientStyle(0x8fd3ff, 0x8fd3ff, 0xd8f0ff, 0xd8f0ff, 1).fillRect(0, 0, W, H);
      for (var i = 0; i < 26; i++) g.lineStyle(3, 0xffffff, 0.5).beginPath().arc(Math.random() * W, Math.random() * H, 12, Math.PI * 1.1, Math.PI * 1.9).strokePath();
      g.fillStyle(0xfff0c2, 1).fillEllipse(W / 2, H / 2 + 20, 900, 470);
      g.fillStyle(0x9fdc8a, 1).fillEllipse(W / 2, H / 2 + 20, 860, 430);
      g.fillStyle(0x8fd07a, 1).fillEllipse(W / 2 - 160, H / 2 + 80, 380, 220);
      // land patches
      var tint = [0xffd7ec, 0xfff1b8, 0xd9e2ff, 0xf4f8ff, 0x3a2f7a];
      NODES.forEach(function (p, i) { g.fillStyle(tint[i], 0.95).fillEllipse(p[0], p[1] + 6, 190, 120); });
      s.add.image(NODES[3][0] + 10, NODES[3][1] - 34, 'c_mountain').setScale(0.75).setAlpha(0.9);
      s.add.image(NODES[1][0] - 70, NODES[1][1] + 6, 'c_farm').setScale(0.42);
      [[90, 300], [120, 460], [420, 470], [470, 330], [600, 330], [880, 380], [250, 300]].forEach(function (p) { s.add.image(p[0], p[1], 'c_tree').setScale(0.28); });
      // dashed path
      var pg = s.add.graphics().lineStyle(6, 0xffffff, 1);
      for (var k = 0; k < NODES.length - 1; k++) {
        var a = NODES[k], b = NODES[k + 1], d = Phaser.Math.Distance.Between(a[0], a[1], b[0], b[1]), n = Math.floor(d / 22);
        for (var j = 0; j < n; j += 2) pg.lineBetween(a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n, a[0] + (b[0] - a[0]) * (j + 1) / n, a[1] + (b[1] - a[1]) * (j + 1) / n);
      }
      // egg in the middle
      var f = feathers(), total = LANDS.length * 3;
      if (f >= total) {
        var pip = s.add.image(480, 330, 'c_pip').setScale(0.7);
        s.tweens.add({ targets: pip, y: 300, yoyo: true, repeat: -1, duration: 500, ease: 'Sine.easeOut' });
        txt(s, 480, 400, 'Pip hatched!', 24, '#fff', { stroke: '#7c4dff', strokeThickness: 6 });
      } else {
        var egg = s.add.image(480, 330, 'c_egg').setScale(0.55);
        if (f >= 5) s.add.image(480, 330, 'c_crack').setScale(0.55);
        if (f >= 10) s.add.image(480, 312, 'c_crack').setScale(0.42).setAngle(14);
        s.tweens.add({ targets: egg, angle: { from: -4, to: 4 }, yoyo: true, repeat: -1, duration: 700 });
        s.add.graphics().fillStyle(0xc9b6ff, 1).fillRoundedRect(430, 370, 100, 18, 9);
      }
      // nodes
      LANDS.forEach(function (l, i) {
        var p = NODES[i], open = unlocked(i), c = s.add.container(p[0], p[1]);
        var ring = s.add.graphics();
        ring.fillStyle(0x000000, 0.18).fillCircle(0, 8, 52);
        ring.fillStyle(open ? 0xffffff : 0x3b2f7a, 1).fillCircle(0, 0, 52);
        ring.fillStyle(open ? [0xff7ab8, 0xffc23d, 0x6c8cff, 0x7fd3ff, 0x7c4dff][i] : 0x4d3f99, 1).fillCircle(0, 0, 44);
        c.add(ring);
        c.add(s.add.image(0, 0, 'p_' + l.words[0][1]).setScale(0.3).setAlpha(open ? 1 : 0.35));
        if (!open) c.add(txt(s, 0, 2, '🔒', 40, '#fff'));
        c.add(txt(s, 0, 72, l.name, 24, '#fff', { stroke: INK, strokeThickness: 6 }));
        var fi = feathersIn(l.id);
        for (var q = 0; q < 3; q++) c.add(s.add.image(-26 + q * 26, -58, 'c_feather').setScale(0.28).setAlpha(q < fi ? 1 : 0.25));
        var z = s.add.zone(0, 0, 120, 120).setInteractive({ useHandCursor: true }); c.add(z);
        z.on('pointerup', function () { sfx('tap'); if (!open) { say('Find two feathers in ' + LANDS[i - 1].name + ' first.'); s.cameras.main.shake(150, 0.004); return; } s.landMenu(i); });
        if (open && fi < 3) s.tweens.add({ targets: c, scale: 1.06, yoyo: true, repeat: -1, duration: 650 });
      });
      // Mia stands by the newest open land
      var cur = 0; LANDS.forEach(function (l, i) { if (unlocked(i)) cur = i; });
      var mia = s.add.image(NODES[cur][0] - 70, NODES[cur][1] - 10, 'c_mia').setScale(0.26);
      s.tweens.add({ targets: mia, y: mia.y - 8, yoyo: true, repeat: -1, duration: 500 });
      // header
      txt(s, W / 2, 34, 'IF Kids Quest', 40, '#fff', { stroke: '#13294b', strokeThickness: 8 });
      txt(s, W / 2, 72, 'Feathers: ' + f + ' / ' + total, 24, '#fff', { stroke: '#13294b', strokeThickness: 6 });
      var gear = button(s, W - 46, 40, 60, 60, '', { fill: 0x13294b, shadow: 0x0a1630, r: 30 }, function () { s.teacherMenu(); });
      gear.add(txt(s, 0, 0, '⚙️', 28, '#fff'));
      if (!SAVE.seen) { SAVE.seen = 1; persist(); s.time.delayedCall(500, function () { say('Hello! Tap Rainbow Valley to start.'); }); }
    },
    landMenu: function (i) {
      var s = this, l = LANDS[i], d = landDone(l.id), layer = s.add.container(0, 0).setDepth(50);
      var dim = s.add.rectangle(W / 2, H / 2, W, H, 0x0b1230, 0.55).setInteractive(); layer.add(dim);
      var g = s.add.graphics(); g.fillStyle(0xffffff, 1).fillRoundedRect(150, 50, 660, 440, 30); g.lineStyle(6, 0x7c4dff, 1).strokeRoundedRect(150, 50, 660, 440, 30); layer.add(g);
      layer.add(txt(s, W / 2, 96, l.name, 40, '#13294b'));
      layer.add(txt(s, W / 2, 134, l.level + ' · ' + l.ru, 20, '#7c4dff'));
      // word strip: tap to hear
      var ws = l.words.slice(0, 8), step = Math.min(78, 600 / ws.length);
      ws.forEach(function (w, k) {
        var x = W / 2 - (ws.length - 1) * step / 2 + k * step, im = s.add.image(x, 190, 'p_' + w[1]).setScale(0.28).setInteractive({ useHandCursor: true });
        im.on('pointerup', function () { say(w[0]); s.tweens.add({ targets: im, scale: 0.34, yoyo: true, duration: 120 }); });
        layer.add(im);
      });
      layer.add(txt(s, W / 2, 232, 'Tap a picture to hear the word', 17, '#5d6676'));
      var acts = [['story', '📖  Story', 'StoryS'], ['kart', '🏎️  Word Kart', 'kart'], ['mine', '⛏️  Word Mine', 'mine']];
      acts.forEach(function (a, k) {
        var b = button(s, W / 2 - 20, 280 + k * 66, 440, 56, a[1] + (d[a[0]] ? '   ✓' : ''), { fill: d[a[0]] ? 0xe7f8e9 : 0xf3eeff, line: d[a[0]] ? 0x4cc76a : 0x7c4dff, size: 26 }, function () {
          s.scene.start(a[2], { land: i });
        });
        layer.add(b);
        layer.add(s.add.image(W / 2 + 230, 280 + k * 66, 'c_feather').setScale(0.36).setAlpha(d[a[0]] ? 1 : 0.25));
      });
      var close = button(s, 780, 74, 52, 52, '✕', { fill: 0xffffff, line: 0xdddddd, r: 26, size: 26 }, function () { layer.destroy(); });
      layer.add(close);
      say(l.name);
    },
    teacherMenu: function () {
      var s = this, layer = s.add.container(0, 0).setDepth(60);
      layer.add(s.add.rectangle(W / 2, H / 2, W, H, 0x0b1230, 0.6).setInteractive());
      var g = s.add.graphics(); g.fillStyle(0xffffff, 1).fillRoundedRect(230, 110, 500, 320, 26); layer.add(g);
      layer.add(txt(s, W / 2, 150, 'For teachers and parents', 28, '#13294b'));
      layer.add(button(s, W / 2, 220, 400, 54, SAVE.all ? 'Lock lands again' : 'Open all lands', { fill: 0xf3eeff, line: 0x7c4dff }, function () { SAVE.all = !SAVE.all; persist(); s.scene.restart(); }));
      layer.add(button(s, W / 2, 290, 400, 54, 'Start again (clear feathers)', { fill: 0xfff0f0, line: 0xe94f64 }, function () { SAVE.done = {}; persist(); s.scene.restart(); }));
      layer.add(button(s, W / 2, 370, 200, 50, 'Close', { fill: 0xffffff, line: 0xdddddd }, function () { layer.destroy(); }));
    }
  });

  /* ---------- feather reward (shared) ---------- */
  function reward(s, land, kind, msg, stars) {
    var first = !landDone(land.id)[kind];
    landDone(land.id)[kind] = 1; persist();
    var layer = s.add.container(0, 0).setDepth(100).setScrollFactor(0);
    layer.add(s.add.rectangle(W / 2, H / 2, W, H, 0x0b1230, 0.6).setInteractive());
    var g = s.add.graphics(); g.fillStyle(0xffffff, 1).fillRoundedRect(220, 80, 520, 380, 30); layer.add(g);
    var f = s.add.image(W / 2, 190, 'c_feather').setScale(0.1); layer.add(f);
    s.tweens.add({ targets: f, scale: 1.1, angle: 360, duration: 700, ease: 'Back.easeOut' });
    layer.add(txt(s, W / 2, 290, first ? 'You found a feather!' : 'Well done!', 36, '#7c4dff'));
    layer.add(txt(s, W / 2, 330, msg || '', 22, '#13294b'));
    if (stars != null) layer.add(txt(s, W / 2, 368, '⭐'.repeat(stars) + '☆'.repeat(3 - stars), 34, '#ffb000'));
    layer.add(button(s, W / 2, 418, 260, 56, 'Back to the map', { fill: 0x7c4dff, shadow: 0x4b2bb3, color: '#fff' }, function () { s.scene.start('map'); }));
    fixAll(layer); sfx('win'); say(first ? 'You found a feather! Well done!' : 'Well done!');
  }
  function tryAgain(s, land, sceneKey, msg) {
    var layer = s.add.container(0, 0).setDepth(100).setScrollFactor(0);
    layer.add(s.add.rectangle(W / 2, H / 2, W, H, 0x0b1230, 0.6).setInteractive());
    var g = s.add.graphics(); g.fillStyle(0xffffff, 1).fillRoundedRect(240, 120, 480, 300, 30); layer.add(g);
    layer.add(txt(s, W / 2, 190, 'Nearly!', 40, '#e94f64'));
    layer.add(txt(s, W / 2, 240, msg, 22, '#13294b', { wordWrap: { width: 420 } }));
    layer.add(button(s, W / 2 - 110, 340, 200, 56, 'Try again', { fill: 0x7c4dff, shadow: 0x4b2bb3, color: '#fff' }, function () { s.scene.restart({ land: LANDS.indexOf(land) }); }));
    layer.add(button(s, W / 2 + 110, 340, 200, 56, 'Map', { fill: 0xffffff, line: 0xdddddd }, function () { s.scene.start('map'); }));
    fixAll(layer); say('Nearly! Try again.');
  }
  function backBtn(s) {
    var b = button(s, 46, 40, 60, 60, '', { fill: 0xffffff, line: 0xdddddd, r: 30 }, function () { if (window.speechSynthesis) speechSynthesis.cancel(); s.scene.start('map'); });
    b.add(txt(s, 0, 0, '🏠', 28)); fixAll(b); b.setDepth(90); return b;
  }

  /* ================= STORY ================= */
  var StoryScene = new Phaser.Class({
    Extends: Phaser.Scene, initialize: function () { Phaser.Scene.call(this, 'StoryS'); },
    init: function (d) { this.li = d.land; this.land = LANDS[d.land]; this.step = 0; },
    create: function () {
      var s = this, l = s.land;
      sky(s, l);
      var g = s.add.graphics();
      g.fillStyle(l.ground2, 1).fillEllipse(250, 560, 900, 260); g.fillStyle(l.ground, 1).fillEllipse(760, 580, 1000, 280);
      l.props.forEach(function (p, i) {
        var key = s.textures.exists('c_' + p) ? 'c_' + p : 'p_' + p, im = s.add.image([330, 700, 930][i], [440, 445, 400][i], key);
        im.setScale(key.indexOf('p_') === 0 ? 0.45 : 0.6);
      });
      if (!l.night) { for (var k = 0; k < 14; k++) g.fillStyle([0xff8fc8, 0xffd23f, 0xffffff, 0xb98cff][k % 4], 1).fillCircle(Math.random() * W, 470 + Math.random() * 60, 6); }
      s.mia = s.add.image(150, 385, 'c_mia').setScale(0.7);
      s.bolt = s.add.image(820, 420, 'c_bolt').setScale(0.72);
      s.tweens.add({ targets: s.bolt, y: 410, yoyo: true, repeat: -1, duration: 600, ease: 'Sine.easeInOut' });
      s.box = s.add.container(0, 0).setDepth(20);
      s.show = s.add.container(0, 0).setDepth(15);
      backBtn(s);
      txt(s, W - 20, 30, l.name + ' · ' + l.level, 18, '#fff', { ox: 1, stroke: INK, strokeThickness: 5 }).setDepth(30);
      s.render();
    },
    render: function () {
      var s = this, l = s.land, p = l.story[s.step], vocab = {};
      l.words.forEach(function (w) { vocab[w[0].toLowerCase()] = w[0]; vocab[w[0].toLowerCase() + 's'] = w[0]; });
      s.box.removeAll(true); s.show.removeAll(true);
      var bx = 90, by = 70, bw = 780, bh = 150;
      var g = s.add.graphics(); g.fillStyle(0x000000, 0.15).fillRoundedRect(bx, by + 6, bw, bh, 26); g.fillStyle(0xffffff, 1).fillRoundedRect(bx, by, bw, bh, 26); g.lineStyle(5, 0x7c4dff, 1).strokeRoundedRect(bx, by, bw, bh, 26);
      s.box.add(g);
      var who = { mia: 'Mia', bolt: 'Bolt', narr: 'Story' }[p.who];
      var tagG = s.add.graphics().fillStyle(0x7c4dff, 1).fillRoundedRect(bx + 24, by - 18, 110, 36, 18); s.box.add(tagG);
      s.box.add(txt(s, bx + 79, by, who, 20, '#fff'));
      // speaker highlight
      s.mia.setAlpha(p.who === 'bolt' ? 0.75 : 1); s.bolt.setAlpha(p.who === 'mia' ? 0.75 : 1);
      if (p.who !== 'narr') s.tweens.add({ targets: p.who === 'mia' ? s.mia : s.bolt, scale: 0.8, yoyo: true, duration: 180 });
      // words, each tappable
      var x = bx + 40, y = by + 44, maxX = bx + bw - 110, lineH = 44;
      p.t.split(' ').forEach(function (word) {
        var clean = word.toLowerCase().replace(/[^a-z']/g, ''), isV = !!vocab[clean];
        var t = txt(s, 0, 0, word, 32, isV ? '#d9480f' : INK, { ox: 0, oy: 0.5 });
        if (x + t.width > maxX) { x = bx + 40; y += lineH; }
        t.setPosition(x, y); x += t.width + 12;
        t.setInteractive({ useHandCursor: true }).on('pointerup', function () { say(clean.replace(/'s$/, '') || word); s.tweens.add({ targets: t, y: t.y - 6, yoyo: true, duration: 120 }); });
        if (isV) { var u = s.add.graphics().lineStyle(3, 0xffb38a, 1).lineBetween(t.x, t.y + 18, t.x + t.width, t.y + 18); s.box.add(u); }
        s.box.add(t);
      });
      s.box.add(speaker(s, bx + bw - 50, by + bh / 2, function () { return p.t; }, 60));
      say(p.t);
      // pictures pop in
      (p.show || []).forEach(function (pic, i, arr) {
        var im = s.add.image(W / 2 - (arr.length - 1) * 70 + i * 140, 300, 'p_' + pic).setScale(0).setInteractive({ useHandCursor: true });
        var wd = (l.words.find(function (w) { return w[1] === pic; }) || [pic])[0];
        im.on('pointerup', function () { say(wd); });
        s.show.add(im);
        var lab = txt(s, im.x, 370, wd, 24, '#fff', { stroke: INK, strokeThickness: 6 }).setAlpha(0); s.show.add(lab);
        s.tweens.add({ targets: im, scale: 0.55, duration: 400, delay: 300 + i * 150, ease: 'Back.easeOut' });
        s.tweens.add({ targets: lab, alpha: 1, duration: 300, delay: 500 + i * 150 });
      });
      if (p.choice) s.choice(p.choice);
      else s.box.add(button(s, W - 110, H - 50, 170, 60, 'Next ▶', { fill: 0x7c4dff, shadow: 0x4b2bb3, color: '#fff' }, function () { s.next(); }));
      // progress dots
      for (var d = 0; d < l.story.length; d++) s.box.add(s.add.circle(W / 2 - (l.story.length - 1) * 11 + d * 22, H - 22, 6, d <= s.step ? 0x7c4dff : 0xffffff));
    },
    choice: function (c) {
      var s = this;
      s.box.add(txt(s, W / 2, 262, c.q, 30, '#fff', { stroke: '#13294b', strokeThickness: 7 }));
      s.time.delayedCall(1800, function () { say(c.q); });
      c.opts.forEach(function (o, i) {
        var b = button(s, W / 2 + (i ? 190 : -190), 470, 340, 70, o, { fill: 0xffffff, line: 0x7c4dff, size: 28 }, function () {
          if (i === c.a) { sfx('good'); b.redraw(0xd9f7df, 0x4cc76a); say(o + ' Yes! Well done.'); s.time.delayedCall(1400, function () { s.next(); }); }
          else { sfx('bad'); b.redraw(0xffe1e1, 0xe94f64); s.cameras.main.shake(120, 0.004); say('Try again.'); }
        });
        s.box.add(b);
      });
    },
    next: function () {
      var s = this;
      if (s.step < s.land.story.length - 1) { s.step++; s.render(); }
      else reward(s, s.land, 'story', 'Now drive the Word Kart!');
    }
  });

  /* ================= WORD KART (pseudo-3D racer) ================= */
  var HOR = 210, CAMH = 1.6, FOC = 320, ROADW = 3.3, KZ = 2.3;
  var KartScene = new Phaser.Class({
    Extends: Phaser.Scene, initialize: function () { Phaser.Scene.call(this, 'kart'); },
    init: function (d) { this.li = d.land; this.land = LANDS[d.land]; },
    create: function () {
      var s = this, l = s.land;
      s.camX = 0; s.kartX = 0; s.mode = l.kart; s.round = 0; s.total = 8; s.score = 0; s.lane = 0; s.pos = 0; s.speed = 0; s.maxSpeed = { pic: 7.5, word: 5.5, phrase: 4 }[l.kart] || 6; s.running = false; s.gate = null;
      s.qs = s.mode === 'pic' ? shuffle(l.words.concat(l.words)).slice(0, s.total).map(function (w) {
        var others = shuffle(l.words.filter(function (x) { return x[0] !== w[0]; })).slice(0, 2);
        return { t: w[0], a: w[0], o: shuffle([w].concat(others)).map(function (x) { return x[0]; }), pics: true };
      }) : shuffle(l.kartQ).slice(0, s.total).map(function (q) { return { t: q.t, a: q.a, o: shuffle(q.o) }; });
      sky(s, l, W, HOR + 2);
      // distant hills
      var hg = s.add.graphics();
      hg.fillStyle(l.ground2, 1); for (var i = 0; i < 7; i++) hg.fillEllipse(i * 170, HOR + 10, 260, 90);
      if (l.id === 'ice' || l.id === 'space') s.add.image(760, HOR - 30, l.id === 'ice' ? 'c_mountain' : 'p_planet').setScale(l.id === 'ice' ? 1.1 : 0.5);
      s.road = s.add.graphics();
      s.props = [];
      for (var k = 0; k < 14; k++) s.props.push({ side: k % 2 ? 1 : -1, z: 3 + k * 4, key: l.props[k % l.props.length] });
      s.props.forEach(function (p) { var key = s.textures.exists('c_' + p.key) ? 'c_' + p.key : 'p_' + p.key; p.im = s.add.image(0, 0, key).setOrigin(0.5, 1); p.x = p.side * (ROADW + 1.6 + Math.random() * 2.5); });
      s.gateLayer = s.add.container(0, 0);
      s.kart = s.add.image(W / 2, H - 20, 'c_kart').setOrigin(0.5, 1).setScale(0.82).setDepth(40);
      // HUD
      var hud = s.add.graphics().setDepth(45);
      hud.fillStyle(0xffffff, 0.95).fillRoundedRect(150, 12, 660, 78, 24); hud.lineStyle(4, 0x7c4dff, 1).strokeRoundedRect(150, 12, 660, 78, 24);
      s.qText = txt(s, 470, 51, '', s.mode === 'phrase' ? 26 : 30, '#13294b', { wordWrap: { width: 520 } }).setDepth(46);
      speaker(s, 770, 51, function () { return s.sayQ(); }, 54).setDepth(46);
      s.hudR = txt(s, W - 14, 118, '', 22, '#fff', { ox: 1, stroke: INK, strokeThickness: 6 }).setDepth(46);
      s.hudG = txt(s, 14, 118, '', 22, '#fff', { ox: 0, stroke: INK, strokeThickness: 6 }).setDepth(46);
      backBtn(s);
      // controls
      var L = button(s, 80, H - 80, 110, 110, '◀', { fill: 0xffffff, line: 0x7c4dff, r: 55, size: 48, color: '#7c4dff' }, function () { s.steer(-1); }).setDepth(50);
      var R = button(s, W - 80, H - 80, 110, 110, '▶', { fill: 0xffffff, line: 0x7c4dff, r: 55, size: 48, color: '#7c4dff' }, function () { s.steer(1); }).setDepth(50);
      s.input.keyboard && s.input.keyboard.on('keydown', function (e) { if (e.key === 'ArrowLeft' || e.key === 'a') s.steer(-1); if (e.key === 'ArrowRight' || e.key === 'd') s.steer(1); });
      var sx = null;
      s.input.on('pointerdown', function (p) { sx = p.x; });
      s.input.on('pointerup', function (p) { if (sx != null && Math.abs(p.x - sx) > 60) s.steer(p.x > sx ? 1 : -1); sx = null; });
      s.updHud();
      s.countdown();
    },
    sayQ: function () { var q = this.qs[this.round]; if (!q) return ''; return q.pics ? 'Find ' + (/^(red|blue|yellow|green|pink|orange)$/.test(q.a) ? '' : 'the ') + q.a + '!' : q.t; },
    updHud: function () {
      var q = this.qs[this.round];
      if (q) this.qText.setText(q.pics ? 'Find: ' + q.a : q.t);
      this.hudR.setText('Gate ' + Math.min(this.round + 1, this.total) + ' / ' + this.total);
      this.hudG.setText('💎 ' + this.score);
    },
    countdown: function () {
      var s = this, lights = [];
      for (var i = 0; i < 3; i++) lights.push(s.add.circle(W / 2 - 50 + i * 50, 150, 20, 0x5a1a1a).setStrokeStyle(4, 0x2d2a3e).setDepth(60));
      var hint = txt(s, W / 2, 200, 'Listen and steer into the right answer!', 24, '#fff', { stroke: INK, strokeThickness: 6 }).setDepth(60);
      sfx('go');
      [0, 1, 2].forEach(function (i) { s.time.delayedCall(i * 500, function () { lights[i].setFillStyle(0xff3b3b); }); });
      s.time.delayedCall(1500, function () { lights.forEach(function (c) { c.setFillStyle(0x3bff6e); }); s.running = true; s.spawn(); });
      s.time.delayedCall(2300, function () { lights.forEach(function (c) { c.destroy(); }); hint.destroy(); });
    },
    steer: function (d) {
      if (!this.running) return;
      var n = Phaser.Math.Clamp(this.lane + d, -1, 1); if (n === this.lane) return;
      this.lane = n;
      this.tweens.add({ targets: this.kart, angle: d * 8, yoyo: true, duration: 140 });
    },
    spawn: function () {
      var s = this, q = s.qs[s.round];
      if (!q) return;
      s.gateLayer.removeAll(true);
      var cards = q.o.map(function (o, i) {
        var c = s.add.container(0, 0), wide = s.mode === 'phrase' ? 280 : 210, hgt = q.pics ? 200 : s.mode === 'phrase' ? 150 : 110;
        var g = s.add.graphics(); g.fillStyle(0x000000, 0.25).fillRoundedRect(-wide / 2, -hgt + 8, wide, hgt, 24);
        g.fillStyle(0xffffff, 1).fillRoundedRect(-wide / 2, -hgt, wide, hgt, 24); g.lineStyle(6, [0xff7ab8, 0xffc23d, 0x6c8cff][i], 1).strokeRoundedRect(-wide / 2, -hgt, wide, hgt, 24);
        g.fillStyle(0xffffff, 1).fillRect(-wide / 2 + 14, 0, 12, 90).fillRect(wide / 2 - 26, 0, 12, 90);
        c.add(g);
        if (q.pics) c.add(s.add.image(0, -hgt / 2, picOf(s.land, o)).setScale(0.75));
        else c.add(txt(s, 0, -hgt / 2, o, s.mode === 'phrase' ? 28 : 38, '#13294b', { wordWrap: { width: wide - 30 } }));
        c.ans = o; c.lane = i - 1; c.wide = wide;
        s.gateLayer.add(c);
        return c;
      });
      s.gate = { z: 26, cards: cards, q: q, hit: false };
      s.updHud();
      s.time.delayedCall(250, function () { say(s.sayQ()); });
    },
    project: function (x, z) { var sc = FOC / z; return { x: W / 2 + (x - this.camX) * sc, y: HOR + CAMH * sc, s: sc }; },
    update: function (t, dt) {
      var s = this; dt = Math.min(dt, 50) / 1000;
      if (s.running) s.speed = Math.min(s.maxSpeed, s.speed + 10 * dt); else s.speed = Math.max(0, s.speed - 20 * dt);
      var mv = s.speed * dt; s.pos += mv;
      var targetX = s.lane * 2.2; s.camX = (s.camX || 0) + (targetX * 0.35 - (s.camX || 0)) * Math.min(1, dt * 4);
      s.kartX = (s.kartX || 0) + (targetX - (s.kartX || 0)) * Math.min(1, dt * 9);
      // road
      var g = s.road; g.clear();
      g.fillStyle(s.land.ground, 1).fillRect(0, HOR, W, H - HOR);
      var segs = 60, zFar = 60, zNear = 1.2;
      for (var i = 0; i < segs; i++) {
        var z1 = zFar - (zFar - zNear) * i / segs, z2 = zFar - (zFar - zNear) * (i + 1) / segs;
        var a = s.project(0, z1), b = s.project(0, z2), stripe = Math.floor((z1 + s.pos) / 2.4) % 2 === 0;
        g.fillStyle(stripe ? s.land.ground : s.land.ground2, 1).fillRect(0, a.y, W, b.y - a.y + 1);
        var rw = ROADW + 0.5;
        g.fillStyle(stripe ? 0xff5ca8 : 0xffffff, 1).fillPoints([{ x: a.x - rw * a.s, y: a.y }, { x: a.x + rw * a.s, y: a.y }, { x: b.x + rw * b.s, y: b.y }, { x: b.x - rw * b.s, y: b.y }], true);
        g.fillStyle(s.land.road, 1).fillPoints([{ x: a.x - ROADW * a.s, y: a.y }, { x: a.x + ROADW * a.s, y: a.y }, { x: b.x + ROADW * b.s, y: b.y }, { x: b.x - ROADW * b.s, y: b.y }], true);
        if (stripe) [-1.1, 1.1].forEach(function (lx) { var p1 = s.project(lx, z1), p2 = s.project(lx, z2); g.fillStyle(0xffffff, 0.8).fillPoints([{ x: p1.x - 0.05 * p1.s, y: p1.y }, { x: p1.x + 0.05 * p1.s, y: p1.y }, { x: p2.x + 0.05 * p2.s, y: p2.y }, { x: p2.x - 0.05 * p2.s, y: p2.y }], true); });
      }
      // side props
      s.props.forEach(function (p) {
        p.z -= mv; if (p.z < 1.3) { p.z += 56; }
        var pr = s.project(p.x, p.z); p.im.setPosition(pr.x, pr.y).setScale(pr.s / 300).setDepth(30 - p.z / 2).setVisible(p.z < 58);
      });
      // gate
      if (s.gate) {
        var gz = s.gate.z -= mv;
        s.gate.cards.forEach(function (c) { var zz = Math.max(gz, 0.6), pr = s.project(c.lane * 2.2, zz), mid = s.project(0, zz), sc = Math.max(pr.s / FOC * 2.1, s.mode === 'pic' ? 0.25 : 0.5), gap = Math.max(Math.abs(pr.x - mid.x), c.wide * sc + 14); c.setPosition(mid.x + c.lane * gap, pr.y).setScale(sc).setDepth(32 - gz / 2); });
        s.gateLayer.setDepth(30 - gz / 2 + 0.1);
        if (!s.gate.hit && gz <= KZ) s.check();
        if (gz < 0.9) { s.gateLayer.removeAll(true); var was = s.gate; s.gate = null; if (was.next) was.next(); }
      }
      // kart
      var kp = s.project(s.kartX, KZ); s.kart.x = kp.x;
    },
    check: function () {
      var s = this, gt = s.gate; gt.hit = true;
      var hitCard = gt.cards.find(function (c) { return c.lane === s.lane; }), right = hitCard && hitCard.ans === gt.q.a;
      if (right) {
        s.score++; sfx('gem'); s.speed = s.maxSpeed + 6;
        var gem = s.add.image(s.kart.x, H - 160, 'c_gem').setScale(0.6).setDepth(60);
        s.tweens.add({ targets: gem, x: 40, y: 118, scale: 0.2, duration: 600, onComplete: function () { gem.destroy(); } });
        say(['Great!', 'Yes!', 'Super!', 'Well done!'][s.round % 4] + ' ' + (gt.q.pics ? gt.q.a : ''));
      } else {
        sfx('bad'); s.speed = 3;
        s.tweens.add({ targets: s.kart, angle: 360, duration: 600, onComplete: function () { s.kart.angle = 0; } });
        s.cameras.main.shake(200, 0.006);
        say('Oops! ' + (gt.q.pics ? 'This is the ' + gt.q.a + '.' : 'The answer is: ' + gt.q.a));
        var good = gt.cards.find(function (c) { return c.ans === gt.q.a; });
        if (good) s.tweens.add({ targets: good, alpha: 0.3, yoyo: true, repeat: 3, duration: 120 });
      }
      s.updHud();
      gt.next = function () {
        s.round++;
        if (s.round >= s.total) { s.running = false; s.time.delayedCall(700, function () { s.finish(); }); }
        else s.time.delayedCall(right ? 300 : 1400, function () { s.spawn(); });
      };
    },
    finish: function () {
      var s = this, st = s.score >= 7 ? 3 : s.score >= 5 ? 2 : s.score >= 4 ? 1 : 0;
      if (st) reward(s, s.land, 'kart', s.score + ' gems out of ' + s.total, st);
      else tryAgain(s, s.land, 'kart', 'You got ' + s.score + ' gems. Get 4 or more to win a feather.');
    }
  });

  /* ================= WORD MINE ================= */
  var TS = 64, COLS = 9, ROWS = 34, OX = (W - COLS * TS) / 2, TOP = 260;
  var MineScene = new Phaser.Class({
    Extends: Phaser.Scene, initialize: function () { Phaser.Scene.call(this, 'mine'); },
    init: function (d) { this.li = d.land; this.land = LANDS[d.land]; },
    create: function () {
      var s = this, l = s.land;
      s.qs = l.mine.slice(); s.found = 0; s.right = 0; s.busy = false;
      s.cameras.main.setBounds(0, 0, W, TOP + ROWS * TS + 40);
      var bg = s.add.graphics();
      bg.fillGradientStyle(l.sky[0], l.sky[0], l.sky[1], l.sky[1], 1).fillRect(0, 0, W, TOP);
      bg.fillStyle(0x5b3a22, 1).fillRect(0, TOP, W, ROWS * TS + 40);
      bg.fillStyle(0x3a2414, 1).fillRect(0, TOP, OX, ROWS * TS + 40).fillRect(OX + COLS * TS, TOP, OX, ROWS * TS + 40);
      if (l.night) for (var i = 0; i < 40; i++) bg.fillStyle(0xffffff, 0.8).fillCircle(Math.random() * W, Math.random() * TOP, 1.5);
      s.add.image(OX - 80, TOP, s.textures.exists('c_' + l.props[0]) ? 'c_' + l.props[0] : 'p_' + l.props[0]).setOrigin(0.5, 1).setScale(0.55);
      s.add.image(OX + COLS * TS + 80, TOP, 'c_house').setOrigin(0.5, 1).setScale(0.6);
      // gems at set depths, in reachable columns
      var gemRows = [2, 5, 8, 12, 16, 21], gemAt = {};
      gemRows.forEach(function (r, k) { gemAt[r + ':' + Phaser.Math.Between(1, COLS - 2)] = k; });
      s.grid = [];
      for (var r = 0; r < ROWS; r++) {
        s.grid.push([]);
        for (var c = 0; c < COLS; c++) {
          var hp = r === 0 ? 1 : r < 9 ? 2 : r < 18 ? 3 : 4, key = r + ':' + c;
          var col = r === 0 ? 0x6cc865 : r < 9 ? 0xa86a3d : r < 18 ? 0x8a8f9c : 0x5d5470;
          var x = OX + c * TS, y = TOP + r * TS;
          var gg = s.add.graphics();
          gg.fillStyle(col, 1).fillRect(x + 1, y + 1, TS - 2, TS - 2);
          gg.fillStyle(0x000000, 0.12).fillRect(x + 1, y + TS - 10, TS - 2, 9);
          gg.fillStyle(0xffffff, 0.12).fillRect(x + 6, y + 6, 10, 6).fillRect(x + 34, y + 30, 8, 6);
          if (r === 0) gg.fillStyle(0xa86a3d, 1).fillRect(x + 1, y + 22, TS - 2, TS - 23);
          var cell = { r: r, c: c, hp: hp, max: hp, g: gg, gem: gemAt[key] };
          if (cell.gem != null) { cell.gi = s.add.image(x + TS / 2, y + TS / 2, 'c_gem').setScale(0.42).setAlpha(0.75); s.tweens.add({ targets: cell.gi, alpha: 1, scale: 0.48, yoyo: true, repeat: -1, duration: 600 }); }
          s.grid[r].push(cell);
        }
      }
      s.pr = -1; s.pc = 4;
      s.player = s.add.image(0, 0, 'c_mia').setOrigin(0.5, 1).setScale(0.2).setDepth(20);
      s.placePlayer(true);
      s.cameras.main.startFollow(s.player, true, 0.1, 0.1, 0, 60);
      // HUD fixed to camera
      var hud = s.add.graphics().setScrollFactor(0).setDepth(80);
      hud.fillStyle(0x13294b, 0.9).fillRoundedRect(110, 12, 740, 60, 22);
      s.hud = txt(s, W / 2, 42, '', 24, '#fff').setScrollFactor(0).setDepth(81);
      backBtn(s);
      s.input.on('pointerup', function (p) {
        if (s.busy) return;
        var wx = p.worldX, wy = p.worldY, c = Math.floor((wx - OX) / TS), r = Math.floor((wy - TOP) / TS);
        if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return;
        var adj = (r === s.pr + 1 && c === s.pc) || (r === s.pr && Math.abs(c - s.pc) === 1) || (s.pr === -1 && r === 0 && Math.abs(c - s.pc) <= 1);
        var cell = s.grid[r][c];
        if (!cell.g) { if (r === s.pr && Math.abs(c - s.pc) === 1) { s.pc = c; s.placePlayer(); } return; }
        if (!adj) { s.hint('Dig next to Mia!'); return; }
        s.dig(cell);
      });
      s.updHud();
      s.time.delayedCall(400, function () { say('Dig down and find the gems!'); });
      s.hint('Tap the blocks next to Mia to dig ⛏️');
    },
    hint: function (m) {
      var s = this; if (s.hintT) s.hintT.destroy();
      s.hintT = txt(s, W / 2, 100, m, 22, '#fff', { stroke: INK, strokeThickness: 6 }).setScrollFactor(0).setDepth(82);
      s.tweens.add({ targets: s.hintT, alpha: 0, delay: 2200, duration: 500 });
    },
    updHud: function () { this.hud.setText('💎 ' + this.right + ' / ' + this.qs.length + '     Depth ' + Math.max(0, this.pr + 1) + ' m     ' + this.land.name); },
    placePlayer: function (now) {
      var s = this;
      while (s.pr + 1 < ROWS && !s.grid[s.pr + 1][s.pc].g) s.pr++;
      var x = OX + s.pc * TS + TS / 2, y = TOP + (s.pr + 1) * TS;
      if (now) s.player.setPosition(x, y); else s.tweens.add({ targets: s.player, x: x, y: y, duration: 220, ease: 'Quad.easeIn' });
      s.player.setFlipX(false);
      s.updHud && s.hud && s.updHud();
    },
    dig: function (cell) {
      var s = this; cell.hp--; sfx('dig');
      s.tweens.add({ targets: s.player, angle: { from: -12, to: 12 }, yoyo: true, duration: 80 });
      var x = OX + cell.c * TS, y = TOP + cell.r * TS;
      for (var i = 0; i < 4; i++) { var bit = s.add.rectangle(x + TS / 2, y + TS / 2, 8, 8, 0x8a5a3c).setDepth(30); s.tweens.add({ targets: bit, x: bit.x + Phaser.Math.Between(-40, 40), y: bit.y + Phaser.Math.Between(-40, 10), alpha: 0, duration: 400, onComplete: function (o, t) { t[0].destroy(); } }); }
      if (cell.hp > 0) { cell.g.setAlpha(0.45 + 0.55 * cell.hp / cell.max); return; }
      cell.g.destroy(); cell.g = null;
      if (cell.r === s.pr && cell.c !== s.pc) s.pc = cell.c;
      if (cell.r === 0 && s.pr === -1) s.pc = cell.c;
      s.placePlayer();
      if (cell.gi) { var gi = cell.gi; s.tweens.killTweensOf(gi); s.busy = true; s.time.delayedCall(300, function () { gi.destroy(); s.quiz(s.qs[cell.gem]); }); }
    },
    quiz: function (q) {
      var s = this, l = s.land, layer = s.add.container(0, 0).setScrollFactor(0).setDepth(100), tries = 0;
      layer.add(s.add.rectangle(W / 2, H / 2, W, H, 0x0b1230, 0.6).setInteractive());
      var g = s.add.graphics(); g.fillStyle(0xffffff, 1).fillRoundedRect(130, 40, 700, 460, 30); g.lineStyle(6, 0x5fd3ff, 1).strokeRoundedRect(130, 40, 700, 460, 30); layer.add(g);
      layer.add(s.add.image(180, 90, 'c_gem').setScale(0.5));
      var done = function (ok) {
        if (ok && tries === 0) s.right++;
        s.found++; s.updHud();
        s.time.delayedCall(ok ? 900 : 1600, function () {
          layer.destroy(); s.busy = s.found >= s.qs.length;
          if (s.found >= s.qs.length) s.time.delayedCall(300, function () {
            var st = s.right >= 6 ? 3 : s.right >= 5 ? 2 : s.right >= 4 ? 1 : 0;
            if (st) reward(s, l, 'mine', s.right + ' gems out of ' + s.qs.length, st);
            else tryAgain(s, l, 'mine', 'You got ' + s.right + ' gems. Get 4 or more to win a feather.');
          });
        });
      };
      var answer = function (b, ok, correctText) {
        if (ok) { sfx('good'); b.redraw(0xd9f7df, 0x4cc76a); say(['Yes!', 'Great!', 'Super!'][s.found % 3] + ' ' + (correctText || '')); done(true); }
        else { sfx('bad'); b.redraw(0xffe1e1, 0xe94f64); tries++; if (tries >= 2) { say('The answer is ' + correctText); done(false); } else say('Try again.'); }
      };
      if (q.type === 'order') {
        layer.add(txt(s, W / 2, 96, 'Put the words in order', 30, '#13294b'));
        var built = [], target = q.words.join(' '), line = txt(s, W / 2, 200, '…', 32, '#7c4dff', { wordWrap: { width: 620 } }); layer.add(line);
        layer.add(speaker(s, 780, 96, function () { return target; }, 50));
        var tiles = shuffle(q.words.map(function (w, i) { return { w: w, i: i }; }));
        var per = Math.min(150, 640 / tiles.length);
        tiles.forEach(function (tl, k) {
          var b = button(s, W / 2 - (tiles.length - 1) * per / 2 + k * per, 320, per - 12, 64, tl.w, { fill: 0xf3eeff, line: 0x7c4dff, size: 24 }, function () {
            if (b.used) return;
            if (tl.w === q.words[built.length]) { b.used = true; b.setAlpha(0.3); built.push(tl.w); line.setText(built.join(' ')); say(tl.w);
              if (built.length === q.words.length) { sfx('good'); say(target); done(true); } }
            else { sfx('bad'); tries++; s.tweens.add({ targets: b, x: b.x + 8, yoyo: true, repeat: 2, duration: 50 }); if (tries >= 3) { line.setText(target); say(target); done(false); } }
          });
          layer.add(b);
        });
        fixAll(layer); return;
      }
      var correct = q.type === 'listen' ? q.say : q.type === 'gap' ? q.opts[0] : q.opts.find(function (o) { return picOf(l, o) === 'p_' + q.pic; }) || q.opts[0];
      if (q.type === 'pic') { layer.add(txt(s, W / 2, 96, 'What is it?', 32, '#13294b')); layer.add(s.add.image(W / 2, 220, 'p_' + q.pic).setScale(0.75)); }
      if (q.type === 'gap') {
        layer.add(s.add.image(W / 2, 170, 'p_' + q.pic).setScale(0.5));
        layer.add(txt(s, W / 2, 280, q.t, 34, '#13294b', { wordWrap: { width: 620 } }));
        layer.add(speaker(s, 780, 96, function () { return q.t.replace('___', correct); }, 50));
      }
      if (q.type === 'listen') {
        layer.add(txt(s, W / 2, 96, 'Listen and choose', 32, '#13294b'));
        layer.add(speaker(s, W / 2, 190, function () { return q.say; }, 90));
        s.time.delayedCall(300, function () { say(q.say); });
      }
      var opts = shuffle(q.opts);
      opts.forEach(function (o, k) {
        var x = W / 2 + (k - (opts.length - 1) / 2) * 220, b;
        if (q.type === 'listen') {
          b = button(s, x, 380, 190, 170, '', { fill: 0xffffff, line: 0xd9d2f5 }, function () { answer(b, o === correct, correct); });
          var pk = picOf(l, o); if (pk) b.add(s.add.image(0, -4, pk).setScale(0.6));
        } else b = button(s, x, 410, 200, 72, o, { fill: 0xf3eeff, line: 0x7c4dff, size: 28 }, function () { answer(b, o === correct, q.type === 'gap' ? q.t.replace('___', correct) : correct); });
        layer.add(b);
      });
      fixAll(layer);
    }
  });

  /* ---------- start ---------- */
  window.addEventListener('load', function () {
    window.KQ_GAME = new Phaser.Game({
      type: Phaser.AUTO, parent: 'game', width: W, height: H, backgroundColor: '#2a1f5c',
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      render: { antialias: true, roundPixels: false },
      input: { activePointers: 2 },
      scene: [Boot, MapScene, StoryScene, KartScene, MineScene]
    });
  });
})();
