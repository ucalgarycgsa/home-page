import { describe, expect, it } from 'vitest'
import { en } from '../src/i18n/en'
import { zh } from '../src/i18n/zh'
import { zhHant } from '../src/i18n/zh-Hant'
import { normalizeLang } from '../src/i18n'
import { simplifiedLeftovers } from './fixtures/simplified-forms'

type Leaf = { path: string; value: string }
function leaves(obj: unknown, prefix = ''): Leaf[] {
  if (typeof obj === 'string') return [{ path: prefix, value: obj }]
  if (Array.isArray(obj)) return obj.flatMap((v, i) => leaves(v, `${prefix}[${i}]`))
  if (obj && typeof obj === 'object')
    return Object.entries(obj).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k))
  return []
}

// Strings that are legitimately identical in both languages (proper nouns, symbols).
const SAME_OK = new Set(['notFound.label', 'team.linkedin', 'footer.rights'])
const CJK = /[一-鿿]/

const CHINESE = [
  ['zh-Hans', zh],
  ['zh-Hant', zhHant],
] as const

describe('i18n', () => {
  const enLeaves = leaves(en)
  const enPaths = enLeaves.map((l) => l.path).sort()

  it('has no empty strings', () => {
    for (const l of [...enLeaves, ...leaves(zh), ...leaves(zhHant)]) expect(l.value.trim(), l.path).not.toBe('')
  })

  it('EN strings contain no Chinese except deliberate bilingual lines', () => {
    const allow = new Set(['hero.altLine', 'footer.closingAlt'])
    const leaked = enLeaves.filter((l) => !allow.has(l.path) && CJK.test(l.value))
    expect(leaked.map((l) => l.path)).toEqual([])
  })

  for (const [name, messages] of CHINESE) {
    describe(name, () => {
      const zhLeaves = leaves(messages)
      const zhMap = new Map(zhLeaves.map((l) => [l.path, l.value]))

      it('has the same key structure as EN', () => {
        expect(zhLeaves.map((l) => l.path).sort()).toEqual(enPaths)
      })

      it('translates every string (no English left behind)', () => {
        const untranslated = enLeaves.filter((l) => !SAME_OK.has(l.path) && zhMap.get(l.path) === l.value)
        expect(untranslated.map((l) => l.path)).toEqual([])
      })

      it('contains Chinese unless a string is a proper noun or punctuation', () => {
        const allowLatin = new Set([...SAME_OK, 'hero.stop', 'hero.altLine', 'footer.closingAlt'])
        const missing = zhLeaves.filter((l) => !allowLatin.has(l.path) && !CJK.test(l.value) && !/^[\s\p{P}]+$/u.test(l.value))
        expect(missing.map((l) => l.path)).toEqual([])
      })

      it('uses full-width punctuation in Chinese prose', () => {
        const bad = zhLeaves.filter((l) => CJK.test(l.value) && /[一-鿿][,;:!?]|[一-鿿]\.(\s|$)/.test(l.value))
        expect(bad.map((l) => `${l.path}: ${l.value}`)).toEqual([])
      })

      it('keeps official contact details', () => {
        expect(messages.meta.contact.description).toContain('UCalgaryCGSA')
        expect(messages.meta.contact.description).toContain('ucalgarycgsa@gmail.com')
      })

      it('never leaves a headline break marker at the start or end', () => {
        const edge = zhLeaves.filter((l) => /^\||\|$/.test(l.value))
        expect(edge.map((l) => l.path)).toEqual([])
      })
    })
  }

  it('keeps official contact details in EN', () => {
    expect(en.meta.contact.description).toContain('UCalgaryCGSA')
    expect(en.meta.contact.description).toContain('ucalgarycgsa@gmail.com')
  })

  it('zh-Hant: no 简体 character forms remain', () => {
    const leftovers = leaves(zhHant)
      .map((l) => ({ path: l.path, chars: simplifiedLeftovers(l.value) }))
      .filter((x) => x.chars.length > 0)
    expect(leftovers.map((x) => `${x.path}: ${x.chars.join('')}`)).toEqual([])
  })

  it('zh-Hant: uses 「」 quotes, not “ ”', () => {
    const curly = leaves(zhHant).filter((l) => /[“”]/.test(l.value))
    expect(curly.map((l) => l.path)).toEqual([])
  })
})

describe('normalizeLang', () => {
  it.each([
    ['en', 'en'],
    ['en-CA', 'en'],
    ['zh', 'zh-Hans'], // legacy saved value from before 繁體 existed
    ['zh-Hans', 'zh-Hans'],
    ['zh-CN', 'zh-Hans'],
    ['zh-SG', 'zh-Hans'],
    ['zh-Hant', 'zh-Hant'],
    ['zh-hant', 'zh-Hant'],
    ['zh-Hant-HK', 'zh-Hant'],
    ['zh-HK', 'zh-Hant'],
    ['zh-MO', 'zh-Hant'],
    ['zh-TW', 'zh-Hant'],
    ['fr', null],
    ['', null],
  ])('%s → %s', (input, expected) => {
    expect(normalizeLang(input)).toBe(expected)
  })
})
