"""Rakit videoN/index.html format short dari template video8s + videoN/scenes.js.

videoN/scenes.js wajib mendefinisikan: CTA_TITLE, BADGE, CTA_TEXT (via konstanta JS di bawah),
fungsi-fungsi adegan, dan:
    const OFF = 0.3; const HOOK_END = ...; const CTA_AT = ...; const DURATION_S = ...;
    const SCENES = [[mulai, akhir, fungsi], ...];   // waktu absolut (detik)
Caption diambil dari videoN/vo/captions.json.

Pakai: python3 tools/build_short_page.py video9
"""
import json
import re
import sys
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
vd = os.path.join(ROOT, sys.argv[1])
tpl = open(os.path.join(ROOT, "video8s", "index.html")).read()
scenes = open(os.path.join(vd, "scenes.js")).read()
caps = json.load(open(os.path.join(vd, "vo", "captions.json")))

dur = re.search(r"DURATION_S = ([\d.]+)", scenes).group(1)
badge = re.search(r"const BADGE = '([^']+)';", scenes).group(1)
cta_text = re.search(r"const CTA_TEXT = '([^']+)';", scenes).group(1)

head = tpl[:tpl.index("// ================= VIDEO 8")]
head = re.sub(r"DURATION = [\d.]+;", f"DURATION = {dur};", head)
head = re.sub(r"<title>[^<]*</title>", f"<title>{os.path.basename(vd)}</title>", head)
helpers = tpl[tpl.index("function strike("):tpl.index("// ---------- S1")]
ui = tpl[tpl.index("// ---------- captions"):tpl.index("// ---------- master")]
ui = re.sub(r"const HOOK_END = [^\n]*\n", "", ui)
ui = ui.replace("'PSYCHOLOGY OF MONEY · BAB 4 · data Buffett menurut buku (2020)'", "BADGE + ' · Peter Thiel (2014)'")
tail = tpl[tpl.index("function cta("):]
tail = tail.replace("Kirim ke temen lo yang nggak sabaran.", cta_text)

master = """// ---------- master ----------
let frameNo = 0;
function renderFrame(t) {
  const frame = Math.round(t * FPS); frameNo = frame;
  ctx.save();
  ctx.globalAlpha = 1; ctx.filter = 'none';
  background(t, frame);
  const z = camZoom(t), sh = t < HOOK_END ? 9 : 3;
  ctx.translate(W / 2 + Math.sin(t * 7.3) * sh + Math.sin(t * 13.1) * sh * .4, H / 2 + Math.cos(t * 6.1) * sh * .8);
  ctx.rotate(Math.sin(t * 3.7) * .004 * (t < HOOK_END ? 2 : 1)); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
  const rack = 16 * (1 - eo(prog(t, 0.15, 0.6)));
  if (rack > .3) ctx.filter = `blur(${rack.toFixed(1)}px)`;
  SCENES.forEach(([a, b, fn], i) => i === 0 ? scene(t, a, b, fn, .01, .15) : sceneW(t, a, b, fn));
  ctx.restore();
  ctx.save(); sceneW(t, CTA_AT, DURATION + .01, cta, .01); ctx.restore();
  chrome(t);
  viewfinder(t);
  captions(t);
  overlay(t, frame);
}

"""
body = (f"// ================= {os.path.basename(vd).upper()} (format short) =================\n"
        f"const CAPS = {json.dumps(caps, ensure_ascii=False)};\n" + helpers + scenes + "\n" + ui + master)
out = head + body + tail
open(os.path.join(vd, "index.html"), "w").write(out)
print("ok", os.path.join(vd, "index.html"), "durasi", dur)
