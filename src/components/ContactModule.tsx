import { useI18n } from '../i18n'
import { SITE } from '../data/site'
import { CopyButton } from './CopyField'
import { FitLine } from './FitLine'
import { mailto } from './Links'
import './contact.css'

/**
 * GET IN TOUCH: WeChat ID + email, two actions each.
 *
 * `primary` picks the page's ONE filled action (BOARD_DECISION.md: one filled
 * button per view); the other actions stay quiet.
 * - Join: `primary="wechat"` + `feature` — the WeChat ID is the page's
 *   Full-Measure Line (FitLine ≥ 768 px; display size, wrapped, on phones) and
 *   "Copy WeChat ID" is the filled button.
 * - Contact: `primary="email"` — "Email CGSA" is the filled button.
 */
export function ContactModule({
  headingLevel = 2,
  primary = 'email',
  feature = false,
}: {
  headingLevel?: 2 | 3
  primary?: 'wechat' | 'email'
  feature?: boolean
}) {
  const { t } = useI18n()
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <div className={`contact-module contact-module--primary-${primary}${feature ? ' contact-module--feature' : ''}`}>
      <div className="contact-module__row contact-module__row--wechat">
        <H className="t-label contact-module__label">{t.join.wechatLabel}</H>
        {feature ? (
          <FitLine as="p" className="contact-module__value contact-module__fit">
            <span lang="en" translate="no">
              {SITE.wechatId}
            </span>
          </FitLine>
        ) : (
          <p className="contact-module__value" lang="en" translate="no">
            {SITE.wechatId}
          </p>
        )}
        <p className="contact-module__how t-small t-muted">{t.join.wechatHow}</p>
        <div className="contact-module__actions">
          <CopyButton value={SITE.wechatId} label={t.join.copyWechat} className="copy--wechat" />
        </div>
      </div>
      <div className="contact-module__row contact-module__row--email">
        <H className="t-label contact-module__label">{t.join.emailLabel}</H>
        <p className="contact-module__value contact-module__value--email" lang="en">
          <a href={mailto(SITE.email)} className="link">
            {SITE.email}
          </a>
        </p>
        <p className="contact-module__how t-small t-muted">{t.join.emailHow}</p>
        <div className="contact-module__actions">
          <a href={mailto(SITE.email)} className={`btn${primary === 'email' ? ' btn--block-sm' : ' btn--quiet'}`}>
            {t.join.emailCta}
          </a>
          <CopyButton value={SITE.email} label={t.join.copyEmail} />
        </div>
      </div>
    </div>
  )
}
