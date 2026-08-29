import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSystemProgress } from '../state/systemProgress'

export default function SystemCore() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Rotate based on scroll progress without React re-renders
  useFrame(() => {
    if (!meshRef.current) return
    const { progress } = useSystemProgress.getState()
    
    // Rotate 2 full revolutions over the entire scroll
    meshRef.current.rotation.y = progress * Math.PI * 4
    meshRef.current.rotation.x = progress * Math.PI
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial 
          color="#818CF8" 
          wireframe 
          emissive="#4F46E5"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Central solid core */}
      <mesh>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial 
          color="#F43F5E" 
          emissive="#E11D48"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  )
}
