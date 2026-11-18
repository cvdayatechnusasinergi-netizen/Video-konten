# Video 8 — Sejarah YouTube: "YouTube Awalnya Situs Cari Jodoh". Pakai: python3 build_timeline.py [--no-tts]
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from timeline import build
SEGS = [
 [("YouTube awalnya situs cari jodoh.", None), ("Dan hampir enggak ada yang mau pakai.", None)],
 [("Tahun dua ribu lima,", "Tahun 2005,"), ("tiga mantan karyawan PayPal,", None), ("Chad Hurley, Steve Chen, dan Jawed Karim,", None),
  ("bikin situs video kencan.", None), ("Slogannya: Tyun in, huk ap.", "Slogannya: Tune In, Hook Up.")],
 [("Mereka sampai menawarkan uang dua puluh dolar buat yang mau unggah video.", "Mereka sampai menawarkan uang 20 dolar buat yang mau unggah video."), ("Tapi tetap sepi.", None)],
 [("Akhirnya mereka sadar:", None), ("orang mau unggah video apa saja,", None), ("bukan cuma video cari jodoh.", None), ("Batasannya dibuang.", None)],
 [("Video pertamanya cuma sembilan belas detik,", "Video pertamanya cuma 19 detik,"), ("di kebun binatang.", None), ("Setahun kemudian,", None),
  ("Google membeli YouTube seharga satu koma enam lima miliar dolar.", "Google membeli YouTube seharga 1,65 miliar dolar.")],
 [("Sekarang, lebih dari lima ratus jam video diunggah ke YouTube setiap menit.", "Sekarang, lebih dari 500 jam video diunggah ke YouTube setiap menit.")],
 [("Pelajarannya:", None), ("kalau ide kamu sepi peminat, jangan langsung menyerah.", None), ("Lihat apa yang sebenarnya orang butuhkan,", None), ("lalu ubah arah.", None),
  ("Coba minggu ini:", None), ("tanya tiga pelanggan atau teman,", "tanya 3 pelanggan atau teman,"), ("apa yang paling mereka butuhkan dari kamu.", None)],
 [("Video YouTube apa yang paling sering kamu tonton?", None), ("Tulis di komentar!", None)],
 [("Follow buat info teknologi sehari-hari!", None)],
]
def sfx(C, SC):
    e = [(SC[i] - .06, 'whoosh') for i in range(1, 9)]
    e += [(C[0][0] + .5, 'pop'), (C[0][1] + .3, 'pop')]
    e += [(C[1][2] + k * .35, 'pop') for k in range(3)] + [(C[1][4] + .3, 'ding')]
    e += [(C[2][0] + .8, 'pop'), (C[2][1] + .2, 'pop')]
    e += [(C[3][2] + .3, 'pop'), (C[3][3] + .1, 'ding'), (C[3][3] + .1, 'shake')]
    e += [(C[4][0] + .2, 'pop'), (C[4][3] + 1.0, 'ding'), (C[4][3] + 1.0, 'shake')]
    e += [(C[5][0] + .6, 'pop'), (C[5][0] + 2.4, 'ding')]
    e += [(C[6][1] + .2, 'pop'), (C[6][3] + .1, 'ding')] + [(C[6][5] + .2 + k * .4, 'pop') for k in range(3)]
    e += [(C[7][0] + .5 + k * .3, 'pop') for k in range(4)]
    e += [(SC[8] + 1.2, 'pop'), (SC[8] + 1.9, 'pop')]
    return e
build(SEGS, sfx, tts='--no-tts' not in sys.argv, holds={0: .3, 2: .4, 3: .4, 4: .5, 5: .5, 6: .3}, tail=2.2)
