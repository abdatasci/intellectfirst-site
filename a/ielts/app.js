/* IF Academy IELTS Centre: accounts, AI-marked Writing (practice + mock), progress, teacher view. */
(function () {
  'use strict';
  var ID = window.NFIdentity;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var view = $('#view');
  var BANK = null, ME = null, USER = null, RECOVERY = null;
  var stopFns = [];

  /* ---------------- helpers ---------------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function words(t) { return (String(t || '').trim().match(/[A-Za-z0-9'’-]+/g) || []).length; }
  function half(x) { return Math.round(x * 2) / 2; }
  function band(b) { return typeof b === 'number' ? (b % 1 ? b.toFixed(1) : b + '.0') : '–'; }
  function when(iso) {
    if (!iso) return '–';
    var d = new Date(iso), now = new Date(), days = Math.floor((now - d) / 864e5);
    if (days < 1 && d.getDate() === now.getDate()) return 'Today ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    if (days < 7) return d.toLocaleDateString('en-GB', { weekday: 'short' }) + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function toast(msg) { var t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 3200); }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  function critNames(part) { return part === 1 ? { TA: 'Task Achievement', CC: 'Coherence & Cohesion', LR: 'Lexical Resource', GRA: 'Grammar' } : { TR: 'Task Response', CC: 'Coherence & Cohesion', LR: 'Lexical Resource', GRA: 'Grammar' }; }
  function task(id) { return BANK && (BANK.task1.concat(BANK.task2)).filter(function (t) { return t.id === id; })[0]; }
  function partOf(id) { return String(id).indexOf('T1') === 0 ? 1 : 2; }
  var KIND = { bar: 'Bar chart', line: 'Line graph', pie: 'Pie charts', table: 'Table', process: 'Process', opinion: 'Opinion', discussion: 'Discussion', problem_solution: 'Problem & solution', advantages: 'Advantages & disadvantages', two_part: 'Two-part question' };

  async function api(path, opts) {
    opts = opts || {};
    var init = { method: opts.method || 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' };
    if (opts.body) init.body = JSON.stringify(opts.body);
    var res = await fetch('/api/ielts/' + path, init);
    if (res.status === 401 && !opts.retried) {
      try { await ID.refreshSession(); } catch (e) {}
      return api(path, Object.assign({}, opts, { retried: true }));
    }
    var data = await res.json().catch(function () { return {}; });
    if (!res.ok) { var err = new Error(data.error || ('HTTP ' + res.status)); err.code = data.error; err.status = res.status; err.data = data; throw err; }
    return data;
  }
  async function loadBank() { if (!BANK) BANK = await (await fetch('data/writing.json')).json(); return BANK; }
  async function loadMe() {
    try { USER = await ID.getUser(); } catch (e) { USER = null; }
    if (!USER) { ME = null; return null; }
    try { ME = await api('me'); } catch (e) { ME = null; if (e.status === 401) USER = null; }
    return ME;
  }
  function role() { return ME && ME.profile && ME.profile.role; }
  function needAccount(next) {
    if (!USER) { lsSet('ielts.next', next || location.hash); go('#/login'); return true; }
    if (!role()) { lsSet('ielts.next', next || location.hash); go('#/activate'); return true; }
    return false;
  }
  function header() {
    var who = $('#who');
    if (USER) {
      var n = (ME && ME.profile && ME.profile.name) || USER.name || USER.email;
      who.innerHTML = '<a class="chip" href="#/progress" title="' + esc(USER.email) + '">' + esc(n.split(' ')[0]) + (role() === 'teacher' ? ' · Teacher' : '') + '</a><button class="btn ghost sm" id="out">Sign out</button>';
      $('#out').onclick = async function () { try { await ID.logout(); } catch (e) {} USER = null; ME = null; header(); go('#/'); toast('Signed out'); };
    } else who.innerHTML = '<a class="btn sm" href="#/login">Sign in</a>';
    $('[data-nav=teacher]').hidden = role() !== 'teacher';
  }
  function setNav(k) { document.querySelectorAll('.nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.nav === k); }); }
  function cleanup() { stopFns.forEach(function (f) { try { f(); } catch (e) {} }); stopFns = []; }

  /* ---------------- apps (existing IELTS tools) ---------------- */
  var APPS = [
    { slug: 'ielts-studio', path: '/a/ielts-studio/index.html', name: 'IF IELTS Studio', tag: 'Reading · Writing · Vocabulary', desc: 'IELTS-format reading passages, writing models and vocabulary practice.' },
    { slug: 'ielts-speaking', path: '/a/ielts-speaking/index.html', name: 'IELTS Speaking Lab', tag: 'Speaking practice', desc: '12 topics, cue cards and a full mock speaking test.' },
    { slug: 'band9-lexis', path: '/a/band9-lexis/index.html', name: 'Band 9 Lexis', tag: 'Vocabulary', desc: 'Daily IELTS vocabulary for Band 7+ writing and speaking.' },
    { slug: 'if-english-ielts', path: '/a/if-english/courses/IELTS/index.html', name: 'IF English · IELTS course', tag: 'Vocabulary & grammar', desc: 'The IELTS course from IF English: flashcards, audio and games.' }
  ];
  function openApp(slug) {
    var a = APPS.filter(function (x) { return x.slug === slug; })[0];
    if (!a) return go('#/');
    var p = $('#player'), f = $('#pframe');
    p.classList.add('on'); p.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    if (f.getAttribute('src') !== a.path) f.setAttribute('src', a.path);
    $('#ptitle').textContent = a.name; $('#pnew').href = a.path; document.title = a.name + ' · IF Academy';
    stopFns.push(function () { p.classList.remove('on'); p.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; f.removeAttribute('src'); });
  }
  $('#pback').onclick = function () { go('#/'); };

  /* ---------------- views ---------------- */
  function vHome() {
    setNav('home');
    var att = (ME && ME.attempts) || [];
    var scored = att.filter(function (a) { return typeof a.band === 'number'; });
    var snap = '';
    if (USER && role()) {
      var last = scored.slice(-5), avg = last.length ? half(last.reduce(function (s, a) { return s + a.band; }, 0) / last.length) : null;
      snap = '<section class="section"><div class="sec-head"><div><h2>Welcome back, ' + esc((ME.profile.name || '').split(' ')[0]) + '</h2><p>Your Writing so far.</p></div><a class="btn ghost sm" href="#/progress">Full progress →</a></div>' +
        '<div class="stats" style="margin-top:0"><div class="stat"><span>Essays marked</span><b>' + scored.length + '</b></div>' +
        '<div class="stat"><span>Latest band</span><b>' + band(scored.length ? scored[scored.length - 1].band : null) + '</b></div>' +
        '<div class="stat"><span>Average (last 5)</span><b>' + band(avg) + '</b></div></div></section>';
    } else if (!USER) {
      snap = '<section class="section"><div class="card" style="flex-direction:row;flex-wrap:wrap;align-items:center;gap:16px"><div style="flex:1;min-width:240px"><h3>Create your IELTS account</h3><p>IF students register with their class code. Your essays, bands and progress are saved to your account on any device.</p></div><div class="row"><a class="btn" href="#/register">Create account</a><a class="btn ghost" href="#/login">Sign in</a></div></div></section>';
    }
    view.innerHTML =
      '<section class="hero"><div class="eyebrow">IF Academy · Academic IELTS</div><h1>IELTS Centre</h1>' +
      '<p class="lead">Everything for IELTS in one place: AI-marked Writing with a live band score as you write, full mock tests, Speaking, Reading and vocabulary, and your progress over time.</p></section>' + snap +
      '<section class="section"><div class="sec-head"><div><h2>Skills</h2><p>Start with Writing: every answer is marked against the four official criteria.</p></div></div><div class="grid">' +
      '<a class="card" href="#/writing"><span class="tag">Writing · Task 1 & 2</span><h3>Writing practice <span class="badge ai">AI marked</span></h3><p>16 Task 1 charts and 24 Task 2 essays. A live band estimate updates while you write; submit for a full examiner-style report.</p><span class="go">Practise →</span></a>' +
      '<a class="card" href="#/mock"><span class="tag">Writing · 60 minutes</span><h3>Writing mock test <span class="badge ai">AI marked</span></h3><p>A full timed Writing paper: Task 1 and Task 2 together, scored with the real weighting (Task 2 counts double).</p><span class="go">Start a mock →</span></a>' +
      '<a class="card" href="#/speaking"><span class="tag">Speaking · Parts 1–3</span><h3>AI Speaking <span class="badge ai">AI marked</span></h3><p>An examiner voice asks the questions; you answer out loud and get bands for all four criteria, corrections and Band 8 versions of your answers.</p><span class="go">Start speaking →</span></a>' +
      '<div class="card dim"><span class="tag">Listening · 4 parts</span><h3>Listening tests <span class="badge soon">Coming soon</span></h3><p>Full 40-question tests in the IELTS format, with British voices and instant band scores.</p></div>' +
      '</div></section>' +
      '<section class="section"><div class="sec-head"><div><h2>Practice apps</h2><p>Your existing IF IELTS tools, now in one place.</p></div></div><div class="grid">' +
      APPS.map(function (a) { return '<a class="card" href="#/app/' + a.slug + '"><span class="tag">' + esc(a.tag) + '</span><h3>' + esc(a.name) + '</h3><p>' + esc(a.desc) + '</p><span class="go">Open →</span></a>'; }).join('') +
      '</div></section>' +
      '<section class="section"><div class="sec-head"><div><h2>Official free samples</h2><p>Real IELTS papers are copyrighted, so our tasks are original, written in the exact IELTS format on topics that recur in the exam. For official sample questions, use the free materials from the test owners.</p></div></div>' +
      '<div class="row"><a class="btn ghost sm" href="https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test" target="_blank" rel="noopener">IELTS.org samples ↗</a><a class="btn ghost sm" href="https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests/writing" target="_blank" rel="noopener">British Council practice ↗</a></div></section>';
  }

  function formPanel(title, sub, inner) { return '<div class="panel"><h2>' + title + '</h2><p class="sub">' + sub + '</p>' + inner + '</div>'; }
  function showErr(el, msg) { var e = $('.err', el) || $('.ok-msg', el); if (e) e.remove(); var d = document.createElement('div'); d.className = 'err'; d.textContent = msg; el.appendChild(d); }
  function showOk(el, msg) { var e = $('.err', el) || $('.ok-msg', el); if (e) e.remove(); var d = document.createElement('div'); d.className = 'ok-msg'; d.textContent = msg; el.appendChild(d); }
  function authMsg(e) {
    var m = String((e && e.message) || e || '');
    if (/identity.*not.*enabled|MissingIdentity|404/i.test(m) || (e && e.name === 'MissingIdentityError')) return 'Accounts are not switched on for this website yet. Please tell your teacher.';
    if (/invalid_grant|Invalid login|No user found|password/i.test(m) && !/at least/i.test(m)) return 'That email and password do not match. Check them and try again.';
    if (/not confirmed|confirm/i.test(m)) return 'Please confirm your email first: open the link we sent you, then sign in.';
    if (/already registered|exists/i.test(m)) return 'An account with this email already exists. Sign in instead, or reset your password.';
    if (/at least|weak|short/i.test(m)) return 'Choose a password with at least 8 characters.';
    if (/network|fetch/i.test(m)) return 'No connection. Check your internet and try again.';
    return m || 'Something went wrong. Please try again.';
  }
  function afterAuth() { var n = lsGet('ielts.next'); lsSet('ielts.next', null); go(n && n.indexOf('#/login') < 0 && n.indexOf('#/register') < 0 ? n : '#/'); }

  function vLogin() {
    setNav('');
    view.innerHTML = formPanel('Sign in', 'Use the email and password from your IELTS Centre account.',
      '<form id="f" novalidate><label class="f" for="em">Email</label><input class="inp" id="em" type="email" autocomplete="email" required>' +
      '<label class="f" for="pw">Password</label><input class="inp" id="pw" type="password" autocomplete="current-password" required>' +
      '<button class="btn" type="submit">Sign in</button></form><p class="alt"><a href="#/forgot">Forgot password?</a> · New here? <a href="#/register">Create an account</a></p>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f);
      b.disabled = true; b.innerHTML = '<span class="spin"></span> Signing in';
      try { await ID.login($('#em').value.trim(), $('#pw').value); await loadMe(); header(); if (!role()) go('#/activate'); else afterAuth(); }
      catch (e) { showErr(f, authMsg(e)); b.disabled = false; b.textContent = 'Sign in'; }
    };
  }
  function vRegister() {
    setNav('');
    view.innerHTML = formPanel('Create your account', 'For IF Academy students. You need the class code from your teacher.',
      '<form id="f" novalidate><label class="f" for="nm">Full name</label><input class="inp" id="nm" autocomplete="name" required>' +
      '<label class="f" for="em">Email</label><input class="inp" id="em" type="email" autocomplete="email" required>' +
      '<label class="f" for="pw">Password</label><input class="inp" id="pw" type="password" autocomplete="new-password" minlength="8" required><p class="hint">At least 8 characters.</p>' +
      '<label class="f" for="cc">Class code</label><input class="inp" id="cc" autocomplete="off" required><p class="hint">Your IELTS class code from your teacher.</p>' +
      '<button class="btn" type="submit">Create account</button></form><p class="alt">Already have an account? <a href="#/login">Sign in</a></p>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f);
      var name = $('#nm').value.trim(), em = $('#em').value.trim(), pw = $('#pw').value, cc = $('#cc').value.trim();
      if (!name || !em || !cc) return showErr(f, 'Please fill in every field.');
      if (pw.length < 8) return showErr(f, 'Choose a password with at least 8 characters.');
      b.disabled = true; b.innerHTML = '<span class="spin"></span> Creating account';
      try {
        var u = await ID.signup(em, pw, { full_name: name });
        lsSet('ielts.pending', { code: cc, name: name });
        if (u && u.confirmedAt) {
          await ID.login(em, pw);
          await loadMe(); header();
          try { await activate(cc, name); }
          catch (e2) { toast(e2.code === 'code' ? 'Account created, but that class code is not right. Enter it again.' : 'Account created. Now enter your class code.'); return go('#/activate'); }
          lsSet('ielts.pending', null);
          await loadMe(); header(); toast('Account created'); afterAuth();
        } else {
          f.innerHTML = '<div class="ok-msg">Almost done. We sent a confirmation link to <b>' + esc(em) + '</b>. Open it on this device to finish creating your account.</div>';
        }
      } catch (e) {
        b.disabled = false; b.textContent = 'Create account';
        showErr(f, authMsg(e));
      }
    };
  }
  async function activate(code, name) { var r = await api('activate', { method: 'POST', body: { code: code, name: name } }); return r.profile; }
  function vActivate() {
    setNav('');
    if (!USER) return go('#/login');
    if (role()) return afterAuth();
    var pend = lsGet('ielts.pending') || {};
    view.innerHTML = formPanel('Enter your class code', 'One last step: this links your account to IF Academy so your work can be marked.',
      '<form id="f" novalidate><label class="f" for="nm">Full name</label><input class="inp" id="nm" value="' + esc(pend.name || USER.name || '') + '" required>' +
      '<label class="f" for="cc">Class code</label><input class="inp" id="cc" value="' + esc(pend.code || '') + '" autocomplete="off" required><button class="btn" type="submit">Continue</button></form>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f);
      b.disabled = true; b.innerHTML = '<span class="spin"></span> Checking';
      try { await activate($('#cc').value.trim(), $('#nm').value.trim()); lsSet('ielts.pending', null); await loadMe(); header(); toast('Welcome to the IELTS Centre'); afterAuth(); }
      catch (e) { b.disabled = false; b.textContent = 'Continue'; showErr(f, e.code === 'code' ? 'That code is not right. Check it with your teacher.' : 'Could not check the code. Please try again.'); }
    };
  }
  function vForgot() {
    setNav('');
    view.innerHTML = formPanel('Reset your password', 'We will email you a link to choose a new password.',
      '<form id="f" novalidate><label class="f" for="em">Email</label><input class="inp" id="em" type="email" autocomplete="email" required><button class="btn" type="submit">Send reset link</button></form><p class="alt"><a href="#/login">Back to sign in</a></p>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f); b.disabled = true;
      try { await ID.requestPasswordRecovery($('#em').value.trim()); showOk(f, 'If that email has an account, a reset link is on its way. Check your inbox and spam folder.'); }
      catch (e) { showErr(f, authMsg(e)); }
      b.disabled = false;
    };
  }
  function vReset() {
    setNav('');
    if (!RECOVERY) return go('#/forgot');
    view.innerHTML = formPanel('Choose a new password', 'Enter a new password for your account.',
      '<form id="f" novalidate><label class="f" for="pw">New password</label><input class="inp" id="pw" type="password" autocomplete="new-password" minlength="8" required><button class="btn" type="submit">Save password</button></form>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, pw = $('#pw').value;
      if (pw.length < 8) return showErr(f, 'Choose a password with at least 8 characters.');
      try { await ID.recoverPassword(RECOVERY, pw); RECOVERY = null; await loadMe(); header(); toast('Password saved'); go(role() ? '#/' : '#/activate'); }
      catch (e) { showErr(f, 'This reset link has expired. Request a new one.'); }
    };
  }

  /* ---------- writing list ---------- */
  function bestByTask() {
    var best = {};
    ((ME && ME.attempts) || []).forEach(function (a) { if (typeof a.band === 'number' && (!best[a.task] || a.band > best[a.task])) best[a.task] = a.band; });
    return best;
  }
  async function vWriting(tab) {
    setNav('writing');
    await loadBank();
    tab = tab === 'task1' ? 'task1' : 'task2';
    var best = bestByTask(), list = BANK[tab];
    view.innerHTML = '<section class="hero"><div class="eyebrow">Writing · AI marked</div><h1>Writing practice</h1>' +
      '<p class="lead">Choose a task. While you write, a live band estimate updates each time you pause; submit for a full report with corrections and a model answer.</p>' +
      '<div class="row" style="margin-top:16px"><a class="btn gold" href="#/mock">Take a full mock test (60 min)</a></div></section>' +
      '<div class="filters" role="group"><button data-t="task1" aria-pressed="' + (tab === 'task1') + '">Task 1 · Charts (' + BANK.task1.length + ')</button><button data-t="task2" aria-pressed="' + (tab === 'task2') + '">Task 2 · Essays (' + BANK.task2.length + ')</button></div>' +
      '<div class="task-list">' + list.map(function (t) {
        return '<a class="task" href="#/write/' + t.id + '"><div><span class="id">' + t.id + ' · ' + esc(KIND[t.kind] || t.kind) + '</span><b>' + esc(t.title) + '</b><span class="k">' + (tab === 'task1' ? '20 min · 150+ words' : '40 min · 250+ words') + '</span></div>' +
          (best[t.id] != null ? '<div class="best"><span>Best</span><strong>' + band(best[t.id]) + '</strong></div>' : '') + '</a>';
      }).join('') + '</div>';
    view.querySelectorAll('[data-t]').forEach(function (b) { b.onclick = function () { go('#/writing/' + b.dataset.t); }; });
  }

  /* ---------- live scorer used by practice and mock ---------- */
  function liveBox(part) {
    var n = critNames(part);
    return '<div class="live" aria-live="polite"><div class="live-head"><div class="big" data-o>–</div><div class="lbl"><b>Live band estimate</b><span data-s>Starts after 50 words. Updates when you pause.</span></div><span class="pulse" data-p></span></div>' +
      '<div class="crit">' + Object.keys(n).map(function (k) { return '<div><span>' + n[k] + '</span><b data-c="' + k + '">–</b></div>'; }).join('') + '</div><p class="tip" data-tip hidden></p></div>' +
      '<button class="livepill" type="button" data-pill>Live band <b>–</b></button>';
  }
  function makeLive(box, taskId, getText, enabled) {
    var last = '', lastWords = 0, inflight = false, timer = null, dead = false;
    function set(sel, v) { var e = box.querySelector(sel); if (e) e.textContent = v; }
    async function run() {
      if (dead || inflight || !enabled()) return;
      var text = getText(), n = words(text);
      if (n < 50 || text === last || (lastWords && Math.abs(n - lastWords) < 40)) return;
      inflight = true; box.querySelector('[data-p]').classList.add('on'); set('[data-s]', 'Updating…');
      try {
        var r = (await api('score', { method: 'POST', body: { taskId: taskId, text: text, mode: 'live' } })).result;
        if (dead) return;
        last = text; lastWords = n;
        set('[data-o]', band(r.overall));
        var pill = box.parentNode.querySelector('[data-pill] b'); if (pill) pill.textContent = band(r.overall);
        Object.keys(r.criteria).forEach(function (k) { set('[data-c="' + k + '"]', band(r.criteria[k].band)); });
        set('[data-s]', 'Based on ' + r.words + ' words · ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
        var tip = box.querySelector('[data-tip]'); tip.hidden = !r.tip; tip.textContent = r.tip || '';
      } catch (e) {
        if (e.code === 'quota') { set('[data-s]', 'Daily live checks used up. Submit for your full report.'); dead = true; }
        else if (e.code === 'activate' || e.status === 401) { set('[data-s]', 'Sign in to see live scores.'); dead = true; }
        else set('[data-s]', 'Live score unavailable just now. Keep writing.');
      } finally { inflight = false; box.querySelector('[data-p]').classList.remove('on'); }
    }
    var pillBtn = box.parentNode.querySelector('[data-pill]');
    if (pillBtn) pillBtn.onclick = function () { box.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
    return {
      poke: function () { clearTimeout(timer); timer = setTimeout(run, 2500); },
      stop: function () { dead = true; clearTimeout(timer); }
    };
  }

  function qPanel(t) {
    var p = partOf(t.id), extra = '';
    if (p === 1) extra = IELTSChart(t);
    return '<div class="eyebrow">' + (p === 1 ? 'Writing Task 1' : 'Writing Task 2') + ' · ' + esc(KIND[t.kind] || '') + '</div><h3 style="margin:6px 0 10px">' + esc(t.title) + '</h3><p class="q">' + esc(t.prompt) + '</p>' + extra;
  }

  async function vWrite(id) {
    setNav('writing');
    await loadBank();
    var t = task(id); if (!t) return go('#/writing');
    if (needAccount('#/write/' + id)) return;
    var p = partOf(id), min = p === 1 ? 150 : 250, key = 'ielts.draft.' + id;
    var draft = lsGet(key) || { text: '', secs: 0 };
    view.innerHTML = '<div style="margin-top:18px" class="row"><a class="btn ghost sm" href="#/writing/' + (p === 1 ? 'task1' : 'task2') + '">← All tasks</a></div>' +
      '<div class="ws"><aside class="qbox">' + qPanel(t) + '</aside><div><div class="editor"><div class="ed-top"><span class="wc"><strong data-wc>0</strong> words · aim for ' + min + '+</span><span class="timer" data-tm>00:00</span></div>' +
      '<textarea class="essay" id="essay" spellcheck="false" autocapitalize="sentences" placeholder="Start writing here…">' + esc(draft.text) + '</textarea>' +
      '<div class="ed-foot"><button class="btn" id="sub">Submit for full marking</button><span class="note">Spell-check is off, as in the real exam. Your draft is saved on this device.</span></div></div>' + liveBox(p) + '</div></div>';
    var ta = $('#essay'), secs = draft.secs || 0, started = Date.now() - secs * 1000;
    var live = makeLive(view.querySelector('.live'), id, function () { return ta.value; }, function () { return true; });
    function wc() { var n = words(ta.value); view.querySelector('[data-wc]').textContent = n; }
    var tick = setInterval(function () {
      secs = Math.floor((Date.now() - started) / 1000);
      view.querySelector('[data-tm]').textContent = String(Math.floor(secs / 60)).padStart(2, '0') + ':' + String(secs % 60).padStart(2, '0');
    }, 1000);
    var saveT = null;
    ta.addEventListener('input', function () { wc(); live.poke(); clearTimeout(saveT); saveT = setTimeout(function () { lsSet(key, { text: ta.value, secs: secs }); }, 600); });
    stopFns.push(function () { clearInterval(tick); live.stop(); if (ta.value.trim()) lsSet(key, { text: ta.value, secs: secs }); });
    wc(); if (words(ta.value) >= 50) live.poke();
    $('#sub').onclick = async function () {
      var n = words(ta.value), b = this;
      if (n < 20) return toast('Write at least a few sentences before submitting.');
      if (n < min && !confirm('You have ' + n + ' words. The minimum is ' + min + ', and short answers lose marks. Submit anyway?')) return;
      b.disabled = true; b.innerHTML = '<span class="spin"></span> Marking… (about 20 seconds)';
      try {
        var r = await api('score', { method: 'POST', body: { taskId: id, text: ta.value, mode: 'final', seconds: secs } });
        lsSet(key, null); stopFns = stopFns.filter(function () { return false; }); clearInterval(tick); live.stop();
        await loadMe(); go('#/report/' + r.attempt.id);
      } catch (e) {
        b.disabled = false; b.textContent = 'Submit for full marking';
        toast(e.code === 'quota' ? 'You have used today\'s full markings (' + (e.data.limit || '') + '). Try again tomorrow.' : 'Marking failed. Your text is saved; please try again.');
      }
    };
  }

  /* ---------- report ---------- */
  function reportHtml(a, opts) {
    opts = opts || {};
    var r = a.result, t = task(a.taskId), n = critNames(a.part);
    var h = '<div class="report-head"><div class="big"><small>Band</small>' + band(r.overall) + '</div><div><div class="eyebrow" style="color:var(--gold-soft)">Writing Task ' + a.part + ' · ' + esc(a.title) + '</div><p style="margin-top:6px">' + esc(r.summary || '') + '</p><p style="margin-top:6px;font-size:14px">' + a.words + ' words' + (a.seconds ? ' · ' + Math.round(a.seconds / 60) + ' min' : '') + ' · ' + when(a.at) + '</p></div></div>';
    h += '<div class="rcrit">' + Object.keys(n).map(function (k) { var c = r.criteria[k] || {}; return '<div class="card"><span class="tag">' + n[k] + '</span><div class="band">' + band(c.band) + '</div><p>' + esc(c.comment || '') + '</p></div>'; }).join('') + '</div>';
    if (r.strengths && r.strengths.length) h += '<section class="section"><h3>What went well</h3><ul class="list">' + r.strengths.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></section>';
    if (r.improve && r.improve.length) h += '<section class="section"><h3>How to raise your band</h3><ul class="list">' + r.improve.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></section>';
    if (r.corrections && r.corrections.length) h += '<section class="section"><h3>Corrections</h3><div class="corr">' + r.corrections.map(function (c) { return '<div><del>' + esc(c.original) + '</del> → <ins>' + esc(c.better) + '</ins><small>' + esc(c.why) + '</small></div>'; }).join('') + '</div></section>';
    h += '<section class="section"><h3>Your answer</h3><div class="essay-view" style="margin-top:8px">' + esc(a.text || '') + '</div>';
    if (t && t.model) h += '<details class="model"><summary>Band 8+ model answer</summary><div>' + esc(t.model) + '</div></details>';
    if (t) h += '<details class="model"><summary>The question</summary><div>' + esc(t.prompt) + '</div>' + (a.part === 1 ? IELTSChart(t) : '') + '</details>';
    h += '</section>';
    if (!opts.teacher) h += '<div class="row" style="margin-top:22px"><a class="btn" href="#/write/' + a.taskId + '">Try this task again</a><a class="btn ghost" href="#/writing/' + (a.part === 1 ? 'task1' : 'task2') + '">Another task</a><a class="btn ghost" href="#/progress">My progress</a></div>';
    return h;
  }
  async function vReport(id) {
    setNav('writing'); await loadBank();
    if (needAccount('#/report/' + id)) return;
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span> Loading report…</p>';
    try { var a = (await api('attempt/' + id)).attempt; if (a.skill === 'speaking') { setNav('speaking'); view.innerHTML = speakingReportHtml(a); } else view.innerHTML = reportHtml(a); window.scrollTo(0, 0); }
    catch (e) { view.innerHTML = '<div class="empty" style="margin-top:30px">This report could not be found.</div>'; }
  }

  /* ---------- mock test ---------- */
  function pick(list, avoid) { var c = list.filter(function (t) { return (avoid || []).indexOf(t.id) < 0; }); if (!c.length) c = list; return c[Math.floor(Math.random() * c.length)]; }
  async function vMock() {
    setNav('writing'); await loadBank();
    if (needAccount('#/mock')) return;
    var m = lsGet('ielts.mock');
    if (m && m.status === 'running') return vMockRun();
    var done = {}; ((ME && ME.attempts) || []).forEach(function (a) { done[a.task] = 1; });
    view.innerHTML = '<section class="hero"><div class="eyebrow">Writing · Full paper</div><h1>Writing mock test</h1>' +
      '<p class="lead">60 minutes for both tasks, as in the real exam. Spend about 20 minutes on Task 1 and 40 on Task 2. You can switch between them at any time. When time runs out, your answers are submitted automatically.</p>' +
      '<div class="steps"><span>Task 1 · 150+ words</span><span>Task 2 · 250+ words</span><span>Marked together · Task 2 counts double</span></div>' +
      '<div class="row" style="margin-top:20px"><button class="btn gold" id="start">Start the 60-minute test</button><label class="switch"><input type="checkbox" id="lv" checked> Show live band estimate</label></div>' +
      '<p class="hint" style="margin-top:10px">Tip: turn the live estimate off for real exam conditions.</p></section>';
    $('#start').onclick = function () {
      var t1 = pick(BANK.task1, Object.keys(done)), t2 = pick(BANK.task2, Object.keys(done));
      lsSet('ielts.mock', { id: 'm' + Date.now().toString(36), t1: t1.id, t2: t2.id, start: Date.now(), dur: 3600, texts: { 1: '', 2: '' }, live: $('#lv').checked, status: 'running' });
      go('#/mock/run');
    };
  }
  async function vMockRun() {
    setNav('writing'); await loadBank();
    if (needAccount('#/mock')) return;
    var m = lsGet('ielts.mock');
    if (!m || m.status !== 'running') return go('#/mock');
    var cur = m.cur || 1;
    function render() {
      var t = task(cur === 1 ? m.t1 : m.t2), min = cur === 1 ? 150 : 250;
      view.innerHTML = '<div class="steps"><span class="' + (cur === 1 ? 'on' : '') + '" data-go="1" role="button" tabindex="0">Task 1 · <b data-w1>' + words(m.texts[1]) + '</b> words</span><span class="' + (cur === 2 ? 'on' : '') + '" data-go="2" role="button" tabindex="0">Task 2 · <b data-w2>' + words(m.texts[2]) + '</b> words</span></div>' +
        '<div class="ws"><aside class="qbox">' + qPanel(t) + '</aside><div><div class="editor"><div class="ed-top"><span class="wc"><strong data-wc>0</strong> words · aim for ' + min + '+</span><span class="timer" data-tm></span></div>' +
        '<textarea class="essay" id="essay" spellcheck="false" placeholder="Write your answer to Task ' + cur + ' here…">' + esc(m.texts[cur]) + '</textarea>' +
        '<div class="ed-foot">' + (cur === 1 ? '<button class="btn ghost" data-go="2">Go to Task 2 →</button>' : '<button class="btn ghost" data-go="1">← Back to Task 1</button>') + '<button class="btn" id="fin">Finish and submit both</button></div></div>' +
        (m.live ? liveBox(cur) : '') + '</div></div>';
      var ta = $('#essay');
      var live = m.live ? makeLive(view.querySelector('.live'), t.id, function () { return ta.value; }, function () { return true; }) : null;
      function upd() { m.texts[cur] = ta.value; view.querySelector('[data-wc]').textContent = words(ta.value); view.querySelector('[data-w' + cur + ']').textContent = words(ta.value); lsSet('ielts.mock', m); }
      ta.addEventListener('input', function () { upd(); if (live) live.poke(); });
      upd(); if (live && words(ta.value) >= 50) live.poke();
      view.querySelectorAll('[data-go]').forEach(function (b) { b.onclick = function () { if (live) live.stop(); cur = m.cur = +b.dataset.go; lsSet('ielts.mock', m); render(); window.scrollTo(0, 0); }; });
      $('#fin').onclick = function () { if (confirm('Submit both tasks now? You cannot change them afterwards.')) finish(); };
      stopFns.push(function () { if (live) live.stop(); });
    }
    var tick = setInterval(function () {
      var left = Math.max(0, m.dur - Math.floor((Date.now() - m.start) / 1000)), el = view.querySelector('[data-tm]');
      if (el) { el.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0') + ' left'; el.classList.toggle('low', left < 300); }
      if (left <= 0) { clearInterval(tick); toast('Time is up. Submitting your answers.'); finish(); }
    }, 1000);
    stopFns.push(function () { clearInterval(tick); });
    var finishing = false;
    async function finish() {
      if (finishing) return; finishing = true; clearInterval(tick);
      m.status = 'marking'; lsSet('ielts.mock', m);
      view.innerHTML = '<div class="panel" style="text-align:center"><h2>Marking your test</h2><p class="sub">Both tasks are being marked against the four criteria. This takes about 30 seconds.</p><span class="spin"></span></div>';
      var secs = Math.min(m.dur, Math.floor((Date.now() - m.start) / 1000)), ids = {};
      try {
        for (var p = 1; p <= 2; p++) {
          var txt = m.texts[p] || '';
          if (words(txt) < 20) continue;
          var r = await api('score', { method: 'POST', body: { taskId: p === 1 ? m.t1 : m.t2, text: txt, mode: 'final', mockId: m.id, seconds: secs } });
          ids[p] = r.attempt.id;
        }
        m.status = 'done'; m.ids = ids; lsSet('ielts.mock', null); lsSet('ielts.mocks.' + m.id, m);
        await loadMe(); go('#/mockreport/' + m.id);
      } catch (e) {
        m.status = 'running'; lsSet('ielts.mock', m); finishing = false;
        view.innerHTML = '<div class="panel"><h2>Marking failed</h2><p class="sub">' + (e.code === 'quota' ? 'You have used today\'s full markings. Your answers are saved: submit again tomorrow.' : 'Your answers are saved on this device. Please try again.') + '</p><button class="btn" id="again">Try again</button></div>';
        $('#again').onclick = finish;
      }
    }
    render();
  }
  async function vMockReport(mid) {
    setNav('writing'); await loadBank();
    if (needAccount('#/progress')) return;
    var att = ((ME && ME.attempts) || []).filter(function (a) { return a.mock === mid; });
    var t1 = att.filter(function (a) { return a.part === 1; })[0], t2 = att.filter(function (a) { return a.part === 2; })[0];
    var b1 = t1 ? t1.band : 0, b2 = t2 ? t2.band : 0, overall = half((b1 + 2 * b2) / 3);
    view.innerHTML = '<div class="report-head"><div class="big"><small>Writing band</small>' + band(overall) + '</div><div><div class="eyebrow" style="color:var(--gold-soft)">Mock test · ' + when((t2 || t1 || {}).at) + '</div><p style="margin-top:6px">Task 1 scored ' + band(t1 ? b1 : null) + ' and Task 2 scored ' + band(t2 ? b2 : null) + '. In IELTS, Task 2 counts twice as much as Task 1.</p></div></div>' +
      '<div class="grid" style="margin-top:16px">' + [t1, t2].map(function (a, i) {
        return a ? '<a class="card" href="#/report/' + a.id + '"><span class="tag">Task ' + (i + 1) + ' · ' + a.words + ' words</span><h3>' + esc(a.title) + '</h3><div style="font-family:var(--serif);font-size:34px;color:var(--navy);font-weight:700">' + band(a.band) + '</div><span class="go">Full report →</span></a>'
          : '<div class="card dim"><span class="tag">Task ' + (i + 1) + '</span><h3>Not answered</h3><p>An unanswered task scores 0.</p></div>';
      }).join('') + '</div><div class="row" style="margin-top:22px"><a class="btn" href="#/mock">Take another mock</a><a class="btn ghost" href="#/progress">My progress</a></div>';
  }

  /* ---------- progress ---------- */
  function trendSvg(att) {
    var pts = att.filter(function (a) { return typeof a.band === 'number' && a.skill === 'writing'; });
    if (pts.length < 2) return '<div class="empty">Your band trend appears here after two marked essays.</div>';
    var W = 680, H = 220, L = 34, R = 10, T = 12, B = 26, n = pts.length;
    var x = function (i) { return L + (W - L - R) * (n === 1 ? 0.5 : i / (n - 1)); }, y = function (b) { return T + (H - T - B) * (1 - (b - 3) / 6); };
    var g = '';
    for (var b = 3; b <= 9; b++) g += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(b) + '" y2="' + y(b) + '" stroke="#e4dccd"/><text x="' + (L - 8) + '" y="' + (y(b) + 4) + '" font-size="14" text-anchor="end" fill="#5d6676">' + b + '</text>';
    [1, 2].forEach(function (part) {
      var col = part === 1 ? '#b08a3e' : '#0b1f3a', seq = [];
      pts.forEach(function (a, i) { if (a.part === part) seq.push([x(i), y(Math.max(3, a.band)), a]); });
      if (seq.length > 1) g += '<polyline fill="none" stroke="' + col + '" stroke-width="2.5" points="' + seq.map(function (p) { return p[0] + ',' + p[1]; }).join(' ') + '"/>';
      seq.forEach(function (p) { g += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + col + '"><title>' + esc(p[2].title) + ': ' + band(p[2].band) + '</title></circle>'; });
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Writing band trend">' + g + '</svg><div class="ch-legend"><span><i style="background:#0b1f3a"></i>Task 2</span><span><i style="background:#b08a3e"></i>Task 1</span></div>';
  }
  function progressHtml(prof, att, base) {
    var scored = att.filter(function (a) { return typeof a.band === 'number'; });
    var last5 = scored.slice(-5), avg = last5.length ? half(last5.reduce(function (s, a) { return s + a.band; }, 0) / last5.length) : null;
    var best = scored.reduce(function (m, a) { return Math.max(m, a.band); }, 0);
    var sp = scored.filter(function (a) { return a.skill === 'speaking'; }), wr = scored.filter(function (a) { return a.skill !== 'speaking'; });
    var crit = { 'Task Ach./Resp.': [], 'Coherence': [], 'Lexis': [], 'Grammar': [] };
    wr.slice(-8).forEach(function (a) { if (!a.criteria) return; var c = a.criteria; crit['Task Ach./Resp.'].push(c.TA != null ? c.TA : c.TR); crit['Coherence'].push(c.CC); crit['Lexis'].push(c.LR); crit['Grammar'].push(c.GRA); });
    var mocks = {}; scored.forEach(function (a) { if (a.mock) (mocks[a.mock] = mocks[a.mock] || []).push(a); });
    var spAvg = sp.length ? half(sp.slice(-3).reduce(function (s, a) { return s + a.band; }, 0) / Math.min(3, sp.length)) : null;
    var wrAvg = wr.length ? half(wr.slice(-5).reduce(function (s, a) { return s + a.band; }, 0) / Math.min(5, wr.length)) : null;
    var h = '<div class="stats"><div class="stat"><span>Essays marked</span><b>' + wr.length + '</b></div><div class="stat"><span>Writing average (last 5)</span><b>' + band(wrAvg) + '</b></div><div class="stat"><span>Speaking tests</span><b>' + sp.length + '</b></div><div class="stat"><span>Speaking average (last 3)</span><b>' + band(spAvg) + '</b></div><div class="stat"><span>Best band</span><b>' + band(best || null) + '</b></div><div class="stat"><span>Writing mocks</span><b>' + Object.keys(mocks).length + '</b></div></div>';
    h += '<section class="section"><h3>Band trend</h3><div class="trend">' + trendSvg(att) + '</div></section>';
    h += '<section class="section"><h3>Writing criteria (last 8 essays)</h3><div class="stats" style="margin-top:8px">' + Object.keys(crit).map(function (k) {
      var v = crit[k].filter(function (x) { return typeof x === 'number'; }); var m = v.length ? half(v.reduce(function (s, x) { return s + x; }, 0) / v.length) : null;
      return '<div class="stat"><span>' + k + '</span><b>' + band(m) + '</b></div>';
    }).join('') + '</div></section>';
    h += '<section class="section"><h3>All work</h3>' + (att.length ? '<div class="tscroll" style="margin-top:8px"><table class="t"><thead><tr><th>Date</th><th>Task</th><th>Words</th><th>Band</th><th></th></tr></thead><tbody>' +
      att.slice().reverse().map(function (a) {
        return '<tr><td>' + when(a.at) + '</td><td>' + (a.mock ? '<span class="badge">Mock</span> ' : '') + (a.skill === 'speaking' ? '<span class="badge ai">Speaking</span> ' + esc(a.title) : 'Task ' + a.part + ' · ' + esc(a.title)) + '</td><td>' + (a.words || '–') + '</td><td><b>' + band(a.band) + '</b></td><td><a href="' + base + a.id + '">Report</a></td></tr>';
      }).join('') + '</tbody></table></div>' : '<div class="empty" style="margin-top:8px">No marked work yet. <a href="#/writing">Start with a writing task</a>.</div>') + '</section>';
    return h;
  }
  async function vProgress() {
    setNav('progress'); await loadBank();
    if (needAccount('#/progress')) return;
    await loadMe(); header();
    view.innerHTML = '<section class="hero" style="padding-bottom:6px"><div class="eyebrow">' + esc(ME.profile.name) + '</div><h1>My progress</h1><p class="lead">Every marked essay, your band over time and how each criterion is developing.</p></section>' +
      progressHtml(ME.profile, ME.attempts || [], '#/report/');
  }

  /* ---------- teacher ---------- */
  async function vTeacher(uid, aid) {
    setNav('teacher'); await loadBank();
    if (needAccount('#/teacher')) return;
    if (role() !== 'teacher') { view.innerHTML = '<div class="empty" style="margin-top:30px">This page is for IF Academy teachers.</div>'; return; }
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span> Loading…</p>';
    try {
      if (uid && aid) {
        var a = (await api('teacher/student/' + uid + '/' + aid)).attempt;
        view.innerHTML = '<div class="row" style="margin-top:18px"><a class="btn ghost sm" href="#/teacher/' + uid + '">← Back to student</a></div>' + (a.skill === 'speaking' ? speakingReportHtml(a, { teacher: true }) : reportHtml(a, { teacher: true }));
      } else if (uid) {
        var d = await api('teacher/student/' + uid);
        view.innerHTML = '<div class="row" style="margin-top:18px"><a class="btn ghost sm" href="#/teacher">← All students</a></div><section class="hero" style="padding:18px 0 6px"><div class="eyebrow">Student</div><h1>' + esc(d.profile.name) + '</h1><p class="lead">' + esc(d.profile.email) + ' · joined ' + when(d.profile.since) + '</p></section>' +
          progressHtml(d.profile, d.attempts || [], '#/teacher/' + uid + '/');
      } else {
        var s = (await api('teacher/students')).students;
        view.innerHTML = '<section class="hero" style="padding-bottom:6px"><div class="eyebrow">Teacher view</div><h1>Students</h1><p class="lead">Everyone registered in the IELTS Centre, most recently active first.</p></section>' +
          (s.length ? '<div class="tscroll"><table class="t"><thead><tr><th>Student</th><th>Marked work</th><th>Latest</th><th>Average (last 5)</th><th>Last active</th></tr></thead><tbody>' +
            s.map(function (r) { return '<tr><td><a href="#/teacher/' + r.id + '">' + esc(r.name) + '</a><br><small style="color:var(--muted)">' + esc(r.email) + '</small></td><td>' + r.attempts + '</td><td><b>' + band(r.latest) + '</b></td><td>' + band(r.average) + '</td><td>' + when(r.lastActive) + '</td></tr>'; }).join('') +
            '</tbody></table></div>' : '<div class="empty">No students have registered yet. Share this page and your class code with them.</div>');
      }
    } catch (e) { view.innerHTML = '<div class="empty" style="margin-top:30px">Could not load student data. Please try again.</div>'; }
  }

  /* ---------------- speaking ---------------- */
  var SBANK = null;
  async function loadSpeak() { if (!SBANK) SBANK = await (await fetch('data/speaking.json')).json(); return SBANK; }
  function topicById(id) { return SBANK && SBANK.topics.filter(function (t) { return t.id === id; })[0]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function canSpeak() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && SR); }

  /* examiner voice */
  var VOICE = null;
  function pickVoice() {
    var vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    VOICE = vs.filter(function (v) { return /en-GB/i.test(v.lang) && /Daniel|Serena|Kate|Arthur|Martha|Google UK English Female|Google UK English Male|Libby|Ryan|Sonia/i.test(v.name); })[0] ||
      vs.filter(function (v) { return /en-GB/i.test(v.lang); })[0] || vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || null;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text) {
    return new Promise(function (res) {
      if (!window.speechSynthesis) return res();
      try { speechSynthesis.cancel(); } catch (e) {}
      var u = new SpeechSynthesisUtterance(text); if (VOICE) u.voice = VOICE; u.lang = (VOICE && VOICE.lang) || 'en-GB'; u.rate = 0.95;
      var done = false, fin = function () { if (!done) { done = true; res(); } };
      u.onend = fin; u.onerror = fin; setTimeout(fin, 1500 + text.length * 90);
      speechSynthesis.speak(u);
    });
  }

  /* one microphone session for the whole test: recording, transcript and pause measurement */
  function MicSession(stream) {
    var ctx = new (window.AudioContext || window.webkitAudioContext)(), src = ctx.createMediaStreamSource(stream), an = ctx.createAnalyser();
    an.fftSize = 1024; src.connect(an);
    var buf = new Float32Array(an.fftSize), floor = 0.01, self = this;
    function rms() { an.getFloatTimeDomainData(buf); var s = 0; for (var i = 0; i < buf.length; i++) s += buf[i] * buf[i]; return Math.sqrt(s / buf.length); }
    // calibrate background noise for 600 ms
    var cal = [], calT = setInterval(function () { cal.push(rms()); }, 50);
    setTimeout(function () { clearInterval(calT); if (cal.length) { cal.sort(); floor = Math.max(0.006, cal[Math.floor(cal.length * 0.7)]); } }, 650);
    this.start = function (onText) {
      var rec = { text: '', interim: '', conf: [], started: Date.now(), speechMs: 0, pauses: 0, longPauses: 0, chunks: [] };
      var silentMs = 0, spoke = false, tick = 100;
      rec.meter = setInterval(function () {
        var loud = rms() > floor * 2.2;
        if (loud) { if (spoke && silentMs >= 1000) { rec.pauses++; if (silentMs >= 3000) rec.longPauses++; } silentMs = 0; spoke = true; rec.speechMs += tick; }
        else silentMs += tick;
        rec.level = loud;
      }, tick);
      try {
        var mr = new MediaRecorder(stream, { audioBitsPerSecond: 32000 });
        mr.ondataavailable = function (e) { if (e.data && e.data.size) rec.chunks.push(e.data); }; mr.start(1000); rec.mr = mr;
      } catch (e) {}
      var r = new SR(); r.lang = 'en-GB'; r.continuous = true; r.interimResults = true; rec.r = r; rec.on = true;
      r.onresult = function (ev) {
        var interim = '';
        for (var i = ev.resultIndex; i < ev.results.length; i++) {
          var res = ev.results[i];
          if (res.isFinal) { rec.text += (rec.text ? ' ' : '') + res[0].transcript.trim(); if (res[0].confidence) rec.conf.push(res[0].confidence); }
          else interim += res[0].transcript;
        }
        rec.interim = interim; if (onText) onText(rec.text + (interim ? ' ' + interim : ''));
      };
      r.onend = function () { if (rec.on) { try { r.start(); } catch (e) {} } };
      r.onerror = function (e) { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { rec.on = false; rec.err = e.error; } };
      try { r.start(); } catch (e) {}
      return rec;
    };
    this.stop = function (rec) {
      return new Promise(function (res) {
        rec.on = false; clearInterval(rec.meter);
        try { rec.r.stop(); } catch (e) {}
        var finish = function () {
          var text = (rec.text + (rec.interim ? ' ' + rec.interim : '')).trim();
          var url = rec.chunks.length ? URL.createObjectURL(new Blob(rec.chunks, { type: rec.chunks[0].type || 'audio/webm' })) : null;
          res({ text: text, secs: (Date.now() - rec.started) / 1000, speechSecs: rec.speechMs / 1000, pauses: rec.pauses, longPauses: rec.longPauses,
            conf: rec.conf.length ? rec.conf.reduce(function (a, b) { return a + b; }, 0) / rec.conf.length : null, audio: url, err: rec.err });
        };
        if (rec.mr && rec.mr.state !== 'inactive') { rec.mr.onstop = function () { setTimeout(finish, 400); }; try { rec.mr.stop(); } catch (e) { setTimeout(finish, 600); } }
        else setTimeout(finish, 600);
      });
    };
    this.close = function () { try { stream.getTracks().forEach(function (t) { t.stop(); }); ctx.close(); } catch (e) {} };
  }

  async function vSpeaking() {
    setNav('speaking'); await loadSpeak();
    var best = {}; ((ME && ME.attempts) || []).forEach(function (a) { if (a.skill === 'speaking' && typeof a.band === 'number' && (!best[a.task] || a.band > best[a.task])) best[a.task] = a.band; });
    view.innerHTML = '<section class="hero"><div class="eyebrow">Speaking · AI examiner</div><h1>Speaking test</h1>' +
      '<p class="lead">An examiner voice asks the questions and you answer out loud. Your answers are transcribed as you speak, and when you finish, AI marks Fluency, Vocabulary, Grammar and Pronunciation.</p>' +
      (canSpeak() ? '' : '<div class="err" style="max-width:680px">This browser cannot listen to speech. Please use <b>Chrome</b> or <b>Edge</b> on a computer or Android phone, or <b>Safari</b> on iPhone.</div>') +
      '<p class="hint" style="margin-top:12px">Use headphones or a quiet room. Full test: about 12 minutes (Part 1 · 4 questions, Part 2 · 1 minute to prepare and up to 2 minutes to speak, Part 3 · 4 questions).</p></section>' +
      '<div class="task-list">' + SBANK.topics.map(function (t) {
        return '<div class="task" style="flex-wrap:wrap"><div style="flex:1;min-width:180px"><span class="id">Topic</span><b>' + esc(t.name) + '</b><span class="k">' + t.cues.length + ' cue cards · ' + t.p3.length + ' discussion questions</span></div>' +
          (best[t.id] != null ? '<div class="best"><span>Best</span><strong>' + band(best[t.id]) + '</strong></div>' : '') +
          '<div class="row" style="width:100%;gap:6px"><a class="btn sm" href="#/speak/' + t.id + '/full">Full test</a><a class="btn ghost sm" href="#/speak/' + t.id + '/p1">Part 1</a><a class="btn ghost sm" href="#/speak/' + t.id + '/p2">Part 2</a><a class="btn ghost sm" href="#/speak/' + t.id + '/p3">Part 3</a></div></div>';
      }).join('') + '</div>';
  }

  async function vSpeak(topicId, scope) {
    setNav('speaking'); await loadSpeak();
    var t = topicById(topicId); if (!t) return go('#/speaking');
    if (needAccount('#/speak/' + topicId + '/' + scope)) return;
    if (!canSpeak()) return vSpeaking();
    scope = ['full', 'p1', 'p2', 'p3'].indexOf(scope) >= 0 ? scope : 'full';
    var cue = t.cues[Math.floor(Math.random() * t.cues.length)];
    var steps = [];
    if (scope === 'full' || scope === 'p1') {
      steps.push({ part: 1, say: 'Good morning. This is the IELTS Speaking test. In this first part, I would like to ask you some questions about ' + t.name.toLowerCase() + '.', intro: true });
      shuffle(t.p1).slice(0, scope === 'p1' ? 6 : 4).forEach(function (q) { steps.push({ part: 1, q: q, max: 45 }); });
    }
    if (scope === 'full' || scope === 'p2') {
      steps.push({ part: 2, cue: cue, prep: 60, max: 120, q: cue.task + ' You should say: ' + cue.points.join(', ') + ', ' + cue.explain,
        say: 'Now I am going to give you a topic, and I would like you to talk about it for one to two minutes. You have one minute to think about what you are going to say. You can make some notes if you wish.' });
      if (cue.round) steps.push({ part: 2, q: cue.round, max: 30 });
    }
    if (scope === 'full' || scope === 'p3') {
      steps.push({ part: 3, say: 'We have been talking about ' + t.name.toLowerCase() + '. I would now like to ask you some more general questions about this.', intro: true });
      shuffle(t.p3).slice(0, scope === 'p3' ? 5 : 4).forEach(function (q) { steps.push({ part: 3, q: q, max: 75 }); });
    }
    var answers = [], i = 0, mic = null, rec = null, timer = null, stopped = false;
    stopFns.push(function () { stopped = true; clearInterval(timer); try { speechSynthesis.cancel(); } catch (e) {} if (rec) { rec.on = false; try { rec.r.stop(); } catch (e) {} } if (mic) mic.close(); });

    view.innerHTML = '<section class="hero" style="padding-bottom:10px"><div class="eyebrow">Speaking · ' + (scope === 'full' ? 'Full test' : 'Part ' + scope.slice(1)) + '</div><h1>' + esc(t.name) + '</h1>' +
      '<p class="lead">When you press Start, the browser will ask to use your microphone. Allow it. The examiner speaks first; answer when the microphone turns gold.</p>' +
      '<div class="row" style="margin-top:16px"><button class="btn gold" id="go">Start</button><a class="btn ghost" href="#/speaking">Back</a></div></section>';
    $('#go').onclick = async function () {
      this.disabled = true;
      try { mic = new MicSession(await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })); }
      catch (e) { toast('Microphone blocked. Allow the microphone in your browser settings and try again.'); this.disabled = false; return; }
      await say(' ');
      next();
    };
    function stage(html) {
      view.innerHTML = '<div class="steps" style="margin-top:20px">' + ['1', '2', '3'].filter(function (p) { return steps.some(function (s) { return String(s.part) === p; }); }).map(function (p) {
        var cur = steps[Math.min(i, steps.length - 1)].part;
        return '<span class="' + (String(cur) === p ? 'on' : (+p < cur ? 'done' : '')) + '">Part ' + p + '</span>';
      }).join('') + '</div><div class="spk">' + html + '</div>';
    }
    async function next() {
      if (stopped) return;
      if (i >= steps.length) return finish();
      var s = steps[i];
      if (s.intro) { stage('<div class="examiner"><span class="ex-dot on"></span> Examiner</div><p class="spk-q">' + esc(s.say) + '</p>'); await say(s.say); i++; return next(); }
      if (s.cue) {
        stage('<div class="examiner"><span class="ex-dot on"></span> Examiner</div><p class="spk-q">' + esc(s.say) + '</p>' + cueCard(s.cue));
        await say(s.say); if (stopped) return;
        var left = s.prep;
        stage(cueCard(s.cue) + '<p class="spk-time"><b data-left>' + left + '</b> seconds to prepare</p><textarea class="inp" rows="4" placeholder="Notes (optional, only for you)"></textarea><div class="row" style="margin-top:12px"><button class="btn" id="ready">I\'m ready, start speaking</button></div>');
        await new Promise(function (res) {
          timer = setInterval(function () { left--; var e = view.querySelector('[data-left]'); if (e) e.textContent = left; if (left <= 0) { clearInterval(timer); res(); } }, 1000);
          $('#ready').onclick = function () { clearInterval(timer); res(); };
        });
        if (stopped) return;
        await say('All right. Remember you have one to two minutes for this, so don\'t worry if I stop you. I\'ll tell you when the time is up. Can you start speaking now, please?');
        return answer(s, cueCard(s.cue));
      }
      stage('<div class="examiner"><span class="ex-dot on"></span> Examiner</div><p class="spk-q">' + esc(s.q) + '</p>');
      await say(s.q);
      answer(s, '<div class="examiner"><span class="ex-dot"></span> Examiner</div><p class="spk-q">' + esc(s.q) + '</p>');
    }
    function cueCard(c) { return '<div class="cue"><b>' + esc(c.task) + '</b><p>You should say:</p><ul>' + c.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul><p>' + esc(c.explain) + '</p></div>'; }
    function answer(s, head) {
      if (stopped) return;
      var left = s.max;
      stage(head + '<div class="mic on" aria-hidden="true"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1"/><path d="M12 18v4"/><path d="M8 22h8"/></svg></div><p class="spk-time">Speaking… <b data-left>' + left + '</b>s</p><div class="transcript" data-tx><span class="ph">Your words appear here as you speak.</span></div>' +
        '<div class="row" style="margin-top:14px;justify-content:center"><button class="btn" id="done">' + (s.max >= 120 ? 'I\'ve finished my talk' : i === steps.length - 1 ? 'Finish answer' : 'Next question →') + '</button><button class="btn ghost" id="quit">End test</button></div>');
      rec = mic.start(function (txt) { var e = view.querySelector('[data-tx]'); if (e) e.textContent = txt; });
      var ended = false;
      async function end() {
        if (ended) return; ended = true; clearInterval(timer);
        var r = await mic.stop(rec); rec = null;
        if (r.err) toast('Speech recognition is blocked in this browser. Try Chrome or Safari.');
        answers.push({ part: s.part, q: s.q, text: r.text, secs: r.secs, speechSecs: r.speechSecs, pauses: r.pauses, longPauses: r.longPauses, conf: r.conf, audio: r.audio });
        i++;
        if (s.max >= 120) await say('Thank you.');
        next();
      }
      timer = setInterval(function () {
        left--; var e = view.querySelector('[data-left]'); if (e) e.textContent = left;
        var m = view.querySelector('.mic'); if (m && rec) m.classList.toggle('loud', !!rec.level);
        if (left <= 0) end();
      }, 1000);
      $('#done').onclick = end;
      $('#quit').onclick = function () { if (confirm('End the test now and mark the answers you have given?')) { steps = steps.slice(0, i + 1); end(); } };
    }
    async function finish() {
      if (mic) { mic.close(); mic = null; }
      var spoken = answers.reduce(function (n, a) { return n + words(a.text); }, 0);
      if (spoken < 15) {
        view.innerHTML = '<div class="panel"><h2>We could not hear enough</h2><p class="sub">Only ' + spoken + ' words were recognised. Check that the microphone works and speak a little louder, then try again.</p><a class="btn" href="#/speak/' + topicId + '/' + scope + '">Try again</a></div>';
        return;
      }
      view.innerHTML = '<div class="panel" style="text-align:center"><h2>Marking your speaking</h2><p class="sub">The examiner is listening back to your answers. This takes about 20 seconds.</p><span class="spin"></span></div>';
      var payload = answers.map(function (a) { var c = Object.assign({}, a); delete c.audio; return c; });
      try {
        var r = await api('speak', { method: 'POST', body: { topicId: topicId, scope: scope, answers: payload } });
        LAST_AUDIO[r.attempt.id] = answers.map(function (a) { return a.audio; });
        await loadMe(); go('#/report/' + r.attempt.id);
      } catch (e) {
        view.innerHTML = '<div class="panel"><h2>Marking failed</h2><p class="sub">' + (e.code === 'quota' ? 'You have used today\'s speaking markings. Try again tomorrow.' : 'Something went wrong. Please try again.') + '</p><button class="btn" id="again">Try again</button></div>';
        $('#again').onclick = finish;
      }
    }
  }
  var LAST_AUDIO = {};

  function speakingReportHtml(a, opts) {
    opts = opts || {};
    var r = a.result, audio = LAST_AUDIO[a.id] || [];
    var h = '<div class="report-head"><div class="big"><small>Band</small>' + band(r.overall) + '</div><div><div class="eyebrow" style="color:var(--gold-soft)">Speaking · ' + esc(a.title) + '</div><p style="margin-top:6px">' + esc(r.summary || '') + '</p><p style="margin-top:6px;font-size:14px">' + a.words + ' words spoken · ' + Math.round((a.seconds || 0) / 60) + ' min · ' + when(a.at) + '</p></div></div>';
    h += '<div class="rcrit">' + Object.keys(SNAMES).map(function (k) { var c = r.criteria[k] || {}; return '<div class="card"><span class="tag">' + SNAMES[k] + '</span><div class="band">' + band(c.band) + '</div><p>' + esc(c.comment || '') + '</p></div>'; }).join('') + '</div>';
    h += '<p class="hint" style="margin-top:10px">Pronunciation is estimated from how clearly the speech recogniser understood you, so treat it as a guide.</p>';
    if (r.strengths && r.strengths.length) h += '<section class="section"><h3>What went well</h3><ul class="list">' + r.strengths.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></section>';
    if (r.improve && r.improve.length) h += '<section class="section"><h3>How to raise your band</h3><ul class="list">' + r.improve.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></section>';
    if (r.corrections && r.corrections.length) h += '<section class="section"><h3>Corrections</h3><div class="corr">' + r.corrections.map(function (c) { return '<div><del>' + esc(c.original) + '</del> → <ins>' + esc(c.better) + '</ins><small>' + esc(c.why) + '</small></div>'; }).join('') + '</div></section>';
    if (r.upgrades && r.upgrades.length) h += '<section class="section"><h3>Band 8 versions of your answers</h3><div class="corr">' + r.upgrades.map(function (u) { var n = parseInt(String(u.q).replace(/\D/g, ''), 10), q = a.answers && a.answers[n - 1]; return '<div><small style="margin:0 0 4px">' + esc(q ? q.q : u.q) + '</small>' + esc(u.better) + '</div>'; }).join('') + '</div></section>';
    h += '<section class="section"><h3>Your answers</h3><div class="corr">' + (a.answers || []).map(function (x, k) {
      return '<div><small style="margin:0 0 4px">Part ' + x.part + ' · ' + esc(x.q) + '</small>' + (esc(x.text) || '<i>No speech recognised</i>') +
        (audio[k] ? '<audio controls preload="none" src="' + audio[k] + '" style="display:block;width:100%;margin-top:8px"></audio>' : '') +
        '<small>' + Math.round(x.secs) + ' s · ' + words(x.text) + ' words' + (x.pauses ? ' · ' + x.pauses + ' pauses' : '') + '</small></div>';
    }).join('') + '</div></section>';
    if (!opts.teacher) h += '<div class="row" style="margin-top:22px"><a class="btn" href="#/speak/' + a.taskId + '/' + (a.scope || 'full') + '">Try again</a><a class="btn ghost" href="#/speaking">Another topic</a><a class="btn ghost" href="#/progress">My progress</a></div>';
    return h;
  }
  var SNAMES = { FC: 'Fluency & Coherence', LR: 'Lexical Resource', GRA: 'Grammar', P: 'Pronunciation' };

  /* ---------------- router ---------------- */
  async function route() {
    cleanup();
    var h = location.hash.replace(/^#\/?/, ''), parts = h.split('/');
    document.title = 'IELTS Centre · IF Academy';
    window.scrollTo(0, 0);
    try {
      switch (parts[0]) {
        case '': return vHome();
        case 'login': return USER && role() ? go('#/') : vLogin();
        case 'register': return USER && role() ? go('#/') : vRegister();
        case 'activate': return vActivate();
        case 'forgot': return vForgot();
        case 'reset': return vReset();
        case 'writing': return vWriting(parts[1]);
        case 'write': return vWrite(parts[1]);
        case 'report': return vReport(parts[1]);
        case 'mock': return parts[1] === 'run' ? vMockRun() : vMock();
        case 'mockreport': return vMockReport(parts[1]);
        case 'speaking': return vSpeaking();
        case 'speak': return vSpeak(parts[1], parts[2]);
        case 'progress': return vProgress();
        case 'teacher': return vTeacher(parts[1], parts[2]);
        case 'app': setNav(''); vHome(); return openApp(parts[1]);
        default: return go('#/');
      }
    } catch (e) {
      console.error(e);
      view.innerHTML = '<div class="empty" style="margin-top:30px">Something went wrong loading this page. <a href="#/">Back to the IELTS Centre</a></div>';
    }
  }

  async function boot() {
    var hash = location.hash;
    if (/recovery_token=/.test(hash)) {
      RECOVERY = new URLSearchParams(hash.replace(/^#/, '')).get('recovery_token');
      history.replaceState(null, '', location.pathname + '#/reset');
    } else if (/(confirmation_token|access_token|invite_token|email_change_token)=/.test(hash)) {
      try {
        var r = await ID.handleAuthCallback();
        history.replaceState(null, '', location.pathname + '#/');
        if (r && r.type === 'confirmation') toast('Email confirmed. Welcome!');
      } catch (e) { history.replaceState(null, '', location.pathname + '#/login'); toast('That link has expired. Please sign in.'); }
    }
    await loadMe();
    if (USER && !role()) {
      var pend = lsGet('ielts.pending');
      if (pend && pend.code) { try { await activate(pend.code, pend.name); lsSet('ielts.pending', null); await loadMe(); } catch (e) {} }
    }
    header();
    window.addEventListener('hashchange', route);
    route();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('#player').classList.contains('on')) go('#/'); });
  boot();
})();
