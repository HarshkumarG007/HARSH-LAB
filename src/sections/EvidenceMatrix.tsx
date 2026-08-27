import { motion } from 'framer-motion'
import { GitCommit, GitBranch, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { repositoryEvidence, commitAnalysis, evidenceTiers } from '../data/evidence'
import SectionLabel from '../components/ui/SectionLabel'

export default function EvidenceMatrix() {
  return (
    <section id="evidence" className="relative py-32 md:py-48 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel number="01" label="Due Diligence" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 tracking-tight">
            Evidence_<span className="text-matrix-green">Based</span>
          </h2>
          <p className="text-secondary text-lg max-w-3xl font-mono text-sm">
            <span className="text-neon-cyan">&gt;</span> Radical transparency: {repositoryEvidence.totalCommits} commits across {repositoryEvidence.totalRepos} repositories.
            Grouped by implementation confidence. No README inflation. Observable evidence only.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <div className="p-6 glass rounded-lg border border-matrix-green/30">
            <GitCommit className="w-6 h-6 text-matrix-green mb-2" />
            <div className="text-3xl font-bold font-mono text-matrix-green">{repositoryEvidence.totalCommits}</div>
            <div className="text-xs text-secondary font-mono tracking-wider">TOTAL_COMMITS</div>
          </div>
          <div className="p-6 glass rounded-lg border border-neon-cyan/30">
            <GitBranch className="w-6 h-6 text-neon-cyan mb-2" />
            <div className="text-3xl font-bold font-mono text-neon-cyan">{repositoryEvidence.totalRepos}</div>
            <div className="text-xs text-secondary font-mono tracking-wider">REPOSITORIES</div>
          </div>
          <div className="p-6 glass rounded-lg border border-amber-500/30">
            <Shield className="w-6 h-6 text-amber-500 mb-2" />
            <div className="text-3xl font-bold font-mono text-amber-500">{repositoryEvidence.overallScore}</div>
            <div className="text-xs text-secondary font-mono tracking-wider">OVERALL_SCORE_/10</div>
          </div>
          <div className="p-6 glass rounded-lg border border-neon-magenta/30">
            <CheckCircle className="w-6 h-6 text-neon-magenta mb-2" />
            <div className="text-3xl font-bold font-mono text-neon-magenta">3</div>
            <div className="text-xs text-secondary font-mono tracking-wider">EVIDENCE_TIERS</div>
          </div>
        </motion.div>

        {/* Evidence Tiers */}
        <div className="space-y-6 mb-16">
          {Object.entries(evidenceTiers).map(([key, tier], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-lg p-6 border-l-4"
              style={{ borderLeftColor: tier.color }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-background flex-shrink-0"
                  style={{ backgroundColor: tier.color }}
                >
                  {key.replace('tier', '')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-1 tracking-tight" style={{ color: tier.color }}>
                    {tier.label}: {tier.subtitle}
                  </h3>
                  <p className="text-secondary text-sm mb-4 font-mono">{tier.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.repos.map((repo) => (
                      <span
                        key={repo}
                        className="text-xs px-3 py-1 rounded font-mono"
                        style={{
                          backgroundColor: tier.color + '15',
                          color: tier.color,
                          border: `1px solid ${tier.color}40`,
                        }}
                      >
                        {repo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commit Analysis Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-lg overflow-hidden border border-white/5"
        >
          <div className="p-6 border-b border-white/5 bg-white/5">
            <h3 className="text-primary font-medium flex items-center gap-2 font-mono text-sm tracking-wider">
              <GitCommit size={18} className="text-neon-cyan" />
              COMMIT_ANALYSIS_LOG
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-secondary/50 text-xs uppercase tracking-wider border-b border-white/5 font-mono">
                  <th className="text-left p-4">Repository</th>
                  <th className="text-center p-4">Commits</th>
                  <th className="text-center p-4">Tier</th>
                  <th className="text-center p-4">Confidence</th>
                  <th className="text-left p-4 min-w-[200px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {commitAnalysis.map((repo, index) => (
                  <motion.tr
                    key={repo.repo}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 font-mono text-primary font-medium">{repo.repo}</td>
                    <td className="p-4 text-center">
                      <span className={`font-mono font-bold ${
                        repo.commits > 50 ? 'commits-high' :
                        repo.commits > 10 ? 'commits-medium' :
                        repo.commits > 5 ? 'commits-low' :
                        'commits-critical'
                      }`}>
                        {repo.commits}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded font-mono ${
                        repo.tier === 'A' ? 'bg-tier-a text-tier-a border border-[#00FF41]/30' :
                        repo.tier === 'B' ? 'bg-tier-b text-tier-b border border-[#00F3FF]/30' :
                        repo.tier === 'C' ? 'bg-tier-c text-tier-c border border-[#FFAA00]/30' :
                        'bg-secondary/20 text-secondary border border-secondary/30'
                      }`}>
                        {repo.tier}
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono text-secondary text-xs">{repo.evidenceStrength}</td>
                    <td className="p-4 text-secondary/80 text-xs font-mono">{repo.status}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Transparency Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 glass rounded-lg border border-amber-500/30 bg-amber-500/5 relative overflow-hidden"
        >
          {/* Subtle warning stripes background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
               style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FFAA00 0, #FFAA00 10px, transparent 10px, transparent 20px)' }} />

          <div className="flex items-start gap-4 relative z-10">
            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-500 font-bold mb-2 font-mono tracking-wide uppercase">Radical Transparency Notice</h4>
              <p className="text-secondary text-sm leading-relaxed font-mono">
                This portfolio acknowledges that <strong className="text-primary font-medium">ChronoScope (3 commits)</strong> has architecture claims
                exceeding its development history. Group C repositories require live demonstration.
                No production deployment is claimed for any repository. All metrics are repository-reported,
                not independently verified. See{' '}
                <a
                  href="https://github.com/HarshkumarG007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-cyan hover:text-neon-magenta transition-colors underline decoration-neon-cyan/50 underline-offset-4"
                >
                  live GitHub profile
                </a>{' '}
                for source evidence.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
