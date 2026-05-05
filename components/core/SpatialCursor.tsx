'use client'

import { useRef, useEffect } from 'react'
import { useAccessibility } from './AccessibilityProvider'

export function SpatialCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useAccessibility()

  useEffect(() => {
    if (reducedMotion) return

    const cursor = cursorRef.current
    const glow = glowRef.current
    if (!cursor || !glow) return

    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 8}px, ${mouseY - 8}px)`
    }

    const onEnterLink = () => cursor.classList.add('scale-[2.5]')
    const onLeaveLink = () => cursor.classList.remove('scale-[2.5]')

    let raf: number
    const trackGlow = () => {
      glowX += (mouseX - glowX) * 0.06
      glowY += (mouseY - glowY) * 0.06
      glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`
      raf = requestAnimationFrame(trackGlow)
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    trackGlow()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <>
      {/* Custom cursor dot */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[999] transition-all duration-150 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.9) 0%, rgba(123,97,255,0.3) 60%, transparent 100%)',
          boxShadow: '0 0 12px rgba(123,97,255,0.6)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Ambient glow that follows slower */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.04) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
