# Video 8 Short — Yang Sabar Nggak Viral, Tapi Menang (±36 dtk)

Versi pendek video 8 untuk menarik audiens baru. VO CapCut video 8 dipotong & disusun ulang:
hook "Orang yang sabar nggak bakal viral. Tapi dia yang menang." di depan → Buffett US$84,5 M → 81,5 M setelah umur 65 →
bukan pinter milih saham, mulai umur 10 & nggak berhenti → rahasianya WAKTU → CTA @.suaraduit.

**Kamera virtual**: bingkai REC + timecode + kotak fokus di hook, goyangan handheld, rack focus (blur→tajam),
punch-out pembuka, zoom kecil tiap kata kunci, whip pan antar adegan.

Build: `python3 vo/build_short.py` (audio, segments.json, captions.json) lalu
`node render.js --page video8s --out video8s/output/buffett-short.mp4` dan `covers/add_cover.sh covers/cover-8s.png ...`.
Adegan memakai ulang fungsi s5/s6/s7 video 8 dengan pemetaan waktu `V(t)`.
