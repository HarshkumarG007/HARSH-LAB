import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ChevronDown, Terminal, Cpu, Shield, Brain } from 'lucide-react'
import { credentialStats } from '../data/credentials'

const pillars = [
  { icon: Brain, label: 'AI/ML', color: 'text-neon-cyan' },
  { icon: Shield, label: 'SECURITY', color: 'text-neon-magenta' },
  { icon: Cpu, label: 'ROBOTICS', color: 'text-google-neon' },
  { icon: Terminal, label: 'EDUCATOR', color: 'text-ibm-purple' },
]

export default function HarshHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // MotionValues — no useState, no re-renders on mouse move
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Spring-smoothed motion values for the parallax title effect
  const springConfig = { stiffness: 60, damping: 20 }
  const titleX = useSpring(useTransform(rawX, v => v * 0.5), springConfig)
  const titleY = useSpring(useTransform(rawY, v => v * 0.5), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    rawX.set((e.clientX / window.innerWidth - 0.5) * 20)
    rawY.set((e.clientY / window.innerHeight - 0.5) * 20)
  }

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-matrix-DEFAULT animate-pulse shadow-[0_0_8px_#00FF41]" />
            <span className="text-matrix-DEFAULT">ONLINE</span>
          </div>
          <div className="h-4 w-[1px] bg-secondary/30 hidden md:block" />
          <span className="text-neon-cyan">{credentialStats.total}_CREDENTIALS_VERIFIED</span>
        </motion.div>

        {/* Main Identity — titleX/titleY are MotionValues, no re-render */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative mb-6"
        >
          <motion.h1
            className="font-display font-bold tracking-tighter leading-none"
            style={{ x: titleX, y: titleY }}
          >
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary/50">
              HARSH KUMAR
            </span>
            <span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-ibm-cyan to-neon-magenta"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              GUPTA
            </span>
          </motion.h1>
        </motion.div>

        {/* Role Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 px-6 py-3 glass rounded-full text-xs font-mono tracking-wider">
            <span className="text-neon-cyan">AI/ML ENGINEER</span>
            <span className="text-secondary/40">|</span>
            <span className="text-neon-magenta">SECURITY SPECIALIST</span>
            <span className="text-secondary/40">|</span>
            <span className="text-ibm-purple">IBM FACULTY</span>
          </div>
        </motion.div>

        {/* Four Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="p-4 glass rounded-lg border border-white/5 hover:border-neon-cyan/30 transition-colors group cursor-default"
            >
              <pillar.icon className={`w-6 h-6 ${pillar.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
              <span className={`text-xs font-mono ${pillar.color}`}>{pillar.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Journey Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mb-12"
        >
          <p className="text-secondary/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            <span className="text-neon-cyan">{credentialStats.total} verified credentials</span> across{' '}
            <span className="text-google-blue">Google</span> &{' '}
            <span className="text-ibm-cyan">IBM</span>.{' '}
            From IT foundations to AI/ML engineering. From cybersecurity to generative AI.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs font-mono text-secondary/50">
            <span>AUG 2024</span>
            <div className="w-28 h-[2px] bg-gradient-to-r from-google-green via-ibm-cyan to-neon-magenta rounded-full" />
            <span>JUL 2026</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#credentials"
            className="group relative px-8 py-4 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-mono text-sm tracking-wider uppercase overflow-hidden hover:bg-neon-cyan/20 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Terminal size={16} />
              View_Credentials()
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/20 to-neon-cyan/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="#projects"
            className="px-8 py-4 border border-neon-magenta/30 text-neon-magenta font-mono text-sm tracking-wider uppercase hover:border-neon-magenta hover:bg-neon-magenta/10 transition-all duration-300"
          >
            Explore_Projects()
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-neon-cyan/50"
        >
          <span className="text-xs font-mono tracking-widest">[SCROLL]</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* HUD Elements */}
      <div className="absolute top-24 left-6 text-xs font-mono text-neon-cyan/25 hidden md:block leading-6 select-none">
        <div>SYS: ONLINE</div>
        <div>LOC: INDIA</div>
        <div>SEC: ENCRYPTED</div>
      </div>
      <div className="absolute top-24 right-6 text-xs font-mono text-neon-cyan/25 text-right hidden md:block leading-6 select-none">
        <div>CLEARANCE: IBM_FACULTY</div>
        <div>CREDS: {credentialStats.total}</div>
        <div>STATUS: AVAILABLE</div>
      </div>
    </section>
  )
}
