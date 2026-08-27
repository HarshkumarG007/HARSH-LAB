import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import MetalCard from '../components/MetalCard'

const filters = ['All', 'Tier A', 'Tier B', 'Tier C']

export default function PremiumProjects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => `Tier ${p.tier}` === activeFilter)

  const featured = projects.filter(p => p.tier === 'A').slice(0, 2)

  return (
    <section id="projects" className="relative py-32 material-projects">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="badge-premium mb-4">Selected Work</span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-gradient-primary mb-4">
            Projects
          </h2>
          <p className="text-text-secondary max-w-xl">
            Implementation evidence grouped by confidence tier. 
            From sustained development to architectural prototypes.
          </p>
        </motion.div>

        {/* Featured Projects (Large Cards) */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MetalCard metal="rose-gold" texture="brushed" className="h-full group">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-rose-400 text-xs font-mono font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="badge-tier-a text-xs px-3 py-1 rounded-full">
                    Tier {project.tier}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-semibold text-text-primary mb-2 group-hover:text-rose-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-text-secondary text-sm mb-4">
                  {project.tagline}
                </p>

                <p className="text-text-tertiary text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-display font-semibold text-text-primary">
                      {project.commits}
                    </div>
                    <div className="text-text-tertiary text-xs">Commits</div>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-semibold text-text-primary">
                      {project.confidence}
                    </div>
                    <div className="text-text-tertiary text-xs">Evidence Strength</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-text-tertiary text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <a 
                    href={project.github}
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Github size={16} />
                    Source
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo}
                      className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </MetalCard>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.filter(p => !p.featured).map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <MetalCard metal="chrome" texture="brushed" className="h-full group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-medium uppercase text-text-secondary">
                      {project.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      project.tier === 'A' ? 'badge-tier-a' :
                      project.tier === 'B' ? 'badge-tier-b' : 'badge-tier-c'
                    }`}>
                      {project.commits}
                    </span>
                  </div>

                  <h4 className="text-lg font-display font-medium text-text-primary mb-2 group-hover:text-chrome-shine transition-colors">
                    {project.title}
                  </h4>
                  
                  <p className="text-text-tertiary text-sm mb-4 line-clamp-2">
                    {project.tagline}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="w-2 h-2 rounded-full bg-white/20" title={tech} />
                      ))}
                    </div>
                    <a 
                      href={project.github}
                      className="text-text-muted hover:text-text-primary transition-colors"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </MetalCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
