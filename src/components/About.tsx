'use client'
import { motion } from 'framer-motion'
import data from '../data/portfolio.json'

export default function About() {
  const { about } = data

  const renderBioText = (text: string) => {
    const parts = text.split(/(<highlight>.*?<\/highlight>|<accent>.*?<\/accent>)/g)
    return parts.map((part, i) => {
      if (part.startsWith('<highlight>')) {
        return <span key={i} className="text-neon font-semibold">{part.replace(/<\/?highlight>/g, '')}</span>
      }
      if (part.startsWith('<accent>')) {
        return <span key={i} className="text-accent font-semibold">{part.replace(/<\/?accent>/g, '')}</span>
      }
      return part
    })
  }

  return (
    <section id="about" className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/30 to-primary pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{about.sectionTitle}</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-neon rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {about.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className={`text-zinc-400 leading-relaxed ${idx < about.bio.length - 1 ? 'mb-6' : 'mb-8'}`}
              >
                {renderBioText(paragraph.text)}
              </p>
            ))}

            <div className="space-y-4">
              {about.highlights.map((item) => (
                <div key={item.number} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                    <span className="text-accent text-xs font-bold">{item.number}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-effect rounded-3xl p-8 border-accent/20">
              <div className="grid grid-cols-2 gap-4">
                {about.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="text-center p-5 rounded-2xl bg-accent/5 border border-accent/10 card-hover"
                  >
                    <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                    <p className="text-xs text-zinc-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
