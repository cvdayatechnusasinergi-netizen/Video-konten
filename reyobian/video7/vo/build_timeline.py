# Video 7 — Sejarah Samsung: "Perusahaan Ini Pernah Membakar 150 Ribu HP". Pakai: python3 build_timeline.py [--no-tts]
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
from timeline import build
SEGS = [
 [("Perusahaan ini pernah membakar seratus lima puluh ribu HP buatannya sendiri.", "Perusahaan ini pernah membakar 150 ribu HP buatannya sendiri."), ("Dan itu justru yang bikin mereka besar.", None)],
 [("Samsung lahir tahun seribu sembilan ratus tiga puluh delapan di Korea.", "Samsung lahir tahun 1938 di Korea."), ("Awalnya jualan ikan kering,", None), ("sayur,", None), ("dan mi.", None)],
 [("Tahun seribu sembilan ratus enam puluh sembilan,", "Tahun 1969,"), ("mereka masuk ke bisnis elektronik.", None), ("Tapi produknya dikenal murah,", None), ("dan kualitasnya pas-pasan.", None)],
 [("Tahun seribu sembilan ratus sembilan puluh lima,", "Tahun 1995,"), ("bosnya, Li Kun-hi,", "bosnya, Lee Kun-hee,"), ("tahu banyak HP Samsung yang rusak.", None),
  ("Dia memerintahkan sekitar seratus lima puluh ribu HP dikumpulkan,", "Dia memerintahkan sekitar 150 ribu HP dikumpulkan,"), ("dihancurkan,", None), ("lalu dibakar di depan para karyawan.", None)],
 [("Pesannya jelas:", None), ("kualitas nomor satu.", None), ("Sejak itu Samsung berubah.", None), ("Sekarang Samsung jadi salah satu pembuat HP dan chip memori terbesar di dunia.", None)],
 [("Pelajarannya:", None), ("lebih baik buang yang setengah jadi,", None), ("daripada menyerahkan hasil yang jelek.", None), ("Sebelum kirim kerjaan ke klien atau atasan,", None), ("cek ulang sekali lagi.", None)],
 [("Kamu tim Samsung,", None), ("atau merek lain?", None), ("Tulis di komentar!", None)],
 [("Follow buat info teknologi sehari-hari!", None)],
]
def sfx(C, SC):
    e = [(SC[i] - .06, 'whoosh') for i in range(1, 8)]
    e += [(C[0][0] + .6, 'pop'), (C[0][0] + .6, 'shake'), (C[0][1] + .3, 'ding')]
    e += [(C[1][0] + .4, 'pop')] + [(C[1][k] + .05, 'pop') for k in (1, 2, 3)]
    e += [(C[2][1] + .2, 'ding'), (C[2][2] + .1, 'pop'), (C[2][3] + .1, 'pop')]
    e += [(C[3][2] + .2, 'pop'), (C[3][3] + .4, 'pop'), (C[3][4] + .05, 'pop'), (C[3][4] + .05, 'shake'), (C[3][5] + .3, 'whoosh'), (C[3][5] + .3, 'shake')]
    e += [(C[4][1] + .1, 'ding'), (C[4][3] + .3, 'pop'), (C[4][3] + 1.2, 'ding')]
    e += [(C[5][1] + .1, 'pop'), (C[5][2] + .1, 'pop'), (C[5][4] + .3, 'ding')]
    e += [(C[6][0] + .5 + k * .3, 'pop') for k in range(4)]
    e += [(SC[7] + 1.2, 'pop'), (SC[7] + 1.9, 'pop')]
    return e
build(SEGS, sfx, tts='--no-tts' not in sys.argv, holds={0: .3, 2: .3, 3: .6, 4: .4, 5: .3}, tail=2.2)
