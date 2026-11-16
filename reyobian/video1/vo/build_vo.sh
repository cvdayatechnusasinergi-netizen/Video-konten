#!/usr/bin/env bash
# Gabungkan segmen VO ke satu track 57,5 detik sesuai timeline video.
# Butuh seg0..seg6.wav (edge-tts, id-ID-ArdiNeural, +3%, hening dipotong).
set -e
cd "$(dirname "$0")"
STARTS=(0.3 5.5 16.0 25.3 35.1 45.8 52.0)
DUR=57.5
IN=(); F=""; MIX=""
for i in "${!STARTS[@]}"; do
  IN+=(-i seg$i.wav)
  ms=$(python3 -c "print(int(${STARTS[$i]}*1000))")
  F+="[$i:a]adelay=${ms}|${ms}[a$i];"; MIX+="[a$i]"
done
ffmpeg -nostdin -loglevel error -y "${IN[@]}" -filter_complex \
 "${F}${MIX}amix=inputs=${#STARTS[@]}:normalize=0,highpass=f=70,equalizer=f=180:t=q:w=1:g=2,equalizer=f=3500:t=q:w=1.5:g=2,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,aecho=0.8:0.5:40:0.12,apad=whole_dur=$DUR,atrim=0:$DUR,loudnorm=I=-14:TP=-1.5:LRA=9" \
 -ar 44100 -ac 2 voiceover.wav
echo "wrote vo/voiceover.wav"
