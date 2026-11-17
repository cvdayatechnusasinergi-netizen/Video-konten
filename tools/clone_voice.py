"""Ubah warna suara file WAV narasi (edge-tts) menjadi suara pemilik akun SUARA.

Intonasi & pelafalan tetap dari narasi asli; hanya timbre yang dikonversi (OpenVoice v2 via coqui-tts).

Pakai (dengan python dari venv yang berisi coqui-tts):
    HF_HUB_DISABLE_XET=1 <venv>/bin/python tools/clone_voice.py --ref voice/ref_clean.wav seg0.wav seg1.wav ...
Setiap segN.wav menghasilkan segN_clone.wav di folder yang sama.
"""
import argparse
import os

from TTS.api import TTS


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ref", required=True, help="rekaman suara referensi (wav bersih)")
    ap.add_argument("--suffix", default="_clone")
    ap.add_argument("inputs", nargs="+")
    a = ap.parse_args()
    vc = TTS("voice_conversion_models/multilingual/multi-dataset/openvoice_v2")
    for src in a.inputs:
        root, ext = os.path.splitext(src)
        out = f"{root}{a.suffix}.wav"
        vc.voice_conversion_to_file(source_wav=src, target_wav=a.ref, file_path=out)
        print("ok", out)


if __name__ == "__main__":
    main()
