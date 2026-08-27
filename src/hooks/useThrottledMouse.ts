import { useCallback, useRef } from 'react'

export function useThrottledMouse<T extends HTMLElement>(
  callback: (e: React.MouseEvent<T>) => void,
  fps: number = 30
) {
  const frameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  return useCallback((e: React.MouseEvent<T>) => {
    const now = performance.now()
    const elapsed = now - lastTimeRef.current
    const interval = 1000 / fps

    if (elapsed > interval) {
      lastTimeRef.current = now - (elapsed % interval)
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      
      frameRef.current = requestAnimationFrame(() => {
        callback(e)
      })
    }
  }, [callback, fps])
}

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])
}
