import type { Photo, Season } from '../data/photos'

interface Props {
  photo: Photo
  season: Season
  pinOffset?: number
  onClick: () => void
}

const FRAME_STYLES: Record<Season, { wrapper: string; pin: string; caption: string }> = {
  spring: {
    wrapper: 'bg-spring-frame border border-spring-accent/25 shadow-[0_4px_18px_rgba(232,121,154,0.25),0_1px_4px_rgba(0,0,0,0.1)]',
    pin: 'bg-spring-pin',
    caption: 'text-spring-accent',
  },
  summer: {
    wrapper: 'bg-summer-frame border border-summer-accent/20 shadow-[0_4px_18px_rgba(42,183,202,0.2),0_1px_4px_rgba(0,0,0,0.08)]',
    pin: 'bg-summer-pin',
    caption: 'text-summer-accent',
  },
  autumn: {
    wrapper: 'bg-autumn-frame border border-autumn-accent/25 shadow-[0_4px_22px_rgba(224,123,57,0.3),0_1px_4px_rgba(0,0,0,0.2)]',
    pin: 'bg-autumn-pin',
    caption: 'text-autumn-title',
  },
  winter: {
    wrapper: 'bg-winter-frame border border-winter-accent/20 shadow-[0_4px_18px_rgba(138,180,216,0.3),0_1px_4px_rgba(0,0,0,0.08)]',
    pin: 'bg-winter-pin',
    caption: 'text-winter-accent',
  },
}

const PIN_COLORS: Record<Season, string> = {
  spring: '#d4457a',
  summer: '#00a8b8',
  autumn: '#c0392b',
  winter: '#7ec8ff',
}

function Clothespin({ color }: { color: string }) {
  const dark = 'rgba(0,0,0,0.22)'
  const light = 'rgba(255,255,255,0.22)'
  return (
    <svg width="14" height="30" viewBox="0 0 14 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left piece — inverted trapezoid: narrow top, slightly wider bottom */}
      <path d="M3 1 L6.5 1 L6.5 29 L1 29 Q0 29 0 28 L0 2 Q0 1 1 1 Z" fill={color} />
      <path d="M3.5 1.5 L5.5 1.5 L5.5 27 L2 27 L2 2 Q2 1.5 3.5 1.5 Z" fill={light} />
      {/* Right piece */}
      <path d="M11 1 L7.5 1 L7.5 29 L13 29 Q14 29 14 28 L14 2 Q14 1 13 1 Z" fill={color} />
      {/* Spring band */}
      <rect x="1" y="13" width="12" height="2.5" rx="1.25" fill={dark} />
      <rect x="1" y="13" width="12" height="1.2" rx="0.6" fill={light} />
      {/* Center gap */}
      <rect x="6.5" y="1" width="1" height="28" fill={dark} />
    </svg>
  )
}

export function PhotoCard({ photo, season, pinOffset = 0, onClick }: Props) {
  const styles = FRAME_STYLES[season]

  return (
    <div className="photo-card-wrapper relative flex-shrink-0 pt-2" style={{ top: pinOffset }}>
      {/* Clothespin */}
      <div className="pin absolute left-1/2 -translate-x-1/2 z-20" style={{ top: '-20px' }}>
        <Clothespin color={PIN_COLORS[season]} />
      </div>

      {/* Card — this is what scales on hover */}
      <div
        className={`photo-card cursor-pointer p-2 pb-7 rounded-sm ${styles.wrapper}`}
        onClick={onClick}
        role="button"
        aria-label={`Open photo: ${photo.alt}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        {/* Photo */}
        <picture>
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="block rounded-sm object-cover"
            style={{ width: 'clamp(100px, 14vw, 180px)', aspectRatio: '4/5' }}
          />
        </picture>

        {/* Caption strip */}
        <span
          className={`absolute bottom-1.5 left-0 right-0 text-center text-[10px] tracking-tight whitespace-nowrap overflow-hidden text-ellipsis px-1.5 ${styles.caption}`}
        >
          {photo.location}
        </span>
      </div>
    </div>
  )
}
