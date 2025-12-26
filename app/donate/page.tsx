import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Sun, Leaf } from "lucide-react"
import { getAllProjects } from "@/lib/markdown"

export const metadata = {
  title: "Donate - BridgeSeed Foundation",
  description: "Make a donation to support sustainable initiatives that create measurable change.",
}

export default async function DonatePage() {

  const allProjects = await getAllProjects()
  // Filter out marketplace projects
  const projects = allProjects.filter((project) => project.slug !== "student-marketplace")

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Make an Impact
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Your Donation Creates Real Change</h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Every dollar you donate is directed to evidence-based programs that maximize positive impact in the world.
          </p>
        </div>
      </section>



      {/* Why Donate */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Donate With Us?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your donation goes further when directed to the most effective programs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Sun className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Hope</CardTitle>
                <CardDescription className="leading-relaxed">
                  We nurture belief in better tomorrows, empowering communities to build their own future
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Integrity</CardTitle>
                <CardDescription className="leading-relaxed">
                  We act honestly and transparently, ensuring every donation serves its true purpose
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Sustainability</CardTitle>
                <CardDescription className="leading-relaxed">
                  We don't just give aid; we plant seeds for growth that lasts beyond us
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Cause</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select which project you'd like your donation to support
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const imagePath = `/${project.slug}.jpg`

              return (
                <Card key={project.slug} className="h-full flex flex-col hover:shadow-lg transition-shadow">
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
                        No image available
                      </span>
                    )}
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3 leading-relaxed mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Impact:</span>
                        <span className="font-bold text-primary">{project.impact_score}/100</span>
                      </div>
                      <Link href={`/projects/${project.slug}`}>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>


    </div>
  )
}
