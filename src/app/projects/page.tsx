'use client'
import Link from 'next/link'
import {
  ArrowUpRight,
  Cpu,
  ChartBar,
  ClipboardText,
  Palette,
  CurrencyDollar,
  ShieldCheck,
  Wrench,
  Calculator,
  Bot,
  Lock,
  Backpack,
  Store,
} from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData, Project } from '@/lib/types'

const data = portfolioData as PortfolioData

const iconMap: Record<string, typeof Cpu> = {
  ClipboardText,
  CurrencyDollar,
  Palette,
  ChartBar,
  Cpu,
  ShieldCheck,
  Wrench,
  Calculator,
  Bot,
  Lock,
  Backpack,
  Store,
}

function getPrimarySnippet(project: Project): string {
  const t = project.tech
  if (t.includes('Laravel') || t.includes('Filament')) {
    if (project.title.includes('Restaurant')) return 'Route::post(\'/orders\', [OrderController::class, \'store\']);'
    if (project.title.includes('E-commerce')) return 'class Vendor extends Model { use HasFactory; }'
    if (project.title.includes('Travel')) return 'Route::apiResource(\'packages\', PackageController::class);'
    if (project.title.includes('Anonymous')) return 'Broadcast::channel(\'discussion.{id}\', ...);'
    return 'public function boot(): void { ... }'
  }
  if (t.includes('Django') || t.includes('DRF')) {
    if (project.title.includes('Insurance')) return 'class ClaimSerializer(serializers.ModelSerializer): ...'
    if (project.title.includes('ServiceLink')) return 'class ServiceViewSet(viewsets.ModelViewSet): ...'
    return 'class Meta: model = Service; fields = \'__all__\''
  }
  if (t.includes('Flask') || t.includes('Gemini')) return 'response = model.generate_content(prompt)'
  if (t.includes('Python') || t.includes('YOLO')) return 'results = model(frame, conf=0.5)'
  if (t.includes('Go')) return 'func monitor(config string) { ... }'
  return '// implementation'
}

function ProjectHeaderVisual({
  headerType,
  project,
}: {
  headerType: string
  project: Project
}) {
  switch (headerType) {
    case 'terminal':
      return (
        <div className="font-mono text-[10px] space-y-1">
          <div className="flex items-center gap-1.5 text-text-muted/60">
            <span className="text-blue-core/60">$</span>
            <span className="text-text-primary/70 truncate">
              {project.terminal || '$ command'}
            </span>
            <span className="w-1.5 h-3 bg-blue-core/40 animate-pulse shrink-0" />
          </div>
        </div>
      )
    case 'code': {
      const snippet = getPrimarySnippet(project)
      return (
        <div className="font-mono text-[10px] space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-core/50 shrink-0">&#9657;</span>
            <span className="text-text-primary/60 truncate">{snippet}</span>
          </div>
        </div>
      )
    }
    case 'metrics':
      return (
        <div className="flex items-end gap-1 h-6">
          <div className="flex items-end gap-0.5 flex-1 h-full">
            {[40, 65, 50, 80, 70, 55, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-core/15 rounded-t min-h-[2px]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-blue-light/60 shrink-0 ml-1">
            {project.metric}
          </span>
        </div>
      )
    case 'workflow':
      return (
        <div className="flex items-center gap-1">
          {['req', 'build', 'test', 'ship'].map((stage, i) => (
            <div key={stage} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-core/20" />
                <span className="text-[7px] font-mono text-text-muted/50 mt-0.5">
                  {stage}
                </span>
              </div>
              {i < 3 && <div className="w-4 h-px bg-panel-border" />}
            </div>
          ))}
        </div>
      )
    case 'layers':
      return (
        <div className="space-y-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 rounded bg-blue-core/[0.08]"
              style={{ width: `${100 - i * 18}%` }}
            />
          ))}
        </div>
      )
    case 'blueprint':
      return (
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-blue-core/25' : 'bg-blue-core/10'
              }`}
            />
          ))}
        </div>
      )
    default:
      return null
  }
}

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <span className="label text-blue-light mb-4 block">Work</span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
              {data.projects.sectionTitle}
            </h1>
            <p className="text-body-lg text-text-secondary">
              {data.projects.sectionSubtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="grid md:grid-cols-2 gap-5" stagger={0.1}>
          {data.projects.items.map((project: Project) => {
            const Icon = iconMap[project.icon] || Cpu
            return (
              <div
                key={project.title}
                className="card-base p-5 h-full flex flex-col group hover:border-blue-core/20 transition-all duration-300"
                id={project.title.toLowerCase().replace(/\s+/g, '-')}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-core/10 flex items-center justify-center text-blue-light">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-mono text-green-live flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-live animate-pulse-dot" />
                    {project.metric}
                  </span>
                </div>

                <div className="mb-3 p-2.5 rounded-lg bg-white/[0.02] border border-panel-border/50">
                  <ProjectHeaderVisual
                    headerType={project.headerType}
                    project={project}
                  />
                </div>

                <h3 className="text-base font-display font-semibold mb-2 group-hover:text-blue-light transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>

                {project.highlights.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2">
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 text-[11px] font-mono bg-blue-core/5 text-blue-light/80 rounded-md border border-blue-core/10"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-3 border-t border-panel-border">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono rounded-md border bg-white/[0.03] text-text-muted border-panel-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <Link
              href="https://github.com/rojeets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-panel-border text-text-primary text-sm font-medium rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              Explore GitHub <ArrowUpRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
