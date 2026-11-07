import { useState } from 'react'
import { useI18n } from '../i18n'
import { EVENTS } from '../data/events'
import { bucketEvents } from '../lib/events'
import { visible } from '../lib/placeholders'
import type { EventCategory } from '../types/content'
import { PageHeader, Section } from '../components/Section'
import { Headline } from '../components/Headline'
import { EventRow, FeaturedEventPlate } from '../components/Events'
import { EventsEmpty } from '../components/EventsEmpty'
import './pages.css'
import './events-page.css'

const CATEGORIES: EventCategory[] = ['CAREER', 'NETWORKING', 'ACADEMIC', 'COMMUNITY', 'CULTURE', 'SOCIAL']

function initialCategory(): EventCategory | null {
  if (typeof window === 'undefined') return null
  const q = new URLSearchParams(window.location.search).get('category')?.toUpperCase()
  return CATEGORIES.find((c) => c === q) ?? null
}

/**
 * Events (a highlight page). Order: header → the stone plate (filters, the featured
 * event with its date as the page's Full-Measure Line, then the other upcoming
 * events; or the honest empty state with the WeChat ID) → how registration works →
 * event types → past events.
 */
export function Events() {
  const { t } = useI18n()
  const [category, setCategory] = useState<EventCategory | null>(initialCategory)
  const { featured, upcoming, past } = bucketEvents(EVENTS, { category })
  const hasAnyUpcoming = bucketEvents(EVENTS).featured !== null
  // Only offer filters for categories that actually have events.
  const usedCategories = CATEGORIES.filter((c) => visible(EVENTS).some((e) => e.category === c))

  function choose(next: EventCategory | null, focusAll = false) {
    setCategory(next)
    if (focusAll) requestAnimationFrame(() => document.querySelector<HTMLElement>('.event-filters__btn')?.focus())
    const url = new URL(window.location.href)
    if (next) url.searchParams.set('category', next.toLowerCase())
    else url.searchParams.delete('category')
    window.history.replaceState(null, '', url.pathname + url.search)
  }

  return (
    <div className="events-page">
      <PageHeader
        title={<Headline as="h1" className="t-title-l events-page__title" id="page-title" tabIndex={-1} text={t.events.title} />}
        lead={<p>{t.events.intro}</p>}
      />

      <Section
        label={t.events.upcoming}
        hideLabel
        tone="stone"
        opener
        labelledBy="events-upcoming"
        className={`events-plate${featured ? ' has-events' : ' is-empty'}`}
      >
        <h2 className="visually-hidden" id="events-upcoming">
          {t.events.upcoming}
        </h2>
        {usedCategories.length > 1 && (
          <div className="event-filters" role="group" aria-label={t.events.filterLabel}>
            <button type="button" className="event-filters__btn" aria-pressed={category === null} onClick={() => choose(null)}>
              {t.events.all}
            </button>
            {usedCategories.map((c) => (
              <button key={c} type="button" className="event-filters__btn" aria-pressed={category === c} onClick={() => choose(c)}>
                {t.events.categories[c]}
              </button>
            ))}
          </div>
        )}

        {usedCategories.length > 1 && (
          <p className="visually-hidden" role="status">
            {(category ? t.events.categories[category] : t.events.all) + ' · ' + t.events.countLabel.replace('{n}', String(featured ? upcoming.length + 1 : 0))}
          </p>
        )}
        {featured ? (
          <>
            <FeaturedEventPlate event={featured} kicker={t.events.featured} />
            {upcoming.length > 0 && (
              <div className="event-list events-plate__list">
                {upcoming.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </div>
            )}
          </>
        ) : hasAnyUpcoming ? (
          <div className="events-filtered-empty">
            <p className="t-h3 events-filtered-empty__text">{t.events.emptyFiltered}</p>
            <button type="button" className="arrow-link events-filtered-empty__reset" onClick={() => choose(null, true)}>
              {t.events.showAllCategories}
            </button>
          </div>
        ) : (
          <EventsEmpty />
        )}
      </Section>

      <Section label={t.events.howLabel} hideLabel labelledBy="events-how" className="events-how">
        <h2 className="t-h2 events-how__title" id="events-how">
          {t.events.howLabel}
        </h2>
        <ol role="list" className="steps">
          {t.events.how.map((s, i) => (
            <li key={s.title} className="steps__item">
              <span className="steps__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="t-h3">{s.title}</h3>
              <p className="steps__body">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label={t.events.typesLabel} hideLabel labelledBy="events-types" className="events-types">
        <div className="events-types__grid">
          <div className="events-types__head">
            <p className="t-label events-types__kicker">{t.events.typesLabel}</p>
            <h2 className="t-h2" id="events-types">
              {t.events.typesTitle}
            </h2>
          </div>
          <dl className="events-types__list">
            {t.events.types.map((ty) => (
              <div key={ty.title} className="events-types__item">
                <dt className="t-h3">{ty.title}</dt>
                <dd>{ty.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {past.length > 0 && (
        <Section label={t.events.past} hideLabel labelledBy="events-past" className="events-past">
          <h2 className="t-h3 events-past__title" id="events-past">
            {t.events.past}
          </h2>
          <div className="event-list">
            {past.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}
