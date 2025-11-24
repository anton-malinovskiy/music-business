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
  blues: '', // Blues uses special handling with subgenres
}

// Blues subgenre prompts - optimized for 450 char limit
export const bluesSubgenres: Record<string, string> = {
  chicago: 'Chicago electric blues, 1950s urban style, electric guitar with warm tube amp, amplified harmonica, walking upright bass, shuffle drums with brushes, piano comping, 12-bar progression, soulful nightclub atmosphere, 90-110 BPM, instrumental, no vocals, consistent volume',
  delta: 'Delta blues, acoustic slide guitar, raw emotional fingerpicking, solo acoustic, blues scale with expressive bends, melancholic haunting atmosphere, vintage warmth, Mississippi roots, sparse arrangement, 70-85 BPM, instrumental, no vocals, consistent volume',
  texas: 'Texas blues shuffle, electric guitar with jazz-influenced phrasing, 9th chords, horn section with saxophone, swing rhythm, confident powerful tone, chromatic runs, full band, warm analog production, 100-120 BPM, instrumental, no vocals, consistent volume',
  jump: 'Jump blues, upbeat swing rhythm, big band horns with brass and saxophone, boogie-woogie piano, walking bass, energetic drums, 1940s vintage style, danceable cheerful groove, classic production, 130-145 BPM, instrumental, no vocals, consistent volume',
  slow: 'Slow blues ballad, expressive electric guitar with vibrato and bends, minor key 12-bar, emotional introspective mood, sparse arrangement, soft piano, brushed drums, upright bass, smoky late-night atmosphere, 60-75 BPM, instrumental, no vocals, consistent volume',
  piedmont: 'Piedmont blues, acoustic fingerpicking guitar, ragtime influenced, syncopated melodic rhythm, light warm sunny atmosphere, East Coast feel, clean acoustic production, gentle shuffle, pleasant relaxed mood, 85-100 BPM, instrumental, no vocals, consistent volume',
  boogie: 'Boogie-woogie blues, piano-driven with rolling left hand bass pattern, rhythmic right hand melodies, upright bass, swing drums, 1940s juke joint atmosphere, energetic fun groove, vintage piano tone, warm production, 120-135 BPM, instrumental, no vocals, consistent volume',
  west_coast: 'West Coast blues, smooth electric guitar with clean jazz tone, sophisticated extended chord progressions, piano and organ, tight rhythm section, polished refined sound, cool relaxed atmosphere, professional production, 95-110 BPM, instrumental, no vocals, consistent volume',
}

// Select appropriate blues subgenre based on context
export function selectBluesSubgenre(
  businessType: string,
  timeOfDay: string,
  energy: number
): string {
  // Late night always gets slow blues
  if (timeOfDay === 'late_night') {
    return 'slow'
  }

  // Morning/brunch gets lighter styles
  if (timeOfDay === 'morning') {
    if (energy <= 2) return 'delta'
    return 'piedmont'
  }

  // Lunch service
  if (timeOfDay === 'lunch') {
    if (energy >= 4) return 'boogie'
    if (energy <= 2) return 'piedmont'
    return 'texas'
  }

  // Dinner/evening - match to business type
  if (timeOfDay === 'dinner' || timeOfDay === 'evening') {
    // Upscale venues get sophisticated styles
    if (businessType === 'hotel' || businessType === 'spa') {
      return 'west_coast'
    }
    if (businessType === 'restaurant') {
      if (energy >= 4) return 'texas'
      return 'chicago'
    }
    // Cafes get more intimate styles
    if (businessType === 'cafe') {
      if (energy <= 2) return 'delta'
      return 'chicago'
    }
    // Retail/gym get energetic styles
    if (businessType === 'retail' || businessType === 'gym') {
      if (energy >= 4) return 'jump'
      return 'texas'
    }
    return 'chicago'
  }

  // Default fallback
  return 'chicago'
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
  // Special handling for blues - use subgenre system
  if (preferences.genre === 'blues') {
    const subgenre = selectBluesSubgenre(
      preferences.businessType!,
      preferences.timeOfDay!,
      preferences.energy || 3
    )
    return bluesSubgenres[subgenre]
  }

  // Standard handling for other genres
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
