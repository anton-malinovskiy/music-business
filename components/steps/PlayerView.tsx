'use client'

import { useState } from 'react'
import { MusicPreferences, Track } from '@/types'
import { pl } from '@/lib/translations'

interface Props {
  preferences: MusicPreferences
  onNewPlaylist: () => void
  tracks?: Track[]
}

// Default tracks for demo/fallback
const defaultTracks: Track[] = [
  { id: '1', title: 'Ambient Morning', duration: 245, url: '' },
  { id: '2', title: 'Soft Piano Dreams', duration: 312, url: '' },
  { id: '3', title: 'Gentle Jazz Flow', duration: 287, url: '' },
  { id: '4', title: 'Relaxing Waves', duration: 198, url: '' },
  { id: '5', title: 'Cafe Afternoon', duration: 256, url: '' },
  { id: '6', title: 'Evening Chill', duration: 334, url: '' },
  { id: '7', title: 'Sunset Melody', duration: 278, url: '' },
  { id: '8', title: 'Night Whispers', duration: 301, url: '' },
]

export default function PlayerView({ preferences, onNewPlaylist, tracks }: Props) {
  // Use provided tracks or fall back to default
  const playlistTracks = tracks && tracks.length > 0 ? tracks : defaultTracks
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [playlistName, setPlaylistName] = useState('Moja playlista')
  const [isEditing, setIsEditing] = useState(false)

  const currentTrack = playlistTracks[currentTrackIndex]
  const totalDuration = playlistTracks.reduce((acc, track) => acc + track.duration, 0)

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hrs > 0) {
      return `${hrs}h ${mins}min`
    }
    return `${mins}min`
  }

  const formatTrackTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlistTracks.length)
  }

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlistTracks.length) % playlistTracks.length)
  }

  const handleSave = () => {
    alert('Playlista zapisana!')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {isEditing ? (
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              className="text-2xl font-bold text-gray-900 border-b-2 border-primary-500 outline-none bg-transparent"
              autoFocus
            />
          ) : (
            <h2
              className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-primary-600"
              onClick={() => setIsEditing(true)}
            >
              {playlistName}
            </h2>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {playlistTracks.length} {pl.playlist.tracks} · {formatTime(totalDuration)}
          </p>
        </div>
        <button
          onClick={onNewPlaylist}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          {pl.playlist.newPlaylist}
        </button>
      </div>

      {/* Now Playing */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎵</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{currentTrack.title}</h3>
            <p className="text-sm text-gray-500">{formatTrackTime(currentTrack.duration)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: '35%' }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1:24</span>
            <span>{formatTrackTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button
            onClick={handlePlayPause}
            className="p-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            onClick={handleNext}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="divide-y divide-gray-100">
          {playlistTracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => setCurrentTrackIndex(index)}
              className={`w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors ${
                index === currentTrackIndex ? 'bg-primary-50' : ''
              }`}
            >
              <span className="w-6 text-sm text-gray-400">{index + 1}</span>
              <div className="flex-1">
                <h4 className={`font-medium ${
                  index === currentTrackIndex ? 'text-primary-600' : 'text-gray-900'
                }`}>
                  {track.title}
                </h4>
              </div>
              <span className="text-sm text-gray-500">{formatTrackTime(track.duration)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          {pl.actions.save}
        </button>
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          {pl.actions.download}
        </button>
      </div>
    </div>
  )
}
