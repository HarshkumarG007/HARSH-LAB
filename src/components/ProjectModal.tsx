import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, GitCommit, Layers, Database, Code2 } from 'lucide-react'
import { Project } from '../data/projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#050510]/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row bg-[#0a0a1a]/90"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Left Sidebar: Meta Info */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-8 flex flex-col justify-between bg-white/5">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    project.tier === 'A' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    project.tier === 'B' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' :
                    'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    Tier {project.tier}
                  </span>
                  <span className="text-white/40 text-xs font-mono">{project.category}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                  {project.title}
                </h2>
                <p className="text-indigo-400 font-mono text-xs mb-6">
                  {project.tagline}
                </p>
                
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="text-white/30 text-[10px] uppercase tracking-widest font-mono border-b border-white/10 pb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-xs text-white/70 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  <Github size={16} />
                  View Source
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-colors font-medium text-sm"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Right Side: Architecture Deep Dive */}
            <div className="w-full md:w-2/3 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <GitCommit size={16} />
                </div>
                <h3 className="text-xl font-bold text-white">Architecture Deep Dive</h3>
              </div>

              {project.architecture ? (
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  
                  {/* L1: High Level */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#0a0a1a] bg-indigo-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Layers size={12} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white text-sm">L1: System Overview</h4>
                        <span className="text-indigo-400 text-[10px] font-mono bg-indigo-400/10 px-2 py-0.5 rounded">HIGH LEVEL</span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {project.architecture.l1}
                      </p>
                    </div>
                  </div>

                  {/* L2: Data Flow */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#0a0a1a] bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Database size={12} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white text-sm">L2: Data Flow</h4>
                        <span className="text-emerald-400 text-[10px] font-mono bg-emerald-400/10 px-2 py-0.5 rounded">COMPONENTS</span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed font-mono">
                        {project.architecture.l2}
                      </p>
                    </div>
                  </div>

                  {/* L3: Implementation */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#0a0a1a] bg-amber-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Code2 size={12} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white text-sm">L3: Implementation</h4>
                        <span className="text-amber-400 text-[10px] font-mono bg-amber-400/10 px-2 py-0.5 rounded">LOW LEVEL</span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {project.architecture.l3}
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 border border-dashed border-white/10 rounded-xl bg-white/2">
                  <p className="text-white/40 text-sm font-mono">Architecture blueprint unavailable.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
