"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Camera, Zap, Palette, Database, Globe } from "lucide-react"
import { LayeredText } from "@/components/ui/LayeredText"
import { Reveal } from "@/components/ui/Reveal"
import { skills } from "@/lib/data"

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(level), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, level, delay])

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-zinc-800">{name}</span>
        <span className="text-sm text-zinc-500">{level}%</span>
      </div>
      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 relative"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md shadow-cyan-500/50 ring-2 ring-cyan-400/40" />
        </motion.div>
      </div>
    </div>
  )
}

function SkillCard({
  icon: Icon,
  title,
  items,
  delay,
  accent,
}: {
  icon: any
  title: string
  items: string[]
  delay: number
  accent: string
}) {
  return (
    <Reveal delay={delay}>
      <motion.div
        className="glass glass-hover rounded-2xl p-8 h-full group"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center mb-6`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-display font-bold text-xl mb-4 text-zinc-900">{title}</h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="text-zinc-600 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </Reveal>
  )
}

export default function SkillsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/70 shadow-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs text-zinc-600 uppercase tracking-[0.2em]">
              Expertise
            </span>
          </motion.div>

          <LayeredText
            text="Skills & Technologies"
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            layers={4}
          />

          <motion.p
            className="text-zinc-600 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A blend of technical proficiency and creative tools. Constantly
            evolving, always learning.
          </motion.p>
        </div>
      </section>

      {/* Skill Bars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Engineering */}
            <Reveal>
              <div className="glass rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-zinc-900">
                      Software Engineering
                    </h3>
                    <p className="text-xs text-zinc-500">Frontend & Backend</p>
                  </div>
                </div>
                {skills.engineering.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </Reveal>

            {/* Photography */}
            <Reveal delay={0.2}>
              <div className="glass rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-fuchsia-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-zinc-900">
                      Photography
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Capture & Post-Processing
                    </p>
                  </div>
                </div>
                {skills.photography.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skill Cards Grid */}
      <section className="py-20 border-y border-zinc-200 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900">
              What I <span className="text-gradient">Work With</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard
              icon={Globe}
              title="Frontend"
              items={["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"]}
              delay={0}
              accent="bg-gradient-to-br from-cyan-500 to-sky-500"
            />
            <SkillCard
              icon={Database}
              title="Backend"
              items={["Node.js / Express", "Python / Django", "PostgreSQL", "MongoDB", "Redis", "GraphQL"]}
              delay={0.1}
              accent="bg-gradient-to-br from-violet-500 to-purple-500"
            />
            <SkillCard
              icon={Zap}
              title="DevOps"
              items={["AWS / GCP", "Docker", "CI/CD", "Vercel", "GitHub Actions", "Terraform"]}
              delay={0.2}
              accent="bg-gradient-to-br from-amber-500 to-orange-500"
            />
            <SkillCard
              icon={Camera}
              title="Photography"
              items={["Sony A7III", "Adobe Lightroom", "Adobe Photoshop", "Capture One", "Film Scanning"]}
              delay={0.3}
              accent="bg-gradient-to-br from-fuchsia-500 to-pink-500"
            />
            <SkillCard
              icon={Palette}
              title="Design"
              items={["Figma", "Adobe XD", "UI/UX Principles", "Design Systems", "Prototyping"]}
              delay={0.4}
              accent="bg-gradient-to-br from-emerald-500 to-teal-500"
            />
            <SkillCard
              icon={Code2}
              title="Other"
              items={["Git / GitHub", "Jest / Testing", "REST APIs", "WebSockets", "PWA"]}
              delay={0.5}
              accent="bg-gradient-to-br from-rose-500 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* Tools Marquee */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-zinc-900">
              Daily <span className="text-gradient">Toolkit</span>
            </h2>
          </Reveal>
        </div>
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
          }}
        >
          {[
            "VS Code", "Chrome DevTools", "Figma", "Lightroom", "Terminal",
            "GitHub", "Notion", "Slack", "Postman", "Vercel",
            "VS Code", "Chrome DevTools", "Figma", "Lightroom", "Terminal",
          ].map((tool, i) => (
            <span
              key={i}
              className="font-display text-4xl md:text-6xl font-bold text-zinc-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-500 hover:to-fuchsia-500 transition-colors duration-300 cursor-default"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
