'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import data from '../data/portfolio.json'

const { personal, social, terminal: terminalData, experience, projects: projectsData, skills } = data

const ASCII_ART = terminalData.asciiArt

// Build terminal command responses from JSON data
const buildSkillsOutput = () => {
  const lines = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '⚙️  TECHNICAL SKILLS',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
  ]

  const levelBars = {
    Expert: '████████████████████████████░░',
    Advanced: '██████████████████████░░░░░░░░',
    Proficient: '████████████████░░░░░░░░░░░░░░',
  }

  const categoryEmojis = {
    backend: '🔙 BACKEND ENGINEERING',
    frontend: '⚛️  FRONTEND DEVELOPMENT',
    devops: '🛠️  DEVOPS & TOOLS',
    specializations: '🔐 SPECIALIZATIONS',
  }

  skills.categories.forEach((category) => {
    lines.push(categoryEmojis[category.id as keyof typeof categoryEmojis] || `📦 ${category.title.toUpperCase()}`)
    if (category.id === 'specializations') {
      category.technologies.forEach((tech) => {
        lines.push(`  ★ ${tech.name}`)
      })
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
  const lines = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📁 FEATURED PROJECTS',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
  ]

  const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']

  projectsData.items.forEach((project, idx) => {
    lines.push(`${numberEmojis[idx] || `${idx + 1}.`}  ${project.title.toUpperCase()}`)
    lines.push(`    Stack: ${project.tech.join(' • ')}`)
    project.highlights.forEach((h) => {
      lines.push(`    ✓ ${h}`)
    })
    lines.push('')
  })

  return lines
}

const COMMANDS: Record<string, {
  description: string
  action: ((state: { history: HistoryItem[] }) => string[] | null) | null
}> = {
  help: {
    description: 'Show available commands',
    action: () => {
      return [
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '📚 AVAILABLE COMMANDS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'about ..................... Learn more about me',
        'skills ..................... View my technical skills',
        'projects ................... See my featured projects',
        'experience ................. My professional experience',
        'contact .................... Get in touch',
        'social ..................... Social media links',
        'ui ......................... Switch to UI mode',
        'clear ....................... Clear terminal',
        'help ....................... Show this message',
        '',
        '💡 Tip: Use Tab for autocomplete, ↑↓ for history',
        '',
      ]
    },
  },
  about: {
    description: 'Show information about me',
    action: () => {
      return [
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        `👨‍💻 ABOUT ${personal.name.toUpperCase().split(' ')[0]}`,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        `I'm a ${personal.title} with a strong focus on building`,
        'scalable backend architectures and dynamic frontend experiences.',
        '',
        '🎯 Specializations:',
        '  • Enterprise RBAC Systems',
        '  • Automated Financial Platforms',
        '  • Multi-tenant CMS Solutions',
        '  • High-Performance APIs',
        '',
        '🚀 Philosophy:',
        'I focus on writing clean, maintainable code that bridges',
        'complex business requirements with performant solutions.',
        'Security by design, scalability through architecture,',
        'seamless experiences through integration.',
        '',
      ]
    },
  },
  skills: {
    description: 'Show my technical skills',
    action: () => buildSkillsOutput(),
  },
  projects: {
    description: 'Show my featured projects',
    action: () => buildProjectsOutput(),
  },
  experience: {
    description: 'Show my professional experience',
    action: () => {
      return [
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '💼 PROFESSIONAL EXPERIENCE',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        `🏢 ${experience.title}`,
        `   📅 ${experience.period}`,
        `   📍 ${experience.location}`,
        '',
        '   Key Achievements:',
        ...experience.achievements.map((a) => `   • ${a}`),
        '',
        '🎓 EXPERTISE AREAS',
        ...experience.expertiseAreas.map((a) => `   ✓ ${a}`),
        '',
      ]
    },
  },
  contact: {
    description: 'Get my contact information',
    action: () => {
      return [
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '📧 CONTACT INFORMATION',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        `💼 Email: ${social.email.display}`,
        `📱 LinkedIn: ${social.linkedin.display}`,
        `🐙 GitHub: ${social.github.display}`,
        `🔗 Website: ${social.website.display}`,
        '',
        '⏰ AVAILABILITY',
        'Open to freelance projects and full-time opportunities.',
        'Response time: Usually within 24 hours.',
        '',
        '💬 Type "social" to see all social links',
        '',
      ]
    },
  },
  social: {
    description: 'Show my social media links',
    action: () => {
      return [
        '',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🌐 SOCIAL MEDIA & LINKS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        `🐙 GitHub: ${social.github.url}`,
        `💼 LinkedIn: ${social.linkedin.url}`,
        `🔗 GitLab: ${social.gitlab.url}`,
        `🌍 Portfolio: ${social.website.url}`,
        `📧 Email: ${social.email.value}`,
        '',
        'Feel free to reach out! Let\'s build something amazing together.',
        '',
      ]
    },
  },
  ui: {
    description: 'Switch to UI mode',
    action: null, // Handled specially
  },
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

interface HistoryItem {
  type: 'ascii' | 'command' | 'text'
  content: string
}

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

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    // Add to history
    const newCommandHistory = [...commandHistory, cmd]
    setCommandHistory(newCommandHistory)
    setHistoryIndex(-1)

    // Add command to output
    const newHistory: HistoryItem[] = [...history, { type: 'command', content: cmd }]

    if (!trimmedCmd) {
      setHistory(newHistory)
      setInput('')
      return
    }

    // Check if command exists
    if (trimmedCmd in COMMANDS) {
      if (trimmedCmd === 'ui') {
        setMode('ui')
        return
      }

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
      const output = command.action!({ history: newHistory })

      if (output) {
        if (Array.isArray(output)) {
          output.forEach((line: string) => {
            newHistory.push({ type: 'text' as const, content: line })
          })
        } else {
          newHistory.push({ type: 'text' as const, content: output })
        }
      }

      setHistory(newHistory)
    } else {
      newHistory.push({
        type: 'text' as const,
        content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`,
      })
      setHistory(newHistory)
    }

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIndex)
      setInput(
        newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex]
      )
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const cmd = input.trim().toLowerCase()
      const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(cmd))
      if (matches.length === 1) {
        setInput(matches[0])
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-indigo-400 font-mono p-4 overflow-hidden">
      {/* CRT Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-indigo-400 opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="border-2  border-indigo-400 rounded bg-black shadow-lg shadow-indigo-400/20">
          {/* Terminal Header */}
          <div className="flex  items-center justify-between bg-indigo-400 text-black px-4 py-2 font-semibold">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              </div>
              <span>{terminalData.headerTitle}</span>
            </div>
            <button
              onClick={() => setMode('ui')}
              className="text-xs px-3 py-1 bg-black text-indigo-400 rounded hover:bg-indigo-400 hover:text-black transition-all"
            >
              [Switch to UI]
            </button>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-6 overflow-y-auto max-h-[70vh] bg-black"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.type === 'ascii' ? (
                  <pre className="text-indigo-400 text-xs mb-4 whitespace-pre-wrap break-words">
                    {item.content}
                  </pre>
                ) : item.type === 'command' ? (
                  <div className="mb-2">
                    <span className="text-indigo-300">{terminalData.prompt}</span>
                    <span className="ml-2 text-indigo-400">{item.content}</span>
                  </div>
                ) : (
                  <div className="mb-1 whitespace-pre-wrap break-words text-indigo-400">
                    {item.content}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Input Line */}
            <div className="mt-4 flex items-center">
              <span className="text-indigo-300">{terminalData.prompt}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="ml-2 bg-transparent outline-none text-indigo-400 flex-1 placeholder-indigo-700"
                placeholder="Type 'help' for commands..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <span className="animate-pulse text-indigo-400">_</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-indigo-400/60 text-sm">
          <p>{terminalData.footerText}</p>
        </div>
      </motion.div>
    </div>
  )
}
