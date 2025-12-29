import Link from "next/link"
import Image from "next/image"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllProjects } from "@/lib/markdown"

export const metadata = {
  title: "Our Projects - BridgeSeed Foundation",
  description: "Explore our portfolio of sustainable community projects making a measurable difference worldwide.",
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
              // Try to use an image named after the project slug
              const imagePath = project.images?.[0] || `/${project.slug}.jpg`

              return (
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <Card className="group h-full border-none shadow-xl bg-background/50 backdrop-blur-sm hover:bg-background transition-all duration-500 overflow-hidden rounded-3xl">
                    <div className="relative h-56 w-full overflow-hidden">
                      {imagePath ? (
                        <>
                          <Image
                            src={imagePath}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </>
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
