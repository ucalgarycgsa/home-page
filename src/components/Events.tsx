import type { ReactNode } from 'react'
import { useI18n } from '../i18n'
import type { CgsaEvent, Lang } from '../types/content'
import { dateParts, timeRange } from '../lib/dates'
import { displayStatus } from '../lib/events'
import { ExternalLink } from './Links'
import { ImageSlot } from './ImageSlot'
import { FitLine } from './FitLine'
import './events.css'

/**
 * The date seal: square, ink outline, red numeral, never filled. It is the one
 * framed element in the system. It is a picture of the date only; the date is
 * always also given as text in a <time> in the event meta.
 */
export function DateSeal({ date, size = 'm' }: { date: string; size?: 'm' | 'l' }) {
  const { lang } = useI18n()
  const p = dateParts(date, lang)
  return (
    <div className={`date-seal date-seal--${size}`} aria-hidden="true">
      <span className="date-seal__month">{p.month}</span>
      <span className="date-seal__day">{p.day}</span>
      <span className="date-seal__weekday">{p.weekday}</span>
    </div>
  )
}

function EventMeta({ event }: { event: CgsaEvent }) {
  const { t, lang } = useI18n()
  const p = dateParts(event.date, lang)
  const time = timeRange(event.startTime, event.endTime, lang)
  return (
    <dl className="event-meta">
      <div>
        <dt className="visually-hidden">{t.events.dateLabel}</dt>
        <dd>
          <time dateTime={event.date}>{p.long}</time>
        </dd>
      </div>
      <div>
        <dt className="visually-hidden">{t.events.timeLabel}</dt>
        <dd>{time ?? t.events.timeTBA}</dd>
      </div>
      <div>
        <dt className="visually-hidden">{t.events.venueLabel}</dt>
        <dd>{event.venue || t.events.venueTBA}</dd>
      </div>
    </dl>
  )
}

export function EventCta({ event, compact = false }: { event: CgsaEvent; compact?: boolean }) {
  const { t } = useI18n()
  const status = displayStatus(event)
  if (status === 'COMPLETED') return null
  if (status === 'FULL') return <p className="event-cta__note">{t.events.cta.full}</p>
  if (event.registrationType === 'FREE_NO_REGISTRATION')
    return <p className="event-cta__note">{t.events.cta.noRegistration}</p>
  if (event.registrationUrl) {
    const label = event.registrationType === 'RSVP' ? t.events.cta.rsvp : t.events.cta.register
    return (
      <ExternalLink href={event.registrationUrl} className={compact ? 'arrow-link' : 'btn btn--block-sm'}>
        {label}{' '}
      </ExternalLink>
    )
  }
  return <p className="event-cta__note">{t.events.cta.comingSoon}</p>
}

function Tags({ event }: { event: CgsaEvent }) {
  const { t } = useI18n()
  const status = displayStatus(event)
  return (
    <p className="event-tags t-label">
      {event.placeholder && <span className="sample-tag" data-placeholder="">{t.common.sample}</span>}
      <span>{t.events.categories[event.category]}</span>
      <span className={status === 'REGISTRATION OPEN' ? 'red-deep' : undefined}>{t.events.status[status]}</span>
    </p>
  )
}

export function EventRow({ event, headingLevel = 3 }: { event: CgsaEvent; headingLevel?: 2 | 3 }) {
  const { pick, t } = useI18n()
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const past = displayStatus(event) === 'COMPLETED'
  return (
    <article className={`event-row${past ? ' is-past' : ''}`}>
      <DateSeal date={event.date} />
      {/* Phones: this wrapper dissolves (display: contents) so the tags sit beside the
          seal and the title, meta and CTA each take the full width. */}
      <div className="event-row__main">
        <Tags event={event} />
        <H className="t-h3 event-row__title">{pick(event.titleEN, event.titleZH, event.titleHant)}</H>
        <EventMeta event={event} />
        {event.capacityText && <p className="t-caption">{pick(event.capacityText.en, event.capacityText.zh, event.capacityText.zhHant)}</p>}
        {event.partnerOrganizations.length > 0 && (
          <p className="t-caption">
            {t.events.partnersLabel} {event.partnerOrganizations.join(' · ')}
          </p>
        )}
      </div>
      <div className="event-row__cta">
        <EventCta event={event} compact />
      </div>
    </article>
  )
}

