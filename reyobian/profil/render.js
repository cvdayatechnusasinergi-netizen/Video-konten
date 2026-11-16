// Render foto profil + sampul: node reyobian/profil/render.js
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage({ viewport: { width: 1800, height: 1800 } });
  await p.goto('file://' + path.join(__dirname, 'profil.html')); await p.evaluate(() => window.ready);
  for (const [id, f] of [['pp', 'foto-profil.png'], ['cover', 'sampul.png']]) {
    const d = await p.evaluate(id => document.getElementById(id).toDataURL('image/png'), id);
    fs.writeFileSync(path.join(__dirname, f), Buffer.from(d.split(',')[1], 'base64')); console.log('wrote', f);
  }
  await b.close();
})();
