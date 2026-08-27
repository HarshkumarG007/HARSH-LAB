import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type DesignVersion =
  | 'v1-cyberpunk'
  | 'v2-premium'
  | 'v3-god-tier'
  | 'v4-evidence'
  | 'v5-precious-metals'
  | 'v7-nexus'

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
  'v1-cyberpunk':        'Matrix',
  'v2-premium':          'Luxe',
  'v3-god-tier':         'God Mode',
  'v4-evidence':         'Evidence',
  'v5-precious-metals':  'Haute Couture',
  'v7-nexus':            'NEXUS',
}

const VERSION_DESCRIPTIONS: Record<DesignVersion, string> = {
  'v1-cyberpunk':        'Neon-drenched cyberpunk aesthetic with Matrix rain',
  'v2-premium':          'Apple × Linear × Stripe minimalist luxury',
  'v3-god-tier':         'Physics-based interactions with precious materials',
  'v4-evidence':         'Radical transparency with commit analysis',
  'v5-precious-metals':  'Gold, Platinum, Gemstones photorealistic materials',
  'v7-nexus':            '3D living universe — particle text, fluid sim, orbital credentials',
}

const VERSION_COLORS: Record<DesignVersion, string> = {
  'v1-cyberpunk':        '#00F3FF',
  'v2-premium':          '#6366F1',
  'v3-god-tier':         '#D4AF37',
  'v4-evidence':         '#10B981',
  'v5-precious-metals':  '#D4AF37',
  'v7-nexus':            '#818CF8',
}

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [currentVersion, setCurrentVersion] = useState<DesignVersion>('v7-nexus')
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Initialize version from URL
  useEffect(() => {
    const path = window.location.pathname
    let initialVersion: DesignVersion = 'v7-nexus'
    
    if (path === '/experiments/matrix') initialVersion = 'v1-cyberpunk'
    else if (path === '/experiments/luxe') initialVersion = 'v2-premium'
    else if (path === '/experiments/god') initialVersion = 'v3-god-tier'
    else if (path === '/experiments/evidence') initialVersion = 'v4-evidence'
    else if (path === '/experiments/metals') initialVersion = 'v5-precious-metals'
    
    setCurrentVersion(initialVersion)
    
    // Listen for browser back/forward navigation
    const handlePopState = () => {
      const p = window.location.pathname
      let v: DesignVersion = 'v7-nexus'
      if (p === '/experiments/matrix') v = 'v1-cyberpunk'
      else if (p === '/experiments/luxe') v = 'v2-premium'
      else if (p === '/experiments/god') v = 'v3-god-tier'
      else if (p === '/experiments/evidence') v = 'v4-evidence'
      else if (p === '/experiments/metals') v = 'v5-precious-metals'
      
      setCurrentVersion(v)
    }
    
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const setVersion = useCallback((version: DesignVersion) => {
    if (version === currentVersion) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentVersion(version)
      
      // Update URL without reloading
      let newPath = '/'
      if (version === 'v1-cyberpunk') newPath = '/experiments/matrix'
      else if (version === 'v2-premium') newPath = '/experiments/luxe'
      else if (version === 'v3-god-tier') newPath = '/experiments/god'
      else if (version === 'v4-evidence') newPath = '/experiments/evidence'
      else if (version === 'v5-precious-metals') newPath = '/experiments/metals'
      
      window.history.pushState({}, '', newPath)
      
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
  if (!context) throw new Error('useVersion must be used within VersionProvider')
  return context
}
