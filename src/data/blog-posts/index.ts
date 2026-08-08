import aiReferee from './ai-referee-football-player-tracking.json'
import chooseWebDevelopment from './choose-web-development-company-kathmandu.json'
import fullstack from './fullstack-developer-skills-2026.json'
import laravelVsDjango from './laravel-vs-django-vs-nodejs.json'
import paymentGateway from './payment-gateway-integration-nepal.json'
import realworld from './realworld-impact-projects.json'
import serverMonitoring from './server-monitoring-tool-uptime-monitoring.json'
import webApp from './web-app-development-kathmandu.json'
import websiteCost from './website-cost-nepal.json'
import type { BlogPostContent } from '@/lib/types'

const posts = [
  aiReferee,
  chooseWebDevelopment,
  fullstack,
  laravelVsDjango,
  paymentGateway,
  realworld,
  serverMonitoring,
  webApp,
  websiteCost,
] as BlogPostContent[]

export const blogPosts: Record<string, BlogPostContent> = Object.fromEntries(
  posts.map((post) => [post.slug, post]),
)
