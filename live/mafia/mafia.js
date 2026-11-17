/* Mafia Live (IF Academy): Mafia for the English class, played on phones.
   One device hosts (a projector, a laptop or a phone) and is the narrator; every player joins with the PIN.
   - Each phone holds its own secret role card with an original IF portrait (press and hold to look).
   - The night runs in short timed rounds: the Mafia, the Doctor, the Sheriff, the special roles, then a whisper.
     In each round one role makes its move while every other phone gets quick English jobs (choose the word,
     unscramble the word), so all phones are tapping and typing and nobody can tell who is awake.
   - The Mafia plan in a private chat that runs through the host; nobody else can read it.
   - Correct night jobs raise the "town focus"; at 70% the town earns a clue in the morning, so the jobs matter
     (and the Mafia can quietly answer badly). Each player's own correct answers are their brain points.
   - By day the phones show speaking phrases and a timer; votes are cast on the phones. Ghosts keep doing night
     jobs and guess who the town will send away. Nobody judges anybody else's English.
   Secrets: each phone makes its own key and gives it only to the host (players cannot listen on the players' channel),
   and the host encrypts everything private with it, so no phone can read another phone's card or the Mafia chat.
   The host device never shows secret information until the game ends, so the host can also play ("Play on this device").
   Role set: Mafia, Doctor, Sheriff, Cupid, Grandma, Vigilante, Magician, Informant, Bus Driver, Civilian. */
