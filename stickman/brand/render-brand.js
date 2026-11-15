// node stickman/brand/render-brand.js [Name]  -> profile.png, banner.png, watermark.png
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const name = process.argv[2] || 'StickWise';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const kind of ['profile', 'banner', 'watermark']) {
    await p.goto('file://' + path.join(__dirname, 'logo.html') + `?kind=${kind}&name=${encodeURIComponent(name)}`);
    await p.evaluate(() => window.ready);
    const d = await p.evaluate(() => document.getElementById('c').toDataURL('image/png'));
    fs.writeFileSync(path.join(__dirname, kind + '.png'), Buffer.from(d.split(',')[1], 'base64'));
    console.log('wrote', kind + '.png');
  }
  await b.close();
})();
