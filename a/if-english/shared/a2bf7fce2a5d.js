
/* Solo study modes and Game Room (ifr-study.js) */
(function(){
  if (!window.IFStudy) return;
  var RU = true;
  var hasV = typeof VMODES !== 'undefined', b1style = typeof SOLO_MODES !== 'undefined';
  var LIST = hasV ? VMODES : (b1style ? SOLO_MODES : MODES);
  var have = function(k){ return LIST.some(function(m){ return m[0] === k; }); };
  var add = ['learn','write','spell','test','scramble','gravity','room'].filter(function(k){ return !have(k); });
  var at = LIST.findIndex(function(m){ return m[0] === 'cards'; }) + 1;
  add.forEach(function(k, i){ var e = b1style ? [k, IFStudy.NAME[k]] : [k, IFStudy.NAME[k], 'solo']; LIST.splice(at + i, 0, e); if (b1style) MODES.push(e); });
  var pe = b1style ? ['progress', '📈 My Progress'] : ['progress', '📈 My Progress', 'solo']; LIST.splice(at - 1, 0, pe); if (b1style) MODES.push(pe); add.push('progress');
  var CHIP = {cards:1}; add.forEach(function(k){ CHIP[k] = 1; });
  var STUDY = {}; IFStudy.MODES.forEach(function(m){ if (CHIP[m[0]] || !have(m[0])) STUDY[m[0]] = 1; }); STUDY.cards = 1;
  var getM = function(){ return hasV ? getMode() : mode; };
  var setM = function(m){ if (hasV){ modeV = m; save('modeV', m); } else { mode = m; save('mode', m); } };
  var isStudy = function(){ return STUDY[getM()] && !(hasV && isG()); };
  function study(m){
    IFStudy.mount($('#stage'), { words: DATA[lesson].words.map(function(w){ return {w:w[0], d:w[1], ru:w[2] || '', dr:w[3] || ''}; }),
      key: lesson, ru: RU, mode: m, title: lesson + (DATA[lesson].title ? ' · ' + DATA[lesson].title : ''),
      course: (function(){ var c = {}; Object.keys(DATA).forEach(function(k){ if (DATA[k].kind !== 'g' && DATA[k].words) c[k] = {title: DATA[k].title || k, n: DATA[k].words.length}; }); return c; })(),
      onLesson: function(k){ if (!DATA[k]) return; lesson = k; save('lesson', k); setM('cards'); reset(); },
      onMode: function(n){ setM(CHIP[n] ? n : 'room'); chips(); } });
  }
  var old = window.render;
  window.render = function(){ if (isStudy()) return study(getM()); IFStudy.stop(); return old(); };
  var saved = load(hasV ? 'modeV' : 'mode', null);
  if (saved && CHIP[saved]) setM(saved);
  /* record finished arena games (Quick Quiz, Match, Spell It, Blocks, Gravity …) in My Progress */
  if (IFStudy.track) (function(){
    var stage = $('#stage'), seen = null;
    var nameOf = function(k){ var m = LIST.filter(function(x){ return x[0] === k; })[0]; return m ? String(m[1]).replace(/^[^A-Za-z]+/, '') : k; };
    var num = function(t){ var m = String(t || '').replace(/\s(?=\d{3}\b)/g, '').match(/-?\d+(?:[.,]\d+)?/); return m ? parseFloat(m[0].replace(',', '.')) : null; };
    new MutationObserver(function(){
      if (isStudy()) { seen = null; return; }
      var ag = stage.querySelector('#ag, #again');
      if (!ag) { seen = null; return; }
      if (seen === ag) return; seen = ag;
      var els = [].slice.call(stage.querySelectorAll('.word')).concat([].slice.call(stage.querySelectorAll('.hint'))), sc = null;
      for (var i = 0; i < els.length && sc == null; i++) sc = num(els[i].textContent);
      if (sc == null) return;
      try { IFStudy.track(nameOf(getM()), sc, null, lesson); } catch(e){}
    }).observe(stage, {childList: true, subtree: true});
  })();
  reset();
})();
