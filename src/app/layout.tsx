import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Hanken_Grotesk } from 'next/font/google'
import '../styles/globals.css'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rojit Pokharel | Engineering Scalable Solutions',
  description: 'Specializing in high-performance microservices and robust system design using Django, Laravel, React, and React Native.',
  keywords: ['Full-Stack Developer', 'Django', 'Laravel', 'React', 'React Native', 'Microservices', 'System Architecture'],
  authors: [{ name: 'Rojit Pokharel' }],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${hankenGrotesk.variable} min-h-screen bg-background text-on-surface font-body-md technical-grid flex flex-col antialiased`}>
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
