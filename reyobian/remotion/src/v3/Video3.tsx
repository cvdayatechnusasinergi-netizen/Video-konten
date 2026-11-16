// Video 3 — "HP Ini Sempat Diketawain" (gaya Remotion). Timing dari VO: ../data/video3.json
import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import T from '../data/video3.json';
import { ACCENT, Background, Callout, Captions, CommentCard, FONT, KeypadPhone, Phone, Scene, WALLS, cl, fr, useSpring } from './common';

export const V3_FRAMES = Math.ceil(T.END * 30);
const SC = T.SC.map(fr);
const cue = (i: number, k: number) => fr(T.CUE[i][k] - T.SC[i]);

const Odometer: React.FC<{ value: string; start: number; size?: number }> = ({ value, start, size = 200 }) => {
  const f = useCurrentFrame(); const h = size * .96;
  return (
    <div style={{ display: 'flex' }}>
      {value.split('').map((d, i) => {
        const s = interpolate(f, [start + i * 3, start + 22 + i * 3], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.2)) });
        const target = Number(d), rolls = 10 * (1 + i), from = (target + 5) % 10;
        const pos = from + s * (rolls + ((target - from + 10) % 10));
        return (
          <div key={i} style={{ height: h, overflow: 'hidden', width: size * .64 }}>
            <div style={{ transform: `translateY(${-(pos % 10) * h}px)` }}>
              {Array.from({ length: 11 }, (_, k) => <div key={k} style={{ height: h, lineHeight: `${h}px`, fontSize: size, fontWeight: 800, color: '#fff', textAlign: 'center', letterSpacing: -6 }}>{k % 10}</div>)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
const Title: React.FC<{ top: number; small: string; big: string; start: number; bigSize?: number; color?: string }> = ({ top, small, big, start, bigSize = 128, color = '#fff' }) => {
  const s = useSpring(start, 20, 100);
  return (
    <div style={{ position: 'absolute', top, width: '100%', textAlign: 'center', fontFamily: FONT }}>
      {small && <div style={{ fontSize: 64, fontWeight: 300, color: 'rgba(255,255,255,.9)', opacity: s, transform: `translateY(${(1 - s) * 30}px)`, letterSpacing: -1 }}>{small}</div>}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {big.split('').map((ch, i) => <Letter key={i} ch={ch} start={start + 6 + i * 2} size={bigSize} color={color} />)}
      </div>
    </div>
  );
};
const Letter: React.FC<{ ch: string; start: number; size: number; color: string }> = ({ ch, start, size, color }) => {
  const s = useSpring(start, 12, 140);
  return <div style={{ overflow: 'hidden', height: size * 1.25 }}><div style={{ fontSize: size, fontWeight: 900, color, letterSpacing: -3, lineHeight: `${size * 1.25}px`, whiteSpace: 'pre',
    transform: `translateY(${(1 - s) * size * 1.25}px)` }}>{ch}</div></div>;
};
const Head: React.FC<{ text: string; start: number; top?: number; size?: number }> = ({ text, start, top = 300, size = 60 }) => {
  const s = useSpring(start, 20, 110);
  return <div style={{ position: 'absolute', top, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: size, fontWeight: 600, color: '#fff', letterSpacing: -1,
    opacity: s, transform: `translateY(${(1 - s) * 30}px)` }}>{text}</div>;
};
const Chip: React.FC<{ text: string; start: number; x: number; y: number; on?: boolean; size?: number }> = ({ text, start, x, y, on, size = 40 }) => {
  const s = useSpring(start, 14, 140);
  return <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${s})`, opacity: s, fontFamily: FONT, fontWeight: 700, fontSize: size,
    padding: '18px 34px', borderRadius: 999, whiteSpace: 'nowrap', background: on ? ACCENT : 'rgba(255,255,255,.96)', color: on ? '#fff' : '#111',
    boxShadow: on ? `0 0 50px ${ACCENT}aa` : '0 20px 50px rgba(0,0,0,.45)' }}>{text}</div>;
};

// ---------- S1: hook (frame 0 sudah lengkap) ----------
const S1: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const pulse = 1 + .05 * Math.sin(Math.PI * interpolate(f, [cue(0, 1), cue(0, 1) + 10], [0, 1], cl));
  return (
    <Scene dur={dur} noIn>
      <div style={{ position: 'absolute', top: 210, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 34, letterSpacing: 10, color: '#fff', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.25)', padding: '10px 28px', borderRadius: 999 }}>2007</div>
      </div>
      <div style={{ position: 'absolute', top: 290, width: '100%', textAlign: 'center', fontFamily: FONT }}>
        <div style={{ fontSize: 64, fontWeight: 300, color: 'rgba(255,255,255,.9)', letterSpacing: -1 }}>HP ini sempat</div>
        <div style={{ fontSize: 128, fontWeight: 900, color: '#fff', letterSpacing: -3, transform: `scale(${pulse})` }}>DIKETAWAIN</div>
      </div>
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
          <div style={{ position: 'absolute', left: 280, top: 560, transformStyle: 'preserve-3d' }}><Phone ry={-18 + Math.sin(f / 30) * 4} scale={.86} iconsFrom={-100} sweepAt={20} /></div>
          <CommentCard name="Budi S." text="Enggak ada keyboard-nya?" react="1,2 rb" start={-30} x={40} y={700} z={120} tilt={12} width={400} />
          <CommentCard name="Rina A." text="Kemahalan, enggak bakal laku." react="987" start={-30} x={600} y={960} z={110} tilt={-14} width={400} />
          <CommentCard name="Andi P." text="Ngetiknya pakai apa?" react="2,3 rb" start={-30} x={60} y={1150} z={60} tilt={10} width={400} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

// ---------- S2: HP zaman dulu ----------
const S2: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const rise = useSpring(0, 20, 80);
  const k3 = cue(1, 3), typing = interpolate(f, [k3, k3 + 40], [0, 1], cl);
  const msg = 'otw ya'.slice(0, Math.floor(typing * 6.99));
  const hl = f > k3 && typing < 1 ? [5, 7, 8, 1, 3, 0][Math.floor(typing * 6) % 6] : -1;
  return (
    <Scene dur={dur}>
      <Head text="Dulu, HP paling keren:" start={cue(1, 0)} top={260} />
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: 'absolute', left: 340, top: 470 + (1 - rise) * 600, transformStyle: 'preserve-3d' }}>
          <KeypadPhone ry={interpolate(f, [0, dur], [28, -12])} sms={f > k3 ? msg : undefined} hl={hl} />
        </div>
      </AbsoluteFill>
      <Callout text="Layar kecil" start={cue(1, 2)} x={210} y={560} tx={470} ty={700} />
      <Callout text="Keypad" start={cue(1, 1)} x={900} y={1060} tx={690} ty={1050} />
      <Callout text="SMS = pencet tombol" start={k3} x={540} y={1430} tx={540} ty={1300} />
    </Scene>
  );
};

// ---------- S3: 2007, layar sentuh penuh ----------
const S3: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const rise = useSpring(cue(2, 0), 22, 70);
  const doubt = cue(2, 2), news = cue(2, 5);
  const yearOut = interpolate(f, [doubt - 8, doubt], [1, 0], cl);
  const shrink = interpolate(f, [news - 5, news + 15], [1, .82], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const lift = interpolate(f, [news - 5, news + 15], [0, -140], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const newsS = useSpring(news, 16, 100);
  const laughs = Math.floor(interpolate(f, [news + 10, dur], [1200, 12800], cl));
  return (
    <Scene dur={dur}>
      <div style={{ position: 'absolute', top: 200, width: '100%', display: 'flex', justifyContent: 'center', opacity: yearOut, fontFamily: FONT }}><Odometer value="2007" start={0} size={190} /></div>
      <div style={{ opacity: yearOut }}><Chip text="Tanpa keypad" start={cue(2, 1)} x={540} y={470} on /></div>
      <div style={{ opacity: 1 - yearOut }}><Head text="Banyak yang meremehkan:" start={doubt} top={260} /></div>
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translateY(${lift}px) scale(${shrink})` }}>
          <div style={{ position: 'absolute', left: 280, top: 560 + (1 - rise) * 900, transformStyle: 'preserve-3d' }}>
            <Phone ry={interpolate(rise, [0, 1], [-60, -14]) + Math.sin(f / 35) * 3} scale={.86} iconsFrom={cue(2, 0) + 15} sweepAt={cue(2, 0) + 25} />
          </div>
          <CommentCard name="Rina A." text="Kemahalan!" react="987" start={cue(2, 3)} x={600} y={640} z={130} tilt={-14} width={380} />
          <CommentCard name="Andi P." text="Ngetiknya pakai apa?" react="2,3 rb" start={cue(2, 4)} x={50} y={900} z={110} tilt={12} width={400} />
        </div>
      </AbsoluteFill>
      {f > news - 2 && (
        <div style={{ position: 'absolute', left: 90, right: 90, top: 1130, transform: `translateY(${(1 - newsS) * 300}px)`, opacity: newsS, background: '#fff', borderRadius: 36,
          padding: '30px 36px', fontFamily: FONT, boxShadow: '0 40px 100px rgba(0,0,0,.6)' }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 4, color: ACCENT }}>BERITA · 2007</div>
          <div style={{ fontSize: 44, fontWeight: 800, color: '#111', lineHeight: 1.15, marginTop: 10 }}>Bos perusahaan teknologi lain ikut menertawakan harganya</div>
          <div style={{ marginTop: 16, display: 'inline-flex', gap: 10, alignItems: 'center', background: '#EEF2FF', borderRadius: 20, padding: '8px 18px', color: ACCENT, fontWeight: 800, fontSize: 28 }}>
            <span style={{ width: 24, height: 24, borderRadius: 12, background: ACCENT, display: 'inline-block' }} /> Haha · {laughs.toLocaleString('id-ID')}
          </div>
        </div>
      )}
    </Scene>
  );
};

