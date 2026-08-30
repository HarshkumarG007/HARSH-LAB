import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function MouseParallax() {
  // Store the target coordinates for smooth interpolation
  const target = new THREE.Vector2()

  useFrame((state) => {
    // state.pointer holds normalized mouse coords (-1 to +1)
    // We want the camera to subtly shift opposite to the mouse direction for parallax
    target.x = (state.pointer.x * 2) 
    target.y = (state.pointer.y * 2)

    // Smoothly interpolate current camera position towards target
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, target.x, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, target.y, 0.05)
    
    // Ensure the camera continues to look at the center of the scene
    state.camera.lookAt(0, 0, 0)
  })

  return null
}
