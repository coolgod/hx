import { useEffect, useRef, useState } from 'react'
import { PhotoCard } from './PhotoCard'
import type { SeasonData } from '../data/photos'

interface Props {
  data: SeasonData
  onPhotoClick: (photoId: string) => void
}

const ROPE_COLORS: Record<string, string> = {
  spring: '#d4457a',
  summer: '#00a8b8',
  autumn: '#c0392b',
  winter: '#7ec8ff',
}

// Quadratic bezier y at parameter t: P0=(0,4) Pc=(50,66) P1=(100,4)
function bezierY(t: number): number {
  return (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * 66 + t * t * 4
}

// Given x as fraction [0,1] of rope width, return sag offset in pixels
function ropeOffsetPx(xFraction: number, svgHeightPx: number): number {
  const y = bezierY(xFraction)
  return ((y - 4) / 70) * svgHeightPx
}

export function Clothesline({ data, onPhotoClick }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })
  const [pinOffsets, setPinOffsets] = useState<number[]>([])

  const computeOffsets = () => {
    const container = containerRef.current
    const svg = svgRef.current
    if (!container || !svg) return
    const svgRect = svg.getBoundingClientRect()
    const wrappers = container.querySelectorAll<HTMLElement>('.photo-card-wrapper')
    const offsets = Array.from(wrappers).map((el) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const xFraction = Math.max(0, Math.min(1, (centerX - svgRect.left) / svgRect.width))
      return ropeOffsetPx(xFraction, svgRect.height)
    })
    setPinOffsets(offsets)
  }

  useEffect(() => {
    computeOffsets()
    const ro = new ResizeObserver(computeOffsets)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [data.photos])

  const onMouseDown = (e: React.MouseEvent) => {
    const el = rowRef.current
    if (!el) return
    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false }
    el.style.cursor = 'grabbing'
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return
    const el = rowRef.current
    if (!el) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 4) drag.current.moved = true
    el.scrollLeft = drag.current.scrollLeft - dx
  }

  const onMouseUp = () => {
    drag.current.active = false
    if (rowRef.current) rowRef.current.style.cursor = 'grab'
  }

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <div ref={containerRef} className="absolute w-full" style={{ top: '42%', overflow: 'visible' }}>
      {/* The rope — SVG quadratic bezier curving downward */}
      <svg
        ref={svgRef}
        className="absolute -left-[2%] w-[104%]"
        style={{ top: '-20px', height: '70px', overflow: 'visible' }}
        preserveAspectRatio="none"
        viewBox="0 0 100 70"
      >
        <path
          d="M0,4 Q50,66 100,4"
          fill="none"
          stroke={ROPE_COLORS[data.season]}
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Scroll wrapper */}
      <div
        ref={rowRef}
        className="photos-row w-full -mt-3"
        style={{ overflowX: 'auto', overflowY: 'hidden', cursor: 'grab', userSelect: 'none', touchAction: 'pan-x', overscrollBehavior: 'contain' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClickCapture={onClickCapture}
        onScroll={computeOffsets}
      >
        {/* Inner flex row */}
        <div className="flex items-start justify-start gap-[clamp(16px,3vw,40px)] px-[4vw] pt-4 pb-14" style={{ overflow: 'visible' }}>
          {data.photos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              season={data.season}
              pinOffset={pinOffsets[i] ?? 0}
              onClick={() => onPhotoClick(photo.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
