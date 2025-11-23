'use client'

import { MusicPreferences } from '@/types'
import { pl } from '@/lib/translations'

interface Props {
  preferences: MusicPreferences
}

export default function GeneratingStep({ preferences }: Props) {
  return (
    <div className="text-center py-12">
      {/* Animated Icon */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full animate-pulse">
          <span className="text-4xl">🎵</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {pl.actions.generating}
      </h2>

      <p className="text-gray-600 mb-6">
        Tworzymy playlistę idealną dla Twojego biznesu
      </p>

      {/* Preferences Summary */}
      <div className="inline-flex flex-wrap gap-2 justify-center">
        {preferences.businessType && (
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
            {pl.businessTypes[preferences.businessType]}
          </span>
        )}
        {preferences.timeOfDay && (
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
            {pl.timeOfDay[preferences.timeOfDay]}
          </span>
        )}
        {preferences.genre && (
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
            {pl.genres[preferences.genre]}
          </span>
        )}
      </div>

      {/* Loading Bar */}
      <div className="mt-8 max-w-xs mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary-600 h-1.5 rounded-full animate-[loading_2s_ease-in-out_infinite]"
               style={{ width: '60%' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}
