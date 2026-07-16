'use client'

import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Calendar } from './Icons'
import type { ExperienceRole } from '@/lib/types'

gsap.registerPlugin(ScrollTrigger)

const roleColors = [
  { accent: 'text-blue-light', dot: 'bg-blue-core', line: 'bg-blue-core', glow: 'rgba(61,99,255,0.15)' },
  { accent: 'text-green-live', dot: 'bg-green-live', line: 'bg-green-live', glow: 'rgba(34,197,94,0.15)' },
  { accent: 'text-purple-400', dot: 'bg-purple-500', line: 'bg-purple-500', glow: 'rgba(168,85,247,0.15)' },
]

function getYear(period: string): number {
  const match = period.match(/(\d{4})/)
  return match ? parseInt(match[1]) : 0
}

export default function ExperienceTimeline({
  roles,
  education,
  achievements,
}: {
  roles: ExperienceRole[]
  education?: { degree: string; institution: string; location: string; period: string }[]
  achievements?: string[]
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const achievementsListRefs = useRef<(HTMLUListElement | null)[]>([])
  const animatingRef = useRef(false)

  const sortedRoles = [...roles].sort((a, b) => getYear(b.period) - getYear(a.period))

  const toggleExpand = useCallback((index: number) => {
    if (animatingRef.current) return
    const target = achievementsListRefs.current[index]
    if (!target) return

    if (expandedIndex === index) {
      animatingRef.current = true
      gsap.to(target.children, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        stagger: -0.03,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(target, { height: 0 })
          setExpandedIndex(null)
          animatingRef.current = false
        },
      })
    } else {
      if (expandedIndex !== null) {
        const prev = achievementsListRefs.current[expandedIndex]
        if (prev) {
          gsap.set(prev, { height: 0 })
          gsap.set(prev.children, { opacity: 0, y: -8 })
        }
      }
      setExpandedIndex(index)
      const fullHeight = target.scrollHeight
      gsap.set(target, { height: 0, overflow: 'hidden' })
      gsap.to(target, {
        height: fullHeight,
        duration: 0.35,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(target, { height: 'auto', overflow: 'visible' })
          gsap.fromTo(
            target.children,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', onComplete: () => { animatingRef.current = false } }
          )
        },
      })
    }
  }, [expandedIndex])

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.timeline-entry', { opacity: 1, y: 0, x: 0 })
      gsap.set('.timeline-node', { scale: 1, opacity: 1 })
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const entries = trackRef.current!.querySelectorAll('.timeline-entry')
      const nodes = trackRef.current!.querySelectorAll('.timeline-node')

      gsap.from(entries, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from(nodes, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-20 relative" id="experience">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Experience</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-2">
            The Timeline
          </h2>
          <p className="text-body-md text-text-secondary">
            Where the cursor blinked, the servers ran, and the systems shipped.
          </p>
        </div>

        {/* Vertical timeline */}
        <div ref={trackRef} className="relative">
          {/* Central vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-core/30 via-panel-border to-panel-border md:-translate-x-px" />

          {sortedRoles.map((role, i) => {
            const colors = roleColors[i % roleColors.length]
            const isExpanded = expandedIndex === i
            const isEven = i % 2 === 0

            return (
              <div
                key={`${role.company}-${role.title}`}
                className={`timeline-entry relative mb-10 md:mb-12 ${
                  isEven ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'
                } pl-14 md:pl-0`}
              >
                {/* Timeline node */}
                <div
                  className={`timeline-node absolute left-6 md:left-1/2 top-6 w-3 h-3 rounded-full ${colors.dot} ring-4 ring-bg-void md:-translate-x-1.5 z-10`}
                  style={{ boxShadow: `0 0 12px ${colors.glow}` }}
                />

                {/* Card */}
                <div
                  className="card-base p-5 md:p-6 cursor-pointer select-none relative overflow-hidden group group-hover:-translate-y-1 group-hover:border-blue-core/20 group-hover:shadow-lg group-hover:shadow-blue-core/5 transition-all duration-300"
                  onClick={() => toggleExpand(i)}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
                    style={{ background: `radial-gradient(300px circle at 50% 0%, ${colors.glow}, transparent)` }}
                  />

                  {/* Colored top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 ${colors.line} opacity-20`} />

                  <div className="relative">
                    {/* Period & Location */}
                    <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                      <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
                        <Calendar size={11} />
                        {role.period}
                      </span>
                      <span className="text-text-muted/30">|</span>
                      <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
                        <MapPin size={11} />
                        {role.location}
                      </span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-lg md:text-xl font-display font-semibold mb-1 text-text-primary">
                      {role.title}
                    </h3>
                    <p className={`text-sm font-mono ${colors.accent} mb-3`}>
                      {role.company}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {role.description}
                    </p>

                    {/* Achievements toggle */}
                    <div className="relative">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleExpand(i) }}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-light/70 hover:text-blue-light transition-colors mb-2"
                      >
                        <span className={`inline-block transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>&#9657;</span>
                        {isExpanded ? 'Collapse' : `${role.achievements.length} achievements`}
                      </button>
                      <div className="achievements-wrapper">
                        <ul
                          ref={(el) => { achievementsListRefs.current[i] = el }}
                          className="space-y-1.5"
                          style={{ height: 0, overflow: 'hidden' }}
                        >
                          {role.achievements.map((achievement, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-xs text-text-secondary"
                            >
                              <span className={`mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full ${colors.dot} opacity-50`} />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Education + Achievements footer */}
        {(education && education.length > 0) || (achievements && achievements.length > 0) ? (
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {education && education.length > 0 && (
              <div className="card-base p-5 hover:-translate-y-1 hover:border-blue-core/20 transition-all duration-300">
                <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-4">
                  Education
                </h4>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.degree} className="relative pl-4 border-l border-panel-border">
                      <p className="text-sm font-medium text-text-primary">{edu.degree}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{edu.institution}</p>
                      <div className="flex gap-3 mt-1.5 text-[10px] font-mono text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={9} /> {edu.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={9} /> {edu.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {achievements && achievements.length > 0 && (
              <div className="card-base p-5 hover:-translate-y-1 hover:border-blue-core/20 transition-all duration-300">
                <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-4">
                  Achievements
                </h4>
                <div className="flex flex-wrap gap-2">
                  {achievements.map((a) => (
                    <span
                      key={a}
                      className="px-3 py-1.5 text-[11px] font-mono bg-blue-core/5 text-blue-light/80 rounded-full border border-blue-core/10 hover:border-blue-core/25 transition-colors"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}
