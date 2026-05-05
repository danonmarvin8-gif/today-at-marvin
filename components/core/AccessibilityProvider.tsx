'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface A11yState {
  highContrast: boolean
  reducedMotion: boolean
  toggleHighContrast: () => void
  toggleReducedMotion: () => void
}

const AccessibilityContext = createContext<A11yState>({
  highContrast: false,
  reducedMotion: false,
  toggleHighContrast: () => {},
  toggleReducedMotion: () => {},
})

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Respect OS preference on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)')

    if (prefersReducedMotion.matches) setReducedMotion(true)
    if (prefersHighContrast.matches) setHighContrast(true)

    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    const handleContrast = (e: MediaQueryListEvent) => setHighContrast(e.matches)

    prefersReducedMotion.addEventListener('change', handleMotion)
    prefersHighContrast.addEventListener('change', handleContrast)

    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotion)
      prefersHighContrast.removeEventListener('change', handleContrast)
    }
  }, [])

  // Apply data attributes to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-high-contrast', String(highContrast))
    document.documentElement.setAttribute('data-reduced-motion', String(reducedMotion))
  }, [highContrast, reducedMotion])

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        reducedMotion,
        toggleHighContrast: () => setHighContrast(v => !v),
        toggleReducedMotion: () => setReducedMotion(v => !v),
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => useContext(AccessibilityContext)
