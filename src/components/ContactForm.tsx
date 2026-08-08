'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowUpRight } from '@/components/Icons'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/types'

const data = portfolioData as PortfolioData

export default function ContactForm({ service: serviceProp }: { service?: string }) {
  const searchParams = useSearchParams()
  const service = serviceProp ?? searchParams.get('service') ?? ''

  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      service,
      website: formData.get('website'),
    }

    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        setError(body?.error ?? data.contact.form.errorText)
        return
      }

      setSubmitted(true)
    } catch {
      setError(data.contact.form.errorText)
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="card-base p-10 text-center">
        <CheckCircle size={48} className="text-green-live mx-auto mb-4" />
        <h3 className="text-lg font-display font-semibold mb-2">
          {data.contact.form.successText}
        </h3>
        <p className="text-sm text-text-secondary">
          {data.contact.form.thankYouText}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-base p-5 md:p-6 space-y-4">
      <div
        className="hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {service && (
        <div className="flex items-center gap-2 text-xs font-mono text-blue-light bg-blue-core/10 border border-blue-core/20 rounded-lg px-3 py-2">
          <span className="text-text-muted">Inquiry about:</span>
          <span className="font-semibold">{service.replace(/-/g, ' ')}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {data.contact.form.fields
          .filter((f) => f.name === 'name' || f.name === 'email')
          .map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full bg-white/[0.03] border border-panel-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-blue-light focus:ring-1 focus:ring-blue-core outline-none transition-colors"
              />
            </div>
          ))}
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
          placeholder={data.contact.form.fields.find((f) => f.name === 'message')?.placeholder ?? 'Tell me about your project...'}
          className="w-full bg-white/[0.03] border border-panel-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-blue-light focus:ring-1 focus:ring-blue-core outline-none transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-green-live text-bg-void font-mono text-sm font-medium rounded-lg hover:bg-green-live/90 transition-all shadow-[0_0_24px_rgba(34,197,94,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-bg-void/55 select-none">$</span>
        <span>{sending ? data.contact.form.submittingText : data.contact.form.submitText}</span>
        {sending && <span className="animate-pulse">_</span>}
        {!sending && (
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </button>
    </form>
  )
}
