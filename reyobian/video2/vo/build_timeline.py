# Bangun VO cepat + timeline otomatis untuk video 2.
#  1) TTS per segmen (edge-tts, Ardi, cepat), jeda dipadatkan
#  2) deteksi awal tiap frasa (silencedetect) -> waktu absolut
#  3) tulis ../timing.js (dipakai index.html: warp adegan, caption, event efek)
#  4) buat sfx.wav (tanpa musik) + mix voiceover.wav
# Pakai: python3 build_timeline.py [--no-tts]
import json, subprocess, sys, re, os
TTS = '--no-tts' not in sys.argv
RATE, PITCH, GAP = '+24%', '+4Hz', .12
TTSPY = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools', 'tts.py')  # edge-tts lewat CA proxy
# frasa: (ucapan, teks caption)
SEGS = [
 [("Tiap bulan beli kuota,", None), ("tapi kamu tahu enggak,", None), ("kuota itu sebenarnya apa?", None)],
 [("Setiap kamu buka apa pun di HP,", None), ("HP kamu mengirim dan menerima data lewat tower.", None), ("Nah,", None), ("data yang lewat itulah yang dihitung sebagai kuota!", None)],
 [("Satuannya begini.", None), ("Seribu KB jadi satu MB.", "1.000 KB jadi 1 MB."), ("Seribu MB jadi satu GB.", "1.000 MB jadi 1 GB.")],
 [("Terus,", None), ("satu GB itu cukup buat apa?", "1 GB itu cukup buat apa?"), ("Chat WhatsApp?", None), ("Ribuan pesan!", None), ("Telepon WA?", None), ("Kira-kira enam belas jam.", "Kira-kira 16 jam."), ("Video call?", None), ("Sekitar dua jam.", "Sekitar 2 jam."), ("Scroll Reels?", None), ("Satu jam saja.", "1 jam saja."), ("Nonton YouTube HD?", None), ("Cuma dua puluh sampai tiga puluh menit!", "Cuma 20–30 menit!")],
 [("Kuota cepat habis,", None), ("padahal jarang dipakai?", None), ("Biasanya gara-gara tiga hal ini.", "Biasanya gara-gara 3 hal ini."), ("Video autoplay.", None), ("Aplikasi yang update sendiri.", None), ("Dan backup foto otomatis.", None)],
 [("Solusinya gampang!", None), ("Matikan autoplay.", None), ("Atur update hanya lewat WiFi.", None), ("Lalu cek pemakaian di Setelan,", None), ("Penggunaan Data.", None)],
 [("Kuota kamu biasanya habis buat apa?", None), ("Tulis di kolom komentar,", None), ("ya!", None)],
 [("Follow Reyo Bian buat tips teknologi sehari-hari!", None)],
]
def sh(c): return subprocess.run(c, shell=True, capture_output=True, text=True)
def dur(f): return float(sh(f'ffprobe -v error -show_entries format=duration -of csv=p=0 {f}').stdout)
segs = []
for i, ph in enumerate(SEGS):
    text = ' '.join(p[0] for p in ph)
    if TTS:
        sh(f'python3.13 {TTSPY} --voice id-ID-ArdiNeural --rate={RATE} --pitch={PITCH} --text "{text}" --write-media raw{i}.mp3')
        sh(f'ffmpeg -nostdin -loglevel error -y -i raw{i}.mp3 -af "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=stop_periods=-1:stop_duration=0.14:stop_threshold=-45dB:stop_silence=0.09" -ar 44100 seg{i}.wav')
        os.remove(f'raw{i}.mp3')
    d = dur(f'seg{i}.wav')
    out = sh(f'ffmpeg -nostdin -i seg{i}.wav -af silencedetect=n=-45dB:d=0.07 -f null -').stderr
    ends = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', out)]
    starts_sil = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', out)]
    # candidate phrase starts = 0 + every silence end; pick the ones that best match char-proportional estimate
    L = [len(p[0]) for p in ph]; tot = sum(L); est = [d * sum(L[:k]) / tot for k in range(len(ph))]
    cand = [0.0] + ends; st = [0.0]
    for k in range(1, len(ph)):
        c = min((x for x in cand if x > st[-1] + .15), key=lambda x: abs(x - est[k]), default=est[k]); st.append(c)
    segs.append({'dur': d, 'starts': st})
    print(f'seg{i} {d:.2f}s starts', [round(x, 2) for x in st], 'est', [round(x, 2) for x in est])
