'use client'

export default function SkillsPage() {
  return (
    <div className="relative z-10 pt-32 pb-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      {/* Fixed tech grid overlay */}
      <div className="fixed inset-0 tech-grid-bg opacity-20 pointer-events-none z-0"></div>

      {/* Header Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Technical Deep-Dive</h1>
            <p className="font-body-lg text-body-lg max-w-2xl text-on-surface-variant">
              Engineering scalable systems from infrastructure to interface. A breakdown of the core competencies and architectural philosophies I bring to every project.
            </p>
          </div>
          <div className="bg-surface-card border border-border-subtle p-4 flex gap-8">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary">PROJECTS</span>
              <span className="font-headline-sm text-headline-sm">24+</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary">EXPERIENCE</span>
              <span className="font-headline-sm text-headline-sm">5YRS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary">COMMITS</span>
              <span className="font-headline-sm text-headline-sm">2.4k</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Technical Matrix: 4 Main Stacks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-section-gap">
        {/* Backend Mastery */}
        <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'wght' 200" }}>database</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-secondary mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">settings_ethernet</span> Backend Mastery
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-label-md text-primary">Python &amp; Django</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Expert</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-3">Architecting RESTful APIs and asynchronous task processing systems. Expertise in Celery, Redis, and ORM optimization.</p>
              <div className="flex flex-wrap gap-2">
                {['DRF', 'PostgreSQL', 'Graphene GraphQL'].map((tag) => (
                  <span key={tag} className="bg-surface-variant px-3 py-1 text-label-sm font-label-sm border border-outline-variant">{tag}</span>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-border-subtle">
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-label-md text-primary">PHP &amp; Laravel</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Senior</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-3">Building robust MVC applications with modular architectures, Eloquent performance tuning, and custom middleware.</p>
              <div className="flex flex-wrap gap-2">
                {['Livewire', 'MySQL', 'Blade'].map((tag) => (
                  <span key={tag} className="bg-surface-variant px-3 py-1 text-label-sm font-label-sm border border-outline-variant">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Frontend Excellence */}
        <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'wght' 200" }}>layers</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">new_window</span> Frontend Excellence
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-label-md text-primary">React &amp; Next.js</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Expert</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-3">SSR, Static Generation, and complex state management. Performance-first approach with focus on Core Web Vitals.</p>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'Tailwind CSS', 'Redux Toolkit'].map((tag) => (
                  <span key={tag} className="bg-surface-variant px-3 py-1 text-label-sm font-label-sm border border-outline-variant">{tag}</span>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-border-subtle">
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-label-md text-primary">Design Systems</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Architect</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-3">Creating scalable component libraries with Framer Motion, accessibility-first design, and consistent token systems.</p>
              <div className="flex flex-wrap gap-2">
                {['Framer Motion', 'Storybook', 'Headless UI'].map((tag) => (
                  <span key={tag} className="bg-surface-variant px-3 py-1 text-label-sm font-label-sm border border-outline-variant">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Capabilities */}
        <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'wght' 200" }}>smartphone</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-tertiary-fixed-dim mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">devices</span> Mobile Capabilities
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-label-md text-primary">React Native &amp; Expo</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Full Stack</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-3">Cross-platform development with a focus on native performance. Skilled in Expo EAS for streamlined deployment.</p>
              <div className="flex flex-wrap gap-2">
                {['Native Modules', 'Push Notifications', 'EAS Build'].map((tag) => (
                  <span key={tag} className="bg-surface-variant px-3 py-1 text-label-sm font-label-sm border border-outline-variant">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DevOps & Testing */}
        <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'wght' 200" }}>verified_user</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-status-success mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">rocket_launch</span> DevOps &amp; Testing
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'contacts', title: 'Docker', desc: 'Multi-stage builds & orchestration' },
                { icon: 'sync_alt', title: 'CI/CD', desc: 'GitHub Actions & Jenkins' },
                { icon: 'rule', title: 'Testing', desc: 'Jest, Cypress & Pytest' },
                { icon: 'cloud', title: 'AWS', desc: 'S3, EC2, Lambda & RDS' },
              ].map((item) => (
                <div key={item.title} className="bg-surface-container p-4 rounded border border-border-subtle">
                  <span className="material-symbols-outlined text-primary mb-2">{item.icon}</span>
                  <div className="font-label-md text-label-md text-primary">{item.title}</div>
                  <div className="text-[10px] text-on-surface-variant mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section className="mb-section-gap" id="experience">
        <h2 className="font-headline-md text-headline-md text-primary mb-12 flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">work</span> Professional Experience
        </h2>
        <div className="relative pl-8 border-l-2 border-primary/30 ml-4 space-y-12">
          {/* Main Role */}
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-1/3">
                <div className="bg-surface-container p-6 rounded-xl border border-border-subtle">
                  <h4 className="font-headline-sm text-headline-sm text-primary">Infinity Digital Agency</h4>
                  <div className="font-label-md text-label-md text-secondary mt-1">Senior Full-Stack Developer</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant mt-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">calendar_month</span> Jan 2021 &mdash; Present
                  </div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant mt-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">location_on</span> Remote / Singapore
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <div className="bg-surface-card p-8 rounded-xl border border-border-subtle">
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Led the digital transformation of multiple enterprise-level clients, shifting from legacy PHP monolithic structures to modern headless architectures. Oversaw the development lifecycle for over 12 high-traffic web applications.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Engineered a custom CRM for real-estate management using Django and React, reducing operational lead-time by 40%.',
                      'Implemented a comprehensive CI/CD pipeline using Docker and GitHub Actions, cutting deployment failure rates by 65%.',
                      'Optimized mobile application performance for a fintech client using React Native, achieving a 99.9% crash-free rate.',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        <span className="font-body-md text-body-md">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {['Next.js', 'Django', 'AWS', 'Redis', 'PostgreSQL'].map((tag) => (
                      <span key={tag} className="text-xs font-label-sm bg-surface-deep px-3 py-1 border border-primary/20 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Role */}
          <div className="relative opacity-60">
            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-border-subtle ring-4 ring-background"></div>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-1/3">
                <h4 className="font-headline-sm text-headline-sm">Previous Engagement</h4>
                <div className="font-label-md text-label-md mt-1">Freelance Software Engineer</div>
              </div>
              <div className="lg:w-2/3">
                <p className="font-body-md text-body-md">Developed MVPs for early-stage startups using Laravel and Vue.js, focusing on rapid prototyping and user feedback cycles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Snippet: Architectural Philosophy */}
      <section className="mb-section-gap">
        <div className="bg-[#0F172A] rounded-xl border-l-4 border-primary overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-surface-container-high border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <span className="ml-4 font-label-sm text-label-sm text-on-surface-variant">architecture_manifesto.py</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Python 3.11</span>
          </div>
          <div className="p-8 font-label-md text-label-md leading-relaxed overflow-x-auto">
            <pre className="text-on-surface">
              <code>
                <span className="text-secondary">class</span> <span className="text-primary">EngineeringExcellence</span>{`:`}
{`\n    `}
                <span className="text-secondary">def</span> <span className="text-primary">__init__</span>(self){`:`}
{`\n        `}
                self.principles = [<span className="text-code-cyan">&quot;Scalability&quot;</span>, <span className="text-code-cyan">&quot;Maintainability&quot;</span>, <span className="text-code-cyan">&quot;Security&quot;</span>]
{`\n\n    `}
                <span className="text-secondary">def</span> <span className="text-primary">build_system</span>(self, requirements){`:`}
{`\n        `}
                <span className="text-on-surface-variant"># Always prefer modular composition over inheritance</span>
{`\n        `}
                stack = self.select_optimal_stack(requirements)
{`\n        \n    `}
                <span className="text-secondary">try</span>{`:`}
{`\n            `}
                system = stack.architect(resilient=<span className="text-secondary">True</span>)
{`\n            `}
                system.apply_testing_suite(coverage=<span className="text-status-success">0.95</span>)
{`\n            `}
                <span className="text-secondary">return</span> system.deploy_to_cloud()
{`\n        `}
                <span className="text-secondary">except</span> <span className="text-primary">ArchitecturalDebt</span> <span className="text-secondary">as</span> e{`:`}
{`\n            `}
                <span className="text-secondary">raise</span> <span className="text-error">RefactorRequired</span>(e)
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-card p-12 rounded-2xl text-center relative overflow-hidden">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 relative z-10">Ready to build something complex?</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto relative z-10">
          I&apos;m currently available for senior engineering roles or high-impact technical consulting.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <a
            href="mailto:contact@rojit.dev"
            className="bg-primary-container text-on-primary-container font-label-md text-label-md px-10 py-4 rounded-lg font-bold hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">mail</span> Hire Me
          </a>
          <button className="bg-transparent border border-primary text-primary font-label-md text-label-md px-10 py-4 rounded-lg font-bold hover:bg-primary/10 transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">download</span> Download Resume
          </button>
        </div>
      </section>
    </div>
  )
}
