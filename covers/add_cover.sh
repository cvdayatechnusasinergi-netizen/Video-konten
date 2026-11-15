#!/usr/bin/env bash
# Tempel cover sebagai frame pembuka (0,6 dtk + crossfade 0,2 dtk) supaya
# frame pertama = judul besar (thumbnail otomatis TikTok tidak hitam).
# Pakai: covers/add_cover.sh <cover.png> <video.mp4>   (file video ditimpa)
set -e
COVER="$1"; VID="$2"; TMP="${VID%.mp4}.tmp.mp4"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VID")
ffmpeg -nostdin -loglevel error -y -loop 1 -t 0.8 -framerate 30 -i "$COVER" -i "$VID" -filter_complex \
 "[0:v]format=yuv420p,setsar=1,fps=30,settb=1/30[c];[1:v]format=yuv420p,setsar=1,fps=30,settb=1/30[v];[c][v]xfade=transition=fade:duration=0.2:offset=0.6[vo];[1:a]adelay=600|600,apad[ao]" \
 -map "[vo]" -map "[ao]" -t $(python3 -c "print($D+0.6)") -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$TMP"
mv "$TMP" "$VID"
echo "ok $VID"
