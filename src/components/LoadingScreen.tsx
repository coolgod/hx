import { useState, useEffect } from 'react'

interface Props {
  progress: number
  ready: boolean
  onTransitionEnd: () => void
}

export function LoadingScreen({ progress, ready, onTransitionEnd }: Props) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => setFading(true), 300)
      return () => clearTimeout(timer)
    }
  }, [ready])

  const handleTransitionEnd = () => {
    if (fading) onTransitionEnd()
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1a1a] transition-opacity duration-[600ms]"
      style={{ opacity: fading ? 0 : 1 }}
      onTransitionEnd={handleTransitionEnd}
    >
      <p
        className="text-white/80 text-lg tracking-widest mb-6"
        style={{ fontFamily: 'Palatino, "Palatino Linotype", serif', fontStyle: 'italic' }}
      >
        Loading memories...
      </p>

      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#e8799a] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <p className="text-white/40 text-xs mt-3 tracking-wider tabular-nums">
        {Math.round(progress * 100)}%
      </p>
    </div>
  )
}
