import { useState, useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'
import WorldCanvas from '../v7/WorldCanvas'
import LoadingScreen from '../components/LoadingScreen'
import { credentialStats, credentials } from '../data/credentials'
import { projects } from '../data/projects'
import { repositoryEvidence } from '../data/evidence'

// ─── Desktop overlays ─────────────────────────────────────────────────────────

function HeroOverlay({ reduced }: { reduced: boolean }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen text-center pointer-events-none px-6"
      aria-label="Hero"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.8, duration: reduced ? 0.1 : 1.2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/30 text-xs font-mono tracking-widest">
          <span>SCROLL TO EXPLORE THE LAB</span>
          {!reduced && (
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
            />
          )}
        </div>
      </motion.div>
    </section>
  )
}

function SectionOverlay({
  id, title, subtitle, align = 'left', reduced,
}: {
  id: string; title: string; subtitle: string; align?: 'left' | 'right' | 'center'; reduced: boolean
}) {
  const alignClass = align === 'right' ? 'items-end text-right' :
                     align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <section
      id={id}
      className={`relative flex flex-col justify-center min-h-screen px-8 md:px-24 pointer-events-none ${alignClass}`}
      aria-label={subtitle}
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: reduced ? 0.1 : 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md"
      >
        <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3 opacity-70">
          {subtitle}
        </p>
        <h2
          className="text-3xl md:text-5xl font-bold text-white leading-tight"
          style={{ fontFamily: 'Inter, sans-serif', textShadow: '0 0 60px rgba(99,102,241,0.3)' }}
        >
          {title}
        </h2>
      </motion.div>
    </section>
  )
}

function NexusNav() {
  const navItems = ['Evidence', 'Projects', 'Credentials', 'Contact']
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 pointer-events-auto"
      aria-label="Main navigation"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-mono text-sm tracking-widest text-white/60"
      >
        <span className="text-indigo-400 font-bold">HARSH</span> LAB
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex items-center gap-6 text-xs font-mono text-white/40"
      >
        {navItems.map(s => (
          <a
            key={s}
            href={`#${s.toLowerCase()}`}
            aria-label={`Navigate to ${s} section`}
            className="hover:text-white/80 transition-colors pointer-events-auto focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
          >
            {s}
          </a>
        ))}
      </motion.div>
    </nav>
  )
}

function NexusHUD({ progress }: { progress: number }) {
  const sections = ['HERO', 'EVIDENCE', 'PROJECTS', 'CREDENTIALS', 'CONTACT']
  const currentSection = sections[Math.min(Math.floor(progress * sections.length), sections.length - 1)]

  return (
    <div
      className="fixed bottom-8 left-8 z-50 font-mono text-xs text-white/30 flex flex-col gap-2 pointer-events-none"
      aria-hidden="true"
    >
      <div className="text-indigo-400/60 text-[10px] tracking-widest">{currentSection}</div>
      <div className="w-24 h-px bg-white/10 relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-indigo-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="text-[10px]">{Math.round(progress * 100)}%</div>
    </div>
  )
}

// ─── NEXUS Lite — real mobile experience ──────────────────────────────────────
// No 3D canvas. Same information architecture. Same visual character.

