'use client'
import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData, BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'

const data = portfolioData as PortfolioData

export default function BlogPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <span className="label text-blue-light mb-4 block">Blog</span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-4">
              {data.blog.sectionTitle}
            </h1>
            <p className="text-body-lg text-text-secondary">
              {data.blog.sectionSubtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="grid md:grid-cols-2 gap-5" stagger={0.1}>
          {data.blog.items.map((post: BlogPost) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <article className="card-blog group hover:border-blue-core/20 transition-all duration-300 h-full flex flex-col cursor-pointer">
                <div className="relative h-44 overflow-hidden bg-panel-bg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <time className="text-[11px] font-mono text-text-muted">{formatDate(post.date)}</time>
                    <span className="text-[11px] font-mono text-text-muted">{post.readTime}</span>
                  </div>
                  <h2 className="text-base font-display font-semibold mb-1.5 group-hover:text-blue-light transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[11px] font-mono bg-white/[0.03] text-text-muted rounded-md border border-panel-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </ScrollReveal>
      </div>
    </main>
  )
}
