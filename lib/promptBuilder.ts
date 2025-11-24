import { MusicPreferences } from '@/types'

// Maximum character limit for ElevenLabs API
export const MAX_PROMPT_LENGTH = 450

// Business atmosphere descriptions
export const businessDescriptions: Record<string, string> = {
  restaurant: 'upscale restaurant',
  cafe: 'cozy cafe',
  retail: 'retail space',
  spa: 'spa sanctuary',
  gym: 'fitness gym',
  hotel: 'hotel lobby',
}

// Time-based mood descriptions
export const timeDescriptions: Record<string, string> = {
  morning: 'morning, fresh and bright',
  lunch: 'midday, balanced flow',
  dinner: 'evening, warm and sophisticated',
  evening: 'late evening, relaxed',
  late_night: 'late night, mellow and intimate',
}

// Genre descriptions with instrumentation
export const genreDescriptions: Record<string, string> = {
  jazz: 'Smooth jazz with warm saxophone, brushed drums, walking bass, muted trumpet, subtle piano. Sophisticated, intimate atmosphere',
  classical: 'Classical piano with elegant arpeggios, gentle strings, soft woodwinds. Timeless, refined ambiance',
  acoustic: 'Acoustic guitar fingerpicking, soft percussion, light bass, string pads. Earthy, organic warmth',
  bossa_nova: 'Bossa nova with nylon guitar, brushed percussion, smooth bass, flute accents. Relaxed tropical elegance',
  ambient: 'Ambient pads, subtle textures, gentle drones, spacious reverb. Calm, meditative, hypnotic atmosphere',
  electronic: 'Electronic chill with minimal beats, warm synth pads, light plucks, airy textures. Modern, atmospheric vibe',
  pop: 'Soft pop instrumental with melodic hooks, acoustic-electronic blend, smooth bass. Pleasant, polished production',
}

// Energy level descriptions
export const energyDescriptions: Record<number, string> = {
  1: 'Very calm, slow tempo, minimal, soft',
  2: 'Calm, relaxed tempo, light arrangement',
  3: 'Moderate tempo, balanced, steady groove',
  4: 'Upbeat, faster tempo, dynamic, positive',
  5: 'Energetic, quick tempo, powerful momentum',
}

// Build prompt for ElevenLabs API (max 450 chars)
export function buildPrompt(preferences: MusicPreferences): string {
  const genre = genreDescriptions[preferences.genre!]
  const energy = energyDescriptions[(preferences.energy || 3) as keyof typeof energyDescriptions]
  const business = businessDescriptions[preferences.businessType!]
  const time = timeDescriptions[preferences.timeOfDay!]

  return `${genre}. ${energy}. Background music for ${business} during ${time}. Instrumental.`
}

// Validate that a prompt meets ElevenLabs requirements
export function validatePrompt(prompt: string): { valid: boolean; length: number; error?: string } {
  const length = prompt.length

  if (length === 0) {
    return { valid: false, length, error: 'Prompt cannot be empty' }
  }

  if (length > MAX_PROMPT_LENGTH) {
    return { valid: false, length, error: `Prompt exceeds ${MAX_PROMPT_LENGTH} character limit (got ${length})` }
  }

  return { valid: true, length }
}
