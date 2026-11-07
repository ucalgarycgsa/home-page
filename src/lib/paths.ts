/** Prefix public assets and internal URLs with the deployment directory. */
export function withBasePath(path: string, base = import.meta.env.BASE_URL): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  return base.replace(/\/$/, '') + path
}

/** Convert browser paths back to the route table's root-relative paths. */
export function withoutBasePath(path: string, base = import.meta.env.BASE_URL): string {
  const prefix = base.replace(/\/$/, '')
  if (prefix && path === prefix) return '/'
  if (prefix && path.startsWith(prefix + '/')) return path.slice(prefix.length)
  return path
}
