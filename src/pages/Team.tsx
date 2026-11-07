import { useI18n } from '../i18n'
import { Link } from '../router/Router'
import { SITE } from '../data/site'
import { TEAM } from '../data/team'
import { visible } from '../lib/placeholders'
import { PageHeader, Section } from '../components/Section'
import { Headline } from '../components/Headline'
import { ArrowLink, ExternalLink, mailto } from '../components/Links'
import './pages.css'
import './team.css'

/**
 * Team (Seat 6).
 * - Production (no profiles yet): the recruiting statement fills the first screen,
 *   with "Ways to join" as the one filled action, so the page is not a short note
 *   above a footer.
 * - With profiles: the same filled action sits in the header (moved up from the
 *   closing section, which keeps a quiet link), then the portraits.
 */
export function Team() {
  const { t, pick } = useI18n()
  const members = visible(TEAM)
  const empty = members.length === 0
  return (
    <div className={`team-page${empty ? ' team-page--empty' : ''}`}>
      <PageHeader
        label={t.team.label}
        title={
          <Headline as="h1" className="t-h1" id="page-title" tabIndex={-1} text={empty ? t.team.emptyPageTitle : t.team.title} />
        }
        lead={<p>{empty ? t.team.emptyPageIntro : t.team.intro}</p>}
      >
        <div className="page-header__actions">
          <Link to="/join" className="btn btn--block-sm">
            {t.team.joinCta}
          </Link>
          {empty && <ArrowLink to={mailto(SITE.email, t.join.mailSubjectExec)}>{SITE.email}</ArrowLink>}
        </div>
      </PageHeader>

      {!empty && (
        <Section label={t.team.label} hideLabel labelledBy="team-list" className="team-list">
          <h2 className="visually-hidden" id="team-list">
            {t.team.label}
          </h2>
          <ul role="list" className="team-grid">
            {members.map((m, i) => (
              <li key={`${m.roleEN}-${i}`} className="team-card" data-placeholder={m.placeholder ? '' : undefined}>
                <div className="team-card__photo">
                  {m.photo ? (
                    <img src={m.photo} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span className="team-card__ph">
                      {m.placeholder && <span className="sample-tag">{t.common.sample}</span>}
                    </span>
                  )}
                </div>
                <p className="t-label t-muted team-card__role">{pick(m.roleEN, m.roleZH, m.roleHant)}</p>
                <h3 className="t-h3 team-card__name">{m.name}</h3>
                <p className="t-small team-card__bio">{pick(m.bioEN, m.bioZH, m.bioHant)}</p>
                {(m.linkedin || m.email) && (
                  <p className="team-card__links">
                    {m.linkedin && (
                      <ExternalLink href={m.linkedin} className="link">
                        {t.team.linkedin}{' '}
                      </ExternalLink>
                    )}
                    {m.email && (
                      <a href={mailto(m.email)} className="link">
                        {t.team.email}
                      </a>
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {!empty && (
        <Section label={t.nav.join} hideLabel labelledBy="team-join" className="team-join">
          <h2 className="t-h2 section__title" id="team-join">
            {t.team.joinTitle}
          </h2>
          <p className="section__body">{t.team.joinBody}</p>
          <div className="section__actions">
            <ArrowLink to="/join">{t.team.joinCta}</ArrowLink>
          </div>
        </Section>
      )}
    </div>
  )
}
