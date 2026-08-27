import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type DesignVersion = 'v1-cyberpunk' | 'v2-premium' | 'v3-god-tier' | 'v4-evidence' | 'v5-precious-metals'

interface VersionContextType {
  currentVersion: DesignVersion
  setVersion: (version: DesignVersion) => void
  isTransitioning: boolean
  versionNames: Record<DesignVersion, string>
  versionDescriptions: Record<DesignVersion, string>
  versionColors: Record<DesignVersion, string>
}

const VersionContext = createContext<VersionContextType | undefined>(undefined)

const VERSION_NAMES: Record<DesignVersion, string> = {
  'v1-cyberpunk': 'Matrix',
  'v2-premium': 'Luxe',
  'v3-god-tier': 'God Mode',
  'v4-evidence': 'Evidence',
  'v5-precious-metals': 'Haute Couture',
}

const VERSION_DESCRIPTIONS: Record<DesignVersion, string> = {
  'v1-cyberpunk': 'Neon-drenched cyberpunk aesthetic with Matrix rain',
  'v2-premium': 'Apple × Linear × Stripe minimalist luxury',
  'v3-god-tier': 'Physics-based interactions with precious materials',
  'v4-evidence': 'Radical transparency with commit analysis',
  'v5-precious-metals': 'Gold, Platinum, Gemstones photorealistic materials',
}

const VERSION_COLORS: Record<DesignVersion, string> = {
  'v1-cyberpunk': '#00F3FF',
  'v2-premium': '#6366F1',
  'v3-god-tier': '#D4AF37',
  'v4-evidence': '#10B981',
  'v5-precious-metals': '#D4AF37',
}

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [currentVersion, setCurrentVersion] = useState<DesignVersion>('v5-precious-metals')
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load saved version on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-version') as DesignVersion
    if (saved && VERSION_NAMES[saved]) {
      setCurrentVersion(saved)
    }
  }, [])

  const setVersion = useCallback((version: DesignVersion) => {
    if (version === currentVersion) return
    
    setIsTransitioning(true)
    
    // Small delay for transition animation
    setTimeout(() => {
      setCurrentVersion(version)
      localStorage.setItem('portfolio-version', version)
      
      // Remove transitioning state after change
      setTimeout(() => setIsTransitioning(false), 500)
    }, 300)
  }, [currentVersion])

  return (
    <VersionContext.Provider
      value={{
        currentVersion,
        setVersion,
        isTransitioning,
        versionNames: VERSION_NAMES,
        versionDescriptions: VERSION_DESCRIPTIONS,
        versionColors: VERSION_COLORS,
      }}
    >
      {children}
    </VersionContext.Provider>
  )
}

export function useVersion() {
  const context = useContext(VersionContext)
  if (!context) {
    throw new Error('useVersion must be used within VersionProvider')
  }
  return context
}
