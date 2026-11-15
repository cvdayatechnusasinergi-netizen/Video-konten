// ===== Stickman motion-graphic library (shared by stickman/videoN/index.html) =====
// Canvas 1080x1920. Load after defining a <canvas id="c">.
const W = 1080, H = 1920;
const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
const FONT = 'Inter, "Inter Display", "DejaVu Sans", sans-serif';

// ---------- palette ----------
const C = {
  paper: '#f6f3ec',
  ink: '#141414',
  soft: '#8c877d',
  line: '#e2ddd2',
  red: '#e8322b',
  gold: '#f4b324',
  goldDark: '#c98a12',
  white: '#ffffff',
};

// ---------- math / easing ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const prog = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, p) => a + (b - a) * p;
const eo = x => 1 - Math.pow(1 - x, 3);
const eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const back = x => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const elastic = x => x === 0 ? 0 : x >= 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - .75) * (2 * Math.PI / 3)) + 1;
const D2R = Math.PI / 180;
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const hash = (a, b = 0) => rng(a * 7919 + b * 104729 + 13)();
function life(t, a, b, fi = .25, fo = .25) { return Math.min(prog(t, a, a + fi), 1 - prog(t, b - fo, b)); }
const inScene = (t, a, b) => t >= a && t < b;

// "Line boil": hand-drawn wobble that changes 12x per second
let BOIL = 0;
function setTime(t) { BOIL = Math.floor(t * 12); }
const wob = (k, amt = 2.2) => (hash(BOIL, k) - .5) * 2 * amt;

function font(size, weight = 900) { ctx.font = `${weight} ${size}px ${FONT}`; }

// ---------- background ----------
function paper() {
  ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
  // faint notebook dots
  ctx.fillStyle = 'rgba(20,20,20,.07)';
  for (let y = 40; y < H; y += 60) for (let x = 30; x < W; x += 60) { ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill(); }
}
function vignette() {
  const g = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * .75);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(60,40,10,.10)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}

// ---------- text ----------
// Pop-in text with optional highlight box. opts: color, bg, pad, rot, weight, start bounce
function pop(text, x, y, size, t, start, opts = {}) {
  const { color = C.ink, bg = null, bgColor = C.red, pad = 18, rot = 0, weight = 900, dur = .35, end = 1e9, fo = .2, align = 'center', stroke = null, spacing = 0 } = opts;
  const p = prog(t, start, start + dur);
  if (p <= 0) return;
  const out = 1 - prog(t, end - fo, end);
  if (out <= 0) return;
  const s = back(p) * (0.6 + .4 * out);
  ctx.save();
  ctx.globalAlpha *= Math.min(1, p * 3) * out;
  ctx.translate(x, y); ctx.rotate(rot * D2R); ctx.scale(s, s);
  font(size, weight); ctx.letterSpacing = spacing + 'px';
  ctx.textBaseline = 'middle'; ctx.textAlign = align;
  const w = ctx.measureText(text).width;
  if (bg) {
    const bx = align === 'center' ? -w / 2 : align === 'left' ? 0 : -w;
    ctx.fillStyle = bgColor;
    roughRect(bx - pad, -size * .62 - pad * .45, w + pad * 2, size * 1.24 + pad * .9, 7);
    ctx.fill();
  }
  if (stroke) { ctx.lineWidth = size * .14; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.strokeText(text, 0, 0); }
  ctx.fillStyle = color; ctx.fillText(text, 0, 0);
  ctx.letterSpacing = '0px';
  ctx.restore();
}

