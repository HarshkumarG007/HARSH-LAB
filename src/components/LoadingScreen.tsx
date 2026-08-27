import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const { progress, active, total } = useProgress()
  const [show, setShow] = useState(true)

  // If there are no assets to load, useProgress returns progress: 0 and active: false.
  // We force it to 100 so the loading screen can dismiss.
  const displayProgress = (total === 0 && !active) ? 100 : progress

  useEffect(() => {
    // Keep showing until progress is 100 and Drei says it's not active
    // Add a small delay so the user can see 100% before it fades out
    if (displayProgress === 100 && !active) {
      const timer = setTimeout(() => setShow(false), 800)
      return () => clearTimeout(timer)
    }
  }, [displayProgress, active])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510]"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="w-64 flex flex-col gap-4 items-center">
            <div className="text-neon-cyan font-mono text-sm tracking-widest uppercase">
              INITIALIZING NEXUS
            </div>
            
            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-neon-cyan shadow-[0_0_10px_#00FF41]"
                initial={{ width: 0 }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
            
            <div className="flex justify-between w-full text-white/50 font-mono text-xs">
              <span>SYS.BOOT</span>
              <span>{Math.round(displayProgress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
