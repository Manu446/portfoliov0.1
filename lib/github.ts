import type { Project, ProjectCategory, ProjectSource } from "@/lib/projects"

const GITHUB_USERNAME = (process.env.GITHUB_USERNAME ?? "manu446").toLowerCase()

interface GitHubOwner {
  login: string
  type: "User" | "Organization"
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  fork: boolean
  topics: string[]
  pushed_at: string
  archived: boolean
  owner: GitHubOwner
}

const LANGUAGE_ICONS: Record<string, string> = {
  JavaScript: "⚡",
  TypeScript: "🔷",
  Python: "🐍",
  HTML: "🌐",
  CSS: "🎨",
  Java: "☕",
  Go: "🔵",
  Rust: "🦀",
  PHP: "🐘",
  Ruby: "💎",
  Swift: "🍎",
  Kotlin: "📱",
  Dart: "🎯",
  Shell: "🖥️",
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "immanuel-portfolio",
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: githubHeaders(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status} for ${url}`)
  }
  return res.json() as Promise<T>
}

function formatTitle(name: string): string {
  return name
    .replace(/[._-]+/g, " ")
    .replace(/\bv\b\.?\s*0?/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function inferCategory(repo: GitHubRepo): ProjectCategory {
  const haystack = `${repo.name} ${repo.topics.join(" ")} ${repo.language ?? ""}`.toLowerCase()

  if (
    haystack.includes("react-native") ||
    haystack.includes("flutter") ||
    haystack.includes("expo") ||
    haystack.includes("mobile") ||
    repo.language === "Dart" ||
    repo.language === "Swift" ||
    repo.language === "Kotlin"
  ) {
    return "mobile"
  }

  if (
    haystack.includes("next") ||
    haystack.includes("react") ||
    haystack.includes("web") ||
    haystack.includes("frontend") ||
    haystack.includes("fullstack") ||
    repo.language === "JavaScript" ||
    repo.language === "TypeScript" ||
    repo.language === "HTML" ||
    repo.language === "CSS"
  ) {
    return "web"
  }

  return "other"
}

function buildTags(repo: GitHubRepo): string[] {
  const tags = new Set<string>()
  if (repo.language) tags.add(repo.language)
  repo.topics.slice(0, 3).forEach((topic) => tags.add(topic.replace(/-/g, " ")))
  if (repo.owner.type === "Organization") {
    tags.add(repo.owner.login)
  }
  return Array.from(tags).slice(0, 4)
}

function normalizeHomepage(url: string | null): string | null {
  if (!url || url.trim() === "") return null
  const trimmed = url.trim()
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed
  return `https://${trimmed}`
}

function inferSource(repo: GitHubRepo): ProjectSource {
  const ownerLogin = repo.owner.login.toLowerCase()
  if (repo.owner.type === "Organization") return "organization"
  if (ownerLogin !== GITHUB_USERNAME) return "collaboration"
  return "personal"
}

function repoThumbnail(owner: string, name: string): string {
  return `https://opengraph.githubassets.com/1/${owner}/${name}`
}

