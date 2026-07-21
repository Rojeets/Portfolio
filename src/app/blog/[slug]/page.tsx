import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from '@/components/Icons'
import CopyButton from '@/components/CopyButton'
import { compileMDX } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import fs from 'fs/promises'
import path from 'path'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData, BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

const data = portfolioData as PortfolioData

function Pre({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>) {
  const codeEl = children as React.ReactElement<{ children?: string }>
  const text = typeof codeEl?.props?.children === 'string' ? codeEl.props.children : ''

  return (
    <div className="relative group">
      <CopyButton text={text} />
      <pre {...props} className="overflow-x-auto">{children}</pre>
    </div>
  )
}

const components = { pre: Pre }

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-invert prose-headings:font-display prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-blue-light prose-strong:text-text-primary prose-code:text-blue-light prose-pre:bg-bg-panel prose-pre:border prose-pre:border-panel-border prose-pre:rounded-xl prose-td:text-text-secondary prose-th:text-text-primary max-w-none">
      {children}
    </div>
  )
}

async function getPostContent(slug: string) {
  const post = data.blog.items.find((p: BlogPost) => p.slug === slug)
  if (!post || !post.file) return null

  const filePath = path.join(/* turbopackIgnore: true */ process.cwd(), post.file)
  const raw = await fs.readFile(filePath, 'utf-8')
  const { content } = matter(raw)

  const { content: mdxContent } = await compileMDX({
    source: content,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
  })

  return { post, content: mdxContent }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getPostContent(slug)

  if (!result) {
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

  const { post, content } = result

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

        <Prose>{content}</Prose>

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
