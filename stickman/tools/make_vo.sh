#!/usr/bin/env bash
# Generate segN.wav (silence-trimmed) for every line of <vo_dir>/script.txt and print
# duration + inner pauses (for timing text pops).
# Usage: stickman/tools/make_vo.sh stickman/videoN/vo [voice] [rate]   (only missing segs: ONLY=3,5)
set -e
DIR="$1"; VOICE="${2:-en-US-AndrewNeural}"; RATE="${3:-+6%}"
TOOLS="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"
mapfile -t LINES < script.txt
for i in "${!LINES[@]}"; do
  if [ -n "$ONLY" ] && [[ ",$ONLY," != *",$i,"* ]]; then continue; fi
  for try in 1 2 3 4 5 6; do
    python3 "$TOOLS/tts.py" "$VOICE" "$RATE" "${LINES[$i]}" raw$i.mp3 2>/dev/null && [ -s raw$i.mp3 ] && break
    sleep 3
  done
  ffmpeg -nostdin -loglevel error -y -i raw$i.mp3 -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse" -ar 44100 -ac 1 seg$i.wav
  rm -f raw$i.mp3
done
for i in "${!LINES[@]}"; do
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 seg$i.wav)
  p=$(ffmpeg -nostdin -i seg$i.wav -af silencedetect=n=-38dB:d=0.18 -f null - 2>&1 | grep -o 'silence_\(start\|end\): [0-9.]*' | awk '{printf "%s ", $2}')
  echo "$i  $d  | pauses: $p"
done
