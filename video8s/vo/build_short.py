"""Video 8 short (±30 dtk): potong VO CapCut video 8, susun ulang (hook di depan), buat timeline & caption.

Output:
  voiceover.wav   audio baru (mulai di OFF detik)
  segments.json   [[orig_start, orig_end, new_start], ...]  -> dipakai V(t) di index.html
  captions.json   potongan subtitle dengan waktu baru
"""
import json
import os
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "..", "video8", "vo")
OFF = 0.3
TAIL = 2.6
SEGS = [  # (mulai, akhir) di waktu VO asli
    (64.73, 68.85),   # hook: orang yang sabar nggak bakal viral. Tapi dia yang menang.
    (36.25, 39.72),   # Warren Buffett, salah satu orang terkaya di dunia.
    (39.85, 43.24),   # Kekayaannya 84,5 miliar dolar.
    (43.36, 49.30),   # Tapi 81,5 miliar ... setelah umurnya 65.
    (49.74, 52.20),   # Rahasianya bukan cuma pinter milih saham.
    (52.22, 56.02),   # Dia mulai dari umur 10 tahun dan nggak pernah berhenti.
    (56.22, 60.25),   # Skill-nya investasi. Tapi rahasianya, waktu.
    (71.96, 75.75),   # Follow Suara, biar lo yang paham, bukan yang dimainkan.
]
GAP = [0.35, 0.12, 0.12, 0.15, 0.10, 0.12, 0.35, 0]

table, t = [], OFF
for (a, b), g in zip(SEGS, GAP):
    table.append([a, b, round(t, 3)])
    t += (b - a) + g
dur = round(t + TAIL, 2)

# audio
inputs, filt = [], []
for i, (a, b, n) in enumerate(table):
    inputs += ["-ss", str(a), "-t", str(b - a), "-i", os.path.join(SRC, "capcut_raw.wav")]
    ms = int(n * 1000)
    filt.append(f"[{i}:a]afade=t=in:d=0.02,afade=t=out:st={b - a - 0.03:.3f}:d=0.03,adelay={ms}|{ms}[s{i}]")
mix = "".join(f"[s{i}]" for i in range(len(table)))
fc = ";".join(filt) + f";{mix}amix=inputs={len(table)}:normalize=0,highpass=f=70," \
     f"acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,apad=whole_dur={dur},atrim=0:{dur}," \
     "loudnorm=I=-14:TP=-1.5:LRA=9"
subprocess.run(["ffmpeg", "-nostdin", "-loglevel", "error", "-y", *inputs, "-filter_complex", fc,
                "-ar", "44100", "-ac", "2", os.path.join(HERE, "voiceover.wav")], check=True)


def remap(s):
    for a, b, n in table:
        if a - 0.02 <= s <= b:
            return round(n + (s - a), 3)
    return None


caps = json.load(open(os.path.join(SRC, "captions.json")))
out = []
for c in caps:
    cur, seg = [], None
    for w in c["words"]:
        ns = remap(w["s"])
        if ns is None:
            continue
        sid = next(i for i, (a, b, n) in enumerate(table) if a - 0.02 <= w["s"] <= b)
        if seg is not None and sid != seg and cur:
            out.append(cur); cur = []
        seg = sid
        cur.append({"w": w["w"], "s": round(ns - OFF, 3), "hl": w["hl"]})
    if cur:
        out.append(cur)
chunks = sorted(({"s": ws[0]["s"], "e": ws[-1]["s"] + 0.5, "words": ws} for ws in out), key=lambda c: c["s"])
if chunks and chunks[0]["words"][0]["w"] == "orang":
    chunks[0]["words"][0]["w"] = "Orang"
for i in range(len(chunks) - 1):
    chunks[i]["e"] = min(chunks[i]["e"], chunks[i + 1]["s"])
json.dump(chunks, open(os.path.join(HERE, "captions.json"), "w"), ensure_ascii=False)
json.dump({"off": OFF, "dur": dur, "segs": table}, open(os.path.join(HERE, "segments.json"), "w"))
print("durasi", dur, "| segmen baru mulai:", [n for _, _, n in table])
print(" | ".join(" ".join(w["w"] for w in c["words"]) for c in chunks))
