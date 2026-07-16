'use client'
import { useState } from 'react'
import { EnvelopeSimple, MapPin, GithubLogo, LinkedinLogo, CheckCircle } from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    const subject = encodeURIComponent(`Contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.open(`mailto:info@rojitpokharel.com.np?subject=${subject}&body=${body}`, '_blank')

    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 500)
  }

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <span className="label text-blue-light mb-4 block">Contact</span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
              Let&apos;s build something{' '}
              <span className="text-blue-light glow-text">together.</span>
            </h1>
            <p className="text-body-lg text-text-secondary">
              {data.contact.availability.text}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-10">
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-panel-bg border border-panel-border flex items-center justify-center text-blue-light shrink-0">
                  <EnvelopeSimple size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-0.5">Email</p>
                  <a
                    href={data.social.email.url}
                    className="text-sm text-text-primary hover:text-blue-light transition-colors"
                  >
                    {data.social.email.display}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-panel-bg border border-panel-border flex items-center justify-center text-blue-light shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-sm text-text-primary">{data.personal.location}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <a
                  href={data.social.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-panel-bg border border-panel-border flex items-center justify-center text-text-muted hover:text-blue-light hover:border-blue-light/30 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubLogo size={20} />
                </a>
                <a
                  href={data.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-panel-bg border border-panel-border flex items-center justify-center text-text-muted hover:text-blue-light hover:border-blue-light/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={20} />
                </a>
              </div>

              <div className="bg-panel-bg/30 border border-panel-border rounded-xl p-4 mt-6">
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                  {data.contact.availability.title}
                </p>
                <p className="text-sm text-text-secondary">{data.contact.availability.responseTime}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-3">
            {submitted ? (
              <div className="card-base p-10 text-center">
                <CheckCircle size={48} className="text-green-live mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold mb-2">
                  {data.contact.form.successText}
                </h3>
                <p className="text-sm text-text-secondary">
                  {data.contact.form.thankYouText}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-base p-5 md:p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full bg-white/[0.03] border border-panel-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-blue-light focus:ring-1 focus:ring-blue-core outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white/[0.03] border border-panel-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-blue-light focus:ring-1 focus:ring-blue-core outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/[0.03] border border-panel-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-blue-light focus:ring-1 focus:ring-blue-core outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-6 py-3 bg-blue-core/10 text-blue-light text-sm font-semibold rounded-lg border border-blue-core/20 hover:bg-blue-core/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? data.contact.form.submittingText : data.contact.form.submitText}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </main>
  )
}
