import { Link } from '../router/Router'
import { isChinese, useI18n } from '../i18n'
import { SITE } from '../data/site'
import { Seal } from './Logo'
import { ExternalLink } from './Links'
import './footer.css'

const EXPLORE = [
  { to: '/events', key: 'events' },
  { to: '/benefits', key: 'benefits' },
  { to: '/resources', key: 'resources' },
  { to: '/about', key: 'about' },
  { to: '/team', key: 'team' },
  { to: '/join', key: 'join' },
  { to: '/contact', key: 'contact' },
] as const

export function Footer() {
  const { t, lang } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid site-footer__top">
          <div className="site-footer__brand">
            <div className="site-footer__id">
              <Seal size={88} decorative className="site-footer__seal" />
              <p className={`site-footer__name${isChinese(lang) ? ' is-zh-first' : ''}`}>
                <span lang="en" className="site-footer__name-en">
                  {SITE.nameEN.replace("'", '’')}
                </span>
                {lang === 'zh-Hant' ? (
                  <span lang="zh-Hant" className="site-footer__name-zh">
                    {/* Break only between 卡爾加里大學 and 中國研究生協會 */}
                    <span className="seg-keep">卡爾加里大學</span>
                    <span className="seg-keep">中國研究生協會</span>
                  </span>
                ) : (
                  <span lang="zh-Hans" className="site-footer__name-zh">
                    {/* Break only between 卡尔加里大学 and 中国研究生协会 */}
                    <span className="seg-keep">卡尔加里大学</span>
                    <span className="seg-keep">中国研究生协会</span>
                  </span>
                )}
              </p>
            </div>
            <p className="site-footer__closing">{t.footer.closing}</p>
          </div>

          <nav className="site-footer__col site-footer__col--explore" aria-label={t.nav.footerLabel}>
            <p className="t-label t-muted site-footer__head">{t.footer.exploreLabel}</p>
            <ul role="list" className="site-footer__links">
              {EXPLORE.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{t.nav[item.key]}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <p className="t-label t-muted site-footer__head">{t.footer.contactLabel}</p>
            <dl className="site-footer__contact">
              <div>
                <dt>{t.join.wechatLabel}</dt>
                <dd translate="no">{SITE.wechatId}</dd>
              </div>
              <div>
                <dt>{t.join.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt>{t.nav.benefits}</dt>
                <dd>
                  <ExternalLink href={SITE.benefitsUrl}>{t.footer.benefitsLink} </ExternalLink>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="site-footer__base">
          <p className="site-footer__disclaimer">{t.footer.disclaimer}</p>
          <p className="site-footer__rights">
            © {year} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
