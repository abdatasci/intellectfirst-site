/* Maths in English for young learners (6–10): numbers, adding, taking away and shapes, with cartoon pictures.
   Counting and sums are made fresh every time, so the practice never runs out. */
(function () {
  var W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  var THINGS = [['apple', 'apples'], ['star', 'stars'], ['ball', 'balls'], ['fish', 'fish'], ['balloon', 'balloons'], ['car', 'cars'], ['bird', 'birds'], ['cake', 'cakes']];
  var r = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  var near = function (n, lo, hi) { var o = [n]; while (o.length < 3) { var x = n + r(-2, 2); if (x >= lo && x <= hi && o.indexOf(x) < 0) o.push(x); } o.sort(function (x, y) { return x - y; }); return { o: o.map(String), a: o.indexOf(n) }; };
  function count(lo, hi) { return function () { var n = r(lo, hi), t = THINGS[r(0, THINGS.length - 1)], q = near(n, Math.max(1, lo - 2), hi + 2); return { t: 'mc', scene: { pic: t[0], n: n }, q: 'How many ' + t[1] + '?', o: q.o, a: q.a, why: W[n] + ' ' + (n === 1 ? t[0] : t[1]) }; }; }
  function wordToNum(lo, hi) { return function () { var n = r(lo, hi), q = near(n, 0, 20); return { t: 'mc', q: 'Which number is “' + W[n] + '”?', o: q.o, a: q.a, say: W[n] }; }; }
  function numToWord(lo, hi) { return function () { var n = r(lo, hi); return { t: 'gap', q: n + ' = ___', a: [W[n]], why: n + ' is “' + W[n] + '”.' }; }; }
  function add(max) { return function () { var a = r(1, max - 1), b = r(1, max - a), t = THINGS[r(0, THINGS.length - 1)], q = near(a + b, 1, max + 2); return { t: 'mc', scene: { pic: t[0], n: a, op: '+', m: b }, q: W[a] + ' plus ' + W[b] + ' equals…', o: q.o, a: q.a, why: a + ' + ' + b + ' = ' + (a + b) + ' (' + W[a] + ' plus ' + W[b] + ' equals ' + W[a + b] + ')' }; }; }
  function take(max) { return function () { var a = r(3, max), b = r(1, a - 1), t = THINGS[r(0, THINGS.length - 1)], q = near(a - b, 0, max); return { t: 'mc', scene: { pic: t[0], n: a, op: '−', m: b }, q: W[a] + ' minus ' + W[b] + ' equals…', o: q.o, a: q.a, why: a + ' − ' + b + ' = ' + (a - b) + ' (' + W[a] + ' minus ' + W[b] + ' equals ' + W[a - b] + ')' }; }; }
  function story(kind) { return function () {
    var names = ['Aru', 'Timur', 'Dana', 'Ali', 'Mira', 'Sam'], nm = names[r(0, 5)], t = THINGS[r(0, 4)];
    if (kind === '+') { var a = r(2, 6), b = r(1, 4), q = near(a + b, 1, 12); return { t: 'mc', scene: { pic: t[0], n: a, op: '+', m: b }, q: nm + ' has ' + W[a] + ' ' + t[1] + '. Mum gives ' + W[b] + ' more. How many ' + t[1] + ' now?', o: q.o, a: q.a }; }
    var c = r(4, 9), d = r(1, c - 1), q2 = near(c - d, 0, 10); return { t: 'mc', scene: { pic: t[0], n: c, op: '−', m: d }, q: nm + ' has ' + W[c] + ' ' + t[1] + '. ' + nm + ' gives ' + W[d] + ' to a friend. How many are left?', o: q2.o, a: q2.a };
  }; }
  var many = function (f, n) { var a = []; for (var i = 0; i < n; i++) a.push(f); return a; };
  var numTable = function (a, b) { var h = '<div class="numgrid">'; for (var i = a; i <= b; i++) h += '<div><b>' + i + '</b><span>' + W[i] + '</span></div>'; return h + '</div>'; };
  IFX.course({
    id: 'maths', track: 'kids', level: 'Ages 6–10', next: 'Times tables', icon: '🔢', kids: true,
    title: 'Maths in English', sub: 'Numbers, sums and shapes in English',
    blurb: 'Count, add, take away and name shapes — in English, with pictures. New sums every time you practise.',
    units: [
    { id: 'u1', title: 'Numbers 1 to 10', topic: 'Counting', lessons: [
      { id: 'n', type: 'maths', title: 'Count to ten', rule: '<p>Say the numbers. Touch each picture and count!</p>' + numTable(1, 10), gen: [].concat(many(count(1, 5), 3), many(count(4, 10), 3), many(wordToNum(1, 10), 2)) },
      { id: 'w', type: 'maths', title: 'Write the numbers', rule: '<p>Write the number words: <b>1 one, 2 two, 3 three…</b></p>' + numTable(1, 10), gen: [].concat(many(numToWord(1, 10), 5), many(count(1, 10), 2)) },
      { id: 'c', type: 'check', title: 'Numbers check', gen: [].concat(many(count(1, 10), 3), many(wordToNum(1, 10), 2), many(numToWord(1, 10), 2)) }
    ]},
    { id: 'u2', title: 'Numbers 11 to 20', topic: 'Counting', lessons: [
      { id: 'n', type: 'maths', title: 'Eleven to twenty', rule: '<p>From 13 to 19 we say <b>-teen</b>: thir<b>teen</b>, four<b>teen</b>… Then <b>twenty</b>.</p>' + numTable(11, 20), gen: [].concat(many(wordToNum(11, 20), 4), many(count(10, 16), 2), many(numToWord(11, 20), 2)) },
      { id: 'c', type: 'check', title: 'Big numbers check', gen: [].concat(many(wordToNum(1, 20), 3), many(numToWord(11, 20), 3), many(count(8, 15), 2)) }
    ]},
    { id: 'u3', title: 'Adding', topic: 'Adding', lessons: [
      { id: 'n', type: 'maths', title: 'Plus and equals', rule: '<p><b>+</b> is <b>plus</b>. <b>=</b> is <b>equals</b>.</p><p class="ex">2 + 3 = 5 → <i>two plus three equals five</i></p>', gen: [].concat(many(add(6), 4), many(add(10), 4)) },
      { id: 's', type: 'maths', title: 'Number stories', rule: '<p>Read the story. Look at the pictures. <b>More</b> means plus (+).</p>', gen: many(story('+'), 6) },
      { id: 'c', type: 'check', title: 'Adding check', gen: [].concat(many(add(10), 5), many(story('+'), 2)) }
    ]},
    { id: 'u4', title: 'Taking away', topic: 'Taking away', lessons: [
      { id: 'n', type: 'maths', title: 'Minus', rule: '<p><b>−</b> is <b>minus</b> (take away).</p><p class="ex">5 − 2 = 3 → <i>five minus two equals three</i></p>', gen: [].concat(many(take(6), 4), many(take(10), 4)) },
      { id: 's', type: 'maths', title: 'How many are left?', rule: '<p><b>Gives</b> or <b>eats</b> means minus (−). How many are <b>left</b>?</p>', gen: many(story('-'), 6) },
      { id: 'c', type: 'check', title: 'Taking away check', gen: [].concat(many(take(10), 5), many(story('-'), 2)) }
    ]},
    { id: 'u5', title: 'Shapes', topic: 'Shapes', lessons: [
      { id: 'v', type: 'vocab', title: 'Shapes', words: [
        { w: 'circle', pic: 'circle', p: 'shape', d: 'a round shape', e: 'The sun is a circle.', ru: 'круг' },
        { w: 'square', pic: 'square', p: 'shape', d: 'a shape with four sides the same', e: 'A square has four sides.', ru: 'квадрат' },
        { w: 'triangle', pic: 'triangle', p: 'shape', d: 'a shape with three sides', e: 'A triangle has three sides.', ru: 'треугольник' },
        { w: 'rectangle', pic: 'rectangle', p: 'shape', d: 'a shape with two long sides and two short sides', e: 'A door is a rectangle.', ru: 'прямоугольник' },
        { w: 'star', pic: 'star', p: 'shape', d: 'a shape with five points', e: 'I can see a star.', ru: 'звезда' },
        { w: 'heart', pic: 'heart', p: 'shape', d: 'a shape that means love', e: 'I draw a red heart.', ru: 'сердце' }
      ]},
      { id: 'c', type: 'check', title: 'Shapes check', ex: [
        { t: 'mc', q: 'How many sides does a triangle have?', pic: 'triangle', o: ['3', '4', '5'], a: 0 },
        { t: 'picmc', q: 'Find the square.', say: 'square', o: ['circle', 'square', 'triangle'], a: 1 },
        { t: 'mc', q: 'How many sides does a square have?', pic: 'square', o: ['3', '4', '6'], a: 1 },
        { t: 'picmc', q: 'Listen and choose.', listen: 'rectangle', o: ['rectangle', 'heart', 'star'], a: 0 },
        { t: 'mc', scene: { pic: 'star', n: 7 }, q: 'How many stars?', o: ['6', '7', '8'], a: 1 },
        { t: 'mc', q: 'The sun is a …', pic: 'sun', o: ['circle', 'square', 'triangle'], a: 0 }
      ]}
    ]}
  ]});
})();
