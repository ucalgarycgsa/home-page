import type { TeamMember } from '../types/content'
import { SAMPLE_TEAM } from './samples'

/**
 * Executive team. Add real members (with their consent) to REAL_TEAM.
 * Portraits go in /public/images/team/ — 4:5 ratio, at least 800×1000.
 * Layout samples (src/data/samples.ts) are excluded from production builds.
 */
const REAL_TEAM: TeamMember[] = [
  // Example:
  // { name: '', roleEN: 'President', roleZH: '会长', roleHant: '會長', photo: '/images/team/name.jpg', bioEN: '', bioZH: '', bioHant: '', linkedin: 'https://…', email: '…' },
]

const WITH_SAMPLES = import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === 'true'

export const TEAM: TeamMember[] = WITH_SAMPLES ? [...REAL_TEAM, ...SAMPLE_TEAM] : REAL_TEAM
