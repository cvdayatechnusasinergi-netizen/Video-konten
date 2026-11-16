// Video 5 — Sejarah WhatsApp: "Ditolak Facebook, Lalu Dibeli $19 Miliar" (gaya Remotion).
// Tanpa logo asli (WhatsApp/Facebook/Twitter): tampilan aplikasi generik, nama hanya sebagai teks. Timing: ../data/video5.json.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import T from '../data/video5.json';
import { ACCENT, Background, Captions, FONT, Scene, cl, fr, useSpring } from '../v3/common';
import { Chip, Head, Odometer } from '../v3/Video3';

export const WA_FRAMES = Math.ceil(T.END * 30);
const SC = T.SC.map(fr);
const cue = (i: number, k: number, f = 0) => { const c = T.CUE[i]; return fr(c[k] + f * (c[k + 1] - c[k]) - T.SC[i]); };
const RED = '#FF4D4F', GREEN = '#22C55E', BUBBLE = '#DCF8C6';

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

// bingkai HP dengan isi layar bebas
const PhoneFrame: React.FC<{ children: React.ReactNode; ry?: number; scale?: number }> = ({ children, ry = 0, scale = 1 }) => (
  <div style={{ width: 520, height: 1060, transform: `rotateX(5deg) rotateY(${ry}deg) scale(${scale})`, transformStyle: 'preserve-3d', position: 'relative' }}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: 86, background: 'linear-gradient(115deg,#2d2f34 0%,#c9ccd2 18%,#6d7076 45%,#e3e5e9 70%,#3a3c41 100%)', boxShadow: '0 80px 160px rgba(0,0,0,.75)' }} />
    <div style={{ position: 'absolute', inset: 10, borderRadius: 78, background: '#020203' }} />
    <div style={{ position: 'absolute', inset: 24, borderRadius: 64, overflow: 'hidden', background: '#F4F1EC', fontFamily: FONT }}>
      <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 150, height: 40, borderRadius: 20, background: '#000', zIndex: 5 }} />
      {children}
    </div>
  </div>
);
const AppBar: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ height: 170, background: '#1F2C34', color: '#fff', display: 'flex', alignItems: 'flex-end', padding: '0 30px 22px', fontSize: 38, fontWeight: 700, boxSizing: 'border-box' }}>{title}</div>
);
const Person: React.FC<{ name: string; start: number; x: number; y: number; sub?: string }> = ({ name, start, x, y, sub = 'PENDIRI' }) => {
  const s = useSpring(start, 14, 130);
  return (
    <Card style={{ position: 'absolute', left: x, top: y, width: 400, padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 20, transform: `scale(${s})`, opacity: s }}>
      <div style={{ width: 76, height: 76, borderRadius: 38, background: 'linear-gradient(135deg,#94a3b8,#475569)', color: '#fff', fontWeight: 800, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{name.split(' ').map(w => w[0]).join('')}</div>
      <div><div style={{ fontSize: 22, fontWeight: 700, color: '#8a8f98', letterSpacing: 2 }}>{sub}</div><div style={{ fontSize: 38, fontWeight: 800 }}>{name}</div></div>
    </Card>
  );
};
const Post: React.FC<{ start: number; x: number; y: number; where: string; text: string; tilt?: number }> = ({ start, x, y, where, text, tilt = 0 }) => {
  const s = useSpring(start, 14, 120);
  return (
    <Card style={{ position: 'absolute', left: x, top: y, width: 760, padding: '28px 32px', transform: `rotate(${tilt}deg) scale(${s})`, opacity: s }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 70, height: 70, borderRadius: 35, background: 'linear-gradient(135deg,#94a3b8,#475569)', color: '#fff', fontWeight: 800, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>BA</div>
        <div><div style={{ fontSize: 32, fontWeight: 800 }}>Brian Acton</div><div style={{ fontSize: 24, color: '#8a8f98' }}>2009 · unggahan (terjemahan)</div></div>
      </div>
      <div style={{ fontSize: 44, fontWeight: 600, marginTop: 18, lineHeight: 1.2 }}>{text}</div>
      <div style={{ marginTop: 16, display: 'inline-block', fontSize: 26, fontWeight: 800, color: RED, background: '#FDE2E2', padding: '8px 18px', borderRadius: 14 }}>Ditolak {where}</div>
    </Card>
  );
};

// ---------- S0: hook — frame 0 sudah lengkap ----------
const S0: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k2 = cue(0, 2);
  const money = useSpring(k2 + 30, 14, 110);
  return (
    <Scene dur={dur} noIn>
      <div style={{ position: 'absolute', top: 230, width: '100%', textAlign: 'center', fontFamily: FONT }}>
        <div style={{ fontSize: 62, fontWeight: 300, color: 'rgba(255,255,255,.9)' }}>Ditolak kerja di Facebook,</div>
        <div style={{ fontSize: 62, fontWeight: 300, color: 'rgba(255,255,255,.9)' }}>lalu aplikasinya dibeli</div>
        <div style={{ fontSize: 150, fontWeight: 900, color: '#fff', letterSpacing: -4, textShadow: `0 0 50px ${ACCENT}` }}>$19 MILIAR</div>
      </div>
      <Card style={{ position: 'absolute', left: 110, right: 110, top: 720, padding: '34px 40px', transform: `rotate(-2deg) scale(${1 - money * .08})`, opacity: 1 - money * .3 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#8a8f98', letterSpacing: 3 }}>EMAIL · REKRUTMEN</div>
        <div style={{ fontSize: 44, fontWeight: 800, marginTop: 10 }}>Hasil lamaran kamu</div>
        <div style={{ fontSize: 36, color: '#4B5563', marginTop: 14, lineHeight: 1.3 }}>Maaf, kamu belum lolos tahap ini. Terima kasih sudah melamar.</div>
      </Card>
      <Stamp text="DITOLAK" start={30} x={540} y={900} />
      {f > k2 + 30 && <Chip text="5 tahun kemudian…" start={k2 + 30} x={540} y={1280} on size={44} />}
    </Scene>
  );
};

// ---------- S1: 2009 ditolak Twitter & Facebook ----------
const S1: React.FC<{ dur: number }> = ({ dur }) => (
  <Scene dur={dur}>
    <Person name="Brian Acton" sub="NAMANYA" start={0} x={340} y={250} />
    <YearChip year="2009" start={cue(1, 1)} top={430} size={120} />
    <Post start={cue(1, 2)} x={160} y={640} where="Twitter" text="“Ditolak Twitter. Enggak apa-apa.”" tilt={-2} />
    <Post start={cue(1, 3)} x={160} y={1000} where="Facebook" text="“Facebook menolak saya. Siap untuk petualangan berikutnya.”" tilt={2} />
  </Scene>
);

// ---------- S2: bareng Jan Koum bikin WhatsApp ----------
const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const ph = useSpring(cue(2, 1), 18, 90);
  const icon = useSpring(cue(2, 1) - 4, 12, 140), name = useSpring(cue(2, 2), 12, 140);
  return (
    <Scene dur={dur}>
      <Person name="Brian Acton" start={-20} x={90} y={260} />
      <Person name="Jan Koum" start={cue(2, 0) + 4} x={590} y={260} />
      <AbsoluteFill style={{ perspective: 1600 }}>
        <div style={{ position: 'absolute', left: 280, top: 470 + (1 - ph) * 700, transform: 'scale(.86)', transformOrigin: '50% 0', transformStyle: 'preserve-3d' }}>
          <PhoneFrame ry={-12 + Math.sin(f / 30) * 4}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1F2C34' }}>
              <div style={{ width: 170, height: 170, borderRadius: 50, background: 'linear-gradient(145deg,#7EA2FF,#3B5BDB)', transform: `scale(${icon})`, boxShadow: '0 20px 60px rgba(79,124,255,.5)' }}>
                <div style={{ margin: '42px auto', width: 86, height: 70, borderRadius: 24, background: '#fff' }} />
              </div>
              <div style={{ marginTop: 40, fontSize: 64, fontWeight: 800, color: '#fff', opacity: name }}>WhatsApp</div>
              <div style={{ marginTop: 10, fontSize: 28, color: 'rgba(255,255,255,.6)', opacity: name }}>versi 1.0 · 2009</div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

// ---------- S3: cuma status, sering error, hampir menyerah ----------
const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(3, 1), k2 = cue(3, 2);
  const crash = [k1, k1 + 14];
  const shake = (f > k1 && f < k1 + 8) || (f > k1 + 14 && f < k1 + 22) ? Math.sin(f * 3) * 12 : 0;
  const rows = [['Rina', 'Lagi di gym'], ['Andi', 'Baterai lemah'], ['Budi', 'Rapat, jangan telepon'], ['Sari', 'Tidur']];
  return (
    <Scene dur={dur}>
      <Head text="Awalnya cuma buat status" start={0} top={250} size={60} />
      <AbsoluteFill style={{ perspective: 1600 }}>
        <div style={{ position: 'absolute', left: 280 + shake, top: 400, transform: 'scale(.86)', transformOrigin: '50% 0', transformStyle: 'preserve-3d' }}>
          <PhoneFrame ry={-8}>
            <AppBar title="Status" />
            {rows.map(([n, s], i) => { const p = interpolate(f, [4 + i * 4, 14 + i * 4], [0, 1], cl);
              return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '24px 28px', borderBottom: '2px solid #E5E1DA', background: '#fff', opacity: p, transform: `translateX(${(1 - p) * 40}px)` }}>
                <div style={{ width: 80, height: 80, borderRadius: 40, background: 'linear-gradient(135deg,#94a3b8,#475569)' }} />
                <div><div style={{ fontSize: 34, fontWeight: 700, color: '#111' }}>{n}</div><div style={{ fontSize: 28, color: '#6B7280' }}>{s}</div></div>
              </div>; })}
            {crash.map((c, i) => f > c && (
              <div key={i} style={{ position: 'absolute', left: 40 + i * 20, right: 40 - i * 20, top: 380 + i * 60, background: '#fff', borderRadius: 30, padding: '30px', boxShadow: '0 30px 60px rgba(0,0,0,.35)',
                transform: `scale(${interpolate(f, [c, c + 6], [.7, 1], cl)})` }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: '#111' }}>Aplikasi berhenti</div>
                <div style={{ fontSize: 26, color: '#6B7280', marginTop: 8 }}>WhatsApp mengalami error.</div>
                <div style={{ marginTop: 18, fontSize: 28, fontWeight: 800, color: ACCENT, textAlign: 'right' }}>TUTUP</div>
              </div>))}
          </PhoneFrame>
        </div>
      </AbsoluteFill>
      {f > k1 && <Chip text="Sering error" start={k1} x={840} y={480} size={40} />}
      <Stamp text="HAMPIR MENYERAH" start={k2} x={540} y={1330} size={60} rot={-6} />
    </Scene>
  );
};

// ---------- S4: terus memperbaiki -> aplikasi chat ----------
const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(4, 1);
  const msgs: [string, boolean][] = [['Udah sampai?', false], ['Baru nyampe, otw ke atas', true], ['Oke, aku tunggu di lobi', false], ['Siap!', true]];
  return (
    <Scene dur={dur}>
      <Head text="Terus memperbaiki" start={0} top={250} size={62} />
      <AbsoluteFill style={{ perspective: 1600 }}>
        <div style={{ position: 'absolute', left: 60, top: 400, transform: 'scale(.82)', transformOrigin: '0 0', transformStyle: 'preserve-3d' }}>
          <PhoneFrame ry={10}>
            <AppBar title={f > k1 ? 'Chat · Rina' : 'Status'} />
            <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {msgs.map(([m, me], i) => { const st = k1 + 4 + i * 9, p = interpolate(f, [st, st + 7], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.5)) });
                return <div key={i} style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '78%', background: me ? BUBBLE : '#fff', color: '#111', fontSize: 32, padding: '18px 24px',
                  borderRadius: 26, boxShadow: '0 4px 10px rgba(0,0,0,.08)', transform: `scale(${p})`, opacity: p, transformOrigin: me ? '100% 100%' : '0 100%' }}>{m}{me && <span style={{ color: '#3B82F6', fontSize: 22 }}>  ✓✓</span>}</div>; })}
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
      <Chip text="Simpel" start={cue(4, 2)} x={810} y={620} size={46} />
      <Chip text="Tanpa iklan" start={cue(4, 3)} x={810} y={790} on size={46} />
      <Chip text="Hemat kuota" start={cue(4, 4)} x={810} y={960} size={46} />
    </Scene>
  );
};

