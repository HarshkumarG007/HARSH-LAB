import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, ChevronRight } from 'lucide-react'
import { credentials, credentialStats } from '../data/credentials'

type IssuerFilter = 'All' | 'Google' | 'IBM'

export default function Credentials() {
  const [selectedIssuer, setSelectedIssuer] = useState<IssuerFilter>('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = selectedIssuer === 'All'
    ? credentials
    : credentials.filter(c => c.issuer === selectedIssuer)

  return (
    <section id="credentials" className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-neon-cyan font-mono text-sm">01</span>
          <div className="w-12 h-[1px] bg-neon-cyan/30" />
          <span className="text-secondary font-mono text-xs tracking-[0.2em] uppercase">Verified Credentials</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 tracking-tight">
            Credential_{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-ibm-cyan">
              Matrix
            </span>
          </h2>
          <p className="text-secondary text-lg max-w-2xl font-mono text-sm">
            <span className="text-neon-cyan">&gt;</span>{' '}
            {credentialStats.total} verified credentials from Google, Coursera, and IBM SkillsBuild.
            A documented learning trajectory from IT foundations to AI/ML engineering.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 glass rounded-lg border border-google-blue/30 hover:border-google-blue/60 transition-colors"
          >
            <div className="text-google-blue font-mono text-5xl font-bold mb-2">{credentialStats.google}</div>
            <div className="text-primary text-sm font-medium mb-1">Google / Coursera</div>
            <div className="text-secondary/50 text-xs font-mono">Aug – Dec 2024</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 glass rounded-lg border border-ibm-cyan/30 hover:border-ibm-cyan/60 transition-colors"
          >
            <div className="text-ibm-cyan font-mono text-5xl font-bold mb-2">{credentialStats.ibm}</div>
            <div className="text-primary text-sm font-medium mb-1">IBM SkillsBuild</div>
            <div className="text-secondary/50 text-xs font-mono">Jun – Jul 2026</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 glass rounded-lg border border-neon-amber/30 hover:border-neon-amber/60 transition-colors"
          >
            <div className="text-neon-amber font-mono text-5xl font-bold mb-2">1</div>
            <div className="text-primary text-sm font-medium mb-1">IBM SkillsBuild Faculty</div>
            <div className="text-secondary/50 text-xs font-mono">Valid thru Jul 2028</div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {(['All', 'Google', 'IBM'] as const).map((issuer) => (
            <button
              key={issuer}
              id={`filter-${issuer.toLowerCase()}`}
              onClick={() => setSelectedIssuer(issuer)}
              className={`px-5 py-2 font-mono text-xs tracking-wider transition-all duration-300 rounded ${
                selectedIssuer === issuer
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                  : 'text-secondary border border-secondary/20 hover:border-neon-cyan/30 hover:text-primary'
              }`}
            >
              {issuer === 'All' ? 'ALL_CREDENTIALS' : `${issuer.toUpperCase()}_ONLY`}
            </button>
          ))}
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((cred, index) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: Math.min(index * 0.04, 0.4) }}
              onMouseEnter={() => setHoveredId(cred.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative p-6 glass rounded-lg border border-white/5 hover:border-neon-cyan/30 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Colored left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg transition-opacity group-hover:opacity-100 opacity-70"
                style={{ backgroundColor: cred.color }}
              />

              <div className="pl-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span
                      className="text-xs font-mono tracking-wider"
                      style={{ color: cred.issuer === 'Google' ? '#4285F4' : '#00A3E0' }}
                    >
                      {cred.issuer.toUpperCase()} · {cred.category}
                    </span>
                    <h3 className="text-primary text-sm font-medium mt-1 group-hover:text-neon-cyan transition-colors leading-snug">
                      {cred.title}
                    </h3>
                  </div>
                  <Award className="w-5 h-5 text-secondary/30 group-hover:text-neon-cyan transition-colors flex-shrink-0 ml-3 mt-1" />
                </div>

                <div className="text-xs text-secondary/40 font-mono mb-3">{cred.date}</div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cred.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs text-secondary/60 bg-white/5 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                  {cred.skills.length > 3 && (
                    <span className="text-xs text-secondary/40">+{cred.skills.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Hover verify link */}
              {hoveredId === cred.id && cred.credlyUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 right-5"
                >
                  <a
                    href={cred.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-neon-cyan hover:underline font-mono"
                  >
                    Verify <ExternalLink size={11} />
                  </a>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Credly CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.credly.com/users/harshkumarg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-magenta transition-colors font-mono text-sm link-underline"
          >
            <span>VIEW_FULL_CREDLY_PROFILE</span>
            <ChevronRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
