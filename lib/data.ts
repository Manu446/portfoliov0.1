export interface ExperienceItem {
  id: number
  date: string
  title: string
  company: string
  description: string
  logo?: string
}

export const experience: ExperienceItem[] = [
  {
    id: 1,
    date: "2024 — Present",
    title: "Software Engineer",
    company: "Freelance / Independent",
    description: "Building modern web applications with React, Next.js, and Node.js after completing my software engineering studies. Focused on performance, accessibility, and clean, maintainable architecture.",
  },
  {
    id: 2,
    date: "2020 — 2024",
    title: "Software Engineering",
    company: "Zetech University",
    logo: "/zetech-logo.png",
    description: "Completed my software engineering course in 2024. Focused on software engineering, algorithms, and human-computer interaction.",
  },
  {
    id: 3,
    date: "2023 — Present",
    title: "Freelance Photographer",
    company: "Vartec Design",
    logo: "/vartec-logo.png",
    description: "Freelance photography and visual work under Vartec Design — portraits, events, and commercial shoots across East Africa.",
  },
  {
    id: 4,
    date: "2021 — 2023",
    title: "Photographer",
    company: "Audo Photography TV",
    description: "Started my photography journey in 2021 with Audo Photography TV, developing portrait and documentary skills and building an eye for visual storytelling.",
  },
]

export const skills = {
  engineering: [
    { name: "JavaScript / TypeScript", level: 95 },
    { name: "React / Next.js", level: 90 },
    { name: "Node.js / Express", level: 85 },
    { name: "Python / Django", level: 75 },
    { name: "AWS / Docker / CI/CD", level: 80 },
  ],
  photography: [
    { name: "Portrait Photography", level: 92 },
    { name: "Street Photography", level: 88 },
    { name: "Landscape / Nature", level: 85 },
    { name: "Adobe Lightroom", level: 90 },
    { name: "Adobe Photoshop", level: 78 },
  ],
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/photography", label: "Photography" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]
