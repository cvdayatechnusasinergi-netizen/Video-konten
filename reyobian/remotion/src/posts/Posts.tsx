// 5 gambar postingan Facebook (1080x1350) — Fakta sejarah teknologi + pelajaran praktis.
// Gaya sama dengan video Remotion: latar gelap, kartu UI, aksen biru. Tanpa logo merek asli.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ACCENT, Background, FONT } from '../v3/common';

const RED = '#FF4D4F';
type PostData = { n: number; tag: string; title: React.ReactNode; sub: string; art: React.ReactNode; facts: string[]; lesson: string };

const Post: React.FC<PostData> = ({ n, tag, title, sub, art, facts, lesson }) => (
  <AbsoluteFill style={{ fontFamily: FONT, color: '#fff' }}>
    <Background />
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(0,0,0,.55) 100%)' }} />
    {/* tata letak mengalir (flex) supaya blok tidak saling menimpa */}
    <div style={{ position: 'absolute', inset: '52px 64px 26px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 4, background: ACCENT, padding: '9px 20px', borderRadius: 999 }}>FAKTA TEKNOLOGI</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,.6)', letterSpacing: 3 }}>{tag} · {n}/5</div>
      </div>
      <div>
        <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.04, letterSpacing: -2 }}>{title}</div>
        <div style={{ fontSize: 30, fontWeight: 400, color: 'rgba(255,255,255,.75)', marginTop: 10, lineHeight: 1.25 }}>{sub}</div>
      </div>
      <div style={{ height: 360, flexShrink: 0, borderRadius: 32, background: 'rgba(16,18,28,.8)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 40px 100px rgba(0,0,0,.5)',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'scale(.95)' }}>{art}</div></div>
      <div style={{ background: 'rgba(255,255,255,.97)', borderRadius: 30, padding: '12px 30px', color: '#111', boxShadow: '0 30px 80px rgba(0,0,0,.5)' }}>
        {facts.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '11px 0', borderTop: i ? '2px solid #EEF0F3' : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: ACCENT, color: '#fff', fontSize: 20, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
            <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.27 }}>{f}</div>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 26, padding: '16px 28px', background: 'rgba(79,124,255,.16)', border: `3px solid ${ACCENT}` }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 3, color: '#9FB7FF' }}>PELAJARANNYA</div>
        <div style={{ fontSize: 29, fontWeight: 700, lineHeight: 1.25, marginTop: 4 }}>{lesson}</div>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: 22, color: 'rgba(255,255,255,.55)', fontWeight: 600 }}>
        <span>Reyo Bian · Info teknologi sehari-hari</span><span>Simpan & bagikan ↗</span>
      </div>
    </div>
  </AbsoluteFill>
);

