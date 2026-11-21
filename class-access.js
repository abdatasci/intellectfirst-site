/* IF Academy — what a student registered in a class may see.
   From /api/school/me (student level, their classes and each class's coursebook) work out study keys, the same keys
   IF App uses for goals: book:ef-b1, ge:B1, ielts, be:B2, ket, pet, yl:movers …
   Staff and students without a class get null (no restriction).
   A student can also be given a personal level by staff (student.appLevel, set in Admin → Students). Then the app follows
   that level and not the class's: only that level's materials, at the student's own pace. IF App opens the next level when
   most of the current one is done (see ownKeys in app/ifx.js). */
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
      if (/intermediate ?(plus|\+)/.test(t)) return 'ef-b1p';
      if (/intermediate/.test(t)) return 'ef-b1';
      if (/beginner/.test(t)) return 'ef-a0';
      if (/elementary/.test(t)) return 'ef-a1';
      var l = levelIn(t); return l ? 'ef-' + l.toLowerCase() : '';
    }
    if (/teen/.test(t)) return levelIn(t) === 'B2' || /b2\s*[–-]\s*c1/.test(t) ? 'teens-b2' : 'teens-b1';
    if (/grammar in use/.test(t)) return 'giu';
    return '';
  }
  var SAME = { A0: ['ef-a0', 'ef-a1'], A1: ['ef-a1'], A2: ['ef-a2'], B1: ['ef-b1', 'ef-b1p', 'teens-b1'], B2: ['ef-b2', 'teens-b2'], C1: ['ef-c1'], C2: ['ef-c2'] };
  var BL = { 'ef-a0': 'A0', 'ef-a1': 'A1', 'ef-a2': 'A2', 'ef-b1': 'B1', 'ef-b1p': 'B1', 'ef-b2': 'B2', 'ef-c1': 'C1', 'ef-c2': 'C2', 'teens-b1': 'B1', 'teens-b2': 'B2', giu: 'B1' };
  var ORDER = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'], NAMES = { A0: 'Beginner', A1: 'Elementary', A2: 'Pre-intermediate', B1: 'Intermediate', B2: 'Upper-intermediate', C1: 'Advanced', C2: 'Proficiency' };
  /** The personal level set by staff, or ''. */
  function own(me) { var l = String((me && me.student && me.student.appLevel) || '').toUpperCase(); return ORDER.indexOf(l) >= 0 ? l : ''; }
  /** Study keys for one level: the AI-Generated course and every coursebook of that level. */
  var PRIMARY = { A0: 'ef-a0', A1: 'ef-a1', A2: 'ef-a2', B1: 'ef-b1', B2: 'ef-b2', C1: 'ef-c1', C2: 'ef-c2' };   // the English Files book of each level
  function forLevel(lv) { return ['ge:' + (lv === 'A0' ? 'A1' : lv), 'book:' + PRIMARY[lv]].concat(/^(B2|C1|C2)$/.test(lv) ? ['ielts'] : []); }
  function nextLevel(lv) { var i = ORDER.indexOf(lv); return i >= 0 && i < ORDER.length - 1 ? ORDER[i + 1] : ''; }
  function keys(me) {
    if (!me || !me.profile || me.access === 'staff' || /teacher|admin/.test(me.profile.role || '')) return null;
    var cls = me.classes || [], st = me.student; if (!st) return null;
    if (own(me)) return forLevel(own(me));   // a personal level: that level only, whatever the class is studying
    if (!cls.length) return null;
    // individual students (with a local or a native teacher) may use every level A1–C1
    var indiv = function (c) { return /^c-ind-/.test(c.id || '') || /individual|1[- ]?(to|on)[- ]?1/i.test(c.label || ''); };
    var books = me.books || [], out = [], add = function (k) { if (k && out.indexOf(k) < 0) out.push(k); };
    var lv = '', kids = false, biz = false;   // the class decides the level (its coursebook, then its name); the student's own level only if the class has none
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
    if (!lv) lv = levelIn(st.level);
    /* Director's rule, 20 Nov 2026, to avoid confusion: a student sees their own level only.
         A0 to B1   the class coursebook (or the English Files book of the level) + General English of the level
         B2         the same for B2, plus IELTS
         C1 and C2  both levels, plus IELTS
         IELTS      IELTS, plus the B2, C1 and C2 materials
       An individual student whose level is not known keeps every level, as before. */
    var isI = out.indexOf('ielts') >= 0 && (!lv || /^(B2|C1|C2)$/.test(lv)), ge = function (l) { add('ge:' + (l === 'A0' ? 'A1' : l)); };
    if (cls.some(indiv) && !lv && !isI) {
      add('book:ef-a0'); ['A1', 'A2', 'B1', 'B2', 'C1'].forEach(function (l) { add('ge:' + l); add('book:' + PRIMARY[l]); });
    }
    /* Director's rule, 21 Nov 2026: up to B1 a class sees its own course only, by default. A PET or KET class sees PET or
       KET; a class with a coursebook sees that book. General English and the English Files book of the level are added
       only when the class has neither (so the student still has something to study). Other courses stay open in Courses. */
    var low = /^(A0|A1|A2|B1)$/.test(lv), exam = out.indexOf('pet') >= 0 || out.indexOf('ket') >= 0, hasBook = out.some(function (k) { return /^book:/.test(k); });
    if (lv && !kids && low && !biz && (exam || hasBook)) { /* own course only */ }
    else if (lv && !kids) {
      if (biz) add('be:' + (lv === 'A1' || lv === 'A0' ? 'A2' : lv === 'C2' ? 'C1' : lv)); else ge(lv);
      if (!out.some(function (k) { return /^book:/.test(k); })) add('book:' + PRIMARY[lv]);   // no coursebook set for the class: the English Files book of its level
      if (lv === 'B2') add('ielts');
      if (lv === 'C1' || lv === 'C2') { ge('C1'); ge('C2'); add('book:ef-c1'); add('book:ef-c2'); add('ielts'); }
    }
    if (isI) ['B2', 'C1', 'C2'].forEach(function (l) { ge(l); add('book:' + PRIMARY[l]); });
    return out.length ? out : null;
  }
  /* Test centres a student may see, by study key */
  function testPaths(k) {
    var P = { 'book:ef-a1': '/a/ef-a1-tests/', 'book:ef-a2': '/a/ef-a2-tests/', 'book:ef-b1': '/a/ef-b1-tests/', 'book:ef-b2': '/a/ef-b2-tests/', 'book:ef-c1': '/a/ef-c1-tests/', 'book:teens-b1': '/a/teens-b1-tests/', 'book:teens-b2': '/a/teens-b2-tests/', pet: '/a/pet-tests/', ielts: '/a/ielts/', 'yl:starters': '/a/starters-tests/', 'yl:movers': '/a/movers-tests/', 'yl:flyers': '/a/flyers-tests/' };
    return P[k] || '';
  }
  window.IFClass = { keys: keys, bookKey: bookKey, testPaths: testPaths, level: levelIn, own: own, forLevel: forLevel, nextLevel: nextLevel, levelName: function (l) { return NAMES[l] || ''; } };
})();