// ---------- S4: fakta (panel pengaturan) ----------
const Toggle: React.FC<{ fail: number }> = ({ fail }) => {
  const f = useCurrentFrame();
  const tryOn = interpolate(f, [fail, fail + 6, fail + 14], [0, .45, 0], cl);
  const shake = f > fail + 6 && f < fail + 20 ? Math.sin(f * 2.5) * 6 : 0;
  return <div style={{ width: 110, height: 64, borderRadius: 32, background: '#D1D5DB', position: 'relative', transform: `translateX(${shake}px)` }}>
    <div style={{ position: 'absolute', top: 5, left: 5 + tryOn * 46, width: 54, height: 54, borderRadius: 27, background: '#fff', boxShadow: '0 3px 8px rgba(0,0,0,.25)' }} /></div>;
};
const S4: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const panel = useSpring(cue(3, 0), 20, 90);
  const rows: [string, string, number][] = [['Copy-paste', 'toggle', cue(3, 1)], ['App Store', 'Belum ada', cue(3, 2)], ['Jaringan', '2G', cue(3, 3)]];
  return (
    <Scene dur={dur}>
      <Head text="Padahal waktu itu…" start={cue(3, 0)} top={300} size={66} />
      <AbsoluteFill style={{ perspective: 1600 }}>
        <div style={{ position: 'absolute', left: 90, top: 520, width: 900, background: 'rgba(255,255,255,.97)', borderRadius: 44, padding: '20px 0', fontFamily: FONT,
          boxShadow: '0 60px 140px rgba(0,0,0,.6)', transform: `rotateX(${interpolate(panel, [0, 1], [40, 8])}deg) rotateY(${-6 + Math.sin(f / 40) * 2}deg) translateY(${(1 - panel) * 300}px)`, opacity: panel }}>
          <div style={{ padding: '14px 40px 20px', fontSize: 30, fontWeight: 700, color: '#8a8f98', letterSpacing: 2 }}>FITUR · 2007</div>
          {rows.map(([name, val, st], i) => {
            const p = interpolate(f, [st - 4, st + 8], [0, 1], cl);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '34px 40px', borderTop: '2px solid #EEF0F3', opacity: .25 + .75 * p, transform: `translateX(${(1 - p) * 40}px)` }}>
                <div style={{ fontSize: 46, fontWeight: 700, color: '#111' }}>{name}</div>
                {val === 'toggle' ? <Toggle fail={st + 6} /> :
                  <div style={{ fontSize: 40, fontWeight: 800, color: val === '2G' ? '#fff' : '#9CA3AF', background: val === '2G' ? '#EF4444' : 'transparent', padding: val === '2G' ? '6px 22px' : 0, borderRadius: 16 }}>{val}</div>}
              </div>
            );
          })}
          <div style={{ padding: '6px 40px 10px', fontSize: 28, color: '#EF4444', fontWeight: 600, opacity: interpolate(f, [cue(3, 1) + 18, cue(3, 1) + 26], [0, 1], cl) }}>Copy-paste belum tersedia</div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

