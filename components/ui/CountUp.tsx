"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface CountUpProps {
  value: string
  className?: string
  duration?: number
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Reveals a metric value (e.g. "50+", "10K+", "3") with a clean
 * blur-to-sharp rise. The full value is always rendered, so the
 * number reflects the real metric immediately — never a 0 placeholder.
 */
export function CountUp({ value, className, duration = 0.9 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <span ref={ref} className="inline-flex overflow-hidden">
      <motion.span
        className={className}
        initial={{ y: "60%", opacity: 0, filter: "blur(8px)" }}
        animate={
          isInView
            ? { y: "0%", opacity: 1, filter: "blur(0px)" }
            : { y: "60%", opacity: 0, filter: "blur(8px)" }
        }
        transition={{ duration, ease: EASE }}
      >
        {value}
      </motion.span>
    </span>
  )
}
