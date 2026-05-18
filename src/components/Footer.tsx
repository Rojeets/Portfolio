'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Logo from './Logo'
import data from '../data/portfolio.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { personal, footer, social } = data

  const socialLinks = footer.socialLinks.map(
    (key: string) => (social as Record<string, { label: string; url: string }>)[key]
  )

  return (
    <footer className="border-t border-accent/10 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Logo />
            <p className="text-sm text-zinc-500 leading-relaxed mt-4 max-w-sm">
              {personal.footerDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-zinc-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footer.quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-zinc-300 mb-4">Connect</h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((s: { label: string; url: string }) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 2 }}
                  className="text-sm text-zinc-500 hover:text-accent transition-colors"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-accent/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
          <p>&copy; {currentYear} {personal.copyright}. All rights reserved.</p>
          <p>{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
