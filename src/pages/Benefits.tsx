import { Fragment } from 'react'
import { useI18n } from '../i18n'
import { SITE } from '../data/site'
import { PageHeader, Section } from '../components/Section'
import { Headline } from '../components/Headline'
import { FitLine } from '../components/FitLine'
import { ArrowLink, ExternalLink, mailto } from '../components/Links'
import './pages.css'
import './benefits.css'

/**
 * The page promise is the page's one Full-Measure Line. Chinese titles carry "|"
 * phrase marks (Headline handles them and the final 。); the English title is two
 * sentences, marked up as two phrases so phones set one per line. Text is unchanged.
 */
function PromiseTitle({ text }: { text: string }) {
  if (text.includes('|') || text.endsWith('。')) return <Headline as="span" text={text} />
  const phrases = text.split(/(?<=\.) /)
  return (
    <>
      {phrases.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="benefits-title__phrase">{p}</span>
        </Fragment>
      ))}
    </>
  )
}

export function Benefits() {
  const { t } = useI18n()
  // The museum label: Valid first (seat 8: the dates are a fact to check, not the pitch),
  // then Program, Open to, Format. Same strings as the home Benefits plate, reordered.
  const f = t.home.benefits.facts
  const facts = [f[1], f[0], ...f.slice(2)].filter((x): x is (typeof f)[number] => Boolean(x))

  return (
    <div className="benefits-page">
      <PageHeader
        label={t.benefits.label}
        title={
          <FitLine as="h1" id="page-title" tabIndex={-1} className="t-display benefits-title">
            <PromiseTitle text={t.benefits.title} />
          </FitLine>
        }
        lead={<p>{t.benefits.intro}</p>}
      >
        <div className="page-header__actions benefits-actions">
          <ExternalLink href={SITE.benefitsUrl} className="btn btn--block-sm">
            {t.benefits.cta}{' '}
          </ExternalLink>
          <p className="t-caption page-header__note">{t.benefits.ctaNote}</p>
        </div>
      </PageHeader>

      <Section label={t.benefits.whatLabel} tone="stone" opener labelledBy="b-what" className="benefits-plate">
        <div className="benefits-plate__grid">
          <div className="benefits-plate__text">
            <Headline as="h2" id="b-what" className="t-h2 benefits-plate__title" text={t.benefits.whatTitle} />
            <p className="benefits-plate__body">{t.benefits.whatBody}</p>
          </div>
          <dl className="pass-label">
            {facts.map((x) => (
              <div key={x.k} className="pass-label__row">
                <dt className="t-label pass-label__k">{x.k}</dt>
                <dd className="pass-label__v">{x.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section label={t.benefits.whoLabel} labelledBy="b-who" className="benefits-who">
        <div className="benefits-split">
          <h2 className="t-h2 benefits-split__title" id="b-who">
            {t.benefits.whoTitle}
          </h2>
          <ul role="list" className="ruled-list benefits-split__list">
            {t.benefits.who.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section label={t.benefits.howLabel} hideLabel labelledBy="b-how" className="benefits-how">
        <h2 className="t-h2 benefits-how__title" id="b-how">
          {t.benefits.howLabel}
        </h2>
        <ol role="list" className="steps">
          {t.benefits.how.map((s, i) => (
            <li key={s.title} className="steps__item">
              <span className="steps__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="t-h3">{s.title}</h3>
              <p className="steps__body">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="section__actions benefits-how__actions">
          <ExternalLink href={SITE.benefitsUrl} className="btn btn--block-sm">
            {t.benefits.cta}{' '}
          </ExternalLink>
        </div>
        <aside className="aside-note benefits-questions" aria-labelledby="b-questions">
          <h2 className="aside-note__title benefits-questions__title" id="b-questions">
            {t.benefits.questions}
          </h2>
          <p className="t-muted">{t.benefits.questionsBody}</p>
          <div className="aside-note__links">
            <ArrowLink to={mailto(SITE.email)}>{SITE.email}</ArrowLink>
            <ArrowLink to="/contact">{t.nav.contact}</ArrowLink>
          </div>
        </aside>
      </Section>
    </div>
  )
}
