import { NextRequest, NextResponse } from 'next/server'
import { MusicPreferences } from '@/types'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

// Map preferences to detailed prompts for ElevenLabs (max 450 chars)
function buildPrompt(preferences: MusicPreferences): string {
  // Concise business atmosphere
  const businessDescriptions: Record<string, string> = {
    restaurant: 'upscale restaurant',
    cafe: 'cozy cafe',
    retail: 'retail space',
    spa: 'spa sanctuary',
    gym: 'fitness gym',
    hotel: 'hotel lobby',
  }

  // Time-based mood
  const timeDescriptions: Record<string, string> = {
    morning: 'morning, fresh and bright',
    lunch: 'midday, balanced flow',
    dinner: 'evening, warm and sophisticated',
    evening: 'late evening, relaxed',
    late_night: 'late night, mellow and intimate',
  }

  // Detailed genre with instrumentation (kept concise)
  const genreDescriptions: Record<string, string> = {
    jazz: 'Smooth jazz with warm saxophone, brushed drums, walking bass, muted trumpet, subtle piano. Sophisticated, intimate atmosphere',
    classical: 'Classical piano with elegant arpeggios, gentle strings, soft woodwinds. Timeless, refined ambiance',
    acoustic: 'Acoustic guitar fingerpicking, soft percussion, light bass, string pads. Earthy, organic warmth',
    bossa_nova: 'Bossa nova with nylon guitar, brushed percussion, smooth bass, flute accents. Relaxed tropical elegance',
    ambient: 'Ambient pads, subtle textures, gentle drones, spacious reverb. Calm, meditative, hypnotic atmosphere',
    electronic: 'Electronic chill with minimal beats, warm synth pads, light plucks, airy textures. Modern, atmospheric vibe',
    pop: 'Soft pop instrumental with melodic hooks, acoustic-electronic blend, smooth bass. Pleasant, polished production',
  }

  // Energy descriptions
  const energyDescriptions: Record<number, string> = {
    1: 'Very calm, slow tempo, minimal, soft',
    2: 'Calm, relaxed tempo, light arrangement',
    3: 'Moderate tempo, balanced, steady groove',
    4: 'Upbeat, faster tempo, dynamic, positive',
    5: 'Energetic, quick tempo, powerful momentum',
  }

  const energy = energyDescriptions[(preferences.energy || 3) as keyof typeof energyDescriptions]

  return `${genreDescriptions[preferences.genre!]}. ${energy}. Background music for ${businessDescriptions[preferences.businessType!]} during ${timeDescriptions[preferences.timeOfDay!]}. Instrumental.`
}

export async function POST(request: NextRequest) {
  try {
    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: 'ElevenLabs API not configured' },
        { status: 500 }
      )
    }

    const preferences: MusicPreferences = await request.json()

    // Validate preferences
    if (!preferences.businessType || !preferences.timeOfDay || !preferences.genre) {
      return NextResponse.json(
        { error: 'Missing required preferences' },
        { status: 400 }
      )
    }

    const prompt = buildPrompt(preferences)

    // Generate multiple tracks using ElevenLabs Sound Effects API
    const tracks = []
    const trackCount = 3 // Start with fewer tracks to test

    for (let i = 0; i < trackCount; i++) {
      const response = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: `${prompt}, variation ${i + 1}`,
          duration_seconds: 10,
          prompt_influence: 0.3,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`ElevenLabs error for track ${i + 1}:`, response.status, errorText)
        // Return the actual error on first failure for debugging
        if (i === 0) {
          return NextResponse.json(
            { error: `ElevenLabs API error: ${response.status} - ${errorText}` },
            { status: 500 }
          )
        }
        continue
      }

      // ElevenLabs returns audio directly as binary
      const audioBuffer = await response.arrayBuffer()
      const base64Audio = Buffer.from(audioBuffer).toString('base64')
      const audioUrl = `data:audio/mpeg;base64,${base64Audio}`

      tracks.push({
        id: `track-${Date.now()}-${i + 1}`,
        title: `${preferences.genre} ${i + 1}`,
        duration: 10,
        url: audioUrl,
      })
    }

    if (tracks.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate any tracks' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      playlist: {
        id: `playlist-${Date.now()}`,
        name: `${preferences.genre} - ${preferences.timeOfDay}`,
        tracks,
        preferences,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
