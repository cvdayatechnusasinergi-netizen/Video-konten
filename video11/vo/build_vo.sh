#!/usr/bin/env bash
# VO CapCut -> voiceover.wav (mulai 0,3 dtk, total sesuai DURATION_S di scenes.js)
set -e
cd "$(dirname "$0")"
DUR=$(grep -oP 'DURATION_S = \K[\d.]+' ../scenes.js)
ffmpeg -nostdin -loglevel error -y -i capcut_raw.wav -af "adelay=300|300,highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,apad=whole_dur=$DUR,atrim=0:$DUR,loudnorm=I=-14:TP=-1.5:LRA=9" -ar 44100 -ac 2 voiceover.wav
echo "wrote vo/voiceover.wav ($DUR s)"
