/* Staff page: make a guest pass (name, level, what to show), then show the QR code to scan or print. */
(function () {
  var $ = function (s) { return document.querySelector(s); }, esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var LEVELS = ['Starters', 'Movers', 'Flyers', 'A1', 'A2', 'B1', 'B2', 'C1'];
  var SHOW = [['roblox', 'Run and climb (like Roblox)'], ['race', 'Race games'], ['minecraft', 'Block world (like Minecraft)'], ['mindlab', 'IF Mind Lab'], ['lessons', 'Words and lessons']];
  var view = $('#view');
  async function api(path, body, again) {
    var r = await fetch('/api/pass/' + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), credentials: 'same-origin' } : { credentials: 'same-origin' });
    if (r.status === 401 && !again && window.NFIdentity) { try { await NFIdentity.refreshSession(); } catch (e) {} return api(path, body, true); }
    var d = await r.json().catch(function () { return {}; }); if (!r.ok) { var e = new Error(d.error || r.status); e.status = r.status; throw e; } return d;
  }
  function link(code) { return location.origin + '/pass/?c=' + code; }
  function qr(text) { var q = qrcode(0, 'M'); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); }
  function ticket(p) {
    var u = link(p.code);
    return '<div class="panel ticket" id="ticket"><h3>' + esc(p.name) + '</h3><p style="margin:4px 0;color:#5d6676">' + esc(p.level) + ' · free for ' + p.days + ' days from the first scan</p><div class="qr">' + qr(u) + '</div><p class="url">' + esc(u) + '</p>' +
      '<p class="noprint" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="btn gold" id="copy">Copy the link</button><button class="btn ghost" id="print">Print</button><a class="btn ghost" href="' + esc(u) + '" target="_blank" rel="noopener">Open it</a></p>' +
      '<p class="noprint" style="font-size:13px;color:#5d6676">Opening the link starts the ' + p.days + ' days. Use "Open it" only to check.</p></div>';
  }
  function bindTicket(p) { var c = $('#copy'); if (c) c.onclick = function () { navigator.clipboard.writeText(link(p.code)).then(function () { c.textContent = 'Copied ✓'; }); }; var pr = $('#print'); if (pr) pr.onclick = function () { window.print(); }; }
  async function draw(made) {
    var list;
    try { list = (await api('list')).passes; }
    catch (e) { view.innerHTML = '<div class="panel"><h2 style="margin-top:0">Guest passes</h2><p>' + (e.status === 401 ? 'Please sign in with your teacher account first.' : e.status === 403 ? 'This page is for teachers and staff.' : 'Could not load. Check the connection and try again.') + '</p><a class="btn" href="/me/#/login?next=/pass/new/">Sign in</a></div>'; return; }
    view.innerHTML = (made ? ticket(made) : '') +
      '<div class="panel noprint"><h2 style="margin-top:0">New guest pass</h2><p class="sd">For someone who is not a student yet. No account is needed: they scan the QR code and play.</p>' +
      '<label class="f">Name</label><input type="text" id="nm" maxlength="60" autocomplete="off" placeholder="First name and surname">' +
      '<label class="f">Level</label><select id="lv">' + LEVELS.map(function (l) { return '<option' + (l === 'Movers' ? ' selected' : '') + '>' + l + '</option>'; }).join('') + '</select>' +
      '<label class="f">Show</label><div class="chips">' + SHOW.map(function (s) { return '<label><input type="checkbox" value="' + s[0] + '"' + (s[0] === 'lessons' ? '' : ' checked') + '> ' + s[1] + '</label>'; }).join('') + '</div>' +
      '<label class="f">Free for</label><select id="dy"><option value="3" selected>3 days</option><option value="1">1 day</option><option value="7">7 days</option><option value="14">14 days</option></select>' +
      '<p class="err" id="err"></p><button class="btn gold" id="go">Make the QR code</button></div>' +
      '<div class="panel noprint"><h2 style="margin-top:0">Passes made</h2>' + (list.length ? list.map(function (p) { return '<div class="row"><div><b>' + esc(p.name) + '</b> · ' + esc(p.level) + '<small>' + esc(p.state) + (p.until && p.state === 'active' ? ' until ' + new Date(p.until).toLocaleString() : '') + ' · made ' + new Date(p.created).toLocaleDateString() + '</small></div><div style="display:flex;gap:6px"><button class="btn ghost" data-show="' + esc(p.code) + '">QR</button>' + (p.state === 'active' || p.state === 'not opened yet' ? '<button class="btn ghost" data-end="' + esc(p.code) + '">End</button>' : '') + '</div></div>'; }).join('') : '<p class="sd">No passes yet.</p>') + '</div>';
    if (made) bindTicket(made);
    $('#go').onclick = async function () {
      var name = $('#nm').value.trim(), show = [].slice.call(document.querySelectorAll('.chips input:checked')).map(function (i) { return i.value; });
      if (!name) { $('#err').textContent = 'Write the name.'; return; } if (!show.length) { $('#err').textContent = 'Choose at least one thing to show.'; return; }
      $('#go').disabled = true;
      try { var r = await api('new', { name: name, level: $('#lv').value, show: show, days: +$('#dy').value }); draw(r.pass); window.scrollTo(0, 0); }
      catch (e) { $('#go').disabled = false; $('#err').textContent = 'Could not make the pass. Try again.'; }
    };
    view.querySelectorAll('[data-show]').forEach(function (b) { b.onclick = function () { var p = list.filter(function (x) { return x.code === b.dataset.show; })[0]; draw(p); window.scrollTo(0, 0); }; });
    view.querySelectorAll('[data-end]').forEach(function (b) { b.onclick = async function () { b.disabled = true; try { await api('end', { code: b.dataset.end }); } catch (e) {} draw(); }; });
  }
  draw();
})();
