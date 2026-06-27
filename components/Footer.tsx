"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { MagneticButton } from "@/components/ui/MagneticButton"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/manu446", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/yourhandle", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/yourhandle", label: "Instagram" },
  ]

  return (
    <footer className="relative border-t border-zinc-200 bg-zinc-50/60 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/vartec-logo.png"
              alt="Vartec Design"
              className="h-12 w-auto object-contain mb-5"
            />
            <h3 className="font-display text-2xl font-bold text-zinc-900 mb-4">
              Immanuel Obure
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
              Full-stack engineer and photographer based in Nairobi. Building digital
              experiences and capturing moments across East Africa and beyond.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {["Home", "About", "Skills", "Projects", "Photography", "Blog", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-zinc-500 hover:text-cyan-600 text-sm transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <MagneticButton key={social.label} strength={0.4}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-cyan-600 hover:border-cyan-400/40 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-200">
          <p className="text-zinc-400 text-xs">
            © {currentYear} Immanuel Obure. All rights reserved.
          </p>
          <p className="text-zinc-400 text-xs">
            Built with Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
