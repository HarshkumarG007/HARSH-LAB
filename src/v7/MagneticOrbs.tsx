import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface ContactOrb {
  label: string
  icon: string
  url: string
  color: string
  position: [number, number, number]
}

const CONTACT_ORBS: ContactOrb[] = [
  { label: 'GitHub',   icon: '⌨',  url: 'https://github.com/HarshkumarG007',            color: '#e2e8f0', position: [-6, 0, 0] },
  { label: 'LinkedIn', icon: '🔗', url: 'https://www.linkedin.com/in/harshkumarg/',      color: '#60a5fa', position: [-2, 0, 0] },
  { label: 'Credly',   icon: '🏅', url: 'https://www.credly.com/users/harshkumarg',     color: '#fbbf24', position: [2, 0, 0] },
  { label: 'Email',    icon: '✉',  url: 'contact',                                     color: '#ec4899', position: [6, 0, 0] },
]

function MagneticOrb({ orb, index, onEmailClick }: { orb: ContactOrb; index: number; onEmailClick?: () => void }) {
  const groupRef   = useRef<THREE.Group>(null)
  const coreRef    = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Physics state
  const vel        = useRef(new THREE.Vector3())
  const pos        = useRef(new THREE.Vector3(...orb.position))
  const rest       = new THREE.Vector3(...orb.position)
  const hoverScale = useRef(1)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // Float idle motion
    const idleY = Math.sin(t * 0.6 + index * 1.2) * 0.25
    const idleX = Math.cos(t * 0.4 + index * 0.8) * 0.15

    // Spring back to rest position
    const springForce = rest.clone().sub(pos.current).multiplyScalar(0.05)
    vel.current.add(springForce)
    vel.current.multiplyScalar(0.88) // damping
    pos.current.add(vel.current)

    if (groupRef.current) {
      groupRef.current.position.set(
        pos.current.x + idleX,
        pos.current.y + idleY,
        pos.current.z
      )
    }

    // Smooth hover scale
    hoverScale.current = THREE.MathUtils.lerp(hoverScale.current, hovered ? 1.3 : 1, 0.1)
    if (coreRef.current) {
      coreRef.current.scale.setScalar(hoverScale.current)
    }
  })

  const handleClick = () => {
    if (orb.url === 'contact') {
      onEmailClick?.()
    } else {
      window.open(orb.url, '_blank', 'noopener,noreferrer')
    }
    // Impulse on click
    vel.current.set(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      0
    )
  }

  return (
    <group
      ref={groupRef}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
      onClick={handleClick}
    >
      {/* Core orb */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={orb.color}
          emissive={orb.color}
          emissiveIntensity={hovered ? 1.5 : 0.5}
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={1}
        />
      </mesh>

      {/* Pulsing outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.02, 8, 60]} />
        <meshBasicMaterial
          color={orb.color}
          transparent
          opacity={hovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh scale={2.5}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial
          color={orb.color}
          transparent
          opacity={hovered ? 0.08 : 0.03}
          depthWrite={false}
        />
      </mesh>

      {/* Label */}
      <Html center position={[0, -1, 0]}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          color: orb.color,
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          textShadow: `0 0 20px ${orb.color}`,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.3s',
          cursor: 'pointer',
        }}>
          {orb.icon} {orb.label}
        </div>
      </Html>
    </group>
  )
}

// Connecting lines between orbs
function ConnectionLines() {
  const lineRef = useRef<THREE.Line>(null)

  const positions = new Float32Array([
    -4, 0, 0,   0, 0, 0,   4, 0, 0
  ])

  useFrame(({ clock }) => {
    if (lineRef.current) {
      // Subtle pulse on opacity
      (lineRef.current.material as THREE.LineBasicMaterial).opacity =
        0.1 + Math.sin(clock.elapsedTime) * 0.05
    }
  })

  return (
    <line ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={3} args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
    </line>
  )
}

export default function MagneticOrbs({ onEmailClick }: { onEmailClick?: () => void }) {
  return (
    <group>
      <ConnectionLines />
      {CONTACT_ORBS.map((orb, i) => (
        <MagneticOrb key={orb.label} orb={orb} index={i} onEmailClick={onEmailClick} />
      ))}
    </group>
  )
}
