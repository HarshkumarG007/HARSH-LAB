import { useState, useEffect, useRef } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    let rafId: number
    
    const handleScroll = () => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const currentProgress = docHeight > 0 ? scrollY / docHeight : 0
        
        const now = Date.now()
        const deltaTime = now - lastTime.current
        const deltaY = scrollY - lastScrollY.current
        const currentVelocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0
        
        setProgress(Math.min(Math.max(currentProgress, 0), 1))
        setVelocity(currentVelocity)
        
        lastScrollY.current = scrollY
        lastTime.current = now
        rafId = 0
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return { progress, velocity }
}
