# Alat bersama video Reyo Bian (gaya cepat, tanpa musik).
#   build(SEGS, sfx_fn, ...) : TTS tiap segmen -> deteksi awal frasa -> timing.js + timing.json
#   SEGS = [[(ucapan, caption|None), ...], ...]  (1 segmen = 1 adegan)
#   sfx_fn(cue, SC) -> daftar (waktu, 'whoosh'|'pop'|'ding'|'shake')
import json, subprocess, re, os
HERE = os.path.dirname(os.path.abspath(__file__))
def sh(c): return subprocess.run(c, shell=True, capture_output=True, text=True)
def dur(f): return float(sh(f'ffprobe -v error -show_entries format=duration -of csv=p=0 {f}').stdout)
def align(cand, est):
    """Pilih awal frasa dari kandidat jeda (urut naik, jarak min .15 dtk) yang paling dekat perkiraan panjang teks."""
    n, C = len(est), sorted(set(cand)); INF = 1e9
    if n == 1: return [0.0]
    m = len(C); dp = [[INF] * m for _ in range(n)]; bk = [[-1] * m for _ in range(n)]
    dp[0][0] = 0
    for k in range(1, n):
        for j in range(1, m):
            for i in range(j):
                if dp[k - 1][i] < INF and C[j] - C[i] >= .15:
                    v = dp[k - 1][i] + abs(C[j] - est[k])
                    if v < dp[k][j]: dp[k][j], bk[k][j] = v, i
    j = min(range(m), key=lambda j: dp[n - 1][j])
    if dp[n - 1][j] >= INF: return est
    out = [0.0] * n
    for k in range(n - 1, -1, -1): out[k] = C[j]; j = bk[k][j]
    return out

def build(SEGS, sfx_fn, tts=True, rate='+24%', pitch='+4Hz', gap=.12, holds=None, tail=1.6, outdir='..', fix=None):
    holds = holds or {}; fix = fix or {}; segs = []
    for i, ph in enumerate(SEGS):
        text = ' '.join(p[0] for p in ph).replace('"', '')
        if tts:
            r = sh(f'python3.13 {HERE}/tts.py --voice id-ID-ArdiNeural --rate={rate} --pitch={pitch} --text "{text}" --write-media raw{i}.mp3')
            if not os.path.exists(f'raw{i}.mp3'): raise SystemExit(r.stderr)
            sh(f'ffmpeg -nostdin -loglevel error -y -i raw{i}.mp3 -af "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=stop_periods=-1:stop_duration=0.14:stop_threshold=-45dB:stop_silence=0.09" -ar 44100 seg{i}.wav')
            os.remove(f'raw{i}.mp3')
        d = dur(f'seg{i}.wav')
        out = sh(f'ffmpeg -nostdin -i seg{i}.wav -af silencedetect=n=-45dB:d=0.07 -f null -').stderr
        cand = [0.0] + [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', out)]
        L = [len(p[0]) for p in ph]; tot = sum(L); est = [d * sum(L[:k]) / tot for k in range(len(ph))]
        st = align(cand, est)
        for k, v in fix.get(i, {}).items(): st[k] = v   # koreksi manual (frasa tanpa jeda)
        segs.append({'dur': d, 'starts': st})
        print(f'seg{i} {d:.2f}s', [round(x, 2) for x in st])
    t = .15; VO = []
    for i, s in enumerate(segs):
        VO.append(t); t += s['dur'] + gap + holds.get(i, 0)
    END = VO[-1] + segs[-1]['dur'] + tail
    SC = [0] + [VO[i] - .12 for i in range(1, len(segs))] + [END]
    CUE = [[VO[i] + x for x in s['starts']] + [VO[i] + s['dur']] for i, s in enumerate(segs)]
    ev = sorted(sfx_fn(CUE, SC))
    caps = []
    for i, ph in enumerate(SEGS):
        for k, (sp, disp) in enumerate(ph):
            caps.append({'t0': round(CUE[i][k], 3), 't1': round(CUE[i][k + 1], 3), 'text': disp or sp})
    T = {'END': round(END, 3), 'SC': [round(x, 3) for x in SC], 'CUE': [[round(x, 3) for x in c] for c in CUE],
         'EVENTS': [[round(a, 3), b] for a, b in ev if b != 'shake'], 'SHAKE': [round(a, 3) for a, b in ev if b == 'shake'], 'CAPS': caps}
    open(os.path.join(outdir, 'timing.js'), 'w').write('window.TIMING = ' + json.dumps(T) + ';\n')
    json.dump({'VO': VO, 'END': END, 'EVENTS': ev}, open('timing.json', 'w'), indent=1)
    print('END', round(END, 2))
    return T
