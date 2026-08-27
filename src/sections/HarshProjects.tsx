import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Cpu, ChevronRight, GitCommit, Shield } from 'lucide-react'
import { projects, projectCategories } from '../data/projects'
import { credentials } from '../data/credentials'

export default function HarshProjects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const featured = projects.filter(p => p.featured)
  const nonFeatured = projects.filter(p => !p.featured)
  const filteredNonFeatured = selectedCategory === 'All'
    ? nonFeatured
    : nonFeatured.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="relative py-32 md:py-48">
      <div className="absolute inset-0 bg-surface/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-neon-cyan font-mono text-sm">02</span>
          <div className="w-12 h-[1px] bg-neon-cyan/30" />
          <span className="text-secondary font-mono text-xs tracking-[0.2em] uppercase">Implementation Layer</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 tracking-tight">
            Code_{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-ibm-purple">
              Evidence
            </span>
          </h2>
          <p className="text-secondary font-mono text-sm max-w-2xl">
            <span className="text-neon-cyan">&gt;</span>{' '}
            {projects.length}+ repositories translating credentials into production-oriented systems.
            Each project maps to verified learning and demonstrates applied expertise.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-neon-cyan font-mono text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
            <Cpu size={14} />
            FEATURED_SYSTEMS
          </h3>

          <div className="grid lg:grid-cols-2 gap-6">
            {featured.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.08 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative p-8 glass rounded-lg border border-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-500 overflow-hidden"
              >
                {/* Project number watermark */}
                <div className="absolute top-4 right-4 font-mono text-6xl font-bold text-neon-cyan/10 select-none">
                  {project.number}
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-neon-cyan/50" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-neon-magenta/50" />

                <div className="relative z-10">
                  {/* Category + Year + Tier */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`text-xs font-mono tracking-wider px-2 py-0.5 rounded border ${
                      project.tier === 'A' ? 'bg-tier-a text-tier-a border-[#00FF41]/30' :
                      project.tier === 'B' ? 'bg-tier-b text-tier-b border-[#00F3FF]/30' :
                      'bg-tier-c text-tier-c border-[#FFAA00]/30'
                    }`}>
                      TIER_{project.tier}
                    </span>
                    <span className="text-secondary/30">·</span>
                    <span className="text-neon-cyan text-xs font-mono tracking-wider uppercase">
                      {project.category}
                    </span>
                    <span className="text-secondary/30">·</span>
                    <span className="text-secondary text-xs font-mono">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-primary font-display text-2xl md:text-3xl font-bold mb-2 group-hover:text-neon-cyan transition-colors duration-300 tracking-tight">
                    {project.title}
                  </h4>

                  {/* Tagline */}
                  <p className="text-neon-magenta/80 text-xs font-mono mb-4 tracking-wide">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Trust Metrics */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <GitCommit size={14} className={
                        project.commits > 50 ? 'text-tier-a' :
                        project.commits > 10 ? 'text-tier-b' :
                        'text-tier-c'
                      } />
                      <span className="text-secondary"><strong className="text-primary">{project.commits}</strong> commits</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <Shield size={14} className={
                        project.confidence.includes('90') || project.confidence === 'High' ? 'text-tier-a' :
                        project.confidence.includes('80') || project.confidence.includes('7') ? 'text-tier-b' :
                        'text-tier-c'
                      } />
                      <span className="text-secondary">Conf: <strong className="text-primary">{project.confidence}</strong></span>
                    </div>
                    <div className="w-full text-xs font-mono text-secondary mt-1">
                      Status: <span className="text-primary">{project.status}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="flex gap-6 mb-5 py-4 border-y border-neon-cyan/10">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="text-xs text-secondary/40 font-mono mb-1">{m.label}</div>
                          <div className="text-primary font-mono text-sm">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Credential badges */}
                  <div className="mb-5">
                    <div className="text-xs text-secondary/40 mb-2 font-mono">CREDENTIAL_BASIS:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.credentials.map((credId) => {
                        const cred = credentials.find(c => c.id === credId)
                        if (!cred) return null
                        return (
                          <span
                            key={credId}
                            className="text-xs px-2 py-1 rounded font-mono"
                            style={{
                              borderWidth: 1,
                              borderStyle: 'solid',
                              borderColor: cred.color + '50',
                              color: cred.color,
                              backgroundColor: cred.color + '15',
                            }}
                          >
                            {cred.issuer}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="text-xs text-secondary/60 bg-white/5 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-xs text-secondary/40">+{project.technologies.length - 5}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-secondary hover:text-neon-cyan transition-colors text-sm font-mono"
                      >
                        <Github size={15} />
                        <span>Source</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neon-magenta hover:text-neon-cyan transition-colors text-sm font-mono"
                      >
                        <ExternalLink size={15} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover gradient */}
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-magenta/5 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.replace(/\s/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 rounded ${
                selectedCategory === cat
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                  : 'text-secondary border border-secondary/20 hover:border-neon-cyan/30 hover:text-primary'
              }`}
            >
              {cat === 'All' ? 'ALL_PROJECTS' : cat.toUpperCase().replace(' ', '_')}
            </button>
          ))}
        </div>

        {/* Non-featured project list */}
        <div className="space-y-3">
          {filteredNonFeatured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-5 glass rounded-lg border border-white/5 hover:border-neon-cyan/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-neon-cyan font-mono text-xs">{project.number}</span>
                  <h4 className="text-primary font-medium group-hover:text-neon-cyan transition-colors text-sm">
                    {project.title}
                  </h4>
                  <span className="text-secondary/30 text-xs font-mono hidden md:block">
                    · {project.category}
                  </span>
                  <span className={`text-xs font-mono hidden md:block px-2 py-0.5 rounded border ml-2 ${
                      project.tier === 'A' ? 'bg-tier-a text-tier-a border-[#00FF41]/30' :
                      project.tier === 'B' ? 'bg-tier-b text-tier-b border-[#00F3FF]/30' :
                      'bg-tier-c text-tier-c border-[#FFAA00]/30'
                    }`}>
                      TIER_{project.tier}
                  </span>
                </div>
                <p className="text-secondary/60 text-xs font-mono">{project.tagline}</p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-xs font-mono mr-2">
                  <GitCommit size={14} className="text-secondary/50" />
                  <span className="text-secondary">{project.commits}</span>
                </div>
                <div className="flex gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs text-secondary/50 bg-white/5 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-neon-cyan transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/HarshkumarG007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-magenta transition-colors font-mono text-sm link-underline"
          >
            <span>VIEW_ALL_REPOSITORIES_ON_GITHUB</span>
            <ChevronRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
