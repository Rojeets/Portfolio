'use client'
import { motion } from 'framer-motion'
import data from '../data/portfolio.json'

export default function Experience() {
  const { experience } = data

  return (
    <section id="experience" className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/30 to-primary pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{experience.sectionTitle}</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-neon rounded-full mb-4" />
          <p className="text-zinc-500 max-w-2xl">{experience.sectionSubtitle}</p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {experience.roles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-effect rounded-3xl p-8 border-accent/10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{role.title}</h3>
                  <p className="text-accent font-medium mt-1">{role.company}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-zinc-400 text-sm">{role.period}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{role.location}</p>
                </div>
              </div>
              {role.description && (
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{role.description}</p>
              )}
              <ul className="space-y-2">
                {role.achievements.map((a, aidx) => (
                  <li key={aidx} className="text-zinc-500 text-sm flex items-start gap-3">
                    <span className="text-accent mt-1 shrink-0">•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            <span className="gradient-text">Education</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {experience.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-effect rounded-2xl p-6 border-accent/10"
              >
                <p className="text-accent text-xs font-medium mb-1">{edu.period}</p>
                <h4 className="text-white font-semibold mb-1">{edu.degree}</h4>
                <p className="text-zinc-500 text-sm">{edu.institution}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{edu.location}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            <span className="gradient-text">Achievements</span>
          </h3>
          <div className="glass-effect rounded-3xl p-8 border-accent/10">
            <ul className="space-y-3">
              {experience.achievements.map((a, idx) => (
                <li key={idx} className="text-zinc-400 text-sm flex items-start gap-3">
                  <span className="text-accent mt-0.5 shrink-0">🏆</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-500">Expertise Areas</h4>
            <div className="flex flex-wrap gap-2">
              {experience.expertiseAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
