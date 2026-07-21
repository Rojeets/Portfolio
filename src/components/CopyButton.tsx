'use client'
import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-panel-bg/80 border border-panel-border text-text-muted hover:text-blue-light hover:border-blue-core/30 transition-all duration-200 backdrop-blur-sm"
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
          <path d="M229.66 77.66l-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32z" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
          <path d="M216 128v88a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
          <rect x="88" y="88" width="128" height="128" rx="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
      )}
    </button>
  )
}
