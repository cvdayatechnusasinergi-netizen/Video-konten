// Render index.html animation to MP4 (1080x1920, 30fps).
// Usage:
//   node render.js                      -> output/1-persen-lebih-baik.mp4
//   node render.js --handle @akun --brand NAMA --out file.mp4
//   node render.js --stills 2,7,12      -> PNG snapshots at given seconds
//   node render.js --page video2        -> render another video folder (video2/output/video.mp4)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const pageDir = path.resolve(__dirname, arg('page', '.'));
const out = arg('out', path.join(pageDir, 'output', path.basename(pageDir) === 'Video-konten' ? '1-persen-lebih-baik.mp4' : 'video.mp4'));
const stills = arg('stills', null);
const q = new URLSearchParams({ render: '1' });
if (arg('handle')) q.set('handle', arg('handle'));
if (arg('brand')) q.set('brand', arg('brand'));

(async () => {
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.join(pageDir, 'index.html') + '?' + q);
  await page.evaluate(() => window.ready);
  const grab = t => page.evaluate(t => { renderFrame(t); return document.getElementById('c').toDataURL('image/jpeg', 0.95); }, t);

  if (stills) {
    for (const s of stills.split(',')) {
      const d = await page.evaluate(t => { renderFrame(t); return document.getElementById('c').toDataURL('image/png'); }, +s);
      const f = path.join(path.dirname(out), `still-${s}.png`);
      fs.writeFileSync(f, Buffer.from(d.split(',')[1], 'base64'));
      console.log('wrote', f);
    }
    await browser.close(); return;
  }

  const { FPS, DURATION } = await page.evaluate(() => ({ FPS: window.FPS, DURATION: window.DURATION }));
  const total = Math.round(FPS * DURATION);
  const vo = arg('audio', path.join(pageDir, 'vo', 'voiceover.wav'));
  const audioIn = fs.existsSync(vo) && vo !== 'none' ? ['-i', vo] : ['-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo'];
  const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    ...audioIn, '-map', '0:v', '-map', '1:a', '-t', String(DURATION),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], { stdio: ['pipe', 'ignore', 'inherit'] });
  for (let i = 0; i < total; i++) {
    const d = await grab(i / FPS);
    if (!ff.stdin.write(Buffer.from(d.split(',')[1], 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) process.stdout.write(`\rframe ${i}/${total}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('\ndone ->', out);
})();