// ---------- ilustrasi CSS ----------
const EmailArt: React.FC = () => (
  <div style={{ position: 'relative', width: 900, height: 360 }}>
    <div style={{ position: 'absolute', left: 60, top: 60, width: 460, height: 250, borderRadius: 24, background: '#fff', color: '#111', padding: 26, boxSizing: 'border-box', transform: 'rotate(-4deg)', boxShadow: '0 20px 50px rgba(0,0,0,.4)' }}>
      <div style={{ fontSize: 22, color: '#6B7280' }}>Kepada:</div>
      <div style={{ fontSize: 30, fontWeight: 800, fontFamily: '"JetBrains Mono", monospace' }}>user<span style={{ color: ACCENT }}>@</span>host</div>
      <div style={{ fontSize: 22, color: '#6B7280', marginTop: 16 }}>Isi:</div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' }}>QWERTYUIOP</div>
    </div>
    <div style={{ position: 'absolute', right: 70, top: 10, fontSize: 330, fontWeight: 900, color: ACCENT, lineHeight: 1, textShadow: `0 0 80px ${ACCENT}` }}>@</div>
  </div>
);
const CameraArt: React.FC = () => (
  <div style={{ position: 'relative', width: 900, height: 360 }}>
    <div style={{ position: 'absolute', left: 110, top: 70, width: 430, height: 230, borderRadius: 18, background: 'linear-gradient(160deg,#9CA3AF,#4B5563)', boxShadow: '0 30px 60px rgba(0,0,0,.5)' }}>
      <div style={{ position: 'absolute', left: -70, top: 70, width: 110, height: 110, borderRadius: 55, background: 'radial-gradient(circle,#1f2937 30%,#6b7280 32%,#374151 60%)', border: '8px solid #d1d5db' }} />
      {[0, 1, 2].map(i => <div key={i} style={{ position: 'absolute', left: 60 + i * 110, top: 40, width: 80, height: 150, borderRadius: 10, background: '#374151', border: '2px solid #6B7280' }} />)}
    </div>
    <div style={{ position: 'absolute', left: 600, top: 60, padding: '14px 24px', borderRadius: 16, background: RED, fontSize: 40, fontWeight: 900 }}>3,6 kg</div>
    <div style={{ position: 'absolute', left: 600, top: 150, padding: '14px 24px', borderRadius: 16, background: '#fff', color: '#111', fontSize: 40, fontWeight: 900 }}>0,01 MP</div>
    <div style={{ position: 'absolute', left: 600, top: 240, width: 200, height: 76, borderRadius: 10, background: '#111', border: '3px solid #6B7280' }}>
      {[0, 1].map(i => <div key={i} style={{ position: 'absolute', left: 36 + i * 90, top: 16, width: 44, height: 44, borderRadius: 22, border: '6px solid #9CA3AF' }} />)}
    </div>
  </div>
);
const SmsArt: React.FC = () => (
  <div style={{ position: 'relative', width: 900, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70 }}>
    <div style={{ width: 300, height: 300, borderRadius: 26, background: '#e5e7eb', color: '#111', padding: 22, boxSizing: 'border-box', fontFamily: '"JetBrains Mono", monospace', boxShadow: '0 20px 50px rgba(0,0,0,.4)' }}>
      <div style={{ fontSize: 20, color: '#6B7280' }}>KOMPUTER · 1992</div>
      <div style={{ fontSize: 26, marginTop: 20 }}>&gt; kirim ke HP</div>
      <div style={{ fontSize: 26 }}>&gt; "Merry Christmas"</div>
      <div style={{ fontSize: 26, color: '#16A34A', marginTop: 10 }}>✓ terkirim</div>
    </div>
    <div style={{ fontSize: 70, color: ACCENT }}>→</div>
    <div style={{ width: 170, height: 320, borderRadius: 30, background: 'linear-gradient(115deg,#2b2f37,#5b616d 40%,#30343c)', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,.5)' }}>
      <div style={{ position: 'absolute', left: 18, right: 18, top: 30, height: 120, borderRadius: 8, background: '#9fc79a', color: '#1d3317', fontFamily: '"JetBrains Mono", monospace', fontSize: 20, padding: 10, boxSizing: 'border-box' }}>Merry Christmas</div>
      <div style={{ position: 'absolute', left: 22, right: 22, top: 170, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>{Array.from({ length: 9 }, (_, i) => <div key={i} style={{ height: 30, borderRadius: 6, background: '#c9ced8' }} />)}</div>
    </div>
  </div>
);
const BugArt: React.FC = () => (
  <div style={{ position: 'relative', width: 900, height: 360 }}>
    <div style={{ position: 'absolute', left: 120, top: 30, width: 660, height: 300, background: '#F5EFD9', borderRadius: 10, transform: 'rotate(-2deg)', boxShadow: '0 20px 50px rgba(0,0,0,.4)', color: '#3b3a36', padding: '26px 34px', boxSizing: 'border-box', fontFamily: 'Caladea, serif' }}>
      {[0, 1, 2, 3, 4].map(i => <div key={i} style={{ position: 'absolute', left: 30, right: 30, top: 60 + i * 50, height: 2, background: '#cfc6a6' }} />)}
      <div style={{ fontSize: 26, fontStyle: 'italic' }}>9/9 · 15:45 — Relay #70 Panel F</div>
      {/* ngengat ditempel selotip */}
      <div style={{ position: 'absolute', left: 250, top: 100, width: 170, height: 60, background: 'rgba(255,255,255,.6)', transform: 'rotate(-6deg)' }} />
      <div style={{ position: 'absolute', left: 318, top: 92, width: 16, height: 70, borderRadius: 8, background: '#5b4a35' }} />
      <div style={{ position: 'absolute', left: 250, top: 100, width: 76, height: 50, borderRadius: '70% 20% 60% 30%', background: '#8a7558', transform: 'rotate(-20deg)' }} />
      <div style={{ position: 'absolute', left: 328, top: 100, width: 76, height: 50, borderRadius: '20% 70% 30% 60%', background: '#8a7558', transform: 'rotate(20deg)' }} />
      <div style={{ position: 'absolute', left: 34, top: 205, fontSize: 32, fontStyle: 'italic' }}>"First actual case of bug being found."</div>
    </div>
  </div>
);
const DiskArt: React.FC = () => (
  <div style={{ position: 'relative', width: 900, height: 360, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 120, paddingBottom: 40, boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 300, height: 250, borderRadius: 12, background: 'linear-gradient(180deg,#d1d5db,#9ca3af)', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,.5)' }}>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 30, height: 120, borderRadius: 8, background: 'repeating-linear-gradient(180deg,#6b7280 0 10px,#9ca3af 10px 14px)' }} />
        <div style={{ position: 'absolute', left: 30, top: 170, padding: '6px 14px', borderRadius: 8, background: RED, fontSize: 26, fontWeight: 900 }}>±1 TON</div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800 }}>1956 · ±5 MB</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 70, height: 90, background: '#111827', border: `3px solid ${ACCENT}`, clipPath: 'polygon(0 0, 70% 0, 70% 15%, 100% 15%, 100% 100%, 0 100%)', boxShadow: `0 0 40px ${ACCENT}` }} />
      <div style={{ fontSize: 30, fontWeight: 800 }}>Sekarang · 1 TB</div>
      <div style={{ fontSize: 22, color: 'rgba(255,255,255,.6)' }}>microSD seukuran kuku</div>
    </div>
  </div>
);

export const POSTS: PostData[] = [
  { n: 1, tag: '1971', title: <>Simbol <span style={{ color: '#7EA2FF' }}>@</span> di email<br />dipilih dalam sekejap</>, sub: 'Dan sekarang dipakai miliaran orang setiap hari.', art: <EmailArt />,
    facts: ['Tahun 1971, Ray Tomlinson mengirim email pertama antar komputer.', 'Ia butuh tanda pemisah nama orang & nama komputer. Dipilihlah "@" yang jarang dipakai.', 'Isi email pertamanya? Ia sendiri lupa — kemungkinan cuma huruf acak seperti "QWERTYUIOP".'],
    lesson: 'Ide sederhana yang benar-benar berguna bisa dipakai seluruh dunia. Jangan remehkan solusi kecil.' },
  { n: 2, tag: '1975', title: <>Penemu kamera digital<br /><span style={{ color: RED }}>malah bangkrut</span></>, sub: 'Kodak menemukan kamera digital pertama… lalu menyimpannya.', art: <CameraArt />,
    facts: ['Tahun 1975, insinyur Kodak, Steven Sasson, membuat kamera digital pertama: berat 3,6 kg, resolusi 0,01 MP.', 'Satu foto butuh 23 detik untuk disimpan ke kaset.', 'Kodak takut bisnis film-nya tersaingi, jadi kurang serius mengembangkannya. Tahun 2012, Kodak bangkrut.'],
    lesson: 'Jangan takut sama ide baru, sekalipun mengganggu kebiasaan lama. Kalau bukan kamu, orang lain yang pakai.' },
  { n: 3, tag: '1992', title: <>SMS pertama di dunia<br />isinya cuma <span style={{ color: '#7EA2FF' }}>2 kata</span></>, sub: '“Merry Christmas.” Dikirim dari komputer, bukan dari HP.', art: <SmsArt />,
    facts: ['3 Desember 1992, insinyur Neil Papworth mengirim SMS pertama ke HP rekannya di Inggris.', 'Dikirim dari komputer, karena HP waktu itu belum bisa mengetik pesan.', 'Penerimanya bahkan tidak bisa membalas — fitur kirim SMS dari HP belum ada.'],
    lesson: 'Teknologi yang dulu sulit & mahal sekarang ada di genggaman. Pakai HP kamu buat belajar hal baru, bukan cuma scroll.' },
  { n: 4, tag: '1947', title: <>"Bug" komputer pertama<br />itu <span style={{ color: '#FACC15' }}>ngengat sungguhan</span></>, sub: 'Ditemukan nyangkut di dalam komputer, lalu ditempel di buku catatan.', art: <BugArt />,
    facts: ['9 September 1947, komputer Harvard Mark II tiba-tiba error.', 'Tim Grace Hopper menemukan ngengat tersangkut di salah satu relai.', 'Ngengatnya ditempel di buku log dengan catatan: "First actual case of bug being found."'],
    lesson: 'Saat HP atau laptop error, catat kapan & setelah apa error-nya muncul. Catatan kecil bikin perbaikan jauh lebih cepat.' },
  { n: 5, tag: '1956', title: <>Hard disk pertama:<br /><span style={{ color: '#7EA2FF' }}>±5 MB</span>, berat <span style={{ color: RED }}>±1 ton</span></>, sub: 'Sekarang 1 TB muat di kartu seukuran kuku.', art: <DiskArt />,
    facts: ['Tahun 1956, IBM merilis hard disk pertama berkapasitas sekitar 5 MB.', 'Beratnya lebih dari 1 ton dan harus diangkut pakai forklift atau pesawat.', 'Sekarang kartu microSD 1 TB beratnya kurang dari 1 gram.'],
    lesson: 'Penyimpanan sekarang murah, kehilangan data itu mahal. Rutin backup foto & dokumen penting, minimal sebulan sekali.' },
];
export const PostStill: React.FC<{ i: number }> = ({ i }) => <Post {...POSTS[i]} />;
