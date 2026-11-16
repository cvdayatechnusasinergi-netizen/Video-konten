// Video 3 (final) — Sejarah Apple: "Perusahaan Ini Pernah Hampir Bangkrut" (gaya Remotion).
// Tanpa logo/foto produk asli: produk digambar generik dengan CSS. Timing dari ../data/video3-apple.json.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import T from '../data/video3-apple.json';
import { ACCENT, Background, Captions, FONT, Phone, Scene, cl, fr, useSpring } from './common';
import { Chip, Head, Odometer, Title } from './Video3';

export const APPLE_FRAMES = Math.ceil(T.END * 30);
const SC = T.SC.map(fr);
const cue = (i: number, k: number, f = 0) => { const c = T.CUE[i]; return fr(c[k] + f * (c[k + 1] - c[k]) - T.SC[i]); };
const RED = '#FF4D4F', GREEN = '#22C55E';

const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: 'rgba(255,255,255,.97)', borderRadius: 40, boxShadow: '0 50px 120px rgba(0,0,0,.6)', fontFamily: FONT, color: '#111', ...style }}>{children}</div>
);
const YearChip: React.FC<{ year: string; start: number; top?: number }> = ({ year, start, top = 230 }) => (
  <div style={{ position: 'absolute', top, width: '100%', display: 'flex', justifyContent: 'center', fontFamily: FONT }}><Odometer value={year} start={start} size={150} /></div>
);

