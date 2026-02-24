import { useEffect, useRef } from 'react'
import type { Season } from '../data/photos'

// ──────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  rotation?: number
  rotationSpeed?: number
  color?: string
  phase?: number
}

// ──────────────────────────────────────────────────────────────
// Spring — cherry blossom petals
// ──────────────────────────────────────────────────────────────
function drawCherryBlossom(ctx: CanvasRenderingContext2D, size: number, color: string) {
  const s = size
  // Draw 5 petals arranged in a circle
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
    ctx.save()
    ctx.rotate(angle)
    // Each petal: wide oval with a notched tip, pointing outward from center
    ctx.beginPath()
    ctx.moveTo(0, 0)
    // Left side of petal out to tip area
    ctx.bezierCurveTo(-s * 0.4, -s * 0.3, -s * 0.35, -s * 0.9, 0, -s)
    // Notch: dip slightly inward at the tip
    ctx.bezierCurveTo(s * 0.08, -s * 0.88, s * 0.08, -s * 0.88, 0, -s)
    // Right side back to center
    ctx.bezierCurveTo(s * 0.35, -s * 0.9, s * 0.4, -s * 0.3, 0, 0)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  }
  // Small yellow center dot
  ctx.beginPath()
  ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = '#fff0a0'
  ctx.fill()
}

function animateSpring(ctx: CanvasRenderingContext2D, w: number, h: number, particles: Particle[]) {
  ctx.clearRect(0, 0, w, h)
  for (const p of particles) {
    ctx.save()
    ctx.globalAlpha = p.opacity
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation ?? 0)
    drawCherryBlossom(ctx, p.size, p.color ?? '#ffb7c5')
    ctx.restore()

    p.x += p.vx + Math.sin(p.y * 0.02) * 0.5
    p.y += p.vy
    p.rotation = (p.rotation ?? 0) + (p.rotationSpeed ?? 0)
    if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w }
    if (p.x > w + 20) p.x = -20
    if (p.x < -20) p.x = w + 20
  }
}

function makePetal(w: number, h: number): Particle {
  const pink = ['#ffb7c5', '#ff8fab', '#ffc8d8', '#ff6b8a', '#ffd6e7']
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.8,
    vy: 0.6 + Math.random() * 1.2,
    size: 5 + Math.random() * 5,
    opacity: 0.55 + Math.random() * 0.45,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.05,
    color: pink[Math.floor(Math.random() * pink.length)],
  }
}

// ──────────────────────────────────────────────────────────────
// Summer — Dahlias floating/drifting
// ──────────────────────────────────────────────────────────────
function drawDahlia(ctx: CanvasRenderingContext2D, size: number, color: string, t: number, phase: number) {
  const s = size
  const sway = Math.sin(t * 0.018 + phase) * 0.04  // slow gentle sway

  // 3 rings of petals: outer (12), middle (10), inner (8)
  const rings = [
    { count: 12, len: s, width: s * 0.52 },
    { count: 10, len: s * 0.72, width: s * 0.42 },
    { count: 8,  len: s * 0.48, width: s * 0.32 },
  ]

  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 + sway
      ctx.save()
      ctx.rotate(angle)
      // Broad rounded petal: wide at the middle, gently tapered tip and base
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-ring.width * 0.7, -ring.len * 0.2, -ring.width * 0.7, -ring.len * 0.75, 0, -ring.len)
      ctx.bezierCurveTo(ring.width * 0.7, -ring.len * 0.75, ring.width * 0.7, -ring.len * 0.2, 0, 0)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
    }
  }

  // Center button
  ctx.beginPath()
  ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2)
  ctx.fillStyle = '#fff9c4'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2)
  ctx.fillStyle = '#f9a825'
  ctx.fill()
}

