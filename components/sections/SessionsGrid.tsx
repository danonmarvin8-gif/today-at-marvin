'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SessionCard } from './SessionCard'
import { sessions } from '@/lib/sessions'
import { useAccessibility } from '@/components/core/AccessibilityProvider'

export function SessionsGrid() {
  const { reducedMotion } = useAccessibility()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Z-depth scroll effect
  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reducedMotion ? [0, 0, 0] : [80, 0, -40]
  )

  return (
    <section
      ref={sectionRef}
      id="sessions"
      aria-label="Les 3 sessions Today at Marvin"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center py-24 px-6"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-16 max-w-2xl mx-auto"
        initial={reducedMotion ? {} : { opacity: 0, y: 40 }}
        whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4 font-semibold">
          Programme du jour
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold gradient-text-hero mb-5">
          3 Sessions.
          <br />
          <span className="gradient-text-violet">1 Vision.</span>
        </h2>
        <p className="text-base sm:text-lg text-white/50 font-light leading-relaxed">
          Comme chaque session Today at Apple, chaque carte ci-dessous traduit
          une compétence technique en impact humain concret.
        </p>
      </motion.div>

      {/* Cards Grid with Z-depth */}
      <motion.div
        className="w-full max-w-6xl mx-auto"
        style={{ translateZ }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </motion.div>

      {/* Decorative horizontal rule */}
      <motion.div
        className="mt-20 w-px h-24 bg-gradient-to-b from-white/20 to-transparent mx-auto"
        initial={reducedMotion ? {} : { scaleY: 0 }}
        whileInView={reducedMotion ? {} : { scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        aria-hidden="true"
      />
    </section>
  )
}
