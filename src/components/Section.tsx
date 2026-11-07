import type { ReactNode } from 'react'
import './section.css'

/**
 * Section (Art Direction phase): no label rail. Content starts at grid column 1.
 * - `label` renders as a small kicker above the content; pass `hideLabel` when the
 *   heading already says the same thing (the label is still used for nothing else).
 * - `opener` draws the 3px ink rule that opens a highlight.
 * - `tone` sets the ground (paper | stone | ink). Stone is reserved for the two
 *   highlights (Events, Benefits); see BOARD_DECISION.md.
 * - `rail` (legacy name) renders an aside before the content, e.g. a seal.
 * - `wide` is kept for API compatibility and has no effect.
 */
export function Section({
  id,
  label,
  hideLabel = false,
  opener = false,
  tone = 'paper',
  rail,
  children,
  className = '',
  labelledBy,
}: {
  id?: string
  /** @deprecated numbering was removed in phase 1 */
  num?: string
  label: string
  hideLabel?: boolean
  opener?: boolean
  tone?: 'paper' | 'stone' | 'ink'
  wide?: boolean
  rail?: ReactNode
  children: ReactNode
  className?: string
  labelledBy?: string
}) {
  return (
    <section id={id} className={`section tone-${tone} ${className}`.trim()} aria-labelledby={labelledBy}>
      <div className={`container section__inner${opener ? ' section__inner--opener' : ''}`}>
        {!hideLabel && <p className="t-label section__kicker">{label}</p>}
        {rail && <div className="section__aside">{rail}</div>}
        <div className="section__body-wrap">{children}</div>
      </div>
    </section>
  )
}

/** Sub-page header: optional kicker label, H1 (receives focus on navigation), optional lead. */
export function PageHeader({
  label,
  title,
  lead,
  children,
}: {
  /** Omit when it would only repeat the H1. */
  label?: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="page-header">
      <div className="container">
        {label && <p className="t-label page-header__label">{label}</p>}
        <div className="page-header__main">
          {title}
          {lead && <div className="t-body-l page-header__lead measure">{lead}</div>}
          {children}
        </div>
      </div>
    </header>
  )
}
