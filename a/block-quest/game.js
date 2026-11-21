/* IF Block Quest — 3D English games for kids, teens and adults, built on Three.js (WebGL).
   Word Mine: a block island with glowing word blocks — mine them and answer to collect gems.
   Grammar Obby: a sky parkour course — jump onto the platform with the right answer; wrong ones fall.
   Tower Climb: an obby tower — climb the spiral of colourful stages, dodge the red kill bricks, bounce on jump
   pads, grab coins, and answer at every checkpoint floor to keep climbing.
   Avatar: build your own blocky character (skin, shirt, trousers, hat) — used in every game.
   Kids (Starters, Movers, Flyers): picture words and sentences from the Young Learners banks and IF Kids Quest.
   Teens and adults (A1–C2): questions from the IF App courses (vocabulary definitions and grammar items).
   Original IF Academy game: no Minecraft or Roblox assets, names or characters. */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], KIDS = ['Starters', 'Movers', 'Flyers'];
  var isKid = function (l) { return KIDS.indexOf(l) >= 0; };
  var KB = null;   // Young Learners banks (/live/banks.json), loaded when a kids level is played
  function loadKids() { return KB ? Promise.resolve(KB) : fetch('/live/banks.json').then(function (r) { return r.json(); }).then(function (d) { KB = d.banks || []; return KB; }).catch(function () { KB = []; return KB; }); }
  /** Kids questions: word → picture/meaning from the Young Learners banks, plus Kids Quest sentence gaps. */
  function kidQuestions(level, n) {
    var out = [], id = 'y-' + level.toLowerCase();
    (KB || []).filter(function (b) { return b.id === id; }).forEach(function (b) { b.units.forEach(function (u) {
      if (u.w) u.w.forEach(function (w) { var others = shuffle(u.w.filter(function (x) { return x[0] !== w[0]; })).slice(0, 2).map(function (x) { return x[0]; }); if (others.length < 2) return; var o = shuffle([w[0]].concat(others)); out.push({ kind: 'Words', q: (w[1].charAt(0).toUpperCase() + w[1].slice(1)) + ' — which word?', opts: o, a: o.indexOf(w[0]), say: w[0] }); });
      if (u.q) u.q.forEach(function (q) { if (q[1].length < 2) return; var right = q[1][q[2]], o = shuffle(q[1]).slice(0, 3); if (o.indexOf(right) < 0) o[0] = right; o = shuffle(o); out.push({ kind: 'Sentences', q: q[0], opts: o, a: o.indexOf(right), say: q[0].replace('___', right) }); });
    }); });
    (window.KQ_LANDS || []).filter(function (l) { return l.level === level; }).forEach(function (l) {
      (l.kartQ || []).forEach(function (q) { var o = shuffle(q.o); out.push({ kind: 'Sentences', q: q.t, opts: o, a: o.indexOf(q.a), say: q.t.replace('___', q.a) }); });
    });
    return shuffle(out.filter(function (q) { return q.opts.every(function (o) { return String(o).length <= 26; }); })).slice(0, n);
  }
  var SAVE = (function () { try { return JSON.parse(localStorage.getItem('ifbq') || '{}'); } catch (e) { return {}; } })();
  var persist = function () { try { localStorage.setItem('ifbq', JSON.stringify(SAVE)); } catch (e) {} };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var say = function (t) { try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; speechSynthesis.speak(u); } catch (e) {} };
  /* The narrator: every message on the screen is also read aloud (the next say() replaces it, so a question or
     an answer is never talked over). Missions give the mine a story: collect 3, 6, 10, 15… gems. */
  var NARR = true; try { NARR = localStorage.getItem('bq.narr') !== '0'; } catch (e) {}
  function narr(m) { if (!NARR) return; var t = String(m).replace(/[^\w\s.,!?'’:;-]/g, ' ').replace(/\s+/g, ' ').trim(); if (t) say(t); }
  var MISSIONS = [3, 6, 10, 15, 20, 30, 40];
  function mission() { if (!G || G.mode !== 'mine') return; var n = MISSIONS.filter(function (x) { return x > G.gems && x <= G.total; })[0]; G.goal = n || G.total; }
  var toastT; function toast(m) { narr(m); var el = $('#toast'); el.textContent = m; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('on'); }, 2200); }
  var AC; function beep(kind) {
    try { AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var notes = { ok: [660, 880, 1175], bad: [260, 200], gem: [880, 1320], jump: [420], fall: [300, 180, 120], win: [523, 659, 784, 1047], dig: [160] }[kind] || [440];
      notes.forEach(function (f, i) { var o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime + i * 0.09; o.type = kind === 'dig' ? 'square' : 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.1, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.22); });
    } catch (e) {}
  }

  /* ---------------- question bank from the IF App courses ----------------
     PICK: one course (and unit) chosen in the menu or with ?course=teens-a2&unit=u3 — e.g. from the IF Classroom slides */
  var PICK = { c: '', u: '' };
  function bank(level) {
    var vocab = [], gram = [];
    IFX_BANK.courses.filter(function (c) { return PICK.c ? c.id === PICK.c : c.level === level; }).forEach(function (c) {
      c.units.filter(function (u) { return !PICK.u || u.id === PICK.u; }).forEach(function (u) { u.lessons.forEach(function (l) {
        if (l.type === 'vocab') l.words.forEach(function (w) { if (w.d) vocab.push({ w: w.w, d: w.d, e: w.e }); });
        if (l.type === 'grammar' || l.type === 'check') (l.ex || []).forEach(function (x) { if (x.t === 'mc' && x.o && x.o.length >= 2 && x.q.indexOf('Choose the') !== 0) gram.push({ q: x.q, o: x.o, a: x.a, topic: l.title }); });
      }); });
    });
    return { vocab: vocab, gram: gram };
  }
  /** n questions: {kind, q, opts:[...], a:index, say} — vocabulary (definition → word) and grammar (gap / choice). */
  function questions(level, n, shortOpts) {
    if (isKid(level)) return kidQuestions(level, n);
    var B = bank(level), out = [];
    if (B.vocab.length < 4) { var i = LEVELS.indexOf(level); B = bank(LEVELS[Math.max(0, i - 1)]); }
    var V = shuffle(B.vocab), G = shuffle(B.gram.filter(function (g) { return !shortOpts || g.o.every(function (o) { return o.length <= 26; }); }));
    for (var k = 0; out.length < n && k < 400; k++) {
      var useG = G.length && (k % 2 === 1 || !V.length);
      if (useG) { var g = G.shift(); if (!g) continue; var idx = shuffle(g.o.map(function (_, j) { return j; })).slice(0, 3); if (idx.indexOf(g.a) < 0) idx[0] = g.a; idx = shuffle(idx);
        out.push({ kind: 'Grammar', q: g.q, opts: idx.map(function (j) { return g.o[j]; }), a: idx.indexOf(g.a), say: g.q.replace('___', g.o[g.a]) }); }
      else { var w = V.shift(); if (!w) continue; var others = shuffle(B.vocab.filter(function (x) { return x.w !== w.w; })).slice(0, 2).map(function (x) { return x.w; });
        var opts = shuffle([w.w].concat(others)); if (shortOpts && opts.some(function (o) { return o.length > 26; })) continue;
        out.push({ kind: 'Vocabulary', q: 'Which word means: “' + w.d + '”?', opts: opts, a: opts.indexOf(w.w), say: w.w + '. ' + (w.e || '') }); }
    }
    return out;
  }

  /* ---------------- three.js basics ---------------- */
  var canvas = $('#c'), renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true;
  var scene, camera = new THREE.PerspectiveCamera(65, 1, 0.1, 400), clock = new THREE.Clock();
  function resize() { var w = window.innerWidth, h = window.innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  window.addEventListener('resize', resize); resize();

  var MAT = {};
  function mat(color, extra) { var k = color + JSON.stringify(extra || {}); return MAT[k] || (MAT[k] = new THREE.MeshLambertMaterial(Object.assign({ color: color }, extra || {}))); }
  /** A small canvas texture so blocks look hand-made rather than flat. */
  function blockTex(base, speck, top) {
    var c = document.createElement('canvas'); c.width = c.height = 32; var x = c.getContext('2d');
    x.fillStyle = base; x.fillRect(0, 0, 32, 32);
    for (var i = 0; i < 70; i++) { x.fillStyle = speck[i % speck.length]; x.fillRect((Math.random() * 16 | 0) * 2, (Math.random() * 16 | 0) * 2, 2, 2); }
    if (top) { x.fillStyle = top; x.fillRect(0, 0, 32, 6); }
    var t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  /** Text on a plane (signs, answer labels). */
  function textPlane(text, w, h, opt) {
    opt = opt || {};
    var c = document.createElement('canvas'), S = 2; c.width = Math.round(w * 128 * S / 2); c.height = Math.round(h * 128 * S / 2);
    var x = c.getContext('2d'); x.fillStyle = opt.bg || '#fffdf7'; x.fillRect(0, 0, c.width, c.height);
    x.strokeStyle = opt.border || '#c9a24e'; x.lineWidth = 10; x.strokeRect(5, 5, c.width - 10, c.height - 10);
    x.fillStyle = opt.color || '#0b1f3a'; x.textAlign = 'center'; x.textBaseline = 'middle';
    var size = opt.size || 44, words = String(text).split(' '), lines = [], cur = '';
    x.font = '800 ' + size + 'px Inter, Arial, sans-serif';
    var maxW = c.width - 50;
    words.forEach(function (wd) { var t = cur ? cur + ' ' + wd : wd; if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = wd; } else cur = t; }); if (cur) lines.push(cur);
    while (lines.length * size * 1.2 > c.height - 30 && size > 18) { size -= 4; x.font = '800 ' + size + 'px Inter, Arial, sans-serif'; lines = []; cur = ''; words.forEach(function (wd) { var t = cur ? cur + ' ' + wd : wd; if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = wd; } else cur = t; }); if (cur) lines.push(cur); }
    lines.forEach(function (l, i) { x.fillText(l, c.width / 2, c.height / 2 + (i - (lines.length - 1) / 2) * size * 1.2); });
    var tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }));
  }

  /* ---------------- the player: an original blocky avatar, built by the player (Avatar menu) ---------------- */
  var AV_OPT = {
    skin: [0xf2c8a0, 0xe0a979, 0xb97a4e, 0x7a4b2c, 0xffd9b8],
    shirt: [0x0b1f3a, 0xe5484d, 0x3d8bfd, 0x22a06b, 0xffb020, 0x8b5cf6, 0xff6fb5, 0xffffff],
    pants: [0x1f3a5f, 0x2b2b2b, 0x5b4636, 0x3d8bfd, 0x8a8f98],
    hat: ['hair', 'cap', 'crown', 'headphones', 'beanie', 'none']
  };
  var AV = Object.assign({ skin: 0, shirt: 0, pants: 0, hat: 0 }, SAVE.av || {});
  function makePlayer() {
    var g = new THREE.Group(), box = function (w, h, d, color, x, y, z) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color)); m.position.set(x, y, z); m.castShadow = true; g.add(m); return m; };
    var SK = AV_OPT.skin[AV.skin] || AV_OPT.skin[0], SH = AV_OPT.shirt[AV.shirt] || AV_OPT.shirt[0], PA = AV_OPT.pants[AV.pants] || AV_OPT.pants[0], HAT = AV_OPT.hat[AV.hat] || 'hair';
    box(0.5, 0.7, 0.3, PA, -0.14, 0.35, 0); box(0.5, 0.7, 0.3, PA, 0.14, 0.35, 0);                  // legs (one box each side)
    g.children[0].scale.x = 0.5; g.children[1].scale.x = 0.5;
    box(0.62, 0.72, 0.36, SH, 0, 1.06, 0);                                                        // shirt
    box(0.62, 0.12, 0.37, 0xc9a24e, 0, 0.78, 0);                                                  // gold belt
    box(0.2, 0.66, 0.24, SH, -0.42, 1.06, 0); box(0.2, 0.66, 0.24, SH, 0.42, 1.06, 0);            // arms
    box(0.5, 0.5, 0.5, SK, 0, 1.68, 0);                                                           // head
    if (HAT === 'hair') box(0.54, 0.16, 0.54, 0x3b2418, 0, 1.96, 0);
    else if (HAT === 'cap') { box(0.56, 0.18, 0.56, 0xe5484d, 0, 1.98, 0); box(0.5, 0.06, 0.3, 0xe5484d, 0, 1.9, -0.36); }
    else if (HAT === 'crown') { box(0.56, 0.14, 0.56, 0xffcf3f, 0, 1.99, 0); [-0.2, 0, 0.2].forEach(function (x) { box(0.1, 0.16, 0.1, 0xffcf3f, x, 2.12, -0.23); }); }
    else if (HAT === 'headphones') { box(0.62, 0.08, 0.14, 0x222831, 0, 1.97, 0); box(0.1, 0.24, 0.24, 0x3d8bfd, -0.3, 1.72, 0); box(0.1, 0.24, 0.24, 0x3d8bfd, 0.3, 1.72, 0); }
    else if (HAT === 'beanie') { box(0.56, 0.24, 0.56, 0x22a06b, 0, 2.0, 0); box(0.16, 0.12, 0.16, 0xffffff, 0, 2.16, 0); }
    else box(0.52, 0.06, 0.52, 0x3b2418, 0, 1.94, 0);                                              // 'none': short hair
    box(0.08, 0.08, 0.02, 0x1b2333, -0.11, 1.72, -0.26); box(0.08, 0.08, 0.02, 0x1b2333, 0.11, 1.72, -0.26); // eyes (front = -z)
    box(0.34, 0.24, 0.02, 0xc9a24e, 0, 1.12, -0.19);                                              // IF badge
    g.userData.legs = [g.children[0], g.children[1]]; g.userData.arms = [g.children[4], g.children[5]];
    return g;
  }

  /* ---------------- input: keyboard, mouse drag, joystick ---------------- */
  var keys = {}, joy = { x: 0, y: 0 }, yaw = 0, pitch = 0.32, wantJump = false, wantMine = false;
  window.addEventListener('keydown', function (e) { keys[e.code] = true; if (e.code === 'Space') { wantJump = true; e.preventDefault(); } if (e.code === 'KeyE') wantMine = true; });
  window.addEventListener('keyup', function (e) { keys[e.code] = false; });
  var drag = null;
  canvas.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
  window.addEventListener('pointermove', function (e) { if (!drag || drag.id !== e.pointerId) return; yaw -= (e.clientX - drag.x) * 0.006; pitch = Math.max(0.05, Math.min(1.1, pitch + (e.clientY - drag.y) * 0.004)); drag.x = e.clientX; drag.y = e.clientY; });
  window.addEventListener('pointerup', function (e) { if (drag && drag.id === e.pointerId) drag = null; });
  (function () {
    var J = $('#joy'), knob = J.querySelector('i'), id = null, cx = 0, cy = 0;
    J.addEventListener('pointerdown', function (e) { id = e.pointerId; var r = J.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; J.setPointerCapture(id); move(e); e.stopPropagation(); });
    function move(e) { if (e.pointerId !== id) return; var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.min(50, Math.hypot(dx, dy)), a = Math.atan2(dy, dx); joy.x = Math.cos(a) * d / 50; joy.y = Math.sin(a) * d / 50; knob.style.transform = 'translate(' + joy.x * 40 + 'px,' + joy.y * 40 + 'px)'; }
    J.addEventListener('pointermove', move);
    var end = function (e) { if (e.pointerId !== id) return; id = null; joy.x = joy.y = 0; knob.style.transform = ''; };
    J.addEventListener('pointerup', end); J.addEventListener('pointercancel', end);
    $('#jump').addEventListener('pointerdown', function (e) { wantJump = true; e.stopPropagation(); });
    $('#mine').addEventListener('click', function () { wantMine = true; });
  })();

  /* ---------------- shared game state ---------------- */
  var G = null, paused = false;
  function hud(html) { $('#hud').innerHTML = html; }
  function ask(q, cb) {
    paused = true; var box = $('#q'); $('#qk').textContent = q.kind; $('#qt').textContent = q.q;
    var O = $('#qo'); O.innerHTML = ''; var tries = 0;
    q.opts.forEach(function (o, i) { var b = document.createElement('button'); b.textContent = o; b.onclick = function () {
      if (b.disabled) return;
      if (i === q.a) { b.classList.add('ok'); beep('ok'); say(q.say || o); setTimeout(function () { box.style.display = 'none'; paused = false; cb(tries === 0); }, 900); [].forEach.call(O.children, function (x) { x.disabled = true; }); }
      else { b.classList.add('no'); b.disabled = true; beep('bad'); tries++; if (tries >= 2) { O.children[q.a].classList.add('ok'); [].forEach.call(O.children, function (x) { x.disabled = true; }); setTimeout(function () { box.style.display = 'none'; paused = false; cb(false); }, 1600); } }
    }; O.appendChild(b); });
    box.style.display = 'flex';
  }
  function baseScene(sky, fogFar) {
    scene = new THREE.Scene(); scene.background = new THREE.Color(sky); scene.fog = new THREE.Fog(sky, 30, fogFar);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x6b7f99, 0.9));
    var sun = new THREE.DirectionalLight(0xfff1d6, 1.6); sun.position.set(20, 40, 15); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024); var sc = sun.shadow.camera; sc.left = sc.bottom = -40; sc.right = sc.top = 40; sc.far = 120;
    scene.add(sun); scene.add(sun.target); return sun;
  }
  function cloudLayer() {
    for (var i = 0; i < 22; i++) { var c = new THREE.Group(); for (var j = 0; j < 4; j++) { var m = new THREE.Mesh(new THREE.BoxGeometry(3 + Math.random() * 3, 1.2, 2 + Math.random() * 2), mat(0xffffff, { transparent: true, opacity: 0.85 })); m.position.set(j * 2.2, Math.random() * 0.6, Math.random() * 1.5); c.add(m); }
      c.position.set((Math.random() - 0.5) * 160, 18 + Math.random() * 12, (Math.random() - 0.5) * 220 - 40); scene.add(c); }
  }

  /* ================= WORD MINE ================= */
  var N = 30;
  function startMine(level) {
    var sun = baseScene(0x9ed7ff, 90); cloudLayer();
    var H = [], i, j;
    var seed = Math.random() * 100;
    for (i = 0; i < N; i++) { H.push([]); for (j = 0; j < N; j++) {
      var dx = (i - N / 2) / (N / 2), dz = (j - N / 2) / (N / 2), edge = Math.max(0, 1 - Math.hypot(dx, dz) * 0.95);
      var h = Math.round((1.5 + 2.2 * Math.sin(i * 0.33 + seed) + 1.8 * Math.cos(j * 0.27 + seed * 0.7) + 1.2 * Math.sin((i + j) * 0.18)) * edge + edge * 3);
      H[i].push(Math.max(edge > 0.08 ? 1 : 0, Math.min(8, h))); } }
    var tex = { grass: blockTex('#5cb85c', ['#4ca64c', '#6ccc6c', '#58b058'], null), side: blockTex('#8a5a3c', ['#7a4c30', '#9b6a48'], '#5cb85c'), dirt: blockTex('#8a5a3c', ['#7a4c30', '#9b6a48', '#6e4529']), stone: blockTex('#8f96a3', ['#7d8491', '#a2a9b6', '#6f7683']), sand: blockTex('#e8d8a0', ['#dccb8e', '#f0e2b0']) };
    var grassMats = [new THREE.MeshLambertMaterial({ map: tex.side }), new THREE.MeshLambertMaterial({ map: tex.side }), new THREE.MeshLambertMaterial({ map: tex.grass }), new THREE.MeshLambertMaterial({ map: tex.dirt }), new THREE.MeshLambertMaterial({ map: tex.side }), new THREE.MeshLambertMaterial({ map: tex.side })];
    var geo = new THREE.BoxGeometry(1, 1, 1), counts = { grass: 0, dirt: 0, stone: 0, sand: 0 };
    for (i = 0; i < N; i++) for (j = 0; j < N; j++) { var hh = H[i][j]; if (!hh) continue; counts[hh <= 1 ? 'sand' : 'grass']++; for (var y = Math.max(0, hh - 3); y < hh - 1; y++) counts[y < hh - 2 ? 'stone' : 'dirt']++; }
    var inst = { grass: new THREE.InstancedMesh(geo, grassMats, counts.grass), dirt: new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial({ map: tex.dirt }), counts.dirt), stone: new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial({ map: tex.stone }), counts.stone), sand: new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial({ map: tex.sand }), counts.sand) };
    var k = { grass: 0, dirt: 0, stone: 0, sand: 0 }, M = new THREE.Matrix4();
    for (i = 0; i < N; i++) for (j = 0; j < N; j++) { var h2 = H[i][j]; if (!h2) continue;
      M.makeTranslation(i - N / 2 + 0.5, h2 - 0.5, j - N / 2 + 0.5); var tp = h2 <= 1 ? 'sand' : 'grass'; inst[tp].setMatrixAt(k[tp]++, M);
      for (var y2 = Math.max(0, h2 - 3); y2 < h2 - 1; y2++) { var t2 = y2 < h2 - 2 ? 'stone' : 'dirt'; M.makeTranslation(i - N / 2 + 0.5, y2 + 0.5, j - N / 2 + 0.5); inst[t2].setMatrixAt(k[t2]++, M); } }
    Object.keys(inst).forEach(function (n) { inst[n].castShadow = inst[n].receiveShadow = true; scene.add(inst[n]); });
    var water = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshLambertMaterial({ color: 0x3d8bfd, transparent: true, opacity: 0.85 })); water.rotation.x = -Math.PI / 2; water.position.y = 0.4; scene.add(water);
    // trees
    for (var t = 0; t < 14; t++) { var ti = 3 + (Math.random() * (N - 6) | 0), tj = 3 + (Math.random() * (N - 6) | 0); if (H[ti][tj] < 2 || Math.hypot(ti - N / 2, tj - N / 2) < 5) continue;
      var tr = new THREE.Group(), trunk = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.4, 0.6), mat(0x7a4c30)); trunk.position.y = 1.2; tr.add(trunk);
      var leaf = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.8, 2.2), mat(0x3fa34d)); leaf.position.y = 2.9; tr.add(leaf); tr.position.set(ti - N / 2 + 0.5, H[ti][tj], tj - N / 2 + 0.5); tr.traverse(function (o) { o.castShadow = true; });
      scene.add(tr); H[ti][tj] += 3; }
    // word blocks
    var Q = questions(level, 10, false), ores = [], gold = blockTex('#ffcf3f', ['#ffe07a', '#f2b632', '#fff2b0'], null);
    var oreMat = new THREE.MeshLambertMaterial({ map: gold, emissive: 0x6b4a00, emissiveIntensity: 0.6 });
    var used = {};
    for (var q = 0; q < Q.length; q++) {
      for (var tries = 0; tries < 200; tries++) { var oi = 2 + (Math.random() * (N - 4) | 0), oj = 2 + (Math.random() * (N - 4) | 0); if (H[oi][oj] >= 2 && H[oi][oj] < 7 && !used[oi + ':' + oj] && Math.hypot(oi - N / 2, oj - N / 2) > 3) break; }
      used[oi + ':' + oj] = 1;
      var ore = new THREE.Mesh(geo, oreMat); ore.position.set(oi - N / 2 + 0.5, H[oi][oj] + 0.5, oj - N / 2 + 0.5); ore.castShadow = true; scene.add(ore);
      var tag = textPlane('?', 0.7, 0.7, { bg: '#0b1f3a', color: '#ffcf3f', border: '#ffcf3f', size: 90 }); tag.position.set(ore.position.x, ore.position.y + 1.2, ore.position.z); scene.add(tag);
      ores.push({ mesh: ore, tag: tag, i: oi, j: oj, q: Q[q], done: false }); H[oi][oj] += 1;
    }
    var player = makePlayer(); scene.add(player);
    var p = { x: 0.5, y: H[N / 2][N / 2] + 0.01, z: 0.5, vy: 0, ground: true };
    G = { mode: 'mine', level: level, player: player, p: p, H: H, ores: ores, gems: 0, total: ores.length, sun: sun, t0: performance.now(), done: 0 };
    mission(); setTimeout(function () { if (G && G.mode === 'mine' && !G.over) toast('Welcome to the Word Mine! Find the glowing blocks and mine them. Your first mission: collect ' + G.goal + ' gems.'); }, 900);
    $('#hint').textContent = 'Find the glowing gold blocks · walk next to one and press E (or ⛏) to mine it';
    updateMineHud();
  }
  function heightAt(x, z) { var i = Math.floor(x + N / 2), j = Math.floor(z + N / 2); if (i < 0 || j < 0 || i >= N || j >= N) return -5; return G.H[i][j]; }
  function updateMineHud() { hud('<span>⛏ Word Mine · ' + G.level + '</span><span>💎 ' + G.gems + ' / ' + G.total + '</span><span>' + (G.total - G.done) + ' blocks left</span>'); }
  function stepMine(dt) {
    var p = G.p, sp = 5.2, mv = moveVec();
    var nx = p.x + mv.x * sp * dt, nz = p.z + mv.z * sp * dt;
    // walls: a block more than half a block above the feet stops you; one step up happens by itself
    var hx = heightAt(nx, p.z), hz = heightAt(p.x, nz);
    if (hx <= p.y + 0.55) { if (hx > p.y && p.ground) p.y = hx; p.x = nx; }
    if (hz <= p.y + 0.55) { if (hz > p.y && p.ground) p.y = hz; p.z = nz; }
    var g = heightAt(p.x, p.z);
    if (wantJump && p.ground) { p.vy = 8.2; p.ground = false; beep('jump'); }
    p.vy -= 24 * dt; p.y += p.vy * dt;
    if (p.y <= g) { p.y = g; p.vy = 0; p.ground = true; } else p.ground = false;
    if (p.y < -3) { p.x = 0.5; p.z = 0.5; p.y = heightAt(0.5, 0.5) + 2; toast('Splash! Back to the middle.'); }
    // nearest word block
    var near = null, best = 9;
    G.ores.forEach(function (o) { if (o.done) return; var d = Math.hypot(o.mesh.position.x - p.x, o.mesh.position.z - p.z), dy = Math.abs(o.mesh.position.y - (p.y + 0.5)); if (d < 2.3 && dy < 2 && d < best) { best = d; near = o; } o.tag.lookAt(camera.position); o.mesh.rotation.y += dt * 0.4; });
    $('#act').style.display = near ? 'block' : 'none';
    if (near && wantMine) {
      beep('dig');
      ask(near.q, function (first) {
        near.done = true; G.done++; scene.remove(near.tag); burst(near.mesh.position, first ? 0xffcf3f : 0x8f96a3);
        scene.remove(near.mesh); G.H[near.i][near.j] -= 1;
        if (first) { G.gems++; beep('gem'); if (G.goal && G.gems >= G.goal && G.gems < G.total) { var was = G.goal; mission(); toast('⭐ Mission complete: ' + was + ' gems! Next mission: ' + G.goal + ' gems.'); } else toast('💎 +1 gem! ' + (G.goal ? (G.goal - G.gems) + ' more for your mission.' : '')); } else toast('The block crumbled — no gem this time.');
        updateMineHud(); if (G.done >= G.total) finish();
      });
    }
    wantMine = false; wantJump = false;
  }

  /* ================= GRAMMAR OBBY ================= */
  var PALETTE = [0xff7a59, 0x4cc76a, 0x3d8bfd, 0xb98cff, 0xffc23d, 0xff5ca8];
  var ANS_COL = [0xff4f6d, 0x3d8bfd, 0x22c55e], ANS_L = ['A', 'B', 'C'], ANS_CSS = ['#ff4f6d', '#3d8bfd', '#22c55e'];
  function qPanel(g) {
    var el = $('#qpanel'); if (!el) return;
    if (!g) { el.style.display = 'none'; return; }
    if (el.dataset.g === String(G.gates.indexOf(g))) return; el.dataset.g = G.gates.indexOf(g);
    el.innerHTML = '<div class="qq">' + (G.gates.indexOf(g) + 1) + '. ' + escH(g.q.q) + '</div><div class="qa">' + g.q.opts.map(function (o, k) { return '<button type="button" data-k="' + k + '" style="background:' + ANS_CSS[k % 3] + '"><b>' + ANS_L[k] + '</b> ' + escH(o) + '</button>'; }).join('') + '</div><div class="qh">Tap an answer (or press 1, 2, 3) — or jump onto the platform with the same colour</div>';
    el.style.display = 'block';
    [].forEach.call(el.querySelectorAll('button'), function (b) { b.onclick = function (e) { e.stopPropagation(); pickAnswer(g, +b.dataset.k); }; b.onpointerdown = function (e) { e.stopPropagation(); }; });
  }
  /** Tapping an answer: the player jumps onto that answer's platform (right → it stays; wrong → it falls). */
  addEventListener('keydown', function (e) { if (!G || G.mode !== 'obby' || paused) return; var k = '123'.indexOf(e.key); if (k < 0) return; var g = G.gates.filter(function (x) { return !x.passed; })[0]; if (g) pickAnswer(g, k); });
  function pickAnswer(g, k) {
    if (!G || G.mode !== 'obby' || g.passed) return;
    var A = g.answers[k]; if (!A || A.gone) return;
    var p = G.p; p.cp = { x: g.cp.x, y: g.cp.y, z: g.cp.z }; g.announced = true;
    p.x = A.x; p.z = A.z; p.y = A.y + 2.2; p.vy = 2; p.ground = false; p.on = null; beep('jump');
  }
  function escH(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function startObby(level) {
    baseScene(0x7ec8ff, 120); cloudLayer();
    var plats = [], signs = [], Q = questions(level, 8, true), z = 0, x = 0, y = 0;
    var add = function (px, py, pz, w, d, color, kind) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.8, d), mat(color)); m.position.set(px, py - 0.4, pz); m.castShadow = m.receiveShadow = true; scene.add(m); var P = { m: m, x: px, y: py, z: pz, w: w, d: d, kind: kind || 'plain', base: px, phase: Math.random() * 6 }; plats.push(P); return P; };
    var start = add(0, 0, 0, 8, 8, 0xeef2f8, 'start');
    var startSign = textPlane('IF Grammar Obby · ' + level + ' — jump onto the right answer!', 7, 1.4, { size: 40 }); startSign.position.set(0, 3.2, -3.8); scene.add(startSign);
    z = -4;
    var gates = [];
    Q.forEach(function (q, qi) {
      var hops = 3 + (qi % 2);
      for (var h = 0; h < hops; h++) {
        z -= 4.6; x = Math.max(-4, Math.min(4, x + (Math.random() * 4 - 2))); y = Math.max(0, Math.min(5, y + (Math.random() < 0.5 ? 0.6 : -0.3)));
        var mvng = qi > 1 && h === 1 && Math.random() < 0.6;
        add(x, y, z - 1.5, 3, 3, PALETTE[(qi + h) % PALETTE.length], mvng ? 'move' : 'plain'); z -= 1.5;
      }
      z -= 4.5; var cp = add(0, y, z - 2, 9, 4, 0x2f9e57, 'check'); cp.gate = qi; z -= 4;
      var flag = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.4, 0.15), mat(0xffffff)); flag.position.set(-4, y + 1.2, cp.z); scene.add(flag);
      var cloth = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 0.05), mat(0xc9a24e)); cloth.position.set(-3.5, y + 2.1, cp.z); scene.add(cloth);
      z -= 5.5; var row = z;
      var sign = textPlane((qi + 1) + '. ' + q.q, 12, 2.4, { size: 46 }); sign.position.set(0, y + 5.4, row - 1.6); scene.add(sign); signs.push(sign);
      // each answer has its own colour and letter (A red, B blue, C green), the same as the panel at the bottom of the screen
      var answers = q.opts.map(function (o, k) { var A = add((k - (q.opts.length - 1) / 2) * 4.6, y, row - 1.5, 3.6, 3, ANS_COL[k % 3], 'answer'); A.correct = k === q.a; A.gate = qi;
        var lab = textPlane(ANS_L[k] + '  ' + o, 4.4, 1.5, { size: 52 }); lab.position.set(A.x, y + 2.1, A.z + 1.2); scene.add(lab); A.label = lab; return A; });
      gates.push({ q: q, cp: cp, answers: answers, missed: false, passed: false });
      z = row - 3; x = 0;
    });
    z -= 5; var fin = add(0, y, z - 3, 10, 6, 0xffcf3f, 'finish');
    var trophy = new THREE.Group(), cup = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.4, 1.2, 8), mat(0xffcf3f, { emissive: 0x6b4a00 })); cup.position.y = 1.6; trophy.add(cup);
    var stand = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 1), mat(0x0b1f3a)); stand.position.y = 0.6; trophy.add(stand); trophy.position.set(0, y, fin.z); scene.add(trophy);
    var player = makePlayer(); scene.add(player);
    var p = { x: 0, y: 0.01, z: 1, vy: 0, ground: true, on: null, cp: { x: 0, y: 0.5, z: 1 } };
    G = { mode: 'obby', level: level, player: player, p: p, plats: plats, gates: gates, falls: 0, right: 0, t0: performance.now(), trophy: trophy, fin: fin };
    setTimeout(function () { if (G && G.mode === 'obby' && !G.over) toast('Welcome to the Grammar Obby! Run, jump, and land on the right answer. There are ' + G.gates.length + ' questions on the way to the trophy.'); }, 900);
    $('#hint').textContent = 'Read the sign, then jump onto the platform with the right answer · Space to jump · drag to look around';
    updateObbyHud();
  }
  function updateObbyHud() { var passed = G.gates.filter(function (g) { return g.passed; }).length;
    if (G.mode === 'tower') return hud('<span>🗼 Tower Climb · ' + G.level + '</span><span>✅ ' + G.right + ' / ' + G.gates.length + '</span><span>🪙 ' + G.got + '</span><span>⬆ ' + Math.max(0, Math.round(G.p.y)) + ' / ' + Math.round(G.top) + ' m</span><span>💥 ' + G.falls + '</span>');
    hud('<span>🏃 Grammar Obby · ' + G.level + '</span><span>✅ ' + G.right + ' / ' + G.gates.length + '</span><span>⏱ ' + Math.round((performance.now() - G.t0) / 1000) + 's</span><span>💥 ' + G.falls + '</span>'); }
  function stepObby(dt, t) {
    var p = G.p, sp = 6.4, mv = moveVec();
    G.plats.forEach(function (P) { if (P.kind === 'move') { var nx = P.base + Math.sin(t * 1.4 + P.phase) * 2.2; if (p.on === P) p.x += nx - P.x; P.x = nx; P.m.position.x = nx; }
      if (P.dropping) { P.vy = (P.vy || 0) - 20 * dt; P.y += P.vy * dt; P.m.position.y = P.y - 0.4; if (P.label) P.label.position.y = P.y + 1.3; } });
    p.x += mv.x * sp * dt; p.z += mv.z * sp * dt;
    if (wantJump && p.ground) { p.vy = 9.4; p.ground = false; p.on = null; beep('jump'); }
    p.vy -= 24 * dt; var oldY = p.y; p.y += p.vy * dt;
    p.ground = false; var landed = null;
    if (p.vy <= 0) G.plats.forEach(function (P) {
      if (P.gone) return;
      if (Math.abs(p.x - P.x) <= P.w / 2 + 0.2 && Math.abs(p.z - P.z) <= P.d / 2 + 0.2 && oldY >= P.y - 0.05 && p.y <= P.y + 0.01) { landed = P; }
    });
    if (landed) { p.y = landed.y; p.vy = 0; p.ground = true; if (p.on !== landed) onLand(landed); p.on = landed; } else p.on = null;
    if (p.y < (G.mode === 'tower' ? p.cp.y - 18 : -25)) { G.falls++; beep('fall'); p.x = p.cp.x; p.y = p.cp.y + 0.5; p.z = p.cp.z; p.vy = 0; toast('Back to the last checkpoint!'); updateObbyHud(); }
    G.trophy.rotation.y += dt;
    if (G.coins) for (var ci = G.coins.length - 1; ci >= 0; ci--) { var co = G.coins[ci]; co.rotation.z += dt * 3; if (Math.abs(co.position.x - p.x) < 0.9 && Math.abs(co.position.z - p.z) < 0.9 && Math.abs(co.position.y - (p.y + 1)) < 1.2) { scene.remove(co); G.coins.splice(ci, 1); G.got++; beep('gem'); updateObbyHud(); } }
    qPanel(G.gates.filter(function (g) { return !g.passed; })[0] || null);
    if (Math.random() < 0.05) updateObbyHud();
    wantJump = false; wantMine = false;
  }
  function onLand(P) {
    var p = G.p;
    if (P.kind === 'kill') { G.falls++; beep('fall'); burst(new THREE.Vector3(p.x, p.y + 0.5, p.z), 0xff3b3b); toast('Ouch! Red bricks send you back to the checkpoint.'); p.x = p.cp.x; p.y = p.cp.y + 0.5; p.z = p.cp.z; p.vy = 0; p.on = null; updateObbyHud(); return; }
    if (P.kind === 'pad') { p.vy = 15; p.ground = false; beep('jump'); return; }
    if (P.kind === 'check') { p.cp = { x: P.x, y: P.y, z: P.z }; var g = G.gates[P.gate]; if (g && !g.announced) { g.announced = true; toast('Checkpoint ✓ Read the question on the sign!'); say(g.q.q.replace(/___/g, 'blank')); } }
    if (P.kind === 'answer') {
      var gate = G.gates[P.gate];
      if (P.correct) { if (!gate.passed) { gate.passed = true; if (!gate.missed) G.right++; beep('ok'); burst(new THREE.Vector3(P.x, P.y + 0.5, P.z), 0x4cc76a); say(gate.q.say || ''); toast(gate.missed ? 'Correct — keep going!' : '✅ Correct! ' + (function () { var d = G.gates.filter(function (g) { return g.passed; }).length, n = G.gates.length; return d >= n ? 'That was the last one. Run to the trophy!' : d + ' of ' + n + ' done.'; })()); P.m.material = mat(0x4cc76a); p.cp = { x: P.x, y: P.y, z: P.z }; updateObbyHud(); } }
      else { gate.missed = true; P.m.material = mat(0xd64545); beep('bad'); toast('✗ Wrong — it falls!'); setTimeout(function () { P.dropping = true; P.gone = true; }, 350); }
    }
    if (P.kind === 'finish' && !G.over) finish();
  }

  /* ================= TOWER CLIMB (an obby tower) =================
     A spiral of stages around a central tower: jump up the colourful blocks, avoid the red kill bricks (they send
     you back to the last checkpoint), bounce on the green jump pads, collect coins, and at each checkpoint floor
     jump onto the right answer to unlock the next part of the climb. */
  function startTower(level) {
    var kid = isKid(level);
    baseScene(0x9fd4ff, 160); cloudLayer();
    var plats = [], coins = [], Q = questions(level, kid ? 6 : 8, true), ang = 0, y = 0, R = 9, gates = [];
    var add = function (px, py, pz, w, d, color, kind) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.8, d), mat(color, kind === 'kill' ? { emissive: 0x7a0f0f } : kind === 'pad' ? { emissive: 0x0d4d22 } : undefined)); m.position.set(px, py - 0.4, pz); m.castShadow = m.receiveShadow = true; scene.add(m); var P = { m: m, x: px, y: py, z: pz, w: w, d: d, kind: kind || 'plain', base: px, phase: Math.random() * 6 }; plats.push(P); return P; };
    // the tower core and a base island
    var core = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 5), mat(0x0b1f3a)); core.scale.y = (Q.length * 7 + 14); core.position.set(0, core.scale.y / 2 - 6, 0); scene.add(core);
    for (var s = 0; s < Q.length * 7 + 10; s += 3) { var st = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.3, 5.1), mat(PALETTE[(s / 3) % PALETTE.length])); st.position.set(0, s - 4, 0); scene.add(st); }
    add(0, 0, R, 8, 6, 0xeef2f8, 'start');
    var sign0 = textPlane('IF Tower Climb · ' + level + ' — climb to the top!', 7, 1.4, { size: 40 }); sign0.position.set(0, 3.2, R - 2.6); scene.add(sign0);
    var at = function (a, r) { return { x: Math.sin(a) * r, z: Math.cos(a) * r }; };
    Q.forEach(function (q, qi) {
      var hops = kid ? 4 : 5 + (qi % 2);
      for (var h = 0; h < hops; h++) {
        ang += 0.42; y += kid ? 0.7 : 0.9; var P = at(ang, R + (h % 2 ? 1.2 : -0.6));
        var roll = Math.random(), kind = 'plain';
        if (!kid && qi > 0 && h === 2 && roll < 0.35) kind = 'move';
        if (h === hops - 2 && roll > 0.7) kind = 'pad';
        var B = add(P.x, y, P.z, kind === 'pad' ? 2.4 : 2.8, kind === 'pad' ? 2.4 : 2.8, kind === 'pad' ? 0x22c55e : PALETTE[(qi * 3 + h) % PALETTE.length], kind);
        if (kind === 'pad') y += 2.2;                                                      // the pad throws you up to the next stage
        // a kill brick next to (not on) the path
        if ((!kid || qi > 1) && h === 1) { var K = at(ang + 0.2, R + 3.2); add(K.x, y + 0.2, K.z, 2, 2, 0xff3b3b, 'kill'); }
        if (h % 2 === 0) { var c = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.12, 16), mat(0xffcf3f, { emissive: 0x6b4a00 })); c.rotation.x = Math.PI / 2; c.position.set(P.x, y + 1.3, P.z); scene.add(c); coins.push(c); }
      }
      // checkpoint floor with the question and three answer pads
      ang += 0.55; y += 0.9; var C = at(ang, R + 0.4);
      var cp = add(C.x, y, C.z, 5, 5, 0x2f9e57, 'check'); cp.gate = qi;
      var flag = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.4, 0.15), mat(0xffffff)); flag.position.set(C.x + 2, y + 1.2, C.z); scene.add(flag);
      var cloth = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 0.05), mat(0xc9a24e)); cloth.position.set(C.x + 2.5, y + 2.1, C.z); scene.add(cloth);
      var S0 = at(ang + 0.25, R - 3.6), sign = textPlane((qi + 1) + '. ' + q.q, 7, 1.8, { size: 44 }); sign.position.set(S0.x, y + 4.2, S0.z); sign.lookAt(S0.x * 3, y + 4.2, S0.z * 3); scene.add(sign);
      // answer pads side by side across the path (inner, middle, outer), all one jump from the checkpoint; behind them a
      // walkway one step up, reachable from whichever pad is right, leads on to the next part of the climb
      ang += 0.5; y += 0.4; var n3 = q.opts.length, RAD = [R - 2.4, R + 0.4, R + 3.2];
      var answers = q.opts.map(function (o, k) { var A0 = at(ang, RAD[k] != null ? RAD[k] : R), A = add(A0.x, y, A0.z, 2.4, 2.4, ANS_COL[k % 3], 'answer'); A.correct = k === q.a; A.gate = qi;
        var lab = textPlane(ANS_L[k] + '  ' + o, 2.6, 1.0, { size: 50 }); lab.position.set(A.x, y + 1.8, A.z); lab.lookAt(A.x * 2, y + 1.8, A.z * 2); scene.add(lab); A.label = lab; return A; });
      gates.push({ q: q, cp: cp, answers: answers, missed: false, passed: false });
      ang += 0.36; var wy = y + 1.0;
      [R - 2.4, R - 0.4, R + 1.6, R + 3.4].forEach(function (r) { var W0 = at(ang, r); add(W0.x, wy, W0.z, 2.4, 2.4, 0xdfe7f3, 'walk'); });
      y = wy;
    });
    ang += 0.5; y += 1; var F = at(ang, R), fin = add(F.x, y, F.z, 6, 6, 0xffcf3f, 'finish');
    var trophy = new THREE.Group(), cup = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.4, 1.2, 8), mat(0xffcf3f, { emissive: 0x6b4a00 })); cup.position.y = 1.6; trophy.add(cup);
    var stand = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 1), mat(0x0b1f3a)); stand.position.y = 0.6; trophy.add(stand); trophy.position.set(F.x, y, F.z); scene.add(trophy);
    var player = makePlayer(); scene.add(player);
    var p = { x: 0, y: 0.01, z: R + 1, vy: 0, ground: true, on: null, cp: { x: 0, y: 0.5, z: R + 1 } };
    G = { mode: 'tower', level: level, player: player, p: p, plats: plats, gates: gates, falls: 0, right: 0, coins: coins, got: 0, t0: performance.now(), trophy: trophy, fin: fin, top: y };
    setTimeout(function () { if (G && G.mode === 'tower' && !G.over) toast('Welcome to the Tower Climb! Red bricks send you back. Green pads bounce you up. Answer at every checkpoint: there are ' + G.gates.length + ' on the way to the top.'); }, 900);
    $('#hint').textContent = 'Climb the tower · red bricks send you back · green pads bounce you up · answer at every checkpoint';
    updateObbyHud();
  }

  /* ---------------- shared: movement, particles, camera, finish ---------------- */
  function moveVec() {
    var f = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0) - joy.y, r = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0) + joy.x;
    var len = Math.hypot(f, r); if (len > 1) { f /= len; r /= len; }
    var fx = -Math.sin(yaw), fz = -Math.cos(yaw), rx = Math.cos(yaw), rz = -Math.sin(yaw);
    return { x: fx * f + rx * r, z: fz * f + rz * r, len: Math.min(1, len) };
  }
  var parts = [];
  function burst(pos, color) { for (var i = 0; i < 18; i++) { var m = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), mat(color)); m.position.copy(pos); m.userData.v = new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 6 + 2, (Math.random() - 0.5) * 6); m.userData.life = 1; scene.add(m); parts.push(m); } }
  function finish() {
    G.over = true; paused = true; beep('win');
    var secs = Math.round((performance.now() - G.t0) / 1000), key = G.mode + ':' + G.level, score = G.mode === 'mine' ? G.gems : G.right, total = G.mode === 'mine' ? G.total : G.gates.length;
    var best = SAVE[key] || 0, isBest = score > best; if (isBest) { SAVE[key] = score; persist(); }
    var stars = score >= total * 0.9 ? 3 : score >= total * 0.6 ? 2 : score >= total * 0.3 ? 1 : 0;
    var box = $('#q'); $('#qk').textContent = G.mode === 'mine' ? 'Word Mine complete' : G.mode === 'tower' ? 'You reached the top!' : 'Course complete';
    $('#qt').innerHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars) + '<br>' + (G.mode === 'mine' ? '💎 ' + score + ' gems out of ' + total : '✅ ' + score + ' / ' + total + ' first try' + (G.mode === 'tower' ? ' · 🪙 ' + G.got + ' coins' : '') + ' · 💥 ' + G.falls + ' falls') + ' · ⏱ ' + secs + 's' + (isBest ? '<br><small style="color:#1f9d55">New best for ' + G.level + '!</small>' : '');
    $('#qo').innerHTML = '<button id="again">↻ Play again</button><button id="tomenu">☰ Choose another game or level</button>';
    $('#again').onclick = function () { box.style.display = 'none'; begin(G.mode, G.level); };
    $('#tomenu').onclick = function () { box.style.display = 'none'; showMenu(); };
    box.style.display = 'flex';
  }
  var lastT = 0, walkT = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    if (!G || !scene) return;
    var dt = Math.min(0.05, (now - (lastT || now)) / 1000); lastT = now;
    if (!paused) (G.mode === 'mine' ? stepMine : stepObby)(dt, now / 1000);   // the tower uses the obby physics
    var p = G.p, pl = G.player, mv = moveVec();
    pl.position.set(p.x, p.y, p.z);
    if (mv.len > 0.1 && !paused) { var target = Math.atan2(-mv.x, -mv.z); var d = target - pl.rotation.y; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; pl.rotation.y += d * Math.min(1, dt * 12); walkT += dt * 10; }
    var sw = mv.len > 0.1 && p.ground && !paused ? Math.sin(walkT) * 0.6 : 0;
    pl.userData.legs[0].rotation.x = sw; pl.userData.legs[1].rotation.x = -sw; pl.userData.arms[0].rotation.x = -sw; pl.userData.arms[1].rotation.x = sw;
    var dist = 7.5, cx = p.x + Math.sin(yaw) * Math.cos(pitch) * dist, cz = p.z + Math.cos(yaw) * Math.cos(pitch) * dist, cy = p.y + 1.4 + Math.sin(pitch) * dist;
    camera.position.lerp(new THREE.Vector3(cx, cy, cz), Math.min(1, dt * 8)); camera.lookAt(p.x, p.y + 1.4, p.z);
    for (var i = parts.length - 1; i >= 0; i--) { var m = parts[i]; m.userData.v.y -= 15 * dt; m.position.addScaledVector(m.userData.v, dt); m.userData.life -= dt; m.scale.setScalar(Math.max(0.01, m.userData.life)); if (m.userData.life <= 0) { scene.remove(m); parts.splice(i, 1); } }
    renderer.render(scene, camera);
  }
  requestAnimationFrame(loop);

  /* ---------------- menu ---------------- */
  var MODE = SAVE.mode || 'mine', LEVEL = SAVE.level || 'B1';  // LEVEL: A1–C2, or Starters / Movers / Flyers
  (function () { var q = new URLSearchParams(location.search); var ql = q.get('level') || ''; ql = KIDS.filter(function (k) { return k.toLowerCase() === ql.toLowerCase(); })[0] || ql; if (LEVELS.indexOf(ql) >= 0 || isKid(ql)) LEVEL = ql; if (['obby', 'mine', 'tower'].indexOf(q.get('mode')) >= 0) MODE = q.get('mode');
    var c = IFX_BANK.courses.filter(function (x) { return x.id === q.get('course'); })[0];
    if (c) { PICK.c = c.id; LEVEL = c.level; if (c.units.some(function (u) { return u.id === q.get('unit'); })) PICK.u = q.get('unit'); }
  })();
  function courseMenu() {
    var el = $('#crs'); if (!el) return;
    el.style.display = isKid(LEVEL) ? 'none' : '';
    var list = IFX_BANK.courses.filter(function (c) { return c.level === LEVEL; });
    if (PICK.c && !list.some(function (c) { return c.id === PICK.c; })) { PICK.c = ''; PICK.u = ''; }
    var esc = function (t) { return String(t).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
    el.innerHTML = '<option value="">All ' + LEVEL + ' courses</option>' + list.map(function (c) {
      return '<optgroup label="' + esc(c.title) + '"><option value="' + c.id + '|">' + esc(c.title) + ' · all units</option>' + c.units.map(function (u, i) { return '<option value="' + c.id + '|' + u.id + '">Unit ' + (i + 1) + ' · ' + esc(u.title) + '</option>'; }).join('') + '</optgroup>';
    }).join('');
    el.value = PICK.c ? PICK.c + '|' + PICK.u : '';
    el.onchange = function () { var v = el.value.split('|'); PICK.c = v[0] || ''; PICK.u = v[1] || ''; };
  }
  function showMenu() {
    paused = true; $('#start').style.display = 'flex';
    var lvb = function (l) { var b = SAVE['mine:' + l] || SAVE['obby:' + l] || SAVE['tower:' + l]; return '<button data-lv="' + l + '" class="' + (l === LEVEL ? 'on' : '') + '">' + l + (b ? ' <small>★</small>' : '') + '</button>'; };
    $('#levels').innerHTML = '<span class="lvh">🧒 Kids</span>' + KIDS.map(lvb).join('') + '<span class="lvh">🎧 Teens &amp; adults</span>' + LEVELS.map(lvb).join('');
    avatarPanel();
    [].forEach.call(document.querySelectorAll('[data-lv]'), function (b) { b.onclick = function () { LEVEL = b.dataset.lv; showMenu(); }; });
    courseMenu();
    [].forEach.call(document.querySelectorAll('.mode'), function (b) { b.classList.toggle('on', b.dataset.mode === MODE); b.onclick = function () { MODE = b.dataset.mode; showMenu(); }; });
  }
  function avatarPanel() {
    var el = $('#avatar'); if (!el) return;
    var hex = function (n) { return '#' + ('00000' + n.toString(16)).slice(-6); }, HATS = { hair: '💇 Hair', cap: '🧢 Cap', crown: '👑 Crown', headphones: '🎧 Headphones', beanie: '🧶 Beanie', none: '🙂 Short hair' };
    var row = function (k, label) { return '<div class="avr"><b>' + label + '</b>' + AV_OPT[k].map(function (v, i) { return k === 'hat' ? '<button data-av="' + k + ':' + i + '" class="avt' + (AV[k] === i ? ' on' : '') + '">' + HATS[v] + '</button>' : '<button data-av="' + k + ':' + i + '" class="avc' + (AV[k] === i ? ' on' : '') + '" style="background:' + hex(v) + '" aria-label="' + label + ' ' + (i + 1) + '"></button>'; }).join('') + '</div>'; };
    el.innerHTML = row('skin', 'Skin') + row('shirt', 'Shirt') + row('pants', 'Trousers') + row('hat', 'Head');
    [].forEach.call(el.querySelectorAll('[data-av]'), function (b) { b.onclick = function () { var v = b.dataset.av.split(':'); AV[v[0]] = +v[1]; SAVE.av = AV; persist(); avatarPanel(); }; });
  }
  function begin(mode, level) {
    if (isKid(level) && !KB) { loadKids().then(function () { begin(mode, level); }); return; }
    MODE = mode; LEVEL = level; SAVE.mode = mode; SAVE.level = level; persist();
    $('#start').style.display = 'none'; paused = false; yaw = 0; pitch = 0.32;
    parts = []; var qp = $('#qpanel'); if (qp) { qp.style.display = 'none'; qp.dataset.g = ''; } (mode === 'mine' ? startMine : mode === 'tower' ? startTower : startObby)(level);
    camera.position.set(G.p.x, G.p.y + 6, G.p.z + 9);
  }
  $('#play').onclick = function () { begin(MODE, LEVEL); };
  $('#menu').onclick = function () { $('#q').style.display = 'none'; showMenu(); };
  $('#home').onclick = function () { location.href = '/app/#/games'; };
  showMenu();
  window.IFBQ = { begin: begin, state: function () { return G; } };
})();
