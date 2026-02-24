/** Season accent colors used for seam gradient — more saturated than bg to avoid white band */
const SEASON_BG: Record<string, string> = {
  spring: '#e8799a',
  summer: '#2ab7ca',
  autumn: '#8b5e3c',
  winter: '#8ab4d8',
}

interface Props {
  /** The season sliding out (on top, moving up) */
  outgoing: string
  /** The season sliding in (below, moving up) */
  incoming: string
  /** Viewport Y position of the seam in vh (= translateY of incoming section) */
  seamVh: number
  /** 0–1, fades the whole SeamBlur in/out with the transition */
  opacity: number
  /** Height of the band in vh — shrinks as the seam approaches midscreen */
  heightVh: number
}

/**
 * A single fixed element that straddles the seam between two seasons.
 * Uses a color gradient + backdrop-filter blur to blend the boundary.
 * Sits below the scrim overlays (zIndex 98) so scrims darken on top of it.
 */
export function SeamBlur({ outgoing, incoming, seamVh, opacity, heightVh }: Props) {
  const topColor = SEASON_BG[outgoing] ?? 'transparent'
  const bottomColor = SEASON_BG[incoming] ?? 'transparent'

  return (
    <div
      className="fixed inset-x-0 pointer-events-none"
      style={{
        top: `calc(${seamVh}vh - ${heightVh / 2}vh)`,
        height: `${heightVh}vh`,
        zIndex: 98,
        opacity,
        // Feather the band at top and bottom
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
      }}
    >
      {/* Color gradient layer — blends the two season bg colors */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})`,
          opacity: 0.8,
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
        }}
      />
    </div>
  )
}
