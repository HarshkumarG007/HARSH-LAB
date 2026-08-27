import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Camera path through the NEXUS world
// Each section has a world position the camera travels to
export const SECTION_POSITIONS = {
  hero:         { pos: [0, 0, 12] as [number, number, number], target: [0, 0.5, 0] },
  evidence:     { pos: [0, 2, -2] as [number, number, number], target: [0, 0, -8] },
  projects:     { pos: [0, 0, 8]  as [number, number, number], target: [0, 0, 0]  },
  credentials:  { pos: [0, 3, 12] as [number, number, number], target: [0, 0, 0]  },
  contact:      { pos: [0, 0, 14] as [number, number, number], target: [0, 0, 0]  },
}

// The camera follows a CatmullRom spline so movement is completely smooth
const buildSpline = () => {
  const waypoints = [
    new THREE.Vector3(0, 0, 14),   // Hero — looking in from afar
    new THREE.Vector3(2, 1, 10),   // Transition pan
    new THREE.Vector3(0, 2, -2),   // Evidence observatory view
    new THREE.Vector3(-3, 1, 8),   // Sweep into projects
    new THREE.Vector3(0, 0, 8),    // Projects full view
    new THREE.Vector3(3, 3, 12),   // Rise up to credentials
    new THREE.Vector3(0, 1, 14),   // Final contact position
  ]
  return new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.5)
}

const buildLookAtSpline = () => {
  const targets = [
    new THREE.Vector3(0, 0.5, 0),   // Hero text
    new THREE.Vector3(0, 0, -5),    // Evidence
    new THREE.Vector3(0, 0, -5),    // Still evidence
    new THREE.Vector3(0, 0, 0),     // Projects
    new THREE.Vector3(0, 0, 0),     // Projects center
    new THREE.Vector3(0, 0, 0),     // Credentials center
    new THREE.Vector3(0, 0, 0),     // Contact center
  ]
  return new THREE.CatmullRomCurve3(targets, false, 'catmullrom', 0.5)
}

export interface ScrollCameraHandle {
  setProgress: (t: number) => void
}

const ScrollCamera = forwardRef<ScrollCameraHandle>((_, ref) => {
  const { camera } = useThree()
  const progressRef  = useRef(0)
  const targetProg   = useRef(0)
  const spline       = buildSpline()
  const lookSpline   = buildLookAtSpline()
  const camPos       = useRef(new THREE.Vector3())
  const lookAt       = useRef(new THREE.Vector3())

  useImperativeHandle(ref, () => ({
    setProgress: (t: number) => { targetProg.current = t },
  }))

  useEffect(() => {
    // GSAP ScrollTrigger drives camera progress
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,   // Smoothing lag behind scroll (in seconds)
      onUpdate: (self) => {
        targetProg.current = self.progress
      },
    })

    return () => trigger.kill()
  }, [])

  useFrame(() => {
    // Lerp current progress toward target — adds inertia
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, targetProg.current, 0.04)

    // Sample camera position from spline
    spline.getPoint(progressRef.current, camPos.current)
    lookSpline.getPoint(progressRef.current, lookAt.current)

    // Add subtle idle drift
    const drift = Date.now() * 0.0003
    camPos.current.x += Math.sin(drift) * 0.1
    camPos.current.y += Math.cos(drift * 0.7) * 0.05

    camera.position.lerp(camPos.current, 0.08)
    camera.lookAt(lookAt.current)
  })

  return null
})

ScrollCamera.displayName = 'ScrollCamera'

export default ScrollCamera
