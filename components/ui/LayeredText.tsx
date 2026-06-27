"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface LayeredTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  layers?: number
  staggerDelay?: number
  baseColor?: string
  accentColor?: string
}

export function LayeredText({
  text,
  className,
  as: Component = "h1",
  layers = 3,
  staggerDelay = 0.08,
  baseColor = "text-zinc-900",
  accentColor = "text-cyan-600",
}: LayeredTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  }

  return (
    <Component
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ perspective: "1000px" }}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate={controls}
        className="flex flex-wrap"
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            variants={child}
            className="relative mr-[0.25em] inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Shadow layers for depth */}
            {Array.from({ length: layers }).map((_, layerIndex) => (
              <span
                key={layerIndex}
                className={cn(
                  "absolute inset-0 select-none",
                  layerIndex === layers - 1 ? accentColor : baseColor
                )}
                style={{
                  transform: `translateZ(${(layerIndex + 1) * -4}px) translateY(${(layerIndex + 1) * 2}px)`,
                  opacity: 0.15 - layerIndex * 0.04,
                  filter: `blur(${layerIndex + 1}px)`,
                }}
                aria-hidden="true"
              >
                {word}
              </span>
            ))}
            {/* Main text */}
            <span
              className={cn(
                "relative z-10 inline-block",
                wordIndex % 3 === 1 ? accentColor : baseColor
              )}
            >
              {word}
            </span>
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}

// Glitch text effect
export function GlitchText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute left-0 top-0 z-0 text-cyan-400 opacity-50"
        style={{
          clipPath: "inset(0 0 50% 0)",
          transform: "translateX(-2px)",
          animation: "glitch1 2s infinite linear alternate-reverse",
        }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute left-0 top-0 z-0 text-pink-500 opacity-50"
        style={{
          clipPath: "inset(50% 0 0 0)",
          transform: "translateX(2px)",
          animation: "glitch2 3s infinite linear alternate-reverse",
        }}
        aria-hidden="true"
      >
        {text}
      </span>
      <style jsx>{`
        @keyframes glitch1 {
          0%, 90%, 100% { transform: translateX(-2px); }
          92% { transform: translateX(4px); }
          94% { transform: translateX(-4px); }
          96% { transform: translateX(2px); }
        }
        @keyframes glitch2 {
          0%, 85%, 100% { transform: translateX(2px); }
          87% { transform: translateX(-4px); }
          89% { transform: translateX(4px); }
          91% { transform: translateX(-2px); }
        }
      `}</style>
    </span>
  )
}

// Scramble text effect
export function ScrambleText({
  text,
  className,
  triggerOnView = true,
}: {
  text: string
  className?: string
  triggerOnView?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayText, setDisplayText] = useState(text)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

  useEffect(() => {
    if (!triggerOnView || isInView) {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " "
              if (index < iteration) return text[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        )

        if (iteration >= text.length) {
          clearInterval(interval)
        }

        iteration += 1 / 3
      }, 30)

      return () => clearInterval(interval)
    }
  }, [isInView, text, triggerOnView])

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  )
}
