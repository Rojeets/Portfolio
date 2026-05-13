'use client'
import { motion } from 'framer-motion'
import data from '../data/portfolio.json'

export default function About() {
  const { about } = data

  // Helper to render bio text with <highlight> and <accent> markup
  const renderBioText = (text: string) => {
    const parts = text.split(/(<highlight>.*?<\/highlight>|<accent>.*?<\/accent>)/g)
    return parts.map((part, i) => {
      if (part.startsWith('<highlight>')) {
        const content = part.replace(/<\/?highlight>/g, '')
        return <span key={i} className="text-neon font-semibold">{content}</span>
      }
      if (part.startsWith('<accent>')) {
        const content = part.replace(/<\/?accent>/g, '')
        return <span key={i} className="text-accent font-semibold">{content}</span>
      }
      return part
    })
  }

  return (
    <section id="about" className="py-24 px-6 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${about.backgroundImage})` }}
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
            <span className="gradient-text">{about.sectionTitle}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {about.bio.map((paragraph, idx) => (
              <p key={idx} className={`text-lg text-zinc-300 ${idx < about.bio.length - 1 ? 'mb-6' : 'mb-8'} leading-relaxed`}>
                {renderBioText(paragraph.text)}
              </p>
            ))}

            <div className="space-y-4">
              {about.highlights.map((item) => (
                <div key={item.number} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent font-bold">{item.number}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="glass-effect p-8 rounded-xl border border-accent/20">
              <div className="grid grid-cols-2 gap-4">
                {about.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/30 transition-all"
                  >
                    <p className="text-3xl font-bold gradient-text mb-2">{stat.value}</p>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
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
