import { useI18n, isChinese } from '../i18n'
import { SITE } from '../data/site'
import { PageHeader, Section } from '../components/Section'
import { Headline } from '../components/Headline'
import { ArrowLink, mailto } from '../components/Links'
import { ContactModule } from '../components/ContactModule'
import './pages.css'
import './contact.css'

/**
 * Contact (Seat 6): no kicker (it repeated the H1) → WeChat + email, with
 * "Email CGSA" as the one filled action, clear of the bottom edge at 360×740 →
 * partnerships (paper; stone is reserved for the highlights) → urgent help.
 */
export function Contact() {
  const { t, lang } = useI18n()
  return (
    <div className="contact-page">
      <PageHeader
        title={
          <Headline
            as="h1"
            className={isChinese(lang) ? 't-title-l' : 't-h1'}
            id="page-title"
            tabIndex={-1}
            text={t.contact.title}
          />
        }
        lead={<p>{t.contact.intro}</p>}
      />

      <Section label={t.join.contactLabel} hideLabel labelledBy="contact-details" className="contact-details">
        <h2 className="visually-hidden" id="contact-details">
          {t.join.contactLabel}
        </h2>
        <ContactModule headingLevel={3} primary="email" />
      </Section>

      <Section id="partner" label={t.contact.partnerLabel} hideLabel labelledBy="contact-partner" className="contact-partner">
        <div className="contact-partner__grid">
          <Headline as="h2" id="contact-partner" className="t-h2 contact-partner__title" text={t.contact.partnerTitle} />
          <div className="contact-partner__text">
            <p className="section__body">{t.contact.partnerBody}</p>
            <div className="section__actions">
              <a className="btn btn--quiet" href={mailto(SITE.email, t.contact.partnerSubject)}>
                {t.contact.partnerCta}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section label={t.contact.urgentTitle} hideLabel labelledBy="contact-urgent" className="contact-urgent">
        <h2 className="t-h3" id="contact-urgent">
          {t.contact.urgentTitle}
        </h2>
        <p className="section__body contact-urgent__body">{t.contact.urgentBody}</p>
        <div className="section__actions">
          <ArrowLink to="/resources#contacts">{t.contact.urgentCta}</ArrowLink>
        </div>
      </Section>
    </div>
  )
}
