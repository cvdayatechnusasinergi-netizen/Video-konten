// Komponen bersama gaya Remotion (Reyo Bian): latar gelap halus, HP 3D, kartu UI, caption.
import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

export const FONT = 'Inter, system-ui, sans-serif';
export const ACCENT = '#4F7CFF';
export const FPS = 30;
export const cl = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const fr = (s: number) => Math.round(s * FPS);

export const useSpring = (start: number, damping = 16, stiffness = 110) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return spring({ frame: f - start, fps, config: { damping, stiffness } });
};

export const Background: React.FC = () => {
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

// pembungkus adegan: masuk (pegas + blur) dan keluar (zoom + blur), kamera pelan mendekat
export const Scene: React.FC<{ dur: number; children: React.ReactNode; noIn?: boolean }> = ({ dur, children, noIn }) => {
  const f = useCurrentFrame();
  const inP = noIn ? 1 : interpolate(f, [0, 10], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) });
  const outP = interpolate(f, [dur - 8, dur], [0, 1], { ...cl, easing: Easing.in(Easing.cubic) });
  const push = interpolate(f, [0, dur], [1, 1.05]);
  const s = push * (noIn ? 1 : interpolate(inP, [0, 1], [.94, 1])) * (1 + outP * .12);
  return (
    <AbsoluteFill style={{ opacity: Math.min(inP, 1 - outP), transform: `scale(${s})`, filter: `blur(${(1 - inP) * 10 + outP * 12}px)` }}>
      {children}
    </AbsoluteFill>
  );
};

export const WALLS = [
  'radial-gradient(120% 80% at 30% 20%, #3b5bdb 0%, #1b2a6b 35%, #0a0f24 75%)',
  'radial-gradient(120% 80% at 70% 20%, #0ea5e9 0%, #155e75 40%, #071a24 80%)',
  'radial-gradient(120% 80% at 30% 30%, #a855f7 0%, #4c1d95 40%, #12071f 80%)',
  'radial-gradient(120% 80% at 60% 25%, #f97316 0%, #9a3412 40%, #1f0b05 80%)',
  'radial-gradient(120% 80% at 40% 20%, #10b981 0%, #065f46 40%, #04140f 80%)',
];
const ICONS = ['#FF5F57', '#FEBC2E', '#28C840', '#4F7CFF', '#A78BFA', '#F472B6', '#22D3EE', '#F59E0B', '#34D399', '#60A5FA', '#E879F9', '#FB7185', '#FACC15', '#4ADE80', '#38BDF8', '#C084FC'];

export const Phone: React.FC<{ ry?: number; rx?: number; wall?: number; iconsFrom?: number; sweepAt?: number; time?: boolean; scale?: number }> =
  ({ ry = 0, rx = 6, wall = 0, iconsFrom = -100, sweepAt = -100, time = true, scale = 1 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: 520, height: 1060, transformStyle: 'preserve-3d', transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 86, background: 'linear-gradient(115deg,#2d2f34 0%,#c9ccd2 18%,#6d7076 45%,#e3e5e9 70%,#3a3c41 100%)',
        boxShadow: '0 80px 160px rgba(0,0,0,.75), 0 0 0 2px rgba(255,255,255,.08) inset' }} />
      <div style={{ position: 'absolute', inset: 10, borderRadius: 78, background: '#020203' }} />
      <div style={{ position: 'absolute', inset: 24, borderRadius: 64, overflow: 'hidden', background: WALLS[wall % WALLS.length] }}>
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 150, height: 40, borderRadius: 20, background: '#000' }} />
        {time && <>
          <div style={{ position: 'absolute', top: 110, width: '100%', textAlign: 'center', color: 'rgba(255,255,255,.95)', fontFamily: FONT, fontWeight: 200, fontSize: 130, letterSpacing: -4 }}>9:41</div>
          <div style={{ position: 'absolute', top: 270, width: '100%', textAlign: 'center', color: 'rgba(255,255,255,.65)', fontFamily: FONT, fontWeight: 500, fontSize: 28 }}>Selasa, 9 Januari</div>
        </>}
        <div style={{ position: 'absolute', top: time ? 380 : 120, left: 42, right: 42, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }}>
          {ICONS.map((c, i) => {
            const p = interpolate(f, [iconsFrom + i * 2, iconsFrom + 15 + i * 2], [0, 1], cl);
            return <div key={i} style={{ aspectRatio: '1', borderRadius: 26, background: `linear-gradient(145deg, ${ICONS[(i + wall * 3) % 16]}, ${ICONS[(i + wall * 3) % 16]}aa)`, opacity: p, transform: `scale(${.6 + .4 * p})`, boxShadow: '0 8px 20px rgba(0,0,0,.3)' }} />;
          })}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,.18) 50%, transparent 65%)',
          transform: `translateX(${interpolate(f, [sweepAt, sweepAt + 50], [-700, 700], cl)}px)` }} />
      </div>
    </div>
  );
};

