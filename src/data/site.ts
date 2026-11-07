/**
 * Organization identity — single source of truth.
 * Change the benefits URL, email or WeChat ID here and every page updates.
 */
import { withBasePath } from '../lib/paths'

export const SITE = {
  nameEN: "UCalgary Chinese Graduate Students' Association",
  nameZH: '卡尔加里大学中国研究生协会',
  /** Traditional Chinese (Hong Kong usage) — see src/i18n/GLOSSARY_zh-Hant.md */
  nameHant: '卡爾加里大學中國研究生協會',
  shortName: 'UCalgary CGSA',
  acronym: 'CGSA',
  email: 'ucalgarycgsa@gmail.com',
  wechatId: 'UCalgaryCGSA',
  /** Canonical, external member-benefits page. Do not duplicate its merchant list here. */
  benefitsUrl: 'https://ucalgarycan.ca/benefits/',
  /** Official WeChat article. Link only — never scraped or embedded. */
  wechatArticleUrl: 'https://mp.weixin.qq.com/s/HdWHAIEieleazSBHA8TNwg',
  logo: {
    /** Transparent derivative of the untouched source file /cgsa-logo.png */
    mark: withBasePath('/brand/cgsa-logo-transparent.png'),
    mark192: withBasePath('/brand/cgsa-logo-192.png'),
  },
} as const
