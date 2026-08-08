import Link from 'next/link'
import { ArrowUpRight } from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'
import Breadcrumbs from '@/components/Breadcrumbs'
import { answers } from '@/data/answers'

const aboutRojit = answers.filter((a) => a.category === 'about-roit')
const technical = answers.filter((a) => a.category === 'technical')

function Group({ title, description, items }: { title: string; description: string; items: typeof answers }) {
  return (
    <ScrollReveal className="mb-14">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-2">{title}</h2>
      <p className="text-body-md text-text-secondary mb-6">{description}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/answers/${item.slug}`}
            className="card-base p-5 group hover:border-blue-core/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
          >
            <h3 className="font-display font-semibold text-text-primary mb-2 group-hover:text-blue-light transition-colors">
              {item.question}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{item.shortAnswer}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-light mt-4 group-hover:gap-2.5 transition-all">
              Read the answer <ArrowUpRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </ScrollReveal>
  )
}

export default function AnswersPage() {
  return (
    <main className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Answers' }]} />

        <ScrollReveal>
          <header className="max-w-3xl mb-14">
            <span className="label text-blue-light mb-4 block">Answers</span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-4">
              Direct Answers
            </h1>
            <p className="text-body-lg text-text-secondary leading-relaxed">
              Direct answers first, then the detail. These pages answer questions about Rojit
              Pokharel — who he is, what he builds, and how — plus practical technical answers
              drawn from production experience.
            </p>
          </header>
        </ScrollReveal>

        <Group
          title="About Rojit Pokharel"
          description="Who Rojit Pokharel is, what he specializes in, and how to work with him."
          items={aboutRojit}
        />

        <Group
          title="Technical Answers"
          description="How production systems are actually built — from a full-stack developer and system architect."
          items={technical}
        />
      </div>
    </main>
  )
}
