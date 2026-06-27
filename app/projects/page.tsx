"use client"

import { motion } from "framer-motion"
import { LayeredText } from "@/components/ui/LayeredText"
import { Reveal } from "@/components/ui/Reveal"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ProjectsGrid } from "@/components/ProjectsGrid"
import { ArrowUpRight } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/70 shadow-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs text-zinc-600 uppercase tracking-[0.2em]">
              Open Source
            </span>
          </motion.div>

          <LayeredText
            text="All Projects"
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            layers={4}
          />

          <motion.p
            className="text-zinc-600 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every repository from GitHub — live sites, in-progress work, and
            collaborations — organized by category and updated automatically.
          </motion.p>
        </div>
      </section>

      <ProjectsGrid />

      {/* CTA */}
      <section className="py-24 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-zinc-900">
              Have a project in <span className="text-gradient">mind?</span>
            </h2>
            <MagneticButton>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300"
              >
                Let&apos;s Build It <ArrowUpRight size={18} />
              </a>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
