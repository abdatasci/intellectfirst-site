
/* IF pronunciation layer: British IPA (Britfone, MIT licence, (c) 2017 Jose Llarena; CMUdict fallback) and natural speech on flashcards. */
(function(){
  if (window.__ifPron) return; window.__ifPron = true;
  var IPA = {"spend":"spend","vet":"vet","article":"ˈɑːtɪkəl","noisy":"ˈnɔɪzi","weather forecast":"ˈweðə ˈfɔːkɑːst","ghost":"ɡəʊst","beat":"biːt","rink":"rɪŋk","goggles":"ˈɡɑːɡəlz","career":"kəˈrɪə","guidebook":"ˈɡaɪdbʊk","disappear":"ˌdɪsəˈpɪə","pavement":"ˈpeɪvmənt","ring":"rɪŋ","endangered":"enˈdeɪndʒəd","treasure":"ˈtreʒə","headline":"ˈhedlaɪn","confident":"ˈkɒnfɪdənt","evidence":"ˈevɪdəns","healthy":"ˈhelθi","experience":"ɪkˈspɪərɪəns","celebrity":"səˈlebrɪti","fake news":"feɪk njuːz","campsite":"ˈkæmpsaɪt","balcony":"ˈbælkəni","newspaper":"ˈnjuːzpeɪpə","track":"træk","uniform":"ˈjuːnɪfɔːm","knee":"niː","solve":"sɒlv","waterfall":"ˈwɔːtəfɔːl","neighbour":"ˈneɪbə","racket":"ˈrækɪt","battery":"ˈbætəri","hand in":"hænd ɪn","thunderstorm":"ˈθʌndəstɔːm","shelf":"ʃelf","take an exam":"teɪk ən ɪɡˈzæm","certificate":"səˈtɪfɪkɪt","rehearse":"riːˈhɜːs","turn left":"tɜːn left","guest":"ɡest","bracelet":"ˈbreɪslɪt","vitamins":"ˈvɪtəmɪnz","get on with":"ɡet ɒn wɪð","boarding pass":"ˈbɔːdɪŋ pɑːs","square":"skweə","energy":"ˈenədʒi","dessert":"dɪˈzɜːt","legend":"ˈledʒənd","succeed":"səkˈsiːd","cash machine":"kæʃ məˈʃiːn","delete":"dɪˈliːt","fog":"fɒɡ","pedestrian crossing":"pɪˈdestrɪən ˈkrɒsɪŋ","audience":"ˈɔːdɪəns","passport":"ˈpɑːspɔːt","banknote":"ˈbæŋknəʊt","referee":"ˌrefəˈriː","stage":"steɪdʒ","rocket":"ˈrɒkɪt","opponent":"əˈpəʊnənt","mechanic":"mɪˈkænɪk","forecast":"ˈfɔːkɑːst","share":"ʃeə","delivery":"dɪˈlɪvəri","piggy bank":"ˈpɪɡiː bæŋk","messy":"ˈmesi","lonely":"ˈləʊnli","traffic lights":"ˈtræfɪk laɪts","stairs":"steəz","surprise":"səˈpraɪz","necklace":"ˈneklɪs","stretch":"stretʃ","boss":"bɒs","receipt":"rɪˈsiːt","practise":"ˈpræktɪs","cotton":"ˈkɒtən","hang out":"hæŋ aʊt","fireworks":"ˈfaɪwɜːks","believe in":"bɪˈliːv ɪn","loyal":"ˈlɔɪəl","volcano":"vɒlˈkeɪnəʊ","reception":"rɪˈsepʃən","try on":"traɪ ɒn","proud":"praʊd","delay":"dɪˈleɪ","festival":"ˈfestɪvəl","starve":"stɑːv","wildfire":"ˈwaɪldfaɪə","earrings":"ˈɪərɪŋz","cartoon":"kɑːˈtuːn","spooky":"ˈspuːki","tired":"ˈtaɪəd","injury":"ˈɪndʒəri","book":"bʊk","charger":"ˈtʃɑːdʒə","keep in touch":"kiːp ɪn tʌtʃ","snowstorm":"ˈsnəʊstɔːm","honest":"ˈɒnɪst","exercise":"ˈeksəsaɪz","astronaut":"ˈæstrənɑːt","wildlife":"ˈwaɪldlaɪf","apologise":"əˈpɒlədʒaɪz","canteen":"kænˈtiːn","argue":"ˈɑːɡjuː","steppe":"step","suit":"suːt","science lab":"ˈsaɪəns læb","review":"rɪˈvjuː","vegetables":"ˈvedʒtəbəlz","screenshot":"ˈskriːnʃɒt","plot":"plɒt","console":"ˈkɒnsəʊl","presenter":"ˈprezəntə","creative":"kriːˈeɪtɪv","planet":"ˈplænɪt","wool":"wʊl","perform":"pəˈfɔːm","performance":"pəˈfɔːməns","score":"skɔː","solar power":"ˈsəʊlə ˈpaʊə","court":"kɔːt","channel":"ˈtʃænəl","protect":"prəˈtekt","result":"rɪˈzʌlt","luggage":"ˈlʌɡɪdʒ","owe":"əʊ","storm":"stɔːm","laptop":"ˈlæptɒp","discover":"dɪˈskʌvə","go straight on":"ɡəʊ streɪt ɒn","unhealthy":"ənˈhelθiː","custom":"ˈkʌstəm","put up with":"pʊt ʌp wɪð","chemistry":"ˈkemɪstri","changing room":"ˈtʃeɪndʒɪŋ ruːm","snack":"snæk","helmet":"ˈhelmɪt","download":"ˈdaʊnləʊd","salary":"ˈsæləri","balanced diet":"ˈbælənst ˈdaɪət","environment":"ɪnˈvaɪrənmənt","gadget":"ˈɡædʒɪt","hoodie":"ˈhʊdi","check in":"tʃek ɪn","recipe":"ˈresɪpi","climate":"ˈklaɪmɪt","duvet":"ˈduːveɪ","broadcast":"ˈbrɔːdkɑːst","opposite":"ˈɒpəzɪt","advert":"ædˈvɜːt","publish":"ˈpʌblɪʃ","fried":"fraɪd","fridge":"frɪdʒ","tornado":"tɔːˈneɪdəʊ","look back":"lʊk bæk","microscope":"ˈmaɪkrəskəʊp","experiment":"ɪkˈsperɪmənt","tidy":"ˈtaɪdi","crowded":"ˈkraʊdɪd","full moon":"fʊl muːn","earn":"ɜːn","headphones":"ˈhedfəʊnz","wish":"wɪʃ","school trip":"skuːl trɪp","spicy":"ˈspaɪsi","heart":"hɑːt","password":"ˈpɑːswɜːd","relatives":"ˈrelətɪvz","improve":"ɪmˈpruːv","lightning":"ˈlaɪtnɪŋ","upload":"ˈʌpləʊd","candles":"ˈkændəlz","notification":"ˌnəʊtɪfɪˈkeɪʃən","basement":"ˈbeɪsmənt","trainers":"ˈtreɪnəz","set off":"set ɒf","mystery":"ˈmɪstəri","recycle":"riːˈsaɪkəl","coin":"kɔɪn","discount":"ˈdɪskaʊnt","valley":"ˈvæli","fact":"fækt","creature":"ˈkriːtʃə","save energy":"seɪv ˈenədʒi","breaking news":"ˈbreɪkɪŋ njuːz","interview":"ˈɪntəvjuː","internship":"ˈɪntənʃɪp","launch":"lɔːntʃ","flood":"flʌd","move house":"muːv haʊs","documentary":"ˌdɒkjʊˈmentəri","engineer":"ˌendʒɪˈnɪə","heatwave":"ˈhiːtweɪv","costume":"ˈkɒstjuːm","departures":"dɪˈpɑːtʃəz","gym":"dʒɪm","pollution":"pəˈluːʃən","refund":"ˈriːfʌnd","souvenir":"ˈsuːvənɪə","programmer":"ˈprəʊɡræmə","progress":"ˈprəʊɡres","muscles":"ˈmʌsəlz","between":"bɪˈtwiːn","comet":"ˈkɒmɪt","secret":"ˈsiːkrɪt","hall":"hɔːl","timetable":"ˈtaɪmteɪbəl","get lost":"ɡet lɒst","warm up":"wɔːm ʌp","subject":"səbˈdʒekt","slope":"sləʊp","wireless":"ˈwaɪəlɪs","satellite":"ˈsætəlaɪt","lawyer":"ˈlɔɪə","yurt":"jʊt","wardrobe":"ˈwɔːdrəʊb","revise":"rɪˈvaɪz","save up":"seɪv ʌp","director":"daɪˈrektə","alien":"ˈeɪlɪən","factory":"ˈfæktəri","clue":"kluː","audition":"ɔːˈdɪʃən","summer camp":"ˈsʌmə kæmp","app":"æp","trust":"trʌst","fit":"fɪt","fall out with":"fɔːl aʊt wɪð","witness":"ˈwɪtnɪs","abroad":"əˈbrɔːd","celebrate":"ˈseləbreɪt","achievement":"əˈtʃiːvmənt","journey":"ˈdʒɜːni","cooker":"ˈkʊkə","tram":"træm","strange":"streɪndʒ","crossroads":"ˈkrɔːsrəʊdz","playground":"ˈpleɪɡraʊnd","leather":"ˈleðə","trip":"trɪp","lend":"lend","take up":"teɪk ʌp","drought":"draʊt","jealous":"ˈdʒeləs","balloons":"bəˈluːnz","denim":"ˈdenɪm","protein":"ˈprəʊtiːn","pocket money":"ˈpɒkɪt ˈmʌni","active":"ˈæktɪv","series":"ˈsɪəriːz","draw":"drɔː","fan":"fæn","tradition":"trəˈdɪʃən","invitation":"ˌɪnvɪˈteɪʃən","price":"praɪs","attend":"əˈtend","blogger":"ˈblɒɡə","electricity":"ɪˌlekˈtrɪsɪti","pitch":"pɪtʃ","champion":"ˈtʃæmpɪən","laboratory":"ləˈbɒrətəri","vegetarian":"ˌvedʒɪˈteərɪən","homemade":"ˈhəʊmˈmeɪd","thunder":"ˈθʌndə","reporter":"rɪˈpɔːtə","raw":"rɔː","talent show":"ˈtælənt ʃəʊ","grateful":"ˈɡreɪtfəl","ingredients":"ɪnˈɡriːdɪənts","afford":"əˈfɔːd","award":"əˈwɔːd","look up to":"lʊk ʌp tə","block of flats":"blɒk əv flæts","fussy":"ˈfʌsi","cave":"keɪv","cash":"kæʃ","coach":"kəʊtʃ","underground":"ˈʌndəɡraʊnd","reuse":"riːˈjuːs","invention":"ɪnˈvenʃən","skill":"skɪl","telescope":"ˈtelɪskəʊp","borrow":"ˈbɒrəʊ","sightseeing":"ˈsaɪtˈsiːɪŋ","patient":"ˈpeɪʃənt","temperature":"ˈtemprətʃə","parade":"pəˈreɪd","detective":"dɪˈtektɪv","proof":"pruːf","stranger":"ˈstreɪndʒə","apply":"əˈplaɪ","race":"reɪs","platform":"ˈplætfɔːm","junk food":"dʒʌŋk fuːd","lyrics":"ˈlɪrɪks","memory":"ˈmeməri","sports field":"spɔːts fiːld","portion":"ˈpɔːʃən","goal":"ɡəʊl","desert":"dɪˈzɜːt","firefighter":"ˈfaɪfaɪtə","screen time":"skriːn taɪm","generous":"ˈdʒenərəs","skyscraper":"ˈskaɪskreɪpə","garage":"ˈɡærɑːʒ","ankle":"ˈæŋkəl","magnet":"ˈmæɡnɪt","decorate":"ˈdekəreɪt","make up":"meɪk ʌp","waste":"weɪst","episode":"ˈepɪsəʊd","curtains":"ˈkɜːtənz","coast":"kəʊst","bridge":"brɪdʒ"};
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
