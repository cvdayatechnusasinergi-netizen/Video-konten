"""Deteksi waktu tiap kata dari file voice over (faster-whisper, word_timestamps).

Pakai: <venv>/bin/python tools/align_words.py vo.wav out.json [--model small]
Output JSON: [{"w": "kata", "s": 1.23, "e": 1.56}, ...]
"""
import argparse
import json

from faster_whisper import WhisperModel


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("audio")
    ap.add_argument("out")
    ap.add_argument("--model", default="small")
    a = ap.parse_args()
    m = WhisperModel(a.model, device="cpu", compute_type="int8")
    segs, _ = m.transcribe(a.audio, language="id", beam_size=5, word_timestamps=True,
                           vad_filter=False, condition_on_previous_text=True)
    words = []
    for s in segs:
        for w in s.words:
            words.append({"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)})
    json.dump(words, open(a.out, "w"), ensure_ascii=False, indent=0)
    print(len(words), "kata;", " ".join(x["w"] for x in words))


if __name__ == "__main__":
    main()
