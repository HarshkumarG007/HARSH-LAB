import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { commitAnalysis } from '../data/evidence'

// Each repo becomes a glowing star cluster
function StarCluster({ x, y, z, commits, tier }: {
  x: number; y: number; z: number; commits: number; tier: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef  = useRef<THREE.Mesh>(null)

  const starCount = Math.max(5, Math.min(commits * 2, 60))

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(starCount * 3)
    const sz  = new Float32Array(starCount)
    const spread = Math.sqrt(commits) * 0.3
    for (let i = 0; i < starCount; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.3
      sz[i] = 0.5 + Math.random() * 1.5
    }
    return { positions: pos, sizes: sz }
  }, [starCount, commits])

  const tierColor = tier === 'A' ? '#34d399' : tier === 'B' ? '#818cf8' : '#fbbf24'

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.2 + x) * 0.05
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2 + z) * 0.1
      coreRef.current.scale.setScalar(s)
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[x, y, z]}>
        {/* Core orb */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.12 + commits * 0.003, 16, 16]} />
          <meshStandardMaterial
            color={tierColor}
            emissive={tierColor}
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Glow halo */}
        <mesh scale={3}>
          <sphereGeometry args={[0.12 + commits * 0.003, 8, 8]} />
          <meshBasicMaterial
            color={tierColor}
            transparent
            opacity={0.05}
          />
        </mesh>

        {/* Star field particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={starCount} args={[positions, 3]} />
            <bufferAttribute attach="attributes-size" count={starCount} args={[sizes, 1]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            color={tierColor}
            transparent
            opacity={0.9}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </Float>
  )
}

// Orbit rings connecting clusters
function OrbitRings() {
  const ringRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = clock.elapsedTime * 0.03
      ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05
    }
  })

  return (
    <group ref={ringRef}>
      {[8, 12, 16].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.5]}>
          <torusGeometry args={[r, 0.01, 4, 80]} />
          <meshBasicMaterial
            color="#4f46e5"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function EvidenceObservatory() {
  const repos = commitAnalysis.slice(0, 12)

  // Arrange repos in a spiral galaxy pattern
  const positions = useMemo(() =>
    repos.map((_, i) => {
      const angle = (i / repos.length) * Math.PI * 4
      const radius = 3 + i * 0.8
      return {
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 4,
        z: Math.sin(angle) * radius - 5,
      }
    }), [repos])

  return (
    <group>
      <OrbitRings />
      {repos.map((repo, i) => (
        <StarCluster
          key={repo.repo}
          x={positions[i].x}
          y={positions[i].y}
          z={positions[i].z}
          commits={repo.commits}
          tier={repo.tier}
        />
      ))}

      {/* Central sun — represents total contribution */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh scale={4}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.03} />
      </mesh>
    </group>
  )
}
