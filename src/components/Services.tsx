'use client'

import { Code, Store, Database, Rocket, Gear, ShieldCheck } from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'
import SectionTransition from '@/components/SectionTransition'
import TerminalPrompt from '@/components/TerminalPrompt'

const services = [
  {
    icon: Code,
    title: 'Custom Web Applications',
    desc: 'Scalable, production-grade web apps built with Laravel, Django, and modern JavaScript — tailored to your business logic.',
  },
  {
    icon: Store,
    title: 'E-commerce & Marketplaces',
    desc: 'Online stores and multi-vendor marketplaces with payment gateway integration — eSewa, Khalti, ConnectIPS, Stripe, and PayPal.',
  },
  {
    icon: Database,
    title: 'SaaS & Admin Dashboards',
    desc: 'Multi-tenant SaaS platforms, admin panels, and management systems with clean data modeling and optimized queries.',
  },
  {
    icon: Rocket,
    title: 'API Development',
    desc: 'RESTful APIs, third-party integrations, and backend services designed for reliability and clean, documented contracts.',
  },
  {
    icon: Gear,
    title: 'React & Next.js Frontends',
    desc: 'Fast, SEO-friendly frontends with Next.js and React — server rendering, dynamic components, and responsive design.',
  },
  {
    icon: ShieldCheck,
    title: 'Servers & DevOps',
    desc: 'Linux server setup, Nginx, SSL, Docker containers, and queue workers so your application stays up and secure.',
  },
]

export default function Services() {
  return (
    <SectionTransition id="services" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">Services</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <TerminalPrompt command="ls ~/services --available" className="mb-4" />
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-2">
            Web & WebApp Development{' '}
            <span className="text-gradient">Services</span>
          </h2>
          <p className="text-body-md text-text-secondary mb-12 max-w-lg">
            Based in Kathmandu, Nepal — serving local and international clients with production systems that ship.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, idx) => (
            <ScrollReveal key={service.title} delay={idx * 0.05}>
              <div className="card-base p-6 h-full group hover:border-blue-core/20 hover:shadow-lg hover:shadow-blue-core/5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-blue-core/10 flex items-center justify-center text-blue-light mb-4 group-hover:bg-blue-core/15 transition-colors">
                  <service.icon size={22} />
                </div>
                <h3 className="font-display font-semibold text-base text-text-primary mb-2">{service.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionTransition>
  )
}
