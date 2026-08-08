export type PillarIcon =
  | 'Code'
  | 'Store'
  | 'SquaresFour'
  | 'Rocket'
  | 'GearSix'
  | 'ShieldCheck'
  | 'ChartBar'
  | 'Bot'
  | 'ClipboardText'
  | 'Wrench'

export interface ServicePillar {
  slug: string
  icon: PillarIcon
  title: string
  subtitle: string
  description: string
  bullets: string[]
  deliverables: string[]
  cta: string
}

export interface ServiceGroup {
  id: string
  label: string
  terminal: string
  heading: string
  sub: string
  pillars: ServicePillar[]
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'build',
    label: 'Build',
    terminal: 'ls ~/services --development',
    heading: 'Web & Web App Development',
    sub: 'Full-stack products built to ship — custom code, production-grade, from schema to server.',
    pillars: [
      {
        slug: 'custom-web-applications',
        icon: 'Code',
        title: 'Custom Web Applications',
        subtitle: 'Laravel · Django · React · Next.js',
        description:
          'Scalable, production-grade web apps tailored to your business logic — built with Laravel, Django, and modern JavaScript.',
        bullets: [
          'End-to-end builds — database schema to deployed product',
          'Multi-tenant SaaS, management systems, and custom tools',
          'Real-time systems with Laravel Reverb and Django Channels',
          'Clean, maintainable code you own and can extend',
        ],
        deliverables: ['Full builds', 'Feature development', 'Maintenance'],
        cta: 'Start a build',
      },
      {
        slug: 'ecommerce-marketplaces',
        icon: 'Store',
        title: 'E-commerce & Marketplaces',
        subtitle: 'Payments · Vendors · Checkout',
        description:
          'Online stores and multi-vendor marketplaces with payments wired in — eSewa, Khalti, ConnectIPS, Stripe, and PayPal.',
        bullets: [
          'Multi-vendor architecture with vendor-scoped dashboards',
          'Payment gateway integration and webhook reconciliation',
          'Order, inventory, and automated invoicing flows',
          'Secure checkout with idempotent, reliable payments',
        ],
        deliverables: ['Store builds', 'Marketplaces', 'Payment setup'],
        cta: 'Build my store',
      },
      {
        slug: 'saas-admin-dashboards',
        icon: 'SquaresFour',
        title: 'SaaS & Admin Dashboards',
        subtitle: 'Filament · Panels · Automation',
        description:
          'Admin panels and dashboards that run your operations — Laravel Filament, RBAC, queues, and reporting.',
        bullets: [
          'Filament admin panels with role-based access control',
          'Queue workers, schedulers, and automated workflows',
          'Dashboards with optimized aggregation queries',
          'Export and reporting — Excel and PDF',
        ],
        deliverables: ['Admin panels', 'Dashboards', 'Workflows'],
        cta: 'Automate my ops',
      },
      {
        slug: 'api-development',
        icon: 'Rocket',
        title: 'API Development',
        subtitle: 'REST · Integrations · Services',
        description:
          'RESTful APIs and backend services designed for reliability, with clean, documented contracts.',
        bullets: [
          'Laravel, Django REST Framework, and Express APIs',
          'Auth with JWT / Sanctum and role-based access',
          'Third-party integrations and webhook handling',
          'Documented, versioned contracts your frontend can trust',
        ],
        deliverables: ['API design', 'Integrations', 'Docs'],
        cta: 'Build my API',
      },
      {
        slug: 'react-nextjs-frontends',
        icon: 'GearSix',
        title: 'React & Next.js Frontends',
        subtitle: 'SSR · TypeScript · Tailwind',
        description:
          'Fast, SEO-friendly frontends with React and Next.js — server rendering, dynamic components, responsive design.',
        bullets: [
          'Next.js App Router with SSR/SSG and optimized images',
          'TypeScript with shadcn/ui component systems',
          'Dynamic, component-driven interfaces',
          'Core Web Vitals tuned for speed and ranking',
        ],
        deliverables: ['Frontend builds', 'Redesigns', 'Performance'],
        cta: 'Rebuild my frontend',
      },
      {
        slug: 'servers-devops',
        icon: 'ShieldCheck',
        title: 'Servers & DevOps',
        subtitle: 'Nginx · Docker · Linux',
        description:
          'Linux server setup, Nginx, SSL, Docker containers, and queue workers so your app stays up and secure.',
        bullets: [
          'Deployment — Docker Compose, Nginx, Certbot SSL',
          'CI/CD pipelines with GitLab CI and GitHub Actions',
          'Process management with Supervisor and PM2',
          'Monitoring, backups, and security hardening',
        ],
        deliverables: ['Deployment', 'CI/CD', 'Server care'],
        cta: 'Deploy & maintain',
      },
    ],
  },
  {
    id: 'grow',
    label: 'Growth',
    terminal: 'ls ~/services --search-ai',
    heading: 'Search, AI & Growth',
    sub: 'Get found — by search engines and by AI — then measure and improve what ships.',
    pillars: [
      {
        slug: 'seo',
        icon: 'ChartBar',
        title: 'SEO',
        subtitle: 'Search Engine Optimization',
        description:
          'Technical and on-page SEO that gets your site ranked, indexed, and found by the people searching for what you do.',
        bullets: [
          'Technical audits — crawlability, indexation, and Core Web Vitals',
          'On-page optimization — titles, meta, headings, internal linking',
          'Keyword strategy mapped to your real search intent',
          'Structured data and schema markup for rich results',
        ],
        deliverables: ['SEO audit', 'Optimization roadmap', 'Implementation'],
        cta: 'Request an SEO audit',
      },
      {
        slug: 'aeo',
        icon: 'Bot',
        title: 'AEO',
        subtitle: 'Answer Engine Optimization',
        description:
          'Make your content the answer. I optimize for AI Overviews, ChatGPT, Perplexity, and voice search — so AI engines quote you, not your competitors.',
        bullets: [
          'Answer-first content structure AI engines can cite',
          'FAQPage, HowTo, and entity schema for featured answers',
          'Optimization for Google AI Overviews and LLM chatbots',
          'Competitive answer-gap analysis in your niche',
        ],
        deliverables: ['AEO audit', 'Content structure blueprint', 'Schema implementation'],
        cta: 'Get found by AI engines',
      },
      {
        slug: 'audit-enhancement',
        icon: 'ClipboardText',
        title: 'Audit & Enhancement',
        subtitle: 'Fix what\u2019s holding you back',
        description:
          'A deep audit of your existing site or app — performance, SEO, UX, security — followed by prioritized enhancements that ship.',
        bullets: [
          'Full-site technical and performance audits',
          'UX and conversion bottleneck analysis',
          'Security, speed, and Core Web Vitals fixes',
          'Clear, prioritized roadmap before any code is written',
        ],
        deliverables: ['Audit report', 'Prioritized roadmap', 'Enhancement builds'],
        cta: 'Book a free audit',
      },
      {
        slug: 'no-code-low-code',
        icon: 'Wrench',
        title: 'No-Code & Low-Code Solutions',
        subtitle: 'Fast, budget-friendly builds',
        description:
          'When custom isn\u2019t needed, I ship with no-code and low-code tools — WordPress, Webflow, and automation — that you can run yourself.',
        bullets: [
          'WordPress and Webflow sites with clean structure',
          'Workflow automation — forms, email, and integrations',
          'Landing pages and marketing sites that convert',
          'Fast delivery on a smaller budget',
        ],
        deliverables: ['Site setups', 'Automations', 'Maintenance'],
        cta: 'Ship it fast',
      },
    ],
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Free discovery audit',
    desc: 'We start with a no-cost audit of your site or idea — SEO, AEO, performance, and structure.',
  },
  {
    step: '02',
    title: 'Prioritized roadmap',
    desc: 'You get a clear, ranked plan: what to fix first, what delivers the most value, and what it costs.',
  },
  {
    step: '03',
    title: 'Build & implement',
    desc: 'Code or no-code, I implement the plan with clean, production-ready results — and you can watch progress.',
  },
  {
    step: '04',
    title: 'Measure & iterate',
    desc: 'We track rankings, traffic, answers, and conversions — then iterate so the wins keep compounding.',
  },
]

