import { Suspense, lazy } from 'react'
import SystemStaticFallback from '../system01/fallback/SystemStaticFallback'
import { useSystemProgress } from '../system01/state/systemProgress'

const Scene = lazy(() => import('../system01/Scene'))

function ScrollHUD() {
  const progress = useSystemProgress(s => s.progress)
  
  return (
    <div className="fixed top-24 right-6 bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs p-4 rounded-lg z-50 pointer-events-none">
      <div className="text-slate-400 mb-1 uppercase tracking-widest text-[10px]">System Progress</div>
      <div className="text-2xl font-bold text-indigo-400">
        {(progress * 100).toFixed(1)}%
      </div>
      <div className="text-slate-500 mt-2 text-[10px]">
        Raw: {progress.toFixed(4)}
      </div>
    </div>
  )
}

export default function System01Version() {
  const reducedMotion = useSystemProgress(s => s.reducedMotion)

  return (
    <>
      <ScrollHUD />
      
      {!reducedMotion && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      {/* The DOM overlay sits on top of the fixed canvas */}
      <div className="relative z-10">
        <SystemStaticFallback />
      </div>
    </>
  )
}
