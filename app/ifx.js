/* IF App — one app for courses, vocabulary, grammar, games, tests and IELTS.
   Progress is kept on the device and, when signed in, in the account (so it follows you to the phone app and the website). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  var COURSES = [], BY = {};
  var IFX = window.IFX = { course: function (c) { COURSES.push(c); BY[c.id] = c; }, get: function (id) { return BY[id]; }, all: function () { return COURSES; },
    /** Add more units to a course (full courses are written in parts). */
    units: function (cid, list) { var c = BY[cid]; if (c) list.forEach(function (u) { if (!c.units.some(function (x) { return x.id === u.id; })) c.units.push(u); }); },
    /** Add a listening lesson to a unit (before the unit check). */
    listening: function (cid, uid, l) { var c = BY[cid], u = c && c.units.filter(function (x) { return x.id === uid; })[0]; if (!u) return; l.type = 'listen'; l.id = l.id || 'li'; var i = u.lessons.map(function (x) { return x.type; }).indexOf('check'); u.lessons.splice(i < 0 ? u.lessons.length : i, 0, l); } };

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
  /* Inside the Telegram bot: Telegram signs the launch data, and the server uses the chat's bot connection to sign the
     student in (no password), so their access and progress are the same as on the website. */
  var TGW = window.Telegram && window.Telegram.WebApp, TGI = '';
  try { TGI = (TGW && TGW.initData) || sessionStorage.getItem('if.tginit') || ''; if (TGI) sessionStorage.setItem('if.tginit', TGI); } catch (e) { TGI = (TGW && TGW.initData) || ''; }
  if (TGW && TGW.initData) { try { TGW.ready(); TGW.expand(); } catch (e) {} if (/tgWebApp/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search + '#/'); document.documentElement.classList.add('in-tg'); }
  var hdrs = function (h) { h = h || {}; if (TGI) h['X-TG-Init'] = TGI; return h; };
  function access() {   // what this person may open
    var p = ME && ME.profile, tier = ME && ME.access;
    var staff = tier === 'staff', member = staff || tier === 'member';
    return { signed: !!p, member: member, staff: staff, teacher: staff || (p && p.track === 'tutor' && member), tutor: p && p.track === 'tutor', name: (p && p.name) || '' };
  }
  var FREE_UNITS = 1;   // the first unit of every course is free without an account (2 with a free account)
  // without an account: unit 1 of every course; with a free account: units 1 and 2; members: everything
  var unlocked = function (ui, cid) { return (ui < (access().signed ? 2 : FREE_UNITS) || access().member) && classOpen(ui, cid); };
  /* Free taster without an account: the first unit of every course (above), the placement test and these.
     Everything else asks visitors to create a free account (which also starts the full-access trial). */
  var FREE_IDS = { 'voc-a1': 1, 'voc-b1': 1, 'voc-ket': 1, 'skill-games': 1, 'live': 1, 'if-kart': 1, 'kids-quest': 1, 'bq-kids': 1, 'g-skill': 1, 'placement': 1, 'ielts-centre': 1, 'timetable': 1 };
  var isFree = function (it) { return !!(it && FREE_IDS[it.id]); };
  var canOpen = function (it) { if (S.cls && !fullView() && !fits(it) && it.s !== 'more') return false; return isFree(it) || access().signed; };
  var JOIN = '/me/#/register?next=' + encodeURIComponent('/app/');
  function tasterHTML() { return meLoaded && !access().signed ? '<div class="taster"><div><b>You are trying IF App free — no account needed.</b><span>Open the first unit of every course, the placement test and a selection of games. Create a free account for the first two units of every course, a 7-day trial of everything, and your progress on every device.</span></div><a class="btn gold" href="' + JOIN + '">Create a free account</a></div>' : ''; }
  /* Full-access trial countdown (guests in their 7-day trial, not paid). */
  function trialHTML() {
    var p = ME && ME.profile; if (!p || p.role !== 'guest' || !p.trialUntil) return '';
    if (p.paidUntil && Date.parse(p.paidUntil) > Date.now()) return '';
    var left = Math.ceil((Date.parse(p.trialUntil) - Date.now()) / 864e5);
    if (left <= 0 && (access().member || Date.parse(p.trialUntil) < 1e12)) return '';   // a student, or a phone that already had a trial
    if (left <= 0) return '<div class="taster trial"><div><b>Your free trial has ended</b><span>You still have the free account: the first two units of every course and ' + GAME_LIMIT + ' games a day. Get full access for everything again.</span></div><a class="btn gold" href="/me/#/upgrade">See plans</a></div>';
    return '<div class="taster trial"><div><b>⭐ Full access: ' + left + ' day' + (left > 1 ? 's' : '') + ' left</b><span>Every course, game and test is open during your trial. After it, the free account keeps the first two units of every course and ' + GAME_LIMIT + ' games a day.</span></div><a class="btn ghost" href="/me/#/upgrade">See plans</a></div>';
  }
  /* Free game allowance: without full access, 3 different games a day (any level); reopening one of today's is free.
     IF Live (joining a class game with a PIN) never counts. Members, students and staff: unlimited. */
  var GAME_LIMIT = 3, GKEY = 'ifx.games';
  var counted = function (it) { return it && (it.s === 'games' || it.s === 'grammar' || it.s === 'archive') && it.id !== 'live'; };
  function gamesToday() { var g; try { g = JSON.parse(localStorage.getItem(GKEY)); } catch (e) {} return g && g.d === day() ? g : { d: day(), ids: [] }; }
  function gameLeft() { return Math.max(0, GAME_LIMIT - gamesToday().ids.length); }
  function useGame(it) {   // true if this game may open now
    if (!counted(it) || access().member) return true;
    var g = gamesToday(); if (g.ids.indexOf(it.id) >= 0) return true;
    if (g.ids.length >= GAME_LIMIT) return false;
    g.ids.push(it.id); try { localStorage.setItem(GKEY, JSON.stringify(g)); } catch (e) {}
    return true;
  }
  function gamesChip(sec) {
    if (!meLoaded || access().member || (sec !== 'games' && sec !== 'grammar')) return '';
    var n = gameLeft();
    return '<div class="gleft' + (n ? '' : ' none') + '">🎮 ' + (n ? n + ' of ' + GAME_LIMIT + ' free games left today' : 'No free games left today — come back tomorrow') + ' · <a href="/me/#/upgrade">Unlimited with full access</a></div>';
  }
  async function loadMe() {
    try { var r = await fetch('/api/school/me', { credentials: 'same-origin', headers: hdrs() }); if (r.ok) ME = await r.json(); } catch (e) {}
    var pf = ME && ME.profile;
    if (pf) {   // the account decides: courses chosen at registration or in My account
      if (pf.study && pf.study.length) S.study = pf.study.slice();
      var ck = window.IFClass && IFClass.keys(ME);
      if (ck) { S.cls = ck; S.study = ck.concat((pf.study || []).filter(function (k) { return (k === 'ielts' || /^be:/.test(k)) && ck.indexOf(k) < 0; })); } else delete S.cls;
      if (pf.track === 'parent') S.who = 'child'; if (pf.track === 'tutor' || ME.access === 'staff') { S.teacher = true; S.who = S.who || 'teach'; }
      try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    }
    if (ME && ME.profile) {
      try {   // merge progress from the account
        var r2 = await fetch('/api/school/app/progress', { credentials: 'same-origin', headers: hdrs() });
        if (r2.ok) { var srv = (await r2.json()).progress; if (srv && srv.done) mergeProgress(srv); }
      } catch (e) {}
      try { pushSoon(); await loadGate(); } catch (e) {}   // tell the class this student's Unit 1 status, and fetch the class's
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
  function pushSoon() { if (!ME || !ME.profile) return; clearTimeout(pushT); pushT = setTimeout(function () { fetch('/api/school/app/progress', { method: 'PUT', credentials: 'same-origin', headers: hdrs({ 'Content-Type': 'application/json' }), body: JSON.stringify(Object.assign({}, S, { u1: unit1Done() })) }).then(function () { loadGate(); }).catch(function () {}); }, 1500); }
  /** Courses whose Unit 1 (every lesson) this student has finished. */
  function unit1Done() { var o = {}; COURSES.forEach(function (c) { var u = c.units && c.units[0]; if (u && u.lessons.length && u.lessons.every(function (l) { return isDone(c.id, u.id, l.id); })) o[c.id] = 1; }); return o; }
  /** Class gate: Unit 2 opens only when the whole class has finished Unit 1 (teachers and students without a class are not held back). */
  var GATE = null, gateAt = 0;
  function loadGate() { if (!ME || !ME.profile || access().staff || S.teacher) { GATE = null; return Promise.resolve(); } gateAt = Date.now(); return fetch('/api/school/app/gate', { credentials: 'same-origin', headers: hdrs() }).then(function (r) { return r.ok ? r.json() : null; }).then(function (g) { var was = JSON.stringify(GATE); GATE = g && g.class ? g : null; if (JSON.stringify(GATE) !== was && /^#\/(course|lesson)/.test(location.hash)) route(); }).catch(function () {}); }
  function classOpen(ui, cid) { return ui !== 1 || !GATE || (GATE.done[cid] || 0) >= GATE.total; }

  /* ---------- small helpers ---------- */
  function toast(m) { var el = $('#toast'); el.textContent = m; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove('on'); }, 2600); }
  /** Play a listening script: each line in the speaker's voice (woman / man), one after another. */
  function playScript(lines, onLine, onDone) {
    try { speechSynthesis.cancel(); } catch (e) {}
    lines.forEach(function (x, i) {
      try {
        var u = new SpeechSynthesisUtterance(x.t); u.lang = 'en-GB'; u.rate = .95; u.ifVoice = x.g === 'm' ? 'male' : 'female';
        u.onstart = function () { onLine && onLine(x); };
        if (i === lines.length - 1) u.onend = function () { onLine && onLine(null); onDone && onDone(); };
        speechSynthesis.speak(u);
      } catch (e) {}
    });
  }
  function say(text) { try { var u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = .92; var v = speechSynthesis.getVoices().filter(function (x) { return /^en-(GB|US)/.test(x.lang); }); if (v.length) u.voice = v.find(function (x) { return /Google|Natural|Daniel|Samantha/.test(x.name); }) || v[0]; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} }
  var AC; function beep(ok) { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var o = AC.createOscillator(), g = AC.createGain(); o.connect(g); g.connect(AC.destination); var n = AC.currentTime; if (ok) { o.frequency.setValueAtTime(660, n); o.frequency.setValueAtTime(880, n + .09); } else { o.type = 'square'; o.frequency.setValueAtTime(220, n); o.frequency.setValueAtTime(180, n + .1); } g.gain.setValueAtTime(.08, n); g.gain.exponentialRampToValueAtTime(.001, n + .28); o.start(n); o.stop(n + .3); } catch (e) {} }
  function photo(id, alt) {
    if (!id) return '';
    var local = id.charAt(0) === '/', src = local ? id : 'https://unsplash.com/photos/' + id + '/download?w=1200';
    return '<figure><img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.remove()">' + (local ? '' : '<figcaption>Photo: Unsplash</figcaption>') + '</figure>';
  }
  var COLORS = { context: '#7c3aed', listen: '#0891b2', vocab: 'var(--c-vocab)', grammar: 'var(--c-grammar)', skill: 'var(--c-skill)', reading: 'var(--c-reading)', check: 'var(--c-check)', look: '#0ea5e9', maths: '#f59e0b' };
  var ICONS = { context: '🎯', listen: '🎧', vocab: '🔤', grammar: '🧠', skill: '🛠️', reading: '📖', check: '🏁', look: '👀', maths: '🔢' };
  var TYPE = { context: 'In context', listen: 'Listening', vocab: 'Vocabulary', grammar: 'Grammar', skill: 'Skills', reading: 'Reading', check: 'Unit check', look: 'Look and choose', maths: 'Maths' };
  var UNIT_DOODLE = { 'ge-a2/u1': 'clock', 'ge-a2/u2': 'coffee', 'ge-a2/u3': 'suitcase', 'ge-b1/u1': 'laptop', 'ge-b1/u2': 'phone', 'be-b1/u1': 'talk', 'be-b1/u2': 'envelope', 'ielts/u1': 'chart', 'ielts/u2': 'pen', 'ielts/u3': 'book', 'ge-a1/u1': 'talk', 'ge-a1/u2': 'clock', 'ge-b2/u1': 'bulb', 'ge-b2/u2': 'phone', 'ge-c1/u1': 'talk', 'ge-c1/u2': 'laptop', 'ge-c2/u1': 'book', 'ge-c2/u2': 'globe', 'be-a2/u1': 'coffee', 'be-a2/u2': 'envelope', 'be-b2/u1': 'talk', 'be-b2/u2': 'chart', 'be-c1/u1': 'bulb', 'be-c1/u2': 'globe', 'ef-c2/u1': 'bulb', 'ef-c2/u2': 'suitcase', 'ef-c2/u3': 'book', 'ef-c2/u4': 'laptop', 'ef-c2/u5': 'globe', 'ef-c2/u6': 'chart', 'ef-c2/u7': 'pen', 'ef-c2/u8': 'coffee' };
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
      '<header class="top"><div class="top-in"><a class="brand" href="#/"><img src="/brand/if-shield-3d-180.webp" alt=""><span>IF App<small>IF ACADEMY</small></span></a>' +
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
    ['Coursebooks (up to 2)', '📗', [['book:ef-a0', 'English File Beginner (A0)'], ['book:ef-a1', 'English File Elementary (A1)'], ['book:ef-a2', 'English File Pre-intermediate (A2)'], ['book:ef-b1', 'English File Intermediate (B1)'], ['book:ef-b2', 'English File Upper-intermediate (B2)'], ['book:ef-c1', 'English File Advanced (C1)'], ['book:ef-c2', 'English File Advanced Plus'], ['book:teens-b1', 'English for Teenagers B1–B2'], ['book:teens-b2', 'English for Teenagers B2–C1'], ['book:giu', 'Grammar in Use']]]
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
    else if (k === 'ielts') { P.course = BY.ielts; P.voc = byId('band9'); P.test = byId('ielts-centre'); P.level = 'IELTS'; }
    else if (k === 'ket') { P.voc = byId('voc-ket'); P.game = byId('ket-quest'); P.test = byId('test-centre'); P.level = 'A2'; }
    else if (k === 'pet') { P.voc = byId('voc-pet'); P.game = byId('pet-arcade'); P.test = byId('pet-tests'); P.level = 'B1'; }
    else if (/^yl:/.test(k)) { var y = k.split(':')[1]; P.course = BY['yl-' + y]; P.voc = byId('voc-' + y) || byId('yl'); P.game = byId('kids-quest'); P.test = byId(y + '-t'); P.kids = true; }
    else if (k === 'maths') { P.course = BY.maths; P.game = byId('yl-games'); P.kids = true; }
    else if (/^book:/.test(k)) { var bk = k.slice(5), BL = { 'ef-a0': 'A1', 'ef-a1': 'A1', 'ef-a2': 'A2', 'ef-b1': 'B1', 'ef-b2': 'B2', 'ef-c1': 'C1', 'ef-c2': 'C2', 'teens-b1': 'B1', 'teens-b2': 'B2', giu: 'B1' }; P.level = BL[bk]; P.book = true;
      if (bk === 'ef-a0') { P.test = byId('ef-a1'); P.voc = byId('voc-a1'); P.game = byId('mind-lab'); }   // Beginner (A0): the Elementary materials until Beginner ones exist
      else if (/^ef-/.test(bk)) { P.test = byId(bk); P.voc = byId('voc-' + bk.slice(3)); P.game = byId('mind-lab'); }
      else if (/^teens-/.test(bk)) { P.test = byId(bk); P.voc = byId(bk === 'teens-b1' ? 'voc-tb1' : 'voc-tb2'); P.game = byId('gameroom'); }
      else { P.voc = byId('gram-centre'); P.game = byId('mind-lab'); P.test = byId('test-centre'); }
      P.course = BY[bk] || BY['ge-' + (P.level || '').toLowerCase()]; }
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
    if (/^book:/.test(k)) { var bk = k.slice(5); if (bk === 'ef-a0') bk = 'ef-a1'; return it.id === bk || (bk === 'teens-b1' && it.id === 'voc-tb1') || (bk === 'teens-b2' && it.id === 'voc-tb2') || (/^teens/.test(bk) && /teens/.test(tags) && it.s !== 'tests' && it.s !== 'vocab') || (bk === 'giu' && /gram|giu/.test(it.id)) || (/^ef-/.test(bk) && it.id === 'voc-' + bk.slice(3)); }
    return false;
  }
  /* full view: staff, teachers, or anyone who hasn't chosen goals yet. Everyone else sees only what fits their goals. */
  function fullView() { var a = access(); return a.staff || a.teacher || S.teacher || !mine().length; }
  function addOns() {
    var m = mine(), hasGE = m.some(function (k) { return /^ge:/.test(k); }), hasBE = m.some(function (k) { return /^be:/.test(k); }), hasI = m.indexOf('ielts') >= 0;
    var lvOf = function (k) { var B = { 'ef-b2': 'B2', 'ef-c1': 'C1', 'ef-c2': 'C2', 'teens-b2': 'B2' }; return /^(ge|be):/.test(k) ? k.split(':')[1] : /^book:/.test(k) ? B[k.slice(5)] || '' : ''; };
    var top = m.map(lvOf).filter(function (l) { return /^(B2|C1|C2)$/.test(l); }).sort().pop(), out = [];
    if (top && !hasI) out.push(['ielts', 'IELTS']);
    if ((top || hasI) && !hasBE) out.push(['be:' + (top === 'C1' || top === 'C2' ? 'C1' : 'B2'), 'Business English ' + (top === 'C1' || top === 'C2' ? 'C1' : 'B2')]);
    if (hasI && !hasGE) ['B2', 'C1', 'C2'].forEach(function (l) { out.push(['ge:' + l, 'General English ' + l]); });
    return out;
  }
  function addOnHTML() { var a = addOns(); return a.length ? '<span class="addons">' + a.map(function (x) { return '<button class="addon" data-add="' + x[0] + '">+ ' + esc(x[1]) + '</button>'; }).join('') + '</span>' : ''; }
  function wireAddOns() { $$('[data-add]').forEach(function (b) { b.onclick = function () { var k = b.dataset.add, sel = mine().slice(), courses = sel.filter(function (x) { return !/^book:/.test(x); });
    if (sel.indexOf(k) >= 0) return; if (courses.length >= 3) { toast('Up to 3 courses — remove one first.'); return go('#/onboard'); }
    if (/^ge:/.test(k)) sel = sel.filter(function (x) { return !/^ge:/.test(x); });
    sel.push(k); S.study = sel; save(); saveStudy(sel); toast('Added: ' + SNAME[k]); route(); }; }); }
  function goalBar() { if (S.cls) return '<div class="goalbar">🏫 <span>Your class: <b>' + esc(mine().map(function (k) { return SNAME[k]; }).join(' · ')) + '</b></span>' + addOnHTML() + '</div>'; return '<div class="goalbar">🎯 <span>For your goals: <b>' + esc(mine().map(function (k) { return SNAME[k]; }).join(' · ')) + '</b></span>' + addOnHTML() + '<a href="#/onboard">Change goals</a></div>'; }
  function secCount(k) { if (k === 'ielts') return mine().indexOf('ielts') >= 0 ? 1 : 0; var n = IFX_DIR.filter(function (x) { return x.s === k && fits(x); }).length; if (k === 'grammar' || k === 'vocab') n += lessonsOf([k === 'grammar' ? 'grammar' : 'vocab']).filter(function (x) { return myCourses().indexOf(x.c) >= 0; }).length; return n; }
  function focusNav() { var full = fullView(); $$('a[data-k]').forEach(function (a) { var k = a.dataset && a.dataset.k; if (!k || ['vocab', 'grammar', 'games', 'tests', 'ielts'].indexOf(k) < 0) return; a.style.display = full || secCount(k) ? '' : 'none'; }); }
  function fits(it) { var m = mine(); if (!m.length || S.teacher) return true;
    if (S.cls && it.id === 'placement') return false;   // already placed in a class
    if (S.cls && (it.s === 'tests' || it.s === 'vocab')) {   // class tests and vocabulary: exactly their book / Cambridge level
      var own = { 'book:teens-b1': ['teens-b1', 'voc-tb1'], 'book:teens-b2': ['teens-b2', 'voc-tb2'], 'yl:starters': ['starters-t', 'voc-starters'], 'yl:movers': ['movers-t', 'voc-movers'], 'yl:flyers': ['flyers-t', 'voc-flyers'] };
      var ownIds = [].concat.apply([], Object.keys(own).map(function (k) { return own[k]; })), ex = m.filter(function (k) { return own[k]; }); if (ex.length && ownIds.indexOf(it.id) >= 0) return ex.some(function (k) { return own[k].indexOf(it.id) >= 0; });
    }
    if (S.cls && (it.tags || []).indexOf('book') >= 0 && (it.s === 'tests' || it.s === 'vocab')) {   // coursebook tests and vocabulary: their own coursebook only
      var bk = m.filter(function (k) { return /^book:/.test(k); }); if (bk.length) return bk.some(function (k) { return fitsKey(it, k); });
    }
    return m.some(function (k) { return fitsKey(it, k); }); }
  function myCourses() {
    var out = []; mine().forEach(function (k) { var c = planOf(k).course; if (c && out.indexOf(c) < 0) out.push(c); });
    if (S.teacher || (!out.length && !S.cls)) COURSES.forEach(function (c) { if (!c.daily && out.indexOf(c) < 0) out.push(c); });
    return out;
  }
  function pickerHTML(sel, kidsFirst) {
    var gs = kidsFirst ? [STUDY[3]].concat(STUDY.slice(0, 3), STUDY.slice(4)) : STUDY;
    return gs.map(function (g) { return '<div class="sg"><h3>' + g[1] + ' ' + esc(g[0]) + '</h3><div class="chips">' + g[2].map(function (x) { return '<button class="chip' + (sel.indexOf(x[0]) >= 0 ? ' on' : '') + '" data-s="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div></div>'; }).join('');
  }
  function vOnboard(step) {
    setNav('home');
    if (S.cls) return go('#/');
    if (step !== 'pick') {
      view().innerHTML = tasterHTML() + trialHTML() + '<div class="onb"><p class="h-eyebrow">IF App</p><h1>Who is learning?</h1><p class="lead">We\'ll show what fits — and keep the rest out of the way.</p><div class="pick">' +
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
    var html = tasterHTML() + trialHTML() + '<div class="page-h"><div><p class="h-eyebrow">' + (S.teacher ? '👩‍🏫 Teacher' : S.who === 'child' ? '🧸 Young learner' : 'IF App') + '</p><h1>' + (a.name ? 'Hi, ' + esc(a.name.split(' ')[0]) + '!' : 'Welcome to IF App') + '</h1></div><a class="chip" href="#/onboard">✎ My courses</a></div>' +
      (keys.length ? '<div class="chips mycourses">' + keys.map(function (k) { return '<button class="chip' + (k === act ? ' on' : '') + '" data-a="' + k + '">' + SICON[k] + ' ' + esc(SNAME[k]) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="hello"><div class="plan">' + (main ? '<p class="h-eyebrow" style="color:var(--gold2)">' + esc(t('yourPlan')) + '</p><h2>' + (nx ? esc(nx.l.title) : 'Course complete! 🎉') + '</h2><p>' + esc(main.title) + (nx ? ' · ' + esc(t('unit')) + ' ' + (nx.ui + 1) + ': ' + esc(nx.u.title) : '') + '</p>' +
        (nx ? '<a class="btn gold" href="#/lesson/' + main.id + '/' + nx.u.id + '/' + nx.l.id + '">' + (st.d ? t('cont') : t('start')) + ' →</a>' : '<a class="btn gold" href="#/courses">Next course →</a>')
        : '<p class="h-eyebrow" style="color:var(--gold2)">' + esc(t('yourPlan')) + '</p><h2>' + esc(P.name || '') + '</h2><p>' + (P.voc ? 'Start with the vocabulary course, then play and test yourself.' : 'Choose a course.') + '</p>' + (P.voc ? '<a class="btn gold" href="' + '#/play/' + P.voc.id + '">' + esc(P.voc.t) + ' →</a>' : '<a class="btn gold" href="#/courses">Courses →</a>')) +
        (lvPct != null ? '<div class="lvbar"><div class="row"><span>' + esc(P.level) + (nextLv ? ' → ' + nextLv : '') + '</span><span>' + lvPct + '%</span></div><div class="bar"><i style="width:' + lvPct + '%"></i></div></div>' : '') + '</div>' +
      '<div class="goal"><div class="ring" style="--p:' + goalPct + '"><b>' + (S.today.d === day() ? S.today.xp : 0) + '<small>/ ' + GOAL_XP + ' XP</small></b></div><div><h3>' + esc(t('dailyGoal')) + '</h3><p style="margin:4px 0 0;color:var(--soft)">🔥 ' + S.streak + ' ' + esc(t('streak')) + ' · ⚡ ' + S.xp + ' XP</p>' +
        '<p style="margin:8px 0 0;font-size:14px;color:var(--soft)">One lesson ≈ 12–15 XP. Two lessons a day keeps your streak alive.</p></div></div></div>' +
      artHomeHTML() +
      '<div class="sec"><h2>Today\'s three steps</h2></div><div class="steps">' +
        step(1, main && nx ? { href: '#/lesson/' + main.id + '/' + nx.u.id + '/' + nx.l.id, t: nx.l.title, d: main.title + ' · ' + TYPE[nx.l.type] } : P.voc ? { href: '#/play/' + P.voc.id, t: P.voc.t, d: 'Next unit' } : null, 'Lesson') +
        step(2, P.voc && main ? { href: '#/play/' + P.voc.id, t: P.voc.t, d: 'Learn 10 new words' } : P.test ? { href: '#/play/' + P.test.id, t: P.test.t, d: 'Check your progress' } : null, 'Words') +
        step(3, P.game ? { href: '#/play/' + P.game.id, t: P.game.t, d: 'Play to review' } : null, 'Game') +
      '</div>' +
      (S.teacher || a.teacher ? teacherBox(a) : '') +
      '<div class="sec"><h2>' + esc(t('forYou')) + '</h2><a href="#/courses">' + esc(t('all')) + ' →</a></div><div class="grid">' + myCourses().slice(0, 6).map(courseCard).join('') + '</div>';
    if (!S.teacher && addOns().length) html = '<div class="goalbar">✨ <span>Ready for more?</span>' + addOnHTML() + '</div>' + html;
    view().innerHTML = html;
    $$('[data-a]').forEach(function (b) { b.onclick = function () { S.active = b.dataset.a; save(); vHome(); }; });
  }
  function step(n, x, label) {
    if (!x) return '';
    return '<a class="step" href="' + esc(x.href) + '"><span class="n">' + n + '</span><span><b>' + esc(x.t) + '</b><span>' + esc(label + ' · ' + x.d) + '</span></span><span class="go">›</span></a>';
  }
  function teacherBox(a) {
    return '<div class="sec"><h2>👩‍🏫 For teachers</h2></div><div class="card" style="flex-direction:row;gap:16px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:240px"><h3>Teach with IF App</h3><p>Open any lesson in <b>Teach mode</b>: big text for the projector, answers shown when you choose, and class games in IF Live.</p></div>' +
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
    var full = fullView(), list = full ? COURSES.filter(function (c) { return !c.daily && (f === 'all' || c.track === f); }) : myCourses();
    view().innerHTML = '<div class="page-h"><div><p class="h-eyebrow">' + esc(t('courses')) + '</p><h1>Real English courses</h1><p>Each unit: new words, the grammar, a reading with photos, and a unit check. Finish a level to unlock the next one.</p></div></div>' +
      (full ? '<div class="chips">' + CTRACK.map(function (x) { return '<button class="chip' + (x[0] === f ? ' on' : '') + '" data-f="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' : goalBar()) +
      '<div class="grid">' + list.map(courseCard).join('') + '</div>' ;
    $$('[data-f]').forEach(function (b) { b.onclick = function () { vCourses(b.dataset.f); }; });
  }
  function vCourse(id) {
    setNav('courses');
    var c = BY[id]; if (!c) return go('#/courses');
    if (c.daily) return go('#/articles');
    var s = courseStats(c), nx = nextLesson(c), a = access();
    var html = '<div class="course-head"><span class="ic">' + c.icon + '</span><div class="grow"><p class="h-eyebrow">' + esc(c.level) + ' · ' + esc(c.track === 'exam' ? 'Exam' : c.track === 'business' ? 'Business English' : c.track === 'kids' ? 'Young learners' : 'General English') + '</p><h1 style="font-size:28px">' + esc(c.title) + '</h1><p style="margin:4px 0 8px;color:var(--soft)">' + esc(c.blurb) + '</p><div class="bar" style="height:12px"><i style="width:' + s.p + '%"></i></div><p style="margin:6px 0 0;font-size:13.5px;color:var(--soft)">' + s.d + ' / ' + s.n + ' lessons · ' + s.p + '%' + (c.next ? ' · then: ' + esc(c.next) : '') + '</p></div></div>';
    var sd = window.IFStd && IFStd.course(c.id);
    if (/^(teens-a2|ge-(a1|a2|b1|b2|c1|c2))$/.test(c.id)) html += '<p style="margin:4px 0 14px;display:flex;gap:8px;flex-wrap:wrap"><a class="btn ghost" href="/a/coursebook/?c=' + c.id + '">📘 Coursebook (online · print)</a><a class="btn ghost" href="/a/block-quest/?course=' + c.id + '">⛏️ Block Quest</a></p>';
    if (sd) html += '<div class="std"><div class="std-l"><b>' + esc(sd.level) + '</b><span>Standard</span></div><div class="grow"><p class="std-ref">📐 Referenced to the ' + esc(sd.ref) + '</p><p>' + esc(sd.desc) + '</p><div class="std-m">' + sd.modes.map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('') + '</div></div></div>';
    c.units.forEach(function (u, ui) {
      var open = unlocked(ui, c.id), waitC = !open && ui === 1 && GATE && (GATE.done[c.id] || 0) < GATE.total;
      html += '<section class="unit"><div class="unit-h">' + DOODLE(c.id, u.id, 'doodle uh') + '<div style="flex:1"><small>' + esc(t('unit')) + ' ' + (ui + 1) + ' · ' + esc(u.topic) + '</small><h3>' + esc(u.title) + '</h3>' + (window.IFStd && IFStd.unit(c.id, u.id) ? '<p class="cando">🎯 ' + esc(IFStd.unit(c.id, u.id)) + '</p>' : '') + '</div>' + (open ? '' : waitC ? '<span class="btn sm gold" style="cursor:default">🔒 Opens when your class finishes Unit 1 (' + (GATE.done[c.id] || 0) + ' of ' + GATE.total + ')</span>' : '<a class="btn sm gold" href="/me/#/upgrade">🔒 ' + esc(t('locked')) + '</a>') + '</div><div class="path">' +
        u.lessons.map(function (l) {
          var done = isDone(c.id, u.id, l.id), isNext = nx && nx.u.id === u.id && nx.l.id === l.id;
          return '<a class="node' + (done ? ' done' : '') + (isNext ? ' next' : '') + (open ? '' : ' locked') + '" style="--c:' + COLORS[l.type] + '" href="' + (open ? '#/lesson/' + c.id + '/' + u.id + '/' + l.id : waitC ? '#/course/' + c.id : '/me/#/upgrade') + '"><span class="b">' + (open ? ICONS[l.type] : '🔒') + '</span><span>' + esc(l.title) + '</span><em>' + esc(TYPE[l.type]) + (done ? ' · ' + S.done[key3(c.id, u.id, l.id)].score + '%' : '') + '</em></a>';
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
    if (c.daily) { if (!artOpen(c, u)) { if (!meLoaded) { view().innerHTML = '<p style="text-align:center;margin-top:40px">Loading…</p>'; return; } return go('#/articles'); } }
    else if (!unlocked(ui, cid)) { if (!meLoaded) { view().innerHTML = '<p style="text-align:center;margin-top:40px">Loading…</p>'; return; } return go('#/course/' + cid); }
    teach = !!teach && access().teacher;
    document.body.classList.toggle('teach', teach); document.body.classList.add('in-lesson');
    var items = [];
    if (l.type === 'vocab') { items.push({ k: 'learn' }); items = items.concat(vocabEx(l.words)); }
    if (l.gen) l.ex = l.gen.map(function (f) { return f(); });   // fresh numbers every time
    if (l.type === 'context') items = contextEx(u).map(function (e) { return { k: 'ex', e: e }; });
    if (l.type === 'vocab' || l.type === 'context') {}
    else if (l.type === 'grammar' || l.type === 'skill' || l.type === 'maths') { items.push({ k: 'rule' }); items = items.concat(l.ex.map(function (e) { return { k: 'ex', e: e }; })); }
    else if (l.type === 'listen') { items.push({ k: 'listen' }); items = items.concat(l.ex.map(function (e) { return { k: 'ex', e: e }; })); }
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
    if (it.k === 'listen') {
      // Listening "video": a sci-fi studio where the humanoid presenters perform the script (real voices), with
      // subtitles, a timeline, play/pause, replay and full screen. Each speaker gets a presenter (by voice).
      var sp = {}, names = []; L.l.script.forEach(function (x) { if (!sp[x.s]) { sp[x.s] = x.g; names.push(x.s); } });
      var cast = names.slice(0, 3), botOf = function (n) { var k = cast.indexOf(n); if (k >= 0) return k; var same = cast.filter(function (c) { return sp[c] === sp[n]; })[0]; return same ? cast.indexOf(same) : 0; };
      var lines = L.l.script, V = L.v = { i: 0, on: false, cc: true, done: false, tok: 0 };
      var skyline = '<svg class="vsky" viewBox="0 0 800 200" preserveAspectRatio="none" aria-hidden="true">' + [[0, 120, 60], [55, 70, 40], [100, 100, 70], [175, 40, 35], [215, 90, 60], [280, 60, 45], [330, 20, 30], [365, 80, 70], [440, 50, 40], [485, 110, 55], [545, 30, 45], [595, 85, 60], [660, 55, 40], [705, 100, 95]].map(function (b) { var w = '', x0 = b[0], top = b[1], wd = b[2]; for (var yy = top + 10; yy < 190; yy += 14) for (var xx = x0 + 6; xx < x0 + wd - 6; xx += 10) if ((xx * 7 + yy * 3) % 5 < 2) w += '<rect x="' + xx + '" y="' + yy + '" width="3" height="5" class="w' + ((xx + yy) % 3) + '"/>'; return '<rect x="' + x0 + '" y="' + top + '" width="' + wd + '" height="' + (200 - top) + '" class="b"/>' + w; }).join('') + '</svg>';
      v.innerHTML = '<div class="player">' + pTop() + '<article class="listen-v"><div class="lv-head"><span class="lv-ep">🎬 IF ENGLISH · LISTENING</span><h3>' + esc(L.l.title) + '</h3><p>' + esc(L.l.intro || '') + '</p></div>' +
        '<div class="vplayer" id="vp"><div class="vscene"><div class="vbg"></div>' + skyline + '<div class="vring"></div><div class="vgrid"></div>' +
          (window.IFBots ? '<div class="ifbots vbots">' + cast.map(function (n) { return IFBots.html(sp[n], n, cast.length === 1); }).join('') + '</div>' : '') +
          '<div class="vcap" id="vcap"></div><button class="vbig" id="vbig" aria-label="Play">▶</button><div class="vlive"><i></i>REC</div></div>' +
          '<div class="vbar"><button id="vpp" aria-label="Play">▶</button><button id="vre" aria-label="Replay">↺</button><div class="vtl" id="vtl"><i id="vprog"></i></div><span id="vtime">0 / ' + lines.length + '</span><button id="vcc" class="on" aria-label="Subtitles">CC</button><button id="vfs" aria-label="Full screen">⛶</button></div></div>' +
        '<p class="small" style="text-align:center;color:var(--muted);margin-top:10px">' + (L.l.task ? esc(L.l.task) : 'Watch and listen, then answer the questions. You can listen again during the questions.') + '</p>' +
        '<details class="peek"><summary>📄 Transcript (read it after you listen)</summary><div class="txt">' + lines.map(function (x) { return '<p><b>' + esc(x.s) + ':</b> ' + esc(x.t) + '</p>'; }).join('') + '</div></details></article>' +
        '<p style="text-align:center;margin-top:18px"><button class="btn" id="nx">Questions →</button></p></div>';
      bindTop();
      var bots = $$('.vbots .ifbot'), vp = $('#vp');
      function ui() {
        $('#vpp').textContent = V.on ? '❚❚' : '▶'; $('#vbig').hidden = V.on; vp.classList.toggle('playing', V.on);
        $('#vprog').style.width = (V.i / lines.length * 100) + '%'; $('#vtime').textContent = Math.min(V.i + (V.on ? 1 : 0), lines.length) + ' / ' + lines.length;
      }
      function say(k) {
        if (!V.on || L.v !== V) return;
        if (k >= lines.length) { V.on = false; V.i = 0; V.done = true; $('#vcap').innerHTML = '<b>THE END</b> · Now answer the questions'; if (window.IFBots) IFBots.talk(null); ui(); return; }
        V.i = k; var x = lines[k], b = bots[botOf(x.s)];
        $('#vcap').innerHTML = V.cc ? '<b>' + esc(x.s) + '</b> ' + esc(x.t) : '';
        bots.forEach(function (e) { e.classList.toggle('lead', e === b); });
        if (window.IFBots) IFBots.talk(b || null);
        ui();
        var tok = ++V.tok; playScript([x], null, function () { if (tok !== V.tok) return; setTimeout(function () { if (tok === V.tok) say(k + 1); }, 250); });
      }
      function play() { if (V.on) { V.on = false; V.tok++; try { speechSynthesis.cancel(); } catch (e) {} ui(); return; } V.on = true; V.done = false; say(V.i); }
      $('#vbig').onclick = $('#vpp').onclick = play;
      $('#vre').onclick = function () { try { speechSynthesis.cancel(); } catch (e) {} V.on = true; say(0); };
      $('#vcc').onclick = function () { V.cc = !V.cc; this.classList.toggle('on', V.cc); if (!V.cc) $('#vcap').innerHTML = ''; };
      $('#vfs').onclick = function () { try { if (document.fullscreenElement) document.exitFullscreen(); else (vp.requestFullscreen || vp.webkitRequestFullscreen).call(vp); } catch (e) {} };
      $('#vtl').onclick = function (ev) { var r = this.getBoundingClientRect(), k = Math.max(0, Math.min(lines.length - 1, Math.floor((ev.clientX - r.left) / r.width * lines.length))); try { speechSynthesis.cancel(); } catch (e) {} V.on = true; say(k); };
      $('#nx').onclick = function () { V.on = false; try { speechSynthesis.cancel(); } catch (e) {} L.i++; drawStep(); }; ui(); return;
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
    var v = view(), peek = L.l.type === 'reading' ? '<details class="peek"><summary>📖 Look at the text</summary><div class="txt">' + paras(L.l.text) + '</div></details>' : L.l.type === 'listen' ? '<p style="text-align:center;margin:0 0 8px"><button class="btn ghost sm" id="replay">🎧 Listen again</button></p>' : '';
    var body = '';
    var vis = (e.pic ? '<div class="qpic">' + PIC(e.pic, 'pic big') + '</div>' : '') + (e.scene ? scene(e.scene) : '');
    var sayBtn = e.say || e.listen ? ' <button class="say" style="width:38px;height:38px;font-size:16px;vertical-align:middle" id="sq" aria-label="Listen">🔊</button>' : '';
    if (e.t === 'mc' || e.t === 'tf') {
      var opts = e.t === 'tf' ? ['True', 'False'] : e.o;
      body = vis + '<h2 class="qh">' + esc(e.q) + sayBtn + '</h2><div class="opts">' + opts.map(function (o, k) { return '<button class="opt" data-k="' + k + '">' + esc(o) + '</button>'; }).join('') + '</div>';
    } else if (e.t === 'picmc') {
      body = vis + '<h2 class="qh">' + esc(e.q) + sayBtn + '</h2><div class="opts pics">' + e.o.map(function (o, k) { return '<button class="opt" data-k="' + k + '" aria-label="Picture ' + (k + 1) + '">' + PIC(o, 'pic') + '</button>'; }).join('') + '</div>';
    } else if (e.t === 'gap') {
      body = '<h2 class="qh">' + esc(e.h || 'Complete the sentence.') + sayBtn + '</h2><p class="gapq">' + esc(e.q).replace('___', '<input id="gi" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Answer">') + '</p>';
    } else if (e.t === 'order') {
      var ws = e.a.replace(/[.?!]$/, '').split(' '), punct = (e.a.match(/[.?!]$/) || [''])[0];
      L.ord = { ws: shuffle(ws.map(function (w, k) { return { w: w, k: k }; })), pick: [], punct: punct };
      while (L.ord.ws.map(function (x) { return x.w; }).join(' ') === ws.join(' ') && ws.length > 2) L.ord.ws = shuffle(L.ord.ws);
      body = '<h2 class="qh">' + esc(e.h || 'Put the words in order.') + sayBtn + '</h2><div class="ord-line" id="ol"></div><div class="ord-bank" id="ob"></div>';
    } else if (e.t === 'speak') {
      body = '<h2 class="qh">Say it aloud. <button class="say" style="width:38px;height:38px;font-size:16px;vertical-align:middle" id="sq2" aria-label="Listen">🔊</button></h2><p class="speakq">' + esc(e.a) + '</p>' +
        '<div class="speak"><button class="btn gold" id="mic">🎙 ' + (SR ? 'Press and speak' : 'Read it aloud') + '</button>' + (SR ? ' <button class="btn ghost sm" id="skp">Can\'t speak now — skip</button>' : '') + '<p class="heard" id="hd">' + (SR ? 'Listen first if you like, then press the button and read the sentence.' : 'Your browser cannot listen. Read the sentence aloud, then press Check.') + '</p></div>';
    } else if (e.t === 'match') {
      L.mt = { left: shuffle(e.p.map(function (p, k) { return { s: p[0], k: k }; })), right: shuffle(e.p.map(function (p, k) { return { s: p[1], k: k }; })), sel: null, ok: 0, miss: 0 };
      body = '<h2 class="qh">Match the pairs.</h2><div class="match"><div class="opts" id="ml">' + L.mt.left.map(function (x) { return '<button class="opt" data-k="' + x.k + '">' + esc(x.s) + '</button>'; }).join('') + '</div><div class="opts" id="mr">' + L.mt.right.map(function (x) { return '<button class="opt" data-k="' + x.k + '">' + esc(x.s) + '</button>'; }).join('') + '</div></div>';
    }
    var teach = L.teach ? '<div class="teachbar"><button class="btn ghost sm" id="rv">👁 ' + esc(t('reveal')) + '</button><button class="btn sm" id="tn">' + esc(t('next')) + ' ›</button></div>' : '';
    v.innerHTML = '<div class="player">' + pTop() + peek + body + teach + '</div>' + (e.t === 'mc' || e.t === 'tf' || e.t === 'picmc' || e.t === 'match' || L.teach ? '' : '<div class="fb" id="fb"><div class="fb-in"><span class="msg"></span><button class="btn" id="ck" disabled>' + esc(t('check')) + '</button></div></div>');
    bindTop();
    if ($('#replay')) $('#replay').onclick = function () { playScript(L.l.script); };
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
    } else if (e.t === 'speak' && !L.teach) bindSpeak(e);
  }
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var words = function (s) { return norm(s).replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(Boolean); };
  function bindSpeak(e) {
    var ck = $('#ck'), hd = $('#hd'), mic = $('#mic'), score = 0;
    $('#sq2').onclick = function () { say(e.a); };
    if (!SR) { ck.disabled = false; ck.onclick = function () { result(true, e); }; return; }
    mic.onclick = function () {
      var r = new SR(); r.lang = 'en-GB'; r.interimResults = false; r.maxAlternatives = 3;
      mic.disabled = true; mic.textContent = '🎙 Listening…'; hd.textContent = '';
      r.onresult = function (ev) {
        var best = '', bs = -1;
        for (var k = 0; k < ev.results[0].length; k++) { var said = words(ev.results[0][k].transcript), want = words(e.a), hit = want.filter(function (w) { return said.indexOf(w) >= 0; }).length / want.length; if (hit > bs) { bs = hit; best = ev.results[0][k].transcript; } }
        score = Math.round(bs * 100);
        hd.innerHTML = 'I heard: <b>“' + esc(best) + '”</b> · ' + score + '% of the words';
        ck.disabled = false;
      };
      r.onerror = function (ev) { hd.textContent = ev && /not-allowed|service/.test(ev.error) ? 'The microphone is off for this page. Read the sentence aloud, then press Check.' : 'I could not hear you. Check the microphone and try again.'; if (ev && /not-allowed|service/.test(ev.error)) { score = 100; ck.disabled = false; } };
      r.onend = function () { mic.disabled = false; mic.textContent = '🎙 Try again'; };
      try { r.start(); } catch (x) { mic.disabled = false; }
    };
    $('#skp').onclick = function () { mic.disabled = true; this.remove(); result(true, e, '', true); };
    ck.onclick = function () { mic.disabled = true; result(score >= 70, e, score >= 70 ? '' : 'Try to say every word: ' + e.a); };
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
    document.body.classList.remove('teach'); document.body.classList.remove('playing'); document.body.classList.remove('game-full'); document.body.classList.remove('in-lesson');
    var score = L.total ? Math.round(L.right / L.total * 100) : 100;
    var k = key3(L.c.id, L.u.id, L.l.id), first = !S.done[k];
    var xp = (first ? 10 : 4) + Math.round(score / 20);
    S.done[k] = { score: Math.max(score, (S.done[k] || {}).score || 0), at: Date.now() };
    if (L.l.words) L.l.words.forEach(function (w) { S.words[w.w] = 1; });
    addXP(xp);
    if (L.c.daily) return artDone(score, xp);
    var nx = nextLesson(L.c), st = courseStats(L.c);
    view().innerHTML = '<div class="player done-box"><div class="big">' + (score >= 80 ? '🏆' : score >= 50 ? '⭐' : '💪') + '</div><h2>' + (score >= 80 ? 'Excellent!' : score >= 50 ? 'Well done!' : 'Good effort!') + '</h2><p style="color:var(--soft)">' + esc(L.l.title) + ' · ' + esc(L.c.title) + '</p>' + (window.IFStd && IFStd.unit(L.c.id, L.u.id) ? '<p class="cando done">🎯 Unit goal · ' + esc(IFStd.unit(L.c.id, L.u.id)) + '</p>' : '') +
      '<div class="kpis"><div class="kpi"><b>+' + xp + '</b><span>XP</span></div><div class="kpi"><b>' + score + '%</b><span>accuracy</span></div><div class="kpi"><b>🔥 ' + S.streak + '</b><span>' + esc(t('streak')) + '</span></div></div>' +
      '<div class="bar" style="max-width:420px;margin:0 auto 6px;height:12px;background:var(--line)"><i style="width:' + st.p + '%"></i></div><p style="color:var(--soft);font-size:14px">' + esc(L.c.title) + ': ' + st.p + '%</p>' +
      '<p style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px"><a class="btn ghost" href="#/course/' + L.c.id + '">Course map</a>' +
      (nx ? (unlocked(nx.ui, L.c.id) ? '<a class="btn gold" href="#/lesson/' + L.c.id + '/' + nx.u.id + '/' + nx.l.id + '">Next: ' + esc(nx.l.title) + ' →</a>' : '<a class="btn gold" href="/me/#/upgrade">🔒 Unlock the next unit</a>') : '<a class="btn gold" href="#/courses">🎉 Course complete — next level</a>') + '</p></div>';
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
    vocab: { h: 'Vocabulary', p: 'Words by level, by coursebook and for exams — with audio, games and progress.', f: [['fit', 'For you'], ['level', 'By level'], ['general', 'General'], ['business', 'Business'], ['exam', 'Exams'], ['book', 'Coursebooks'], ['young', 'Young learners'], ['all', 'All']] },
    grammar: { h: 'Grammar', p: 'Grammar from A1 to C2: short explanations, then practice and games.', f: [['fit', 'For you'], ['A1', 'A1'], ['A2', 'A2'], ['B1', 'B1'], ['B2', 'B2'], ['C1', 'C1'], ['C2', 'C2'], ['all', 'All']] },
    games: { h: 'Games', p: 'Learn by playing — alone, or with your class on the big screen.', f: [['all', 'All'], ['fit', 'For you'], ['teens', 'Teens & adults'], ['young', 'Young learners'], ['ielts', 'IELTS'], ['business', 'Business'], ['class', 'Class games']] },
    tests: { h: 'Tests', p: 'Find your level, check your progress and prepare for exams. Results are saved to your account.', f: [['fit', 'For you'], ['book', 'Coursebook tests'], ['cambridge', 'Cambridge'], ['ielts', 'IELTS'], ['young', 'Young learners'], ['all', 'All']] }
  };
  function match(it, f) {
    if (f === 'all') return true; if (f === 'fit') return fits(it);
    if (LEVELS.indexOf(f) >= 0) return (it.lv || []).indexOf(f) >= 0;
    var tg = it.tags || [];
    if (f === 'teens') return tg.indexOf('teens') >= 0 || tg.indexOf('adults') >= 0 || tg.indexOf('pet') >= 0;   // PET (B1) suits teens too
    if (f === 'young') return it.tr === 'kids' || tg.indexOf('kids') >= 0 || tg.indexOf('ket') >= 0 || tg.indexOf('pet') >= 0 || tg.indexOf('starters') >= 0;
    if (f === 'general' || f === 'business' || f === 'exam' || f === 'kids') return it.tr === f || (it.tags || []).indexOf(f) >= 0;
    return (it.tags || []).indexOf(f) >= 0;
  }
  function itemCard(it) {
    var lock = meLoaded && !canOpen(it);
    return '<a class="card' + (lock ? ' locked' : '') + '" href="#/play/' + it.id + '">' + (lock ? '<span class="lockb">🔒 Free account</span>' : (!access().signed && isFree(it) ? '<span class="lockb free">Free to try</span>' : '')) + '<span class="ic">' + it.icon + '</span><h3>' + esc(it.t) + '</h3><p>' + esc(it.d) + '</p><div class="meta">' + (it.lv || []).slice(0, 3).map(function (l) { return '<span class="tag ' + tagFor(it.tr) + '">' + l + '</span>'; }).join('') + ((it.lv || []).length > 3 ? '<span class="tag">+</span>' : '') + (it.tr === 'exam' ? '<span class="tag ex">Exam</span>' : it.tr === 'kids' ? '<span class="tag kd">Kids</span>' : '') + '</div></a>';
  }
  function lessonsOf(type) {   // course lessons of a kind, as cards
    var out = [];
    COURSES.forEach(function (c) { if (c.daily) return; c.units.forEach(function (u, ui) { u.lessons.forEach(function (l) { if (type.indexOf(l.type) >= 0) out.push({ c: c, u: u, ui: ui, l: l }); }); }); });
    return out;
  }
  function lessonCard(x) {
    var done = isDone(x.c.id, x.u.id, x.l.id), open = unlocked(x.ui, x.c.id);
    return '<a class="card" href="' + (open ? '#/lesson/' + x.c.id + '/' + x.u.id + '/' + x.l.id : '/me/#/upgrade') + '">' + (open ? '' : '<span class="lock">🔒</span>') + '<span class="ic">' + ICONS[x.l.type] + '</span><h3>' + esc(x.l.title) + '</h3><p>' + esc(x.c.title) + ' · ' + esc(t('unit')) + ' ' + (x.ui + 1) + '</p><div class="meta"><span class="tag ' + tagFor(x.c.track) + '">' + esc(x.c.level) + '</span>' + (done ? '<span class="tag" style="background:var(--ok-bg);color:var(--ok)">✓ ' + S.done[key3(x.c.id, x.u.id, x.l.id)].score + '%</span>' : '') + '</div></a>';
  }
  function vSection(k, f) {
    setNav(k); var sc = SEC[k]; var full = fullView(); f = full ? (f || (mine().length ? 'fit' : 'all')) : 'fit';
    var items = IFX_DIR.filter(function (x) { return x.s === k && match(x, f); });
    var EDITION = /^(kart|bq|obby|kq)-(ket|pet|flyers)$/;   // KET / PET / Flyers editions of the young learners' games
    if (k === 'games' && (f === 'all' || f === 'young')) {
      var shown = {}, grp = function (title, list) { list = list.filter(function (x) { return x && !shown[x.id]; }); list.forEach(function (x) { shown[x.id] = 1; }); return list.length ? '<div class="sec"><h2>' + title + '</h2></div><div class="grid">' + list.map(itemCard).join('') + '</div>' : ''; };
      var G = function (fn) { return IFX_DIR.filter(function (x) { return x.s === 'games' && !EDITION.test(x.id) && fn(x); }); };
      var eds = IFX_DIR.filter(function (x) { return x.s === 'games' && EDITION.test(x.id); });
      var edRow = '<div class="eds"><b>KET, PET and Flyers editions:</b> ' + eds.map(function (x) { return '<a class="chip" href="#/play/' + x.id + '">' + x.icon + ' ' + esc(x.t) + '</a>'; }).join('') + '</div>';
      var body = f === 'young' ? grp('Young learners · Starters to PET', G(function (x) { return match(x, 'young'); })) + edRow
        : grp('⭐ Start here', [byId('mind-lab'), byId('live')]) + grp('Class games', G(function (x) { return match(x, 'class'); })) + grp('Teens & adults', G(function (x) { return match(x, 'teens') && !match(x, 'young'); })) +
          grp('Young learners · Starters to PET', G(function (x) { return match(x, 'young'); })) + edRow + grp('More', G(function () { return true; }));
      view().innerHTML = '<div class="page-h"><div><p class="h-eyebrow">' + esc(t(k)) + '</p><h1>' + esc(sc.h) + '</h1><p>' + esc(sc.p) + '</p></div></div>' +
        (full ? '<div class="chips">' + sc.f.map(function (x) { return '<button class="chip' + (x[0] === f ? ' on' : '') + '" data-f="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' : goalBar()) + gamesChip(k) + body;
      $$('[data-f]').forEach(function (b) { b.onclick = function () { vSection(k, b.dataset.f); }; });
      return;
    }
    if (k === 'games' && f !== 'fit') items = items.filter(function (x) { return !EDITION.test(x.id); });
    var extra = '';
    if (k === 'vocab') { var vl = lessonsOf(['vocab']).filter(function (x) { return f === 'all' || f === 'level' || (f === 'business' ? x.c.track === 'business' : f === 'exam' ? x.c.track === 'exam' : f === 'general' ? x.c.track === 'general' : f === 'fit' ? myCourses().indexOf(x.c) >= 0 : false); }); if (vl.length) extra = '<div class="sec"><h2>Vocabulary lessons</h2></div><div class="grid">' + vl.map(lessonCard).join('') + '</div>'; }
    if (k === 'grammar') { var gl = lessonsOf(['grammar']).filter(function (x) { return f === 'all' || f === 'fit' ? (f === 'all' || myCourses().indexOf(x.c) >= 0) : x.c.level === f; }); if (gl.length) extra = '<div class="sec"><h2>Grammar lessons</h2></div><div class="grid">' + gl.map(lessonCard).join('') + '</div>'; }
    view().innerHTML = '<div class="page-h"><div><p class="h-eyebrow">' + esc(t(k)) + '</p><h1>' + esc(sc.h) + '</h1><p>' + esc(sc.p) + '</p></div></div>' +
      (full ? '<div class="chips">' + sc.f.map(function (x) { return '<button class="chip' + (x[0] === f ? ' on' : '') + '" data-f="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' : goalBar()) + gamesChip(k) +
      (k === 'grammar' ? extra : '') + (items.length ? (k === 'grammar' ? '<div class="sec"><h2>Grammar games and practice</h2></div>' : '') + '<div class="grid">' + items.map(itemCard).join('') + '</div>' : (k === 'grammar' && extra ? '' : (full ? '<div class="empty">Nothing here for this filter yet. Try “All”.</div>' : '<div class="empty">Nothing for your goals here yet. <a href="#/onboard">Change goals</a></div>'))) + (k === 'vocab' ? extra : '');
    $$('[data-f]').forEach(function (b) { b.onclick = function () { vSection(k, b.dataset.f); }; });
  }
  /* Games play inside IF App: the game opens in the app frame, with a way back and a full-screen option. */
  var OLD_IDS = { 'skill-games': 'mind-lab', 'g-skill': 'mind-lab', 'g-gram': 'gram-centre', 'ielts-tests': 'ielts-centre', 'mind-lab-ielts': 'mind-lab' };
  /* the student's level from their class or goals: A0 (Beginner), A1 … C2, or PA1/A1/A2 for Starters/Movers/Flyers */
  function myLevel() {
    var m = mine(), BLV = { 'ef-a0': 'A0', 'ef-a1': 'A1', 'ef-a2': 'A2', 'ef-b1': 'B1', 'ef-b2': 'B2', 'ef-c1': 'C1', 'ef-c2': 'C2', 'teens-b1': 'B1', 'teens-b2': 'B2' }, Y = { 'yl:starters': 'PA1', 'yl:movers': 'A1', 'yl:flyers': 'A2' };
    for (var i = 0; i < m.length; i++) { var k = m[i]; if (/^book:/.test(k) && BLV[k.slice(5)]) return BLV[k.slice(5)]; }
    for (i = 0; i < m.length; i++) { k = m[i]; if (/^(ge|be):/.test(k)) return k.split(':')[1]; if (Y[k]) return Y[k]; if (k === 'ket') return 'A2'; if (k === 'pet') return 'B1'; }
    return '';
  }
  function vPlay(id) {
    if (OLD_IDS[id]) id = OLD_IDS[id];
    var it = IFX_DIR.filter(function (x) { return x.id === id; })[0];
    if (!it) return vSection('games');
    setNav(it.s === 'kids' ? 'more' : it.s);
    if (!canOpen(it)) {
      if (!meLoaded) { view().innerHTML = '<p style="text-align:center;margin-top:40px">Loading…</p>'; return; }
      if (S.cls && access().signed) { view().innerHTML = '<div class="join"><span class="ic">🏫</span><h2>' + esc(it.t) + '</h2><p>This isn\'t part of your class. You can open everything for your class and level: ' + esc(mine().map(function (k) { return SNAME[k]; }).join(', ')) + '.</p><div class="row" style="justify-content:center"><a class="btn gold" href="#/">Back to my class</a></div></div>'; return; }
      view().innerHTML = '<div class="join"><span class="ic">' + it.icon + '</span><h2>' + esc(it.t) + '</h2><p>This is part of the full IF App. Create a free account (it takes a minute) to open it — you also get the first two units of every course and 7 days of full access.</p>' +
        '<div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap"><a class="btn gold" href="' + JOIN + '">Create a free account</a><a class="btn ghost" href="/me/#/login?next=' + encodeURIComponent('/app/#/play/' + it.id) + '">Sign in</a></div>' +
        '<p class="note">Free without an account: the first unit of every course, the placement test, IF Live, IF Kart, Kids Quest, IF Skill Games, the IELTS Centre and three vocabulary courses.</p>' +
        '<a class="chip" href="#/' + (SEC[it.s] ? it.s : 'more') + '">← Back</a></div>';
      return;
    }
    if (!useGame(it)) {
      view().innerHTML = '<div class="join"><span class="ic">🎮</span><h2>That\'s ' + GAME_LIMIT + ' games today!</h2><p>The free account includes ' + GAME_LIMIT + ' different games a day, at every level. You can still replay today\'s games (' + gamesToday().ids.map(function (x) { var g = IFX_DIR.filter(function (y) { return y.id === x; })[0]; return g ? '<a href="#/play/' + x + '">' + esc(g.t) + '</a>' : ''; }).filter(Boolean).join(', ') + '), do your lessons, or come back tomorrow.</p>' +
        '<div class="row" style="justify-content:center;gap:10px;flex-wrap:wrap"><a class="btn gold" href="/me/#/upgrade">Unlimited games with full access</a>' + (access().signed ? '' : '<a class="btn ghost" href="' + JOIN + '">Create a free account</a>') + '</div>' +
        '<p class="note">IF Academy students and Abdoulie\'s individual students have unlimited games free with their lessons.</p>' +
        '<a class="chip" href="#/' + (SEC[it.s] ? it.s : 'more') + '">← Back</a></div>';
      return;
    }
    if (/^mind-lab/.test(it.id)) { var mlv = myLevel(); if (mlv) it = Object.assign({}, it, { href: it.href + (it.href.indexOf('?') >= 0 ? '&' : '?') + 'lv=' + mlv }); }   // Mind Lab opens at the student's level
    view().innerHTML = '<div class="playbar"><a class="chip" href="#/' + (SEC[it.s] ? it.s : 'more') + '">← ' + esc(SEC[it.s] ? t(it.s) : t('more')) + '</a><b>' + it.icon + ' ' + esc(it.t) + '</b><a class="chip" href="' + esc(it.href) + '"' + (window.IF_TG ? '' : ' target="_blank" rel="noopener"') + ' data-gf="1">⛶ Full screen</a></div>' +
      '<div class="playwrap" id="pw"><iframe src="' + esc(it.href) + '" title="' + esc(it.t) + '" allow="autoplay; fullscreen; microphone" allowfullscreen></iframe>' +
      '<div class="gfx"><button type="button" id="gx" aria-label="Exit game">✕</button><button type="button" id="gf" aria-label="Full screen">⛶</button></div></div>';
    document.body.classList.add('playing');
    gameFull(view(), window.matchMedia && matchMedia('(max-width:760px), (pointer:coarse) and (max-height:500px)').matches);
  }
  /* game mode: the game fills the whole phone screen like a mobile game (✕ to leave, ⛶ for true full screen) */
  function gameFull(root, on) {
    var pw = root.querySelector('#pw'); if (!pw) return;
    var native = function () { var f = pw.requestFullscreen || pw.webkitRequestFullscreen; if (f) { try { var r = f.call(pw); if (r && r.catch) r.catch(function () {}); } catch (e) {} }
      try { if (screen.orientation && screen.orientation.lock) screen.orientation.lock('portrait').catch(function () {}); } catch (e) {} };
    var set = function (v) { document.body.classList.toggle('game-full', !!v); if (!v && (document.fullscreenElement || document.webkitFullscreenElement)) { try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} } };
    var fs = root.querySelector('[data-gf]'); if (fs) fs.onclick = function (e) { e.preventDefault(); set(true); native(); };
    pw.querySelector('#gf').onclick = function () { if (document.fullscreenElement || document.webkitFullscreenElement) set(false); else { set(true); native(); } };
    pw.querySelector('#gx').onclick = function () { if (document.body.classList.contains('game-full')) set(false); else history.back(); };
    set(on);
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
      '<a class="card" href="https://t.me/intellectfirst" target="_blank" rel="noopener"><span class="ic">📣</span><h3>IF Academy on Telegram</h3><p>Join the channel: news, daily English and school announcements.</p></a>' +
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
    COURSES.forEach(function (c) { if (c.daily) return; c.units.forEach(function (u, ui) { u.lessons.forEach(function (l) {
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

  /* ---------- daily articles (teens and adults): today's article at the student's level, plus the earlier ones ---------- */
  var ART = null;   // set when the page is ready (app/articles.js loads after this file)
  var fmtDate = function (iso) { try { return new Date(iso + 'T00:00:00Z').toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { day: 'numeric', month: 'long', timeZone: 'UTC' }); } catch (e) { return iso; } };
  /** The level for articles: the one chosen on the Articles page, or the level of the active course. null = young learner (no articles). */
  function artLevel() {
    if (!ART) return null;
    if (S.artLv && LEVELS.indexOf(S.artLv) >= 0) return S.artLv;
    var keys = mine(), act = keys.indexOf(S.active) >= 0 ? S.active : keys[0];
    var plans = (act ? [act] : []).concat(keys).map(planOf).filter(function (P) { return !P.kids; });
    if (!plans.length) return keys.length && !S.teacher ? null : 'B1';
    var lv = plans[0].level;
    return LEVELS.indexOf(lv) >= 0 ? lv : lv === 'IELTS' ? 'B2' : 'B1';
  }
  var artCourse = function (lv) { return BY['art-' + lv.toLowerCase()]; };
  /** Today's article is open to everyone; earlier articles need a (free) account. Articles for later days are closed. */
  function artOpen(c, u) {
    if (!ART.open(c.level, u.id)) return false;
    var td = ART.today(c.level); return (td && td.id === u.id) || access().signed;
  }
  function artHomeHTML() {
    var lv = artLevel(), a = lv && ART.today(lv); if (!a) return '';
    var cid = 'art-' + lv.toLowerCase(), done = isDone(cid, a.id, 'r');
    return '<div class="sec"><h2>📰 Today\'s article</h2><a href="#/articles">All articles →</a></div>' +
      '<a class="artcard' + (done ? ' done' : '') + '" href="#/lesson/' + cid + '/' + a.id + '/r"><div><p class="h-eyebrow">' + esc(fmtDate(ART.dateOf(a))) + ' · ' + esc(lv) + ' · ' + esc(a.topic) + '</p><h3>' + esc(a.t) + '</h3>' +
      '<p>' + esc(a.text.split('\n')[0].slice(0, 150).replace(/\s+\S*$/, '')) + '…</p></div><span class="btn ' + (done ? 'ghost' : 'gold') + '">' + (done ? '✓ Read again' : 'Read · ' + ART.minutes(a) + ' min') + '</span></a>';
  }
  function vArticles(lvArg) {
    setNav('home');
    if (!ART) return go('#/');
    if (lvArg && LEVELS.indexOf(lvArg.toUpperCase()) >= 0) { S.artLv = lvArg.toUpperCase(); save(); }
    var lv = artLevel() || 'A1', cid = 'art-' + lv.toLowerCase(), list = ART.list(lv), td = list[0], signed = access().signed;
    var html = '<div class="page-h"><div><p class="h-eyebrow">IF App · Daily articles</p><h1>A new article every day</h1><p>One original article at your level, with key words on flashcards and five questions. Reading it counts towards your daily goal.</p></div></div>' +
      '<div class="chips">' + LEVELS.map(function (l) { return '<a class="chip' + (l === lv ? ' on' : '') + '" href="#/articles/' + l + '">' + l + '</a>'; }).join('') + '</div>';
    if (!td) html += '<div class="empty">The first article arrives soon.</div>';
    else {
      var d0 = isDone(cid, td.id, 'r'), w0 = isDone(cid, td.id, 'v');
      html += '<div class="arthero"><p class="h-eyebrow" style="color:var(--gold2)">Today · ' + esc(fmtDate(ART.dateOf(td))) + ' · ' + esc(td.topic) + '</p><h2>' + esc(td.t) + '</h2><p>' + esc(td.text.split('\n')[0]) + '</p>' +
        '<p class="row" style="gap:10px;flex-wrap:wrap;margin-top:16px"><a class="btn gold" href="#/lesson/' + cid + '/' + td.id + '/r">' + (d0 ? '✓ Read again' : 'Read the article · ' + ART.minutes(td) + ' min') + ' →</a><a class="btn ghost light" href="#/lesson/' + cid + '/' + td.id + '/v">🔤 Key words' + (w0 ? ' ✓' : '') + '</a></p></div>';
      if (list.length > 1) {
        html += '<div class="sec"><h2>Earlier articles</h2></div>' + (signed ? '' : '<p class="artnote">Today\'s article is free for everyone. <a href="' + JOIN + '">Create a free account</a> to read the earlier ones.</p>') +
          '<div class="artlist">' + list.slice(1).map(function (a) {
            var dn = isDone(cid, a.id, 'r');
            return '<a class="artrow' + (signed ? '' : ' locked') + '" href="' + (signed ? '#/lesson/' + cid + '/' + a.id + '/r' : JOIN) + '"><span class="d">' + esc(fmtDate(ART.dateOf(a))) + '</span><span class="t"><b>' + esc(a.t) + '</b><small>' + esc(a.topic) + ' · ' + ART.minutes(a) + ' min</small></span><span class="s">' + (signed ? (dn ? '✓ ' + S.done[key3(cid, a.id, 'r')].score + '%' : '→') : '🔒') + '</span></a>';
          }).join('') + '</div>';
      }
    }
    view().innerHTML = html;
  }
  function artDone(score, xp) {
    var u = L.u, cid = L.c.id, other = u.lessons.filter(function (x) { return x.id !== L.l.id && !isDone(cid, u.id, x.id); })[0];
    view().innerHTML = '<div class="player done-box"><div class="big">' + (score >= 80 ? '🏆' : score >= 50 ? '⭐' : '💪') + '</div><h2>' + (score >= 80 ? 'Excellent!' : score >= 50 ? 'Well done!' : 'Good effort!') + '</h2><p style="color:var(--soft)">' + esc(u.title) + ' · Daily article ' + esc(L.c.level) + '</p>' +
      '<div class="kpis"><div class="kpi"><b>+' + xp + '</b><span>XP</span></div><div class="kpi"><b>' + score + '%</b><span>accuracy</span></div><div class="kpi"><b>🔥 ' + S.streak + '</b><span>' + esc(t('streak')) + '</span></div></div>' +
      '<p style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px"><a class="btn ghost" href="#/articles">All articles</a>' +
      (other ? '<a class="btn gold" href="#/lesson/' + cid + '/' + u.id + '/' + other.id + '">' + (other.type === 'vocab' ? '🔤 Learn the key words →' : '📖 Read the article →') + '</a>' : '<a class="btn gold" href="#/">Back to Home →</a>') + '</p></div>';
    confetti(score >= 50 ? 120 : 40);
    setNav('home');
  }

  /* ---------- router ---------- */
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  function route() {
    try { speechSynthesis.cancel(); } catch (e) {}
    if (ME && Date.now() - gateAt > 20000) loadGate();
    var fb = $('#fb'); if (fb) fb.remove();
    document.body.classList.remove('teach');
    var p = location.hash.replace(/^#\/?/, '').split('?')[0].split('/'), qs = new URLSearchParams(location.hash.split('?')[1] || '');
    window.scrollTo(0, 0);
    try { focusNav(); } catch (e) {}
    setTimeout(function () { try { wireAddOns(); } catch (e) {} }, 0);
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
      case 'articles': return vArticles(p[1]);
      case 'more': return vMore();
      case 'search': return vSearch(($('#q') || {}).value || qs.get('q') || '');
      default: return vHome();
    }
  }
  /* C1–C2 courses are English only (no Russian translations), and every teen/adult unit gets an "In context"
     lesson: listen and choose, listen and write, which sentence is right, listen and order, then say it aloud. */
  function prepCourses() {
    COURSES.forEach(function (c) {
      if (c.daily) return;
      var adv = /^C/.test(c.level || '');
      c.units.forEach(function (u) {
        u.lessons.forEach(function (l) { if (adv) (l.words || []).forEach(function (w) { delete w.ru; }); });
        if (c.track === 'kids' || u.lessons.some(function (l) { return l.type === 'context'; })) return;
        if (unitWords(u).length < 4) return;
        var i = u.lessons.map(function (x) { return x.type; }).indexOf('check');
        u.lessons.splice(i < 0 ? u.lessons.length : i, 0, { id: 'cx', type: 'context', title: 'Words in context: listen, write, speak' });
      });
    });
  }
  function unitWords(u) { var a = []; u.lessons.forEach(function (l) { if (l.type === 'vocab') (l.words || []).forEach(function (w) { if (!w.pic && w.e) a.push(w); }); }); return a; }
  // the exact text of the word inside its example sentence ("split hairs" in "Let's not split hairs…"), or null
  function inEx(w) { var full = w.w.replace(/\s*\(.*?\)\s*/g, ' ').trim(), j = w.e.toLowerCase().indexOf(full.toLowerCase()); if (j >= 0 && full.length > 1) return w.e.substr(j, full.length); var b = w.w.replace(/^(to |a |an |the )/i, '').replace(/\s*\(.*?\)\s*/g, ' ').replace(/ (sb|sth|someone|something)\b/gi, '').trim(); if (b.length < 2) return null; var i = w.e.toLowerCase().indexOf(b.toLowerCase()); return i < 0 ? null : w.e.substr(i, b.length); }
  function contextEx(u) {
    var all = unitWords(u), ok = shuffle(all.filter(inEx)), out = [], used = {};
    var pick = function (n, f) { var r = []; ok.forEach(function (w) { if (r.length < n && !used[w.w] && (!f || f(w))) { used[w.w] = 1; r.push(w); } }); return r; };
    var three = function (x) { return shuffle([x].concat(shuffle(all.filter(function (y) { return y !== x; })).slice(0, 2))); };
    pick(3).forEach(function (x) { var o = three(x); out.push({ t: 'mc', q: 'Listen. Which word or phrase do you hear?', listen: x.e, o: o.map(function (y) { return y.w; }), a: o.indexOf(x), why: x.e }); });
    pick(3).forEach(function (x) { var m = inEx(x); out.push({ t: 'gap', h: 'Listen and write the missing word or phrase.', listen: x.e, q: x.e.replace(m, '___'), a: [m, x.w], why: x.e }); });
    pick(2).forEach(function (x) {
      var bad = shuffle(ok.filter(function (y) { return y !== x; })).slice(0, 2).map(function (y) { return y.e.replace(inEx(y), inEx(x)); });
      if (bad.length < 2) return; var o = shuffle([x.e].concat(bad));
      out.push({ t: 'mc', q: 'Which sentence uses “' + x.w + '” correctly?', o: o, a: o.indexOf(x.e), why: x.w + ': ' + x.d });
    });
    pick(1, function (w) { var n = w.e.split(' ').length; return n >= 5 && n <= 13; }).forEach(function (x) { out.push({ t: 'order', h: 'Listen, then put the words in order.', listen: x.e, a: x.e }); });
    shuffle(all).slice(0, 2).forEach(function (x) { out.push({ t: 'speak', a: x.e, why: x.w + ': ' + x.d }); });
    return out;
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', async function () {
    document.documentElement.lang = lang;
    if (/[?&]embed=1/.test(location.search)) { document.body.classList.add('embed'); document.addEventListener('click', function (e) { var a = e.target.closest('a[href]'); if (a && a.getAttribute('href').charAt(0) !== '#') a.target = '_top'; }); }
    ART = window.IF_ARTICLES || null;
    prepCourses(); frame(); route();
    await loadMe(); meLoaded = true; frame(); route();
  });
})();
