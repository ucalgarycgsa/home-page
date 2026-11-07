import { Link } from '../router/Router'
import { isChinese, useI18n } from '../i18n'
import { SITE } from '../data/site'
import { EVENTS } from '../data/events'
import { PARTNERS } from '../data/partners'
import { bucketEvents } from '../lib/events'
import { visible } from '../lib/placeholders'
import { Section } from '../components/Section'
import { Headline } from '../components/Headline'
import { FitLine } from '../components/FitLine'
import { ArrowLink, ExternalLink } from '../components/Links'
import { EventCta } from '../components/Events'
import { LivingGeometry } from '../components/LivingGeometry'
import { dateParts, timeRange } from '../lib/dates'
import { displayStatus } from '../lib/events'
import type { CgsaEvent } from '../types/content'
import { CopyButton } from '../components/CopyField'
import { ImageSlot } from '../components/ImageSlot'
import './home.css'

const HERO_INDEX = ['/events', '/benefits', '/resources', '/join'] as const
const RESOURCE_ORDER = ['new', 'academic', 'career', 'life', 'community', 'contacts'] as const

export function Home() {
  const { t, lang, pick } = useI18n()
  const { featured } = bucketEvents(EVENTS)
  const partners = visible(PARTNERS)
  const zh = isChinese(lang)
  // The motto's echo is in the other language: English on Chinese pages, 简体 on English pages.
  const otherLang = zh ? 'en' : 'zh-Hans'
  const eyebrowParts = t.hero.eyebrow.split(' · ')

  return (
    <>
      {/* ── Beat 1 · Hero: the Full-Measure motto, one sentence + one button + one link, the living geometry ── */}
      <section className="hero" aria-labelledby="page-title">
        <div className="container hero__grid">
          {/* In Chinese the eyebrow only repeats the header lockup, so it is English-only. */}
          {!zh && (
            <p className="t-label hero__eyebrow">
              {eyebrowParts.map((part, i) => (
                <span key={part} className={i > 0 ? 'hero__eyebrow-extra' : undefined}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  {part}
                </span>
              ))}
            </p>
          )}

          <FitLine as="h1" id="page-title" tabIndex={-1} className="hero__motto" fromWidth={0}>
            {t.hero.words.map((word, i) => (
              <span className="hero__word" key={word}>
                {word}
                {zh ? (
                  <>
                    {/* The real 。 stays for screen readers and copying; the ring is drawn so it is identical on every OS. */}
                    <span className="visually-hidden">{t.hero.stop}</span>
                    <span className="hero__ring" aria-hidden="true" />
                  </>
                ) : (
                  <span className="hero__stop">{t.hero.stop}</span>
                )}
                {!zh && i < t.hero.words.length - 1 && ' '}
              </span>
            ))}
          </FitLine>

          <p className="hero__alt" lang={otherLang}>
            {t.hero.altLine}
          </p>

          <LivingGeometry className="hero__geo" />

          <Headline as="p" className="t-body-l hero__intro" text={t.hero.intro} />

          {/* One button + one text link, the same in every state: events live in the
              feature directly below, so the sub-hero doesn't repeat them (critic M5). */}
          <div className="hero__ctas">
            <Link to="/join" className="btn btn--block-sm">
              {t.hero.ctaSecondary}
            </Link>
            <ArrowLink to="/benefits">{t.hero.index[1]?.title ?? t.nav.benefits}</ArrowLink>
          </div>
        </div>
      </section>

      {/* ── Beat 2 · The editorial feature: the next event (or the honest empty state), on the page ground ── */}
      <section className="container feature" aria-labelledby="home-events">
        <div className="feature__grid">
          <p className="t-label feature__label">{t.home.events.label}</p>
          <h2 className="visually-hidden" id="home-events">
            {t.home.events.title}
          </h2>
          {featured ? <FeatureEvent event={featured} /> : (
            <div className="feature__body feature__body--empty">
              <p className="feature__empty-text">{t.events.homeEmpty}</p>
              <p className="feature__meta">
                <span className="feature__meta-label">{t.join.wechatLabel}</span>{' '}
                <span translate="no" lang="en">
                  {SITE.wechatId}
                </span>
              </p>
              <ArrowLink to="/events">{t.home.events.all}</ArrowLink>
            </div>
          )}
        </div>
      </section>

      {/* ── Beat 3 · The four pillars: Events, Benefits, Resources, Join one tap away ── */}
      <nav className="container hero-index" aria-label={t.hero.indexLabel}>
        <ul role="list" className="hero-index__list">
          {t.hero.index.map((item, i) => (
            <li key={item.title}>
              <Link to={HERO_INDEX[i] ?? '/'} className="hero-index__item">
                <span className="hero-index__title">{item.title}</span>
                <span className="hero-index__note">{item.note}</span>
                <span className="hero-index__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Member benefits: the highlight plate (stone, 3px opener) ── */}
      <Section label={t.home.benefits.label} hideLabel labelledBy="home-benefits" className="benefits-plate">
        <div className="benefits-plate__grid">
          <div className="benefits-plate__main">
            <Headline as="h2" id="home-benefits" className="t-h1 benefits-plate__title" text={t.home.benefits.title} />
            <p className="section__body">{t.home.benefits.body}</p>
            <div className="section__actions">
              <ExternalLink href={SITE.benefitsUrl} className="btn btn--block-sm">
                {t.home.benefits.cta}{' '}
              </ExternalLink>
              <ArrowLink to="/benefits">{t.home.benefits.secondary}</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ── What we do: a narrow strip, heading beside the four items ── */}
      <Section label={t.home.pillars.label} hideLabel labelledBy="home-pillars" className="pillars">
        <div className="pillars__grid">
          <Headline as="h2" id="home-pillars" className="t-h2 pillars__title" text={t.home.pillars.title} />
          <ul role="list" className="pillars__list">
            {t.home.pillars.items.map((p) => (
              <li className="pillars__item" key={p.title}>
                <h3 className="t-h3 pillars__item-title">{p.title}</h3>
                <p className="pillars__item-body">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Career & networking: narrow ── */}
      <Section label={t.home.career.label} labelledBy="home-career" className="career">
        <Headline as="h2" id="home-career" className="t-h2 section__title" text={t.home.career.title} />
        <p className="section__body">{t.home.career.body}</p>
        <div className="section__actions">
          <ArrowLink to="/events?category=career">{t.home.career.eventsLink}</ArrowLink>
          <ArrowLink to="/resources#career">{t.home.career.resourcesLink}</ArrowLink>
        </div>
      </Section>

      {/* ── Community & culture: the full-width statement ── */}
      <Section label={t.home.community.label} labelledBy="home-community" className="community">
        <div className="community__grid">
          <Headline as="h2" id="home-community" className="community__title" text={t.home.community.title} />
          <ImageSlot src={null} alt="" ratio="16 / 9" className="community__image" />
          <div className="community__text">
            <p className="section__body">{t.home.community.body}</p>
            <div className="section__actions">
              <ArrowLink to="/join">{t.home.community.cta}</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Resources: hairline index on paper ── */}
      <Section label={t.home.resources.label} labelledBy="home-resources" className="resources-teaser">
        <Headline as="h2" id="home-resources" className="t-h2 section__title" text={t.home.resources.title} />
        <p className="section__body">{t.home.resources.body}</p>
        <ul role="list" className="res-index">
          {RESOURCE_ORDER.map((id) => (
            <li key={id}>
              <Link to={`/resources#${id}`} className="res-index__item">
                <span className="res-index__title">{t.resources.groups[id].title}</span>
                <span className="res-index__intro">{t.resources.groups[id].intro.replaceAll('|', '')}</span>
                <span className="res-index__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Partners: the invitation ── */}
      <Section label={t.home.partners.label} labelledBy="home-partners" className="partners">
        {partners.length > 0 && (
          <ul role="list" className="partners__logos">
            {partners.map((p) => (
              <li key={p.name} data-placeholder={p.placeholder ? '' : undefined}>
                {p.logo ? <img src={p.logo} alt={p.name} /> : <span>{pick(p.name, p.nameZH ?? p.name, p.nameHant ?? p.name)}</span>}
              </li>
            ))}
          </ul>
        )}
        <div className="partners__invite">
          <Headline as="h2" id="home-partners" className="t-h3" text={t.home.partners.title} />
          <p className="partners__body">{t.home.partners.body}</p>
          <ArrowLink to="/contact#partner">{t.home.partners.cta}</ArrowLink>
        </div>
      </Section>

      {/* ── Join: the ink band ── */}
      <Section label={t.home.join.label} tone="ink" labelledBy="home-join" className="join-band">
        <div className="join-band__grid">
          <div className="join-band__main">
            <Headline as="h2" id="home-join" className="t-h1 join-band__title" text={t.home.join.title} />
            <p className="section__body">{t.home.join.body}</p>
            <div className="section__actions">
              <Link to="/join" className="btn btn--block-sm">
                {t.home.join.cta}
              </Link>
            </div>
          </div>
          <dl className="join-band__contact">
            <div>
              <dt className="t-label t-muted">{t.join.wechatLabel}</dt>
              <dd>
                <span className="join-band__value" translate="no">
                  {SITE.wechatId}
                </span>
                <CopyButton value={SITE.wechatId} label={t.join.copyWechat} />
              </dd>
            </div>
            <div>
              <dt className="t-label t-muted">{t.join.emailLabel}</dt>
              <dd>
                <a className="join-band__value link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                <CopyButton value={SITE.email} label={t.join.copyEmail} />
              </dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  )
}

/** The editorial feature: a frameless date block, category · status, title, time · venue, one text link. */
function FeatureEvent({ event }: { event: CgsaEvent }) {
  const { t, lang, pick } = useI18n()
  const d = dateParts(event.date, lang)
  const time = timeRange(event.startTime, event.endTime, lang)
  const status = displayStatus(event)
  const canRegister = Boolean(event.registrationUrl) && status !== 'FULL' && status !== 'COMPLETED'
  return (
    <>
      <time className="feature__date" dateTime={event.date}>
        <span className="visually-hidden">{d.long}</span>
        <span className="feature__date-month" aria-hidden="true">{d.month}</span>
        <span className="feature__date-day" aria-hidden="true">{d.day}</span>
        <span className="feature__date-weekday" aria-hidden="true">{d.weekday}</span>
      </time>
      <div className="feature__body">
        <p className="feature__tags" data-placeholder={event.placeholder ? '' : undefined}>
          {event.placeholder && <span className="sample-tag">{t.common.sample}</span>}
          <span>{t.events.categories[event.category]}</span>
          <span className={status === 'REGISTRATION OPEN' ? 'red-deep' : undefined}>{t.events.status[status]}</span>
        </p>
        <h3 className="t-h2 feature__title">{pick(event.titleEN, event.titleZH, event.titleHant)}</h3>
        <p className="feature__meta">
          {time ?? t.events.timeTBA}
          <span aria-hidden="true"> · </span>
          {event.venue || t.events.venueTBA}
        </p>
        {canRegister ? <EventCta event={event} compact /> : <ArrowLink to="/events">{t.home.events.all}</ArrowLink>}
      </div>
    </>
  )
}
