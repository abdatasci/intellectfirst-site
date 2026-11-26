/* Test centres: every speaking task gets "Talk to the examiner". NOVA or ATLAS (British voice) asks the task's own questions,
   the student answers out loud, AI marks the task and the mark is entered for them (the teacher can still change it).
   Works with the test centres' mark buttons ([data-task] … data-n). Loaded into the test pages with autosave.js. */
(function () {
  'use strict';
  if (window.__ifSpeakAI) return; window.__ifSpeakAI = true;
  var busy = {};
  function css() {
    if (document.getElementById('ifsa-css')) return;
    var s = document.createElement('style'); s.id = 'ifsa-css';
    s.textContent = '.ifsa{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:10px 0}.ifsa button{border:0;border-radius:999px;padding:10px 16px;font:700 15px/1.2 system-ui,-apple-system,Segoe UI,sans-serif;cursor:pointer;color:#fff;background:linear-gradient(135deg,#1d4ed8,#7c3aed);box-shadow:0 6px 18px -8px rgba(29,78,216,.7)}' +
      '.ifsa button:disabled{opacity:.6;cursor:default}.ifsa small{color:#5b6b85;font:13px/1.4 system-ui,sans-serif}.ifsa-res{margin:8px 0;padding:10px 14px;border-radius:12px;background:#eef7f1;border:1px solid #cfe3d6;color:#1d4d33;font:14px/1.45 system-ui,sans-serif}.ifsa-res.no{background:#fbf3df;border-color:#ecd9a8;color:#5c4511}';
    document.head.appendChild(s);
  }
  function examiner() {
    if (window.IFExaminer) return Promise.resolve(window.IFExaminer);
    return new Promise(function (ok) { var x = document.createElement('script'); x.src = '/tests/examiner.js?v=6'; x.onload = function () { ok(window.IFExaminer || null); }; x.onerror = function () { ok(null); }; document.head.appendChild(x); });
  }
  var txt = function (el) { return el ? String(el.textContent || '').replace(/\s+/g, ' ').trim() : ''; };
  function levelOf() {
    var t = document.title + ' ' + location.pathname, m = t.match(/\b(A1|A2|B1|B2|C1|C2)\b/);
    if (/yl-tests|young|starters|movers|flyers/i.test(t)) return 'YL';
    if (/elementary/i.test(t) && !/pre/i.test(t)) return 'A1'; if (/pre-?int/i.test(t)) return 'A2'; if (/upper/i.test(t)) return 'B2'; if (/advanced/i.test(t)) return 'C1';
    return m ? m[1] : 'B1';
  }
  /* Speaking marked by criteria (English File tests: Grammar, Vocabulary, Pronunciation…, each 0–5): one conversation over
     all the speaking tasks above the marks, then AI gives a mark for every criterion (26 Nov 2026). */
  function setupCrit(box) {
    if (box.__ifsa) return; box.__ifsa = true;
    var rows = [].slice.call(box.querySelectorAll('.rate.crit')).filter(function (g) { return g.querySelector('button[data-task]'); }); if (!rows.length) return;
    var crit = rows.map(function (g) { return txt(g.querySelector('.lab')) || g.getAttribute('aria-label') || 'Speaking'; });
    var max = Math.max.apply(null, [].slice.call(rows[0].querySelectorAll('button[data-task]')).map(function (b) { return +b.dataset.n || 0; }));
    var tasks = [].slice.call((box.parentNode || document).querySelectorAll('.task')).filter(function (t) { return t !== box && /task\s*\d/i.test(txt(t.querySelector('h3,h4'))); });
    var qs = [], mins = 0;
    tasks.forEach(function (t) {
      var lis = [].slice.call(t.querySelectorAll('li')).map(txt).filter(function (q) { return q.length > 3; });
      var meta = txt(t.querySelector('.meta')), lead = meta.replace(/^About \d+ minutes?\.\s*/i, ''), m = +((meta.match(/(\d+)\s*min/) || [])[1]) || 0, cue = txt(t.querySelector('.card,.cue,blockquote'));
      var asks = lis.filter(function (q) { return /\?$/.test(q); });
      if (asks.length) asks.slice(0, 2).forEach(function (q) { qs.push(q); });
      else if (lis.length || cue || lead) { qs.push((lead ? lead + ' ' : '') + (cue ? cue + ' ' : '') + lis.join(' ')); mins = Math.max(mins, m); }
    });
    qs = qs.filter(function (q) { return q.trim(); }).slice(0, 6); if (!qs.length) return;
    css();
    var bar = document.createElement('div'); bar.className = 'ifsa';
    bar.innerHTML = '<button type="button">🎙 Talk to the examiner</button><small>NOVA or ATLAS asks the speaking tasks out loud (' + qs.length + ' question' + (qs.length === 1 ? '' : 's') + '); you answer and AI gives a mark for ' + crit.join(', ') + '.</small>';
    rows[0].parentNode.insertBefore(bar, rows[0]);
    var go = bar.querySelector('button');
    if (lastNote.crit) { var kn = document.createElement('div'); kn.className = 'ifsa-res ' + lastNote.crit[0]; kn.innerHTML = lastNote.crit[1]; bar.parentNode.insertBefore(kn, bar.nextSibling); }
    function note(cls, html) { lastNote.crit = [cls, html]; var cur = document.querySelector('.ifsa-crit-res'); if (cur) cur.remove(); var b = document.querySelector('.ifsa.crit') || bar; var n = document.createElement('div'); n.className = 'ifsa-res ifsa-crit-res ' + cls; n.innerHTML = html; b.parentNode.insertBefore(n, b.nextSibling); }
    bar.classList.add('crit');
    go.onclick = function () {
      if (busy.crit) return; busy.crit = 1; go.disabled = true;
      try { speechSynthesis.cancel(); } catch (e) {}
      examiner().then(function (E) {
        if (!E) throw new Error('load');
        return E.run(document.body, { lv: levelOf(), title: document.title, qs: qs, mins: mins ? Math.min(mins, 3) : 0, skip: 'Cancel' });
      }).then(function (ans) {
        if (!ans) return null;
        note('', '<b>Marking your speaking…</b>');
        var post = function () { return fetch('/api/tests/speakmark', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lv: levelOf(), title: document.title, task: 'Speaking', max: max, crit: crit, answers: ans }) })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, status: r.status, d: d }; }); }); };
        return post().then(function (x) { return x.ok || x.status === 401 || x.status === 400 ? x : post(); });
      }).then(function (x) {
        if (!x) return;
        if (!x.ok || !x.d.marks) { note('no', x.status === 401 ? '<b>Sign in to get an AI mark.</b> <a href="/me/#/login" target="_blank" rel="noopener">Sign in</a>, then try again. Your teacher can also give the marks.' : x.status === 400 ? '<b>We did not hear enough to mark.</b> Try again and answer in full sentences.' : '<b>The AI marks could not be given just now.</b> Try again, or your teacher will mark the speaking.'); return; }
        var got = [];
        x.d.marks.forEach(function (v, i) {
          if (v == null) return; got.push(esc(crit[i]) + ' ' + v);
          var live = [].slice.call(document.querySelectorAll('.rate.crit button[data-task="' + rows[i].querySelector('button[data-task]').dataset.task + '"]'));
          var b = live.filter(function (z) { return +z.dataset.n === v; })[0];
          if (b && b.getAttribute('aria-pressed') !== 'true') { var dis = b.disabled, lk = b.classList.contains('lk'); b.disabled = false; b.classList.remove('lk'); b.click(); b.disabled = dis; if (lk) b.classList.add('lk'); }
        });
        var tot = x.d.marks.reduce(function (a, v) { return a + (v || 0); }, 0);
        note('', '<b>✓ AI marks: ' + got.join(' · ') + ' (' + tot + ' / ' + (x.d.max * crit.length) + ')</b> ' + (x.d.comment ? esc(x.d.comment) : '') + ' <small>(your teacher can change them)</small>');
      }).catch(function () { note('no', '<b>The examiner could not start.</b> Your teacher will mark the speaking.'); })
        .then(function () { delete busy.crit; go.disabled = false; });
    };
  }
  function setup(group) {
    if (group.__ifsa) return; group.__ifsa = true;
    var btns = [].slice.call(group.querySelectorAll('button[data-task]')); if (!btns.length) return;
    var card = group.closest('.task,.sp,.card,section,article') || group.parentNode;
    var max = Math.max.apply(null, btns.map(function (b) { return +b.dataset.n || 0; }));
    var head = txt(card.querySelector('h3,h4')) || 'Speaking';
    var lis = [].slice.call(card.querySelectorAll('li')).map(txt).filter(Boolean);
    var cue = txt(card.querySelector('.card,.cue,blockquote'));
    var meta = txt(card.querySelector('.meta')), mins = +((meta.match(/(\d+)\s*min/) || [])[1]) || 0;
    var longTurn = /long turn|talk alone|alone|presentation|monologue/i.test(head + ' ' + meta) || (cue && lis.length && !/\?$/.test(lis[0]));
    var qs = longTurn ? [(cue ? cue + ' ' : '') + (lis.length ? 'Talk about: ' + lis.join('; ') + '.' : '')] : lis.filter(function (q) { return q.length > 3; }).slice(0, 4);
    if (!qs.length || !qs[0].trim()) qs = cue ? [cue] : [];
    if (!qs.length) return;
    css();
    var bar = document.createElement('div'); bar.className = 'ifsa';
    bar.innerHTML = '<button type="button">🎙 Talk to the examiner</button><small>NOVA or ATLAS asks ' + (longTurn ? 'this task' : 'these questions') + ' out loud; you answer and AI gives the mark for this task.</small>';
    group.parentNode.insertBefore(bar, group);
    var go = bar.querySelector('button');
    var keep = lastNote[btns[0].dataset.task]; if (keep) { var kn = document.createElement('div'); kn.className = 'ifsa-res ' + keep[0]; kn.innerHTML = keep[1]; bar.parentNode.insertBefore(kn, bar.nextSibling); }
    go.onclick = function () {
      var tk = btns[0].dataset.task; if (busy[tk]) return; busy[tk] = 1; go.disabled = true;
      var old = card.querySelector('.ifsa-res'); if (old) old.remove();
      try { speechSynthesis.cancel(); } catch (e) {}
      examiner().then(function (E) {
        if (!E) throw new Error('load');
        return E.run(document.body, { lv: levelOf(), title: document.title, qs: qs, mins: longTurn ? (mins || 2) : 0, skip: 'Cancel' });
      }).then(function (ans) {
                if (!ans) return null;
        note('', '<b>Marking your speaking…</b>');
        var post = function () { return fetch('/api/tests/speakmark', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lv: levelOf(), title: document.title, task: head, max: max, answers: ans }) })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, status: r.status, d: d }; }); }); };
        return post().then(function (x) { return x.ok || x.status === 401 || x.status === 400 ? x : post(); });   // one automatic retry, so marking does not depend on a tap
      }).then(function (x) {
        if (!x) return;
        if (!x.ok) { note('no', x.status === 401 ? '<b>Sign in to get an AI mark.</b> <a href="/me/#/login" target="_blank" rel="noopener">Sign in</a>, then try again. Your teacher can also mark this task.' : '<b>The AI mark could not be given just now.</b> Try again, or your teacher will mark this task.'); return; }
        // the page may have re-drawn the speaking section: use the buttons on the page now
        var live = [].slice.call(document.querySelectorAll('.rate button[data-task="' + tk + '"]'));
        var b = (live.length ? live : btns).filter(function (z) { return +z.dataset.n === x.d.mark; })[0];
        if (b && b.getAttribute('aria-pressed') !== 'true') { var dis = b.disabled, lk = b.classList.contains('lk'); b.disabled = false; b.classList.remove('lk'); b.click(); b.disabled = dis; if (lk) b.classList.add('lk'); }
        note('', '<b>✓ AI mark: ' + x.d.mark + ' / ' + x.d.max + '</b> ' + (x.d.comment ? esc(x.d.comment) : '') + ' <small>(your teacher can change it)</small>');
      }).catch(function () { note('no', '<b>The examiner could not start.</b> Your teacher will mark this task.'); })
        .then(function () { delete busy[tk]; go.disabled = false; });
    };
    function note(cls, html) { var g = document.querySelector('.rate button[data-task="' + btns[0].dataset.task + '"]'), grp = g ? g.closest('.rate') : group, b2 = grp.previousElementSibling && grp.previousElementSibling.classList.contains('ifsa') ? grp.previousElementSibling : bar; var n = b2.parentNode.querySelector('.ifsa-res'); if (!n) { n = document.createElement('div'); b2.parentNode.insertBefore(n, b2.nextSibling); } n.className = 'ifsa-res ' + cls; n.innerHTML = html; lastNote[btns[0].dataset.task] = [cls, html]; }
  }
  var lastNote = {};
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function scan() {
    [].slice.call(document.querySelectorAll('.rate')).forEach(function (g) {
      if (!g.querySelector('button[data-task]')) return;
      if (g.classList.contains('crit')) { var box = g.closest('.task') || g.parentNode; if (box) setupCrit(box); return; }
      setup(g);
    });
  }
  var t = null; new MutationObserver(function () { clearTimeout(t); t = setTimeout(scan, 150); }).observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();
