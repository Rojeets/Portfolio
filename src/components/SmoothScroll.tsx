'use client'

import { useEffect, useRef, useCallback } from 'react'
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

  const raf = useCallback((time: number) => {
    lenisRef.current?.lenis?.raf(time)
  }, [])

  useEffect(() => {
    let running = true

    const loop = (time: number) => {
      if (!running) return
      raf(time)
      requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)

    return () => {
      running = false
    }
  }, [raf])

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  // Recalculate trigger positions after client-side route navigation.
  // Without this, reveals created on a freshly navigated page keep stale
  // positions (document.fonts.ready / window.load already fired) and cards
  // can stay stuck at opacity: 0.
  useEffect(() => {
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
        autoRaf: false,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