function animateSummer(ctx: CanvasRenderingContext2D, w: number, h: number, particles: Particle[], t: number) {
  ctx.clearRect(0, 0, w, h)
  for (const p of particles) {
    ctx.save()
    ctx.globalAlpha = p.opacity
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation ?? 0)
    drawDahlia(ctx, p.size, p.color ?? '#ff7eb3', t, p.phase ?? 0)
    ctx.restore()

    p.x += p.vx + Math.sin(t * 0.012 + (p.phase ?? 0)) * 0.3
    p.y += p.vy
    p.rotation = (p.rotation ?? 0) + (p.rotationSpeed ?? 0)
    if (p.y > h + p.size * 2) { p.y = -p.size * 2; p.x = Math.random() * w }
    if (p.x > w + p.size) p.x = -p.size
    if (p.x < -p.size) p.x = w + p.size
  }
}

function makeDahlia(w: number, h: number): Particle {
  const colors = ['#ff7eb3', '#ff4081', '#f06292', '#ce93d8', '#ff8a65', '#ffb74d', '#f48fb1']
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: 0.4 + Math.random() * 0.7,
    size: 12 + Math.random() * 14,
    opacity: 0.7 + Math.random() * 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.008,
    color: colors[Math.floor(Math.random() * colors.length)],
    phase: Math.random() * Math.PI * 2,
  }
}

// ──────────────────────────────────────────────────────────────
// Autumn — falling maple leaves
// ──────────────────────────────────────────────────────────────
function drawMapleLeaf(ctx: CanvasRenderingContext2D, size: number, color: string) {
  const s = size
  // Maple leaf defined as polar points: [angleDeg, radius]
  // 5 lobes alternating with 4 deep notches + 2 base notches flanking the stem
  // Angle 0 = up (-y). Positive = clockwise.
  const pts: [number, number][] = [
    [  0,   s * 1.0],   // top lobe
    [ 28,   s * 0.28],  // notch right of top
    [ 60,   s * 0.85],  // upper-right lobe
    [ 88,   s * 0.26],  // notch
    [120,   s * 0.70],  // lower-right lobe
    [148,   s * 0.34],  // notch
    [165,   s * 0.52],  // base-right shoulder
    [180,   s * 0.0 ],  // stem junction (center bottom)
    [195,   s * 0.52],  // base-left shoulder
    [212,   s * 0.34],  // notch
    [240,   s * 0.70],  // lower-left lobe
    [272,   s * 0.26],  // notch
    [300,   s * 0.85],  // upper-left lobe
    [332,   s * 0.28],  // notch left of top
  ]

  // Convert to cartesian (angle measured from -y axis, clockwise)
  const toXY = (deg: number, r: number): [number, number] => {
    const rad = (deg - 90) * (Math.PI / 180)
    return [Math.cos(rad) * r, Math.sin(rad) * r]
  }

  const coords = pts.map(([a, r]) => toXY(a, r))

  ctx.beginPath()
  ctx.moveTo(...coords[0])
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1]
    const curr = coords[i]
    // Midpoint as quadratic control — pulls tip to a slight point
    const mx = (prev[0] + curr[0]) / 2
    const my = (prev[1] + curr[1]) / 2
    ctx.quadraticCurveTo(prev[0], prev[1], mx, my)
  }
  // Close back to start
  const last = coords[coords.length - 1]
  const first = coords[0]
  const mx = (last[0] + first[0]) / 2
  const my = (last[1] + first[1]) / 2
  ctx.quadraticCurveTo(last[0], last[1], mx, my)
  ctx.closePath()

  ctx.fillStyle = color
  ctx.fill()

  // Stem
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, s * 0.9)
  ctx.strokeStyle = color
  ctx.lineWidth = s * 0.07
  ctx.lineCap = 'round'
  ctx.stroke()
}

function animateAutumn(ctx: CanvasRenderingContext2D, w: number, h: number, particles: Particle[]) {
  ctx.clearRect(0, 0, w, h)
  for (const p of particles) {
    ctx.save()
    ctx.globalAlpha = p.opacity
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation ?? 0)
    drawMapleLeaf(ctx, p.size, p.color ?? '#e07b39')
    ctx.restore()

    p.x += p.vx + Math.sin(p.y * 0.015) * 0.8
    p.y += p.vy
    p.rotation = (p.rotation ?? 0) + (p.rotationSpeed ?? 0)
    if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w }
  }
}

