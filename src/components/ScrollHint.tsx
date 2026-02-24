import { useEffect, useRef, useState } from 'react'

interface Props {
  progress: number
  total: number
  hidden?: boolean
}

const HIDE_DURATION = 2000  // ms to stay hidden after scrolling stops

export function ScrollHint({ progress, total, hidden = false }: Props) {
  const isTransitioning = progress !== Math.round(progress)
  const currentSection = Math.round(progress)
  const isFirst = currentSection === 0
  const isLast = currentSection === total - 1

  const [visible, setVisible] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isTransitioning) {
      setVisible(false)
      if (timerRef.current) clearTimeout(timerRef.current)
    } else {
      timerRef.current = setTimeout(() => {
        setAnimKey(k => k + 1)  // remount SVGs to restart animation from frame 0
        setVisible(true)
      }, HIDE_DURATION)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isTransitioning])

  const opacity = (visible && !hidden) ? 1 : 0
  const transition = visible ? 'opacity 0.4s ease' : 'opacity 0.2s ease'

  return (
    <>
      {/* Up chevron — invisible on first section */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[200] pointer-events-none flex flex-col items-center gap-1"
        style={{ top: '18px', opacity: isFirst ? 0 : opacity, transition }}
      >
        <svg key={animKey} className="chevron-bounce-up" width="28" height="16" viewBox="0 0 28 16" fill="none">
          <path d="M2 14 L14 2 L26 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Down chevron — invisible on last section */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[200] pointer-events-none flex flex-col items-center gap-1"
        style={{ bottom: '18px', opacity: isLast ? 0 : opacity, transition }}
      >
        <svg key={animKey} className="chevron-bounce" width="28" height="16" viewBox="0 0 28 16" fill="none">
          <path d="M2 2 L14 14 L26 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  )
}
