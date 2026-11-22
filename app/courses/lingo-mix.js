/* IF Lingo: loaded last. The course files are written with the right answer mostly as the first choice, and the
   lesson player shows the choices in the order given. This moves the right answer evenly between A, B and C
   (the same place every time the page loads), so the first choice is not always the answer.
   Level tests are left alone: they are already spread. */
(function () {
  var n = 0, done = [];
  IFX.all().forEach(function (c) {
    if (!c.lang) return;
    c.units.forEach(function (u) {
      u.lessons.forEach(function (l) {
        if (l.type === 'test') return;
        (l.ex || []).forEach(function (e) {
          if (e.t !== 'mc' || !e.o || e.o.length < 2 || done.indexOf(e) >= 0) return;
          done.push(e);
          var right = e.o[e.a], rest = e.o.filter(function (_, i) { return i !== e.a; }), at = n++ % e.o.length;
          rest.splice(at, 0, right); e.o = rest; e.a = at;
        });
      });
    });
  });
})();
