import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { credentials, credentialStats } from '../data/credentials'
import MetalCard from '../components/MetalCard'
import Gemstone from '../components/Gemstone'

export default function PremiumCredentials() {
  const googleCreds = credentials.filter(c => c.issuer === 'Google')
  const ibmCreds = credentials.filter(c => c.issuer === 'IBM')

  return (
    <section id="credentials" className="relative py-32 material-credentials">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-premium mb-4">Verified Learning</span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-gradient-primary mb-4">
            Credentials
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {credentialStats.total} verified credentials from Google, Coursera, and IBM SkillsBuild. 
            Documented progression from IT foundations to AI/ML engineering.
          </p>
        </motion.div>

        {/* Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <MetalCard metal="gold" texture="polished" className="h-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-5xl font-display font-bold text-gradient-gold mb-2">
                    {googleCreds.length}
                  </div>
                  <div className="text-text-primary font-medium mb-1 material-google">Google / Coursera</div>
                  <div className="text-text-tertiary text-sm">Aug - Dec 2024</div>
                </div>
                <Gemstone type="emerald" size="lg" cut="emerald" />
              </div>
            </MetalCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <MetalCard metal="platinum" texture="brushed" className="h-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-5xl font-display font-bold text-platinum mb-2">
                    {ibmCreds.length}
                  </div>
                  <div className="text-text-primary font-medium mb-1 material-ibm">IBM SkillsBuild</div>
                  <div className="text-text-tertiary text-sm">Jun - Jul 2026</div>
                </div>
                <Gemstone type="sapphire" size="lg" cut="round" />
              </div>
            </MetalCard>
          </motion.div>
        </div>

        {/* Credential List */}
        <div className="grid md:grid-cols-2 gap-4">
          {credentials.map((cred, index) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <MetalCard 
                metal={cred.issuer === 'Google' ? 'gold' : 'chrome'} 
                texture="brushed" 
                className="h-full"
                interactive={false}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award size={20} className={cred.issuer === 'Google' ? 'text-gold-dark' : 'text-chrome-dark'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-text-primary font-medium truncate group-hover:text-accent-light transition-colors">
                        {cred.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={cred.issuer === 'Google' ? 'material-google' : 'material-ibm'}>
                        {cred.issuer}
                      </span>
                      <span className="text-text-muted">•</span>
                      <span className="text-text-tertiary">{cred.date}</span>
                    </div>
                  </div>
                </div>
              </MetalCard>
            </motion.div>
          ))}
        </div>

        {/* Credly Link */}
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
            className="inline-flex items-center gap-2 text-accent-light hover:text-accent transition-colors"
          >
            View Credly Profile
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
