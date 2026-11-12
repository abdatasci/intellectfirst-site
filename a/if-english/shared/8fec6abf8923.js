
/* IF pronunciation layer: British IPA (Britfone, MIT licence, (c) 2017 Jose Llarena; CMUdict fallback) and natural speech on flashcards. */
(function(){
  if (window.__ifPron) return; window.__ifPron = true;
  var IPA = {"cousin":"ˈkʌzən","spend":"spend","spell":"spel","hospital":"ˈhɒspɪtəl","price tag":"praɪs tæɡ","rest":"rest","article":"ˈɑːtɪkəl","noisy":"ˈnɔɪzi","near":"nɪə","collect":"kəˈlekt","Chinese":"tʃaɪˈniːz","When…?":"wen","chess":"tʃes","team":"tiːm","return ticket":"rɪˈtɜːn ˈtɪkɪt","favourite":"ˈfeɪvərɪt","twins":"twɪnz","fail":"feɪl","Where…?":"weə","expensive":"ɪkˈspensɪv","foreign":"ˈfɒrɪn","dinner":"ˈdɪnə","traffic":"ˈtræfɪk","form":"fɔːm","twenty-first":"ˈtwenti fɜːst","quarter past":"ˈkwɔːtə pɑːst","dictionary":"ˈdɪkʃənəri","I think…":"aɪ θɪŋk","film":"fɪlm","fifty":"ˈfɪfti","passenger":"ˈpæsəndʒə","driver":"ˈdraɪvə","once a week":"wʌns ə wiːk","cloudy":"ˈklaʊdi","map":"mæp","invented":"ɪnˈventɪd","hobby":"ˈhɒbi","try on":"traɪ ɒn","funny":"ˈfʌni","player":"ˈpleɪə","plan":"plæn","far":"fɑː","rule":"ruːl","a bottle of":"ə ˈbɒtəl əv","scarf":"skɑːf","leave":"liːv","match":"mætʃ","sunny":"ˈsʌni","always":"ˈɔːlwɪz","price":"praɪs","went":"went","headache":"ˈhedeɪk","party":"ˈpɑːti","tall":"tɔːl","might":"maɪt","join":"dʒɔɪn","medicine":"ˈmedɪsɪn","What's the matter?":"wʌts ðə ˈmætə","password":"ˈpɑːswɜːd","a slice of":"ə slaɪs əv","because":"bɪˈkɒz","Spanish":"ˈspænɪʃ","busy":"ˈbɪzi","took":"tʊk","What time…?":"wɒt taɪm","online":"ˈɒnlaɪn","windy":"ˈwɪndi","skateboarding":"ˈskeɪtbɔːdɪŋ","any":"ˈeni","suitcase":"ˈsuːtkeɪs","pounds":"paʊndz","rice":"raɪs","How much…?":"haʊ mʌtʃ","play tennis":"pleɪ ˈtenɪs","third":"θɜːd","message":"ˈmesɪdʒ","field":"fiːld","invite":"ɪnˈvaɪt","healthy":"ˈhelθi","garden":"ˈɡɑːdən","cold":"kəʊld","until":"ʌnˈtɪl","building":"ˈbɪldɪŋ","stadium":"ˈsteɪdɪəm","tired":"ˈtaɪəd","worried":"ˈwʌrid","newspaper":"ˈnjuːzpeɪpə","mustn't":"ˈmʌsənt","Kazakhstan":"ˌkɑːzɑːkˈstɑːn","fill in":"fɪl ɪn","exam":"ɪɡˈzæm","fifteen":"ˈfɪftiːn","should":"ʃʊd","uniform":"ˈjuːnɪfɔːm","sale":"seɪl","football":"ˈfʊtbɔːl","break":"breɪk","French":"frentʃ","bank":"bæŋk","calendar":"ˈkælɪndə","get up":"ɡet ʌp","surprised":"səˈpraɪzd","fee":"fiː","exercise":"ˈeksəsaɪz","queue":"kjuː","photography":"fəˈtɒɡrəfi","member":"ˈmembə","cheese":"tʃiːz","lose":"luːz","holiday":"ˈhɒlɪdeɪ","usually":"ˈjuːʒʊəli","chemist's":"ˈkemɪstz","teacher":"ˈtiːtʃə","open":"ˈəʊpən","bread":"bred","shelf":"ʃelf","boots":"buːts","juice":"dʒuːs","customer":"ˈkʌstəmə","quiet":"ˈkwaɪət","on time":"ɒn taɪm","museum":"mjuːˈzɪəm","quarter to":"ˈkwɔːtə tə","sofa":"ˈsəʊfə","never":"ˈnevə","win":"wɪn","underground":"ˈʌndəɡraʊnd","don't have to":"dəʊnt həv tə","sweater":"ˈswetə","some":"sʌm","comfortable":"ˈkʌmftəbəl","turn left":"tɜːn left","club":"klʌb","arrive":"əˈraɪv","single ticket":"ˈsɪŋɡəl ˈtɪkɪt","call back":"kɔːl bæk","programme":"ˈprəʊɡræm","library":"ˈlaɪbrəri","ticket":"ˈtɪkɪt","hotel":"həʊˈtel","exit":"ˈeɡzɪt","late":"leɪt","vegetables":"ˈvedʒtəbəlz","My name is…":"maɪ neɪm ɪz","pass":"pɑːs","menu":"ˈmenjuː","shopping centre":"ˈʃɒpɪŋ ˈsentə","date":"deɪt","excited":"ɪkˈsaɪtɪd","corner":"ˈkɔːnə","mountain":"ˈmaʊntɪn","bought":"bɔːt","forest":"ˈfɒrɪst","husband":"ˈhʌzbənd","park":"pɑːk","flight":"flaɪt","website":"ˈwebsaɪt","flat":"flæt","in the morning":"ɪn ðə ˈmɔːnɪŋ","during":"ˈdjʊərɪŋ","enjoy":"enˈdʒɔɪ","sightseeing":"ˈsaɪtˈsiːɪŋ","free time":"friː taɪm","guitar":"ɡɪˈtɑː","temperature":"ˈtemprətʃə","shy":"ʃaɪ","curly":"ˈkɜːli","beach":"biːtʃ","thirty":"ˈθɜːti","lamp":"læmp","must":"mʌst","tour":"tʊə","faster":"ˈfɑːstə","between":"bɪˈtwiːn","appointment":"əˈpɔɪntmənt","aunt":"ɑːnt","nationality":"ˌnæʃəˈnælɪti","channel":"ˈtʃænəl","cheap":"tʃiːp","airport":"ˈeəpɔːt","going to":"ˈɡəʊɪŋ tə","homework":"ˈhəʊmwɜːk","half past":"hɑːf pɑːst","lunch":"lʌntʃ","bedroom":"ˈbedruːm","post office":"pəʊst ˈɒfɪs","island":"ˈaɪlənd","timetable":"ˈtaɪmteɪbəl","grandparents":"ɡˈrændperənts","straight on":"streɪt ɒn","laptop":"ˈlæptɒp","entrance":"ˈentrəns","have breakfast":"həv ˈbrekfəst","on Monday":"ɒn ˈmʌndi","sore throat":"sɔː θrəʊt","bathroom":"ˈbɑːθruːm","free":"friː","arrange":"əˈreɪndʒ","subject":"səbˈdʒekt","station":"ˈsteɪʃən","I live in…":"aɪ lɪv ɪn","town centre":"taʊn ˈsentə","concert":"ˈkɒnsət","motorbike":"ˈməʊtəbaɪk","phone number":"fəʊn ˈnʌmbə","tent":"tent","basketball":"ˈbɑːskɪtbɔːl","gloves":"ɡlʌvz","download":"ˈdaʊnləʊd","snowy":"ˈsnəʊi","would rather":"wʊd ˈrɑːðə","notebook":"ˈnəʊtbʊk","a little":"ə ˈlɪtəl","goal":"ɡəʊl","wardrobe":"ˈwɔːdrəʊb","skiing":"ˈskiːɪŋ","paint":"peɪnt","friendly":"ˈfrendli","flew":"fluː","do judo":"duː ˈdʒuːdəʊ","midnight":"ˈmɪdnaɪt","thirteen":"ˈθɜːtiːn","first":"fɜːst","opening times":"ˈəʊpənɪŋ taɪmz","closed":"kləʊzd","accept":"əkˈsept","second":"ˈsekənd","dentist":"ˈdentɪst","lesson":"ˈlesən","prefer":"prɪˈfɜː","postcard":"ˈpəʊskɑːd","bill":"bɪl","breakfast":"ˈbrekfəst","Kazakh":"ˈkæzæk","sometimes":"səmˈtaɪmz","app":"æp","camping":"ˈkæmpɪŋ","at the weekend":"ət ðə ˈwiːkend","waiter":"ˈweɪtə","saw":"sɔː","birthday":"ˈbɜːθdeɪ","classroom":"ˈklɑːsruːm","magazine":"ˈmæɡəziːn","leave a message":"liːv ə ˈmesɪdʒ","cycling":"ˈsaɪklɪŋ","opposite":"ˈɒpəzɪt","river":"ˈrɪvə","go swimming":"ɡəʊ ˈswɪmɪŋ","coat":"kəʊt","advert":"ædˈvɜːt","kitchen":"ˈkɪtʃən","bored":"bɔːd","beard":"bɪəd"};
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
