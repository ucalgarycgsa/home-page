import { describe, expect, it } from 'vitest'
import { withBasePath, withoutBasePath } from '../src/lib/paths'

describe('GitHub Pages deployment paths', () => {
  it('prefixes internal links and assets while preserving query strings and hashes', () => {
    expect(withBasePath('/', '/home-page/')).toBe('/home-page/')
    expect(withBasePath('/events?lang=zh-Hans#upcoming', '/home-page/')).toBe('/home-page/events?lang=zh-Hans#upcoming')
    expect(withBasePath('/brand/cgsa-logo-192.png', '/home-page/')).toBe('/home-page/brand/cgsa-logo-192.png')
  })

  it('preserves external URLs, local anchors, and root deployments', () => {
    for (const url of ['https://example.org/', '//example.org/logo.png', 'mailto:a@example.org', '#main']) {
      expect(withBasePath(url, '/home-page/')).toBe(url)
    }
    expect(withBasePath('/events', '/')).toBe('/events')
  })

  it('reads routes only within the deployment directory boundary', () => {
    expect(withoutBasePath('/home-page', '/home-page/')).toBe('/')
    expect(withoutBasePath('/home-page/', '/home-page/')).toBe('/')
    expect(withoutBasePath('/home-page/events/', '/home-page/')).toBe('/events/')
    expect(withoutBasePath('/home-page-other/events', '/home-page/')).toBe('/home-page-other/events')
    expect(withoutBasePath('/events/', '/')).toBe('/events/')
  })
})
