import type { ContentBlock } from "@/lib/blog"
import { cn } from "@/lib/utils"

export function ArticleBody({ content }: { content: ContentBlock[] }) {
  return (
    <div className="prose-custom space-y-6">
      {content.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-zinc-600 text-lg leading-relaxed">
                {block.text}
              </p>
            )
          case "heading":
            return block.level === 3 ? (
              <h3
                key={i}
                className="font-display text-2xl font-bold text-zinc-900 pt-4"
              >
                {block.text}
              </h3>
            ) : (
              <h2
                key={i}
                className="font-display text-3xl font-bold text-zinc-900 pt-8 first:pt-0"
              >
                {block.text}
              </h2>
            )
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-cyan-500 pl-6 py-2 my-8"
              >
                <p className="text-xl text-zinc-800 italic leading-relaxed">
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.cite && (
                  <cite className="block mt-3 text-sm text-zinc-500 not-italic">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            )
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-2xl bg-zinc-900 text-zinc-100 p-6 text-sm leading-relaxed shadow-lg"
              >
                <code>{block.code}</code>
              </pre>
            )
          case "list":
            const ListTag = block.ordered ? "ol" : "ul"
            return (
              <ListTag
                key={i}
                className={cn(
                  "space-y-2 text-zinc-600 text-lg leading-relaxed pl-6",
                  block.ordered ? "list-decimal" : "list-disc"
                )}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ListTag>
            )
          case "callout":
            return (
              <div
                key={i}
                className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-fuchsia-50 p-6 my-8"
              >
                <p className="font-display font-bold text-zinc-900 mb-2">
                  {block.title}
                </p>
                <p className="text-zinc-600 leading-relaxed">{block.text}</p>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
