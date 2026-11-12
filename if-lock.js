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
            ls('if.kt', b64e(kt)); ls('if.ks', b64e(new Uint8Array(ks))); ls('if.role', 'teacher'); return 'teacher';
          });
        });
      }).catch(function () {
        return derive(code, 's').then(function (ks) {
          return open(ks, b64d(K.check_s)).then(function () {
            ls('if.ks', b64e(ks)); ls('if.kt', null); ls('if.role', 'student'); return 'student';
          });
        });
      });
    });
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
  window.IFLock = { signIn: signIn, signOut: signOut, role: role, canOpen: canOpen, decryptText: decryptText, decryptBytes: decryptBytes, fetchDecrypt: fetchDecrypt, norm: norm };
})();
