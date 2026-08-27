import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MetalCardProps {
  children: React.ReactNode
  metal: 'gold' | 'platinum' | 'rose-gold' | 'silver' | 'bronze' | 'brass' | 'chrome' | 'emerald' | 'titanium'
  texture?: 'polished' | 'brushed' | 'hammered' | 'carbon'
  className?: string
  interactive?: boolean
}

const metalClasses = {
  gold: 'metallic-gold',
  platinum: 'metallic-platinum',
  'rose-gold': 'metallic-rose-gold',
  silver: 'metallic-silver',
  bronze: 'metallic-bronze',
  brass: 'metallic-brass',
  chrome: 'metallic-chrome',
  emerald: 'metallic-emerald',
  titanium: 'metallic-titanium',
}

const textureClasses = {
  polished: '',
  brushed: 'texture-brushed',
  hammered: 'texture-hammered',
  carbon: 'texture-carbon',
}

export default function MetalCard({
  children,
  metal,
  texture = 'polished',
  className = '',
  interactive = true,
}: MetalCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -10
    const rotateYValue = (mouseX / (rect.width / 2)) * 10
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    
    setGlareX(((e.clientX - rect.left) / rect.width) * 100)
    setGlareY(((e.clientY - rect.top) / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlareX(50)
    setGlareY(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Metal surface */}
      <div
        className={`
          relative overflow-hidden rounded-2xl p-8
          ${metalClasses[metal]}
          ${textureClasses[texture]}
        `}
      >
        {/* Reflection overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />
        
        {/* Shine sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 animate-shine-sweep" />
        </div>
        
        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          {children}
        </div>
      </div>
      
      {/* Shadow */}
      <div
        className="absolute -inset-4 rounded-2xl blur-2xl -z-10 opacity-0 transition-opacity duration-500"
        style={{
          background: metal === 'gold' ? 'rgba(212, 175, 55, 0.3)' :
                     metal === 'platinum' ? 'rgba(229, 228, 226, 0.2)' :
                     metal === 'rose-gold' ? 'rgba(183, 110, 121, 0.3)' :
                     metal === 'emerald' ? 'rgba(80, 200, 120, 0.3)' :
                     'rgba(192, 192, 192, 0.2)',
          transform: 'translateZ(-50px)',
        }}
      />
    </motion.div>
  )
}
