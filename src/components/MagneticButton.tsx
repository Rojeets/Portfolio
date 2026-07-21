'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a' | 'div'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as: Tag = 'div',
  href,
  onClick,
  type,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement>(null)
  const prefersReducedMotion = useRef(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (prefersReducedMotion.current || !ref.current) return
    // Skip magnetic effect on touch devices
    if ('ontouchstart' in window) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  const handleTouchStart = () => {
    if (!ref.current) return
    ref.current.style.transform = 'scale(0.95)'
    ref.current.style.transition = 'transform 0.15s ease-out'
  }

  const handleTouchEnd = () => {
    if (!ref.current) return
    ref.current.style.transform = 'scale(1)'
  }

  return (
    <Tag
      ref={ref as any}
      className={`magnetic-btn ${className}`}
      href={href as any}
      onClick={onClick as any}
      type={type as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </Tag>
  )
}
