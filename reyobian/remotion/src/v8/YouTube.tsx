// Video 8 — Sejarah YouTube: "YouTube Awalnya Situs Cari Jodoh" (gaya Remotion).
// Tanpa logo asli: pemutar & situs video generik (aksen biru, bukan merah). Timing: ../data/video8.json.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import T from '../data/video8.json';
import { ACCENT, Background, Captions, FONT, Scene, cl, fr, useSpring } from '../v3/common';
import { Chip, Head, Odometer } from '../v3/Video3';

export const YT_FRAMES = Math.ceil(T.END * 30);
const SC = T.SC.map(fr);
const cue = (i: number, k: number, f = 0) => { const c = T.CUE[i]; return fr(c[k] + f * (c[k + 1] - c[k]) - T.SC[i]); };
const RED = '#FF4D4F', GREEN = '#22C55E', PINK = '#F472B6';
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
const Heart: React.FC<{ size: number; color?: string }> = ({ size, color = PINK }) => (
  <div style={{ position: 'relative', width: size, height: size * .9 }}>
    <div style={{ position: 'absolute', left: size * .25, top: 0, width: size * .5, height: size * .8, borderRadius: `${size * .25}px ${size * .25}px 0 0`, background: color, transform: 'rotate(-45deg)', transformOrigin: '0 100%' }} />
    <div style={{ position: 'absolute', left: size * .25, top: 0, width: size * .5, height: size * .8, borderRadius: `${size * .25}px ${size * .25}px 0 0`, background: color, transform: 'rotate(45deg) translateX(0)', transformOrigin: '100% 100%' }} />
  </div>
);
const Play: React.FC<{ size: number; color?: string }> = ({ size, color = '#fff' }) => (
  <div style={{ width: 0, height: 0, borderTop: `${size * .5}px solid transparent`, borderBottom: `${size * .5}px solid transparent`, borderLeft: `${size * .85}px solid ${color}`, marginLeft: size * .15 }} />
);
const Person: React.FC<{ name: string; start: number; x: number; y: number; sub?: string }> = ({ name, start, x, y, sub = 'PENDIRI' }) => {
  const s = useSpring(start, 14, 130);
  return (
    <Card style={{ position: 'absolute', left: x, top: y, width: 400, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 18, transform: `scale(${s})`, opacity: s }}>
      <div style={{ width: 66, height: 66, borderRadius: 33, background: 'linear-gradient(135deg,#94a3b8,#475569)', color: '#fff', fontWeight: 800, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{name.split(' ').map(w => w[0]).join('')}</div>
      <div><div style={{ fontSize: 20, fontWeight: 700, color: '#8a8f98', letterSpacing: 2 }}>{sub}</div><div style={{ fontSize: 34, fontWeight: 800 }}>{name}</div></div>
    </Card>
  );
};
const Browser: React.FC<{ title: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ title, children, style }) => (
  <Card style={{ overflow: 'hidden', padding: 0, ...style }}>
    <div style={{ height: 64, background: '#E5E7EB', display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px' }}>
      {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />)}
      <div style={{ flex: 1, marginLeft: 16, height: 38, borderRadius: 19, background: '#fff', fontSize: 22, color: '#6B7280', display: 'flex', alignItems: 'center', padding: '0 18px' }}>{title}</div>
    </div>
    {children}
  </Card>
);

// ---------- S0: hook — frame 0 sudah lengkap ----------
const S0: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const pulse = 1 + .06 * Math.sin(f / 4);
  return (
    <Scene dur={dur} noIn>
      <div style={{ position: 'absolute', top: 230, width: '100%', textAlign: 'center', fontFamily: FONT }}>
        <div style={{ fontSize: 64, fontWeight: 300, color: 'rgba(255,255,255,.9)' }}>YouTube awalnya</div>
        <div style={{ fontSize: 118, fontWeight: 900, color: '#fff', letterSpacing: -4, lineHeight: 1.05 }}>SITUS CARI<br />JODOH?!</div>
      </div>
      <Browser title="situs-video-kencan.com · 2005" style={{ position: 'absolute', left: 110, right: 110, top: 610 }}>
        <div style={{ padding: '26px 30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 40, fontWeight: 800 }}><div style={{ transform: `scale(${pulse})` }}><Heart size={44} /></div>Cari jodoh lewat video</div>
          <div style={{ display: 'flex', gap: 18, marginTop: 22 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 170, borderRadius: 20, background: 'linear-gradient(160deg,#E5E7EB,#CBD5E1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 70, height: 70, borderRadius: 35, background: 'rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Play size={28} /></div></div>)}
          </div>
          <div style={{ marginTop: 22, fontSize: 32, fontWeight: 700, color: f > cue(0, 1) ? RED : '#6B7280' }}>Video diunggah: 0</div>
        </div>
      </Browser>
    </Scene>
  );
};

// ---------- S1: 2005, tiga eks PayPal, video kencan, slogan ----------
const S1: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k2 = cue(1, 2), k4 = cue(1, 4);
  const ban = useSpring(k4, 13, 130);
  return (
    <Scene dur={dur}>
      <YearChip year="2005" start={0} top={210} size={130} />
      <Chip text="Eks karyawan PayPal" start={cue(1, 1)} x={540} y={430} on size={40} />
      <Person name="Chad Hurley" start={k2} x={90} y={520} />
      <Person name="Steve Chen" start={k2 + 10} x={590} y={520} />
      <Person name="Jawed Karim" start={k2 + 20} x={340} y={680} />
      <Chip text="Bikin situs video kencan" start={cue(1, 3)} x={540} y={900} size={42} />
      {f > k4 - 2 && (
        <div style={{ position: 'absolute', left: 120, right: 120, top: 1010, padding: '30px 20px', borderRadius: 30, background: `linear-gradient(135deg,${PINK},#A855F7)`, textAlign: 'center',
          fontFamily: FONT, fontSize: 68, fontWeight: 900, color: '#fff', transform: `scale(${ban}) rotate(-2deg)`, opacity: ban, boxShadow: `0 30px 80px ${PINK}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{ transform: `scale(${1 + .1 * Math.sin(f / 4)})` }}><Heart size={56} color="#fff" /></div>“Tune In, Hook Up”
        </div>
      )}
    </Scene>
  );
};

// ---------- S2: tawarkan $20, tetap sepi ----------
const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const ad = useSpring(0, 16, 110);
  const k1 = cue(2, 1);
  const roll = interpolate(f, [k1 - 6, dur], [-200, 1200], cl);
  return (
    <Scene dur={dur}>
      <Card style={{ position: 'absolute', left: 110, right: 110, top: 330, padding: '34px 40px', transform: `scale(${ad}) rotate(-1.5deg)`, opacity: ad, border: `5px solid ${GREEN}` }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: GREEN, letterSpacing: 3 }}>IKLAN · 2005</div>
        <div style={{ fontSize: 58, fontWeight: 900, marginTop: 8, lineHeight: 1.1 }}>Unggah video kencanmu, dapat <span style={{ color: GREEN }}>$20!</span></div>
      </Card>
      <DarkCard style={{ position: 'absolute', left: 240, right: 240, top: 760, padding: '26px 30px', textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>Video diunggah</div>
        <div style={{ fontSize: 140, fontWeight: 900, color: f > k1 ? RED : '#fff' }}>0</div>
      </DarkCard>
      {f > k1 - 6 && <>
        <div style={{ position: 'absolute', left: roll, top: 1150, width: 130, height: 130, transform: `rotate(${roll * 1.2}deg)` }}>
          <svg width={130} height={130}><g stroke="#C8A16A" strokeWidth={4} fill="none">{Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={65} cy={65} rx={60 - i * 2} ry={30 + i * 3} transform={`rotate(${i * 20} 65 65)`} />)}</g></svg>
        </div>
        <div style={{ position: 'absolute', left: 140, top: 1110, fontFamily: FONT, fontSize: 40, fontStyle: 'italic', color: 'rgba(255,255,255,.5)', opacity: Math.floor(f / 10) % 2 ? 1 : .4 }}>krik… krik…</div>
        <Chip text="Tetap sepi" start={k1} x={760} y={1120} size={44} />
      </>}
    </Scene>
  );
};

// ---------- S3: ubah arah — video apa saja ----------
const CATS = ['Musik', 'Tutorial', 'Game', 'Lucu', 'Masak', 'Vlog', 'Berita', 'Olahraga'];
const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(3, 1), k2 = cue(3, 2), k3 = cue(3, 3);
  const strike = interpolate(f, [k2, k2 + 10], [0, 1], cl);
  const up = useSpring(k3, 14, 120);
  return (
    <Scene dur={dur}>
      <Head text="Akhirnya mereka sadar:" start={0} top={250} size={62} />
      <div style={{ position: 'absolute', top: 400, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', fontFamily: FONT, fontSize: 56, fontWeight: 800, color: '#fff', background: `${PINK}55`, border: `3px solid ${PINK}`, borderRadius: 999, padding: '14px 40px', opacity: 1 - strike * .4 }}>
          Video kencan<div style={{ position: 'absolute', left: 20, right: 20, top: '50%', height: 8, background: RED, borderRadius: 4, transform: `scaleX(${strike})`, transformOrigin: '0 50%' }} />
        </div>
      </div>
      {CATS.map((c, i) => {
        const a = (i / CATS.length) * Math.PI * 2 - Math.PI / 2, r = interpolate(f, [k1 + i * 2, k1 + 16 + i * 2], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.4)) });
        const x = 540 + Math.cos(a) * 330 * r, y = 860 + Math.sin(a) * 250 * r;
        return <div key={c} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${r})`, opacity: r, fontFamily: FONT, fontSize: 38, fontWeight: 800,
          padding: '14px 28px', borderRadius: 999, background: i % 3 === 0 ? ACCENT : 'rgba(255,255,255,.95)', color: i % 3 === 0 ? '#fff' : '#111', boxShadow: '0 20px 40px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }}>{c}</div>;
      })}
      <div style={{ position: 'absolute', left: 540 - 85, top: 860 - 85, width: 170, height: 170, borderRadius: 85, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 80px ${ACCENT}`,
        transform: `scale(${interpolate(f, [k1 - 4, k1 + 8], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) })})` }}><Play size={70} /></div>
      {f > k3 - 2 && <div style={{ position: 'absolute', left: 180, right: 180, top: 1200, height: 110, borderRadius: 55, background: '#fff', fontFamily: FONT, fontSize: 42, fontWeight: 800, color: '#111',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${up})`, opacity: up, boxShadow: '0 30px 60px rgba(0,0,0,.5)' }}>⬆ Unggah video apa saja</div>}
    </Scene>
  );
};

