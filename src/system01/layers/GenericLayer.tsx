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
          opacity={0.15}
          roughness={0.2}
          metalness={0.8}
          transmission={0.5}
          side={THREE.DoubleSide}
          wireframe={false}
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
