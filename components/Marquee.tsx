"use client"

import { motion } from "framer-motion"

const items = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "AWS", "Docker", "PostgreSQL", "Portrait", "Street",
  "Landscape", "Lightroom", "Framer Motion", "GSAP",
]

export function Marquee() {
  return (
    <div className="relative border-y border-zinc-200 bg-zinc-50/50 py-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-4xl font-bold text-zinc-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-500 hover:to-fuchsia-500 transition-colors duration-300 cursor-default"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
