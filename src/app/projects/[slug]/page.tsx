import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScrollReveal from '@/components/ScrollReveal'
import TerminalPrompt from '@/components/TerminalPrompt'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData, Project, BlogPost } from '@/lib/types'

const data = portfolioData as PortfolioData
const SITE_URL = 'https://portfolio.rojitpokharel.com.np'

export function generateStaticParams() {
  return data.projects.items.map((project: Project) => ({ slug: project.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = data.projects.items.find((p: Project) => p.slug === slug)
  if (!project) return { title: 'Project not found' }

  const techKeywords = project.tech.join(', ')
  const description = project.caseStudy
    ? `${project.title} — technical case study by Rojit Pokharel. ${project.description} ${techKeywords}.`
    : project.description

  return {
    title: `${project.title} — Technical Case Study`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} — Built by Rojit Pokharel`,
      description,
      url: `/projects/${project.slug}`,
      images: [{ url: '/images/og-image.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Built by Rojit Pokharel`,
      description,
      images: ['/images/og-image.jpg'],
    },
  }
}

const TIER_ORDER = ['Frontend', 'Application', 'Real-time', 'Payments', 'Data', 'AI/ML', 'Infrastructure'] as const

const TIER_MAP: Record<string, string> = {
  React: 'Frontend',
  'Next.js': 'Frontend',
  'React Native': 'Frontend',
  Expo: 'Frontend',
  Livewire: 'Frontend',
  Laravel: 'Application',
  Django: 'Application',
  Flask: 'Application',
  DRF: 'Application',
  Filament: 'Application',
  Celery: 'Application',
  'Cohere Vision': 'Application',
  Go: 'Application',
  Python: 'Application',
  PHP: 'Application',
  Reverb: 'Real-time',
  'Django Channels': 'Real-time',
  WebSockets: 'Real-time',
  Khalti: 'Payments',
  eSewa: 'Payments',
  Stripe: 'Payments',
  MySQL: 'Data',
  PostgreSQL: 'Data',
  Redis: 'Data',
  YOLOv5: 'AI/ML',
  YOLOv8: 'AI/ML',
  OpenCV: 'AI/ML',
  SORT: 'AI/ML',
  Gemini: 'AI/ML',
  'Google Gemini': 'AI/ML',
  PyTorch: 'AI/ML',
  Docker: 'Infrastructure',
  Nginx: 'Infrastructure',
  Linux: 'Infrastructure',
  Prometheus: 'Infrastructure',
  'AWS S3': 'Infrastructure',
  'CI/CD': 'Infrastructure',
  PM2: 'Infrastructure',
  Supervisor: 'Infrastructure',
  Certbot: 'Infrastructure',
}

function tierFor(tech: string): string {
  return TIER_MAP[tech] ?? 'Application'
}

function StackDiagram({ tech }: { tech: string[] }) {
  const tiers = TIER_ORDER.map((tier) => ({
    tier,
    tech: tech.filter((t) => tierFor(t) === tier),
  })).filter((t) => t.tech.length > 0)

  return (
    <div className="card-base p-5">
      <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-4">
        Stack diagram
      </p>
      <div className="space-y-2">
        {tiers.map(({ tier, tech }) => (
          <div key={tier} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-[10px] font-mono uppercase tracking-wider text-blue-light">
              {tier}
            </span>
            <div className="flex-1 flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span key={t} className="px-2 py-0.5 text-[11px] font-mono bg-white/[0.03] text-text-primary rounded-md border border-panel-border">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CodeBlock({ code }: { code: NonNullable<Project['caseStudy']>['code'] }) {
  if (!code) return null
  return (
    <div className="card-base overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-panel-border">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-live/60" />
        </div>
        <span className="text-[11px] font-mono text-text-muted ml-2">{code.caption}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed font-mono text-text-secondary">
        <code>{code.lines.join('\n')}</code>
      </pre>
    </div>
  )
}

function Section({ title, command, items, accent }: { title: string; command: string; items: string[]; accent?: boolean }) {
  if (!items || items.length === 0) return null
  return (
    <ScrollReveal className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">{title}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
      </div>
      <TerminalPrompt command={command} className="mb-5" />
      <ul className={`space-y-2.5 ${accent ? 'max-w-3xl' : ''}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-body-sm text-text-secondary leading-relaxed">
            <span className="text-blue-core mt-1.5 shrink-0">›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </ScrollReveal>
  )
}

function relatedPosts(project: Project): BlogPost[] {
  const projectTech = new Set(project.tech.map((t) => t.toLowerCase()))
  return data.blog.items
    .map((post) => {
      const score = post.tags.filter((tag) => projectTech.has(tag.toLowerCase())).length
      return { post, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.post)
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = data.projects.items.find((p: Project) => p.slug === slug)
  if (!project) notFound()

  const cs = project.caseStudy

  const articleJsonLd = cs
    ? {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${SITE_URL}/projects/${project.slug}#article`,
        mainEntityOfPage: `${SITE_URL}/projects/${project.slug}`,
        headline: `${project.title} — Technical Case Study`,
        description: project.description,
        image: `${SITE_URL}/images/og-image.jpg`,
        datePublished: `${cs.year}-01-01`,
        dateModified: `${cs.year}-01-01`,
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#person` },
        keywords: [...project.tech, 'case study'].join(', '),
        about: {
          '@type': 'SoftwareApplication',
          name: project.title,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: project.description,
        },
      }
    : null

  const posts = relatedPosts(project)

  return (
    <main className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {articleJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />
        )}

        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Projects', href: '/projects' }, { name: project.title }]} />

        {/* Header */}
        <ScrollReveal>
          <header className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono text-green-live flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-live animate-pulse-dot" />
                {project.metric}
              </span>
              {cs?.year && <span className="text-[11px] font-mono text-text-muted">· {cs.year}</span>}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
              {project.description}
            </p>
            <p className="text-xs font-mono text-text-muted mb-6">
              Technical case study by Rojit Pokharel — Full-Stack Web Developer &amp; System Architect, Kathmandu, Nepal
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[11px] font-mono bg-white/[0.03] text-text-primary rounded-md border border-panel-border">
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </ScrollReveal>

        <StackDiagram tech={project.tech} />

        <div className="mt-12">
          {cs && (
            <>
              <Section title="Client / Problem" command="cat problem.md" items={cs.clientProblem} accent />
              {cs.client && (
                <p className="mb-8 -mt-6 text-sm text-text-muted font-mono">
                  Client: {cs.client}
                </p>
              )}
              <Section title="My Role" command="cat role.md" items={cs.role} />
              <Section title="Architecture" command="cat architecture.md" items={cs.architecture} />
              <Section title="Database Design" command="cat schema.sql" items={cs.databaseDesign} />
              <Section title="API Architecture" command="cat api.md" items={cs.apiArchitecture} />
              {cs.code && (
                <ScrollReveal className="mb-12">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Code</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
                  </div>
                  <CodeBlock code={cs.code} />
                </ScrollReveal>
              )}
              <Section title="Authentication" command="cat auth.md" items={cs.authentication} />
              <Section title="Real-time Systems" command="cat realtime.md" items={cs.realTime ?? []} />
              <Section title="Payment Architecture" command="cat payments.md" items={cs.payments ?? []} />
              <Section title="Deployment" command="cat deploy.sh" items={cs.deployment} />
              <Section title="Performance Optimization" command="cat perf.md" items={cs.performance} />
              <Section title="Problems Encountered" command="cat errors.log" items={cs.problems} />
              <Section title="How I Solved Them" command="cat fixes.md" items={cs.solutions} />
              <Section title="Results" command="cat metrics.md" items={cs.results} accent />
              <Section title="Lessons Learned" command="cat lessons.md" items={cs.lessons} />
            </>
          )}
        </div>

        {/* Related reading */}
        <ScrollReveal className="mt-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Related Reading</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card-base p-5 group hover:border-blue-core/20 transition-all duration-300">
                  <p className="text-[11px] font-mono text-blue-light mb-2">{post.tags[0]}</p>
                  <h3 className="font-display font-semibold text-text-primary mb-1.5 group-hover:text-blue-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </Link>
              ))}
              <Link href="/answers" className="card-base p-5 group hover:border-blue-core/20 transition-all duration-300">
                <p className="text-[11px] font-mono text-blue-light mb-2">Answers</p>
                <h3 className="font-display font-semibold text-text-primary mb-1.5 group-hover:text-blue-light transition-colors">
                  Read the Answers
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Direct answers to questions about Rojit Pokharel and the technologies used across these projects.
                </p>
              </Link>
            </div>
          </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="mt-16">
          <div className="card-base p-8 text-center">
            <h2 className="text-xl md:text-2xl font-display font-semibold text-text-primary mb-3">
              Want a production system like this?
            </h2>
            <p className="text-body-md text-text-secondary mb-6 max-w-xl mx-auto">
              I build production web applications end-to-end. Let&apos;s discuss your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-core text-white text-sm font-semibold rounded-lg hover:bg-blue-core/90 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
