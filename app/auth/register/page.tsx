'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { pl } from '@/lib/translations'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For MVP, just redirect to generate page
    router.push('/generate')
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            {pl.app.name}
          </Link>
          <p className="text-gray-600 mt-2">{pl.auth.register}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {pl.auth.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="twoj@email.pl"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {pl.auth.password}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="Min. 8 znaków"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Rejestracja...' : pl.auth.register}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Rejestrując się, akceptujesz regulamin i politykę prywatności.
          </p>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          {pl.auth.hasAccount}{' '}
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
            {pl.auth.login}
          </Link>
        </p>
      </div>
    </main>
  )
}
