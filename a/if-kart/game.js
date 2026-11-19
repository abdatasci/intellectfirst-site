/* IF Kart — a 3D kart race for English learners (Three.js). Original art, built from simple shapes.
   Levels: Starters, Movers, Flyers, A2 Key, B1 PET. Questions come from the IF Live banks (pictures, words, definitions)
   and the IF Kids Quest lands (sentences).
   Two ways to play: "Race first" (default): pure driving with a spoken narrator, gift boxes give a turbo, and the English
   questions come after the finish line as a pit stop. "Quiz race": a gift box stops the race for a question → turbo or spin. */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var store = { get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  var SAVE = store.get('ifkart') || {};
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  /* ---------------- levels and themes ---------------- */
  var LEVELS = [
    { id: 'starters', name: 'Starters', sub: 'Pre A1 · pictures', col: '#ff4fa3', kq: 'Starters', banks: ['y-starters'],
      th: { sky: 0xbfe3ff, fog: 0xe9d9ff, grass: '#8fdc7a', grass2: '#7ccf68', road: '#8e86b8', kerb: ['#ff4fa3', '#ffffff'], tree: [0x5cc96b, 0xff8fc8], deco: 'candy' } },
    { id: 'movers', name: 'Movers', sub: 'A1 · words', col: '#ff9a3c', kq: 'Movers', banks: ['y-movers'],
      th: { sky: 0xa8dbff, fog: 0xd8efff, grass: '#a6d96a', grass2: '#93cb57', road: '#7d8597', kerb: ['#ff9a3c', '#ffffff'], tree: [0x4fb35e, 0x3f9a50], deco: 'forest' } },
    { id: 'flyers', name: 'Flyers', sub: 'A2 · phrases', col: '#3d8bfd', kq: 'Flyers', banks: ['y-flyers'],
      th: { sky: 0xdff1ff, fog: 0xf2f8ff, grass: '#eef6ff', grass2: '#dde9f7', road: '#6f7aa0', kerb: ['#3d8bfd', '#ffffff'], tree: [0x2f8f6b, 0xffffff], deco: 'snow' } },
    { id: 'ket', name: 'A2 Key', sub: 'KET · sentences', col: '#16a34a', kq: 'KET', banks: ['v-KET'],
      th: { sky: 0x7cc4ff, fog: 0xcfe7ff, grass: '#9bd27a', grass2: '#86c266', road: '#5b6170', kerb: ['#16a34a', '#ffffff'], tree: [0x3f9a50, 0x7c4a2a], deco: 'city' } },
    { id: 'pet', name: 'B1 PET', sub: 'Preliminary', col: '#7c4dff', kq: 'PET', banks: ['v-PET'],
      th: { sky: 0x6fd0ff, fog: 0xc8f0ff, grass: '#f2d98b', grass2: '#e6c86e', road: '#7a6a5a', kerb: ['#7c4dff', '#ffffff'], tree: [0x2fae5f, 0x8a5a2b], deco: 'beach' } }
  ];
  var DRIVERS = [
    { id: 'cat', name: 'Kitty', fur: 0xffa64d, kart: 0xff4fa3, ear: 'cat' },
    { id: 'bunny', name: 'Bunny', fur: 0xffffff, kart: 0x3d8bfd, ear: 'bunny' },
    { id: 'bear', name: 'Teddy', fur: 0x9a6233, kart: 0x22c55e, ear: 'bear' },
    { id: 'fox', name: 'Foxy', fur: 0xff6a2b, kart: 0xffc83d, ear: 'fox' },
    { id: 'panda', name: 'Panda', fur: 0xf4f4f4, kart: 0x7c4dff, ear: 'panda' },
    { id: 'frog', name: 'Froggy', fur: 0x6fd36b, kart: 0xff8a3d, ear: 'frog' }
  ];
  var LV = LEVELS.filter(function (l) { return l.id === (new URLSearchParams(location.search).get('level') || SAVE.level); })[0] || LEVELS[0];
  var ME = DRIVERS.filter(function (d) { return d.id === SAVE.driver; })[0] || DRIVERS[0];

  var MODE = SAVE.mode === 'quiz' ? 'quiz' : 'free', NARR_ON = SAVE.narr !== 0;
  var EASY = function () { return LEVELS.indexOf(LV) < 2; };

  /* ---------------- questions ---------------- */
  var BANKS = null;
  function loadBanks() { return BANKS ? Promise.resolve(BANKS) : fetch('/live/banks.json').then(function (r) { return r.json(); }).then(function (d) { BANKS = d.banks; return BANKS; }).catch(function () { BANKS = []; return BANKS; }); }
  function questionsFor(lv) {
    var out = [];
    (BANKS || []).filter(function (b) { return lv.banks.indexOf(b.id) >= 0; }).forEach(function (b) {
      b.units.forEach(function (u) {
        if (u.q) u.q.forEach(function (q) { if (q[1].length < 2) return; var right = q[1][q[2]], o = shuffle(q[1]).slice(0, 3); if (o.indexOf(right) < 0) o[0] = right; o = shuffle(o); out.push({ p: q[0], o: o, a: o.indexOf(right), say: /^\P{L}*$/u.test(q[0].split(' ')[0]) ? '' : q[0].replace('___', right) }); });
        if (u.w) u.w.forEach(function (w) { var others = shuffle(u.w.filter(function (x) { return x[0] !== w[0]; })).slice(0, 2).map(function (x) { return x[0]; }); if (others.length < 2) return; var o = shuffle([w[0]].concat(others)); out.push({ p: w[1].charAt(0).toUpperCase() + w[1].slice(1), o: o, a: o.indexOf(w[0]), say: w[1], word: w[0] }); });
      });
    });
    (window.KQ_LANDS || []).filter(function (l) { return l.level === lv.kq; }).forEach(function (l) {
      (l.kartQ || []).forEach(function (q) { var o = shuffle(q.o); out.push({ p: q.t, o: o, a: o.indexOf(q.a), say: q.t }); });
      (l.mine || []).forEach(function (m) { if (m.type === 'gap') { var o = shuffle(m.opts); out.push({ p: m.t, o: o, a: o.indexOf(m.opts[0]), say: m.t.replace('___', m.opts[0]) }); } });
    });
    return shuffle(out);
  }

  /* ---------------- voice and sounds ---------------- */
  function say(t) { if (!t || !window.speechSynthesis) return; try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(String(t).replace(/___/g, 'blank')); u.lang = 'en-GB'; u.rate = 0.92; speechSynthesis.speak(u); } catch (e) {} }
  /* The narrator: short spoken English about the race, also shown as a caption. Starters and Movers get simpler lines.
     pri 2 always speaks; pri 1 waits for a quiet moment so the lines never pile up. */
  var ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth'], NARR = { last: -9999, capT: null };
  var LINES = {
    ready: [['Get ready!', 'Are you ready?'], ['Engines on. Get ready!', 'Drivers, get ready for the start!']],
    go: [['Go, go, go!', 'Go!'], ['And they are off!', 'Go! The race is on!']],
    up: [['Great! You are {p}!', 'Yes! You are {p} now!'], ['Great overtake! You are up to {p} place.', 'You pass {n}! That puts you in {p} place.']],
    down: [['Oh no! {n} is faster.', '{n} is in front of you!'], ['{n} gets past you. You are down to {p}.', 'Careful! {n} takes your place. You are {p} now.']],
    drift: [['Good drift!', 'Nice turn!'], ['What a drift! Here comes the boost.', 'Beautiful drifting. Use that speed!']],
    box: [['Turbo!', 'Fast, fast, fast!'], ['Turbo! Hold on tight.', 'A gift box, and away you go!']],
    grass: [['Stay on the road!', 'Go back to the road!'], ['You are on the grass. Get back on the road!', 'The grass is slowing you down.']],
    lap: [['Lap {l}!', 'This is lap {l}.'], ['That is one lap done. Lap {l} now.', 'Lap {l}. Keep your speed up.']],
    last: [['Last lap! Go fast!', 'One more lap!'], ['Final lap! Give it everything.', 'This is the final lap. Do not slow down now!']],
    win: [['You are first! You win!', 'You win the race! Well done!'], ['And that is the chequered flag. You win the race! Brilliant driving.', 'First place! What a race.']],
    end: [['You are {p}. Well done!', 'Finish! You are {p}.'], ['The chequered flag. You finish in {p} place. Well driven.', 'You cross the line in {p} place. Good race.']],
    pit: [['Now the pit stop. Answer the questions!', 'Pit stop! Time for English.'], ['Into the pit stop. Answer the questions to win your diamonds.', 'Pit stop time. A few questions, and the diamonds are yours.']]
  };
  function caption(t) { var c = $('#cap'); if (!c) return; c.textContent = '🎙 ' + t; c.classList.add('on'); clearTimeout(NARR.capT); NARR.capT = setTimeout(function () { c.classList.remove('on'); }, 3200); }
  function narr(kind, pri, v) {
    if (MODE !== 'free') return;
    var now = Date.now(); if (pri < 2 && now - NARR.last < 3800) return;
    var set = LINES[kind][EASY() ? 0 : 1], t = set[Math.floor(Math.random() * set.length)];
    t = t.replace('{p}', (v && v.p) || '').replace('{n}', (v && v.n) || '').replace('{l}', (v && v.l) || '');
    NARR.last = now; caption(t); if (NARR_ON) say(t);
  }
  var AC = null, engine = null;
  function sfx(kind) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var N = { ok: [[660, .08], [880, .08], [1320, .16]], no: [[260, .14], [190, .22]], beep: [[520, .18]], go: [[1040, .4]], gem: [[1320, .06], [1760, .12]], box: [[700, .05], [940, .08]], win: [[523, .12], [659, .12], [784, .12], [1047, .3]] }[kind] || [[440, .1]];
      var t = AC.currentTime;
      N.forEach(function (n) { var o = AC.createOscillator(), g = AC.createGain(); o.type = kind === 'no' ? 'sawtooth' : 'triangle'; o.frequency.value = n[0]; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.16, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + n[1]); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + n[1] + .02); t += n[1] * .85; });
    } catch (e) {}
  }
  function engineOn(on) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (on && !engine) { var o = AC.createOscillator(), g = AC.createGain(), f = AC.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = 60; f.type = 'lowpass'; f.frequency.value = 400; g.gain.value = .025; o.connect(f); f.connect(g); g.connect(AC.destination); o.start(); engine = { o: o, g: g }; }
      if (!on && engine) { engine.o.stop(); engine = null; }
    } catch (e) {}
  }

  /* ---------------- three.js scene ---------------- */
  var canvas = $('#c'), renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setPixelRatio(Math.min(1.75, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
  var scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(62, 1, 0.1, 900);
  function resize() { var w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < h ? 78 : 62; camera.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();
  var hemi = new THREE.HemisphereLight(0xffffff, 0x88aa77, 1.15); scene.add(hemi);
  var sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(60, 120, 40); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024); var sc = sun.shadow.camera; sc.left = -70; sc.right = 70; sc.top = 70; sc.bottom = -70; sc.far = 400; scene.add(sun); scene.add(sun.target);

  var M = {};
  function mat(c, o) { var k = c + JSON.stringify(o || {}); return M[k] || (M[k] = new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {}))); }
  function canvasTex(w, h, draw, rep) { var cv = document.createElement('canvas'); cv.width = w; cv.height = h; draw(cv.getContext('2d'), w, h); var t = new THREE.CanvasTexture(cv); if (THREE.SRGBColorSpace) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; } return t; }
  function mesh(g, m, cast) { var x = new THREE.Mesh(g, m); if (cast) x.castShadow = true; x.receiveShadow = !cast; return x; }

  /* ---------------- track ---------------- */
  var TRACK = null, WORLD = new THREE.Group(); scene.add(WORLD);
  var ROAD_W = 16, SAMPLES = 900;
  function buildTrack(lv) {
    while (WORLD.children.length) WORLD.remove(WORLD.children[0]);
    var th = lv.th, seed = LEVELS.indexOf(lv) + 1;
    scene.background = new THREE.Color(th.sky); scene.fog = new THREE.Fog(th.fog, 120, 420);
    // closed loop with curves (a different shape for every level)
    var pts = [], n = 14, R = 150;
    for (var i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2, r = R * (1 + .26 * Math.sin(2 * a + seed) + .16 * Math.cos(3 * a + seed * 1.7) + .08 * Math.sin(5 * a + seed));
      pts.push(new THREE.Vector3(Math.cos(a) * r * 1.25, 0, Math.sin(a) * r));
    }
    var curve = new THREE.CatmullRomCurve3(pts, true, 'centripetal', .5), len = curve.getLength();
    var P = [], T = [], N = [];
    for (var k = 0; k < SAMPLES; k++) { var u = k / SAMPLES, p = curve.getPointAt(u), t = curve.getTangentAt(u).setY(0).normalize(); P.push(p); T.push(t); N.push(new THREE.Vector3(-t.z, 0, t.x)); }
    TRACK = { curve: curve, len: len, P: P, T: T, N: N };
    // ground
    var gt = canvasTex(256, 256, function (x, w, h) { x.fillStyle = th.grass; x.fillRect(0, 0, w, h); for (var i = 0; i < 900; i++) { x.fillStyle = Math.random() < .5 ? th.grass2 : 'rgba(255,255,255,.12)'; x.fillRect(Math.random() * w, Math.random() * h, 3, 3); } }, true);
    gt.repeat.set(80, 80);
    var ground = mesh(new THREE.PlaneGeometry(1600, 1600), new THREE.MeshLambertMaterial({ map: gt })); ground.rotation.x = -Math.PI / 2; ground.position.y = -.05; WORLD.add(ground);
    // road and kerbs as ribbons
    var roadTex = canvasTex(128, 256, function (x, w, h) { x.fillStyle = th.road; x.fillRect(0, 0, w, h); for (var i = 0; i < 400; i++) { x.fillStyle = 'rgba(255,255,255,' + Math.random() * .08 + ')'; x.fillRect(Math.random() * w, Math.random() * h, 2, 2); } x.fillStyle = 'rgba(255,255,255,.85)'; x.fillRect(w / 2 - 3, 0, 6, h * .5); x.fillStyle = 'rgba(255,255,255,.35)'; x.fillRect(4, 0, 3, h); x.fillRect(w - 7, 0, 3, h); }, true);
    roadTex.repeat.set(1, len / 22);
    WORLD.add(ribbon(-ROAD_W / 2, ROAD_W / 2, .02, new THREE.MeshLambertMaterial({ map: roadTex }), len / 22));
    var kerbTex = canvasTex(32, 64, function (x, w, h) { x.fillStyle = th.kerb[0]; x.fillRect(0, 0, w, h / 2); x.fillStyle = th.kerb[1]; x.fillRect(0, h / 2, w, h / 2); }, true);
    kerbTex.repeat.set(1, len / 6);
    var km = new THREE.MeshLambertMaterial({ map: kerbTex });
    WORLD.add(ribbon(-ROAD_W / 2 - 1.6, -ROAD_W / 2, .06, km, len / 6)); WORLD.add(ribbon(ROAD_W / 2, ROAD_W / 2 + 1.6, .06, km, len / 6));
    // start line and arch
    var chk = canvasTex(128, 32, function (x, w, h) { for (var i = 0; i < 16; i++) for (var j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? '#222' : '#fff'; x.fillRect(i * 8, j * 8, 8, 8); } });
    var sl = mesh(new THREE.PlaneGeometry(ROAD_W, 3), new THREE.MeshLambertMaterial({ map: chk })); sl.rotation.x = -Math.PI / 2; place(sl, 0, 0, .05); WORLD.add(sl);
    var arch = new THREE.Group();
    [-1, 1].forEach(function (s) { var pl = mesh(new THREE.BoxGeometry(1.6, 11, 1.6), mat(0xffffff), true); pl.position.set(s * (ROAD_W / 2 + 2), 5.5, 0); arch.add(pl); var st = mesh(new THREE.BoxGeometry(1.7, 11, 1.7), mat(th.kerb[0] === '#ffffff' ? 0xff4fa3 : new THREE.Color(th.kerb[0]).getHex())); st.scale.set(1, .25, 1); st.position.set(s * (ROAD_W / 2 + 2), 8, 0); arch.add(st); });
    var ban = canvasTex(1024, 128, function (x, w, h) { var g = x.createLinearGradient(0, 0, w, 0); g.addColorStop(0, lv.col); g.addColorStop(1, '#6d3df2'); x.fillStyle = g; x.fillRect(0, 0, w, h); for (var i = 0; i < 64; i++) { x.fillStyle = i % 2 ? '#fff' : '#222'; x.fillRect(i * 16, 0, 16, 10); x.fillStyle = i % 2 ? '#222' : '#fff'; x.fillRect(i * 16, h - 10, 16, 10); } x.font = '800 70px "Baloo 2",Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 10; x.strokeStyle = '#2a1660'; x.strokeText('IF KART · ' + lv.name.toUpperCase(), w / 2, h / 2 + 4); x.fillStyle = '#fff'; x.fillText('IF KART · ' + lv.name.toUpperCase(), w / 2, h / 2 + 4); });
    var bm = mesh(new THREE.BoxGeometry(ROAD_W + 6, 3, .6), [mat(0xffffff), mat(0xffffff), mat(0xffffff), mat(0xffffff), new THREE.MeshLambertMaterial({ map: ban }), new THREE.MeshLambertMaterial({ map: ban })], true);
    bm.position.y = 10.5; arch.add(bm); place(arch, 0, 0, 0); WORLD.add(arch);
    scenery(lv, seed);
    buildBoxes();
  }
  function ribbon(x0, x1, y, m, vrep) {
    var g = new THREE.BufferGeometry(), pos = [], uv = [], idx = [], P = TRACK.P, N = TRACK.N;
    for (var k = 0; k <= SAMPLES; k++) { var i = k % SAMPLES, p = P[i], n = N[i]; pos.push(p.x + n.x * x0, y, p.z + n.z * x0, p.x + n.x * x1, y, p.z + n.z * x1); var v = k / SAMPLES * vrep; uv.push(0, v, 1, v); if (k < SAMPLES) { var a = k * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); } }
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
    m.side = THREE.DoubleSide; m.polygonOffset = true; m.polygonOffsetFactor = -1 - y * 10; var r = new THREE.Mesh(g, m); r.receiveShadow = true; return r;
  }
  /** Put an object on the track at progress u (0..1) and lateral offset x, facing along the road. */
  function place(o, u, x, y) { var i = Math.floor(((u % 1) + 1) % 1 * SAMPLES) % SAMPLES, p = TRACK.P[i], t = TRACK.T[i], n = TRACK.N[i]; o.position.set(p.x + n.x * x, y || 0, p.z + n.z * x); o.rotation.y = Math.atan2(t.x, t.z); return o; }
  function nearTrack(x, z, d) { for (var k = 0; k < SAMPLES; k += 6) { var p = TRACK.P[k], dx = p.x - x, dz = p.z - z; if (dx * dx + dz * dz < d * d) return true; } return false; }
  function scenery(lv, seed) {
    var th = lv.th, rnd = mulberry(seed * 991);
    var trunk = mat(0x8a5a2b), crown = [mat(th.tree[0]), mat(th.tree[1])];
    for (var i = 0; i < 170; i++) {
      var x = (rnd() - .5) * 760, z = (rnd() - .5) * 620; if (nearTrack(x, z, ROAD_W / 2 + 7)) continue;
      var g = new THREE.Group(), kind = rnd(), s = .8 + rnd() * .9;
      if (th.deco === 'snow' || (th.deco === 'forest' && kind < .6)) { g.add(mesh(new THREE.CylinderGeometry(.5, .6, 2.4, 6), trunk, true).translateY(1.2)); for (var c = 0; c < 3; c++) g.add(mesh(new THREE.ConeGeometry(3.2 - c * .8, 3.6, 7), th.deco === 'snow' && c === 2 ? mat(0xffffff) : crown[0], true).translateY(3 + c * 2)); }
      else if (th.deco === 'beach' && kind < .55) { var tr = mesh(new THREE.CylinderGeometry(.35, .55, 8, 6), trunk, true); tr.position.y = 4; tr.rotation.z = .15; g.add(tr); for (var l = 0; l < 6; l++) { var lf = mesh(new THREE.BoxGeometry(5, .2, 1.4), crown[0], true); lf.position.set(Math.cos(l) * 2.2 + .6, 8, Math.sin(l) * 2.2); lf.rotation.y = -l; lf.rotation.z = -.35; g.add(lf); } }
      else if (th.deco === 'city' && kind < .45) { var hgt = 8 + rnd() * 22, col = [0xffd2a6, 0xbfe3ff, 0xffb3c7, 0xd9e2ff, 0xfff1b8][Math.floor(rnd() * 5)]; var b = mesh(new THREE.BoxGeometry(9, hgt, 9), mat(col), true); b.position.y = hgt / 2; g.add(b); var wt = canvasTex(64, 128, function (x) { x.fillStyle = '#ffffff00'; for (var a = 0; a < 4; a++) for (var bb = 0; bb < 9; bb++) { x.fillStyle = 'rgba(80,110,170,.75)'; x.fillRect(6 + a * 15, 6 + bb * 14, 9, 8); } }); var win = mesh(new THREE.PlaneGeometry(8.6, hgt - 1), new THREE.MeshLambertMaterial({ map: wt, transparent: true })); win.position.set(0, hgt / 2, 4.55); g.add(win); }
      else if (th.deco === 'candy' && kind < .35) { var st = mesh(new THREE.CylinderGeometry(.7, .9, 3, 8), mat(0xfff1f7), true); st.position.y = 1.5; g.add(st); var cap = mesh(new THREE.SphereGeometry(3, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xff6fb4), true); cap.position.y = 3; g.add(cap); for (var d = 0; d < 6; d++) { var dot = mesh(new THREE.SphereGeometry(.45, 8, 6), mat(0xffffff)); var aa = d * 1.05, bb = .5 + (d % 2) * .45; dot.position.set(Math.cos(aa) * 3 * Math.sin(bb), 3 + 3 * Math.cos(bb), Math.sin(aa) * 3 * Math.sin(bb)); g.add(dot); } }
      else { g.add(mesh(new THREE.CylinderGeometry(.45, .6, 3, 6), trunk, true).translateY(1.5)); g.add(mesh(new THREE.SphereGeometry(2.4, 12, 9), crown[rnd() < .75 ? 0 : 1], true).translateY(4.4)); }
      g.position.set(x, 0, z); g.scale.setScalar(s); g.rotation.y = rnd() * 6; WORLD.add(g);
    }
    // landmarks: towers, balloons, rocks
    for (var j = 0; j < 6; j++) {
      var x2 = (rnd() - .5) * 600, z2 = (rnd() - .5) * 500; if (nearTrack(x2, z2, 30)) continue;
      var tw = new THREE.Group(), body = mesh(new THREE.CylinderGeometry(5, 6, 26, 12), mat(th.deco === 'candy' ? 0xffc3e1 : 0xf3efe7), true); body.position.y = 13; tw.add(body);
      var roof = mesh(new THREE.ConeGeometry(7, 9, 12), mat(new THREE.Color(lv.col).getHex()), true); roof.position.y = 30.5; tw.add(roof);
      for (var w2 = 0; w2 < 3; w2++) { var wn = mesh(new THREE.BoxGeometry(1.6, 2.6, .4), mat(0x6d3df2)); wn.position.set(0, 8 + w2 * 6, 5.9); tw.add(wn); }
      tw.position.set(x2, 0, z2); WORLD.add(tw);
    }
    for (var b2 = 0; b2 < 8; b2++) { var bl = new THREE.Group(), bc = [0xff4fa3, 0xffc83d, 0x3d8bfd, 0x22c55e][b2 % 4]; bl.add(mesh(new THREE.SphereGeometry(4, 14, 12), mat(bc))); var bk = mesh(new THREE.BoxGeometry(1.6, 1.4, 1.6), mat(0x8a5a2b)); bk.position.y = -5.6; bl.add(bk); bl.position.set((rnd() - .5) * 700, 40 + rnd() * 40, (rnd() - .5) * 600); bl.userData.bob = rnd() * 6; BALLOONS.push(bl); WORLD.add(bl); }
  }
  var BALLOONS = [];
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* ---------------- gift boxes (questions) ---------------- */
  var BOXES = [], BOX_AT = [.12, .3, .47, .64, .8, .93];
  var boxTex = canvasTex(64, 64, function (x, w, h) { x.fillStyle = '#ff4fa3'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffc83d'; x.fillRect(w / 2 - 6, 0, 12, h); x.fillRect(0, h / 2 - 6, w, 12); x.strokeStyle = '#fff'; x.lineWidth = 4; x.strokeRect(2, 2, w - 4, h - 4); x.font = '800 30px Arial'; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', w / 2 + 14, h / 2 - 14); });
  function buildBoxes() {
    BOXES = [];
    BOX_AT.forEach(function (u) {
      var row = { u: u, items: [] };
      [-5, 0, 5].forEach(function (x) { var b = mesh(new THREE.BoxGeometry(2.6, 2.6, 2.6), new THREE.MeshLambertMaterial({ map: boxTex, transparent: true, opacity: .95 }), true); place(b, u, x, 2); b.userData.x = x; WORLD.add(b); row.items.push(b); });
      BOXES.push(row);
    });
  }

  /* ---------------- karts ---------------- */
  function makeKart(d, name) {
    var k = new THREE.Group(), body = new THREE.Group(); k.add(body);
    var base = mesh(new THREE.BoxGeometry(3, .8, 4.6), mat(d.kart), true); base.position.y = .9; body.add(base);
    var nose = mesh(new THREE.BoxGeometry(2.6, .7, 1.4), mat(d.kart), true); nose.position.set(0, 1.1, 2.6); nose.rotation.x = -.25; body.add(nose);
    var bump = mesh(new THREE.BoxGeometry(3.4, .5, .6), mat(0x2a1660), true); bump.position.set(0, .7, 3.3); body.add(bump);
    var seat = mesh(new THREE.BoxGeometry(2.2, 1.6, .6), mat(0x2a1660), true); seat.position.set(0, 1.8, -1.2); body.add(seat);
    var spoiler = mesh(new THREE.BoxGeometry(3.4, .25, 1), mat(0xffffff), true); spoiler.position.set(0, 2.4, -2.4); body.add(spoiler);
    [-1.2, 1.2].forEach(function (x) { var s = mesh(new THREE.BoxGeometry(.25, 1, .25), mat(0x2a1660)); s.position.set(x, 1.9, -2.4); body.add(s); });
    var wheels = [];
    [[-1.7, 1.6], [1.7, 1.6], [-1.75, -1.6], [1.75, -1.6]].forEach(function (p, i) { var w = mesh(new THREE.CylinderGeometry(i < 2 ? .7 : .85, i < 2 ? .7 : .85, .8, 14), mat(0x222233), true); w.rotation.z = Math.PI / 2; w.position.set(p[0], i < 2 ? .7 : .85, p[1]); var hub = mesh(new THREE.CylinderGeometry(.32, .32, .84, 10), mat(0xffffff)); hub.rotation.z = Math.PI / 2; hub.position.copy(w.position); body.add(w); body.add(hub); wheels.push(w); });
    // number plate
    var plate = canvasTex(256, 64, function (x, w, h) { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.strokeStyle = '#2a1660'; x.lineWidth = 6; x.strokeRect(3, 3, w - 6, h - 6); x.font = '800 40px "Baloo 2",Arial'; x.fillStyle = '#2a1660'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name.toUpperCase(), w / 2, h / 2 + 2); });
    var pm = mesh(new THREE.PlaneGeometry(2, .5), new THREE.MeshBasicMaterial({ map: plate })); pm.position.set(0, .95, -2.32); pm.rotation.y = Math.PI; body.add(pm);
    // driver: an animal friend (original, built from spheres)
    var dr = new THREE.Group(), fur = mat(d.fur), dark = mat(0x2a1a1a);
    var torso = mesh(new THREE.SphereGeometry(.85, 12, 10), mat(0xffffff), true); torso.scale.set(1, 1.1, .9); torso.position.y = 2.4; dr.add(torso);
    var head = mesh(new THREE.SphereGeometry(1.05, 16, 12), fur, true); head.position.y = 3.7; dr.add(head);
    if (d.ear === 'bunny') [-.4, .4].forEach(function (x) { var e = mesh(new THREE.CapsuleGeometry ? new THREE.CapsuleGeometry(.22, 1.3, 4, 8) : new THREE.CylinderGeometry(.22, .22, 1.6), fur, true); e.position.set(x, 5.1, 0); e.rotation.z = x * .3; dr.add(e); });
    else if (d.ear === 'cat' || d.ear === 'fox') [-.55, .55].forEach(function (x) { var e = mesh(new THREE.ConeGeometry(.38, .8, 4), fur, true); e.position.set(x, 4.6, 0); e.rotation.z = -x * .5; dr.add(e); });
    else if (d.ear === 'frog') [-.45, .45].forEach(function (x) { var e = mesh(new THREE.SphereGeometry(.4, 10, 8), fur, true); e.position.set(x, 4.55, .45); dr.add(e); });
    else [-.75, .75].forEach(function (x) { var e = mesh(new THREE.SphereGeometry(.35, 10, 8), d.ear === 'panda' ? dark : fur, true); e.position.set(x, 4.55, 0); dr.add(e); });
    [-.36, .36].forEach(function (x) { var e = mesh(new THREE.SphereGeometry(.16, 8, 6), dark); e.position.set(x, 3.85, -.92); dr.add(e); });
    var snout = mesh(new THREE.SphereGeometry(.38, 10, 8), mat(0xfff3e6)); snout.position.set(0, 3.45, -.9); snout.scale.set(1.2, .8, .7); dr.add(snout);
    var noseb = mesh(new THREE.SphereGeometry(.12, 8, 6), dark); noseb.position.set(0, 3.55, -1.18); dr.add(noseb);
    var helmet = mesh(new THREE.SphereGeometry(1.1, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.6), mat(d.kart), true); helmet.position.y = 3.85; dr.add(helmet);
    dr.position.z = -.3; dr.rotation.y = Math.PI; body.add(dr);
    k.rotation.order = 'YXZ'; k.userData = { body: body, wheels: wheels };
    var boost = mesh(new THREE.ConeGeometry(.5, 2.4, 10), new THREE.MeshBasicMaterial({ color: 0xffb02e, transparent: true, opacity: .85 })); boost.rotation.x = Math.PI / 2; boost.position.set(0, 1, -3.4); boost.visible = false; body.add(boost); k.userData.flame = boost;
    return k;
  }

  /* ---------------- race state ---------------- */
  var R = null, keys = {}, touch = { l: 0, r: 0, brake: 0, drift: 0 }, paused = true;
  var NAMES = ['Kitty', 'Bunny', 'Teddy', 'Foxy', 'Panda', 'Froggy'];
  function startRace() {
    buildTrack(LV); BALLOONS.length = BALLOONS.length;
    var QS = questionsFor(LV);
    var racers = [], others = shuffle(DRIVERS.filter(function (d) { return d.id !== ME.id; })).slice(0, 5);
    [ME].concat(others).forEach(function (d, i) {
      var k = makeKart(d, d.name); WORLD.add(k);
      var grid = i, row = Math.floor(grid / 2), col = grid % 2;
      // the player starts at the back so there is someone to overtake
      var slot = i === 0 ? 5 : i - 1; row = Math.floor(slot / 2); col = slot % 2;
      racers.push({ d: d, k: k, me: i === 0, dist: -(row * 7 + 4) / 1, x: col ? 3.5 : -3.5, v: 0, steer: 0, base: i === 0 ? 0 : 33 + Math.random() * 5, lap: -1, done: false, finish: 0, spin: 0, turbo: 0, aim: (Math.random() - .5) * 8 });
    });
    R = { racers: racers, me: racers[0], QS: QS, qi: 0, laps: 3, t: 0, phase: 'count', count: 3.6, gems: 0, right: 0, asked: 0, boxes: 0, grassT: 0, grassAt: -99, lastPos: 0, hit: {}, best: SAVE['best:' + LV.id] || 0 };
    $('#lights').style.display = ''; narr('ready', 2);
    document.body.classList.add('racing'); $('#hud').hidden = false; $('#keys').hidden = false; $('#menu').style.display = 'none'; $('#res').style.display = 'none';
    paused = false; engineOn(true); clock.getDelta();
  }
  var MAXV = 40;
  function uOf(dist) { return ((dist / TRACK.len) % 1 + 1) % 1; }
  function step(dt) {
    if (!R) return;
    var me = R.me;
    if (R.phase === 'count') {
      var before = Math.ceil(R.count); R.count -= dt; var after = Math.ceil(R.count);
      var L = document.querySelectorAll('#lights i'); for (var i = 0; i < 3; i++) L[i].className = R.count > 0 ? (i < 4 - Math.max(1, after) ? 'r' : '') : 'g';
      if (after !== before && after > 0 && after <= 3) { sfx('beep'); big(after); }
      if (R.count <= 0) { R.phase = 'race'; sfx('go'); big('GO!'); narr('go', 2); setTimeout(function () { $('#lights').style.display = 'none'; }, 900); }
    }
    var racing = R.phase === 'race';
    if (racing) R.t += dt;
    R.racers.forEach(function (r) {
      if (r.done) { r.v *= .985; }
      if (r.me) {
        var steerIn = (keys.ArrowLeft || keys.a || touch.l ? -1 : 0) + (keys.ArrowRight || keys.d || touch.r ? 1 : 0);
        r.steer += (steerIn - r.steer) * Math.min(1, dt * 8);
        var target = racing && !r.done ? MAXV * (r.turbo > 0 ? 1.45 : 1) * (keys.ArrowDown || keys.s || touch.brake ? .35 : 1) : 0;
        var off = Math.abs(r.x) > ROAD_W / 2 + .5; if (off) target *= .55;   // off the road: grass slows you down
        if (off && racing && !r.done) { R.grassT += dt; if (R.grassT > 1.2 && R.t - R.grassAt > 9) { R.grassAt = R.t; narr('grass', 1); } } else R.grassT = 0;
        if (r.spin > 0) target *= .3;
        r.v += (target - r.v) * Math.min(1, dt * (target > r.v ? 1.1 : 2.5));
        var drift = (keys[' '] || touch.drift) && Math.abs(steerIn) > 0 && r.v > 20;
        r.x += r.steer * dt * (drift ? 17 : 12) * Math.min(1, r.v / 18);
        if (drift) { r.driftT = (r.driftT || 0) + dt; } else if (r.driftT) { if (r.driftT > .8) { r.turbo = Math.max(r.turbo, .9); toast('🔥 Drift boost!'); narr('drift', 1); } r.driftT = 0; }
      } else {
        // computer drivers: steady pace with small changes, a little slower when far ahead of the player
        var gap = r.dist + r.lap * 0 - me.dist;
        var tgt = racing && !r.done ? r.base * (1 + .05 * Math.sin(R.t * .7 + r.base)) * (gap > 60 ? .9 : gap < -80 ? 1.12 : 1) * (r.turbo > 0 ? 1.35 : 1) : 0;
        if (r.spin > 0) tgt *= .35;
        r.v += (tgt - r.v) * Math.min(1, dt * 1.2);
        if (Math.random() < dt * .3) r.aim = (Math.random() - .5) * (ROAD_W - 5);
        r.x += (r.aim - r.x) * Math.min(1, dt * 1.2);
      }
      r.x = Math.max(-ROAD_W / 2 - 6, Math.min(ROAD_W / 2 + 6, r.x));
      var prev = r.dist; r.dist += r.v * dt;
      if (r.turbo > 0) r.turbo -= dt; if (r.spin > 0) r.spin -= dt;
      // laps
      if (Math.floor(r.dist / TRACK.len) > Math.floor(prev / TRACK.len) && r.dist > 0) { r.lap++; if (r.lap >= R.laps && !r.done) { r.done = true; r.finish = R.t; if (r.me) finishRace(); } else if (r.me && r.lap > 0) { toast(r.lap === R.laps - 1 ? '🏁 Final lap!' : 'Lap ' + (r.lap + 1) + ' / ' + R.laps); sfx('box'); if (r.lap === R.laps - 1) narr('last', 2); else narr('lap', 2, { l: ['', 'one', 'two', 'three'][r.lap + 1] }); } }
      // computer drivers use the boxes too (a turbo now and then)
      if (!r.me && racing) BOX_AT.forEach(function (u) { if (crossed(prev, r.dist, u) && Math.random() < .6) r.turbo = 1.2; });
      // place the kart
      var u = uOf(r.dist), i0 = Math.floor(u * SAMPLES) % SAMPLES, f = u * SAMPLES - Math.floor(u * SAMPLES), i1 = (i0 + 1) % SAMPLES;
      var p = TRACK.P[i0].clone().lerp(TRACK.P[i1], f), t = TRACK.T[i0].clone().lerp(TRACK.T[i1], f).normalize(), n = new THREE.Vector3(-t.z, 0, t.x);
      r.k.position.set(p.x + n.x * r.x, 0, p.z + n.z * r.x);
      var yaw = Math.atan2(t.x, t.z) - (r.me ? r.steer * .35 : 0);
      r.k.rotation.y = yaw + (r.spin > 0 ? r.spin * 12 : 0);
      r.k.userData.body.rotation.z = (r.me ? r.steer : 0) * .06;
      r.k.userData.wheels.forEach(function (w) { w.rotation.x += r.v * dt * 1.2; });
      r.k.userData.flame.visible = r.turbo > 0; if (r.turbo > 0) r.k.userData.flame.scale.set(1, .8 + Math.random() * .6, 1);
    });
    // karts bump each other
    for (var a = 0; a < R.racers.length; a++) for (var b = a + 1; b < R.racers.length; b++) {
      var A = R.racers[a], B = R.racers[b], dd = (A.dist - B.dist), dx = A.x - B.x;
      if (Math.abs(dd) < 4 && Math.abs(dx) < 3) { var push = (3 - Math.abs(dx)) * .5 * (dx >= 0 ? 1 : -1); A.x += push; B.x -= push; if (dd > 0) { B.v *= .97; } else A.v *= .97; }
    }
    // gift boxes for the player → a question
    if (racing && !me.done) BOX_AT.forEach(function (u, i) {
      var key = me.lap + ':' + i;
      if (!R.hit[key] && crossed(me.dist - me.v * dt, me.dist, u)) { R.hit[key] = 1; var row = BOXES[i]; if (Math.abs(me.x) < ROAD_W / 2 + 1) { row.items.forEach(function (b) { b.visible = Math.abs(b.userData.x - me.x) > 2.6; }); setTimeout(function () { row.items.forEach(function (b) { b.visible = true; }); }, 2500); sfx('box'); if (MODE === 'free') { R.boxes++; me.turbo = Math.max(me.turbo, 1.5); toast('🚀 Turbo!'); narr('box', 1); } else ask(); } }
    });
    BOXES.forEach(function (row) { row.items.forEach(function (b) { b.rotation.x += dt * 1.2; b.position.y = 2 + Math.sin(R.t * 3 + b.userData.x) * .3; }); });
    BALLOONS.forEach(function (bl) { bl.position.y += Math.sin(R.t + bl.userData.bob) * dt * 1.2; });
    // camera behind the player
    var cu = uOf(me.dist - 11), ci = Math.floor(cu * SAMPLES) % SAMPLES, cp = TRACK.P[ci], cn = TRACK.N[ci];
    var want = new THREE.Vector3(cp.x + cn.x * me.x * .8, 6.2, cp.z + cn.z * me.x * .8);
    camera.position.lerp(want, Math.min(1, dt * 6));
    var lu = uOf(me.dist + 14), li = Math.floor(lu * SAMPLES) % SAMPLES, lp = TRACK.P[li], ln = TRACK.N[li];
    camera.lookAt(lp.x + ln.x * me.x * .6, 1.6, lp.z + ln.z * me.x * .6);
    camera.fov += ((innerWidth < innerHeight ? 78 : 62) + (me.turbo > 0 ? 10 : 0) - camera.fov) * Math.min(1, dt * 4); camera.updateProjectionMatrix();
    sun.position.set(me.k.position.x + 60, 120, me.k.position.z + 40); sun.target.position.copy(me.k.position);
    if (engine) engine.o.frequency.value = 50 + me.v * 2.2;
    hud();
  }
  function crossed(d0, d1, u) { var L = TRACK.len, a = d0 / L, b = d1 / L; return Math.floor(b - u) > Math.floor(a - u); }

  /* ---------------- HUD ---------------- */
  var mini = $('#mini').getContext('2d'), MB = null;
  function hud() {
    var order = R.racers.slice().sort(function (a, b) { return (b.done ? 1e9 - b.finish : b.dist) - (a.done ? 1e9 - a.finish : a.dist); });
    var pos = order.indexOf(R.me) + 1; R.pos = pos;
    if (R.phase === 'race' && !R.me.done && R.t > 4) { if (R.lastPos && pos < R.lastPos) narr('up', 1, { p: ORD[pos], n: order[pos].d.name }); else if (R.lastPos && pos > R.lastPos) narr('down', 1, { p: ORD[pos], n: order[pos - 2].d.name }); if (Date.now() - NARR.last > 0) R.lastPos = pos; } else R.lastPos = pos;
    $('#pos').innerHTML = '<b>' + pos + '</b><small>of ' + R.racers.length + '</small>';
    $('#lapt').textContent = 'Lap ' + Math.min(R.laps, Math.max(1, R.me.lap + 1)) + '/' + R.laps;
    $('#time').textContent = fmt(R.t); $('#gems').textContent = '💎 ' + R.gems;
    // minimap
    if (!MB) { MB = { x0: 1e9, x1: -1e9, z0: 1e9, z1: -1e9 }; TRACK.P.forEach(function (p) { MB.x0 = Math.min(MB.x0, p.x); MB.x1 = Math.max(MB.x1, p.x); MB.z0 = Math.min(MB.z0, p.z); MB.z1 = Math.max(MB.z1, p.z); }); }
    var s = 260 / Math.max(MB.x1 - MB.x0, MB.z1 - MB.z0), ox = 150 - (MB.x0 + MB.x1) / 2 * s, oz = 150 - (MB.z0 + MB.z1) / 2 * s;
    mini.clearRect(0, 0, 300, 300); mini.lineWidth = 16; mini.strokeStyle = 'rgba(255,255,255,.9)'; mini.lineJoin = 'round'; mini.beginPath();
    TRACK.P.forEach(function (p, i) { if (i % 6) return; var X = ox + p.x * s, Z = oz + p.z * s; i ? mini.lineTo(X, Z) : mini.moveTo(X, Z); }); mini.closePath(); mini.stroke();
    R.racers.forEach(function (r) { mini.fillStyle = r.me ? '#ff4fa3' : '#' + ('00000' + r.d.kart.toString(16)).slice(-6); mini.beginPath(); mini.arc(ox + r.k.position.x * s, oz + r.k.position.z * s, r.me ? 11 : 7, 0, 7); mini.fill(); if (r.me) { mini.lineWidth = 3; mini.strokeStyle = '#fff'; mini.stroke(); } });
  }
  function fmt(t) { var m = Math.floor(t / 60), s = t - m * 60; return m + ':' + (s < 10 ? '0' : '') + s.toFixed(1); }
  var bigT = null; function big(t) { var b = $('#big'); b.textContent = t; b.classList.add('on'); clearTimeout(bigT); bigT = setTimeout(function () { b.classList.remove('on'); }, 700); }
  var toT = null; function toast(t) { var b = $('#toast'); b.textContent = t; b.classList.add('on'); clearTimeout(toT); toT = setTimeout(function () { b.classList.remove('on'); }, 1600); }

  /* ---------------- questions ---------------- */
  var BTN = ['#ff4fa3', '#3d8bfd', '#22c55e', '#ff9a3c'];
  /* One question card. head: the small line on top; done(ok) runs after the answer has been shown. */
  function showQ(q, head, done) {
    var m = String(q.p).match(/^((?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|‍|️)+)\s*(.*)$/u);
    $('#qh').textContent = head;
    $('#qp').innerHTML = m ? '<span class="em">' + esc(m[1]) + '</span>' + esc(m[2]) : esc(q.p);
    $('#qo').innerHTML = q.o.map(function (o, i) { return '<button data-i="' + i + '" style="background:' + BTN[i % 4] + '">' + esc(o) + '</button>'; }).join('');
    $('#q').style.display = 'flex'; if (q.say) say(q.say);
    $('#qs').onclick = function () { say(q.say || q.p); };
    var fin = false;
    [].forEach.call(document.querySelectorAll('#qo button'), function (b) {
      b.onclick = function () {
        if (fin) return; fin = true;
        var ok = +b.dataset.i === q.a; b.classList.add(ok ? 'ok' : 'no'); if (!ok) document.querySelector('#qo button[data-i="' + q.a + '"]').classList.add('ok');
        sfx(ok ? 'ok' : 'no'); R.asked++; if (ok) { R.right++; R.gems++; } say(ok ? (q.word || q.o[q.a]) : q.fb || 'The answer is ' + q.o[q.a]);
        setTimeout(function () { done(ok); }, ok ? 650 : 1500);
      };
    });
  }
  /* Quiz race: a gift box stops the race for one question. */
  function ask() {
    if (!R.QS.length) return;
    var q = R.QS[R.qi++ % R.QS.length]; paused = true;
    showQ(q, '🎁', function (ok) { $('#q').style.display = 'none'; paused = false; clock.getDelta(); if (ok) { R.me.turbo = 2.6; toast('🚀 Turbo! +1 💎'); sfx('gem'); } else { R.me.spin = 1.1; toast('🌀 Oops! ' + q.o[q.a]); } });
  }
  /* Race first: after the finish line, a pit stop of five questions. Two are about the race the player has just driven,
     the rest come from the level's question bank. */
  function pitStop(order, pos, then) {
    var names = shuffle(R.racers.filter(function (r) { return !r.me; }).map(function (r) { return r.d.name; }));
    var winner = order[0].me ? 'I did!' : order[0].d.name, o1 = shuffle([winner].concat(names.filter(function (n) { return n !== winner; }).slice(0, 2)));
    var cap = function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }, o2 = shuffle([pos].concat(shuffle([1, 2, 3, 4, 5, 6].filter(function (n) { return n !== pos; })).slice(0, 2))).map(function (n) { return cap(ORD[n]); });
    var list = [{ p: '🏁 Who won the race?', o: o1, a: o1.indexOf(winner), say: 'Who won the race?', fb: order[0].me ? 'You won the race!' : order[0].d.name + ' won the race.' }, { p: '🏎️ Where did you finish?', o: o2, a: o2.indexOf(cap(ORD[pos])), say: 'Where did you finish?', fb: 'You finished ' + ORD[pos] + '.' }];
    for (var i = 0; i < 3 && R.QS.length; i++) list.push(R.QS[R.qi++ % R.QS.length]);
    var k = 0; narr('pit', 2);
    (function next() {
      if (k >= list.length) { $('#q').style.display = 'none'; return then(); }
      var q = list[k++]; showQ(q, '🔧 Pit stop · ' + k + ' / ' + list.length, function (ok) { if (ok) sfx('gem'); next(); });
    })();
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------------- results ---------------- */
  function finishRace() {
    setTimeout(function () {
      R.racers.forEach(function (r) { if (!r.done) { r.done = true; r.finish = R.t + Math.max(0, R.laps * TRACK.len - r.dist) / Math.max(15, r.v || 30); } });
      var order = R.racers.slice().sort(function (a, b) { return a.finish - b.finish; }), pos = order.indexOf(R.me) + 1;
      if (R.me.done) narr(pos === 1 ? 'win' : 'end', 2, { p: ORD[pos] });
      paused = true; engineOn(false); document.body.classList.remove('racing'); sfx(pos <= 3 ? 'win' : 'no'); $('#hud').hidden = true;
      if (MODE === 'free' && !R.pitted) { R.pitted = true; R.order = order; return setTimeout(function () { pitStop(order, pos, function () { showResults(order, pos); }); }, 2600); }
      showResults(order, pos);
    }, 1200);
  }
  function showResults(order, pos) {
    {
      var stars = (pos <= 1 ? 1 : 0) + (pos <= 3 ? 1 : 0) + (R.asked && R.right / R.asked >= .7 ? 1 : 0);
      var key = 'best:' + LV.id; if (!SAVE[key] || stars > SAVE[key]) { SAVE[key] = stars; store.set('ifkart', SAVE); }
      $('#resc').innerHTML = '<h1 style="text-align:center">' + (pos === 1 ? '🏆 You won!' : pos <= 3 ? ['', '🥇', '🥈', '🥉'][pos] + ' ' + pos + ord(pos) + ' place!' : 'Finished ' + pos + ord(pos)) + '</h1><p class="sub" style="text-align:center;font-size:26px">' + '⭐'.repeat(stars) + '☆'.repeat(3 - stars) + ' · 💎 ' + R.gems + ' · ' + R.right + ' / ' + R.asked + ' answers right · ' + fmt(R.me.finish) + '</p>' +
        '<table>' + order.map(function (r, i) { return '<tr class="' + (r.me ? 'me' : '') + '"><td>' + (i + 1) + '</td><td>' + esc(r.d.name) + (r.me ? ' (you)' : '') + '</td><td style="text-align:right">' + fmt(Math.max(r.finish, 0)) + '</td></tr>'; }).join('') + '</table>' +
        '<div class="row"><button class="go" id="again">↻ Race again</button>' + (LEVELS.indexOf(LV) < LEVELS.length - 1 ? '<button class="go" id="next">Next level: ' + LEVELS[LEVELS.indexOf(LV) + 1].name + ' →</button>' : '') + '<button class="go ghost" id="tomenu">Menu</button></div>';
      $('#res').style.display = 'flex'; $('#hud').hidden = true;
      $('#again').onclick = function () { startRace(); };
      if ($('#next')) $('#next').onclick = function () { LV = LEVELS[LEVELS.indexOf(LV) + 1]; SAVE.level = LV.id; store.set('ifkart', SAVE); MB = null; startRace(); };
      $('#tomenu').onclick = showMenu;
    }
  }
  function ord(n) { return n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'; }

  /* ---------------- menu ---------------- */
  function showMenu() {
    paused = true; engineOn(false); document.body.classList.remove('racing'); $('#hud').hidden = true; $('#keys').hidden = true; $('#res').style.display = 'none'; $('#q').style.display = 'none';
    $('#menu').style.display = 'flex';
    $('#lvls').innerHTML = LEVELS.map(function (l) { var b = SAVE['best:' + l.id]; return '<button class="lv' + (l === LV ? ' on' : '') + '" data-l="' + l.id + '" style="background:' + l.col + '">' + l.name + '<small>' + l.sub + (b ? ' · ' + '⭐'.repeat(b) : '') + '</small></button>'; }).join('');
    $('#chars').innerHTML = DRIVERS.map(function (d) { return '<button class="ch' + (d === ME ? ' on' : '') + '" data-d="' + d.id + '">' + { cat: '🐱', bunny: '🐰', bear: '🐻', fox: '🦊', panda: '🐼', frog: '🐸' }[d.id] + ' ' + d.name + '</button>'; }).join('');
    $('#modes').innerHTML = [['free', '🏎️ Race first', 'Just drive. English comes after the race.'], ['quiz', '🎁 Quiz race', 'Answer at the gift boxes for a turbo.']].map(function (m) { return '<button class="ch md' + (MODE === m[0] ? ' on' : '') + '" data-m="' + m[0] + '">' + m[1] + '<small>' + m[2] + '</small></button>'; }).join('') + '<button class="ch md' + (NARR_ON ? ' on' : '') + '" id="narr">' + (NARR_ON ? '🎙 Narrator on' : '🔇 Narrator off') + '<small>The voice that talks about your race.</small></button>';
    [].forEach.call(document.querySelectorAll('[data-m]'), function (b) { b.onclick = function () { MODE = b.dataset.m; SAVE.mode = MODE; store.set('ifkart', SAVE); showMenu(); }; });
    $('#narr').onclick = function () { NARR_ON = !NARR_ON; SAVE.narr = NARR_ON ? 1 : 0; store.set('ifkart', SAVE); showMenu(); };
    $('#how').innerHTML = 'Phone: ◀ ▶ to steer, the kart drives by itself, Brake and Drift on the right. Computer: arrow keys, Space to drift.<br>' + (MODE === 'free' ? 'Drive through the 🎁 gift boxes for a turbo. Hold Drift in a turn for a boost. After 3 laps: a pit stop with 5 questions for 💎.' : 'Right answer = turbo and a 💎. Wrong answer = your kart spins. 3 laps — try to finish first!');
    [].forEach.call(document.querySelectorAll('[data-l]'), function (b) { b.onclick = function () { LV = LEVELS.filter(function (l) { return l.id === b.dataset.l; })[0]; SAVE.level = LV.id; store.set('ifkart', SAVE); MB = null; showMenu(); }; });
    [].forEach.call(document.querySelectorAll('[data-d]'), function (b) { b.onclick = function () { ME = DRIVERS.filter(function (d) { return d.id === b.dataset.d; })[0]; SAVE.driver = ME.id; store.set('ifkart', SAVE); showMenu(); }; });
  }
  $('#go').onclick = function () { $('#go').textContent = 'Loading…'; loadBanks().then(function () { $('#go').textContent = '▶ Race!'; MB = null; startRace(); }); };
  $('#pause').onclick = function () { showMenu(); };

  /* ---------------- input ---------------- */
  addEventListener('keydown', function (e) { keys[e.key] = true; if (e.key === ' ' || e.key.indexOf('Arrow') === 0) e.preventDefault(); });
  addEventListener('keyup', function (e) { keys[e.key] = false; });
  function hold(id, k) { var b = $('#' + id); var on = function (e) { e.preventDefault(); touch[k] = 1; b.classList.add('on'); }, off = function (e) { e.preventDefault(); touch[k] = 0; b.classList.remove('on'); }; b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointerleave', off); b.addEventListener('pointercancel', off); }
  hold('left', 'l'); hold('right', 'r'); hold('brake', 'brake'); hold('drift', 'drift');

  /* ---------------- loop ---------------- */
  var clock = new THREE.Clock();
  // a slowly turning view of the track behind the menu
  buildTrack(LV);
  var spinT = 0;
  function loop() {
    requestAnimationFrame(loop);
    var dt = Math.min(.05, clock.getDelta());
    if (!paused) step(dt);
    else if (!R || $('#menu').style.display !== 'none') { spinT += dt * .05; camera.position.set(Math.cos(spinT) * 260, 120, Math.sin(spinT) * 220); camera.lookAt(0, 0, 0); }
    renderer.render(scene, camera);
  }
  loop(); showMenu();
  window.IFKART = { start: function (lv) { if (lv) LV = LEVELS.filter(function (l) { return l.id === lv; })[0] || LV; return loadBanks().then(startRace); }, state: function () { return R; }, ask: function () { ask(); }, mode: function (m) { if (m) MODE = m; return MODE; } };
})();
