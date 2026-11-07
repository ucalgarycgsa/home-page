// Traditional Chinese (zh-Hant) display serif, self-hosted like the others.
// Noto Serif HK draws Hong Kong glyph forms; its @font-face list is large, so it is
// a separate CSS chunk fetched only when zh-Hant is active — English and 简体
// visitors never download it. Body text uses system 繁體 fonts (see tokens.css).
let requested = false

export function loadHantFonts(): void {
  if (requested || typeof document === 'undefined') return
  requested = true
  void import('@fontsource-variable/noto-serif-hk/wght.css')
}
