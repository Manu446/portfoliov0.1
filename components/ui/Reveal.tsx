"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  blur?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.9,
  blur = true,
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-90px" })

  const directions = {
    up: { y: 48, x: 0 },
    down: { y: -48, x: 0 },
    left: { x: 48, y: 0 },
    right: { x: -48, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{
        opacity: 0,
        filter: blur ? "blur(8px)" : "blur(0px)",
        ...directions[direction],
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : {
              opacity: 0,
              filter: blur ? "blur(8px)" : "blur(0px)",
              ...directions[direction],
            }
      }
      transition={{
        duration,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  )
}
