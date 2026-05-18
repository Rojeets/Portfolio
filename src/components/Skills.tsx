'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import {
  Code2,
  ExternalLink,
  Star,
  Circle,
  Github,
  Terminal,
  Cpu,
  ArrowRight,
} from 'lucide-react'
import data from '../data/portfolio.json'

// --- Types ---
interface Repo {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  pushed_at: string
  fork: boolean
  archived: boolean
  size: number
  topics: string[]
}

// --- Constants & Icon Mapping ---
const SKILL_ICONS: Record<string, React.ReactNode> = {
  Laravel: <path d="M20.507 4.51L11.498.086C11.1.082 10.702.076 10.301.076c-4.13 0-5.562 1.852-5.562 5.536v3.03L.947 16.47c-.396.527-.614 1.196-.614 1.917 0 .721.218 1.39.614 1.917l4.003 5.342h7.07l4.003-5.342c.396-.527.614-1.196.614-1.917 0-.721-.218-1.39-.614-1.917l-4.003-5.343h7.476c4.125 0 5.562-1.86 5.562-5.558V4.51zm-8.686 7.37h-3.108v-2.56h3.108v2.56zm0-4.07h-3.108V4.21h3.108v3.6z" />,
  PHP: <path d="M7.01 8.69h-.79v3.12h.79c1.34 0 2.11-.67 2.11-1.56 0-.9-.77-1.56-2.11-1.56zm9.63 3.12h.79v-3.12h-.79c-1.34 0-2.11.67-2.11 1.56 0 .89.77 1.56 2.11 1.56zm5.36-3.12h-.79v3.12h.79c1.34 0 2.11-.67 2.11-1.56 0-.9-.77-1.56-2.11-1.56z" />,
  React: <path d="M12 16.604c-1.657 0-3.308-1.234-4.564-3.36-.75-1.254-.93-2.56-.53-3.754.4-1.195 1.34-2.045 2.688-2.428 1.348-.383 2.929-.04 4.405 1.02 1.477-1.06 3.057-1.403 4.405-1.02 1.348.383 2.288 1.233 2.688 2.428.4 1.194.22 2.5-.53 3.754-1.256 2.126-2.907 3.36-4.564 3.36m-5.72-6.02c-.8.228-1.432.84-1.74 1.693-.31.853-.17 1.832.42 2.916.952 1.594 2.02 2.413 3.036 2.413 1.016 0 2.084-.819 3.036-2.413.59-.99.73-1.973.42-2.916-.308-.854-.94-1.465-1.74-1.693-1.187-.338-2.656.132-3.988.899zm11.44 0c-1.332-.767-2.8-1.237-3.988-.899-.8.228-1.432.84-1.74 1.693-.31.853-.17 1.832.42 2.916.952 1.594 2.02 2.413 3.036 2.413 1.016 0 2.084-.819 3.036-2.413.59-.99.73-1.973.42-2.916-.308-.854-.94-1.465-1.74-1.693z" />,
  'Next.js': <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.07 15.5h-1.78v-6h1.78v6zm-3.56 0h-1.78V9.5h1.78v6zm-3.56 0h-1.78V9.5h1.78v6zm-3.56 0h-1.78V9.5h1.78v6z" />,
  TypeScript: <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125z" />,
  Python: <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 3.5c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5zm-5 10c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5z" />,
  Docker: <path d="M13.244 11H16.5c.276 0 .5-.224.5-.5V8c0-.276-.224-.5-.5-.5h-3.256A2.25 2.25 0 009.75 5.25h-5.5a2.25 2.25 0 00-2.25 2.25v11a2.25 2.25 0 002.25 2.25h11a2.25 2.25 0 002.25-2.25v-4c0-.276-.224-.5-.5-.5h-3.256z" />,
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'text-blue-400',
  JavaScript: 'text-yellow-400',
  Python: 'text-green-400',
  PHP: 'text-purple-400',
  Blade: 'text-red-500',
  HTML: 'text-orange-500',
  CSS: 'text-cyan-400',
}

const EXCLUDE_REPOS = [/portfolio/i, /practice/i, /test/i, /template/i, /assignment/i]

// --- Components ---

