"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, MapPin, Mail, Briefcase } from "lucide-react"
import Link from "next/link"
import { LayeredText } from "@/components/ui/LayeredText"
import { Reveal } from "@/components/ui/Reveal"
import { ParallaxImage } from "@/components/ui/ParallaxImage"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { experience } from "@/lib/data"

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="min-h-[60vh] flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/70 shadow-sm mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs text-zinc-600 uppercase tracking-[0.2em]">
                  About Me
                </span>
              </motion.div>

              <LayeredText
                text="Dual Passion One Vision"
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8"
                layers={4}
              />

              <motion.p
                className="text-zinc-600 text-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Bridging the gap between technical precision and artistic
                expression. I believe great software and great photography share
                the same DNA: attention to detail, composition, and storytelling.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <MapPin size={14} className="text-cyan-600" />
                  Nairobi, Kenya
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <Mail size={14} className="text-cyan-600" />
                  immanuelobure854@gmail.com
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <Briefcase size={14} className="text-cyan-600" />
                  Open to Remote
                </div>
              </motion.div>
            </div>

            <motion.div className="relative" style={{ y: y1 }}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-zinc-900/15 ring-1 ring-white/60">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1000&fit=crop"
                  alt="Workspace"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 via-transparent to-transparent" />
                {/* Layered text on the image */}
                <span className="absolute bottom-5 left-5 font-display font-black text-5xl text-white mix-blend-overlay select-none">
                  CREATE
                </span>
              </div>
              <div className="absolute -inset-4 border border-zinc-200 rounded-[2rem] -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-300/40 to-fuchsia-300/30 blur-2xl animate-pulse-glow -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <Reveal className="lg:col-span-2">
              <div className="space-y-6">
                <p className="text-zinc-600 text-lg leading-relaxed">
                  I am a Nairobi-based full-stack developer with a deep love for visual
                  storytelling. By day, I architect scalable web applications using
                  modern JavaScript ecosystems. By weekend, I am exploring Kenya&apos;s
                  landscapes and city streets with my camera.
                </p>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  My engineering philosophy centers on performance, accessibility, and
                  user delight. My photography focuses on authentic human moments and
                  the raw beauty of East African landscapes.
                </p>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  Whether I am debugging a React component or editing RAW files in
                  Lightroom, I bring the same obsessive attention to detail and
                  creative problem-solving mindset.
                </p>
              </div>
            </Reveal>

            <motion.div className="space-y-6" style={{ y: y2 }}>
              <Reveal>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-bold text-lg mb-4 text-zinc-900">Quick Facts</h3>
                  <ul className="space-y-3">
                    {[
                      { label: "Born", value: "Nairobi, Kenya" },
                      { label: "Languages", value: "English, Swahili" },
                      { label: "Camera", value: "Sony A7III" },
                      { label: "Editor", value: "VS Code + Lightroom" },
                      { label: "Coffee", value: "Black, always" },
                    ].map((fact) => (
                      <li key={fact.label} className="flex justify-between text-sm">
                        <span className="text-zinc-500">{fact.label}</span>
                        <span className="text-zinc-900 font-medium">{fact.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-bold text-lg mb-4 text-zinc-900">
                    Currently Learning
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Rust", "WebGL", "Film Photography", "AI/ML"].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full text-xs bg-zinc-100 text-zinc-600 border border-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 border-y border-zinc-200 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Engineering",
                icon: "💻",
                description:
                  "Clean code, thoughtful architecture, and user-first design. I believe the best software is invisible — it just works.",
                color: "from-cyan-300/30 to-transparent",
              },
              {
                title: "Photography",
                icon: "📷",
                description:
                  "Authentic moments over perfect poses. I chase light, emotion, and the stories that unfold in the spaces between.",
                color: "from-fuchsia-300/30 to-transparent",
              },
              {
                title: "Philosophy",
                icon: "🎯",
                description:
                  "Both code and photos are about composition. Balance, contrast, and knowing what to leave out matters as much as what you include.",
                color: "from-violet-300/30 to-transparent",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.15}>
                <motion.div
                  className="relative group h-full"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative glass rounded-2xl p-8 h-full">
                    <div className="text-4xl mb-6">{item.icon}</div>
                    <h3 className="font-display font-bold text-xl mb-4 text-zinc-900">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="mb-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-900">
              The <span className="text-gradient">Journey</span>
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[7px] md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-transparent md:-translate-x-1/2" />
            <div className="space-y-12">
              {experience.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.1}>
                  <div
                    className={`relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${
                      i % 2 === 0 ? "" : "md:[direction:rtl]"
                    }`}
                  >
                    <span className="absolute left-0 md:left-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 ring-4 ring-white md:-translate-x-1/2 z-10" />
                    <div className={`glass rounded-2xl p-6 [direction:ltr] ${i % 2 === 0 ? "md:text-right" : ""}`}>
                      <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">
                        {item.date}
                      </span>
                      <h3 className="font-display font-bold text-lg text-zinc-900 mt-1">
                        {item.title}
                      </h3>
                      <div className={`flex items-center gap-2.5 mb-3 ${i % 2 === 0 ? "md:flex-row-reverse md:justify-start" : ""}`}>
                        {item.logo && (
                          <span className="inline-flex h-8 items-center justify-center rounded-md bg-white ring-1 ring-zinc-200 px-2 shadow-sm">
                            <img
                              src={item.logo}
                              alt={`${item.company} logo`}
                              className="h-5 w-auto object-contain"
                              loading="lazy"
                            />
                          </span>
                        )}
                        <p className="text-sm text-fuchsia-600">{item.company}</p>
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-zinc-900">
              Want to know more about my{" "}
              <span className="text-gradient">journey?</span>
            </h2>
            <MagneticButton>
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-300 bg-white/60 text-zinc-900 font-semibold hover:bg-white hover:border-zinc-400 transition-all duration-300"
              >
                See My Skills
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
