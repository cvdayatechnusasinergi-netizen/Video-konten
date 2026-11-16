# Konten Facebook Pro — Reyo Bian (IT Support)

Akun FB pribadi mode profesional "Reyo Bian" (Freelance IT Support · Pangkalan Bun).
Terpisah dari seri SUARA: niche **IT untuk orang awam**.

## Gaya
- 1080×1920, 30 fps, ±45–60 dtk, latar hitam + grid titik + grain, aksen **kuning/emas `#F5B301`** (warna sampul profil).
- Bahasa santai pakai **"kamu"** (penonton FB lebih dewasa), bukan "lo/gue".
- Frame pertama = judul besar (tidak perlu `add_cover.sh`).
- Penutup: judul, logo RB (node jaringan), nama Reyo Bian, FOLLOW & SHARE.
- Upload MP4 langsung ke Facebook Reels (tanpa watermark TikTok).

## Video
| # | Judul | File |
|---|---|---|
| 1 | Jangan Buka File "Undangan.apk"! | `video1/output/jangan-buka-apk.mp4` (57,5 dtk) |

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

## Foto profil & sampul
- `profil/foto-profil.png` (1080×1080, stiker kartun dari `profil/foto-asli.jpg`).
- `profil/sampul.png` (1640×624): "ngoprek teknologi sehari-hari" (simpel, tanpa slogan). Teks di tengah atas
  supaya tidak ketutup foto profil & ikon menu di HP.
- Render ulang: `node reyobian/profil/render.js` (sumber gambar kartun: `profil/var-a.png`).