// Typewriter text (left aligned), returns nothing
function typeText(text, x, y, size, t, start, cps = 28, opts = {}) {
  const { color = C.ink, weight = 700, maxW = 800, lh = 1.25, cursor = true } = opts;
  const n = Math.floor(clamp((t - start) * cps, 0, text.length));
  font(size, weight); ctx.fillStyle = color; ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  const shown = text.slice(0, n);
  const lines = wrap(shown, maxW, text);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * size * lh));
  if (cursor && n < text.length && t >= start && Math.floor(t * 4) % 2 === 0) {
    const last = lines[lines.length - 1] || '';
    ctx.fillRect(x + ctx.measureText(last).width + 4, y + (lines.length - 1) * size * lh, size * .08, size);
  }
}
// wrap "shown" using the line breaks of the full text so lines don't jump
function wrap(shown, maxW, full) {
  const words = full.split(' '); const lines = []; let cur = '';
  for (const w of words) { const test = cur ? cur + ' ' + w : w; if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; }
  lines.push(cur);
  const out = []; let left = shown.length;
  for (let i = 0; i < lines.length && left > 0; i++) { out.push(lines[i].slice(0, left)); left -= lines[i].length + 1; }
  return out.length ? out : [''];
}

// ---------- rough shapes ----------
function roughRect(x, y, w, h, r = 0) {
  ctx.beginPath();
  const j = (k) => wob(k, 1.6);
  ctx.moveTo(x + r + j(1), y + j(2));
  ctx.lineTo(x + w - r + j(3), y + j(4)); ctx.quadraticCurveTo(x + w, y, x + w + j(5), y + r);
  ctx.lineTo(x + w + j(6), y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h + j(7));
  ctx.lineTo(x + r + j(8), y + h + j(9)); ctx.quadraticCurveTo(x, y + h, x + j(10), y + h - r);
  ctx.lineTo(x + j(11), y + r); ctx.quadraticCurveTo(x, y, x + r + j(1), y + j(2));
  ctx.closePath();
}
function inkLine(pts, lw = 10, color = C.ink, k = 0) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); pts.forEach(([x, y], i) => { const a = x + wob(k + i * 2, 1.8), b = y + wob(k + i * 2 + 1, 1.8); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); });
  ctx.stroke(); ctx.restore();
}

// ---------- the stickman ----------
// Pose angles in degrees, absolute: 0 = straight down, 90 = pointing right, -90 = left, 180 = up.
// Arm/leg: [upper, lower]. lean tilts torso (deg, + = leaning right).
const POSE = {
  stand:   { lean: 0, la: [-20, -10], ra: [20, 10], ll: [-12, -4], rl: [12, 4], head: 0 },
  hips:    { lean: 0, la: [-35, 60], ra: [35, -60], ll: [-14, -4], rl: [14, 4], head: 0 },
  cheer:   { lean: 0, la: [-150, -170], ra: [150, 170], ll: [-16, -6], rl: [16, 6], head: 0 },
  shock:   { lean: -6, la: [-130, -165], ra: [130, 165], ll: [-20, -8], rl: [20, 8], head: -6 },
  hold:    { lean: 0, la: [-25, 70], ra: [25, -70], ll: [-12, -4], rl: [12, 4], head: 0 },
  point:   { lean: 4, la: [-20, -10], ra: [100, 115], ll: [-12, -4], rl: [12, 4], head: 6 },
  shrug:   { lean: 0, la: [-60, -150], ra: [60, 150], ll: [-12, -4], rl: [12, 4], head: 8 },
  think:   { lean: 0, la: [-25, -10], ra: [35, -150], ll: [-12, -4], rl: [12, 4], head: 10 },
  sit:     { lean: 6, la: [40, 100], ra: [55, 100], ll: [80, 0], rl: [90, 5], head: 0 },
  type1:   { lean: 8, la: [50, 95], ra: [60, 100], ll: [80, 0], rl: [90, 5], head: 4 },
  type2:   { lean: 8, la: [55, 100], ra: [55, 92], ll: [80, 0], rl: [90, 5], head: 4 },
  walk1:   { lean: 4, la: [25, 10], ra: [-25, -40], ll: [25, 5], rl: [-22, -30], head: 0 },
  walk2:   { lean: 4, la: [-25, -40], ra: [25, 10], ll: [-22, -30], rl: [25, 5], head: 0 },
  give:    { lean: 6, la: [60, 85], ra: [70, 90], ll: [-12, -4], rl: [12, 4], head: 0 },
  aha:     { lean: 0, la: [-25, -10], ra: [150, 175], ll: [-12, -4], rl: [12, 4], head: -4 },
  facepalm:{ lean: 4, la: [-20, -10], ra: [40, 175], ll: [-12, -4], rl: [12, 4], head: 12 },
  relax:   { lean: -3, la: [-40, -150], ra: [40, 150], ll: [-12, -4], rl: [12, 4], head: -8 },
};
function mixPose(a, b, p) {
  const o = {};
  for (const k in a) o[k] = Array.isArray(a[k]) ? [lerp(a[k][0], b[k][0], p), lerp(a[k][1], b[k][1], p)] : lerp(a[k], b[k], p);
  return o;
}
const dir = (deg, len) => [Math.sin(deg * D2R) * len, Math.cos(deg * D2R) * len];

