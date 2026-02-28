import { useState, useCallback, useEffect } from 'react'
import React from 'react'
import { SeasonSection } from './components/SeasonSection'
import { PhotoModal } from './components/PhotoModal'
import { AudioController } from './components/AudioController'
import { SeamBlur } from './components/SeamBlur'
import { LoadingScreen } from './components/LoadingScreen'
import { seasonsData } from './data/photos'
import type { Photo } from './data/photos'
import { useScrollProgress, getSectionStyle } from './hooks/useScrollProgress'
import { useImagePreloader } from './hooks/useImagePreloader'
import { ScrollHint } from './components/ScrollHint'

// Build a flat lookup map for quick photo retrieval
const photoMap = new Map<string, Photo>()
for (const s of seasonsData) {
  for (const p of s.photos) {
    photoMap.set(p.id, p)
  }
}

// Collect all image URLs for preloading
const BASE = import.meta.env.BASE_URL
const allImageUrls: string[] = [
  ...['spring', 'summer', 'autumn', 'winter'].map(s => `${BASE}bg/${s}.webp`),
  ...seasonsData.flatMap(s => s.photos.map(p => `${BASE}${p.src}`)),
]

export default function App() {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null)
  const { progress, trackRef, scrollTo } = useScrollProgress(seasonsData.length, activePhoto !== null)
  const { progress: loadProgress, ready: loadReady } = useImagePreloader(allImageUrls)
  const [showLoading, setShowLoading] = useState(true)

  // Safety timeout: dismiss loading after 10s regardless
  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 10_000)
    return () => clearTimeout(timer)
  }, [])

  const openModal = useCallback((id: string) => {
    setActivePhoto(photoMap.get(id) ?? null)
  }, [])

  const closeModal = useCallback(() => setActivePhoto(null), [])

  // Detect the active transition: outgoing = floor(progress), incoming = ceil(progress)
  const outgoingIdx = Math.floor(progress)
  const incomingIdx = Math.ceil(progress)
  const isTransitioning = incomingIdx > outgoingIdx && incomingIdx < seasonsData.length

  const outgoingStyle = getSectionStyle(progress, outgoingIdx)
  const incomingStyle = getSectionStyle(progress, incomingIdx)
  const activeSeamVh = parseFloat(incomingStyle.translateY)
  const outGradient = `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,${outgoingStyle.scrimOpacity}) 100%)`
  const inGradient  = `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,${incomingStyle.scrimOpacity}) 100%)`

  return (
    <>
      {showLoading && (
        <LoadingScreen
          progress={loadProgress}
          ready={loadReady}
          onTransitionEnd={() => setShowLoading(false)}
        />
      )}

      {/* Music toggle */}
      <AudioController /* audioSrc="/audio/track.mp3" */ />

      {/*
        Scroll track — snap container, one 100vh snap point per season.
        SeasonSections are position:fixed so they live outside the flow.
      */}
      <div ref={trackRef} id="scroll-track">
        {seasonsData.map((season) => (
          <div key={season.season} className="snap-point" />
        ))}
      </div>

      {/* Fixed season sections and seam blurs */}
      {seasonsData.map((season, i) => {
        const { translateY, contentBlur, zIndex, hidden } = getSectionStyle(progress, i)
        const active = isTransitioning && outgoingIdx === i && i < seasonsData.length - 1
        const nextSeamVh = active ? parseFloat(getSectionStyle(progress, i + 1).translateY) : 100
        const heightVh = active ? (1 - Math.abs(nextSeamVh - 50) / 50) * 15 : 0
        return (
          <React.Fragment key={season.season}>
            <SeasonSection
              data={season}
              onPhotoClick={openModal}
              translateY={translateY}
              contentBlur={contentBlur}
              zIndex={zIndex}
              hidden={hidden}
            />
            {i < seasonsData.length - 1 && (
              <SeamBlur
                outgoing={season.season}
                incoming={seasonsData[i + 1].season}
                seamVh={nextSeamVh}
                opacity={active ? 1 : 0}
                heightVh={heightVh}
              />
            )}
          </React.Fragment>
        )
      })}

      {/* Scrim overlays — fixed, above SeamBlur (zIndex 99), darken the seam edges */}
      {isTransitioning && (
        <>
          <div
            className="fixed inset-x-0 pointer-events-none"
            style={{ top: 0, height: `${activeSeamVh}vh`, zIndex: 99, background: outGradient }}
          />
          <div
            className="fixed inset-x-0 pointer-events-none"
            style={{ top: `${activeSeamVh}vh`, bottom: 0, zIndex: 99, background: inGradient }}
          />
        </>
      )}

      {/* Photo detail modal */}
      <PhotoModal photo={activePhoto} onClose={closeModal} />

      {/* Scroll hint chevrons */}
      <ScrollHint progress={progress} total={seasonsData.length} hidden={activePhoto !== null} onScrollUp={() => scrollTo(Math.round(progress) - 1)} onScrollDown={() => scrollTo(Math.round(progress) + 1)} />
    </>
  )
}
