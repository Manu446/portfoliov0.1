"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import type { BlogPost } from "@/lib/blog"
import { LayeredText } from "@/components/ui/LayeredText"
import { Reveal } from "@/components/ui/Reveal"
import { BlogCard } from "@/components/blog/BlogCard"

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [featured, ...rest] = posts
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <div>
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/70 shadow-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs text-zinc-600 uppercase tracking-[0.2em]">
              Writing & Thoughts
            </span>
          </motion.div>

          <LayeredText
            text="The Journal"
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            layers={4}
          />

          <motion.p
            className="text-zinc-600 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Essays on engineering, photography, and the creative crossover between
            building software and making images — written from Nairobi and the road.
          </motion.p>
        </div>
      </section>

      {featured && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <BlogCard post={featured} featured />
            </Reveal>
          </div>
        </section>
      )}

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.1}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-zinc-200 bg-zinc-50/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-zinc-900">
              Never miss a <span className="text-gradient">post</span>
            </h2>
            <p className="text-zinc-600 mb-8">
              Occasional notes on code, cameras, and creativity. No spam, ever.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-5 py-3.5 rounded-full border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              />
              <button
                type="submit"
                className={`px-6 py-3.5 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                  subscribed
                    ? "bg-emerald-500 text-white"
                    : "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30"
                }`}
              >
                {subscribed ? (
                  <>
                    <Check size={16} /> Subscribed!
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
