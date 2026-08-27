export interface Credential {
  id: string
  title: string
  issuer: 'Google' | 'IBM' | 'Coursera'
  date: string
  category: string
  skills: string[]
  credlyUrl?: string
  color: string
}

export const credentials: Credential[] = [
  // ── Phase 1: Foundation (Aug – Sep 2024) ──────────────────────────────────
  {
    id: 'google-cybersecurity',
    title: 'Google Cybersecurity Professional Certificate V2',
    issuer: 'Google',
    date: 'Aug 31, 2024',
    category: 'Cybersecurity',
    skills: ['Threat Detection', 'Risk Assessment', 'Security Frameworks', 'Network Security'],
    color: '#EA4335',
  },
  {
    id: 'google-ai-essentials',
    title: 'Google AI Essentials V1',
    issuer: 'Google',
    date: 'Sep 1, 2024',
    category: 'AI Fundamentals',
    skills: ['AI Concepts', 'Responsible AI', 'AI Applications'],
    color: '#4285F4',
  },

  // ── Phase 2: Digital Breadth (Oct – Dec 2024) ─────────────────────────────
  {
    id: 'google-ux',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    date: 'Oct 24, 2024',
    category: 'UX/Product',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma'],
    color: '#FBBC05',
  },
  {
    id: 'google-prompting',
    title: 'Google Prompting Essentials V1',
    issuer: 'Google',
    date: 'Nov 20, 2024',
    category: 'Prompt Engineering',
    skills: ['Prompt Design', 'LLM Interaction', 'AI Communication'],
    color: '#34A853',
  },
  {
    id: 'google-python',
    title: 'Google IT Automation with Python',
    issuer: 'Google',
    date: 'Nov 22, 2024',
    category: 'Python/Automation',
    skills: ['Python', 'Git', 'Automation', 'APIs', 'Cloud Services'],
    color: '#4285F4',
  },
  {
    id: 'google-it-support',
    title: 'Google IT Support Professional Certificate V2',
    issuer: 'Google',
    date: 'Nov 22, 2024',
    category: 'IT Systems',
    skills: ['System Administration', 'Networking', 'Security', 'Troubleshooting'],
    color: '#EA4335',
  },
  {
    id: 'google-pm',
    title: 'Google Project Management Professional Certificate V2',
    issuer: 'Google',
    date: 'Nov 26, 2024',
    category: 'Project Management',
    skills: ['Agile', 'Scrum', 'Stakeholder Management', 'Risk Management'],
    color: '#FBBC05',
  },
  {
    id: 'google-marketing',
    title: 'Google Digital Marketing & E-Commerce',
    issuer: 'Google',
    date: 'Nov 27, 2024',
    category: 'Marketing',
    skills: ['SEO', 'Analytics', 'E-commerce', 'Content Strategy'],
    color: '#34A853',
  },
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    date: 'Nov 30, 2024',
    category: 'Data Analytics',
    skills: ['SQL', 'R', 'Tableau', 'Data Visualization', 'Statistics'],
    color: '#4285F4',
  },
  {
    id: 'google-advanced-analytics',
    title: 'Google Advanced Data Analytics Certificate',
    issuer: 'Google',
    date: 'Dec 1, 2024',
    category: 'Advanced Analytics',
    skills: ['Machine Learning', 'Predictive Analytics', 'Regression', 'Classification'],
    color: '#EA4335',
  },
  {
    id: 'google-bi',
    title: 'Google Business Intelligence Certificate',
    issuer: 'Google',
    date: 'Dec 1, 2024',
    category: 'Business Intelligence',
    skills: ['ETL', 'Data Modeling', 'Dashboards', 'Stakeholder Communication'],
    color: '#FBBC05',
  },

  // ── Phase 3: AI/ML Specialization (Jun – Jul 2026) ────────────────────────
  {
    id: 'ibm-ai-fundamentals',
    title: 'AI Fundamentals: Foundations for Understanding AI',
    issuer: 'IBM',
    date: 'Jun 23, 2026',
    category: 'AI Fundamentals',
    skills: ['AI Concepts', 'Neural Networks', 'Deep Learning Basics'],
    color: '#00F3FF',
  },
  {
    id: 'ibm-genai',
    title: 'Getting Started with Generative AI',
    issuer: 'IBM',
    date: 'Jun 27, 2026',
    category: 'Generative AI',
    skills: ['LLMs', 'Prompt Engineering', 'GenAI Applications'],
    color: '#B829DD',
  },
  {
    id: 'ibm-data-ml',
    title: 'Data Analytics for Machine Learning',
    issuer: 'IBM',
    date: 'Jun 29, 2026',
    category: 'ML/Data',
    skills: ['Data Preprocessing', 'Feature Engineering', 'ML Pipelines'],
    color: '#00F3FF',
  },
  {
    id: 'ibm-supervised',
    title: 'Supervised Learning Methods',
    issuer: 'IBM',
    date: 'Jul 2, 2026',
    category: 'Machine Learning',
    skills: ['Classification', 'Regression', 'Model Evaluation', 'XGBoost'],
    color: '#B829DD',
  },
  {
    id: 'ibm-nlp',
    title: 'Natural Language Processing',
    issuer: 'IBM',
    date: 'Jul 3, 2026',
    category: 'NLP',
    skills: ['Text Processing', 'Sentiment Analysis', 'NER', 'Transformers'],
    color: '#00F3FF',
  },
  {
    id: 'ibm-unsupervised',
    title: 'Unsupervised Learning Methods',
    issuer: 'IBM',
    date: 'Jul 4, 2026',
    category: 'Machine Learning',
    skills: ['Clustering', 'Dimensionality Reduction', 'Anomaly Detection'],
    color: '#B829DD',
  },
  {
    id: 'ibm-ai-customer',
    title: 'AI-Enabled Applications for Customer Service',
    issuer: 'IBM',
    date: 'Jul 15, 2026',
    category: 'Applied AI',
    skills: ['Conversational AI', 'Chatbots', 'Customer Experience'],
    color: '#00F3FF',
  },
  {
    id: 'ibm-faculty',
    title: 'IBM SkillsBuild Faculty',
    issuer: 'IBM',
    date: 'Jul 15, 2026',
    category: 'Education',
    skills: ['Curriculum Design', 'Technical Training', 'Mentorship'],
    color: '#FFAA00',
  },
]

export const credentialStats = {
  total: credentials.length,
  google: credentials.filter(c => c.issuer === 'Google').length,
  ibm: credentials.filter(c => c.issuer === 'IBM').length,
  dateRange: 'Aug 2024 – Jul 2026',
  categories: [...new Set(credentials.map(c => c.category))],
}