// ---------- S5: sekarang semua HP begini ----------
const FanPhone: React.FC<{ i: number; start: number }> = ({ i, start }) => {
  const s = useSpring(start, 18, 90);
  const xs = [-20, 150, 280, 410, 580], rot = [-32, -18, 0, 18, 32], zs = [-260, -120, 80, -120, -260];
  return <div style={{ position: 'absolute', left: xs[i], top: 470 + (1 - s) * 1000, transformStyle: 'preserve-3d', zIndex: i === 2 ? 5 : 3 - Math.abs(i - 2), transform: `translateZ(${zs[i]}px)` }}>
    <Phone ry={rot[i]} rx={4} wall={i} time={false} iconsFrom={-100} scale={.8} /></div>;
};
const S5: React.FC<{ dur: number }> = ({ dur }) => {
  const k1 = cue(4, 1);
  return (
    <Scene dur={dur}>
      <Head text="Tapi lihat sekarang." start={cue(4, 0)} top={280} size={70} />
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
          {[0, 4, 1, 3, 2].map(i => <FanPhone key={i} i={i} start={k1 - 8 + Math.abs(i - 2) * 4} />)}
        </div>
      </AbsoluteFill>
      <Chip text="Termasuk Android" start={k1 + 18} x={540} y={1370} on size={46} />
    </Scene>
  );
};

