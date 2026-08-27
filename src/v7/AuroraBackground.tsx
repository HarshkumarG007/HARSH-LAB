import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simplex noise inline (no dependency)
const GLSL_SIMPLEX = /* glsl */`
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const vertexShader = /* glsl */`
${GLSL_SIMPLEX}

uniform float uTime;
uniform float uSpeed;

varying vec2 vUv;
varying float vNoise;
varying float vElevation;

void main() {
  vUv = uv;
  
  // Multi-octave noise for organic movement
  float noise1 = snoise(vec3(position.x * 0.3, position.y * 0.2, uTime * uSpeed * 0.15));
  float noise2 = snoise(vec3(position.x * 0.6 + 100.0, position.y * 0.4, uTime * uSpeed * 0.25)) * 0.5;
  float noise3 = snoise(vec3(position.x * 1.2 + 200.0, position.y * 0.8, uTime * uSpeed * 0.4)) * 0.25;
  
  float combinedNoise = noise1 + noise2 + noise3;
  vNoise = combinedNoise;
  
  // Vertical wave displacement
  float elevation = combinedNoise * 2.5;
  vElevation = elevation;
  
  vec3 newPosition = position;
  newPosition.y += elevation;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

const fragmentShader = /* glsl */`
uniform float uTime;
uniform vec3 uColorA;   // Deep navy
uniform vec3 uColorB;   // Violet
uniform vec3 uColorC;   // Indigo
uniform vec3 uColorD;   // Emerald accent
uniform float uOpacity;

varying vec2 vUv;
varying float vNoise;
varying float vElevation;

void main() {
  // Blend 4 colors based on noise layers
  float t1 = smoothstep(-1.0, 1.0, vNoise);
  float t2 = smoothstep(-0.5, 0.5, vElevation * 0.4 + sin(uTime * 0.1) * 0.1);
  
  vec3 colorAB = mix(uColorA, uColorB, t1);
  vec3 colorCD = mix(uColorC, uColorD, t1 * 0.7);
  vec3 finalColor = mix(colorAB, colorCD, t2);
  
  // Edge fade
  float edgeFade = 1.0 - abs(vUv.x - 0.5) * 2.0;
  edgeFade *= 1.0 - abs(vUv.y - 0.5) * 2.0;
  edgeFade = smoothstep(0.0, 0.4, edgeFade);
  
  // Add shimmer highlights
  float shimmer = snoise(vec3(vUv * 8.0, uTime * 0.3)) * 0.5 + 0.5;
  finalColor += vec3(shimmer * 0.05);
  
  gl_FragColor = vec4(finalColor, uOpacity * edgeFade);
}
`
// Need to re-import snoise — include it in fragment too
const fragmentShaderFull = fragmentShader.replace(
  'uniform float uTime;',
  `${GLSL_SIMPLEX}\nuniform float uTime;`
)

export default function AuroraBackground() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uSpeed:   { value: 0.4 },
    uOpacity: { value: 0.35 },
    uColorA:  { value: new THREE.Color('#0a0a1a') },  // Deep navy void
    uColorB:  { value: new THREE.Color('#2d1b69') },  // Rich violet
    uColorC:  { value: new THREE.Color('#1e1b4b') },  // Indigo depth
    uColorD:  { value: new THREE.Color('#064e3b') },  // Emerald pulse
  }), [])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -8]}>
      <planeGeometry args={[60, 30, 120, 80]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShaderFull}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}
