"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const total = 1900
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setIsLoading(false), 300)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Curtain panels that split open */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-zinc-50"
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-zinc-50"
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.img
              src="/vartec-logo.png"
              alt="Vartec Design"
              className="w-28 md:w-36 h-auto object-contain drop-shadow-sm"
              initial={{ opacity: 0, y: -10, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="font-display text-3xl md:text-5xl font-bold tracking-tight text-gradient animate-gradient-text"
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Immanuel Obure
            </motion.div>

            <div className="w-56 md:w-72 flex flex-col gap-3">
              <div className="h-[3px] bg-zinc-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                  style={{ width: `${count}%` }}
                />
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                  Loading
                </span>
                <span className="font-display text-2xl font-bold text-zinc-900 tabular-nums">
                  {count}
                  <span className="text-zinc-400 text-base">%</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
