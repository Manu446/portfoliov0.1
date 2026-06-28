"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  value: string
  className?: string
  duration?: number
  delay?: number
}

/**
 * Counts the numeric part of a value (e.g. "50+", "10K+", "3") up from 0
 * to its target, preserving any prefix/suffix. The text is ALWAYS rendered
 * (never hidden), and the animation runs on mount — no viewport/opacity
 * gating that could leave the number stuck at 0 or invisible.
 */
export function CountUp({ value, className, duration = 1.4, delay = 0.2 }: CountUpProps) {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/)
  const prefix = match?.[1] ?? ""
  const target = match ? parseInt(match[2], 10) : 0
  const suffix = match?.[3] ?? ""
  const hasNumber = Boolean(match)

  const [current, setCurrent] = useState(target)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (!hasNumber) return
    setCurrent(0)
    const startAt = performance.now() + delay * 1000

    const tick = (now: number) => {
      if (now < startAt) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      const t = Math.min((now - startAt) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(eased * target))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [hasNumber, target, duration, delay])

  if (!hasNumber) {
    return <span className={className}>{value}</span>
  }

  return (
    <span className={className}>
      {prefix}
      {current}
      {suffix}
    </span>
  )
}
