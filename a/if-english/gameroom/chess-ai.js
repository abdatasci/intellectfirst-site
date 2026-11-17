/* Computer opponent for the Game Room chess: alpha-beta search on top of chess.js, run in a Web Worker so the page never freezes. */
var window = self; importScripts('chess-engine.js');
var V = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
var PST = {
  p: [[0,0,0,0,0,0,0,0],[50,50,50,50,50,50,50,50],[10,10,20,30,30,20,10,10],[5,5,10,25,25,10,5,5],[0,0,0,20,20,0,0,0],[5,-5,-10,0,0,-10,-5,5],[5,10,10,-20,-20,10,10,5],[0,0,0,0,0,0,0,0]],
  n: [[-50,-40,-30,-30,-30,-30,-40,-50],[-40,-20,0,0,0,0,-20,-40],[-30,0,10,15,15,10,0,-30],[-30,5,15,20,20,15,5,-30],[-30,0,15,20,20,15,0,-30],[-30,5,10,15,15,10,5,-30],[-40,-20,0,5,5,0,-20,-40],[-50,-40,-30,-30,-30,-30,-40,-50]],
  b: [[-20,-10,-10,-10,-10,-10,-10,-20],[-10,0,0,0,0,0,0,-10],[-10,0,5,10,10,5,0,-10],[-10,5,5,10,10,5,5,-10],[-10,0,10,10,10,10,0,-10],[-10,10,10,10,10,10,10,-10],[-10,5,0,0,0,0,5,-10],[-20,-10,-10,-10,-10,-10,-10,-20]],
  k: [[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-20,-30,-30,-40,-40,-30,-30,-20],[-10,-20,-20,-20,-20,-20,-20,-10],[20,20,0,0,0,0,20,20],[20,30,10,0,0,10,30,20]]
};
function evalW(g) {
  var B = g.board(), s = 0;
  for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
    var p = B[r][c]; if (!p) continue;
    var t = PST[p.type], pos = t ? (p.color === 'w' ? t[r][c] : t[7 - r][c]) : 0, v = V[p.type] + pos;
    s += p.color === 'w' ? v : -v;
  }
  return s;
}
var deadline = 0, nodes = 0;
function order(ms) {
  return ms.sort(function (a, b) { return sc(b) - sc(a); });
  function sc(m) { return (m.captured ? 10 * V[m.captured] - V[m.piece] : 0) + (m.promotion ? 800 : 0); }
}
function nm(g, d, a, b, ply) {
  if ((++nodes & 255) === 0 && Date.now() > deadline) throw 'time';
  var ms = g.moves({ verbose: true });
  if (!ms.length) return g.in_check() ? -99999 + ply : 0;
  if (g.in_draw() || g.insufficient_material()) return 0;
  if (d === 0) { var e = evalW(g); return g.turn() === 'w' ? e : -e; }
  ms = order(ms);
  for (var i = 0; i < ms.length; i++) {
    g.move(ms[i]); var v = -nm(g, d - 1, -b, -a, ply + 1); g.undo();
    if (v >= b) return b; if (v > a) a = v;
  }
  return a;
}
function search(g, depth, noise) {
  var ms = order(g.moves({ verbose: true })), best = null, scored = [];
  var a = -Infinity;
  for (var i = 0; i < ms.length; i++) {
    g.move(ms[i]); var v = -nm(g, depth - 1, -Infinity, Infinity, 1); g.undo();
    scored.push({ m: ms[i], v: v });
  }
  scored.sort(function (x, y) { return y.v - x.v; });
  return scored;
}
onmessage = function (ev) {
  var g = new Chess(ev.data.fen), lv = ev.data.level, ms = g.moves({ verbose: true }), out;
  if (!ms.length) return postMessage(null);
  try {
    if (lv === 'easy') {
      deadline = Date.now() + 1500;
      var sc = search(g, 1), pick;
      if (Math.random() < 0.3) pick = ms[Math.floor(Math.random() * ms.length)];
      else { var pool = sc.slice(0, 3); pick = pool[Math.floor(Math.random() * pool.length)].m; }
      out = pick;
    } else if (lv === 'medium') {
      deadline = Date.now() + 2500; var s2 = search(g, 2), top = s2.filter(function (x) { return x.v >= s2[0].v - 15; });
      out = top[Math.floor(Math.random() * top.length)].m;
    } else {
      var best = null; deadline = Date.now() + 3000;
      for (var d = 2; d <= 4; d++) {
        try { var r = search(g, d); best = r[0].m; } catch (e) { break; }
        if (Date.now() > deadline - 300) break;
      }
      out = best || ms[0];
    }
  } catch (e) { out = ms[Math.floor(Math.random() * ms.length)]; }
  postMessage({ from: out.from, to: out.to, promotion: out.promotion });
};
