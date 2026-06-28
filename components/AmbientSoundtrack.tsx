"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STORAGE_KEY = "portfolio-soundtrack-enabled"
const TARGET_VOLUME = 0.22
const FADE_MS = 1800

// Om (136.1 Hz) + solfeggio-inspired tones — warm, uplifting, spacious
const PAD_FREQS = [136.1, 272.2, 408.3, 528, 639, 741.98]
const PAD_GAINS = [0.055, 0.038, 0.028, 0.032, 0.022, 0.018]

function createReverb(ctx: AudioContext, seconds = 3.5, decay = 2.2) {
  const length = ctx.sampleRate * seconds
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
    }
  }
  const convolver = ctx.createConvolver()
  convolver.buffer = impulse
  return convolver
}

class SpiritualEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private dry: GainNode | null = null
  private wet: GainNode | null = null
  private nodes: AudioNode[] = []
  private lfoIntervals: ReturnType<typeof setInterval>[] = []
  private bellTimer: ReturnType<typeof setTimeout> | null = null
  private running = false

  private ensureContext() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.master = this.ctx.createGain()
      this.dry = this.ctx.createGain()
      this.wet = this.ctx.createGain()
      this.master.gain.value = 0
      this.dry.gain.value = 0.65
      this.wet.gain.value = 0.55
      this.dry.connect(this.master)
      this.wet.connect(this.master)
      this.master.connect(this.ctx.destination)
    }
    return { ctx: this.ctx, master: this.master!, dry: this.dry!, wet: this.wet! }
  }

  private scheduleBell() {
    if (!this.running || !this.ctx || !this.dry) return

    const ctx = this.ctx
    const now = ctx.currentTime

    const bellFreqs = [1056, 1320, 1584, 2112]
    const freq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)]

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = "sine"
    osc.frequency.value = freq
    filter.type = "bandpass"
    filter.frequency.value = freq
    filter.Q.value = 8

    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.018, now + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.dry)
    gain.connect(this.wet)

    osc.start(now)
    osc.stop(now + 5)
    this.nodes.push(osc, filter, gain)

    const delay = 8000 + Math.random() * 14000
    this.bellTimer = setTimeout(() => this.scheduleBell(), delay)
  }

  start() {
    const { ctx, dry, wet } = this.ensureContext()
    this.stop(false)
    this.running = true

    const reverb = createReverb(ctx)
    reverb.connect(wet)
    this.nodes.push(reverb)

    PAD_FREQS.forEach((freq, i) => {
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      const merger = ctx.createGain()

      osc1.type = "sine"
      osc2.type = "triangle"
      osc1.frequency.value = freq
      osc2.frequency.value = freq * 1.002
      osc1.detune.value = (i - 2.5) * 4
      osc2.detune.value = -(i - 2.5) * 3

      filter.type = "lowpass"
      filter.frequency.value = 1200 + i * 80
      filter.Q.value = 0.3

      const baseGain = PAD_GAINS[i] ?? 0.02
      gain.gain.value = baseGain

      osc1.connect(merger)
      osc2.connect(merger)
      merger.connect(filter)
      filter.connect(gain)
      gain.connect(dry)
      gain.connect(reverb)

      osc1.start()
      osc2.start()
      this.nodes.push(osc1, osc2, merger, filter, gain)

      // Gentle breathing LFO on each layer
      const lfo = setInterval(() => {
        if (!ctx || gain.gain.value === 0) return
        const t = ctx.currentTime
        gain.gain.cancelScheduledValues(t)
        gain.gain.setValueAtTime(gain.gain.value, t)
        gain.gain.linearRampToValueAtTime(
          baseGain * (0.85 + Math.random() * 0.3),
          t + 3 + Math.random() * 4
        )
      }, 4000 + i * 800)
      this.lfoIntervals.push(lfo)
    })

    // Ethereal high shimmer
    const shimmer = ctx.createOscillator()
    const shimmerGain = ctx.createGain()
    const shimmerFilter = ctx.createBiquadFilter()
    shimmer.type = "sine"
    shimmer.frequency.value = 2112
    shimmerFilter.type = "highpass"
    shimmerFilter.frequency.value = 1800
    shimmerGain.gain.value = 0.006
    shimmer.connect(shimmerFilter)
    shimmerFilter.connect(shimmerGain)
    shimmerGain.connect(reverb)
    shimmer.start()
    this.nodes.push(shimmer, shimmerFilter, shimmerGain)

    this.scheduleBell()
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
    this.running = false
    if (this.bellTimer) {
      clearTimeout(this.bellTimer)
      this.bellTimer = null
    }
    this.lfoIntervals.forEach(clearInterval)
    this.lfoIntervals = []

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

function WaveformBars({ active }: { active: boolean }) {
  const heights = [3, 7, 5, 9, 4, 8, 6]

  return (
    <div className="flex items-end gap-[3px] h-4" aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-cyan-500 to-violet-400"
          animate={
            active
              ? { height: [h, h + 6, h - 1, h + 4, h] }
              : { height: 3 }
          }
          transition={
            active
              ? {
                  duration: 0.9 + i * 0.08,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.07,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}

export function AmbientSoundtrack() {
  const engineRef = useRef<SpiritualEngine | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hovered, setHovered] = useState(false)

  const startPlayback = useCallback(async () => {
    try {
      if (!engineRef.current) engineRef.current = new SpiritualEngine()
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
    engineRef.current = new SpiritualEngine()
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
            className="glass rounded-2xl px-4 py-2.5 text-xs font-medium text-zinc-600 border border-zinc-200/80 shadow-sm hover:text-zinc-900 hover:border-violet-300 transition-colors"
          >
            Tap to begin the ambient soundtrack
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={enabled ? "Mute ambient soundtrack" : "Play ambient soundtrack"}
        aria-pressed={enabled}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-zinc-200/80 bg-white/75 px-4 py-2.5 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-colors hover:border-violet-300/60 hover:bg-white/90"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        layout
      >
        {/* Active glow ring */}
        <AnimatePresence>
          {enabled && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 via-violet-400/10 to-fuchsia-400/10"
            />
          )}
        </AnimatePresence>

        <WaveformBars active={enabled} />

        <AnimatePresence mode="wait">
          {(hovered || enabled) && (
            <motion.span
              key={enabled ? "on" : "off"}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide"
            >
              <span
                className={
                  enabled
                    ? "bg-gradient-to-r from-cyan-600 to-violet-500 bg-clip-text text-transparent"
                    : "text-zinc-400"
                }
              >
                {enabled ? "Sound On" : "Sound Off"}
              </span>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Status dot */}
        <span
          className={`relative h-2 w-2 shrink-0 rounded-full transition-colors ${
            enabled ? "bg-violet-500" : "bg-zinc-300"
          }`}
        >
          {enabled && (
            <motion.span
              className="absolute inset-0 rounded-full bg-violet-400"
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
      </motion.button>
    </div>
  )
}
