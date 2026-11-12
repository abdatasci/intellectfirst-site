/* IF Academy site runtime.
 * The apps were first built inside Claude, where `window.claude.use()` gave them a
 * shared database, the viewer's identity and file downloads. On the school website
 * this file provides the same calls, stored on this device (localStorage).
 * Results a student wants to share still travel by the result codes they send to
 * the teacher, exactly as before. AI marking ("sample") is not available here. */
(function () {
  if (window.claude && window.claude.use) return;
  var LS = (function () { try { var k = '__if_t'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return localStorage; } catch (e) { return null; } })();
  var mem = {};
  function lget(k) { try { return LS ? LS.getItem(k) : (k in mem ? mem[k] : null); } catch (e) { return null; } }
  function lset(k, v) { try { if (LS) LS.setItem(k, v); else mem[k] = v; } catch (e) {} }
  function ldel(k) { try { if (LS) LS.removeItem(k); else delete mem[k]; } catch (e) {} }

  var scope = (location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/home');
  var PREFIX = 'ifdb:' + scope + ':';

  function uid() {
    var id = lget('if.uid');
    if (!id) { id = 'u' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); lset('if.uid', id); }
    return id;
  }
  function isStaff() { return lget('if.role') === 'teacher'; }
  function err(code, message) { var e = new Error(message); e.code = code; e.message = message; return e; }
  function segs(p) { return String(p).split('/').filter(Boolean); }
  function check(p, even) {
    var s = segs(p);
    if (!s.length || s.some(function (x) { return !/^[A-Za-z0-9_\-.~:@+]+$/.test(x) || x === '.' || x === '..'; }))
      throw new TypeError('Invalid path: ' + p);
    if ((s.length % 2 === 0) !== even) throw new TypeError('Path has the wrong number of segments: ' + p);
    return s.join('/');
  }
  function freeze(o) { return JSON.parse(JSON.stringify(o)); }
  function readDoc(path) { var v = lget(PREFIX + path); if (v == null) return undefined; try { return JSON.parse(v); } catch (e) { return undefined; } }
  function allPaths() {
    var out = [];
    try {
      if (LS) { for (var i = 0; i < LS.length; i++) { var k = LS.key(i); if (k && k.indexOf(PREFIX) === 0) out.push(k.slice(PREFIX.length)); } }
      else Object.keys(mem).forEach(function (k) { if (k.indexOf(PREFIX) === 0) out.push(k.slice(PREFIX.length)); });
    } catch (e) {}
    return out;
  }
  function snap(path, body) {
    var s = segs(path); var data = body === undefined ? undefined : freeze(body);
    return { id: s[s.length - 1], exists: data !== undefined, data: function () { return data; }, metadata: { fromCache: false, hasPendingWrites: false }, ref: docRef(path) };
  }
  var listeners = [];
  function notify() {
    setTimeout(function () { listeners.slice().forEach(function (l) { try { l.fire(); } catch (e) { console.error(e); } }); }, 0);
  }
  window.addEventListener('storage', function (e) { if (e.key && e.key.indexOf(PREFIX) === 0) notify(); });

  function merge(a, b) {
    var o = Array.isArray(a) || typeof a !== 'object' || !a ? {} : freeze(a);
    Object.keys(b).forEach(function (k) {
      var v = b[k];
      if (v && typeof v === 'object' && !Array.isArray(v) && o[k] && typeof o[k] === 'object' && !Array.isArray(o[k])) o[k] = merge(o[k], v);
      else o[k] = v;
    });
    return o;
  }
  function bodyOk(d) { if (!d || typeof d !== 'object' || Array.isArray(d)) throw err('invalid_argument', 'Document body must be an object'); }

  function docRef(path) {
    path = check(path, true);
    var s = segs(path);
    return {
      id: s[s.length - 1], path: path,
      get: function () { return Promise.resolve(snap(path, readDoc(path))); },
      set: function (d) { try { bodyOk(d); } catch (e) { return Promise.reject(e); } lset(PREFIX + path, JSON.stringify(d)); notify(); return Promise.resolve(); },
      update: function (d) {
        try { bodyOk(d); } catch (e) { return Promise.reject(e); }
        var cur = readDoc(path); if (cur === undefined) return Promise.reject(err('invalid_argument', 'Document does not exist'));
        lset(PREFIX + path, JSON.stringify(merge(cur, d))); notify(); return Promise.resolve();
      },
      delete: function () { ldel(PREFIX + path); notify(); return Promise.resolve(); },
      acquire: function (o) {
        var cur = readDoc(path) || {}; if (o && o.data) { cur = merge(cur, o.data); lset(PREFIX + path, JSON.stringify(cur)); notify(); }
        return Promise.resolve({ acquired: true, version: 1, expiresAt: new Date(Date.now() + ((o && o.ttlMs) || 30000)).toISOString(), holder: o && o.holder });
      },
      onSnapshot: function (next, error) {
        var last = null;
        var l = { fire: function () { var b = readDoc(path); var j = JSON.stringify(b); if (j === last) return; last = j; next(snap(path, b)); } };
        listeners.push(l); setTimeout(function () { l.fire(); }, 0);
        return function () { var i = listeners.indexOf(l); if (i >= 0) listeners.splice(i, 1); };
      },
      collection: function (sub) { return collRef(path + '/' + sub); }
    };
  }
  function cmp(a, b) { if (a === b) return 0; if (a === undefined) return 1; if (b === undefined) return -1; return a < b ? -1 : 1; }
  function test(v, op, x) {
    switch (op) {
      case '==': return v === x || JSON.stringify(v) === JSON.stringify(x);
      case '!=': return !(v === x || JSON.stringify(v) === JSON.stringify(x));
      case '<': return v < x; case '<=': return v <= x; case '>': return v > x; case '>=': return v >= x;
      case 'in': return Array.isArray(x) && x.indexOf(v) >= 0;
      case 'not-in': return Array.isArray(x) && x.indexOf(v) < 0;
      case 'array-contains': return Array.isArray(v) && v.indexOf(x) >= 0;
    }
    return false;
  }
  function query(cpath, filters, order, lim) {
    function run() {
      var depth = segs(cpath).length + 1;
      var docs = allPaths().filter(function (p) { return p.indexOf(cpath + '/') === 0 && segs(p).length === depth; })
        .map(function (p) { return { p: p, b: readDoc(p) }; }).filter(function (d) { return d.b !== undefined; })
        .filter(function (d) { return filters.every(function (f) { return test(d.b[f[0]], f[1], f[2]); }); });
      docs.sort(function (a, b) {
        if (order) { var c = cmp(a.b[order[0]], b.b[order[0]]); if (c) return order[1] === 'desc' ? -c : c; }
        return a.p < b.p ? -1 : 1;
      });
      if (order && order[1] === 'desc') {
        var miss = docs.filter(function (d) { return d.b[order[0]] === undefined; });
        docs = docs.filter(function (d) { return d.b[order[0]] !== undefined; }).concat(miss);
      }
      if (lim) docs = docs.slice(0, lim);
      return docs;
    }
    function qsnap(docs, prev) {
      var ds = docs.map(function (d) { return snap(d.p, d.b); });
      var changes = [];
      var prevIdx = {}; (prev || []).forEach(function (d, i) { prevIdx[d.p] = i; });
      docs.forEach(function (d, i) {
        if (!(d.p in prevIdx)) changes.push({ type: 'added', doc: ds[i], oldIndex: -1, newIndex: i });
        else if (JSON.stringify(prev[prevIdx[d.p]].b) !== JSON.stringify(d.b) || prevIdx[d.p] !== i) changes.push({ type: 'modified', doc: ds[i], oldIndex: prevIdx[d.p], newIndex: i });
      });
      var now = {}; docs.forEach(function (d) { now[d.p] = 1; });
      (prev || []).forEach(function (d, i) { if (!now[d.p]) changes.push({ type: 'removed', doc: snap(d.p, d.b), oldIndex: i, newIndex: -1 }); });
      return { docs: ds, size: ds.length, empty: !ds.length, docChanges: function () { return changes; }, metadata: { fromCache: false, hasPendingWrites: false }, forEach: function (f) { ds.forEach(f); } };
    }
    return {
      where: function (f, op, v) { return query(cpath, filters.concat([[f, op, v]]), order, lim); },
      orderBy: function (f, dir) { return query(cpath, filters, [f, dir || 'asc'], lim); },
      limit: function (n) { return query(cpath, filters, order, n); },
      get: function () { return Promise.resolve(qsnap(run(), [])); },
      onSnapshot: function (next, error) {
        var prev = null, last = null;
        var l = { fire: function () { var d = run(); var j = JSON.stringify(d); if (j === last) return; var s = qsnap(d, prev || []); last = j; prev = d; next(s); } };
        listeners.push(l); setTimeout(function () { l.fire(); }, 0);
        return function () { var i = listeners.indexOf(l); if (i >= 0) listeners.splice(i, 1); };
      }
    };
  }
  function collRef(path) {
    path = check(path, false);
    var q = query(path, [], null, 0);
    q.path = path;
    q.id = segs(path).pop();
    q.doc = function (id) { return docRef(path + '/' + (id || ('d' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)))); };
    q.add = function (d) { var r = q.doc(); return r.set(d).then(function () { return r; }); };
    return q;
  }
  var db = { doc: docRef, collection: collRef };

  var user = {
    id: function () { return Promise.resolve(uid()); },
    me: function () { return Promise.resolve({ id: uid(), name: lget('if.name') || '', guest: false }); },
    isOwner: function () { return Promise.resolve(isStaff()); },
    canEdit: function () { return Promise.resolve(isStaff()); },
    can: function (n) { return Promise.resolve(n === 'data.write' ? true : isStaff()); },
    profiles: function (ids) { var o = {}; (ids || []).forEach(function (i) { o[i] = { id: i, name: i === uid() ? (lget('if.name') || '') : '' }; }); return Promise.resolve(o); },
    search: function () { return Promise.resolve([]); }
  };

  var downloads = {
    save: function (o) {
      try {
        var data = o.data, blob;
        if (data instanceof Blob) blob = data;
        else if (typeof data === 'string') blob = new Blob([data], { type: o.mimeType || o.type || 'text/plain' });
        else blob = new Blob([data], { type: o.mimeType || o.type || 'application/octet-stream' });
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = o.filename || 'download';
        document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        return Promise.resolve({ saved: true });
      } catch (e) { return Promise.reject(err('unavailable', String(e))); }
    }
  };
  var permissions = {
    state: function (n) { return Promise.resolve(n ? 'granted' : {}); },
    request: function () { return Promise.resolve({}); },
    manage: function () { return Promise.reject(err('unavailable', 'Not available on this site')); }
  };
  var caps = { db: db, user: user, downloads: downloads, permissions: permissions };
  window.claude = Object.freeze({ use: function (name) { return Promise.resolve(caps[name] || null); } });
})();
