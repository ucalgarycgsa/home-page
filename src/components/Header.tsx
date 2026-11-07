import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '../router/Router'
import { chineseName, useI18n } from '../i18n'
import { SITE } from '../data/site'
import { Seal } from './Logo'
import { LanguageSwitch } from './LanguageSwitch'
import './header.css'

const PRIMARY = [
  { to: '/', key: 'home' },
  { to: '/events', key: 'events' },
  { to: '/benefits', key: 'benefits' },
  { to: '/resources', key: 'resources' },
  { to: '/about', key: 'about' },
] as const

const MOBILE = [
  { to: '/', key: 'home' },
  { to: '/events', key: 'events' },
  { to: '/benefits', key: 'benefits' },
  { to: '/resources', key: 'resources' },
  { to: '/about', key: 'about' },
  { to: '/team', key: 'team' },
  { to: '/join', key: 'join' },
  { to: '/contact', key: 'contact' },
] as const

export function Header() {
  const { t, lang } = useI18n()
  const zhName = chineseName(lang)
  const { path } = useRouter()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(path)
  const menuButton = useRef<HTMLButtonElement>(null)
  // Stable identity, so the menu's setup effect runs once per open (not on every
  // re-render, e.g. when the language changes inside the menu).
  const closeMenu = useCallback(() => {
    setOpen(false)
    // Wait for the dialog to unmount (and `inert` to clear) before refocusing.
    requestAnimationFrame(() => menuButton.current?.focus())
  }, [])

  // Close the menu whenever the route changes.
  if (path !== lastPath) {
    setLastPath(path)
    if (open) setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link to="/" className="brand" aria-label={lang === 'en' ? t.nav.homeLink : `${zhName.text} · ${t.nav.homeLink}`}>
          <Seal size={44} decorative className="brand__seal" />
          <span className="brand__text" aria-hidden="true">
            <span className="brand__name">{SITE.shortName}</span>
            <span className="brand__zh" lang={zhName.lang}>
              {zhName.text}
            </span>
          </span>
        </Link>

        <nav className="site-nav" aria-label={t.nav.primaryLabel}>
          <ul role="list" className="site-nav__list">
            {PRIMARY.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={`site-nav__link${path === item.to ? ' is-active' : ''}`}>
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/join" className={`site-nav__join${path === '/join' ? ' is-active' : ''}`}>
            {t.nav.join}
            {/* No-break space inside the arrow span so the active underline runs unbroken (Gate 4, m7). */}
            <span aria-hidden="true">{'\u00a0→'}</span>
          </Link>
        </nav>

        <LanguageSwitch className="site-header__lang" />

        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls={open ? 'mobile-menu' : undefined}
          onClick={() => setOpen(true)}
        >
          <span className="menu-toggle__icon" aria-hidden="true" />
          <span>{t.nav.menu}</span>
        </button>
      </div>

      {open && (
        <MobileMenu path={path} onClose={closeMenu} />
      )}
    </header>
  )
}

function MobileMenu({ path, onClose }: { path: string; onClose: () => void }) {
  const { t, lang } = useI18n()
  const zhName = chineseName(lang)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = panel.current
    if (!el) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Everything behind the dialog becomes inert (not focusable, not read).
    const behind = Array.from(
      document.querySelectorAll<HTMLElement>('.skip-link, .site-header__bar, #main, .site-footer'),
    )
    behind.forEach((node) => node.setAttribute('inert', ''))
    el.querySelector<HTMLElement>('.mobile-menu__close')?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !el) return
      const focusable = Array.from(
        el.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      behind.forEach((node) => node.removeAttribute('inert'))
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="mobile-menu"
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menu}
      ref={panel}
    >
      <div className="container mobile-menu__top">
        <Link
          to="/"
          className="brand"
          aria-label={lang === 'en' ? t.nav.homeLink : `${zhName.text} · ${t.nav.homeLink}`}
          onClick={() => {
            if (path === '/') onClose()
          }}
        >
          <Seal size={40} decorative className="brand__seal" />
          <span className="brand__text" aria-hidden="true">
            <span className="brand__name">{SITE.shortName}</span>
            <span className="brand__zh" lang={zhName.lang}>
              {zhName.text}
            </span>
          </span>
        </Link>
        <button type="button" className="menu-toggle mobile-menu__close" onClick={onClose}>
          <span className="menu-toggle__icon is-close" aria-hidden="true" />
          <span>{t.nav.close}</span>
        </button>
      </div>
      <div className="container mobile-menu__lang">
        <p className="t-label t-muted">{t.nav.languageLabel}</p>
        <LanguageSwitch className="lang-switch--large" />
      </div>
      <nav className="container mobile-menu__nav" aria-label={t.nav.primaryLabel}>
        <ul role="list" className="mobile-menu__list">
          {MOBILE.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`mobile-menu__link${path === item.to ? ' is-active' : ''}`}
                onClick={() => {
                  if (path === item.to) onClose()
                }}
              >
                {t.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container mobile-menu__foot">
        <dl className="mobile-menu__contact">
          <div>
            <dt className="t-label t-muted">{t.join.wechatLabel}</dt>
            <dd translate="no">{SITE.wechatId}</dd>
          </div>
          <div>
            <dt className="t-label t-muted">{t.join.emailLabel}</dt>
            <dd>
              <a href={`mailto:${SITE.email}`} className="link mobile-menu__email">
                {SITE.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
