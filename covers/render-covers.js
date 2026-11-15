// Render cover PNG 1080x1920 untuk tiap video: node covers/render-covers.js [id...]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['1', '2', '3', '4', '5'];
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const id of ids) {
    await page.goto('file://' + path.join(__dirname, 'cover.html') + '?id=' + id);
    await page.evaluate(() => window.ready);
    const data = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
    const out = path.join(__dirname, `cover-${id}.png`);
    fs.writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
    console.log('wrote', out);
  }
  await browser.close();
})();
