/* Guest pass page: /pass/?c=CODE — a personal page of games and lessons for a few days, no account.
   The icons are IF Academy's own drawings (a blocky runner, a grass block, a race car, a brain); they are not
   the artwork of any other game. */
(function () {
  var $ = function (s) { return document.querySelector(s); }, esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var IC = {
    /* a blocky runner on a floating platform: obby / avatar games (like Roblox) */
    roblox: '<svg viewBox="0 0 64 64"><defs><linearGradient id="rb1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd76a"/><stop offset="1" stop-color="#e2a520"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="#16356b"/><path d="M8 50l24-8 24 8-24 8z" fill="#3ccf7e"/><path d="M8 50v4l24 8v-4z" fill="#249a5a"/><path d="M56 50v4l-24 8v-4z" fill="#1c7d48"/><rect x="24" y="8" width="16" height="14" rx="3" fill="url(#rb1)"/><rect x="27" y="13" width="3" height="3" rx="1" fill="#1b2333"/><rect x="34" y="13" width="3" height="3" rx="1" fill="#1b2333"/><rect x="28" y="18" width="8" height="1.8" rx=".9" fill="#1b2333"/><rect x="22" y="23" width="20" height="14" rx="2" fill="#e8513d"/><rect x="14" y="20" width="7" height="13" rx="2" transform="rotate(-28 17 26)" fill="url(#rb1)"/><rect x="43" y="23" width="7" height="13" rx="2" transform="rotate(24 46 29)" fill="url(#rb1)"/><rect x="23" y="38" width="8" height="12" rx="2" fill="#2d5bd0"/><rect x="34" y="37" width="8" height="10" rx="2" transform="rotate(-22 38 42)" fill="#2d5bd0"/></svg>',
    /* a grass block with a pickaxe: block-building / mining games (like Minecraft) */
    minecraft: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#16356b"/><path d="M32 12l20 10-20 10-20-10z" fill="#5fd068"/><path d="M12 22v6l20 10v-6z" fill="#3fa94b"/><path d="M52 22v6l-20 10v-6z" fill="#2f8a3b"/><path d="M12 28v18l20 10V38z" fill="#9a6a3c"/><path d="M52 28v18l-20 10V38z" fill="#7a5029"/><path d="M17 36l5 2.5v4L17 40zM25 46l4 2v4l-4-2zM44 34l4-2v4l-4 2zM37 47l5-2.5v4L37 51z" fill="#5d3c1c" opacity=".7"/><path d="M40 9l13 13" stroke="#b9794a" stroke-width="3.4" stroke-linecap="round"/><path d="M34 10c6-4 14-2 19 4-4-1-7-1-10 1-2-3-5-5-9-5z" fill="#cfd6e4"/></svg>',
    race: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#16356b"/><path d="M6 46h52" stroke="#e8c36a" stroke-width="3" stroke-dasharray="7 5"/><path d="M12 38c2-8 8-12 16-12h8c7 0 12 3 16 9l2 3v4H12z" fill="#e8513d"/><path d="M26 27h9c4 0 7 2 9 5H22c1-3 2-5 4-5z" fill="#bfe3ff"/><circle cx="22" cy="43" r="6" fill="#14161c"/><circle cx="22" cy="43" r="2.4" fill="#cfd6e4"/><circle cx="44" cy="43" r="6" fill="#14161c"/><circle cx="44" cy="43" r="2.4" fill="#cfd6e4"/><path d="M48 8v14" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M48 8h10v8H48z" fill="#fff"/><path d="M48 8h5v4h-5zM53 12h5v4h-5z" fill="#14161c"/></svg>',
    mindlab: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#16356b"/><path d="M32 14c-6-5-17-1-16 8-6 3-6 12 0 15 0 8 9 12 16 7z" fill="#ff9fb4"/><path d="M32 14c6-5 17-1 16 8 6 3 6 12 0 15 0 8-9 12-16 7z" fill="#ff7f9c"/><path d="M32 14v30M22 24c3 0 5 2 5 5M42 24c-3 0-5 2-5 5M20 36c3-1 6 0 7 3M44 36c-3-1-6 0-7 3" stroke="#b83a5c" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M50 8l1.6 4 4 1.6-4 1.6L50 19l-1.6-3.8-4-1.6 4-1.6z" fill="#e8c36a"/><rect x="26" y="48" width="12" height="6" rx="3" fill="#e8c36a"/></svg>',
    lessons: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#16356b"/><path d="M10 18c8-3 15-2 22 3v30c-7-5-14-6-22-3z" fill="#fff"/><path d="M54 18c-8-3-15-2-22 3v30c7-5 14-6 22-3z" fill="#f1ead8"/><path d="M15 26c4-1 8 0 12 2M15 33c4-1 8 0 12 2M37 28c4-2 8-3 12-2M37 35c4-2 8-3 12-2" stroke="#16356b" stroke-width="2" stroke-linecap="round"/><circle cx="48" cy="14" r="7" fill="#e8c36a"/><path d="M45 14l2.2 2.2 4-4.4" stroke="#16356b" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  var KID = { Starters: 1, Movers: 1, Flyers: 1 };
  /* what each level sees in each group: [title, text, link] */
  function catalog(lv) {
    var kid = !!KID[lv], cefr = kid ? null : lv, bq = '/a/block-quest/?level=' + encodeURIComponent(lv);
    var kartLv = kid ? lv.toLowerCase() : lv === 'A2' ? 'ket' : lv === 'A1' ? 'flyers' : 'pet';
    var kq = kid ? lv : lv === 'A2' ? 'KET' : lv === 'A1' ? 'Flyers' : 'PET';
    return {
      roblox: { t: 'Run and climb games', s: 'Like Roblox: make your avatar, then run, jump and climb.', c: [
        ['Tower Climb', 'Climb the tower. Jump on the green pads and stay away from the red bricks.', bq + '&mode=tower'],
        ['Grammar Obby', 'Run in the sky and jump onto the right answer.', bq + '&mode=obby']] },
      race: { t: 'Race games', s: 'Drive fast and answer in English to get a turbo.', c: [
        ['IF Kart 3D', 'A 3D kart race. Drive through the gift boxes and answer.', '/a/if-kart/?level=' + kartLv],
        ['Kids Quest race', 'A story with kart races and a word mine.', '/a/kids-quest/?level=' + kq]] },
      minecraft: { t: 'Block world games', s: 'Like Minecraft: walk in a block world and mine the word blocks.', c: [
        ['Block Quest · Word Mine', 'Find the glowing blocks, mine them and collect gems.', bq + '&mode=mine']] },
      mindlab: { t: 'IF Mind Lab', s: 'Brain games: words, spelling, listening and memory.', c: [
        kid ? ['IF Mind Lab Kids', 'Brain-training games for young learners.', '/a/mind-lab/?kids=1'] : ['IF Mind Lab', 'Brain-training games with English words.', '/a/mind-lab/']] },
      lessons: { t: 'Words and lessons', s: 'Learn the words of your level.', c: kid ? [
        [lv + ' words', 'Picture words with games.', '/a/if-english/courses/' + lv + '/index.html'],
        [lv + ' tests', 'Practice tests with listening.', '/a/' + lv.toLowerCase() + '-tests/']] : [
        ['General English ' + cefr, 'Vocabulary, grammar, reading and listening. Unit 1 is open.', '/app/general/#/course/ge-' + cefr.toLowerCase()]] }
    };
  }
  function left(ms) { var h = Math.ceil(ms / 3600e3); return h > 48 ? Math.ceil(h / 24) + ' days left' : h > 1 ? h + ' hours left' : 'less than 1 hour left'; }
  var view = $('#view'), code = (new URLSearchParams(location.search).get('c') || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  function gone(h, p) { view.innerHTML = '<div class="hero"><h1>' + h + '</h1><p>' + p + '</p></div><div class="note">IF Academy · Al-Farabi 19, Kostanay. Ask us for a new pass, or <a href="/me/#/register">create a free account</a>.</div>'; }
  if (!code) {   // no QR: type the 8-letter code
    view.innerHTML = '<div class="hero"><h1>Your free pass</h1><p>Scan the QR code from IF Academy, or type your code here.</p></div><div class="panel"><label class="f">Pass code (8 letters and numbers)</label><input type="text" id="pc" maxlength="12" autocomplete="off" autocapitalize="characters" placeholder="ABCD2345" style="font-size:22px;letter-spacing:.2em;text-align:center;text-transform:uppercase"><p class="err" id="perr"></p><button class="btn gold" id="pgo">Open my games</button></div>';
    var goCode = function () { var v = $('#pc').value.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); if (v.length !== 8) { $('#perr').textContent = 'The code has 8 letters and numbers.'; return; } location.href = '/pass/?c=' + v; };
    $('#pgo').onclick = goCode; $('#pc').onkeydown = function (e) { if (e.key === 'Enter') goCode(); };
    return;
  }
  fetch('/api/pass/' + code).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); }).then(function (p) {
    if (!p.left) { try { localStorage.removeItem('if.pass'); } catch (e) {} return gone('Your free pass has finished', 'We hope you enjoyed it, ' + esc(p.first) + '!'); }
    try { localStorage.setItem('if.pass', JSON.stringify({ code: code, until: p.until, level: p.level })); } catch (e) {}
    var C = catalog(p.level), h = '<div class="hero"><h1>Hi, ' + esc(p.first) + '! 👋</h1><p>These games are for you. Level: <b>' + esc(p.level) + '</b>.</p><span class="left">🎟 Free pass · ' + left(p.left) + '</span></div>';
    p.show.forEach(function (k) {
      var g = C[k]; if (!g) return;
      h += '<h2>' + IC[k] + esc(g.t) + '</h2><p class="sd">' + esc(g.s) + '</p><div class="grid">' + g.c.map(function (c) { return '<a class="card" href="' + esc(c[2]) + '">' + IC[k] + '<div><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span></div></a>'; }).join('') + '</div>';
    });
    h += '<h2>🎮 All games</h2><p class="sd">Your pass opens every game in IF App until it ends.</p><p><a class="btn gold" href="/app/#/games">Open all games</a></p>';
    h += '<div class="note">Keep this page: add it to your home screen, or scan the QR code again to come back. For parents: this is a free trial from IF Academy, Al-Farabi 19, Kostanay.</div>';
    view.innerHTML = h;
  }).catch(function (s) { gone(s === 404 ? 'We cannot find this pass' : 'Could not open the pass', s === 404 ? 'Please scan the QR code again.' : 'Check the internet connection and try again.'); });
})();
