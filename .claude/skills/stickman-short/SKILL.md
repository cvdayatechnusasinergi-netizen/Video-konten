---
name: stickman-short
description: Make an English faceless YouTube Short in stickman-meme style for the StickWise channel (history, money, psychology, relatable life). Use when the user types /stickman-short, gives a topic for a stickman video, or asks for the next StickWise video.
---

# /stickman-short — StickWise Shorts pipeline

Project lives in `stickman/`. Talk to the user in Indonesian (santai); all on-screen text and narration are in **English (American)**.

## 1. Concept first (wait for "Gas")
If the user gave no topic, pitch 3 options (one line each) across the niches: history, money, psychology, relatable life.
Then show: **title**, one-paragraph idea, and **scene list** (VO line + what the stickman does + on-screen text). Stop and wait for "Gas".

Rules for a good script:
- 40–55 s, 8–10 VO lines, one line per scene. Hook in the first line (a shocking number, a weird fact, "you do this every day").
- Short spoken sentences, casual American tone ("basically", "a little crazy", "here's the twist"). One twist + one takeaway.
- Facts must be real; put the source year/number on screen. Prices that move (crypto, stocks) → use a dated peak/value and a footnote.
- Last VO line = CTA: "Follow for more <niche> that <payoff>."

## 2. Voice over
- Next folder: `stickman/videoN/` (copy `stickman/video1/` as a template; keep `../lib/stick.js`).
- Write `vo/script.txt` (one line per scene).
- Generate each line: `python3 stickman/tools/tts.py en-US-AndrewNeural +6% "<line>" rawI.mp3`
  (retry on `NoAudioReceived`; it is flaky), trim silence to `segI.wav`:
  `ffmpeg -i rawI.mp3 -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse" -ar 44100 -ac 1 segI.wav`
- Measure durations (`ffprobe`), find inner pauses with `silencedetect=n=-38dB:d=0.18` to time text pops.
- Set `STARTS` (≈0.5 s gap between lines) and `DUR` in `vo/build_vo.sh`, run it → `vo/voiceover.wav`.

## 3. Animation (`stickman/videoN/index.html`)
- Uses `stickman/lib/stick.js`: `stick(x, hipY, POSE.x, {s, face, look, id, flip, mouthOpen, blink})`, `mixPose`,
  `pop(text, x, y, size, t, start, {bg, bgColor, rot, color, end})`, `typeText`, props (`coin`, `pizza`, `slice`,
  `pizzaBox`, `jet`, `priceTag`, `computer`, `desk`, `chair`, `burst`, `speedLines`, `confetti`, `sweat`), camera (`shake`, `zoomAt`).
  Add new props/poses to the lib when needed so later videos can reuse them.
- Style: paper background `C.paper`, black ink stickmen, **red** (`C.red`) for emphasis boxes, **gold** for money. Meme energy: pops, shakes, zoom bumps, cuts every 3–6 s.
- 1080×1920, 30 fps. Important text in y 330–1450 and away from the right edge (YouTube Shorts UI).
- **Frame 0 = the hook title** fully visible (start = -1), so the auto thumbnail reads.
- Outro: `logoMark` + `logoWord(CONFIG.channel)` + tagline + SUBSCRIBE button click.

## 4. Check, render, ship
- Stills: `node render.js --page stickman/videoN --out stickman/videoN/output/stills/x.mp4 --stills 0,5,12,...` — look at them (contact sheet), fix overlaps, delete the stills folder.
- Render: `node render.js --page stickman/videoN --out stickman/videoN/output/<slug>.mp4`
- Add the YouTube title, description and hashtags to `stickman/CAPTIONS.md`.
- Commit + push, then send the MP4 to the user **together with the title, description and hashtags** (copy-paste ready).
