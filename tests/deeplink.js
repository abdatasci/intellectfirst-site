/* Test centres: a link sent by the teacher opens the right test with the student's class and name already chosen.
     /a/ef-b1-tests/?t=f3&cls=B1%20Teen-D&name=Kiana%20Brisheva
   t = the test id (the value in the "Test" list), cls = class, name = student. Applied once per link, after the page has
   drawn itself, by choosing the options in the page's own controls — so it works the same in every test centre. */
(function () {
  'use strict';
  if (window.__ifDeep) return; window.__ifDeep = true;
  var q = new URLSearchParams(location.search), t = q.get('t'), cls = q.get('cls'), name = q.get('name');
  if (!t && !cls && !name) return;
  var once = 'ifdeep:' + location.pathname + location.search;
  try { if (sessionStorage.getItem(once)) return; } catch (e) {}
  var flat = function (s) { return String(s || '').toLowerCase().replace(/[абвсдекмнортх]/g, function (c) { return { 'а': 'a', 'в': 'b', 'б': 'b', 'с': 'c', 'д': 'd', 'е': 'e', 'к': 'k', 'м': 'm', 'н': 'h', 'о': 'o', 'р': 'p', 'т': 't', 'х': 'x' }[c]; }).replace(/teens?|group|grp|class|[^a-z0-9]/g, ''); };
  function pick(sel, want, exact) {
    if (!sel || !want) return false;
    var opts = [].slice.call(sel.options), w = flat(want);
    var o = opts.filter(function (x) { return x.value === want || x.text === want; })[0] ||
      (exact ? null : opts.filter(function (x) { return x.value && flat(x.value || x.text) === w; })[0]) ||
      (exact ? null : opts.filter(function (x) { return x.value && w && flat(x.text).split(/\s+/)[0] && w.indexOf(flat(x.text)) === 0; })[0]);
    if (!o) return false;
    if (sel.value !== o.value) { sel.value = o.value; sel.dispatchEvent(new Event('change', { bubbles: true })); sel.dispatchEvent(new Event('input', { bubbles: true })); }
    return true;
  }
  var tries = 0, doneT = !t, doneC = !cls, doneN = !name;
  function go() {
    tries++;
    var mp = document.getElementById('mpick');
    if (!doneT && mp) {
      if (mp.value === t) doneT = true;
      else if ([].some.call(mp.options, function (o) { return o.value === t; })) { mp.value = t; mp.dispatchEvent(new Event('change', { bubbles: true })); doneT = true; }
      else { var b = document.querySelector('[data-test="' + t.replace(/"/g, '') + '"]'); if (b) { b.click(); doneT = true; } }
    }
    if (doneT) {
      if (!doneC) { var sc = document.getElementById('sclass'); if (sc && sc.tagName === 'SELECT') doneC = pick(sc, cls) || tries > 20; else if (sc) { sc.value = cls; sc.dispatchEvent(new Event('input', { bubbles: true })); doneC = true; } }
      if (doneC && !doneN) {
        var sn = document.getElementById('snamesel');
        if (sn) {
          var key = function (x) { return String(x || '').toLowerCase().replace(/[^a-zа-яёәғқңөұүһі\s]/g, '').split(/\s+/).filter(Boolean).sort().join(' '); };
          var hit = [].filter.call(sn.options, function (o) { return o.value && o.value !== '__other' && key(o.text) === key(name); })[0];
          if (hit) doneN = pick(sn, hit.value, true);
          else if ([].some.call(sn.options, function (o) { return o.value === '__other'; })) {   // not on the class list: type the name
            sn.value = '__other'; sn.dispatchEvent(new Event('change', { bubbles: true }));
            var si2 = document.getElementById('sname'); if (si2) { si2.hidden = false; si2.value = name; si2.dispatchEvent(new Event('input', { bubbles: true })); }
            doneN = true;
          } else doneN = tries > 20;
        }
        else { var si = document.getElementById('sname'); if (si) { si.value = name; si.dispatchEvent(new Event('input', { bubbles: true })); doneN = true; } }
      }
    }
    if (doneT && doneC && doneN) { try { sessionStorage.setItem(once, '1'); } catch (e) {} return; }
    if (tries < 40) setTimeout(go, 250);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(go, 200); }); else setTimeout(go, 200);
})();
