import { useRef, useMemo, createRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { projects } from '../../data/projects'
import { PROJECT_LAYER_MAP } from '../projects/ProjectMappings'
import { LAYERS } from './ExplodedTransformController'
import { useSystemProgress } from '../state/systemProgress'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export default function DataConnectors() {
  const featuredProjects = useMemo(() => projects.filter(p => p.featured), [])
  
  // Refs for the 6 line materials so we can animate their dashOffset or opacity
  const materialRefs = useRef(featuredProjects.map(() => createRef<THREE.LineBasicMaterial>()))
  // Refs for the 6 buffer geometries so we can update points dynamically
  const geoRefs = useRef(featuredProjects.map(() => createRef<THREE.BufferGeometry>()))

  useFrame(() => {
    const { progress } = useSystemProgress.getState()

    // 1. Same Y-spacing calculation from ExplodedTransformController (10% to 30%)
    const tSpread = clamp((progress - 0.1) / (0.3 - 0.1), 0, 1)
    const easeSpread = tSpread * tSpread * (3 - 2 * tSpread)
    const currentSpacing = 0.1 + (1.5 - 0.1) * easeSpread

    // 2. Assembly Orbit calculation (30% to 50%)
    const tOrbit = clamp((progress - 0.3) / (0.5 - 0.3), 0, 1)
    const easeOrbit = tOrbit * tOrbit * (3 - 2 * tOrbit)
    const orbitRadius = easeOrbit * 3.5

    // 3. Draw Splines calculation (50% to 70%)
    const tDraw = clamp((progress - 0.5) / (0.7 - 0.5), 0, 1)
    const easeDraw = tDraw * tDraw * (3 - 2 * tDraw)

    featuredProjects.forEach((proj, idx) => {
      const geoRef = geoRefs.current[idx]
      const matRef = materialRefs.current[idx]
      
      if (!geoRef.current || !matRef.current || !geoRef.current.attributes.position) return

      // Target Coordinates
      const key = proj.id.toLowerCase()
      let layerId = PROJECT_LAYER_MAP[key]
      if (!layerId) layerId = PROJECT_LAYER_MAP[proj.id]
      
      const layerIndex = LAYERS.indexOf(layerId)
      const yOffset = layerIndex !== -1 ? (layerIndex - (LAYERS.length - 1) / 2) * currentSpacing : 0
      
      const angle = (idx / featuredProjects.length) * Math.PI * 2
      const spin = easeOrbit * Math.PI
      
      const targetX = Math.cos(angle + spin) * orbitRadius
      const targetY = -yOffset
      const targetZ = Math.sin(angle + spin) * orbitRadius

      // Update Line positions
      const positions = geoRef.current.attributes.position.array as Float32Array
      // Point 0 is origin [0,0,0], Point 1 is target
      positions[3] = targetX
      positions[4] = targetY
      positions[5] = targetZ
      geoRef.current.attributes.position.needsUpdate = true

      // Animate line drawing
      // We will use opacity and a simple trick: if it's 0, we can hide it.
      // Or we can just lerp the target coordinates towards the actual target using easeDraw!
      // This actually literally "draws" the line outwards.
      
      positions[3] = targetX * easeDraw
      positions[4] = targetY * easeDraw
      positions[5] = targetZ * easeDraw
      
      matRef.current.opacity = easeDraw > 0 ? 0.6 : 0
    })
  })

  return (
    <group>
      {featuredProjects.map((proj, idx) => (
        <line key={`connector-${proj.id}`}>
          <bufferGeometry ref={geoRefs.current[idx]}>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(6)} // [0,0,0, 0,0,0]
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={materialRefs.current[idx]}
            color="#6366F1"
            transparent
            opacity={0}
            linewidth={1}
          />
        </line>
      ))}
    </group>
  )
}
