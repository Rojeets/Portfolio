'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { sectionIds, type SectionId } from '@/lib/sectionConfig'

interface UseActiveSectionReturn {
  activeSection: SectionId
  scrollProgress: number
}

export function useActiveSection(): UseActiveSectionReturn {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionsRef = useRef<Map<string, IntersectionObserverEntry>>(new Map())

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionsRef.current.set(entry.target.id, entry)
      } else {
        sectionsRef.current.delete(entry.target.id)
      }
    })

    // Find the section with highest intersection ratio
    let bestId: string | null = null
    let bestRatio = 0
    sectionsRef.current.forEach((entry, id) => {
      if (entry.intersectionRatio > bestRatio) {
        bestRatio = entry.intersectionRatio
        bestId = id
      }
    })

    if (bestId && sectionIds.includes(bestId as SectionId)) {
      setActiveSection(bestId as SectionId)
    }
  }, [])

  useEffect(() => {
    const rootMargin = '-10% 0px -10% 0px'
    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin,
    })

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [handleIntersect])

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { activeSection, scrollProgress }
}
