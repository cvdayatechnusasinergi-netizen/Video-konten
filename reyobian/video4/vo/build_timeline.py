# Video 4 — Sejarah Nokia: "Dulu Raja HP, Terus Ke Mana?". Pakai: python3 build_timeline.py [--no-tts]
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from timeline import build
SEGS = [
 [("Dulu, hampir empat dari sepuluh HP di dunia itu Nokia.", "Dulu, hampir 4 dari 10 HP di dunia itu Nokia."), ("Terus, ke mana perginya?", None)],
 [("Uniknya, Nokia awalnya bukan perusahaan HP.", None), ("Tahun seribu delapan ratus enam puluh lima,", "Tahun 1865,"), ("Nokia itu pabrik kertas di Finlandia.", None)],
 [("Mereka terus berubah:", None), ("dari kertas,", None), ("karet,", None), ("kabel,", None), ("sampai jadi raja HP.", None),
  ("Nokia sebelas ratus saja terjual lebih dari dua ratus juta unit.", "Nokia 1100 saja terjual lebih dari 200 juta unit.")],
 [("Tapi tahun dua ribu tujuh,", "Tapi tahun 2007,"), ("muncul HP layar sentuh dan Android.", None), ("Nokia terlalu nyaman,", None), ("dan telat berubah.", None)],
 [("Pangsa pasarnya anjlok.", None), ("Tahun dua ribu tiga belas,", "Tahun 2013,"), ("bisnis HP-nya dijual ke Microsoft.", None)],
 [("Tapi Nokia enggak mati.", None), ("Mereka pindah ke bisnis jaringan.", None), ("Sekarang, sinyal empat G dan lima G yang kamu pakai,", "Sekarang, sinyal 4G dan 5G yang kamu pakai"), ("bisa jadi lewat perangkat Nokia.", None)],
 [("Pelajarannya:", None), ("yang bikin jatuh itu terlalu nyaman,", None), ("yang bikin bangkit itu berani berubah.", None), ("Coba tanya diri kamu:", None),
  ("skill apa yang mungkin enggak kepakai lima tahun lagi?", "skill apa yang mungkin enggak kepakai 5 tahun lagi?"), ("Mulai pelajari satu hal baru minggu ini.", "Mulai pelajari 1 hal baru minggu ini.")],
 [("HP Nokia pertama kamu tipe apa?", None), ("Tulis di komentar!", None)],
 [("Follow buat info teknologi sehari-hari!", None)],
]
def sfx(C, SC):
    e = [(SC[i] - .06, 'whoosh') for i in range(1, 9)]
    e += [(C[0][0] + .8, 'pop'), (C[0][1] + .1, 'pop')]
    e += [(C[1][1] + .1, 'pop'), (C[1][2] + .2, 'ding')]
    e += [(C[2][k] + .05, 'pop') for k in (1, 2, 3, 4)] + [(C[2][5] + .8, 'ding')]
    e += [(C[3][1] + .1, 'pop'), (C[3][2] + .1, 'pop'), (C[3][2] + .1, 'shake')]
    e += [(C[4][0] + .2, 'pop'), (C[4][2] + .1, 'pop'), (C[4][2] + .1, 'shake')]
    e += [(C[5][1] + .1, 'ding'), (C[5][2] + .3, 'pop'), (C[5][3] + .2, 'pop')]
    e += [(C[6][1] + .1, 'pop'), (C[6][2] + .1, 'ding'), (C[6][4] + .2, 'pop'), (C[6][5] + .4, 'ding')]
    e += [(C[7][0] + .5 + k * .3, 'pop') for k in range(4)]
    e += [(SC[8] + 1.2, 'pop'), (SC[8] + 1.9, 'pop')]
    return e
build(SEGS, sfx, tts='--no-tts' not in sys.argv, holds={2: .3, 4: .4, 5: .5, 6: .3}, tail=2.2)
