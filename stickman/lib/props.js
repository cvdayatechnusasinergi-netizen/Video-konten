// ===== Shared props collected from the Shorts (load after stick.js) =====
const BLUE = '#2a4fa0';
const GREEN = '#2f9e44';
function glasses(m, s = 1) { // Ron Wayne: glasses + grey hair tufts
  const [x, y] = m.head, r = m.headR;
  ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5 * s;
  [-1, 1].forEach(d => { ctx.beginPath(); ctx.arc(x + d * r * .36, y - r * .12, 15 * s, 0, 7); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(x - r * .36 + 15 * s, y - r * .12); ctx.lineTo(x + r * .36 - 15 * s, y - r * .12); ctx.stroke();
  ctx.strokeStyle = C.soft; ctx.lineWidth = 7 * s; ctx.lineCap = 'round';
  [-1, 1].forEach(d => { for (let i = 0; i < 3; i++) { const a = (d > 0 ? -.35 : Math.PI + .35) + d * i * .25; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.lineTo(x + Math.cos(a) * (r + 16 * s), y + Math.sin(a) * (r + 16 * s)); ctx.stroke(); } });
  ctx.restore();
}
function beard(m, s = 1) { const [x, y] = m.head, r = m.headR; ctx.save(); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(x, y + r * .2, r * .8, .25, Math.PI - .25); ctx.quadraticCurveTo(x, y + r * .55, x + r * .76, y + r * .4); ctx.fill(); ctx.restore(); }
function appleIcon(x, y, r, bite = true) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = C.red; ctx.strokeStyle = C.ink; ctx.lineWidth = r * .07;
  ctx.beginPath(); ctx.moveTo(0, -r * .62);
  ctx.bezierCurveTo(r * .55, -r * 1.05, r * 1.15, -r * .45, r * .85, r * .35);
  ctx.bezierCurveTo(r * .65, r * .95, r * .2, r * 1.0, 0, r * .82);
  ctx.bezierCurveTo(-r * .2, r * 1.0, -r * .65, r * .95, -r * .85, r * .35);
  ctx.bezierCurveTo(-r * 1.15, -r * .45, -r * .55, -r * 1.05, 0, -r * .62); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.ink; ctx.lineWidth = r * .09; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -r * .6); ctx.quadraticCurveTo(r * .05, -r * .9, r * .2, -r * 1.05); ctx.stroke();
  ctx.fillStyle = '#7fbf5a'; ctx.lineWidth = r * .05; ctx.beginPath(); ctx.ellipse(r * .32, -r * .92, r * .22, r * .1, -.5, 0, 7); ctx.fill(); ctx.stroke();
  if (bite) { ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(r * 1.0, -r * .05, r * .3, 0, 7); ctx.fill(); }
  ctx.restore();
}
function paperDoc(x, y, s, rot, title, lines = 5) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 6; roughRect(-110, -150, 220, 300, 6); ctx.fill(); ctx.stroke();
  font(30, 900); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(title, 0, -110);
  ctx.fillStyle = C.line; for (let i = 0; i < lines; i++) ctx.fillRect(-80, -60 + i * 34, 160 - (i % 2) * 40, 10);
  ctx.restore();
}
function logoFrame(x, y, s, draw = 1) { // the first Apple logo idea: framed drawing of a tree with a figure under it
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#f3ead2'; ctx.strokeStyle = C.ink; ctx.lineWidth = 8; roughRect(-120, -150, 240, 300, 6); ctx.fill(); ctx.stroke();
  ctx.lineWidth = 3; ctx.strokeRect(-100, -130, 200, 260);
  ctx.save(); ctx.beginPath(); ctx.rect(-100, -130, 200 * draw, 260); ctx.clip();
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 100); ctx.lineTo(0, -10); ctx.stroke();
  ctx.fillStyle = '#9ad48a'; ctx.beginPath(); ctx.arc(0, -50, 70, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(20, -40, 12, 0, 7); ctx.fill();
  ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-50, 70, 10, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-50, 80); ctx.lineTo(-50, 110); ctx.stroke();
  ctx.restore(); ctx.restore();
}
function house(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineJoin = 'round';
  roughRect(-80, -40, 160, 120, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = C.red; ctx.beginPath(); ctx.moveTo(-100, -40); ctx.lineTo(0, -120); ctx.lineTo(100, -40); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.fillRect(-20, 20, 40, 60); ctx.restore(); }
function car(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#7ec8f2'; ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-110, 20); ctx.lineTo(-100, -20); ctx.lineTo(-50, -25); ctx.lineTo(-25, -65); ctx.lineTo(50, -65); ctx.lineTo(80, -25); ctx.lineTo(110, -15); ctx.lineTo(110, 20); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; [-60, 65].forEach(cx => { ctx.beginPath(); ctx.arc(cx, 25, 24, 0, 7); ctx.fill(); }); ctx.restore(); }
function piggy(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#f7b6c2'; ctx.strokeStyle = C.ink; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.ellipse(0, 0, 90, 65, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(88, -5, 22, 26, 0, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(40, -22, 7, 0, 7); ctx.fill(); ctx.fillRect(-20, -66, 40, 8);
  [-50, -20, 25, 55].forEach(lx => ctx.fillRect(lx, 55, 14, 28)); ctx.restore(); }
function pie(x, y, r, p) { // 45 / 45 / 10
  const parts = [[.45, C.ink, 'JOBS 45%'], [.45, C.soft, 'WOZ 45%'], [.10, C.red, '10%']];
  let a0 = -Math.PI / 2;
  ctx.save(); ctx.strokeStyle = C.paper; ctx.lineWidth = 8;
  parts.forEach(([f, col], i) => { const a1 = a0 + f * 6.2832 * p; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, i === 2 ? r * 1.12 : r, a0, a1); ctx.closePath(); ctx.fill(); ctx.stroke(); a0 = a1; });
  ctx.restore();
}
function rockingChair(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.strokeStyle = '#8a5a35'; ctx.lineWidth = 14; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -60, 200, .9, Math.PI - .9); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-90, 80); ctx.lineTo(-100, -40); ctx.lineTo(80, -40); ctx.lineTo(90, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-100, -40); ctx.lineTo(-150, -260); ctx.stroke(); ctx.restore(); }
function store(x, base, w, h, opts = {}) { // generic video-rental megastore, (x, base) bottom center
  const { crack = 0, fall = 0, label = 'BLOCKBUSTER', sub = 'VIDEO' } = opts;
  ctx.save(); ctx.translate(x, base); ctx.rotate(fall * .25); ctx.translate(0, fall * 120);
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.fillStyle = BLUE; roughRect(-w / 2, -h, w, h, 6); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.gold; roughRect(-w * .42, -h * .9, w * .84, h * .28, 6); ctx.fill(); ctx.stroke();
  font(Math.min(w * .1, 58), 900); ctx.fillStyle = BLUE; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, 0, -h * .76);
  ctx.fillStyle = '#dbe6ff'; for (let i = 0; i < 3; i++) { roughRect(-w * .4 + i * w * .28, -h * .52, w * .22, h * .2, 4); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = C.ink; roughRect(-w * .1, -h * .26, w * .2, h * .26, 4); ctx.fill();
  if (crack > 0) { ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.beginPath(); const pts = [[0, -h], [-30, -h * .8], [20, -h * .62], [-25, -h * .42], [15, -h * .2]]; const n = Math.ceil(pts.length * crack); pts.slice(0, n).forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.stroke(); }
  ctx.restore();
}
function dvdMailer(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = C.red; ctx.strokeStyle = C.ink; ctx.lineWidth = 6; roughRect(-90, -55, 180, 110, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(40, 0, 32, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(40, 0, 8, 0, 7); ctx.fill();
  font(24, 900); ctx.fillStyle = C.white; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('DVD', -70, -18); ctx.restore(); }
function playIcon(x, y, r) { // generic TV with a play triangle (not any brand logo)
  ctx.save(); ctx.translate(x, y); ctx.lineJoin = 'round';
  ctx.fillStyle = C.ink; roughRect(-r * 1.1, -r * .78, r * 2.2, r * 1.56, r * .12); ctx.fill();
  ctx.fillStyle = C.white; roughRect(-r * .98, -r * .66, r * 1.96, r * 1.32, r * .06); ctx.fill();
  ctx.fillStyle = C.red; ctx.strokeStyle = C.ink; ctx.lineWidth = r * .05;
  ctx.beginPath(); ctx.moveTo(-r * .32, -r * .42); ctx.lineTo(r * .45, 0); ctx.lineTo(-r * .32, r * .42); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.ink; ctx.lineWidth = r * .08; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-r * .4, r * .78); ctx.lineTo(-r * .55, r * 1.0); ctx.moveTo(r * .4, r * .78); ctx.lineTo(r * .55, r * 1.0); ctx.stroke();
  ctx.restore(); }
function table(y) { ctx.fillStyle = '#c9a77a'; ctx.strokeStyle = C.ink; ctx.lineWidth = 9; roughRect(130, y, 820, 50, 8); ctx.fill(); ctx.stroke();
  inkLine([[200, y + 50], [200, y + 260]], 10, C.ink, 950); inkLine([[880, y + 50], [880, y + 260]], 10, C.ink, 960); }
function prototype(x, y, s, rot = 0) { // 1975 "toaster with a lens"
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round';
  ctx.fillStyle = '#b9bcc2'; ctx.strokeStyle = C.ink; ctx.lineWidth = 8; roughRect(-170, -110, 340, 220, 14); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#8f939b'; roughRect(-150, -150, 120, 40, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-70, 10, 62, 0, 7); ctx.fill();
  ctx.fillStyle = '#5a6b80'; ctx.beginPath(); ctx.arc(-70, 10, 40, 0, 7); ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(-84, -4, 10, 0, 7); ctx.fill();
  ctx.fillStyle = C.white; roughRect(30, -60, 110, 70, 6); ctx.fill(); ctx.stroke(); // cassette
  ctx.fillStyle = C.ink; [55, 115].forEach(cx => { ctx.beginPath(); ctx.arc(cx, -25, 12, 0, 7); ctx.fill(); });
  ctx.fillStyle = C.red; [50, 90, 130].forEach(cx => { ctx.beginPath(); ctx.arc(cx, 60, 11, 0, 7); ctx.fill(); });
  ctx.restore();
}
function filmRoll(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round';
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.moveTo(40, -30); ctx.lineTo(190, -30); ctx.lineTo(190, 30); ctx.lineTo(40, 30); ctx.fill();
  ctx.fillStyle = C.paper; for (let i = 0; i < 6; i++) { ctx.fillRect(55 + i * 24, -24, 12, 8); ctx.fillRect(55 + i * 24, 16, 12, 8); }
  ctx.fillStyle = C.gold; ctx.strokeStyle = C.ink; ctx.lineWidth = 7; roughRect(-60, -70, 120, 140, 14); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.red; ctx.fillRect(-56, -20, 112, 40); ctx.fillStyle = C.ink; ctx.fillRect(-30, -86, 60, 18);
  font(24, 900); ctx.fillStyle = C.white; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('FILM', 0, 2);
  ctx.restore();
}
function camPhone(x, y, s, rot) { phone(x, y, s, rot, () => { ctx.fillStyle = C.ink; roughRect(-30, -40, 60, 44, 8); ctx.fill(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(0, -18, 14, 0, 7); ctx.fill(); ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(0, 40, 16, 0, 7); ctx.fill(); }); }
function hq(x, base, s, opts = {}) { // generic company HQ with a text name
  const { crack = 0, fall = 0 } = opts;
  ctx.save(); ctx.translate(x, base); ctx.rotate(fall * .25); ctx.translate(0, fall * 120); ctx.scale(s, s);
  ctx.fillStyle = C.gold; ctx.strokeStyle = C.ink; ctx.lineWidth = 8; roughRect(-200, -520, 400, 520, 6); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.red; roughRect(-200, -520, 400, 100, 6); ctx.fill(); ctx.stroke();
  font(70, 900); ctx.fillStyle = C.white; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KODAK', 0, -468);
  ctx.fillStyle = '#fff4c7'; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { roughRect(-160 + c * 115, -390 + r * 90, 80, 60, 4); ctx.fill(); ctx.stroke(); }
  if (crack > 0) { ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.beginPath(); const pts = [[0, -520], [-40, -400], [30, -300], [-30, -180], [20, -60]]; pts.slice(0, Math.ceil(pts.length * crack)).forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.stroke(); }
  ctx.restore();
}
function stamp(x, y, text, s, rot, color = C.red, size = 110) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  font(size, 900); const w = ctx.measureText(text).width + 60, h = size * 1.4;
  ctx.fillStyle = 'rgba(246,243,236,.88)'; roughRect(-w / 2, -h / 2, w, h, 16); ctx.fill();
  ctx.strokeStyle = color; ctx.lineWidth = 12; roughRect(-w / 2, -h / 2, w, h, 16); ctx.stroke();
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 6);
  ctx.restore();
}
function ticket(x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const w = 640, h = 300;
  ctx.fillStyle = C.gold; ctx.strokeStyle = C.ink; ctx.lineWidth = 9; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(w / 2, -h / 2); ctx.lineTo(w / 2, -30); ctx.arc(w / 2, 0, 30, -Math.PI / 2, Math.PI / 2, true); ctx.lineTo(w / 2, h / 2); ctx.lineTo(-w / 2, h / 2); ctx.lineTo(-w / 2, 30); ctx.arc(-w / 2, 0, 30, Math.PI / 2, -Math.PI / 2, true); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.setLineDash([14, 12]); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(w / 2 - 120, -h / 2 + 10); ctx.lineTo(w / 2 - 120, h / 2 - 10); ctx.stroke(); ctx.setLineDash([]);
  font(70, 900); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('LOTTO', -60, -80);
  font(40, 900); [7, 13, 21, 34, 42].forEach((n, i) => { const cx = -230 + i * 85; ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(cx, 40, 34, 0, 7); ctx.fill(); ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = C.ink; ctx.fillText(String(n), cx, 42); });
  ctx.save(); ctx.translate(w / 2 - 60, 0); ctx.rotate(-Math.PI / 2); font(36, 900); ctx.fillStyle = C.red; ctx.fillText('WIN!', 0, 0); ctx.restore();
  ctx.restore();
}
function bill(x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = '#cfe6c4'; ctx.strokeStyle = C.ink; ctx.lineWidth = 7;
  roughRect(-150, -75, 300, 150, 12); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 48, 52, 0, 0, 7); ctx.stroke();
  font(70, 900); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', 0, 4);
  ctx.restore();
}
function cheque(x, y, s, rot, amount, line = 'PAY TO: ...') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = '#eaf3df'; ctx.strokeStyle = C.ink; ctx.lineWidth = 6; roughRect(-170, -75, 340, 150, 8); ctx.fill(); ctx.stroke();
  font(22, 800); ctx.fillStyle = C.soft; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(line, -150, -45);
  let fs = 70; font(fs, 900); while (ctx.measureText(amount).width > 300 && fs > 30) { fs -= 4; font(fs, 900); }
  ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.fillText(amount, 0, 18);
  ctx.restore();
}
function slam(t, at, x, y, text, rot, color = C.red, size = 110) { const p = prog(t, at, at + .2); if (p <= 0) return; ctx.save(); ctx.globalAlpha *= p; stamp(x, y, text, lerp(2.2, 1, eo(p)), rot, color, size); ctx.restore(); }
function boss(x, base, pose, face, s = 1, opts = {}) { const m = stick(x, base, pose, { s, face, ...opts }); necktie(m, s); return m; }
function counterText(t, a, b, from, to, x, y, size, opts = {}) { // log-scale money counter
  const k = 1 - Math.pow(1 - prog(t, a, b), 4); const v = Math.exp(lerp(Math.log(from), Math.log(to), k));
  pop('$' + Math.round(v).toLocaleString('en-US'), x, y, size, t, a - .05, opts);
}
