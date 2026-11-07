import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'

/**
 * The Full-Measure Line — the site's signature gesture (BOARD_DECISION.md).
 *
 * A page's single most useful line, set so it exactly fills its container.
 * It measures the *rendered* text (after web fonts load, and again whenever the
 * container or the text box changes size: resize, zoom, text-spacing overrides),
 * so there are no per-language constants and copy edits can't break it.
 *
 * - Below `fromWidth` (default 768 px) nothing is fitted: CSS sets a display size
 *   and the line wraps (phones compose it one phrase per line).
 * - The size is clamped to the element's CSS custom properties --fit-min / --fit-max
 *   (unitless px). If the text can't fit even at --fit-min, it wraps instead of
 *   overflowing.
 * - Server-rendered HTML has the static size, so no-JS visitors get a clean heading.
 *
 * Use at most once per page. Put it in a block or in a grid track sized
 * `minmax(0, 1fr)`: in an `auto` track the fitted text would widen its own container.
 */
export function FitLine({
  as: Tag = 'p',
  children,
  className = '',
  id,
  tabIndex,
  fromWidth = 768,
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  id?: string
  tabIndex?: number
  fromWidth?: number
}) {
  const outer = useRef<HTMLElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = outer.current
    const text = inner.current
    if (!el || !text) return
    const mq = window.matchMedia(`(min-width: ${fromWidth}px)`)
    let frame = 0
    let last = 0

    const reset = () => {
      el.classList.remove('is-fitted')
      el.style.removeProperty('font-size')
      last = 0
    }

    const fit = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!mq.matches) return reset()
        const cs = getComputedStyle(el)
        const min = parseFloat(cs.getPropertyValue('--fit-min')) || 48
        const max = parseFloat(cs.getPropertyValue('--fit-max')) || 176
        const available = el.clientWidth
        if (available <= 0) return
        // Measure at a reference size on one line.
        el.classList.add('is-fitted')
        el.style.fontSize = '100px'
        const natural = text.getBoundingClientRect().width
        if (natural <= 0) return reset()
        const ideal = Math.floor((100 * available * 0.998) / natural * 10) / 10
        if (ideal < min) {
          // Too long to fit at the minimum: wrap at the minimum size instead of overflowing.
          el.classList.remove('is-fitted')
          el.style.fontSize = `${min}px`
          last = min
          return
        }
        const size = Math.min(ideal, max)
        el.style.fontSize = `${size}px`
        last = size
      })
    }

    fit()
    document.fonts?.ready.then(fit).catch(() => {})
    document.fonts?.addEventListener?.('loadingdone', fit)
    const ro = new ResizeObserver(() => {
      // Ignore the size change our own fitting causes.
      const current = parseFloat(el.style.fontSize) || 0
      if (last && Math.abs(current - last) < 0.5 && el.classList.contains('is-fitted')) {
        const overflow = text.getBoundingClientRect().width - el.clientWidth
        if (overflow <= 1) return
      }
      fit()
    })
    ro.observe(el)
    ro.observe(text) // text-spacing overrides or zoom change the text box, not the container
    mq.addEventListener('change', fit)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      mq.removeEventListener('change', fit)
      document.fonts?.removeEventListener?.('loadingdone', fit)
    }
  }, [fromWidth, children])

  return (
    <Tag ref={outer} className={`fit ${className}`.trim()} id={id} tabIndex={tabIndex}>
      <span ref={inner} className="fit__inner">
        {children}
      </span>
    </Tag>
  )
}
