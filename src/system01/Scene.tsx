import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, AdaptiveDpr, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ExplodedTransformController from './core/ExplodedTransformController'
import EvidenceMatrixRenderer from './evidence/EvidenceMatrixRenderer'
import MouseParallax from './core/MouseParallax'

export default function Scene() {
  const [dpr, setDpr] = useState(1.5)

  return (
    <div className="fixed inset-0 z-[-1] bg-slate-950">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor 
          onDecline={() => setDpr(1)} 
          onIncline={() => setDpr(2)} 
        />
        <AdaptiveDpr pixelated />

        {/* Lighting Rig */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818CF8" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#F43F5E" />
        <Environment preset="city" />
        <MouseParallax />

        <Suspense fallback={null}>
          <ExplodedTransformController />
          <EvidenceMatrixRenderer />
        </Suspense>

        {/* Post-processing */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.5} 
            luminanceSmoothing={0.7} 
            intensity={2.5} 
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
