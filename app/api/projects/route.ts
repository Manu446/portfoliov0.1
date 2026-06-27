import { NextResponse } from "next/server"
import { getGitHubProjects } from "@/lib/github"

export const revalidate = 3600

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get("limit")
    const limit = limitParam ? Math.max(1, parseInt(limitParam, 10)) : null
    const all = searchParams.get("all") === "true"
    const liveOnly = !all

    let projects = await getGitHubProjects({ liveOnly })
    if (limit && !Number.isNaN(limit)) {
      projects = projects.slice(0, limit)
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects from GitHub" },
      { status: 500 }
    )
  }
}
