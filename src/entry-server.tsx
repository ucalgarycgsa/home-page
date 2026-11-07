import { renderToString } from 'react-dom/server'
import { App } from './App'
import { MESSAGES, plain } from './i18n'
import { ROUTES, matchRoute } from './router/routes'
import { SITE } from './data/site'

export { ROUTES }
export const BASE_PATH = import.meta.env.BASE_URL

export interface Rendered {
  html: string
  title: string
  description: string
}

/** Server render a route in English (default document language). */
export function render(path: string): Rendered {
  const key = matchRoute(path)
  const en = MESSAGES.en
  const meta = en.meta[key]
  const html = renderToString(<App initialLang="en" initialPath={path} />)
  return {
    html,
    title: plain(meta.title),
    description: `${plain(meta.description)} · ${SITE.nameZH}`,
  }
}
