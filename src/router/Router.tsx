import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { normalizePath } from './routes'
import { withBasePath, withoutBasePath } from '../lib/paths'

interface Location {
  path: string
  hash: string
  /** Increments on every client-side navigation; 0 on first load. */
  navCount: number
}

interface RouterValue extends Location {
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterValue | null>(null)

function readLocation(navCount: number): Location {
  return {
    path: normalizePath(withoutBasePath(window.location.pathname)),
    hash: window.location.hash.slice(1),
    navCount,
  }
}

export function RouterProvider({
  initialPath,
  children,
}: {
  /** Supplied when rendering on the server (prerender). */
  initialPath?: string
  children: ReactNode
}) {
  const [loc, setLoc] = useState<Location>(() =>
    initialPath !== undefined
      ? { path: normalizePath(initialPath), hash: '', navCount: 0 }
      : readLocation(0),
  )

  useEffect(() => {
    const onPop = () => setLoc((prev) => readLocation(prev.navCount + 1))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    const url = new URL(withBasePath(to), window.location.href)
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href)
      return
    }
    const next = url.pathname + url.search + url.hash
    const current = window.location.pathname + window.location.search + window.location.hash
    if (next !== current) window.history.pushState(null, '', next)
    setLoc((prev) => readLocation(prev.navCount + 1))
  }, [])

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider')
  return ctx
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }

/** Internal link: client-side navigation, real href for crawlers and no-JS. */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate, path } = useRouter()
  const targetPath = normalizePath(to)
  const isCurrent = targetPath === path && !to.includes('#')

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === '_blank'
    )
      return
    e.preventDefault()
    navigate(to)
  }

  return (
    <a href={withBasePath(to)} onClick={handleClick} aria-current={isCurrent ? 'page' : undefined} {...rest}>
      {children}
    </a>
  )
}
