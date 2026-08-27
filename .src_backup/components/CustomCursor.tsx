import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import useMousePosition from '../hooks/useMousePosition'

interface CursorState {
  isHovering: boolean
  label: string
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    label: '',
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const mousePosition = useMousePosition()
  const cursorRef = useRef<HTMLDivElement>(null)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const trailXSpring = useSpring(cursorX, { damping: 30, stiffness: 200 })
  const trailYSpring = useSpring(cursorY, { damping: 30, stiffness: 200 })

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    
    // Hide default cursor
    if (!isTouchDevice) {
      document.body.classList.add('cursor-none')
    }
    
    return () => {
      document.body.classList.remove('cursor-none')
    }
  }, [isTouchDevice])

  useEffect(() => {
    cursorX.set(mousePosition.x)
    cursorY.set(mousePosition.y)
  }, [mousePosition, cursorX, cursorY])

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    
    // Track interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]')
    
    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement
      const label = target.getAttribute('data-cursor-label') || ''
      setCursorState({ isHovering: true, label })
    }
    
    const handleElementLeave = () => {
      setCursorState({ isHovering: false, label: '' })
    }
    
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementEnter)
      el.addEventListener('mouseleave', handleElementLeave)
    })
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementEnter)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          animate={{
            width: cursorState.isHovering ? 80 : 12,
            height: cursorState.isHovering ? 80 : 12,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {cursorState.label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center text-background text-xs font-medium tracking-wider"
            >
              {cursorState.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      
      {/* Trailing cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
          animate={{
            width: cursorState.isHovering ? 100 : 40,
            height: cursorState.isHovering ? 100 : 40,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.div>
    </>
  )
}
