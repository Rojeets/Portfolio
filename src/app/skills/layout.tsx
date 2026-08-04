import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Production-proven competencies across full-stack development, server infrastructure, and AI/ML systems.',
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    type: 'website',
    url: '/skills',
    title: 'Skills | Rojit Pokharel',
    description: 'Production-proven competencies across full-stack development, server infrastructure, and AI/ML systems.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