// Draws a stickman with hips at (x, y). Returns joint positions (hands etc.) for attaching props.
// opts: s (scale), face ('smile'|'happy'|'shock'|'sad'|'smug'|'neutral'|'worried'|'cool'), look (-1..1), color, lw, id (boil seed)
function stick(x, y, pose, opts = {}) {
  const { s = 1, face = 'smile', look = 0, color = C.ink, id = 0, mouthOpen = 0, blink = false, flip = false } = opts;
  const lw = (opts.lw || 15) * s;
  const P = flip ? flipPose(pose) : pose;
  const L = { torso: 175 * s, upper: 78 * s, lower: 74 * s, thigh: 92 * s, shin: 92 * s, head: 58 * s };
  const w = (k) => wob(id * 50 + k, 2.2 * s);
  const hip = [x + w(1), y + w(2)];
  const [tx, ty] = dir(180 + P.lean, L.torso);
  const neck = [hip[0] + tx + w(3), hip[1] + ty + w(4)];
  const sh = [lerp(neck[0], hip[0], .1), lerp(neck[1], hip[1], .1)];
  const [hx, hy] = dir(180 + P.lean + P.head, L.head + 8 * s);
  const head = [neck[0] + hx, neck[1] + hy];
  const limb = (o, a, l1, l2, k) => { const [ax, ay] = dir(a[0], l1); const j = [o[0] + ax + w(k), o[1] + ay + w(k + 1)]; const [bx, by] = dir(a[1], l2); return [j, [j[0] + bx + w(k + 2), j[1] + by + w(k + 3)]]; };
  const [le, lh] = limb(sh, P.la, L.upper, L.lower, 10);
  const [re, rh] = limb(sh, P.ra, L.upper, L.lower, 20);
  const [lk, lf] = limb(hip, P.ll, L.thigh, L.shin, 30);
  const [rk, rf] = limb(hip, P.rl, L.thigh, L.shin, 40);
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const seg = (...pts) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke(); };
  seg(hip, neck); seg(sh, le, lh); seg(sh, re, rh); seg(hip, lk, lf); seg(hip, rk, rf);
  // head
  ctx.fillStyle = C.paper;
  ctx.beginPath(); ctx.arc(head[0], head[1], L.head, 0, 7); ctx.fill(); ctx.stroke();
  drawFace(head[0] + look * 16 * s, head[1], L.head, face, s, color, { mouthOpen, blink, id });
  ctx.restore();
  return { hip, neck, head, lh, rh, lf, rf, le, re, headR: L.head };
}
function flipPose(p) { const o = {}; for (const k in p) o[k] = Array.isArray(p[k]) ? [-p[k][0], -p[k][1]] : -p[k]; const t = o.la; o.la = o.ra; o.ra = t; const u = o.ll; o.ll = o.rl; o.rl = u; return o; }

