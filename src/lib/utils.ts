import { Media } from '@/collections/Media'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to ensure unique by id
export function getUniquePhotos(photos: (typeof Media)[]) {
  const seen = new Set()
  return photos.filter((photo: typeof Media) => {
    if (!photo || !photo?.id) return false
    if (seen.has(photo?.id)) return false
    seen.add(photo?.id)
    return true
  })
}
