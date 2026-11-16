# Konten Facebook Pro — Reyo Bian (IT Support)

Akun FB pribadi mode profesional "Reyo Bian" (Freelance IT Support · Pangkalan Bun).
Terpisah dari seri SUARA: niche **IT untuk orang awam**.

## Gaya
- 1080×1920, 30 fps, ±45–60 dtk, latar hitam + grid titik + grain, aksen **kuning/emas `#F5B301`** (warna sampul profil).
- Bahasa santai pakai **"kamu"** (penonton FB lebih dewasa), bukan "lo/gue". **Ejaan bahasa Indonesia yang benar**
  di VO & teks layar (tahu, enggak, habis, dipakai, sebenarnya, matikan) — tetap asik, bukan kaku.
- **Tempo cepat & ramai** (mulai video 2, TANPA musik): edge-tts `--rate=+24% --pitch=+4Hz`, jeda dipadatkan.
  `vo/build_timeline.py` membuat VO + mendeteksi awal tiap frasa -> `timing.js` (batas adegan, `warp` animasi,
  caption, event efek). `vo/make_audio.py` -> efek suara saja (whoosh/pop/ding). `vo/build_vo.sh` -> mix.
  Visual: caption bawah (kata aktif kuning), transisi zoom, kamera push-in, hentakan zoom + partikel tiap efek,
  getar di momen kunci, kilat putih saat ganti adegan, cahaya latar bergerak.
  Urutan: `python3 build_timeline.py && python3 make_audio.py && ./build_vo.sh`, lalu render.
- Frame pertama = judul besar (tidak perlu `add_cover.sh`).
- Penutup: judul, logo RB (node jaringan), nama Reyo Bian, FOLLOW & SHARE.
- **Penutup VO: "Follow buat info teknologi sehari-hari!"** — tanpa menyebut nama "Reyo Bian", dan pakai kata **info** (bukan "tips").
- Upload MP4 langsung ke Facebook Reels (tanpa watermark TikTok).

## Video
| # | Judul | File |
|---|---|---|
| 1 | Jangan Buka File "Undangan.apk"! | `video1/output/jangan-buka-apk.mp4` (57,5 dtk) |
| 2 | Cara Kerja Kuota: 1 GB Cukup Buat Apa? | `video2/output/cara-kerja-kuota.mp4` (45,8 dtk) |
| 3 | Perusahaan Ini Pernah Hampir Bangkrut (Sejarah Apple, **Remotion**) | `video3/output/sejarah-apple.mp4` (49,9 dtk) — versi iPhone lama: `sejarah-iphone.mp4` (tidak dipakai) |
| 4 | Dulu Raja HP, Terus Ke Mana? (Sejarah Nokia, **Remotion**) | `video4/output/sejarah-nokia.mp4` (48,2 dtk) |

Render: `node render.js --page reyobian/video1 --out reyobian/video1/output/jangan-buka-apk.mp4`
VO: `reyobian/video1/vo/script.txt` → seg0..6.wav → `vo/build_vo.sh`.

### #1 — Caption Facebook
> ⚠️ Kalau dapet file "Undangan.apk", "Resi Paket.apk", atau "Surat Tilang.apk" di WhatsApp — JANGAN DIBUKA.
> Sekali diinstal, kode OTP kamu bisa kebaca penipu dan saldo m-banking habis dalam hitungan menit.
>
> ✅ Cara ngenalin: nama file berakhiran .apk, dari nomor nggak dikenal, nyuruh buru-buru buka.
> 🚨 Terlanjur keinstal? Matiin data & WiFi → hapus aplikasinya → telepon bank → ganti password.
>
> Tolong share ke grup keluarga ya, apalagi yang ada orang tua 🙏
> Kamu atau keluarga pernah dapet file kayak gini? Cerita di komen 👇
>
> #penipuanonline #waspadapenipuan #tipsIT #keamanandigital #pangkalanbun

### #2 — Caption Facebook
> Kuota 1 GB itu sebenarnya cukup buat apa, sih? 🤔
> Ternyata setiap kamu buka apa pun di HP, ada data yang bolak-balik lewat tower — itulah yang dihitung sebagai kuota.
>
> 📱 1 GB kira-kira: chat WA ribuan pesan · telepon WA ±16 jam · video call ±2 jam · Reels ±1 jam · YouTube HD ±20–30 menit
> 🔥 Cepat habis? Cek autoplay video, update otomatis, dan backup foto.
>
> Kuota kamu biasanya habis buat apa? Tulis di kolom komentar 👇
>
> #kuotainternet #tipsHP #kuotacepathabis #tekno #pangkalanbun

Catatan: penutup video mulai #2 hanya menulis "Pangkalan Bun" (tanpa "Freelance IT Support").

### #3 — Caption Facebook (Sejarah Apple)
> Perusahaan ini pernah tinggal beberapa bulan lagi dari bangkrut 😳
> 1976 mulai dari garasi → 1985 Steve Jobs didepak → 1997 hampir bangkrut karena kebanyakan produk.
> Jobs balik, pangkas sekitar 70% produk jadi cuma 4. Hasilnya: iMac, iPod, iPhone… dan 2018 tembus $1 triliun.
>
> Pelajarannya: lebih baik sedikit tapi bagus, daripada banyak tapi setengah-setengah.
> Coba hari ini: tulis semua kerjaan kamu, pilih 3 yang paling penting.
>
> Apa yang paling susah buat kamu fokusin? Tulis di komentar 👇
>
> #apple #sejarahteknologi #stevejobs #fokus #pangkalanbun

