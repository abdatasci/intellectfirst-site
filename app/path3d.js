/* IF App · the lesson map (director's design, 21 Nov 2026): the winding path kept, in milky white, navy and a little gold,
   with 3D-style icons drawn for IF Academy. Completed lessons are navy; gold marks only the lesson to do next.
   IFXPath.html(nodes) builds one unit's map; IFXPath.draw(root) draws the lines between the lessons. */
(function () {
  'use strict';
  var DEFS = '<svg id="p3defs" aria-hidden="true" width="0" height="0" style="position:absolute"><defs>' +
    '<linearGradient id="p3n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C5290"/><stop offset=".55" stop-color="#12305C"/><stop offset="1" stop-color="#081A36"/></linearGradient>' +
    '<linearGradient id="p3g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBE9A6"/><stop offset=".45" stop-color="#DDB53A"/><stop offset="1" stop-color="#8F6C12"/></linearGradient>' +
    '<linearGradient id="p3p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F1ECE0"/><stop offset="1" stop-color="#CFC7B4"/></linearGradient>' +
    '<linearGradient id="p3s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7F8FA"/><stop offset=".5" stop-color="#C5CBD6"/><stop offset="1" stop-color="#7C8798"/></linearGradient>' +
    '<linearGradient id="p3l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DCD6C8"/></linearGradient>' +
    '<linearGradient id="p3r" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DCD6C8"/></linearGradient>' +
    '<radialGradient id="p3h" cx=".32" cy=".22" r=".6"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".75"/><stop offset=".5" stop-color="#FFFFFF" stop-opacity=".12"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="p3bn" cx=".35" cy=".28" r=".8"><stop offset="0" stop-color="#4E79BD"/><stop offset=".5" stop-color="#16376A"/><stop offset="1" stop-color="#061630"/></radialGradient>' +
    '<radialGradient id="p3bg" cx=".35" cy=".28" r=".8"><stop offset="0" stop-color="#FFF3C4"/><stop offset=".5" stop-color="#D9AF32"/><stop offset="1" stop-color="#7E5E0C"/></radialGradient>' +
    '</defs></svg>';
  var N = 'url(#p3n)', G = 'url(#p3g)', P = 'url(#p3p)', ST = 'url(#p3s)';
  var tile = function (x, y, w, h, r, fill, dark) { return '<rect x="' + x + '" y="' + (y + 3) + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="' + dark + '"/><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="' + fill + '"/>'; };
  var ICON = {
    vocab: '<rect x="16" y="20" width="36" height="30" rx="7" fill="#7C8798" transform="rotate(8 34 35)"/><rect x="14" y="16" width="36" height="30" rx="7" fill="' + ST + '" transform="rotate(8 32 31)"/>' + tile(10, 10, 38, 32, 8, N, '#061630') + '<rect x="10" y="10" width="38" height="15" rx="8" fill="#fff" opacity=".16"/><text x="29" y="33" text-anchor="middle" font-family="Georgia,serif" font-size="19" font-weight="700" fill="#fff">Aa</text>',
    grammar: tile(8, 30, 22, 22, 6, N, '#061630') + '<rect x="8" y="30" width="22" height="10" rx="6" fill="#fff" opacity=".18"/>' + tile(34, 30, 22, 22, 6, ST, '#7C8798') + '<rect x="34" y="30" width="22" height="10" rx="6" fill="#fff" opacity=".4"/>' + tile(21, 8, 22, 22, 6, P, '#A39B88') + '<circle cx="32" cy="19" r="4" fill="url(#p3bg)"/>',
    reading: '<path d="M6 20c8-4 18-4 26 2v32c-8-6-18-6-26-2z" fill="#061630"/><path d="M58 20c-8-4-18-4-26 2v32c8-6 18-6 26-2z" fill="#061630"/><path d="M8 16c8-4 16-4 24 2v32c-8-6-16-6-24-2z" fill="url(#p3l)"/><path d="M56 16c-8-4-16-4-24 2v32c8-6 16-6 24-2z" fill="url(#p3r)"/><path d="M13 24c5-2 10-2 15 1M13 31c5-2 10-2 15 1M13 38c5-2 10-2 15 1M51 24c-5-2-10-2-15 1M51 31c-5-2-10-2-15 1" stroke="#9AA3B2" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M42 12h9v20l-4.5-4-4.5 4z" fill="' + G + '"/>',
    listen: '<path d="M12 36V30a20 20 0 0 1 40 0v6" fill="none" stroke="#7C8798" stroke-width="7" stroke-linecap="round"/><path d="M12 36V30a20 20 0 0 1 40 0v6" fill="none" stroke="' + ST + '" stroke-width="5" stroke-linecap="round"/><path d="M18 17a20 20 0 0 1 28 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>' + tile(5, 31, 16, 25, 8, N, '#061630') + '<rect x="7.5" y="33.5" width="5" height="14" rx="2.5" fill="#fff" opacity=".22"/>' + tile(43, 31, 16, 25, 8, N, '#061630') + '<rect x="45.5" y="33.5" width="5" height="14" rx="2.5" fill="#fff" opacity=".22"/><circle cx="51" cy="50" r="2" fill="' + G + '"/>',
    context: '<ellipse cx="32" cy="55" rx="18" ry="4" fill="#0B2545" opacity=".18"/><circle cx="32" cy="31" r="24" fill="url(#p3bn)"/><circle cx="32" cy="31" r="17" fill="' + P + '"/><circle cx="32" cy="31" r="10.5" fill="url(#p3bn)"/><circle cx="32" cy="31" r="4.5" fill="url(#p3bg)"/><circle cx="32" cy="31" r="24" fill="url(#p3h)"/><path d="M33 30L52 11" stroke="#7C8798" stroke-width="3" stroke-linecap="round"/><path d="M48 8l8-1-1 8-5 1z" fill="' + G + '"/>',
    check: '<ellipse cx="32" cy="57" rx="14" ry="3.5" fill="#0B2545" opacity=".18"/><path d="M22 54h20l-3-8H25z" fill="' + N + '"/><rect x="29" y="38" width="6" height="10" fill="#7C8798"/><path d="M16 9h32v12a16 16 0 0 1-32 0z" fill="#061630"/><path d="M16 7h32v12a16 16 0 0 1-32 0z" fill="' + N + '"/><path d="M16 12H8a8 8 0 0 0 10 10M48 12h8a8 8 0 0 1-10 10" fill="none" stroke="' + ST + '" stroke-width="3.5" stroke-linecap="round"/><path d="M21 9h6v12a12 12 0 0 0 4 9a16 16 0 0 1-10-11z" fill="#fff" opacity=".2"/><path d="M32 12l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4-3.9-3.8 5.4-.8z" fill="' + G + '"/>',
    test: '<rect x="13" y="12" width="38" height="46" rx="6" fill="#A39B88"/><rect x="13" y="9" width="38" height="46" rx="6" fill="' + P + '"/><path d="M20 25h24M20 33h24M20 41h14" stroke="#9AA3B2" stroke-width="2.5" stroke-linecap="round"/>' + tile(23, 4, 18, 10, 4, N, '#061630') + '<circle cx="44" cy="45" r="10" fill="url(#p3bn)"/><path d="M39.5 45l3.2 3.2 6-6.4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    speaking: '<path d="M10 14a8 8 0 0 1 8-8h28a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H30l-12 10v-10a8 8 0 0 1-8-8z" fill="#061630" transform="translate(0 3)"/><path d="M10 14a8 8 0 0 1 8-8h28a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H30l-12 10v-10a8 8 0 0 1-8-8z" fill="' + N + '"/><path d="M12 14a6 6 0 0 1 6-6h28a6 6 0 0 1 6 6v6H12z" fill="#fff" opacity=".14"/><circle cx="22" cy="24" r="3.6" fill="' + P + '"/><circle cx="32" cy="24" r="3.6" fill="url(#p3bg)"/><circle cx="42" cy="24" r="3.6" fill="' + P + '"/>',
    skill: '<path d="M32 6l5 3 6-1 3 5 6 2v6l4 5-4 5v6l-6 2-3 5-6-1-5 3-5-3-6 1-3-5-6-2v-6l-4-5 4-5v-6l6-2 3-5 6 1z" fill="#061630" transform="translate(0 3)"/><path d="M32 6l5 3 6-1 3 5 6 2v6l4 5-4 5v6l-6 2-3 5-6-1-5 3-5-3-6 1-3-5-6-2v-6l-4-5 4-5v-6l6-2 3-5 6 1z" fill="' + N + '"/><circle cx="32" cy="26" r="10" fill="' + ST + '"/><circle cx="32" cy="26" r="4.5" fill="url(#p3bg)"/><circle cx="32" cy="26" r="20" fill="url(#p3h)"/>',
    look: '<path d="M4 34c8-13 18-19 28-19s20 6 28 19c-8 13-18 19-28 19S12 47 4 34z" fill="#A39B88" transform="translate(0 3)"/><path d="M4 34c8-13 18-19 28-19s20 6 28 19c-8 13-18 19-28 19S12 47 4 34z" fill="' + P + '"/><circle cx="32" cy="34" r="13" fill="url(#p3bn)"/><circle cx="32" cy="34" r="5.5" fill="#061630"/><circle cx="27.5" cy="29.5" r="3.2" fill="#fff" opacity=".85"/>',
    maths: tile(10, 8, 44, 46, 9, N, '#061630') + '<rect x="10" y="8" width="44" height="18" rx="9" fill="#fff" opacity=".14"/><rect x="16" y="14" width="32" height="11" rx="3.5" fill="' + P + '"/><circle cx="22" cy="34" r="3.6" fill="' + ST + '"/><circle cx="32" cy="34" r="3.6" fill="' + ST + '"/><circle cx="42" cy="34" r="3.6" fill="url(#p3bg)"/><circle cx="22" cy="45" r="3.6" fill="' + ST + '"/><circle cx="32" cy="45" r="3.6" fill="' + ST + '"/><circle cx="42" cy="45" r="3.6" fill="' + ST + '"/>',
    lock: '<path d="M20 30V22a12 12 0 0 1 24 0v8" fill="none" stroke="#7C8798" stroke-width="7" stroke-linecap="round"/><path d="M20 30V22a12 12 0 0 1 24 0v8" fill="none" stroke="' + ST + '" stroke-width="5" stroke-linecap="round"/>' + tile(12, 28, 40, 28, 8, '#AAB2C0', '#7C8798') + '<rect x="12" y="28" width="40" height="11" rx="8" fill="#fff" opacity=".3"/><circle cx="32" cy="40" r="4" fill="#5B6678"/><rect x="30.5" y="41" width="3" height="8" rx="1.5" fill="#5B6678"/>'
  };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function icon(type) { return '<svg aria-hidden="true" viewBox="0 0 64 64">' + (ICON[type] || ICON.context) + '</svg>'; }
  var XS = [20, 42, 80, 58];   // where each lesson's button sits across the map, in % (repeats every four)
  function html(nodes, goText) {
    return '<div class="path map">' + nodes.map(function (n, i) {
      var x = XS[i % 4], st = n.state;
      return '<a class="node ' + st + (x >= 50 ? ' rt' : '') + '" style="--x:' + x + '%" href="' + esc(n.href) + '" data-st="' + st + '">' +
        '<span class="b">' + icon(st === 'locked' ? 'lock' : n.type) + (st === 'done' ? '<i class="tk" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></i>' : '') + '</span>' +
        '<span class="t"><b>' + esc(n.title) + '</b><em>' + esc(n.sub) + '</em>' + (st === 'next' ? '<i class="go"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg>' + esc(goText || 'Continue') + '</i>' : '') + '</span></a>';
    }).join('') + '</div>';
  }
  function draw(root) {
    if (!document.getElementById('p3defs')) document.body.insertAdjacentHTML('afterbegin', DEFS);
    [].forEach.call((root || document).querySelectorAll('.path.map'), function (m) {
      var old = m.querySelector('svg.p3line'); if (old) old.remove();
      var box = m.getBoundingClientRect(), pts = [].map.call(m.querySelectorAll('.node'), function (n) { var r = n.querySelector('.b').getBoundingClientRect(); return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, st: n.getAttribute('data-st') }; });
      if (pts.length < 2 || !box.width) return;
      var seg = function (a, b) { var my = (a.y + b.y) / 2; return 'M' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) + ' C' + a.x.toFixed(1) + ' ' + my.toFixed(1) + ',' + b.x.toFixed(1) + ' ' + my.toFixed(1) + ',' + b.x.toFixed(1) + ' ' + b.y.toFixed(1); };
      var done = '', todo = '';
      for (var i = 0; i < pts.length - 1; i++) { if (pts[i].st === 'done' && (pts[i + 1].st === 'done' || pts[i + 1].st === 'next')) done += seg(pts[i], pts[i + 1]) + ' '; else todo += seg(pts[i], pts[i + 1]) + ' '; }
      m.insertAdjacentHTML('afterbegin', '<svg class="p3line" aria-hidden="true" width="' + box.width + '" height="' + box.height + '" viewBox="0 0 ' + box.width + ' ' + box.height + '"><path class="bed" d="' + done + todo + '"/>' + (done ? '<path class="dn" d="' + done + '"/>' : '') + (todo ? '<path class="td" d="' + todo + '"/>' : '') + '</svg>');
    });
  }
  var tm; window.addEventListener('resize', function () { clearTimeout(tm); tm = setTimeout(function () { draw(document); }, 120); });
  window.IFXPath = { html: html, draw: draw, icon: icon };
})();
