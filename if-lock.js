/* IF Academy access codes.
 * Student and teacher pages are encrypted when the site is built. Entering the
 * class code (students) or the staff code (teachers) derives the key in the
 * browser; the key is kept on this device until "Sign out". */
(function () {
  var ITER = 310000;
  var SALT = { s: 'IF-Academy/student/v1', t: 'IF-Academy/teacher/v1' };
  function ls(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function b64d(s) { var r = atob(s), u = new Uint8Array(r.length); for (var i = 0; i < r.length; i++) u[i] = r.charCodeAt(i); return u; }
  function b64e(u) { var s = ''; u = new Uint8Array(u); for (var i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); }
  function norm(c) { return String(c || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase(); }
  function derive(code, lvl) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(norm(code)), 'PBKDF2', false, ['deriveBits'])
      .then(function (km) { return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(SALT[lvl]), iterations: ITER, hash: 'SHA-256' }, km, 256); })
      .then(function (bits) { return new Uint8Array(bits); });
  }
  function aes(raw) { return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']); }
  function open(raw, blob) { // blob: Uint8Array iv(12)+ciphertext
    return aes(raw).then(function (k) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: blob.slice(0, 12) }, k, blob.slice(12)); });
  }
  var keysP = null;
  function keysFile(root) {
    if (!keysP) keysP = fetch(root + 'keys.json', { cache: 'no-cache' }).then(function (r) { return r.json(); });
    return keysP;
  }
  function role() { return ls('if.role') || ''; }
  function rawKey(lvl) { var v = ls('if.k' + lvl); return v ? b64d(v) : null; }
  function canOpen(lvl) { return lvl === 'p' || !!rawKey(lvl); }

  function signIn(code, root) {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error('This browser cannot open locked pages. Please update it.'));
    return keysFile(root).then(function (K) {
      return derive(code, 't').then(function (kt) {
        return open(kt, b64d(K.check_t)).then(function () {
          return open(kt, b64d(K.s_by_t)).then(function (ks) {
            ls('if.kt', b64e(kt)); ls('if.ks', b64e(new Uint8Array(ks))); ls('if.role', 'teacher'); share(); return 'teacher';
          });
        });
      }).catch(function () {
        return derive(code, 's').then(function (ks) {
          return open(ks, b64d(K.check_s)).then(function () {
            ls('if.ks', b64e(ks)); ls('if.kt', null); ls('if.role', 'student'); share(); return 'student';
          });
        });
      }).catch(function () {
        /* the account codes (student code, staff code) work here too: the server hands over the keys */
        return fetch('/api/school/lockcode', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: code }) })
          .then(function (r) { if (!r.ok) throw new Error('That code is not right. Check it and try again.'); return r.json(); })
          .then(function (k) { ls('if.ks', k.ks); ls('if.kt', k.kt || null); ls('if.role', k.kt ? 'teacher' : 'student'); return k.kt ? 'teacher' : 'student'; });
      });
    });
  }
  /* single sign-on with the IF Academy account: a code typed once while signed in is remembered for every account,
     and signed-in students/teachers get the keys from the server instead of typing the code */
  function share() { try { fetch('/api/school/lockkeys', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ks: ls('if.ks'), kt: ls('if.kt') }) }).catch(function () {}); } catch (e) {} }
  var ssoP = null;
  function fromAccount(lvl) {
    if (canOpen(lvl)) return Promise.resolve(true);
    if (ssoP) return ssoP.then(function () { return canOpen(lvl); });
    return ssoP = fetch('/api/school/lockkeys', { credentials: 'same-origin' }).then(function (r) {
      if (r.status === 403) r.json().then(function (d) { if (d && d.error === 'members') membersNote(); }).catch(function () {});
      return r.ok ? r.json() : null;
    }).then(function (k) {
      if (!k || !k.ks) return false;
      ls('if.ks', k.ks); ls('if.kt', k.kt || null); ls('if.role', k.kt ? 'teacher' : 'student');
      return canOpen(lvl);
    }).catch(function () { return false; });
  }
  /* free online accounts: this page is part of full access */
  function membersNote() {
    if (document.getElementById('if-members')) return;
    var d = document.createElement('div'); d.id = 'if-members';
    d.setAttribute('style', 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:99999;max-width:min(560px,calc(100% - 24px));background:#0b1f3a;color:#fff;border-radius:16px;padding:14px 18px;font:15px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 18px 40px -12px rgba(0,0,0,.45)');
    d.innerHTML = '<b style="display:block;margin-bottom:2px">This app is part of full access</b>You are signed in with a free account. IF Academy students and Abdoulie\u2019s individual students get it free; others can join online. <a href="/me/#/upgrade" style="color:#e9c98f;font-weight:700">Get full access \u2192</a>';
    (document.body || document.documentElement).appendChild(d);
  }
  function signOut() { ['if.ks', 'if.kt', 'if.role'].forEach(function (k) { ls(k, null); }); }
  function decryptBytes(lvl, bytes) {
    var raw = rawKey(lvl); if (!raw) return Promise.reject(new Error('locked'));
    return open(raw, bytes);
  }
  function decryptText(lvl, b64) { return decryptBytes(lvl, b64d(b64)).then(function (b) { return new TextDecoder().decode(b); }); }
  function fetchDecrypt(lvl, url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error('missing'); return r.arrayBuffer(); })
      .then(function (buf) { return decryptBytes(lvl, new Uint8Array(buf)); });
  }
  /* a device that already opened the locked pages with the old class/staff code hands the keys to the site once,
     so every signed-in account (and the new student/staff codes) can open them too */
  try { if (ls('if.ks') && !sessionStorage.getItem('if.shared')) { sessionStorage.setItem('if.shared', '1'); share(); } } catch (e) {}
  /* pages without their own lock screen (apps grid, materials, IF English, login): unlock silently from the account */
  try {
    var last = +sessionStorage.getItem('if.sso') || 0;
    if (!role() && Date.now() - last > 120000 && !document.getElementById('payload')) {
      sessionStorage.setItem('if.sso', String(Date.now()));
      fromAccount('s').then(function (ok) { if (ok) location.reload(); });
    }
  } catch (e) {}
  window.IFLock = { fromAccount: fromAccount, signIn: signIn, signOut: signOut, role: role, canOpen: canOpen, decryptText: decryptText, decryptBytes: decryptBytes, fetchDecrypt: fetchDecrypt, norm: norm };
})();
