import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { credentialStats } from '../data/credentials'

// Individual credential orb in orbit
function CredentialOrb({ index, total, radius, speed, color }: {
  index: number; total: number; radius: number; speed: number
  color: string
}) {
  const orbRef   = useRef<THREE.Group>(null)
  const glowRef  = useRef<THREE.Mesh>(null)
  const angleRef = useRef((index / total) * Math.PI * 2)

  useFrame(({ clock }) => {
    angleRef.current += speed * 0.005
    if (orbRef.current) {
      orbRef.current.position.x = Math.cos(angleRef.current) * radius
      orbRef.current.position.z = Math.sin(angleRef.current) * radius
      orbRef.current.position.y = Math.sin(clock.elapsedTime * 0.5 + index) * 0.3
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2 + index) * 0.15
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={orbRef}>
      {/* Core orb */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

// The orbital rings themselves
function OrbitalRing({ radius, tilt, color }: {
  radius: number; tilt: [number, number, number]; color: string
}) {
  const ringRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={ringRef} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 8, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

export default function CredentialConstellation() {
  const orbCount = credentialStats.total // 20 credentials
  const orbitLayers = [
    { radius: 3,   speed: 1.0,  color: '#4285F4', label: 'Google' },  // Google blue
    { radius: 5,   speed: 0.7,  color: '#0062FF', label: 'IBM' },     // IBM blue
    { radius: 7,   speed: 0.4,  color: '#818cf8', label: 'Mixed' },   // Indigo
  ]

  const orbs = useMemo(() => {
    const result = []
    let idx = 0
    // Distribute 20 credentials across 3 orbital rings
    const distribution = [8, 8, 4]
    for (let layer = 0; layer < orbitLayers.length; layer++) {
      for (let i = 0; i < distribution[layer] && idx < orbCount; i++) {
        result.push({
          index: i,
          total: distribution[layer],
          radius: orbitLayers[layer].radius,
          speed: orbitLayers[layer].speed,
          color: orbitLayers[layer].color,
          label: orbitLayers[layer].label,
        })
        idx++
      }
    }
    return result
  }, [orbCount])

  return (
    <group>
      {/* The central nexus — YOU */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Multi-glow layers on central orb */}
      {[2, 4, 6].map((s, i) => (
        <mesh key={i} scale={s}>
          <sphereGeometry args={[0.6, 8, 8]} />
          <meshBasicMaterial
            color="#6366f1"
            transparent
            opacity={0.02}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Orbital rings */}
      <OrbitalRing radius={3} tilt={[0.3, 0, 0]}          color="#4285F4" />
      <OrbitalRing radius={5} tilt={[-0.2, 0.1, 0.2]}     color="#0062FF" />
      <OrbitalRing radius={7} tilt={[0.1, 0.3, -0.1]}     color="#818cf8" />

      {/* 20 credential orbs in orbit */}
      {orbs.map((orb, i) => (
        <CredentialOrb key={i} {...orb} />
      ))}
    </group>
  )
}
