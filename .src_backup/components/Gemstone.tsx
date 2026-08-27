import { motion } from 'framer-motion'

interface GemstoneProps {
  type: 'diamond' | 'ruby' | 'sapphire' | 'emerald'
  size?: 'sm' | 'md' | 'lg'
  cut?: 'round' | 'princess' | 'emerald' | 'oval'
  className?: string
}

const gemColors = {
  diamond: 'from-white via-blue-50 to-blue-100',
  ruby: 'from-red-600 via-red-500 to-rose-400',
  sapphire: 'from-blue-800 via-blue-600 to-blue-400',
  emerald: 'from-emerald-800 via-emerald-600 to-emerald-400',
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

export default function Gemstone({
  type,
  size = 'md',
  cut = 'round',
  className = '',
}: GemstoneProps) {
  const cutStyles = {
    round: 'rounded-full',
    princess: 'rounded-lg rotate-45',
    emerald: 'rounded-sm',
    oval: 'rounded-full scale-y-125',
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.05, 1],
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {/* Gem body */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-br ${gemColors[type]}
          ${cutStyles[cut]}
          shadow-inner
        `}
        style={{
          boxShadow: `
            inset 0 2px 4px rgba(255,255,255,0.5),
            inset 0 -2px 4px rgba(0,0,0,0.2),
            0 4px 8px rgba(0,0,0,0.2)
          `,
        }}
      />
      
      {/* Facets */}
      <div className={`absolute inset-1 bg-gradient-to-tr from-white/40 to-transparent ${cutStyles[cut]}`} />
      <div className={`absolute inset-2 bg-gradient-to-bl from-white/20 to-transparent ${cutStyles[cut]}`} />
      
      {/* Sparkle */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-white/60 rounded-full blur-sm"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}
