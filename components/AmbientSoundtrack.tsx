"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STORAGE_KEY = "portfolio-soundtrack-enabled"
const TARGET_VOLUME = 0.28
const FADE_MS = 1200
const BPM = 94
const BEAT_SEC = 60 / BPM
const BAR_BEATS = 4

// Uplifting I–V–vi–IV loop (C major)
const CHORDS: { notes: number[]; root: number }[] = [
  { notes: [261.63, 329.63, 392.0], root: 130.81 },
  { notes: [392.0, 493.88, 587.33], root: 196.0 },
  { notes: [220.0, 261.63, 329.63], root: 110.0 },
  { notes: [349.23, 440.0, 523.25], root: 174.61 },
]

// Simple ascending motif over the progression
const MELODY = [523.25, 587.33, 659.25, 587.33, 493.88, 440.0, 392.0, 440.0]

class RhythmicEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private musicBus: GainNode | null = null
  private timer: ReturnType<typeof setInterval> | null = null
  private beat = 0
  private running = false
  private startTime = 0

  private ensureContext() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.master = this.ctx.createGain()
      this.musicBus = this.ctx.createGain()
      this.master.gain.value = 0
      this.musicBus.gain.value = 1
      this.musicBus.connect(this.master)
      this.master.connect(this.ctx.destination)
    }
    return { ctx: this.ctx, master: this.master!, bus: this.musicBus! }
  }

  private playKick(time: number, gain = 0.55) {
    const { ctx, bus } = this.ensureContext()
    const osc = ctx.createOscillator()
    const amp = ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(165, time)
    osc.frequency.exponentialRampToValueAtTime(48, time + 0.12)
    amp.gain.setValueAtTime(0.0001, time)
    amp.gain.exponentialRampToValueAtTime(gain, time + 0.004)
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.22)
    osc.connect(amp)
    amp.connect(bus)
    osc.start(time)
    osc.stop(time + 0.25)
  }

  private playSnare(time: number, gain = 0.14) {
    const { ctx, bus } = this.ensureContext()
    const bufferSize = ctx.sampleRate * 0.18
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = "highpass"
    filter.frequency.value = 1200
    const amp = ctx.createGain()
    amp.gain.setValueAtTime(gain, time)
    amp.gain.exponentialRampToValueAtTime(0.0001, time + 0.16)
    noise.connect(filter)
    filter.connect(amp)
    amp.connect(bus)
    noise.start(time)
    noise.stop(time + 0.2)
  }

  private playHat(time: number, gain = 0.045, open = false) {
    const { ctx, bus } = this.ensureContext()
    const bufferSize = ctx.sampleRate * (open ? 0.12 : 0.04)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = "highpass"
    filter.frequency.value = 7000
    const amp = ctx.createGain()
    amp.gain.setValueAtTime(gain, time)
    amp.gain.exponentialRampToValueAtTime(0.0001, time + (open ? 0.1 : 0.035))
    noise.connect(filter)
    filter.connect(amp)
    amp.connect(bus)
    noise.start(time)
    noise.stop(time + 0.14)
  }

  private playBass(time: number, freq: number, duration: number, gain = 0.2) {
    const { ctx, bus } = this.ensureContext()
    const osc = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const amp = ctx.createGain()
    osc.type = "triangle"
    osc.frequency.value = freq
    filter.type = "lowpass"
    filter.frequency.value = 420
    amp.gain.setValueAtTime(0.0001, time)
    amp.gain.linearRampToValueAtTime(gain, time + 0.02)
    amp.gain.setValueAtTime(gain * 0.85, time + duration * 0.6)
    amp.gain.exponentialRampToValueAtTime(0.0001, time + duration)
    osc.connect(filter)
    filter.connect(amp)
    amp.connect(bus)
    osc.start(time)
    osc.stop(time + duration + 0.05)
  }

  private playPianoNote(time: number, freq: number, duration: number, gain = 0.07) {
    const { ctx, bus } = this.ensureContext()
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const mix = ctx.createGain()
    const amp = ctx.createGain()
    osc1.type = "triangle"
    osc2.type = "sine"
    osc1.frequency.value = freq
    osc2.frequency.value = freq * 2
    mix.gain.value = 1
    amp.gain.setValueAtTime(0.0001, time)
    amp.gain.linearRampToValueAtTime(gain, time + 0.015)
    amp.gain.exponentialRampToValueAtTime(0.0001, time + duration)
    osc1.connect(mix)
    osc2.connect(mix)
    mix.connect(amp)
    amp.connect(bus)
    osc1.start(time)
    osc2.start(time)
    osc1.stop(time + duration + 0.05)
    osc2.stop(time + duration + 0.05)
  }

  private scheduleBeat(globalBeat: number) {
    if (!this.running || !this.ctx) return
    const { ctx } = this.ensureContext()
    const barBeat = globalBeat % BAR_BEATS
    const barIndex = Math.floor(globalBeat / BAR_BEATS) % CHORDS.length
    const chord = CHORDS[barIndex]
    const time = this.startTime + globalBeat * BEAT_SEC

    // Kick on 1 & 3, softer on 3
    if (barBeat === 0) this.playKick(time, 0.5)
    if (barBeat === 2) this.playKick(time, 0.38)

    // Snare on 2 & 4
    if (barBeat === 1 || barBeat === 3) this.playSnare(time)

    // Hi-hats — eighth-note feel
    this.playHat(time, barBeat % 2 === 0 ? 0.04 : 0.028)
    this.playHat(time + BEAT_SEC * 0.5, 0.022)

    // Bass on downbeats
    if (barBeat === 0 || barBeat === 2) {
      this.playBass(time, chord.root, BEAT_SEC * 1.9, barBeat === 0 ? 0.22 : 0.16)
    }

    // Chord stab at start of each bar
    if (barBeat === 0) {
      chord.notes.forEach((freq, i) => {
        this.playPianoNote(time + i * 0.018, freq, BEAT_SEC * 3.2, 0.055)
      })
    }

    // Melody on offbeats
    if (barBeat % 2 === 1) {
      const melodyIndex = (globalBeat + barIndex) % MELODY.length
      this.playPianoNote(time, MELODY[melodyIndex], BEAT_SEC * 1.6, 0.05)
    }

    // Extra sparkle on bar 1 beat 1
    if (barBeat === 0 && barIndex === 0) {
      this.playPianoNote(time + BEAT_SEC * 0.5, 783.99, BEAT_SEC * 2, 0.035)
    }
  }

  private tick() {
    if (!this.ctx || !this.running) return
    const elapsed = this.ctx.currentTime - this.startTime
    const currentBeat = Math.floor(elapsed / BEAT_SEC)
    const lookAhead = 0.12

    while (this.beat <= currentBeat + lookAhead / BEAT_SEC) {
      if (this.beat >= 0) this.scheduleBeat(this.beat)
      this.beat++
    }
  }

  start() {
    const { ctx } = this.ensureContext()
    this.stop(false)
    this.running = true
    this.beat = 0
    this.startTime = ctx.currentTime + 0.08
    this.timer = setInterval(() => this.tick(), 25)
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
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (!this.ctx || !this.master) return

    const finish = () => {
      this.master!.gain.value = 0
    }

    if (fade) {
      this.fadeTo(0)
      setTimeout(finish, FADE_MS + 50)
    } else {
      finish()
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
  const heights = [4, 9, 6, 12, 5, 10, 7]

  return (
    <div className="flex items-end gap-[3px] h-4" aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-amber-400 via-cyan-500 to-violet-500"
          animate={
            active
              ? { height: [h, h + 5, h - 2, h + 7, h] }
              : { height: 3 }
          }
          transition={
            active
              ? {
                  duration: 0.47,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.06,
                }
              : { duration: 0.25 }
          }
        />
      ))}
    </div>
  )
}

