// Uji gaya Remotion untuk video 3: animasi pegas, kedalaman CSS 3D, kartu komentar bergaya UI asli,
// layar selalu bergerak, teks minimal. Palet netral (hitam/putih) + satu aksen biru.
import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

const FONT = 'Inter, system-ui, sans-serif';
const ACCENT = '#4F7CFF';
const clampOpt = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Background: React.FC = () => {
  const f = useCurrentFrame();
  const blob = (x: number, y: number, s: number, c: string, ph: number) => (
    <div style={{ position: 'absolute', left: x + Math.sin(f / 50 + ph) * 80, top: y + Math.cos(f / 60 + ph) * 60, width: s, height: s,
      borderRadius: '50%', background: c, filter: 'blur(140px)', opacity: .55 }} />
  );
  return (
    <AbsoluteFill style={{ background: '#07070A', overflow: 'hidden' }}>
      {blob(-200, 200, 800, '#1d2b6b', 0)}
      {blob(500, 1100, 900, '#14204d', 2)}
      {blob(200, 1500, 600, '#2a1f55', 4)}
      <AbsoluteFill style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1.5px, transparent 1.5px)', backgroundSize: '44px 44px',
        backgroundPosition: `0px ${(f * 0.6) % 44}px`,
        maskImage: 'radial-gradient(ellipse at 50% 55%, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black 30%, transparent 75%)' }} />
    </AbsoluteFill>
  );
};

// angka tahun bergulir seperti odometer
const Odometer: React.FC<{ value: string; start: number }> = ({ value, start }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {value.split('').map((d, i) => {
        const s = spring({ frame: f - start - i * 4, fps, config: { damping: 18, stiffness: 90 } });
        const target = Number(d), from = (target + 5 + i * 3) % 10, rolls = 10 * (1 + i);
        const pos = interpolate(s, [0, 1], [from, from + rolls + ((target - from + 10) % 10)]);
        return (
          <div key={i} style={{ height: 230, overflow: 'hidden', width: 165, position: 'relative' }}>
            <div style={{ transform: `translateY(${-(pos % 10) * 230}px)` }}>
              {Array.from({ length: 11 }, (_, k) => (
                <div key={k} style={{ height: 230, fontSize: 240, fontWeight: 800, lineHeight: '230px', color: '#fff', fontFamily: FONT, textAlign: 'center', letterSpacing: -8 }}>{k % 10}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Phone: React.FC<{ ry: number; rx: number; z: number }> = ({ ry, rx, z }) => {
  const f = useCurrentFrame();
  const icons = ['#FF5F57', '#FEBC2E', '#28C840', '#4F7CFF', '#A78BFA', '#F472B6', '#22D3EE', '#F59E0B', '#34D399', '#60A5FA', '#E879F9', '#FB7185', '#FACC15', '#4ADE80', '#38BDF8', '#C084FC'];
  return (
    <div style={{ width: 520, height: 1060, transformStyle: 'preserve-3d', transform: `translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg)` }}>
      {/* bingkai logam */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 86, background: 'linear-gradient(115deg,#2d2f34 0%,#c9ccd2 18%,#6d7076 45%,#e3e5e9 70%,#3a3c41 100%)',
        boxShadow: '0 80px 160px rgba(0,0,0,.75), 0 0 0 2px rgba(255,255,255,.08) inset' }} />
      <div style={{ position: 'absolute', inset: 10, borderRadius: 78, background: '#020203' }} />
      {/* layar */}
      <div style={{ position: 'absolute', inset: 24, borderRadius: 64, overflow: 'hidden',
        background: 'radial-gradient(120% 80% at 30% 20%, #3b5bdb 0%, #1b2a6b 35%, #0a0f24 75%)' }}>
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 150, height: 40, borderRadius: 20, background: '#000' }} />
        <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', color: 'rgba(255,255,255,.95)', fontFamily: FONT, fontWeight: 200, fontSize: 130, letterSpacing: -4 }}>9:41</div>
        <div style={{ position: 'absolute', top: 270, width: '100%', textAlign: 'center', color: 'rgba(255,255,255,.65)', fontFamily: FONT, fontWeight: 500, fontSize: 28 }}>Selasa, 9 Januari</div>
        <div style={{ position: 'absolute', top: 380, left: 42, right: 42, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }}>
          {icons.map((c, i) => {
            const p = interpolate(f, [60 + i * 2, 75 + i * 2], [0, 1], clampOpt);
            return <div key={i} style={{ aspectRatio: '1', borderRadius: 26, background: `linear-gradient(145deg, ${c}, ${c}aa)`, opacity: p, transform: `scale(${.6 + .4 * p})`, boxShadow: '0 8px 20px rgba(0,0,0,.3)' }} />;
          })}
        </div>
        {/* kilau kaca menyapu */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,.18) 50%, transparent 65%)',
          transform: `translateX(${interpolate(f, [95, 150], [-700, 700], clampOpt)}px)` }} />
      </div>
    </div>
  );
};

const Comment: React.FC<{ name: string; text: string; react: string; start: number; x: number; y: number; z: number; tilt: number }> = ({ name, text, react, start, x, y, z, tilt }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: f - start, fps, config: { damping: 14, stiffness: 120 } });
  const drift = Math.sin((f + start) / 25) * 10;
  const blur = Math.max(0, -z / 140);
  return (
    <div style={{ position: 'absolute', left: x, top: y + drift, transform: `translateZ(${z}px) rotateY(${tilt}deg) scale(${s})`, opacity: s, filter: `blur(${blur}px)`,
      background: 'rgba(255,255,255,.96)', borderRadius: 34, padding: '24px 28px', width: 420, boxShadow: '0 30px 80px rgba(0,0,0,.45)', fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: 'linear-gradient(135deg,#94a3b8,#475569)', color: '#fff', fontWeight: 700, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name[0]}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 28, color: '#111' }}>{name}</div>
          <div style={{ fontSize: 22, color: '#8a8f98' }}>2007</div>
        </div>
      </div>
      <div style={{ fontSize: 38, fontWeight: 600, color: '#111', marginTop: 16, lineHeight: 1.2 }}>{text}</div>
      <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 10, background: '#EEF2FF', borderRadius: 20, padding: '8px 16px', color: ACCENT, fontWeight: 700, fontSize: 24 }}>
        <span style={{ width: 22, height: 22, borderRadius: 11, background: ACCENT, display: 'inline-block' }} /> Haha · {react}
      </div>
    </div>
  );
};

