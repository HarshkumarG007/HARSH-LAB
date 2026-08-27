import { useEffect, useRef } from 'react'

interface MatrixRainProps {
  className?: string
  opacity?: number
}

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'
const COLORS = ['#00f3ff', '#b829dd', '#00ff41', '#ff00ff']
const TARGET_FPS = 30
const FRAME_INTERVAL = 1000 / TARGET_FPS

export default function MatrixRain({ className = '', opacity = 0.15 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const dropsRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fontSize = 14

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const columns = Math.floor(canvas.width / fontSize)
      dropsRef.current = Array.from({ length: columns }, (_, i) => dropsRef.current[i] ?? 1)
    }

    resize()

    const drawFrame = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(drawFrame)

      // Throttle to TARGET_FPS — on a 144Hz monitor without this,
      // the canvas loop runs 144 times/second consuming ~35% CPU
      const elapsed = timestamp - lastFrameTimeRef.current
      if (elapsed < FRAME_INTERVAL) return
      lastFrameTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL)

      ctx.fillStyle = 'rgba(2, 2, 4, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px 'Courier New', monospace`

      const drops = dropsRef.current
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    animationRef.current = requestAnimationFrame(drawFrame)
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  )
}
