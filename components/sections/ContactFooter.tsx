'use client'

import { motion } from 'framer-motion'
import { useAccessibility } from '@/components/core/AccessibilityProvider'

export function ContactFooter() {
  const { reducedMotion } = useAccessibility()

  return (
    <footer
      className="relative z-10 py-24 px-6 flex flex-col items-center text-center"
      role="contentinfo"
      aria-label="Contact et liens"
    >
      {/* Divider */}
      <div
        aria-hidden="true"
        className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-20"
      />

      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 40 }}
        whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-5">La prochaine étape</p>

        {/* Headline Keynote style */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Une conversation.
          <br />
          <span className="gradient-text-violet">Une opportunité.</span>
        </h2>

        <p className="text-base text-white/50 mb-10 leading-relaxed">
          Prêt à rejoindre une équipe qui croit que la technologie doit être
          accessible à tous — et qui le prouve chaque jour.
        </p>

        {/* CTA primary */}
        <motion.a
          href="mailto:marvin.danon@example.com"
          className="inline-flex items-center gap-3 glass rounded-pill px-8 py-4 text-base font-semibold text-white glow-violet hover:bg-white/10 transition-all mb-8"
          whileHover={reducedMotion ? {} : { scale: 1.04, y: -2 }}
          whileTap={reducedMotion ? {} : { scale: 0.97 }}
          aria-label="Envoyer un email à Danon Marvin"
        >
          <span aria-hidden="true">✉</span>
          Me contacter
        </motion.a>

        {/* Secondary links */}
        <div
          className="flex items-center justify-center gap-6 mt-4"
          role="navigation"
          aria-label="Liens externes"
        >
          {[
            { href: '#', label: 'LinkedIn', icon: 'in' },
            { href: '#', label: 'GitHub', icon: '⌥' },
            { href: '/CV_Marvin.pdf', label: 'CV PDF', icon: '↓' },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors"
              whileHover={reducedMotion ? {} : { y: -2 }}
              aria-label={link.label}
            >
              <span aria-hidden="true" className="text-accent-violet font-bold">{link.icon}</span>
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Footer meta */}
      <motion.div
        className="mt-20 text-xs text-white/20 space-y-1"
        initial={reducedMotion ? {} : { opacity: 0 }}
        whileInView={reducedMotion ? {} : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="inline-flex items-center gap-1.5 flex-wrap justify-center">
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
            Conçu avec ❤ par Danon Marvin · BTS SIO 2025–2026
          </p>
        <p className="text-white/10">
          Construit avec Next.js 14 · Framer Motion · Tailwind CSS
        </p>
        <p className="mt-3 text-white/15">
          &ldquo;Technology alone is not enough — it&apos;s technology married with liberal arts,
          married with the humanities, that yields us the results that make our heart sing.&rdquo;
          — Steve Jobs
        </p>
      </motion.div>
    </footer>
  )
}
