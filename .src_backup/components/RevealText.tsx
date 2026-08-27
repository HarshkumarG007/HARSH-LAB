import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface RevealTextProps {
  children: string
  className?: string
  delay?: number
  type?: 'words' | 'chars' | 'lines'
}

export default function RevealText({ 
  children, 
  className = '', 
  delay = 0,
  type = 'words'
}: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const items = type === 'chars' 
    ? children.split('') 
    : children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === 'chars' ? 0.02 : 0.1,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block perspective-1000 ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {type === 'words' && index < items.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  )
}
