import { useRef, createRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { projects } from '../../data/projects'
import { PROJECT_LAYER_MAP } from './ProjectMappings'
import { LAYERS } from '../core/ExplodedTransformController'
import { useSystemProgress } from '../state/systemProgress'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export default function ProjectAssemblyRenderer() {
  const featuredProjects = projects.filter(p => p.featured)
  
  const projectRefs = useRef(featuredProjects.map(() => createRef<THREE.Group>()))

  useFrame(() => {
    const { progress } = useSystemProgress.getState()

    // 1. Match Y-spacing from ExplodedTransformController (10% to 30%)
    const tSpread = clamp((progress - 0.1) / (0.3 - 0.1), 0, 1)
    const easeSpread = tSpread * tSpread * (3 - 2 * tSpread)
    const currentSpacing = 0.1 + (1.5 - 0.1) * easeSpread

    // 2. Assembly Orbit calculation (30% to 50%)
    const tOrbit = clamp((progress - 0.3) / (0.5 - 0.3), 0, 1)
    const easeOrbit = tOrbit * tOrbit * (3 - 2 * tOrbit)
    
    // Scale opacity of labels
    const labelOpacity = easeOrbit
    
    const orbitRadius = easeOrbit * 3.5

    featuredProjects.forEach((proj, idx) => {
      const ref = projectRefs.current[idx]
      if (!ref.current) return

      // Find the layer index for this project
      const key = proj.id.toLowerCase()
      let layerId = PROJECT_LAYER_MAP[key]
      
      // Fallback mapping if ID doesn't exactly match map casing
      if (!layerId) layerId = PROJECT_LAYER_MAP[proj.id]
      
      const layerIndex = LAYERS.indexOf(layerId)
      
      const yOffset = layerIndex !== -1 
        ? (layerIndex - (LAYERS.length - 1) / 2) * currentSpacing 
        : 0
      
      ref.current.position.y = -yOffset

      // Spread radially
      const angle = (idx / featuredProjects.length) * Math.PI * 2
      const spin = easeOrbit * Math.PI
      
      ref.current.position.x = Math.cos(angle + spin) * orbitRadius
      ref.current.position.z = Math.sin(angle + spin) * orbitRadius
      
      ref.current.rotation.y = -(angle + spin)

      // Apply opacity to Html container dynamically (hacky but avoids re-renders)
      const htmlDiv = ref.current.userData.htmlEl as HTMLElement
      if (htmlDiv) {
        htmlDiv.style.opacity = labelOpacity.toString()
      }
    })
  })

  return (
    <group>
      {featuredProjects.map((proj, idx) => (
        <group key={proj.id} ref={projectRefs.current[idx]}>
          <mesh>
            <octahedronGeometry args={[0.3, 0]} />
            <meshPhysicalMaterial 
              color="#F43F5E"
              emissive="#E11D48"
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>
          <Html 
            distanceFactor={15} 
            position={[0, 0.4, 0]} 
            center 
            ref={(el) => {
              // Store ref to HTML parent div so we can fade it in useFrame without re-renders
              if (projectRefs.current[idx].current && el) {
                projectRefs.current[idx].current!.userData.htmlEl = el
              }
            }}
          >
            <div className="flex flex-col items-center pointer-events-none transition-opacity duration-75">
              <div className="text-[8px] font-mono tracking-widest text-indigo-400 bg-black/80 px-1 py-0.5 rounded border border-indigo-500/30 backdrop-blur-md">
                {proj.number}
              </div>
              <div className="text-[12px] font-bold text-white whitespace-nowrap mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {proj.title}
              </div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}
