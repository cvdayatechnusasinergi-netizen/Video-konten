# Musik latar (beat 124 BPM) + efek suara (whoosh & pop), dibuat sintetis dengan numpy.
# Output: music.wav, sfx.wav (44.1 kHz mono). Dipakai oleh build_vo.sh.
import numpy as np, wave, sys
SR = 44100; DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 52.3
N = int(SR * DUR); rng = np.random.default_rng(3)
def write(name, x):
    x = np.clip(x, -1, 1); w = wave.open(name, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
def env(n, a=0.002, d=0.1):
    t = np.arange(n) / SR; e = np.exp(-t / d); k = int(a * SR); e[:k] *= np.linspace(0, 1, k) if k else 1; return e
def add(buf, x, at):
    i = int(at * SR); j = min(len(buf), i + len(x)); buf[i:j] += x[:j - i]
def hp(x, a=.97):  # simple one-pole high-pass
    y = np.zeros_like(x); 
    for i in range(1, len(x)): y[i] = a * (y[i-1] + x[i] - x[i-1])
    return y
# --- drum one-shots
n = int(.35 * SR); t = np.arange(n) / SR
kick = np.sin(2 * np.pi * (45 * t + 60 * (1 - np.exp(-t * 30)) / 30)) * env(n, .001, .12)
hat = hp(rng.standard_normal(int(.05 * SR))) * env(int(.05 * SR), .0005, .012)
cl = hp(rng.standard_normal(int(.2 * SR)), .9) * env(int(.2 * SR), .001, .05)
music = np.zeros(N); bpm = 124; beat = 60 / bpm
chords = [[261.6, 311.1, 392.0], [233.1, 293.7, 349.2], [207.7, 261.6, 311.1], [233.1, 293.7, 349.2]]  # Cm Bb Ab Bb
b = 0
while b * beat < DUR - .5:
    at = b * beat
    add(music, kick * .9, at)
    add(music, hat * .35, at + beat / 2)
    if b % 4 in (1, 3): add(music, cl * .45, at)
    if b % 2 == 0: add(music, hat * .2, at + beat * .75)
    # bass (root, octave down) on every beat, plucky
    ch = chords[(b // 4) % 4]; m = int(beat * SR); tt = np.arange(m) / SR
    add(music, np.sin(2 * np.pi * ch[0] / 4 * tt) * env(m, .005, .18) * .5, at)
    # soft pad per bar
    if b % 4 == 0:
        m = int(beat * 4 * SR); tt = np.arange(m) / SR; pad = sum(np.sin(2 * np.pi * f * tt) + .3 * np.sin(4 * np.pi * f * tt) for f in ch)
        add(music, pad * np.minimum(1, tt / .3) * np.minimum(1, (tt[-1] - tt) / .4) * .06, at)
    # pluck arpeggio on 8ths
    for k in range(2):
        f = ch[(b * 2 + k) % 3] * 2; m = int(.2 * SR); tt = np.arange(m) / SR
        add(music, np.sin(2 * np.pi * f * tt) * env(m, .002, .07) * .12, at + k * beat / 2)
    b += 1
fade = np.ones(N); fl = int(1.5 * SR); fade[-fl:] = np.linspace(1, 0, fl); fi = int(.05 * SR); fade[:fi] = np.linspace(0, 1, fi)
music *= fade / (np.abs(music).max() + 1e-9) * .9
write('music.wav', music)
# --- SFX
sfx = np.zeros(N)
def whoosh(at, d=.45):
    m = int(d * SR); tt = np.arange(m) / SR; x = rng.standard_normal(m)
    y = np.zeros(m); f = np.linspace(.02, .35, m)  # rising one-pole low-pass cutoff
    for i in range(1, m): y[i] = y[i-1] + f[i] * (x[i] - y[i-1])
    add(sfx, y * np.sin(np.pi * tt / d) ** 2 * 1.4, at)
def pop(at, f0=700, f1=1300):
    m = int(.08 * SR); tt = np.arange(m) / SR
    add(sfx, np.sin(2 * np.pi * (f0 * tt + (f1 - f0) * tt ** 2 / (2 * .08))) * env(m, .001, .03) * .8, at)
def ding(at):
    m = int(.5 * SR); tt = np.arange(m) / SR
    add(sfx, (np.sin(2 * np.pi * 1318 * tt) + .5 * np.sin(2 * np.pi * 1976 * tt)) * env(m, .002, .18) * .5, at)
for at in [3.55, 10.1, 15.3, 28.95, 37.5, 44.4, 47.9]: whoosh(at)
for at in [11.6, 12.7, 14.4]: pop(at, 500, 1000)                            # KB, MB, GB
for at in [17.7, 19.6, 21.9, 24.0, 26.25]: pop(at)                           # 1 GB rows
ding(27.45)                                                                   # YouTube HD reveal
for at in [33.45, 34.65, 36.3]: pop(at, 400, 800)                             # penyebab
for at in [39.1, 40.4, 42.2]: ding(at)                                        # solusi (centang)
for at in [45.7, 46.15, 46.6, 47.05]: pop(at, 900, 1500)                       # komentar
for at in [50.6, 51.4]: pop(at, 600, 1200)                                    # follow, share
write('sfx.wav', sfx / (np.abs(sfx).max() + 1e-9) * .9)
print('ok', DUR)
