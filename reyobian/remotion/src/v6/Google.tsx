// Video 6 — Sejarah Google: "Google Pernah Mau Dijual Cuma $1 Juta" (gaya Remotion).
// Tanpa logo asli: kotak pencarian generik, nama hanya teks. Timing: ../data/video6.json.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import T from '../data/video6.json';
import { ACCENT, Background, Captions, FONT, Scene, cl, fr, useSpring } from '../v3/common';
import { Chip, Head, Odometer } from '../v3/Video3';

export const GOOGLE_FRAMES = Math.ceil(T.END * 30);
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
const Stamp: React.FC<{ text: string; start: number; x: number; y: number; color?: string; rot?: number; size?: number }> = ({ text, start, x, y, color = RED, rot = -10, size = 80 }) => {
  const f = useCurrentFrame(); if (f < start) return null;
  const p = interpolate(f, [start, start + 7], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) });
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${1.8 - .8 * p})`, opacity: p, fontFamily: FONT, fontWeight: 900, fontSize: size,
    color, border: `8px solid ${color}`, borderRadius: 22, padding: '10px 34px', background: 'rgba(0,0,0,.55)', boxShadow: `0 0 60px ${color}77`, letterSpacing: 4, whiteSpace: 'nowrap' }}>{text}</div>;
};
const SearchBar: React.FC<{ text: string; start: number; dur?: number; x?: number; y: number; w?: number; size?: number }> = ({ text, start, dur = 30, x = 90, y, w = 900, size = 40 }) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [start, start + dur], [0, text.length], cl));
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: size * 2.6, borderRadius: 999, background: '#fff', boxShadow: '0 30px 80px rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', gap: 22, padding: '0 36px', boxSizing: 'border-box', fontFamily: FONT }}>
      <div style={{ width: size * .8, height: size * .8, borderRadius: '50%', border: `${size * .12}px solid #9CA3AF`, position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', right: -size * .3, bottom: -size * .3, width: size * .4, height: size * .12, background: '#9CA3AF', transform: 'rotate(45deg)', borderRadius: 4 }} />
      </div>
      <div style={{ fontSize: size, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden' }}>{text.slice(0, n)}<span style={{ color: ACCENT }}>{Math.floor(f / 8) % 2 ? '|' : ''}</span></div>
    </div>
  );
};
const Person: React.FC<{ name: string; start: number; x: number; y: number; sub?: string }> = ({ name, start, x, y, sub = 'PENDIRI' }) => {
  const s = useSpring(start, 14, 130);
  return (
    <Card style={{ position: 'absolute', left: x, top: y, width: 400, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18, transform: `scale(${s})`, opacity: s }}>
      <div style={{ width: 70, height: 70, borderRadius: 35, background: 'linear-gradient(135deg,#94a3b8,#475569)', color: '#fff', fontWeight: 800, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{name.split(' ').map(w => w[0]).join('')}</div>
      <div><div style={{ fontSize: 20, fontWeight: 700, color: '#8a8f98', letterSpacing: 2 }}>{sub}</div><div style={{ fontSize: 36, fontWeight: 800 }}>{name}</div></div>
    </Card>
  );
};

// ---------- S0: hook — frame 0 sudah lengkap ----------
const S0: React.FC<{ dur: number }> = ({ dur }) => (
  <Scene dur={dur} noIn>
    <div style={{ position: 'absolute', top: 240, width: '100%', textAlign: 'center', fontFamily: FONT }}>
      <div style={{ fontSize: 64, fontWeight: 300, color: 'rgba(255,255,255,.9)' }}>Google pernah mau dijual</div>
      <div style={{ fontSize: 160, fontWeight: 900, color: '#fff', letterSpacing: -5, textShadow: `0 0 50px ${ACCENT}` }}>$1 JUTA</div>
    </div>
    <SearchBar text="jual perusahaan $1 juta" start={-12} dur={36} y={720} />
    <Card style={{ position: 'absolute', left: 140, right: 140, top: 900, padding: '30px 36px' }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: '#8a8f98', letterSpacing: 3 }}>PENAWARAN</div>
      <div style={{ fontSize: 46, fontWeight: 800, marginTop: 8 }}>Mesin pencari, dijual murah</div>
      <div style={{ fontSize: 34, color: '#4B5563', marginTop: 8 }}>Harga: $1.000.000</div>
    </Card>
    <Stamp text="DITOLAK" start={cue(0, 1) + 6} x={540} y={1000} />
  </Scene>
);

// ---------- S1: 1996 Stanford, BackRub, server LEGO ----------
const Lego: React.FC = () => {
  const f = useCurrentFrame();
  const cols = ['#EF4444', '#3B82F6', '#FACC15', '#22C55E'];
  return (
    <div style={{ position: 'relative', width: 380, height: 360 }}>
      {Array.from({ length: 5 }, (_, r) => Array.from({ length: 3 }, (_, c) => {
        const col = cols[(r + c) % 4], drop = interpolate(f, [r * 3 + c * 2, r * 3 + c * 2 + 10], [-300, 0], { ...cl, easing: Easing.out(Easing.back(1.3)) });
        return <div key={`${r}${c}`} style={{ position: 'absolute', left: c * 126, top: 360 - (r + 1) * 70 + drop, width: 122, height: 66, borderRadius: 8, background: col, boxShadow: 'inset 0 -8px 0 rgba(0,0,0,.2)' }}>
          {[0, 1, 2].map(s => <div key={s} style={{ position: 'absolute', top: -12, left: 14 + s * 36, width: 24, height: 14, borderRadius: 6, background: col, boxShadow: 'inset 0 -4px 0 rgba(0,0,0,.2)' }} />)}
        </div>;
      }))}
      {[0, 1, 2].map(i => <div key={i} style={{ position: 'absolute', left: 60, top: 70 + i * 80, width: 260, height: 50, borderRadius: 8, background: '#1f2937', border: '3px solid #6b7280',
        opacity: interpolate(f, [24, 34], [0, 1], cl) }}><div style={{ position: 'absolute', right: 14, top: 18, width: 12, height: 12, borderRadius: 6, background: Math.floor(f / 6 + i) % 2 ? GREEN : '#14532d' }} /></div>)}
    </div>
  );
};
const S1: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k3 = cue(1, 3), k4 = cue(1, 4);
  const br = useSpring(k3, 15, 110), lg = useSpring(k4 - 6, 15, 100);
  return (
    <Scene dur={dur}>
      <YearChip year="1996" start={0} top={210} size={130} />
      <Chip text="Mahasiswa Stanford" start={cue(1, 1)} x={540} y={430} on size={40} />
      <Person name="Larry Page" start={cue(1, 2)} x={90} y={510} />
      <Person name="Sergey Brin" start={cue(1, 2) + 8} x={590} y={510} />
      {f > k3 - 2 && (
        <Card style={{ position: 'absolute', left: 90, right: 90, top: 700, padding: '28px 34px', transform: `scale(${br})`, opacity: br * (f > k4 ? .55 : 1) }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PROYEK MESIN PENCARI</div>
          <div style={{ fontSize: 70, fontWeight: 900, marginTop: 4 }}>BackRub</div>
        </Card>
      )}
      {f > k4 - 8 && (
        <div style={{ position: 'absolute', left: 350, top: 900, transform: `scale(${lg * .9})`, transformOrigin: '50% 0', opacity: lg }}><Lego /></div>
      )}
      {f > k4 + 10 && <Chip text="Server pertama: casing LEGO" start={k4 + 10} x={540} y={1330} size={38} />}
    </Scene>
  );
};

// ---------- S2: ganti nama jadi Google (googol) ----------
const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const strike = interpolate(f, [4, 14], [0, 1], cl);
  const g = useSpring(14, 12, 130);
  const k2 = cue(2, 2);
  const zeros = Math.floor(interpolate(f, [k2, k2 + 40], [0, 100], cl));
  return (
    <Scene dur={dur}>
      <div style={{ position: 'absolute', top: 260, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 70, fontWeight: 800, color: 'rgba(255,255,255,.5)' }}>
        <span style={{ position: 'relative' }}>BackRub<span style={{ position: 'absolute', left: -10, right: -10, top: '52%', height: 8, background: RED, transform: `scaleX(${strike})`, transformOrigin: '0 50%', borderRadius: 4 }} /></span>
      </div>
      <div style={{ position: 'absolute', top: 360, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 170, fontWeight: 900, color: '#fff', letterSpacing: -5, transform: `scale(${g})`, opacity: g }}>Google</div>
      {f > cue(2, 1) && <Chip text="dari kata “googol”" start={cue(2, 1)} x={540} y={640} on size={44} />}
      {f > k2 - 2 && (
        <DarkCard style={{ position: 'absolute', left: 90, right: 90, top: 740, padding: '30px 34px', fontFamily: '"JetBrains Mono", monospace' }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,.6)', fontFamily: FONT }}>googol = 10¹⁰⁰</div>
          <div style={{ marginTop: 12, fontSize: 38, lineHeight: 1.25, wordBreak: 'break-all', color: '#fff' }}>
            <span style={{ color: '#7EA2FF', fontWeight: 800, fontSize: 56 }}>1</span>{'0'.repeat(zeros)}
          </div>
          <div style={{ marginTop: 10, fontSize: 26, color: 'rgba(255,255,255,.6)', fontFamily: FONT }}>{zeros} nol</div>
        </DarkCard>
      )}
    </Scene>
  );
};

