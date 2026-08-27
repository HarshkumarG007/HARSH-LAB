import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // MotionValues for orb parallax — zero re-renders
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const springConfig = { stiffness: 60, damping: 20 }
  const orbX = useSpring(rawX, springConfig)
  const orbY = useSpring(rawY, springConfig)
  const orbXInv = useTransform(orbX, v => -v)
  const orbYInv = useTransform(orbY, v => -v)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    rawX.set((e.clientX / window.innerWidth - 0.5) * 20)
    rawY.set((e.clientY / window.innerHeight - 0.5) * 20)
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Gradient Orbs — GPU-composited, paint-contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'paint layout' }}>
        <motion.div
          className="gradient-orb w-[600px] h-[600px] bg-indigo-500 -top-20 -left-20"
          style={{ x: orbX, y: orbY, willChange: 'transform' }}
        />
        <motion.div
          className="gradient-orb w-[500px] h-[500px] bg-purple-500 bottom-0 right-0"
          style={{ x: orbXInv, y: orbYInv, willChange: 'transform' }}
        />
        <div className="gradient-orb w-[400px] h-[400px] bg-rose-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Mesh Pattern */}
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="badge-premium">
            <Sparkles size={14} />
            Available for select projects
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tight mb-6"
        >
          <span className="text-gradient-primary">Harsh Kumar</span>
          <br />
          <span className="text-gradient-accent">Gupta</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-text-secondary mb-4 font-light"
        >
          AI/ML Engineer · Educator · Problem Solver
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-text-tertiary text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          303 commits across 12 repositories. 20 verified credentials.
          IBM SkillsBuild Faculty. Building intelligent systems with
          transparency and craft.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" className="btn-premium text-white flex items-center gap-2">
            View Projects
            <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-border hover:border-border-hover text-text-secondary hover:text-text-primary transition-all"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '303', label: 'Commits' },
              { value: '20', label: 'Credentials' },
              { value: '12', label: 'Repositories' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-semibold text-gradient-accent mb-1">{stat.value}</div>
                <div className="text-text-tertiary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
