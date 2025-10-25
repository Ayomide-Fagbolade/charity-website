export interface Project {
  title: string
  slug: string
  cause_area: string
  impact_score: number
  estimated_cost_per_life_saved?: number
  excerpt: string
  images?: string[]
  partners: string[]
  published: boolean
  content?: string
}

export interface BlogPost {
  title: string
  slug: string
  author: string
  date: string
  excerpt: string
  tags: string[]
  image?: string
  content?: string
}