function drawFace(cx, cy, r, face, s, color, { mouthOpen = 0, blink = false } = {}) {
  ctx.save(); ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = 7 * s; ctx.lineCap = 'round';
  const ex = r * .36, ey = -r * .12;
  const dot = (x, y, rr) => { ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill(); };
  const arc = (x, y, rr, a, b) => { ctx.beginPath(); ctx.arc(x, y, rr, a, b); ctx.stroke(); };
  const line = (a, b, c, d) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); };
  if (blink && face !== 'shock') { line(cx - ex - 8 * s, cy + ey, cx - ex + 8 * s, cy + ey); line(cx + ex - 8 * s, cy + ey, cx + ex + 8 * s, cy + ey); }
  switch (face) {
    case 'shock': {
      ctx.fillStyle = C.white; ctx.lineWidth = 5 * s;
      [-1, 1].forEach(d => { ctx.beginPath(); ctx.arc(cx + d * ex, cy + ey - 4 * s, 15 * s, 0, 7); ctx.fill(); ctx.stroke(); });
      ctx.fillStyle = color; dot(cx - ex, cy + ey - 4 * s, 5 * s); dot(cx + ex, cy + ey - 4 * s, 5 * s);
      ctx.beginPath(); ctx.ellipse(cx, cy + r * .42, 13 * s, (17 + mouthOpen * 8) * s, 0, 0, 7); ctx.fill();
      line(cx - ex - 14 * s, cy - r * .55, cx - ex + 10 * s, cy - r * .62); line(cx + ex + 14 * s, cy - r * .55, cx + ex - 10 * s, cy - r * .62);
      break; }
    case 'happy':
      arc(cx - ex, cy + ey + 4 * s, 9 * s, Math.PI * 1.1, Math.PI * 1.9); arc(cx + ex, cy + ey + 4 * s, 9 * s, Math.PI * 1.1, Math.PI * 1.9);
      ctx.beginPath(); ctx.arc(cx, cy + r * .18, r * .38, .1, Math.PI - .1); ctx.closePath(); ctx.fill();
      break;
    case 'sad':
      if (!blink) { dot(cx - ex, cy + ey, 6 * s); dot(cx + ex, cy + ey, 6 * s); }
      arc(cx, cy + r * .62, r * .3, Math.PI * 1.15, Math.PI * 1.85);
      line(cx - ex - 12 * s, cy - r * .42, cx - ex + 8 * s, cy - r * .52); line(cx + ex + 12 * s, cy - r * .42, cx + ex - 8 * s, cy - r * .52);
      break;
    case 'worried':
      if (!blink) { dot(cx - ex, cy + ey, 6 * s); dot(cx + ex, cy + ey, 6 * s); }
      ctx.beginPath(); ctx.moveTo(cx - r * .3, cy + r * .45);
      for (let i = 1; i <= 4; i++) ctx.lineTo(cx - r * .3 + i * r * .15, cy + r * .45 + (i % 2 ? -5 : 5) * s); ctx.stroke();
      line(cx - ex - 12 * s, cy - r * .4, cx - ex + 8 * s, cy - r * .52); line(cx + ex + 12 * s, cy - r * .4, cx + ex - 8 * s, cy - r * .52);
      break;
    case 'smug':
      line(cx - ex - 9 * s, cy + ey, cx - ex + 9 * s, cy + ey); line(cx + ex - 9 * s, cy + ey, cx + ex + 9 * s, cy + ey);
      ctx.beginPath(); ctx.moveTo(cx - r * .25, cy + r * .42); ctx.quadraticCurveTo(cx + r * .1, cy + r * .5, cx + r * .35, cy + r * .28); ctx.stroke();
      line(cx + ex - 12 * s, cy - r * .5, cx + ex + 12 * s, cy - r * .62);
      break;
    case 'cool': // sunglasses
      ctx.fillRect(cx - ex - 20 * s, cy + ey - 10 * s, 36 * s, 20 * s); ctx.fillRect(cx + ex - 16 * s, cy + ey - 10 * s, 36 * s, 20 * s);
      line(cx - ex + 10 * s, cy + ey - 6 * s, cx + ex - 10 * s, cy + ey - 6 * s);
      ctx.beginPath(); ctx.arc(cx, cy + r * .22, r * .3, .3, Math.PI - .3); ctx.stroke();
      break;
    case 'neutral':
      if (!blink) { dot(cx - ex, cy + ey, 6 * s); dot(cx + ex, cy + ey, 6 * s); }
      line(cx - r * .2, cy + r * .42, cx + r * .2, cy + r * .42);
      break;
    default: // smile
      if (!blink) { dot(cx - ex, cy + ey, 6.5 * s); dot(cx + ex, cy + ey, 6.5 * s); }
      if (mouthOpen > .1) { ctx.beginPath(); ctx.ellipse(cx, cy + r * .38, 12 * s, (5 + mouthOpen * 12) * s, 0, 0, 7); ctx.fill(); }
      else arc(cx, cy + r * .12, r * .38, .35, Math.PI - .35);
  }
  ctx.restore();
}
// mouth flaps while VO segment plays
function talk(t, a, b) { return t > a && t < b ? Math.abs(Math.sin(t * 17)) * (0.5 + .5 * Math.abs(Math.sin(t * 5.3))) : 0; }
const blinkAt = (t, seed = 0) => ((t + seed * 1.7) % 3.1) < .12;

