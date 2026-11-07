import type { CgsaEvent } from '../types/content'

/**
 * CGSA events — REAL, CONFIRMED events only.
 *
 * HOW TO ADD AN EVENT: copy the TEMPLATE at the bottom of this file into
 * REAL_EVENTS, fill every field in all three languages (EN, 简体 …ZH, 繁體 …Hant). Pages sort by date and move
 * events to "Past" automatically.
 * HOW TO ADD AN EVENTBRITE LINK: set `registrationUrl` to the Eventbrite URL,
 * `registrationType: 'EVENTBRITE'` and `status: 'REGISTRATION OPEN'`.
 *
 * Layout samples live in src/data/samples.ts. They are only bundled into
 * `npm run dev` / `npm run preview:samples`, never into the production build.
 */
import { SAMPLE_EVENTS } from './samples'

const REAL_EVENTS: CgsaEvent[] = [
  // No confirmed CGSA event has been supplied yet.
]

// Statically false in production, so the bundler drops the samples entirely.
const WITH_SAMPLES = import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === 'true'

export const EVENTS: CgsaEvent[] = WITH_SAMPLES ? [...REAL_EVENTS, ...SAMPLE_EVENTS] : REAL_EVENTS


/*
TEMPLATE — copy into REAL_EVENTS above:
  {
    id: '2027-01-lunar-example',            // unique, stable
    slug: 'short-url-friendly-name',
    titleEN: '',
    titleZH: '',                              // 简体
    titleHant: '',                            // 繁體 (Hong Kong usage, see src/i18n/GLOSSARY_zh-Hant.md)
    descriptionEN: '',
    descriptionZH: '',
    descriptionHant: '',
    date: 'YYYY-MM-DD',                      // Calgary date
    startTime: 'HH:MM', endTime: 'HH:MM',    // 24h, or null if TBA
    venue: '', address: null,               // venue '' shows "Venue to be announced / 地点待定"
    category: 'CAREER',                      // CAREER | NETWORKING | CULTURE | SOCIAL | ACADEMIC | COMMUNITY
    featured: false,                         // true shows it large on the homepage
    registrationUrl: null,                   // paste the Eventbrite URL when ready
    registrationType: 'EVENTBRITE',          // EVENTBRITE | RSVP | FREE_NO_REGISTRATION | TBA
    image: null,                             // e.g. '/images/events/file.jpg' (licensed, consented)
    status: 'COMING SOON',                   // UPCOMING | REGISTRATION OPEN | FULL | COMPLETED | COMING SOON
    capacityText: null,                      // or { en: 'Limited to 80', zh: '限 80 人', zhHant: '限 80 人' }
    partnerOrganizations: [],
  },
*/
