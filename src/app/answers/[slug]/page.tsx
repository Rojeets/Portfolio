import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScrollReveal from '@/components/ScrollReveal'
import { answers } from '@/data/answers'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData
const SITE_URL = 'https://portfolio.rojitpokharel.com.np'

export function generateStaticParams() {
  return answers.map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const answer = answers.find((a) => a.slug === slug)
  if (!answer) return { title: 'Answer not found' }

  return {
    title: answer.question,
    description: answer.shortAnswer,
    alternates: { canonical: `/answers/${answer.slug}` },
    openGraph: {
      type: 'article',
      title: `${answer.question} | Rojit Pokharel`,
      description: answer.shortAnswer,
      url: `/answers/${answer.slug}`,
      images: [{ url: '/images/og-image.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${answer.question} | Rojit Pokharel`,
      description: answer.shortAnswer,
      images: ['/images/og-image.jpg'],
    },
  }
}

function projectBySlug(slug: string) {
  return data.projects.items.find((p) => p.slug === slug)
}

function postBySlug(slug: string) {
  return data.blog.items.find((p) => p.slug === slug)
}

export default async function AnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const answer = answers.find((a) => a.slug === slug)
  if (!answer) notFound()

  const qaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: answer.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer.shortAnswer,
        author: { '@id': `${SITE_URL}/#person` },
      },
    },
  }

  const projects = (answer.relatedProjects ?? [])
    .map(projectBySlug)
    .filter((p): p is NonNullable<ReturnType<typeof projectBySlug>> => Boolean(p))
  const posts = (answer.relatedPosts ?? [])
    .map(postBySlug)
    .filter((p): p is NonNullable<ReturnType<typeof postBySlug>> => Boolean(p))

  return (
    <main className="pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }}
        />

        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Answers', href: '/answers' }, { name: answer.question }]} />

        <ScrollReveal>
          <header className="mb-8">
            <span className="label text-blue-light mb-4 block">
              {answer.category === 'about-roit' ? 'About Rojit Pokharel' : 'Technical Answer'}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
              {answer.question}
            </h1>
          </header>

          {/* Direct answer first */}
          <div className="card-base p-6 mb-8 border-blue-core/20">
            <p className="text-[11px] font-mono text-blue-light uppercase tracking-wider mb-3">Short answer</p>
            <p className="text-body-lg text-text-primary leading-relaxed">{answer.shortAnswer}</p>
          </div>

          {/* Detail */}
          <div className="space-y-5 text-body-md text-text-secondary leading-relaxed">
            {answer.answer.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>

        {/* Related links */}
        {(projects.length > 0 || posts.length > 0) && (
          <ScrollReveal className="mt-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Related</span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
            </div>
            <div className="space-y-3">
              {projects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="card-base p-4 flex items-center justify-between gap-4 group hover:border-blue-core/20 transition-all">
                  <div>
                    <p className="text-sm font-display font-semibold text-text-primary group-hover:text-blue-light transition-colors">{project.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{project.tech.slice(0, 4).join(' · ')}</p>
                  </div>
                  <span className="text-blue-light shrink-0">Case study →</span>
                </Link>
              ))}
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card-base p-4 flex items-center justify-between gap-4 group hover:border-blue-core/20 transition-all">
                  <div>
                    <p className="text-sm font-display font-semibold text-text-primary group-hover:text-blue-light transition-colors">{post.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{post.tags.slice(0, 3).join(' · ')}</p>
                  </div>
                  <span className="text-blue-light shrink-0">Article →</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal className="mt-12">
          <Link href="/answers" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue-light transition-colors">
            ← All answers
          </Link>
        </ScrollReveal>
      </div>
    </main>
  )
}
