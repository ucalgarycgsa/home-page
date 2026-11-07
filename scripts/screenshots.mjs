// Screenshot + smoke QA using the locally installed Google Chrome (no browser download).
//
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir] [--samples] [--only=zh-Hant[,en]]
//   default baseUrl http://localhost:4173 (run `npm run preview` first)
//
// For every shot it saves a full-page PNG plus readable slices (name--01.png …),
// and writes report.json with console errors, failed requests, horizontal
// overflow, small touch targets and internal links that resolve to the 404 page.
import { chromium } from 'playwright-core'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { simplifiedLeftovers, traditionalLeftovers } from '../tests/fixtures/simplified-forms.ts'

const args = process.argv.slice(2)
const samples = args.includes('--samples')
const positional = args.filter((a) => !a.startsWith('--'))
const BASE = positional[0] || (samples ? 'http://localhost:4174' : 'http://localhost:4173')
const OUT = path.resolve(positional[1] || (samples ? 'screenshots/samples' : 'screenshots'))
const ROUTES = ['/', '/events', '/benefits', '/resources', '/about', '/team', '/join', '/contact']
const slug = (r) => (r === '/' ? 'home' : r.slice(1))
// Locale → file-name tag (en / zh = 简体 / zhHant = 繁體)
const TAG = { en: 'en', 'zh-Hans': 'zh', 'zh-Hant': 'zhHant' }
const LANGS = ['en', 'zh-Hans', 'zh-Hant']
const only = args.find((a) => a.startsWith('--only='))?.slice(7) // e.g. --only=zh-Hant
const langs = only ? only.split(',') : LANGS

const shots = []
if (samples) {
  for (const lang of langs) {
    for (const w of [1440, 390]) {
      shots.push({ route: '/events', lang, w })
      shots.push({ route: '/', lang, w, sliceOnly: [0, 2] })
    }
  }
  if (langs.includes('en')) shots.push({ route: '/team', lang: 'en', w: 1440 })
  if (langs.includes('zh-Hans')) shots.push({ route: '/team', lang: 'zh-Hans', w: 390 })
  if (langs.includes('zh-Hant')) for (const w of [1440, 390]) shots.push({ route: '/team', lang: 'zh-Hant', w })
} else {
  for (const lang of langs) for (const route of ROUTES) for (const w of [1440, 390]) shots.push({ route, lang, w })
  if (langs.includes('en')) for (const w of [768, 1024]) for (const route of ['/', '/events', '/join']) shots.push({ route, lang: 'en', w })
  if (langs.includes('zh-Hans')) shots.push({ route: '/', lang: 'zh-Hans', w: 768 })
  if (langs.includes('zh-Hant')) for (const w of [768, 1024]) shots.push({ route: '/', lang: 'zh-Hant', w })
  if (langs.includes('en')) shots.push({ route: '/404-check', lang: 'en', w: 1440 })
  for (const lang of langs) shots.push({ route: '/', lang, w: 390, menu: true })
  for (const lang of langs) for (const w of [1440, 390]) shots.push({ route: '/about', lang, w, footer: true })
}

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = []

for (const s of shots) {
  const height = s.w >= 1024 ? 900 : s.w >= 768 ? 1024 : 844
  const ctx = await browser.newContext({ viewport: { width: s.w, height }, deviceScaleFactor: 1, reducedMotion: 'no-preference' })
  await ctx.addInitScript((lang) => localStorage.setItem('cgsa-lang', lang), s.lang)
  const page = await ctx.newPage()
  const consoleErrors = []
  const failed = []
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
  page.on('pageerror', (e) => consoleErrors.push(String(e)))
  page.on('response', (r) => r.status() >= 400 && !r.url().endsWith('/404-check') && failed.push(`${r.status()} ${r.url()}`))

  await page.goto(BASE + s.route, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(s.route === '/' ? 1400 : 300)

  let name = `${slug(s.route)}_${TAG[s.lang]}_${s.w}`
  if (s.menu) {
    await page.locator('.site-header__bar > .menu-toggle').click()
    await page.waitForTimeout(400)
    name += '_menu'
  }

  const checks = await page.evaluate(() => {
    const doc = document.documentElement
    const overflow = doc.scrollWidth > doc.clientWidth + 1
    const wide = overflow
      ? Array.from(document.querySelectorAll('body *'))
          .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1)
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}`)
      : []
    const small = Array.from(document.querySelectorAll('a[href], button'))
      .filter((el) => {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) return false
        const cs = getComputedStyle(el)
        if (cs.visibility === 'hidden' || el.closest('.visually-hidden, .skip-link')) return false
        // Inline links inside running text are exempt under WCAG 2.5.8.
        if (el.tagName === 'A' && cs.display === 'inline' && el.closest('p, dd, li') && !el.className) return false
        return r.height < 24 || r.width < 24
      })
      .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`)
    const internal = Array.from(document.querySelectorAll('a[href^="/"]')).map((a) => a.getAttribute('href'))
    return {
      overflow,
      wide,
      small,
      internal: Array.from(new Set(internal)),
      htmlLang: doc.lang,
      title: document.title,
      h1: document.querySelectorAll('h1').length,
      placeholders: document.querySelectorAll('[data-placeholder]').length,
      // Visible text in the page's own language: skip text inside an element
      // deliberately marked with another lang (e.g. the 简体 / 繁體 switch buttons).
      ownText: (() => {
        const out = []
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const el = n.parentElement
          if (!el || el.closest('script, style, [hidden]')) continue
          const marked = el.closest('[lang]')
          if (marked && marked.getAttribute('lang') !== doc.lang) continue
          out.push(n.nodeValue)
        }
        return out.join(' ')
      })(),
    }
  })
  // Mixed-script check (no 简 on 繁 pages and vice versa).
  checks.mixedScript =
    s.lang === 'zh-Hant' ? simplifiedLeftovers(checks.ownText) : s.lang === 'zh-Hans' ? traditionalLeftovers(checks.ownText) : []
  delete checks.ownText

  const file = path.join(OUT, `${name}.png`)
  if (s.footer) {
    const footer = page.locator('footer.site-footer')
    await footer.screenshot({ path: path.join(OUT, `footer_${TAG[s.lang]}_${s.w}.png`), animations: 'disabled' })
  } else {
    await page.screenshot({ path: file, fullPage: !s.menu, animations: 'disabled' })
    // Readable slices of tall pages
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    const sliceH = s.w >= 1024 ? 1100 : 1300
    if (!s.menu && total > sliceH * 1.15) {
      const n = Math.ceil(total / sliceH)
      for (let i = 0; i < n; i++) {
        if (s.sliceOnly && (i < s.sliceOnly[0] || i > s.sliceOnly[1])) continue
        await page.screenshot({
          path: path.join(OUT, `${name}--${String(i + 1).padStart(2, '0')}.png`),
          fullPage: true,
          animations: 'disabled',
          clip: { x: 0, y: i * sliceH, width: s.w, height: Math.min(sliceH, total - i * sliceH) },
        })
      }
    }
  }
  report.push({ name, ...checks, consoleErrors, failed })
  await ctx.close()
  process.stdout.write('.')
}

