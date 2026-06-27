"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Github, Star } from "lucide-react"
import type { Project, ProjectFilterId } from "@/lib/projects"
import { CATEGORY_SECTIONS, PROJECT_FILTERS } from "@/lib/projects"
import { Thumbnail } from "@/components/ui/Thumbnail"

function ProjectSkeleton() {
  return (
    <div className="glass rounded-3xl p-8 animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-zinc-200" />
        <div className="w-10 h-4 rounded bg-zinc-200" />
      </div>
      <div className="h-7 w-3/4 rounded bg-zinc-200 mb-3" />
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full rounded bg-zinc-100" />
        <div className="h-4 w-5/6 rounded bg-zinc-100" />
      </div>
      <div className="flex gap-2 mb-6">
        <div className="h-7 w-16 rounded-full bg-zinc-100" />
        <div className="h-7 w-20 rounded-full bg-zinc-100" />
      </div>
      <div className="h-5 w-24 rounded bg-zinc-100" />
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative glass glass-hover rounded-3xl overflow-hidden"
    >
      <div className="relative h-44 border-b border-zinc-200/80">
        <Thumbnail
          src={project.image}
          fallbackSrc={project.fallbackImage}
          alt={project.title}
          icon={project.icon}
          className="h-full w-full"
          imgClassName="transition-transform duration-700 group-hover:scale-105"
        />
        {project.liveUrl && (
          <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-cyan-500 text-white shadow-sm">
            Live
          </span>
        )}
        {project.source !== "personal" && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-zinc-700 border border-zinc-200 shadow-sm backdrop-blur-sm">
            {project.source === "organization"
              ? project.ownerLogin
              : `Collab · ${project.ownerLogin}`}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="p-8">
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-300/30 to-fuchsia-300/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative flex items-start justify-between mb-4">
          <div className="text-3xl">{project.icon}</div>
          {project.stars > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400 font-mono">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {project.stars}
            </span>
          )}
        </div>

        <h3 className="relative font-display text-2xl font-bold text-zinc-900 mb-1">
          {project.title}
        </h3>
        <p className="relative text-xs text-zinc-400 mb-3 font-mono">
          {project.ownerLogin}/{project.slug}
        </p>
        <p className="relative text-sm text-zinc-600 leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="relative flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-zinc-100 text-zinc-600 border border-zinc-200 capitalize"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative flex items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:gap-2.5 transition-all duration-300"
            >
              Live <ArrowUpRight size={15} />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
          >
            <Github size={15} /> Code
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

function filterProjects(projects: Project[], active: ProjectFilterId): Project[] {
  return projects.filter((project) => {
    if (active === "all") return true
    if (active === "live") return Boolean(project.liveUrl)
    if (active === "personal") return project.source === "personal"
    if (active === "collaboration")
      return project.source === "collaboration" || project.source === "organization"
    return project.category === active
  })
}

function CategoryBlock({
  label,
  description,
  projects,
}: {
  label: string
  description: string
  projects: Project[]
}) {
  if (projects.length === 0) return null

  return (
    <div className="mb-20 last:mb-0">
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-zinc-900">
            {label}
          </h3>
          <p className="text-sm text-zinc-500 mt-1 max-w-xl">{description}</p>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </span>
      </div>
      <ProjectGrid projects={projects} />
    </div>
  )
}

export function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState<ProjectFilterId>("all")

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/projects?all=true")
        if (!res.ok) throw new Error("Failed to load projects")
        const data = (await res.json()) as Project[]
        if (!cancelled) setProjects(data)
      } catch {
        if (!cancelled)
          setError("Could not load projects from GitHub. Please try again shortly.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = filterProjects(projects, active)

  const grouped = CATEGORY_SECTIONS.map((section) => ({
    ...section,
    projects: projects.filter((project) => project.category === section.id),
  })).filter((section) => section.projects.length > 0)

  return (
    <>
      {/* Filters */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  active === f.id
                    ? "text-white"
                    : "text-zinc-600 border border-zinc-200 bg-white/60 hover:border-zinc-400"
                }`}
              >
                {active === f.id && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {error && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              No repositories found.
            </div>
          ) : active === "all" ? (
            <div>
              {grouped.map((section) => (
                <CategoryBlock
                  key={section.id}
                  label={section.label}
                  description={section.description}
                  projects={section.projects}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              No repositories found in this category.
            </div>
          ) : (
            <ProjectGrid projects={filtered} />
          )}
        </div>
      </section>
    </>
  )
}
