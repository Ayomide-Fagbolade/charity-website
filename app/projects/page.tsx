import Link from "next/link"
import Image from "next/image"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllProjects } from "@/lib/markdown"

export const metadata = {
  title: "Our Projects - BridgeSeed Foundation",
  description: "Explore our portfolio of high-impact charity projects making a measurable difference worldwide.",
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-linear-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Projects</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Every project is carefully selected based on evidence of effectiveness and potential for lasting impact.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              // Try to use an image named after the project title
              const imagePath = `/${project.title}.jpg`

              return (
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                      {imagePath ? (
                        <Image
                          src={imagePath}
                          alt={project.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      ) : (
                        <span className="text-gray-500 text-sm italic flex items-center justify-center h-full">
                          No image available for “{project.title}”
                        </span>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags?.map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2 leading-relaxed">
                        {project.description}
                      </CardDescription>
                      <div className="pt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-primary">Impact Score:</span>
                          <span className="font-bold">{project.impact_score}/100</span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
