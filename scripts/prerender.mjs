// Prerender every route to static HTML with route-specific <head>.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
//
// Env:
//   SITE_URL=https://example.org/home-page   full site URL including deployment directory
//   VITE_SHOW_PLACEHOLDERS=true    sample build (adds noindex; allows placeholders)
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.resolve(root, process.env.DIST_DIR || 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')
const SITE_URL = (process.env.SITE_URL || '').replace(/\/+$/, '')
const SAMPLES = process.env.VITE_SHOW_PLACEHOLDERS === 'true'

const { render, ROUTES, BASE_PATH } = await import(pathToFileURL(ssrEntry).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Locales and their hreflang / og:locale values. The site has one URL per route and
// chooses the language on the client, so language alternates are ?lang= variants
// of the same URL (the inline script in index.html reads it before first paint).
const LOCALES = [
  { lang: 'en', hreflang: 'en', og: 'en_CA' },
  { lang: 'zh-Hans', hreflang: 'zh-Hans', og: 'zh_CN' },
  { lang: 'zh-Hant', hreflang: 'zh-Hant', og: 'zh_HK' },
]
const pageUrl = (routePath, lang) => `${SITE_URL}${routePath === '/' ? '/' : `${routePath}/`}${lang ? `?lang=${lang}` : ''}`

function alternates(routePath) {
  return [
    ...LOCALES.map((l) => ({ hreflang: l.hreflang, href: pageUrl(routePath, l.lang) })),
    { hreflang: 'x-default', href: pageUrl(routePath) },
  ]
}

function head({ title, description }, routePath) {
  const indexable = SITE_URL && routePath !== '/404'
  const url = SITE_URL ? pageUrl(routePath) : null
  const image = SITE_URL ? `${SITE_URL}/og/og-default.png` : `${BASE_PATH}og/og-default.png`
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    url ? `<link rel="canonical" href="${esc(url)}" />` : '',
    ...(indexable ? alternates(routePath).map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`) : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="UCalgary CGSA · 卡尔加里大学中国研究生协会" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    url ? `<meta property="og:url" content="${esc(url)}" />` : '',
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${LOCALES[0].og}" />`,
    ...LOCALES.slice(1).map((l) => `<meta property="og:locale:alternate" content="${l.og}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    SAMPLES || routePath === '/404' ? `<meta name="robots" content="noindex, nofollow" />` : '',
  ]
    .filter(Boolean)
    .join('\n    ')
}

const pages = [...ROUTES.map((r) => ({ path: r.path, out: r.path === '/' ? 'index.html' : `${r.path.slice(1)}/index.html` })), { path: '/404', out: '404.html' }]

for (const page of pages) {
  const rendered = render(page.path)
  if (!SAMPLES && rendered.html.includes('data-placeholder')) {
    throw new Error(`Placeholder content leaked into production page ${page.path}`)
  }
  const html = template.replace('<!--app-head-->', head(rendered, page.path)).replace('<!--app-html-->', rendered.html)
  const file = path.join(dist, page.out)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`prerendered ${page.path.padEnd(11)} → dist/${page.out}`)
}

if (SITE_URL) {
  // Every route in every language, each entry listing the full alternate set (incl. itself).
  const urls = ROUTES.flatMap((r) => {
    const links = alternates(r.path)
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`)
      .join('\n')
    return [pageUrl(r.path), ...LOCALES.map((l) => pageUrl(r.path, l.lang))].map(
      (loc) => `  <url>\n    <loc>${esc(loc)}</loc>\n${links}\n  </url>`,
    )
  }).join('\n')
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
  )
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
  console.log('sitemap.xml + robots.txt written for', SITE_URL)
} else {
  console.warn('SITE_URL not set: canonical/og:url and sitemap.xml skipped (set it when the domain is known).')
}
if (SAMPLES) {
  await writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
}

// This build is plain static HTML; disable Jekyll processing on GitHub Pages.
await writeFile(path.join(dist, '.nojekyll'), '')

if (existsSync(path.join(root, 'dist-ssr'))) await rm(path.join(root, 'dist-ssr'), { recursive: true })
