import { useRef, createRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { LayerId } from '../types'
import { useSystemProgress } from '../state/systemProgress'
import GenericLayer from '../layers/GenericLayer'
import SystemCore from './SystemCore'

const LAYERS: LayerId[] = [
  'DATA',
  'MODELS',
  'RETRIEVAL',
  'REASONING',
  'TOOLS',
  'SECURITY',
  'INTERFACES',
  'EVALUATION'
]

// Custom clamp function
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export default function ExplodedTransformController() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Create an array of refs, one for each layer
  const layerRefs = useRef(LAYERS.map(() => createRef<THREE.Group>()))

  useFrame(() => {
    if (!groupRef.current) return
    const { progress } = useSystemProgress.getState()

    // Base rotation of the entire assembly
    groupRef.current.rotation.y = progress * Math.PI * 2

    // Calculate spread based on progress (10% to 30% window)
    // normalize t to 0..1 within that window
    const t = clamp((progress - 0.1) / (0.3 - 0.1), 0, 1)

    // Smoothstep for more organic ease-in-out expansion
    const ease = t * t * (3 - 2 * t)

    // Packed spacing vs Exploded spacing
    const packedSpacing = 0.1
    const explodedSpacing = 1.5
    
    const currentSpacing = packedSpacing + (explodedSpacing - packedSpacing) * ease

    // Apply Y-transform to each layer
    layerRefs.current.forEach((ref, index) => {
      if (ref.current) {
        // Center the stack around y=0
        const yOffset = (index - (LAYERS.length - 1) / 2) * currentSpacing
        ref.current.position.y = -yOffset // negative so DATA (index 0) is at bottom or top, let's say index 0 is top
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* The central core sits inside the controller so it spins together */}
      <SystemCore />

      {LAYERS.map((id, index) => (
        <GenericLayer
          key={id}
          id={id}
          index={index}
          ref={layerRefs.current[index]}
        />
      ))}
    </group>
  )
}
