export interface SocialLink {
  label: string
  url: string
  display: string
}

export interface SocialLinks {
  github: SocialLink
  linkedin: SocialLink
  gitlab: SocialLink
  email: SocialLink
  website: SocialLink
}

export interface NavItem {
  name: string
  href: string
}

export interface HeroData {
  badgeText: string
  ctaButtons: { text: string; href: string; style: string }[]
  socialLinks: string[]
}

export interface AboutStat {
  value: string
  suffix: string
  label: string
}

export interface AboutData {
  headline: string
  statement: string
  details: string[]
  differentiators: string[]
  stats: AboutStat[]
  badges: string[]
}

export interface TechSkill {
  name: string
  level: string
  levelColor: string
  subSkills: string[]
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  technologies: TechSkill[]
}

export interface SkillsData {
  sectionTitle: string
  sectionTitleHighlight: string
  sectionSubtitle: string
  categories: SkillCategory[]
  realWorldApplications: string[]
  realWorldTitle: string
  realWorldSubtitle: string
  levelStyles: Record<string, { borderColor: string; bgColor: string }>
}

export interface ProjectCaseStudy {
  year: string
  client?: string
  clientProblem: string[]
  role: string[]
  architecture: string[]
  databaseDesign: string[]
  apiArchitecture: string[]
  authentication: string[]
  realTime?: string[]
  payments?: string[]
  deployment: string[]
  performance: string[]
  problems: string[]
  solutions: string[]
  results: string[]
  lessons: string[]
  repoUrl?: string
  liveUrl?: string
  code?: {
    language: string
    caption: string
    lines: string[]
  }
}

export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  highlights: string[]
  headerType: string
  icon: string
  metric: string
  terminal?: string
  caseStudy?: ProjectCaseStudy
}

export interface ProjectsData {
  sectionTitle: string
  sectionSubtitle: string
  items: Project[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  excerpt: string
  tags: string[]
  image: string
  file?: string
}

export interface BlogData {
  sectionTitle: string
  sectionSubtitle: string
  postsPath: string
  items: BlogPost[]
}

export interface ContactFormData {
  submitText: string
  submittingText: string
  successText: string
  thankYouText: string
  errorText: string
  fields: { name: string; label: string; type: string; placeholder: string; required: boolean }[]
}

export interface ContactData {
  sectionTitle: string
  sectionSubtitle: string
  contactMethods: string[]
  availability: {
    title: string
    text: string
    responseTime: string
  }
  form: ContactFormData
}

export interface ExperienceRole {
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
}

export interface ExperienceData {
  sectionTitle: string
  sectionSubtitle: string
  roles: ExperienceRole[]
  education: Education[]
  achievements: string[]
  expertiseAreas: string[]
}

export interface PersonalData {
  name: string
  logoTag: string
  title: string
  subtitle: string
  tagline: string
  footerDescription: string
  copyright: string
  location: string
  availability: string
}

export interface PortfolioData {
  personal: PersonalData
  social: SocialLinks
  navigation: { items: NavItem[] }
  hero: HeroData
  about: AboutData
  skills: SkillsData
  projects: ProjectsData
  blog: BlogData
  contact: ContactData
  experience: ExperienceData
}
