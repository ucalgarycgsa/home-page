/** Route table (Lead-owned). `key` selects page meta in i18n `meta.*`. */
export const ROUTES = [
  { path: '/', key: 'home' },
  { path: '/events', key: 'events' },
  { path: '/benefits', key: 'benefits' },
  { path: '/resources', key: 'resources' },
  { path: '/about', key: 'about' },
  { path: '/team', key: 'team' },
  { path: '/join', key: 'join' },
  { path: '/contact', key: 'contact' },
] as const

export type RouteKey = (typeof ROUTES)[number]['key'] | 'notFound'

export function normalizePath(path: string): string {
  const clean = path.split(/[?#]/)[0] || '/'
  if (clean.length > 1 && clean.endsWith('/')) return clean.replace(/\/+$/, '') || '/'
  return clean
}

export function matchRoute(path: string): RouteKey {
  const p = normalizePath(path)
  return ROUTES.find((r) => r.path === p)?.key ?? 'notFound'
}
