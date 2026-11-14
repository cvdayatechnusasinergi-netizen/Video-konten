# 1% Lebih Baik Setiap Hari — Motion Graphic TikTok

Video motivasi hidup & keuangan, gaya hitam-putih, 1080×1920 (9:16), 30 fps, 48 detik, dengan voice over Bahasa Indonesia.
Akun: **SUARA (@.notingme)**

## Alur
| Waktu | Adegan |
|---|---|
| 0–9 dtk | Hook: 1,01³⁶⁵ = 37,78 vs 0,99³⁶⁵ = 0,03 |
| 9–13,6 | "Bedanya cuma 1% sehari." → menyusut jadi satu titik |
| 13,6–22,8 | HIDUP: titik tumbuh jadi jaringan (baca, jalan, belajar) |
| 22,8–33 | UANG: Rp10.000/hari → grafik majemuk ±Rp49,2 juta (10 th, asumsi 6%/th) |
| 33–39 | Pohon tumbuh: "Awalnya tak terlihat… sampai suatu hari semua orang melihatnya." |
| 39–48 | "Mulai hari ini. Bukan besok." + Follow & Share @.notingme |

## Cara pakai
- Preview: buka `index.html` di browser.
- Render MP4: `node render.js` → `output/1-persen-lebih-baik.mp4` (butuh Playwright + ffmpeg).
- Ganti akun: `node render.js --handle @akunlain --brand NAMA`.
- Teks, angka tabungan, dan asumsi imbal hasil ada di `CONFIG` & fungsi scene di `index.html`.

## Voice over
- Naskah: `vo/script.txt` (satu baris per adegan). Suara: Microsoft Neural `id-ID-ArdiNeural` via `edge-tts`.
- Buat ulang segmen: `edge-tts --voice id-ID-ArdiNeural --rate=+3% --text "..." --write-media segN.mp3`, potong hening ke `segN.wav`, lalu `vo/build_vo.sh` → `vo/voiceover.wav`.
- `render.js` otomatis memakai `vo/voiceover.wav` (pakai `--audio none` untuk versi tanpa suara).
- Belum ada musik — tambahkan sound di TikTok dengan volume kecil (±15–25%) supaya narasi tetap jelas.