// ---------- S4: video pertama 19 detik, 2006 dibeli $1,65 M ----------
const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k2 = cue(4, 2), k3 = cue(4, 3);
  const pl = useSpring(0, 16, 100);
  const sec = Math.floor(interpolate(f, [6, k2], [0, 19], cl));
  const deal = useSpring(k3, 14, 110);
  const late = f > k2 - 4;
  return (
    <Scene dur={dur}>
      <div style={{ transform: `scale(${late ? .78 : 1}) translateY(${late ? -170 : 0}px)`, transformOrigin: '50% 0', position: 'absolute', inset: 0 }}>
        <Card style={{ position: 'absolute', left: 90, right: 90, top: 300, padding: 0, overflow: 'hidden', transform: `scale(${pl})`, opacity: pl }}>
          <div style={{ position: 'relative', height: 500, background: 'linear-gradient(180deg,#9AD3F5 0%,#BDE6A8 60%,#7FB069 100%)' }}>
            {/* gajah generik */}
            <div style={{ position: 'absolute', left: 420, top: 200, width: 260, height: 170, borderRadius: '50% 50% 40% 40%', background: '#8E99A8' }} />
            <div style={{ position: 'absolute', left: 620, top: 190, width: 110, height: 110, borderRadius: '50%', background: '#8E99A8' }} />
            <div style={{ position: 'absolute', left: 700, top: 260, width: 30, height: 130, borderRadius: 15, background: '#8E99A8', transform: `rotate(${Math.sin(f / 8) * 10}deg)`, transformOrigin: '50% 0' }} />
            {[440, 500, 580, 640].map(x => <div key={x} style={{ position: 'absolute', left: x, top: 340, width: 34, height: 70, background: '#7C8796', borderRadius: 8 }} />)}
            <div style={{ position: 'absolute', left: 120, top: 250, width: 110, height: 160, borderRadius: '50% 50% 20% 20%', background: '#334155' }} />
            <div style={{ position: 'absolute', left: 140, top: 190, width: 70, height: 70, borderRadius: 35, background: '#475569' }} />
          </div>
          <div style={{ padding: '18px 26px 24px' }}>
            <div style={{ height: 10, borderRadius: 5, background: '#E5E7EB' }}><div style={{ height: '100%', width: `${(sec / 19) * 100}%`, background: ACCENT, borderRadius: 5 }} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 30, fontWeight: 700 }}><span>Video pertama · kebun binatang</span><span style={{ color: '#6B7280' }}>0:{String(sec).padStart(2, '0')} / 0:19</span></div>
          </div>
        </Card>
      </div>
      {late && <YearChip year="2006" start={k2} top={840} size={110} />}
      {f > k3 - 2 && (
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 1000, padding: '28px 36px', textAlign: 'center', transform: `scale(${deal})`, opacity: deal, border: `5px solid ${GREEN}` }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 4, color: GREEN }}>DIBELI GOOGLE</div>
          <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: -4 }}>$1,65 M</div>
          <div style={{ fontSize: 30, color: '#6B7280' }}>miliar dolar</div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- S5: 500+ jam video / menit ----------
