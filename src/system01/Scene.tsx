import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, AdaptiveDpr, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ExplodedTransformController from './core/ExplodedTransformController'

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

        <Suspense fallback={null}>
          <ExplodedTransformController />
        </Suspense>

        {/* Post-processing */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            intensity={1.5} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
