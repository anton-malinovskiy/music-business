import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all playlists for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 401 }
      )
    }

    const playlists = await prisma.playlist.findMany({
      where: { userId },
      include: {
        tracks: {
          orderBy: { position: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ playlists })
  } catch (error) {
    console.error('Get playlists error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create a new playlist
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 401 }
      )
    }

    const { name, preferences, tracks } = await request.json()

    if (!name || !preferences || !tracks) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const playlist = await prisma.playlist.create({
      data: {
        name,
        userId,
        businessType: preferences.businessType,
        timeOfDay: preferences.timeOfDay,
        genre: preferences.genre,
        energy: preferences.energy || 3,
        tracks: {
          create: tracks.map((track: any, index: number) => ({
            title: track.title,
            duration: track.duration,
            audioUrl: track.url,
            position: index,
          })),
        },
      },
      include: {
        tracks: true,
      },
    })

    return NextResponse.json({
      success: true,
      playlist,
    })
  } catch (error) {
    console.error('Create playlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE a playlist
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    const { searchParams } = new URL(request.url)
    const playlistId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 401 }
      )
    }

    if (!playlistId) {
      return NextResponse.json(
        { error: 'Playlist ID required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const playlist = await prisma.playlist.findFirst({
      where: { id: playlistId, userId },
    })

    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      )
    }

    await prisma.playlist.delete({
      where: { id: playlistId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete playlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
