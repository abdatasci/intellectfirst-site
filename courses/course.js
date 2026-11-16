/* IF video courses: the player page (shared by every course; the outline is window.COURSE).
   Videos: unlisted YouTube links set by a teacher (Teacher tools), sent by /api/course only to people allowed to watch.
   Free preview: unit 1 for everyone, unit 2 with a free account, the rest for IF Academy students and members. */
(function () {
  var C = window.COURSE, app = document.getElementById('app'), who = document.getElementById('who');
  var S = { level: 'none', videos: {}, locked: [], progress: null, subs: {}, staff: false, free: 1, signedFree: 2, name: '' };
  var cur = { unit: 'u1', video: null, tab: 'files' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(s) { return document.querySelector(s); }
  function toast(t) { var d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 2600); }
  async function api(p, body) {
    var r = await fetch('/api/course/' + C.id + (p ? '/' + p : ''), body ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), credentials: 'same-origin' } : { credentials: 'same-origin' });
    var j = await r.json().catch(function () { return {}; }); if (!r.ok) { var e = new Error(j.error || r.status); e.status = r.status; e.code = j.error; throw e; } return j;
  }
  var unitNo = function (u) { return +u.id.slice(1); };
  function open(u) { var n = unitNo(u); return S.staff || n <= S.free || (S.level !== 'none' && n <= S.signedFree) || S.level === 'member'; }
  function done(lid) { return !!(S.progress && S.progress.done[lid]); }
  function unitDone(u) { return u.videos.every(function (v) { return done(v.id); }); }
  function pct() { var n = 0, d = 0; C.units.forEach(function (u) { u.videos.forEach(function (v) { n++; if (done(v.id)) d++; }); }); return n ? Math.round(d / n * 100) : 0; }
  var signin = '/me/#/login?next=' + encodeURIComponent(location.pathname);
  var ASK = 'https://t.me/abliem?text=' + encodeURIComponent('Hello! I would like access to the IF ' + C.title + '.');

  function lockBox(u) {
    var n = unitNo(u);
    if (S.level === 'none' && n <= S.signedFree) return '<div class="lock"><span class="big">🔓</span><div style="flex:1"><b>Unit ' + n + ' is free with an account</b><div class="mini">Sign in or create a free IF Academy account to watch it and save your progress.</div></div><a class="btn" href="' + signin + '">Sign in · Create account</a></div>';
    return '<div class="lock"><span class="big">🔒</span><div style="flex:1"><b>Units ' + (S.signedFree + 1) + '–' + C.units.length + ' are for IF Academy students and members</b><div class="mini">IF Academy students get the whole course included. Online learners can join with IF Membership.</div></div>' + (S.level === 'none' ? '<a class="btn ghost" href="' + signin + '">Sign in</a>' : '') + '<a class="btn gold" href="' + ASK + '" target="_blank" rel="noopener">Ask about access</a></div>';
  }
  function render() {
    var u = C.units.filter(function (x) { return x.id === cur.unit; })[0] || C.units[0], ok = open(u);
    var v = u.videos.filter(function (x) { return x.id === cur.video; })[0] || u.videos.filter(function (x) { return !done(x.id); })[0] || u.videos[0]; cur.video = v.id;
    var h = '<section class="hero"><div class="in"><div class="eyebrow">IF Academy · Video course</div><h1>' + esc(C.title) + '</h1><p>' + esc(C.blurb) + '</p><div class="facts"><span>🎯 ' + esc(C.level) + '</span><span>🎬 ' + C.units.length + ' units · ' + C.units.reduce(function (a, x) { return a + x.videos.length; }, 0) + ' video lessons</span><span>⏱ ' + esc(C.hours) + '</span><span>✅ Unit 1 free</span></div>' +
      (S.progress ? '<div class="bar"><i style="width:' + pct() + '%"></i></div><div class="mini" style="color:#C9D5E6;margin-top:6px">' + pct() + '% complete</div>' : '<a class="btn gold" href="#u1">▶ Start Unit 1 — free</a>') + '</div></section>';
    h += '<div class="grid"><aside class="side">' + C.units.map(function (x) {
      var n = unitNo(x), on = x.id === u.id, d = S.progress && unitDone(x);
      return '<a class="u' + (on ? ' on' : '') + '" href="#' + x.id + '"><span class="n' + (d ? ' done' : '') + '">' + (d ? '✓' : open(x) ? n : '🔒') + '</span><span><b>' + esc(x.title) + '</b><small>' + esc(x.skill) + ' · ' + x.videos.length + ' videos' + (n <= S.free ? ' · free' : '') + '</small></span></a>';
    }).join('') + (S.staff ? '<a class="u" href="#teacher"><span class="n">🧑‍🏫</span><span><b>Teacher tools</b><small>Videos and homework inbox</small></span></a>' : '') + '</aside><div class="main">';
    h += '<div class="card unit-h"><div class="eyebrow">Unit ' + unitNo(u) + ' · ' + esc(u.skill) + '</div><h2>' + esc(u.title) + '</h2><p><b>By the end:</b> ' + esc(u.outcome) + '</p></div>';
    h += '<div class="card">';
    var yt = S.videos[v.id];
    if (!ok) h += '<div class="player"><div class="soon lockv"><h3>🔒 ' + esc(v.title) + '</h3><p>' + (S.level === 'none' && unitNo(u) <= S.signedFree ? 'Free with an account.' : 'For IF Academy students and members.') + '</p></div></div>';
    else if (yt) h += '<div class="player' + (/^s:/.test(yt) ? ' tall' : '') + '"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(yt.replace(/^s:/, '')) + '?rel=0&modestbranding=1" title="' + esc(v.title) + '" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    else h += '<div class="player"><div class="soon"><h3>🎬 ' + esc(v.title) + '</h3><p>' + (v.pdf ? 'The video is being recorded. Study the presentation below in the meantime.' : 'This video is coming soon.') + '</p>' + (v.pdf ? '<a class="btn gold" href="' + v.pdf + '" target="_blank" rel="noopener">📄 Open the presentation</a>' : '') + '</div></div>';
    h += '<ul class="vlist">' + u.videos.map(function (x, i) {
      return '<li data-v="' + x.id + '" class="' + (x.id === v.id ? 'on' : '') + '"><span class="ic' + (done(x.id) ? ' done' : '') + '">' + (done(x.id) ? '✓' : (i + 1)) + '</span><span class="t"><b>' + esc(x.title) + '</b><small>' + x.min + ' min' + (S.videos[x.id] ? ' · video' : x.pdf ? ' · presentation' : ' · coming soon') + '</small></span>' +
        (ok && S.progress ? '<button class="btn sm ' + (done(x.id) ? 'ghost' : '') + '" data-done="' + x.id + '">' + (done(x.id) ? 'Done ✓' : 'Mark as done') + '</button>' : '') + '</li>';
    }).join('') + '</ul>' + (!ok ? '<div style="margin-top:14px">' + lockBox(u) + '</div>' : '') + '</div>';
    if (ok) {
      var T = [['files', '📄 Presentations'], ['practice', '🧩 Practice'], ['hw', '✍️ Homework'], ['project', '🛠 Project'], ['quiz', '✅ Quiz']];
      h += '<div class="card"><div class="tabs">' + T.map(function (t) { return '<button data-tab="' + t[0] + '" class="' + (cur.tab === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div><div id="tab">' + tab(u) + '</div></div>';
    }
    app.innerHTML = h + '</div></div>';
    wire(u);
  }
  function tab(u) {
    if (cur.tab === 'files') {
      var f = u.videos.filter(function (x) { return x.pdf; });
      return f.length ? '<div class="files">' + f.map(function (x) { return '<a class="file" href="' + x.pdf + '" target="_blank" rel="noopener"><span class="fi">📄</span><span><b>' + esc(x.title) + '</b><small>Presentation · PDF</small></span></a>' + (S.staff && x.deck ? '<a class="file" href="' + x.deck + '" download><span class="fi">🎞</span><span><b>' + esc(x.title) + '</b><small>Video deck with script · PPTX (teachers)</small></span></a>' : ''); }).join('') + '</div>' : '<p class="mini">The presentations for this unit arrive with its videos.</p>';
    }
    if (cur.tab === 'practice') return '<p>Practise everything from this unit — vocabulary, grammar and exam tasks with instant marking — in the IF App.</p><a class="btn" href="' + C.practice + '">🧩 Open the Unit ' + unitNo(u) + ' practice</a>';
    if (cur.tab === 'project') return '<h3 style="font-size:20px;margin-bottom:6px">' + esc(u.project.title) + '</h3><p>' + esc(u.project.task) + '</p>';
    if (cur.tab === 'quiz') return '<div id="quiz">' + u.quiz.map(function (q, i) { return '<div class="q"><b>' + (i + 1) + '. ' + esc(q[0]) + '</b><div class="o">' + q[1].map(function (o, k) { return '<button data-q="' + i + '" data-k="' + k + '">' + esc(o) + '</button>'; }).join('') + '</div></div>'; }).join('') + '</div><div id="qres" class="mini"></div>';
    // homework
    var hw = u.homework, sub = S.subs[u.id];
    var h = '<h3 style="font-size:20px;margin-bottom:6px">' + esc(hw.title) + '</h3><p>' + esc(hw.task) + '</p>';
    if (!S.progress) return h + '<div class="lock"><span class="big">✍️</span><div style="flex:1"><b>Sign in to send your homework to a teacher</b></div><a class="btn" href="' + signin + '">Sign in</a></div>';
    var draft = ''; try { draft = localStorage.getItem('course.hw.' + C.id + '.' + u.id) || ''; } catch (e) {}
    h += '<textarea id="hwt" placeholder="Write your answer here…">' + esc(draft) + '</textarea><div class="wc" id="wc"></div><button class="btn" id="hws">Send to my teacher</button>';
    if (sub) h += '<p class="mini" style="margin-top:10px">Sent ' + new Date(sub.at).toLocaleDateString() + ' · ' + sub.words + ' words' + (sub.feedback ? '' : ' · waiting for your teacher') + '</p>' + (sub.feedback ? '<div class="fb"><b>Feedback from ' + esc(sub.by || 'your teacher') + ':</b>\n' + esc(sub.feedback) + '</div>' : '');
    return h;
  }
  function wire(u) {
    document.querySelectorAll('.vlist li').forEach(function (li) { li.onclick = function (e) { if (e.target.closest('[data-done]')) return; cur.video = li.dataset.v; render(); window.scrollTo({ top: $('.player').getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' }); }; });
    document.querySelectorAll('[data-done]').forEach(function (b) { b.onclick = async function () { var id = b.dataset.done; try { S.progress = await api('progress', { lesson: id, done: !done(id) }); render(); } catch (e) { toast('Could not save. Check the connection.'); } }; });
    document.querySelectorAll('[data-tab]').forEach(function (b) { b.onclick = function () { cur.tab = b.dataset.tab; $('#tab').innerHTML = tab(u); document.querySelectorAll('[data-tab]').forEach(function (x) { x.classList.toggle('on', x === b); }); wireTab(u); }; });
    wireTab(u);
  }
  function wireTab(u) {
    var t = $('#hwt');
    if (t) {
      var wc = function () { var n = (t.value.match(/\S+/g) || []).length; $('#wc').textContent = n + ' words' + (u.homework.min ? ' · aim for at least ' + u.homework.min : ''); try { localStorage.setItem('course.hw.' + C.id + '.' + u.id, t.value); } catch (e) {} };
      t.oninput = wc; wc();
      $('#hws').onclick = async function () { this.disabled = true; try { await api('submit', { unit: u.id, text: t.value }); toast('Sent to your teacher ✓'); await load(); render(); } catch (e) { this.disabled = false; toast(e.code === 'short' ? 'Write a little more first.' : 'Could not send. Try again.'); } };
    }
    var qz = $('#quiz');
    if (qz) {
      var right = 0, answered = 0;
      qz.querySelectorAll('button').forEach(function (b) { b.onclick = function () {
        var q = u.quiz[+b.dataset.q], row = b.parentNode; if (row.dataset.done) return; row.dataset.done = 1; answered++;
        if (+b.dataset.k === q[2]) { b.classList.add('ok'); right++; } else { b.classList.add('no'); row.children[q[2]].classList.add('ok'); }
        if (answered === u.quiz.length) { $('#qres').innerHTML = '<b>' + right + ' / ' + u.quiz.length + '</b> ' + (right === u.quiz.length ? '— perfect! 🎉' : right >= u.quiz.length - 1 ? '— great work.' : '— watch the videos again and retry.'); if (S.progress) api('progress', { unit: u.id, quiz: right }).catch(function () {}); }
      }; });
    }
  }
  /* ---- teacher tools: YouTube link per lesson, homework inbox ---- */
  async function teacher() {
    var h = '<section class="hero"><div class="in"><div class="eyebrow">Teacher tools</div><h1>' + esc(C.title) + '</h1><p>Paste each lesson\'s YouTube link (upload as <b>Unlisted</b>, so only the course shows it). Students\' homework arrives below.</p><a class="btn ghost" href="#u1">← Back to the course</a></div></section><div class="grid" style="grid-template-columns:1fr"><div class="main">';
    h += '<div class="card"><h2 style="font-size:22px;margin-bottom:12px">🎬 Videos</h2><table class="tt"><tr><th>Lesson</th><th>YouTube link</th><th></th></tr>' + C.units.map(function (u) { return u.videos.map(function (v) { return '<tr><td><b>' + v.id.toUpperCase() + '</b> ' + esc(v.title) + (v.deck ? ' · <a href="' + v.deck + '" download>deck</a>' : '') + '</td><td><input class="inp" data-yt="' + v.id + '" placeholder="https://youtu.be/… or a Shorts link" value="' + (S.videos[v.id] ? (/^s:/.test(S.videos[v.id]) ? 'https://youtube.com/shorts/' + S.videos[v.id].slice(2) : 'https://youtu.be/' + S.videos[v.id]) : '') + '"></td><td><button class="btn sm" data-save="' + v.id + '">Save</button></td></tr>'; }).join(''); }).join('') + '</table></div>';
    h += '<div class="card"><h2 style="font-size:22px;margin-bottom:12px">✍️ Homework inbox</h2><div id="inbox" class="mini">Loading…</div></div></div></div>';
    app.innerHTML = h;
    document.querySelectorAll('[data-save]').forEach(function (b) { b.onclick = async function () { var id = b.dataset.save, inp = document.querySelector('[data-yt="' + id + '"]'); try { var r = await api('video', { lesson: id, url: inp.value }); if (r.id) S.videos[id] = r.id; else delete S.videos[id]; toast(r.id ? 'Saved ✓' : 'Removed'); } catch (e) { toast('Could not save.'); } }; });
    try {
      var subs = (await api('subs')).subs;
      $('#inbox').innerHTML = subs.length ? '<table class="tt"><tr><th>Student</th><th>Unit</th><th>Sent</th><th>Words</th><th></th></tr>' + subs.map(function (s, i) { return '<tr><td>' + esc(s.name) + '</td><td>' + s.unit.slice(1) + '</td><td>' + new Date(s.at).toLocaleDateString() + '</td><td>' + s.words + '</td><td><button class="btn sm ' + (s.done ? 'ghost' : '') + '" data-open="' + i + '">' + (s.done ? 'Answered ✓' : 'Read & answer') + '</button></td></tr><tr id="r' + i + '" hidden><td colspan="5"></td></tr>'; }).join('') + '</table>' : 'No homework yet.';
      document.querySelectorAll('[data-open]').forEach(function (b) { b.onclick = async function () {
        var s = subs[+b.dataset.open], row = $('#r' + b.dataset.open), td = row.firstChild; row.hidden = !row.hidden; if (row.hidden) return;
        var d = await api('sub/' + s.uid + ':' + s.unit);
        td.innerHTML = '<div class="fb" style="background:#fff;border-color:var(--line)">' + esc(d.text) + '</div><textarea style="min-height:120px;margin-top:10px" placeholder="Your feedback: band estimate, what is good, what to fix…">' + esc(d.feedback || '') + '</textarea><button class="btn sm" style="margin-top:8px">Send feedback</button>';
        td.querySelector('button').onclick = async function () { try { await api('feedback', { uid: s.uid, unit: s.unit, feedback: td.querySelector('textarea').value }); toast('Sent ✓ — the student is notified'); b.textContent = 'Answered ✓'; b.classList.add('ghost'); } catch (e) { toast('Could not send.'); } };
      }; });
    } catch (e) { $('#inbox').textContent = 'Could not load.'; }
  }
  async function load() { try { var r = await api(''); S = Object.assign(S, r); } catch (e) {} }
  function route() {
    var h = location.hash.slice(1);
    if (h === 'teacher' && S.staff) return teacher();
    var m = h.match(/^(u\d+)(?:-(\d+))?$/); if (m) { cur.unit = m[1]; cur.video = m[2] ? m[1] + '-' + m[2] : null; }
    render(); window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  (async function () {
    await load();
    who.innerHTML = S.level === 'none' ? '<a href="' + signin + '">Sign in</a>' : '<span>' + esc(S.name || 'Signed in') + '</span><a href="/me/">My account</a>';
    if (!location.hash) { var next = C.units.filter(function (u) { return open(u) && !unitDone(u); })[0]; if (next && S.progress) cur.unit = next.id; }
    route();
  })();
})();
