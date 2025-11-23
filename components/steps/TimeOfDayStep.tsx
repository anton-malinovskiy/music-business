'use client'

import { TimeOfDay } from '@/types'
import { pl } from '@/lib/translations'

interface Props {
  onSelect: (time: TimeOfDay) => void
}

const times: { time: TimeOfDay; icon: string; hours: string }[] = [
  { time: 'morning', icon: '🌅', hours: '6:00 - 11:00' },
  { time: 'lunch', icon: '☀️', hours: '11:00 - 14:00' },
  { time: 'dinner', icon: '🍽️', hours: '14:00 - 20:00' },
  { time: 'evening', icon: '🌆', hours: '20:00 - 23:00' },
  { time: 'late_night', icon: '🌙', hours: '23:00 - 6:00' },
]

export default function TimeOfDayStep({ onSelect }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {pl.steps.timeOfDay}
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Kiedy będziesz odtwarzać muzykę?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {times.map(({ time, icon, hours }) => (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-2 border-transparent hover:border-primary-500 transition-all"
          >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {pl.timeOfDay[time]}
            </h3>
            <p className="text-sm text-gray-500">{hours}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