// ---------- S3: 1999 ditawarkan ke Excite, ditolak ----------
const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k2 = cue(3, 2), k3 = cue(3, 3), k4 = cue(3, 4);
  const offer = useSpring(k2, 15, 110);
  const cut = interpolate(f, [k3, k3 + 8], [0, 1], cl);
  const shake = f > k4 + 6 && f < k4 + 16 ? Math.sin(f * 3) * 10 : 0;
  return (
    <Scene dur={dur}>
      <YearChip year="1999" start={0} />
      <Chip text="Ingin fokus kuliah" start={cue(3, 1)} x={540} y={470} size={42} />
      {f > k2 - 2 && (
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 600, padding: '40px 44px', transform: `scale(${offer}) translateX(${shake}px)`, opacity: offer }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#8a8f98', letterSpacing: 3 }}>PENAWARAN · UNTUK EXCITE</div>
          <div style={{ fontSize: 44, fontWeight: 800, marginTop: 10 }}>Jual: mesin pencari Google</div>
          <div style={{ marginTop: 22, fontSize: 96, fontWeight: 900, letterSpacing: -3, position: 'relative', display: 'inline-block', color: cut > .5 ? '#9CA3AF' : '#111' }}>
            $1.000.000<span style={{ position: 'absolute', left: -8, right: -8, top: '52%', height: 10, background: RED, transform: `scaleX(${cut})`, transformOrigin: '0 50%', borderRadius: 5 }} />
          </div>
          {f > k3 + 6 && <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -3, color: GREEN, transform: `scale(${interpolate(f, [k3 + 6, k3 + 14], [.6, 1], cl)})`, transformOrigin: '0 50%' }}>$750.000</div>}
          <div style={{ fontSize: 28, color: '#6B7280', marginTop: 6, opacity: interpolate(f, [k3 + 10, k3 + 18], [0, 1], cl) }}>Harga diturunkan</div>
        </Card>
      )}
      <Stamp text="DITOLAK" start={k4 + 6} x={540} y={1300} />
    </Scene>
  );
};

