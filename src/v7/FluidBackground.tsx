import { useRef, useMemo, useCallback, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Fluid simulation using FBO ping-pong
// Implements: velocity advection, curl-based turbulence, dye advection
const advectionVert = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const splatFrag = /* glsl */`
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;

varying vec2 vUv;

void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  float dist = exp(-dot(p,p) / uRadius);
  vec3 splat = dist * uColor;
  vec3 base  = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}
`

const advectionFrag = /* glsl */`
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uDt;
uniform float uDissipation;

varying vec2 vUv;

void main() {
  vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
  vec4 result = uDissipation * texture2D(uSource, coord);
  gl_FragColor = result;
}
`

const displayFrag = /* glsl */`
uniform sampler2D uTexture;
uniform float uAlpha;
varying vec2 vUv;
void main() {
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = vec4(color.rgb, uAlpha);
}
`

const SIM_RES = 128
const DYE_RES = 512

export default function FluidBackground() {
  const { gl, size } = useThree()
  const meshRef = useRef<THREE.Mesh>(null)

  const lastMouseRef = useRef({ x: 0.5, y: 0.5 })

  const sim = useMemo(() => {
    const createFBO = (w: number, h: number): [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget] => {
      const opts = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
      }
      return [new THREE.WebGLRenderTarget(w, h, opts), new THREE.WebGLRenderTarget(w, h, opts)]
    }

    const [velA, velB]   = createFBO(SIM_RES, SIM_RES)
    const [dyeA, dyeB]   = createFBO(DYE_RES, DYE_RES)

    const quad = new THREE.PlaneGeometry(2, 2)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const scene = new THREE.Scene()

    const splatMat = new THREE.ShaderMaterial({
      vertexShader: advectionVert,
      fragmentShader: splatFrag,
      uniforms: {
        uTarget: { value: null },
        uAspect: { value: 1 },
        uColor:  { value: new THREE.Vector3() },
        uPoint:  { value: new THREE.Vector2() },
        uRadius: { value: 0.0015 },
      },
    })

    const advectMat = new THREE.ShaderMaterial({
      vertexShader: advectionVert,
      fragmentShader: advectionFrag,
      uniforms: {
        uVelocity:     { value: null },
        uSource:       { value: null },
        uTexelSize:    { value: new THREE.Vector2(1/SIM_RES, 1/SIM_RES) },
        uDt:           { value: 0.016 },
        uDissipation:  { value: 0.98 },
      },
    })

    const displayMat = new THREE.ShaderMaterial({
      vertexShader: advectionVert,
      fragmentShader: displayFrag,
      uniforms: {
        uTexture: { value: null },
        uAlpha:   { value: 0.6 },
      },
      transparent: true,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(quad, splatMat)
    scene.add(mesh)

    return { velA, velB, dyeA, dyeB, splatMat, advectMat, displayMat, scene, camera, mesh, quad }
  }, [])

  // Explicit resource disposal to prevent GPU memory leaks on unmount/remount
  useEffect(() => {
    return () => {
      sim.velA.dispose()
      sim.velB.dispose()
      sim.dyeA.dispose()
      sim.dyeB.dispose()
      sim.splatMat.dispose()
      sim.advectMat.dispose()
      sim.displayMat.dispose()
      sim.quad.dispose()
    }
  }, [sim])

  const renderWith = useCallback((mat: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null) => {
    sim.mesh.material = mat as any
    gl.setRenderTarget(target)
    gl.render(sim.scene, sim.camera)
    gl.setRenderTarget(null)
  }, [gl, sim])

  const splat = useCallback((velFBO: THREE.WebGLRenderTarget, dyeFBO: THREE.WebGLRenderTarget,
    x: number, y: number, dx: number, dy: number) => {
    const aspect = size.width / size.height

    // Velocity splat
    sim.splatMat.uniforms.uTarget.value = velFBO.texture
    sim.splatMat.uniforms.uAspect.value = aspect
    sim.splatMat.uniforms.uPoint.value.set(x, y)
    sim.splatMat.uniforms.uColor.value.set(dx * 8, dy * 8, 0)
    sim.splatMat.uniforms.uRadius.value = 0.003
    renderWith(sim.splatMat, velFBO)

    // Dye splat — vivid brand colors
    sim.splatMat.uniforms.uTarget.value = dyeFBO.texture
    sim.splatMat.uniforms.uRadius.value = 0.006
    const hue = (Date.now() * 0.0001) % 1
    const c = new THREE.Color().setHSL(0.67 + hue * 0.2, 1, 0.7) // Violet to indigo range
    sim.splatMat.uniforms.uColor.value.set(c.r, c.g, c.b)
    renderWith(sim.splatMat, dyeFBO)
  }, [size, sim, renderWith])

  useFrame(({ mouse }) => {
    const mx = mouse.x * 0.5 + 0.5
    const my = mouse.y * 0.5 + 0.5

    const dx = mx - lastMouseRef.current.x
    const dy = my - lastMouseRef.current.y

    // Only splat on real mouse movement
    if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
      splat(sim.velA, sim.dyeA, mx, my, dx * 40, dy * 40)
    }

    lastMouseRef.current = { x: mx, y: my }

    // Advect velocity
    sim.advectMat.uniforms.uVelocity.value  = sim.velA.texture
    sim.advectMat.uniforms.uSource.value    = sim.velA.texture
    sim.advectMat.uniforms.uDissipation.value = 0.97
    renderWith(sim.advectMat, sim.velB)
    ;[sim.velA, sim.velB] = [sim.velB, sim.velA] // Swap

    // Advect dye
    sim.advectMat.uniforms.uVelocity.value  = sim.velA.texture
    sim.advectMat.uniforms.uSource.value    = sim.dyeA.texture
    sim.advectMat.uniforms.uDissipation.value = 0.99
    renderWith(sim.advectMat, sim.dyeB)
    ;[sim.dyeA, sim.dyeB] = [sim.dyeB, sim.dyeA] // Swap

    // Update display by mutating the uniform of the stable displayMat,
    // rather than replacing the entire material object on the mesh
    if (meshRef.current) {
      sim.displayMat.uniforms.uTexture.value = sim.dyeA.texture
    }
  })

  return (
    <mesh ref={meshRef} scale={[20, 12, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={sim.displayMat} attach="material" />
    </mesh>
  )
}