// ---------- props ----------
function coin(x, y, r, rot = 0, opts = {}) {
  const { spin = 1 } = opts; // spin: horizontal squash (-1..1)
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(Math.max(.08, Math.abs(spin)), 1);
  ctx.fillStyle = C.gold; ctx.strokeStyle = C.ink; ctx.lineWidth = r * .12;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.goldDark; ctx.lineWidth = r * .06; ctx.beginPath(); ctx.arc(0, 0, r * .78, 0, 7); ctx.stroke();
  if (spin > 0) { font(r * 1.15, 900); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('₿', 0, r * .06); }
  ctx.restore();
}
function pizzaBox(x, y, w, rot = 0, open = 0) {
  const h = w * .22;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.fillStyle = '#e9d3a6'; roughRect(-w / 2, -h / 2, w, h, 6); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(0, 0, h * .28, 0, 7); ctx.fill();
  ctx.restore();
}
function pizza(x, y, r, rot = 0, missing = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.lineWidth = r * .07; ctx.strokeStyle = C.ink;
  ctx.fillStyle = '#e3a548'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, missing, Math.PI * 2); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#f7d36b'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r * .84, missing + .05, Math.PI * 2 - .05); ctx.closePath(); ctx.fill();
  const R = rng(9); ctx.fillStyle = C.red;
  for (let i = 0; i < 9; i++) { const a = R() * 6.28, d = R() * r * .65 + r * .12; if (a > missing + .2 || missing === 0) { ctx.beginPath(); ctx.arc(Math.cos(a) * d, Math.sin(a) * d, r * .1, 0, 7); ctx.fill(); } }
  ctx.strokeStyle = 'rgba(20,20,20,.35)'; ctx.lineWidth = r * .03;
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; if (a >= missing) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r * .84, Math.sin(a) * r * .84); ctx.stroke(); } }
  ctx.restore();
}
function slice(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.fillStyle = '#f7d36b'; ctx.beginPath(); ctx.moveTo(0, 90); ctx.lineTo(-62, -60); ctx.quadraticCurveTo(0, -85, 62, -60); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#e3a548'; ctx.beginPath(); ctx.moveTo(-66, -62); ctx.quadraticCurveTo(0, -92, 66, -62); ctx.quadraticCurveTo(0, -112, -66, -62); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.red; [[-18, -30], [20, -20], [0, 20], [-8, -55], [26, -50]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a, b, 11, 0, 7); ctx.fill(); });
  ctx.restore();
}
function jet(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.fillStyle = C.white; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-120, 0); ctx.quadraticCurveTo(-110, -22, -60, -22); ctx.lineTo(90, -22); ctx.quadraticCurveTo(140, -18, 150, 4); ctx.quadraticCurveTo(120, 18, 60, 18); ctx.lineTo(-100, 18); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-95, -20); ctx.lineTo(-125, -70); ctx.lineTo(-100, -70); ctx.lineTo(-60, -22); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(-40, 60); ctx.lineTo(-10, 60); ctx.lineTo(40, 12); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(-30 + i * 24, -6, 5, 0, 7); ctx.fill(); }
  ctx.fillStyle = C.red; ctx.fillRect(-90, 2, 160, 6);
  ctx.restore();
}
function priceTag(x, y, text, s = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  font(64, 900); const w = ctx.measureText(text).width + 90;
  ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.fillStyle = C.white; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(40, -50); ctx.lineTo(w, -50); ctx.lineTo(w, 50); ctx.lineTo(40, 50); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(32, 0, 10, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, 62, 4);
  ctx.restore();
}
function computer(x, y, s, screenFn) { // old CRT on a desk, (x,y) = desk top center
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.fillStyle = '#e7e1d3'; roughRect(-150, -270, 300, 230, 18); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#20352a'; roughRect(-118, -240, 236, 165, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#e7e1d3'; ctx.beginPath(); ctx.moveTo(-50, -40); ctx.lineTo(50, -40); ctx.lineTo(70, 0); ctx.lineTo(-70, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  if (screenFn) { ctx.save(); ctx.beginPath(); ctx.rect(-112, -234, 224, 153); ctx.clip(); ctx.translate(0, -158); screenFn(); ctx.restore(); }
  ctx.restore();
}
function desk(x, y, w) { inkLine([[x - w / 2, y], [x + w / 2, y]], 12, C.ink, 300); inkLine([[x - w / 2 + 30, y], [x - w / 2 + 30, y + 190]], 10, C.ink, 310); inkLine([[x + w / 2 - 30, y], [x + w / 2 - 30, y + 190]], 10, C.ink, 320); }
function chair(x, y) { inkLine([[x - 60, y], [x + 50, y]], 10, C.ink, 330); inkLine([[x - 50, y], [x - 60, y + 150]], 9, C.ink, 340); inkLine([[x + 40, y], [x + 50, y + 150]], 9, C.ink, 350); inkLine([[x - 60, y], [x - 80, y - 170]], 9, C.ink, 360); }

