import type { MetadataRoute } from 'next'
import portfolioData from '@/data/portfolio.json'
import { answers } from '@/data/answers'
import { serviceGroups } from '@/data/services'
import type { PortfolioData, BlogPost, Project } from '@/lib/types'

const data = portfolioData as PortfolioData

const BASE_URL = 'https://portfolio.rojitpokharel.com.np'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/answers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = data.blog.items.map((post: BlogPost) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const projectRoutes: MetadataRoute.Sitemap = data.projects.items.map((project: Project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = serviceGroups.flatMap((group) =>
    group.pillars.map((pillar) => ({
      url: `${BASE_URL}/services/${pillar.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  )

  const answerRoutes: MetadataRoute.Sitemap = answers.map((answer) => ({
    url: `${BASE_URL}/answers/${answer.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...serviceRoutes, ...answerRoutes]
}
