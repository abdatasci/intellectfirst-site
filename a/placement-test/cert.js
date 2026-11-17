/* IF Academy placement-test certificate: draws an A4 landscape certificate and saves it as a real PDF file
   (no print dialog, so it also works in phone browsers and inside Telegram / Instagram).
   The page is drawn on a canvas (so names in Russian or Kazakh print correctly) and wrapped in a one-page PDF.
   Director's signature: /brand/signature.png (transparent PNG). If the file is missing, the signature line is left empty. */
(function () {
  var W = 2339, H = 1654;                       // A4 landscape at 200 dpi
  var NAVY = '#0B2545', GOLD = '#B8902F', INK = '#1b2433', SOFT = '#5b6472';
  var SERIF = 'Georgia, "Times New Roman", "Noto Serif", serif', SANS = 'Helvetica, Arial, "Noto Sans", sans-serif';
  function img(src) { return new Promise(function (ok) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = src; }); }
  function fit(c, text, font, size, max) { do { c.font = font.replace('%', size); size -= 2; } while (c.measureText(text).width > max && size > 20); return size + 2; }
  function wrap(c, text, max) { var out = [], line = ''; String(text).split(/\s+/).forEach(function (w) { var t = line ? line + ' ' + w : w; if (c.measureText(t).width > max && line) { out.push(line); line = w; } else line = t; }); if (line) out.push(line); return out; }
  function spaced(c, text, x, y, gap) {         // centred text with letter spacing
    var w = 0, i; for (i = 0; i < text.length; i++) w += c.measureText(text[i]).width + gap; w -= gap;
    var p = x - w / 2; c.textAlign = 'left'; for (i = 0; i < text.length; i++) { c.fillText(text[i], p, y); p += c.measureText(text[i]).width + gap; } c.textAlign = 'center';
  }
  async function draw(d) {
    var cv = document.createElement('canvas'); cv.width = W; cv.height = H; var c = cv.getContext('2d');
    var shield = await img('/brand/if-shield-official.png'), sign = await img('/brand/signature.png');
    c.fillStyle = '#fff'; c.fillRect(0, 0, W, H);
    // frame: navy band, gold rule, fine navy rule, corner ornaments
    c.strokeStyle = NAVY; c.lineWidth = 22; c.strokeRect(61, 61, W - 122, H - 122);
    c.strokeStyle = GOLD; c.lineWidth = 6; c.strokeRect(92, 92, W - 184, H - 184);
    c.strokeStyle = NAVY; c.lineWidth = 2; c.strokeRect(110, 110, W - 220, H - 220);
    c.fillStyle = GOLD; [[110, 110], [W - 110, 110], [110, H - 110], [W - 110, H - 110]].forEach(function (p) { c.save(); c.translate(p[0], p[1]); c.rotate(Math.PI / 4); c.fillRect(-13, -13, 26, 26); c.restore(); });
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    var cx = W / 2;
    if (shield) c.drawImage(shield, cx - 105, 138, 210, 210);
    c.fillStyle = NAVY; c.font = 'bold 34px ' + SANS; spaced(c, 'IF ACADEMY  ·  INTELLECT FIRST', cx, 392, 9);
    c.fillStyle = GOLD; c.font = 'italic 30px ' + SERIF; c.fillText('Learn. Think. Lead.', cx, 436);
    c.fillStyle = NAVY; c.font = '92px ' + SERIF; c.fillText('Certificate of English Level', cx, 556);
    c.fillStyle = GOLD; c.fillRect(cx - 190, 584, 380, 3);
    c.fillStyle = SOFT; c.font = 'italic 36px ' + SERIF; c.fillText('This is to certify that', cx, 650);
    c.fillStyle = INK; var ns = fit(c, d.name, 'bold %px ' + SERIF, 96, W - 520); c.font = 'bold ' + ns + 'px ' + SERIF; c.fillText(d.name, cx, 762);
    c.strokeStyle = '#c9cdd4'; c.lineWidth = 2; c.beginPath(); c.moveTo(cx - 560, 790); c.lineTo(cx + 560, 790); c.stroke();
    c.fillStyle = SOFT; c.font = '34px ' + SERIF; c.fillText('completed the IF Academy English Placement Test on ' + d.date + ' and was assessed at', cx, 852);
    // level
    c.fillStyle = NAVY; c.font = 'bold 150px ' + SERIF; c.fillText(d.level, cx, 1010);
    c.fillStyle = GOLD; c.font = 'bold 26px ' + SANS; spaced(c, 'COMMON EUROPEAN FRAMEWORK OF REFERENCE (CEFR)', cx, 1056, 5);
    c.fillStyle = INK; c.font = 'italic 32px ' + SERIF; wrap(c, d.desc, W - 700).slice(0, 2).forEach(function (l, i) { c.fillText(l, cx, 1108 + i * 42); });
    // skills
    var sk = d.skills || [], cw = Math.min(290, (W - 420) / Math.max(1, sk.length)), x0 = cx - cw * sk.length / 2, y = 1186;
    sk.forEach(function (s, i) {
      var x = x0 + cw * i + cw / 2;
      c.fillStyle = SOFT; c.font = 'bold 22px ' + SANS; spaced(c, s.name.toUpperCase(), x, y, 3);
      c.fillStyle = NAVY; c.font = 'bold 44px ' + SERIF; c.fillText(s.label, x, y + 54);
      if (i) { c.fillStyle = '#d5d8de'; c.fillRect(x0 + cw * i, y - 22, 2, 84); }
    });
    c.fillStyle = INK; c.font = '30px ' + SERIF; var rc = 'Recommended course: ' + d.course; fit(c, rc, '%px ' + SERIF, 30, W - 520); c.fillText(rc, cx, 1312);
    // signature (left) and date / place (right)
    var sx = 520, dx = W - 520, ly = 1420;
    if (sign) { var sh = 190, sw = sign.width * sh / sign.height; if (sw > 440) { sw = 440; sh = sign.height * sw / sign.width; } c.drawImage(sign, sx - sw / 2, ly - sh * 0.74, sw, sh); }   // the flourish crosses the line, as on paper
    c.strokeStyle = NAVY; c.lineWidth = 2; c.beginPath(); c.moveTo(sx - 230, ly); c.lineTo(sx + 230, ly); c.moveTo(dx - 230, ly); c.lineTo(dx + 230, ly); c.stroke();
    c.fillStyle = INK; c.font = 'bold 30px ' + SERIF; c.fillText('Abdoulie Manneh', sx, ly + 42);
    c.fillStyle = SOFT; c.font = '24px ' + SANS; c.fillText('Founder & Director, IF Academy', sx, ly + 76);
    c.fillStyle = INK; c.font = '34px ' + SERIF; c.fillText(d.date, dx, ly - 16);
    c.font = 'bold 30px ' + SERIF; c.fillText('Kostanay, Kazakhstan', dx, ly + 42);
    c.fillStyle = SOFT; c.font = '24px ' + SANS; c.fillText('intellectfirst.com' + (d.id ? '  ·  No. ' + d.id : ''), dx, ly + 76);
    // seal
    c.strokeStyle = GOLD; c.lineWidth = 4; c.beginPath(); c.arc(cx, ly - 6, 78, 0, 6.2832); c.stroke(); c.lineWidth = 2; c.beginPath(); c.arc(cx, ly - 6, 66, 0, 6.2832); c.stroke();
    c.fillStyle = NAVY; c.font = 'bold 50px ' + SERIF; c.fillText('IF', cx, ly + 2); c.fillStyle = GOLD; c.font = 'bold 15px ' + SANS; spaced(c, 'PLACEMENT', cx, ly + 30, 3);
    c.fillStyle = '#8a919c'; c.font = '19px ' + SANS; c.fillText('Placement test result, issued for course placement at IF Academy. Writing and speaking are rated by AI using CEFR descriptors.', cx, 1527);
    return cv;
  }
  /* one-page PDF holding the certificate as a JPEG */
  function pdf(jpeg) {
    var enc = function (s) { var a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; };
    var PW = 841.89, PH = 595.28, parts = [], off = [], len = 0;
    var put = function (x) { var a = typeof x === 'string' ? enc(x) : x; parts.push(a); len += a.length; };
    var obj = function (n, body) { off[n] = len; put(n + ' 0 obj\n' + body + '\nendobj\n'); };
    put('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    obj(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + PW + ' ' + PH + '] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
    off[4] = len; put('4 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + W + ' /Height ' + H + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpeg.length + ' >>\nstream\n'); put(jpeg); put('\nendstream\nendobj\n');
    var cs = 'q ' + PW + ' 0 0 ' + PH + ' 0 0 cm /Im0 Do Q';
    obj(5, '<< /Length ' + cs.length + ' >>\nstream\n' + cs + '\nendstream');
    obj(6, '<< /Title (IF Academy Placement Test Certificate) /Author (IF Academy) /Creator (intellectfirst.com) >>');
    var xref = len, pad = function (n) { return ('0000000000' + n).slice(-10); };
    put('xref\n0 7\n0000000000 65535 f \n' + [1, 2, 3, 4, 5, 6].map(function (n) { return pad(off[n]) + ' 00000 n \n'; }).join('') + 'trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n' + xref + '\n%%EOF\n');
    var out = new Uint8Array(len), p = 0; parts.forEach(function (a) { out.set(a, p); p += a.length; });
    return out;
  }
  async function build(d) {
    var cv = await draw(d), b64 = cv.toDataURL('image/jpeg', 0.9).split(',')[1], bin = atob(b64), jpeg = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) jpeg[i] = bin.charCodeAt(i);
    return new Blob([pdf(jpeg)], { type: 'application/pdf' });
  }
  /** Build the certificate and save it: the share sheet on phones ("Save to Files"), a normal download on computers. */
  async function download(d) {
    var blob = await build(d), name = 'IF-Academy-Certificate-' + String(d.name).trim().replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '-') + '.pdf';
    var touch = (navigator.maxTouchPoints || 0) > 0 && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    try {
      var file = new File([blob], name, { type: 'application/pdf' });
      if (touch && navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'IF Academy certificate' }); return 'shared'; }
    } catch (e) { if (e && e.name === 'AbortError') return 'cancelled'; }
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    return 'downloaded';
  }
  window.IFCert = { build: build, download: download };
})();
