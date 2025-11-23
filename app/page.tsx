'use client'

import Link from 'next/link'
import { pl } from '@/lib/translations'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {pl.app.name}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {pl.app.tagline}
          </p>
          <p className="text-gray-500">
            {pl.app.description}
          </p>
        </header>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Muzyka bez ZAIKS
            </h2>
            <p className="text-gray-600 mb-6">
              Generuj nieograniczoną ilość muzyki bez opłat licencyjnych.
              Idealne dla restauracji, kawiarni, sklepów, spa i siłowni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Zacznij teraz
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-900 text-lg font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                {pl.auth.login}
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🎵</div>
              <h3 className="font-semibold text-gray-900 mb-2">4 kliknięcia</h3>
              <p className="text-sm text-gray-600">
                Wybierz typ biznesu, porę dnia, gatunek i gotowe!
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Natychmiastowo</h3>
              <p className="text-sm text-gray-600">
                Muzyka zaczyna grać w ciągu 15 sekund
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Oszczędność</h3>
              <p className="text-sm text-gray-600">
                99-149 PLN/miesiąc zamiast 200-400 PLN za ZAIKS
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Cennik
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">Basic</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                99 PLN<span className="text-sm font-normal text-gray-500">/miesiąc</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Nieograniczone playlisty</li>
                <li>✓ Wszystkie gatunki</li>
                <li>✓ Podstawowe wsparcie</li>
              </ul>
            </div>
            <div className="border-2 border-primary-500 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                Popularne
              </div>
              <h3 className="font-semibold text-lg mb-2">Pro</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                149 PLN<span className="text-sm font-normal text-gray-500">/miesiąc</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Wszystko z Basic</li>
                <li>✓ Tryb offline</li>
                <li>✓ Harmonogram odtwarzania</li>
                <li>✓ Priorytetowe wsparcie</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>&copy; 2024 MuzykaDlaBiznesu. Wszelkie prawa zastrzeżone.</p>
        </footer>
      </div>
    </main>
  )
}