const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const big = useSpring(10, 14, 110);
  const cols = ['#4F7CFF', '#22C55E', '#F59E0B', '#A855F7', '#EF4444', '#06B6D4'];
  return (
    <Scene dur={dur}>
      <div style={{ position: 'absolute', inset: 0, opacity: .35, overflow: 'hidden' }}>
        {Array.from({ length: 40 }, (_, i) => { const c = i % 4, r = Math.floor(i / 4), y = ((r * 200 - f * 9) % 2000 + 2000) % 2000 - 100;
          return <div key={i} style={{ position: 'absolute', left: 30 + c * 260, top: y, width: 240, height: 140, borderRadius: 18, background: `linear-gradient(135deg,${cols[(i * 7) % 6]},#111827)` }} />; })}
      </div>
      <div style={{ position: 'absolute', left: 540 - 130, top: 330, width: 260, height: 260, borderRadius: 130, border: '12px solid #fff', boxShadow: `0 0 60px ${ACCENT}` }}>
        <div style={{ position: 'absolute', left: 124, top: 30, width: 12, height: 100, borderRadius: 6, background: '#fff', transformOrigin: '50% 100%', transform: `rotate(${f * 24}deg)` }} />
        <div style={{ position: 'absolute', left: 124, top: 60, width: 12, height: 70, borderRadius: 6, background: ACCENT, transformOrigin: '50% 100%', transform: `rotate(${f * 2}deg)` }} />
      </div>
      <div style={{ position: 'absolute', top: 680, width: '100%', textAlign: 'center', fontFamily: FONT, transform: `scale(${big})`, opacity: big }}>
        <div style={{ fontSize: 190, fontWeight: 900, color: '#fff', letterSpacing: -6, textShadow: `0 0 60px ${ACCENT}` }}>500+ JAM</div>
        <div style={{ fontSize: 50, fontWeight: 600, color: 'rgba(255,255,255,.85)' }}>video diunggah <b>setiap menit</b></div>
      </div>
    </Scene>
  );
};

