import Link from 'next/link'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData

const socialOrder = ['github', 'gitlab', 'medium', 'hashnode', 'linkedin', 'email'] as const

const footerNav = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Case Studies', href: '/projects#case-studies' },
  { name: 'Skills', href: '/skills' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Answers', href: '/answers' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-panel-border bg-bg-void/80 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="font-display font-semibold text-lg text-text-primary tracking-tight">
              <span className="text-blue-core">&lt;</span>Rojit<span className="text-blue-core"> /&gt;</span>
            </Link>
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} Rojit Pokharel — Full-Stack Web Developer &amp; System Architect
            </p>
            <p className="text-xs text-text-muted max-w-xs">
              Rojit Pokharel is a Full-Stack Web Developer &amp; System Architect from Kathmandu, Nepal, building production web applications with Laravel, Django, React, and Next.js.
            </p>
          </div>

          <nav className="flex flex-col items-center md:items-start gap-2" aria-label="Footer navigation">
            {footerNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-blue-light transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center md:items-start gap-1.5">
            {socialOrder.map((key) => {
              const link = data.social[key]
              return (
                <a
                  key={key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-text-muted hover:text-blue-light transition-colors"
                >
                  {link.display}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
