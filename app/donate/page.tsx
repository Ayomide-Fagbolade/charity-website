import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Sun, Leaf } from "lucide-react"
import { getAllProjects } from "@/lib/markdown"
import { DonationDialog } from "@/components/payment/donation-dialog"

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
      <section className="py-24 px-4 bg-gradient-to-br from-primary to-primary-foreground text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-none px-4 py-1">
            Empower Change
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            Your Donation <br />Creates Real <span className="text-white/70 italic">Impact.</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto mb-10">
            Every MAD you donate is directed to student-vetted, evidence-based programs that maximize positive change in our community.
          </p>
          <DonationDialog projects={projects.map(p => ({ slug: p.slug, title: p.title }))} />
        </div>
      </section>

      {/* Why Donate Section (Keep but refine) */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* ... Existing Cards ... */}
            <Card className="border-none shadow-lg bg-background/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Sun className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Hope</CardTitle>
                <CardDescription className="leading-relaxed">
                  We nurture belief in better tomorrows, empowering communities to build their own future
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-lg bg-background/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Integrity</CardTitle>
                <CardDescription className="leading-relaxed">
                  We act honestly and transparently, ensuring every donation serves its true purpose
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-lg bg-background/50 backdrop-blur-sm">
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

      {/* Choose Your Cause */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Direct Your Reach</h2>
              <p className="text-xl text-muted-foreground max-w-xl">
                Select which specific BridgeSeed initiative you'd like your contribution to support today.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const imagePath = `/${project.slug}.jpg`

              return (
                <Card key={project.slug} className="group border-none shadow-xl bg-background flex flex-col hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
                    {imagePath ? (
                      <Image
                        src={imagePath}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="bg-muted w-full h-full flex items-center justify-center">
                        <Heart className="text-muted-foreground/20" size={48} />
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
                      {project.tags?.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} className="bg-white/90 text-primary hover:bg-white border-none font-bold">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardHeader className="flex-1 pb-2">
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3 leading-relaxed mt-4 text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 pb-8 flex items-center justify-between border-t border-muted/50 mt-auto">
                    <Link href={`/projects/${project.slug}`} className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                      View Details
                    </Link>
                    <DonationDialog
                      projects={projects.map(p => ({ slug: p.slug, title: p.title }))}
                      defaultProject={project.slug}
                    />
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
