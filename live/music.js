/* IF Live background music: original tunes generated in the browser (Web Audio), no audio files.
   Plays on the teacher's big screen only. "Auto" follows the game: lobby → the game mode's track → victory.
   In the last 30 seconds of a timed game the music speeds up a little.
   API: LIVE.Music.follow(phase, mode, msLeft) · .set(trackId|'auto'|'off') · .volume(0..1) · .ui(container) */
(function () {
  var L = window.LIVE = window.LIVE || {};
  var NOTE = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };
  var MAJ = [0, 4, 7, 11], MIN = [0, 3, 7, 10];

  /* Each track: bpm, key (MIDI root), prog = chords per bar [semitones from key, 'M'|'m'],
     bass/arp/lead = 16-step patterns, drums k/s/h = 16-step strings ('x' hit, '.' rest). */
  var TRACKS = {
    lobby: { name: 'Chill lobby', icon: '☕', bpm: 88, key: 53, prog: [[0, 'M'], [-1, 'm'], [-3, 'm'], [-5, 'M']],
      bass: 'r...r...f...r.o.', arp: '0.2.1.3.2.1.0.2.', arpWave: 'triangle', arpOct: 1, lead: 0,
      k: 'x.......x.......', s: '........x.......', h: '..x...x...x...x.', pad: true },
    quiz: { name: 'Quiz pulse', icon: '🎯', bpm: 118, key: 50, prog: [[0, 'm'], [-4, 'M'], [-7, 'M'], [-2, 'M']],
      bass: 'r.r.r.r.r.r.o.r.', arp: '0.1.2.1.0.1.2.3.', arpWave: 'square', arpOct: 1, lead: 0.5,
      k: 'x...x...x...x...', s: '....x.......x...', h: 'x.x.x.x.x.x.x.xx' },
    race: { name: 'Turbo race', icon: '🏁', bpm: 140, key: 52, prog: [[0, 'm'], [0, 'm'], [-4, 'M'], [-2, 'M']],
      bass: 'rorororororororo', arp: '0123012301230123', arpWave: 'sawtooth', arpOct: 1, lead: 0.4, cut: 1800,
      k: 'x...x...x...x...', s: '....x.......x..x', h: 'xxxxxxxxxxxxxxxx' },
    gold: { name: 'Treasure island', icon: '🪙', bpm: 124, key: 55, prog: [[0, 'M'], [5, 'M'], [-3, 'm'], [7, 'M']],
      bass: 'r..r..f.r..r..o.', arp: '0.2.1.2.0.2.3.2.', arpWave: 'sine', arpOct: 2, lead: 0.6, pluck: true,
      k: 'x.....x.x.......', s: '....x.......x...', h: '..x...x...x...x.' },
    hack: { name: 'Neon hack', icon: '💻', bpm: 108, key: 45, prog: [[0, 'm'], [-4, 'M'], [-9, 'M'], [-2, 'M']],
      bass: 'rrrrrrrrrrrrrrrr', arp: '0213021302130213', arpWave: 'sawtooth', arpOct: 1, lead: 0.35, cut: 1200, sweep: true,
      k: 'x...x...x...x...', s: '....x.......x...', h: '..x...x...x...x.', pad: true },
    fish: { name: 'Lazy lagoon', icon: '🎣', bpm: 96, key: 57, prog: [[0, 'M'], [-3, 'm'], [5, 'M'], [7, 'M']],
      bass: 'r.....f.r...o...', arp: '0.1.2...0.2.1...', arpWave: 'triangle', arpOct: 1, lead: 0.5, pluck: true,
      k: 'x.......x.......', s: '........x.......', h: 'x.xxx.xxx.xxx.xx', shaker: true },
    match: { name: 'Team groove', icon: '🤝', bpm: 112, key: 48, prog: [[0, 'm'], [5, 'M'], [3, 'M'], [7, 'm']],
      bass: 'r..ro..r.r..f.o.', arp: '..0...1...2...1.', arpWave: 'square', arpOct: 1, lead: 0.45,
      k: 'x..x..x...x.....', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.' },
    win: { name: 'Victory', icon: '🏆', bpm: 100, key: 60, prog: [[0, 'M'], [5, 'M'], [7, 'M'], [0, 'M']],
      bass: 'r...f...o...r...', arp: '0123321001233210', arpWave: 'triangle', arpOct: 1, lead: 0.7,
      k: 'x.......x.......', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.', pad: true }
  };
  var FOR_MODE = { classic: 'quiz', race: 'race', gold: 'gold', hack: 'hack', fish: 'fish', match: 'match' };

  var ls = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} } };
  var choice = ls.get('live.music') || 'auto', vol = +(ls.get('live.musicvol') || .5);
  var AC = null, master = null, comp = null, cur = null, step = 0, nextT = 0, timer = null, hurry = false, rnd = 1, lastLead = 0;

  function ctx() {
    if (AC) return AC;
    AC = new (window.AudioContext || window.webkitAudioContext)();
    comp = AC.createDynamicsCompressor(); comp.connect(AC.destination);
    master = AC.createGain(); master.gain.value = vol * .55; master.connect(comp);
    return AC;
  }
  function rand() { rnd = (rnd * 16807) % 2147483647; return (rnd - 1) / 2147483646; }

  function tone(f, t, dur, wave, gain, opt) {
    opt = opt || {};
    var o = AC.createOscillator(), g = AC.createGain(), out = g;
    o.type = wave; o.frequency.setValueAtTime(f, t);
    if (opt.cut) { var fl = AC.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.setValueAtTime(opt.cut, t); if (opt.sweep) fl.frequency.linearRampToValueAtTime(opt.cut * 2.4, t + dur); fl.Q.value = 4; o.connect(fl); fl.connect(g); } else o.connect(g);
    var a = opt.att || .008, peak = gain;
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(.0001, t + (opt.pluck ? Math.min(dur, .35) : dur));
    out.connect(master); o.start(t); o.stop(t + dur + .05);
  }
  function noise(t, dur, gain, hp) {
    var len = Math.floor(AC.sampleRate * dur), buf = AC.createBuffer(1, len, AC.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
    s.buffer = buf; f.type = 'highpass'; f.frequency.value = hp; s.connect(f); f.connect(g); g.connect(master);
    g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur); s.start(t);
  }
  function kick(t) {
    var o = AC.createOscillator(), g = AC.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(42, t + .14);
    g.gain.setValueAtTime(.9, t); g.gain.exponentialRampToValueAtTime(.0001, t + .22);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + .25);
  }

  function chordAt(T, bar) { var c = T.prog[bar % T.prog.length]; return { root: T.key + c[0], tones: c[1] === 'm' ? MIN : MAJ }; }
  function play(T, s, t, sp) {
    var bar = Math.floor(s / 16), i = s % 16, c = chordAt(T, bar), b = T.bass[i];
    if (b !== '.') tone(NOTE(c.root - 12 + (b === 'f' ? 7 : b === 'o' ? 12 : 0)), t, sp * (T.bass[(i + 1) % 16] === '.' ? 1.8 : .9), 'triangle', .32, { cut: 900 });
    var a = T.arp[i];
    if (a !== '.') tone(NOTE(c.root + 12 * T.arpOct + c.tones[+a % 4]), t, sp * .9, T.arpWave, T.arpWave === 'sine' || T.arpWave === 'triangle' ? .13 : .05, { cut: T.cut || 3200, sweep: T.sweep, pluck: T.pluck });
    if (T.pad && i === 0) c.tones.slice(0, 3).forEach(function (n) { tone(NOTE(c.root + n), t, sp * 15, 'sine', .035, { att: .4 }); });
    if (T.lead && i % 2 === 0 && rand() < T.lead * .5) {   // a gentle melody from the chord's notes and a pentatonic neighbour
      var pent = [0, 2, 4, 7, 9], n = c.root + 24 + (rand() < .6 ? c.tones[Math.floor(rand() * 3)] : pent[Math.floor(rand() * 5)]);
      if (Math.abs(n - lastLead) > 9 && lastLead) n -= 12; lastLead = n;
      tone(NOTE(n), t, sp * (rand() < .3 ? 3.5 : 1.7), 'triangle', .07, { att: .02 });
    }
    if (T.k[i] === 'x') kick(t);
    if (T.s[i] === 'x') noise(t, .16, .22, 1200);
    if (T.h[i] === 'x' || (hurry && i % 2 === 1)) noise(t, T.shaker ? .06 : .035, T.shaker ? .07 : .09, 7000);
  }
  function tick() {
    if (!cur || !AC) return;
    var T = TRACKS[cur], sp = 60 / (T.bpm * (hurry ? 1.12 : 1)) / 4;
    while (nextT < AC.currentTime + .15) { play(T, step, nextT, sp); step++; nextT += sp; }
  }
  function start(id) {
    if (id === cur) return;
    stop();
    if (!id || !TRACKS[id]) return;
    try { ctx(); if (AC.state === 'suspended') AC.resume(); } catch (e) { return; }
    cur = id; step = 0; rnd = 7 + id.length * 31; lastLead = 0; nextT = AC.currentTime + .08;
    master.gain.cancelScheduledValues(AC.currentTime); master.gain.setValueAtTime(.0001, AC.currentTime); master.gain.exponentialRampToValueAtTime(Math.max(.0001, vol * .55), AC.currentTime + 1.2);
    timer = setInterval(tick, 40); tick(); paint();
  }
  function stop() { clearInterval(timer); timer = null; cur = null; paint(); }

  var state = { phase: 'setup', mode: 'classic' };
  function want() {
    if (choice === 'off') return null;
    if (choice !== 'auto') return choice;
    if (state.phase === 'setup') return null;
    if (state.phase === 'lobby') return 'lobby';
    if (state.phase === 'end') return 'win';
    return FOR_MODE[state.mode] || 'quiz';
  }
  var M = L.Music = {
    TRACKS: TRACKS,
    follow: function (phase, mode, left) {
      state.phase = phase || 'setup'; state.mode = mode || 'classic';
      hurry = (phase === 'race' || phase === 'match' || phase === 'q') && left > 0 && left < 30000;
      var w = want(); if (w !== cur) start(w);
    },
    set: function (id) { choice = id; ls.set('live.music', id); start(want()); },
    volume: function (v) { vol = Math.max(0, Math.min(1, v)); ls.set('live.musicvol', String(vol)); if (master) master.gain.setTargetAtTime(Math.max(.0001, vol * .55), AC.currentTime, .1); },
    unlock: function () { try { ctx(); if (AC.state === 'suspended') AC.resume(); } catch (e) {} },
    playing: function () { return cur; }
  };

  /* the 🎵 button and menu in the host's top bar */
  var btn = null, menu = null;
  function paint() {
    if (!btn) return;
    var T = cur && TRACKS[cur];
    btn.textContent = choice === 'off' ? '🔇 Music' : '🎵 ' + (T ? T.name : 'Music');
    if (menu && !menu.hidden) fill();
  }
  function fill() {
    var opts = [['auto', '✨', 'Auto (follows the game)'], ['off', '🔇', 'Off']].concat(Object.keys(TRACKS).map(function (k) { return [k, TRACKS[k].icon, TRACKS[k].name]; }));
    menu.innerHTML = '<div class="mh">Background music</div>' + opts.map(function (o) { return '<button data-v="' + o[0] + '" class="' + (choice === o[0] ? 'on' : '') + '"><span>' + o[1] + '</span>' + o[2] + (o[0] === cur ? ' <small>▶ playing</small>' : '') + '</button>'; }).join('') +
      '<label class="mv">Volume <input type="range" min="0" max="100" value="' + Math.round(vol * 100) + '"></label><p class="mn">Original music made by IF Live. Plays on this screen only, not on students\' phones.</p>';
    menu.querySelectorAll('button').forEach(function (b) { b.onclick = function () { M.unlock(); M.set(b.dataset.v); fill(); }; });
    menu.querySelector('input').oninput = function () { M.volume(this.value / 100); };
  }
  M.ui = function (where) {
    if (btn || !where) return;
    var wrap = document.createElement('span'); wrap.className = 'musicw';
    btn = document.createElement('button'); btn.className = 'btn ghost sm'; btn.type = 'button';
    menu = document.createElement('div'); menu.className = 'musicmenu'; menu.hidden = true;
    btn.onclick = function (e) { e.stopPropagation(); M.unlock(); menu.hidden = !menu.hidden; if (!menu.hidden) fill(); if (!cur) start(want()); };
    document.addEventListener('click', function (e) { if (document.contains(e.target) && !wrap.contains(e.target)) menu.hidden = true; });
    wrap.appendChild(btn); wrap.appendChild(menu); where.parentNode.insertBefore(wrap, where); paint();
    // browsers only allow sound after a click: the first click anywhere on the page starts it
    document.addEventListener('pointerdown', function first() { M.unlock(); var w = want(); if (w && !cur) start(w); document.removeEventListener('pointerdown', first); });
  };
})();
