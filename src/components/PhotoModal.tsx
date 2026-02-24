import { useEffect, useCallback } from 'react'
import type { Photo } from '../data/photos'

interface Props {
  photo: Photo | null
  onClose: () => void
}

export function PhotoModal({ photo, onClose }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose],
  )

  useEffect(() => {
    if (!photo) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [photo, handleKey])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo detail"
    >
      <div
        className="relative bg-white rounded-xl p-5 max-w-[min(520px,90vw)] w-full shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2.5 right-3.5 text-2xl leading-none text-gray-400 hover:text-gray-700 transition-colors bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>

        {/* Image */}
        <picture>
          <img
            src={import.meta.env.BASE_URL + photo.src}
            alt={photo.alt}
            className="w-full max-h-[55vh] object-contain rounded-md block"
          />
        </picture>

        {/* Info */}
        <div className="mt-3.5">
          <p className="text-xs text-gray-400 tracking-wide mb-1">{photo.date}</p>
          <p className="text-xs text-gray-400 tracking-wide mb-2">{photo.location}</p>
          <p className="text-[15px] leading-relaxed text-gray-700 italic">{photo.memory}</p>
        </div>
      </div>
    </div>
  )
}
