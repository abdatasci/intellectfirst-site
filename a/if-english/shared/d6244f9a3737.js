
/* IF Mix units: students choose several units, review them in the study modes and play every solo/team game with all their words. */
(function(){
  try{ if (typeof DATA === 'undefined' || typeof lesson === 'undefined') return; }catch(e){ return; }
  var KEY = 'MIX';
  var units = Object.keys(DATA).filter(function(k){ return DATA[k] && DATA[k].kind !== 'g' && Array.isArray(DATA[k].words); });
  var sel = (load('mixUnits', []) || []).filter(function(k){ return units.indexOf(k) >= 0; });
  var open = false;
  function build(list){
    var seen = {}, words = [];
    list.forEach(function(k){ DATA[k].words.forEach(function(w){ var id = String(w[0]).toLowerCase(); if (!seen[id]) { seen[id] = 1; words.push(w); } }); });
    var title = list.length <= 4 ? 'Mix · ' + list.join(', ') : 'Mix · ' + list.length + ' units';
    Object.defineProperty(DATA, KEY, { value: { title: title.replace(/^Mix · /, ''), words: words, mix: list.slice() }, enumerable: false, configurable: true, writable: true });
  }
  function count(list){ var seen = {}, n = 0; list.forEach(function(k){ DATA[k].words.forEach(function(w){ var id = String(w[0]).toLowerCase(); if (!seen[id]) { seen[id] = 1; n++; } }); }); return n; }
  function clearGames(){ try { qz = null; } catch(e){} try { bk = null; } catch(e){} try { mt = null; } catch(e){} try { gv = null; } catch(e){} try { fc = { i:0, list:[], known:0, lesson:null }; } catch(e){} }
  var panel = document.createElement('div'); panel.className = 'ifmix'; panel.hidden = true; panel.id = 'ifmix';
  var L = document.getElementById('lessons'); if (!L) return;
  L.parentNode.insertBefore(panel, L.nextSibling);
  function drawPanel(){
    var n = count(sel);
    panel.innerHTML = '<h3>Mix units · Смешать юниты</h3><p>Choose two or more units to review and play together. · Выберите два или больше юнитов, чтобы повторять и играть с их словами вместе.</p>'
      + '<div class="ifmix-list">' + units.map(function(k){ var on = sel.indexOf(k) >= 0; return '<button type="button" data-u="' + esc(k) + '" aria-pressed="' + on + '">' + esc(k) + ' · ' + esc(DATA[k].title || '') + ' <small>(' + DATA[k].words.length + ')</small></button>'; }).join('') + '</div>'
      + '<div class="ifmix-row"><span class="ifmix-n">' + sel.length + ' unit' + (sel.length === 1 ? '' : 's') + ' · ' + n + ' words</span>'
      + '<button type="button" data-a="all">Select all · Все</button><button type="button" data-a="none">Clear · Очистить</button>'
      + '<button type="button" class="ifmix-go big gold" data-a="go"' + (sel.length < 2 ? ' disabled' : '') + '>Play these units · Играть</button></div>';
  }
  panel.addEventListener('click', function(e){
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.u) { var k = b.dataset.u; sel = sel.indexOf(k) >= 0 ? sel.filter(function(x){ return x !== k; }) : sel.concat([k]); sel.sort(function(a, c){ return units.indexOf(a) - units.indexOf(c); }); save('mixUnits', sel); return drawPanel(); }
    if (b.dataset.a === 'all') { sel = units.slice(); save('mixUnits', sel); return drawPanel(); }
    if (b.dataset.a === 'none') { sel = []; save('mixUnits', sel); return drawPanel(); }
    if (b.dataset.a === 'go' && sel.length >= 2) { build(sel); lesson = KEY; save('lesson', KEY); open = false; panel.hidden = true; clearGames(); reset(); }
  });
  var baseChips = chips;
  chips = function(){
    baseChips.apply(this, arguments);
    var b = document.createElement('button'); b.type = 'button'; b.className = 'ifmix-btn' + (lesson === KEY || open ? ' on' : '');
    b.setAttribute('aria-pressed', lesson === KEY); b.setAttribute('aria-expanded', open);
    b.textContent = lesson === KEY ? '✓ Mix · ' + DATA[KEY].mix.length + ' units' : '＋ Mix units';
    b.onclick = function(){ open = !open; panel.hidden = !open; if (open) drawPanel(); chips(); };
    var lbl = L.querySelector('.lbl'); L.insertBefore(b, lbl ? lbl.nextSibling : L.firstChild);
  };
  if (load('lesson', null) === KEY && sel.length >= 2) { build(sel); lesson = KEY; clearGames(); }
  try { reset(); } catch(e){}
})();
