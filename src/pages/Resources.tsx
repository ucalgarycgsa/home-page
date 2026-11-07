import { useI18n, isChinese } from '../i18n'
import { SITE } from '../data/site'
import { RESOURCE_GROUPS, IMPORTANT_PHONES } from '../data/resources'
import { PageHeader } from '../components/Section'
import { Headline } from '../components/Headline'
import { ArrowLink, mailto } from '../components/Links'
import './pages.css'
import './resources.css'

/**
 * Resources (Art Direction phase, phone-first):
 * header (title, lead, jump index) → emergency numbers (moved up from group 06:
 * on a phone the tap-to-call numbers are the most useful thing here) → six groups
 * on paper, each opened by its numbered title (the same words and numbers as the
 * jump index), with compact link rows → footnote.
 */
export function Resources() {
  const { t, pick, lang } = useI18n()
  const num = (i: number) => String(i + 1).padStart(2, '0')
  return (
    <div className="res-page">
      <PageHeader
        title={
          <Headline
            as="h1"
            className={isChinese(lang) ? 't-title-l' : 't-h1'}
            id="page-title"
            tabIndex={-1}
            text={t.resources.title}
          />
        }
        lead={<p>{t.resources.intro}</p>}
      >
        <nav className="jump" aria-label={t.resources.jump}>
          <ol role="list" className="jump__list">
            {RESOURCE_GROUPS.map((g, i) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="jump__link">
                  <span className="jump__num" aria-hidden="true">
                    {num(i)}
                  </span>
                  {t.resources.groups[g.id].title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHeader>

      {/* Emergency numbers: formerly inside group 06, and the page-header "911 line". */}
      <section className="section tone-paper res-emergency" aria-labelledby="res-emergency">
        <div className="container">
          <div className="phones">
            <h2 className="t-h3 phones__title" id="res-emergency">
              <span className="phones__dot" aria-hidden="true" />
              {t.resources.emergencyTitle}
            </h2>
            <p className="phones__body">{t.resources.emergencyBody}</p>
            <dl className="phones__list">
              {IMPORTANT_PHONES.map((p) => (
                <div key={p.key}>
                  <dt>{t.resources.phones[p.key]}</dt>
                  <dd>
                    <a href={`tel:${p.tel}`} className="phones__num">
                      {p.display}
                    </a>
                    <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="t-caption link phones__source">
                      {t.common.source}
                      <span className="visually-hidden"> {t.common.opensInNewTab}</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="phones__more">
              <a href="#contacts" className="arrow-link">
                {t.resources.groups.contacts.title}
                <span className="arrow-link__arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </p>
          </div>
        </div>
      </section>

      {RESOURCE_GROUPS.map((g, i) => (
        <section key={g.id} id={g.id} className="section tone-paper res-group" aria-labelledby={`res-${g.id}`}>
          <div className="container res-group__inner">
            <div className="res-group__head">
              <h2 className="t-h2 res-group__title" id={`res-${g.id}`}>
                <span className="res-group__num" aria-hidden="true">
                  {num(i)}
                </span>
                {t.resources.groups[g.id].title}
              </h2>
              <Headline as="p" className="res-group__intro" text={t.resources.groups[g.id].intro} />
            </div>

            <ul role="list" className="res-links">
              {g.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="res-links__item">
                    <span className="res-links__title">{pick(l.titleEN, l.titleZH, l.titleHant)}</span>
                    <span className="res-links__note">{pick(l.noteEN, l.noteZH, l.noteHant)}</span>
                    <span className="res-links__source">{pick(l.sourceEN, l.sourceZH, l.sourceHant)}</span>
                    <span className="res-links__arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="visually-hidden"> {t.common.opensInNewTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section tone-paper res-footnote-wrap">
        <div className="container">
          <div className="res-footnote">
            <p className="t-caption">{t.resources.checked}</p>
            <ArrowLink to={mailto(SITE.email, 'Broken link — CGSA resources')}>{t.resources.reportLink}</ArrowLink>
          </div>
        </div>
      </section>
    </div>
  )
}
