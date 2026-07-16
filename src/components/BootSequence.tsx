'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const BOOT_LINES = [
  { text: 'SYSTEM::ONLINE', delay: 0, isTitle: true },
  { text: 'Loading profile... OK', delay: 0.6 },
  { text: 'Initializing portfolio... OK', delay: 1.1 },
  { text: 'Welcome, visitor.', delay: 1.6 },
]

export default function BootSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [lines, setLines] = useState<Array<{ text: string; isTitle?: boolean; done: boolean }>>([])
  const [skipRequested, setSkipRequested] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const skipBoot = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(1)
    }
  }, [])

  useEffect(() => {
    const sessionStorageKey = 'boot-seen'
    if (sessionStorage.getItem(sessionStorageKey)) {
      setVisible(false)
      return
    }

    const handleKey = () => skipBoot()
    const handleClick = () => skipBoot()
    window.addEventListener('keydown', handleKey, { once: true })
    window.addEventListener('click', handleClick, { once: true })

    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('click', handleClick)
    }
  }, [skipBoot])

  useGSAP(() => {
    if (!visible || !containerRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('boot-seen', '1')
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => setVisible(false),
        })
      },
    })

    timelineRef.current = tl

    BOOT_LINES.forEach((line, i) => {
      tl.call(() => {
        setLines(prev => [...prev, { text: '', isTitle: line.isTitle, done: false }])
      }, [], `+=${i === 0 ? 0.2 : line.delay - (BOOT_LINES[i - 1]?.delay || 0)}`)

      // Typewriter effect
      const chars = line.text.split('')
      chars.forEach((_, j) => {
        tl.call(() => {
          setLines(prev => {
            const newLines = [...prev]
            const last = newLines[newLines.length - 1]
            if (last) {
              newLines[newLines.length - 1] = {
                ...last,
                text: line.text.slice(0, j + 1),
              }
            }
            return newLines
          })
        }, [], `+=${0.03}`)
      })

      tl.call(() => {
        setLines(prev => {
          const newLines = [...prev]
          const last = newLines[newLines.length - 1]
          if (last) {
            newLines[newLines.length - 1] = { ...last, done: true }
          }
          return newLines
        })
      })
    })

    // Hold for a moment then fade
    tl.to({}, { duration: 0.5 })
  }, { dependencies: [visible] })

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-bg-void flex items-center justify-center cursor-pointer"
      onClick={skipBoot}
      onKeyDown={skipBoot}
    >
      <div className="max-w-lg w-full px-8">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`font-mono text-sm mb-2 ${
              line.isTitle
                ? 'text-blue-core text-base font-bold glow-text'
                : 'text-text-secondary'
            }`}
          >
            {line.isTitle && (
              <span className="text-text-muted mr-2">&gt;</span>
            )}
            {line.text}
            {!line.done && <span className="boot-cursor" />}
          </div>
        ))}

        <div className="mt-8 text-xs text-text-muted font-mono">
          Click or press any key to skip
        </div>
      </div>
    </div>
  )
}
