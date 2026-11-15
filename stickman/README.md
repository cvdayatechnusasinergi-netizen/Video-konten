# StickWise — English stickman-meme YouTube Shorts

YouTube: **StickWise** (`@wisestick100`). Faceless Shorts in English: **history, money, psychology, relatable life**.
Separate from the SUARA series in the repo root. Make a new video with the `/stickman-short` skill.

| Path | What |
|---|---|
| `lib/stick.js` | Shared canvas library: stickman + poses + faces, props, text pops, camera, logo |
| `videoN/` | One video: `index.html` (animation), `vo/` (script + VO), `output/` (MP4) |
| `tools/tts.py` | edge-tts wrapper (trusts the sandbox proxy CA) |
| `brand/` | Logo: `node stickman/brand/render-brand.js [Name]` → `profile.png` (800²), `banner.png` (2560×1440), `watermark.png` |
| `CAPTIONS.md` | YouTube title, description, hashtags per video |

Render: `node render.js --page stickman/video1 --out stickman/video1/output/billion-dollar-pizza.mp4`
Rename the channel in the outro: add `?channel=NewName` — or change `CONFIG.channel` in `index.html`.
