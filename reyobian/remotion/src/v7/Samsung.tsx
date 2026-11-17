// Video 7 — Sejarah Samsung: "Perusahaan Ini Pernah Membakar 150 Ribu HP" (gaya Remotion).
// Tanpa logo asli: HP & produk digambar generik. Timing: ../data/video7.json.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import T from '../data/video7.json';
import { ACCENT, Background, Captions, FONT, Scene, cl, fr, useSpring } from '../v3/common';
import { Chip, Head, Odometer } from '../v3/Video3';

export const SAMSUNG_FRAMES = Math.ceil(T.END * 30);
const SC = T.SC.map(fr);
const cue = (i: number, k: number, f = 0) => { const c = T.CUE[i]; return fr(c[k] + f * (c[k + 1] - c[k]) - T.SC[i]); };
const RED = '#FF4D4F', GREEN = '#22C55E', FIRE = '#FF8A3D';
const rnd = (i: number) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };

const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: 'rgba(255,255,255,.97)', borderRadius: 40, boxShadow: '0 50px 120px rgba(0,0,0,.6)', fontFamily: FONT, color: '#111', ...style }}>{children}</div>
);
const DarkCard: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: 'rgba(16,18,28,.85)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 40, boxShadow: '0 50px 120px rgba(0,0,0,.6)', fontFamily: FONT, color: '#fff', ...style }}>{children}</div>
);
const YearChip: React.FC<{ year: string; start: number; top?: number; size?: number }> = ({ year, start, top = 230, size = 150 }) => (
  <div style={{ position: 'absolute', top, width: '100%', display: 'flex', justifyContent: 'center', fontFamily: FONT }}><Odometer value={year} start={start} size={size} /></div>
);

// HP jadul berantena (generik)
const OldPhone: React.FC<{ w?: number; burnt?: number; cracked?: boolean }> = ({ w = 110, burnt = 0, cracked }) => {
  const h = w * 2.3;
  return (
    <div style={{ position: 'relative', width: w, height: h + w * .35, filter: `brightness(${1 - burnt * .75}) saturate(${1 - burnt})` }}>
      <div style={{ position: 'absolute', right: w * .18, top: 0, width: w * .12, height: w * .45, borderRadius: w * .06, background: '#2a2d33' }} />
      <div style={{ position: 'absolute', left: 0, top: w * .35, width: w, height: h, borderRadius: w * .22, background: 'linear-gradient(115deg,#2b2f37,#5b616d 40%,#30343c 70%,#4a4f59)', boxShadow: '0 10px 20px rgba(0,0,0,.5)' }}>
        <div style={{ position: 'absolute', left: w * .14, right: w * .14, top: w * .25, height: w * .55, borderRadius: w * .06, background: '#9fc79a' }}>
          {cracked && <svg width="100%" height="100%" style={{ position: 'absolute' }}><path d={`M${w * .1},${w * .05} L${w * .4},${w * .3} L${w * .3},${w * .5} M${w * .4},${w * .3} L${w * .65},${w * .2}`} stroke="#222" strokeWidth={2} fill="none" /></svg>}
        </div>
        <div style={{ position: 'absolute', left: w * .14, right: w * .14, top: w * 1.0, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: w * .06 }}>
          {Array.from({ length: 12 }, (_, i) => <div key={i} style={{ height: w * .16, borderRadius: w * .04, background: '#c9ced8' }} />)}
        </div>
      </div>
    </div>
  );
};

