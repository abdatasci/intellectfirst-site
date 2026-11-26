/* Test centres: locked buttons explain themselves.
   Disabled buttons give no feedback on a phone, so students think the page is broken.
   This turns locked answer and mark buttons into "looks locked" buttons that show a short
   message when tapped, and puts a note at the top of a finished test. */
(function () {
  if (window.IFLockHint) return; window.IFLockHint = 1;
  var SEL = '.opt,[data-task],[data-wmark],[data-pick],[data-un],[data-clear],.tile';
  var css = document.createElement('style');
  css.textContent = '#sec button.lk{cursor:not-allowed;opacity:.75}' +
    '.lkt{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;max-width:min(92vw,420px);' +
    'background:#15213a;color:#fff;border-radius:14px;padding:12px 16px;font:15px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;' +
    'box-shadow:0 10px 30px -10px rgba(0,0,0,.5);opacity:0;transition:opacity .2s}.lkt.on{opacity:1}' +
    '.lknote{margin:0 0 14px;padding:10px 14px;border-radius:12px;background:#fff7e6;border:1px solid #f1d9a6;color:#5a4210;font:14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif}';
  document.head.appendChild(css);

  function cur() { try { return window.IFLK ? window.IFLK.cur() : null; } catch (e) { return null; } }
  function student() { try { return !!(window.IFLK && window.IFLK.student()); } catch (e) { return false; } }
  function isMark(b) { return b.matches('[data-task],[data-wmark]'); }

  var tm = 0, box = null;
  function toast(msg) {
    if (!box) { box = document.createElement('div'); box.className = 'lkt'; box.setAttribute('role', 'status'); document.body.appendChild(box); }
    box.textContent = msg; box.classList.add('on'); clearTimeout(tm);
    tm = setTimeout(function () { box.classList.remove('on'); }, 4200);
  }
  function why(b) {
    if (isMark(b) && student()) {
      var ai = document.querySelector('#sec .ifsa button');
      return 'Your teacher gives these marks.' + (ai ? ' To get a mark now, tap “' + ai.textContent.trim() + '” and answer out loud.' : '');
    }
    var c = cur();
    if (c && c.st && c.st.marked) return 'This test is finished' + (c.st.tout ? ' (time ran out)' : '') + ', so answers can’t be changed. To try again, scroll down and tap “Retake this test”.';
    return 'This answer is already checked, so it can’t be changed.';
  }

  function mark() {
    var sec = document.getElementById('sec'); if (!sec) return;
    sec.querySelectorAll('button[disabled]').forEach(function (b) {
      if (!b.matches(SEL) || b.closest('.ifsa')) return;
      b.disabled = false; b.classList.add('lk'); b.setAttribute('aria-disabled', 'true'); b.style.cursor = '';
    });
    var mn = sec.querySelector('.marknote'), ai = sec.querySelector('.ifsa button');
    if (mn && ai && !mn.dataset.ai) { mn.dataset.ai = 1; mn.textContent = 'Your teacher gives these marks — or tap “' + ai.textContent.trim() + '” below to get an AI mark now.'; }
    var c = cur(), has = sec.querySelector('.lknote');
    if (c && c.st && c.st.marked && sec.querySelector('.opt,input.tx,[data-pick]')) {
      if (!has) {
        var p = document.createElement('p'); p.className = 'lknote';
        p.textContent = '🔒 This test is finished' + (c.st.tout ? ' — time ran out' : '') + '. You can see your answers, but you can’t change them. To try again, scroll down and tap “Retake this test”.';
        sec.insertBefore(p, sec.firstChild);
      }
    } else if (has) has.remove();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('#sec button.lk');
    if (!b) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    toast(why(b));
  }, true);

  var q = 0;
  function soon() { if (q) return; q = 1; requestAnimationFrame(function () { q = 0; mark(); }); }
  new MutationObserver(soon).observe(document.body, { childList: true, subtree: true });
  soon();
})();
