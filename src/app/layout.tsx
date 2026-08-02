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

export const metadata: Metadata = {
  title: 'Rojit Pokharel | Full-Stack Developer & System Architect',
  description: 'Full-stack developer building scalable web applications with Laravel, React, and modern technologies. Based in Kathmandu, Nepal.',
  keywords: ['Full-Stack Developer', 'Laravel', 'React', 'Next.js', 'Django', 'System Architecture', 'Nepal'],
  authors: [{ name: 'Rojit Pokharel' }],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
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
