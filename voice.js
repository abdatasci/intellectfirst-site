/* IF Academy real voices. Every page and game on the site that "speaks" English uses the browser's
   speechSynthesis. This small script quietly replaces that robotic voice with a recorded natural voice
   from /api/voice (ElevenLabs, generated once and cached). If the real voice is unavailable, the page
   falls back to the browser's own voice, so nothing ever goes silent.
   Like the browser voice, sentences are queued: speak() adds to the queue, cancel() empties it.
   Pages for children (Young Learners, Kids Quest, Starters/Movers/Flyers) use the children's voice. */
(function () {
  // Android's in-app browsers (the Telegram mini-app, Instagram, some phones' WebView) have no speech engine at all:
  // window.speechSynthesis is missing, so every "Listen" button stayed silent. Give them a stand-in so the real voices
  // below can play; when even those are unavailable a line just ends quietly after a moment, so nothing hangs.
  if (!window.speechSynthesis && window.Audio) {
    if (!window.SpeechSynthesisUtterance) {
      var U = function (text) { this.text = text == null ? '' : String(text); this.lang = ''; this.rate = 1; this.pitch = 1; this.volume = 1; this.voice = null; this._l = {}; };
      U.prototype.addEventListener = function (t, f) { (this._l[t] = this._l[t] || []).push(f); };
      U.prototype.removeEventListener = function (t, f) { var a = this._l[t] || []; var i = a.indexOf(f); if (i >= 0) a.splice(i, 1); };
      U.prototype.dispatchEvent = function (e) { var t = e && e.type, self = this; (this._l[t] || []).slice().forEach(function (f) { try { f.call(self, e); } catch (x) {} }); var h = this['on' + t]; if (typeof h === 'function') { try { h.call(this, e); } catch (x) {} } return true; };
      window.SpeechSynthesisUtterance = U;
    }
    var timers = [];
    var ev = function (u, t) { try { u.dispatchEvent(new Event(t)); } catch (e) { var h = u['on' + t]; if (typeof h === 'function') try { h.call(u, { type: t }); } catch (x) {} } };
    window.speechSynthesis = {
      __stub: true, speaking: false, pending: false, paused: false, onvoiceschanged: null,
      speak: function (u) { if (!u) return; var t = String(u.text || '').trim(); if (!t) return; ev(u, 'start'); timers.push(setTimeout(function () { ev(u, 'end'); }, Math.min(6000, 300 + t.length * 45))); },
      cancel: function () { timers.forEach(clearTimeout); timers = []; }, pause: function () {}, resume: function () {},
      getVoices: function () { return []; }, addEventListener: function () {}, removeEventListener: function () {}
    };
  }
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
  /* IF Lingo (Russian and Kazakh courses): on that app, Russian and Kazakh text gets a real voice too.
     lingoLang gives 'ru' or 'kk' for such text, '' for everything else (other pages keep the browser voice for Cyrillic). */
  var lingoLang = function (text, hint) {
    if (window.IFX_APP !== 'lang' || !/[\u0400-\u04FF]/.test(text || '')) return '';
    if (/[әғқңөұүһіӘҒҚҢӨҰҮҺІ]/.test(text)) return 'kk';
    var h = String(hint || '').toLowerCase(); if (/^kk/.test(h)) return 'kk'; if (/^ru/.test(h)) return 'ru';
    return /#\/(lesson|course|words|set)\/kk-/.test(location.hash) ? 'kk' : 'ru';
  };
  var real = function (u) { var t = String(u && u.text || '').trim(); return !off && t && t.length <= 3000 && (english(u) || !!lingoLang(t, u.lang)) && Date.now() - failedAt > 60000; };

  var srcOf = function (text, g, hint) { var lg = lingoLang(text, hint); return '/api/voice?v=' + (kid() && !lg ? 'k' : 'a') + (g === 'male' ? 'm' : 'f') + (lg ? '&l=' + lg : '') + '&t=' + encodeURIComponent(String(text).replace(/\s+/g, ' ').trim()); };
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
    load(srcOf(u.text, gOf(u), u.lang)).then(function (url) {
      if (current !== u) return;
      player.src = url; player.playbackRate = u.ifRate ? Math.max(.6, Math.min(2.2, +u.ifRate)) : r < 0.8 ? 0.85 : r > 1.3 ? 1.2 : 1;   // ifRate: an exact speed (the fast-speech game)
      try { player.preservesPitch = true; } catch (e) {}
      var p = player.play(); if (p && p.catch) p.catch(function (e) { if (current === u && e && e.name !== 'AbortError') fail(u, {}); });
      var n = queue[0]; if (n && real(n)) load(srcOf(n.text, gOf(n), n.lang)).catch(function () {});   // the next line, ready before it is needed
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
  if (ss.__stub) try { Object.defineProperty(ss, 'speaking', { configurable: true, get: function () { return !!current || queue.length > 0; } }); } catch (e) {}
  try {
    var pd = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ss), 'speaking');
    if (pd && pd.get) Object.defineProperty(ss, 'speaking', { configurable: true, get: function () { return !!current || queue.length > 0 || pd.get.call(ss); } });
  } catch (e) {}
})();