const Title: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const word = 'DIKETAWAIN';
  const l1 = spring({ frame: f - 118, fps, config: { damping: 20 } });
  return (
    <div style={{ position: 'absolute', top: 230, width: '100%', textAlign: 'center', fontFamily: FONT }}>
      <div style={{ fontSize: 72, fontWeight: 300, color: 'rgba(255,255,255,.9)', opacity: l1, transform: `translateY(${(1 - l1) * 40}px)`, letterSpacing: -1 }}>HP ini sempat</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
        {word.split('').map((ch, i) => {
          const s = spring({ frame: f - 126 - i * 2, fps, config: { damping: 12, stiffness: 140 } });
          return <div key={i} style={{ overflow: 'hidden', height: 170 }}><div style={{ fontSize: 128, fontWeight: 900, color: '#fff', letterSpacing: -3, lineHeight: '170px',
            transform: `translateY(${(1 - s) * 170}px)` }}>{ch}</div></div>;
        })}
      </div>
    </div>
  );
};

export const HookTest: React.FC = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  // babak 1: tahun
  const yearOut = interpolate(f, [52, 66], [1, 0], clampOpt);
  const yearIn = 1;
  // babak 2: HP + komentar
  const ph = spring({ frame: f - 50, fps, config: { damping: 22, stiffness: 70 } });
  const ry = interpolate(ph, [0, 1], [-70, -18]) + Math.sin(f / 40) * 3;
  const cam = interpolate(f, [0, 210], [1, 1.08], { easing: Easing.inOut(Easing.cubic) });
  const lift = interpolate(f, [110, 140], [0, 130], { ...clampOpt, easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Background />
      <AbsoluteFill style={{ transform: `scale(${cam})` }}>
        {/* tahun */}
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: yearIn * yearOut, transform: `scale(${interpolate(f, [52, 66], [1, 1.4], clampOpt)})`, filter: `blur(${(1 - yearOut) * 12}px)` }}>
          <div style={{ fontSize: 34, letterSpacing: 18, color: 'rgba(255,255,255,.55)', fontWeight: 500, marginBottom: 20 }}>TAHUN</div>
          <Odometer value="2007" start={4} />
        </AbsoluteFill>
        {/* panggung 3D */}
        <AbsoluteFill style={{ perspective: 1800, alignItems: 'center', justifyContent: 'center', opacity: interpolate(f, [48, 62], [0, 1], clampOpt) }}>
          <div style={{ position: 'relative', width: 1080, height: 1920, transformStyle: 'preserve-3d', transform: `translateY(${lift}px)` }}>
            <div style={{ position: 'absolute', left: 280, top: 430, transformStyle: 'preserve-3d', transform: `translateY(${(1 - ph) * 500}px)` }}>
              <Phone ry={ry} rx={6} z={0} />
            </div>
            <Comment name="Budi S." text="Enggak ada keyboard-nya?" react="1,2 rb" start={78} x={60} y={560} z={120} tilt={12} />
            <Comment name="Rina A." text="Kemahalan, enggak bakal laku." react="987" start={88} x={530} y={930} z={110} tilt={-14} />
            <Comment name="Andi P." text="Ngetiknya pakai apa?" react="2,3 rb" start={98} x={70} y={1260} z={60} tilt={10} />
          </div>
        </AbsoluteFill>
        <Title />
      </AbsoluteFill>
      {/* vignette */}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.65) 100%)', pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};
