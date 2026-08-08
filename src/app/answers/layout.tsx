import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Answers — Direct Answers About Rojit Pokharel & Web Development',
  description:
    'Direct answers to questions about Rojit Pokharel — full-stack web developer and system architect in Kathmandu, Nepal — plus technical answers on Laravel, Django, Docker, PostgreSQL, Laravel Reverb, and Next.js SEO.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: '/answers',
  },
  openGraph: {
    type: 'website',
    url: '/answers',
    title: 'Answers | Rojit Pokharel — Full-Stack Web Developer & System Architect',
    description:
      'Direct answers to questions about Rojit Pokharel and the technologies he uses — Laravel, Django, React, Docker, and more.',
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function AnswersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