// ---------- S6: pelajaran — ubah arah; tanya 3 orang ----------
const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(6, 1), k2 = cue(6, 2), k3 = cue(6, 3), k4 = cue(6, 4), k5 = cue(6, 5), k6 = cue(6, 6);
  const a = useSpring(k1, 15, 110), b = useSpring(k3, 13, 130), ask = useSpring(k4, 18, 100);
  const part2 = f > k4 - 6;
  const qs = ['Apa yang paling kamu butuhkan?', 'Apa yang bikin kamu kecewa?', 'Kalau bisa, mau ditambah apa?'];
  return (
    <Scene dur={dur}>
      <Head text="Pelajarannya:" start={0} top={250} size={66} />
      {!part2 && <>
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 420, padding: 36, textAlign: 'center', transform: `scale(${a})`, opacity: a }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#9CA3AF', letterSpacing: 3 }}>IDE SEPI PEMINAT?</div>
          <div style={{ fontSize: 56, fontWeight: 900, marginTop: 6, textDecoration: f > k2 ? 'line-through' : 'none', color: f > k2 ? '#9CA3AF' : '#111' }}>Langsung menyerah</div>
          {f > k2 && <div style={{ fontSize: 38, fontWeight: 700, color: '#4B5563', marginTop: 14 }}>Lihat apa yang sebenarnya orang butuhkan</div>}
        </Card>
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 800, padding: 40, textAlign: 'center', transform: `scale(${b})`, opacity: b, border: `5px solid ${GREEN}` }}>
          <div style={{ fontSize: 70, fontWeight: 900 }}>Ubah <span style={{ color: GREEN }}>arah</span> ↗</div>
        </Card>
      </>}
      {part2 && (
        <Card style={{ position: 'absolute', left: 100, right: 100, top: 400, padding: '34px 40px', transform: `translateY(${(1 - ask) * 200}px)`, opacity: ask }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>COBA MINGGU INI</div>
          <div style={{ fontSize: 58, fontWeight: 900, marginTop: 6 }}>Tanya 3 orang</div>
          <div style={{ fontSize: 32, color: '#6B7280', marginTop: 4 }}>pelanggan atau teman</div>
          {qs.map((q, i) => { const st = k5 + 4 + i * 10, p = interpolate(f, [st, st + 8], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.4)) }), done = f > k6 + 6 + i * 6;
            return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, transform: `scale(${p})`, opacity: p, transformOrigin: '0 50%' }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: 'linear-gradient(135deg,#94a3b8,#475569)', flexShrink: 0 }} />
              <div style={{ flex: 1, background: '#F1F3F6', borderRadius: 24, padding: '16px 22px', fontSize: 34, fontWeight: 600 }}>{q}</div>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: done ? GREEN : '#E5E7EB', color: '#fff', fontSize: 34, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{done ? '✓' : ''}</div>
            </div>; })}
        </Card>
      )}
    </Scene>
  );
};

