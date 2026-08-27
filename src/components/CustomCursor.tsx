import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

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
  const isTouchDevice = useRef(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 500, restDelta: 0.001 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const trailXSpring = useSpring(cursorX, { damping: 35, stiffness: 250, restDelta: 0.001 })
  const trailYSpring = useSpring(cursorY, { damping: 35, stiffness: 250, restDelta: 0.001 })

  useEffect(() => {
    // Touch detection — check once on mount
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice.current) return

    document.body.classList.add('cursor-none')

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    // Event delegation — one listener, catches all current AND future elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor], [role="button"]') as HTMLElement | null
      if (interactive) {
        const label = interactive.getAttribute('data-cursor-label') || ''
        setCursorState({ isHovering: true, label })
      } else {
        setCursorState({ isHovering: false, label: '' })
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  // Don't render anything on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
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
          transition={{ duration: 0.15, ease: 'easeOut' }}
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
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.div>
    </>
  )
}
