/* IF Live — Race mode on the big screen: a 3D race drawn on a canvas (no library).
   Every student is a car; the distance between cars is the difference in points. The camera moves by itself:
   a wide shot of the whole race, then a close-up of the leader, wide again, then the closest battle.
   LIVE.Race3D.show(slot, [{id, name, score, color}])  — call after every re-draw of the stage (the canvas is kept and moved)
   LIVE.Race3D.stop() */
(function () {
  var cv = null, cx = null, raf = 0, W = 0, H = 0, DPR = 1;
  var cars = {}, order = [];              // id → {name, score, z, x, color, bump}
  var cam = { x: 0, y: 12, z: -14, lx: 0, lz: 20, f: 1 }, shot = { kind: 'wide', id: null, until: 0, i: 0 }, leader = null, cap = '';
  var t0 = performance.now(), last = t0, road = 0, OPT = { kind: 'car', per: .11, unit: '' };
  var SEQ = [['wide', 7000], ['lead', 5500], ['wide', 5000], ['duel', 5500]];
  var STARS = []; for (var i = 0; i < 70; i++) STARS.push([Math.random(), Math.random() * .42, Math.random() * 1.6 + .4]);

  function size() { if (!cv) return; var r = cv.getBoundingClientRect(); DPR = Math.min(2, window.devicePixelRatio || 1); W = Math.max(320, r.width); H = Math.max(200, r.height); cv.width = W * DPR; cv.height = H * DPR; }
  /* world → screen. Camera at cam.(x,y,z) looks at (cam.lx, 0, cam.lz). */
  var sinP = 0, cosP = 1, sinY = 0, cosY = 1, F = 600;
  function aim() {
    var dx = cam.lx - cam.x, dz = cam.lz - cam.z, dy = -cam.y, g = Math.sqrt(dx * dx + dz * dz) || 1;
    var yaw = Math.atan2(dx, dz), pit = Math.atan2(-dy, g);
    sinY = Math.sin(yaw); cosY = Math.cos(yaw); sinP = Math.sin(pit); cosP = Math.cos(pit); F = H * 1.05 * cam.f;
  }
  function P(x, y, z) {
    var dx = x - cam.x, dy = y - cam.y, dz = z - cam.z;
    var rx = dx * cosY - dz * sinY, rz = dx * sinY + dz * cosY;       // yaw
    var ry = dy * cosP + rz * sinP, d = rz * cosP - dy * sinP;         // pitch (looking down)
    if (d < .6) return null;
    return [W / 2 + rx * F / d, H * .46 - ry * F / d, d];
  }
  function quad(a, b, c, d, fill) { if (!a || !b || !c || !d) return; cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0], b[1]); cx.lineTo(c[0], c[1]); cx.lineTo(d[0], d[1]); cx.closePath(); cx.fillStyle = fill; cx.fill(); }
  function shade(hex, k) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = n >> 8 & 255, b = n & 255, f = function (v) { return Math.max(0, Math.min(255, Math.round(k > 1 ? v + (255 - v) * (k - 1) : v * k))); }; return 'rgb(' + f(r) + ',' + f(g) + ',' + f(b) + ')'; }
  /* a box from (x0,y0,z0) to (x1,y1,z1): back face (towards the camera), top, and the side the camera can see */
  function box(x0, y0, z0, x1, y1, z1, col) {
    var a = P(x0, y0, z0), b = P(x1, y0, z0), c = P(x1, y1, z0), d = P(x0, y1, z0), e = P(x0, y1, z1), f = P(x1, y1, z1), g = P(x0, y0, z1), h = P(x1, y0, z1);
    if (cam.x < x0) quad(a, d, e, g, shade(col, .62)); else if (cam.x > x1) quad(b, c, f, h, shade(col, .62));
    quad(d, c, f, e, shade(col, 1.18));
    quad(a, b, c, d, shade(col, .86));
  }
  function balloon(c, rank) {
    var x = c.x, z = c.z + 1.4, y = 3.2 + Math.sin(performance.now() / 700 + x) * .25 + Math.abs(Math.sin(c.bump * Math.PI)) * .9, col = c.color;
    var g0 = P(x, .01, z), top = P(x, y + 2.2, z), bk = P(x, y - .9, z); if (!g0 || !top || !bk) return;
    var r = 1.55 * F / top[2];
    cx.fillStyle = 'rgba(0,0,0,.3)'; cx.beginPath(); cx.ellipse(g0[0], g0[1], r * .8, r * .22, 0, 0, 7); cx.fill();
    cx.strokeStyle = 'rgba(255,255,255,.55)'; cx.lineWidth = Math.max(1, r * .03); cx.beginPath(); cx.moveTo(top[0] - r * .55, top[1] + r * .75); cx.lineTo(bk[0] - r * .22, bk[1]); cx.moveTo(top[0] + r * .55, top[1] + r * .75); cx.lineTo(bk[0] + r * .22, bk[1]); cx.stroke();
    var gr = cx.createRadialGradient(top[0] - r * .35, top[1] - r * .4, r * .1, top[0], top[1], r * 1.1); gr.addColorStop(0, shade(col, 1.6)); gr.addColorStop(.55, col); gr.addColorStop(1, shade(col, .5));
    cx.fillStyle = gr; cx.beginPath(); cx.moveTo(top[0], top[1] + r * 1.25); cx.bezierCurveTo(top[0] - r * 1.5, top[1] + r * .3, top[0] - r * 1.1, top[1] - r * 1.1, top[0], top[1] - r * 1.1); cx.bezierCurveTo(top[0] + r * 1.1, top[1] - r * 1.1, top[0] + r * 1.5, top[1] + r * .3, top[0], top[1] + r * 1.25); cx.fill();
    cx.fillStyle = 'rgba(255,255,255,.22)'; cx.beginPath(); cx.ellipse(top[0], top[1], r * .32, r * 1.05, 0, 0, 7); cx.fill();
    cx.fillStyle = '#8a5a2b'; rr(bk[0] - r * .26, bk[1], r * .52, r * .36, r * .06); cx.fill();
    if (c.bump > 0) { var fr = r * .45 * c.bump; var fg = cx.createRadialGradient(bk[0], bk[1] - fr * .3, 0, bk[0], bk[1] - fr * .3, fr); fg.addColorStop(0, 'rgba(255,230,140,.95)'); fg.addColorStop(1, 'rgba(255,120,40,0)'); cx.fillStyle = fg; cx.beginPath(); cx.arc(bk[0], bk[1] - fr * .3, fr, 0, 7); cx.fill(); }
    tag(c, rank, P(x, y + 4.3, z));
  }
  /* Block Mine: a blocky miner with a pickaxe; the gem block behind them grows with their gems */
  function miner(c, rank) {
    var x = c.x, z = c.z + 1.2, t = performance.now() / 1000, sw = Math.sin(t * 6 + x) * .28, hop = Math.abs(Math.sin(c.bump * Math.PI)) * .7, col = c.color;
    if (!P(x, 0, z)) return;
    quad(P(x - .9, .01, z - .5), P(x + .9, .01, z - .5), P(x + .9, .01, z + .9), P(x - .9, .01, z + .9), 'rgba(0,0,0,.32)');
    box(x - .5, hop, z - .05 + sw, x - .05, hop + .95, z + .4 + sw, '#2d4fb0'); box(x + .05, hop, z - .05 - sw, x + .5, hop + .95, z + .4 - sw, '#2d4fb0');
    box(x - .55, hop + .95, z - .1, x + .55, hop + 2.0, z + .45, col);
    box(x - .88, hop + 1.05, z - .05 - sw, x - .57, hop + 1.95, z + .35 - sw, '#e7b48c'); box(x + .57, hop + 1.05, z - .05 + sw, x + .88, hop + 1.95, z + .35 + sw, '#e7b48c');
    box(x - .45, hop + 2.0, z - .2, x + .45, hop + 2.85, z + .6, '#e7b48c'); box(x - .47, hop + 2.6, z - .22, x + .47, hop + 2.9, z + .62, '#5a3a1c');
    // pickaxe over the shoulder; it swings when the miner has just scored
    var a0 = P(x + .75, hop + 1.6, z + .1), a1 = P(x + 1.25 + c.bump * .5, hop + 3.0 - c.bump * 1.2, z + .1);
    if (a0 && a1) { cx.strokeStyle = '#9a6a3c'; cx.lineWidth = Math.max(2, .13 * F / a0[2]); cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(a0[0], a0[1]); cx.lineTo(a1[0], a1[1]); cx.stroke(); var r = .5 * F / a1[2]; cx.strokeStyle = '#cfd6e4'; cx.lineWidth = Math.max(2, .16 * F / a1[2]); cx.beginPath(); cx.arc(a1[0], a1[1] + r * .5, r, Math.PI * 1.15, Math.PI * 1.85); cx.stroke(); }
    // the gems they carry: a small diamond block that pops when they score
    var g = .45 + Math.min(.5, c.score / 400) + c.bump * .2; box(x - g / 2, 0, z - 1.5 - g, x + g / 2, g, z - 1.5, '#39c6e8');
    tag(c, rank, P(x, hop + 3.9, z + .2));
  }
  function tag(c, rank, tp) {
    if (!tp) return; var col = c.color;
    var k = Math.max(.85, Math.min(2.4, 9 / tp[2] * (H / 420))), fs = Math.round(15 * k), txt = (rank + 1) + '  ' + c.name, pts = c.score + (OPT.unit ? ' ' + OPT.unit : '');
    cx.font = '700 ' + fs + 'px Lato, system-ui, sans-serif'; var tw = cx.measureText(txt).width; cx.font = '800 ' + fs + 'px Lato, system-ui, sans-serif'; var pw = cx.measureText(pts).width;
    var bw = tw + pw + fs * 2.1, bh = fs * 1.7, bx = tp[0] - bw / 2, by = tp[1] - bh;
    cx.fillStyle = 'rgba(8,16,40,.86)'; rr(bx, by, bw, bh, bh / 2); cx.fill(); cx.lineWidth = Math.max(1.5, k * 1.6); cx.strokeStyle = rank === 0 ? '#e8c36a' : col; cx.stroke();
    cx.fillStyle = '#fff'; cx.textBaseline = 'middle'; cx.textAlign = 'left'; cx.font = '700 ' + fs + 'px Lato, system-ui, sans-serif'; cx.fillText(txt, bx + fs * .7, by + bh / 2 + 1);
    cx.fillStyle = rank === 0 ? '#e8c36a' : '#cfe0ff'; cx.font = '800 ' + fs + 'px Lato, system-ui, sans-serif'; cx.textAlign = 'right'; cx.fillText(pts, bx + bw - fs * .7, by + bh / 2 + 1);
  }
  function car(c, rank) {
    if (OPT.kind === 'balloon') return balloon(c, rank);
    if (OPT.kind === 'mine') return miner(c, rank);
    var x = c.x, z = c.z, y = .28 + Math.abs(Math.sin(c.bump * Math.PI)) * .5, col = c.color;
    var s = P(x, 0, z + 1.2); if (!s) return;
    // shadow
    var s0 = P(x - 1.05, .01, z - .3), s1 = P(x + 1.05, .01, z - .3), s2 = P(x + 1.05, .01, z + 3.5), s3 = P(x - 1.05, .01, z + 3.5); quad(s0, s1, s2, s3, 'rgba(0,0,0,.38)');
    // front wheels, body, cabin, spoiler, rear wheels
    box(x - 1.02, 0, z + 2.3, x - .7, .62, z + 3.0, '#14161c'); box(x + .7, 0, z + 2.3, x + 1.02, .62, z + 3.0, '#14161c');
    box(x - .9, y, z, x + .9, y + .52, z + 3.3, col);
    box(x - .62, y + .52, z + .7, x + .62, y + .98, z + 2.3, '#1b2740');
    box(x - .95, y + .86, z - .12, x + .95, y + .96, z + .22, shade(col, .7));
    box(x - 1.06, 0, z + .15, x - .7, .68, z + .95, '#14161c'); box(x + .7, 0, z + .15, x + 1.06, .68, z + .95, '#14161c');
    // tail lights and number plate
    var l0 = P(x - .82, y + .3, z - .01), l1 = P(x - .42, y + .3, z - .01), l2 = P(x - .42, y + .44, z - .01), l3 = P(x - .82, y + .44, z - .01); quad(l0, l1, l2, l3, '#ff5a4a');
    l0 = P(x + .42, y + .3, z - .01); l1 = P(x + .82, y + .3, z - .01); l2 = P(x + .82, y + .44, z - .01); l3 = P(x + .42, y + .44, z - .01); quad(l0, l1, l2, l3, '#ff5a4a');
    // exhaust glow when the car has just scored
    if (c.bump > 0) { var fl = P(x, y + .2, z - .5); if (fl) { var r = Math.max(4, 1.1 * F / fl[2] * c.bump); var gr = cx.createRadialGradient(fl[0], fl[1], 0, fl[0], fl[1], r); gr.addColorStop(0, 'rgba(255,220,120,.95)'); gr.addColorStop(1, 'rgba(255,120,40,0)'); cx.fillStyle = gr; cx.beginPath(); cx.arc(fl[0], fl[1], r, 0, 7); cx.fill(); } }
    tag(c, rank, P(x, y + 1.9, z + 1.4));
  }
  function rr(x, y, w, h, r) { cx.beginPath(); cx.moveTo(x + r, y); cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r); cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r); cx.closePath(); }

  function pickShot(now) {
    var ids = order.slice().sort(function (a, b) { return cars[b].z - cars[a].z; });
    shot.i = (shot.i + 1) % SEQ.length; var k = SEQ[shot.i][0]; shot.until = now + SEQ[shot.i][1]; shot.id = null;
    if (ids.length < 2) k = ids.length ? 'lead' : 'wide';
    if (k === 'lead') { shot.id = ids[0]; cap = '🥇 ' + cars[ids[0]].name + ' is in the lead'; }
    else if (k === 'duel') {
      var best = 1e9, bi = 1; for (var i = 1; i < ids.length; i++) { var g = cars[ids[i - 1]].score - cars[ids[i]].score; if (g < best) { best = g; bi = i; } }
      shot.id = ids[bi]; cap = best === 0 ? '⚔️ ' + cars[ids[bi - 1]].name + ' and ' + cars[ids[bi]].name + ' are level' : '⚔️ ' + cars[ids[bi]].name + ' is ' + best + (OPT.unit ? ' ' + OPT.unit : '') + ' behind ' + cars[ids[bi - 1]].name;
    } else cap = '';
    shot.kind = k;
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!cv || !cv.isConnected) return;
    var dt = Math.min(.05, (now - last) / 1000); last = now;
    if (cv.getBoundingClientRect().width !== W) size();
    var ids = order.filter(function (id) { return cars[id]; }); if (!ids.length) { cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.clearRect(0, 0, W, H); return; }
    // where every car should be: the leader is 0 behind, others by their gap in points (squeezed when the race is very spread out)
    var mx = -1e9, mn = 1e9; ids.forEach(function (id) { mx = Math.max(mx, cars[id].score); mn = Math.min(mn, cars[id].score); });
    var span = Math.max(1, mx - mn), k = Math.min(OPT.per, 64 / span);
    ids.forEach(function (id) { var c = cars[id], tz = (c.score - mn) * k; c.z += (tz - c.z) * Math.min(1, dt * 2.2); c.bump = Math.max(0, c.bump - dt * 1.4); });
    road += dt * (OPT.kind === 'mine' ? 5 : 26);
    var zs = ids.map(function (id) { return cars[id].z; }), zmax = Math.max.apply(null, zs), zmin = Math.min.apply(null, zs), sp = zmax - zmin;
    var ld = ids.slice().sort(function (a, b) { return cars[b].score - cars[a].score; })[0];
    if (leader && ld !== leader && cars[ld].score > cars[leader].score) { shot.kind = 'lead'; shot.id = ld; shot.until = now + 5500; cap = '🚀 ' + cars[ld].name + ' takes the lead!'; }
    leader = ld;
    if (now > shot.until || (shot.id && !cars[shot.id])) pickShot(now);
    var T = { x: 0, y: 8 + sp * .34, z: zmin - 15 - sp * .32, lx: 0, lz: zmin + sp * .45 + 3, f: 1 };
    if (shot.id && cars[shot.id]) { var c = cars[shot.id], side = (Math.floor(now / 11000) % 2 ? 1 : -1); T = { x: c.x * .5 + side * 2.6, y: 3.1, z: c.z - 7.5, lx: c.x, lz: c.z + (shot.kind === 'duel' ? 7 : 4), f: 1.12 }; }
    if (OPT.kind === 'mine' && shot.id && cars[shot.id]) { T.y = 4.2; T.z -= 2; }
    if (OPT.kind === 'balloon') { if (shot.id && cars[shot.id]) { var bc = cars[shot.id]; T = { x: bc.x * .6, y: 6.5, z: bc.z - 15, lx: bc.x, lz: bc.z + 32, f: 1.05 }; } else { T.y += 4; T.z -= 6; T.lz += 10; } }
    var e = Math.min(1, dt * 1.5); ['x', 'y', 'z', 'lx', 'lz', 'f'].forEach(function (q) { cam[q] += (T[q] - cam[q]) * e; });
    aim();
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    // sky
    var hz = P(cam.x, 0, cam.z + 4000), hy = hz ? hz[1] : H * .3;
    var g = cx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#050d26'); g.addColorStop(Math.max(.05, Math.min(.9, hy / H)), '#1b3a7a'); g.addColorStop(Math.max(.06, Math.min(.95, hy / H + .01)), '#0b1a3d'); g.addColorStop(1, '#081229');
    cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    cx.fillStyle = '#fff'; STARS.forEach(function (s) { var y = s[1] * H * 1.0; if (y < hy - 6) { cx.globalAlpha = .35 + .5 * Math.abs(Math.sin(now / 900 + s[0] * 40)); cx.fillRect(s[0] * W, y, s[2], s[2]); } }); cx.globalAlpha = 1;
    var glow = cx.createRadialGradient(W / 2, hy, 0, W / 2, hy, W * .5); glow.addColorStop(0, 'rgba(232,195,106,.30)'); glow.addColorStop(1, 'rgba(232,195,106,0)'); cx.fillStyle = glow; cx.fillRect(0, Math.max(0, hy - H * .3), W, H * .32);
    // road
    var n = ids.length, half = Math.max(6, n * 1.5 + 1.5), z0 = cam.z + 1, z1 = cam.z + 260;
    var air = OPT.kind === 'balloon'; if (air) quad(P(-70, 0, z0), P(70, 0, z0), P(70, 0, z1), P(-70, 0, z1), '#12351f');
    var mine = OPT.kind === 'mine'; if (mine) quad(P(-70, 0, z0), P(70, 0, z0), P(70, 0, z1), P(-70, 0, z1), '#3a2a1c');
    quad(P(-half, 0, z0), P(half, 0, z0), P(half, 0, z1), P(-half, 0, z1), air ? '#184a2a' : mine ? '#3f9a4b' : '#232a3a');
    quad(P(-half - .5, 0, z0), P(-half, 0, z0), P(-half, 0, z1), P(-half - .5, 0, z1), '#e8c36a'); quad(P(half, 0, z0), P(half + .5, 0, z0), P(half + .5, 0, z1), P(half, 0, z1), '#e8c36a');
    var off = road % 8, zb = Math.floor((cam.z) / 8) * 8 - off;
    for (var z = zb + 248; z > zb; z -= 8) {
      if (z < cam.z + 1.5) continue;
      if (mine) { var odd = Math.round((z + off) / 8) % 2; for (var gx = -half; gx < half; gx += 3) { if ((Math.round((gx + half) / 3) + odd) % 2) quad(P(gx, .005, z), P(Math.min(half, gx + 3), .005, z), P(Math.min(half, gx + 3), .005, z + 4), P(gx, .005, z + 4), '#4fb35c'); } }
      for (var li = 1; li < n && !air && !mine; li++) { var lx = -n * 1.5 + li * 3; quad(P(lx - .07, .01, z), P(lx + .07, .01, z), P(lx + .07, .01, z + 3.4), P(lx - .07, .01, z + 3.4), 'rgba(255,255,255,.55)'); }
      // road-side lights
      if (mine) { var oi = Math.round((z + off) / 8); [-1, 1].forEach(function (sd) { var bx = sd * (half + 2.2), oc = ['#8b8f98', '#3b3f48', '#d8a25a', '#e8c36a', '#39c6e8'][Math.abs(oi * 7 + sd * 3) % 5], hh = 1.6 + (Math.abs(oi * 5 + sd) % 3) * 1.1; box(bx - 1.3, 0, z, bx + 1.3, hh, z + 2.6, oc); }); }
      else [-1, 1].forEach(function (sd) { var px = sd * (half + 1.6), a = P(px, 0, z), b = P(px, 3.2, z); if (a && b) { cx.strokeStyle = 'rgba(160,180,220,.5)'; cx.lineWidth = Math.max(1, 60 / a[2]); cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0], b[1]); cx.stroke(); var r = Math.max(1.5, 150 / a[2]); var gl = cx.createRadialGradient(b[0], b[1], 0, b[0], b[1], r * 3); gl.addColorStop(0, 'rgba(255,225,150,.95)'); gl.addColorStop(1, 'rgba(255,225,150,0)'); cx.fillStyle = gl; cx.beginPath(); cx.arc(b[0], b[1], r * 3, 0, 7); cx.fill(); } });
    }
    // cars, far ones first
    var rankOf = {}; ids.slice().sort(function (a, b) { return cars[b].score - cars[a].score; }).forEach(function (id, i) { rankOf[id] = i; });
    ids.slice().sort(function (a, b) { return cars[b].z - cars[a].z; }).forEach(function (id) { if (cars[id].z > cam.z + 1) car(cars[id], rankOf[id]); });
    // caption
    if (cap) { cx.font = '700 ' + Math.round(Math.max(16, H * .042)) + 'px Lato, system-ui, sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; var tw = cx.measureText(cap).width, bh = Math.max(34, H * .075); cx.fillStyle = 'rgba(8,16,40,.8)'; rr(W / 2 - tw / 2 - 22, H - bh - 14, tw + 44, bh, bh / 2); cx.fill(); cx.strokeStyle = '#e8c36a'; cx.lineWidth = 2; cx.stroke(); cx.fillStyle = '#fff'; cx.fillText(cap, W / 2, H - bh / 2 - 13); }
  }

  window.LIVE = window.LIVE || {};
  LIVE.Race3D = {
    show: function (slot, list, opt) {
      OPT = { kind: (opt && opt.kind) || 'car', per: (opt && opt.per) || .11, unit: (opt && opt.unit) || '' };
      if (!cv) { cv = document.createElement('canvas'); cv.className = 'race3d'; cx = cv.getContext('2d'); addEventListener('resize', size); }
      if (cv.parentNode !== slot) { slot.appendChild(cv); size(); }
      var seen = {}, n = list.length;
      // lanes are given once, in the order students first appear, so a car never jumps sideways
      list.forEach(function (p) { seen[p.id] = 1; var c = cars[p.id]; if (!c) { c = cars[p.id] = { z: 0, x: 0, score: p.score, bump: 0 }; order.push(p.id); } if (p.score > c.score) c.bump = 1; c.score = p.score; c.name = p.name; c.color = p.color; });
      order = order.filter(function (id) { if (seen[id]) return true; delete cars[id]; return false; });
      order.forEach(function (id, i) { var tx = -order.length * 1.5 + 1.5 + i * 3; cars[id].x = tx; });
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    },
    stop: function () { if (raf) cancelAnimationFrame(raf); raf = 0; if (cv && cv.parentNode) cv.parentNode.removeChild(cv); cars = {}; order = []; leader = null; shot.until = 0; cap = ''; }
  };
})();
