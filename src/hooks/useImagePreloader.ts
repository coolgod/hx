import { useState, useEffect, useRef } from 'react'

const READY_THRESHOLD = 0.9

export function useImagePreloader(urls: string[]): { progress: number; ready: boolean } {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    if (urls.length === 0) {
      setProgress(1)
      setReady(true)
      return
    }

    let loaded = 0
    const total = urls.length

    const tick = () => {
      loaded++
      const p = loaded / total
      setProgress(p)
      if (p >= READY_THRESHOLD) setReady(true)
    }

    for (const url of urls) {
      const img = new Image()
      img.onload = tick
      img.onerror = tick
      img.src = url
    }
  }, [])

  return { progress, ready }
}
