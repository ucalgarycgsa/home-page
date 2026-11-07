import type { CgsaEvent, EventCategory } from '../types/content'
import { isPast, todayInCalgary } from './dates'
import { visible } from './placeholders'

export interface EventBuckets {
  /** The one event to feature: first featured upcoming event, else the next upcoming one. */
  featured: CgsaEvent | null
  /** Upcoming events, soonest first, excluding the featured one. */
  upcoming: CgsaEvent[]
  /** Past events, most recent first. */
  past: CgsaEvent[]
}

export function isEventPast(e: CgsaEvent, today: string): boolean {
  return e.status === 'COMPLETED' || isPast(e.date, today)
}

export function bucketEvents(
  all: readonly CgsaEvent[],
  opts: { today?: string; category?: EventCategory | null } = {},
): EventBuckets {
  const today = opts.today ?? todayInCalgary()
  const list = visible(all).filter((e) => !opts.category || e.category === opts.category)
  const byDate = (a: CgsaEvent, b: CgsaEvent) =>
    a.date.localeCompare(b.date) || (a.startTime ?? '').localeCompare(b.startTime ?? '')
  const upcomingAll = list.filter((e) => !isEventPast(e, today)).sort(byDate)
  const past = list.filter((e) => isEventPast(e, today)).sort((a, b) => byDate(b, a))
  const featured = upcomingAll.find((e) => e.featured) ?? upcomingAll[0] ?? null
  return { featured, upcoming: upcomingAll.filter((e) => e !== featured), past }
}

/** Status shown to visitors: past events always read as completed. */
export function displayStatus(e: CgsaEvent, today: string = todayInCalgary()): CgsaEvent['status'] {
  return isEventPast(e, today) ? 'COMPLETED' : e.status
}