// ---------- S5: 2014 dibeli $19 miliar, 2 miliar+ pengguna ----------
const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(5, 1), k2 = cue(5, 2);
  const deal = useSpring(k1, 15, 110);
  const users = interpolate(f, [k2 + 6, k2 + 40], [0, 2], { ...cl, easing: Easing.out(Easing.cubic) });
  return (
    <Scene dur={dur}>
      <YearChip year="2014" start={0} />
      {f > k1 - 2 && (
        <Card style={{ position: 'absolute', left: 110, right: 110, top: 480, padding: '40px 44px', textAlign: 'center', transform: `scale(${deal})`, opacity: deal, border: `5px solid ${GREEN}` }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 4, color: GREEN }}>AKUISISI · FEBRUARI 2014</div>
          <div style={{ fontSize: 34, fontWeight: 600, color: '#4B5563', marginTop: 10 }}>Facebook membeli WhatsApp</div>
          <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: -4, marginTop: 6 }}>$19 M</div>
          <div style={{ fontSize: 30, fontWeight: 600, color: '#6B7280' }}>miliar dolar</div>
        </Card>
      )}
      {f > k2 && (
        <DarkCard style={{ position: 'absolute', left: 140, right: 140, top: 1060, padding: '26px 30px', textAlign: 'center', opacity: interpolate(f, [k2, k2 + 8], [0, 1], cl) }}>
          <div style={{ fontSize: 30, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>Pengguna sekarang</div>
          <div style={{ fontSize: 110, fontWeight: 900, letterSpacing: -3, textShadow: `0 0 40px ${ACCENT}` }}>{users.toFixed(1).replace('.', ',')} miliar+</div>
        </DarkCard>
      )}
    </Scene>
  );
};

