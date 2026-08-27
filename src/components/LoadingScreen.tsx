import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Logo Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-display font-bold text-gradient mb-4"
        >
          YN.
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-2"
        >
          <p className="text-secondary text-xs tracking-[0.3em] uppercase">
            Initializing Environment
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="loading-dot w-2 h-2 rounded-full bg-accent" />
            <span className="loading-dot w-2 h-2 rounded-full bg-accent" />
            <span className="loading-dot w-2 h-2 rounded-full bg-accent" />
          </div>
        </motion.div>
        
        {/* Progress Bar */}
        <div className="w-48 h-[2px] bg-surface overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-secondary"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>
        
        {/* Status Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-1"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.5, 1] }}
            className="text-secondary text-xs tracking-wider"
          >
            Loading 3D System
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.5, 1], delay: 0.5 }}
            className="text-secondary text-xs tracking-wider"
          >
            Calibrating Experience
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-primary text-xs tracking-wider font-medium"
          >
            Ready
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
