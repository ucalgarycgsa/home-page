import { SITE } from '../data/site'
import { chineseName, useI18n } from '../i18n'

/**
 * The official CGSA seal. Uses the transparent derivative of the untouched
 * source file — never redrawn, recoloured or distorted. Light grounds only.
 */
export function Seal({ size, className = '', decorative = false }: { size: number; className?: string; decorative?: boolean }) {
  const { lang } = useI18n()
  return (
    <img
      src={size <= 96 ? SITE.logo.mark192 : SITE.logo.mark}
      width={size}
      height={size}
      alt={decorative ? '' : `${SITE.nameEN} — ${chineseName(lang).text}`}
      className={`seal ${className}`.trim()}
      decoding="async"
    />
  )
}
