'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pl } from '@/lib/translations'

interface SavedPlaylist {
  id: string
  name: string
  trackCount: number
  duration: string
  createdAt: string
}

// Mock data for saved playlists
const mockPlaylists: SavedPlaylist[] = [
  { id: '1', name: 'Poranek w kawiarni', trackCount: 12, duration: '2h 15min', createdAt: '2024-01-15' },
  { id: '2', name: 'Kolacja romantyczna', trackCount: 8, duration: '1h 45min', createdAt: '2024-01-14' },
  { id: '3', name: 'Popołudniowy jazz', trackCount: 15, duration: '3h 00min', createdAt: '2024-01-10' },
]

export default function PlaylistsPage() {
  const [playlists] = useState<SavedPlaylist[]>(mockPlaylists)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {pl.playlist.savedPlaylists}
            </h1>
            <p className="text-gray-600 mt-1">
              {playlists.length} playlists
            </p>
          </div>
          <Link
            href="/generate"
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            {pl.playlist.newPlaylist}
          </Link>
        </div>

        {/* Playlist Grid */}
        {playlists.length > 0 ? (
          <div className="grid gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎵</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{playlist.name}</h3>
                  <p className="text-sm text-gray-500">
                    {playlist.trackCount} {pl.playlist.tracks} · {playlist.duration}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {pl.playlist.empty}
            </h3>
            <p className="text-gray-600 mb-6">
              Stwórz swoją pierwszą playlistę
            </p>
            <Link
              href="/generate"
              className="inline-flex px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              {pl.playlist.newPlaylist}
            </Link>
          </div>
        )}

        {/* Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex justify-around">
            <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-primary-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span className="text-xs mt-1">Start</span>
            </Link>
            <Link href="/generate" className="flex flex-col items-center text-gray-500 hover:text-primary-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              <span className="text-xs mt-1">Generuj</span>
            </Link>
            <Link href="/playlists" className="flex flex-col items-center text-primary-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
              </svg>
              <span className="text-xs mt-1">Playlisty</span>
            </Link>
          </div>
        </nav>
      </div>
    </main>
  )
}
