import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { SmoothScroll } from "@/components/SmoothScroll"
import { ParticleBackground } from "@/components/animations/ParticleBackground"
import { ScrollProgress } from "@/components/animations/ScrollProgress"
import { CursorFollower } from "@/components/animations/CursorFollower"
import { NoiseOverlay } from "@/components/animations/NoiseOverlay"
import { LoadingScreen } from "@/components/animations/LoadingScreen"
import { AmbientSoundtrack } from "@/components/AmbientSoundtrack"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Immanuel Obure — Engineer & Photographer",
  description:
    "Full-stack software engineer and photographer based in Nairobi. Building digital experiences and capturing moments.",
  keywords: ["software engineer", "photographer", "web developer", "Nairobi", "React", "Next.js"],
  authors: [{ name: "Immanuel Obure" }],
  openGraph: {
    title: "Immanuel Obure — Engineer & Photographer",
    description: "Full-stack software engineer and photographer based in Nairobi.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${bricolage.variable} font-sans bg-white text-zinc-900 antialiased overflow-x-hidden`}
      >
        {/* Ambient light background */}
        <div className="fixed inset-0 -z-10 bg-white" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_85%_-10%,rgba(6,182,212,0.10),transparent),radial-gradient(50rem_50rem_at_-10%_20%,rgba(236,72,153,0.08),transparent)]" />
        <div
          className="fixed inset-0 -z-10 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.035) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 75%)",
          }}
        />
        <SmoothScroll />
        <LoadingScreen />
        <ParticleBackground />
        <ScrollProgress />
        <CursorFollower />
        <NoiseOverlay />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <AmbientSoundtrack />
      </body>
    </html>
  )
}
