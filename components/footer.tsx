import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50" role="contentinfo">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative h-12 w-12">
                <Image
                  src="/logo-icon.png"
                  alt="BridgeSeed Foundation Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                BridgeSeed
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transforming excess into opportunity.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Projects</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/disaster-relief"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Disaster Relief
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/orphanage-support"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Orphanage Support
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/student-marketplace"
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about#transparency"
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-muted-foreground hover:text-foreground transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BridgeSeed Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
