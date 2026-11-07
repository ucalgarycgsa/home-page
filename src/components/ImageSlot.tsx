import { useI18n } from '../i18n'
import { showPlaceholders } from '../lib/placeholders'

/**
 * Image slot. Renders a real (licensed) image when `src` is set. Otherwise it
 * renders a clearly labelled placeholder frame in dev/sample builds only, and
 * nothing at all in production.
 */
export function ImageSlot({
  src,
  alt,
  ratio = '4 / 3',
  className = '',
}: {
  src: string | null
  alt: string
  ratio?: string
  className?: string
}) {
  const { t } = useI18n()
  if (src) {
    return (
      <figure className={`image-slot ${className}`.trim()} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </figure>
    )
  }
  if (!showPlaceholders()) return null
  return (
    <figure className={`image-slot image-slot--empty ${className}`.trim()} style={{ aspectRatio: ratio }} data-placeholder="">
      <figcaption>
        <span className="sample-tag">{t.common.sample}</span>
        <span>{t.common.photoPlaceholder}</span>
      </figcaption>
    </figure>
  )
}
