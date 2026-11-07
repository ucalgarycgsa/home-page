/**
 * Shared content models (Lead-owned).
 * Every human-facing string exists in English (…EN), Simplified Chinese (…ZH)
 * and Traditional Chinese, Hong Kong usage (…Hant).
 */

/** Locale keys double as BCP 47 tags for <html lang>. */
export type Lang = 'en' | 'zh-Hans' | 'zh-Hant'

export type EventCategory =
  | 'CAREER'
  | 'NETWORKING'
  | 'CULTURE'
  | 'SOCIAL'
  | 'ACADEMIC'
  | 'COMMUNITY'

export type EventStatus =
  | 'UPCOMING'
  | 'REGISTRATION OPEN'
  | 'FULL'
  | 'COMPLETED'
  | 'COMING SOON'

/** How people sign up. Version 1 links out only — no ticketing on this site. */
export type RegistrationType = 'EVENTBRITE' | 'RSVP' | 'FREE_NO_REGISTRATION' | 'TBA'

export interface CgsaEvent {
  id: string
  slug: string
  titleEN: string
  titleZH: string
  titleHant: string
  descriptionEN: string
  descriptionZH: string
  descriptionHant: string
  /** ISO calendar date, YYYY-MM-DD, in Calgary time (America/Edmonton). */
  date: string
  /** 24-hour HH:MM, Calgary time. null = time to be announced. */
  startTime: string | null
  endTime: string | null
  venue: string
  address: string | null
  category: EventCategory
  featured: boolean
  /** Eventbrite (or RSVP) URL. null until the organizers supply it. */
  registrationUrl: string | null
  registrationType: RegistrationType
  /** Path under /public (e.g. "/images/events/xyz.jpg") or null. Licensed images only. */
  image: string | null
  imageAltEN?: string
  imageAltZH?: string
  imageAltHant?: string
  status: EventStatus
  capacityText: { en: string; zh: string; zhHant: string } | null
  partnerOrganizations: string[]
  /** Layout sample only. Never shipped in production builds. */
  placeholder?: true
}

export interface TeamMember {
  name: string
  roleEN: string
  roleZH: string
  roleHant: string
  /** Path under /public or null. Real portraits only, with the person's consent. */
  photo: string | null
  bioEN: string
  bioZH: string
  bioHant: string
  linkedin?: string
  email?: string
  placeholder?: true
}

export interface ResourceLink {
  titleEN: string
  titleZH: string
  titleHant: string
  noteEN: string
  noteZH: string
  noteHant: string
  url: string
  /** Who publishes the page (shown so visitors know the source). */
  sourceEN: string
  sourceZH: string
  sourceHant: string
}

export type ResourceGroupId =
  | 'new'
  | 'academic'
  | 'career'
  | 'life'
  | 'community'
  | 'contacts'

export interface ResourceGroup {
  id: ResourceGroupId
  links: ResourceLink[]
}

export interface Partner {
  name: string
  nameZH?: string
  nameHant?: string
  url: string | null
  logo: string | null
  placeholder?: true
}
