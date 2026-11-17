#!/usr/bin/env bash
# VO dari CapCut (capcut_raw.wav) -> voiceover.wav: mulai di 0,4 dtk, total 80 dtk, dirapikan & dinormalisasi.
set -e
cd "$(dirname "$0")"
ffmpeg -nostdin -loglevel error -y -i capcut_raw.wav -af "adelay=400|400,highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,apad=whole_dur=80,atrim=0:80,loudnorm=I=-14:TP=-1.5:LRA=9" -ar 44100 -ac 2 voiceover.wav
echo "wrote vo/voiceover.wav"