// ---------- S4: terpaksa lanjut -> miliaran pencarian, triliunan dolar; Excite bangkrut ----------
const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(4, 1), k2 = cue(4, 2), k3 = cue(4, 3);
  const W = 820, H = 280;
  const pts: [number, number][] = [[0, .03], [.2, .06], [.4, .15], [.6, .35], [.8, .6], [1, .97]];
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x * W},${H - y * H}`).join(' ');
  const p = interpolate(f, [k2 - 4, k2 + 28], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const news = useSpring(k3, 15, 110);
  const ticks = Math.floor(interpolate(f, [k1, dur], [1200000000, 8500000000], cl));
  const top = f > k3 - 4;
  return (
    <Scene dur={dur}>
      <Head text="Akhirnya terpaksa lanjut" start={0} top={250} size={62} />
      <div style={{ opacity: top ? .35 : 1, transform: `scale(${top ? .92 : 1})`, transition: 'none' }}>
        {f > k1 - 2 && <SearchBar text="cara bikin usaha kecil" start={k1} dur={26} y={420} />}
        {f > k1 + 6 && (
          <DarkCard style={{ position: 'absolute', left: 90, right: 90, top: 580, padding: '24px 34px', textAlign: 'center', opacity: interpolate(f, [k1 + 6, k1 + 14], [0, 1], cl) }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>Pencarian hari ini (ilustrasi)</div>
            <div style={{ fontSize: 84, fontWeight: 900, letterSpacing: -2, fontVariantNumeric: 'tabular-nums' }}>{ticks.toLocaleString('id-ID')}</div>
          </DarkCard>
        )}
        {f > k2 - 6 && (
          <DarkCard style={{ position: 'absolute', left: 90, right: 90, top: 820, padding: '24px 40px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}><span>Nilai perusahaan</span><span style={{ color: '#7EA2FF', fontWeight: 800 }}>triliunan dolar</span></div>
            <svg width={W} height={H} style={{ marginTop: 12, overflow: 'visible' }}>
              <path d={d} fill="none" stroke="#7EA2FF" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{ filter: `drop-shadow(0 0 14px ${ACCENT})` }} />
            </svg>
          </DarkCard>
        )}
      </div>
      {top && (
        <Card style={{ position: 'absolute', left: 90, right: 90, top: 980, padding: '30px 36px', transform: `translateY(${(1 - news) * 300}px)`, opacity: news, border: `5px solid ${RED}` }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 4, color: RED }}>BERITA · 2001</div>
          <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.12, marginTop: 10 }}>Perusahaan induk Excite bangkrut</div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- S5: pelajaran — kasih waktu, catat tiap bulan ----------
const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(5, 1), k2 = cue(5, 2), k3 = cue(5, 3), k4 = cue(5, 4);
  const a = useSpring(k1, 15, 110), tr = useSpring(k2, 18, 100);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'], vals = [.15, .22, .3, .45, .62, .85];
  const checked = f > k4 + 24;
  return (
    <Scene dur={dur}>
      <Head text="Pelajarannya:" start={0} top={250} size={66} />
      <Card style={{ position: 'absolute', left: 110, right: 110, top: 390, padding: '30px 36px', textAlign: 'center', transform: `scale(${a})`, opacity: a, border: `5px solid ${GREEN}` }}>
        <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.1 }}>Jangan buru-buru dilepas</div>
        <div style={{ fontSize: 34, color: '#6B7280', marginTop: 8 }}>cuma karena sekarang kelihatan kecil</div>
      </Card>
      {f > k2 - 4 && (
        <Card style={{ position: 'absolute', left: 90, right: 90, top: 680, padding: '30px 38px', transform: `translateY(${(1 - tr) * 200}px)`, opacity: tr }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PERKEMBANGAN IDE / USAHA</div>
            {f > k3 && <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', background: ACCENT, borderRadius: 999, padding: '6px 18px', transform: `scale(${interpolate(f, [k3, k3 + 8], [.6, 1], cl)})` }}>Kasih waktu</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, height: 300, marginTop: 24 }}>
            {months.map((m, i) => { const h = interpolate(f, [k3 + i * 5, k3 + 14 + i * 5], [0, vals[i]], { ...cl, easing: Easing.out(Easing.back(1.3)) });
              return <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${h * 85}%`, borderRadius: 12, background: `linear-gradient(180deg,#7EA2FF,${ACCENT})` }} />
                <div style={{ fontSize: 26, fontWeight: 700, color: '#6B7280' }}>{m}</div></div>; })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 26, opacity: interpolate(f, [k4 - 4, k4 + 4], [0, 1], cl) }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, border: `5px solid ${checked ? GREEN : '#D1D5DB'}`, background: checked ? GREEN : 'transparent', color: '#fff', fontSize: 40, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{checked ? '✓' : ''}</div>
            <div style={{ fontSize: 44, fontWeight: 800 }}>Catat tiap bulan</div>
          </div>
        </Card>
      )}
    </Scene>
  );
};

