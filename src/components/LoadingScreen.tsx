import { useState } from 'react'

const BIRTHDAY_COLORS = [
  '#e8799a', // H - pink
  '#f6a623', // a - orange
  '#f7d046', // p - yellow
  '#7ec8ff', // p - sky blue
  '#a8e06c', // y - green
  'transparent', // (space)
  '#c084fc', // B - purple
  '#fb7185', // i - rose
  '#2ac5cf', // r - teal
  '#f6a623', // t - orange
  '#a8e06c', // h - green
  '#7ec8ff', // d - sky blue
  '#e8799a', // a - pink
  '#c084fc', // y - purple
]

interface Props {
  progress: number
  ready: boolean
  onEnter: () => void
}

export function LoadingScreen({ progress, ready, onEnter }: Props) {
  const [fading, setFading] = useState(false)

  const handleClick = () => {
    if (!ready) return
    onEnter()
    setFading(true)
  }

  const handleTransitionEnd = () => {
    // After fade-out completes, nothing more to do — parent unmounts us
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1a1a] transition-opacity duration-[600ms]"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}
      onTransitionEnd={handleTransitionEnd}
    >
      <p
        className="text-white/80 tracking-widest mb-8"
        style={{ fontFamily: 'Palatino, "Palatino Linotype", serif', fontStyle: 'italic', fontSize: ready ? '2.5rem' : '1.125rem' }}
      >
        {ready
          ? 'Happy Birthday'.split('').map((ch, i) => (
              <span key={i} style={{ color: BIRTHDAY_COLORS[i] }}>{ch === ' ' ? '\u00A0' : ch}</span>
            ))
          : 'Loading memories...'}
      </p>

      {!ready && (
        <>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e8799a] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>

          <p className="text-white/40 text-xs mt-3 tracking-wider tabular-nums">
            {Math.round(progress * 100)}%
          </p>
        </>
      )}

      {ready && (
        <button
          onClick={handleClick}
          className="mt-2 px-8 py-2.5 rounded-full text-white/90 text-sm tracking-widest uppercase border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/40 cursor-pointer"
          style={{ fontFamily: 'Palatino, "Palatino Linotype", serif' }}
        >
          Open
        </button>
      )}
    </div>
  )
}
