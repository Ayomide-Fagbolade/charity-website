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
    slug: "disaster-relief",
    title: "Disaster Relief & Emergency Support",
    description: "providing immediate aid, food, and shelter to victims of natural disasters and catastrophic events",
    tags: ["Emergency", "Relief", "Humanitarian"],
    published: true,
    impact_score: 98,
    content: "# Disaster Relief & Emergency Support\n\nWhen catastrophe strikes, every second counts. Our Disaster Relief & Emergency Support program is designed to mobilize rapid resources to areas affected by natural disasters, fires, floods, and other humanitarian crises.\n\nWe work in coordination with local partners to deliver:\n- **Emergency Shelter**: Temporary housing for displaced families.\n- **Food & Water**: Immediate access to nutritional supplies and clean drinking water.\n- **Medical Aid**: First aid supplies and access to basic healthcare.\n\nYour donation to this fund ensures we can respond instantly when disaster hits, saving lives and helping communities begin the long road to recovery with dignity.",
  },
  {
    slug: "orphanage-support",
    title: "Orphanage Support Program",
    description: "empowering orphaned children with essential care, education supplies, and a loving community environment",
    tags: ["Children", "Care", "Education"],
    published: true,
    impact_score: 95,
    content: "# Orphanage Support Program\n\nEvery child deserves a safe home, a warm meal, and the chance to dream. Our Orphanage Support Program partners with verified orphanages to bridge the gap between basic survival and thriving childhoods.\n\nWe focus on:\n- **Nutritional Support**: Ensuring children receive balanced, healthy meals daily.\n- **Educational Supplies**: Providing books, uniforms, and school fees to keep children in class.\n- **Living Conditions**: Improving sleeping quarters and sanitation facilities.\n\nBy supporting this project, you are not just giving supplies; you are showing these children that they are seen, valued, and loved by a wider community.",
  },
  {
    slug: "student-marketplace",
    title: "Student Thrift & Marketplace",
    description: "a sustainable campus hub for redistributing usable items, promoting circular economy and peer-to-peer support",
    tags: ["Sustainability", "Students", "Community"],
    published: true,
    impact_score: 92,
    content: "# Student Thrift & Marketplace\n\nStudent life can be expensive, and waste is often rampant on university campuses. The Student Thrift & Marketplace creates a circular economy where excess becomes opportunity.\n\n**How it works:**\n- We collect gently used furniture, textbooks, electronics, and clothing from students who no longer need them.\n- These items are cleaned, organized, and made available to other students at little to no cost.\n- Students facing financial hardship are given priority access.\n\nThis initiative reduces landfill waste, lowers the cost of living for students, and fosters a spirit of sharing and mutual support across campus.",
  },
  {
    slug: "community-impact-fund",
    title: "Community Impact Fund",
    description: "flexible funding to address the most urgent needs across all our initiatives, ensuring resources go where they are needed most",
    tags: ["General", "Flexible", "Impact"],
    published: true,
    impact_score: 90,
    content: "# Community Impact Fund\n\nNeeds change, and flexibility is key to effective aid. The Community Impact Fund constitutes our general donations pool, allowing us to direct resources to where they are most critically needed at any given moment.\n\nWhether it's topping up a shortfall in our Orphanage Support, rushing extra supplies to a disaster zone, or launching a new pilot program for student welfare, this fund powers the agility of BridgeSeed Foundation.\n\n**Why donate here?**\n- **Maximum Efficiency**: Allows us to fill gaps immediately without waiting for specific appeal targets.\n- **Holistic Support**: Supports the operational backbone that makes all our specific projects possible.\n- **Rapid Response**: Gives us the freedom to say 'yes' to urgent pleas for help.\n\nMake a general donation today to empower our entire mission.",
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
