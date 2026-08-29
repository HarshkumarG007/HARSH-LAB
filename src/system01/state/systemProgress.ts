import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface SystemProgressState {
  progress: number          // 0 to 1
  reducedMotion: boolean
  setProgress: (p: number) => void
  setReducedMotion: (v: boolean) => void
}

export const useSystemProgress = create<SystemProgressState>()(
  subscribeWithSelector((set) => ({
    progress: 0,
    reducedMotion: false,
    setProgress: (p) => set({ progress: p }),
    setReducedMotion: (v) => set({ reducedMotion: v }),
  }))
)
