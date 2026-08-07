import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Web Development Insights',
  description: 'Articles on web app development, Laravel, React, server infrastructure, and AI/ML systems from a web developer in Kathmandu, Nepal — including website cost guides and payment gateway integrations.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog | Rojit Pokharel — Web Developer in Kathmandu',
    description: 'Deep dives into full-stack development, AI/ML systems, server infrastructure, and technical craftsmanship.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
