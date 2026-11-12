/* IF Academy: Back / Home buttons on every inner page, and the 3D shield's tilt. Injected by scripts/build.mjs. */
(function () {
  if (window.__ifNav) return; window.__ifNav = true;
  var embedded = false; try { embedded = window.top !== window.self; } catch (e) { embedded = true; }
  var path = location.pathname.replace(/index\.html$/, '');
  var isHome = path === '/' || path === '';
  var lang = 'en'; try { lang = localStorage.getItem('if_lang') || 'en'; } catch (e) {}
  var T = { en: ['Back', 'Home'], ru: ['Назад', 'Главная'], kk: ['Артқа', 'Басты бет'] }[lang] || ['Back', 'Home'];

  var css = document.createElement('style');
  css.textContent =
    '.shield3d{transform:perspective(600px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .6s cubic-bezier(.2,.8,.2,1),filter .3s;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35));will-change:transform;object-fit:contain}' +
    'a:hover>.shield3d,.shield3d:hover{filter:drop-shadow(0 10px 16px rgba(0,0,0,.4))}' +
    '@keyframes ifShieldIn{0%{transform:perspective(600px) rotateY(-28deg) rotateX(8deg)}60%{transform:perspective(600px) rotateY(10deg)}100%{transform:perspective(600px) rotateY(0)}}' +
    '.shield3d.in{animation:ifShieldIn 1.4s cubic-bezier(.2,.8,.2,1) both}' +
    '.ifnav{position:fixed;left:max(14px,env(safe-area-inset-left,0px));bottom:max(14px,env(safe-area-inset-bottom,0px));z-index:9990;display:flex;gap:6px;padding:5px;border-radius:999px;background:rgba(10,24,47,.9);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 12px 30px -12px rgba(0,0,0,.55);transition:transform .3s,opacity .3s;font:600 14px/1 Inter,system-ui,-apple-system,Segoe UI,sans-serif}' +
    '.ifnav.hide{transform:translateY(140%);opacity:0}' +
    '.ifnav a{display:inline-flex;align-items:center;gap:7px;padding:10px 14px;border-radius:999px;color:#fff!important;text-decoration:none!important;cursor:pointer;white-space:nowrap}' +
    '.ifnav a:hover{background:rgba(255,255,255,.14)}' +
    '.ifnav a.home{background:linear-gradient(135deg,#d7b47d,#b8895a);color:#1a1208!important}' +
    '.ifnav a.home:hover{filter:brightness(1.07)}' +
    '.ifnav svg{width:16px;height:16px;flex:none}' +
    '@media (max-width:520px){.ifnav a{padding:10px 12px}.ifnav a span{display:none}}' +
    '@media print{.ifnav{display:none}}' +
    '@media (prefers-reduced-motion:reduce){.shield3d,.shield3d.in{animation:none;transition:none}}';
  document.head.appendChild(css);

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    /* 3D shield: settle-in once per visit, then tilt toward the pointer */
    var fine = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches;
    document.querySelectorAll('.shield3d').forEach(function (img) {
      var seen = false; try { seen = sessionStorage.getItem('if-shield') === '1'; sessionStorage.setItem('if-shield', '1'); } catch (e) {}
      if (!seen) { img.classList.add('in'); img.addEventListener('animationend', function () { img.classList.remove('in'); }, { once: true }); }
      if (!fine) return;
      var host = img.closest('a') || img;
      host.addEventListener('mousemove', function (e) {
        var r = img.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        img.style.setProperty('--ry', (x * 34).toFixed(1) + 'deg'); img.style.setProperty('--rx', (-y * 26).toFixed(1) + 'deg');
      });
      host.addEventListener('mouseleave', function () { img.style.setProperty('--ry', '0deg'); img.style.setProperty('--rx', '0deg'); });
    });

    /* Back / Home */
    if (isHome || embedded || document.querySelector('.ifnav')) return;
    var bar = document.createElement('nav');
    bar.className = 'ifnav'; bar.setAttribute('aria-label', 'Page navigation');
    bar.innerHTML =
      '<a href="#" class="back" aria-label="' + T[0] + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg><span>' + T[0] + '</span></a>' +
      '<a href="/" class="home" aria-label="' + T[1] + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg><span>' + T[1] + '</span></a>';
    document.body.appendChild(bar);
    bar.querySelector('.back').addEventListener('click', function (e) {
      e.preventDefault();
      var fromSite = false; try { fromSite = document.referrer && new URL(document.referrer).origin === location.origin; } catch (err) {}
      if ((fromSite || /^#\//.test(location.hash)) && history.length > 1) history.back(); else location.href = '/';
    });
    /* hide while scrolling down, show when scrolling up or near the top; hide during full-screen slides */
    var last = scrollY;
    addEventListener('scroll', function () { var y = scrollY; bar.classList.toggle('hide', y > last + 4 && y > 160); if (y < last - 4) bar.classList.remove('hide'); last = y; }, { passive: true });
    function present() { bar.style.display = /^#\/present/.test(location.hash) || document.fullscreenElement ? 'none' : ''; }
    addEventListener('hashchange', present); document.addEventListener('fullscreenchange', present); present();
  });
})();
