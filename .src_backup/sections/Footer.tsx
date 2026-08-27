import { motion } from 'framer-motion'
import { ArrowUp, Terminal } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 border-t border-neon-cyan/10">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Terminal size={16} className="text-neon-cyan" />
            <span className="font-mono text-sm text-secondary">
              <span className="text-neon-cyan">&lt;CD/&gt;</span> © 2024 Your Name
            </span>
          </motion.div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-secondary/40 tracking-wider"
          >
            BUILT_WITH: React · Three.js · Framer Motion
          </motion.div>

          {/* Back to top */}
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-secondary hover:text-neon-cyan transition-colors duration-300 font-mono text-xs tracking-wider"
            data-cursor-label="TOP"
          >
            <span>[BACK_TO_TOP]</span>
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
