import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Agency-built applications and personal projects showcasing full-stack, AI/ML, and systems expertise.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: 'Projects | Rojit Pokharel',
    description: 'Agency-built applications and personal projects showcasing full-stack, AI/ML, and systems expertise.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
