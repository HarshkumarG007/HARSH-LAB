import { useEffect } from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'

export interface MouseMotionValues {
  x: MotionValue<number>
  y: MotionValue<number>
  // Normalized -0.5 to 0.5 for parallax
  xNorm: MotionValue<number>
  yNorm: MotionValue<number>
}

/**
 * Returns MotionValue instances for mouse position.
 * Uses framer-motion's MotionValue so position updates bypass
 * React's render cycle entirely — zero re-renders on mousemove.
 * Add { passive: true } to the listener to signal the browser
 * this handler never calls preventDefault, enabling scroll optimizations.
 */
export default function useMousePosition(): MouseMotionValues {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xNorm = useMotionValue(0)
  const yNorm = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      xNorm.set(e.clientX / window.innerWidth - 0.5)
      yNorm.set(e.clientY / window.innerHeight - 0.5)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y, xNorm, yNorm])

  return { x, y, xNorm, yNorm }
}
