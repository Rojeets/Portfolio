'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/')) return pathname.startsWith(href)
    return false
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-border-subtle ${
        scrolled ? 'bg-background/95 shadow-lg' : 'bg-background/80'
      } backdrop-blur-md`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex justify-between items-center h-16">
        <Link href="/" className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
          Rojit Pokharel
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-label-md text-label-md transition-colors ${
                isActive(item.href)
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-flex font-label-sm text-label-sm text-secondary animate-pulse-dot items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span> Available for hire
          </span>
          <Link
            href="/contact"
            className="px-6 py-2 bg-primary-container text-on-primary-container font-label-md text-label-md hover:brightness-110 transition-all glow-accent"
          >
            Get in Touch
          </Link>
          <button
            className="md:hidden p-2 hover:bg-surface-variant transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-on-surface">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border-subtle">
          <div className="px-margin-mobile py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 font-label-md text-label-md transition-all ${
                  isActive(item.href)
                    ? 'text-primary bg-surface-variant/50'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant/30'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
