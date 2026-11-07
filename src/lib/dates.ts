import type { Lang } from '../types/content'

/** Calgary's time zone. Event dates and times in data are local to Calgary. */
export const TIME_ZONE = 'America/Edmonton'

function parse(date: string): Date {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1, 12))
}

/** Today in Calgary as YYYY-MM-DD. */
export function todayInCalgary(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function isPast(date: string, today: string = todayInCalgary()): boolean {
  return date < today
}

const fmt = (locale: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, { timeZone: 'UTC', ...opts })

export interface DateParts {
  day: string
  month: string
  weekday: string
  year: string
  /** Full, human date, e.g. "Friday, November 14, 2026" / "2026年11月14日 星期五" */
  long: string
}

export function dateParts(date: string, lang: Lang): DateParts {
  const d = parse(date)
  if (lang !== 'en') {
    // zh-HK gives 週六 for the short weekday (zh-CN gives 周六); long forms are 星期六 in both.
    const cjk = lang === 'zh-Hant' ? 'zh-HK' : 'zh-CN'
    return {
      day: String(d.getUTCDate()),
      month: `${d.getUTCMonth() + 1}月`,
      weekday: fmt(cjk, { weekday: 'short' }).format(d),
      year: `${d.getUTCFullYear()}年`,
      long: `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日 ${fmt(cjk, { weekday: 'long' }).format(d)}`,
    }
  }
  return {
    day: String(d.getUTCDate()),
    month: fmt('en-CA', { month: 'short' }).format(d).replace('.', ''),
    weekday: fmt('en-CA', { weekday: 'short' }).format(d),
    year: String(d.getUTCFullYear()),
    long: fmt('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(d),
  }
}

/** "6:00 – 8:30 pm" / "18:00–20:30". Returns null when time is TBA. */
export function timeRange(start: string | null, end: string | null, lang: Lang): string | null {
  if (!start) return null
  if (lang !== 'en') return end ? `${start}–${end}` : start
  const to12 = (t: string) => {
    const [h = 0, m = 0] = t.split(':').map(Number)
    const suffix = h >= 12 ? 'pm' : 'am'
    const hour = h % 12 === 0 ? 12 : h % 12
    return { text: m === 0 ? `${hour}` : `${hour}:${String(m).padStart(2, '0')}`, suffix }
  }
  const s = to12(start)
  if (!end) return `${s.text} ${s.suffix}`
  const e = to12(end)
  return s.suffix === e.suffix ? `${s.text}–${e.text} ${e.suffix}` : `${s.text} ${s.suffix} – ${e.text} ${e.suffix}`
}
