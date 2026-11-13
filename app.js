/* IF Academy hub: one page, tabs by skill, Games / Practice inside each tab. */
(function () {
  var ROOT = window.IF_ROOT, ALL = window.IF_CATALOG || [];
  // the skill-games app opens straight into one game or one practice bank
  var SG = ALL.filter(function (i) { return i.slug === 'skill-games'; })[0];
  if (SG) {
    var base = SG.href;
    [
      ['sg-edit', 'Spot the Error', 'grammar', 'game', 'Tap the one word that is wrong before time runs out', '#edit'],
      ['sg-build', 'Sentence Builder', 'grammar', 'game', 'Put the words in the right order, fast', '#build'],
      ['sg-trim', 'Trim It', 'grammar', 'game', 'Cut the words a good editor would delete', '#trim'],
      ['sg-precise', 'Precise Word', 'vocabulary', 'game', 'Pick the word that fits the sentence exactly', '#precise'],
      ['sg-match', 'Speed Match', 'vocabulary', 'game', 'Match words to meanings against the clock', '#match'],
      ['sg-colloc', 'Word Partners', 'vocabulary', 'game', 'make, do, take or have? Choose the natural partner', '#colloc'],
      ['sg-pg', 'Grammar Practice Bank', 'grammar', 'practice', 'Untimed exercises with explanations, by level', '#practice-grammar'],
      ['sg-pv', 'Vocabulary Practice Bank', 'vocabulary', 'practice', 'Untimed exercises with explanations, by level', '#practice-vocabulary']
    ].forEach(function (g) { ALL.push({ slug: g[0], title: g[1], skill: g[2], mode: g[3], level: 'A2–C1', access: 'public', blurb: g[4], href: base + g[5], parent: 'skill-games' }); });
  }
  var KE = ALL.filter(function (i) { return i.slug === 'kids-english'; })[0];
  if (KE) {
    [
      ['ke-words', 'Kids Words', 'vocabulary', 'game', 'Look, listen, spell: Starters to Flyers words with pictures and Russian', '#look'],
      ['ke-dict', 'Picture Dictionary', 'vocabulary', 'practice', 'Every Starters, Movers and Flyers word with a picture and Russian', '#cards'],
      ['ke-grammar', 'Kids Grammar', 'grammar', 'game', 'is or are, has or have, in on under: choose and win stars', '#grammar'],
      ['ke-where', 'Where Is It?', 'grammar', 'practice', 'Prepositions with picture scenes, in English and Russian', '#where']
    ].forEach(function (g) { ALL.push({ slug: g[0], title: g[1], skill: g[2], mode: g[3], level: 'Pre-A1–A2 · Young learners', access: 'public', blurb: g[4], href: KE.href + g[5], parent: 'kids-english', book: 'Cambridge Young Learners' }); });
  }
  var TABS = [
    { id: 'today', en: 'Today', ru: 'Сегодня', kk: 'Бүгін' },
    { id: 'kids', en: 'Kids', ru: 'Дети', kk: 'Балалар' },
    { id: 'vocabulary', en: 'Vocabulary', ru: 'Лексика', kk: 'Сөздік' },
    { id: 'grammar', en: 'Grammar', ru: 'Грамматика', kk: 'Грамматика' },
    { id: 'books', en: 'Coursebooks', ru: 'Учебники', kk: 'Оқулықтар' },
    { id: 'ielts', en: 'IELTS', ru: 'IELTS', kk: 'IELTS' },
    { id: 'languages', en: 'Kazakh & Russian', ru: 'Казахский и русский', kk: 'Қазақ және орыс тілі' },
    { id: 'tests', en: 'Tests', ru: 'Тесты', kk: 'Тесттер' },
    { id: 'materials', en: 'Materials', ru: 'Материалы', kk: 'Материалдар' },
    { id: 'staff', en: 'Staff', ru: 'Учителям', kk: 'Мұғалімдерге' }
  ];
  var MODES = { all: { en: 'All', ru: 'Все', kk: 'Барлығы' }, game: { en: 'Games', ru: 'Игры', kk: 'Ойындар' }, practice: { en: 'Practice', ru: 'Практика', kk: 'Жаттығу' }, test: { en: 'Tests', ru: 'Тесты', kk: 'Тесттер' } };
  var T = {
    en: { kicker: 'IF Learning Centre · Kostanay', title: 'Practise, play and prepare', lede: 'Games, practice banks, IELTS, Kazakh and Russian courses, tests and lesson materials in one place. Add it to your home screen and it works like an app.', search: 'Search', classes: 'Class timetable', install: 'Install app', signin: 'Sign in', signout: 'Sign out', none: 'Nothing matches that search.', guest: 'Games and practice are open to everyone. Sign in with your IF Academy account to open the tests and IF English.', student: 'Signed in as a student. Tests and lesson materials are open.', teacher: 'Signed in as a teacher. Everything is open, including teacher views and staff tools.', locked: 'Class code', staffonly: 'Staff code', continue: 'Continue where you left off', workout: 'Today’s workout', workoutP: 'Three quick games, about five minutes. A new mix every day.', start: 'Start', results: 'Results', materialsFor: 'Lesson materials for this book', everyone: 'Open to everyone' },
    ru: { kicker: 'IF Learning Centre · Костанай', title: 'Практикуйтесь, играйте, готовьтесь', lede: 'Игры, упражнения, IELTS, курсы казахского и русского, тесты и материалы уроков в одном месте. Добавьте на главный экран — и это работает как приложение.', search: 'Поиск', classes: 'Расписание', install: 'Установить', signin: 'Войти', signout: 'Выйти', none: 'Ничего не найдено.', guest: 'Игры и практика открыты для всех. Войдите в аккаунт IF Academy, чтобы открыть тесты и IF English.', student: 'Вы вошли как ученик. Тесты и материалы открыты.', teacher: 'Вы вошли как учитель. Открыто всё, включая режим учителя.', locked: 'Код группы', staffonly: 'Код учителя', continue: 'Продолжить', workout: 'Тренировка дня', workoutP: 'Три быстрые игры, около пяти минут. Каждый день новый набор.', start: 'Начать', results: 'Результаты', materialsFor: 'Материалы уроков по этому учебнику', everyone: 'Открыто для всех' },
    kk: { kicker: 'IF Learning Centre · Қостанай', title: 'Жаттығыңыз, ойнаңыз, дайындалыңыз', lede: 'Ойындар, жаттығулар, IELTS, қазақ және орыс тілі курстары, тесттер мен сабақ материалдары бір жерде. Басты экранға қосыңыз — қосымша сияқты жұмыс істейді.', search: 'Іздеу', classes: 'Кесте', install: 'Орнату', signin: 'Кіру', signout: 'Шығу', none: 'Ештеңе табылмады.', guest: 'Ойындар мен жаттығулар барлығына ашық. Тесттер мен IF English үшін IF Academy аккаунтыңызбен кіріңіз.', student: 'Оқушы ретінде кірдіңіз. Тесттер мен материалдар ашық.', teacher: 'Мұғалім ретінде кірдіңіз. Барлығы ашық.', locked: 'Топ коды', staffonly: 'Мұғалім коды', continue: 'Жалғастыру', workout: 'Күнделікті жаттығу', workoutP: 'Үш жылдам ойын, шамамен бес минут. Күн сайын жаңа жинақ.', start: 'Бастау', results: 'Нәтижелер', materialsFor: 'Осы оқулық бойынша сабақ материалдары', everyone: 'Барлығына ашық' }
  };
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var lang = ls('if_lang') || 'en'; if (!T[lang]) lang = 'en';
  var role = IFLock.role();
  var tab = (location.hash.slice(1) || ls('if.tab') || 'today');
  var mode = 'all', level = 'all', q = '';
  function t(k) { return (T[lang] && T[lang][k]) || T.en[k] || k; }
  function tn(o) { return o[lang] || o.en; }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function canOpen(it) { return it.access === 'public' || (it.access === 'student' && !!role) || (it.access === 'teacher' && role === 'teacher'); }
  function inTab(it, id) {
    if (id === 'vocabulary') return it.skill === 'vocabulary' || it.skill === 'mixed' && !it.parent;
    if (id === 'grammar') return it.skill === 'grammar' || it.skill === 'mixed' && !it.parent;
    if (id === 'kids') return /Young learners/.test(it.level) || it.book === 'Cambridge Young Learners';
    if (id === 'ielts') return it.skill === 'ielts';
    if (id === 'languages') return it.skill === 'languages';
    if (id === 'tests') return it.mode === 'test';
    if (id === 'materials') return it.skill === 'materials';
    if (id === 'staff') return it.skill === 'staff' || it.skill === 'info';
    return false;
  }
  function tile(it) {
    var a = el('a', 'tile' + (it.skill === 'materials' || it.feature ? ' feature' : ''));
    a.href = canOpen(it) ? ROOT + it.href : ROOT + 'login/index.html?next=' + encodeURIComponent(it.href);
    var lv = el('div', 'lv'); lv.appendChild(el('span', '', [it.level, it.mode && MODES[it.mode] && it.mode !== 'materials' ? tn(MODES[it.mode]) : ''].filter(Boolean).join(' · ')));
    if (!canOpen(it)) lv.appendChild(el('span', 'lock', it.access === 'teacher' ? t('staffonly') : t('locked')));
    var localized=(it.translations||{})[lang]||it;
    a.appendChild(lv); a.appendChild(el('h3', '', localized.title)); a.appendChild(el('p', '', localized.blurb));
    return a;
  }
  function grid(list) { var g = el('div', 'grid'); list.forEach(function (i) { g.appendChild(tile(i)); }); return g; }
  function shelf(title, list, count) {
    var s = el('section', 'shelf'); var h = el('div', 'shelf-head'); h.appendChild(el('h2', '', title)); if (count) h.appendChild(el('span', '', String(list.length))); s.appendChild(h); s.appendChild(grid(list)); return s;
  }
  function levelOf(it) { var m = String(it.level).match(/\b(Pre-A1|A1|A2|B1|B2|C1|C2)\b/); return m ? m[1] : 'all'; }
  function matchesQ(it) {
    var s = (it.title + ' ' + it.level + ' ' + it.blurb + ' ' + (it.book || '')).toLowerCase();
    return q.toLowerCase().split(/\s+/).every(function (w) { return s.indexOf(w) >= 0; });
  }
  function visibleTabs() { return TABS.filter(function (x) { return x.id !== 'staff' || role === 'teacher'; }); }

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (n) { n.textContent = t(n.getAttribute('data-t')); });
    document.getElementById('q').placeholder = { en: 'Search games, levels, books, tests…', ru: 'Поиск: игры, уровни, учебники…', kk: 'Іздеу: ойындар, деңгейлер, оқулықтар…' }[lang];
    document.getElementById('langBtn').textContent = lang.toUpperCase();
    var sb = document.getElementById('signBtn');
    if (role) { sb.textContent = t('signout'); sb.href = '#'; } else { sb.textContent = t('signin'); sb.href = ROOT + 'login/index.html?next=app/index.html'; }
    var st = document.getElementById('status'); st.textContent = '';
    st.appendChild(el('span', '', role === 'teacher' ? t('teacher') : role === 'student' ? t('student') : t('guest')));
    if (!role) { var b = el('a', 'btn small primary', t('signin')); b.href = ROOT + 'login/index.html?next=app/index.html'; st.appendChild(b); }

    if (!visibleTabs().some(function (x) { return x.id === tab; })) tab = 'today';
    var tabs = document.getElementById('tabs'); tabs.textContent = '';
    visibleTabs().forEach(function (x) {
      var b = el('button', 'tab', tn(x)); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', String(tab === x.id));
      b.onclick = function () { tab = x.id; mode = 'all'; level = 'all'; ls('if.tab', tab); history.replaceState(null, '', '#' + tab); render(); };
      tabs.appendChild(b);
    });
    var sel = tabs.querySelector('[aria-selected="true"]'); if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest', inline: 'nearest' });

    var host = document.getElementById('shelves'); host.textContent = '';
    var pool = ALL.filter(function (i) { return (i.skill !== 'staff' || role === 'teacher'); });
    if (q) {
      var hits = pool.filter(matchesQ);
      if (hits.length) host.appendChild(shelf(t('results'), hits, true)); else host.appendChild(el('p', 'empty', t('none')));
      return;
    }
    if (tab === 'today') return renderToday(host, pool);
    if (tab === 'books') return renderBooks(host, pool);
    var list = pool.filter(function (i) { return inTab(i, tab); });
    var modes = ['all'].concat(['game', 'practice', 'test'].filter(function (m) { return list.some(function (i) { return i.mode === m; }); }));
    var levels = ['all'].concat(['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1'].filter(function (l) { return list.some(function (i) { return levelOf(i) === l; }); }));
    if (modes.length > 2 || levels.length > 2) {
      var bar = el('div', 'subbar');
      if (modes.length > 2) { var seg = el('div', 'seg'); modes.forEach(function (m) { var b = el('button', '', tn(MODES[m])); b.type = 'button'; b.setAttribute('aria-pressed', String(mode === m)); b.onclick = function () { mode = m; render(); }; seg.appendChild(b); }); bar.appendChild(seg); }
      if (levels.length > 2) { var lv = el('div', 'levels'); levels.forEach(function (l) { var c = el('button', 'chip', l === 'all' ? tn(MODES.all) : l); c.type = 'button'; c.setAttribute('aria-pressed', String(level === l)); c.onclick = function () { level = l; render(); }; lv.appendChild(c); }); bar.appendChild(lv); }
      host.appendChild(bar);
    }
    list = list.filter(function (i) { return (mode === 'all' || i.mode === mode) && (level === 'all' || levelOf(i) === level || levelOf(i) === 'all'); });
    if (mode === 'all' && modes.length > 2) {
      ['game', 'practice', 'test'].forEach(function (m) { var part = list.filter(function (i) { return i.mode === m; }); if (part.length) host.appendChild(shelf(tn(MODES[m]), part, true)); });
      var rest = list.filter(function (i) { return ['game', 'practice', 'test'].indexOf(i.mode) < 0; }); if (rest.length) host.appendChild(shelf('', rest));
    } else if (list.length) { var g = grid(list); g.style.marginTop = '18px'; host.appendChild(g); }
    else host.appendChild(el('p', 'empty', t('none')));
  }
  function renderToday(host, pool) {
    if (SG) {
      var w = el('a', 'workout'); w.href = ROOT + SG.href + '#workout';
      var d = el('div'); d.appendChild(el('div', 'eyebrow', new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'kk-KZ', { weekday: 'long', day: 'numeric', month: 'long' })));
      d.appendChild(el('h2', '', t('workout'))); d.appendChild(el('p', '', t('workoutP'))); w.appendChild(d); w.appendChild(el('span', 'go', t('start') + ' →'));
      host.appendChild(w);
    }
    var r = []; try { r = JSON.parse(ls('if.recent') || '[]'); } catch (e) {}
    var rec = r.map(function (s) { return pool.filter(function (i) { return i.slug === s; })[0]; }).filter(Boolean).slice(0, 6);
    if (rec.length) host.appendChild(shelf(t('continue'), rec));
    var picks = ['kids-english', 'sg-edit', 'sg-precise', 'grammar-game-centre', 'taboo', 'ielts', 'placement-test'].map(function (s) { return pool.filter(function (i) { return i.slug === s; })[0]; }).filter(Boolean);
    host.appendChild(shelf(t('everyone'), picks));
    var mat = pool.filter(function (i) { return i.skill === 'materials'; });
    if (mat.length) host.appendChild(shelf(tn(TABS.filter(function (x) { return x.id === 'materials'; })[0]), mat));
  }
  function renderBooks(host, pool) {
    var books = {}; pool.forEach(function (i) { if (i.book) (books[i.book] = books[i.book] || []).push(i); });
    var order = ['English File', 'English for Teenagers', 'Cambridge Young Learners', 'A2 Key (KET)', 'B1 Preliminary (PET)', 'Grammar in Use (Murphy)', 'IELTS'];
    Object.keys(books).sort(function (a, b) { return (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99); }).forEach(function (bk) {
      var sec = el('section', 'book');
      var h = el('div', 'shelf-head'); h.appendChild(el('h2', '', bk));
      var ml = el('a', 'mlink', t('materialsFor') + ' →'); ml.href = ROOT + (role ? 'materials/index.html' : 'login/index.html?next=materials/index.html'); h.appendChild(ml);
      sec.appendChild(h);
      var list = books[bk].slice().sort(function (a, b) { var o = { game: 0, practice: 1, test: 2 }; return (o[a.mode] - o[b.mode]) || String(levelOf(a)).localeCompare(String(levelOf(b))); });
      sec.appendChild(grid(list)); host.appendChild(sec);
    });
  }
  document.getElementById('q').addEventListener('input', function (e) { q = e.target.value.trim(); render(); });
  document.getElementById('langBtn').onclick = function () { lang = { en: 'ru', ru: 'kk', kk: 'en' }[lang]; ls('if_lang', lang); render(); };
  document.getElementById('signBtn').addEventListener('click', function (e) { if (role) { e.preventDefault(); IFLock.signOut(); role = ''; render(); } });
  window.addEventListener('hashchange', function () { var h = location.hash.slice(1); if (h && h !== tab) { tab = h; render(); } });
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; document.getElementById('installBtn').classList.add('show'); });
  document.getElementById('installBtn').onclick = function () { if (deferred) { deferred.prompt(); deferred = null; this.classList.remove('show'); } };
  render();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register(ROOT + 'sw.js').catch(function () {});
})();