function makeLeaf(w: number, h: number): Particle {
  const colors = ['#e07b39', '#c0392b', '#f5a623', '#b7472a', '#e8862d', '#d4380d']
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 1.5,
    vy: 1 + Math.random() * 2,
    size: 8 + Math.random() * 10,
    opacity: 0.7 + Math.random() * 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
    color: colors[Math.floor(Math.random() * colors.length)],
  }
}

// ──────────────────────────────────────────────────────────────
// Winter — snowflakes
// ──────────────────────────────────────────────────────────────
function drawSnowflake(ctx: CanvasRenderingContext2D, size: number) {
  const s = size
  ctx.strokeStyle = '#ffffff'
  ctx.lineCap = 'round'

  for (let i = 0; i < 6; i++) {
    ctx.save()
    ctx.rotate((i / 6) * Math.PI * 2)
    // Main arm
    ctx.lineWidth = s * 0.13
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -s)
    ctx.stroke()
    // Two symmetrical branch ticks at 60% out
    ctx.lineWidth = s * 0.09
    const branchLen = s * 0.3
    const branchY = -s * 0.6
    ctx.beginPath()
    ctx.moveTo(0, branchY)
    ctx.lineTo(-branchLen * 0.7, branchY - branchLen * 0.7)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, branchY)
    ctx.lineTo(branchLen * 0.7, branchY - branchLen * 0.7)
    ctx.stroke()
    // Smaller ticks at 35% out
    ctx.lineWidth = s * 0.07
    const smallLen = s * 0.18
    const smallY = -s * 0.35
    ctx.beginPath()
    ctx.moveTo(0, smallY)
    ctx.lineTo(-smallLen * 0.7, smallY - smallLen * 0.7)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, smallY)
    ctx.lineTo(smallLen * 0.7, smallY - smallLen * 0.7)
    ctx.stroke()
    ctx.restore()
  }
  // Center dot
  ctx.beginPath()
  ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
}

function animateWinter(ctx: CanvasRenderingContext2D, w: number, h: number, particles: Particle[]) {
  ctx.clearRect(0, 0, w, h)
  for (const p of particles) {
    ctx.save()
    ctx.globalAlpha = p.opacity
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation ?? 0)
    drawSnowflake(ctx, p.size)
    ctx.restore()

    p.x += p.vx + Math.sin(p.y * 0.018) * 0.4
    p.y += p.vy
    p.rotation = (p.rotation ?? 0) + (p.rotationSpeed ?? 0)
    if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w }
  }
}

function makeSnowflake(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: 0.4 + Math.random() * 1.0,
    size: 2 + Math.random() * 6,
    opacity: 0.5 + Math.random() * 0.5,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.008,
  }
}

// ──────────────────────────────────────────────────────────────
// Main hook
// ──────────────────────────────────────────────────────────────
const COUNTS: Record<Season, number> = {
  spring: 60,
  summer: 20,
  autumn: 50,
  winter: 150,
}

export function useSeasonAnimation(season: Season, canvasRef: React.RefObject<HTMLCanvasElement>) {
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const tRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // Reinitialise particles on resize
      const w = canvas.width
      const h = canvas.height
      const count = COUNTS[season]
      if (season === 'spring')  particlesRef.current = Array.from({ length: count }, () => makePetal(w, h))
      if (season === 'summer')  particlesRef.current = Array.from({ length: count }, () => makeDahlia(w, h))
      if (season === 'autumn')  particlesRef.current = Array.from({ length: count }, () => makeLeaf(w, h))
      if (season === 'winter')  particlesRef.current = Array.from({ length: count }, () => makeSnowflake(w, h))
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const loop = () => {
      tRef.current++
      const w = canvas.width
      const h = canvas.height
      const p = particlesRef.current
      if (season === 'spring') animateSpring(ctx, w, h, p)
      if (season === 'summer') animateSummer(ctx, w, h, p, tRef.current)
      if (season === 'autumn') animateAutumn(ctx, w, h, p)
      if (season === 'winter') animateWinter(ctx, w, h, p)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [season, canvasRef])
}
