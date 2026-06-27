export type BlogCategory = "engineering" | "photography" | "creativity"

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; title: string; text: string }

export interface BlogPost {
  slug: string
  title: string
  date: string
  isoDate: string
  excerpt: string
  readTime: string
  category: BlogCategory
  coverImage: string
  tags: string[]
  content: ContentBlock[]
}

const posts: BlogPost[] = [
  {
    slug: "building-performant-react-apps-2026",
    title: "Building Performant React Apps in 2026",
    date: "June 15, 2026",
    isoDate: "2026-06-15",
    excerpt:
      "React Server Components, selective hydration, and edge caching have changed how I ship frontends. Here is the stack and mindset I use on client projects in Nairobi and remotely.",
    readTime: "9 min read",
    category: "engineering",
    coverImage:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=700&fit=crop",
    tags: ["React", "Next.js", "Performance", "RSC"],
    content: [
      {
        type: "paragraph",
        text: "Last month I rebuilt a fintech dashboard that was taking eight seconds to become interactive on mid-range Android devices in Nairobi. The API was fast. The design was clean. The problem was entirely on the client: too much JavaScript arriving too early, hydration fighting the main thread, and images loading without priority hints. After a focused performance pass, time-to-interactive dropped to under two seconds on the same hardware.",
      },
      {
        type: "paragraph",
        text: "That project reminded me that performance is not a polish step — it is part of the product experience, especially in markets where data bundles are expensive and devices skew older. In 2026, the tools are better than ever, but the discipline still matters.",
      },
      { type: "heading", text: "Start with the network, not the framework", level: 2 },
      {
        type: "paragraph",
        text: "Before touching React, I profile the waterfall. I look at document size, number of requests, and which assets block rendering. On Next.js App Router projects, I default to Server Components for anything that does not need browser APIs. Static marketing sections, article bodies, project metadata — all server-rendered. Client boundaries are intentional and small.",
      },
      {
        type: "code",
        language: "tsx",
        code: `// app/projects/page.tsx — fetch on the server, animate on the client
export default async function ProjectsPage() {
  const projects = await getGitHubProjects()
  return <ProjectsGrid initialProjects={projects} />
}`,
      },
      {
        type: "paragraph",
        text: "This pattern alone removed roughly 40KB of client JavaScript from a recent portfolio-style build. Users still get motion and interactivity where it counts; they do not pay for animation libraries on pages that are essentially documents.",
      },
      { type: "heading", text: "Images are still the silent killer", level: 2 },
      {
        type: "list",
        items: [
          "Use next/image with explicit width and height to avoid layout shift.",
          "Serve hero images at appropriate quality (75–80 is usually enough).",
          "Lazy-load below-the-fold media; priority-load only the LCP candidate.",
          "Prefer AVIF/WebP sources when your CDN supports automatic conversion.",
        ],
      },
      {
        type: "callout",
        title: "Field note from Nairobi",
        text: "On 3G connections, an unoptimized 2.4MB hero JPEG can add more perceived latency than 200KB of JavaScript. I test every launch on throttled mobile, not just desktop Wi‑Fi.",
      },
      { type: "heading", text: "Motion without melting the CPU", level: 2 },
      {
        type: "paragraph",
        text: "I use Framer Motion and Lenis on my own site, but I am careful about what runs on every frame. Scroll-linked transforms should use passive listeners and prefer transform/opacity over layout-triggering properties. I cap simultaneous animations on mobile and disable heavy cursor effects under 768px.",
      },
      {
        type: "quote",
        text: "Smooth is not the same as slow. Users notice jank immediately; they only notice elegance if the page still feels fast.",
        cite: "A rule I repeat to every team I mentor",
      },
      { type: "heading", text: "Caching strategy that survives real traffic", level: 2 },
      {
        type: "paragraph",
        text: "For semi-dynamic data like GitHub repositories, I use time-based revalidation (one hour) instead of fetching on every request. For user-specific dashboards, I reach for stale-while-revalidate at the edge. The goal is predictable freshness without hammering upstream APIs — GitHub rate limits are real, and your users do not need millisecond-fresh star counts.",
      },
      {
        type: "paragraph",
        text: "Performance work is cumulative. Server Components reduce JS. Image discipline improves LCP. Thoughtful animation preserves INP. Measured caching improves repeat visits. None of these are glamorous, but together they are what separates a demo that impresses in a meeting from a product that feels premium on a phone in Westlands at rush hour.",
      },
    ],
  },
  {
    slug: "street-photography-nairobi",
    title: "The Art of Street Photography in Nairobi",
    date: "May 28, 2026",
    isoDate: "2026-05-28",
    excerpt:
      "Nairobi is loud, fast, and generous to photographers who learn its rhythm. These are the principles I use for respectful, story-driven street work across the city.",
    readTime: "7 min read",
    category: "photography",
    coverImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=700&fit=crop",
    tags: ["Street", "Nairobi", "Documentary", "Light"],
    content: [
      {
        type: "paragraph",
        text: "The first frame I ever loved in this city was not technically perfect. It was a matatu conductor mid-gesture at dusk on Moi Avenue, backlit by a pharmacy sign, half in shadow. The focus was slightly soft. The composition was accidental. But the moment was true — and that truth is what street photography in Nairobi demands more than any lens specification.",
      },
      {
        type: "paragraph",
        text: "Street work here is not about hunting strangers for shock value. It is about reading public life: the negotiation of space, the micro-dramas at bus stages, the way light cuts through dust after Harmattan thins. If you learn the city's tempo, your camera stops feeling intrusive and starts feeling like part of the scene.",
      },
      { type: "heading", text: "Light windows you can plan for", level: 2 },
      {
        type: "list",
        ordered: true,
        items: [
          "Golden hour along Kenyatta Avenue when long shadows cross glass facades.",
          "Blue hour at roundabouts — headlights and signage mix into layered color.",
          "Overcast days for even portraits in open markets (Ngara, Gikomba).",
          "After-rain reflections on tarmac — high contrast, high story density.",
        ],
      },
      { type: "heading", text: "Respect is part of the technique", level: 2 },
      {
        type: "paragraph",
        text: "I ask when the moment allows. I smile before I raise the camera in tight spaces. If someone objects, I delete without debate — reputation travels faster than Instagram reach. Some of my strongest portraits came after a short conversation: where someone works, whether they mind a photo, what they think of the light. Consent is not anti-street; it is how you build repeat access to communities.",
      },
      {
        type: "quote",
        text: "A camera grants visibility. It does not grant permission.",
      },
      {
        type: "callout",
        title: "Gear I actually carry",
        text: "Sony A7III, 35mm f/1.8 for walk-around work, 85mm when I want compression. One spare battery. No rolling bag — mobility matters more than owning every focal length.",
      },
      { type: "heading", text: "Editing for truth, not fantasy", level: 2 },
      {
        type: "paragraph",
        text: "In Lightroom I correct exposure and white balance, recover shadows modestly, and crop for rhythm. I avoid heavy skin smoothing or sky replacement — Nairobi already has enough visual drama without inventing more. My goal is to preserve the feeling of being there: heat, noise, movement, and those brief seconds when everything aligns.",
      },
      {
        type: "paragraph",
        text: "Street photography here taught me patience that directly improved my engineering work. You wait for the frame. You anticipate behavior. You accept that most shots will be average and a few will matter. That mindset — iterate, select, refine — is the same whether you are editing RAW files or refactoring a React component.",
      },
    ],
  },
  {
    slug: "code-to-camera-creative-crossover",
    title: "From Code to Camera: Creative Crossover",
    date: "April 10, 2026",
    isoDate: "2026-04-10",
    excerpt:
      "Composition, constraints, and iteration show up in both my editor and my viewfinder. Here is how I translate engineering habits into stronger visual work — and vice versa.",
    readTime: "11 min read",
    category: "creativity",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=700&fit=crop",
    tags: ["Creativity", "Process", "Design", "Workflow"],
    content: [
      {
        type: "paragraph",
        text: "People assume engineering and photography are opposites — logic versus intuition. I have found they are sibling disciplines. Both reward clear structure. Both punish unnecessary complexity. Both produce better results when you define constraints early and iterate in small, reviewable steps.",
      },
      { type: "heading", text: "Composition is interface design", level: 2 },
      {
        type: "paragraph",
        text: "A photograph has a visual hierarchy: subject, supporting context, negative space. A landing page has the same hierarchy with typography and layout. When I design hero sections, I think like I am framing a portrait — what must the eye hit first, what should recede, where does the viewer rest?",
      },
      {
        type: "list",
        items: [
          "Rule of thirds maps cleanly to grid systems.",
          "Leading lines behave like directional cues in UI flow.",
          "Contrast controls attention the way color and weight do in design systems.",
          "Cropping is refactoring — remove until the message sharpens.",
        ],
      },
      { type: "heading", text: "Constraints accelerate creativity", level: 2 },
      {
        type: "paragraph",
        text: "In code reviews I push for smaller PRs. With a camera I limit myself to one focal length for entire walks. Constraints remove decision fatigue. When you cannot zoom, you move your feet. When you cannot ship a monolith, you design modules. The friction forces intentionality.",
      },
      {
        type: "quote",
        text: "Freedom without boundaries produces noise. Boundaries without skill produce clichés. The art is in the tension.",
        cite: "Journal entry, March 2026",
      },
      { type: "heading", text: "Iteration loops that actually compound", level: 2 },
      {
        type: "paragraph",
        text: "My photography culls follow a brutal sequence: import, flag, reject, refine, export. My code workflow mirrors it: build, test, review, merge, measure. In both cases the magic is not the first draft — it is the disciplined second and third pass where weak ideas die.",
      },
      {
        type: "code",
        language: "text",
        code: `Shoot  →  Cull  →  Edit  →  Publish
Build  →  Test  →  Refine →  Deploy`,
      },
      {
        type: "callout",
        title: "What photography gave my engineering",
        text: "I became better at saying no. Not every scene deserves a shutter press. Not every feature deserves a sprint. Selection is a skill.",
      },
      { type: "heading", text: "Building a personal system", level: 2 },
      {
        type: "paragraph",
        text: "I keep parallel toolchains: VS Code and Lightroom, Git and catalog stars, README files and contact sheets. The tools differ; the intent aligns. Document decisions. Version your work. Show your process publicly when you can — it attracts collaborators who care about craft, whether they ship APIs or exhibitions.",
      },
      {
        type: "paragraph",
        text: "If you are an engineer curious about photography, start with a single prime lens and a weekly walk. If you are a photographer learning code, start with a small site you actually need — a portfolio, a booking page, a gallery. The crossover is not talent; it is transferable discipline.",
      },
    ],
  },
  {
    slug: "shipping-portfolios-that-get-hired",
    title: "Shipping Portfolios That Actually Get You Hired",
    date: "March 2, 2026",
    isoDate: "2026-03-02",
    excerpt:
      "Recruiters spend seconds on your site. I rebuilt mine with that reality in mind — real projects, measurable outcomes, and proof you can ship.",
    readTime: "6 min read",
    category: "engineering",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop",
    tags: ["Career", "Portfolio", "Next.js"],
    content: [
      {
        type: "paragraph",
        text: "A portfolio is not a museum. It is a sales document with taste. Hiring managers do not want twenty half-finished repos; they want three credible stories that show judgment: problem, approach, outcome. When I advise developers in Nairobi's growing tech scene, that is the first correction I make.",
      },
      { type: "heading", text: "Show live work, not screenshots", level: 2 },
      {
        type: "paragraph",
        text: "Link deployments. Link GitHub. If the repo is private, describe constraints honestly and show architecture diagrams or redacted metrics. I pull projects dynamically from GitHub on this site so the grid stays current — stale portfolios signal stale skills.",
      },
      {
        type: "list",
        items: [
          "Lead with impact: users served, latency improved, revenue enabled.",
          "Name your stack precisely — recruiters search keywords.",
          "Include collaboration and org work, not only solo builds.",
          "Write one paragraph per project like a case study abstract.",
        ],
      },
      {
        type: "paragraph",
        text: "Motion and polish help only after clarity. A fast, readable page with strong copy beats an animated maze that hides what you built.",
      },
    ],
  },
  {
    slug: "lightroom-workflow-for-busy-developers",
    title: "A Lightroom Workflow for Busy Developers",
    date: "January 18, 2026",
    isoDate: "2026-01-18",
    excerpt:
      "I batch-edit hundreds of frames between sprints. This is the lightweight catalog system I use so photography stays joyful, not another backlog.",
    readTime: "5 min read",
    category: "photography",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=700&fit=crop",
    tags: ["Lightroom", "Workflow", "Editing"],
    content: [
      {
        type: "paragraph",
        text: "I treat photo sessions like feature branches: import to a dated folder, cull aggressively, apply a baseline preset, then hand-edit only the keepers. The goal is to finish a wedding or street walk in one sitting, not let SD cards become technical debt.",
      },
      { type: "heading", text: "The 20-minute cull", level: 2 },
      {
        type: "list",
        ordered: true,
        items: [
          "Flag picks with P, rejects with X — no hovering.",
          "Compare similar frames side-by-side; keep emotion over sharpness.",
          "Delete rejects before editing anything.",
          "Export only five to ten finals for social unless it is a paid deliverable.",
        ],
      },
      {
        type: "callout",
        title: "Preset discipline",
        text: "One base preset for daylight, one for tungsten interiors. Tweaks happen on top — never chase a new preset pack when your white balance is wrong.",
      },
      {
        type: "paragraph",
        text: "Developers already understand pipelines. Lightroom is just an image CI/CD system with better sunsets.",
      },
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []

  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0
      const bScore = b.category === current.category ? 1 : 0
      return bScore - aScore
    })
    .slice(0, limit)
}

export const categoryLabels: Record<BlogCategory, string> = {
  engineering: "Engineering",
  photography: "Photography",
  creativity: "Creativity",
}
