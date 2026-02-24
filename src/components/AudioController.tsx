import { useRef, useState, useCallback } from 'react'

interface Props {
  audioSrc?: string
}

export function AudioController({ audioSrc }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !audioSrc) return

    if (!audio.paused) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Autoplay blocked — user gesture already happened here so this
        // branch is unlikely, but guard gracefully.
      }
    }
  }, [audioSrc])

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        {audioSrc && <source src={audioSrc} type="audio/mpeg" />}
      </audio>

      <button
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={audioSrc ? (playing ? 'Pause music' : 'Play music') : 'No audio track yet'}
        className={`
          fixed top-4 right-5 z-50
          w-10 h-10 rounded-full
          flex items-center justify-center
          text-lg font-medium
          bg-white/60 backdrop-blur-md
          shadow-md border border-white/40
          transition-all duration-200
          hover:bg-white/85
          ${!audioSrc ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {playing ? '⏸' : '♪'}
      </button>
    </>
  )
}
