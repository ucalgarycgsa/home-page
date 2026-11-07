import { afterEach, describe, expect, it, vi } from 'vitest'
import { EVENTS } from '../src/data/events'
import { TEAM } from '../src/data/team'
import { PARTNERS } from '../src/data/partners'
import { RESOURCE_GROUPS, IMPORTANT_PHONES } from '../src/data/resources'
import { SITE } from '../src/data/site'
import { visible } from '../src/lib/placeholders'
import { bucketEvents } from '../src/lib/events'
import { dateParts, timeRange, todayInCalgary } from '../src/lib/dates'
import { simplifiedLeftovers } from './fixtures/simplified-forms'

afterEach(() => vi.unstubAllEnvs())

describe('organization identity', () => {
  it('matches the official details', () => {
    expect(SITE.email).toBe('ucalgarycgsa@gmail.com')
    expect(SITE.wechatId).toBe('UCalgaryCGSA')
    expect(SITE.benefitsUrl).toBe('https://ucalgarycan.ca/benefits/')
    expect(SITE.nameZH).toBe('卡尔加里大学中国研究生协会')
    expect(SITE.nameHant).toBe('卡爾加里大學中國研究生協會')
    expect(SITE.nameEN).toBe("UCalgary Chinese Graduate Students' Association")
  })
})

describe('placeholders', () => {
  it('are all removed in a production build', () => {
    vi.stubEnv('DEV', false)
    vi.stubEnv('VITE_SHOW_PLACEHOLDERS', '')
    expect(visible(EVENTS).filter((e) => e.placeholder)).toEqual([])
    expect(visible(TEAM).filter((m) => m.placeholder)).toEqual([])
    expect(visible(PARTNERS).filter((p) => p.placeholder)).toEqual([])
  })

  it('are shown in the samples build', () => {
    vi.stubEnv('DEV', false)
    vi.stubEnv('VITE_SHOW_PLACEHOLDERS', 'true')
    expect(visible(EVENTS).length).toBe(EVENTS.length)
  })

  it('every non-placeholder event is complete in all three languages', () => {
    for (const e of EVENTS.filter((x) => !x.placeholder)) {
      for (const k of ['titleEN', 'titleZH', 'titleHant', 'descriptionEN', 'descriptionZH', 'descriptionHant', 'venue'] as const)
        expect(e[k].trim(), `${e.id}.${k}`).not.toBe('')
      expect(e.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      if (e.registrationUrl) expect(e.registrationUrl).toMatch(/^https:\/\//)
    }
  })
})

describe('events', () => {
  it('have unique ids and slugs', () => {
    expect(new Set(EVENTS.map((e) => e.id)).size).toBe(EVENTS.length)
    expect(new Set(EVENTS.map((e) => e.slug)).size).toBe(EVENTS.length)
  })

  it('bucket into featured / upcoming / past by Calgary date', () => {
    vi.stubEnv('VITE_SHOW_PLACEHOLDERS', 'true')
    const b = bucketEvents(EVENTS, { today: '2050-01-01' })
    expect(b.featured?.id).toBe('sample-featured')
    expect(b.upcoming.map((e) => e.id)).toEqual(['sample-upcoming-2', 'sample-upcoming-3'])
    expect(b.past.map((e) => e.id)).toEqual(['sample-past'])
  })

  it('production has no fabricated events', () => {
    vi.stubEnv('DEV', false)
    vi.stubEnv('VITE_SHOW_PLACEHOLDERS', '')
    const b = bucketEvents(EVENTS, { today: '2026-11-06' })
    expect(b.featured).toBeNull()
  })
})

describe('dates', () => {
  it('formats every language without timezone drift', () => {
    expect(dateParts('2026-11-14', 'en').day).toBe('14')
    expect(dateParts('2026-11-14', 'zh-Hans').month).toBe('11月')
    expect(dateParts('2026-11-14', 'zh-Hans').long).toBe('2026年11月14日 星期六')
    expect(dateParts('2026-11-14', 'zh-Hans').weekday).toBe('周六')
    expect(dateParts('2026-11-14', 'zh-Hant').weekday).toBe('週六')
    expect(dateParts('2026-11-14', 'zh-Hant').long).toBe('2026年11月14日 星期六')
    expect(dateParts('2026-11-14', 'en').long).toContain('Saturday')
  })
  it('formats time ranges', () => {
    expect(timeRange('18:00', '20:30', 'en')).toBe('6–8:30 pm')
    expect(timeRange('11:30', '13:00', 'en')).toBe('11:30 am – 1 pm')
    expect(timeRange('18:00', '20:30', 'zh-Hans')).toBe('18:00–20:30')
    expect(timeRange('18:00', '20:30', 'zh-Hant')).toBe('18:00–20:30')
    expect(timeRange(null, null, 'en')).toBeNull()
  })
  it('computes Calgary today', () => {
    // 2026-11-07 03:00 UTC is still Nov 6 in Calgary (UTC−7).
    expect(todayInCalgary(new Date('2026-11-07T03:00:00Z'))).toBe('2026-11-06')
  })
})

describe('resources', () => {
  it('link only to https official sources', () => {
    const allowed = /^https:\/\/(www\.)?(ucalgary\.ca|grad\.ucalgary\.ca|library\.ucalgary\.ca|calendar\.ucalgary\.ca|gsa\.ucalgary\.ca|su\.ucalgary\.ca|canada\.ca|calgary\.ca|calgarytransit\.com)\//
    for (const g of RESOURCE_GROUPS) for (const l of g.links) expect(l.url, l.titleEN).toMatch(allowed)
  })
  it('cover all six groups, in all three languages', () => {
    expect(RESOURCE_GROUPS.map((g) => g.id)).toEqual(['new', 'academic', 'career', 'life', 'community', 'contacts'])
    for (const g of RESOURCE_GROUPS)
      for (const l of g.links)
        for (const k of ['titleEN', 'titleZH', 'titleHant', 'noteEN', 'noteZH', 'noteHant', 'sourceHant'] as const)
          expect(l[k], `${l.titleEN}.${k}`).not.toBe('')
  })
  it('繁體 fields contain no 简体 character forms', () => {
    const records = [...RESOURCE_GROUPS.flatMap((g) => g.links), ...EVENTS, ...TEAM]
    const bad: string[] = []
    for (const r of records)
      for (const [k, v] of Object.entries(r))
        if (k.endsWith('Hant') && typeof v === 'string' && simplifiedLeftovers(v).length) bad.push(`${k}: ${v}`)
    expect([...bad, ...simplifiedLeftovers(SITE.nameHant)]).toEqual([])
  })
  it('every phone number carries its official source', () => {
    for (const p of IMPORTANT_PHONES) expect(p.sourceUrl).toMatch(/^https:\/\/www\.ucalgary\.ca\//)
  })
})
