import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { projects } from '../data/projects'

const hologramVert = /* glsl */`
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const hologramFrag = /* glsl */`
uniform float uTime;
uniform vec3  uColor;
uniform float uHoverProgress;

varying vec2  vUv;
varying vec3  vNormal;
varying vec3  vPosition;

void main() {
  // Fresnel edge glow
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);

  // Scanlines
  float scanline = step(0.95, fract(vUv.y * 40.0 + uTime * 0.5)) * 0.15;

  // Iridescent color shift
  vec3 baseColor = uColor;
  baseColor += vec3(
    sin(uTime * 0.5 + vUv.x * 5.0) * 0.1,
    cos(uTime * 0.7 + vUv.y * 4.0) * 0.1,
    sin(uTime * 0.3 + vUv.x * 3.0 + vUv.y * 2.0) * 0.1
  ) * uHoverProgress;

  // Holographic shimmer band
  float band = smoothstep(0.3, 0.6, fract(vUv.y * 3.0 - uTime * 0.2));
  baseColor += vec3(0.1, 0.15, 0.3) * band * uHoverProgress;

  float alpha = 0.08 + fresnel * 0.2 + scanline + uHoverProgress * 0.1;
  gl_FragColor = vec4(baseColor, alpha);
}
`

function HolographicCard({ project, position, index, onSelect }: {
  project: typeof projects[0]
  position: [number, number, number]
  index: number
  onSelect: (project: typeof projects[0]) => void
}) {
  const groupRef  = useRef<THREE.Group>(null)
  const matRef    = useRef<THREE.ShaderMaterial>(null)
  const [hovered, setHovered] = useState(false)
  const hoverProgress = useRef(0)

  const color = useMemo(() => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981']
    return new THREE.Color(colors[index % colors.length])
  }, [index])

  const uniforms = useMemo(() => ({
    uTime:          { value: 0 },
    uColor:         { value: color },
    uHoverProgress: { value: 0 },
  }), [color])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime

    // Smooth hover interpolation
    hoverProgress.current = THREE.MathUtils.lerp(
      hoverProgress.current,
      hovered ? 1 : 0,
      0.08
    )
    uniforms.uHoverProgress.value = hoverProgress.current

    if (groupRef.current) {
      // Float animation
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5 + index) * 0.15

      // Tilt toward viewer on hover
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        hovered ? -0.05 : 0,
        0.05
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        hovered ? 0.05 : 0,
        0.05
      )
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => {
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(project)
      }}
    >
      {/* Card body — holographic glass */}
      <RoundedBox args={[2.8, 1.8, 0.04]} radius={0.06}>
        <shaderMaterial
          ref={matRef}
          vertexShader={hologramVert}
          fragmentShader={hologramFrag}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      {/* Edge glow wireframe */}
      <RoundedBox args={[2.82, 1.82, 0.04]} radius={0.06}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.08 + hoverProgress.current * 0.12}
        />
      </RoundedBox>

      {/* HTML content overlaid on card */}
      <Html
        transform
        position={[0, 0, 0.05]}
        style={{
          width: '240px',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
        center
      >
        <div
          aria-hidden="true"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#e2e8f0',
            textAlign: 'center',
            padding: '12px',
            userSelect: 'none',
          }}
        >
          <div style={{
            fontSize: '9px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: `#${color.getHexString()}`,
            marginBottom: '6px',
            opacity: 0.9,
          }}>
            {project.category ?? 'AI System'}
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            marginBottom: '6px',
            background: `linear-gradient(135deg, #fff, #${color.getHexString()})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {project.title}
          </div>
          <div style={{
            fontSize: '10px',
            color: '#94a3b8',
            lineHeight: 1.5,
            maxWidth: '200px',
            margin: '0 auto',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}>
            {project.description?.slice(0, 80)}...
          </div>
        </div>
      </Html>
    </group>
  )
}

export default function ProjectVault({ onProjectSelect }: { onProjectSelect?: (project: typeof projects[0]) => void }) {
  const featuredProjects = projects.slice(0, 6)

  // 3D grid arrangement — 3 columns, 2 rows
  const positions: [number, number, number][] = [
    [-4.2, 1.2, 0], [0, 1.2, 0], [4.2, 1.2, 0],
    [-4.2, -1.2, 0], [0, -1.2, 0], [4.2, -1.2, 0],
  ]

  return (
    <group>
      {featuredProjects.map((project, i) => (
        <HolographicCard
          key={project.title}
          project={project}
          position={positions[i]}
          index={i}
          onSelect={(p) => onProjectSelect?.(p)}
        />
      ))}
    </group>
  )
}
