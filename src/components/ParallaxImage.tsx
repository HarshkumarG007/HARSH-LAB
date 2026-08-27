import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export default function ParallaxImage({ 
  src, 
  alt, 
  className = '',
  speed = 0.5 
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  
  // Adjusted for speed
  const yOffset = 20 * speed
  const y = useTransform(scrollYProgress, [0, 1], [`-${yOffset}%`, `${yOffset}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ opacity }}
        />
      </motion.div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
    </div>
  )
}
