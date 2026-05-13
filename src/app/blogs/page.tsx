'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { posts } from '../../data/blogs.json'

export default function Blogs() {
  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      <main className="pt-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Thoughts on software engineering, architecture patterns, and lessons learned from building production systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="group block glass-effect border border-accent/10 rounded-xl overflow-hidden card-hover h-full"
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-zinc-400">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white group-hover:text-neon transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-accent text-sm font-medium group-hover:translate-x-2 transition-transform">
                    Read more →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
