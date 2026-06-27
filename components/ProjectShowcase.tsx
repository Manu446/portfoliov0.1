"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/ui/Reveal"
import { Thumbnail } from "@/components/ui/Thumbnail"
import type { Project } from "@/lib/projects"

export function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 })

  useEffect(() => {
    fetch("/api/projects?limit=4")
      .then((res) => res.json())
      .then((data: Project[]) => setProjects(data))
      .catch(() => setProjects([]))
  }, [])

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const active = projects.find((p) => p.id === hovered)

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs text-cyan-600 uppercase tracking-[0.3em] font-semibold">
              From GitHub
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-3 text-zinc-900">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:gap-3 transition-all duration-300"
          >
            View all repos <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        <div ref={containerRef} className="relative" onMouseMove={handleMove}>
          <AnimatePresence>
            {active && (
              <motion.div
                className="pointer-events-none absolute z-20 hidden md:block"
                style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Thumbnail
                  src={active.image}
                  fallbackSrc={active.fallbackImage}
                  alt={active.title}
                  icon={active.icon}
                  className="w-72 h-48 rounded-2xl shadow-2xl shadow-zinc-900/30 ring-1 ring-white/40 rotate-[-3deg]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="border-t border-zinc-200">
            {projects.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm">
                Loading repositories from GitHub…
              </div>
            ) : (
              projects.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08} blur={false}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block border-b border-zinc-200"
                    onMouseEnter={() => setHovered(project.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-fuchsia-50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    <div className="relative flex items-center justify-between py-6 md:py-8 px-2 md:px-6">
                      <div className="flex items-center gap-4 md:gap-8 min-w-0">
                        <span className="font-display text-sm text-zinc-400 tabular-nums shrink-0">
                          0{i + 1}
                        </span>
                        <Thumbnail
                          src={project.image}
                          fallbackSrc={project.fallbackImage}
                          alt={project.title}
                          icon={project.icon}
                          className="relative w-20 h-14 md:w-28 md:h-20 rounded-xl shrink-0 ring-1 ring-zinc-200 shadow-sm"
                          imgClassName="transition-transform duration-500 group-hover:scale-110"
                        />
                        <h3 className="font-display text-xl md:text-4xl font-bold text-zinc-900 transition-transform duration-500 group-hover:translate-x-2 truncate">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-5 shrink-0">
                        {project.source !== "personal" && (
                          <span className="hidden sm:block text-sm text-zinc-500">
                            {project.ownerLogin}
                          </span>
                        )}
                        <span className="w-11 h-11 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-900 transition-all duration-500 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 group-hover:rotate-45">
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
