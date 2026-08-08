import Link from 'next/link'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowUpRight, CheckCircle } from '@/components/Icons'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScrollReveal from '@/components/ScrollReveal'
import SectionTransition from '@/components/SectionTransition'
import TerminalPrompt from '@/components/TerminalPrompt'
import ContactForm from '@/components/ContactForm'
import { pillarIcons } from '@/components/ServiceIcons'
import { serviceGroups, processSteps, cta } from '@/data/services'
import type { ServiceGroup, ServicePillar } from '@/data/services'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const SITE_URL = 'https://portfolio.rojitpokharel.com.np'

const data = portfolioData as PortfolioData

const allServices: { group: ServiceGroup; pillar: ServicePillar }[] = serviceGroups.flatMap((group) =>
  group.pillars.map((pillar) => ({ group, pillar })),
)

function findBySlug(slug: string) {
  return allServices.find((s) => s.pillar.slug === slug)
}

export function generateStaticParams() {
  return allServices.map(({ pillar }) => ({ slug: pillar.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const found = findBySlug(slug)

  if (!found) {
    return { title: 'Service not found' }
  }

  const { group, pillar } = found
  const title = `${pillar.title} — ${group.heading}`
  const url = `/services/${pillar.slug}`

  return {
    title,
    description: `${pillar.description} Deliverables: ${pillar.deliverables.join(', ')}. By Rojit Pokharel, Kathmandu, Nepal.`,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: `${pillar.title} | Services | Rojit Pokharel`,
      description: pillar.description,
      url,
      images: [{ url: '/images/og-image.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pillar.title} | Rojit Pokharel`,
      description: pillar.description,
      images: ['/images/og-image.jpg'],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = findBySlug(slug)
  if (!found) notFound()

  const { group, pillar } = found
  const Icon = pillarIcons[pillar.icon]
  const siblings = group.pillars.filter((p) => p.slug !== pillar.slug)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${pillar.slug}#service`,
    name: `${pillar.title} — ${group.heading}`,
    description: pillar.description,
    serviceType: pillar.title,
    areaServed: { '@type': 'City', name: 'Kathmandu', addressCountry: 'NP' },
    provider: { '@id': `${SITE_URL}/#person` },
    url: `${SITE_URL}/services/${pillar.slug}`,
  }

  return (
    <main className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />

        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services' },
            { name: pillar.title },
          ]}
        />

        {/* Header */}
        <ScrollReveal>
          <header className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono text-blue-light flex items-center gap-2 uppercase tracking-wider">
                <Icon size={13} />
                {group.label} · {group.terminal.replace('ls ~/services ', '')}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4">
              {pillar.title}
            </h1>
            <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">
              {pillar.subtitle}
            </p>
            <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
              {pillar.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pillar.deliverables.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 text-[11px] font-mono bg-white/[0.03] text-text-primary rounded-md border border-panel-border"
                >
                  {d}
                </span>
              ))}
            </div>
          </header>
        </ScrollReveal>

        <TerminalPrompt command={`cat ~/services/${pillar.slug}.yml`} className="mb-10" />

        {/* What's included */}
        <ScrollReveal className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">
              What&apos;s included
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <div className="card-base p-6">
            <ul className="grid sm:grid-cols-1 gap-3 max-w-3xl">
              {pillar.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-body-sm text-text-secondary leading-relaxed">
                  <CheckCircle size={17} className="text-blue-light shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Process */}
        <SectionTransition className="relative py-14 terminal-grid">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">
              How it works
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <TerminalPrompt command="cat /etc/services.process" className="mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step) => (
              <ScrollReveal key={step.step} delay={Number(step.step) * 0.05}>
                <div className="card-base p-5 h-full">
                  <span className="text-[11px] font-mono text-blue-light font-semibold">
                    STEP {step.step}
                  </span>
                  <h3 className="font-display font-semibold text-sm text-text-primary mt-2 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionTransition>

        {/* More services in this group */}
        <ScrollReveal className="mt-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">
              More {group.label} services
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {siblings.map((s) => {
              const SIcon = pillarIcons[s.icon]
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="card-base p-5 group hover:border-blue-core/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-9 h-9 rounded-lg bg-blue-core/10 flex items-center justify-center text-blue-light shrink-0">
                      <SIcon size={18} />
                    </span>
                    <h3 className="font-display font-semibold text-text-primary group-hover:text-blue-light transition-colors">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">{s.description}</p>
                </Link>
              )
            })}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="mt-16" id="cta">
          <div className="card-base relative overflow-hidden glow-blue">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-panel-border bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-text-muted truncate">
                contact.sh --service {pillar.slug}
              </span>
            </div>

            <div className="p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-core/15 via-bg-void to-purple-500/5 animate-aurora pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-transparent to-bg-void pointer-events-none" />

              <div className="relative max-w-2xl mx-auto">
                <TerminalPrompt command="echo $OFFER" className="justify-center mb-4" />

                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-live/15 bg-green-live/5 text-xs font-mono text-green-live">
                    <span className="w-2 h-2 rounded-full bg-green-live animate-pulse-dot" />
                    {data.personal.availability}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-3 text-center leading-tight">
                  {cta.heading}
                </h2>
                <p className="text-body-md text-text-secondary mb-3 max-w-xl mx-auto text-center">
                  {cta.subheading}
                </p>
                <p className="text-center text-sm text-blue-light mb-8">
                  Let&apos;s talk {pillar.title.toLowerCase()} — the audit is free, the advice is
                  straight.
                </p>

                <Suspense
                  fallback={
                    <div className="card-base p-8 text-center text-sm text-text-muted">
                      Loading form…
                    </div>
                  }
                >
                  <ContactForm service={pillar.slug} />
                </Suspense>

                <p className="mt-5 text-center text-xs font-mono text-text-muted">
                  Free audit · Response within 24 hours · No obligation
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue-light transition-colors"
          >
            View all services <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  )
}
