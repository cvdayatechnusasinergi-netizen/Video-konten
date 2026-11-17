"""Bikin narasi lebih energik: lebarkan naik-turun nada (PSOLA, Praat) di sekitar nada tengah.

new_f0 = median * (f0 / median) ** k   (k > 1 = intonasi lebih ekspresif; warna suara tetap)

Pakai: <venv>/bin/python tools/energize.py --k 2.2 --lift 1.04 in.wav [in2.wav ...]
Menghasilkan in_en.wav.  --lift menaikkan nada keseluruhan sedikit (1.04 = +4%) biar lebih semangat.
"""
import argparse
import os

import numpy as np
import parselmouth
from parselmouth.praat import call


def energize(path, k, lift, floor=65, ceil=400):
    snd = parselmouth.Sound(path)
    manip = call(snd, "To Manipulation", 0.01, floor, ceil)
    tier = call(manip, "Extract pitch tier")
    n = call(tier, "Get number of points")
    if n < 3:
        return snd
    times = [call(tier, "Get time from index", i) for i in range(1, n + 1)]
    vals = np.array([call(tier, "Get value at index", i) for i in range(1, n + 1)])
    med = float(np.median(vals))
    new = med * lift * (vals / med) ** k
    new = np.clip(new, floor, ceil)
    call(tier, "Remove points between", 0, snd.duration)
    for t, v in zip(times, new):
        call(tier, "Add point", t, float(v))
    call([manip, tier], "Replace pitch tier")
    return call(manip, "Get resynthesis (overlap-add)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--k", type=float, default=2.2)
    ap.add_argument("--lift", type=float, default=1.04)
    ap.add_argument("--suffix", default="_en")
    ap.add_argument("inputs", nargs="+")
    a = ap.parse_args()
    for f in a.inputs:
        out = energize(f, a.k, a.lift)
        root, _ = os.path.splitext(f)
        dst = f"{root}{a.suffix}.wav"
        out.save(dst, "WAV")
        print("ok", dst)


if __name__ == "__main__":
    main()
