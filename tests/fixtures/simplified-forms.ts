/**
 * Characters used in the site's 简体 copy whose Traditional form is different.
 * Generated once with OpenCC 1.4.2 over the 简体 strings
 * of zh.ts, resources.ts, samples.ts, site.ts, en.ts and Footer.tsx: a character
 * is listed when BOTH the Hong Kong (s2hk) and Taiwan (s2tw) standards change it,
 * so standard shared forms such as 群 or 着 are not flagged. This way the
 * test runs without OpenCC installed. If new 简体 copy introduces new characters,
 * regenerate it (README → Translations).
 *
 * A character in this list must not appear in 繁體 text, except those in
 * TRADITIONAL_OK, which are also correct Traditional characters in context.
 */
export const SIMPLIFIED_FORMS =
  '与专业两个为举么习书买于从们价优伙会传体余儿关养内写况准几划别办务动区协单占历参发号后员咨团园国图场处备复头奖学实审对导将尔属带帮并庆应开归当录惯愿执护报拨择换携摄撑攒数断无时显暂术机权条来构标样档检欢毕没测浏满点独献现电码确离种称筛筹签简类紧约线组织绍经结给络统续网职联脉脚获营见规览计认让议记许论设访证识诉译试话询该详语说请读谁谊负贡责败购费资转较辅达过迈运还这进远连适选邮里钱链长门闭问间队阶际雇页项顿预领题额馆'

/** Valid Traditional characters that also appear in the list above. */
export const TRADITIONAL_OK = new Set([
  '里', // 卡爾加里 — part of the official name
])

/** Characters in `text` that look like leftover 简体 forms. */
export function simplifiedLeftovers(text: string): string[] {
  return [...new Set([...text].filter((c) => SIMPLIFIED_FORMS.includes(c) && !TRADITIONAL_OK.has(c)))]
}

/**
 * The Traditional counterparts of SIMPLIFIED_FORMS (HK and TW forms), used by
 * the screenshot QA to make sure a 简体 page shows no 繁體 outside the 繁體
 * switch button.
 */
export const TRADITIONAL_FORMS =
  '並佔來個們備傳僱價優兒內兩別劃動務區協參員問單國園圖團執報場夥學實審寫將專對導屬帶幫幾後從復慣慶應換撐撥擇攜攝攢敗數斷於時暫書會條業構標樣機檔檢權歡歷歸沒況測準滿瀏為無營爾獎獨獲獻現畢當發確碼種稱篩簡籌籤約紹組結絡給統經網緊線織續習聯職脈腳與舉處號術裏裡見規覽計記訪設許訴詢試話該詳認語說説誰誼請論諮證識譯議護讀讓負貢責買費資購較輔轉辦這連進運過達遠適選邁還郵錄錢鏈長門閉開間關隊階際離電頁項預頓領頭題額願類顯養餘館體麼點'

export function traditionalLeftovers(text: string): string[] {
  return [...new Set([...text].filter((c) => TRADITIONAL_FORMS.includes(c)))]
}
