import { motion } from 'framer-motion'
import { MessageSquare, HelpCircle, CheckCircle } from 'lucide-react'
import { projects } from '../data/projects'
import SectionLabel from '../components/ui/SectionLabel'

export default function InterviewPrep() {
  const topRepos = projects.filter(p => p.testQuestions && p.testQuestions.length > 0)

  return (
    <section id="interview" className="relative py-32 md:py-48 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel number="04" label="Verification" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 tracking-tight">
            Interview_<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-ibm-purple">Ready</span>
          </h2>
          <p className="text-secondary text-lg max-w-2xl font-mono text-sm">
            <span className="text-neon-cyan">&gt;</span> Technical questions that verify implementation depth.
            Based on due-diligence assessment of top repositories.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {topRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-lg p-6 border border-white/5 hover:border-neon-magenta/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-neon-magenta group-hover:scale-110 transition-transform" />
                  <h3 className="text-primary font-display font-bold text-lg">{repo.title}</h3>
                </div>
                <span className={`text-xs px-3 py-1 rounded font-mono ${
                  repo.tier === 'A' ? 'bg-tier-a text-tier-a border border-[#00FF41]/30' :
                  repo.tier === 'B' ? 'bg-tier-b text-tier-b border border-[#00F3FF]/30' :
                  repo.tier === 'C' ? 'bg-tier-c text-tier-c border border-[#FFAA00]/30' :
                  'bg-secondary/20 text-secondary'
                }`}>
                  TIER_{repo.tier}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {repo.testQuestions?.map((question, qIndex) => (
                  <div key={qIndex} className="flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-lg group-hover:border-neon-magenta/10 transition-colors">
                    <HelpCircle className="w-4 h-4 text-secondary/50 flex-shrink-0 mt-0.5" />
                    <p className="text-secondary text-sm font-mono leading-relaxed">{question}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-secondary/60 font-mono tracking-wide">
                <CheckCircle className="w-4 h-4 text-neon-cyan" />
                <span>VERIFIES: {repo.category.toUpperCase()}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Assessment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 glass rounded-lg border border-matrix-green/30 relative overflow-hidden"
        >
          {/* Accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-matrix-green/5 rounded-full blur-[80px] pointer-events-none" />

          <h3 className="text-matrix-green font-display font-bold text-2xl mb-8 flex items-center gap-3 relative z-10">
            <CheckCircle className="w-6 h-6" />
            Assessment Summary
          </h3>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div>
              <h4 className="text-primary font-mono text-xs uppercase tracking-widest mb-3 opacity-70">Hiring Level</h4>
              <p className="text-secondary text-sm mb-8 font-mono">
                <strong className="text-primary font-bold">Junior → Strong Intermediate</strong><br/>
                AI/ML Engineer
              </p>

              <h4 className="text-primary font-mono text-xs uppercase tracking-widest mb-3 opacity-70">Differentiator</h4>
              <p className="text-secondary text-sm font-mono leading-relaxed">
                Formal learning + actual code + sustained history + education experience
              </p>
            </div>

            <div>
              <h4 className="text-primary font-mono text-xs uppercase tracking-widest mb-3 opacity-70">Verified Strengths</h4>
              <ul className="text-secondary text-sm space-y-3 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green mt-0.5">■</span>
                  <span>PRERNA: 159 commits (sustained development)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green mt-0.5">■</span>
                  <span>LeadGuard: ML engineering best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green mt-0.5">■</span>
                  <span>Netflix Recsys: Clean evaluation pipeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green mt-0.5">■</span>
                  <span>20 verified credentials (Google + IBM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-matrix-green mt-0.5">■</span>
                  <span>IBM SkillsBuild Faculty</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-matrix-green/20 relative z-10">
            <p className="text-secondary text-sm font-mono flex items-start gap-3">
              <span className="text-amber-500 font-bold uppercase tracking-widest shrink-0">Caveat:</span>
              <span>
                Senior-level production engineering not yet evidenced.
                Group C repositories (ChronoScope) require live demonstration. Recommended: Verify top 5 repos in technical interview.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
