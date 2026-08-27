import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      {/* HDR Bloom — makes emissive surfaces glow like real LEDs */}
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* Chromatic aberration — subtle RGB split for cinematic feel */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0005, 0.0005]}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* Film grain — makes everything feel textured, not plastic */}
      <Noise
        blendFunction={BlendFunction.SOFT_LIGHT}
        opacity={0.04}
      />

      {/* Vignette — draws eye to center, frames the scene */}
      <Vignette
        offset={0.3}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
