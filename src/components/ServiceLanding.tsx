'use client'

import Link from 'next/link'
import {
  CheckCircle,
  ArrowUpRight,
  MapPin,
  Calendar,
  EnvelopeSimple,
  LinkedinLogo,
  GearSix,
} from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'
import SectionTransition from '@/components/SectionTransition'
import TerminalPrompt from '@/components/TerminalPrompt'
import MagneticButton from '@/components/MagneticButton'
import { pillarIcons } from '@/components/ServiceIcons'
import { serviceGroups, processSteps, stats, faqs, cta } from '@/data/services'
import type { ServicePillar } from '@/data/services'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData

function PillarCard({ pillar, badge }: { pillar: ServicePillar; badge?: string }) {
  const Icon = pillarIcons[pillar.icon]

  return (
    <div className="card-base p-6 h-full flex flex-col group hover:border-blue-core/20 hover:shadow-lg hover:shadow-blue-core/5 transition-all duration-300">
      <div className="w-11 h-11 rounded-xl bg-blue-core/10 flex items-center justify-center text-blue-light mb-4 group-hover:bg-blue-core/15 transition-colors">
        <Icon size={22} />
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        <Link href={`/services/${pillar.slug}`} className="group/title">
          <h3 className="font-display font-semibold text-lg text-text-primary leading-tight group-hover/title:text-blue-light transition-colors">
            {pillar.title}
          </h3>
        </Link>
        {badge && (
          <span className="text-[10px] font-mono uppercase tracking-wide text-blue-light bg-blue-core/10 px-2 py-0.5 rounded-full border border-blue-core/20 whitespace-nowrap">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
        {pillar.subtitle}
      </p>
      <p className="text-sm text-text-secondary leading-relaxed mb-5">
        {pillar.description}
      </p>

      <ul className="space-y-2 mb-6">
        {pillar.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
            <CheckCircle size={16} className="text-blue-light shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-panel-border">
        <span className="text-[11px] font-mono text-text-muted">
          {pillar.deliverables.join(' · ')}
        </span>
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <Link
            href={`/services/${pillar.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-text-muted hover:text-white transition-colors"
          >
            Details
            <ArrowUpRight size={14} />
          </Link>
          <Link
            href={`/services/${pillar.slug}#cta`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-core text-white font-mono text-sm font-medium rounded-lg hover:bg-blue-core/90 hover:glow-blue transition-all whitespace-nowrap"
          >
            <span className="text-white/60 select-none">$</span>
            {pillar.cta}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group card-base px-5 py-4 open:border-blue-core/25 transition-all">
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display font-semibold text-text-primary text-[15px]">
        {q}
        <span className="text-blue-light transition-transform duration-300 group-open:rotate-45 text-xl leading-none shrink-0">
          +
        </span>
      </summary>
      <p className="mt-3 text-sm text-text-secondary leading-relaxed">{a}</p>
    </details>
  )
}

export default function ServiceLanding() {
  return (
    <main className="pt-20">
      {/* Cover band + profile header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-core/20 via-bg-void to-purple-500/10 animate-aurora pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-transparent to-bg-void pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-6">
          <ScrollReveal direction="none">
            <div className="card-base p-6 sm:p-8 border-blue-core/10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-core to-blue-light flex items-center justify-center text-bg-void font-display font-bold text-3xl ring-4 ring-bg-void shrink-0 glow-blue">
                    {data.personal.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="md:hidden">
                    <h1 className="font-display font-bold text-2xl text-text-primary leading-tight">
                      {data.personal.name}
                    </h1>
                    <p className="text-sm text-blue-light font-medium mt-0.5">
                      Full-Stack Web Developer &amp; System Architect · SEO &amp; AEO
                    </p>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="hidden md:block font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
                    {data.personal.name}
                  </h1>
                  <p className="hidden md:block text-base text-blue-light font-medium mt-1">
                    Full-Stack Web Developer &amp; System Architect · SEO &amp; AEO
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={15} className="text-blue-light" />
                      {data.personal.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-live animate-pulse-dot" />
                      Open to freelance &amp; full-time
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
                  <MagneticButton as="a" href={cta.primaryHref} strength={0.15}>
                    <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-core text-white text-sm font-semibold rounded-lg hover:bg-blue-core/90 transition-colors whitespace-nowrap">
                      {cta.primaryLabel}
                    </span>
                  </MagneticButton>
                  <MagneticButton as="a" href={cta.secondaryHref} strength={0.15}>
                    <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-panel-border text-text-primary text-sm font-medium rounded-lg hover:bg-white/[0.03] hover:border-blue-core/20 transition-colors whitespace-nowrap">
                      {cta.secondaryLabel}
                    </span>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="terminal-divider mx-6" />

      {/* About / intro */}
      <SectionTransition className="py-16 relative gradient-mesh">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-3 block">
                  About
                </span>
                <h2 className="font-display font-semibold text-xl text-text-primary mb-3">
                  What I do
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  I build production web applications end-to-end — Laravel, Django,
                  React, and Next.js — from schema design to the servers they run on:
                  e-commerce, SaaS, marketplaces, APIs, and admin systems. Then I help
                  those products get found, by search engines <em>and</em> by AI answer
                  engines, and make them faster, more secure, and better at converting.
                  Custom builds when you need them, no-code solutions when you don&apos;t.
                </p>
              </div>
              <div className="lg:col-span-4">
                <div className="card-base p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                    <GearSix size={16} className="text-blue-light" />
                    Two engines, one strategy
                  </div>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <span className="font-semibold text-text-primary">Google &amp; Bing</span>{' '}
                      — classic SEO that ranks.
                    </p>
                    <p>
                      <span className="font-semibold text-text-primary">AI Overviews, ChatGPT &amp; Perplexity</span>{' '}
                      — AEO that makes you the cited answer.
                    </p>
                  </div>
                  <a
                    href="/answers"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-blue-light hover:text-white transition-colors"
                  >
                    See how I answer questions <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionTransition>

      <div className="terminal-divider mx-6" />

      {/* Services */}
      <SectionTransition id="services" className="py-16 relative terminal-grid">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">
                Services
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
            </div>
            <TerminalPrompt command="ls ~/services --all" className="mb-4" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-text-primary mb-2">
              What I provide
            </h2>
            <p className="text-text-secondary max-w-xl mb-10">
              Build it with custom engineering, then grow it with search and AI
              visibility — or use either one on its own.
            </p>
          </ScrollReveal>

          {serviceGroups.map((group, groupIdx) => (
            <div key={group.id} className={groupIdx > 0 ? 'mt-14' : ''}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">
                    {group.label}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
                </div>
                <TerminalPrompt command={group.terminal} className="mb-4" />
                <h3 className="text-2xl font-display font-semibold text-text-primary mb-2">
                  {group.heading}
                </h3>
                <p className="text-text-secondary max-w-xl mb-8">{group.sub}</p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.pillars.map((pillar, idx) => (
                  <ScrollReveal key={pillar.title} delay={(idx % 2) * 0.08}>
                    <PillarCard
                      pillar={pillar}
                      badge={group.id === 'grow' && idx === 0 ? 'Search & AI' : undefined}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionTransition>

      <div className="terminal-divider mx-6" />

      {/* How it works */}
      <SectionTransition className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">
                Process
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
            </div>
            <TerminalPrompt command="cat /etc/services.process" className="mb-4" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-text-primary mb-2">
              How it works
            </h2>
            <p className="text-text-secondary max-w-xl mb-12">
              A simple, transparent process — you always know what happens next.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, idx) => (
              <ScrollReveal key={step.step} delay={idx * 0.08}>
                <div className="card-base p-6 h-full group hover:border-blue-core/20 hover:shadow-lg hover:shadow-blue-core/5 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-core/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="relative">
                    <span className="text-[11px] font-mono text-blue-light font-semibold">
                      STEP {step.step}
                    </span>
                    <h3 className="font-display font-semibold text-base text-text-primary mt-2 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Stats band */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {stats.map((stat, idx) => (
              <ScrollReveal key={stat.label} delay={idx * 0.05}>
                <div className="text-center lg:text-left">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted mt-1">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionTransition>

      <div className="terminal-divider mx-6" />

      {/* FAQ */}
      <SectionTransition className="py-16 relative bg-panel-bg/20 terminal-grid">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">
                FAQ
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
            </div>
            <TerminalPrompt command="cat faq.log" className="mb-4" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-text-primary mb-2">
              Common questions
            </h2>
            <p className="text-text-secondary max-w-xl mb-10">
              The things people ask before starting a project.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <ScrollReveal key={faq.q} delay={(idx % 2) * 0.08}>
                <FaqItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionTransition>

      <div className="terminal-divider mx-6" />

      {/* CTA band */}
      <SectionTransition id="cta" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-core/8 via-bg-void to-purple-500/5 animate-aurora pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-transparent to-bg-void pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal direction="none">
            <TerminalPrompt command='echo $OFFER' className="justify-center mb-6" />
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-text-primary mb-4 leading-tight">
                {cta.heading}
              </h2>
              <p className="text-body-lg text-text-secondary max-w-md mx-auto mb-8">
                {cta.subheading}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <MagneticButton as="a" href={cta.primaryHref} strength={0.15}>
                  <span className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-blue-core text-white text-sm font-semibold rounded-lg hover:bg-blue-core/90 transition-all animate-pulse-glow whitespace-nowrap">
                    <Calendar size={16} />
                    {cta.primaryLabel}
                  </span>
                </MagneticButton>
                <MagneticButton as="a" href={cta.secondaryHref} strength={0.15}>
                  <span className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-panel-border text-text-primary text-sm font-medium rounded-lg hover:bg-white/[0.03] hover:border-blue-core/20 transition-colors whitespace-nowrap">
                    <EnvelopeSimple size={16} />
                    {cta.secondaryLabel}
                  </span>
                </MagneticButton>
              </div>
              <div className="flex items-center justify-center gap-4 mt-8 text-text-muted text-sm">
                <a
                  href="https://www.linkedin.com/in/rojit-pokharel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-light transition-colors"
                >
                  <LinkedinLogo size={16} /> LinkedIn
                </a>
                <span className="text-panel-border">|</span>
                <a
                  href="https://rojitpokharel.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-light transition-colors"
                >
                  Portfolio <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionTransition>

      {/* small print */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <p className="text-xs text-text-muted font-mono">
          Ready to build something — or just want an honest second opinion on your
          current site? The audit is free. The advice is straight.
        </p>
      </div>
    </main>
  )
}
