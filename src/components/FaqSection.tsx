'use client'

import ScrollReveal from '@/components/ScrollReveal'
import SectionTransition from '@/components/SectionTransition'
import TerminalPrompt from '@/components/TerminalPrompt'

const faqs = [
  {
    question: 'Is Rojit Pokharel a web and web app developer in Kathmandu, Nepal?',
    answer:
      'Yes. Rojit Pokharel is a full-stack web and web app developer based in Kathmandu, Nepal, specializing in custom web applications, e-commerce platforms, SaaS products, and API development using Laravel, React, and Next.js.',
  },
  {
    question: 'What kind of websites and web apps does Rojit build?',
    answer:
      'Custom web applications, e-commerce and multi-vendor marketplaces, restaurant management SaaS, insurance claim platforms, travel booking systems, API services, and server monitoring tools.',
  },
  {
    question: 'Which technologies does Rojit Pokharel specialize in?',
    answer:
      'Laravel and PHP for the backend, React and Next.js for the frontend, Django for Python projects, and MySQL or PostgreSQL for databases. He also handles server setup with Nginx, Docker, and Linux.',
  },
  {
    question: 'How do I hire a web developer in Kathmandu?',
    answer:
      'Reach out through the contact page or email info@rojitpokharel.com.np. Rojit is open to freelance projects and full-time opportunities and typically responds within 24 hours.',
  },
  {
    question: 'Does Rojit work with clients outside Nepal?',
    answer:
      'Yes. While based in Kathmandu, Nepal, he works with local and international clients, communicating in English and delivering production-grade applications.',
  },
]

export default function FaqSection() {
  return (
    <SectionTransition id="faq" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">FAQ</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
          <TerminalPrompt command="man hire-me" className="mb-4" />
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-2">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-body-md text-text-secondary mb-12 max-w-lg">
            Everything you might want to know about hiring a web developer in Kathmandu.
          </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="card-base group overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-display font-semibold text-sm md:text-base text-text-primary">
                  {faq.question}
                </h3>
                <span className="text-blue-light shrink-0 font-mono transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </ScrollReveal>
      </div>
    </SectionTransition>
  )
}
