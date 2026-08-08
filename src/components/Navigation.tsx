'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { List, X } from './Icons'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Blog', href: '/blog' },
  { name: 'Answers', href: '/answers' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled
          ? 'bg-bg-void/80 backdrop-blur-xl border-b border-panel-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
        <Link
          href="/"
          className="font-display font-semibold text-lg text-text-primary tracking-tight"
        >
          <span className="text-blue-core">&lt;</span>Rojit<span className="text-blue-core"> /&gt;</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors rounded-md',
                isActive(item.href)
                  ? 'text-blue-light bg-blue-core/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-flex text-xs font-mono text-green-live items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-live animate-pulse-dot" />
            Available
          </span>
          <Link
            href="/contact"
            className="hidden md:inline-flex px-4 py-2 bg-blue-core/10 text-blue-light text-sm font-semibold rounded-lg border border-blue-core/20 hover:bg-blue-core/15 transition-colors"
          >
            Get in Touch
          </Link>
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-bg-void/95 backdrop-blur-xl border-b border-panel-border">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                  isActive(item.href)
                    ? 'text-blue-light bg-blue-core/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 px-3 py-2.5 bg-blue-core/10 text-blue-light text-sm font-semibold rounded-lg text-center border border-blue-core/20"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
