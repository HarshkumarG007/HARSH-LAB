import { motion } from 'framer-motion'
import { GitCommit, Shield, AlertCircle, CheckCircle2 } from 'lucide-react'
import { commitAnalysis, repositoryEvidence } from '../data/evidence'
import MetalCard from '../components/MetalCard'
import Gemstone from '../components/Gemstone'

const tierConfig = {
  A: { color: 'emerald', icon: CheckCircle2, label: 'Strong Evidence' },
  B: { color: 'indigo', icon: Shield, label: 'Moderate Evidence' },
  C: { color: 'amber', icon: AlertCircle, label: 'Verify' },
}

export default function PremiumEvidence() {
  return (
    <section id="evidence" className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-premium mb-4">Radical Transparency</span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-gradient-primary mb-4">
            Evidence-Based Assessment
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            No README inflation. Observable commit history. Grouped by implementation confidence.
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Commits', value: repositoryEvidence.totalCommits, color: 'accent' },
            { label: 'Repositories', value: repositoryEvidence.totalRepos, color: 'accent' },
            { label: 'Overall Score', value: `${repositoryEvidence.overallScore}/10`, color: 'gold' },
            { label: 'Audit Date', value: repositoryEvidence.auditDate, color: 'rose' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MetalCard
                metal={stat.color === 'gold' ? 'gold' : stat.color === 'rose' ? 'rose-gold' : 'platinum'}
                texture="polished"
                className="h-full"
                interactive={false}
              >
                <div className={`text-3xl font-display font-semibold mb-2 ${
                  stat.color === 'gold' ? 'text-gold-base' : 
                  stat.color === 'rose' ? 'text-rose-gold-base' : 'text-platinum-shine'
                }`}>
                  {stat.value}
                </div>
                <div className="text-text-tertiary text-sm">{stat.label}</div>
              </MetalCard>
            </motion.div>
          ))}
        </div>

        {/* Repository Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-premium overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <GitCommit size={20} className="text-accent" />
              Repository Analysis
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-text-tertiary text-xs uppercase tracking-wider border-b border-border">
                  <th className="text-left p-4 font-medium">Repository</th>
                  <th className="text-center p-4 font-medium">Commits</th>
                  <th className="text-center p-4 font-medium">Tier</th>
                  <th className="text-left p-4 font-medium">Assessment</th>
                </tr>
              </thead>
              <tbody>
                {commitAnalysis.map((repo, index) => {
                  const tier = tierConfig[repo.tier as keyof typeof tierConfig]
                  // Fallback for 'N/A' tier
                  const TierIcon = tier?.icon || AlertCircle
                  
                  return (
                    <motion.tr
                      key={repo.repo}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-medium text-text-primary">{repo.repo}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center justify-center w-10 h-6 rounded-full text-xs font-mono font-medium ${
                          repo.commits > 50 ? 'bg-emerald/10 text-emerald' :
                          repo.commits > 10 ? 'bg-accent/10 text-accent-light' :
                          repo.commits > 5 ? 'bg-amber/10 text-amber' :
                          'bg-rose/10 text-rose'
                        }`}>
                          {repo.commits}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          repo.tier === 'A' ? 'badge-tier-a' :
                          repo.tier === 'B' ? 'badge-tier-b' :
                          repo.tier === 'C' ? 'badge-tier-c' :
                          'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        }`}>
                          {repo.tier === 'A' && <Gemstone type="diamond" size="sm" />}
                          {repo.tier === 'B' && <Gemstone type="sapphire" size="sm" />}
                          {repo.tier === 'C' && <Gemstone type="emerald" size="sm" />}
                          {!['A', 'B', 'C'].includes(repo.tier) && <TierIcon size={12} />}
                          Tier {repo.tier}
                        </span>
                      </td>
                      <td className="p-4 text-text-secondary text-sm">
                        {repo.status}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {Object.entries(tierConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-sm text-text-tertiary">
              <span className={`w-2 h-2 rounded-full ${
                key === 'A' ? 'bg-emerald' :
                key === 'B' ? 'bg-accent' : 'bg-amber'
              }`} />
              <span>Tier {key}: {config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
