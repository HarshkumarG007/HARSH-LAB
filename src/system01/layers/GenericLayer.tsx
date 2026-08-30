import { forwardRef } from 'react'
import * as THREE from 'three'
import { LayerId } from '../types'

interface GenericLayerProps {
  id: LayerId
  index: number
}

const GenericLayer = forwardRef<THREE.Group, GenericLayerProps>((_, ref) => {
  return (
    <group ref={ref}>
      {/* 
        A thin glass plane representing the systemic layer.
        We position it slightly down by default so the stack centers around 0.
      */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshPhysicalMaterial 
          color="#818CF8"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.3}
          transmission={0.9}
          ior={1.5}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Edge highlight */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial 
          color="#6366F1"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
})

GenericLayer.displayName = 'GenericLayer'

export default GenericLayer