// HP keypad 3D (era sebelum 2007)
export const KeypadPhone: React.FC<{ ry?: number; rx?: number; sms?: string; hl?: number }> = ({ ry = 0, rx = 6, sms, hl = -1 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: 400, height: 900, transformStyle: 'preserve-3d', transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 70, background: 'linear-gradient(115deg,#1b1c20 0%,#4a4d54 25%,#2a2c31 55%,#5a5d64 80%,#1d1e22 100%)',
        boxShadow: '0 80px 160px rgba(0,0,0,.75), 0 0 0 2px rgba(255,255,255,.06) inset' }} />
      <div style={{ position: 'absolute', top: 60, left: 40, right: 40, height: 300, borderRadius: 18, background: '#0b0d10', padding: 14 }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 10, background: 'linear-gradient(180deg,#9ad1ff,#5fa8e6)', fontFamily: FONT, padding: 20, boxSizing: 'border-box', color: '#0b1a2a' }}>
          <div style={{ fontWeight: 800, fontSize: 30, display: 'flex', justifyContent: 'space-between' }}><span>{sms !== undefined ? 'SMS' : 'Menu'}</span><span>12:30</span></div>
          <div style={{ marginTop: 26, fontWeight: 600, fontSize: 40 }}>{sms ?? ''}{sms !== undefined && Math.floor(f / 8) % 2 ? '|' : ''}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 400, left: 46, right: 46, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {'123456789*0#'.split('').map((k, i) => (
          <div key={i} style={{ height: 88, borderRadius: 24, fontFamily: FONT, fontWeight: 700, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: i === hl ? '#4F7CFF' : 'linear-gradient(180deg,#5b5f67,#33363c)', color: i === hl ? '#fff' : 'rgba(255,255,255,.85)',
            boxShadow: i === hl ? '0 0 40px rgba(79,124,255,.8)' : '0 6px 0 #1a1b1f', transform: i === hl ? 'translateY(4px)' : 'none' }}>{k}</div>
        ))}
      </div>
    </div>
  );
};

export const CommentCard: React.FC<{ name: string; text: string; react: string; start: number; x: number; y: number; z?: number; tilt?: number; width?: number }> =
  ({ name, text, react, start, x, y, z = 0, tilt = 0, width = 420 }) => {
  const f = useCurrentFrame();
  const s = useSpring(start, 14, 120);
  const drift = Math.sin((f + start) / 25) * 10;
  return (
    <div style={{ position: 'absolute', left: x, top: y + drift, transform: `translateZ(${z}px) rotateY(${tilt}deg) scale(${s})`, opacity: s, filter: `blur(${Math.max(0, -z / 140)}px)`,
      background: 'rgba(255,255,255,.96)', borderRadius: 34, padding: '24px 28px', width, boxShadow: '0 30px 80px rgba(0,0,0,.45)', fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: 'linear-gradient(135deg,#94a3b8,#475569)', color: '#fff', fontWeight: 700, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{name[0]}</div>
        <div><div style={{ fontWeight: 700, fontSize: 28, color: '#111' }}>{name}</div><div style={{ fontSize: 22, color: '#8a8f98' }}>2007</div></div>
      </div>
      <div style={{ fontSize: 38, fontWeight: 600, color: '#111', marginTop: 16, lineHeight: 1.2 }}>{text}</div>
      <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 10, background: '#EEF2FF', borderRadius: 20, padding: '8px 16px', color: ACCENT, fontWeight: 700, fontSize: 24 }}>
        <span style={{ width: 22, height: 22, borderRadius: 11, background: ACCENT, display: 'inline-block' }} /> Haha · {react}
      </div>
    </div>
  );
};

// label penunjuk bergaya UI
export const Callout: React.FC<{ text: string; start: number; x: number; y: number; tx: number; ty: number }> = ({ text, start, x, y, tx, ty }) => {
  const s = useSpring(start, 18, 120);
  const len = Math.hypot(tx - x, ty - y), ang = Math.atan2(ty - y, tx - x);
  return (
    <>
      <div style={{ position: 'absolute', left: x, top: y, width: len * s, height: 3, background: 'rgba(255,255,255,.7)', transformOrigin: '0 50%', transform: `rotate(${ang}rad)`, opacity: s }} />
      <div style={{ position: 'absolute', left: tx - 10, top: ty - 10, width: 20, height: 20, borderRadius: 10, background: ACCENT, boxShadow: `0 0 20px ${ACCENT}`, transform: `scale(${s})` }} />
      <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})`, opacity: s, background: 'rgba(255,255,255,.96)', color: '#111',
        fontFamily: FONT, fontWeight: 700, fontSize: 36, padding: '16px 28px', borderRadius: 999, boxShadow: '0 20px 50px rgba(0,0,0,.45)', whiteSpace: 'nowrap' }}>{text}</div>
    </>
  );
};

// caption bawah: kata aktif biru
export const Captions: React.FC<{ caps: { t0: number; t1: number; text: string }[]; until: number }> = ({ caps, until }) => {
  const f = useCurrentFrame(); const t = f / FPS;
  if (t >= until) return null;
  const c = caps.find(c => t >= c.t0 && t < c.t1 + .08); if (!c) return null;
  const ws = c.text.split(' '), L = ws.map(w => w.length + 1), tot = L.reduce((a, b) => a + b, 0);
  let acc = 0; const wt = L.map(l => { const x = c.t0 + (c.t1 - c.t0) * .92 * acc / tot; acc += l; return x; });
  const pin = interpolate(t, [c.t0, c.t0 + .15], [.9, 1], cl);
  return (
    <div style={{ position: 'absolute', left: 90, right: 90, top: 1490, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 46, lineHeight: 1.3,
      transform: `scale(${pin})`, textShadow: '0 4px 24px rgba(0,0,0,.8)' }}>
      {ws.map((w, i) => {
        const on = t >= wt[i], cur = on && (i === ws.length - 1 || t < wt[i + 1]);
        return <span key={i} style={{ color: cur ? '#8FB0FF' : on ? '#fff' : 'rgba(255,255,255,.4)' }}>{w}{' '}</span>;
      })}
    </div>
  );
};
