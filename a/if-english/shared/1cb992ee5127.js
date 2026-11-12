
/* IF pronunciation layer: British IPA (Britfone, MIT licence, (c) 2017 Jose Llarena; CMUdict fallback) and natural speech on flashcards. */
(function(){
  if (window.__ifPron) return; window.__ifPron = true;
  var IPA = {"survival":"səˈvaɪvəl","forehead":"ˈfɔːhed","symptom":"ˈsɪmptəm","absent-minded":"ˈæbsənt ˈmaɪndəd","conductor":"kənˈdʌktə","bribery":"ˈbraɪbəriː","gift of the gab":"ɡɪft əv ðə ɡæb","playlist":"ˈpleɪlɪst","apparently":"əˈpeərəntli","megacity":"ˈmeɡəsɪti","rash":"ræʃ","long-haul flight":"lɒŋ hɔːl flaɪt","scratch":"skrætʃ","tight-fisted":"taɪt ˈfɪstɪd","nap":"næp","lately":"ˈleɪtli","confidence":"ˈkɒnfɪdəns","exhausting":"ɪɡˈzɔːstɪŋ","hurricane":"ˈhʌrɪkeɪn","elderly":"ˈeldəli","offensive":"əˈfensɪv","devastated":"ˈdevəsteɪtɪd","bungee jumping":"ˈbʌndʒiː ˈdʒʌmpɪŋ","fraud":"frɔːd","hypochondriac":"ˌhaɪpəˈkɑːndriːæk","headline":"ˈhedlaɪn","cabin crew":"ˈkæbɪn kruː","laid-back":"leɪd bæk","evidence":"ˈevɪdəns","ideally":"aɪˈdɪəli","take no notice of":"teɪk nəʊ ˈnəʊtɪs əv","fake news":"feɪk njuːz","sleepwalk":"ˈsliːpwɔːk","peer":"pɪə","take your time":"teɪk jɔː taɪm","now and again":"naʊ ənd əˈɡen","check-up":"tʃek ʌp","disembark":"dɪsemˈbɑːk","side effects":"saɪd ɪˈfekts","blizzard":"ˈblɪzəd","merge":"mɜːdʒ","bits and pieces":"bɪts ənd ˈpiːsɪz","strong-willed":"strɒŋ wɪld","rhythm":"ˈrɪðəm","boarding pass":"ˈbɔːdɪŋ pɑːs","plausible":"ˈplɔːzɪbəl","flute":"fluːt","blanket":"ˈblæŋkɪt","stylish":"ˈstaɪlɪʃ","wave":"weɪv","smuggling":"ˈsmʌɡlɪŋ","impressive":"ɪmˈpresɪv","multicultural":"ˌmʌltiːˈkʌltʃərəl","follow-up question":"ˈfɒləʊ ʌp ˈkwestʃən","publicity":"pəˈblɪsɪti","audience":"ˈɔːdɪəns","astronomy":"əˈstrɒnəmi","discuss":"dɪˈskʌs","notice":"ˈnəʊtɪs","verdict":"ˈvɜːdɪkt","forecast":"ˈfɔːkɑːst","neighbourhood":"ˈneɪbəhʊd","sore throat":"sɔː θrəʊt","clone":"kləʊn","sick and tired":"sɪk ənd ˈtaɪəd","teenager":"ˈtiːneɪdʒə","overwhelmed":"ˌəʊvəˈwelmd","especially":"ɪˈspeʃli","gut feeling":"ɡʌt ˈfiːlɪŋ","jet lag":"dʒet læɡ","thrilled":"θrɪld","consumer":"kənˈsjuːmə","painkiller":"ˈpeɪnkɪlə","predictable":"prɪˈdɪktəbəl","genre":"ˈʒɒnrə","eyebrows":"ˈaɪbraʊz","take after":"teɪk ˈɑːftə","sheets":"ʃiːts","desperate":"ˈdesprɪt","direct flight":"daɪˈrekt flaɪt","biased":"ˈbaɪəst","overhead locker":"ˈəʊvəhed ˈlɒkə","eco-friendly":"ˈiːkəʊ ˈfrendli","saxophone":"ˈsæksəfəʊn","job-seeker":"dʒɒb ˈsiːkə","light-hearted":"laɪt ˈhɑːtəd","coincidence":"kəʊˈɪnsɪdɪns","source":"sɔːs","wrinkles":"ˈrɪŋkəlz","wrist":"rɪst","fossil fuels":"ˈfɒsəl ˈfjuːəlz","touch and go":"tʌtʃ ənd ɡəʊ","remind":"rɪˈmaɪnd","biography":"baɪˈɒɡrəfi","open-minded":"ˈəʊpən ˈmaɪndəd","psychic":"ˈsaɪkɪk","wingsuit flying":"ˈwɪŋsuːt ˈflaɪɪŋ","customs":"ˈkʌstəmz","drizzling":"ˈdrɪzəlɪŋ","guinea pig":"ˈɡɪni pɪɡ","inspiring":"ˌɪnˈspaɪrɪŋ","acquitted":"əˈkwɪtɪd","shrug":"ʃrʌɡ","spooky":"ˈspuːki","yawn":"jɔːn","judge":"dʒʌdʒ","travel insurance":"ˈtrævəl ɪnˈʃɔːrəns","pillow":"ˈpɪləʊ","adrenaline rush":"əˈdrenələn rʌʃ","safe and sound":"seɪf ənd saʊnd","chauffeur":"ʃəʊˈfɜː","argue":"ˈɑːɡjuː","flop":"flɒp","legroom":"ləɡˈruːm","work–life balance":"wɜːk laɪf ˈbæləns","trendy":"ˈtrendiː","intruder":"ˌɪnˈtruːdə","objective":"əbˈdʒektɪv","CV":"ˌsiːˈviː","sprain":"spreɪn","tabloid":"ˈtæblɔɪd","wait and see":"weɪt ənd siː","set the alarm":"set ðə əˈlɑːm","censored":"ˈsensəd","snore":"snɔː","plot":"plɒt","boom":"buːm","superstitious":"ˌsuːpəˈstɪʃəs","applicant":"ˈæplɪkənt","take off":"teɪk ɒf","unemployment":"ˌʌnɪmˈplɔɪmənt","disappointed":"ˌdɪsəˈpɔɪntɪd","jury":"ˈdʒʊəri","encore":"ˈɑːnkɔː","gate":"ɡeɪt","composer":"kəmˈpəʊzə","chemistry":"ˈkemɪstri","aisle seat":"aɪl siːt","unless":"ʌnˈles","campaign":"kæmˈpeɪn","warn":"wɔːn","kneel":"niːl","refuse":"rɪˈfjuːz","law and order":"lɔː ənd ˈɔːdə","salary":"ˈsæləri","risk-taker":"rɪsk ˈteɪkə","shelter":"ˈʃeltə","hoodie":"ˈhʊdi","check in":"tʃek ɪn","frown":"fraʊn","eye contact":"aɪ kənˈtækt","duvet":"ˈduːveɪ","chilly":"ˈtʃɪli","cello":"ˈtʃeləʊ","hail":"heɪl","soprano":"səˈprɑːnəʊ","in the end":"ɪn ðə end","renewable":"rɪˈnjuːəbəl","traffic":"ˈtræfɪk","stressful":"ˈstresfəl","set up":"set ʌp","turbulence":"ˈtɜːbjələns","experiment":"ɪkˈsperɪmənt","misleading":"mɪˈsliːdɪŋ","middle-aged":"ˈmɪdəl eɪdʒd","pouring":"ˈpɔːrɪŋ","homesick":"ˈhəʊmsɪk","self-centred":"self ˈsentəd","faint":"feɪnt","gravity":"ˈɡrævɪti","scenery":"ˈsiːnəri","nightmare":"ˈnaɪtmeə","rise":"raɪz","generation gap":"ˌdʒenəˈreɪʃən ɡæp","choir":"ˈkwaɪə","eventually":"ɪˈventʃʊəli","lightning":"ˈlaɪtnɪŋ","take advantage of":"teɪk ədˈvɑːntɪdʒ əv","rota":"ˈrəʊtə","stunned":"stʌnd","skyline":"ˈskaɪlaɪn","frustrated":"frʌˈstreɪtɪd","persuade":"pəˈsweɪd","take place":"teɪk pleɪs","sound bite":"saʊnd baɪt","get changed":"ɡet tʃeɪndʒd","editor":"ˈedɪtə","wink":"wɪŋk","homeless":"ˈhəʊmlɪs","launch":"lɔːntʃ","basically":"ˈbeɪsɪkli","interviewer":"ˈɪntəvjuːə","kidnapping":"ˈkɪdnæpɪŋ","flood":"flʌd","striped":"straɪpt","suit (verb)":"suːt","brand":"brænd","baggage reclaim":"ˈbæɡədʒ rɪˈkleɪm","antisocial":"ˌæntɪˈsəʊʃəl","retired":"rɪˈtaɪəd","heatwave":"ˈhiːtweɪv","prevent":"prɪˈvent","old-fashioned":"əʊld ˈfæʃənd","research":"rɪˈsɜːtʃ","silently":"ˈsaɪləntli","fortune-teller":"ˈfɔːtʃən ˈtelə","by and large":"baɪ ənd lɑːdʒ","teleportation":"ˌtelɪpɔːˈteɪʃən","overcrowded":"ˈəʊvəkraʊdɪd","prescription":"prɪˈskrɪpʃən","relieved":"rɪˈliːvd","hardly":"ˈhɑːdli","dress up":"dres ʌp","offended":"əˈfendɪd","deny":"dɪˈnaɪ","clue":"kluː","take over":"teɪk ˈəʊvə","fast asleep":"fɑːst əˈsliːp","far-fetched":"fɑː fetʃt","twist":"twɪst","in case":"ɪn keɪs","witness":"ˈwɪtnɪs","physics":"ˈfɪzɪks","smog":"smɒɡ","realize":"ˈrɪəlaɪz","curiosity":"kjʊərɪˈɒsɪti","agony aunt":"ˈæɡəni ɑːnt","enthusiastic":"ɪnθˌjuːzɪˈæstɪk","blackmail":"ˈblækmeɪl","food poisoning":"fuːd ˈpɔɪzənɪŋ","lend":"lend","insomnia":"ˌɪnˈsɑːmniːə","take up":"teɪk ʌp","drought":"draʊt","peace and quiet":"piːs ənd ˈkwaɪət","honesty":"ˈɒnɪsti","nosy":"ˈnəʊzi","cliffhanger":"ˈklɪfhæŋə","avalanche":"ˈævəlæntʃ","orator":"ˈɔːrətə","slogan":"ˈsləʊɡən","denim":"ˈdenɪm","bandage":"ˈbændɪdʒ","pros and cons":"prəʊz ənd kɒnz","chew":"tʃuː","commentator":"ˈkɒmənteɪtə","light sleeper":"laɪt ˈsliːpə","accommodation":"əˌkɒməˈdeɪʃən","obviously":"ˈɒbvɪəsli","sensational":"senˈseɪʃənəl","embarrassing":"ɪmˈbærəsɪŋ","paparazzi":"ˌpɑːpɑːˈrɔːziː","laboratory":"ləˈbɒrətəri","annoying":"əˈnɔɪɪŋ","manufacture":"ˌmænjʊˈfæktʃə","oversleep":"ˌəʊvəˈsliːp","hacker":"ˈhækə","reporter":"rɪˈpɔːtə","grateful":"ˈɡreɪtfəl","daring":"ˈderɪŋ","scruffy":"ˈskrʌfi","fed up":"fed ʌp","newsreader":"ˈnjuːzriːdə","bewildered":"bɪˈwɪldəd","stubble":"ˈstʌbəl","humid":"ˈhjuːmɪd","big-headed":"bɪɡ ˈhedɪd","pharmacy":"ˈfɑːməsi","avoid":"əˈvɔɪd","rejection":"rɪˈdʒekʃən","scam":"skæm","outskirts":"ˈaʊtskɜːts","theory":"ˈθɪəri","flatmate":"ˈflætmeɪt","impromptu":"ˌɪmˈprɑːmptuː","blister":"ˈblɪstə","underdeveloped":"ˌʌndədɪˈveləpt","terrifying":"ˈterəfaɪɪŋ","rob":"rɒb","take care of":"teɪk keə əv","bilingual":"baɪˈlɪŋɡwəl","infuriating":"ˌɪnˈfjʊriːeɪtɪŋ","vandalism":"ˈvændəlɪzəm","borrow":"ˈbɒrəʊ","discovery":"dɪˈskʌvri","regret":"rɪˈɡret","dizzy":"ˈdɪzi","genetics":"dʒəˈnetɪks","burglar":"ˈbɜːɡlə","allergic":"əˈlɜːdʒɪk","sprawling":"ˈsprɔːlɪŋ","expand":"ɪkˈspænd","horrified":"ˈhɔːrəfaɪd","geek":"ɡiːk","lyrics":"ˈlɪrɪks","confusing":"kənˈfjuːzɪŋ","recession":"rɪˈseʃən","sneeze":"sniːz","delayed":"dɪˈleɪd","mugger":"ˈmʌɡə","foolproof":"ˈfuːlpruːf","stare":"steə","body language":"ˈbɒdi ˈlæŋɡwɪdʒ","two-faced":"tuː feɪst","small talk":"smɔːl tɔːk","skydiving":"ˈskaɪdaɪvɪŋ","orchestra":"ˈɔːkɪstrə","ankle":"ˈæŋkəl","sleep like a log":"sliːp laɪk ə lɒɡ","barista":"bɑːˈriːstə","hug":"hʌɡ","gradually":"ˈɡrædjʊli","export":"ˈekspɔːt"};
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
