/* Runs the IF Admin app on intellectfirst.com: loads the app for admins and connects it to the website's
   private storage (/api/ifadmin) in place of claude.ai's database. */
(function () {
  var ID = window.NFIdentity;
  var box = document.getElementById('msg');
  function show(html) { box.innerHTML = '<h1>IF Admin</h1>' + html; }
  async function api(path, opts) {
    opts = opts || {};
    var init = { method: opts.method || 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' };
    if (opts.body !== undefined) init.body = JSON.stringify(opts.body);
    var r = await fetch('/api/ifadmin/' + path, init);
    if (r.status === 401 && !opts.retried && ID) { try { await ID.refreshSession(); } catch (e) {} return api(path, Object.assign({}, opts, { retried: true })); }
    if (!r.ok) { var e = new Error(r.status); e.status = r.status; try { e.code = (await r.json()).error; } catch (x) {} throw e; }
    return opts.text ? r.text() : r.json();
  }

  /* ---------- store with live listeners ---------- */
  var DATA = {}, STAMP = {}, LIS = {}, DOCLIS = {}, pending = 0, me = null;
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function snap(c) { var m = DATA[c] || {}; return { docs: Object.keys(m).map(function (id) { return { id: id, data: function () { return clone(m[id]); } }; }) }; }
  function emit(c) { (LIS[c] || []).forEach(function (cb) { try { cb(snap(c)); } catch (e) { console.error(e); } }); }
  function docRef(path) {
    var i = path.indexOf('/'), c = path.slice(0, i), id = path.slice(i + 1);
    return {
      set: function (obj) { DATA[c] = DATA[c] || {}; DATA[c][id] = clone(obj); setTimeout(function () { emit(c); }); pending++;
        return api('doc/' + c + '/' + encodeURIComponent(id), { method: 'PUT', body: obj }).finally(function () { pending--; }); },
      delete: function () { if (DATA[c]) delete DATA[c][id]; setTimeout(function () { emit(c); }); pending++;
        return api('doc/' + c + '/' + encodeURIComponent(id), { method: 'DELETE' }).finally(function () { pending--; }); },
      onSnapshot: function (cb) { var m = DATA[c] || {}; setTimeout(function () { cb({ exists: !!m[id], data: function () { return clone(m[id] || {}); } }); }); return function () {}; }
    };
  }
  var db = {
    collection: function (c) { return { onSnapshot: function (cb) { (LIS[c] = LIS[c] || []).push(cb); setTimeout(function () { cb(snap(c)); }); return function () { LIS[c] = (LIS[c] || []).filter(function (f) { return f !== cb; }); }; } }; },
    doc: docRef
  };
  async function poll() {
    if (pending || document.hidden) return;
    try {
      var s = (await api('stamp')).stamp || {};
      var changed = Object.keys(s).filter(function (c) { return s[c] !== STAMP[c]; });
      if (!changed.length) return;
      var all = await api('all'); STAMP = all.stamp || {};
      if (pending) return;
      changed.forEach(function (c) { if (JSON.stringify(all.collections[c] || {}) !== JSON.stringify(DATA[c] || {})) { DATA[c] = all.collections[c] || {}; emit(c); } });
    } catch (e) {}
  }
  function download(name, blob) { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); }
  window.claude = {
    use: function (cap) {
      if (cap === 'db') return Promise.resolve(db);
      if (cap === 'user') return Promise.resolve({ isOwner: function () { return Promise.resolve(!!me.main); }, canEdit: function () { return Promise.resolve(true); }, id: function () { return Promise.resolve(me.id); } });
      if (cap === 'downloads') return Promise.resolve({ save: function (o) { download(o.filename, o.data); return Promise.resolve(); } });
      return Promise.reject(new Error('unavailable'));
    }
  };

  /* ---------- toolbar: back to My account, backup, restore ---------- */
  function toolbar() {
    var bar = document.createElement('div');
    bar.style.cssText = 'max-width:1100px;margin:10px auto 0;padding:0 16px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;font:14px Calibri,Carlito,system-ui,sans-serif';
    bar.innerHTML = '<a href="/me/#/admin" style="color:inherit;font-weight:700">← My account · Admin</a><span style="flex:1"></span>' +
      '<button id="ifaBk" style="font:inherit;font-weight:700;border:1px solid #D8E1EE;background:transparent;color:inherit;border-radius:10px;padding:6px 12px;cursor:pointer">Download backup</button>' +
      '<label style="font-weight:700;border:1px solid #D8E1EE;border-radius:10px;padding:6px 12px;cursor:pointer">Restore backup<input type="file" id="ifaRs" accept=".json" hidden></label>';
    var main = document.querySelector('main'); if (main) main.parentNode.insertBefore(bar, main);
    document.getElementById('ifaBk').onclick = function () {
      download('IF-Admin-backup-' + new Date().toISOString().slice(0, 10) + '.json', new Blob([JSON.stringify({ format: 'if-admin-backup', v: 1, at: new Date().toISOString(), collections: DATA })], { type: 'application/json' }));
    };
    document.getElementById('ifaRs').onchange = function () { restoreFile(this.files[0]); };
  }
  async function restoreFile(f) {
    if (!f) return;
    var b; try { b = JSON.parse(await f.text()); } catch (e) { alert('That file is not an IF Admin backup.'); return; }
    if (!b || b.format !== 'if-admin-backup' || !b.collections) { alert('That file is not an IF Admin backup.'); return; }
    var n = Object.keys(b.collections.students || {}).length;
    if (!confirm('Load this backup (' + n + ' students, ' + Object.keys(b.collections.payments || {}).length + ' months of payments)? It replaces the data currently in IF Admin. A copy of the current data is kept on the server.')) return;
    try { var r = await api('restore', { method: 'POST', body: { collections: b.collections } }); alert('Backup loaded: ' + Object.keys(r.restored).map(function (k) { return k + ' ' + r.restored[k]; }).join(', ')); location.reload(); }
    catch (e) { alert('Could not load the backup. Please try again.'); }
  }

  /* ---------- AI assistant panel (write what happened; it proposes the changes) ---------- */
  function aiChat() { var sc = document.createElement('script'); sc.src = '/me/ifadmin/ai-chat.js'; document.body.appendChild(sc); }

  /* ---------- start ---------- */
  async function start() {
    var u = null; try { u = ID && await ID.getUser(); } catch (e) {}
    if (!u) { show('<p>Please sign in with your administrator account.</p><p><a class="btn" href="/me/#/login">Sign in</a></p>'); return; }
    try { me = await api('me'); } catch (e) {
      if (e.status === 403) show('<p>IF Admin is for administrators only.</p><p><a class="btn" href="/me/">My account</a></p>');
      else show('<p class="note">Could not load IF Admin. Please reload.</p>');
      return;
    }
    var html;
    try { html = await api('app', { text: true }); } catch (e) {
      if (e.status === 423) {
        show('<p>IF Admin is locked until the staff content key is set up. Enter your staff or administrator code once to unlock it.</p><input id="uc" placeholder="Staff or administrator code"><button class="btn gold" id="ub">Unlock</button><p class="note" id="um"></p>');
        document.getElementById('ub').onclick = async function () {
          var r = await fetch('/api/school/materials/unlock', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: document.getElementById('uc').value.trim() }) });
          if (r.ok) location.reload(); else document.getElementById('um').textContent = 'That code did not work.';
        };
      } else show('<p class="note">Could not load IF Admin. Please reload.</p>');
      return;
    }
    var all = await api('all'); DATA = all.collections || {}; STAMP = all.stamp || {};
    if (!Object.keys(DATA.students || {}).length) {
      show('<p>IF Admin has no data on the website yet. Load the backup file of your IF Admin data to start.</p><label class="btn gold">Choose backup file<input type="file" accept=".json" id="first" hidden></label>');
      document.getElementById('first').onchange = function () { restoreFile(this.files[0]); };
      return;
    }
    document.open(); document.write(html); document.close();
    var tries = 0, t = setInterval(function () { if (document.querySelector('main') || ++tries > 50) { clearInterval(t); toolbar(); aiChat(); } }, 100);
    window.addEventListener('ifadmin:changed', function () { setTimeout(poll, 300); });
    setInterval(poll, 20000); document.addEventListener('visibilitychange', function () { if (!document.hidden) poll(); });
  }
  start();
})();
