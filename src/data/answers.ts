export interface AnswerItem {
  slug: string
  question: string
  shortAnswer: string
  answer: string[]
  relatedTech?: string[]
  relatedProjects?: string[]
  relatedPosts?: string[]
  category: 'about-roit' | 'technical'
}

export const answers: AnswerItem[] = [
  {
    slug: 'what-does-roit-pokharel-specialize-in',
    category: 'about-roit',
    question: 'What does Rojit Pokharel specialize in?',
    shortAnswer:
      'Rojit Pokharel specializes in full-stack web application development and system architecture — production web applications built with Laravel, Django, React, Next.js, and scalable infrastructure.',
    answer: [
      'Rojit Pokharel is a Full-Stack Web Developer and System Architect from Kathmandu, Nepal. His specialization is designing and shipping production web applications end-to-end: database schema, API architecture, frontend experience, and the servers they run on.',
      'His core stack is Laravel and PHP for the backend, React and Next.js for the frontend, and Django for Python projects, with MySQL or PostgreSQL for data. He also owns the infrastructure layer — Docker, Nginx, Linux, and CI/CD — so the code actually stays running in production.',
      'Beyond full-stack development, he builds real-time systems with Laravel Reverb and Django Channels, integrates Nepali and international payment gateways (Khalti, eSewa, Stripe), and has shipped AI/ML and computer vision pipelines.',
    ],
    relatedProjects: ['restaurant-management-saas', 'insurance-claim-platform'],
  },
  {
    slug: 'what-technologies-does-roit-pokharel-use',
    category: 'about-roit',
    question: 'What technologies does Rojit Pokharel use?',
    shortAnswer:
      'Laravel and PHP for backend, React and Next.js for frontend, Django for Python projects, MySQL or PostgreSQL for databases, and Docker, Nginx, and Linux for infrastructure.',
    answer: [
      'Backend: Laravel (Expert), PHP, Django with Django REST Framework, Flask, and Express.js. He uses Laravel Filament for admin panels and Spatie for role-based permissions.',
      'Frontend: React.js, Next.js with App Router and SSR/SSG, TypeScript, Tailwind CSS, and shadcn/ui.',
      'Data: MySQL and PostgreSQL for relational storage, Redis for caching and message brokering, MongoDB where document storage fits.',
      'Real-time: Laravel Reverb and Django Channels with WebSockets.',
      'DevOps: Docker and Docker Compose, Nginx with Certbot SSL, Supervisor and PM2 for process management, GitLab CI and GitHub Actions, Prometheus for monitoring.',
      'AI/ML: PyTorch, YOLOv5/YOLOv8 object detection, OpenCV, SORT tracking, and LLM integration with Google Gemini.',
    ],
    relatedProjects: ['restaurant-management-saas', 'insurance-claim-platform', 'server-uptime-monitoring'],
  },
  {
    slug: 'how-much-experience-does-roit-pokharel-have',
    category: 'about-roit',
    question: 'How much experience does Rojit Pokharel have?',
    shortAnswer:
      'Rojit Pokharel has been a full-stack developer at Infinity Digital Agency in Kathmandu since 2025, and has delivered 12+ production client projects across e-commerce, travel, education, insurance, and restaurant domains.',
    answer: [
      'He is a full-stack developer at Infinity Digital Agency in Kathmandu, where he builds and maintains production web applications with Laravel, React, and Next.js — including server setup, API integration, and database optimization.',
      'Beyond agency work, he has built production projects across the stack: a multi-tenant restaurant SaaS, a UK insurance claim platform, an offline-first home services marketplace, e-commerce marketplaces, and AI/ML and computer vision pipelines.',
      'He also has community and hackathon experience — a DataCamp Donates Fellow, R-Hackathon 2025 participant, and Turboline X IIMS Hackathon participant — plus a Bachelor of Science in Information Technology in progress at Techspire College.',
    ],
    relatedProjects: ['restaurant-management-saas', 'insurance-claim-platform', 'servicelink-marketplace'],
  },
  {
    slug: 'what-web-applications-has-roit-pokharel-built',
    category: 'about-roit',
    question: 'What web applications has Rojit Pokharel built?',
    shortAnswer:
      'Rojit Pokharel has built a restaurant management SaaS, a UK insurance claim platform, an offline-first home services marketplace, e-commerce marketplaces, a gold exchange MIS, and AI/ML systems — 12+ production projects in total.',
    answer: [
      'Restaurant Management SaaS — a multi-tenant platform with a real-time kitchen display built on Laravel Reverb and multi-gateway payments (Khalti, eSewa, Stripe).',
      'Insurance Claim Platform — a UK insurance platform with AI-powered room analysis via Cohere Vision, Django Channels chat, Celery async pipelines, and automated PDF reports.',
      'ServiceLink Marketplace — a home repair marketplace with a Django REST API and offline-first React Native app.',
      'E-commerce Multi-Vendor Platform — a marketplace supporting 50+ vendors with real-time notifications and automated PDF invoicing.',
      'Gold Exchange MIS — inventory and transaction management for a gold exchange with Excel/PDF reporting.',
      'AI Referee — a computer vision pipeline tracking football players with YOLOv5, SORT, and OpenCV.',
      'Server Monitoring Tool — an open-source Go uptime monitoring tool with Prometheus metrics and Slack alerts.',
    ],
    relatedProjects: [
      'restaurant-management-saas',
      'insurance-claim-platform',
      'servicelink-marketplace',
      'ecommerce-multi-vendor-platform',
      'gold-exchange-mis',
      'ai-referee-football-analytics',
      'server-uptime-monitoring',
    ],
  },
  {
    slug: 'is-roit-pokharel-a-laravel-developer',
    category: 'about-roit',
    question: 'Is Rojit Pokharel a Laravel developer?',
    shortAnswer:
      'Yes. Laravel is Rojit Pokharel\'s primary backend framework — he builds production SaaS, e-commerce, and management systems with Laravel, Filament, Reverb, and Livewire.',
    answer: [
      'Laravel is the framework he works with daily at Infinity Digital Agency, building client applications across e-commerce, travel, education, and restaurant domains.',
      'His Laravel work includes multi-tenant SaaS with database-level isolation, real-time kitchen systems with Laravel Reverb, Filament v5 admin panels, Sanctum authentication, Spatie permissions, queue workers, and payment gateway integration.',
      'He is also a Django developer — the insurance and marketplace platforms are built with Django REST Framework and Django Channels — so he works across both Laravel and Django rather than one framework only.',
    ],
    relatedProjects: ['restaurant-management-saas', 'ecommerce-multi-vendor-platform', 'gold-exchange-mis'],
    relatedPosts: ['laravel-vs-django-vs-nodejs'],
  },
  {
    slug: 'is-roit-pokharel-available-for-freelance-work',
    category: 'about-roit',
    question: 'Is Rojit Pokharel available for freelance work?',
    shortAnswer:
      'Yes. Rojit Pokharel is open to freelance projects and full-time opportunities, and usually responds within 24 hours via the contact page or info@rojitpokharel.com.np.',
    answer: [
      'He works with clients in Nepal and internationally, communicating in English and delivering production-grade web applications end-to-end.',
      'Typical engagements include custom web applications, e-commerce platforms, SaaS products, API development, real-time systems, and server setup and deployment.',
      'To discuss a project, use the contact page or email info@rojitpokharel.com.np.',
    ],
  },
  {
    slug: 'where-is-roit-pokharel-based',
    category: 'about-roit',
    question: 'Where is Rojit Pokharel based?',
    shortAnswer:
      'Rojit Pokharel is based in Kathmandu, Nepal, and works with clients both locally and internationally.',
    answer: [
      'He is a full-stack developer at Infinity Digital Agency in Ratopul, Kathmandu, and is studying for a Bachelor of Science in Information Technology at Techspire College.',
      'While based in Kathmandu, he delivers production systems for clients in Nepal and abroad, including a UK insurance platform.',
    ],
  },
  {
    slug: 'how-do-you-deploy-laravel-with-docker',
    category: 'technical',
    question: 'How do you deploy Laravel with Docker?',
    shortAnswer:
      'Run Laravel behind Nginx in a Docker Compose stack with separate services for Nginx, PHP-FPM, MySQL/PostgreSQL, Redis, and queue workers, with health checks and multi-stage builds.',
    answer: [
      'A typical Laravel production deployment separates each concern into its own container: Nginx terminates SSL and proxies to PHP-FPM; PHP-FPM serves the Laravel app with OPcache enabled; MySQL or PostgreSQL holds data; Redis handles cache and the queue broker; and a Supervisor or Horizon worker processes queues.',
      'Use Docker Compose so the whole stack starts with a single command. Add health checks so services start in the right order — the app waits for the database before accepting requests.',
      'Environment variables keep configuration out of the image. Use multi-stage builds to keep images small, and volume mounts for persistent data so container restarts do not lose state.',
      'The exact pattern I use in production is described in the restaurant SaaS case study, which runs Nginx, PHP-FPM, MySQL, Redis, and the Reverb WebSocket server as separate services.',
    ],
    relatedProjects: ['restaurant-management-saas'],
    relatedPosts: ['realworld-impact-projects'],
  },
  {
    slug: 'how-does-laravel-reverb-work',
    category: 'technical',
    question: 'How does Laravel Reverb work?',
    shortAnswer:
      'Laravel Reverb is a first-party WebSocket server for Laravel. It keeps a persistent connection with browsers, and the Laravel app broadcasts events over Redis channels that Reverb relays to subscribed clients in real time.',
    answer: [
      'When a user performs an action in your app, Laravel fires an event. That event is broadcast to a channel in Redis. The Reverb WebSocket server subscribes to Redis and relays the event to every connected client subscribed to that channel — the browser receives it instantly, with no polling.',
      'In the restaurant SaaS, for example, placing an order broadcasts an OrderCreated event to a kitchen channel. The kitchen display client, connected over WebSocket, renders the order within milliseconds.',
      'Client libraries use Laravel Echo, which handles subscriptions, reconnections, and missed-event sync. You can also configure Reverb for horizontal scaling by scaling out the Redis layer.',
      'Reverb replaces third-party services and lets Laravel apps ship real-time features with the native ecosystem.',
    ],
    relatedProjects: ['restaurant-management-saas', 'ecommerce-multi-vendor-platform'],
    relatedPosts: ['realworld-impact-projects'],
  },
  {
    slug: 'how-do-you-optimize-postgresql',
    category: 'technical',
    question: 'How do you optimize PostgreSQL?',
    shortAnswer:
      'Start with schema design — normalized tables, foreign keys, and indexes on the columns used in WHERE, JOIN, and ORDER BY — then profile queries with EXPLAIN ANALYZE and add targeted indexes.',
    answer: [
      'Index what you query: foreign-key columns, status filters, and timestamps used in range queries. Avoid over-indexing, which slows writes.',
      'Use EXPLAIN ANALYZE to find sequential scans on hot paths and confirm indexes are actually used.',
      'For a tenant-based system, choose the isolation model that matches your scale — the restaurant SaaS uses database-level tenant isolation (a schema per tenant) to keep multi-tenant queries fast and clean.',
      'Add connection pooling for many concurrent clients, use prepared statements, and cache hot read-heavy data in Redis to keep the database focused on writes and complex joins.',
    ],
    relatedProjects: ['restaurant-management-saas', 'insurance-claim-platform'],
  },
  {
    slug: 'how-do-you-make-next-js-applications-seo-friendly',
    category: 'technical',
    question: 'How do you make Next.js applications SEO-friendly?',
    shortAnswer:
      'Use the App Router with server-side rendering or static generation so content is in the initial HTML, add per-page metadata with canonical URLs, generate a sitemap and robots.txt, and use semantic HTML and structured data.',
    answer: [
      'Serve real HTML: SSR or SSG via the App Router puts your content in the initial response, which is what crawlers and AI systems read. A client-only SPA leaves an empty shell in the HTML.',
      'Set metadata per page: title, meta description, canonical URL, Open Graph, and Twitter cards. Use a template so every page title is consistent.',
      'Generate a sitemap.xml and robots.txt so search engines discover every page, and keep URLs clean.',
      'Use semantic HTML — one H1 per page, proper heading hierarchy, and descriptive alt text on images — and add structured data (JSON-LD) that matches visible content: Person, Article, BreadcrumbList, and SoftwareApplication.',
      'This portfolio is built this way: every page is server-rendered, blog posts and case studies are statically generated, and structured data references one canonical Person entity.',
    ],
    relatedPosts: ['realworld-impact-projects'],
  },
  {
    slug: 'how-do-you-integrate-nepali-payment-gateways',
    category: 'technical',
    question: 'How do you integrate Nepali payment gateways like Khalti and eSewa?',
    shortAnswer:
      'Route each gateway through an abstraction layer: one payment interface, an adapter per provider (Khalti, eSewa, Stripe), webhook reconciliation with idempotency keys, and retry logic for failed charges.',
    answer: [
      'Never hard-code a gateway into your business logic. Define a single payment interface — charge, refund, verify — and implement an adapter for each provider so switching or adding a gateway is a small change.',
      'Each gateway has different webhook payloads and retry semantics. Normalize them behind the adapter and reconcile with idempotency keys so a retried webhook cannot double-charge.',
      'The restaurant SaaS routes by region: Khalti or eSewa for Nepal-based restaurants, Stripe for international — all through one abstraction layer with automatic retry logic.',
    ],
    relatedProjects: ['restaurant-management-saas'],
    relatedPosts: ['payment-gateway-integration-nepal'],
  },
  {
    slug: 'what-is-a-full-stack-developer',
    category: 'technical',
    question: 'What does a full-stack web developer do?',
    shortAnswer:
      'A full-stack web developer builds the complete web application — frontend, backend, database, and often the deployment infrastructure — so a product works end-to-end.',
    answer: [
      'Frontend: the user interface, built with React, Next.js, and styling systems, wired to the backend API.',
      'Backend: business logic, API endpoints, authentication, and integrations, built with Laravel, Django, or Node.js.',
      'Data: schema design, queries, and optimization on MySQL or PostgreSQL.',
      'Infrastructure: deploying and keeping it running with Docker, Nginx, and Linux.',
      'Rojit Pokharel is a full-stack developer who owns the entire delivery lifecycle — from schema design to production deployment — across Laravel, Django, React, and Next.js.',
    ],
    relatedPosts: ['fullstack-developer-skills-2026'],
  },
]
