import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment as DreiEnvironment, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Floating geometric shapes
function FloatingGeometry() {
  const group = useRef<THREE.Group>(null)
  
  const geometries = useMemo(() => [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.TorusGeometry(0.6, 0.2, 16, 100),
    new THREE.DodecahedronGeometry(0.7, 0),
  ], [])

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.05
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <group ref={group}>
      {geometries.map((geo, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={2}
          floatIntensity={2}
          position={[
            Math.sin(i * 1.5) * 4,
            Math.cos(i * 1.2) * 2,
            Math.sin(i * 0.8) * 3 - 5,
          ]}
        >
          <mesh geometry={geo}>
            <meshStandardMaterial
              color={i % 2 === 0 ? '#7C5CFF' : '#00E5FF'}
              emissive={i % 2 === 0 ? '#7C5CFF' : '#00E5FF'}
              emissiveIntensity={0.2}
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Particle field
function ParticleField() {
  const points = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const count = 500
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.02
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#F5F5F5"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Connecting lines
function ConnectionLines() {
  const lines = useRef<THREE.Group>(null)
  
  const lineData = useMemo(() => {
    const points = []
    for (let i = 0; i < 8; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      points.push({ start, end })
    }
    return points
  }, [])

  useFrame((state) => {
    if (!lines.current) return
    lines.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <group ref={lines}>
      {lineData.map((lineItem, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                lineItem.start.x, lineItem.start.y, lineItem.start.z,
                lineItem.end.x, lineItem.end.y, lineItem.end.z,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#7C5CFF" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  )
}

// Main scene component
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#7C5CFF" intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00E5FF" intensity={0.3} />
      
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <ParticleField />
      <FloatingGeometry />
      <ConnectionLines />
      <DreiEnvironment preset="night" />
      
      {/* Fog */}
      <fog attach="fog" args={['#050505', 5, 20]} />
    </>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <SceneContent />
    </Canvas>
  )
}
