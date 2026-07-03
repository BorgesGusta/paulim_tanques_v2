import * as React from 'react'

/**
 * Tracks how far an element's center is from the viewport center and returns
 * that distance scaled by `speed`, for a subtle scroll-linked parallax offset.
 * Element needs some visual overscan (e.g. scale-110) so the translate never
 * reveals empty edges.
 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = React.useRef<T>(null)
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number
    function update() {
      const el = ref.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        const elCenter = rect.top + rect.height / 2
        setOffset((elCenter - viewportCenter) * speed)
      }
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [speed])

  return { ref, offset }
}