const SkillCard = ({ name, index }: { name: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative p-6 rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-md flex flex-col items-center gap-4 transition-all hover:border-accent/40 hover:bg-zinc-800/60 hover:shadow-2xl hover:shadow-accent/10"
  >
    {/* Inner Glow */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative z-10 w-14 h-14 flex items-center justify-center text-zinc-400 group-hover:text-accent transition-all duration-300 transform group-hover:rotate-6">
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
        {SKILL_ICONS[name] || (
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        )}
      </svg>
    </div>
    
    <span className="relative z-10 text-xs font-bold text-zinc-500 group-hover:text-zinc-100 transition-colors uppercase tracking-[0.2em]">
      {name}
    </span>

    {/* Hover Bottom Line */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent group-hover:w-1/2 transition-all duration-300" />
  </motion.div>
)

export default function Skills() {
  const { skills } = data

  const topSkills = [
    'Laravel', 'PHP', 'React', 'Next.js', 'TypeScript', 
    'Python', 'Docker', 'PostgreSQL', 'Tailwind CSS', 
    'OpenCV', 'Git', 'Django'
  ]

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
              Tech <span className="text-accent">Stack.</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl text-lg leading-relaxed font-medium">
              {skills.sectionSubtitle}
            </p>
          </motion.div>
        </header>

        {/* Skill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-32">
          {topSkills.map((skill, idx) => (
            <SkillCard key={skill} name={skill} index={idx} />
          ))}
        </div>

        {/* Category Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center md:justify-start gap-3 mb-32"
        >
          {skills.categories.map((cat: any) => (
            <span 
              key={cat.id} 
              className="px-6 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/30 text-zinc-400 text-sm font-semibold hover:border-accent/40 hover:text-white transition-all cursor-default"
            >
              {cat.title}
            </span>
          ))}
        </motion.div>

        <GithubProjects title={skills.realWorldTitle} subtitle={skills.realWorldSubtitle} />
      </div>
    </section>
  )
}

function GithubProjects({ title, subtitle }: { title: string; subtitle: string }) {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/rojeets/repos?sort=pushed&per_page=60')
        const rawData = await res.json()
        
        if (Array.isArray(rawData)) {
          const filtered = rawData
            .filter((repo: Repo) => 
              !repo.fork && 
              !repo.archived && 
              repo.size > 40 &&
              !EXCLUDE_REPOS.some(p => p.test(repo.name))
            )
            .sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)

          setRepos(filtered)
        }
      } catch (e) {
        console.error("Github API error:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <Github className="text-accent" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-zinc-500 font-medium">{subtitle}</p>
        </motion.div>
        
        <motion.a 
          whileHover={{ x: 5 }}
          href="https://github.com/rojeets" 
          target="_blank" 
          className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-accent transition-colors"
        >
          SEE RECENT REPOS 
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='wait'>
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-zinc-900/40 animate-pulse border border-zinc-800/50" />
            ))
          ) : (
            repos.map((repo, idx) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm hover:border-accent/40 hover:bg-zinc-800/30 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative Icon Background */}
                <Terminal className="absolute -right-4 -bottom-4 text-white/5 w-24 h-24 rotate-12 group-hover:rotate-0 transition-transform duration-500" />

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-2.5 rounded-xl bg-zinc-800 group-hover:bg-accent/20 transition-colors">
                      <Cpu size={20} className="text-zinc-400 group-hover:text-accent" />
                    </div>
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/50 text-[10px] font-bold text-zinc-400">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" /> {repo.stargazers_count}
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 group-hover:text-accent transition-colors capitalize leading-tight">
                    {repo.name.replace(/[-_]/g, ' ')}
                  </h4>
                  <p className="text-sm text-zinc-500 mt-3 line-clamp-2 leading-relaxed font-medium">
                    {repo.description || "Experimental project and source code exploration."}
                  </p>
                </div>
                
                <div className="mt-8 pt-5 border-t border-zinc-800/50 flex items-center justify-between">
                  {repo.language ? (
                    <span className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                      <Circle size={8} className={`fill-current ${LANGUAGE_COLORS[repo.language] || 'text-zinc-600'}`} />
                      {repo.language}
                    </span>
                  ) : <span></span>}
                  <ExternalLink size={14} className="text-zinc-600 group-hover:text-accent transition-colors" />
                </div>
              </motion.a>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}