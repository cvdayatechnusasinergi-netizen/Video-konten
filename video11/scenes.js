// ===== Video 11 — ZERO TO ONE · BAB 1: Pertanyaan kontrarian =====
const CTA_TITLE = ['BERANI', 'BEDA'];
const BADGE = 'ZERO TO ONE · BAB 1';
const CTA_TEXT = 'Tulis jawaban lo di komen.';
const OFF = 0.3, HOOK_END = OFF + 4.6, CTA_AT = OFF + 32.25, DURATION_S = 37.9;

function book(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.05);
  ctx.fillStyle = '#f2f2f2'; ctx.shadowColor = 'rgba(255,255,255,.45)'; ctx.shadowBlur = 40; ctx.fillRect(-160, -230, 320, 460); ctx.shadowBlur = 0;
  ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  font(92, 900); ctx.fillText('ZERO', 0, -90); font(56, 900); ctx.fillText('TO ONE', 0, -10);
  ctx.fillRect(-40, 50, 80, 5); font(24, 700); ctx.letterSpacing = '4px'; ctx.fillText('PETER THIEL', 2, 160); ctx.letterSpacing = '0px';
  ctx.restore();
}
// kerumunan panah ke kanan, satu ke kiri
function crowd(v, odd = true, a = 1) {
  for (let i = 0; i < 48; i++) {
    const x = 170 + (i % 8) * 106, y = 560 + Math.floor(i / 8) * 110;
    const special = odd && i === 27;
    ctx.save(); ctx.globalAlpha = a * (special ? 1 : .45); ctx.translate(x, y); if (special) ctx.rotate(Math.PI);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = special ? 7 : 4; ctx.lineCap = 'round';
    if (special) { ctx.shadowColor = 'rgba(255,255,255,.9)'; ctx.shadowBlur = 25; }
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(10, -14); ctx.lineTo(26, 0); ctx.lineTo(10, 14); ctx.stroke(); ctx.restore();
  }
}
function k1(lt, t) {
  const v = t - OFF;
  crowd(v, v > 2.6, eo(prog(v, .1, .6)));
  bigPop('?', W / 2, 440, 150, prog(v, .2, .6), 50);
  tag('NGGAK ADA YANG SETUJU', W / 2, 1230 - 40, prog(v, 3.2, 3.6), true, 30);
}
// wawancara Peter Thiel
function k2(lt, t) {
  const v = t - OFF;
  const wa = eo(prog(v, 4.8, 5.3)) * (1 - prog(v, 9.2, 9.5));
  if (wa > 0) {
    ctx.save(); ctx.globalAlpha *= wa;
    person(330, 1050, .95, { mood: 'flat', label: 'PETER THIEL' });
    person(750, 1050, .95, { mood: 'panic', label: 'KANDIDAT' });
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(380, 1050); ctx.lineTo(700, 1050); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(300, 560, 220, 130, 30); ctx.fill(); ctx.beginPath(); ctx.moveTo(340, 680); ctx.lineTo(320, 740); ctx.lineTo(380, 690); ctx.fill();
    font(90, 900); ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 410, 628);
    tag('PERTANYAAN FAVORIT', W / 2, 470, prog(v, 5.6, 6.0), false, 30);
    ctx.restore();
  }
  const bp = prog(v, 9.48, 10.0);
  if (bp > 0) { ctx.save(); ctx.globalAlpha *= eo(bp); book(W / 2, 820, back(bp) * .85); ctx.restore(); tag(BADGE, W / 2, 1160, prog(v, 9.9, 10.3), false, 28); }
}
// coba jawab → semua jawab hal yang sama
function k3(lt, t) {
  const v = t - OFF;
  bigPop('COBA JAWAB.', W / 2, 520, 110, prog(v, 13.4, 13.8), 40);
  for (let i = 0; i < 12; i++) {
    const x = 220 + (i % 4) * 213, y = 760 + Math.floor(i / 4) * 140, p = prog(v, 14.8 + i * .08, 15.1 + i * .08); if (p <= 0) continue;
    ctx.save(); ctx.globalAlpha *= eo(p) * .7; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x - 90, y - 45, 180, 90, 22); ctx.stroke();
    font(26, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('"udah tau"', x, y + 2); ctx.restore();
  }
}
// spotlight ke kebenaran tersembunyi
function k4(lt, t) {
  const v = t - OFF;
  const r = rng(31);
  for (let i = 0; i < 60; i++) dot(140 + r() * 800, 460 + r() * 720, 5, .2, 0);
  const sp = eo(prog(v, 17.9, 18.6));
  if (sp > 0) {
    ctx.save(); ctx.globalAlpha *= sp; const g = ctx.createRadialGradient(700, 880, 0, 700, 880, 260);
    g.addColorStop(0, 'rgba(255,255,255,.28)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(0, 380, W, 900); ctx.restore();
    dot(700, 880, 22, sp, 60);
  }
  tag('PELUANG TERBESAR', 700, 760, prog(v, 18.6, 19.0), true, 30);
  tag('BENER', 560, 1010, prog(v, 20.14, 20.5), false, 30);
  tag('BELUM DISADARI', 820, 1010, prog(v, 21.38, 21.7), true, 30);
}
// percaya yang dipercaya semua orang → hasil sama
function k5(lt, t) {
  const v = t - OFF;
  crowd(v, false, eo(prog(v, 23.1, 23.6)));
  bigPop('HASIL LO = SAMA.', W / 2, 470, 90, prog(v, 26.82, 27.3), 40);
}
// ajak komen
function k6(lt, t) {
  const v = t - OFF;
  bigPop('JAWABAN LO APA?', W / 2, 720, 82, prog(v, 29.24, 29.7), 45);
  const p = prog(v, 31.2, 31.6);
  if (p > 0) {
    ctx.save(); ctx.translate(W / 2, 950); const s = back(p); ctx.scale(s, s);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-70, -55, 140, 100, 26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-30, 45); ctx.lineTo(-44, 80); ctx.lineTo(-5, 45); ctx.stroke();
    ctx.fillStyle = '#fff'; [-30, 0, 30].forEach(x => { ctx.beginPath(); ctx.arc(x, -5, 8, 0, 7); ctx.fill(); });
    ctx.restore();
    tag('TULIS DI KOMEN', W / 2, 1110, p, true, 36);
  }
}
const SCENES = [[0, HOOK_END, k1], [HOOK_END, OFF + 11.6, k2], [OFF + 11.6, OFF + 17.8, k3], [OFF + 17.8, OFF + 22.9, k4], [OFF + 22.9, OFF + 29.1, k5], [OFF + 29.1, CTA_AT, k6]];
