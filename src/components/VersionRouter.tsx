import { useVersion } from '../contexts/VersionContext'
import { Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CyberpunkVersion = lazy(() => import('../versions/CyberpunkVersion'))
const PremiumVersion = lazy(() => import('../versions/PremiumVersion'))
const GodTierVersion = lazy(() => import('../versions/GodTierVersion'))
const EvidenceVersion = lazy(() => import('../versions/EvidenceVersion'))
const PreciousMetalsVersion = lazy(() => import('../versions/PreciousMetalsVersion'))

const versionComponents = {
  'v1-cyberpunk': CyberpunkVersion,
  'v2-premium': PremiumVersion,
  'v3-god-tier': GodTierVersion,
  'v4-evidence': EvidenceVersion,
  'v5-precious-metals': PreciousMetalsVersion,
}



function VersionLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-white/20 border-t-indigo-400 rounded-full"
      />
    </div>
  )
}

export default function VersionRouter() {
  const { currentVersion } = useVersion()
  const CurrentVersion = versionComponents[currentVersion]

  return (
    // No will-change here — promotes entire page to GPU layer unnecessarily
    <AnimatePresence mode="wait">
      <motion.div
        key={currentVersion}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-screen"
      >
        <Suspense fallback={<VersionLoader />}>
          <CurrentVersion />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