export const stats = [
  { value: '12+', label: 'Production projects shipped' },
  { value: 'SEO + AEO', label: 'Optimized for search & AI' },
  { value: 'End-to-end', label: 'Audit to deployment' },
  { value: '24h', label: 'Typical response time' },
]

export const faqs = [
  {
    q: 'What is the difference between SEO and AEO?',
    a: 'SEO optimizes your site for search engines like Google — rankings, indexation, and organic traffic. AEO optimizes your content to be quoted by answer engines like Google AI Overviews, ChatGPT, and Perplexity. I do both, because your audience now discovers you through both.',
  },
  {
    q: 'Is the audit really free?',
    a: 'Yes. The discovery audit is a genuine, no-strings review of your site or project — a real snapshot of what\u2019s working and what\u2019s costing you. If you like the findings, we turn it into a roadmap.',
  },
  {
    q: 'Can you help if I already have an existing site?',
    a: 'That\u2019s exactly what audit & enhancement is for. I work on existing sites and apps — fixing performance, SEO, UX, and security issues without a full rebuild unless it\u2019s the right call.',
  },
  {
    q: 'Do you build from scratch or only fix existing sites?',
    a: 'Both. I build full custom products end-to-end — Laravel, Django, React, and Next.js — and I also enhance existing sites and apps. The right path depends on your goals, budget, and timeline, and we decide it together.',
  },
  {
    q: 'What does \u2018code and no-code solutions\u2019 mean?',
    a: 'Depending on your needs, I build custom applications with Laravel, Django, React, and Next.js, or set up no-code / low-code solutions like WordPress, Webflow, and automation tools. You get the outcome that fits your budget and timeline.',
  },
  {
    q: 'Do you work with clients outside Nepal?',
    a: 'Yes. I\u2019m based in Kathmandu but work with clients locally and internationally — mostly in English — delivering everything from audits to full production builds.',
  },
]

export const cta = {
  heading: 'Want to build something — or know where your site stands?',
  subheading:
    'Get a free, honest audit of your site\u2019s search visibility, AI visibility, and performance — or start a build. The audit is free. The advice is straight.',
  primaryLabel: 'Book a free audit',
  secondaryLabel: 'Get in touch',
  primaryHref: '/contact',
  secondaryHref: '/contact',
}