// ---------- S0: hook — grafik anjlok lalu melonjak (frame 0 sudah berisi judul) ----------
const PTS: [number, number][] = [[0, .55], [.12, .62], [.2, .5], [.3, .42], [.42, .3], [.5, .08], [.56, .14], [.66, .3], [.76, .5], [.86, .7], [1, .97]];
const S0: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const W = 860, H = 520;
  const prog = interpolate(f, [0, cue(0, 1)], [.2, .55], cl) + interpolate(f, [cue(0, 1), cue(0, 1) + 30], [0, .45], { ...cl, easing: Easing.out(Easing.cubic) });
  const d = PTS.map(([x, y], i) => `${i ? 'L' : 'M'}${x * W},${H - y * H}`).join(' ');
  const up = f >= cue(0, 1);
  const pulse = 1 + .04 * Math.sin(Math.PI * interpolate(f, [cue(0, 0) + 15, cue(0, 0) + 25], [0, 1], cl));
  return (
    <Scene dur={dur} noIn>
      <div style={{ position: 'absolute', top: 240, width: '100%', textAlign: 'center', fontFamily: FONT }}>
        <div style={{ fontSize: 64, fontWeight: 300, color: 'rgba(255,255,255,.9)', letterSpacing: -1 }}>Pernah hampir</div>
        <div style={{ fontSize: 150, fontWeight: 900, color: up ? '#fff' : '#FF6B6B', letterSpacing: -4, transform: `scale(${pulse})` }}>BANGKRUT</div>
      </div>
      <Card style={{ position: 'absolute', left: 70, top: 620, width: 940, padding: '34px 40px 30px', background: 'rgba(16,18,28,.85)', color: '#fff', border: '1px solid rgba(255,255,255,.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}><span>Nilai perusahaan</span><span>1976 – 2018</span></div>
        <svg width={W} height={H} style={{ marginTop: 20, overflow: 'visible' }}>
          {[.25, .5, .75].map(g => <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,.08)" strokeWidth={2} />)}
          <path d={d} fill="none" stroke={up ? '#7EA2FF' : RED} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1}
            strokeDasharray={1} strokeDashoffset={1 - prog} style={{ filter: `drop-shadow(0 0 14px ${up ? '#4F7CFF' : RED})` }} />
          {prog > .5 && <g><circle cx={.5 * W} cy={H - .08 * H} r={16} fill={RED} /><text x={.5 * W} y={H - .08 * H + 60} fill={RED} fontSize={32} fontWeight={800} textAnchor="middle" fontFamily={FONT}>1997</text></g>}
        </svg>
      </Card>
      {up && <Chip text="Salah satu paling bernilai di dunia" start={cue(0, 1) + 22} x={540} y={1300} on size={38} />}
    </Scene>
  );
};

// ---------- S1: 1976, garasi ----------
const RetroPC: React.FC = () => (
  <div style={{ position: 'relative', width: 300, height: 300 }}>
    <div style={{ position: 'absolute', left: 30, top: 0, width: 240, height: 200, borderRadius: 20, background: 'linear-gradient(160deg,#efe6d2,#cfc2a4)', boxShadow: '0 20px 40px rgba(0,0,0,.5)' }}>
      <div style={{ position: 'absolute', inset: 22, borderRadius: 14, background: 'radial-gradient(circle at 40% 40%, #1e3a2a, #08130c)' }}>
        <div style={{ position: 'absolute', left: 18, top: 20, color: '#5CFF8A', fontFamily: '"JetBrains Mono", monospace', fontSize: 22, textShadow: '0 0 8px #5CFF8A' }}>] HELLO_</div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 0, top: 210, width: 300, height: 80, borderRadius: 14, background: 'linear-gradient(180deg,#e7dcc3,#bfb08f)', boxShadow: '0 16px 30px rgba(0,0,0,.5)' }}>
      {Array.from({ length: 3 }, (_, r) => <div key={r} style={{ position: 'absolute', left: 20, right: 20, top: 14 + r * 20, height: 12, borderRadius: 4, background: 'repeating-linear-gradient(90deg,#8d8270 0 18px,transparent 18px 22px)' }} />)}
    </div>
  </div>
);
const Person: React.FC<{ name: string; start: number; x: number; y: number; out?: number }> = ({ name, start, x, y, out = 1e9 }) => {
  const f = useCurrentFrame();
  const s = useSpring(start, 14, 130);
  const o = interpolate(f, [out, out + 12], [0, 1], cl);
  return (
    <Card style={{ position: 'absolute', left: x, top: y + o * 120, width: 400, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20,
      transform: `scale(${s}) rotate(${o * 8}deg)`, opacity: s * (1 - o), border: o > 0 ? `4px solid ${RED}` : 'none' }}>
      <div style={{ width: 76, height: 76, borderRadius: 38, background: 'linear-gradient(135deg,#94a3b8,#475569)', color: '#fff', fontWeight: 800, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name.split(' ').map(w => w[0]).join('')}</div>
      <div><div style={{ fontSize: 22, fontWeight: 700, color: '#8a8f98', letterSpacing: 2 }}>PENDIRI</div><div style={{ fontSize: 38, fontWeight: 800 }}>{name}</div></div>
    </Card>
  );
};
const S1: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const door = interpolate(f, [cue(1, 1), cue(1, 1) + 22], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const g = useSpring(0, 20, 90);
  return (
    <Scene dur={dur}>
      <YearChip year="1976" start={0} />
      <AbsoluteFill style={{ perspective: 1600 }}>
        <div style={{ position: 'absolute', left: 140, top: 480, width: 800, height: 640, transform: `rotateY(-12deg) rotateX(4deg) translateY(${(1 - g) * 400}px)`, transformStyle: 'preserve-3d' }}>
          {/* bangunan garasi */}
          <div style={{ position: 'absolute', left: -40, top: -120, width: 880, height: 160, background: 'linear-gradient(180deg,#3a3f4a,#272b33)', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#2a2e37,#1c1f26)', borderRadius: 10, boxShadow: '0 60px 120px rgba(0,0,0,.7)' }} />
          <div style={{ position: 'absolute', left: 80, top: 120, width: 640, height: 500, overflow: 'hidden', borderRadius: 6, background: 'radial-gradient(70% 60% at 50% 70%, #ffcf8a 0%, #b5692a 45%, #2a160a 100%)' }}>
            <div style={{ position: 'absolute', left: 170, top: 190, opacity: door }}><RetroPC /></div>
            {/* pintu gulung */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 500, transform: `translateY(${-door * 470}px)`,
              background: 'repeating-linear-gradient(180deg,#c9ccd2 0 46px,#9da1a8 46px 50px)', boxShadow: '0 10px 30px rgba(0,0,0,.6)' }} />
          </div>
        </div>
      </AbsoluteFill>
      <Person name="Steve Jobs" start={cue(1, 2)} x={70} y={1170} />
      <Person name="Steve Wozniak" start={cue(1, 2) + 8} x={610} y={1170} />
    </Scene>
  );
};

// ---------- S2: laris, lalu 1985 Jobs didepak ----------
const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const bars = [.25, .38, .55, .72, .9];
  const news = useSpring(cue(2, 2), 15, 110);
  return (
    <Scene dur={dur}>
      <div style={{ opacity: interpolate(f, [cue(2, 1) - 6, cue(2, 1)], [1, 0], cl) }}><Head text="Komputer mereka laris" start={0} top={260} size={64} /></div>
      {f >= cue(2, 1) - 2 && <YearChip year="1985" start={cue(2, 1)} />}
      <Card style={{ position: 'absolute', left: 140, top: 520, width: 800, height: 520, padding: 40, background: 'rgba(16,18,28,.85)', color: '#fff', border: '1px solid rgba(255,255,255,.12)', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}>Penjualan</div>
        <div style={{ position: 'absolute', left: 60, right: 60, bottom: 50, height: 340, display: 'flex', alignItems: 'flex-end', gap: 30 }}>
          {bars.map((b, i) => { const p = interpolate(f, [6 + i * 5, 22 + i * 5], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.4)) });
            return <div key={i} style={{ flex: 1, height: `${b * 100 * p}%`, borderRadius: 14, background: `linear-gradient(180deg,#7EA2FF,${ACCENT})`, boxShadow: `0 0 30px ${ACCENT}66` }} />; })}
        </div>
      </Card>
      <Person name="Steve Jobs" start={-20} x={340} y={1080} out={cue(2, 2) + 6} />
      {f >= cue(2, 2) - 2 && (
        <Card style={{ position: 'absolute', left: 90, right: 90, top: 1080, padding: '30px 36px', transform: `translateY(${(1 - news) * 300}px)`, opacity: news }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 4, color: RED }}>BERITA · 1985</div>
          <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.12, marginTop: 10 }}>Steve Jobs keluar dari perusahaan yang ia dirikan</div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- kartu produk yang membingungkan (S3) lalu dipangkas (S4) ----------
