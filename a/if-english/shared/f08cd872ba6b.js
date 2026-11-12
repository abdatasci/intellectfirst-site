
/* IF pronunciation layer: British IPA (Britfone, MIT licence, (c) 2017 Jose Llarena; CMUdict fallback) and natural speech on flashcards. */
(function(){
  if (window.__ifPron) return; window.__ifPron = true;
  var IPA = {"wellbeing":"ˌwelˈbiːɪŋ","invest":"ɪnˈvest","offence":"əˈfens","extinct":"ɪkˈstɪŋkt","in retrospect":"ɪn ˈretrəspekt","mature":"məˈtʃʊə","power station":"ˈpaʊə ˈsteɪʃən","settle down":"ˈsetəl daʊn","bias":"ˈbaɪəs","elderly":"ˈeldəli","negotiate":"nɪˈɡəʊʃɪeɪt","sentence":"ˈsentəns","feasible":"ˈfiːzɪbəl","role model":"rəʊl ˈmɒdəl","galaxy":"ˈɡæləksi","strict":"strɪkt","endangered":"enˈdeɪndʒəd","mass-produced":"mæs prəˈdjuːst","headline":"ˈhedlaɪn","sedentary":"ˈsedənteriː","reoffend":"riːɔːˈfend","commute":"kəˈmjuːt","state-of-the-art":"steɪt əv ðə ɑːt","relocate":"ˌriːˈləʊkeɪt","database":"ˈdeɪtəbeɪs","obsolete":"ˈɑːbsəliːt","curriculum":"kəˈrɪkjʊləm","deterrent":"dɪˈterənt","imprisonment":"ɪmˈprɪzənmənt","extended family":"ɪkˈstendɪd ˈfæmli","jargon":"ˈdʒɑːɡən","genetically modified":"dʒəˈnetɪkəli ˈmɒdɪfaɪd","urbanisation":"ˌɜːbənaɪˈzeɪʃən","intellect":"ˈɪntəlekt","irrigation":"ˌɪrɪˈɡeɪʃən","memory loss":"ˈmeməri lɒs","suburb":"ˈsʌbɜːb","rebellious":"rɪˈbeljəs","offender":"əˈfendə","century":"ˈsentʃəri","broadsheet":"ˈbrɔːdʃiːt","exploration":"ˌekspləˈreɪʃən","software":"ˈsɒfweə","workforce":"ˈwɜːkfɔːs","acclaimed":"əˈkleɪmd","streamline":"ˈstriːmlaɪn","revenue":"ˈrevənjuː","deadline":"ˈdedlaɪn","tutorial":"tjuːˈtɔːrɪəl","green space":"ɡriːn speɪs","audience":"ˈɔːdɪəns","fertile":"ˈfɜːtəl","astronomy":"əˈstrɒnəmi","independence":"ˌɪndɪˈpendəns","muscle tone":"ˈmʌsəl təʊn","ancient":"ˈeɪnʃənt","verdict":"ˈvɜːdɪkt","high-rise":"haɪ raɪz","inherit":"ɪnˈherɪt","crop":"krɒp","formative years":"ˈfɔːmətɪv jɪəz","frugal":"ˈfruːɡəl","itinerary":"aɪˈtɪnəreriː","spacecraft":"ˈspeɪskrɑːft","staple food":"ˈsteɪpəl fuːd","agriculture":"ˈæɡrɪkʌltʃə","slum":"slʌm","consumer":"kənˈsjuːmə","quality of life":"ˈkwɒlɪti əv laɪf","genre":"ˈʒɒnrə","retail":"ˈriːteɪl","rehabilitation":"ˌriːəbɪlɪˈteɪʃən","deplete":"dɪˈpliːt","critic":"ˈkrɪtɪk","prosperity":"prɒˈsperɪti","competitor":"kəmˈpetɪtə","abstract":"æbˈstrækt","archaeologist":"ˌɑːkiːˈɑːlədʒɪst","mature student":"məˈtʃʊə ˈstjuːdənt","calorie intake":"ˈkæləriː ˈɪnteɪk","biodiversity":"ˌbaɪəʊdaɪˈvɜːsɪti","ergonomic":"ˌɜːɡəˈnɑːmɪk","standard of living":"ˈstændəd əv ˈlɪvɪŋ","fossil fuels":"ˈfɒsəl ˈfjuːəlz","milestone":"ˈmaɪlstəʊn","famine":"ˈfæmən","law-abiding":"lɔː əˈbaɪdɪŋ","gallery":"ˈɡæləri","metropolis":"məˈtrɑːpələs","food security":"fuːd sɪˈkjʊərɪti","automation":"ɔːtəˈmeɪʃən","habitat":"ˈhæbɪtæt","residential":"ˌrezɪˈdenʃəl","undergraduate":"ˌʌndəˈɡrædjʊət","livestock":"ˈlaɪvstɒk","creativity":"ˌkriːeɪˈtɪvɪti","sensationalism":"senˈseɪʃənəlɪzəm","bankrupt":"ˈbæŋkrəpt","masterpiece":"ˈmæstəpiːs","adolescence":"ˌædəˈlesəns","compatible":"kəmˈpætɪbəl","descendant":"dɪˈsendənt","emissions":"ɪˈmɪʃənz","amenities":"əˈmenɪtiz","instinct":"ˈɪnstɪŋkt","dissertation":"dɪsəˈteɪʃən","inequality":"ˌɪnɪˈkwɒlɪti","moderation":"ˌmɑːdˈəreɪʃən","get your point across":"ɡet jɔː pɔɪnt əˈkrɒs","obesity":"əʊˈbiːsɪti","upgrade":"ˈʌpɡreɪd","conservation":"ˌkɒnsəˈveɪʃən","deforestation":"dɪˌfɔːrɪˈsteɪʃən","contemporary":"kənˈtempərəri","astronaut":"ˈæstrənɑːt","harness":"ˈhɑːnɪs","rural":"ˈrʊərəl","functional":"ˈfʌŋkʃənəl","preserve":"prɪˈzɜːv","work–life balance":"wɜːk laɪf ˈbæləns","enrol":"enˈrəʊl","social media":"ˈsəʊʃəl ˈmiːdɪə","deficiency":"dɪˈfɪʃənsi","enforce":"enˈfɔːs","objective":"əbˈdʒektɪv","tabloid":"ˈtæblɔɪd","plagiarism":"ˈpleɪdʒərɪzəm","congestion":"kənˈdʒestʃən","inner city":"ˈɪnə ˈsɪti","gesture":"ˈdʒestʃə","sibling rivalry":"ˈsɪblɪŋ ˈraɪvəlriː","fatigue":"fəˈtiːɡ","acquire":"əˈkwaɪə","predator":"ˈpredətə","performance":"pəˈfɔːməns","leisure":"ˈleʒə","solar power":"ˈsəʊlə ˈpaʊə","artificial intelligence":"ˌɑːtɪˈfɪʃəl ɪnˈtelɪdʒəns","journalism":"ˈdʒɜːnəlɪzəm","jury":"ˈdʒʊəri","densely populated":"ˈdensliː ˈpɑːpjəleɪtɪd","regime":"reɪˈʒiːm","academic achievement":"ˌækəˈdemɪk əˈtʃiːvmənt","infrastructure":"ˌɪnfrəˈstrʌktʃə","mental agility":"ˈmentəl əˈdʒɪlətiː","tuition fees":"tjuːˈɪʃən fiːz","traditional values":"trəˈdɪʃənəl ˈvæljuːz","public transport":"ˈpʌblɪk trænˈspɔːt","fertiliser":"ˈfɜːtəlaɪzə","globetrotter":"ɡˈləʊbtrɔːtə","assignment":"əˈsaɪnmənt","civilisation":"ˌsɪvəlaɪˈzeɪʃən","download":"ˈdaʊnləʊd","balanced diet":"ˈbælənst ˈdaɪət","campus":"ˈkæmpəs","revolutionise":"ˌrevəˈluːʃənaɪz","yield":"jiːld","immigrant":"ˈɪməɡrənt","breakthrough":"ˈbreɪkθruː","eye contact":"aɪ kənˈtækt","digital literacy":"ˈdɪdʒɪtəl ˈlɪtərəsi","disposable income":"dɪˈspəʊzəbəl ˈɪnkʌm","broadcast":"ˈbrɔːdkɑːst","cultural heritage":"ˈkʌltʃərəl ˈherɪtɪdʒ","legislation":"ˌledʒɪˈsleɪʃən","nuclear power":"ˈnjuːklɪə ˈpaʊə","displaced":"dɪˈspleɪst","multinational":"ˌmʌltɪˈnæʃənəl","species":"ˈspiːʃiz","start-up":"stɑːt ʌp","misinterpret":"mɪsɪnˈtɜːprət","community service":"kəˈmjuːnɪti ˈsɜːvɪs","pesticide":"ˈpestɪsaɪd","affordable housing":"əˈfɔːdəbəl ˈhaʊzɪŋ","energy-efficient":"ˈenədʒi ɪˈfɪʃənt","prototype":"ˈprəʊtətaɪp","hardware":"ˈhɑːdweə","exploit":"ɪkˈsplɔɪt","gravity":"ˈɡrævɪti","vegetation":"ˌvedʒɪˈteɪʃən","poverty":"ˈpɒvəti","dependent":"dɪˈpendənt","urban sprawl":"ˈɜːbən sprɔːl","merger":"ˈmɜːdʒə","self-expression":"self ɪkˈspreʃən","inhabit":"ˌɪnˈhæbət","carbon neutral":"ˈkɑːbən ˈnjuːtrəl","ingenious":"ɪnˈdʒiːnjəs","motor skills":"ˈməʊtə skɪlz","censorship":"ˈsensəʃɪp","non-verbal":"nɒn ˈvɜːbəl","global warming":"ˈɡləʊbəl ˈwɔːmɪŋ","outsource":"ˌaʊtˈsɔːs","regenerate":"riːˈdʒenəreɪt","juvenile":"ˈdʒuːvənaɪl","sustainable":"səˈsteɪnəbəl","work out":"wɜːk aʊt","destination":"ˌdestɪˈneɪʃən","overcrowding":"ˈəʊvəkraʊdɪŋ","era":"ˈɪərə","prone to":"prəʊn tə","cutting-edge":"ˈkʌtɪŋ edʒ","carbon footprint":"ˈkɑːbən ˈfʊtprɪnt","artefact":"ˈɑːtɪfækt","unprecedented":"ʌnˈpresɪdentɪd","subsidise":"ˈsʌbsɪdaɪz","convey":"kənˈveɪ","entrepreneur":"ˌɒntrəprəˈnɜː","organic":"ˌɔːˈɡænɪk","innovation":"ˌɪnəˈveɪʃən","nature versus nurture":"ˈneɪtʃə ˈvɜːsəs ˈnɜːtʃə","launch":"lɔːntʃ","stimulate":"ˈstɪmjʊleɪt","turnover":"ˈtɜːnəʊvə","deteriorate":"dɪˈtɪərɪəreɪt","orbit":"ˈɔːbɪt","diversity":"daɪˈvɜːsɪti","aesthetic":"ɪsˈθetɪk","interdependent":"ˌɪntədɪˈpendənt","developing country":"dɪˈveləpɪŋ ˈkʌntri","pollution":"pəˈluːʃən","off the beaten track":"ɒf ðə ˈbiːtən træk","ecosystem":"ˈiːkəʊsɪstəm","fluent":"ˈfluːənt","data breach":"ˈdeɪtə briːtʃ","durable":"ˈdjʊərəbəl","atmosphere":"ˈætməsfɪə","heritage":"ˈherɪtɪdʒ","nutrition":"njuːˈtrɪʃən","sculpture":"ˈskʌlptʃə","satellite":"ˈsætəlaɪt","market share":"ˈmɑːkɪt ʃeə","trend":"trend","convict":"kənˈvɪkt","long-haul":"lɒŋ hɔːl","pedestrian":"pɪˈdestrɪən","drop out":"drɒp aʊt","bandwidth":"ˈbændwɪdθ","press":"pres","postgraduate":"pəʊstˈɡrædjʊət","self-sufficient":"self səˈfɪʃənt","affluent":"ˈæfluːənt","nuclear family":"ˈnjuːklɪə ˈfæmli","space debris":"speɪs ˈdebri","wind turbine":"wɪnd ˈtɜːbaɪn","consumerism":"kənˈsuːmərɪzəm","migrate":"maɪˈɡreɪt","infancy":"ˈɪnfənsiː","childhood":"ˈtʃaɪldhʊd","promotion":"prəˈməʊʃən","drought":"draʊt","life expectancy":"laɪf ɪkˈspektənsiː","harvest":"ˈhɑːvɪst","boost":"buːst","intensive farming":"ɪnˈtensɪv ˈfɑːmɪŋ","renewable energy":"rɪˈnjuːəbəl ˈenədʒi","cultural identity":"ˈkʌltʃərəl aɪˈdentɪti","mass tourism":"mæs ˈtʊərɪzəm","soil erosion":"sɔɪl ɪˈrəʊʒən","paparazzi":"ˌpɑːpɑːˈrɔːziː","user interface":"ˈjuːzə ˈɪntəfeɪs","globalisation":"ˌɡləʊbəlaɪˈzeɪʃən","alternative energy":"ɔːlˈtɜːnətɪv ˈenədʒi","virtual":"ˈvɜːtʃʊəl","hectic":"ˈhektɪk","user-friendly":"ˈjuːzə ˈfrendli","natural disaster":"ˈnætʃrəl dɪˈzɑːstə","portrait":"ˈpɔːtrɪt","adapt":"əˈdæpt","developed country":"dɪˈveləpt ˈkʌntri","dialect":"ˈdaɪəlekt","materialistic":"məˌtɪriːəˈlɪstɪk","innate":"ˈɪneɪt","persuasive":"pəˈsweɪsɪv","upbringing":"ˈʌpbrɪŋɪŋ","verbal":"ˈvɜːbəl","prey":"preɪ","ancestor":"ˈænsestə","exhibition":"ˌeksɪˈbɪʃən","universe":"ˈjuːnɪvɜːs","invention":"ɪnˈvenʃən","coverage":"ˈkʌvrɪdʒ","bilingual":"baɪˈlɪŋɡwəl","invasion of privacy":"ɪnˈveɪʒən əv ˈpraɪvəsi","go viral":"ɡəʊ ˈvaɪrəl","homogeneous":"ˌhəʊməˈdʒiːniːəs","cognitive":"ˈkɒɡnɪtɪv","telescope":"ˈtelɪskəʊp","vocational":"vəʊˈkeɪʃənəl","sibling":"ˈsɪblɪŋ","mother tongue":"ˈmʌðə tʌŋ","fund":"fʌnd","chronological":"ˌkrɒnəˈlɒdʒɪkəl","patent":"ˈpætənt","peer pressure":"pɪə ˈpreʃə","misinformation":"ˌmɪsɪnfəˈmeɪʃən","consumption":"kənˈsʌmʃən","stamina":"ˈstæmɪnə","finite":"ˈfaɪnaɪt","status symbol":"ˈsteɪtəs ˈsɪmbəl","emigrate":"ˈeməɡreɪt","recession":"rɪˈseʃən","scholarship":"ˈskɒləʃɪp","articulate":"ɑːˈtɪkjʊlɪt","prosecute":"ˈprɒsɪkjuːt","migration":"maɪˈɡreɪʃən","accessible":"əkˈsesɪbəl","bring up":"brɪŋ ʌp","body language":"ˈbɒdi ˈlæŋɡwɪdʒ","screen time":"skriːn taɪm","cardiovascular":"ˌkɑːdɪəʊˈvæskjʊlə","eloquent":"ˈeləkwənt","greenhouse gas":"ˈɡriːnhaʊs ɡæs","decade":"ˈdekeɪd","profit":"ˈprɒfɪt","encrypt":"enˈkrɪpt","cybersecurity":"ˌsaɪbəsɪˈkjʊərəti"};
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
