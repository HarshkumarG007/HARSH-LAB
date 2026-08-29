import { repositoryEvidence, commitAnalysis, competencyScores } from '../../data/evidence'
import { credentials } from '../../data/credentials'

export default function EvidencePanel() {
  return (
    <section 
      aria-labelledby="evidence-heading" 
      className="max-w-7xl mx-auto px-6 py-24 space-y-24"
    >
      <header>
        <h2 id="evidence-heading" className="text-4xl font-bold tracking-tighter mb-4 text-white">
          Evidence Observatory
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl">
          Verifiable engineering history, replacing subjective skill assertions with qualitative evidence strength tiers.
        </p>
      </header>

      {/* Snapshot / High-Level Metrics */}
      <article aria-labelledby="metrics-heading">
        <h3 id="metrics-heading" className="text-2xl font-semibold mb-6 text-emerald-400 border-b border-white/10 pb-4">
          Audit Snapshot ({repositoryEvidence.auditDate})
        </h3>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <dt className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Total Repos</dt>
            <dd className="text-4xl font-bold text-white">{repositoryEvidence.totalRepos}</dd>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <dt className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Total Commits</dt>
            <dd className="text-4xl font-bold text-white">{repositoryEvidence.totalCommits}</dd>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <dt className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Data Type</dt>
            <dd className="text-lg font-bold text-white">{repositoryEvidence.dataType}</dd>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <dt className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Methodology</dt>
            <dd className="text-sm font-medium text-slate-300 leading-tight">{repositoryEvidence.methodology}</dd>
          </div>
        </dl>
      </article>

      {/* Commit Analysis (Tiers) */}
      <article aria-labelledby="analysis-heading">
        <h3 id="analysis-heading" className="text-2xl font-semibold mb-6 text-fuchsia-400 border-b border-white/10 pb-4">
          Repository Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-sm uppercase tracking-wider">
                <th scope="col" className="pb-4 pr-6 font-semibold">Repository</th>
                <th scope="col" className="pb-4 pr-6 font-semibold">Tier</th>
                <th scope="col" className="pb-4 pr-6 font-semibold">Strength</th>
                <th scope="col" className="pb-4 pr-6 font-semibold">Commits</th>
                <th scope="col" className="pb-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {commitAnalysis.map((item) => (
                <tr key={item.repo} className="text-slate-200">
                  <td className="py-4 pr-6 font-medium text-white">{item.repo}</td>
                  <td className="py-4 pr-6">
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold ${
                      item.tier === 'A' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.tier === 'B' ? 'bg-cyan-500/20 text-cyan-400' :
                      item.tier === 'C' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {item.tier}
                    </span>
                  </td>
                  <td className="py-4 pr-6">{item.evidenceStrength}</td>
                  <td className="py-4 pr-6 font-mono text-slate-400">{item.commits}</td>
                  <td className="py-4 text-slate-400 text-sm">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {/* Verified Credentials */}
      <article aria-labelledby="credentials-heading">
        <h3 id="credentials-heading" className="text-2xl font-semibold mb-6 text-blue-400 border-b border-white/10 pb-4">
          Verified Credentials ({credentials.length})
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred) => (
            <li key={cred.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cred.color }}>
                  {cred.issuer}
                </span>
                <time className="text-xs text-slate-500">{cred.date}</time>
              </div>
              <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                {cred.title}
              </h4>
              <p className="text-sm text-slate-400 mb-4">
                {cred.category}
              </p>
              {cred.credlyUrl ? (
                <a 
                  href={cred.credlyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4"
                  aria-label={`Verify ${cred.title} credential externally`}
                >
                  Verify Credential
                </a>
              ) : (
                <span className="text-sm text-emerald-400 font-medium">Verified by Issuer</span>
              )}
            </li>
          ))}
        </ul>
      </article>

      {/* Competency Scores */}
      <article aria-labelledby="competency-heading">
        <h3 id="competency-heading" className="text-2xl font-semibold mb-6 text-amber-400 border-b border-white/10 pb-4">
          Competency Assessment
        </h3>
        <ul className="space-y-4">
          {competencyScores.map((score) => (
            <li key={score.skill} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 bg-white/5 p-4 rounded-xl">
              <span className="font-bold text-white min-w-[220px]">{score.skill}</span>
              <div className="flex items-center gap-4 flex-1">
                <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full" 
                    style={{ width: `${(score.score / 10) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={score.score}
                    aria-valuemin={0}
                    aria-valuemax={10}
                    aria-label={`${score.skill} score`}
                  />
                </div>
                <span className="text-sm font-mono text-slate-400 w-8">{score.score}</span>
              </div>
              <span className="text-sm text-slate-400 md:w-1/3 italic">
                Evidenced by: {score.evidence}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}