export function FeaturedEvent({ event, headingLevel = 3 }: { event: CgsaEvent; headingLevel?: 2 | 3 }) {
  const { pick } = useI18n()
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className={`event-feature${event.image ? ' has-image' : ''}`}>
      <ImageSlot
        src={event.image}
        alt={pick(event.imageAltEN ?? '', event.imageAltZH ?? '', event.imageAltHant ?? '')}
        ratio="21 / 9"
        className="event-feature__image"
      />
      <div className="event-feature__body">
        <DateSeal date={event.date} size="l" />
        <div className="event-feature__head">
          <Tags event={event} />
          <H className="t-h2 event-feature__title">{pick(event.titleEN, event.titleZH, event.titleHant)}</H>
        </div>
        <div className="event-feature__rest">
          <p className="event-feature__desc">{pick(event.descriptionEN, event.descriptionZH, event.descriptionHant)}</p>
          <EventMeta event={event} />
          <div className="event-feature__cta">
            <EventCta event={event} />
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Marks up the long date from dateParts() without changing its text:
 * - the day numeral is the one red mark ("here, now");
 * - the string is split at its first space (EN after the weekday, Chinese before
 *   the weekday) so phones can set it one phrase per line.
 */
function DateLine({ long, day, lang }: { long: string; day: string; lang: Lang }) {
  const dayRe = lang === 'en' ? new RegExp(`\\b${day}\\b`) : new RegExp(`(?<=月)${day}(?=日)`)
  const mark = (s: string): ReactNode => {
    const m = dayRe.exec(s)
    if (!m) return s
    return (
      <>
        {s.slice(0, m.index)}
        <span className="ev-date__day">{day}</span>
        {s.slice(m.index + day.length)}
      </>
    )
  }
  const cut = long.indexOf(' ')
  if (cut < 0) return <span className="ev-date__phrase">{mark(long)}</span>
  return (
    <>
      <span className="ev-date__phrase">{mark(long.slice(0, cut))}</span>{' '}
      <span className="ev-date__phrase">{mark(long.slice(cut + 1))}</span>
    </>
  )
}

/**
 * Events page only: the featured event in the stone highlight plate.
 * Its date is the page's Full-Measure Line; title, meta (with the date as
 * plain text again) and the registration action follow.
 */
export function FeaturedEventPlate({ event, kicker }: { event: CgsaEvent; kicker: string }) {
  const { pick, lang } = useI18n()
  const p = dateParts(event.date, lang)
  return (
    <article className={`ev-plate${event.image ? ' has-image' : ''}`} aria-labelledby={`ev-${event.id}`}>
      <p className="t-label ev-plate__kicker">{kicker}</p>
      <FitLine as="p" className="ev-date">
        <time dateTime={event.date}>
          <DateLine long={p.long} day={p.day} lang={lang} />
        </time>
      </FitLine>
      <div className="ev-plate__body">
        <div className="ev-plate__tags">
          <Tags event={event} />
        </div>
        <h3 className="t-h2 ev-plate__title" id={`ev-${event.id}`}>
          {pick(event.titleEN, event.titleZH, event.titleHant)}
        </h3>
        <div className="ev-plate__meta">
          <EventMeta event={event} />
        </div>
        <div className="ev-plate__cta">
          <EventCta event={event} />
        </div>
        <p className="ev-plate__desc">{pick(event.descriptionEN, event.descriptionZH, event.descriptionHant)}</p>
      </div>
      <ImageSlot
        src={event.image}
        alt={pick(event.imageAltEN ?? '', event.imageAltZH ?? '', event.imageAltHant ?? '')}
        ratio="21 / 9"
        className="ev-plate__image"
      />
    </article>
  )
}
