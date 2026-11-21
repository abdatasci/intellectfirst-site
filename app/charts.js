/* IF App · charts for IELTS Writing Task 1 lessons: bar chart, pie charts, table and line graph, drawn from a small spec.
   window.IFXChart(spec) returns HTML. All figures in the lessons are invented for practice, and each chart says so. */
(function () {
  'use strict';
  var COL = ['#0B2545', '#C9A227', '#6B8FC7', '#9AA3B2', '#2F7D6B', '#B4532A'];
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var NOTE = '<p class="cnote">Figures invented for practice.</p>';
  function head(W, t) { return '<text x="' + W / 2 + '" y="18" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">' + esc(t) + '</text>'; }
  function legend(names, x0, y, step) { return names.map(function (n, k) { return '<rect x="' + (x0 + k * step) + '" y="' + (y - 9) + '" width="14" height="10" rx="2" fill="' + COL[k % COL.length] + '"/><text x="' + (x0 + 20 + k * step) + '" y="' + y + '" font-size="12" fill="currentColor">' + esc(n) + '</text>'; }).join(''); }
  function grid(P, W, Y, ticks) { return ticks.map(function (v) { return '<line x1="' + P + '" x2="' + (W - 14) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="#999" stroke-opacity=".25"/><text x="' + (P - 8) + '" y="' + (Y(v) + 4) + '" font-size="11" text-anchor="end" fill="currentColor" opacity=".7">' + v + '</text>'; }).join(''); }
  function ticksFor(max) { var st = max <= 10 ? 2 : max <= 50 ? 10 : max <= 100 ? 25 : max <= 500 ? 100 : 200, a = []; for (var v = 0; v <= max; v += st) a.push(v); return a; }

  function bar(c) {
    var W = 560, H = 310, P = 44, B = H - 58, max = c.max || 100, Y = function (v) { return B - v / max * (B - 34); };
    var n = c.cats.length, k = c.series.length, gw = (W - P - 14) / n, bw = Math.min(34, gw * 0.7 / k);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(c.title) + '">' + head(W, c.title) + grid(P, W, Y, ticksFor(max));
    c.cats.forEach(function (cat, i) {
      var cx = P + gw * i + gw / 2;
      c.series.forEach(function (sr, j) { var v = sr[1][i], x = cx - k * bw / 2 + j * bw; s += '<rect x="' + (x + 1) + '" y="' + Y(v) + '" width="' + (bw - 2) + '" height="' + (B - Y(v)) + '" rx="2" fill="' + COL[j % COL.length] + '"/><text x="' + (x + bw / 2) + '" y="' + (Y(v) - 4) + '" font-size="10.5" text-anchor="middle" fill="currentColor">' + v + '</text>'; });
      s += '<text x="' + cx + '" y="' + (B + 16) + '" font-size="12" text-anchor="middle" fill="currentColor" opacity=".85">' + esc(cat) + '</text>';
    });
    return s + legend(c.series.map(function (x) { return x[0]; }), P + 10, H - 10, 110) + '</svg>';
  }
  function line(c) {
    var W = 560, H = 310, P = 44, B = H - 58, max = c.max || 100, n = c.xs.length, X = function (i) { return P + 16 + i * (W - P - 46) / (n - 1); }, Y = function (v) { return B - v / max * (B - 34); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(c.title) + '">' + head(W, c.title) + grid(P, W, Y, ticksFor(max));
    c.xs.forEach(function (x, i) { s += '<text x="' + X(i) + '" y="' + (B + 16) + '" font-size="12" text-anchor="middle" fill="currentColor" opacity=".85">' + esc(x) + '</text>'; });
    c.series.forEach(function (sr, j) { var col = COL[j % COL.length]; s += '<polyline fill="none" stroke="' + col + '" stroke-width="3.5" stroke-linejoin="round"' + (j % 3 === 1 ? ' stroke-dasharray="7 4"' : j % 3 === 2 ? ' stroke-dasharray="2 4"' : '') + ' points="' + sr[1].map(function (v, i) { return X(i) + ',' + Y(v); }).join(' ') + '"/>' + sr[1].map(function (v, i) { return '<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="4.5" fill="' + col + '"/>'; }).join(''); });
    return s + legend(c.series.map(function (x) { return x[0]; }), P + 10, H - 10, 130) + '</svg>';
  }
  function pie(c) {
    var n = c.pies.length, R = 78, W = 560, H = 300, s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(c.title) + '">' + head(W, c.title);
    c.pies.forEach(function (p, i) {
      var cx = W / (n * 2) * (2 * i + 1), cy = 128, tot = p.parts.reduce(function (a, b) { return a + b[1]; }, 0), a0 = -Math.PI / 2;
      p.parts.forEach(function (pt, j) {
        var a1 = a0 + pt[1] / tot * Math.PI * 2, big = a1 - a0 > Math.PI ? 1 : 0, mid = (a0 + a1) / 2;
        s += '<path d="M' + cx + ' ' + cy + ' L' + (cx + R * Math.cos(a0)).toFixed(1) + ' ' + (cy + R * Math.sin(a0)).toFixed(1) + ' A' + R + ' ' + R + ' 0 ' + big + ' 1 ' + (cx + R * Math.cos(a1)).toFixed(1) + ' ' + (cy + R * Math.sin(a1)).toFixed(1) + ' Z" fill="' + COL[j % COL.length] + '" stroke="#fff" stroke-width="1.5"/>';
        s += '<text x="' + (cx + (R + 16) * Math.cos(mid)).toFixed(1) + '" y="' + (cy + (R + 16) * Math.sin(mid) + 4).toFixed(1) + '" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">' + pt[1] + '%</text>';
        a0 = a1;
      });
      s += '<text x="' + cx + '" y="' + (cy + R + 44) + '" font-size="14" font-weight="700" text-anchor="middle" fill="currentColor">' + esc(p.label) + '</text>';
    });
    return s + legend(c.pies[0].parts.map(function (x) { return x[0]; }), 24, H - 10, 106) + '</svg>';
  }
  function table(c) {
    return '<div class="ctable"><b>' + esc(c.title) + '</b><table><thead><tr>' + c.head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      c.rows.map(function (r) { return '<tr>' + r.map(function (x, i) { return i ? '<td>' + esc(x) + '</td>' : '<th scope="row">' + esc(x) + '</th>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  window.IFXChart = function (c) { var f = { bar: bar, line: line, pie: pie, table: table }[c && c.type]; return f ? f(c) + NOTE : ''; };
})();