// motion lines / effects
function speedLines(cx, cy, t, n = 14, r0 = 380, r1 = 900, alpha = .5) {
  ctx.save(); ctx.strokeStyle = `rgba(20,20,20,${alpha})`; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const a = i / n * 6.283 + hash(BOIL, i) * .3; const rr = r0 + hash(BOIL, i + 40) * 80;
    ctx.lineWidth = 4 + hash(BOIL, i + 9) * 6;
    ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.stroke();
  }
  ctx.restore();
}
function burst(cx, cy, r, color = C.gold, spikes = 14, rot = 0) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.fillStyle = color; ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineJoin = 'round';
  ctx.beginPath(); for (let i = 0; i < spikes * 2; i++) { const a = i / (spikes * 2) * 6.283, rr = i % 2 ? r * .72 : r; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function sweat(x, y, s, t) { const k = (t * 1.5) % 1; ctx.save(); ctx.globalAlpha = 1 - k; ctx.fillStyle = '#7ec8f2'; ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.translate(x, y + k * 40); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -24); ctx.quadraticCurveTo(16, 0, 0, 12); ctx.quadraticCurveTo(-16, 0, 0, -24); ctx.fill(); ctx.stroke(); ctx.restore(); }
function confetti(t, start, n = 70, seed = 3) {
  if (t < start) return; const R = rng(seed); const cols = [C.red, C.gold, C.ink, '#7ec8f2'];
  for (let i = 0; i < n; i++) {
    const x0 = R() * W, vy = 260 + R() * 380, sp = R() * 8, col = cols[i % 4], dt = t - start - R() * .4; if (dt < 0) continue;
    const x = x0 + Math.sin(dt * 2 + i) * 50, y = -40 + vy * dt;
    if (y > H) continue;
    ctx.save(); ctx.translate(x, y); ctx.rotate(dt * sp); ctx.fillStyle = col; ctx.fillRect(-10, -5, 20, 10); ctx.restore();
  }
}

