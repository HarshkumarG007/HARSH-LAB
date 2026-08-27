import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export default function GlassCard({ 
  children, 
  className = '',
  intensity = 20
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    
    // Update glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePosition({ x: 50, y: 50 })
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
      {/* Glass card */}
      <div className="glass-realistic h-full rounded-3xl p-8 relative overflow-hidden">
        {/* Glare effect */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          {children}
        </div>
      </div>
      
      {/* Shadow */}
      <div 
        className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          transform: 'translateZ(-50px)',
        }}
      />
    </motion.div>
  )
}
