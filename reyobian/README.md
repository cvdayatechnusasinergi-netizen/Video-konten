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
- **Penutup VO (mulai video 3): "Follow buat tips teknologi sehari-hari!"** — tanpa menyebut nama "Reyo Bian".
- Upload MP4 langsung ke Facebook Reels (tanpa watermark TikTok).

## Video
| # | Judul | File |
|---|---|---|
| 1 | Jangan Buka File "Undangan.apk"! | `video1/output/jangan-buka-apk.mp4` (57,5 dtk) |
| 2 | Cara Kerja Kuota: 1 GB Cukup Buat Apa? | `video2/output/cara-kerja-kuota.mp4` (45,8 dtk) |
| 3 | HP Ini Sempat Diketawain (Sejarah iPhone, v2 gaya B) | `video3/output/sejarah-iphone.mp4` (38,8 dtk) |

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

### #3 — Caption Facebook
> Tahun 2007, HP ini sempat diketawain 😂
> "Kemahalan!", "Enggak ada tombolnya?", "Ngetiknya pakai apa?" — padahal waktu itu belum bisa copy-paste, belum ada App Store, internetnya masih 2G.
> Sekarang? Hampir semua HP, termasuk Android, bentuknya ya begitu.
>
> Yang diketawain hari ini, bisa jadi standar besok.
> Menurut kamu, teknologi apa yang sekarang masih diketawain? HP lipat? Tulis di komentar 👇
>
> #iphone #sejarahteknologi #teknologi #faktaunik #pangkalanbun

Catatan v2: versi pertama (daftar 9 tahun, gaya hitam-emas) dinilai membingungkan -> diganti satu cerita jelas
("diketawain -> jadi standar") dengan **gaya B**: latar biru-ungu gelap + grid, cahaya biru/pink/oranye bergerak,
teks gradasi oranye->pink, gelembung kaca, ilustrasi HP penuh warna besar, emoji ketawa. HP generik (tanpa logo Apple).
Naskah lama: `vo/build_timeline_v1.py`. Uji gaya: `style-test.html`, `gaya-A-vs-B.png`.

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
