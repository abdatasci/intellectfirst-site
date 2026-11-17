/* IF Coursebook — the AI-written IF courses (A2 English for Teens, General English A1–C2) as a book you can use online
   (answers checked as you go, slides and games one tap away) or print / save as PDF.
   ?c=<course id>  ·  &print=1 → every unit, answers hidden, answer key at the end (used to make the PDF). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  var Q = new URLSearchParams(location.search), PRINT = !!Q.get('print');
  var ORDER = ['teens-a2', 'ge-a1', 'ge-a2', 'ge-b1', 'ge-b2', 'ge-c1', 'ge-c2'];
  var THEME = { 'teens-a2': ['#7C3AED', '#EC4899', '#FACC15'], 'ge-a1': ['#0F766E', '#14B8A6', '#FDE047'], 'ge-a2': ['#1D4ED8', '#38BDF8', '#FDE047'], 'ge-b1': ['#15803D', '#84CC16', '#FDBA74'], 'ge-b2': ['#C2410C', '#FB923C', '#93C5FD'], 'ge-c1': ['#9F1239', '#F43F5E', '#FCD34D'], 'ge-c2': ['#3730A3', '#818CF8', '#FCD34D'] };
  var EMO = [[/food|eat|cook|meal|restaurant|diet/, '🍜'], [/travel|trip|holiday|advent|journey|tourism/, '✈️'], [/school|study|learn|educat|universit/, '🎓'], [/phone|screen|tech|internet|online|digital|media|ai\b|robot/, '📱'], [/sport|fit|exercise|faster/, '⚽'], [/health|body|well/, '🩺'], [/job|work|career|future|plan|predict|dream/, '🚀'], [/money|shop|buy|consum|econom/, '🛍️'], [/home|house|city|town|place|live/, '🏙️'], [/family|friend|people|relation|personal|social/, '👫'], [/past|story|stories|history|memor/, '📖'], [/film|music|art|culture|entertain|book/, '🎬'], [/nature|environment|planet|climate|weather|animal/, '🌍'], [/me\b|interest|hobby|yourself|identity|this is/, '🎧'], [/science|discover|invent/, '🔬'], [/news|truth|opinion|debate|argu/, '📰'], [/language|word|communicat|talk/, '💬'], [/crime|law|justice/, '⚖️'], [/power|politic|leader/, '🏛️'], [/mind|brain|psych|emotion|feel/, '🧠'], [/change|chang/, '🔄']];
  var emoOf = function (u) { var s = (u.title + ' ' + (u.topic || '')).toLowerCase(); for (var i = 0; i < EMO.length; i++) if (EMO[i][0].test(s)) return EMO[i][1]; return '💡'; };
  var LET = 'abcdefgh';
  function seeded(seed) { var x = 0; for (var i = 0; i < seed.length; i++) x = (x * 31 + seed.charCodeAt(i)) >>> 0; return function () { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }
  function shuffle(a, seed) { var r = seeded(seed), b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  function scramble(sent, seed) {
    var s = sent.replace(/[.?!]$/, ''), w = s.split(/\s+/), f = w[0];
    if (f !== 'I' && !/^(Ali|Asel|Madi|Dana|Timur|Kamila|Aisulu|Alina|Lina|Erasyl|Nurlan|Sofia|Arman|London|Kostanay|Almaty|Astana|Burabay|Daniyar|Aruzhan|Aigerim|Dina|Saule)$/.test(f)) w[0] = f.charAt(0).toLowerCase() + f.slice(1);
    var sh = shuffle(w, seed); if (sh.join(' ') === w.join(' ')) sh = w.slice(1).concat(w[0]); return sh;
  }
  var norm = function (s) { return String(s).toLowerCase().replace(/[’']/g, "'").replace(/[.?!,]/g, '').replace(/\s+/g, ' ').trim(); };
  var blank = function (q) { return esc(q).replace(/_{2,}/g, '<span class="bl"></span>'); };

  /* ---------- access: unit 1 for everyone, 2 with a free account, all for members and staff (as in IF App) ---------- */
  var ME = null;
  function canOpen(ui) { if (PRINT) return true; var t = ME && ME.access; return t === 'staff' || t === 'member' || ui < (ME && ME.profile ? 2 : 1); }
  var staff = function () { return ME && ME.access === 'staff'; };

  var KEY = [];   // answer key for print: [unit, section, answers[]]
  function exercise(x, i, id) {
    var n = '<span class="n">' + (i + 1) + '</span>';
    if (x.t === 'mc') return '<li class="xq" data-t="mc" data-a="' + x.a + '">' + n + '<div><p>' + blank(x.q) + '</p><div class="opts">' + x.o.map(function (o, j) { return '<button type="button" data-j="' + j + '"><i>' + LET[j] + '</i>' + esc(o) + '</button>'; }).join('') + '</div></div></li>';
    if (x.t === 'tf') return '<li class="xq" data-t="mc" data-a="' + (x.a ? 0 : 1) + '">' + n + '<div><p>' + esc(x.q) + '</p><div class="opts"><button type="button" data-j="0"><i>T</i>True</button><button type="button" data-j="1"><i>F</i>False</button></div></div></li>';
    if (x.t === 'gap') return '<li class="xq" data-t="gap" data-a="' + esc(JSON.stringify(x.a)) + '">' + n + '<div><p>' + esc(x.q).replace(/_{2,}/, '<input aria-label="answer" autocomplete="off" spellcheck="false">') + '</p></div></li>';
    if (x.t === 'order') return '<li class="xq" data-t="order" data-a="' + esc(JSON.stringify([x.a])) + '">' + n + '<div><p class="chips">' + scramble(x.a, x.a + id).map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</p><input class="wide" aria-label="sentence" autocomplete="off" spellcheck="false" placeholder="Write the sentence"></div></li>';
    return '';
  }
  function answerOf(x) { return x.t === 'mc' ? LET[x.a] + ' ' + x.o[x.a] : x.t === 'tf' ? (x.a ? 'True' : 'False') : x.t === 'gap' ? x.a[0] : x.t === 'order' ? x.a : ''; }
  function block(title, tag, inner, extra) { return '<section class="blk' + (extra ? ' ' + extra : '') + '"><h3><span class="tg">' + tag + '</span>' + title + '</h3>' + inner + '</section>'; }
  function exList(list, id, unitN, sec) {
    var ok = list.filter(function (x) { return ['mc', 'tf', 'gap', 'order'].indexOf(x.t) >= 0; });
    KEY.push([unitN, sec, ok.map(answerOf)]);
    return '<ol class="exs" data-sec="' + esc(sec) + '">' + ok.map(function (x, i) { return exercise(x, i, id + i); }).join('') + '</ol>' + (PRINT ? '' : '<div class="chk"><button type="button" class="btn sm" data-check>Check answers</button><span class="score"></span></div>');
  }

  function unitHTML(c, u, ui) {
    var n = ui + 1, em = emoOf(u), L = function (t) { return u.lessons.filter(function (l) { return l.type === t || (t === 'grammar' && l.type === 'skill'); })[0]; };
    var V = L('vocab'), G = L('grammar'), R = L('reading'), K = L('check'), W = V ? V.words : [];
    var h = '<article class="unit" id="u' + n + '"><header class="uh"><div><span class="un">Unit ' + n + '</span><h2>' + esc(u.title) + '</h2><p>' + esc(u.topic || '') + '</p></div><span class="ue">' + em + '</span></header>';
    if (!canOpen(ui)) return h + '<div class="lock"><b>🔒 Unit ' + n + ' is for IF Academy students</b><p>' + (ME && ME.profile ? 'Your free account opens units 1 and 2. Join a class or IF App membership to open the whole book.' : 'Unit 1 is free. Create a free account to open unit 2, or join IF Academy for the whole book.') + '</p><a class="btn" href="/me/' + (ME && ME.profile ? '#/upgrade' : '') + '">' + (ME && ME.profile ? 'See membership' : 'Sign in or create an account') + '</a></div></article>';
    if (!PRINT) {
      h += '<nav class="ulinks">' + (staff() ? ['a', 'b', 'c'].map(function (k) { return '<a href="/me/#/present/' + c.id + '-' + n + k + '">▶ Slides ' + n + k.toUpperCase() + '</a>'; }).join('') : '') +
        '<a href="/app/#/course/' + c.id + '">📱 IF App lessons</a><a href="/a/block-quest/?course=' + c.id + '&unit=' + u.id + '">⛏️ Block Quest</a>' + (staff() ? '<a href="/live/host.html?bank=v-' + c.id + '&units=' + u.id + '">🎮 IF Live</a>' : '') + '</nav>';
    }
    if (u.wu) h += '<p class="wu"><b>Warm-up.</b> ' + esc(u.wu) + '</p>';
    // A · words
    if (V) {
      h += block(esc(V.title), 'A · Words', '<table class="words"><thead><tr><th>Word</th><th>Meaning</th><th>Example</th></tr></thead><tbody>' + W.map(function (w) { return '<tr><td><b>' + esc(w.w) + '</b><small>' + esc(w.p || '') + '</small>' + (w.ru ? '<em>' + esc(w.ru) + '</em>' : '') + '</td><td>' + esc(w.d) + '</td><td>' + esc(w.e) + '</td></tr>'; }).join('') + '</tbody></table>');
      var gaps = []; W.forEach(function (w) { var re = new RegExp('\\b' + w.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i'); if (re.test(w.e) && gaps.length < 6) gaps.push({ t: 'gap', q: w.e.replace(re, '_____'), a: [w.e.match(re)[0]] }); });
      if (gaps.length >= 3) h += block('Complete the sentences with words from the list.', 'A · Practice', '<p class="bank">' + shuffle(gaps.map(function (g) { return g.a[0]; }), u.title).map(function (b) { return '<span>' + esc(b) + '</span>'; }).join('') + '</p>' + exList(gaps, c.id + n + 'w', n, 'A Words practice'));
    }
    // B · grammar
    if (G) h += block(esc(G.title), 'B · Grammar', '<div class="rule">' + G.rule + '</div>' + exList(G.ex || [], c.id + n + 'g', n, 'B Grammar'));
    // C · reading, speaking, project
    if (R) h += block(esc(R.title), 'C · Reading', '<div class="text">' + R.text.split(/\n\n+/).map(function (p) { return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' + exList(R.ex || [], c.id + n + 'r', n, 'C Reading'), 'read');
    var sp = u.sp && u.sp.length ? u.sp : (R ? ['What did you think of “' + R.title + '”?', 'Has anything like this happened to you or someone you know?', 'Use three words from this unit to talk about ' + (u.topic || u.title).toLowerCase() + '.', 'Ask your partner a question with ' + (G ? G.title.toLowerCase() : 'today\'s grammar') + '.'] : []);
    if (sp.length) h += block('Let’s talk', 'C · Speaking', '<ol class="talk">' + sp.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' + (u.task ? '<p class="proj"><b>Mini project.</b> ' + esc(u.task) + '</p>' : ''));
    if (K) { var ck = K.ex.filter(function (x) { return x.t !== 'match'; }); if (ck.length) h += block('Unit ' + n + ' review', 'Check', exList(ck, c.id + n + 'k', n, 'Unit review'), 'rev'); }
    return h + '</article>';
  }

  function render(c) {
    var T = THEME[c.id] || THEME['ge-b1'], r = document.documentElement.style;
    r.setProperty('--a', T[0]); r.setProperty('--b', T[1]); r.setProperty('--c', T[2]);
    document.title = c.title + ' · IF Coursebook';
    KEY = [];
    var h = '<div class="cover"><div class="cv-in"><img src="/brand/if-shield-256.webp" alt="" class="cv-logo"><p class="cv-k">IF Academy Coursebook · ' + esc(c.level) + '</p><h1>' + esc(c.title) + '</h1><p class="cv-s">' + esc(c.sub || '') + '</p><p class="cv-b">' + esc(c.blurb || '') + '</p><p class="cv-f">' + c.units.length + ' units · words · grammar · reading · speaking · review<br>With IF Classroom slides, IF App lessons and IF games for every unit.</p></div><div class="cv-emo">' + emoOf(c.units[0]) + '</div></div>';
    h += '<section class="toc"><h2>Contents</h2><table><thead><tr><th></th><th>Unit</th><th>Words</th><th>Grammar</th><th>Reading</th></tr></thead><tbody>' + c.units.map(function (u, i) {
      var g = u.lessons.filter(function (l) { return l.type === 'grammar' || l.type === 'skill'; })[0], v = u.lessons.filter(function (l) { return l.type === 'vocab'; })[0], rd = u.lessons.filter(function (l) { return l.type === 'reading'; })[0];
      return '<tr><td class="te">' + emoOf(u) + '</td><td><a href="#u' + (i + 1) + '"><b>' + (i + 1) + ' ' + esc(u.title) + '</b></a></td><td>' + esc(v ? v.title : '') + '</td><td>' + esc(g ? g.title : '') + '</td><td>' + esc(rd ? rd.title : '') + '</td></tr>';
    }).join('') + '</tbody></table></section>';
    h += c.units.map(function (u, i) { return unitHTML(c, u, i); }).join('');
    if (PRINT) h += '<section class="key"><h2>Answer key</h2>' + KEY.filter(function (k) { return k[2].length; }).map(function (k) { return '<p><b>Unit ' + k[0] + ' · ' + esc(k[1]) + ':</b> ' + k[2].map(function (a, i) { return (i + 1) + ' ' + esc(a); }).join(' · ') + '</p>'; }).join('') + '</section>';
    h += '<footer class="bf">© IF Academy, Kostanay · intellectfirst.com · Original IF Academy material.</footer>';
    $('#book').innerHTML = h;
    wire();
    window.READY = true;
  }

  function wire() {
    document.querySelectorAll('.xq[data-t=mc] .opts button').forEach(function (b) { b.onclick = function () { var li = b.closest('.xq'); li.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); li.classList.remove('ok', 'no'); }; });
    document.querySelectorAll('.xq input').forEach(function (i) { i.oninput = function () { i.closest('.xq').classList.remove('ok', 'no'); }; });
    document.querySelectorAll('[data-check]').forEach(function (b) {
      b.onclick = function () {
        var ol = b.closest('.blk').querySelector('.exs'), right = 0, all = 0;
        ol.querySelectorAll('.xq').forEach(function (li) {
          all++; var t = li.dataset.t, good;
          if (t === 'mc') { var on = li.querySelector('button.on'); good = on && +on.dataset.j === +li.dataset.a; li.querySelectorAll('button').forEach(function (x) { x.classList.toggle('right', +x.dataset.j === +li.dataset.a); }); }
          else { var v = norm(li.querySelector('input').value); good = JSON.parse(li.dataset.a).some(function (a) { return norm(a) === v; }); if (!good) li.querySelector('input').title = 'Answer: ' + JSON.parse(li.dataset.a)[0]; li.dataset.show = JSON.parse(li.dataset.a)[0]; }
          if (good) right++; li.classList.toggle('ok', !!good); li.classList.toggle('no', !good);
        });
        b.nextElementSibling.textContent = right + ' / ' + all + (right === all ? ' 🎉' : '');
      };
    });
  }

  function picker(cur) {
    var list = ORDER.map(function (id) { return IFX_BANK.courses.filter(function (c) { return c.id === id; })[0]; }).filter(Boolean);
    $('#pick').innerHTML = list.map(function (c) { return '<option value="' + c.id + '"' + (c.id === cur ? ' selected' : '') + '>' + esc(c.title) + '</option>'; }).join('');
    $('#pick').onchange = function () { location.search = '?c=' + this.value; };
    var pdf = $('#pdf');
    pdf.hidden = !(ME && (ME.access === 'staff' || ME.access === 'member'));
    pdf.onclick = async function () {
      pdf.disabled = true;
      try {
        var tg = window.Telegram && Telegram.WebApp && Telegram.WebApp.initData;
        if (tg) { var W = Telegram.WebApp, r = await fetch('/api/school/download/coursebook-' + cur + '?link=1', { credentials: 'same-origin', headers: { 'X-TG-Init': tg } }); var d = await r.json(); if (W.downloadFile && W.isVersionAtLeast && W.isVersionAtLeast('8.0')) W.downloadFile({ url: d.url, file_name: d.name }); else W.openLink(d.url); }
        else location.href = '/api/school/download/coursebook-' + cur;
      } catch (e) { alert('The PDF could not be downloaded. Please try again.'); }
      pdf.disabled = false;
    };
    $('#print').onclick = function () { window.print(); };
  }

  (async function () {
    var id = Q.get('c'); if (ORDER.indexOf(id) < 0) id = 'teens-a2';
    var c = IFX_BANK.courses.filter(function (x) { return x.id === id; })[0];
    if (!PRINT) {
      try { var tg = window.Telegram && Telegram.WebApp && Telegram.WebApp.initData, hd = tg ? { 'X-TG-Init': tg } : {}; var r = await fetch('/api/school/me', { credentials: 'same-origin', headers: hd }); if (r.ok) ME = await r.json(); } catch (e) {}
      picker(id);
    } else document.documentElement.classList.add('print');
    render(c);
  })();
})();
