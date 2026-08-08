'use client'

import { useRef, type MouseEvent } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from '@/components/Icons'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  index?: number
  variant?: 'featured' | 'standard'
}

export default function ProjectCard({
  project,
  index = 0,
  variant = 'standard',
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useRef(false)

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion.current || !cardRef.current) return
    if ('ontouchstart' in window) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(61, 99, 255, 0.08), transparent 40%)`
    }
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent'
    }
  }

  const isFeatured = variant === 'featured'

  return (
    <Link
      href={`/projects/${project.slug}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="project"
      className={`card-base group relative overflow-hidden transition-all duration-300 ease-out block
        ${isFeatured ? 'p-6 md:p-8 h-full' : 'p-5 h-full'}
        hover:-translate-y-1 hover:border-blue-core/20 hover:shadow-lg hover:shadow-blue-core/5`}
    >
      {/* Tilt glow overlay */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300" />

      {/* Top gradient accent */}
      <div className={`absolute top-0 left-0 right-0 ${
        isFeatured ? 'h-1 bg-gradient-to-r from-blue-core/40 via-blue-light/30 to-blue-core/40' : 'h-0.5 bg-gradient-to-r from-blue-core/20 to-transparent'
      }`} />

      {/* Content */}
      <div className="relative flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className={`${isFeatured ? 'w-11 h-11' : 'w-9 h-9'} rounded-xl bg-blue-core/10 flex items-center justify-center text-blue-light`}>
            <ArrowUpRight size={isFeatured ? 22 : 18} />
          </div>
          <span className="text-[11px] font-mono text-green-live flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-live/5 border border-green-live/10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-live animate-pulse-dot" />
            {project.metric}
          </span>
        </div>

        <h3 className={`${isFeatured ? 'text-xl md:text-2xl' : 'text-base'} font-display font-semibold mb-2 group-hover:text-blue-light transition-colors`}>
          {project.title}
        </h3>

        <p className={`text-sm text-text-secondary mb-4 leading-relaxed ${isFeatured ? 'line-clamp-4' : 'line-clamp-2'}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.slice(0, isFeatured ? undefined : 3).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-[11px] font-mono bg-white/[0.03] text-text-muted rounded-md border border-panel-border
                group-hover:border-blue-core/15 group-hover:text-text-secondary transition-colors`}
            >
              {tag}
            </span>
          ))}
          {!isFeatured && project.tech.length > 3 && (
            <span className="px-2 py-0.5 text-[11px] font-mono text-text-muted">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-light mt-4 group-hover:gap-2.5 transition-all">
          Read case study <ArrowUpRight size={12} />
        </span>
      </div>
    </Link>
  )
}
