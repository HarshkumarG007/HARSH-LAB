import { projects } from '../../data/projects'
import EvidencePanel from '../evidence/EvidencePanel'
import { LayerId } from '../types'

const systemLayers: { id: LayerId, title: string, description: string }[] = [
  { id: 'DATA', title: 'Data Layer', description: 'Raw ingestion, streaming, and offline batch processing pipelines.' },
  { id: 'MODELS', title: 'Models Layer', description: 'Core LLMs, embedders, and traditional ML weights.' },
  { id: 'RETRIEVAL', title: 'Retrieval Layer', description: 'Vector stores, hybrid search, and ranking heuristics.' },
  { id: 'REASONING', title: 'Reasoning Layer', description: 'Agentic loops, chain-of-thought, and routing logic.' },
  { id: 'TOOLS', title: 'Tools Layer', description: 'External API integrations, executors, and sandbox environments.' },
  { id: 'SECURITY', title: 'Security Layer', description: 'Guardrails, PII redaction, and prompt injection defense.' },
  { id: 'INTERFACES', title: 'Interfaces Layer', description: 'Client-facing UI, conversational agents, and API gateways.' },
  { id: 'EVALUATION', title: 'Evaluation Layer', description: 'Metrics, offline eval pipelines, and telemetry.' },
]

export default function SystemStaticFallback() {
  return (
    <main className="min-h-screen bg-transparent text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* 1. Header / Initializing */}
      <header className="max-w-7xl mx-auto px-6 pt-32 pb-24 border-b border-white/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">System Initializing</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-tight">
          SYSTEM 01
          <span className="block text-slate-500">Deconstruct & Reassemble</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed">
          This is an architecture-first portfolio. The visual components you see are not arbitrary; they directly represent the distinct engineering layers, models, and evidence that form the foundation of my work.
        </p>
      </header>

      {/* 2. Anatomy Labels */}
      <section aria-labelledby="anatomy-heading" className="max-w-7xl mx-auto px-6 py-24 border-b border-white/10">
        <h2 id="anatomy-heading" className="text-3xl font-bold tracking-tighter mb-12 text-white">
          System Anatomy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemLayers.map(layer => (
            <article key={layer.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">{layer.title}</h3>
              <p className="text-sm text-slate-400">{layer.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Projects */}
      <section aria-labelledby="projects-heading" className="max-w-7xl mx-auto px-6 py-24 border-b border-white/10">
        <h2 id="projects-heading" className="text-3xl font-bold tracking-tighter mb-12 text-white">
          Project Assembly
        </h2>
        <div className="space-y-12">
          {projects.map(project => (
            <article 
              key={project.id} 
              className={`p-8 rounded-3xl border transition-all ${
                project.featured 
                  ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-indigo-400">{project.number}</span>
                    {project.featured && (
                      <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xl text-slate-300">{project.tagline}</p>
                </div>
                
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors"
                  >
                    View Repository
                  </a>
                )}
              </div>
              
              <p className="text-slate-400 max-w-4xl mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>

              {project.architecture && (
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Architecture</h4>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs text-slate-500 uppercase tracking-wider">L1 - Concept</dt>
                      <dd className="text-white mt-1">{project.architecture.l1}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500 uppercase tracking-wider">L2 - Pipeline</dt>
                      <dd className="text-slate-300 font-mono text-sm mt-1">{project.architecture.l2}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500 uppercase tracking-wider">L3 - Details</dt>
                      <dd className="text-slate-400 text-sm mt-1">{project.architecture.l3}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* 4. Evidence */}
      <EvidencePanel />

      {/* 5. Footer / Reassembly */}
      <footer className="max-w-7xl mx-auto px-6 py-32 text-center border-t border-white/10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
          System Reassembled
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          Every component verified. Every claim backed by data.
        </p>
        <a 
          href="mailto:contact@example.com" 
          className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-colors text-lg"
        >
          Initialize Contact
        </a>
      </footer>
    </main>
  )
}