function siteScreenshot(url: string): string {
  // WordPress mShots renders a live screenshot of the deployed site (free, no API key)
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=800`
}

// Manual overrides keyed by lowercased repo name. Lets us supply live URLs for
// repos that are deployed but have no GitHub "homepage" field, rename display
// titles, or hide a repo from the portfolio.
interface RepoOverride {
  title?: string
  liveUrl?: string
  hidden?: boolean
}

const REPO_OVERRIDES: Record<string, RepoOverride> = {
  "flt-v.06.26": {
    title: "FLT",
    liveUrl: "https://manu446.github.io/FLT-v.06.26/",
  },
  "acculeap-website-v.0.02": {
    title: "Acculeap",
    liveUrl: "https://manu446.github.io/Acculeap-website-v.0.02/",
  },
  // Superseded by the FLT repo
  "future_life_tabernacle.v.0.0.1": {
    hidden: true,
  },
}

function toProject(repo: GitHubRepo): Project {
  const ownerLogin = repo.owner.login
  const source = inferSource(repo)
  const override = REPO_OVERRIDES[repo.name.toLowerCase()] ?? {}
  const liveUrl = override.liveUrl ?? normalizeHomepage(repo.homepage)
  const repoCard = repoThumbnail(ownerLogin, repo.name)

  return {
    id: repo.id,
    title: override.title ?? formatTitle(repo.name),
    slug: repo.name,
    category: inferCategory(repo),
    source,
    ownerLogin,
    year: new Date(repo.pushed_at).getFullYear().toString(),
    description:
      repo.description?.trim() ||
      (source === "organization"
        ? `Organization project at ${ownerLogin} — ${formatTitle(repo.name)}.`
        : source === "collaboration"
          ? `Collaborative open-source project with ${ownerLogin}.`
          : `Open-source project hosted on GitHub — ${formatTitle(repo.name)}.`),
    tags: buildTags(repo),
    icon: LANGUAGE_ICONS[repo.language ?? ""] ?? "📦",
    liveUrl,
    githubUrl: repo.html_url,
    image: liveUrl ? siteScreenshot(liveUrl) : repoCard,
    fallbackImage: repoCard,
    stars: repo.stargazers_count,
    language: repo.language,
    updatedAt: repo.pushed_at,
  }
}

function parseOrgList(): string[] {
  const fromEnv = process.env.GITHUB_ORGS
  if (!fromEnv) return []
  return fromEnv
    .split(",")
    .map((org) => org.trim())
    .filter(Boolean)
}

async function fetchPersonalRepos(): Promise<GitHubRepo[]> {
  return fetchJson<GitHubRepo[]>(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
  )
}

async function fetchAffiliatedRepos(): Promise<GitHubRepo[]> {
  if (!process.env.GITHUB_TOKEN) return []

  return fetchJson<GitHubRepo[]>(
    "https://api.github.com/user/repos?affiliation=collaborator,organization_member&visibility=public&sort=updated&per_page=100"
  )
}

async function fetchPublicOrgMemberships(): Promise<string[]> {
  try {
    const orgs = await fetchJson<{ login: string }[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/orgs`
    )
    return orgs.map((org) => org.login)
  } catch {
    return []
  }
}

async function fetchOrgRepos(org: string): Promise<GitHubRepo[]> {
  return fetchJson<GitHubRepo[]>(
    `https://api.github.com/orgs/${org}/repos?type=public&sort=updated&per_page=100`
  )
}

function mergeRepos(...lists: GitHubRepo[][]): GitHubRepo[] {
  const map = new Map<number, GitHubRepo>()
  for (const list of lists) {
    for (const repo of list) {
      if (!repo.fork && !repo.archived) {
        map.set(repo.id, repo)
      }
    }
  }
  return Array.from(map.values())
}

export async function getGitHubProjects(options?: {
  liveOnly?: boolean
}): Promise<Project[]> {
  const liveOnly = options?.liveOnly ?? false
  const orgNames = Array.from(
    new Set([...parseOrgList(), ...(await fetchPublicOrgMemberships())])
  )

  const [personal, affiliated, ...orgRepoLists] = await Promise.all([
    fetchPersonalRepos(),
    fetchAffiliatedRepos(),
    ...orgNames.map((org) => fetchOrgRepos(org).catch(() => [] as GitHubRepo[])),
  ])

  const orgRepos = orgRepoLists.flat()

  const merged = mergeRepos(personal, affiliated, orgRepos)

  const projects = merged
    .filter((repo) => !REPO_OVERRIDES[repo.name.toLowerCase()]?.hidden)
    .map(toProject)

  const visible = liveOnly
    ? projects.filter((project) => Boolean(project.liveUrl))
    : projects

  return visible.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
}

export function getGitHubProfileUrl() {
  return `https://github.com/${GITHUB_USERNAME}`
}
