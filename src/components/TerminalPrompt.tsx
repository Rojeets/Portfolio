'use client'

import { useRef, useEffect, useState } from 'react'

interface TerminalPromptProps {
  command: string
  delay?: number
  className?: string
}

export default function TerminalPrompt({ command, delay = 0, className = '' }: TerminalPromptProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    if (prefersReducedMotion.current) {
      setDisplayed(command)
      setDone(true)
      return
    }

    let charIndex = 0
    let cancelled = false

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return
        charIndex++
        setDisplayed(command.slice(0, charIndex))
        if (charIndex >= command.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, 35)

      // Store interval for cleanup
      return () => clearInterval(interval)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [inView, command, delay])

  return (
    <div ref={ref} className={`flex items-center gap-3 font-mono text-sm ${className}`}>
      <span className="text-blue-core select-none">$</span>
      <span className="text-text-primary">
        {displayed}
        {!done && inView && <span className="animate-pulse text-blue-core">_</span>}
      </span>
    </div>
  )
}