// ---------- S6: pelajaran ----------
const S6: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const k1 = cue(5, 1);
  const flip = interpolate(f, [k1, k1 + 10], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  const pill = useSpring(cue(5, 0), 14, 120);
  return (
    <Scene dur={dur}>
      <div style={{ position: 'absolute', top: 430, width: '100%', display: 'flex', justifyContent: 'center', perspective: 1000 }}>
        <div style={{ transform: `scale(${pill}) rotateX(${flip * 360}deg)`, fontFamily: FONT, fontWeight: 800, fontSize: 40, padding: '16px 34px', borderRadius: 999,
          background: flip > .5 ? ACCENT : '#EEF2FF', color: flip > .5 ? '#fff' : ACCENT, boxShadow: flip > .5 ? `0 0 60px ${ACCENT}` : 'none' }}>
          {flip > .5 ? 'Jadi standar' : 'Haha · 12.800'}
        </div>
      </div>
      <Head text="Yang diketawain hari ini," start={cue(5, 0)} top={590} size={62} />
      <Title top={720} small="bisa jadi" big="STANDAR" start={k1} bigSize={170} />
      <Head text="besok." start={k1 + 14} top={1060} size={72} />
    </Scene>
  );
};

// ---------- S7: ajakan komentar ----------
const S7: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = useSpring(cue(6, 0), 20, 100);
  const k1 = cue(6, 1), k2 = cue(6, 2), k3 = cue(6, 3);
  const opts = ['HP lipat', 'Mobil listrik', 'Kacamata pintar', 'AI di HP'];
  const typed = 'HP lipat sih!'.slice(0, Math.floor(interpolate(f, [k3, k3 + 28], [0, 13], cl)));
  const fold = interpolate(f, [k2 + 4, k2 + 26], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) });
  return (
    <Scene dur={dur}>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 330, background: 'rgba(255,255,255,.97)', borderRadius: 44, padding: '40px 44px', fontFamily: FONT,
        boxShadow: '0 60px 140px rgba(0,0,0,.6)', transform: `translateY(${(1 - card) * 300}px)`, opacity: card }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, letterSpacing: 3 }}>PERTANYAAN</div>
        <div style={{ fontSize: 52, fontWeight: 800, color: '#111', lineHeight: 1.15, marginTop: 12 }}>Teknologi apa yang sekarang masih diketawain?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 30 }}>
          {opts.map((o, i) => {
            const s = interpolate(f, [k1 + i * 5, k1 + 10 + i * 5], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) });
            const sel = i === 0 && f >= k2;
            return <div key={i} style={{ fontSize: 38, fontWeight: 700, padding: '16px 30px', borderRadius: 999, transform: `scale(${s})`, opacity: s,
              background: sel ? ACCENT : '#F1F3F6', color: sel ? '#fff' : '#111', boxShadow: sel ? `0 0 40px ${ACCENT}99` : 'none' }}>{o}</div>;
          })}
        </div>
      </div>
      {/* HP lipat */}
      <div style={{ position: 'absolute', top: 960, left: 0, right: 0, display: 'flex', justifyContent: 'center', perspective: 1400, opacity: interpolate(f, [k2, k2 + 6], [0, 1], cl) }}>
        <div style={{ display: 'flex', transformStyle: 'preserve-3d' }}>
          {[0, 1].map(side => (
            <div key={side} style={{ width: 200, height: 300, borderRadius: side ? '0 30px 30px 0' : '30px 0 0 30px', background: '#111', padding: 8, boxSizing: 'border-box',
              transformOrigin: side ? '0 50%' : '100% 50%', transform: `rotateY(${(side ? -1 : 1) * (1 - fold) * 85}deg)`, boxShadow: '0 30px 60px rgba(0,0,0,.5)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: side ? '0 22px 22px 0' : '22px 0 0 22px', background: WALLS[side ? 2 : 0] }} />
            </div>
          ))}
        </div>
      </div>
      {/* kolom komentar */}
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1320, height: 110, borderRadius: 55, background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.3)',
        display: 'flex', alignItems: 'center', padding: '0 20px 0 40px', fontFamily: FONT, opacity: interpolate(f, [k3 - 8, k3], [0, 1], cl) }}>
        <div style={{ flex: 1, fontSize: 40, color: typed ? '#fff' : 'rgba(255,255,255,.5)' }}>{typed || 'Tulis komentar…'}{Math.floor(f / 8) % 2 ? '|' : ''}</div>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: ACCENT, transform: `scale(${1 + .15 * Math.sin(Math.PI * interpolate(f, [k3 + 30, k3 + 40], [0, 1], cl))})` }} />
      </div>
    </Scene>
  );
};

