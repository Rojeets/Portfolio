'use client'
import { motion } from 'framer-motion'
import data from '../data/portfolio.json'

export default function Hero() {
  const { personal, hero, social } = data

  const socialLinks = hero.socialLinks.map(
    (key: string) => (social as Record<string, { label: string; url: string }>)[key]
  )

  return (
    <section className="min-h-[80vh] flex items-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at top, rgba(99,102,241,0.12), transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block px-4 py-1.5 rounded-full glass-effect text-accent text-xs font-medium mb-6"
          >
            {hero.badgeText}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-zinc-400 mb-3 max-w-2xl"
          >
            {personal.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-zinc-500 max-w-2xl leading-relaxed mb-8"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {hero.ctaButtons.map((btn: { text: string; href: string; style: string }) => (
              <motion.a
                key={btn.text}
                href={btn.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={
                  btn.style === 'primary'
                    ? 'px-6 py-3 bg-gradient-to-r from-accent to-neon text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-accent/25'
                    : 'px-6 py-3 border border-accent/30 text-accent rounded-xl font-medium text-sm transition-all hover:bg-accent/10 hover:border-accent/50'
                }
              >
                {btn.text}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-6 mt-12"
          >
            {socialLinks.map((s: { label: string; url: string }) => (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-sm text-zinc-500 hover:text-accent transition-colors"
              >
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
