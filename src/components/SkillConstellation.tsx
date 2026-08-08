'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { SkillCategory, TechSkill } from '@/lib/types'

interface NodeData {
  tech: TechSkill
  x: number
  y: number
  categoryIndex: number
}

interface CategoryLine {
  x1: number
  y1: number
  x2: number
  y2: number
  categoryIndex: number
}

interface CategoryLabel {
  text: string
  x: number
  y: number
  categoryIndex: number
}

interface TooltipData {
  tech: TechSkill
  categoryTitle: string
  x: number
  y: number
}

const CATEGORY_COLORS = ['#22C55E', '#9fb4ff', '#c084fc', '#fb923c']

const CATEGORY_BG = [
  'rgba(34,197,94,0.08)',
  'rgba(159,180,255,0.08)',
  'rgba(192,132,252,0.08)',
  'rgba(251,146,60,0.08)',
]

const CATEGORY_GLOW = [
  'rgba(34,197,94,0.25)',
  'rgba(159,180,255,0.25)',
  'rgba(192,132,252,0.25)',
  'rgba(251,146,60,0.25)',
]

function computeNodes(categories: SkillCategory[]): NodeData[] {
  const positions: Record<string, [number, number][]> = {
    backend: [
      [120, 95], [230, 55], [345, 90], [460, 55], [555, 100],
      [660, 55], [750, 90], [840, 60], [920, 95],
    ],
    frontend: [
      [100, 255], [205, 215], [310, 245], [420, 210],
      [530, 255], [635, 215], [740, 250], [840, 220], [930, 255],
    ],
    'ai-ml': [
      [140, 385], [250, 355], [365, 390], [470, 350],
      [565, 390], [665, 355], [765, 385], [860, 355],
    ],
    devops: [
      [100, 505], [215, 475], [330, 510], [440, 470],
      [540, 505], [645, 470], [750, 510], [860, 475],
    ],
  }

  const nodes: NodeData[] = []
  categories.forEach((cat, ci) => {
    const catPositions = positions[cat.id] || []
    cat.technologies.forEach((tech, ti) => {
      if (catPositions[ti]) {
        nodes.push({
          tech,
          x: catPositions[ti][0],
          y: catPositions[ti][1],
          categoryIndex: ci,
        })
      }
    })
  })
  return nodes
}

function computeLines(categories: SkillCategory[], nodes: NodeData[]): CategoryLine[] {
  const lines: CategoryLine[] = []
  let offset = 0
  categories.forEach((cat, ci) => {
    const count = cat.technologies.length
    for (let i = 0; i < count - 1 && i + offset < nodes.length - 1; i++) {
      const a = nodes[offset + i]
      const b = nodes[offset + i + 1]
      if (a && b) {
        lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, categoryIndex: ci })
      }
    }
    offset += count
  })
  return lines
}

function computeLabels(categories: SkillCategory[]): CategoryLabel[] {
  const labelPositions: [number, number][] = [
    [500, 22],
    [490, 168],
    [490, 302],
    [478, 425],
  ]
  return categories.map((cat, i) => ({
    text: cat.title,
    x: labelPositions[i]?.[0] ?? 500,
    y: labelPositions[i]?.[1] ?? 30,
    categoryIndex: i,
  }))
}

function getNodeRadius(level: string): number {
  switch (level) {
    case 'Expert': return 8
    case 'Advanced': return 6
    default: return 5
  }
}

function getGlowRadius(level: string): number {
  switch (level) {
    case 'Expert': return 18
    case 'Advanced': return 14
    default: return 10
  }
}

function getStatusColor(level: string): string {
  switch (level) {
    case 'Expert': return '#22C55E'
    case 'Advanced': return '#9fb4ff'
    default: return '#5a5f6c'
  }
}

function getLevelBar(level: string): string {
  switch (level) {
    case 'Expert': return '████████████████████░░░░░░░░░░'
    case 'Advanced': return '████████████████░░░░░░░░░░░░░░'
    default: return '████████████░░░░░░░░░░░░░░░░░░'
  }
}

function getLevelPercent(level: string): number {
  switch (level) {
    case 'Expert': return 80
    case 'Advanced': return 60
    default: return 45
  }
}

