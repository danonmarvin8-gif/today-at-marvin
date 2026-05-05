'use client'

import { motion } from 'framer-motion'
import { useAccessibility } from '@/components/core/AccessibilityProvider'

const skills = [
  { label: 'Support Utilisateur', angle: 0, color: '#7B61FF' },
  { label: 'Apple Ecosystem', angle: 60, color: '#0A84FF' },
  { label: 'Cybersécurité', angle: 120, color: '#30D158' },
  { label: 'Bac Pro Commerce', angle: 180, color: '#FF9F0A' },
  { label: 'Empathie Client', angle: 240, color: '#FF375F' },
  { label: 'BTS SIO', angle: 300, color: '#64D2FF' },
]

export function SkillsOrbit() {
  const { reducedMotion } = useAccessibility()

  return (
    <section
      aria-label="Compétences en orbite"
      className="relative z-10 py-24 px-6 flex flex-col items-center"
    >
      <motion.div
        className="text-center mb-16"
        initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-3">Universel</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Un profil en{' '}
          <span className="gradient-text-violet">orbite</span>
        </h2>
      </motion.div>

      {/* Orbit System */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 320, height: 320 }}
        aria-label="Représentation visuelle des compétences en orbite"
        role="img"
      >
        {/* Center core */}
        <motion.div
          className="absolute w-20 h-20 rounded-full flex items-center justify-center z-10"
          style={{
            background: 'radial-gradient(circle, #7B61FF 0%, #0A84FF 100%)',
            boxShadow: '0 0 40px rgba(123,97,255,0.5)',
          }}
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-2xl" aria-hidden="true">M</span>
        </motion.div>

        {/* Orbit rings */}
        {[1, 1.6].map((scale, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute rounded-full border border-white/8"
            style={{ width: 160 * scale, height: 160 * scale }}
          />
        ))}

        {/* Skill nodes */}
        {skills.map((skill, i) => {
          const rad = (skill.angle * Math.PI) / 180
          const radius = 140
          const x = Math.cos(rad) * radius
          const y = Math.sin(rad) * radius

          return (
            <motion.div
              key={skill.label}
              className="absolute flex items-center justify-center"
              style={{ x, y }}
              initial={reducedMotion ? {} : { opacity: 0, scale: 0 }}
              whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={reducedMotion ? {} : { scale: 1.15 }}
              title={skill.label}
            >
              <div
                className="glass rounded-pill px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
                style={{
                  color: skill.color,
                  border: `1px solid ${skill.color}40`,
                  background: `${skill.color}12`,
                  boxShadow: `0 4px 20px ${skill.color}30`,
                }}
                role="img"
                aria-label={skill.label}
              >
                {skill.label}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
