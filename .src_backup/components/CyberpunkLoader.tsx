import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface CyberpunkLoaderProps {
  onComplete: () => void
}

const STATUSES = [
  'INITIALIZING NEURAL LINK...',
  'LOADING CYBERNETIC MODULES...',
  'CONNECTING TO THE GRID...',
  'SYNCING WITH MAINFRAME...',
  'DECRYPTING REALITY...',
  'ACCESS GRANTED',
]

const BOOT_TEXT = 'SYSTEM BOOT'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'

export default function CyberpunkLoader({ onComplete }: CyberpunkLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(STATUSES[0])
  const [glitchText, setGlitchText] = useState(BOOT_TEXT)
  const [katakana, setKatakana] = useState<string[]>([])

  // Stable onComplete ref
  const onCompleteRef = useCallback(onComplete, [onComplete])

  // Progress ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(onCompleteRef, 600)
          return 100
        }
        return next
      })
    }, 200)
    return () => clearInterval(interval)
  }, [onCompleteRef])

  // Status text tied to progress
  useEffect(() => {
    const index = Math.min(Math.floor((progress / 100) * STATUSES.length), STATUSES.length - 1)
    setStatus(STATUSES[index])
  }, [progress])

  // Title scramble
  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setGlitchText(
        BOOT_TEXT.split('').map((_char, index) => {
          if (index < iteration) return BOOT_TEXT[index]
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }).join('')
      )
      iteration += 0.35
      if (iteration >= BOOT_TEXT.length) {
        clearInterval(interval)
        setGlitchText(BOOT_TEXT)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Katakana decoration row
  useEffect(() => {
    const gen = () => Array.from({ length: 20 }, () =>
      String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
    )
    setKatakana(gen())
    const interval = setInterval(() => setKatakana(gen()), 400)
    return () => clearInterval(interval)
  }, [])

  const clampedProgress = Math.min(Math.floor(progress), 100)

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center font-mono"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines" />

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-cyan/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-neon-cyan/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-neon-cyan/30" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-10 max-w-md w-full px-6">
        {/* Glitch Title */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1
            className="text-4xl md:text-5xl font-bold text-neon-cyan tracking-wider glitch"
            data-text={glitchText}
          >
            {glitchText}
          </h1>
          <div className="mt-2 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        </motion.div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-secondary tracking-widest">
            <span className="text-left">{status}</span>
            <span className="text-neon-cyan">{clampedProgress}%</span>
          </div>

          <div className="relative h-2 bg-surface rounded-full overflow-hidden border border-neon-cyan/20">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta"
              animate={{ width: `${clampedProgress}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Katakana Row */}
        <div className="flex justify-center gap-1 text-matrix-DEFAULT/50 text-xs overflow-hidden">
          {katakana.map((char, i) => (
            <span key={i} className="transition-all duration-300">{char}</span>
          ))}
        </div>

        {/* Decorative rotating squares */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border border-neon-cyan/20 rotate-45 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-neon-magenta/20 rotate-12 animate-pulse-slow" />
      </div>
    </motion.div>
  )
}
