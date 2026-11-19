// ===== Video 9 — ZERO TO ONE · BAB 4: Persaingan itu buat yang kalah =====
const CTA_TITLE = ['JANGAN IKUT', 'LOMBA RAME'];
const BADGE = 'ZERO TO ONE · BAB 4';
const CTA_TEXT = 'Kirim ke temen lo yang jualannya ikut-ikutan.';
const OFF = 0.3, HOOK_END = OFF + 4.0, CTA_AT = OFF + 29.3, DURATION_S = 35.3;

function book(x, y, s, title2 = 'TO ONE') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.05);
  ctx.fillStyle = '#f2f2f2'; ctx.shadowColor = 'rgba(255,255,255,.45)'; ctx.shadowBlur = 40; ctx.fillRect(-160, -230, 320, 460); ctx.shadowBlur = 0;
  ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  f2(92, 900); ctx.fillText('ZERO', 0, -90); f2(56, 900); ctx.fillText(title2, 0, -10);
  ctx.fillRect(-40, 50, 80, 5); f2(24, 700); ctx.letterSpacing = '4px'; ctx.fillText('PETER THIEL', 2, 160); ctx.letterSpacing = '0px';
  ctx.restore();
}
function f2(size, w) { font(size, w); }

// hook: dua orang saling sikut, harga anjlok
function z1(lt, t) {
  const v = t - OFF;
  person(330, 1150, 1.05, { mood: 'panic', shake: 1, label: 'TOKO A' });
  person(750, 1150, 1.05, { mood: 'panic', shake: 1, label: 'TOKO B' });
  const price = Math.max(29, 50 - Math.floor(Math.max(0, v - .3) * 6));
  tag('Rp' + price + '.000', W / 2, 900, 1, true, 44);
  bigPop('BUAT YANG KALAH.', W / 2, 560, 96, prog(v, .9, 1.4), 40);
  pill('persaingan itu…', W / 2, 450, prog(v, .1, .5), { size: 34 });
}
// Peter Thiel + buku
function z2(lt, t) {
  const v = t - OFF;
  bigPop('PETER THIEL', W / 2, 470, 96, prog(v, 4.1, 4.6), 30);
  pill('pendiri PayPal', W / 2, 570, prog(v, 5.78, 6.2), { size: 34, filled: true });
  const bp = prog(v, 6.96, 7.5);
  if (bp > 0) { ctx.save(); ctx.globalAlpha *= eo(bp); book(W / 2, 900, back(bp) * .9); ctx.restore(); }
  tag(BADGE, W / 2, 1170, prog(v, 7.4, 7.8), false, 28);
}
// 100 toko sama → perang harga
function z3(lt, t) {
  const v = t - OFF;
  const X0 = 190, Y0 = 470, st = 70;
  for (let i = 0; i < 100; i++) {
    const p = prog(v, 10.34 + i * .012, 10.6 + i * .012); if (p <= 0) continue;
    const x = X0 + (i % 10) * st, y = Y0 + Math.floor(i / 10) * st;
    ctx.save(); ctx.globalAlpha *= eo(p) * (v > 13 ? .55 : 1); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
    ctx.strokeRect(x - 24, y - 18, 48, 40); ctx.beginPath(); ctx.moveTo(x - 28, y - 18); ctx.lineTo(x, y - 34); ctx.lineTo(x + 28, y - 18); ctx.stroke();
    ctx.restore();
  }
  const pp = prog(v, 13.88, 16.2);
  if (v > 13.0) {
    const price = Math.round(lerp(50, 29, eio(pp)));
    ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(140, 820, 800, 230); ctx.restore();
    bigPop('Rp' + price + '.000', W / 2, 900, 120, prog(v, 13.06, 13.5), 30);
    font(30, 800); ctx.letterSpacing = '6px'; ctx.fillStyle = '#9a9a9a'; ctx.textAlign = 'center'; ctx.fillText('PERANG HARGA', W / 2 + 3, 1000); ctx.letterSpacing = '0px';
    tag('UNTUNG TIPIS', 330, 1110, prog(v, 14.94, 15.3), false, 30);
    tag('CAPEK TEBEL', 750, 1110, prog(v, 16.34, 16.7), true, 30);
  }
}
// semua lari di lintasan yang sama → satu keluar jalur
function z4(lt, t) {
  const v = t - OFF;
  pill('jangan ikut lomba yang semua orang ikutin', W / 2, 460, prog(v, 19.14, 19.6), { size: 28 });
  const lanes = 6;
  for (let l = 0; l < lanes; l++) {
    const y = 640 + l * 80;
    ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(100, y + 30); ctx.lineTo(980, y + 30); ctx.stroke(); ctx.restore();
    for (let k = 0; k < 4; k++) {
      const special = l === 2 && k === 1;
      let x = 120 + ((k * 230 + (v - 17.4) * 160) % 880), y2 = y;
      if (special && v > 21.7) { const p = eio(prog(v, 21.7, 22.8)); x = lerp(x, W / 2, p); y2 = lerp(y, 1200, p); }
      dot(x, y2, special && v > 21.7 ? 16 + 6 * eo(prog(v, 22.4, 22.8)) : 8, special ? 1 : .45, special && v > 21.7 ? 40 : 0);
    }
  }
  tag('CUMA LO YANG BISA', W / 2, 1130, prog(v, 22.6, 23.0), true, 32);
  pill('sekecil apa pun', W / 2, 1250 - 30, prog(v, 23.94, 24.3) * (1 - prog(v, 24.9, 25.1)), { size: 28 });
}
// sama kayak yang lain = pilihan paling murah
function z5(lt, t) {
  const v = t - OFF;
  const X0 = 250, Y0 = 640, st = 145;
  for (let i = 0; i < 20; i++) {
    const x = X0 + (i % 5) * st, y = Y0 + Math.floor(i / 5) * 120;
    const hl = i === 12;
    const p = prog(v, 25.32 + i * .02, 25.6 + i * .02); if (p <= 0) continue;
    ctx.save(); ctx.globalAlpha *= eo(p) * (hl && v > 27.4 ? 1 : .45); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
    ctx.strokeRect(x - 40, y - 34, 80, 68); ctx.restore();
    if (hl && v > 27.4) tag('Rp29rb', x, y, prog(v, 27.48, 27.8), true, 22);
  }
  bigPop('PILIHAN PALING MURAH.', W / 2, 500, 70, prog(v, 28.1, 28.5), 30);
}
const SCENES = [[0, HOOK_END, z1], [HOOK_END, OFF + 8.6, z2], [OFF + 8.6, OFF + 17.4, z3], [OFF + 17.4, OFF + 25.2, z4], [OFF + 25.2, CTA_AT, z5]];
