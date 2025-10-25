import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/markdown"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - Impact Charity Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <section className="py-6 px-4 border-b">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Post Header */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-sm text-muted-foreground mb-4">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            • By {post.author}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{post.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
          </div>
        </div>
      </section>
    </div>
  )
}
