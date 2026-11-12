
/* IF pronunciation layer: British IPA (Britfone, MIT licence, (c) 2017 Jose Llarena; CMUdict fallback) and natural speech on flashcards. */
(function(){
  if (window.__ifPron) return; window.__ifPron = true;
  var IPA = {"cousin":"ˈkʌzən","hospital":"ˈhɒspɪtəl","dance":"dɑːns","stomach-ache":"ˈstʌmək eɪk","weekend":"ˈwiːkend","near":"nɪə","yesterday":"ˈjestədi","shark":"ʃɑːk","seat":"siːt","team":"tiːm","cook":"kʊk","plane":"pleɪn","bottle":"ˈbɒtəl","café":"ˈkæfeɪ","lion":"ˈlaɪən","swimming pool":"ˈswɪmɪŋ puːl","weather":"ˈweðə","left":"left","letter":"ˈletə","catch":"kætʃ","uncle":"ˈʌŋkəl","drop":"drɒp","sports centre":"spɔːts ˈsentə","answer":"ˈɑːnsə","toothache":"ˈtuːθeɪk","salad":"ˈsæləd","taxi":"ˈtæksi","dictionary":"ˈdɪkʃənəri","toothbrush":"ˈtuːθbrəʃ","cloud":"klaʊd","neck":"nek","glass":"ɡlɑːs","driver":"ˈdraɪvə","passenger":"ˈpæsəndʒə","cloudy":"ˈklaʊdi","hobby":"ˈhɒbi","sail":"seɪl","helicopter":"ˈhelɪkɒptə","better":"ˈbetə","trousers":"ˈtraʊzəz","fall over":"fɔːl ˈəʊvə","scarf":"skɑːf","granddaughter":"ɡˈrændɔːtə","ride":"raɪd","kick":"kɪk","lake":"leɪk","sunny":"ˈsʌni","always":"ˈɔːlwɪz","grandson":"ˈɡrænsʌn","pop star":"pɒp stɑː","headache":"ˈhedeɪk","baby":"ˈbeɪbi","lift":"lɪft","work":"wɜːk","rain":"reɪn","laugh":"lɑːf","text":"tekst","busy":"ˈbɪzi","tights":"taɪts","dry":"draɪ","windy":"ˈwɪndi","tooth":"tuːθ","roller skates":"ˈrəʊlə skeɪts","city":"ˈsɪti","nurse":"nɜːs","whisper":"ˈwɪspə","grass":"ɡrɑːs","countryside":"ˈkʌntrɪsaɪd","kangaroo":"ˌkæŋɡˈəruː","bus station":"bʌs ˈsteɪʃən","basement":"ˈbeɪsmənt","field":"fiːld","thin":"θɪn","teeth":"tiːθ","Friday":"ˈfraɪdi","blond":"blɒnd","garden":"ˈɡɑːdən","penguin":"ˈpeŋɡwɪn","people":"ˈpiːpəl","shower":"ˈʃaʊə","wing":"wɪŋ","dolphin":"ˈdɒlfɪn","cold":"kəʊld","swimsuit":"ˈswɪmsuːt","balcony":"ˈbælkəni","often":"ˈɒfən","sandwich":"ˈsænwɪtʃ","week":"wiːk","swing":"swɪŋ","strong":"strɒŋ","weak":"wiːk","bat":"bæt","knee":"niː","waterfall":"ˈwɔːtəfɔːl","break":"breɪk","bowl":"bəʊl","bank":"bæŋk","dangerous":"ˈdeɪndʒərəs","office":"ˈɒfɪs","cheese":"tʃiːz","leaf":"liːf","mistake":"mɪˈsteɪk","comic":"ˈkɒmɪk","towel":"ˈtaʊəl","teacher":"ˈtiːtʃə","bus":"bʌs","boots":"buːts","fat":"fæt","umbrella":"ʌmˈbrelə","email":"ˈiːmeɪl","quiet":"ˈkwaɪət","whale":"weɪl","never":"ˈnevə","best friend":"best frend","sweater":"ˈswetə","parents":"ˈpeərənts","parrot":"ˈpærət","doctor":"ˈdɒktə","rabbit":"ˈræbɪt","sun":"sʌn","library":"ˈlaɪbrəri","ticket":"ˈtɪkɪt","classmate":"ˈklæsmeɪt","brave":"breɪv","noodles":"ˈnuːdəlz","vegetables":"ˈvedʒtəbəlz","cinema":"ˈsɪnəmə","square":"skweə","cap":"kæp","shopping centre":"ˈʃɒpɪŋ ˈsentə","o'clock":"əˈklɒk","roof":"ruːf","downstairs":"ˈdaʊnsteəz","snow":"snəʊ","after":"ˈɑːftə","mountain":"ˈmaʊntɪn","job":"dʒɒb","farmer":"ˈfɑːmə","forest":"ˈfɒrɪst","husband":"ˈhʌzbənd","blanket":"ˈblæŋkɪt","fair":"feə","son":"sʌn","website":"ˈwebsaɪt","village":"ˈvɪlɪdʒ","clever":"ˈklevə","band":"bænd","wet":"wet","temperature":"ˈtemprətʃə","curly":"ˈkɜːli","skip":"skɪp","beach":"biːtʃ","stomach":"ˈstʌmək","pancake":"ˈpænkeɪk","back":"bæk","cage":"keɪdʒ","tomorrow":"təˈmɒrəʊ","cry":"kraɪ","aunt":"ɑːnt","homework":"ˈhəʊmwɜːk","pirate":"ˈpaɪrɪt","tractor":"ˈtræktə","island":"ˈaɪlənd","grandparents":"ɡˈrændperənts","straight on":"streɪt ɒn","before":"bɪˈfɔː","wind":"wɪnd","market":"ˈmɑːkɪt","daughter":"ˈdɔːtə","shoulder":"ˈʃəʊldə","station":"ˈsteɪʃən","hot":"hɒt","boat":"bəʊt","sky":"skaɪ","question":"ˈkwestʃən","internet":"ˈɪntənet","hop":"hɒp","thirsty":"ˈθɜːsti","motorbike":"ˈməʊtəbaɪk","bear":"beə","soup":"suːp","bicycle":"ˈbaɪsɪkəl","helmet":"ˈhelmɪt","gloves":"ɡlʌvz","goal":"ɡəʊl","cough":"kɒf","page":"peɪdʒ","panda":"ˈpændə","kid":"kɪd","earache":"ˈɪəreɪk","car park":"kɑː pɑːk","jeans":"dʒiːnz","rainbow":"ˈreɪnbəʊ","pocket":"ˈpɒkɪt","dentist":"ˈdentɪst","T-shirt":"tiː ʃɜːt","Monday":"ˈmʌndi","loud":"laʊd","train":"treɪn","breakfast":"ˈbrekfəst","picnic":"ˈpɪknɪk","sometimes":"səmˈtaɪmz","floor":"flɔː","stairs":"steəz","matter":"ˈmætə","shout":"ʃaʊt","fur":"fɜː","upstairs":"ʌpˈsteəz","ice skates":"aɪs skeɪts","film star":"fɪlm stɑː","climb":"klaɪm","moustache":"məˌstɑːʃ","hungry":"ˈhʌŋɡri","hurt":"hɜːt","clown":"klaʊn","river":"ˈrɪvə","coat":"kəʊt","cup":"kʌp","today":"təˈdeɪ","beard":"bɪəd"};
  var LS = { get: function(k, d){ try { var v = localStorage.getItem('ifpron:' + k); return v == null ? d : JSON.parse(v); } catch(e){ return d; } },
             set: function(k, v){ try { localStorage.setItem('ifpron:' + k, JSON.stringify(v)); } catch(e){} } };
  var acc = LS.get('acc', 'GB'), auto = LS.get('auto', false);
  var ok = typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined';
  var voices = [];
  function score(v, want){
    var n = (v.name || '') + ' ' + (v.voiceURI || ''), l = (v.lang || '').replace('_', '-');
    if (!/^en/i.test(l)) return -1;
    var s = 0;
    if (new RegExp('en-' + want, 'i').test(l)) s += 50; else if (want === 'GB' && /en-(IE|AU|NZ)/i.test(l)) s += 15; else if (want === 'US' && /en-CA/i.test(l)) s += 15;
    if (/natural|neural/i.test(n)) s += 40;
    if (/online/i.test(n)) s += 25;
    if (/premium|enhanced|siri/i.test(n)) s += 30;
    if (/google/i.test(n)) s += 22;
    if (want === 'GB' && /(sonia|libby|ryan|maisie|thomas|daniel|serena|kate|arthur|martha|stephanie|oliver)/i.test(n)) s += 12;
    if (want === 'US' && /(aria|jenny|guy|davis|samantha|ava|allison|evan|joelle|nathan|zoe|tom)/i.test(n)) s += 12;
    if (/compact|espeak|robot|novelty|whisper|bad news|bells|bubbles|cellos|zarvox|trinoids|albert|fred|junior|ralph|kathy|bahh|boing|hysterical|pipe organ|good news|jester|organ|superstar|wobble/i.test(n)) s -= 60;
    if (v.localService === false) s += 4;
    return s;
  }
  function pick(){
    if (!ok) return null;
    try { voices = speechSynthesis.getVoices() || []; } catch(e){ voices = []; }
    var best = null, bs = -1;
    voices.forEach(function(v){ var s = score(v, acc); if (s > bs){ bs = s; best = v; } });
    return best;
  }
  if (ok){ pick(); try { speechSynthesis.addEventListener('voiceschanged', pick); } catch(e){ try { speechSynthesis.onvoiceschanged = pick; } catch(_){} } }
  function clean(t){
    return String(t || '').replace(/\(.*?\)/g, ' ').replace(/\bsb[’']s\b/gi, "somebody's").replace(/\bsb\b/gi, 'somebody').replace(/\bsth\b/gi, 'something')
      .replace(/\bsmb\b/gi, 'somebody').replace(/\bsmth\b/gi, 'something').replace(/…|\.\.\./g, ' ').replace(/\s*\/\s*/g, ', ').replace(/\s+/g, ' ').trim();
  }
  function say(t, slow){
    if (!ok || !t) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(clean(t)), v = pick();
      if (v){ u.voice = v; u.lang = v.lang; } else u.lang = acc === 'US' ? 'en-US' : 'en-GB';
      u.rate = slow ? 0.6 : 0.92; u.pitch = 1;
      speechSynthesis.speak(u);
    } catch(e){}
  }
  function ipaOf(w){
    w = String(w || '').trim();
    if (IPA[w]) return IPA[w];
    var k = Object.keys(IPA), lw = w.toLowerCase();
    for (var i = 0; i < k.length; i++) if (k[i].toLowerCase() === lw) return IPA[k[i]];
    return '';
  }
  function tEl_(card){ return card && (card.querySelector('.t') || card.querySelector('.side.front')); }
  function termOf(card){ var t = tEl_(card); if (!t) return ''; var c = t.cloneNode(true); var x = c.querySelector('.ifpr'); if (x) x.remove(); return c.textContent.replace(/\s+/g, ' ').trim(); }
  function decorate(card){
    if (!card || card.__ifpr) return; card.__ifpr = true;
    var tEl = tEl_(card); if (!tEl) return;
    var w = termOf(card), ip = ipaOf(w), inside = tEl.classList.contains('side');
    var box = document.createElement('div'); box.className = 'ifpr';
    box.innerHTML = (ip ? '<span class="ip" lang="en-fonipa" title="British pronunciation">/' + ip.replace(/[&<>]/g, '') + '/</span>' : '') +
      (ok ? '<button type="button" data-ifpr="n" aria-label="Listen to the word">🔊</button><button type="button" data-ifpr="s" aria-label="Listen slowly">🐢</button>' : '');
    inside ? tEl.appendChild(box) : tEl.insertAdjacentElement('afterend', box);
    box.addEventListener('click', function(e){ var b = e.target.closest('button'); e.stopPropagation(); if (b) say(w, b.dataset.ifpr === 's'); });
    box.addEventListener('keydown', function(e){ if (e.key === ' ' || e.key === 'Enter') e.stopPropagation(); });
    var bar = document.querySelector('.ifs-cardbar');
    if (bar && !bar.querySelector('.ifpr-bar')){
      var say0 = bar.querySelector('#say');
      if (say0 && ok){ say0.hidden = false; say0.addEventListener('click', function(e){ e.stopImmediatePropagation(); e.preventDefault(); say(termOf(document.getElementById('card')), false); }, true); }
      var g = document.createElement('span'); g.className = 'ifpr-bar';
      g.innerHTML = ok ? '<button type="button" class="ifs-link" data-ifpr="slow">🐢 Slow</button><button type="button" class="ifs-link ifpr-acc" data-ifpr="acc" aria-label="Accent">' + (acc === 'US' ? '🇺🇸 US voice' : '🇬🇧 UK voice') + '</button><button type="button" class="ifs-link" data-ifpr="auto" aria-pressed="' + auto + '">' + (auto ? '✓ Auto-play' : 'Auto-play') + '</button>' : '';
      (say0 || bar.firstChild) ? bar.insertBefore(g, say0 ? say0.nextSibling : bar.firstChild) : bar.appendChild(g);
      g.addEventListener('click', function(e){
        var b = e.target.closest('button'); if (!b) return; e.stopPropagation();
        var k = b.dataset.ifpr, cur = termOf(document.getElementById('card'));
        if (k === 'slow') say(cur, true);
        if (k === 'acc'){ acc = acc === 'GB' ? 'US' : 'GB'; LS.set('acc', acc); b.textContent = acc === 'US' ? '🇺🇸 US voice' : '🇬🇧 UK voice'; say(cur, false); }
        if (k === 'auto'){ auto = !auto; LS.set('auto', auto); b.textContent = auto ? '✓ Auto-play' : 'Auto-play'; b.setAttribute('aria-pressed', auto); if (auto) say(cur, false); }
      });
    }
    if (auto) setTimeout(function(){ say(w, false); }, 250);
  }
  function scan(root){
    var cards = (root || document).querySelectorAll('.ifs-card, .flip');
    for (var i = 0; i < cards.length; i++) decorate(cards[i]);
  }
  document.addEventListener('keydown', function(e){
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
    var c = document.getElementById('card') || document.getElementById('fl'); if (!c) return;
    if (e.key === 'p' || e.key === 'P'){ say(termOf(c), e.shiftKey); }
  });
  var stage = document.getElementById('stage') || document.body;
  new MutationObserver(function(){ scan(stage); }).observe(stage, {childList:true, subtree:true});
  scan(stage);
})();
