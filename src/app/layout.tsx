import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Rojit Pokharel - Full Stack Developer',
  description: 'Portfolio of Rojit Pokharel, a Full Stack Developer specializing in Laravel, React & Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
