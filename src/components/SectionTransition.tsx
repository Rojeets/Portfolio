'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  id?: string
  parallax?: boolean
  parallaxAmount?: number
  fadeIn?: boolean
}

export default function SectionTransition({
  children,
  className = '',
  id,
  parallax = false,
  parallaxAmount = 50,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current || !parallax) return

    const el = ref.current
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Additive parallax only — sections stay visible regardless of trigger state
      gsap.to(el, {
        y: -parallaxAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    })

    return () => mm.revert()
  }, { scope: ref })

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  )
}
