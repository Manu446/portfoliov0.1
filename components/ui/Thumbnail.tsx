"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ThumbnailProps {
  src: string
  fallbackSrc?: string
  alt: string
  icon?: string
  className?: string
  imgClassName?: string
}

export function Thumbnail({
  src,
  fallbackSrc,
  alt,
  icon = "📦",
  className,
  imgClassName,
}: ThumbnailProps) {
  // Build the chain of sources to try in order, de-duplicated.
  const sources = [src, fallbackSrc].filter(
    (s, i, arr): s is string => Boolean(s) && arr.indexOf(s) === i
  )

  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [src, fallbackSrc])

  const exhausted = index >= sources.length

  if (exhausted) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-fuchsia-100",
          className
        )}
        aria-label={alt}
      >
        <span className="text-3xl md:text-4xl drop-shadow-sm">{icon}</span>
      </div>
    )
  }

  return (
    <div className={cn("overflow-hidden bg-zinc-100", className)}>
      <img
        src={sources[index]}
        alt={alt}
        loading="lazy"
        onError={() => setIndex((i) => i + 1)}
        className={cn("w-full h-full object-cover", imgClassName)}
      />
    </div>
  )
}
