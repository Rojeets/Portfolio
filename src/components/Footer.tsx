import Link from 'next/link'
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from './Icons'

const socialLinks = [
  { icon: GithubLogo, url: 'https://github.com/rojeets', label: 'GitHub' },
  { icon: LinkedinLogo, url: 'https://www.linkedin.com/in/rojit-pokharel/', label: 'LinkedIn' },
  { icon: EnvelopeSimple, url: 'mailto:info@rojitpokharel.com.np', label: 'Email' },
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
              &copy; {new Date().getFullYear()} Rojit Pokharel
            </p>
          </div>

          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-text-muted hover:text-blue-light transition-colors"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
