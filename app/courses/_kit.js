/* Course-writing kit: lets the course files add full units compactly.
   IFX.make(courseId, [ { id, t: title, topic, photo?, v: [vocab title, "word | part of speech | meaning | example | Russian" lines],
                          g: [grammar title, rule html, exercises], r: [reading title, text, exercises] } ])
   The unit check is built from the unit's own words and grammar. Exercise helpers: IFX.k.mc / gap / ord / tf. */
(function () {
  var k = IFX.k = {
    mc: function (q, o, a) { return { t: 'mc', q: q, o: o, a: a }; },
    gap: function (q) { return { t: 'gap', q: q, a: [].slice.call(arguments, 1) }; },
    ord: function (a) { return { t: 'order', a: a }; },
    tf: function (q, a) { return { t: 'tf', q: q, a: a }; }
  };
  function words(s) {
    return String(s).trim().split('\n').map(function (l) {
      var p = l.split('|').map(function (x) { return x.trim(); });
      var w = { w: p[0], p: p[1], d: p[2], e: p[3] }; if (p[4]) w.ru = p[4]; return w;
    }).filter(function (w) { return w.w && w.d; });
  }
  function check(W, G) {
    var out = [];
    [0, 3, 6].forEach(function (i, n) {
      var x = W[i % W.length]; if (!x) return;
      var o = [W[(i + 1) % W.length].w, W[(i + 4) % W.length].w]; o.splice(n % 3, 0, x.w);
      out.push(k.mc(x.d.charAt(0).toUpperCase() + x.d.slice(1) + ' = …', o, n % 3));
    });
    if (G && G.length) { out.push(G[0]); if (G.length > 2) out.push(G[G.length - 1]); }
    out.push({ t: 'match', p: W.slice(1, 5).map(function (x) { return [x.w, x.d]; }) });
    return out;
  }
  IFX.make = function (cid, list) {
    IFX.units(cid, list.map(function (u) {
      var W = words(u.v[1]), L = [{ id: 'v', type: 'vocab', title: u.v[0], words: W }];
      if (u.g) L.push({ id: 'g', type: u.skill ? 'skill' : 'grammar', title: u.g[0], rule: u.g[1], ex: u.g[2] });
      if (u.r) L.push({ id: 'r', type: 'reading', title: u.r[0], text: u.r[1], ex: u.r[2], photo: u.photo || undefined, alt: u.alt || undefined, chart: u.chart || undefined });
      L.push({ id: 'c', type: 'check', title: 'Unit check', ex: check(W, u.g && u.g[2]) });
      return { id: u.id, title: u.t, topic: u.topic, lessons: L, wu: u.wu, sp: u.sp, task: u.task };
    }));
  };
})();
