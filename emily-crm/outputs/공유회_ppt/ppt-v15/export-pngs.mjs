import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve(import.meta.dirname, 'png-export');
const URL = 'https://aaa-emily-deck.vercel.app/';
const TOTAL = 31;
const WIDTH = 1920;
const HEIGHT = 1080;

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1
});
const page = await ctx.newPage();

console.log(`[load] ${URL}`);
await page.goto(URL, { waitUntil: 'networkidle' });

await page.waitForFunction(() => {
  const el = document.querySelector('deck-stage');
  return el && el.length === 31;
}, { timeout: 30000 });

console.log(`[ready] deck-stage loaded with ${TOTAL} slides`);

for (let i = 0; i < TOTAL; i++) {
  await page.evaluate((idx) => document.querySelector('deck-stage').goTo(idx), i);
  await page.waitForTimeout(700);
  const filename = path.join(OUT_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);
  await page.screenshot({ path: filename, fullPage: false });
  console.log(`[shot] ${i + 1}/${TOTAL} → ${path.basename(filename)}`);
}

await browser.close();
console.log(`[done] all ${TOTAL} slides captured to ${OUT_DIR}`);
