/* IELTS Writing Task 1 visuals: bar, line, pie, table and process diagrams drawn as SVG/HTML.
   Colours follow the site palette and stay readable in print-like exam style. */
(function () {
  'use strict';
  var COLS = ['#0b1f3a', '#b08a3e', '#5b8bb0', '#9a5b4f', '#6f8f5e', '#7a6aa8', '#c4a463', '#3d6b7a'];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function nice(max) {
    if (max <= 0) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(max))), m = max / p;
    var step = m <= 1 ? 0.2 : m <= 2 ? 0.5 : m <= 5 ? 1 : 2;
    return Math.ceil(m / step) * step * p;
  }
  function fmt(v) { return Math.abs(v) >= 1000 ? v.toLocaleString('en-GB') : String(+v.toFixed(2)); }
  function legend(series) {
    return '<div class="ch-legend">' + series.map(function (s, i) {
      return '<span><i style="background:' + COLS[i % COLS.length] + '"></i>' + esc(s.name) + '</span>';
    }).join('') + '</div>';
  }
  function axes(W, H, L, B, T, top, unit, ticks) {
    var g = '';
    for (var i = 0; i <= ticks; i++) {
      var v = top * i / ticks, y = H - B - (H - B - T) * i / ticks;
      g += '<line x1="' + L + '" x2="' + (W - 10) + '" y1="' + y + '" y2="' + y + '" stroke="#d9d3c7" stroke-width="1"/>' +
        '<text x="' + (L - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="12" fill="#5d6676">' + fmt(v) + '</text>';
    }
    if (unit) g += '<text x="12" y="' + ((H - B + T) / 2) + '" font-size="12" fill="#5d6676" transform="rotate(-90 12 ' + ((H - B + T) / 2) + ')" text-anchor="middle">' + esc(unit) + '</text>';
    return g;
  }
  function bar(c) {
    var W = 640, H = 340, L = 64, B = 54, T = 16, cats = c.categories, ser = c.series;
    var max = 0; ser.forEach(function (s) { s.values.forEach(function (v) { max = Math.max(max, v); }); });
    var top = nice(max), plotW = W - L - 10, gw = plotW / cats.length, bw = Math.min(28, (gw - 14) / ser.length);
    var g = axes(W, H, L, B, T, top, c.unit, 5);
    cats.forEach(function (cat, ci) {
      var x0 = L + ci * gw + (gw - bw * ser.length) / 2;
      ser.forEach(function (s, si) {
        var v = s.values[ci], h = (H - B - T) * v / top;
        g += '<rect x="' + (x0 + si * bw) + '" y="' + (H - B - h) + '" width="' + (bw - 2) + '" height="' + h + '" fill="' + COLS[si % COLS.length] + '"><title>' + esc(s.name + ', ' + cat + ': ' + fmt(v)) + '</title></rect>';
      });
      g += '<text x="' + (L + ci * gw + gw / 2) + '" y="' + (H - B + 18) + '" text-anchor="middle" font-size="12" fill="#1b2333">' + esc(cat) + '</text>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(c.title || 'Bar chart') + '">' + g + '</svg>' + legend(ser);
  }
  function line(c) {
    var W = 640, H = 340, L = 64, B = 54, T = 16, cats = c.categories, ser = c.series;
    var max = 0; ser.forEach(function (s) { s.values.forEach(function (v) { max = Math.max(max, v); }); });
    var top = nice(max), plotW = W - L - 30, step = plotW / Math.max(1, cats.length - 1);
    var g = axes(W, H, L, B, T, top, c.unit, 5);
    cats.forEach(function (cat, ci) {
      g += '<text x="' + (L + 10 + ci * step) + '" y="' + (H - B + 18) + '" text-anchor="middle" font-size="12" fill="#1b2333">' + esc(cat) + '</text>';
    });
    ser.forEach(function (s, si) {
      var col = COLS[si % COLS.length], pts = s.values.map(function (v, i) { return (L + 10 + i * step) + ',' + (H - B - (H - B - T) * v / top); });
      g += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="2.5" stroke-linejoin="round"/>';
      s.values.forEach(function (v, i) {
        g += '<circle cx="' + (L + 10 + i * step) + '" cy="' + (H - B - (H - B - T) * v / top) + '" r="3.5" fill="' + col + '"><title>' + esc(s.name + ', ' + cats[i] + ': ' + fmt(v)) + '</title></circle>';
      });
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(c.title || 'Line graph') + '">' + g + '</svg>' + legend(ser);
  }
  function pie(c) {
    var labels = [];
    c.pies[0].slices.forEach(function (s) { if (labels.indexOf(s.label) < 0) labels.push(s.label); });
    var out = '<div class="ch-pies">';
    c.pies.forEach(function (p) {
      var tot = p.slices.reduce(function (a, s) { return a + s.value; }, 0), a0 = -Math.PI / 2, g = '';
      p.slices.forEach(function (s) {
        var a1 = a0 + 2 * Math.PI * s.value / tot, large = a1 - a0 > Math.PI ? 1 : 0, r = 90, cx = 110, cy = 110;
        var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
        var col = COLS[labels.indexOf(s.label) % COLS.length];
        g += '<path d="M' + cx + ',' + cy + ' L' + x0 + ',' + y0 + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + x1 + ',' + y1 + ' Z" fill="' + col + '" stroke="#fff" stroke-width="1.5"><title>' + esc(s.label + ': ' + s.value + '%') + '</title></path>';
        var am = (a0 + a1) / 2;
        if (s.value >= 6) g += '<text x="' + (cx + 60 * Math.cos(am)) + '" y="' + (cy + 60 * Math.sin(am) + 4) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">' + s.value + '%</text>';
        a0 = a1;
      });
      out += '<figure><svg viewBox="0 0 220 220">' + g + '</svg><figcaption>' + esc(p.title) + '</figcaption></figure>';
    });
    return out + '</div>' + legend(labels.map(function (l) { return { name: l }; }));
  }
  function table(c) {
    return '<div class="ch-table"><table><thead><tr>' + c.columns.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + c.rows.map(function (r) {
        return '<tr>' + r.map(function (v, i) { return i ? '<td>' + (typeof v === 'number' ? fmt(v) : esc(v)) + '</td>' : '<th scope="row">' + esc(v) + '</th>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>' + (c.unit ? '<p class="ch-unit">Figures: ' + esc(c.unit) + '</p>' : '') + '</div>';
  }
  function process(c) {
    return '<ol class="ch-process">' + c.steps.map(function (s, i) {
      return '<li><span class="n">' + (i + 1) + '</span><span>' + esc(s) + '</span></li>';
    }).join('') + '</ol>';
  }
  window.IELTSChart = function (task) {
    var c = task.chart || {}, k = task.kind, body;
    if (k === 'bar') body = bar(c); else if (k === 'line') body = line(c); else if (k === 'pie') body = pie(c);
    else if (k === 'table') body = table(c); else if (k === 'process') body = process(c); else body = '';
    return '<figure class="ch">' + (c.title ? '<figcaption class="ch-title">' + esc(c.title) + '</figcaption>' : '') + body + '</figure>';
  };
})();
