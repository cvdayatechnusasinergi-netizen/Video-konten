# Video 3 (final) — Sejarah Apple: "Perusahaan Ini Pernah Hampir Bangkrut". Pakai: python3 build_timeline.py [--no-tts]
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from timeline import build
SEGS = [
 [("Perusahaan ini pernah hampir bangkrut.", None), ("Sekarang, jadi salah satu yang paling bernilai di dunia.", None)],
 [("Tahun seribu sembilan ratus tujuh puluh enam,", "Tahun 1976,"), ("Apple dimulai dari sebuah garasi,", None), ("oleh Steve Jobs dan Steve Wozniak.", None)],
 [("Komputer mereka laris.", None), ("Tapi tahun seribu sembilan ratus delapan puluh lima,", "Tapi tahun 1985,"), ("Steve Jobs malah didepak dari perusahaannya sendiri.", None)],
 [("Tanpa dia, Apple bikin terlalu banyak produk yang bikin bingung.", None), ("Tahun seribu sembilan ratus sembilan puluh tujuh,", "Tahun 1997,"), ("Apple tinggal beberapa bulan lagi dari bangkrut.", None)],
 [("Jobs kembali,", None), ("dan langkah pertamanya:", None), ("memangkas sekitar tujuh puluh persen produk.", "memangkas sekitar 70% produk."), ("Sisanya cuma empat.", None)],
 [("Setelah fokus,", None), ("lahir iMac,", None), ("iPod,", None), ("lalu iPhone.", None), ("Tahun dua ribu delapan belas,", "Tahun 2018,"),
  ("Apple jadi perusahaan Amerika pertama yang nilainya tembus satu triliun dolar.", "Apple jadi perusahaan Amerika pertama yang nilainya tembus 1 triliun dolar.")],
 [("Pelajarannya:", None), ("lebih baik mengerjakan sedikit hal tapi bagus,", None), ("daripada banyak tapi setengah-setengah.", None), ("Coba hari ini:", None),
  ("tulis semua yang kamu kerjakan,", None), ("lalu pilih tiga yang paling penting.", "lalu pilih 3 yang paling penting.")],
 [("Menurut kamu, apa yang paling susah buat difokusin?", None), ("Tulis di komentar!", None)],
 [("Follow buat info teknologi sehari-hari!", None)],
]
def sfx(C, SC):
    e = [(SC[i] - .06, 'whoosh') for i in range(1, 9)]
    e += [(C[0][0] + .6, 'pop'), (C[0][1] + .2, 'ding')]
    e += [(C[1][1] + .2, 'pop'), (C[1][2] + .1, 'pop'), (C[1][2] + .5, 'pop')]
    e += [(C[2][2] + .1, 'pop'), (C[2][2] + .1, 'shake')]
    e += [(C[3][0] + .3 + k * .15, 'pop') for k in range(4)] + [(C[3][2] + .2, 'shake'), (C[3][2] + .2, 'pop')]
    e += [(C[4][2] + .1, 'whoosh'), (C[4][3] + .1, 'ding')]
    e += [(C[5][k] + .05, 'pop') for k in (1, 2, 3)] + [(C[5][5] + .9, 'ding'), (C[5][5] + .9, 'shake')]
    e += [(C[6][1] + .1, 'pop'), (C[6][4] + .3, 'pop'), (C[6][5] + .2, 'ding')]
    e += [(C[7][0] + .6 + k * .3, 'pop') for k in range(4)]
    e += [(SC[8] + 1.2, 'pop'), (SC[8] + 1.9, 'pop')]
    return e
build(SEGS, sfx, tts='--no-tts' not in sys.argv, holds={3: .35, 4: 1.4, 5: .5, 6: .3}, tail=2.2)
