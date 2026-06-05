'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useAccessibility } from '@/components/core/AccessibilityProvider'

export interface SessionData {
  id: string
  icon: string
  title: string
  subtitle: string
  quote: string
  body: string
  accent: string
  glow: string
  glowClass: 'glow-violet' | 'glow-blue' | 'glow-green'
  skills: string[]
  index: number
}

interface SessionCardProps {
  session: SessionData
  isActive?: boolean
}

function SkillTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-pill"
      style={{
        background: `${color}18`,
        color: color,
        border: `1px solid ${color}33`,
      }}
    >
      {label}
    </span>
  )
}

export function SessionCard({ session, isActive = false }: SessionCardProps) {
  const { reducedMotion } = useAccessibility()
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 26 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 26 })

  useEffect(() => {
    if (reducedMotion) return
    const card = cardRef.current
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      rotateX.set(((e.clientY - cy) / rect.height) * -10)
      rotateY.set(((e.clientX - cx) / rect.width) * 10)
    }
    const onLeave = () => { rotateX.set(0); rotateY.set(0) }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [reducedMotion, rotateX, rotateY])

  return (
    <motion.article
      ref={cardRef}
      aria-labelledby={`session-title-${session.id}`}
      initial={reducedMotion ? {} : { opacity: 0, y: 60, rotateX: -15 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: session.index * 0.15,
        type: 'spring',
        stiffness: 140,
        damping: 20,
      }}
      whileHover={reducedMotion ? {} : { y: -12, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      style={{
        rotateX: reducedMotion ? 0 : springX,
        rotateY: reducedMotion ? 0 : springY,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      className={`glass ${session.glowClass} rounded-card p-7 sm:p-9 relative overflow-hidden group cursor-default h-full`}
    >
      {/* Bottom glow source */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 rounded-full opacity-30 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: session.accent }}
      />

      {/* Shimmer edge on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${session.accent}18 0%, transparent 60%)`,
        }}
      />

      {/* Number badge */}
      <div
        aria-hidden="true"
        className="absolute top-6 right-6 text-xs font-bold tracking-widest"
        style={{ color: `${session.accent}60` }}
      >
        {String(session.index + 1).padStart(2, '0')}
      </div>

      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl"
        style={{ background: `${session.accent}20`, border: `1px solid ${session.accent}40` }}
        whileHover={reducedMotion ? {} : { rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
        aria-hidden="true"
      >
        {session.icon}
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3
          id={`session-title-${session.id}`}
          className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2"
        >
          {session.title}
        </h3>

        <p className="text-sm font-medium mb-4" style={{ color: session.accent }}>
          {session.subtitle}
        </p>

        {/* Quote — Keynote style */}
        <blockquote
          className="text-base sm:text-lg font-light italic text-white/70 mb-5 leading-relaxed border-l-2 pl-4"
          style={{ borderColor: session.accent }}
        >
          &ldquo;{session.quote}&rdquo;
        </blockquote>

        <p className="text-sm text-white/55 leading-relaxed mb-6">
          {session.body}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-2" role="list" aria-label="Compétences associées">
          {session.skills.map(skill => (
            <div role="listitem" key={skill}>
              <SkillTag label={skill} color={session.accent} />
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
