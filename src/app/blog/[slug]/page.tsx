'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from '@/components/Icons'
import { use } from 'react'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData, BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'

const data = portfolioData as PortfolioData

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = data.blog.items.find((p: BlogPost) => p.slug === slug)

  if (!post) {
    return (
      <main className="pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-display font-semibold mb-4">Post not found</h1>
          <Link href="/blog" className="text-blue-light text-sm hover:underline">
            Back to blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-24">
      <article className="max-w-3xl mx-auto px-6">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue-light transition-colors mb-8"
          >
            <ArrowLeft size={14} /> All posts
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <time className="text-[11px] font-mono text-text-muted">{formatDate(post.date)}</time>
            <span className="text-[11px] font-mono text-text-muted">{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs font-mono bg-white/[0.03] text-text-muted rounded-md border border-panel-border">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-10 bg-panel-bg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="mb-6">
          <p className="text-body-md text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="bg-panel-bg/30 border border-panel-border rounded-xl p-8 text-center">
          <p className="text-sm text-text-muted">
            Full article content coming soon. Check back later for the complete post.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-panel-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue-light transition-colors"
          >
            <ArrowLeft size={14} /> Back to all posts
          </Link>
        </div>
      </article>
    </main>
  )
}
