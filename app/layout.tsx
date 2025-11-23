import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MuzykaDlaBiznesu - Muzyka AI dla Twojego biznesu',
  description: 'Generuj muzykę bez opłat licencyjnych dla Twojej restauracji, kawiarni, sklepu, spa lub siłowni. Prosta, legalna alternatywa dla ZAIKS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