// ---------- S8: penutup ----------
const S8: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const a = useSpring(0, 16, 110), b = useSpring(10, 16, 110), c = useSpring(16, 16, 110);
  const followed = f > 40, shared = f > 62;
  const press = (at: number) => 1 - .07 * Math.sin(Math.PI * interpolate(f, [at, at + 8], [0, 1], cl));
  return (
    <Scene dur={dur + 1}>
      <div style={{ position: 'absolute', top: 330, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 34, fontWeight: 600, letterSpacing: 12, color: 'rgba(255,255,255,.6)', opacity: a }}>SEJARAH iPHONE</div>
      <div style={{ position: 'absolute', top: 430, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 300, height: 300, borderRadius: 150, overflow: 'hidden', transform: `scale(${a})`, boxShadow: `0 0 0 6px rgba(255,255,255,.9), 0 0 80px ${ACCENT}88` }}>
          <Img src={staticFile('foto-profil.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: 780, width: '100%', textAlign: 'center', fontFamily: FONT, opacity: b, transform: `translateY(${(1 - b) * 30}px)` }}>
        <div style={{ fontSize: 70, fontWeight: 800, color: '#fff' }}>Reyo Bian</div>
        <div style={{ fontSize: 34, fontWeight: 500, color: 'rgba(255,255,255,.6)', marginTop: 6 }}>Tips teknologi sehari-hari</div>
      </div>
      <div style={{ position: 'absolute', top: 1010, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, fontFamily: FONT, opacity: c, transform: `translateY(${(1 - c) * 40}px)` }}>
        <div style={{ width: 600, height: 110, borderRadius: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 800, letterSpacing: 2,
          background: followed ? 'rgba(255,255,255,.12)' : ACCENT, color: '#fff', border: followed ? '2px solid rgba(255,255,255,.4)' : 'none', transform: `scale(${press(36)})`,
          boxShadow: followed ? 'none' : `0 0 60px ${ACCENT}99` }}>{followed ? '✓  Mengikuti' : '+  Follow'}</div>
        <div style={{ width: 600, height: 110, borderRadius: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 800, letterSpacing: 2,
          background: shared ? '#fff' : 'transparent', color: shared ? '#111' : '#fff', border: '2px solid rgba(255,255,255,.6)', transform: `scale(${press(58)})` }}>{shared ? 'Terkirim' : 'Share'}</div>
      </div>
    </Scene>
  );
};

export const Video3: React.FC = () => {
  const scenes = [S1, S2, S3, S4, S5, S6, S7, S8];
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Background />
      {scenes.map((S, i) => {
        const from = SC[i], dur = (i === scenes.length - 1 ? V3_FRAMES : SC[i + 1]) - SC[i];
        return <Sequence key={i} from={from} durationInFrames={dur + (i < scenes.length - 1 ? 4 : 0)}><S dur={dur + 4} /></Sequence>;
      })}
      <Captions caps={T.CAPS} until={T.SC[7]} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)', pointerEvents: 'none' }} />
      <Audio src={staticFile('video3/voiceover.wav')} />
    </AbsoluteFill>
  );
};
