import { NextRequest, NextResponse } from 'next/server'
import { MusicPreferences } from '@/types'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

// Map preferences to detailed, cinematic prompts for ElevenLabs
function buildPrompt(preferences: MusicPreferences): string {
  // Detailed atmospheric descriptions for each business type
  const businessDescriptions: Record<string, string> = {
    restaurant: 'upscale dining atmosphere with warm, inviting ambiance',
    cafe: 'cozy coffee shop with intimate, relaxed setting',
    retail: 'modern retail space with sophisticated shopping experience',
    spa: 'serene spa and wellness sanctuary with peaceful, healing atmosphere',
    gym: 'high-energy fitness environment with motivating drive',
    hotel: 'elegant hotel lobby with refined, welcoming presence',
  }

  // Time-based mood and atmosphere descriptions
  const timeDescriptions: Record<string, string> = {
    morning: 'early morning with fresh, awakening energy and gentle brightness',
    lunch: 'midday atmosphere with balanced, moderate-paced flow',
    dinner: 'evening dining with sophisticated, warm golden-hour mood',
    evening: 'late evening with relaxed, unwinding contemplative feel',
    late_night: 'late night with mellow, intimate, subdued atmosphere',
  }

  // Detailed genre descriptions with instrumentation and production style
  const genreDescriptions: Record<string, string> = {
    jazz: 'smooth jazz with warm saxophone melodies, soft brushed drums, walking basslines, muted trumpet accents, and subtle piano chords creating a sophisticated, intimate atmosphere',
    classical: 'classical composition with elegant piano arpeggios, gentle string arrangements, soft woodwind accents, and refined orchestral textures creating a timeless, cultured ambiance',
    acoustic: 'acoustic arrangement with fingerpicked guitar, soft percussion, light bass, subtle string pads, and natural organic warmth creating an earthy, authentic feel',
    bossa_nova: 'bossa nova with gentle nylon guitar patterns, soft brushed percussion, smooth bass grooves, subtle flute accents, and warm tropical elegance creating a relaxed, sophisticated mood',
    ambient: 'ambient soundscape with atmospheric pads, subtle textures, gentle drones, soft melodic elements, and spacious reverb creating a calm, meditative, hypnotic atmosphere',
    electronic: 'electronic chill with minimal smooth beats, warm synth pads, light plucks, subtle bass grooves, and airy textures creating a modern, atmospheric, meditative vibe',
    pop: 'soft pop instrumental with gentle melodic hooks, light acoustic and electronic blend, smooth bassline, subtle rhythmic elements, and polished production creating an accessible, pleasant atmosphere',
  }

  // Energy level descriptions with tempo and intensity
  const energyDescriptions: Record<number, string> = {
    1: 'very calm and peaceful with slow tempo, minimal arrangement, and soft dynamics',
    2: 'calm and gentle with relaxed tempo, light arrangement, and smooth flow',
    3: 'moderate and balanced with medium tempo, full arrangement, and steady groove',
    4: 'upbeat and lively with faster tempo, dynamic arrangement, and positive energy',
    5: 'energetic and driving with quick tempo, full dynamic range, and powerful momentum',
  }

  const energyLevel = energyDescriptions[(preferences.energy || 3) as keyof typeof energyDescriptions]

  return `${genreDescriptions[preferences.genre!]}. The mood is ${energyLevel}. Perfect background music for a ${businessDescriptions[preferences.businessType!]} during ${timeDescriptions[preferences.timeOfDay!]}. Instrumental, high-quality production, royalty-free.`
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
