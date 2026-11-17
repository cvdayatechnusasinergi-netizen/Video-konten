"""Ukur kualitas narasi: kejelasan ucapan (Whisper WER) + ekspresi (rentang pitch) + kejernihan.

Pakai: <venv>/bin/python tools/voice_check.py --text "naskah..." a.wav b.wav ...
"""
import argparse
import re

import jiwer
import librosa
import numpy as np
from faster_whisper import WhisperModel


def norm(s):
    s = s.lower().replace("…", " ")
    return re.sub(r"[^a-z0-9 ]+", " ", s).split()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--text", required=True)
    ap.add_argument("--model", default="small")
    ap.add_argument("files", nargs="+")
    a = ap.parse_args()
    w = WhisperModel(a.model, device="cpu", compute_type="int8")
    ref = " ".join(norm(a.text))
    for f in a.files:
        segs, _ = w.transcribe(f, language="id", beam_size=5)
        hyp = " ".join(norm(" ".join(s.text for s in segs)))
        wer = jiwer.wer(ref, hyp)
        y, sr = librosa.load(f, sr=16000)
        f0, _, _ = librosa.pyin(y, fmin=60, fmax=400, sr=sr)
        f0 = f0[~np.isnan(f0)]
        S = np.abs(librosa.stft(y))
        fr = librosa.fft_frequencies(sr=sr)
        pres = S[(fr > 2000) & (fr < 5000)].mean() / S.mean()
        name = f.split("/")[-1]
        print(f"{name:42s} akurasi kata {100 * (1 - wer):5.1f}%  pitch {np.median(f0):4.0f}Hz  "
              f"rentang {np.percentile(f0, 90) - np.percentile(f0, 10):4.0f}Hz  jernih {pres:.2f}")
        print(f"    -> {hyp}")


if __name__ == "__main__":
    main()
