'use client'
import { motion } from 'framer-motion'
import { ClipboardList, Receipt, Palette, BarChart3, Users, Mail } from 'lucide-react'
import data from '../data/portfolio.json'

// Lucide Icon Map
const iconMap = {
  ClipboardList,
  Receipt,
  Palette,
  BarChart3,
  Users,
  Mail,
}

const renderIcon = (iconName: string, size = 32) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap]
  return IconComponent ? <IconComponent size={size} className="text-white/80" /> : null
}

// SVG Pattern Components
const WorkflowNodesPattern = () => (
  <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="workflow" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="6" fill="rgba(99, 102, 241, 0.15)" />
        <circle cx="80" cy="50" r="6" fill="rgba(99, 102, 241, 0.15)" />
        <circle cx="50" cy="80" r="6" fill="rgba(99, 102, 241, 0.15)" />
        <line x1="20" y1="20" x2="80" y2="50" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" />
        <line x1="80" y1="50" x2="50" y2="80" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#workflow)" />
  </svg>
)

const CodeSnippetBg = () => (
  <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="code" x="0" y="0" width="200" height="60" patternUnits="userSpaceOnUse">
        <text x="10" y="15" fontFamily="monospace" fontSize="9" fill="rgba(34, 197, 94, 0.08)" fontWeight="bold">$uuid = Str::uuid();</text>
        <text x="10" y="28" fontFamily="monospace" fontSize="9" fill="rgba(34, 197, 94, 0.08)">Invoice::create([</text>
        <text x="10" y="41" fontFamily="monospace" fontSize="9" fill="rgba(34, 197, 94, 0.08)">'id' =&gt; $uuid</text>
        <text x="10" y="54" fontFamily="monospace" fontSize="9" fill="rgba(34, 197, 94, 0.08)">]);</text>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#code)" />
  </svg>
)

const LayeredArchPattern = () => (
  <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="layers" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect x="20" y="10" width="40" height="15" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="1" />
        <rect x="15" y="28" width="50" height="15" fill="none" stroke="rgba(168, 85, 247, 0.12)" strokeWidth="1" />
        <rect x="10" y="46" width="60" height="15" fill="none" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="1" />
        <circle cx="70" cy="15" r="3" fill="rgba(168, 85, 247, 0.2)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#layers)" />
  </svg>
)

const MetricsPattern = () => (
  <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="metrics" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
        <line x1="10" y1="50" x2="10" y2="20" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="2" />
        <line x1="30" y1="50" x2="30" y2="15" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="25" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="2" />
        <line x1="70" y1="50" x2="70" y2="10" stroke="rgba(59, 130, 246, 0.18)" strokeWidth="2" />
        <line x1="90" y1="50" x2="90" y2="30" stroke="rgba(59, 130, 246, 0.14)" strokeWidth="2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#metrics)" />
  </svg>
)

const BlueprintGridPattern = () => (
  <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="blueprint" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.5" />
        <text x="25" y="25" fontFamily="monospace" fontSize="6" fill="rgba(14, 165, 233, 0.1)" textAnchor="middle">.</text>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#blueprint)" />
  </svg>
)

const TerminalHeader = ({ prompt }: { prompt?: string }) => (
  <div className="absolute inset-0 flex flex-col justify-center px-4 bg-black/40">
    <div className="font-mono text-xs text-green-400/60 line-clamp-2">
      <span className="text-green-400/80">$ </span>
                    <span className="text-green-400/70">{prompt || ''}</span>
    </div>
  </div>
)

export default function Projects() {
  const { projects: projectsData, social } = data
  const projects = projectsData.items as Array<{ title: string; description: string; headerType: string; icon: string; metric: string; terminal?: string; highlights: string[]; tech: string[] }>

  const renderHeader = (project: { headerType: string; icon: string; metric: string; terminal?: string; title: string }, idx: number) => {
    const baseClasses = 'h-32 relative overflow-hidden flex items-center justify-center'

    const headerContent = (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

        {project.headerType === 'workflow' && (
          <>
            <WorkflowNodesPattern />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div>{renderIcon(project.icon, 40)}</div>
              <div className="absolute bottom-3 right-4 text-xs font-mono text-indigo-400/70 bg-black/40 px-2 py-1 rounded">
                {project.metric}
              </div>
            </div>
          </>
        )}

        {project.headerType === 'code' && (
          <>
            <CodeSnippetBg />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div>{renderIcon(project.icon, 40)}</div>
              <div className="absolute bottom-3 right-4 text-xs font-mono text-emerald-400/70 bg-black/40 px-2 py-1 rounded">
                {project.metric}
              </div>
            </div>
          </>
        )}

        {project.headerType === 'layers' && (
          <>
            <LayeredArchPattern />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div>{renderIcon(project.icon, 40)}</div>
              <div className="absolute bottom-3 right-4 text-xs font-mono text-purple-400/70 bg-black/40 px-2 py-1 rounded">
                {project.metric}
              </div>
            </div>
          </>
        )}

        {project.headerType === 'metrics' && (
          <>
            <MetricsPattern />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div>{renderIcon(project.icon, 40)}</div>
              <div className="absolute bottom-3 right-4 text-xs font-mono text-blue-400/70 bg-black/40 px-2 py-1 rounded">
                {project.metric}
              </div>
            </div>
          </>
        )}

        {project.headerType === 'terminal' && (
          <>
            <div className="absolute inset-0 bg-black/20"></div>
            <TerminalHeader prompt={project.terminal} />
            <div className="absolute top-3 left-4">{renderIcon(project.icon, 32)}</div>
          </>
        )}

        {project.headerType === 'blueprint' && (
          <>
            <BlueprintGridPattern />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div>{renderIcon(project.icon, 40)}</div>
              <div className="absolute bottom-3 right-4 text-xs font-mono text-sky-400/70 bg-black/40 px-2 py-1 rounded">
                {project.metric}
              </div>
            </div>
          </>
        )}

        {/* Card number overlay */}
        <div className="absolute top-3 right-4 font-mono text-white/20 text-xs font-bold">{`0${idx + 1}`}</div>
      </>
    )

    return <div className={baseClasses}>{headerContent}</div>
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${projectsData.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{projectsData.sectionTitle}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          <p className="text-zinc-400 mt-4 text-lg">{projectsData.sectionSubtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group glass-effect border border-accent/10 rounded-xl overflow-hidden card-hover"
            >
              {/* Sophisticated Header */}
              {renderHeader(project, idx)}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-neon transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map((highlight: string, hidx: number) => (
                    <span
                      key={hidx}
                      className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="border-t border-accent/10 pt-4">
                  <p className="text-xs text-zinc-500 mb-2 font-semibold">TECH STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string, tidx: number) => (
                      <span
                        key={tidx}
                        className="text-xs px-2 py-1 rounded bg-secondary/50 text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-400 mb-6">{projectsData.ctaText}</p>
          <motion.a
            href={social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            {projectsData.ctaButtonText}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
