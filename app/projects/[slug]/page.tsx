import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Info, Users, Flag, ShoppingBag } from "lucide-react"
import { getProjectBySlug, getAllProjects } from "@/lib/markdown"
import { DonationDialog } from "@/components/payment/donation-dialog"
import { ProjectCarousel } from "@/components/projects/project-carousel"

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - BridgeSeed Foundation`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation Header */}
      <section className="sticky top-0 z-10 py-4 px-4 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Button variant="ghost" asChild className="hover:bg-primary/5 transition-colors">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Projects
            </Link>
          </Button>
          <div className="flex gap-2">
            {project.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 font-semibold text-[10px] uppercase tracking-wider">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Project Hero */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start text-left">
            <div className="lg:col-span-3 space-y-6">
              <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {project.description}
              </p>

              <ProjectCarousel images={project.images} title={project.title} />
            </div>

            <div className="lg:col-span-2 space-y-6 sticky top-24">
              <Card className="border-2 border-primary/10 shadow-xl bg-primary/5 rounded-3xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-2">
                    <Flag size={14} /> Project Status
                  </div>
                  <CardTitle className="text-3xl font-black">Active Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {project.canDonate && (
                    <div className="pt-2">
                      <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest mb-4">Support this cause</p>
                      <DonationDialog
                        projects={[{ slug: project.slug, title: project.title }]}
                        defaultProject={project.slug}
                      />
                      <p className="text-[11px] text-center text-muted-foreground mt-4 font-bold uppercase tracking-widest">
                        SECURE MONETARY & ITEM DONATIONS
                      </p>
                    </div>
                  )}

                  {project.canSell && (
                    <div className="pt-2">
                      <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest mb-4">Marketplace Action</p>
                      <Button asChild className="w-full h-12 text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700">
                        <Link href="/marketplace/new">
                          List an Item <ShoppingBag className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <p className="text-[11px] text-center text-muted-foreground mt-4 font-bold uppercase tracking-widest">
                        TURN SECOND-HAND INTO OPPORTUNITY
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="p-6 bg-muted/50 rounded-3xl border border-dashed border-muted-foreground/20">
                <div className="flex items-start gap-3">
                  <Info className="text-primary mt-1 shrink-0" size={18} />
                  <p className="text-sm text-balance leading-relaxed">
                    BridgeSeed ensures that <strong>100%</strong> of your donations go directly to the project field. Administrative costs are covered separately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content / Description */}
      <section className="py-20 px-4 bg-muted/20 border-t border-muted-foreground/10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-xl dark:prose-invert max-w-none 
                    prose-headings:font-black prose-headings:tracking-tight 
                    prose-p:text-muted-foreground prose-p:leading-relaxed 
                    prose-strong:text-foreground prose-li:text-muted-foreground">
                <div className="whitespace-pre-wrap font-medium">
                  {project.content.replace(/^# .*\n\n/, "")}
                </div>
              </div>

              {project.impact_metrics && (
                <div className="space-y-6 pt-10 border-t">
                  <h3 className="text-2xl font-black tracking-tight">What your seeds grow into</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {project.impact_metrics.map((metric, i) => (
                      <div key={i} className="p-6 bg-background rounded-2xl shadow-sm border border-border group hover:border-primary transition-colors">
                        <div className="text-xs font-black text-primary uppercase tracking-widest mb-1">{metric.amount} MAD</div>
                        <h4 className="font-bold text-lg mb-2">{metric.label}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter mb-4 text-primary">Core Goals</h3>
                <ul className="space-y-3">
                  {["Immediate Response", "Life-saving Aid", "Community Resilience", "Sustainable Growth"].map((goal) => (
                    <li key={goal} className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                      <CheckCircle2 size={16} className="text-primary" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {project.canDonate && (
        <section className="py-24 px-4 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to make a difference?
            </h2>
            <p className="text-xl opacity-90 font-medium">
              Every contribution, whether a bank transfer or a donation of physical items, helps us build a more resilient UM6P community.
            </p>
            <div className="pt-4 flex justify-center">
              <DonationDialog
                projects={[{ slug: project.slug, title: project.title }]}
                defaultProject={project.slug}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
