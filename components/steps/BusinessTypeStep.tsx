'use client'

import { BusinessType } from '@/types'
import { pl } from '@/lib/translations'

interface Props {
  onSelect: (type: BusinessType) => void
}

const businessTypes: { type: BusinessType; icon: string; description: string }[] = [
  { type: 'restaurant', icon: '🍽️', description: 'Elegancka atmosfera dla gości' },
  { type: 'cafe', icon: '☕', description: 'Przytulna i relaksująca' },
  { type: 'retail', icon: '🛍️', description: 'Zachęcająca do zakupów' },
  { type: 'spa', icon: '🧘', description: 'Spokojna i odprężająca' },
  { type: 'gym', icon: '💪', description: 'Motywująca do ćwiczeń' },
  { type: 'hotel', icon: '🏨', description: 'Elegancka i uniwersalna' },
]

export default function BusinessTypeStep({ onSelect }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {pl.steps.businessType}
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Wybierz typ swojego biznesu
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {businessTypes.map(({ type, icon, description }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-2 border-transparent hover:border-primary-500 transition-all text-left"
          >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {pl.businessTypes[type]}
            </h3>
            <p className="text-sm text-gray-500">{description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
