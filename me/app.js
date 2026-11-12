/* My IF Academy: accounts, student and teacher profiles, classes, admin. */
(function () {
  'use strict';
  var ID = window.NFIdentity, $ = function (s, r) { return (r || document).querySelector(s); };
  var view = $('#view'), USER = null, ME = null, RECOVERY = null, ADMIN = null;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function band(b) { return typeof b === 'number' ? (b % 1 ? b.toFixed(1) : b + '.0') : '–'; }
  function when(iso) { if (!iso) return '–'; var d = new Date(iso); return isNaN(d) ? esc(iso) : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
  function initials(n) { return String(n || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
  function toast(m) { var t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 3200); }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  function role() { return ME && ME.profile && ME.profile.role; }
  function staff() { return role() === 'teacher' || role() === 'admin'; }
  function avatar(uid, name, ver, size) {
    return '<span class="avatar ' + (size || '') + '">' + (uid && ver ? '<img src="/api/school/photo/' + uid + '?v=' + ver + '" alt="" onerror="this.remove()">' : '') + esc(initials(name)) + '</span>';
  }
  function statusChip(s) {
    var m = { active: ['ok', 'Active'], frozen: ['warn', 'Paused'], withdrawn: ['mute', 'Left'], finished: ['mute', 'Finished'] }[String(s || 'active').toLowerCase()] || ['mute', s];
    return '<span class="chip2 ' + m[0] + '">' + esc(m[1]) + '</span>';
  }
  async function api(path, opts) {
    opts = opts || {};
    var init = { method: opts.method || 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' };
    if (opts.body) init.body = JSON.stringify(opts.body);
    var res = await fetch('/api/school/' + path, init);
    if (res.status === 401 && !opts.retried) { try { await ID.refreshSession(); } catch (e) {} return api(path, Object.assign({}, opts, { retried: true })); }
    var data = await res.json().catch(function () { return {}; });
    if (!res.ok) { var e = new Error(data.error || res.status); e.code = data.error; e.status = res.status; throw e; }
    return data;
  }
  async function loadMe() {
    try { USER = await ID.getUser(); } catch (e) { USER = null; }
    if (!USER) { ME = null; return; }
    try { ME = await api('me'); } catch (e) { ME = null; if (e.status === 401) USER = null; }
  }
  function header() {
    var who = $('#who');
    if (USER) {
      who.innerHTML = '<button class="btn ghost sm" id="out">Sign out</button>';
      $('#out').onclick = async function () { try { await ID.logout(); } catch (e) {} USER = null; ME = null; header(); go('#/login'); toast('Signed out'); };
    } else who.innerHTML = '';
    $('[data-nav=classes]').hidden = !staff();
    $('[data-nav=admin]').hidden = role() !== 'admin';
  }
  function setNav(k) { document.querySelectorAll('.nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.nav === k); }); }
  function bookOf(id) { return ((ME && ME.books) || []).filter(function (b) { return b.id === id; })[0]; }
  function teacherOf(id) { return ((ME && ME.teachers) || []).filter(function (t) { return t.id === id; })[0]; }
  function modal(html) { $('#modalBody').innerHTML = html; $('#modal').hidden = false; }
  function closeModal() { $('#modal').hidden = true; $('#modalBody').innerHTML = ''; if (closeModal.stop) { closeModal.stop(); closeModal.stop = null; } }
  $('#modalX').onclick = closeModal;
  $('#modal').addEventListener('click', function (e) { if (e.target.id === 'modal') closeModal(); });
  function panel(title, sub, inner) { return '<div class="panel"><h2>' + title + '</h2><p class="sub">' + sub + '</p>' + inner + '</div>'; }
  function err(el, msg) { var e = $('.err', el) || $('.ok-msg', el); if (e) e.remove(); var d = document.createElement('div'); d.className = 'err'; d.textContent = msg; el.appendChild(d); }
  function okm(el, msg) { var e = $('.err', el) || $('.ok-msg', el); if (e) e.remove(); var d = document.createElement('div'); d.className = 'ok-msg'; d.textContent = msg; el.appendChild(d); }
  function authMsg(e) {
    var m = String((e && e.message) || e || '');
    if (/invalid_grant|Invalid login|No user found/i.test(m)) return 'That email and password do not match.';
    if (/confirm/i.test(m)) return 'Please confirm your email first, then sign in.';
    if (/already registered|exists/i.test(m)) return 'An account with this email already exists. Sign in instead.';
    if (/at least|weak|short/i.test(m)) return 'Choose a password with at least 8 characters.';
    return m || 'Something went wrong. Please try again.';
  }

  /* ---------- auth ---------- */
  function vLogin() {
    setNav('');
    view.innerHTML = panel('Sign in', 'One account for your IF Academy profile, classes and the IELTS Centre.',
      '<form id="f" novalidate><label class="f">Email</label><input class="inp" id="em" type="email" autocomplete="email"><label class="f">Password</label><input class="inp" id="pw" type="password" autocomplete="current-password"><button class="btn" type="submit">Sign in</button></form>' +
      '<p class="alt"><a href="#/forgot">Forgot password?</a> · New here? <a href="#/register">Create an account</a></p>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f); b.disabled = true;
      try { await ID.login($('#em').value.trim(), $('#pw').value); await loadMe(); header(); go(role() ? '#/' : '#/activate'); }
      catch (e) { err(f, authMsg(e)); b.disabled = false; }
    };
  }
  function vRegister() {
    setNav('');
    view.innerHTML = panel('Create your account', 'For IF Academy students and teachers. Use the phone number you gave the school, so we can find your record.',
      '<form id="f" novalidate><div class="grid2"><div><label class="f">First name</label><input class="inp" id="fn" autocomplete="given-name"></div><div><label class="f">Surname</label><input class="inp" id="ln" autocomplete="family-name"></div></div>' +
      '<label class="f">Phone number</label><input class="inp" id="ph" type="tel" autocomplete="tel" placeholder="+7 7__ ___ __ __"><p class="hint">Students: your own number or your parent\'s, as given to the school.</p>' +
      '<label class="f">Email</label><input class="inp" id="em" type="email" autocomplete="email">' +
      '<label class="f">Password</label><input class="inp" id="pw" type="password" autocomplete="new-password"><p class="hint">At least 8 characters.</p>' +
      '<label class="f">Class code</label><input class="inp" id="cc" autocomplete="off"><p class="hint">From your teacher. Teachers use the staff code.</p>' +
      '<button class="btn" type="submit">Create account</button></form><p class="alt">Already registered? <a href="#/login">Sign in</a></p>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f);
      var name = ($('#fn').value.trim() + ' ' + $('#ln').value.trim()).trim(), ph = $('#ph').value.trim(), em = $('#em').value.trim(), pw = $('#pw').value, cc = $('#cc').value.trim();
      if (!name || !em || !cc || !ph) return err(f, 'Please fill in every field.');
      if (pw.length < 8) return err(f, 'Choose a password with at least 8 characters.');
      b.disabled = true; b.innerHTML = '<span class="spin"></span> Creating account';
      try {
        var u = await ID.signup(em, pw, { full_name: name });
        lsSet('if.pending', { code: cc, name: name, phone: ph });
        if (u && u.confirmedAt) {
          await ID.login(em, pw); await loadMe(); header();
          try { await api('activate', { method: 'POST', body: { code: cc, name: name, phone: ph } }); lsSet('if.pending', null); }
          catch (e2) { toast(e2.code === 'code' ? 'Account created, but that code is not right.' : 'Account created. Now enter your code.'); return go('#/activate'); }
          await loadMe(); header(); toast('Welcome to IF Academy'); go('#/');
        } else f.innerHTML = '<div class="ok-msg">Almost done: open the confirmation link we emailed to <b>' + esc(em) + '</b>.</div>';
      } catch (e) { b.disabled = false; b.textContent = 'Create account'; err(f, authMsg(e)); }
    };
  }
  function vActivate() {
    setNav('');
    if (!USER) return go('#/login');
    var p = lsGet('if.pending') || {};
    view.innerHTML = panel('Link your account', 'Enter your code and phone number so we can connect you to your class.',
      '<form id="f" novalidate><label class="f">Full name</label><input class="inp" id="nm" value="' + esc(p.name || (ME && ME.profile && ME.profile.name) || USER.name || '') + '">' +
      '<label class="f">Phone number</label><input class="inp" id="ph" type="tel" value="' + esc(p.phone || (ME && ME.profile && ME.profile.phone) || '') + '">' +
      '<label class="f">Class or staff code</label><input class="inp" id="cc" value="' + esc(p.code || '') + '"><button class="btn" type="submit">Continue</button></form>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f); b.disabled = true;
      try { await api('activate', { method: 'POST', body: { code: $('#cc').value.trim(), name: $('#nm').value.trim(), phone: $('#ph').value.trim() } }); lsSet('if.pending', null); await loadMe(); header(); go('#/'); }
      catch (e) { b.disabled = false; err(f, e.code === 'code' ? 'That code is not right. Check it with your teacher.' : 'Could not check the code. Try again.'); }
    };
  }
  function vForgot() {
    view.innerHTML = panel('Reset your password', 'We will email you a link to choose a new password.',
      '<form id="f" novalidate><label class="f">Email</label><input class="inp" id="em" type="email"><button class="btn" type="submit">Send reset link</button></form><p class="alt"><a href="#/login">Back to sign in</a></p>');
    $('#f').onsubmit = async function (ev) { ev.preventDefault(); try { await ID.requestPasswordRecovery($('#em').value.trim()); okm(ev.target, 'If that email has an account, a reset link is on its way.'); } catch (e) { err(ev.target, authMsg(e)); } };
  }
  function vReset() {
    if (!RECOVERY) return go('#/forgot');
    view.innerHTML = panel('Choose a new password', '', '<form id="f" novalidate><label class="f">New password</label><input class="inp" id="pw" type="password" autocomplete="new-password"><button class="btn" type="submit">Save password</button></form>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var pw = $('#pw').value; if (pw.length < 8) return err(ev.target, 'At least 8 characters.');
      try { await ID.recoverPassword(RECOVERY, pw); RECOVERY = null; await loadMe(); header(); go('#/'); } catch (e) { err(ev.target, 'This link has expired. Request a new one.'); }
    };
  }

  /* ---------- photo ---------- */
  function photoDialog() {
    modal('<h2>Profile photo</h2><p class="sub" style="color:var(--muted);margin-bottom:14px">Take a photo with your camera or upload one. It is shown only to you, your teachers and the school.</p>' +
      '<div id="camWrap" hidden><video class="cam" id="cam" playsinline autoplay muted></video><div class="row" style="margin-top:10px"><button class="btn" id="snap">Take photo</button><button class="btn ghost" id="camStop">Cancel</button></div></div>' +
      '<div class="row" id="pick"><button class="btn" id="useCam">Use camera</button><label class="btn ghost" style="cursor:pointer">Upload a photo<input type="file" accept="image/*" id="file" hidden></label>' +
      (ME.profile.photo ? '<button class="btn ghost" id="rm">Remove photo</button>' : '') + '</div>');
    var stream = null;
    closeModal.stop = function () { if (stream) stream.getTracks().forEach(function (t) { t.stop(); }); };
    $('#useCam').onclick = async function () {
      try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 720, height: 720 } }); }
      catch (e) { return toast('Camera not available. Upload a photo instead.'); }
      $('#cam').srcObject = stream; $('#camWrap').hidden = false; $('#pick').hidden = true;
    };
    var cs = $('#camStop'); if (cs) cs.onclick = function () { closeModal.stop(); $('#camWrap').hidden = true; $('#pick').hidden = false; };
    $('#snap').onclick = function () { var v = $('#cam'); upload(v, v.videoWidth, v.videoHeight); };
    $('#file').onchange = function () {
      var f = this.files[0]; if (!f) return;
      var img = new Image(); img.onload = function () { upload(img, img.naturalWidth, img.naturalHeight); URL.revokeObjectURL(img.src); };
      img.onerror = function () { toast('That file is not a photo we can read.'); };
      img.src = URL.createObjectURL(f);
    };
    var rm = $('#rm'); if (rm) rm.onclick = async function () { await api('photo', { method: 'DELETE' }); await loadMe(); closeModal(); route(); };
    async function upload(src, w, h) {
      var size = 480, s = Math.min(w, h), c = document.createElement('canvas'); c.width = c.height = size;
      c.getContext('2d').drawImage(src, (w - s) / 2, (h - s) / 2, s, s, 0, 0, size, size);
      var data = c.toDataURL('image/jpeg', 0.85);
      try { await api('photo', { method: 'POST', body: { image: data } }); await loadMe(); closeModal(); toast('Photo saved'); route(); }
      catch (e) { toast('Could not save the photo. Try a smaller one.'); }
    }
  }

  /* ---------- profile ---------- */
  function testsTable(tests) {
    if (!tests || !tests.length) return '<p class="small">No test results yet.</p>';
    return '<div class="tscroll"><table class="t"><thead><tr><th>Date</th><th>Test</th><th>Score</th></tr></thead><tbody>' +
      tests.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }).map(function (t) {
        return '<tr><td>' + esc(t.date || '–') + '</td><td>' + esc(t.test) + (t.note ? '<br><small style="color:var(--muted)">' + esc(t.note) + '</small>' : '') + '</td><td><b>' + esc(t.score || '') + (t.max ? ' / ' + esc(t.max) : '') + (t.band ? ' · band ' + esc(t.band) : '') + '</b></td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  function ieltsBox(i, link) {
    i = i || {};
    var w = i.writing, s = i.speaking;
    return '<div class="box"><h3>IELTS Centre</h3><dl class="kv"><dt>Writing</dt><dd>' + (w ? 'latest ' + band(w.latest) + ' · best ' + band(w.best) + ' · ' + w.count + ' marked' : 'not started') + '</dd>' +
      '<dt>Speaking</dt><dd>' + (s ? 'latest ' + band(s.latest) + ' · best ' + band(s.best) + ' · ' + s.count + ' tests' : 'not started') + '</dd></dl>' +
      (link ? '<div class="row" style="margin-top:12px"><a class="btn sm" href="/a/ielts/">Open IELTS Centre</a></div>' : '') + '</div>';
  }
  function classBox(classes) {
    if (!classes || !classes.length) return '';
    return '<div class="box"><h3>My classes</h3>' + classes.map(function (c) {
      var b = bookOf(c.bookId), t = teacherOf(c.teacherId);
      return '<div class="cls"><div style="flex:1"><b>' + esc(c.label) + '</b><p>' + esc(c.schedule || 'Schedule to be confirmed') + (c.room ? ' · ' + esc(c.room) : '') + '</p>' +
        (t ? '<p>Teacher: ' + esc(t.name) + '</p>' : '') + (b ? '<p>Book: ' + esc(b.title) + (b.ebook ? ' · <a href="' + esc(b.ebook) + '" target="_blank" rel="noopener">Open e-book ↗</a>' : '') + '</p>' : '') + '</div></div>';
    }).join('') + '</div>';
  }
  function detailsForm(p) {
    return '<div class="box"><h3>My details</h3><form id="det" novalidate><div class="grid2">' +
      '<div><label class="f">Full name</label><input class="inp" name="name" value="' + esc(p.name) + '"></div>' +
      '<div><label class="f">Phone</label><input class="inp" name="phone" type="tel" value="' + esc(p.phone) + '"></div>' +
      '<div><label class="f">Date of birth</label><input class="inp" name="birth" type="date" value="' + esc(p.birth) + '"></div>' +
      '<div><label class="f">City</label><input class="inp" name="city" value="' + esc(p.city) + '"></div>' +
      (p.role === 'student' ? '<div><label class="f">Parent / guardian</label><input class="inp" name="parent" value="' + esc(p.parent) + '"></div><div><label class="f">Parent\'s phone</label><input class="inp" name="parentPhone" type="tel" value="' + esc(p.parentPhone) + '"></div>' : '') +
      '<div class="full"><label class="f">' + (p.role === 'student' ? 'My goals' : 'Teaching focus') + '</label><input class="inp" name="goals" value="' + esc(p.goals) + '" placeholder="' + (p.role === 'student' ? 'e.g. IELTS 7.0 by June' : 'e.g. Cambridge exams, teens') + '"></div>' +
      '<div class="full"><label class="f">About me</label><textarea class="inp" name="about" rows="3">' + esc(p.about) + '</textarea></div></div>' +
      '<button class="btn sm" type="submit" style="margin-top:14px">Save details</button></form></div>';
  }
  function wireDetails() {
    var f = $('#det'); if (!f) return;
    f.onsubmit = async function (ev) {
      ev.preventDefault(); var body = {}; new FormData(f).forEach(function (v, k) { body[k] = v; });
      try { var had = ME.profile.studentId; await api('profile', { method: 'PUT', body: body }); await loadMe(); toast(!had && ME.profile.studentId ? 'Saved, and we found your school record!' : 'Details saved'); route(); }
      catch (e) { toast('Could not save. Try again.'); }
    };
  }
  async function vProfile() {
    setNav('home');
    if (!USER) return go('#/login');
    if (!role()) return go('#/activate');
    var p = ME.profile, st = ME.student, r = role();
    var roleLbl = r === 'admin' ? 'Administrator' : r === 'teacher' ? 'Teacher' : 'Student';
    var h = '<section class="prof"><div style="position:relative">' + avatar(ME.user.id, p.name, p.photo) + '<button class="avbtn" id="ph" style="border-radius:0 0 60px 60px">Change</button></div>' +
      '<div><div class="eyebrow">' + roleLbl + (st ? ' · ' + esc((st.classes || []).join(', ')) : '') + '</div><h1>' + esc(p.name) + '</h1><p class="lead" style="font-size:15.5px">' + esc(ME.user.email) + (p.phone ? ' · ' + esc(p.phone) : '') + '</p>' +
      '<div class="chips">' + (st ? statusChip(st.status) : '') + (p.goals ? '<span class="chip2">Goal: ' + esc(p.goals) + '</span>' : '') + (p.since ? '<span class="chip2 mute">Member since ' + when(p.since) + '</span>' : '') + '</div></div></section>';
    if (r === 'student' && !st) h += '<div class="banner"><b>We have not found your school record yet.</b> Check that your phone number below is the one you gave IF Academy (yours or your parent\'s). If it still does not match, your teacher can link your account.</div>';
    h += '<section class="section cols">';
    if (r === 'student') {
      h += classBox(ME.classes);
      h += '<div class="box"><h3>Test results</h3>' + testsTable(st && st.tests) + '</div>';
      h += ieltsBox(ME.ielts, true);
      h += '<div class="box"><h3>Vocabulary</h3><p class="small" style="margin-bottom:12px">Practise the words for your course with flashcards, audio and games.</p><a class="btn sm" href="/a/if-english/">Open IF English</a></div>';
      h += '<div class="box"><h3>Homework</h3><p class="small">Homework from your teacher will appear here, organised by your book and unit.</p><span class="badge soon">Coming next</span></div>';
    } else {
      var tc = ME.teaching || [];
      h += '<div class="box"><h3>' + (r === 'admin' ? 'All classes' : 'My classes') + '</h3>' + (tc.length ? tc.slice(0, 8).map(function (c) { return '<div class="cls"><div style="flex:1"><b><a href="#/class/' + c.id + '" style="text-decoration:none">' + esc(c.label) + '</a></b><p>' + esc(c.schedule || '') + (c.room ? ' · ' + esc(c.room) : '') + '</p></div></div>'; }).join('') + (tc.length > 8 ? '<a class="btn ghost sm" href="#/classes">All ' + tc.length + ' classes</a>' : '') :
        '<p class="small">No classes are linked to your account yet. The administrator can assign them.</p>') + '</div>';
      h += ieltsBox(ME.ielts, true);
      h += '<div class="box"><h3>Teaching materials</h3><p class="small">Lesson presentations for every book will appear here: present them full-screen in class.</p><span class="badge soon">Coming next</span></div>';
    }
    h += '</section><section class="section">' + detailsForm(p) + '<p class="small" style="margin-top:12px">Have a staff or administrator code? <a href="#/activate">Enter it here</a>.</p></section>';
    view.innerHTML = h;
    $('#ph').onclick = photoDialog; wireDetails();
  }

  /* ---------- teacher ---------- */
  async function vClasses() {
    setNav('classes'); if (!staff()) return go('#/');
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span></p>';
    var d = await api('teach/classes');
    view.innerHTML = '<section class="hero" style="padding-bottom:10px"><div class="eyebrow">' + (role() === 'admin' ? 'All classes' : 'Teacher') + '</div><h1>My classes</h1></section>' +
      (d.classes.length ? '<div class="grid">' + d.classes.map(function (c) {
        var b = bookOf(c.bookId), t = teacherOf(c.teacherId);
        return '<a class="card" href="#/class/' + c.id + '"><span class="tag">' + esc(c.room || '') + ' · ' + c.count + ' students</span><h3>' + esc(c.label) + '</h3><p>' + esc(c.schedule || '') + '</p><p>' + (t ? esc(t.name) : '') + (b ? ' · ' + esc(b.title) : '') + '</p><span class="go">Open →</span></a>';
      }).join('') + '</div>' : '<div class="empty">No classes linked to your account yet.</div>');
  }
  function studentCard(v) {
    var s = v.record, p = v.profile, i = v.ielts || {}, w = i.writing, sp = i.speaking;
    return '<a class="person" href="#/student/' + s.id + '">' + avatar(s.uid, s.first + ' ' + s.last, p && p.photo, 'sm') +
      '<div><b>' + esc(s.first + ' ' + s.last) + '</b><small>' + (p ? 'Registered' : 'Not registered yet') + ((s.tests || []).length ? ' · ' + s.tests.length + ' tests' : '') + (w ? ' · W ' + band(w.latest) : '') + (sp ? ' · S ' + band(sp.latest) : '') + '</small></div>' +
      '<span style="margin-left:auto">' + statusChip(s.status) + '</span></a>';
  }
  async function vClass(id) {
    setNav('classes'); if (!staff()) return go('#/');
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span></p>';
    try {
      var d = await api('teach/class/' + id), c = d.class, b = bookOf(c.bookId), t = teacherOf(c.teacherId);
      var act = d.students.filter(function (v) { return !/withdrawn|finished/i.test(v.record.status || ''); }), past = d.students.filter(function (v) { return /withdrawn|finished/i.test(v.record.status || ''); });
      view.innerHTML = '<div class="row" style="margin-top:18px"><a class="btn ghost sm" href="#/classes">← All classes</a></div>' +
        '<section class="hero" style="padding:16px 0 10px"><div class="eyebrow">' + esc(c.room || '') + (t ? ' · ' + esc(t.name) : '') + '</div><h1>' + esc(c.label) + '</h1><p class="lead">' + esc(c.schedule || '') + (b ? ' · ' + esc(b.title) + (b.ebook ? ' · <a href="' + esc(b.ebook) + '" target="_blank" rel="noopener">e-book ↗</a>' : '') : '') + '</p></section>' +
        '<h3 style="margin:10px 0">Students (' + act.length + ')</h3>' + (act.length ? '<div class="people">' + act.map(studentCard).join('') + '</div>' : '<div class="empty">No students in this class yet.</div>') +
        (past.length ? '<h3 style="margin:22px 0 10px">Former students</h3><div class="people">' + past.map(studentCard).join('') + '</div>' : '');
    } catch (e) { view.innerHTML = '<div class="empty" style="margin-top:30px">This class could not be loaded.</div>'; }
  }
  async function vStudent(id) {
    setNav('classes'); if (!staff()) return go('#/');
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span></p>';
    try {
      var v = await api('teach/student/' + id), s = v.record, p = v.profile;
      var h = '<div class="row" style="margin-top:18px"><a class="btn ghost sm" href="javascript:history.back()">← Back</a></div>' +
        '<section class="prof">' + avatar(s.uid, s.first + ' ' + s.last, p && p.photo) + '<div><div class="eyebrow">Student · ' + esc((s.classes || []).join(', ')) + '</div><h1>' + esc(s.first + ' ' + s.last) + '</h1>' +
        '<div class="chips">' + statusChip(s.status) + (p ? '<span class="chip2 ok">Registered</span>' : '<span class="chip2 mute">Not registered</span>') + (s.level ? '<span class="chip2">Level ' + esc(s.level) + '</span>' : '') + (p && p.goals ? '<span class="chip2">Goal: ' + esc(p.goals) + '</span>' : '') + '</div></div></section>' +
        '<section class="section cols"><div class="box"><h3>Contact</h3><dl class="kv"><dt>Phone</dt><dd>' + esc(s.phone || '–') + '</dd><dt>Parent</dt><dd>' + esc(s.parent || '–') + '</dd><dt>Parent phone</dt><dd>' + esc(s.parentPhone || '–') + '</dd><dt>Email</dt><dd>' + esc((p && p.email) || s.email || '–') + '</dd><dt>Birthday</dt><dd>' + esc(s.birth || '–') + '</dd></dl>' + (p && p.about ? '<p style="margin-top:10px" class="small">' + esc(p.about) + '</p>' : '') + '</div>' +
        '<div class="box"><h3>Test results</h3>' + testsTable(s.tests) + '</div>' + ieltsBox(v.ielts) +
        '<div class="box"><h3>Teacher comments</h3><div id="cm">' + ((s.comments || []).slice().reverse().map(function (c) { return '<div class="comment">' + esc(c.text) + '<small>' + esc(c.by) + ' · ' + when(c.at) + '</small></div>'; }).join('') || '<p class="small">No comments yet.</p>') + '</div>' +
        '<form id="cf" style="margin-top:12px"><textarea class="inp" rows="2" id="ct" placeholder="Add a comment (visible to teachers and the school)"></textarea><button class="btn sm" style="margin-top:8px">Add comment</button></form></div></section>';
      view.innerHTML = h;
      $('#cf').onsubmit = async function (ev) { ev.preventDefault(); var t = $('#ct').value.trim(); if (!t) return; await api('teach/student/' + id + '/note', { method: 'POST', body: { text: t } }); toast('Comment added'); vStudent(id); };
    } catch (e) { view.innerHTML = '<div class="empty" style="margin-top:30px">This student could not be loaded.</div>'; }
  }

  /* ---------- admin ---------- */
  async function loadAdmin() { ADMIN = await api('admin/all'); ME.books = ADMIN.books; ME.teachers = ADMIN.teachers; return ADMIN; }
  function adminTabs(on) {
    return '<div class="tabs2">' + [['students', 'Students'], ['classes', 'Classes'], ['teachers', 'Teachers'], ['books', 'Books'], ['accounts', 'Accounts'], ['import', 'Import']].map(function (t) {
      return '<a href="#/admin/' + t[0] + '" class="' + (on === t[0] ? 'on' : '') + '">' + t[1] + '</a>';
    }).join('') + '</div>';
  }
  async function vAdmin(tab) {
    setNav('admin'); if (role() !== 'admin') return go('#/');
    tab = tab || 'students';
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span> Loading school records…</p>';
    await loadAdmin();
    var head = '<section class="hero" style="padding-bottom:4px"><div class="eyebrow">Administrator</div><h1>School admin</h1><p class="lead">' + ADMIN.students.length + ' students · ' + ADMIN.classes.length + ' classes · ' + ADMIN.teachers.length + ' teachers · ' + ADMIN.accounts.length + ' accounts</p></section>' + adminTabs(tab);
    ({ students: aStudents, classes: aClasses, teachers: aTeachers, books: aBooks, accounts: aAccounts, import: aImport }[tab] || aStudents)(head);
  }
  function opts(list, val, label, empty) { return (empty ? '<option value="">' + empty + '</option>' : '') + list.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === val ? ' selected' : '') + '>' + esc(label(x)) + '</option>'; }).join(''); }
  function aStudents(head) {
    var q = '';
    function draw() {
      var list = ADMIN.students.filter(function (s) { return !q || (s.first + ' ' + s.last + ' ' + (s.phone || '') + ' ' + (s.classes || []).join(' ')).toLowerCase().indexOf(q) >= 0; })
        .sort(function (a, b) { return (a.last + a.first).localeCompare(b.last + b.first); });
      $('#tbl').innerHTML = list.length ? '<table class="t"><thead><tr><th>Name</th><th>Phone</th><th>Classes</th><th>Status</th><th>Account</th><th></th></tr></thead><tbody>' + list.map(function (s) {
        return '<tr><td><b>' + esc(s.first + ' ' + s.last) + '</b></td><td>' + esc(s.phone || '–') + '</td><td>' + esc((s.classes || []).join(', ')) + '</td><td>' + statusChip(s.status) + '</td><td>' + (s.uid ? '<span class="chip2 ok">Linked</span>' : '<span class="chip2 mute">—</span>') + '</td><td style="white-space:nowrap"><button class="linkbtn" style="color:var(--navy)" data-ed="' + s.id + '">Edit</button>' + (s.uid ? ' · <a href="#/student/' + s.id + '">Profile</a>' : '') + '</td></tr>';
      }).join('') + '</tbody></table>' : '<div class="empty">No students yet. Use <a href="#/admin/import">Import</a> to add your student list, or add one by hand.</div>';
      view.querySelectorAll('[data-ed]').forEach(function (b) { b.onclick = function () { editStudent(ADMIN.students.filter(function (s) { return s.id === b.dataset.ed; })[0]); }; });
    }
    view.innerHTML = head + '<div class="toolbar"><input class="inp" id="q" placeholder="Search name, phone or class"><button class="btn sm" id="add">Add student</button></div><div class="tscroll" id="tbl"></div>';
    $('#q').oninput = function () { q = this.value.toLowerCase().trim(); draw(); };
    $('#add').onclick = function () { editStudent({ first: '', last: '', classes: [], status: 'active', tests: [] }); };
    draw();
  }
  function editStudent(s) {
    var labels = ADMIN.classes.map(function (c) { return c.label; });
    modal('<h2>' + (s.id ? 'Edit student' : 'Add student') + '</h2><form id="es" novalidate><div class="grid2">' +
      [['first', 'First name'], ['last', 'Surname'], ['phone', 'Phone'], ['email', 'Email'], ['parent', 'Parent / guardian'], ['parentPhone', 'Parent phone'], ['birth', 'Date of birth'], ['level', 'Level']].map(function (f) {
        return '<div><label class="f">' + f[1] + '</label><input class="inp" name="' + f[0] + '" value="' + esc(s[f[0]] || '') + '"></div>';
      }).join('') +
      '<div><label class="f">Status</label><select class="inp" name="status">' + ['active', 'frozen', 'withdrawn', 'finished'].map(function (x) { return '<option' + (String(s.status || 'active').toLowerCase() === x ? ' selected' : '') + ' value="' + x + '">' + { active: 'Active', frozen: 'Paused', withdrawn: 'Left', finished: 'Finished' }[x] + '</option>'; }).join('') + '</select></div>' +
      '<div class="full"><label class="f">Classes</label><div class="chips">' + labels.map(function (l) { return '<label class="chip2 mute" style="cursor:pointer"><input type="checkbox" name="cls" value="' + esc(l) + '"' + ((s.classes || []).indexOf(l) >= 0 ? ' checked' : '') + '> ' + esc(l) + '</label>'; }).join('') + '</div></div>' +
      '<div class="full"><label class="f">Notes (staff only)</label><textarea class="inp" name="notes" rows="2">' + esc(s.notes || '') + '</textarea></div></div>' +
      '<h3 style="margin-top:18px">Test results</h3><div id="tl">' + testsEditor(s.tests || []) + '</div>' +
      '<div class="row" style="margin-top:18px"><button class="btn" type="submit">Save</button>' + (s.id ? '<button class="btn ghost" type="button" id="del">Delete student</button>' : '') + '</div></form>');
    var tests = (s.tests || []).slice();
    function wireTests() {
      $('#tl').innerHTML = testsEditor(tests);
      $('#tl').querySelectorAll('[data-rm]').forEach(function (b) { b.onclick = function () { tests.splice(+b.dataset.rm, 1); wireTests(); }; });
      $('#addT').onclick = function () { var t = { test: $('#tN').value.trim(), date: $('#tD').value, score: $('#tS').value.trim(), max: $('#tM').value.trim() }; if (!t.test) return; tests.push(t); wireTests(); };
    }
    wireTests();
    $('#es').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, item = Object.assign({}, s);
      ['first', 'last', 'phone', 'email', 'parent', 'parentPhone', 'birth', 'level', 'status', 'notes'].forEach(function (k) { item[k] = f.elements[k].value.trim(); });
      item.classes = [].slice.call(f.querySelectorAll('[name=cls]:checked')).map(function (x) { return x.value; });
      item.tests = tests;
      if (!item.first && !item.last) return toast('Enter a name.');
      await api('admin/students', { method: 'PUT', body: { item: item } }); closeModal(); toast('Saved'); vAdmin('students');
    };
    var d = $('#del'); if (d) d.onclick = async function () { if (!confirm('Delete ' + s.first + ' ' + s.last + '? Their account (if any) stays but is unlinked.')) return; await api('admin/students/' + s.id, { method: 'DELETE' }); closeModal(); vAdmin('students'); };
  }
  function testsEditor(tests) {
    return (tests.length ? '<table class="t" style="margin-top:6px"><tbody>' + tests.map(function (t, i) { return '<tr><td>' + esc(t.date || '') + '</td><td>' + esc(t.test) + '</td><td>' + esc(t.score || '') + (t.max ? '/' + esc(t.max) : '') + '</td><td><button type="button" class="linkbtn" data-rm="' + i + '">Remove</button></td></tr>'; }).join('') + '</tbody></table>' : '<p class="small">No results yet.</p>') +
      '<div class="grid2" style="margin-top:8px"><input class="inp" id="tN" placeholder="Test name (e.g. Unit 3 test)"><input class="inp" id="tD" type="date"><input class="inp" id="tS" placeholder="Score"><input class="inp" id="tM" placeholder="Out of (optional)"></div><button type="button" class="btn ghost sm" id="addT" style="margin-top:8px">Add result</button>';
  }
  function simpleList(head, key, cols, fields, title) {
    var list = ADMIN[key];
    view.innerHTML = head + '<div class="toolbar"><button class="btn sm" id="add">Add ' + title + '</button></div><div class="tscroll"><table class="t"><thead><tr>' + cols.map(function (c) { return '<th>' + c[1] + '</th>'; }).join('') + '<th></th></tr></thead><tbody>' +
      list.map(function (x) { return '<tr>' + cols.map(function (c) { return '<td>' + (c[2] ? c[2](x) : esc(x[c[0]] || '–')) + '</td>'; }).join('') + '<td><button class="linkbtn" style="color:var(--navy)" data-ed="' + x.id + '">Edit</button></td></tr>'; }).join('') + '</tbody></table></div>';
    function edit(x) {
      modal('<h2>' + (x.id ? 'Edit ' : 'Add ') + title + '</h2><form id="ef" novalidate>' + fields.map(function (f) {
        return '<label class="f">' + f[1] + '</label>' + (f[2] ? '<select class="inp" name="' + f[0] + '">' + f[2](x[f[0]]) + '</select>' : '<input class="inp" name="' + f[0] + '" value="' + esc(x[f[0]] || '') + '">');
      }).join('') + '<div class="row" style="margin-top:18px"><button class="btn" type="submit">Save</button>' + (x.id ? '<button class="btn ghost" type="button" id="del">Delete</button>' : '') + '</div></form>');
      $('#ef').onsubmit = async function (ev) { ev.preventDefault(); var it = Object.assign({}, x); fields.forEach(function (f) { it[f[0]] = ev.target.elements[f[0]].value.trim(); }); await api('admin/' + key, { method: 'PUT', body: { item: it } }); closeModal(); toast('Saved'); vAdmin(key); };
      var d = $('#del'); if (d) d.onclick = async function () { if (!confirm('Delete this ' + title + '?')) return; await api('admin/' + key + '/' + x.id, { method: 'DELETE' }); closeModal(); vAdmin(key); };
    }
    view.querySelectorAll('[data-ed]').forEach(function (b) { b.onclick = function () { edit(list.filter(function (x) { return x.id === b.dataset.ed; })[0]); }; });
    $('#add').onclick = function () { edit({}); };
  }
  function aClasses(head) {
    simpleList(head, 'classes', [['label', 'Class'], ['teacherId', 'Teacher', function (c) { var t = teacherOf(c.teacherId); return t ? esc(t.name) : '–'; }], ['bookId', 'Book', function (c) { var b = bookOf(c.bookId); return b ? esc(b.title) : '–'; }], ['schedule', 'Schedule'], ['room', 'Room'],
      ['count', 'Students', function (c) { return ADMIN.students.filter(function (s) { return (s.classes || []).indexOf(c.label) >= 0 && !/withdrawn|finished/i.test(s.status || ''); }).length; }]],
      [['label', 'Class name (as used in records)'], ['teacherId', 'Teacher', function (v) { return opts(ADMIN.teachers, v, function (t) { return t.name; }, '—'); }], ['bookId', 'Book', function (v) { return opts(ADMIN.books, v, function (b) { return b.title; }, '—'); }], ['schedule', 'Schedule (e.g. Mon 15:15–16:45 · Wed 15:15–16:45)'], ['room', 'Room']], 'class');
  }
  function aTeachers(head) {
    simpleList(head, 'teachers', [['name', 'Name'], ['role', 'Title'], ['phone', 'Phone'], ['email', 'Email'], ['uid', 'Account', function (t) { return t.uid ? '<span class="chip2 ok">Linked</span>' : '<span class="chip2 mute">—</span>'; }]],
      [['name', 'Full name'], ['role', 'Title (e.g. English teacher)'], ['phone', 'Phone (used to link their account)'], ['email', 'Email']], 'teacher');
  }
  function aBooks(head) {
    simpleList(head, 'books', [['title', 'Book'], ['publisher', 'Publisher'], ['ebook', 'E-book link', function (b) { return b.ebook ? '<a href="' + esc(b.ebook) + '" target="_blank" rel="noopener">Open ↗</a>' : '–'; }]],
      [['title', 'Title'], ['publisher', 'Publisher'], ['ebook', 'Official e-book link (https://…)']], 'book');
  }
  function aAccounts(head) {
    var A = ADMIN.accounts.slice().sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });
    view.innerHTML = head + '<p class="small" style="margin-bottom:10px">Everyone who has registered. Change a role, or link an account to a student or teacher record by hand when the phone number did not match.</p>' +
      '<div class="tscroll"><table class="t"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Linked record</th><th></th></tr></thead><tbody>' + A.map(function (a) {
        return '<tr><td><b>' + esc(a.name) + '</b></td><td>' + esc(a.email) + '</td><td><select class="inp" data-role="' + a.id + '" style="padding:6px 8px">' + ['student', 'teacher', 'admin'].map(function (r) { return '<option' + (a.role === r ? ' selected' : '') + '>' + r + '</option>'; }).join('') + '</select></td>' +
          '<td><select class="inp" data-link="' + a.id + '" data-kind="' + (a.role === 'student' ? 'studentId' : 'teacherId') + '" style="padding:6px 8px">' +
          (a.role === 'student' ? opts(ADMIN.students.slice().sort(function (x, y) { return (x.first + x.last).localeCompare(y.first + y.last); }), a.studentId, function (s) { return s.first + ' ' + s.last + (s.phone ? ' · ' + s.phone : ''); }, '— not linked —')
            : opts(ADMIN.teachers, a.teacherId, function (t) { return t.name; }, '— not linked —')) + '</select></td><td></td></tr>';
      }).join('') + '</tbody></table></div>';
    view.querySelectorAll('[data-role]').forEach(function (s) { s.onchange = async function () { await api('admin/link', { method: 'POST', body: { uid: s.dataset.role, role: s.value } }); toast('Role updated'); vAdmin('accounts'); }; });
    view.querySelectorAll('[data-link]').forEach(function (s) { s.onchange = async function () { var b = { uid: s.dataset.link }; b[s.dataset.kind] = s.value || null; await api('admin/link', { method: 'POST', body: b }); toast('Link updated'); vAdmin('accounts'); }; });
  }

  /* ---------- import (Excel / CSV) ---------- */
  var FIELDS = {
    students: [['name', 'Full name'], ['first', 'First name'], ['last', 'Surname'], ['phone', 'Phone'], ['classes', 'Class / group'], ['otherClasses', 'Other classes'], ['status', 'Status'], ['email', 'Email'], ['parent', 'Parent'], ['parentPhone', 'Parent phone'], ['birth', 'Date of birth'], ['level', 'Level'], ['notes', 'Notes']],
    tests: [['name', 'Student name'], ['first', 'First name'], ['last', 'Surname'], ['phone', 'Phone'], ['test', 'Test name'], ['date', 'Date'], ['score', 'Score'], ['max', 'Out of'], ['band', 'Band / grade'], ['note', 'Comment']]
  };
  var GUESS = { name: /^(full ?name|name|student|фио|имя и фамилия|аты-жөні)$/i, first: /^(first|first name|имя|аты)$/i, last: /^(last|surname|last name|фамилия|тегі)$/i, phone: /phone|тел|номер|whatsapp/i, classes: /^(class|classes|group|class name|group name|группа|класс|сынып)$/i, otherClasses: /other.?(groups?|class)/i, status: /status|статус/i, email: /mail|почта/i, parent: /^(parent|родител)/i, parentPhone: /parent.*(phone|тел)/i, birth: /birth|д\.?р|рожд/i, level: /level|уровень/i, notes: /note|примеч|comment/i, test: /test|exam|тест/i, date: /date|дата/i, score: /score|result|балл|mark/i, max: /out of|max|из/i, band: /band|grade|оценка/i, note: /comment|note/i };
  function loadXLSX() { return window.XLSX ? Promise.resolve() : new Promise(function (res, rej) { var s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  function aImport(head) {
    view.innerHTML = head + '<div class="box"><h3>Import from Excel or CSV</h3><p class="small" style="margin:6px 0 14px">Upload a spreadsheet with one row per student (or per test result). Existing students are updated, matched by phone number or name; nothing is deleted.</p>' +
      '<div class="row"><select class="inp" id="kind" style="max-width:260px"><option value="students">Student list</option><option value="tests">Test results</option></select><label class="btn" style="cursor:pointer">Choose file<input type="file" id="xf" accept=".xlsx,.xls,.csv" hidden></label></div><div id="map"></div></div>';
    $('#xf').onchange = async function () {
      var f = this.files[0]; if (!f) return;
      $('#map').innerHTML = '<p style="margin-top:14px"><span class="spin"></span> Reading…</p>';
      try { await loadXLSX(); } catch (e) { $('#map').innerHTML = '<div class="err">Could not load the spreadsheet reader. Check your connection.</div>'; return; }
      var wb = /\.csv$/i.test(f.name) ? XLSX.read((await f.text()).replace(/^\ufeff/, ''), { type: 'string', raw: true }) : XLSX.read(await f.arrayBuffer(), { type: 'array', cellDates: true });
      showSheet(wb, wb.SheetNames[0]);
    };
    function showSheet(wb, name) {
      var rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '', raw: false });
      var hi = rows.findIndex(function (r) { return r.filter(function (c) { return String(c).trim(); }).length >= 2; }); if (hi < 0) hi = 0;
      var headers = rows[hi].map(function (h, i) { return String(h).trim() || 'Column ' + (i + 1); }), data = rows.slice(hi + 1).filter(function (r) { return r.some(function (c) { return String(c).trim(); }); });
      var kind = $('#kind').value, fields = FIELDS[kind];
      var guess = {}, used = {}; fields.forEach(function (f) { var i = headers.findIndex(function (h, k) { return !used[k] && !/(^|[_ ])id$/i.test(h) && GUESS[f[0]] && GUESS[f[0]].test(h); }); if (i >= 0) { guess[f[0]] = i; used[i] = 1; } });
      if (guess.name != null && (guess.first === guess.name || guess.last === guess.name)) { delete guess.first; delete guess.last; }
      $('#map').innerHTML = (wb.SheetNames.length > 1 ? '<label class="f">Sheet</label><select class="inp" id="sh" style="max-width:320px">' + wb.SheetNames.map(function (n) { return '<option' + (n === name ? ' selected' : '') + '>' + esc(n) + '</option>'; }).join('') + '</select>' : '') +
        '<p class="small" style="margin-top:14px">' + data.length + ' rows found. Match your columns to the school fields:</p><div class="grid2">' + fields.map(function (f) {
          return '<div><label class="f">' + f[1] + '</label><select class="inp" data-f="' + f[0] + '"><option value="">— skip —</option>' + headers.map(function (h, i) { return '<option value="' + i + '"' + (guess[f[0]] === i ? ' selected' : '') + '>' + esc(h) + '</option>'; }).join('') + '</select></div>';
        }).join('') + '</div><div class="preview-tbl"><table class="t"><thead><tr>' + headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' + data.slice(0, 6).map(function (r) { return '<tr>' + headers.map(function (h, i) { return '<td>' + esc(r[i]) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' +
        '<div class="row" style="margin-top:14px"><button class="btn" id="go">Import ' + data.length + ' rows</button></div>';
      var sh = $('#sh'); if (sh) sh.onchange = function () { showSheet(wb, sh.value); };
      $('#go').onclick = async function () {
        var map = {}; view.querySelectorAll('[data-f]').forEach(function (s) { if (s.value !== '') map[s.dataset.f] = +s.value; });
        if (kind === 'students' && map.name == null && map.first == null && map.last == null) return toast('Choose which column has the names.');
        if (kind === 'tests' && map.test == null) return toast('Choose which column has the test name.');
        var out = data.map(function (r) { var o = {}; Object.keys(map).forEach(function (k) { o[k] = String(r[map[k]] == null ? '' : r[map[k]]).trim(); }); return o; });
        this.disabled = true; this.innerHTML = '<span class="spin"></span> Importing';
        try {
          var res = await api('admin/import', { method: 'POST', body: { kind: kind, rows: out } });
          $('#map').innerHTML = '<div class="ok-msg">' + (kind === 'tests' ? res.added + ' results added.' + (res.missing.length ? ' Not matched: ' + esc(res.missing.join(', ')) + '.' : '') : res.added + ' students added, ' + res.updated + ' updated. Total: ' + res.total + '.') + '</div>';
        } catch (e) { $('#map').innerHTML = '<div class="err">Import failed. Please try again.</div>'; }
      };
    }
  }

  /* ---------- router ---------- */
  async function route() {
    closeModal(); window.scrollTo(0, 0);
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    try {
      switch (parts[0]) {
        case '': return vProfile();
        case 'login': return USER && role() ? go('#/') : vLogin();
        case 'register': return USER && role() ? go('#/') : vRegister();
        case 'activate': return vActivate();
        case 'forgot': return vForgot();
        case 'reset': return vReset();
        case 'classes': return vClasses();
        case 'class': return vClass(parts[1]);
        case 'student': return vStudent(parts[1]);
        case 'admin': return vAdmin(parts[1]);
        default: return go('#/');
      }
    } catch (e) { console.error(e); view.innerHTML = '<div class="empty" style="margin-top:30px">Something went wrong loading this page. <a href="#/">Back</a></div>'; }
  }
  async function boot() {
    var hash = location.hash;
    if (/recovery_token=/.test(hash)) { RECOVERY = new URLSearchParams(hash.replace(/^#/, '')).get('recovery_token'); history.replaceState(null, '', location.pathname + '#/reset'); }
    else if (/(confirmation_token|access_token|invite_token|email_change_token)=/.test(hash)) {
      try { await ID.handleAuthCallback(); toast('Email confirmed'); } catch (e) { toast('That link has expired. Please sign in.'); }
      history.replaceState(null, '', location.pathname + '#/');
    }
    await loadMe();
    if (USER && !role()) { var p = lsGet('if.pending'); if (p && p.code) { try { await api('activate', { method: 'POST', body: p }); lsSet('if.pending', null); await loadMe(); } catch (e) {} } }
    if (!USER && !/^#\/(login|register|forgot|reset)/.test(location.hash)) history.replaceState(null, '', location.pathname + '#/login');
    header(); window.addEventListener('hashchange', route); route();
  }
  boot();
})();