# absolute timeline
t = .15; VO = []
for i, s in enumerate(segs):
    VO.append(t); t += s['dur'] + GAP + (.35 if i in (2, 3) else 0)   # sedikit tahan setelah satuan & YouTube
END = VO[-1] + segs[-1]['dur'] + 1.6
P = lambda i, k, f=0.0: VO[i] + segs[i]['starts'][k] + f * ((segs[i]['starts'][k + 1] if k + 1 < len(segs[i]['starts']) else segs[i]['dur']) - segs[i]['starts'][k])
SC = [VO[i] - .12 for i in range(8)] + [END]
SC[0] = 0
# warp per adegan: (waktu baru lokal, waktu animasi lama)
def W(i, pairs, old_end):
    a, b = SC[i], SC[i + 1]
    return [[0, 0]] + [[round(x - a, 3), y] for x, y in pairs] + [[round(b - a, 3), old_end]]
warps = [
 W(0, [(P(0, 0), .5), (P(0, 1), 2.2)], 4.3),
 W(1, [(P(1, 0), .2), (P(1, 2), 4.25)], 8.1),
 W(2, [(P(2, 1), .3), (P(2, 1, .75), 1.9), (P(2, 2, .75), 4.5), (P(2, 2, 1), 5.6)], 7.3),
 W(3, [(P(3, 0), .2), (P(3, 2), 3.0), (P(3, 4), 5.6), (P(3, 6), 8.6), (P(3, 8), 11.3), (P(3, 10), 13.7), (P(3, 11), 15.6)], 18.6),
 W(4, [(P(4, 0), .2), (P(4, 1), 1.2), (P(4, 2), 3.0), (P(4, 3), 4.8), (P(4, 4), 6.85), (P(4, 5), 9.1)], 11.5),
 W(5, [(P(5, 1), .8), (P(5, 2), 2.3), (P(5, 3), 4.0), (P(5, 3, .8), 5.0)], 7.4),
 W(6, [(P(6, 0), .2)], 4.1),
 W(7, [], 4.4),
]
def inv(i, old):  # waktu absolut dari waktu animasi lama di adegan i
    w = warps[i]
    for k in range(1, len(w)):
        if old <= w[k][1]: return SC[i] + w[k-1][0] + (old - w[k-1][1]) * (w[k][0] - w[k-1][0]) / max(1e-6, w[k][1] - w[k-1][1])
    return SC[i] + w[-1][0]
ev = []  # (t, kind)
for i in range(1, 8): ev.append((SC[i] - .06, 'whoosh'))
for o in (.3, 1.9, 4.5): ev.append((inv(2, o + .15), 'pop'))
for o in (3.0, 5.6, 8.6, 11.3, 13.7): ev.append((inv(3, o + .1), 'pop'))
ev.append((inv(3, 15.7), 'ding'))
for o in (4.8, 6.85, 9.1): ev.append((inv(4, o + .1), 'pop'))
for o in (.8, 2.3, 4.0): ev.append((inv(5, o + .55), 'ding'))
for k in range(4): ev.append((inv(6, 1.3 + k * .45 + .1), 'pop'))
for o in (2.6, 3.4): ev.append((inv(7, o), 'pop'))
ev.append((inv(1, 4.35), 'pop'))
ev.sort()
caps = []
for i, s in enumerate(segs):
    for k, (sp, disp) in enumerate(SEGS[i]):
        t0 = VO[i] + s['starts'][k]; t1 = VO[i] + (s['starts'][k + 1] if k + 1 < len(s['starts']) else s['dur'])
        caps.append({'t0': round(t0, 3), 't1': round(t1, 3), 'text': disp or sp})
timing = {'END': round(END, 2), 'SC': [round(x, 3) for x in SC], 'WARP': warps, 'EVENTS': [[round(a, 3), b] for a, b in ev], 'CAPS': caps}
open('../timing.js', 'w').write('window.TIMING = ' + json.dumps(timing) + ';\n')
json.dump({'VO': VO, 'END': END, 'EVENTS': ev}, open('timing.json', 'w'), indent=1)
print('END', round(END, 2), 'VO', [round(x, 2) for x in VO])
