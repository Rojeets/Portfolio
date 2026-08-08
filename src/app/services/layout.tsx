import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Web Development, SEO, AEO, Audits & No-Code Solutions',
  description:
    'Web & web app development (Laravel, Django, React, Next.js), SEO, Answer Engine Optimization (AEO), site audits & enhancements, and no-code solutions by Rojit Pokharel in Kathmandu, Nepal. Book a free audit.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Services | Rojit Pokharel — Web Development, SEO, AEO, Audits & No-Code',
    description:
      'Full-stack web development plus search and AI visibility. Custom builds, e-commerce, SaaS, APIs, SEO, AEO, audits & enhancements, and no-code solutions.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
