import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  categoryLabels,
} from "@/lib/blog"
import { ArticleBody } from "@/components/blog/ArticleBody"
import { BlogCard } from "@/components/blog/BlogCard"
import { Reveal } from "@/components/ui/Reveal"

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: "Article not found" }

  return {
    title: `${post.title} — Immanuel Obure`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.isoDate,
      images: [{ url: post.coverImage }],
    },
  }
}

const categoryColors: Record<string, string> = {
  engineering: "text-cyan-600 bg-cyan-50 border-cyan-200",
  photography: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200",
  creativity: "text-violet-600 bg-violet-50 border-violet-200",
}

export default function BlogArticlePage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(params.slug, 2)

  return (
    <article>
      {/* Hero */}
      <header className="pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-cyan-600 transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Back to journal
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-6">
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

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[1.08] mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-zinc-600 leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-zinc-100 text-zinc-600 border border-zinc-200"
              >
                <Tag size={11} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Cover */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-200">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent" />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <ArticleBody content={post.content} />

        <footer className="mt-16 pt-10 border-t border-zinc-200">
          <p className="text-sm text-zinc-500 mb-2">Written by</p>
          <p className="font-display text-xl font-bold text-zinc-900">
            Immanuel Obure
          </p>
          <p className="text-zinc-600 text-sm mt-1">
            Engineer & photographer · Nairobi, Kenya
          </p>
        </footer>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-24 border-t border-zinc-200 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="mb-10">
              <h2 className="font-display text-3xl font-bold text-zinc-900">
                Continue <span className="text-gradient">reading</span>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((item) => (
                <Reveal key={item.slug}>
                  <BlogCard post={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