// camera helpers
function shake(t, amt) { ctx.translate(Math.sin(t * 91) * amt, Math.cos(t * 77) * amt); }
function zoomAt(cx, cy, z) { ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); }

// ---------- logo (also used standalone in brand/logo.html) ----------
// Red disc, white "aha" stickman with a spark — brand mark. (cx,cy) center, r radius.
function logoMark(cx, cy, r, opts = {}) {
  const { bg = C.red, fg = C.white, ring = C.ink } = opts;
  ctx.save();
  ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
  if (ring) { ctx.lineWidth = r * .06; ctx.strokeStyle = ring; ctx.stroke(); }
  const s = r / 300;
  ctx.strokeStyle = fg; ctx.fillStyle = fg; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 30 * s;
  const hx = cx - 20 * s, hy = cy - 95 * s; // head center
  // body
  const neck = [hx + 6 * s, hy + 62 * s], hip = [hx + 14 * s, cy + 105 * s];
  const seg = (...p) => { ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.stroke(); };
  seg(neck, hip);
  seg([hip[0], hip[1]], [hip[0] - 50 * s, hip[1] + 75 * s], [hip[0] - 62 * s, hip[1] + 150 * s]);
  seg([hip[0], hip[1]], [hip[0] + 55 * s, hip[1] + 75 * s], [hip[0] + 70 * s, hip[1] + 150 * s]);
  const sh = [neck[0] + 2 * s, neck[1] + 25 * s];
  seg(sh, [sh[0] - 70 * s, sh[1] + 60 * s], [sh[0] - 95 * s, sh[1] + 130 * s]);
  seg(sh, [sh[0] + 80 * s, sh[1] - 15 * s], [sh[0] + 105 * s, sh[1] - 110 * s]); // finger up
  // head
  ctx.beginPath(); ctx.arc(hx, hy, 58 * s, 0, 7); ctx.fill();
  // spark above raised finger
  const sx = sh[0] + 112 * s, sy = sh[1] - 175 * s;
  ctx.lineWidth = 18 * s; ctx.strokeStyle = C.gold;
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * .55; seg([sx + Math.cos(a) * 30 * s, sy + Math.sin(a) * 30 * s], [sx + Math.cos(a) * 62 * s, sy + Math.sin(a) * 62 * s]); }
  ctx.restore();
}
function logoWord(cx, cy, size, name, color = C.ink, accent = C.red) {
  // "Stick" ink + "Wise" accent (splits at the first capital after index 0)
  const i = name.slice(1).search(/[A-Z]/) + 1; const a = i > 0 ? name.slice(0, i) : name, b = i > 0 ? name.slice(i) : '';
  font(size, 900); ctx.letterSpacing = (-size * .03) + 'px'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  const wa = ctx.measureText(a).width, wb = ctx.measureText(b).width, x0 = cx - (wa + wb) / 2;
  ctx.fillStyle = color; ctx.fillText(a, x0, cy); ctx.fillStyle = accent; ctx.fillText(b, x0 + wa, cy);
  ctx.letterSpacing = '0px';
  return wa + wb;
}
