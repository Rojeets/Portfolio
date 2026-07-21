'use client'

import { useRef, useEffect, useCallback } from 'react'
import { X } from '@/components/Icons'
import type { Project } from '@/lib/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !contentRef.current) return

    contentRef.current.style.opacity = '0'
    contentRef.current.style.transform = 'scale(0.95) translateY(10px)'
    overlayRef.current.style.opacity = '0'

    setTimeout(() => {
      onClose()
    }, 250)
  }, [onClose])

  // ESC to close
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    // Entry animation
    requestAnimationFrame(() => {
      if (overlayRef.current && contentRef.current) {
        overlayRef.current.style.opacity = '1'
        contentRef.current.style.opacity = '1'
        contentRef.current.style.transform = 'scale(1) translateY(0)'
      }
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, handleClose])

  if (!project) return null

  return (
    <div
      ref={overlayRef}
      className="modal-overlay bg-bg-void/70 opacity-0 transition-opacity duration-300"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
    >
      <div
        ref={contentRef}
        className="modal-card w-[95vw] opacity-0 transition-all duration-300 ease-out"
        style={{ transform: 'scale(0.95) translateY(10px)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-panel-border bg-bg-panel/90 backdrop-blur-sm rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-live animate-pulse-dot" />
            <span className="text-xs font-mono text-text-muted">{project.metric}</span>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h2 id="modal-title" className="text-2xl md:text-3xl font-display font-semibold mb-3 text-text-primary">
              {project.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <p className="text-[11px] font-mono text-text-eyebrow uppercase tracking-wider mb-3">Key Features</p>
              <div className="grid grid-cols-2 gap-2">
                {project.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-core/5 border border-blue-core/10 text-sm text-text-secondary"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-core shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <p className="text-[11px] font-mono text-text-eyebrow uppercase tracking-wider mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-mono bg-white/[0.03] text-text-secondary rounded-md border border-panel-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal snippet if available */}
          {project.terminal && (
            <div className="rounded-lg bg-bg-void border border-panel-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-live/60" />
              </div>
              <code className="font-mono text-xs text-text-muted">
                <span className="text-blue-core">$</span> {project.terminal}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