// api + bara
const Fire: React.FC<{ x: number; y: number; w: number; h: number; amount: number }> = ({ x, y, w, h, amount }) => {
  const f = useCurrentFrame();
  if (amount <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, pointerEvents: 'none', mixBlendMode: 'screen' }}>
      {Array.from({ length: 18 }, (_, i) => {
        const ph = (f / 22 + rnd(i)) % 1, bx = rnd(i + 3) * w, s = (80 + rnd(i + 7) * 140) * amount;
        return <div key={i} style={{ position: 'absolute', left: bx - s / 2 + Math.sin(f / 6 + i) * 14, top: h - s - ph * h * .7, width: s, height: s * 1.4, borderRadius: '50% 50% 45% 45%',
          background: `radial-gradient(circle at 50% 70%, rgba(255,240,180,${.9 * (1 - ph)}) 0%, rgba(255,140,40,${.75 * (1 - ph)}) 40%, rgba(220,40,20,0) 75%)`, filter: 'blur(8px)' }} />;
      })}
      {Array.from({ length: 26 }, (_, i) => {
        const ph = (f / 40 + rnd(i + 11)) % 1;
        return <div key={`e${i}`} style={{ position: 'absolute', left: rnd(i + 21) * w + Math.sin(f / 10 + i) * 20, top: h - ph * h * 1.3, width: 6, height: 6, borderRadius: 3,
          background: '#FFB347', boxShadow: '0 0 10px #FF8A3D', opacity: amount * (1 - ph) }} />;
      })}
      <div style={{ position: 'absolute', left: -60, right: -60, bottom: -40, height: h * .6, background: `radial-gradient(ellipse at 50% 100%, rgba(255,120,40,${.45 * amount}), transparent 70%)`, filter: 'blur(20px)' }} />
    </div>
  );
};
const Pile: React.FC<{ n: number; x: number; y: number; w: number; burnt?: number; cracked?: boolean; startAt?: number }> = ({ n, x, y, w, burnt = 0, cracked, startAt = -100 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: 400 }}>
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / 7), col = i % 7;
        const drop = interpolate(f, [startAt + i * 1.2, startAt + i * 1.2 + 10], [-260, 0], { ...cl, easing: Easing.out(Easing.bounce) });
        return <div key={i} style={{ position: 'absolute', left: col * (w / 7.6) + (row % 2) * 30 + rnd(i) * 20, top: 260 - row * 70 + drop + rnd(i + 5) * 20,
          transform: `rotate(${(rnd(i + 9) - .5) * 90}deg)` }}><OldPhone w={70} burnt={burnt} cracked={cracked} /></div>;
      })}
    </div>
  );
};

// ---------- S0: hook — frame 0 sudah lengkap ----------
const S0: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const fire = interpolate(f, [0, 20], [.6, 1], cl);
  return (
    <Scene dur={dur} noIn>
      <div style={{ position: 'absolute', top: 230, width: '100%', textAlign: 'center', fontFamily: FONT }}>
        <div style={{ fontSize: 150, fontWeight: 900, color: '#fff', letterSpacing: -5, textShadow: `0 0 60px ${FIRE}` }}>150 RIBU HP</div>
        <div style={{ fontSize: 76, fontWeight: 300, color: 'rgba(255,255,255,.9)', marginTop: -10 }}>sengaja dibakar</div>
      </div>
      <Pile n={28} x={140} y={720} w={800} burnt={interpolate(f, [0, dur], [.15, .55], cl)} />
      <Fire x={110} y={600} w={860} h={560} amount={fire} />
      {f > cue(0, 1) && <Chip text="…dan itu bikin mereka besar" start={cue(0, 1)} x={540} y={1330} on size={40} />}
    </Scene>
  );
};

