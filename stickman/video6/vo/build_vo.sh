#!/usr/bin/env bash
# Mix VO segments (seg0..seg8.wav, edge-tts en-US-AndrewNeural +6%, silence trimmed) into one 32.5 s track.
set -e
cd "$(dirname "$0")"
STARTS=(0.15 4.5 9.4 11.05 16.65 20.15 22.5 27.15 29.5)
DUR=32.5
IN=(); F=""; MIX=""
for i in "${!STARTS[@]}"; do
  IN+=(-i seg$i.wav)
  ms=$(python3 -c "print(int(${STARTS[$i]}*1000))")
  F+="[$i:a]adelay=${ms}|${ms}[a$i];"; MIX+="[a$i]"
done
ffmpeg -loglevel error -y "${IN[@]}" -filter_complex \
 "${F}${MIX}amix=inputs=${#STARTS[@]}:normalize=0,highpass=f=70,equalizer=f=180:t=q:w=1:g=2,equalizer=f=3500:t=q:w=1.5:g=2,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,apad=whole_dur=$DUR,atrim=0:$DUR,loudnorm=I=-14:TP=-1.5:LRA=9" \
 -ar 44100 -ac 2 voiceover.wav
echo "wrote vo/voiceover.wav"