// ---------- S6: pelajaran ----------
const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(6, 1), k2 = cue(6, 2), k4 = cue(6, 4), k5 = cue(6, 5);
  const big = useSpring(k1, 15, 110), note = useSpring(k2, 18, 100);
  const step = (at: number) => f > at;
  return (
    <Scene dur={dur}>
      <Head text="Pelajarannya:" start={0} top={250} size={66} />
      <Card style={{ position: 'absolute', left: 120, right: 120, top: 400, padding: '36px 40px', textAlign: 'center', transform: `scale(${big})`, opacity: big, border: `5px solid ${GREEN}` }}>
        <div style={{ fontSize: 64, fontWeight: 900 }}>Ditolak itu <span style={{ color: GREEN }}>bukan akhir</span></div>
      </Card>
      {f > k2 - 4 && (
        <Card style={{ position: 'absolute', left: 100, right: 100, top: 680, padding: '34px 40px', transform: `translateY(${(1 - note) * 200}px)`, opacity: note }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>KALAU BARU DITOLAK</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap' }}>
            {['Kerjaan', 'Ide', 'Usaha'].map((t, i) => { const s = interpolate(f, [cue(6, 3) + i * 5, cue(6, 3) + 10 + i * 5], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) });
              return <div key={i} style={{ fontSize: 36, fontWeight: 700, padding: '12px 26px', borderRadius: 999, background: '#F1F3F6', transform: `scale(${s})`, opacity: s }}>{t}</div>; })}
          </div>
          {[['Catat 1 hal yang bisa diperbaiki', k4 + 20], ['Coba lagi', k5 + 10]].map(([t, at], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 26, opacity: interpolate(f, [(at as number) - 18, (at as number) - 10], [0, 1], cl) }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, border: `5px solid ${step(at as number) ? GREEN : '#D1D5DB'}`, background: step(at as number) ? GREEN : 'transparent', color: '#fff', fontSize: 42, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step(at as number) ? '✓' : ''}</div>
              <div style={{ fontSize: 46, fontWeight: 800 }}>{i + 1}. {t}</div>
            </div>
          ))}
        </Card>
      )}
    </Scene>
  );
};

