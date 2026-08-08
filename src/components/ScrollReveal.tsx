'use client'

import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
  id?: string
}

// Scroll reveals are intentionally removed — content must always be visible.
// Props are kept for API compatibility but no longer drive any animation.
export default function ScrollReveal({
  children,
  className = '',
  id,
}: ScrollRevealProps) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  )
}