Catatan: naskah final `vo/build_timeline.py` (Apple). Naskah lama iPhone: `vo/build_timeline_iphone.py` & `build_timeline_v1.py`.
Remotion: komposisi `Video3Apple` (`remotion/src/v3/AppleHistory.tsx`). Produk digambar generik, tanpa logo Apple.

Catatan v2: versi pertama (daftar 9 tahun, gaya hitam-emas) dinilai membingungkan -> diganti satu cerita jelas
("diketawain -> jadi standar") dengan **gaya B**: latar biru-ungu gelap + grid, cahaya biru/pink/oranye bergerak,
teks gradasi oranye->pink, gelembung kaca, ilustrasi HP penuh warna besar, emoji ketawa. HP generik (tanpa logo Apple).
Naskah lama: `vo/build_timeline_v1.py`. Uji gaya: `style-test.html`, `gaya-A-vs-B.png`.

### #4 — Caption Facebook (Sejarah Nokia)
> Dulu hampir 4 dari 10 HP di dunia itu Nokia. Terus, ke mana perginya? 🤔
> Awalnya pabrik kertas (1865) → karet → kabel → raja HP. Nokia 1100 saja terjual 200 juta+ unit.
> Tapi 2007 datang layar sentuh & Android. Nokia terlalu nyaman, telat berubah — 2013 bisnis HP-nya dijual ke Microsoft.
> Plot twist: Nokia enggak mati. Sekarang jualan perangkat jaringan 4G/5G.
>
> Pelajarannya: yang bikin jatuh itu terlalu nyaman, yang bikin bangkit itu berani berubah.
> Skill apa yang mungkin enggak kepakai 5 tahun lagi? Mulai pelajari 1 hal baru minggu ini.
>
> HP Nokia pertama kamu tipe apa? Tulis di komentar 👇
>
> #nokia #sejarahteknologi #hpjadul #teknologi #pangkalanbun

Remotion: komposisi `Video4Nokia` (`remotion/src/v4/Nokia.tsx`). HP digambar generik, tanpa logo Nokia.

## Gaya tetap: Remotion (mulai video 3) — disukai user
- Proyek `remotion/` (React). Tampilan: latar gelap halus (gumpalan biru tua + grid titik), **HP 3D realistis** (CSS 3D,
  bingkai logam, kilau kaca), **kartu UI asli** (komentar FB, berita, panel pengaturan), animasi pegas, kedalaman
  (blur jauh/dekat), teks minimal, palet netral + aksen biru `#4F7CFF`. Hindari: ilustrasi "digambar", emoji, gelembung
  kartun, teks gradasi, layar kosong, terlalu banyak tulisan.
- Alur: naskah & VO tetap lewat `videoN/vo/build_timeline.py` + `tools/` -> ekspor `timing.js` ke `remotion/src/data/videoN.json`,
  salin `voiceover.wav` ke `remotion/public/videoN/`, buat `remotion/src/vN/VideoN.tsx` (pakai `src/v3/common.tsx`).
- Render: `cd remotion && npx remotion render src/index.ts Video3 out/video3.mp4 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell --concurrency=4 --crf=18`
  (±6,5 menit), lalu salin ke `videoN/output/`. Frame pertama tetap berisi judul besar.
- Lisensi Remotion: gratis untuk individu/usaha kecil (≤3 orang).
- **Frame penutup: tanpa foto profil**, cukup nama akun "Reyo Bian" + "Info teknologi sehari-hari" + tombol Follow & Share.

## Alat bersama (`tools/`, mulai video 3)
- `tools/timeline.py` — TTS cepat + deteksi awal frasa (`align`, bisa dikoreksi manual lewat `fix`) -> `timing.js` (SC, CUE, EVENTS, SHAKE, CAPS).
- `tools/sfx.py` (efek suara dari `timing.json`), `tools/mix.sh` (VO + efek -> `voiceover.wav`), `tools/tts.py` (edge-tts lewat CA proxy).
- Per video: `vo/build_timeline.py` berisi naskah per frasa + daftar efek; di `index.html` pakai `cu(adegan, frasa)` untuk timing animasi.
- Urutan (dari `videoN/vo/`): `python3 build_timeline.py && python3 ../../tools/sfx.py && ../../tools/mix.sh`, lalu render.

## Foto profil & sampul
- `profil/foto-profil.png` (1080×1080): opsi 3, foto natural + cincin emas tipis (dari `profil/foto-asli.jpg`).
- `profil/sampul.png` (1640×624): "pelan-pelan aja, mulai dari yang kita suka." di atas bokeh blur dari foto sendiri (`cover-bg.jpg`). Teks di tengah atas
  supaya tidak ketutup foto profil & ikon menu di HP.
- Render ulang sampul: `node reyobian/profil/render.js`.
