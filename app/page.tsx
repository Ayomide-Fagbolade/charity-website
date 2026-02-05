
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Heart, Shield, Sun, Leaf, ShoppingBag } from "lucide-react"
import { getAllProjects, getAllPosts } from "@/lib/markdown"
import HeroCarousel from "@/components/herocarousel"
import { Leaderboard } from "@/components/leaderboard"




import { MarketplaceImpactSection } from "@/components/home/marketplace-impact-section"

export default async function Page() {
  const projects = await getAllProjects()
  const posts = await getAllPosts()

  const featuredProjects = projects.slice(0, 3)
  const recentPosts = posts.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroCarousel />


      {/* Our Core Values */}
      <section className="py-16 px-4 border-y border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group flex flex-col items-center space-y-3 p-4 rounded-xl transition-all hover:bg-muted/30 hover:scale-105 cursor-default">
              <div className="h-16 w-16 rounded-2xl bg-amber-500/10 flex items-center justify-center transition-colors group-hover:bg-amber-500/20">
                <Sun className="h-10 w-10 text-amber-500 transition-transform group-hover:scale-110 duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              </div>
              <div className="text-xl font-bold tracking-tight">Hope</div>
            </div>
            <div className="group flex flex-col items-center space-y-3 p-4 rounded-xl transition-all hover:bg-muted/30 hover:scale-105 cursor-default">
              <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center transition-colors group-hover:bg-blue-500/20">
                <Shield className="h-10 w-10 text-blue-500 transition-transform group-hover:scale-110 duration-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="text-xl font-bold tracking-tight">Integrity</div>
            </div>
            <div className="group flex flex-col items-center space-y-3 p-4 rounded-xl transition-all hover:bg-muted/30 hover:scale-105 cursor-default">
              <div className="h-16 w-16 rounded-2xl bg-rose-500/10 flex items-center justify-center transition-colors group-hover:bg-rose-500/20">
                <Heart className="h-10 w-10 text-rose-500 transition-transform group-hover:scale-110 duration-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
              </div>
              <div className="text-xl font-bold tracking-tight">Empathy</div>
            </div>
            <div className="group flex flex-col items-center space-y-3 p-4 rounded-xl transition-all hover:bg-muted/30 hover:scale-105 cursor-default">
              <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center transition-colors group-hover:bg-emerald-500/20">
                <Leaf className="h-10 w-10 text-emerald-500 transition-transform group-hover:scale-110 duration-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <div className="text-xl font-bold tracking-tight">Sustainability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            What is BridgeSeed's Approach?
          </h2>

          <div className="w-full border-t border-foreground/20 mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative">
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold tracking-tight">A Philosophy</h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We believe that charity should be effective, not just well-intentioned. By using data to identify genuine needs and redistributing existing surplus resources, we create sustainable solutions that maximize impact per dollar.
                <br /><br />
                <Link href="/about" className="underline underline-offset-4 hover:text-primary transition-colors">
                  Read more about our mission.
                </Link>
              </p>
            </div>

            <div className="relative md:border-l md:border-foreground/20 md:pl-12 space-y-4">
              <h3 className="text-3xl font-semibold tracking-tight">A Movement</h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                BridgeSeed is more than a foundation; it is a network of compassionate individuals. From student volunteers to global donors, we are united by a shared commitment to building dignity, reducing waste, and empowering the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>


      <MarketplaceImpactSection />

      {/* Social Proof Leaderboard */}
      <Leaderboard />

      {/* Latest Blog Posts */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-4 flex-grow">
              <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap">Latest Updates</h2>
              <div className="h-px bg-primary/20 flex-grow hidden md:block" />
            </div>
            <Button variant="ghost" asChild className="hidden md:flex shrink-0">
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


    </div>
  )
}
