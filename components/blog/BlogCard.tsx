"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog"
import { categoryLabels } from "@/lib/blog"

const categoryColors: Record<string, string> = {
  engineering: "text-cyan-600 bg-cyan-50 border-cyan-200",
  photography: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200",
  creativity: "text-violet-600 bg-violet-50 border-violet-200",
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block">
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="group relative glass glass-hover rounded-3xl overflow-hidden grid md:grid-cols-2"
        >
          <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
            <span className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-500">
              Featured
            </span>
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-4">
              <span
                className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${categoryColors[post.category]}`}
              >
                {categoryLabels[post.category]}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-zinc-900 mb-4 group-hover:text-gradient transition-colors">
              {post.title}
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-6">{post.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 group-hover:gap-3 transition-all duration-300">
              Read Article <ArrowUpRight size={16} />
            </span>
          </div>
        </motion.article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group glass glass-hover rounded-3xl overflow-hidden h-full flex flex-col"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
        </div>
        <div className="p-8 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-4">
            <span
              className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${categoryColors[post.category]}`}
            >
              {categoryLabels[post.category]}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-zinc-900 mb-4 group-hover:text-gradient transition-colors">
            {post.title}
          </h3>
          <p className="text-zinc-600 leading-relaxed mb-6 flex-1">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-fuchsia-600 group-hover:gap-3 transition-all duration-300">
            Read Article <ArrowUpRight size={16} />
          </span>
        </div>
      </motion.article>
    </Link>
  )
}
