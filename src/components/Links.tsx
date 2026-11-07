import type { ReactNode } from 'react'
import { Link } from '../router/Router'
import { useI18n } from '../i18n'

/** External link: new tab, safe rel, announced to screen readers. */
export function ExternalLink({
  href,
  children,
  className,
  arrow = true,
}: {
  href: string
  children: ReactNode
  className?: string
  arrow?: boolean
}) {
  const { t } = useI18n()
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" data-external="">
      {children}
      {arrow && (
        <span className="arrow-link__arrow" aria-hidden="true">
          ↗
        </span>
      )}
      <span className="visually-hidden"> {t.common.opensInNewTab}</span>
    </a>
  )
}

/** Underlined text link with an arrow — the default secondary action. */
export function ArrowLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const cls = `arrow-link ${className}`.trim()
  if (/^(https?:|mailto:)/.test(to)) {
    if (to.startsWith('mailto:')) {
      return (
        <a href={to} className={cls}>
          {children}
          <span className="arrow-link__arrow" aria-hidden="true">
            →
          </span>
        </a>
      )
    }
    return (
      <ExternalLink href={to} className={cls}>
        {children}
      </ExternalLink>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
      <span className="arrow-link__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  )
}

export function mailto(email: string, subject?: string): string {
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
}
