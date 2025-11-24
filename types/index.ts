export type BusinessType = 'restaurant' | 'cafe' | 'retail' | 'spa' | 'gym' | 'hotel'

export type TimeOfDay = 'morning' | 'lunch' | 'dinner' | 'evening' | 'late_night'

export type Genre = 'jazz' | 'classical' | 'acoustic' | 'bossa_nova' | 'ambient' | 'electronic' | 'pop' | 'blues'

export interface MusicPreferences {
  businessType: BusinessType | null
  timeOfDay: TimeOfDay | null
  genre: Genre | null
  energy: number // 1-5 scale
}

export interface Track {
  id: string
  title: string
  duration: number
  url: string
}

export interface Playlist {
  id: string
  name: string
  tracks: Track[]
  preferences: MusicPreferences
  createdAt: Date
  userId: string
}

export interface User {
  id: string
  email: string
  businessName?: string
  createdAt: Date
}

export interface GenerationStep {
  step: number
  title: string
  completed: boolean
}