export default function SkillConstellation({ categories }: { categories: SkillCategory[] }) {
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<HTMLDivElement>(null)
  const breatheTl = useRef<gsap.core.Timeline | null>(null)

  const nodes = useMemo(() => computeNodes(categories), [categories])
  const lines = useMemo(() => computeLines(categories, nodes), [categories, nodes])
  const labels = useMemo(() => computeLabels(categories), [categories])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const hoveredCategory = hoveredNode?.categoryIndex ?? -1

  const getNodeOpacity = (node: NodeData) => {
    if (hoveredCategory === -1) return 1
    if (node.categoryIndex === hoveredCategory) return hoveredNode === node ? 1 : 0.7
    return 0.15
  }

  const getLineOpacity = (line: CategoryLine) => {
    if (hoveredCategory === -1) return 0.35
    return line.categoryIndex === hoveredCategory ? 0.6 : 0.06
  }

  const handleNodeEnter = (node: NodeData, e: React.MouseEvent) => {
    setHoveredNode(node)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setTooltip({
      tech: node.tech,
      categoryTitle: categories[node.categoryIndex]?.title ?? '',
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    })
  }

  const handleNodeLeave = () => {
    setHoveredNode(null)
    setTooltip(null)
  }

  // GSAP: breathing / floating only — entrance reveals are removed so
  // content is always visible.
  useGSAP(() => {
    if (!containerRef.current) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const allNodes = nodesRef.current?.querySelectorAll('.skill-node')
      if (allNodes?.length) {
        breatheTl.current = gsap.timeline({ repeat: -1 })
        allNodes.forEach((node, i) => {
          const phase = i * 0.7
          const yAmp = 2 + (i % 3) * 1.5
          const xAmp = 1 + (i % 2) * 1
          breatheTl.current!.to(node, {
            y: `+=${yAmp}`,
            x: `+=${xAmp}`,
            duration: 3 + (i % 3),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          }, phase * 0.3)
        })
      }
    })

    return () => {
      mm.revert()
      breatheTl.current?.kill()
    }
  }, { scope: containerRef })

  // Tooltip: clamp to viewport
  const tooltipStyle = useMemo(() => {
    if (!tooltip) return { display: 'none' as const }
    const tooltipW = 260
    const tooltipH = 200
    let left = tooltip.x - tooltipW / 2
    let top = tooltip.y - tooltipH - 12
    if (left < 16) left = 16
    if (left + tooltipW > window.innerWidth - 16) left = window.innerWidth - tooltipW - 16
    if (top < 16) top = tooltip.y + 24
    return {
      position: 'fixed' as const,
      left: `${left}px`,
      top: `${top}px`,
      width: `${tooltipW}px`,
      zIndex: 100,
    }
  }, [tooltip])

  // --- MOBILE LAYOUT ---
  if (isMobile) {
    return (
      <div className="space-y-6">
        {categories.map((cat, ci) => (
          <div key={cat.id} className="rounded-xl border border-panel-border bg-panel-bg/50 p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-text-muted font-mono text-xs">$</span>
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: CATEGORY_COLORS[ci] }}
              />
              <h3 className="text-sm font-display font-semibold" style={{ color: CATEGORY_COLORS[ci] }}>
                {cat.title}
              </h3>
            </div>
            <div className="space-y-3">
              {cat.technologies.map((tech) => (
                <div key={tech.name} className="pl-4 relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-primary">{tech.name}</span>
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: getStatusColor(tech.level) }}
                    >
                      {tech.level}
                    </span>
                  </div>
                  {/* Terminal progress bar */}
                  <div className="font-mono text-[10px] tracking-tight leading-none overflow-hidden">
                    <span style={{ color: getStatusColor(tech.level), opacity: 0.6 }}>
                      {getLevelBar(tech.level)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {tech.subSkills.map((s) => (
                      <span key={s} className="text-[10px] font-mono text-text-muted bg-white/[0.02] px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // --- CONSTELLATION LAYOUT ---
  return (
    <>
      <div ref={containerRef} className="relative w-full" style={{ aspectRatio: '1000 / 560' }}>
        {/* SVG layer: constellation lines + glow halos */}
        <svg
          viewBox="0 0 1000 560"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            {CATEGORY_COLORS.map((color, i) => (
              <radialGradient key={i} id={`nodeGlow${i}`}>
                <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* Glow halos behind nodes */}
          {nodes.map((node, i) => (
            <circle
              key={`glow-${i}`}
              cx={node.x}
              cy={node.y}
              r={getGlowRadius(node.tech.level)}
              fill={`url(#nodeGlow${node.categoryIndex})`}
              opacity={getNodeOpacity(node) * 0.6}
              style={{ transition: 'opacity 0.4s ease' }}
            />
          ))}

          {/* Constellation lines */}
          {lines.map((line, i) => {
            const color = CATEGORY_COLORS[line.categoryIndex] ?? '#fff'
            return (
              <line
                key={`line-${i}`}
                className="constellation-line"
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={color}
                strokeWidth="1"
                opacity={getLineOpacity(line)}
                style={{ transition: 'opacity 0.4s ease' }}
              />
            )
          })}

          {/* Electron flow dots along lines */}
          {lines.map((line, i) => {
            const color = CATEGORY_COLORS[line.categoryIndex] ?? '#fff'
            const isRelevant = hoveredCategory === -1 || line.categoryIndex === hoveredCategory
            return (
              <circle key={`electron-${i}`} r="2" fill={color} opacity={isRelevant ? 0.7 : 0}>
                <animateMotion
                  dur={`${2.5 + (i % 4) * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
                />
              </circle>
            )
          })}
        </svg>

        {/* Category labels */}
        {labels.map((label, i) => (
          <div
            key={`label-${i}`}
            className="category-label absolute pointer-events-none select-none"
            style={{
              left: `${(label.x / 1000) * 100}%`,
              top: `${(label.y / 560) * 100}%`,
              transform: 'translateX(-50%)',
              color: CATEGORY_COLORS[i],
              opacity: hoveredCategory === -1 ? 0.35 : label.categoryIndex === hoveredCategory ? 0.6 : 0.1,
              transition: 'opacity 0.4s ease',
            }}
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-medium">
              {label.text}
            </span>
          </div>
        ))}

        {/* Skill nodes (DOM layer, positioned absolutely) */}
        <div ref={nodesRef} className="absolute inset-0">
          {nodes.map((node, i) => {
            const radius = getNodeRadius(node.tech.level)
            const color = getStatusColor(node.tech.level)
            const catColor = CATEGORY_COLORS[node.categoryIndex]
            const isHovered = hoveredNode === node
            return (
              <button
                key={`node-${i}`}
                className="skill-node absolute flex flex-col items-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-light rounded-lg"
                style={{
                  left: `${(node.x / 1000) * 100}%`,
                  top: `${(node.y / 560) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: getNodeOpacity(node),
                  transition: 'opacity 0.4s ease',
                }}
                onMouseEnter={(e) => handleNodeEnter(node, e)}
                onMouseLeave={handleNodeLeave}
                onFocus={() => setHoveredNode(node)}
                onBlur={() => setHoveredNode(null)}
                aria-label={`${node.tech.name}, ${node.tech.level} level. Sub-skills: ${node.tech.subSkills.join(', ')}`}
                tabIndex={0}
              >
                {/* Node dot */}
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    backgroundColor: color,
                    boxShadow: isHovered
                      ? `0 0 ${radius * 3}px ${color}, 0 0 ${radius * 6}px ${catColor}40`
                      : `0 0 ${radius}px ${color}80`,
                    transform: isHovered ? 'scale(1.4)' : 'scale(1)',
                  }}
                />

                {/* Tech name */}
                <span
                  className="mt-1.5 text-center leading-tight whitespace-nowrap transition-colors duration-300"
                  style={{
                    fontSize: '10px',
                    color: isHovered ? '#eceef2' : '#9a9fac',
                    textShadow: isHovered ? `0 0 8px ${catColor}60` : 'none',
                  }}
                >
                  {node.tech.name}
                </span>

                {/* Level indicator */}
                <span
                  className="font-mono uppercase tracking-wider transition-colors duration-300"
                  style={{
                    fontSize: '8px',
                    color: isHovered ? color : '#5a5f6c',
                  }}
                >
                  {node.tech.level}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Hover tooltip */}
      {tooltip && (
        <div
          style={tooltipStyle}
          className="pointer-events-none animate-fade-in"
        >
          <div className="bg-[#0c0c16] border border-panel-border rounded-xl p-4 shadow-2xl shadow-black/40 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getStatusColor(tooltip.tech.level) }}
                />
                <span className="text-sm font-display font-semibold text-text-primary">
                  {tooltip.tech.name}
                </span>
              </div>
              <span
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: getStatusColor(tooltip.tech.level) }}
              >
                {tooltip.tech.level}
              </span>
            </div>
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-2">
              {tooltip.categoryTitle}
            </div>
            {/* Visual progress bar */}
            <div className="mb-3">
              <div className="h-1 w-full bg-panel-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${getLevelPercent(tooltip.tech.level)}%`,
                    backgroundColor: getStatusColor(tooltip.tech.level),
                  }}
                />
              </div>
            </div>
            <div className="w-full h-px bg-panel-border mb-3" />
            <div className="space-y-1.5">
              {tooltip.tech.subSkills.map((skill) => (
                <div key={skill} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[hoveredCategory] }}
                  />
                  <span className="text-xs text-text-secondary leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
