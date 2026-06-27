"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send, Check, Github, Linkedin, Instagram, Loader2 } from "lucide-react"
import { LayeredText } from "@/components/ui/LayeredText"
import { Reveal } from "@/components/ui/Reveal"
import { MagneticButton } from "@/components/ui/MagneticButton"

const CONTACT_EMAIL = "immanuelobure854@gmail.com"
const FORM_ENDPOINT = `https://formsubmit.co/${CONTACT_EMAIL}`

const contactInfo = [
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Phone, label: "Phone", value: "+254 759 643 903", href: "tel:+254759643903" },
  { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: null },
]

const socials = [
  { icon: Github, href: "https://github.com/manu446", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/yourhandle", label: "Instagram" },
]

type FormStatus = "idle" | "loading" | "success"

export default function ContactPage() {
  const [subject, setSubject] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [nextUrl, setNextUrl] = useState("")

  useEffect(() => {
    setNextUrl(`${window.location.origin}/contact?sent=1`)

    const params = new URLSearchParams(window.location.search)
    if (params.get("sent") === "1") {
      setStatus("success")
      window.history.replaceState(null, "", "/contact")
      setTimeout(() => setStatus("idle"), 6000)
    }
  }, [])

  const handleSubmit = () => {
    setStatus("loading")
  }

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/70 shadow-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs text-zinc-600 uppercase tracking-[0.2em]">
              Let&apos;s Connect
            </span>
          </motion.div>

          <LayeredText
            text="Let's Work Together"
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            layers={4}
          />

          <motion.p
            className="text-zinc-600 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Got a project, a collaboration, or just want to say hello? Drop me a
            message — I usually reply within a day.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
            {/* Info */}
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <Reveal key={info.label} delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium text-zinc-900 hover:text-cyan-600 transition-colors break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="font-medium text-zinc-900">{info.value}</div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.3}>
                <div className="glass rounded-2xl p-6">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-4">
                    Find me online
                  </div>
                  <div className="flex gap-3">
                    {socials.map((s) => (
                      <MagneticButton key={s.label} strength={0.4}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-cyan-600 hover:border-cyan-400/40 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-300"
                          aria-label={s.label}
                        >
                          <s.icon size={17} />
                        </a>
                      </MagneticButton>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={0.2}>
              <form
                action={FORM_ENDPOINT}
                method="POST"
                onSubmit={handleSubmit}
                className="glass rounded-3xl p-8 md:p-10"
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value={`Portfolio: ${subject || "New message"}`} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}

                {/* Honeypot — hidden from users, catches bots */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition disabled:opacity-60 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                  >
                    <option value="" disabled>
                      Select inquiry type
                    </option>
                    <option value="Development">Development</option>
                    <option value="Photography">Photography</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition resize-none disabled:opacity-60"
                  />
                </div>

                {status === "success" && (
                  <p className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    Message sent! I&apos;ll get back to you at the email you provided.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={status !== "loading" ? { scale: 1.02 } : undefined}
                  whileTap={status !== "loading" ? { scale: 0.98 } : undefined}
                  className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
                    status === "success"
                      ? "bg-emerald-500"
                      : "bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30"
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check size={18} /> Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
