import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AccessibilityProvider } from '@/components/core/AccessibilityProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Today at Marvin — Spécialiste Apple Retail',
  description:
    'Portfolio interactif de Danon Marvin, étudiant en BTS SIO, candidat au poste de Spécialiste Apple Retail. Découvrez mes compétences à travers une expérience visionOS.',
  keywords: ['Apple Retail', 'Spécialiste', 'BTS SIO', 'Portfolio', 'visionOS', 'Danon Marvin'],
  authors: [{ name: 'Danon Marvin' }],
  openGraph: {
    title: 'Today at Marvin — Spécialiste Apple Retail',
    description:
      'Une expérience portfolio au style visionOS. La logique au service de l\'empathie.',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-void text-white antialiased noise-overlay`}>
        <AccessibilityProvider>
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  )
}
