#!/usr/bin/env bash
# Mix VO (seg*.wav sesuai timing.json) + sfx.wav -> voiceover.wav. Jalankan dari folder vo/: ../../tools/mix.sh
set -e
cd "${1:-.}"
read -r DUR STARTS <<<"$(python3 -c "import json;T=json.load(open('timing.json'));print(T['END'],' '.join(str(x) for x in T['VO']))")"
STARTS=($STARTS)
IN=(); F=""; MIX=""
for i in "${!STARTS[@]}"; do
  IN+=(-i seg$i.wav)
  ms=$(python3 -c "print(int(${STARTS[$i]}*1000))")
  F+="[$i:a]adelay=${ms}|${ms}[a$i];"; MIX+="[a$i]"
done
n=${#STARTS[@]}
ffmpeg -nostdin -loglevel error -y "${IN[@]}" -i sfx.wav -filter_complex \
 "${F}${MIX}amix=inputs=$n:normalize=0,highpass=f=70,equalizer=f=180:t=q:w=1:g=2,equalizer=f=3500:t=q:w=1.5:g=3,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,apad=whole_dur=$DUR,atrim=0:$DUR,aformat=channel_layouts=stereo[vo];\
 [$n:a]aformat=channel_layouts=stereo,volume=0.28[fx];[vo][fx]amix=inputs=2:normalize=0,atrim=0:$DUR,loudnorm=I=-14:TP=-1.5:LRA=9" \
 -ar 44100 -ac 2 voiceover.wav
echo "wrote vo/voiceover.wav ($DUR s)"
