import { NextRequest, NextResponse } from 'next/server'
import { MusicPreferences } from '@/types'
import { buildPrompt } from '@/lib/promptBuilder'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

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
