'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ReactLenis, type LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [])

  // Reset scroll position and recalculate trigger positions after route navigation.
  useEffect(() => {
    if (pathname === '/') return
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true })
    const t = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => clearTimeout(t)
  }, [pathname])

  // Expose lenis on window for other components that need direct access
  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (lenis && typeof window !== 'undefined') {
      ;(window as any).__lenis = lenis
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__lenis
      }
    }
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
