"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

const STORAGE_KEY = "portfolio-soundtrack-enabled"
const TARGET_VOLUME = 0.18
const FADE_MS = 1400

// Soft ambient pad built from layered sine tones + filtered noise
class AmbientEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private nodes: AudioNode[] = []

  private ensureContext() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0
      this.master.connect(this.ctx.destination)
    }
    return { ctx: this.ctx, master: this.master! }
  }

  start() {
    const { ctx, master } = this.ensureContext()
    this.stop(false)

    const freqs = [110, 164.81, 220, 329.63, 440]
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = "sine"
      osc.frequency.value = freq
      osc.detune.value = (i - 2) * 3

      filter.type = "lowpass"
      filter.frequency.value = 900
      filter.Q.value = 0.4

      gain.gain.value = 0.045 - i * 0.004

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(master)

      osc.start()
      this.nodes.push(osc, filter, gain)
    })

    // Gentle air texture
    const bufferSize = 2 * ctx.sampleRate
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.35
    }

    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer
    noise.loop = true

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = "bandpass"
    noiseFilter.frequency.value = 420
    noiseFilter.Q.value = 0.6

    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.012

    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(master)
    noise.start()
    this.nodes.push(noise, noiseFilter, noiseGain)

    return ctx.resume()
  }

  fadeTo(target: number) {
    const { ctx, master } = this.ensureContext()
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(master.gain.value, now)
    master.gain.linearRampToValueAtTime(target, now + FADE_MS / 1000)
  }

  stop(fade = true) {
    if (!this.ctx || !this.master) return

    const disconnect = () => {
      this.nodes.forEach((node) => {
        try {
          if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
            node.stop()
          }
          node.disconnect()
        } catch {
          // already stopped
        }
      })
      this.nodes = []
    }

    if (fade) {
      this.fadeTo(0)
      setTimeout(disconnect, FADE_MS + 50)
    } else {
      disconnect()
      this.master.gain.value = 0
    }
  }

  async play() {
    await this.start()
    this.fadeTo(TARGET_VOLUME)
  }

  pause() {
    this.stop(true)
  }
}

export function AmbientSoundtrack() {
  const engineRef = useRef<AmbientEngine | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const startPlayback = useCallback(async () => {
    try {
      if (!engineRef.current) engineRef.current = new AmbientEngine()
      await engineRef.current.play()
      setEnabled(true)
      setShowHint(false)
      localStorage.setItem(STORAGE_KEY, "true")
      return true
    } catch {
      setShowHint(true)
      return false
    }
  }, [])

  const stopPlayback = useCallback(() => {
    engineRef.current?.pause()
    setEnabled(false)
    localStorage.setItem(STORAGE_KEY, "false")
  }, [])

  const toggle = useCallback(() => {
    if (enabled) stopPlayback()
    else startPlayback()
  }, [enabled, startPlayback, stopPlayback])

  useEffect(() => {
    engineRef.current = new AmbientEngine()
    let timer: ReturnType<typeof setTimeout> | undefined
    let started = false

    const startOnce = async () => {
      if (started || localStorage.getItem(STORAGE_KEY) === "false") return
      started = await startPlayback()
      if (started) removeInteractionListeners()
    }

    const addInteractionListeners = () => {
      window.addEventListener("pointerdown", startOnce, { passive: true })
      window.addEventListener("keydown", startOnce)
      window.addEventListener("touchstart", startOnce, { passive: true })
      window.addEventListener("wheel", startOnce, { passive: true })
    }

    const removeInteractionListeners = () => {
      window.removeEventListener("pointerdown", startOnce)
      window.removeEventListener("keydown", startOnce)
      window.removeEventListener("touchstart", startOnce)
      window.removeEventListener("wheel", startOnce)
    }

    addInteractionListeners()
    timer = setTimeout(startOnce, 1200)

    return () => {
      if (timer) clearTimeout(timer)
      removeInteractionListeners()
      engineRef.current?.stop(false)
      engineRef.current = null
    }
  }, [startPlayback])

  return (
    <div className="fixed bottom-6 left-6 z-[9998] flex flex-col items-start gap-3">
      <AnimatePresence>
        {showHint && !enabled && (
          <motion.button
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={startPlayback}
            className="glass rounded-full px-4 py-2 text-xs font-medium text-zinc-600 border border-zinc-200 shadow-sm hover:text-zinc-900 hover:border-cyan-300 transition-colors"
          >
            Soundtrack starts after your first interaction
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        aria-label={enabled ? "Mute soundtrack" : "Play soundtrack"}
        className="group relative w-12 h-12 rounded-full glass border border-zinc-200 shadow-lg shadow-zinc-900/5 flex items-center justify-center text-zinc-600 hover:text-cyan-600 hover:border-cyan-300 transition-colors"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {enabled ? (
          <>
            <Volume2 size={18} />
            <span className="absolute -top-1 -right-1 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-0.5 rounded-full bg-cyan-500"
                  animate={{ height: [4, 10, 4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
          </>
        ) : (
          <VolumeX size={18} />
        )}

        {!enabled && (
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </motion.button>
    </div>
  )
}