// ---------- S7: ajakan komentar ----------
const S7: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = useSpring(0, 20, 100);
  const k1 = cue(7, 1), k2 = cue(7, 2);
  const replies = ['Ditolak kerja, eh dapat yang lebih cocok', 'Usaha pertama gagal, yang kedua jalan', 'Ditolak kampus impian…'];
  const typed = 'Pernah! Ceritanya…'.slice(0, Math.floor(interpolate(f, [k2, k2 + 22], [0, 18], cl)));
  return (
    <Scene dur={dur}>
      <Card style={{ position: 'absolute', left: 90, right: 90, top: 330, padding: '36px 44px', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PERTANYAAN</div>
        <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.15, marginTop: 12 }}>Pernah ditolak, tapi akhirnya dapat yang lebih baik?</div>
      </Card>
      {replies.map((r, i) => { const st = k1 + 4 + i * 9, s = interpolate(f, [st, st + 8], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.4)) });
        return <div key={i} style={{ position: 'absolute', left: 90 + (i % 2) * 60, top: 760 + i * 130, display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${s})`, opacity: s, transformOrigin: '0 50%', fontFamily: FONT }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: 'linear-gradient(135deg,#94a3b8,#475569)' }} />
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 28, padding: '16px 26px', fontSize: 34, fontWeight: 600, color: '#111' }}>{r}</div>
        </div>; })}
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1170, height: 110, borderRadius: 55, background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.3)',
        display: 'flex', alignItems: 'center', padding: '0 20px 0 40px', fontFamily: FONT, opacity: interpolate(f, [k2 - 8, k2], [0, 1], cl) }}>
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
      <div style={{ position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 34, fontWeight: 600, letterSpacing: 12, color: 'rgba(255,255,255,.6)', opacity: a }}>SEJARAH WHATSAPP</div>
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

export const WhatsAppHistory: React.FC = () => {
  const scenes = [S0, S1, S2, S3, S4, S5, S6, S7, S8];
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Background />
      {scenes.map((S, i) => {
        const last = i === scenes.length - 1, from = SC[i], dur = (last ? WA_FRAMES : SC[i + 1]) - SC[i];
        return <Sequence key={i} from={from} durationInFrames={dur + (last ? 0 : 4)}><S dur={dur + 4} /></Sequence>;
      })}
      <Captions caps={T.CAPS} until={T.SC[8]} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)', pointerEvents: 'none' }} />
      <Audio src={staticFile('video5/voiceover.wav')} />
    </AbsoluteFill>
  );
};
