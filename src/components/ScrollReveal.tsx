'use client'

import { useRef, ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
  direction = 'up',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const getInitialProps = () => {
    switch (direction) {
      case 'up': return { y: 40, opacity: 0 }
      case 'down': return { y: -40, opacity: 0 }
      case 'left': return { x: 40, opacity: 0 }
      case 'right': return { x: -40, opacity: 0 }
      case 'none': return { opacity: 0 }
      default: return { y: 40, opacity: 0 }
    }
  }

  useGSAP(() => {
    if (!ref.current) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(ref.current, { opacity: 1 })
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Safety net: if element is already in viewport, skip animation
      const rect = ref.current!.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        gsap.set(ref.current, { opacity: 1, y: 0, x: 0 })
        return
      }

      // Refresh ScrollTrigger after fonts/layout settle
      const refresh = () => ScrollTrigger.refresh()
      document.fonts.ready.then(refresh)
      window.addEventListener('load', refresh)

      const children = ref.current?.children
      if (!children || children.length === 0) {
        gsap.from(ref.current, {
          ...getInitialProps(),
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once,
          },
        })
      } else {
        gsap.from(children, {
          ...getInitialProps(),
          duration: 0.8,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once,
          },
        })
      }

      return () => {
        window.removeEventListener('load', refresh)
      }
    })

    return () => mm.revert()
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
