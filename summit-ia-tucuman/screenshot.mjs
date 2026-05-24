import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:4321';
const out = process.argv[3] || 'preview-desktop.png';
const w = parseInt(process.argv[4] || '1440', 10);
const h = parseInt(process.argv[5] || '900', 10);
const fullPage = process.argv[6] === 'full';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: out, fullPage });
await browser.close();
console.log('saved', out, fullPage ? '(full)' : `${w}x${h}`);
