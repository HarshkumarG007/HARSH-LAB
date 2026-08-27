import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdversarialHUD() {
  const [fps, setFps] = useState(60)
  const [domNodes, setDomNodes] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    // Measure FPS
    let animationFrameId: number;
    const measure = () => {
      frameCount.current++
      const now = performance.now()
      if (now - lastTime.current >= 1000) {
        const currentFps = frameCount.current
        setFps(currentFps)
        frameCount.current = 0
        lastTime.current = now

        // Adversarial critique logic
        if (currentFps < 30) {
          setToast("FPS under 30. Your WebGL loops are suffocating. Fix your useFrame.")
        } else if (currentFps < 50) {
          setToast("FPS dropping. Is this an Intel Mac from 2015? Optimize your shaders.")
        }
      }
      animationFrameId = requestAnimationFrame(measure)
    }
    measure()

    // Measure DOM nodes periodically
    const domInterval = setInterval(() => {
      const nodes = document.getElementsByTagName('*').length
      setDomNodes(nodes)
      
      if (nodes > 1500) {
        setToast(`1,500+ DOM nodes? This is a 3D portfolio, not Wikipedia. Stop rendering hidden HTML.`)
      }
    }, 2000)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(domInterval)
    }
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(t)
    }
  }, [toast])

  return (
    <div className="fixed top-4 right-4 z-[9999] font-mono text-[10px] pointer-events-none flex flex-col items-end gap-2">
      {/* Metrics Panel */}
      <div className="bg-black/80 backdrop-blur-md border border-rose-500/30 p-3 rounded shadow-2xl text-rose-400 min-w-[140px]">
        <div className="text-[8px] uppercase tracking-widest text-rose-500/60 mb-2 border-b border-rose-500/20 pb-1">
          Adversarial Critic
        </div>
        <div className="flex justify-between items-center">
          <span>FPS</span>
          <span className={fps < 50 ? 'text-rose-500 font-bold' : 'text-emerald-400'}>{fps}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span>DOM Nodes</span>
          <span className={domNodes > 1000 ? 'text-amber-500' : 'text-emerald-400'}>{domNodes}</span>
        </div>
      </div>

      {/* Sarcastic Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="bg-rose-950/90 border border-rose-500 p-3 rounded shadow-xl text-rose-200 max-w-[250px] leading-relaxed"
          >
            <div className="font-bold text-rose-500 mb-1">CRITIQUE</div>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
