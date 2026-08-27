import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, 
  Check, 
  ChevronRight, 
  Sparkles,
  Zap,
  Gem,
  Shield,
  Crown,
  Hexagon
} from 'lucide-react'
import { useVersion, DesignVersion } from '../contexts/VersionContext'

const versionIcons: Record<DesignVersion, typeof Zap> = {
  'v1-cyberpunk': Zap,
  'v2-premium': Palette,
  'v3-god-tier': Crown,
  'v4-evidence': Shield,
  'v5-precious-metals': Gem,
  'v7-nexus': Hexagon,
}

const versionGradients: Record<DesignVersion, string> = {
  'v1-cyberpunk': 'from-cyan-500 to-blue-600',
  'v2-premium': 'from-indigo-500 to-purple-600',
  'v3-god-tier': 'from-amber-400 to-orange-600',
  'v4-evidence': 'from-emerald-400 to-green-600',
  'v5-precious-metals': 'from-yellow-400 via-amber-300 to-yellow-600',
  'v7-nexus': 'from-indigo-600 via-purple-600 to-fuchsia-600',
}

export default function VersionSwitcher() {
  const { 
    currentVersion, 
    setVersion, 
    isTransitioning,
    versionNames,
    versionDescriptions,
    versionColors 
  } = useVersion()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcut: Cmd/Ctrl + Shift + V
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === 'KeyV') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const CurrentIcon = versionIcons[currentVersion]

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[99999]">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative flex items-center gap-3 px-5 py-3 rounded-full
          bg-gradient-to-r ${versionGradients[currentVersion]}
          text-white font-medium shadow-lg
          border border-white/20
          backdrop-blur-sm cursor-pointer
        `}
        style={{
          boxShadow: `0 10px 40px -10px ${versionColors[currentVersion]}80`,
        }}
      >
        <CurrentIcon size={18} />
        <span className="hidden sm:inline">{versionNames[currentVersion]}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight size={16} className="rotate-90" />
        </motion.div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine-sweep" />
        </div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full right-0 mb-4 w-80 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                Design Versions
              </h3>
              <p className="text-slate-400 text-xs mt-1">Switch between portfolio themes (Ctrl+Shift+V)</p>
            </div>

            {/* Version List */}
            <div className="p-2 space-y-1">
              {(Object.keys(versionNames) as DesignVersion[]).map((version) => {
                const Icon = versionIcons[version]
                const isActive = version === currentVersion

                return (
                  <motion.button
                    key={version}
                    onClick={() => {
                      setVersion(version)
                      setIsOpen(false)
                    }}
                    whileHover={{ x: 4 }}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl text-left
                      transition-all duration-200 cursor-pointer
                      ${isActive 
                        ? 'bg-white/10 border border-white/20' 
                        : 'hover:bg-white/5 border border-transparent'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                        bg-gradient-to-br ${versionGradients[version]}
                        ${isActive ? 'shadow-lg' : 'opacity-70'}
                      `}
                    >
                      <Icon size={20} className="text-white" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {versionNames[version]}
                        </span>
                        {isActive && (
                          <span className="text-emerald-400">
                            <Check size={14} />
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-xs truncate">
                        {versionDescriptions[version]}
                      </p>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <p className="text-slate-500 text-xs text-center">
                Preference saved automatically
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