function NexusLite() {
  const featuredProjects = projects.filter(p => p.featured)
  const topCredentials = credentials.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#050510] text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Skip link */}
      <a
        href="#mobile-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Nav */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl" aria-label="Main navigation">
        <span className="font-mono text-sm tracking-widest text-white/60">
          <span className="text-indigo-400 font-bold">HARSH</span> LAB
        </span>
        <span className="text-white/20 font-mono text-[10px] tracking-widest">AI SYSTEMS</span>
      </nav>

      <main id="mobile-main">
        {/* Hero */}
        <section className="px-6 py-16 border-b border-white/5" aria-label="Identity">
          <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-4">
            Harsh Kumar Gupta
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-4" style={{ textShadow: '0 0 40px rgba(99,102,241,0.4)' }}>
            AI Systems &<br />Applied Engineering
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
            Building AI systems with evidence.{' '}
            {credentialStats.total} verified credentials.{' '}
            {repositoryEvidence.totalCommits} commits.{' '}
            <span className="text-white/30 text-xs">Audit snapshot · {repositoryEvidence.auditDate}</span>
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://github.com/HarshkumarG007"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="View GitHub profile"
            >
              GitHub →
            </a>
            <a
              href="mailto:harshkumarg007@gmail.com"
              className="px-5 py-2.5 border border-white/20 hover:border-white/40 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Send email"
            >
              Contact
            </a>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-6 py-12 border-b border-white/5" aria-label="Projects">
          <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-6">Project Vault</p>
          <h2 className="text-2xl font-bold mb-8 text-white">Systems, not demos.</h2>
          <div className="space-y-4">
            {featuredProjects.map(project => (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl border border-white/8 hover:border-indigo-500/40 bg-white/2 hover:bg-indigo-950/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={`View ${project.title} on GitHub`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="font-bold text-white text-sm">{project.title}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ${
                    project.tier === 'A' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    project.tier === 'B' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' :
                    'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    Tier {project.tier}
                  </span>
                </div>
                <p className="text-white/40 text-xs mb-3 leading-relaxed">{project.tagline}</p>
                <div className="flex items-center gap-4 text-[10px] font-mono text-white/30">
                  <span>{project.commits} commits</span>
                  <span className="text-white/20">·</span>
                  <span>{project.category}</span>
                  <span className="text-white/20">·</span>
                  <span>{project.year}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Evidence */}
        <section id="evidence" className="px-6 py-12 border-b border-white/5" aria-label="Evidence">
          <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-6">Evidence Observatory</p>
          <h2 className="text-2xl font-bold mb-2 text-white">Every commit, visible.</h2>
          <p className="text-white/30 text-xs font-mono mb-8">AUDIT SNAPSHOT · {repositoryEvidence.auditDate}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Commits', value: repositoryEvidence.totalCommits },
              { label: 'Repositories', value: repositoryEvidence.totalRepos },
              { label: 'Credentials', value: credentialStats.total },
              { label: 'Overall Score', value: `${repositoryEvidence.overallScore}/10` },
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-xl border border-white/8 bg-white/2">
                <div className="text-2xl font-bold text-indigo-400 mb-1">{stat.value}</div>
                <div className="text-white/40 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-4 font-mono">Self-assessed · {repositoryEvidence.methodology}</p>
        </section>

        {/* Credentials */}
        <section id="credentials" className="px-6 py-12 border-b border-white/5" aria-label="Credentials">
          <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-6">Credential Constellation</p>
          <h2 className="text-2xl font-bold mb-2 text-white">
            {credentialStats.total} verified. Zero inflated.
          </h2>
          <p className="text-white/30 text-xs font-mono mb-8">
            {credentialStats.google} Google · {credentialStats.ibm} IBM · {credentialStats.dateRange}
          </p>
          <div className="space-y-2">
            {topCredentials.map(cred => (
              <div key={cred.id} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cred.color }} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <div className="text-white/80 text-xs font-medium truncate">{cred.title}</div>
                  <div className="text-white/30 text-[10px] font-mono">{cred.issuer} · {cred.date}</div>
                </div>
              </div>
            ))}
          </div>
          {credentials.length > topCredentials.length && (
            <p className="text-white/30 text-xs text-center mt-4 font-mono">
              +{credentials.length - topCredentials.length} more on desktop
            </p>
          )}
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-12" aria-label="Contact">
          <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-6">Initiate Contact</p>
          <h2 className="text-2xl font-bold mb-4 text-white">Build something real.</h2>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Open to AI/ML engineering roles, applied research, and interesting problems.
          </p>
          <div className="space-y-3">
            <a
              href="mailto:harshkumarg007@gmail.com"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-indigo-500/40 bg-white/2 hover:bg-indigo-950/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Send email to harshkumarg007@gmail.com"
            >
              <span className="text-indigo-400 font-mono text-xs">EMAIL</span>
              <span className="text-white/60 text-sm">harshkumarg007@gmail.com</span>
            </a>
            <a
              href="https://github.com/HarshkumarG007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-indigo-500/40 bg-white/2 hover:bg-indigo-950/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="View GitHub profile"
            >
              <span className="text-indigo-400 font-mono text-xs">GITHUB</span>
              <span className="text-white/60 text-sm">HarshkumarG007</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="px-6 py-8 border-t border-white/5 text-center">
        <p className="text-white/20 font-mono text-[10px] tracking-widest">
          HARSH LAB · For full 3D experience, open on desktop
        </p>
      </footer>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function NexusVersion() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const scrollProgress = useMotionValue(0)
  const [isMobile, setIsMobile] = useState(false)
  const [hudProgress, setHudProgress] = useState(0)

  // Use CSS media query — not navigator.maxTouchPoints which wrongly flags touchscreen laptops
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Respect user's prefers-reduced-motion setting
  const prefersReduced = useReducedMotion() ?? false

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const handleScroll = () => {
      const doc = document.documentElement
      const scrolled = doc.scrollTop
      const total = doc.scrollHeight - doc.clientHeight
      const p = total > 0 ? scrolled / total : 0
      scrollProgress.set(p)
      setHudProgress(p)
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mouseX, mouseY, scrollProgress])

  // MOBILE: real NEXUS Lite — same content, no expensive 3D
  if (isMobile) return <NexusLite />

  return (
    <div className="relative text-white" style={{ background: '#050510' }}>
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded focus:text-sm"
      >
        Skip to main content
      </a>

      <LoadingScreen />

      {/* Fixed 3D Canvas — the world */}
      <WorldCanvas mouseX={mouseX} mouseY={mouseY} isMobile={false} />

      {/* Scrollable HTML overlay */}
      <div id="main-content" className="relative z-10" style={{ pointerEvents: 'none' }}>
        <NexusNav />
        <NexusHUD progress={hudProgress} />

        <HeroOverlay reduced={prefersReduced} />

        <SectionOverlay
          id="evidence"
          title="Every commit, visible."
          subtitle="Evidence Observatory"
          align="left"
          reduced={prefersReduced}
        />

        <SectionOverlay
          id="projects"
          title="Systems, not demos."
          subtitle="Project Vault"
          align="right"
          reduced={prefersReduced}
        />

        {/* Data-driven credential count — never hardcoded */}
        <SectionOverlay
          id="credentials"
          title={`${credentialStats.total} verified. Zero inflated.`}
          subtitle="Credential Constellation"
          align="center"
          reduced={prefersReduced}
        />

        <ContactOverlay />
        <SectionOverlay
          id="contact"
          title="Build something real."
          subtitle="Initiate Contact"
          align="center"
          reduced={prefersReduced}
        />
      </div>
    </div>
  )
}

// Add AFTER the credentials SectionOverlay and BEFORE the contact SectionOverlay
// This appears at the same scroll position as the contact section
function ContactOverlay() {
  return (
    <div
      className="relative flex flex-col justify-center min-h-screen items-center text-center px-8"
      style={{ pointerEvents: 'none' }}
    >
      {/* Visible contact links — pointer-events re-enabled */}
      <div className="flex flex-col items-center gap-4 mt-32" style={{ pointerEvents: 'auto' }}>
        <a
          href="mailto:harshkumarg007@gmail.com"
          className="font-mono text-sm text-white/40 hover:text-indigo-400 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-2 py-1"
          aria-label="Send email"
        >
          harshkumarg007@gmail.com
        </a>
        <div className="flex gap-6">
          <a
            href="https://github.com/HarshkumarG007"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-white/30 hover:text-white/70 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-2 py-1"
            aria-label="GitHub profile"
          >
            GitHub →
          </a>
          <a
            href="https://www.linkedin.com/in/harshkumarg/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-white/30 hover:text-white/70 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-2 py-1"
            aria-label="LinkedIn profile"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </div>
  )
}
