"""words.json (Whisper) -> captions.json: potongan 2-4 kata untuk subtitle per kata.

Memperbaiki ejaan sesuai naskah, menggabungkan token angka ("84" ",5"), dan menandai kata kunci (hl).
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
W = json.load(open(os.path.join(HERE, "words.json")))

# gabung token yang terpecah ("84" + ",5", "kemana" + "-mana.")
toks = []
for w in W:
    t = w["w"]
    if toks and (t.startswith(",") and t[1:2].isdigit() or t.startswith("-")):
        toks[-1]["w"] += t
        toks[-1]["e"] = w["e"]
    else:
        toks.append(dict(w))

FIX = {
    "temannya,": "temennya,", "kemana-mana.": "ke mana-mana.", "Rehasianya": "Rahasianya",
    "pintar": "pinter", "datang": "dateng", "kayak": "kaya”", "cepet": "“cepet",
    "suara,": "Suara,", "Skillnya": "Skill-nya", "dolar.": "dolar.",
}
for t in toks:
    t["w"] = FIX.get(t["w"], t["w"])
    if t["w"] == "24":
        t["w"] = "Andi, 24"

HL = {"terbang", "panik", "jual", "ngebosenin", "tumbuh", "diem-diem", "Psychology", "Money", "Buffett",
      "84,5", "81,5", "65", "10", "waktu", "sabar", "viral", "menang", "paham", "dimainkan", "Rina",
      "berhenti", "rahasianya", "saham"}


def key(w):
    return w.strip(".,?!“”").lower()


HL_L = {h.lower() for h in HL}
for t in toks:
    t["hl"] = key(t["w"]) in HL_L

chunks, cur = [], []
for i, t in enumerate(toks):
    cur.append(t)
    end_punct = t["w"][-1] in ".,?!"
    nxt_gap = toks[i + 1]["s"] - t["e"] if i + 1 < len(toks) else 9
    if end_punct or len(cur) >= 4 or nxt_gap > 0.35:
        chunks.append({"s": cur[0]["s"], "e": t["e"], "words": [{"w": x["w"], "s": x["s"], "hl": x["hl"]} for x in cur]})
        cur = []
if cur:
    chunks.append({"s": cur[0]["s"], "e": cur[-1]["e"], "words": [{"w": x["w"], "s": x["s"], "hl": x["hl"]} for x in cur]})

json.dump(chunks, open(os.path.join(HERE, "captions.json"), "w"), ensure_ascii=False)
print(len(chunks), "potongan")
for c in chunks[:8]:
    print(round(c["s"], 2), " ".join(("[" + w["w"] + "]") if w["hl"] else w["w"] for w in c["words"]))
