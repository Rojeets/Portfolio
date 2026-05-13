'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Code, Archive, AlertCircle } from 'lucide-react'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  archived: boolean
  topics: string[]
}

const languageColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  Java: '#b07219',
  Blade: '#f7523f',
  CSS: '#563d7c',
  HTML: '#e34c26',
  'Jupyter Notebook': '#DA5B0B',
}

const excludedNames = [
  'learn',
  'learn-test',
  'Java-Assignment',
  'VendingMachineWithJava',
  'techPractice',
  'TechLearn',
  'greaui',
  'Simtoolkit.-',
  'mine-Theator',
  'pieanai',
  'ProductivityTracker',
  'Django_WorkOut',
  'GIN-BaseRepo-for-WebDevelopment',
]

const DotPattern = () => (
  <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill="rgba(99, 102, 241, 0.1)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
)

const GridPattern = () => (
  <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect width="60" height="60" fill="none" stroke="rgba(99, 102, 241, 0.06)" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
)

export default function GitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/users/rojeets/repos?sort=updated&per_page=100')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos')
        return res.json()
      })
      .then((data: GitHubRepo[]) => {
        const real = data.filter((r) => {
          if (r.fork) return false
          if (r.archived) return false
          if (excludedNames.includes(r.name)) return false
          return r.stargazers_count > 0 || (r.description && r.language)
        })
        real.sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(real)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="github" className="py-24 px-6 relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">GitHub Repositories</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          <p className="text-zinc-400 mt-4 text-lg">
            Open-source projects and real-world tools
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent"></div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-3">
            <AlertCircle size={40} className="text-red-400" />
            <p>Failed to load repositories. Please try again later.</p>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-3">
            <Archive size={40} />
            <p>No repositories found.</p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group glass-effect border border-accent/10 rounded-xl overflow-hidden card-hover block"
              >
                <div className="h-32 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
                  <GridPattern />
                  <div className="absolute inset-0 flex items-center justify-between px-6">
                    <Code size={36} className="text-white/30" />
                    <div className="flex gap-3">
                      {repo.stargazers_count > 0 && (
                        <div className="flex items-center gap-1 text-xs font-mono text-amber-400/70 bg-black/40 px-2 py-1 rounded">
                          <Star size={12} />
                          {repo.stargazers_count}
                        </div>
                      )}
                      {repo.forks_count > 0 && (
                        <div className="flex items-center gap-1 text-xs font-mono text-sky-400/70 bg-black/40 px-2 py-1 rounded">
                          <GitFork size={12} />
                          {repo.forks_count}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-3 left-4 font-mono text-white/20 text-xs font-bold">
                    {String(repos.indexOf(repo) + 1).padStart(2, '0')}
                  </div>
                  <div className="absolute bottom-3 right-4">
                    <ExternalLink size={14} className="text-white/20 group-hover:text-accent transition-colors" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-neon transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {repo.description || 'No description provided'}
                  </p>

                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-accent/10 pt-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-secondary/50 text-zinc-300">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{
                              backgroundColor:
                                languageColors[repo.language] || '#6366F1',
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
