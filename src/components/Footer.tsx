'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import data from '../data/portfolio.json'

interface FooterProps {
  setMode?: (mode: string) => void
}

export default function Footer({ setMode }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const { personal, footer, social } = data
  const navItem = social as Record<string, { label: string; url: string }>

  const socialLinks = footer.socialLinks.map((key: string) => navItem[key])

  const quickLinkHref = (link: string) => {
    if (link === 'Blog') return '/blogs'
    return `/#${link.toLowerCase()}`
  }

  return (
    <footer className="border-t border-accent/10 bg-secondary/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/">
              <div className="text-2xl font-bold gradient-text mb-4 cursor-pointer">
                {personal.logoTag}
              </div>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {personal.footerDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {footer.quickLinks.map((link: string) => (
                <li key={link}>
                  <Link
                    href={quickLinkHref(link)}
                    className="text-zinc-400 hover:text-neon transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4 items-start">
              <div className="flex gap-3">
                {socialLinks.map((s: { label: string; url: string }) => (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 rounded glass-effect text-sm font-medium text-zinc-300 hover:text-neon hover:bg-accent/20 transition-all"
                    aria-label={s.label}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </div>
              {setMode && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setMode('terminal')}
                  className="text-xs px-3 py-2 bg-accent/20 text-accent rounded hover:bg-accent/30 transition-all whitespace-nowrap"
                >
                  Terminal
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-accent/10 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
          <p>
            {currentYear} {personal.copyright}. All rights reserved.
          </p>
          <p>
            {footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  )
}
