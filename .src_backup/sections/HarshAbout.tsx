import { motion } from 'framer-motion'
import { Terminal, Shield, Brain, GraduationCap } from 'lucide-react'

const phases = [
  {
    period: 'Aug - Sep 2024',
    title: 'Foundation Phase',
    icon: Terminal,
    color: 'text-google-green',
    borderColor: 'border-google-green/30',
    bgColor: 'bg-google-green',
    description: 'Built IT fundamentals through Google Cybersecurity and AI Essentials. Established Python and automation capabilities.',
    credentials: ['Google Cybersecurity', 'Google AI Essentials'],
  },
  {
    period: 'Oct - Dec 2024',
    title: 'Digital Breadth',
    icon: Shield,
    color: 'text-google-blue',
    borderColor: 'border-google-blue/30',
    bgColor: 'bg-google-blue',
    description: 'Expanded across UX Design, Data Analytics, Project Management, and Business Intelligence. Broad technical foundation.',
    credentials: ['Google UX Design', 'Google Data Analytics', 'Google Advanced DA', 'Google BI', 'Google PM'],
  },
  {
    period: 'Jun - Jul 2026',
    title: 'AI/ML Specialization',
    icon: Brain,
    color: 'text-ibm-cyan',
    borderColor: 'border-ibm-cyan/30',
    bgColor: 'bg-ibm-cyan',
    description: 'Intensive IBM SkillsBuild training in ML, NLP, GenAI, and applied AI. Immediate implementation through 12+ repositories.',
    credentials: ['IBM Supervised ML', 'IBM NLP', 'IBM GenAI', 'IBM Unsupervised ML'],
  },
  {
    period: 'Jul 2026 - Present',
    title: 'Educator & Engineer',
    icon: GraduationCap,
    color: 'text-amber-500',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500',
    description: 'IBM SkillsBuild Faculty credential. Combining hands-on AI engineering with STEM education and mentorship.',
    credentials: ['IBM SkillsBuild Faculty'],
  },
]

export default function HarshAbout() {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-neon-cyan font-mono text-sm">03</span>
          <div className="w-12 h-[1px] bg-neon-cyan/30" />
          <span className="text-secondary font-mono text-xs tracking-[0.2em] uppercase">Learning Trajectory</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 tracking-tight">
            Three_Layer_{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-google-blue">
              Evidence
            </span>
          </h2>
          <p className="text-secondary text-lg max-w-3xl font-mono text-sm">
            <span className="text-neon-cyan">&gt;</span> A documented progression from IT foundations to AI/ML engineering,
            supported by 20 verified credentials, 12 implementation repositories,
            and IBM-authorized education delivery.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Main vertical line (desktop) */}
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-google-green via-google-blue to-ibm-cyan hidden md:block opacity-30" />

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.period}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-0 md:pl-20"
              >
                {/* Timeline node */}
                <div className={`absolute left-6 top-6 w-4 h-4 rounded-full border-2 border-background hidden md:block ${phase.bgColor} shadow-[0_0_10px_currentColor]`} style={{ color: 'transparent', boxShadow: `0 0 10px var(--tw-colors-${phase.bgColor.split('-')[1]}-${phase.bgColor.split('-')[2] || 'DEFAULT'})` }} />

                <div className={`glass rounded-lg p-6 md:p-8 border hover:border-neon-cyan/40 transition-all duration-300 ${phase.borderColor}`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon Box */}
                    <div className={`p-4 rounded-lg bg-white/5 ${phase.color} flex-shrink-0`}>
                      <phase.icon size={24} />
                    </div>

                    <div className="flex-1">
                      {/* Period */}
                      <div className="font-mono text-xs text-secondary/50 mb-2 tracking-wider">
                        {phase.period}
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl md:text-2xl font-bold mb-3 ${phase.color} font-display tracking-tight`}>
                        {phase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-secondary text-sm leading-relaxed mb-5 font-mono">
                        {phase.description}
                      </p>

                      {/* Credentials Tags */}
                      <div className="flex flex-wrap gap-2">
                        {phase.credentials.map((cred) => (
                          <span key={cred} className="text-xs text-secondary/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-mono">
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { label: 'Credentials', value: '20', color: 'text-neon-cyan' },
            { label: 'Repositories', value: '12+', color: 'text-neon-magenta' },
            { label: 'Learning Hours', value: '1000+', color: 'text-google-blue' },
            { label: 'Faculty Status', value: 'IBM', color: 'text-amber-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 glass rounded-lg border border-white/5 hover:border-neon-cyan/20 transition-colors"
            >
              <div className={`text-3xl md:text-4xl font-bold font-mono ${stat.color} mb-2 drop-shadow-md`}>
                {stat.value}
              </div>
              <div className="text-secondary text-xs tracking-wider uppercase font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-primary font-mono text-sm tracking-wider uppercase mb-8 flex items-center gap-3">
            <Terminal size={18} className="text-neon-cyan" />
            Core_Competencies
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: 'AI/ML', skills: ['Python', 'PyTorch', 'XGBoost', 'Scikit-learn', 'LangGraph', 'Transformers'], level: 95 },
              { category: 'Data Engineering', skills: ['Pandas', 'NumPy', 'SQL', 'Elasticsearch', 'Neo4j', 'Kafka'], level: 90 },
              { category: 'Cybersecurity', skills: ['Threat Intel', 'Forensics', 'Access Control', 'Audit', 'Compliance'], level: 85 },
              { category: 'Generative AI', skills: ['LLMs', 'RAG', 'Agents', 'Prompt Engineering', 'Vector DBs'], level: 90 },
              { category: 'DevOps & MLOps', skills: ['Docker', 'Kubernetes', 'FastAPI', 'MLflow', 'Cloud'], level: 80 },
              { category: 'Education', skills: ['Curriculum Design', 'STEM Training', 'Mentorship', 'Technical Writing'], level: 88 },
            ].map((comp, i) => (
              <motion.div
                key={comp.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-lg border border-white/5 hover:border-neon-cyan/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary font-medium text-sm">{comp.category}</span>
                  <span className="text-neon-cyan font-mono text-xs">{comp.level}%</span>
                </div>
                <div className="w-full h-[2px] bg-surface rounded-full overflow-hidden mb-5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${comp.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {comp.skills.map((skill) => (
                    <span key={skill} className="text-xs text-secondary/70 bg-white/5 px-2 py-1 rounded font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
