import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import RevealText from './RevealText'
import MagneticButton from './MagneticButton'

export default function GodHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // MotionValues — no useState, no re-renders on mouse move
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth scroll transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // Spring physics for mouse follow — feeds directly from MotionValues
  const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 }
  const mouseX = useSpring(rawX, springConfig)
  const mouseY = useSpring(rawY, springConfig)

  // Inverse for the second orb
  const mouseXInv = useTransform(mouseX, v => -v * 0.5)
  const mouseYInv = useTransform(mouseY, v => -v * 0.5)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    rawX.set((clientX - innerWidth / 2) / innerWidth * 80)
    rawY.set((clientY - innerHeight / 2) / innerHeight * 80)
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden material-hero"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Orbs — moved by MotionValues, not state */}
      <div className="absolute inset-0 pointer-events-none" style={{ contain: 'paint layout' }}>
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-[120px]"
          style={{
            x: mouseX,
            y: mouseY,
            top: '10%',
            left: '10%',
            willChange: 'transform',
          }}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-500/10 to-orange-500/10 blur-[100px]"
          style={{
            x: mouseXInv,
            y: mouseYInv,
            bottom: '10%',
            right: '10%',
            willChange: 'transform',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-text-secondary">Available for select projects</span>
          </span>
        </motion.div>

        {/* Name */}
        <div className="perspective-1000 mb-6 text-gold-leaf">
          <motion.h1
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="block text-transparent bg-clip-text">
              Harsh Kumar
            </span>
            <span className="block text-transparent bg-clip-text mt-2">
              Gupta
            </span>
          </motion.h1>
        </div>

        {/* Title with character reveal */}
        <div className="mb-8">
          <RevealText
            className="text-xl md:text-2xl text-platinum font-light"
            delay={0.8}
            type="words"
          >
            AI/ML Engineer · Educator · Problem Solver
          </RevealText>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-text-tertiary text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          303 commits across 12 repositories. 20 verified credentials.
          IBM SkillsBuild Faculty. Building intelligent systems with
          transparency and craft.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            strength={0.2}
          >
            <span className="flex items-center gap-2">
              View Projects
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </span>
          </MagneticButton>

          <MagneticButton
            className="px-8 py-4 rounded-xl border border-white/10 text-text-secondary hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
            strength={0.15}
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-24 pt-12 border-t border-white/5"
        >
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '303', label: 'Commits', delay: 0 },
              { value: '20', label: 'Credentials', delay: 0.1 },
              { value: '12', label: 'Repositories', delay: 0.2 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 + stat.delay }}
                className="text-center"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-text-tertiary text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-text-muted text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
