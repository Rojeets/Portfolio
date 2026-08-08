import Link from 'next/link'

const SITE_URL = 'https://portfolio.rojitpokharel.com.np'

export interface Crumb {
  name: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: new URL(item.href, SITE_URL).toString() } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-text-muted">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={`${item.name}-${i}`} className="flex items-center gap-2">
                {i > 0 && <span className="text-panel-border">/</span>}
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-blue-light transition-colors">
                    {item.name}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-text-secondary' : undefined} aria-current={isLast ? 'page' : undefined}>
                    {item.name}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
