import ScrollReveal from '@/components/ScrollReveal'
import SkillConstellation from '@/components/SkillConstellation'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import { GitStats } from '@rojeets/git-stats'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

export const dynamic = 'force-dynamic'

const data = portfolioData as PortfolioData

const GITSTATS_VARS = {
  ['--gs-text' as string]: 'var(--color-text-primary)',
  ['--gs-text-secondary' as string]: 'var(--color-text-secondary)',
  ['--gs-bg' as string]: 'var(--color-panel-bg)',
  ['--gs-border' as string]: 'var(--color-panel-border)',
  ['--gs-label' as string]: 'var(--color-text-secondary)',
}

const GITSTATS_COLORS = ['#1a1a2e', '#20305e', '#2d4a8a', '#3d63ff', '#9fb4ff']

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
          <div className="card-base overflow-hidden rounded-xl p-4 sm:p-6" style={GITSTATS_VARS}>
            <GitStats
              github="Rojeets"
              gitlab="rojeets"
              colors={GITSTATS_COLORS}
            />
          </div>
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
