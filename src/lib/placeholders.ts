/**
 * Placeholder gate. Layout samples (events, team roles, photos) are visible in
 * `npm run dev` and in `npm run preview:samples`, and are stripped from the
 * production build (`npm run build`). scripts/prerender.mjs also fails the
 * production build if any element marked data-placeholder reaches the HTML.
 */
export function showPlaceholders(): boolean {
  return import.meta.env.DEV === true || import.meta.env.VITE_SHOW_PLACEHOLDERS === 'true'
}

export function visible<T extends { placeholder?: true }>(items: readonly T[]): T[] {
  const show = showPlaceholders()
  return items.filter((item) => show || !item.placeholder)
}
