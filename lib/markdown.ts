export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  published: boolean
  content: string
  images: string[]
  canDonate: boolean
  canSell: boolean
  impact_metrics?: {
    amount: number
    label: string
    description: string
  }[]
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

    content: `When disaster strikes, gathering resources often takes time, delaying critical support to those affected. Natural emergencies such as earthquakes and floods can disrupt access to basic necessities, especially for vulnerable students and families.
By continuously collecting and organizing usable donations, we ensure resources are readily available before emergencies occur. This proactive approach allows for a rapid, coordinated response, providing timely and practical assistance when it is needed most.`,
    images: ["/disaster-relief.jpg"],
    canDonate: true,
    canSell: false,

  },
  {
    slug: "orphanage-support",
    title: "Orphanage Support Program",
    description: "empowering orphaned children with essential care, education supplies, and a loving community environment",
    tags: ["Children", "Care", "Education"],
    published: true,

    content: `The BridgeSeed Foundation believes that the journey of a belonging should extend beyond the campus gates. Through our Orphanage Support Programme, we strategically channel a portion of the high-quality, unused materials gathered from our student community, including clothing, study materials, and hygiene products, to local orphanages. This initiative transforms student surplus into essential support, ensuring that our commitment to strategic giving creates measurable impact for the most vulnerable members of our wider community. Every item donated by a student helps write a new chapter of hope and dignity for a child in need.`,
    images: ["/orphanage-support.jpg"],
    canDonate: true,
    canSell: false,

  },
  {
    slug: "student-marketplace",
    title: "Student Thrift & Marketplace",
    description: "a sustainable campus hub for redistributing usable items, promoting circular economy and peer-to-peer support",
    tags: ["Sustainability", "Students", "Community"],
    published: true,

    content: `A student-led circular economy initiative that collects, restores, and redistributes gently used furniture, books, and electronics on campus. The marketplace helps students access essential items affordably while reducing waste and keeping usable goods out of landfills.`,
    images: ["/student-marketplace.jpg"],
    canDonate: false,
    canSell: true,
  },
  {
    slug: "community-impact-fund",
    title: "Community Impact Fund",
    description: "flexible funding to address the most urgent needs across all our initiatives, ensuring resources go where they are needed most",
    tags: ["General", "Flexible", "Impact"],
    published: true,
    content: `Flexibility is Power
Sometimes the most urgent need isn't part of a pre-defined project. A sudden medical emergency for a community member, a broken water pump in a remote village, or a unique scholarship opportunity for a bright student—these are the "gaps" that the Community Impact Fund fills.

Where the Money Goes
This fund acts as our rapid-response resource. It allows us to:
- Triage: Respond to the most critical needs within 24 hours.
- Innovate: Fund pilot programs that, if successful, can grow into full projects.
- Sustain: Ensure that no ongoing project fails due to temporary funding shortfalls.

 Why it Matters
By donating to the general fund, you are trusting BridgeSeed's experts to direct your contribution to where it will generate its maximum mathematical impact at that specific moment.`,
    images: ["/community-impact-fund.jpg"],
    canDonate: true,
    canSell: false,

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
  return projectsData.filter((project) => project.published)
}

export function getPostBySlug(slug: string): Post | undefined {
  return postsData.find((post) => post.slug === slug)
}

export function getAllPosts(): Post[] {
  return postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
