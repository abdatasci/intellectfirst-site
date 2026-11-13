/* Test centres: when a student finishes a test, the result is saved straight to their profile and the teachers'
   results page. No code to copy and send. Loaded into every test centre page after it opens. */
(function () {
  'use strict';
  if (window.__ifAutosave) return; window.__ifAutosave = true;
  var sent = {};
  function css() {
    if (document.getElementById('ifas-css')) return;
    var s = document.createElement('style'); s.id = 'ifas-css';
    s.textContent = '.ifas{margin:14px 0;padding:14px 16px;border-radius:12px;font:15px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;border:1px solid #cfe3d6;background:#eef7f1;color:#1d4d33}' +
      '.ifas.wait{background:#f4f1ea;border-color:#e4dccd;color:#3b4354}.ifas.no{background:#fbf3df;border-color:#ecd9a8;color:#5c4511}.ifas b{display:block;font-size:16px;margin-bottom:2px}.ifas a{color:inherit;font-weight:700}' +
      '.ifr.ifas-done{display:none}';
    document.head.appendChild(s);
  }
  function note(container, cls, html) {
    css();
    var n = container.querySelector('.ifas'); if (!n) { n = document.createElement('div'); container.insertBefore(n, container.firstChild); }
    n.className = 'ifas ' + cls; n.innerHTML = html; return n;
  }
  function save(container, p) {
    if (!p || !p.s) return;
    var key = (p.id || '') + '|' + JSON.stringify(p.s);
    if (sent[key]) return; sent[key] = 1;
    note(container, 'wait', '<b>Saving your result\u2026</b>');
    var go = function () {
      return fetch('/api/tests/legacy', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ p: p }) });
    };
    var ready = window.NFIdentity && NFIdentity.getUser ? NFIdentity.getUser().catch(function () {}) : Promise.resolve();
    ready.then(go).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, status: r.status, d: d }; }); }).then(function (x) {
      if (x.ok) {
        var d = x.d;
        note(container, '', '<b>\u2713 Saved to your profile and your teacher\u2019s results</b>Score ' + d.score + ' / ' + d.max +
          (d.aiMarked ? '. Your writing was marked by AI.' : d.pending ? '. Your teacher will mark the writing.' : '.') + ' No need to send anything.');
        var box = container.querySelector('.ifr'); if (box) box.classList.add('ifas-done');
      } else if (x.status === 401) {
        delete sent[key];
        note(container, 'no', '<b>Sign in to save this result automatically</b><a href="/me/#/login" target="_blank" rel="noopener">Sign in</a> with your IF Academy account, then press the button again. Or send the message below to your teacher.');
      } else {
        delete sent[key];
        note(container, 'no', '<b>Could not save automatically</b>Send the message below to your teacher instead.');
      }
    }).catch(function () { delete sent[key]; note(container, 'no', '<b>No internet?</b> Send the message below to your teacher, or try again.'); });
  }
  function hook() {
    if (!window.IFR || window.IFR.__as) return !!window.IFR;
    var orig = window.IFR.box;
    window.IFR.box = function (container, p) { var r = orig.apply(this, arguments); try { save(container, p); } catch (e) {} return r; };
    window.IFR.__as = true;
    return true;
  }
  if (!hook()) { var n = 0, t = setInterval(function () { if (hook() || ++n > 100) clearInterval(t); }, 200); }
})();
