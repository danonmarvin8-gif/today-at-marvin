'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useScroll, useAnimationFrame } from 'framer-motion'
import { useAccessibility } from '@/components/core/AccessibilityProvider'

// ─── Floating Orb ────────────────────────────────────────────────────────────
function FloatingOrb({
  color,
  size,
  x,
  y,
  delay = 0,
  duration = 8,
}: {
  color: string
  size: number
  x: string
  y: string
  delay?: number
  duration?: number
}) {
  const { reducedMotion } = useAccessibility()

  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, willChange: 'transform, opacity', transform: `translate(${x}, ${y})` }}
      animate={
        reducedMotion
          ? {}
          : {
              y: [0, -30, -10, -25, 0],
              x: [0, 10, -5, 8, 0],
              scale: [1, 1.05, 0.97, 1.03, 1],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}99, ${color}22 60%, transparent 100%)`,
          filter: `blur(${size * 0.4}px)`,
          opacity: 0.6,
        }}
      />
    </motion.div>
  )
}

// ─── Anti-Gravity Letters ─────────────────────────────────────────────────────
function AntiGravityText({ text, delay = 0 }: { text: string; delay?: number }) {
  const { reducedMotion } = useAccessibility()
  const letters = text.split('')

  return (
    <span aria-label={text} className="inline-block">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={reducedMotion ? {} : { opacity: 0, y: 60, rotateX: -30 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.04,
            type: 'spring',
            stiffness: 180,
            damping: 18,
          }}
          whileHover={
            reducedMotion
              ? {}
              : {
                  y: -8,
                  color: '#a78bfa',
                  transition: { type: 'spring', stiffness: 400, damping: 12 },
                }
          }
          style={{ cursor: 'default', willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Tilt Card ───────────────────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const { reducedMotion } = useAccessibility()
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 })

  useEffect(() => {
    if (reducedMotion) return
    const card = cardRef.current
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      rotateX.set(((e.clientY - cy) / rect.height) * -12)
      rotateY.set(((e.clientX - cx) / rect.width) * 12)
    }
    const onLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [reducedMotion, rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

// ─── Scroll CTA ───────────────────────────────────────────────────────────────
function ScrollIndicator() {
  const { reducedMotion } = useAccessibility()
  return (
    <motion.div
      className="flex flex-col items-center gap-2 mt-16"
      initial={reducedMotion ? {} : { opacity: 0 }}
      animate={reducedMotion ? {} : { opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
      aria-label="Faire défiler pour découvrir les sessions"
    >
      <span className="text-xs uppercase tracking-[0.25em] text-white/30">Découvrir</span>
      <motion.div
        className="w-[1px] h-12 bg-gradient-to-b from-accent-violet/50 to-transparent"
        animate={reducedMotion ? {} : { scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

// ─── Hero Badge ───────────────────────────────────────────────────────────────
function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 22 }}
      className="inline-flex items-center gap-2 glass rounded-pill px-4 py-2 text-xs font-medium mb-8"
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-accent-green"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className="text-white/60">Candidature Spécialiste Apple Retail</span>
      <span className="text-accent-violet font-semibold">2026</span>
    </motion.div>
  )
}

// ─── Main Hero Header ─────────────────────────────────────────────────────────
export function HeroHeader() {
  const { reducedMotion } = useAccessibility()
  const containerRef = useRef<HTMLElement>(null)

  // Parallax scroll
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, reducedMotion ? 0 : -80])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, reducedMotion ? 1 : 0.93])

  return (
    <motion.header
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ y, opacity }}
      role="banner"
    >
      {/* ── Ambient Background Orbs ── */}
      <FloatingOrb color="#7B61FF" size={600} x="-15%" y="-10%" delay={0} duration={10} />
      <FloatingOrb color="#0A84FF" size={400} x="60%" y="10%" delay={2} duration={12} />
      <FloatingOrb color="#30D158" size={300} x="20%" y="65%" delay={4} duration={9} />
      <FloatingOrb color="#FF375F" size={250} x="75%" y="60%" delay={1.5} duration={11} />

      {/* ── Content Container ── */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        style={{ scale }}
      >
        {/* Badge */}
        <HeroBadge />

        {/* Eyebrow */}
        <motion.p
          className="text-sm sm:text-base font-medium tracking-[0.3em] uppercase text-white/40 mb-4"
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          aria-label="Sous-titre : Today at"
        >
          — Today at —
        </motion.p>

        {/* ── Main Title with Anti-Gravity Effect ── */}
        <motion.div
          className="mb-6"
          style={{ perspective: 800 }}
        >
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none gradient-text-hero inline-flex items-center justify-center gap-4"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            {/* Apple logo — inline SVG, aucun Unicode, compatible Windows/Android */}
            <svg
              className="apple-icon"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 814 1000"
            >
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.7 0 246.7 0 121.3c0-61.6 12.1-121.2 38.4-171.6C78.8-123.6 166 0 222.7 0c61.1 0 99.5 39.4 154.5 39.4 53.5 0 86.5-39.4 165.4-39.4 54.5 0 149.1 54.5 190.5 141.8-.6.3-108.8 54.5-108.8 198.7zm-174.7-209.8c28.9-35.1 49.7-84.2 49.7-133.4 0-6.5-.6-13-1.3-19.4-46.9 1.7-103.7 31.6-135.8 71.4-25.8 30.3-50.2 79.4-50.2 129.4 0 7.1 1.3 14.2 1.6 16.5 3.3.3 8.4 1.3 13.4 1.3 42.2 0 94.9-28.9 122.6-65.8z"/>
            </svg>
            <AntiGravityText text="Marvin" delay={0.7} />
          </h1>
        </motion.div>

        {/* ── Tilt Card — Tagline ── */}
        <TiltCard className="glass rounded-card p-6 sm:p-8 mx-auto max-w-2xl mt-8 glow-violet">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-xl sm:text-2xl font-light text-white/80 leading-relaxed">
              Je transforme la{' '}
              <span className="font-semibold gradient-text-violet" style={{ color: '#c4b5fd' }}>complexité technique</span>
              {' '}en{' '}
              <span className="font-semibold" style={{ color: '#60a5fa' }}>conversations simples</span>.
            </p>
            <p className="mt-3 text-base text-white/65 font-light">
              BTS SIO · Bac Pro Commerce · Futur Spécialiste Apple
            </p>
          </motion.div>
        </TiltCard>

        {/* ── CTA Buttons ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.7 }}
        >
          <motion.a
            href="#sessions"
            className="glass rounded-pill px-8 py-3.5 text-sm font-semibold text-white glow-violet hover:bg-white/10 transition-all"
            whileHover={reducedMotion ? {} : { scale: 1.04, y: -2 }}
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
            aria-label="Découvrir les 3 sessions"
          >
            Découvrir mes sessions →
          </motion.a>
          <motion.a
            href="/CV_Marvin.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill px-8 py-3.5 text-sm font-semibold text-accent-violet border border-accent-violet/40 hover:border-accent-violet hover:bg-accent-violet/10 transition-all"
            whileHover={reducedMotion ? {} : { scale: 1.04, y: -2 }}
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
            aria-label="Voir mon CV au format PDF"
          >
            Voir mon CV ↗
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </motion.div>
    </motion.header>
  )
}
