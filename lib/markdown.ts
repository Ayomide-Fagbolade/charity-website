export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  published: boolean
  impact_score: number
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
    impact_score: 98,
    content: `## The Crisis
When natural disasters strike, the first 72 hours are critical. Families lose their homes, access to clean water vanishes, and medical infrastructure often collapses. Without immediate intervention, the initial catastrophe is followed by a secondary wave of preventable disease and hardship.

## Our Approach
The BridgeSeed Disaster Relief model focuses on rapid mobilization. We maintain "Emergency Ready" kits—containing food, water purification tablets, and first aid—that can be deployed within hours. 

Beyond immediate aid, we stay in the affected areas for up to 6 months to help rebuild. This includes:
- **Temporary Classrooms**: Ensuring children don't lose months of education.
- **Micro-grants**: Helping small local businesses reopen to restart the local economy.

## Long-term Vision
We don't just want to respond to disasters; we want to build communities that can withstand them. A portion of every disaster relief donation goes toward 'Resilience Training' for local leaders, teaching them how to organize community responses before international aid even arrives.`,
    images: ["/disaster-relief.jpg"],
    canDonate: true,
    canSell: false,
    impact_metrics: [
      { amount: 50, label: "Emergency Food Kit", description: "Provides 3 days of essential nutrition for a displaced victim." },
      { amount: 150, label: "Clean Water Filter", description: "Provides a family with safe drinking water for up to 6 months." },
      { amount: 500, label: "Emergency Shelter Kit", description: "A high-grade thermal tent and blankets for a family of four." }
    ]
  },
  {
    slug: "orphanage-support",
    title: "Orphanage Support Program",
    description: "empowering orphaned children with essential care, education supplies, and a loving community environment",
    tags: ["Children", "Care", "Education"],
    published: true,
    impact_score: 95,
    content: `## The Need
Over 3,000 children across the region are currently living in institutions that struggle to meet their most basic nutritional and educational needs. Growing up in such environments without proper support can lead to significant long-term challenges in adulthood.

## Our Approach
BridgeSeed doesn't just "fund" orphanages; we partner with them. We provide:
- **Nutritional Counseling**: Working with kitchens to ensure meals are balanced and growth-focused.
- **The "Library Project"**: Building small, vibrant reading rooms within each home to cultivate a love for learning.
- **Skill Workshops**: For older children, we bring in mentors to teach coding, carpentry, and financial literacy.

## Impact Stories
Last year, through this program, 12 children from our partnered homes successfully transitioned to university with full scholarships. By providing the environment they need to thrive, we are giving them back the childhood they deserve.`,
    images: ["/orphanage-support.jpg"],
    canDonate: true,
    canSell: false,
    impact_metrics: [
      { amount: 30, label: "Education Pack", description: "One school bag filled with notebooks, pens, and basic supplies." },
      { amount: 100, label: "Nutritional Boost", description: "Supplements for a child for one month including vitamins and milk." },
      { amount: 300, label: "Scholarship Seed", description: "Covers local school registration and fees for one child per year." }
    ]
  },
  {
    slug: "student-marketplace",
    title: "Student Thrift & Marketplace",
    description: "a sustainable campus hub for redistributing usable items, promoting circular economy and peer-to-peer support",
    tags: ["Sustainability", "Students", "Community"],
    published: true,
    impact_score: 92,
    content: `## Circular Economy on Campus
University life shouldn't cost the earth. Every year, graduating students discard tons of usable furniture, books, and electronics. Meanwhile, incoming students struggle to afford these same essentials.

## How we Bridge the Gap
The Student Thrift & Marketplace is a student-led initiative that:
1. **Collects**: We organize "Drive Days" where students can drop off items.
2. **Restores**: Volunteers clean and repair furniture and electronics.
3. **Redistributes**: Students can pick up items for a nominal fee or for free if they have verified financial needs.

## Sustainability Impact
By keeping items in use, we have diverted over 5 tons of waste from landfills this year alone. It's a win for the planet and a win for the student pocket.`,
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
    impact_score: 90,
    content: `## Flexibility is Power
Sometimes the most urgent need isn't part of a pre-defined project. A sudden medical emergency for a community member, a broken water pump in a remote village, or a unique scholarship opportunity for a bright student—these are the "gaps" that the Community Impact Fund fills.

## Where the Money Goes
This fund acts as our rapid-response resource. It allows us to:
- **Triage**: Respond to the most critical needs within 24 hours.
- **Innovate**: Fund pilot programs that, if successful, can grow into full projects.
- **Sustain**: Ensure that no ongoing project fails due to temporary funding shortfalls.

## Why it Matters
By donating to the general fund, you are trusting BridgeSeed's experts to direct your contribution to where it will generate its maximum mathematical impact at that specific moment.`,
    images: ["/community-impact-fund.jpg"],
    canDonate: true,
    canSell: false,
    impact_metrics: [
      { amount: 20, label: "Seed for the Green", description: "One fruit tree planted to provide food and shade in a village." },
      { amount: 120, label: "Mobile Clinic Visit", description: "Covers a professional check-up and basic meds for one elderly person." },
      { amount: 250, label: "Safe Hub Light", description: "Install one solar-powered light for a safe study space in an rural area." }
    ]
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
