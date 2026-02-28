import { useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react'

const AUDIO_SRC = import.meta.env.BASE_URL + 'audio/background.m4a'

export interface AudioControllerHandle {
  play: () => void
}

export const AudioController = forwardRef<AudioControllerHandle>(function AudioController(_, ref) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useImperativeHandle(ref, () => ({
    play: async () => {
      const audio = audioRef.current
      if (!audio) return
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Autoplay blocked — should not happen if called from user gesture
      }
    },
  }), [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Autoplay blocked
      }
    }
  }, [])

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={AUDIO_SRC} type="audio/mp4" />
      </audio>

      <button
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={playing ? 'Pause music' : 'Play music'}
        className={`
          fixed top-4 right-5 z-50
          w-10 h-10 rounded-full
          flex items-center justify-center
          text-lg font-medium
          bg-white/60 backdrop-blur-md
          shadow-md border border-white/40
          transition-all duration-200
          hover:bg-white/85
          cursor-pointer
        `}
      >
        {playing ? '⏸' : '♪'}
      </button>
    </>
  )
})
