
// === IF mobile layer === (shared by the IF Vocabulary Arenas; safe no-op on desktop)
(function(){
  if (window.__ifMobile) return; window.__ifMobile = true;
  var mq = window.matchMedia('(max-width:640px)');
  var stage = document.getElementById('stage'), L = document.getElementById('lessons'), M = document.getElementById('modes');
  // keep the selected chip visible in the swipeable rows (horizontal scroll only, never moves the page)
  function centerOn(row){ if (!row || !mq.matches) return; var on = row.querySelector('button.on,button[aria-pressed="true"]'); if (!on) return;
    var r = row.getBoundingClientRect(), b = on.getBoundingClientRect();
    if (b.left < r.left + 40 || b.right > r.right - 40) row.scrollLeft += (b.left - r.left) - (r.width - b.width) / 2; }
  function hint(){ if (!M || !mq.matches || document.querySelector('.ifm-more')) return;
    var p = document.createElement('div'); p.className = 'ifm-more'; p.textContent = 'Swipe the rows for more lessons and games →';
    M.parentNode.insertBefore(p, M.nextSibling); }
  [L, M].forEach(function(row){ if (!row) return;
    var keep = 0; row.addEventListener('scroll', function(){ keep = row.scrollLeft; }, {passive:true});
    new MutationObserver(function(){ row.scrollLeft = keep; requestAnimationFrame(function(){ centerOn(row); }); }).observe(row, {childList:true, subtree:true, attributes:true, attributeFilter:['class']});
    setTimeout(function(){ centerOn(row); }, 50); });
  hint();
  // stop the page from scrolling while swiping on a game board (old iOS ignores touch-action)
  function lock(el){ if (!el || el.__ifmLock) return; el.__ifmLock = 1; el.style.touchAction = 'none';
    el.addEventListener('touchmove', function(e){ if (e.cancelable) e.preventDefault(); }, {passive:false}); }
  // after a game screen appears on a phone, bring the play area (not the pickers) into view
  var lastSig = '';
  function onStage(){
    if (!stage) return;
    ['#sc','#tc','#g48'].forEach(function(s){ lock(stage.querySelector(s)); });
    if (!mq.matches) return;
    var play = stage.querySelector('.arc, .blk, #sky, .ifs-space, .ifs-field, .ifs-track');
    var sig = play ? (play.className + '|' + (play.id || '')) : '';
    if (play && sig !== lastSig){ var t = stage.getBoundingClientRect().top;
      if (t > 40 || t < -stage.offsetHeight) window.scrollTo({top: window.scrollY + t - 8, behavior: 'smooth'}); }
    lastSig = sig;
  }
  if (stage) new MutationObserver(function(){ requestAnimationFrame(onStage); }).observe(stage, {childList:true, subtree:true});
  // Gravity: when the phone keyboard opens, keep the falling definition and the input in view
  document.addEventListener('focusin', function(e){ if (!mq.matches || !e.target || e.target.id !== 'ans') return;
    setTimeout(function(){ var s = document.getElementById('sky'); if (s) s.scrollIntoView({block:'start', behavior:'smooth'}); }, 300); });
  if (window.visualViewport) visualViewport.addEventListener('resize', function(){ var s = document.getElementById('sky'); if (s && mq.matches && document.activeElement && document.activeElement.id === 'ans'){ s.style.height = Math.max(180, Math.min(300, visualViewport.height - 140)) + 'px'; } });
})();
// === end IF mobile layer ===
// === IF mobile layer (arcade iframe) === classic Arcade games run in solo.html inside an iframe: give its controls thumb-sized targets on phones
(function(){
  if (window.__ifMobileFrame) return; window.__ifMobileFrame = true;
  var CSS = '@media (max-width:640px){.pill{min-height:44px;box-sizing:border-box;display:inline-flex!important;align-items:center;padding:8px 14px!important;font-size:15px!important}.btn{min-height:44px;box-sizing:border-box}.k{height:48px!important}.t{width:44px!important}input,select,textarea{font-size:max(16px,1em)}}';
  function inject(fr){ try { var d = fr.contentDocument; if (!d || !d.head || d.getElementById('ifm-frame')) return;
    var s = d.createElement('style'); s.id = 'ifm-frame'; s.textContent = CSS; d.head.appendChild(s); } catch(e){} }
  function watch(fr){ if (fr.__ifm) return; fr.__ifm = 1; fr.addEventListener('load', function(){ inject(fr); }); inject(fr); }
  new MutationObserver(function(){ document.querySelectorAll('iframe.ifp-frame, iframe#c-fr').forEach(watch); }).observe(document.body, {childList:true, subtree:true});
})();
// === end IF mobile layer (arcade iframe) ===
