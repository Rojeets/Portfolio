'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="pt-24 pb-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      {/* Hero Section */}
      <section className="mb-section-gap">
        <div className="max-w-3xl">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.2em] mb-4 block">System Architect</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
            Engineering robust systems from concept to production.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            My workflow is defined by structural precision and clean code principles. I don&apos;t just build features; I architect scalable, maintainable software ecosystems.
          </p>
        </div>
      </section>

      {/* Workflow Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
        {/* Step 1: Planning */}
        <div className="md:col-span-8 glass-panel p-8 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-9xl">design_services</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/20 text-primary w-10 h-10 flex items-center justify-center rounded-lg font-label-md">01</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Planning &amp; Discovery</h3>
            </div>
            <p className="text-on-surface-variant mb-6 max-w-xl">
              Every project starts with a blueprint. I use Postman for API contract definitions and Figma for structural UX flows, ensuring all stakeholders are aligned before a single line of code is written.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Postman', 'Figma', 'System Specs'].map((tag) => (
                <span key={tag} className="bg-surface-variant px-3 py-1 rounded border border-border-subtle text-primary font-label-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Architecting */}
        <div className="md:col-span-4 glass-panel p-8 rounded-xl border-l-4 border-secondary/50">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-secondary/20 text-secondary w-10 h-10 flex items-center justify-center rounded-lg font-label-md">02</span>
            <h3 className="font-headline-sm text-headline-sm text-secondary">Architecting</h3>
          </div>
          <p className="text-on-surface-variant mb-4 font-label-sm leading-relaxed">
            Applying SOLID principles and GoF Design Patterns to ensure decoupled, scalable architectures.
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-on-surface text-sm">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span>Interface Segregation</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface text-sm">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span>Dependency Injection</span>
            </div>
          </div>
        </div>

        {/* Step 3: Implementing */}
        <div className="md:col-span-5 glass-panel p-8 rounded-xl bg-surface-deep">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-code-cyan/20 text-code-cyan w-10 h-10 flex items-center justify-center rounded-lg font-label-md">03</span>
            <h3 className="font-headline-sm text-headline-sm text-code-cyan">Implementing</h3>
          </div>
          <div className="bg-background rounded p-4 font-label-sm text-code-cyan mb-4 border border-border-subtle overflow-hidden">
            <pre className="whitespace-pre-wrap">
              <code>
                <span className="text-on-surface-variant">{`// Clean Code Principle`}</span>{`\n`}
                <span className="text-secondary">class</span> <span className="text-primary">PaymentProcessor</span> {'{\n'}
                {'  '}<span className="text-secondary">public</span> <span className="text-secondary">function</span> <span className="text-primary">execute</span>(<span className="text-tertiary-fixed-dim">Order</span> $order) {'{\n'}
                {'    '}<span className="text-on-surface-variant">{`// Modular, readable logic`}</span>{'\n'}
                {'  }\n}'}
              </code>
            </pre>
          </div>
          <p className="text-on-surface-variant text-sm">
            Focused on Clean Code and self-documenting logic that minimizes technical debt.
          </p>
        </div>

        {/* Step 4: Testing */}
        <div className="md:col-span-7 glass-panel p-8 rounded-xl relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-error/20 text-error w-10 h-10 flex items-center justify-center rounded-lg font-label-md">04</span>
            <h3 className="font-headline-sm text-headline-sm text-error">Automated Testing</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-variant p-4 rounded border border-border-subtle">
              <h4 className="font-label-md text-on-surface mb-2">Unit Testing</h4>
              <p className="text-xs text-on-surface-variant">PHPUnit suites for isolated component verification.</p>
              <div className="mt-3 flex items-center gap-2 text-status-success font-label-sm">
                <span className="w-2 h-2 rounded-full bg-status-success"></span>
                <span>142 Tests Passed</span>
              </div>
            </div>
            <div className="bg-surface-variant p-4 rounded border border-border-subtle">
              <h4 className="font-label-md text-on-surface mb-2">Integration</h4>
              <p className="text-xs text-on-surface-variant">APITestCase ensuring API endpoints meet contracts.</p>
              <div className="mt-3 flex items-center gap-2 text-status-success font-label-sm">
                <span className="w-2 h-2 rounded-full bg-status-success"></span>
                <span>48 Endpoints Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Maintaining */}
        <div className="md:col-span-12 glass-panel p-8 rounded-xl flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-surface-card to-background">
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow"></div>
              <div className="absolute inset-2 rounded-full border-2 border-primary/20 animate-spin-slow-reverse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-primary">analytics</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/20 text-primary w-10 h-10 flex items-center justify-center rounded-lg font-label-md">05</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Maintaining &amp; Monitoring</h3>
            </div>
            <p className="text-on-surface-variant max-w-2xl">
              Deployment is just the beginning. I implement CI/CD pipelines for zero-downtime releases and integrate real-time monitoring to proactively address issues before they impact users.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">rocket_launch</span>
                <span className="font-label-sm text-on-surface">CI/CD Pipeline</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">monitor_heart</span>
                <span className="font-label-sm text-on-surface">CloudWatch Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-section-gap items-start" id="contact">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary mb-6">Let&apos;s build something exceptional.</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Ready to scale your technical infrastructure or need an architect for your next big project? Reach out below or connect with me on social platforms.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-primary border border-border-subtle group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Email</p>
                <a className="font-body-md text-body-md text-on-surface hover:text-primary" href="mailto:rojit@architect.io">rojit@architect.io</a>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-primary border border-border-subtle group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Location</p>
                <p className="font-body-md text-body-md text-on-surface">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex gap-4">
            <a className="p-3 bg-surface-variant rounded-full border border-border-subtle text-on-surface hover:text-primary hover:border-primary transition-all" href="https://github.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg>
            </a>
            <a className="p-3 bg-surface-variant rounded-full border border-border-subtle text-on-surface hover:text-primary hover:border-primary transition-all" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
            </a>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-xl">
          {submitted ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-secondary mb-4">check_circle</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Message Sent!</h3>
              <p className="font-body-md text-on-surface-variant">Thank you for reaching out. I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Subject</label>
                <select className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                  <option>System Architecture Inquiry</option>
                  <option>Full-stack Project Collaboration</option>
                  <option>Technical Consultation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Message</label>
                <textarea
                  placeholder="Tell me about your project or inquiry..."
                  rows={4}
                  required
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-4 rounded-lg hover:brightness-110 transition-all font-bold flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">send</span>
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
