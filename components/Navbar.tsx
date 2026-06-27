"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { navLinks } from "@/lib/data"
import { MagneticButton } from "@/components/ui/MagneticButton"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/75 backdrop-blur-xl border-b border-zinc-200/80 shadow-[0_6px_24px_rgba(15,23,42,0.05)]"
            : "py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white font-display font-bold text-lg relative overflow-hidden shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
              <span className="relative z-10">IO</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-zinc-900 text-sm tracking-tight">
                Immanuel Obure
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                Engineer & Photographer
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-cyan-600"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-cyan-500/10 rounded-full ring-1 ring-cyan-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <MagneticButton strength={0.2}>
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300"
              >
                Hire Me
                <ArrowUpRight size={15} />
              </Link>
            </MagneticButton>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-3xl font-display font-bold ${
                      pathname === link.href
                        ? "text-gradient"
                        : "text-zinc-700 hover:text-zinc-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
