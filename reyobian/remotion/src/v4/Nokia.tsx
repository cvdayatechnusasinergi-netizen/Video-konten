// Video 4 — Sejarah Nokia: "Dulu Raja HP, Terus Ke Mana?" (gaya Remotion).
// Tanpa logo/foto produk asli: HP digambar generik dengan CSS. Timing dari ../data/video4.json.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import T from '../data/video4.json';
import { ACCENT, Background, Captions, FONT, Phone, Scene, cl, fr, useSpring } from '../v3/common';
import { Chip, Head, Odometer } from '../v3/Video3';

export const NOKIA_FRAMES = Math.ceil(T.END * 30);
const SC = T.SC.map(fr);
const cue = (i: number, k: number, f = 0) => { const c = T.CUE[i]; return fr(c[k] + f * (c[k + 1] - c[k]) - T.SC[i]); };
const RED = '#FF4D4F', GREEN = '#22C55E';

const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: 'rgba(255,255,255,.97)', borderRadius: 40, boxShadow: '0 50px 120px rgba(0,0,0,.6)', fontFamily: FONT, color: '#111', ...style }}>{children}</div>
);
const DarkCard: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: 'rgba(16,18,28,.85)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 40, boxShadow: '0 50px 120px rgba(0,0,0,.6)', fontFamily: FONT, color: '#fff', ...style }}>{children}</div>
);
const YearChip: React.FC<{ year: string; start: number; top?: number; size?: number }> = ({ year, start, top = 230, size = 150 }) => (
  <div style={{ position: 'absolute', top, width: '100%', display: 'flex', justifyContent: 'center', fontFamily: FONT }}><Odometer value={year} start={start} size={size} /></div>
);

