import { useEffect, useRef, useState } from 'react'

/**
 * Returns a fractional scroll index in [0, numSections - 1].
 * e.g. 1.4 means 40% of the way through the transition from section 1 → 2.
 *
 * The scroll track is `numSections` viewport-heights tall.
 * The crossfade overlap is controlled by OVERLAP (0–1):
 *   0 = no overlap, 1 = always overlapping
 */
const DURATION = 1250 // ms

function animateScroll(
  el: HTMLDivElement,
  from: number,
  to: number,
  duration: number,
  onDone: () => void,
) {
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = easeInOut(t)
    el.scrollTop = from + (to - from) * eased
    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      onDone()
    }
  }
  requestAnimationFrame(tick)
}

export function useScrollProgress(numSections: number, isModalOpen: boolean) {
  const [progress, setProgress] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const currentIndex = useRef(0)
  const touchStartY = useRef(0)
  const isModalOpenRef = useRef(isModalOpen)

  useEffect(() => {
    isModalOpenRef.current = isModalOpen
  }, [isModalOpen])

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }
    setVh()
    window.addEventListener('resize', setVh)
    return () => window.removeEventListener('resize', setVh)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const getSnapHeight = () => el.scrollHeight / numSections

    const onScroll = () => {
      const snapHeight = getSnapHeight()
      const maxScroll = (numSections - 1) * snapHeight
      if (maxScroll <= 0) return
      const raw = el.scrollTop / snapHeight
      setProgress(Math.min(Math.max(raw, 0), numSections - 1))
    }

    const scrollToIndex = (index: number) => {
      if (isAnimating.current) return
      const clamped = Math.min(Math.max(index, 0), numSections - 1)
      if (clamped === currentIndex.current) return
      isAnimating.current = true
      const from = el.scrollTop
      const to = clamped * getSnapHeight()
      currentIndex.current = clamped
      animateScroll(el, from, to, DURATION, () => {
        isAnimating.current = false
      })
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isModalOpenRef.current || isAnimating.current) return
      if ((e.target as Element).closest('.photos-row')) return
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      if (e.deltaY > 0) {
        scrollToIndex(currentIndex.current + 1)
      } else if (e.deltaY < 0) {
        scrollToIndex(currentIndex.current - 1)
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (isModalOpenRef.current || isAnimating.current) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0) {
          scrollToIndex(currentIndex.current + 1)
        } else {
          scrollToIndex(currentIndex.current - 1)
        }
      }
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    onScroll()

    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [numSections])

  return { progress, trackRef }
}

/**
 * Given a fractional scroll progress and a section index,
 * compute the opacity and translateY for that section.
 *
 * Behaviour (scrolling DOWN = progress increases):
 *   - Current section (dist → +1): slides UP and fades OUT
 *   - Incoming section (dist → -1): starts 30vh below, slides UP and fades IN
 *   - Both animate together so they share the screen during the transition
 *
 * OVERLAP: fraction of the [0,1] inter-section distance over which the
 *   fade/slide transition happens. 0.5 = transition occupies half the scroll.
 * TRAVEL: how many vh the section travels during the transition (partial slide).
 */
const OVERLAP = 1.0
const MAX_SCRIM = 0.85  // scrim never goes fully black during transitions


/** Smooth ease: maps t in [0,1] to [0,1] with an ease-in-out curve */
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function getSectionStyle(
  progress: number,
  index: number,
): { translateY: string; scrimOpacity: number; contentBlur: string; zIndex: number; hidden: boolean } {
  const dist  = progress - index
  const abs   = Math.abs(dist)
  const t     = Math.min(abs / OVERLAP, 1)

  let scrimOpacity: number   // 0 = fully visible, 1 = fully hidden behind scrim
  let contentBlur: number    // px of blur on the section content
  let translateY: number
  let zIndex: number

  // zIndex stack: incoming-active=3 > active=2 > outgoing=1 > far-away=0
  // Far-away incoming sections (zIndex 0) are covered by the active section (zIndex 2),
  // so they're invisible even though they're not display:none.

  if (dist === 0) {
    return { translateY: '0vh', scrimOpacity: 0, contentBlur: '0px', zIndex: 2, hidden: false }
  }

  if (dist > 0) {
    // Outgoing: slides up 0 → -100vh, scrim fades in, content blurs up
    const eased = easeInOut(t)
    translateY   = -eased * 100
    scrimOpacity = eased * MAX_SCRIM
    contentBlur  = eased * 12
    zIndex       = t >= 1 ? 0 : 1
    // Fully-passed sections are hidden; they've scrolled away
    if (t >= 1) {
      return { translateY: '-100vh', scrimOpacity: 1, contentBlur: '0px', zIndex: 0, hidden: true }
    }
  } else {
    // Incoming: rises from below, scrim fades out, content unblurs.
    const arrive = easeInOut(1 - t)
    translateY   = (1 - arrive) * 100   // slides from 100vh → 0vh
    scrimOpacity = (1 - arrive) * MAX_SCRIM
    contentBlur  = (1 - arrive) * 12
    // In-transition: zIndex 3 (above active). Far-away: zIndex 0 (below active, invisible).
    zIndex       = t >= 1 ? 0 : 3
    // When far away (t >= 1), sit fully off-screen below the viewport — but NOT hidden
    if (t >= 1) {
      return { translateY: '100vh', scrimOpacity: 1, contentBlur: '0px', zIndex: 0, hidden: false }
    }
  }

  return {
    translateY: `${translateY}vh`,
    scrimOpacity,
    contentBlur: `${contentBlur}px`,
    zIndex,
    hidden: false,
  }
}
