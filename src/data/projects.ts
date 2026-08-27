export interface Project {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  technologies: string[]
  commits: number
  tier: 'A' | 'B' | 'C'
  confidence: string
  status: string
  category: string
  year: string
  github: string
  demo?: string
  featured: boolean
  metrics?: { label: string; value: string }[]
  testQuestions?: string[]
  credentials: string[]
  architecture?: {
    l1: string
    l2: string
    l3: string
  }
}

export const projects: Project[] = [
  // TIER A: Strong Historical Implementation
  {
    id: 'prerna',
    number: '01',
    title: 'PRERNA',
    tagline: 'Local-First Adolescent Wellbeing Platform',
    description: '159 commits, 10 PRs. React + Rust/Tauri + encrypted local storage + optional LLM. Strongest sustained implementation in portfolio.',
    technologies: ['React', 'TypeScript', 'Rust', 'Tauri', 'LLM', 'Encryption'],
    commits: 159,
    tier: 'A',
    confidence: '90%',
    status: 'Strongest sustained implementation',
    category: 'Full Stack AI',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/PRERNA',
    featured: true,
    metrics: [
      { label: 'Commits', value: '159' },
      { label: 'PRs', value: '10' },
      { label: 'Architecture', value: 'React→Tauri→Rust→LLM' },
    ],
    testQuestions: [
      'What happens if React renderer sends forged user ID?',
      'How does Tauri IPC maintain security boundaries?',
    ],
    credentials: ['ibm-nlp', 'ibm-ai-customer', 'google-ux'],
    architecture: {
      l1: 'Local-First Desktop Application',
      l2: 'React/Vite Frontend → Tauri IPC → Rust Backend → SQLite',
      l3: 'Implements AES-256 encryption at rest, strict IPC boundary validation, and a quantized local LLM for offline processing.',
    },
  },
  {
    id: 'omniscient',
    number: '02',
    title: 'OMNISCIENT',
    tagline: 'Unified Search & Threat Intelligence',
    description: '31 commits. FastAPI + Kafka + Elasticsearch + Qdrant + OAuth2. Distributed systems with permission enforcement.',
    technologies: ['FastAPI', 'Kafka', 'Elasticsearch', 'Qdrant', 'React', 'OAuth2'],
    commits: 31,
    tier: 'A',
    confidence: '80%',
    status: 'Distributed systems + search',
    category: 'AI Security',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/OMNISCIENT',
    featured: true,
    metrics: [
      { label: 'Commits', value: '31' },
      { label: 'Search', value: 'Hybrid Semantic' },
      { label: 'Auth', value: 'Permission Boundaries' },
    ],
    testQuestions: [
      'How do you enforce permission boundaries across heterogeneous data sources?',
      'Explain retrieval vs ranking in your architecture.',
    ],
    credentials: ['google-cybersecurity', 'ibm-nlp'],
    architecture: {
      l1: 'Distributed Search Infrastructure',
      l2: 'FastAPI → Kafka Queue → Workers → Elasticsearch (BM25) + Qdrant (Vectors)',
      l3: 'OAuth2 permission boundaries enforced at the query level using post-filtering and tenant ID indexing.',
    },
  },
  {
    id: 'mnemosyne',
    number: '03',
    title: 'MNEMOSYNE',
    tagline: 'Autonomous Digital Forensics Platform',
    description: '25 commits. Multi-agent AI + temporal knowledge graphs + evidence provenance. Tests, CI, dependency management.',
    technologies: ['Python', 'Neo4j', 'Agents', 'Knowledge Graphs', 'Forensics'],
    commits: 25,
    tier: 'A',
    confidence: '80%',
    status: 'Forensics + knowledge graphs',
    category: 'AI Security',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/MNEMOSYNE',
    featured: true,
    metrics: [
      { label: 'Commits', value: '25' },
      { label: 'Graph DB', value: 'Neo4j' },
      { label: 'Testing', value: 'pytest + CI' },
    ],
    testQuestions: [
      'How do you reconstruct temporal knowledge graphs from artifacts?',
      'Explain chain-of-custody preservation.',
    ],
    credentials: ['ibm-unsupervised', 'ibm-nlp'],
    architecture: {
      l1: 'Event-Driven Knowledge Graph',
      l2: 'Data Ingestion (Python) → Agent Network → Neo4j Graph Database',
      l3: 'Uses temporal PageRank to identify threat clusters; enforces strict chain-of-custody cryptographic hashing on all artifacts.',
    },
  },
  {
    id: 'leadguard',
    number: '04',
    title: 'LEADGUARD',
    tagline: 'ML Engineering for Lead Service Lines',
    description: '23 commits. XGBoost + calibration + uncertainty + fairness. Deliberate engineering: src/ + tests/ + contracts/ + api/ + configs/.',
    technologies: ['Python', 'XGBoost', 'Scikit-learn', 'MLflow', 'Docker'],
    commits: 23,
    tier: 'A',
    confidence: '85%',
    status: 'ML engineering + XGBoost',
    category: 'ML Engineering',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/LeadGuard',
    featured: true,
    metrics: [
      { label: 'Commits', value: '23' },
      { label: 'Model', value: 'XGBoost + Calibration' },
      { label: 'Structure', value: 'Engineering-grade' },
    ],
    testQuestions: [
      'How do you prevent temporal leakage?',
      'What does calibration tell you that ROC-AUC does not?',
    ],
    credentials: ['google-advanced-analytics', 'ibm-supervised'],
    architecture: {
      l1: 'ML Training & Inference Pipeline',
      l2: 'Raw Data → Scikit-learn Pipeline → XGBoost → MLflow Tracking → Docker API',
      l3: 'Focuses on uncertainty calibration (Platt scaling) and fairness constraints, rejecting uncalibrated probability scores.',
    },
  },

  // TIER B: Moderate Historical Evidence
  {
    id: 'netflix-recsys',
    number: '05',
    title: 'NETFLIX RECSYS',
    tagline: 'Two-Tower Retrieval + Ranking',
    description: '12 commits. PyTorch two-tower, FAISS, XGBoost LTR, MMR diversity. Cleanest ML pipeline in portfolio.',
    technologies: ['PyTorch', 'FAISS', 'XGBoost', 'Streamlit', 'Docker'],
    commits: 12,
    tier: 'B',
    confidence: '90%',
    status: 'Clean ML pipeline',
    category: 'ML Engineering',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/netflix_recsys',
    featured: true,
    metrics: [
      { label: 'Commits', value: '12' },
      { label: 'Retrieval', value: 'Two-Tower + FAISS' },
      { label: 'Ranking', value: 'XGBoost LTR' },
    ],
    testQuestions: [
      'Why not use two-tower to rank final 10?',
      'Explain cold-start handling.',
    ],
    credentials: ['google-advanced-analytics', 'ibm-supervised'],
    architecture: {
      l1: 'Two-Stage Recommender System',
      l2: 'User/Item Embeddings → FAISS (Retrieval) → XGBoost (Ranking)',
      l3: 'PyTorch-based two-tower model with hard negative mining. Final ranking uses Maximal Marginal Relevance (MMR) for diversity.',
    },
  },
  {
    id: 'project-aether',
    number: '06',
    title: 'PROJECT AETHER',
    tagline: '3D Portfolio / Immersive UI',
    description: '12 commits. Vite + WebGL + 3D. Manageable scope, high implementation confidence. Genuine frontend project.',
    technologies: ['React', 'Three.js', 'WebGL', 'Vite', 'GSAP'],
    commits: 12,
    tier: 'B',
    confidence: 'High',
    status: 'Frontend implementation',
    category: 'Frontend',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/Project-Aether',
    demo: 'https://aether-portfolio.vercel.app',
    featured: false,
    credentials: ['google-ux', 'google-python'],
  },
  {
    id: 'prometheus',
    number: '07',
    title: 'PROMETHEUS',
    tagline: 'Agentic AI with Tool Calling',
    description: '11 commits. Local LLM + LangGraph + tool registry + confirmation queue. Scope ambitious for commit count.',
    technologies: ['Python', 'LangGraph', 'Ollama', 'FastAPI', 'Next.js'],
    commits: 11,
    tier: 'B',
    confidence: '75%',
    status: 'Agentic AI architecture',
    category: 'GenAI',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/PROMETHEUS',
    featured: true,
    testQuestions: [
      'How does tool registry validate actions?',
      'Explain confirmation queue security.',
    ],
    credentials: ['ibm-genai', 'google-prompting', 'ibm-ai-customer'],
    architecture: {
      l1: 'Agentic Tool-Calling System',
      l2: 'User Input → LangGraph Orchestrator → LLM Node → Tool Executor → Confirmation Queue',
      l3: 'Implements human-in-the-loop (HITL) interrupt states in LangGraph to prevent destructive tool calls (rm, drop db). Tools are strictly typed using Pydantic.',
    },
  },
  {
    id: 'cogniguard',
    number: '08',
    title: 'COGNIGUARD',
    tagline: 'Neuro-Symbolic Compliance Platform',
    description: '8 commits. LLM + Neo4j for GDPR/SOC2. Sophisticated README, evaluation pipeline. Prototype-level history.',
    technologies: ['Python', 'Neo4j', 'LLM', 'Next.js', 'Docker'],
    commits: 8,
    tier: 'B',
    confidence: '60%',
    status: 'Sophisticated prototype',
    category: 'AI Security',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/COGNIGUARD',
    featured: false,
    metrics: [
      { label: 'Reported F1', value: '88.3%' },
      { label: 'Graph', value: 'Neo4j' },
      { label: 'Scope', value: 'Ambitious' },
    ],
    credentials: ['ibm-nlp', 'google-cybersecurity'],
  },
  {
    id: 'novelia',
    number: '09',
    title: 'NOVELIA',
    tagline: 'IBM Watsonx Chatbot (PBEL)',
    description: '8 commits. IBM Watsonx Assistant integration. Small scope, high confidence for stated purpose.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'IBM Watsonx'],
    commits: 8,
    tier: 'B',
    confidence: 'High',
    status: 'IBM project delivery',
    category: 'NLP',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/PBEL-NOVELia-AI-chatbot',
    featured: false,
    credentials: ['ibm-nlp', 'ibm-genai'],
  },
  {
    id: 'ai-ml-template',
    number: '10',
    title: 'AI/ML Portfolio Template',
    tagline: 'Reusable Project Template',
    description: '4 commits. Explicit template. Demonstrates ML project organization conventions.',
    technologies: ['Python', 'Cookiecutter', 'Makefile', 'pytest'],
    commits: 4,
    tier: 'B',
    confidence: 'High',
    status: 'Template by design',
    category: 'Template',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/ai-ml-portfolio-template',
    featured: false,
    credentials: [],
  },

  // TIER C: Architecture-Heavy / Verify
  {
    id: 'chronoscope',
    number: '11',
    title: 'CHRONOSCOPE',
    tagline: 'Temporal Forensics Platform',
    description: '3 commits. Multi-agent + chain-of-custody + media manipulation detection. Architecture claims exceed history.',
    technologies: ['Python', 'Multi-agent', 'Deepfake Detection', 'GPU', 'Docker'],
    commits: 3,
    tier: 'C',
    confidence: '50%',
    status: 'Verify in interview',
    category: 'AI Security',
    year: '2026',
    github: 'https://github.com/HarshkumarG007/ChronoScope',
    featured: false,
    testQuestions: [
      'Start from clean machine: artifact → evidence → graph → finding workflow.',
    ],
    credentials: ['google-cybersecurity', 'google-data-analytics'],
  },
]

// Derived from actual project data — never manually maintained
export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map(p => p.category))).sort(),
]

// Legacy exports for any components still referencing old shape
export const experiments = [
  {
    id: 'exp-1',
    title: 'WebGL Shader Lab',
    category: 'Creative Coding',
    description: 'Procedural GLSL shaders with custom post-processing and interactive parameters.',
  },
  {
    id: 'exp-2',
    title: 'Neural Style Transfer',
    category: 'ML Art',
    description: 'Real-time artistic style transfer using CNN feature extraction and optimization.',
  },
  {
    id: 'exp-3',
    title: 'OSINT Dashboard',
    category: 'Security Tools',
    description: 'Open-source intelligence aggregation with automated threat feeds and visualization.',
  },
  {
    id: 'exp-4',
    title: 'Generative Music',
    category: 'Creative AI',
    description: 'Algorithmic music generation using Markov chains and ML-based composition.',
  },
]
