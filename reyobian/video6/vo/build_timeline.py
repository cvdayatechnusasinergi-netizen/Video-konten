# Video 6 — Sejarah Google: "Google Pernah Mau Dijual Cuma $1 Juta". Pakai: python3 build_timeline.py [--no-tts]
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from timeline import build
SEGS = [
 [("Google pernah mau dijual cuma satu juta dolar.", "Google pernah mau dijual cuma 1 juta dolar."), ("Dan pembelinya menolak.", None)],
 [("Tahun seribu sembilan ratus sembilan puluh enam,", "Tahun 1996,"), ("dua mahasiswa Stanford,", None), ("Larry Page dan Sergey Brin,", None),
  ("bikin mesin pencari bernama Bek Rab.", "bikin mesin pencari bernama BackRub."), ("Server pertamanya bahkan dibungkus mainan LEGO.", None)],
 [("Namanya lalu diganti jadi Google,", None), ("dari kata gugol:", "dari kata googol:"), ("angka satu dengan seratus nol di belakangnya.", "angka 1 dengan 100 nol di belakangnya.")],
 [("Tahun seribu sembilan ratus sembilan puluh sembilan,", "Tahun 1999,"), ("mereka ingin fokus kuliah,", None),
  ("dan menawarkan Google ke perusahaan Eksait seharga satu juta dolar.", "dan menawarkan Google ke perusahaan Excite seharga 1 juta dolar."),
  ("Harganya bahkan diturunkan.", None), ("Tapi Eksait tetap menolak.", "Tapi Excite tetap menolak.")],
 [("Akhirnya mereka terpaksa melanjutkan.", None), ("Sekarang, Google dipakai miliaran kali setiap hari,", None), ("dan nilainya triliunan dolar.", None),
  ("Eksait?", "Excite?"), ("Perusahaan induknya bangkrut tahun dua ribu satu.", "Perusahaan induknya bangkrut tahun 2001.")],
 [("Pelajarannya:", None), ("jangan buru-buru melepas sesuatu cuma karena sekarang kelihatan kecil.", None), ("Punya ide atau usaha yang kamu ragukan?", None),
  ("Kasih waktu,", None), ("dan catat perkembangannya tiap bulan.", None)],
 [("Ada ide atau usaha yang hampir kamu lepas?", None), ("Cerita di komentar!", None)],
 [("Follow buat info teknologi sehari-hari!", None)],
]
def sfx(C, SC):
    e = [(SC[i] - .06, 'whoosh') for i in range(1, 8)]
    e += [(C[0][0] + 1.2, 'pop'), (C[0][1] + .3, 'pop'), (C[0][1] + .3, 'shake')]
    e += [(C[1][2] + .1, 'pop'), (C[1][2] + .5, 'pop'), (C[1][3] + .3, 'pop'), (C[1][4] + .4, 'ding')]
    e += [(C[2][0] + .5, 'pop'), (C[2][2] + .2, 'ding')]
    e += [(C[3][2] + .6, 'pop'), (C[3][3] + .2, 'pop'), (C[3][4] + .3, 'pop'), (C[3][4] + .3, 'shake')]
    e += [(C[4][1] + .2, 'pop'), (C[4][2] + .2, 'ding'), (C[4][4] + .3, 'pop'), (C[4][4] + .3, 'shake')]
    e += [(C[5][1] + .2, 'pop'), (C[5][3] + .1, 'pop'), (C[5][4] + .6, 'ding')]
    e += [(C[6][0] + .8 + k * .3, 'pop') for k in range(3)]
    e += [(SC[7] + 1.2, 'pop'), (SC[7] + 1.9, 'pop')]
    return e
build(SEGS, sfx, tts='--no-tts' not in sys.argv, holds={1: .3, 2: .4, 3: .4, 4: .5, 5: .3}, tail=2.2)
