import Link from 'next/link'
import React from 'react'
import CopyButton from '@/components/CopyButton'
import type { BlogSection } from '@/lib/types'

function renderInline(text: string): React.ReactNode {
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(regex)

  return parts.map((part, i) => {
    if (!part) return null

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {renderInline(part.slice(2, -2))}
        </strong>
      )
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 text-[0.85em] font-mono text-blue-light bg-white/[0.04] border border-panel-border rounded"
        >
          {part.slice(1, -1)}
        </code>
      )
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      const href = link[2]
      const label = renderInline(link[1])
      const className = 'text-blue-light underline underline-offset-4 hover:text-white transition-colors'
      if (href.startsWith('/')) {
        return (
          <Link key={i} href={href} className={className}>
            {label}
          </Link>
        )
      }
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      )
    }

    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

function SectionList({ ordered, items, checked }: Extract<BlogSection, { type: 'list' }>) {
  if (checked) {
    return (
      <ul className="space-y-2.5 mb-8">
        {items.map((item, i) => {
          const isDone = checked[i]
          return (
            <li key={i} className="flex gap-3 text-body-sm text-text-secondary leading-relaxed">
              <span
                className={`w-4 h-4 shrink-0 mt-0.5 rounded flex items-center justify-center text-[10px] font-mono border transition-colors ${
                  isDone
                    ? 'bg-green-live/15 border-green-live/40 text-green-live'
                    : 'bg-white/[0.03] border-panel-border text-transparent'
                }`}
              >
                ✓
              </span>
              <span>{renderInline(item)}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  if (ordered) {
    return (
      <ol className="space-y-2.5 mb-8">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-body-sm text-text-secondary leading-relaxed">
            <span className="text-blue-light font-mono text-xs mt-0.5 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul className="space-y-2.5 mb-8">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-body-sm text-text-secondary leading-relaxed">
          <span className="text-blue-core mt-1.5 shrink-0">›</span>
          <span>{renderInline(item)}</span>
        </li>
      ))}
    </ul>
  )
}

function CodeSection({ lang, content }: Extract<BlogSection, { type: 'code' }>) {
  return (
    <div className="relative card-base overflow-hidden mb-8">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-panel-border pr-12">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-live/60" />
        </div>
        <span className="text-[11px] font-mono text-text-muted ml-2">{lang}</span>
      </div>
      <CopyButton text={content} />
      <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed font-mono text-text-secondary">
        <code>{content}</code>
      </pre>
    </div>
  )
}

function TableSection({ header, rows }: Extract<BlogSection, { type: 'table' }>) {
  return (
    <div className="overflow-x-auto mb-8 rounded-xl border border-panel-border">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-left text-xs font-mono uppercase tracking-wider text-blue-light bg-white/[0.03] border-b border-panel-border whitespace-nowrap"
              >
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-panel-border last:border-0">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-text-secondary align-top leading-relaxed">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Paragraph({ section }: { section: Extract<BlogSection, { type: 'paragraph' }> }) {
  if (section.content.startsWith('**2026 marker:')) {
    return (
      <div className="mb-8 card-base p-5 border-blue-core/20 bg-blue-core/5">
        <p className="text-body-sm text-text-secondary leading-relaxed">
          {renderInline(section.content)}
        </p>
      </div>
    )
  }
  return (
    <p className="mb-6 text-body-md text-text-secondary leading-relaxed">
      {renderInline(section.content)}
    </p>
  )
}

function Section({ section, isFirst }: { section: BlogSection; isFirst: boolean }) {
  switch (section.type) {
    case 'heading':
      if (section.level === 2) {
        return (
          <div className={`flex items-center gap-3 mb-5 ${isFirst ? '' : 'mt-12'}`}>
            <span className="text-gradient text-sm font-display font-semibold uppercase tracking-widest">
              {section.content}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-core/30 to-transparent" />
          </div>
        )
      }
      return (
        <h3 className="font-display font-semibold text-lg text-text-primary mt-10 mb-3">
          {section.content}
        </h3>
      )
    case 'paragraph':
      return <Paragraph section={section} />
    case 'list':
      return <SectionList {...section} />
    case 'code':
      return <CodeSection {...section} />
    case 'table':
      return <TableSection {...section} />
    case 'divider':
      return <div className="terminal-divider my-10" />
    default:
      return null
  }
}

export default function BlogContent({ sections }: { sections: BlogSection[] }) {
  return (
    <div>
      {sections.map((section, i) => (
        <Section key={i} section={section} isFirst={i === 0} />
      ))}
    </div>
  )
}
