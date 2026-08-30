import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { repositoryEvidence } from '../../data/evidence'
import { credentials } from '../../data/credentials'
import { useSystemProgress } from '../state/systemProgress'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export default function EvidenceMatrixRenderer() {
  const { viewport } = useThree()
  const htmlRef = useRef<HTMLDivElement>(null)

  // Grab a few top credentials
  const topCreds = credentials.slice(0, 3)

  useFrame(() => {
    const { progress } = useSystemProgress.getState()

    // Reveal matrix between 70% and 90% scroll depth
    const tMatrix = clamp((progress - 0.7) / (0.9 - 0.7), 0, 1)
    
    if (htmlRef.current) {
      // Fade in
      htmlRef.current.style.opacity = tMatrix.toString()
      // Optional subtle slide up
      const yOffset = (1 - tMatrix) * 20
      htmlRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`
    }
  })

  return (
    // We place it fixed relative to the camera, essentially as a screen overlay, 
    // but anchored into the 3D scene coordinate space.
    <Html
      position={[-viewport.width / 3, viewport.height / 4, 0]}
      center
      zIndexRange={[100, 0]} // Ensure it renders above the WebGL lines/core
    >
      <div 
        ref={htmlRef}
        className="pointer-events-none opacity-0 flex flex-col gap-6 font-mono w-72"
        style={{ willChange: 'opacity, transform' }}
      >
        {/* Repo Metrics Block */}
        <div className="bg-black/60 backdrop-blur-md border border-indigo-500/30 p-4 rounded-lg shadow-xl shadow-indigo-900/20">
          <div className="text-[10px] text-indigo-400 uppercase tracking-widest mb-3 border-b border-indigo-500/20 pb-1">
            Verified Telemetry
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-bold text-white">{repositoryEvidence.totalCommits}</div>
              <div className="text-[9px] text-slate-400 uppercase">Total Commits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{repositoryEvidence.totalRepos}</div>
              <div className="text-[9px] text-slate-400 uppercase">Repositories</div>
            </div>
          </div>
          <div className="mt-3 text-[8px] text-slate-500">
            Source: GitHub API / {repositoryEvidence.auditDate}
          </div>
        </div>

        {/* Credentials Block */}
        <div className="bg-black/60 backdrop-blur-md border border-rose-500/30 p-4 rounded-lg shadow-xl shadow-rose-900/20">
          <div className="text-[10px] text-rose-400 uppercase tracking-widest mb-3 border-b border-rose-500/20 pb-1">
            Active Certifications
          </div>
          <div className="flex flex-col gap-3">
            {topCreds.map((cred) => (
              <div key={cred.id} className="flex flex-col">
                <div className="text-xs font-bold text-white truncate" title={cred.title}>
                  {cred.title}
                </div>
                <div className="text-[9px] text-slate-400">
                  {cred.issuer} // {cred.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Html>
  )
}
