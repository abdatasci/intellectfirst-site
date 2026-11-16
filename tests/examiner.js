/* IF Academy speaking examiner. At the end of a test whose Speaking section has no mark yet, NOVA or ATLAS (the IF
   presenters, British voice from /voice.js) asks three questions at the test's level; the student answers out loud
   (or types, without a microphone). The answers go with the result and are marked by AI on the server.
   IFExaminer.run(container, { lv: 'B1', title: 'File 3 Test A' }) → Promise<answers[] | null (skipped)> */
(function () {
  'use strict';
  if (window.IFExaminer) return;
  var BANK = {
    YL: ['What is your name? How old are you?', 'What is your favourite animal? Why do you like it?', 'Tell me about your family.', 'What do you like to eat for breakfast?', 'What can you see in your classroom?', 'What do you like doing after school?', 'What is your favourite colour? What things are that colour?', 'Tell me about your best friend.'],
    A1: ['Tell me about yourself. Where are you from, and where do you live?', 'Tell me about your family.', 'What do you usually do at the weekend?', 'What is your favourite food? When do you eat it?', 'Describe your home.', 'What do you do every morning?', 'What can you do well?', 'Tell me about your best friend.'],
    A2: ['What did you do last weekend?', 'Tell me about your town. What can people do there?', 'What are your plans for the next holiday?', 'Describe a person in your family. What are they like?', 'What kind of music or films do you like, and why?', 'Tell me about a good day you had recently.', 'How do you usually travel to school or work?', 'What would you like to learn in the future?'],
    B1: ['Tell me about a time you had a problem and how you solved it.', 'Do you prefer living in a city or in the countryside? Why?', 'How has technology changed the way young people spend their free time?', 'Describe a place you would like to visit, and explain why.', 'What makes a good teacher, in your opinion?', 'Tell me about an achievement you are proud of.', 'Should students wear school uniforms? Give your reasons.', 'What are the advantages and disadvantages of social media?'],
    B2: ['Some people say success depends more on hard work than on talent. What do you think?', 'How might our cities change in the next twenty years?', 'Describe a decision that changed your life. Would you make the same choice again?', 'Should governments do more to protect the environment, even if it costs jobs?', 'What are the pros and cons of working from home?', 'How reliable is the news people get from social media?', 'Is it better to have a few close friends or many acquaintances? Why?', 'What skills will be most important for young people in the future?'],
    C1: ['To what extent should technology companies be responsible for the content on their platforms?', 'Is a university degree still the best route to a successful career? Discuss.', 'How do the values of your generation differ from those of your parents?', 'What role should art and culture play in public life, and who should pay for it?', 'Can individual action make a real difference to climate change?', 'How has globalisation affected local traditions where you live?', 'Is it ever right to break a rule? Give examples.', 'What do you think defines a good leader?'],
    C2: ['Some argue that artificial intelligence will make many professions obsolete. How should societies prepare?', 'To what extent is privacy still possible in the digital age?', 'Is meritocracy a fair ideal, or does it hide inequality?', 'How far should we trust experts, and when should we question them?', 'What does it mean to live a meaningful life?', 'Should freedom of speech have limits? Where would you draw the line?', 'How do the stories a nation tells about itself shape its future?', 'Is economic growth compatible with protecting the planet?']
  };
  var ACK = ['Thank you.', 'Interesting, thank you.', 'Thank you very much.', 'Right, thank you.'];
  function lvOf(s) {
    s = String(s || '').toUpperCase();
    if (/STARTER|MOVER|FLYER|PRE.?A1|YL|KID/.test(s)) return 'YL';
    var m = s.match(/\b(A1|A2|B1|B2|C1|C2)\b/); if (m) return m[1];
    if (/KET/.test(s)) return 'A2'; if (/PET/.test(s)) return 'B1'; if (/ELEMENTARY/.test(s)) return /PRE/.test(s) ? 'A2' : 'A1';
    if (/UPPER/.test(s)) return 'B2'; if (/ADVANCED/.test(s)) return 'C1'; if (/INTERMEDIATE/.test(s)) return 'B1';
    return 'B1';
  }
  function pick(arr, n) { var a = arr.slice(), out = []; while (a.length && out.length < n) out.push(a.splice(Math.floor(Math.random() * a.length), 1)[0]); return out; }
  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function load(src) { return new Promise(function (ok) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ok; document.head.appendChild(s); }); }
  function css() {
    if (document.getElementById('ifx-exam-css')) return;
    var s = document.createElement('style'); s.id = 'ifx-exam-css';
    s.textContent = '.ifexam{margin:16px 0;border-radius:20px;overflow:hidden;background:radial-gradient(120% 90% at 50% 0%,#1d2f6b 0%,#0b1226 60%,#070b18 100%);color:#e8eeff;font:16px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 20px 50px -20px rgba(7,11,24,.6)}' +
      '.ifexam .top{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#9fb3e6;border-bottom:1px solid #ffffff14}' +
      '.ifexam .stage{display:grid;grid-template-columns:150px 1fr;gap:18px;align-items:center;padding:18px}' +
      '.ifexam .ifbot{width:150px;position:relative}.ifexam .ifbot svg{width:100%;height:auto;display:block}.ifexam .ifbot .tag{display:block;text-align:center;font-size:11px;letter-spacing:.2em;color:#9fd8ff;margin-top:2px}' +
      '.ifexam .q{font-size:19px;font-weight:600;line-height:1.35;margin:0 0 12px;color:#fff}' +
      '.ifexam .tr{min-height:64px;padding:10px 12px;border-radius:12px;background:#ffffff0d;border:1px solid #ffffff1f;color:#cfe0ff;font-size:15px;white-space:pre-wrap}' +
      '.ifexam textarea{width:100%;box-sizing:border-box;min-height:90px;border-radius:12px;border:1px solid #ffffff2a;background:#ffffff0d;color:#fff;font:inherit;padding:10px}' +
      '.ifexam .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:12px}' +
      '.ifexam button{border:0;border-radius:99px;padding:10px 18px;font:600 15px system-ui,sans-serif;cursor:pointer}' +
      '.ifexam .mic{background:linear-gradient(135deg,#22d3ee,#7c3aed);color:#fff}.ifexam .mic.on{background:#ef4444;animation:ifxp 1.2s infinite}' +
      '.ifexam .nx{background:#fff;color:#0b1226}.ifexam .nx[disabled]{opacity:.4;cursor:default}.ifexam .sk{background:none;color:#9fb3e6;text-decoration:underline;padding:10px 4px}' +
      '.ifexam .tm{font-variant-numeric:tabular-nums;color:#9fb3e6;font-size:14px}' +
      '.ifexam .dots{display:flex;gap:6px}.ifexam .dots i{width:8px;height:8px;border-radius:50%;background:#ffffff33}.ifexam .dots i.on{background:#22d3ee}' +
      '@keyframes ifxp{50%{box-shadow:0 0 0 8px #ef444433}}' +
      '@media(max-width:560px){.ifexam .stage{grid-template-columns:1fr;justify-items:center;text-align:center}.ifexam .ifbot{width:120px}.ifexam .row{justify-content:center}}';
    s.textContent += '.ifexam-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(5,10,25,.72);display:flex;align-items:center;justify-content:center;padding:max(12px,env(safe-area-inset-top)) 12px max(12px,env(safe-area-inset-bottom));overflow:auto}' +
      '.ifexam-ov .ifexam{position:relative;width:min(720px,100%);max-height:100%;overflow:auto;margin:0}.ifexam .x{position:absolute;top:8px;right:8px;width:36px;height:36px;padding:0;border-radius:50%;background:#ffffff1f;color:#fff;font-size:22px;line-height:36px}';
    document.head.appendChild(s);
  }
  function say(text, g) {
    return new Promise(function (ok) {
      try {
        if (!window.speechSynthesis) return ok();
        var u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = 0.95; u.ifVoice = g === 'm' ? 'male' : 'female';
        var done = false, fin = function () { if (!done) { done = true; ok(); } };
        u.onend = fin; u.onerror = fin; speechSynthesis.cancel(); speechSynthesis.speak(u);
        setTimeout(fin, 4000 + text.length * 120);
      } catch (e) { ok(); }
    });
  }
  function run(container, opt) {
    opt = opt || {};
    var lv = lvOf(opt.lv + ' ' + (opt.title || '')), kid = lv === 'YL';
    var qs = opt.qs && opt.qs.length ? opt.qs.slice(0, 5) : pick(BANK[lv] || BANK.B1, 3), g = kid ? 'f' : (Math.random() < 0.5 ? 'f' : 'm'), name = g === 'm' ? 'ATLAS' : 'NOVA';
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition, answers = [];
    var deps = [window.IFBots ? null : load('/robots.js'), window.IFVoice ? null : load('/voice.js')].filter(Boolean);
    return Promise.all(deps).then(function () {
      css();
      // shown in its own layer over the page, so the test page re-drawing itself can never remove it mid-task
      var old = document.querySelector('.ifexam-ov'); if (old) old.remove();
      var ov = document.createElement('div'); ov.className = 'ifexam-ov';
      var box = document.createElement('div'); box.className = 'ifexam'; ov.appendChild(box); document.body.appendChild(ov);
      var lockY = document.documentElement.style.overflow; document.documentElement.style.overflow = 'hidden';
      return new Promise(function (resolve) {
        var finished = false;
        function end(res) { if (finished) return; finished = true; try { speechSynthesis.cancel(); } catch (e) {} document.documentElement.style.overflow = lockY; try { ov.remove(); } catch (e) {} resolve(res); }
        function frame(i, inner) {
          box.innerHTML = '<button class="x" aria-label="Close" title="Close">×</button><div class="top"><span>🎙 Speaking · with ' + name + '</span><span class="dots">' + qs.map(function (_, k) { return '<i class="' + (k <= i ? 'on' : '') + '"></i>'; }).join('') + '</span></div>' +
            '<div class="stage"><div class="bot">' + (window.IFBots ? IFBots.html(g, name, true) : '') + '</div><div class="pane">' + inner + '</div></div>';
          if (window.IFBots) IFBots.talk(box.querySelector('.ifbot'));
          box.querySelector('.x').onclick = function () { end(answers.some(function (a) { return a.text; }) ? answers : null); };
        }
        function intro() {
          frame(-1, '<p class="q">' + (kid ? 'Hello! I am ' + name + '. Let’s talk! I will ask you ' + (qs.length === 1 ? 'one question' : qs.length + ' questions') + '.' : 'Hello, I’m ' + name + ', your speaking examiner. ' + (qs.length === 1 ? 'I’ll give you one task — talk about it for about ' + (opt.mins || 2) + ' minutes.' : 'I’ll ask you ' + qs.length + ' questions.') + ' Answer in full sentences — about 30 to 60 seconds each.') + '</p>' +
            '<p style="margin:0;color:#9fb3e6;font-size:14px">' + (SR ? 'Press the microphone and speak. Allow the microphone when the browser asks.' : 'This browser cannot hear you, so type your answers instead.') + '</p>' +
            '<div class="row"><button class="nx" id="ifx-go">Start speaking</button><button class="sk" id="ifx-sk">' + (opt.skip || 'Skip — my teacher will mark speaking') + '</button></div>');
          box.querySelector('#ifx-go').onclick = function () { ask(0); };
          box.querySelector('#ifx-sk').onclick = function () { end(null); };
          say((kid ? 'Hello! I am ' + name + '. Let\'s talk!' : 'Hello, I\'m ' + name + ', your speaking examiner. When you are ready, press start.'), g);
        }
        function ask(i) {
          if (i >= qs.length) return wrap();
          var q = qs[i], text = '', rec = null, t0 = 0, timer = null, speechStart = 0;
          frame(i, '<p class="q">' + esc(q) + '</p>' + (SR ? '<div class="tr" id="ifx-tr">…</div>' : '<textarea id="ifx-ta" placeholder="Type your answer"></textarea>') +
            '<div class="row">' + (SR ? '<button class="mic" id="ifx-mic">🎙 Answer</button><span class="tm" id="ifx-tm"></span>' : '') + '<button class="nx" id="ifx-nx" ' + (SR ? 'disabled' : '') + '>' + (i === qs.length - 1 ? 'Finish' : 'Next question') + '</button></div>');
          var nx = box.querySelector('#ifx-nx'), mic = box.querySelector('#ifx-mic'), tr = box.querySelector('#ifx-tr'), tm = box.querySelector('#ifx-tm');
          say((i === 0 ? '' : ACK[i % ACK.length] + ' ') + q, g);
          function stop() { if (rec) { try { rec.stop(); } catch (e) {} } clearInterval(timer); if (mic) { mic.classList.remove('on'); mic.textContent = '🎙 Answer again'; } }
          if (mic) mic.onclick = function () {
            if (mic.classList.contains('on')) return stop();
            try { speechSynthesis.cancel(); } catch (e) {}
            rec = new SR(); rec.lang = 'en-GB'; rec.continuous = true; rec.interimResults = true;
            var base = text ? text + ' ' : '';
            rec.onresult = function (ev) { var fin = '', tmp = ''; for (var k = 0; k < ev.results.length; k++) { if (ev.results[k].isFinal) fin += ev.results[k][0].transcript + ' '; else tmp += ev.results[k][0].transcript; } text = (base + fin).trim(); tr.textContent = (text + ' ' + tmp).trim() || '…'; if (!speechStart) speechStart = Date.now(); nx.disabled = !(text || tmp); };
            rec.onerror = function (e) { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { tr.textContent = 'The microphone is blocked. Allow it in the browser settings, or skip and your teacher will mark speaking.'; } stop(); };
            rec.onend = function () { if (mic.classList.contains('on')) { try { rec.start(); } catch (e) { stop(); } } };
            try { rec.start(); } catch (e) {}
            t0 = t0 || Date.now(); mic.classList.add('on'); mic.textContent = '■ Stop';
            timer = setInterval(function () { var s = Math.round((Date.now() - t0) / 1000); tm.textContent = s + 's'; if (s >= (opt.mins ? opt.mins * 60 + 30 : 120)) stop(); }, 500);
          };
          nx.onclick = function () {
            stop();
            var ta = box.querySelector('#ifx-ta'); if (ta) text = ta.value.trim();
            answers.push({ q: q, text: text, typed: !SR, secs: t0 ? Math.round((Date.now() - t0) / 1000) : 0 });
            ask(i + 1);
          };
        }
        function wrap() {
          frame(qs.length - 1, '<p class="q">' + (kid ? 'Well done! Thank you for talking with me.' : 'That’s the end of the speaking part. Thank you.') + '</p><p style="margin:0;color:#9fb3e6">Your answers are being marked now.</p>');
          say(kid ? 'Well done! Thank you for talking with me.' : 'That is the end of the speaking test. Thank you.', g);
          setTimeout(function () { end(answers.some(function (a) { return a.text; }) ? answers : null); }, 900);
        }
        intro();
      });
    });
  }
  window.IFExaminer = { run: run, level: lvOf };
})();
