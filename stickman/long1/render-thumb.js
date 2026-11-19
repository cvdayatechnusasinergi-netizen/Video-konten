const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'thumb.html')); await p.evaluate(() => window.ready);
  const d = await p.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.92));
  fs.mkdirSync(path.join(__dirname, 'output'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'output', 'thumbnail.jpg'), Buffer.from(d.split(',')[1], 'base64')); console.log('wrote output/thumbnail.jpg'); await b.close(); })();
