/* IF Academy inside the Telegram bot (Mini App). Does nothing on the normal website.
   When a page is opened from the bot, Telegram passes signed launch data in the address (#tgWebAppData=…). This script
   keeps it for the visit, sends it with the site's own requests (/api/…, X-TG-Init header) so the server knows who it
   is from the bot connection, and lets the pages' sign-in check pass — so My account, the IF English app, tests and
   IELTS work in Telegram exactly as on the website, with no password. Same-origin frames (games) share it too. */
(function () {
  var K = 'if.tginit', init = '';
  try {
    var m = location.hash.match(/[#&]tgWebAppData=([^&]*)/);
    if (m) { init = decodeURIComponent(m[1]); sessionStorage.setItem(K, init); }
    else init = sessionStorage.getItem(K) || '';
  } catch (e) {}
  if (!init) return;
  window.IF_TG = init;
  var top = window.top === window;
  document.documentElement.classList.add('in-tg');

  // 1. every request to the site's API carries the launch data
  var of = window.fetch;
  if (of) window.fetch = function (input, opts) {
    try {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var same = url.charAt(0) === '/' || url.indexOf(location.origin + '/') === 0;
      if (same && /\/api\//.test(url)) {
        opts = Object.assign({}, opts || {});
        var h = new Headers(opts.headers || (typeof input !== 'string' && input.headers) || {});
        if (!h.has('X-TG-Init')) h.set('X-TG-Init', init);
        opts.headers = h;
      }
    } catch (e) {}
    return of.call(this, input, opts);
  };

  // 2. the pages' "are you signed in?" check: the website sign-in if there is one, otherwise the bot connection
  var real;
  function wrap(I) {
    if (!I || I.__tg) return I;
    // the sign-in library's methods are read-only, so the wrapper is a fresh object that forwards everything else
    var w = {}, own = function (k, v) { Object.defineProperty(w, k, { value: v, enumerable: true, configurable: true }); };
    for (var k in I) (function (k) { try { var v = I[k]; own(k, typeof v === 'function' ? function () { return v.apply(I, arguments); } : v); } catch (e) {} })(k);
    Object.defineProperty(w, '__tg', { value: true });
    Object.defineProperty(w, 'getUser', { value: async function () { try { var u = await I.getUser.apply(I, arguments); if (u) return u; } catch (e) {} return { id: 'telegram', email: '', user_metadata: {}, app_metadata: {}, telegram: true }; } });
    Object.defineProperty(w, 'refreshSession', { value: async function () { try { return await I.refreshSession.apply(I, arguments); } catch (e) { return null; } } });
    return w;
  }
  try { Object.defineProperty(window, 'NFIdentity', { configurable: true, get: function () { return real; }, set: function (v) { real = wrap(v); } }); } catch (e) {}

  // 3. Telegram's own script (full height, ready signal), then a clean address for the page's own navigation
  if (top) {
    var go = (location.search.match(/[?&]go=([a-z0-9\/-]+)/i) || [])[1];
    document.write('<script src="https://telegram.org/js/telegram-web-app.js"><\/script><script>(function(){try{var W=Telegram.WebApp;W.ready();W.expand();}catch(e){}' +
      'if(/tgWebApp/.test(location.hash))history.replaceState(null,"",location.pathname+location.search+"#/' + (go || '') + '")})()<\/script>');
  }
  var st = document.createElement('style');
  st.textContent = '.in-tg #out{display:none!important}';
  (document.head || document.documentElement).appendChild(st);
})();