// ---------- S1: 1938, toko dagang ----------
const Item: React.FC<{ kind: 'fish' | 'veg' | 'noodle'; start: number; label: string }> = ({ kind, start, label }) => {
  const s = useSpring(start, 13, 140);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, transform: `scale(${s})`, opacity: s }}>
      <div style={{ width: 170, height: 170, borderRadius: 40, background: '#F1F3F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {kind === 'fish' && <div style={{ position: 'relative', width: 120, height: 60 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 90, height: 60, borderRadius: '50%', background: '#C8A16A' }} />
          <div style={{ position: 'absolute', left: 80, top: 8, width: 0, height: 0, borderTop: '22px solid transparent', borderBottom: '22px solid transparent', borderRight: '40px solid #B08550' }} />
          <div style={{ position: 'absolute', left: 16, top: 18, width: 10, height: 10, borderRadius: 5, background: '#3b2a17' }} /></div>}
        {kind === 'veg' && <div style={{ position: 'relative', width: 110, height: 120 }}>
          {[-30, 0, 30].map((r, i) => <div key={i} style={{ position: 'absolute', left: 35, top: 0, width: 40, height: 80, borderRadius: '50% 50% 10% 10%', background: '#22C55E', transform: `rotate(${r}deg)`, transformOrigin: '50% 100%' }} />)}
          <div style={{ position: 'absolute', left: 30, top: 70, width: 50, height: 50, borderRadius: '50%', background: '#F97316' }} /></div>}
        {kind === 'noodle' && <div style={{ position: 'relative', width: 130, height: 110 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ position: 'absolute', left: 18, right: 18, top: 10 + i * 14, height: 24, borderRadius: 12, border: '5px solid #FACC15', borderBottom: 'none' }} />)}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 50, height: 60, borderRadius: '0 0 60px 60px', background: '#EF4444' }} /></div>}
      </div>
      <div style={{ fontSize: 34, fontWeight: 800 }}>{label}</div>
    </div>
  );
};
const S1: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = useSpring(6, 16, 100);
  return (
    <Scene dur={dur}>
      <YearChip year="1938" start={0} />
      <Card style={{ position: 'absolute', left: 90, right: 90, top: 480, padding: '34px 40px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>TOKO DAGANG · DAEGU, KOREA</div>
        <div style={{ fontSize: 56, fontWeight: 900, marginTop: 6 }}>Awalnya jualan…</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          <Item kind="fish" start={cue(1, 1)} label="Ikan kering" />
          <Item kind="veg" start={cue(1, 2)} label="Sayur" />
          <Item kind="noodle" start={cue(1, 3)} label="Mi" />
        </div>
      </Card>
      {f > 20 && (
        <div style={{ position: 'absolute', top: 1110, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <DarkCard style={{ padding: '22px 34px', display: 'flex', alignItems: 'center', gap: 20, opacity: interpolate(f, [20, 30], [0, 1], cl) }}>
            <div style={{ display: 'flex', gap: 8 }}>{[0, 1, 2].map(i => <div key={i} style={{ fontSize: 46, color: '#FACC15', transform: `scale(${interpolate(f, [24 + i * 5, 32 + i * 5], [0, 1], { ...cl, easing: Easing.out(Easing.back(2)) })})` }}>★</div>)}</div>
            <div style={{ fontSize: 38, fontWeight: 700 }}>Samsung = “tiga bintang”</div>
          </DarkCard>
        </div>
      )}
    </Scene>
  );
};

// ---------- S2: 1969 elektronik, murah & pas-pasan ----------
const TV: React.FC<{ on: number }> = ({ on }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'relative', width: 460, height: 400 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 460, height: 340, borderRadius: 40, background: 'linear-gradient(160deg,#8b6b4a,#5c4430)', boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}>
        <div style={{ position: 'absolute', left: 34, top: 34, width: 300, height: 272, borderRadius: 50, background: '#0b0b0b', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: on, background: `repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 2px, transparent 2px 5px), radial-gradient(circle at ${50 + Math.sin(f / 9) * 10}% 45%, #e5e5e5, #6b6b6b 70%)` }} />
        </div>
        {[0, 1].map(i => <div key={i} style={{ position: 'absolute', right: 40, top: 60 + i * 90, width: 56, height: 56, borderRadius: 28, background: '#d6c3a5', boxShadow: 'inset 0 -6px 0 rgba(0,0,0,.2)' }} />)}
      </div>
      <div style={{ position: 'absolute', left: 80, top: 340, width: 20, height: 60, background: '#3b2a1c', transform: 'rotate(10deg)' }} />
      <div style={{ position: 'absolute', right: 80, top: 340, width: 20, height: 60, background: '#3b2a1c', transform: 'rotate(-10deg)' }} />
    </div>
  );
};
const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const tv = useSpring(cue(2, 1) - 6, 16, 90);
  const k2 = cue(2, 2), k3 = cue(2, 3);
  return (
    <Scene dur={dur}>
      <YearChip year="1969" start={0} />
      <Chip text="Masuk bisnis elektronik" start={cue(2, 1)} x={540} y={460} on size={40} />
      <div style={{ position: 'absolute', left: 310, top: 560, transform: `scale(${tv})`, transformOrigin: '50% 100%' }}><TV on={interpolate(f, [cue(2, 1) + 6, cue(2, 1) + 16], [0, 1], cl)} /></div>
      {f > k2 && <Chip text="Murah" start={k2} x={300} y={1080} size={48} />}
      {f > k3 && (
        <Card style={{ position: 'absolute', left: 520, top: 1030, padding: '18px 28px', transform: `scale(${interpolate(f, [k3, k3 + 8], [.6, 1], cl)})`, opacity: interpolate(f, [k3, k3 + 6], [0, 1], cl) }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#8a8f98', letterSpacing: 2 }}>KUALITAS</div>
          <div style={{ fontSize: 46, color: '#FACC15', letterSpacing: 4 }}>★★<span style={{ color: '#D1D5DB' }}>★★★</span></div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- S3: 1995, HP rusak dikumpulkan, dihancurkan, dibakar ----------
const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(3, 1), k2 = cue(3, 2), k3 = cue(3, 3), k4 = cue(3, 4), k5 = cue(3, 5);
  const rep = useSpring(k2, 15, 110);
  const swing = f > k4 && f < k4 + 20 ? Math.sin(((f - k4) / 20) * Math.PI * 2) : 0;
  const fire = interpolate(f, [k5, k5 + 14], [0, 1], cl);
  const pileOn = f > k3 - 4;
  return (
    <Scene dur={dur}>
      <YearChip year="1995" start={0} top={220} size={120} />
      {f > k1 && !pileOn && <Chip text="Bos: Lee Kun-hee" start={k1} x={540} y={400} size={40} />}
      {!pileOn && f > k2 - 2 && (
        <Card style={{ position: 'absolute', left: 120, right: 120, top: 560, padding: '34px 40px', transform: `scale(${rep})`, opacity: rep, border: `5px solid ${RED}` }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: RED, letterSpacing: 3 }}>LAPORAN</div>
          <div style={{ fontSize: 58, fontWeight: 900, marginTop: 8 }}>Banyak HP rusak</div>
          <div style={{ fontSize: 34, color: '#6B7280', marginTop: 6 }}>Keluhan pelanggan terus masuk</div>
        </Card>
      )}
      {pileOn && <>
        <div style={{ position: 'absolute', left: 90, top: 1130, width: 900, height: 14, borderRadius: 7, background: 'rgba(255,255,255,.15)' }} />
        <Pile n={35} x={110} y={760} w={860} startAt={k3 - 2} burnt={fire * .8} cracked={f > k4} />
        <Fire x={90} y={560} w={900} h={620} amount={fire} />
        {f > k4 - 4 && f < k5 + 6 && (
          <div style={{ position: 'absolute', left: 620, top: 560, transformOrigin: '20% 90%', transform: `rotate(${-40 + swing * 60}deg)`, opacity: interpolate(f, [k5, k5 + 6], [1, 0], cl) }}>
            <div style={{ width: 160, height: 80, borderRadius: 14, background: 'linear-gradient(180deg,#9CA3AF,#4B5563)' }} />
            <div style={{ marginLeft: 66, width: 28, height: 260, borderRadius: 10, background: 'linear-gradient(90deg,#8b5a2b,#5c3a1a)' }} />
          </div>
        )}
        {/* barisan karyawan (siluet) */}
        <div style={{ position: 'absolute', left: 60, right: 60, top: 1180, height: 220, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', opacity: interpolate(f, [k5 - 10, k5], [0, 1], cl) }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ position: 'relative', width: 90, height: 170 + (i % 3) * 14 }}>
              <div style={{ position: 'absolute', left: 25, top: 0, width: 40, height: 40, borderRadius: 20, background: '#0b0d14' }} />
              <div style={{ position: 'absolute', left: 25, top: 12, width: 40, height: 8, background: '#fff', opacity: .85 }} />
              <div style={{ position: 'absolute', left: 5, top: 46, width: 80, height: 140, borderRadius: '30px 30px 0 0', background: '#0b0d14' }} />
            </div>
          ))}
        </div>
      </>}
      {f > k3 && f < k4 && <Chip text="±150.000 HP dikumpulkan" start={k3} x={540} y={560} on size={42} />}
      {f > k4 && f < k5 && <Chip text="Dihancurkan" start={k4} x={540} y={560} size={46} />}
      {f > k5 && <Chip text="Dibakar di depan karyawan" start={k5} x={540} y={560} on size={42} />}
    </Scene>
  );
};

// ---------- S4: kualitas nomor satu -> raksasa HP & chip memori ----------
const Chip3D: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'relative', width: 300, height: 300, transform: `rotateX(50deg) rotateZ(${30 + Math.sin(f / 40) * 6}deg)`, transformStyle: 'preserve-3d' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 30, background: 'linear-gradient(135deg,#1f2937,#0b0f17)', boxShadow: `0 40px 80px rgba(0,0,0,.6), 0 0 60px ${ACCENT}55` }} />
      <div style={{ position: 'absolute', inset: 50, borderRadius: 16, background: 'linear-gradient(135deg,#374151,#111827)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,.25) 50%, transparent 65%)', transform: `translateX(${((f * 8) % 600) - 300}px)` }} />
      </div>
      {Array.from({ length: 8 }, (_, i) => ['top', 'bottom', 'left', 'right'].map(side => (
        <div key={side + i} style={{ position: 'absolute', [side]: -22, [side === 'top' || side === 'bottom' ? 'left' : 'top']: 30 + i * 32, width: side === 'top' || side === 'bottom' ? 14 : 22, height: side === 'top' || side === 'bottom' ? 22 : 14, background: '#E5B94F', borderRadius: 3 } as React.CSSProperties} />
      )))}
    </div>
  );
};
const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(4, 1), k2 = cue(4, 2), k3 = cue(4, 3);
  const ban = useSpring(k1, 13, 130);
  const W = 820, H = 260;
  const pts: [number, number][] = [[0, .1], [.2, .16], [.4, .3], [.6, .5], [.8, .75], [1, .97]];
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x * W},${H - y * H}`).join(' ');
  const p = interpolate(f, [k2, k2 + 30], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const big = useSpring(k3, 15, 100);
  const final = f > k3 - 4;
  return (
    <Scene dur={dur}>
      <Head text="Pesannya jelas:" start={0} top={250} size={62} />
      <div style={{ position: 'absolute', left: 90, right: 90, top: 380, padding: '30px 20px', borderRadius: 24, background: '#fff', textAlign: 'center', fontFamily: FONT, fontSize: 70, fontWeight: 900, color: '#111',
        transform: `scale(${ban}) rotate(-2deg)`, opacity: ban, boxShadow: '0 30px 80px rgba(0,0,0,.5)', letterSpacing: 2 }}>KUALITAS NOMOR SATU</div>
      {!final && f > k2 - 6 && (
        <DarkCard style={{ position: 'absolute', left: 90, right: 90, top: 640, padding: '24px 40px 20px' }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}>Sejak itu, Samsung berubah</div>
          <svg width={W} height={H} style={{ marginTop: 14, overflow: 'visible' }}>
            <path d={d} fill="none" stroke="#7EA2FF" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{ filter: `drop-shadow(0 0 14px ${ACCENT})` }} />
          </svg>
        </DarkCard>
      )}
      {final && <>
        <AbsoluteFill style={{ perspective: 1400 }}><div style={{ position: 'absolute', left: 390, top: 640, transform: `scale(${big})` }}><Chip3D /></div></AbsoluteFill>
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 1080, padding: '28px 34px', textAlign: 'center', transform: `translateY(${(1 - big) * 200}px)`, opacity: big }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>SEKARANG</div>
          <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.15, marginTop: 6 }}>Salah satu pembuat HP & chip memori terbesar di dunia</div>
        </Card>
      </>}
    </Scene>
  );
};

// ---------- S5: pelajaran — cek ulang sebelum kirim ----------
const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(5, 1), k2 = cue(5, 2), k3 = cue(5, 3), k4 = cue(5, 4);
  const a = useSpring(k1, 15, 110), b = useSpring(k2, 15, 110), doc = useSpring(k3, 18, 100);
  const part2 = f > k3 - 6;
  const checked = f > k4 + 14;
  const sent = f > k4 + 30;
  return (
    <Scene dur={dur}>
      <Head text="Pelajarannya:" start={0} top={250} size={66} />
      {!part2 && <>
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 430, padding: 36, textAlign: 'center', transform: `scale(${a})`, opacity: a, border: `5px solid ${GREEN}` }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: GREEN, letterSpacing: 3 }}>LEBIH BAIK</div>
          <div style={{ fontSize: 58, fontWeight: 900, marginTop: 6 }}>Buang yang setengah jadi</div>
        </Card>
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 760, padding: 36, textAlign: 'center', transform: `scale(${b})`, opacity: b * .9, background: 'rgba(255,255,255,.8)' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#9CA3AF', letterSpacing: 3 }}>DARIPADA</div>
          <div style={{ fontSize: 52, fontWeight: 800, marginTop: 6, color: '#6B7280', textDecoration: f > k2 + 22 ? 'line-through' : 'none' }}>Serahkan hasil yang jelek</div>
        </Card>
      </>}
      {part2 && (
        <Card style={{ position: 'absolute', left: 100, right: 100, top: 420, padding: '34px 40px', transform: `translateY(${(1 - doc) * 200}px)`, opacity: doc }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>SEBELUM KIRIM KE KLIEN / ATASAN</div>
          <div style={{ marginTop: 20, borderRadius: 24, background: '#F3F4F6', padding: '26px 30px' }}>
            <div style={{ fontSize: 36, fontWeight: 800 }}>Laporan_final.pdf</div>
            {[.95, .8, .9, .6].map((w, i) => <div key={i} style={{ height: 16, width: `${w * 100}%`, borderRadius: 8, background: '#D1D5DB', marginTop: 16 }} />)}
            <div style={{ position: 'absolute', marginTop: -100, marginLeft: interpolate(f, [k4, k4 + 14], [0, 520], cl), width: 80, height: 80, borderRadius: 40, border: `8px solid ${ACCENT}`, opacity: f > k4 && !checked ? 1 : 0 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 26 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, border: `5px solid ${checked ? GREEN : '#D1D5DB'}`, background: checked ? GREEN : 'transparent', color: '#fff', fontSize: 42, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{checked ? '✓' : ''}</div>
            <div style={{ fontSize: 48, fontWeight: 900 }}>Cek ulang sekali lagi</div>
          </div>
          <div style={{ marginTop: 26, height: 96, borderRadius: 48, background: sent ? GREEN : ACCENT, color: '#fff', fontSize: 40, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: interpolate(f, [k4 + 16, k4 + 22], [.35, 1], cl) }}>{sent ? '✓  Terkirim' : 'Kirim'}</div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- S6: ajakan komentar ----------
const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = useSpring(0, 20, 100);
  const opts = ['Tim Samsung', 'Tim iPhone', 'Tim Xiaomi', 'Lainnya'];
  const k2 = cue(6, 2);
  const typed = 'Tim Samsung dari dulu!'.slice(0, Math.floor(interpolate(f, [k2 - 8, k2 + 18], [0, 22], cl)));
  return (
    <Scene dur={dur}>
      <Card style={{ position: 'absolute', left: 90, right: 90, top: 400, padding: '40px 44px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PERTANYAAN</div>
        <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>Kamu tim Samsung, atau merek lain?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 30 }}>
          {opts.map((o, i) => { const s = interpolate(f, [12 + i * 6, 22 + i * 6], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) }); const sel = i === 0 && f > k2 - 8;
            return <div key={i} style={{ fontSize: 40, fontWeight: 700, padding: '14px 28px', borderRadius: 999, transform: `scale(${s})`, opacity: s, background: sel ? ACCENT : '#F1F3F6', color: sel ? '#fff' : '#111' }}>{o}</div>; })}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1040, height: 110, borderRadius: 55, background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.3)',
        display: 'flex', alignItems: 'center', padding: '0 20px 0 40px', fontFamily: FONT, opacity: interpolate(f, [k2 - 14, k2 - 8], [0, 1], cl) }}>
        <div style={{ flex: 1, fontSize: 40, color: typed ? '#fff' : 'rgba(255,255,255,.5)', whiteSpace: 'nowrap', overflow: 'hidden' }}>{typed || 'Tulis komentar…'}{Math.floor(f / 8) % 2 ? '|' : ''}</div>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: ACCENT, flexShrink: 0 }} />
      </div>
    </Scene>
  );
};

// ---------- S7: penutup (tanpa foto, hanya nama akun) ----------
const S7: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const a = useSpring(0, 16, 110), b = useSpring(8, 16, 110), c = useSpring(14, 16, 110);
  const followed = f > 36, shared = f > 57;
  const press = (at: number) => 1 - .07 * Math.sin(Math.PI * interpolate(f, [at, at + 8], [0, 1], cl));
  return (
    <Scene dur={dur + 1}>
      <div style={{ position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 34, fontWeight: 600, letterSpacing: 12, color: 'rgba(255,255,255,.6)', opacity: a }}>SEJARAH SAMSUNG</div>
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

export const SamsungHistory: React.FC = () => {
  const scenes = [S0, S1, S2, S3, S4, S5, S6, S7];
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Background />
      {scenes.map((S, i) => {
        const last = i === scenes.length - 1, from = SC[i], dur = (last ? SAMSUNG_FRAMES : SC[i + 1]) - SC[i];
        return <Sequence key={i} from={from} durationInFrames={dur + (last ? 0 : 4)}><S dur={dur + 4} /></Sequence>;
      })}
      <Captions caps={T.CAPS} until={T.SC[7]} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)', pointerEvents: 'none' }} />
      <Audio src={staticFile('video7/voiceover.wav')} />
    </AbsoluteFill>
  );
};
