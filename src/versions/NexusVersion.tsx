import { useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import WorldCanvas from '../v7/WorldCanvas'

// HTML sections positioned over the 3D canvas
// These create the scroll-driven narrative text overlays
function HeroOverlay() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center pointer-events-none px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/30 text-xs font-mono tracking-widest">
          <span>SCROLL TO EXPLORE THE LAB</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}

function SectionOverlay({
  id, title, subtitle, align = 'left',
}: {
  id: string; title: string; subtitle: string; align?: 'left' | 'right' | 'center'
}) {
  const alignClass = align === 'right' ? 'items-end text-right' :
                     align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <section
      id={id}
      className={`relative flex flex-col justify-center min-h-screen px-8 md:px-24 pointer-events-none ${alignClass}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md"
      >
        <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3 opacity-70">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight"
          style={{
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 0 60px rgba(99,102,241,0.3)',
          }}
        >
          {title}
        </h2>
      </motion.div>
    </section>
  )
}

function NexusNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 pointer-events-auto">
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
        {['Evidence', 'Projects', 'Credentials', 'Contact'].map(s => (
          <a
            key={s}
            href={`#${s.toLowerCase()}`}
            className="hover:text-white/80 transition-colors pointer-events-auto"
          >
            {s}
          </a>
        ))}
      </motion.div>
    </nav>
  )
}

// Bottom HUD — shows current section and scroll progress
function NexusHUD({ progress }: { progress: number }) {
  const sections = ['HERO', 'EVIDENCE', 'PROJECTS', 'CREDENTIALS', 'CONTACT']
  const currentSection = sections[Math.min(Math.floor(progress * sections.length), sections.length - 1)]

  return (
    <div className="fixed bottom-8 left-8 z-50 font-mono text-xs text-white/30 flex flex-col gap-2 pointer-events-none">
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

export default function NexusVersion() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const scrollProgress = useMotionValue(0)
  const [isMobile, setIsMobile] = useState(false)
  const [hudProgress, setHudProgress] = useState(0)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0)
  }, [])

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
      setHudProgress(p) // only hud needs react state
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mouseX, mouseY, scrollProgress])

  // MOBILE: fall back to simple dark page (3D too heavy)
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#050510] text-white flex items-center justify-center">
        <div className="text-center px-8">
          <div className="text-indigo-400 font-mono text-xs tracking-widest mb-4">HARSH LAB / V7 NEXUS</div>
          <h1 className="text-4xl font-bold mb-4">
            AI Systems &<br />Applied Engineering
          </h1>
          <p className="text-white/40 text-sm mb-8">
            V7 NEXUS requires a desktop browser for the full 3D experience.
          </p>
          <a
            href="https://harsh-lab-one.vercel.app"
            className="px-6 py-3 bg-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors"
          >
            View Portfolio →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative text-white"
      style={{ background: '#050510' }}
    >
      {/* Fixed 3D Canvas — the world */}
      <WorldCanvas mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />

      {/* Scrollable HTML overlay — triggers camera movement */}
      <div className="relative z-10" style={{ pointerEvents: 'none' }}>
        <NexusNav />
        <NexusHUD progress={hudProgress} />

        {/* Scroll height creates the scroll trigger zones */}
        {/* Each section is one full viewport height */}
        <HeroOverlay />

        <SectionOverlay
          id="evidence"
          title="Every commit, visible."
          subtitle="Evidence Observatory"
          align="left"
        />

        <SectionOverlay
          id="projects"
          title="Systems, not demos."
          subtitle="Project Vault"
          align="right"
        />

        <SectionOverlay
          id="credentials"
          title="20 verified. Zero inflated."
          subtitle="Credential Constellation"
          align="center"
        />

        <SectionOverlay
          id="contact"
          title="Build something real."
          subtitle="Initiate Contact"
          align="center"
        />
      </div>
    </div>
  )
}
