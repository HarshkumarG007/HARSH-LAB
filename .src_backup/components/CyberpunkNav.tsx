import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'

const navItems = [
  { label: '_HOME', href: '#home', id: 'home' },
  { label: '_WORK', href: '#work', id: 'work' },
  { label: '_ABOUT', href: '#about', id: 'about' },
  { label: '_LAB', href: '#experiments', id: 'experiments' },
  { label: '_CONTACT', href: '#contact', id: 'contact' },
]

export default function CyberpunkNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Active section detection (bottom-up scan)
      const ids = [...navItems].reverse().map(item => item.id)
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass py-4' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-neon-cyan font-mono font-bold text-xl tracking-tighter group"
          >
            <Terminal size={20} className="group-hover:text-neon-magenta transition-colors duration-300" />
            <span className="group-hover:text-neon-magenta transition-colors duration-300">&lt;CD/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-neon-cyan'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-cyan shadow-[0_0_8px_#00f3ff]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-matrix-DEFAULT animate-pulse shadow-[0_0_8px_#00ff41]" />
            <span className="text-matrix-DEFAULT text-xs font-mono tracking-wider">ONLINE</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neon-cyan p-2 border border-neon-cyan/30 hover:bg-neon-cyan/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden"
          >
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary font-mono text-2xl font-medium hover:text-neon-cyan transition-colors"
                >
                  <span className="text-neon-cyan/50 mr-2">0{index + 1}.</span>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