(function () {
  var L = window.LIVE, esc = L.esc, view = document.getElementById('view');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var Q = new URLSearchParams(location.search);
  var ROLES = {
    mafia: { n: 'Mafia', e: '🎩', team: 'mafia', txt: 'Every night, choose one player to remove. You can see what the other Mafia choose: agree on one name.', goal: 'Win when the Mafia are as many as the town.' },
    doctor: { n: 'Doctor', e: '🩺', team: 'town', txt: 'Every night, protect one player. You can protect yourself once, and never the same person two nights in a row.', goal: 'Help the town find all the Mafia.' },
    sheriff: { n: 'Sheriff', e: '⭐', team: 'town', txt: 'Every night, investigate one player. In the morning your phone tells you: Mafia or not Mafia.', goal: 'Find the Mafia, but be careful: if they learn who you are, you are next.' },
    cupid: { n: 'Cupid', e: '💘', team: 'town', txt: 'On the first night, choose two players to fall in love. If one of them leaves the game, the other leaves too.', goal: 'Help the town find all the Mafia.' },
    grandma: { n: 'Grandma', e: '👵', team: 'town', txt: 'You are tougher than you look. If the Mafia choose you at night, you stay and one of the Mafia leaves.', goal: 'Help the town find all the Mafia.' },
    vigilante: { n: 'Vigilante', e: '🎯', team: 'town', txt: 'Once in the game, you can remove one player at night. Choose carefully: the town will hear about a mistake.', goal: 'Help the town find all the Mafia.' },
    magician: { n: 'Magician', e: '🪄', team: 'town', txt: 'Once in the game, you can bring back a player who left the game the night before.', goal: 'Help the town find all the Mafia.' },
    informant: { n: 'Informant', e: '🕵️', team: 'mafia', txt: 'You secretly work for the Mafia and you know who they are. You do not choose victims. The Sheriff sees you as "not Mafia".', goal: 'Protect the Mafia. You win when they win.' },
    busdriver: { n: 'Bus Driver', e: '🚌', team: 'town', txt: 'Every night, choose two players to swap seats. Anything that happens to one of them tonight happens to the other.', goal: 'Help the town find all the Mafia.' },
    civilian: { n: 'Civilian', e: '🙂', team: 'town', txt: 'You have no special power, but you have the most important weapon: your voice. Listen, ask questions and vote.', goal: 'Help the town find all the Mafia.' }
  };
  var EXTRA = [['doctor', 4], ['sheriff', 4], ['grandma', 7], ['cupid', 8], ['informant', 9], ['vigilante', 10], ['magician', 11], ['busdriver', 12]];   // role, players needed for it to be on by default
  var PHRASES = {
    Accusing: ['I think it was you, because…', 'You were very quiet yesterday. Why?', 'Why did you vote for her so quickly?', 'Your story doesn’t make sense.', 'I’m sure you’re hiding something.'],
    Defending: ['It can’t be me. I’m a civilian!', 'Why would I do that?', 'That’s not true. Let me explain.', 'If I were Mafia, I wouldn’t…', 'Look at him, not me!'],
    Guessing: ['She must be the Mafia, because…', 'He might be the Doctor.', 'It can’t have been Ali. He was the first to…', 'They could be working together.', 'I’m not sure, but maybe…'],
    Voting: ['I vote for… because…', 'I agree with Dana.', 'I’m changing my vote.', 'Let’s give him one more chance.', 'I’m not voting for anyone yet.']
  };
  var MIN = 4, MAX = 24;
  var roleA = function (r) { return r === 'mafia' ? 'Mafia' : r === 'civilian' ? 'a Civilian' : 'the ' + ROLES[r].n; };
  var mafiaCount = function (n) { return n <= 6 ? 1 : n <= 10 ? 2 : n <= 14 ? 3 : 4; };
  var pickOne = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var clock = function (ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };

  /* ---- private messages: AES-GCM with the phone's own key ---- */
  var b64 = function (u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); };
  var unb = function (s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
  var newKey = function () { return b64(crypto.getRandomValues(new Uint8Array(16))); };
  var imp = function (k) { return crypto.subtle.importKey('raw', unb(k), 'AES-GCM', false, ['encrypt', 'decrypt']); };
  async function seal(ck, obj) { var iv = crypto.getRandomValues(new Uint8Array(12)); var c = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, ck, new TextEncoder().encode(JSON.stringify(obj))); return { iv: b64(iv), c: b64(new Uint8Array(c)) }; }
  async function unseal(ck, m) { return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb(m.iv) }, ck, unb(m.c)))); }

  /* ---- original IF portraits: flat, faceless busts drawn in code (no image files) ---- */
  /* Original IF portraits, drawn here as SVG: a navy medallion with a gold ring, a face with eyes and expression,
     and one clear prop for each role. k (0–3) varies skin and hair so two players' cards are not identical. */
  function portrait(role, k) {
    k = ((k || 0) % 4 + 4) % 4;
    var sk = ['#f2c9a0', '#d9a273', '#b97a56', '#8a5a3c'][k], nk = ['#e0b488', '#c48d5f', '#a3663f', '#744a30'][k], hr = ['#3a2416', '#17120f', '#7a4a22', '#241a14'][k], ink = '#1b2333', gold = '#d4ae5a';
    var star = function (x, y, r, c) { var p = ''; for (var i = 0; i < 10; i++) { var a = Math.PI / 5 * i - Math.PI / 2, q = i % 2 ? r * .45 : r; p += (i ? 'L' : 'M') + (x + q * Math.cos(a)).toFixed(1) + ' ' + (y + q * Math.sin(a)).toFixed(1); } return '<path d="' + p + 'Z" fill="' + c + '"/>'; };
    var bg = function (tint) { return '<rect width="200" height="240" fill="#0b1f3a"/><circle cx="100" cy="118" r="94" fill="' + tint + '"/><circle cx="100" cy="118" r="94" fill="none" stroke="' + gold + '" stroke-width="3"/><circle cx="100" cy="118" r="86" fill="none" stroke="' + gold + '" stroke-width="1" opacity=".5"/>'; };
    var body = function (c) { return '<path d="M14 240Q16 178 70 166L130 166Q184 178 186 240Z" fill="' + c + '"/>'; };
    var neck = '<path d="M86 130h28v38q-14 12-28 0z" fill="' + nk + '"/>';
    var head = '<ellipse cx="64" cy="104" rx="6" ry="9" fill="' + nk + '"/><ellipse cx="136" cy="104" rx="6" ry="9" fill="' + nk + '"/><ellipse cx="100" cy="100" rx="36" ry="42" fill="' + sk + '"/>';
    var eyes = '<ellipse cx="86" cy="101" rx="3.6" ry="4.4" fill="' + ink + '"/><ellipse cx="114" cy="101" rx="3.6" ry="4.4" fill="' + ink + '"/>';
    var brows = function (tilt) { return '<path d="M78 ' + (91 + tilt) + 'q8-5 16 ' + (-tilt) + 'M106 91q8 ' + (-5 + tilt) + ' 16 ' + tilt + '" fill="none" stroke="' + hr + '" stroke-width="3" stroke-linecap="round"/>'; };
    var smile = '<path d="M89 119q11 9 22 0" fill="none" stroke="' + ink + '" stroke-width="3" stroke-linecap="round"/>', flat = '<path d="M90 121h20" stroke="' + ink + '" stroke-width="3" stroke-linecap="round"/>';
    var cheeks = '<circle cx="76" cy="113" r="6" fill="#e8877a" opacity=".45"/><circle cx="124" cy="113" r="6" fill="#e8877a" opacity=".45"/>';
    var top = function (c) { return '<path d="M62 100Q56 52 100 52Q144 52 138 100Q132 74 100 72Q68 74 62 100Z" fill="' + c + '"/>'; };
    var g = '';
    switch (role) {
      case 'mafia':                             // popped collar, red scarf, dark glasses, hat with a red band
        g = bg('#27324d') + body('#23252d') + neck + '<path d="M58 176L80 132L100 190Z" fill="#30333d"/><path d="M142 176L120 132L100 190Z" fill="#30333d"/><path d="M80 160q20 16 40 0v14q-20 14-40 0z" fill="#b3261e"/><path d="M108 172l10 34-14-6z" fill="#8f1d17"/>' + head +
          '<rect x="68" y="93" width="28" height="15" rx="6" fill="#15171c"/><rect x="104" y="93" width="28" height="15" rx="6" fill="#15171c"/><rect x="94" y="97" width="12" height="3" fill="#15171c"/>' + flat +
          '<ellipse cx="100" cy="72" rx="62" ry="10" fill="#17181d"/><path d="M62 72Q60 24 100 30Q140 24 138 72Z" fill="#23252d"/><path d="M62 60Q100 69 138 60V72H62Z" fill="#b3261e"/>'; break;
      case 'doctor':                            // scrub cap and scrubs, a name badge with a cross
        g = bg('#1f5257') + body('#3aa79b') + neck + '<path d="M80 166L100 196L120 166Z" fill="' + sk + '"/><path d="M80 166L100 196L120 166" fill="none" stroke="#2c8177" stroke-width="5"/>' + head + '<path d="M64 98q-2-10 2-18v20zM136 98q2-10-2-18v20z" fill="' + hr + '"/>' + eyes + brows(0) + smile +
          '<path d="M60 86Q58 44 100 44Q142 44 140 86Q100 74 60 86Z" fill="#2f9a8f"/><path d="M60 86Q100 74 140 86v8Q100 82 60 94Z" fill="#23766d"/>' + '<rect x="126" y="196" width="34" height="26" rx="4" fill="#fffdf9"/><path d="M140 201h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill="#d6453d"/>'; break;
      case 'sheriff':                           // navy uniform, peaked cap with a gold star
        g = bg('#20355f') + body('#1c2f57') + '<rect x="30" y="182" width="34" height="9" rx="4" fill="' + gold + '" transform="rotate(-14 47 186)"/><rect x="136" y="182" width="34" height="9" rx="4" fill="' + gold + '" transform="rotate(14 153 186)"/>' + neck + '<path d="M82 166L100 190L118 166Z" fill="#fff"/><path d="M96 170h8l2 22-6 8-6-8z" fill="#12213f"/>' + head +
          '<path d="M64 98q-2-10 2-16v18zM136 98q2-10-2-16v18z" fill="' + hr + '"/>' + eyes + brows(1) + flat + star(64, 210, 12, gold) +
          '<path d="M54 70Q60 30 100 30Q140 30 146 70Q100 58 54 70Z" fill="#1c2f57"/><path d="M58 70Q100 58 142 70v10Q100 68 58 80Z" fill="#12213f"/><path d="M60 80Q100 70 140 80Q144 90 100 86Q56 90 60 80Z" fill="#0a1226"/>' + star(100, 50, 11, gold); break;
      case 'cupid':                             // laurel wreath, wings and a golden bow
        g = bg('#6f2c4d') + '<path d="M70 176Q20 150 14 96Q46 110 62 150Z" fill="#fff" opacity=".95"/><path d="M130 176Q180 150 186 96Q154 110 138 150Z" fill="#fff" opacity=".95"/>' + body('#f2a7c0') + neck + '<path d="M82 166L100 186L118 166Z" fill="' + sk + '"/>' + head +
          [[66, 80], [76, 64], [92, 56], [108, 56], [124, 64], [134, 80]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="14" fill="' + hr + '"/>'; }).join('') +
          [[62, 74, -50], [72, 60, -30], [86, 52, -12], [114, 52, 12], [128, 60, 30], [138, 74, 50]].map(function (c) { return '<ellipse cx="' + c[0] + '" cy="' + c[1] + '" rx="9" ry="4.5" fill="' + gold + '" transform="rotate(' + c[2] + ' ' + c[0] + ' ' + c[1] + ')"/>'; }).join('') + eyes + brows(0) + smile + cheeks +
          '<path d="M150 176Q186 200 152 232" fill="none" stroke="' + gold + '" stroke-width="5" stroke-linecap="round"/><path d="M150 176L152 232" stroke="#fff" stroke-width="2"/><path d="M40 44c-6-11-22-5-17 8c3 8 17 17 17 17s14-9 17-17c5-13-11-19-17-8z" fill="#e0457b"/>'; break;
      case 'grandma':                           // dotted headscarf tied under the chin, shawl, knitting
        g = bg('#4f416f') + body('#7c5aa0') + '<path d="M40 240Q52 190 100 200Q148 190 160 240Z" fill="#9477b8"/>' + neck + head + '<path d="M70 82Q84 70 100 76Q116 70 130 82Q116 78 100 84Q84 78 70 82Z" fill="#cfd2d8"/>' + eyes + brows(0) + smile + cheeks +
          '<path d="M100 40Q52 42 58 112Q62 134 82 146L100 152L118 146Q138 134 142 112Q148 42 100 40ZM100 62Q132 64 132 104Q130 130 100 140Q70 130 68 104Q68 64 100 62Z" fill="#c4513d" fill-rule="evenodd"/><path d="M88 146l12 8 12-8 6 22-18-8-18 8z" fill="#a83f2e"/>' +
          [[74, 56], [100, 49], [126, 56], [62, 84], [138, 84], [64, 116], [136, 116]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="3" fill="#fffdf9"/>'; }).join('') +
          '<circle cx="152" cy="212" r="17" fill="' + gold + '"/><path d="M140 204q12 8 24 2M138 214q14 8 28 0M146 198q6 14 4 30" fill="none" stroke="#a37f2f" stroke-width="2"/><path d="M130 232L168 190M144 236L176 200" stroke="#fffdf9" stroke-width="3" stroke-linecap="round"/>'; break;
      case 'vigilante':                         // hood and a scarf over the mouth; only the eyes show
        g = bg('#1f3d2e') + '<path d="M44 170Q30 34 100 30Q170 34 156 170Z" fill="#2f4a3a"/>' + body('#2f4a3a') + neck + head + '<path d="M60 96Q62 56 100 56Q138 56 140 96Q120 78 100 78Q80 78 60 96Z" fill="#1c2e24"/>' + eyes + brows(2) +
          '<path d="M64 110Q100 122 136 110Q136 146 100 148Q64 146 64 110Z" fill="#17231c"/><path d="M70 122q30 8 60 0M72 134q28 6 56 0" fill="none" stroke="#2f4a3a" stroke-width="2"/>' +
          '<circle cx="100" cy="210" r="15" fill="none" stroke="' + gold + '" stroke-width="4"/><path d="M100 190v40M80 210h40" stroke="' + gold + '" stroke-width="3"/>'; break;
      case 'magician':                          // starry top hat, high-collared cape, curled moustache, wand
        g = bg('#452c66') + body('#2b1b47') + '<path d="M52 178L74 128L100 186Z" fill="#3b2466"/><path d="M148 178L126 128L100 186Z" fill="#3b2466"/>' + neck + '<circle cx="100" cy="176" r="7" fill="' + gold + '"/>' + head + eyes + brows(1) +
          '<path d="M100 118q-8-7-18-1q9 9 18 4q9 5 18-4q-10-6-18 1z" fill="' + hr + '"/><path d="M82 117q-6 0-8-6M118 117q6 0 8-6" fill="none" stroke="' + hr + '" stroke-width="3" stroke-linecap="round"/>' +
          '<rect x="48" y="62" width="104" height="11" rx="5" fill="#2b1b47"/><path d="M68 64L72 12H128L132 64Z" fill="#3b2466"/><path d="M69 50h62l1 12H68z" fill="' + gold + '"/>' + star(88, 30, 6, gold) + star(112, 38, 4, gold) + star(100, 22, 3, '#fff') +
          '<path d="M150 176L176 112" stroke="#17120f" stroke-width="6" stroke-linecap="round"/><path d="M172 122L176 112" stroke="#fff" stroke-width="6" stroke-linecap="round"/>' + star(180, 98, 11, gold); break;
      case 'informant':                         // flat cap and trench coat, peeking over a newspaper
        g = bg('#454536') + body('#a08a63') + '<path d="M58 176L78 130L100 188Z" fill="#8c7650"/><path d="M142 176L122 130L100 188Z" fill="#8c7650"/>' + neck + head + eyes + '<path d="M78 90q8-3 16 1M106 86q8-5 16 2" fill="none" stroke="' + hr + '" stroke-width="3" stroke-linecap="round"/>' +
          '<path d="M58 80Q62 42 102 44Q140 46 142 76Q154 78 164 90Q120 80 58 86Z" fill="#4b4f58"/><circle cx="100" cy="46" r="4" fill="#3b3f47"/>' +
          '<path d="M40 112L160 104L166 190L46 200Z" fill="#fffdf9"/><path d="M52 124l96-6" stroke="' + ink + '" stroke-width="7"/><path d="M54 142l44-3M54 154l44-3M54 166l44-3M54 178l44-3M110 138l44-3M110 150l44-3M110 162l44-3M110 174l44-3" stroke="#9aa4b4" stroke-width="3"/>'; break;
      case 'busdriver':                         // driver's cap with a badge, uniform, and a bus-stop sign
        g = bg('#274778') + body('#2b4f86') + neck + '<path d="M82 166L100 190L118 166Z" fill="#fff"/><path d="M96 170h8l3 24-7 9-7-9z" fill="' + gold + '"/>' + head + '<path d="M64 98q-2-10 2-16v18zM136 98q2-10-2-16v18z" fill="' + hr + '"/>' + eyes + brows(0) + smile +
          '<path d="M60 78Q62 38 100 36Q138 38 140 78Z" fill="#1f3a66"/><path d="M56 78Q100 68 144 78Q150 90 100 87Q50 90 56 78Z" fill="#12233f"/><circle cx="100" cy="56" r="8" fill="' + gold + '"/>' +
          '<path d="M158 150v84" stroke="#c9d2e2" stroke-width="5"/><circle cx="158" cy="146" r="20" fill="' + gold + '"/><rect x="146" y="138" width="24" height="14" rx="3" fill="#12233f"/><circle cx="151" cy="155" r="3" fill="#12233f"/><circle cx="165" cy="155" r="3" fill="#12233f"/>'; break;
      default:                                  // a townsperson: four looks
        var sc = ['#4f8a6b', '#c9773c', '#5a78b8', '#a85a7a'][k];
        g = bg('#2c4a44') + (k === 1 ? '<path d="M56 104Q52 48 100 48Q148 48 144 104L148 170H52Z" fill="' + hr + '"/>' : '') + body(sc) + neck + '<path d="M82 166L100 186L118 166Z" fill="#fffdf9"/>' + head +
          (k === 2 ? [[70, 74], [84, 62], [100, 58], [116, 62], [130, 74]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="15" fill="' + hr + '"/>'; }).join('') : top(hr)) + eyes + brows(0) + smile + (k === 3 ? '<circle cx="86" cy="101" r="11" fill="none" stroke="' + ink + '" stroke-width="2.5"/><circle cx="114" cy="101" r="11" fill="none" stroke="' + ink + '" stroke-width="2.5"/><path d="M97 101h6" stroke="' + ink + '" stroke-width="2.5"/>' : '');
    }
    return '<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + g + '</svg>';
  }

  /* ---- night tasks: quick English jobs that keep every phone busy while one role acts ---- */
  var MC = [['The police found a ___ near the window.', 'clue', 'glue', 'club'], ['She says she was at home. That is her ___.', 'alibi', 'album', 'alarm'], ['I didn’t do it. I’m ___!', 'innocent', 'ancient', 'instant'], ['The judge said he was ___ of the crime.', 'guilty', 'lucky', 'silly'],
    ['A ___ saw the man run away.', 'witness', 'waitress', 'weakness'], ['The detective asked the ___ many questions.', 'suspect', 'subject', 'respect'], ['Don’t ___ me! I was asleep.', 'blame', 'blow', 'blink'], ['He never tells the ___.', 'truth', 'tooth', 'trust'],
    ['I think she is ___ something.', 'hiding', 'riding', 'hitting'], ['Who ___ the necklace?', 'stole', 'stale', 'stool'], ['They ___ him of lying.', 'accused', 'excused', 'amused'], ['There is no ___ that he was there.', 'evidence', 'audience', 'distance'],
    ['The thief ___ through the back door.', 'escaped', 'explained', 'expected'], ['I ___ you. You are telling the truth.', 'believe', 'belong', 'behave'], ['She ___ that she saw nothing.', 'claimed', 'climbed', 'cleaned'], ['He looked very ___ when the police arrived.', 'nervous', 'generous', 'famous'],
    ['If I ___ the Mafia, I would stay quiet.', 'were', 'am', 'will be'], ['It ___ have been Ali. He was with me.', 'can’t', 'must', 'should'], ['She ___ be the Doctor. She saved him twice.', 'must', 'can’t', 'mustn’t'], ['What ___ you doing at midnight?', 'were', 'did', 'are'],
    ['I ___ sleeping when I heard a noise.', 'was', 'did', 'have'], ['Nobody ___ what happened.', 'knows', 'know', 'knowing'], ['Why did you vote ___ her?', 'for', 'at', 'to'], ['I don’t agree ___ you.', 'with', 'to', 'at'],
    ['He is afraid ___ the dark.', 'of', 'from', 'at'], ['Let’s give him one more ___.', 'chance', 'change', 'choice'], ['I’m ___ my vote.', 'changing', 'chasing', 'charging'], ['They could be working ___.', 'together', 'forever', 'however'],
    ['Your story doesn’t make ___.', 'sense', 'since', 'scene'], ['I’m not sure, ___ maybe it was Dana.', 'but', 'so', 'because'], ['The town is ___ at night.', 'asleep', 'sleepy', 'sleeping'], ['She ___ the door and listened.', 'locked', 'looked', 'liked'],
    ['He has a good ___ for being late.', 'reason', 'season', 'lesson'], ['Someone is ___. I can feel it.', 'lying', 'laying', 'lining'], ['I ___ him. He seems honest.', 'trust', 'twist', 'taste'], ['The Sheriff wants to ___ the truth.', 'find out', 'find in', 'look out']];
  var SCR = [['suspect', 'a person the police think did it'], ['witness', 'a person who saw what happened'], ['guilty', 'the opposite of innocent'], ['secret', 'something you don’t tell anyone'], ['danger', 'something that can hurt you'], ['doctor', 'this person helps sick people'],
    ['sheriff', 'the police officer of a small town'], ['whisper', 'to speak very quietly'], ['reason', 'why something happens'], ['answer', 'you give it after a question'], ['silent', 'making no sound'], ['shadow', 'a dark shape behind you in the sun'],
    ['escape', 'to get away'], ['protect', 'to keep someone safe'], ['honest', 'always telling the truth'], ['truth', 'the opposite of a lie'], ['night', 'the opposite of day'], ['blame', 'to say someone did something bad'],
    ['trust', 'to believe that someone is honest'], ['proof', 'something that shows a thing is true'], ['quiet', 'not loud'], ['crime', 'something against the law'], ['thief', 'a person who steals'], ['judge', 'this person decides in a court'], ['police', 'they catch criminals'], ['clue', 'it helps a detective']];
  function newQ() {
    if (Math.random() < .6) { var m = pickOne(MC); return { t: 'mc', q: m[0], o: L.shuffle(m.slice(1)), a: m[1] }; }
    var w = pickOne(SCR), sc; do { sc = L.shuffle(w[0].split('')).join(''); } while (sc === w[0]);
    return { t: 'sc', q: sc.toUpperCase().split('').join(' '), h: w[1], a: w[0] };
  }

  /* ================= the phone ================= */
  function PlayerUI(root, send) {
    var pub = null, prv = null, sel = [], editing = false, lastKey = '', tick = null, q = null, flash = '';
    function cardHTML(show) {
      var r = ROLES[prv.role]; if (!r) return '';
      return '<div class="mf-card' + (show ? ' show' : '') + '" data-hold><div class="b"><b>IF</b><span>Press and hold</span></div><div class="f"><div class="pt">' + portrait(prv.role, prv.av) + '</div><h2>' + r.n + '</h2><span class="tm' + (r.team === 'mafia' ? ' m' : '') + '">' + (r.team === 'mafia' ? 'Mafia team' : 'Town team') + '</span><p>' + esc(r.txt) + '</p>' +
        (prv.mates && prv.mates.length ? '<p class="mt">The Mafia: ' + esc(prv.mates.join(', ')) + '</p>' : '') + '</div></div>';
    }
    function notes() { return (prv.notes || []).map(function (n) { return '<div class="mf-note">' + esc(n) + '</div>'; }).join(''); }
    function stream() {                         // the busy job: one quick question after another
      q = q || newQ();
      return '<div class="mf-task"><p class="mf-job">' + (flash || 'Night job · keep going until the round ends') + '</p>' +
        (q.t === 'mc' ? '<h2 class="mf-q">' + esc(q.q) + '</h2><div class="mf-opts one">' + q.o.map(function (o) { return '<button data-ans="' + esc(o) + '">' + esc(o) + '</button>'; }).join('') + '</div>'
          : '<p>Put the letters in order: ' + esc(q.h) + '</p><h2 class="mf-q sc">' + esc(q.q) + '</h2><div class="mf-line"><input class="mf-inp" data-keep="sc" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Type the word"><button class="btn" data-sc>OK</button></div>') + '</div>';
    }
    function chatHTML(t) {
      return '<div class="mf-chat">' + (t.chat.length ? t.chat.slice(-6).map(function (m) { return '<div><b>' + esc(m.n) + ':</b> ' + esc(m.x) + '</div>'; }).join('') : '<div class="mf-small">Only the Mafia can read this. Plan in English.</div>') + '</div>' +
        '<div class="mf-quick">' + ['I agree.', 'Not that one.', 'Who is dangerous?', 'Let’s choose '].map(function (x) { return '<button data-say="' + esc(x) + '">' + esc(x.trim()) + '</button>'; }).join('') + '</div>' +
        '<div class="mf-line"><input class="mf-inp" data-keep="chat" maxlength="90" placeholder="Message the Mafia" autocomplete="off"><button class="btn" data-send>Send</button></div>';
    }
    function taskHTML() {
      var t = prv.task; if (!t || prv.ph !== pub.ph || prv.n !== pub.n || prv.ri !== pub.ri) return '<p class="mf-sub">…</p>';
      if (t.k === 'busy') return stream();
      if (prv.done && !editing) return pub.ph === 'night' && pub.round && pub.round.k !== 'whisper' ? (t.chat ? '<div class="mf-task">' + chatHTML(t) + (t.live || []).map(function (x) { return '<div class="mf-live">' + esc(x) + '</div>'; }).join('') + '</div>' : '') + stream() + '<button class="btn ghost sm" data-edit style="margin-top:14px">Change my choice</button>' : '<div class="mf-task"><h2>✓ Sent</h2><p>Wait for the others.</p><button class="btn ghost sm" data-edit>Change my choice</button></div>';
      return '<div class="mf-task"><h2>' + esc(t.title) + '</h2>' + (t.hint ? '<p>' + esc(t.hint) + '</p>' : '') + (t.chat ? chatHTML(t) : '') +
        (t.live && t.live.length ? t.live.map(function (x) { return '<div class="mf-live">' + esc(x) + '</div>'; }).join('') : '') +
        (t.opts.length ? '<div class="mf-opts">' + t.opts.map(function (o) { return '<button data-o="' + esc(o.id) + '" class="' + (sel.indexOf(o.id) >= 0 ? 'sel' : '') + '">' + esc(o.name) + '</button>'; }).join('') +
        (t.skip ? '<button class="wide' + (sel[0] === 'skip' ? ' sel' : '') + '" data-o="skip">' + esc(t.skip) + '</button>' : '') + '</div>' +
        (t.say ? '<p style="color:var(--gold)">Say it aloud first: “' + esc(t.say) + '”</p>' : '') +
        '<button class="btn" data-go ' + (sel.length === (sel[0] === 'skip' ? 1 : t.n) ? '' : 'disabled style="opacity:.4"') + '>Confirm</button>' : '') + '</div>';
    }
    function render() {
      clearInterval(tick);
      if (!pub) { root.innerHTML = '<div class="mf-c"><div class="pulse"></div><p class="mf-sub">Connecting to the game…</p></div>'; return; }
      var keep = {}, foc = document.activeElement && root.contains(document.activeElement) ? document.activeElement.dataset.keep : null;
      root.querySelectorAll('[data-keep]').forEach(function (i) { keep[i.dataset.keep] = i.value; });
      var ph = pub.ph, me = prv || {}, h = '', peek = false;
      if (!root.dataset.embedded) document.body.classList.toggle('mf-night', ph === 'night');
      var key = ph + ':' + pub.n + ':' + pub.ri + ':' + (me.task ? me.task.k : ''); if (key !== lastKey) { lastKey = key; sel = []; editing = false; flash = ''; keep = {}; }
      if (ph === 'lobby' || !prv || !prv.role) {
        h = '<div class="mf-c"><p class="mf-eyebrow">Mafia Live</p><h1 class="mf-h1">' + (ph === 'lobby' ? 'You’re in' : 'Game in progress') + '</h1><p class="mf-sub">' + (ph === 'lobby' ? 'Wait for the host to start. ' + pub.players.length + ' player' + (pub.players.length === 1 ? '' : 's') + ' so far.' : 'You will get a card when the next game starts. Watch and listen for now.') + '</p>' +
          '<div class="mf-chips">' + pub.players.map(function (p) { return '<span class="mf-chip">' + esc(p.name) + '</span>'; }).join('') + '</div></div>';
      } else if (ph === 'roles') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Your secret card</p>' + cardHTML(false) + '<p class="mf-sub">Press and hold the card to look. Don’t let anyone see your screen.</p>' +
          (prv.done ? '<p class="mf-sub">✓ Ready. Waiting for the others…</p>' : '<button class="btn" data-ready>I know my role</button>') + '</div>';
      } else if (ph === 'end') {
        var won = pub.win === ROLES[prv.role].team;
        h = '<div class="mf-c"><div class="mf-ghost">' + (won ? '🏆' : '💀') + '</div><h1 class="mf-h1">' + (pub.win === 'mafia' ? 'The Mafia win' : 'The town wins') + '</h1><p class="mf-sub">You were ' + roleA(prv.role) + '. ' + (won ? 'Your team won!' : 'Better luck next time.') + ' You earned ' + (prv.pts || 0) + ' brain points.</p>' +
          '<table class="mf-table">' + pub.players.map(function (p) { return '<tr><td>' + esc(p.name) + '</td><td>' + (p.role ? ROLES[p.role].e + ' ' + ROLES[p.role].n : '') + '</td></tr>'; }).join('') + '</table></div>';
      } else if (ph === 'night') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Night ' + pub.n + (pub.round ? ' · ' + esc(pub.round.title) : '') + '</p><div class="mf-timer sm" id="mfT"></div>' + (prv.alive ? '' : '<p class="mf-small">👻 You are a ghost. Your night jobs still earn brain points.</p>') + taskHTML() + '</div>'; peek = prv.alive;
      } else if (!prv.alive) {
        h = '<div class="mf-c"><div class="mf-ghost">👻</div><h1 class="mf-h1">You are a ghost</h1><p class="mf-sub">You left the town as ' + roleA(prv.role) + '. Ghosts can’t speak, but they listen.</p>' +
          (ph === 'vote' && prv.task ? taskHTML() : '<p class="mf-sub">' + (ph === 'day' ? 'Listen carefully: in the vote you can guess who the town will send away.' : '') + '</p>') + '</div>';
      } else if (ph === 'day') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + pub.n + ' · discussion</p><div class="mf-timer" id="mfT"></div>' + notes() +
          '<div class="mf-box"><h3>Say it in English</h3><div class="mf-ph">' + Object.keys(PHRASES).map(function (k) { return '<b>' + k + '</b>' + L.shuffle(PHRASES[k]).slice(0, 2).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join(''); }).join('') + '</div></div></div>'; peek = true;
      } else if (ph === 'vote') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + pub.n + ' · the vote</p>' + taskHTML() + '</div>'; peek = true;
      } else if (ph === 'result') {
        h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + pub.n + '</p>' + (pub.story || []).map(function (s) { return '<p class="mf-story">' + esc(s) + '</p>'; }).join('') + notes() + '<p class="mf-sub">Night is coming…</p></div>'; peek = true;
      }
      root.innerHTML = h + (peek ? '<button class="mf-peek" data-hold>🎴 Hold to see my card</button>' : '');
      root.querySelectorAll('[data-keep]').forEach(function (i) { if (keep[i.dataset.keep] != null) i.value = keep[i.dataset.keep]; if (foc === i.dataset.keep) { i.focus(); try { i.setSelectionRange(i.value.length, i.value.length); } catch (e) {} } });
      if (ph === 'day' || ph === 'night') { var T = $('#mfT', root), up = function () { if (T) T.textContent = clock(pub.t - Date.now()); }; up(); tick = setInterval(up, 500); }
    }
    function answer(val) {
      if (!q) return; var ok = String(val).trim().toLowerCase() === q.a.toLowerCase();
      send('pts', ok ? 1 : 0); flash = ok ? '✓ Correct' : '✗ It was “' + q.a + '”'; if (ok) L.sfx('coin'); q = newQ(); render();
      var i = $('[data-keep="sc"]', root); if (i) i.focus();
    }
    function chatSend() { var i = $('[data-keep="chat"]', root); if (!i || !i.value.trim()) return; send('act', { k: 'chat', v: [i.value.trim().slice(0, 90)] }); i.value = ''; i.focus(); }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !prv) return;
      if (b.dataset.ready != null) { send('ready', 1); prv.done = true; render(); return; }
      if (b.dataset.edit != null) { editing = true; sel = []; render(); return; }
      if (b.dataset.ans != null) return answer(b.dataset.ans);
      if (b.dataset.sc != null) { var si = $('[data-keep="sc"]', root); if (si && si.value.trim()) answer(si.value); return; }
      if (b.dataset.send != null) return chatSend();
      if (b.dataset.say != null) { var ci = $('[data-keep="chat"]', root); if (ci) { ci.value = b.dataset.say; ci.focus(); if (!/ $/.test(b.dataset.say)) chatSend(); } return; }
      if (b.dataset.o != null) {
        var id = b.dataset.o, n = prv.task.n;
        if (id === 'skip') sel = ['skip']; else { if (sel[0] === 'skip') sel = []; var i = sel.indexOf(id); if (i >= 0) sel.splice(i, 1); else { sel.push(id); if (sel.length > n) sel.shift(); } }
        if (prv.task.k === 'kill' && sel.length === 1) send('act', { k: 'kill', v: sel.slice(), soft: 1 });   // partners see the choice at once
        render(); return;
      }
      if (b.dataset.go != null && !b.disabled) { send('act', { k: prv.task.k, v: sel.slice() }); prv.done = true; editing = false; L.sfx('ok'); render(); }
    });
    root.addEventListener('keydown', function (e) { if (e.key !== 'Enter' || !e.target.dataset) return; if (e.target.dataset.keep === 'sc' && e.target.value.trim()) answer(e.target.value); else if (e.target.dataset.keep === 'chat') chatSend(); });
    // press and hold to see the card
    var over = null;
    var hold = function (e) { var t = e.target.closest('[data-hold]'); if (!t || !prv || !prv.role) return; e.preventDefault(); if (t.classList.contains('mf-card')) { t.classList.add('show'); return; } over = document.createElement('div'); over.className = 'mf-over'; over.innerHTML = cardHTML(true); document.body.appendChild(over); };
    var drop = function () { if (over) { over.remove(); over = null; } var c = $('.mf-card.show', root); if (c) c.classList.remove('show'); };
    root.addEventListener('pointerdown', hold); ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) { window.addEventListener(ev, drop); });
    root.addEventListener('contextmenu', function (e) { if (e.target.closest('[data-hold]')) e.preventDefault(); });
    render();
    return { pub: function (p) { pub = p; render(); }, prv: function (v) { if (prv && v.s < prv.s) return; prv = v; render(); } };
  }

  async function playerPage() {
    var saved = L.ls.get('mafia.me') || {}, pin = (Q.get('pin') || '').replace(/\D/g, '');
    if (!(saved.pin === pin && pin && saved.name)) return joinForm(pin, saved.name || '');
    play(pin, saved);
  }
  function joinForm(pin, name, err) {
    view.innerHTML = '<div class="mf-c" style="max-width:420px;margin:0 auto"><p class="mf-eyebrow">IF Live</p><h1 class="mf-h1">Mafia</h1><p class="mf-sub">Enter the game PIN from the host’s screen and your first name.</p>' +
      '<input class="mf-inp" id="pin" inputmode="numeric" maxlength="6" placeholder="Game PIN" value="' + esc(pin) + '"><input class="mf-inp" id="nm" maxlength="16" placeholder="Your name" value="' + esc(name) + '" autocomplete="given-name">' +
      (err ? '<p style="color:#ff9d94">' + esc(err) + '</p>' : '') + '<button class="btn" id="go" style="width:100%;margin-top:8px">Join the game</button>' +
      '<p class="mf-sub" style="margin-top:22px">Want to start a game?</p><a class="btn ghost" href="?host=1">Host a game</a></div>';
    $('#go').onclick = function () {
      var p = $('#pin').value.replace(/\D/g, ''), n = $('#nm').value.trim().slice(0, 16);
      if (p.length !== 6 || !n) return joinForm(p, n, 'Enter the 6-digit PIN and your name.');
      var old = L.ls.get('mafia.me') || {}, me = old.pin === p ? old : { pin: p, key: newKey() }; me.name = n; L.ls.set('mafia.me', me);
      history.replaceState(null, '', '?pin=' + p + (L.local ? '&bus=local' : '')); play(p, me);
    };
  }
  async function play(pin, me) {
    view.innerHTML = '';
    var r;
    try { r = L.local ? { pid: me.pid || 'p-' + Math.random().toString(36).slice(2, 10), token: null } : await L.api('join', { pin: pin, pid: me.pid }); }
    catch (e) { L.ls.set('mafia.me', null); return joinForm(pin, me.name, e.code === 'room' ? 'No game with this PIN. Check the number.' : 'Could not join. Try again.'); }
    me.pid = r.pid; if (!me.key) me.key = newKey(); L.ls.set('mafia.me', me);
    var ck = await imp(me.key), first = r.token;
    var bus = await L.connect({ pin: pin, clientId: me.pid, token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('join', { pin: pin, pid: me.pid })).token; } });
    var ui = PlayerUI(view, function (kind, v) { bus.pub('p', kind, { pid: me.pid, v: v }); });
    var hi = function () { bus.pub('p', 'hi', { pid: me.pid, name: me.name, key: me.key }); };
    bus.sub('h', async function (name, d) {
      if (name === 'pub') { ui.pub(d); if (!d.players.some(function (p) { return p.id === me.pid; })) hi(); }
      else if (name === 'prv' && d.to === me.pid) { try { ui.prv(await unseal(ck, d)); } catch (e) {} }
      else if (name === 'who') hi();
    });
    bus.onState(function (s) { if (s === 'connected') hi(); });
    hi(); setTimeout(hi, 1500);
    $('#pinpill').hidden = false; $('#pinpill').textContent = 'PIN ' + pin + ' · ' + me.name;
  }

  /* ================= the host (narrator) ================= */
  var G = null, bus = null, localUI = null, auto = null, htick = null, voiceOn = L.ls.get('mafia.voice') !== false;
  var P = function (id) { return G.players.filter(function (p) { return p.id === id; })[0]; };
  var alive = function () { return G.players.filter(function (p) { return p.alive; }); };
  var nm = function (id) { var p = P(id); return p ? p.name : '?'; };
  var saveG = function () { G.at = Date.now(); L.ls.set('mafia.host', G); };
  function say(text) {
    if (!voiceOn || !window.speechSynthesis) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(text), vs = speechSynthesis.getVoices(); u.lang = 'en-GB'; u.rate = .92; u.pitch = .9;
      u.voice = vs.filter(function (v) { return /en-GB/i.test(v.lang); })[0] || vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || null; speechSynthesis.speak(u); } catch (e) {}
  }
  function deck(n) {
    var m = mafiaCount(n), d = [], room = n - m, i;
    for (i = 0; i < m; i++) d.push('mafia');
    EXTRA.forEach(function (x) { var on = G.opt.roles[x[0]] != null ? G.opt.roles[x[0]] : n >= x[1]; if (on && room > 1) { d.push(x[0]); room--; } });
    while (d.length < n) d.push('civilian');
    return d;
  }
  var deckText = function (n) { var c = {}; deck(n).forEach(function (r) { c[r] = (c[r] || 0) + 1; }); return Object.keys(c).map(function (r) { return (c[r] > 1 ? c[r] + ' × ' : '') + ROLES[r].n; }).join(' · '); };

  var ROUND_OF = { mafia: 'mafia', informant: 'mafia', doctor: 'doctor', sheriff: 'sheriff', cupid: 'special', vigilante: 'special', magician: 'special', busdriver: 'special' };
  var curRound = function () { return G.ph === 'night' && G.rounds ? G.rounds[G.ri] : null; };
  function pubState() {
    var need = 0, done = 0, r = curRound();
    if (G.ph === 'roles') { need = G.players.filter(function (p) { return p.role; }).length; done = G.players.filter(function (p) { return p.ready; }).length; }
    if (G.ph === 'vote') { need = alive().length; done = alive().filter(function (p) { return G.votes[p.id]; }).length; }
    return { ph: G.ph, n: G.n, ri: G.ph === 'night' ? G.ri : 0, round: r ? { k: r.k, title: r.title, i: G.ri + 1, of: G.rounds.length } : null, t: G.t, story: G.story, rumour: G.rumour, win: G.win, need: need, done: done,
      players: G.players.map(function (p) { return { id: p.id, name: p.name, alive: p.alive, role: (G.ph === 'end' || (!p.alive && p.role)) ? p.role : undefined }; }) };
  }
  /** The night move of a role, or null when it has nothing to do tonight. */
  function nightTask(p) {
    var others = alive().filter(function (x) { return x.id !== p.id; }), all = alive(), o = function (a) { return a.map(function (x) { return { id: x.id, name: x.name }; }); };
    switch (p.role) {
      case 'mafia':
        var mates = alive().filter(function (x) { return x.role === 'mafia' && x.id !== p.id; });
        return { k: 'kill', title: 'Choose tonight’s victim', hint: mates.length ? 'Talk to your partners in the chat, then agree on one name.' : 'You are working alone tonight. Choose well.', n: 1, opts: o(all.filter(function (x) { return x.role !== 'mafia'; })), chat: G.chat.slice(-8),
          live: mates.map(function (m) { var a = G.acts[m.id]; return m.name + (a ? ' chose ' + nm(a.v[0]) + (a.soft ? '…' : ' ✓') : ' is thinking…'); }) };
      case 'informant': return { k: 'talk', title: 'The Mafia are talking', hint: 'You can read and write, but you do not choose the victim.', n: 0, opts: [], chat: G.chat.slice(-8) };
      case 'doctor': return { k: 'save', title: 'Who will you protect tonight?', hint: G.selfSaved ? 'You have already protected yourself once.' : 'You can protect yourself once in the game.', n: 1, opts: o(all.filter(function (x) { return x.id !== G.lastSave && !(x.id === p.id && G.selfSaved); })) };
      case 'sheriff': return { k: 'check', title: 'Who do you want to investigate?', hint: 'You will get the answer in the morning.', n: 1, opts: o(others) };
      case 'cupid': if (G.n === 1) return { k: 'love', title: 'Choose two players to fall in love', hint: 'If one leaves the game, the other leaves too. You can choose yourself.', n: 2, opts: o(all) }; break;
      case 'vigilante': if (!G.used.vig) return { k: 'shoot', title: 'Use your one shot tonight?', hint: 'You can do this only once in the game.', n: 1, opts: o(others), skip: 'Not tonight' }; break;
      case 'magician': var back = G.lastDead.map(P).filter(function (x) { return x && !x.alive; }); if (!G.used.mag && back.length) return { k: 'revive', title: 'Bring one player back?', hint: 'You can do this only once in the game.', n: 1, opts: o(back), skip: 'Not tonight' }; break;
      case 'busdriver': if (all.length >= 3) return { k: 'swap', title: 'Choose two players to swap seats', hint: 'What happens to one of them tonight happens to the other.', n: 2, opts: o(all) }; break;
    }
    return null;
  }
  /** What a phone shows in the current night round: the role's move in its own round, a busy job in every other round. */
  function roundTask(p) {
    var r = curRound(); if (!r) return null;
    if (r.k === 'whisper') return p.alive ? { k: 'hunch', title: 'Who do you suspect?', hint: 'Your answer is anonymous. The town will hear the rumours in the morning.', n: 1, opts: alive().filter(function (x) { return x.id !== p.id; }).map(function (x) { return { id: x.id, name: x.name }; }) } : { k: 'busy' };
    var t = p.alive && ROUND_OF[p.role] === r.k ? nightTask(p) : null;
    return t || { k: 'busy' };
  }
  function buildRounds() {
    var has = function (role) { return alive().filter(function (p) { return p.role === role && nightTask(p); }).length > 0; }, R = [{ k: 'mafia', title: 'The Mafia are awake', s: G.opt.secs + 15, say: 'Night ' + G.n + '. The town goes to sleep. The Mafia are awake. Everyone, eyes on your own phone, and do your night job.' }];
    if (has('doctor')) R.push({ k: 'doctor', title: 'The Doctor is on call', s: G.opt.secs, say: 'The Mafia have chosen. Now the Doctor is on call. Everyone, keep working.' });
    if (has('sheriff')) R.push({ k: 'sheriff', title: 'The Sheriff is investigating', s: G.opt.secs, say: 'The Sheriff is investigating. Keep working.' });
    if (['cupid', 'vigilante', 'magician', 'busdriver'].some(has)) R.push({ k: 'special', title: 'Strange things are happening', s: G.opt.secs, say: 'Strange things are happening in the town tonight. Keep working.' });
    R.push({ k: 'whisper', title: 'The town whispers', s: 20, say: 'Before the sun comes up, whisper your suspicion. Who do you suspect?' });
    return R;
  }
  function privFor(p) {
    var v = { s: ++G.seq, ph: G.ph, n: G.n, ri: G.ph === 'night' ? G.ri : 0, role: p.role, av: G.players.indexOf(p), pts: G.brain[p.id] || 0, alive: p.alive, notes: (G.notes[p.id] || []).slice(-3), mates: [], task: null, done: false };
    if (p.role === 'mafia' || p.role === 'informant') v.mates = G.players.filter(function (x) { return x.role === 'mafia' && x.id !== p.id; }).map(function (x) { return x.name; }).concat(p.role === 'mafia' ? ['you'] : []);
    if (G.ph === 'roles') { v.task = { k: 'ready' }; v.done = !!p.ready; }
    else if (G.ph === 'night' && p.role) { v.task = roundTask(p); v.done = v.task.k === 'hunch' ? !!G.hunch[p.id] : !!(G.acts[p.id] && !G.acts[p.id].soft && G.acts[p.id].k === v.task.k); }
    else if (G.ph === 'vote' && p.role) {
      var a = alive().filter(function (x) { return x.id !== p.id; }).map(function (x) { return { id: x.id, name: x.name }; });
      if (p.alive) { v.task = { k: 'vote', title: 'Who should leave the town?', hint: 'The player with the most votes leaves. A tie means nobody leaves.', n: 1, opts: a, skip: 'I’m not voting for anyone', say: 'I vote for … because …' }; v.done = !!G.votes[p.id]; }
      else { v.task = { k: 'bet', title: 'Ghost guess: who will the town send away?', hint: 'A correct guess earns 3 brain points.', n: 1, opts: a }; v.done = !!G.bets[p.id]; }
    }
    return v;
  }
  async function sendPriv(p) {
    var v = privFor(p);
    if (p.local) { if (localUI) localUI.prv(v); return; }
    if (!p.k) return;
    try { p.ck = p.ck || imp(p.k); var m = await seal(await p.ck, v); m.to = p.id; bus.pub('h', 'prv', m); } catch (e) { console.warn('seal', e); }
  }
  function sync(only) {                       // tell everyone where the game is
    saveG();
    (only ? [only] : G.players).forEach(sendPriv);
    var ps = pubState(); setTimeout(function () { bus.pub('h', 'pub', ps); }, 60); if (localUI) localUI.pub(ps);   // the public state goes last: it is what a phone gets when it reconnects
    hostRender();
  }

  function onMsg(name, d, from) {
    if (!d) return; var pid = L.local || !from || /^host-/.test(from) ? d.pid : from, p = P(pid);
    if (name === 'hi') {
      if (!p) {
        if (G.players.length >= MAX) return;
        var base = String(d.name || 'Player').replace(/\s+/g, ' ').trim().slice(0, 16) || 'Player', n2 = base, i = 2; while (G.players.some(function (x) { return x.name.toLowerCase() === n2.toLowerCase(); })) n2 = base + ' ' + i++;
        p = { id: pid, name: n2, k: d.key, role: null, alive: false, ready: false, local: !!d.local }; G.players.push(p); L.sfx('coin');
      } else if (d.key && d.key !== p.k) { p.k = d.key; p.ck = null; }
      sync(G.ph === 'lobby' ? null : p); return;
    }
    if (!p) return;
    if (name === 'ready' && G.ph === 'roles') { p.ready = true; sync(p); if (G.players.every(function (x) { return !x.role || x.ready; })) later(startNight, 1500); return; }
    if (name === 'pts' && G.ph === 'night' && p.role) {            // a night job answered
      var now = Date.now(); if (now - (p.lp || 0) < 700) return; p.lp = now;
      if (d.v) G.brain[p.id] = (G.brain[p.id] || 0) + 1;
      if (p.alive) { G.nTot++; if (d.v) G.nOk++; }
      var m = $('#focus'); if (m) m.style.width = focusPct() + '%'; var ft = $('#focusT'); if (ft) ft.textContent = focusPct() + '%';
      return;
    }
    if (name === 'act') {
      var a = d.v || {}, v = Array.isArray(a.v) ? a.v.map(String).slice(0, 2) : [];
      if (G.ph === 'night' && p.role) {
        var r = curRound();
        if (a.k === 'chat') {                  // the Mafia's private line
          if (!p.alive || r.k !== 'mafia' || ROUND_OF[p.role] !== 'mafia' || !v[0]) return;
          G.chat.push({ n: p.name, x: v[0].slice(0, 90) }); G.chat = G.chat.slice(-14);
          G.players.filter(function (x) { return x.alive && ROUND_OF[x.role] === 'mafia'; }).forEach(sendPriv); saveG(); return;
        }
        var t = roundTask(p); if (!t || t.k === 'busy' || a.k !== t.k || !t.n) return;
        var ok = v[0] === 'skip' ? !!t.skip : v.length === t.n && v.every(function (id) { return t.opts.some(function (o) { return o.id === id; }); }) && (t.n === 1 || v[0] !== v[1]);
        if (!ok) return;
        if (t.k === 'hunch') G.hunch[p.id] = v[0]; else G.acts[p.id] = { k: a.k, v: v, soft: a.soft ? 1 : 0 };
        if (p.role === 'mafia' && t.k === 'kill') G.players.filter(function (x) { return x.alive && ROUND_OF[x.role] === 'mafia'; }).forEach(sendPriv); else sendPriv(p);
        saveG();
      } else if (G.ph === 'vote' && p.role) {
        var id = v[0], valid = id === 'skip' ? p.alive : !!(P(id) && P(id).alive && id !== p.id); if (!valid) return;
        if (p.alive) G.votes[p.id] = id; else G.bets[p.id] = id;
        sendPriv(p); saveG(); pubOnly();
        if (alive().every(function (x) { return G.votes[x.id]; })) later(endVote, 2500);
      }
    }
  }
  function pubOnly() { var ps = pubState(); bus.pub('h', 'pub', ps); if (localUI) localUI.pub(ps); hostRender(); }
  function later(fn, ms) { clearTimeout(auto); auto = setTimeout(fn, ms); }
  var focusPct = function () { return G.nTot ? Math.round(G.nOk / G.nTot * 100) : 0; };

  function startGame() {
    var ps = G.players, d = L.shuffle(deck(ps.length));
    ps.forEach(function (p, i) { p.role = d[i]; p.alive = true; p.ready = false; });
    G.ph = 'roles'; G.n = 0; G.story = []; G.rumour = ''; G.win = null; G.acts = {}; G.hunch = {}; G.chat = []; G.votes = {}; G.bets = {}; G.notes = {}; G.lovers = []; G.used = {}; G.lastSave = null; G.selfSaved = false; G.lastDead = []; G.brain = {}; G.cleared = []; G.rounds = null;
    say('Welcome to the town. Look at your phone. Press and hold your card to see your secret role.'); sync();
  }
  function startNight() {
    clearTimeout(auto); if (G.ph === 'night') return;
    G.ph = 'night'; G.n++; G.acts = {}; G.hunch = {}; G.chat = []; G.votes = {}; G.bets = {}; G.story = []; G.rumour = ''; G.nOk = 0; G.nTot = 0;
    G.ri = -1; G.rounds = buildRounds(); nextRound();
  }
  function nextRound() {
    if (G.ph !== 'night') return;
    G.ri++; if (G.ri >= G.rounds.length) return endNight();
    var r = G.rounds[G.ri]; G.t = Date.now() + r.s * 1000; say(r.say); sync();
  }
  function kill(id, out) {                     // remove a player; a lover follows
    var p = P(id); if (!p || !p.alive) return; p.alive = false; out.push(id);
    if (G.lovers.indexOf(id) >= 0) { var o = P(G.lovers[0] === id ? G.lovers[1] : G.lovers[0]); if (o && o.alive) { o.alive = false; out.push(o.id); G.story.push(o.name + ' could not live without ' + p.name + ', and has left the town with a broken heart. ' + o.name + ' was ' + roleA(o.role) + '.'); } }
  }
  function note(id, text) { (G.notes[id] = G.notes[id] || []).push(text); }
  function endNight() {
    clearTimeout(auto); if (G.ph !== 'night') return;
    var awake = alive(), by = function (k) { return awake.filter(function (p) { return G.acts[p.id] && G.acts[p.id].k === k && G.acts[p.id].v[0] !== 'skip'; }); };
    var sw = by('swap')[0], A = sw ? G.acts[sw.id].v : null, rd = function (x) { return A ? (x === A[0] ? A[1] : x === A[1] ? A[0] : x) : x; };
    var out = [], S = G.story = [], doc = by('save')[0], saved = doc ? rd(G.acts[doc.id].v[0]) : null;
    if (doc) { G.lastSave = G.acts[doc.id].v[0]; if (G.lastSave === doc.id) G.selfSaved = true; } else G.lastSave = null;
    var cu = by('love')[0]; if (cu) { G.lovers = G.acts[cu.id].v.slice(); G.lovers.forEach(function (id, i) { note(id, '💘 You are in love with ' + nm(G.lovers[1 - i]) + '. If ' + nm(G.lovers[1 - i]) + ' leaves the game, you leave too.'); }); }
    // the Mafia's choice: most votes, a tie is broken by chance
    var tally = {}, top = 0, kt = null; by('kill').forEach(function (m) { var t = G.acts[m.id].v[0]; tally[t] = (tally[t] || 0) + 1; top = Math.max(top, tally[t]); });
    var tied = Object.keys(tally).filter(function (t) { return tally[t] === top; }); if (tied.length) kt = rd(pickOne(tied));
    S.push('The sun rises over the town.');
    if (kt && P(kt)) {
      var v = P(kt);
      if (v.role === 'grandma') { var mf = pickOne(alive().filter(function (x) { return x.role === 'mafia'; })); kill(mf.id, out); S.push('The Mafia knocked on the wrong door. Grandma was ready for them, and ' + mf.name + ' has left the town. ' + mf.name + ' was Mafia.'); }
      else if (kt === saved) S.push('The Mafia came in the night, but the Doctor was there first. Nobody was hurt.');
      else { kill(kt, out); S.splice(1, 0, v.name + ' is not at breakfast. ' + v.name + ' has left the town, and was ' + roleA(v.role) + '.'); }
    } else S.push('It was a quiet night.');
    var vg = by('shoot')[0];
    if (vg) { G.used.vig = true; var st = rd(G.acts[vg.id].v[0]), sp = P(st);
      if (sp && sp.alive) { if (st === saved) S.push('A shot rang out in the dark, but the Doctor saved the target.'); else { kill(st, out); S.push('A shot rang out in the dark. ' + sp.name + ' has left the town, and was ' + roleA(sp.role) + '.' + (ROLES[sp.role].team === 'town' ? ' The Vigilante made a terrible mistake.' : '')); } } }
    var sh = by('check')[0]; if (sh) { var c = P(rd(G.acts[sh.id].v[0])); note(sh.id, '⭐ Night ' + G.n + ': you investigated ' + nm(G.acts[sh.id].v[0]) + '. Result: ' + (c && c.role === 'mafia' ? 'MAFIA.' : 'not Mafia.')); }
    var mg = by('revive')[0]; if (mg) { var b = P(G.acts[mg.id].v[0]); if (b && !b.alive) { b.alive = true; G.used.mag = true; S.push('A puff of smoke… ' + b.name + ' is back in the game!'); } }
    var hz = {}, ht = 0; Object.keys(G.hunch).forEach(function (id) { var t = G.hunch[id]; hz[t] = (hz[t] || 0) + 1; ht = Math.max(ht, hz[t]); });
    var hn = Object.keys(hz).filter(function (t) { return hz[t] === ht && P(t) && P(t).alive; });
    G.rumour = hn.length && hn.length <= 2 ? 'Town rumours: ' + (ht === 1 ? 'someone' : ht + ' people') + ' whispered that ' + hn.map(nm).join(' and ') + ' ' + (hn.length > 1 ? 'are' : 'is') + ' hiding something.' : '';
    G.lastDead = out.slice(); G.acts = {}; G.hunch = {};
    if (!win()) {
      // the night jobs: a focused town earns a clue
      if (G.opt.clues && G.nTot >= alive().length && focusPct() >= 70) {
        var a2 = alive(), maf = a2.filter(function (p) { return p.role === 'mafia'; }), town = a2.filter(function (p) { return ROLES[p.role].team === 'town'; }), fresh = town.filter(function (p) { return G.cleared.indexOf(p.id) < 0; });
        if (a2.length >= 7 && town.length >= 2) S.push('The town stayed sharp last night (' + focusPct() + '% correct) and found a clue: one of these three is Mafia: ' + L.shuffle([pickOne(maf)].concat(L.shuffle(town).slice(0, 2))).map(function (p) { return p.name; }).join(', ') + '.');
        else if (fresh.length > 1) { var cl = pickOne(fresh); G.cleared.push(cl.id); S.push('The town stayed sharp last night (' + focusPct() + '% correct) and found a clue: ' + cl.name + ' is not Mafia.'); }
      } else if (G.opt.clues) S.push('The town was too sleepy to find a clue (' + focusPct() + '% correct; 70% earns one).');
      G.ph = 'day'; G.t = Date.now() + G.opt.mins * 60000; S.push('You have ' + G.opt.mins + ' minutes to talk. Who is the Mafia?');
    }
    say(S.join(' ') + (G.rumour && G.ph === 'day' ? ' ' + G.rumour : '')); sync();
  }
  function startVote() { clearTimeout(auto); if (G.ph !== 'day') return; G.ph = 'vote'; G.votes = {}; G.bets = {}; say('Time is up. Vote on your phone. Say your reason aloud before you confirm.'); sync(); }
  function endVote() {
    clearTimeout(auto); if (G.ph !== 'vote') return;
    var S = G.story = [], tl = {}, mx = 0; alive().forEach(function (p) { var t = G.votes[p.id]; if (!t || t === 'skip') return; tl[t] = (tl[t] || 0) + 1; mx = Math.max(mx, tl[t]); });
    var topv = Object.keys(tl).filter(function (t) { return tl[t] === mx; }), out = [];
    G.tally = Object.keys(tl).map(function (t) { return [nm(t), tl[t]]; }).sort(function (a, b) { return b[1] - a[1]; });
    if (topv.length === 1) {
      var v = P(topv[0]); S.push('The town has decided. ' + v.name + ' leaves the town with ' + mx + ' vote' + (mx === 1 ? '' : 's') + '. ' + v.name + ' was ' + roleA(v.role) + '.');
      Object.keys(G.bets).forEach(function (g) { if (G.bets[g] === v.id) G.brain[g] = (G.brain[g] || 0) + 3; });   // ghosts who guessed right
      kill(v.id, out);
    } else S.push(topv.length ? 'The vote is tied. Nobody leaves the town today.' : 'Nobody voted. Nobody leaves the town today.');
    if (!win()) G.ph = 'result';
    say(S.join(' ')); sync();
  }
  function win() {
    var a = alive(), m = a.filter(function (p) { return p.role === 'mafia'; }).length, side = a.filter(function (p) { return ROLES[p.role].team === 'mafia'; }).length, town = a.length - side;
    var w = m === 0 ? 'town' : side >= town ? 'mafia' : null;
    if (w) { G.win = w; G.ph = 'end'; G.story.push(w === 'town' ? 'The last of the Mafia is gone. The town is safe!' : 'The Mafia now control the town. The Mafia win!'); L.sfx('win'); }
    return w;
  }

  function hostRender() {
    clearInterval(htick); if (!G) return;
    var ph = G.ph, ps = pubState(), h = '', n = G.players.length, joinUrl = location.origin + '/live/mafia/?pin=' + G.pin + (L.local ? '&bus=local' : '');
    document.body.classList.toggle('mf-night', ph === 'night');
    var chips = function (f) { return '<div class="mf-chips">' + G.players.filter(function (p) { return ph === 'lobby' || p.role; }).map(function (p) { return '<span class="mf-chip' + (ph !== 'lobby' && !p.alive ? ' out' : '') + (f && f(p) ? ' ok' : '') + '">' + esc(p.name) + (ph !== 'lobby' && !p.alive && p.role ? '<small>' + ROLES[p.role].n + '</small>' : '') + '</span>'; }).join('') + '</div>'; };
    var story = function () { return (G.story || []).map(function (s) { return '<p class="mf-story">' + esc(s) + '</p>'; }).join(''); };
    var mineBtn = G.players.some(function (p) { return p.local; }) ? '<button class="btn ghost" id="mineBtn">🎴 My phone view</button>' : '';
    if (ph === 'lobby') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Mafia Live · join at intellectfirst.com/live/mafia</p><div class="mf-join"><div><div class="mf-pin">' + G.pin + '</div><p class="mf-sub">Game PIN</p></div><div class="mf-qr">' + L.qr(joinUrl) + '</div></div>' +
        (n ? chips() : '<p class="mf-sub">Waiting for players to join…</p>') +
        '<div class="mf-box"><h3>The cards for ' + Math.max(n, MIN) + ' players</h3><p class="mf-sub" style="margin:0 0 10px;text-align:left">' + esc(deckText(Math.max(n, MIN))) + '</p><div class="mf-tog" id="roles">' +
        EXTRA.map(function (x) { var on = G.opt.roles[x[0]] != null ? G.opt.roles[x[0]] : Math.max(n, MIN) >= x[1]; return '<button data-r="' + x[0] + '" class="' + (on ? 'on' : '') + '">' + ROLES[x[0]].e + ' ' + ROLES[x[0]].n + '</button>'; }).join('') + '</div>' +
        '<h3 style="margin-top:14px">Discussion time</h3><div class="mf-tog" id="mins">' + [2, 3, 4, 5].map(function (m) { return '<button data-m="' + m + '" class="' + (G.opt.mins === m ? 'on' : '') + '">' + m + ' min</button>'; }).join('') + '</div>' +
        '<h3 style="margin-top:14px">Night rounds</h3><div class="mf-tog" id="secs">' + [20, 30, 45].map(function (m) { return '<button data-s="' + m + '" class="' + (G.opt.secs === m ? 'on' : '') + '">' + m + ' sec each</button>'; }).join('') + '<button data-s="clues" class="' + (G.opt.clues ? 'on' : '') + '">🔎 Clues for a focused town</button></div></div>' +
        '<div class="mf-row">' + (G.players.some(function (p) { return p.local; }) ? '' : '<button class="btn ghost" id="playToo">🎴 Play on this device too</button>') + mineBtn + '<button class="btn" id="start" ' + (n >= MIN ? '' : 'disabled style="opacity:.4"') + '>' + (n >= MIN ? 'Deal the cards (' + n + ' players)' : 'Need ' + (MIN - n) + ' more player' + (MIN - n === 1 ? '' : 's')) + '</button></div>' +
        '<p class="mf-small">The host’s screen never shows secret roles, so the host can play too. Best with 6 or more players.</p></div>';
    } else if (ph === 'roles') {
      h = '<div class="mf-c"><p class="mf-eyebrow">The cards are dealt</p><h1 class="mf-h1">Look at your phone</h1><p class="mf-sub">Press and hold your card to see your secret role. Don’t show anyone.</p>' + chips(function (p) { return p.ready; }) +
        '<p class="mf-sub">' + ps.done + ' of ' + ps.need + ' ready</p><div class="mf-row">' + mineBtn + '<button class="btn" id="next">Begin Night 1</button></div></div>';
    } else if (ph === 'night') {
      var r = curRound();
      h = '<div class="mf-c"><div class="mf-moon">🌙</div><p class="mf-eyebrow">Night ' + G.n + ' · round ' + (G.ri + 1) + ' of ' + G.rounds.length + '</p><h1 class="mf-h1">' + esc(r.title) + '</h1><div class="mf-timer" id="hT"></div>' +
        '<p class="mf-sub">Every phone has a job this round, so nobody can tell who is awake. Eyes on your own screen.</p>' +
        (G.opt.clues ? '<div class="mf-meter"><i id="focus" style="width:' + focusPct() + '%"></i><em></em></div><p class="mf-small">Town focus <b id="focusT">' + focusPct() + '%</b> · 70% correct earns the town a clue in the morning</p>' : '') +
        '<div class="mf-row">' + mineBtn + '<button class="btn ghost" id="next">Skip to the next round</button></div></div>';
    } else if (ph === 'day') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + G.n + '</p>' + story() + (G.rumour ? '<p class="mf-rum">' + esc(G.rumour) + '</p>' : '') + '<div class="mf-timer" id="hT"></div>' + chips() +
        '<div class="mf-row">' + mineBtn + '<button class="btn ghost" id="more">+1 minute</button><button class="btn" id="next">Start the vote</button></div></div>';
    } else if (ph === 'vote') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + G.n + '</p><h1 class="mf-h1">Vote on your phone</h1><p class="mf-sub">Say your reason aloud: “I vote for … because …”.</p>' + chips(function (p) { return p.alive && G.votes[p.id]; }) +
        '<p class="mf-sub">' + ps.done + ' of ' + ps.need + ' votes</p><div class="mf-row">' + mineBtn + '<button class="btn ghost" id="next">Close the vote</button></div></div>';
    } else if (ph === 'result') {
      h = '<div class="mf-c"><p class="mf-eyebrow">Day ' + G.n + ' · the vote</p>' + story() + (G.tally && G.tally.length ? '<p class="mf-sub">' + G.tally.map(function (t) { return esc(t[0]) + ' ' + t[1]; }).join(' · ') + '</p>' : '') + chips() + '<div class="mf-row">' + mineBtn + '<button class="btn" id="next">Night ' + (G.n + 1) + '</button></div></div>';
    } else if (ph === 'end') {
      var stars = G.players.filter(function (p) { return G.brain[p.id]; }).sort(function (a, b) { return G.brain[b.id] - G.brain[a.id]; }).slice(0, 5);
      h = '<div class="mf-c"><div class="mf-moon">' + (G.win === 'town' ? '🏡' : '🎩') + '</div><h1 class="mf-h1">' + (G.win === 'town' ? 'The town wins' : 'The Mafia win') + '</h1>' + story() +
        '<div class="mf-box"><h3>Who was who</h3><table class="mf-table">' + G.players.filter(function (p) { return p.role; }).map(function (p) { return '<tr><td>' + esc(p.name) + (p.alive ? '' : ' 👻') + '</td><td>' + ROLES[p.role].e + ' ' + ROLES[p.role].n + '</td></tr>'; }).join('') + '</table>' +
        (stars.length ? '<h3 style="margin-top:12px">Sharpest minds (night jobs)</h3><p class="mf-sub" style="text-align:left;margin:0">' + stars.map(function (p) { return esc(p.name) + ' ' + G.brain[p.id]; }).join(' · ') + '</p>' : '') + '</div>' +
        '<div class="mf-row">' + mineBtn + '<button class="btn" id="again">Play again with the same players</button></div></div>';
    }
    view.innerHTML = h;
    var on = function (id, fn) { var b = $('#' + id); if (b) b.onclick = fn; };
    on('start', startGame); on('again', function () { G.ph = 'lobby'; G.players.forEach(function (p) { p.role = null; p.alive = false; p.ready = false; }); G.story = []; sync(); });
    on('next', function () { ({ roles: startNight, night: nextRound, day: startVote, vote: endVote, result: startNight })[G.ph](); });
    on('more', function () { G.t += 60000; sync(); });
    on('playToo', function () { var name = (prompt('Your first name') || '').trim(); if (name) joinLocal(name); });
    on('mineBtn', function () { $('#mine').hidden = false; });
    var rb = $('#roles'); if (rb) rb.onclick = function (e) { var b = e.target.closest('[data-r]'); if (!b) return; var r = b.dataset.r, cur = G.opt.roles[r] != null ? G.opt.roles[r] : Math.max(n, MIN) >= EXTRA.filter(function (x) { return x[0] === r; })[0][1]; G.opt.roles[r] = !cur; saveG(); hostRender(); };
    var sb = $('#secs'); if (sb) sb.onclick = function (e) { var b = e.target.closest('[data-s]'); if (!b) return; if (b.dataset.s === 'clues') G.opt.clues = !G.opt.clues; else G.opt.secs = +b.dataset.s; saveG(); hostRender(); };
    var mb = $('#mins'); if (mb) mb.onclick = function (e) { var b = e.target.closest('[data-m]'); if (!b) return; G.opt.mins = +b.dataset.m; saveG(); hostRender(); };
    if (ph === 'day' || ph === 'night') { var T = $('#hT'), up = function () { var left = G.t - Date.now(); if (T) T.textContent = clock(left); if (left <= 0) { clearInterval(htick); if (G.ph === 'day') startVote(); else nextRound(); } }; up(); htick = setInterval(up, 500); }
  }
  function joinLocal(name) {                   // the host plays on the same device
    var box = $('#mine'); box.innerHTML = '<button class="btn ghost sm x" id="mineX">✕ Back to the narrator screen</button><div id="mineV" data-embedded="1" style="max-width:520px;margin:44px auto 0"></div>';
    $('#mineX').onclick = function () { box.hidden = true; };
    var me = G.players.filter(function (p) { return p.local; })[0], id = me ? me.id : 'p-host' + Math.random().toString(36).slice(2, 8);
    localUI = PlayerUI($('#mineV'), function (kind, v) { onMsg(kind, { pid: id, v: v }, null); });
    if (me) sync(me); else onMsg('hi', { pid: id, name: name, local: 1 }, null);
  }

  async function hostPage() {
    $('#snd').hidden = false; $('#snd').textContent = voiceOn ? '🔊' : '🔇';
    $('#snd').onclick = function () { voiceOn = !voiceOn; L.ls.set('mafia.voice', voiceOn); this.textContent = voiceOn ? '🔊' : '🔇'; if (!voiceOn && window.speechSynthesis) speechSynthesis.cancel(); };
    var old = L.ls.get('mafia.host'), resume = old && old.pin && old.brain && Date.now() - old.at < 3 * 3600e3 && old.ph !== 'end';
    view.innerHTML = '<div class="mf-c" style="max-width:520px;margin:0 auto"><p class="mf-eyebrow">IF Live</p><h1 class="mf-h1">Host Mafia</h1><p class="mf-sub">This screen is the narrator. Put it on the projector, or just hold your phone. Players join with a PIN and get their secret card on their own phone.</p>' +
      '<button class="btn" id="new" style="width:100%">Start a new game</button>' + (resume ? '<button class="btn ghost" id="res" style="width:100%;margin-top:10px">Continue game ' + old.pin + ' (' + old.players.length + ' players)</button>' : '') +
      '<p id="herr" style="color:#ff9d94;margin-top:12px"></p><p class="mf-sub" style="margin-top:20px">Joining a game?</p><a class="btn ghost" href="?">Enter a PIN</a></div>';
    var open = async function (state) {
      try {
        var tok = null, pin;
        if (L.local) pin = state ? state.pin : String(Math.floor(100000 + Math.random() * 900000));
        else if (state) { tok = (await L.api('token', { pin: state.pin, as: 'host' })).token; pin = state.pin; }
        else { var r = await L.api('host', { mode: 'mafia', title: 'Mafia Live' }); tok = r.token; pin = r.room.pin; }
        G = state || { pin: pin, ph: 'lobby', n: 0, players: [], opt: { roles: {}, mins: 3, secs: 30, clues: true }, seq: 0, acts: {}, hunch: {}, chat: [], votes: {}, bets: {}, notes: {}, story: [], brain: {}, cleared: [], lovers: [], used: {}, lastDead: [] };
        G.players.forEach(function (p) { p.ck = null; });
        var first = tok;
        bus = await L.connect({ pin: pin, clientId: 'host', token: async function () { if (first) { var t = first; first = null; return t; } return (await L.api('token', { pin: pin, as: 'host' })).token; } });
        bus.sub('p', onMsg);
        $('#pinpill').hidden = false; $('#pinpill').textContent = 'PIN ' + pin;
        history.replaceState(null, '', '?host=1' + (L.local ? '&bus=local' : ''));
        var me = G.players.filter(function (p) { return p.local; })[0]; if (me) joinLocal(me.name);
        bus.pub('h', 'who', {}); sync();
      } catch (e) {
        $('#herr').innerHTML = e.code === 'login' || e.status === 401 ? 'Sign in to host a game. <a href="/login/?next=' + encodeURIComponent('/live/mafia/?host=1') + '" style="color:var(--gold)">Sign in</a>' : e.code === 'quota' ? 'You have hosted a lot of games today. Try again tomorrow.' : e.code === 'not-configured' ? 'Live games are not switched on for this site yet.' : 'Could not start the game. Check your connection and try again.';
      }
    };
    $('#new').onclick = function () { open(null); }; if (resume) $('#res').onclick = function () { open(old); };
  }

  window.addEventListener('beforeunload', function (e) { if (G && G.ph !== 'lobby' && G.ph !== 'end') { e.preventDefault(); e.returnValue = ''; } });
  if (Q.get('host')) hostPage(); else playerPage();
})();
