import { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import AuroraBackground       from './AuroraBackground'
import NeuralGalaxy           from './NeuralGalaxy'
import FluidBackground        from './FluidBackground'
import EvidenceObservatory    from './EvidenceObservatory'
import ProjectVault           from './ProjectVault'
import CredentialConstellation from './CredentialConstellation'
import MagneticOrbs           from './MagneticOrbs'
import ScrollCamera           from './ScrollCamera'
import PostProcessing         from './PostProcessing'

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 5]}   color="#6366f1" intensity={30} distance={40} />
      <pointLight position={[-8, 2, 2]}   color="#8b5cf6" intensity={15} distance={30} />
      <pointLight position={[8, -2, 2]}   color="#ec4899" intensity={10} distance={25} />
      <pointLight position={[0, -5, -8]}  color="#10b981" intensity={8}  distance={20} />
    </>
  )
}

import { MotionValue } from 'framer-motion'

import { Project } from '../data/projects'

// Section groups positioned in 3D world space
function WorldScene({ mouseX, mouseY, onProjectSelect }: { mouseX: MotionValue<number>; mouseY: MotionValue<number>; onProjectSelect?: (project: Project) => void }) {
  return (
    <>
      <SceneLighting />

      {/* Distant star field */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

      {/* Aurora: fixed background plane */}
      <AuroraBackground />

      {/* Fluid: reactive to cursor, sits behind everything */}
      <FluidBackground />

      {/* HERO section: centered in world origin */}
      <group position={[0, 0, 0]}>
        <NeuralGalaxy mouseX={mouseX} mouseY={mouseY} />
      </group>

      {/* EVIDENCE section: pushed back and down */}
      <group position={[0, -1, -10]}>
        <EvidenceObservatory />
      </group>

      {/* PROJECTS section: at same depth as start, offset */}
      <group position={[0, 0, -5]}>
        <ProjectVault onProjectSelect={onProjectSelect} />
      </group>

      {/* CREDENTIALS section: elevated */}
      <group position={[0, 1, -15]}>
        <CredentialConstellation />
      </group>

      {/* CONTACT section: forward and centered */}
      <group position={[0, -1, -20]}>
        <MagneticOrbs />
      </group>
    </>
  )
}

interface WorldCanvasProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  isMobile: boolean
  onProjectSelect?: (project: Project) => void
}

export default function WorldCanvas({ mouseX, mouseY, isMobile, onProjectSelect }: WorldCanvasProps) {
  const scrollCamRef = useRef(null)

  // Pause rendering when tab is backgrounded — saves CPU/GPU for nothing the user can see
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')
  useEffect(() => {
    const handleVisibility = () => {
      setFrameloop(document.hidden ? 'never' : 'always')
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 60, near: 0.1, far: 200 }}
      frameloop={frameloop}
      dpr={isMobile ? [1, 1] : [1, 2]}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: '#050510',
      }}
    >
      <Suspense fallback={null}>
        <WorldScene mouseX={mouseX} mouseY={mouseY} onProjectSelect={onProjectSelect} />
        <ScrollCamera ref={scrollCamRef} />
        {!isMobile && <PostProcessing />}
        {/* Removed CDN Environment preset to prevent fetch errors; using SceneLighting instead */}
      </Suspense>
    </Canvas>
  )
}
