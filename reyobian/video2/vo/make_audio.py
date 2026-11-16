# Efek suara saja (tanpa musik): whoosh, pop, ding, dibuat sintetis dengan numpy.
# Waktu diambil dari timing.json (hasil build_timeline.py). Output: sfx.wav
import numpy as np, wave, json
SR = 44100; T = json.load(open('timing.json')); DUR = T['END']
N = int(SR * DUR); rng = np.random.default_rng(3); sfx = np.zeros(N)
def env(n, a=0.002, d=0.1):
    t = np.arange(n) / SR; e = np.exp(-t / d); k = int(a * SR)
    if k: e[:k] *= np.linspace(0, 1, k)
    return e
def add(x, at):
    i = int(at * SR); j = min(N, i + len(x))
    if i < N: sfx[i:j] += x[:j - i]
def whoosh(at, d=.38):
    m = int(d * SR); tt = np.arange(m) / SR; x = rng.standard_normal(m); y = np.zeros(m); f = np.linspace(.03, .4, m)
    for i in range(1, m): y[i] = y[i-1] + f[i] * (x[i] - y[i-1])
    add(y * np.sin(np.pi * tt / d) ** 2 * 1.3, at - d * .6)
def pop(at):
    m = int(.09 * SR); tt = np.arange(m) / SR
    add(np.sin(2 * np.pi * (650 * tt + 700 * tt ** 2 / (2 * .09))) * env(m, .001, .03) * .8, at)
    m2 = int(.03 * SR); add(rng.standard_normal(m2) * env(m2, .0005, .006) * .25, at)   # klik transien
def ding(at):
    m = int(.55 * SR); tt = np.arange(m) / SR
    add((np.sin(2 * np.pi * 1318 * tt) + .5 * np.sin(2 * np.pi * 1976 * tt) + .2 * np.sin(2 * np.pi * 2637 * tt)) * env(m, .002, .2) * .5, at)
for at, k in T['EVENTS']: {'whoosh': whoosh, 'pop': pop, 'ding': ding}[k](at)
sfx = sfx / (np.abs(sfx).max() + 1e-9) * .9
w = wave.open('sfx.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((sfx * 32767).astype(np.int16).tobytes()); w.close()
print('sfx ok', len(T['EVENTS']), 'events', DUR)
