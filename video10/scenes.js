// ===== Video 10 — ZERO TO ONE · BAB 7: Power law =====
const CTA_TITLE = ['PILIH SEDIKIT', 'SERIUSIN'];
const BADGE = 'ZERO TO ONE · BAB 7';
const CTA_TEXT = 'Kirim ke temen lo yang semua dicoba.';
const OFF = 0.3, HOOK_END = OFF + 3.65, CTA_AT = OFF + 28.75, DURATION_S = 35.0;

function book(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.05);
  ctx.fillStyle = '#f2f2f2'; ctx.shadowColor = 'rgba(255,255,255,.45)'; ctx.shadowBlur = 40; ctx.fillRect(-160, -230, 320, 460); ctx.shadowBlur = 0;
  ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  font(92, 900); ctx.fillText('ZERO', 0, -90); font(56, 900); ctx.fillText('TO ONE', 0, -10);
  ctx.fillRect(-40, 50, 80, 5); font(24, 700); ctx.letterSpacing = '4px'; ctx.fillText('PETER THIEL', 2, 160); ctx.letterSpacing = '0px';
  ctx.restore();
}
// hook: 1 batang raksasa vs 100 batang kecil
function y1(lt, t) {
  const v = t - OFF;
  const base = 1180, X0 = 150;
  const g = eio(prog(v, .2, 2.2));
  ctx.save(); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(255,255,255,.8)'; ctx.shadowBlur = 40;
  ctx.fillRect(X0, base - 600 * g, 120, 600 * g); ctx.restore();
  for (let i = 0; i < 100; i++) {
    const p = prog(v, 1.2 + i * .01, 1.5 + i * .01); if (p <= 0) continue;
    const x = 330 + (i % 50) * 12.5, h = (18 + (i * 37 % 23)) * eo(p) * (i < 50 ? 1 : .7);
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(x, base - h - (i < 50 ? 0 : 0), 7, h);
  }
  ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(120, base); ctx.lineTo(960, base); ctx.stroke();
  font(44, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.globalAlpha = eo(prog(v, 1.0, 1.4)); ctx.fillText('1', X0 + 60, base + 16); ctx.fillStyle = '#9a9a9a'; ctx.fillText('100 lainnya', 640, base + 16); ctx.globalAlpha = 1;
  bigPop('>', 345, 780, 110, prog(v, 2.0, 2.4), 30);
}
// buku + POWER LAW
function y2(lt, t) {
  const v = t - OFF;
  const bp = prog(v, 3.8, 4.3);
  if (bp > 0) { ctx.save(); ctx.globalAlpha *= eo(bp) * (1 - prog(v, 6.8, 7.2) * .6); book(W / 2, 820, back(bp) * .8 * lerp(1, .7, eio(prog(v, 6.8, 7.3)))); ctx.restore(); }
  tag(BADGE, W / 2, 470, prog(v, 4.2, 4.6), false, 28);
  bigPop('POWER LAW', W / 2, 1120, 120, prog(v, 6.9, 7.4), 45);
}
// 1 investasi > gabungan semua sisanya
function y3(lt, t) {
  const v = t - OFF;
  pill('di dunia investasi', W / 2, 460, prog(v, 8.26, 8.6), { size: 32 });
  const r = rng(4), pts = Array.from({ length: 24 }, () => ({ x: 640 + r() * 300, y: 640 + r() * 420, s: 10 + r() * 14 }));
  pts.forEach((p, i) => dot(p.x, p.y, p.s * eo(prog(v, 9.0 + i * .03, 9.3 + i * .03)), .5, 0));
  const g = eio(prog(v, 9.98, 13.0));
  ctx.save(); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(255,255,255,.8)'; ctx.shadowBlur = 50;
  ctx.beginPath(); ctx.arc(340, 850, 30 + 200 * g, 0, 7); ctx.fill(); ctx.restore();
  font(36, 900); ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.globalAlpha = eo(prog(v, 11.5, 12)); ctx.fillText('TERBAIK', 340, 850); ctx.globalAlpha = 1;
  tag('1 > SEMUA SISANYA', W / 2, 1150, prog(v, 13.0, 13.4), true, 34);
}
// skill, kerjaan, orang
function y4(lt, t) {
  const v = t - OFF;
  bigPop('HIDUP JUGA GITU.', W / 2, 480, 80, prog(v, 14.66, 15.1), 30);
  [['SKILL', 16.02], ['KERJAAN', 17.62], ['ORANG', 19.16]].forEach(([s, at], i) => {
    const y = 680 + i * 170, p = prog(v, at, at + .4); if (p <= 0) return;
    ctx.save(); ctx.globalAlpha *= eo(p); ctx.translate((1 - eo(p)) * 80, 0);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(200, y - 60, 680, 120, 24); ctx.stroke();
    font(64, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, W / 2, y + 3);
    ctx.restore();
  });
}
// nyebar tipis-tipis
function y5(lt, t) {
  const v = t - OFF;
  const r = rng(12);
  for (let i = 0; i < 70; i++) {
    const x = 120 + r() * 840, y = 420 + r() * 760, ph = r() * 6;
    const a = eo(prog(v, 21.5 + i * .015, 21.9 + i * .015)) * (v > 24.06 ? (Math.sin(v * 9 + ph) > 0 ? .7 : .2) : .5);
    dot(x, y, 7, a, 0);
  }
  pill('semua dicoba', W / 2, 560, prog(v, 24.06, 24.4), { size: 34 });
  tag('NGGAK ADA YANG DALEM', W / 2, 1000, prog(v, 25.36, 25.7), true, 34);
}
// fokus: titik-titik menyatu jadi satu
function y6(lt, t) {
  const v = t - OFF;
  const r = rng(12), c = eio(prog(v, 26.5, 27.6));
  for (let i = 0; i < 70; i++) { const x = 120 + r() * 840, y = 420 + r() * 760; r(); dot(lerp(x, W / 2, c), lerp(y, 860, c), 5, .4 * (1 - c), 0); }
  dot(W / 2, 860, 20 + 90 * c, c, 60);
  bigPop('PILIH SEDIKIT.', W / 2, 520, 96, prog(v, 26.76, 27.2), 30);
  bigPop('SERIUSIN.', W / 2, 1110, 110, prog(v, 28.0, 28.4), 45);
}
const SCENES = [[0, HOOK_END, y1], [HOOK_END, OFF + 8.1, y2], [OFF + 8.1, OFF + 14.5, y3], [OFF + 14.5, OFF + 20.5, y4], [OFF + 20.5, OFF + 26.5, y5], [OFF + 26.5, CTA_AT, y6]];
