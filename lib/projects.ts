export type ProjectCategory = "web" | "mobile" | "other"
export type ProjectSource = "personal" | "collaboration" | "organization"

export interface Project {
  id: number
  title: string
  slug: string
  category: ProjectCategory
  source: ProjectSource
  ownerLogin: string
  year: string
  description: string
  tags: string[]
  icon: string
  liveUrl: string | null
  githubUrl: string
  image: string
  fallbackImage: string
  stars: number
  language: string | null
  updatedAt: string
}

export const PROJECT_FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "live", label: "Live Sites" },
  { id: "personal", label: "Personal" },
  { id: "collaboration", label: "Collaboration" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "other", label: "Other" },
] as const

export type ProjectFilterId = (typeof PROJECT_FILTERS)[number]["id"]

export const CATEGORY_SECTIONS: {
  id: ProjectCategory
  label: string
  description: string
}[] = [
  {
    id: "web",
    label: "Web",
    description: "Websites, web apps, and front-end projects built with modern stacks.",
  },
  {
    id: "mobile",
    label: "Mobile",
    description: "Mobile apps and cross-platform experiences.",
  },
  {
    id: "other",
    label: "Other",
    description: "Tools, experiments, and repositories outside web and mobile.",
  },
]
