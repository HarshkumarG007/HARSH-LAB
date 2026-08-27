import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseStyles = 'relative px-8 py-4 font-medium text-sm tracking-wider uppercase transition-all duration-300 overflow-hidden rounded-sm'
  
  const variantStyles = {
    primary: 'bg-accent text-white hover:glow-accent',
    secondary: 'bg-surface text-primary border border-primary/20 hover:border-accent/50',
    outline: 'bg-transparent text-primary border border-primary/30 hover:border-accent hover:text-accent',
  }

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
        data-cursor-label="CLICK"
      >
        <motion.a
          href={href}
          className={`${baseStyles} ${variantStyles[variant]} ${className} inline-block`}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 350, damping: 15 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">{children}</span>
          <motion.div
            className="absolute inset-0 bg-accent/10"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.a>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      data-cursor-label="CLICK"
    >
      <motion.button
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-accent/10"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>
    </div>
  )
}
