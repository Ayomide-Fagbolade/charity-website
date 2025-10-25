import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart } from "lucide-react"
import { getProjectBySlug, getAllProjects } from "@/lib/markdown"

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Impact Charity`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  // Attempt to load image from /public based on project title
  const imagePath = `/${project.title}.jpg`

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <section className="py-6 px-4 border-b">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{project.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">{project.description}</p>

          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg mb-8">
            {imagePath ? (
              <Image
                src={imagePath}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm italic flex items-center justify-center h-full">
                No image available for “{project.title}”
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Impact Score</CardTitle>
                <div className="text-3xl font-bold text-primary">{project.impact_score}/100</div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Status</CardTitle>
                <div className="text-3xl font-bold">Active</div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">People Helped</CardTitle>
                <div className="text-3xl font-bold">12,500+</div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>About This Project</h2>
            <p className="leading-relaxed">{project.content}</p>

            <h3>Why This Matters</h3>
            <p className="leading-relaxed">
              This project represents one of the most cost-effective interventions in global health and development.
              Based on rigorous research and evidence, we've identified this as a high-impact opportunity to create
              lasting positive change.
            </p>

            <h3>How Your Donation Helps</h3>
            <ul>
              <li>$25 can provide essential supplies for one family</li>
              <li>$100 can support program operations for one week</li>
              <li>$500 can fund a complete intervention in one community</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support This Project</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your donation will directly support this high-impact program and help us reach more people in need.
          </p>
          <Button size="lg" asChild>
            <Link href="/donate">
              Donate Now <Heart className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
