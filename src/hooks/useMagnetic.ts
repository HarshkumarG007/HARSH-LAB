import { useRef, useState, useCallback } from 'react'

interface MagneticOptions {
  strength?: number
  radius?: number
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options
  const ref = useRef<T>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
    
    if (distance < radius) {
      const factor = (1 - distance / radius) * strength
      setPosition({
        x: distanceX * factor,
        y: distanceY * factor,
      })
    }
  }, [strength, radius])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  return {
    ref,
    position,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
