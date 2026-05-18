'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { posts } from '../../../data/blogs.json'

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <h1 className="text-xl font-bold text-zinc-300 mb-3">Post not found</h1>
          <Link href="/blogs" className="text-sm text-accent hover:text-neon transition-colors">← Back to blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 px-6 min-h-screen bg-primary">
      <main className="max-w-3xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors mb-8 text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to blog
          </Link>

          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
            </div>
          </div>

          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-12 bg-secondary/80">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
            <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          </div>

          <article>
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className="mt-16 pt-8 border-t border-accent/10">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-neon transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to all posts
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
