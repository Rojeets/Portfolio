import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Development Projects & Case Studies | Web App Developer Kathmandu',
  description: 'Web development projects and case studies from a web & web app developer in Kathmandu, Nepal — e-commerce platforms, SaaS products, insurance claims, and AI/ML systems built with Laravel, React, and Next.js.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: 'Projects | Rojit Pokharel — Web App Developer in Kathmandu',
    description: 'Web development projects and case studies from a web & web app developer in Kathmandu, Nepal.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
