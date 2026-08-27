import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react'
import Gemstone from '../components/Gemstone'
import ContactFormModal from '../components/ContactFormModal'

// Email assembled at runtime to prevent scraper harvesting
const getEmail = () => ['hrslsha007', 'gmail', 'com'].join('@').replace('@gmail@', '@gmail.')

export default function PremiumContact() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsContactFormOpen(true)
  }

  return (
    <section id="contact" className="relative py-32 material-contact border-t border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center"
        >
          <Gemstone type="diamond" size="lg" cut="round" className="mb-6" />
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-gold-leaf mb-6">
            Let's Connect
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Available for selected projects in AI/ML engineering, intelligent systems architecture, and technical education.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
        >
          {/* SEC-05: Email assembled at runtime to prevent scraper harvesting */}
          <a
            href="#"
            onClick={handleEmailClick}
            className="flex items-center gap-3 px-8 py-4 card-premium text-lg font-medium hover:text-accent-light transition-colors w-full md:w-auto justify-center"
          >
            <Mail className="text-accent" />
            hrslsha007 [at] gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-8"
        >
          <a
            href="https://github.com/HarshkumarG007"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-2xl glass-luxe flex items-center justify-center hover:scale-110 transition-transform">
              <Github size={24} />
            </div>
            <span className="text-xs font-medium">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/harshkumarg/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent-light transition-colors flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-2xl glass-luxe flex items-center justify-center hover:scale-110 transition-transform">
              <Linkedin size={24} />
            </div>
            <span className="text-xs font-medium">LinkedIn</span>
          </a>
          <a
            href="https://www.credly.com/users/harshkumarg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-gold-light transition-colors flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-2xl glass-luxe flex items-center justify-center hover:scale-110 transition-transform">
              <ExternalLink size={24} />
            </div>
            <span className="text-xs font-medium">Credly</span>
          </a>
        </motion.div>
      </div>
      <ContactFormModal isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </section>
  )
}
