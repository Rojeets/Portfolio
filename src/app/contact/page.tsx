'use client'
import { Suspense } from 'react'
import { EnvelopeSimple, MapPin, GithubLogo, LinkedinLogo } from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'
import ContactForm from '@/components/ContactForm'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <span className="label text-blue-light mb-4 block">Contact</span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
              Let&apos;s build something{' '}
              <span className="text-blue-light glow-text">together.</span>
            </h1>
            <p className="text-body-lg text-text-secondary">
              {data.contact.availability.text}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-10">
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-panel-bg border border-panel-border flex items-center justify-center text-blue-light shrink-0">
                  <EnvelopeSimple size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-0.5">Email</p>
                  <a
                    href={data.social.email.url}
                    className="text-sm text-text-primary hover:text-blue-light transition-colors"
                  >
                    {data.social.email.display}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-panel-bg border border-panel-border flex items-center justify-center text-blue-light shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-sm text-text-primary">{data.personal.location}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <a
                  href={data.social.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-panel-bg border border-panel-border flex items-center justify-center text-text-muted hover:text-blue-light hover:border-blue-light/30 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubLogo size={20} />
                </a>
                <a
                  href={data.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-panel-bg border border-panel-border flex items-center justify-center text-text-muted hover:text-blue-light hover:border-blue-light/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={20} />
                </a>
              </div>

              <div className="bg-panel-bg/30 border border-panel-border rounded-xl p-4 mt-6">
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                  {data.contact.availability.title}
                </p>
                <p className="text-sm text-text-secondary">{data.contact.availability.responseTime}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="card-base p-8 text-center text-sm text-text-muted">
                  Loading form…
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </ScrollReveal>
        </div>
      </div>
    </main>
  )
}
