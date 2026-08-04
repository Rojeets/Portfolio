import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Let's work together on something amazing. Get in touch with Rojit Pokharel for freelance projects and full-time opportunities.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact | Rojit Pokharel',
    description: "Let's work together on something amazing. Get in touch with Rojit Pokharel for freelance projects and full-time opportunities.",
    images: [{ url: '/images/og-image.jpg' }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
