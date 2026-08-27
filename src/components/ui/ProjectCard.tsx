import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
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
        className="relative p-8 md:p-12 glass rounded-lg overflow-hidden"
      >
        {/* Project Number */}
        <span className="absolute top-6 right-6 text-secondary/50 font-display text-6xl md:text-8xl font-bold select-none">
          {project.number}
        </span>
        
        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent text-sm font-medium tracking-wider">
              {project.category}
            </span>
            <span className="text-secondary/50 text-sm">•</span>
            <span className="text-secondary text-sm">{project.year}</span>
          </div>
          
          <h3 className="text-primary font-display text-3xl md:text-5xl font-medium mb-4 group-hover:text-accent transition-colors duration-500">
            {project.title}
          </h3>
          
          <p className="text-secondary text-base md:text-lg mb-6 leading-relaxed">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs text-secondary border border-secondary/20 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6">
            {project.link && (
              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors group/link"
              >
                <span className="text-sm font-medium tracking-wider uppercase">
                  View Project
                </span>
                <ArrowUpRight 
                  size={16} 
                  className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" 
                />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                className="text-secondary hover:text-primary transition-colors text-sm"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
        
        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}
