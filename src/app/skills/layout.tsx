import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Stack & Skills | Web App Developer in Kathmandu, Nepal',
  description: 'The technologies used by a full-stack web app developer in Kathmandu, Nepal — Laravel, PHP, React, Next.js, Django, MySQL, PostgreSQL, Docker, server management, and AI/ML systems.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    type: 'website',
    url: '/skills',
    title: 'Skills | Rojit Pokharel — Web App Developer in Kathmandu',
    description: 'Full-stack development, server infrastructure, and AI/ML competencies from a web app developer in Kathmandu, Nepal.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
