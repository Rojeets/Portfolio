'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const BOOT_LINES = [
  { text: 'SYSTEM::ONLINE', delay: 0, isTitle: true },
  { text: 'Loading profile... OK', delay: 0.4 },
  { text: 'Initializing portfolio... OK', delay: 0.7 },
]

const SYSTEM_CHECKS = [
  { label: 'GSAP', status: 'OK' },
  { label: 'React', status: 'OK' },
  { label: 'Three.js', status: 'OK' },
  { label: 'ScrollTrigger', status: 'OK' },
]

const MAX_BOOT_MS = 2500

const BOT_PATTERN =
  /googlebot|bingbot|baiduspider|yandex|duckduckbot|slurp|headlesschrome|facebookexternalhit|twitterbot|preview|screaming ?frog|curl|wget|python-requests/i

export default function BootSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [lines, setLines] = useState<Array<{ text: string; isTitle?: boolean; done: boolean }>>([])
  const [checks, setChecks] = useState<Array<{ label: string; status: string }>>([])
  const [progress, setProgress] = useState(0)
  const [showReady, setShowReady] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const skipBoot = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(1)
    }
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    let seen = false
    try {
      seen = !!sessionStorage.getItem('boot-seen')
    } catch {}

    if (seen || prefersReducedMotion || BOT_PATTERN.test(navigator.userAgent)) return

    const timer = setTimeout(() => {
      setVisible(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible) return

    const handleKey = () => skipBoot()
    const handleClick = () => skipBoot()
    window.addEventListener('keydown', handleKey, { once: true })
    window.addEventListener('click', handleClick, { once: true })

    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('click', handleClick)
    }
  }, [visible, skipBoot])

  useEffect(() => {
    if (!visible) return

    const hardCap = setTimeout(skipBoot, MAX_BOOT_MS)
    return () => clearTimeout(hardCap)
  }, [visible, skipBoot])

  useGSAP(() => {
    if (!visible || !containerRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem('boot-seen', '1')
        } catch {}
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => setVisible(false),
        })
      },
    })

    timelineRef.current = tl

    // Phase 1: Boot lines
    BOOT_LINES.forEach((line, i) => {
      tl.call(() => {
        setLines(prev => [...prev, { text: '', isTitle: line.isTitle, done: false }])
      }, [], `+=${i === 0 ? 0.3 : 0.15}`)

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
        }, [], `+=${0.025}`)
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

    // Phase 2: System checks — staggered checkmarks
    tl.call(() => setLines(prev => [...prev, { text: '', done: false }]), [], '+=0.15')

    SYSTEM_CHECKS.forEach((check, i) => {
      tl.call(() => {
        setChecks(prev => [...prev, check])
        setProgress(Math.round(((i + 1) / SYSTEM_CHECKS.length) * 80))
      }, [], `+=${0.12}`)
    })

    // Phase 3: Progress bar fills to 100%
    tl.call(() => setProgress(100), [], '+=0.2')

    // Phase 4: "System ready" message
    tl.call(() => setShowReady(true), [], '+=0.3')

    // Hold briefly then fade
    tl.to({}, { duration: 0.4 })
  }, { dependencies: [visible] })

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      role="presentation"
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-bg-void flex items-center justify-center cursor-pointer"
      onClick={skipBoot}
      onKeyDown={skipBoot}
    >
      <div className="max-w-lg w-full px-8">
        {/* Boot lines */}
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

        {/* System checks */}
        {checks.length > 0 && (
          <div className="mt-4 space-y-1">
            {checks.map((check, i) => (
              <div key={i} className="font-mono text-xs text-text-muted flex items-center gap-2">
                <span className="text-green-live">✓</span>
                <span>{check.label}</span>
                <span className="text-green-live/60 ml-auto">{check.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        {checks.length > 0 && (
          <div className="mt-4">
            <div className="h-0.5 w-full bg-panel-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-core to-blue-light transition-all duration-200 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-mono text-text-muted">Loading portfolio assets...</span>
              <span className="text-[10px] font-mono text-text-muted">{progress}%</span>
            </div>
          </div>
        )}

        {/* System ready */}
        {showReady && (
          <div className="mt-4 font-mono text-sm text-green-live glow-text">
            System ready.
          </div>
        )}

        <div className="mt-8 text-xs text-text-muted font-mono">
          Click or press any key to skip
        </div>
      </div>
    </div>
  )
}
