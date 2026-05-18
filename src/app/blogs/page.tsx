'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react'
import { posts } from '../../data/blogs.json'
import data from '../../data/portfolio.json'

export default function Blogs() {
  const { blog } = data
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const reversedPosts = [...posts].reverse()
  const currentPost = reversedPosts[currentIndex]

  // Handle scroll to change featured blog
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle vertical scroll on the featured section
      if (!containerRef.current?.contains(e.target as Node)) return

      e.preventDefault()

      // Clear existing timeout
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

      // Determine direction based on scroll
      const isScrollingDown = e.deltaY > 0

      scrollTimeoutRef.current = setTimeout(() => {
        setDirection(isScrollingDown ? 1 : -1)
        setCurrentIndex((prev) => {
          if (isScrollingDown) {
            return (prev + 1) % reversedPosts.length
          } else {
            return (prev - 1 + reversedPosts.length) % reversedPosts.length
          }
        })
      }, 50)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [reversedPosts.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % reversedPosts.length)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + reversedPosts.length) % reversedPosts.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [reversedPosts.length])

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const nextPost = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % reversedPosts.length)
  }

  const prevPost = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + reversedPosts.length) % reversedPosts.length)
  }

  return (
    <div className="pt-24 px-6 relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${blog.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pb-24" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-neon rounded-full" />
        </motion.div>

        {/* Featured Blog Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Featured Image with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={currentIndex}
                src={currentPost.image}
                alt={currentPost.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>

          {/* Featured Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            key={`content-${currentIndex}`}
            className="flex flex-col justify-between h-full"
          >
            <div>
              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {currentPost.title}
              </h2>

              {/* Excerpt */}
              <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                {currentPost.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span>{new Date(currentPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>{currentPost.readTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {currentPost.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA and Navigation */}
            <div className="flex items-center gap-4 pt-8 border-t border-zinc-700">
              <Link
                href={`/blogs/${currentPost.slug}`}
                className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-accent to-neon text-black font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-accent/50"
              >
                Read Article
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Navigation Buttons */}
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={prevPost}
                  className="p-3 rounded-lg border border-zinc-600 hover:border-accent hover:bg-accent/10 transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:text-accent" />
                </button>
                <button
                  onClick={nextPost}
                  className="p-3 rounded-lg border border-zinc-600 hover:border-accent hover:bg-accent/10 transition-all group"
                >
                  <ChevronRight className="w-5 h-5 group-hover:text-accent" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Blog Counter and Progress */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent">{currentIndex + 1}</span>
            <span className="text-zinc-500">/</span>
            <span className="text-2xl font-bold text-zinc-500">{reversedPosts.length}</span>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 h-1 bg-zinc-700 rounded-full mx-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-neon"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / reversedPosts.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* All Blogs Grid */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold mb-10">All Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reversedPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={`/blogs/${post.slug}`}
                  className={`group block rounded-2xl overflow-hidden transition-all ${
                    currentIndex === idx
                      ? 'ring-2 ring-accent shadow-lg shadow-accent/20'
                      : 'hover:shadow-lg hover:shadow-accent/10'
                  }`}
                >
                  <div className="relative h-48 bg-secondary/80 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-6 bg-secondary/40 backdrop-blur">
                    <h4 className="font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-500">{post.readTime}</span>
                      <span className="text-xs text-zinc-600">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-zinc-500 text-sm"
        >
          <p>✨ Scroll or use arrow keys to browse featured articles</p>
        </motion.div>
      </div>
    </div>
  )
}
