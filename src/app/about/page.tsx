import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import TerminalPrompt from '@/components/TerminalPrompt'
import ScrollReveal from '@/components/ScrollReveal'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData

const SITE_URL = 'https://portfolio.rojitpokharel.com.np'

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: { '@id': `${SITE_URL}/#person` },
}

function SectionHeading({ eyebrow, command }: { eyebrow: string; command: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">{eyebrow}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
      </div>
      <TerminalPrompt command={command} />
    </div>
  )
}

const specializations = [
  {
    title: 'Full-Stack Web Application Development',
    detail: 'Production web applications built with Laravel, Django, React, and Next.js — from database schema to deployed product.',
  },
  {
    title: 'System Architecture & Infrastructure',
    detail: 'Scalable architecture design, Docker multi-container deployments, Nginx reverse proxying, Linux server management, and CI/CD pipelines.',
  },
  {
    title: 'Real-Time Systems & WebSockets',
    detail: 'Live kitchen displays, chat systems, and dashboards built on Laravel Reverb and Django Channels with Redis.',
  },
  {
    title: 'Payment Gateway Integration',
    detail: 'Khalti, eSewa, ConnectIPS, and Stripe integration with webhook reconciliation and multi-gateway routing.',
  },
  {
    title: 'AI/ML & Computer Vision',
    detail: 'Object detection and player tracking with YOLO and OpenCV, plus LLM integration and AI-assisted document analysis.',
  },
  {
    title: 'Production DevOps',
    detail: 'Monitoring, queue workers, automated reporting, and the operational tooling that keeps applications running in production.',
  },
]

const stackByCategory = data.skills.categories.map((category) => ({
  title: category.title,
  technologies: category.technologies,
}))

