import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n'
import './living-geometry.css'

/**
 * Living geometry — the homepage's one piece of motion.
 *
 * Seal / compass geometry drawn from the logo's circle: an outer ring with four
 * ticks, an offset inner ring, a half arc, and ONE red element that matches the
 * headline's terminals (a filled period in English, a hollow 。 ring in Chinese).
 *
 * Performance: every moving part is its own SVG layer with `will-change: transform`,
 * so motion is pure compositing — JS only writes four `transform` strings per frame
 * (no layout, no paint). The motion is so slow that the loop wakes only 15 times a
 * second (a timer arms each requestAnimationFrame), 30 while the pointer parallax is
 * easing; it pauses when off-screen or the tab is hidden, and never starts under
 * prefers-reduced-motion (the static drawing below is the reduced-motion version). Pointer parallax (a few px) only on devices
 * with a fine pointer that can hover; touch gets the slow drift alone.
 *
 * Cycles (≈1 px/s or less at the rendered size — felt, not watched): outer ring
 * 720 s, arc 600 s counter-rotating, the red element orbits once in 480 s, and the
 * inner ring's centre drifts on a 6-unit circle every 120 s. Purely decorative: aria-hidden.
 */

const LAYERS = 4
const PARALLAX = [2, 4, 3, 6] // px at the viewport edge, per layer
const IDLE_MS = 1000 / 15 // ≈0.2 px per step on the outer ring — visually continuous
const ACTIVE_MS = 1000 / 30 // while the pointer parallax eases

export function LivingGeometry({ className = '' }: { className?: string }) {
  const { lang } = useI18n()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const layers = Array.from(el.querySelectorAll<SVGSVGElement>('.geo__layer'))
    if (layers.length !== LAYERS) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')

    let raf = 0
    let timer = 0
    let visible = true
    const start = performance.now()
    // Pointer target and eased position, normalised to [-1, 1].
    const target = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }

    const draw = (now: number) => {
      const t = (now - start) / 1000
      eased.x += (target.x - eased.x) * 0.06
      eased.y += (target.y - eased.y) * 0.06
      const px = (i: number) => `${(eased.x * PARALLAX[i]!).toFixed(2)}px, ${(eased.y * PARALLAX[i]!).toFixed(2)}px`
      const drift = (2 * Math.PI * t) / 120
      // Units are % of the layer box (the drawing is 200 units wide → 1 unit = 0.5%).
      const dx = (Math.cos(drift) * 3).toFixed(3)
      const dy = (Math.sin(drift) * 3).toFixed(3)
      layers[0]!.style.transform = `translate(${px(0)}) rotate(${((t / 720) * 360) % 360}deg)`
      layers[1]!.style.transform = `translate(${px(1)}) translate(${dx}%, ${dy}%)`
      layers[2]!.style.transform = `translate(${px(2)}) rotate(${-((t / 600) * 360) % 360}deg)`
      layers[3]!.style.transform = `translate(${px(3)}) rotate(${((t / 480) * 360) % 360}deg)`
    }

    const easing = () => Math.abs(target.x - eased.x) > 0.002 || Math.abs(target.y - eased.y) > 0.002
    const tick = (now: number) => {
      draw(now)
      timer = window.setTimeout(() => {
        raf = requestAnimationFrame(tick)
      }, easing() ? ACTIVE_MS : IDLE_MS)
    }

    const stop = () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
    const play = () => {
      stop()
      if (reduce.matches || !visible) return
      raf = requestAnimationFrame(tick)
    }

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      target.x = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1))
      target.y = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1))
    }
    const syncPointer = () => {
      window.removeEventListener('pointermove', onPointer)
      if (fine.matches && !reduce.matches) window.addEventListener('pointermove', onPointer, { passive: true })
    }

    const onReduce = () => {
      if (reduce.matches) {
        stop()
        layers.forEach((l) => l.style.removeProperty('transform')) // back to the static drawing
      } else play()
      syncPointer()
    }

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting)
      if (visible) play()
      else stop()
    })
    io.observe(el)
    reduce.addEventListener('change', onReduce)
    fine.addEventListener('change', syncPointer)
    syncPointer()
    play()

    return () => {
      stop()
      io.disconnect()
      reduce.removeEventListener('change', onReduce)
      fine.removeEventListener('change', syncPointer)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  const ring = lang !== 'en' // the red element matches the headline terminal

  return (
    <div ref={root} className={`geo ${className}`.trim()} aria-hidden="true">
      {/* 1 — outer ring (slowest; no ticks — they read as a clock) */}
      <svg className="geo__layer" viewBox="0 0 200 200" focusable="false">
        <circle cx="100" cy="100" r="96" className="geo__line geo__line--faint" />
      </svg>
      {/* 2 — offset inner ring (its centre drifts) */}
      <svg className="geo__layer" viewBox="0 0 200 200" focusable="false">
        <circle cx="106" cy="95" r="62" className="geo__line" />
      </svg>
      {/* 3 — a half arc, counter-rotating */}
      <svg className="geo__layer" viewBox="0 0 200 200" focusable="false">
        <path d="M22 100a78 78 0 0 1 156 0" className="geo__line geo__line--faint" />
      </svg>
      {/* 4 — the one red element, on the 78-unit orbit */}
      <svg className="geo__layer" viewBox="0 0 200 200" focusable="false">
        {ring ? (
          <circle cx="155.2" cy="155.2" r="3.4" className="geo__red geo__red--ring" />
        ) : (
          <circle cx="155.2" cy="155.2" r="3.2" className="geo__red" />
        )}
      </svg>
    </div>
  )
}
