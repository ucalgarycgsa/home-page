import { useI18n } from '../i18n'
import { SITE } from '../data/site'
import { PageHeader, Section } from '../components/Section'
import { Headline } from '../components/Headline'
import { ArrowLink, mailto } from '../components/Links'
import { ContactModule } from '../components/ContactModule'
import './pages.css'
import './join.css'

/**
 * Join (Seat 6): "Start with hello." → the WeChat ID as the page's Full-Measure Line
 * (≥ 768 px; display size on phones) with "Copy WeChat ID" as the one filled button,
 * then email (quiet) → four ways in (no numeral column on phones).
 */
export function Join() {
  const { t } = useI18n()
  const targets = [
    '/events',
    mailto(SITE.email, t.join.mailSubjectVolunteer),
    mailto(SITE.email, t.join.mailSubjectExec),
    '/contact#partner',
  ]
  return (
    <div className="join-page">
      <PageHeader
        label={t.join.label}
        title={<Headline as="h1" className="t-h1" id="page-title" tabIndex={-1} text={t.join.title} />}
        lead={<p>{t.join.intro}</p>}
      />

      <Section label={t.join.contactLabel} hideLabel labelledBy="join-contact" className="join-contact">
        <h2 className="visually-hidden" id="join-contact">
          {t.join.contactLabel}
        </h2>
        <ContactModule headingLevel={3} primary="wechat" feature />
      </Section>

      <Section label={t.join.waysLabel} hideLabel labelledBy="join-ways" className="join-ways">
        <h2 className="t-h3 join-ways__heading" id="join-ways">
          {t.join.waysLabel}
        </h2>
        <ol role="list" className="ways">
          {t.join.ways.map((w, i) => (
            <li key={w.title} className="ways__item">
              <span className="ways__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="t-h2 ways__title">{w.title}</h3>
              <p className="ways__body">{w.body}</p>
              <div className="ways__cta">
                <ArrowLink to={targets[i] ?? '/contact'}>{w.cta}</ArrowLink>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  )
}
