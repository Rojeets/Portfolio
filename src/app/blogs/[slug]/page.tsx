'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { posts } from '../../../data/blogs.json'

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-300 mb-4">Post not found</h1>
          <Link href="/blogs" className="text-accent hover:text-neon transition-colors">
            ← Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      <main className="pt-24 px-6 max-w-3xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-neon transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover opacity-50"
            />
          </div>

          <div className="prose prose-invert max-w-none">
            <style jsx global>{`
              .prose h2 {
                @apply text-2xl font-bold text-white mt-10 mb-4;
              }
              .prose h3 {
                @apply text-xl font-bold text-white mt-8 mb-3;
              }
              .prose p {
                @apply text-zinc-300 leading-relaxed mb-6;
              }
              .prose code {
                @apply text-sm bg-secondary px-2 py-0.5 rounded text-accent font-mono;
              }
              .prose pre {
                @apply bg-secondary border border-accent/10 rounded-lg p-4 mb-6 overflow-x-auto;
              }
              .prose pre code {
                @apply bg-transparent p-0 text-zinc-300;
              }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="mt-12 pt-8 border-t border-accent/10">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-accent hover:text-neon transition-colors"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