const PRODUCTS = ['Performa 5200', 'Performa 5400', 'Performa 6200', 'Performa 6400', 'Power Mac 4400', 'Power Mac 6500', 'Power Mac 7300', 'Power Mac 7600', 'Power Mac 8600',
  'Power Mac 9600', 'PowerBook 1400', 'PowerBook 2400', 'PowerBook 3400', 'Newton', 'eMate', 'Quadra', 'LaserWriter', 'StyleWriter', 'QuickTake', 'Pippin', 'Workgroup Server', 'Performa 6360'];
const KEEP = [4, 9, 11, 2];
const prodPos = (i: number) => { const r = Math.sin(i * 12.9898) * 43758.5453, a = r - Math.floor(r), b = (Math.sin(i * 78.233) * 9631.2) % 1;
  return { x: 60 + (i % 4) * 245 + a * 40, y: 470 + Math.floor(i / 4) * 175 + Math.abs(b) * 40, rot: (a - .5) * 22 }; };
const ProductCard: React.FC<{ i: number; start: number; drop?: number; keepAt?: number; slot?: { x: number; y: number } }> = ({ i, start, drop = 1e9, keepAt = 1e9, slot }) => {
  const f = useCurrentFrame();
  const s = useSpring(start, 13, 140);
  const p = prodPos(i);
  const keep = KEEP.includes(i);
  const fall = keep ? 0 : interpolate(f, [drop + (i % 7) * 2, drop + 22 + (i % 7) * 2], [0, 1], { ...cl, easing: Easing.in(Easing.cubic) });
  const mv = keep && slot ? interpolate(f, [keepAt, keepAt + 18], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) }) : 0;
  const x = slot ? p.x + (slot.x - p.x) * mv : p.x, y = (slot ? p.y + (slot.y - p.y) * mv : p.y) + fall * 1400;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 230, padding: '18px 18px', borderRadius: 22, background: 'rgba(255,255,255,.95)', fontFamily: FONT,
      boxShadow: '0 20px 40px rgba(0,0,0,.45)', transform: `rotate(${p.rot * (1 - mv) + fall * 60}deg) scale(${s * (1 + mv * .35)})`, opacity: s * (1 - fall * .8) * (mv > 0 ? 0 : 1) }}>
      <div style={{ width: 54, height: 40, borderRadius: 8, background: '#E5E7EB', marginBottom: 10 }} />
      <div style={{ fontSize: 24, fontWeight: 700, color: '#111', lineHeight: 1.15 }}>{PRODUCTS[i]}</div>
    </div>
  );
};
const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const warn = useSpring(cue(3, 2), 14, 120);
  return (
    <Scene dur={dur}>
      <div style={{ opacity: interpolate(f, [cue(3, 1) - 6, cue(3, 1)], [1, 0], cl) }}><Head text="Terlalu banyak produk" start={0} top={260} size={64} /></div>
      {f >= cue(3, 1) - 2 && <YearChip year="1997" start={cue(3, 1)} />}
      {PRODUCTS.map((_, i) => <ProductCard key={i} i={i} start={4 + i * 3} />)}
      {f >= cue(3, 2) - 2 && (
        <Card style={{ position: 'absolute', left: 140, right: 140, top: 760, padding: '40px 40px', textAlign: 'center', transform: `scale(${warn})`, opacity: warn, border: `6px solid ${RED}`, boxShadow: `0 0 120px ${RED}88` }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 4, color: RED }}>PERINGATAN</div>
          <div style={{ fontSize: 58, fontWeight: 900, marginTop: 10, lineHeight: 1.1 }}>Tinggal beberapa bulan dari bangkrut</div>
          <div style={{ marginTop: 22, height: 18, borderRadius: 9, background: '#FDE2E2', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${interpolate(f, [cue(3, 2), dur], [30, 6], cl)}%`, background: RED, borderRadius: 9 }} />
          </div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- S4: Jobs kembali, pangkas 70% -> 4 ----------
const GridCell: React.FC<{ label: string; laptop?: boolean; start: number; x: number; y: number }> = ({ label, laptop, start, x, y }) => {
  const s = useSpring(start, 14, 130);
  return (
    <Card style={{ position: 'absolute', left: x, top: y, width: 380, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, transform: `scale(${s})`, opacity: s }}>
      {laptop ? (
        <div style={{ position: 'relative', width: 200, height: 130 }}>
          <div style={{ position: 'absolute', left: 25, top: 0, width: 150, height: 100, borderRadius: 10, background: '#111', border: '6px solid #d1d5db' }} />
          <div style={{ position: 'absolute', left: 0, top: 100, width: 200, height: 18, borderRadius: '0 0 12px 12px', background: 'linear-gradient(180deg,#d1d5db,#9ca3af)' }} />
        </div>
      ) : (
        <div style={{ position: 'relative', width: 180, height: 150 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 180, height: 120, borderRadius: 12, background: '#111', border: '6px solid #d1d5db' }} />
          <div style={{ position: 'absolute', left: 75, top: 120, width: 30, height: 20, background: '#9ca3af' }} />
          <div style={{ position: 'absolute', left: 45, top: 138, width: 90, height: 10, borderRadius: 5, background: '#9ca3af' }} />
        </div>
      )}
      <div style={{ fontSize: 32, fontWeight: 800 }}>{label}</div>
    </Card>
  );
};
const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const drop = cue(4, 2), grid = cue(4, 3);
  const pct = Math.round(interpolate(f, [drop, drop + 24], [0, 70], cl));
  const gridOn = f >= grid - 4;
  return (
    <Scene dur={dur}>
      <Chip text="Steve Jobs kembali" start={0} x={540} y={300} on size={44} />
      {!gridOn && PRODUCTS.map((_, i) => <ProductCard key={i} i={i} start={-40} drop={drop} />)}
      {f >= drop && !gridOn && <div style={{ position: 'absolute', top: 1250, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 150, fontWeight: 900, color: '#fff', textShadow: `0 0 60px ${RED}` }}>−{pct}%</div>}
      {gridOn && <>
        <div style={{ position: 'absolute', top: 440, left: 120, width: 380, textAlign: 'center', fontFamily: FONT, fontSize: 30, fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: 4 }}>RUMAHAN</div>
        <div style={{ position: 'absolute', top: 440, left: 580, width: 380, textAlign: 'center', fontFamily: FONT, fontSize: 30, fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: 4 }}>PROFESIONAL</div>
        <GridCell label="Komputer meja" start={grid} x={120} y={500} />
        <GridCell label="Komputer meja" start={grid + 4} x={580} y={500} />
        <GridCell label="Laptop" laptop start={grid + 8} x={120} y={840} />
        <GridCell label="Laptop" laptop start={grid + 12} x={580} y={840} />
        <Chip text="Cuma 4 produk" start={grid + 16} x={540} y={1250} on size={46} />
      </>}
    </Scene>
  );
};

// ---------- S5: bangkit — iMac, iPod, iPhone, $1 triliun ----------
const Imac: React.FC = () => (
  <div style={{ position: 'relative', width: 230, height: 240 }}>
    <div style={{ position: 'absolute', inset: '0 0 30px 0', borderRadius: '40px 40px 60px 60px', background: 'linear-gradient(160deg,rgba(80,200,255,.9),rgba(0,120,200,.85))', boxShadow: '0 20px 40px rgba(0,0,0,.5), inset 0 0 30px rgba(255,255,255,.4)' }}>
      <div style={{ position: 'absolute', left: 30, top: 24, right: 30, height: 120, borderRadius: 14, background: '#0b1220' }} />
    </div>
    <div style={{ position: 'absolute', left: 70, bottom: 0, width: 90, height: 34, borderRadius: 10, background: 'rgba(0,120,200,.8)' }} />
  </div>
);
const Ipod: React.FC = () => (
  <div style={{ width: 150, height: 240, borderRadius: 26, background: 'linear-gradient(180deg,#fafafa,#d4d4d8)', boxShadow: '0 20px 40px rgba(0,0,0,.5)', position: 'relative' }}>
    <div style={{ position: 'absolute', left: 18, right: 18, top: 18, height: 86, borderRadius: 8, background: 'linear-gradient(180deg,#bfdbfe,#93c5fd)' }} />
    <div style={{ position: 'absolute', left: 30, top: 122, width: 90, height: 90, borderRadius: 45, background: '#e4e4e7', boxShadow: 'inset 0 2px 6px rgba(0,0,0,.15)' }}>
      <div style={{ position: 'absolute', left: 30, top: 30, width: 30, height: 30, borderRadius: 15, background: '#fafafa' }} />
    </div>
  </div>
);
const Prod: React.FC<{ start: number; x: number; label: string; children: React.ReactNode }> = ({ start, x, label, children }) => {
  const s = useSpring(start, 13, 130);
  return (
    <div style={{ position: 'absolute', left: x, top: 470, width: 300, height: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 26,
      transform: `translateY(${(1 - s) * 200}px) scale(${s})`, opacity: s, fontFamily: FONT }}>
      {children}
      <div style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{label}</div>
    </div>
  );
};
const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const tri = cue(5, 5) + 18;
  const big = useSpring(tri, 14, 110);
  const up = interpolate(f, [cue(5, 4) - 6, cue(5, 4) + 8], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  return (
    <Scene dur={dur}>
      <Head text="Setelah fokus…" start={0} top={250} size={66} />
      <div style={{ transform: `translateY(${-up * 120}px) scale(${1 - up * .35})`, transformOrigin: '50% 40%', opacity: 1 - up * .4, position: 'absolute', inset: 0 }}>
        <Prod start={cue(5, 1)} x={50} label="iMac"><Imac /></Prod>
        <Prod start={cue(5, 2)} x={390} label="iPod"><Ipod /></Prod>
        <Prod start={cue(5, 3)} x={730} label="iPhone"><div style={{ width: 130, height: 265, position: 'relative' }}><div style={{ position: 'absolute', left: 0, top: 0, transform: 'scale(.25)', transformOrigin: '0 0' }}><Phone ry={0} rx={0} wall={0} iconsFrom={-100} /></div></div></Prod>
      </div>
      {f >= cue(5, 4) - 2 && <>
        <div style={{ position: 'absolute', top: 820, width: '100%', display: 'flex', justifyContent: 'center' }}><Odometer value="2018" start={cue(5, 4)} size={110} /></div>
        <div style={{ position: 'absolute', top: 980, width: '100%', textAlign: 'center', fontFamily: FONT, transform: `scale(${big})`, opacity: big }}>
          <div style={{ fontSize: 170, fontWeight: 900, color: '#fff', letterSpacing: -5, textShadow: `0 0 60px ${ACCENT}` }}>$1 TRILIUN</div>
          <div style={{ fontSize: 36, fontWeight: 600, color: 'rgba(255,255,255,.7)', marginTop: 6 }}>Perusahaan Amerika pertama</div>
        </div>
      </>}
    </Scene>
  );
};

// ---------- S6: pelajaran — daftar tugas disaring jadi 3 ----------
const TASKS = ['Balas chat pelanggan', 'Scroll media sosial', 'Belajar skill baru', 'Ikut 5 grup bisnis', 'Rapikan laporan', 'Ganti logo lagi', 'Selesaikan proyek klien'];
const TOP = [0, 2, 6];
const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(6, 1), k2 = cue(6, 2), k4 = cue(6, 4), k5 = cue(6, 5);
  const vs = useSpring(k1, 16, 110), vs2 = useSpring(k2, 16, 110);
  const listOn = f >= cue(6, 3) - 4;
  const card = useSpring(cue(6, 3), 18, 100);
  return (
    <Scene dur={dur}>
      <Head text="Pelajarannya:" start={0} top={250} size={66} />
      {!listOn && <>
        <Card style={{ position: 'absolute', left: 120, right: 120, top: 480, padding: '40px', textAlign: 'center', transform: `scale(${vs})`, opacity: vs, border: `5px solid ${GREEN}` }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: GREEN, letterSpacing: 3 }}>LEBIH BAIK</div>
          <div style={{ fontSize: 60, fontWeight: 900, marginTop: 8 }}>Sedikit, tapi bagus</div>
        </Card>
        <Card style={{ position: 'absolute', left: 120, right: 120, top: 830, padding: '40px', textAlign: 'center', transform: `scale(${vs2})`, opacity: vs2 * .9, background: 'rgba(255,255,255,.8)' }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#9CA3AF', letterSpacing: 3 }}>DARIPADA</div>
          <div style={{ fontSize: 56, fontWeight: 800, marginTop: 8, color: '#6B7280', textDecoration: f > k2 + 20 ? 'line-through' : 'none' }}>Banyak, tapi setengah-setengah</div>
        </Card>
      </>}
      {listOn && (
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 420, padding: '30px 40px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3, marginBottom: 10 }}>DAFTAR KERJAAN</div>
          {TASKS.map((t, i) => {
            const show = interpolate(f, [k4 + i * 3, k4 + 8 + i * 3], [0, 1], cl);
            const top = TOP.includes(i), cut = !top && f > k5 + i, pick = top && f > k5 + 6 + TOP.indexOf(i) * 5;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 0', borderTop: i ? '2px solid #EEF0F3' : 'none', opacity: show * (cut ? .3 : 1), transform: `translateX(${(1 - show) * 40}px)` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, border: `4px solid ${pick ? GREEN : '#D1D5DB'}`, background: pick ? GREEN : 'transparent', color: '#fff', fontSize: 30, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pick ? '✓' : ''}</div>
                <div style={{ fontSize: 42, fontWeight: pick ? 800 : 600, textDecoration: cut ? 'line-through' : 'none', color: pick ? '#111' : '#374151' }}>{t}</div>
              </div>
            );
          })}
        </Card>
      )}
      {f > k5 + 20 && <Chip text="Top 3 hari ini" start={k5 + 20} x={540} y={1360} on size={44} />}
    </Scene>
  );
};

// ---------- S7: ajakan komentar ----------
const S7: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = useSpring(0, 20, 100);
  const opts = ['Main HP', 'Kerjaan numpuk', 'Media sosial', 'Overthinking'];
  const k1 = cue(7, 1);
  const typed = 'Main HP sih…'.slice(0, Math.floor(interpolate(f, [k1, k1 + 26], [0, 12], cl)));
  return (
    <Scene dur={dur}>
      <Card style={{ position: 'absolute', left: 90, right: 90, top: 380, padding: '40px 44px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PERTANYAAN</div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>Apa yang paling susah buat difokusin?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 30 }}>
          {opts.map((o, i) => { const s = interpolate(f, [18 + i * 9, 28 + i * 9], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) }); const sel = i === 0 && f > k1;
            return <div key={i} style={{ fontSize: 40, fontWeight: 700, padding: '16px 30px', borderRadius: 999, transform: `scale(${s})`, opacity: s, background: sel ? ACCENT : '#F1F3F6', color: sel ? '#fff' : '#111' }}>{o}</div>; })}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1060, height: 110, borderRadius: 55, background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.3)',
        display: 'flex', alignItems: 'center', padding: '0 20px 0 40px', fontFamily: FONT, opacity: interpolate(f, [k1 - 8, k1], [0, 1], cl) }}>
        <div style={{ flex: 1, fontSize: 40, color: typed ? '#fff' : 'rgba(255,255,255,.5)' }}>{typed || 'Tulis komentar…'}{Math.floor(f / 8) % 2 ? '|' : ''}</div>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: ACCENT }} />
      </div>
    </Scene>
  );
};

// ---------- S8: penutup (tanpa foto, hanya nama akun) ----------
const S8: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const a = useSpring(0, 16, 110), b = useSpring(8, 16, 110), c = useSpring(14, 16, 110);
  const followed = f > 36, shared = f > 57;
  const press = (at: number) => 1 - .07 * Math.sin(Math.PI * interpolate(f, [at, at + 8], [0, 1], cl));
  return (
    <Scene dur={dur + 1}>
      <div style={{ position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 34, fontWeight: 600, letterSpacing: 12, color: 'rgba(255,255,255,.6)', opacity: a }}>SEJARAH APPLE</div>
      <div style={{ position: 'absolute', top: 560, width: '100%', textAlign: 'center', fontFamily: FONT, opacity: b, transform: `translateY(${(1 - b) * 30}px) scale(${.9 + .1 * b})` }}>
        <div style={{ fontSize: 110, fontWeight: 800, color: '#fff', letterSpacing: -3 }}>Reyo Bian</div>
        <div style={{ fontSize: 36, fontWeight: 500, color: 'rgba(255,255,255,.6)', marginTop: 8 }}>Info teknologi sehari-hari</div>
      </div>
      <div style={{ position: 'absolute', top: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, fontFamily: FONT, opacity: c, transform: `translateY(${(1 - c) * 40}px)` }}>
        <div style={{ width: 600, height: 110, borderRadius: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 800, letterSpacing: 2,
          background: followed ? 'rgba(255,255,255,.12)' : ACCENT, color: '#fff', border: followed ? '2px solid rgba(255,255,255,.4)' : 'none', transform: `scale(${press(32)})`,
          boxShadow: followed ? 'none' : `0 0 60px ${ACCENT}99` }}>{followed ? '✓  Mengikuti' : '+  Follow'}</div>
        <div style={{ width: 600, height: 110, borderRadius: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 800, letterSpacing: 2,
          background: shared ? '#fff' : 'transparent', color: shared ? '#111' : '#fff', border: '2px solid rgba(255,255,255,.6)', transform: `scale(${press(53)})` }}>{shared ? 'Terkirim' : 'Share'}</div>
      </div>
    </Scene>
  );
};

export const AppleHistory: React.FC = () => {
  const scenes = [S0, S1, S2, S3, S4, S5, S6, S7, S8];
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Background />
      {scenes.map((S, i) => {
        const last = i === scenes.length - 1, from = SC[i], dur = (last ? APPLE_FRAMES : SC[i + 1]) - SC[i];
        return <Sequence key={i} from={from} durationInFrames={dur + (last ? 0 : 4)}><S dur={dur + 4} /></Sequence>;
      })}
      <Captions caps={T.CAPS} until={T.SC[8]} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)', pointerEvents: 'none' }} />
      <Audio src={staticFile('video3/voiceover-apple.wav')} />
    </AbsoluteFill>
  );
};
