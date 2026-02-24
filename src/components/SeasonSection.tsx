import { useRef } from 'react'
import { useSeasonAnimation } from '../hooks/useSeasonAnimation'
import { Clothesline } from './Clothesline'
import type { SeasonData } from '../data/photos'

interface Props {
  data: SeasonData
  onPhotoClick: (photoId: string) => void
  translateY: string
  contentBlur: string
  zIndex: number
  hidden: boolean
}

const SEASON_STYLES = {
  spring: {
    bg: 'bg-spring-bg',
    title: 'text-spring-title',
    bgImage: `${import.meta.env.BASE_URL}bg/spring.webp`,
    dimColor: 'rgba(253, 216, 228, 0.35)',
    titleShadow: '0 2px 8px rgba(255,0,127,0.7), 0 1px 3px rgba(255,0,127,0.5)',
  },
  summer: {
    bg: 'bg-summer-bg',
    title: 'text-summer-title',
    bgImage: `${import.meta.env.BASE_URL}bg/summer.webp`,
    dimColor: 'rgba(232, 247, 249, 0.35)',
    titleShadow: '0 2px 8px rgba(0,238,255,0.7), 0 1px 3px rgba(0,238,255,0.5)',
  },
  autumn: {
    bg: 'bg-autumn-bg',
    title: 'text-autumn-title',
    bgImage: `${import.meta.env.BASE_URL}bg/autumn.webp`,
    dimColor: 'rgba(61, 31, 0, 0.45)',
    titleShadow: '0 2px 16px rgba(255,204,68,0.6), 0 1px 4px rgba(255,204,68,0.4)',
  },
  winter: {
    bg: 'bg-winter-bg',
    title: 'text-winter-title',
    bgImage: `${import.meta.env.BASE_URL}bg/winter.webp`,
    dimColor: 'rgba(221, 238, 255, 0.35)',
    titleShadow: '0 2px 8px rgba(200,238,255,0.8), 0 1px 3px rgba(200,238,255,0.6)',
  },
}

const SEASON_LABELS: Record<string, string> = {
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
  winter: 'Winter',
}

const SEASON_SUBTITLES: Record<string, string> = {
  spring: 'one house',
  summer: 'two people',
  autumn: 'three meals',
  winter: 'four seasons',
}

export function SeasonSection({ data, onPhotoClick, translateY, contentBlur, zIndex, hidden }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useSeasonAnimation(data.season, canvasRef)

  const styles = SEASON_STYLES[data.season]

  return (
    <section
      id={data.season}
      className={`season-section relative w-full flex flex-col items-center ${styles.bg}`}
      style={{
        transform: `translateY(${translateY})`,
        zIndex,
        display: hidden ? 'none' : undefined,
        pointerEvents: 'auto',
        backgroundImage: `url(${styles.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dim overlay — sits between background image and particles */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: styles.dimColor }} />

      {/* Animated background canvas — wrapped to contain overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Content — blur applied here so only content blurs, not the whole section */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center"
        style={{ filter: contentBlur !== '0px' ? `blur(${contentBlur})` : undefined }}
      >
        <h2
          className={`mt-[5vh] text-[clamp(2rem,5vw,3.5rem)] tracking-wide font-bold ${styles.title}`}
          style={{ fontFamily: 'Zapfino, Palatino, "Palatino Linotype", serif', textShadow: styles.titleShadow }}
        >
          {SEASON_LABELS[data.season]}
        </h2>
        <p
          className={`mt-1 text-[clamp(0.85rem,1.8vw,1.15rem)] tracking-widest opacity-80 ${styles.title}`}
          style={{ fontFamily: 'Palatino, "Palatino Linotype", serif', fontStyle: 'italic' }}
        >
          {SEASON_SUBTITLES[data.season]}
        </p>

        <Clothesline data={data} onPhotoClick={onPhotoClick} />
      </div>
    </section>
  )
}
