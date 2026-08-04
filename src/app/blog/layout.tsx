import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Deep dives into full-stack development, AI/ML systems, server infrastructure, and technical craftsmanship.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog | Rojit Pokharel',
    description: 'Deep dives into full-stack development, AI/ML systems, server infrastructure, and technical craftsmanship.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
