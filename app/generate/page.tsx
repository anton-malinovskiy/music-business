'use client'

import { useState } from 'react'
import { BusinessType, TimeOfDay, Genre, MusicPreferences, Track } from '@/types'
import { pl } from '@/lib/translations'
import BusinessTypeStep from '@/components/steps/BusinessTypeStep'
import TimeOfDayStep from '@/components/steps/TimeOfDayStep'
import GenreStep from '@/components/steps/GenreStep'
import GeneratingStep from '@/components/steps/GeneratingStep'
import PlayerView from '@/components/steps/PlayerView'

export default function GeneratePage() {
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState<MusicPreferences>({
    businessType: null,
    timeOfDay: null,
    genre: null,
    energy: 3,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [playlistReady, setPlaylistReady] = useState(false)
  const [generatedTracks, setGeneratedTracks] = useState<Track[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleBusinessType = (type: BusinessType) => {
    setPreferences({ ...preferences, businessType: type })
    setStep(2)
  }

  const handleTimeOfDay = (time: TimeOfDay) => {
    setPreferences({ ...preferences, timeOfDay: time })
    setStep(3)
  }

  const handleGenre = (genre: Genre, energy: number) => {
    setPreferences({ ...preferences, genre, energy })
    handleGenerate({ ...preferences, genre, energy })
  }

  const handleGenerate = async (prefs: MusicPreferences) => {
    setIsGenerating(true)
    setStep(4)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prefs),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setGeneratedTracks(data.playlist.tracks)
      setPlaylistReady(true)
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
      setStep(3) // Go back to genre selection
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleReset = () => {
    setStep(1)
    setPreferences({
      businessType: null,
      timeOfDay: null,
      genre: null,
      energy: 3,
    })
    setPlaylistReady(false)
    setGeneratedTracks([])
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      {!playlistReady && (
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Krok {step} z 4
              </span>
              {step > 1 && !isGenerating && (
                <button
                  onClick={handleBack}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  {pl.actions.back}
                </button>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {step === 1 && (
          <BusinessTypeStep onSelect={handleBusinessType} />
        )}

        {step === 2 && (
          <TimeOfDayStep onSelect={handleTimeOfDay} />
        )}

        {step === 3 && (
          <GenreStep
            onSelect={handleGenre}
            initialEnergy={preferences.energy}
          />
        )}

        {step === 4 && isGenerating && (
          <GeneratingStep preferences={preferences} />
        )}

        {playlistReady && (
          <PlayerView
            preferences={preferences}
            onNewPlaylist={handleReset}
            tracks={generatedTracks}
          />
        )}

        {error && step === 3 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>
    </main>
  )
}