// ---------- S7: ajakan komentar ----------
const S7: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = useSpring(0, 20, 100);
  const opts = ['Tutorial', 'Musik', 'Game', 'Podcast'];
  const k1 = cue(7, 1);
  const typed = 'Tutorial servis HP!'.slice(0, Math.floor(interpolate(f, [k1 - 8, k1 + 18], [0, 19], cl)));
  return (
    <Scene dur={dur}>
      <Card style={{ position: 'absolute', left: 90, right: 90, top: 400, padding: '40px 44px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PERTANYAAN</div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>Video apa yang paling sering kamu tonton?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 30 }}>
          {opts.map((o, i) => { const s = interpolate(f, [12 + i * 6, 22 + i * 6], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) }); const sel = i === 0 && f > k1 - 8;
            return <div key={i} style={{ fontSize: 40, fontWeight: 700, padding: '14px 28px', borderRadius: 999, transform: `scale(${s})`, opacity: s, background: sel ? ACCENT : '#F1F3F6', color: sel ? '#fff' : '#111' }}>{o}</div>; })}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1040, height: 110, borderRadius: 55, background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.3)',
        display: 'flex', alignItems: 'center', padding: '0 20px 0 40px', fontFamily: FONT, opacity: interpolate(f, [k1 - 14, k1 - 8], [0, 1], cl) }}>
        <div style={{ flex: 1, fontSize: 40, color: typed ? '#fff' : 'rgba(255,255,255,.5)', whiteSpace: 'nowrap', overflow: 'hidden' }}>{typed || 'Tulis komentar…'}{Math.floor(f / 8) % 2 ? '|' : ''}</div>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: ACCENT, flexShrink: 0 }} />
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
      <div style={{ position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 34, fontWeight: 600, letterSpacing: 12, color: 'rgba(255,255,255,.6)', opacity: a }}>SEJARAH YOUTUBE</div>
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

export const YouTubeHistory: React.FC = () => {
  const scenes = [S0, S1, S2, S3, S4, S5, S6, S7, S8];
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Background />
      {scenes.map((S, i) => {
        const last = i === scenes.length - 1, from = SC[i], dur = (last ? YT_FRAMES : SC[i + 1]) - SC[i];
        return <Sequence key={i} from={from} durationInFrames={dur + (last ? 0 : 4)}><S dur={dur + 4} /></Sequence>;
      })}
      <Captions caps={T.CAPS} until={T.SC[8]} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)', pointerEvents: 'none' }} />
      <Audio src={staticFile('video8/voiceover.wav')} />
    </AbsoluteFill>
  );
};
