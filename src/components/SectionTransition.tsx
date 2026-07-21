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
  fadeIn = true,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      // No animations — elements visible immediately
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (fadeIn) {
        gsap.from(ref.current!, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current!,
            start: 'top 90%',
            once: true,
          },
        })
      }

      if (parallax) {
        gsap.to(ref.current!, {
          y: -parallaxAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current!,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    })

    return () => mm.revert()
  }, { scope: ref })

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  )
}
