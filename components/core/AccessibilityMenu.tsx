'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useId } from 'react'
import { useAccessibility } from './AccessibilityProvider'

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const { highContrast, reducedMotion, toggleHighContrast, toggleReducedMotion } = useAccessibility()
  const menuId = useId()

  return (
    <div
      className="fixed bottom-6 left-6 z-50"
      role="complementary"
      aria-label="Menu d'accessibilité"
    >
      {/* Trigger Button */}
      <motion.button
        id="a11y-menu-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? 'Fermer le menu accessibilité' : 'Ouvrir le menu accessibilité'}
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass glow-violet flex items-center gap-2 px-4 py-3 rounded-pill text-sm font-medium text-white/90 cursor-pointer select-none"
      >
        <span aria-hidden="true" className="text-lg">♿</span>
        <span className="hidden sm:inline">Accessibilité</span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-label="Options d'accessibilité"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="absolute bottom-16 left-0 glass rounded-card p-5 w-72 shadow-glow-violet"
          >
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-semibold">
              Options d&apos;accessibilité
            </p>

            {/* High Contrast Toggle */}
            <ToggleRow
              id="toggle-high-contrast"
              icon="◐"
              label="Contraste élevé"
              description="Renforce la lisibilité des textes et bordures"
              checked={highContrast}
              onChange={toggleHighContrast}
              accentColor="#7B61FF"
            />

            {/* Reduced Motion Toggle */}
            <ToggleRow
              id="toggle-reduced-motion"
              icon="⏸"
              label="Réduire les animations"
              description="Désactive les effets de mouvement et parallaxe"
              checked={reducedMotion}
              onChange={toggleReducedMotion}
              accentColor="#0A84FF"
            />

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/30 leading-relaxed">
                Ces préférences s&apos;adaptent automatiquement à vos réglages système (WCAG 2.2 AA).
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface ToggleRowProps {
  id: string
  icon: string
  label: string
  description: string
  checked: boolean
  onChange: () => void
  accentColor: string
}

function ToggleRow({ id, icon, label, description, checked, onChange, accentColor }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4 last:mb-0">
      <div className="flex-1">
        <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
          <span aria-hidden="true" className="text-base">{icon}</span>
          <span className="text-sm font-medium text-white/90">{label}</span>
        </label>
        <p className="text-xs text-white/40 mt-0.5 ml-6 leading-relaxed">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className="relative flex-shrink-0 w-11 h-6 rounded-pill transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent"
        style={{
          background: checked ? accentColor : 'rgba(255,255,255,0.12)',
          boxShadow: checked ? `0 0 16px ${accentColor}66` : 'none',
        }}
      >
        <motion.span
          layout
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
          style={{ left: checked ? 'calc(100% - 22px)' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  )
}
