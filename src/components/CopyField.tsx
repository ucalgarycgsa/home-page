import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { copyText } from '../lib/clipboard'

/**
 * A value with a copy button and a polite "Copied / 已复制" confirmation.
 * No fake WeChat URLs or QR codes: the WeChat ID is shown as text to copy.
 */
export function CopyButton({ value, label, className = '' }: { value: string; label: string; className?: string }) {
  const { t } = useI18n()
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function onClick() {
    const ok = await copyText(value)
    // Reset first so a repeated click is announced again.
    setState('idle')
    window.clearTimeout(timer.current)
    await new Promise((r) => window.setTimeout(r, 60))
    setState(ok ? 'copied' : 'failed')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2400)
  }

  return (
    <span className={`copy ${className}`.trim()}>
      {/* Static accessible name; the confirmation is announced once, via role=status. */}
      <button type="button" className="btn btn--quiet copy__btn" onClick={onClick} data-state={state} aria-label={label}>
        <span aria-hidden="true">{state === 'copied' ? t.common.copied : label}</span>
      </button>
      <span className="visually-hidden" role="status">
        {state === 'copied' ? `${t.common.copied}: ${value}` : state === 'failed' ? t.common.copyFailed : ''}
      </span>
      {state === 'failed' && (
        <span className="copy__fail t-caption" aria-hidden="true">
          {t.common.copyFailed}
        </span>
      )}
    </span>
  )
}
