'use client'
import { useCallback, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import data from '../data/portfolio.json'

const { personal, social, terminal: terminalData, experience, projects: projectsData, skills } = data
const cmdDescs = terminalData.commands as Record<string, string>
const ASCII_ART = terminalData.asciiArt

const buildSkillsOutput = () => {
  const lines = ['', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '⚙️  TECHNICAL SKILLS', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '']
  const levelBars = terminalData.levelBars as Record<string, string>
  const categoryEmojis = terminalData.categoryEmojis as Record<string, string>
  skills.categories.forEach((category) => {
    lines.push(categoryEmojis[category.id as keyof typeof categoryEmojis] || `📦 ${category.title.toUpperCase()}`)
    if (category.id === 'specializations') {
      category.technologies.forEach((tech) => lines.push(`  ★ ${tech.name}`))
    } else {
      category.technologies.forEach((tech) => {
        const bar = levelBars[tech.level as keyof typeof levelBars] || levelBars.Proficient
        lines.push(`  ${bar} ${tech.name} (${tech.level})`)
      })
    }
    lines.push('')
  })
  return lines
}

const buildProjectsOutput = () => {
  const lines = ['', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '📁 FEATURED PROJECTS', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '']
  const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
  projectsData.items.forEach((project, idx) => {
    lines.push(`${numberEmojis[idx] || `${idx + 1}.`}  ${project.title.toUpperCase()}`)
    lines.push(`    Stack: ${project.tech.join(' • ')}`)
    project.highlights.forEach((h) => lines.push(`    ✓ ${h}`))
    lines.push('')
  })
  return lines
}

const COMMANDS: Record<string, { description: string; action: ((state: { history: HistoryItem[] }) => string[] | null) | null }> = {
  help: {
    description: 'Show available commands',
    action: () => {
      const maxLen = Math.max(...Object.keys(cmdDescs).map(k => k.length))
      return [
        '', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '📚 AVAILABLE COMMANDS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '',
        ...Object.entries(cmdDescs).map(([cmd, desc]) => `  ${cmd.padEnd(maxLen + 2)} ${desc}`),
        '', '💡 Tip: Use Tab for autocomplete, ↑↓ for history', '',
      ]
    },
  },
  about: {
    description: 'Learn more about me',
    action: () => {
      const resp = terminalData.responses.about
      return [
        '', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        `👨‍💻 ABOUT ${personal.name.toUpperCase().split(' ')[0]}`,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '',
        `I'm a ${personal.title} with a strong focus on building`,
        'scalable backend architectures and dynamic frontend experiences.', '',
        '🎯 Specializations:',
        ...resp.specializations.map((s: string) => `  • ${s}`), '',
        '🚀 Philosophy:', resp.philosophy, '',
      ]
    },
  },
  skills: { description: 'View my technical skills', action: () => buildSkillsOutput() },
  projects: { description: 'See my featured projects', action: () => buildProjectsOutput() },
  experience: {
    description: 'My professional experience',
    action: () => [
      '', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '💼 PROFESSIONAL EXPERIENCE',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '',
      ...experience.roles.flatMap((r) => [
        `🏢 ${r.title} @ ${r.company}`,
        `   📅 ${r.period}  📍 ${r.location}`,
        '',
        ...r.achievements.map((a) => `   • ${a}`),
        '',
      ]),
      '🎓 EXPERTISE AREAS',
      ...experience.expertiseAreas.map((a) => `   ✓ ${a}`), '',
    ],
  },
  contact: {
    description: 'Get in touch',
    action: () => {
      const resp = terminalData.responses.contact
      return [
        '', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '📧 CONTACT INFORMATION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '',
        `💼 Email: ${social.email.display}`,
        `📱 LinkedIn: ${social.linkedin.display}`,
        `🐙 GitHub: ${social.github.display}`,
        `🔗 Website: ${social.website.display}`, '',
        '⏰ AVAILABILITY', 'Open to freelance projects and full-time opportunities.',
        resp.responseTime, '', '💬 Type "social" to see all social links', '',
      ]
    },
  },
  social: {
    description: 'Social media links',
    action: () => [
      '', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '🌐 SOCIAL MEDIA & LINKS',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '',
      `🐙 GitHub: ${social.github.url}`,
      `💼 LinkedIn: ${social.linkedin.url}`,
      `🔗 GitLab: ${social.gitlab.url}`,
      `🌍 Portfolio: ${social.website.url}`,
      `📧 Email: ${social.email.value}`, '',
      'Feel free to reach out! Let\'s build something amazing together.', '',
    ],
  },
  ui: { description: 'Switch to UI mode', action: null },
  clear: {
    description: 'Clear terminal',
    action: (state: { history: HistoryItem[] }) => {
      state.history = [
        { type: 'ascii', content: ASCII_ART },
        { type: 'text', content: terminalData.welcomeMessage },
        { type: 'text', content: terminalData.helpTip },
      ]
      return null
    },
  },
}

interface HistoryItem { type: 'ascii' | 'command' | 'text'; content: string }

export default function Terminal({ setMode }: { setMode: (mode: string) => void }) {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'ascii', content: ASCII_ART },
    { type: 'text', content: terminalData.welcomeMessage },
    { type: 'text', content: terminalData.helpTip },
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const AUTO_CMDS = ['help', 'about', 'skills', 'projects', 'experience', 'contact', 'social']
  const TYPE_INTERVAL = 55
  const PAUSE_BEFORE_EXEC = 300
  const PAUSE_BETWEEN = 5000

  const [autoActive, setAutoActive] = useState(true)
  const [autoIdx, setAutoIdx] = useState(-1)
  const [autoCharPos, setAutoCharPos] = useState(0)

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({ top: terminalRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [history])

  const handleCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    setCommandHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    if (!trimmedCmd) { setInput(''); return }

    if (trimmedCmd in COMMANDS) {
      if (trimmedCmd === 'ui') { setMode('ui'); return }
      if (trimmedCmd === 'clear') {
        setHistory([
          { type: 'ascii', content: ASCII_ART },
          { type: 'text', content: terminalData.welcomeMessage },
          { type: 'text', content: terminalData.helpTip },
        ])
        setInput('')
        return
      }
      const command = COMMANDS[trimmedCmd]
      setHistory(prev => {
        const newHistory: HistoryItem[] = [...prev, { type: 'command', content: cmd }]
        const output = command.action!({ history: newHistory })
        if (output) {
          output.forEach((line: string) => newHistory.push({ type: 'text' as const, content: line }))
        }
        return newHistory
      })
    } else {
      setHistory(prev => {
        const newHistory: HistoryItem[] = [...prev, { type: 'command', content: cmd }]
        newHistory.push({ type: 'text' as const, content: terminalData.commandNotFound.replace('{cmd}', trimmedCmd) })
        return newHistory
      })
    }
    setInput('')
  }, [setMode])

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
        handleCommand(cmd)
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
  }, [autoActive, autoIdx, autoCharPos, handleCommand])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (autoActive) {
      setAutoActive(false)
      setAutoIdx(-1)
      setAutoCharPos(0)
    }
    if (e.key === 'Enter') handleCommand(input)
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(i)
      setInput(commandHistory[commandHistory.length - 1 - i] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = Math.max(historyIndex - 1, -1)
      setHistoryIndex(i)
      setInput(i === -1 ? '' : commandHistory[commandHistory.length - 1 - i])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const cmd = input.trim().toLowerCase()
      const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(cmd))
      if (matches.length === 1) setInput(matches[0])
    }
  }

  return (
    <div className="min-h-screen bg-primary text-indigo-400 font-mono p-4 pt-16 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-indigo-400 opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="border-2 border-indigo-400/30 rounded-2xl bg-black shadow-lg shadow-indigo-400/10">
          <div className="flex items-center justify-between bg-indigo-400/10 text-indigo-400 px-5 py-3 border-b border-indigo-400/20 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-indigo-500/80" />
              </div>
              <span className="text-sm font-semibold">{terminalData.headerTitle}</span>
            </div>
            <button
              onClick={() => setMode('ui')}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-400/10 text-indigo-400 hover:bg-indigo-400 hover:text-black transition-all"
            >
              [Switch to UI]
            </button>
          </div>

          <div
            ref={terminalRef}
            className="p-6 overflow-y-auto max-h-[70vh] bg-black/80"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                {item.type === 'ascii' ? (
                  <pre className="text-indigo-400/70 text-xs mb-4 whitespace-pre-wrap break-words">{item.content}</pre>
                ) : item.type === 'command' ? (
                  <div className="mb-2">
                    <span className="text-indigo-300">{terminalData.prompt}</span>
                    <span className="ml-2 text-indigo-400">{item.content}</span>
                  </div>
                ) : (
                  <div className="mb-1 whitespace-pre-wrap break-words text-indigo-400/80">{item.content}</div>
                )}
              </motion.div>
            ))}

            <div className="mt-4 flex items-center">
              <span className="text-indigo-300 shrink-0">{terminalData.prompt}</span>
              <div className="relative flex-1 ml-2">
                <span className="text-indigo-400 text-sm font-mono whitespace-pre">
                  {input}<span className="animate-pulse-glow text-indigo-400">_</span>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    if (autoActive) { setAutoActive(false); setAutoIdx(-1); setAutoCharPos(0) }
                    setInput(e.target.value)
                  }}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 w-full opacity-0 cursor-default text-sm font-mono"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-indigo-400/50 text-sm font-mono">
          <p>{terminalData.footerText}</p>
        </div>
      </motion.div>
    </div>
  )
}
