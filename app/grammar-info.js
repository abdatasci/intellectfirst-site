/* Grammar lessons as infographics. Takes a lesson's rule (the short HTML every course already has: a sentence or two,
   a table of "when → examples", sometimes a note) and lays it out as: the idea, a diagram, numbered cards, a "watch out" box.
   The diagram is chosen from the lesson title (a timeline for tenses, a flow for conditionals, a scale for modals, …).
   Nothing in the courses has to change: IFXInfo.render(ruleHtml, title) → HTML. All drawings are original line art. */
(function () {
  'use strict';
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- drawing kit (viewBox 320 × 120) ---------- */
  var T = function (x, y, t, cls, anchor) { return '<text x="' + x + '" y="' + y + '" class="' + (cls || 'ig-t') + '" text-anchor="' + (anchor || 'middle') + '">' + esc(t) + '</text>'; };
  var svg = function (inner, h) { return '<svg viewBox="0 0 320 ' + (h || 120) + '" role="img" aria-hidden="true">' + inner + '</svg>'; };
  var NOW = 200, Y = 62;
  /* a timeline: PAST ——— NOW ——— FUTURE, then the marks */
  function timeline(marks) {
    var s = '<line x1="14" y1="' + Y + '" x2="300" y2="' + Y + '" class="ig-ax"/><path d="M300 ' + Y + 'l-8 -5v10z" class="ig-axf"/>' +
      '<line x1="' + NOW + '" y1="' + (Y - 26) + '" x2="' + NOW + '" y2="' + (Y + 14) + '" class="ig-now"/>' + T(NOW, Y + 30, 'NOW', 'ig-tn') + T(60, Y + 30, 'PAST', 'ig-tl') + T(268, Y + 30, 'FUTURE', 'ig-tl');
    marks.forEach(function (m) {
      if (m[0] === 'dot') s += '<circle cx="' + m[1] + '" cy="' + Y + '" r="7" class="ig-dot"/>' + (m[2] ? T(m[1], Y - 16, m[2], 'ig-tm') : '');
      else if (m[0] === 'ring') s += '<circle cx="' + m[1] + '" cy="' + Y + '" r="7" class="ig-ring"/>' + (m[2] ? T(m[1], Y - 16, m[2], 'ig-tm') : '');
      else if (m[0] === 'bar') s += '<rect x="' + m[1] + '" y="' + (Y - 7) + '" width="' + (m[2] - m[1]) + '" height="14" rx="7" class="ig-bar"/>' + (m[3] ? T((m[1] + m[2]) / 2, Y - 16, m[3], 'ig-tm') : '');
      else if (m[0] === 'arc') s += '<path d="M' + m[1] + ' ' + (Y - 9) + ' Q' + (m[1] + m[2]) / 2 + ' ' + (Y - 52) + ' ' + m[2] + ' ' + (Y - 9) + '" class="ig-arc"/><path d="M' + m[2] + ' ' + (Y - 8) + 'l-9 -3 5 -7z" class="ig-arcf"/>';
      else if (m[0] === 'x') s += '<path d="M' + (m[1] - 6) + ' ' + (Y - 6) + 'l12 12M' + (m[1] + 6) + ' ' + (Y - 6) + 'l-12 12" class="ig-x"/>';
      else if (m[0] === 'dash') s += '<line x1="' + m[1] + '" y1="' + Y + '" x2="' + m[2] + '" y2="' + Y + '" class="ig-dash"/>';
    });
    return svg(s);
  }
  /* boxes in a row with arrows between them */
  function flow(boxes, y, h, back) {
    var n = boxes.length, gap = 16, w = (300 - gap * (n - 1)) / n, s = '';
    boxes.forEach(function (b, i) {
      var x = 10 + i * (w + gap);
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" class="' + (b[2] || 'ig-box') + '"/>' + T(x + w / 2, y + h / 2 - (b[1] ? 3 : -4), b[0], 'ig-tb') + (b[1] ? T(x + w / 2, y + h / 2 + 12, b[1], 'ig-ts') : '');
      if (i < n - 1) { var ax = x + w + 2; s += back ? '<path d="M' + (ax + gap - 4) + ' ' + (y + h / 2) + 'h-' + (gap - 6) + 'm0 0l5 -4m-5 4l5 4" class="ig-arr"/>' : '<path d="M' + ax + ' ' + (y + h / 2) + 'h' + (gap - 6) + 'm0 0l-5 -4m5 4l-5 4" class="ig-arr"/>'; }
    });
    return s;
  }

  /* ---------- which picture for which lesson ---------- */
  function scale() {
    var s = '<defs><linearGradient id="igg" x1="0" x2="1"><stop offset="0" class="ig-g0"/><stop offset="1" class="ig-g1"/></linearGradient></defs><rect x="16" y="44" width="288" height="16" rx="8" fill="url(#igg)"/>';
    [[40, 16, 'start', 'possible', 'might · could'], [160, 160, 'middle', 'a good idea', 'should'], [280, 304, 'end', 'necessary', 'must · have to']].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="52" r="6" class="ig-ring"/>' + T(p[1], 32, p[3], 'ig-tm', p[2]) + T(p[1], 82, p[4], 'ig-ts', p[2]); });
    return [svg(s, 96), 'Modal verbs set the strength of the message, from possible to necessary. After a modal: verb with no “to”.'];
  }
  var PICS = [
    [/modal verb/, scale],
    [/present perfect continuous|have been \+|has been \+/, function () { return [timeline([['bar', 70, NOW, 'started then, still going']]), 'It began in the past and it is still happening, or it has only just stopped.']; }],
    [/present perfect/, function () { return [timeline([['dot', 80], ['arc', 84, NOW - 3]]), 'A past action that matters now. We do not say exactly when.']; }],
    [/past perfect|third conditional/, function () { return [timeline([['dot', 62, '1 · earlier'], ['dot', 140, '2 · later']]), 'Two past moments. The past perfect (had + done) is the earlier one.']; }],
    [/past continuous|past simple, past continuous/, function () { return [timeline([['bar', 52, 162, 'long action'], ['ring', 118]]), 'A long action in the past, and a short one that happens in the middle of it.']; }],
    [/used to/, function () { return [timeline([['dot', 44], ['dot', 78], ['dot', 112], ['dot', 146], ['x', NOW]]), 'It happened again and again in the past. It does not happen now.']; }],
    [/narrative|past tenses/, function () { return [timeline([['dot', 50, 'earlier'], ['bar', 84, 160, 'background'], ['ring', 128]]), 'Stories mix three pasts: what happened, what was happening, and what had happened before.']; }],
    [/past simple|was \/ were|was and were/, function () { return [timeline([['dot', 96, 'finished']]), 'One finished action at a known time in the past: yesterday, last year, in 2020.']; }],
    [/present tenses|simple and continuous|present simple and present continuous/, function () { return [timeline([['dot', 40], ['dot', 84], ['dot', 128], ['dot', 250], ['bar', 176, 224, 'right now']]), 'Dots: habits that repeat. Bar: something in progress around now.']; }],
    [/present continuous/, function () { return [timeline([['bar', 172, 228, 'in progress']]), 'It is happening now, or around now. It started before this moment and it is not finished.']; }],
    [/present simple|adverbs of frequency|he, she, it/, function () { return [timeline([['dot', 40], ['dot', 84], ['dot', 128], ['dot', 172], ['dot', 250]]), 'It happens again and again: habits, routines and facts.']; }],
    [/future|going to|will\b/, function () { return [timeline([['dash', NOW, 256], ['dot', 262, 'later']]), 'After now. The form you choose shows if it is a plan, a prediction or a decision made this second.']; }],
    [/conditional|unless|\bif\b|\bwish/, function () { return [svg(flow([['IF …', 'the condition'], ['… THEN', 'the result', 'ig-box2']], 30, 56)), 'Two halves. You can start with either one: “If it rains, I’ll stay” = “I’ll stay if it rains”.']; }],
    [/passive/, function () { return [svg(T(160, 14, 'ACTIVE', 'ig-tl') + flow([['The doer'], ['does it'], ['the thing']], 20, 34) + T(160, 76, 'PASSIVE', 'ig-tl') + flow([['The thing', '', 'ig-box2'], ['be + done', '', 'ig-box2'], ['(by the doer)', '']], 82, 34), 124), 'The passive starts with the thing, not the person. Use it when the action matters more than who did it.']; }],
    [/comparativ|superlativ|as \.\.\. as|comparing/, function () { var s = ''; [[40, 34, 'big'], [130, 58, 'bigger'], [220, 84, 'the biggest']].forEach(function (b, i) { s += '<rect x="' + b[0] + '" y="' + (98 - b[1]) + '" width="60" height="' + b[1] + '" rx="8" class="' + (i === 2 ? 'ig-box2' : 'ig-box') + '"/>' + T(b[0] + 30, 114, b[2], 'ig-tb'); }); return [svg(s), 'Compare two things with -er or more. Use the -est or the most for number one in a group.']; }],
    [/reported|indirect speech/, function () { return [svg('<path d="M14 26h110a10 10 0 0 1 10 10v26a10 10 0 0 1 -10 10h-74l-16 14v-14h-20a10 10 0 0 1 -10 -10v-26a10 10 0 0 1 10 -10z" class="ig-box"/>' + T(74, 54, '“I am tired.”', 'ig-tb') + '<path d="M144 50h30m0 0l-6 -5m6 5l-6 5" class="ig-arr"/>' + '<rect x="184" y="28" width="126" height="44" rx="10" class="ig-box2"/>' + T(247, 47, 'He said he', 'ig-tb') + T(247, 63, 'was tired.', 'ig-tb') + T(160, 104, 'one step back: am → was', 'ig-tl')), 'When you report words later, the verb usually moves one step into the past.']; }],
    [/have something done|get something done/, function () { return [svg(flow([['You', 'ask'], ['an expert', 'does the job'], ['It is done', 'for you', 'ig-box2']], 30, 56)), 'Somebody else does the job for you: have + the thing + done.']; }],
    [/must|should|have to|obligation|allowed|may\b|might|advice|permission|prohibition|necessity/, scale],
    [/countable|some\b|any\b|much|many|quantif|how much/, function () { return [svg('<rect x="12" y="14" width="140" height="84" rx="12" class="ig-box"/>' + T(82, 36, 'COUNTABLE', 'ig-tl') + T(82, 64, '🍎 🍎 🍎', 'ig-te') + T(82, 86, 'one, two, three · many', 'ig-ts') + '<rect x="168" y="14" width="140" height="84" rx="12" class="ig-box2"/>' + T(238, 36, 'UNCOUNTABLE', 'ig-tl') + T(238, 64, '💧', 'ig-te') + T(238, 86, 'no number · much', 'ig-ts'), 110), 'First ask: can I count it? The answer chooses the word.']; }],
    [/article|a \/ an|determiner/, function () { return [svg('<rect x="12" y="14" width="140" height="84" rx="12" class="ig-box"/>' + T(82, 36, 'A / AN', 'ig-tl') + T(82, 64, '📕 📗 📘', 'ig-te') + T(82, 86, 'any one of many', 'ig-ts') + '<rect x="168" y="14" width="140" height="84" rx="12" class="ig-box2"/>' + T(238, 36, 'THE', 'ig-tl') + T(238, 64, '👉 📕', 'ig-te') + T(238, 86, 'this one: we both know it', 'ig-ts'), 110), 'A / an introduces something new. The points at something we both already know.']; }],
    [/relative clause|who, which|defining/, function () { return [svg(flow([['the woman'], ['who lives next door', 'tells us which one', 'ig-box2']], 30, 56)), 'A relative clause sits straight after a noun and tells us which one, or adds a detail.']; }],
    [/-ing|infinitive|verb pattern|gerund/, function () { return [svg('<rect x="10" y="38" width="84" height="40" rx="10" class="ig-box"/>' + T(52, 62, 'first verb', 'ig-tb') + '<path d="M96 52q24 -22 50 -22m0 0l-7 -3m7 3l-6 5M96 64q24 22 50 22m0 0l-6 -5m6 5l-7 3" class="ig-arr"/>' + '<rect x="152" y="12" width="158" height="38" rx="10" class="ig-box2"/>' + T(231, 35, 'enjoy → doing', 'ig-tb') + '<rect x="152" y="66" width="158" height="38" rx="10" class="ig-box2"/>' + T(231, 89, 'want → to do', 'ig-tb'), 116), 'The first verb decides the form of the second. Learn each verb with its pattern.']; }],
    [/phrasal verb/, function () { return [svg(flow([['verb', 'look'], ['small word', 'after'], ['new meaning', 'take care of', 'ig-box2']], 30, 56).replace(/class="ig-arr"\/>/g, 'class="ig-arr ig-hide"/>') + T(108, 64, '+', 'ig-tp') + T(212, 64, '=', 'ig-tp')), 'Verb + a small word = one new meaning. Learn the pair together, like one word.']; }],
    [/question|word order/, function () { return [svg(T(160, 14, 'STATEMENT', 'ig-tl') + flow([['You'], ['are'], ['ready.']], 20, 34) + T(160, 76, 'QUESTION', 'ig-tl') + flow([['Are', '', 'ig-box2'], ['you'], ['ready?']], 82, 34), 124), 'English word order is fixed. In a question, the helping verb moves in front of the subject.']; }],
    [/there is|there are/, function () { return [svg(flow([['There is', '+ one'], ['a bank', '', 'ig-box2']], 10, 44) + flow([['There are', '+ two or more'], ['two banks', '', 'ig-box2']], 66, 44), 120), 'Use “there is / there are” to say that something exists in a place.']; }],
    [/verb be|am, is, are/, function () { return [svg(flow([['I', 'am'], ['he · she · it', 'is', 'ig-box2'], ['you · we · they', 'are']], 30, 56).replace(/class="ig-arr"\/>/g, 'class="ig-arr ig-hide"/>')), 'Three forms of one verb. Choose by the person.']; }]
  ];
  function picture(title) {
    var t = String(title || '').toLowerCase();
    for (var i = 0; i < PICS.length; i++) if (PICS[i][0].test(t)) { try { return PICS[i][1](); } catch (e) { return null; } }
    return null;
  }

  /* ---------- the layout ---------- */
  var split = function (html) { return String(html).split(/\s+·\s+/).map(function (x) { return x.trim(); }).filter(Boolean); };
  function formula(html) {   // "have / has + past participle" → pills
    var txt = html.replace(/<[^>]+>/g, '');
    if (txt.indexOf(' + ') < 0 || txt.length > 70 || /[.?!]$/.test(txt.trim())) return html;
    return '<span class="ig-fx">' + html.split(/\s\+\s/).map(function (p) { return '<span class="ig-f">' + p + '</span>'; }).join('<i>+</i>') + '</span>';
  }
  function render(rule, title) {
    var doc; try { doc = new DOMParser().parseFromString('<div id="r">' + (rule || '') + '</div>', 'text/html'); } catch (e) { doc = null; }
    var root = doc && doc.getElementById('r'); if (!root) return '<div class="rule">' + (rule || '') + '</div>';
    var kids = [].slice.call(root.children), intro = [], cards = [], notes = [], seenTable = false;
    kids.forEach(function (el) {
      if (el.tagName === 'TABLE') {
        seenTable = true;
        [].forEach.call(el.rows, function (row) {
          var c = [].slice.call(row.cells); if (!c.length) return;
          if (c[0].tagName === 'TH') { cards.push({ head: c.map(function (x) { return x.innerHTML; }) }); return; }
          cards.push(c.length === 1 ? { ex: split(c[0].innerHTML) } : { h: c[0].innerHTML, ex: [].concat.apply([], c.slice(1).map(function (x) { return split(x.innerHTML); })) });
        });
      } else (seenTable ? notes : intro).push(el.outerHTML);
    });
    if (!cards.length) return '<div class="rule">' + rule + '</div>';   // nothing to lay out: keep the plain rule
    var pic = picture(title), n = 0;
    return '<div class="ig">' +
      (intro.length ? '<div class="ig-idea"><span class="ig-k">The idea</span>' + intro.join('') + '</div>' : '') +
      (pic ? '<figure class="ig-dia">' + pic[0] + '<figcaption>' + esc(pic[1]) + '</figcaption></figure>' : '') +
      '<ol class="ig-cards">' + cards.map(function (c) {
        if (c.head) return '<li class="ig-head">' + c.head.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</li>';
        n++;
        return '<li class="ig-card c' + (n % 4) + '"><span class="ig-n">' + n + '</span><div class="ig-b">' + (c.h ? '<h3>' + formula(c.h) + '</h3>' : '') + '<div class="ig-ex">' + c.ex.map(function (x) { return '<p>' + x + '</p>'; }).join('') + '</div></div></li>';
      }).join('') + '</ol>' +
      (notes.length ? '<div class="ig-note"><span class="ig-k">Watch out</span>' + notes.join('') + '</div>' : '') +
      '</div>';
  }
  window.IFXInfo = { render: render, picture: picture };
})();
