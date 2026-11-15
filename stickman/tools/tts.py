# edge-tts wrapper that also trusts the sandbox proxy CA (if present).
# Usage: python3 tts.py <voice> <rate> <text> <out.mp3>
import os, ssl, sys, asyncio
import edge_tts, edge_tts.communicate as c
ca = '/root/.ccr/ca-bundle.crt'
if os.path.exists(ca):
    ctx = ssl.create_default_context(); ctx.load_verify_locations(ca); c._SSL_CTX = ctx
voice, rate, text, out = sys.argv[1:5]
asyncio.run(edge_tts.Communicate(text, voice, rate=rate).save(out))
