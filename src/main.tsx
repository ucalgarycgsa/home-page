import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { applyDocumentLang, normalizeLang } from './i18n'
import './styles/fonts'
import './styles/tokens.css'
import './styles/base.css'

const root = document.documentElement
const initialLang = normalizeLang(root.dataset.lang) ?? 'en'
applyDocumentLang(initialLang) // also starts the 繁體 font chunk when needed

const container = document.getElementById('root')
if (container) {
  // The prerendered markup is for crawlers, link previews and no-JS visitors.
  // The client renders fresh (React replaces the markup on first commit) so the
  // visitor's language applies immediately.
  createRoot(container).render(
    <StrictMode>
      <App initialLang={initialLang} />
    </StrictMode>,
  )
  requestAnimationFrame(() => root.classList.remove('lang-pending'))
}
