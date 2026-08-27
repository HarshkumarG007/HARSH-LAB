import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, Cpu } from 'lucide-react'

interface CyberpunkCardProps {
  project: {
    id: string
    number: string
    title: string
    category: string
    description: string
    technologies: string[]
    year: string
    link?: string
    github?: string
  }
  index: number
}

export default function CyberpunkCard({ project, index }: CyberpunkCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      data-cursor-label="VIEW"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative p-8 glass rounded-lg overflow-hidden border border-neon-cyan/20 hover:border-neon-cyan/50 transition-colors duration-500"
      >
        {/* Holographic overlay */}
        <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-neon-cyan/60" />
        <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-neon-cyan/60" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-neon-cyan/60" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-neon-cyan/60" />

        {/* Project Number watermark */}
        <div className="absolute top-4 right-6 font-mono text-4xl md:text-6xl font-bold text-neon-cyan/15 select-none">
          {project.number}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header bar */}
          <div className="flex items-center gap-4 mb-6">
            <Cpu className="w-5 h-5 text-neon-cyan flex-shrink-0" />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-neon-cyan/50 to-transparent" />
            <span className="text-neon-cyan/70 font-mono text-xs tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-primary font-display text-3xl md:text-4xl font-bold mb-4 group-hover:text-neon-cyan transition-colors duration-300 tracking-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-secondary text-base mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono text-neon-cyan/80 border border-neon-cyan/30 rounded bg-neon-cyan/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-neon-cyan/10">
            <span className="text-secondary/50 font-mono text-xs">
              YEAR: {project.year}
            </span>

            <div className="flex items-center gap-5">
              {project.github && (
                <a
                  href={project.github}
                  className="text-secondary hover:text-neon-magenta transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  className="flex items-center gap-2 text-neon-cyan hover:text-neon-magenta transition-colors duration-300 font-mono text-sm"
                >
                  <span>ACCESS</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}
