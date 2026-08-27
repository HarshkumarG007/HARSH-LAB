// Evidence-based repository assessment
export const repositoryEvidence = {
  totalCommits: 303,
  totalRepos: 12,
  followers: 1,
  stars: 0,
  auditDate: '27 August 2026',
  overallScore: 8.0,
}

export const evidenceTiers = {
  tierA: {
    label: 'Group A',
    subtitle: 'Strong Historical Implementation',
    description: 'Substantial commit history & repository structure. High confidence in implementation claims.',
    color: '#00FF41', // Matrix green
    repos: ['PRERNA', 'OMNISCIENT', 'MNEMOSYNE', 'LeadGuard'],
  },
  tierB: {
    label: 'Group B',
    subtitle: 'Moderate Historical Evidence',
    description: 'Genuine projects with varying maturity. Scope-aligned with commit count.',
    color: '#00F3FF', // Cyan
    repos: ['PROMETHEUS', 'netflix_recsys', 'Project-Aether', 'COGNIGUARD', 'NOVELia'],
  },
  tierC: {
    label: 'Group C',
    subtitle: 'Architecture-Heavy / Verify',
    description: 'Sophisticated design claims with minimal commit history. Requires demonstration.',
    color: '#FFAA00', // Amber
    repos: ['ChronoScope'],
  },
}

export const commitAnalysis = [
  { repo: 'PRERNA', commits: 159, prs: 10, tier: 'A', confidence: '90%', status: 'Strongest sustained implementation' },
  { repo: 'OMNISCIENT', commits: 31, tier: 'A', confidence: '80%', status: 'Distributed systems + search' },
  { repo: 'MNEMOSYNE', commits: 25, tier: 'A', confidence: '80%', status: 'Forensics + knowledge graphs' },
  { repo: 'LeadGuard', commits: 23, tier: 'A', confidence: '85%', status: 'ML engineering + XGBoost' },
  { repo: 'Project-Aether', commits: 12, tier: 'B', confidence: 'High', status: 'Frontend/3D portfolio' },
  { repo: 'netflix_recsys', commits: 12, tier: 'B', confidence: '90%', status: 'Clean ML pipeline' },
  { repo: 'PROMETHEUS', commits: 11, tier: 'B', confidence: '75%', status: 'Agentic AI architecture' },
  { repo: 'COGNIGUARD', commits: 8, tier: 'B', confidence: '60%', status: 'Sophisticated prototype' },
  { repo: 'NOVELia', commits: 8, tier: 'B', confidence: 'High', status: 'IBM Watsonx integration' },
  { repo: 'Profile README', commits: 7, tier: 'N/A', confidence: 'N/A', status: 'Documentation/branding' },
  { repo: 'AI/ML Template', commits: 4, tier: 'B', confidence: 'High', status: 'Reusable template' },
  { repo: 'ChronoScope', commits: 3, tier: 'C', confidence: '50%', status: 'Architecture exceeds history' },
]

export const competencyScores = [
  { skill: 'AI/ML Fundamentals', score: 8.5, evidence: 'LeadGuard, Netflix Recsys, IBM credentials' },
  { skill: 'Applied ML Engineering', score: 8.0, evidence: 'XGBoost, calibration, evaluation pipelines' },
  { skill: 'Recommendation Systems', score: 8.5, evidence: 'Two-tower, FAISS, ranking, diversity' },
  { skill: 'Generative AI', score: 8.0, evidence: 'PROMETHEUS, LangGraph, local LLMs' },
  { skill: 'NLP', score: 7.5, evidence: 'OMNISCIENT, COGNIGUARD, spaCy, Transformers' },
  { skill: 'Agentic AI', score: 7.5, evidence: 'Multi-agent systems, tool calling' },
  { skill: 'Cybersecurity', score: 7.5, evidence: 'Google cert + security-focused repos' },
  { skill: 'Software Engineering', score: 8.0, evidence: 'Tests, CI/CD, Docker, structure' },
  { skill: 'Frontend', score: 7.0, evidence: 'React, TypeScript, WebGL' },
  { skill: 'Backend/API', score: 7.5, evidence: 'FastAPI, Kafka, Elasticsearch' },
  { skill: 'MLOps', score: 7.0, evidence: 'MLflow, DVC, Docker, evaluation' },
  { skill: 'Technical Education', score: 8.5, evidence: 'IBM Faculty, STEM training' },
  { skill: 'Documentation', score: 9.0, evidence: 'Architecture docs, README quality' },
  { skill: 'Production Evidence', score: 5.5, evidence: 'Local/dev environments primarily' },
]

export const hiringAssessment = {
  level: 'Junior → Strong Intermediate',
  role: 'AI/ML Engineer / AI Application Developer',
  differentiator: 'Formal learning + actual code + sustained history + education',
  caveat: 'Senior-level production engineering not yet evidenced',
  recommendation: 'Verify top 5 repos in technical interview',
}
