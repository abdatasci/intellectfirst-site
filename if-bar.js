/* Small "back to IF Academy" button shown on every app page, plus offline support. */
(function () {
  var me = document.currentScript;
  var root = (me && me.getAttribute('data-root')) || '/';
  function add() {
    if (document.getElementById('if-home-pill') || (me && me.getAttribute('data-slug') === 'home')) return;
    var a = document.createElement('a');
    a.id = 'if-home-pill';
    a.href = root + 'app/index.html';
    a.setAttribute('aria-label', 'Back to IF Academy apps');
    a.innerHTML = '<img src="' + root.replace(/index\.html$/,'') + 'brand/favicon-64.png" alt="" width="22" height="22"><span>Apps</span>';
    var s = document.createElement('style');
    s.textContent = '#if-home-pill{position:fixed;z-index:2147483000;left:calc(10px + env(safe-area-inset-left,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));display:flex;align-items:center;gap:6px;padding:5px 11px 5px 6px;border-radius:999px;background:rgba(7,26,51,.86);color:#fff!important;font:600 12.5px/1 Inter,-apple-system,BlinkMacSystemFont,sans-serif;text-decoration:none!important;box-shadow:0 2px 10px rgba(0,0,0,.18);opacity:.82;transition:opacity .15s}#if-home-pill:hover,#if-home-pill:focus-visible{opacity:1}#if-home-pill img{display:block;width:22px;height:22px}@media print{#if-home-pill{display:none}}';
    document.head.appendChild(s);
    document.body.appendChild(a);
  }
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
  try {
    var slug = (me && me.getAttribute('data-slug')) || '';
    if (slug) {
      var r = JSON.parse(localStorage.getItem('if.recent') || '[]').filter(function (x) { return x !== slug; });
      r.unshift(slug); localStorage.setItem('if.recent', JSON.stringify(r.slice(0, 8)));
    }
  } catch (e) {}
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register(root + 'sw.js').catch(function () {});
  }
})();
