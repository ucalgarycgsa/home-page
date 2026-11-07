import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { App } from '../src/App'
import { ROUTES } from '../src/router/routes'
import { LANGS } from '../src/i18n'
import { simplifiedLeftovers } from './fixtures/simplified-forms'

describe('every route renders in every language', () => {
  for (const lang of LANGS) {
    for (const r of [...ROUTES.map((x) => x.path), '/does-not-exist']) {
      it(`${lang} ${r}`, () => {
        const html = renderToString(<App initialLang={lang} initialPath={r} />)
        expect(html).toContain('id="page-title"')
        expect(html).toContain('UCalgaryCGSA')
        expect(html.match(/<h1[\s>]/g)?.length, 'exactly one h1').toBe(1)
        if (lang === 'zh-Hans') expect(html).toContain('卡尔加里大学中国研究生协会')
        if (lang === 'zh-Hant') {
          expect(html).toContain('卡爾加里大學')
          expect(html).toContain('中國研究生協會')
          // No mixed scripts: the only 简体 allowed on a 繁體 page is the 简体 switch button label.
          const text = html
            .replace(/<button[^>]*lang="zh-Hans"[\s\S]*?<\/button>/g, '')
            .replace(/<[^>]+>/g, ' ')
          expect(simplifiedLeftovers(text), `简体 forms on zh-Hant ${r}`).toEqual([])
        }
      })
    }
  }

  it('never renders a fake WeChat URL or QR code', () => {
    for (const r of ROUTES) {
      const html = renderToString(<App initialLang="en" initialPath={r.path} />)
      expect(html).not.toMatch(/weixin:\/\/|qr[-_ ]?code/i)
    }
  })

  it('external links open safely', () => {
    const html = renderToString(<App initialLang="en" initialPath="/resources" />)
    const blank = html.match(/<a [^>]*target="_blank"[^>]*>/g) ?? []
    expect(blank.length).toBeGreaterThan(10)
    for (const a of blank) expect(a).toContain('rel="noopener noreferrer"')
  })
})
