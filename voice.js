/* IF Academy real voices. Every page and game on the site that "speaks" English uses the browser's
   speechSynthesis. This small script quietly replaces that robotic voice with a recorded natural voice
   from /api/voice (ElevenLabs, generated once and cached). If the real voice is unavailable, the page
   falls back to the browser's own voice, so nothing ever goes silent.
   Like the browser voice, sentences are queued: speak() adds to the queue, cancel() empties it.
   Pages for children (Young Learners, Kids Quest, Starters/Movers/Flyers) use the children's voice. */
(function () {
  var ss = window.speechSynthesis;
  if (!ss || ss.__ifVoice || !window.Audio) return;
  ss.__ifVoice = true;
  var native = { speak: ss.speak.bind(ss), cancel: ss.cancel.bind(ss), pause: ss.pause && ss.pause.bind(ss), resume: ss.resume && ss.resume.bind(ss) };
  var KIDPATH = /^\/a\/(kids-quest|young-learners|yl-centre|kids-english|starters-tests|movers-tests|flyers-tests|flyers-arcade|yl-tests)(\/|$)/;
  var kid = function () { return KIDPATH.test(location.pathname) || (/^\/app\//.test(location.pathname) && /yl-|maths/.test(location.hash)); };
  var off = false, failedAt = 0;
  var player = new Audio(), current = null, queue = [];
  player.preload = 'auto';
  try { player.setAttribute('playsinline', ''); } catch (e) {}
  var fire = function (u, type) { try { u.dispatchEvent(new Event(type)); } catch (e) { try { var f = u['on' + type]; if (f) f.call(u, { type: type }); } catch (e2) {} } };
  var english = function (u) { var l = (u.lang || document.documentElement.lang || 'en').toLowerCase(); return /^en/.test(l) && !/[Ѐ-ӿ؀-ۿ一-鿿]/.test(u.text || ''); };
  var real = function (u) { var t = String(u && u.text || '').trim(); return !off && t && t.length <= 3000 && english(u) && Date.now() - failedAt > 60000; };

  function next() {
    current = null;
    var u = queue.shift(); if (!u) return;
    if (!real(u)) { native.speak(u); return next(); }
    current = u;
    player.src = '/api/voice?v=' + (kid() ? 'kid' : 'adult') + '&t=' + encodeURIComponent(String(u.text).replace(/\s+/g, ' ').trim());
    var r = +u.rate || 1; player.playbackRate = r < 0.8 ? 0.85 : r > 1.3 ? 1.2 : 1;
    try { player.preservesPitch = true; } catch (e) {}
    var p = player.play(); if (p && p.catch) p.catch(function (e) { if (current === u && e && e.name !== 'AbortError') fail(u); });
  }
  function fail(u) {
    current = null; failedAt = Date.now();
    fetch('/api/voice/status').then(function (x) { return x.json(); }).then(function (s) { if (!s.ready) off = true; }).catch(function () {});
    native.speak(u);                                   // this sentence in the browser voice instead
    var rest = queue.splice(0); rest.forEach(function (x) { native.speak(x); });
  }
  player.onplaying = function () { if (current) fire(current, 'start'); };
  player.onended = function () { var u = current; if (u) fire(u, 'end'); next(); };
  player.onerror = function () { if (current) fail(current); };

  ss.speak = function (u) {
    if (!u) return;
    if (!real(u) && !current && !queue.length) return native.speak(u);
    queue.push(u);
    if (!current) next();
  };
  ss.cancel = function () { queue = []; current = null; try { player.pause(); player.removeAttribute('src'); player.load(); } catch (e) {} native.cancel(); };
  if (native.pause) ss.pause = function () { try { player.pause(); } catch (e) {} native.pause(); };
  if (native.resume) ss.resume = function () { if (current) { var p = player.play(); if (p && p.catch) p.catch(function () {}); } native.resume(); };
  try {
    var pd = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ss), 'speaking');
    if (pd && pd.get) Object.defineProperty(ss, 'speaking', { configurable: true, get: function () { return !!current || queue.length > 0 || pd.get.call(ss); } });
  } catch (e) {}
})();
