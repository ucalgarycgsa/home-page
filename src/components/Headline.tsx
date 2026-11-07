import { Fragment, type ElementType, type ReactNode } from 'react'

/**
 * Renders a headline whose "|" markers are the only allowed line breaks.
 * In Chinese, each segment is kept on one line (so 归属 never splits into
 * 归 / 属); in English, normal wrapping applies.
 */
export function Headline({
  as: Tag = 'h2',
  text,
  className,
  id,
  tabIndex,
  after,
}: {
  as?: ElementType
  text: string
  className?: string
  id?: string
  tabIndex?: number
  after?: ReactNode
}) {
  // A headline's final 。 is wrapped so 繁體 can pull it tight (see base.css); text is unchanged.
  const endsWithStop = text.endsWith('。')
  const body = endsWithStop ? text.slice(0, -1) : text
  const parts = body.split('|')
  return (
    <Tag className={className} id={id} tabIndex={tabIndex}>
      {parts.length === 1
        ? body
        : parts.map((part, i) => (
            <Fragment key={i}>
              {/* Explicit break opportunity between segments (needed where segments use keep-all). */}
              {i > 0 && <wbr />}
              <span className="seg">
                {part}
                {endsWithStop && i === parts.length - 1 && <span className="h-end">。</span>}
              </span>
            </Fragment>
          ))}
      {endsWithStop && parts.length === 1 && <span className="h-end">。</span>}
      {after}
    </Tag>
  )
}
