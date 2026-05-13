'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Code2, Layers, Cog, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import data from '../data/portfolio.json'

const iconMap = { Code2, Layers, Cog, Zap }

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const { skills } = data

  const getLevelStyle = (level: string) => {
    switch(level) {
      case 'Expert':
        return 'border-l-2 border-emerald-500'
      case 'Advanced':
        return 'border-l-2 border-sky-400'
      case 'Proficient':
        return 'border-l-2 border-indigo-400'
      default:
        return 'border-l-2 border-slate-600'
    }
  }

  const getLevelBg = (level: string) => {
    switch(level) {
      case 'Expert':
        return 'bg-emerald-950/40'
      case 'Advanced':
        return 'bg-sky-950/40'
      case 'Proficient':
        return 'bg-indigo-950/40'
      default:
        return 'bg-slate-800/40'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-24 px-6 relative bg-slate-950">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-slate-100">{skills.sectionTitle}</span>{' '}
            <span className="text-sky-400">{skills.sectionTitleHighlight}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            {skills.sectionSubtitle}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap gap-3"
        >
          {skills.filters.map((filter: { id: string; label: string }) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                activeFilter === filter.id
                  ? 'bg-indigo-500 text-white border border-indigo-400'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {skills.categories
            .filter((cat: { id: string }) => activeFilter === 'all' || activeFilter === cat.id)
            .map((category: { id: string; icon: string; title: string; technologies: { name: string; level: string; levelColor: string; subSkills: string[] }[] }, idx: number) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {IconComponent && <IconComponent size={20} className="text-slate-500" />}
                    <h3 className="text-lg font-bold text-sky-400 font-mono">{category.title}</h3>
                  </div>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {category.technologies.map((tech: { name: string; level: string; levelColor: string; subSkills: string[] }, tidx: number) => {
                      const cardId = `${category.id}-${tidx}`
                      const isExpanded = expandedCard === cardId
                      return (
                        <motion.div
                          key={tidx}
                          variants={itemVariants}
                          className={`${getLevelBg(tech.level)} ${getLevelStyle(tech.level)} rounded-lg border border-slate-700 hover:border-slate-600 transition-all cursor-pointer`}
                          onClick={() => setExpandedCard(isExpanded ? null : cardId)}
                        >
                          <div className="flex items-center justify-between p-4">
                            <div>
                              <h4 className="text-base font-bold text-slate-100 font-mono">{tech.name}</h4>
                              <span className={`text-xs font-bold tracking-wider uppercase ${tech.levelColor}`}>
                                {tech.level}
                              </span>
                            </div>
                            <div className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                              <ChevronDown size={18} className="text-slate-500" />
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden border-t border-slate-700"
                              >
                                <div className="p-4 space-y-2">
                                  {tech.subSkills.map((subSkill: string, sidx: number) => (
                                    <div key={sidx} className="flex items-start gap-2">
                                      <span className="text-slate-600 text-xs mt-0.5">▪</span>
                                      <span className="text-xs text-slate-400 font-mono">{subSkill}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </motion.div>
              )
            })}
        </div>

        {/* Real-World Applications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-slate-900 border border-slate-700 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-sky-400 font-mono">{skills.realWorldTitle}</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">
            {skills.realWorldSubtitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.realWorldApplications.map((comp: string, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, x: 2 }}
                className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-center text-xs font-mono text-slate-300 hover:text-sky-400 hover:border-sky-500 transition-all cursor-default"
              >
                {comp}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
