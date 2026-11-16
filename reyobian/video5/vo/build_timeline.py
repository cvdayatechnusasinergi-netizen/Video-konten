# Video 5 — Sejarah WhatsApp: "Ditolak Facebook, Lalu Dibeli $19 Miliar". Pakai: python3 build_timeline.py [--no-tts]
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from timeline import build
SEGS = [
 [("Orang ini pernah ditolak kerja di Facebook.", None), ("Lima tahun kemudian,", None), ("Facebook malah membeli aplikasinya seharga sembilan belas miliar dolar.", "Facebook malah membeli aplikasinya seharga 19 miliar dolar.")],
 [("Namanya Brian Acton.", None), ("Tahun dua ribu sembilan,", "Tahun 2009,"), ("dia ditolak Twitter,", None), ("lalu ditolak Facebook.", None)],
 [("Bareng temannya, Jan Kum,", "Bareng temannya, Jan Koum,"), ("mereka bikin aplikasi kecil:", None), ("WhatsApp.", None)],
 [("Awalnya cuma buat pasang status,", None), ("dan sering error.", None), ("Jan Kum hampir menyerah.", "Jan Koum hampir menyerah.")],
 [("Tapi mereka terus memperbaiki,", None), ("sampai berubah jadi aplikasi chat.", None), ("Simpel,", None), ("tanpa iklan,", None), ("dan hemat kuota.", None)],
 [("Tahun dua ribu empat belas,", "Tahun 2014,"), ("Facebook membelinya seharga sembilan belas miliar dolar.", "Facebook membelinya seharga 19 miliar dolar."),
  ("Sekarang, penggunanya lebih dari dua miliar orang.", "Sekarang, penggunanya lebih dari 2 miliar orang.")],
 [("Pelajarannya:", None), ("ditolak itu bukan akhir.", None), ("Kalau kamu baru ditolak,", None), ("entah kerjaan, ide, atau usaha,", None),
  ("catat satu hal yang bisa diperbaiki,", "catat 1 hal yang bisa diperbaiki,"), ("lalu coba lagi.", None)],
 [("Kamu pernah ditolak,", None), ("tapi akhirnya malah dapat yang lebih baik?", None), ("Cerita di komentar!", None)],
 [("Follow buat info teknologi sehari-hari!", None)],
]
def sfx(C, SC):
    e = [(SC[i] - .06, 'whoosh') for i in range(1, 9)]
    e += [(C[0][0] + 1.0, 'pop'), (C[0][0] + 1.0, 'shake'), (C[0][2] + 1.2, 'ding')]
    e += [(C[1][2] + .1, 'pop'), (C[1][3] + .1, 'pop')]
    e += [(C[2][0] + .3, 'pop'), (C[2][2] + .1, 'ding')]
    e += [(C[3][1] + .1, 'pop'), (C[3][1] + .5, 'pop'), (C[3][1] + .5, 'shake'), (C[3][2] + .2, 'pop')]
    e += [(C[4][1] + .2, 'pop'), (C[4][1] + .5, 'pop')] + [(C[4][k] + .05, 'pop') for k in (2, 3, 4)]
    e += [(C[5][1] + .8, 'ding'), (C[5][1] + .8, 'shake'), (C[5][2] + .6, 'pop')]
    e += [(C[6][1] + .1, 'pop'), (C[6][4] + .2, 'pop'), (C[6][5] + .2, 'ding')]
    e += [(C[7][1] + .3 + k * .3, 'pop') for k in range(3)]
    e += [(SC[8] + 1.2, 'pop'), (SC[8] + 1.9, 'pop')]
    return e
build(SEGS, sfx, tts='--no-tts' not in sys.argv, holds={0: .3, 3: .4, 4: .3, 5: .5, 6: .3}, tail=2.2)
