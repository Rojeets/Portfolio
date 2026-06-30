'use client'
import { useCallback, useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import data from '../data/portfolio.json'

export default function Home() {
  const pathname = usePathname()
  const { personal, terminal: terminalData, social, projects: projectsData, about, contact } = data
  const projects = projectsData.items as Array<{ title: string; description: string; tech: string[]; highlights: string[] }>

  const [history, setHistory] = useState<{ type: 'output' | 'input'; content: string }[]>([
    { type: 'output', content: terminalData.welcomeMessage },
    { type: 'output', content: terminalData.helpTip },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const termRef = useRef<HTMLDivElement>(null)
  const AUTO_CMDS = ['help', 'about', 'skills', 'projects', 'experience', 'contact', 'social']
  const TYPE_INTERVAL = 55
  const PAUSE_BEFORE_EXEC = 300
  const PAUSE_BETWEEN = 5000

  const [autoActive, setAutoActive] = useState(true)
  const [autoIdx, setAutoIdx] = useState(-1)
  const [autoCharPos, setAutoCharPos] = useState(0)

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [pathname])

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTo({ top: termRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [history])

  const runCmd = useCallback((cmd: string) => {
    const t = cmd.trim().toLowerCase()
    setCmdHistory(prev => [...prev, cmd])
    setHistIdx(-1)

    const responses: Record<string, string[]> = {
      about: [
        '',
        `${personal.name} — ${personal.title}`,
        '',
        ...about.bio.map(p => p.text.replace(/<\/?highlight>|<\/?accent>/g, '')),
        '',
        'Specializations:',
        ...about.highlights.map(h => `  ${h.title}: ${h.description}`),
        '',
      ],
      skills: [
        '',
        ...data.skills.categories.flatMap(c =>
          [`${c.title}:`, ...c.technologies.map(t => `  ${t.name} [${t.level}]`), '']
        ),
      ],
      projects: [
        '',
        ...projects.map(p => `• ${p.title}`),
        '',
        'View full case studies at /projects',
        '',
      ],
      experience: [
        '',
        ...data.experience.roles.flatMap(r => [
          `🏢 ${r.title} @ ${r.company}`,
          `   📅 ${r.period}  📍 ${r.location}`,
          '',
          ...r.achievements.map(a => `  • ${a}`),
          '',
        ]),
        '🎓 EXPERTISE AREAS',
        ...data.experience.expertiseAreas.map(a => `  ✓ ${a}`),
        '',
      ],
      contact: [
        '',
        `Email:    ${social.email.display}`,
        `GitHub:   ${social.github.display}`,
        `LinkedIn: ${social.linkedin.display}`,
        `Website:  ${social.website.display}`,
        '',
      ],
      help: [
        '',
        'Available commands:',
        '',
        '  about      About me and specializations',
        '  skills     Technical skills inventory',
        '  projects   Featured projects overview',
        '  experience Professional experience',
        '  contact    Contact information',
        '  social     Social media links',
        '  clear      Clear terminal',
        '  help       Show this message',
        '',
      ],
      social: [
        '',
        `GitHub:   ${social.github.url}`,
        `LinkedIn: ${social.linkedin.url}`,
        `GitLab:   ${social.gitlab.url}`,
        `Email:    ${social.email.value}`,
        `Website:  ${social.website.url}`,
        '',
      ],
    }

    setHistory(prev => {
      const h: { type: 'input' | 'output'; content: string }[] = [...prev, { type: 'input', content: cmd }]

      if (t === 'clear') {
        return [{ type: 'output', content: terminalData.welcomeMessage }]
      }

      if (t in responses) {
        responses[t].forEach(l => h.push({ type: 'output', content: l }))
      } else if (t) {
        h.push({ type: 'output', content: `command not found: ${t}. type "help"` })
      }

      return h
    })

    setInput('')
  }, [personal, terminalData, about, social, data, projects])

  // Auto-execution sequence
  useEffect(() => {
    if (!autoActive) return

    if (autoIdx === -1) {
      const t = setTimeout(() => setAutoIdx(0), 1500)
      return () => clearTimeout(t)
    }

    if (autoIdx >= AUTO_CMDS.length) {
      setAutoActive(false)
      return
    }

    const cmd = AUTO_CMDS[autoIdx]

    if (autoCharPos < cmd.length) {
      const t = setTimeout(() => {
        setAutoCharPos(p => p + 1)
        setInput(cmd.slice(0, autoCharPos + 1))
      }, TYPE_INTERVAL)
      return () => clearTimeout(t)
    }

    if (autoCharPos === cmd.length) {
      const t = setTimeout(() => {
        runCmd(cmd)
        setAutoCharPos(p => p + 1)
      }, PAUSE_BEFORE_EXEC)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      if (autoIdx + 1 < AUTO_CMDS.length) {
        setAutoIdx(i => i + 1)
        setAutoCharPos(0)
      } else {
        setAutoActive(false)
      }
    }, PAUSE_BETWEEN)
    return () => clearTimeout(t)
  }, [autoActive, autoIdx, autoCharPos, runCmd])

  const handleKey = (e: React.KeyboardEvent) => {
    if (autoActive) {
      setAutoActive(false)
      setAutoIdx(-1)
      setAutoCharPos(0)
    }
    if (e.key === 'Enter') runCmd(input)
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(i)
      setInput(cmdHistory[cmdHistory.length - 1 - i] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = Math.max(histIdx - 1, -1)
      setHistIdx(i)
      setInput(i === -1 ? '' : cmdHistory[cmdHistory.length - 1 - i])
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.hero.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at top, rgba(99,102,241,0.12), transparent 60%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-24">
          <div className="grid lg:grid-cols-5 lg:gap-12 items-start">
            {/* Left: hero content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-block px-4 py-1.5 rounded-full glass-effect text-accent text-xs font-medium mb-6"
              >
                {data.hero.badgeText}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4"
              >
                {personal.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg md:text-xl text-zinc-400 mb-3 max-w-2xl"
              >
                {personal.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="text-zinc-500 max-w-2xl leading-relaxed mb-8"
              >
                {personal.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                {data.hero.ctaButtons.map((btn: { text: string; href: string; style: string }) => (
                  <motion.a
                    key={btn.text}
                    href={btn.href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={
                      btn.style === 'primary'
                        ? 'px-6 py-3 bg-gradient-to-r from-accent to-neon text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-accent/25'
                        : 'px-6 py-3 border border-accent/30 text-accent rounded-xl font-medium text-sm transition-all hover:bg-accent/10 hover:border-accent/50'
                    }
                  >
                    {btn.text}
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex gap-6 mt-12"
              >
                {data.hero.socialLinks.map((key: string) => {
                  const s = (social as Record<string, { label: string; url: string }>)[key]
                  return s ? (
                    <motion.a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="text-sm text-zinc-500 hover:text-accent transition-colors"
                    >
                      {s.label}
                    </motion.a>
                  ) : null
                })}
              </motion.div>
            </motion.div>

            {/* Right: terminal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 mt-12 lg:mt-0"
            >
              <div className="border border-accent/20 rounded-2xl overflow-hidden bg-primary/80 backdrop-blur-sm">
                <div className="flex items-center justify-between px-4 py-2.5 bg-secondary border-b border-accent/10">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono">{terminalData.headerTitle}</span>
                  </div>
                  <a
                    href="/terminal"
                    target="_blank"
                    className="text-[9px] text-accent/70 hover:text-accent font-mono transition-colors"
                  >
                    [open full terminal]
                  </a>
                </div>

                <div
                  ref={termRef}
                  className="p-4 overflow-y-auto max-h-64 lg:max-h-72 font-mono"
                  onClick={() => inputRef.current?.focus()}
                >
                  {history.map((item, idx) => (
                    <div key={idx} className="mb-0.5 leading-5">
                      {item.type === 'input' ? (
                        <div className="flex items-start">
                          <span className="text-accent text-xs shrink-0">{terminalData.prompt}</span>
                          <span className="ml-1.5 text-zinc-200 text-xs">{item.content}</span>
                        </div>
                      ) : (
                        <div className="text-zinc-400 text-xs whitespace-pre-wrap">{item.content}</div>
                      )}
                    </div>
                  ))}

                  <div className="mt-2 flex items-center">
                    <span className="text-accent text-xs shrink-0">{terminalData.prompt}</span>
                    <div className="relative flex-1 ml-1.5">
                      <span className="text-zinc-200 text-xs font-mono whitespace-pre">
                        {input}<span className="animate-pulse-glow text-accent">_</span>
                      </span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => {
                          if (autoActive) { setAutoActive(false); setAutoIdx(-1); setAutoCharPos(0) }
                          setInput(e.target.value)
                        }}
                        onKeyDown={handleKey}
                        className="absolute inset-0 w-full opacity-0 cursor-default text-xs font-mono"
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-zinc-600 mt-3 leading-relaxed font-mono">
                interactive terminal — try <span className="text-accent">help</span>, <span className="text-accent">skills</span>, <span className="text-accent">projects</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <About />
      <Experience />
      <Skills />

      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-secondary/20 to-primary pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{contact.sectionTitle}</span>
            </h2>
            <p className="text-zinc-500 mb-8 max-w-lg mx-auto">{contact.sectionSubtitle}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-accent to-neon text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                {contact.form.submitText}
              </Link>
              <a
                href={social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-accent/30 text-accent rounded-xl font-medium text-sm transition-all hover:bg-accent/10"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
