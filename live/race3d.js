/* IF Live — Race mode on the big screen: a 3D race drawn on a canvas (no library).
   Every student is a car; the distance between cars is the difference in points. The camera moves by itself:
   a wide shot of the whole race, then a close-up of the leader, wide again, then the closest battle.
   LIVE.Race3D.show(slot, [{id, name, score, color}])  — call after every re-draw of the stage (the canvas is kept and moved)
   LIVE.Race3D.stop() */
(function () {
  var cv = null, cx = null, raf = 0, W = 0, H = 0, DPR = 1;
  var cars = {}, order = [];              // id → {name, score, z, x, color, bump}
  var cam = { x: 0, y: 12, z: -14, lx: 0, lz: 20, f: 1 }, shot = { kind: 'wide', id: null, until: 0, i: 0 }, leader = null, cap = '';
  var said = '', t0 = performance.now(), last = t0, road = 0, OPT = { kind: 'car', per: .11, unit: '', gem: '#39c6e8' };
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
    var g = .45 + Math.min(.5, c.score / 400) + c.bump * .2; box(x - g / 2, 0, z - 1.5 - g, x + g / 2, g, z - 1.5, OPT.gem);
    tag(c, rank, P(x, hop + 3.9, z + .2));
  }
  function tag(c, rank, tp) {
    if (!tp) return; var col = c.color;
    var k = Math.max(.85, Math.min(2.4, 9 / tp[2] * (H / 420))), fs = Math.round(15 * k), txt = (rank + 1) + '  ' + c.name, pts = (LIVE.fmtN ? LIVE.fmtN(c.score) : c.score) + (OPT.unit ? ' ' + OPT.unit : '');
    cx.font = '700 ' + fs + 'px Lato, system-ui, sans-serif'; var tw = cx.measureText(txt).width; cx.font = '800 ' + fs + 'px Lato, system-ui, sans-serif'; var pw = cx.measureText(pts).width;
    var bw = tw + pw + fs * 2.1, bh = fs * 1.7, bx = tp[0] - bw / 2, by = tp[1] - bh;
    cx.fillStyle = 'rgba(8,16,40,.86)'; rr(bx, by, bw, bh, bh / 2); cx.fill(); cx.lineWidth = Math.max(1.5, k * 1.6); cx.strokeStyle = rank === 0 ? '#e8c36a' : col; cx.stroke();
    cx.fillStyle = '#fff'; cx.textBaseline = 'middle'; cx.textAlign = 'left'; cx.font = '700 ' + fs + 'px Lato, system-ui, sans-serif'; cx.fillText(txt, bx + fs * .7, by + bh / 2 + 1);
    cx.fillStyle = rank === 0 ? '#e8c36a' : '#cfe0ff'; cx.font = '800 ' + fs + 'px Lato, system-ui, sans-serif'; cx.textAlign = 'right'; cx.fillText(pts, bx + bw - fs * .7, by + bh / 2 + 1);
  }

  /* ---------- Treasure Hunt: an adventure at sunset. A stone causeway runs out across the sea towards the mountains
     and a castle on the peak; torches burn along the way, a sailing ship waits offshore. Every student is a
     treasure hunter (seen from behind) with a lit torch and a treasure chest on their back that grows with their gold. */
  var RND = (function () { var a = 7; return function () { a = (a * 16807) % 2147483647; return (a - 1) / 2147483646; }; })();
  var RIDGES = [0, 1, 2].map(function (l) { var pts = []; for (var i = 0; i <= 40; i++) pts.push(RND()); return pts; });
  var CLOUDS = []; for (var ci = 0; ci < 7; ci++) CLOUDS.push([RND(), .08 + RND() * .22, .5 + RND() * .9, RND()]);
  var SPARKS = [];
  function treSky(now, hy) {
    var g = cx.createLinearGradient(0, 0, 0, hy);
    g.addColorStop(0, '#120a26'); g.addColorStop(.35, '#3b1b45'); g.addColorStop(.7, '#9a3b3f'); g.addColorStop(.9, '#e8873d'); g.addColorStop(1, '#ffd58a');
    cx.fillStyle = g; cx.fillRect(0, 0, W, hy + 1);
    cx.fillStyle = '#fff'; STARS.forEach(function (st) { var y = st[1] * hy * .55; cx.globalAlpha = (.25 + .45 * Math.abs(Math.sin(now / 900 + st[0] * 40))) * (1 - y / (hy * .55)); cx.fillRect(st[0] * W, y, st[2] * .8, st[2] * .8); }); cx.globalAlpha = 1;
    // the setting sun and its glow
    var sx = W * .7 - cam.x * 2, sy = hy - Math.min(hy * .45, H * .16), sr = Math.max(26, H * .075);
    var gl = cx.createRadialGradient(sx, sy, 0, sx, sy, W * .55); gl.addColorStop(0, 'rgba(255,214,140,.75)'); gl.addColorStop(.25, 'rgba(255,150,80,.28)'); gl.addColorStop(1, 'rgba(255,120,60,0)');
    cx.fillStyle = gl; cx.fillRect(0, 0, W, hy + 2);
    var sg = cx.createRadialGradient(sx, sy - sr * .2, sr * .1, sx, sy, sr); sg.addColorStop(0, '#fff6d8'); sg.addColorStop(.6, '#ffd27a'); sg.addColorStop(1, '#ff9d4a');
    cx.fillStyle = sg; cx.beginPath(); cx.arc(sx, sy, sr, 0, 7); cx.fill();
    // slow clouds lit from below
    CLOUDS.forEach(function (c) {
      var x = ((c[0] + now / 240000 * (1 + c[3])) % 1.3 - .15) * W - cam.x * 4, y = c[1] * hy, w = c[2] * W * .22, h = w * .18;
      var cg = cx.createLinearGradient(0, y - h, 0, y + h); cg.addColorStop(0, 'rgba(120,70,110,.55)'); cg.addColorStop(1, 'rgba(255,160,110,.55)');
      cx.fillStyle = cg; cx.beginPath(); cx.ellipse(x, y, w, h, 0, 0, 7); cx.ellipse(x - w * .45, y + h * .25, w * .55, h * .8, 0, 0, 7); cx.ellipse(x + w * .5, y + h * .3, w * .5, h * .75, 0, 0, 7); cx.fill();
    });
    // three ranges of mountains, the far ones misty; a castle stands on the highest peak of the back range
    var cols = ['#5a2f52', '#3a1f3e', '#24142c'], amp = [.22, .17, .12], shift = [6, 10, 16];
    RIDGES.forEach(function (R, l) {
      var base = hy + 1, top = Math.min(H * amp[l], hy * (.62 - l * .1)), off = -cam.x * shift[l] - W * .1;
      cx.fillStyle = cols[l]; cx.beginPath(); cx.moveTo(off, base);
      var step = (W * 1.2) / (R.length - 1), peak = { y: 1e9, x: 0 };
      R.forEach(function (v, i) { var px = off + i * step, py = base - top * (.25 + .75 * v) * (i % 2 ? .78 : 1); cx.lineTo(px, py); if (l === 0 && py < peak.y && px > W * .15 && px < W * .6) peak = { x: px, y: py }; });
      cx.lineTo(off + W * 1.2, base); cx.closePath(); cx.fill();
      if (l === 0 && peak.y < 1e9) castle(peak.x, peak.y, H * .055);
      cx.fillStyle = 'rgba(255,170,120,' + (.12 - l * .04) + ')'; cx.fillRect(0, base - top * .18, W, top * .18);
    });
  }
  function castle(x, y, s) {
    cx.fillStyle = '#1a0f22';
    [[-1.6, 1.1, .55], [-.7, 1.7, .6], [.2, 2.3, .7], [1.1, 1.5, .55]].forEach(function (t) {
      var tx = x + t[0] * s, w = t[2] * s, h = t[1] * s;
      cx.fillRect(tx - w / 2, y - h, w, h + s * .4);
      cx.beginPath(); cx.moveTo(tx - w * .62, y - h); cx.lineTo(tx, y - h - w * 1.3); cx.lineTo(tx + w * .62, y - h); cx.closePath(); cx.fill();
      cx.fillStyle = 'rgba(255,200,110,.9)'; cx.fillRect(tx - w * .1, y - h * .62, w * .2, w * .28); cx.fillStyle = '#1a0f22';
    });
    cx.fillRect(x - 1.9 * s, y - .6 * s, 3.4 * s, .9 * s);
    cx.strokeStyle = '#1a0f22'; cx.lineWidth = Math.max(1, s * .06); cx.beginPath(); cx.moveTo(x + .2 * s, y - 3.2 * s); cx.lineTo(x + .2 * s, y - 3.9 * s); cx.stroke();
    cx.fillStyle = '#c9363c'; cx.beginPath(); cx.moveTo(x + .2 * s, y - 3.9 * s); cx.lineTo(x + .75 * s, y - 3.75 * s); cx.lineTo(x + .2 * s, y - 3.6 * s); cx.fill();
  }
  function ship(x, y, s, now) {
    var rock = Math.sin(now / 900) * .04; cx.save(); cx.translate(x, y); cx.rotate(rock); cx.scale(s, s);
    cx.fillStyle = '#20141a'; cx.beginPath(); cx.moveTo(-60, -8); cx.lineTo(62, -8); cx.lineTo(48, 10); cx.lineTo(-48, 10); cx.closePath(); cx.fill();
    cx.fillRect(-58, -16, 22, 9); cx.fillRect(40, -14, 18, 7);
    [[-25, 70], [5, 86], [33, 62]].forEach(function (m) {
      cx.fillStyle = '#20141a'; cx.fillRect(m[0] - 1.5, -8 - m[1], 3, m[1]);
      cx.fillStyle = 'rgba(244,226,196,.92)';
      cx.beginPath(); cx.moveTo(m[0] - 17, -8 - m[1] * .88); cx.quadraticCurveTo(m[0] + 4, -8 - m[1] * .7, m[0] - 15, -8 - m[1] * .5); cx.lineTo(m[0] + 17, -8 - m[1] * .5); cx.quadraticCurveTo(m[0] + 25, -8 - m[1] * .7, m[0] + 15, -8 - m[1] * .88); cx.closePath(); cx.fill();
      cx.beginPath(); cx.moveTo(m[0] - 19, -8 - m[1] * .44); cx.quadraticCurveTo(m[0] + 4, -8 - m[1] * .24, m[0] - 17, -12); cx.lineTo(m[0] + 19, -12); cx.quadraticCurveTo(m[0] + 28, -8 - m[1] * .24, m[0] + 17, -8 - m[1] * .44); cx.closePath(); cx.fill();
      cx.fillStyle = '#c9363c'; cx.beginPath(); cx.moveTo(m[0], -8 - m[1]); cx.lineTo(m[0] + 12, -8 - m[1] + 4 + Math.sin(now / 300) * 2); cx.lineTo(m[0], -8 - m[1] + 8); cx.fill();
    });
    cx.fillStyle = 'rgba(255,200,110,.95)'; for (var i = -40; i < 40; i += 14) cx.fillRect(i, -3, 4, 3);
    cx.restore();
  }
  function treSea(now, hy, z0, z1) {
    // the sea from the horizon to the front, with the sun's path of light on it
    var g = cx.createLinearGradient(0, hy, 0, H); g.addColorStop(0, '#8a4a52'); g.addColorStop(.08, '#3b3550'); g.addColorStop(.35, '#16304a'); g.addColorStop(1, '#081a2a');
    cx.fillStyle = g; cx.fillRect(0, hy, W, H - hy);
    var sx = W * .7 - cam.x * 2;
    for (var i = 0; i < 46; i++) {
      var t = i / 46, y = hy + (H - hy) * t * t + 2, w = (14 + t * W * .22) * (.6 + .4 * Math.abs(Math.sin(now / 500 + i * 1.7)));
      cx.fillStyle = 'rgba(255,' + Math.round(200 - t * 60) + ',' + Math.round(120 - t * 40) + ',' + (.55 - t * .4) + ')';
      cx.fillRect(sx - w / 2 + Math.sin(now / 700 + i) * 8 * t, y, w, Math.max(1, 1 + t * 3));
    }
    ship(W * .86 - cam.x * 3, hy + H * .012, Math.max(.35, H / 1100), now);
    // waves rolling in on both sides of the causeway
    var off = (now / 1000 * 3) % 6;
    for (var z = Math.floor(z1 / 6) * 6 - off; z > z0; z -= 6) {
      [-1, 1].forEach(function (sd) {
        for (var k = 0; k < 4; k++) {
          var x0 = sd * (12 + k * 14 + (Math.abs(Math.floor(z / 6) * 7 + k * 3) % 5)), a = P(x0, 0, z), b = P(x0 + sd * 6, 0, z + .6);
          if (!a || !b) continue; cx.strokeStyle = 'rgba(190,225,255,' + Math.max(.05, .28 - a[2] / 400) + ')'; cx.lineWidth = Math.max(1, 26 / a[2]); cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0], b[1]); cx.stroke();
        }
      });
    }
  }
  function treRoad(now, half, z0, z1) {
    // shore: wet sand, then the stone causeway with its worn flagstones
    quad(P(-half - 5, 0, z0), P(half + 5, 0, z0), P(half + 5, 0, z1), P(-half - 5, 0, z1), '#8a6a44');
    quad(P(-half - 2.6, .005, z0), P(half + 2.6, .005, z0), P(half + 2.6, .005, z1), P(-half - 2.6, .005, z1), '#c79a5e');
    quad(P(-half, .01, z0), P(half, .01, z0), P(half, .01, z1), P(-half, .01, z1), '#9b8a72');
    var off = road % 4, zb = Math.floor(cam.z / 4) * 4 - off;
    for (var z = zb + 200; z > zb; z -= 4) {
      if (z < cam.z + 1.5) continue;
      var row = Math.round((z + off) / 4);
      quad(P(-half, .012, z), P(half, .012, z), P(half, .012, z + 4.02), P(-half, .012, z + 4.02), '#5e5244');
      for (var gx = -half + (row % 2 ? 1.5 : 0); gx < half; gx += 3) {
        var tone = ['#a89478', '#8f7d64', '#b3a084', '#978569'][Math.abs(row * 3 + Math.round(gx)) % 4];
        quad(P(Math.max(-half, gx) + .08, .015, z + .08), P(Math.min(half, gx + 3) - .08, .015, z + .08), P(Math.min(half, gx + 3) - .08, .015, z + 3.92), P(Math.max(-half, gx) + .08, .015, z + 3.92), tone);
      }
    }
    // props along the way, far ones first: torches on posts, palms, rocks and the odd open chest of gold
    var po = road % 12, pz = Math.floor(cam.z / 12) * 12 - po;
    for (var zz = pz + 192; zz > pz; zz -= 12) {
      if (zz < cam.z + 2) continue;
      var idx = Math.round((zz + po) / 12);
      [-1, 1].forEach(function (sd) {
        var bx = sd * (half + 1.3), kind = Math.abs(idx * 5 + sd * 3) % 4;
        torch(bx, zz, now + idx * 137);
        if (kind === 1) palm(sd * (half + 6 + (idx % 3)), zz + 4, sd);
        else if (kind === 2) rock(sd * (half + 4.5), zz + 6, 1 + (idx % 3) * .4);
        else if (kind === 3 && idx % 2) openChest(sd * (half + 3.4), zz + 5, now);
      });
    }
  }
  function torch(x, z, now) {
    var a = P(x, 0, z), b = P(x, 3.4, z); if (!a || !b) return;
    cx.strokeStyle = '#3b2616'; cx.lineWidth = Math.max(1.5, .26 * F / a[2]); cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0], b[1]); cx.stroke();
    var r = Math.max(3, 1.0 * F / b[2]), fl = 1 + Math.sin(now / 90) * .12 + Math.sin(now / 37) * .06;
    var gl = cx.createRadialGradient(b[0], b[1], 0, b[0], b[1], r * 3.2); gl.addColorStop(0, 'rgba(255,190,90,.55)'); gl.addColorStop(1, 'rgba(255,120,40,0)'); cx.fillStyle = gl; cx.beginPath(); cx.arc(b[0], b[1], r * 3.2, 0, 7); cx.fill();
    flame(b[0], b[1], r * .7 * fl);
  }
  function flame(x, y, r) {
    var g = cx.createRadialGradient(x, y - r * .3, 0, x, y, r * 1.4); g.addColorStop(0, '#fff6c8'); g.addColorStop(.35, '#ffc24a'); g.addColorStop(.75, '#ff6a1f'); g.addColorStop(1, 'rgba(200,40,20,0)');
    cx.fillStyle = g; cx.beginPath(); cx.moveTo(x - r * .7, y); cx.quadraticCurveTo(x - r * .8, y - r * 1.1, x, y - r * 2.1); cx.quadraticCurveTo(x + r * .8, y - r * 1.1, x + r * .7, y); cx.quadraticCurveTo(x, y + r * .7, x - r * .7, y); cx.fill();
  }
  function palm(x, z, sd) {
    var a = P(x, 0, z), b = P(x - sd * 1.2, 7.5, z); if (!a || !b) return; var k = F / a[2];
    cx.strokeStyle = '#4a3220'; cx.lineWidth = Math.max(2, .55 * k); cx.beginPath(); cx.moveTo(a[0], a[1]); cx.quadraticCurveTo(a[0] + sd * .9 * k, (a[1] + b[1]) / 2, b[0], b[1]); cx.stroke();
    cx.fillStyle = '#16301f';
    for (var i = 0; i < 7; i++) { var an = -Math.PI / 2 + (i - 3) * .55, l = 3.2 * k; cx.beginPath(); cx.moveTo(b[0], b[1]); cx.quadraticCurveTo(b[0] + Math.cos(an) * l * .6, b[1] + Math.sin(an) * l * .6 - l * .25, b[0] + Math.cos(an) * l, b[1] + Math.sin(an) * l * .3 + l * .35); cx.quadraticCurveTo(b[0] + Math.cos(an) * l * .5, b[1] + Math.sin(an) * l * .5 - l * .05, b[0], b[1]); cx.fill(); }
  }
  function rock(x, z, s) { var a = P(x, 0, z); if (!a) return; var k = F / a[2] * s; var g = cx.createLinearGradient(a[0], a[1] - k * 1.6, a[0], a[1]); g.addColorStop(0, '#6a6070'); g.addColorStop(1, '#2c2632'); cx.fillStyle = g; cx.beginPath(); cx.moveTo(a[0] - k * 1.4, a[1]); cx.lineTo(a[0] - k * 1.0, a[1] - k * 1.1); cx.lineTo(a[0] - k * .2, a[1] - k * 1.6); cx.lineTo(a[0] + k * .9, a[1] - k * 1.0); cx.lineTo(a[0] + k * 1.4, a[1]); cx.closePath(); cx.fill(); }
  function openChest(x, z, now) {
    var a = P(x, 0, z); if (!a) return; var k = F / a[2];
    var gl = cx.createRadialGradient(a[0], a[1] - k * .9, 0, a[0], a[1] - k * .9, k * 2.4); gl.addColorStop(0, 'rgba(255,215,110,.6)'); gl.addColorStop(1, 'rgba(255,200,80,0)'); cx.fillStyle = gl; cx.beginPath(); cx.arc(a[0], a[1] - k * .9, k * 2.4, 0, 7); cx.fill();
    chestShape(a[0], a[1], k * 1.3, true, now);
  }
  /* a wooden chest with iron-gold bands; open → a heap of glinting coins */
  function chestShape(x, by, w, open, now) {
    var h = w * .62, top = by - h;
    var wg = cx.createLinearGradient(x, top, x, by); wg.addColorStop(0, '#8a5228'); wg.addColorStop(1, '#4a2810'); cx.fillStyle = wg; rr(x - w / 2, top, w, h, w * .06); cx.fill();
    cx.fillStyle = '#d9a640'; cx.fillRect(x - w / 2, top + h * .32, w, h * .1); cx.fillRect(x - w * .38, top, w * .08, h); cx.fillRect(x + w * .3, top, w * .08, h);
    cx.fillStyle = '#f4d27a'; rr(x - w * .07, top + h * .26, w * .14, h * .26, w * .02); cx.fill();
    if (open) {
      var cg = cx.createRadialGradient(x, top, 0, x, top, w * .55); cg.addColorStop(0, '#fff3b0'); cg.addColorStop(.5, '#f2c24a'); cg.addColorStop(1, '#b07a1c');
      cx.fillStyle = cg; cx.beginPath(); cx.ellipse(x, top + h * .02, w * .5, h * .38, 0, Math.PI, 0); cx.fill();
      cx.fillStyle = '#5a3216'; cx.beginPath(); cx.moveTo(x - w / 2, top); cx.lineTo(x - w * .46, top - h * .9); cx.lineTo(x + w * .46, top - h * .9); cx.lineTo(x + w / 2, top); cx.lineTo(x + w * .44, top - h * .05); cx.lineTo(x - w * .44, top - h * .05); cx.closePath(); cx.fill();
      for (var i = 0; i < 3; i++) { var t = (now / 700 + i * .33) % 1, sx = x + Math.sin(i * 2.1 + now / 400) * w * .3, sy = top - h * .1 - t * h * 1.2; cx.globalAlpha = 1 - t; star4(sx, sy, w * .08 * (1 - t * .5)); } cx.globalAlpha = 1;
    } else {
      var lg = cx.createLinearGradient(x, top - h * .5, x, top); lg.addColorStop(0, '#a0622e'); lg.addColorStop(1, '#6a3a18'); cx.fillStyle = lg;
      cx.beginPath(); cx.moveTo(x - w / 2, top); cx.quadraticCurveTo(x, top - h * .95, x + w / 2, top); cx.closePath(); cx.fill();
      cx.strokeStyle = '#d9a640'; cx.lineWidth = Math.max(1, w * .06); cx.beginPath(); cx.moveTo(x - w * .34, top - h * .05); cx.quadraticCurveTo(x - w * .3, top - h * .62, x - w * .34, top - h * .6); cx.moveTo(x + w * .34, top - h * .05); cx.quadraticCurveTo(x + w * .3, top - h * .62, x + w * .34, top - h * .6); cx.stroke();
    }
  }
  function star4(x, y, r) { cx.fillStyle = '#fff8d0'; cx.beginPath(); cx.moveTo(x, y - r * 2); cx.quadraticCurveTo(x, y, x + r * 2, y); cx.quadraticCurveTo(x, y, x, y + r * 2); cx.quadraticCurveTo(x, y, x - r * 2, y); cx.quadraticCurveTo(x, y, x, y - r * 2); cx.fill(); }
  /* the treasure hunter, seen from behind: boots, breeches, a long coat in the player's colour, a cape, a tricorn hat
     with a feather, a torch held high and a chest on the back that grows with their gold */
  function hunter(c, rank) {
    var x = c.x, z = c.z + 1.2, s = P(x, 0, z); if (!s) return;
    var now = performance.now(), t = now / 1000, k = F / s[2], u = k * 1.35, bx = s[0], by = s[1], col = c.color;
    var wk = Math.sin(t * 6.5 + x * 1.3), hop = Math.abs(Math.sin(c.bump * Math.PI)) * .55 * u, bob = Math.abs(wk) * .06 * u;
    var y0 = by - hop - bob;
    cx.fillStyle = 'rgba(0,0,0,.38)'; cx.beginPath(); cx.ellipse(bx, by, u * .95, u * .26, 0, 0, 7); cx.fill();
    if (rank === 0) { var ag = cx.createRadialGradient(bx, by, 0, bx, by, u * 1.6); ag.addColorStop(0, 'rgba(255,214,110,.45)'); ag.addColorStop(1, 'rgba(255,214,110,0)'); cx.fillStyle = ag; cx.beginPath(); cx.ellipse(bx, by, u * 1.6, u * .5, 0, 0, 7); cx.fill(); }
    // boots and breeches (walking)
    cx.fillStyle = '#2b1c12'; rr(bx - u * .42, y0 - u * .62 + wk * u * .07, u * .34, u * .62, u * .08); cx.fill(); rr(bx + u * .08, y0 - u * .62 - wk * u * .07, u * .34, u * .62, u * .08); cx.fill();
    cx.fillStyle = '#3c3548'; rr(bx - u * .4, y0 - u * 1.45, u * .8, u * .9, u * .1); cx.fill();
    // cape behind the coat, swaying
    var sway = Math.sin(t * 2.2 + x) * u * .12;
    var cg = cx.createLinearGradient(bx, y0 - u * 2.9, bx, y0 - u * .7); cg.addColorStop(0, shade(col, .55)); cg.addColorStop(1, shade(col, .32));
    cx.fillStyle = cg; cx.beginPath(); cx.moveTo(bx - u * .62, y0 - u * 2.85); cx.quadraticCurveTo(bx - u * .95 + sway, y0 - u * 1.6, bx - u * .75 + sway * 1.4, y0 - u * .72); cx.quadraticCurveTo(bx + sway, y0 - u * .55, bx + u * .75 + sway * 1.4, y0 - u * .72); cx.quadraticCurveTo(bx + u * .95 + sway, y0 - u * 1.6, bx + u * .62, y0 - u * 2.85); cx.closePath(); cx.fill();
    // coat
    var og = cx.createLinearGradient(bx - u * .7, 0, bx + u * .7, 0); og.addColorStop(0, shade(col, .62)); og.addColorStop(.5, col); og.addColorStop(1, shade(col, .7));
    cx.fillStyle = og; cx.beginPath(); cx.moveTo(bx - u * .58, y0 - u * 2.8); cx.lineTo(bx + u * .58, y0 - u * 2.8); cx.lineTo(bx + u * .7, y0 - u * 1.05); cx.lineTo(bx + u * .05, y0 - u * 1.12); cx.lineTo(bx, y0 - u * 1.4); cx.lineTo(bx - u * .05, y0 - u * 1.12); cx.lineTo(bx - u * .7, y0 - u * 1.05); cx.closePath(); cx.fill();
    cx.fillStyle = '#d9a640'; cx.fillRect(bx - u * .66, y0 - u * 1.16, u * .6, u * .05); cx.fillRect(bx + u * .06, y0 - u * 1.16, u * .6, u * .05);
    cx.fillStyle = '#3a2414'; cx.fillRect(bx - u * .6, y0 - u * 1.75, u * 1.2, u * .14);
    // the chest on the back: bigger with more gold
    var cw = u * (.85 + Math.min(.55, c.score / 2500));
    chestShape(bx, y0 - u * 1.62, cw, false, now);
    cx.strokeStyle = '#2a1a10'; cx.lineWidth = Math.max(1, u * .07); cx.beginPath(); cx.moveTo(bx - u * .4, y0 - u * 2.78); cx.lineTo(bx - cw * .3, y0 - u * 1.62 - cw * .55); cx.moveTo(bx + u * .4, y0 - u * 2.78); cx.lineTo(bx + cw * .3, y0 - u * 1.62 - cw * .55); cx.stroke();
    // arms: one swinging, one holding the torch high
    cx.lineCap = 'round'; cx.strokeStyle = shade(col, .8); cx.lineWidth = u * .26;
    cx.beginPath(); cx.moveTo(bx + u * .55, y0 - u * 2.6); cx.lineTo(bx + u * .78 + wk * u * .08, y0 - u * 1.75); cx.stroke();
    cx.beginPath(); cx.moveTo(bx - u * .55, y0 - u * 2.6); cx.lineTo(bx - u * .98, y0 - u * 3.05); cx.stroke();
    cx.fillStyle = '#e2b48a'; cx.beginPath(); cx.arc(bx + u * .8 + wk * u * .08, y0 - u * 1.7, u * .12, 0, 7); cx.arc(bx - u * 1.0, y0 - u * 3.1, u * .12, 0, 7); cx.fill();
    cx.strokeStyle = '#4a2f1a'; cx.lineWidth = u * .11; cx.beginPath(); cx.moveTo(bx - u * 1.02, y0 - u * 2.85); cx.lineTo(bx - u * 1.06, y0 - u * 3.75); cx.stroke();
    var tg = cx.createRadialGradient(bx - u * 1.06, y0 - u * 3.85, 0, bx - u * 1.06, y0 - u * 3.85, u * 1.9); tg.addColorStop(0, 'rgba(255,190,90,.5)'); tg.addColorStop(1, 'rgba(255,140,40,0)'); cx.fillStyle = tg; cx.beginPath(); cx.arc(bx - u * 1.06, y0 - u * 3.85, u * 1.9, 0, 7); cx.fill();
    flame(bx - u * 1.06, y0 - u * 3.75, u * (.32 + Math.sin(now / 80 + x) * .04));
    // head (from behind: hair and collar) and the tricorn hat with a feather
    cx.fillStyle = '#e2b48a'; cx.fillRect(bx - u * .13, y0 - u * 3.0, u * .26, u * .22);
    var hg = cx.createRadialGradient(bx - u * .1, y0 - u * 3.3, u * .05, bx, y0 - u * 3.22, u * .36); hg.addColorStop(0, '#6a4528'); hg.addColorStop(1, '#2e1c10'); cx.fillStyle = hg; cx.beginPath(); cx.arc(bx, y0 - u * 3.22, u * .34, 0, 7); cx.fill(); cx.fillStyle = '#2e1c10';
    cx.beginPath(); cx.moveTo(bx - u * .18, y0 - u * 3.0); cx.quadraticCurveTo(bx - u * .1, y0 - u * 2.62, bx + u * .02, y0 - u * 2.7); cx.lineTo(bx + u * .1, y0 - u * 3.0); cx.fill();
    var hy0 = y0 - u * 3.42;
    cx.fillStyle = '#1e1410'; cx.beginPath(); cx.moveTo(bx - u * .78, hy0 + u * .05); cx.quadraticCurveTo(bx, hy0 - u * .22, bx + u * .78, hy0 + u * .05); cx.quadraticCurveTo(bx + u * .52, hy0 - u * .35, bx, hy0 - u * .62); cx.quadraticCurveTo(bx - u * .52, hy0 - u * .35, bx - u * .78, hy0 + u * .05); cx.fill();
    cx.strokeStyle = '#d9a640'; cx.lineWidth = Math.max(1, u * .045); cx.beginPath(); cx.moveTo(bx - u * .76, hy0 + u * .04); cx.quadraticCurveTo(bx, hy0 - u * .22, bx + u * .76, hy0 + u * .04); cx.stroke();
    cx.strokeStyle = shade(col, 1.35); cx.lineWidth = u * .1; cx.beginPath(); cx.moveTo(bx + u * .25, hy0 - u * .3); cx.quadraticCurveTo(bx + u * .75, hy0 - u * .95, bx + u * .55 + Math.sin(t * 3) * u * .06, hy0 - u * 1.2); cx.stroke();
    if (rank === 0) { cx.fillStyle = '#ffd24a'; cx.beginPath(); var cy0 = hy0 - u * .78; cx.moveTo(bx - u * .3, cy0 + u * .2); cx.lineTo(bx - u * .3, cy0 - u * .05); cx.lineTo(bx - u * .15, cy0 + u * .07); cx.lineTo(bx, cy0 - u * .15); cx.lineTo(bx + u * .15, cy0 + u * .07); cx.lineTo(bx + u * .3, cy0 - u * .05); cx.lineTo(bx + u * .3, cy0 + u * .2); cx.closePath(); cx.fill(); }
    // a burst of coins when they score
    if (c.bump > .9 && !c.burst) { c.burst = 1; for (var i = 0; i < 14; i++) SPARKS.push({ x: x, y: 3.2, z: z, vx: (Math.random() - .5) * 3, vy: 3 + Math.random() * 3, vz: (Math.random() - .5) * 2, life: 1 }); }
    if (c.bump < .5) c.burst = 0;
    tag(c, rank, P(x, 5.7 + hop / k, z));
  }
  function sparks(dt) {
    SPARKS = SPARKS.filter(function (p) { p.life -= dt * .9; return p.life > 0; });
    SPARKS.forEach(function (p) { p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.vy -= 6 * dt; var q = P(p.x, Math.max(0, p.y), p.z); if (!q) return; var r = Math.max(2, .22 * F / q[2]); cx.globalAlpha = Math.min(1, p.life * 1.4);
      var g = cx.createRadialGradient(q[0] - r * .3, q[1] - r * .3, 0, q[0], q[1], r); g.addColorStop(0, '#fff6c0'); g.addColorStop(.6, '#f2c24a'); g.addColorStop(1, '#a8741a'); cx.fillStyle = g; cx.beginPath(); cx.ellipse(q[0], q[1], r * Math.abs(Math.cos(p.life * 9)) + 1, r, 0, 0, 7); cx.fill(); });
    cx.globalAlpha = 1;
  }

  /* ---------- Bank Heist (Cash Climb): a night raid on the IF National Bank. A marble hall leads to the great round
     vault door; red security lasers cross the floor, alarm lights sweep the hall, gold bars and stacks of banknotes
     line the walls. Every student is a masked robber in a jumpsuit of their colour, a money bag on their back that
     grows with their cash and a duffel bag in hand. No weapons: this is a game for students. */
  function heistBack(now, hy) {
    var g = cx.createLinearGradient(0, 0, 0, hy); g.addColorStop(0, '#06070b'); g.addColorStop(1, '#1a1d26');
    cx.fillStyle = g; cx.fillRect(0, 0, W, hy + 1); cx.fillStyle = '#14161c'; cx.fillRect(0, hy, W, H - hy);
    // back wall panels
    var vx = W / 2 - cam.x * 3, vy = hy - Math.min(hy * .42, H * .2), vr = Math.min(hy * .4, H * .2);
    cx.fillStyle = '#20242e'; cx.fillRect(0, vy - vr * 1.7, W, hy - (vy - vr * 1.7) + 1);
    cx.strokeStyle = 'rgba(255,255,255,.05)'; cx.lineWidth = 1; for (var px = (vx % 90) - 90; px < W; px += 90) { cx.beginPath(); cx.moveTo(px, vy - vr * 1.7); cx.lineTo(px, hy); cx.stroke(); }
    // the sign above the vault
    cx.font = '800 ' + Math.max(14, Math.round(vr * .3)) + 'px "Cinzel", Georgia, serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillStyle = '#d9b45a'; cx.fillText('IF NATIONAL BANK', vx, Math.max(vr * .22, vy - vr * 1.32));
    // vault door: steel ring, bolts, a slowly turning wheel, light leaking from inside
    var leak = cx.createRadialGradient(vx, vy, vr * .6, vx, vy, vr * 1.8); leak.addColorStop(0, 'rgba(255,214,120,.5)'); leak.addColorStop(1, 'rgba(255,214,120,0)'); cx.fillStyle = leak; cx.beginPath(); cx.arc(vx, vy, vr * 1.8, 0, 7); cx.fill();
    var sg = cx.createRadialGradient(vx - vr * .4, vy - vr * .4, vr * .1, vx, vy, vr); sg.addColorStop(0, '#d8dde6'); sg.addColorStop(.6, '#8a93a3'); sg.addColorStop(1, '#3a404c');
    cx.fillStyle = '#2a2f39'; cx.beginPath(); cx.arc(vx, vy, vr * 1.08, 0, 7); cx.fill();
    cx.fillStyle = sg; cx.beginPath(); cx.arc(vx, vy, vr, 0, 7); cx.fill();
    cx.strokeStyle = '#4a515e'; cx.lineWidth = vr * .05; cx.beginPath(); cx.arc(vx, vy, vr * .78, 0, 7); cx.stroke();
    cx.fillStyle = '#5a6270'; for (var b = 0; b < 16; b++) { var an = b / 16 * Math.PI * 2; cx.beginPath(); cx.arc(vx + Math.cos(an) * vr * .9, vy + Math.sin(an) * vr * .9, vr * .035, 0, 7); cx.fill(); }
    var rot = now / 4000; cx.strokeStyle = '#2c313b'; cx.lineWidth = vr * .07; cx.lineCap = 'round';
    for (var sp = 0; sp < 3; sp++) { var a2 = rot + sp * Math.PI / 3; cx.beginPath(); cx.moveTo(vx - Math.cos(a2) * vr * .5, vy - Math.sin(a2) * vr * .5); cx.lineTo(vx + Math.cos(a2) * vr * .5, vy + Math.sin(a2) * vr * .5); cx.stroke(); }
    cx.fillStyle = '#c9a24a'; cx.beginPath(); cx.arc(vx, vy, vr * .13, 0, 7); cx.fill();
    // alarm lights sweeping the hall
    [-1, 1].forEach(function (sd) {
      var lx = W / 2 + sd * W * .44, ly = Math.max(10, vy - vr * 1.6), a = Math.PI / 2 + Math.sin(now / 600 + sd) * .7 - sd * .4;
      var beam = cx.createRadialGradient(lx, ly, 0, lx, ly, W * .45); beam.addColorStop(0, 'rgba(255,40,40,.24)'); beam.addColorStop(1, 'rgba(255,40,40,0)');
      cx.fillStyle = beam; cx.beginPath(); cx.moveTo(lx, ly); cx.arc(lx, ly, W * .45, a - .2, a + .2); cx.closePath(); cx.fill();
      cx.fillStyle = Math.sin(now / 150) > 0 ? '#ff3b3b' : '#8a1a1a'; cx.beginPath(); cx.arc(lx, ly, Math.max(4, vr * .08), 0, 7); cx.fill();
    });
  }
  function heistFloor(now, half, z0, z1) {
    quad(P(-half - 9, 0, z0), P(half + 9, 0, z0), P(half + 9, 0, z1), P(-half - 9, 0, z1), '#14161c');
    var off = road % 4, zb = Math.floor(cam.z / 4) * 4 - off;
    for (var z = zb + 180; z > zb; z -= 4) {
      if (z < cam.z + 1.5) continue;
      var row = Math.round((z + off) / 4);
      for (var gx = -half - 6; gx < half + 6; gx += 4) {
        var dark = (Math.round((gx + half + 6) / 4) + row) % 2;
        quad(P(gx, .01, z), P(gx + 4, .01, z), P(gx + 4, .01, z + 4), P(gx, .01, z + 4), dark ? '#23262f' : '#c9ccd4');
      }
    }
    // red carpet to the vault
    quad(P(-2.2, .02, z0 + 1), P(2.2, .02, z0 + 1), P(2.2, .02, z1), P(-2.2, .02, z1), 'rgba(140,20,30,.55)');
    var po = road % 12, pz = Math.floor(cam.z / 12) * 12 - po;
    for (var zz = pz + 168; zz > pz; zz -= 12) {
      if (zz < cam.z + 2) continue;
      var idx = Math.round((zz + po) / 12);
      [-1, 1].forEach(function (sd) {
        var cxp = sd * (half + 6.5); box(cxp - .9, 0, zz, cxp + .9, 11, zz + 1.8, '#d9dbe2');
        var kind = Math.abs(idx * 3 + sd) % 3, ix = sd * (half + 3.2);
        if (kind === 0) for (var r = 0; r < 3; r++) for (var q = 0; q < 3 - r; q++) box(ix - 1.4 + q * .95 + r * .47, r * .45, zz + 4, ix - .6 + q * .95 + r * .47, r * .45 + .45, zz + 5.4, '#e8c043');
        else if (kind === 1) for (var r2 = 0; r2 < 4; r2++) box(ix - 1.2, r2 * .5, zz + 4, ix + 1.2, r2 * .5 + .46, zz + 5.6, r2 % 2 ? '#3f8a4a' : '#4fa35a');
        else box(ix - .7, 0, zz + 4, ix + .7, 2.4, zz + 5.2, '#4a4f5c');
      });
      // security lasers across the hall
      if (idx % 3 === 0) { var h1 = .9 + .4 * Math.sin(now / 500 + idx), a = P(-half - 6, h1, zz + 6), b = P(half + 6, h1 + .6, zz + 6); if (a && b && Math.sin(now / 260 + idx) > -.6) { cx.strokeStyle = 'rgba(255,40,60,.85)'; cx.lineWidth = Math.max(1, 6 / a[2] * 10); cx.shadowColor = '#ff2a3c'; cx.shadowBlur = 12; cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0], b[1]); cx.stroke(); cx.shadowBlur = 0; } }
    }
  }
  var BILLS = [];
  function robber(c, rank) {
    var x = c.x, z = c.z + 1.2, s = P(x, 0, z); if (!s) return;
    var now = performance.now(), t = now / 1000, k = F / s[2], u = k * 1.35, bx = s[0], by = s[1], col = c.color;
    var wk = Math.sin(t * 9 + x * 1.3), hop = Math.abs(Math.sin(c.bump * Math.PI)) * .55 * u, y0 = by - hop - Math.abs(wk) * .08 * u, lean = u * .08;
    cx.fillStyle = 'rgba(0,0,0,.45)'; cx.beginPath(); cx.ellipse(bx, by, u * .95, u * .26, 0, 0, 7); cx.fill();
    if (rank === 0) { var ag = cx.createRadialGradient(bx, by, 0, bx, by, u * 1.6); ag.addColorStop(0, 'rgba(255,214,110,.4)'); ag.addColorStop(1, 'rgba(255,214,110,0)'); cx.fillStyle = ag; cx.beginPath(); cx.ellipse(bx, by, u * 1.6, u * .5, 0, 0, 7); cx.fill(); }
    // sneakers and legs (running)
    cx.fillStyle = '#101216'; rr(bx - u * .44, y0 - u * .3 + wk * u * .12, u * .36, u * .3, u * .1); cx.fill(); rr(bx + u * .08, y0 - u * .3 - wk * u * .12, u * .36, u * .3, u * .1); cx.fill();
    cx.fillStyle = shade(col, .7); rr(bx - u * .4, y0 - u * 1.45 + wk * u * .06, u * .36, u * 1.2, u * .12); cx.fill(); rr(bx + u * .04, y0 - u * 1.45 - wk * u * .06, u * .36, u * 1.2, u * .12); cx.fill();
    // jumpsuit body
    var og = cx.createLinearGradient(bx - u * .7, 0, bx + u * .7, 0); og.addColorStop(0, shade(col, .6)); og.addColorStop(.5, col); og.addColorStop(1, shade(col, .68));
    cx.fillStyle = og; rr(bx - u * .62 + lean, y0 - u * 2.85, u * 1.24, u * 1.6, u * .3); cx.fill();
    cx.fillStyle = '#15171c'; cx.fillRect(bx - u * .6 + lean, y0 - u * 1.5, u * 1.2, u * .14);
    // the money bag: bigger with more cash
    var bw = u * (.95 + Math.min(.6, c.score / 6000)), bh = bw * 1.05, mx = bx + lean, my = y0 - u * 1.55;
    var mg = cx.createRadialGradient(mx - bw * .2, my - bh * .7, bw * .1, mx, my - bh * .45, bw * .75); mg.addColorStop(0, '#e9dcb8'); mg.addColorStop(1, '#9c8a62');
    cx.fillStyle = mg; cx.beginPath(); cx.moveTo(mx - bw * .18, my - bh * .95); cx.quadraticCurveTo(mx - bw * .62, my - bh * .7, mx - bw * .5, my - bh * .2); cx.quadraticCurveTo(mx - bw * .45, my + bh * .05, mx, my + bh * .05); cx.quadraticCurveTo(mx + bw * .45, my + bh * .05, mx + bw * .5, my - bh * .2); cx.quadraticCurveTo(mx + bw * .62, my - bh * .7, mx + bw * .18, my - bh * .95); cx.closePath(); cx.fill();
    cx.fillStyle = '#7a6a48'; cx.fillRect(mx - bw * .22, my - bh * 1.0, bw * .44, bh * .08);
    cx.fillStyle = '#2f7a3a'; cx.font = '900 ' + Math.round(bw * .5) + 'px Georgia, serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('$', mx, my - bh * .42);
    // arms: one carrying a duffel bag, one pumping
    cx.lineCap = 'round'; cx.strokeStyle = shade(col, .85); cx.lineWidth = u * .26;
    cx.beginPath(); cx.moveTo(bx - u * .55 + lean, y0 - u * 2.55); cx.lineTo(bx - u * .82, y0 - u * 1.75); cx.stroke();
    cx.beginPath(); cx.moveTo(bx + u * .55 + lean, y0 - u * 2.55); cx.lineTo(bx + u * .85 + wk * u * .1, y0 - u * 1.95 - wk * u * .15); cx.stroke();
    cx.fillStyle = '#0f1114'; cx.beginPath(); cx.arc(bx - u * .84, y0 - u * 1.7, u * .13, 0, 7); cx.arc(bx + u * .86 + wk * u * .1, y0 - u * 1.9 - wk * u * .15, u * .13, 0, 7); cx.fill();
    cx.fillStyle = '#1c1f26'; rr(bx - u * 1.35, y0 - u * 1.62, u * .9, u * .48, u * .14); cx.fill(); cx.strokeStyle = '#3a3f4a'; cx.lineWidth = u * .05; cx.beginPath(); cx.moveTo(bx - u * 1.3, y0 - u * 1.4); cx.lineTo(bx - u * .5, y0 - u * 1.4); cx.stroke();
    cx.fillStyle = '#4fa35a'; cx.fillRect(bx - u * 1.2, y0 - u * 1.7, u * .3, u * .1);
    // head: black beanie and the knot of the eye mask
    cx.fillStyle = '#0e1013'; cx.beginPath(); cx.arc(bx + lean, y0 - u * 3.15, u * .36, 0, 7); cx.fill();
    cx.fillStyle = '#e2b48a'; cx.fillRect(bx - u * .12 + lean, y0 - u * 2.92, u * .24, u * .12);
    cx.fillStyle = '#2a2d34'; cx.beginPath(); cx.ellipse(bx + lean, y0 - u * 3.33, u * .38, u * .16, 0, Math.PI, 0); cx.fill();
    cx.strokeStyle = '#000'; cx.lineWidth = u * .07; cx.beginPath(); cx.moveTo(bx - u * .35 + lean, y0 - u * 3.1); cx.lineTo(bx + u * .35 + lean, y0 - u * 3.1); cx.stroke();
    cx.beginPath(); cx.moveTo(bx + lean, y0 - u * 3.1); cx.lineTo(bx - u * .12 + lean + Math.sin(t * 8) * u * .04, y0 - u * 2.85); cx.moveTo(bx + lean, y0 - u * 3.1); cx.lineTo(bx + u * .14 + lean + Math.sin(t * 8 + 1) * u * .04, y0 - u * 2.86); cx.stroke();
    if (rank === 0) { cx.fillStyle = '#ffd24a'; var cy0 = y0 - u * 3.75; cx.beginPath(); cx.moveTo(bx - u * .3, cy0 + u * .2); cx.lineTo(bx - u * .3, cy0 - u * .05); cx.lineTo(bx - u * .15, cy0 + u * .07); cx.lineTo(bx, cy0 - u * .15); cx.lineTo(bx + u * .15, cy0 + u * .07); cx.lineTo(bx + u * .3, cy0 - u * .05); cx.lineTo(bx + u * .3, cy0 + u * .2); cx.closePath(); cx.fill(); }
    if (c.bump > .9 && !c.burst) { c.burst = 1; for (var i = 0; i < 16; i++) BILLS.push({ x: x, y: 3.4, z: z, vx: (Math.random() - .5) * 3.4, vy: 2.5 + Math.random() * 3, vz: (Math.random() - .5) * 2, r: Math.random() * 6, life: 1.4 }); }
    if (c.bump < .5) c.burst = 0;
    tag(c, rank, P(x, 5.4 + hop / k, z));
  }
  function bills(dt) {
    BILLS = BILLS.filter(function (p) { p.life -= dt * .7; return p.life > 0; });
    BILLS.forEach(function (p) { p.x += p.vx * dt; p.y = Math.max(0, p.y + p.vy * dt); p.z += p.vz * dt; p.vy -= 3.2 * dt; p.vx *= .99; p.r += dt * 6; var q = P(p.x, p.y, p.z); if (!q) return; var w = Math.max(5, .55 * F / q[2]);
      cx.save(); cx.translate(q[0], q[1]); cx.rotate(Math.sin(p.r) * .9); cx.scale(1, Math.abs(Math.cos(p.r * 1.3)) * .7 + .3); cx.globalAlpha = Math.min(1, p.life);
      cx.fillStyle = '#5bbd6b'; cx.fillRect(-w / 2, -w * .23, w, w * .46); cx.strokeStyle = '#2f7a3a'; cx.lineWidth = Math.max(1, w * .05); cx.strokeRect(-w / 2 + w * .06, -w * .17, w * .88, w * .34); cx.fillStyle = '#2f7a3a'; cx.beginPath(); cx.arc(0, 0, w * .12, 0, 7); cx.fill(); cx.restore(); });
    cx.globalAlpha = 1;
  }
  function car(c, rank) {
    if (OPT.kind === 'balloon') return balloon(c, rank);
    if (OPT.kind === 'mine') return miner(c, rank);
    if (OPT.kind === 'treasure') return hunter(c, rank);
    if (OPT.kind === 'heist') return robber(c, rank);
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
    road += dt * (OPT.kind === 'mine' ? 5 : OPT.kind === 'treasure' ? 4 : OPT.kind === 'heist' ? 7 : 26);
    var zs = ids.map(function (id) { return cars[id].z; }), zmax = Math.max.apply(null, zs), zmin = Math.min.apply(null, zs), sp = zmax - zmin;
    var ld = ids.slice().sort(function (a, b) { return cars[b].score - cars[a].score; })[0];
    if (leader && ld !== leader && cars[ld].score > cars[leader].score) { shot.kind = 'lead'; shot.id = ld; shot.until = now + 5500; cap = '🚀 ' + cars[ld].name + ' takes the lead!'; }
    leader = ld;
    if (now > shot.until || (shot.id && !cars[shot.id])) pickShot(now);
    var T = { x: 0, y: 8 + sp * .34, z: zmin - 15 - sp * .32, lx: 0, lz: zmin + sp * .45 + 3, f: 1 };
    if (shot.id && cars[shot.id]) { var c = cars[shot.id], side = (Math.floor(now / 11000) % 2 ? 1 : -1); T = { x: c.x * .5 + side * 2.6, y: 3.1, z: c.z - 7.5, lx: c.x, lz: c.z + (shot.kind === 'duel' ? 7 : 4), f: 1.12 }; }
    if (OPT.kind === 'mine' && shot.id && cars[shot.id]) { T.y = 4.2; T.z -= 2; }
    if (OPT.kind === 'heist') { if (shot.id && cars[shot.id]) { T.y = 5; T.z -= 7; T.lz += 16; T.x *= 1.3; } else { T.y += .5; T.z -= 7; T.lz += 26; } }
    if (OPT.kind === 'treasure') { if (shot.id && cars[shot.id]) { T.y = 5; T.z -= 7; T.lz += 16; T.x *= 1.3; } else { T.y += .5; T.z -= 7; T.lz += 26; } }
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
    var tre = OPT.kind === 'treasure' || OPT.kind === 'heist';
    if (OPT.kind === 'heist') { half = Math.max(7, n * 2.2 + 2.5); heistBack(now, hy); heistFloor(now, half, z0, Math.min(z1, cam.z + 180)); }
    else if (tre) { half = Math.max(7, n * 2.2 + 2.5); treSky(now, hy); treSea(now, hy, z0, z1); treRoad(now, half, z0, Math.min(z1, cam.z + 200)); }
    else {
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
    }
    // cars, far ones first
    var rankOf = {}; ids.slice().sort(function (a, b) { return cars[b].score - cars[a].score; }).forEach(function (id, i) { rankOf[id] = i; });
    ids.slice().sort(function (a, b) { return cars[b].z - cars[a].z; }).forEach(function (id) { if (cars[id].z > cam.z + 1) car(cars[id], rankOf[id]); });
    if (OPT.kind === 'treasure') sparks(dt);
    if (OPT.kind === 'heist') bills(dt);
    // caption (also read aloud by the narrator when it changes)
    if (cap && cap !== said) { said = cap; if (LIVE.narrate) LIVE.narrate(cap, cap.indexOf('takes the lead') >= 0); }
    if (cap) { cx.font = '700 ' + Math.round(Math.max(16, H * .042)) + 'px Lato, system-ui, sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; var tw = cx.measureText(cap).width, bh = Math.max(34, H * .075); cx.fillStyle = 'rgba(8,16,40,.8)'; rr(W / 2 - tw / 2 - 22, H - bh - 14, tw + 44, bh, bh / 2); cx.fill(); cx.strokeStyle = '#e8c36a'; cx.lineWidth = 2; cx.stroke(); cx.fillStyle = '#fff'; cx.fillText(cap, W / 2, H - bh / 2 - 13); }
  }

  window.LIVE = window.LIVE || {};
  LIVE.Race3D = {
    show: function (slot, list, opt) {
      OPT = { kind: (opt && opt.kind) || 'car', per: (opt && opt.per) || .11, unit: (opt && opt.unit) || '', gem: (opt && opt.gem) || '#39c6e8' };
      if (!cv) { cv = document.createElement('canvas'); cv.className = 'race3d'; cx = cv.getContext('2d'); addEventListener('resize', size); }
      if (cv.parentNode !== slot) { slot.appendChild(cv); size(); }
      var seen = {}, n = list.length;
      // lanes are given once, in the order students first appear, so a car never jumps sideways
      list.forEach(function (p) { seen[p.id] = 1; var c = cars[p.id]; if (!c) { c = cars[p.id] = { z: 0, x: 0, score: p.score, bump: 0 }; order.push(p.id); } if (p.score > c.score) c.bump = 1; c.score = p.score; c.name = p.name; c.color = p.color; });
      order = order.filter(function (id) { if (seen[id]) return true; delete cars[id]; return false; });
      var lane = OPT.kind === 'treasure' || OPT.kind === 'heist' ? 4.4 : 3; order.forEach(function (id, i) { var tx = -(order.length - 1) * lane / 2 + i * lane; cars[id].x = tx; });
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    },
    stop: function () { if (raf) cancelAnimationFrame(raf); raf = 0; if (cv && cv.parentNode) cv.parentNode.removeChild(cv); cars = {}; order = []; leader = null; shot.until = 0; cap = ''; }
  };
})();