// ---------- S6: ajakan komentar ----------
const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = useSpring(0, 20, 100);
  const opts = ['Jualan online', 'Jasa servis', 'Konten kreator', 'Bikin aplikasi'];
  const k1 = cue(6, 1);
  const typed = 'Jualan online, hampir berhenti…'.slice(0, Math.floor(interpolate(f, [k1 - 8, k1 + 22], [0, 31], cl)));
  return (
    <Scene dur={dur}>
      <Card style={{ position: 'absolute', left: 90, right: 90, top: 380, padding: '40px 44px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PERTANYAAN</div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>Ada ide atau usaha yang hampir kamu lepas?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 30 }}>
          {opts.map((o, i) => { const s = interpolate(f, [14 + i * 6, 24 + i * 6], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) }); const sel = i === 0 && f > k1 - 8;
            return <div key={i} style={{ fontSize: 38, fontWeight: 700, padding: '14px 28px', borderRadius: 999, transform: `scale(${s})`, opacity: s, background: sel ? ACCENT : '#F1F3F6', color: sel ? '#fff' : '#111' }}>{o}</div>; })}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1060, height: 110, borderRadius: 55, background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.3)',
        display: 'flex', alignItems: 'center', padding: '0 20px 0 40px', fontFamily: FONT, opacity: interpolate(f, [k1 - 14, k1 - 8], [0, 1], cl) }}>
        <div style={{ flex: 1, fontSize: 38, color: typed ? '#fff' : 'rgba(255,255,255,.5)', whiteSpace: 'nowrap', overflow: 'hidden' }}>{typed || 'Tulis komentar…'}{Math.floor(f / 8) % 2 ? '|' : ''}</div>
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
      <div style={{ position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 34, fontWeight: 600, letterSpacing: 12, color: 'rgba(255,255,255,.6)', opacity: a }}>SEJARAH GOOGLE</div>
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

export const GoogleHistory: React.FC = () => {
  const scenes = [S0, S1, S2, S3, S4, S5, S6, S7];
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Background />
      {scenes.map((S, i) => {
        const last = i === scenes.length - 1, from = SC[i], dur = (last ? GOOGLE_FRAMES : SC[i + 1]) - SC[i];
        return <Sequence key={i} from={from} durationInFrames={dur + (last ? 0 : 4)}><S dur={dur + 4} /></Sequence>;
      })}
      <Captions caps={T.CAPS} until={T.SC[7]} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)', pointerEvents: 'none' }} />
      <Audio src={staticFile('video6/voiceover.wav')} />
    </AbsoluteFill>
  );
};
