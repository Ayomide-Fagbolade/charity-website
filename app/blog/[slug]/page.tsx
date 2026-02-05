import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/markdown"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - BridgeSeed Foundation Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

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

      {/* Image Carousel */}
      {post.images && post.images.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Carousel className="w-full">
              <CarouselContent>
                {post.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${post.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </section>
      )}

      {/* Post Content */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br />") }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
