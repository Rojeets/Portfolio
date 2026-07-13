'use client'

export default function ProjectsPage() {
  return (
    <main className="relative pt-32 pb-section-gap overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 tech-grid-bg pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10 mb-20">
        <div className="max-w-3xl">
          <h1 className="font-display-lg text-display-lg mb-6">
            Engineering <span className="text-primary">Scalable Solutions</span> with Architect Precision
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            An interactive deep-dive into complex system architectures, full-stack implementations, and the technical decision-making behind high-performance platforms.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-surface-container rounded-lg border border-border-subtle flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">architecture</span>
              <span className="font-label-md text-label-md">Microservices focused</span>
            </div>
            <div className="px-4 py-2 bg-surface-container rounded-lg border border-border-subtle flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">terminal</span>
              <span className="font-label-md text-label-md">Robust Testing Culture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid (Bento Style) */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10" id="projects">
        {/* SECTION HEADER: Enterprise Complexity */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-headline-md text-headline-md">Enterprise Complexity</h2>
          <div className="h-[1px] flex-grow bg-border-subtle"></div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Tier 01</span>
        </div>

        {/* FEATURED PROJECT: InsuranceClaim Platform */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 group">
            <div className="glass-card rounded-xl p-8 h-full border border-primary/20 relative overflow-hidden transition-transform duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse-dot"></span>
                  PREMIER CASE STUDY
                </span>
              </div>
              <div className="mb-8">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">InsuranceClaim Platform</h3>
                <p className="text-on-surface-variant max-w-2xl font-body-md">A unified ecosystem for automating high-volume claims processing through AI-driven fraud detection and distributed microservices architecture.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-label-md text-label-md text-secondary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">account_tree</span>
                    Architectural Challenges
                  </h4>
                  <ul className="space-y-3 font-body-md text-on-surface-variant text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&#9657;</span>
                      Real-time consistency across 5+ independent services during peak loads.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&#9657;</span>
                      Latency-sensitive AI inferencing for instant document verification.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-secondary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">psychology</span>
                    AI Implementation
                  </h4>
                  <ul className="space-y-3 font-body-md text-on-surface-variant text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&#9657;</span>
                      LLM-integrated extraction pipelines (OCR) with 98.4% accuracy.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&#9657;</span>
                      Predictive modeling for claim approval priority based on historical data.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Django / Python', 'React / Next.js', 'Redis Pub/Sub', 'PostgreSQL Cluster', 'PyTorch', 'Docker & K8s'].map((tag) => (
                  <span key={tag} className="bg-surface-variant px-3 py-1 rounded border border-border-subtle font-label-sm text-label-sm">{tag}</span>
                ))}
              </div>
              <div className="bg-surface-deep/50 rounded-lg p-4 border border-border-subtle">
                <h4 className="font-label-md text-label-md mb-2 text-on-surface">Lifecycle & Testing Strategy</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-2">
                    <div className="text-primary font-bold mb-1">Planning</div>
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">C4 Model Diagrams</div>
                  </div>
                  <div className="text-center p-2 border-x border-border-subtle">
                    <div className="text-secondary font-bold mb-1">TDD</div>
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Django TestCase (94%)</div>
                  </div>
                  <div className="text-center p-2">
                    <div className="text-on-surface font-bold mb-1">CI/CD</div>
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">GitHub Actions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDE STATS / ASYMMETRIC ELEMENT */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="glass-card rounded-xl p-6 border-l-4 border-l-primary flex flex-col justify-between flex-grow">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">analytics</span>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">45%</div>
                <div className="font-label-md text-label-md text-on-surface-variant">Reduction in Claim TAT</div>
              </div>
            </div>
            <div className="bg-surface-card rounded-xl p-6 border border-border-subtle relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-headline-sm text-headline-sm mb-2">Live Node Monitoring</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">The architecture supports horizontal scaling up to 10k concurrent requests.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION HEADER: Specialized SaaS & Services */}
        <div className="flex items-center gap-4 mb-8 mt-20">
          <h2 className="font-headline-md text-headline-md">Specialized SaaS & Micro-Integrations</h2>
          <div className="h-[1px] flex-grow bg-border-subtle"></div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Tier 02</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* ServiceLink Project */}
          <div className="glass-card rounded-xl p-8 border border-border-subtle hover:border-primary/40 transition-all">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-headline-sm text-headline-sm">ServiceLink</h3>
              <span className="material-symbols-outlined text-on-surface-variant">hub</span>
            </div>
            <p className="font-body-md text-on-surface-variant mb-6">
              An API aggregator for home service providers. Solves the fragmentation of scheduling across different legacy CRM systems.
            </p>
            <div className="space-y-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-sm">settings_input_component</span>
                  <span className="font-label-md text-label-md">Integration Challenge</span>
                </div>
                <p className="text-sm text-on-surface-variant pl-6">Normalization of disparate SOAP/REST endpoints into a unified GraphQL interface.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['PHP / Laravel', 'GraphQL', 'PHPUnit'].map((tag) => (
                  <span key={tag} className="bg-surface-container-high px-2 py-1 rounded text-[10px] font-label-sm border border-outline-variant">{tag}</span>
                ))}
              </div>
            </div>
            <div className="border-t border-border-subtle pt-6 flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-secondary">Unit Testing coverage: 100%</span>
              <a className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline" href="#">
                View Docs <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </div>
          </div>

          {/* Restaurant SaaS Project */}
          <div className="glass-card rounded-xl p-8 border border-border-subtle hover:border-primary/40 transition-all">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-headline-sm text-headline-sm">Restaurant Operations SaaS</h3>
              <span className="material-symbols-outlined text-on-surface-variant">restaurant</span>
            </div>
            <p className="font-body-md text-on-surface-variant mb-6">
              A multi-tenant platform for inventory management and real-time ordering sync between kitchen and floor staff.
            </p>
            <div className="space-y-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-sm">speed</span>
                  <span className="font-label-md text-label-md">Operational Challenge</span>
                </div>
                <p className="text-sm text-on-surface-variant pl-6">Ensuring sub-100ms state updates via WebSockets for zero-friction order delivery.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Socket.io', 'MongoDB', 'Jest'].map((tag) => (
                  <span key={tag} className="bg-surface-container-high px-2 py-1 rounded text-[10px] font-label-sm border border-outline-variant">{tag}</span>
                ))}
              </div>
            </div>
            <div className="border-t border-border-subtle pt-6 flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-secondary">Modular Architecture</span>
              <a className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline" href="#">
                Architecture Diagram <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Process / Methodology */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mt-32 relative z-10">
        <div className="bg-surface-container-low rounded-2xl border border-border-subtle p-12 overflow-hidden relative">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
          <h2 className="font-headline-md text-headline-md mb-12 text-center">My Implementation Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Discovery', desc: 'Requirement gathering and domain modeling via DDD principles.' },
              { num: '02', title: 'Architecting', desc: 'Selecting the right stack for scalability, reliability, and security.' },
              { num: '03', title: 'Engineering', desc: 'Clean code implementation with TDD and robust CI/CD pipelines.' },
              { num: '04', title: 'Evolution', desc: 'Post-deployment monitoring, observability, and iterative tuning.' },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-primary mb-4 border border-primary/20">
                  <span className="font-label-md">{step.num}</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-sm mb-2 uppercase tracking-wider">{step.title}</h4>
                <p className="text-xs text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
