import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 60000

const vertexShader = /* glsl */`
attribute vec3 aTargetPosition;
attribute float aSeed;
attribute float aSize;

uniform float uProgress;   // 0 = scattered chaos → 1 = formed text
uniform float uTime;
uniform vec3  uMousePos;   // normalized -1..1

varying float vAlpha;
varying float vSeed;

// Smooth easing
float easeOutExpo(float x) {
  return x == 1.0 ? 1.0 : 1.0 - pow(2.0, -10.0 * x);
}

void main() {
  vSeed = aSeed;

  float easedProgress = easeOutExpo(uProgress);

  // Turbulence that fades as particles settle
  float turbulence = (1.0 - easedProgress);
  float wobble = sin(uTime * 2.0 + aSeed * 6.28) * turbulence * 3.0;
  float wobble2 = cos(uTime * 1.5 + aSeed * 3.14) * turbulence * 2.0;

  vec3 currentPos = mix(position, aTargetPosition, easedProgress);
  currentPos.x += wobble;
  currentPos.y += wobble2;
  currentPos.z += sin(uTime + aSeed * 9.0) * turbulence * 1.5;

  // Mouse repulsion — particles near cursor scatter slightly
  vec3 toMouse = currentPos - uMousePos;
  float mouseDist = length(toMouse);
  float repulsion = smoothstep(2.0, 0.0, mouseDist) * 0.5 * easedProgress;
  currentPos += normalize(toMouse) * repulsion;

  // Alpha: formed particles are bright, scattered are dim
  vAlpha = mix(0.1, 1.0, easedProgress) * (0.6 + 0.4 * sin(uTime + aSeed * 5.0));
  
  vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Size attenuation
  float baseSize = aSize * (300.0 / -mvPosition.z);
  gl_PointSize = clamp(baseSize * (0.5 + easedProgress * 0.5), 1.0, 4.0);
}
`

const fragmentShader = /* glsl */`
uniform vec3 uColorCore;
uniform vec3 uColorGlow;

varying float vAlpha;
varying float vSeed;

void main() {
  // Circular soft particle
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  if (dist > 0.5) discard;

  // Soft edge glow
  float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
  
  // Color varies subtly by seed for depth
  vec3 color = mix(uColorCore, uColorGlow, vSeed);
  
  gl_FragColor = vec4(color, alpha);
}
`

function sampleTextPositions(text: string[], count: number): THREE.Vector3[] {
  // Render text to an offscreen canvas and sample pixel positions
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 400
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, 1024, 400)
  ctx.fillStyle = 'white'
  ctx.font = 'bold 130px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(text[0] ?? '', 512, 160)
  ctx.font = 'bold 130px Inter, sans-serif'
  ctx.fillText(text[1] ?? '', 512, 320)

  const imageData = ctx.getImageData(0, 0, 1024, 400)
  const pixels: [number, number][] = []

  // Sample lit pixels
  for (let y = 0; y < 400; y += 2) {
    for (let x = 0; x < 1024; x += 2) {
      const idx = (y * 1024 + x) * 4
      if (imageData.data[idx] > 128) {
        pixels.push([x, y])
      }
    }
  }

  // Normalize to 3D world coordinates
  const positions: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    const px = pixels[Math.floor(Math.random() * pixels.length)]
    // Map canvas [0,1024]×[0,400] to world [-8,8]×[-3,3]
    const wx = (px[0] / 1024 - 0.5) * 16
    const wy = -(px[1] / 400 - 0.5) * 6
    const wz = (Math.random() - 0.5) * 0.5  // Slight z depth
    positions.push(new THREE.Vector3(wx, wy, wz))
  }
  return positions
}

import { MotionValue } from 'framer-motion'

interface NeuralGalaxyProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export default function NeuralGalaxy({ mouseX, mouseY }: NeuralGalaxyProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const progressRef = useRef(0)
  const { size } = useThree()

  const { geometry, uniforms } = useMemo(() => {
    const targets = sampleTextPositions(['HARSH KUMAR', 'GUPTA'], PARTICLE_COUNT)

    const positions   = new Float32Array(PARTICLE_COUNT * 3)
    const targets3    = new Float32Array(PARTICLE_COUNT * 3)
    const seeds       = new Float32Array(PARTICLE_COUNT)
    const sizes       = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random start position — a large sphere
      const r = 20 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi) - 10

      // Target = sampled text position
      const t = targets[i]
      targets3[i * 3]     = t.x
      targets3[i * 3 + 1] = t.y
      targets3[i * 3 + 2] = t.z

      seeds[i] = Math.random()
      sizes[i] = 1.0 + Math.random() * 2.0
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position',        new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aTargetPosition', new THREE.BufferAttribute(targets3, 3))
    geo.setAttribute('aSeed',           new THREE.BufferAttribute(seeds, 1))
    geo.setAttribute('aSize',           new THREE.BufferAttribute(sizes, 1))

    const uni = {
      uProgress:  { value: 0 },
      uTime:      { value: 0 },
      uMousePos:  { value: new THREE.Vector3(0, 0, 0) },
      uColorCore: { value: new THREE.Color('#a5b4fc') },  // Soft indigo
      uColorGlow: { value: new THREE.Color('#e879f9') },  // Violet pink
    }

    return { geometry: geo, uniforms: uni }
  }, [])

  // Animate progress on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = () => {
        progressRef.current = Math.min(progressRef.current + 0.008, 1.0)
        uniforms.uProgress.value = progressRef.current
        if (progressRef.current < 1.0) requestAnimationFrame(animate)
      }
      animate()
    }, 600)
    return () => clearTimeout(timeout)
  }, [uniforms])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
    // Map screen mouse to 3D world coords
    uniforms.uMousePos.value.set(
      (mouseX.get() / size.width  - 0.5) * 16,
      -(mouseY.get() / size.height - 0.5) * 6,
      0
    )
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
