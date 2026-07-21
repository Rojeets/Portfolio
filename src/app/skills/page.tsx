'use client'
import { useEffect, useRef, useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import SkillConstellation from '@/components/SkillConstellation'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData

function GitHeatmap() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(500)

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://git-stats.rojitpokharel.com.np') return
      if (typeof e.data === 'number') setHeight(e.data)
      else if (e.data?.height) setHeight(e.data.height)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className="card-base overflow-hidden rounded-xl">
      <iframe
        ref={iframeRef}
        src="https://git-stats.rojitpokharel.com.np/embed?github=Rojeets&gitlab=rojeets"
        width="100%"
        height={height}
        style={{ border: 'none', transition: 'height 0.3s ease' }}
        loading="lazy"
        title="Git Productivity Heatmap"
      />
    </div>
  )
}

export default function SkillsPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-10">
            <span className="label text-blue-light mb-4 block">Skills</span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-4">
              {data.skills.sectionTitle}{' '}
              <span className="text-blue-light glow-text">{data.skills.sectionTitleHighlight}</span>
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl">
              {data.skills.sectionSubtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-16">
          <SkillConstellation categories={data.skills.categories} />
        </ScrollReveal>

        <ScrollReveal className="mb-16">
          <div className="mb-6">
            <span className="label text-blue-light mb-4 block">Activity</span>
            <h2 className="text-2xl font-display font-semibold tracking-tight mb-2">
              Git Productivity <span className="text-blue-light glow-text">Heatmap</span>
            </h2>
            <p className="text-body-md text-text-secondary max-w-2xl">
              Contribution activity across GitHub and GitLab.
            </p>
          </div>
          <GitHeatmap />
        </ScrollReveal>

        <ExperienceCarousel
          roles={data.experience.roles}
          education={data.experience.education}
          achievements={data.experience.achievements}
        />
      </div>
    </main>
  )
}
