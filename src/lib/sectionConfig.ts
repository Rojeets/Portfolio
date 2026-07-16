export interface SectionConfig {
  showCore: boolean
  cameraDist: number
  rotSpeed: number
  cyanBias: number
  nodeCount: number
}

export const sectionConfig: Record<string, SectionConfig> = {
  hero:       { showCore: true,  cameraDist: 6,  rotSpeed: 0.8, cyanBias: 0.6, nodeCount: 10 },
  about:      { showCore: true,  cameraDist: 11, rotSpeed: 0.2, cyanBias: 0.15, nodeCount: 8 },
  philosophy: { showCore: true,  cameraDist: 12, rotSpeed: 0.15, cyanBias: 0.1, nodeCount: 6 },
  skills:     { showCore: true,  cameraDist: 12, rotSpeed: 0.15, cyanBias: 0.1, nodeCount: 6 },
  projects:   { showCore: false, cameraDist: 9,  rotSpeed: 0.1, cyanBias: 0.2, nodeCount: 6 },
  experience: { showCore: true,  cameraDist: 12, rotSpeed: 0.15, cyanBias: 0.1, nodeCount: 8 },
  blog:       { showCore: false, cameraDist: 10, rotSpeed: 0.1, cyanBias: 0.15, nodeCount: 6 },
  cta:        { showCore: true,  cameraDist: 8,  rotSpeed: 0.5, cyanBias: 0.5, nodeCount: 8 },
  contact:    { showCore: true,  cameraDist: 5,  rotSpeed: 0.9, cyanBias: 0.7, nodeCount: 10 },
  detailPage: { showCore: false, cameraDist: 20, rotSpeed: 0,   cyanBias: 0,   nodeCount: 0 },
}

export const sectionIds = [
  'hero',
  'about',
  'philosophy',
  'skills',
  'projects',
  'experience',
  'blog',
  'cta',
  'contact',
] as const

export type SectionId = (typeof sectionIds)[number]
