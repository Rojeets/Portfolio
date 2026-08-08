import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScrollReveal from '@/components/ScrollReveal'
import TerminalPrompt from '@/components/TerminalPrompt'
import BlogContent from '@/components/BlogContent'
import { blogPosts } from '@/data/blog-posts'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData, BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'

const data = portfolioData as PortfolioData
const SITE_URL = 'https://portfolio.rojitpokharel.com.np'

export function generateStaticParams() {
  return data.blog.items.map((post: BlogPost) => ({ slug: post.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = data.blog.items.find((p: BlogPost) => p.slug === slug)

  if (!post) {
    return { title: 'Post not found' }
  }

  const title = post.title
  const description = post.excerpt
  const url = `/blog/${post.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      url,
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  }
}

function relatedPosts(post: BlogPost): BlogPost[] {
  return data.blog.items
    .filter((p: BlogPost) => p.slug !== post.slug)
    .map((p: BlogPost) => {
      const score = p.tags.filter((tag) => post.tags.includes(tag)).length
      return { post: p, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.post)
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = data.blog.items.find((p: BlogPost) => p.slug === slug)
  const content = blogPosts[slug]

  if (!post || !content) {
    notFound()
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    keywords: post.tags.join(', '),
  }

  const related = relatedPosts(post)

  return (
    <main className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: post.title }]} />

        {/* Header */}
        <ScrollReveal>
          <header className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono text-green-live flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-live animate-pulse-dot" />
                {post.readTime}
              </span>
              <span className="text-[11px] font-mono text-text-muted">· {formatDate(post.date)}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4">
              {post.title}
            </h1>
            <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <p className="text-xs font-mono text-text-muted mb-6">
              Written by Rojit Pokharel — Full-Stack Web Developer &amp; System Architect, Kathmandu, Nepal
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-mono bg-white/[0.03] text-text-primary rounded-md border border-panel-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </ScrollReveal>

        {/* Cover image */}
        <ScrollReveal>
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-10 bg-panel-bg border border-panel-border">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>
        </ScrollReveal>

        <TerminalPrompt command={`cat posts/${post.slug}.json`} className="mb-8" />

        {/* Body */}
        <ScrollReveal>
          <article className="max-w-3xl">
            <BlogContent sections={content.sections} />
          </article>
        </ScrollReveal>

        {/* Related reading */}
        <ScrollReveal className="mt-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Related Reading</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card-base p-5 group hover:border-blue-core/20 transition-all duration-300"
              >
                <p className="text-[11px] font-mono text-blue-light mb-2">{p.tags[0]}</p>
                <h3 className="font-display font-semibold text-text-primary mb-1.5 group-hover:text-blue-light transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">{p.excerpt}</p>
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
              Building a product like this?
            </h2>
            <p className="text-body-md text-text-secondary mb-6 max-w-xl mx-auto">
              I build production web applications end-to-end — custom code, real-time systems, and deployments.
              Let&apos;s discuss your project.
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
