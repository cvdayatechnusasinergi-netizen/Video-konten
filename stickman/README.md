# StickWise — English stickman-meme YouTube Shorts

YouTube: **StickWise** (`@wisestick100`). Faceless Shorts in English: **history, money, psychology, relatable life**.
Separate from the SUARA series in the repo root. Make a new video with the `/stickman-short` skill.

| Path | What |
|---|---|
| `lib/stick.js` | Shared canvas library: stickman + poses + faces, props, text pops, camera, logo |
| `videoN/` | One video: `index.html` (animation), `vo/` (script + VO), `output/` (MP4) |
| `tools/make_vo.sh` | Generate trimmed VO segments from `vo/script.txt` (uses `tools/tts.py`, an edge-tts wrapper that trusts the sandbox proxy CA) |
| `SERIES.md` | Series plan: Brain vs Wallet, Worst Money Decisions in History |
| `brand/` | Logo: `node stickman/brand/render-brand.js [Name]` → `profile.png` (800²), `banner.png` (2560×1440), `watermark.png` |
| `CAPTIONS.md` | YouTube title, description, hashtags per video |

Render: `node render.js --page stickman/video1 --out stickman/video1/output/billion-dollar-pizza.mp4`
Rename the channel in the outro: add `?channel=NewName` — or change `CONFIG.channel` in `index.html`.

## Long-form (16:9)
| Path | What |
|---|---|
| `long1/` | "The 6 Worst Money Decisions in History (Ranked)" — 1920×1080, ~6 min. `UPLOAD.md` has title, description with chapters, tags, end-screen notes |
| `lib/props.js` | Props shared by Shorts and long-form (stores, cheques, camera, film, apple, etc.) |
| `tools/timeline.py` | Lays VO segments on a timeline → `vo/timing.js` (`SEG[i].s/.d/.ph`) + `vo/voiceover.wav`; scenes time themselves from it |

Long-form workflow: `make_vo.sh long1/vo` → `timeline.py long1/vo --tail 20.5 --extra i:0.8,...` → stills → `node render.js --page stickman/long1 --out ...` → `node long1/render-thumb.js`.
