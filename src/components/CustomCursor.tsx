'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

type CursorState = 'default' | 'text' | 'project' | 'button' | 'link'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement[]>([])
  const visibleRef = useRef(false)
  const stateRef = useRef<CursorState>('default')
  const trailPositions = useRef<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window
    if (isTouch) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }
    const prevMouse = { x: pos.x, y: pos.y }

    // Initialize trail positions
    for (let i = 0; i < 3; i++) {
      trailPositions.current.push({ x: pos.x, y: pos.y })
    }

    const handleMove = (e: MouseEvent) => {
      prevMouse.x = mouse.x
      prevMouse.y = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY

      if (!visibleRef.current) {
        visibleRef.current = true
        gsap.to(dot, { opacity: 1, duration: 0.3 })
        gsap.to(ring, { opacity: 1, duration: 0.3 })
      }
    }

    const handleLeave = () => {
      visibleRef.current = false
      gsap.to(dot, { opacity: 0, duration: 0.3 })
      gsap.to(ring, { opacity: 0, duration: 0.3 })
      trailRef.current.forEach(t => gsap.to(t, { opacity: 0, duration: 0.2 }))
    }

    const handleEnter = () => {
      visibleRef.current = true
      gsap.to(dot, { opacity: 1, duration: 0.3 })
      gsap.to(ring, { opacity: 1, duration: 0.3 })
    }

    // Detect element type under cursor
    const getCursorState = (target: Element | null): CursorState => {
      if (!target) return 'default'
      const el = target as HTMLElement

      if (el.closest('[data-cursor="project"]')) return 'project'
      if (el.closest('button, [role="button"], input, textarea, select, .magnetic-btn')) return 'button'
      if (el.closest('a, [href]')) return 'link'
      if (el.closest('h1, h2, h3, h4, h5, h6, p, span, code, pre')) return 'text'
      return 'default'
    }

    const applyCursorState = (state: CursorState) => {
      if (stateRef.current === state) return
      stateRef.current = state

      // Reset ring classes
      ring.className = 'cursor-ring'

      switch (state) {
        case 'text':
          ring.classList.add('cursor-text')
          gsap.to(dot, { scale: 0.5, duration: 0.3, ease: 'power2.out' })
          break
        case 'project':
          ring.classList.add('cursor-project')
          gsap.to(dot, { scale: 0.3, opacity: 0.5, duration: 0.3, ease: 'power2.out' })
          break
        case 'button':
          ring.classList.add('cursor-button')
          gsap.to(dot, { scale: 1.5, duration: 0.3, ease: 'power2.out' })
          break
        case 'link':
          ring.classList.add('cursor-link')
          gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
          break
        default:
          gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
          break
      }
    }

    // Track elements and update cursor state
    const observeInteractive = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, .magnetic-btn, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          const state = getCursorState(el)
          applyCursorState(state)
        })
        el.addEventListener('mouseleave', () => {
          applyCursorState('default')
        })
      })
    }

    observeInteractive()
    const observer = new MutationObserver(observeInteractive)
    observer.observe(document.body, { childList: true, subtree: true })

    // Track mouse for state detection
    const handleMouseMove = (e: MouseEvent) => {
      const state = getCursorState(e.target as Element)
      applyCursorState(state)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Animation loop with trail
    let raf: number
    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.15
      pos.y += (mouse.y - pos.y) * 0.15

      gsap.set(dot, { x: mouse.x - 4, y: mouse.y - 4 })
      gsap.set(ring, { x: pos.x - 16, y: pos.y - 16 })

      // Trail: shift positions back and draw fading copies
      const speed = Math.hypot(mouse.x - prevMouse.x, mouse.y - prevMouse.y)
      const showTrail = speed > 15

      trailRef.current.forEach((trail, i) => {
        const prev = i === 0 ? pos : trailPositions.current[i - 1]
        trailPositions.current[i].x += (prev.x - trailPositions.current[i].x) * (0.2 - i * 0.04)
        trailPositions.current[i].y += (prev.y - trailPositions.current[i].y) * (0.2 - i * 0.04)

        gsap.set(trail, {
          x: trailPositions.current[i].x - 3,
          y: trailPositions.current[i].y - 3,
          opacity: showTrail ? 0.15 - i * 0.04 : 0,
        })
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    // Initial hidden state
    gsap.set(dot, { opacity: 0 })
    gsap.set(ring, { opacity: 0 })
    trailRef.current.forEach(t => gsap.set(t, { opacity: 0 }))

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Trail dots */}
      {[0, 1, 2].map(i => (
        <div
          key={i}
          ref={el => { if (el) trailRef.current[i] = el }}
          className="cursor-trail"
          style={{ opacity: 0 }}
        />
      ))}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
