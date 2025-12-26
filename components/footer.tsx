import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      {/* Integrated CTA Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Make a Difference Today</h2>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/donate">
                Donate Now <Heart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <a href="https://chat.whatsapp.com/JxE9u64joH00V1RFesiejj" target="_blank" rel="noopener noreferrer">
                Join Our Community
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Projects</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/projects" className="text-primary-foreground/80 hover:text-white transition-colors">
                    All Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects/disaster-relief"
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    Disaster Relief
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects/orphanage-support"
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    Orphanage Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects/student-marketplace"
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    Student Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-primary-foreground/80 hover:text-white transition-colors">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="/about#team" className="text-primary-foreground/80 hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#transparency"
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    Transparency
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-primary-foreground/80 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="text-primary-foreground/80 hover:text-white transition-colors">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="https://chat.whatsapp.com/JxE9u64joH00V1RFesiejj" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-white transition-colors">
                    Join Our Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative h-10 w-10 bg-white/10 rounded-lg p-1.5">
                <Image
                  src="/logo-icon.png"
                  alt="BridgeSeed Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <p className="text-xl font-bold tracking-tight">BridgeSeed</p>
            </div>
            <p className="text-sm text-primary-foreground/70 mb-4 italic">Transforming excess into opportunity.</p>
            <p className="text-xs text-primary-foreground/40">&copy; {new Date().getFullYear()} BridgeSeed Foundation. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
