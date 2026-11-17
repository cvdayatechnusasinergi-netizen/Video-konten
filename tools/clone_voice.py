"""Ubah warna suara file WAV narasi (edge-tts) menjadi suara pemilik akun SUARA.

Intonasi & pelafalan tetap dari narasi asli; hanya timbre yang dikonversi (OpenVoice v2 via coqui-tts).

Pakai (dengan python dari venv yang berisi coqui-tts):
    HF_HUB_DISABLE_XET=1 <venv>/bin/python tools/clone_voice.py --ref voice/ref_clean.wav seg0.wav seg1.wav ...
Setiap segN.wav menghasilkan segN_clone.wav di folder yang sama.

--alpha : 1.0 = identitas suara 100% dari rekaman user; <1 menyisakan sedikit karakter narasi asli
          (lebih jernih & hidup). Default 0.8.
--tau   : variasi encoder OpenVoice (default model 0.3).
"""
import argparse
import os

import numpy as np
import soundfile as sf
import torch
from TTS.api import TTS


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ref", required=True, nargs="+", help="rekaman suara referensi (wav bersih)")
    ap.add_argument("--suffix", default="_clone")
    ap.add_argument("--alpha", type=float, default=0.8)
    ap.add_argument("--tau", type=float, default=0.3)
    ap.add_argument("inputs", nargs="+")
    a = ap.parse_args()
    m = TTS("voice_conversion_models/multilingual/multi-dataset/openvoice_v2").voice_converter.vc_model
    m.tau = a.tau
    g_tgt = m._extract_target_se(a.ref)
    sr = m.config.audio.output_sample_rate
    for src in a.inputs:
        g_src, spec = m.extract_se(src)
        g = g_src + a.alpha * (g_tgt - g_src)
        with torch.inference_mode():
            out = m.inference(spec, aux_input={"g_src": g_src, "g_tgt": g, "x_lengths": None})
        y = out["model_outputs"][0, 0].cpu().numpy().astype(np.float32)
        root, _ = os.path.splitext(src)
        dst = f"{root}{a.suffix}.wav"
        sf.write(dst, y, sr)
        print("ok", dst)


if __name__ == "__main__":
    main()
