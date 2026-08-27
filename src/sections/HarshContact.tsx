import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Terminal } from 'lucide-react'

const links = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/HarshkumarG007', color: 'text-primary hover:text-white', hoverBorder: 'hover:border-white/50' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/harshkumarg/', color: 'text-primary hover:text-google-blue', hoverBorder: 'hover:border-google-blue/50' },
  { name: 'Credly', icon: Terminal, url: 'https://www.credly.com/users/harshkumarg', color: 'text-primary hover:text-amber-500', hoverBorder: 'hover:border-amber-500/50' },
]

export default function HarshContact() {
  return (
    <section id="contact" className="relative py-32 md:py-48 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-neon-cyan font-mono text-sm">04</span>
          <div className="w-12 h-[1px] bg-neon-cyan/30" />
          <span className="text-secondary font-mono text-xs tracking-[0.2em] uppercase">Connection</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl relative z-10"
        >
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary mb-8 leading-[0.9] tracking-tight">
            Let's_Build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">
              The_Future.
            </span>
          </h2>

          <p className="text-secondary text-xl md:text-2xl mb-12 max-w-2xl font-mono text-sm leading-relaxed">
            <span className="text-neon-cyan">&gt;</span> AI/ML engineering. Security-first architecture. STEM education.
            Available for selective projects and collaborations.
          </p>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-14"
          >
            <a
              href="mailto:harshkumarg007@gmail.com"
              className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-mono text-primary hover:text-neon-cyan transition-colors duration-500"
            >
              <Mail className="w-8 h-8 text-neon-cyan/50 group-hover:text-neon-cyan transition-colors" />
              <span className="link-underline">harshkumarg007@gmail.com</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 md:gap-6"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-4 glass rounded-lg border border-white/5 transition-all duration-300 group ${link.hoverBorder}`}
              >
                <link.icon className={`w-5 h-5 transition-colors ${link.color}`} />
                <span className={`font-mono text-sm transition-colors ${link.color}`}>{link.name}</span>
              </a>
            ))}
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center gap-4 pt-8 border-t border-white/5"
          >
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matrix-DEFAULT opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-matrix-DEFAULT shadow-[0_0_8px_#00FF41]"></span>
            </span>
            <span className="text-matrix-DEFAULT font-mono text-sm tracking-wider uppercase">
              AVAILABLE_FOR_SELECTED_PROJECTS
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Background ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute -right-1/4 top-1/4 w-[600px] h-[600px] rounded-full bg-neon-cyan/5 blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute -left-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-neon-magenta/5 blur-[120px]"
        />
      </div>
    </section>
  )
}
