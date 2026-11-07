import { useI18n } from '../i18n'
import { SITE } from '../data/site'
import { Link } from '../router/Router'
import { PageHeader, Section } from '../components/Section'
import { Headline } from '../components/Headline'
import { ArrowLink } from '../components/Links'
import { Seal } from '../components/Logo'
import { TEAM } from '../data/team'
import { visible } from '../lib/placeholders'
import './pages.css'
import './about.css'

const GSA_GROUPS_URL = 'https://gsa.ucalgary.ca/graduatestudentgroups/'

/**
 * About (Seat 6): H1 + the page's one filled action ("Join CGSA", the same link the
 * team section already offered) → the seal at display size beside the mission line
 * (the quiet hero, on paper: stone is reserved for Events/Benefits) → working
 * together + who we are as two narrow columns from 1024 px → the team line.
 */
export function About() {
  const { t } = useI18n()
  const hasTeam = visible(TEAM).length > 0
  return (
    <div className="about-page">
      <PageHeader
        label={t.about.label}
        title={<Headline as="h1" className="t-h1" id="page-title" tabIndex={-1} text={t.about.title} />}
      >
        <div className="page-header__actions">
          <Link to="/join" className="btn btn--block-sm">
            {t.nav.join}
          </Link>
        </div>
      </PageHeader>

      <section className="section tone-paper about-mission" aria-labelledby="about-mission">
        <div className="container about-mission__grid">
          <div className="about-mission__seal">
            <Seal size={220} decorative />
          </div>
          <div className="about-mission__text">
            <Headline as="h2" id="about-mission" className="t-h2 about-mission__lead" text={t.about.lead} />
            <p className="t-body-l about-mission__body">{t.about.body}</p>
          </div>
        </div>
      </section>

      <section className="section tone-paper about-facts">
        <div className="container about-facts__grid">
          <div className="about-facts__col">
            <h2 className="t-h3 about-facts__title" id="about-work">
              {t.about.workLabel}
            </h2>
            <p className="about-facts__body">{t.about.workBody}</p>
            <div className="section__actions">
              <ArrowLink to="/benefits">{t.about.workCta}</ArrowLink>
            </div>
          </div>
          <div className="about-facts__col">
            <h2 className="t-h3 about-facts__title" id="about-who">
              {t.about.whoLabel}
            </h2>
            <p className="about-facts__body">{t.about.whoBody}</p>
            <p className="t-small t-muted about-who__note">{t.about.whoNote}</p>
            <div className="section__actions about-facts__links">
              <ArrowLink to={GSA_GROUPS_URL}>{t.about.gsaLink}</ArrowLink>
              <ArrowLink to={SITE.wechatArticleUrl}>{t.about.wechatLink}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <Section label={t.about.teamLabel} labelledBy="about-team" className="about-team">
        <h2 className="t-h2 about-team__title" id="about-team">
          {t.about.teamBody}
        </h2>
        <div className="section__actions">
          {hasTeam && <ArrowLink to="/team">{t.about.teamCta}</ArrowLink>}
          <ArrowLink to="/join">{t.nav.join}</ArrowLink>
        </div>
      </Section>
    </div>
  )
}
