/* IF English home screen: Learn · Games · Premium · Settings */
(function () {
  'use strict';
  var C = window.IFEN_CONFIG || {}, IFEN = window.IFEN, COURSES = window.IFEN_COURSES || [], GAMES = window.IFEN_GAMES || [];
  var $ = function (s, e) { return (e || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };

  /* ---------- language ---------- */
  var lang = IFEN.get('ifen:lang', null) || (/^(ru|kk)/i.test(navigator.language || '') ? 'ru' : 'en');
  var S = {
    en: {
      tagline: 'by IF Academy', tabLearn: 'Learn', tabGames: 'Games', tabSettings: 'Settings',
      free: 'Free', premium: 'Premium', continue: 'Continue', start: 'Start learning',
      heroK: 'IF Academy', heroT: 'Learn every word. Hear it. Play with it.',
      heroP: 'Flashcards with British pronunciation, games for every unit and classroom games, from A1 to IELTS.',
      courses: 'courses', units: 'units', words: 'words',
      gGeneral: 'General English', gGeneralP: 'Levels A1 to C1, unit by unit.',
      gTeens: 'Teens 16–18', gTeensP: 'Topics and vocabulary for older teenagers.',
      gYoung: 'Young learners', gYoungP: 'Movers, Flyers and A2 Key (KET), with Russian translations.',
      gExam: 'Exam preparation', gExamP: 'B1 Preliminary and IELTS vocabulary.',
      freeUnits: function (n) { return n + ' free units'; }, allOpen: 'All units open',
      gamesT: 'IF Game Room', gamesP: 'Mafia, murder mysteries, detective puzzles, riddles, Alibi, board and card games for the whole class. Free for everyone.',
      open: 'Open the Game Room', gamesSec: 'All classroom games', insideT: 'Games inside every course',
      insideP: 'Every course also has quizzes, Match, Spell It, Blocks, Gravity, the IF Arcade with coins and streaks, and team games for the board.',
      pT: 'IF English Premium', pP: 'Open every unit in all 12 courses.',
      b1: 'Every unit of all 12 courses, A1 to IELTS', b2: 'British pronunciation and audio for every word',
      b3: 'All study modes and games for every unit', b4: 'Mix units to review a whole level', b5: 'New units as they are added',
      monthly: 'Monthly', yearly: 'Yearly', perMonth: 'per month', perYear: 'per year', save: 'Save',
      subscribe: 'Subscribe', restore: 'Restore purchases', manage: 'Manage subscription',
      youPro: 'You have Premium', youProP: 'Thank you for supporting IF Academy. Every unit is open.',
      renews: 'Renews', ends: 'Ends', loading: 'Loading plans…',
      soon: 'Subscriptions open soon. Everything free is ready to use now.',
      webOnly: 'This is the browser preview. Subscriptions work in the Android and iOS app.',
      legalIos: 'Payment is charged to your Apple ID when you confirm. The subscription renews automatically unless you cancel at least 24 hours before the end of the current period. Manage or cancel it in your App Store account settings.',
      legalAnd: 'Payment is charged to your Google Play account when you confirm. The subscription renews automatically until you cancel. Manage or cancel it in Google Play › Payments & subscriptions.',
      terms: 'Terms of Use', privacy: 'Privacy Policy',
      okPro: 'Premium is on. Every unit is open!', noPurchases: 'No active subscription was found for this account.',
      restored: 'Purchases restored. Premium is on.', failed: 'Something went wrong. Please try again.',
      sLang: 'Language', sLangP: 'App menus', sVoice: 'Pronunciation voice', sVoiceP: 'Used on every flashcard',
      sSub: 'Subscription', sSupport: 'Help & support', sContact: 'Contact IF Academy', sReset: 'Reset my progress',
      sResetP: 'Clears scores, streaks and saved units on this device', sResetQ: 'Clear all your progress on this device? This cannot be undone.',
      sResetDone: 'Progress cleared.', sAbout: 'About', version: 'Version',
      aboutP: 'IF English is made by IF Academy, Kostanay. Exam names are used only to describe the vocabulary level; IF English is not affiliated with Cambridge University Press & Assessment, IDP or the British Council.',
      dev: 'Browser preview: Premium', statusFree: 'FREE', statusPro: 'PREMIUM', yes: 'Yes', no: 'No'
    },
    ru: {
      tagline: 'от IF Academy', tabLearn: 'Учиться', tabGames: 'Игры', tabSettings: 'Настройки',
      free: 'Бесплатно', premium: 'Premium', continue: 'Продолжить', start: 'Начать',
      heroK: 'IF Academy', heroT: 'Учите каждое слово. Слушайте. Играйте.',
      heroP: 'Карточки с британским произношением, игры для каждого юнита и игры для класса — от A1 до IELTS.',
      courses: 'курсов', units: 'юнитов', words: 'слов',
      gGeneral: 'Общий английский', gGeneralP: 'Уровни от A1 до C1, юнит за юнитом.',
      gTeens: 'Подростки 16–18', gTeensP: 'Темы и лексика для старших подростков.',
      gYoung: 'Дети', gYoungP: 'Movers, Flyers и A2 Key (KET) с переводом на русский.',
      gExam: 'Подготовка к экзаменам', gExamP: 'Лексика B1 Preliminary и IELTS.',
      freeUnits: function (n) { return n + ' юнита бесплатно'; }, allOpen: 'Все юниты открыты',
      gamesT: 'IF Game Room', gamesP: 'Мафия, детективы, загадки, Алиби, настольные и карточные игры для всего класса. Бесплатно для всех.',
      open: 'Открыть Game Room', gamesSec: 'Все игры для класса', insideT: 'Игры внутри каждого курса',
      insideP: 'В каждом курсе есть викторины, Match, Spell It, Blocks, Gravity, IF Arcade с монетами и сериями, а также командные игры.',
      pT: 'IF English Premium', pP: 'Все юниты во всех 12 курсах.',
      b1: 'Все юниты 12 курсов, от A1 до IELTS', b2: 'Британское произношение и озвучка каждого слова',
      b3: 'Все режимы и игры для каждого юнита', b4: '«Смешать юниты» для повторения уровня', b5: 'Новые юниты по мере выхода',
      monthly: 'Месяц', yearly: 'Год', perMonth: 'в месяц', perYear: 'в год', save: 'Выгода',
      subscribe: 'Оформить подписку', restore: 'Восстановить покупки', manage: 'Управлять подпиской',
      youPro: 'У вас Premium', youProP: 'Спасибо, что поддерживаете IF Academy. Все юниты открыты.',
      renews: 'Продление', ends: 'Действует до', loading: 'Загружаем тарифы…',
      soon: 'Подписка скоро откроется. Всё бесплатное уже доступно.',
      webOnly: 'Это просмотр в браузере. Подписка работает в приложении для Android и iOS.',
      legalIos: 'Оплата списывается с Apple ID после подтверждения. Подписка продлевается автоматически, если не отменить её минимум за 24 часа до конца периода. Управлять и отменить можно в настройках App Store.',
      legalAnd: 'Оплата списывается с аккаунта Google Play после подтверждения. Подписка продлевается автоматически до отмены. Управлять и отменить можно в Google Play › Платежи и подписки.',
      terms: 'Условия использования', privacy: 'Политика конфиденциальности',
      okPro: 'Premium включён. Все юниты открыты!', noPurchases: 'Активная подписка для этого аккаунта не найдена.',
      restored: 'Покупки восстановлены. Premium включён.', failed: 'Что-то пошло не так. Попробуйте ещё раз.',
      sLang: 'Язык', sLangP: 'Меню приложения', sVoice: 'Голос произношения', sVoiceP: 'Для всех карточек',
      sSub: 'Подписка', sSupport: 'Помощь', sContact: 'Написать в IF Academy', sReset: 'Сбросить прогресс',
      sResetP: 'Удаляет очки, серии и сохранённые юниты на этом устройстве', sResetQ: 'Удалить весь прогресс на этом устройстве? Это нельзя отменить.',
      sResetDone: 'Прогресс удалён.', sAbout: 'О приложении', version: 'Версия',
      aboutP: 'IF English создано IF Academy, Костанай. Названия экзаменов указывают только уровень лексики; IF English не связано с Cambridge University Press & Assessment, IDP или British Council.',
      dev: 'Просмотр в браузере: Premium', statusFree: 'FREE', statusPro: 'PREMIUM', yes: 'Да', no: 'Нет'
    }
  };
  function t(k) { if (!IFEN.native && (k === 'premium' || k === 'statusPro')) return lang === 'ru' ? 'Доступ академии' : 'Academy access'; return (S[lang] && S[lang][k] != null ? S[lang] : S.en)[k]; }
  function name(o) { return o ? (o[lang] || o.en) : ''; }

  /* ---------- toast ---------- */
  var tt;
  function toast(msg) { var el = $('#toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { el.classList.remove('on'); }, 3200); }

  /* ---------- chrome ---------- */
  function chrome(view) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = t(el.dataset.t); });
    document.querySelectorAll('.tabs button').forEach(function (b) { if (b.dataset.go === view) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    var st = $('#status'), pro = IFEN.isPremium();
    st.textContent = pro ? '★ ' + t('statusPro') : '★ ' + t('premium');
    st.classList.toggle('pro', pro);
    st.setAttribute('aria-label', pro ? t('youPro') : t('pT'));
  }
  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-go]'); if (g) { e.preventDefault(); go(g.dataset.go); }
  });


  function access() {
    return '<section class="hero"><span class="eyebrow">IF Academy</span><h2>' + (IFEN.isPremium() ? 'Academy access active' : 'Access code required') + '</h2><p>The first 2 vocabulary units of every course are free. Academy students and staff can open all units with their existing academy access code.</p><form id="academy-access"><label for="academy-code">Academy access code</label><input id="academy-code" type="password" autocomplete="off" required style="display:block;width:100%;box-sizing:border-box;margin:12px 0;padding:14px;border-radius:12px"><button class="btn" type="submit">Unlock</button><p id="access-message" role="status"></p></form>' + (IFEN.isPremium() ? '<button class="btn line" type="button" id="academy-signout">Sign out of academy access</button>' : '') + '</section>';
  }
  document.addEventListener('submit', function(e) {
    if(e.target.id !== 'academy-access') return;
    e.preventDefault(); var form=e.target, button=form.querySelector('button'), msg=document.getElementById('access-message'); button.disabled=true; msg.textContent='Checking…';
    IFLock.signIn(document.getElementById('academy-code').value, '/').then(function(){ window.dispatchEvent(new Event('ifen:premium')); }).catch(function(){ msg.textContent='That code did not work. Check it and try again.'; }).finally(function(){button.disabled=false;});
  });
  document.addEventListener('click',function(e){if(e.target.closest('#academy-signout')){IFLock.signOut(); window.dispatchEvent(new Event('ifen:premium'));}});

  /* ---------- views ---------- */
  var VIEWS = { home: home, games: games, premium: premium, access: access, settings: settings };
  function current() { var h = (location.hash || '').replace('#', '').split('?')[0]; if (!IFEN.native && h === 'premium') return 'access'; return VIEWS[h] ? h : 'home'; }
  function go(v) { if (location.hash !== '#' + v) location.hash = v; else show(); }
  function show() {
    var v = current(); chrome(v);
    var m = $('#view'); m.innerHTML = VIEWS[v]() || ''; window.scrollTo(0, 0);
    if (v === 'premium' && IFEN.native) loadPlans();
    if (!IFEN.native) { document.querySelectorAll('[data-go="premium"], #restore, #manage, [data-dev]').forEach(function(el){el.hidden=true;}); }
  }
  window.addEventListener('hashchange', show);
  window.IFEN_BACK = function () { if (current() !== 'home') { go('home'); return true; } return false; };

  function totals() {
    var u = 0, w = 0; COURSES.forEach(function (c) { u += c.units; w += c.words; });
    return { courses: COURSES.length, units: u, words: w };
  }
  var ARROW = '<span class="arrow"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span>';

  function courseCard(c) {
    var pro = IFEN.isPremium();
    return '<a class="course" href="courses/' + esc(c.id) + '/index.html" data-course="' + esc(c.id) + '">' +
      '<span class="badge ' + esc(c.group) + '"><b' + (c.badge.length > 3 ? ' class="sm"' : '') + '>' + esc(c.badge) + '</b><small>' + esc(c.badgeSub || '') + '</small></span>' +
      '<span class="cinfo"><h3>' + esc(name(c.title)) + '</h3><span class="meta">' + c.units + ' ' + t('units') + ' · ' + fmt(c.words) + ' ' + t('words') + '</span>' +
      '<span class="chips">' + (pro ? '<span class="chip pro">★ ' + t('allOpen') + '</span>' : '<span class="chip free">' + esc(t('freeUnits')(c.free.length)) + '</span><span class="chip">🔒 ' + (c.units - c.free.length) + ' Premium</span>') + '</span></span>' +
      ARROW + '</a>';
  }
  function home() {
    var T = totals(), last = IFEN.get('ifen:last', null), lc = COURSES.filter(function (c) { return c.id === last; })[0];
    var groups = [['general', 'gGeneral', 'gGeneralP'], ['teens', 'gTeens', 'gTeensP'], ['young', 'gYoung', 'gYoungP'], ['exam', 'gExam', 'gExamP']];
    var h = '<section class="hero"><span class="eyebrow">' + t('heroK') + '</span><h2>' + t('heroT') + '</h2><p>' + t('heroP') + '</p>' +
      '<div class="stats"><div class="stat"><b>' + T.courses + '</b><span>' + t('courses') + '</span></div><div class="stat"><b>' + fmt(T.units) + '</b><span>' + t('units') + '</span></div><div class="stat"><b>' + fmt(T.words) + '</b><span>' + t('words') + '</span></div></div>' +
      '<div class="cta">' + (lc ? '<a class="btn gold" href="courses/' + esc(lc.id) + '/index.html" data-course="' + esc(lc.id) + '">' + t('continue') + ': ' + esc(name(lc.title)) + '</a>'
        : '<a class="btn gold" href="#general" data-jump="general">' + t('start') + '</a>') +
      (!IFEN.native ? '<a class="btn ghost" href="#access">Academy access</a>' : IFEN.isPremium() ? '' : '<button type="button" class="btn ghost" data-go="premium">★ ' + t('premium') + '</button>') + '</div></section>';
    groups.forEach(function (g) {
      var list = COURSES.filter(function (c) { return c.group === g[0]; }); if (!list.length) return;
      h += '<h2 class="sec" id="' + g[0] + '">' + t(g[1]) + '</h2><p class="sec">' + t(g[2]) + '</p><div class="grid">' + list.map(courseCard).join('') + '</div>';
    });
    h += '<h2 class="sec">' + t('gamesT') + '</h2><p class="sec">' + t('gamesP') + '</p>' +
      '<a class="course" href="#games" data-go="games"><span class="badge"><b>GR</b><small>' + t('free') + '</small></span><span class="cinfo"><h3>' + t('gamesT') + '</h3><span class="meta">' + GAMES.length + ' games</span></span>' + ARROW + '</a>';
    return h;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-course]'); if (a) IFEN.set('ifen:last', a.dataset.course);
    var j = e.target.closest('[data-jump]'); if (j) { e.preventDefault(); var el = document.getElementById(j.dataset.jump); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });

  function games() {
    var cats = window.IFEN_GAME_CATS || [];
    var h = '<section class="gfeature"><img src="img/gameroom.png" alt="" width="859" height="424"><div class="in"><span class="eyebrow">' + t('free') + '</span><h3>' + t('gamesT') + '</h3><p class="muted" style="margin:0 0 14px">' + t('gamesP') + '</p>' +
      '<a class="btn navy" href="gameroom/index.html#home">' + t('open') + '</a></div></section>';
    cats.forEach(function (c) {
      var list = GAMES.filter(function (g) { return g.cat === c.id; }); if (!list.length) return;
      h += '<h2 class="sec">' + esc(lang === 'ru' ? c.ru : c.en) + '</h2><div class="glist">' + list.map(function (g) {
        return '<a class="game" href="gameroom/index.html#' + esc(g.id) + '"><b>' + esc(lang === 'ru' ? g.ru : g.en) + '</b><span>' + esc(g.desc) + '</span><em>' + esc(g.level) + ' · ' + esc(g.players) + ' · ' + esc(g.time) + '</em></a>';
      }).join('') + '</div>';
    });
    h += '<h2 class="sec">' + t('insideT') + '</h2><p class="sec">' + t('insideP') + '</p>';
    return h;
  }

  /* ---------- premium ---------- */
  var plans = { monthly: null, yearly: null }, choice = 'yearly', busy = false;
  function premium() {
    var pro = IFEN.isPremium(), p = IFEN.premiumInfo(), T = totals();
    var h = '<section class="hero"><span class="eyebrow">' + (pro ? '★ ' + t('premium') : t('pT')) + '</span><h2>' + (pro ? t('youPro') : t('pP')) + '</h2>' +
      (pro ? '<p>' + t('youProP') + '</p>' + (p && p.exp ? '<p style="margin-top:8px">' + (p.willRenew ? t('renews') : t('ends')) + ': ' + new Date(p.exp).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '</p>' : '')
        : '<div class="stats"><div class="stat"><b>12</b><span>' + t('courses') + '</span></div><div class="stat"><b>' + fmt(T.units) + '</b><span>' + t('units') + '</span></div><div class="stat"><b>' + fmt(T.words) + '</b><span>' + t('words') + '</span></div></div>') +
      '</section>';
    if (!pro) {
      h += '<ul class="benefits"><li>' + t('b1') + '</li><li>' + t('b2') + '</li><li>' + t('b3') + '</li><li>' + t('b4') + '</li><li>' + t('b5') + '</li></ul>' +
        '<div class="plans" id="plans">' + planHTML() + '</div>' +
        '<div class="row stack" style="margin-top:14px"><button type="button" class="btn navy" id="buy">' + t('subscribe') + '</button></div>' +
        '<div id="pmsg"></div>';
    }
    h += '<div class="row" style="margin-top:12px;justify-content:center"><button type="button" class="btn line" id="restore">' + t('restore') + '</button>' +
      (pro && IFEN.native ? '<button type="button" class="btn line" id="manage">' + t('manage') + '</button>' : '') + '</div>';
    h += '<p class="legal">' + (IFEN.platform === 'ios' ? t('legalIos') : t('legalAnd')) + ' <a href="legal/terms.html">' + t('terms') + '</a> · <a href="legal/privacy.html">' + t('privacy') + '</a>' +
      (IFEN.platform === 'ios' ? ' · <a href="' + esc(C.appleEulaUrl) + '">Apple EULA</a>' : '') + '</p>';
    return h;
  }
  function planHTML() {
    var dp = C.displayPrices || {};
    var m = plans.monthly, y = plans.yearly;
    var mp = m ? m.product.priceString : dp.monthly, yp = y ? y.product.priceString : dp.yearly;
    var ypm = y && y.product.pricePerMonthString ? y.product.pricePerMonthString : dp.yearlyPerMonth;
    var save = dp.save;
    if (m && y && m.product.price && y.product.price) save = Math.floor((1 - y.product.price / (m.product.price * 12)) * 100) + '%';
    return '<button type="button" class="plan" data-plan="yearly" aria-pressed="' + (choice === 'yearly') + '"><span class="save">' + t('save') + ' ' + esc(save) + '</span><span class="pname">' + t('yearly') + '</span><div class="price">' + esc(yp) + '</div><div class="per">' + esc(ypm) + ' ' + t('perMonth') + '</div></button>' +
      '<button type="button" class="plan" data-plan="monthly" aria-pressed="' + (choice === 'monthly') + '"><span class="pname">' + t('monthly') + '</span><div class="price">' + esc(mp) + '</div><div class="per">' + t('perMonth') + '</div></button>';
  }
  function msg(html) { var el = $('#pmsg'); if (el) el.innerHTML = html ? '<div class="note">' + html + '</div>' : ''; }
  function loadPlans() {
    if (IFEN.isPremium()) return;
    if (!IFEN.native) { msg(t('webOnly')); return; }
    if (!IFEN.purchasesReady()) { msg(t('soon')); var b = $('#buy'); if (b) b.disabled = true; return; }
    msg('<span class="spin"></span> ' + t('loading'));
    IFEN.offerings().then(function (pk) {
      pk.forEach(function (p) {
        var ty = String(p.packageType || '').toUpperCase(), id = String(p.identifier || '');
        if (ty === 'MONTHLY' || id === '$rc_monthly') plans.monthly = p;
        else if (ty === 'ANNUAL' || id === '$rc_annual') plans.yearly = p;
      });
      if (!plans.yearly && plans.monthly) choice = 'monthly';
      var el = $('#plans'); if (el) el.innerHTML = planHTML();
      msg(plans.monthly || plans.yearly ? '' : t('soon'));
      var b = $('#buy'); if (b) b.disabled = !(plans.monthly || plans.yearly);
    }).catch(function () { msg(t('soon')); var b = $('#buy'); if (b) b.disabled = true; });
  }
  document.addEventListener('click', function (e) {
    var pl = e.target.closest('[data-plan]');
    if (pl) { choice = pl.dataset.plan; document.querySelectorAll('[data-plan]').forEach(function (b) { b.setAttribute('aria-pressed', b === pl); }); return; }
    if (e.target.closest('#buy')) return doBuy();
    if (e.target.closest('#restore')) return doRestore();
    if (e.target.closest('#manage')) { location.href = IFEN.platform === 'ios' ? C.manageIos : C.manageAndroid; }
  });
  function doBuy() {
    if (busy) return; var pkg = plans[choice] || plans.yearly || plans.monthly;
    if (!pkg) { toast(IFEN.native ? t('soon') : t('webOnly')); return; }
    busy = true; var b = $('#buy'); if (b) { b.disabled = true; b.innerHTML = '<span class="spin"></span>'; }
    IFEN.buy(pkg).then(function (ok) {
      busy = false; if (ok) { toast(t('okPro')); show(); } else if (b) { b.disabled = false; b.textContent = t('subscribe'); }
    }).catch(function (e) { busy = false; if (b) { b.disabled = false; b.textContent = t('subscribe'); } toast(e && e.message ? e.message : t('failed')); });
  }
  function doRestore() {
    if (busy) return;
    if (!IFEN.purchasesReady()) { toast(IFEN.native ? t('soon') : t('webOnly')); return; }
    busy = true; var b = $('#restore'); if (b) b.disabled = true;
    IFEN.restore().then(function (ok) { busy = false; toast(ok ? t('restored') : t('noPurchases')); show(); })
      .catch(function () { busy = false; if (b) b.disabled = false; toast(t('failed')); });
  }

  /* ---------- settings ---------- */
  function settings() {
    var acc = IFEN.get('ifpron:acc', 'GB'), pro = IFEN.isPremium();
    var h = '<h2 class="sec" style="margin-top:6px">' + t('tabSettings') + '</h2><div class="list">' +
      '<div class="item"><span class="lbl">' + t('sLang') + '<small>' + t('sLangP') + '</small></span><span class="seg" role="group" aria-label="' + t('sLang') + '"><button type="button" data-lang="en" aria-pressed="' + (lang === 'en') + '">EN</button><button type="button" data-lang="ru" aria-pressed="' + (lang === 'ru') + '">RU</button></span></div>' +
      '<div class="item"><span class="lbl">' + t('sVoice') + '<small>' + t('sVoiceP') + '</small></span><span class="seg" role="group" aria-label="' + t('sVoice') + '"><button type="button" data-acc="GB" aria-pressed="' + (acc !== 'US') + '">🇬🇧 UK</button><button type="button" data-acc="US" aria-pressed="' + (acc === 'US') + '">🇺🇸 US</button></span></div>' +
      '</div>';
    h += '<h2 class="sec">' + t('sSub') + '</h2><div class="list">' +
      '<a class="item" href="#premium" data-go="premium"><span class="lbl">' + (pro ? '★ ' + t('youPro') : t('pT')) + '<small>' + (pro ? t('allOpen') : t('pP')) + '</small></span>' + ARROW + '</a>' +
      '<button type="button" class="item" id="restore"><span class="lbl">' + t('restore') + '</span></button>' +
      (IFEN.native ? '<button type="button" class="item" id="manage"><span class="lbl">' + t('manage') + '</span>' + ARROW + '</button>' : '') +
      '</div>';
    h += '<h2 class="sec">' + t('sSupport') + '</h2><div class="list">' +
      '<a class="item" href="mailto:' + esc(C.supportEmail) + '?subject=IF%20English"><span class="lbl">' + t('sContact') + '<small>' + esc(C.supportEmail) + '</small></span>' + ARROW + '</a>' +
      '<a class="item" href="legal/privacy.html"><span class="lbl">' + t('privacy') + '</span>' + ARROW + '</a>' +
      '<a class="item" href="legal/terms.html"><span class="lbl">' + t('terms') + '</span>' + ARROW + '</a>' +
      '<button type="button" class="item" id="reset"><span class="lbl">' + t('sReset') + '<small>' + t('sResetP') + '</small></span></button>' +
      '</div>';
    h += '<p class="fine"><b>' + t('sAbout') + '.</b> ' + t('aboutP') + '<br>' + t('version') + ' ' + esc(C.version) + '</p>';
    return h;
  }
  document.addEventListener('click', function (e) {
    var l = e.target.closest('[data-lang]'); if (l) { lang = l.dataset.lang; IFEN.set('ifen:lang', lang); show(); return; }
    var a = e.target.closest('[data-acc]'); if (a) { IFEN.set('ifpron:acc', a.dataset.acc); show(); return; }
    var d = e.target.closest('[data-dev]'); if (d && IFEN.native) { IFEN.set('ifen:dev-premium', d.dataset.dev === '1'); show(); return; }
    if (e.target.closest('#reset')) {
      IFEN.dialog(t('sResetQ'), t('yes'), t('no')).then(function (ok) {
        if (!ok) return;
        try {
          var keep = ['ifen:premium', 'ifen:lang', 'ifpron:acc'], drop = [];
          for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (keep.indexOf(k) < 0) drop.push(k); }
          drop.forEach(function (k) { localStorage.removeItem(k); });
        } catch (x) {}
        toast(t('sResetDone')); show();
      });
    }
  });

  /* ---------- start ---------- */
  window.addEventListener('ifen:premium', show);
  if (IFEN.native) {
    try {
      var SB = window.Capacitor.registerPlugin('StatusBar');
      SB.setStyle({ style: 'DARK' }).catch(function () {});
    } catch (e) {}
  }
  show();
  if (IFEN.purchasesReady()) IFEN.refresh().then(function () { chrome(current()); }).catch(function () {});
})();
