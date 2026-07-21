'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '@/components/ScrollReveal'
import TerminalPrompt from '@/components/TerminalPrompt'
import SectionTransition from '@/components/SectionTransition'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

gsap.registerPlugin(ScrollTrigger)

const data = portfolioData as PortfolioData

function TerminalCard() {
  return (
    <div className="card-base p-5 font-mono text-[13px] leading-relaxed h-full">
      <div className="flex gap-1.5 mb-5">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-green-live/60" />
      </div>
      <div className="space-y-3">
        <div>
          <span className="text-text-muted">$</span>{' '}
          <span className="text-text-muted">whoami</span>
        </div>
        <div className="text-blue-light pl-0">full-stack · laravel · python · ai/ml</div>

        <div>
          <span className="text-text-muted">$</span>{' '}
          <span className="text-text-muted">ls projects/</span>
        </div>
        <div className="text-text-secondary pl-0">ecommerce/ travel/ insurance/ ai-vision/</div>

        <div>
          <span className="text-text-muted">$</span>{' '}
          <span className="text-text-muted">cat status.txt</span>
        </div>
        <div className="text-text-primary pl-0">12+ client projects delivered</div>
        <div className="text-text-primary pl-0">server infra: nginx, docker, pm2</div>

        <div>
          <span className="text-text-muted">$</span>{' '}
          <span className="text-text-secondary animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const statRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useGSAP(() => {
    if (!statRef.current || hasAnimated.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    hasAnimated.current = true

    const targetNum = parseInt(data.about.stats[0].value, 10)
    const obj = { value: 0 }

    gsap.fromTo(
      obj,
      { value: 0 },
      {
        value: targetNum,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          if (!statRef.current) return
          statRef.current.textContent = Math.round(obj.value).toString()
        },
        scrollTrigger: {
          trigger: statRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, { scope: statRef })

  return (
    <SectionTransition id="about" className="py-20 relative gradient-mesh">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">About</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <TerminalPrompt command="cat about.md" className="mb-4" />
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight mb-12">
            {data.about.headline}
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <ScrollReveal className="lg:col-span-5" direction="left">
            <TerminalCard />
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-7" direction="right">
            <div className="space-y-6">
              <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider">About</p>

              <h3 className="text-2xl md:text-3xl font-display font-semibold leading-snug text-text-primary">
                {data.about.statement}
              </h3>

              <ul className="space-y-3 mt-6">
                {data.about.differentiators.map((item, i) => (
                  <li key={i} className="flex gap-3 text-body-sm text-text-secondary leading-relaxed">
                    <span className="text-blue-core mt-1.5 shrink-0">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-3 card-base px-5 py-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-core/8 via-transparent to-blue-light/5 pointer-events-none" />
              <div className="relative flex items-baseline gap-1">
                <span className="font-display font-bold text-gradient text-2xl tracking-tight">
                  <span ref={statRef}>{data.about.stats[0].value}</span>
                  <span>{data.about.stats[0].suffix}</span>
                </span>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
                  {data.about.stats[0].label}
                </span>
              </div>
            </div>

            <span className="text-panel-border">·</span>

            {data.about.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-panel-border bg-panel-bg/50 text-xs font-mono text-text-secondary hover:text-text-primary hover:border-blue-core/30 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </SectionTransition>
  )
}
