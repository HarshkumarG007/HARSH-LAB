import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

// TRON-style Grid Floor with custom shader
function TronGrid() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const shaderData = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color('#00f3ff') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;

      void main() {
        float grid = step(0.98, fract(vUv.x * 50.0)) + step(0.98, fract(vUv.y * 50.0));
        float pulse = sin(time * 2.0 + vUv.y * 10.0) * 0.5 + 0.5;
        vec3 finalColor = color * grid * pulse;
        gl_FragColor = vec4(finalColor, grid * 0.5);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  }), [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial ref={materialRef} args={[shaderData]} />
    </mesh>
  )
}

// Floating Cyberpunk Geometries
function CyberpunkShapes() {
  const group = useRef<THREE.Group>(null)

  const geometries = useMemo(() => [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.TorusGeometry(0.6, 0.2, 16, 100),
    new THREE.DodecahedronGeometry(0.7, 0),
    new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16),
  ], [])

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.03
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  return (
    <group ref={group}>
      {geometries.map((geo, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={3}
          floatIntensity={2}
          position={[
            Math.sin(i * 1.5) * 5,
            Math.cos(i * 1.2) * 2,
            Math.sin(i * 0.8) * 3 - 5,
          ]}
        >
          <mesh geometry={geo}>
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00f3ff' : '#ff00ff'}
              emissive={i % 2 === 0 ? '#00f3ff' : '#ff00ff'}
              emissiveIntensity={0.5}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Glow mesh */}
          <mesh geometry={geo} scale={1.1}>
            <meshBasicMaterial
              color={i % 2 === 0 ? '#00f3ff' : '#ff00ff'}
              transparent
              opacity={0.05}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Light Cycle Trails
function LightTrails() {
  const points = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const count = 800
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const t = i / count
      pos[i * 3] = Math.sin(t * Math.PI * 4) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = Math.cos(t * Math.PI * 4) * 8 - 5

      col[i * 3] = 0 + t
      col[i * 3 + 1] = 0.95
      col[i * 3 + 2] = 1 - t * 0.5
    }

    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Atmospheric Fog Particles
function AtmosphericFog() {
  const fogRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!fogRef.current) return
    fogRef.current.rotation.y = state.clock.elapsedTime * 0.01
    const pos = fogRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
    }
    fogRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={fogRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#b829dd"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Subtle camera drift
function CameraController() {
  const { camera } = useThree()

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.3
    camera.lookAt(0, 0, -5)
  })

  return null
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} color="#00f3ff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={0.8} />
      <pointLight position={[0, 5, -5]} color="#b829dd" intensity={0.5} />

      <TronGrid />
      <CyberpunkShapes />
      <LightTrails />
      <AtmosphericFog />

      <fog attach="fog" args={['#020204', 5, 25]} />
      <Environment preset="night" />
    </>
  )
}

export default function CyberpunkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <CameraController />
      <SceneContent />
    </Canvas>
  )
}
