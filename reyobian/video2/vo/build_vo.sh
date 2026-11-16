#!/usr/bin/env bash
# VO (cepat, jeda dipadatkan) + musik beat + efek suara -> voiceover.wav (52,3 dtk).
# Butuh seg0..seg7.wav dan music.wav/sfx.wav (python3 make_audio.py 52.3).
set -e
cd "$(dirname "$0")"
STARTS=(0.25 3.8 10.35 15.55 29.2 37.75 44.65 48.3)
DUR=52.3
IN=(); F=""; MIX=""
for i in "${!STARTS[@]}"; do
  IN+=(-i seg$i.wav)
  ms=$(python3 -c "print(int(${STARTS[$i]}*1000))")
  F+="[$i:a]adelay=${ms}|${ms}[a$i];"; MIX+="[a$i]"
done
n=${#STARTS[@]}
ffmpeg -nostdin -loglevel error -y "${IN[@]}" -i music.wav -i sfx.wav -filter_complex \
 "${F}${MIX}amix=inputs=$n:normalize=0,highpass=f=70,equalizer=f=180:t=q:w=1:g=2,equalizer=f=3500:t=q:w=1.5:g=3,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,apad=whole_dur=$DUR,atrim=0:$DUR,aformat=channel_layouts=stereo,asplit=2[vo][sc];\
 [$n:a]aformat=channel_layouts=stereo,volume=0.32[mu];[mu][sc]sidechaincompress=threshold=0.04:ratio=6:attack=20:release=300[duck];\
 [$((n+1)):a]aformat=channel_layouts=stereo,volume=0.30[fx];\
 [vo][duck][fx]amix=inputs=3:normalize=0,atrim=0:$DUR,loudnorm=I=-14:TP=-1.5:LRA=9" \
 -ar 44100 -ac 2 voiceover.wav
echo "wrote vo/voiceover.wav"
