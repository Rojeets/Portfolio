import { motion } from 'framer-motion'
import data from '../data/portfolio.json'

export default function Hero() {
  const { personal, hero, social } = data

  const socialLinks = hero.socialLinks.map((key) => social[key])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="home" className="min-h-screen pt-24 px-6 flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm"></div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full glass-effect text-neon text-sm font-medium">
            {hero.badgeText}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl font-bold mb-6 gradient-text"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-zinc-300 mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          {personal.subtitle}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-zinc-400 mb-8 max-w-3xl mx-auto"
        >
          {personal.tagline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center"
        >
          {hero.ctaButtons.map((btn) => (
            <motion.a
              key={btn.text}
              href={btn.href}
              whileHover={{ scale: 1.05, ...(btn.style === 'primary' ? { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' } : {}) }}
              className={
                btn.style === 'primary'
                  ? 'px-8 py-3 bg-accent text-white rounded-lg font-semibold transition-all'
                  : 'px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold transition-all hover:bg-accent/10'
              }
            >
              {btn.text}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-6 justify-center mt-12"
        >
          {socialLinks.map((s) => (
            <motion.a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 rounded glass-effect text-sm font-medium text-zinc-300 hover:text-neon hover:bg-accent/20 transition-all"
            >
              {s.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <p className="text-zinc-400 mb-3 text-sm">{hero.scrollText}</p>
          <div className="text-2xl text-accent">v</div>
        </motion.div>
      </motion.div>
    </section>
  )
}
