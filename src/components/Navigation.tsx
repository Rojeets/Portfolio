'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import data from '../data/portfolio.json'

interface NavigationProps {
  setMode?: (mode: string) => void
}

export default function Navigation({ setMode }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const { navigation, personal } = data

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      if (pathname === '/') {
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        router.push('/' + href)
      }
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 glass-effect border-b border-accent/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text cursor-pointer"
          >
            {personal.logoTag}
          </motion.span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navigation.items.map((item: { name: string; href: string }) =>
            item.href.startsWith('/') ? (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-neon"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium transition-colors hover:text-neon cursor-pointer"
              >
                {item.name}
              </a>
            )
          )}
          {setMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setMode('terminal')}
              className="text-xs px-3 py-2 bg-accent/20 text-accent rounded hover:bg-accent/30 transition-all"
            >
              Terminal Mode
            </motion.button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          {setMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setMode('terminal')}
              className="text-xs px-2 py-1 bg-accent/20 text-accent rounded hover:bg-accent/30 transition-all"
            >
              Terminal
            </motion.button>
          )}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`w-6 h-0.5 bg-accent transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-accent transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-accent transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-secondary/50 border-t border-accent/10"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navigation.items.map((item: { name: string; href: string }) =>
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium hover:text-neon transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    setIsOpen(false)
                    handleNavClick(e, item.href)
                  }}
                  className="text-sm font-medium hover:text-neon transition-colors cursor-pointer"
                >
                  {item.name}
                </a>
              )
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
