import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import '../styles/globals.css'
import SmoothScroll from '../components/SmoothScroll'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import BootSequence from '../components/BootSequence'
import SpatialCore from '../components/three/SpatialCore'
import CustomCursor from '../components/CustomCursor'
import Script from 'next/script'
import * as gtag from '../lib/gtag';
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const geistSans = localFont({
  src: '../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2',
  variable: '--font-geist',
  display: 'swap',
})

const SITE_URL = 'https://portfolio.rojitpokharel.com.np'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Rojit Pokharel',
      url: SITE_URL,
      image: `${SITE_URL}/images/og-image.jpg`,
      jobTitle: 'Web & Web App Developer',
      description:
        'Full-stack web and web app developer in Kathmandu, Nepal, specializing in Laravel, React, Next.js, and scalable production systems.',
      email: 'mailto:info@rojitpokharel.com.np',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati',
        addressCountry: 'NP',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Infinity Digital Agency',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kathmandu',
          addressRegion: 'Bagmati',
          addressCountry: 'NP',
        },
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Techspire College',
      },
      sameAs: [
        'https://github.com/rojeets',
        'https://gitlab.com/rojeets',
        'https://www.linkedin.com/in/rojit-pokharel/',
      ],
      knowsAbout: [
        'Web Development',
        'Web Application Development',
        'Laravel',
        'PHP',
        'React',
        'Next.js',
        'Django',
        'MySQL',
        'PostgreSQL',
        'System Architecture',
        'API Development',
        'Server Management',
        'Docker',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Rojit Pokharel | Web & WebApp Developer in Kathmandu, Nepal',
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Rojit Pokharel — Web Development Services in Kathmandu',
      url: SITE_URL,
      image: `${SITE_URL}/images/og-image.jpg`,
      email: 'info@rojitpokharel.com.np',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati',
        addressCountry: 'NP',
      },
      areaServed: [
        { '@type': 'City', name: 'Kathmandu' },
        { '@type': 'Country', name: 'Nepal' },
      ],
      serviceType: [
        'Web Development',
        'Web Application Development',
        'E-commerce Development',
        'SaaS Development',
        'API Development',
        'Laravel Development',
        'React and Next.js Development',
      ],
      founder: { '@id': `${SITE_URL}/#person` },
      sameAs: [
        'https://github.com/rojeets',
        'https://gitlab.com/rojeets',
        'https://www.linkedin.com/in/rojit-pokharel/',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Rojit Pokharel a web and web app developer in Kathmandu, Nepal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Rojit Pokharel is a full-stack web and web app developer based in Kathmandu, Nepal, specializing in custom web applications, e-commerce platforms, SaaS products, and API development using Laravel, React, and Next.js.',
          },
        },
        {
          '@type': 'Question',
          name: 'What kind of websites and web apps does Rojit build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Custom web applications, e-commerce and multi-vendor marketplaces, restaurant management SaaS, insurance claim platforms, travel booking systems, API services, and server monitoring tools.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which technologies does Rojit Pokharel specialize in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Laravel and PHP for the backend, React and Next.js for the frontend, Django for Python projects, and MySQL or PostgreSQL for databases. He also handles server setup with Nginx, Docker, and Linux.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I hire a web developer in Kathmandu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Reach out through the contact page or email info@rojitpokharel.com.np. Rojit is open to freelance projects and full-time opportunities and typically responds within 24 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Rojit work with clients outside Nepal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. While based in Kathmandu, Nepal, he works with local and international clients, communicating in English and delivering production-grade applications.',
          },
        },
      ],
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rojit Pokharel | Web & WebApp Developer in Kathmandu, Nepal',
    template: '%s | Rojit Pokharel',
  },
  description:
    'Full-stack web & web app developer in Kathmandu, Nepal. I build scalable web applications, e-commerce platforms, and SaaS products with Laravel, React, and Next.js.',
  keywords: [
    'Web Developer Kathmandu',
    'Web App Developer Nepal',
    'Full-Stack Developer Nepal',
    'Laravel Developer Nepal',
    'React Developer Kathmandu',
    'Next.js Developer',
    'Website Developer Kathmandu',
    'E-commerce Development Nepal',
    'SaaS Development',
    'Freelance Web Developer Nepal',
  ],
  authors: [{ name: 'Rojit Pokharel' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NP',
    url: '/',
    siteName: 'Rojit Pokharel',
    title: 'Rojit Pokharel | Web & WebApp Developer in Kathmandu, Nepal',
    description: 'Full-stack web & web app developer in Kathmandu, Nepal, building scalable web applications with Laravel, React, and Next.js.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rojit Pokharel - Web & Web App Developer in Kathmandu, Nepal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rojit Pokharel | Web & WebApp Developer in Kathmandu, Nepal',
    description: 'Full-stack web & web app developer in Kathmandu, Nepal, building scalable web applications with Laravel, React, and Next.js.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="geo.region" content="NP-BA" />
        <meta name="geo.placename" content="Kathmandu" />
        <meta name="geo.position" content="27.7172;85.3240" />
        <meta name="ICBM" content="27.7172, 85.3240" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} min-h-screen bg-bg-void text-text-primary font-body flex flex-col antialiased`}>
        <Analytics />
        <SmoothScroll>
          <a href="#hero" className="sr-only sr-only-focusable">
            Skip to content
          </a>
          <CustomCursor />
          <BootSequence />
          <SpatialCore />
          <Navigation />
          <main id="hero-content" className="flex-1 relative z-10 max-w-[1440px] mx-auto w-full">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
