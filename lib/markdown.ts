export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  published: boolean
  impact_score: number
  content: string
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  content: string
}

// Sample projects data
const projectsData: Project[] = [
  {
    slug: "clean-water-initiative",
    title: "Clean Water Initiative",
    description: "Providing access to clean drinking water in rural communities across East Africa",
    tags: ["Water", "Health", "Infrastructure"],
    published: true,
    impact_score: 95,
    content: "# Clean Water Initiative\n\nProviding sustainable access to clean drinking water...",
  },
  {
    slug: "education-for-all",
    title: "Education for All",
    description: "Building schools and providing educational resources in underserved regions",
    tags: ["Education", "Youth", "Development"],
    published: true,
    impact_score: 90,
    content: "# Education for All\n\nEmpowering communities through education...",
  },
  {
    slug: "malaria-prevention",
    title: "Malaria Prevention Program",
    description: "Distributing mosquito nets and providing treatment in high-risk areas",
    tags: ["Health", "Prevention", "Medical"],
    published: true,
    impact_score: 88,
    content: "# Malaria Prevention Program\n\nSaving lives through prevention and treatment...",
  },
  {
    slug: "sustainable-agriculture",
    title: "Sustainable Agriculture",
    description: "Teaching modern farming techniques to improve food security and income",
    tags: ["Agriculture", "Sustainability", "Economic"],
    published: true,
    impact_score: 85,
    content: "# Sustainable Agriculture\n\nBuilding resilient farming communities...",
  },
]

// Sample blog posts data
const postsData: Post[] = [
  {
    slug: "impact-measurement-2024",
    title: "How We Measure Impact: Our 2024 Methodology",
    excerpt:
      "Transparency is at the core of our mission. Learn about our rigorous approach to measuring and reporting the impact of every dollar donated.",
    date: "2024-03-15",
    author: "Sarah Johnson",
    content: "# How We Measure Impact\n\nTransparency and accountability are fundamental...",
  },
  {
    slug: "clean-water-success",
    title: "Clean Water Initiative Reaches 50,000 People",
    excerpt:
      "A major milestone in our clean water program as we celebrate providing sustainable water access to 50,000 individuals across 12 communities.",
    date: "2024-03-01",
    author: "Michael Chen",
    content: "# Clean Water Success Story\n\nWe're thrilled to announce...",
  },
  {
    slug: "effective-giving-guide",
    title: "The Effective Giving Guide: Maximizing Your Impact",
    excerpt:
      "Not all charitable donations are equal. Discover how to ensure your contributions create the most positive change in the world.",
    date: "2024-02-20",
    author: "Emily Rodriguez",
    content: "# Effective Giving Guide\n\nEvery donation has the potential...",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projectsData.filter((project) => project.published).sort((a, b) => b.impact_score - a.impact_score)
}

export function getPostBySlug(slug: string): Post | undefined {
  return postsData.find((post) => post.slug === slug)
}

export function getAllPosts(): Post[] {
  return postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
