# Seri Video SUARA (@.suaraduit)

Motion graphic TikTok, tema motivasi hidup & keuangan. Tiap video: folder `videoN/` berisi `index.html` (animasi canvas), `vo/` (naskah + voice over), `output/` (MP4).

## Alur kerja
1. Tulis dan tampilkan **judul + ide + alur adegan** ke user dulu, tunggu persetujuan ("Gas").
2. Buat voice over dulu (timing animasi mengikuti narasi), lalu animasi, cek still frame, render, commit & push.

## Gaya visual
- Hitam-putih: latar hitam, elemen putih/abu, grid titik, grain, glow putih. Tanpa warna lain.
- 1080×1920, 30 fps, ±45–60 detik. Teks penting di area aman (y ±350–1550, jauh dari tepi kanan/bawah).
- Penutup selalu: judul, logo SUARA (gelombang pulse), handle, tombol FOLLOW & SHARE.
- **Handle: `@.suaraduit`** (nama profil "Suara | Duit dan Mindset") mulai video 6. Saat menyalin template
  dari video sebelumnya, ganti default `handle` di CONFIG `index.html` jadi `'@.suaraduit'`.
  Video 1–5 tetap pakai `@.notingme` (tidak dirender ulang).
- **Frame pertama wajib berisi judul/hook besar** (bukan layar hitam), supaya thumbnail grid TikTok terbaca.
  Buat cover di `covers/cover.html` (tambah entri COVERS), render `node covers/render-covers.js N`,
  lalu tempel ke MP4: `covers/add_cover.sh covers/cover-N.png videoN/output/<nama>.mp4`.
- Caption + hashtag tiap video dicatat di `PROFIL-DAN-CAPTION.md`.

## Format wajib mulai video 8 (terinspirasi format "48 Laws of Power" ala The Brighter Mind)
- **Subtitle per kata** di 1/3 bawah layar (y ±1250–1350), muncul kata demi kata mengikuti VO
  (timing dari `--write-subtitles`/WordBoundary edge-tts). Kata kunci disorot: kotak putih + teks hitam.
- **Badge seri bernomor dari buku/prinsip terkenal** di atas judul, contoh
  `PSYCHOLOGY OF MONEY · BAB 4` atau `RICH DAD POOR DAD · PELAJARAN 1`. Ringkas pakai kata sendiri, jangan kutip panjang.
- **Judul prinsip besar** di bawah badge (boleh judul asli Inggris + terjemahan santai).
- **Hook kecil persisten** di atas (mis. "Cara Duitmu Bekerja") dan **logo SUARA kecil** di pojok kanan atas sepanjang video
  (hindari area UI kanan bawah).
- Caption TikTok berbentuk **cerita kontras** ("Dua tahun ditonton 300 orang. Satu kalimat: dua juta.").
- Warna tetap hitam-putih; sorotan pakai kotak putih (bukan kuning).

## Gaya bahasa (berlaku mulai video 5)
- **Santai, gaya Gen Z, jangan kaku.** Pakai "lo/gue", kalimat pendek, kayak ngobrol sama temen.
- Boleh pakai kata gaul secukupnya: *literally, jujurly, bestie, boncos, ceban, self-reward, nongki, sisihin, kerasa, gaskeun* — jangan berlebihan sampai maksa.
- Hindari bahasa baku/formal ("dengan konsisten", "berperan", "melindungi kamu"). Ganti dengan versi ngobrol ("rutin", "main", "jagain lo").
- Teks di layar ikut gaya yang sama dengan narasi.
- Penutup VO: "Follow Suara buat insight harian, dan share ke temen lo yang …"
- Video 1–4 tetap memakai gaya lama (tidak dirender ulang).

## Voice over
- `edge-tts`, suara `id-ID-ArdiNeural`, `--rate=+3%`. Host `speech.platform.bing.com` diizinkan di environment "Video-konten".
- Satu baris naskah per adegan di `vo/script.txt`; potong hening tiap segmen, gabung dengan `vo/build_vo.sh` (atur STARTS & durasi).
- Angka keuangan diberi catatan "*ilustrasi, asumsi …" bila memakai imbal hasil.

## Render
`node render.js --page videoN --out videoN/output/<nama>.mp4` (still: `--stills 3,10,20`).
