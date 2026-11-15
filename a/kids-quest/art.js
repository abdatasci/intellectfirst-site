/* IF Kids Quest — original characters and pictures drawn for IF Academy (no outside images).
   Mia (the explorer), Bolt (her robot), the kart, the egg and the pet, plus extra word pictures.
   All pictures use the same cartoon style as /app/pics.js (thick dark outline, soft colours). */
(function () {
  var INK = '#2d2a3e';
  var O = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
  var eye = function (x, y, r) { r = r || 4; return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + INK + '"/><circle cx="' + (x - r * .35) + '" cy="' + (y - r * .4) + '" r="' + r * .38 + '" fill="#fff"/>'; };
  var smile = function (x, y, w) { return '<path d="M' + (x - w) + ' ' + y + ' Q' + x + ' ' + (y + w * .9) + ' ' + (x + w) + ' ' + y + '" fill="none" ' + O + ' stroke-width="2.6"/>'; };
  var cheeks = function (x, y, d) { return '<ellipse cx="' + (x - d) + '" cy="' + y + '" rx="5" ry="3" fill="#ff8fa3" opacity=".7"/><ellipse cx="' + (x + d) + '" cy="' + y + '" rx="5" ry="3" fill="#ff8fa3" opacity=".7"/>'; };
  var face = function (x, y) { return eye(x - 9, y, 3.6) + eye(x + 9, y, 3.6) + smile(x, y + 8, 6) + cheeks(x, y + 7, 15); };
  var splat = function (c) { return '<path d="M50 14 C62 14 64 26 74 24 C86 22 90 36 82 44 C92 52 86 68 74 66 C72 80 58 88 50 78 C40 88 26 82 26 70 C12 70 10 54 20 48 C10 38 18 22 32 26 C36 16 44 14 50 14Z" fill="' + c + '" ' + O + '/>' + face(50, 46); };

  var P = {
    red: splat('#ef4b4b'), blue: splat('#3d8bfd'), yellow: splat('#ffd23f'), green: splat('#4cc76a'), pink: splat('#ff8fc8'), orange: splat('#ff9a3c'),
    hat: '<path d="M24 62 Q26 26 50 24 Q74 26 76 62Z" fill="#e94f64" ' + O + '/><path d="M30 44 Q50 38 70 44" fill="none" stroke="#fff" stroke-width="5"/><rect x="18" y="60" width="64" height="14" rx="7" fill="#ffd23f" ' + O + '/><circle cx="50" cy="20" r="9" fill="#fff" ' + O + '/>',
    scarf: '<path d="M18 34 Q50 48 82 34 L82 50 Q50 64 18 50Z" fill="#3d8bfd" ' + O + '/><path d="M60 50 L66 88 L50 90 L46 54Z" fill="#3d8bfd" ' + O + '/><path d="M28 38 L28 52 M40 42 L40 56 M72 40 L72 52 M50 66 L60 64 M52 76 L62 74" stroke="#fff" stroke-width="4"/><path d="M50 90 L48 96 M56 90 L56 96 M62 89 L64 95" ' + O + '/>',
    coat: '<path d="M36 18 L22 26 L14 70 L26 72 L28 50 L30 88 L70 88 L72 50 L74 72 L86 70 L78 26 L64 18 Q50 30 36 18Z" fill="#ff9a3c" ' + O + '/><path d="M50 28 L50 88" ' + O + '/><circle cx="56" cy="44" r="3" fill="' + INK + '"/><circle cx="56" cy="58" r="3" fill="' + INK + '"/><circle cx="56" cy="72" r="3" fill="' + INK + '"/><rect x="32" y="60" width="12" height="10" rx="2" fill="#ffb974" ' + O + ' stroke-width="2.4"/>',
    snow: '<g ' + O + ' stroke="#3d8bfd" stroke-width="5">' + [0, 60, 120].map(function (a) { return '<path transform="rotate(' + a + ' 50 50)" d="M50 12 L50 88 M50 24 L42 16 M50 24 L58 16 M50 76 L42 84 M50 76 L58 84"/>'; }).join('') + '</g><circle cx="50" cy="50" r="10" fill="#e8f4ff" ' + O + '/>',
    cloud: '<path d="M24 70 Q10 70 12 56 Q14 44 28 46 Q30 28 48 28 Q64 28 68 42 Q86 38 88 56 Q90 70 74 70Z" fill="#f2f6fb" ' + O + '/>' + face(50, 52),
    rain: '<path d="M24 52 Q10 52 12 40 Q14 28 28 30 Q30 14 48 14 Q64 14 68 26 Q86 22 88 40 Q90 52 74 52Z" fill="#c9d6e6" ' + O + '/><path d="M30 64 L26 74 M50 64 L46 74 M70 64 L66 74 M40 80 L36 90 M60 80 L56 90" stroke="#3d8bfd" stroke-width="5" stroke-linecap="round"/>',
    rocket: '<path d="M50 8 Q72 26 70 62 L30 62 Q28 26 50 8Z" fill="#f2f6fb" ' + O + '/><circle cx="50" cy="36" r="9" fill="#7fd0ff" ' + O + '/><path d="M30 46 L16 66 L30 66Z M70 46 L84 66 L70 66Z" fill="#e94f64" ' + O + '/><path d="M36 62 L64 62 L60 72 L40 72Z" fill="#8a94a6" ' + O + '/><path d="M42 74 Q50 98 58 74Z" fill="#ff9a3c" ' + O + '/>',
    moon: '<path d="M62 12 A40 40 0 1 0 88 66 A32 32 0 1 1 62 12Z" fill="#ffe27a" ' + O + '/><circle cx="40" cy="62" r="5" fill="#f2c94c"/><circle cx="30" cy="42" r="3.5" fill="#f2c94c"/>' + eye(44, 46, 3.4) + smile(46, 56, 5),
    planet: '<circle cx="50" cy="50" r="26" fill="#b98cff" ' + O + '/><path d="M28 40 Q50 34 72 40 M26 54 Q50 48 74 54" stroke="#9a6cf0" stroke-width="4" fill="none"/><ellipse cx="50" cy="54" rx="46" ry="11" fill="none" stroke="#ffd23f" stroke-width="6" transform="rotate(-12 50 54)"/>' + face(50, 46),
    sun2: '<circle cx="50" cy="50" r="24" fill="#ffd23f" ' + O + '/>' + face(50, 47),
    train: '<rect x="14" y="34" width="56" height="34" rx="6" fill="#3d8bfd" ' + O + '/><rect x="58" y="22" width="26" height="46" rx="5" fill="#e94f64" ' + O + '/><rect x="22" y="40" width="14" height="12" rx="2" fill="#bfe6ff" ' + O + ' stroke-width="2.4"/><rect x="42" y="40" width="14" height="12" rx="2" fill="#bfe6ff" ' + O + ' stroke-width="2.4"/><rect x="64" y="28" width="14" height="12" rx="2" fill="#bfe6ff" ' + O + ' stroke-width="2.4"/><circle cx="28" cy="72" r="8" fill="#555" ' + O + '/><circle cx="56" cy="72" r="8" fill="#555" ' + O + '/><circle cx="76" cy="72" r="8" fill="#555" ' + O + '/>',
    doll: '<circle cx="50" cy="32" r="18" fill="#ffd9b8" ' + O + '/><path d="M32 30 Q34 10 50 12 Q66 10 68 30 Q60 20 50 22 Q40 20 32 30Z" fill="#a0522d" ' + O + '/>' + face(50, 32) + '<path d="M34 52 L66 52 L76 88 L24 88Z" fill="#ff8fc8" ' + O + '/>',
    drum: '<ellipse cx="50" cy="38" rx="32" ry="11" fill="#fff6dd" ' + O + '/><path d="M18 38 L18 72 Q50 88 82 72 L82 38" fill="#e94f64" ' + O + '/><path d="M18 50 L34 76 L50 52 L66 78 L82 50" fill="none" stroke="#ffd23f" stroke-width="4"/><path d="M30 10 L46 32 M74 10 L58 32" ' + O + ' stroke-width="5"/>',
    star2: '<path d="M50 10 L61 37 L90 38 L67 56 L76 85 L50 68 L24 85 L33 56 L10 38 L39 37Z" fill="#ffd23f" ' + O + '/>' + face(50, 48),
    // Flyers · KET · PET lands
    camera: '<rect x="12" y="30" width="76" height="50" rx="10" fill="#4a5568" ' + O + '/><path d="M34 30 L40 20 L60 20 L66 30Z" fill="#2d3748" ' + O + '/><circle cx="50" cy="55" r="17" fill="#7fd0ff" ' + O + '/><circle cx="50" cy="55" r="8" fill="#2d3748"/><circle cx="46" cy="51" r="3" fill="#fff"/><rect x="72" y="36" width="10" height="7" rx="2" fill="#ffd23f" ' + O + ' stroke-width="2"/>',
    map: '<path d="M12 22 L36 14 L64 24 L88 16 L88 78 L64 86 L36 76 L12 84Z" fill="#fff1c2" ' + O + '/><path d="M36 14 L36 76 M64 24 L64 86" ' + O + ' stroke-width="2"/><path d="M20 66 Q34 50 46 58 T74 40" fill="none" stroke="#e94f64" stroke-width="4" stroke-dasharray="6 5"/><path d="M70 34 L80 44 M80 34 L70 44" stroke="#e94f64" stroke-width="5" stroke-linecap="round"/><path d="M18 30 Q26 36 22 44" fill="none" stroke="#4cc76a" stroke-width="5"/>',
    ticket: '<path d="M10 30 L90 30 L90 44 Q82 50 90 56 L90 70 L10 70 L10 56 Q18 50 10 44Z" fill="#ff9a3c" ' + O + '/><path d="M64 32 L64 68" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="4 4"/><path d="M22 44 L52 44 M22 56 L46 56" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M77 42 L80 49 L87 50 L82 55 L83 62 L77 58 L71 62 L72 55 L67 50 L74 49Z" fill="#ffd23f" ' + O + ' stroke-width="2"/>',
    bus: '<rect x="10" y="22" width="80" height="54" rx="10" fill="#e94f64" ' + O + '/><rect x="18" y="30" width="18" height="16" rx="3" fill="#bfe6ff" ' + O + ' stroke-width="2.4"/><rect x="41" y="30" width="18" height="16" rx="3" fill="#bfe6ff" ' + O + ' stroke-width="2.4"/><rect x="64" y="30" width="18" height="16" rx="3" fill="#bfe6ff" ' + O + ' stroke-width="2.4"/><rect x="10" y="54" width="80" height="6" fill="#ffd23f"/><circle cx="28" cy="78" r="9" fill="#4a5568" ' + O + '/><circle cx="72" cy="78" r="9" fill="#4a5568" ' + O + '/>',
    phone: '<rect x="28" y="8" width="44" height="84" rx="10" fill="#2d3748" ' + O + '/><rect x="33" y="18" width="34" height="58" rx="4" fill="#7fd0ff"/><path d="M38 34 L62 34 M38 44 L56 44 M38 54 L60 54" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="84" r="4" fill="#cbd5e0"/>',
    key: '<circle cx="30" cy="50" r="18" fill="#ffd23f" ' + O + '/><circle cx="30" cy="50" r="7" fill="#fff6dd" ' + O + '/><path d="M47 45 L90 45 L90 55 L82 55 L82 64 L74 64 L74 55 L66 55 L66 62 L58 62 L58 55 L47 55Z" fill="#ffd23f" ' + O + '/>',
    clock: '<circle cx="50" cy="52" r="34" fill="#fff" ' + O + ' stroke-width="4"/><circle cx="50" cy="52" r="34" fill="none" stroke="#3d8bfd" stroke-width="6"/><path d="M50 52 L50 30 M50 52 L66 60" ' + O + ' stroke-width="5"/><circle cx="50" cy="52" r="4" fill="' + INK + '"/><path d="M26 18 L16 28 M74 18 L84 28" ' + O + ' stroke-width="6"/>',
    book: '<path d="M50 24 Q34 14 12 18 L12 78 Q34 74 50 84 Q66 74 88 78 L88 18 Q66 14 50 24Z" fill="#fff" ' + O + '/><path d="M50 24 L50 84" ' + O + '/><path d="M12 18 L12 78 Q34 74 50 84 L50 24 Q34 14 12 18Z" fill="#3d8bfd" opacity=".35"/><path d="M58 34 L78 32 M58 44 L80 42 M58 54 L76 53" stroke="#a0aec0" stroke-width="3" stroke-linecap="round"/>',
    guitar: '<path d="M62 10 L72 10 L72 18 L66 52" fill="none" ' + O + ' stroke-width="6"/><path d="M58 46 Q76 50 72 66 Q86 80 70 90 Q50 98 34 86 Q18 74 30 62 Q28 46 44 46 Q52 46 58 46Z" fill="#ff9a3c" ' + O + '/><circle cx="50" cy="70" r="7" fill="' + INK + '"/><path d="M66 18 L50 70" stroke="#fff" stroke-width="2"/><rect x="60" y="6" width="16" height="10" rx="3" fill="#a0522d" ' + O + ' stroke-width="2"/>',
    trophy: '<path d="M30 14 L70 14 L68 46 Q64 62 50 62 Q36 62 32 46Z" fill="#ffd23f" ' + O + '/><path d="M30 20 Q12 20 16 34 Q20 44 32 44 M70 20 Q88 20 84 34 Q80 44 68 44" fill="none" ' + O + ' stroke-width="4"/><path d="M44 62 L56 62 L58 74 L42 74Z" fill="#f2c94c" ' + O + '/><rect x="30" y="74" width="40" height="12" rx="3" fill="#a0522d" ' + O + '/><path d="M50 24 L53 32 L61 32 L55 37 L57 45 L50 40 L43 45 L45 37 L39 32 L47 32Z" fill="#fff"/>',
    ship: '<path d="M10 60 L90 60 L78 82 L22 82Z" fill="#a0522d" ' + O + '/><path d="M48 10 L48 60" ' + O + ' stroke-width="4"/><path d="M50 14 L80 48 L50 48Z" fill="#fff" ' + O + '/><path d="M46 20 L22 50 L46 50Z" fill="#f2f6fb" ' + O + '/><path d="M48 10 L64 14 L48 18" fill="' + INK + '"/><path d="M6 88 Q20 82 34 88 T62 88 T94 88" fill="none" stroke="#3d8bfd" stroke-width="5"/>',
    island: '<ellipse cx="50" cy="78" rx="40" ry="12" fill="#ffe08a" ' + O + '/><path d="M48 76 Q46 50 54 30" fill="none" stroke="#a0522d" stroke-width="7" stroke-linecap="round"/><path d="M54 30 Q36 18 20 30 Q38 26 54 30 Q46 12 30 10 Q48 14 54 30 Q66 10 82 16 Q64 18 54 30 Q74 26 86 38 Q68 28 54 30Z" fill="#4cc76a" ' + O + '/><circle cx="58" cy="36" r="4" fill="#a0522d"/><path d="M4 90 Q20 84 36 90 T68 90 T98 90" fill="none" stroke="#3d8bfd" stroke-width="5"/>',
    compass: '<circle cx="50" cy="50" r="38" fill="#ffd23f" ' + O + '/><circle cx="50" cy="50" r="29" fill="#fff6dd" ' + O + ' stroke-width="2.4"/><path d="M50 24 L57 50 L50 76 L43 50Z" fill="#e94f64" ' + O + ' stroke-width="2"/><path d="M50 50 L57 50 L50 76 L43 50Z" fill="#cbd5e0"/><circle cx="50" cy="50" r="4" fill="' + INK + '"/><text x="50" y="20" font-size="10" text-anchor="middle" font-family="Arial" font-weight="700" fill="' + INK + '">N</text>',
    chest: '<path d="M14 42 L86 42 L86 84 L14 84Z" fill="#a0522d" ' + O + '/><path d="M14 42 Q14 18 50 18 Q86 18 86 42Z" fill="#c0703a" ' + O + '/><path d="M14 54 L86 54" stroke="#ffd23f" stroke-width="6"/><path d="M30 20 L30 84 M70 20 L70 84" stroke="#ffd23f" stroke-width="5"/><rect x="42" y="46" width="16" height="18" rx="3" fill="#ffd23f" ' + O + '/><circle cx="50" cy="54" r="2.5" fill="' + INK + '"/><path d="M22 14 L26 6 M78 14 L74 6 M50 10 L50 2" stroke="#ffd23f" stroke-width="4" stroke-linecap="round"/>',
    laptop: '<rect x="20" y="18" width="60" height="44" rx="5" fill="#2d3748" ' + O + '/><rect x="25" y="23" width="50" height="34" rx="2" fill="#7fd0ff"/><path d="M32 32 L46 32 M32 40 L58 40 M32 48 L52 48" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><path d="M10 66 L90 66 L84 78 L16 78Z" fill="#a0aec0" ' + O + '/>',
    bulb: '<path d="M50 10 Q76 10 76 38 Q76 52 64 62 L62 72 L38 72 L36 62 Q24 52 24 38 Q24 10 50 10Z" fill="#ffd23f" ' + O + '/><rect x="38" y="72" width="24" height="14" rx="3" fill="#a0aec0" ' + O + '/><path d="M44 50 L48 40 L52 50 L56 40" fill="none" stroke="#ff9a3c" stroke-width="3"/><path d="M14 30 L6 26 M86 30 L94 26 M50 2 L50 -4" stroke="#ffd23f" stroke-width="4" stroke-linecap="round"/>'
  };

  /* Characters and props (own viewBoxes). */
  var C = {
    // Mia: explorer girl, curly dark hair, yellow raincoat, red boots, green backpack strap.
    mia: { vb: '0 0 120 200', b:
      '<path d="M30 70 Q14 40 34 22 Q50 6 74 14 Q100 22 96 52 Q104 70 92 82 L28 82 Q18 76 30 70Z" fill="#3b2418" ' + O + '/>' +
      '<circle cx="60" cy="58" r="26" fill="#f2c8a0" ' + O + '/>' +
      '<path d="M34 50 Q40 28 60 30 Q82 28 88 50 Q78 40 70 42 Q64 34 56 40 Q46 36 34 50Z" fill="#3b2418"/>' +
      '<circle cx="34" cy="44" r="8" fill="#3b2418" ' + O + '/><circle cx="88" cy="46" r="8" fill="#3b2418" ' + O + '/>' +
      eye(50, 60, 4) + eye(70, 60, 4) + smile(60, 70, 6) + cheeks(60, 68, 17) +
      '<path d="M36 86 L84 86 L94 150 L26 150Z" fill="#ffd23f" ' + O + '/><path d="M60 88 L60 150" ' + O + ' stroke-width="2.4"/>' +
      '<circle cx="66" cy="104" r="2.6" fill="' + INK + '"/><circle cx="66" cy="120" r="2.6" fill="' + INK + '"/><circle cx="66" cy="136" r="2.6" fill="' + INK + '"/>' +
      '<path d="M44 88 L40 116" stroke="#2f9e57" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M36 92 L20 128" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/><path d="M36 92 L20 128" fill="none" ' + O + ' stroke-width="0"/><circle cx="20" cy="130" r="7" fill="#f2c8a0" ' + O + '/>' +
      '<path d="M84 92 L100 116" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/><circle cx="102" cy="118" r="7" fill="#f2c8a0" ' + O + '/>' +
      '<rect x="40" y="150" width="12" height="26" fill="#f2c8a0" ' + O + '/><rect x="68" y="150" width="12" height="26" fill="#f2c8a0" ' + O + '/>' +
      '<path d="M34 174 L54 174 L56 190 L32 190Z M66 174 L86 174 L88 190 L64 190Z" fill="#e94f64" ' + O + '/>' },
    // Bolt: small round robot in IF navy and gold.
    bolt: { vb: '0 0 100 130', b:
      '<path d="M50 4 L50 18" ' + O + '/><circle cx="50" cy="6" r="5" fill="#ffd23f" ' + O + '/>' +
      '<rect x="18" y="18" width="64" height="46" rx="18" fill="#eef2f8" ' + O + '/>' +
      '<rect x="27" y="27" width="46" height="28" rx="12" fill="#13294b" ' + O + ' stroke-width="2.4"/>' +
      '<circle cx="40" cy="41" r="5" fill="#7fe3ff"/><circle cx="60" cy="41" r="5" fill="#7fe3ff"/><path d="M44 49 Q50 53 56 49" stroke="#7fe3ff" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<rect x="26" y="66" width="48" height="40" rx="12" fill="#eef2f8" ' + O + '/>' +
      '<path d="M50 78 C46 72 38 76 42 82 L50 90 L58 82 C62 76 54 72 50 78Z" fill="#c9a24e"/>' +
      '<path d="M26 78 L12 90 M74 78 L88 90" ' + O + ' stroke-width="5"/><circle cx="11" cy="92" r="5" fill="#c9a24e" ' + O + '/><circle cx="89" cy="92" r="5" fill="#c9a24e" ' + O + '/>' +
      '<rect x="30" y="106" width="16" height="12" rx="4" fill="#8a94a6" ' + O + '/><rect x="54" y="106" width="16" height="12" rx="4" fill="#8a94a6" ' + O + '/>' +
      '<circle cx="38" cy="122" r="6" fill="#13294b" ' + O + '/><circle cx="62" cy="122" r="6" fill="#13294b" ' + O + '/>' },
    // Kart seen from behind with Mia driving.
    kart: { vb: '0 0 160 130', b:
      '<rect x="8" y="78" width="30" height="40" rx="8" fill="#2d2a3e"/><rect x="122" y="78" width="30" height="40" rx="8" fill="#2d2a3e"/>' +
      '<path d="M30 70 L130 70 L140 108 L20 108Z" fill="#e94f64" ' + O + '/>' +
      '<rect x="44" y="88" width="72" height="16" rx="5" fill="#fff" ' + O + ' stroke-width="2.4"/><text x="80" y="101" font-family="Arial Black,Arial" font-weight="900" font-size="12" text-anchor="middle" fill="#13294b">IF KIDS</text>' +
      '<path d="M48 70 Q46 36 80 30 Q114 36 112 70Z" fill="#3b2418" ' + O + '/>' +
      '<circle cx="54" cy="42" r="9" fill="#3b2418" ' + O + '/><circle cx="106" cy="42" r="9" fill="#3b2418" ' + O + '/>' +
      '<path d="M40 66 L120 66" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/>' +
      '<rect x="70" y="108" width="20" height="8" rx="3" fill="#8a94a6" ' + O + ' stroke-width="2"/>' },
    egg: { vb: '0 0 100 120', b: '<path d="M50 8 C76 8 90 50 90 74 C90 100 72 114 50 114 C28 114 10 100 10 74 C10 50 24 8 50 8Z" fill="#fff3d6" ' + O + '/><circle cx="34" cy="60" r="7" fill="#ffd9a0"/><circle cx="64" cy="40" r="5" fill="#ffd9a0"/><circle cx="62" cy="86" r="8" fill="#ffd9a0"/>' },
    crack: { vb: '0 0 100 120', b: '<path d="M14 62 L28 54 L36 66 L48 52 L58 66 L70 54 L86 62" fill="none" ' + O + '/>' },
    // Pip: the baby owl that hatches when every feather is found.
    pip: { vb: '0 0 120 120', b:
      '<path d="M22 40 L30 14 L46 32Z M98 40 L90 14 L74 32Z" fill="#9a6cf0" ' + O + '/>' +
      '<ellipse cx="60" cy="66" rx="42" ry="44" fill="#b98cff" ' + O + '/><ellipse cx="60" cy="80" rx="26" ry="24" fill="#efe3ff"/>' +
      '<circle cx="44" cy="54" r="14" fill="#fff" ' + O + '/><circle cx="76" cy="54" r="14" fill="#fff" ' + O + '/>' + eye(44, 55, 6) + eye(76, 55, 6) +
      '<path d="M54 66 L66 66 L60 76Z" fill="#ffb02e" ' + O + ' stroke-width="2.4"/><path d="M18 70 Q8 84 22 92 M102 70 Q112 84 98 92" fill="none" ' + O + '/>' + cheeks(60, 70, 24) },
    feather: { vb: '0 0 60 100', b: '<path d="M30 6 C50 22 52 60 32 92 C10 62 10 24 30 6Z" fill="#ffd23f" ' + O + '/><path d="M30 20 L31 96 M30 40 L20 32 M30 52 L42 42 M30 64 L19 56 M30 74 L40 66" fill="none" ' + O + ' stroke-width="2.4"/>' },
    gem: { vb: '0 0 100 100', b: '<path d="M26 20 L74 20 L92 42 L50 90 L8 42Z" fill="#5fd3ff" ' + O + '/><path d="M8 42 L92 42 M26 20 L38 42 L50 90 L62 42 L74 20 M38 42 L50 20 L62 42" fill="none" ' + O + ' stroke-width="2.4"/><path d="M30 26 L24 36" stroke="#fff" stroke-width="5" stroke-linecap="round"/>' },
    tree: { vb: '0 0 100 140', b: '<rect x="42" y="84" width="16" height="50" rx="4" fill="#8a5a3c" ' + O + '/><circle cx="50" cy="56" r="40" fill="#5cc96b" ' + O + '/><circle cx="34" cy="44" r="8" fill="#86e08f"/>' },
    pine: { vb: '0 0 100 140', b: '<rect x="44" y="110" width="12" height="26" fill="#8a5a3c" ' + O + '/><path d="M50 6 L86 112 L14 112Z" fill="#2f9e6a" ' + O + '/><path d="M50 6 L64 48 L50 40 L36 48Z" fill="#fff" ' + O + ' stroke-width="2.4"/>' },
    candy: { vb: '0 0 100 140', b: '<rect x="44" y="70" width="12" height="66" rx="5" fill="#fff" ' + O + '/><circle cx="50" cy="50" r="38" fill="#ff8fc8" ' + O + '/><circle cx="38" cy="40" r="5" fill="#fff"/><circle cx="62" cy="34" r="5" fill="#fff"/><circle cx="58" cy="62" r="5" fill="#fff"/><circle cx="34" cy="62" r="4" fill="#fff"/>' },
    house: { vb: '0 0 120 120', b: '<path d="M16 54 L60 16 L104 54Z" fill="#e94f64" ' + O + '/><rect x="24" y="54" width="72" height="56" fill="#fff3d6" ' + O + '/><rect x="52" y="78" width="18" height="32" fill="#8a5a3c" ' + O + '/><rect x="32" y="64" width="14" height="14" fill="#bfe6ff" ' + O + ' stroke-width="2.4"/><rect x="76" y="64" width="14" height="14" fill="#bfe6ff" ' + O + ' stroke-width="2.4"/>' },
    mountain: { vb: '0 0 200 120', b: '<path d="M4 116 L70 20 L110 70 L136 40 L196 116Z" fill="#b8c4d8" ' + O + '/><path d="M70 20 L86 44 L74 40 L62 48 L54 44Z M136 40 L148 58 L138 54 L128 60Z" fill="#fff"/>' },
    farm: { vb: '0 0 120 120', b: '<path d="M14 50 L60 14 L106 50 L106 110 L14 110Z" fill="#d94a3a" ' + O + '/><rect x="44" y="64" width="32" height="46" fill="#fff" ' + O + '/><path d="M44 64 L76 110 M76 64 L44 110" ' + O + '/><circle cx="60" cy="40" r="8" fill="#fff" ' + O + '/>' }
  };

  var svg = function (vb, body, w, h) { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" width="' + w + '" height="' + h + '">' + body + '</svg>'; };
  // Standalone SVG files are strict XML: when a later attribute overrides the shared outline style, keep only the last one.
  var dedupe = function (s) {
    return s.replace(/<([a-zA-Z]+)((?:\s+[a-zA-Z:-]+="[^"]*")+)\s*(\/?)>/g, function (m, tag, attrs, sl) {
      var seen = {}, order = [];
      attrs.replace(/([a-zA-Z:-]+)="([^"]*)"/g, function (x, k, v) { if (!(k in seen)) order.push(k); seen[k] = v; });
      return '<' + tag + order.map(function (k) { return ' ' + k + '="' + seen[k] + '"'; }).join('') + (sl ? '/' : '') + '>';
    });
  };
  var b64 = function (s) { s = dedupe(s); return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(s))); };

  window.KQ_ART = {
    /** Data URI for a word picture (from this file or /app/pics.js) at size px. */
    pic: function (name, px) {
      px = px || 200;
      if (P[name]) return b64(svg('0 0 100 100', P[name], px, px));
      if (window.IFX_PIC && window.IFX_PIC.has(name)) return b64(window.IFX_PIC(name).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="' + px + '" height="' + px + '" '));
      return null;
    },
    /** Data URI for a character/prop at a given height. */
    char: function (name, h) {
      var c = C[name], v = c.vb.split(' ').map(Number), w = Math.round(h * v[2] / v[3]);
      return b64(svg(c.vb, c.b, w, h));
    },
    chars: Object.keys(C),
    picNames: Object.keys(P)
  };
})();
