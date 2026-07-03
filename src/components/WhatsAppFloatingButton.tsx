import * as React from 'react'
import { contact } from '@/data/site'

export function WhatsAppFloatingButton() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isDimmed, setIsDimmed] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    const hero = document.getElementById('inicio')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsDimmed(entry.isIntersecting),
      { threshold: 0.6 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-lg transition-all duration-300 ease-out hover:scale-105"
      style={{
        opacity: isVisible ? (isDimmed ? 0.4 : 1) : 0,
        translate: isVisible ? '0 0' : '0 1rem',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <svg viewBox="0 0 32 32" className="size-7 shrink-0 fill-current" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.703 4.61 1.92 6.475L4 29l7.72-1.878A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 16.94c-.297.833-1.474 1.526-2.412 1.727-.638.135-1.472.243-4.28-.919-3.594-1.487-5.906-5.135-6.087-5.372-.176-.238-1.453-1.933-1.453-3.688s.914-2.615 1.24-2.973c.297-.325.647-.406.863-.406.216 0 .432.002.62.011.199.01.466-.075.729.556.297.717.85 2.06 1.017 2.211.176.15.33.363.242.575-.088.216-.13.35-.264.535-.13.176-.279.394-.4.529-.13.15-.267.313-.115.578.15.264.667 1.101 1.433 1.784 1.005.895 1.851 1.17 2.115 1.302.264.13.418.113.573-.068.15-.176.658-.766.834-1.031.176-.264.353-.216.593-.13.242.088 1.539.726 1.802.858.264.13.44.194.505.303.066.11.066.629-.23 1.463Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-out group-hover:max-w-40 group-hover:opacity-100 motion-reduce:transition-none">
        Falar no WhatsApp
      </span>
    </a>
  )
}
