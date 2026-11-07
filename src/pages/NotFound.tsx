import { useI18n } from '../i18n'
import { Link } from '../router/Router'
import { PageHeader } from '../components/Section'
import { Headline } from '../components/Headline'
import { ArrowLink } from '../components/Links'
import './pages.css'
import './notfound.css'

/** 404 (Seat 6): calm. One filled way home, four quiet ways out. */
export function NotFound() {
  const { t } = useI18n()
  return (
    <div className="notfound-page">
      <PageHeader
        label={t.notFound.label}
        title={<Headline as="h1" className="t-h1" id="page-title" tabIndex={-1} text={t.notFound.title} />}
        lead={<p className="notfound-page__lead">{t.notFound.body}</p>}
      >
        <div className="page-header__actions notfound-page__home">
          <Link to="/" className="btn btn--block-sm">
            {t.common.backHome}
          </Link>
        </div>
        <ul role="list" className="notfound-links">
          <li><ArrowLink to="/events">{t.nav.events}</ArrowLink></li>
          <li><ArrowLink to="/benefits">{t.nav.benefits}</ArrowLink></li>
          <li><ArrowLink to="/resources">{t.nav.resources}</ArrowLink></li>
          <li><ArrowLink to="/join">{t.nav.join}</ArrowLink></li>
        </ul>
      </PageHeader>
    </div>
  )
}
