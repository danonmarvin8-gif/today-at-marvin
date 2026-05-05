'use client'

import { useRef, useEffect } from 'react'
import { useAccessibility } from './AccessibilityProvider'

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { reducedMotion } = useAccessibility()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: { x: number; y: number; z: number; pz: number }[] = []
    const NUM_STARS = 280
    const SPEED = reducedMotion ? 0 : 0.4

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      stars = Array.from({ length: NUM_STARS }, () => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        pz: 0,
      }))
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      for (const star of stars) {
        star.pz = star.z
        star.z -= SPEED

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx
          star.y = Math.random() * canvas.height - cy
          star.z = canvas.width
          star.pz = star.z
        }

        const sx = (star.x / star.z) * canvas.width + cx
        const sy = (star.y / star.z) * canvas.height + cy

        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) continue

        const px = (star.x / star.pz) * canvas.width + cx
        const py = (star.y / star.pz) * canvas.height + cy

        const size = Math.max(0.3, (1 - star.z / canvas.width) * 2.5)
        const brightness = Math.min(1, (1 - star.z / canvas.width) * 1.4)

        ctx.beginPath()
        ctx.strokeStyle = `rgba(${170 + Math.round(brightness * 85)}, ${170 + Math.round(brightness * 85)}, 255, ${brightness})`
        ctx.lineWidth = size
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    init()

    if (!reducedMotion) {
      draw()
    } else {
      // Static stars for reduced motion
      ctx.fillStyle = '#050508'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      for (const star of stars) {
        const sx = (star.x / star.z) * canvas.width + cx
        const sy = (star.y / star.z) * canvas.height + cy
        const size = Math.max(0.5, (1 - star.z / canvas.width) * 2)
        ctx.beginPath()
        ctx.fillStyle = `rgba(200, 200, 255, ${1 - star.z / canvas.width})`
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    window.addEventListener('resize', () => { resize(); init() })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', () => { resize(); init() })
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
