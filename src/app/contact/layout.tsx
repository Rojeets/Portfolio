import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Hire a Web & WebApp Developer in Kathmandu',
  description: "Hire a web & web app developer in Kathmandu, Nepal. Get in touch with Rojit Pokharel for freelance projects, e-commerce platforms, SaaS products, and full-time opportunities.",
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact | Rojit Pokharel — Web Developer in Kathmandu',
    description: "Hire a web & web app developer in Kathmandu, Nepal for freelance projects and full-time opportunities.",
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
