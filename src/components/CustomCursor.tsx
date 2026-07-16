'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window
    if (isTouch) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }

    const handleMove = (e: MouseEvent) => {
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
    }

    const handleEnter = () => {
      visibleRef.current = true
      gsap.to(dot, { opacity: 1, duration: 0.3 })
      gsap.to(ring, { opacity: 1, duration: 0.3 })
    }

    // Hover detection
    const handleHoverStart = () => ring.classList.add('hovering')
    const handleHoverEnd = () => ring.classList.remove('hovering')

    // Track interactive elements
    const observeInteractive = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
        el.addEventListener('mouseenter', handleHoverStart)
        el.addEventListener('mouseleave', handleHoverEnd)
      })
    }

    observeInteractive()
    const observer = new MutationObserver(observeInteractive)
    observer.observe(document.body, { childList: true, subtree: true })

    // Animation loop
    let raf: number
    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.15
      pos.y += (mouse.y - pos.y) * 0.15

      gsap.set(dot, { x: mouse.x - 4, y: mouse.y - 4 })
      gsap.set(ring, { x: pos.x - 16, y: pos.y - 16 })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    // Initial hidden state
    gsap.set(dot, { opacity: 0 })
    gsap.set(ring, { opacity: 0 })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
