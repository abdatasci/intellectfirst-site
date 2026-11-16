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
  /* ATLAS: a humanoid android modelled on Abdoulie (IF Academy's director): dark skin, short black hair, thin round
     gold glasses, short beard, warm smile, white tee under a taupe knit blazer. Soft light accents keep him an android. */
  function atlas(p, id) {
    var skin = 'url(#' + id('ask') + ')';
    return '<svg class="ifbot-svg" viewBox="0 0 200 230" role="img" aria-label="ATLAS, the IF presenter">' +
      '<defs>' +
        '<linearGradient id="' + id('ask') + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7b4a2c"/><stop offset=".55" stop-color="#5e3620"/><stop offset="1" stop-color="#432414"/></linearGradient>' +
        '<linearGradient id="' + id('abl') + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbb7aa"/><stop offset="1" stop-color="#a58e80"/></linearGradient>' +
        '<pattern id="' + id('akn') + '" width="4" height="6" patternUnits="userSpaceOnUse"><rect width="4" height="6" fill="url(#' + id('abl') + ')"/><path d="M1 0v6" stroke="#8d7668" stroke-opacity=".35" stroke-width=".8"/></pattern>' +
        '<radialGradient id="' + id('gl') + '"><stop offset="0" stop-color="' + p.a + '" stop-opacity=".5"/><stop offset="1" stop-color="' + p.a + '" stop-opacity="0"/></radialGradient>' +
        '<filter id="' + id('bl') + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>' +
      '</defs>' +
      '<ellipse class="halo" cx="100" cy="95" rx="92" ry="92" fill="url(#' + id('gl') + ')"/>' +
      '<g class="ring" fill="none" stroke="' + p.b + '" stroke-opacity=".35"><circle cx="100" cy="92" r="84" stroke-dasharray="3 9"/><circle cx="100" cy="92" r="74" stroke-dasharray="40 14 4 14" stroke-opacity=".5"/></g>' +
      '<g class="body">' +
        // tailored taupe suit jacket (structured shoulders, notch lapels, breast pocket) over a white crew-neck tee
        '<path d="M18 230c2-30 8-44 22-52 16-8 36-10 60-10s44 2 60 10c14 8 20 22 22 52z" fill="url(#' + id('akn') + ')"/>' +
        '<path d="M40 178c-8 4-14 14-17 30M160 178c8 4 14 14 17 30" fill="none" stroke="#8d7668" stroke-opacity=".6" stroke-width="1.2"/>' +
        '<path d="M80 172c5 20 12 40 20 58 8-18 15-38 20-58-6-2-13-3-20-3s-14 1-20 3z" fill="#f7f7f5"/>' +
        '<path d="M88 170c3 5 7 7 12 7s9-2 12-7" fill="none" stroke="#dcdcd6" stroke-width="3"/>' +
        '<path d="M80 172l-16 8 9 15-9 5 28 30c-6-18-10-38-12-58z" fill="#b39d8f"/><path d="M120 172l16 8-9 15 9 5-28 30c6-18 10-38 12-58z" fill="#b39d8f"/>' +
        '<path d="M80 172l-16 8 9 15-9 5 28 30M120 172l16 8-9 15 9 5-28 30" fill="none" stroke="#7d6658" stroke-width="1.1"/>' +
        '<path d="M73 195l-9 5" stroke="#7d6658" stroke-width="1.1"/><path d="M127 195l9 5" stroke="#7d6658" stroke-width="1.1"/>' +
        '<path d="M126 208h20l-1 4h-18z" fill="#8d7668" fill-opacity=".6"/><path d="M130 208l3-5 3 5 3-4 2 4" fill="#f7f7f5"/>' +
        '<circle cx="100" cy="226" r="2.6" fill="#3b2a22"/>' +
        // lapel pin: the speaking light
        '<circle class="core" cx="66" cy="196" r="4.5" fill="' + p.a + '"/><circle class="core" cx="66" cy="196" r="4.5" fill="' + p.a + '" filter="url(#' + id('bl') + ')"/><circle cx="66" cy="196" r="1.8" fill="#fff" fill-opacity=".9"/>' +
        // neck
        '<path d="M88 138h24v38c-4 3-8 4-12 4s-8-1-12-4z" fill="' + skin + '"/><path d="M88 150c8 6 16 6 24 0" fill="none" stroke="#2c170c" stroke-opacity=".35"/>' +
        '<g class="head">' +
          // ears with a soft light inside
          '<ellipse cx="60" cy="95" rx="6.5" ry="11" fill="#5a331e"/><circle class="ear" cx="60" cy="96" r="2.2" fill="' + p.b + '"/>' +
          '<ellipse cx="140" cy="95" rx="6.5" ry="11" fill="#5a331e"/><circle class="ear" cx="140" cy="96" r="2.2" fill="' + p.b + '"/>' +
          // face
          '<path d="M62 84c0-37 17-58 38-58s38 21 38 58c0 22-4 40-12 52-7 10-16 16-26 16s-19-6-26-16c-8-12-12-30-12-52z" fill="' + skin + '"/>' +
          '<path d="M70 104c3 4 7 6 11 6M130 104c-3 4-7 6-11 6" fill="none" stroke="#8a5636" stroke-opacity=".55" stroke-width="2"/>' +
          // short black hair with a soft top
          '<path d="M62 80c-1-32 15-56 38-56s39 24 38 56c-3-10-6-17-11-22-8 2-17 3-27 3s-19-1-27-3c-5 5-8 12-11 22z" fill="#151110"/>' +
          '<path d="M66 60c10-12 22-18 34-18s24 6 34 18" fill="none" stroke="#2b2420" stroke-width="2" stroke-dasharray="1.5 3"/>' +
          // android seam on the temple
          '<path d="M138 72c3 8 3 16 1 24" fill="none" stroke="' + p.b + '" stroke-opacity=".55" stroke-width="1.2"/>' +
          // eyebrows
          '<path d="M72 80c5-4 12-5 19-3M109 77c7-2 14-1 19 3" fill="none" stroke="#141010" stroke-width="3.2" stroke-linecap="round"/>' +
          // eyes
          '<g class="eyes"><ellipse cx="84" cy="95" rx="7.5" ry="4.6" fill="#f4efe8"/><ellipse cx="116" cy="95" rx="7.5" ry="4.6" fill="#f4efe8"/>' +
          '<circle class="eye" cx="84" cy="95" r="3.6" fill="#2a160c"/><circle class="eye" cx="116" cy="95" r="3.6" fill="#2a160c"/>' +
          '<circle cx="84" cy="95" r="3.6" fill="none" stroke="' + p.b + '" stroke-opacity=".55" stroke-width=".8"/><circle cx="116" cy="95" r="3.6" fill="none" stroke="' + p.b + '" stroke-opacity=".55" stroke-width=".8"/>' +
          '<circle cx="85.3" cy="93.8" r="1.1" fill="#fff"/><circle cx="117.3" cy="93.8" r="1.1" fill="#fff"/></g>' +
          '<rect class="lid lid2" x="75" y="89" width="18" height="0" rx="4" fill="#5e3620"/><rect class="lid lid2" x="107" y="89" width="18" height="0" rx="4" fill="#5e3620"/>' +
          // thin round gold glasses (blue-light lenses)
          '<g fill="rgba(150,140,255,.13)" stroke="#d4b265" stroke-width="1.8"><circle cx="84" cy="95" r="13"/><circle cx="116" cy="95" r="13"/></g>' +
          '<path d="M97 93c2-2 4-2 6 0M71 92l-10-2M129 92l10-2" fill="none" stroke="#d4b265" stroke-width="1.6"/>' +
          '<path d="M77 88c3-2 6-2 8-1" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/>' +
          // nose
          '<path d="M100 98c-1 8-3 13-6 16 3 2 9 2 12 0-3-3-5-8-6-16z" fill="#4a2817" fill-opacity=".55"/>' +
          '<path d="M92 114c3 2 13 2 16 0" fill="none" stroke="#2c170c" stroke-opacity=".6" stroke-width="1.4"/>' +
          // his beard: a neat moustache joined to a short chin beard, fine stubble along the jaw, clear cheeks
          '<path d="M64 104c2 16 7 28 15 36 6 6 13 10 21 10s15-4 21-10c8-8 13-20 15-36" fill="none" stroke="#1a1311" stroke-opacity=".55" stroke-width="2.4"/>' +
          '<path d="M86 132c2 8 7 14 14 15 7-1 12-7 14-15-4 3-9 4-14 4s-10-1-14-4z" fill="#161110"/>' +
          '<path d="M85 122c4-3 9-4 15-3 6-1 11 0 15 3l1 5c-2-1-4-2-6-2-3 1-6 1-10 1s-7 0-10-1c-2 0-4 1-6 2z" fill="#161110"/>' +
          '<path d="M85 125c-1 3-1 6 1 8M115 125c1 3 1 6-1 8" fill="none" stroke="#161110" stroke-opacity=".75" stroke-width="1.3" stroke-linecap="round"/>' +
          // mouth (opens while speaking) and a warm smile
          '<g class="mouth"><rect class="m0" x="92" y="128" width="16" height="1" rx="1" fill="#2a1010"/></g>' +
          '<path d="M89 129c6 3.5 16 3.5 22 0" fill="#8b4a3a" stroke="#3a1c10" stroke-width="1.4" stroke-linecap="round"/>' +
          
        '</g>' +
      '</g></svg>';
  }
  function svg(g) {
    if (g === 'm') { var j = ++uid; return atlas(PAL.m, function (s) { return s + j; }); }
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
    '.ifbot .lid{transition:height .08s}.ifbot.blink .lid{height:26px}.ifbot.blink .lid2{height:12px}' +
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
