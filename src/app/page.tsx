'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Code, Database, HardDrives, Cpu, Gear, Rocket } from '@/components/Icons'
import About from '@/components/About'
import ScrollReveal from '@/components/ScrollReveal'
import SectionTransition from '@/components/SectionTransition'
import TerminalPrompt from '@/components/TerminalPrompt'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import SkillConstellation from '@/components/SkillConstellation'
import ProjectCard from '@/components/ProjectCard'
import MagneticButton from '@/components/MagneticButton'
import Services from '@/components/Services'
import FaqSection from '@/components/FaqSection'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData

const philosophySteps = [
  { icon: Gear, title: 'Plan', desc: 'Requirement gathering and domain modeling' },
  { icon: Code, title: 'Architect', desc: 'Scalable schemas and system design' },
  { icon: Rocket, title: 'Implement', desc: 'Clean code with industry patterns' },
  { icon: Database, title: 'Test', desc: 'Automated testing for stability' },
  { icon: HardDrives, title: 'Maintain', desc: 'Monitoring and optimization' },
]

export default function HomePage() {
  const featuredProjects = data.projects.items.slice(0, 3)

  return (
    <main className="">
      {/* Scanline overlay — subtle CRT effect */}
      <div className="fixed inset-0 z-[5] scanlines opacity-40 pointer-events-none" />

      {/* Hero */}
      <section id="hero" className="relative h-screen flex flex-col justify-center overflow-hidden pl-12 md:pl-20">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-text-eyebrow mb-5 font-mono">
            {data.personal.name} / {data.personal.title}
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-[68px] font-display font-light leading-[1.05] tracking-[-0.02em] mb-4">
            Rojit <b className="font-semibold">Pokharel</b>
          </h1>

          <p className="font-display text-xl md:text-2xl text-text-primary leading-snug mb-2">
            Full-Stack Web Developer <span className="text-text-muted">&</span> System Architect
          </p>

          <p className="text-xs font-mono text-text-secondary tracking-wide mb-6">
            <span className="text-green-live">●</span> {data.personal.location}
          </p>

          <p className="text-body-md text-text-secondary leading-relaxed max-w-md">
            {data.personal.tagline}
          </p>
        </div>

        <div className="absolute bottom-10 left-12 md:left-20 text-xs text-text-muted tracking-[0.08em] uppercase font-mono">
          Move to explore · scroll to enter
        </div>

        {/* Terminal card — desktop only */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-core/5 rounded-2xl blur-xl" />
            <div className="relative bg-bg-panel/80 backdrop-blur-sm border border-panel-border rounded-xl p-8 w-80">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-live/60" />
                <span className="ml-2 text-xs font-mono text-text-muted">terminal</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <p className="text-text-muted">
                  <span className="text-blue-core">$</span> whoami
                </p>
                <p className="text-text-primary pl-2">Rojit Pokharel</p>
                <p className="text-text-muted">
                  <span className="text-blue-core">$</span> cat role.txt
                </p>
                <p className="text-text-primary pl-2">{data.personal.title}</p>
                <p className="text-text-muted">
                  <span className="text-blue-core">$</span> echo $STACK
                </p>
                <p className="text-blue-light pl-2">Laravel · React · Django · Docker</p>
                <p className="text-text-muted">
                  <span className="text-blue-core">$</span> <span className="animate-pulse">_</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* About */}
      <About />

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* Philosophy */}
      <SectionTransition id="philosophy" className="py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Process</span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
            </div>
            <TerminalPrompt command="cat /etc/philosophy.md" className="mb-4" />
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-2">
              Philosophy
            </h2>
            <p className="text-body-md text-text-secondary mb-12">
              How I approach every project.
            </p>
          </ScrollReveal>

          {/* Timeline strip */}
          <ScrollReveal className="relative" stagger={0}>
            {/* Horizontal connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-core/20 to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3">
              {philosophySteps.map((step, i) => (
                <div key={step.title} className="relative group">
                  {/* Step number dot on the timeline (desktop) */}
                  <div className="hidden lg:flex absolute -top-[11px] left-6 w-6 h-6 rounded-full bg-bg-void border-2 border-blue-core/30 items-center justify-center z-10 group-hover:border-blue-core transition-colors">
                    <span className="text-[8px] font-mono text-blue-light">{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="card-base p-5 pt-6 lg:pt-10 h-full group-hover:-translate-y-1 group-hover:border-blue-core/20 group-hover:shadow-lg group-hover:shadow-blue-core/5 transition-all duration-300 relative overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-core/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-blue-core/10 flex items-center justify-center text-blue-light mb-4 group-hover:bg-blue-core/15 transition-colors">
                        <step.icon size={20} />
                      </div>
                      <h3 className="font-display font-semibold text-base text-text-primary mb-1.5">{step.title}</h3>
                      <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </SectionTransition>

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* Skills */}
      <SectionTransition id="skills" className="py-20 bg-panel-bg/20 relative terminal-grid">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Skills</span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
            </div>
            <TerminalPrompt command='npx skills --category=all' className="mb-4" />
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-2">
              Technical <span className="text-gradient">Ecosystem</span>
            </h2>
            <p className="text-body-md text-text-secondary mb-12 max-w-lg">
              Tools and technologies I work with daily.
            </p>
          </ScrollReveal>

          {/* Interactive constellation */}
          <ScrollReveal>
            <SkillConstellation categories={data.skills.categories} />
          </ScrollReveal>

          {/* Real-world applications */}
          <ScrollReveal className="mt-12">
            <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-4">
              {data.skills.realWorldTitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {data.skills.realWorldApplications.map((app) => (
                <span
                  key={app}
                  className="px-3 py-1.5 text-xs font-mono bg-blue-core/5 text-blue-light/70 rounded-full border border-blue-core/10 hover:border-blue-core/25 hover:text-blue-light transition-colors cursor-default"
                >
                  {app}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </SectionTransition>

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* Services */}
      <Services />

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* Projects Preview */}
      <SectionTransition id="projects" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Work</span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
            </div>
            <TerminalPrompt command="ls ~/projects --featured" className="mb-4" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-semibold mb-2">
                  {data.projects.sectionTitle}
                </h2>
                <p className="text-body-md text-text-secondary max-w-lg">
                  {data.projects.sectionSubtitle}
                </p>
              </div>
              <MagneticButton as="a" href="/projects" strength={0.2}>
                <span className="text-blue-light text-sm font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  View All <ArrowUpRight size={14} />
                </span>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Masonry layout: featured large + 2 stacked */}
          <div className="grid lg:grid-cols-3 gap-4 auto-rows-auto">
            {/* Featured project — 2 cols on desktop */}
            <ScrollReveal className="lg:col-span-2 lg:row-span-2" direction="left">
              <ProjectCard
                project={featuredProjects[0]}
                variant="featured"
              />
            </ScrollReveal>

            {/* Stacked smaller projects */}
            {featuredProjects.slice(1).map((project, idx) => (
              <ScrollReveal key={project.title} direction="right" delay={idx * 0.1}>
                <ProjectCard
                  project={project}
                  variant="standard"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionTransition>

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* Blog Preview */}
      <SectionTransition id="blog" className="py-20 bg-panel-bg/20 relative terminal-grid">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Writing</span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
            </div>
            <TerminalPrompt command='cat posts.log | tail -2' className="mb-4" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-semibold mb-2">
                  From the Terminal
                </h2>
                <p className="text-body-md text-text-secondary max-w-lg">
                  Thoughts on system design, scalability, and the craft of building.
                </p>
              </div>
              <MagneticButton as="a" href="/blog" strength={0.2}>
                <span className="text-blue-light text-sm font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  All Posts <ArrowUpRight size={14} />
                </span>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Featured first post + remaining */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Featured blog post — large */}
            {data.blog.items[0] && (
              <ScrollReveal direction="left">
                <Link href={`/blog/${data.blog.items[0].slug}`} className="block h-full">
                  <article className="card-blog group relative overflow-hidden group-hover:-translate-y-1 group-hover:border-blue-core/20 group-hover:shadow-lg group-hover:shadow-blue-core/5 transition-all duration-300 h-full flex flex-col">
                    {data.blog.items[0].image && (
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <Image
                          src={data.blog.items[0].image}
                          alt={data.blog.items[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-void/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-[11px] font-mono text-blue-light px-2.5 py-1 rounded-full bg-blue-core/10 backdrop-blur-sm border border-blue-core/20">
                            {data.blog.items[0].tags[0]}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display font-semibold text-lg text-text-primary mb-2 group-hover:text-blue-light transition-colors">
                        {data.blog.items[0].title}
                      </h3>
                      <p className="text-sm text-text-muted line-clamp-2 mb-4 leading-relaxed">{data.blog.items[0].excerpt}</p>
                      <div className="flex items-center gap-3 mt-auto text-[11px] text-text-muted font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-core/40" />
                          {data.blog.items[0].readTime}
                        </span>
                        <span className="text-panel-border">|</span>
                        <span>{data.blog.items[0].date}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            )}

            {/* Remaining posts — stacked */}
            <div className="flex flex-col gap-4">
              {data.blog.items.slice(1, 4).map((blog: any, idx: number) => (
                <ScrollReveal key={blog.slug} direction="right" delay={idx * 0.1}>
                  <Link href={`/blog/${blog.slug}`} className="block">
                    <article className="card-blog group relative overflow-hidden group-hover:-translate-y-1 group-hover:border-blue-core/20 group-hover:shadow-lg group-hover:shadow-blue-core/5 transition-all duration-300 flex flex-row">
                      {blog.image && (
                        <div className="w-32 sm:w-40 shrink-0 overflow-hidden relative">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 128px, 160px"
                          />
                        </div>
                      )}
                      <div className="p-4 flex flex-col flex-1">
                        <span className="text-[11px] font-mono text-blue-light mb-1.5">{blog.tags[0]}</span>
                        <h3 className="font-display font-semibold text-sm text-text-primary mb-1.5 group-hover:text-blue-light transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-text-muted line-clamp-2 mb-2 leading-relaxed">{blog.excerpt}</p>
                        <div className="flex items-center gap-3 mt-auto text-[11px] text-text-muted font-mono">
                          <span>{blog.readTime}</span>
                          <span className="text-panel-border">|</span>
                          <span>{blog.date}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* Experience */}
      <ExperienceCarousel
        roles={data.experience.roles}
        education={data.experience.education}
        achievements={data.experience.achievements}
      />

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* FAQ */}
      <FaqSection />

      {/* Terminal divider */}
      <div className="terminal-divider mx-6" />

      {/* CTA */}
      <SectionTransition id="cta" className="py-24 relative overflow-hidden">
        {/* Aurora gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-core/8 via-bg-void to-purple-500/5 animate-aurora" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-transparent to-bg-void" />

        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal>
            {/* Availability badge */}
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-live/15 bg-green-live/5 text-xs font-mono text-green-live">
                <span className="w-2 h-2 rounded-full bg-green-live animate-pulse-dot" />
                {data.personal.availability}
              </span>
            </div>

            <TerminalPrompt command='echo $STATUS' className="justify-center mb-6" />

            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 leading-tight">
                Ready to build<br />
                <span className="text-gradient">something great?</span>
              </h2>
              <p className="text-body-lg text-text-secondary mb-10 max-w-md mx-auto">
                Let&apos;s turn your ideas into production-grade systems.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <MagneticButton as="a" href="mailto:info@rojitpokharel.com.np" strength={0.2}>
                  <span className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-core text-white text-sm font-semibold rounded-lg hover:bg-blue-core/90 transition-all animate-pulse-glow">
                    Start a Conversation
                  </span>
                </MagneticButton>
                <MagneticButton as="a" href="/contact" strength={0.2}>
                  <span className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-panel-border text-text-primary text-sm font-medium rounded-lg hover:bg-white/[0.03] hover:border-blue-core/20 transition-all">
                    Book a Sync
                  </span>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionTransition>
    </main>
  )
}