export function AmbientSoundtrack() {
  const engineRef = useRef<RhythmicEngine | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hovered, setHovered] = useState(false)

  const startPlayback = useCallback(async () => {
    try {
      if (!engineRef.current) engineRef.current = new RhythmicEngine()
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
    engineRef.current = new RhythmicEngine()
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
            className="glass rounded-2xl px-4 py-2.5 text-xs font-medium text-zinc-600 border border-zinc-200/80 shadow-sm hover:text-zinc-900 hover:border-cyan-300 transition-colors"
          >
            Tap to play the beat
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={enabled ? "Mute soundtrack" : "Play soundtrack"}
        aria-pressed={enabled}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-zinc-200/80 bg-white/80 px-4 py-2.5 shadow-[0_8px_32px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-colors hover:border-cyan-300/70 hover:bg-white/95"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        layout
      >
        <AnimatePresence>
          {enabled && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-amber-300/15 via-cyan-400/15 to-violet-400/15"
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
                    ? "bg-gradient-to-r from-amber-500 via-cyan-600 to-violet-500 bg-clip-text text-transparent"
                    : "text-zinc-400"
                }
              >
                {enabled ? "Beat On" : "Beat Off"}
              </span>
            </motion.span>
          )}
        </AnimatePresence>

        <span
          className={`relative h-2 w-2 shrink-0 rounded-full transition-colors ${
            enabled ? "bg-cyan-500" : "bg-zinc-300"
          }`}
        >
          {enabled && (
            <motion.span
              className="absolute inset-0 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 0.64, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
      </motion.button>
    </div>
  )
}
