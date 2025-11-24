'use client'

import { useState } from 'react'
import { Genre } from '@/types'
import { pl } from '@/lib/translations'

interface Props {
  onSelect: (genre: Genre, energy: number) => void
  initialEnergy: number
}

const genres: { genre: Genre; icon: string; color: string }[] = [
  { genre: 'jazz', icon: '🎷', color: 'bg-amber-100 hover:bg-amber-200' },
  { genre: 'classical', icon: '🎻', color: 'bg-purple-100 hover:bg-purple-200' },
  { genre: 'acoustic', icon: '🎸', color: 'bg-green-100 hover:bg-green-200' },
  { genre: 'bossa_nova', icon: '🌴', color: 'bg-teal-100 hover:bg-teal-200' },
  { genre: 'ambient', icon: '🌊', color: 'bg-blue-100 hover:bg-blue-200' },
  { genre: 'electronic', icon: '🎹', color: 'bg-pink-100 hover:bg-pink-200' },
  { genre: 'pop', icon: '🎤', color: 'bg-orange-100 hover:bg-orange-200' },
  { genre: 'blues', icon: '🎺', color: 'bg-indigo-100 hover:bg-indigo-200' },
]

export default function GenreStep({ onSelect, initialEnergy }: Props) {
  const [energy, setEnergy] = useState(initialEnergy)
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre)
  }

  const handleConfirm = () => {
    if (selectedGenre) {
      onSelect(selectedGenre, energy)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {pl.steps.genre}
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Wybierz styl muzyczny
      </p>

      {/* Genre Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {genres.map(({ genre, icon, color }) => (
          <button
            key={genre}
            onClick={() => handleGenreSelect(genre)}
            className={`rounded-xl p-5 transition-all border-2 ${
              selectedGenre === genre
                ? 'border-primary-500 ring-2 ring-primary-200'
                : 'border-transparent'
            } ${color}`}
          >
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {pl.genres[genre]}
            </h3>
          </button>
        ))}
      </div>

      {/* Energy Slider */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          {pl.energy.label}
        </label>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 w-20">{pl.energy.calm}</span>
          <input
            type="range"
            min="1"
            max="5"
            value={energy}
            onChange={(e) => setEnergy(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <span className="text-sm text-gray-500 w-24 text-right">{pl.energy.energetic}</span>
        </div>
        <div className="flex justify-between mt-2 px-10">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`w-2 h-2 rounded-full ${
                n <= energy ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleConfirm}
        disabled={!selectedGenre}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
          selectedGenre
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {pl.actions.generate}
      </button>
    </div>
  )
}
