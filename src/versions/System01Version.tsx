import { Suspense, lazy } from 'react'
import SystemStaticFallback from '../system01/fallback/SystemStaticFallback'
import { useSystemProgress } from '../system01/state/systemProgress'

const Scene = lazy(() => import('../system01/Scene'))

export default function System01Version() {
  const reducedMotion = useSystemProgress(s => s.reducedMotion)

  return (
    <>
      {!reducedMotion && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      {/* The DOM overlay sits on top of the fixed canvas */}
      <div className={`relative z-10 ${reducedMotion ? 'bg-slate-950 min-h-screen' : ''}`}>
        <SystemStaticFallback />
      </div>
    </>
  )
}
