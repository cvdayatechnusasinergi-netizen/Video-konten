"""words.json (Whisper) -> captions.json (potongan 2-4 kata untuk subtitle per kata).

Pakai: python3 tools/make_captions.py videoN/vo/words.json videoN/vo/captions.json \
          --fix '{"Jadi": "Cari"}' --hl "kalah,murah" [--first-fix-index 45]
"""
import argparse
import json


def key(w):
    return w.strip(".,?!“”\"").lower()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("words")
    ap.add_argument("out")
    ap.add_argument("--fix", default="{}", help="JSON {kata_asal: kata_benar}")
    ap.add_argument("--fixat", default="{}", help="JSON {index: kata_benar} untuk koreksi di posisi tertentu")
    ap.add_argument("--hl", default="")
    a = ap.parse_args()
    W = json.load(open(a.words))
    toks = []
    for w in W:
        t = w["w"]
        if toks and ((t.startswith(",") and t[1:2].isdigit()) or t.startswith("-")):
            toks[-1]["w"] += t
            toks[-1]["e"] = w["e"]
        else:
            toks.append(dict(w))
    fix = json.loads(a.fix)
    fixat = {int(k): v for k, v in json.loads(a.fixat).items()}
    for i, t in enumerate(toks):
        if i in fixat:
            t["w"] = fixat[i]
        else:
            t["w"] = fix.get(t["w"], t["w"])
    if toks:
        toks[0]["w"] = toks[0]["w"][:1].upper() + toks[0]["w"][1:]
    hl = {h.strip().lower() for h in a.hl.split(",") if h.strip()}
    for t in toks:
        t["hl"] = key(t["w"]) in hl
    chunks, cur = [], []
    for i, t in enumerate(toks):
        cur.append(t)
        gap = toks[i + 1]["s"] - t["e"] if i + 1 < len(toks) else 9
        if t["w"][-1] in ".,?!" or len(cur) >= 4 or gap > 0.35:
            chunks.append(cur)
            cur = []
    if cur:
        chunks.append(cur)
    out = [{"s": c[0]["s"], "e": c[-1]["e"], "words": [{"w": x["w"], "s": x["s"], "hl": x["hl"]} for x in c]} for c in chunks]
    json.dump(out, open(a.out, "w"), ensure_ascii=False)
    print(len(out), "potongan:", " | ".join(" ".join(("[" + w["w"] + "]") if w["hl"] else w["w"] for w in c["words"]) for c in out))


if __name__ == "__main__":
    main()
