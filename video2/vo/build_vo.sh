#!/usr/bin/env bash
# Gabungkan segmen VO ke satu track 56 detik sesuai timeline video.
# Butuh seg0..seg7.wav (hasil edge-tts, voice id-ID-ArdiNeural, silence dipotong).
set -e
cd "$(dirname "$0")"
STARTS=(0.3 4.5 10.2 19.2 25.2 35.8 46.2 50.6)
IN=(); F=""; MIX=""
for i in "${!STARTS[@]}"; do
  IN+=(-i seg$i.wav)
  ms=$(python3 -c "print(int(${STARTS[$i]}*1000))")
  F+="[$i:a]adelay=${ms}|${ms}[a$i];"; MIX+="[a$i]"
done
ffmpeg -loglevel error -y "${IN[@]}" -filter_complex \
 "${F}${MIX}amix=inputs=${#STARTS[@]}:normalize=0,highpass=f=70,equalizer=f=180:t=q:w=1:g=2,equalizer=f=3500:t=q:w=1.5:g=2,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,aecho=0.8:0.5:40:0.12,apad=whole_dur=56,atrim=0:56,loudnorm=I=-14:TP=-1.5:LRA=9" \
 -ar 44100 -ac 2 voiceover.wav
echo "wrote vo/voiceover.wav"
