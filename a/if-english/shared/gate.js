/* IF English: free units vs Premium inside a course page.
   Loaded last. Free users get the first units of each course (all games and study modes);
   other units show a Premium card on the game stage. Relies on the course page globals
   DATA, lesson, chips(), render(), reset(), save(). */
(function () {
  'use strict';
  var IFEN = window.IFEN;
  if (!IFEN || typeof DATA === 'undefined') return;
  var CFG = IFEN.config || {}, N = Math.max(0, CFG.freeUnits == null ? 2 : CFG.freeUnits);
  var keys = Object.keys(DATA);
  var vocab = keys.filter(function (k) { return DATA[k] && DATA[k].kind !== 'g'; });
  var gram = keys.filter(function (k) { return DATA[k] && DATA[k].kind === 'g'; });
  var FREE = {};
  vocab.slice(0, N).concat(IFEN.native ? gram.slice(0, N) : []).forEach(function (k) { FREE[k] = 1; });
  var ru = IFEN.lang() === 'ru';

  function unlocked(k) {
    if (IFEN.isPremium()) return true;
    if (FREE[k]) return true;
    var d = DATA[k];
    if (d && d.mix) return d.mix.every(function (u) { return !!FREE[u]; });
    return false;
  }
  function cur() { try { return lesson; } catch (e) { return null; } }
  function firstFree() { return vocab.filter(function (k) { return FREE[k]; })[0] || keys[0]; }

  window.IFEN_GATE = { unlocked: unlocked, free: Object.keys(FREE), total: keys.length,
    words: keys.reduce(function (n, k) { return n + ((DATA[k] && DATA[k].words) || []).length; }, 0) };

  var css = document.createElement('style');
  css.textContent =
    '.iflock{opacity:.78}.iflock::after{content:" 🔒";font-size:.85em}' +
    '.ifen-pw{max-width:560px;margin:18px auto;text-align:center;padding:26px 20px;border-radius:20px;background:linear-gradient(160deg,#14213D,#1E3266);color:#fff;box-shadow:0 14px 40px rgba(20,33,61,.25)}' +
    '.ifen-pw .k{display:inline-block;font:800 12px/1 Manrope,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#E7CF7A;border:1px solid rgba(231,207,122,.5);border-radius:999px;padding:7px 12px}' +
    '.ifen-pw h2{font-family:var(--display,Fraunces,Georgia,serif);font-size:clamp(24px,5vw,32px);margin:14px 0 8px;line-height:1.15;text-wrap:balance}' +
    '.ifen-pw p{margin:0 auto 6px;max-width:42ch;color:#D6DEEC;font-size:16px;line-height:1.5}' +
    '.ifen-pw .row{display:flex;flex-direction:column;gap:10px;margin-top:18px;align-items:center}' +
    '.ifen-pw .go{background:#C9A227;border:0;color:#14213D;font:800 17px/1 Manrope,system-ui,sans-serif;border-radius:999px;padding:16px 26px;min-height:52px;width:min(340px,100%);cursor:pointer}' +
    '.ifen-pw .alt{background:transparent;border:1.5px solid rgba(255,255,255,.35);color:#fff;font:700 15px/1 Manrope,system-ui,sans-serif;border-radius:999px;padding:12px 20px;min-height:46px;width:min(340px,100%);cursor:pointer}' +
    '.ifen-pw ul{list-style:none;padding:0;margin:14px auto 0;max-width:340px;text-align:left;color:#EEF1F7;font-size:15px}' +
    '.ifen-pw li{padding:5px 0 5px 26px;position:relative}.ifen-pw li::before{content:"✓";position:absolute;left:4px;color:#E7CF7A;font-weight:800}';
  document.head.appendChild(css);

  function paywall() {
    var stage = document.getElementById('stage'); if (!stage) return;
    if (!IFEN.native) { stage.innerHTML = '<section class="ifen-pw"><span class="k">IF Academy</span><h2>Access code required</h2><p>The first 2 vocabulary units in each course are free. Academy students and staff can use their access code to open every unit.</p><p><a style="color:#E7CF7A" href="../../index.html#access">Enter academy access code ↗</a></p><button class="alt" type="button" id="free-unit">Back to free units</button></section>'; stage.querySelector('#free-unit').onclick = function () { lesson = firstFree(); save('lesson', lesson); reset(); }; return; }
    try { if (window.IFStudy && IFStudy.stop) IFStudy.stop(); } catch (e) {}
    var k = cur(), d = DATA[k] || {}, label = d.mix ? (ru ? 'Набор юнитов' : 'This unit mix') : (ru ? 'Юнит ' : 'Unit ') + k;
    var g = window.IFEN_GATE;
    stage.innerHTML = '<div class="ifen-pw" role="region" aria-label="Premium">' +
      '<span class="k">IF English Premium</span>' +
      '<h2>' + esc(label) + (d.title && !d.mix ? ' · ' + esc(d.title) : '') + '</h2>' +
      '<p>' + (ru ? 'Первые ' + N + ' юнита бесплатны. С Premium открыты все ' + g.total + ' юнитов этого курса и все 12 курсов.'
        : 'The first ' + N + ' units are free. Premium opens all ' + g.total + ' units in this course and every one of the 12 courses.') + '</p>' +
      '<ul><li>' + (ru ? 'Все слова с произношением и озвучкой' : 'Every word with pronunciation and audio') + '</li>' +
      '<li>' + (ru ? 'Все игры для каждого юнита' : 'Every game for every unit') + '</li>' +
      '<li>' + (ru ? 'Режим «Смешать юниты»' : 'Mix units across the whole course') + '</li></ul>' +
      '<div class="row"><button type="button" class="go" data-a="buy">' + (ru ? 'Открыть Premium' : 'See Premium plans') + '</button>' +
      '<button type="button" class="alt" data-a="free">' + (ru ? 'К бесплатным юнитам' : 'Back to the free units') + '</button></div></div>';
    stage.querySelector('[data-a="buy"]').onclick = function () { IFEN.home('premium'); };
    stage.querySelector('[data-a="free"]').onclick = function () {
      var f = firstFree(); try { lesson = f; } catch (e) {} try { save('lesson', f); } catch (e) {}
      try { reset(); } catch (e) {}
    };
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* render: show the Premium card for locked units */
  var baseRender = window.render;
  if (typeof baseRender === 'function') {
    window.render = function () {
      if (!unlocked(cur())) return paywall();
      return baseRender.apply(this, arguments);
    };
  }

  /* lesson chips: mark locked units */
  function mark() {
    var L = document.getElementById('lessons'), G = document.getElementById('glessons');
    if (!L) return;
    var lb = Array.prototype.filter.call(L.querySelectorAll('button'), function (b) { return !b.classList.contains('ifmix-btn'); });
    var gb = G ? Array.prototype.slice.call(G.querySelectorAll('button')) : [];
    var lk = G ? vocab : keys, gk = G ? gram : [];
    lb.forEach(function (b, i) { var k = lk[i]; if (k != null) b.classList.toggle('iflock', !unlocked(k)); });
    gb.forEach(function (b, i) { var k = gk[i]; if (k != null) b.classList.toggle('iflock', !unlocked(k)); });
  }
  if (typeof window.chips === 'function') {
    var baseChips = window.chips;
    window.chips = function () { var r = baseChips.apply(this, arguments); try { mark(); } catch (e) {} return r; };
  }
  /* Mix units panel: mark locked units */
  var mixObs = new MutationObserver(function () {
    var p = document.getElementById('ifmix'); if (!p) return;
    p.querySelectorAll('[data-u]').forEach(function (b) { b.classList.toggle('iflock', !unlocked(b.dataset.u)); });
  });
  var mp = document.getElementById('ifmix'); if (mp) mixObs.observe(mp, { childList: true, subtree: true });

  /* opening the app with a locked unit saved (e.g. after Premium ended): start on a free unit */
  if (!IFEN.isPremium() && !unlocked(cur())) { try { lesson = firstFree(); save('lesson', lesson); } catch (e) {} }
  try { reset(); } catch (e) { try { mark(); } catch (x) {} }

  window.addEventListener('ifen:premium', function () { try { reset(); } catch (e) {} });
})();
