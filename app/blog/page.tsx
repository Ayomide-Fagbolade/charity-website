import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/lib/markdown"

export const metadata = {
  title: "Blog - Impact Charity",
  description: "Read our latest updates, insights, and stories about effective philanthropy and charitable impact.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-linear-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Blog</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Updates, insights, and stories about effective philanthropy and measurable impact.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      • By {post.author}
                    </div>
                    <CardTitle className="text-2xl mb-3">{post.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{post.excerpt}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
