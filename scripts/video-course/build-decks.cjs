// Builds the IF IELTS video-course decks (PPTX with the narration in the speaker notes, ready to import into
// HeyGen / Synthesia) from a unit JSON:  node build-decks.js ielts-u1.json out/
// Mixed format: [AVATAR] slides keep the left half free for the presenter; [VOICE] slides keep the bottom-right
// corner free for a small avatar circle.
const pptxgen = require('pptxgenjs');
const fs = require('fs'), path = require('path');
const SKILL = '/root/.claude/skills/synced/220c1c74-fe3b-4964-a16f-6e9788b3b259_87ea7393-c142-4e52-8abd-f7a7939cb331/pptx';
const { applyTheme } = require(SKILL + '/scripts/apply_theme.js');

const THEME = { name: 'IF Academy', headFontFace: 'Cambria', bodyFontFace: 'Calibri',
  colors: { dk1: '0B1F3A', lt1: 'FFFFFF', dk2: '14325C', lt2: 'E8EFF8', accent1: 'C9A227', accent2: '2F6FB3', accent3: '7A8CA8', accent4: 'B23A48', accent5: '3C8D5A', accent6: '6B4FA0', hlink: '2F6FB3', folHlink: '6B4FA0' } };
const HEX = { navy: '0B1F3A', navy2: '14325C', ice: 'E8EFF8', gold: 'C9A227', mute: '5B6B84', white: 'FFFFFF', line: 'D5DFEC' };
const LOGO = path.join(__dirname, '../../brand/if-shield-3d.png');