// HP batangan klasik (generik)
const BarPhone: React.FC<{ scale?: number; ry?: number; dim?: number }> = ({ scale = 1, ry = 0, dim = 0 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: 300, height: 680, transform: `rotateY(${ry}deg) scale(${scale})`, transformStyle: 'preserve-3d', filter: `grayscale(${dim}) brightness(${1 - dim * .45})` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '120px 120px 90px 90px', background: 'linear-gradient(115deg,#1e2a44 0%,#3d5179 30%,#22314f 60%,#4a5f8a 85%,#1b2540 100%)',
        boxShadow: '0 70px 140px rgba(0,0,0,.75), inset 0 0 0 3px rgba(255,255,255,.08)' }} />
      <div style={{ position: 'absolute', left: 110, top: 36, width: 80, height: 10, borderRadius: 5, background: '#0e1525' }} />
      {/* layar monokrom */}
      <div style={{ position: 'absolute', left: 42, top: 80, width: 216, height: 190, borderRadius: 18, background: '#101826', padding: 12, boxSizing: 'border-box' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 8, background: 'linear-gradient(180deg,#b8d8a8,#94bf86)', position: 'relative', fontFamily: '"JetBrains Mono", monospace', color: '#1d3317' }}>
          <div style={{ position: 'absolute', left: 10, top: 8, display: 'flex', gap: 3, alignItems: 'flex-end' }}>{[6, 10, 14, 18].map((h, i) => <div key={i} style={{ width: 5, height: h, background: '#1d3317' }} />)}</div>
          <div style={{ position: 'absolute', right: 10, top: 8, width: 26, height: 12, border: '2px solid #1d3317', borderRadius: 2 }} />
          <div style={{ position: 'absolute', width: '100%', top: 54, textAlign: 'center', fontSize: 40, fontWeight: 700 }}>12:30</div>
          <div style={{ position: 'absolute', width: '100%', bottom: 10, textAlign: 'center', fontSize: 18 }}>Menu{Math.floor(f / 15) % 2 ? '' : ' _'}</div>
        </div>
      </div>
      {/* tombol navigasi */}
      <div style={{ position: 'absolute', left: 90, top: 292, width: 120, height: 56, borderRadius: 28, background: 'linear-gradient(180deg,#7f93bd,#4b5f8c)', boxShadow: '0 6px 0 #18213a' }} />
      <div style={{ position: 'absolute', left: 44, right: 44, top: 372, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {'123456789*0#'.split('').map((k, i) => <div key={i} style={{ height: 52, borderRadius: 18, background: 'linear-gradient(180deg,#d6dbe6,#a9b2c6)', color: '#1b2540',
          fontFamily: FONT, fontWeight: 800, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 0 #6b7690' }}>{k}</div>)}
      </div>
    </div>
  );
};

// ---------- S0: hook — frame 0 sudah lengkap ----------
const S0: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const share = interpolate(f, [0, 20], [.32, .4], cl);
  const gone = interpolate(f, [cue(0, 1), cue(0, 1) + 20], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const R = 260, C = 2 * Math.PI * R;
  return (
    <Scene dur={dur} noIn>
      <div style={{ position: 'absolute', top: 240, width: '100%', textAlign: 'center', fontFamily: FONT }}>
        <div style={{ fontSize: 64, fontWeight: 300, color: 'rgba(255,255,255,.9)' }}>Dulu, hampir</div>
        <div style={{ fontSize: 132, fontWeight: 900, color: '#fff', letterSpacing: -4 }}>4 DARI 10 HP</div>
        <div style={{ fontSize: 56, fontWeight: 600, color: 'rgba(255,255,255,.8)', marginTop: -6 }}>di dunia itu Nokia</div>
      </div>
      <div style={{ position: 'absolute', left: 540 - 330, top: 640, width: 660, height: 660 }}>
        <svg width={660} height={660} style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
          <circle cx={330} cy={330} r={R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={56} />
          <circle cx={330} cy={330} r={R} fill="none" stroke={gone > .5 ? '#6B7280' : ACCENT} strokeWidth={56} strokeLinecap="round"
            strokeDasharray={`${C * share * (1 - gone * .9)} ${C}`} style={{ filter: `drop-shadow(0 0 20px ${gone > .5 ? 'transparent' : ACCENT})` }} />
        </svg>
        <div style={{ position: 'absolute', left: 330 - 150 * .62, top: 330 - 340 * .62, transform: 'scale(.62)', transformOrigin: '0 0' }}><BarPhone dim={gone} /></div>
        <div style={{ position: 'absolute', right: -20, top: 40, fontFamily: FONT, fontWeight: 900, fontSize: 72, color: gone > .5 ? '#9CA3AF' : '#fff' }}>≈40%</div>
      </div>
      {f > cue(0, 1) && <Chip text="Terus, ke mana?" start={cue(0, 1) + 6} x={540} y={1380} on size={46} />}
    </Scene>
  );
};

// ---------- S1: 1865, pabrik kertas ----------
const S1: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(1, 1), k2 = cue(1, 2);
  const card = useSpring(k2 - 6, 16, 100);
  return (
    <Scene dur={dur}>
      <div style={{ opacity: interpolate(f, [k1 - 6, k1], [1, 0], cl) }}><Head text="Awalnya bukan perusahaan HP" start={0} top={300} size={60} /></div>
      {f < k1 && <div style={{ position: 'absolute', left: 390, top: 520, transform: 'scale(.9)', transformOrigin: '50% 0', opacity: interpolate(f, [k1 - 10, k1], [1, 0], cl) }}>
        <div style={{ position: 'relative' }}><BarPhone /><div style={{ position: 'absolute', inset: -20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 380, height: 16, background: RED, borderRadius: 8, transform: `rotate(-35deg) scaleX(${interpolate(f, [12, 26], [0, 1], cl)})`, boxShadow: `0 0 30px ${RED}` }} /></div></div></div>}
      {f >= k1 - 2 && <YearChip year="1865" start={k1} />}
      {f >= k2 - 8 && (
        <Card style={{ position: 'absolute', left: 120, right: 120, top: 560, padding: '44px 44px 40px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card, overflow: 'hidden' }}>
          <div style={{ height: 300, position: 'relative', borderRadius: 24, background: 'linear-gradient(180deg,#E8EEF8,#D3DCEA)', overflow: 'hidden' }}>
            {/* gulungan kertas + lembaran yang keluar */}
            {[0, 1, 2].map(i => (
              <div key={i} style={{ position: 'absolute', left: 60 + i * 230, top: 70, width: 150, height: 150, borderRadius: 75, background: 'radial-gradient(circle,#fff 0 22%,#c9b98f 23% 26%,#f3ecd9 27%)', boxShadow: '0 16px 30px rgba(0,0,0,.25)',
                transform: `rotate(${f * 4}deg)` }} />
            ))}
            {[0, 1, 2, 3].map(i => { const x = ((f * 6 + i * 160) % 760) - 120;
              return <div key={i} style={{ position: 'absolute', left: x, top: 240, width: 120, height: 40, background: '#fff', borderRadius: 4, boxShadow: '0 6px 12px rgba(0,0,0,.15)' }} />; })}
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 4, color: ACCENT, marginTop: 30 }}>FINLANDIA · 1865</div>
          <div style={{ fontSize: 64, fontWeight: 900, marginTop: 6 }}>Pabrik kertas</div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- S2: terus berubah -> raja HP ----------
const Step: React.FC<{ text: string; start: number; x: number; y: number; hl?: boolean }> = ({ text, start, x, y, hl }) => (
  <Chip text={text} start={start} x={x} y={y} on={hl} size={46} />
);
const Arrow: React.FC<{ start: number; x1: number; y1: number; x2: number; y2: number }> = ({ start, x1, y1, x2, y2 }) => {
  const f = useCurrentFrame(); const p = interpolate(f, [start, start + 8], [0, 1], cl);
  const len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1);
  return <div style={{ position: 'absolute', left: x1, top: y1, width: len * p, height: 5, borderRadius: 3, background: 'rgba(255,255,255,.6)', transformOrigin: '0 50%', transform: `rotate(${ang}rad)` }} />;
};
const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k5 = cue(2, 5);
  const ph = useSpring(cue(2, 4), 16, 90);
  const units = Math.round(interpolate(f, [k5 + 10, k5 + 45], [0, 200], { ...cl, easing: Easing.out(Easing.cubic) }));
  return (
    <Scene dur={dur}>
      <Head text="Mereka terus berubah:" start={0} top={250} size={62} />
      <Step text="Kertas" start={cue(2, 1)} x={300} y={460} />
      <Arrow start={cue(2, 2) - 4} x1={420} y1={460} x2={650} y2={460} />
      <Step text="Karet" start={cue(2, 2)} x={780} y={460} />
      <Arrow start={cue(2, 3) - 4} x1={760} y1={510} x2={330} y2={590} />
      <Step text="Kabel" start={cue(2, 3)} x={300} y={620} />
      <Arrow start={cue(2, 4) - 4} x1={420} y1={620} x2={650} y2={620} />
      <Step text="Raja HP" start={cue(2, 4)} x={780} y={620} hl />
      <div style={{ position: 'absolute', left: 540 - 150 * .7, top: 720 + (1 - ph) * 500, transform: 'scale(.7)', transformOrigin: '0 0', perspective: 1400 }}>
        <BarPhone ry={Math.sin(f / 25) * 12} />
      </div>
      {f > k5 && (
        <DarkCard style={{ position: 'absolute', left: 140, right: 140, top: 1210, padding: '22px 30px', textAlign: 'center', transform: `scale(${interpolate(f, [k5, k5 + 10], [.8, 1], cl)})`, opacity: interpolate(f, [k5, k5 + 8], [0, 1], cl) }}>
          <div style={{ fontSize: 30, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>Nokia 1100 terjual</div>
          <div style={{ fontSize: 110, fontWeight: 900, letterSpacing: -3, textShadow: `0 0 40px ${ACCENT}` }}>{units} juta+</div>
        </DarkCard>
      )}
    </Scene>
  );
};

// ---------- S3: 2007, layar sentuh datang; Nokia terlalu nyaman ----------
const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(3, 1), k2 = cue(3, 2), k3 = cue(3, 3);
  const push = interpolate(f, [k1, k1 + 20], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const shake = f > k2 && f < k2 + 12 ? Math.sin(f * 3) * 10 : 0;
  return (
    <Scene dur={dur}>
      <YearChip year="2007" start={0} />
      <div style={{ position: 'absolute', left: 390 - push * 300 + shake, top: 560, transform: `scale(${.8 - push * .12})`, transformOrigin: '50% 0' }}>
        <BarPhone dim={interpolate(f, [k2, k2 + 15], [0, .8], cl)} />
      </div>
      <AbsoluteFill style={{ perspective: 1800 }}>
        {[0, 1, 2].map(i => { const s = interpolate(f, [k1 + i * 4, k1 + 22 + i * 4], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) });
          return <div key={i} style={{ position: 'absolute', left: 1200 - s * (840 - i * 150), top: 520 + i * 40, transformStyle: 'preserve-3d', zIndex: 3 - i }}>
            <Phone ry={-20 + i * 6} wall={i + 1} time={false} iconsFrom={-100} scale={.62 - i * .04} /></div>; })}
      </AbsoluteFill>
      {f > k1 + 6 && <Chip text="Layar sentuh & Android" start={k1 + 6} x={720} y={470} on size={40} />}
      {f > k2 && <div style={{ position: 'absolute', left: 60, top: 1180, transform: `rotate(-6deg) scale(${interpolate(f, [k2, k2 + 8], [1.6, 1], cl)})`, opacity: interpolate(f, [k2, k2 + 6], [0, 1], cl),
        fontFamily: FONT, fontWeight: 900, fontSize: 56, color: RED, border: `6px solid ${RED}`, borderRadius: 20, padding: '12px 26px', background: 'rgba(0,0,0,.6)', boxShadow: `0 0 50px ${RED}66` }}>TERLALU NYAMAN</div>}
      {f > k3 && <Chip text="Telat berubah" start={k3} x={300} y={1370} size={44} />}
    </Scene>
  );
};

// ---------- S4: pangsa pasar anjlok, 2013 dijual ----------
const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const W = 820, H = 380;
  const pts: [number, number][] = [[0, .95], [.17, .98], [.33, .8], [.5, .55], [.67, .3], [.83, .12], [1, .05]];
  const p = interpolate(f, [4, cue(4, 1)], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x * W},${H - y * H}`).join(' ');
  const news = useSpring(cue(4, 2), 15, 110);
  return (
    <Scene dur={dur}>
      <Head text="Pangsa pasarnya anjlok" start={0} top={250} size={62} />
      <DarkCard style={{ position: 'absolute', left: 90, right: 90, top: 400, padding: '30px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}><span>Pangsa pasar HP Nokia</span><span>2007 → 2013</span></div>
        <svg width={W} height={H} style={{ marginTop: 20, overflow: 'visible' }}>
          {[.25, .5, .75].map(g => <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,.08)" strokeWidth={2} />)}
          <path d={d} fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{ filter: `drop-shadow(0 0 14px ${RED})` }} />
        </svg>
      </DarkCard>
      {f >= cue(4, 2) - 2 && (
        <Card style={{ position: 'absolute', left: 90, right: 90, top: 1000, padding: '30px 36px', transform: `translateY(${(1 - news) * 300}px)`, opacity: news }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 4, color: RED }}>BERITA · 2013</div>
          <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.12, marginTop: 10 }}>Bisnis HP Nokia dijual ke Microsoft</div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- S5: enggak mati — pindah ke jaringan 4G/5G ----------
const Tower: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'relative', width: 360, height: 560 }}>
      <svg width={360} height={560} style={{ position: 'absolute' }}>
        <g stroke="#cfd6e6" strokeWidth={8} strokeLinecap="round" fill="none">
          <line x1={180} y1={90} x2={80} y2={540} /><line x1={180} y1={90} x2={280} y2={540} />
          <line x1={120} y1={360} x2={240} y2={360} /><line x1={100} y1={450} x2={260} y2={450} /><line x1={140} y1={270} x2={220} y2={270} />
          <line x1={120} y1={360} x2={260} y2={450} /><line x1={240} y1={360} x2={100} y2={450} />
        </g>
        <rect x={150} y={110} width={60} height={110} rx={10} fill="#e5e9f2" />
      </svg>
      {[0, 1, 2].map(k => { const p = ((f / 30) * .9 + k / 3) % 1;
        return <div key={k} style={{ position: 'absolute', left: 180 - (60 + p * 260), top: 160 - (60 + p * 260), width: (60 + p * 260) * 2, height: (60 + p * 260) * 2, borderRadius: '50%',
          border: `6px solid rgba(79,124,255,${1 - p})`, clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }} />; })}
      <div style={{ position: 'absolute', left: 166, top: 150, width: 28, height: 28, borderRadius: 14, background: ACCENT, boxShadow: `0 0 30px ${ACCENT}` }} />
    </div>
  );
};
const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(5, 1), k2 = cue(5, 2), k3 = cue(5, 3);
  const tw = useSpring(k1 - 4, 18, 90);
  const ph = useSpring(k2, 16, 100);
  return (
    <Scene dur={dur}>
      <Head text="Tapi Nokia enggak mati." start={0} top={250} size={66} />
      {f > k1 - 6 && <div style={{ position: 'absolute', left: 90, top: 520 + (1 - tw) * 400, opacity: tw }}><Tower /></div>}
      {f > k1 + 4 && <Chip text="Bisnis jaringan" start={k1 + 4} x={270} y={1150} on size={42} />}
      {f > k2 - 2 && <AbsoluteFill style={{ perspective: 1600 }}><div style={{ position: 'absolute', left: 560, top: 560 + (1 - ph) * 600, transformStyle: 'preserve-3d' }}>
        <Phone ry={-16} wall={1} time iconsFrom={-100} scale={.62} /></div></AbsoluteFill>}
      {['4G', '5G'].map((g, i) => f > k2 + 8 + i * 6 && <Chip key={g} text={g} start={k2 + 8 + i * 6} x={720 + i * 160} y={520} on={i === 1} size={48} />)}
      {f > k3 && <Card style={{ position: 'absolute', left: 120, right: 120, top: 1335, padding: '20px 30px', textAlign: 'center', fontSize: 38, fontWeight: 800,
        transform: `scale(${interpolate(f, [k3, k3 + 8], [.8, 1], cl)})`, opacity: interpolate(f, [k3, k3 + 6], [0, 1], cl) }}>Sinyal kamu bisa lewat perangkat Nokia</Card>}
    </Scene>
  );
};

// ---------- S6: pelajaran ----------
const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(6, 1), k2 = cue(6, 2), k3 = cue(6, 3), k4 = cue(6, 4), k5 = cue(6, 5);
  const a = useSpring(k1, 16, 110), b = useSpring(k2, 16, 110), q = useSpring(k4 - 4, 16, 100), w = useSpring(k5, 16, 110);
  const part2 = f >= k3 - 4;
  const ticked = f > k5 + 24;
  return (
    <Scene dur={dur}>
      <Head text="Pelajarannya:" start={0} top={250} size={66} />
      {!part2 && <>
        <Card style={{ position: 'absolute', left: 120, right: 120, top: 460, padding: 40, textAlign: 'center', transform: `scale(${a})`, opacity: a, border: `5px solid ${RED}` }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: RED, letterSpacing: 3 }}>YANG BIKIN JATUH</div>
          <div style={{ fontSize: 64, fontWeight: 900, marginTop: 6 }}>Terlalu nyaman</div>
        </Card>
        <Card style={{ position: 'absolute', left: 120, right: 120, top: 800, padding: 40, textAlign: 'center', transform: `scale(${b})`, opacity: b, border: `5px solid ${GREEN}` }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: GREEN, letterSpacing: 3 }}>YANG BIKIN BANGKIT</div>
          <div style={{ fontSize: 64, fontWeight: 900, marginTop: 6 }}>Berani berubah</div>
        </Card>
      </>}
      {part2 && <>
        <Card style={{ position: 'absolute', left: 100, right: 100, top: 430, padding: '36px 40px', transform: `translateY(${(1 - q) * 200}px)`, opacity: Math.max(q, interpolate(f, [k3 - 4, k3 + 4], [0, 1], cl)) }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>TANYA DIRI KAMU</div>
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.15, marginTop: 10 }}>Skill apa yang mungkin enggak kepakai 5 tahun lagi?</div>
        </Card>
        {f > k5 - 4 && (
          <Card style={{ position: 'absolute', left: 100, right: 100, top: 900, padding: '34px 40px', display: 'flex', alignItems: 'center', gap: 28, transform: `scale(${w})`, opacity: w, border: `5px solid ${ticked ? GREEN : '#E5E7EB'}` }}>
            <div style={{ width: 84, height: 84, borderRadius: 20, border: `6px solid ${ticked ? GREEN : '#D1D5DB'}`, background: ticked ? GREEN : 'transparent', color: '#fff', fontSize: 56, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ticked ? '✓' : ''}</div>
            <div><div style={{ fontSize: 26, fontWeight: 800, color: '#8a8f98', letterSpacing: 3 }}>MINGGU INI</div><div style={{ fontSize: 52, fontWeight: 900 }}>Pelajari 1 hal baru</div></div>
          </Card>
        )}
      </>}
    </Scene>
  );
};

// ---------- S7: ajakan komentar ----------
const S7: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = useSpring(0, 20, 100);
  const opts = ['3310', '1100', 'N70', 'E63'];
  const k1 = cue(7, 1);
  const typed = '3310 dong!'.slice(0, Math.floor(interpolate(f, [k1 - 6, k1 + 16], [0, 10], cl)));
  return (
    <Scene dur={dur}>
      <Card style={{ position: 'absolute', left: 90, right: 90, top: 400, padding: '40px 44px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PERTANYAAN</div>
        <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>HP Nokia pertama kamu tipe apa?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 30 }}>
          {opts.map((o, i) => { const s = interpolate(f, [12 + i * 6, 22 + i * 6], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) }); const sel = i === 0 && f > k1 - 6;
            return <div key={i} style={{ fontSize: 44, fontWeight: 800, padding: '16px 34px', borderRadius: 999, transform: `scale(${s})`, opacity: s, background: sel ? ACCENT : '#F1F3F6', color: sel ? '#fff' : '#111' }}>{o}</div>; })}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1000, height: 110, borderRadius: 55, background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.3)',
        display: 'flex', alignItems: 'center', padding: '0 20px 0 40px', fontFamily: FONT, opacity: interpolate(f, [k1 - 12, k1 - 6], [0, 1], cl) }}>
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
      <div style={{ position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 34, fontWeight: 600, letterSpacing: 12, color: 'rgba(255,255,255,.6)', opacity: a }}>SEJARAH NOKIA</div>
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

export const NokiaHistory: React.FC = () => {
  const scenes = [S0, S1, S2, S3, S4, S5, S6, S7, S8];
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Background />
      {scenes.map((S, i) => {
        const last = i === scenes.length - 1, from = SC[i], dur = (last ? NOKIA_FRAMES : SC[i + 1]) - SC[i];
        return <Sequence key={i} from={from} durationInFrames={dur + (last ? 0 : 4)}><S dur={dur + 4} /></Sequence>;
      })}
      <Captions caps={T.CAPS} until={T.SC[8]} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)', pointerEvents: 'none' }} />
      <Audio src={staticFile('video4/voiceover.wav')} />
    </AbsoluteFill>
  );
};
