"use client"

import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react"
import { LayeredText } from "@/components/ui/LayeredText"
import { Reveal } from "@/components/ui/Reveal"
import {
  PHOTO_CATEGORIES,
  categoryLabels,
  categoryPluralLabels,
  getPhotosByCategory,
  type Photo,
  type PhotoCategory,
} from "@/lib/photography"

const categoryAccent: Record<PhotoCategory, string> = {
  wedding: "text-fuchsia-600",
  landscape: "text-cyan-600",
  nature: "text-emerald-600",
}

export default function PhotographyPage() {
  const [active, setActive] = useState<PhotoCategory | "all">("all")
  const [selected, setSelected] = useState<Photo | null>(null)

  const visible = getPhotosByCategory(active)

  const selectedIndex = selected
    ? visible.findIndex((photo) => photo.id === selected.id)
    : -1

  const goTo = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex < 0 || visible.length === 0) return
      const next =
        (selectedIndex + direction + visible.length) % visible.length
      setSelected(visible[next])
    },
    [selectedIndex, visible]
  )

  useEffect(() => {
    if (!selected) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
      if (e.key === "ArrowLeft") goTo(-1)
      if (e.key === "ArrowRight") goTo(1)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [selected, goTo])

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
              Kenya · Through The Lens
            </span>
          </motion.div>

          <LayeredText
            text="Photography Gallery"
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            layers={4}
            accentColor="text-fuchsia-600"
          />

          <motion.p
            className="text-zinc-600 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Weddings, landscapes, and nature captured across Kenya — from
            Nairobi ceremonies to Mara sunsets and Rift Valley horizons.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-6 mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {(["wedding", "landscape", "nature"] as PhotoCategory[]).map(
              (cat) => (
                <div key={cat} className="text-center">
                  <div
                    className={`font-display text-3xl font-bold ${categoryAccent[cat]}`}
                  >
                    {getPhotosByCategory(cat).length}
                  </div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                    {categoryPluralLabels[cat]}
                  </div>
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {PHOTO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  active === cat.id
                    ? "text-white"
                    : "text-zinc-600 border border-zinc-200 bg-white/60 hover:border-zinc-400"
                }`}
              >
                {active === cat.id && (
                  <motion.span
                    layoutId="activePhotoFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4"
            >
              {visible.map((photo, i) => (
                <Reveal key={photo.id} delay={i * 0.05} className={photo.span}>
                  <motion.button
                    onClick={() => setSelected(photo)}
                    whileHover={{ scale: 0.98 }}
                    className="group relative w-full h-full rounded-2xl overflow-hidden block cursor-pointer ring-1 ring-zinc-200 shadow-sm text-left"
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/75 via-zinc-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 ${categoryAccent[photo.category]}`}
                      >
                        {categoryLabels[photo.category]}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 md:p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center gap-1 text-[10px] text-cyan-200 uppercase tracking-wider mb-1">
                        <MapPin size={10} />
                        {photo.location}
                      </div>
                      <div className="font-display font-bold text-white text-base md:text-lg">
                        {photo.title}
                      </div>
                    </div>
                  </motion.button>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>

          {visible.length === 0 && (
            <div className="text-center py-20 text-zinc-500">
              No photos in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-zinc-900/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {visible.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    goTo(-1)
                  }}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    goTo(1)
                  }}
                  aria-label="Next photo"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <motion.div
              key={selected.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[88vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl bg-zinc-950"
              />
              <div className="mt-4 px-2 md:px-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${categoryAccent[selected.category]}`}
                  >
                    {categoryLabels[selected.category]}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                    <MapPin size={12} />
                    {selected.location}, Kenya
                  </span>
                  {visible.length > 1 && (
                    <span className="text-xs text-zinc-500 ml-auto tabular-nums">
                      {selectedIndex + 1} / {visible.length}
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-white text-2xl md:text-3xl mb-2">
                  {selected.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                  {selected.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
