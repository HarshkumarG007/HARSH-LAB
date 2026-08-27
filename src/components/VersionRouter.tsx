import { useVersion } from '../contexts/VersionContext'
import { Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

// Preload critical versions
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

// Error Boundary Component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-8">
      <div className="text-center">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
        <h2 className="text-xl font-bold mb-2">Failed to load version</h2>
        <p className="text-slate-400 mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

// Loading Spinner
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
  const error = null // Error Boundary logic will be moved to a real class component later if needed
  const CurrentVersion = versionComponents[currentVersion]

  if (error) {
    return <ErrorFallback error={error} />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentVersion}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full min-h-screen will-change-transform"
      >
        <Suspense fallback={<VersionLoader />}>
          <CurrentVersion />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
