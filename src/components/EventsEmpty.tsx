import { useI18n } from '../i18n'
import { SITE } from '../data/site'
import { CopyButton } from './CopyField'
import './events.css'

/**
 * Designed empty state: honest, and points to where announcements happen.
 * The WeChat ID is set at H2 size and "Copy WeChat ID" is the page's filled button.
 */
export function EventsEmpty({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const { t } = useI18n()
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <div className="events-empty">
      <H className="t-h2 events-empty__title">{t.events.emptyTitle}</H>
      <p className="events-empty__body">{t.events.emptyBody}</p>
      <div className="events-empty__wechat">
        <p className="events-empty__line">
          <span className="t-label events-empty__label">{t.join.wechatLabel}</span>{' '}
          <span className="events-empty__id" translate="no" lang="en">
            {SITE.wechatId}
          </span>
        </p>
        <CopyButton value={SITE.wechatId} label={t.join.copyWechat} className="events-empty__copy" />
      </div>
    </div>
  )
}
