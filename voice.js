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
  var KIDPATH = /^\/a\/(kids-quest|if-kart|young-learners|yl-centre|kids-english|starters-tests|movers-tests|flyers-tests|flyers-arcade|yl-tests)(\/|$)/;
  var kid = function () { return KIDPATH.test(location.pathname) || (/^\/app\//.test(location.pathname) && /yl-|maths/.test(location.hash)); };
  // Four British voices: a woman and a man for children's pages, a different woman and man for teens and adults.
  // Children's pages start with the female voice, other pages with the male voice;
  // each listener can switch (saved on the device). A page can also choose per sentence: utterance.ifVoice = 'female' | 'male'.
  var pref = function () { try { var x = localStorage.getItem('ifVoice'); if (x === 'female' || x === 'male') return x; } catch (e) {} return kid() ? 'female' : 'male'; };
  window.IFVoice = { get: pref, set: function (x) { try { localStorage.setItem('ifVoice', x === 'male' ? 'male' : 'female'); } catch (e) {} }, toggle: function () { var n = pref() === 'male' ? 'female' : 'male'; window.IFVoice.set(n); return n; } };
  var off = false, failedAt = -1e9;
  var player = new Audio(), current = null, queue = [];
  player.preload = 'auto';
  try { player.setAttribute('playsinline', ''); } catch (e) {}
  var fire = function (u, type) { try { u.dispatchEvent(new Event(type)); } catch (e) { try { var f = u['on' + type]; if (f) f.call(u, { type: type }); } catch (e2) {} } };
  var english = function (u) { var l = (u.lang || document.documentElement.lang || 'en').toLowerCase(); return /^en/.test(l) && !/[Ѐ-ӿ؀-ۿ一-鿿]/.test(u.text || ''); };
  var real = function (u) { var t = String(u && u.text || '').trim(); return !off && t && t.length <= 3000 && english(u) && Date.now() - failedAt > 60000; };

  var srcOf = function (text, g) { return '/api/voice?v=' + (kid() ? 'k' : 'a') + (g === 'male' ? 'm' : 'f') + '&t=' + encodeURIComponent(String(text).replace(/\s+/g, ' ').trim()); };
  var gOf = function (u) { return u.ifVoice === 'female' || u.ifVoice === 'male' ? u.ifVoice : pref(); };
  // Every line is downloaded whole before it is played and kept for this visit, and the next line is fetched while the
  // current one is speaking. So there is no wait between the lines of a dialogue or the sentences of a text.
  var clips = {}, order = [], loading = {};
  function load(src) {
    if (clips[src]) return Promise.resolve(clips[src]);
    if (loading[src]) return loading[src];
    var once = function () { return fetch(src).then(function (r) { if (!r.ok) return r.json().catch(function () { return {}; }).then(function (d) { var e = new Error(d.error || ('http ' + r.status)); e.hard = /daily-limit|no-key/.test(d.error || '') || r.status === 400; throw e; }); return r.blob(); }); };
    loading[src] = once().catch(function (e) { if (e && e.hard) throw e; return new Promise(function (res) { setTimeout(res, 900); }).then(once); }).then(function (b) {
      var url = URL.createObjectURL(b); clips[src] = url; order.push(src);
      if (order.length > 80) { var old = order.shift(); try { URL.revokeObjectURL(clips[old]); } catch (e) {} delete clips[old]; }
      delete loading[src]; return url;
    }, function (e) { delete loading[src]; throw e; });
    return loading[src];
  }
  // Fetch the lines of a dialogue before it is played. lines: [{ t: text, g: 'm' | 'f' }]. Resolves with true when every line is ready.
  window.IFVoice.warm = function (lines, onStep) {
    var i = 0;
    var step = function () { if (off) return Promise.resolve(false); if (i >= lines.length) return Promise.resolve(true); var x = lines[i]; return load(srcOf(x.t, x.g === 'm' ? 'male' : x.g === 'f' ? 'female' : pref())).then(function () { i++; if (onStep) onStep(i, lines.length); return step(); }, function (e) { if (e && e.hard) off = true; return false; }); };
    return step();
  };
  function next() {
    current = null;
    var u = queue.shift(); if (!u) return;
    if (!real(u)) { native.speak(u); return next(); }
    current = u;
    var r = +u.rate || 1;
    load(srcOf(u.text, gOf(u))).then(function (url) {
      if (current !== u) return;
      player.src = url; player.playbackRate = r < 0.8 ? 0.85 : r > 1.3 ? 1.2 : 1;
      try { player.preservesPitch = true; } catch (e) {}
      var p = player.play(); if (p && p.catch) p.catch(function (e) { if (current === u && e && e.name !== 'AbortError') fail(u, {}); });
      var n = queue[0]; if (n && real(n)) load(srcOf(n.text, gOf(n))).catch(function () {});   // the next line, ready before it is needed
    }, function (e) { if (current === u) fail(u, e || {}); });
  }
  // A line could not be fetched (after one retry) or played. No key or the daily limit reached: the browser voice for the
  // rest of this visit. Anything else: only this line in the browser voice, then back to the real voice.
  function fail(u, e) {
    if (e.hard) { off = true; current = null; native.speak(u); var rest = queue.splice(0); rest.forEach(function (x) { native.speak(x); }); return; }
    var done = false, go = function () { if (done) return; done = true; if (current === u) next(); };
    try { u.addEventListener('end', go); u.addEventListener('error', go); } catch (e2) {}
    setTimeout(go, Math.max(4000, String(u.text).length * 110));   // in case the browser voice never reports the end
    native.speak(u);
  }
  player.onplaying = function () { if (current) fire(current, 'start'); };
  // iPhone/iPad: audio may only start from a tap. Pages often speak a moment after the tap (or the next line after a pause),
  // so the player is unlocked on the first touch with a silent clip; after that it can play at any time.
  var unlocked = false, SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  function unlock() {
    if (unlocked || current) return; unlocked = true;
    try { player.src = SILENT; var q = player.play(); if (q && q.then) q.then(function () { if (!current) player.pause(); }).catch(function () { unlocked = false; }); } catch (e) { unlocked = false; }
    try { native.speak(new SpeechSynthesisUtterance('')); } catch (e) {}   // the browser voice too (used when the real voice is unavailable)
  }
  ['touchend', 'pointerup', 'click', 'keydown'].forEach(function (ev) { document.addEventListener(ev, unlock, true); });
  player.onended = function () { var u = current; if (u) fire(u, 'end'); next(); };
  player.onerror = function () { if (current) fail(current, {}); };

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
