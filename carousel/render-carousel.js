// Render semua slide carousel ke PNG: node carousel/render-carousel.js 20dolar
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const name = process.argv[2] || '20dolar';
(async () => {
  const outDir = path.join(__dirname, 'output', name);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  let n = 1;
  for (let i = 0; i < n; i++) {
    await page.goto('file://' + path.join(__dirname, name + '.html') + '?id=' + i);
    n = await page.evaluate(() => window.ready);
    const d = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
    const f = path.join(outDir, `${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(f, Buffer.from(d.split(',')[1], 'base64'));
    console.log('wrote', f);
  }
  await browser.close();
})();
