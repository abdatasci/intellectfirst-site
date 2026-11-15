/* IF English — one app for courses, vocabulary, grammar, games, tests and IELTS.
   Progress is kept on the device and, when signed in, in the account (so it follows you to the phone app and the website). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  var COURSES = [], BY = {};
  var IFX = window.IFX = { course: function (c) { COURSES.push(c); BY[c.id] = c; } };

  /* ---------- words on screen (English, Russian, Kazakh) ---------- */
  var T = {
    en: { home: 'Home', courses: 'Courses', vocab: 'Vocabulary', grammar: 'Grammar', games: 'Games', tests: 'Tests', ielts: 'IELTS', more: 'More', search: 'Search lessons, words, games, tests…', start: 'Start', cont: 'Continue', next: 'Next', check: 'Check', skip: 'Skip', correct: 'Correct!', wrong: 'Not quite', answer: 'Correct answer', lesson: 'Lesson', unit: 'Unit', yourPlan: 'Your plan for today', dailyGoal: 'Daily goal', streak: 'day streak', allLevels: 'All levels', forYou: 'For you', all: 'All', locked: 'Full access', signin: 'Sign in', level: 'Level', teach: 'Teach mode', reveal: 'Show answer' },
    ru: { home: 'Главная', courses: 'Курсы', vocab: 'Лексика', grammar: 'Грамматика', games: 'Игры', tests: 'Тесты', ielts: 'IELTS', more: 'Ещё', search: 'Поиск уроков, слов, игр, тестов…', start: 'Начать', cont: 'Продолжить', next: 'Далее', check: 'Проверить', skip: 'Пропустить', correct: 'Верно!', wrong: 'Не совсем', answer: 'Правильный ответ', lesson: 'Урок', unit: 'Раздел', yourPlan: 'Ваш план на сегодня', dailyGoal: 'Цель дня', streak: 'дней подряд', allLevels: 'Все уровни', forYou: 'Для вас', all: 'Все', locked: 'Полный доступ', signin: 'Войти', level: 'Уровень', teach: 'Режим учителя', reveal: 'Показать ответ' },
    kk: { home: 'Басты', courses: 'Курстар', vocab: 'Сөздік', grammar: 'Грамматика', games: 'Ойындар', tests: 'Тесттер', ielts: 'IELTS', more: 'Тағы', search: 'Сабақ, сөз, ойын, тест іздеу…', start: 'Бастау', cont: 'Жалғастыру', next: 'Келесі', check: 'Тексеру', skip: 'Өткізу', correct: 'Дұрыс!', wrong: 'Дұрыс емес', answer: 'Дұрыс жауап', lesson: 'Сабақ', unit: 'Бөлім', yourPlan: 'Бүгінгі жоспарыңыз', dailyGoal: 'Күндік мақсат', streak: 'күн қатарынан', allLevels: 'Барлық деңгей', forYou: 'Сізге', all: 'Барлығы', locked: 'Толық қолжетімділік', signin: 'Кіру', level: 'Деңгей', teach: 'Мұғалім режимі', reveal: 'Жауапты көрсету' }
  };
  var lang = (function () { try { return localStorage.getItem('if.lang') || 'en'; } catch (e) { return 'en'; } })();
  if (!T[lang]) lang = 'en';
  var t = function (k) { return (T[lang] && T[lang][k]) || T.en[k] || k; };

  /* ---------- progress ---------- */
  var KEY = 'ifx.v1', S;
  function blank() { return { goal: '', level: '', xp: 0, streak: 0, last: '', today: { d: '', xp: 0 }, done: {}, words: {}, v: 1 }; }
  try { S = JSON.parse(localStorage.getItem(KEY)) || blank(); } catch (e) { S = blank(); }
  var day = function (d) { d = d || new Date(); return new Date(d.getTime() + 5 * 3600e3).toISOString().slice(0, 10); };   // Kostanay time
  function save() { S.at = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} pushSoon(); }
  function addXP(n) {
    var d = day(); if (S.today.d !== d) S.today = { d: d, xp: 0 };
    if (S.last !== d) { var y = day(new Date(Date.now() - 864e5)); S.streak = S.last === y ? S.streak + 1 : 1; S.last = d; }
    S.xp += n; S.today.xp += n; save();
  }
  var GOAL_XP = 30;
  var key3 = function (c, u, l) { return c + '/' + u + '/' + l; };
  var isDone = function (c, u, l) { return !!S.done[key3(c, u, l)]; };
  function courseStats(c) { var n = 0, d = 0; c.units.forEach(function (u) { u.lessons.forEach(function (l) { n++; if (isDone(c.id, u.id, l.id)) d++; }); }); return { n: n, d: d, p: n ? Math.round(d / n * 100) : 0 }; }
  function nextLesson(c) { for (var i = 0; i < c.units.length; i++) for (var j = 0; j < c.units[i].lessons.length; j++) { var u = c.units[i], l = u.lessons[j]; if (!isDone(c.id, u.id, l.id)) return { u: u, l: l, ui: i, li: j }; } return null; }

  /* ---------- account (optional) ---------- */
  var ME = null, meLoaded = false;
  function access() {   // what this person may open
    var p = ME && ME.profile, tier = ME && ME.access;
    var staff = tier === 'staff', member = staff || tier === 'member';
    return { signed: !!p, member: member, staff: staff, teacher: staff || (p && p.track === 'tutor' && member), tutor: p && p.track === 'tutor', name: (p && p.name) || '' };
  }
  var FREE_UNITS = 1;   // the first unit of every course is free; the rest is part of full access
  var unlocked = function (ui) { return ui < FREE_UNITS || access().member; };
  async function loadMe() {
    try { var r = await fetch('/api/school/me', { credentials: 'same-origin' }); if (r.ok) ME = await r.json(); } catch (e) {}
    var pf = ME && ME.profile;
    if (pf) {   // the account decides: courses chosen at registration or in My account
      if (pf.study && pf.study.length) S.study = pf.study.slice();
      if (pf.track === 'parent') S.who = 'child'; if (pf.track === 'tutor' || ME.access === 'staff') { S.teacher = true; S.who = S.who || 'teach'; }
      try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    }
    if (ME && ME.profile) {
      try {   // merge progress from the account
        var r2 = await fetch('/api/school/app/progress', { credentials: 'same-origin' });
        if (r2.ok) { var srv = (await r2.json()).progress; if (srv && srv.done) mergeProgress(srv); }
      } catch (e) {}
    }
  }
  function mergeProgress(srv) {
    Object.keys(srv.done || {}).forEach(function (k) { if (!S.done[k] || (srv.done[k].at || 0) > (S.done[k].at || 0)) S.done[k] = srv.done[k]; });
    if ((srv.xp || 0) > S.xp) { S.xp = srv.xp; }
    if ((srv.streak || 0) > S.streak && srv.last >= S.last) { S.streak = srv.streak; S.last = srv.last; }
    if ((!S.study || !S.study.length) && srv.study && srv.study.length) S.study = srv.study;
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }
  var pushT;
  function pushSoon() { if (!ME || !ME.profile) return; clearTimeout(pushT); pushT = setTimeout(function () { fetch('/api/school/app/progress', { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(S) }).catch(function () {}); }, 1500); }

  /* ---------- small helpers ---------- */
  function toast(m) { var el = $('#toast'); el.textContent = m; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove('on'); }, 2600); }
  function say(text) { try { var u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = .92; var v = speechSynthesis.getVoices().filter(function (x) { return /^en-(GB|US)/.test(x.lang); }); if (v.length) u.voice = v.find(function (x) { return /Google|Natural|Daniel|Samantha/.test(x.name); }) || v[0]; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} }
  var AC; function beep(ok) { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var o = AC.createOscillator(), g = AC.createGain(); o.connect(g); g.connect(AC.destination); var n = AC.currentTime; if (ok) { o.frequency.setValueAtTime(660, n); o.frequency.setValueAtTime(880, n + .09); } else { o.type = 'square'; o.frequency.setValueAtTime(220, n); o.frequency.setValueAtTime(180, n + .1); } g.gain.setValueAtTime(.08, n); g.gain.exponentialRampToValueAtTime(.001, n + .28); o.start(n); o.stop(n + .3); } catch (e) {} }
  function photo(id, alt) {
    if (!id) return '';
    var local = id.charAt(0) === '/', src = local ? id : 'https://unsplash.com/photos/' + id + '/download?w=1200';
    return '<figure><img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.remove()">' + (local ? '' : '<figcaption>Photo: Unsplash</figcaption>') + '</figure>';
  }
  var COLORS = { vocab: 'var(--c-vocab)', grammar: 'var(--c-grammar)', skill: 'var(--c-skill)', reading: 'var(--c-reading)', check: 'var(--c-check)', look: '#0ea5e9', maths: '#f59e0b' };
  var ICONS = { vocab: '🔤', grammar: '🧠', skill: '🛠️', reading: '📖', check: '🏁', look: '👀', maths: '🔢' };
  var TYPE = { vocab: 'Vocabulary', grammar: 'Grammar', skill: 'Skills', reading: 'Reading', check: 'Unit check', look: 'Look and choose', maths: 'Maths' };
  var UNIT_DOODLE = { 'ge-a2/u1': 'clock', 'ge-a2/u2': 'coffee', 'ge-a2/u3': 'suitcase', 'ge-b1/u1': 'laptop', 'ge-b1/u2': 'phone', 'be-b1/u1': 'talk', 'be-b1/u2': 'envelope', 'ielts/u1': 'chart', 'ielts/u2': 'pen', 'ielts/u3': 'book', 'ge-a1/u1': 'talk', 'ge-a1/u2': 'clock', 'ge-b2/u1': 'bulb', 'ge-b2/u2': 'phone', 'ge-c1/u1': 'talk', 'ge-c1/u2': 'laptop', 'ge-c2/u1': 'book', 'ge-c2/u2': 'globe', 'be-a2/u1': 'coffee', 'be-a2/u2': 'envelope', 'be-b2/u1': 'talk', 'be-b2/u2': 'chart', 'be-c1/u1': 'bulb', 'be-c1/u2': 'globe' };
  var DOODLE = function (c, u, cls) { var n = UNIT_DOODLE[c + '/' + u]; return n && window.IFX_DOODLE ? IFX_DOODLE(n, cls || 'doodle') : ''; };
  var PIC = function (n, c) { return window.IFX_PIC ? IFX_PIC(n, c) : ''; };
  function scene(sc) {   // pictures to count: n things, or n + m / n − m
    var row = function (k, gone) { var h = ''; for (var i = 0; i < k; i++) h += '<span class="sc-i' + (gone ? ' gone' : '') + '">' + PIC(sc.pic, 'pic') + '</span>'; return '<span class="sc-g">' + h + '</span>'; };
    if (!sc.op) return '<div class="scene">' + row(sc.n) + '</div>';
    if (sc.op === '+') return '<div class="scene">' + row(sc.n) + '<b class="sc-op">+</b>' + row(sc.m) + '<b class="sc-op">= ?</b></div>';
    return '<div class="scene"><span class="sc-g">' + row(sc.n - sc.m).replace(/^<span class="sc-g">|<\/span>$/g, '') + row(sc.m, true).replace(/^<span class="sc-g">|<\/span>$/g, '') + '</span><b class="sc-op">= ?</b></div>';
  }
  var tagFor = function (tr) { return tr === 'exam' ? 'ex' : tr === 'business' ? 'bz' : tr === 'kids' ? 'kd' : 'lv'; };

  /* ---------- frame ---------- */
  var NAV = [['home', '🏠'], ['courses', '📘'], ['vocab', '🔤'], ['grammar', '🧠'], ['games', '🎮'], ['tests', '📝'], ['ielts', '🎓']];
  function frame() {
    var a = access();
    var emb = document.body.classList.contains('embed');
    document.body.innerHTML =
      '<header class="top"><div class="top-in"><a class="brand" href="#/"><img src="/brand/if-shield-3d-180.webp" alt=""><span>IF English<small>IF ACADEMY</small></span></a>' +
      '<label class="srch"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" type="search" placeholder="' + esc(t('search')) + '" autocomplete="off" aria-label="Search"></label>' +
      '<div class="stats"><span class="stat" title="' + esc(t('streak')) + '">🔥 <b id="stS">' + S.streak + '</b></span><span class="stat xp" title="XP">⚡ <b id="stX">' + S.xp + '</b></span>' +
      (window.IFVoice ? '<button class="lang" id="vox" title="Voice: British female / male" aria-label="Voice">' + (IFVoice.get() === 'male' ? '👨' : '👩') + '</button>' : '') +
      '<button class="lang" id="lng" aria-label="Language">' + lang.toUpperCase() + '</button>' +
      (a.signed ? '<a class="acct" href="/me/" title="' + esc(a.name) + '">' + esc((a.name || '?').charAt(0).toUpperCase()) + '</a>' : '<a class="btn sm" href="/me/#/login?next=/app/">' + esc(t('signin')) + '</a>') + '</div></div></header>' +
      '<div class="shell"><nav class="side nav" aria-label="Sections">' + NAV.map(function (n) { return '<a href="#/' + (n[0] === 'home' ? '' : n[0]) + '" data-k="' + n[0] + '"><i>' + n[1] + '</i>' + esc(t(n[0])) + '</a>'; }).join('') + '<a class="more-link" href="#/more" data-k="more"><i>➕</i>' + esc(t('more')) + '</a></nav><main class="main" id="view"></main></div><div class="toast" id="toast" role="status"></div>';
    if (emb) document.body.classList.add('embed');
    var q = $('#q'), qt;
    q.oninput = function () { clearTimeout(qt); qt = setTimeout(function () { var v = q.value.trim(); if (v) { if (location.hash.indexOf('#/search') !== 0) history.pushState(null, '', '#/search'); vSearch(v); } }, 180); };
    q.onkeydown = function (e) { if (e.key === 'Enter') { location.hash = '#/search'; vSearch(q.value.trim()); } };
    if ($('#vox')) $('#vox').onclick = function () { var n = IFVoice.toggle(); this.textContent = n === 'male' ? '👨' : '👩'; toast(n === 'male' ? 'British male voice' : 'British female voice'); say(n === 'male' ? 'Hello! This is the British male voice.' : 'Hello! This is the British female voice.'); };
    $('#lng').onclick = function () { lang = { en: 'ru', ru: 'kk', kk: 'en' }[lang]; try { localStorage.setItem('if.lang', lang); } catch (e) {} document.documentElement.lang = lang; frame(); route(); };
  }
  function setNav(k) { $$('.nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.k === k); }); var x = $('#stS'); if (x) { x.textContent = S.streak; $('#stX').textContent = S.xp; } }
  var view = function () { return $('#view'); };

  /* ---------- what each person studies: one or more courses and levels (from registration, changeable here) ---------- */
  var STUDY = [
    ['General English', '🌍', [['ge:A1', 'A1'], ['ge:A2', 'A2'], ['ge:B1', 'B1'], ['ge:B2', 'B2'], ['ge:C1', 'C1'], ['ge:C2', 'C2']]],
    ['Business English', '💼', [['be:A2', 'A2'], ['be:B1', 'B1'], ['be:B2', 'B2'], ['be:C1', 'C1']]],
    ['Exams', '🎯', [['ielts', 'IELTS'], ['ket', 'KET (A2 Key)'], ['pet', 'PET (B1 Preliminary)']]],
    ['Young learners (6–12)', '🧸', [['yl:starters', 'Starters'], ['yl:movers', 'Movers'], ['yl:flyers', 'Flyers'], ['maths', 'Maths in English']]],
    ['Coursebooks (up to 2)', '📗', [['book:ef-a1', 'English File Elementary'], ['book:ef-a2', 'English File Pre-intermediate'], ['book:ef-b1', 'English File Intermediate'], ['book:ef-b2', 'English File Upper-intermediate'], ['book:ef-c1', 'English File Advanced'], ['book:teens-b1', 'English for Teenagers B1–B2'], ['book:teens-b2', 'English for Teenagers B2–C1'], ['book:giu', 'Grammar in Use']]]
  ];
  var SNAME = {}, SICON = {};
  STUDY.forEach(function (g) { g[2].forEach(function (x) { SNAME[x[0]] = /^ge:/.test(x[0]) ? 'General English ' + x[1] : /^be:/.test(x[0]) ? 'Business English ' + x[1] : /^yl:/.test(x[0]) ? x[1] : x[1]; SICON[x[0]] = g[1]; }); });
  SNAME.maths = 'Maths in English'; SICON.maths = '🔢';
  var mine = function () { return (S.study || []).filter(function (k) { return SNAME[k]; }); };
  /* what a study choice opens: its course (if written), its vocabulary, games and tests */
  function planOf(k) {
    var lv = (k.split(':')[1] || '').toUpperCase(), P = { key: k, name: SNAME[k], icon: SICON[k] };
    if (/^ge:/.test(k)) { P.course = BY['ge-' + lv.toLowerCase()]; P.level = lv; P.voc = byId('voc-' + lv.toLowerCase()); P.test = IFX_DIR.filter(function (x) { return x.s === 'tests' && (x.tags || []).indexOf('book') >= 0 && (x.lv || []).indexOf(lv) >= 0; })[0]; }
    else if (/^be:/.test(k)) { P.course = BY['be-' + lv.toLowerCase()]; P.level = lv; P.voc = byId('voc-' + lv.toLowerCase()); }
    else if (k === 'ielts') { P.course = BY.ielts; P.voc = byId('band9'); P.test = byId('ielts-tests'); P.level = 'IELTS'; }
    else if (k === 'ket') { P.voc = byId('voc-ket'); P.game = byId('ket-quest'); P.test = byId('test-centre'); P.level = 'A2'; }
    else if (k === 'pet') { P.voc = byId('voc-pet'); P.game = byId('pet-arcade'); P.test = byId('pet-tests'); P.level = 'B1'; }
    else if (/^yl:/.test(k)) { var y = k.split(':')[1]; P.course = BY['yl-' + y]; P.voc = byId('voc-' + y) || byId('yl'); P.game = byId('kids-quest'); P.test = byId(y + '-t'); P.kids = true; }
    else if (k === 'maths') { P.course = BY.maths; P.game = byId('yl-games'); P.kids = true; }
    else if (/^book:/.test(k)) { var bk = k.slice(5), BL = { 'ef-a1': 'A1', 'ef-a2': 'A2', 'ef-b1': 'B1', 'ef-b2': 'B2', 'ef-c1': 'C1', 'teens-b1': 'B1', 'teens-b2': 'B2', giu: 'B1' }; P.level = BL[bk]; P.book = true;
      if (/^ef-/.test(bk)) { P.test = byId(bk); P.voc = byId('voc-' + bk.slice(3)); P.game = byId('g-skill'); }
      else if (/^teens-/.test(bk)) { P.test = byId(bk); P.voc = byId(bk === 'teens-b1' ? 'voc-tb1' : 'voc-tb2'); P.game = byId('gameroom'); }
      else { P.voc = byId('gram-centre'); P.game = byId('giu-quest'); P.test = byId('test-centre'); }
      P.course = BY['ge-' + (P.level || '').toLowerCase()]; }
    if (!P.game) P.game = IFX_DIR.filter(function (x) { return x.s === 'games' && fitsKey(x, k); })[0];
    return P;
  }
  var byId = function (id) { return IFX_DIR.filter(function (x) { return x.id === id; })[0]; };
  function fitsKey(it, k) {
    var lv = (k.split(':')[1] || '').toUpperCase(), tags = (it.tags || []).join(' ');
    if (/^ge:/.test(k)) return it.tr === 'general' && (!it.lv || !it.lv.length || it.lv.indexOf(lv) >= 0);
    if (/^be:/.test(k)) return it.tr === 'business' || (it.tr === 'general' && (it.lv || []).indexOf(lv) >= 0);
    if (k === 'ielts') return /ielts/.test(tags);
    if (k === 'ket') return /ket/.test(tags) || (it.tr === 'general' && (it.lv || []).indexOf('A2') >= 0 && it.s === 'grammar');
    if (k === 'pet') return /pet/.test(tags) || (it.tr === 'general' && (it.lv || []).indexOf('B1') >= 0 && it.s === 'grammar');
    if (/^yl:|^maths$/.test(k)) return it.tr === 'kids';
    if (/^book:/.test(k)) { var bk = k.slice(5); return it.id === bk || (/^teens/.test(bk) && /teens/.test(tags)) || (bk === 'giu' && /gram|giu/.test(it.id)) || (/^ef-/.test(bk) && it.id === 'voc-' + bk.slice(3)); }
    return false;
  }
  function fits(it) { var m = mine(); return !m.length || S.teacher || m.some(function (k) { return fitsKey(it, k); }); }
  function myCourses() {
    var out = []; mine().forEach(function (k) { var c = planOf(k).course; if (c && out.indexOf(c) < 0) out.push(c); });
    if (S.teacher || !out.length) COURSES.forEach(function (c) { if (out.indexOf(c) < 0) out.push(c); });
    return out;
  }
  function pickerHTML(sel, kidsFirst) {
    var gs = kidsFirst ? [STUDY[3]].concat(STUDY.slice(0, 3), STUDY.slice(4)) : STUDY;
    return gs.map(function (g) { return '<div class="sg"><h3>' + g[1] + ' ' + esc(g[0]) + '</h3><div class="chips">' + g[2].map(function (x) { return '<button class="chip' + (sel.indexOf(x[0]) >= 0 ? ' on' : '') + '" data-s="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div></div>'; }).join('');
  }
  function vOnboard(step) {
    setNav('home');
    if (step !== 'pick') {
      view().innerHTML = '<div class="onb"><p class="h-eyebrow">IF English</p><h1>Who is learning?</h1><p class="lead">We\'ll show what fits — and keep the rest out of the way.</p><div class="pick">' +
        [['me', '🙋', 'Me', 'Teens and adults: General, Business, IELTS, KET, PET'], ['child', '🧸', 'My child', 'Young Learners (6–12) and Maths in English'], ['teach', '👩‍🏫', 'I am a teacher', 'Use every course in class with Teach mode']].map(function (g) { return '<button data-w="' + g[0] + '"><i>' + g[1] + '</i><span><b>' + g[2] + '</b><span>' + g[3] + '</span></span></button>'; }).join('') + '</div></div>';
      $$('[data-w]').forEach(function (b) { b.onclick = function () { S.who = b.dataset.w; S.teacher = S.who === 'teach'; save(); if (S.teacher) { S.study = S.study && S.study.length ? S.study : []; save(); return go('#/'); } vOnboard('pick'); }; });
      return;
    }
    var sel = (S.study || []).slice(), kid = S.who === 'child';
    view().innerHTML = '<div class="onb" style="text-align:left"><p class="h-eyebrow" style="text-align:center">Step 2 of 2</p><h1 style="text-align:center">' + (kid ? 'What should your child study?' : 'What do you want to study?') + '</h1><p class="lead" style="text-align:center">Choose up to <b>3 courses</b> and up to <b>2 coursebooks</b>. You can change them any time.</p><div class="study-pick">' + pickerHTML(sel, kid) + '</div>' +
      '<p style="text-align:center;margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn ghost" href="/a/placement-test/index.html">🧭 Not sure? Placement test</a><button class="btn gold" id="ok">Save →</button></p></div>';
    $$('[data-s]').forEach(function (b) { b.onclick = function () { var k = b.dataset.s, i = sel.indexOf(k), book = /^book:/.test(k);
      if (i < 0 && sel.filter(function (x) { return /^book:/.test(x) === book; }).length >= (book ? 2 : 3)) return toast(book ? 'Up to 2 coursebooks.' : 'Up to 3 courses — untick one first.');
      if (i >= 0) sel.splice(i, 1); else sel.push(k); b.classList.toggle('on', i < 0); }; });
    $('#ok').onclick = function () { if (!sel.length) return toast('Choose at least one.'); S.study = sel; S.active = sel[0]; save(); saveStudy(sel); go('#/'); };
  }
  function saveStudy(sel) {   // keep the account in step (My account shows the same choices)
    if (!ME || !ME.profile) return;
    fetch('/api/school/profile', { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ study: sel, goals: sel.map(function (k) { return SNAME[k]; }).join(', ') }) }).catch(function () {});
  }

  /* ---------- home ---------- */
  function vHome() {
    setNav('home');
    var a = access();
    if (!mine().length && !S.teacher) return vOnboard();
    var keys = mine(), act = keys.indexOf(S.active) >= 0 ? S.active : keys[0], P = act ? planOf(act) : {};
    var main = P.course || (S.teacher ? COURSES[0] : null), nx = main && nextLesson(main), st = main ? courseStats(main) : { p: 0, d: 0 };
    var goalPct = Math.min(100, Math.round((S.today.d === day() ? S.today.xp : 0) / GOAL_XP * 100));
    var lvPct = P.level && LEVELS.indexOf(P.level) >= 0 ? (function () { var cs = COURSES.filter(function (c) { return c.level === P.level && (c.track === 'general' || c.track === 'business'); }); var n = 0, d = 0; cs.forEach(function (c) { var s2 = courseStats(c); n += s2.n; d += s2.d; }); return n ? Math.round(d / n * 100) : 0; })() : null;
    var nextLv = P.level ? LEVELS[LEVELS.indexOf(P.level) + 1] : null;
    var html = '<div class="page-h"><div><p class="h-eyebrow">' + (S.teacher ? '👩‍🏫 Teacher' : S.who === 'child' ? '🧸 Young learner' : 'IF English') + '</p><h1>' + (a.name ? 'Hi, ' + esc(a.name.split(' ')[0]) + '!' : 'Welcome to IF English') + '</h1></div><a class="chip" href="#/onboard">✎ My courses</a></div>' +
      (keys.length ? '<div class="chips mycourses">' + keys.map(function (k) { return '<button class="chip' + (k === act ? ' on' : '') + '" data-a="' + k + '">' + SICON[k] + ' ' + esc(SNAME[k]) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="hello"><div class="plan">' + (main ? '<p class="h-eyebrow" style="color:var(--gold2)">' + esc(t('yourPlan')) + '</p><h2>' + (nx ? esc(nx.l.title) : 'Course complete! 🎉') + '</h2><p>' + esc(main.title) + (nx ? ' · ' + esc(t('unit')) + ' ' + (nx.ui + 1) + ': ' + esc(nx.u.title) : '') + '</p>' +
        (nx ? '<a class="btn gold" href="#/lesson/' + main.id + '/' + nx.u.id + '/' + nx.l.id + '">' + (st.d ? t('cont') : t('start')) + ' →</a>' : '<a class="btn gold" href="#/courses">Next course →</a>')
        : '<p class="h-eyebrow" style="color:var(--gold2)">' + esc(t('yourPlan')) + '</p><h2>' + esc(P.name || '') + '</h2><p>' + (P.voc ? 'Start with the vocabulary course, then play and test yourself.' : 'Choose a course.') + '</p>' + (P.voc ? '<a class="btn gold" href="' + esc(P.voc.href) + '">' + esc(P.voc.t) + ' →</a>' : '<a class="btn gold" href="#/courses">Courses →</a>')) +
        (lvPct != null ? '<div class="lvbar"><div class="row"><span>' + esc(P.level) + (nextLv ? ' → ' + nextLv : '') + '</span><span>' + lvPct + '%</span></div><div class="bar"><i style="width:' + lvPct + '%"></i></div></div>' : '') + '</div>' +
      '<div class="goal"><div class="ring" style="--p:' + goalPct + '"><b>' + (S.today.d === day() ? S.today.xp : 0) + '<small>/ ' + GOAL_XP + ' XP</small></b></div><div><h3>' + esc(t('dailyGoal')) + '</h3><p style="margin:4px 0 0;color:var(--soft)">🔥 ' + S.streak + ' ' + esc(t('streak')) + ' · ⚡ ' + S.xp + ' XP</p>' +
        '<p style="margin:8px 0 0;font-size:14px;color:var(--soft)">One lesson ≈ 12–15 XP. Two lessons a day keeps your streak alive.</p></div></div></div>' +
      '<div class="sec"><h2>Today\'s three steps</h2></div><div class="steps">' +
        step(1, main && nx ? { href: '#/lesson/' + main.id + '/' + nx.u.id + '/' + nx.l.id, t: nx.l.title, d: main.title + ' · ' + TYPE[nx.l.type] } : P.voc ? { href: P.voc.href, t: P.voc.t, d: 'Next unit' } : null, 'Lesson') +
        step(2, P.voc && main ? { href: P.voc.href, t: P.voc.t, d: 'Learn 10 new words' } : P.test ? { href: P.test.href, t: P.test.t, d: 'Check your progress' } : null, 'Words') +
        step(3, P.game ? { href: '#/play/' + P.game.id, t: P.game.t, d: 'Play to review' } : null, 'Game') +
      '</div>' +
      (S.teacher || a.teacher ? teacherBox(a) : '') +
      '<div class="sec"><h2>' + esc(t('forYou')) + '</h2><a href="#/courses">' + esc(t('all')) + ' →</a></div><div class="grid">' + myCourses().slice(0, 6).map(courseCard).join('') + '</div>';
    view().innerHTML = html;
    $$('[data-a]').forEach(function (b) { b.onclick = function () { S.active = b.dataset.a; save(); vHome(); }; });
  }
  function step(n, x, label) {
    if (!x) return '';
    return '<a class="step" href="' + esc(x.href) + '"><span class="n">' + n + '</span><span><b>' + esc(x.t) + '</b><span>' + esc(label + ' · ' + x.d) + '</span></span><span class="go">›</span></a>';
  }
  function teacherBox(a) {
    return '<div class="sec"><h2>👩‍🏫 For teachers</h2></div><div class="card" style="flex-direction:row;gap:16px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:240px"><h3>Teach with IF English</h3><p>Open any lesson in <b>Teach mode</b>: big text for the projector, answers shown when you choose, and class games in IF Live.</p></div>' +
      (a.teacher ? '<span class="tbadge">TEACHER PLAN ACTIVE</span>' : '<a class="btn gold" href="/me/#/register/teacher">Get the Teacher plan</a>') + '</div>';
  }
  function courseCard(c) {
    var s = courseStats(c);
    return '<a class="card" href="#/course/' + c.id + '"><span class="ic">' + c.icon + '</span><h3>' + esc(c.title) + '</h3><p>' + esc(c.sub) + '</p>' +
      '<div class="bar" style="height:10px;margin-top:6px"><i style="width:' + s.p + '%"></i></div><div class="meta"><span class="tag ' + tagFor(c.track) + '">' + esc(c.level) + '</span><span class="tag">' + c.units.length + ' units · ' + s.n + ' lessons</span>' + (s.d ? '<span class="tag">' + s.p + '% done</span>' : '') + '</div></a>';
  }

  /* ---------- courses ---------- */
  var CTRACK = [['all', 'All'], ['general', 'General English'], ['business', 'Business English'], ['exam', 'IELTS'], ['kids', 'Young learners']];
  function vCourses(f) {
    setNav('courses'); f = f || 'all';
    var list = COURSES.filter(function (c) { return f === 'all' || c.track === f; });
    view().innerHTML = '<div class="page-h"><div><p class="h-eyebrow">' + esc(t('courses')) + '</p><h1>Real English courses</h1><p>Each unit: new words, the grammar, a reading with photos, and a unit check. Finish a level to unlock the next one.</p></div></div>' +
      '<div class="chips">' + CTRACK.map(function (x) { return '<button class="chip' + (x[0] === f ? ' on' : '') + '" data-f="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' +
      '<div class="grid">' + list.map(courseCard).join('') + '</div>' +
      '<div class="sec"><h2>More courses coming</h2></div><div class="grid">' +
        [['🌱', 'General English A1', 'Beginner'], ['🌲', 'General English B2', 'Upper-intermediate'], ['🏔️', 'General English C1', 'Advanced'], ['💼', 'Business English B2', 'Negotiating, presenting, reports']].map(function (x) { return '<div class="card" style="opacity:.6"><span class="ic">' + x[0] + '</span><h3>' + x[1] + '</h3><p>' + x[2] + '</p><div class="meta"><span class="tag">Coming soon</span></div></div>'; }).join('') + '</div>';
    $$('[data-f]').forEach(function (b) { b.onclick = function () { vCourses(b.dataset.f); }; });
  }
  function vCourse(id) {
    setNav('courses');
    var c = BY[id]; if (!c) return go('#/courses');
    var s = courseStats(c), nx = nextLesson(c), a = access();
    var html = '<div class="course-head"><span class="ic">' + c.icon + '</span><div class="grow"><p class="h-eyebrow">' + esc(c.level) + ' · ' + esc(c.track === 'exam' ? 'Exam' : c.track === 'business' ? 'Business English' : c.track === 'kids' ? 'Young learners' : 'General English') + '</p><h1 style="font-size:28px">' + esc(c.title) + '</h1><p style="margin:4px 0 8px;color:var(--soft)">' + esc(c.blurb) + '</p><div class="bar" style="height:12px"><i style="width:' + s.p + '%"></i></div><p style="margin:6px 0 0;font-size:13.5px;color:var(--soft)">' + s.d + ' / ' + s.n + ' lessons · ' + s.p + '%' + (c.next ? ' · then: ' + esc(c.next) : '') + '</p></div></div>';
    c.units.forEach(function (u, ui) {
      var open = unlocked(ui);
      html += '<section class="unit"><div class="unit-h">' + DOODLE(c.id, u.id, 'doodle uh') + '<div style="flex:1"><small>' + esc(t('unit')) + ' ' + (ui + 1) + ' · ' + esc(u.topic) + '</small><h3>' + esc(u.title) + '</h3></div>' + (open ? '' : '<a class="btn sm gold" href="/me/#/upgrade">🔒 ' + esc(t('locked')) + '</a>') + '</div><div class="path">' +
        u.lessons.map(function (l) {
          var done = isDone(c.id, u.id, l.id), isNext = nx && nx.u.id === u.id && nx.l.id === l.id;
          return '<a class="node' + (done ? ' done' : '') + (isNext ? ' next' : '') + (open ? '' : ' locked') + '" style="--c:' + COLORS[l.type] + '" href="' + (open ? '#/lesson/' + c.id + '/' + u.id + '/' + l.id : '/me/#/upgrade') + '"><span class="b">' + (open ? ICONS[l.type] : '🔒') + '</span><span>' + esc(l.title) + '</span><em>' + esc(TYPE[l.type]) + (done ? ' · ' + S.done[key3(c.id, u.id, l.id)].score + '%' : '') + '</em></a>';
        }).join('') + '</div></section>';
    });
    if (a.teacher) html += '<p style="text-align:center;color:var(--soft)">👩‍🏫 Teacher: open a lesson and press <b>Teach mode</b> to show it on the projector.</p>';
    view().innerHTML = html;
  }

  /* ---------- lesson player ---------- */
  var L = null;   // current lesson state
  function vLesson(cid, uid, lid, teach) {
    setNav('courses');
    var c = BY[cid]; if (!c) return go('#/courses');
    var ui = c.units.findIndex(function (u) { return u.id === uid; }); var u = c.units[ui]; if (!u) return go('#/course/' + cid);
    var l = u.lessons.filter(function (x) { return x.id === lid; })[0]; if (!l) return go('#/course/' + cid);
    if (!unlocked(ui)) { if (!meLoaded) { view().innerHTML = '<p style="text-align:center;margin-top:40px">Loading…</p>'; return; } return go('#/course/' + cid); }
    teach = !!teach && access().teacher;
    document.body.classList.toggle('teach', teach);
    var items = [];
    if (l.type === 'vocab') { items.push({ k: 'learn' }); items = items.concat(vocabEx(l.words)); }
    if (l.gen) l.ex = l.gen.map(function (f) { return f(); });   // fresh numbers every time
    if (l.type === 'vocab') {}
    else if (l.type === 'grammar' || l.type === 'skill' || l.type === 'maths') { items.push({ k: 'rule' }); items = items.concat(l.ex.map(function (e) { return { k: 'ex', e: e }; })); }
    else if (l.type === 'reading') { items.push({ k: 'read' }); items = items.concat(l.ex.map(function (e) { return { k: 'ex', e: e }; })); }
    else items = l.ex.map(function (e) { return { k: 'ex', e: e }; });
    L = { c: c, u: u, ui: ui, l: l, items: items, i: 0, total: items.filter(function (x) { return x.k === 'ex'; }).length, right: 0, tried: {}, card: 0, teach: teach };
    drawStep();
  }
  function kidsEx(words) {   // picture words: find it, name it, listen and choose
    var w = shuffle(words), out = [], three = function (x) { return shuffle([x].concat(shuffle(words.filter(function (y) { return y !== x; })).slice(0, 2))); };
    w.slice(0, 3).forEach(function (x) { var o = three(x); out.push({ k: 'ex', e: { t: 'picmc', q: 'Find the ' + x.w + '.', say: x.w, o: o.map(function (y) { return y.pic; }), a: o.indexOf(x) } }); });
    w.slice(3, 5).forEach(function (x) { var o = three(x); out.push({ k: 'ex', e: { t: 'mc', pic: x.pic, q: 'What is it?', o: o.map(function (y) { return y.w; }), a: o.indexOf(x), say: x.w } }); });
    w.slice(5).concat(w.slice(0, 1)).slice(0, 2).forEach(function (x) { var o = three(x); out.push({ k: 'ex', e: { t: 'picmc', q: 'Listen and choose.', listen: x.w, o: o.map(function (y) { return y.pic; }), a: o.indexOf(x) } }); });
    out.push({ k: 'ex', e: { t: 'match', p: shuffle(words).slice(0, 4).map(function (x) { return [x.w, x.ru || x.d]; }) } });
    return out;
  }
  function vocabEx(words) {
    if (words[0] && words[0].pic) return kidsEx(words);
    var w = shuffle(words), out = [];
    w.slice(0, 4).forEach(function (x) { var o = shuffle([x].concat(shuffle(words.filter(function (y) { return y !== x; })).slice(0, 2))); out.push({ k: 'ex', e: { t: 'mc', q: 'What does “' + x.w + '” mean?', o: o.map(function (y) { return y.d; }), a: o.indexOf(x), say: x.w } }); });
    w.slice(4, 8).forEach(function (x) { var re = new RegExp(x.w.split(' ')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*', 'i'); var m = x.e.match(re); if (!m) return; var o = shuffle([x].concat(shuffle(words.filter(function (y) { return y !== x; })).slice(0, 2))); out.push({ k: 'ex', e: { t: 'mc', q: x.e.replace(x.w.split(' ').length > 1 ? new RegExp(x.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*', 'i') : re, '_____'), o: o.map(function (y) { return y.w; }), a: o.indexOf(x), why: x.e } }); });
    out.push({ k: 'ex', e: { t: 'match', p: shuffle(words).slice(0, 4).map(function (x) { return [x.w, x.ru || x.d]; }) } });
    return out;
  }
  function pTop() {
    var p = L.items.length ? Math.round(L.i / L.items.length * 100) : 0;
    return '<div class="p-top"><button class="x" id="px" aria-label="Close">✕</button><div class="bar"><i style="width:' + p + '%"></i></div>' + (access().teacher ? '<button class="chip' + (L.teach ? ' on' : '') + '" id="tm">👩‍🏫 ' + esc(t('teach')) + '</button>' : '') + '</div><p class="p-title">' + esc(TYPE[L.l.type]) + ' · ' + esc(L.l.title) + '</p>';
  }
  function bindTop() {
    $('#px').onclick = function () { document.body.classList.remove('teach'); go('#/course/' + L.c.id); };
    var tm = $('#tm'); if (tm) tm.onclick = function () { L.teach = !L.teach; document.body.classList.toggle('teach', L.teach); drawStep(); };
  }
  function drawStep() {
    var it = L.items[L.i]; if (!it) return finish();
    var v = view();
    if (it.k === 'learn') {
      var w = L.l.words[L.card];
      v.innerHTML = '<div class="player">' + pTop() + '<div class="learn-card">' + (w.pic ? '<div class="qpic">' + PIC(w.pic, 'pic big') + '</div>' : L.card === 0 ? '<div class="qpic">' + DOODLE(L.c.id, L.u.id, 'doodle lc') + '</div>' : '') + '<button class="say" id="sy" aria-label="Listen">🔊</button><div class="w">' + esc(w.w) + '</div><div class="pos">' + esc(w.p) + '</div><div class="d">' + esc(w.d) + '</div><div class="e">“' + esc(w.e) + '”</div>' + (w.ru ? '<span class="ru">🇷🇺 ' + esc(w.ru) + '</span>' : '') + '</div>' +
        '<div class="dots">' + L.l.words.map(function (_, k) { return '<i class="' + (k === L.card ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
        '<div style="display:flex;gap:10px;justify-content:center"><button class="btn ghost" id="pv"' + (L.card ? '' : ' disabled') + '>‹</button><button class="btn" id="nx">' + (L.card < L.l.words.length - 1 ? t('next') + ' ›' : 'Practise →') + '</button></div></div>';
      bindTop(); say(w.w);
      $('#sy').onclick = function () { say(w.w + '. ' + w.e); };
      $('#pv').onclick = function () { L.card--; drawStep(); };
      $('#nx').onclick = function () { if (L.card < L.l.words.length - 1) { L.card++; drawStep(); } else { L.i++; drawStep(); } };
      return;
    }
    if (it.k === 'rule') {
      v.innerHTML = '<div class="player">' + pTop() + '<div class="rulehead"><h2 class="qh">' + esc(L.l.title) + '</h2>' + DOODLE(L.c.id, L.u.id, 'doodle rh') + '</div><div class="rule">' + L.l.rule + '</div><p style="text-align:center;margin-top:18px"><button class="btn" id="nx">Practise →</button></p></div>';
      bindTop(); $('#nx').onclick = function () { L.i++; drawStep(); }; return;
    }
    if (it.k === 'read') {
      v.innerHTML = '<div class="player">' + pTop() + '<article class="reading">' + (L.l.chart ? '<div class="chart">' + chartSVG() + '</div>' : photo(L.l.photo, L.l.alt)) + '<h3>' + esc(L.l.title) + '</h3><div class="txt">' + paras(L.l.text) + '</div></article>' +
        '<p style="text-align:center;margin-top:18px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn ghost" id="sy">🔊 Listen</button><button class="btn" id="nx">Questions →</button></p></div>';
      bindTop(); $('#sy').onclick = function () { say(L.l.text.replace(/\n+/g, ' ')); }; $('#nx').onclick = function () { try { speechSynthesis.cancel(); } catch (e) {} L.i++; drawStep(); }; return;
    }
    drawEx(it.e);
  }
  var paras = function (s) { return String(s).split(/\n\s*\n/).map(function (p) { return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>'; }).join(''); };
  function drawEx(e) {
    var v = view(), peek = L.l.type === 'reading' ? '<details class="peek"><summary>📖 Look at the text</summary><div class="txt">' + paras(L.l.text) + '</div></details>' : '';
    var body = '';
    var vis = (e.pic ? '<div class="qpic">' + PIC(e.pic, 'pic big') + '</div>' : '') + (e.scene ? scene(e.scene) : '');
    var sayBtn = e.say || e.listen ? ' <button class="say" style="width:38px;height:38px;font-size:16px;vertical-align:middle" id="sq" aria-label="Listen">🔊</button>' : '';
    if (e.t === 'mc' || e.t === 'tf') {
      var opts = e.t === 'tf' ? ['True', 'False'] : e.o;
      body = vis + '<h2 class="qh">' + esc(e.q) + sayBtn + '</h2><div class="opts">' + opts.map(function (o, k) { return '<button class="opt" data-k="' + k + '">' + esc(o) + '</button>'; }).join('') + '</div>';
    } else if (e.t === 'picmc') {
      body = vis + '<h2 class="qh">' + esc(e.q) + sayBtn + '</h2><div class="opts pics">' + e.o.map(function (o, k) { return '<button class="opt" data-k="' + k + '" aria-label="Picture ' + (k + 1) + '">' + PIC(o, 'pic') + '</button>'; }).join('') + '</div>';
    } else if (e.t === 'gap') {
      body = '<h2 class="qh">Complete the sentence.</h2><p class="gapq">' + esc(e.q).replace('___', '<input id="gi" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Answer">') + '</p>';
    } else if (e.t === 'order') {
      var ws = e.a.replace(/[.?!]$/, '').split(' '), punct = (e.a.match(/[.?!]$/) || [''])[0];
      L.ord = { ws: shuffle(ws.map(function (w, k) { return { w: w, k: k }; })), pick: [], punct: punct };
      while (L.ord.ws.map(function (x) { return x.w; }).join(' ') === ws.join(' ') && ws.length > 2) L.ord.ws = shuffle(L.ord.ws);
      body = '<h2 class="qh">Put the words in order.</h2><div class="ord-line" id="ol"></div><div class="ord-bank" id="ob"></div>';
    } else if (e.t === 'match') {
      L.mt = { left: shuffle(e.p.map(function (p, k) { return { s: p[0], k: k }; })), right: shuffle(e.p.map(function (p, k) { return { s: p[1], k: k }; })), sel: null, ok: 0, miss: 0 };
      body = '<h2 class="qh">Match the pairs.</h2><div class="match"><div class="opts" id="ml">' + L.mt.left.map(function (x) { return '<button class="opt" data-k="' + x.k + '">' + esc(x.s) + '</button>'; }).join('') + '</div><div class="opts" id="mr">' + L.mt.right.map(function (x) { return '<button class="opt" data-k="' + x.k + '">' + esc(x.s) + '</button>'; }).join('') + '</div></div>';
    }
    var teach = L.teach ? '<div class="teachbar"><button class="btn ghost sm" id="rv">👁 ' + esc(t('reveal')) + '</button><button class="btn sm" id="tn">' + esc(t('next')) + ' ›</button></div>' : '';
    v.innerHTML = '<div class="player">' + pTop() + peek + body + teach + '</div>' + (e.t === 'mc' || e.t === 'tf' || e.t === 'picmc' || e.t === 'match' || L.teach ? '' : '<div class="fb" id="fb"><div class="fb-in"><span class="msg"></span><button class="btn" id="ck" disabled>' + esc(t('check')) + '</button></div></div>');
    bindTop();
    if (e.say || e.listen) { $('#sq').onclick = function () { say(e.listen || e.say); }; if (e.listen || e.t === 'picmc') setTimeout(function () { say(e.listen || e.say); }, 250); }
    if (L.teach) {
      $('#rv').onclick = function () { reveal(e); };
      $('#tn').onclick = function () { L.i++; drawStep(); };
    }
    if (e.t === 'mc' || e.t === 'tf' || e.t === 'picmc') {
      $$('.opts .opt').forEach(function (b) { b.onclick = function () { if (L.teach) { b.classList.add('sel'); return; } var k = +b.dataset.k, ok = e.t === 'tf' ? (k === 0) === e.a : k === e.a; $$('.opts .opt').forEach(function (x) { x.disabled = true; }); b.classList.add(ok ? 'ok' : 'bad'); if (!ok) $$('.opts .opt')[e.t === 'tf' ? (e.a ? 0 : 1) : e.a].classList.add('ok'); result(ok, e); }; });
    } else if (e.t === 'gap') {
      var gi = $('#gi'), ck = $('#ck'); if (!L.teach) { gi.oninput = function () { ck.disabled = !gi.value.trim(); }; gi.onkeydown = function (ev) { if (ev.key === 'Enter' && gi.value.trim()) ck.click(); }; setTimeout(function () { gi.focus(); }, 50);
        ck.onclick = function () { var val = norm(gi.value), ok = e.a.some(function (x) { return norm(x) === val || norm(x).replace(/^i /, '') === val; }); gi.classList.add(ok ? 'ok' : 'bad'); gi.disabled = true; result(ok, e, ok ? '' : e.a[0]); }; }
    } else if (e.t === 'order') {
      drawOrder(e);
    } else if (e.t === 'match') {
      bindMatch(e);
    }
  }
  var norm = function (s) { return String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, ' ').replace(/[.?!]$/, '').trim(); };
  function reveal(e) {
    if (e.t === 'mc' || e.t === 'picmc') $$('.opts .opt')[e.a].classList.add('ok');
    else if (e.t === 'tf') $$('.opts .opt')[e.a ? 0 : 1].classList.add('ok');
    else if (e.t === 'gap') { var gi = $('#gi'); gi.value = e.a[0]; gi.classList.add('ok'); }
    else if (e.t === 'order') { $('#ol').innerHTML = '<b style="font-size:22px">' + esc(e.a) + '</b>'; }
    else if (e.t === 'match') { $('.match').innerHTML = '<div class="rule" style="grid-column:1/-1">' + e.p.map(function (p) { return '<p><b>' + esc(p[0]) + '</b> — ' + esc(p[1]) + '</p>'; }).join('') + '</div>'; }
    if (e.why) toast(e.why);
  }
  function drawOrder(e) {
    var ol = $('#ol'), ob = $('#ob'), ck = $('#ck');
    ol.innerHTML = L.ord.pick.map(function (x, k) { return '<button class="wchip" data-p="' + k + '">' + esc(x.w) + '</button>'; }).join('');
    ob.innerHTML = L.ord.ws.map(function (x, k) { var used = L.ord.pick.indexOf(x) >= 0; return '<button class="wchip' + (used ? ' used' : '') + '" data-b="' + k + '">' + esc(x.w) + '</button>'; }).join('');
    $$('[data-b]', ob).forEach(function (b) { b.onclick = function () { var x = L.ord.ws[+b.dataset.b]; if (L.ord.pick.indexOf(x) < 0) { L.ord.pick.push(x); drawOrder(e); } }; });
    $$('[data-p]', ol).forEach(function (b) { b.onclick = function () { L.ord.pick.splice(+b.dataset.p, 1); drawOrder(e); }; });
    if (ck) { ck.disabled = L.ord.pick.length !== L.ord.ws.length; ck.onclick = function () { var got = L.ord.pick.map(function (x) { return x.w; }).join(' ') + L.ord.punct, ok = norm(got) === norm(e.a); result(ok, e, ok ? '' : e.a); }; }
  }
  function bindMatch(e) {
    var M = L.mt;
    $$('#ml .opt, #mr .opt').forEach(function (b) {
      b.onclick = function () {
        if (L.teach) return;
        var side = b.parentNode.id;
        if (!M.sel || M.sel.parentNode.id === side) { if (M.sel) M.sel.classList.remove('sel'); M.sel = b; b.classList.add('sel'); return; }
        var a = M.sel; M.sel = null; a.classList.remove('sel');
        if (a.dataset.k === b.dataset.k) { a.classList.add('gone'); b.classList.add('gone'); M.ok++; beep(true); if (M.ok === e.p.length) result(M.miss === 0, e, '', true); }
        else { M.miss++; beep(false); a.classList.add('bad'); b.classList.add('bad'); setTimeout(function () { a.classList.remove('bad'); b.classList.remove('bad'); }, 500); }
      };
    });
  }
  function result(ok, e, ans, quiet) {
    var it = L.items[L.i];
    if (!it.retry) { if (ok) L.right++; }
    if (!ok && !it.retry) L.items.push({ k: it.k, e: it.e, retry: true });   // one more try at the end (not scored)
    if (!quiet) beep(ok);
    var fb = $('#fb');
    if (!fb) { fb = document.createElement('div'); fb.className = 'fb'; fb.id = 'fb'; fb.innerHTML = '<div class="fb-in"><span class="msg"></span><button class="btn" id="ck"></button></div>'; document.body.appendChild(fb); }
    fb.className = 'fb ' + (ok ? 'ok' : 'bad');
    $('.msg', fb).innerHTML = '<b>' + (ok ? '✓ ' + esc(t('correct')) : '✗ ' + esc(t('wrong'))) + '</b>' + (ans ? '<span>' + esc(t('answer')) + ': <b style="display:inline;font-size:inherit">' + esc(ans) + '</b></span>' : '') + (e.why ? '<span style="display:block">' + esc(e.why) + '</span>' : '');
    var ck = $('#ck'); ck.disabled = false; ck.className = 'btn ' + (ok ? 'ok' : 'bad'); ck.textContent = t('cont');
    ck.onclick = function () { fb.remove(); L.i++; drawStep(); }; setTimeout(function () { ck.focus(); }, 30);
  }
  function finish() {
    var fb = $('#fb'); if (fb) fb.remove();
    document.body.classList.remove('teach'); document.body.classList.remove('playing');
    var score = L.total ? Math.round(L.right / L.total * 100) : 100;
    var k = key3(L.c.id, L.u.id, L.l.id), first = !S.done[k];
    var xp = (first ? 10 : 4) + Math.round(score / 20);
    S.done[k] = { score: Math.max(score, (S.done[k] || {}).score || 0), at: Date.now() };
    if (L.l.words) L.l.words.forEach(function (w) { S.words[w.w] = 1; });
    addXP(xp);
    var nx = nextLesson(L.c), st = courseStats(L.c);
    view().innerHTML = '<div class="player done-box"><div class="big">' + (score >= 80 ? '🏆' : score >= 50 ? '⭐' : '💪') + '</div><h2>' + (score >= 80 ? 'Excellent!' : score >= 50 ? 'Well done!' : 'Good effort!') + '</h2><p style="color:var(--soft)">' + esc(L.l.title) + ' · ' + esc(L.c.title) + '</p>' +
      '<div class="kpis"><div class="kpi"><b>+' + xp + '</b><span>XP</span></div><div class="kpi"><b>' + score + '%</b><span>accuracy</span></div><div class="kpi"><b>🔥 ' + S.streak + '</b><span>' + esc(t('streak')) + '</span></div></div>' +
      '<div class="bar" style="max-width:420px;margin:0 auto 6px;height:12px;background:var(--line)"><i style="width:' + st.p + '%"></i></div><p style="color:var(--soft);font-size:14px">' + esc(L.c.title) + ': ' + st.p + '%</p>' +
      '<p style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px"><a class="btn ghost" href="#/course/' + L.c.id + '">Course map</a>' +
      (nx ? (unlocked(nx.ui) ? '<a class="btn gold" href="#/lesson/' + L.c.id + '/' + nx.u.id + '/' + nx.l.id + '">Next: ' + esc(nx.l.title) + ' →</a>' : '<a class="btn gold" href="/me/#/upgrade">🔒 Unlock the next unit</a>') : '<a class="btn gold" href="#/courses">🎉 Course complete — next level</a>') + '</p></div>';
    confetti(score >= 50 ? 120 : 40);
    setNav('courses');
  }
  function confetti(n) {
    var c = document.createElement('canvas'); c.className = 'confetti'; c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
    var x = c.getContext('2d'), P = []; for (var i = 0; i < n; i++) P.push({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * .5, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 4, r: Math.random() * 6.28, s: 5 + Math.random() * 6, c: ['#C9A227', '#0B2545', '#16a34a', '#2f80ed', '#ea580c', '#db2777'][i % 6] });
    var f = 0; (function tick() { f++; x.clearRect(0, 0, c.width, c.height); P.forEach(function (p) { p.x += p.vx; p.y += p.vy; p.r += .1; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); }); if (f < 160) requestAnimationFrame(tick); else c.remove(); })();
  }
  function chartSVG() {   // line graph for the IELTS Task 1 model answer
    var W = 560, H = 300, P = 44, xs = [2005, 2015, 2025], data = [['Germany', '#0B2545', [60, 80, 95]], ['Kazakhstan', '#C9A227', [10, 70, 90]], ['Brazil', '#16a34a', [15, 50, 85]]];
    var X = function (i) { return P + i * (W - P * 2) / 2; }, Y = function (v) { return H - P - v / 100 * (H - P * 1.8); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Households with internet access, 2005–2025"><text x="' + W / 2 + '" y="18" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">Households with internet access (%)</text>';
    [0, 25, 50, 75, 100].forEach(function (v) { s += '<line x1="' + P + '" x2="' + (W - P) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="#999" stroke-opacity=".25"/><text x="' + (P - 8) + '" y="' + (Y(v) + 4) + '" font-size="11" text-anchor="end" fill="currentColor" opacity=".7">' + v + '</text>'; });
    xs.forEach(function (yr, i) { s += '<text x="' + X(i) + '" y="' + (H - P + 18) + '" font-size="12" text-anchor="middle" fill="currentColor" opacity=".8">' + yr + '</text>'; });
    data.forEach(function (d, k) { s += '<polyline fill="none" stroke="' + d[1] + '" stroke-width="3.5" stroke-linejoin="round" points="' + d[2].map(function (v, i) { return X(i) + ',' + Y(v); }).join(' ') + '"/>' + d[2].map(function (v, i) { return '<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="4.5" fill="' + d[1] + '"/>'; }).join('') + '<rect x="' + (P + 10 + k * 130) + '" y="' + (H - 16) + '" width="14" height="5" fill="' + d[1] + '"/><text x="' + (P + 30 + k * 130) + '" y="' + (H - 10) + '" font-size="12" fill="currentColor">' + d[0] + '</text>'; });
    return s + '</svg>';
  }

  /* ---------- directory sections (vocabulary, grammar, games, tests, IELTS) ---------- */
  var SEC = {
    vocab: { h: 'Vocabulary', p: 'Words by level, by coursebook and for exams — with audio, games and progress.', f: [['fit', 'For you'], ['level', 'By level'], ['general', 'General'], ['business', 'Business'], ['exam', 'Exams'], ['book', 'Coursebooks'], ['kids', 'Kids'], ['all', 'All']] },
    grammar: { h: 'Grammar', p: 'Grammar from A1 to C2: short explanations, then practice and games.', f: [['fit', 'For you'], ['A1', 'A1'], ['A2', 'A2'], ['B1', 'B1'], ['B2', 'B2'], ['C1', 'C1'], ['C2', 'C2'], ['all', 'All']] },
    games: { h: 'Games', p: 'Learn by playing — alone, or with your class on the big screen.', f: [['fit', 'For you'], ['vocabulary', 'Vocabulary'], ['grammar', 'Grammar'], ['ket', 'KET'], ['pet', 'PET'], ['kids', 'Kids'], ['class', 'Class games'], ['all', 'All']] },
    tests: { h: 'Tests', p: 'Find your level, check your progress and prepare for exams. Results are saved to your account.', f: [['fit', 'For you'], ['book', 'Coursebook tests'], ['cambridge', 'Cambridge'], ['ielts', 'IELTS'], ['kids', 'Kids'], ['all', 'All']] }
  };
  function match(it, f) {
    if (f === 'all') return true; if (f === 'fit') return fits(it);
    if (LEVELS.indexOf(f) >= 0) return (it.lv || []).indexOf(f) >= 0;
    if (f === 'general' || f === 'business' || f === 'exam' || f === 'kids') return it.tr === f || (it.tags || []).indexOf(f) >= 0;
    return (it.tags || []).indexOf(f) >= 0;
  }
  function itemCard(it) {
    return '<a class="card" href="' + (it.s === 'games' ? '#/play/' + it.id : esc(it.href)) + '"><span class="ic">' + it.icon + '</span><h3>' + esc(it.t) + '</h3><p>' + esc(it.d) + '</p><div class="meta">' + (it.lv || []).slice(0, 3).map(function (l) { return '<span class="tag ' + tagFor(it.tr) + '">' + l + '</span>'; }).join('') + ((it.lv || []).length > 3 ? '<span class="tag">+</span>' : '') + (it.tr === 'exam' ? '<span class="tag ex">Exam</span>' : it.tr === 'kids' ? '<span class="tag kd">Kids</span>' : '') + '</div></a>';
  }
  function lessonsOf(type) {   // course lessons of a kind, as cards
    var out = [];
    COURSES.forEach(function (c) { c.units.forEach(function (u, ui) { u.lessons.forEach(function (l) { if (type.indexOf(l.type) >= 0) out.push({ c: c, u: u, ui: ui, l: l }); }); }); });
    return out;
  }
  function lessonCard(x) {
    var done = isDone(x.c.id, x.u.id, x.l.id), open = unlocked(x.ui);
    return '<a class="card" href="' + (open ? '#/lesson/' + x.c.id + '/' + x.u.id + '/' + x.l.id : '/me/#/upgrade') + '">' + (open ? '' : '<span class="lock">🔒</span>') + '<span class="ic">' + ICONS[x.l.type] + '</span><h3>' + esc(x.l.title) + '</h3><p>' + esc(x.c.title) + ' · ' + esc(t('unit')) + ' ' + (x.ui + 1) + '</p><div class="meta"><span class="tag ' + tagFor(x.c.track) + '">' + esc(x.c.level) + '</span>' + (done ? '<span class="tag" style="background:var(--ok-bg);color:var(--ok)">✓ ' + S.done[key3(x.c.id, x.u.id, x.l.id)].score + '%</span>' : '') + '</div></a>';
  }
  function vSection(k, f) {
    setNav(k); var sc = SEC[k]; f = f || (mine().length ? 'fit' : 'all');
    var items = IFX_DIR.filter(function (x) { return x.s === k && match(x, f); });
    var extra = '';
    if (k === 'vocab') { var vl = lessonsOf(['vocab']).filter(function (x) { return f === 'all' || f === 'level' || (f === 'business' ? x.c.track === 'business' : f === 'exam' ? x.c.track === 'exam' : f === 'general' ? x.c.track === 'general' : f === 'fit' ? myCourses().indexOf(x.c) >= 0 : false); }); if (vl.length) extra = '<div class="sec"><h2>Vocabulary lessons</h2></div><div class="grid">' + vl.map(lessonCard).join('') + '</div>'; }
    if (k === 'grammar') { var gl = lessonsOf(['grammar']).filter(function (x) { return f === 'all' || f === 'fit' ? (f === 'all' || myCourses().indexOf(x.c) >= 0) : x.c.level === f; }); if (gl.length) extra = '<div class="sec"><h2>Grammar lessons</h2></div><div class="grid">' + gl.map(lessonCard).join('') + '</div>'; }
    view().innerHTML = '<div class="page-h"><div><p class="h-eyebrow">' + esc(t(k)) + '</p><h1>' + esc(sc.h) + '</h1><p>' + esc(sc.p) + '</p></div></div>' +
      '<div class="chips">' + sc.f.map(function (x) { return '<button class="chip' + (x[0] === f ? ' on' : '') + '" data-f="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' +
      (k === 'grammar' ? extra : '') + (items.length ? (k === 'grammar' ? '<div class="sec"><h2>Grammar games and practice</h2></div>' : '') + '<div class="grid">' + items.map(itemCard).join('') + '</div>' : (k === 'grammar' && extra ? '' : '<div class="empty">Nothing here for this filter yet. Try “All”.</div>')) + (k === 'vocab' ? extra : '');
    $$('[data-f]').forEach(function (b) { b.onclick = function () { vSection(k, b.dataset.f); }; });
  }
  /* Games play inside IF English: the game opens in the app frame, with a way back and a full-screen option. */
  function vPlay(id) {
    var it = IFX_DIR.filter(function (x) { return x.id === id; })[0];
    if (!it) return vSection('games');
    setNav('games');
    view().innerHTML = '<div class="playbar"><a class="chip" href="#/games">← ' + esc(t('games')) + '</a><b>' + it.icon + ' ' + esc(it.t) + '</b><a class="chip" href="' + esc(it.href) + '" target="_blank" rel="noopener">⛶ Full screen</a></div>' +
      '<div class="playwrap"><iframe src="' + esc(it.href) + '" title="' + esc(it.t) + '" allow="autoplay; fullscreen" allowfullscreen></iframe></div>';
    document.body.classList.add('playing');
  }
  function vIelts() {
    setNav('ielts');
    var c = BY.ielts, s = courseStats(c), nx = nextLesson(c);
    view().innerHTML = '<div class="page-h"><div><p class="h-eyebrow">IELTS</p><h1>IELTS: learn, then practise</h1><p>Start with the lessons — they teach the language and strategy for each part. Then practise with real-format tasks and AI marking.</p></div></div>' +
      '<div class="hello"><div class="plan"><p class="h-eyebrow" style="color:var(--gold2)">Step 1 · Lessons</p><h2>' + (nx ? esc(nx.l.title) : 'All lessons done 🎉') + '</h2><p>' + esc(c.title) + ' · ' + s.d + ' / ' + s.n + ' lessons</p>' + (nx ? '<a class="btn gold" href="#/lesson/ielts/' + nx.u.id + '/' + nx.l.id + '">' + (s.d ? t('cont') : t('start')) + ' →</a>' : '') + '<div class="lvbar"><div class="bar"><i style="width:' + s.p + '%"></i></div></div></div>' +
      '<div class="goal" style="flex-direction:column;align-items:flex-start"><h3>How to use it</h3><p style="margin:0;color:var(--soft)">1. Do a lesson. 2. Practise that part in IELTS Studio or the Speaking Lab. 3. Take a full test in the IELTS Centre to see your band.</p><a class="btn ghost sm" href="#/course/ielts">See all IELTS lessons</a></div></div>' +
      '<div class="sec"><h2>Step 2 · Practise</h2></div><div class="grid">' + IFX_DIR.filter(function (x) { return x.s === 'ielts'; }).map(itemCard).join('') + '</div>' +
      '<div class="sec"><h2>IELTS vocabulary</h2></div><div class="grid">' + IFX_DIR.filter(function (x) { return x.s === 'vocab' && (x.tags || []).indexOf('ielts') >= 0; }).map(itemCard).join('') + '</div>';
  }
  function vMore() {
    setNav('more');
    view().innerHTML = '<div class="page-h"><div><h1>More</h1></div></div><div class="grid">' + IFX_DIR.filter(function (x) { return x.s === 'more' || x.s === 'kids'; }).map(itemCard).join('') +
      '<a class="card" href="#/onboard"><span class="ic">🎯</span><h3>My courses and levels</h3><p>' + esc(mine().map(function (k) { return SNAME[k]; }).join(', ') || 'Not chosen yet') + '</p></a>' +
      '<a class="card" href="/me/#/upgrade"><span class="ic">⭐</span><h3>Plans</h3><p>Full access for students — and the Teacher plan for classes.</p></a></div>';
  }

  /* ---------- search ---------- */
  function vSearch(q) {
    setNav('');
    var input = $('#q'); if (input && input.value !== q) input.value = q || '';
    var n = norm(q || ''); if (!n) { view().innerHTML = '<div class="empty">Type to search lessons, words, games and tests.</div>'; return; }
    var words = n.split(' '), hit = function (s) { s = norm(s); return words.every(function (w) { return s.indexOf(w) >= 0; }); };
    var hl = function (s) { var out = esc(s); words.forEach(function (w) { if (w.length > 1) out = out.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); }); return out; };
    var R = { lessons: [], words: [], apps: [] };
    COURSES.forEach(function (c) { c.units.forEach(function (u, ui) { u.lessons.forEach(function (l) {
      if (hit(c.title + ' ' + u.title + ' ' + u.topic + ' ' + l.title + ' ' + TYPE[l.type] + ' ' + c.level)) R.lessons.push({ c: c, u: u, ui: ui, l: l });
      (l.words || []).forEach(function (w) { if (hit(w.w + ' ' + w.d + ' ' + (w.ru || ''))) R.words.push({ c: c, u: u, l: l, w: w }); });
    }); }); });
    IFX_DIR.forEach(function (it) { if (hit(it.t + ' ' + it.d + ' ' + (it.lv || []).join(' ') + ' ' + (it.tags || []).join(' ') + ' ' + it.s)) R.apps.push(it); });
    var html = '<div class="page-h"><div><p class="h-eyebrow">Search</p><h1>“' + esc(q) + '”</h1></div></div>';
    if (R.lessons.length) html += '<div class="res-grp"><h3>Lessons</h3>' + R.lessons.slice(0, 12).map(function (x) { return '<a class="res" href="#/lesson/' + x.c.id + '/' + x.u.id + '/' + x.l.id + '"><i>' + ICONS[x.l.type] + '</i><span><b>' + hl(x.l.title) + '</b><small>' + hl(x.c.title + ' · ' + x.u.title) + '</small></span></a>'; }).join('') + '</div>';
    if (R.words.length) html += '<div class="res-grp"><h3>Words</h3>' + R.words.slice(0, 12).map(function (x) { return '<a class="res" href="#/lesson/' + x.c.id + '/' + x.u.id + '/' + x.l.id + '"><i>🔤</i><span><b>' + hl(x.w.w) + '</b> <small>' + hl(x.w.d) + (x.w.ru ? ' · ' + hl(x.w.ru) : '') + ' — ' + esc(x.c.title) + '</small></span></a>'; }).join('') + '</div>';
    if (R.apps.length) html += '<div class="res-grp"><h3>Courses, games and tests</h3>' + R.apps.slice(0, 16).map(function (x) { return '<a class="res" href="' + esc(x.href) + '"><i>' + x.icon + '</i><span><b>' + hl(x.t) + '</b><small>' + hl(x.d) + '</small></span></a>'; }).join('') + '</div>';
    if (!R.lessons.length && !R.words.length && !R.apps.length) html += '<div class="empty">Nothing found. Try another word — e.g. “past simple”, “IELTS”, “meeting”, “B1”.</div>';
    view().innerHTML = html;
  }

  /* ---------- router ---------- */
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  function route() {
    try { speechSynthesis.cancel(); } catch (e) {}
    var fb = $('#fb'); if (fb) fb.remove();
    document.body.classList.remove('teach');
    var p = location.hash.replace(/^#\/?/, '').split('?')[0].split('/'), qs = new URLSearchParams(location.hash.split('?')[1] || '');
    window.scrollTo(0, 0);
    switch (p[0]) {
      case '': return vHome();
      case 'onboard': return vOnboard();
      case 'courses': return vCourses(p[1]);
      case 'course': return vCourse(p[1]);
      case 'lesson': return vLesson(p[1], p[2], p[3], qs.get('teach') === '1');
      case 'vocabulary': return vSection('vocab');
      case 'join': return mine().length ? vHome() : vOnboard();
      case 'vocab': case 'grammar': case 'games': case 'tests': return vSection(p[0]);
      case 'play': return vPlay(p[1]);
      case 'ielts': return vIelts();
      case 'more': return vMore();
      case 'search': return vSearch(($('#q') || {}).value || qs.get('q') || '');
      default: return vHome();
    }
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', async function () {
    document.documentElement.lang = lang;
    if (/[?&]embed=1/.test(location.search)) { document.body.classList.add('embed'); document.addEventListener('click', function (e) { var a = e.target.closest('a[href]'); if (a && a.getAttribute('href').charAt(0) !== '#') a.target = '_top'; }); }
    frame(); route();
    await loadMe(); meLoaded = true; frame(); route();
  });
})();
