import { useEffect, type ComponentType } from 'react'
import { LanguageProvider, useI18n, plain } from './i18n'
import { RouterProvider, useRouter } from './router/Router'
import { matchRoute, type RouteKey } from './router/routes'
import type { Lang } from './types/content'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Events } from './pages/Events'
import { Benefits } from './pages/Benefits'
import { Resources } from './pages/Resources'
import { About } from './pages/About'
import { Team } from './pages/Team'
import { Join } from './pages/Join'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import { withBasePath } from './lib/paths'

const PAGES: Record<RouteKey, ComponentType> = {
  home: Home,
  events: Events,
  benefits: Benefits,
  resources: Resources,
  about: About,
  team: Team,
  join: Join,
  contact: Contact,
  notFound: NotFound,
}

export function App({ initialLang, initialPath }: { initialLang: Lang; initialPath?: string }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <RouterProvider initialPath={initialPath}>
        <Shell />
      </RouterProvider>
    </LanguageProvider>
  )
}

function Shell() {
  const { path } = useRouter()
  const { t } = useI18n()
  const key = matchRoute(path)
  const Page = PAGES[key]
  return (
    <>
      <a href="#main" className="skip-link">
        {t.common.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Page key={path} />
      </main>
      <Footer />
      <RouteEffects routeKey={key} />
    </>
  )
}

/** Title per route and language; scroll + focus management on client navigation. */
function RouteEffects({ routeKey }: { routeKey: RouteKey }) {
  const { t, lang } = useI18n()
  const { path, hash, navCount } = useRouter()

  useEffect(() => {
    document.title = plain(t.meta[routeKey].title)
    const desc = document.querySelector('meta[name="description"]')
    desc?.setAttribute('content', plain(t.meta[routeKey].description))
  }, [t, routeKey])

  // Canonical (present only when SITE_URL was set at build time): follow client
  // navigation, and self-reference the ?lang= variant while the URL carries one,
  // so it agrees with the hreflang alternates written by scripts/prerender.mjs.
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) return
    const url = new URL(link.href)
    url.pathname = withBasePath(path === '/' ? '/' : `${path}/`)
    url.search = new URLSearchParams(window.location.search).has('lang') ? `?lang=${lang}` : ''
    url.hash = ''
    link.href = url.toString()
  }, [path, lang])

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists.
      requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash))
        if (target) {
          target.scrollIntoView()
          if (navCount > 0) {
            target.setAttribute('tabindex', '-1')
            target.focus({ preventScroll: true })
          }
        }
      })
      return
    }
    if (navCount === 0) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const heading = document.getElementById('page-title') ?? document.getElementById('main')
    heading?.focus({ preventScroll: true })
  }, [path, hash, navCount])

  return null
}
