import { LANGS, useI18n } from '../i18n'
import type { Lang } from '../types/content'

/**
 * Each locale is labelled in its own language and script. `name` is the
 * accessible name (read in that language because the button carries `lang`);
 * `long` / `short` are the visible labels — the header uses `short` between
 * 480 and 1023 px, everything else shows `long`. Both are contained in `name`
 * (WCAG 2.5.3 label-in-name).
 */
const LABELS: Record<Lang, { long: string; short: string; name: string }> = {
  en: { long: 'EN', short: 'EN', name: 'English' },
  'zh-Hans': { long: '简体', short: '简', name: '简体中文' },
  'zh-Hant': { long: '繁體', short: '繁', name: '繁體中文' },
}

/** EN | 简体 | 繁體 — switches instantly, no reload; the choice is saved in localStorage. */
export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t.nav.languageLabel}>
      {LANGS.map((code, i) => {
        const label = LABELS[code]
        return (
          <span key={code} className="lang-switch__item">
            {i > 0 && (
              <span className="lang-switch__sep" aria-hidden="true">
                |
              </span>
            )}
            <button
              type="button"
              lang={code}
              className="lang-switch__btn"
              aria-label={label.name}
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
            >
              <span className="lang-switch__long">{label.long}</span>
              <span className="lang-switch__short" aria-hidden="true">
                {label.short}
              </span>
            </button>
          </span>
        )
      })}
    </div>
  )
}
