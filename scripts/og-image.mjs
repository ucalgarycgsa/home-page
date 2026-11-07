// Render the default Open Graph image (1200×630) with local Chrome.
// Output: public/og/og-default.png. Re-run after changing the template.
import { chromium } from 'playwright-core'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(path.join(root, 'scripts', 'og-template.html')).href)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(root, 'public', 'og', 'og-default.png') })
await browser.close()
console.log('wrote public/og/og-default.png')
