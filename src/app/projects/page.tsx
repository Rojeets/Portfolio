'use client'
import { motion } from 'framer-motion'
import { ClipboardList, Receipt, Palette, BarChart3, Users, Mail, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import data from '../../data/portfolio.json'

const iconMap: Record<string, React.ElementType> = {
  ClipboardList, Receipt, Palette, BarChart3, Users, Mail,
}

const renderIcon = (iconName: string, size = 22) => {
  const Icon = iconMap[iconName]
  return Icon ? <Icon size={size} className="text-accent" /> : null
}

const PatternBg = ({ type }: { type: string }) => {
  if (type === 'metrics') return (
    <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
      <defs><pattern id="m" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
        <line x1="10" y1="40" x2="10" y2="15" stroke="rgba(99,102,241,0.1)" strokeWidth="2" />
        <line x1="30" y1="40" x2="30" y2="10" stroke="rgba(99,102,241,0.15)" strokeWidth="2" />
        <line x1="50" y1="40" x2="50" y2="20" stroke="rgba(99,102,241,0.12)" strokeWidth="2" />
        <line x1="70" y1="40" x2="70" y2="8" stroke="rgba(99,102,241,0.18)" strokeWidth="2" />
        <line x1="90" y1="40" x2="90" y2="25" stroke="rgba(99,102,241,0.14)" strokeWidth="2" />
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#m)" />
    </svg>
  )
  if (type === 'code') return (
    <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
      <defs><pattern id="c" x="0" y="0" width="180" height="48" patternUnits="userSpaceOnUse">
        <text x="8" y="14" fontFamily="monospace" fontSize="8" fill="rgba(99,102,241,0.08)">$uuid = Str::uuid();</text>
        <text x="8" y="26" fontFamily="monospace" fontSize="8" fill="rgba(99,102,241,0.08)">Invoice::create([</text>
        <text x="8" y="38" fontFamily="monospace" fontSize="8" fill="rgba(99,102,241,0.08)">{`'id' => $uuid`}</text>
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#c)" />
    </svg>
  )
  if (type === 'layers') return (
    <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
      <defs><pattern id="l" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
        <rect x="15" y="8" width="40" height="14" fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="1" />
        <rect x="10" y="26" width="50" height="14" fill="none" stroke="rgba(168,85,247,0.08)" strokeWidth="1" />
        <rect x="5" y="44" width="60" height="14" fill="none" stroke="rgba(168,85,247,0.06)" strokeWidth="1" />
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#l)" />
    </svg>
  )
  if (type === 'workflow') return (
    <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
      <defs><pattern id="w" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="5" fill="rgba(99,102,241,0.12)" />
        <circle cx="70" cy="45" r="5" fill="rgba(99,102,241,0.12)" />
        <circle cx="45" cy="70" r="5" fill="rgba(99,102,241,0.12)" />
        <line x1="20" y1="20" x2="70" y2="45" stroke="rgba(99,102,241,0.08)" strokeWidth="0.8" />
        <line x1="70" y1="45" x2="45" y2="70" stroke="rgba(99,102,241,0.08)" strokeWidth="0.8" />
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#w)" />
    </svg>
  )
  if (type === 'blueprint') return (
    <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
      <defs><pattern id="b" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="none" stroke="rgba(14,165,233,0.06)" strokeWidth="0.5" />
        <text x="20" y="22" fontFamily="monospace" fontSize="5" fill="rgba(14,165,233,0.08)" textAnchor="middle">.</text>
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#b)" />
    </svg>
  )
  if (type === 'terminal') return (
    <div className="absolute inset-0 flex items-center px-5">
      <span className="font-mono text-xs text-accent/30">$ ./deploy --prod</span>
    </div>
  )
  return null
}

export default function ProjectsPage() {
  const { projects: projectsData, social } = data
  const projects = projectsData.items as Array<{
    title: string; description: string; headerType: string; icon: string;
    metric: string; highlights: string[]; tech: string[]
  }>

  return (
    <div className="pt-24 px-6 relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${projectsData.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{projectsData.sectionTitle}</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-neon rounded-full mb-6" />
          <p className="text-zinc-400 max-w-2xl">{projectsData.sectionSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-effect rounded-3xl overflow-hidden border-accent/10 card-hover group"
            >
              <div className="h-36 relative overflow-hidden bg-secondary/80">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
                <PatternBg type={project.headerType} />
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <div className="p-2.5 rounded-2xl border border-accent/20 bg-zinc-900/60">
                    {renderIcon(project.icon)}
                  </div>
                  <span className="text-xs font-mono text-accent/60 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-accent/20">
                    {project.metric}
                  </span>
                </div>
                <div className="absolute top-3 right-4 font-mono text-xs text-zinc-600 font-bold">
                  {`0${idx + 1}`}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight size={16} className="text-accent/30 group-hover:text-accent transition-colors mt-1 shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.highlights.map((h: string, hidx: number) => (
                    <span key={hidx} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="border-t border-accent/10 pt-4">
                  <p className="text-[10px] text-zinc-600 mb-2 font-semibold uppercase tracking-wider">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech: string, tidx: number) => (
                      <span key={tidx} className="text-xs px-2 py-1 rounded-lg bg-zinc-800/60 text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 mb-6">{projectsData.ctaText}</p>
          <motion.a
            href={social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-accent to-neon text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            {projectsData.ctaButtonText}
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
