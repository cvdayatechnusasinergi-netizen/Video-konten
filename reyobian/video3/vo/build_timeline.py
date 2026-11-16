# Video 3 (versi 2, gaya B) — "HP Ini Sempat Diketawain". Pakai: python3 build_timeline.py [--no-tts]
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from timeline import build
SEGS = [
 [("Tahun dua ribu tujuh,", "Tahun 2007,"), ("HP ini sempat diketawain.", None)],
 [("Dulu, HP paling keren itu kayak gini.", None), ("Ada keypad,", None), ("layarnya kecil,", None), ("ngetik SMS pencet-pencet tombol.", None)],
 [("Terus muncul HP layar sentuh penuh,", None), ("tanpa keypad sama sekali.", None), ("Banyak yang meremehkan.", None), ("Kemahalan!", None), ("Ngetiknya pakai apa?", None), ("Bahkan bos perusahaan teknologi lain ikut ketawa.", None)],
 [("Padahal waktu itu,", None), ("belum bisa copy-paste,", None), ("belum ada App Store,", None), ("dan internetnya masih dua G.", "dan internetnya masih 2G.")],
 [("Tapi lihat sekarang.", None), ("Hampir semua HP, termasuk Android,", None), ("bentuknya ya begini.", None)],
 [("Jadi, yang diketawain hari ini,", None), ("bisa jadi standar besok.", None)],
 [("Menurut kamu, teknologi apa yang sekarang masih diketawain,", None), ("tapi nanti jadi standar?", None), ("HP lipat, mungkin?", None), ("Tulis di komentar!", None)],
 [("Follow Reyo Bian buat tips teknologi sehari-hari!", None)],
]
def sfx(C, SC):
    e = [(SC[i] - .06, 'whoosh') for i in range(1, 8)]
    e += [(C[0][1] + .5, 'pop'), (C[0][1] + .9, 'pop')]
    e += [(C[1][k] + .1, 'pop') for k in (1, 2, 3)]
    e += [(C[2][0] + .3, 'ding'), (C[2][3], 'pop'), (C[2][4], 'pop'), (C[2][5] + .6, 'pop'), (C[2][5] + .9, 'pop'), (C[2][5] + .6, 'shake')]
    e += [(C[3][k] + .1, 'pop') for k in (1, 2, 3)]
    e += [(C[4][1] + .1 + k * .12, 'pop') for k in range(0, 6, 2)]
    e += [(C[5][1] + .1, 'ding'), (C[5][1] + .1, 'shake')]
    e += [(C[6][1] + .2 + k * .3, 'pop') for k in range(4)]
    e += [(SC[7] + 1.9, 'pop'), (SC[7] + 2.6, 'pop')]
    return e
build(SEGS, sfx, tts='--no-tts' not in sys.argv, holds={0: .45, 1: .4, 2: .5, 3: .4, 4: .6, 5: .55, 6: .3})
