/* IF Mind Lab — Neon arcade: four original word games on the IF English word bank (Pre A1–C2).
   NEON SERPENT (snake) · SKYLINE (tower) · FUSION CORE (2048) · CIPHER RAIN (falling letter blocks).
   Every right answer counts towards a level up (3 in a row), every slip towards a level down (2 in a row): the
   next word is chosen from the new level at once. Each game gets the runner's api A (add, miss, word, others, …). */
(function () {
  'use strict';
  var G = window.ML_EXT_GAMES = window.ML_EXT_GAMES || [];
  var plain = function (w) { return /^[A-Za-z]{3,10}$/.test(w); };          // one word, letters only (for the letter games)
  var shortW = function (w) { return w.length <= 16; };
  function keys(A, fn) { var h = function (e) { if (!A.alive()) { document.removeEventListener('keydown', h); return; } fn(e); }; document.addEventListener('keydown', h); }
  function swipe(el, A, fn) {
    var x0 = null, y0 = null;
    el.addEventListener('touchstart', function (e) { var t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) { if (x0 == null || !A.alive()) return; var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0; x0 = null; if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return; fn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U')); }, { passive: true });
  }
  var DIRK = { ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R', w: 'U', s: 'D', a: 'L', d: 'R', W: 'U', S: 'D', A: 'L', D: 'R' };
  function dpad() { return '<div class="dpad"><button data-d="U" aria-label="Up">▲</button><button data-d="L" aria-label="Left">◀</button><button data-d="D" aria-label="Down">▼</button><button data-d="R" aria-label="Right">▶</button></div>'; }
  function canvasIn(host) {
    var c = document.createElement('canvas'); host.appendChild(c);
    var x = c.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    function fit() { var r = host.getBoundingClientRect(); c.width = r.width * dpr; c.height = r.height * dpr; c.style.width = r.width + 'px'; c.style.height = r.height + 'px'; x.setTransform(dpr, 0, 0, dpr, 0, 0); return { w: r.width, h: r.height }; }
    return { c: c, x: x, fit: fit };
  }
  function glowText(x, t, px, py, size, col) { x.save(); x.font = '700 ' + size + 'px "Space Grotesk",system-ui,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = col; x.shadowBlur = 12; x.fillStyle = '#fff'; x.fillText(t, px, py); x.restore(); }

  /* ===== NEON SERPENT ===== steer the light-snake into the orb whose word matches the meaning */
  G.push({ id: 'serpent', t: 'NEON SERPENT', sk: 'focus', words: true, c1: '#34d399', c2: '#22d3ee',
    p: 'Steer a snake of light. Eat the orb with the word that matches the meaning — grow longer and faster. Wrong orbs cut you short.',
    art: function (s) { return '<path d="M10 46c0-10 8-12 14-12s12 2 12-6-8-8-8-14 6-8 12-8 10 4 12 8" ' + s + '/><circle cx="52" cy="14" r="3" fill="#34d399"/><circle cx="14" cy="52" r="5" ' + s + '/>'; },
    run: function (ar, A) {
      var H = A.H;
      ar.innerHTML = '<div class="mlx-top"><span class="mlx-k">EAT THE WORD FOR</span><b id="sq"></b><span class="mlx-lives" id="lv">❤❤❤</span></div><div class="mlx-board" id="bd"></div>' + dpad();
      var bd = H.$('#bd'), cv = canvasIn(bd), x = cv.x, size = cv.fit(), COLS = 18, ROWS = 12, cell = 0, ox = 0, oy = 0;
      function layout() { size = cv.fit(); cell = Math.floor(Math.min(size.w / COLS, size.h / ROWS)); ox = (size.w - cell * COLS) / 2; oy = (size.h - cell * ROWS) / 2; }
      layout(); addEventListener('resize', layout);
      var snake, dir, want, grow = 0, orbs = [], cur = null, lives = 3, tick = 190, acc = 0, prev = performance.now(), flashT = 0, flashCol = '#34d399';
      function reset() { snake = [{ x: 5, y: 6 }, { x: 4, y: 6 }, { x: 3, y: 6 }]; dir = want = 'R'; }
      function free() { for (var k = 0; k < 200; k++) { var p = { x: 1 + Math.floor(Math.random() * (COLS - 2)), y: 1 + Math.floor(Math.random() * (ROWS - 2)) }; if (!snake.some(function (s) { return Math.abs(s.x - p.x) + Math.abs(s.y - p.y) < 3; }) && !orbs.some(function (o) { return Math.abs(o.x - p.x) + Math.abs(o.y - p.y) < 4; })) return p; } return { x: 2, y: 2 }; }
      function round() {
        cur = A.word(shortW); orbs = [];
        [cur.w].concat(A.others(cur.w, 2, shortW)).forEach(function (w, i) { var p = free(); orbs.push({ x: p.x, y: p.y, w: w, ok: i === 0, ph: Math.random() * 6 }); });
        H.$('#sq').textContent = cur.d;
      }
      reset(); round();
      var go = function (d) { var opp = { U: 'D', D: 'U', L: 'R', R: 'L' }; if (d && d !== opp[dir]) want = d; };
      keys(A, function (e) { if (DIRK[e.key]) { e.preventDefault(); go(DIRK[e.key]); } });
      swipe(bd, A, go);
      H.$$('.dpad button', ar).forEach(function (b) { b.onpointerdown = function (e) { e.preventDefault(); go(b.dataset.d); }; });
      function lose(msg) {
        lives--; H.$('#lv').textContent = '❤'.repeat(Math.max(0, lives)) + '♡'.repeat(3 - Math.max(0, lives)); H.sfx.bad(); H.flash(ar, false); flashT = 12; flashCol = '#fb7185';
        if (lives <= 0) return A.end();
        H.toast(msg); reset();
      }
      function step() {
        dir = want; var h = snake[0], n = { x: h.x + (dir === 'R') - (dir === 'L'), y: h.y + (dir === 'D') - (dir === 'U') };
        if (n.x < 0 || n.y < 0 || n.x >= COLS || n.y >= ROWS) return lose('Hit the wall!');
        if (snake.some(function (s) { return s.x === n.x && s.y === n.y; })) return lose('Hit your own tail!');
        snake.unshift(n);
        var o = orbs.filter(function (o) { return o.x === n.x && o.y === n.y; })[0];
        if (o) {
          if (o.ok) { A.add(30, ar, ox + n.x * cell, oy + n.y * cell); grow += 2; tick = Math.max(85, tick - 6); flashCol = '#34d399'; flashT = 10; A.log(true, cur.w); }
          else { A.miss(10, ar, ox + n.x * cell, oy + n.y * cell); A.log(false, '<b>' + H.esc(cur.d) + '</b> → <b>' + H.esc(cur.w) + '</b> (not ' + H.esc(o.w) + ')'); for (var k = 0; k < 2 && snake.length > 3; k++) snake.pop(); flashCol = '#fb7185'; flashT = 12; H.toast('It was “' + cur.w + '”'); }
          round();
        }
        if (grow > 0) grow--; else snake.pop();
      }
      function draw(t) {
        x.clearRect(0, 0, size.w, size.h);
        // grid floor
        x.strokeStyle = 'rgba(34,211,238,.08)'; x.lineWidth = 1;
        for (var i = 0; i <= COLS; i++) { x.beginPath(); x.moveTo(ox + i * cell, oy); x.lineTo(ox + i * cell, oy + ROWS * cell); x.stroke(); }
        for (var j = 0; j <= ROWS; j++) { x.beginPath(); x.moveTo(ox, oy + j * cell); x.lineTo(ox + COLS * cell, oy + j * cell); x.stroke(); }
        x.strokeStyle = flashT > 0 ? flashCol : 'rgba(34,211,238,.5)'; x.lineWidth = 2; x.strokeRect(ox, oy, COLS * cell, ROWS * cell); if (flashT > 0) flashT--;
        // orbs
        orbs.forEach(function (o) { var cx = ox + (o.x + .5) * cell, cy = oy + (o.y + .5) * cell, r = cell * .42 + Math.sin(t / 300 + o.ph) * 2;
          var g = x.createRadialGradient(cx, cy, 1, cx, cy, r * 2.2); g.addColorStop(0, 'rgba(167,139,250,.95)'); g.addColorStop(.45, 'rgba(99,102,241,.35)'); g.addColorStop(1, 'rgba(99,102,241,0)'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r * 2.2, 0, 7); x.fill();
          x.fillStyle = '#fff'; x.beginPath(); x.arc(cx, cy, r * .45, 0, 7); x.fill();
          glowText(x, o.w, cx, cy - cell * .95, Math.max(12, Math.min(17, cell * .55)), '#a78bfa'); });
        // the serpent
        snake.forEach(function (s, k) { var cx = ox + (s.x + .5) * cell, cy = oy + (s.y + .5) * cell, f = 1 - k / (snake.length + 4);
          x.save(); x.shadowColor = '#34d399'; x.shadowBlur = k ? 8 : 18; x.fillStyle = k ? 'rgba(52,211,153,' + (.35 + f * .6).toFixed(2) + ')' : '#a7f3d0';
          var rr = cell * (k ? .38 + f * .08 : .48); x.beginPath(); x.arc(cx, cy, rr, 0, 7); x.fill(); x.restore(); });
        var hd = snake[0], ex = ox + (hd.x + .5) * cell, ey = oy + (hd.y + .5) * cell, dx = (dir === 'R') - (dir === 'L'), dy = (dir === 'D') - (dir === 'U');
        x.fillStyle = '#050816'; [[-1, 1], [1, 1]].forEach(function (q) { x.beginPath(); x.arc(ex + dx * cell * .15 + dy * q[0] * cell * .16, ey + dy * cell * .15 + dx * q[0] * cell * .16, cell * .07, 0, 7); x.fill(); });
      }
      function loop(t) {
        if (!A.alive()) return;
        acc += t - prev; prev = t; while (acc > tick) { acc -= tick; step(); if (!A.alive()) return; }
        draw(t); RUN_RAF(loop);
      }
      RUN_RAF(loop); A.clock(90);
    } });

  /* ===== SKYLINE ===== drop sliding floors to build a neon tower; Power Words repair it */
  G.push({ id: 'skyline', t: 'SKYLINE', sk: 'vocab', words: true, c1: '#f472b6', c2: '#fbbf24',
    p: 'Build a skyscraper of light. Tap to drop each sliding floor — overhang is cut off. Every third floor, a Power Word restores your tower.',
    art: function (s) { return '<path d="M20 56V22h10v34M34 56V10h10v46M48 56V30h8v26M8 56h50" ' + s + '/><path d="M24 28h2M24 36h2M38 18h2M38 28h2M38 38h2" ' + s + ' opacity=".7"/>'; },
    run: function (ar, A) {
      var H = A.H;
      ar.innerHTML = '<div class="mlx-top"><span class="mlx-k">FLOORS</span><b id="fl">0</b><span class="mlx-k" style="margin-left:auto">TAP · SPACE TO DROP</span><span class="mlx-lives" id="slv" style="margin-left:12px">❤❤❤</span></div><div class="mlx-board tall" id="bd"></div><div class="mlx-q" id="q" hidden></div>';
      var lives = 3, bd = H.$('#bd'), cv = canvasIn(bd), x = cv.x, size = cv.fit(), FH = 26, BASEW = 0, floors = [], mv = null, cam = 0, falling = [], paused = false, t0 = performance.now(), hues = ['#22d3ee', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'];
      function start() { size = cv.fit(); BASEW = Math.min(240, size.w * .45); floors = [{ x: (size.w - BASEW) / 2, w: BASEW }]; spawn(); }
      function spawn() { var top = floors[floors.length - 1]; var dir = Math.random() < .5 ? 1 : -1; mv = { w: top.w, v: dir * (1.7 + Math.min(3.2, floors.length * .1)), x: dir > 0 ? Math.max(0, top.x - top.w * .9) : Math.min(size.w - top.w, top.x + top.w * .9) }; }
      start();
      function drop() {
        if (paused || !mv) return;
        var top = floors[floors.length - 1], l = Math.max(mv.x, top.x), r = Math.min(mv.x + mv.w, top.x + top.w), w = r - l;
        if (w <= 2) { H.sfx.bad(); H.flash(ar, false); falling.push({ x: mv.x, y: 0, w: mv.w, v: 0, lvl: floors.length }); mv = null; lives--; H.$('#slv').textContent = '❤'.repeat(Math.max(0, lives)) + '♡'.repeat(3 - Math.max(0, lives)); if (lives <= 0) return A.end(); H.toast('Missed the tower!'); return A.later(spawn, 500); }
        if (mv.x < l) falling.push({ x: mv.x, w: l - mv.x, v: 0, lvl: floors.length }); if (mv.x + mv.w > r) falling.push({ x: r, w: mv.x + mv.w - r, v: 0, lvl: floors.length });
        var perfect = Math.abs(mv.x - top.x) < 4;
        if (perfect) { l = top.x; w = top.w; H.toast('Perfect floor! +25'); A.score(25); H.sfx.ok(3); } else { A.score(10); H.sfx.ok(0); }
        floors.push({ x: l, w: w, h: hues[floors.length % hues.length] }); mv = null; H.$('#fl').textContent = floors.length - 1;
        if ((floors.length - 1) % 3 === 0) power(); else spawn();
      }
      function power() {
        paused = true; var it = A.word(shortW), o = H.shuffle([it.w].concat(A.others(it.w, 2, shortW))), q = H.$('#q');
        q.hidden = false; q.innerHTML = '<p class="eyebrow">⚡ Power Word · floor ' + (floors.length - 1) + '</p><p class="prompt" style="font-size:20px">' + H.esc(it.d) + '</p><div class="opts">' + o.map(function (w) { return '<button class="opt">' + H.esc(w) + '</button>'; }).join('') + '</div>';
        H.$$('.opt', q).forEach(function (b) { b.onclick = function () {
          var ok = b.textContent === it.w; H.$$('.opt', q).forEach(function (y) { y.disabled = true; if (y.textContent === it.w) y.classList.add('ok'); }); if (!ok) b.classList.add('bad');
          var top = floors[floors.length - 1];
          if (ok) { A.add(30, ar); var c = top.x + top.w / 2; top.w = BASEW; top.x = Math.max(0, Math.min(size.w - BASEW, c - BASEW / 2)); H.toast('Tower repaired to full width'); }
          else { A.miss(0, ar); A.log(false, '<b>' + H.esc(it.d) + '</b> → <b>' + H.esc(it.w) + '</b>'); var cut = top.w * .25; top.w -= cut; top.x += cut / 2; }
          A.later(function () { q.hidden = true; paused = false; spawn(); }, ok ? 700 : 1500);
        }; });
      }
      bd.addEventListener('pointerdown', function (e) { e.preventDefault(); drop(); });
      keys(A, function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); drop(); } });
      function tower(fx, fy, w, col, idx) {
        var g = x.createLinearGradient(fx, fy, fx + w, fy + FH); g.addColorStop(0, 'rgba(20,30,70,.95)'); g.addColorStop(1, 'rgba(10,15,40,.95)'); x.fillStyle = g; x.fillRect(fx, fy, w, FH - 2);
        x.save(); x.shadowColor = col; x.shadowBlur = 10; x.strokeStyle = col; x.lineWidth = 1.5; x.strokeRect(fx + .5, fy + .5, w - 1, FH - 3); x.restore();
        for (var i = 6; i < w - 6; i += 9) { var n = Math.sin(idx * 12.9 + i * 7.3) * 43758.5; n -= Math.floor(n); if (n < .55) { x.fillStyle = n < .2 ? 'rgba(251,191,36,.85)' : 'rgba(125,211,252,.7)'; x.fillRect(fx + i, fy + 8, 4, 7); } }
      }
      function loop(t) {
        if (!A.alive()) return;
        size = { w: bd.clientWidth, h: bd.clientHeight };
        var want = Math.max(0, (floors.length + 2) * FH - size.h * .6); cam += (want - cam) * .08;
        x.clearRect(0, 0, size.w, size.h);
        var base = size.h + cam;
        // searchlights
        x.save(); x.globalAlpha = .08; x.fillStyle = '#22d3ee'; x.beginPath(); x.moveTo(size.w * .2, size.h); x.lineTo(size.w * .2 + Math.sin(t / 1400) * 160 - 30, 0); x.lineTo(size.w * .2 + Math.sin(t / 1400) * 160 + 30, 0); x.fill(); x.restore();
        floors.forEach(function (f, i) { tower(f.x, base - (i + 1) * FH, f.w, i ? f.h : '#6366f1', i); });
        if (mv && !paused) { mv.x += mv.v; if (mv.x < -mv.w * .2 || mv.x + mv.w > size.w + mv.w * .2) mv.v *= -1; tower(mv.x, base - (floors.length + 1) * FH, mv.w, '#ffffff', floors.length); }
        falling.forEach(function (f) { f.v += .5; f.y = (f.y || 0) + f.v; x.globalAlpha = Math.max(0, 1 - f.y / 300); tower(f.x, base - (f.lvl + 1) * FH + f.y, f.w, '#fb7185', f.lvl); x.globalAlpha = 1; });
        falling = falling.filter(function (f) { return f.y < 320; });
        RUN_RAF(loop);
      }
      RUN_RAF(loop); A.clock(120);
    } });

  /* ===== FUSION CORE ===== 2048 with energy cores; Charge words bring bonuses or glitches */
  G.push({ id: 'fusion', t: 'FUSION CORE', sk: 'focus', words: true, c1: '#fbbf24', c2: '#a78bfa',
    p: 'Slide and fuse energy cores (2048). Every 8 moves a Charge Word: get it right for a bonus fusion; miss it and a glitch block jams the grid.',
    art: function (s) { return '<rect x="8" y="8" width="20" height="20" rx="5" ' + s + '/><rect x="36" y="8" width="20" height="20" rx="5" ' + s + ' opacity=".6"/><rect x="8" y="36" width="20" height="20" rx="5" ' + s + ' opacity=".6"/><rect x="36" y="36" width="20" height="20" rx="5" ' + s + '/><circle cx="46" cy="46" r="4" fill="#fbbf24"/>'; },
    run: function (ar, A) {
      var H = A.H, N = 4, g = [], moves = 0, busy = false, glitch = [], best = 0;
      ar.innerHTML = '<div class="mlx-top"><span class="mlx-k">BIGGEST CORE</span><b id="bg">2</b><span class="mlx-k" style="margin-left:auto">ARROWS · SWIPE</span></div><div class="fz" id="fz"></div>' + dpad() + '<div class="mlx-q" id="q" hidden></div>';
      for (var i = 0; i < N * N; i++) g.push(0);
      function empty() { var e = []; g.forEach(function (v, i) { if (!v) e.push(i); }); return e; }
      function add() { var e = empty(); if (!e.length) return; g[e[Math.floor(Math.random() * e.length)]] = Math.random() < .88 ? 2 : 4; }
      add(); add();
      function draw(newIdx, merged) {
        H.$('#fz').innerHTML = g.map(function (v, i) { var cls = v === -1 ? 'gl' : v ? 'v' + Math.min(v, 4096) : ''; return '<div class="fc ' + cls + (merged && merged.indexOf(i) >= 0 ? ' mg' : '') + (i === newIdx ? ' nw' : '') + '">' + (v === -1 ? '⨯' : v || '') + '</div>'; }).join('');
        best = Math.max.apply(null, g); H.$('#bg').textContent = best;
      }
      draw();
      function line(i, d) { var r = [], k; for (k = 0; k < N; k++) r.push(d === 'L' ? i * N + k : d === 'R' ? i * N + (N - 1 - k) : d === 'U' ? k * N + i : (N - 1 - k) * N + i); return r; }
      function move(d) {
        if (busy) return; var moved = false, merged = [], gain = 0;
        for (var i = 0; i < N; i++) {
          var idx = line(i, d), seg = [], out = [], k;
          // glitch blocks are walls: slide each stretch between them separately
          var parts = [[]]; idx.forEach(function (p) { if (g[p] === -1) parts.push(p, []); else parts[parts.length - 1].push(p); });
          parts.forEach(function (part) {
            if (!Array.isArray(part)) return;
            var vals = part.map(function (p) { return g[p]; }).filter(Boolean), res = [];
            for (k = 0; k < vals.length; k++) { if (vals[k] === vals[k + 1]) { res.push(vals[k] * 2); gain += vals[k] * 2; merged.push(part[res.length - 1]); k++; } else res.push(vals[k]); }
            part.forEach(function (p, j) { var nv = res[j] || 0; if (g[p] !== nv) moved = true; g[p] = nv; });
          });
        }
        if (!moved) return;
        moves++; A.score(gain); if (gain >= 64) H.sfx.ok(2); else if (gain) H.sfx.tick();
        glitch = glitch.filter(function (q) { if (--q.t <= 0) { if (g[q.i] === -1) g[q.i] = 0; return false; } return true; });
        var e = empty(), ni = e.length ? e[Math.floor(Math.random() * e.length)] : -1; if (ni >= 0) g[ni] = Math.random() < .88 ? 2 : 4;
        draw(ni, merged);
        if (moves % 8 === 0) charge(); else if (over()) A.end();
      }
      function over() { if (empty().length) return false; for (var i = 0; i < N * N; i++) { var v = g[i]; if (v === -1) continue; if ((i % N < N - 1 && g[i + 1] === v) || (i < N * (N - 1) && g[i + N] === v)) return false; } return true; }
      function charge() {
        busy = true; var it = A.word(shortW), o = H.shuffle([it.w].concat(A.others(it.w, 2, shortW))), q = H.$('#q');
        q.hidden = false; q.innerHTML = '<p class="eyebrow">⚡ Charge Word</p><p class="prompt" style="font-size:20px">' + H.esc(it.d) + '</p><div class="opts">' + o.map(function (w) { return '<button class="opt">' + H.esc(w) + '</button>'; }).join('') + '</div>';
        H.$$('.opt', q).forEach(function (b) { b.onclick = function () {
          var ok = b.textContent === it.w; H.$$('.opt', q).forEach(function (y) { y.disabled = true; if (y.textContent === it.w) y.classList.add('ok'); }); if (!ok) b.classList.add('bad');
          if (ok) {   // bonus fusion: the smallest core doubles and joins the biggest family
            A.add(40, ar); var mi = -1; g.forEach(function (v, i) { if (v > 0 && (mi < 0 || v < g[mi])) mi = i; }); if (mi >= 0) g[mi] *= 4; H.toast('⚡ Bonus fusion!');
          } else {
            A.miss(0, ar); A.log(false, '<b>' + H.esc(it.d) + '</b> → <b>' + H.esc(it.w) + '</b>'); var e = empty(); if (e.length) { var gi = e[Math.floor(Math.random() * e.length)]; g[gi] = -1; glitch.push({ i: gi, t: 10 }); } H.toast('Glitch block for 10 moves');
          }
          A.later(function () { q.hidden = true; busy = false; draw(); if (over()) A.end(); }, ok ? 700 : 1500);
        }; });
      }
      keys(A, function (e) { if (DIRK[e.key]) { e.preventDefault(); move(DIRK[e.key]); } });
      swipe(H.$('#fz'), A, move);
      H.$$('.dpad button', ar).forEach(function (b) { b.onpointerdown = function (e) { e.preventDefault(); move(b.dataset.d); }; });
      A.clock(150);
    } });

  /* ===== CIPHER RAIN ===== letter blocks fall; tap them in order to spell the word for the meaning */
  G.push({ id: 'cipher', t: 'CIPHER RAIN', sk: 'write', words: true, c1: '#22d3ee', c2: '#f472b6',
    p: 'Letter blocks rain into the columns. Tap them in order to spell the word for the meaning before any column reaches the top.',
    art: function (s) { return '<rect x="8" y="40" width="14" height="14" rx="3" ' + s + '/><rect x="25" y="40" width="14" height="14" rx="3" ' + s + '/><rect x="25" y="24" width="14" height="14" rx="3" ' + s + ' opacity=".7"/><rect x="42" y="10" width="14" height="14" rx="3" ' + s + ' opacity=".5"/><path d="M49 28v8" ' + s + '/>'; },
    run: function (ar, A) {
      var H = A.H, COLS = 6, ROWS = 8, cols = [], fall = null, cur, typed = 0, queue = [], spawnMs = 1500, last = 0, id = 0;
      for (var c = 0; c < COLS; c++) cols.push([]);
      ar.innerHTML = '<div class="mlx-top"><span class="mlx-k">SPELL</span><b id="cd"></b></div><div class="cslots" id="cs"></div><div class="crain" id="cr"></div>';
      var cr = H.$('#cr');
      function nextWord() {
        cur = A.word(plain); cur.w = cur.w.toLowerCase(); typed = 0;
        H.$('#cd').textContent = cur.d; slots();
        var dec = 'aeioustrnl'.split('').filter(function () { return Math.random() < .25; }).slice(0, 2 + Math.floor(cur.w.length / 4));
        queue = H.shuffle(cur.w.split('').concat(dec));
      }
      function slots() { H.$('#cs').innerHTML = cur.w.split('').map(function (ch, i) { return '<i class="' + (i < typed ? 'f' : '') + '">' + (i < typed ? ch : '') + '</i>'; }).join(''); }
      function need() { return cur.w[typed]; }
      function spawn() {
        if (!queue.length) { var rest = cur.w.slice(typed).split(''); queue = H.shuffle(rest.concat(['e', 'a'])); }
        // make sure the next letter you need is somewhere on screen or coming soon
        var onBoard = cols.some(function (cl) { return cl.some(function (b) { return b.ch === need(); }); });
        var ch = !onBoard && queue.indexOf(need()) > 2 ? need() : queue.shift();
        var heights = cols.map(function (cl) { return cl.length; }), minH = Math.min.apply(null, heights), cand = []; heights.forEach(function (h, i) { if (h <= minH + 1) cand.push(i); });
        fall = { ch: ch, col: cand[Math.floor(Math.random() * cand.length)], y: -1, id: ++id };
      }
      function land() { cols[fall.col].push({ ch: fall.ch, id: fall.id }); fall = null; draw(); if (cols.some(function (cl) { return cl.length >= ROWS; })) { H.toast('The rain reached the top!'); A.end(); } }
      function tap(colI, idx) {
        var b = cols[colI][idx]; if (!b) return;
        if (b.ch === need()) {
          cols[colI].splice(idx, 1); typed++; H.sfx.tick(); slots();
          if (typed >= cur.w.length) { A.add(cur.w.length * 8, ar); A.log(true, cur.w); H.speak(cur.w, 'f'); nextWord(); }
        } else {
          A.miss(5, ar); A.log(false, '<b>' + H.esc(cur.d) + '</b> → <b>' + H.esc(cur.w) + '</b>'); H.flash(ar, false);
          var k = Math.floor(Math.random() * COLS); cols[k].push({ ch: 'x', id: ++id, junk: true });   // a penalty block
          if (cols.some(function (cl) { return cl.length >= ROWS; })) { A.end(); return; }
        }
        draw(); moveFall();
      }
      var fallEl = null;
      function draw() {
        cr.innerHTML = cols.map(function (cl, ci) { return '<div class="ccol">' + cl.map(function (b, bi) { return '<button class="cb' + (b.junk ? ' junk' : '') + '" data-c="' + ci + '" data-i="' + bi + '"' + (b.junk ? ' disabled' : '') + '>' + (b.junk ? '▦' : b.ch) + '</button>'; }).join('') + '</div>'; }).join('') + '<span class="cb fall" id="cf" hidden></span>';
        fallEl = H.$('#cf', cr);
        H.$$('.cb[data-c]', cr).forEach(function (b) { b.onpointerdown = function (e) { e.preventDefault(); tap(+b.dataset.c, +b.dataset.i); }; });
      }
      function moveFall() {
        if (!fallEl) return; if (!fall) { fallEl.hidden = true; return; }
        fallEl.hidden = false; fallEl.textContent = fall.ch; fallEl.style.left = (fall.col * 100 / COLS) + '%'; fallEl.style.width = (100 / COLS) + '%'; fallEl.style.bottom = Math.max(0, (ROWS - 1 - fall.y)) * (100 / ROWS) + '%';
      }
      // tap a falling block too
      cr.addEventListener('pointerdown', function (e) { var f = e.target.closest('.fall'); if (f && fall && fall.ch === need()) { fall = null; typed++; H.sfx.tick(); slots(); if (typed >= cur.w.length) { A.add(cur.w.length * 8, ar); A.log(true, cur.w); H.speak(cur.w, 'f'); nextWord(); } moveFall(); } });
      keys(A, function (e) { if (/^[a-z]$/i.test(e.key)) { var ch = e.key.toLowerCase(); for (var ci = 0; ci < COLS; ci++) { var bi = cols[ci].map(function (b) { return b.ch; }).lastIndexOf(ch); if (bi >= 0 && ch === need()) return tap(ci, bi); } if (fall && fall.ch === ch && ch === need()) { fall = null; typed++; H.sfx.tick(); slots(); if (typed >= cur.w.length) { A.add(cur.w.length * 8, ar); A.log(true, cur.w); nextWord(); } } } });
      nextWord(); draw();
      var prev = performance.now();
      function loop(t) {
        if (!A.alive()) return;
        var dt = t - prev; prev = t;
        if (!fall && t - last > spawnMs) { spawn(); last = t; spawnMs = Math.max(600, 1500 - 110 * Math.max(0, ['PA1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(A.lv))); }
        if (fall) { fall.y += dt / 260; if (fall.y >= ROWS - 1 - cols[fall.col].length) land(); }
        moveFall(); RUN_RAF(loop);
      }
      RUN_RAF(loop); A.clock(120);
    } });

  // the runner cancels animation frames through RUN.raf; extensions register theirs here
  function RUN_RAF(f) { return (window.__mlRaf = requestAnimationFrame(f)); }
})();