// Internal link check: every internal href must resolve to a known route.
const known = new Set(ROUTES)
const broken = new Set()
for (const r of report) for (const href of r.internal) {
  const p = href.split(/[?#]/)[0].replace(/\/$/, '') || '/'
  if (!known.has(p)) broken.add(href)
}

// Language switch: cycles through all three locales without a reload, persists
// across a reload, and works the same inside the mobile menu.
async function switcherCheck(width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  const steps = []
  await page.goto(BASE + '/events', { waitUntil: 'networkidle' })
  await page.evaluate(() => { window.__noReload = true })
  const scope = width < 480 ? '.mobile-menu' : '.site-header__lang'
  for (const [code, name] of [['zh-Hans', '简体中文'], ['zh-Hant', '繁體中文'], ['en', 'English'], ['zh-Hant', '繁體中文']]) {
    if (width < 480 && !(await page.locator('.mobile-menu').count())) await page.locator('.site-header__bar > .menu-toggle').click()
    await page.locator(scope).getByRole('button', { name }).click()
    await page.waitForTimeout(150)
    const st = await page.evaluate(() => ({
      htmlLang: document.documentElement.lang,
      saved: localStorage.getItem('cgsa-lang'),
      noReload: window.__noReload === true,
      pressed: Array.from(document.querySelectorAll('.lang-switch__btn[aria-pressed="true"]')).map((b) => b.getAttribute('lang')),
      focusLang: document.activeElement?.getAttribute('lang') ?? null,
      menuOpen: !!document.querySelector('.mobile-menu'),
    }))
    steps.push({ clicked: code, ok: st.htmlLang === code && st.saved === code && st.noReload && st.pressed.every((l) => l === code), ...st })
  }
  await page.reload({ waitUntil: 'networkidle' })
  const after = await page.evaluate(() => document.documentElement.lang)
  steps.push({ reload: true, ok: after === 'zh-Hant', htmlLang: after })
  await ctx.close()
  return { width, ok: steps.every((x) => x.ok), steps }
}
const switcher = [await switcherCheck(1440), await switcherCheck(768), await switcherCheck(390)]

await browser.close()
const summary = {
  base: BASE,
  shots: report.length,
  overflow: report.filter((r) => r.overflow).map((r) => `${r.name}: ${r.wide.join(', ')}`),
  consoleErrors: report.filter((r) => r.consoleErrors.length).map((r) => `${r.name}: ${r.consoleErrors.join(' | ')}`),
  failedRequests: [...new Set(report.flatMap((r) => r.failed))],
  smallTargets: [...new Set(report.flatMap((r) => r.small.map((x) => `${r.name}: ${x}`)))],
  brokenInternalLinks: [...broken],
  h1NotOne: report.filter((r) => r.h1 !== 1 && !r.name.includes('menu')).map((r) => r.name),
  placeholdersVisible: report.filter((r) => r.placeholders > 0).map((r) => `${r.name}: ${r.placeholders}`),
  wrongLang: report
    .filter((r) => r.htmlLang !== (r.name.includes('_zhHant_') ? 'zh-Hant' : r.name.includes('_zh_') ? 'zh-Hans' : 'en'))
    .map((r) => r.name),
  mixedScript: report.filter((r) => r.mixedScript.length).map((r) => `${r.name}: ${r.mixedScript.join('')}`),
  switcherFailures: switcher.filter((x) => !x.ok).map((x) => `${x.width}px: ${JSON.stringify(x.steps.filter((st) => !st.ok))}`),
}
await writeFile(path.join(OUT, 'report.json'), JSON.stringify({ summary, switcher, report }, null, 2))
console.log('\n' + JSON.stringify(summary, null, 2))
