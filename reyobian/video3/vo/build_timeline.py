# Video 3 — Sejarah iPhone. Pakai: python3 build_timeline.py [--no-tts]
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from timeline import build
Y = lambda sp, cap: (sp, cap)
SEGS = [
 [("iPhone pertama itu enggak bisa copy-paste.", None), ("Serius!", None)],
 [("Tahun dua ribu tujuh,", "Tahun 2007,"), ("Steve Jobs naik panggung bawa satu alat:", None), ("iPod,", None), ("telepon,", None), ("dan internet,", None), ("jadi satu!", None),
  ("Tapi masih dua G,", "Tapi masih 2G,"), ("belum ada App Store,", None), ("dan kameranya enggak bisa rekam video.", None)],
 [Y("Dua ribu delapan,", "2008,"), ("App Store lahir.", None), Y("Dua ribu sepuluh,", "2010,"), ("ada kamera depan buat FaceTime.", None),
  Y("Dua ribu sebelas,", "2011,"), ("Siri muncul.", None), Y("Dua ribu tiga belas,", "2013,"), ("buka HP pakai sidik jari.", None),
  Y("Dua ribu enam belas,", "2016,"), ("lubang headset dihapus!", None), Y("Dua ribu tujuh belas,", "2017,"), ("tombol home hilang,", None), ("diganti Face ID.", None),
  Y("Dua ribu dua puluh,", "2020,"), ("charger enggak lagi dikasih di dalam kotak.", None), Y("Dua ribu dua puluh tiga,", "2023,"), ("akhirnya pakai USB-C.", None),
  Y("Dan dua ribu dua puluh enam,", "Dan 2026,"), ("iPhone lipat pertama!", None)],
 [("Di Indonesia sendiri,", None), ("iPhone enam belas sempat enggak bisa dijual resmi,", "iPhone 16 sempat enggak bisa dijual resmi,"), ("gara-gara aturan TKDN,", None), ("baru masuk tahun dua ribu dua puluh lima.", "baru masuk tahun 2025.")],
 [("Dari enggak bisa copy-paste,", None), ("sampai bisa dilipat.", None)],
 [("iPhone pertama kamu seri berapa?", None), ("Atau kamu tim Android?", None), ("Tulis di komentar!", None)],
 [("Follow Reyo Bian buat tips teknologi sehari-hari!", None)],
]
def sfx(C, SC):
    e = [(SC[i] - .06, 'whoosh') for i in range(1, 7)]
    e += [(C[0][1], 'pop'), (C[0][1], 'shake')]
    e += [(C[1][k], 'pop') for k in (2, 3, 4)] + [(C[1][5], 'ding')] + [(C[1][k] + .1, 'pop') for k in (6, 7, 8)]
    e += [(C[2][k], 'pop') for k in (0, 2, 4, 6, 8, 10, 13, 15, 17)] + [(C[2][18], 'ding'), (C[2][18], 'shake')]
    e += [(C[3][1] + .3, 'pop'), (C[3][2] + .1, 'pop'), (C[3][3] + .5, 'ding')]
    e += [(C[4][0] + .1, 'pop'), (C[4][1] + .2, 'ding')]
    e += [(C[5][0] + .5 + k * .4, 'pop') for k in range(4)]
    e += [(SC[6] + 1.9, 'pop'), (SC[6] + 2.6, 'pop')]
    return e
build(SEGS, sfx, tts='--no-tts' not in sys.argv, holds={2: .3, 4: .2},
      fix={2: dict(enumerate([0, .95, 1.89, 2.76, 4.25, 5.20, 6.04, 7.04, 8.43, 9.37, 10.51, 11.52, 12.51, 13.71, 14.63, 16.28, 17.40, 18.45, 19.74]))})
