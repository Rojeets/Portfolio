import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Rojit Pokharel — Full-Stack Web Developer & System Architect in Kathmandu, Nepal',
  description:
    'Who is Rojit Pokharel? A Full-Stack Web Developer and System Architect from Kathmandu, Nepal, building production web applications, SaaS platforms, and AI/ML systems with Laravel, Django, React, Next.js, and scalable infrastructure.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About Rojit Pokharel — Full-Stack Web Developer & System Architect in Kathmandu, Nepal',
    description:
      'Who is Rojit Pokharel? A Full-Stack Web Developer and System Architect from Kathmandu, Nepal, building production web applications with Laravel, Django, React, and Next.js.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
