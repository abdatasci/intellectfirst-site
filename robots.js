/* IF Academy presenters: two humanoid androids who "speak" the listening parts.
   NOVA (woman's voice) and ATLAS (man's voice). They are drawn in SVG (sharp on every screen, no video files),
   blink, breathe, and move their mouth light and chest core while the voice is playing — the real ElevenLabs
   voice from /voice.js, or the browser's voice as a fallback (both report speechSynthesis.speaking).
   Use: el.innerHTML = IFBots.html('f', 'Nova') · IFBots.talk(el or null) marks who is speaking now. */
(function () {
  if (window.IFBots) return;
  var uid = 0;
  var PAL = {
    f: { a: '#c084fc', b: '#22d3ee', skin1: '#f4f7fb', skin2: '#c9d3e1', trim: '#7c3aed', name: 'NOVA' },
    m: { a: '#38bdf8', b: '#fbbf24', skin1: '#eef2f7', skin2: '#aebccd', trim: '#0e7490', name: 'ATLAS' }
  };
  function svg(g) {
    var p = PAL[g === 'm' ? 'm' : 'f'], i = ++uid, f = g !== 'm';
    var id = function (s) { return s + i; };
    return '<svg class="ifbot-svg" viewBox="0 0 200 230" role="img" aria-label="' + p.name + ', the IF presenter">' +
      '<defs>' +
        '<linearGradient id="' + id('sk') + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + p.skin1 + '"/><stop offset="1" stop-color="' + p.skin2 + '"/></linearGradient>' +
        '<linearGradient id="' + id('vi') + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1226"/><stop offset="1" stop-color="#1b2550"/></linearGradient>' +
        '<radialGradient id="' + id('gl') + '"><stop offset="0" stop-color="' + p.a + '" stop-opacity=".55"/><stop offset="1" stop-color="' + p.a + '" stop-opacity="0"/></radialGradient>' +
        '<filter id="' + id('bl') + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>' +
      '</defs>' +
      '<ellipse class="halo" cx="100" cy="95" rx="92" ry="92" fill="url(#' + id('gl') + ')"/>' +
      '<g class="ring" fill="none" stroke="' + p.b + '" stroke-opacity=".35"><circle cx="100" cy="92" r="84" stroke-dasharray="3 9"/><circle cx="100" cy="92" r="74" stroke-dasharray="40 14 4 14" stroke-opacity=".5"/></g>' +
      '<g class="body">' +
        // shoulders and chest
        '<path d="M28 230c4-38 26-56 72-58 46 2 68 20 72 58z" fill="url(#' + id('sk') + ')"/>' +
        '<path d="M52 230c3-26 18-40 48-41 30 1 45 15 48 41" fill="none" stroke="' + p.trim + '" stroke-opacity=".35" stroke-width="2"/>' +
        '<path d="M40 196c14-8 30-12 60-12s46 4 60 12" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/>' +
        '<circle class="core" cx="100" cy="206" r="9" fill="' + p.a + '"/><circle class="core" cx="100" cy="206" r="9" fill="' + p.a + '" filter="url(#' + id('bl') + ')"/>' +
        '<circle cx="100" cy="206" r="4" fill="#fff" fill-opacity=".9"/>' +
        // neck
        '<rect x="86" y="146" width="28" height="30" rx="6" fill="' + p.skin2 + '"/>' +
        '<path d="M86 156h28M86 164h28" stroke="#7b8aa0" stroke-opacity=".6"/>' +
        '<g class="head">' +
          (f ? '<path d="M44 92c0-52 30-76 58-76 30 0 56 22 56 70 0 18-4 36-10 46 6-30 2-60-16-74-24 6-52 4-74-6-10 12-12 26-14 40z" fill="' + p.trim + '" fill-opacity=".85"/>' : '') +
          '<path d="M56 86c0-40 20-62 44-62s44 22 44 62c0 34-18 64-44 64S56 120 56 86z" fill="url(#' + id('sk') + ')"/>' +
          (f ? '<path d="M56 82c6-36 26-54 50-54 18 0 34 10 40 30-22-6-46-4-70 10-8 4-14 8-20 14z" fill="' + p.trim + '"/>'
             : '<path d="M60 70c6-28 22-44 40-44s34 16 40 44c-12-10-26-14-40-14s-28 4-40 14z" fill="#d7dee8"/><path d="M100 26v30" stroke="#9fb0c4"/>') +
          // ears: light rings
          '<circle cx="56" cy="92" r="8" fill="' + p.skin2 + '"/><circle class="ear" cx="56" cy="92" r="4" fill="' + p.b + '"/>' +
          '<circle cx="144" cy="92" r="8" fill="' + p.skin2 + '"/><circle class="ear" cx="144" cy="92" r="4" fill="' + p.b + '"/>' +
          // visor with eyes
          '<rect x="66" y="80" width="68" height="26" rx="13" fill="url(#' + id('vi') + ')"/>' +
          '<g class="eyes"><ellipse class="eye" cx="84" cy="93" rx="7" ry="5" fill="' + p.b + '"/><ellipse class="eye" cx="116" cy="93" rx="7" ry="5" fill="' + p.b + '"/>' +
          '<ellipse cx="84" cy="93" rx="7" ry="5" fill="' + p.b + '" filter="url(#' + id('bl') + ')"/><ellipse cx="116" cy="93" rx="7" ry="5" fill="' + p.b + '" filter="url(#' + id('bl') + ')"/>' +
          '<circle cx="86" cy="91.5" r="1.6" fill="#fff"/><circle cx="118" cy="91.5" r="1.6" fill="#fff"/></g>' +
          '<rect class="lid" x="66" y="80" width="68" height="0" rx="6" fill="' + p.skin2 + '"/>' +
          // face seams and mouth light
          '<path d="M100 108v8M78 116c6 4 14 6 22 6s16-2 22-6" fill="none" stroke="#9fb0c4" stroke-opacity=".7"/>' +
          '<g class="mouth"><rect class="m0" x="86" y="128" width="28" height="3" rx="1.5" fill="' + p.a + '"/></g>' +
          '<path d="M66 70c8-6 18-9 26-9" stroke="#fff" stroke-opacity=".8" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '</g>' +
      '</g></svg>';
  }
  var CSS = '.ifbot{display:inline-flex;flex-direction:column;align-items:center;gap:6px;position:relative;transition:transform .35s,opacity .35s,filter .35s}' +
    '.ifbot .ifbot-svg{width:100%;height:auto;display:block;overflow:visible}' +
    '.ifbot .body{animation:ifbB 4.2s ease-in-out infinite;transform-origin:100px 220px}' +
    '.ifbot .ring{animation:ifbR 18s linear infinite;transform-origin:100px 92px}' +
    '.ifbot .halo{opacity:.35;transition:opacity .4s}.ifbot.on .halo{opacity:1}' +
    '.ifbot .core{transition:opacity .2s}.ifbot .ear{opacity:.5}.ifbot.on .ear{opacity:1;animation:ifbE .9s ease-in-out infinite}' +
    '.ifbot .head{transform-origin:100px 140px;transition:transform .6s}.ifbot.on .head{animation:ifbH 2.6s ease-in-out infinite}' +
    '.ifbot .lid{transition:height .08s}.ifbot.blink .lid{height:26px}' +
    '.ifbot .tag{font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.22em;color:#94a3b8;padding:4px 10px;border:1px solid rgba(148,163,184,.35);border-radius:999px;background:rgba(15,23,42,.35)}' +
    '.ifbot.on .tag{color:#fff;border-color:currentColor;background:rgba(124,58,237,.35)}' +
    '.ifbots{display:flex;justify-content:center;gap:clamp(8px,4vw,40px);align-items:flex-end}.ifbots .ifbot{width:clamp(110px,28vw,170px)}' +
    '.ifbots.talking .ifbot:not(.on){opacity:.6;filter:saturate(.6);transform:scale(.94)}' +
    '@keyframes ifbB{50%{transform:translateY(-3px)}}@keyframes ifbR{to{transform:rotate(360deg)}}@keyframes ifbE{50%{opacity:.4}}' +
    '@keyframes ifbH{0%,100%{transform:rotate(0)}30%{transform:rotate(-2deg)}70%{transform:rotate(1.6deg)}}' +
    '@media (prefers-reduced-motion:reduce){.ifbot .body,.ifbot .ring,.ifbot.on .head,.ifbot.on .ear{animation:none}}';
  var st = document.createElement('style'); st.textContent = CSS; (document.head || document.documentElement).appendChild(st);

  var active = null, t = 0;
  function frame() {
    t += 1;
    var speaking = false; try { speaking = window.speechSynthesis && speechSynthesis.speaking; } catch (e) {}
    var bots = document.querySelectorAll('.ifbot');
    for (var k = 0; k < bots.length; k++) {
      var b = bots[k], on = speaking && (active ? active === b : b.dataset.solo === '1');
      b.classList.toggle('on', on);
      var m = b.querySelector('.m0'), core = b.querySelectorAll('.core');
      // mouth light: a lively, speech-like rhythm while talking; a calm line when not
      var lv = on ? Math.max(0.12, Math.abs(Math.sin(t * 0.55 + k) * 0.6 + Math.sin(t * 1.37) * 0.35 + (Math.random() - .5) * .5)) : 0.05;
      if (m) { var h = 3 + lv * 12, w = 22 + lv * 10; m.setAttribute('height', h.toFixed(1)); m.setAttribute('y', (129.5 - h / 2).toFixed(1)); m.setAttribute('width', w.toFixed(1)); m.setAttribute('x', (100 - w / 2).toFixed(1)); }
      for (var c = 0; c < core.length; c++) core[c].style.opacity = on ? (0.55 + lv * 0.45).toFixed(2) : '.45';
      if (Math.random() < 0.006) { b.classList.add('blink'); (function (x) { setTimeout(function () { x.classList.remove('blink'); }, 130); })(b); }
    }
    var groups = document.querySelectorAll('.ifbots'); for (var g = 0; g < groups.length; g++) groups[g].classList.toggle('talking', speaking);
    setTimeout(function () { requestAnimationFrame(frame); }, 70);
  }
  requestAnimationFrame(frame);

  window.IFBots = {
    /** One presenter. g = 'f' (Nova) or 'm' (Atlas); label = the name shown under it (e.g. the speaker in a dialogue). */
    html: function (g, label, solo) { return '<div class="ifbot" data-g="' + (g === 'm' ? 'm' : 'f') + '"' + (solo ? ' data-solo="1"' : '') + ' data-s="' + String(label || '').replace(/"/g, '') + '">' + svg(g) + '<span class="tag">' + String(label || PAL[g === 'm' ? 'm' : 'f'].name).replace(/</g, '&lt;').toUpperCase() + '</span></div>'; },
    /** Mark who is speaking (an .ifbot element, or null for "whoever is alone on screen"). */
    talk: function (el) { active = el || null; }
  };
})();
