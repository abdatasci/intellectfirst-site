/* IF Admin AI: a chat panel for the director. Write what happened (payments, attendance, expenses, student
   changes) in plain English or Russian; the AI shows the exact changes and nothing is saved until "Apply". */
(function () {
  'use strict';
  if (window.__ifaAI) return; window.__ifaAI = true;
  var KEY = 'ifa.ai.chat', H = [];
  try { H = JSON.parse(sessionStorage.getItem(KEY)) || []; } catch (e) {}
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(H.slice(-30))); } catch (e) {} }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  async function api(path, body) {
    var r = await fetch('/api/ifadmin/' + path, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.status === 401 && window.NFIdentity && !api.r) { api.r = 1; try { await NFIdentity.refreshSession(); } catch (e) {} api.r = 0; return api(path, body); }
    var d = await r.json().catch(function () { return {}; });
    if (!r.ok) { var e = new Error(d.error || r.status); e.code = d.error; throw e; }
    return d;
  }
  var css = '#ifa-ai-b{position:fixed;right:18px;bottom:84px;z-index:2147483000;border:0;border-radius:999px;padding:12px 18px;font:700 15px/1 system-ui,-apple-system,Segoe UI,sans-serif;background:#14213D;color:#fff;box-shadow:0 12px 28px -10px rgba(10,24,47,.6);cursor:pointer;display:flex;gap:8px;align-items:center}' +
    '#ifa-ai-b i{font-style:normal;color:#E9C46A}' +
    '#ifa-ai{position:fixed;right:18px;bottom:84px;z-index:2147483001;width:min(440px,calc(100vw - 24px));height:min(680px,calc(100vh - 110px));background:#fff;border:1px solid #D8E1EE;border-radius:20px;box-shadow:0 30px 60px -20px rgba(10,24,47,.45);display:none;flex-direction:column;overflow:hidden;font:15px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;color:#1F2937}' +
    '#ifa-ai.on{display:flex}#ifa-ai header{display:flex;align-items:center;gap:10px;padding:14px 16px;background:#14213D;color:#fff}#ifa-ai header b{flex:1;font-size:16px}#ifa-ai header small{display:block;font-weight:400;opacity:.75;font-size:12px}' +
    '#ifa-ai header button{background:transparent;border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:10px;padding:5px 10px;font:inherit;font-size:13px;cursor:pointer}' +
    '#ifa-ai .ms{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#F7F9FC}' +
    '#ifa-ai .m{max-width:88%;padding:10px 13px;border-radius:14px;white-space:pre-wrap;word-wrap:break-word}#ifa-ai .m.u{align-self:flex-end;background:#14213D;color:#fff;border-bottom-right-radius:4px}#ifa-ai .m.a{align-self:flex-start;background:#fff;border:1px solid #E3E9F2;border-bottom-left-radius:4px}' +
    '#ifa-ai .ch{align-self:stretch;background:#fff;border:1px solid #E3E9F2;border-radius:14px;padding:12px}#ifa-ai .ch h4{margin:0 0 8px;font-size:14px}#ifa-ai .ch ul{list-style:none;margin:0 0 10px;padding:0}#ifa-ai .ch li{padding:6px 0 6px 22px;position:relative;border-top:1px solid #F0F3F8;font-size:14px}#ifa-ai .ch li:before{content:"✓";position:absolute;left:2px;color:#1E8E5A;font-weight:800}#ifa-ai .ch li.no:before{content:"!";color:#B42318}#ifa-ai .ch li.no{color:#B42318}' +
    '#ifa-ai .ch .bt{display:flex;gap:8px;flex-wrap:wrap}#ifa-ai .btn{border:0;border-radius:10px;padding:9px 14px;font:700 14px/1 inherit;cursor:pointer;background:#14213D;color:#fff}#ifa-ai .btn.g{background:transparent;color:#14213D;border:1px solid #CBD5E1}#ifa-ai .btn:disabled{opacity:.5;cursor:default}' +
    '#ifa-ai .ok{color:#1E8E5A;font-weight:700;font-size:14px}#ifa-ai .ex{display:flex;flex-wrap:wrap;gap:6px}#ifa-ai .ex button{border:1px solid #D8E1EE;background:#fff;border-radius:999px;padding:6px 10px;font:13px/1.3 inherit;cursor:pointer;text-align:left;color:#14213D}' +
    '#ifa-ai form{display:flex;gap:8px;padding:12px;border-top:1px solid #E3E9F2;background:#fff}#ifa-ai textarea{flex:1;resize:none;border:1px solid #D8E1EE;border-radius:12px;padding:10px 12px;font:inherit;min-height:44px;max-height:140px}' +
    '#ifa-ai .clip{display:grid;place-items:center;width:44px;border:1px solid #D8E1EE;border-radius:12px;cursor:pointer;font-size:19px;background:#fff}#ifa-ai .clip:hover{border-color:#14213D}' +
    '#ifa-ai .att{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px 0;background:#fff}#ifa-ai .att span{display:inline-flex;gap:6px;align-items:center;background:#EEF2F8;border-radius:999px;padding:5px 10px;font-size:13px}#ifa-ai .att button{border:0;background:none;cursor:pointer;font-size:14px;color:#64748B}' +
    '#ifa-ai .typing{align-self:flex-start;color:#64748B;font-size:14px}' +
    '@media (max-width:560px){#ifa-ai{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var btn = document.createElement('button'); btn.id = 'ifa-ai-b'; btn.type = 'button'; btn.innerHTML = '<i>✨</i> AI assistant'; document.body.appendChild(btn);
  var p = document.createElement('section'); p.id = 'ifa-ai'; p.setAttribute('aria-label', 'IF Admin AI assistant');
  p.innerHTML = '<header><b>IF Admin AI<small>Payments, attendance, expenses, students</small></b><button type="button" data-new>New chat</button><button type="button" data-x aria-label="Close">✕</button></header><div class="ms"></div>' +
    '<div class="att" hidden></div><form><label class="clip" title="Attach a photo or PDF (receipt, attendance sheet, list)">📎<input type="file" accept="image/*,application/pdf" multiple hidden></label><textarea rows="1" placeholder="e.g. Aru paid 45 000 for November by Kaspi"></textarea><button class="btn" type="submit">Send</button></form>';
  document.body.appendChild(p);
  var ms = p.querySelector('.ms'), ta = p.querySelector('textarea'), form = p.querySelector('form');
  var EX = ['Ameliya has paid: start her new package', 'A2 Teen: move the 26.10 lesson to 27.10', 'Aru paid 45 000 for November by Kaspi', 'B1 Teen-B today: all present except Dana; Ali excused', 'Who has not paid for November yet?', 'Expense today: 12 000 for printer paper, cash', 'Zere moves to B2 Group A', 'Freeze Liza until January'];

  function draw() {
    ms.innerHTML = '';
    if (!H.length) {
      ms.insertAdjacentHTML('beforeend', '<div class="m a">Tell me what to record, in English or Russian. I will show you the exact changes first; nothing is saved until you press <b>Apply</b>.</div><div class="ex">' + EX.map(function (x) { return '<button type="button">' + esc(x) + '</button>'; }).join('') + '</div>');
      ms.querySelectorAll('.ex button').forEach(function (b) { b.onclick = function () { ta.value = b.textContent; ta.focus(); }; });
    }
    H.forEach(function (m, i) {
      if (m.role === 'user') { if (!m.hidden) ms.insertAdjacentHTML('beforeend', '<div class="m u">' + esc(m.content) + '</div>'); }
      else {
        if (m.content) ms.insertAdjacentHTML('beforeend', '<div class="m a">' + esc(m.content) + '</div>');
        if (m.lines && m.lines.length) {
          var c = document.createElement('div'); c.className = 'ch';
          var good = m.lines.filter(function (l) { return l.ok; }).length;
          c.innerHTML = '<h4>' + (m.state === 'saved' ? 'Saved' : m.state === 'undone' ? 'Undone' : m.state === 'cancelled' ? 'Cancelled' : 'Changes to save') + ' (' + good + ')</h4><ul>' + m.lines.map(function (l) { return '<li class="' + (l.ok ? '' : 'no') + '">' + esc(l.text) + '</li>'; }).join('') + '</ul>' +
            (m.state === 'saved' ? '<div class="bt"><span class="ok">✓ Saved to IF Admin</span>' + (m.undo ? '<button class="btn g" data-undo>Undo</button>' : '') + '</div>'
              : m.state ? '' : '<div class="bt"><button class="btn" data-apply' + (good ? '' : ' disabled') + '>Apply ' + good + ' change' + (good === 1 ? '' : 's') + '</button><button class="btn g" data-cancel>Cancel</button></div>');
          ms.appendChild(c);
          var ap = c.querySelector('[data-apply]'), cn = c.querySelector('[data-cancel]'), un = c.querySelector('[data-undo]');
          if (ap) ap.onclick = function () { apply(i, ap); };
          if (cn) cn.onclick = function () { m.state = 'cancelled'; H.push({ role: 'user', content: '(Cancelled, nothing saved.)', hidden: true }); save(); draw(); };
          if (un) un.onclick = function () { undo(i, un); };
        }
      }
    });
    ms.scrollTop = ms.scrollHeight;
  }
  function changed() { try { window.dispatchEvent(new Event('ifadmin:changed')); } catch (e) {} }
  async function apply(i, b) {
    var m = H[i]; b.disabled = true; b.textContent = 'Saving…';
    try { var r = await api('ai/apply', { ops: m.ops }); m.state = 'saved'; m.undo = r.undo; m.lines = (r.lines && r.lines.length) ? r.lines : m.lines; H.push({ role: 'user', content: '(Applied and saved.)', hidden: true }); save(); draw(); changed(); }
    catch (e) { b.disabled = false; b.textContent = 'Apply'; alert('Could not save. Please try again.'); }
  }
  async function undo(i, b) {
    var m = H[i]; b.disabled = true;
    try { await api('ai/undo', { id: m.undo }); m.state = 'undone'; H.push({ role: 'user', content: '(Undone: those changes were reversed.)', hidden: true }); save(); draw(); changed(); }
    catch (e) { b.disabled = false; alert('Could not undo (maybe something else changed since). Please fix it by hand.'); }
  }
  /* attachments: photos are shrunk to 1600px JPEG; PDFs up to 4 MB */
  var FILES = [], att = p.querySelector('.att'), fin = p.querySelector('.clip input');
  function drawAtt() { att.hidden = !FILES.length; att.innerHTML = FILES.map(function (f, i) { return '<span>' + (f.type === 'application/pdf' ? '📄 ' : '🖼 ') + esc(f.name) + '<button type="button" data-rm="' + i + '" aria-label="Remove">✕</button></span>'; }).join(''); att.querySelectorAll('[data-rm]').forEach(function (b) { b.onclick = function () { FILES.splice(+b.dataset.rm, 1); drawAtt(); }; }); }
  function readAs(file) { return new Promise(function (ok, no) { var r = new FileReader(); r.onload = function () { ok(r.result); }; r.onerror = no; r.readAsDataURL(file); }); }
  async function shrink(file) {
    var url = await readAs(file);
    var img = await new Promise(function (ok, no) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = no; i.src = url; });
    var k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement('canvas');
    c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.85);
  }
  fin.onchange = async function () {
    for (var i = 0; i < fin.files.length && FILES.length < 4; i++) {
      var f = fin.files[i];
      try {
        if (f.type === 'application/pdf') { if (f.size > 4e6) { alert(f.name + ' is larger than 4 MB.'); continue; } FILES.push({ name: f.name, type: f.type, data: (await readAs(f)).split(',')[1] }); }
        else if (/^image\//.test(f.type)) FILES.push({ name: f.name, type: 'image/jpeg', data: (await shrink(f)).split(',')[1] });
      } catch (e) { alert('Could not read ' + f.name); }
    }
    fin.value = ''; drawAtt(); ta.focus();
  };
  async function send(text) {
    text = String(text || '').trim();
    var files = FILES.splice(0); drawAtt();
    if (!text && !files.length) return;
    if (!text) text = 'Please read the attached file and record what it shows.';
    H.push({ role: 'user', content: text + (files.length ? '\n[Attached: ' + files.map(function (f) { return f.name; }).join(', ') + ']' : '') }); save(); draw();
    ta.value = ''; form.querySelector('button').disabled = true;
    ms.insertAdjacentHTML('beforeend', '<div class="typing">✨ Working it out…</div>'); ms.scrollTop = ms.scrollHeight;
    var msgs = H.map(function (m) { return { role: m.role, content: m.role === 'assistant' ? (m.content || '') + (m.lines ? '\n[Proposed: ' + m.lines.map(function (l) { return l.text; }).join(' | ') + ']' + (m.state ? ' [' + m.state + ']' : '') : '') : m.content }; });
    try { var r = await api('ai', { messages: merge(msgs), files: files.map(function (f) { return { type: f.type, data: f.data }; }) }); H.push({ role: 'assistant', content: r.reply || r.summary || '', ops: r.ops || null, lines: r.lines || null }); }
    catch (e) { H.push({ role: 'assistant', content: e.code === 'ai' ? 'The AI is busy right now. Please try again in a moment.' : e.code === 'too big' ? 'The attachments are too large. Send fewer or smaller files.' : 'Something went wrong. Please try again.' }); }
    save(); form.querySelector('button').disabled = false; draw(); ta.focus();
  }
  function merge(a) {   // the API needs alternating turns: join neighbours with the same role
    var out = []; a.forEach(function (m) { if (out.length && out[out.length - 1].role === m.role) out[out.length - 1].content += '\n' + m.content; else out.push({ role: m.role, content: m.content }); });
    while (out.length && out[0].role !== 'user') out.shift();
    return out.slice(-12);
  }
  form.onsubmit = function (ev) { ev.preventDefault(); send(ta.value); };
  ta.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); send(ta.value); } });
  ta.addEventListener('input', function () { ta.style.height = 'auto'; ta.style.height = Math.min(140, ta.scrollHeight) + 'px'; });
  btn.onclick = function () { p.classList.add('on'); btn.style.display = 'none'; draw(); ta.focus(); };
  p.querySelector('[data-x]').onclick = function () { p.classList.remove('on'); btn.style.display = ''; };
  p.querySelector('[data-new]').onclick = function () { H = []; save(); draw(); ta.focus(); };
  window.IFAdminAI = { open: function () { btn.onclick(); } };
})();
