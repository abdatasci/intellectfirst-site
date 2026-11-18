/* IF Academy study report: draws one student's activity in the IF App (from /api/school … activity summary).
   Used on the staff's student page (/me/#/student/<id>) and on the parents' page (/report/). English and Russian. */
(function () {
  var T = {
    en: { last: 'Last active', never: 'Not yet', today: 'Today', yesterday: 'Yesterday', week: 'This week', mins: 'min', days: 'days', onDays: 'on {n} of 7 days', done: 'Finished this week', items: 'lessons and games', streak: 'Streak', xp: 'XP in total',
      chart: 'Minutes a day, last 4 weeks', hours: 'Time of day', usual: 'Most study happens around {h}.', noTime: 'No study time recorded yet.', kinds: 'What they did (4 weeks)', courses: 'Progress by course', course: 'Course', lessons: 'Lessons', avg: 'Average', lastDone: 'Last',
      recent: 'Latest activity', none: 'Nothing recorded yet. Activity is recorded whenever the student is signed in to the IF App.', since: 'Recorded since {d}.',
      k: { vocab: 'Vocabulary', grammar: 'Grammar', reading: 'Reading', listening: 'Listening', article: 'Daily article', game: 'Games', test: 'Tests', lesson: 'Lessons', speaking: 'Speaking', writing: 'Writing', other: 'Other' } },
    ru: { last: 'Последняя активность', never: 'Пока нет', today: 'Сегодня', yesterday: 'Вчера', week: 'За неделю', mins: 'мин', days: 'дн.', onDays: 'в {n} из 7 дней', done: 'Выполнено за неделю', items: 'уроков и игр', streak: 'Дней подряд', xp: 'Всего XP',
      chart: 'Минут в день, последние 4 недели', hours: 'Время дня', usual: 'Чаще всего занимается около {h}.', noTime: 'Время занятий пока не записано.', kinds: 'Чем занимался (4 недели)', courses: 'Прогресс по курсам', course: 'Курс', lessons: 'Уроки', avg: 'Средний балл', lastDone: 'Последний',
      recent: 'Последние занятия', none: 'Пока ничего не записано. Активность записывается, когда ученик вошёл в IF App под своим аккаунтом.', since: 'Записывается с {d}.',
      k: { vocab: 'Слова', grammar: 'Грамматика', reading: 'Чтение', listening: 'Аудирование', article: 'Статья дня', game: 'Игры', test: 'Тесты', lesson: 'Уроки', speaking: 'Говорение', writing: 'Письмо', other: 'Другое' } }
  };
  var ICON = { vocab: '🔤', grammar: '🧩', reading: '📖', listening: '🎧', article: '📰', game: '🎮', test: '📝', lesson: '📘', speaking: '🗣️', writing: '✍️', other: '•' };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var LV = { a0: 'Beginner', a1: 'A1', a2: 'A2', b1: 'B1', b2: 'B2', c1: 'C1', c2: 'C2' };
  function courseName(id) {
    var m = /^(ge|be|art|ef|teens)-([a-c][0-2])/.exec(id), n = { ge: 'General English', be: 'Business English', art: 'Daily articles', ef: 'English File', teens: 'English for Teenagers' };
    if (m) return n[m[1]] + ' ' + LV[m[2]];
    if (/^ielts/.test(id)) return 'IELTS'; if (/^starters|^yl/.test(id)) return 'Young Learners'; if (/^maths/.test(id)) return 'Maths in English';
    return id.replace(/[-_]/g, ' ').replace(/^./, function (c) { return c.toUpperCase(); });
  }
  function css() {
    if (document.getElementById('av-css')) return;
    var s = document.createElement('style'); s.id = 'av-css';
    s.textContent = '.av{--av-navy:#0f2342;--av-oak:#b8895a;--av-soft:#5b6472;--av-line:rgba(18,26,38,.12)}' +
      '.av-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:0 0 16px}.av-kpi{border:1px solid var(--av-line);border-radius:14px;padding:12px 14px;background:#fff}' +
      '.av-kpi b{display:block;font-size:24px;line-height:1.1;color:var(--av-navy)}.av-kpi span{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--av-soft)}.av-kpi small{display:block;color:var(--av-soft);font-size:12.5px;margin-top:2px}' +
      '.av h4{font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--av-soft);margin:18px 0 8px}.av svg{display:block;width:100%;height:auto}' +
      '.av-tags{display:flex;flex-wrap:wrap;gap:8px}.av-tag{border:1px solid var(--av-line);border-radius:99px;padding:6px 12px;font-size:14px;background:#fff}.av-tag b{color:var(--av-navy)}' +
      '.av table{width:100%;border-collapse:collapse;font-size:14.5px}.av td,.av th{padding:7px 6px;border-bottom:1px solid var(--av-line);text-align:left}.av th{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--av-soft);font-weight:600}.av td.n,.av th.n{text-align:right;white-space:nowrap}' +
      '.av-list{list-style:none;margin:0;padding:0}.av-list li{display:flex;gap:10px;align-items:baseline;padding:7px 0;border-bottom:1px solid var(--av-line);font-size:14.5px}.av-list .w{flex:none;width:92px;color:var(--av-soft);font-size:12.5px}.av-list .t{flex:1;min-width:0}.av-list .r{flex:none;color:var(--av-soft);font-size:13px;white-space:nowrap}' +
      '.av-note{color:var(--av-soft);font-size:13px;margin:12px 0 0}';
    document.head.appendChild(s);
  }
  function html(a, lang) {
    css(); var L = T[lang] || T.en, loc = lang === 'ru' ? 'ru-RU' : 'en-GB';
    if (!a || (!a.since && !a.courses.length && !a.xp)) return '<div class="av"><p class="av-note">' + L.none + '</p></div>';
    var dfmt = function (iso, o) { return new Date(iso + 'T00:00:00Z').toLocaleDateString(loc, o || { day: 'numeric', month: 'short', timeZone: 'UTC' }); };
    var todayIso = a.days[a.days.length - 1].date, yIso = a.days[a.days.length - 2].date;
    var last = !a.last ? L.never : a.last === todayIso ? L.today : a.last === yIso ? L.yesterday : dfmt(a.last);
    var h = '<div class="av"><div class="av-kpis">' +
      '<div class="av-kpi"><span>' + L.last + '</span><b>' + esc(last) + '</b></div>' +
      '<div class="av-kpi"><span>' + L.week + '</span><b>' + a.week.mins + ' ' + L.mins + '</b><small>' + L.onDays.replace('{n}', a.week.days) + '</small></div>' +
      '<div class="av-kpi"><span>' + L.done + '</span><b>' + a.week.items + '</b><small>' + L.items + '</small></div>' +
      '<div class="av-kpi"><span>' + L.streak + '</span><b>' + a.streak + '</b><small>' + L.days + '</small></div>' +
      '<div class="av-kpi"><span>' + L.xp + '</span><b>' + a.xp + '</b></div></div>';
    // minutes a day: 28 bars, weeks separated, today in oak
    var max = Math.max(30, Math.max.apply(null, a.days.map(function (d) { return d.mins; }))), W = 700, H = 150, bw = W / 28;
    h += '<h4>' + L.chart + '</h4><svg viewBox="0 0 ' + W + ' ' + (H + 22) + '" role="img" aria-label="' + L.chart + '"><line x1="0" y1="' + H + '" x2="' + W + '" y2="' + H + '" stroke="#c9cdd4"/>' +
      '<text x="0" y="11" font-size="11" fill="#5b6472">' + max + ' ' + L.mins + '</text>' +
      a.days.map(function (d, i) {
        var bh = d.mins ? Math.max(3, Math.round(d.mins / max * (H - 18))) : 0, x = i * bw + 3, wd = new Date(d.date + 'T00:00:00Z').getUTCDay();
        return (bh ? '<rect x="' + x.toFixed(1) + '" y="' + (H - bh) + '" width="' + (bw - 6).toFixed(1) + '" height="' + bh + '" rx="3" fill="' + (i === 27 ? '#b8895a' : '#0f2342') + '"><title>' + dfmt(d.date) + ': ' + d.mins + ' ' + L.mins + '</title></rect>' : '<rect x="' + x.toFixed(1) + '" y="' + (H - 2) + '" width="' + (bw - 6).toFixed(1) + '" height="2" fill="#dfe2e7"/>') +
          (i === 27 ? '<text x="' + W + '" y="' + (H + 16) + '" font-size="11" fill="#8e633a" text-anchor="end">' + L.today + '</text>' : wd === 1 && i < 25 ? '<text x="' + (x + (bw - 6) / 2).toFixed(1) + '" y="' + (H + 16) + '" font-size="11" fill="#5b6472" text-anchor="middle">' + dfmt(d.date) + '</text>' : '');
      }).join('') + '</svg>';
    // time of day
    var hm = Math.max.apply(null, a.hours), peak = a.hours.indexOf(hm);
    h += '<h4>' + L.hours + '</h4>' + (hm ? '<svg viewBox="0 0 700 64" role="img" aria-label="' + L.hours + '">' + a.hours.map(function (m, i) { var bh = m ? Math.max(2, Math.round(m / hm * 40)) : 1; return '<rect x="' + (i * 29 + 3) + '" y="' + (42 - bh) + '" width="23" height="' + bh + '" rx="2" fill="' + (m ? '#0f2342' : '#dfe2e7') + '"><title>' + i + ':00 · ' + m + ' ' + L.mins + '</title></rect>' + (i % 3 === 0 ? '<text x="' + (i * 29 + 14) + '" y="58" font-size="11" fill="#5b6472" text-anchor="middle">' + i + ':00</text>' : ''); }).join('') + '</svg><p class="av-note" style="margin-top:4px">' + L.usual.replace('{h}', peak + ':00') + '</p>' : '<p class="av-note">' + L.noTime + '</p>');
    var ks = Object.keys(a.kinds || {}).sort(function (x, y) { return a.kinds[y].n - a.kinds[x].n; });
    if (ks.length) h += '<h4>' + L.kinds + '</h4><div class="av-tags">' + ks.map(function (k) { var v = a.kinds[k], m = Math.round(v.secs / 60); return '<span class="av-tag">' + (ICON[k] || '•') + ' ' + esc(L.k[k] || k) + ' <b>' + v.n + '</b>' + (m ? ' · ' + m + ' ' + L.mins : '') + '</span>'; }).join('') + '</div>';
    if (a.courses.length) h += '<h4>' + L.courses + '</h4><table><tr><th>' + L.course + '</th><th class="n">' + L.lessons + '</th><th class="n">' + L.avg + '</th><th class="n">' + L.lastDone + '</th></tr>' +
      a.courses.slice(0, 12).map(function (c) { return '<tr><td>' + esc(courseName(c.id)) + '</td><td class="n">' + c.lessons + '</td><td class="n">' + c.avg + '%</td><td class="n">' + (c.last ? dfmt(c.last) : '–') + '</td></tr>'; }).join('') + '</table>';
    if (a.recent.length) h += '<h4>' + L.recent + '</h4><ul class="av-list">' + a.recent.slice(0, 20).map(function (e) {
      return '<li><span class="w">' + dfmt(e.date) + ' ' + esc(e.a) + '</span><span class="t">' + (ICON[e.k] || '•') + ' ' + esc(e.t || L.k[e.k] || e.k) + '</span><span class="r">' + (e.sc != null ? e.sc + '%' : '') + (e.d ? (e.sc != null ? ' · ' : '') + Math.max(1, Math.round(e.d / 60)) + ' ' + L.mins : '') + '</span></li>';
    }).join('') + '</ul>';
    return h + (a.since ? '<p class="av-note">' + L.since.replace('{d}', dfmt(a.since, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })) + '</p>' : '<p class="av-note">' + L.none + '</p>') + '</div>';
  }
  window.IFActView = { html: html, courseName: courseName };
})();
