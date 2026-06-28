"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring, type Variants } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowDown, Code2, Camera, Sparkles, ArrowUpRight } from "lucide-react"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { Reveal } from "@/components/ui/Reveal"
import { CountUp } from "@/components/ui/CountUp"
import { ProjectShowcase } from "@/components/ProjectShowcase"
import { Marquee } from "@/components/Marquee"

const EASE = [0.22, 1, 0.36, 1] as const

const lineContainer: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
}

const wordVariant: Variants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
}

function MaskedHeadline({
  line,
  delay = 0,
  accentIndex,
  accentClass = "text-gradient",
}: {
  line: string
  delay?: number
  accentIndex?: number[]
  accentClass?: string
}) {
  const words = line.split(" ")
  return (
    <motion.span
      className="flex flex-wrap gap-x-[0.25em]"
      variants={lineContainer}
      custom={delay}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex pb-[0.1em]">
          <motion.span
            variants={wordVariant}
            className={`inline-block ${accentIndex?.includes(i) ? accentClass : ""}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Smoothed scroll values for buttery parallax
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 })
  const heroY = useTransform(smooth, [0, 1], [0, 160])
  const heroScale = useTransform(smooth, [0, 1], [1, 0.93])
  const indicatorOpacity = useTransform(smooth, [0, 0.35], [1, 0])
  const imageScale = useTransform(smooth, [0, 1], [1, 1.22])
  const imageY = useTransform(smooth, [0, 1], [0, -110])
  const overlayTextX = useTransform(smooth, [0, 1], [0, -70])

  // Mouse-driven tilt for the portrait
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 18 })
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 18 })

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    tiltY.set(px * 14)
    tiltX.set(-py * 14)
  }
  const resetTilt = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
      >
        {/* Animated gradient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
          <div className="absolute top-[-6rem] right-[-4rem] w-[34rem] h-[34rem] rounded-full bg-gradient-to-br from-cyan-300/40 to-sky-200/20 blur-3xl animate-blob" />
          <div className="absolute bottom-[-8rem] left-[-6rem] w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-fuchsia-300/40 to-pink-200/20 blur-3xl animate-blob [animation-delay:5s]" />
          <div className="absolute top-[30%] left-[40%] w-[24rem] h-[24rem] rounded-full bg-gradient-to-br from-violet-300/30 to-transparent blur-3xl animate-blob [animation-delay:9s]" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-6 w-full"
          style={{ y: heroY, scale: heroScale }}
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/70 backdrop-blur-sm shadow-sm mb-8"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-zinc-600 uppercase tracking-[0.2em]">
                  Available for freelance
                </span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] mb-8 text-zinc-900">
                <MaskedHeadline
                  line="Building Digital"
                  delay={0.25}
                  accentIndex={[1]}
                />
                <MaskedHeadline
                  line="Experiences &"
                  delay={0.4}
                />
                <MaskedHeadline
                  line="Capturing Moments"
                  delay={0.55}
                  accentIndex={[0]}
                  accentClass="text-gradient-warm"
                />
              </h1>

              <motion.p
                className="text-lg md:text-xl font-medium text-zinc-700 mb-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
              >
                Hi, I&apos;m{" "}
                <span className="font-bold text-gradient">Immanuel Obure</span>
              </motion.p>

              <motion.p
                className="text-zinc-600 text-lg md:text-xl leading-relaxed max-w-lg mb-10"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
              >
                Full-stack software engineer and visual storyteller. I craft
                performant web applications and capture the world through my lens
                — from Nairobi to everywhere.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
              >
                <MagneticButton>
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300"
                  >
                    View My Work
                    <ArrowDown size={16} className="rotate-[-90deg] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-300 bg-white/60 text-zinc-900 font-semibold text-sm hover:bg-white hover:border-zinc-400 transition-all duration-300"
                  >
                    Get In Touch
                  </Link>
                </MagneticButton>
              </motion.div>

              {/* Mini stats */}
              <motion.div
                className="flex gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
              >
                {[
                  { value: "3", label: "Years Engineering" },
                  { value: "50+", label: "Projects" },
                  { value: "10K+", label: "Photos" },
                ].map((s) => (
                  <div key={s.label}>
                    <CountUp
                      value={s.value}
                      className="font-display text-2xl font-bold text-gradient"
                    />
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Visual */}
            <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
              <motion.div
                className="relative w-[320px] h-[420px] md:w-[400px] md:h-[520px]"
                initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.3, ease: EASE }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{ perspective: 1000 }}
              >
                {/* Glow */}
                <div className="absolute -inset-6 bg-gradient-to-br from-cyan-400/40 to-fuchsia-400/40 rounded-[2rem] blur-3xl animate-pulse-glow" />

                {/* Rotating rings */}
                <div className="absolute -inset-5 border border-cyan-400/30 rounded-[2rem] animate-spin-slow pointer-events-none" />
                <div className="absolute -inset-2 border border-fuchsia-400/20 rounded-[1.75rem] animate-spin-reverse pointer-events-none" />

                {/* Tilting image */}
                <motion.div
                  className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-2xl shadow-zinc-900/20 ring-1 ring-white/60"
                  style={{
                    rotateX: springTiltX,
                    rotateY: springTiltY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.img
                    src="/immanuel.jpg"
                    alt="Immanuel Obure"
                    className="w-full h-full object-cover"
                    style={{ scale: imageScale, y: imageY, objectPosition: "60% 30%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/55 via-zinc-900/5 to-transparent" />

                  {/* Layered text ON the image */}
                  <motion.div
                    className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-start px-6 select-none"
                    style={{ x: overlayTextX }}
                  >
                    <span className="font-display font-black leading-[0.8] text-5xl md:text-6xl tracking-tight text-white mix-blend-overlay">
                      CODE
                    </span>
                    <span className="font-display font-black leading-[0.8] text-5xl md:text-6xl tracking-tight text-white/90 mix-blend-overlay -mt-1">
                      &amp; CAPTURE
                    </span>
                  </motion.div>
                </motion.div>

                {/* Big layered word spilling over the image edge */}
                <motion.div
                  className="pointer-events-none absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 z-30"
                  style={{ x: overlayTextX }}
                  aria-hidden
                >
                  <div className="relative">
                    <span className="absolute left-1 top-1 font-display font-black text-6xl md:text-8xl text-zinc-900/10 blur-[2px]">
                      IO
                    </span>
                    <span className="relative font-display font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-fuchsia-500 drop-shadow-sm">
                      IO
                    </span>
                  </div>
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  className="absolute -top-5 -right-5 md:-right-8 glass rounded-2xl p-4 z-30"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code2 className="w-5 h-5 text-cyan-600 mb-2" />
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Engineering
                  </div>
                  <div className="font-display font-bold text-lg text-zinc-900">3 Years</div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-5 -left-5 md:-left-10 glass rounded-2xl p-4 z-30"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                >
                  <Camera className="w-5 h-5 text-fuchsia-600 mb-2" />
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Photography
                  </div>
                  <div className="font-display font-bold text-lg text-zinc-900">5 Years</div>
                </motion.div>

                {/* Sparkle accent */}
                <motion.div
                  className="absolute top-1/3 -right-3 z-30"
                  animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-6 h-6 text-amber-400 drop-shadow" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{ opacity: indicatorOpacity }}
        >
          <span className="text-[10px] text-zinc-400 uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-fuchsia-500 to-transparent"
              animate={{ y: [0, 64, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Featured Project Showcase */}
      <ProjectShowcase />

      {/* Discipline Split Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
            <Reveal>
              <div className="group relative glass glass-hover rounded-3xl p-10 h-full overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-cyan-300/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4">
                  <span className="text-xs text-cyan-600 uppercase tracking-[0.3em] font-semibold">
                    Software Engineering
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-zinc-900">
                  Code That
                  <span className="text-gradient"> Performs</span>
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-8">
                  From React applications to Node.js APIs, I build scalable solutions
                  that prioritize user experience, accessibility, and performance.
                  Every line of code is crafted with intention.
                </p>
                <MagneticButton>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-cyan-600 font-semibold text-sm hover:gap-4 transition-all duration-300"
                  >
                    Explore Projects <ArrowUpRight size={16} />
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="group relative glass glass-hover rounded-3xl p-10 h-full overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-fuchsia-300/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4">
                  <span className="text-xs text-fuchsia-600 uppercase tracking-[0.3em] font-semibold">
                    Photography
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-zinc-900">
                  Moments That
                  <span className="text-gradient-warm"> Last</span>
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-8">
                  Through my lens, I capture the raw beauty of East Africa — from
                  bustling Nairobi streets to serene savanna sunsets. Every frame
                  tells a story.
                </p>
                <MagneticButton>
                  <Link
                    href="/photography"
                    className="inline-flex items-center gap-2 text-fuchsia-600 font-semibold text-sm hover:gap-4 transition-all duration-300"
                  >
                    View Gallery <ArrowUpRight size={16} />
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-zinc-200 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "3", label: "Years Engineering" },
              { value: "10K+", label: "Photos Taken" },
              { value: "3", label: "Exhibitions" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <CountUp
                    value={stat.value}
                    className="block font-display text-4xl md:text-5xl font-bold text-gradient mb-2"
                  />
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-zinc-900">
              Ready to{" "}
              <span className="text-gradient animate-gradient-text">Collaborate?</span>
            </h2>
            <p className="text-zinc-600 text-lg mb-10 max-w-2xl mx-auto">
              Whether you need a full-stack application, a photography session, or
              just want to chat about tech and art — I am always open to
              interesting conversations.
            </p>
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300"
              >
                Start a Project
                <ArrowDown size={18} className="rotate-[-90deg]" />
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
