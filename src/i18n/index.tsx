import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../types/content'
import { SITE } from '../data/site'
import { loadHantFonts } from '../styles/fonts-hant'
import type { Messages } from './schema'
import { en } from './en'
import { zh } from './zh'
import { zhHant } from './zh-Hant'

/** Every locale the site ships, in switcher order. */
export const LANGS = ['en', 'zh-Hans', 'zh-Hant'] as const satisfies readonly Lang[]
export const MESSAGES: Record<Lang, Messages> = { en, 'zh-Hans': zh, 'zh-Hant': zhHant }
export const LANG_STORAGE_KEY = 'cgsa-lang'
/** Locale keys are already BCP 47 tags; kept as a map so <html lang> has one source. */
export const HTML_LANG: Record<Lang, string> = { en: 'en', 'zh-Hans': 'zh-Hans', 'zh-Hant': 'zh-Hant' }

/**
 * Map any incoming value (?lang=, saved choice, browser language) to a locale.
 * Accepts the legacy value "zh" (= 简体, used before 繁體 existed) and common
 * region tags: zh-HK / zh-MO / zh-TW → 繁體, zh-CN / zh-SG → 简体.
 * Keep in step with the inline script in index.html.
 */
export function normalizeLang(value: string | null | undefined): Lang | null {
  if (!value) return null
  const v = value.trim().toLowerCase()
  if (v === 'en' || v.startsWith('en-')) return 'en'
  if (v === 'zh-hant' || v.startsWith('zh-hant-') || v === 'hant' || v === 'tc' || /^zh-(hk|mo|tw)\b/.test(v)) return 'zh-Hant'
  if (v === 'zh' || v === 'zh-hans' || v.startsWith('zh-')) return 'zh-Hans'
  return null
}

/**
 * The organization's Chinese name in the script that matches the page:
 * 繁體 on zh-Hant pages, 简体 otherwise (English pages show the 简体 name, as before).
 */
export function chineseName(lang: Lang): { text: string; lang: 'zh-Hans' | 'zh-Hant' } {
  return lang === 'zh-Hant' ? { text: SITE.nameHant, lang: 'zh-Hant' } : { text: SITE.nameZH, lang: 'zh-Hans' }
}

/** True for both Chinese locales. Use instead of comparing against one Chinese key. */
export function isChinese(lang: Lang): boolean {
  return lang !== 'en'
}

interface I18nValue {
  lang: Lang
  t: Messages
  setLang: (lang: Lang) => void
  /** Pick the EN, ZH (简体) or Hant (繁體) field of a data record. */
  pick: <T>(en: T, zh: T, zhHant: T) => T
}

const I18nContext = createContext<I18nValue | null>(null)

/** Apply language to <html> (lang attribute drives :lang() typography in CSS). */
export function applyDocumentLang(lang: Lang) {
  const root = document.documentElement
  root.lang = HTML_LANG[lang]
  root.dataset.lang = lang
  if (lang === 'zh-Hant') loadHantFonts()
}

export function LanguageProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      /* storage unavailable (private mode) — switch still works for this visit */
    }
    applyDocumentLang(next)
    // Keep a shared ?lang= link from overriding the visitor's choice on refresh.
    const url = new URL(window.location.href)
    if (url.searchParams.has('lang')) {
      url.searchParams.delete('lang')
      window.history.replaceState(null, '', url.pathname + url.search + url.hash)
    }
  }, [])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      t: MESSAGES[lang],
      setLang,
      pick: (enValue, zhValue, hantValue) => (lang === 'zh-Hant' ? hantValue : lang === 'zh-Hans' ? zhValue : enValue),
    }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider')
  return ctx
}

/**
 * Headline strings may contain "|" to mark the only places a line may break
 * (used to art-direct Chinese headlines). `plain()` removes the markers.
 */
export function plain(text: string): string {
  return text.replaceAll('|', '')
}
