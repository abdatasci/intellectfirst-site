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
  function paidActive(p) { return !!(p && p.paidUntil && Date.parse(p.paidUntil) > Date.now()); }
  function freeAcct() { var p = ME.profile; return role() === 'guest' && !paidActive(p) && !(p && p.trialUntil && Date.parse(p.trialUntil) > Date.now()); }
  var TRACKS = {
    'if': ['An IF Academy student', 'I study in a class or group at IF Academy'],
    'private': ['An individual student of Abdoulie Manneh', 'I have private lessons with Abdoulie'],
    'alumni': ['IF Alumni', 'I finished my course at IF Academy'],
    'outside': ['Learning on my own', 'Free account. Full access is paid']
  };
  function whoPicker(sel) {
    return '<label class="f">I am…</label><div class="who4" role="radiogroup">' + Object.keys(TRACKS).map(function (k) {
      return '<label class="who4c"><input type="radio" name="trk" value="' + k + '"' + (k === (sel || 'if') ? ' checked' : '') + '><span><b>' + esc(TRACKS[k][0]) + '</b><small>' + esc(TRACKS[k][1]) + '</small></span></label>';
    }).join('') + '</div>';
  }
  // main goal → the apps that fit it (lock = part of full access)
  var GOALS = [
    ['General English', [['IF English vocabulary', '/a/if-english/', 1], ['IF Skill Games', '/a/skill-games/'], ['Grammar Game Centre', '/a/grammar-game-centre/'], ['Grammar in Use Quest', '/a/grammar-in-use-quest/'], ['Test Centres A1–C1', '/a/ef-b1-tests/', 1], ['AI practice', '/live/'], ['AI tests', '/tests/']]],
    ['IELTS', [['IELTS Centre (AI marking)', '/a/ielts/', 1], ['IELTS Speaking Lab', '/a/ielts-speaking/'], ['IF IELTS Studio', '/a/ielts-studio/'], ['Band 9 Lexis', '/a/band9-lexis/'], ['AI tests', '/tests/']]],
    ['Cambridge exams (KET, PET, Flyers)', [['KET Quest', '/a/ket-quest/'], ['KET Booster Arcade', '/a/ket-booster/'], ['PET Quest', '/a/pet-quest/'], ['PET Arcade', '/a/pet-arcade/'], ['PET Word Party', '/a/pet-word-party/'], ['Flyers Arcade', '/a/flyers-arcade/'], ['PET Test Centre', '/a/pet-tests/', 1], ['Young Learners tests', '/a/yl-tests/', 1]]],
    ['English for children', [['IF Kids English', '/a/kids-english/'], ['Young Learners Centre', '/a/young-learners/'], ['Flyers Arcade', '/a/flyers-arcade/'], ['Young Learners tests', '/a/yl-tests/', 1]]],
    ['Business English', [['IF English vocabulary', '/a/if-english/', 1], ['Conditionals Practice Lab', '/a/conditionals-lab/'], ['IF Skill Games', '/a/skill-games/'], ['AI tests', '/tests/'], ['AI practice', '/live/']]],
    ['Kazakh or Russian', [['Kazakh A1–B1', '/a/kazakh-a1-b1/'], ['Russian A1–B1', '/a/russian-a1-b1/']]]
  ];
  function goalOf(p) { var g = String((p && p.goals) || ''); for (var i = 0; i < GOALS.length; i++) if (g.indexOf(GOALS[i][0]) === 0) return GOALS[i]; return null; }
  function goalSelect(id, val) { return '<select class="inp" id="' + id + '"><option value="">Choose…</option>' + GOALS.map(function (g) { return '<option' + (String(val || '').indexOf(g[0]) === 0 ? ' selected' : '') + '>' + esc(g[0]) + '</option>'; }).join('') + '</select>'; }
  function goalBox(p) {
    var g = goalOf(p), lock = freeAcct();
    return '<div class="box"><h3>My goal and apps</h3><label class="f" style="margin-top:0">Main goal</label>' + goalSelect('gsel', p.goals) +
      (g ? '<div class="gapps">' + g[1].map(function (a) { return '<a class="gapp" href="' + (a[2] && lock ? '#/upgrade' : a[1]) + '">' + esc(a[0]) + (a[2] && lock ? ' <small>🔒 full access</small>' : '') + '</a>'; }).join('') + '</div>' : '<p class="small" style="margin-top:10px">Choose your goal to see the apps for it.</p>') + '</div>';
  }
  function wireGoal() { var g = $('#gsel'); if (g) g.onchange = async function () { try { var r = await api('profile', { method: 'PUT', body: { goals: g.value } }); ME.profile = r.profile; toast('Goal saved'); vProfile(); } catch (e) { toast('Could not save'); } }; }
  function track() { var r = $('input[name=trk]:checked'); return r ? r.value : 'if'; }
  function welcomeMsg(res) {
    if (res && res.access && res.access !== 'free') return 'Welcome to IF Academy';
    var t = res && res.profile && res.profile.track;
    return t && t !== 'outside' ? 'Account created. Abdoulie will confirm you soon; until then you have a free account.' : 'Welcome! Your free account is ready.';
  }
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
  async function aapi(path, opts) {
    opts = opts || {};
    var init = { method: opts.method || 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' };
    if (opts.body) init.body = JSON.stringify(opts.body);
    var res = await fetch('/api/assistant/' + path, init);
    if (res.status === 401 && !opts.retried) { try { await ID.refreshSession(); } catch (e) {} return aapi(path, Object.assign({}, opts, { retried: true })); }
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
    var rn = $('[data-nav=results]'); if (rn) rn.hidden = !staff();
    $('[data-nav=admin]').hidden = role() !== 'admin';
    if (role() === 'admin' && !window.__ifaAIload) { window.__ifaAIload = true; var sc = document.createElement('script'); sc.src = '/me/ifadmin/ai-chat.js'; document.body.appendChild(sc); }
    var ifa = $('[data-nav=ifadmin]'); if (ifa) ifa.hidden = role() !== 'admin';
    $('[data-nav=classroom]').hidden = !role();
    $('[data-nav=assistant]').hidden = !role();
    var lv = $('[data-nav=live]'); if (lv) { lv.hidden = !role(); lv.href = staff() ? '/live/host/' : '/live/'; }
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
  /* logins made by the school are the phone number (sisters/brothers: 7012345678-2) → <login>@students.intellectfirst.com */
  function loginEmail(v) {
    v = String(v || '').trim();
    if (v.indexOf('@') >= 0) return v;
    var x = v.toLowerCase().replace(/\s+/g, ''), m = x.match(/^(.*\d.*)(-[2-9])$/), head = x, tail = '';
    if (m && m[1].replace(/\D/g, '').length >= 10) { head = m[1]; tail = m[2]; }
    var d = head.replace(/\D/g, '');
    var id = /^if/.test(head) ? head.replace(/[^a-z0-9]/g, '') : (d.length >= 10 ? d.slice(-10) : d);
    return id + tail + '@students.intellectfirst.com';
  }
  function authMsg(e) {
    var m = String((e && e.message) || e || '');
    if (/invalid_grant|Invalid login|No user found/i.test(m)) return 'That login and password do not match. Check the phone number or email, and the password from the school.';
    if (/confirm/i.test(m)) return 'Please confirm your email first, then sign in.';
    if (/already registered|exists/i.test(m)) return 'An account with this email already exists. Sign in instead.';
    if (/at least|weak|short/i.test(m)) return 'Choose a password with at least 8 characters.';
    return m || 'Something went wrong. Please try again.';
  }

  /* ---------- auth ---------- */
  function vLogin() {
    setNav('');
    view.innerHTML = panel('Sign in', 'One account for your IF Academy profile, classes and the IELTS Centre.',
      '<form id="f" novalidate><label class="f">Phone number or email</label><input class="inp" id="em" type="text" inputmode="email" autocomplete="username" placeholder="701 234 56 78  or  name@mail.com"><p class="hint">Got a login from the school? Type the phone number it shows.</p><label class="f">Password</label><input class="inp" id="pw" type="password" autocomplete="current-password"><button class="btn" type="submit">Sign in</button></form>' +
      '<p class="alt"><a href="#/forgot">Forgot password?</a> · New here? <a href="#/register">Create an account</a><br>Teacher or staff? <a href="#/staff">Staff registration</a></p>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f); b.disabled = true;
      try { await ID.login(loginEmail($('#em').value), $('#pw').value); await loadMe(); header(); go(role() ? '#/' : '#/activate'); }
      catch (e) { err(f, authMsg(e)); b.disabled = false; }
    };
  }
  function vRegister(isStaff) {
    setNav('');
    view.innerHTML = panel(isStaff ? 'Staff registration' : 'Create your account', isStaff ? 'For IF Academy teachers and staff. Your classes are linked to your account automatically by your name; if not, the administrator links them for you.' : 'For IF Academy students, Abdoulie\'s individual students, IF Alumni and anyone learning English. Use the phone number you gave the school, so we can find your record.',
      '<form id="f" novalidate><div class="grid2"><div><label class="f">First name</label><input class="inp" id="fn" autocomplete="given-name"></div><div><label class="f">Surname</label><input class="inp" id="ln" autocomplete="family-name"></div></div>' +
      '<label class="f">Phone number</label><input class="inp" id="ph" type="tel" autocomplete="tel" placeholder="+7 7__ ___ __ __">' + (isStaff ? '' : '<p class="hint">Students: your own number or your parent\'s, as given to the school.</p>') +
      (isStaff ? '' : whoPicker('if') + '<div class="grid2"><div><label class="f">Your level</label><select class="inp" id="lv"><option value="">Choose…</option>' + ['Starters','Movers','Flyers','A1 Beginner','A2 Elementary / KET','B1 Intermediate / PET','B2 Upper-intermediate','C1 Advanced','IELTS','Not sure (I will take the placement test)'].map(function (l) { return '<option>' + esc(l) + '</option>'; }).join('') + '</select></div>' +
        '<div><label class="f">Main goal</label>' + goalSelect('gl') + '</div>' +
        '<div id="clw"><label class="f">Your class</label><select class="inp" id="cl"><option value="">Loading…</option></select></div></div><p class="hint" id="clh">Not in a class yet? Choose “New student”.</p>') +
      '<label class="f">Email <span style="font-weight:400;color:var(--muted)">(optional)</span></label><input class="inp" id="em" type="email" autocomplete="email"><p class="hint">No email? Leave it empty: you will sign in with your phone number.</p>' +
      '<label class="f">Password</label><input class="inp" id="pw" type="password" autocomplete="new-password"><p class="hint">At least 8 characters.</p>' +
      '<div id="ccw"><label class="f">' + (isStaff ? 'Staff code' : 'Code <span style="font-weight:400;color:var(--muted)">(optional)</span>') + '</label><input class="inp" id="cc" autocomplete="off"><p class="hint">' + (isStaff ? 'Given to you by the school director.' : 'From your teacher: it gives full access straight away. No code? Abdoulie confirms you after you register.') + '</p></div>' +
      '<button class="btn" type="submit">Create account</button></form><p class="alt">Already registered? <a href="#/login">Sign in</a>' + (isStaff ? '' : ' · Teacher? <a href="#/staff">Staff registration</a>') + '</p>');
    function syncWho() {
      if (isStaff) return; var t = track();
      $('#clw').style.display = t === 'if' ? '' : 'none'; $('#clh').style.display = t === 'if' ? '' : 'none';
      $('#ccw').style.display = t === 'outside' ? 'none' : '';
      $('#lv').closest('div').style.display = t === 'alumni' ? 'none' : '';
    }
    view.querySelectorAll('input[name=trk]').forEach(function (r) { r.onchange = syncWho; }); syncWho();
    if ($('#cl')) fetch('/api/school/classes').then(function (r) { return r.json(); }).then(function (d) {
      $('#cl').innerHTML = '<option value="">Choose…</option>' + (d.classes || []).filter(function (c) { return c.kind !== 'alumni'; }).map(function (c) { return '<option value="' + esc(c.label) + '">' + esc(c.label) + (c.schedule ? ' · ' + esc(c.schedule) : '') + '</option>'; }).join('') + '<option value="New student">New student (no class yet)</option>';
    }).catch(function () { $('#cl').innerHTML = '<option value="New student">New student (no class yet)</option>'; });
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f);
      var name = ($('#fn').value.trim() + ' ' + $('#ln').value.trim()).trim(), ph = $('#ph').value.trim(), em = $('#em').value.trim(), pw = $('#pw').value, cc = $('#cc').value.trim();
      var trk = isStaff ? '' : track();
      if (!name || !ph || (isStaff && !cc)) return err(f, isStaff ? 'Please fill in your name, phone number and staff code.' : 'Please fill in your name and phone number.');
      if (trk === 'outside') cc = '';
      var lv = $('#lv') ? $('#lv').value : '', cl = $('#cl') ? $('#cl').value : '';
      if (trk === 'alumni') cl = 'IF Alumni'; else if (trk === 'private') cl = 'Individual (Abdoulie Manneh)'; else if (trk === 'outside') cl = '';
      if (!isStaff && trk !== 'alumni' && !lv) return err(f, 'Please choose your level.');
      if (trk === 'if' && !cl) return err(f, 'Please choose your class, or “New student”.');
      if (!isStaff && !$('#gl').value) return err(f, 'Please choose your main goal.');
      if (ph.replace(/\D/g, '').length < 10) return err(f, 'Please type the full phone number, for example +7 701 234 56 78.');
      if (em && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return err(f, 'That email does not look right. Check it, or leave it empty.');
      var byPhone = !em;
      if (pw.length < 8) return err(f, 'Choose a password with at least 8 characters.');
      b.disabled = true; b.innerHTML = '<span class="spin"></span> Creating account';
      try {
        var u = null;
        if (byPhone) {   // no email: the login is the phone number (a brother or sister on the same number gets -2, -3)
          for (var k = 1; k <= 6 && !u; k++) {
            em = loginEmail(ph.replace(/\D/g, '').slice(-10) + (k > 1 ? '-' + k : ''));
            try { u = await ID.signup(em, pw, { full_name: name }); }
            catch (e4) { if (!/already|exists|registered/i.test(String(e4 && e4.message))) throw e4; }
          }
          if (!u) throw new Error('This phone number already has accounts. Sign in instead, or add an email.');
        } else u = await ID.signup(em, pw, { full_name: name });
        var actBody = { code: cc, name: name, phone: ph, level: lv, classChoice: cl, track: trk || undefined, goals: $('#gl') ? $('#gl').value : '' };
        lsSet('if.pending', actBody);
        if (u && !u.confirmedAt && u.id) {   // confirm straight away so the student can sign in now
          try { var cr = await fetch('/api/school/confirm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: u.id, email: em }) }); if (cr.ok) u.confirmedAt = new Date().toISOString(); } catch (e3) {}
        }
        if (u && u.confirmedAt) {
          await ID.login(em, pw); await loadMe(); header();
          var act = null;
          try { act = await api('activate', { method: 'POST', body: actBody }); lsSet('if.pending', null); }
          catch (e2) { toast(e2.code === 'code' ? 'Account created, but that code is not right.' : 'Account created. Please check your details.'); return go('#/activate'); }
          await loadMe(); header(); toast((byPhone ? 'Your login is your phone number: ' + em.split('@')[0] + '. ' : '') + welcomeMsg(act)); go('#/');
        } else f.innerHTML = '<div class="ok-msg">Almost done: open the confirmation link we emailed to <b>' + esc(em) + '</b>.</div>';
      } catch (e) { b.disabled = false; b.textContent = 'Create account'; err(f, authMsg(e)); }
    };
  }
  function vActivate() {
    setNav('');
    if (!USER) return go('#/login');
    var p = lsGet('if.pending') || {};
    view.innerHTML = panel('Finish your account', 'Tell us who you are. A code from your teacher gives full access straight away; without one you start with a free account.',
      '<form id="f" novalidate>' + whoPicker(p.track || (ME && ME.profile && ME.profile.track) || 'if') + '<label class="f">Full name</label><input class="inp" id="nm" value="' + esc(p.name || (ME && ME.profile && ME.profile.name) || USER.name || '') + '">' +
      '<label class="f">Phone number</label><input class="inp" id="ph" type="tel" value="' + esc(p.phone || (ME && ME.profile && ME.profile.phone) || '') + '">' +
      '<label class="f">Code <span style="font-weight:400;color:var(--muted)">(optional: class, individual-student or staff code)</span></label><input class="inp" id="cc" value="' + esc(p.code || '') + '"><button class="btn" type="submit">Continue</button></form>');
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f); b.disabled = true;
      var t = track();
      try { var act = await api('activate', { method: 'POST', body: Object.assign({}, p, { code: t === 'outside' ? '' : $('#cc').value.trim(), name: $('#nm').value.trim(), phone: $('#ph').value.trim(), track: t, classChoice: t === 'alumni' ? 'IF Alumni' : t === 'private' ? 'Individual (Abdoulie Manneh)' : (p.classChoice || '') }) }); lsSet('if.pending', null); await loadMe(); header(); toast(welcomeMsg(act)); go('#/'); }
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
      ((p.role === 'student' || p.role === 'guest') ? '<div><label class="f">Parent / guardian</label><input class="inp" name="parent" value="' + esc(p.parent) + '"></div><div><label class="f">Parent\'s phone</label><input class="inp" name="parentPhone" type="tel" value="' + esc(p.parentPhone) + '"></div>' : '') +
      '<div class="full"><label class="f">' + ((p.role === 'student' || p.role === 'guest') ? 'My goals' : 'Teaching focus') + '</label><input class="inp" name="goals" value="' + esc(p.goals) + '" placeholder="' + ((p.role === 'student' || p.role === 'guest') ? 'e.g. IELTS 7.0 by June' : 'e.g. Cambridge exams, teens') + '"></div>' +
      '<div class="full"><label class="f">About me</label><textarea class="inp" name="about" rows="3">' + esc(p.about) + '</textarea></div></div>' +
      '<button class="btn sm" type="submit" style="margin-top:14px">Save details</button></form></div>';
  }
  /* ---------- teachers: qualifications, experience, skills, interests and certificates ---------- */
  var PRO = [['education', 'Qualifications & education', 'e.g. BA in Linguistics, Kostanay University (2019)\nCELTA (2022)'], ['experience', 'Teaching experience', 'e.g. 5 years teaching teens and adults; IELTS preparation since 2021'],
    ['skillsHard', 'Hard skills', 'e.g. IELTS examining, lesson planning, Russian–English translation'], ['skillsSoft', 'Soft skills', 'e.g. patience, communication, classroom management'], ['hobbies', 'Interests & hobbies', 'e.g. chess, hiking, photography']];
  function lines(t) { return esc(t || '').replace(/\n/g, '<br>'); }
  function proView(p, mine, uid) {
    var certs = p.certs || [], any = PRO.some(function (f) { return p[f[0]]; }) || certs.length;
    var h = '<div class="box pro"><h3>Professional profile</h3>' + (any ? '<div class="prog">' + PRO.map(function (f) { return p[f[0]] ? '<div><b>' + f[1] + '</b><p>' + lines(p[f[0]]) + '</p></div>' : ''; }).join('') + '</div>' : (mine ? '<p class="small">Add your qualifications, experience, skills, interests and certificates. The director and your colleagues see them.</p>' : '<p class="small">Not filled in yet.</p>')) +
      '<h3 style="margin-top:16px">Certificates' + (certs.length ? ' <small>(' + certs.length + ')</small>' : '') + '</h3>' +
      (certs.length ? '<ul class="certs">' + certs.map(function (c) { return '<li><div><b>' + esc(c.title) + '</b><span class="small">' + esc([c.issuer, c.year].filter(Boolean).join(' · ')) + '</span></div>' + (c.file ? '<a class="linkbtn" target="_blank" rel="noopener" href="/api/school/cert/' + esc(uid || ME.user.id) + '/' + esc(c.id) + '">View ' + (/pdf/.test(c.file.type) ? 'PDF' : 'image') + '</a>' : '') + (mine ? ' <button class="linkbtn" data-cdel="' + esc(c.id) + '" style="color:var(--bad)">Remove</button>' : '') + '</li>'; }).join('') + '</ul>' : '<p class="small">' + (mine ? 'No certificates added yet.' : 'None added.') + '</p>') +
      (mine ? '<div class="row" style="gap:10px;margin-top:12px"><button class="btn sm" id="proEdit">Edit professional profile</button><button class="btn ghost sm" id="certAdd">Add a certificate</button></div>' : '') + '</div>';
    return h;
  }
  function wirePro() {
    var e = $('#proEdit'); if (!e) return;
    e.onclick = function () {
      var p = ME.profile;
      modal('<h2>Professional profile</h2><form id="pf" novalidate>' + PRO.map(function (f) { return '<label class="f">' + f[1] + '</label><textarea class="inp" name="' + f[0] + '" rows="3" placeholder="' + esc(f[2]) + '">' + esc(p[f[0]] || '') + '</textarea>'; }).join('') + '<button class="btn" type="submit" style="margin-top:14px">Save</button></form>');
      $('#pf').onsubmit = async function (ev) { ev.preventDefault(); var body = {}; new FormData(ev.target).forEach(function (v, k) { body[k] = v; }); try { await api('profile', { method: 'PUT', body: body }); await loadMe(); closeModal(); toast('Professional profile saved'); route(); } catch (x) { toast('Could not save. Try again.'); } };
    };
    $('#certAdd').onclick = function () {
      modal('<h2>Add a certificate</h2><form id="cf2" novalidate><label class="f">Certificate or training</label><input class="inp" name="title" placeholder="e.g. CELTA, TKT Module 1, IELTS Examiner training"><div class="grid2"><div><label class="f">Issued by</label><input class="inp" name="issuer" placeholder="e.g. Cambridge English"></div><div><label class="f">Year</label><input class="inp" name="year" inputmode="numeric" placeholder="2024"></div></div>' +
        '<label class="f">File (optional): PDF or photo, up to 4 MB</label><input class="inp" type="file" id="cfile" accept="application/pdf,image/jpeg,image/png,image/webp"><button class="btn" type="submit" style="margin-top:14px">Add certificate</button><p class="small" id="cmsg"></p></form>');
      $('#cf2').onsubmit = async function (ev) {
        ev.preventDefault(); var f = ev.target, body = { title: f.title.value.trim(), issuer: f.issuer.value.trim(), year: f.year.value.trim() }, file = $('#cfile').files[0];
        if (!body.title) { $('#cmsg').textContent = 'Please type the name of the certificate.'; return; }
        if (file && file.size > 4 * 1024 * 1024) { $('#cmsg').textContent = 'That file is bigger than 4 MB. Try a smaller photo or PDF.'; return; }
        $('button', f).disabled = true; $('#cmsg').innerHTML = '<span class="spin"></span> Saving…';
        try {
          if (file) { body.name = file.name; body.file = await new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = rej; r.readAsDataURL(file); }); }
          await api('cert', { method: 'POST', body: body }); await loadMe(); closeModal(); toast('Certificate added'); route();
        } catch (x) { $('button', f).disabled = false; $('#cmsg').textContent = x.status === 413 ? 'The file is too big (4 MB at most).' : 'Could not save. Try again.'; }
      };
    };
    view.querySelectorAll('[data-cdel]').forEach(function (b) { b.onclick = async function () { if (!confirm('Remove this certificate?')) return; await api('cert/' + b.dataset.cdel, { method: 'DELETE' }); await loadMe(); route(); }; });
  }
  async function vTeacher(uid) {
    setNav('admin'); if (!staff()) return go('#/');
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span></p>';
    try {
      var d = await api('teacher-profile/' + uid), p = d.profile;
      view.innerHTML = '<div class="row" style="margin-top:18px"><a class="btn ghost sm" href="javascript:history.back()">← Back</a></div><section class="prof">' + avatar(uid, p.name, p.photo) + '<div><div class="eyebrow">' + (p.role === 'admin' ? 'Director' : 'Teacher') + '</div><h1>' + esc(p.name) + '</h1>' + (p.about ? '<p class="lead" style="font-size:15.5px">' + esc(p.about) + '</p>' : '') + '</div></section><section class="section">' + proView(p, false, uid) + '</section>';
    } catch (e) { view.innerHTML = '<div class="empty" style="margin-top:30px">This profile is not available.</div>'; }
  }
  function wireDetails() {
    var f = $('#det'); if (!f) return;
    f.onsubmit = async function (ev) {
      ev.preventDefault(); var body = {}; new FormData(f).forEach(function (v, k) { body[k] = v; });
      try { var had = ME.profile.studentId; await api('profile', { method: 'PUT', body: body }); await loadMe(); toast(!had && ME.profile.studentId ? 'Saved, and we found your school record!' : 'Details saved'); route(); }
      catch (e) { toast('Could not save. Try again.'); }
    };
  }
  function vNewPassword() {
    setNav('');
    view.innerHTML = panel('Choose your own password', 'You signed in with the one-time password from IF Academy. Choose a password only you know; you will use it from now on.',
      '<form id="f" novalidate><label class="f">New password</label><input class="inp" id="p1" type="password" autocomplete="new-password"><p class="hint">At least 8 characters.</p><label class="f">Repeat it</label><input class="inp" id="p2" type="password" autocomplete="new-password"><button class="btn" type="submit">Save my password</button></form>' +
      (/@students\.intellectfirst\.com$/.test(ME.user.email) ? '<p class="alt">Your login stays your phone number: <b>' + esc(ME.user.email.split('@')[0]) + '</b></p>' : ''));
    $('#f').onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, b = $('button', f), a = $('#p1').value, c = $('#p2').value;
      if (a.length < 8) return err(f, 'Choose a password with at least 8 characters.');
      if (a !== c) return err(f, 'The two passwords are different.');
      b.disabled = true;
      try { await ID.updateUser({ password: a }); await api('password-changed', { method: 'POST' }); await loadMe(); toast('Password saved'); go('#/'); }
      catch (e) { b.disabled = false; err(f, authMsg(e)); }
    };
  }
  function trialOn(p) { return !!(p && p.trialUntil && Date.parse(p.trialUntil) > Date.now()); }
  function daysLeft(iso) { return Math.max(1, Math.ceil((Date.parse(iso) - Date.now()) / 864e5)); }
  function kzt(n) { return Math.round(n).toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₸'; }
  function plansOf(m) { var P = (m && m.plans) || {}; return [1, 3, 6].filter(function (k) { return +P[k] > 0; }).map(function (k) { return { months: k, total: +P[k], per: +P[k] / k }; }); }
  function fromPrice(m) { var L = plansOf(m); return L.length ? Math.min.apply(null, L.map(function (x) { return x.per; })) : 0; }
  function accessBand(p) {
    if (role() !== 'guest') return '';
    var rq = p.request, L = TRACKS[p.track] ? TRACKS[p.track][0] : '', fp = fromPrice(ME.membership);
    if (paidActive(p)) return '<div class="acc ok"><b>Full access until ' + when(p.paidUntil) + '</b><span>All test centres, IF English, IELTS marking, unlimited AI tests and the assistant.</span><a class="btn ghost sm" href="#/upgrade">Extend</a></div>';
    if (rq && rq.paid) return '<div class="acc wait"><b>Payment sent for checking</b><span>Your full access starts as soon as the school confirms the payment (' + rq.months + ' month' + (rq.months > 1 ? 's' : '') + ').</span></div>';
    var trial = trialOn(p) ? '<div class="acc ok"><b>Full access trial: ' + daysLeft(p.trialUntil) + ' day' + (daysLeft(p.trialUntil) > 1 ? 's' : '') + ' left</b><span>Everything is open: every test centre, IF English, IELTS marking and unlimited AI practice. Make the most of it!</span><a class="btn ghost sm" href="#/upgrade">See plans</a></div>' : '';
    if (rq) return trial + '<div class="acc wait"><b>Waiting for confirmation</b><span>Abdoulie will confirm you as: ' + esc(L.replace(/^An? /, '')) + '. Have a code from your teacher? <a href="#/activate">Enter it</a> for full access now.</span></div>';
    if (trial) return trial;
    if (p.trialUntil) return '<div class="acc"><b>Your free trial has ended</b><span>Keep full access' + (fp ? ' from <b>' + kzt(fp) + ' a month</b>' : '') + ': every test centre, IF English, IELTS marking and unlimited AI practice.</span><a class="btn sm" href="#/upgrade">Keep full access</a></div>';
    return '<div class="acc"><b>Free account</b><span>Games, quests, the placement test and a little AI practice every day. Full access opens every test centre, IF English, IELTS marking and unlimited AI practice.</span><a class="btn sm" href="#/upgrade">Get full access</a></div>';
  }
  function vUpgrade() {
    setNav('home');
    if (!USER) return go('#/login');
    if (!role()) return go('#/activate');
    var p = ME.profile, m = ME.membership || {}, r = role(), student = r !== 'guest', paid = paidActive(p), trial = trialOn(p);
    var tick = function (a) { return '<ul class="plist">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; };
    var free = ['Games and quests for every level (Flyers Arcade, KET and PET Quest, Skill Games, Grammar Game Centre…)', 'Free placement test', 'Join IF Live games with a PIN', '2 AI practice tests a day', '6 rounds of AI practice a day', 'Notifications on Telegram'];
    var full = ['Everything in the free account', 'All Test Centres: A1–C1, KET, PET, Young Learners, Teens', 'IF English: 12 vocabulary courses with audio and games', 'IELTS Centre: AI marking of Writing and Speaking', 'Unlimited AI tests and AI practice', 'AI study assistant', 'Results saved on your profile'];
    var L = plansOf(m), base = L.length ? L[0].per : 0, fp = fromPrice(m);
    var lead = student ? 'As ' + (p.track === 'private' ? 'Abdoulie\'s individual student' : 'an IF Academy student') + ', full access is included free with your lessons.' :
      paid ? 'Your access runs until ' + when(p.paidUntil) + '. You can extend it below.' :
      trial ? 'Your free trial ends in ' + daysLeft(p.trialUntil) + ' day' + (daysLeft(p.trialUntil) > 1 ? 's' : '') + '. Choose a plan to keep everything open.' :
      'IF Academy students and Abdoulie\'s individual students get full access free with their lessons. Everyone else can join online.';
    var cards = L.map(function (x, i) {
      var save = base && x.months > 1 ? Math.round((1 - x.per / base) * 100) : 0;
      return '<label class="plan' + (i === L.length - 1 ? ' best' : '') + '"><input type="radio" name="pl" value="' + x.months + '"' + (i === L.length - 1 ? ' checked' : '') + '>' +
        (i === L.length - 1 ? '<span class="tag">Best value</span>' : '') + '<b>' + x.months + ' month' + (x.months > 1 ? 's' : '') + '</b><span class="pm">' + kzt(x.per) + '<small> / month</small></span>' +
        '<span class="tot">' + (x.months > 1 ? kzt(x.total) + ' in total' + (save > 0 ? ' · save ' + save + '%' : '') : 'Pay monthly') + '</span></label>';
    }).join('');
    view.innerHTML = '<section class="hero" style="padding-bottom:4px"><div class="eyebrow">IF Academy online</div><h1>' + (student || paid ? 'You have full access' : trial ? 'Keep full access' : 'Get full access') + '</h1><p class="lead">' + lead + '</p></section>' +
      '<section class="section plans"><div class="box"><h3>Free account</h3>' + tick(free) + '</div><div class="box hl"><h3>Full access</h3>' + (student ? '<p class="price">Included with your lessons</p>' : fp ? '<p class="price">from ' + kzt(fp) + ' <small>a month</small></p>' : '') + tick(full) + '</div></section>' +
      (student ? '' :
      '<section class="section"><div class="panel wide"><h2>Choose your plan</h2>' + (m.offer ? '<p class="offer">' + esc(m.offer) + '</p>' : '') +
        '<form id="pf" class="payrow"><div class="plancards">' + cards + '</div>' +
        '<h3 style="margin:18px 0 4px">How to pay</h3><p class="sub" style="white-space:pre-line">' + esc(m.how || '') + '</p>' +
        '<label class="f">Note for the school <span style="font-weight:400;color:var(--muted)">(optional: e.g. the name on the Kaspi payment)</span></label><input class="inp" id="nt" maxlength="300">' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><button class="btn" type="submit">I have paid: switch on my access</button><a class="btn ghost" id="tgq" target="_blank" rel="noopener" href="#">Ask a question on Telegram</a></div></form>' +
        '<p class="small" style="margin-top:14px">Want lessons with a teacher? IF Academy courses include full access free. <a href="/a/placement-test/">Take the free placement test</a> and we will suggest a group.</p></div></section>' +
      '<section class="section"><div class="panel wide"><h2>Already an IF Academy or individual student?</h2><p class="sub">You do not need to pay. Enter the code from your teacher, or ask Abdoulie to confirm you.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#/activate">Enter a code</a><button class="btn ghost" id="askp">I am Abdoulie\'s individual student</button><button class="btn ghost" id="aski">I study at IF Academy</button></div></div></section>');
    var tg = $('#tgq'); if (tg) tg.href = 'https://t.me/abliem?text=' + encodeURIComponent('Hello! I would like full access to the IF Academy website. My name: ' + (p.name || '') + ', phone: ' + (p.phone || ''));
    var pf = $('#pf'); if (pf) pf.onsubmit = async function (ev) {
      ev.preventDefault(); var b = $('button', pf); b.disabled = true;
      try { await api('upgrade', { method: 'POST', body: { track: 'outside', months: +((view.querySelector('input[name=pl]:checked') || {}).value || 1), note: $('#nt').value.trim() } }); await loadMe(); toast('Thank you! Your access starts when the school confirms the payment.'); go('#/'); }
      catch (e) { b.disabled = false; err(pf, 'Could not send. Please try again.'); }
    };
    ['askp', 'aski'].forEach(function (id) { var el = $('#' + id); if (el) el.onclick = async function () {
      el.disabled = true; try { await api('upgrade', { method: 'POST', body: { track: id === 'askp' ? 'private' : 'if' } }); await loadMe(); toast('Sent. Abdoulie will confirm you soon.'); go('#/'); } catch (e) { el.disabled = false; toast('Could not send. Please try again.'); }
    }; });
  }
  async function vProfile() {
    setNav('home');
    if (!USER) return go('#/login');
    if (!role()) return go('#/activate');
    if (ME.profile && ME.profile.mustChange) return vNewPassword();
    var p = ME.profile, st = ME.student, r = role();
    var roleLbl = r === 'admin' ? (p.teacherId === 't-abdoulie' ? 'Founder &amp; Director' : 'Administrator') : r === 'teacher' ? 'Teacher' : p.alumni ? '🎓 IF Alumni' : r === 'guest' ? (paidActive(p) ? 'Full access' : trialOn(p) ? 'Full access trial' : 'Free account') : p.track === 'private' ? 'Individual student' : 'Student';
    var h = '<section class="prof"><div style="position:relative">' + avatar(ME.user.id, p.name, p.photo) + '<button class="avbtn" id="ph" style="border-radius:0 0 60px 60px">Change</button></div>' +
      '<div><div class="eyebrow">' + roleLbl + (st ? ' · ' + esc((st.classes || []).join(', ')) : '') + '</div><h1>' + esc(p.name) + '</h1><p class="lead" style="font-size:15.5px">' + (/@students\.intellectfirst\.com$/.test(ME.user.email) ? 'Login: ' + esc(ME.user.email.split('@')[0]) : esc(ME.user.email)) + (p.phone ? ' · ' + esc(p.phone) : '') + '</p>' +
      '<div class="chips">' + (st ? statusChip(st.status) : '') + (p.goals ? '<span class="chip2">Goal: ' + esc(p.goals) + '</span>' : '') + (p.since ? '<span class="chip2 mute">Member since ' + when(p.since) + '</span>' : '') + '</div></div></section>';
    h += accessBand(p);
    if (r === 'student' && !st && p.track !== 'private' && !p.alumni) h += '<div class="banner"><b>We have not found your school record yet.</b> Check that your phone number below is the one you gave IF Academy (yours or your parent\'s). If it still does not match, your teacher can link your account.</div>';
    h += '<div id="tgband"></div>';
    h += '<section class="section cols">';
    if (r === 'student' || r === 'guest') {
      h += goalBox(p);
      if (r === 'student' || st) h += classBox(ME.classes);
      h += '<div class="box"><h3>Test results</h3>' + testsTable(st && st.tests) + '</div>';
      h += attBox(ME.attendance);
      h += ieltsBox(ME.ielts, true);
      h += freeAcct() ? '<div class="box"><h3>Vocabulary</h3><p class="small" style="margin-bottom:12px">IF English: 12 vocabulary courses with flashcards, audio and games. Included in full access.</p><a class="btn sm" href="#/upgrade">See full access</a></div>'
        : '<div class="box"><h3>Vocabulary</h3><p class="small" style="margin-bottom:12px">Practise the words for your course with flashcards, audio and games.</p><a class="btn sm" href="/a/if-english/">Open IF English</a></div>';
      h += '<div class="box"><h3>Games and practice</h3><p class="small" style="margin-bottom:12px">Games, quests and AI practice for every level' + (freeAcct() ? ' (free accounts: a few AI rounds a day)' : '') + '.</p><a class="btn sm" href="/#apps">Open the apps</a> <a class="btn ghost sm" href="/live/">AI practice</a> <a class="btn ghost sm" href="/tests/">AI tests</a></div>';
      if (r === 'student') h += '<div class="box"><h3>Homework</h3><p class="small">Homework from your teacher will appear here, organised by your book and unit.</p><span class="badge soon">Coming next</span></div>';
    } else {
      var tc = ME.teaching || [];
      h += '<div class="box"><h3>' + (r === 'admin' ? 'All classes' : 'My classes') + '</h3>' + (tc.length ? tc.slice(0, 8).map(function (c) { return '<div class="cls"><div style="flex:1"><b><a href="#/class/' + c.id + '" style="text-decoration:none">' + esc(c.label) + '</a></b><p>' + esc(c.schedule || '') + (c.room ? ' · ' + esc(c.room) : '') + '</p></div></div>'; }).join('') + (tc.length > 8 ? '<a class="btn ghost sm" href="#/classes">All ' + tc.length + ' classes</a>' : '') :
        '<p class="small">No classes are linked to your account yet. The administrator can assign them.</p>') + '</div>';
      h += ieltsBox(ME.ielts, true);
      h += '<div class="box"><h3>Teaching materials</h3><p class="small" style="margin-bottom:12px">Lesson presentations for every book, with animations: present them full-screen in class.</p><a class="btn sm" href="#/classroom">Open IF Classroom</a></div>';
    }
    h += '</section>' + (staff() ? '<section class="section">' + proView(p, true) + '</section>' : '') + '<section class="section">' + detailsForm(p) + '<p class="small" style="margin-top:12px">Have a staff or administrator code? <a href="#/activate">Enter it here</a>.</p></section>';
    view.innerHTML = h;
    $('#ph').onclick = photoDialog; wireDetails(); tgBand(); wirePro(); wireGoal();
  }

  /* ---------- teacher ---------- */
  async function vClasses() {
    setNav('classes'); if (!staff()) return go('#/');
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span></p>';
    var d = await api('teach/classes');
    view.innerHTML = '<section class="hero" style="padding-bottom:10px"><div class="eyebrow">' + (role() === 'admin' ? 'All classes' : 'Teacher') + '</div><h1>My classes</h1><div class="row" style="margin-top:12px"><button class="btn sm" id="exp">Export test results (Excel)</button></div></section>' +
      (d.classes.length ? '<div class="grid">' + d.classes.map(function (c) {
        var b = bookOf(c.bookId), t = teacherOf(c.teacherId);
        return '<a class="card" href="#/class/' + c.id + '"><span class="tag">' + esc(c.room || '') + ' · ' + c.count + ' students</span><h3>' + esc(c.label) + '</h3><p>' + esc(c.schedule || '') + '</p><p>' + (t ? esc(t.name) : '') + (b ? ' · ' + esc(b.title) : '') + '</p><span class="go">Open →</span></a>';
      }).join('') + '</div>' : '<div class="empty">No classes linked to your account yet.</div>');
    $('#exp').onclick = function () { exportDialog('', d.classes); };
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
        '<section class="hero" style="padding:16px 0 10px"><div class="eyebrow">' + esc(c.room || '') + (t ? ' · ' + esc(t.name) : '') + '</div><h1>' + esc(c.label) + '</h1><p class="lead">' + esc(c.schedule || '') + (b ? ' · ' + esc(b.title) + (b.ebook ? ' · <a href="' + esc(b.ebook) + '" target="_blank" rel="noopener">e-book ↗</a>' : '') : '') + '</p><div class="row" style="margin-top:12px"><button class="btn sm" id="exp">Export this class\'s results</button></div></section>' +
        '<h3 style="margin:10px 0">Students (' + act.length + ')</h3>' + (act.length ? '<div class="people">' + act.map(studentCard).join('') + '</div>' : '<div class="empty">No students in this class yet.</div>') +
        (past.length ? '<h3 style="margin:22px 0 10px">Former students</h3><div class="people">' + past.map(studentCard).join('') + '</div>' : '');
      $('#exp').onclick = function () { exportDialog(c.id, [c]); };
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
        '<div class="box"><h3>Test results</h3>' + testsTable(s.tests) + '</div>' + attBox(v.attendance) + ieltsBox(v.ielts) +
        '<div class="box"><h3>Teacher comments</h3><div id="cm">' + ((s.comments || []).slice().reverse().map(function (c) { return '<div class="comment">' + esc(c.text) + '<small>' + esc(c.by) + ' · ' + when(c.at) + '</small></div>'; }).join('') || '<p class="small">No comments yet.</p>') + '</div>' +
        '<form id="cf" style="margin-top:12px"><textarea class="inp" rows="2" id="ct" placeholder="Add a comment (visible to teachers and the school)"></textarea><button class="btn sm" style="margin-top:8px">Add comment</button></form></div></section>';
      view.innerHTML = h;
      $('#cf').onsubmit = async function (ev) { ev.preventDefault(); var t = $('#ct').value.trim(); if (!t) return; await api('teach/student/' + id + '/note', { method: 'POST', body: { text: t } }); toast('Comment added'); vStudent(id); };
    } catch (e) { view.innerHTML = '<div class="empty" style="margin-top:30px">This student could not be loaded.</div>'; }
  }

  /* ---------- IF Classroom: online lessons (Jitsi) + lesson slides (view-only) ---------- */
  var LESSONS = null, CKEY = null, VIEWER = null;
  var BOOKS_ORDER = ['b-ef-a2', 'b-ef-b1', 'b-ef-b2', 'b-ef-c1', 'b-teens-b2', 'b-wl', 'b-ket', 'b-ielts', 'b-giu'];
  function meetUrl(c) { return 'https://meet.jit.si/' + encodeURIComponent(c.meet) + '#userInfo.displayName=%22' + encodeURIComponent((ME && ME.profile && ME.profile.name) || '') + '%22'; }
  async function lessonsIndex() { if (!LESSONS) { var r = await fetch('/lessons/index.json', { cache: 'no-cache' }); LESSONS = r.ok ? await r.json() : { decks: [] }; } return LESSONS; }
  async function contentKey() {
    if (CKEY) return CKEY;
    var d = await api('materials'); VIEWER = d.viewer;
    if (!d.key) return null;
    var raw = Uint8Array.from(atob(d.key), function (c) { return c.charCodeAt(0); });
    CKEY = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
    return CKEY;
  }
  async function vClassroom(tab) {
    setNav('classroom'); if (!role()) return go('#/');
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span></p>';
    var cl = (await api('classroom')).classes || [];
    var h = '<section class="hero" style="padding-bottom:6px"><div class="eyebrow">IF Classroom</div><h1>' + (staff() ? 'Teach online and present' : 'Your online lessons') + '</h1><p class="lead">' +
      (staff() ? 'Start a video lesson for any of your classes, and present your lesson slides from here.' : 'Join your class video lesson at lesson time. Your teacher opens the room first.') + '</p></section>';
    var online = '<h3 style="margin:' + (staff() ? '34px' : '18px') + ' 0 10px">Online lessons</h3>' + (cl.length ? (staff()
      ? '<p class="small" style="margin-bottom:10px">Opens a Jitsi video room for the class in a new tab. Share this tab from the call to present your slides.</p><div class="mrows">' + cl.map(function (c) {
          return '<div class="mrow"><div><b>' + esc(c.label) + '</b><small>' + esc(c.schedule || '') + '</small></div><a class="btn sm" target="_blank" rel="noopener" href="' + esc(meetUrl(c)) + '">Start ↗</a><button class="btn ghost sm" data-copy="' + esc('https://meet.jit.si/' + c.meet) + '">Copy link</button></div>';
        }).join('') + '</div>'
      : '<div class="grid">' + cl.map(function (c) {
          return '<div class="card"><span class="tag">' + esc(c.schedule || 'Online room') + '</span><h3>' + esc(c.label) + '</h3><p>Video lesson room for your class.</p><div class="row" style="margin-top:10px"><a class="btn sm" target="_blank" rel="noopener" href="' + esc(meetUrl(c)) + '">Join lesson ↗</a></div></div>';
        }).join('') + '</div>')
      : '<div class="empty">' + (staff() ? 'No classes are linked to your account yet.' : 'Your class is not linked yet. Ask the school to check your phone number.') + '</div>');
    if (staff()) {
      var idx = await lessonsIndex(), books = {};
      idx.decks.forEach(function (d) { (books[d.book] = books[d.book] || []).push(d); });
      var ids = Object.keys(books).sort(function (a, b) { return (BOOKS_ORDER.indexOf(a) + 99) % 99 - (BOOKS_ORDER.indexOf(b) + 99) % 99; });
      tab = tab && books[tab] ? tab : (lsGet('ifc:book') && books[lsGet('ifc:book')] ? lsGet('ifc:book') : ids[0]);
      h += '<h3 style="margin:22px 0 4px">Lesson slides</h3><p class="small">' + idx.decks.length + ' lessons · updated ' + esc(idx.updated || '') + '. Slides open here for presenting and are not downloadable.</p>' +
        '<div class="tabs2">' + ids.map(function (b) { var bk = bookOf(b); return '<a href="#/classroom/' + b + '" class="' + (b === tab ? 'on' : '') + '">' + esc(bk ? bk.title.replace(/\s*\(.*\)$/, '') : b) + ' <small>' + books[b].length + '</small></a>'; }).join('') + '</div>' +
        (tab ? '<div class="decks">' + books[tab].map(function (d) { return '<a class="deck" href="#/present/' + d.id + '"><b>' + esc(d.unit) + '</b><span>' + esc(d.title) + '</span><small>' + d.slides + ' slides</small></a>'; }).join('') + '</div>' : '<div class="empty">No lesson slides yet.</div>');
      if (tab) lsSet('ifc:book', tab);
    }
    h += online;
    view.innerHTML = h;
    view.querySelectorAll('[data-copy]').forEach(function (b) { b.onclick = function () { (navigator.clipboard ? navigator.clipboard.writeText(b.dataset.copy) : Promise.reject()).then(function () { toast('Link copied'); }, function () { prompt('Copy this link', b.dataset.copy); }); }; });
  }
  function unlockBox() {
    return '<div class="panel" style="max-width:560px;margin-top:24px"><h2>Unlock lesson slides</h2><p class="sub">Slides are stored encrypted. Enter the staff or admin code once and they open for every teacher.</p><form id="uf"><label class="f" for="uc">Staff or admin code</label><input class="inp" id="uc" autocomplete="off" required><button class="btn" style="margin-top:12px">Unlock</button></form></div>';
  }
  async function vPresent(id) {
    setNav('classroom'); if (!staff()) return go('#/');
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span></p>';
    var idx = await lessonsIndex(), d = idx.decks.filter(function (x) { return x.id === id; })[0];
    if (!d) { view.innerHTML = '<div class="empty" style="margin-top:30px">This lesson was not found. <a href="#/classroom">Back</a></div>'; return; }
    var key = await contentKey();
    if (!key) {
      view.innerHTML = '<div class="row" style="margin-top:18px"><a class="btn ghost sm" href="#/classroom">← IF Classroom</a></div>' + unlockBox();
      $('#uf').onsubmit = async function (ev) { ev.preventDefault(); try { await api('materials/unlock', { method: 'POST', body: { code: $('#uc').value } }); CKEY = null; toast('Slides unlocked'); vPresent(id); } catch (e) { err(ev.target, 'That code did not work.'); } };
      return;
    }
    var bk = bookOf(d.book), n = Math.min(Math.max(1, +(lsGet('ifc:pos:' + id) || 1)), d.slides), cache = {}, want = 0;
    view.innerHTML = '<div class="pres" id="pres"><div class="pvbar"><a class="btn ghost sm" href="#/classroom/' + d.book + '">← Lessons</a><div class="ptitle"><small>' + esc(bk ? bk.title : '') + ' · ' + esc(d.unit) + '</small><b>' + esc(d.title) + '</b></div>' +
      '<span class="spacer"></span><button class="btn ghost sm" id="pg" title="All slides (G)">Slides</button><button class="btn ghost sm" id="pf" title="Full screen (F)">Present ⛶</button></div>' +
      '<div class="pstage" id="pst"><canvas id="pc" width="' + d.w + '" height="' + d.h + '"></canvas><button class="pnav l" id="pp" aria-label="Previous">‹</button><button class="pnav r" id="pn" aria-label="Next">›</button><div class="pcount" id="pk"></div></div>' +
      '<div class="pgrid" id="pgd" hidden>' + Array.from({ length: d.slides }, function (_, i) { return '<button data-go="' + (i + 1) + '">' + (i + 1) + '</button>'; }).join('') + '</div></div>';
    var cv = $('#pc'), cx = cv.getContext('2d'), wm = VIEWER ? (VIEWER.name + ' · ' + VIEWER.email) : 'IF Academy';
    cv.oncontextmenu = function (e) { e.preventDefault(); };
    // click animations: base image per slide + one patch per click (steps.json: {slide: [[x, y], ...]})
    var steps = {}, s = 0, busy = Promise.resolve(), still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    try { var sr = await fetch('/lessons/' + id + '/steps.json?v=' + d.v); if (sr.ok) steps = await sr.json(); } catch (e) {}
    var fr = document.createElement('canvas'), fx; fr.width = d.w; fr.height = d.h; fx = fr.getContext('2d');   // the current frame, no watermark
    var old = document.createElement('canvas'), ox; old.width = d.w; old.height = d.h; ox = old.getContext('2d');
    function img(name) {
      if (cache[name]) return cache[name];
      cache[name] = (async function () {
        var r = await fetch('/lessons/' + id + '/' + name + '.bin?v=' + d.v); if (!r.ok) throw new Error('slide ' + name);
        var buf = new Uint8Array(await r.arrayBuffer());
        var plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, key, buf.slice(12));
        return createImageBitmap(new Blob([plain], { type: 'image/webp' }));
      })();
      cache[name].catch(function () { delete cache[name]; });
      return cache[name];
    }
    function slide(i) {
      Object.keys(cache).forEach(function (k) { if (Math.abs(parseInt(k, 10) - i) > 6) delete cache[k]; });
      return img(String(i));
    }
    function stepsOf(i) { return steps[i] || []; }
    function mark() { /* no name watermark: the slides already carry the IF logo */ }
    // fade the new frame in over the old one
    function present(ms) {
      return new Promise(function (done) {
        if (still || !ms) { cx.clearRect(0, 0, d.w, d.h); cx.drawImage(fr, 0, 0); mark(); return done(); }
        var t0 = performance.now();
        (function tick(t) {
          var a = Math.min(1, (t - t0) / ms); a = a * a * (3 - 2 * a);
          cx.globalAlpha = 1; cx.drawImage(old, 0, 0); cx.globalAlpha = a; cx.drawImage(fr, 0, 0); cx.globalAlpha = 1; mark();
          if (a < 1) requestAnimationFrame(tick); else done();
        })(t0);
      });
    }
    async function compose(i, upto) {
      var list = [slide(i)], st = stepsOf(i);
      for (var k = 1; k <= upto; k++) list.push(img(i + '-' + k));
      var bms = await Promise.all(list);
      fx.clearRect(0, 0, d.w, d.h); fx.drawImage(bms[0], 0, 0, d.w, d.h);
      for (k = 1; k <= upto; k++) fx.drawImage(bms[k], st[k - 1][0], st[k - 1][1]);
    }
    function queue(fn) { busy = busy.then(fn, fn); return busy; }
    function show(i, end, fade) {
      i = Math.min(Math.max(1, i), d.slides);
      return queue(async function () {
        var wantS = end ? stepsOf(i).length : 0;
        n = i; s = wantS; want = n; lsSet('ifc:pos:' + id, n);
        $('#pk').textContent = n + ' / ' + d.slides;
        ox.clearRect(0, 0, d.w, d.h); ox.drawImage(fr, 0, 0);
        try { await compose(i, wantS); if (want !== i) return; await present(fade === false ? 0 : 260); }
        catch (e) { toast('Could not load slide ' + i); }
        [n + 1, n + 2, n - 1].forEach(function (k) { if (k >= 1 && k <= d.slides) slide(k).catch(function () {}); });
        stepsOf(n).forEach(function (_, k) { img(n + '-' + (k + 1)).catch(function () {}); });
        if (n < d.slides) stepsOf(n + 1).slice(0, 3).forEach(function (_, k) { img((n + 1) + '-' + (k + 1)).catch(function () {}); });
      });
    }
    function fwd() {
      if (s >= stepsOf(n).length) { if (n < d.slides) show(n + 1); return; }
      queue(async function () {
        if (s >= stepsOf(n).length) return;
        var k = s + 1, p = stepsOf(n)[k - 1];
        try {
          var bm = await img(n + '-' + k);
          ox.clearRect(0, 0, d.w, d.h); ox.drawImage(fr, 0, 0);
          fx.drawImage(bm, p[0], p[1]); s = k;
          await present(220);
        } catch (e) { toast('Could not load the next step'); }
      });
    }
    function back() {
      if (s > 0) { var i = n, k = s - 1; queue(async function () { await compose(i, k); s = k; await present(0); }); }
      else if (n > 1) show(n - 1, true, false);
    }
    $('#pp').onclick = back; $('#pn').onclick = fwd;
    cv.onclick = function (e) { var r = cv.getBoundingClientRect(); if (e.clientX - r.left < r.width / 3) back(); else fwd(); };
    $('#pg').onclick = function () { $('#pgd').hidden = !$('#pgd').hidden; };
    $('#pgd').onclick = function (e) { var b = e.target.closest('[data-go]'); if (b) { $('#pgd').hidden = true; show(+b.dataset.go); } };
    var stage = $('#pres');
    $('#pf').onclick = function () { if (document.fullscreenElement) document.exitFullscreen(); else (stage.requestFullscreen || stage.webkitRequestFullscreen).call(stage); };
    document.onkeydown = function (e) {
      if (!document.getElementById('pc') || /input|textarea/i.test(e.target.tagName)) return;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].indexOf(e.key) >= 0) { e.preventDefault(); fwd(); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].indexOf(e.key) >= 0) { e.preventDefault(); back(); }
      else if (e.key === 'Home') show(1); else if (e.key === 'End') show(d.slides);
      else if (e.key === 'f' || e.key === 'F') $('#pf').click(); else if (e.key === 'g' || e.key === 'G') $('#pg').click();
    };
    var tx = null; cv.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    cv.addEventListener('touchend', function (e) { if (tx == null) return; var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 40) { if (dx < 0) fwd(); else back(); } tx = null; });
    show(n, false, false);
  }

  /* ---------- admin ---------- */
  async function loadAdmin() { ADMIN = await api('admin/all'); try { ADMIN.att = (await api('admin/attendance')).attendance; } catch (e) { ADMIN.att = {}; } ME.books = ADMIN.books; ME.teachers = ADMIN.teachers; return ADMIN; }
  function adminTabs(on) {
    return '<div class="tabs2">' + [['logins', 'Student logins'], ['accounts', 'Accounts' + ((ADMIN.accounts || []).filter(function (x) { return x.request; }).length ? ' (' + ADMIN.accounts.filter(function (x) { return x.request; }).length + ' waiting)' : '')], ['classes', 'Classes'], ['teachers', 'Teachers'], ['books', 'Books'], ['export', 'Export results'], ['placement', 'Placement tests'], ['bot', 'Bot & reminders']].map(function (t) {
      return '<a href="#/admin/' + t[0] + '" class="' + (on === t[0] ? 'on' : '') + '">' + t[1] + '</a>';
    }).join('') + '<a href="/me/ifadmin/" style="background:var(--navy);color:#fff;border-color:var(--navy)">IF Admin ↗</a><a href="#" onclick="window.IFAdminAI&&IFAdminAI.open();return false" style="border-color:#C9A227">✨ AI assistant</a></div>';
  }
  async function vAdmin(tab) {
    setNav('admin'); if (role() !== 'admin') return go('#/');
    if (!tab || tab === 'students' || tab === 'finance' || tab === 'import') tab = 'logins';
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span> Loading school records…</p>';
    await loadAdmin();
    var head = '<section class="hero" style="padding-bottom:4px"><div class="eyebrow">Administrator</div><h1>School admin</h1><p class="lead">' + ADMIN.students.length + ' students · ' + ADMIN.classes.length + ' classes · ' + ADMIN.teachers.length + ' teachers · ' + ADMIN.accounts.length + ' accounts</p></section>' +
      '<div class="panel wide" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:14px"><div style="flex:1;min-width:240px"><b>Students, payments, attendance and results are managed in IF Admin.</b><br><span class="sub">The website reads them from IF Admin automatically: student profiles, teacher views, the assistant and Telegram reminders. A payment marked in IF Admin stops that student\'s reminder.</span></div><a class="btn" href="/me/ifadmin/">Open IF Admin ↗</a></div>' + adminTabs(tab);
    ({ students: aStudents, classes: aClasses, teachers: aTeachers, books: aBooks, accounts: aAccounts, logins: aLogins, import: aImport, export: aExport, placement: aPlacement, finance: aFinance, bot: aBot }[tab] || aAccounts)(head);
  }

  /* ---------- student logins: the school makes the accounts, students get a login and a one-time password ---------- */
  async function aLogins(head) {
    view.innerHTML = head + '<div class="panel wide"><span class="spin"></span></div>';
    var d; try { d = await api('admin/logins'); } catch (e) { view.innerHTML = head + '<div class="panel wide">Could not load.</div>'; return; }
    var showFormer = aLogins.former, all = d.rows, formerN = all.filter(function (r) { return r.former; }).length;
    var rows = all.filter(function (r) { return showFormer ? r.former : !r.former; }), none = rows.filter(function (r) { return !r.uid; }), pending = rows.filter(function (r) { return r.pw; });
    var site = location.origin + '/me/';
    function msg(r) {
      return 'IF Academy — ' + r.name + '\nYour student account / Ваш аккаунт ученика:\n' + site + '\nLogin / Логин: ' + r.login + '\nPassword / Пароль: ' + r.pw +
        '\nThis password works once: after you sign in, choose your own. / Это временный пароль: после входа придумайте свой.';
    }
    function wa(r) { var ph = String(r.phone || '').replace(/\D/g, ''); if (ph.length === 10) ph = '7' + ph; if (ph.length === 11 && ph[0] === '8') ph = '7' + ph.slice(1); return ph.length >= 11 ? 'https://wa.me/' + ph + '?text=' + encodeURIComponent(msg(r)) : null; }
    view.innerHTML = head +
      '<div class="panel wide"><h2>Student logins</h2><p class="sub">Make an account for every student in IF Admin. The login is the student\'s phone number; the password works once, then the student chooses their own. Send each student their details by WhatsApp or Telegram, or print them.</p>' +
      '<div class="tabs2" style="margin:4px 0 14px"><a href="#" id="tcur" class="' + (showFormer ? '' : 'on') + '">Current students</a><a href="#" id="tfor" class="' + (showFormer ? 'on' : '') + '">🎓 Former students → IF Alumni (' + formerN + ')</a></div>' +
      (showFormer ? '<p class="small" style="margin-bottom:10px">Students marked as left in IF Admin. Accounts made here join <b>IF Alumni</b>: they keep the apps, tests and IELTS Centre. To move an existing account to IF Alumni, tick 🎓 in Accounts.</p>' : '') +
      '<div class="row" style="gap:10px;flex-wrap:wrap"><button class="btn" id="mkall"' + (none.length ? '' : ' disabled') + '>Create accounts for ' + none.length + ' student' + (none.length === 1 ? '' : 's') + '</button>' +
      (pending.length ? '<button class="btn ghost" id="cpall">Copy all ' + pending.length + ' messages</button><button class="btn ghost" onclick="print()">Print</button>' : '') + '<span class="small" id="prog"></span></div>' +
      '<div style="overflow-x:auto;margin-top:14px"><table class="t"><thead><tr><th>Student</th><th>Phone</th><th>Login</th><th>One-time password</th><th>Status</th><th></th></tr></thead><tbody>' +
      rows.map(function (r) {
        var st = !r.uid ? '<span class="chip2 mute">No account</span>' : r.alumni && !r.pw ? '<span class="chip2 ok">🎓 Alumni</span>' : r.pw ? '<span class="chip2 warn">Waiting for first sign-in</span>' : r.own ? '<span class="chip2 ok">Own account</span>' : '<span class="chip2 ok">Active</span>';
        var w = r.pw && wa(r);
        return '<tr><td><b>' + esc(r.name) + '</b><div class="small">' + esc((r.classes || []).join(', ')) + '</div></td><td>' + esc(r.phone || '–') + '</td><td><code>' + esc(r.login || (r.email || '–')) + '</code></td><td>' + (r.pw ? '<code style="font-size:15px">' + esc(r.pw) + '</code>' : '–') + '</td><td>' + st + '</td><td style="white-space:nowrap">' +
          (r.pw ? (w ? '<a class="linkbtn" target="_blank" rel="noopener" href="' + w + '">WhatsApp</a> · ' : '') + '<button class="linkbtn" data-cp="' + esc(r.sid) + '">Copy</button> · ' : '') +
          (!r.uid ? '<button class="linkbtn" data-mk="' + esc(r.sid) + '">Create</button>' : '<button class="linkbtn" data-rs="' + esc(r.sid) + '">New password</button>') + '</td></tr>';
      }).join('') + '</tbody></table></div></div>';
    $('#tcur').onclick = function (e) { e.preventDefault(); aLogins.former = false; aLogins(head); };
    $('#tfor').onclick = function (e) { e.preventDefault(); aLogins.former = true; aLogins(head); };
    var byId = {}; rows.forEach(function (r) { byId[r.sid] = r; });
    async function run(path, ids) {
      var p = $('#prog'), all = ids.slice(), errs = 0;
      for (var i = 0; i < all.length; i += 10) {
        p.innerHTML = '<span class="spin"></span> ' + Math.min(i + 10, all.length) + ' of ' + all.length + '…';
        try { var r = await api(path, { method: 'POST', body: { sids: all.slice(i, i + 10) } }); errs += r.errors.length; } catch (e) { errs += 10; }
      }
      toast(errs ? 'Done, but ' + errs + ' could not be made. Try again.' : 'Done'); aLogins(head);
    }
    var mk = $('#mkall'); if (mk) mk.onclick = function () { if (confirm('Create accounts for ' + none.length + ' students?')) run('admin/logins/create', none.map(function (r) { return r.sid; })); };
    view.querySelectorAll('[data-mk]').forEach(function (b) { b.onclick = function () { run('admin/logins/create', [b.dataset.mk]); }; });
    view.querySelectorAll('[data-rs]').forEach(function (b) { b.onclick = function () { if (confirm('Give ' + byId[b.dataset.rs].name + ' a new one-time password? Their current password stops working.')) run('admin/logins/reset', [b.dataset.rs]); }; });
    view.querySelectorAll('[data-cp]').forEach(function (b) { b.onclick = function () { try { navigator.clipboard.writeText(msg(byId[b.dataset.cp])); toast('Message copied'); } catch (e) {} }; });
    var cp = $('#cpall'); if (cp) cp.onclick = function () { try { navigator.clipboard.writeText(pending.map(msg).join('\n\n———\n\n')); toast('All messages copied'); } catch (e) {} };
  }

  /* ---------- tuition (student.pay = {fee, dueDay, paid:{'YYYY-MM': 'YYYY-MM-DD'}}) ---------- */
  function kzNow() { return new Date(Date.now() + 5 * 3600000); }
  function monthKeyOf(d) { return d.toISOString().slice(0, 7); }
  function monthLabel(k) { var p = k.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, 1)).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }); }
  function payState(s) {
    var p = s && s.pay; if (!p || s.noFee || (!(+p.dueDay >= 1) && !(+p.fee > 0))) return null;
    var n = kzNow(), k = monthKeyOf(n), day = n.getUTCDate(), paid = (p.paid || {})[k];
    if (!(+p.dueDay >= 1)) return { month: k, paid: paid, due: 0, fee: +p.fee || 0, state: paid ? 'paid' : 'open' };
    var due = Math.min(28, Math.max(1, +p.dueDay)), ov = (p.dueDates || {})[k]; if (ov && ov.slice(0, 7) === k) due = +ov.slice(8);
    return { month: k, paid: paid, due: due, fee: +p.fee || 0, state: paid ? 'paid' : day < due ? 'upcoming' : day === due ? 'due' : 'overdue' };
  }
  function money(n) { return n ? '₸' + Math.round(n).toLocaleString('en-US') : ''; }
  function payChip(s) {
    var st = payState(s); if (!st) return '<span class="chip2 mute">No plan</span>';
    if (st.paid) return '<span class="chip2 ok">Paid</span>';
    if (!st.due) return '<span class="chip2 mute">Not paid · no due day</span>';
    var dd = st.due + ' ' + monthLabel(st.month).split(' ')[0];
    return st.state === 'overdue' ? '<span class="chip2 bad">Overdue · ' + dd + '</span>' : st.state === 'due' ? '<span class="chip2 warn">Due today</span>' : '<span class="chip2 mute">Due ' + dd + '</span>';
  }

  function attStats(a) { a = (a || []).filter(function (x) { return x.m !== 'FZ'; }); var p = a.filter(function (x) { return x.m === 'P'; }).length; return { n: a.length, p: p, ua: a.filter(function (x) { return x.m === 'UA'; }).length, ea: a.filter(function (x) { return x.m === 'EA'; }).length, pct: a.length ? Math.round(p / a.length * 100) : null }; }
  function attChip(a) { var t = attStats(a); if (t.pct == null) return '<span class="chip2 mute">—</span>'; return '<span class="chip2 ' + (t.pct >= 85 ? 'ok' : t.pct >= 70 ? 'warn' : 'bad') + '" title="' + t.p + ' present, ' + t.ea + ' excused, ' + t.ua + ' unexcused">' + t.pct + '%</span>'; }
  function attBox(a) {
    var t = attStats(a); if (t.pct == null) return '';
    var recent = (a || []).slice(-12).reverse();
    var lbl = { P: ['Present', 'ok'], UA: ['Absent', 'bad'], EA: ['Excused', 'warn'], FZ: ['Paused', 'mute'] };
    return '<div class="box"><h3>Attendance</h3><p style="font-size:32px;font-weight:700;margin:4px 0;color:var(--navy)">' + t.pct + '%</p><p class="small">' + t.p + ' of ' + t.n + ' lessons attended · ' + t.ea + ' excused · ' + t.ua + ' missed</p><div class="chips" style="margin-top:10px">' +
      recent.map(function (x) { var l = lbl[x.m] || [x.m, 'mute']; return '<span class="chip2 ' + l[1] + '" title="' + esc(x.c) + '">' + esc(x.d.slice(8) + '.' + x.d.slice(5, 7)) + ' · ' + l[0] + '</span>'; }).join('') + '</div></div>';
  }

  function markPaid(s, done) {
    var st = payState(s) || { month: monthKeyOf(kzNow()), fee: +((s.pay || {}).fee) || 0, due: +((s.pay || {}).dueDay) || 0 };
    var today = kzNow().toISOString().slice(0, 10), n = kzNow(), months = [];
    for (var i = -3; i <= 1; i++) months.push(monthKeyOf(new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() + i, 1))));
    var p = s.pay || {}, paid = p.paid || {};
    function dueFor(m) { var dd = (p.dueDates || {})[m]; if (dd) return dd; var d = +p.dueDay || 0; return d ? m + '-' + ('0' + d).slice(-2) : ''; }
    modal('<h2>Record a payment</h2><p class="sub">' + esc(s.first + ' ' + s.last) + '</p><form id="mp" novalidate><div class="grid2">' +
      '<div><label class="f">Month the payment is for</label><select class="inp" name="month">' + months.map(function (m) { return '<option value="' + m + '"' + (m === st.month ? ' selected' : '') + '>' + monthLabel(m) + (paid[m] ? ' · paid ' + esc(paid[m]) : '') + '</option>'; }).join('') + '</select></div>' +
      '<div><label class="f">Amount (₸)</label><input class="inp" name="amt" inputmode="numeric" value="' + (((p.amounts || {})[st.month]) || st.fee || '') + '"></div>' +
      '<div><label class="f">Due date</label><input class="inp" name="due" type="date" value="' + esc(dueFor(st.month)) + '"></div>' +
      '<div><label class="f">Paid on</label><input class="inp" name="date" type="date" value="' + esc(paid[st.month] || today) + '"></div>' +
      '<div><label class="f">Paid by</label><select class="inp" name="method">' + ['Cash', 'Kaspi Transfer', 'Kaspi Invoice', 'Card', 'Bank transfer', 'Barter', 'Other'].map(function (m) { return '<option' + (((p.methods || {})[st.month]) === m ? ' selected' : '') + '>' + m + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="row" style="margin-top:18px"><button class="btn" type="submit">Save payment</button>' + (paid[st.month] ? '<button class="btn ghost" type="button" id="unpay">Mark unpaid</button>' : '') + '</div></form>');
    var f0 = $('#mp');
    f0.elements.month.onchange = function () { var m = this.value; f0.elements.due.value = dueFor(m); f0.elements.date.value = paid[m] || today; f0.elements.amt.value = ((p.amounts || {})[m]) || p.fee || ''; if ((p.methods || {})[m]) f0.elements.method.value = p.methods[m]; };
    async function store(pay, msg) {
      try { await api('admin/students', { method: 'PUT', body: { item: { id: s.id, pay: pay } } }); s.pay = pay; closeModal(); toast(msg); await done(); }
      catch (e) { toast('Could not save. Try again.'); }
    }
    f0.onsubmit = async function (ev) {
      ev.preventDefault(); var f = ev.target, m = f.elements.month.value, amt = Math.round(+String(f.elements.amt.value).replace(/[^\d]/g, '')) || 0, d = f.elements.date.value || today, due = f.elements.due.value;
      var pay = Object.assign({ fee: 0, dueDay: 0 }, s.pay); ['paid', 'methods', 'amounts', 'dueDates'].forEach(function (k) { pay[k] = Object.assign({}, pay[k]); });
      if (due) { pay.dueDates[m] = due; if (!(+pay.dueDay >= 1)) pay.dueDay = Math.min(28, +due.slice(8)); }
      // re-saving an already paid month: clear it first so the income entry is rewritten with the new amount/date
      if (pay.paid[m]) { var tmp = Object.assign({}, pay, { paid: Object.assign({}, pay.paid) }); delete tmp.paid[m]; await api('admin/students', { method: 'PUT', body: { item: { id: s.id, pay: tmp } } }); }
      pay.paid[m] = d; pay.methods[m] = f.elements.method.value; pay.amounts[m] = amt;
      $('button', f).disabled = true;
      await store(pay, 'Payment saved: ' + monthLabel(m) + ' · ' + money(amt) + ' · ' + f.elements.method.value);
    };
    var up = $('#unpay'); if (up) up.onclick = async function () {
      var m = f0.elements.month.value; if (!paid[m]) return toast('That month is not marked paid.');
      if (!confirm('Mark ' + monthLabel(m) + ' as not paid? The tuition income entry for it is removed.')) return;
      var pay = Object.assign({}, s.pay); pay.paid = Object.assign({}, pay.paid); delete pay.paid[m];
      await store(pay, monthLabel(m) + ' marked unpaid');
    };
  }

  function opts(list, val, label, empty) { return (empty ? '<option value="">' + empty + '</option>' : '') + list.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === val ? ' selected' : '') + '>' + esc(label(x)) + '</option>'; }).join(''); }
  function aStudents(head) {
    var q = '', pf = '';
    function draw() {
      var list = ADMIN.students.filter(function (s) { if (pf) { var st = payState(s); if (pf === 'none' ? st : !st || st.state !== pf) return false; } return !q || (s.first + ' ' + s.last + ' ' + (s.phone || '') + ' ' + (s.classes || []).join(' ')).toLowerCase().indexOf(q) >= 0; })
        .sort(function (a, b) { return (a.last + a.first).localeCompare(b.last + b.first); });
      $('#tbl').innerHTML = list.length ? '<table class="t"><thead><tr><th>Name</th><th>Phone</th><th>Classes</th><th>Status</th><th>Attendance</th><th>Tuition</th><th>Account</th><th></th></tr></thead><tbody>' + list.map(function (s) {
        return '<tr><td><b>' + esc(s.first + ' ' + s.last) + '</b></td><td>' + esc(s.phone || '–') + '</td><td>' + esc((s.classes || []).join(', ')) + '</td><td>' + statusChip(s.status) + '</td><td>' + attChip(ADMIN.att && ADMIN.att[s.id]) + '</td><td style="white-space:nowrap">' + payChip(s) + ' <button class="linkbtn" data-paid="' + s.id + '">' + (payState(s) && !payState(s).paid ? 'Mark paid' : 'Payment') + '</button>' + '</td><td>' + (s.uid ? '<span class="chip2 ok">Linked</span>' : '<span class="chip2 mute">—</span>') + '</td><td style="white-space:nowrap"><button class="linkbtn" style="color:var(--navy)" data-ed="' + s.id + '">Edit</button>' + (s.uid ? ' · <a href="#/student/' + s.id + '">Profile</a>' : '') + '</td></tr>';
      }).join('') + '</tbody></table>' : '<div class="empty">No students yet. Use <a href="#/admin/import">Import</a> to add your student list, or add one by hand.</div>';
      view.querySelectorAll('[data-ed]').forEach(function (b) { b.onclick = function () { editStudent(ADMIN.students.filter(function (s) { return s.id === b.dataset.ed; })[0]); }; });
      view.querySelectorAll('[data-paid]').forEach(function (b) { b.onclick = async function () {
        markPaid(ADMIN.students.filter(function (x) { return x.id === b.dataset.paid; })[0], draw);
      }; });
    }
    view.innerHTML = head + '<div class="toolbar"><input class="inp" id="q" placeholder="Search name, phone or class"><select class="inp" id="pf" style="max-width:200px"><option value="">All tuition</option><option value="overdue">Overdue</option><option value="due">Due today</option><option value="upcoming">Not yet paid</option><option value="open">Unpaid, no due day</option><option value="paid">Paid this month</option><option value="none">No plan</option></select><button class="btn sm" id="add">Add student</button></div><div class="tscroll" id="tbl"></div>';
    $('#q').oninput = function () { q = this.value.toLowerCase().trim(); draw(); };
    $('#pf').onchange = function () { pf = this.value; draw(); };
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
      payEditor(s.pay) +
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
      item.pay = readPay(f, s.pay);
      if (!item.first && !item.last) return toast('Enter a name.');
      await api('admin/students', { method: 'PUT', body: { item: item } }); closeModal(); toast('Saved'); vAdmin('students');
    };
    var d = $('#del'); if (d) d.onclick = async function () { if (!confirm('Delete ' + s.first + ' ' + s.last + '? Their account (if any) stays but is unlinked.')) return; await api('admin/students/' + s.id, { method: 'DELETE' }); closeModal(); vAdmin('students'); };
  }

  function payEditor(p) {
    p = p || {}; var n = kzNow(), months = [];
    for (var i = -3; i <= 1; i++) months.push(monthKeyOf(new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() + i, 1))));
    return '<h3 style="margin-top:18px">Tuition</h3><p class="small">Used by the assistant and for payment reminders (3 days before, on the day, and 3 days late if not marked paid).</p><div class="grid2">' +
      '<div><label class="f">Monthly fee (₸)</label><input class="inp" name="payFee" inputmode="numeric" value="' + esc(p.fee || '') + '" placeholder="e.g. 45000"></div>' +
      '<div><label class="f">Due day of month (1–28)</label><input class="inp" name="payDay" inputmode="numeric" value="' + esc(p.dueDay || '') + '" placeholder="e.g. 5 — leave empty for no reminders"></div>' +
      '<div class="full"><label class="f">Paid months</label><div class="chips">' + months.map(function (k) {
        var on = (p.paid || {})[k]; return '<label class="chip2 ' + (on ? 'ok' : 'mute') + '" style="cursor:pointer"><input type="checkbox" name="payM" value="' + k + '"' + (on ? ' checked' : '') + '> ' + monthLabel(k) + (on ? ' · ' + esc(on) : '') + '</label>';
      }).join('') + '</div></div></div>';
  }
  function readPay(f, old) {
    var fee = Math.round(+String(f.elements.payFee.value).replace(/[^\d]/g, '')) || 0, day = Math.round(+f.elements.payDay.value) || 0;
    var paid = Object.assign({}, (old && old.paid) || {}), today = kzNow().toISOString().slice(0, 10);
    [].forEach.call(f.querySelectorAll('[name=payM]'), function (c) { if (c.checked) paid[c.value] = paid[c.value] || today; else delete paid[c.value]; });
    if (!fee && !day && !Object.keys(paid).length) return null;
    return { fee: fee, dueDay: day >= 1 && day <= 28 ? day : 0, paid: paid };
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
    simpleList(head, 'teachers', [['name', 'Name'], ['role', 'Title'], ['phone', 'Phone'], ['email', 'Email'], ['uid', 'Account', function (t) { return t.uid ? '<span class="chip2 ok">Linked</span> <a href="#/teacher/' + esc(t.uid) + '" onclick="event.stopPropagation()">Profile</a>' : '<span class="chip2 mute">—</span>'; }]],
      [['name', 'Full name'], ['role', 'Title (e.g. English teacher)'], ['phone', 'Phone (used to link their account)'], ['email', 'Email']], 'teacher');
  }
  function aBooks(head) {
    simpleList(head, 'books', [['title', 'Book'], ['publisher', 'Publisher'], ['ebook', 'E-book link', function (b) { return b.ebook ? '<a href="' + esc(b.ebook) + '" target="_blank" rel="noopener">Open ↗</a>' : '–'; }]],
      [['title', 'Title'], ['publisher', 'Publisher'], ['ebook', 'Official e-book link (https://…)']], 'book');
  }
  function onlineBlock(A) {
    var G = A.filter(function (a) { return a.role === 'guest' || a.request || a.paidUntil; });
    var asked = G.filter(function (a) { return a.request; }), rest = G.filter(function (a) { return !a.request && a.role === 'guest'; });
    var trk = function (t) { return TRACKS[t] ? TRACKS[t][0] : 'Outside learner'; };
    var acts = function (a) {
      return '<div class="accts"><button class="btn sm" data-acc="approve" data-trk="if" data-u="' + a.id + '">IF student</button><button class="btn sm" data-acc="approve" data-trk="private" data-u="' + a.id + '">Individual student</button>' +
        '<span class="paybox"><select class="inp" data-mo="' + a.id + '">' + [1, 3, 6, 12].map(function (n) { return '<option value="' + n + '"' + (a.request && +a.request.months === n ? ' selected' : '') + '>' + n + ' mo</option>'; }).join('') + '</select><input class="inp" data-amt="' + a.id + '" placeholder="Plan price" title="Empty = the plan price" inputmode="numeric"><button class="btn ghost sm" data-acc="paid" data-u="' + a.id + '">Paid</button></span>' +
        (a.request ? '<button class="btn ghost sm" data-acc="decline" data-u="' + a.id + '">Decline</button>' : '') + (a.paidUntil ? '<button class="btn ghost sm" data-acc="stop" data-u="' + a.id + '">Stop access</button>' : '') + '</div>';
    };
    var row = function (a) {
      var rq = a.request, what = rq ? (rq.paid ? '💳 Says they paid · ' + rq.months + ' mo' + (rq.note ? ' · “' + esc(rq.note) + '”' : '') : 'Asks to be confirmed as: ' + esc(trk(rq.track))) : a.paidUntil && Date.parse(a.paidUntil) > Date.now() ? 'Full access until ' + when(a.paidUntil) : a.trialUntil && Date.parse(a.trialUntil) > Date.now() ? 'Trial until ' + when(a.trialUntil) : a.trialUntil ? 'Free account (trial ended)' : 'Free account';
      return '<tr><td><b>' + esc(a.name) + '</b><div class="small">' + esc([a.phone, a.level, a.goals].filter(Boolean).join(' · ')) + '</div></td><td>' + what + (rq ? '<div class="small">' + when(rq.at) + '</div>' : '') + '</td><td>' + acts(a) + '</td></tr>';
    };
    var M = ADMIN.membership || ME.membership || {};
    return '<div class="panel wide" style="margin-bottom:16px"><h2>Online access' + (asked.length ? ' <span class="chip2 warn">' + asked.length + ' waiting</span>' : '') + '</h2>' +
      '<p class="sub">IF Academy students and your individual students get full access free: approve them with one tap. Outside learners start free; mark them paid for 1–12 months (the amount goes to Finance as “Online membership”).</p>' +
      (asked.length ? '<h3 style="margin:10px 0 6px">Waiting for you</h3><div class="tscroll"><table class="t"><tbody>' + asked.map(row).join('') + '</tbody></table></div>' : '<p class="small">Nobody is waiting right now.</p>') +
      (rest.length ? '<details style="margin-top:12px"><summary><b>Free and paid online accounts (' + rest.length + ')</b></summary><div class="tscroll"><table class="t"><tbody>' + rest.map(row).join('') + '</tbody></table></div></details>' : '') +
      '<details style="margin-top:12px"><summary><b>Online plans, trial and how to pay</b> (seen only by signed-in learners)</summary><form id="msf" style="margin-top:10px"><div class="grid3">' +
        [1, 3, 6].map(function (k) { return '<div><label class="f">' + k + ' month' + (k > 1 ? 's' : '') + ' (₸ total)</label><input class="inp" data-plan="' + k + '" inputmode="numeric" value="' + esc((M.plans || {})[k] || '') + '"></div>'; }).join('') +
        '</div><label class="f">Free trial for new accounts (days, 0 = no trial)</label><input class="inp" id="mst" inputmode="numeric" value="' + esc(M.trialDays == null ? 7 : M.trialDays) + '" style="max-width:120px">' +
        '<label class="f">Offer line <span style="font-weight:400;color:var(--muted)">(optional, e.g. “First month 50% off until 31 December”)</span></label><input class="inp" id="mso" value="' + esc(M.offer || '') + '">' +
        '<label class="f">How to pay</label><textarea class="inp" id="msh" rows="3">' + esc(M.how || '') + '</textarea><button class="btn sm" style="margin-top:10px" type="submit">Save</button></form></details></div>';
  }
  function wireOnline() {
    view.querySelectorAll('[data-acc]').forEach(function (b) { b.onclick = async function () {
      var u = b.dataset.u, body = { uid: u, action: b.dataset.acc, track: b.dataset.trk };
      if (body.action === 'paid') { body.months = +$('[data-mo="' + u + '"]').value; body.amount = $('[data-amt="' + u + '"]').value; }
      b.disabled = true;
      try { await api('admin/access', { method: 'POST', body: body }); toast({ approve: 'Approved: full access', paid: 'Marked paid', decline: 'Request declined', stop: 'Access stopped' }[body.action]); vAdmin('accounts'); }
      catch (e) { b.disabled = false; toast('Could not save'); }
    }; });
    var f = $('#msf'); if (f) f.onsubmit = async function (ev) {
      ev.preventDefault(); var plans = {}; f.querySelectorAll('[data-plan]').forEach(function (i) { plans[i.dataset.plan] = i.value; });
      try { var r = await api('admin/membership', { method: 'PUT', body: { plans: plans, trialDays: +$('#mst').value || 0, offer: $('#mso').value, how: $('#msh').value } }); ME.membership = r.membership; toast('Saved'); } catch (e) { toast('Could not save'); }
    };
  }
  function aAccounts(head) {
    var A = ADMIN.accounts.slice().sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });
    view.innerHTML = head + onlineBlock(A) + '<p class="small" style="margin-bottom:10px">Everyone who has registered. Change a role, or link an account to a student or teacher record by hand when the phone number did not match.</p>' +
      '<div class="tscroll"><table class="t"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Linked record</th><th></th></tr></thead><tbody>' + A.map(function (a) {
        return '<tr><td><b>' + esc(a.name) + '</b>' + (a.level || a.classChoice ? '<div class="small">' + esc([a.level, a.classChoice].filter(Boolean).join(' · ')) + '</div>' : '') + (a.phone ? '<div class="small">' + esc(a.phone) + '</div>' : '') + (a.track === 'private' ? '<div class="small">Individual student</div>' : '') + (a.role === 'student' ? '<label class="small" style="display:flex;gap:6px;align-items:center;margin-top:4px;cursor:pointer"><input type="checkbox" data-alum="' + a.id + '"' + (a.alumni ? ' checked' : '') + '> 🎓 IF Alumni</label>' : '') + '</td><td>' + esc(/@students\.intellectfirst\.com$/.test(a.email || '') ? 'login ' + a.email.split('@')[0] : a.email) + '</td><td><select class="inp" data-role="' + a.id + '" style="padding:6px 8px">' + [['guest', 'free / online'], ['student', 'student'], ['teacher', 'teacher'], ['admin', 'admin']].map(function (r) { return '<option value="' + r[0] + '"' + (a.role === r[0] ? ' selected' : '') + '>' + r[1] + '</option>'; }).join('') + '</select></td>' +
          '<td><select class="inp" data-link="' + a.id + '" data-kind="' + ((a.role === 'student' || a.role === 'guest') ? 'studentId' : 'teacherId') + '" style="padding:6px 8px">' +
          ((a.role === 'student' || a.role === 'guest') ? opts(ADMIN.students.slice().sort(function (x, y) { return (x.first + x.last).localeCompare(y.first + y.last); }), a.studentId, function (s) { return s.first + ' ' + s.last + (s.phone ? ' · ' + s.phone : ''); }, '— not linked —')
            : opts(ADMIN.teachers, a.teacherId, function (t) { return t.name; }, '— not linked —')) + '</select></td><td></td></tr>';
      }).join('') + '</tbody></table></div>';
    wireOnline();
    view.querySelectorAll('[data-alum]').forEach(function (c) { c.onchange = async function () { await api('admin/link', { method: 'POST', body: { uid: c.dataset.alum, alumni: c.checked } }); toast(c.checked ? 'Moved to IF Alumni' : 'Removed from IF Alumni'); }; });
    view.querySelectorAll('[data-role]').forEach(function (s) { s.onchange = async function () { await api('admin/link', { method: 'POST', body: { uid: s.dataset.role, role: s.value } }); toast('Role updated'); vAdmin('accounts'); }; });
    view.querySelectorAll('[data-link]').forEach(function (s) { s.onchange = async function () { var b = { uid: s.dataset.link }; b[s.dataset.kind] = s.value || null; await api('admin/link', { method: 'POST', body: b }); toast('Link updated'); vAdmin('accounts'); }; });
  }



  /* ---------- Finance (admin) ---------- */
  var MONTHS_RX = [/^jan|^янв|^қаң/i, /^feb|^фев|^ақп/i, /^mar|^мар|^нау/i, /^apr|^апр|^сәу/i, /^may|^мая|^май|^мам/i, /^jun|^июн|^мау/i, /^jul|^июл|^шіл/i, /^aug|^авг|^там/i, /^sep|^сен|^қыр/i, /^oct|^окт|^қаз/i, /^nov|^ноя|^қар/i, /^dec|^дек|^жел/i];
  function parseMonth(v, fallbackYear) {
    v = String(v == null ? '' : v).trim(); if (!v) return '';
    var m;
    if ((m = v.match(/^(\d{4})[-./](\d{1,2})(?:[-./](\d{1,2}))?/))) return m[1] + '-' + ('0' + m[2]).slice(-2);
    if ((m = v.match(/^(\d{1,2})[./](\d{1,2})[./](\d{2,4})$/))) { var y = m[3].length === 2 ? '20' + m[3] : m[3]; return y + '-' + ('0' + m[2]).slice(-2); } // dd.mm.yyyy
    if ((m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/))) { var y2 = m[3].length === 2 ? '20' + m[3] : m[3]; return y2 + '-' + ('0' + m[1]).slice(-2); } // m/d/yy (Excel)
    if ((m = v.match(/^(\d{1,2})[./-](\d{4})$/))) return m[2] + '-' + ('0' + m[1]).slice(-2);
    for (var i = 0; i < 12; i++) if (MONTHS_RX[i].test(v.replace(/^[^A-Za-zА-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі]+/, ''))) {
      var yy = (v.match(/(\d{4})/) || [])[1] || ((v.match(/['’.\s-](\d{2})\b/) || [])[1] ? '20' + v.match(/['’.\s-](\d{2})\b/)[1] : fallbackYear);
      return yy ? yy + '-' + ('0' + (i + 1)).slice(-2) : '';
    }
    return '';
  }
  function parseDate(v) { v = String(v || '').trim(); var m;
    if ((m = v.match(/^(\d{4})-(\d{2})-(\d{2})/))) return m[0];
    if ((m = v.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/))) return m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2);
    return ''; }
  function num(v) { var s2 = String(v == null ? '' : v).replace(/\s|₸|тг|kzt/gi, ''); if (/,\d{1,2}$/.test(s2)) s2 = s2.replace(/\./g, '').replace(',', '.'); else s2 = s2.replace(/,/g, ''); var n = parseFloat(s2.replace(/[^\d.-]/g, '')); return isFinite(n) ? n : 0; }
  function kindOf(t) { t = String(t || ''); return /income|доход|приход|поступ|выручк|tuition|оплат|кіріс|revenue/i.test(t) ? 'income' : /expens|расход|затрат|трат|шығыс|cost|salary|зарплат|аренд|rent/i.test(t) ? 'expense' : ''; }
  var FIN = null;
  async function aFinance(head) {
    view.innerHTML = head + '<p><span class="spin"></span> Loading finance…</p>';
    try { FIN = (await api('admin/finance')).entries; } catch (e) { view.innerHTML = head + '<div class="empty">Could not load finance.</div>'; return; }
    var range = lsGet('if.finrange') || '12', openMonth = null;
    function months() { var ms = {}; FIN.forEach(function (e) { ms[e.month] = 1; }); return Object.keys(ms).sort(); }
    function inRange(m) { if (range === 'all') return true; var n = kzNow(), k = monthKeyOf(n); if (range === 'year') return m.slice(0, 4) === k.slice(0, 4) && m <= k; var d = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() - (+range - 1), 1)); return m >= monthKeyOf(d) && m <= k; }
    function tuitionNow() {
      var k = monthKeyOf(kzNow()), exp = 0, got = 0, owe = [];
      ADMIN.students.forEach(function (s) { var st = payState(s); if (!st || /withdrawn|finished|frozen/i.test(s.status || '')) return; exp += st.fee; if (st.paid) got += st.fee; else owe.push({ s: s, st: st }); });
      owe.sort(function (a, b) { return (a.st.due || 99) - (b.st.due || 99); });
      var noDay = ADMIN.students.filter(function (s) { var st = payState(s); return st && !st.due && !/withdrawn|finished/i.test(s.status || ''); }).length;
      return { k: k, exp: exp, got: got, owe: owe, noDay: noDay };
    }
    function draw() {
      var ms = months().filter(inRange), by = {};
      ms.forEach(function (m) { by[m] = { inc: 0, exp: 0 }; });
      var cats = { income: {}, expense: {} };
      var inv = 0; FIN.forEach(function (e) { if (!by[e.month]) return; if (e.investor) { by[e.month].inv = (by[e.month].inv || 0) + e.amount; inv += e.amount; return; } if (e.type === 'income') by[e.month].inc += e.amount; else by[e.month].exp += e.amount; cats[e.type][e.category] = (cats[e.type][e.category] || 0) + e.amount; });
      var tI = 0, tE = 0; ms.forEach(function (m) { tI += by[m].inc; tE += by[m].exp; });
      var t = tuitionNow();
      var kpi = '<div class="stats4"><div><b>' + money(tI) + '</b><span>Income</span></div><div><b>' + money(tE) + '</b><span>Expenses</span></div><div><b style="color:' + (tI - tE < 0 ? '#a3261b' : 'var(--navy)') + '">' + (tI - tE < 0 ? '−' : '') + money(Math.abs(tI - tE)) + '</b><span>Profit</span></div><div><b>' + money(t.got) + ' <small style="font-size:14px;color:var(--muted)">/ ' + money(t.exp) + '</small></b><span>Tuition collected, ' + monthLabel(t.k) + '</span></div></div>';
      var chart = ms.length ? finChart(ms, by) : '<div class="empty">No income or expenses recorded for this period yet. Import your ledger or add entries below.</div>';
      var table = ms.length ? '<div class="tscroll"><table class="t"><thead><tr><th>Month</th><th style="text-align:right">Income</th><th style="text-align:right">Expenses</th><th style="text-align:right">Profit</th>' + (inv ? '<th style="text-align:right" title="Expenses paid from the investor\'s own money, not from school income">Paid by investor</th>' : '') + '<th></th></tr></thead><tbody>' + ms.slice().reverse().map(function (m) {
        var p = by[m].inc - by[m].exp; return '<tr><td><b>' + monthLabel(m) + '</b></td><td style="text-align:right">' + money(by[m].inc) + '</td><td style="text-align:right">' + money(by[m].exp) + '</td><td style="text-align:right;color:' + (p < 0 ? '#a3261b' : 'inherit') + '">' + (p < 0 ? '−' : '') + money(Math.abs(p)) + '</td>' + (inv ? '<td style="text-align:right;color:var(--muted)">' + (by[m].inv ? money(by[m].inv) : '–') + '</td>' : '') + '<td><button class="linkbtn" data-m="' + m + '">' + (openMonth === m ? 'Hide' : 'Details') + '</button></td></tr>' +
          (openMonth === m ? '<tr><td colspan="' + (inv ? 6 : 5) + '">' + entryList(FIN.filter(function (e) { return e.month === m; })) + '</td></tr>' : '');
      }).join('') + '</tbody><tfoot><tr><th>Total</th><th style="text-align:right">' + money(tI) + '</th><th style="text-align:right">' + money(tE) + '</th><th style="text-align:right">' + (tI - tE < 0 ? '−' : '') + money(Math.abs(tI - tE)) + '</th>' + (inv ? '<th style="text-align:right">' + money(inv) + '</th>' : '') + '<th></th></tr></tfoot></table></div>' : '';
      function catBox(kind, title) { var c = cats[kind], keys = Object.keys(c).sort(function (a, b) { return c[b] - c[a]; }), tot = keys.reduce(function (n, k) { return n + c[k]; }, 0);
        return '<div class="box"><h3>' + title + '</h3>' + (keys.length ? '<div class="catl">' + keys.map(function (k) { return '<div><span>' + esc(k) + '</span><i style="width:' + Math.max(2, Math.round(c[k] / tot * 100)) + '%"></i><b>' + money(c[k]) + '</b></div>'; }).join('') + '</div>' : '<p class="small">None in this period.</p>') + '</div>'; }
      var owe = '<div class="box"><h3>Tuition still open · ' + monthLabel(t.k) + '</h3>' + (t.owe.length ? '<div class="tscroll"><table class="t"><tbody>' + t.owe.map(function (o) { return '<tr><td><b>' + esc(o.s.first + ' ' + o.s.last) + '</b><br><span class="small">' + esc((o.s.classes || []).join(', ')) + '</span></td><td>' + payChip(o.s) + '</td><td style="text-align:right">' + money(o.st.fee) + '</td><td><button class="linkbtn" data-paid="' + o.s.id + '">Mark paid</button></td></tr>'; }).join('') + '</tbody></table></div>' : '<p class="small">' + (t.exp ? 'Everyone has paid this month. 🎉' : 'No tuition plans yet. Add a monthly fee and due day under Students → Edit.') + '</p>') + '</div>';
      view.innerHTML = head +
        '<div class="toolbar"><select class="inp" id="rg" style="max-width:220px"><option value="3">Last 3 months</option><option value="6">Last 6 months</option><option value="12">Last 12 months</option><option value="year">This year</option><option value="all">All time</option></select><button class="btn sm" id="addE">Add entry</button><button class="btn ghost sm" id="impE">Import ledger</button><button class="btn ghost sm" id="expE">Download Excel</button></div>' +
        kpi + '<div class="panel wide"><h2>Income and expenses by month</h2>' + chart + table + '</div>' +
        '<section class="section cols">' + owe + catBox('income', 'Income by category') + catBox('expense', 'Expenses by category') + '</section>' +
        (t.noDay ? '<div class="banner" style="margin-top:14px"><b>' + t.noDay + ' students have a monthly fee but no due day</b>, so they get no payment reminders. Set one due day for all of them: <input class="inp" id="ddAll" inputmode="numeric" style="width:80px;display:inline-block;margin:0 6px" placeholder="e.g. 10"><button class="btn sm" id="ddGo">Apply</button> <span class="small">(you can still change individual students under Students → Edit)</span></div>' : '') +
        '<p class="small" style="margin-top:8px">Private: only administrator accounts can see this page. Marking a student paid adds a Tuition income entry for that month automatically.</p>';
      $('#rg').value = range; $('#rg').onchange = function () { range = this.value; lsSet('if.finrange', range); draw(); };
      $('#addE').onclick = function () { editEntry({ type: 'expense', month: monthKeyOf(kzNow()), date: kzNow().toISOString().slice(0, 10) }); };
      $('#impE').onclick = finImport; $('#expE').onclick = finExport;
      var dg = $('#ddGo'); if (dg) dg.onclick = async function () { var d = Math.round(+$('#ddAll').value); if (!(d >= 1 && d <= 28)) return toast('Enter a day from 1 to 28.'); dg.disabled = true; var r = await api('admin/pay-default', { method: 'POST', body: { dueDay: d } }); ADMIN.students = r.students; toast('Due day ' + d + ' set for ' + r.updated + ' students'); draw(); };
      view.querySelectorAll('[data-m]').forEach(function (b) { b.onclick = function () { openMonth = openMonth === b.dataset.m ? null : b.dataset.m; draw(); }; });
      view.querySelectorAll('[data-fe]').forEach(function (b) { b.onclick = function () { editEntry(FIN.filter(function (e) { return e.id === b.dataset.fe; })[0]); }; });
      view.querySelectorAll('[data-paid]').forEach(function (b) { b.onclick = async function () {
        markPaid(ADMIN.students.filter(function (x) { return x.id === b.dataset.paid; })[0], async function () { FIN = (await api('admin/finance')).entries; draw(); });
      }; });
    }
    function entryList(list) {
      list = list.slice().sort(function (a, b) { return (a.type > b.type ? -1 : a.type < b.type ? 1 : 0) || b.amount - a.amount; });
      return '<table class="t" style="margin:4px 0"><tbody>' + list.map(function (e) { return '<tr><td>' + (e.type === 'income' ? '<span class="chip2 ok">Income</span>' : e.investor ? '<span class="chip2 warn">Paid by investor</span>' : '<span class="chip2 mute">Expense</span>') + '</td><td>' + esc(e.category) + (e.note ? '<br><span class="small">' + esc(e.note) + '</span>' : '') + '</td><td>' + esc(e.date || '') + '</td><td style="text-align:right"><b>' + money(e.amount) + '</b></td><td>' + (e.source ? '<span class="small">auto</span>' : '<button class="linkbtn" data-fe="' + e.id + '">Edit</button>') + '</td></tr>'; }).join('') + '</tbody></table>';
    }
    function editEntry(e) {
      var catsList = {}; FIN.forEach(function (x) { catsList[x.category] = 1; });
      modal('<h2>' + (e.id ? 'Edit entry' : 'Add entry') + '</h2><form id="fe" novalidate><div class="grid2">' +
        '<div><label class="f">Type</label><select class="inp" name="type"><option value="income"' + (e.type === 'income' ? ' selected' : '') + '>Income</option><option value="expense"' + (e.type !== 'income' ? ' selected' : '') + '>Expense</option></select></div>' +
        '<div><label class="f">Amount (₸)</label><input class="inp" name="amount" inputmode="numeric" value="' + esc(e.amount || '') + '"></div>' +
        '<div><label class="f">Month</label><input class="inp" name="month" type="month" value="' + esc(e.month || '') + '"></div>' +
        '<div><label class="f">Date (optional)</label><input class="inp" name="date" type="date" value="' + esc(e.date || '') + '"></div>' +
        '<div class="full"><label class="f">Category</label><input class="inp" name="category" list="fcats" value="' + esc(e.category || '') + '" placeholder="e.g. Rent, Salaries, Marketing, Tuition"><datalist id="fcats">' + Object.keys(catsList).concat(['Tuition', 'Rent', 'Salaries', 'Utilities', 'Marketing', 'Books & materials', 'Equipment', 'Taxes', 'Internet & phone', 'Events']).filter(function (v, i, a) { return a.indexOf(v) === i; }).map(function (c) { return '<option value="' + esc(c) + '">'; }).join('') + '</datalist></div>' +
        '<div class="full"><label class="f">Note</label><input class="inp" name="note" value="' + esc(e.note || '') + '"></div></div>' +
        '<div class="row" style="margin-top:18px"><button class="btn" type="submit">Save</button>' + (e.id ? '<button class="btn ghost" type="button" id="delE">Delete</button>' : '') + '</div></form>');
      $('#fe').onsubmit = async function (ev) { ev.preventDefault(); var f = ev.target, it = { id: e.id, type: f.elements.type.value, amount: num(f.elements.amount.value), month: f.elements.month.value, date: f.elements.date.value, category: f.elements.category.value.trim(), note: f.elements.note.value.trim() };
        if (!it.amount || !it.month) return toast('Enter an amount and a month.');
        try { FIN = (await api('admin/finance', { method: 'PUT', body: { item: it } })).entries; closeModal(); toast('Saved'); draw(); } catch (x) { toast('Could not save.'); } };
      var d = $('#delE'); if (d) d.onclick = async function () { if (!confirm('Delete this entry?')) return; FIN = (await api('admin/finance/' + e.id, { method: 'DELETE' })).entries; closeModal(); draw(); };
    }
    function finImport() {
      modal('<h2>Import income and expenses</h2><p class="small">Excel or CSV. Works with a ledger (one row per payment: date, type, category, amount) or a monthly summary (one row per month with Income and Expenses columns). Re-importing the same rows does not duplicate them.</p><label class="btn" style="cursor:pointer;margin-top:10px">Choose file<input type="file" id="ff" accept=".xlsx,.xls,.csv" hidden></label><div id="fmap"></div>');
      $('#ff').onchange = async function () {
        var f = this.files[0]; if (!f) return; $('#fmap').innerHTML = '<p><span class="spin"></span> Reading…</p>';
        try { await loadXLSX(); } catch (e) { $('#fmap').innerHTML = '<div class="err">Could not load the spreadsheet reader.</div>'; return; }
        var wb = /\.csv$/i.test(f.name) ? XLSX.read((await f.text()).replace(/^﻿/, ''), { type: 'string', raw: true }) : XLSX.read(await f.arrayBuffer(), { type: 'array', cellDates: true });
        sheet(wb, wb.SheetNames.filter(function (n) { return /financ|income|expens|доход|расход|ledger|summary/i.test(n); })[0] || wb.SheetNames[0]);
      };
      function sheet(wb, name) {
        var rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '', raw: false, dateNF: 'yyyy-mm-dd' });
        var hi = rows.findIndex(function (r) { return r.filter(function (c) { return String(c).trim(); }).length >= 2; }); if (hi < 0) hi = 0;
        var H = rows[hi].map(function (h, i) { return String(h).trim() || 'Column ' + (i + 1); }), data = rows.slice(hi + 1).filter(function (r) { return r.some(function (c) { return String(c).trim(); }); });
        var F = [['month', 'Month or date', /month|date|period|месяц|дата|период|ай|күн/i], ['type', 'Type (income / expense)', /^type$|тип|вид|income.?\/.?expense|direction/i], ['category', 'Category', /categor|катег|статья|item|description|назначен|санат/i], ['amount', 'Amount', /^amount$|sum|сумма|amount|total ?₸|₸/i], ['income', 'Income column', /income|revenue|доход|выручк|приход|кіріс/i], ['expense', 'Expenses column', /expens|cost|расход|затрат|шығыс/i], ['note', 'Note', /note|comment|примеч|коммент|student|name|ученик/i]];
        var used = {}, g = {}; F.forEach(function (x) { var i = H.findIndex(function (h, k) { return !used[k] && x[2].test(h); }); if (i >= 0) { g[x[0]] = i; used[i] = 1; } });
        if (g.income != null || g.expense != null) { if (g.amount != null && (g.amount === g.income || g.amount === g.expense)) delete g.amount; }
        $('#fmap').innerHTML = (wb.SheetNames.length > 1 ? '<label class="f">Sheet</label><select class="inp" id="fsh">' + wb.SheetNames.map(function (n) { return '<option' + (n === name ? ' selected' : '') + '>' + esc(n) + '</option>'; }).join('') + '</select>' : '') +
          '<p class="small" style="margin-top:12px">' + data.length + ' rows. Match the columns (leave unused ones on “skip”):</p><div class="grid2">' + F.map(function (x) { return '<div><label class="f">' + x[1] + '</label><select class="inp" data-ff="' + x[0] + '"><option value="">— skip —</option>' + H.map(function (h, i) { return '<option value="' + i + '"' + (g[x[0]] === i ? ' selected' : '') + '>' + esc(h) + '</option>'; }).join('') + '</select></div>'; }).join('') +
          '<div><label class="f">Rows with no type are</label><select class="inp" id="fdef"><option value="expense">Expenses</option><option value="income">Income</option></select></div><div><label class="f">Year (if the month has none)</label><input class="inp" id="fyr" value="' + kzNow().getUTCFullYear() + '"></div></div>' +
          '<div class="preview-tbl"><table class="t"><thead><tr>' + H.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' + data.slice(0, 5).map(function (r) { return '<tr>' + H.map(function (h, i) { return '<td>' + esc(r[i]) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' +
          '<div id="fprev" class="small" style="margin-top:10px"></div><div class="row" style="margin-top:12px"><button class="btn" id="fgo">Import</button></div>';
        var sh = $('#fsh'); if (sh) sh.onchange = function () { sheet(wb, sh.value); };
        function build() {
          var map = {}; document.querySelectorAll('[data-ff]').forEach(function (x) { if (x.value !== '') map[x.dataset.ff] = +x.value; });
          var out = [], bad = 0, lastMonth = '', yr = $('#fyr').value.trim(), def = $('#fdef').value;
          data.forEach(function (r) {
            var cell = function (k) { return map[k] == null ? '' : r[map[k]]; };
            var mc = String(cell('month') || '').trim(), cat = String(cell('category') || '').trim(), note = String(cell('note') || '').trim();
            if (/^(итого|итог|total|всего|барлығы|жиыны|sum)(\s|:|$)/i.test(mc) || /^(итого|итог|total|всего|барлығы|жиыны)(\s|:|$)/i.test(cat)) return;
            var m = mc ? parseMonth(mc, yr) : lastMonth; if (mc && m) lastMonth = m;
            if (!m) { bad++; return; }
            var date = parseDate(mc);
            if (map.income != null && num(cell('income'))) out.push({ month: m, date: date, type: 'income', category: cat || 'Income', amount: Math.abs(num(cell('income'))), note: note });
            if (map.expense != null && num(cell('expense'))) out.push({ month: m, date: date, type: 'expense', category: cat || 'Expenses', amount: Math.abs(num(cell('expense'))), note: note });
            if (map.amount != null && num(cell('amount'))) { var a = num(cell('amount')), k = kindOf(cell('type')) || kindOf(cat) || (a < 0 ? 'expense' : def); out.push({ month: m, date: date, type: k, category: cat || (k === 'income' ? 'Income' : 'Expenses'), amount: Math.abs(a), note: note }); }
          });
          return { out: out, bad: bad };
        }
        function prev() { var b = build(), i = 0, e = 0; b.out.forEach(function (x) { if (x.type === 'income') i += x.amount; else e += x.amount; }); $('#fprev').innerHTML = b.out.length + ' entries ready: income ' + money(i) + ', expenses ' + money(e) + (b.bad ? ' · ' + b.bad + ' rows without a recognisable month will be skipped' : ''); }
        document.querySelectorAll('[data-ff],#fdef,#fyr').forEach(function (x) { x.onchange = prev; x.oninput = prev; }); prev();
        $('#fgo').onclick = async function () { var b = build(); if (!b.out.length) return toast('Nothing to import: choose the month and amount columns.'); this.disabled = true; this.innerHTML = '<span class="spin"></span> Importing';
          try { var r = await api('admin/finance/import', { method: 'POST', body: { rows: b.out } }); FIN = (await api('admin/finance')).entries; closeModal(); toast(r.added + ' entries added' + (r.skipped ? ', ' + r.skipped + ' already there or skipped' : '')); range = 'all'; lsSet('if.finrange', range); draw(); }
          catch (x) { toast('Import failed.'); this.disabled = false; this.textContent = 'Import'; } };
      }
    }
    async function finExport() {
      await loadXLSX(); var wb = XLSX.utils.book_new(), ms = months(), by = {};
      FIN.forEach(function (e) { by[e.month] = by[e.month] || { i: 0, x: 0 }; if (e.type === 'income') by[e.month].i += e.amount; else by[e.month].x += e.amount; });
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Month', 'Income (₸)', 'Expenses (₸)', 'Profit (₸)']].concat(ms.map(function (m) { return [monthLabel(m), by[m].i, by[m].x, by[m].i - by[m].x]; }))), 'Monthly summary');
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Month', 'Date', 'Type', 'Category', 'Amount (₸)', 'Note']].concat(FIN.slice().sort(function (a, b) { return a.month < b.month ? -1 : 1; }).map(function (e) { return [e.month, e.date, e.type, e.category, e.amount, e.note]; }))), 'Entries');
      XLSX.writeFile(wb, 'IF_Academy_Finance_' + kzNow().toISOString().slice(0, 10) + '.xlsx');
    }
    draw();
  }
  function finChart(ms, by) {
    var W = 760, H = 240, pl = 64, pb = 28, pt = 12, max = 1;
    ms.forEach(function (m) { max = Math.max(max, by[m].inc, by[m].exp); });
    var step = Math.pow(10, Math.floor(Math.log10(max))), top = Math.ceil(max / step) * step; if (top / step < 4) { step /= 2; }
    var n = ms.length, gw = (W - pl - 8) / n, bw = Math.max(4, Math.min(22, gw * 0.32)), y = function (v) { return pt + (H - pt - pb) * (1 - v / top); };
    var g = '';
    for (var v = 0; v <= top + 1; v += step) g += '<line x1="' + pl + '" x2="' + W + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="#e7e1d6"/><text x="' + (pl - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end" font-size="11" fill="#7a7f87">' + (v >= 1e6 ? (v / 1e6).toFixed(v % 1e6 ? 1 : 0) + 'M' : v >= 1e3 ? Math.round(v / 1e3) + 'k' : v) + '</text>';
    var line = [];
    ms.forEach(function (m, i) { var cx = pl + gw * i + gw / 2, d = by[m];
      g += '<rect x="' + (cx - bw - 1) + '" y="' + y(d.inc) + '" width="' + bw + '" height="' + (H - pb - y(d.inc)) + '" rx="3" fill="#0F2342"><title>' + monthLabel(m) + ' income ' + money(d.inc) + '</title></rect>';
      g += '<rect x="' + (cx + 1) + '" y="' + y(d.exp) + '" width="' + bw + '" height="' + (H - pb - y(d.exp)) + '" rx="3" fill="#B8895A"><title>' + monthLabel(m) + ' expenses ' + money(d.exp) + '</title></rect>';
      if (n <= 14 || i % Math.ceil(n / 12) === 0) g += '<text x="' + cx + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="#7a7f87">' + monthLabel(m).replace(' 20', ' ’') + '</text>';
    });
    return '<div class="finchart"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Income and expenses by month">' + g + '</svg><div class="ch-legend"><span><i style="background:#0F2342"></i>Income</span><span><i style="background:#B8895A"></i>Expenses</span></div></div>';
  }
  async function waPanel() {
    var box = $('#wap'); if (!box) return;
    var w; try { w = await aapi('whatsapp'); } catch (e) { box.innerHTML = '<h2>WhatsApp reminders</h2><p class="sub">Could not load.</p>'; return; }
    var head = '<h2>WhatsApp reminders</h2><p class="sub">The same lesson and payment reminders, sent on WhatsApp to each student\'s phone number in IF Admin (and the parent\'s number when there is one). ' + w.withPhone + ' of ' + w.active + ' current students have a phone number.</p>';
    if (!w.ready) {
      box.innerHTML = head + '<ol class="small" style="line-height:1.9"><li>Sign up at <a href="https://green-api.com" target="_blank" rel="noopener">green-api.com</a> and create an instance (the <b>Business</b> plan for sending to students).</li>' +
        '<li>In the instance, press <b>Scan QR code</b> and scan it with the school\'s WhatsApp (WhatsApp → Linked devices). Use the school number, e.g. ' + esc('+7 707 381 0988') + '.</li>' +
        '<li>Copy <b>idInstance</b>, <b>apiTokenInstance</b> and <b>apiUrl</b> from the instance page, and send them to Claude (or add them in Netlify → Environment variables as <code>WA_INSTANCE</code>, <code>WA_TOKEN</code>, <code>WA_API_URL</code>), then redeploy.</li></ol>';
      return;
    }
    var ok = w.state === 'authorized';
    box.innerHTML = head + '<p>' + (ok ? '<span class="chip2 ok">Connected</span>' : '<span class="chip2 bad">' + esc(w.state === 'notAuthorized' ? 'WhatsApp not linked: scan the QR code in Green API' : 'Status: ' + w.state) + '</span>') + '</p>' +
      '<div class="row" style="gap:10px;flex-wrap:wrap;margin-top:10px"><input class="inp" id="wtp" placeholder="Phone for a test, e.g. +7 701 234 56 78" style="max-width:280px"><button class="btn ghost" id="wtb">Send a test message</button></div>';
    $('#wtb').onclick = async function () { this.disabled = true; try { await aapi('whatsapp/test', { method: 'POST', body: { phone: $('#wtp').value.trim() } }); toast('Test message sent'); } catch (e) { toast('Could not send: ' + (e.code || e.message)); } this.disabled = false; };
  }
  async function aBot(head) {
    view.innerHTML = head + '<p><span class="spin"></span> Checking the bot…</p>';
    var st; try { st = await aapi('bot/status'); } catch (e) { view.innerHTML = head + '<div class="empty">Could not load the bot status.</div>'; return; }
    var steps = !st.token
      ? '<div class="panel wide"><h2>1. Create the Telegram bot</h2><ol class="small" style="line-height:1.8"><li>In Telegram, open <b>@BotFather</b> and send <code>/newbot</code>.</li><li>Name it, e.g. <b>IF Academy Assistant</b>, and choose a username ending in <b>bot</b> (e.g. <b>IFAcademyKostanayBot</b>).</li><li>BotFather replies with a <b>token</b>. In Netlify, open <b>Project configuration → Environment variables → Add a variable</b>: key <code>TELEGRAM_BOT_TOKEN</code>, value = the token. Then redeploy (Deploys → Trigger deploy).</li><li>Come back here and press <b>Connect bot</b>.</li></ol><p class="small">Keep the token private: anyone with it can control the bot.</p></div>'
      : '';
    var hookOk = st.webhook && st.webhook.url && /telegram-background/.test(st.webhook.url);
    view.innerHTML = head + steps +
      '<div class="panel wide"><h2>Telegram bot</h2><p class="sub">' + (st.bot ? 'Bot <b>@' + esc(st.bot.username) + '</b> · ' : '') + (st.token ? 'Token set' : 'No token yet') + ' · Webhook ' + (hookOk ? '<span class="chip2 ok">connected</span>' : '<span class="chip2 warn">not connected</span>') + (st.webhook && st.webhook.lastError ? ' · last error: ' + esc(st.webhook.lastError) : '') + '</p>' +
      '<div class="row"><button class="btn" id="setup"' + (st.token ? '' : ' disabled') + '>' + (hookOk ? 'Reconnect bot' : 'Connect bot') + '</button><button class="btn ghost" id="tst">Send me a test message</button><a class="btn ghost" href="#/assistant">Link my Telegram</a></div></div>' +
      '<div class="stats4"><div><b>' + st.linked + '</b><span>chats connected</span></div><div><b>' + st.accounts + '</b><span>student accounts</span></div><div><b>' + st.withPay + '</b><span>students with a tuition plan</span></div><div><b>' + st.sentThisMonth + '</b><span>reminders sent this month</span></div></div>' +
      '<div class="panel wide" id="wap"><h2>WhatsApp reminders</h2><p class="sub"><span class="spin"></span></p></div>' +
      '<div class="panel wide"><h2>Coming up (next 48 hours)</h2><p class="sub">What the reminder job will send. Lessons: the evening before (19:00) and 2 hours before. Tuition: 3 days before, on the due day, and 3 days late if not marked paid. Set fees and due days in <a href="#/admin/students">Students → Edit</a>.</p><div id="pv"><span class="spin"></span></div></div>';
    $('#setup').onclick = async function () { this.disabled = true; try { var r = await aapi('bot/setup', { method: 'POST' }); toast('Bot @' + r.bot.username + ' connected'); aBot(head); } catch (e) { toast('Could not connect: ' + (e.message || e)); this.disabled = false; } };
    $('#tst').onclick = async function () { try { await aapi('bot/test', { method: 'POST' }); toast('Sent — check Telegram'); } catch (e) { toast(e.code === 'not_linked' ? 'Link your own Telegram first (Assistant page).' : 'Could not send: ' + e.message); } };
    try {
      waPanel();
      var pv = await aapi('bot/preview');
      $('#pv').innerHTML = pv.reminders.length ? '<div class="tscroll"><table class="t"><thead><tr><th>When</th><th>Student</th><th>Message</th></tr></thead><tbody>' + pv.reminders.map(function (r) {
        var d = new Date(new Date(r.at).getTime() + 5 * 3600000);
        return '<tr><td style="white-space:nowrap">' + d.toISOString().slice(5, 10).split('-').reverse().join('.') + ' ' + d.toISOString().slice(11, 16) + '</td><td>' + esc(r.student) + '</td><td>' + esc(r.text) + '</td></tr>';
      }).join('') + '</tbody></table></div><p class="small">Only students whose website account is linked to their school record receive reminders. They get them on Telegram once they connect the bot, and always in their account on the website.</p>' : '<div class="empty">Nothing due in the next 48 hours. Reminders go to students whose account is linked to their record; lesson reminders need a time in the class schedule.</div>';
    } catch (e) { $('#pv').textContent = 'Could not load the preview.'; }
  }
  async function aPlacement(head) {
    view.innerHTML = head + '<p><span class="spin"></span></p>';
    var L = (await api('admin/placements')).placements || [], LV = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    var lab = function (x) { if (x == null) return '–'; var f = Math.floor(x); return LV[f] + (x - f >= .5 && f < 6 ? '+' : ''); };
    var sk = ['grammar', 'vocabulary', 'reading', 'listening', 'writing', 'speaking'];
    view.innerHTML = head + '<div class="toolbar"><a class="btn sm" href="/a/placement-test/" target="_blank" rel="noopener">Open the placement test ↗</a><button class="btn ghost sm" id="px"' + (L.length ? '' : ' disabled') + '>Download Excel</button><span class="small">' + L.length + ' results · newest first. Results from students whose phone matches a school record are also added to their test results.</span></div>' +
      (L.length ? '<div class="tscroll"><table class="t"><thead><tr><th>Date</th><th>Name</th><th>Phone</th><th>Age</th><th>Level</th>' + sk.map(function (k) { return '<th>' + k[0].toUpperCase() + k.slice(1, 5) + '</th>'; }).join('') + '<th>Course</th><th>Record</th></tr></thead><tbody>' +
        L.map(function (r) { return '<tr><td>' + when(r.at) + '</td><td><b>' + esc(r.name) + '</b>' + (r.email ? '<br><small>' + esc(r.email) + '</small>' : '') + '</td><td>' + esc(r.phone || '') + '</td><td>' + esc({ child: '6–12', teen: '13–17', adult: '18+' }[r.age] || '') + '</td><td><b>' + lab(r.overall) + '</b></td>' +
          sk.map(function (k) { return '<td>' + lab((r.skills || {})[k]) + '</td>'; }).join('') + '<td>' + esc(r.course || '') + '</td><td>' + (r.studentId ? '<a href="#/student/' + esc(r.studentId) + '">Linked</a>' : '–') + '</td></tr>'; }).join('') + '</tbody></table></div>'
        : '<div class="empty">No placement tests yet. Share <b>intellectfirst.com/a/placement-test/</b> with new students.</div>');
    var b = $('#px'); if (b) b.onclick = async function () {
      await loadXLSX();
      var rows = [['Date', 'Name', 'Phone', 'Email', 'Age group', 'Overall'].concat(sk.map(function (k) { return k[0].toUpperCase() + k.slice(1); })).concat(['Recommended course', 'Minutes', 'Linked to record'])];
      L.forEach(function (r) { rows.push([String(r.at || '').slice(0, 10), r.name, r.phone, r.email, r.age, lab(r.overall)].concat(sk.map(function (k) { return lab((r.skills || {})[k]); })).concat([r.course, r.minutes, r.studentId ? 'Yes' : 'No'])); });
      var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(rows); ws['!cols'] = rows[0].map(function () { return { wch: 16 }; });
      XLSX.utils.book_append_sheet(wb, ws, 'Placement tests'); XLSX.writeFile(wb, 'IF-Academy-placement-tests-' + new Date().toISOString().slice(0, 10) + '.xlsx');
    };
  }
  /* ---------- export (Excel) ---------- */
  function exportForm(classId, classes) {
    return '<div class="grid2"><div class="full"><label class="f">Class</label><select class="inp" id="xc">' +
      (classes.length > 1 ? '<option value="">' + (role() === 'admin' ? 'Whole school (all classes)' : 'All my classes') + '</option>' : '') +
      classes.map(function (c) { return '<option value="' + esc(c.id) + '"' + (c.id === classId ? ' selected' : '') + '>' + esc(c.label) + '</option>'; }).join('') + '</select></div>' +
      '<div class="full" style="margin-top:10px"><label style="display:flex;gap:8px;align-items:center;font-weight:600"><input type="checkbox" id="xr" checked> Registered students only</label>' +
      '<label style="display:flex;gap:8px;align-items:center;font-weight:600;margin-top:6px"><input type="checkbox" id="xl"> Include students who left or finished</label></div></div>' +
      '<p class="small" style="margin-top:10px">The Excel file has three sheets: <b>Students</b> (one row each, with latest scores), <b>Test results</b> (every school test on record) and <b>IELTS</b> (every AI-scored Writing and Speaking attempt with criterion bands).</p>' +
      '<div class="row" style="margin-top:14px"><button class="btn" id="xgo">Download Excel</button></div><div id="xmsg"></div>';
  }
  function wireExport() {
    $('#xgo').onclick = async function () {
      var b = this, box = $('#xmsg'); b.disabled = true; b.innerHTML = '<span class="spin"></span> Preparing…'; box.innerHTML = '';
      try {
        var cid = $('#xc').value, d = await api('export' + (cid ? '?class=' + encodeURIComponent(cid) : ''));
        await loadXLSX();
        var n = buildWorkbook(d, $('#xr').checked, $('#xl').checked);
        box.innerHTML = n ? '<div class="ok-msg">Downloaded: ' + n + ' student' + (n === 1 ? '' : 's') + '.</div>' : '<div class="err">No students match. Untick "Registered students only" to export everyone on the class list.</div>';
      } catch (e) { box.innerHTML = '<div class="err">Export failed: ' + esc(e.message || e) + '</div>'; }
      b.disabled = false; b.textContent = 'Download Excel';
    };
  }
  function exportDialog(classId, classes) {
    modal('<h2>Export test results</h2><p class="sub">Download an Excel file of your students\' results.</p>' + exportForm(classId, classes));
    wireExport();
  }
  function aExport(head) {
    view.innerHTML = head + '<div class="panel" style="max-width:640px"><h2>Export test results</h2><p class="sub">Choose the whole school or one class. Registered students are those who created an account and were matched to their school record.</p>' + exportForm('', ADMIN.classes) + '</div>';
    wireExport();
  }
  function buildWorkbook(d, regOnly, withPast) {
    var rows = d.rows.filter(function (r) { return (!regOnly || r.registered) && (withPast || !/withdrawn|finished|left/i.test(r.status || '')); })
      .sort(function (a, b) { return ((a.classes[0] || '~') + a.last + a.first).localeCompare((b.classes[0] || '~') + b.last + b.first); });
    if (!rows.length) return 0;
    var day = function (iso) { if (!iso) return ''; var t = new Date(iso); return isNaN(t) ? String(iso) : t.toISOString().slice(0, 10); };
    var num = function (v) { if (v == null || v === '') return ''; var n = Number(String(v).replace(',', '.')); return isNaN(n) ? v : n; };
    var stat = function (r, skill) { var l = r.ielts.filter(function (a) { return a.skill === skill && typeof a.band === 'number'; }); return l.length ? [l.length, l[l.length - 1].band, Math.max.apply(null, l.map(function (a) { return a.band; }))] : ['', '', '']; };
    var who = function (r) { return [r.first, r.last, r.classes.join(', ')]; };
    var S1 = [['First name', 'Surname', 'Classes', 'Status', 'Level', 'Phone', 'Registered', 'Account email', 'Registered on', 'Last active', 'School tests', 'Latest test', 'Latest test date', 'Latest score', 'IELTS Writing attempts', 'Writing latest band', 'Writing best band', 'IELTS Speaking attempts', 'Speaking latest band', 'Speaking best band']];
    var S2 = [['First name', 'Surname', 'Classes', 'Test', 'Date', 'Score', 'Out of', 'Percent', 'Band / grade', 'Comment']];
    var keys = ['TA', 'TR', 'CC', 'FC', 'LR', 'GRA', 'P'], S3 = [['First name', 'Surname', 'Classes', 'Date', 'Skill', 'Type', 'Task', 'Overall band', 'Task Achievement', 'Task Response', 'Coherence & Cohesion', 'Fluency & Coherence', 'Lexical Resource', 'Grammar (GRA)', 'Pronunciation', 'Words']];
    rows.forEach(function (r) {
      var t = r.tests.slice().sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); }), last = t[t.length - 1], w = stat(r, 'writing'), sp = stat(r, 'speaking');
      S1.push(who(r).concat([r.status || '', r.level, r.phone, r.registered ? 'Yes' : 'No', r.email, day(r.since), day(r.lastActive), t.length || '', last ? last.test : '', last ? last.date : '', last ? (last.score || '') + (last.max ? '/' + last.max : '') + (last.band ? ' (' + last.band + ')' : '') : '']).concat(w, sp));
      t.forEach(function (x) { var sc = num(x.score), mx = num(x.max); S2.push(who(r).concat([x.test, x.date || '', sc, mx, typeof sc === 'number' && typeof mx === 'number' && mx ? Math.round(sc / mx * 100) / 100 : '', x.band || '', x.note || ''])); });
      r.ielts.forEach(function (a) { var c = a.criteria || {}; S3.push(who(r).concat([day(a.at), a.skill === 'speaking' ? 'Speaking' : 'Writing', a.mock ? 'Mock test' : 'Practice', a.title || a.task || '', typeof a.band === 'number' ? a.band : 'not scored']).concat(keys.map(function (k) { return c[k] == null ? '' : c[k]; })).concat([a.words == null ? '' : a.words])); });
    });
    var wb = XLSX.utils.book_new();
    [['Students', S1], ['Test results', S2], ['IELTS', S3]].forEach(function (p) {
      var data = p[1].length > 1 ? p[1] : p[1].concat([['No results yet']]);
      var ws = XLSX.utils.aoa_to_sheet(data);
      ws['!cols'] = data[0].map(function (h, i) { var m = String(h).length; data.forEach(function (row) { m = Math.max(m, String(row[i] == null ? '' : row[i]).length); }); return { wch: Math.min(Math.max(m + 2, 8), 42) }; });
      ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: data.length - 1, c: data[0].length - 1 } }) };
      if (p[0] === 'Test results') for (var i = 1; i < data.length; i++) { var cell = ws[XLSX.utils.encode_cell({ r: i, c: 7 })]; if (cell && typeof cell.v === 'number') cell.z = '0%'; }
      XLSX.utils.book_append_sheet(wb, ws, p[0]);
    });
    var slug = String(d.scope || 'results').replace(/[^\wА-Яа-яЁё-]+/g, '-').replace(/^-|-$/g, '');
    XLSX.writeFile(wb, 'IF-Academy-results-' + slug + '-' + new Date().toISOString().slice(0, 10) + '.xlsx');
    return rows.length;
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
      if (wb.SheetNames.indexOf('Students') >= 0 && (wb.SheetNames.indexOf('Payments') >= 0 || wb.SheetNames.indexOf('Expenses') >= 0)) return fullExport(wb);
      showSheet(wb, wb.SheetNames[0]);
    };
    function fullExport(wb) {
      function sheet(n) { var ws = wb.Sheets[n]; if (!ws) return []; return XLSX.utils.sheet_to_json(ws, { defval: '', raw: true }).map(function (r) { var o = {}; Object.keys(r).forEach(function (k) { var v = r[k]; o[k] = v instanceof Date ? v.toISOString().slice(0, 10) : v; }); return o; }); }
      var D = { students: sheet('Students'), payments: sheet('Payments'), expenses: sheet('Expenses'), tests: sheet('Test Results'), attendance: sheet('Attendance') };
      var sum = function (a, k) { return a.reduce(function (n, r) { return n + (+r[k] || 0); }, 0); };
      $('#map').innerHTML = '<div class="box" style="margin-top:14px"><h3>IF Admin export detected</h3><p class="small">Everything below is imported in one go. Existing records are updated, nothing is duplicated if you import again, and nothing is deleted.</p><ul class="nlist" style="margin:12px 0">' +
        '<li><b>' + D.students.length + ' students</b><span>groups, level, phone, status and notes</span></li>' +
        '<li><b>' + D.payments.length + ' payment rows</b><span>' + money(sum(D.payments, 'paid')) + ' collected · each student\'s monthly fee and paid months</span></li>' +
        '<li><b>' + D.expenses.length + ' expenses</b><span>' + money(sum(D.expenses, 'amount')) + ' · into Finance, by category</span></li>' +
        '<li><b>' + D.tests.length + ' test results</b><span>with skill breakdown</span></li>' +
        '<li><b>' + D.attendance.length + ' attendance marks</b><span>present, excused, unexcused, frozen</span></li></ul>' +
        '<p class="small">Not imported: Staff (salary details stay in your spreadsheet), Groups (the website keeps its current timetable) and Cash Flow (Finance calculates it).</p>' +
        '<div class="row" style="margin-top:12px"><button class="btn" id="goAll">Import everything</button></div></div>';
      $('#goAll').onclick = async function () {
        this.disabled = true; this.innerHTML = '<span class="spin"></span> Importing…';
        try {
          var r = await api('admin/import-all', { method: 'POST', body: D });
          $('#map').innerHTML = '<div class="ok-msg">Done. Students: ' + r.students.added + ' added, ' + r.students.updated + ' updated (' + r.total + ' in total). Tuition plans: ' + r.plans + '. Finance: ' + r.income + ' payments and ' + r.expenses + ' expenses added. Test results: ' + r.tests + '. Attendance marks: ' + r.marks + '.</div><p class="small" style="margin-top:10px"><a href="#/admin/finance">Open Finance</a> · <a href="#/admin/students">Open Students</a></p>';
        } catch (e) { this.disabled = false; this.textContent = 'Import everything'; toast('Import failed. Please try again.'); }
      };
    }
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


  /* ---------- IF Assistant ---------- */
  var CHAT = lsGet('if.chat') || [];
  async function vAssistant() {
    setNav('assistant'); if (!USER) return go('#/login');
    var first = ((ME && ME.profile && ME.profile.name) || '').split(' ')[0];
    view.innerHTML = '<section class="hero" style="padding-bottom:6px"><div class="eyebrow">IF Assistant</div><h1>Hi' + (first ? ', ' + esc(first) : '') + '!</h1><p class="lead">Ask about your classes, timetable, results or tuition — or practise English. Reminders for lessons and payments appear here and on Telegram.</p></section>' +
      '<div class="asst"><div class="asst-chat"><div class="msgs" id="msgs" aria-live="polite"></div><form id="cf" class="cform"><textarea class="inp" id="ci" rows="1" maxlength="1500" placeholder="Type a message… (English, Русский, Қазақша)"></textarea><button class="btn" type="submit" aria-label="Send">Send</button></form>' +
      '<div class="chips sugg" id="sugg">' + ['When is my next lesson?', 'Have I paid for this month?', 'How are my test results?', 'Correct my sentence: "I am agree with you"', 'Give me 5 new B1 words'].map(function (q) { return '<button type="button" class="chip2 mute">' + esc(q) + '</button>'; }).join('') + '</div></div>' +
      '<aside class="asst-side"><div class="panel" id="tgp"><h2>Telegram</h2><p class="sub"><span class="spin"></span></p></div><div class="panel"><h2>Reminders</h2><div id="notes"><span class="spin"></span></div></div></aside></div>';
    var box = $('#msgs');
    function draw() {
      box.innerHTML = (CHAT.length ? '' : '<div class="msg bot">Hello! I\'m the IF Academy assistant. How can I help today?</div>') + CHAT.map(function (m) { return '<div class="msg ' + (m.role === 'user' ? 'me' : 'bot') + '">' + esc(m.content).replace(/\n/g, '<br>') + '</div>'; }).join('');
      box.scrollTop = box.scrollHeight;
    }
    async function send(text) {
      text = String(text || '').trim(); if (!text) return;
      CHAT.push({ role: 'user', content: text }); draw();
      box.insertAdjacentHTML('beforeend', '<div class="msg bot typing"><i></i><i></i><i></i></div>'); box.scrollTop = box.scrollHeight;
      $('#ci').value = ''; $('#cf button').disabled = true;
      try { var r = await aapi('chat', { method: 'POST', body: { messages: CHAT.slice(-12) } }); CHAT.push({ role: 'assistant', content: r.reply }); }
      catch (e) { CHAT.push({ role: 'assistant', content: e.code === 'members' ? 'The AI assistant is part of full access. See “Get full access” on your profile page.' : e.code === 'quota' ? 'You have reached today\'s message limit. Please try again tomorrow.' : 'Sorry, I couldn\'t answer just now. Please try again.' }); }
      CHAT = CHAT.slice(-40); lsSet('if.chat', CHAT); $('#cf button').disabled = false; draw(); $('#ci').focus();
    }
    draw();
    $('#cf').onsubmit = function (ev) { ev.preventDefault(); send($('#ci').value); };
    $('#ci').onkeydown = function (ev) { if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); send(this.value); } };
    $('#sugg').querySelectorAll('button').forEach(function (b) { b.onclick = function () { send(b.textContent); }; });
    if (CHAT.length) $('#sugg').insertAdjacentHTML('beforeend', '<button type="button" class="linkbtn" id="clr">Clear chat</button>');
    var clr = $('#clr'); if (clr) clr.onclick = function () { CHAT = []; lsSet('if.chat', null); draw(); clr.remove(); };
    tgPanel();
    try {
      var n = await aapi('notes');
      var up = (n.next || []).map(function (l) { return '<li><b>' + esc(l.label) + '</b><span>' + esc(l.date.slice(8) + '.' + l.date.slice(5, 7)) + ' · ' + esc(l.start) + (l.end ? '–' + esc(l.end) : '') + (l.room ? ' · ' + esc(l.room) : '') + '</span></li>'; }).join('');
      var pay = n.pay ? '<p class="small" style="margin:10px 0 0">Tuition ' + esc(monthLabel(n.pay.month)) + ': ' + (n.pay.paid ? '<span class="chip2 ok">Paid</span>' : n.pay.state === 'overdue' ? '<span class="chip2 bad">Overdue</span>' : '<span class="chip2 mute">Due ' + esc(n.pay.dueDate.slice(8) + '.' + n.pay.dueDate.slice(5, 7)) + '</span>') + (n.pay.fee ? ' ' + money(n.pay.fee) : '') + '</p>' : '';
      $('#notes').innerHTML = (up ? '<h3 class="small" style="margin:0 0 6px">Next lessons</h3><ul class="nlist">' + up + '</ul>' : '') + pay +
        (n.notes.length ? '<h3 class="small" style="margin:14px 0 6px">Recent reminders</h3><ul class="nlist">' + n.notes.slice(0, 8).map(function (x) { return '<li' + (x.read ? '' : ' class="new"') + '><span>' + esc(x.text) + '</span><small>' + when(x.at) + '</small></li>'; }).join('') + '</ul>' : (up || pay ? '' : '<p class="small">No reminders yet.</p>'));
      if (n.notes.some(function (x) { return !x.read; })) aapi('notes/read', { method: 'POST' }).catch(function () {});
    } catch (e) { $('#notes').innerHTML = '<p class="small">Could not load reminders.</p>'; }
  }
  /* Telegram: one tap on a phone, QR code on a computer */
  function tgConnectUI(el, bot, compact) {
    el.innerHTML = '<div class="tgc"><button class="btn tgbtn" type="button"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M21.9 4.3 18.7 19.4c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13 1.4 11.5c-1-.3-1.1-1 .2-1.5L20.6 2.9c.9-.3 1.6.2 1.3 1.4z"/></svg> Connect Telegram</button>' +
      (compact ? '' : '<button class="linkbtn tgqr" type="button">On a computer? Show a QR code</button>') + '</div><div class="tgout small"></div>';
    var out = el.querySelector('.tgout');
    async function link() { var r = await aapi('telegram/link', { method: 'POST' }); return r; }
    el.querySelector('.tgbtn').onclick = async function () {
      var w = window.open('', '_blank');
      try { var r = await link(); if (w) w.location = r.url; else location.href = r.url;
        out.innerHTML = '<p style="margin-top:10px">Telegram is opening. Press <b>Start</b> in the chat with <b>@' + esc(r.bot) + '</b>, then come back here.</p><p>Telegram didn\'t open? <a href="' + esc(r.url) + '" target="_blank" rel="noopener">Tap here</a>, or search <b>@' + esc(r.bot) + '</b> in Telegram and send the code <b>' + esc(r.url.split('start=')[1]) + '</b>.</p>';
        tgWatch(); }
      catch (e) { if (w) w.close(); toast('Could not create the link. Try again.'); }
    };
    var q = el.querySelector('.tgqr');
    if (q) q.onclick = async function () {
      try { var r = await link(), qr = qrcode(0, 'M'); qr.addData(r.url); qr.make();
        out.innerHTML = '<div class="tgqrbox">' + qr.createSvgTag({ cellSize: 5, margin: 2, scalable: true }) + '<p>Open your <b>phone camera</b> and point it at this code. Telegram opens the chat with <b>@' + esc(r.bot) + '</b>: press <b>Start</b>. The code works for 30 minutes.</p></div>';
        tgWatch(); }
      catch (e) { toast('Could not create the code. Try again.'); }
    };
  }
  /* after a link is made, check every few seconds until the bot reports the account as connected */
  function tgWatch() {
    clearInterval(tgWatch.t); var n = 0;
    tgWatch.t = setInterval(async function () {
      if (++n > 60) return clearInterval(tgWatch.t);
      try { var t = await aapi('telegram'); if (t.linked) { clearInterval(tgWatch.t); toast('Telegram connected ✓'); if ($('#tgp')) tgPanel(); if ($('#tgband')) tgBand(); } } catch (e) {}
    }, 4000);
  }
  async function tgPanel() {
    var p = $('#tgp'); if (!p) return;
    try {
      var t = await aapi('telegram');
      if (t.linked) {
        p.innerHTML = '<h2>Telegram</h2><p class="sub"><span class="chip2 ok">Connected</span>' + (t.linked.username ? ' @' + esc(t.linked.username) : '') + '</p><p class="small">Reminders and chat also work in Telegram' + (t.bot ? ' with <a href="https://t.me/' + esc(t.bot) + '" target="_blank" rel="noopener">@' + esc(t.bot) + '</a>' : '') + '.</p><button class="linkbtn" id="tgx">Disconnect</button>';
        $('#tgx').onclick = async function () { if (!confirm('Stop Telegram reminders?')) return; await aapi('telegram', { method: 'DELETE' }); tgPanel(); };
      } else if (t.ready) {
        p.innerHTML = '<h2>Telegram</h2><p class="sub">Get lesson and payment reminders on your phone, and chat with the assistant in Telegram' + (t.bot ? ' (<b>@' + esc(t.bot) + '</b>)' : '') + '.</p><div id="tgui"></div>';
        tgConnectUI($('#tgui'), t.bot);
      } else p.innerHTML = '<h2>Telegram</h2><p class="sub">The Telegram bot is being set up. For now, reminders appear here.</p>';
    } catch (e) { p.innerHTML = '<h2>Telegram</h2><p class="sub">Not available right now.</p>'; }
  }
  /* big invitation on the profile page until the student has connected */
  async function tgBand() {
    var b = $('#tgband'); if (!b) return;
    try {
      var t = await aapi('telegram');
      if (t.linked) { b.innerHTML = '<p class="small" style="margin:6px 0 0"><span class="chip2 ok">Telegram connected</span> Reminders come to ' + (t.linked.username ? '@' + esc(t.linked.username) : 'your Telegram') + (t.bot ? ' from <a href="https://t.me/' + esc(t.bot) + '" target="_blank" rel="noopener">@' + esc(t.bot) + '</a>' : '') + '.</p>'; return; }
      if (!t.ready) { b.innerHTML = ''; return; }
      b.innerHTML = '<div class="tgband"><div class="tgicon" aria-hidden="true">✈</div><div style="flex:1;min-width:220px"><b>Get your lesson and payment reminders on Telegram</b><p class="small" style="margin:4px 0 10px">Connect once with our bot' + (t.bot ? ' <b>@' + esc(t.bot) + '</b>' : '') + ': reminders before every lesson, tuition reminders, and you can ask the IF Assistant anything right in Telegram.</p><div id="tgbui"></div></div></div>';
      tgConnectUI($('#tgbui'), t.bot);
    } catch (e) { b.innerHTML = ''; }
  }

  /* ---------- test results from every test centre and the AI Test Centre (teachers) ---------- */
  async function vResults() {
    setNav('results'); if (!staff()) return go('#/');
    view.innerHTML = '<p style="margin-top:30px"><span class="spin"></span> Loading results…</p>';
    var rows; try { var r = await fetch('/api/tests/recent', { credentials: 'same-origin' }); rows = (await r.json()).rows || []; } catch (e) { view.innerHTML = '<div class="empty" style="margin-top:30px">Could not load results.</div>'; return; }
    var mine = (ME.teaching || []).map(function (c) { return c.label; });
    var f = vResults.f || (role() === 'admin' || !mine.length ? 'all' : 'mine'), q = vResults.q || '';
    function draw() {
      var list = rows.filter(function (r) {
        if (f === 'mine' && !(r.classes || []).some(function (c) { return mine.indexOf(c) >= 0; })) return false;
        return !q || (r.name + ' ' + r.test + ' ' + r.cls).toLowerCase().indexOf(q.toLowerCase()) >= 0;
      });
      $('#rt').innerHTML = list.length ? '<div class="tscroll"><table class="t"><thead><tr><th>When</th><th>Student</th><th>Test</th><th>Score</th><th>Sections</th></tr></thead><tbody>' + list.slice(0, 300).map(function (r) {
        var cls = r.pct >= 85 ? 'ok' : r.pct >= 60 ? 'warn' : 'bad';
        return '<tr><td class="small" style="white-space:nowrap">' + when(r.at) + '</td><td><b>' + (r.studentId ? '<a href="#/student/' + esc(r.studentId) + '">' + esc(r.name || '–') + '</a>' : esc(r.name || '–')) + '</b>' + (r.cls ? '<div class="small">' + esc(r.cls) + '</div>' : '') + '</td><td>' + esc(r.test) + (r.kind === 'ai' ? ' <span class="chip2 mute">AI</span>' : '') + '</td><td style="white-space:nowrap"><span class="chip2 ' + cls + '">' + r.pct + '%</span><div class="small">' + r.score + ' / ' + r.max + '</div></td><td class="small">' + esc(r.note || '') + (r.comment ? '<div style="margin-top:4px;color:var(--navy)">' + esc(r.comment) + '</div>' : '') + '</td></tr>';
      }).join('') + '</tbody></table></div>' : '<div class="empty">No results yet. They appear here as soon as a student finishes a test.</div>';
    }
    view.innerHTML = '<section class="hero" style="padding-bottom:6px"><div class="eyebrow">Teachers</div><h1>Test results</h1><p class="lead">Every finished test, as soon as the student submits it: the Test Centres and the IF Test Centre. Results are also on each student\'s profile.</p></section>' +
      '<div class="row" style="gap:10px;flex-wrap:wrap;margin-bottom:12px">' + (mine.length ? '<div class="tabs2" style="margin:0"><a href="#" data-f="mine" class="' + (f === 'mine' ? 'on' : '') + '">My classes</a><a href="#" data-f="all" class="' + (f === 'all' ? 'on' : '') + '">All students</a></div>' : '') +
      '<input class="inp" id="rq" placeholder="Search student, test or class" value="' + esc(q) + '" style="max-width:300px"></div><div id="rt"></div>';
    view.querySelectorAll('[data-f]').forEach(function (a) { a.onclick = function (e) { e.preventDefault(); vResults.f = f = a.dataset.f; view.querySelectorAll('[data-f]').forEach(function (b) { b.classList.toggle('on', b === a); }); draw(); }; });
    $('#rq').oninput = function () { vResults.q = q = this.value; draw(); };
    draw();
  }

  /* ---------- router ---------- */
  async function route() {
    closeModal(); window.scrollTo(0, 0);
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    try {
      switch (parts[0]) {
        case '': return vProfile();
        case 'login': return USER && role() ? go('#/') : vLogin();
        case 'register': return USER && role() ? go('#/') : vRegister(false);
        case 'staff': return USER && role() ? go('#/') : vRegister(true);
        case 'activate': return vActivate();
        case 'forgot': return vForgot();
        case 'reset': return vReset();
        case 'classes': return vClasses();
        case 'class': return vClass(parts[1]);
        case 'student': return vStudent(parts[1]);
        case 'admin': return vAdmin(parts[1]);
        case 'classroom': return vClassroom(parts[1]);
        case 'present': return vPresent(parts[1]);
        case 'assistant': return vAssistant();
        case 'upgrade': return vUpgrade();
        case 'results': return vResults();
        case 'teacher': return vTeacher(parts[1]);
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
    if (!USER && !/^#\/(login|register|staff|forgot|reset)/.test(location.hash)) history.replaceState(null, '', location.pathname + '#/login');
    header(); window.addEventListener('hashchange', route); route();
  }
  boot();
})();
