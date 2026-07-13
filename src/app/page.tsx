'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[921px] flex items-center overflow-hidden px-margin-mobile md:px-gutter">
        <div className="max-w-container-max mx-auto w-full relative z-10 grid md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-variant/50 border border-border-subtle mb-6">
              <span className="material-symbols-outlined text-secondary text-sm">settings_input_component</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Full-Stack Architect</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">
              Engineering <span className="text-primary-container">Scalable Solutions:</span><br />
              From Architecture to Maintenance.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">
              Specializing in high-performance microservices and robust system design using{' '}
              <span className="text-code-cyan font-label-md">Django, Laravel, React,</span> and{' '}
              <span className="text-code-cyan font-label-md">React Native</span>. Building the digital infrastructure of tomorrow with precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="px-8 py-4 bg-primary-container text-on-primary-container font-label-md text-label-md hover:scale-105 transition-transform flex items-center gap-2 glow-accent"
              >
                View Selected Work <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/skills"
                className="px-8 py-4 border border-primary-container text-primary-container font-label-md text-label-md hover:bg-primary-container/10 transition-all"
              >
                Technical Resume
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4">
            <div className="relative glass-card p-6 border border-border-subtle aspect-square flex flex-col justify-between">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
              <div className="font-label-sm text-label-sm text-code-cyan mb-4">system_status.log</div>
              <div className="space-y-4">
                <div className="h-2 w-3/4 bg-border-subtle/30 rounded"></div>
                <div className="h-2 w-full bg-border-subtle/30 rounded"></div>
                <div className="h-2 w-1/2 bg-primary/20 rounded"></div>
                <div className="h-2 w-5/6 bg-border-subtle/30 rounded"></div>
                <div className="flex items-center gap-2 mt-8">
                  <span className="text-secondary material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-md text-label-md">Architecture Validated</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-md text-label-md">Deployment Success</span>
                </div>
              </div>
              <div className="mt-auto pt-8 border-t border-border-subtle">
                <div className="text-on-surface-variant font-label-sm text-label-sm">Active Nodes</div>
                <div className="font-headline-sm text-headline-sm text-primary">12 Cluster Units</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy (Lifecycle) */}
      <section className="py-section-gap px-margin-mobile md:px-gutter bg-surface-deep">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Core Philosophy</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              A rigorous lifecycle approach ensures that every project is built for longevity, performance, and scalability.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Plan', icon: 'lightbulb', desc: 'Defining requirements and mapping user journeys through technical discovery.' },
              { step: '02', title: 'Architect', icon: 'architecture', desc: 'Designing scalable microservices and data schemas for optimal performance.' },
              { step: '03', title: 'Implement', icon: 'code', desc: 'Clean code execution using industry-standard design patterns and frameworks.' },
              { step: '04', title: 'Test', icon: 'precision_manufacturing', desc: 'Automated unit testing and integration checks to guarantee stability.' },
              { step: '05', title: 'Maintain', icon: 'speed', desc: 'Continuous monitoring and optimization post-deployment.' },
            ].map((item) => (
              <div key={item.step} className="p-6 bg-surface-container border border-border-subtle hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-variant mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-2 uppercase tracking-wider">{item.step}. {item.title}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work Preview */}
      <section className="py-section-gap px-margin-mobile md:px-gutter" id="projects">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Selected Work</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                A curated selection of architectural challenges solved across finance, e-commerce, and logistics sectors.
              </p>
            </div>
            <Link href="/projects" className="text-primary-container font-label-md text-label-md flex items-center gap-2 group">
              View All Projects <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_outward</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="group bg-surface-container border border-border-subtle overflow-hidden flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs3rjC5D869zvm7QRsIG-JVo_C1mc3PzIrYG4SZRGqR-wf6fdGcpuMIVfc72fnNgoIGDPsAXKosIPB5Z7oEXX1-Ai3Lzq2a4SpUCdu2HPVdJpuNmL1GHn0pMebQwdqCutzAUJ4Y6ONckObC925JlYZBp7FUdV2uZnyxKD2m6jvmFt_kUYpLkwrifYBOAzrl9vJ2QFmxv72hx5XaioZ-5YG0qE2gQVTn9pZNpAvll4Rm5r8WFOrNYwfhA"
                  alt="OmniPay Microservices Dashboard"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-secondary/20 text-secondary px-3 py-1 font-label-sm text-label-sm flex items-center gap-1 border border-secondary/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> Production
                  </span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">OmniPay Microservices</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Scalable payment gateway architecture handling 50k+ daily transactions with 99.9% uptime.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['Django', 'PostgreSQL', 'Redis', 'Docker'].map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-surface-variant font-label-sm text-label-sm text-primary">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="group bg-surface-container border border-border-subtle overflow-hidden flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCsV260qy0CTKm_zcuc2fuODoogpyjR0ja6NxuledbkUiDn3aHLPJ9Kzxm6GVgWP72UHCUhTqi-RcoV6Yg4uxDjdud8cK77uBpbMddLC0vmlo2NFChafAzAAcon3UUo-MY7HkPRs2BndnvGgQHiP9NYfZXyrhi-JvExtN4HTbEzWGTbVHOUR_sSLTvm70FnOvSfYs-FeTWt1mPRK1gsIGoKeNi6vdXeJbDoF_bNRln0dEeViMRI8TmXw"
                  alt="LogiTrack Mobile Application"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-primary/20 text-primary px-3 py-1 font-label-sm text-label-sm border border-primary/30">Native App</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">LogiTrack Mobile</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Cross-platform fleet management application with real-time GPS synchronization.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['React Native', 'Firebase', 'Google Maps API'].map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-surface-variant font-label-sm text-label-sm text-primary">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="group bg-surface-container border border-border-subtle overflow-hidden flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgYybT0_MTYf5DwbayMpec846hupTx16rqtLGXI73nsCHNeidx_ICZ9rdS27yPiJQUI2stz9NUCic33PI9SvqhqiehAm--qrIXku-cxw3N-oJwojN_z320EhqVZ0n5Jt8wd87hs6t5ZSLl9ZSAunzFfv5h9nCSuTzdf3Al_7o0JYfPYf2TeJsSPBMe-yhkPCi6JyEs6MimsZYPvSdggKdf9LZivP251tFHz4SCl-MblzOzM1p9OUJSDg"
                  alt="E-Comm Engine Architecture"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-secondary/20 text-secondary px-3 py-1 font-label-sm text-label-sm border border-secondary/30">Case Study</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">E-Comm Engine</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">A high-concurrency commerce engine built with Laravel, featuring complex inventory logic.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['Laravel', 'Vue.js', 'ElasticSearch'].map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-surface-variant font-label-sm text-label-sm text-primary">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack Overview */}
      <section className="py-section-gap px-margin-mobile md:px-gutter relative overflow-hidden" id="skills">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="max-w-container-max mx-auto relative z-10">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-12">Technical Ecosystem</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {[
              {
                title: 'Frontend',
                color: 'primary',
                items: ['React / Next.js', 'React Native', 'Tailwind CSS', 'TypeScript'],
              },
              {
                title: 'Backend',
                color: 'secondary',
                items: ['Django / Python', 'Laravel / PHP', 'Node.js', 'Go (Learning)'],
              },
              {
                title: 'Infrastructure',
                color: 'primary-container',
                items: ['AWS / Azure', 'Docker / K8s', 'CI/CD Pipelines', 'Terraform'],
              },
              {
                title: 'Database',
                color: 'code-cyan',
                items: ['PostgreSQL', 'MongoDB', 'Redis Caching', 'Elasticsearch'],
              },
            ].map((col) => (
              <div key={col.title} className="space-y-8">
                <h4 className={`font-label-md text-label-md text-on-surface-variant border-b border-border-subtle pb-2`}>
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-label-md text-label-md text-on-surface">
                      <span className={`w-2 h-2 bg-${col.color}`}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-gap px-margin-mobile md:px-gutter bg-surface-container-high border-y border-border-subtle" id="contact">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-on-surface mb-8">
            Ready to Architect Your Next Big Idea?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Currently accepting freelance projects and architectural consulting for scalable web and mobile platforms.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Link
              href="mailto:contact@rojit.dev"
              className="w-full md:w-auto px-10 py-5 bg-primary-container text-on-primary-container font-label-md text-label-md flex items-center justify-center gap-3 glow-accent hover:brightness-110"
            >
              <span className="material-symbols-outlined">mail</span> Start a Conversation
            </Link>
            <Link
              href="/contact"
              className="w-full md:w-auto px-10 py-5 border border-primary text-primary font-label-md text-label-md flex items-center justify-center gap-3 hover:bg-primary/10"
            >
              <span className="material-symbols-outlined">schedule</span> Book a Technical Sync
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
