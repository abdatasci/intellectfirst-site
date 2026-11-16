/* IF Academy — what a student registered in a class may see.
   From /api/school/me (student level, their classes and each class's coursebook) work out study keys, the same keys
   IF App uses for goals: book:ef-b1, ge:B1, ielts, be:B2, ket, pet, yl:movers …
   Staff and students without a class get null (no restriction). */
(function () {
  var LV = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  function levelIn(t) {
    var m = String(t || '').toUpperCase().match(/\b(PRE[- ]?A1|A0|A1|A2|B1|B2|C1|C2)\b/); if (m) return /PRE/.test(m[1]) ? 'A0' : m[1];
    // groups named by the coursebook level (e.g. a new "Elementary" group)
    var w = String(t || '').toLowerCase();
    return /beginner|from zero/.test(w) ? 'A0' : /elementary/.test(w) && !/pre[- ]?int/.test(w) ? 'A1' : /pre[- ]?int/.test(w) ? 'A2' : /upper[- ]?int/.test(w) ? 'B2' : /\bintermediate/.test(w) ? 'B1' : /advanced/.test(w) ? 'C1' : '';
  }
  function bookKey(title) {
    var t = String(title || '').toLowerCase();
    if (/english file/.test(t)) {
      if (/advanced ?(plus|\+)/.test(t)) return 'ef-c2';
      if (/advanced/.test(t)) return 'ef-c1';
      if (/upper/.test(t)) return 'ef-b2';
      if (/pre[- ]?int/.test(t)) return 'ef-a2';
      if (/intermediate/.test(t)) return 'ef-b1';
      if (/beginner/.test(t)) return 'ef-a0';
      if (/elementary/.test(t)) return 'ef-a1';
      var l = levelIn(t); return l ? 'ef-' + l.toLowerCase() : '';
    }
    if (/teen/.test(t)) return levelIn(t) === 'B2' || /b2\s*[–-]\s*c1/.test(t) ? 'teens-b2' : 'teens-b1';
    if (/grammar in use/.test(t)) return 'giu';
    return '';
  }
  var SAME = { A0: ['ef-a0', 'ef-a1'], A1: ['ef-a1'], A2: ['ef-a2'], B1: ['ef-b1', 'teens-b1'], B2: ['ef-b2', 'teens-b2'], C1: ['ef-c1'], C2: ['ef-c2'] };
  var BL = { 'ef-a0': 'A0', 'ef-a1': 'A1', 'ef-a2': 'A2', 'ef-b1': 'B1', 'ef-b2': 'B2', 'ef-c1': 'C1', 'ef-c2': 'C2', 'teens-b1': 'B1', 'teens-b2': 'B2', giu: 'B1' };
  function keys(me) {
    if (!me || !me.profile || me.access === 'staff' || /teacher|admin/.test(me.profile.role || '')) return null;
    var cls = me.classes || [], st = me.student; if (!st || !cls.length) return null;
    // individual students (with a local or a native teacher) may use every level A1–C1
    var indiv = function (c) { return /^c-ind-/.test(c.id || '') || /individual|1[- ]?(to|on)[- ]?1/i.test(c.label || ''); };
    var books = me.books || [], out = [], add = function (k) { if (k && out.indexOf(k) < 0) out.push(k); };
    var lv = levelIn(st.level), kids = false, biz = false;
    cls.forEach(function (c) {
      var b = books.filter(function (x) { return x.id === c.bookId; })[0], text = ((b && b.title) || '') + ' ' + (c.label || ''), t = text.toLowerCase();
      var bk = bookKey(b && b.title); if (bk) { add('book:' + bk); if (!lv) lv = BL[bk]; }
      ['starters', 'movers', 'flyers'].forEach(function (y) { if (t.indexOf(y) >= 0) { add('yl:' + y); kids = true; } });
      if (/\bket\b|a2 key/.test(t)) { add('ket'); }
      if (/\bpet\b|preliminary/.test(t)) { add('pet'); }
      if (/ielts/.test(t)) { add('ielts'); }
      if (/business/.test(t)) biz = true;
      if (!lv) lv = levelIn(text);
    });
    if (cls.some(indiv)) {
      add('book:ef-a0'); ['A1', 'A2', 'B1', 'B2', 'C1'].forEach(function (l) { add('ge:' + l); (SAME[l] || []).forEach(function (bk) { add('book:' + bk); }); });
      if (lv === 'C2') { add('ge:C2'); add('book:ef-c2'); }
    }
    if (lv && !kids) {
      add(biz ? 'be:' + (lv === 'A1' || lv === 'A0' ? 'A2' : lv === 'C2' ? 'C1' : lv) : 'ge:' + (lv === 'A0' ? 'A1' : lv));
      // every coursebook of the same level is open too (English File B1 <-> English for Teenagers B1, and so on)
      (SAME[lv] || []).forEach(function (bk) { add('book:' + bk); });
    }
    return out.length ? out : null;
  }
  /* Test centres a student may see, by study key */
  function testPaths(k) {
    var P = { 'book:ef-a1': '/a/ef-a1-tests/', 'book:ef-a2': '/a/ef-a2-tests/', 'book:ef-b1': '/a/ef-b1-tests/', 'book:ef-b2': '/a/ef-b2-tests/', 'book:ef-c1': '/a/ef-c1-tests/', 'book:teens-b1': '/a/teens-b1-tests/', 'book:teens-b2': '/a/teens-b2-tests/', pet: '/a/pet-tests/', ielts: '/a/ielts/', 'yl:starters': '/a/starters-tests/', 'yl:movers': '/a/movers-tests/', 'yl:flyers': '/a/flyers-tests/' };
    return P[k] || '';
  }
  window.IFClass = { keys: keys, bookKey: bookKey, testPaths: testPaths, level: levelIn };
})();