async function build(unit, L, outDir) {
  const pres = new pptxgen(); pres.layout = 'LAYOUT_WIDE';   // 13.33 x 7.5 in
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = L.title; pres.author = 'IF Academy'; pres.company = 'IF Academy';
  const C = pres.SchemeColor;
  pres.defineSlideMaster({ title: 'AVATAR', background: { color: HEX.navy },
    objects: [{ image: { path: LOGO, x: 12.15, y: 0.35, w: 0.66, h: 0.85 } }],
    slideNumber: { x: 12.3, y: 6.95, w: 0.6, h: 0.3, color: '9FB0C8', fontSize: 10 } });
  pres.defineSlideMaster({ title: 'VOICE', background: { color: HEX.white },
    objects: [{ image: { path: LOGO, x: 12.35, y: 0.32, w: 0.5, h: 0.64 } },
      { text: { text: 'IF Academy · IELTS Video Course · ' + unit.unitTitle, options: { x: 0.6, y: 6.98, w: 8, h: 0.3, fontSize: 10, color: HEX.mute, margin: 0 } } }],
    slideNumber: { x: 9.2, y: 6.98, w: 0.5, h: 0.3, color: HEX.mute, fontSize: 10 } });

  const title = (s, t) => s.addText(t, { x: 0.6, y: 0.4, w: 11.2, h: 0.85, fontFace: 'Cambria', fontSize: 34, bold: true, color: HEX.navy, margin: 0, isTextBox: true, valign: 'middle' });
  const W = 9.4;   // content width: the bottom-right corner stays free for the avatar circle
  const badge = (s, x, y, n, dark) => { s.addShape(pres.shapes.OVAL, { x, y, w: 0.5, h: 0.5, fill: { color: dark ? HEX.gold : HEX.navy } }); s.addText(String(n), { x, y, w: 0.5, h: 0.5, align: 'center', valign: 'middle', fontSize: 16, bold: true, color: dark ? HEX.navy : HEX.white, margin: 0, isTextBox: true }); };

  L.slides.forEach((sd, i) => {
    if (sd.kind === 'avatar') {
      const s = pres.addSlide({ masterName: 'AVATAR' });
      // left half free for the presenter; a soft panel marks it in the deck
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.6, w: 5.6, h: 6.3, fill: { color: HEX.navy2 }, rectRadius: 0.25, line: { color: HEX.navy2 } });
      s.addText('presenter', { x: 0.5, y: 3.5, w: 5.6, h: 0.5, align: 'center', fontSize: 12, color: '6F84A6', italic: true, isTextBox: true });
      s.addText(i === 0 ? 'Unit ' + unit.unit.replace('u', '') + ' · Lesson ' + L.id.split('-')[1] : i === L.slides.length - 1 && /complete/i.test(sd.title) ? 'Well done' : 'Coming up', { x: 6.7, y: 1.9, w: 5.8, h: 0.4, fontSize: 14, bold: true, color: HEX.gold, charSpacing: 3, margin: 0, isTextBox: true });
      s.addText(sd.title, { x: 6.7, y: 2.4, w: 5.8, h: 2.0, fontFace: 'Cambria', fontSize: 38, bold: true, color: HEX.white, margin: 0, valign: 'top', isTextBox: true });
      s.addText(sd.sub, { x: 6.7, y: 4.6, w: 5.8, h: 1.0, fontSize: 16, color: 'C9D5E6', margin: 0, valign: 'top', isTextBox: true });
      s.addNotes(sd.notes); return;
    }
    const s = pres.addSlide({ masterName: 'VOICE' }); title(s, sd.title);
    if (sd.kind === 'bullets') {
      sd.items.forEach((t, k) => {
        const y = 1.55 + k * 1.2;
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: W, h: 1.0, fill: { color: HEX.ice }, line: { color: HEX.ice }, rectRadius: 0.12 });
        badge(s, 0.85, y + 0.25, k + 1);
        s.addText(t.replace(/^\d\s+/, ''), { x: 1.6, y, w: W - 1.2, h: 1.0, fontSize: 19, color: HEX.navy, valign: 'middle', margin: 0, isTextBox: true });
      });
    } else if (sd.kind === 'table') {
      const rows = sd.rows.map((r, k) => [{ text: r[0], options: { bold: true, color: HEX.navy, fill: { color: k % 2 ? HEX.white : HEX.ice } } }, { text: r[1], options: { color: '24344F', fill: { color: k % 2 ? HEX.white : HEX.ice } } }]);
      const rh = Math.min(sd.rows.length <= 4 ? 1.0 : 0.62, 5.0 / sd.rows.length);
      s.addTable(rows, { x: 0.6, y: 1.55, w: W, colW: [3.4, W - 3.4], rowH: rh, fontSize: sd.rows.length > 6 ? 16 : sd.rows.length <= 4 ? 20 : 18, valign: 'middle', border: { type: 'solid', pt: 0.75, color: HEX.line }, margin: 0.1 });
    } else if (sd.kind === 'compare') {
      [[sd.left, false, 0.6], [sd.right, true, 0.6 + W / 2 + 0.15]].forEach(([c, good, x]) => {
        const w = W / 2 - 0.15;
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.55, w, h: 3.4, fill: { color: good ? HEX.navy : HEX.ice }, line: { color: good ? HEX.navy : HEX.ice }, rectRadius: 0.15 });
        s.addText(c[0], { x: x + 0.35, y: 1.8, w: w - 0.7, h: 0.5, fontSize: 16, bold: true, color: good ? HEX.gold : HEX.mute, margin: 0, isTextBox: true, charSpacing: 2 });
        s.addText(c[1], { x: x + 0.35, y: 2.45, w: w - 0.7, h: 2.3, fontFace: 'Cambria', fontSize: 24, color: good ? HEX.white : HEX.navy, margin: 0, valign: 'top', isTextBox: true, paraSpaceAfter: 10 });
      });
    } else if (sd.kind === 'quiz') {
      sd.items.forEach((t, k) => {
        const y = 1.55 + k * 1.0; badge(s, 0.6, y + 0.15, k + 1);
        s.addText(t, { x: 1.35, y, w: W - 0.75, h: 0.8, fontSize: 19, color: HEX.navy, valign: 'middle', margin: 0, isTextBox: true });
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.75, w: W, h: 0.75, fill: { color: HEX.gold }, line: { color: HEX.gold }, rectRadius: 0.12 });
      s.addText([{ text: 'Answers:  ', options: { bold: true } }, { text: sd.answers }], { x: 0.85, y: 5.75, w: W - 0.5, h: 0.75, fontSize: 18, color: HEX.navy, valign: 'middle', margin: 0, isTextBox: true });
    } else if (sd.kind === 'chart') {
      const ch = sd.chart;
      s.addChart(pres.charts.LINE, ch.series.map(([name, values]) => ({ name, labels: ch.cats, values })), {
        x: 0.6, y: 1.45, w: 6.3, h: 4.9, showTitle: true, title: ch.title, titleFontSize: 14, titleColor: HEX.navy, titleFontFace: '+mn-lt',
        chartColors: [HEX.navy, HEX.gold, '2F6FB3'], lineSize: 3, lineDataSymbolSize: 7, showLegend: true, legendPos: 'b', legendFontSize: 12, legendFontFace: '+mn-lt',
        catAxisLabelColor: HEX.mute, valAxisLabelColor: HEX.mute, catAxisLabelFontSize: 12, valAxisLabelFontSize: 12, catAxisLabelFontFace: '+mn-lt', valAxisLabelFontFace: '+mn-lt',
        valAxisMinVal: 0, valAxisMaxVal: 100, valGridLine: { color: HEX.line, size: 0.75 }, catGridLine: { style: 'none' } });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.15, y: 1.55, w: 2.85, h: 4.7, fill: { color: HEX.ice }, line: { color: HEX.ice }, rectRadius: 0.12 });
      s.addText(sd.caption, { x: 7.35, y: 1.75, w: 2.45, h: 4.3, fontSize: 14, color: HEX.navy, valign: 'top', margin: 0, isTextBox: true });
    } else if (sd.kind === 'model') {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.55, w: W, h: 4.6, fill: { color: HEX.ice }, line: { color: HEX.ice }, rectRadius: 0.15 });
      s.addText('“', { x: 0.85, y: 1.45, w: 1, h: 1.1, fontFace: 'Cambria', fontSize: 80, color: HEX.gold, margin: 0, isTextBox: true });
      s.addText(sd.text, { x: 1.2, y: 2.35, w: W - 1.1, h: 3.6, fontFace: 'Cambria', fontSize: sd.text.length > 220 ? 21 : 25, color: HEX.navy, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.15 });
    }
    s.addNotes(sd.notes);
  });
  const out = path.join(outDir, `ielts-${L.id}.pptx`);
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  return out;
}
(async () => {
  const unit = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')), outDir = process.argv[3] || '.';
  fs.mkdirSync(outDir, { recursive: true });
  for (const L of unit.lessons) console.log(await build(unit, L, outDir));
})();