export default function AboutPage() {
  return (
    <main className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
        />

        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About Rojit Pokharel' }]} />

        <ScrollReveal>
          <header className="max-w-3xl mb-16">
            <span className="label text-blue-light mb-4 block">About</span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-4">
              Rojit Pokharel
            </h1>
            <p className="font-display text-lg md:text-xl text-text-primary mb-3">
              Full-Stack Web Developer &amp; System Architect
            </p>
            <p className="text-sm font-mono text-text-secondary mb-5">
              <span className="text-green-live">●</span> Kathmandu, Nepal
            </p>
            <p className="text-body-lg text-text-secondary leading-relaxed">
              I design, build, and ship production web applications end-to-end — from database
              schema and API architecture to the frontend experience and the Linux servers that
              keep them running. This page is the canonical source of who I am, what I do, and
              why I am credible.
            </p>
          </header>
        </ScrollReveal>

        {/* Who is Rojit Pokharel? */}
        <ScrollReveal className="mb-16">
          <SectionHeading eyebrow="Who is Rojit Pokharel?" command="cat whoami.md" />
          <div className="space-y-4 text-body-md text-text-secondary leading-relaxed max-w-3xl">
            <p>
              Rojit Pokharel is a <strong className="text-text-primary">Full-Stack Web Developer and System Architect</strong>{' '}
              from Kathmandu, Nepal. He is a full-stack developer at{' '}
              <strong className="text-text-primary">Infinity Digital Agency</strong>, where he builds
              production client applications across e-commerce, travel, education, insurance, and
              restaurant domains.
            </p>
            <p>
              Beyond client work, he has built computer vision pipelines, server monitoring tools
              in Go, and AI/ML systems — giving him a full-stack view that goes beyond any single
              framework. He owns the full delivery lifecycle: schema design, API architecture,
              frontend development, and production deployment including the infrastructure
              underneath.
            </p>
          </div>
        </ScrollReveal>

        {/* What does Rojit Pokharel specialize in? */}
        <ScrollReveal className="mb-16">
          <SectionHeading eyebrow="Specializations" command="ls ~/expertise" />
          <div className="grid md:grid-cols-2 gap-4">
            {specializations.map((spec) => (
              <div key={spec.title} className="card-base p-5">
                <h3 className="font-display font-semibold text-text-primary mb-2">{spec.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{spec.detail}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Technology stack */}
        <ScrollReveal className="mb-16">
          <SectionHeading eyebrow="Technology Stack" command="cat stack.txt" />
          <div className="grid md:grid-cols-2 gap-4">
            {stackByCategory.map((category) => (
              <div key={category.title} className="card-base p-5">
                <h3 className="font-display font-semibold text-text-primary mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.technologies.map((tech) => (
                    <li key={tech.name} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-text-primary">{tech.name}</span>
                      <span className="text-[11px] font-mono text-text-muted">{tech.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Web applications built */}
        <ScrollReveal className="mb-16">
          <SectionHeading eyebrow="Web Applications Built by Rojit Pokharel" command="ls ~/projects" />
          <div className="grid md:grid-cols-2 gap-4">
            {data.projects.items.map((project) => (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                className="card-base p-5 group hover:border-blue-core/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="font-display font-semibold text-text-primary mb-1.5 group-hover:text-blue-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[11px] font-mono bg-white/[0.03] text-text-muted rounded-md border border-panel-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Professional experience */}
        <ScrollReveal className="mb-16">
          <SectionHeading eyebrow="Professional Experience" command="cat experience.md" />
          <div className="space-y-4">
            {data.experience.roles.map((role, index) => (
              <div key={`${role.title}-${role.company}-${index}`} className="card-base p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-display font-semibold text-text-primary">{role.title}</h3>
                  <span className="text-[11px] font-mono text-text-muted">{role.period}</span>
                </div>
                <p className="text-sm text-blue-light mb-3">
                  {role.company} · {role.location}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{role.description}</p>
                <ul className="space-y-1.5">
                  {role.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                      <span className="text-blue-core mt-1 shrink-0">›</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Education */}
        <ScrollReveal className="mb-16">
          <SectionHeading eyebrow="Education" command="cat education.md" />
          <div className="grid md:grid-cols-2 gap-4">
            {data.experience.education.map((edu) => (
              <div key={`${edu.degree}-${edu.institution}`} className="card-base p-5">
                <h3 className="font-display font-semibold text-text-primary mb-1">{edu.degree}</h3>
                <p className="text-sm text-blue-light mb-1">{edu.institution}</p>
                <p className="text-[11px] font-mono text-text-muted">{edu.period} · {edu.location}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Achievements */}
        <ScrollReveal className="mb-16">
          <SectionHeading eyebrow="Achievements" command="cat awards.md" />
          <ul className="space-y-2.5">
            {data.experience.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-3 text-body-sm text-text-secondary leading-relaxed">
                <span className="text-blue-core mt-1.5 shrink-0">›</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Open source & technical writing */}
        <ScrollReveal className="mb-16">
          <SectionHeading eyebrow="Open Source & Technical Writing" command="cat oss.log" />
          <div className="space-y-4">
            <div className="card-base p-5">
              <h3 className="font-display font-semibold text-text-primary mb-2">Server Monitoring Tool (Go)</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                An open-source website uptime monitoring tool built in Go with multi-site health
                checks, Slack alerts, and Prometheus metrics. See the full write-up:{' '}
                <Link href="/blog/server-monitoring-tool-uptime-monitoring" className="text-blue-light hover:underline">
                  Server Monitoring Tool
                </Link>
                .
              </p>
              <a
                href="https://github.com/rojeets/ServerMonitorTool"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-light hover:underline"
              >
                github.com/rojeets/ServerMonitorTool ↗
              </a>
            </div>
            <div className="card-base p-5">
              <h3 className="font-display font-semibold text-text-primary mb-2">Technical Writing</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                I write first-hand engineering articles about production systems — real-time
                applications, Docker deployments, payment gateways in Nepal, and full-stack
                architecture. Explore them on the{' '}
                <Link href="/blog" className="text-blue-light hover:underline">blog</Link>.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal>
          <div className="card-base p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-core/8 via-transparent to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-3">
                Contact Rojit Pokharel
              </h2>
              <p className="text-body-md text-text-secondary mb-6 max-w-xl mx-auto">
                Open to freelance projects and full-time opportunities building production-grade
                web applications. Reach out via the contact page or email{' '}
                <a href="mailto:info@rojitpokharel.com.np" className="text-blue-light hover:underline">
                  info@rojitpokharel.com.np
                </a>
                .
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-core text-white text-sm font-semibold rounded-lg hover:bg-blue-core/90 transition-all"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/answers"
                  className="inline-flex items-center justify-center px-6 py-3 border border-panel-border text-text-primary text-sm font-medium rounded-lg hover:bg-white/[0.03] transition-all"
                >
                  Read the Answers
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
