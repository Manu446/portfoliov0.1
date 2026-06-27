"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  value: string
  className?: string
  duration?: number
}

/**
 * Animates the numeric portion of a value string (e.g. "50+", "10K+", "3")
 * while preserving any non-numeric prefix/suffix.
 */
export function CountUp({ value, className, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState("0")

  const match = value.match(/([^\d]*)(\d+)(.*)/)
  const prefix = match?.[1] ?? ""
  const target = match ? parseInt(match[2], 10) : 0
  const suffix = match?.[3] ?? ""

  useEffect(() => {
    if (!isInView) return
    let raf = 0
    const start = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * target).toString())
      if (t < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
