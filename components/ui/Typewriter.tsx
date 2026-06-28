"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  phrases: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
}

/**
 * Types and deletes through a list of phrases with a blinking caret.
 * Renders inside a fixed-height line so it never shifts surrounding layout.
 */
export function Typewriter({
  phrases,
  className = "",
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseMs = 1600,
}: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing")

  useEffect(() => {
    const current = phrases[index % phrases.length]

    if (phase === "typing") {
      if (text === current) {
        const t = setTimeout(() => setPhase("deleting"), pauseMs)
        return () => clearTimeout(t)
      }
      const t = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typingSpeed
      )
      return () => clearTimeout(t)
    }

    if (phase === "deleting") {
      if (text === "") {
        setIndex((i) => (i + 1) % phrases.length)
        setPhase("typing")
        return
      }
      const t = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deletingSpeed
      )
      return () => clearTimeout(t)
    }
  }, [text, phase, index, phrases, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="inline-block w-[2px] h-[1em] -mb-[0.12em] ml-[2px] bg-cyan-500 animate-caret-blink" />
    </span>
  )
}
