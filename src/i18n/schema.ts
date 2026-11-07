/**
 * i18n schema (Lead-owned).
 * English (en.ts) is the reference shape; zh.ts must satisfy the same type, so a
 * missing or extra key in either language fails `npm run typecheck`.
 * tests/i18n.test.ts additionally checks that no ZH string is empty or identical
 * to its EN counterpart unless whitelisted (proper nouns, emails, IDs).
 */
import type { en } from './en'

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { readonly [K in keyof T]: Widen<T[K]> }
      : T

export type Messages = Widen<typeof en>
