import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Heart, Target, Users, TrendingUp } from "lucide-react"
import { getAllProjects, getAllPosts } from "@/lib/markdown"

export default async function Page() {
  const projects = await getAllProjects()
  const posts = await getAllPosts()
  

  const featuredProjects = projects.slice(0, 3)
  const recentPosts = posts.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5" aria-hidden="true" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm">
                Evidence-Based Philanthropy
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
                Creating Measurable Impact Through Strategic Giving
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                We support high-impact charity projects that make a real, measurable difference in the lives of those
                who need it most.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/donate">
                    Donate Now <Heart className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projects">
                    View Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/diverse-group-of-people-in-a-community-receiving-c.jpg"
                alt="Community members accessing clean water from a newly built well"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">50K+</div>
              <div className="text-sm md:text-base opacity-90">Lives Impacted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">12</div>
              <div className="text-sm md:text-base opacity-90">Active Projects</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">95%</div>
              <div className="text-sm md:text-base opacity-90">To Programs</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">8</div>
              <div className="text-sm md:text-base opacity-90">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach to Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We use rigorous evidence and data to identify the most effective interventions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Evidence-Based</CardTitle>
                <CardDescription className="leading-relaxed">
                  Every project is selected based on rigorous research and proven effectiveness in creating lasting
                  change
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Maximum Impact</CardTitle>
                <CardDescription className="leading-relaxed">
                  We focus on interventions that deliver the greatest benefit per dollar, ensuring your donation goes
                  further
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Full Transparency</CardTitle>
                <CardDescription className="leading-relaxed">
                  Track exactly where your money goes and see detailed reports on the outcomes of every project we
                  support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">High-impact initiatives making a difference</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => {
  // Use the first image if it exists
  const imageSrc = `/${project.title}.jpg`;

  return (
    <Link key={project.slug} href={`/projects/${project.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          {imageSrc ? (
            <Image
              src={`${imageSrc}`} // assumes images are in /public/images
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
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">{project.description}</CardDescription>
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
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Updates</h2>
              <p className="text-muted-foreground">News, insights, and impact stories</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3 leading-relaxed">{post.excerpt}</CardDescription>
                    <div className="pt-2 text-sm text-muted-foreground">By {post.author}</div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-linear-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Make a Difference Today</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your donation directly supports evidence-based programs that create lasting change. Every dollar is tracked
            and reported with full transparency.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/donate">
                Donate Now <Heart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
