import sys, certifi
certifi.where = lambda: '/root/.ccr/ca-bundle.crt'
import edge_tts.communicate as c
if hasattr(c, 'certifi'): c.certifi.where = certifi.where
from edge_tts.util import main
sys.argv[0] = 'edge-tts'; main()
